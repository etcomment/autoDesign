import { TITLE_COLOR, MIGSO_PALETTE } from '../../lib/theme'
import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

const ORIGINAL_COLORS = ['#4cbfa0', '#ffbe00', '#ff4a2b', '#2d62ed', '#23255a']

export function Roadmap4Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones = [], steps = [] } = data as {
    title?: string
    milestones?: Array<{ title: string; subtitle?: string; color?: string }>
    steps?: Array<{ title: string; color?: string }>
  }

  const W = 1000

  // 1. Étape / Jalons
  const stepTitles = steps.length > 0
    ? steps.map(s => s.title)
    : (milestones.length > 0
        ? milestones.map((_, i) => `Étape ${i + 1}`)
        : ['Step One', 'Step Two', 'Step Three', 'Step Four', 'Step Five'])

  const displayMilestones = milestones.length > 0
    ? milestones
    : Array.from({ length: stepTitles.length }, (_, i) => ({
        title: `Milestone ${i + 1}`,
        subtitle: 'MIGSO-PCUBED content and words to\nbe added here as required',
      }))

  const count = Math.max(1, stepTitles.length)

  // 2. Fonctions d'alternance nette et dynamique des virages à gauche et à droite
  // Virages Droite : 1er virage (index=0) à 675, 2ème virage (index=2) à 630
  const getTurnRightX = (index: number) => (index % 4 === 0 ? 675 : 630)
  // Virages Gauche : 1er virage (index=1) à 295 (plus à gauche), 2ème virage (index=3) à 360 (plus à droite)
  const getTurnLeftX = (index: number) => (index % 4 === 1 ? 295 : 360)

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('main-title', { x: W / 2 - 200, y: 25, width: 400, height: 40 })

    const startY = 475
    const rowHeight = 115
    const strokeW = 28

    const extensionLength = 160
    const arrowHeadW = 40
    const arrowHeadH = 66

    for (let i = 0; i < count; i++) {
      const stepId = `step-${i + 1}`
      const bodyId = `step-body-${i + 1}`
      const arrowId = `step-arrow-${i + 1}`
      const msId = `milestone-${i + 1}`

      const row = i
      const direction: 'right' | 'left' = row % 2 === 0 ? 'right' : 'left'
      const yCenter = startY - row * rowHeight

      const isFirst = i === 0
      const isLast = i === count - 1

      const turnLeftX = getTurnLeftX(i)
      const turnRightX = getTurnRightX(i)

      let segLeftX = turnLeftX
      let segRightX = turnRightX

      if (isFirst) {
        if (direction === 'right') segLeftX = turnLeftX - extensionLength
        else segRightX = turnRightX + extensionLength
      }

      if (isLast) {
        if (direction === 'right') segRightX = turnRightX + extensionLength
        else segLeftX = turnLeftX - extensionLength
      }

      const bodyRect: Rect = {
        x: Math.min(segLeftX, segRightX),
        y: yCenter - rowHeight / 2,
        width: Math.abs(segRightX - segLeftX),
        height: rowHeight,
      }

      let arrowX: number
      if (isLast) {
        arrowX = direction === 'right' ? segRightX - arrowHeadW + 3 : segLeftX - 3
      } else {
        arrowX = direction === 'right' ? 467 : 518
      }

      const arrowRect: Rect = {
        x: arrowX,
        y: yCenter - arrowHeadH / 2,
        width: arrowHeadW,
        height: arrowHeadH,
      }

      const stepTextX = isLast
        ? (direction === 'right' ? turnRightX - 30 : turnLeftX - 90)
        : (direction === 'right' ? 330 : 560)

      const stepTextRect: Rect = {
        x: stepTextX,
        y: yCenter - 14,
        width: 120,
        height: 36,
      }

      let msX: number
      if (direction === 'right') {
        msX = isLast ? segRightX + 15 : turnRightX + 45
      } else {
        msX = isLast ? segLeftX - 250 : turnLeftX - 245
      }

      const msRect: Rect = {
        x: Math.max(20, Math.min(W - 250, msX)),
        y: yCenter - 35,
        width: 230,
        height: 70,
      }

      map.set(stepId, stepTextRect)
      map.set(bodyId, bodyRect)
      map.set(arrowId, arrowRect)
      map.set(msId, msRect)
    }

    for (let i = count; i < displayMilestones.length; i++) {
      const msId = `milestone-${i + 1}`
      const isLeft = i % 2 === 1
      const yPos = Math.max(30, 420 - Math.floor(i / 2) * 80)
      map.set(msId, { x: isLeft ? 70 : 700, y: yPos, width: 230, height: 70 })
    }

    return map
  }, [count, displayMilestones.length])

  // Synchronisation avec Zustand
  useEffect(() => {
    for (const [id, rect] of defaultPositions.entries()) {
      if (!pos[id]) {
        moveEl(id, { x: rect.x, y: rect.y })
        resizeEl(id, { width: rect.width, height: rect.height })
      }
    }
  }, [defaultPositions, pos, moveEl, resizeEl])

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

  const titleR = getR('main-title')

  return (
    <g ref={svgRef}>
      {/* Titre principal */}
      {title && (
        <g
          data-element-id="main-title"
          onMouseDown={e => startDrag(e, 'main-title', titleR)}
          transform={getTransform('main-title', titleR)}
          style={{ cursor: 'pointer' }}
        >
          <text
            x={titleR.x + titleR.width / 2}
            y={titleR.y + 28}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={22}
            fontWeight={700}
            fill={tplColors['main-title'] || TITLE_COLOR}
          >
            {title}
          </text>
          {selectedIds.has('main-title') && renderHandles(titleR, 'main-title')}
        </g>
      )}

      {/* COUCHE 1 : RENDU DES SEGMENTS AVEC VIRAGES CLAIREMENT ALTERNÉS EN LONGUEUR */}
      {Array.from({ length: count }).map((_, i) => {
        const bodyId = `step-body-${i + 1}`
        const arrowId = `step-arrow-${i + 1}`
        const sR = getR(bodyId)
        const aR = getR(arrowId)

        const defaultColor = ORIGINAL_COLORS[i % ORIGINAL_COLORS.length] || MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const stepColor = tplColors[bodyId] || steps[i]?.color || defaultColor

        const rowHeight = 115
        const strokeW = 28
        const direction: 'right' | 'left' = i % 2 === 0 ? 'right' : 'left'
        const hasNext = i < count - 1

        const R = 22

        let pathD = ''

        if (i === 0) {
          // Étape 1 (en bas)
          const startX = sR.x
          const startY = sR.y + sR.height / 2
          pathD = `M ${startX} ${startY} L ${aR.x + 3} ${startY}`
        } else if (direction === 'left') {
          // Virage vers la droite (en bout de segment allant vers la droite)
          const prevArrowBaseX = 470
          const startY = sR.y + rowHeight + sR.height / 2
          const turnX = getTurnRightX(i - 1)
          const targetY = startY - rowHeight

          pathD = `M ${prevArrowBaseX} ${startY} L ${turnX - R} ${startY} A ${R} ${R} 0 0 0 ${turnX} ${startY - R} L ${turnX} ${targetY + R} A ${R} ${R} 0 0 0 ${turnX - R} ${targetY} L ${aR.x + aR.width - 3} ${targetY}`
        } else {
          // Virage vers la gauche (en bout de segment allant vers la gauche)
          const prevArrowBaseX = 555
          const startY = sR.y + rowHeight + sR.height / 2
          const turnX = getTurnLeftX(i - 1)
          const targetY = startY - rowHeight

          pathD = `M ${prevArrowBaseX} ${startY} L ${turnX + R} ${startY} A ${R} ${R} 0 0 1 ${turnX} ${startY - R} L ${turnX} ${targetY + R} A ${R} ${R} 0 0 1 ${turnX + R} ${targetY} L ${aR.x + 3} ${targetY}`
        }

        return (
          <g key={`body-${bodyId}`}>
            <g
              data-element-id={bodyId}
              onMouseDown={e => startDrag(e, bodyId, sR)}
              transform={getTransform(bodyId, sR)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={pathD}
                fill="none"
                stroke={stepColor}
                strokeWidth={strokeW}
                strokeLinecap="butt"
                strokeLinejoin="round"
              />
              {selectedIds.has(bodyId) && renderHandles(sR, bodyId)}
            </g>
          </g>
        )
      })}

      {/* COUCHE 2 : FLÈCHES TRIANGULAIRES */}
      {Array.from({ length: count }).map((_, i) => {
        const bodyId = `step-body-${i + 1}`
        const arrowId = `step-arrow-${i + 1}`
        const aR = getR(arrowId)

        const defaultColor = ORIGINAL_COLORS[i % ORIGINAL_COLORS.length] || MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const stepColor = tplColors[arrowId] || tplColors[bodyId] || steps[i]?.color || defaultColor

        const direction: 'right' | 'left' = i % 2 === 0 ? 'right' : 'left'

        let arrowPath = ''
        if (direction === 'right') {
          arrowPath = `M ${aR.x} ${aR.y} L ${aR.x} ${aR.y + aR.height} L ${aR.x + aR.width} ${aR.y + aR.height / 2} Z`
        } else {
          arrowPath = `M ${aR.x + aR.width} ${aR.y} L ${aR.x + aR.width} ${aR.y + aR.height} L ${aR.x} ${aR.y + aR.height / 2} Z`
        }

        return (
          <g key={`arrow-${arrowId}`}>
            <g
              data-element-id={arrowId}
              onMouseDown={e => startDrag(e, arrowId, aR)}
              transform={getTransform(arrowId, aR)}
              style={{ cursor: 'pointer' }}
            >
              <path d={arrowPath} fill={stepColor} />
              {selectedIds.has(arrowId) && renderHandles(aR, arrowId)}
            </g>
          </g>
        )
      })}

      {/* COUCHE 3 : LABELS D'ÉTAPES SUR LES RUBANS */}
      {Array.from({ length: count }).map((_, i) => {
        const stepId = `step-${i + 1}`
        const stR = getR(stepId)
        const label = stepTitles[i] || `Step ${i + 1}`
        const textColor = tplColors[stepId] || '#ffffff'

        return (
          <g
            key={stepId}
            data-element-id={stepId}
            onMouseDown={e => startDrag(e, stepId, stR)}
            transform={getTransform(stepId, stR)}
            style={{ cursor: 'pointer' }}
          >
            <text
              x={stR.x + stR.width / 2}
              y={stR.y + stR.height / 2 + 5}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={18}
              fontWeight="bold"
              fill={textColor}
            >
              {label}
            </text>
            {selectedIds.has(stepId) && renderHandles(stR, stepId)}
          </g>
        )
      })}

      {/* COUCHE 4 : ANNOTATIONS ET JALONS (Milestones) */}
      {displayMilestones.map((ms, idx) => {
        const msId = `milestone-${idx + 1}`
        const bodyId = `step-body-${idx + 1}`
        const msR = getR(msId)

        const isLeftHalf = msR.x < W / 2
        const textX = isLeftHalf ? msR.x : msR.x + msR.width
        const textAnchor = isLeftHalf ? 'start' : 'end'

        const defaultColor = ORIGINAL_COLORS[idx % ORIGINAL_COLORS.length] || MIGSO_PALETTE[idx % MIGSO_PALETTE.length]!
        const msColor = tplColors[msId] || ms.color || tplColors[bodyId] || defaultColor

        const maxChars = Math.max(10, Math.floor(msR.width / 7.5))
        const titleLines = wrapTextByWidth(ms.title, maxChars)
        const subtitleLines = ms.subtitle ? wrapTextByWidth(ms.subtitle, maxChars + 5) : []

        return (
          <g
            key={msId}
            data-element-id={msId}
            onMouseDown={e => startDrag(e, msId, msR)}
            transform={getTransform(msId, msR)}
            style={{ cursor: 'pointer' }}
          >
            <text
              x={textX}
              y={msR.y + 20}
              textAnchor={textAnchor}
              fontFamily="Arial, sans-serif"
              fontSize={18}
              fontWeight="bold"
              fill={msColor}
            >
              {titleLines.map((line, lIdx) => (
                <tspan key={lIdx} x={textX} dy={lIdx === 0 ? 0 : 22}>
                  {line}
                </tspan>
              ))}
            </text>

            {subtitleLines.length > 0 && (
              <text
                x={textX}
                y={msR.y + 25 + titleLines.length * 22}
                textAnchor={textAnchor}
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fill="#555555"
              >
                {subtitleLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={textX} dy={lIdx === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}

            {selectedIds.has(msId) && renderHandles(msR, msId)}
          </g>
        )
      })}
    </g>
  )
}
