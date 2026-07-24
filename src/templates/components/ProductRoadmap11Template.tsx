import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { Arrow } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const CARD_W = 240
const CARD_H = 72
const HEADER_H = 28

export function ProductRoadmap11Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, milestones } = data
  const count = Math.min(milestones.length, 5)
  const W = (count * CARD_W + (count - 1) * 40) + 80
  const H = title ? CARD_H + 160 : CARD_H + 120
  const startX = 40
  const cardY = title ? 90 : 50

  return (
    <g ref={svgRef}>
      <rect width={Math.max(W, 960)} height={Math.max(H, 350)} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {milestones.slice(0, 5).map((m, mi) => {
        const elementId = `card-${mi}`
        const color = tplColors[elementId] ?? PALETTE[mi % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const cx = startX + mi * (CARD_W + 40)
        const visualRect = { x: cx, y: cardY, width: CARD_W, height: CARD_H }

        return (
          <g key={`card-${mi}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={cx} y={cardY} width={CARD_W} height={CARD_H} rx={10} fill="white" stroke={isSelected ? '#4a90d9' : '#cbd5e0'} strokeWidth={isSelected ? 2.5 : 1.5} />
              <rect x={cx} y={cardY} width={CARD_W} height={HEADER_H} rx={10} fill={color} />
              <rect y={cardY + HEADER_H - 10} width={CARD_W} height={10} fill={color} />
              <text x={cx + CARD_W / 2} y={cardY + HEADER_H / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {m.title}
              </text>
              {m.subtitle && (
                <text x={cx + CARD_W / 2} y={cardY + HEADER_H + 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#555">
                  {m.subtitle.length > 36 ? m.subtitle.slice(0, 34) + '..' : m.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {mi < Math.min(milestones.length, 5) - 1 && (
              <Arrow
                from={{ x: cx + CARD_W + 4, y: cardY + CARD_H / 2 }}
                to={{ x: cx + CARD_W + 36, y: cardY + CARD_H / 2 }}
                color={color}
              />
            )}
          </g>
        )
      })}
    </g>
  )
}
