import { useRef, type ReactElement } from 'react'
import type { Comparison6Data } from '../types'

const LEFT_COLOR = '#2563eb'
const RIGHT_COLOR = '#dc2626'
const LEFT_BG = '#eff6ff'
const RIGHT_BG = '#fef2f2'

export function Comparison6Template({ data }: { data: Comparison6Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)

  const { title, leftTitle, rightTitle, leftItems, rightItems } = data
  const W = 800
  const H = 580
  const colW = 280
  const colGap = 40
  const leftX = (W - colW * 2 - colGap) / 2
  const rightX = leftX + colW + colGap
  const headerH = 48
  const rowH = 38
  const topY = title ? 110 : 70
  const checkSize = 14

  const maxItems = Math.max(leftItems.length, rightItems.length, 6)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <rect x={leftX} y={topY} width={colW} height={headerH} rx={8} fill={LEFT_COLOR} />
      <text x={leftX + colW / 2} y={topY + headerH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
        {leftTitle}
      </text>

      <rect x={rightX} y={topY} width={colW} height={headerH} rx={8} fill={RIGHT_COLOR} />
      <text x={rightX + colW / 2} y={topY + headerH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
        {rightTitle}
      </text>

      {Array.from({ length: maxItems }, (_, i) => {
        const rowY = topY + headerH + 8 + i * rowH

        return (
          <g key={`row-${i}`}>
            <rect x={leftX} y={rowY} width={colW} height={rowH} rx={4} fill={i % 2 === 0 ? LEFT_BG : 'white'} />

            {leftItems[i] && (
              <g>
                <circle cx={leftX + 22} cy={rowY + rowH / 2} r={checkSize / 2} fill={LEFT_COLOR} />
                <text x={leftX + 38} y={rowY + rowH / 2 + 5} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={500} fill="#333">
                  {leftItems[i]}
                </text>
              </g>
            )}

            <rect x={rightX} y={rowY} width={colW} height={rowH} rx={4} fill={i % 2 === 0 ? RIGHT_BG : 'white'} />

            {rightItems[i] && (
              <g>
                <circle cx={rightX + 22} cy={rowY + rowH / 2} r={checkSize / 2} fill={RIGHT_COLOR} />
                <text x={rightX + 38} y={rowY + rowH / 2 + 5} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={500} fill="#333">
                  {rightItems[i]}
                </text>
              </g>
            )}
          </g>
        )
      })}
    </g>
  )
}
