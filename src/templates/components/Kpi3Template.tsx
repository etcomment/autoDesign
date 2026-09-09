import { useRef, type ReactElement } from 'react'
import type { DashboardData, DashboardMetric } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { ArcGauge } from '../shared/charts/ArcGauge'
import { MiniBarChart } from '../shared/charts/MiniBarChart'
import { MiniLineChart } from '../shared/charts/MiniLineChart'

interface QuadrantBoundingBox {
  x: number
  y: number
  width: number
  height: number
}

const DEFAULT_DESCRIPTION = 'MIGSO-PCUBED content and words to be added here as required'

const DEFAULT_METRICS: DashboardMetric[] = [
  { label: 'OPERATIONS', value: '50', description: DEFAULT_DESCRIPTION },
  { label: 'ProductS', value: '16', description: DEFAULT_DESCRIPTION },
  { label: 'REVENUE', value: '4.5', description: DEFAULT_DESCRIPTION },
  { label: 'Manufacturing', value: '4', description: DEFAULT_DESCRIPTION },
]

const STACKED_BAR_GROUPS = [
  { label: 'Jan', values: [4, 2, 1, 4] },
  { label: 'Feb', values: [3, 5, 7, 1] },
  { label: 'Mar', values: [6, 1, 2, 5] },
  { label: 'Apr', values: [1, 6, 3, 7] },
]

const SINGLE_BAR_GROUPS = [
  { label: 'Jan', values: [4.3], colors: ['#262261'] },
  { label: 'Feb', values: [2.5], colors: ['#2e65c8'] },
  { label: 'Mar', values: [3.5], colors: ['#f05338'] },
  { label: 'Apr', values: [4.5], colors: ['#fdb813'] },
]

const LINE_SERIES = [
  {
    points: [4.2, 2.4, 3.6, 4.4],
    color: '#262261',
    strokeWidth: 2.5,
    showPoints: true,
    pointRadius: 4,
  },
  {
    points: [5.3, 1.3, 3.8, 2.3],
    color: '#f05338',
    strokeWidth: 2.5,
    showPoints: true,
    pointRadius: 4,
  },
]

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr']
const TICKS_EIGHTEEN = [0, 3, 6, 9, 12, 15, 18]
const TICKS_FIVE = [0, 1, 2, 3, 4, 5]
const TICKS_SIX = [0, 1, 2, 3, 4, 5, 6]

