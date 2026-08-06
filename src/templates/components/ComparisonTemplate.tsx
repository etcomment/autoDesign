import { useRef, type ReactElement } from 'react'
import type { ComparisonData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const LEFT_COLOR = MIGSO_PALETTE[0]!
const RIGHT_COLOR = MIGSO_PALETTE[1]!
const LEFT_BG = '#eff6ff'
const RIGHT_BG = '#fef2f2'

export function ComparisonTemplate({ data }: { data: ComparisonData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { leftTitle, rightTitle, items } = data
  const W = 900
  const colW = 320
  const labelW = 100
  const dividerW = 40
  const totalW = colW * 2 + labelW + dividerW
  const tableX = (W - totalW) / 2
  const headerH = 48
  const rowH = 40
  const tableY = 40

  const leftColX = tableX
  const labelColX = leftColX + colW
  const rightColX = labelColX + labelW + dividerW

  return (
    <g ref={svgRef}>
      {/* Header Left */}
      {(() => {
        const headerLeftId = 'header-left'
        const defaultBbox = { x: leftColX, y: tableY, width: colW, height: headerH }
        const customPos = positions[headerLeftId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(headerLeftId)
        const color = tplColors[headerLeftId] || LEFT_COLOR

        return (
          <g
            key={headerLeftId}
            onMouseDown={e => startDrag(e, headerLeftId, bbox)}
            transform={getTransform(headerLeftId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill={color} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
              {leftTitle}
            </text>
            {isSelected && renderHandles(bbox, headerLeftId)}
          </g>
        )
      })()}

      {/* Header Right */}
      {(() => {
        const headerRightId = 'header-right'
        const defaultBbox = { x: rightColX, y: tableY, width: colW, height: headerH }
        const customPos = positions[headerRightId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(headerRightId)
        const color = tplColors[headerRightId] || RIGHT_COLOR

        return (
          <g
            key={headerRightId}
            onMouseDown={e => startDrag(e, headerRightId, bbox)}
            transform={getTransform(headerRightId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill={color} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
              {rightTitle}
            </text>
            {isSelected && renderHandles(bbox, headerRightId)}
          </g>
        )
      })()}

      <text x={labelColX + labelW / 2 + dividerW / 2} y={tableY + headerH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={800} fill="#94a3b8">
        VS
      </text>

      {/* Comparison Rows */}
      {items.map((item, i) => {
        const elementId = `item-${i}`
        const isSelected = selectedIds.has(elementId)
        const rowY = tableY + headerH + i * rowH
        const isEven = i % 2 === 0
        const defaultBbox = { x: leftColX, y: rowY, width: totalW, height: rowH }

        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={colW} height={bbox.height} fill={isEven ? LEFT_BG : 'white'} />
            <rect x={bbox.x + colW + labelW + dividerW} y={bbox.y} width={colW} height={bbox.height} fill={isEven ? RIGHT_BG : 'white'} />
            <rect x={bbox.x + colW + dividerW / 2} y={bbox.y} width={labelW} height={bbox.height} fill={isEven ? '#f8fafc' : '#f1f5f9'} />

            <text x={bbox.x + colW / 2} y={bbox.y + bbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={500} fill={LEFT_COLOR}>
              {item.left}
            </text>

            <text x={bbox.x + colW + labelW + dividerW + colW / 2} y={bbox.y + bbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={500} fill={RIGHT_COLOR}>
              {item.right}
            </text>

            <text x={bbox.x + colW + dividerW / 2 + labelW / 2} y={bbox.y + bbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#475569">
              {item.label}
            </text>

            <line x1={bbox.x} y1={bbox.y + bbox.height} x2={bbox.x + bbox.width} y2={bbox.y + bbox.height} stroke="#e2e8f0" strokeWidth={1} />

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}

