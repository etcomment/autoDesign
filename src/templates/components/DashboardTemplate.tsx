import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MiniLineChart } from '../shared/charts/MiniLineChart'
import { MiniBarChart } from '../shared/charts/MiniBarChart'
import { MiniPieChart } from '../shared/charts/MiniPieChart'
import {
  CommentsIcon,
  UsersFemaleIcon,
  FilesIcon,
  MoneyBagChessIcon,
} from './dashboardIcons'

interface CardBoundingBox {
  x: number
  y: number
  width: number
  height: number
}

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

const TIMELINE_YEARS = ['2014', '2015', '2016', '2017', '2018', '2019']
const DEFAULT_VISITORS_POINTS = [68, 48, 62, 75, 66, 78]
const DEFAULT_BAR_HEIGHTS = [35, 20, 35, 50, 60, 80]
const DEFAULT_PIE_VALUES = [55, 20, 15, 10]
const PIE_SHADES = ['#ffffff', '#f3f4f6', '#9ca3af', '#4b5563']

export function DashboardTemplate({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateColors = useTemplateStore(s => s.templateElementColors)
  const templateStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  function renderCardContent(
    index: number,
    bbox: CardBoundingBox,
    value: string,
    seriesData?: number[],
  ): ReactElement | null {
    if (index === 0) {
      const points = seriesData && seriesData.length > 0 ? seriesData : DEFAULT_VISITORS_POINTS
      return (
        <MiniLineChart
          x={bbox.x + 22}
          y={bbox.y + 45}
          width={Math.max(10, bbox.width - 44)}
          height={Math.max(10, bbox.height - 65)}
          series={[{ points, color: '#ffffff', strokeWidth: 3 }]}
          labels={TIMELINE_YEARS}
          showBaseline={true}
          gridColor="rgba(255, 255, 255, 0.45)"
          textColor="#ffffff"
          fontSize={12}
        />
      )
    }

    if (index === 1) {
      const iconSize = Math.min(bbox.width * 0.45, 56)
      return (
        <g>
          <g transform={`translate(${bbox.x + bbox.width / 2 - iconSize / 2}, ${bbox.y + bbox.height / 2 - iconSize / 2})`}>
            <CommentsIcon size={iconSize} color="#ffffff" />
          </g>
          <text
            x={bbox.x + bbox.width - 16}
            y={bbox.y + bbox.height - 18}
            textAnchor="end"
            fontFamily="Arial, sans-serif"
            fontSize={13}
            fontWeight={700}
            fill="#ffffff"
          >
            {value}
          </text>
        </g>
      )
    }

    if (index === 2) {
      const iconSize = Math.min(bbox.width * 0.45, 56)
      return (
        <g>
          <g transform={`translate(${bbox.x + bbox.width / 2 - iconSize / 2}, ${bbox.y + bbox.height / 2 - iconSize / 2})`}>
            <UsersFemaleIcon size={iconSize} color="#ffffff" />
          </g>
          <text
            x={bbox.x + bbox.width - 16}
            y={bbox.y + bbox.height - 18}
            textAnchor="end"
            fontFamily="Arial, sans-serif"
            fontSize={13}
            fontWeight={700}
            fill="#ffffff"
          >
            {value}
          </text>
        </g>
      )
    }

    if (index === 3) {
      const iconSize = Math.min(bbox.width * 0.35, 56)
      return (
        <g>
          <g transform={`translate(${bbox.x + bbox.width / 2 - iconSize / 2}, ${bbox.y + bbox.height / 2 - iconSize / 2})`}>
            <FilesIcon size={iconSize} color="#ffffff" />
          </g>
          <text
            x={bbox.x + bbox.width - 18}
            y={bbox.y + bbox.height - 18}
            textAnchor="end"
            fontFamily="Arial, sans-serif"
            fontSize={13}
            fontWeight={700}
            fill="#ffffff"
          >
            {value}
          </text>
        </g>
      )
    }

    if (index === 4) {
      const barGroups = TIMELINE_YEARS.map((year, yearIndex) => ({
        label: year,
        values: [seriesData?.[yearIndex] ?? DEFAULT_BAR_HEIGHTS[yearIndex] ?? 30],
      }))
      return (
        <MiniBarChart
          x={bbox.x + 22}
          y={bbox.y + 55}
          width={Math.max(10, bbox.width - 44)}
          height={Math.max(10, bbox.height - 75)}
          groups={barGroups}
          showBaseline={true}
          baselineColor="rgba(255, 255, 255, 0.45)"
          textColor="#ffffff"
          fontSize={12}
          defaultColors={['#ffffff']}
          barRadius={0}
        />
      )
    }

    if (index === 5) {
      const pieValues = seriesData && seriesData.length >= 4 ? seriesData : DEFAULT_PIE_VALUES
      const pieSlices = pieValues.map((val, sliceIndex) => ({
        value: val,
        color: PIE_SHADES[sliceIndex % PIE_SHADES.length]!,
      }))
      return (
        <MiniPieChart
          cx={bbox.x + bbox.width / 2}
          cy={bbox.y + bbox.height / 2 + 10}
          radius={Math.min(bbox.width, bbox.height) * 0.28}
          slices={pieSlices}
        />
      )
    }

    if (index === 6) {
      const iconSize = Math.min(bbox.width * 0.35, 56)
      return (
        <g>
          <g transform={`translate(${bbox.x + bbox.width / 2 - iconSize / 2}, ${bbox.y + bbox.height / 2 - iconSize / 2})`}>
            <MoneyBagChessIcon size={iconSize} color="#ffffff" />
          </g>
          <text
            x={bbox.x + bbox.width - 18}
            y={bbox.y + bbox.height - 18}
            textAnchor="end"
            fontFamily="Arial, sans-serif"
            fontSize={13}
            fontWeight={700}
            fill="#ffffff"
          >
            {value}
          </text>
        </g>
      )
    }

    return null
  }

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

            {renderCardContent(index, bbox, value, metric?.series)}

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
