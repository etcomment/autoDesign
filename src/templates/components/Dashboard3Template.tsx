import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4']
const BAR_W = 600
const BAR_H = 50
const GAP = 16

function parseValue(val: string): number {
  const num = parseFloat(val.replace(/[^0-9.]/g, ''))
  return isNaN(num) ? 0 : num
}

export function Dashboard3Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, metrics } = data
  const displayed = metrics.slice(0, 6)
  const count = displayed.length
  const totalH = count * BAR_H + (count - 1) * GAP
  const startY = (600 - totalH) / 2 + 30
  const startX = (900 - BAR_W) / 2
  const cx = 900 / 2

  const values = displayed.map(m => parseValue(m.value))
  const maxVal = Math.max(...values, 1)

  return (
    <g ref={svgRef}>
      <rect width={900} height={600} fill="#f7fafc" rx={8} />
      {title && (
        <text x={cx} y={44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {displayed.map((metric, i) => {
        const y = startY + i * (BAR_H + GAP)
        const val = values[i]!
        const fillW = (val / maxVal) * BAR_W
        const color = tplColors[`metric-${i}`] ?? metric.color ?? PALETTE[i % PALETTE.length]!
        const elementId = `metric-${i}`
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: startX, y, width: BAR_W, height: BAR_H }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={startX} y={y + 2} width={BAR_W} height={BAR_H - 2} rx={6} fill="#edf2f7" />
              <rect x={startX} y={y + 2} width={isSelected ? BAR_W : fillW} height={BAR_H - 2} rx={6} fill={isSelected ? '#4a90d9' : color} opacity={isSelected ? 0.3 : 0.85} />
              {isSelected && (
                <rect x={startX} y={y + 2} width={fillW} height={BAR_H - 2} rx={6} fill={color} opacity={0.85} />
              )}

              <text x={startX - 12} y={y + BAR_H / 2 + 5} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={600} fill="#1a202c">
                {metric.label}
              </text>

              <text x={startX + BAR_W + 12} y={y + BAR_H / 2 + 5} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={800} fill={color}>
                {metric.value}
              </text>

              {metric.change && (
                <text x={startX + BAR_W + 12} y={y + BAR_H / 2 + 22} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={metric.change.startsWith('+') ? '#48bb78' : '#f56565'}>
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
