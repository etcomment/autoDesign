import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { CircleBadge } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const LINE_X = 120
const CARD_START_X = 160
const CARD_W = 680
const CARD_H = 85
const ITEM_H = 130
const TOP_PAD = 90
const BOTTOM_PAD = 60

interface Rect { x: number; y: number; width: number; height: number }

function getRect(
  id: string,
  pos: Record<string, Rect>,
  layout: Map<string, { cy: number }>,
  grey: Map<string, Rect>
): Rect {
  const s = pos[id]
  if (id.startsWith('circle-')) {
    const l = layout.get(id)
    if (l) return s ? { ...s, width: s.width || 28, height: s.height || 28 } : { x: LINE_X - 14, y: l.cy - 14, width: 28, height: 28 }
  }
  if (id.startsWith('card-')) {
    const l = layout.get(id)
    if (l) return s ? { ...s, width: s.width || CARD_W, height: Math.max(s.height || CARD_H, CARD_H) } : { x: CARD_START_X, y: l.cy - CARD_H / 2, width: CARD_W, height: CARD_H }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap2Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones, startLabel = 'START', finishLabel = 'FINISH' } = data
  const N = milestones.length
  const H = TOP_PAD + N * ITEM_H + BOTTOM_PAD
  const lineTop = TOP_PAD - 10
  const lineBot = TOP_PAD + N * ITEM_H + 10

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cy: number }>()
    milestones.forEach((_, i) => {
      const cy = TOP_PAD + i * ITEM_H + ITEM_H / 2
      m.set(`card-${i}`, { cy })
      m.set(`circle-${i}`, { cy })
    })
    return m
  }, [milestones])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('vline', { x: LINE_X, y: lineTop, width: 2, height: lineBot - lineTop })
    m.set('start-label', { x: LINE_X - 50, y: TOP_PAD - 62, width: 100, height: 16 })
    m.set('finish-label', { x: LINE_X - 50, y: lineBot + 8, width: 100, height: 16 })
    m.set('start-dot', { x: LINE_X - 8, y: TOP_PAD - 37, width: 16, height: 16 })
    m.set('finish-dot', { x: LINE_X - 8, y: lineBot + 38, width: 16, height: 16 })
    return m
  }, [lineTop, lineBot])

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
        const r = rects.get('vline')!
        const stroke = tplStrokeColors['vline'] ?? '#ccc'
        return (
          <g onMouseDown={e => startDrag(e, 'vline', r)} style={{ cursor: 'pointer' }}>
            <line x1={r.x} y1={r.y} x2={r.x} y2={r.y + r.height} stroke={stroke} strokeWidth={3} strokeLinecap="round" />
            {selectedIds.has('vline') && renderHandles(r, 'vline')}
          </g>
        )
      })()}

      {['start', 'finish'].map(kind => {
        const dr = rects.get(`${kind}-dot`)!
        const lr = rects.get(`${kind}-label`)!
        const fill = tplColors[`${kind}-dot`] ?? '#999'
        const ctx = dr.x + dr.width / 2
        const cty = dr.y + dr.height / 2
        const cr = dr.width / 2
        return (
          <g key={kind}>
            <g onMouseDown={e => startDrag(e, `${kind}-dot`, dr)} style={{ cursor: 'pointer' }}>
              <circle cx={ctx} cy={cty} r={cr} fill={fill} />
              {selectedIds.has(`${kind}-dot`) && renderHandles(dr, `${kind}-dot`)}
            </g>
            <g onMouseDown={e => startDrag(e, `${kind}-label`, lr)} style={{ cursor: 'pointer' }}>
              <text x={lr.x + lr.width / 2} y={lr.y + lr.height} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#666">
                {kind === 'start' ? startLabel : finishLabel}
              </text>
              {selectedIds.has(`${kind}-label`) && renderHandles(lr, `${kind}-label`)}
            </g>
          </g>
        )
      })}

      {milestones.map((ms, i) => {
        const cid = `circle-${i}`
        const mid = `card-${i}`
        const cr = rects.get(cid)!
        const mr = rects.get(mid)!
        const color = tplColors[mid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSel = selectedIds.has(mid)
        const circleCx = cr.x + cr.width / 2
        const circleCy = cr.y + cr.height / 2
        const circleRad = Math.max(5, cr.width / 2)
        const barH = 26
        const sub = ms.subtitle?.split('\n').filter(Boolean) ?? []

        return (
          <g key={i}>
            <line x1={circleCx + circleRad} y1={circleCy} x2={mr.x} y2={mr.y + barH / 2} stroke={color} strokeWidth={1.5} opacity={0.45} />
            <g onMouseDown={e => startDrag(e, mid, mr)} style={{ cursor: 'pointer' }}>
              <rect x={mr.x} y={mr.y} width={mr.width} height={mr.height} rx={8} fill="white" stroke={isSel ? '#4a90d9' : '#e0e0e0'} strokeWidth={isSel ? 2 : 1} />
              <path d={`M${mr.x + 8} ${mr.y} L${mr.x + mr.width - 8} ${mr.y} Q${mr.x + mr.width} ${mr.y} ${mr.x + mr.width} ${mr.y + 8} L${mr.x + mr.width} ${mr.y + barH} L${mr.x} ${mr.y + barH} L${mr.x} ${mr.y + 8} Q${mr.x} ${mr.y} ${mr.x + 8} ${mr.y} Z`} fill={color} />
              <text x={mr.x + mr.width / 2} y={mr.y + barH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">{ms.title}</text>
              {sub.map((line, li) => (
                <text key={li} x={mr.x + mr.width / 2} y={mr.y + barH + 18 + li * 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#777">{line.length > 80 ? line.slice(0, 77) + '...' : line}</text>
              ))}
              {isSel && renderHandles(mr, mid)}
            </g>
            <g onMouseDown={e => startDrag(e, cid, cr)} style={{ cursor: 'pointer' }}>
              <CircleBadge cx={circleCx} cy={circleCy} r={circleRad} fill={color} label={String(i + 1)} />
              {selectedIds.has(cid) && renderHandles(cr, cid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
