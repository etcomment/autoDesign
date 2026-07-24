import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const H = 450
const MARGIN_X = 140
const ROW1_Y = 170
const ROW2_Y = 340
const LABEL_X = 40
const PILL_H = 34

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { row: number; col: number; colsTotal: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('pill-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const rowY = l.row === 0 ? ROW1_Y : ROW2_Y
    const totalW = W - MARGIN_X - 40
    const colW = totalW / l.colsTotal
    const cx = MARGIN_X + colW / 2 + l.col * colW
    const pw = colW - 20
    const px = cx - pw / 2
    if (s) return { ...s, width: s.width || pw, height: s.height || PILL_H }
    return { x: px, y: rowY - PILL_H / 2, width: pw, height: PILL_H }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap9Template({ data }: { data: RoadmapData }): ReactElement {
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
  const row1Count = Math.ceil(N / 2)
  const row2Count = N - row1Count

  const layoutMap = useMemo(() => {
    const m = new Map<string, { row: number; col: number; colsTotal: number }>()
    milestones.forEach((_, i) => {
      const row = i < row1Count ? 0 : 1
      const col = row === 0 ? i : i - row1Count
      const colsTotal = row === 0 ? row1Count : row2Count
      m.set(`pill-${i}`, { row, col, colsTotal })
    })
    return m
  }, [milestones, row1Count, row2Count])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('line-row0', { x: MARGIN_X, y: ROW1_Y, width: W - MARGIN_X - 40, height: 2 })
    m.set('line-row1', { x: MARGIN_X, y: ROW2_Y, width: W - MARGIN_X - 40, height: 2 })
    m.set('label-row0', { x: LABEL_X, y: ROW1_Y - 12, width: 80, height: 24 })
    m.set('label-row1', { x: LABEL_X, y: ROW2_Y - 12, width: 80, height: 24 })
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
      {title && <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">{title}</text>}

      {[0, 1].map(row => {
        const lid = `line-row${row}`
        const lr = rects.get(lid)!
        const stroke = tplStrokeColors[lid] ?? '#ccc'
        return (
          <g key={lid} onMouseDown={e => startDrag(e, lid, lr)} style={{ cursor: 'pointer' }}>
            <line x1={lr.x} y1={lr.y} x2={lr.x + lr.width} y2={lr.y} stroke={stroke} strokeWidth={2} strokeDasharray="6 3" />
            {selectedIds.has(lid) && renderHandles(lr, lid)}
          </g>
        )
      })}

      {[0, 1].map(row => {
        const lblId = `label-row${row}`
        const lr = rects.get(lblId)!
        return (
          <g key={lblId} onMouseDown={e => startDrag(e, lblId, lr)} style={{ cursor: 'pointer' }}>
            <text x={lr.x} y={lr.y + lr.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#888">
              {row === 0 ? 'Phase 1' : 'Phase 2'}
            </text>
            {selectedIds.has(lblId) && renderHandles(lr, lblId)}
          </g>
        )
      })}

      {milestones.map((ms, i) => {
        const pid = `pill-${i}`
        const pr = rects.get(pid)!
        const color = tplColors[pid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSel = selectedIds.has(pid)
        return (
          <g key={i} onMouseDown={e => startDrag(e, pid, pr)} style={{ cursor: 'pointer' }}>
            <rect x={pr.x} y={pr.y} width={pr.width} height={pr.height} rx={17} fill={color} opacity={0.12} stroke={isSel ? '#4a90d9' : color} strokeWidth={isSel ? 2 : 1} />
            <text x={pr.x + pr.width / 2} y={pr.y + pr.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={color}>{ms.title}</text>
            {isSel && renderHandles(pr, pid)}
          </g>
        )
      })}
    </g>
  )
}
