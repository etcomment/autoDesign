import type { ReactElement } from 'react'

export interface LineSeries {
  points: number[]
  color: string
  strokeWidth?: number
  showPoints?: boolean
  pointRadius?: number
}

export interface MiniLineChartProps {
  x: number
  y: number
  width: number
  height: number
  series: LineSeries[]
  labels?: string[]
  yMin?: number
  yMax?: number
  showBaseline?: boolean
  showGrid?: boolean
  gridColor?: string
  textColor?: string
  fontSize?: number
}

export function MiniLineChart({
  x,
  y,
  width,
  height,
  series,
  labels = [],
  yMin,
  yMax,
  showBaseline = true,
  showGrid = false,
  gridColor = '#e2e8f0',
  textColor = '#718096',
  fontSize = 11,
}: MiniLineChartProps): ReactElement {
  const allValues = series.flatMap(s => s.points)
  const computedMin = yMin ?? (allValues.length > 0 ? Math.min(...allValues) : 0)
  const computedMax = yMax ?? (allValues.length > 0 ? Math.max(...allValues) : 10)
  const valRange = computedMax === computedMin ? 1 : computedMax - computedMin

  const bottomLabelHeight = labels.length > 0 ? fontSize + 10 : 0
  const chartHeight = Math.max(10, height - bottomLabelHeight)
  const maxPointCount = Math.max(1, ...series.map(s => s.points.length), labels.length)

  const getPointX = (index: number): number => {
    if (maxPointCount <= 1) return x + width / 2
    return x + (index / (maxPointCount - 1)) * width
  }

  const getPointY = (val: number): number => {
    const norm = (val - computedMin) / valRange
    return y + chartHeight - norm * (chartHeight - 6) - 3
  }

  return (
    <g>
      {showGrid && [0, 0.33, 0.66, 1].map((ratio, idx) => {
        const lineY = y + chartHeight * (1 - ratio)
        return (
          <line
            key={idx}
            x1={x}
            y1={lineY}
            x2={x + width}
            y2={lineY}
            stroke={gridColor}
            strokeWidth={1}
            strokeDasharray={idx > 0 && idx < 3 ? '3 3' : undefined}
          />
        )
      })}

      {showBaseline && (
        <line
          x1={x}
          y1={y + chartHeight}
          x2={x + width}
          y2={y + chartHeight}
          stroke={gridColor}
          strokeWidth={1.5}
        />
      )}

      {series.map((s, seriesIdx) => {
        const pathCommands = s.points.map((val, pointIdx) => {
          const px = getPointX(pointIdx)
          const py = getPointY(val)
          return `${pointIdx === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`
        })

        return (
          <g key={seriesIdx}>
            <path
              d={pathCommands.join(' ')}
              fill="none"
              stroke={s.color}
              strokeWidth={s.strokeWidth ?? 2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {s.showPoints &&
              s.points.map((val, pointIdx) => {
                const px = getPointX(pointIdx)
                const py = getPointY(val)
                return (
                  <circle
                    key={pointIdx}
                    cx={px}
                    cy={py}
                    r={s.pointRadius ?? 4}
                    fill={s.color}
                  />
                )
              })}
          </g>
        )
      })}

      {labels.map((lbl, idx) => {
        const lx = getPointX(idx)
        return (
          <text
            key={idx}
            x={lx}
            y={y + height - 2}
            textAnchor="middle"
            fill={textColor}
            fontSize={fontSize}
            fontWeight={600}
            fontFamily="Arial, sans-serif"
          >
            {lbl}
          </text>
        )
      })}
    </g>
  )
}
