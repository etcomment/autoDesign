import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = ['#4363d8', '#f58231', '#3cb44b', '#ffe119', '#e6194B']
const W = 1000
const H = 600
const TRACK_W = 120
const R = 60

interface Rect { x: number; y: number; width: number; height: number }
interface Point { x: number; y: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, Point>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('node-')) {
    const p = layout.get(id)
    if (!p) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 60, height: s.height || 60 }
    return { x: p.x - 30, y: p.y - 30, width: 60, height: 60 }
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
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones } = data
  const N = milestones.length

  const pathSegments = useMemo(() => {
    // S-curve logic
    const startX = 200, startY = 150
    const endX1 = 800
    const endX2 = 200
    const stepY = 160
    
    // START circle: cx=150, cy=150
    const pathD = `M ${startX} ${startY} L ${endX1 - R} ${startY} A ${R} ${R} 0 0 1 ${endX1} ${startY + R} A ${R} ${R} 0 0 1 ${endX1 - R} ${startY + 2*R} L ${endX2 + R} ${startY + 2*R} A ${R} ${R} 0 0 0 ${endX2} ${startY + 3*R} A ${R} ${R} 0 0 0 ${endX2 + R} ${startY + 4*R} L ${endX1} ${startY + 4*R}`
    
    return pathD
  }, [])

  const layoutMap = useMemo(() => {
    const m = new Map<string, Point>()
    const startX = 200, startY = 150
    const endX1 = 800, endX2 = 200
    
    // Simplified distribution for up to 5 points
    const points = [
      { x: 400, y: 150 },
      { x: 650, y: 150 },
      { x: 350, y: 270 },
      { x: 600, y: 270 },
      { x: 450, y: 390 }
    ]
    
    milestones.forEach((_, i) => {
      m.set(`node-${i}`, points[i % points.length]!)
    })
    return m
  }, [milestones])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('main-title', { x: 45, y: 45, width: 300, height: 40 })
    m.set('start', { x: 100, y: 120, width: 80, height: 80 })
    m.set('finish', { x: 800, y: 350, width: 80, height: 80 })
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

      <path d={pathSegments} fill="none" stroke="#a9a9a9" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />

      {['start', 'finish'].map(kind => {
        const r = rects.get(kind)!
        const fill = tplColors[kind] ?? '#282c61'
        const stroke = tplStrokeColors[kind]
        const sW = tplStrokeWidths[kind] ?? 1
        const cx = r.x + r.width / 2
        const cy = r.y + r.height / 2
        return (
          <g key={kind} onMouseDown={e => startDrag(e, kind, r)} style={{ cursor: 'pointer' }}>
            <circle cx={cx} cy={cy} r={r.width / 2} fill="white" stroke={fill} strokeWidth={4} />
            <text x={cx} y={cy + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={800} fill={fill}>
              {kind.toUpperCase()}
            </text>
            {selectedIds.has(kind) && renderHandles(r, kind)}
          </g>
        )
      })}

      {milestones.map((ms, i) => {
        const iid = `node-${i}`
        const r = rects.get(iid)!
        const color = tplColors[iid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSel = selectedIds.has(iid)
        const cx = r.x + r.width / 2
        const cy = r.y + r.height / 2
        const labelY = (i === 0 || i === 1) ? cy + 60 : (i === 2 || i === 3) ? cy - 60 : cy + 60

        return (
          <g key={i} onMouseDown={e => startDrag(e, iid, r)} style={{ cursor: 'pointer' }}>
            <circle cx={cx} cy={cy} r={r.width / 2} fill="white" stroke={color} strokeWidth={4} />
            <circle cx={cx} cy={cy} r={r.width / 2 - 8} fill="none" stroke={color} strokeWidth={1} />
            
            <text x={cx} y={labelY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={800} fill="#222">
              {ms.title}
            </text>
            {ms.subtitle && (
              <text x={cx} y={labelY + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="#555">
                {ms.subtitle.length > 30 ? ms.subtitle.slice(0, 27) + '...' : ms.subtitle}
              </text>
            )}
            {ms.date && (
              <text x={cx} y={labelY + (ms.subtitle ? 38 : 20)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#888">
                {ms.date}
              </text>
            )}
            
            {isSel && renderHandles(r, iid)}
          </g>
        )
      })}
    </g>
  )
}
