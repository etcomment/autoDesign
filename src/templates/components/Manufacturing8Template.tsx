import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6']
const CARD_W = 190
const CARD_H = 150
const GAP = 20

export function Manufacturing8Template({ data }: { data: ManufacturingData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { stations = [] } = data
  const W = 900
  const count = Math.max(1, stations.length)
  const totalW = count * CARD_W + (count - 1) * GAP
  const startX = (W - totalW) / 2
  const startY = 40

  return (
    <g ref={svgRef}>
      {stations.map((station, index) => {
        const elementId = `stage-${index}`
        const defaultRect = { x: startX + index * (CARD_W + GAP), y: startY, width: CARD_W, height: CARD_H }
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

        const maxChars = Math.max(6, Math.floor((bbox.width - 20) / 8))
        const nameLines = wrapTextByWidth(station.title, maxChars)
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
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={6} rx={3} fill={color} />

              <circle cx={bbox.x + 24} cy={bbox.y + 30} r={14} fill={color} opacity={0.15} />
              {IconComponent ? (
                <g transform={`translate(${bbox.x + 16}, ${bbox.y + 22})`}>
                  <IconComponent size={16} color={color} />
                </g>
              ) : (
                <text x={bbox.x + 24} y={bbox.y + 35} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill={color}>
                  {index + 1}
                </text>
              )}

              {station.value && (
                <g transform={`translate(${bbox.x + bbox.width - 70}, ${bbox.y + 20})`}>
                  <rect x={0} y={0} width={58} height={18} rx={9} fill={station.isQuality ? '#dcfce7' : '#fee2e2'} />
                  <text x={29} y={13} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fontWeight={700} fill={station.isQuality ? '#166534' : '#991b1b'}>
                    {station.value}
                  </text>
                </g>
              )}

              <text x={bbox.x + 16} y={bbox.y + 70} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#1a202c">
                {nameLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={bbox.x + 16} dy={lineIndex === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>

              {station.subtitle && (
                <text x={bbox.x + 16} y={bbox.y + 70 + nameLines.length * 13 + 4} fontFamily="Arial, sans-serif" fontSize={10} fill="#64748b">
                  {descLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={bbox.x + 16} dy={lineIndex === 0 ? 0 : 11}>
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
