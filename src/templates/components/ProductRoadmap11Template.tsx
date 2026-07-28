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
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones } = data
  const count = Math.min(milestones.length, 5)
  const W = (count * CARD_W + (count - 1) * 40) + 80
  const H = title ? CARD_H + 160 : CARD_H + 120
  const startX = 40
  const cardY = title ? 90 : 50

  return (
    <g ref={svgRef}>
      <rect width={Math.max(W, 960)} height={Math.max(H, 350)} fill="white" rx={8} />
      {(() => {
        const r = pos['main-title'] ?? { x: W / 2 - 250, y: 15, width: 500, height: 35 }
        const fill = tplColors['main-title'] ?? '#1e3a5f'
        const stroke = tplStrokeColors['main-title']
        const sW = tplStrokeWidths['main-title'] ?? 1
        return title ? (
          <g onMouseDown={e => startDrag(e, 'main-title', r)} style={{ cursor: 'pointer' }}>
            {title.split('\n').map((line, i) => (
              <text key={i} x={r.x + r.width / 2} y={r.y + 24 + i * 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill={fill} stroke={stroke} strokeWidth={stroke ? sW : undefined}>
                {line}
              </text>
            ))}
            {selectedIds.has('main-title') && renderHandles(r, 'main-title')}
          </g>
        ) : null
      })()}

      {milestones.slice(0, 5).map((m, mi) => {
        const elementId = `card-${mi}`
        const color = tplColors[elementId] ?? m.style?.fill ?? PALETTE[mi % PALETTE.length]!
        const customStroke = tplStrokeColors[elementId]
        const customStrokeWidth = tplStrokeWidths[elementId] ?? 1.5
        const styleStroke = m.style?.stroke
        const isSelected = selectedIds.has(elementId)
        const cx = startX + mi * (CARD_W + 40)
        const defaultMRect = { x: cx, y: cardY, width: m.style?.boxWidth ?? CARD_W, height: m.style?.boxHeight ?? CARD_H }
        const visualRect = pos[elementId] ?? defaultMRect
        const styleFontSize = m.style?.fontSize ?? 13
        const styleFontWeight = m.style?.fontWeight ?? 700
        const styleFontColor = m.style?.fontColor ?? 'white'

        return (
          <g key={`card-${mi}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={visualRect.x} y={visualRect.y} width={visualRect.width} height={visualRect.height} rx={10} fill="white" stroke={customStroke || (isSelected ? '#4a90d9' : (styleStroke || '#cbd5e0'))} strokeWidth={isSelected ? 2.5 : customStrokeWidth} />
              <rect x={visualRect.x} y={visualRect.y} width={visualRect.width} height={HEADER_H} rx={10} fill={color} />
              <rect x={visualRect.x} y={visualRect.y + HEADER_H - 10} width={visualRect.width} height={10} fill={color} />
              <text x={visualRect.x + visualRect.width / 2} y={visualRect.y + HEADER_H / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>
                {m.title}
              </text>
              {m.subtitle && (
                <text x={visualRect.x + visualRect.width / 2} y={visualRect.y + HEADER_H + 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#555">
                  {m.subtitle.length > 36 ? m.subtitle.slice(0, 34) + '..' : m.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {mi < Math.min(milestones.length, 5) - 1 && (
              <Arrow
                from={{ x: visualRect.x + visualRect.width + 4, y: visualRect.y + visualRect.height / 2 }}
                to={{ x: startX + (mi + 1) * (CARD_W + 40) - 4, y: cardY + CARD_H / 2 }}
                color={tplColors[`arrow-${mi}`] ?? color}
              />
            )}
          </g>
        )
      })}
    </g>
  )
}
