import { useRef, type ReactElement } from 'react'
import type { PieData, PieSlice } from '../types'
import { MIGSO_PALETTE } from '../../lib/theme'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { donutSlicePath, sliceBounds, polarPoint } from '../shared/pieGeometry'

export function PieChart3Template({ data }: { data: PieData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const W = 900
  const H = 500
  const cx = 350
  const cy = H / 2
  const innerR = 110
  const outerR = 200

  const slices: PieSlice[] = data.slices.length > 0 ? data.slices : Array.from({ length: 6 }, (_, i) => ({ label: String(i + 1) }))
  const values = slices.map(s => s.value)
  const bounds = sliceBounds(values)
  const getRect = (id: string) => positions[id] || { x: cx - outerR, y: cy - outerR, width: outerR * 2, height: outerR * 2 }

  return (
    <g ref={svgRef}>
      {slices.map((slice, i) => {
        const id = `slice-${i}`
        const color = tplColors[id] || slice.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const mid = (bounds[i]!.start + bounds[i]!.end) / 2
        const p = polarPoint(cx, cy, (innerR + outerR) / 2, mid)
        return (
          <g key={id}>
            <path
              d={donutSlicePath(cx, cy, innerR, outerR, bounds[i]!.start, bounds[i]!.end)}
              fill={color}
              data-element-id={id}
              onMouseDown={e => startDrag(e, id, getRect(id))}
              style={{ cursor: 'pointer' }}
            />
            <text x={p.x} y={p.y + 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={24} fontWeight={700} fill="#fff">
              {slice.label}
            </text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r={innerR - 2} fill="#fff" />
      <text x={cx} y={cy + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill="#2c2b64">
        {data.title || 'Répartition'}
      </text>
      {slices.map((slice, i) => (
        <g key={`legend-${i}`}>
          <rect x={W - 250} y={70 + i * 40} width={16} height={16} rx={8} fill={tplColors[`slice-${i}`] || slice.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length]!} />
          <text x={W - 226} y={83 + i * 40} fontFamily="Arial, sans-serif" fontSize={14} fill="#333">
            {slice.label}
          </text>
        </g>
      ))}
      {Array.from(selectedIds).map(id => <g key={`h-${id}`}>{renderHandles(getRect(id), id)}</g>)}
    </g>
  )
}