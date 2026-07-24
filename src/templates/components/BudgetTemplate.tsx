import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const PALETTE = ['#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function BudgetTemplate({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

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
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {items.map((item, i) => {
        const elementId = `item-${i}`
        const color = tplColors[elementId] ?? item.color ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const y = startY + i * (barH + gap)
        const barWidth = (item.percentage / 100) * barMaxW
        const visualRect = { x: barX, y, width: barWidth, height: barH }

        return (
          <g key={i}>
            <text x={barX - 14} y={y + barH / 2 + 4} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#333">
              {item.label}
            </text>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={barX} y={y} width={barWidth} height={barH} rx={6} fill={color} opacity={0.9} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 0} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={barX + 14} y={y + barH / 2 + 4} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                {Math.round(item.percentage)}%
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
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
