import { useRef, type ReactElement } from 'react'
import type { PieData, PieSlice } from '../types'
import { MIGSO_PALETTE } from '../../lib/theme'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { donutSliceGapPath, sliceBounds, polarPoint } from '../shared/pieGeometry'

export function PieChart2Template({ data }: { data: PieData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const W = 1000
  const H = 500
  const cx = 360
  const cy = H / 2
  const innerR = 95
  const outerR = 190

  const slices: PieSlice[] = data.slices.length > 0 ? data.slices : [{ label: 'A' }, { label: 'B' }, { label: 'C' }, { label: 'D' }]
  const values = slices.map(s => s.value)
  const bounds = sliceBounds(values)
  const getRect = (id: string) => positions[id] || { x: cx - outerR, y: cy - outerR, width: outerR * 2, height: outerR * 2 }

  return (
    <g ref={svgRef}>
      {slices.map((slice, i) => {
        const id = `slice-${i}`
        const color = tplColors[id] || slice.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const mid = (bounds[i]!.start + bounds[i]!.end) / 2
        const midP = polarPoint(cx, cy, (innerR + outerR) / 2, mid)
        const lblR = outerR + 48
        const lblP = polarPoint(cx, cy, lblR, mid)
        const anchor = Math.cos(mid) < -0.2 ? 'end' : Math.cos(mid) > 0.2 ? 'start' : 'middle'
        return (
          <g key={id}>
            <path
              d={donutSliceGapPath(cx, cy, innerR, outerR, bounds[i]!.start, bounds[i]!.end, 10)}
              fill={color}
              data-element-id={id}
              onMouseDown={e => startDrag(e, id, getRect(id))}
              style={{ cursor: 'pointer' }}
            />
            <text x={lblP.x} y={lblP.y} textAnchor={anchor} fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="#111">
              {slice.label}
            </text>
            <text x={midP.x} y={midP.y + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={18} fontWeight={700} fill="#fff">
              {slice.pct || (slice.value != null ? `${slice.value}%` : '')}
            </text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r={innerR - 2} fill="#fff" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={18} fontWeight={700} fill="#2c2b64">
        {data.title || 'Total'}
      </text>
      {Array.from(selectedIds).map(id => <g key={`h-${id}`}>{renderHandles(getRect(id), id)}</g>)}
    </g>
  )
}