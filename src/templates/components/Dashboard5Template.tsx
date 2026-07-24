import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4']
const CARD_W = 130
const CARD_H = 110
const COLS = 3
const GAP = 16

function isPositive(change: string): boolean {
  return change.startsWith('+')
}

export function Dashboard5Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, metrics } = data
  const W = 600
  const H = 460
  const displayed = metrics.slice(0, 6)
  const cx = W / 2
  const totalW = COLS * CARD_W + (COLS - 1) * GAP
  const startX = (W - totalW) / 2
  const startY = title ? 90 : 60

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="#f7fafc" rx={8} />
      {title && (
        <text x={cx} y={44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {displayed.map((metric, i) => {
        const col = i % COLS
        const row = Math.floor(i / COLS)
        const px = startX + col * (CARD_W + GAP)
        const py = startY + row * (CARD_H + GAP)
        const color = tplColors[`metric-${i}`] ?? metric.color ?? PALETTE[i % PALETTE.length]!
        const elementId = `metric-${i}`
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: px, y: py, width: CARD_W, height: CARD_H }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={px + 1} y={py + 1} width={CARD_W} height={CARD_H} rx={6} fill="black" opacity={0.06} />
              <rect x={px} y={py} width={CARD_W} height={CARD_H} rx={6} fill="white" stroke={isSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSelected ? 2 : 1} />
              <rect x={px} y={py} width={CARD_W} height={4} rx={2} fill={color} />

              <text x={px + CARD_W / 2} y={py + 28} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#718096">
                {metric.label.toUpperCase()}
              </text>

              <text x={px + CARD_W / 2} y={py + 60} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={24} fontWeight={800} fill="#1a202c">
                {metric.value}
              </text>

              {metric.change && (
                <text x={px + CARD_W / 2} y={py + 86} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={isPositive(metric.change) ? '#48bb78' : '#f56565'}>
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
