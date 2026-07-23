import type { ReactElement } from 'react'
import type { FunnelData } from '../types'

const DEFAULT_COLORS = ['#4a90d9', '#3a7bc8', '#2a6bb7', '#1a5ca6', '#0d4d95', '#083d7a']

function percentageToWidth(percentage: number, minW: number, maxW: number): number {
  return minW + (maxW - minW) * (percentage / 100)
}

export function FunnelTemplate({ data }: { data: FunnelData }): ReactElement {
  const { title, levels } = data
  const W = 900
  const H = 600

  const funnelTop = 100
  const funnelBottom = 560
  const maxW = 560
  const minW = 100
  const cx = W / 2
  const count = levels.length
  const totalSpace = funnelBottom - funnelTop
  const levelH = count > 0 ? totalSpace / count : 0
  const labelX = cx - maxW / 2 - 28
  const percentX = cx + maxW / 2 + 28

  const percentages = levels.map((level, i) => {
    if (level.percentage !== undefined) return level.percentage
    return 100 - ((100 - 20) / (count - 1 || 1)) * i
  })

  return (
    <g>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={cx} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {levels.map((level, i) => {
        const y = funnelTop + i * levelH
        const color = level.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]!
        const topPct = percentages[i]!
        const bottomPct = i + 1 < count ? percentages[i + 1]! : topPct * 0.4
        const topHW = percentageToWidth(topPct, minW, maxW) / 2
        const bottomHW = percentageToWidth(bottomPct, minW, maxW) / 2

        const tl = cx - topHW
        const tr = cx + topHW
        const bl = cx - bottomHW
        const br = cx + bottomHW
        const by = y + levelH

        const d = 'M ' + tl + ' ' + y + ' L ' + tr + ' ' + y + ' L ' + br + ' ' + by + ' L ' + bl + ' ' + by + ' Z'

        return (
          <g key={i}>
            <path d={d} fill={color} opacity={0.82} stroke={color} strokeWidth={1.5} />

            <text x={labelX} y={y + levelH / 2 + 5} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={600} fill="#1a202c">
              {level.title}
            </text>

            {level.subtitle && (
              <text x={labelX} y={y + levelH / 2 + 22} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fill="#718096">
                {level.subtitle}
              </text>
            )}

            <text x={percentX} y={y + levelH / 2 + 5} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill={color}>
              {Math.round(topPct)}%
            </text>
          </g>
        )
      })}
    </g>
  )
}
