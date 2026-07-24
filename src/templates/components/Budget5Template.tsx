import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c']

export function Budget5Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, totalLabel, totalAmount, items } = data
  const W = 900
  const H = 600
  const cx = W * 0.35
  const cy = H / 2 + 20
  const pieR = 150
  const legendX = W * 0.62
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
        const x1 = cx + pieR * Math.cos(startRad)
        const y1 = cy + pieR * Math.sin(startRad)
        const x2 = cx + pieR * Math.cos(endRad)
        const y2 = cy + pieR * Math.sin(endRad)
        const largeArc = sliceAngle > 180 ? 1 : 0

        const d = [
          `M ${cx} ${cy}`,
          `L ${x1} ${y1}`,
          `A ${pieR} ${pieR} 0 ${largeArc} 1 ${x2} ${y2}`,
          'Z',
        ].join(' ')

        const ly = legendX
        const legendY = cy - 60 + i * 36

        return (
          <g key={i}>
            <path d={d} fill={color} opacity={isSelected ? 1 : 0.85} stroke={isSelected ? '#4a90d9' : 'white'} strokeWidth={isSelected ? 2.5 : 2} strokeDasharray={isSelected ? '4 2' : undefined} style={{ cursor: 'pointer' }} onMouseDown={e => startDrag(e, elementId, { x: ly, y: legendY, width: 180, height: 28 })} />
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r={pieR * 0.35} fill="white" stroke="#e0e0e0" strokeWidth={1} />
      <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="#333">
        {totalLabel}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#1a1a2e">
        {totalAmount}
      </text>

      {items.map((item, i) => {
        const elementId = `item-${i}`
        const color = tplColors[elementId] ?? item.color ?? PALETTE[i % PALETTE.length]!
        const legendY = cy - 60 + i * 36

        return (
          <g key={`legend-${i}`}>
            <rect x={legendX} y={legendY} width={14} height={14} rx={3} fill={color} />
            <text x={legendX + 22} y={legendY + 12} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
              {item.label}
            </text>
            <text x={legendX + 22} y={legendY + 28} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={10} fill="#888">
              {item.amount} ({Math.round(item.percentage)}%)
            </text>
          </g>
        )
      })}
    </g>
  )
}
