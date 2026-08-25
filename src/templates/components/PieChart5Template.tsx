import { useRef, type ReactElement } from 'react'
import type { PieData } from '../types'
import { MIGSO_PALETTE } from '../../lib/theme'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { pieSlicePath, sliceBounds, polarPoint } from '../shared/pieGeometry'

export function PieChart5Template({ data }: { data: PieData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const W = 1000
  const H = 500
  const cx = 360
  const cy = H / 2
  const radius = 180

  const slices = data.slices.length > 0 ? data.slices : [
    { label: 'Avril', value: 15, pct: '15%' },
    { label: 'Mai', value: 35, pct: '35%' },
    { label: 'Juin', value: 20, pct: '20%' },
    { label: 'Juillet', value: 30, pct: '30%' },
  ]
  const bounds = sliceBounds(slices.map(s => s.value))
  const getRect = (id: string) => positions[id] || { x: cx - radius, y: cy - radius, width: radius * 2, height: radius * 2 }

  return (
    <g ref={svgRef}>
      {slices.map((slice, i) => {
        const id = `slice-${i}`
        const color = tplColors[id] || slice.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const mid = (bounds[i]!.start + bounds[i]!.end) / 2
        const p = polarPoint(cx, cy, radius * 0.62, mid)
        const lblP = polarPoint(cx, cy, radius * 0.9, mid)
        const anchor = Math.cos(mid) < -0.15 ? 'end' : Math.cos(mid) > 0.15 ? 'start' : 'middle'
        return (
          <g key={id}>
            <path
              d={pieSlicePath(cx, cy, radius, bounds[i]!.start, bounds[i]!.end)}
              fill={color}
              data-element-id={id}
              onMouseDown={e => startDrag(e, id, getRect(id))}
              style={{ cursor: 'pointer' }}
            />
            <text x={lblP.x} y={lblP.y} textAnchor={anchor} fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="#fff">
              {slice.label}
            </text>
            <text x={p.x} y={p.y + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={18} fontWeight={700} fill="#fff">
              {slice.pct || (slice.value != null ? `${slice.value}%` : '')}
            </text>
          </g>
        )
      })}
      {Array.from(selectedIds).map(id => <g key={`h-${id}`}>{renderHandles(getRect(id), id)}</g>)}
    </g>
  )
}