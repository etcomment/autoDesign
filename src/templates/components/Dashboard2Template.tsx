import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import {
  MapAreaWidget,
  LineChartWidget,
  BarChartWidget,
  StackedChartWidget,
  BottomHeaderWidget,
  DonutCardWidget,
} from './dashboard2Widgets'

interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

const DEFAULT_KPIS = [
  { value: '87%', color: '#1f2856', defaultBbox: { x: 50, y: 280, width: 88, height: 75 } },
  { value: '36%', color: '#2865c8', defaultBbox: { x: 154, y: 280, width: 88, height: 75 } },
  { value: '24%', color: '#f3543a', defaultBbox: { x: 258, y: 280, width: 88, height: 75 } },
  { value: '18%', color: '#fdb813', defaultBbox: { x: 362, y: 280, width: 88, height: 75 } },
]

const DEFAULT_DONUTS = [
  { color: '#1f2856', value: 25, defaultBbox: { x: 265, y: 385, width: 165, height: 125 } },
  { color: '#2865c8', value: 20, defaultBbox: { x: 445, y: 385, width: 165, height: 125 } },
  { color: '#f3543a', value: 35, defaultBbox: { x: 625, y: 385, width: 165, height: 125 } },
  { color: '#fdb813', value: 30, defaultBbox: { x: 805, y: 385, width: 165, height: 125 } },
]

export function Dashboard2Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateColors = useTemplateStore(s => s.templateElementColors)
  const templateStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  function getElementBbox(elementId: string, fallback: BoundingBox): BoundingBox {
    const customPos = positions[elementId]
    return {
      x: customPos?.x ?? fallback.x,
      y: customPos?.y ?? fallback.y,
      width: customPos?.width ?? fallback.width,
      height: customPos?.height ?? fallback.height,
    }
  }

  function renderWidget(
    id: string,
    defaultBbox: BoundingBox,
    renderContent: (bbox: BoundingBox) => ReactElement,
  ): ReactElement {
    const bbox = getElementBbox(id, defaultBbox)
    const isSelected = selectedIds.has(id)
    const strokeColor = templateStrokeColors[id] || (isSelected ? '#4a90d9' : 'none')
    const strokeWidth = templateStrokeWidths[id] ?? (isSelected ? 2 : 0)

    return (
      <g
        key={id}
        data-element-id={id}
        onMouseDown={event => startDrag(event, id, bbox)}
        transform={getTransform(id, bbox)}
        style={{ cursor: 'pointer' }}
      >
        <rect
          x={bbox.x}
          y={bbox.y}
          width={bbox.width}
          height={bbox.height}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        {renderContent(bbox)}
        {isSelected && renderHandles(bbox, id)}
      </g>
    )
  }

  return (
    <g ref={svgRef}>
      {renderWidget('map-area', { x: 50, y: 30, width: 420, height: 235 }, bbox => (
        <MapAreaWidget x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} />
      ))}

      {DEFAULT_KPIS.map((defaultKpi, index) => {
        const elementId = `kpi-card-${index}`
        const bbox = getElementBbox(elementId, defaultKpi.defaultBbox)
        const isSelected = selectedIds.has(elementId)
        const metric = data.metrics?.[index]
        const val = metric?.value || defaultKpi.value
        const color = templateColors[elementId] ?? metric?.color ?? defaultKpi.color
        const strokeColor = templateStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = templateStrokeWidths[elementId] ?? (isSelected ? 2 : 0)
        const rxVal = index === 0 || index === 3 ? 14 : 6

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
              rx={rxVal}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y + 32}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={22}
              fontWeight={800}
              fontFamily="Arial, sans-serif"
            >
              {val}
            </text>
            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y + 48}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={9}
              fontWeight={600}
              fontFamily="Arial, sans-serif"
            >
              MIGSO-
            </text>
            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y + 58}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={9}
              fontWeight={600}
              fontFamily="Arial, sans-serif"
            >
              PCUBED
            </text>
            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y + 68}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={9}
              fontWeight={600}
              fontFamily="Arial, sans-serif"
            >
              content
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      {renderWidget('widget-line-chart', { x: 495, y: 30, width: 245, height: 115 }, bbox => (
        <LineChartWidget x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} />
      ))}

      {renderWidget('widget-bar-chart', { x: 495, y: 165, width: 245, height: 190 }, bbox => (
        <BarChartWidget x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} />
      ))}

      {renderWidget('widget-stacked-chart', { x: 765, y: 30, width: 185, height: 325 }, bbox => (
        <StackedChartWidget x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} />
      ))}

      {renderWidget('bottom-header', { x: 50, y: 385, width: 190, height: 120 }, bbox => (
        <BottomHeaderWidget x={bbox.x} y={bbox.y} />
      ))}

      {DEFAULT_DONUTS.map((donut, index) => {
        const elementId = `donut-card-${index}`
        const bbox = getElementBbox(elementId, donut.defaultBbox)
        const isSelected = selectedIds.has(elementId)
        const metric = data.metrics?.[index + 4]
        const sliceColor = templateColors[elementId] ?? metric?.color ?? donut.color
        const strokeColor = templateStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = templateStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        const pieSlices = [
          { value: donut.value, color: sliceColor },
          { value: 100 - donut.value, color: '#d1d5db' },
        ]

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
              fill="transparent"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <DonutCardWidget
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              slices={pieSlices}
            />
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
