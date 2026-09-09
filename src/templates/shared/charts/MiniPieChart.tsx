import type { ReactElement } from 'react'
import { pieSlicePath, donutSlicePath } from '../pieGeometry'

export interface PieSlice {
  value: number
  color: string
  label?: string
}

export interface MiniPieChartProps {
  cx: number
  cy: number
  radius: number
  innerRadius?: number
  slices: PieSlice[]
  centerText?: string
  centerSubtext?: string
  centerTextColor?: string
  startAngle?: number
}

export function MiniPieChart({
  cx,
  cy,
  radius,
  innerRadius = 0,
  slices,
  centerText,
  centerSubtext,
  centerTextColor = '#1a202c',
  startAngle = -Math.PI / 2,
}: MiniPieChartProps): ReactElement {
  const total = slices.reduce((sum, s) => sum + Math.max(0, s.value), 0)
  let currentAngle = startAngle

  return (
    <g>
      {slices.map((slice, idx) => {
        const sliceSpan = total > 0 ? (Math.max(0, slice.value) / total) * 2 * Math.PI : 0
        const segStart = currentAngle
        const segEnd = currentAngle + sliceSpan
        currentAngle += sliceSpan

        if (sliceSpan <= 0.001) return null

        const pathData =
          innerRadius > 0
            ? donutSlicePath(cx, cy, innerRadius, radius, segStart, segEnd)
            : pieSlicePath(cx, cy, radius, segStart, segEnd)

        return <path key={idx} d={pathData} fill={slice.color} />
      })}

      {centerText && (
        <text
          x={cx}
          y={cy + (centerSubtext ? -2 : 6)}
          textAnchor="middle"
          fill={centerTextColor}
          fontSize={Math.max(12, Math.round(innerRadius * 0.55))}
          fontWeight={800}
          fontFamily="Arial, sans-serif"
        >
          {centerText}
        </text>
      )}

      {centerSubtext && (
        <text
          x={cx}
          y={cy + Math.round(innerRadius * 0.42)}
          textAnchor="middle"
          fill="#718096"
          fontSize={Math.max(9, Math.round(innerRadius * 0.28))}
          fontWeight={600}
          fontFamily="Arial, sans-serif"
        >
          {centerSubtext}
        </text>
      )}
    </g>
  )
}
