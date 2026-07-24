import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { CircleBadge, ChevronArrow } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const LEFT_X = 150
const RIGHT_X = 850
const ROW_H = 140
const TOP_PAD = 90
const SIDE_PAD = 80

interface Rect { x: number; y: number; width: number; height: number }
interface Point { x: number; y: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { pt: Point; side: 'left' | 'right' }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('circle-')) {
    const l = layout.get(id)
    if (l) return s ? { ...s, width: s.width || 28, height: s.height || 28 } : { x: l.pt.x - 14, y: l.pt.y - 14, width: 28, height: 28 }
  }
  if (id.startsWith('card-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const cardW = 280; const cardH = 75
    const cardX = l.side === 'left' ? LEFT_X - SIDE_PAD - cardW : RIGHT_X + SIDE_PAD
    const cardY = l.pt.y - cardH / 2
    return s ? { ...s, width: s.width || cardW, height: Math.max(s.height || cardH, cardH) } : { x: cardX, y: cardY, width: cardW, height: cardH }
  }
  const g = grey.get(id); return g ? (s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g) : (s || { x: 0, y: 0, width: 0, height: 0 })
}

export function Roadmap3Template({ data }: { data: RoadmapData }): ReactElement {
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
  const H = TOP_PAD + Math.ceil(N / 2) * ROW_H + 100

  const layoutMap = useMemo(() => {
    const m = new Map<string, { pt: Point; side: 'left' | 'right' }>()
    milestones.forEach((_, i) => {
      const row = Math.floor(i / 2)
      const isLeft = i % 2 === 0
      const pt = { x: isLeft ? LEFT_X : RIGHT_X, y: TOP_PAD + row * ROW_H + ROW_H / 2 }
      m.set(`circle-${i}`, { pt, side: isLeft ? 'left' : 'right' })
      m.set(`card-${i}`, { pt, side: isLeft ? 'left' : 'right' })
    })
    return m
  }, [milestones])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    for (let i = 0; i < N - 1; i++) {
      const a = layoutMap.get(`circle-${i}`)!
      const b = layoutMap.get(`circle-${i + 1}`)!
      const cx = Math.min(a.pt.x, b.pt.x)
      const cy = Math.min(a.pt.y, b.pt.y)
      const cw = Math.max(Math.abs(b.pt.x - a.pt.x), 20)
      m.set(`chevron-${i}`, { x: cx + 14, y: cy - 6, width: cw - 28, height: 12 })
    }
    const first = layoutMap.get('circle-0')!
    const last = layoutMap.get(`circle-${N - 1}`)!
    m.set('start-label', { x: first.pt.x - 45, y: first.pt.y - 30, width: 90, height: 16 })
    m.set('finish-label', { x: last.pt.x - 45, y: last.pt.y + 20, width: 90, height: 16 })
    m.set('snake-path', { x: 0, y: 0, width: W, height: H })
    return m
  }, [layoutMap, N, H])

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

  const pathPoints = milestones.map((_, i) => layoutMap.get(`circle-${i}`)!.pt)
  const pathD = pathPoints.length > 1
    ? pathPoints.map((p, i) => {
        if (i === 0) return `M${p.x} ${p.y}`
        const prev = pathPoints[i - 1]!
        const cpx = (prev.x + p.x) / 2
        return `C${cpx} ${prev.y} ${cpx} ${p.y} ${p.x} ${p.y}`
      }).join(' ')
    : ''

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">{title}</text>}

      {pathD && (
        <path d={pathD} fill="none" stroke={tplStrokeColors['snake-path'] ?? '#bbb'} strokeWidth={3} strokeDasharray="8 4" />
      )}

      {(() => {
        const sr = rects.get('snake-path')!
        return selectedIds.has('snake-path') ? renderHandles(sr, 'snake-path') : null
      })()}

      {(() => {
        const sr = rects.get('start-label')!
        return (
          <g onMouseDown={e => startDrag(e, 'start-label', sr)} style={{ cursor: 'pointer' }}>
            <text x={sr.x + sr.width / 2} y={sr.y + sr.height} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#888">{startLabel}</text>
            {selectedIds.has('start-label') && renderHandles(sr, 'start-label')}
          </g>
        )
      })()}

      {(() => {
        const fr = rects.get('finish-label')!
        return (
          <g onMouseDown={e => startDrag(e, 'finish-label', fr)} style={{ cursor: 'pointer' }}>
            <text x={fr.x + fr.width / 2} y={fr.y + fr.height} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#888">{finishLabel}</text>
            {selectedIds.has('finish-label') && renderHandles(fr, 'finish-label')}
          </g>
        )
      })()}

      {milestones.map((ms, i) => {
        const cid = `circle-${i}`
        const mid = `card-${i}`
        const cr = rects.get(cid)!
        const mr = rects.get(mid)!
        const layout = layoutMap.get(cid)!
        const color = tplColors[mid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSel = selectedIds.has(mid)
        const circleCx = cr.x + cr.width / 2
        const circleCy = cr.y + cr.height / 2
        const circleRad = Math.max(5, cr.width / 2)
        const barH = 24

        const isLeft = layout.side === 'left'
        const connX1 = isLeft ? circleCx - circleRad : circleCx + circleRad
        const connX2 = isLeft ? mr.x + mr.width : mr.x
        const connY = mr.y + barH / 2

        return (
          <g key={i}>
            <line x1={connX1} y1={circleCy} x2={connX2} y2={connY} stroke={color} strokeWidth={1.5} opacity={0.4} />
            <g onMouseDown={e => startDrag(e, mid, mr)} style={{ cursor: 'pointer' }}>
              <rect x={mr.x} y={mr.y} width={mr.width} height={mr.height} rx={10} fill="white" stroke={isSel ? '#4a90d9' : '#e0e0e0'} strokeWidth={isSel ? 2 : 1} />
              <path d={`M${mr.x + 10} ${mr.y} L${mr.x + mr.width - 10} ${mr.y} Q${mr.x + mr.width} ${mr.y} ${mr.x + mr.width} ${mr.y + 10} L${mr.x + mr.width} ${mr.y + barH} L${mr.x} ${mr.y + barH} L${mr.x} ${mr.y + 10} Q${mr.x} ${mr.y} ${mr.x + 10} ${mr.y} Z`} fill={color} />
              <text x={mr.x + mr.width / 2} y={mr.y + barH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">{ms.title}</text>
              {ms.subtitle && (
                <text x={mr.x + mr.width / 2} y={mr.y + barH + 17} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#777">{ms.subtitle.length > 36 ? ms.subtitle.slice(0, 33) + '...' : ms.subtitle}</text>
              )}
              {isSel && renderHandles(mr, mid)}
            </g>
            <g onMouseDown={e => startDrag(e, cid, cr)} style={{ cursor: 'pointer' }}>
              <CircleBadge cx={circleCx} cy={circleCy} r={circleRad} fill={color} label={String(i + 1)} />
              {selectedIds.has(cid) && renderHandles(cr, cid)}
            </g>
          </g>
        )
      })}

      {Array.from({ length: N - 1 }, (_, i) => {
        const chid = `chevron-${i}`
        const chr = rects.get(chid)
        if (!chr) return null
        const fill = tplColors[chid] ?? '#ddd'
        return (
          <g key={chid} onMouseDown={e => startDrag(e, chid, chr)} style={{ cursor: 'pointer' }}>
            <ChevronArrow x={chr.x} y={chr.y} width={chr.width} height={chr.height} fill={fill} />
            {selectedIds.has(chid) && renderHandles(chr, chid)}
          </g>
        )
      })}
    </g>
  )
}
