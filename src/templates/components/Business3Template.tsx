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

const DEFAULT_STEP_COLORS = [
  '#2E2D6A',
  '#FFB800',
  '#2F6EE5',
  '#4CB994',
  '#FF523B',
  '#E62E6B',
  '#2E2D6A',
  '#FFB800',
  '#2F6EE5',
  '#4CB994',
  '#FF523B',
  '#E62E6B',
]

interface StepConfig {
  num: number
  path: string
  rect: Rect
  centerY: number
}

function getStepsConfig(): StepConfig[] {
  const colW = 190
  const rowH = 85
  const gapY = 50

  const x0 = 120
  const x1 = x0 + colW
  const x2 = x1 + colW
  const x3 = x2 + colW
  const xEnd = x3 + colW

  const y1 = 60
  const y2 = y1 + rowH + gapY
  const y3 = y2 + rowH + gapY

  const midY12 = y1 + rowH + gapY / 2
  const midY23 = y2 + rowH + gapY / 2

  const r = 20

  return [
    {
      num: 1,
      path: `M ${x0 + r} ${y1} L ${x1} ${y1} L ${x1} ${y1 + rowH} L ${x0} ${y1 + rowH} L ${x0} ${y1 + r} A ${r} ${r} 0 0 1 ${x0 + r} ${y1} Z`,
      rect: { x: x0, y: y1, width: colW, height: rowH },
      centerY: y1 + rowH / 2,
    },
    {
      num: 2,
      path: `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y1 + rowH} L ${x1} ${y1 + rowH} Z`,
      rect: { x: x1, y: y1, width: colW, height: rowH },
      centerY: y1 + rowH / 2,
    },
    {
      num: 3,
      path: `M ${x2} ${y1} L ${x3} ${y1} L ${x3} ${y1 + rowH} L ${x2} ${y1 + rowH} Z`,
      rect: { x: x2, y: y1, width: colW, height: rowH },
      centerY: y1 + rowH / 2,
    },
    {
      num: 4,
      path: `M ${x3} ${y1} L ${xEnd - r} ${y1} A ${r} ${r} 0 0 1 ${xEnd} ${y1 + r} L ${xEnd} ${midY12} L ${x3} ${midY12} Z`,
      rect: { x: x3, y: y1, width: colW, height: midY12 - y1 },
      centerY: y1 + rowH / 2,
    },
    {
      num: 5,
      path: `M ${x3} ${midY12} L ${xEnd} ${midY12} L ${xEnd} ${y2 + rowH} L ${x3} ${y2 + rowH} Z`,
      rect: { x: x3, y: midY12, width: colW, height: y2 + rowH - midY12 },
      centerY: y2 + rowH / 2,
    },
    {
      num: 6,
      path: `M ${x2} ${y2} L ${x3} ${y2} L ${x3} ${y2 + rowH} L ${x2} ${y2 + rowH} Z`,
      rect: { x: x2, y: y2, width: colW, height: rowH },
      centerY: y2 + rowH / 2,
    },
    {
      num: 7,
      path: `M ${x1} ${y2} L ${x2} ${y2} L ${x2} ${y2 + rowH} L ${x1} ${y2 + rowH} Z`,
      rect: { x: x1, y: y2, width: colW, height: rowH },
      centerY: y2 + rowH / 2,
    },
    {
      num: 8,
      path: `M ${x0} ${y2} L ${x1} ${y2} L ${x1} ${midY23} L ${x0} ${midY23} Z`,
      rect: { x: x0, y: y2, width: colW, height: midY23 - y2 },
      centerY: y2 + rowH / 2,
    },
    {
      num: 9,
      path: `M ${x0} ${midY23} L ${x1} ${midY23} L ${x1} ${y3 + rowH} L ${x0 + r} ${y3 + rowH} A ${r} ${r} 0 0 1 ${x0} ${y3 + rowH - r} Z`,
      rect: { x: x0, y: midY23, width: colW, height: y3 + rowH - midY23 },
      centerY: y3 + rowH / 2,
    },
    {
      num: 10,
      path: `M ${x1} ${y3} L ${x2} ${y3} L ${x2} ${y3 + rowH} L ${x1} ${y3 + rowH} Z`,
      rect: { x: x1, y: y3, width: colW, height: rowH },
      centerY: y3 + rowH / 2,
    },
    {
      num: 11,
      path: `M ${x2} ${y3} L ${x3} ${y3} L ${x3} ${y3 + rowH} L ${x2} ${y3 + rowH} Z`,
      rect: { x: x2, y: y3, width: colW, height: rowH },
      centerY: y3 + rowH / 2,
    },
    {
      num: 12,
      path: `M ${x3} ${y3} L ${xEnd} ${y3} L ${xEnd} ${y3 + rowH - r} A ${r} ${r} 0 0 1 ${xEnd - r} ${y3 + rowH} L ${x3} ${y3 + rowH} Z`,
      rect: { x: x3, y: y3, width: colW, height: rowH },
      centerY: y3 + rowH / 2,
    },
  ]
}

