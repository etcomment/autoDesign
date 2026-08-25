import { useRef, type ReactElement } from 'react'
import { wrapTextByWidth } from '../shared/primitives'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function renderDynamicIcon(iconName?: string, size = 22, color = '#FFFFFF'): ReactElement | null {
  if (!iconName) return null
  const clean = iconName.trim()
  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn({ size, color })

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const lucideRecord = LucideIcons as Record<string, unknown>
  const LucideFn = (lucideRecord[pascalName] || lucideRecord[clean] || lucideRecord[clean.toUpperCase()]) as
    | React.ComponentType<{ size?: number; color?: string }>
    | undefined

  if (LucideFn) {
    return <LucideFn size={size} color={color} />
  }
  return null
}

const DEFAULT_BLOCKS = [
  {
    num: '01',
    defaultTitle: 'Your title',
    defaultText: 'Content and description to be added here as required',
    color: '#2B2B5C',
    iconType: 'chat',
    iconSide: 'left',
  },
  {
    num: '02',
    defaultTitle: 'Your title',
    defaultText: 'Content and description to be added here as required',
    color: '#346ED8',
    iconType: 'target',
    iconSide: 'left',
  },
  {
    num: '03',
    defaultTitle: 'Your title',
    defaultText: 'Content and description to be added here as required',
    color: '#FF5436',
    iconType: 'flag',
    iconSide: 'right',
  },
  {
    num: '04',
    defaultTitle: 'Your title',
    defaultText: 'Content and description to be added here as required',
    color: '#FFB800',
    iconType: 'lightbulb',
    iconSide: 'right',
  },
]

