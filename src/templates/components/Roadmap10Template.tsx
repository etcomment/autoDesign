import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const H = 420
const MARGIN_X = 80
const NUMBER_SIZE = 160

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number; numberSize: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('block-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const bw = 220
    const bh = 120
    const bx = l.cx - bw / 2
    const by = 120
    if (s) return { ...s, width: s.width || bw, height: Math.max(s.height || bh, bh) }
    return { x: bx, y: by, width: bw, height: bh }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap10Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones } = data
  const N = milestones.length
  const availableW = W - MARGIN_X * 2

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number; numberSize: number }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`block-${i}`, { cx, numberSize: NUMBER_SIZE })
    })
    return m
  }, [milestones, availableW])

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
      <rect width={W} height={H} fill="white" rx={8} />
      {title && <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">{title}</text>}

      {milestones.map((ms, i) => {
        const bid = `block-${i}`
        const br = rects.get(bid)!
        const layout = layoutMap.get(bid)!
        const color = tplColors[bid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSel = selectedIds.has(bid)
        const numX = layout.cx
        const numY = 80

        return (
          <g key={i} onMouseDown={e => startDrag(e, bid, br)} style={{ cursor: 'pointer' }}>
            <text x={numX} y={numY} textAnchor="middle" dominantBaseline="central" fontFamily="Arial, sans-serif" fontSize={NUMBER_SIZE} fontWeight={900} fill={color} opacity={0.08}>
              {String(i + 1)}
            </text>
            <text x={numX} y={br.y + 30} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#333">{ms.title}</text>
            {ms.subtitle && (
              <text x={numX} y={br.y + 52} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#888">{ms.subtitle.length > 28 ? ms.subtitle.slice(0, 25) + '...' : ms.subtitle}</text>
            )}
            <text x={numX} y={numY + 30} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={18} fontWeight={900} fill={color} opacity={0.18}>
              {String(i + 1)}
            </text>
            {isSel && renderHandles(br, bid)}
          </g>
        )
      })}
    </g>
  )
}
