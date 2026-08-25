import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

function isPositive(change: string): boolean {
  return change.startsWith('+')
}

export function Dashboard5Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { metrics } = data
  const W = 800
  const displayed = metrics && metrics.length > 0 ? metrics : [
    { label: 'Views', value: '24k', change: '+12%' },
    { label: 'Clicks', value: '3.4k', change: '+5%' },
    { label: 'CTR', value: '4.1%', change: '-0.2%' },
    { label: 'Leads', value: '180', change: '+18%' },
    { label: 'Deals', value: '42', change: '+8%' },
    { label: 'Revenue', value: '$84k', change: '+15%' },
  ]

  const count = displayed.length
  const cols = count <= 4 ? count : count <= 6 ? 3 : 4
  const cardW = Math.min(180, (W - 80 - (cols - 1) * 16) / cols)
  const cardH = 110
  const gap = 16
  const totalW = cols * cardW + (cols - 1) * gap
  const startX = (W - totalW) / 2
  const startY = 40

  return (
    <g ref={svgRef}>
      {displayed.map((metric, index) => {
        const elementId = `metric-${index}`
        const col = index % cols
        const row = Math.floor(index / cols)
        const px = startX + col * (cardW + gap)
        const py = startY + row * (cardH + gap)
        const color = tplColors[elementId] ?? metric.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!

        const defaultBbox = { x: px, y: py, width: cardW, height: cardH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : '#e2e8f0')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 1)
        const IconComponent = metric.icon ? TEMPLATE_ICONS[metric.icon] : undefined
        const maxChars = Math.max(8, Math.floor(bbox.width / 7))
        const labelLines = wrapTextByWidth(metric.label.toUpperCase(), maxChars)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x + 1} y={bbox.y + 1} width={bbox.width} height={bbox.height} rx={6} fill="black" opacity={0.05} />
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={4} rx={2} fill={color} />

            {IconComponent && (
              <g transform={`translate(${bbox.x + 8}, ${bbox.y + 8})`}>
                <IconComponent size={14} color={color} />
              </g>
            )}

            <text x={bbox.x + bbox.width / 2 + (IconComponent ? 6 : 0)} y={bbox.y + 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#718096">
              {labelLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + bbox.width / 2 + (IconComponent ? 6 : 0)} dy={lineIndex === 0 ? 0 : 11}>
                  {line}
                </tspan>
              ))}
            </text>

            <text x={bbox.x + bbox.width / 2} y={bbox.y + 64} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={24} fontWeight={800} fill="#1a202c">
              {metric.value}
            </text>

            {metric.change && (
              <text x={bbox.x + bbox.width / 2} y={bbox.y + 90} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={isPositive(metric.change) ? '#48bb78' : '#f56565'}>
                {metric.change}
              </text>
            )}

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
