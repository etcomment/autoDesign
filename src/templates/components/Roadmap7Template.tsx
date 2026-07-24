import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { CircleBadge } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const H = 500
const MARGIN_X = 80
const CURVE_CY = 220
const CURVE_AMP = 80
const CARD_W = 200
const CARD_H = 72

interface Rect { x: number; y: number; width: number; height: number }
interface Point { x: number; y: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, Point>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('circle-')) {
    const p = layout.get(id)
    if (p) return s ? { ...s, width: s.width || 28, height: s.height || 28 } : { x: p.x - 14, y: p.y - 14, width: 28, height: 28 }
  }
  if (id.startsWith('card-')) {
    const p = layout.get(id)
    if (p) {
      const indexes = Number(id.split('-')[1])
      const cy = p.y + 30 + (indexes % 2 === 0 ? 0 : CARD_H + 20)
      const cx = p.x - CARD_W / 2
      return s ? { ...s, width: s.width || CARD_W, height: Math.max(s.height || CARD_H, CARD_H) } : { x: cx, y: cy, width: CARD_W, height: CARD_H }
    }
  }
  const g = grey.get(id); return g ? (s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g) : (s || { x: 0, y: 0, width: 0, height: 0 })
}

export function Roadmap7Template({ data }: { data: RoadmapData }): ReactElement {
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
  const availableW = W - MARGIN_X * 2

  const curvePoints = useMemo(() => {
    return milestones.map((_, i) => {
      const t = N === 1 ? 0.5 : i / (N - 1)
      const x = MARGIN_X + t * availableW
      const y = CURVE_CY + Math.sin(t * Math.PI * 2) * CURVE_AMP
      return { x, y }
    })
  }, [milestones, availableW])

  const layoutMap = useMemo(() => {
    const m = new Map<string, Point>()
    curvePoints.forEach((pt, i) => {
      m.set(`circle-${i}`, pt)
      m.set(`card-${i}`, pt)
    })
    return m
  }, [curvePoints])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    if (curvePoints.length > 0) {
      m.set('start-label', { x: curvePoints[0]!.x - 50, y: curvePoints[0]!.y - 40, width: 60, height: 16 })
      m.set('finish-label', { x: curvePoints[N - 1]!.x + 10, y: curvePoints[N - 1]!.y - 20, width: 60, height: 16 })
    }
    m.set('curved-path', { x: 0, y: 0, width: W, height: H })
    return m
  }, [curvePoints, N, H])

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

  const pathD = curvePoints.length > 1
    ? curvePoints.map((p, i) => {
        if (i === 0) return `M${p.x} ${p.y}`
        const prev = curvePoints[i - 1]!
        const cpx = (prev.x + p.x) / 2
        return `C${cpx} ${prev.y} ${cpx} ${p.y} ${p.x} ${p.y}`
      }).join(' ')
    : ''

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && <text x={W / 2} y={40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">{title}</text>}

      {pathD && (
        <path d={pathD} fill="none" stroke={tplStrokeColors['curved-path'] ?? '#bbb'} strokeWidth={3} strokeLinecap="round" />
      )}
      {(() => {
        const pr = rects.get('curved-path')!
        return selectedIds.has('curved-path') ? renderHandles(pr, 'curved-path') : null
      })()}

      {(() => {
        const sr = rects.get('start-label')!
        return (
          <g onMouseDown={e => startDrag(e, 'start-label', sr)} style={{ cursor: 'pointer' }}>
            <text x={sr.x + sr.width / 2} y={sr.y + sr.height} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#888">{startLabel}</text>
            {selectedIds.has('start-label') && renderHandles(sr, 'start-label')}
          </g>
        )
      })()}

      {(() => {
        const fr = rects.get('finish-label')!
        return (
          <g onMouseDown={e => startDrag(e, 'finish-label', fr)} style={{ cursor: 'pointer' }}>
            <text x={fr.x + fr.width / 2} y={fr.y + fr.height} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#888">{finishLabel}</text>
            {selectedIds.has('finish-label') && renderHandles(fr, 'finish-label')}
          </g>
        )
      })()}

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

        return (
          <g key={i}>
            <line x1={circleCx} y1={circleCy + circleRad} x2={mr.x + mr.width / 2} y2={mr.y} stroke={color} strokeWidth={1.5} opacity={0.4} />
            <g onMouseDown={e => startDrag(e, mid, mr)} style={{ cursor: 'pointer' }}>
              <rect x={mr.x} y={mr.y} width={mr.width} height={mr.height} rx={10} fill="white" stroke={isSel ? '#4a90d9' : '#e0e0e0'} strokeWidth={isSel ? 2 : 1} />
              <path d={`M${mr.x + 10} ${mr.y} L${mr.x + mr.width - 10} ${mr.y} Q${mr.x + mr.width} ${mr.y} ${mr.x + mr.width} ${mr.y + 10} L${mr.x + mr.width} ${mr.y + barH} L${mr.x} ${mr.y + barH} L${mr.x} ${mr.y + 10} Q${mr.x} ${mr.y} ${mr.x + 10} ${mr.y} Z`} fill={color} />
              <text x={mr.x + mr.width / 2} y={mr.y + barH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">{ms.title}</text>
              {ms.subtitle && (
                <text x={mr.x + mr.width / 2} y={mr.y + barH + 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#777">{ms.subtitle.length > 26 ? ms.subtitle.slice(0, 23) + '...' : ms.subtitle}</text>
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
    </g>
  )
}
