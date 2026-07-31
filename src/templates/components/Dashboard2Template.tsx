import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

function isPositive(change: string): boolean {
  return change.startsWith('+')
}

export function Dashboard2Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { metrics } = data
  const W = 900
  const displayed = metrics && metrics.length > 0 ? metrics : [
    { label: 'Total Revenue', value: '$420,000', change: '+18.4%' },
    { label: 'Subscribers', value: '12.4k', change: '+5%' },
    { label: 'Active Sessions', value: '3,820', change: '+14%' },
    { label: 'Conversion Rate', value: '4.8%', change: '-0.3%' },
  ]

  const bigW = 340
  const bigH = 180
  const smallW = 220
  const smallH = 120
  const gap = 20
  const cx = W / 2

  const mainMetric = displayed[0]
  const subMetrics = displayed.slice(1)

  return (
    <g ref={svgRef}>
      {/* Main Feature Metric */}
      {mainMetric && (() => {
        const elementId = 'metric-0'
        const defaultBbox = { x: (W - bigW) / 2, y: 40, width: bigW, height: bigH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const color = tplColors[elementId] ?? mainMetric.color ?? MIGSO_PALETTE[0]!

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x + 3} y={bbox.y + 3} width={bbox.width} height={bbox.height} rx={12} fill="black" opacity={0.06} />
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={12} fill="white" stroke={isSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSelected ? 2.5 : 1} />
            <rect x={bbox.x} y={bbox.y} width={6} height={bbox.height} rx={3} fill={color} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + 40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#718096">
              {mainMetric.label.toUpperCase()}
            </text>
            <text x={bbox.x + bbox.width / 2} y={bbox.y + 98} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={42} fontWeight={800} fill="#1a202c">
              {mainMetric.value}
            </text>
            {mainMetric.change && (
              <text x={bbox.x + bbox.width / 2} y={bbox.y + 138} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill={isPositive(mainMetric.change) ? '#48bb78' : '#f56565'}>
                {mainMetric.change}
              </text>
            )}
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })()}

      {/* Secondary Metrics Row */}
      {subMetrics.map((metric, i) => {
        const idx = i + 1
        const count = subMetrics.length
        const totalSmall = count * smallW + (count - 1) * gap
        const startX = (W - totalSmall) / 2
        const px = startX + i * (smallW + gap)
        const py = 250
        const elementId = `metric-${idx}`
        const color = tplColors[elementId] ?? metric.color ?? MIGSO_PALETTE[idx % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const defaultBbox = { x: px, y: py, width: smallW, height: smallH }

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
            <rect x={bbox.x + 2} y={bbox.y + 2} width={bbox.width} height={bbox.height} rx={8} fill="black" opacity={0.05} />
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSelected ? 2.5 : 1} />
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={5} rx={2.5} fill={color} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + 36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#718096">
              {metric.label.toUpperCase()}
            </text>
            <text x={bbox.x + bbox.width / 2} y={bbox.y + 72} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={26} fontWeight={800} fill="#1a202c">
              {metric.value}
            </text>
            {metric.change && (
              <text x={bbox.x + bbox.width / 2} y={bbox.y + 98} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill={isPositive(metric.change) ? '#48bb78' : '#f56565'}>
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

