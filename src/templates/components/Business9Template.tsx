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

function renderDynamicIcon(iconName?: string, size = 26, color = '#FFFFFF'): ReactElement | null {
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

const CHEVRON_COLORS = [
  '#1F2456',
  '#2F66CE',
  '#FF5232',
  '#FFB800',
]

const DEFAULT_ICONS = ['clipboard-list', 'clipboard-check', 'clock', 'check-square']

const DEFAULT_NODES = [
  { title: 'Your title', description: 'Content and description to be added here as required' },
  { title: 'Your title', description: 'Content and description to be added here as required' },
  { title: 'Your title', description: 'Content and description to be added here as required' },
  { title: 'Your title', description: 'Content and description to be added here as required' },
]

export function Business9Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const nodes = data.nodes ?? []
  const displayNodes = nodes.length > 0 ? nodes : DEFAULT_NODES

  const count = displayNodes.length
  const chevronPolygons = Array.from({ length: count }).map((_, i) => {
    const spacing = 810 / count
    const startX = 95 + i * spacing
    const midX = startX + spacing / 2
    const endX = startX + spacing

    const isUp = i % 2 === 0
    const y1 = isUp ? 345 : 225
    const y2 = isUp ? 225 : 480
    const y3 = isUp ? 325 : 380
    const y4 = isUp ? 480 : 270

    if (i === 0) return '95,345 215,225 315,325 220,480'
    if (i === 1) return '215,225 410,170 510,270 315,325'
    if (i === 2) return '410,170 600,480 700,380 510,270'
    if (i === 3) return '600,480 790,170 905,285 700,380'

    return `${startX},${y1} ${midX},${y2} ${endX},${y3} ${midX + (startX - midX) / 2},${y4}`
  })

  const numberPositions = [
    { x: 222, y: 418 },
    { x: 410, y: 245 },
    { x: 597, y: 418 },
    { x: 785, y: 245 },
  ]

  const iconPositions = [
    { x: 222, y: 225 },
    { x: 410, y: 435 },
    { x: 597, y: 225 },
    { x: 785, y: 435 },
  ]

  const textPositions = [
    { x: 222, y: 110, align: 'middle' as const, isTop: true },
    { x: 410, y: 505, align: 'middle' as const, isTop: false },
    { x: 597, y: 110, align: 'middle' as const, isTop: true },
    { x: 785, y: 505, align: 'middle' as const, isTop: false },
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
      <g>
        {chevronPolygons.map((pts, i) => {
          const chevId = `chevron-${i}`
          const isChevSelected = selectedIds.has(chevId)
          const defaultColor = CHEVRON_COLORS[i % CHEVRON_COLORS.length]!
          const color = templateColors[chevId] ?? defaultColor
          const stroke = templateStrokeColors[chevId] ?? (isChevSelected ? '#4a90d9' : '#ffffff')
          const strokeWidth = templateStrokeWidths[chevId] ?? (isChevSelected ? 3 : 1.5)

          return (
            <polygon
              key={chevId}
              points={pts}
              fill={color}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          )
        })}
      </g>

      <g style={{ pointerEvents: 'none' }}>
        {numberPositions.map((pos, i) => (
          <text
            key={`num-${i}`}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="Arial, sans-serif"
            fontSize={44}
            fontWeight={700}
            fill="#FFFFFF"
          >
            {i + 1}
          </text>
        ))}
      </g>

      {displayNodes.map((node, i) => {
        const itemObject = typeof node === 'object' && node !== null ? node : {}
        const elementId = `node-${i}`
        const defaultColor = CHEVRON_COLORS[i % CHEVRON_COLORS.length]!
        const color =
          templateColors[elementId] ??
          ('color' in itemObject && typeof itemObject.color === 'string' ? itemObject.color : defaultColor)

        const isSelected = selectedIds.has(elementId)

        const isUp = i % 2 === 0
        const defaultIconPos = iconPositions[i] || { x: 222 + i * 188, y: isUp ? 225 : 435 }
        const defaultTextPos = textPositions[i] || { x: 222 + i * 188, y: isUp ? 110 : 505, align: 'middle' as const, isTop: isUp }

        const defaultBoxW = 260
        const defaultBoxH = 135
        const defaultBoxX = defaultTextPos.x - defaultBoxW / 2
        const defaultBoxY = defaultTextPos.isTop ? defaultTextPos.y - 25 : defaultIconPos.y - 40
        const defaultRect: Rect = { x: defaultBoxX, y: defaultBoxY, width: defaultBoxW, height: defaultBoxH }

        const visualRect = getElementRect(elementId, defaultRect)
        const dx = visualRect.x - defaultBoxX
        const dy = visualRect.y - defaultBoxY

        const currentIconX = defaultIconPos.x + dx
        const currentIconY = defaultIconPos.y + dy
        const currentTextX = defaultTextPos.x + dx
        const currentTextY = defaultTextPos.y + dy

        const titleVal =
          'title' in itemObject && typeof itemObject.title === 'string' && itemObject.title
            ? itemObject.title
            : 'percent' in itemObject && typeof itemObject.percent === 'string'
              ? itemObject.percent
              : 'value' in itemObject && typeof itemObject.value === 'string'
                ? itemObject.value
                : 'Your title'

        const textVal =
          'subtitle' in itemObject && typeof itemObject.subtitle === 'string' && itemObject.subtitle
            ? itemObject.subtitle
            : 'text' in itemObject && typeof itemObject.text === 'string' && itemObject.text
              ? itemObject.text
              : 'description' in itemObject && typeof itemObject.description === 'string' && itemObject.description
                ? itemObject.description
                : 'Content and description to be added here as required'

        const dynamicMaxChars = Math.max(14, Math.floor(visualRect.width / 7))
        const titleLines = wrapTextByWidth(titleVal, dynamicMaxChars)
        const textLines = wrapTextByWidth(textVal, dynamicMaxChars)

        const defaultIcon = DEFAULT_ICONS[i % DEFAULT_ICONS.length]!
        const iconName = 'icon' in itemObject && typeof itemObject.icon === 'string' ? itemObject.icon : defaultIcon
        const iconElement = renderDynamicIcon(iconName, 26, '#FFFFFF')

        return (
          <g key={elementId}>
            <circle cx={currentIconX} cy={currentIconY} r={36} fill={color} />
            <g transform={`translate(${currentIconX - 13}, ${currentIconY - 13})`}>
              {iconElement ?? <circle cx="13" cy="13" r="6" fill="#FFFFFF" />}
            </g>

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
                stroke={templateStrokeColors[elementId] ?? (isSelected ? '#2F66CE' : 'transparent')}
                strokeWidth={templateStrokeWidths[elementId] ?? 1.5}
                strokeDasharray={isSelected ? '4 2' : undefined}
                rx={6}
              />

              <text
                x={currentTextX}
                y={currentTextY}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={17}
                fontWeight={700}
                fill="#252B42"
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={currentTextX} dy={lineIndex === 0 ? 0 : 20}>
                    {line}
                  </tspan>
                ))}
              </text>

              <text
                x={currentTextX}
                y={currentTextY + titleLines.length * 20 + 2}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fill="#555555"
              >
                {textLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={currentTextX} dy={lineIndex === 0 ? 0 : 16}>
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

