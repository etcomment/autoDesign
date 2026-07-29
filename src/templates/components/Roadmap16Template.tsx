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
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
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
    const startX = 200, startY = 150
    const endX1 = 800
    const endX2 = 200
    const pathD = `M ${startX} ${startY} L ${endX1 - R} ${startY} A ${R} ${R} 0 0 1 ${endX1} ${startY + R} A ${R} ${R} 0 0 1 ${endX1 - R} ${startY + 2*R} L ${endX2 + R} ${startY + 2*R} A ${R} ${R} 0 0 0 ${endX2} ${startY + 3*R} A ${R} ${R} 0 0 0 ${endX2 + R} ${startY + 4*R} L ${endX1} ${startY + 4*R}`
    return pathD
  }, [])

  const layoutMap = useMemo(() => {
    const m = new Map<string, Point>()
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
    m.set('path', { x: 140, y: 140, width: 680, height: 260 })
    milestones.forEach((_, i) => {
      const p = layoutMap.get(`node-${i}`)
      if (p) {
        const cy = p.y
        const labelY = (i === 0 || i === 1) ? cy + 60 : (i === 2 || i === 3) ? cy - 60 : cy + 60
        m.set(`text-${i}`, { x: p.x - 75, y: labelY - 20, width: 150, height: 60 })
      }
    })
    return m
  }, [milestones, layoutMap])

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
          <g data-element-id="main-title" onMouseDown={e => startDrag(e, 'main-title', r)} transform={getTransform('main-title', r)} style={{ cursor: 'pointer' }}>
            <text x={r.x} y={r.y + 30} fontFamily="Arial, sans-serif" fontSize={36} fontWeight={800} fill={fill} stroke={stroke} strokeWidth={stroke ? sW : undefined}>
              {title}
            </text>
            <line x1={r.x} y1={r.y + 45} x2={r.x + 60} y2={r.y + 45} stroke={fill} strokeWidth={6} />
            {selectedIds.has('main-title') && renderHandles(r, 'main-title')}
          </g>
        ) : null
      })()}

      {(() => {
        const r = rects.get('path')!
        const color = tplColors['path'] ?? '#a9a9a9'
        const sW = tplStrokeWidths['path'] ?? 18
        return (
          <g data-element-id="path" onMouseDown={e => startDrag(e, 'path', r)} transform={getTransform('path', r)} style={{ cursor: 'pointer' }}>
            <svg x={r.x} y={r.y} width={r.width} height={r.height} viewBox="140 140 680 260" preserveAspectRatio="none">
              <path d={pathSegments} fill="none" stroke={color} strokeWidth={sW} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {selectedIds.has('path') && renderHandles(r, 'path')}
          </g>
        )
      })()}

      {['start', 'finish'].map(kind => {
        const r = rects.get(kind)!
        const fill = tplColors[kind] ?? '#282c61'
        const stroke = tplStrokeColors[kind]
        const sW = tplStrokeWidths[kind] ?? 1
        const cx = r.x + r.width / 2
        const cy = r.y + r.height / 2
        return (
          <g key={kind} onMouseDown={e => startDrag(e, kind, r)} transform={getTransform(kind, r)} style={{ cursor: 'pointer' }}>
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

        const tid = `text-${i}`
        const tr = rects.get(tid)!
        const tSel = selectedIds.has(tid)
        const tcx = tr.x + tr.width / 2

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, iid, r)} transform={getTransform(iid, r)} style={{ cursor: 'pointer' }}>
              <circle cx={cx} cy={cy} r={r.width / 2} fill="white" stroke={color} strokeWidth={4} />
              <circle cx={cx} cy={cy} r={r.width / 2 - 8} fill="none" stroke={color} strokeWidth={1} />
              {isSel && renderHandles(r, iid)}
            </g>
            <g onMouseDown={e => startDrag(e, tid, tr)} transform={getTransform(tid, tr)} style={{ cursor: 'pointer' }}>
              <text x={tcx} y={tr.y + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={800} fill={tplColors[tid] ?? "#222"}>
                {ms.title}
              </text>
              {ms.subtitle && (
                <text x={tcx} y={tr.y + 40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="#555">
                  {ms.subtitle.length > 30 ? ms.subtitle.slice(0, 27) + '...' : ms.subtitle}
                </text>
              )}
              {ms.date && (
                <text x={tcx} y={tr.y + (ms.subtitle ? 58 : 40)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#888">
                  {ms.date}
                </text>
              )}
              {tSel && renderHandles(tr, tid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}

