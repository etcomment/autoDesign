import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const CARD_W = 140
const CARD_H = 110
const COLS = 3
const GAP = 16

function isPositive(change: string): boolean {
  return change.startsWith('+')
}

export function Dashboard5Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { metrics } = data
  const W = 600
  const displayed = metrics && metrics.length > 0 ? metrics : [
    { label: 'Views', value: '24k', change: '+12%' },
    { label: 'Clicks', value: '3.4k', change: '+5%' },
    { label: 'CTR', value: '4.1%', change: '-0.2%' },
    { label: 'Leads', value: '180', change: '+18%' },
    { label: 'Deals', value: '42', change: '+8%' },
    { label: 'Revenue', value: '$84k', change: '+15%' },
  ]
  const totalW = COLS * CARD_W + (COLS - 1) * GAP
  const startX = (W - totalW) / 2
  const startY = 40

  return (
    <g ref={svgRef}>
      {displayed.slice(0, 6).map((metric, i) => {
        const elementId = `metric-${i}`
        const col = i % COLS
        const row = Math.floor(i / COLS)
        const px = startX + col * (CARD_W + GAP)
        const py = startY + row * (CARD_H + GAP)
        const color = tplColors[elementId] ?? metric.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!

        const defaultBbox = { x: px, y: py, width: CARD_W, height: CARD_H }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x + 1} y={bbox.y + 1} width={bbox.width} height={bbox.height} rx={6} fill="black" opacity={0.05} />
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill="white" stroke={isSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSelected ? 2 : 1} />
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={4} rx={2} fill={color} />

            <text x={bbox.x + bbox.width / 2} y={bbox.y + 28} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#718096">
              {metric.label.toUpperCase()}
            </text>

            <text x={bbox.x + bbox.width / 2} y={bbox.y + 60} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={24} fontWeight={800} fill="#1a202c">
              {metric.value}
            </text>

            {metric.change && (
              <text x={bbox.x + bbox.width / 2} y={bbox.y + 86} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={isPositive(metric.change) ? '#48bb78' : '#f56565'}>
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

