import { useRef, type ReactElement } from 'react'
import type { ComparisonData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
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

  const { leftTitle, rightTitle, items } = data
  const W = 800
  const circleR = 150
  const leftCx = W / 2 - 70
  const rightCx = W / 2 + 70
  const cy = 250

  const leftItems = items.slice(0, 3)
  const rightItems = items.slice(3, 6)

  return (
    <g ref={svgRef}>
      {/* Left Circle Block */}
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

        return (
          <g
            key={circleId}
            onMouseDown={e => startDrag(e, circleId, bbox)}
            transform={getTransform(circleId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <circle cx={bbox.x + bbox.width / 2} cy={bbox.y + bbox.height / 2} r={bbox.width / 2} fill={color} opacity={0.12} stroke={color} strokeWidth={2} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={color}>
              {leftTitle}
            </text>
            {isSelected && renderHandles(bbox, circleId)}
          </g>
        )
      })()}

      {/* Right Circle Block */}
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

        return (
          <g
            key={circleId}
            onMouseDown={e => startDrag(e, circleId, bbox)}
            transform={getTransform(circleId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <circle cx={bbox.x + bbox.width / 2} cy={bbox.y + bbox.height / 2} r={bbox.width / 2} fill={color} opacity={0.12} stroke={color} strokeWidth={2} strokeDasharray="8 4" />
            <text x={bbox.x + bbox.width / 2} y={bbox.y - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={color}>
              {rightTitle}
            </text>
            {isSelected && renderHandles(bbox, circleId)}
          </g>
        )
      })()}

      {leftItems.map((item, i) => {
        const elementId = `left-item-${i}`
        const defaultBbox = { x: leftCx - 110, y: cy - 20 + i * 28, width: 90, height: 24 }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <text x={bbox.x + bbox.width} y={bbox.y + 16} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={500} fill="#333">
              {item.label}
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      {rightItems.map((item, i) => {
        const elementId = `right-item-${i}`
        const defaultBbox = { x: rightCx + 20, y: cy - 20 + i * 28, width: 90, height: 24 }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <text x={bbox.x} y={bbox.y + 16} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={500} fill="#333">
              {item.label}
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      <text x={W / 2} y={cy} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={OVERLAP_COLOR}>
        Common
      </text>
      <text x={W / 2} y={cy + 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill={OVERLAP_COLOR} opacity={0.7}>
        shared items
      </text>
    </g>
  )
}