export function Kpi3Template({ data }: { data: DashboardData }): ReactElement {
  const svgReference = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgReference)

  const selectedIdentifiers = useTemplateStore(state => state.selectedTemplateElementIds)
  const elementPositions = useTemplateStore(state => state.templateElementPositions)
  const elementColors = useTemplateStore(state => state.templateElementColors)
  const elementStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const elementStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)

  const cardWidth = 390
  const cardHeight = 220
  const startPositionX = 40
  const startPositionY = 35
  const gapHorizontal = 40
  const gapVertical = 30

  const metrics = data?.metrics && data.metrics.length > 0 ? data.metrics : DEFAULT_METRICS

  const quadrantConfigurations = [
    {
      identifier: 'quadrant-0',
      defaultX: startPositionX,
      defaultY: startPositionY,
      metric: metrics[0] ?? DEFAULT_METRICS[0]!,
    },
    {
      identifier: 'quadrant-1',
      defaultX: startPositionX + cardWidth + gapHorizontal,
      defaultY: startPositionY,
      metric: metrics[1] ?? DEFAULT_METRICS[1]!,
    },
    {
      identifier: 'quadrant-2',
      defaultX: startPositionX,
      defaultY: startPositionY + cardHeight + gapVertical,
      metric: metrics[2] ?? DEFAULT_METRICS[2]!,
    },
    {
      identifier: 'quadrant-3',
      defaultX: startPositionX + cardWidth + gapHorizontal,
      defaultY: startPositionY + cardHeight + gapVertical,
      metric: metrics[3] ?? DEFAULT_METRICS[3]!,
    },
  ]

  return (
    <g ref={svgReference} data-template="kpi3">
      {quadrantConfigurations.map((configuration, quadrantIndex) => {
        const elementIdentifier = configuration.identifier
        const defaultBox: QuadrantBoundingBox = {
          x: configuration.defaultX,
          y: configuration.defaultY,
          width: cardWidth,
          height: cardHeight,
        }
        const customPosition = elementPositions[elementIdentifier]
        const boundingBox: QuadrantBoundingBox = {
          x: customPosition?.x ?? defaultBox.x,
          y: customPosition?.y ?? defaultBox.y,
          width: customPosition?.width ?? defaultBox.width,
          height: customPosition?.height ?? defaultBox.height,
        }

        const isSelected = selectedIdentifiers.has(elementIdentifier)
        const primaryColor = elementColors[elementIdentifier] ?? configuration.metric.color ?? '#1a202c'
        const strokeColor = elementStrokeColors[elementIdentifier] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = elementStrokeWidths[elementIdentifier] ?? (isSelected ? 1.5 : 0)

        const metricTitle = configuration.metric.label
        const metricDescription = configuration.metric.description ?? DEFAULT_DESCRIPTION
        const descriptionLines = wrapTextByWidth(metricDescription, 20)

        const isLeftColumn = quadrantIndex === 0 || quadrantIndex === 2
        const textAnchor = isLeftColumn ? 'end' : 'start'
        const textPositionX = isLeftColumn ? boundingBox.x + 160 : boundingBox.x + 230

        return (
          <g
            key={elementIdentifier}
            data-element-id={elementIdentifier}
            onMouseDown={event => startDrag(event, elementIdentifier, boundingBox)}
            transform={getTransform(elementIdentifier, boundingBox)}
            style={{ cursor: 'pointer' }}
          >
            {strokeWidth > 0 && (
              <rect
                x={boundingBox.x}
                y={boundingBox.y}
                width={boundingBox.width}
                height={boundingBox.height}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={isSelected ? '4 4' : undefined}
                rx={6}
              />
            )}

            <text
              x={textPositionX}
              y={boundingBox.y + 60}
              textAnchor={textAnchor}
              fontSize={18}
              fontWeight={800}
              fill={primaryColor}
              fontFamily="Arial, sans-serif"
            >
              {metricTitle}
            </text>

            <text
              x={textPositionX}
              y={boundingBox.y + 90}
              textAnchor={textAnchor}
              fontSize={12}
              fill="#5f6368"
              fontFamily="Arial, sans-serif"
            >
              {descriptionLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={textPositionX} dy={lineIndex === 0 ? 0 : 16}>
                  {line}
                </tspan>
              ))}
            </text>

            {quadrantIndex === 0 && (
              <ArcGauge
                cx={boundingBox.x + 280}
                cy={boundingBox.y + 155}
                radius={80}
                innerRadius={45}
                value={parseFloat(configuration.metric.value) || 50}
                segments={[
                  { color: '#2e65c8' },
                  { color: '#f05338' },
                  { color: '#fdb813' },
                  { color: '#4ebe96' },
                ]}
              />
            )}

            {quadrantIndex === 1 && (
              <g>
                {TICKS_EIGHTEEN.map(tickValue => {
                  const tickPositionY = boundingBox.y + 25 + 144 - (tickValue / 18) * 144
                  return (
                    <text
                      key={tickValue}
                      x={boundingBox.x + 22}
                      y={tickPositionY + 4}
                      textAnchor="end"
                      fontSize={12}
                      fill="#2d3748"
                      fontFamily="Arial, sans-serif"
                    >
                      {tickValue}
                    </text>
                  )
                })}
                <MiniBarChart
                  x={boundingBox.x + 28}
                  y={boundingBox.y + 25}
                  width={170}
                  height={165}
                  isStacked={true}
                  yMax={18}
                  barRadius={0}
                  showBaseline={true}
                  defaultColors={['#262261', '#2e65c8', '#f05338', '#fdb813']}
                  groups={STACKED_BAR_GROUPS}
                />
              </g>
            )}

            {quadrantIndex === 2 && (
              <g>
                {TICKS_FIVE.map(tickValue => {
                  const tickPositionY = boundingBox.y + 25 + 144 - (tickValue / 5) * 144
                  return (
                    <text
                      key={tickValue}
                      x={boundingBox.x + 199}
                      y={tickPositionY + 4}
                      textAnchor="end"
                      fontSize={12}
                      fill="#2d3748"
                      fontFamily="Arial, sans-serif"
                    >
                      {tickValue}
                    </text>
                  )
                })}
                <MiniBarChart
                  x={boundingBox.x + 205}
                  y={boundingBox.y + 25}
                  width={170}
                  height={165}
                  isStacked={false}
                  yMax={5}
                  showBaseline={true}
                  groups={SINGLE_BAR_GROUPS}
                />
              </g>
            )}

            {quadrantIndex === 3 && (
              <g>
                {TICKS_SIX.map(tickValue => {
                  const tickPositionY = boundingBox.y + 25 + 144 - (tickValue / 6) * 138 - 3
                  const chartStartX = boundingBox.x + 28
                  const chartEndX = chartStartX + 170
                  return (
                    <g key={tickValue}>
                      <text
                        x={chartStartX - 6}
                        y={tickPositionY + 4}
                        textAnchor="end"
                        fontSize={12}
                        fill="#2d3748"
                        fontFamily="Arial, sans-serif"
                      >
                        {tickValue}
                      </text>
                      <line
                        x1={chartStartX}
                        y1={tickPositionY}
                        x2={chartEndX}
                        y2={tickPositionY}
                        stroke="#e2e8f0"
                        strokeWidth={1}
                      />
                    </g>
                  )
                })}
                <MiniLineChart
                  x={boundingBox.x + 28}
                  y={boundingBox.y + 25}
                  width={170}
                  height={165}
                  yMin={0}
                  yMax={6}
                  showBaseline={true}
                  labels={MONTH_LABELS}
                  series={LINE_SERIES}
                />
              </g>
            )}

            {isSelected && renderHandles(boundingBox, elementIdentifier)}
          </g>
        )
      })}
    </g>
  )
}