export function Business2Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const nodes = data.nodes ?? []
  const displayNodes = nodes.length > 0 ? nodes : DEFAULT_BLOCKS

  const topY = 60
  const midY = 250
  const botY = 440

  const xLeftStart = 175
  const xLeftPeak = 450
  const xRightEnd = 725

  const poly01 = `${xLeftStart},${topY} ${xLeftPeak},${topY} 410,${midY} 135,${midY}`
  const poly02 = `135,${midY} 410,${midY} ${xLeftPeak},${botY} ${xLeftStart},${botY}`
  const poly03 = `490,${midY} 765,${midY} ${xRightEnd},${botY} ${xLeftPeak},${botY}`
  const poly04 = `${xLeftPeak},${topY} ${xRightEnd},${topY} 765,${midY} 490,${midY}`

  const polygonPoints = [poly01, poly02, poly03, poly04]

  const blockBboxes: Rect[] = [
    { x: 135, y: topY, width: 315, height: midY - topY },
    { x: 135, y: midY, width: 315, height: botY - midY },
    { x: 450, y: midY, width: 315, height: botY - midY },
    { x: 450, y: topY, width: 315, height: midY - topY },
  ]

  const iconCenters = [
    { cx: 150, cy: (topY + midY) / 2 },
    { cx: 150, cy: (midY + botY) / 2 },
    { cx: 750, cy: (midY + botY) / 2 },
    { cx: 750, cy: (topY + midY) / 2 },
  ]

  const getElementRect = (elementId: string, defaultRect: Rect): Rect => {
    const stored = positions[elementId]
    return {
      x: stored?.x ?? defaultRect.x,
      y: stored?.y ?? defaultRect.y,
      width: stored?.width ?? defaultRect.width,
      height: stored?.height ?? defaultRect.height,
    }
  }

  return (
    <g ref={svgRef}>
      {displayNodes.map((item, index) => {
        const itemObject = typeof item === 'object' && item !== null ? item : {}
        const defaultIndex = index % DEFAULT_BLOCKS.length
        const defaultConfig = DEFAULT_BLOCKS[defaultIndex]!
        const elementId = `block-${index}`
        const isSelected = selectedIds.has(elementId)

        const blockColor =
          templateColors[elementId] ??
          ('color' in itemObject && typeof itemObject.color === 'string' ? itemObject.color : defaultConfig.color)
        const strokeColor = templateStrokeColors[elementId] ?? (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = templateStrokeWidths[elementId] ?? (isSelected ? 3 : 0)

        const defaultBbox = blockBboxes[index] || {
          x: index % 2 === 0 ? 135 : 450,
          y: botY + 40 + Math.floor((index - 4) / 2) * 200,
          width: 315,
          height: 180,
        }
        const poly =
          polygonPoints[index] ||
          `${defaultBbox.x},${defaultBbox.y} ${defaultBbox.x + defaultBbox.width},${defaultBbox.y} ${defaultBbox.x + defaultBbox.width},${defaultBbox.y + defaultBbox.height} ${defaultBbox.x},${defaultBbox.y + defaultBbox.height}`

        const visualRect = getElementRect(elementId, defaultBbox)
        const dx = visualRect.x - defaultBbox.x
        const dy = visualRect.y - defaultBbox.y

        const numVal =
          'num' in itemObject && typeof itemObject.num === 'string'
            ? itemObject.num
            : 'percent' in itemObject && typeof itemObject.percent === 'string'
              ? itemObject.percent
              : 'value' in itemObject && typeof itemObject.value === 'string'
                ? itemObject.value
                : 'val' in itemObject && typeof itemObject.val === 'string'
                  ? itemObject.val
                  : defaultConfig.num

        const titleVal =
          'title' in itemObject && typeof itemObject.title === 'string' && itemObject.title
            ? itemObject.title
            : defaultConfig.defaultTitle

        const textVal =
          'subtitle' in itemObject && typeof itemObject.subtitle === 'string' && itemObject.subtitle
            ? itemObject.subtitle
            : 'text' in itemObject && typeof itemObject.text === 'string' && itemObject.text
              ? itemObject.text
              : defaultConfig.defaultText

        const iconName =
          'icon' in itemObject && typeof itemObject.icon === 'string'
            ? itemObject.icon
            : defaultConfig.iconType

        const iconPos = iconCenters[index] || {
          cx: index % 2 === 0 ? 150 : 750,
          cy: defaultBbox.y + 90,
        }
        const isLeft = defaultConfig.iconSide === 'left'
        const textAnchor = isLeft ? 'start' : 'middle'
        const baseTextX = isLeft ? 215 : 625
        const textX = baseTextX + dx

        const maxTitleChars = Math.max(10, Math.floor(visualRect.width / 14))
        const titleLines = wrapTextByWidth(titleVal, maxTitleChars)

        const dynamicMaxChars = Math.max(15, Math.floor(visualRect.width / 7.5))
        const textLines = wrapTextByWidth(textVal, dynamicMaxChars)

        const baseTopY = (index === 0 || index === 3 ? topY : index < 4 ? midY : defaultBbox.y) + dy
        const iconElement = renderDynamicIcon(iconName, 24, blockColor)

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <polygon
                points={poly}
                transform={`translate(${dx}, ${dy})`}
                fill={blockColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={isSelected ? '4 2' : undefined}
              />

              <text
                x={textX}
                y={baseTopY + 50}
                textAnchor={textAnchor}
                fontFamily="Arial, sans-serif"
                fontSize={32}
                fontWeight={700}
                fill="#FFFFFF"
              >
                {numVal}
              </text>

              <text
                x={textX}
                y={baseTopY + 82}
                textAnchor={textAnchor}
                fontFamily="Arial, sans-serif"
                fontSize={17}
                fontWeight={700}
                fill="#FFFFFF"
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={textX} dy={lineIndex === 0 ? 0 : 20}>
                    {line}
                  </tspan>
                ))}
              </text>

              <text
                x={textX}
                y={baseTopY + 82 + titleLines.length * 20 + 10}
                textAnchor={textAnchor}
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fill="#FFFFFF"
                opacity={0.9}
              >
                {textLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={textX} dy={lineIndex === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>

              <circle
                cx={iconPos.cx + dx}
                cy={iconPos.cy + dy}
                r={36}
                fill="#FFFFFF"
                stroke={blockColor}
                strokeWidth={4}
              />

              <g transform={`translate(${iconPos.cx + dx - 12}, ${iconPos.cy + dy - 12})`}>
                {iconElement}
              </g>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}


