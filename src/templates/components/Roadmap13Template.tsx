import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const H = 480
const MARGIN_X = 80
const WEEKS = 4
const WEEK_W = (W - MARGIN_X * 2) / WEEKS
const HEADER_Y = 90
const HEADER_H = 36
const CARD_START_Y = 150
const CARD_H = 40
const CARD_GAP = 10

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { weekIdx: number; stackIdx: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('card-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const wkX = MARGIN_X + l.weekIdx * WEEK_W
    const pw = WEEK_W - 24
    const py = CARD_START_Y + l.stackIdx * (CARD_H + CARD_GAP)
    const cx = wkX + WEEK_W / 2
    if (s) return { ...s, width: s.width || pw, height: s.height || CARD_H }
    return { x: cx - pw / 2, y: py, width: pw, height: CARD_H }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
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

  const { title, milestones } = data
  const N = milestones.length

  const weekAssignments = useMemo(() => {
    const grouped: number[][] = Array.from({ length: WEEKS }, () => [])
    milestones.forEach((_, i) => {
      const wk = Math.min(Math.floor((i / N) * WEEKS), WEEKS - 1)
      grouped[wk]!.push(i)
    })
    return grouped
  }, [milestones])

  const layoutMap = useMemo(() => {
    const m = new Map<string, { weekIdx: number; stackIdx: number }>()
    weekAssignments.forEach((indices, weekIdx) => {
      indices.forEach((globalIdx, stackIdx) => {
        m.set(`card-${globalIdx}`, { weekIdx, stackIdx })
      })
    })
    return m
  }, [weekAssignments])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    for (let wk = 0; wk < WEEKS; wk++) {
      m.set(`week-header-${wk}`, { x: MARGIN_X + wk * WEEK_W + 8, y: HEADER_Y, width: WEEK_W - 16, height: HEADER_H })
      if (wk < WEEKS - 1) {
        m.set(`week-div-${wk}`, { x: MARGIN_X + (wk + 1) * WEEK_W, y: HEADER_Y - 4, width: 2, height: HEADER_H + 8 })
      }
    }
    return m
  }, [])

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
      <rect width={W} height={H} fill="white" rx={8} />
      {title && <text x={W / 2} y={40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">{title}</text>}

      {Array.from({ length: WEEKS }, (_, wk) => {
        const hid = `week-header-${wk}`
        const hr = rects.get(hid)!
        const color = PALETTE[wk % PALETTE.length]!
        return (
          <g key={hid} onMouseDown={e => startDrag(e, hid, hr)} style={{ cursor: 'pointer' }}>
            <rect x={hr.x} y={hr.y} width={hr.width} height={hr.height} rx={8} fill={color} opacity={0.1} stroke={color} strokeWidth={1} />
            <text x={hr.x + hr.width / 2} y={hr.y + hr.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={color}>{`WEEK ${wk + 1}`}</text>
            {selectedIds.has(hid) && renderHandles(hr, hid)}
          </g>
        )
      })}

      {Array.from({ length: WEEKS - 1 }, (_, wk) => {
        const did = `week-div-${wk}`
        const dr = rects.get(did)
        if (!dr) return null
        return (
          <g key={did} onMouseDown={e => startDrag(e, did, dr)} style={{ cursor: 'pointer' }}>
            <line x1={dr.x} y1={dr.y} x2={dr.x} y2={dr.y + dr.height} stroke="#ddd" strokeWidth={1} strokeDasharray="3 3" />
            {selectedIds.has(did) && renderHandles(dr, did)}
          </g>
        )
      })}

      {milestones.map((ms, i) => {
        const cid = `card-${i}`
        const cr = rects.get(cid)!
        const layout = layoutMap.get(cid)!
        const color = tplColors[cid] ?? ms.style?.fill ?? PALETTE[layout.weekIdx % PALETTE.length]!
        const isSel = selectedIds.has(cid)

        return (
          <g key={i} onMouseDown={e => startDrag(e, cid, cr)} style={{ cursor: 'pointer' }}>
            <rect x={cr.x} y={cr.y} width={cr.width} height={cr.height} rx={8} fill="white" stroke={isSel ? '#4a90d9' : color} strokeWidth={isSel ? 2 : 1} />
            <rect x={cr.x} y={cr.y} width={6} height={cr.height} rx={3} fill={color} />
            <text x={cr.x + 16} y={cr.y + cr.height / 2 + 4} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#333">
              {ms.title}
              {ms.subtitle && ` — ${ms.subtitle.length > 20 ? ms.subtitle.slice(0, 17) + '...' : ms.subtitle}`}
            </text>
            {isSel && renderHandles(cr, cid)}
          </g>
        )
      })}
    </g>
  )
}
