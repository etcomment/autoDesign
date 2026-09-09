import type { ReactElement } from 'react'

export interface BlockArrowProps {
  x: number
  y: number
  width?: number
  height?: number
  isUpward?: boolean
  color?: string
}

export function BlockArrow({
  x,
  y,
  width = 24,
  height = 32,
  isUpward = true,
  color = '#3366cc',
}: BlockArrowProps): ReactElement {
  const headHeight = height * 0.45
  const shaftWidth = width * 0.45
  const shaftMargin = (width - shaftWidth) / 2
  const pathData = isUpward
    ? `M ${x + width / 2} ${y} L ${x + width} ${y + headHeight} H ${x + width - shaftMargin} V ${y + height} H ${x + shaftMargin} V ${y + headHeight} H ${x} Z`
    : `M ${x + shaftMargin} ${y} H ${x + width - shaftMargin} V ${y + height - headHeight} H ${x + width} L ${x + width / 2} ${y + height} L ${x} ${y + height - headHeight} H ${x + shaftMargin} Z`

  return <path d={pathData} fill={color} />
}
