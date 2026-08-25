import { useRef, type ReactElement } from 'react'
import type { AgendaData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6']
const CARD_W = 180
const CARD_H = 200
const GAP = 18

export function Agenda3Template({ data }: { data: AgendaData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { items } = data
  const W = 900
  const count = Math.max(1, items.length)
  const totalW = count * CARD_W + (count - 1) * GAP
  const startX = (W - totalW) / 2
  const startY = 40

  return (
    <g ref={svgRef}>
      {items.map((item, index) => {
        const elementId = `item-${index}`
        const defaultRect = { x: startX + index * (CARD_W + GAP), y: startY, width: CARD_W, height: CARD_H }
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

        const centerCx = bbox.x + bbox.width / 2
        const maxTitleChars = Math.max(6, Math.floor((bbox.width - 20) / 8))
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
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={6} rx={3} fill={color} />

              <circle cx={centerCx} cy={bbox.y + 40} r={22} fill={color} opacity={0.15} />
              <circle cx={centerCx} cy={bbox.y + 40} r={18} fill={color} />
              {IconComponent ? (
                <g transform={`translate(${centerCx - 9}, ${bbox.y + 31})`}>
                  <IconComponent size={18} color="white" />
                </g>
              ) : (
                <text x={centerCx} y={bbox.y + 46} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={800} fill="white">
                  {item.number || `0${index + 1}`}
                </text>
              )}

              {item.time && (
                <text x={centerCx} y={bbox.y + 78} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                  {item.time}
                </text>
              )}

              <text x={centerCx} y={bbox.y + 104} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#1a202c">
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={centerCx} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>

              {item.description && (
                <text x={centerCx} y={bbox.y + 104 + titleLines.length * 14 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#64748b">
                  {descLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={centerCx} dy={lineIndex === 0 ? 0 : 12}>
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