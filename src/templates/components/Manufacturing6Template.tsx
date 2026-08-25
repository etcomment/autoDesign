import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6']
const CARD_W = 140
const CARD_H = 70

export function Manufacturing6Template({ data }: { data: ManufacturingData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { stations = [] } = data
  const W = 700
  const H = 450
  const cx = W / 2
  const cy = H / 2
  const orbitR = 155
  const count = Math.max(1, stations.length)
  const angleStep = 360 / count

  return (
    <g ref={svgRef}>
      <circle cx={cx} cy={cy} r={orbitR} fill="none" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="6 4" />
      <circle cx={cx} cy={cy} r={42} fill="#1a1a2e" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
        FACTORY
      </text>

      {stations.map((station, index) => {
        const angle = index * angleStep - 90
        const rad = (angle * Math.PI) / 180
        const cardCx = cx + orbitR * Math.cos(rad)
        const cardCy = cy + orbitR * Math.sin(rad)
        const defaultRect = { x: cardCx - CARD_W / 2, y: cardCy - CARD_H / 2, width: CARD_W, height: CARD_H }

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
        const strokeColor = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = station.icon ? TEMPLATE_ICONS[station.icon] : undefined
        const maxChars = Math.max(6, Math.floor((bbox.width - 20) / 8))
        const nameLines = wrapTextByWidth(station.title, maxChars)

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx={bbox.x + 18} cy={bbox.y + 18} r={10} fill={color} />
              {IconComponent ? (
                <g transform={`translate(${bbox.x + 12}, ${bbox.y + 12})`}>
                  <IconComponent size={12} color="white" />
                </g>
              ) : (
                <text x={bbox.x + 18} y={bbox.y + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                  {index + 1}
                </text>
              )}

              <text x={bbox.x + 36} y={bbox.y + 22} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                {nameLines[0] || ''}
              </text>

              {station.subtitle && (
                <text x={bbox.x + 10} y={bbox.y + 46} fontFamily="Arial, sans-serif" fontSize={9} fill="#666">
                  {station.subtitle.length > 22 ? station.subtitle.slice(0, 20) + '...' : station.subtitle}
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
