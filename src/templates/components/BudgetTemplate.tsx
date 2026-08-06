import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'

export function BudgetTemplate({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const items = data.items && data.items.length > 0 ? data.items : [
    { label: 'Engineering', percentage: 40, amount: '€40,000' },
    { label: 'Marketing', percentage: 25, amount: '€25,000' },
    { label: 'Operations', percentage: 20, amount: '€20,000' },
    { label: 'Design', percentage: 15, amount: '€15,000' },
  ]
  const totalLabel = data.totalLabel || 'Total Budget'
  const totalAmount = data.totalAmount || '€100,000'

  const count = Math.max(1, items.length)
  const barX = 200
  const barMaxW = 500
  const barH = count > 5 ? 36 : 42
  const startY = 30
  const availableH = 400
  const gap = count > 1 ? Math.max(10, Math.min(18, (availableH - count * barH) / (count - 1))) : 18

  return (
    <g ref={svgRef}>
      {items.map((item, i) => {
        const elementId = `item-${i}`
        const color = tplColors[elementId] ?? item.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)

        const y = startY + i * (barH + gap)
        const barWidth = Math.max(30, (item.percentage / 100) * barMaxW)
        const defaultBbox = { x: barX, y, width: barWidth + 140, height: barH }

        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <text
              x={bbox.x - 14}
              y={bbox.y + bbox.height / 2 + 4}
              textAnchor="end"
              fontFamily="Arial, sans-serif"
              fontSize={13}
              fontWeight={600}
              fill="#333"
            >
              {item.label}
            </text>

            <rect
              x={bbox.x}
              y={bbox.y}
              width={barWidth}
              height={bbox.height}
              rx={6}
              fill={color}
              opacity={0.9}
              stroke={isSelected ? '#4a90d9' : color}
              strokeWidth={isSelected ? 2.5 : 0}
            />

            <text
              x={bbox.x + 14}
              y={bbox.y + bbox.height / 2 + 4}
              fontFamily="Arial, sans-serif"
              fontSize={12}
              fontWeight={700}
              fill="white"
            >
              {Math.round(item.percentage)}%
            </text>

            <text
              x={bbox.x + barWidth + 14}
              y={bbox.y + bbox.height / 2 + 4}
              textAnchor="start"
              fontFamily="Arial, sans-serif"
              fontSize={13}
              fontWeight={600}
              fill={color}
            >
              {item.amount}
            </text>

            {item.icon && (() => {
              const IconFn = TEMPLATE_ICONS[item.icon]
              return IconFn ? (
                <g transform={`translate(${bbox.x + barWidth + 60}, ${bbox.y + bbox.height / 2 - 8})`}>
                  <IconFn size={16} color={color} />
                </g>
              ) : null
            })()}

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      {(() => {
        const totalId = 'total-summary'
        const totalY = startY + items.length * (barH + gap) + 16
        const defaultBbox = { x: barX, y: totalY, width: barMaxW, height: 40 }
        const customPos = positions[totalId]
        const isSelected = selectedIds.has(totalId)
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        return (
          <g
            key={totalId}
            onMouseDown={e => startDrag(e, totalId, bbox)}
            transform={getTransform(totalId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <line x1={bbox.x} y1={bbox.y} x2={bbox.x + bbox.width} y2={bbox.y} stroke="#ccc" strokeWidth={2} />
            <text
              x={bbox.x - 14}
              y={bbox.y + 24}
              textAnchor="end"
              fontFamily="Arial, sans-serif"
              fontSize={14}
              fontWeight={700}
              fill="#222"
            >
              {totalLabel}
            </text>
            <text
              x={bbox.x + bbox.width + 14}
              y={bbox.y + 24}
              textAnchor="start"
              fontFamily="Arial, sans-serif"
              fontSize={14}
              fontWeight={700}
              fill="#222"
            >
              {totalAmount}
            </text>

            {isSelected && renderHandles(bbox, totalId)}
          </g>
        )
      })()}
    </g>
  )
}
