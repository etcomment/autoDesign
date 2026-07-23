import type { ReactElement } from 'react'
import type { ComparisonData } from '../types'

const LEFT_COLOR = '#2563eb'
const RIGHT_COLOR = '#dc2626'
const LEFT_BG = '#eff6ff'
const RIGHT_BG = '#fef2f2'

export function ComparisonTemplate({ data }: { data: ComparisonData }): ReactElement {
  const { title, leftTitle, rightTitle, items } = data
  const W = 900
  const H = 600

  const colW = 320
  const labelW = 100
  const dividerW = 40
  const totalW = colW * 2 + labelW + dividerW
  const tableX = (W - totalW) / 2
  const headerH = 48
  const rowH = 40
  const tableY = title ? 110 : 80

  const leftColX = tableX
  const labelColX = leftColX + colW
  const rightColX = labelColX + labelW + dividerW

  return (
    <g>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <rect x={leftColX} y={tableY} width={colW} height={headerH} rx={6} fill={LEFT_COLOR} />
      <text x={leftColX + colW / 2} y={tableY + headerH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
        {leftTitle}
      </text>

      <rect x={rightColX} y={tableY} width={colW} height={headerH} rx={6} fill={RIGHT_COLOR} />
      <text x={rightColX + colW / 2} y={tableY + headerH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
        {rightTitle}
      </text>

      <text x={labelColX + labelW / 2 + dividerW / 2} y={tableY + headerH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={800} fill="#94a3b8">
        VS
      </text>

      {items.map((item, i) => {
        const rowY = tableY + headerH + i * rowH
        const isEven = i % 2 === 0

        return (
          <g key={i}>
            <rect x={leftColX} y={rowY} width={colW} height={rowH} fill={isEven ? LEFT_BG : 'white'} />
            <rect x={rightColX} y={rowY} width={colW} height={rowH} fill={isEven ? RIGHT_BG : 'white'} />
            <rect x={labelColX + dividerW / 2} y={rowY} width={labelW} height={rowH} fill={isEven ? '#f8fafc' : '#f1f5f9'} />

            <text x={leftColX + colW / 2} y={rowY + rowH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={500} fill={LEFT_COLOR}>
              {item.left}
            </text>

            <text x={rightColX + colW / 2} y={rowY + rowH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={500} fill={RIGHT_COLOR}>
              {item.right}
            </text>

            <text x={labelColX + labelW / 2 + dividerW / 2} y={rowY + rowH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#475569">
              {item.label}
            </text>

            <line x1={leftColX} y1={rowY + rowH} x2={rightColX + colW} y2={rowY + rowH} stroke="#e2e8f0" strokeWidth={1} />
          </g>
        )
      })}

      <line
        x1={labelColX + labelW / 2 + dividerW / 2}
        y1={tableY + headerH}
        x2={labelColX + labelW / 2 + dividerW / 2}
        y2={tableY + headerH + items.length * rowH}
        stroke="#cbd5e0"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
    </g>
  )
}
