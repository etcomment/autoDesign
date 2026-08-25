import { useRef, type ReactElement } from 'react'
import type { PieData, PieSlice } from '../types'
import { MIGSO_PALETTE } from '../../lib/theme'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { donutSlicePath, sliceBounds, polarPoint } from '../shared/pieGeometry'

export function PieChart1Template({ data }: { data: PieData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const W = 900
  const H = 500
  const cx = 400
  const cy = H / 2
  const innerR = 90
  const outerR = 185

  const slices: PieSlice[] = data.slices.length > 0 ? data.slices : [{ label: '01' }, { label: '02' }, { label: '03' }]
  const values = slices.map(s => s.value)
  const bounds = sliceBounds(values, 10 / outerR)
  const box = { x: cx - outerR - 10, y: cy - outerR - 10, width: outerR * 2 + 20, height: outerR * 2 + 20 }

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
              onMouseDown={e => startDrag(e, id, box)}
              style={{ cursor: 'pointer' }}
            />
            <text x={p.x} y={p.y + 7} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#fff">
              {slice.label}
            </text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r={innerR - 2} fill="#fff" />
      {slices.map((slice, i) => (
        <g key={`legend-${i}`}>
          <rect x={W - 260} y={90 + i * 46} width={18} height={18} rx={9} fill={tplColors[`slice-${i}`] || slice.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length]!} />
          <text x={W - 232} y={103 + i * 46} fontFamily="Arial, sans-serif" fontSize={15} fill="#333">
            {slice.label}
          </text>
        </g>
      ))}
      {Array.from(selectedIds).map(id => <g key={`h-${id}`}>{renderHandles(box, id)}</g>)}
    </g>
  )
}