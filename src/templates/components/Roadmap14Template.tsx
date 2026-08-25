import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const W = 1000
const MARGIN_X = 100
const TOP_Y = 110
const ARROW_W = 120
const ARROW_H1 = 80
const ARROW_H2 = 60
const ARROW_W2 = 25

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function getDynamicIcon(iconName?: string, size = 20, color = '#ffffff'): ReactElement | null {
  if (!iconName) return null
  const clean = iconName.trim()

  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn({ size, color })

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const lucideRecord = LucideIcons as Record<string, unknown>
  const LucideFn = (lucideRecord[pascalName] || lucideRecord[clean] || lucideRecord[clean.toUpperCase()]) as
    | React.ComponentType<{ size?: number; color?: string }>
    | undefined

  if (LucideFn) {
    return <LucideFn size={size} color={color} />
  }

  return null
}

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('arc-')) {
    const parts = id.split('-')
    const idx = parts.length >= 2 ? parseInt(parts[1] || '0') : 0
    const l = layout.get(`item-${idx}`)
    const nl = layout.get(`item-${idx + 1}`)
    if (!l || !nl) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return s
    const startX = l.cx + 30
    const endX = nl.cx - 30
    return { x: startX, y: TOP_Y - 50, width: endX - startX, height: 30 }
  }
  if (id.startsWith('item-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || ARROW_W, height: s.height || (ARROW_H1 + ARROW_H2 + 100) }
    return { x: l.cx - ARROW_W / 2, y: TOP_Y, width: ARROW_W, height: ARROW_H1 + ARROW_H2 + 100 }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap14Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { milestones } = data
  const N = milestones.length
  const availableW = W - MARGIN_X * 2

  const years = useMemo(() => {
    const startYear = 2019
    return milestones.map((ms, i) => ms.date ?? String(startYear + i))
  }, [milestones])

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`item-${i}`, { cx })
      if (i < N - 1) m.set(`arc-${i}`, { cx })
    })
    return m
  }, [milestones, availableW, N])

  const greyMap = useMemo(() => new Map<string, Rect>(), [])

  useEffect(() => {
    for (const id of [...layoutMap.keys(), ...greyMap.keys()]) {
      if (pos[id]) continue
      const r = getRect(id, pos, layoutMap, greyMap)
      moveEl(id, { x: r.x, y: r.y })
      resizeEl(id, { width: r.width, height: r.height })
    }
  }, [layoutMap, greyMap, pos, moveEl, resizeEl])

  const rects = new Map<string, Rect>()
  for (const id of [...layoutMap.keys(), ...greyMap.keys()]) {
    rects.set(id, getRect(id, pos, layoutMap, greyMap))
  }

  return (
    <g ref={svgRef}>
      <defs>
        <marker id="arrowhead-rdm14" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#d0d0d0" />
        </marker>
      </defs>

      {milestones.map((ms, i) => {
        const iid = `item-${i}`
        const aid = `arc-${i}`
        const r = rects.get(iid)!
        const ar = rects.get(aid)
        const color = tplColors[iid] ?? ms.style?.fill ?? ms.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const customStroke = tplStrokeColors[iid]
        const customStrokeWidth = tplStrokeWidths[iid] ?? 1
        const isSel = selectedIds.has(iid)

        const cx = r.x + r.width / 2

        const maxTitleChars = Math.max(8, Math.floor(r.width / 7.5))
        const maxSubChars = Math.max(10, Math.floor((r.width + 40) / 7))

        const titleLines = wrapTextByWidth(ms.title || `Milestone ${i + 1}`, maxTitleChars)
        const subLines = ms.subtitle ? wrapTextByWidth(ms.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(ms.icon, 20, '#ffffff')
        const bigVal = ms.value || ms.percent || String(i + 1)

        return (
          <g key={i}>
            {/* Curved Arc between items */}
            {i < N - 1 && ar && (
              <g
                data-element-id={aid}
                onMouseDown={e => startDrag(e, aid, ar)}
                transform={getTransform(aid, ar)}
                style={{ cursor: 'pointer' }}
              >
                <path
                  d={`M ${ar.x} ${ar.y + ar.height} Q ${ar.x + ar.width / 2} ${ar.y} ${ar.x + ar.width} ${ar.y + ar.height}`}
                  fill="none"
                  stroke={tplColors[aid] || tplStrokeColors[aid] || '#e0e0e0'}
                  strokeWidth={tplStrokeWidths[aid] || 3}
                  markerEnd="url(#arrowhead-rdm14)"
                />
                {selectedIds.has(aid) && renderHandles(ar, aid)}
              </g>
            )}

            {/* Main Item Group */}
            <g
              data-element-id={iid}
              onMouseDown={e => startDrag(e, iid, r)}
              transform={getTransform(iid, r)}
              style={{ cursor: 'pointer' }}
            >
              {/* Year Label */}
              <text
                x={cx}
                y={r.y - 35}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={18}
                fontWeight={700}
                fill="#282c61"
              >
                {years[i]}
              </text>

              {/* Arrow Banner Shape */}
              <path
                d={`M ${r.x} ${r.y} L ${r.x + r.width} ${r.y} L ${r.x + r.width} ${r.y + ARROW_H1} L ${r.x + r.width + ARROW_W2} ${r.y + ARROW_H1} L ${cx} ${r.y + ARROW_H1 + ARROW_H2} L ${r.x - ARROW_W2} ${r.y + ARROW_H1} L ${r.x} ${r.y + ARROW_H1} Z`}
                fill={color}
                stroke={customStroke || (isSel ? '#3498db' : 'none')}
                strokeWidth={isSel ? 3 : customStrokeWidth}
              />

              {/* Circle inside arrow */}
              <circle cx={cx} cy={r.y + ARROW_H1 / 2 + 10} r={25} fill="none" stroke="white" strokeWidth={2} />
              {iconEl ? (
                <g transform={`translate(${cx - 10}, ${r.y + ARROW_H1 / 2})`}>
                  {iconEl}
                </g>
              ) : (
                <text
                  x={cx}
                  y={r.y + ARROW_H1 / 2 + 16}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={16}
                  fontWeight={700}
                  fill="#ffffff"
                >
                  {bigVal}
                </text>
              )}

              {/* Title & Subtitle Below Arrow */}
              <text
                x={cx}
                y={r.y + ARROW_H1 + ARROW_H2 + 25}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={700}
                fill="#222222"
              >
                {titleLines.map((line, li) => (
                  <tspan key={li} x={cx} dy={li === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>

              {subLines.length > 0 && (
                <text
                  x={cx}
                  y={r.y + ARROW_H1 + ARROW_H2 + 25 + titleLines.length * 16 + 4}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={11.5}
                  fill="#666666"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={cx} dy={li === 0 ? 0 : 14}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {isSel && renderHandles(r, iid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
