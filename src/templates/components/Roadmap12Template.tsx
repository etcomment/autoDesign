import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const START_Y = 100
const LEFT_X = 350
const RIGHT_X = 650
const R = 50

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, any>): Rect {
  const s = pos[id]
  const l = layout.get(id)
  if (id === 'path') {
    if (s) return s
    return { x: 0, y: 0, width: W, height: START_Y + 10 * 2 * R } // Approx
  }
  if (id.startsWith('node-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 70, height: s.height || 70 }
    return { x: l.cx - 35, y: l.cy - 35, width: 70, height: 70 }
  }
  if (id.startsWith('text-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const tw = 250
    const th = 60
    if (s) return { ...s, width: s.width || tw, height: s.height || th }
    return {
      x: l.isEven ? l.cx - 60 - tw : l.cx + 60,
      y: l.cy - th / 2,
      width: tw,
      height: th
    }
  }
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap12Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { milestones } = data
  const N = milestones.length

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number; cy: number; isEven: boolean }>()
    m.set('path', { cx: 0, cy: 0, isEven: false })
    milestones.forEach((_, i) => {
      const isEven = i % 2 === 0
      const cx = isEven ? LEFT_X - R : RIGHT_X + R
      const cy = START_Y + i * 2 * R + R
      m.set(`node-${i}`, { cx, cy, isEven })
      m.set(`text-${i}`, { cx, cy, isEven })
    })
    return m
  }, [milestones])

  useEffect(() => {
    for (const id of layoutMap.keys()) {
      if (pos[id]) continue
      const r = getRect(id, pos, layoutMap)
      moveEl(id, { x: r.x, y: r.y })
      resizeEl(id, { width: r.width, height: r.height })
    }
  }, [layoutMap, pos, moveEl, resizeEl])

  const rects = new Map<string, Rect>()
  for (const id of layoutMap.keys()) {
    rects.set(id, getRect(id, pos, layoutMap))
  }

  const pathD = useMemo(() => {
    if (N === 0) return ''
    let d = `M ${W} ${START_Y}`
    milestones.forEach((_, i) => {
      if (i % 2 === 0) {
        d += ` L ${LEFT_X} ${START_Y + i * 2 * R}`
        d += ` A ${R} ${R} 0 0 0 ${LEFT_X} ${START_Y + i * 2 * R + 2 * R}`
      } else {
        d += ` L ${RIGHT_X} ${START_Y + i * 2 * R}`
        d += ` A ${R} ${R} 0 0 1 ${RIGHT_X} ${START_Y + i * 2 * R + 2 * R}`
      }
    })
    const lastI = N - 1
    if (lastI % 2 === 0) {
      d += ` L ${W} ${START_Y + lastI * 2 * R + 2 * R}`
    } else {
      d += ` L 0 ${START_Y + lastI * 2 * R + 2 * R}`
    }
    return d
  }, [N, milestones])

  return (
    <g ref={svgRef}>
      {N > 0 && (() => {
        const pr = rects.get('path')!
        return (
          <g transform={`translate(${pr.x}, ${pr.y})`} onMouseDown={e => startDrag(e, 'path', pr)} style={{ cursor: 'pointer' }}>
            <path d={pathD} stroke="#e6e6e6" strokeWidth={50} fill="none" />
            <path d={pathD} stroke="white" strokeWidth={8} strokeDasharray="24 16" fill="none" />
            {selectedIds.has('path') && renderHandles(pr, 'path')}
          </g>
        )
      })()}

      {milestones.map((ms, i) => {
        const nid = `node-${i}`
        const tid = `text-${i}`
        const nr = rects.get(nid)!
        const tr = rects.get(tid)!
        const l = layoutMap.get(nid)!
        const color = tplColors[nid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSelNode = selectedIds.has(nid)
        const isSelText = selectedIds.has(tid)
        
        const ncx = nr.x + nr.width / 2
        const ncy = nr.y + nr.height / 2
        const radius = Math.min(nr.width, nr.height) / 2

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, nid, nr)} style={{ cursor: 'pointer' }}>
              <circle cx={ncx} cy={ncy} r={radius} fill={color} />
              <path d={`M${ncx - 12} ${ncy} L${ncx - 4} ${ncy + 8} L${ncx + 12} ${ncy - 8}`} stroke="white" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {isSelNode && renderHandles(nr, nid)}
            </g>
            
            <g onMouseDown={e => startDrag(e, tid, tr)} style={{ cursor: 'pointer' }}>
              <text x={l.isEven ? tr.x + tr.width : tr.x} y={tr.y + 20} textAnchor={l.isEven ? 'end' : 'start'} fontSize={18} fontWeight="bold" fill={color}>
                Step {ms.date ?? String(i + 1).padStart(2, '0')}
              </text>
              <text x={l.isEven ? tr.x + tr.width - 80 : tr.x + 80} y={tr.y + 15} textAnchor={l.isEven ? 'end' : 'start'} fontSize={13} fill="#1e375a" fontWeight="600">
                {ms.title}
              </text>
              {ms.subtitle && (
                <text x={l.isEven ? tr.x + tr.width - 80 : tr.x + 80} y={tr.y + 35} textAnchor={l.isEven ? 'end' : 'start'} fontSize={11} fill="#777">
                  {ms.subtitle}
                </text>
              )}
              {isSelText && renderHandles(tr, tid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
