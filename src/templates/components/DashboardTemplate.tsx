import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const DEFAULT_COLORS = ['#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4']

function isPositiveChange(change: string): boolean {
  return change.startsWith('+')
}

export function DashboardTemplate({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, metrics } = data
  const W = 900
  const H = 600

  const displayed = metrics.slice(0, 6)
  const cardW = 248
  const cardH = 150
  const gap = 22
  const cardsPerRow = 3
  const totalW = cardsPerRow * cardW + (cardsPerRow - 1) * gap
  const startX = (W - totalW) / 2
  const startY = title ? 100 : 70

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="#f7fafc" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {displayed.map((metric, i) => {
        const col = i % cardsPerRow
        const row = Math.floor(i / cardsPerRow)
        const x = startX + col * (cardW + gap)
        const y = startY + row * (cardH + gap)
        const defaultColor = metric.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]!

        const elementId = `metric-${i}`
        const color = tplColors[elementId] ?? defaultColor
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x, y, width: cardW, height: cardH }
        const hasChange = metric.change !== undefined

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={x + 3} y={y + 3} width={cardW} height={cardH} rx={10} fill="black" opacity={0.08} />
              <rect x={x} y={y} width={cardW} height={cardH} rx={10} fill="white" stroke={isSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSelected ? 2.5 : 1} strokeDasharray={isSelected ? '4 2' : undefined} />

              <rect x={x} y={y} width={cardW} height={6} rx={3} fill={color} />

              <text x={x + cardW / 2} y={y + 38} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#718096">
                {metric.label.toUpperCase()}
              </text>

              <text x={x + cardW / 2} y={y + 82} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={32} fontWeight={800} fill="#1a202c">
                {metric.value}
              </text>

              {hasChange && (
                <g transform={'translate(' + (x + cardW / 2) + ', ' + (y + 118) + ')'}>
                  {isPositiveChange(metric.change!) ? (
                    <path d="M -6 6 L 0 -6 L 6 6 Z" fill="#48bb78" />
                  ) : (
                    <path d="M -6 -6 L 0 6 L 6 -6 Z" fill="#f56565" />
                  )}
                  <text x={14} y={4} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={isPositiveChange(metric.change!) ? '#48bb78' : '#f56565'}>
                    {metric.change}
                  </text>
                </g>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
