import type { ReactElement } from 'react'

export interface AreaSeries {
  points: number[]
  color: string
  opacity?: number
  strokeWidth?: number
}

export interface MiniAreaChartProps {
  x: number
  y: number
  width: number
  height: number
  series: AreaSeries[]
  labels?: string[]
  yMin?: number
  yMax?: number
  showBaseline?: boolean
  baselineColor?: string
  textColor?: string
  fontSize?: number
}

export function MiniAreaChart({
  x,
  y,
  width,
  height,
  series,
  labels = [],
  yMin,
  yMax,
  showBaseline = true,
  baselineColor = '#cbd5e1',
  textColor = '#718096',
  fontSize = 11,
}: MiniAreaChartProps): ReactElement {
  const allValues = series.flatMap(s => s.points)
  const computedMin = yMin ?? (allValues.length > 0 ? Math.min(0, ...allValues) : 0)
  const computedMax = yMax ?? (allValues.length > 0 ? Math.max(...allValues) : 10)
  const valRange = computedMax === computedMin ? 1 : computedMax - computedMin

  const bottomLabelHeight = labels.length > 0 ? fontSize + 10 : 0
  const chartHeight = Math.max(10, height - bottomLabelHeight)
  const maxPoints = Math.max(1, ...series.map(s => s.points.length), labels.length)

  const getPointX = (idx: number): number => {
    if (maxPoints <= 1) return x + width / 2
    return x + (idx / (maxPoints - 1)) * width
  }

  const getPointY = (val: number): number => {
    const norm = (val - computedMin) / valRange
    return y + chartHeight - norm * (chartHeight - 4)
  }

  const baseY = y + chartHeight

  return (
    <g>
      {series.map((s, sIdx) => {
        const linePoints = s.points.map((val, pIdx) => {
          const px = getPointX(pIdx)
          const py = getPointY(val)
          return `${pIdx === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`
        })

        const lastX = getPointX(s.points.length - 1)
        const firstX = getPointX(0)
        const areaPath = [
          ...linePoints,
          `L ${lastX.toFixed(1)} ${baseY.toFixed(1)}`,
          `L ${firstX.toFixed(1)} ${baseY.toFixed(1)}`,
          'Z',
        ].join(' ')

        return (
          <g key={sIdx}>
            <path d={areaPath} fill={s.color} fillOpacity={s.opacity ?? 0.85} />
            <path
              d={linePoints.join(' ')}
              fill="none"
              stroke={s.color}
              strokeWidth={s.strokeWidth ?? 2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        )
      })}

      {showBaseline && (
        <line
          x1={x}
          y1={baseY}
          x2={x + width}
          y2={baseY}
          stroke={baselineColor}
          strokeWidth={1.5}
        />
      )}

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
