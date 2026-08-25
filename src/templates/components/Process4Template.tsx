import { useRef, type ReactElement } from 'react'
import type { Process4Data } from '../types'
import { Arrow, CircleBadge, wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import * as LucideIcons from 'lucide-react'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function renderDynamicIcon(iconName?: string, size = 16, color = '#FFFFFF'): ReactElement | null {
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

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Process4Template({ data }: { data: Process4Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const steps = data.steps ?? []
  const outcome = data.outcome
  const W = 1000
  const cardW = 200
  const cardH = 105
  const gap = 18
  const circleR = 16
  const arrowInset = 14

  const totalWidth = steps.length * cardW + (steps.length - 1) * gap
  const startX = Math.max(30, (W - totalWidth) / 2)
  const cardY = 160

  const getElementRect = (elementId: string, defaultRect: Rect): Rect => {
    const stored = positions[elementId]
    return {
      x: stored?.x ?? defaultRect.x,
      y: stored?.y ?? defaultRect.y,
      width: stored?.width ?? defaultRect.width,
      height: stored?.height ?? defaultRect.height,
    }
  }

  const outcomeDefaultRect: Rect = { x: W / 2 - 150, y: cardY + cardH + 60, width: 300, height: 40 }
  const outcomeVisualRect = getElementRect('outcome-badge', outcomeDefaultRect)

  return (
    <g ref={svgRef}>
      {steps.map((step, index) => {
        const elementId = `step-${index}`
        const defaultColor = PALETTE[index % PALETTE.length]!
        const color = templateColors[elementId] ?? step.color ?? defaultColor
        const isSelected = selectedIds.has(elementId)

        const defaultBx = startX + index * (cardW + gap)
        const defaultRect: Rect = { x: defaultBx, y: cardY, width: cardW, height: cardH }
        const visualRect = getElementRect(elementId, defaultRect)

        const titleLines = wrapTextByWidth(step.title, Math.max(10, Math.floor(visualRect.width / 9)))
        const subtitleLines = step.subtitle
          ? wrapTextByWidth(step.subtitle, Math.max(12, Math.floor(visualRect.width / 7.5)))
          : []

        const iconElement = renderDynamicIcon(step.icon, 16, '#FFFFFF')

        return (
          <g key={elementId}>
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
                rx={8}
                fill={color}
                opacity={0.12}
                stroke={templateStrokeColors[elementId] ?? (isSelected ? '#4a90d9' : color)}
                strokeWidth={templateStrokeWidths[elementId] ?? (isSelected ? 2.5 : 1.5)}
              />

              <CircleBadge
                cx={visualRect.x + visualRect.width / 2}
                cy={visualRect.y + 28}
                r={circleR}
                fill={color}
                label={iconElement ? '' : String(step.number)}
                fontSize={13}
              />

              {iconElement && (
                <g transform={`translate(${visualRect.x + visualRect.width / 2 - 8}, ${visualRect.y + 20})`}>
                  {iconElement}
                </g>
              )}

              <text
                x={visualRect.x + visualRect.width / 2}
                y={visualRect.y + 58}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={700}
                fill="#333"
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={visualRect.x + visualRect.width / 2} dy={lineIndex === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>

              {subtitleLines.length > 0 && (
                <text
                  x={visualRect.x + visualRect.width / 2}
                  y={visualRect.y + 60 + titleLines.length * 16}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={10}
                  fill="#666"
                >
                  {subtitleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={visualRect.x + visualRect.width / 2} dy={lineIndex === 0 ? 0 : 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {isSelected && (
                <rect
                  x={visualRect.x - 1}
                  y={visualRect.y - 1}
                  width={visualRect.width + 2}
                  height={visualRect.height + 2}
                  rx={8}
                  fill="none"
                  stroke="#4a90d9"
                  strokeWidth={2}
                  strokeDasharray="4 2"
                />
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {index < steps.length - 1 && (() => {
              const nextId = `step-${index + 1}`
              const nextBx = startX + (index + 1) * (cardW + gap)
              const nextDefaultRect: Rect = { x: nextBx, y: cardY, width: cardW, height: cardH }
              const nextVisualRect = getElementRect(nextId, nextDefaultRect)

              return (
                <Arrow
                  from={{ x: visualRect.x + visualRect.width + arrowInset / 2, y: visualRect.y + visualRect.height / 2 }}
                  to={{ x: nextVisualRect.x - arrowInset / 2, y: nextVisualRect.y + nextVisualRect.height / 2 }}
                  color="#999"
                />
              )
            })()}
          </g>
        )
      })}

      {outcome && (
        <g
          data-element-id="outcome-badge"
          onMouseDown={event => startDrag(event, 'outcome-badge', outcomeVisualRect)}
          transform={getTransform('outcome-badge', outcomeVisualRect)}
          style={{ cursor: 'pointer' }}
        >
          <text
            x={outcomeVisualRect.x + outcomeVisualRect.width / 2}
            y={outcomeVisualRect.y + 24}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={13}
            fontWeight={600}
            fill="#777"
          >
            Outcome: {outcome}
          </text>
          {selectedIds.has('outcome-badge') && renderHandles(outcomeVisualRect, 'outcome-badge')}
        </g>
      )}
    </g>
  )
}

