import type { ReactElement } from 'react'

export interface BarGroup {
  label?: string
  values: number[]
  colors?: string[]
}

export interface MiniBarChartProps {
  x: number
  y: number
  width: number
  height: number
  groups: BarGroup[]
  yMax?: number
  isStacked?: boolean
  showBaseline?: boolean
  baselineColor?: string
  textColor?: string
  fontSize?: number
  defaultColors?: string[]
  barRadius?: number
}

export function MiniBarChart({
  x,
  y,
  width,
  height,
  groups,
  yMax,
  isStacked = false,
  showBaseline = true,
  baselineColor = '#e2e8f0',
  textColor = '#718096',
  fontSize = 11,
  defaultColors = ['#262261', '#2e65c8', '#f05338', '#fdb813'],
  barRadius = 2,
}: MiniBarChartProps): ReactElement {
  const hasLabels = groups.some(g => Boolean(g.label))
  const bottomLabelHeight = hasLabels ? fontSize + 10 : 0
  const chartHeight = Math.max(10, height - bottomLabelHeight)

  const groupMaxes = groups.map(g => {
    if (isStacked) return g.values.reduce((sum, v) => sum + v, 0)
    return Math.max(0, ...g.values)
  })
  const computedMax = yMax ?? Math.max(1, ...groupMaxes)

  const groupCount = Math.max(1, groups.length)
  const groupSlotWidth = width / groupCount
  const groupPadding = groupSlotWidth * 0.2
  const groupContentWidth = groupSlotWidth - groupPadding * 2

  return (
    <g>
      {showBaseline && (
        <line
          x1={x}
          y1={y + chartHeight}
          x2={x + width}
          y2={y + chartHeight}
          stroke={baselineColor}
          strokeWidth={1.5}
        />
      )}

      {groups.map((grp, gIdx) => {
        const groupX = x + gIdx * groupSlotWidth + groupPadding
        const barCount = grp.values.length

        if (isStacked) {
          let currentY = y + chartHeight
          const barW = groupContentWidth

          return (
            <g key={gIdx}>
              {grp.values.map((val, valIdx) => {
                const segH = (val / computedMax) * chartHeight
                currentY -= segH
                const color =
                  grp.colors?.[valIdx] ?? defaultColors[valIdx % defaultColors.length]!

                return (
                  <rect
                    key={valIdx}
                    x={groupX}
                    y={currentY}
                    width={barW}
                    height={Math.max(1, segH)}
                    fill={color}
                    rx={valIdx === grp.values.length - 1 ? barRadius : 0}
                  />
                )
              })}
              {grp.label && (
                <text
                  x={groupX + barW / 2}
                  y={y + height - 2}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize={fontSize}
                  fontWeight={600}
                  fontFamily="Arial, sans-serif"
                >
                  {grp.label}
                </text>
              )}
            </g>
          )
        }

        const barGap = 2
        const barW = Math.max(2, (groupContentWidth - (barCount - 1) * barGap) / Math.max(1, barCount))

        return (
          <g key={gIdx}>
            {grp.values.map((val, valIdx) => {
              const barH = (val / computedMax) * chartHeight
              const barX = groupX + valIdx * (barW + barGap)
              const barY = y + chartHeight - barH
              const color =
                grp.colors?.[valIdx] ?? defaultColors[valIdx % defaultColors.length]!

              return (
                <rect
                  key={valIdx}
                  x={barX}
                  y={barY}
                  width={barW}
                  height={Math.max(1, barH)}
                  fill={color}
                  rx={barRadius}
                />
              )
            })}

            {grp.label && (
              <text
                x={groupX + groupContentWidth / 2}
                y={y + height - 2}
                textAnchor="middle"
                fill={textColor}
                fontSize={fontSize}
                fontWeight={600}
                fontFamily="Arial, sans-serif"
              >
                {grp.label}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}
