import { useRef, type ReactElement } from 'react'
import type { AgendaData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6']
const CARD_W = 540
const CARD_H = 74
const GAP = 14

export function Agenda2Template({ data }: { data: AgendaData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { items } = data
  const W = 900
  const startX = (W - CARD_W) / 2
  const startY = 40

  return (
    <g ref={svgRef}>
      {items.map((item, index) => {
        const elementId = `item-${index}`
        const defaultRect = { x: startX, y: startY + index * (CARD_H + GAP), width: CARD_W, height: CARD_H }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }

        const defaultColor = item.color || PALETTE[index % PALETTE.length]!
        const color = tplColors[elementId] ?? defaultColor
        const strokeColor = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : '#e2e8f0')
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = item.icon ? TEMPLATE_ICONS[item.icon] : undefined

        const maxTitleChars = Math.max(8, Math.floor((bbox.width - 140) / 8))
        const titleLines = wrapTextByWidth(item.title, maxTitleChars)
        const descLines = item.description ? wrapTextByWidth(item.description, maxTitleChars) : []

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={12} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
              <rect x={bbox.x} y={bbox.y} width={54} height={bbox.height} rx={12} fill={color} />
              <rect x={bbox.x + 38} y={bbox.y} width={16} height={bbox.height} fill={color} />

              {IconComponent ? (
                <g transform={`translate(${bbox.x + 18}, ${bbox.y + bbox.height / 2 - 9})`}>
                  <IconComponent size={18} color="white" />
                </g>
              ) : (
                <text x={bbox.x + 27} y={bbox.y + bbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={800} fill="white">
                  {item.number || `0${index + 1}`}
                </text>
              )}

              {item.time && (
                <g transform={`translate(${bbox.x + bbox.width - 90}, ${bbox.y + 12})`}>
                  <rect x={0} y={0} width={76} height={20} rx={10} fill="#f1f5f9" />
                  <text x={38} y={14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="#475569">
                    {item.time}
                  </text>
                </g>
              )}

              <text x={bbox.x + 70} y={bbox.y + bbox.height / 2 + (item.description ? -3 : 5) - (titleLines.length > 1 ? 5 : 0)} fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#1a202c">
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={bbox.x + 70} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>

              {item.description && (
                <text x={bbox.x + 70} y={bbox.y + bbox.height / 2 + titleLines.length * 14 + 1} fontFamily="Arial, sans-serif" fontSize={11} fill="#64748b">
                  {descLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={bbox.x + 70} dy={lineIndex === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}