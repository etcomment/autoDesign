import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 880
const CARD_W = 500
const CARD_BASE_H = 90
const CENTER_X = W / 2
const TOP_PAD = 90
const ITEM_H = 140
const STAGGER = 40
const ACCENT_W = 6

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cy: number; isRight: boolean }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  const l = layout.get(id)
  if (!l) {
    const g = grey.get(id); return g ? (s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g) : (s || { x: 0, y: 0, width: 0, height: 0 })
  }
  const cardX = l.isRight ? CENTER_X + STAGGER - CARD_W / 2 : CENTER_X - STAGGER - CARD_W / 2
  const cardY = l.cy - CARD_BASE_H / 2
  if (s) return { ...s, width: s.width || CARD_W, height: Math.max(s.height || CARD_BASE_H, CARD_BASE_H) }
  return { x: cardX, y: cardY, width: CARD_W, height: CARD_BASE_H }
}

export function Roadmap5Template({ data }: { data: RoadmapData }): ReactElement {
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
    const m = new Map<string, { cy: number; isRight: boolean }>()
    milestones.forEach((_, i) => {
      m.set(`card-${i}`, { cy: TOP_PAD + i * ITEM_H + ITEM_H / 2, isRight: i % 2 === 1 })
    })
    return m
  }, [milestones])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    for (let i = 0; i < N - 1; i++) {
      const a = layoutMap.get(`card-${i}`)!
      const b = layoutMap.get(`card-${i + 1}`)!
      m.set(`conn-${i}`, { x: CENTER_X - 1, y: a.cy + CARD_BASE_H / 2, width: 2, height: b.cy - CARD_BASE_H / 2 - a.cy - CARD_BASE_H / 2 })
    }
    return m
  }, [layoutMap, N])

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
        const mid = `card-${i}`
        const mr = rects.get(mid)!

        const color = tplColors[mid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSel = selectedIds.has(mid)
        const num = String(i + 1)
        const numCircleR = 16
        const barH = 24
        const sub = ms.subtitle?.split('\n').filter(Boolean) ?? []

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, mid, mr)} style={{ cursor: 'pointer' }}>
              <rect x={mr.x} y={mr.y} width={mr.width} height={mr.height} rx={10} fill="white" stroke={isSel ? '#4a90d9' : '#e0e0e0'} strokeWidth={isSel ? 2 : 1} filter="url(#card-shadow)" />
              <rect x={mr.x} y={mr.y} width={ACCENT_W} height={mr.height} rx={3} fill={color} />
              <path d={`M${mr.x + ACCENT_W + 10} ${mr.y} L${mr.x + mr.width - 10} ${mr.y} Q${mr.x + mr.width} ${mr.y} ${mr.x + mr.width} ${mr.y + 10} L${mr.x + mr.width} ${mr.y + barH} L${mr.x + ACCENT_W} ${mr.y + barH} L${mr.x + ACCENT_W} ${mr.y + 10} Q${mr.x + ACCENT_W} ${mr.y} ${mr.x + ACCENT_W + 10} ${mr.y} Z`} fill={color} opacity={0.15} />
              <text x={mr.x + ACCENT_W + 12} y={mr.y + barH / 2 + 5} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={color}>{ms.title}</text>
              <circle cx={mr.x + mr.width - 30} cy={mr.y + barH / 2} r={numCircleR} fill={color} opacity={0.18} />
              <text x={mr.x + mr.width - 30} y={mr.y + barH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={800} fill={color}>{num}</text>
              {sub.map((line, li) => (
                <text key={li} x={mr.x + ACCENT_W + 12} y={mr.y + barH + 18 + li * 14} fontFamily="Arial, sans-serif" fontSize={10} fill="#888">{line.length > 55 ? line.slice(0, 52) + '...' : line}</text>
              ))}
              {isSel && renderHandles(mr, mid)}
            </g>
          </g>
        )
      })}

      {Array.from({ length: N - 1 }, (_, i) => {
        const cid = `conn-${i}`
        const cr = rects.get(cid)
        if (!cr) return null
        return (
          <g key={cid} onMouseDown={e => startDrag(e, cid, cr)} style={{ cursor: 'pointer' }}>
            <line x1={cr.x + cr.width / 2} y1={cr.y} x2={cr.x + cr.width / 2} y2={cr.y + cr.height} stroke="#ddd" strokeWidth={2} strokeDasharray="6 4" />
            {selectedIds.has(cid) && renderHandles(cr, cid)}
          </g>
        )
      })}

      <defs>
        <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx={0} dy={2} stdDeviation={4} floodColor="#000" floodOpacity={0.06} />
        </filter>
      </defs>
    </g>
  )
}
