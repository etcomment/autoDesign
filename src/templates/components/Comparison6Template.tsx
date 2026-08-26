import { useRef, type ReactElement } from 'react'
import type { Comparison6Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { MIGSO_PALETTE } from '../../lib/theme'

const LEFT_COLOR = MIGSO_PALETTE[0]!
const RIGHT_COLOR = MIGSO_PALETTE[1]!

export function Comparison6Template({ data }: { data: Comparison6Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const {
    leftTitle = 'Option 01',
    leftSubtitle = 'MIGSO-PCUBED content and words to be added here as required',
    rightTitle = 'Option 02',
    rightSubtitle = 'MIGSO-PCUBED content and words to be added here as required',
    aspects = [
      { label: 'Aspect 01', leftPercent: 75, rightPercent: 50 },
      { label: 'Aspect 02', leftPercent: 25, rightPercent: 100 },
      { label: 'Aspect 03', leftPercent: 100, rightPercent: 25 },
      { label: 'Aspect 04', leftPercent: 50, rightPercent: 75 },
    ],
  } = data || {}

  const W = 800
  const centerX = W / 2
  const topY = 40
  const maxHalfW = 210
  const barH = 46
  const rowGap = 20
  const aspectStartY = topY + 95

  return (
    <g ref={svgRef}>
      {/* Option 01 Header */}
      {(() => {
        const headerId = 'header-left'
        const defaultBbox = { x: centerX - 250, y: topY, width: 200, height: 65 }
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
        const strokeWidth = tplStrokeWidths[headerId] ?? (isSelected ? 2 : 0)
        const maxChars = Math.max(10, Math.floor(bbox.width / 7))
        const subtitleLines = leftSubtitle ? wrapTextByWidth(leftSubtitle, maxChars) : []

        return (
          <g
            key={headerId}
            data-element-id={headerId}
            onMouseDown={e => startDrag(e, headerId, bbox)}
            transform={getTransform(headerId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              fill="transparent"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              rx={6}
            />
            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y + 20}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={18}
              fontWeight={700}
              fill={color}
            >
              {leftTitle}
            </text>
            {subtitleLines.map((line, lineIndex) => (
              <text
                key={lineIndex}
                x={bbox.x + bbox.width / 2}
                y={bbox.y + 40 + lineIndex * 15}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fill="#475569"
              >
                {line}
              </text>
            ))}
            {isSelected && renderHandles(bbox, headerId)}
          </g>
        )
      })()}

      {/* VS Badge */}
      {(() => {
        const vsId = 'header-vs'
        const defaultBbox = { x: centerX - 35, y: topY + 5, width: 70, height: 50 }
        const customPos = positions[vsId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(vsId)
        const color = tplColors[vsId] || LEFT_COLOR
        const strokeColor = tplStrokeColors[vsId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[vsId] ?? (isSelected ? 2 : 0)

        return (
          <g
            key={vsId}
            data-element-id={vsId}
            onMouseDown={e => startDrag(e, vsId, bbox)}
            transform={getTransform(vsId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              fill="transparent"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              rx={6}
            />
            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y + bbox.height / 2 + 12}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={34}
              fontWeight={800}
              letterSpacing={1}
              fill={color}
            >
              VS
            </text>
            {isSelected && renderHandles(bbox, vsId)}
          </g>
        )
      })()}

      {/* Option 02 Header */}
      {(() => {
        const headerId = 'header-right'
        const defaultBbox = { x: centerX + 50, y: topY, width: 200, height: 65 }
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
        const strokeWidth = tplStrokeWidths[headerId] ?? (isSelected ? 2 : 0)
        const maxChars = Math.max(10, Math.floor(bbox.width / 7))
        const subtitleLines = rightSubtitle ? wrapTextByWidth(rightSubtitle, maxChars) : []

        return (
          <g
            key={headerId}
            data-element-id={headerId}
            onMouseDown={e => startDrag(e, headerId, bbox)}
            transform={getTransform(headerId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              fill="transparent"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              rx={6}
            />
            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y + 20}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={18}
              fontWeight={700}
              fill={color}
            >
              {rightTitle}
            </text>
            {subtitleLines.map((line, lineIndex) => (
              <text
                key={lineIndex}
                x={bbox.x + bbox.width / 2}
                y={bbox.y + 40 + lineIndex * 15}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fill="#475569"
              >
                {line}
              </text>
            ))}
            {isSelected && renderHandles(bbox, headerId)}
          </g>
        )
      })()}

      {/* Aspects List */}
      {aspects.map((aspect, index) => {
        const rowY = aspectStartY + index * (barH + rowGap)

        const leftPct = Math.max(0, Math.min(100, Number(aspect.leftPercent) || 0))
        const rightPct = Math.max(0, Math.min(100, Number(aspect.rightPercent) || 0))

        const leftBarW = Math.max(barH / 2, (leftPct / 100) * maxHalfW)
        const rightBarW = Math.max(barH / 2, (rightPct / 100) * maxHalfW)

        // Left Badge
        const leftBadgeId = `aspect-badge-left-${index}`
        const defaultLeftBadgeBbox = { x: 70, y: rowY, width: barH, height: barH }
        const customLeftBadgePos = positions[leftBadgeId]
        const leftBadgeBbox = {
          x: customLeftBadgePos?.x ?? defaultLeftBadgeBbox.x,
          y: customLeftBadgePos?.y ?? defaultLeftBadgeBbox.y,
          width: customLeftBadgePos?.width ?? defaultLeftBadgeBbox.width,
          height: customLeftBadgePos?.height ?? defaultLeftBadgeBbox.height,
        }
        const isLeftBadgeSelected = selectedIds.has(leftBadgeId)
        const leftBadgeColor = tplColors[leftBadgeId] || aspect.leftColor || LEFT_COLOR
        const leftBadgeStroke = tplStrokeColors[leftBadgeId] || (isLeftBadgeSelected ? '#4a90d9' : 'none')
        const leftBadgeStrokeWidth = tplStrokeWidths[leftBadgeId] ?? (isLeftBadgeSelected ? 2.5 : 0)

        // Right Badge
        const rightBadgeId = `aspect-badge-right-${index}`
        const defaultRightBadgeBbox = { x: W - 70 - barH, y: rowY, width: barH, height: barH }
        const customRightBadgePos = positions[rightBadgeId]
        const rightBadgeBbox = {
          x: customRightBadgePos?.x ?? defaultRightBadgeBbox.x,
          y: customRightBadgePos?.y ?? defaultRightBadgeBbox.y,
          width: customRightBadgePos?.width ?? defaultRightBadgeBbox.width,
          height: customRightBadgePos?.height ?? defaultRightBadgeBbox.height,
        }
        const isRightBadgeSelected = selectedIds.has(rightBadgeId)
        const rightBadgeColor = tplColors[rightBadgeId] || aspect.rightColor || RIGHT_COLOR
        const rightBadgeStroke = tplStrokeColors[rightBadgeId] || (isRightBadgeSelected ? '#4a90d9' : 'none')
        const rightBadgeStrokeWidth = tplStrokeWidths[rightBadgeId] ?? (isRightBadgeSelected ? 2.5 : 0)

        // Center Bar
        const barId = `aspect-bar-${index}`
        const defaultBarBbox = {
          x: centerX - leftBarW,
          y: rowY,
          width: leftBarW + rightBarW,
          height: barH,
        }
        const customBarPos = positions[barId]
        const barBbox = {
          x: customBarPos?.x ?? defaultBarBbox.x,
          y: customBarPos?.y ?? defaultBarBbox.y,
          width: customBarPos?.width ?? defaultBarBbox.width,
          height: customBarPos?.height ?? defaultBarBbox.height,
        }
        const isBarSelected = selectedIds.has(barId)
        const barLeftColor = tplColors[`aspect-left-bar-${index}`] || aspect.leftColor || LEFT_COLOR
        const barRightColor = tplColors[`aspect-right-bar-${index}`] || aspect.rightColor || RIGHT_COLOR

        const r = barBbox.height / 2
        const midX = barBbox.x + (leftBarW / (leftBarW + rightBarW)) * barBbox.width
        const lx = barBbox.x
        const rx = barBbox.x + barBbox.width

        const leftPath = `M ${midX} ${barBbox.y} L ${lx + r} ${barBbox.y} A ${r} ${r} 0 0 0 ${lx} ${barBbox.y + r} L ${lx} ${barBbox.y + barBbox.height - r} A ${r} ${r} 0 0 0 ${lx + r} ${barBbox.y + barBbox.height} L ${midX} ${barBbox.y + barBbox.height} Z`
        const rightPath = `M ${midX} ${barBbox.y} L ${rx - r} ${barBbox.y} A ${r} ${r} 0 0 1 ${rx} ${barBbox.y + r} L ${rx} ${barBbox.y + barBbox.height - r} A ${r} ${r} 0 0 1 ${rx - r} ${barBbox.y + barBbox.height} L ${midX} ${barBbox.y + barBbox.height} Z`

        return (
          <g key={`aspect-row-${index}`}>
            {/* Left Percentage Badge */}
            <g
              data-element-id={leftBadgeId}
              onMouseDown={e => startDrag(e, leftBadgeId, leftBadgeBbox)}
              transform={getTransform(leftBadgeId, leftBadgeBbox)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={leftBadgeBbox.x + leftBadgeBbox.width / 2}
                cy={leftBadgeBbox.y + leftBadgeBbox.height / 2}
                r={Math.min(leftBadgeBbox.width, leftBadgeBbox.height) / 2}
                fill={leftBadgeColor}
                stroke={leftBadgeStroke}
                strokeWidth={leftBadgeStrokeWidth}
              />
              <text
                x={leftBadgeBbox.x + leftBadgeBbox.width / 2}
                y={leftBadgeBbox.y + leftBadgeBbox.height / 2 + 5}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={15}
                fontWeight={700}
                fill="white"
              >
                {leftPct}%
              </text>
              {isLeftBadgeSelected && renderHandles(leftBadgeBbox, leftBadgeId)}
            </g>

            {/* Central Bi-directional Bar & Label */}
            <g
              data-element-id={barId}
              onMouseDown={e => startDrag(e, barId, barBbox)}
              transform={getTransform(barId, barBbox)}
              style={{ cursor: 'pointer' }}
            >
              <path d={leftPath} fill={barLeftColor} />
              <path d={rightPath} fill={barRightColor} />
              {isBarSelected && (
                <rect
                  x={barBbox.x - 2}
                  y={barBbox.y - 2}
                  width={barBbox.width + 4}
                  height={barBbox.height + 4}
                  fill="none"
                  stroke="#4a90d9"
                  strokeWidth={2}
                  rx={r + 2}
                />
              )}
              <text
                x={midX}
                y={barBbox.y + barBbox.height / 2 + 5}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={15}
                fontWeight={700}
                fill="white"
              >
                {aspect.label}
              </text>
              {isBarSelected && renderHandles(barBbox, barId)}
            </g>

            {/* Right Percentage Badge */}
            <g
              data-element-id={rightBadgeId}
              onMouseDown={e => startDrag(e, rightBadgeId, rightBadgeBbox)}
              transform={getTransform(rightBadgeId, rightBadgeBbox)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={rightBadgeBbox.x + rightBadgeBbox.width / 2}
                cy={rightBadgeBbox.y + rightBadgeBbox.height / 2}
                r={Math.min(rightBadgeBbox.width, rightBadgeBbox.height) / 2}
                fill={rightBadgeColor}
                stroke={rightBadgeStroke}
                strokeWidth={rightBadgeStrokeWidth}
              />
              <text
                x={rightBadgeBbox.x + rightBadgeBbox.width / 2}
                y={rightBadgeBbox.y + rightBadgeBbox.height / 2 + 5}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={15}
                fontWeight={700}
                fill="white"
              >
                {rightPct}%
              </text>
              {isRightBadgeSelected && renderHandles(rightBadgeBbox, rightBadgeId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
