import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#7b68ee', '#e91e63', '#4caf50']
const BAR_W = 460
const BAR_H = 52
const ARROW_H = 16

export function Funnel5Template({ data }: { data: FunnelData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, levels } = data
  const W = 900
  const count = levels.length
  const gap = 20
  const totalH = count * BAR_H + (count - 1) * (ARROW_H + gap) + 140
  const H = Math.max(600, totalH + 60)
  const cx = W / 2
  const startX = (W - BAR_W) / 2
  const startY = title ? 100 : 70

  const percentages = levels.map((_, i) => 100 - ((100 - 20) / (count - 1 || 1)) * i)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={cx} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {levels.map((level, i) => {
        const pct = percentages[i]!
        const y = startY + i * (BAR_H + ARROW_H + gap)
        const elementId = `level-${i}`
        const color = tplColors[elementId] ?? level.color ?? PALETTE[i % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: startX, y, width: BAR_W, height: BAR_H }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>

              <rect x={startX} y={y} width={BAR_W} height={BAR_H} rx={6} fill={color} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 2.5 : 1.5} opacity={0.9} />

              <text x={startX + 20} y={y + BAR_H / 2 + 5} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                {level.title}
              </text>
              {level.subtitle && (
                <text x={startX + 20} y={y + BAR_H / 2 + 22} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.85)">
                  {level.subtitle}
                </text>
              )}

              <text x={startX + BAR_W - 20} y={y + BAR_H / 2 + 5} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={800} fill="white">
                {Math.round(pct)}%
              </text>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {i < count - 1 && (
              <polygon
                points={`${cx - 12},${y + BAR_H} ${cx + 12},${y + BAR_H} ${cx},${y + BAR_H + ARROW_H}`}
                fill={color}
                opacity={0.5}
              />
            )}
          </g>
        )
      })}
    </g>
  )
}
