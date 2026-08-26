import { useRef, type ReactElement } from 'react'
import type { Comparison5Data, Comparison5Item } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const DEFAULT_LEFT_COLOR = MIGSO_PALETTE[0]! // Navy #2c2b64
const DEFAULT_RIGHT_COLOR = MIGSO_PALETTE[1]! // Coral #ff5338

function parseItem(item: string | Comparison5Item | undefined): { text: string; icon?: string } {
  if (!item) return { text: '' }
  if (typeof item === 'string') return { text: item }
  return { text: item.text, icon: item.icon }
}

export function Comparison5Template({ data }: { data: Comparison5Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const {
    leftTitle,
    rightTitle,
    leftOption,
    rightOption,
    leftItems = [],
    rightItems = [],
  } = data || {}

  const W = 960
  const midX = 480
  const topY = 40
  const chevronW = 200
  const chevronH = 44
  const chevronIndent = 16
  const centerCircleR = 32

  const leftOptionText = leftOption || leftTitle || 'Option 01'
  const rightOptionText = rightOption || rightTitle || 'Option 02'

  // Header Left Chevron (points left)
  const headerLeftId = 'header-left'
  const defaultHeaderLeftBbox = {
    x: midX - 90 - chevronW,
    y: topY,
    width: chevronW,
    height: chevronH,
  }
  const customHeaderLeft = positions[headerLeftId]
  const headerLeftBbox = {
    x: customHeaderLeft?.x ?? defaultHeaderLeftBbox.x,
    y: customHeaderLeft?.y ?? defaultHeaderLeftBbox.y,
    width: customHeaderLeft?.width ?? defaultHeaderLeftBbox.width,
    height: customHeaderLeft?.height ?? defaultHeaderLeftBbox.height,
  }
  const isHeaderLeftSelected = selectedIds.has(headerLeftId)
  const leftColor = tplColors[headerLeftId] || DEFAULT_LEFT_COLOR
  const strokeColorLeft = tplStrokeColors[headerLeftId] || (isHeaderLeftSelected ? '#4a90d9' : 'none')
  const strokeWidthLeft = tplStrokeWidths[headerLeftId] ?? (isHeaderLeftSelected ? 2.5 : 0)

  // Header Right Chevron (points right)
  const headerRightId = 'header-right'
  const defaultHeaderRightBbox = {
    x: midX + 90,
    y: topY,
    width: chevronW,
    height: chevronH,
  }
  const customHeaderRight = positions[headerRightId]
  const headerRightBbox = {
    x: customHeaderRight?.x ?? defaultHeaderRightBbox.x,
    y: customHeaderRight?.y ?? defaultHeaderRightBbox.y,
    width: customHeaderRight?.width ?? defaultHeaderRightBbox.width,
    height: customHeaderRight?.height ?? defaultHeaderRightBbox.height,
  }
  const isHeaderRightSelected = selectedIds.has(headerRightId)
  const rightColor = tplColors[headerRightId] || DEFAULT_RIGHT_COLOR
  const strokeColorRight = tplStrokeColors[headerRightId] || (isHeaderRightSelected ? '#4a90d9' : 'none')
  const strokeWidthRight = tplStrokeWidths[headerRightId] ?? (isHeaderRightSelected ? 2.5 : 0)

  // Central circle
  const centerCircleId = 'center-circle'
  const defaultCenterCircleBbox = {
    x: midX - centerCircleR,
    y: topY + (chevronH / 2) - centerCircleR,
    width: centerCircleR * 2,
    height: centerCircleR * 2,
  }
  const customCenterCircle = positions[centerCircleId]
  const centerCircleBbox = {
    x: customCenterCircle?.x ?? defaultCenterCircleBbox.x,
    y: customCenterCircle?.y ?? defaultCenterCircleBbox.y,
    width: customCenterCircle?.width ?? defaultCenterCircleBbox.width,
    height: customCenterCircle?.height ?? defaultCenterCircleBbox.height,
  }
  const isCenterCircleSelected = selectedIds.has(centerCircleId)

  // Items layout
  const maxItems = Math.max(leftItems.length, rightItems.length, 1)
  const colW = 330
  const leftColX = midX - 30 - colW
  const rightColX = midX + 30
  const itemStartY = topY + chevronH + 34
  const itemRowGap = 12

  // Multi-line height calculation
  const maxItemChars = Math.max(10, Math.floor((colW - 74) / 7.5))

  const rowData = Array.from({ length: maxItems }, (_, idx) => {
    const leftParsed = parseItem(leftItems[idx])
    const rightParsed = parseItem(rightItems[idx])
    const leftLines = leftParsed.text ? wrapTextByWidth(leftParsed.text, maxItemChars) : []
    const rightLines = rightParsed.text ? wrapTextByWidth(rightParsed.text, maxItemChars) : []
    const linesCount = Math.max(leftLines.length, rightLines.length, 1)
    const cardH = Math.max(54, 20 + linesCount * 17)
    return {
      leftParsed,
      rightParsed,
      leftLines,
      rightLines,
      cardH,
    }
  })

  // Cumulative Y
  const rowYPositions: number[] = []
  let currY = itemStartY
  for (let i = 0; i < maxItems; i++) {
    rowYPositions.push(currY)
    currY += rowData[i]!.cardH + itemRowGap
  }

  const verticalAxisStartY = topY + chevronH + 18
  const verticalAxisEndY = currY + 6

  return (
    <g ref={svgRef}>
      <defs>
        {/* Double-sided arrows for horizontal lines & vertical axis */}
        <marker id="axis-arrow-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 8 1 L 2 5 L 8 9" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        </marker>
        <marker id="axis-arrow-end" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 2 1 L 8 5 L 2 9" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        </marker>
      </defs>

      {/* Horizontal double-ended arrow lines behind the headers */}
      <line
        x1={midX - 400}
        y1={topY + chevronH / 2}
        x2={midX - 90}
        y2={topY + chevronH / 2}
        stroke="#cbd5e1"
        strokeWidth={2}
        markerStart="url(#axis-arrow-start)"
        markerEnd="url(#axis-arrow-end)"
      />
      <line
        x1={midX + 90}
        y1={topY + chevronH / 2}
        x2={midX + 400}
        y2={topY + chevronH / 2}
        stroke="#cbd5e1"
        strokeWidth={2}
        markerStart="url(#axis-arrow-start)"
        markerEnd="url(#axis-arrow-end)"
      />

      {/* Vertical separating axis with arrows */}
      <line
        x1={midX}
        y1={verticalAxisStartY}
        x2={midX}
        y2={verticalAxisEndY}
        stroke="#cbd5e1"
        strokeWidth={2}
        markerStart="url(#axis-arrow-start)"
        markerEnd="url(#axis-arrow-end)"
      />

      {/* Central Bicolor Circle */}
      <g
        key={centerCircleId}
        data-element-id={centerCircleId}
        onMouseDown={e => startDrag(e, centerCircleId, centerCircleBbox)}
        transform={getTransform(centerCircleId, centerCircleBbox)}
        style={{ cursor: 'pointer' }}
      >
        {/* Left half (Navy) */}
        <path
          d={`
            M ${centerCircleBbox.x + centerCircleBbox.width / 2} ${centerCircleBbox.y}
            A ${centerCircleBbox.width / 2} ${centerCircleBbox.height / 2} 0 0 0 ${centerCircleBbox.x + centerCircleBbox.width / 2} ${centerCircleBbox.y + centerCircleBbox.height}
            Z
          `}
          fill={leftColor}
        />
        {/* Right half (Coral) */}
        <path
          d={`
            M ${centerCircleBbox.x + centerCircleBbox.width / 2} ${centerCircleBbox.y}
            A ${centerCircleBbox.width / 2} ${centerCircleBbox.height / 2} 0 0 1 ${centerCircleBbox.x + centerCircleBbox.width / 2} ${centerCircleBbox.y + centerCircleBbox.height}
            Z
          `}
          fill={rightColor}
        />
        {isCenterCircleSelected && renderHandles(centerCircleBbox, centerCircleId)}
      </g>

      {/* Header Left Chevron (Option 01) - points left */}
      <g
        key={headerLeftId}
        data-element-id={headerLeftId}
        onMouseDown={e => startDrag(e, headerLeftId, headerLeftBbox)}
        transform={getTransform(headerLeftId, headerLeftBbox)}
        style={{ cursor: 'pointer' }}
      >
        <path
          d={`
            M ${headerLeftBbox.x + chevronIndent} ${headerLeftBbox.y}
            L ${headerLeftBbox.x + headerLeftBbox.width} ${headerLeftBbox.y}
            L ${headerLeftBbox.x + headerLeftBbox.width - chevronIndent} ${headerLeftBbox.y + headerLeftBbox.height}
            L ${headerLeftBbox.x} ${headerLeftBbox.y + headerLeftBbox.height}
            L ${headerLeftBbox.x + chevronIndent} ${headerLeftBbox.y + headerLeftBbox.height / 2}
            Z
          `}
          fill={leftColor}
          stroke={strokeColorLeft}
          strokeWidth={strokeWidthLeft}
        />
        <text
          x={headerLeftBbox.x + headerLeftBbox.width / 2}
          y={headerLeftBbox.y + headerLeftBbox.height / 2 + 6}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={16}
          fontWeight={700}
          fill="#ffffff"
        >
          {leftOptionText}
        </text>
        {isHeaderLeftSelected && renderHandles(headerLeftBbox, headerLeftId)}
      </g>

      {/* Header Right Chevron (Option 02) - points right */}
      <g
        key={headerRightId}
        data-element-id={headerRightId}
        onMouseDown={e => startDrag(e, headerRightId, headerRightBbox)}
        transform={getTransform(headerRightId, headerRightBbox)}
        style={{ cursor: 'pointer' }}
      >
        <path
          d={`
            M ${headerRightBbox.x + chevronIndent} ${headerRightBbox.y}
            L ${headerRightBbox.x + headerRightBbox.width} ${headerRightBbox.y}
            L ${headerRightBbox.x + headerRightBbox.width - chevronIndent} ${headerRightBbox.y + headerRightBbox.height / 2}
            L ${headerRightBbox.x + headerRightBbox.width} ${headerRightBbox.y + headerRightBbox.height}
            L ${headerRightBbox.x} ${headerRightBbox.y + headerRightBbox.height}
            Z
          `}
          fill={rightColor}
          stroke={strokeColorRight}
          strokeWidth={strokeWidthRight}
        />
        <text
          x={headerRightBbox.x + headerRightBbox.width / 2}
          y={headerRightBbox.y + headerRightBbox.height / 2 + 6}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={16}
          fontWeight={700}
          fill="#ffffff"
        >
          {rightOptionText}
        </text>
        {isHeaderRightSelected && renderHandles(headerRightBbox, headerRightId)}
      </g>

      {/* Items Rows */}
      {rowData.map((row, index) => {
        const rowY = rowYPositions[index]!
        const cardH = row.cardH

        const leftItemId = `left-item-${index}`
        const defaultLeftBbox = { x: leftColX, y: rowY, width: colW, height: cardH }
        const customLeftPos = positions[leftItemId]
        const leftBbox = {
          x: customLeftPos?.x ?? defaultLeftBbox.x,
          y: customLeftPos?.y ?? defaultLeftBbox.y,
          width: customLeftPos?.width ?? defaultLeftBbox.width,
          height: customLeftPos?.height ?? defaultLeftBbox.height,
        }
        const isLeftSelected = selectedIds.has(leftItemId)
        const itemLeftColor = tplColors[leftItemId] || leftColor
        const itemLeftStroke = tplStrokeColors[leftItemId] || (isLeftSelected ? '#4a90d9' : 'none')
        const itemLeftStrokeWidth = tplStrokeWidths[leftItemId] ?? (isLeftSelected ? 2 : 0)

        const rightItemId = `right-item-${index}`
        const defaultRightBbox = { x: rightColX, y: rowY, width: colW, height: cardH }
        const customRightPos = positions[rightItemId]
        const rightBbox = {
          x: customRightPos?.x ?? defaultRightBbox.x,
          y: customRightPos?.y ?? defaultRightBbox.y,
          width: customRightPos?.width ?? defaultRightBbox.width,
          height: customRightPos?.height ?? defaultRightBbox.height,
        }
        const isRightSelected = selectedIds.has(rightItemId)
        const itemRightColor = tplColors[rightItemId] || rightColor
        const itemRightStroke = tplStrokeColors[rightItemId] || (isRightSelected ? '#4a90d9' : 'none')
        const itemRightStrokeWidth = tplStrokeWidths[rightItemId] ?? (isRightSelected ? 2 : 0)

        const IconLeft = row.leftParsed.icon && TEMPLATE_ICONS[row.leftParsed.icon]
          ? TEMPLATE_ICONS[row.leftParsed.icon]
          : TEMPLATE_ICONS.leaf

        const IconRight = row.rightParsed.icon && TEMPLATE_ICONS[row.rightParsed.icon]
          ? TEMPLATE_ICONS[row.rightParsed.icon]
          : TEMPLATE_ICONS.leaf

        return (
          <g key={`row-${index}`}>
            {/* Left Item Pill Card */}
            {row.leftParsed.text && (
              <g
                key={leftItemId}
                data-element-id={leftItemId}
                onMouseDown={e => startDrag(e, leftItemId, leftBbox)}
                transform={getTransform(leftItemId, leftBbox)}
                style={{ cursor: 'pointer' }}
              >
                {/* Pill background */}
                <rect
                  x={leftBbox.x}
                  y={leftBbox.y}
                  width={leftBbox.width}
                  height={leftBbox.height}
                  rx={leftBbox.height / 2}
                  fill="#f1f5f9"
                  stroke={itemLeftStroke}
                  strokeWidth={itemLeftStrokeWidth}
                />
                {/* Left circle badge with icon */}
                <circle
                  cx={leftBbox.x + leftBbox.height / 2}
                  cy={leftBbox.y + leftBbox.height / 2}
                  r={leftBbox.height / 2}
                  fill={itemLeftColor}
                />
                {IconLeft && (
                  <g
                    transform={`translate(${leftBbox.x + leftBbox.height / 2 - 12}, ${leftBbox.y + leftBbox.height / 2 - 12})`}
                  >
                    <IconLeft size={24} color="#ffffff" fill="none" />
                  </g>
                )}
                {/* Multi-line text description */}
                <text
                  x={leftBbox.x + leftBbox.height + 12}
                  y={leftBbox.y + leftBbox.height / 2 + (row.leftLines.length > 1 ? -((row.leftLines.length - 1) * 8) + 4 : 5)}
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fontWeight={500}
                  fill="#334155"
                >
                  {row.leftLines.map((line, lineIndex) => (
                    <tspan
                      key={lineIndex}
                      x={leftBbox.x + leftBbox.height + 12}
                      dy={lineIndex === 0 ? 0 : 16}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
                {isLeftSelected && renderHandles(leftBbox, leftItemId)}
              </g>
            )}

            {/* Right Item Pill Card */}
            {row.rightParsed.text && (
              <g
                key={rightItemId}
                data-element-id={rightItemId}
                onMouseDown={e => startDrag(e, rightItemId, rightBbox)}
                transform={getTransform(rightItemId, rightBbox)}
                style={{ cursor: 'pointer' }}
              >
                {/* Pill background */}
                <rect
                  x={rightBbox.x}
                  y={rightBbox.y}
                  width={rightBbox.width}
                  height={rightBbox.height}
                  rx={rightBbox.height / 2}
                  fill="#f1f5f9"
                  stroke={itemRightStroke}
                  strokeWidth={itemRightStrokeWidth}
                />
                {/* Circle badge with icon */}
                <circle
                  cx={rightBbox.x + rightBbox.height / 2}
                  cy={rightBbox.y + rightBbox.height / 2}
                  r={rightBbox.height / 2}
                  fill={itemRightColor}
                />
                {IconRight && (
                  <g
                    transform={`translate(${rightBbox.x + rightBbox.height / 2 - 12}, ${rightBbox.y + rightBbox.height / 2 - 12})`}
                  >
                    <IconRight size={24} color="#ffffff" fill="none" />
                  </g>
                )}
                {/* Multi-line text description */}
                <text
                  x={rightBbox.x + rightBbox.height + 12}
                  y={rightBbox.y + rightBbox.height / 2 + (row.rightLines.length > 1 ? -((row.rightLines.length - 1) * 8) + 4 : 5)}
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fontWeight={500}
                  fill="#334155"
                >
                  {row.rightLines.map((line, lineIndex) => (
                    <tspan
                      key={lineIndex}
                      x={rightBbox.x + rightBbox.height + 12}
                      dy={lineIndex === 0 ? 0 : 16}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
                {isRightSelected && renderHandles(rightBbox, rightItemId)}
              </g>
            )}
          </g>
        )
      })}
    </g>
  )
}
