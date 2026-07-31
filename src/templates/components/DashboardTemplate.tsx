import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

function isPositiveChange(change: string): boolean {
  return change.startsWith('+')
}

export function DashboardTemplate({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
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
      {displayed.map((metric, i) => {
        const elementId = `metric-${i}`
        const col = i % cardsPerRow
        const row = Math.floor(i / cardsPerRow)
        const x = startX + col * (cardW + gap)
        const y = startY + row * (cardH + gap)
        const defaultColor = metric.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!

        const color = tplColors[elementId] ?? defaultColor
        const isSelected = selectedIds.has(elementId)
        const defaultBbox = { x, y, width: cardW, height: cardH }

        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const hasChange = metric.change !== undefined

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x + 3} y={bbox.y + 3} width={bbox.width} height={bbox.height} rx={10} fill="black" opacity={0.06} />
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={10} fill="white" stroke={isSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSelected ? 2.5 : 1} />

            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={6} rx={3} fill={color} />

            <text x={bbox.x + bbox.width / 2} y={bbox.y + 36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#718096">
              {metric.label.toUpperCase()}
            </text>

            <text x={bbox.x + bbox.width / 2} y={bbox.y + 78} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={30} fontWeight={800} fill="#1a202c">
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

