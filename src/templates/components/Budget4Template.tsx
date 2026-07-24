import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

export function Budget4Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, totalLabel, totalAmount, items } = data
  const W = 900
  const H = 600
  const barW = 120
  const gap = 24
  const startX = 120
  const baselineY = 400
  const pxPerUnit = 2.5
  const count = Math.min(items.length, 6)

  let runningTotal = 0

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {items.slice(0, count).map((item, i) => {
        const elementId = `item-${i}`
        const isSelected = selectedIds.has(elementId)
        const barH = item.percentage * pxPerUnit
        const x = startX + i * (barW + gap)

        const positive = item.percentage >= 0
        const y = positive ? baselineY - runningTotal - barH : baselineY - runningTotal
        const rectColor = positive ? '#2ecc71' : '#e74c3c'
        const visualRect = { x, y: Math.min(y, baselineY - runningTotal), width: barW, height: Math.abs(barH) }

        const currentTop = baselineY - runningTotal
        runningTotal += barH

        return (
          <g key={i}>
            {i > 0 && (
              <line x1={x - gap / 2} y1={currentTop} x2={x + gap / 2} y2={currentTop} stroke="#aaa" strokeWidth={1} strokeDasharray="3 3" />
            )}
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={y} width={barW} height={Math.abs(barH)} rx={4} fill={rectColor} opacity={0.85} stroke={isSelected ? '#4a90d9' : rectColor} strokeWidth={isSelected ? 2.5 : 0} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={x + barW / 2} y={y + Math.abs(barH) / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                {item.amount}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
            <text x={x + barW / 2} y={baselineY + 30} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#333">
              {item.label}
            </text>
          </g>
        )
      })}

      <rect x={startX - 60} y={baselineY - 100} width={80} height={30} rx={4} fill="#1a1a2e" />
      <text x={startX - 20} y={baselineY - 80} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
        {totalLabel}: {totalAmount}
      </text>
    </g>
  )
}
