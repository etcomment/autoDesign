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

const DEFAULT_COLORS = ['#2B2B60', '#3266CC', '#FF4D2D', '#E5A500']

const DEFAULT_TITLES = [
  'Executive Summary',
  'Products & Services',
  'Marketing Strategy',
  'Financial Planning',
]

const DEFAULT_ICONS = ['truck', 'landmark', 'git-branch', 'bar-chart-2']

export function Business11Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const nodes = data.nodes ?? []
  const count = nodes.length > 0 ? nodes.length : 4
  const displayNodes = (nodes.length > 0 ? nodes : Array.from({ length: 4 })).slice(0, count)

  const cx = 450
  const cy = 250
  const R = 120

  const petalCenters = [
    { x: cx, y: cy - R / 2, angle: 0 },
    { x: cx + R / 2, y: cy, angle: 90 },
    { x: cx, y: cy + R / 2, angle: 180 },
    { x: cx - R / 2, y: cy, angle: 270 },
  ]

  const textPositions = [
    { x: 60, y: 110, align: 'start' as const },
    { x: 620, y: 130, align: 'start' as const },
    { x: 620, y: 370, align: 'start' as const },
    { x: 60, y: 370, align: 'start' as const },
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

  const centerDefaultRect: Rect = { x: cx - 30, y: cy - 30, width: 60, height: 60 }
  const centerVisualRect = getElementRect('center-badge', centerDefaultRect)
  const centerLabel = data.centerLabel ?? ''

  return (
    <g ref={svgRef}>
      {displayNodes.map((item, i) => {
        const itemObject = typeof item === 'object' && item !== null ? item : {}
        const elementId = `petal-${i}`
        const cardId = `card-${i}`

        const defaultColor = DEFAULT_COLORS[i % DEFAULT_COLORS.length]!
        const color =
          templateColors[elementId] ??
          ('color' in itemObject && typeof itemObject.color === 'string' ? itemObject.color : defaultColor)

        const isSelected = selectedIds.has(elementId)
        const isCardSelected = selectedIds.has(cardId)

        const center = petalCenters[i] || {
          x: cx + R * Math.cos(((i * 90) * Math.PI) / 180),
          y: cy + R * Math.sin(((i * 90) * Math.PI) / 180),
          angle: i * 90,
        }
        const textPos = textPositions[i] || { x: center.x, y: center.y + R + 20, align: 'start' as const }

        const itemTitle =
          'title' in itemObject && typeof itemObject.title === 'string' && itemObject.title
            ? itemObject.title
            : DEFAULT_TITLES[i % DEFAULT_TITLES.length]!

        const itemDesc =
          'subtitle' in itemObject && typeof itemObject.subtitle === 'string' && itemObject.subtitle
            ? itemObject.subtitle
            : 'text' in itemObject && typeof itemObject.text === 'string' && itemObject.text
              ? itemObject.text
              : 'Content and description to be added here as required'

        const numStr =
          'percent' in itemObject && typeof itemObject.percent === 'string'
            ? itemObject.percent
            : 'value' in itemObject && typeof itemObject.value === 'string'
              ? itemObject.value
              : 'val' in itemObject && typeof itemObject.val === 'string'
                ? itemObject.val
                : 'num' in itemObject && typeof itemObject.num === 'string'
                  ? itemObject.num
                  : `0${i + 1}`

        const defaultPetalRect: Rect = {
          x: center.x - R / 2 - 10,
          y: center.y - R / 2 - 10,
          width: R + 20,
          height: R + 20,
        }
        const visualPetalRect = getElementRect(elementId, defaultPetalRect)
        const dx = visualPetalRect.x - defaultPetalRect.x
        const dy = visualPetalRect.y - defaultPetalRect.y

        const defaultCardRect: Rect = {
          x: textPos.x,
          y: textPos.y - 15,
          width: 240,
          height: 90,
        }
        const visualCardRect = getElementRect(cardId, defaultCardRect)

        const titleLines = wrapTextByWidth(itemTitle, Math.max(12, Math.floor(visualCardRect.width / 13)))
        const descLines = wrapTextByWidth(itemDesc, Math.max(16, Math.floor(visualCardRect.width / 7.5)))

        const defaultIcon = DEFAULT_ICONS[i % DEFAULT_ICONS.length]!
        const iconName = 'icon' in itemObject && typeof itemObject.icon === 'string' ? itemObject.icon : defaultIcon
        const iconElement = renderDynamicIcon(iconName, 20, '#FFFFFF')

        const petalPath = `M 0 0 L 0 ${-R} A ${R} ${R} 0 0 1 ${R} 0 Z`

        return (
          <g key={elementId}>
            <g
              transform={`${getTransform(elementId, visualPetalRect)} translate(${center.x + dx}, ${center.y + dy}) rotate(${center.angle})`}
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, visualPetalRect)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={petalPath}
                fill={color}
                stroke={templateStrokeColors[elementId] ?? (isSelected ? '#4a90d9' : '#FFFFFF')}
                strokeWidth={templateStrokeWidths[elementId] ?? (isSelected ? 3 : 1.5)}
                strokeDasharray={isSelected ? '4 2' : undefined}
              />
            </g>

            <g pointerEvents="none">
              <text
                x={center.x + dx + (i === 1 ? 15 : i === 3 ? -15 : 0)}
                y={center.y + dy + (i === 0 ? -35 : i === 2 ? 30 : -10)}
                fontFamily="Arial, sans-serif"
                fontSize={24}
                fontWeight={800}
                fill="#FFFFFF"
                textAnchor="middle"
              >
                {numStr}
              </text>

              <g
                transform={`translate(${
                  center.x + dx + (i === 1 ? 5 : i === 3 ? -25 : -10)
                }, ${
                  center.y + dy + (i === 0 ? -12 : i === 2 ? 40 : 5)
                })`}
              >
                {iconElement ?? <circle cx="10" cy="10" r="5" fill="#FFFFFF" />}
              </g>
            </g>

            {isSelected && renderHandles(visualPetalRect, elementId)}

            <g
              data-element-id={cardId}
              onMouseDown={event => startDrag(event, cardId, visualCardRect)}
              transform={getTransform(cardId, visualCardRect)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={visualCardRect.x}
                y={visualCardRect.y}
                width={visualCardRect.width}
                height={visualCardRect.height}
                fill={templateColors[`bg-${cardId}`] ?? 'transparent'}
                stroke={templateStrokeColors[cardId] ?? (isCardSelected ? '#4a90d9' : 'transparent')}
                strokeWidth={templateStrokeWidths[cardId] ?? 1.5}
                strokeDasharray={isCardSelected ? '4 2' : undefined}
                rx={4}
              />

              <text
                x={visualCardRect.x + 10}
                y={visualCardRect.y + 20}
                fontFamily="Arial, sans-serif"
                fontSize={16}
                fontWeight={700}
                fill={color}
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={visualCardRect.x + 10} dy={lineIndex === 0 ? 0 : 20}>
                    {line}
                  </tspan>
                ))}
              </text>

              <text
                x={visualCardRect.x + 10}
                y={visualCardRect.y + 24 + titleLines.length * 20}
                fontFamily="Arial, sans-serif"
                fontSize={11.5}
                fill="#555555"
              >
                {descLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={visualCardRect.x + 10} dy={lineIndex === 0 ? 0 : 15}>
                    {line}
                  </tspan>
                ))}
              </text>

              {isCardSelected && renderHandles(visualCardRect, cardId)}
            </g>
          </g>
        )
      })}

      <g
        data-element-id="center-badge"
        onMouseDown={event => startDrag(event, 'center-badge', centerVisualRect)}
        transform={getTransform('center-badge', centerVisualRect)}
        style={{ cursor: 'pointer' }}
      >
        <circle
          cx={centerVisualRect.x + centerVisualRect.width / 2}
          cy={centerVisualRect.y + centerVisualRect.height / 2}
          r={centerVisualRect.width / 2}
          fill={templateColors['center-badge'] ?? '#FFFFFF'}
          stroke={templateStrokeColors['center-badge'] ?? '#2B2B60'}
          strokeWidth={templateStrokeWidths['center-badge'] ?? 3}
        />
        {centerLabel && (
          <text
            x={centerVisualRect.x + centerVisualRect.width / 2}
            y={centerVisualRect.y + centerVisualRect.height / 2 + 4}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={12}
            fontWeight={700}
            fill="#2B2B60"
          >
            {centerLabel}
          </text>
        )}
        {selectedIds.has('center-badge') && renderHandles(centerVisualRect, 'center-badge')}
      </g>
    </g>
  )
}


