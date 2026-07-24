import { useRef, type ReactElement } from 'react'
import type { Comparison7Data } from '../types'

const PRO_COLOR = '#16a34a'
const CON_COLOR = '#dc2626'
const PRO_BG = '#f0fdf4'
const CON_BG = '#fef2f2'

export function Comparison7Template({ data }: { data: Comparison7Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)

  const { title, pros, cons } = data
  const W = 800
  const H = 580
  const colW = 300
  const colGap = 40
  const leftX = (W - colW * 2 - colGap) / 2
  const rightX = leftX + colW + colGap
  const headerH = 48
  const rowH = 34
  const topY = title ? 110 : 70


  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <rect x={leftX} y={topY} width={colW} height={headerH} rx={8} fill={PRO_COLOR} />
      <text x={leftX + colW / 2} y={topY + headerH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
        PROS
      </text>

      <rect x={rightX} y={topY} width={colW} height={headerH} rx={8} fill={CON_COLOR} />
      <text x={rightX + colW / 2} y={topY + headerH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
        CONS
      </text>

      {pros.map((pro, i) => (
        <g key={`pro-${i}`}>
          <rect x={leftX} y={topY + headerH + 8 + i * rowH} width={colW} height={rowH} rx={4} fill={i % 2 === 0 ? PRO_BG : 'white'} />
          <circle cx={leftX + 18} cy={topY + headerH + 8 + i * rowH + rowH / 2} r={5} fill={PRO_COLOR} />
          <text x={leftX + 34} y={topY + headerH + 8 + i * rowH + rowH / 2 + 4} fontFamily="Arial, sans-serif" fontSize={13} fill="#333">
            {pro}
          </text>
        </g>
      ))}

      {cons.map((con, i) => (
        <g key={`con-${i}`}>
          <rect x={rightX} y={topY + headerH + 8 + i * rowH} width={colW} height={rowH} rx={4} fill={i % 2 === 0 ? CON_BG : 'white'} />
          <circle cx={rightX + 18} cy={topY + headerH + 8 + i * rowH + rowH / 2} r={5} fill={CON_COLOR} />
          <text x={rightX + 34} y={topY + headerH + 8 + i * rowH + rowH / 2 + 4} fontFamily="Arial, sans-serif" fontSize={13} fill="#333">
            {con}
          </text>
        </g>
      ))}
    </g>
  )
}
