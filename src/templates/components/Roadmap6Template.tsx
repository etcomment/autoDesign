import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const H = 500
const WEEKS = 4
const MARGIN_X = 100
const WEEK_W = (W - MARGIN_X * 2) / WEEKS
const TIMELINE_Y = 120
const CARD_START_Y = 170
const CARD_H = 36
const CARD_GAP = 8

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { weekIdx: number; stackIdx: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('pill-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const wkX = MARGIN_X + l.weekIdx * WEEK_W
    const cx = wkX + WEEK_W / 2
    const pw = WEEK_W - 30
    const py = CARD_START_Y + l.stackIdx * (CARD_H + CARD_GAP)
    if (s) return { ...s, width: s.width || pw, height: s.height || CARD_H }
    return { x: cx - pw / 2, y: py, width: pw, height: CARD_H }
  }
  const g = grey.get(id); return g ? (s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g) : (s || { x: 0, y: 0, width: 0, height: 0 })
}

export function Roadmap6Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
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
        m.set(`pill-${globalIdx}`, { weekIdx, stackIdx })
      })
    })
    return m
  }, [weekAssignments])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('timeline', { x: MARGIN_X, y: TIMELINE_Y, width: WEEK_W * WEEKS, height: 2 })
    for (let wk = 0; wk < WEEKS; wk++) {
      m.set(`wk-label-${wk}`, { x: MARGIN_X + wk * WEEK_W, y: 75, width: WEEK_W, height: 30 })
      if (wk > 0) {
        m.set(`wk-div-${wk}`, { x: MARGIN_X + wk * WEEK_W, y: TIMELINE_Y - 8, width: 2, height: 16 })
      }
    }
    m.set('start-label', { x: MARGIN_X - 60, y: TIMELINE_Y - 30, width: 50, height: 16 })
    m.set('finish-label', { x: MARGIN_X + WEEK_W * WEEKS + 10, y: TIMELINE_Y - 30, width: 50, height: 16 })
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

      {(() => {
        const tr = rects.get('timeline')!
        const stroke = tplStrokeColors['timeline'] ?? '#ccc'
        return (
          <g onMouseDown={e => startDrag(e, 'timeline', tr)} style={{ cursor: 'pointer' }}>
            <line x1={tr.x} y1={tr.y} x2={tr.x + tr.width} y2={tr.y} stroke={stroke} strokeWidth={3} strokeLinecap="round" />
            {selectedIds.has('timeline') && renderHandles(tr, 'timeline')}
          </g>
        )
      })()}

      {(['start', 'finish'] as const).map(kind => {
        const lr = rects.get(`${kind}-label`)!
        return (
          <g key={kind} onMouseDown={e => startDrag(e, `${kind}-label`, lr)} style={{ cursor: 'pointer' }}>
            <text x={lr.x + lr.width / 2} y={lr.y + lr.height} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#999">
              {kind === 'start' ? 'START' : 'FINISH'}
            </text>
            {selectedIds.has(`${kind}-label`) && renderHandles(lr, `${kind}-label`)}
          </g>
        )
      })}

      {Array.from({ length: WEEKS }, (_, wk) => {
        const lr = rects.get(`wk-label-${wk}`)!
        const color = PALETTE[wk % PALETTE.length]!
        return (
          <g key={`wk-${wk}`} onMouseDown={e => startDrag(e, `wk-label-${wk}`, lr)} style={{ cursor: 'pointer' }}>
            <rect x={lr.x + 20} y={lr.y} width={lr.width - 40} height={lr.height} rx={16} fill={color} opacity={0.12} />
            <text x={lr.x + lr.width / 2} y={lr.y + lr.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={color}>{`Week ${wk + 1}`}</text>
            {selectedIds.has(`wk-label-${wk}`) && renderHandles(lr, `wk-label-${wk}`)}
          </g>
        )
      })}

      {Array.from({ length: WEEKS }, (_, wk) => {
        const did = `wk-div-${wk}`
        const dr = rects.get(did)
        if (!dr) return null
        return (
          <g key={did} onMouseDown={e => startDrag(e, did, dr)} style={{ cursor: 'pointer' }}>
            <line x1={dr.x} y1={dr.y} x2={dr.x} y2={dr.y + dr.height} stroke="#ddd" strokeWidth={1.5} strokeDasharray="3 3" />
            {selectedIds.has(did) && renderHandles(dr, did)}
          </g>
        )
      })}

      {milestones.map((ms, i) => {
        const pid = `pill-${i}`
        const pr = rects.get(pid)!
        const l = layoutMap.get(pid)!
        const color = tplColors[pid] ?? ms.style?.fill ?? PALETTE[l.weekIdx % PALETTE.length]!
        const isSel = selectedIds.has(pid)
        const label = `${i + 1}. ${ms.title}`

        return (
          <g key={i} onMouseDown={e => startDrag(e, pid, pr)} style={{ cursor: 'pointer' }}>
            <rect x={pr.x} y={pr.y} width={pr.width} height={pr.height} rx={18} fill="white" stroke={isSel ? '#4a90d9' : color} strokeWidth={isSel ? 2.5 : 1.5} />
            <circle cx={pr.x + 16} cy={pr.y + pr.height / 2} r={9} fill={color} opacity={0.25} />
            <text x={pr.x + 32} y={pr.y + pr.height / 2 + 4} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#333">{label.length > 26 ? label.slice(0, 23) + '...' : label}</text>
            {isSel && renderHandles(pr, pid)}
          </g>
        )
      })}
    </g>
  )
}
