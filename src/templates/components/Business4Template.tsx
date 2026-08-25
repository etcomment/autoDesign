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

function renderDynamicIcon(iconName?: string, size = 20, color = '#23255a'): ReactElement | null {
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

const DEFAULT_ARROW_COLORS = ['#1D1D4B', '#2A60D3', '#FF4D2D']

const DEFAULT_COLUMNS = [
  {
    num: '01',
    defaultTitle: 'Your title 01',
    defaultDesc: 'Content and description to be added here as required',
    fillRatio: 0.50,
  },
  {
    num: '02',
    defaultTitle: 'Your title 02',
    defaultDesc: 'Content and description to be added here as required',
    fillRatio: 0.70,
  },
  {
    num: '03',
    defaultTitle: 'Your title 03',
    defaultDesc: 'Content and description to be added here as required',
    fillRatio: 0.93,
  },
]

export function Business4Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const nodes = data.nodes ?? []
  const displayNodes = nodes.length > 0 ? nodes : DEFAULT_COLUMNS

  const colWidth = 240
  const startY = 40
  const arrowHeight = 280
  const cardHeight = 410
  const gap = 45
  const startX = 85

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
      <defs>
        {displayNodes.map((_, index) => {
          const arrowPathId = `arrow-clip-path-${index}`
          return (
            <clipPath id={arrowPathId} key={arrowPathId}>
              <path d="M 0 95 C 0 80, 15 50, 45 25 L 90 4 C 96 0, 104 0, 110 4 L 155 25 C 185 50, 200 80, 200 95 C 200 115, 185 110, 160 95 L 160 240 C 160 268, 140 280, 100 280 C 60 280, 40 268, 40 240 L 40 95 C 15 110, 0 115, 0 95 Z" />
            </clipPath>
          )
        })}
      </defs>

      {displayNodes.map((node, index) => {
        const itemObject = typeof node === 'object' && node !== null ? node : {}
        const defaultIndex = index % DEFAULT_COLUMNS.length
        const defCol = DEFAULT_COLUMNS[defaultIndex]!
        const elementId = `node-${index}`

        const colTitle =
          'title' in itemObject && typeof itemObject.title === 'string' && itemObject.title
            ? itemObject.title
            : defCol.defaultTitle

        const colDesc =
          'subtitle' in itemObject && typeof itemObject.subtitle === 'string' && itemObject.subtitle
            ? itemObject.subtitle
            : 'text' in itemObject && typeof itemObject.text === 'string' && itemObject.text
              ? itemObject.text
              : defCol.defaultDesc

        const parsed = parseNodePercent(node, defCol.fillRatio)
        const fillRatio = parsed.ratio

        const defaultX = startX + (index % 3) * (colWidth + gap) + Math.floor(index / 3) * 15
        const defaultY = startY + Math.floor(index / 3) * 15
        const defaultRect: Rect = { x: defaultX, y: defaultY, width: colWidth, height: cardHeight }

        const visualRect = getElementRect(elementId, defaultRect)
        const isSelected = selectedIds.has(elementId)

        const defaultColor = DEFAULT_ARROW_COLORS[index % DEFAULT_ARROW_COLORS.length]!
        const activeColor =
          templateColors[elementId] ??
          ('color' in itemObject && typeof itemObject.color === 'string' ? itemObject.color : defaultColor)

        const strokeColor = templateStrokeColors[elementId] ?? (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = templateStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        const maxTitleChars = Math.max(10, Math.floor(visualRect.width / 14))
        const titleLines = wrapTextByWidth(colTitle, maxTitleChars)

        const dynamicMaxChars = Math.max(15, Math.floor(visualRect.width / 7))
        const descLines = wrapTextByWidth(colDesc, dynamicMaxChars)

        const arrowWidth = 200
        const arrowX = visualRect.x + (visualRect.width - arrowWidth) / 2
        const arrowY = visualRect.y

        const iconName = 'icon' in itemObject && typeof itemObject.icon === 'string' ? itemObject.icon : undefined
        const iconElement = renderDynamicIcon(iconName, 20, activeColor)

        return (
          <g key={elementId}>
            {index < displayNodes.length - 1 && index < 2 && (() => {
              const nextId = `node-${index + 1}`
              const nextDefaultX = startX + ((index + 1) % 3) * (colWidth + gap)
              const nextDefaultY = startY
              const nextRect = getElementRect(nextId, { x: nextDefaultX, y: nextDefaultY, width: colWidth, height: cardHeight })
              const dividerX = (visualRect.x + visualRect.width + nextRect.x) / 2

              return (
                <line
                  x1={dividerX}
                  y1={visualRect.y + 15}
                  x2={dividerX}
                  y2={visualRect.y + arrowHeight + 20}
                  stroke="#E2E8F0"
                  strokeWidth={1}
                />
              )
            })()}

            <g
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={visualRect.x}
                y={visualRect.y}
                width={visualRect.width}
                height={visualRect.height}
                fill={templateColors[`bg-${elementId}`] ?? 'transparent'}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={isSelected ? '4 2' : undefined}
                rx={6}
              />

              <g transform={`translate(${arrowX}, ${arrowY})`}>
                <g clipPath={`url(#arrow-clip-path-${index})`}>
                  <rect x={0} y={0} width={200} height={280} fill="#DCDCDC" />
                  <rect
                    x={0}
                    y={arrowHeight * (1 - fillRatio)}
                    width={200}
                    height={arrowHeight * fillRatio}
                    fill={activeColor}
                  />
                </g>
              </g>

              <g transform={`translate(${visualRect.x + visualRect.width / 2}, ${visualRect.y + arrowHeight + 35})`}>
                {iconElement && <g transform="translate(-24, -14)">{iconElement}</g>}
                <text
                  x={0}
                  y={0}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={18}
                  fontWeight={700}
                  fill={activeColor}
                >
                  {titleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={0} dy={lineIndex === 0 ? 0 : 20}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>

              <text
                x={visualRect.x + visualRect.width / 2}
                y={visualRect.y + arrowHeight + 40 + titleLines.length * 20}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fill="#4A5568"
              >
                {descLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={visualRect.x + visualRect.width / 2} dy={lineIndex === 0 ? 0 : 18}>
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

