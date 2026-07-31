import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const BAR_W = 560
const BAR_H = 46
const GAP = 16

function parseValue(val: string): number {
  const num = parseFloat(val.replace(/[^0-9.]/g, ''))
  return isNaN(num) ? 0 : num
}

export function Dashboard3Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { metrics } = data
  const displayed = metrics && metrics.length > 0 ? metrics : [
    { label: 'Sales Target', value: '$85,000', change: '+15%' },
    { label: 'Marketing Leads', value: '1,200', change: '+8%' },
    { label: 'Support Tickets', value: '340', change: '-5%' },
    { label: 'NPS Score', value: '72', change: '+4%' },
  ]

  const count = displayed.length
  const startY = 40
  const startX = (900 - BAR_W) / 2

  const values = displayed.map(m => parseValue(m.value))
  const maxVal = Math.max(...values, 1)

  return (
    <g ref={svgRef}>
      {displayed.map((metric, i) => {
        const elementId = `metric-${i}`
        const y = startY + i * (BAR_H + GAP)
        const val = values[i]!
        const fillW = Math.max(10, (val / maxVal) * BAR_W)
        const color = tplColors[elementId] ?? metric.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!

        const defaultBbox = { x: startX, y, width: BAR_W, height: BAR_H }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill="#f1f5f9" />
            <rect x={bbox.x} y={bbox.y} width={fillW} height={bbox.height} rx={6} fill={color} opacity={0.88} />

            <text x={bbox.x - 14} y={bbox.y + bbox.height / 2 + 5} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#1a202c">
              {metric.label}
            </text>

            <text x={bbox.x + bbox.width + 14} y={bbox.y + bbox.height / 2 + 5} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={800} fill={color}>
              {metric.value}
            </text>

            {metric.change && (
              <text x={bbox.x + bbox.width + 14} y={bbox.y + bbox.height / 2 + 20} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={metric.change.startsWith('+') ? '#48bb78' : '#f56565'}>
                {metric.change}
              </text>
            )}

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}

