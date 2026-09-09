import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import {
  renderDashboardCardContent,
  type CardBoundingBox,
} from './dashboardCardContent'

interface DefaultCardConfig {
  label: string
  value: string
  color: string
  defaultBbox: CardBoundingBox
}

const DEFAULT_CARDS: DefaultCardConfig[] = [
  { label: 'Visitors', value: '', color: '#1f2856', defaultBbox: { x: 70, y: 105, width: 358, height: 193 } },
  { label: 'Comments', value: '100,000', color: '#2865c8', defaultBbox: { x: 438, y: 105, width: 135, height: 193 } },
  { label: 'Users', value: '100,000', color: '#f3543a', defaultBbox: { x: 582, y: 105, width: 135, height: 193 } },
  { label: 'Files', value: '100,000', color: '#fdb813', defaultBbox: { x: 726, y: 105, width: 204, height: 193 } },
  { label: 'Page views', value: '', color: '#7d8186', defaultBbox: { x: 70, y: 308, width: 358, height: 193 } },
  { label: 'Clicks', value: '', color: '#f1698b', defaultBbox: { x: 438, y: 308, width: 279, height: 193 } },
  { label: 'Revenue', value: '£100,000.00', color: '#4ebe96', defaultBbox: { x: 726, y: 308, width: 204, height: 193 } },
]

export function DashboardTemplate({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateColors = useTemplateStore(s => s.templateElementColors)
  const templateStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  return (
    <g ref={svgRef}>
      {DEFAULT_CARDS.map((defaultCard, index) => {
        const elementId = `card-${index}`
        const metric = data.metrics?.[index]
        const label = metric?.label || defaultCard.label
        const value = metric?.value || defaultCard.value
        const defaultColor = metric?.color || defaultCard.color
        const color = templateColors[elementId] ?? defaultColor

        const customPos = positions[elementId]
        const bbox: CardBoundingBox = {
          x: customPos?.x ?? defaultCard.defaultBbox.x,
          y: customPos?.y ?? defaultCard.defaultBbox.y,
          width: customPos?.width ?? defaultCard.defaultBbox.width,
          height: customPos?.height ?? defaultCard.defaultBbox.height,
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
              fontSize={index === 0 || index === 4 ? 18 : 16}
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
