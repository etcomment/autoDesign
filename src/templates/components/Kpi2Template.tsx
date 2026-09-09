import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { ArcGauge } from '../shared/charts/ArcGauge'
import { MiniPieChart } from '../shared/charts/MiniPieChart'
import { MiniBarChart } from '../shared/charts/MiniBarChart'
import { MiniHorizontalBarChart } from '../shared/charts/MiniHorizontalBarChart'

interface QuadrantBoundingBox {
  x: number
  y: number
  width: number
  height: number
}

const DEFAULT_PIE_SLICES = [
  { label: 'Product 01', value: 40, color: '#262261' },
  { label: 'Product 02', value: 25, color: '#2e65c8' },
  { label: 'Product 03', value: 15, color: '#f05338' },
  { label: 'Product 04', value: 20, color: '#fdb813' },
]

const DEFAULT_BAR_GROUPS = [
  { label: 'Week 1', values: [34, 23, 80], colors: ['#262261', '#2e65c8', '#f05338'] },
  { label: 'Week 2', values: [76, 63, 30], colors: ['#262261', '#2e65c8', '#f05338'] },
  { label: 'Week 3', values: [12, 20, 55], colors: ['#262261', '#2e65c8', '#f05338'] },
  { label: 'Week 4', values: [45, 34, 27], colors: ['#262261', '#2e65c8', '#f05338'] },
]

const DEFAULT_HORIZONTAL_ITEMS = [
  { label: 'Week 4', values: [55], colors: ['#2e65c8'] },
  { label: 'Week 3', values: [35], colors: ['#2e65c8'] },
  { label: 'Week 2', values: [53], colors: ['#2e65c8'] },
  { label: 'Week 1', values: [58], colors: ['#2e65c8'] },
]

const Y_TICKS = [0, 15, 30, 45, 60, 75, 90]
const X_PERCENTAGES = [0, 20, 40, 60, 80, 100]

