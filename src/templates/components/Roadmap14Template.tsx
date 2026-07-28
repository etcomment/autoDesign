import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = ['#282c61', '#3267d6', '#f25138', '#fbb200', '#56c29b']
const W = 1000
const MARGIN_X = 100
const TOP_Y = 120
const ARROW_W = 120
const ARROW_H1 = 80
const ARROW_H2 = 60
const ARROW_W2 = 25

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('item-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || ARROW_W, height: s.height || (ARROW_H1 + ARROW_H2) }
    return { x: l.cx - ARROW_W / 2, y: TOP_Y, width: ARROW_W, height: ARROW_H1 + ARROW_H2 }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap14Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones } = data
  const N = milestones.length
  const availableW = W - MARGIN_X * 2

  const years = useMemo(() => {
    const startYear = 2019
    return milestones.map((ms, i) => ms.date ?? String(startYear + i))
  }, [milestones])

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`item-${i}`, { cx })
    })
    return m
  }, [milestones, availableW])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('main-title', { x: 45, y: 45, width: 300, height: 40 })
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

  return (
    <g ref={svgRef}>
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#d0d0d0" />
        </marker>
      </defs>
      
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

      {milestones.map((ms, i) => {
        const iid = `item-${i}`
        const r = rects.get(iid)!
        const layout = layoutMap.get(iid)!
        const color = tplColors[iid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const customStroke = tplStrokeColors[iid]
        const customStrokeWidth = tplStrokeWidths[iid] ?? 1
        const isSel = selectedIds.has(iid)
        
        const cx = r.x + r.width / 2
        
        const nextLayout = i < N - 1 ? layoutMap.get(`item-${i+1}`) : null

        return (
          <g key={i}>
            {nextLayout && (
              <path 
                d={`M ${cx + 30} ${r.y - 20} Q ${cx + (nextLayout.cx - cx) / 2} ${r.y - 50} ${nextLayout.cx - 30} ${r.y - 20}`} 
                fill="none" stroke="#e0e0e0" strokeWidth={3} markerEnd="url(#arrowhead)" 
              />
            )}
            
            <g onMouseDown={e => startDrag(e, iid, r)} style={{ cursor: 'pointer' }}>
              <text x={cx} y={r.y - 40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={18} fontWeight={700} fill="#282c61">
                {years[i]}
              </text>
              
              <path d={`M ${r.x} ${r.y} L ${r.x + r.width} ${r.y} L ${r.x + r.width} ${r.y + ARROW_H1} L ${r.x + r.width + ARROW_W2} ${r.y + ARROW_H1} L ${cx} ${r.y + ARROW_H1 + ARROW_H2} L ${r.x - ARROW_W2} ${r.y + ARROW_H1} L ${r.x} ${r.y + ARROW_H1} Z`} fill={color} stroke={customStroke || (isSel ? '#3498db' : 'none')} strokeWidth={isSel ? 3 : customStrokeWidth} />
              
              <circle cx={cx} cy={r.y + ARROW_H1 / 2 + 10} r={25} fill="none" stroke="white" strokeWidth={2} />
              
              <text x={cx} y={r.y + r.height + 40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="#555">
                <tspan x={cx} dy="0">{ms.title}</tspan>
                {ms.subtitle && <tspan x={cx} dy="18">{ms.subtitle.length > 30 ? ms.subtitle.slice(0, 27) + '...' : ms.subtitle}</tspan>}
              </text>
              
              {isSel && renderHandles(r, iid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
