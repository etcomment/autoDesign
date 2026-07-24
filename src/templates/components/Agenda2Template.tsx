import { useRef, type ReactElement } from 'react'
import type { AgendaData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4']

export function Agenda2Template({ data }: { data: AgendaData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, items } = data
  const W = 960
  const H = 380
  const cardW = 180
  const cardH = 90
  const gap = 24
  const displayItems = items.slice(0, 4)
  const totalW = displayItems.length * cardW + (displayItems.length - 1) * gap
  const startX = (W - totalW) / 2
  const cardY = title ? 130 : 90
  const circleR = 20
  const lineY = cardY + cardH / 2

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <line x1={startX + circleR} y1={lineY} x2={startX + totalW - circleR} y2={lineY} stroke="#cbd5e0" strokeWidth={2} />

      {displayItems.map((item, i) => {
        const elementId = `item-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const cx = startX + i * (cardW + gap)
        const visualRect = { x: cx, y: cardY, width: cardW, height: cardH }

        return (
          <g key={`item-${i}`}>
            <circle cx={cx + cardW / 2} cy={lineY} r={circleR} fill={color} />
            <text x={cx + cardW / 2} y={lineY + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
              {item.number}
            </text>

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={cx} y={cardY} width={cardW} height={cardH} rx={10} fill="white" stroke={isSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSelected ? 2.5 : 1.5} />
              <text x={cx + cardW / 2} y={cardY + 36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={color}>
                {item.title}
              </text>
              {item.subtitle && (
                <text x={cx + cardW / 2} y={cardY + 60} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#777">
                  {item.subtitle.length > 24 ? item.subtitle.slice(0, 22) + '..' : item.subtitle}
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
