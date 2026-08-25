import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { parseNodePercent, wrapTextByWidth } from '../shared/primitives'
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

const TRIANGLE_COLORS = ['#1d2151', '#2b62d9', '#ff4d2d', '#ffc107', '#4ecdc4']

const DEFAULT_ITEMS = [
  { title: 'Your title', value: '£0.8M', ratio: 0.20 },
  { title: 'Your title', value: '£2.0M', ratio: 0.50 },
  { title: 'Your title', value: '£3.1M', ratio: 0.77 },
  { title: 'Your title', value: '£2.6M', ratio: 0.65 },
  { title: 'Your title', value: '£3.9M', ratio: 0.95 },
]

export function Business5Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const nodes = data.nodes ?? []
  const displayNodes = nodes.length > 0 ? nodes : DEFAULT_ITEMS

  const itemsConfig = [
    { xLeft: 125, xPeak: 165, xRight: 195, defaultRatio: 0.20 },
    { xLeft: 185, xPeak: 265, xRight: 335, defaultRatio: 0.50 },
    { xLeft: 315, xPeak: 415, xRight: 515, defaultRatio: 0.77 },
    { xLeft: 495, xPeak: 575, xRight: 655, defaultRatio: 0.65 },
    { xLeft: 635, xPeak: 750, xRight: 865, defaultRatio: 0.95 },
  ]

  const yBase = 460

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
      {displayNodes.map((item, idx) => {
        const itemObject = typeof item === 'object' && item !== null ? item : {}
        const cfg = itemsConfig[idx % itemsConfig.length]!
        const defaultItem = DEFAULT_ITEMS[idx % DEFAULT_ITEMS.length]!
        const elementId = `mountain-${idx}`

        const parsed = parseNodePercent(item, cfg.defaultRatio)

        const displayTitle =
          'title' in itemObject && typeof itemObject.title === 'string' && itemObject.title
            ? itemObject.title
            : defaultItem.title

        const displayValue =
          'value' in itemObject && typeof itemObject.value === 'string'
            ? itemObject.value
            : 'percent' in itemObject && typeof itemObject.percent === 'string'
              ? itemObject.percent
              : 'val' in itemObject && typeof itemObject.val === 'string'
                ? itemObject.val
                : 'pct' in itemObject && typeof itemObject.pct === 'string'
                  ? itemObject.pct
                  : parsed.percentStr

        const defaultColor = TRIANGLE_COLORS[idx % TRIANGLE_COLORS.length]!
        const color =
          templateColors[elementId] ??
          ('color' in itemObject && typeof itemObject.color === 'string' ? itemObject.color : defaultColor)

        const isSelected = selectedIds.has(elementId)
        const strokeColor = templateStrokeColors[elementId] ?? (isSelected ? '#007acc' : 'none')
        const strokeWidth = templateStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        const peakHeight = Math.max(70, Math.min(270, parsed.ratio * 280))
        const yPeak = yBase - peakHeight
        const pinY = yPeak - 25
        const titleY = pinY - 25

        const width = cfg.xRight - cfg.xLeft
        const height = yBase - (titleY - 20)

        const defaultRect: Rect = {
          x: cfg.xLeft,
          y: titleY - 20,
          width,
          height,
        }

        const visualRect = getElementRect(elementId, defaultRect)
        const dx = visualRect.x - defaultRect.x
        const dy = visualRect.y - defaultRect.y

        const maxTitleChars = Math.max(8, Math.floor(visualRect.width / 8))
        const titleLines = wrapTextByWidth(displayTitle, maxTitleChars)
        const valLines = wrapTextByWidth(displayValue, maxTitleChars)

        const iconName = 'icon' in itemObject && typeof itemObject.icon === 'string' ? itemObject.icon : undefined
        const iconElement = renderDynamicIcon(iconName, 18, '#ffffff')

        const currentLeftX = cfg.xLeft + dx
        const currentPeakX = cfg.xPeak + dx
        const currentRightX = cfg.xRight + dx
        const currentYPeak = yPeak + dy
        const currentPinY = pinY + dy
        const currentTitleY = titleY + dy
        const currentBaseY = yBase + dy

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <text
                x={currentPeakX}
                y={currentTitleY}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={14}
                fontWeight={700}
                fill="#1d2151"
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={currentPeakX} dy={lineIndex === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>

              <line
                x1={currentPeakX}
                y1={currentPinY}
                x2={currentPeakX}
                y2={currentYPeak}
                stroke={color}
                strokeWidth={3}
              />
              <circle cx={currentPeakX} cy={currentPinY} r={5} fill={color} />

              <polygon
                points={`${currentLeftX},${currentBaseY} ${currentPeakX},${currentYPeak} ${currentRightX},${currentBaseY}`}
                fill={color}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={isSelected ? '4 2' : undefined}
              />

              {iconElement && (
                <g transform={`translate(${currentPeakX - 9}, ${currentBaseY - 50})`}>
                  {iconElement}
                </g>
              )}

              <text
                x={currentPeakX}
                y={currentBaseY - 22}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={15}
                fontWeight={700}
                fill="#ffffff"
              >
                {valLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={currentPeakX} dy={lineIndex === 0 ? 0 : 18}>
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

