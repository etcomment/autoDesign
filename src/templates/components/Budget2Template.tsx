import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Budget2Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, items } = data
  const W = 900
  const H = 600
  const barW = 70
  const maxBarH = 300
  const baselineY = 430
  const gap = 60
  const count = Math.min(items.length, 8)
  const totalW = count * barW + (count - 1) * gap
  const startX = (W - totalW) / 2

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <line x1={startX - 20} y1={baselineY} x2={startX + totalW + 20} y2={baselineY} stroke="#ccc" strokeWidth={2} />

      {items.slice(0, count).map((item, i) => {
        const elementId = `item-${i}`
        const color = tplColors[elementId] ?? item.color ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const x = startX + i * (barW + gap)
        const barHeight = (item.percentage / 100) * maxBarH
        const y = baselineY - barHeight
        const visualRect = { x, y, width: barW, height: barHeight }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={y} width={barW} height={barHeight} rx={4} fill={color} opacity={0.85} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 0} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={x + barW / 2} y={y - 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill={color}>
                {item.amount}
              </text>
              <text x={x + barW / 2} y={y + barHeight / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                {Math.round(item.percentage)}%
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
            <text x={x + barW / 2} y={baselineY + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
              {item.label}
            </text>
          </g>
        )
      })}
    </g>
  )
}
