import { useRef, type ReactElement } from 'react'
import type { Comparison7Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { MIGSO_PALETTE } from '../../lib/theme'

const PRO_COLOR = '#16a34a'
const CON_COLOR = MIGSO_PALETTE[1]!
const PRO_BG = '#f0fdf4'
const CON_BG = '#fef2f2'

export function Comparison7Template({ data }: { data: Comparison7Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { pros = [], cons = [] } = data || {}
  const W = 800
  const colW = 300
  const colGap = 40
  const leftX = (W - colW * 2 - colGap) / 2
  const rightX = leftX + colW + colGap
  const headerH = 48
  const rowH = 40
  const topY = 50

  return (
    <g ref={svgRef}>
      {(() => {
        const headerId = 'header-pros'
        const defaultBbox = { x: leftX, y: topY, width: colW, height: headerH }
        const customPos = positions[headerId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(headerId)
        const color = tplColors[headerId] || PRO_COLOR
        const strokeColor = tplStrokeColors[headerId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[headerId] ?? (isSelected ? 2.5 : 0)

        return (
          <g
            key={headerId}
            data-element-id={headerId}
            onMouseDown={e => startDrag(e, headerId, bbox)}
            transform={getTransform(headerId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
              PROS
            </text>
            {isSelected && renderHandles(bbox, headerId)}
          </g>
        )
      })()}

      {(() => {
        const headerId = 'header-cons'
        const defaultBbox = { x: rightX, y: topY, width: colW, height: headerH }
        const customPos = positions[headerId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(headerId)
        const color = tplColors[headerId] || CON_COLOR
        const strokeColor = tplStrokeColors[headerId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[headerId] ?? (isSelected ? 2.5 : 0)

        return (
          <g
            key={headerId}
            data-element-id={headerId}
            onMouseDown={e => startDrag(e, headerId, bbox)}
            transform={getTransform(headerId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
              CONS
            </text>
            {isSelected && renderHandles(bbox, headerId)}
          </g>
        )
      })()}

      {pros.map((pro, index) => {
        const elementId = `pro-${index}`
        const defaultBbox = { x: leftX, y: topY + headerH + 8 + index * rowH, width: colW, height: rowH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : '#e2e8f0')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 1)
        const maxChars = Math.max(8, Math.floor((bbox.width - 50) / 8))
        const lines = wrapTextByWidth(pro, maxChars)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={4} fill={index % 2 === 0 ? PRO_BG : 'white'} stroke={strokeColor} strokeWidth={strokeWidth} />
            <circle cx={bbox.x + 18} cy={bbox.y + bbox.height / 2} r={5} fill={PRO_COLOR} />
            <text x={bbox.x + 34} y={bbox.y + bbox.height / 2 + (lines.length > 1 ? -3 : 5)} fontFamily="Arial, sans-serif" fontSize={13} fill="#333">
              {lines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + 34} dy={lineIndex === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      {cons.map((con, index) => {
        const elementId = `con-${index}`
        const defaultBbox = { x: rightX, y: topY + headerH + 8 + index * rowH, width: colW, height: rowH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : '#e2e8f0')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 1)
        const maxChars = Math.max(8, Math.floor((bbox.width - 50) / 8))
        const lines = wrapTextByWidth(con, maxChars)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={4} fill={index % 2 === 0 ? CON_BG : 'white'} stroke={strokeColor} strokeWidth={strokeWidth} />
            <circle cx={bbox.x + 18} cy={bbox.y + bbox.height / 2} r={5} fill={CON_COLOR} />
            <text x={bbox.x + 34} y={bbox.y + bbox.height / 2 + (lines.length > 1 ? -3 : 5)} fontFamily="Arial, sans-serif" fontSize={13} fill="#333">
              {lines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + 34} dy={lineIndex === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
