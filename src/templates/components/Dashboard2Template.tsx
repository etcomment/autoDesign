import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4']

function isPositive(change: string): boolean {
  return change.startsWith('+')
}

export function Dashboard2Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, metrics } = data
  const W = 900
  const H = 600
  const displayed = metrics.slice(0, 4)
  const bigW = 340
  const bigH = 200
  const smallW = 240
  const smallH = 130
  const gap = 20
  const cx = W / 2

  const mainMetric = displayed[0]
  const subMetrics = displayed.slice(1)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="#f7fafc" rx={8} />
      {title && (
        <text x={cx} y={44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {mainMetric && (
        <g>
          <g onMouseDown={e => startDrag(e, 'metric-0', { x: (W - bigW) / 2, y: 80, width: bigW, height: bigH })} style={{ cursor: 'pointer' }}>
            <rect x={(W - bigW) / 2 + 3} y={83} width={bigW} height={bigH} rx={12} fill="black" opacity={0.08} />
            <rect x={(W - bigW) / 2} y={80} width={bigW} height={bigH} rx={12} fill="white" stroke={selectedIds.has('metric-0') ? '#4a90d9' : '#e2e8f0'} strokeWidth={selectedIds.has('metric-0') ? 2.5 : 1} />
            <rect x={(W - bigW) / 2} y={80} width={6} height={bigH} rx={3} fill={tplColors['metric-0'] ?? mainMetric.color ?? PALETTE[0]!} />
            <text x={cx + 20} y={132} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={600} fill="#718096">
              {mainMetric.label.toUpperCase()}
            </text>
            <text x={cx + 20} y={190} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={48} fontWeight={800} fill="#1a202c">
              {mainMetric.value}
            </text>
            {mainMetric.change && (
              <text x={cx + 20} y={230} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill={isPositive(mainMetric.change) ? '#48bb78' : '#f56565'}>
                {mainMetric.change}
              </text>
            )}
            {selectedIds.has('metric-0') && renderHandles({ x: (W - bigW) / 2, y: 80, width: bigW, height: bigH }, 'metric-0')}
          </g>
        </g>
      )}

      {subMetrics.map((metric, i) => {
        const idx = i + 1
        const totalSmall = subMetrics.length * smallW + (subMetrics.length - 1) * gap
        const startX = (W - totalSmall) / 2
        const px = startX + i * (smallW + gap)
        const py = 310
        const elementId = `metric-${idx}`
        const color = tplColors[elementId] ?? metric.color ?? PALETTE[idx % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: px, y: py, width: smallW, height: smallH }

        return (
          <g key={idx}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={px + 2} y={py + 2} width={smallW} height={smallH} rx={8} fill="black" opacity={0.06} />
              <rect x={px} y={py} width={smallW} height={smallH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSelected ? 2.5 : 1} />
              <rect x={px} y={py} width={smallW} height={5} rx={2.5} fill={color} />
              <text x={px + smallW / 2} y={py + 40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#718096">
                {metric.label.toUpperCase()}
              </text>
              <text x={px + smallW / 2} y={py + 78} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={28} fontWeight={800} fill="#1a202c">
                {metric.value}
              </text>
              {metric.change && (
                <text x={px + smallW / 2} y={py + 104} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={isPositive(metric.change) ? '#48bb78' : '#f56565'}>
                  {metric.change}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
