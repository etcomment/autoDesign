import { useRef, type ReactElement } from 'react'
import type { AgendaData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6']
const CARD_W = 560
const CARD_H = 68
const GAP = 16

export function AgendaTemplate({ data }: { data: AgendaData }): ReactElement {
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
  const startX = (W - CARD_W) / 2
  const startY = 40

  const getBbox = (i: number) => {
    const elementId = `item-${i}`
    const defaultRect = { x: startX, y: startY + i * (CARD_H + GAP), width: CARD_W, height: CARD_H }
    const customPos = positions[elementId]
    return {
      x: customPos ? customPos.x : defaultRect.x,
      y: customPos ? customPos.y : defaultRect.y,
      width: customPos?.width || defaultRect.width,
      height: customPos?.height || defaultRect.height,
    }
  }

  return (
    <g ref={svgRef}>
      {items.map((_, index) => {
        if (index >= count - 1) return null
        const bbox1 = getBbox(index)
        const bbox2 = getBbox(index + 1)
        const cx = bbox1.x + 36
        const y1 = bbox1.y + bbox1.height
        const y2 = bbox2.y

        return (
          <line
            key={`conn-${index}`}
            x1={cx}
            y1={y1}
            x2={cx}
            y2={y2}
            stroke="#cbd5e0"
            strokeWidth={2}
            strokeDasharray="4 4"
          />
        )
      })}

      {items.map((item, index) => {
        const elementId = `item-${index}`
        const bbox = getBbox(index)
        const defaultColor = item.color || PALETTE[index % PALETTE.length]!
        const color = tplColors[elementId] ?? defaultColor
        const strokeColor = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : '#e2e8f0')
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = item.icon ? TEMPLATE_ICONS[item.icon] : undefined

        const maxTitleChars = Math.max(8, Math.floor((bbox.width - 120) / 8))
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
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={10} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
              <rect x={bbox.x} y={bbox.y} width={6} height={bbox.height} rx={3} fill={color} />

              <circle cx={bbox.x + 36} cy={bbox.y + bbox.height / 2} r={18} fill={color} />
              {IconComponent ? (
                <g transform={`translate(${bbox.x + 27}, ${bbox.y + bbox.height / 2 - 9})`}>
                  <IconComponent size={18} color="white" />
                </g>
              ) : (
                <text x={bbox.x + 36} y={bbox.y + bbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                  {item.number || index + 1}
                </text>
              )}

              {item.time && (
                <text x={bbox.x + bbox.width - 16} y={bbox.y + 24} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                  {item.time}
                </text>
              )}

              <text x={bbox.x + 72} y={bbox.y + bbox.height / 2 + (item.description ? -3 : 5) - (titleLines.length > 1 ? 5 : 0)} fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#1a202c">
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={bbox.x + 72} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>

              {item.description && (
                <text x={bbox.x + 72} y={bbox.y + bbox.height / 2 + nameLinesLength(titleLines) + 1} fontFamily="Arial, sans-serif" fontSize={11} fill="#64748b">
                  {descLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={bbox.x + 72} dy={lineIndex === 0 ? 0 : 12}>
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

function nameLinesLength(lines: string[]): number {
  return lines.length * 14
}