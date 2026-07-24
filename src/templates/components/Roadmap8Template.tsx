import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const H = 500
const TIMELINE_Y = 460
const MARGIN_X = 60
const CARD_W = 200
const CARD_H = 70

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number; isHigh: boolean }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('card-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const cardY = l.isHigh ? TIMELINE_Y - 180 : TIMELINE_Y - 100
    const cardX = l.cx - CARD_W / 2
    if (s) return { ...s, width: s.width || CARD_W, height: Math.max(s.height || CARD_H, CARD_H) }
    return { x: cardX, y: cardY, width: CARD_W, height: CARD_H }
  }
  if (id.startsWith('dot-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const dotSize = 12
    if (s) return { ...s, width: s.width || dotSize, height: s.height || dotSize }
    return { x: l.cx - dotSize / 2, y: TIMELINE_Y - dotSize / 2, width: dotSize, height: dotSize }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap8Template({ data }: { data: RoadmapData }): ReactElement {
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

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number; isHigh: boolean }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      const isHigh = i % 2 === 0
      m.set(`card-${i}`, { cx, isHigh })
      m.set(`dot-${i}`, { cx, isHigh })
    })
    return m
  }, [milestones, availableW])

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
      {title && <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">{title}</text>}

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

      {milestones.map((ms, i) => {
        const mid = `card-${i}`
        const did = `dot-${i}`
        const mr = rects.get(mid)!
        const dr = rects.get(did)!
        const color = tplColors[mid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSel = selectedIds.has(mid)
        const barH = 24
        const dotCx = dr.x + dr.width / 2
        const dotCy = dr.y + dr.height / 2

        return (
          <g key={i}>
            <line x1={dotCx} y1={dotCy} x2={mr.x + mr.width / 2} y2={mr.y + mr.height} stroke={color} strokeWidth={1.5} opacity={0.4} />
            <g onMouseDown={e => startDrag(e, did, dr)} style={{ cursor: 'pointer' }}>
              <circle cx={dotCx} cy={dotCy} r={dr.width / 2} fill={color} />
              {selectedIds.has(did) && renderHandles(dr, did)}
            </g>
            <g onMouseDown={e => startDrag(e, mid, mr)} style={{ cursor: 'pointer' }}>
              <rect x={mr.x} y={mr.y} width={mr.width} height={mr.height} rx={10} fill="white" stroke={isSel ? '#4a90d9' : '#e0e0e0'} strokeWidth={isSel ? 2 : 1} />
              <path d={`M${mr.x + 10} ${mr.y} L${mr.x + mr.width - 10} ${mr.y} Q${mr.x + mr.width} ${mr.y} ${mr.x + mr.width} ${mr.y + 10} L${mr.x + mr.width} ${mr.y + barH} L${mr.x} ${mr.y + barH} L${mr.x} ${mr.y + 10} Q${mr.x} ${mr.y} ${mr.x + 10} ${mr.y} Z`} fill={color} />
              <text x={mr.x + mr.width / 2} y={mr.y + barH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">{ms.title}</text>
              {ms.subtitle && (
                <text x={mr.x + mr.width / 2} y={mr.y + barH + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#777">{ms.subtitle.length > 28 ? ms.subtitle.slice(0, 25) + '...' : ms.subtitle}</text>
              )}
              {isSel && renderHandles(mr, mid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
