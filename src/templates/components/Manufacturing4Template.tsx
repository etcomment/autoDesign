import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6']
const CARD_W = 190
const CARD_H = 140
const GAP = 20

export function Manufacturing4Template({ data }: { data: ManufacturingData }): ReactElement {
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
        const elementId = `station-${index}`
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

        const centerCx = bbox.x + bbox.width / 2
        const maxChars = Math.max(6, Math.floor((bbox.width - 30) / 8))
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
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={38} rx={12} fill={color} />
              <rect x={bbox.x} y={bbox.y + 24} width={bbox.width} height={14} fill={color} />

              {IconComponent ? (
                <g transform={`translate(${bbox.x + 12}, ${bbox.y + 10})`}>
                  <IconComponent size={18} color="white" />
                </g>
              ) : (
                <circle cx={bbox.x + 22} cy={bbox.y + 19} r={10} fill="rgba(255,255,255,0.25)" />
              )}
              {!IconComponent && (
                <text x={bbox.x + 22} y={bbox.y + 23} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                  {index + 1}
                </text>
              )}

              <text x={centerCx} y={bbox.y + 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {titleLines[0] || ''}
              </text>

              {station.value && (
                <g transform={`translate(${centerCx - 36}, ${bbox.y + 48})`}>
                  <rect x={0} y={0} width={72} height={18} rx={9} fill={station.isQuality ? '#dcfce7' : '#fee2e2'} />
                  <text x={36} y={13} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={station.isQuality ? '#166534' : '#991b1b'}>
                    {station.value}
                  </text>
                </g>
              )}

              {station.subtitle && (
                <text x={centerCx} y={bbox.y + 88} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="#64748b">
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
