import { useRef, type ReactElement } from 'react'
import type { AgendaData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4']

export function Agenda4Template({ data }: { data: AgendaData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, items } = data
  const W = 700
  const H = 540
  const cardW = 420
  const cardH = 70
  const offsetX = 30
  const offsetY = 16
  const headerH = 28
  const displayItems = items.slice(0, 4)
  const topY = title ? 110 : 70

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
        const stackIndex = displayItems.length - 1 - i
        const cx = (W - cardW) / 2 + stackIndex * offsetX
        const cy = topY + stackIndex * offsetY
        const visualRect = { x: cx, y: cy, width: cardW, height: cardH }

        return (
          <g key={`item-${i}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={cx + 3} y={cy + 3} width={cardW} height={cardH} rx={10} fill="#000" opacity={0.06} />
              <rect x={cx} y={cy} width={cardW} height={cardH} rx={10} fill="white" stroke={isSelected ? '#4a90d9' : '#cbd5e0'} strokeWidth={isSelected ? 2.5 : 1.5} />

              <rect x={cx} y={cy} width={cardW} height={headerH} rx={10} fill={color} />
              <rect y={cy + headerH - 10} width={cardW} height={10} fill={color} />

              <text x={cx + 28} y={cy + headerH / 2 + 5} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {item.number}
              </text>

              <text x={cx + 28} y={cy + headerH + 28} fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="#333">
                {item.title}
              </text>

              {item.subtitle && (
                <text x={cx + 28} y={cy + cardH - 12} fontFamily="Arial, sans-serif" fontSize={11} fill="#777">
                  {item.subtitle}
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
