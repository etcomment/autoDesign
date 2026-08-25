import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const MARGIN_X = 45
const GROUP_Y = 95
const GROUP_H = 34
const RIBBON_Y = 155
const RIBBON_H = 75
const CARDS_Y = 275
const CARD_H = 175

function getDynamicIcon(iconName?: string, size = 20, color = '#ffffff') {
  if (!iconName) return null
  const clean = iconName.trim()

  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn({ size, color })

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const LucideFn =
    (LucideIcons as Record<string, any>)[pascalName] ||
    (LucideIcons as Record<string, any>)[clean] ||
    (LucideIcons as Record<string, any>)[clean.toUpperCase()]

  if (LucideFn) {
    return <LucideFn size={size} color={color} />
  }

  return null
}

function getChevronPoints(
  x: number,
  y: number,
  w: number,
  h: number,
  tip: number,
  isFirst: boolean,
  isLast: boolean
): string {
  const top = y
  const bot = y + h
  const mid = y + h / 2
  const leftX = x
  const rightX = x + w

  if (isFirst && isLast) {
    return `${leftX},${top} ${rightX},${top} ${rightX + tip},${mid} ${rightX},${bot} ${leftX},${bot}`
  }
  if (isFirst) {
    return `${leftX},${top} ${rightX},${top} ${rightX + tip},${mid} ${rightX},${bot} ${leftX},${bot}`
  }
  if (isLast) {
    return `${leftX},${top} ${rightX},${top} ${rightX + tip},${mid} ${rightX},${bot} ${leftX},${bot} ${leftX + tip},${mid}`
  }
  return `${leftX},${top} ${rightX},${top} ${rightX + tip},${mid} ${rightX},${bot} ${leftX},${bot} ${leftX + tip},${mid}`
}

