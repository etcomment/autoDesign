import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const W = 1000
const H = 600
const R = 60
const MARGIN_X = 100

interface Rect { x: number; y: number; width: number; height: number }
interface Point { x: number; y: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, any>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('card-')) {
    const p = layout.get(id)
    if (!p) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 150, height: s.height || 200 }
    return { x: p.cx - 75, y: 200, width: 150, height: 200 }
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

  const { milestones } = data
  const N = milestones.length
  const availableW = W - MARGIN_X * 2

  const pathSegments = useMemo(() => {
    const startY = 300
    return `M ${MARGIN_X} ${startY} L ${W - MARGIN_X} ${startY}`
  }, [])

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`card-${i}`, { cx })
    })
    return m
  }, [milestones, availableW, N])

  const greyMap = useMemo(() => new Map<string, Rect>(), [])

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
        const r = { x: MARGIN_X, y: 291, width: W - 2 * MARGIN_X, height: 18 }
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
        const color = tplColors[iid] ?? ms.style?.fill ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
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

