import { useRef, type ReactElement } from 'react'
import type { Comparison6Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const LEFT_COLOR = MIGSO_PALETTE[0]!
const RIGHT_COLOR = MIGSO_PALETTE[1]!
const LEFT_BG = '#eff6ff'
const RIGHT_BG = '#fef2f2'

export function Comparison6Template({ data }: { data: Comparison6Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { leftTitle, rightTitle, leftItems, rightItems } = data
  const W = 800
  const colW = 280
  const colGap = 40
  const leftX = (W - colW * 2 - colGap) / 2
  const rightX = leftX + colW + colGap
  const headerH = 48
  const rowH = 38
  const topY = 50
  const checkSize = 14

  const maxItems = Math.max(leftItems.length, rightItems.length, 4)

  return (
    <g ref={svgRef}>
      {/* Header Left */}
      {(() => {
        const headerId = 'header-left'
        const defaultBbox = { x: leftX, y: topY, width: colW, height: headerH }
        const customPos = positions[headerId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(headerId)
        const color = tplColors[headerId] || LEFT_COLOR

        return (
          <g key={headerId} onMouseDown={e => startDrag(e, headerId, bbox)} transform={getTransform(headerId, bbox)} style={{ cursor: 'pointer' }}>
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={color} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
              {leftTitle}
            </text>
            {isSelected && renderHandles(bbox, headerId)}
          </g>
        )
      })()}

      {/* Header Right */}
      {(() => {
        const headerId = 'header-right'
        const defaultBbox = { x: rightX, y: topY, width: colW, height: headerH }
        const customPos = positions[headerId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(headerId)
        const color = tplColors[headerId] || RIGHT_COLOR

        return (
          <g key={headerId} onMouseDown={e => startDrag(e, headerId, bbox)} transform={getTransform(headerId, bbox)} style={{ cursor: 'pointer' }}>
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={color} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
              {rightTitle}
            </text>
            {isSelected && renderHandles(bbox, headerId)}
          </g>
        )
      })()}

      {/* Item Rows */}
      {Array.from({ length: maxItems }, (_, i) => {
        const rowY = topY + headerH + 8 + i * rowH

        {/* Left Row Item */}
        const leftId = `left-item-${i}`
        const defaultLeftBbox = { x: leftX, y: rowY, width: colW, height: rowH }
        const customLeftPos = positions[leftId]
        const leftBbox = {
          x: customLeftPos?.x ?? defaultLeftBbox.x,
          y: customLeftPos?.y ?? defaultLeftBbox.y,
          width: customLeftPos?.width ?? defaultLeftBbox.width,
          height: customLeftPos?.height ?? defaultLeftBbox.height,
        }
        const isLeftSelected = selectedIds.has(leftId)

        {/* Right Row Item */}
        const rightId = `right-item-${i}`
        const defaultRightBbox = { x: rightX, y: rowY, width: colW, height: rowH }
        const customRightPos = positions[rightId]
        const rightBbox = {
          x: customRightPos?.x ?? defaultRightBbox.x,
          y: customRightPos?.y ?? defaultRightBbox.y,
          width: customRightPos?.width ?? defaultRightBbox.width,
          height: customRightPos?.height ?? defaultRightBbox.height,
        }
        const isRightSelected = selectedIds.has(rightId)

        return (
          <g key={`row-${i}`}>
            {leftItems[i] && (
              <g key={leftId} onMouseDown={e => startDrag(e, leftId, leftBbox)} transform={getTransform(leftId, leftBbox)} style={{ cursor: 'pointer' }}>
                <rect x={leftBbox.x} y={leftBbox.y} width={leftBbox.width} height={leftBbox.height} rx={4} fill={i % 2 === 0 ? LEFT_BG : 'white'} stroke={isLeftSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isLeftSelected ? 2 : 1} />
                <circle cx={leftBbox.x + 22} cy={leftBbox.y + leftBbox.height / 2} r={checkSize / 2} fill={LEFT_COLOR} />
                <text x={leftBbox.x + 38} y={leftBbox.y + leftBbox.height / 2 + 5} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={500} fill="#333">
                  {leftItems[i]}
                </text>
                {isLeftSelected && renderHandles(leftBbox, leftId)}
              </g>
            )}

            {rightItems[i] && (
              <g key={rightId} onMouseDown={e => startDrag(e, rightId, rightBbox)} transform={getTransform(rightId, rightBbox)} style={{ cursor: 'pointer' }}>
                <rect x={rightBbox.x} y={rightBbox.y} width={rightBbox.width} height={rightBbox.height} rx={4} fill={i % 2 === 0 ? RIGHT_BG : 'white'} stroke={isRightSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isRightSelected ? 2 : 1} />
                <circle cx={rightBbox.x + 22} cy={rightBbox.y + rightBbox.height / 2} r={checkSize / 2} fill={RIGHT_COLOR} />
                <text x={rightBbox.x + 38} y={rightBbox.y + rightBbox.height / 2 + 5} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={500} fill="#333">
                  {rightItems[i]}
                </text>
                {isRightSelected && renderHandles(rightBbox, rightId)}
              </g>
            )}
          </g>
        )
      })}
    </g>
  )
}

