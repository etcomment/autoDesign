import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Budget3Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, totalLabel, totalAmount, items } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2 + 20
  const outerR = 160
  const innerR = 90
  const labelR = outerR + 40
  const total = items.reduce((s, it) => s + it.percentage, 0)

  let cumulative = -90

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {items.map((item, i) => {
        const elementId = `item-${i}`
        const color = tplColors[elementId] ?? item.color ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const sliceAngle = (item.percentage / total) * 360
        const startAngle = cumulative
        const endAngle = startAngle + sliceAngle
        cumulative = endAngle

        const startRad = (startAngle * Math.PI) / 180
        const endRad = (endAngle * Math.PI) / 180
        const x1o = cx + outerR * Math.cos(startRad)
        const y1o = cy + outerR * Math.sin(startRad)
        const x2o = cx + outerR * Math.cos(endRad)
        const y2o = cy + outerR * Math.sin(endRad)
        const x1i = cx + innerR * Math.cos(startRad)
        const y1i = cy + innerR * Math.sin(startRad)
        const x2i = cx + innerR * Math.cos(endRad)
        const y2i = cy + innerR * Math.sin(endRad)
        const largeArc = sliceAngle > 180 ? 1 : 0

        const d = [
          `M ${x1o} ${y1o}`,
          `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2o} ${y2o}`,
          `L ${x2i} ${y2i}`,
          `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x1i} ${y1i}`,
          'Z',
        ].join(' ')

        const midAngle = (startAngle + endAngle) / 2
        const midRad = (midAngle * Math.PI) / 180
        const lx = cx + labelR * Math.cos(midRad)
        const ly = cy + labelR * Math.sin(midRad)

        return (
          <g key={i}>
            <path d={d} fill={color} opacity={isSelected ? 1 : 0.8} stroke={isSelected ? '#4a90d9' : 'white'} strokeWidth={isSelected ? 2.5 : 2} strokeDasharray={isSelected ? '4 2' : undefined} style={{ cursor: 'pointer' }} onMouseDown={e => startDrag(e, elementId, { x: lx - 40, y: ly - 12, width: 80, height: 24 })} />
            <text x={lx} y={ly - 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#333">
              {item.label}
            </text>
            <text x={lx} y={ly + 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#888">
              {Math.round(item.percentage)}%
            </text>
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r={innerR} fill="white" stroke="#e0e0e0" strokeWidth={1} />
      <text x={cx} y={cy - 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#333">
        {totalLabel}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="#1a1a2e">
        {totalAmount}
      </text>
    </g>
  )
}
