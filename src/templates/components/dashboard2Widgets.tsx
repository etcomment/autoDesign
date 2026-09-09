import type { ReactElement } from 'react'
import { MiniLineChart } from '../shared/charts/MiniLineChart'
import { MiniPieChart } from '../shared/charts/MiniPieChart'
import { WorldMapVector } from '../shared/charts/WorldMapVector'
import { LocationMapPin } from './dashboardIcons'

interface WidgetBoundingProps {
  x: number
  y: number
  width: number
  height: number
}

const DEFAULT_PINS = [
  { x: 42, y: 110, color: '#2865c8' },
  { x: 145, y: 72, color: '#1f2856' },
  { x: 228, y: 92, color: '#fdb813' },
  { x: 295, y: 118, color: '#f1698b' },
  { x: 105, y: 175, color: '#f3543a' },
  { x: 210, y: 158, color: '#4ebe96' },
  { x: 360, y: 195, color: '#2865c8' },
]

export function MapAreaWidget({ x, y, width, height }: WidgetBoundingProps): ReactElement {
  return (
    <g>
      <text
        x={x + 8}
        y={y + 20}
        fill="#1a202c"
        fontSize={18}
        fontWeight={700}
        fontFamily="Arial, sans-serif"
      >
        Your title here
      </text>
      <WorldMapVector
        x={x + 5}
        y={y + 35}
        width={width - 10}
        height={height - 40}
        fill="#d1d5db"
        opacity={0.55}
      />
      {DEFAULT_PINS.map((pin, index) => (
        <LocationMapPin
          key={index}
          x={x + pin.x}
          y={y + pin.y}
          color={pin.color}
          label="Type your text here"
        />
      ))}
    </g>
  )
}

export function LineChartWidget({ x, y, width, height }: WidgetBoundingProps): ReactElement {
  return (
    <g>
      <text x={x} y={y + 16} fill="#1a202c" fontSize={18} fontWeight={700} fontFamily="Arial, sans-serif">
        Your title here
      </text>
      <text x={x} y={y + 36} fill="#4b5563" fontSize={9.5} fontFamily="Arial, sans-serif">
        <tspan x={x} dy="0">MIGSO-</tspan>
        <tspan x={x} dy="12">PCUBED</tspan>
        <tspan x={x} dy="12">content and</tspan>
        <tspan x={x} dy="12">words to be</tspan>
        <tspan x={x} dy="12">added here as</tspan>
        <tspan x={x} dy="12">required</tspan>
      </text>
      <MiniLineChart
        x={x + 85}
        y={y + 25}
        width={Math.max(10, width - 85)}
        height={Math.max(10, height - 30)}
        series={[
          { points: [30, 60, 20, 50], color: '#2865c8', strokeWidth: 2.5 },
          { points: [25, 20, 45, 60], color: '#f3543a', strokeWidth: 2.5 },
        ]}
        showBaseline={true}
        showGrid={true}
        gridColor="#e2e8f0"
      />
    </g>
  )
}

const DEFAULT_HISTO_COLORS = ['#1f2856', '#2865c8', '#f3543a', '#fdb813']
const HISTO_HEIGHTS = [55, 38, 75, 100]

export function BarChartWidget({ x, y, width, height }: WidgetBoundingProps): ReactElement {
  const chartW = width * 0.52
  const legendX = x + chartW + 16
  const barSlot = chartW / 4
  const barW = barSlot * 0.72
  const maxH = height - 55
  const baselineY = y + height - 10

  return (
    <g>
      <text x={x} y={y + 16} fill="#1a202c" fontSize={18} fontWeight={700} fontFamily="Arial, sans-serif">
        Your title here
      </text>
      <text x={x} y={y + 34} fill="#6b7280" fontSize={10} fontFamily="Arial, sans-serif">
        Type your desired text here for more.
      </text>
      {HISTO_HEIGHTS.map((rawH, index) => {
        const barH = (rawH / 100) * maxH
        const barX = x + index * barSlot + (barSlot - barW) / 2
        const barY = baselineY - barH
        const barColor = DEFAULT_HISTO_COLORS[index % DEFAULT_HISTO_COLORS.length]!

        return (
          <rect
            key={index}
            x={barX}
            y={barY}
            width={barW}
            height={barH}
            fill={barColor}
            rx={1}
          />
        )
      })}
      <line
        x1={x}
        y1={baselineY}
        x2={x + chartW}
        y2={baselineY}
        stroke="#cbd5e1"
        strokeWidth={1}
      />
      {DEFAULT_HISTO_COLORS.map((col, index) => {
        const itemY = y + 65 + index * 20
        return (
          <g key={index}>
            <rect x={legendX} y={itemY - 8} width={8} height={8} fill={col} rx={1} />
            <text
              x={legendX + 14}
              y={itemY - 1}
              fill="#374151"
              fontSize={11}
              fontWeight={500}
              fontFamily="Arial, sans-serif"
            >
              Sample Text
            </text>
          </g>
        )
      })}
    </g>
  )
}

