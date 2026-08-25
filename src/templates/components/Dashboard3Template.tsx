import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
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
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { metrics } = data
  const displayed = metrics && metrics.length > 0 ? metrics : [
    { label: 'Sales Target', value: '$85,000', change: '+15%' },
    { label: 'Marketing Leads', value: '1,200', change: '+8%' },
    { label: 'Support Tickets', value: '340', change: '-5%' },
    { label: 'NPS Score', value: '72', change: '+4%' },
  ]

  const startY = 40
  const startX = (900 - BAR_W) / 2

  const values = displayed.map(m => parseValue(m.value))
  const maxVal = Math.max(...values, 1)

  return (
    <g ref={svgRef}>
      {displayed.map((metric, index) => {
        const elementId = `metric-${index}`
        const y = startY + index * (BAR_H + GAP)
        const val = values[index]!
        const fillW = Math.max(10, (val / maxVal) * BAR_W)
        const color = tplColors[elementId] ?? metric.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!

        const defaultBbox = { x: startX, y, width: BAR_W, height: BAR_H }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 0)
        const IconComponent = metric.icon ? TEMPLATE_ICONS[metric.icon] : undefined
        const maxChars = Math.max(8, Math.floor(bbox.width / 18))
        const labelLines = wrapTextByWidth(metric.label, maxChars)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill="#f1f5f9" stroke={strokeColor} strokeWidth={strokeWidth} />
            <rect x={bbox.x} y={bbox.y} width={Math.min(fillW, bbox.width)} height={bbox.height} rx={6} fill={color} opacity={0.88} />

            {IconComponent && (
              <g transform={`translate(${bbox.x - 36}, ${bbox.y + bbox.height / 2 - 8})`}>
                <IconComponent size={16} color={color} />
              </g>
            )}

            <text x={bbox.x - 14} y={bbox.y + bbox.height / 2 - (labelLines.length > 1 ? (labelLines.length - 1) * 6 : 0) + 5} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#1a202c">
              {labelLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x - 14} dy={lineIndex === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
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
