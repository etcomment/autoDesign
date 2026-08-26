import { useRef, type ReactElement } from 'react'
import type { ValueChain4Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'

const DEFAULT_UPPER_COLORS = ['#57c5a0', '#1a2249', '#57c5a0', '#1a2249']
const DEFAULT_LOWER_COLOR = '#ffb100'
const DEFAULT_CHEVRON_COLOR = '#ff5338'
const DEFAULT_CENTER_COLOR = '#2b63d9'

export function ValueChain4Template({ data }: { data: ValueChain4Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const primary = data.primary ?? [
    { title: 'Strategy to portfolio', subtitle: 'Plan' },
    { title: 'Requirement to deploy', subtitle: 'Build' },
    { title: 'Request to fulfill', subtitle: 'Deliver' },
    { title: 'Detect to correct', subtitle: 'Run' },
  ]

  const support = data.support ?? [
    { title: 'Governance risk & compliance' },
    { title: 'Sourcing & vendor' },
    { title: 'Intelligence & reporting' },
    { title: 'Finance & assets' },
    { title: 'Resource & project' },
  ]

  const rightLabel = data.rightLabel ?? 'Efficiency\n& Agility'
  const centerLabel = data.centerLabel ?? 'Reference architecture'
  const upperLabel = data.upperLabel ?? 'Value streams'
  const lowerLabel = data.lowerLabel ?? 'Supporting activities'

  const slant = 100
  const upperCount = Math.max(1, primary.length)
  const lowerCount = Math.max(1, support.length)

  const upperX = 145
  const upperY = 110
  const upperH = 150
  const upperGap = 10
  const upperTotalW = 460
  const upperBlockW = (upperTotalW - (upperCount - 1) * upperGap) / upperCount

  const arrowX = 145
  const arrowY = 270
  const arrowW = 475
  const arrowH = 26
  const arrowHeadW = 32

  const lowerX = 60
  const lowerY = 306
  const lowerTotalH = 150
  const lowerGap = 6
  const lowerRowH = (lowerTotalH - (lowerCount - 1) * lowerGap) / lowerCount
  const lowerBaseW = 560

  const chevronW = 48
  const chevronX = upperX + upperTotalW + slant + 14
  const chevronTopY = upperY
  const chevronMidY = arrowY + arrowH / 2
  const chevronBotY = lowerY + lowerTotalH

  const chevronPath = `M ${chevronX} ${chevronTopY} L ${chevronX + chevronW} ${chevronTopY} L ${chevronX + slant + chevronW} ${chevronMidY} L ${chevronX + chevronW} ${chevronBotY} L ${chevronX} ${chevronBotY} L ${chevronX + slant} ${chevronMidY} Z`

  const bgX = 20
  const bgY = 95
  const bgW = 680
  const bgH = 375
  const bgSlant = 105
  const bgMidY = arrowY + arrowH / 2
  const bgPath = `M ${bgX} ${bgY} L ${bgX + bgW} ${bgY} L ${bgX + bgW + bgSlant} ${bgMidY} L ${bgX + bgW} ${bgY + bgH} L ${bgX} ${bgY + bgH} Z`

  return (
    <g ref={svgRef}>
      <path d={bgPath} fill="#eceef1" />

      {/* Upper Label */}
      {(() => {
        const elementId = 'upper-label'
        const bbox = { x: 30, y: 150, width: 120, height: 40 }
        const customPos = positions[elementId]
        const actualBbox = {
          x: customPos ? customPos.x : bbox.x,
          y: customPos ? customPos.y : bbox.y,
          width: customPos?.width || bbox.width,
          height: customPos?.height || bbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const color = tplColors[elementId] || '#1a2249'
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, actualBbox)}
            transform={getTransform(elementId, actualBbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={actualBbox.x} y={actualBbox.y} width={actualBbox.width} height={actualBbox.height} fill="transparent" stroke={strokeColor} strokeWidth={strokeWidth} />
            <text
              x={actualBbox.x + actualBbox.width / 2}
              y={actualBbox.y + actualBbox.height / 2 + 5}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={15}
              fontWeight={700}
              fill={color}
              transform={`rotate(56, ${actualBbox.x + actualBbox.width / 2}, ${actualBbox.y + actualBbox.height / 2 + 5})`}
            >
              {upperLabel}
            </text>
            {isSelected && renderHandles(actualBbox, elementId)}
          </g>
        )
      })()}

      {/* Upper Blocks (Value Streams) */}
      {primary.map((act, index) => {
        const elementId = `upper-block-${index}`
        const bx = upperX + index * (upperBlockW + upperGap)
        const defaultRect = { x: bx, y: upperY, width: upperBlockW + slant, height: upperH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(elementId)
        const defaultColor = act.color || DEFAULT_UPPER_COLORS[index % DEFAULT_UPPER_COLORS.length]!
        const color = tplColors[elementId] || defaultColor
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        const topL_X = bbox.x
        const topR_X = bbox.x + upperBlockW
        const botL_X = bbox.x + slant
        const botR_X = bbox.x + upperBlockW + slant
        const pD = `M ${topL_X} ${bbox.y} L ${topR_X} ${bbox.y} L ${botR_X} ${bbox.y + bbox.height} L ${botL_X} ${bbox.y + bbox.height} Z`

        const textCenterX = bbox.x + upperBlockW / 2 + slant * 0.42
        const textCenterY = bbox.y + bbox.height * 0.44

        const maxChars = Math.max(10, Math.floor(bbox.height / 10))
        const titleLines = wrapTextByWidth(act.title, maxChars)

        const phaseX = bbox.x + slant + upperBlockW / 2
        const phaseY = bbox.y + bbox.height - 12

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <path d={pD} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />

              <g transform={`rotate(56, ${textCenterX}, ${textCenterY})`}>
                <text
                  x={textCenterX}
                  y={textCenterY - (titleLines.length - 1) * 7}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fontWeight={600}
                  fill="white"
                >
                  {titleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={textCenterX} dy={lineIndex === 0 ? 0 : 14}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>

              {act.subtitle && (
                <text
                  x={phaseX}
                  y={phaseY}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={13}
                  fontWeight={700}
                  fill="white"
                >
                  {act.subtitle}
                </text>
              )}

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      {/* Center Arrow */}
      {(() => {
        const elementId = 'center-arrow'
        const defaultRect = { x: arrowX, y: arrowY, width: arrowW, height: arrowH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(elementId)
        const arrowColor = tplColors[elementId] || DEFAULT_CENTER_COLOR
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        const mainRightX = bbox.x + bbox.width - arrowHeadW
        const tipX = bbox.x + bbox.width
        const midY = bbox.y + bbox.height / 2
        const headTopY = bbox.y - 6
        const headBotY = bbox.y + bbox.height + 6

        const arrowPathD = `M ${bbox.x} ${bbox.y} L ${mainRightX} ${bbox.y} L ${mainRightX} ${headTopY} L ${tipX} ${midY} L ${mainRightX} ${headBotY} L ${mainRightX} ${bbox.y + bbox.height} L ${bbox.x} ${bbox.y + bbox.height} Z`

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path d={arrowPathD} fill={arrowColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            <text
              x={bbox.x + (bbox.width - arrowHeadW) / 2}
              y={bbox.y + bbox.height / 2 + 5}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={14}
              fontWeight={700}
              fill="white"
            >
              {centerLabel}
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })()}

      {/* Lower Label */}
      {(() => {
        const elementId = 'lower-label'
        const bbox = { x: 35, y: 355, width: 150, height: 40 }
        const customPos = positions[elementId]
        const actualBbox = {
          x: customPos ? customPos.x : bbox.x,
          y: customPos ? customPos.y : bbox.y,
          width: customPos?.width || bbox.width,
          height: customPos?.height || bbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const color = tplColors[elementId] || '#1a2249'
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, actualBbox)}
            transform={getTransform(elementId, actualBbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={actualBbox.x} y={actualBbox.y} width={actualBbox.width} height={actualBbox.height} fill="transparent" stroke={strokeColor} strokeWidth={strokeWidth} />
            <text
              x={actualBbox.x + actualBbox.width / 2}
              y={actualBbox.y + actualBbox.height / 2 + 5}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={13}
              fontWeight={700}
              fill={color}
              transform={`rotate(-56, ${actualBbox.x + actualBbox.width / 2}, ${actualBbox.y + actualBbox.height / 2 + 5})`}
            >
              {lowerLabel}
            </text>
            {isSelected && renderHandles(actualBbox, elementId)}
          </g>
        )
      })()}

      {/* Lower Bars (Supporting Activities) */}
      {support.map((act, index) => {
        const elementId = `lower-bar-${index}`
        const rowY = lowerY + index * (lowerRowH + lowerGap)
        const rowSlantProgressTop = (index * (lowerRowH + lowerGap)) / lowerTotalH
        const rowSlantProgressBot = ((index + 1) * lowerRowH + index * lowerGap) / lowerTotalH

        const leftTopX = lowerX + (1 - rowSlantProgressTop) * slant
        const leftBotX = lowerX + (1 - rowSlantProgressBot) * slant
        const rightTopX = lowerX + lowerBaseW - rowSlantProgressTop * slant
        const rightBotX = lowerX + lowerBaseW - rowSlantProgressBot * slant

        const defaultRect = { x: Math.min(leftTopX, leftBotX), y: rowY, width: Math.max(rightTopX, rightBotX) - Math.min(leftTopX, leftBotX), height: lowerRowH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(elementId)
        const defaultColor = act.color || DEFAULT_LOWER_COLOR
        const color = tplColors[elementId] || defaultColor
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        const barPathD = `M ${leftTopX} ${rowY} L ${rightTopX} ${rowY} L ${rightBotX} ${rowY + lowerRowH} L ${leftBotX} ${rowY + lowerRowH} Z`
        const textCenterX = (leftTopX + rightTopX + leftBotX + rightBotX) / 4
        const textCenterY = rowY + lowerRowH / 2 + 4

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <path d={barPathD} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
              <text
                x={textCenterX}
                y={textCenterY}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={600}
                fill="white"
              >
                {act.title}
              </text>
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      {/* Right Orange/Red Chevron */}
      {(() => {
        const elementId = 'right-chevron'
        const defaultRect = { x: chevronX, y: chevronTopY, width: chevronW + slant, height: chevronBotY - chevronTopY }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(elementId)
        const chevronColor = tplColors[elementId] || DEFAULT_CHEVRON_COLOR
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path d={chevronPath} fill={chevronColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })()}

      {/* Right Label (Efficiency & Agility) */}
      {(() => {
        const elementId = 'right-label'
        const defaultRect = { x: 800, y: 260, width: 140, height: 60 }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(elementId)
        const textColor = tplColors[elementId] || '#1a2249'
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        const lines = rightLabel.split('\n')

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} fill="transparent" stroke={strokeColor} strokeWidth={strokeWidth} />
            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y + bbox.height / 2 - (lines.length - 1) * 9}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={18}
              fontWeight={800}
              fill={textColor}
            >
              {lines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + bbox.width / 2} dy={lineIndex === 0 ? 0 : 22}>
                  {line}
                </tspan>
              ))}
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })()}
    </g>
  )
}
