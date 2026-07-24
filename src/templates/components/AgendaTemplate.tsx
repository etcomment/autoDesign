import { useRef, type ReactElement } from 'react'
import type { AgendaData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4', '#607d8b', '#795548']

export function AgendaTemplate({ data }: { data: AgendaData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, items } = data
  const W = 900
  const H = 600

  const startX = 220
  const circleX = 140
  const circleR = 20
  const cardW = 520
  const cardH = 64
  const gap = 28
  const startY = title ? 100 : 70

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {items.map((item, i) => {
        const elementId = `item-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const y = startY + i * (cardH + gap)
        const visualRect = { x: startX, y, width: cardW, height: cardH }

        return (
          <g key={i}>
            {i < items.length - 1 && (
              <line x1={circleX} y1={y + cardH + 4} x2={circleX} y2={y + cardH + gap} stroke="#cbd5e0" strokeWidth={2} />
            )}

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={startX} y={y} width={cardW} height={cardH} rx={10} fill="white" stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 2.5 : 2} />
              <rect x={startX} y={y} width={8} height={cardH} rx={4} fill={color} />

              <circle cx={circleX} cy={y + cardH / 2} r={circleR} fill={color} />
              <text x={circleX} y={y + cardH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                {item.number}
              </text>

              <text
                x={startX + 24}
                y={item.subtitle ? y + cardH / 2 - 4 : y + cardH / 2 + 6}
                fontFamily="Arial, sans-serif"
                fontSize={16}
                fontWeight={600}
                fill="#1a202c"
              >
                {item.title}
              </text>
              {item.subtitle && (
                <text x={startX + 24} y={y + cardH / 2 + 18} fontFamily="Arial, sans-serif" fontSize={12} fill="#718096">
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
