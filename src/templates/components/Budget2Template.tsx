import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Budget2Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { items } = data
  const displayed = items && items.length > 0 ? items : [
    { label: 'Engineering', percentage: 40, amount: '€40,000' },
    { label: 'Marketing', percentage: 25, amount: '€25,000' },
    { label: 'Operations', percentage: 20, amount: '€20,000' },
    { label: 'Design', percentage: 15, amount: '€15,000' },
  ]

  const W = 800
  const labelW = 160
  const trackWidth = 440
  const rowHeight = 52
  const barHeight = 34
  const startY = 40

  return (
    <g ref={svgRef}>
      {displayed.map((item, index) => {
        const rowY = startY + index * rowHeight
        const elementId = `item-${index}`
        const color = tplColors[elementId] ?? item.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const pct = Math.max(0, Math.min(100, item.percentage || 0))
        const fillWidth = (pct / 100) * trackWidth

        const defaultBbox = { x: 20, y: rowY - 6, width: W - 40, height: rowHeight }
        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 0)
        const IconComponent = item.icon ? TEMPLATE_ICONS[item.icon] : undefined
        const labelLines = wrapTextByWidth(item.label, 15)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            {strokeWidth > 0 && (
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            )}

            {IconComponent && (
              <g transform={`translate(${bbox.x + 8}, ${bbox.y + barHeight / 2})`}>
                <IconComponent size={18} color={color} />
              </g>
            )}

            <text x={bbox.x + (IconComponent ? 32 : 8)} y={bbox.y + barHeight / 2 + (item.amount ? 0 : 8) - (labelLines.length > 1 ? 4 : 0)} fontFamily="Arial, sans-serif" fontSize={14} fontWeight={600} fill="#333">
              {labelLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + (IconComponent ? 32 : 8)} dy={lineIndex === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
            {item.amount && (
              <text x={bbox.x + (IconComponent ? 32 : 8)} y={bbox.y + barHeight / 2 + labelLines.length * 13 + 3} fontFamily="Arial, sans-serif" fontSize={11} fill="#888">
                {item.amount}
              </text>
            )}

            <rect x={bbox.x + labelW} y={bbox.y + 6} width={trackWidth} height={barHeight} rx={4} fill="#f0f0f0" />
            {fillWidth > 0 && (
              <rect x={bbox.x + labelW} y={bbox.y + 6} width={fillWidth} height={barHeight} rx={4} fill={color} />
            )}

            <text x={bbox.x + labelW + trackWidth + 16} y={bbox.y + 6 + barHeight / 2 + 5} fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={color}>
              {Math.round(pct)}%
            </text>

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
