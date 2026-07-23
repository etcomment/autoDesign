import type { ReactElement } from 'react'
import type { BudgetData } from '../types'

const PALETTE = ['#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function BudgetTemplate({ data }: { data: BudgetData }): ReactElement {
  const { title, totalLabel, totalAmount, items } = data
  const W = 900
  const H = 600
  const barX = 200
  const barMaxW = 560
  const barH = 42
  const startY = 120
  const gap = 18

  const totalBarY = startY + items.length * (barH + gap) + 40

  return (
    <g>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {items.map((item, i) => {
        const color = item.color ?? PALETTE[i % PALETTE.length]!
        const y = startY + i * (barH + gap)
        const barWidth = (item.percentage / 100) * barMaxW

        return (
          <g key={i}>
            <text x={barX - 14} y={y + barH / 2 + 4} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#333">
              {item.label}
            </text>
            <rect x={barX} y={y} width={barWidth} height={barH} rx={6} fill={color} opacity={0.9} />
            <text x={barX + 14} y={y + barH / 2 + 4} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
              {Math.round(item.percentage)}%
            </text>
            <text x={barX + barMaxW + 14} y={y + barH / 2 + 4} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill={color}>
              {item.amount}
            </text>
          </g>
        )
      })}

      <line x1={barX} y1={totalBarY} x2={barX + barMaxW} y2={totalBarY} stroke="#ccc" strokeWidth={2} />
      <text x={barX - 14} y={totalBarY + 30} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#222">
        {totalLabel}
      </text>
      <text x={barX + barMaxW + 14} y={totalBarY + 30} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#222">
        {totalAmount}
      </text>
    </g>
  )
}
