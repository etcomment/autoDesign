import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, any>): Rect {
  const s = pos[id]
  const l = layout.get(id)
  if (id.startsWith('bubble-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 80, height: s.height || 80 }
    return { x: l.cx - 40, y: l.by - 40, width: 80, height: 80 }
  }
  if (id.startsWith('week-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 120, height: s.height || 50 }
    return { x: l.cx - 60, y: l.isTop ? l.cy + 20 : l.cy - 70, width: 120, height: 50 }
  }
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap13Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { milestones } = data
  const N = milestones.length

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number; cy: number; by: number; isTop: boolean }>()
    const startX = N === 1 ? 500 : 150
    const dx = N > 1 ? 700 / (N - 1) : 0
    milestones.forEach((_, i) => {
      const isTop = i % 2 === 0
      const cx = startX + i * dx
      const cy = 300
      const by = isTop ? cy - 80 : cy + 80
      m.set(`bubble-${i}`, { cx, cy, by, isTop })
      m.set(`week-${i}`, { cx, cy, by, isTop })
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
      <line x1={50} y1={300} x2={950} y2={300} stroke="#dcdcdc" strokeWidth={4} />

      {milestones.map((ms, i) => {
        const bid = `bubble-${i}`
        const wid = `week-${i}`
        const br = rects.get(bid)!
        const wr = rects.get(wid)!
        const l = layoutMap.get(bid)!
        const color = tplColors[bid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSelBubble = selectedIds.has(bid)
        const isSelWeek = selectedIds.has(wid)

        const bcx = br.x + br.width / 2
        const bcy = br.y + br.height / 2
        const radius = Math.min(br.width, br.height) / 2
        const triW = 20
        const triH = 15

        const dTop = `M ${bcx - triW / 2} ${bcy + radius - 2} L ${bcx + triW / 2} ${bcy + radius - 2} L ${bcx} ${bcy + radius + triH} Z`
        const dBot = `M ${bcx - triW / 2} ${bcy - radius + 2} L ${bcx + triW / 2} ${bcy - radius + 2} L ${bcx} ${bcy - radius - triH} Z`

        return (
          <g key={i}>
            <circle cx={l.cx} cy={l.cy} r={7} fill="#dcdcdc" />
            
            <g onMouseDown={e => startDrag(e, bid, br)} style={{ cursor: 'pointer' }}>
              <circle cx={bcx} cy={bcy} r={radius} fill={color} />
              <path d={l.isTop ? dTop : dBot} fill={color} />
              <text x={bcx} y={bcy} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">
                {ms.title.length > 15 ? ms.title.slice(0, 15) + '...' : ms.title}
              </text>
              {isSelBubble && renderHandles(br, bid)}
            </g>

            <g onMouseDown={e => startDrag(e, wid, wr)} style={{ cursor: 'pointer' }}>
              <text x={wr.x + wr.width / 2} y={wr.y + 20} textAnchor="middle" fill="#1e375a" fontSize={16} fontWeight="bold">
                {ms.date ?? `WEEK ${i + 1}`}
              </text>
              {ms.subtitle && (
                <text x={wr.x + wr.width / 2} y={wr.y + 40} textAnchor="middle" fill="#555" fontSize={12}>
                  {ms.subtitle.length > 25 ? ms.subtitle.slice(0, 25) + '...' : ms.subtitle}
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
