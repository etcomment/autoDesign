import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData, TemplateQuarter } from '../types'
import { CircleBadge } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const H = 450
const TIMELINE_Y = 200
const MARGIN_X = 120
const CARD_W = 180
const CARD_H = 90

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('dot-')) {
    const l = layout.get(id)
    if (l) return s ? { ...s, width: s.width || 16, height: s.height || 16 } : { x: l.cx - 8, y: TIMELINE_Y - 8, width: 16, height: 16 }
  }
  if (id.startsWith('card-')) {
    const l = layout.get(id)
    if (l) return s ? { ...s, width: s.width || CARD_W, height: Math.max(s.height || CARD_H, CARD_H) } : { x: l.cx - CARD_W / 2, y: TIMELINE_Y + 30, width: CARD_W, height: CARD_H }
  }
  if (id.startsWith('year-')) {
    const l = layout.get(id)
    if (l) return s ? { ...s, width: s.width || 80, height: s.height || 22 } : { x: l.cx - 40, y: TIMELINE_Y - 80, width: 80, height: 22 }
  }
  if (id.startsWith('tick-')) {
    const l = layout.get(id)
    if (l) return s ? { ...s, width: s.width || 2, height: s.height || 8 } : { x: l.cx - 1, y: TIMELINE_Y - 4, width: 2, height: 8 }
  }
  const g = grey.get(id); return g ? (s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g) : (s || { x: 0, y: 0, width: 0, height: 0 })
}

export function Roadmap4Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones, quarters, startLabel = 'START', finishLabel = 'FINISH' } = data
  const N = milestones.length
  const availableW = W - MARGIN_X * 2

  const effectiveQuarters: TemplateQuarter[] = quarters?.length ? quarters : Array.from({ length: N }, (_, i) => ({ label: `Phase ${i + 1}`, year: String(2026 + Math.floor(i / 4)) }))

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N > 1 ? (i / (N - 1)) * availableW : availableW / 2)
      m.set(`dot-${i}`, { cx })
      m.set(`card-${i}`, { cx })
      m.set(`tick-${i}`, { cx })
      if (effectiveQuarters[i]) m.set(`year-${i}`, { cx })
    })
    return m
  }, [milestones, effectiveQuarters])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('timeline', { x: MARGIN_X - 20, y: TIMELINE_Y, width: availableW + 40, height: 2 })
    m.set('start-label', { x: MARGIN_X - 60, y: TIMELINE_Y - 65, width: 50, height: 16 })
    m.set('finish-label', { x: MARGIN_X + availableW + 10, y: TIMELINE_Y - 65, width: 50, height: 16 })
    m.set('start-dot', { x: MARGIN_X - 26, y: TIMELINE_Y - 6, width: 12, height: 12 })
    m.set('finish-dot', { x: MARGIN_X + availableW + 14, y: TIMELINE_Y - 6, width: 12, height: 12 })
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
        const stroke = tplStrokeColors['timeline'] ?? '#bbb'
        return (
          <g onMouseDown={e => startDrag(e, 'timeline', tr)} style={{ cursor: 'pointer' }}>
            <line x1={tr.x} y1={tr.y} x2={tr.x + tr.width} y2={tr.y} stroke={stroke} strokeWidth={3} strokeLinecap="round" />
            {selectedIds.has('timeline') && renderHandles(tr, 'timeline')}
          </g>
        )
      })()}

      {['start', 'finish'].map(kind => {
        const dr = rects.get(`${kind}-dot`)!
        const lr = rects.get(`${kind}-label`)!
        const fill = tplColors[`${kind}-dot`] ?? '#bbb'
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
        const cid = `dot-${i}`
        const mid = `card-${i}`
        const tid = `tick-${i}`
        const yid = `year-${i}`
        const dr = rects.get(cid)!
        const mr = rects.get(mid)!
        const tr = rects.get(tid)!
        const yr = effectiveQuarters[i] ? rects.get(yid)! : null
        const color = tplColors[mid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSel = selectedIds.has(mid)
        const dotCx = dr.x + dr.width / 2
        const dotCy = dr.y + dr.height / 2

        const q = effectiveQuarters[i]!

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, tid, tr)} style={{ cursor: 'pointer' }}>
              <line x1={tr.x + tr.width / 2} y1={tr.y} x2={tr.x + tr.width / 2} y2={tr.y + tr.height} stroke={color} strokeWidth={2} />
              {selectedIds.has(tid) && renderHandles(tr, tid)}
            </g>
            <g onMouseDown={e => startDrag(e, cid, dr)} style={{ cursor: 'pointer' }}>
              <CircleBadge cx={dotCx} cy={dotCy} r={dr.width / 2} fill={color} label={String(i + 1)} fontSize={10} />
              {selectedIds.has(cid) && renderHandles(dr, cid)}
            </g>
            {yr && (
              <g onMouseDown={e => startDrag(e, yid, yr)} style={{ cursor: 'pointer' }}>
                <text x={yr.x + yr.width / 2} y={yr.y} dominantBaseline="hanging" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={28} fontWeight={800} fill={color}>{q.label}</text>
                {q.year && <text x={yr.x + yr.width / 2} y={yr.y + 30} dominantBaseline="hanging" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#aaa">{q.year}</text>}
                {selectedIds.has(yid) && renderHandles(yr, yid)}
              </g>
            )}
            <line x1={dotCx} y1={dotCy + dr.width / 2} x2={mr.x + mr.width / 2} y2={mr.y} stroke={color} strokeWidth={1.5} opacity={0.5} />
            <g onMouseDown={e => startDrag(e, mid, mr)} style={{ cursor: 'pointer' }}>
              <rect x={mr.x} y={mr.y} width={mr.width} height={mr.height} rx={10} fill="white" stroke={isSel ? '#4a90d9' : '#e0e0e0'} strokeWidth={isSel ? 2 : 1} />
              <rect x={mr.x} y={mr.y} width={mr.width} height={28} rx={10} fill={color} opacity={0.12} />
              <text x={mr.x + mr.width / 2} y={mr.y + 19} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill={color}>{ms.title}</text>
              {ms.subtitle && (
                <text x={mr.x + mr.width / 2} y={mr.y + 50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#777">{ms.subtitle.length > 22 ? ms.subtitle.slice(0, 19) + '...' : ms.subtitle}</text>
              )}
              {isSel && renderHandles(mr, mid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
