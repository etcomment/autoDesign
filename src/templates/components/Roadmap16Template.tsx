import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { CircleBadge } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const H = 500
const START_X = 100
const FINISH_X = 900
const PATH_Y = 200
const PATH_AMP = 80
const CARD_W = 180
const CARD_H = 65

interface Rect { x: number; y: number; width: number; height: number }
interface Point { x: number; y: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, Point>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('circle-')) {
    const p = layout.get(id)
    if (!p) return s || { x: 0, y: 0, width: 0, height: 0 }
    const r = 14
    if (s) return { ...s, width: s.width || r * 2, height: s.height || r * 2 }
    return { x: p.x - r, y: p.y - r, width: r * 2, height: r * 2 }
  }
  if (id.startsWith('card-')) {
    const p = layout.get(id)
    if (!p) return s || { x: 0, y: 0, width: 0, height: 0 }
    const idx = Number(id.split('-')[1])
    const yOffset = idx % 2 === 0 ? -90 : 30
    const cx = p.x - CARD_W / 2
    const cy = p.y + yOffset
    if (s) return { ...s, width: s.width || CARD_W, height: Math.max(s.height || CARD_H, CARD_H) }
    return { x: cx, y: cy, width: CARD_W, height: CARD_H }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap16Template({ data }: { data: RoadmapData }): ReactElement {
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
  const totalX = FINISH_X - START_X

  const curvePoints = useMemo(() => {
    return milestones.map((_, i) => {
      const t = N === 1 ? 0.5 : i / (N - 1)
      const x = START_X + t * totalX
      const wave = Math.sin(t * Math.PI * 3)
      const y = PATH_Y + wave * PATH_AMP
      return { x, y }
    })
  }, [milestones, totalX])

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
    m.set('curved-path', { x: 0, y: 0, width: W, height: H })
    m.set('start-label', { x: START_X - 60, y: PATH_Y - 40, width: 60, height: 16 })
    m.set('finish-label', { x: FINISH_X + 10, y: PATH_Y - 40, width: 60, height: 16 })
    m.set('start-dot', { x: START_X - 6, y: PATH_Y - 6, width: 12, height: 12 })
    m.set('finish-dot', { x: FINISH_X - 6, y: PATH_Y - 6, width: 12, height: 12 })
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

      {['start', 'finish'].map(kind => {
        const dr = rects.get(`${kind}-dot`)!
        const lr = rects.get(`${kind}-label`)!
        const fill = tplColors[`${kind}-dot`] ?? '#999'
        return (
          <g key={kind}>
            <g onMouseDown={e => startDrag(e, `${kind}-dot`, dr)} style={{ cursor: 'pointer' }}>
              <circle cx={dr.x + dr.width / 2} cy={dr.y + dr.height / 2} r={dr.width / 2} fill={fill} />
              {selectedIds.has(`${kind}-dot`) && renderHandles(dr, `${kind}-dot`)}
            </g>
            <g onMouseDown={e => startDrag(e, `${kind}-label`, lr)} style={{ cursor: 'pointer' }}>
              <text x={lr.x + lr.width / 2} y={lr.y + lr.height} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#888">
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
        const barH = 22

        return (
          <g key={i}>
            <line x1={circleCx} y1={circleCy + circleRad} x2={mr.x + mr.width / 2} y2={mr.y + barH} stroke={color} strokeWidth={1.5} opacity={0.35} />
            <g onMouseDown={e => startDrag(e, cid, cr)} style={{ cursor: 'pointer' }}>
              <CircleBadge cx={circleCx} cy={circleCy} r={circleRad} fill={color} label={String(i + 1)} />
              {selectedIds.has(cid) && renderHandles(cr, cid)}
            </g>
            <g onMouseDown={e => startDrag(e, mid, mr)} style={{ cursor: 'pointer' }}>
              <rect x={mr.x} y={mr.y} width={mr.width} height={mr.height} rx={8} fill="white" stroke={isSel ? '#4a90d9' : '#e0e0e0'} strokeWidth={isSel ? 2 : 1} />
              <rect x={mr.x} y={mr.y} width={mr.width} height={barH} rx={8} fill={color} opacity={0.12} />
              <text x={mr.x + mr.width / 2} y={mr.y + barH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill={color}>
                {i === 0 ? `${startLabel}: ${ms.title}` : i === N - 1 ? `${finishLabel}: ${ms.title}` : ms.title}
              </text>
              {isSel && renderHandles(mr, mid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
