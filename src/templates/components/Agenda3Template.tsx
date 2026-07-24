import { useRef, type ReactElement } from 'react'
import type { AgendaData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4', '#607d8b']

export function Agenda3Template({ data }: { data: AgendaData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, items } = data
  const displayItems = items.slice(0, 4)
  const W = 800
  const H = title ? 520 : 480
  const cardW = 300
  const cardH = 120
  const gap = 24
  const gridX = (W - (cardW * 2 + gap)) / 2
  const topY = title ? 100 : 65

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {displayItems.map((item, i) => {
        const elementId = `item-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const col = i % 2
        const row = Math.floor(i / 2)
        const cx = gridX + col * (cardW + gap)
        const cy = topY + row * (cardH + gap)
        const visualRect = { x: cx, y: cy, width: cardW, height: cardH }

        return (
          <g key={`item-${i}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={cx} y={cy} width={cardW} height={cardH} rx={12} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 2} strokeDasharray={isSelected ? '4 2' : undefined} />
              <rect x={cx} y={cy} width={cardW} height={4} rx={2} fill={color} />

              <circle cx={cx + 36} cy={cy + cardH / 2} r={22} fill={color} />
              <text x={cx + 36} y={cy + cardH / 2 + 7} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
                {item.number}
              </text>

              <text x={cx + 74} y={cy + cardH / 2 - 4} fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="#333">
                {item.title}
              </text>
              {item.subtitle && (
                <text x={cx + 74} y={cy + cardH / 2 + 18} fontFamily="Arial, sans-serif" fontSize={11} fill="#777">
                  {item.subtitle.length > 28 ? item.subtitle.slice(0, 26) + '..' : item.subtitle}
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
