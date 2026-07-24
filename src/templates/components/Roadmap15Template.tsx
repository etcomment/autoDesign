import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const H = 400
const MARGIN_X = 60
const BLOCK_W = 140
const BLOCK_H = 160
const TOP_Y = 110

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('block-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const bx = l.cx - BLOCK_W / 2
    if (s) return { ...s, width: s.width || BLOCK_W, height: Math.max(s.height || BLOCK_H, BLOCK_H) }
    return { x: bx, y: TOP_Y, width: BLOCK_W, height: BLOCK_H }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap15Template({ data }: { data: RoadmapData }): ReactElement {
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

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`block-${i}`, { cx })
    })
    return m
  }, [milestones, availableW])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('track-line', { x: MARGIN_X, y: TOP_Y + 30, width: availableW, height: 2 })
    m.set('start-label', { x: MARGIN_X - 60, y: TOP_Y + 20, width: 50, height: 16 })
    m.set('finish-label', { x: MARGIN_X + availableW + 10, y: TOP_Y + 20, width: 50, height: 16 })
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
        const tr = rects.get('track-line')!
        const stroke = tplStrokeColors['track-line'] ?? '#ccc'
        return (
          <g onMouseDown={e => startDrag(e, 'track-line', tr)} style={{ cursor: 'pointer' }}>
            <line x1={tr.x} y1={tr.y} x2={tr.x + tr.width} y2={tr.y} stroke={stroke} strokeWidth={2} strokeDasharray="6 3" />
            {selectedIds.has('track-line') && renderHandles(tr, 'track-line')}
          </g>
        )
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
        const bid = `block-${i}`
        const br = rects.get(bid)!
        const color = tplColors[bid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSel = selectedIds.has(bid)
        const blockCx = br.x + br.width / 2
        const progress = (i + 1) / N

        return (
          <g key={i} onMouseDown={e => startDrag(e, bid, br)} style={{ cursor: 'pointer' }}>
            <line x1={blockCx} y1={TOP_Y + 32} x2={blockCx} y2={br.y} stroke={color} strokeWidth={1.5} opacity={0.5} />
            <rect x={br.x} y={br.y} width={br.width} height={br.height} rx={12} fill="white" stroke={isSel ? '#4a90d9' : '#e0e0e0'} strokeWidth={isSel ? 2 : 1} />
            <rect x={br.x} y={br.y} width={br.width} height={6} rx={3} fill={color} opacity={0.15} />
            <rect x={br.x} y={br.y} width={br.width * progress} height={6} rx={3} fill={color} />
            <text x={blockCx} y={br.y + 38} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={28} fontWeight={900} fill={color} opacity={0.15}>
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x={blockCx} y={br.y + 60} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#333">{ms.title}</text>
            {ms.subtitle && (
              <text x={blockCx} y={br.y + 78} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#888">{ms.subtitle.length > 18 ? ms.subtitle.slice(0, 15) + '...' : ms.subtitle}</text>
            )}
            <text x={blockCx} y={br.y + br.height - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fontWeight={600} fill={color}>{Math.round(progress * 100)}%</text>
            {isSel && renderHandles(br, bid)}
          </g>
        )
      })}
    </g>
  )
}
