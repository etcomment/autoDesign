import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6']
const ROW_W = 560
const ROW_H = 68
const GAP = 16

export function Manufacturing3Template({ data }: { data: ManufacturingData }): ReactElement {
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
  const startX = (W - ROW_W) / 2
  const startY = 40

  const getBbox = (i: number) => {
    const elementId = `station-${i}`
    const defaultRect = { x: startX, y: startY + i * (ROW_H + GAP), width: ROW_W, height: ROW_H }
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
        const cx = bbox1.x + 36
        const y1 = bbox1.y + bbox1.height
        const y2 = bbox2.y

        return (
          <g key={`arrow-${index}`}>
            <line x1={cx} y1={y1 + 2} x2={cx} y2={y2 - 8} stroke="#94a3b8" strokeWidth={2} />
            <polygon points={`${cx - 4},${y2 - 8} ${cx},${y2 - 2} ${cx + 4},${y2 - 8}`} fill="#94a3b8" />
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

        const maxNameChars = Math.max(10, Math.floor((bbox.width - 120) / 8))
        const nameLines = wrapTextByWidth(station.title, maxNameChars)
        const descLines = station.subtitle ? wrapTextByWidth(station.subtitle, maxNameChars) : []

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
                  {index + 1}
                </text>
              )}

              <text x={bbox.x + 72} y={bbox.y + bbox.height / 2 + (station.subtitle ? -3 : 5) - (nameLines.length > 1 ? 5 : 0)} fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#1a202c">
                {nameLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={bbox.x + 72} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>

              {station.subtitle && (
                <text x={bbox.x + 72} y={bbox.y + bbox.height / 2 + nameLines.length * 14 + 1} fontFamily="Arial, sans-serif" fontSize={11} fill="#64748b">
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
