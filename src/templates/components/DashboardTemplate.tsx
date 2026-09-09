import { useRef, type ReactElement } from 'react'
import type { DashboardData, DashboardMetric } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import {
  renderDashboardCardContent,
  computeDashboardBbox,
  type CardBoundingBox,
} from './dashboardCardContent'

const DEFAULT_METRICS: DashboardMetric[] = [
  { label: 'Visitors', value: '', color: '#1f2856', chart: 'line' },
  { label: 'Comments', value: '100,000', color: '#2865c8', chart: 'stat', icon: 'message-square' },
  { label: 'Users', value: '100,000', color: '#f3543a', chart: 'stat', icon: 'user' },
  { label: 'Files', value: '100,000', color: '#fdb813', chart: 'stat', icon: 'files' },
  { label: 'Page views', value: '', color: '#7d8186', chart: 'bar' },
  { label: 'Clicks', value: '', color: '#f1698b', chart: 'pie' },
  { label: 'Revenue', value: '£100,000.00', color: '#4ebe96', chart: 'stat' },
]

export function DashboardTemplate({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateColors = useTemplateStore(s => s.templateElementColors)
  const templateStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const displayedMetrics: DashboardMetric[] =
    data.metrics && data.metrics.length > 0
      ? data.metrics
      : DEFAULT_METRICS

  const count = displayedMetrics.length

  return (
    <g ref={svgRef}>
      {displayedMetrics.map((metric, index) => {
        const elementId = `card-${index}`
        const defaultBbox = computeDashboardBbox(index, count)
        const label = metric.label || DEFAULT_METRICS[index % DEFAULT_METRICS.length]!.label
        const value = metric.value || ''
        const defaultColor =
          metric.color ||
          DEFAULT_METRICS[index % DEFAULT_METRICS.length]?.color ||
          MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const color = templateColors[elementId] ?? defaultColor

        const customPos = positions[elementId]
        const bbox: CardBoundingBox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const isSelected = selectedIds.has(elementId)
        const strokeColor = templateStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = templateStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={event => startDrag(event, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              fill={color}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

            <text
              x={bbox.x + 18}
              y={bbox.y + 32}
              fill="#ffffff"
              fontFamily="Arial, sans-serif"
              fontSize={count <= 4 ? 18 : 16}
              fontWeight={700}
            >
              {label}
            </text>

            {renderDashboardCardContent(index, bbox, value, metric)}

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
