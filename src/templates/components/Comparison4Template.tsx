import { useRef, type ReactElement } from 'react'
import type { ComparisonData } from '../types'

const LEFT_COLOR = '#2563eb'
const RIGHT_COLOR = '#dc2626'
const OVERLAP_COLOR = '#7c3aed'

export function Comparison4Template({ data }: { data: ComparisonData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)

  const { title, leftTitle, rightTitle, items } = data
  const W = 800
  const H = 540
  const circleR = 160
  const leftCx = W / 2 - 80
  const rightCx = W / 2 + 80
  const cy = 320

  const leftItems = items.slice(0, 3)
  const rightItems = items.slice(3, 6)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <circle cx={leftCx} cy={cy} r={circleR} fill={LEFT_COLOR} opacity={0.12} />
      <circle cx={rightCx} cy={cy} r={circleR} fill={RIGHT_COLOR} opacity={0.12} />

      <circle cx={leftCx} cy={cy} r={circleR} fill="none" stroke={LEFT_COLOR} strokeWidth={2} />
      <circle cx={rightCx} cy={cy} r={circleR} fill="none" stroke={RIGHT_COLOR} strokeWidth={2} strokeDasharray="8 4" />

      <text x={leftCx} y={cy - circleR - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={LEFT_COLOR}>
        {leftTitle}
      </text>
      <text x={rightCx} y={cy - circleR - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={RIGHT_COLOR}>
        {rightTitle}
      </text>

      {leftItems.map((item, i) => (
        <text key={`left-${i}`} x={leftCx - 40} y={cy - 10 + i * 24} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={500} fill="#333">
          {item.label}
        </text>
      ))}

      {rightItems.map((item, i) => (
        <text key={`right-${i}`} x={rightCx + 40} y={cy - 10 + i * 24} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={500} fill="#333">
          {item.label}
        </text>
      ))}

      <text x={W / 2} y={cy} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={OVERLAP_COLOR}>
        Common
      </text>
      <text x={W / 2} y={cy + 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill={OVERLAP_COLOR} opacity={0.7}>
        shared items
      </text>
    </g>
  )
}