export function Business3Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const nodes = data.nodes ?? []
  const stepsConfig = getStepsConfig()
  const displayNodes = nodes.length > 0 ? nodes : Array.from({ length: 12 })

  const getElementRect = (elementId: string, defaultRect: Rect): Rect => {
    const stored = positions[elementId]
    return {
      x: stored?.x ?? defaultRect.x,
      y: stored?.y ?? defaultRect.y,
      width: stored?.width ?? defaultRect.width,
      height: stored?.height ?? defaultRect.height,
    }
  }

  const startDefaultRect: Rect = { x: 70, y: 80, width: 40, height: 50 }
  const startVisualRect = getElementRect('start-badge', startDefaultRect)

  const endDefaultRect: Rect = { x: 890, y: 350, width: 40, height: 50 }
  const endVisualRect = getElementRect('end-badge', endDefaultRect)

  return (
    <g ref={svgRef}>
      <g
        data-element-id="start-badge"
        onMouseDown={event => startDrag(event, 'start-badge', startVisualRect)}
        transform={getTransform('start-badge', startVisualRect)}
        style={{ cursor: 'pointer' }}
      >
        <g transform={`translate(${startVisualRect.x + startVisualRect.width / 2}, ${startVisualRect.y + startVisualRect.height / 2})`}>
          <text
            transform="rotate(-90)"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={16}
            fontWeight={800}
            fill={templateColors['start-badge'] ?? '#1D1D4B'}
            letterSpacing="3"
          >
            START
          </text>
        </g>
        {selectedIds.has('start-badge') && renderHandles(startVisualRect, 'start-badge')}
      </g>

      <g
        data-element-id="end-badge"
        onMouseDown={event => startDrag(event, 'end-badge', endVisualRect)}
        transform={getTransform('end-badge', endVisualRect)}
        style={{ cursor: 'pointer' }}
      >
        <g transform={`translate(${endVisualRect.x + endVisualRect.width / 2}, ${endVisualRect.y + endVisualRect.height / 2})`}>
          <text
            transform="rotate(90)"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={16}
            fontWeight={800}
            fill={templateColors['end-badge'] ?? '#1D1D4B'}
            letterSpacing="3"
          >
            END
          </text>
        </g>
        {selectedIds.has('end-badge') && renderHandles(endVisualRect, 'end-badge')}
      </g>

      {displayNodes.map((item, index) => {
        const itemObject = typeof item === 'object' && item !== null ? item : {}
        const cfg = stepsConfig[index % stepsConfig.length]!
        const elementId = `step-${index}`
        const isSelected = selectedIds.has(elementId)

        const defaultColor = DEFAULT_STEP_COLORS[index % DEFAULT_STEP_COLORS.length]!
        const customColor = 'color' in itemObject && typeof itemObject.color === 'string' ? itemObject.color : defaultColor
        const color = templateColors[elementId] ?? customColor

        const strokeColor = templateStrokeColors[elementId] ?? (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = templateStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        const visualRect = getElementRect(elementId, cfg.rect)
        const dx = visualRect.x - cfg.rect.x
        const dy = visualRect.y - cfg.rect.y

        const titleVal =
          'title' in itemObject && typeof itemObject.title === 'string' && itemObject.title
            ? itemObject.title
            : `Title ${index + 1}`

        const descVal =
          'subtitle' in itemObject && typeof itemObject.subtitle === 'string' && itemObject.subtitle
            ? itemObject.subtitle
            : 'text' in itemObject && typeof itemObject.text === 'string' && itemObject.text
              ? itemObject.text
              : 'Content and description to be added here as required'

        const numVal =
          'num' in itemObject && (typeof itemObject.num === 'string' || typeof itemObject.num === 'number')
            ? String(itemObject.num)
            : 'value' in itemObject && typeof itemObject.value === 'string'
              ? itemObject.value
              : 'percent' in itemObject && typeof itemObject.percent === 'string'
                ? itemObject.percent
                : String(index + 1)

        const iconName = 'icon' in itemObject && typeof itemObject.icon === 'string' ? itemObject.icon : undefined
        const iconElement = renderDynamicIcon(iconName, 18, '#FFFFFF')

        const maxTitleChars = Math.max(8, Math.floor(visualRect.width / 14))
        const titleLines = wrapTextByWidth(titleVal, maxTitleChars)

        const dynamicMaxChars = Math.max(12, Math.floor(visualRect.width / 11))
        const descLines = wrapTextByWidth(descVal, dynamicMaxChars)

        const isDoubleDigit = numVal.length >= 2
        const numX = visualRect.x + (isDoubleDigit ? 14 : 20)
        const textX = visualRect.x + (isDoubleDigit ? 62 : 52)
        const centerY = cfg.centerY + dy

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={cfg.path}
                transform={`translate(${dx}, ${dy})`}
                fill={color}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={isSelected ? '4 2' : undefined}
              />

              <text
                x={numX}
                y={centerY + 12}
                fontFamily="Arial, sans-serif"
                fontSize={isDoubleDigit ? 30 : 36}
                fontWeight={700}
                fill="#FFFFFF"
              >
                {numVal}
              </text>

              <g transform={`translate(${textX}, ${centerY - 14})`}>
                {iconElement && <g transform="translate(-22, -12)">{iconElement}</g>}
                <text
                  x={0}
                  y={0}
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fontWeight={700}
                  fill="#FFFFFF"
                >
                  {titleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={0} dy={lineIndex === 0 ? 0 : 14}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>

              <text
                x={textX}
                y={centerY - 14 + (titleLines.length * 14) + 2}
                fontFamily="Arial, sans-serif"
                fontSize={10}
                fill="#FFFFFF"
                opacity={0.92}
              >
                {descLines.slice(0, 3).map((line, lineIndex) => (
                  <tspan key={lineIndex} x={textX} dy={lineIndex === 0 ? 0 : 13}>
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