export function Roadmap6Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { milestones = [], quarters = [] } = data
  const N = Math.max(1, milestones.length)

  // Partitionnement dynamique des groupes / périodes
  const groupData = useMemo(() => {
    // 1. Quarters explicitement déclarés dans le DSL
    if (quarters && quarters.length > 0) {
      const qLabels = quarters.map(q => q.label.trim())
      const grps: number[][] = Array.from({ length: qLabels.length }, () => [])
      const unassigned: number[] = []

      milestones.forEach((m, idx) => {
        const mDate = (m.date || m.quarter || '').trim().toLowerCase()
        const matchedIdx = qLabels.findIndex(ql => ql.toLowerCase() === mDate)
        if (matchedIdx !== -1) {
          grps[matchedIdx]!.push(idx)
        } else {
          unassigned.push(idx)
        }
      })

      if (unassigned.length > 0) {
        unassigned.forEach(idx => {
          const grpIdx = Math.min(Math.floor((idx / N) * qLabels.length), qLabels.length - 1)
          grps[grpIdx]!.push(idx)
        })
        grps.forEach(g => g.sort((a, b) => a - b))
      }

      return {
        labels: qLabels,
        groups: grps,
      }
    }

    // 2. Déduction à partir des dates / quarters uniques des jalons (si 1 à 4 dates distinctes)
    const dateList = milestones.map(m => (m.quarter || m.date || '').trim()).filter(Boolean)
    const uniqueDates = Array.from(new Set(dateList))
    if (uniqueDates.length >= 1 && uniqueDates.length <= 4) {
      const grps: number[][] = Array.from({ length: uniqueDates.length }, () => [])
      milestones.forEach((m, idx) => {
        const mDate = (m.quarter || m.date || '').trim()
        const matchedIdx = uniqueDates.indexOf(mDate)
        if (matchedIdx !== -1) {
          grps[matchedIdx]!.push(idx)
        } else {
          const fallbackIdx = Math.min(Math.floor((idx / N) * uniqueDates.length), uniqueDates.length - 1)
          grps[fallbackIdx]!.push(idx)
        }
      })
      grps.forEach(g => g.sort((a, b) => a - b))
      return {
        labels: uniqueDates,
        groups: grps,
      }
    }

    // 3. Répartition automatique en phases (1 à 4 phases selon N)
    const numG = N <= 3 ? N : N <= 6 ? 3 : 4
    const grps: number[][] = Array.from({ length: numG }, () => [])
    const labels = Array.from({ length: numG }, (_, i) => `Phase ${i + 1}`)
    milestones.forEach((_, idx) => {
      const grpIdx = Math.min(Math.floor((idx / N) * numG), numG - 1)
      grps[grpIdx]!.push(idx)
    })
    return {
      labels,
      groups: grps,
    }
  }, [milestones, quarters, N])

  const availableW = W - MARGIN_X * 2
  const chevronW = availableW / N

  // Calcul du layout initial par défaut
  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()

    // Headers de groupes
    groupData.groups.forEach((indices, gi) => {
      if (indices.length === 0) return
      const iStart = indices[0]!
      const iEnd = indices[indices.length - 1]!
      const groupX = MARGIN_X + iStart * chevronW
      const groupW = (iEnd - iStart + 1) * chevronW
      map.set(`group-label-${gi}`, {
        x: groupX,
        y: GROUP_Y,
        width: groupW,
        height: GROUP_H,
      })
    })

    // Chevrons et cartes de description
    milestones.forEach((_, i) => {
      const chevX = MARGIN_X + i * chevronW
      const cardW = Math.max(120, Math.min(210, chevronW - 10))
      const cardX = chevX + (chevronW - cardW) / 2

      map.set(`chevron-${i}`, {
        x: chevX,
        y: RIBBON_Y,
        width: chevronW,
        height: RIBBON_H,
      })

      map.set(`card-${i}`, {
        x: cardX,
        y: CARDS_Y,
        width: cardW,
        height: CARD_H,
      })
    })

    return map
  }, [groupData.groups, milestones, chevronW])

  // Synchronisation avec le store Zustand (avec détection du changement de N)
  const prevNRef = useRef(N)
  useEffect(() => {
    const countChanged = prevNRef.current !== N
    prevNRef.current = N

    for (const [id, rect] of defaultPositions.entries()) {
      if (countChanged || !pos[id]) {
        moveEl(id, { x: rect.x, y: rect.y })
        resizeEl(id, { width: rect.width, height: rect.height })
      }
    }
  }, [N, defaultPositions, pos, moveEl, resizeEl])

  const getR = (id: string): Rect => {
    const p = pos[id]
    const d = defaultPositions.get(id) || { x: 0, y: 0, width: 100, height: 50 }
    return {
      x: p?.x ?? d.x,
      y: p?.y ?? d.y,
      width: p?.width || d.width,
      height: p?.height || d.height,
    }
  }

  // Couleur du groupe pour un jalon donné
  const getGroupColor = (milestoneIndex: number): string => {
    for (let gi = 0; gi < groupData.groups.length; gi++) {
      if (groupData.groups[gi]?.includes(milestoneIndex)) {
        return tplColors[`group-label-${gi}`] ?? PALETTE[gi % PALETTE.length]!
      }
    }
    return PALETTE[milestoneIndex % PALETTE.length]!
  }

  return (
    <g ref={svgRef}>
      {/* COUCHE 1 : LABELS DE GROUPES / QUARTERS (Au-dessus du ruban) */}
      {groupData.groups.map((indices, gi) => {
        if (indices.length === 0) return null
        const labelId = `group-label-${gi}`
        const gr = getR(labelId)
        const isSel = selectedIds.has(labelId)
        const groupColor = tplColors[labelId] ?? PALETTE[gi % PALETTE.length]!
        const labelText = groupData.labels[gi] || `Phase ${gi + 1}`

        return (
          <g
            key={labelId}
            data-element-id={labelId}
            onMouseDown={e => startDrag(e, labelId, gr)}
            transform={getTransform(labelId, gr)}
            style={{ cursor: 'pointer' }}
          >
            {/* Ligne d'accentuation du groupe */}
            <rect
              x={gr.x + 2}
              y={gr.y + gr.height - 4}
              width={Math.max(0, gr.width - 4)}
              height={3}
              rx={1.5}
              fill={groupColor}
              opacity={0.85}
            />
            {/* Titre du groupe / période */}
            <text
              x={gr.x + gr.width / 2}
              y={gr.y + 20}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={15}
              fontWeight={700}
              fill={groupColor}
            >
              {labelText}
            </text>
            {isSel && renderHandles(gr, labelId)}
          </g>
        )
      })}

      {/* COUCHE 2 : CONNECTEURS DYNAMIQUES ENTRE CHEVRONS ET CARTES */}
      {milestones.map((ms, i) => {
        const chevId = `chevron-${i}`
        const cardId = `card-${i}`
        const connId = `conn-${i}`
        const cr = getR(chevId)
        const cardR = getR(cardId)

        const startX = cr.x + cr.width / 2
        const startY = cr.y + cr.height
        const endX = cardR.x + cardR.width / 2
        const endY = cardR.y

        const milestoneColor =
          tplColors[chevId] ?? ms.color ?? ms.style?.fill ?? getGroupColor(i)
        const connColor =
          tplColors[connId] ?? tplStrokeColors[connId] ?? milestoneColor

        return (
          <g key={connId}>
            {/* Point d'ancrage bas du chevron */}
            <circle cx={startX} cy={startY} r={3.5} fill={connColor} />
            {/* Ligne élastique en temps réel */}
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke={connColor}
              strokeWidth={2}
              strokeDasharray="4 3"
            />
            {/* Point d'ancrage haut de la carte */}
            <circle cx={endX} cy={endY} r={3.5} fill={connColor} />
          </g>
        )
      })}

      {/* COUCHE 3 : CHEVRONS INTERACTIFS DU RUBAN */}
      {milestones.map((ms, i) => {
        const chevId = `chevron-${i}`
        const cr = getR(chevId)
        const isSel = selectedIds.has(chevId)
        const isFirst = i === 0
        const isLast = i === N - 1

        const tip = Math.min(22, Math.max(10, cr.width * 0.16))
        const points = getChevronPoints(cr.x, cr.y, cr.width, cr.height, tip, isFirst, isLast)

        const chevronColor =
          tplColors[chevId] ?? ms.color ?? ms.style?.fill ?? getGroupColor(i)
        const strokeColor =
          tplStrokeColors[chevId] || (isSel ? '#3b82f6' : '#ffffff')
        const strokeWidth = isSel ? 2.5 : (tplStrokeWidths[chevId] ?? 1)

        const badgeCenterX = cr.x + (isFirst ? cr.width / 2 : (cr.width + tip) / 2)
        const badgeCenterY = cr.y + cr.height / 2
        const iconEl = getDynamicIcon(ms.icon, 22, '#ffffff')

        return (
          <g
            key={chevId}
            data-element-id={chevId}
            onMouseDown={e => startDrag(e, chevId, cr)}
            transform={getTransform(chevId, cr)}
            style={{ cursor: 'pointer' }}
          >
            {/* Polygone du chevron */}
            <polygon
              points={points}
              fill={chevronColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

            {/* Badge circulaire / Icône au centre du chevron */}
            {ms.icon && iconEl ? (
              <g>
                <circle cx={badgeCenterX} cy={badgeCenterY} r={18} fill="rgba(255,255,255,0.22)" />
                <g transform={`translate(${badgeCenterX - 11}, ${badgeCenterY - 11})`}>
                  {iconEl}
                </g>
              </g>
            ) : (
              <g>
                <circle cx={badgeCenterX} cy={badgeCenterY} r={17} fill="rgba(255,255,255,0.25)" />
                <text
                  x={badgeCenterX}
                  y={badgeCenterY + 5}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={14}
                  fontWeight={700}
                  fill="#ffffff"
                >
                  {i + 1}
                </text>
              </g>
            )}

            {isSel && renderHandles(cr, chevId)}
          </g>
        )
      })}

      {/* COUCHE 4 : CARTES DESCRIPTIVES DES JALONS */}
      {milestones.map((ms, i) => {
        const cardId = `card-${i}`
        const cardR = getR(cardId)
        const isSel = selectedIds.has(cardId)

        const cardColor =
          tplColors[cardId] ?? ms.color ?? ms.style?.fill ?? getGroupColor(i)
        const strokeColor =
          tplStrokeColors[cardId] || (isSel ? '#3b82f6' : '#e2e8f0')
        const strokeWidth = isSel ? 2.5 : (tplStrokeWidths[cardId] ?? 1)

        // Calcul dynamique du text wrapping
        const titleMaxChars = Math.max(8, Math.floor((cardR.width - 20) / 7.2))
        const titleLines = wrapTextByWidth(ms.title || `Milestone ${i + 1}`, titleMaxChars)

        const subMaxChars = Math.max(10, Math.floor((cardR.width - 20) / 6.2))
        const subLines = ms.subtitle ? wrapTextByWidth(ms.subtitle, subMaxChars) : []

        const datePillWidth = ms.date
          ? Math.max(45, Math.min(cardR.width - 24, ms.date.length * 7 + 16))
          : 56

        const cardIcon = getDynamicIcon(ms.icon, 16, cardColor)

        return (
          <g
            key={cardId}
            data-element-id={cardId}
            onMouseDown={e => startDrag(e, cardId, cardR)}
            transform={getTransform(cardId, cardR)}
            style={{ cursor: 'pointer' }}
          >
            {/* Fond de la carte */}
            <rect
              x={cardR.x}
              y={cardR.y}
              width={cardR.width}
              height={cardR.height}
              rx={8}
              fill={tplColors[`card-bg-${i}`] || '#ffffff'}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

            {/* Barre supérieure colorée d'accent */}
            <rect
              x={cardR.x + 8}
              y={cardR.y + 4}
              width={Math.max(0, cardR.width - 16)}
              height={3.5}
              rx={1.75}
              fill={cardColor}
            />

            {/* En-tête : Badge Date / Numéro de Jalon & Icône */}
            <rect
              x={cardR.x + 10}
              y={cardR.y + 14}
              width={datePillWidth}
              height={18}
              rx={9}
              fill={cardColor}
              opacity={0.14}
            />
            <text
              x={cardR.x + 10 + datePillWidth / 2}
              y={cardR.y + 26.5}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={10}
              fontWeight={700}
              fill={cardColor}
            >
              {ms.date || `Jalon ${i + 1}`}
            </text>

            {/* Mini icône en haut à droite de la carte si présente */}
            {ms.icon && cardIcon && (
              <g transform={`translate(${cardR.x + cardR.width - 26}, ${cardR.y + 13})`}>
                {cardIcon}
              </g>
            )}

            {/* Titre du jalon avec wrapping multi-lignes */}
            <text
              x={cardR.x + 12}
              y={cardR.y + 48}
              fontFamily="Arial, sans-serif"
              fontSize={13}
              fontWeight={700}
              fill={tplColors[`title-${i}`] || '#1e293b'}
            >
              {titleLines.map((line, lIdx) => (
                <tspan key={lIdx} x={cardR.x + 12} dy={lIdx === 0 ? 0 : 16}>
                  {line}
                </tspan>
              ))}
            </text>

            {/* Sous-titre / Description avec wrapping multi-lignes */}
            {subLines.length > 0 && (
              <text
                x={cardR.x + 12}
                y={cardR.y + 54 + titleLines.length * 16}
                fontFamily="Arial, sans-serif"
                fontSize={11}
                fill={tplColors[`subtitle-${i}`] || '#64748b'}
              >
                {subLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={cardR.x + 12} dy={lIdx === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}

            {isSel && renderHandles(cardR, cardId)}
          </g>
        )
      })}
    </g>
  )
}

