import type { ReactElement } from 'react'
import { polarPoint } from '../pieGeometry'

export interface ArcGaugeSegment {
  color: string
  weight?: number
}

export interface ArcGaugeProps {
  cx: number
  cy: number
  radius: number
  innerRadius: number
  value?: number
  min?: number
  max?: number
  segments?: ArcGaugeSegment[]
  needleColor?: string
  pivotColor?: string
  gapAngle?: number
  innerFill?: string
}

export function createArcPath(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
): string {
  const p1 = polarPoint(cx, cy, outerRadius, startAngle)
  const p2 = polarPoint(cx, cy, outerRadius, endAngle)
  const p3 = polarPoint(cx, cy, innerRadius, endAngle)
  const p4 = polarPoint(cx, cy, innerRadius, startAngle)

  const isLargeArc = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0

  return [
    `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
    `A ${outerRadius} ${outerRadius} 0 ${isLargeArc} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
    `A ${innerRadius} ${innerRadius} 0 ${isLargeArc} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
    'Z',
  ].join(' ')
}

export function ArcGauge({
  cx,
  cy,
  radius,
  innerRadius,
  value = 50,
  min = 0,
  max = 100,
  segments = [
    { color: '#262261' },
    { color: '#2e65c8' },
    { color: '#f05338' },
    { color: '#fdb813' },
    { color: '#4ebe96' },
  ],
  needleColor = '#1f2856',
  pivotColor = '#1f2856',
  gapAngle = 0.02,
  innerFill,
}: ArcGaugeProps): ReactElement {
  const totalWeight = segments.reduce((sum, s) => sum + (s.weight ?? 1), 0)
  const clampedValue = Math.max(min, Math.min(max, value))
  const ratio = max === min ? 0.5 : (clampedValue - min) / (max - min)

  const gaugeStartAngle = Math.PI
  const gaugeEndAngle = 2 * Math.PI
  const gaugeSpan = gaugeEndAngle - gaugeStartAngle

  let currentAngle = gaugeStartAngle

  const needleAngle = gaugeStartAngle + ratio * gaugeSpan
  const needleLength = radius * 0.88
  const needleTipX = cx + needleLength * Math.cos(needleAngle)
  const needleTipY = cy + needleLength * Math.sin(needleAngle)

  const leftBaseAngle = needleAngle + Math.PI / 2
  const rightBaseAngle = needleAngle - Math.PI / 2
  const baseWidth = Math.max(3, radius * 0.045)
  const pivotRadius = Math.max(6, radius * 0.14)

  const leftBaseX = cx + baseWidth * Math.cos(leftBaseAngle)
  const leftBaseY = cy + baseWidth * Math.sin(leftBaseAngle)
  const rightBaseX = cx + baseWidth * Math.cos(rightBaseAngle)
  const rightBaseY = cy + baseWidth * Math.sin(rightBaseAngle)

  return (
    <g>
      {innerFill && (
        <path
          d={`M ${(cx - innerRadius).toFixed(2)} ${cy.toFixed(2)} A ${innerRadius} ${innerRadius} 0 0 1 ${(cx + innerRadius).toFixed(2)} ${cy.toFixed(2)} Z`}
          fill={innerFill}
        />
      )}
      {segments.map((seg, idx) => {
        const segSpan = ((seg.weight ?? 1) / totalWeight) * gaugeSpan
        const segStart = currentAngle + (gapAngle > 0 && idx > 0 ? gapAngle / 2 : 0)
        const segEnd = currentAngle + segSpan - (gapAngle > 0 && idx < segments.length - 1 ? gapAngle / 2 : 0)
        currentAngle += segSpan

        const pathData = createArcPath(cx, cy, innerRadius, radius, segStart, Math.max(segStart, segEnd))
        return <path key={idx} d={pathData} fill={seg.color} />
      })}

      <path
        d={`M ${leftBaseX.toFixed(2)} ${leftBaseY.toFixed(2)} L ${needleTipX.toFixed(2)} ${needleTipY.toFixed(2)} L ${rightBaseX.toFixed(2)} ${rightBaseY.toFixed(2)} Z`}
        fill={needleColor}
      />
      <circle cx={cx} cy={cy} r={pivotRadius} fill={pivotColor} />
      <circle cx={cx} cy={cy} r={pivotRadius * 0.35} fill="#ffffff" />
    </g>
  )
}
