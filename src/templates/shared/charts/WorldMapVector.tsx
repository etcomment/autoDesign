import type { ReactElement } from 'react'

export interface WorldMapVectorProps {
  x: number
  y: number
  width: number
  height: number
  fill?: string
  opacity?: number
}

export function WorldMapVector({
  x,
  y,
  width,
  height,
  fill = '#e2e8f0',
  opacity = 0.6,
}: WorldMapVectorProps): ReactElement {
  const scaleX = width / 1000
  const scaleY = height / 500

  return (
    <g transform={`translate(${x}, ${y}) scale(${scaleX}, ${scaleY})`} fill={fill} opacity={opacity}>
      {/* North America */}
      <path d="M 80 80 Q 130 50 200 60 Q 250 80 260 120 Q 240 160 210 170 Q 190 220 160 230 Q 130 250 120 230 Q 100 200 90 150 Z M 190 30 Q 240 20 250 50 Q 220 60 190 30 Z" />
      {/* Central America & Caribbean */}
      <path d="M 160 230 Q 180 260 190 290 Q 175 285 160 240 Z M 215 250 A 6 6 0 1 0 220 255 Z M 235 260 A 5 5 0 1 0 240 265 Z" />
      {/* South America */}
      <path d="M 210 280 Q 260 270 300 300 Q 320 350 290 410 Q 260 460 240 480 Q 230 460 220 380 Q 200 320 210 280 Z" />
      {/* Europe */}
      <path d="M 450 100 Q 520 80 540 120 Q 510 150 480 160 Q 450 170 430 140 Q 435 110 450 100 Z M 430 90 Q 450 70 440 95 Z M 480 70 Q 500 60 510 85 Q 490 90 480 70 Z" />
      {/* Africa */}
      <path d="M 440 180 Q 520 170 550 210 Q 570 260 550 330 Q 520 400 480 410 Q 450 360 430 290 Q 420 220 440 180 Z M 570 330 Q 580 370 565 365 Z" />
      {/* Asia */}
      <path d="M 540 110 Q 640 70 780 90 Q 840 120 860 180 Q 820 240 770 240 Q 730 290 680 290 Q 640 240 600 230 Q 580 270 550 260 Q 540 190 540 110 Z M 670 240 Q 720 240 700 290 Q 660 280 670 240 Z" />
      {/* Japan & East Asia islands */}
      <path d="M 870 140 Q 890 170 880 200 Q 865 180 870 140 Z M 800 290 Q 820 320 810 330 Z M 750 320 Q 790 320 780 340 Z" />
      {/* Australia & Oceania */}
      <path d="M 770 360 Q 860 350 870 400 Q 850 460 800 450 Q 760 430 750 390 Q 755 365 770 360 Z M 880 430 Q 900 450 885 460 Z" />
    </g>
  )
}
