import { useRef, type ReactElement } from 'react'
import type { Comparison6Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
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
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { leftTitle = '', rightTitle = '', leftItems = [], rightItems = [] } = data || {}
  const W = 800
  const colW = 280
  const colGap = 40
  const leftX = (W - colW * 2 - colGap) / 2
  const rightX = leftX + colW + colGap
  const headerH = 48
  const rowH = 42
  const topY = 50
  const checkSize = 14

  const maxItems = Math.max(leftItems?.length || 0, rightItems?.length || 0)
  const maxItemChars = Math.max(8, Math.floor((colW - 50) / 7.5))

  // Calculate lines for each item
  const rowData = Array.from({ length: maxItems }, (_, index) => {
    const leftText = leftItems[index]
    const rightText = rightItems[index]
    const leftLines = leftText ? wrapTextByWidth(leftText, maxItemChars) : []
    const rightLines = rightText ? wrapTextByWidth(rightText, maxItemChars) : []
    const linesCount = Math.max(leftLines.length, rightLines.length, 1)
    const baseH = Math.max(44, 24 + linesCount * 18)
    return {
      leftText,
      rightText,
      leftLines,
      rightLines,
      linesCount,
      height: baseH,
    }
  })

  // Calculate cumulative Y positions for each row
  const rowYPositions: number[] = []
  let currentY = topY + headerH + 12
  for (let i = 0; i < maxItems; i++) {
    rowYPositions.push(currentY)
    currentY += rowData[i]!.height + 8
  }

  return (
    <g ref={svgRef}>
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
        const strokeColor = tplStrokeColors[headerId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[headerId] ?? (isSelected ? 2.5 : 0)
        const maxChars = Math.max(8, Math.floor(bbox.width / 10))
        const titleLines = wrapTextByWidth(leftTitle, maxChars)

        return (
          <g
            key={headerId}
            data-element-id={headerId}
            onMouseDown={e => startDrag(e, headerId, bbox)}
            transform={getTransform(headerId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + (titleLines.length > 1 ? -4 : 6)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
              {titleLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + bbox.width / 2} dy={lineIndex === 0 ? 0 : 15}>
                  {line}
                </tspan>
              ))}
            </text>
            {isSelected && renderHandles(bbox, headerId)}
          </g>
        )
      })()}

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
        const strokeColor = tplStrokeColors[headerId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[headerId] ?? (isSelected ? 2.5 : 0)
        const maxChars = Math.max(8, Math.floor(bbox.width / 10))
        const titleLines = wrapTextByWidth(rightTitle, maxChars)

        return (
          <g
            key={headerId}
            data-element-id={headerId}
            onMouseDown={e => startDrag(e, headerId, bbox)}
            transform={getTransform(headerId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + (titleLines.length > 1 ? -4 : 6)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
              {titleLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + bbox.width / 2} dy={lineIndex === 0 ? 0 : 15}>
                  {line}
                </tspan>
              ))}
            </text>
            {isSelected && renderHandles(bbox, headerId)}
          </g>
        )
      })()}

      {rowData.map((row, index) => {
        const rowY = rowYPositions[index]!
        const rowHeight = row.height

        const leftId = `left-item-${index}`
        const defaultLeftBbox = { x: leftX, y: rowY, width: colW, height: rowHeight }
        const customLeftPos = positions[leftId]
        const leftBbox = {
          x: customLeftPos?.x ?? defaultLeftBbox.x,
          y: customLeftPos?.y ?? defaultLeftBbox.y,
          width: customLeftPos?.width ?? defaultLeftBbox.width,
          height: customLeftPos?.height ?? defaultLeftBbox.height,
        }
        const isLeftSelected = selectedIds.has(leftId)
        const leftStrokeColor = tplStrokeColors[leftId] || (isLeftSelected ? '#4a90d9' : '#e2e8f0')
        const leftStrokeWidth = tplStrokeWidths[leftId] ?? (isLeftSelected ? 2 : 1)

        const rightId = `right-item-${index}`
        const defaultRightBbox = { x: rightX, y: rowY, width: colW, height: rowHeight }
        const customRightPos = positions[rightId]
        const rightBbox = {
          x: customRightPos?.x ?? defaultRightBbox.x,
          y: customRightPos?.y ?? defaultRightBbox.y,
          width: customRightPos?.width ?? defaultRightBbox.width,
          height: customRightPos?.height ?? defaultRightBbox.height,
        }
        const isRightSelected = selectedIds.has(rightId)
        const rightStrokeColor = tplStrokeColors[rightId] || (isRightSelected ? '#4a90d9' : '#e2e8f0')
        const rightStrokeWidth = tplStrokeWidths[rightId] ?? (isRightSelected ? 2 : 1)

        return (
          <g key={`row-${index}`}>
            {row.leftText !== undefined && (
              <g
                key={leftId}
                data-element-id={leftId}
                onMouseDown={e => startDrag(e, leftId, leftBbox)}
                transform={getTransform(leftId, leftBbox)}
                style={{ cursor: 'pointer' }}
              >
                <rect x={leftBbox.x} y={leftBbox.y} width={leftBbox.width} height={leftBbox.height} rx={6} fill={index % 2 === 0 ? LEFT_BG : 'white'} stroke={leftStrokeColor} strokeWidth={leftStrokeWidth} />
                <circle cx={leftBbox.x + 20} cy={leftBbox.y + 22} r={checkSize / 2} fill={LEFT_COLOR} />
                <text x={leftBbox.x + 36} y={leftBbox.y + 20} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={500} fill="#333">
                  {row.leftLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={leftBbox.x + 36} dy={lineIndex === 0 ? 0 : 16}>
                      {line}
                    </tspan>
                  ))}
                </text>
                {isLeftSelected && renderHandles(leftBbox, leftId)}
              </g>
            )}

            {row.rightText !== undefined && (
              <g
                key={rightId}
                data-element-id={rightId}
                onMouseDown={e => startDrag(e, rightId, rightBbox)}
                transform={getTransform(rightId, rightBbox)}
                style={{ cursor: 'pointer' }}
              >
                <rect x={rightBbox.x} y={rightBbox.y} width={rightBbox.width} height={rightBbox.height} rx={6} fill={index % 2 === 0 ? RIGHT_BG : 'white'} stroke={rightStrokeColor} strokeWidth={rightStrokeWidth} />
                <circle cx={rightBbox.x + 20} cy={rightBbox.y + 22} r={checkSize / 2} fill={RIGHT_COLOR} />
                <text x={rightBbox.x + 36} y={rightBbox.y + 20} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={500} fill="#333">
                  {row.rightLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={rightBbox.x + 36} dy={lineIndex === 0 ? 0 : 16}>
                      {line}
                    </tspan>
                  ))}
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
