import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
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
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
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
  }, [milestones, availableW, N])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('main-title', { x: 45, y: 45, width: 300, height: 40 })
    m.set('track-line', { x: MARGIN_X, y: TOP_Y + 30, width: availableW, height: 2 })
    m.set('start-label', { x: MARGIN_X - 60, y: TOP_Y + 20, width: 50, height: 16 })
    m.set('finish-label', { x: MARGIN_X + availableW + 10, y: TOP_Y + 20, width: 50, height: 16 })
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`conn-${i}`, { x: cx - 1, y: TOP_Y, width: 2, height: 32 })
    })
    return m
  }, [availableW, milestones, N])

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
      {(() => {
        const r = rects.get('main-title')!
        const fill = tplColors['main-title'] ?? '#282c61'
        const stroke = tplStrokeColors['main-title']
        const sW = tplStrokeWidths['main-title'] ?? 1
        return title ? (
          <g onMouseDown={e => startDrag(e, 'main-title', r)} style={{ cursor: 'pointer' }}>
            <text x={r.x} y={r.y + 30} fontFamily="Arial, sans-serif" fontSize={36} fontWeight={800} fill={fill} stroke={stroke} strokeWidth={stroke ? sW : undefined}>
              {title}
            </text>
            <line x1={r.x} y1={r.y + 45} x2={r.x + 60} y2={r.y + 45} stroke={fill} strokeWidth={6} />
            {selectedIds.has('main-title') && renderHandles(r, 'main-title')}
          </g>
        ) : null
      })()}

      {(() => {
        const tr = rects.get('track-line')!
        const stroke = tplStrokeColors['track-line'] ?? '#ccc'
        const sW = tplStrokeWidths['track-line'] ?? 2
        return (
          <g onMouseDown={e => startDrag(e, 'track-line', tr)} style={{ cursor: 'pointer' }}>
            <line x1={tr.x} y1={tr.y} x2={tr.x + tr.width} y2={tr.y} stroke={stroke} strokeWidth={sW} strokeDasharray="6 3" />
            {selectedIds.has('track-line') && renderHandles(tr, 'track-line')}
          </g>
        )
      })()}

      {(() => {
        const sr = rects.get('start-label')!
        const fill = tplColors['start-label'] ?? '#888'
        return (
          <g onMouseDown={e => startDrag(e, 'start-label', sr)} style={{ cursor: 'pointer' }}>
            <text x={sr.x + sr.width / 2} y={sr.y + sr.height} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill={fill}>{startLabel}</text>
            {selectedIds.has('start-label') && renderHandles(sr, 'start-label')}
          </g>
        )
      })()}

      {(() => {
        const fr = rects.get('finish-label')!
        const fill = tplColors['finish-label'] ?? '#888'
        return (
          <g onMouseDown={e => startDrag(e, 'finish-label', fr)} style={{ cursor: 'pointer' }}>
            <text x={fr.x + fr.width / 2} y={fr.y + fr.height} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill={fill}>{finishLabel}</text>
            {selectedIds.has('finish-label') && renderHandles(fr, 'finish-label')}
          </g>
        )
      })()}

      {milestones.map((ms, i) => {
        const bid = `block-${i}`
        const cid = `conn-${i}`
        const br = rects.get(bid)!
        const cr = rects.get(cid)!
        const color = tplColors[bid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const cStroke = tplStrokeColors[cid] ?? color
        const cSW = tplStrokeWidths[cid] ?? 1.5
        const customStroke = tplStrokeColors[bid]
        const customStrokeWidth = tplStrokeWidths[bid] ?? 1
        const styleStroke = ms.style?.stroke
        const isSel = selectedIds.has(bid)
        const isCSel = selectedIds.has(cid)
        const blockCx = br.x + br.width / 2
        const progress = (i + 1) / N
        const styleFontSize = ms.style?.fontSize ?? 12
        const styleFontWeight = ms.style?.fontWeight ?? 700
        const styleFontColor = ms.style?.fontColor ?? '#333'

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, cid, cr)} style={{ cursor: 'pointer' }}>
              <line x1={cr.x + cr.width / 2} y1={cr.y + cr.height} x2={cr.x + cr.width / 2} y2={cr.y} stroke={cStroke} strokeWidth={cSW} opacity={0.5} />
              {isCSel && renderHandles(cr, cid)}
            </g>
            <g onMouseDown={e => startDrag(e, bid, br)} style={{ cursor: 'pointer' }}>
              <rect x={br.x} y={br.y} width={br.width} height={br.height} rx={12} fill="white" stroke={customStroke || (isSel ? '#4a90d9' : (styleStroke || '#e0e0e0'))} strokeWidth={isSel ? 2.5 : customStrokeWidth} />
              <rect x={br.x} y={br.y} width={br.width} height={6} rx={3} fill={color} opacity={0.15} />
              <rect x={br.x} y={br.y} width={br.width * progress} height={6} rx={3} fill={color} />
              <text x={blockCx} y={br.y + 38} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={28} fontWeight={900} fill={color} opacity={0.15}>
                {ms.date ?? String(i + 1).padStart(2, '0')}
              </text>
              <text x={blockCx} y={br.y + 60} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>{ms.title}</text>
              {ms.subtitle && (
                <text x={blockCx} y={br.y + 78} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#888">{ms.subtitle.length > 18 ? ms.subtitle.slice(0, 15) + '...' : ms.subtitle}</text>
              )}
              {ms.date && (
                <text x={blockCx} y={br.y + br.height - 25} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fontWeight={700} fill={color} opacity={0.8}>{ms.date}</text>
              )}
              <text x={blockCx} y={br.y + br.height - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fontWeight={600} fill={color}>{Math.round(progress * 100)}%</text>
              {isSel && renderHandles(br, bid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
