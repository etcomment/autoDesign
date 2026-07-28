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
  if (id.startsWith('block-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const bx = l.cx - BOX_W / 2
    const by = l.isTop ? LINE_Y - 40 - BOX_H : LINE_Y + 40
    if (s) return { ...s, width: s.width || BOX_W, height: s.height || BOX_H }
    return { x: bx, y: by, width: BOX_W, height: BOX_H }
  }
  return s || { x: 0, y: 0, width: 0, height: 0 }
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
    for (const id of [...layoutMap.keys()]) {
      if (pos[id]) continue
      const r = getRect(id, pos, layoutMap)
      moveEl(id, { x: r.x, y: r.y })
      resizeEl(id, { width: r.width, height: r.height })
    }
  }, [layoutMap, greyMap, pos, moveEl, resizeEl])

  const rects = new Map<string, Rect>()
  for (const id of [...layoutMap.keys()]) {
    rects.set(id, getRect(id, pos, layoutMap))
  }

  return (
    <g ref={svgRef}>
      {/* Horizontal timeline line */}
      <line x1={20} y1={LINE_Y} x2={W - 20} y2={LINE_Y} stroke="#e0e0e0" strokeWidth={4} />

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
            <circle cx={boxCx} cy={LINE_Y} r={8} fill="#e0e0e0" />
            <line x1={boxCx} y1={lineY1} x2={boxCx} y2={lineY2} stroke="#e0e0e0" strokeWidth={3} />
            {isTop ? (
              <polygon points={`${boxCx-6},${lineY2} ${boxCx+6},${lineY2} ${boxCx},${arrowY}`} fill="#e0e0e0" />
            ) : (
              <polygon points={`${boxCx-6},${lineY2} ${boxCx+6},${lineY2} ${boxCx},${arrowY}`} fill="#e0e0e0" />
            )}

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
