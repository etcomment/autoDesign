import type { ReactElement, MouseEvent } from 'react'

export interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export interface ConcentricArcsProps {
  boundingBox: BoundingBox
  colors: [string, string, string]
  isSelected: boolean
  transform?: string
  onMouseDown: (event: MouseEvent<SVGGElement>) => void
  renderHandles: (box: BoundingBox, identifier: string) => ReactElement | null
}

function calculatePolarCoordinates(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = (angleInDegrees * Math.PI) / 180
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

function buildArcPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngleInDegrees: number,
  endAngleInDegrees: number
): string {
  const startPoint = calculatePolarCoordinates(centerX, centerY, radius, endAngleInDegrees)
  const endPoint = calculatePolarCoordinates(centerX, centerY, radius, startAngleInDegrees)
  const isLargeArc = endAngleInDegrees - startAngleInDegrees > 180 ? 1 : 0
  return `M ${startPoint.x.toFixed(2)} ${startPoint.y.toFixed(2)} A ${radius} ${radius} 0 ${isLargeArc} 0 ${endPoint.x.toFixed(2)} ${endPoint.y.toFixed(2)}`
}

export function Dashboard5ConcentricArcs({
  boundingBox,
  colors,
  isSelected,
  transform,
  onMouseDown,
  renderHandles,
}: ConcentricArcsProps): ReactElement {
  const arcCenterX = boundingBox.x + 55
  const arcCenterY = boundingBox.y + boundingBox.height / 2
  const [arcColor0, arcColor1, arcColor2] = colors

  return (
    <g
      data-element-id="bottom-concentric-arcs"
      transform={transform}
      onMouseDown={onMouseDown}
      style={{ cursor: 'pointer' }}
    >
      <path
        d={buildArcPath(arcCenterX, arcCenterY, 36, 60, 300)}
        fill="none"
        stroke={arcColor0}
        strokeWidth={7}
        strokeLinecap="round"
      />
      <path
        d={buildArcPath(arcCenterX, arcCenterY, 26, 100, 280)}
        fill="none"
        stroke={arcColor1}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <path
        d={buildArcPath(arcCenterX, arcCenterY, 16, 130, 260)}
        fill="none"
        stroke={arcColor2}
        strokeWidth={5}
        strokeLinecap="round"
      />

      {[
        { percent: '50%', color: arcColor0, offsetY: -24 },
        { percent: '30%', color: arcColor1, offsetY: 0 },
        { percent: '20%', color: arcColor2, offsetY: 24 },
      ].map((item, legendIndex) => {
        const itemY = arcCenterY + item.offsetY
        return (
          <g key={legendIndex}>
            <circle cx={arcCenterX + 60} cy={itemY} r={4.5} fill={item.color} />
            <text
              x={arcCenterX + 74}
              y={itemY + 4}
              fill="#2d3748"
              fontSize={11}
              fontWeight={600}
              fontFamily="Arial, sans-serif"
            >
              {item.percent}
            </text>
          </g>
        )
      })}
      {isSelected && renderHandles(boundingBox, 'bottom-concentric-arcs')}
    </g>
  )
}

export interface HorizontalBarsProps {
  boundingBox: BoundingBox
  bars: Array<{ value: string; color: string; barWidth: number }>
  isSelected: boolean
  transform?: string
  onMouseDown: (event: MouseEvent<SVGGElement>) => void
  renderHandles: (box: BoundingBox, identifier: string) => ReactElement | null
}

export function Dashboard5HorizontalBars({
  boundingBox,
  bars,
  isSelected,
  transform,
  onMouseDown,
  renderHandles,
}: HorizontalBarsProps): ReactElement {
  return (
    <g
      data-element-id="bottom-horizontal-bars"
      transform={transform}
      onMouseDown={onMouseDown}
      style={{ cursor: 'pointer' }}
    >
      {bars.map((bar, barIndex) => {
        const barY = boundingBox.y + barIndex * 22
        return (
          <g key={barIndex}>
            <rect
              x={boundingBox.x}
              y={barY}
              width={bar.barWidth}
              height={13}
              fill={bar.color}
            />
            <rect
              x={boundingBox.x + bar.barWidth + 10}
              y={barY + 2}
              width={8}
              height={8}
              fill={bar.color}
            />
            <text
              x={boundingBox.x + bar.barWidth + 24}
              y={barY + 11}
              fill={bar.color}
              fontSize={13}
              fontWeight={700}
              fontFamily="Arial, sans-serif"
            >
              {bar.value}
            </text>
          </g>
        )
      })}
      {isSelected && renderHandles(boundingBox, 'bottom-horizontal-bars')}
    </g>
  )
}
