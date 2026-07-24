import { type ReactElement } from 'react'
import type { Circle2Data } from '../types'

export function Circle2Template({ data }: { data: Circle2Data }): ReactElement {
  return (
    <g>
      <rect width={700} height={400} fill="white" rx={8} />
      {data.title && (
        <text x={50} y={50} fontFamily="Arial, sans-serif" fontSize={24} fontWeight={700} fill="#2D2B55">
          {data.title}
        </text>
      )}
      <circle cx={350} cy={220} r={80} fill="none" stroke="#2D2B55" strokeWidth={2} />
      {data.items.slice(0, 3).map((item, i) => {
        const angle = (i * Math.PI * 2) / 3 - Math.PI / 2
        const x = 350 + 120 * Math.cos(angle)
        const y = 220 + 120 * Math.sin(angle)
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={30} fill={['#2D2B55', '#4169E1', '#FF6347'][i]} />
            <text x={x} y={y - 5} textAnchor="middle" fill="white" fontSize={16} fontWeight={700}>
              {item.number}
            </text>
            <text x={x} y={y + 12} textAnchor="middle" fill="white" fontSize={10}>
              {item.title}
            </text>
          </g>
        )
      })}
    </g>
  )
}
