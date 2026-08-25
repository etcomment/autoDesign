import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function renderDynamicIcon(iconName?: string, size = 20, color = '#FFFFFF'): ReactElement | null {
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

const DEFAULT_COLORS = ['#242254', '#2b60d3', '#ff472e', '#ffc000', '#48be93', '#90052d']
const DEFAULT_TITLES = ['Your title 01', 'Your title 02', 'Your title 03', 'Your title 04', 'Your title 05', 'Your title 06']

export function Business6Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const nodes = data.nodes ?? []
  const displayNodes = nodes.length > 0 ? nodes : Array.from({ length: 6 })

  const startX = 100
  const shapeW = 112
  const overlap = 15
  const stepX = shapeW - overlap
  const centerY = 280

  const heights = [
    { hLeft: 170, hRight: 210 },
    { hLeft: 210, hRight: 250 },
    { hLeft: 250, hRight: 210 },
    { hLeft: 210, hRight: 250 },
    { hLeft: 250, hRight: 210 },
    { hLeft: 210, hRight: 170 },
  ]

  const textPositions = [
    { isTop: true, textX: startX + 45, lineY1: 155 },
    { isTop: true, textX: startX + stepX + 35, lineY1: 125 },
    { isTop: false, textX: startX + stepX * 2 + 25, lineY2: 440 },
    { isTop: true, textX: startX + stepX * 3 + 35, lineY1: 125 },
    { isTop: false, textX: startX + stepX * 4 + 25, lineY2: 440 },
    { isTop: true, textX: startX + stepX * 5 + 35, lineY1: 155 },
  ]

  const defaultText = 'Content and description to be added here as required'

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
      {displayNodes.map((item, i) => {
        const itemObject = typeof item === 'object' && item !== null ? item : {}
        const elementId = `node-${i}`

        const xLeft = startX + i * stepX
        const xRight = xLeft + shapeW
        const h = heights[i % heights.length]!
        const yLTop = centerY - h.hLeft / 2
        const yLBot = centerY + h.hLeft / 2
        const yRTop = centerY - h.hRight / 2
        const yRBot = centerY + h.hRight / 2

        const defaultColor = DEFAULT_COLORS[i % DEFAULT_COLORS.length]!
        const mainColor =
          templateColors[elementId] ??
          ('color' in itemObject && typeof itemObject.color === 'string' ? itemObject.color : defaultColor)

        const isSelected = selectedIds.has(elementId)
        const strokeColor = templateStrokeColors[elementId] ?? (isSelected ? '#4a90d9' : 'none')
        const strokeW = templateStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        const blockTitle =
          'title' in itemObject && typeof itemObject.title === 'string' && itemObject.title
            ? itemObject.title
            : 'percent' in itemObject && typeof itemObject.percent === 'string'
              ? itemObject.percent
              : 'value' in itemObject && typeof itemObject.value === 'string'
                ? itemObject.value
                : DEFAULT_TITLES[i % DEFAULT_TITLES.length]!

        const blockDesc =
          'subtitle' in itemObject && typeof itemObject.subtitle === 'string' && itemObject.subtitle
            ? itemObject.subtitle
            : 'text' in itemObject && typeof itemObject.text === 'string' && itemObject.text
              ? itemObject.text
              : defaultText

        const iconName = 'icon' in itemObject && typeof itemObject.icon === 'string' ? itemObject.icon : undefined

        const defaultRect: Rect = {
          x: xLeft,
          y: Math.min(yLTop, yRTop),
          width: shapeW,
          height: Math.max(h.hLeft, h.hRight),
        }

        const visualRect = getElementRect(elementId, defaultRect)
        const dx = visualRect.x - defaultRect.x
        const dy = visualRect.y - defaultRect.y

        const tPos = textPositions[i % textPositions.length]!
        const iconCx = visualRect.x + visualRect.width / 2
        const iconCy = visualRect.y + visualRect.height / 2

        const dynamicMaxChars = Math.max(12, Math.floor(visualRect.width / 6.5))
        const descLines = wrapTextByWidth(blockDesc, dynamicMaxChars)
        const titleLines = wrapTextByWidth(blockTitle, dynamicMaxChars)

        const currentPolygonPath = `M ${xLeft + dx} ${yLTop + dy} L ${xRight + dx} ${yRTop + dy} L ${xRight + dx} ${yRBot + dy} L ${xLeft + dx} ${yLBot + dy} Z`
        const textTargetX = tPos.textX + dx

        const iconElement = renderDynamicIcon(iconName, 20, '#FFFFFF')

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              {tPos.isTop ? (
                <line
                  x1={xRight + dx}
                  y1={(tPos.lineY1 ?? 155) + dy}
                  x2={xRight + dx}
                  y2={yRTop + dy}
                  stroke="#cccccc"
                  strokeWidth={2}
                />
              ) : (
                <line
                  x1={xLeft + 60 + dx}
                  y1={yLBot + dy}
                  x2={xLeft + 60 + dx}
                  y2={(tPos.lineY2 ?? 440) + dy}
                  stroke="#cccccc"
                  strokeWidth={2}
                />
              )}

              {tPos.isTop ? (
                <g>
                  <text
                    x={textTargetX}
                    y={110 + dy}
                    textAnchor="end"
                    fontFamily="Arial, sans-serif"
                    fontSize={16}
                    fontWeight={700}
                    fill={mainColor}
                  >
                    {titleLines.map((line, lineIndex) => (
                      <tspan key={lineIndex} x={textTargetX} dy={lineIndex === 0 ? 0 : 18}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                  <text
                    x={textTargetX}
                    y={110 + dy + titleLines.length * 18}
                    textAnchor="end"
                    fontFamily="Arial, sans-serif"
                    fontSize={11}
                    fill="#444444"
                  >
                    {descLines.map((line, lineIndex) => (
                      <tspan key={lineIndex} x={textTargetX} dy={lineIndex === 0 ? 0 : 14}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              ) : (
                <g>
                  <text
                    x={textTargetX}
                    y={455 + dy}
                    textAnchor="start"
                    fontFamily="Arial, sans-serif"
                    fontSize={16}
                    fontWeight={700}
                    fill={mainColor}
                  >
                    {titleLines.map((line, lineIndex) => (
                      <tspan key={lineIndex} x={textTargetX} dy={lineIndex === 0 ? 0 : 18}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                  <text
                    x={textTargetX}
                    y={455 + dy + titleLines.length * 18}
                    textAnchor="start"
                    fontFamily="Arial, sans-serif"
                    fontSize={11}
                    fill="#444444"
                  >
                    {descLines.map((line, lineIndex) => (
                      <tspan key={lineIndex} x={textTargetX} dy={lineIndex === 0 ? 0 : 14}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              )}

              <path
                d={currentPolygonPath}
                fill={mainColor}
                stroke={strokeColor}
                strokeWidth={strokeW}
                strokeDasharray={isSelected ? '4 2' : undefined}
              />

              <g transform={`translate(${iconCx - 10}, ${iconCy - 10})`}>
                {iconElement ?? (
                  <circle cx="10" cy="10" r="4" fill="#FFFFFF" />
                )}
              </g>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}

