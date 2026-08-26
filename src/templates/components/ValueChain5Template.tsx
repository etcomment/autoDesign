import { useRef, type ReactElement } from 'react'
import type { ValueChain5Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'

const DEFAULT_LEFT_COLORS = ['#1a2249', '#2b63d9', '#1a2249']
const DEFAULT_CENTER_COLOR = '#ff5338'
const DEFAULT_CHEVRON1_COLOR = '#ffb100'
const DEFAULT_CHEVRON2_COLOR = '#48bb95'

export function ValueChain5Template({ data }: { data: ValueChain5Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const leftBlocks = data.leftBlocks ?? [
    { title: 'Your\ntext here' },
    { title: 'Your\ntext here' },
    { title: 'Your\ntext here' },
  ]

  const centerBars = data.centerBars ?? [
    { title: 'Your text here' },
    { title: 'Your text here' },
    { title: 'Your text here' },
    { title: 'Your text here' },
    { title: 'Your text here' },
    { title: 'Your text here' },
  ]

  const rightChevrons = data.rightChevrons ?? [
    { title: 'Your text here', subtitle: 'Your text here' },
    { title: 'Your text here', subtitle: 'Your text here' },
  ]

  const startX = 80
  const startY = 100
  const totalH = 340
  const gap = 8

  const leftW = 160
  const leftCount = Math.max(1, leftBlocks.length)
  const leftBlockH = (totalH - (leftCount - 1) * gap) / leftCount
  const arrowIndent = 36

  const centerStartX = startX + leftW + gap
  const centerCount = Math.max(1, centerBars.length)
  const centerBarH = (totalH - (centerCount - 1) * gap) / centerCount
  const centerBaseW = 400
  const centerTipExtend = 70
  const midIndex = (centerCount - 1) / 2

  const chevron1StartX = centerStartX + centerBaseW + 12
  const chevronW = 46
  const chevronGap = 12
  const chevronSlopeX = centerTipExtend + 16

  return (
    <g ref={svgRef}>
      {/* Left Blocks */}
      {leftBlocks.map((blk, index) => {
        const elementId = `left-block-${index}`
        const y = startY + index * (leftBlockH + gap)
        const defaultRect = { x: startX, y, width: leftW + (index === 1 ? arrowIndent : 0), height: leftBlockH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(elementId)
        const defaultColor = blk.color || DEFAULT_LEFT_COLORS[index % DEFAULT_LEFT_COLORS.length]!
        const color = tplColors[elementId] || defaultColor
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        let pathD = ''
        if (index === 0) {
          pathD = `M ${bbox.x} ${bbox.y} L ${bbox.x + leftW - arrowIndent} ${bbox.y} L ${bbox.x + leftW} ${bbox.y + bbox.height} L ${bbox.x} ${bbox.y + bbox.height} Z`
        } else if (index === 1) {
          pathD = `M ${bbox.x} ${bbox.y} L ${bbox.x + leftW} ${bbox.y} L ${bbox.x + leftW + arrowIndent} ${bbox.y + bbox.height / 2} L ${bbox.x + leftW} ${bbox.y + bbox.height} L ${bbox.x} ${bbox.y + bbox.height} Z`
        } else {
          pathD = `M ${bbox.x} ${bbox.y} L ${bbox.x + leftW} ${bbox.y} L ${bbox.x + leftW - arrowIndent} ${bbox.y + bbox.height} L ${bbox.x} ${bbox.y + bbox.height} Z`
        }

        const lines = blk.title.split('\n')
        const textCx = bbox.x + (leftW - arrowIndent / 2) / 2
        const textCy = bbox.y + bbox.height / 2

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <path d={pathD} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
              <text
                x={textCx}
                y={textCy - (lines.length - 1) * 9 + 4}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={14}
                fontWeight={700}
                fill="white"
              >
                {lines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={textCx} dy={lineIndex === 0 ? 0 : 18}>
                    {line}
                  </tspan>
                ))}
              </text>
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      {/* Center Bars */}
      {centerBars.map((bar, index) => {
        const elementId = `center-bar-${index}`
        const y = startY + index * (centerBarH + gap)

        let leftInsetTop = 0
        let leftInsetBot = 0
        const barMid = index + 0.5
        if (barMid <= 2) {
          leftInsetTop = (index / 2) * arrowIndent
          leftInsetBot = ((index + 1) / 2) * arrowIndent
        } else if (barMid <= 4) {
          leftInsetTop = arrowIndent
          leftInsetBot = arrowIndent
        } else {
          leftInsetTop = ((6 - index) / 2) * arrowIndent
          leftInsetBot = ((5 - index) / 2) * arrowIndent
        }

        const distFromCenterTop = Math.abs(index - midIndex) / midIndex
        const distFromCenterBot = Math.abs(index + 1 - midIndex) / midIndex
        const rightExtendTop = (1 - distFromCenterTop) * centerTipExtend
        const rightExtendBot = (1 - distFromCenterBot) * centerTipExtend

        const leftTopX = centerStartX + leftInsetTop
        const leftBotX = centerStartX + leftInsetBot
        const rightTopX = centerStartX + centerBaseW + rightExtendTop
        const rightBotX = centerStartX + centerBaseW + rightExtendBot

        const defaultRect = { x: Math.min(leftTopX, leftBotX), y, width: Math.max(rightTopX, rightBotX) - Math.min(leftTopX, leftBotX), height: centerBarH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(elementId)
        const defaultColor = bar.color || DEFAULT_CENTER_COLOR
        const color = tplColors[elementId] || defaultColor
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        const barD = `M ${leftTopX} ${y} L ${rightTopX} ${y} L ${rightBotX} ${y + centerBarH} L ${leftBotX} ${y + centerBarH} Z`
        const textCx = (leftTopX + rightTopX + leftBotX + rightBotX) / 4
        const textCy = y + centerBarH / 2 + 5

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <path d={barD} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
              <text
                x={textCx}
                y={textCy}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={14}
                fontWeight={700}
                fill="white"
              >
                {bar.title}
              </text>
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      {/* Right Chevron 1 (Yellow) */}
      {(() => {
        const elementId = 'right-chevron-0'
        const act = rightChevrons[0] ?? { title: 'Your text here', subtitle: 'Your text here' }
        const topY = startY
        const botY = startY + totalH
        const midY = startY + totalH / 2

        const p1_x = chevron1StartX
        const p1_y = topY
        const p2_x = chevron1StartX + chevronW
        const p2_y = topY
        const p3_x = chevron1StartX + chevronW + chevronSlopeX
        const p3_y = midY
        const p4_x = chevron1StartX + chevronW
        const p4_y = botY
        const p5_x = chevron1StartX
        const p5_y = botY
        const p6_x = chevron1StartX + chevronSlopeX
        const p6_y = midY

        const defaultRect = { x: p1_x, y: topY, width: chevronW + chevronSlopeX, height: totalH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(elementId)
        const defaultColor = act.color || DEFAULT_CHEVRON1_COLOR
        const color = tplColors[elementId] || defaultColor
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        const pathD = `M ${p1_x} ${p1_y} L ${p2_x} ${p2_y} L ${p3_x} ${p3_y} L ${p4_x} ${p4_y} L ${p5_x} ${p5_y} L ${p6_x} ${p6_y} Z`

        const upperTextCx = p1_x + chevronW / 2 + chevronSlopeX * 0.45
        const upperTextCy = topY + totalH * 0.23
        const lowerTextCx = p5_x + chevronW / 2 + chevronSlopeX * 0.45
        const lowerTextCy = botY - totalH * 0.23

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <path d={pathD} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />

              <text
                x={upperTextCx}
                y={upperTextCy}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={700}
                fill="white"
                transform={`rotate(58, ${upperTextCx}, ${upperTextCy})`}
              >
                {act.title}
              </text>

              {act.subtitle && (
                <text
                  x={lowerTextCx}
                  y={lowerTextCy}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={13}
                  fontWeight={700}
                  fill="white"
                  transform={`rotate(-58, ${lowerTextCx}, ${lowerTextCy})`}
                >
                  {act.subtitle}
                </text>
              )}

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })()}

      {/* Right Chevron 2 (Green) */}
      {(() => {
        const elementId = 'right-chevron-1'
        const act = rightChevrons[1] ?? { title: 'Your text here', subtitle: 'Your text here' }
        const c2StartX = chevron1StartX + chevronW + chevronGap
        const topY = startY - 26
        const botY = startY + totalH + 26
        const midY = startY + totalH / 2
        const c2SlopeX = chevronSlopeX + 16

        const p1_x = c2StartX
        const p1_y = topY
        const p2_x = c2StartX + chevronW + 16
        const p2_y = topY
        const p3_x = c2StartX + chevronW + 16 + c2SlopeX
        const p3_y = midY
        const p4_x = c2StartX + chevronW + 16
        const p4_y = botY
        const p5_x = c2StartX
        const p5_y = botY
        const p6_x = c2StartX + c2SlopeX
        const p6_y = midY

        const defaultRect = { x: p1_x, y: topY, width: chevronW + 16 + c2SlopeX, height: botY - topY }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(elementId)
        const defaultColor = act.color || DEFAULT_CHEVRON2_COLOR
        const color = tplColors[elementId] || defaultColor
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        const pathD = `M ${p1_x} ${p1_y} L ${p2_x} ${p2_y} L ${p3_x} ${p3_y} L ${p4_x} ${p4_y} L ${p5_x} ${p5_y} L ${p6_x} ${p6_y} Z`

        const upperTextCx = p1_x + (chevronW + 16) / 2 + c2SlopeX * 0.45
        const upperTextCy = topY + (botY - topY) * 0.23
        const lowerTextCx = p5_x + (chevronW + 16) / 2 + c2SlopeX * 0.45
        const lowerTextCy = botY - (botY - topY) * 0.23

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <path d={pathD} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />

              <text
                x={upperTextCx}
                y={upperTextCy}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={14}
                fontWeight={700}
                fill="white"
                transform={`rotate(58, ${upperTextCx}, ${upperTextCy})`}
              >
                {act.title}
              </text>

              {act.subtitle && (
                <text
                  x={lowerTextCx}
                  y={lowerTextCy}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={14}
                  fontWeight={700}
                  fill="white"
                  transform={`rotate(-58, ${lowerTextCx}, ${lowerTextCy})`}
                >
                  {act.subtitle}
                </text>
              )}

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })()}
    </g>
  )
}
