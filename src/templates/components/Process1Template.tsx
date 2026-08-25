import { useRef, type ReactElement } from 'react'
import type { ProcessData } from '../types'
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

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Process1Template({ data }: { data: ProcessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const steps = data.steps ?? []
  const outcome = data.outcome

  const W = 960
  const stepW = 150
  const stepH = 95
  const gap = 30
  const totalW = steps.length * stepW + (steps.length - 1) * gap
  const startX = Math.max(40, (W - totalW) / 2)
  const stepY = 160

  const useItems = steps.slice(0, 5)

  const getElementRect = (elementId: string, defaultRect: Rect): Rect => {
    const stored = positions[elementId]
    return {
      x: stored?.x ?? defaultRect.x,
      y: stored?.y ?? defaultRect.y,
      width: stored?.width ?? defaultRect.width,
      height: stored?.height ?? defaultRect.height,
    }
  }

  const outcomeDefaultRect: Rect = { x: W / 2 - 150, y: stepY + stepH + 60, width: 300, height: 40 }
  const outcomeVisualRect = getElementRect('outcome-badge', outcomeDefaultRect)

  return (
    <g ref={svgRef}>
      {useItems.map((step, i) => {
        const elementId = `step-${i}`
        const defaultColor = PALETTE[i % PALETTE.length]!
        const color = templateColors[elementId] ?? step.color ?? defaultColor
        const isSelected = selectedIds.has(elementId)

        const defaultSx = startX + i * (stepW + gap)
        const defaultRect: Rect = { x: defaultSx, y: stepY, width: stepW, height: stepH }
        const visualRect = getElementRect(elementId, defaultRect)

        const titleLines = wrapTextByWidth(step.title, Math.max(10, Math.floor(visualRect.width / 10)))
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
                rx={12}
                fill={templateColors[`bg-${elementId}`] ?? 'transparent'}
                stroke={templateStrokeColors[elementId] ?? (isSelected ? '#4a90d9' : color)}
                strokeWidth={templateStrokeWidths[elementId] ?? (isSelected ? 2.5 : 2)}
                strokeDasharray={isSelected ? '4 2' : undefined}
              />

              <CircleBadge
                cx={visualRect.x + visualRect.width / 2}
                cy={visualRect.y + 24}
                r={16}
                fill={color}
                label={iconElement ? '' : String(step.number)}
                fontSize={11}
              />

              {iconElement && (
                <g transform={`translate(${visualRect.x + visualRect.width / 2 - 8}, ${visualRect.y + 16})`}>
                  {iconElement}
                </g>
              )}

              <text
                x={visualRect.x + visualRect.width / 2}
                y={visualRect.y + 56}
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
                  y={visualRect.y + visualRect.height + 16}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={10}
                  fill="#888"
                >
                  {subtitleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={visualRect.x + visualRect.width / 2} dy={lineIndex === 0 ? 0 : 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {i < useItems.length - 1 && (() => {
              const nextId = `step-${i + 1}`
              const nextSx = startX + (i + 1) * (stepW + gap)
              const nextDefaultRect: Rect = { x: nextSx, y: stepY, width: stepW, height: stepH }
              const nextVisualRect = getElementRect(nextId, nextDefaultRect)

              return (
                <Arrow
                  from={{ x: visualRect.x + visualRect.width + 2, y: visualRect.y + visualRect.height / 2 }}
                  to={{ x: nextVisualRect.x - 2, y: nextVisualRect.y + nextVisualRect.height / 2 }}
                  color={color}
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
            fontSize={14}
            fontWeight={700}
            fill="#888"
          >
            Outcome: {outcome}
          </text>
          {selectedIds.has('outcome-badge') && renderHandles(outcomeVisualRect, 'outcome-badge')}
        </g>
      )}
    </g>
  )
}

