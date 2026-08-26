import { useRef, type ReactElement } from 'react'
import type { ValueChainData, ValueChainActivity } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'

const DEFAULT_SUPPORT_COLORS = ['#1a2249', '#2b63d9', '#ff5338', '#ffb100']
const DEFAULT_PRIMARY_COLORS = ['#1a2249', '#2b63d9', '#ff5338', '#ffb100', '#48bb95']

const DEFAULT_SUPPORT_TITLES = [
  'Firm infrastructure',
  'Human resource management',
  'Technology development',
  'Procurement',
]

const DEFAULT_PRIMARY_TITLES = [
  'Inbound Logistics',
  'Operations',
  'Outbound Logistics',
  'Marketing And sales',
  'Service',
]

export function ValueChainTemplate({ data }: { data: ValueChainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const supportData: ValueChainActivity[] = data.support && data.support.length > 0
    ? data.support
    : DEFAULT_SUPPORT_TITLES.map((title, i) => ({ title, color: DEFAULT_SUPPORT_COLORS[i % DEFAULT_SUPPORT_COLORS.length] }))

  const primaryData: ValueChainActivity[] = data.primary && data.primary.length > 0
    ? data.primary
    : DEFAULT_PRIMARY_TITLES.map((title, i) => ({ title, color: DEFAULT_PRIMARY_COLORS[i % DEFAULT_PRIMARY_COLORS.length] }))

  const startX = 110
  const mainW = 760
  const marginW = 100
  const startY = 40

  const supportCount = Math.max(1, supportData.length)
  const primaryCount = Math.max(1, primaryData.length)

  const supportH = 46
  const supportGap = 2
  const totalSupportH = supportCount * supportH + (supportCount - 1) * supportGap

  const primaryTopY = startY + totalSupportH + 2
  const primaryH = 190
  const primaryGap = 2
  const primaryColW = (mainW - (primaryCount - 1) * primaryGap) / primaryCount
  const totalH = totalSupportH + 2 + primaryH

  const chevronPeakOffset = 50
  const supportCenterY = startY + totalSupportH / 2
  const primaryCenterX = startX + mainW / 2
  const primaryBottomLabelY = primaryTopY + primaryH + 28

  const axisSupportId = 'axis-support'
  const customAxisSupportPos = positions[axisSupportId]
  const defaultAxisSupportRect = { x: startX - 45, y: supportCenterY, width: 30, height: totalSupportH }
  const axisSupportBbox = {
    x: customAxisSupportPos ? customAxisSupportPos.x : defaultAxisSupportRect.x,
    y: customAxisSupportPos ? customAxisSupportPos.y : defaultAxisSupportRect.y,
    width: customAxisSupportPos?.width || defaultAxisSupportRect.width,
    height: customAxisSupportPos?.height || defaultAxisSupportRect.height,
  }
  const isAxisSupportSelected = selectedIds.has(axisSupportId)
  const axisSupportColor = tplColors[axisSupportId] || '#1a2249'

  const axisPrimaryId = 'axis-primary'
  const customAxisPrimaryPos = positions[axisPrimaryId]
  const defaultAxisPrimaryRect = { x: primaryCenterX - 100, y: primaryBottomLabelY - 14, width: 200, height: 28 }
  const axisPrimaryBbox = {
    x: customAxisPrimaryPos ? customAxisPrimaryPos.x : defaultAxisPrimaryRect.x,
    y: customAxisPrimaryPos ? customAxisPrimaryPos.y : defaultAxisPrimaryRect.y,
    width: customAxisPrimaryPos?.width || defaultAxisPrimaryRect.width,
    height: customAxisPrimaryPos?.height || defaultAxisPrimaryRect.height,
  }
  const isAxisPrimarySelected = selectedIds.has(axisPrimaryId)
  const axisPrimaryColor = tplColors[axisPrimaryId] || '#1a2249'

  return (
    <g ref={svgRef}>
      <g
        data-element-id={axisSupportId}
        onMouseDown={e => startDrag(e, axisSupportId, axisSupportBbox)}
        transform={getTransform(axisSupportId, axisSupportBbox)}
        style={{ cursor: 'pointer' }}
      >
        <text
          x={axisSupportBbox.x}
          y={axisSupportBbox.y}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={17}
          fontWeight={700}
          fill={axisSupportColor}
          transform={`rotate(-90, ${axisSupportBbox.x}, ${axisSupportBbox.y})`}
        >
          Support activities
        </text>
        {isAxisSupportSelected && renderHandles(axisSupportBbox, axisSupportId)}
      </g>

      <g
        data-element-id={axisPrimaryId}
        onMouseDown={e => startDrag(e, axisPrimaryId, axisPrimaryBbox)}
        transform={getTransform(axisPrimaryId, axisPrimaryBbox)}
        style={{ cursor: 'pointer' }}
      >
        <text
          x={axisPrimaryBbox.x + axisPrimaryBbox.width / 2}
          y={axisPrimaryBbox.y + axisPrimaryBbox.height / 2 + 5}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={17}
          fontWeight={700}
          fill={axisPrimaryColor}
        >
          Primary activities
        </text>
        {isAxisPrimarySelected && renderHandles(axisPrimaryBbox, axisPrimaryId)}
      </g>

      {supportData.map((act, index) => {
        const elementId = `support-${index}`
        const y = startY + index * (supportH + supportGap)
        const rowTopY = y - startY
        const rowBottomY = y + supportH - startY
        const rightOffsetTop = (rowTopY / totalH) * chevronPeakOffset
        const rightOffsetBottom = (rowBottomY / totalH) * chevronPeakOffset

        const defaultRect = { x: startX, y, width: mainW + rightOffsetBottom, height: supportH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }

        const defaultColor = act.color || DEFAULT_SUPPORT_COLORS[index % DEFAULT_SUPPORT_COLORS.length]!
        const color = tplColors[elementId] ?? defaultColor
        const strokeColor = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2 : 0)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = act.icon ? TEMPLATE_ICONS[act.icon] : undefined

        const pTopLeft = `${bbox.x},${bbox.y}`
        const pTopRight = `${bbox.x + bbox.width - (rightOffsetBottom - rightOffsetTop)},${bbox.y}`
        const pBottomRight = `${bbox.x + bbox.width},${bbox.y + bbox.height}`
        const pBottomLeft = `${bbox.x},${bbox.y + bbox.height}`
        const polyPoints = `${pTopLeft} ${pTopRight} ${pBottomRight} ${pBottomLeft}`

        const maxChars = Math.max(10, Math.floor((bbox.width - 60) / 9))
        const titleLines = wrapTextByWidth(act.title, maxChars)
        const textCenterX = bbox.x + bbox.width * 0.46
        const textCenterY = bbox.y + bbox.height / 2 + (titleLines.length > 1 ? -4 : 5)

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <polygon
                points={polyPoints}
                fill={color}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />

              {IconComponent && (
                <g transform={`translate(${bbox.x + 20}, ${bbox.y + bbox.height / 2 - 10})`}>
                  <IconComponent size={20} color="#ffffff" />
                </g>
              )}

              <text
                x={textCenterX}
                y={textCenterY}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={15}
                fontWeight={700}
                fill="#ffffff"
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={textCenterX} dy={lineIndex === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      {primaryData.map((act, index) => {
        const elementId = `primary-${index}`
        const x = startX + index * (primaryColW + primaryGap)
        const isLast = index === primaryCount - 1
        const defaultWidth = primaryColW + (isLast ? chevronPeakOffset : 0)
        const defaultRect = { x, y: primaryTopY, width: defaultWidth, height: primaryH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }

        const defaultColor = act.color || DEFAULT_PRIMARY_COLORS[index % DEFAULT_PRIMARY_COLORS.length]!
        const color = tplColors[elementId] ?? defaultColor
        const strokeColor = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2 : 0)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = act.icon ? TEMPLATE_ICONS[act.icon] : undefined

        const textCenterX = bbox.x + (isLast ? (bbox.width - chevronPeakOffset) / 2 : bbox.width / 2)
        const maxChars = Math.max(6, Math.floor((bbox.width - 24) / 9))
        const nameLines = wrapTextByWidth(act.title, maxChars)
        const textCenterY = bbox.y + bbox.height / 2 - (nameLines.length - 1) * 8 + 4

        let polyPoints = ''
        if (isLast) {
          const topL = `${bbox.x},${bbox.y}`
          const topR = `${bbox.x + bbox.width},${bbox.y}`
          const botR = `${bbox.x + bbox.width - chevronPeakOffset},${bbox.y + bbox.height}`
          const botL = `${bbox.x},${bbox.y + bbox.height}`
          polyPoints = `${topL} ${topR} ${botR} ${botL}`
        }

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              {isLast ? (
                <polygon points={polyPoints} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
              ) : (
                <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
              )}

              {IconComponent && (
                <g transform={`translate(${textCenterX - 12}, ${bbox.y + 24})`}>
                  <IconComponent size={24} color="#ffffff" />
                </g>
              )}

              <text
                x={textCenterX}
                y={IconComponent ? bbox.y + 70 : textCenterY}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={15}
                fontWeight={700}
                fill="#ffffff"
              >
                {nameLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={textCenterX} dy={lineIndex === 0 ? 0 : 18}>
                    {line}
                  </tspan>
                ))}
              </text>

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      {(() => {
        const marginId = 'margin-wedge'
        const mx = startX + mainW + 3
        const defaultRect = { x: mx, y: startY, width: marginW, height: totalH }
        const customPos = positions[marginId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(marginId)
        const wedgeColor = tplColors[marginId] || '#48bb95'
        const strokeColor = tplStrokeColors[marginId] || (isSelected ? '#2b63d9' : 'none')
        const strokeWidth = tplStrokeWidths[marginId] ?? (isSelected ? 2.5 : 0)

        const topX = bbox.x
        const topY = bbox.y
        const tipX = bbox.x + chevronPeakOffset
        const tipY = bbox.y + totalSupportH
        const botX = bbox.x
        const botY = bbox.y + bbox.height

        const p1X = bbox.x + bbox.width - chevronPeakOffset
        const p1Y = bbox.y
        const p2X = bbox.x + bbox.width
        const p2Y = bbox.y + totalSupportH
        const p3X = bbox.x + bbox.width - chevronPeakOffset
        const p3Y = bbox.y + bbox.height

        const chevronPath = `M ${topX} ${topY} L ${p1X} ${p1Y} L ${p2X} ${p2Y} L ${p3X} ${p3Y} L ${botX} ${botY} L ${tipX} ${tipY} Z`

        const topArmMidX = (topX + p1X + tipX + p2X) / 4 + 4
        const topArmMidY = (topY + p1Y + tipY + p2Y) / 4 - 6
        const botArmMidX = (botX + p3X + tipX + p2X) / 4 + 4
        const botArmMidY = (botY + p3Y + tipY + p2Y) / 4 + 6

        const angleRad = Math.atan2(totalSupportH, chevronPeakOffset)
        const angleDeg = (angleRad * 180) / Math.PI

        return (
          <g
            key={marginId}
            data-element-id={marginId}
            onMouseDown={e => startDrag(e, marginId, bbox)}
            transform={getTransform(marginId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path
              d={chevronPath}
              fill={wedgeColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

            <text
              x={topArmMidX}
              y={topArmMidY}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={17}
              fontWeight={700}
              fill="#ffffff"
              transform={`rotate(${angleDeg}, ${topArmMidX}, ${topArmMidY})`}
            >
              Margin
            </text>

            <text
              x={botArmMidX}
              y={botArmMidY}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={17}
              fontWeight={700}
              fill="#ffffff"
              transform={`rotate(${-angleDeg}, ${botArmMidX}, ${botArmMidY})`}
            >
              Margin
            </text>

            {isSelected && renderHandles(bbox, marginId)}
          </g>
        )
      })()}
    </g>
  )
}