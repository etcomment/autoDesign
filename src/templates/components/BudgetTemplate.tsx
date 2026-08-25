import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'

export function BudgetTemplate({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
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
      {items.map((item, index) => {
        const elementId = `item-${index}`
        const color = tplColors[elementId] ?? item.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        const y = startY + index * (barH + gap)
        const barWidth = Math.max(30, (item.percentage / 100) * barMaxW)
        const defaultBbox = { x: barX, y, width: barWidth + 140, height: barH }

        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const IconComponent = item.icon ? TEMPLATE_ICONS[item.icon] : undefined
        const labelLines = wrapTextByWidth(item.label, 14)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <text
              x={bbox.x - 14}
              y={bbox.y + bbox.height / 2 + (labelLines.length > 1 ? -3 : 4)}
              textAnchor="end"
              fontFamily="Arial, sans-serif"
              fontSize={13}
              fontWeight={600}
              fill="#333"
            >
              {labelLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x - 14} dy={lineIndex === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>

            <rect
              x={bbox.x}
              y={bbox.y}
              width={barWidth}
              height={bbox.height}
              rx={6}
              fill={color}
              opacity={0.9}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
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

            {IconComponent && (
              <g transform={`translate(${bbox.x + barWidth + 70}, ${bbox.y + bbox.height / 2 - 8})`}>
                <IconComponent size={16} color={color} />
              </g>
            )}

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
        const strokeColor = tplStrokeColors[totalId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[totalId] ?? (isSelected ? 2 : 0)
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        return (
          <g
            key={totalId}
            data-element-id={totalId}
            onMouseDown={e => startDrag(e, totalId, bbox)}
            transform={getTransform(totalId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            {strokeWidth > 0 && (
              <rect x={bbox.x - 10} y={bbox.y - 4} width={bbox.width + 20} height={bbox.height + 8} rx={4} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            )}
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
