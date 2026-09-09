import type { ReactElement } from 'react'

export interface HorizontalBarItem {
  label: string
  values: number[]
  colors?: string[]
  formattedValue?: string
  icon?: string
}

export interface MiniHorizontalBarChartProps {
  x: number
  y: number
  width: number
  height: number
  items: HorizontalBarItem[]
  maxValue?: number
  isStacked?: boolean
  labelWidth?: number
  trackColor?: string
  showTrack?: boolean
  textColor?: string
  fontSize?: number
  defaultColors?: string[]
  barHeight?: number
}

export function MiniHorizontalBarChart({
  x,
  y,
  width,
  height,
  items,
  maxValue,
  isStacked = false,
  labelWidth = 80,
  trackColor = '#f1f5f9',
  showTrack = true,
  textColor = '#4a5568',
  fontSize = 12,
  defaultColors = ['#262261', '#2e65c8', '#f05338', '#fdb813'],
  barHeight,
}: MiniHorizontalBarChartProps): ReactElement {
  const rowCount = Math.max(1, items.length)
  const rowHeight = height / rowCount
  const actualBarHeight = barHeight ?? Math.max(6, Math.min(22, rowHeight * 0.45))
  const chartWidth = Math.max(20, width - labelWidth)

  const computedMax =
    maxValue ??
    Math.max(
      1,
      ...items.map(it =>
        isStacked
          ? it.values.reduce((sum, v) => sum + v, 0)
          : Math.max(0, ...it.values)
      )
    )

  return (
    <g>
      {items.map((item, idx) => {
        const rowY = y + idx * rowHeight
        const barY = rowY + (rowHeight - actualBarHeight) / 2
        const barStartX = x + labelWidth

        let currentX = barStartX

        return (
          <g key={idx}>
            {labelWidth > 0 && (
              <text
                x={barStartX - 10}
                y={barY + actualBarHeight / 2 + 4}
                textAnchor="end"
                fill={textColor}
                fontSize={fontSize}
                fontWeight={600}
                fontFamily="Arial, sans-serif"
              >
                {item.label}
              </text>
            )}

            {showTrack && (
              <rect
                x={barStartX}
                y={barY}
                width={chartWidth}
                height={actualBarHeight}
                fill={trackColor}
                rx={actualBarHeight / 2}
              />
            )}

            {isStacked
              ? item.values.map((val, valIdx) => {
                  const segW = (val / computedMax) * chartWidth
                  const segX = currentX
                  currentX += segW
                  const color =
                    item.colors?.[valIdx] ??
                    defaultColors[valIdx % defaultColors.length]!

                  return (
                    <g key={valIdx}>
                      <rect
                        x={segX}
                        y={barY}
                        width={Math.max(1, segW)}
                        height={actualBarHeight}
                        fill={color}
                      />
                      {segW > 24 && (
                        <text
                          x={segX + segW / 2}
                          y={barY + actualBarHeight / 2 + 4}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize={10}
                          fontWeight={700}
                          fontFamily="Arial, sans-serif"
                        >
                          {val}
                        </text>
                      )}
                    </g>
                  )
                })
              : item.values.map((val, valIdx) => {
                  const segW = (val / computedMax) * chartWidth
                  const color =
                    item.colors?.[valIdx] ??
                    defaultColors[valIdx % defaultColors.length]!

                  return (
                    <rect
                      key={valIdx}
                      x={barStartX}
                      y={barY}
                      width={Math.max(1, segW)}
                      height={actualBarHeight}
                      fill={color}
                      rx={showTrack ? actualBarHeight / 2 : 2}
                    />
                  )
                })}

            {item.formattedValue && (
              <text
                x={barStartX + chartWidth + 10}
                y={barY + actualBarHeight / 2 + 4}
                textAnchor="start"
                fill={textColor}
                fontSize={fontSize}
                fontWeight={700}
                fontFamily="Arial, sans-serif"
              >
                {item.formattedValue}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}
