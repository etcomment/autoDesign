import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 900
const BADGE_X = 80
const CARD_START_X = 200
const CARD_H = 80
const ITEM_H = 130
const TOP_PAD = 100

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cy: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('badge-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const badgeSize = 64
    if (s) return { ...s, width: s.width || badgeSize, height: s.height || badgeSize }
    return { x: BADGE_X - badgeSize / 2, y: l.cy - badgeSize / 2, width: badgeSize, height: badgeSize }
  }
  if (id.startsWith('card-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const cw = 540
    const cx = CARD_START_X
    const cy = l.cy - CARD_H / 2
    if (s) return { ...s, width: s.width || cw, height: Math.max(s.height || CARD_H, CARD_H) }
    return { x: cx, y: cy, width: cw, height: CARD_H }
  }
  if (id.startsWith('conn-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const l2 = layout.get(id.replace('conn-', 'card-'))
    if (!l2) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || CARD_H, height: s.height || 2 }
    return { x: BADGE_X + 32, y: l.cy, width: CARD_START_X - BADGE_X - 32, height: 2 }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap11Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones } = data
  const N = milestones.length
  const H = TOP_PAD + N * ITEM_H + 60

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cy: number }>()
    milestones.forEach((_, i) => {
      const cy = TOP_PAD + i * ITEM_H + ITEM_H / 2
      m.set(`card-${i}`, { cy })
      m.set(`badge-${i}`, { cy })
      m.set(`conn-${i}`, { cy })
    })
    return m
  }, [milestones])

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
      <rect width={W} height={H} fill="white" rx={8} />
      {title && <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">{title}</text>}

      {milestones.map((ms, i) => {
        const bid = `badge-${i}`
        const mid = `card-${i}`
        const cid = `conn-${i}`
        const br = rects.get(bid)!
        const mr = rects.get(mid)!
        const conr = rects.get(cid)!
        const color = tplColors[mid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSel = selectedIds.has(mid)
        const barH = 26
        const badgeCx = br.x + br.width / 2
        const badgeCy = br.y + br.height / 2
        const pct = Math.round(((i + 1) / milestones.length) * 100)

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, cid, conr)} style={{ cursor: 'pointer' }}>
              <line x1={conr.x} y1={conr.y} x2={conr.x + conr.width} y2={conr.y + conr.height} stroke={color} strokeWidth={1.5} opacity={0.3} />
              {selectedIds.has(cid) && renderHandles(conr, cid)}
            </g>
            <g onMouseDown={e => startDrag(e, bid, br)} style={{ cursor: 'pointer' }}>
              <rect x={br.x} y={br.y} width={br.width} height={br.height} rx={32} fill={color} opacity={0.12} stroke={color} strokeWidth={2} />
              <text x={badgeCx} y={badgeCy - 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={900} fill={color}>{pct}%</text>
              <text x={badgeCx} y={badgeCy + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fontWeight={600} fill={color}>{i + 1}/{milestones.length}</text>
              {selectedIds.has(bid) && renderHandles(br, bid)}
            </g>
            <g onMouseDown={e => startDrag(e, mid, mr)} style={{ cursor: 'pointer' }}>
              <rect x={mr.x} y={mr.y} width={mr.width} height={mr.height} rx={10} fill="white" stroke={isSel ? '#4a90d9' : '#e0e0e0'} strokeWidth={isSel ? 2 : 1} />
              <rect x={mr.x} y={mr.y} width={6} height={mr.height} rx={3} fill={color} />
              <path d={`M${mr.x + 16} ${mr.y} L${mr.x + mr.width - 10} ${mr.y} Q${mr.x + mr.width} ${mr.y} ${mr.x + mr.width} ${mr.y + 10} L${mr.x + mr.width} ${mr.y + barH} L${mr.x + 6} ${mr.y + barH} L${mr.x + 6} ${mr.y + 10} Q${mr.x + 6} ${mr.y} ${mr.x + 16} ${mr.y} Z`} fill={color} opacity={0.15} />
              <text x={mr.x + 20} y={mr.y + barH / 2 + 5} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={color}>{ms.title}</text>
              {ms.subtitle && (
                <text x={mr.x + 20} y={mr.y + barH + 18} fontFamily="Arial, sans-serif" fontSize={10} fill="#777">{ms.subtitle.length > 60 ? ms.subtitle.slice(0, 57) + '...' : ms.subtitle}</text>
              )}
              {isSel && renderHandles(mr, mid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
