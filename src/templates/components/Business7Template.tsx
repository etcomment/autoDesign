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

function renderDynamicIcon(iconName?: string, size = 24, color = '#FFFFFF'): ReactElement | null {
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

const DEFAULT_COLORS = ['#27295c', '#2962ff', '#ff4d30', '#ffc107']
const DEFAULT_TITLES = ['Your title 01', 'Your title 02', 'Your title 03', 'Your title 04']
const DEFAULT_DESC = 'Content and description to be added here as required'

export function Business7Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const nodes = data.nodes ?? []
  const displayNodes = nodes.length > 0 ? nodes : Array.from({ length: 4 })
  const count = displayNodes.length

  const W = 900
  const totalWidth = 800
  const startX = (W - totalWidth) / 2

  const iconRadius = 38
  const iconY = 100
  const cardTopY = 140
  const cardH = 340
  const notchDepth = 35

  const columnGap = 16
  const colW = count > 1 ? (totalWidth - (count - 1) * columnGap) / count : totalWidth

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
        const elementId = `node-${i}`
        const itemObject = typeof item === 'object' && item !== null ? item : {}
        const defaultColor = DEFAULT_COLORS[i % DEFAULT_COLORS.length]!
        const mainColor =
          templateColors[elementId] ??
          ('color' in itemObject && typeof itemObject.color === 'string' ? itemObject.color : defaultColor)

        const isSelected = selectedIds.has(elementId)
        const strokeColor = templateStrokeColors[elementId] ?? (isSelected ? '#4a90d9' : 'none')
        const strokeW = templateStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        const colTitle =
          'title' in itemObject && typeof itemObject.title === 'string' && itemObject.title
            ? itemObject.title
            : 'percent' in itemObject && typeof itemObject.percent === 'string'
              ? itemObject.percent
              : 'value' in itemObject && typeof itemObject.value === 'string'
                ? itemObject.value
                : DEFAULT_TITLES[i % DEFAULT_TITLES.length]!

        const colDesc =
          'subtitle' in itemObject && typeof itemObject.subtitle === 'string' && itemObject.subtitle
            ? itemObject.subtitle
            : 'text' in itemObject && typeof itemObject.text === 'string' && itemObject.text
              ? itemObject.text
              : DEFAULT_DESC

        const iconName = 'icon' in itemObject && typeof itemObject.icon === 'string' ? itemObject.icon : undefined

        const defaultX = startX + i * (colW + columnGap)
        const defaultRect: Rect = {
          x: defaultX,
          y: iconY - iconRadius,
          width: colW,
          height: cardTopY + cardH - (iconY - iconRadius),
        }

        const visualRect = getElementRect(elementId, defaultRect)
        const dx = visualRect.x - defaultX
        const dy = visualRect.y - (iconY - iconRadius)

        const currentX = defaultX + dx
        const currentCardTopY = cardTopY + dy
        const currentIconY = iconY + dy
        const currentIconCenterX = currentX + visualRect.width / 2

        const grayChevronPath = `
          M ${currentX} ${currentCardTopY + notchDepth}
          L ${currentIconCenterX} ${currentCardTopY}
          L ${currentX + visualRect.width} ${currentCardTopY + notchDepth}
          L ${currentX + visualRect.width} ${currentCardTopY + notchDepth + 20}
          L ${currentIconCenterX} ${currentCardTopY + 20}
          L ${currentX} ${currentCardTopY + notchDepth + 20}
          Z
        `

        const bodyPath = `
          M ${currentX} ${currentCardTopY + notchDepth + 18}
          L ${currentIconCenterX} ${currentCardTopY + 18}
          L ${currentX + visualRect.width} ${currentCardTopY + notchDepth + 18}
          L ${currentX + visualRect.width} ${currentCardTopY + cardH}
          L ${currentX} ${currentCardTopY + cardH}
          Z
        `

        const maxTitleChars = Math.max(8, Math.floor(visualRect.width / 12))
        const titleLines = wrapTextByWidth(colTitle, maxTitleChars)

        const dynamicMaxChars = Math.max(10, Math.floor(visualRect.width / 7.5))
        const descLines = wrapTextByWidth(colDesc, dynamicMaxChars)

        const iconElement = renderDynamicIcon(iconName, 24, '#FFFFFF')

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <path d={grayChevronPath} fill="#afb4b9" />

              <path
                d={bodyPath}
                fill={mainColor}
                stroke={strokeColor}
                strokeWidth={strokeW}
                strokeDasharray={isSelected ? '4 2' : undefined}
              />

              <circle
                cx={currentIconCenterX}
                cy={currentIconY}
                r={iconRadius}
                fill={mainColor}
                stroke="#ffffff"
                strokeWidth={3}
              />

              <g transform={`translate(${currentIconCenterX - 12}, ${currentIconY - 12})`}>
                {iconElement ?? (
                  <circle cx="12" cy="12" r="6" fill="#FFFFFF" />
                )}
              </g>

              <text
                x={currentX + 18}
                y={currentCardTopY + notchDepth + 70}
                textAnchor="start"
                fontFamily="Arial, sans-serif"
                fontSize={17}
                fontWeight={700}
                fill="#ffffff"
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={currentX + 18} dy={lineIndex === 0 ? 0 : 20}>
                    {line}
                  </tspan>
                ))}
              </text>

              <text
                x={currentX + 18}
                y={currentCardTopY + notchDepth + 70 + titleLines.length * 20 + 4}
                textAnchor="start"
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fill="#ffffff"
                opacity={0.9}
              >
                {descLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={currentX + 18} dy={lineIndex === 0 ? 0 : 18}>
                    {line}
                  </tspan>
                ))}
              </text>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}

