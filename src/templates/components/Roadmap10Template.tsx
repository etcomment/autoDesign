import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const LINE_Y = 300
const BOX_W = 160
const BOX_H = 140

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number, isTop: boolean }>): Rect {
  const s = pos[id]
  if (s) return s
  if (id === 'timeline') return { x: 20, y: LINE_Y - 2, width: W - 40, height: 4 }
  
  const match = id.match(/^(node|conn|arrow|block)-(\d+)$/)
  if (!match) return { x: 0, y: 0, width: 0, height: 0 }
  
  const type = match[1]
  const i = match[2]
  const l = layout.get(`block-${i}`)
  if (!l) return { x: 0, y: 0, width: 0, height: 0 }
  
  const bx = l.cx
  const by = l.isTop ? LINE_Y - 40 - BOX_H : LINE_Y + 40
  const boxCx = bx
  const br = { x: bx - BOX_W / 2, y: by, width: BOX_W, height: BOX_H }

  if (type === 'block') {
    return { x: br.x, y: br.y, width: BOX_W, height: BOX_H }
  }
  
  const lineY1 = l.isTop ? LINE_Y - 6 : LINE_Y + 6
  const arrowY = l.isTop ? br.y + br.height : br.y
  const lineY2 = l.isTop ? arrowY + 8 : arrowY - 8

  if (type === 'node') {
    return { x: boxCx - 8, y: LINE_Y - 8, width: 16, height: 16 }
  }
  if (type === 'conn') {
    return { x: boxCx - 1.5, y: Math.min(lineY1, lineY2), width: 3, height: Math.abs(lineY2 - lineY1) }
  }
  if (type === 'arrow') {
    return { x: boxCx - 6, y: Math.min(arrowY, lineY2), width: 12, height: Math.abs(arrowY - lineY2) }
  }
  return { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap10Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { milestones } = data
  const N = Math.max(1, milestones.length)
  
  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number, isTop: boolean }>()
    const availableW = W - 200
    milestones.forEach((_, i) => {
      const cx = 100 + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      const isTop = i % 2 === 0
      m.set(`block-${i}`, { cx, isTop })
    })
    return m
  }, [milestones, N])

  const greyMap = useMemo(() => new Map<string, Rect>(), [])

  useEffect(() => {
    const allIds = ['timeline'];
    for (const id of [...layoutMap.keys()]) {
      allIds.push(id, `node-${id.split('-')[1]}`, `conn-${id.split('-')[1]}`, `arrow-${id.split('-')[1]}`);
    }
    for (const id of allIds) {
      if (pos[id]) continue
      const r = getRect(id, pos, layoutMap)
      moveEl(id, { x: r.x, y: r.y })
      resizeEl(id, { width: r.width, height: r.height })
    }
  }, [layoutMap, greyMap, pos, moveEl, resizeEl])

  const rects = new Map<string, Rect>()
  const allIds = ['timeline'];
  for (const id of [...layoutMap.keys()]) {
    allIds.push(id, `node-${id.split('-')[1]}`, `conn-${id.split('-')[1]}`, `arrow-${id.split('-')[1]}`);
  }
  for (const id of allIds) {
    rects.set(id, getRect(id, pos, layoutMap))
  }

  return (
    <g ref={svgRef}>
      {/* Horizontal timeline line */}
      {(() => {
        const tr = rects.get('timeline')!
        return (
          <g onMouseDown={e => startDrag(e, 'timeline', tr)} style={{ cursor: 'pointer' }}>
            <line x1={tr.x} y1={tr.y + tr.height/2} x2={tr.x + tr.width} y2={tr.y + tr.height/2} stroke={tplColors['timeline'] || "#e0e0e0"} strokeWidth={tr.height} />
            {selectedIds.has('timeline') && renderHandles(tr, 'timeline')}
          </g>
        )
      })()}

      {milestones.map((ms, i) => {
        const bid = `block-${i}`
        const br = rects.get(bid)!
        const layout = layoutMap.get(bid)!
        const color = tplColors[bid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const customStroke = tplStrokeColors[bid]
        const customStrokeWidth = tplStrokeWidths[bid] ?? 1
        const isSel = selectedIds.has(bid)
        
        const isTop = layout.isTop
        const boxCx = br.x + br.width / 2
        
        // Connections
        const lineY1 = isTop ? LINE_Y - 6 : LINE_Y + 6
        const arrowY = isTop ? br.y + br.height : br.y
        const lineY2 = isTop ? arrowY + 8 : arrowY - 8

        // Split subtitle for wrapping
        const subLines = ms.subtitle ? ms.subtitle.split('\n').flatMap(l => l.match(/.{1,20}(\s|$)/g) || []) : []

        return (
          <g key={i}>
            {/* Timeline connection */}
            {(() => {
              const nid = `node-${i}`
              const nr = rects.get(nid)!
              return (
                <g onMouseDown={e => startDrag(e, nid, nr)} style={{ cursor: 'pointer' }}>
                  <circle cx={nr.x + nr.width/2} cy={nr.y + nr.height/2} r={Math.min(nr.width, nr.height)/2} fill={tplColors[nid] || "#e0e0e0"} />
                  {selectedIds.has(nid) && renderHandles(nr, nid)}
                </g>
              )
            })()}
            {(() => {
              const cid = `conn-${i}`
              const cr = rects.get(cid)!
              return (
                <g onMouseDown={e => startDrag(e, cid, cr)} style={{ cursor: 'pointer' }}>
                  <line x1={cr.x + cr.width/2} y1={cr.y} x2={cr.x + cr.width/2} y2={cr.y + cr.height} stroke={tplColors[cid] || "#e0e0e0"} strokeWidth={cr.width || 3} />
                  {selectedIds.has(cid) && renderHandles(cr, cid)}
                </g>
              )
            })()}
            {(() => {
              const aid = `arrow-${i}`
              const ar = rects.get(aid)!
              return (
                <g onMouseDown={e => startDrag(e, aid, ar)} style={{ cursor: 'pointer' }}>
                  <polygon points={isTop 
                    ? `${ar.x},${ar.y+ar.height} ${ar.x+ar.width},${ar.y+ar.height} ${ar.x+ar.width/2},${ar.y}`
                    : `${ar.x},${ar.y} ${ar.x+ar.width},${ar.y} ${ar.x+ar.width/2},${ar.y+ar.height}`} fill={tplColors[aid] || "#e0e0e0"} />
                  {selectedIds.has(aid) && renderHandles(ar, aid)}
                </g>
              )
            })()}

            {/* Milestone Box */}
            <g onMouseDown={e => startDrag(e, bid, br)} style={{ cursor: 'pointer' }}>
              <rect 
                x={br.x} y={br.y} width={br.width} height={br.height} 
                fill={color} 
                stroke={customStroke || (isSel ? '#4a90d9' : 'none')} 
                strokeWidth={isSel ? 2 : customStrokeWidth} 
              />
              <text x={boxCx} y={br.y + 35} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={18} fontWeight={700} fill="#ffffff">
                {ms.title}
              </text>
              {ms.date && (
                <text x={boxCx} y={br.y + 55} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="rgba(255,255,255,0.75)">
                  {ms.date}
                </text>
              )}
              {subLines.map((line, li) => (
                <text key={li} x={boxCx} y={br.y + (ms.date ? 75 : 65) + li * 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="#ffffff">
                  {line.trim()}
                </text>
              ))}
              {isSel && renderHandles(br, bid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
