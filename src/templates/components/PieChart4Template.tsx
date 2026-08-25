import { useRef, type ReactElement } from 'react'
import type { PieData } from '../types'
import { MIGSO_PALETTE } from '../../lib/theme'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { donutSlicePath, sliceBounds, polarPoint } from '../shared/pieGeometry'

export function PieChart4Template({ data }: { data: PieData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const W = 1000
  const H = 500
  const cy = 230
  const innerR = 34
  const outerR = 88

  const raw = data.slices.length > 0 ? data.slices : [
    { label: 'A', value: 90, pct: '90%' }, { label: 'B', value: 10 },
    { label: 'A', value: 80, pct: '80%' }, { label: 'B', value: 20 },
    { label: 'A', value: 65, pct: '65%' }, { label: 'B', value: 35 },
  ]
  const groups: Array<typeof raw> = []
  for (let i = 0; i < raw.length; i += 2) groups.push(raw.slice(i, i + 2))

  return (
    <g ref={svgRef}>
      {groups.map((group, g) => {
        const cx = 180 + g * 320
        const bounds = sliceBounds(group.map(s => s.value))
        const box = { x: cx - outerR, y: cy - outerR, width: outerR * 2, height: outerR * 2 }
        return (
          <g key={`donut-${g}`}>
            {group.map((slice, sIdx) => {
              const id = `slice-${g}-${sIdx}`
              const color = tplColors[id] || slice.color || MIGSO_PALETTE[(g * 2 + sIdx) % MIGSO_PALETTE.length]!
              const mid = (bounds[sIdx]!.start + bounds[sIdx]!.end) / 2
              const p = polarPoint(cx, cy, (innerR + outerR) / 2, mid)
              return (
                <g key={id}>
                  <path
                    d={donutSlicePath(cx, cy, innerR, outerR, bounds[sIdx]!.start, bounds[sIdx]!.end)}
                    fill={color}
                    data-element-id={id}
                    onMouseDown={e => startDrag(e, id, box)}
                    style={{ cursor: 'pointer' }}
                  />
                  <text x={p.x} y={p.y + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#fff">
                    {slice.pct || (slice.value != null ? `${slice.value}%` : '')}
                  </text>
                </g>
              )
            })}
            <circle cx={cx} cy={cy} r={innerR - 2} fill="#fff" />
          </g>
        )
      })}
      {data.title && (
        <text x={W / 2} y={H - 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="#2c2b64">
          {data.title}
        </text>
      )}
      {Array.from(selectedIds).map(id => <g key={`h-${id}`}>{renderHandles({ x: 100, y: 60, width: W - 200, height: H - 110 }, id)}</g>)}
    </g>
  )
}