import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6']
const CARD_W = 160
const CARD_H = 120
const GAP = 28

export function Manufacturing2Template({ data }: { data: ManufacturingData }): ReactElement {
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
  const startY = 50

  const getBbox = (i: number) => {
    const elementId = `station-${i}`
    const defaultRect = { x: startX + i * (CARD_W + GAP), y: startY, width: CARD_W, height: CARD_H }
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
      {stations.map((_, index) => {
        if (index >= count - 1) return null
        const bbox1 = getBbox(index)
        const bbox2 = getBbox(index + 1)
        const x1 = bbox1.x + bbox1.width
        const y1 = bbox1.y + bbox1.height / 2
        const x2 = bbox2.x
        const y2 = bbox2.y + bbox2.height / 2

        return (
          <g key={`arrow-${index}`}>
            <line x1={x1 + 4} y1={y1} x2={x2 - 12} y2={y2} stroke="#94a3b8" strokeWidth={2} />
            <polygon points={`${x2 - 12},${y2 - 5} ${x2 - 2},${y2} ${x2 - 12},${y2 + 5}`} fill="#94a3b8" />
          </g>
        )
      })}

      {stations.map((station, index) => {
        const elementId = `station-${index}`
        const bbox = getBbox(index)
        const defaultColor = station.color || PALETTE[index % PALETTE.length]!
        const color = tplColors[elementId] ?? defaultColor
        const strokeColor = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : '#e2e8f0')
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = station.icon ? TEMPLATE_ICONS[station.icon] : undefined

        const centerCx = bbox.x + bbox.width / 2
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
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={10} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={6} rx={3} fill={color} />

              <circle cx={bbox.x + 22} cy={bbox.y + 24} r={12} fill={color} opacity={0.15} />
              {IconComponent ? (
                <g transform={`translate(${bbox.x + 14}, ${bbox.y + 16})`}>
                  <IconComponent size={16} color={color} />
                </g>
              ) : (
                <text x={bbox.x + 22} y={bbox.y + 28} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                  {index + 1}
                </text>
              )}

              <text x={centerCx} y={bbox.y + 54} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#1a202c">
                {nameLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={centerCx} dy={lineIndex === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>

              {station.subtitle && (
                <text x={centerCx} y={bbox.y + 54 + nameLines.length * 13 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#64748b">
                  {descLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={centerCx} dy={lineIndex === 0 ? 0 : 11}>
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
