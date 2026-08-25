import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

function isPositiveChange(change: string): boolean {
  return change.startsWith('+')
}

export function DashboardTemplate({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { metrics } = data
  const W = 900
  const displayed = metrics && metrics.length > 0 ? metrics : [
    { label: 'Revenue', value: '$120k', change: '+12%' },
    { label: 'Users', value: '4.5k', change: '+8%' },
    { label: 'Conversion', value: '3.2%', change: '-1.5%' },
    { label: 'Bounce Rate', value: '42%', change: '-4%' },
  ]

  const count = displayed.length
  const cardsPerRow = count <= 4 ? count : Math.ceil(count / 2)
  const cardW = Math.min(248, (W - 80 - (cardsPerRow - 1) * 20) / cardsPerRow)
  const cardH = 140
  const gap = 20
  const totalW = cardsPerRow * cardW + (cardsPerRow - 1) * gap
  const startX = Math.max(40, (W - totalW) / 2)
  const startY = 50

  return (
    <g ref={svgRef}>
      {displayed.map((metric, index) => {
        const elementId = `metric-${index}`
        const col = index % cardsPerRow
        const row = Math.floor(index / cardsPerRow)
        const x = startX + col * (cardW + gap)
        const y = startY + row * (cardH + gap)
        const defaultColor = metric.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!

        const color = tplColors[elementId] ?? defaultColor
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : '#e2e8f0')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 1)
        const defaultBbox = { x, y, width: cardW, height: cardH }

        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const hasChange = metric.change !== undefined
        const IconComponent = metric.icon ? TEMPLATE_ICONS[metric.icon] : undefined
        const maxChars = Math.max(10, Math.floor(bbox.width / 8))
        const labelLines = wrapTextByWidth(metric.label.toUpperCase(), maxChars)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x + 3} y={bbox.y + 3} width={bbox.width} height={bbox.height} rx={10} fill="black" opacity={0.06} />
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={10} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={6} rx={3} fill={color} />

            {IconComponent && (
              <g transform={`translate(${bbox.x + 16}, ${bbox.y + 16})`}>
                <IconComponent size={18} color={color} />
              </g>
            )}

            <text x={bbox.x + bbox.width / 2 + (IconComponent ? 8 : 0)} y={bbox.y + 30} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#718096">
              {labelLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + bbox.width / 2 + (IconComponent ? 8 : 0)} dy={lineIndex === 0 ? 0 : 12}>
                  {line}
                </tspan>
              ))}
            </text>

            <text x={bbox.x + bbox.width / 2} y={bbox.y + 78} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={28} fontWeight={800} fill="#1a202c">
              {metric.value}
            </text>

            {hasChange && (
              <g transform={`translate(${bbox.x + bbox.width / 2}, ${bbox.y + 112})`}>
                {isPositiveChange(metric.change!) ? (
                  <path d="M -6 4 L 0 -6 L 6 4 Z" fill="#48bb78" />
                ) : (
                  <path d="M -6 -4 L 0 6 L 6 -4 Z" fill="#f56565" />
                )}
                <text x={14} y={3} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill={isPositiveChange(metric.change!) ? '#48bb78' : '#f56565'}>
                  {metric.change}
                </text>
              </g>
            )}

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
