import { useRef, type ReactElement } from 'react'
import type { ComparisonData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { MIGSO_PALETTE } from '../../lib/theme'

const LEFT_COLOR = MIGSO_PALETTE[0]!
const RIGHT_COLOR = MIGSO_PALETTE[1]!
const OVERLAP_COLOR = '#7c3aed'

export function Comparison4Template({ data }: { data: ComparisonData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { leftTitle, rightTitle, items } = data
  const W = 800
  const circleR = 150
  const leftCx = W / 2 - 70
  const rightCx = W / 2 + 70
  const cy = 250

  const half = Math.ceil(items.length / 2)
  const leftItems = items.slice(0, half)
  const rightItems = items.slice(half)

  return (
    <g ref={svgRef}>
      {(() => {
        const circleId = 'circle-left'
        const defaultBbox = { x: leftCx - circleR, y: cy - circleR, width: circleR * 2, height: circleR * 2 }
        const customPos = positions[circleId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(circleId)
        const color = tplColors[circleId] || LEFT_COLOR
        const strokeColor = tplStrokeColors[circleId] || (isSelected ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[circleId] ?? (isSelected ? 3 : 2)

        return (
          <g
            key={circleId}
            data-element-id={circleId}
            onMouseDown={e => startDrag(e, circleId, bbox)}
            transform={getTransform(circleId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <circle cx={bbox.x + bbox.width / 2} cy={bbox.y + bbox.height / 2} r={bbox.width / 2} fill={color} opacity={0.15} stroke={strokeColor} strokeWidth={strokeWidth} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill={color}>
              {leftTitle}
            </text>
            {isSelected && renderHandles(bbox, circleId)}
          </g>
        )
      })()}

      {(() => {
        const circleId = 'circle-right'
        const defaultBbox = { x: rightCx - circleR, y: cy - circleR, width: circleR * 2, height: circleR * 2 }
        const customPos = positions[circleId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(circleId)
        const color = tplColors[circleId] || RIGHT_COLOR
        const strokeColor = tplStrokeColors[circleId] || (isSelected ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[circleId] ?? (isSelected ? 3 : 2)

        return (
          <g
            key={circleId}
            data-element-id={circleId}
            onMouseDown={e => startDrag(e, circleId, bbox)}
            transform={getTransform(circleId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <circle cx={bbox.x + bbox.width / 2} cy={bbox.y + bbox.height / 2} r={bbox.width / 2} fill={color} opacity={0.15} stroke={strokeColor} strokeWidth={strokeWidth} strokeDasharray="8 4" />
            <text x={bbox.x + bbox.width / 2} y={bbox.y - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill={color}>
              {rightTitle}
            </text>
            {isSelected && renderHandles(bbox, circleId)}
          </g>
        )
      })()}

      {leftItems.map((item, index) => {
        const elementId = `left-item-${index}`
        const defaultBbox = { x: leftCx - 120, y: cy - 40 + index * 34, width: 100, height: 28 }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const lines = wrapTextByWidth(item.label, 12)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <text x={bbox.x + bbox.width} y={bbox.y + 16} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={500} fill="#333">
              {lines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + bbox.width} dy={lineIndex === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      {rightItems.map((item, index) => {
        const elementId = `right-item-${index}`
        const defaultBbox = { x: rightCx + 20, y: cy - 40 + index * 34, width: 100, height: 28 }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const lines = wrapTextByWidth(item.label, 12)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <text x={bbox.x} y={bbox.y + 16} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={500} fill="#333">
              {lines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x} dy={lineIndex === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      <text x={W / 2} y={cy} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={OVERLAP_COLOR}>
        Common
      </text>
      <text x={W / 2} y={cy + 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill={OVERLAP_COLOR} opacity={0.8}>
        shared items
      </text>
    </g>
  )
}
