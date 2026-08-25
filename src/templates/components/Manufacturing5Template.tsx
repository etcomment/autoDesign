import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6']
const CARD_W = 240
const CARD_H = 130
const GAP_X = 24
const GAP_Y = 20

export function Manufacturing5Template({ data }: { data: ManufacturingData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { stations = [] } = data
  const W = 700
  const cols = 2
  const startX = (W - (cols * CARD_W + (cols - 1) * GAP_X)) / 2
  const startY = 40

  return (
    <g ref={svgRef}>
      {stations.map((station, index) => {
        const row = Math.floor(index / cols)
        const col = index % cols
        const x = startX + col * (CARD_W + GAP_X)
        const y = startY + row * (CARD_H + GAP_Y)
        const defaultRect = { x, y, width: CARD_W, height: CARD_H }

        const elementId = `station-${index}`
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }

        const defaultColor = station.color || PALETTE[index % PALETTE.length]!
        const color = tplColors[elementId] ?? defaultColor
        const strokeColor = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : '#e2e8f0')
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = station.icon ? TEMPLATE_ICONS[station.icon] : undefined

        const maxChars = Math.max(8, Math.floor((bbox.width - 70) / 8))
        const titleLines = wrapTextByWidth(station.title, maxChars)
        const descLines = station.subtitle ? wrapTextByWidth(station.subtitle, maxChars) : []

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={12} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
              <rect x={bbox.x} y={bbox.y} width={8} height={bbox.height} rx={4} fill={color} />

              <circle cx={bbox.x + 36} cy={bbox.y + 36} r={18} fill={color} />
              {IconComponent ? (
                <g transform={`translate(${bbox.x + 27}, ${bbox.y + 27})`}>
                  <IconComponent size={18} color="white" />
                </g>
              ) : (
                <text x={bbox.x + 36} y={bbox.y + 42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                  {index + 1}
                </text>
              )}

              <text x={bbox.x + 68} y={bbox.y + 36} fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#1a202c">
                {titleLines[0] || ''}
              </text>

              {station.subtitle && (
                <text x={bbox.x + 68} y={bbox.y + 64} fontFamily="Arial, sans-serif" fontSize={11} fill="#64748b">
                  {descLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={bbox.x + 68} dy={lineIndex === 0 ? 0 : 13}>
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
