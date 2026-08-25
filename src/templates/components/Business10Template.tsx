import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth, parseNodePercent } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function renderDynamicIcon(iconName?: string, size = 18, color = '#FFFFFF'): ReactElement | null {
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

const DEFAULT_COLORS = ['#2B2B60', '#3266CC', '#FF4D2D', '#E5A500']
const DEFAULT_PERCENTAGES = ['25%', '50%', '75%', '100%']
const DEFAULT_TITLES = [
  'Executing Summary',
  'Market Analysis',
  'Products & Services',
  'Financial Planning',
]
const DEFAULT_ICONS = ['folder', 'calendar', 'file-text', 'printer']

export function Business10Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const nodes = data.nodes ?? []
  const count = nodes.length > 0 ? nodes.length : 4
  const displayNodes = nodes.length > 0 ? nodes : Array.from({ length: 4 })

  const startX = 60
  const startY = 40
  const rowHeight = 75
  const rowGap = 16
  const arrowWidth = 360
  const headWidth = 35
  const totalRowWidth = 800

  const getElementRect = (elementId: string, defaultRect: Rect): Rect => {
    const stored = positions[elementId]
    return {
      x: stored?.x ?? defaultRect.x,
      y: stored?.y ?? defaultRect.y,
      width: stored?.width ?? defaultRect.width,
      height: stored?.height ?? defaultRect.height,
    }
  }

  const accentDefaultRect: Rect = {
    x: startX,
    y: startY - 15,
    width: 40,
    height: count * (rowHeight + rowGap) + 15,
  }
  const accentVisualRect = getElementRect('accent-bar', accentDefaultRect)

  return (
    <g ref={svgRef}>
      <g
        data-element-id="accent-bar"
        onMouseDown={event => startDrag(event, 'accent-bar', accentVisualRect)}
        transform={getTransform('accent-bar', accentVisualRect)}
        style={{ cursor: 'pointer' }}
      >
        <rect
          x={accentVisualRect.x}
          y={accentVisualRect.y}
          width={accentVisualRect.width}
          height={accentVisualRect.height}
          rx={accentVisualRect.width / 2}
          fill={templateColors['accent-bar'] ?? '#EAEAEA'}
          opacity={0.5}
        />
        {selectedIds.has('accent-bar') && renderHandles(accentVisualRect, 'accent-bar')}
      </g>

      {displayNodes.slice(0, count).map((node, i) => {
        const itemObject = typeof node === 'object' && node !== null ? node : {}
        const elementId = `node-${i}`
        const y = startY + i * (rowHeight + rowGap)
        const defaultColor = DEFAULT_COLORS[i % DEFAULT_COLORS.length]!
        const color =
          templateColors[elementId] ??
          ('color' in itemObject && typeof itemObject.color === 'string' ? itemObject.color : defaultColor)

        const isSelected = selectedIds.has(elementId)

        const defaultRect: Rect = { x: startX, y, width: totalRowWidth, height: rowHeight }
        const visualRect = getElementRect(elementId, defaultRect)
        const dx = visualRect.x - defaultRect.x
        const dy = visualRect.y - defaultRect.y

        const titleVal =
          'title' in itemObject && typeof itemObject.title === 'string' && itemObject.title
            ? itemObject.title
            : DEFAULT_TITLES[i % DEFAULT_TITLES.length]!

        const textVal =
          'subtitle' in itemObject && typeof itemObject.subtitle === 'string' && itemObject.subtitle
            ? itemObject.subtitle
            : 'text' in itemObject && typeof itemObject.text === 'string' && itemObject.text
              ? itemObject.text
              : 'Content and description to be added here as required'

        const parsed = parseNodePercent(node, 0.25 * (i + 1))
        const percentage =
          'percent' in itemObject && typeof itemObject.percent === 'string'
            ? itemObject.percent
            : 'value' in itemObject && typeof itemObject.value === 'string'
              ? itemObject.value
              : 'pct' in itemObject && typeof itemObject.pct === 'string'
                ? itemObject.pct
                : 'val' in itemObject && typeof itemObject.val === 'string'
                  ? itemObject.val
                  : parsed.percentStr ?? DEFAULT_PERCENTAGES[i % DEFAULT_PERCENTAGES.length]!

        const defaultIcon = DEFAULT_ICONS[i % DEFAULT_ICONS.length]!
        const iconName = 'icon' in itemObject && typeof itemObject.icon === 'string' ? itemObject.icon : defaultIcon
        const iconElement = renderDynamicIcon(iconName, 18, '#FFFFFF')

        const dynamicMaxChars = Math.max(16, Math.floor((visualRect.width - arrowWidth - 110) / 7))
        const textLines = wrapTextByWidth(textVal, dynamicMaxChars)
        const titleLines = wrapTextByWidth(titleVal, 20)

        const currentX = startX + dx
        const currentY = y + dy

        const points = [
          `${currentX},${currentY}`,
          `${currentX + arrowWidth - headWidth},${currentY}`,
          `${currentX + arrowWidth},${currentY + rowHeight / 2}`,
          `${currentX + arrowWidth - headWidth},${currentY + rowHeight}`,
          `${currentX},${currentY + rowHeight}`,
        ].join(' ')

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <polygon
                points={points}
                fill={color}
                stroke={templateStrokeColors[elementId] ?? (isSelected ? '#4a90d9' : 'none')}
                strokeWidth={templateStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)}
                strokeDasharray={isSelected ? '4 2' : undefined}
              />

              <line
                x1={currentX + 40}
                y1={currentY}
                x2={currentX + 40}
                y2={currentY + rowHeight}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1}
              />

              <g transform={`translate(${currentX + 11}, ${currentY + rowHeight / 2 - 9})`}>
                {iconElement ?? <circle cx="9" cy="9" r="4" fill="#FFFFFF" />}
              </g>

              <text
                x={currentX + 55}
                y={currentY + rowHeight / 2 + 5}
                fontFamily="Arial, sans-serif"
                fontSize={15}
                fontWeight={700}
                fill="#FFFFFF"
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={currentX + 55} dy={lineIndex === 0 ? 0 : 18}>
                    {line}
                  </tspan>
                ))}
              </text>

              <text
                x={currentX + arrowWidth + 70}
                y={currentY + rowHeight / 2 + 10}
                fontFamily="Arial, sans-serif"
                fontSize={32}
                fontWeight={800}
                fill={color}
                textAnchor="end"
              >
                {percentage}
              </text>

              <text
                x={currentX + arrowWidth + 95}
                y={currentY + rowHeight / 2 - 6}
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fill="#555555"
              >
                {textLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={currentX + arrowWidth + 95} dy={lineIndex === 0 ? 0 : 16}>
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


