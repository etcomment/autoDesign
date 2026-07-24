import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { ChevronArrow } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const H = 460
const MARGIN_X = 60
const STEP_Y = 100
const CARD_W = 200
const CARD_H = 120
const ARROW_H = 12

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('step-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const sw = 120
    const sh = 36
    const sx = l.cx - sw / 2
    if (s) return { ...s, width: s.width || sw, height: s.height || sh }
    return { x: sx, y: STEP_Y, width: sw, height: sh }
  }
  if (id.startsWith('card-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const cx = l.cx - CARD_W / 2
    const cy = STEP_Y + 60
    if (s) return { ...s, width: s.width || CARD_W, height: Math.max(s.height || CARD_H, CARD_H) }
    return { x: cx, y: cy, width: CARD_W, height: CARD_H }
  }
  if (id.startsWith('arrow-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const aw = 40
    if (s) return { ...s, width: s.width || aw, height: s.height || ARROW_H }
    return { x: l.cx - aw / 2, y: STEP_Y + ARROW_H / 2, width: aw, height: ARROW_H }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap12Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones } = data
  const N = milestones.length
  const availableW = W - MARGIN_X * 2

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`step-${i}`, { cx })
      m.set(`card-${i}`, { cx })
      if (i < N - 1) {
        const nextCx = MARGIN_X + ((i + 1) / (N - 1)) * availableW
        const midCx = (cx + nextCx) / 2
        m.set(`arrow-${i}`, { cx: midCx })
      }
    })
    return m
  }, [milestones, availableW])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('path-line', { x: MARGIN_X, y: STEP_Y + 18, width: availableW, height: 2 })
    return m
  }, [availableW])

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

      {(() => {
        const pr = rects.get('path-line')!
        return (
          <g onMouseDown={e => startDrag(e, 'path-line', pr)} style={{ cursor: 'pointer' }}>
            <line x1={pr.x} y1={pr.y} x2={pr.x + pr.width} y2={pr.y} stroke="#ddd" strokeWidth={2} strokeDasharray="4 3" />
            {selectedIds.has('path-line') && renderHandles(pr, 'path-line')}
          </g>
        )
      })()}

      {milestones.map((ms, i) => {
        const sid = `step-${i}`
        const mid = `card-${i}`
        const sr = rects.get(sid)!
        const mr = rects.get(mid)!
        const color = tplColors[mid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSel = selectedIds.has(mid)
        const barH = 24

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, sid, sr)} style={{ cursor: 'pointer' }}>
              <rect x={sr.x} y={sr.y} width={sr.width} height={sr.height} rx={18} fill={color} />
              <text x={sr.x + sr.width / 2} y={sr.y + sr.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                {`Step ${String(i + 1).padStart(2, '0')}`}
              </text>
              {selectedIds.has(sid) && renderHandles(sr, sid)}
            </g>
            <line x1={sr.x + sr.width / 2} y1={sr.y + sr.height} x2={mr.x + mr.width / 2} y2={mr.y} stroke={color} strokeWidth={1.5} opacity={0.4} />
            <g onMouseDown={e => startDrag(e, mid, mr)} style={{ cursor: 'pointer' }}>
              <rect x={mr.x} y={mr.y} width={mr.width} height={mr.height} rx={10} fill="white" stroke={isSel ? '#4a90d9' : '#e0e0e0'} strokeWidth={isSel ? 2 : 1} />
              <path d={`M${mr.x + 10} ${mr.y} L${mr.x + mr.width - 10} ${mr.y} Q${mr.x + mr.width} ${mr.y} ${mr.x + mr.width} ${mr.y + 10} L${mr.x + mr.width} ${mr.y + barH} L${mr.x} ${mr.y + barH} L${mr.x} ${mr.y + 10} Q${mr.x} ${mr.y} ${mr.x + 10} ${mr.y} Z`} fill={color} />
              <text x={mr.x + mr.width / 2} y={mr.y + barH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">{ms.title}</text>
              {ms.subtitle && (
                <text x={mr.x + mr.width / 2} y={mr.y + barH + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#777">
                  {ms.subtitle.length > 26 ? ms.subtitle.slice(0, 23) + '...' : ms.subtitle}
                </text>
              )}
              {isSel && renderHandles(mr, mid)}
            </g>
          </g>
        )
      })}

      {Array.from({ length: N - 1 }, (_, i) => {
        const aid = `arrow-${i}`
        const ar = rects.get(aid)
        if (!ar) return null
        const color = tplColors[`card-${i + 1}`] ?? PALETTE[(i + 1) % PALETTE.length]!
        return (
          <g key={aid} onMouseDown={e => startDrag(e, aid, ar)} style={{ cursor: 'pointer' }}>
            <ChevronArrow x={ar.x} y={ar.y} width={ar.width} height={ar.height} fill={color} />
            {selectedIds.has(aid) && renderHandles(ar, aid)}
          </g>
        )
      })}
    </g>
  )
}
