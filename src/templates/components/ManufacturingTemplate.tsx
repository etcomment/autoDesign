import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c']

function chevronPath(x: number, y: number, w: number, h: number, arrow: number): string {
  const r = x + w
  const b = y + h
  const my = y + h / 2
  return `M ${x} ${y} L ${r - arrow} ${y} L ${r} ${my} L ${r - arrow} ${b} L ${x} ${b} L ${x + arrow} ${my} Z`
}

function firstChevronPath(x: number, y: number, w: number, h: number, arrow: number): string {
  const r = x + w
  const b = y + h
  const my = y + h / 2
  return `M ${x} ${y} L ${r - arrow} ${y} L ${r} ${my} L ${r - arrow} ${b} L ${x} ${b} Z`
}

export function ManufacturingTemplate({ data }: { data: ManufacturingData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { stations = [] } = data
  const W = 900
  const count = Math.max(1, stations.length)
  const arrow = 18
  const chevronW = Math.min(170, (W - 80) / count)
  const chevronH = 110
  const startX = (W - count * chevronW) / 2
  const startY = 50

  return (
    <g ref={svgRef}>
      {stations.map((station, index) => {
        const x = startX + index * chevronW
        const path = index === 0
          ? firstChevronPath(x, startY, chevronW, chevronH, arrow)
          : chevronPath(x, startY, chevronW, chevronH, arrow)

        const defaultColor = station.color || PALETTE[index % PALETTE.length]!
        const elementId = `station-${index}`
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || 'white'
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 3 : 2)
        const isSelected = selectedIds.has(elementId)

        const defaultRect = { x, y: startY, width: chevronW, height: chevronH }
        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const IconComponent = station.icon ? TEMPLATE_ICONS[station.icon] : undefined
        const centerCx = bbox.x + bbox.width / 2
        const centerCy = bbox.y + bbox.height / 2
        const maxChars = Math.max(6, Math.floor((bbox.width - 30) / 8))
        const titleLines = wrapTextByWidth(station.title, maxChars)
        const subtitleLines = station.subtitle ? wrapTextByWidth(station.subtitle, maxChars) : []

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <path d={path} fill={color} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />

              {IconComponent ? (
                <g transform={`translate(${centerCx - 9}, ${centerCy - 30})`}>
                  <IconComponent size={18} color="white" />
                </g>
              ) : (
                <circle cx={centerCx} cy={centerCy - 20} r={12} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} />
              )}
              {!IconComponent && (
                <text x={centerCx} y={centerCy - 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                  {index + 1}
                </text>
              )}

              <text x={centerCx} y={centerCy + 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={centerCx} dy={lineIndex === 0 ? 0 : 12}>
                    {line}
                  </tspan>
                ))}
              </text>

              {station.subtitle && (
                <text x={centerCx} y={centerCy + 8 + titleLines.length * 12 + 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="rgba(255,255,255,0.85)">
                  {subtitleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={centerCx} dy={lineIndex === 0 ? 0 : 10}>
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
