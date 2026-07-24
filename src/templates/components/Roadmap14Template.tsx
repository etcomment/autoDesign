import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { CircleBadge } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const H = 460
const MARGIN_X = 100
const TIMELINE_Y = 170
const YEAR_TOP_Y = 60
const CARD_Y = 200
const CARD_W = 180
const CARD_H = 120

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number; yearLabel: string }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('badge-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const badgeW = 80
    const badgeH = 40
    if (s) return { ...s, width: s.width || badgeW, height: s.height || badgeH }
    return { x: l.cx - badgeW / 2, y: YEAR_TOP_Y, width: badgeW, height: badgeH }
  }
  if (id.startsWith('card-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const cx = l.cx - CARD_W / 2
    const cy = CARD_Y
    if (s) return { ...s, width: s.width || CARD_W, height: Math.max(s.height || CARD_H, CARD_H) }
    return { x: cx, y: cy, width: CARD_W, height: CARD_H }
  }
  if (id.startsWith('dot-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 16, height: s.height || 16 }
    return { x: l.cx - 8, y: TIMELINE_Y - 8, width: 16, height: 16 }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap14Template({ data }: { data: RoadmapData }): ReactElement {
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
  const availableW = W - MARGIN_X * 2

  const years = useMemo(() => {
    const startYear = 2019
    return milestones.map((_, i) => String(startYear + i))
  }, [milestones])

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number; yearLabel: string }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`badge-${i}`, { cx, yearLabel: years[i]! })
      m.set(`card-${i}`, { cx, yearLabel: years[i]! })
      m.set(`dot-${i}`, { cx, yearLabel: years[i]! })
    })
    return m
  }, [milestones, availableW, years])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('timeline', { x: MARGIN_X - 20, y: TIMELINE_Y, width: availableW + 40, height: 2 })
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
      {title && <text x={W / 2} y={35} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">{title}</text>}

      {(() => {
        const tr = rects.get('timeline')!
        const stroke = tplStrokeColors['timeline'] ?? '#bbb'
        return (
          <g onMouseDown={e => startDrag(e, 'timeline', tr)} style={{ cursor: 'pointer' }}>
            <line x1={tr.x} y1={tr.y} x2={tr.x + tr.width} y2={tr.y} stroke={stroke} strokeWidth={3} strokeLinecap="round" />
            {selectedIds.has('timeline') && renderHandles(tr, 'timeline')}
          </g>
        )
      })()}

      {milestones.map((ms, i) => {
        const bid = `badge-${i}`
        const mid = `card-${i}`
        const did = `dot-${i}`
        const br = rects.get(bid)!
        const mr = rects.get(mid)!
        const dr = rects.get(did)!
        const layout = layoutMap.get(mid)!
        const color = tplColors[mid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSel = selectedIds.has(mid)
        const barH = 24
        const dotCx = dr.x + dr.width / 2
        const dotCy = dr.y + dr.height / 2

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, bid, br)} style={{ cursor: 'pointer' }}>
              <rect x={br.x} y={br.y} width={br.width} height={br.height} rx={20} fill={color} opacity={0.12} stroke={color} strokeWidth={1.5} />
              <text x={br.x + br.width / 2} y={br.y + br.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={800} fill={color}>
                {layout.yearLabel}
              </text>
              {selectedIds.has(bid) && renderHandles(br, bid)}
            </g>
            <g onMouseDown={e => startDrag(e, did, dr)} style={{ cursor: 'pointer' }}>
              <CircleBadge cx={dotCx} cy={dotCy} r={dr.width / 2} fill={color} label={String(i + 1)} fontSize={10} />
              {selectedIds.has(did) && renderHandles(dr, did)}
            </g>
            <line x1={dotCx} y1={dotCy + dr.width / 2} x2={mr.x + mr.width / 2} y2={mr.y} stroke={color} strokeWidth={1.5} opacity={0.4} />
            <g onMouseDown={e => startDrag(e, mid, mr)} style={{ cursor: 'pointer' }}>
              <rect x={mr.x} y={mr.y} width={mr.width} height={mr.height} rx={10} fill="white" stroke={isSel ? '#4a90d9' : '#e0e0e0'} strokeWidth={isSel ? 2 : 1} />
              <path d={`M${mr.x + 10} ${mr.y} L${mr.x + mr.width - 10} ${mr.y} Q${mr.x + mr.width} ${mr.y} ${mr.x + mr.width} ${mr.y + 10} L${mr.x + mr.width} ${mr.y + barH} L${mr.x} ${mr.y + barH} L${mr.x} ${mr.y + 10} Q${mr.x} ${mr.y} ${mr.x + 10} ${mr.y} Z`} fill={color} />
              <text x={mr.x + mr.width / 2} y={mr.y + barH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">{ms.title}</text>
              {ms.subtitle && (
                <text x={mr.x + mr.width / 2} y={mr.y + barH + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#777">
                  {ms.subtitle.length > 24 ? ms.subtitle.slice(0, 21) + '...' : ms.subtitle}
                </text>
              )}
              {isSel && renderHandles(mr, mid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