const DEFAULT_STACKED_COLORS = ['#1f2856', '#2865c8', '#f3543a', '#fdb813']
const STACKED_DATA = [
  [45, 20, 15, 20],
  [30, 35, 15, 20],
  [35, 15, 20, 30],
]
const STACKED_STEPS = [100, 80, 60, 40, 20, 0]

export function StackedChartWidget({ x, y, width, height }: WidgetBoundingProps): ReactElement {
  const labelW = 32
  const chartX = x + labelW + 8
  const chartW = width - labelW - 12
  const topY = y + 80
  const chartH = Math.max(10, height - 90)
  const colSlot = chartW / 3
  const colW = Math.min(22, colSlot * 0.45)

  return (
    <g>
      <text x={x} y={y + 16} fill="#1a202c" fontSize={18} fontWeight={700} fontFamily="Arial, sans-serif">
        Your title here
      </text>
      <text x={x} y={y + 34} fill="#4b5563" fontSize={9.5} fontFamily="Arial, sans-serif">
        <tspan x={x} dy="0">MIGSO-PCUBED content and</tspan>
        <tspan x={x} dy="13">words to be added here as</tspan>
        <tspan x={x} dy="13">required</tspan>
      </text>

      {STACKED_STEPS.map((val, index) => {
        const lineY = topY + (index / 5) * chartH
        return (
          <g key={val}>
            <text
              x={chartX - 6}
              y={lineY + 4}
              textAnchor="end"
              fill="#4b5563"
              fontSize={12}
              fontWeight={500}
              fontFamily="Arial, sans-serif"
            >
              {`${val}%`}
            </text>
            <line
              x1={chartX}
              y1={lineY}
              x2={chartX + chartW}
              y2={lineY}
              stroke="#f1f5f9"
              strokeWidth={1}
            />
          </g>
        )
      })}

      {STACKED_DATA.map((colSegments, colIndex) => {
        const colX = chartX + colIndex * colSlot + (colSlot - colW) / 2
        let currentY = topY + chartH

        return (
          <g key={colIndex}>
            {colSegments.map((segmentVal, segIndex) => {
              const segH = (segmentVal / 100) * chartH
              currentY -= segH
              const segColor = DEFAULT_STACKED_COLORS[segIndex % DEFAULT_STACKED_COLORS.length]!

              return (
                <rect
                  key={segIndex}
                  x={colX}
                  y={currentY}
                  width={colW}
                  height={segH}
                  fill={segColor}
                />
              )
            })}
          </g>
        )
      })}
    </g>
  )
}

export function BottomHeaderWidget({ x, y }: { x: number; y: number }): ReactElement {
  return (
    <g>
      <text x={x} y={y + 20} fill="#1a202c" fontSize={18} fontWeight={700} fontFamily="Arial, sans-serif">
        Your title here
      </text>
      <text x={x} y={y + 42} fill="#4b5563" fontSize={10} fontFamily="Arial, sans-serif">
        <tspan x={x} dy="0">MIGSO-PCUBED content and</tspan>
        <tspan x={x} dy="14">words to be added here as required</tspan>
      </text>
    </g>
  )
}

interface DonutCardWidgetProps {
  x: number
  y: number
  width: number
  slices: { value: number; color: string }[]
}

export function DonutCardWidget({ x, y, width, slices }: DonutCardWidgetProps): ReactElement {
  const cx = x + width / 2
  return (
    <g>
      <MiniPieChart cx={cx} cy={y + 36} radius={30} slices={slices} />
      <text
        x={cx}
        y={y + 82}
        textAnchor="middle"
        fill="#4b5563"
        fontSize={9}
        fontFamily="Arial, sans-serif"
      >
        <tspan x={cx} dy="0">MIGSO-PCUBED content and</tspan>
        <tspan x={cx} dy="12">words to be added here as</tspan>
        <tspan x={cx} dy="12">required</tspan>
      </text>
    </g>
  )
}
