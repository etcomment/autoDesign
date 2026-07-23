import type { ReactElement } from 'react'
import type { GoalsData } from '../types'

export function GoalsTemplate({ data }: { data: GoalsData }): ReactElement {
  const { title, centerGoal, metrics } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2 + 20
  const ringColors = ['#e8f4fd', '#cce5ff', '#99ccff', '#66b2ff', '#3399ff']

  return (
    <g>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={46} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {metrics.map((_, i) => {
        const r = 50 + i * 50
        const color = ringColors[i % ringColors.length]!
        const strokeColor = i === metrics.length - 1 ? '#4a90d9' : '#a0c4e8'
        return (
          <g key={`ring-${i}`}>
            <circle cx={cx} cy={cy} r={r} fill={color} stroke={strokeColor} strokeWidth={1.5} opacity={0.3 + i * 0.1} />
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r={38} fill="#1a1a2e" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
        {centerGoal.length > 12 ? centerGoal.slice(0, 10) + '..' : centerGoal}
      </text>

      <line x1={cx} y1={cy - 38} x2={cx} y2={cy - 240} stroke="#4a90d9" strokeWidth={2} />
      <polygon points={`${cx - 6},${cy - 240} ${cx + 6},${cy - 240} ${cx},${cy - 256}`} fill="#4a90d9" />

      {metrics.map((metric, i) => {
        const angle = -1.2 + (i / Math.max(metrics.length - 1, 1)) * 2.4
        const r = 75 + i * 50
        const labelX = cx + r * Math.cos(angle)
        const labelY = cy + r * Math.sin(angle)

        return (
          <g key={`label-${i}`}>
            <line x1={cx} y1={cy} x2={labelX} y2={labelY} stroke="#aaa" strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
            <rect x={labelX - 52} y={labelY - 24} width={104} height={48} rx={6} fill="white" stroke="#4a90d9" strokeWidth={1.5} />
            <text x={labelX} y={labelY - 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#333">
              {metric.label}
            </text>
            <text x={labelX} y={labelY + 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#888">
              {metric.value} / {metric.target}
            </text>
          </g>
        )
      })}
    </g>
  )
}