export function Kpi2Template({ data }: { data: DashboardData }): ReactElement {
  const svgReference = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgReference)

  const selectedIdentifiers = useTemplateStore(state => state.selectedTemplateElementIds)
  const elementPositions = useTemplateStore(state => state.templateElementPositions)
  const elementColors = useTemplateStore(state => state.templateElementColors)
  const elementStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const elementStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)

  const cardWidth = 390
  const cardHeight = 210
  const startPositionX = 45
  const startPositionY = 30
  const gapHorizontal = 30
  const gapVertical = 30

  const metrics = data?.metrics ?? []

  const pieMetrics = metrics.filter(metric =>
    metric.category?.toLowerCase().includes('category') || metric.label?.startsWith('Product')
  )
  const pieSlices = pieMetrics.length >= 4
    ? pieMetrics.slice(0, 4).map((metric, metricIndex) => ({
        label: metric.label,
        value: parseFloat(metric.value) || DEFAULT_PIE_SLICES[metricIndex]!.value,
        color: DEFAULT_PIE_SLICES[metricIndex]!.color,
      }))
    : DEFAULT_PIE_SLICES

  const comparisonMetrics = metrics.filter(metric =>
    metric.category?.toLowerCase().includes('comparison') || metric.label?.toLowerCase().includes('month')
  )
  const firstGaugeValue = comparisonMetrics[0]?.value ? parseFloat(comparisonMetrics[0].value) : 50
  const secondGaugeValue = comparisonMetrics[1]?.value ? parseFloat(comparisonMetrics[1].value) : 75
  const firstGaugeLabel = comparisonMetrics[0]?.label ?? 'Last month'
  const secondGaugeLabel = comparisonMetrics[1]?.label ?? 'This month'

  const quadrantConfigurations = [
    {
      identifier: 'quadrant-0',
      defaultX: startPositionX,
      defaultY: startPositionY,
      defaultColor: '#262261',
      title: pieMetrics[0]?.category ?? 'Sales volume by category',
    },
    {
      identifier: 'quadrant-1',
      defaultX: startPositionX + cardWidth + gapHorizontal,
      defaultY: startPositionY,
      defaultColor: '#2e65c8',
      title: comparisonMetrics[0]?.category ?? 'Last month comparison',
    },
    {
      identifier: 'quadrant-2',
      defaultX: startPositionX,
      defaultY: startPositionY + cardHeight + gapVertical,
      defaultColor: '#f05338',
      title: 'Sales volume by category',
    },
    {
      identifier: 'quadrant-3',
      defaultX: startPositionX + cardWidth + gapHorizontal,
      defaultY: startPositionY + cardHeight + gapVertical,
      defaultColor: '#fdb813',
      title: 'Monthly sales volume',
    },
  ]

  return (
    <g ref={svgReference} data-template="kpi2">
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
        const bannerColor = elementColors[elementIdentifier] ?? metrics[quadrantIndex]?.color ?? configuration.defaultColor
        const strokeColor = elementStrokeColors[elementIdentifier] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = elementStrokeWidths[elementIdentifier] ?? (isSelected ? 1.5 : 0)

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
                rx={4}
              />
            )}

            <rect
              x={boundingBox.x}
              y={boundingBox.y}
              width={boundingBox.width}
              height={30}
              rx={2}
              fill={bannerColor}
            />
            <text
              x={boundingBox.x + boundingBox.width / 2}
              y={boundingBox.y + 20}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={14}
              fontWeight={700}
              fontFamily="Arial, sans-serif"
            >
              {configuration.title}
            </text>

            {quadrantIndex === 0 && (
              <g>
                <MiniPieChart
                  cx={boundingBox.x + 95}
                  cy={boundingBox.y + 120}
                  radius={60}
                  innerRadius={32}
                  slices={pieSlices}
                />
                {pieSlices.map((slice, sliceIndex) => {
                  const column = sliceIndex % 2
                  const row = Math.floor(sliceIndex / 2)
                  const legendX = boundingBox.x + 185 + column * 105
                  const legendY = boundingBox.y + 90 + row * 45
                  return (
                    <g key={slice.label}>
                      <rect x={legendX} y={legendY} width={10} height={10} fill={slice.color} />
                      <text
                        x={legendX + 16}
                        y={legendY + 9}
                        fontSize={13}
                        fontWeight={600}
                        fill="#2d3748"
                        fontFamily="Arial, sans-serif"
                      >
                        {slice.label}
                      </text>
                    </g>
                  )
                })}
              </g>
            )}

            {quadrantIndex === 1 && (
              <g>
                <g>
                  <ArcGauge
                    cx={boundingBox.x + boundingBox.width * 0.28}
                    cy={boundingBox.y + 125}
                    radius={52}
                    innerRadius={30}
                    value={firstGaugeValue}
                    segments={[{ color: '#262261' }, { color: '#2e65c8' }, { color: '#f05338' }]}
                  />
                  <text
                    x={boundingBox.x + boundingBox.width * 0.28}
                    y={boundingBox.y + 155}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill="#1a202c"
                    fontFamily="Arial, sans-serif"
                  >
                    {firstGaugeLabel}
                  </text>
                  <text
                    x={boundingBox.x + boundingBox.width * 0.28}
                    y={boundingBox.y + 172}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={600}
                    fill="#1a202c"
                    fontFamily="Arial, sans-serif"
                  >
                    Sales volume {firstGaugeValue}%
                  </text>
                </g>
                <g>
                  <ArcGauge
                    cx={boundingBox.x + boundingBox.width * 0.72}
                    cy={boundingBox.y + 125}
                    radius={52}
                    innerRadius={30}
                    value={secondGaugeValue}
                    segments={[{ color: '#262261' }, { color: '#2e65c8' }, { color: '#f05338' }]}
                  />
                  <text
                    x={boundingBox.x + boundingBox.width * 0.72}
                    y={boundingBox.y + 155}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill="#1a202c"
                    fontFamily="Arial, sans-serif"
                  >
                    {secondGaugeLabel}
                  </text>
                  <text
                    x={boundingBox.x + boundingBox.width * 0.72}
                    y={boundingBox.y + 172}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={600}
                    fill="#1a202c"
                    fontFamily="Arial, sans-serif"
                  >
                    Sales volume {secondGaugeValue}%
                  </text>
                </g>
              </g>
            )}

            {quadrantIndex === 2 && (
              <g>
                {Y_TICKS.map(tickValue => {
                  const chartTop = boundingBox.y + 45
                  const chartHeightInner = 129
                  const tickPositionY = chartTop + chartHeightInner - (tickValue / 90) * chartHeightInner
                  const chartStartX = boundingBox.x + 36
                  const chartEndX = boundingBox.x + boundingBox.width - 15
                  return (
                    <g key={tickValue}>
                      <text
                        x={chartStartX - 8}
                        y={tickPositionY + 4}
                        textAnchor="end"
                        fontSize={11}
                        fill="#718096"
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
                <MiniBarChart
                  x={boundingBox.x + 36}
                  y={boundingBox.y + 45}
                  width={boundingBox.width - 51}
                  height={150}
                  yMax={90}
                  showBaseline={false}
                  groups={DEFAULT_BAR_GROUPS}
                />
              </g>
            )}

            {quadrantIndex === 3 && (
              <g>
                {X_PERCENTAGES.map(percentageValue => {
                  const chartStartX = boundingBox.x + 65
                  const chartWidthInner = boundingBox.width - 80
                  const lineX = chartStartX + (percentageValue / 100) * chartWidthInner
                  return (
                    <g key={percentageValue}>
                      <line
                        x1={lineX}
                        y1={boundingBox.y + 45}
                        x2={lineX}
                        y2={boundingBox.y + 165}
                        stroke="#f1f5f9"
                        strokeWidth={1.5}
                      />
                      <text
                        x={lineX}
                        y={boundingBox.y + 185}
                        textAnchor="middle"
                        fontSize={11}
                        fill="#718096"
                        fontFamily="Arial, sans-serif"
                      >
                        {percentageValue}%
                      </text>
                    </g>
                  )
                })}
                <MiniHorizontalBarChart
                  x={boundingBox.x + 10}
                  y={boundingBox.y + 45}
                  width={boundingBox.width - 25}
                  height={120}
                  labelWidth={55}
                  barHeight={14}
                  maxValue={100}
                  showTrack={true}
                  trackColor="#f1f5f9"
                  items={DEFAULT_HORIZONTAL_ITEMS}
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
