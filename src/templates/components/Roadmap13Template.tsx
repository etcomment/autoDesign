import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function getDynamicIcon(iconName?: string, size = 18, color = '#ffffff'): ReactElement | null {
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

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, any>): Rect {
  const s = pos[id]
  const l = layout.get(id)
  if (id === 'timeline') {
    if (s) return s
    return { x: 50, y: 298, width: 900, height: 4 }
  }
  if (id.startsWith('node-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 14, height: s.height || 14 }
    return { x: l.cx - 7, y: l.cy - 7, width: 14, height: 14 }
  }
  if (id.startsWith('bubble-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 90, height: s.height || 90 }
    return { x: l.cx - 45, y: l.by - 45, width: 90, height: 90 }
  }
  if (id.startsWith('week-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 140, height: s.height || 70 }
    return { x: l.cx - 70, y: l.isTop ? l.cy + 20 : l.cy - 85, width: 140, height: 70 }
  }
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap13Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { milestones } = data
  const N = milestones.length

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number; cy: number; by: number; isTop: boolean }>()
    m.set('timeline', { cx: 50, cy: 300, by: 0, isTop: false })
    const startX = N === 1 ? 500 : 150
    const dx = N > 1 ? 700 / (N - 1) : 0
    milestones.forEach((_, i) => {
      const isTop = i % 2 === 0
      const cx = startX + i * dx
      const cy = 300
      const by = isTop ? cy - 90 : cy + 90
      m.set(`bubble-${i}`, { cx, cy, by, isTop })
      m.set(`week-${i}`, { cx, cy, by, isTop })
      m.set(`node-${i}`, { cx, cy, by, isTop })
    })
    return m
  }, [milestones, N])

  useEffect(() => {
    for (const id of layoutMap.keys()) {
      if (pos[id]) continue
      const r = getRect(id, pos, layoutMap)
      moveEl(id, { x: r.x, y: r.y })
      resizeEl(id, { width: r.width, height: r.height })
    }
  }, [layoutMap, pos, moveEl, resizeEl])

  const rects = new Map<string, Rect>()
  for (const id of layoutMap.keys()) {
    rects.set(id, getRect(id, pos, layoutMap))
  }

  return (
    <g ref={svgRef}>
      {(() => {
        const tr = rects.get('timeline')!
        return (
          <g
            data-element-id="timeline"
            onMouseDown={e => startDrag(e, 'timeline', tr)}
            transform={getTransform('timeline', tr)}
            style={{ cursor: 'pointer' }}
          >
            <line
              x1={tr.x}
              y1={tr.y + tr.height / 2}
              x2={tr.x + tr.width}
              y2={tr.y + tr.height / 2}
              stroke={tplColors['timeline'] || '#dcdcdc'}
              strokeWidth={tr.height}
            />
            {selectedIds.has('timeline') && renderHandles(tr, 'timeline')}
          </g>
        )
      })()}

      {milestones.map((ms, i) => {
        const bid = `bubble-${i}`
        const wid = `week-${i}`
        const nid = `node-${i}`
        const br = rects.get(bid)!
        const wr = rects.get(wid)!
        const nr = rects.get(nid)!
        const l = layoutMap.get(bid)!
        const color = tplColors[bid] ?? ms.style?.fill ?? ms.color ?? PALETTE[i % PALETTE.length]!
        const isSelBubble = selectedIds.has(bid)
        const isSelWeek = selectedIds.has(wid)
        const isSelNode = selectedIds.has(nid)

        const bcx = br.x + br.width / 2
        const bcy = br.y + br.height / 2
        const radius = Math.min(br.width, br.height) / 2
        const triW = 20
        const triH = 15

        const dTop = `M ${bcx - triW / 2} ${bcy + radius - 2} L ${bcx + triW / 2} ${bcy + radius - 2} L ${bcx} ${bcy + radius + triH} Z`
        const dBot = `M ${bcx - triW / 2} ${bcy - radius + 2} L ${bcx + triW / 2} ${bcy - radius + 2} L ${bcx} ${bcy - radius - triH} Z`

        const maxTitleChars = Math.max(6, Math.floor(br.width / 8.5))
        const titleLines = wrapTextByWidth(ms.title || `Task ${i + 1}`, maxTitleChars)

        const maxSubChars = Math.max(8, Math.floor(wr.width / 7))
        const subLines = ms.subtitle ? wrapTextByWidth(ms.subtitle, maxSubChars) : []

        const dateStr = ms.date || (ms.quarter ? ms.quarter : `WEEK ${i + 1}`)
        const iconEl = getDynamicIcon(ms.icon, 18, '#ffffff')

        return (
          <g key={i}>
            {/* Timeline Node */}
            <g
              data-element-id={nid}
              onMouseDown={e => startDrag(e, nid, nr)}
              transform={getTransform(nid, nr)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={nr.x + nr.width / 2}
                cy={nr.y + nr.height / 2}
                r={Math.min(nr.width, nr.height) / 2}
                fill={tplColors[nid] || color}
              />
              {isSelNode && renderHandles(nr, nid)}
            </g>

            {/* Bubble */}
            <g
              data-element-id={bid}
              onMouseDown={e => startDrag(e, bid, br)}
              transform={getTransform(bid, br)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={bcx} cy={bcy} r={radius} fill={color} />
              <path d={l.isTop ? dTop : dBot} fill={color} />
              <g transform={`translate(${bcx}, ${bcy + 4 - (titleLines.length - 1) * 7})`}>
                {iconEl && (
                  <g transform="translate(-9, -20)">
                    {iconEl}
                  </g>
                )}
                <text
                  x={0}
                  y={0}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={13}
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  {titleLines.map((line, li) => (
                    <tspan key={li} x={0} dy={li === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
              {isSelBubble && renderHandles(br, bid)}
            </g>

            {/* Week / Date Label and Subtitle */}
            <g
              data-element-id={wid}
              onMouseDown={e => startDrag(e, wid, wr)}
              transform={getTransform(wid, wr)}
              style={{ cursor: 'pointer' }}
            >
              <text
                x={wr.x + wr.width / 2}
                y={wr.y + 18}
                textAnchor="middle"
                fill="#1e375a"
                fontSize={15}
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
              >
                {dateStr}
              </text>
              {subLines.length > 0 && (
                <text
                  x={wr.x + wr.width / 2}
                  y={wr.y + 36}
                  textAnchor="middle"
                  fill="#555555"
                  fontSize={11.5}
                  fontFamily="Arial, sans-serif"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={wr.x + wr.width / 2} dy={li === 0 ? 0 : 14}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
              {isSelWeek && renderHandles(wr, wid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
