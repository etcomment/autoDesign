import { useRef, type ReactElement } from 'react'
import type { ValueChainData, ValueChainActivity } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'

const DEFAULT_PRIMARY_COLORS = ['#1a2249', '#2b63d9', '#ff5338', '#ffb100', '#48bb95']
const DEFAULT_SUPPORT_COLORS = ['#7b9fd9', '#2b63d9', '#1e4ea8', '#152759']

const DEFAULT_PRIMARY_ACTIVITIES = [
  { title: 'Inbound Logistics', icon: 'truck' },
  { title: 'Operations', icon: 'package' },
  { title: 'Outbound Logistics', icon: 'truck' },
  { title: 'Marketing And sales', icon: 'people' },
  { title: 'Service', icon: 'handshake' },
]

const DEFAULT_SUPPORT_ACTIVITIES = [
  { title: 'Firm infrastructure' },
  { title: 'Human resource management' },
  { title: 'Technology development' },
  { title: 'Procurement' },
]

export function ValueChain2Template({ data }: { data: ValueChainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const primaryData: ValueChainActivity[] = data.primary && data.primary.length > 0
    ? data.primary
    : DEFAULT_PRIMARY_ACTIVITIES.map((act, i) => ({
        ...act,
        color: DEFAULT_PRIMARY_COLORS[i % DEFAULT_PRIMARY_COLORS.length],
      }))

  const supportData: ValueChainActivity[] = data.support && data.support.length > 0
    ? data.support
    : DEFAULT_SUPPORT_ACTIVITIES.map((act, i) => ({
        ...act,
        color: DEFAULT_SUPPORT_COLORS[i % DEFAULT_SUPPORT_COLORS.length],
      }))

  const startX = 110
  const mainW = 730
  const marginW = 190
  const startY = 40

  const primaryCount = Math.max(1, primaryData.length)
  const supportCount = Math.max(1, supportData.length)

  const primaryH = 190
  const primaryGap = 2
  const primaryColW = (mainW - (primaryCount - 1) * primaryGap) / primaryCount

  const supportTopY = startY + primaryH + 2
  const supportH = 46
  const supportGap = 2
  const totalSupportH = supportCount * supportH + (supportCount - 1) * supportGap
  const totalH = primaryH + 2 + totalSupportH

  const primaryCenterY = startY + primaryH / 2
  const supportCenterX = startX + mainW / 2
  const supportBottomY = supportTopY + totalSupportH + 24

  const axisPrimaryId = 'axis-primary'
  const customAxisPrimaryPos = positions[axisPrimaryId]
  const defaultAxisPrimaryRect = { x: startX - 45, y: primaryCenterY, width: 30, height: primaryH }
  const axisPrimaryBbox = {
    x: customAxisPrimaryPos ? customAxisPrimaryPos.x : defaultAxisPrimaryRect.x,
    y: customAxisPrimaryPos ? customAxisPrimaryPos.y : defaultAxisPrimaryRect.y,
    width: customAxisPrimaryPos?.width || defaultAxisPrimaryRect.width,
    height: customAxisPrimaryPos?.height || defaultAxisPrimaryRect.height,
  }
  const isAxisPrimarySelected = selectedIds.has(axisPrimaryId)
  const axisPrimaryColor = tplColors[axisPrimaryId] || '#1a2249'

  const axisSupportId = 'axis-support'
  const customAxisSupportPos = positions[axisSupportId]
  const defaultAxisSupportRect = { x: startX, y: supportBottomY - 14, width: mainW, height: 28 }
  const axisSupportBbox = {
    x: customAxisSupportPos ? customAxisSupportPos.x : defaultAxisSupportRect.x,
    y: customAxisSupportPos ? customAxisSupportPos.y : defaultAxisSupportRect.y,
    width: customAxisSupportPos?.width || defaultAxisSupportRect.width,
    height: customAxisSupportPos?.height || defaultAxisSupportRect.height,
  }
  const isAxisSupportSelected = selectedIds.has(axisSupportId)
  const axisSupportColor = tplColors[axisSupportId] || '#1a2249'

  return (
    <g ref={svgRef}>
      <g
        data-element-id={axisPrimaryId}
        onMouseDown={e => startDrag(e, axisPrimaryId, axisPrimaryBbox)}
        transform={getTransform(axisPrimaryId, axisPrimaryBbox)}
        style={{ cursor: 'pointer' }}
      >
        <text
          x={axisPrimaryBbox.x}
          y={axisPrimaryBbox.y}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={17}
          fontWeight={700}
          fill={axisPrimaryColor}
          transform={`rotate(-90, ${axisPrimaryBbox.x}, ${axisPrimaryBbox.y})`}
        >
          Primary activities
        </text>
        {isAxisPrimarySelected && renderHandles(axisPrimaryBbox, axisPrimaryId)}
      </g>

      <g
        data-element-id={axisSupportId}
        onMouseDown={e => startDrag(e, axisSupportId, axisSupportBbox)}
        transform={getTransform(axisSupportId, axisSupportBbox)}
        style={{ cursor: 'pointer' }}
      >
        {(() => {
          const arrowLineY = axisSupportBbox.y + axisSupportBbox.height / 2
          const leftLineEndX = axisSupportBbox.x + axisSupportBbox.width * 0.33
          const rightLineStartX = axisSupportBbox.x + axisSupportBbox.width * 0.67
          const rightLineEndX = axisSupportBbox.x + axisSupportBbox.width

          return (
            <g>
              <line
                x1={axisSupportBbox.x + 12}
                y1={arrowLineY}
                x2={leftLineEndX}
                y2={arrowLineY}
                stroke={axisSupportColor}
                strokeWidth={5}
                strokeLinecap="round"
              />
              <polygon
                points={`${axisSupportBbox.x},${arrowLineY} ${axisSupportBbox.x + 14},${arrowLineY - 7} ${axisSupportBbox.x + 14},${arrowLineY + 7}`}
                fill={axisSupportColor}
              />

              <text
                x={axisSupportBbox.x + axisSupportBbox.width / 2}
                y={arrowLineY + 5}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={15}
                fontWeight={700}
                letterSpacing="1px"
                fill={axisSupportColor}
              >
                SUPPORT ACTIVITIES
              </text>

              <line
                x1={rightLineStartX}
                y1={arrowLineY}
                x2={rightLineEndX - 12}
                y2={arrowLineY}
                stroke={axisSupportColor}
                strokeWidth={5}
                strokeLinecap="round"
              />
              <polygon
                points={`${rightLineEndX},${arrowLineY} ${rightLineEndX - 14},${arrowLineY - 7} ${rightLineEndX - 14},${arrowLineY + 7}`}
                fill={axisSupportColor}
              />
            </g>
          )
        })()}
        {isAxisSupportSelected && renderHandles(axisSupportBbox, axisSupportId)}
      </g>

      {primaryData.map((act, index) => {
        const elementId = `primary-${index}`
        const x = startX + index * (primaryColW + primaryGap)
        const defaultRect = { x, y: startY, width: primaryColW, height: primaryH }
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

        const defaultIconKey = DEFAULT_PRIMARY_ACTIVITIES[index % DEFAULT_PRIMARY_ACTIVITIES.length]?.icon
        const iconKey = act.icon || defaultIconKey
        const IconComponent = iconKey ? TEMPLATE_ICONS[iconKey] : undefined

        const textCenterX = bbox.x + bbox.width / 2
        const maxChars = Math.max(6, Math.floor((bbox.width - 20) / 9))
        const nameLines = wrapTextByWidth(act.title, maxChars)
        const iconSize = 36
        const iconY = bbox.y + 32
        const textY = bbox.y + 115

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={bbox.x}
                y={bbox.y}
                width={bbox.width}
                height={bbox.height}
                fill={color}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />

              {IconComponent && (
                <g transform={`translate(${textCenterX - iconSize / 2}, ${iconY})`}>
                  <IconComponent size={iconSize} color="#ffffff" />
                </g>
              )}

              <text
                x={textCenterX}
                y={IconComponent ? textY : bbox.y + bbox.height / 2 + 5}
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

      {supportData.map((act, index) => {
        const elementId = `support-${index}`
        const y = supportTopY + index * (supportH + supportGap)
        const defaultRect = { x: startX, y, width: mainW, height: supportH }
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

        const maxChars = Math.max(10, Math.floor((bbox.width - 60) / 9))
        const titleLines = wrapTextByWidth(act.title, maxChars)
        const textCenterX = bbox.x + bbox.width / 2
        const textCenterY = bbox.y + bbox.height / 2 + (titleLines.length > 1 ? -4 : 5)

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={bbox.x}
                y={bbox.y}
                width={bbox.width}
                height={bbox.height}
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
        const wedgeColor = tplColors[marginId] || '#f06a88'
        const strokeColor = tplStrokeColors[marginId] || (isSelected ? '#2b63d9' : 'none')
        const strokeWidth = tplStrokeWidths[marginId] ?? (isSelected ? 2.5 : 0)

        const topX = bbox.x
        const topY = bbox.y
        const tipX = bbox.x + bbox.width
        const tipY = bbox.y + bbox.height / 2
        const botX = bbox.x
        const botY = bbox.y + bbox.height

        const pathD = `M ${topX} ${topY} L ${tipX} ${tipY} L ${botX} ${botY} Z`

        return (
          <g
            key={marginId}
            data-element-id={marginId}
            onMouseDown={e => startDrag(e, marginId, bbox)}
            transform={getTransform(marginId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path d={pathD} fill={wedgeColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            <text
              x={bbox.x + bbox.width * 0.38}
              y={bbox.y + bbox.height / 2 + 6}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={17}
              fontWeight={700}
              fill="#ffffff"
            >
              Values
            </text>
            {isSelected && renderHandles(bbox, marginId)}
          </g>
        )
      })()}
    </g>
  )
}
