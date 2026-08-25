import { useRef, type ReactElement } from 'react'
import type { Process2Data } from '../types'
import { ChevronArrow, Arrow, CircleBadge, wrapTextByWidth } from '../shared/primitives'
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

function renderDynamicIcon(iconName?: string, size = 16, color = '#2B2B60'): ReactElement | null {
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

export function Process2Template({ data }: { data: Process2Data }): ReactElement {
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
  const normalW = 140
  const normalH = 65
  const largeW = 180
  const largeH = 80
  const gap = 16
  const circleR = 14

  const normalCount = Math.max(steps.length - 1, 0)
  const totalWidth = normalCount * normalW + largeW + (steps.length - 1) * gap
  const startX = Math.max(30, (W - totalWidth) / 2)
  const stepY = 180

  const getElementRect = (elementId: string, defaultRect: Rect): Rect => {
    const stored = positions[elementId]
    return {
      x: stored?.x ?? defaultRect.x,
      y: stored?.y ?? defaultRect.y,
      width: stored?.width ?? defaultRect.width,
      height: stored?.height ?? defaultRect.height,
    }
  }

  const outcomeDefaultRect: Rect = { x: W / 2 - 150, y: stepY + 120, width: 300, height: 40 }
  const outcomeVisualRect = getElementRect('outcome-badge', outcomeDefaultRect)

  return (
    <g ref={svgRef}>
      {steps.map((step, index) => {
        const elementId = `step-${index}`
        const isLast = index === steps.length - 1
        const blockW = isLast ? largeW : normalW
        const blockH = isLast ? largeH : normalH
        const bx = startX + index * (normalW + gap) + (isLast ? (normalW - largeW) : 0)
        const by = isLast ? stepY - (largeH - normalH) / 2 : stepY
        const defaultColor = PALETTE[index % PALETTE.length]!
        const color = templateColors[elementId] ?? step.color ?? defaultColor
        const isSelected = selectedIds.has(elementId)

        const defaultRect: Rect = { x: bx, y: by, width: blockW, height: blockH }
        const visualRect = getElementRect(elementId, defaultRect)

        const titleLines = wrapTextByWidth(step.title, Math.max(8, Math.floor((visualRect.width - 50) / 8)))
        const subtitleLines = step.subtitle
          ? wrapTextByWidth(step.subtitle, Math.max(10, Math.floor((visualRect.width - 50) / 7)))
          : []

        const iconElement = renderDynamicIcon(step.icon, 16, color)

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <ChevronArrow
                x={visualRect.x}
                y={visualRect.y}
                width={visualRect.width}
                height={visualRect.height}
                fill={color}
              />

              {isSelected && (
                <rect
                  x={visualRect.x - 1}
                  y={visualRect.y - 1}
                  width={visualRect.width + 2}
                  height={visualRect.height + 2}
                  rx={2}
                  fill="none"
                  stroke={templateStrokeColors[elementId] ?? '#4a90d9'}
                  strokeWidth={templateStrokeWidths[elementId] ?? 2.5}
                  strokeDasharray="4 2"
                />
              )}

              <CircleBadge
                cx={visualRect.x + 36}
                cy={visualRect.y + visualRect.height / 2}
                r={circleR}
                fill={isLast ? '#fff' : 'white'}
                label={iconElement ? '' : String(step.number)}
                fontSize={11}
              />

              {iconElement && (
                <g transform={`translate(${visualRect.x + 28}, ${visualRect.y + visualRect.height / 2 - 8})`}>
                  {iconElement}
                </g>
              )}

              {isLast && (
                <circle
                  cx={visualRect.x + 36}
                  cy={visualRect.y + visualRect.height / 2}
                  r={circleR}
                  fill="none"
                  stroke="white"
                  strokeWidth={1.5}
                />
              )}

              <text
                x={visualRect.x + visualRect.width / 2 + 12}
                y={visualRect.y + visualRect.height / 2 + (subtitleLines.length > 0 ? -4 : 4)}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={isLast ? 13 : 11}
                fontWeight={700}
                fill={color === '#f2cb13' ? '#333' : 'white'}
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={visualRect.x + visualRect.width / 2 + 12} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>

              {subtitleLines.length > 0 && (
                <text
                  x={visualRect.x + visualRect.width / 2 + 12}
                  y={visualRect.y + visualRect.height / 2 + 14}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={9}
                  fill={color === '#f2cb13' ? '#555' : 'rgba(255,255,255,0.85)'}
                >
                  {subtitleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={visualRect.x + visualRect.width / 2 + 12} dy={lineIndex === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {index < steps.length - 1 && (() => {
              const nextId = `step-${index + 1}`
              const isNextLast = index + 1 === steps.length - 1
              const nextBlockW = isNextLast ? largeW : normalW
              const nextBlockH = isNextLast ? largeH : normalH
              const nextBx = startX + (index + 1) * (normalW + gap) + (isNextLast ? normalW - largeW : 0)
              const nextBy = isNextLast ? stepY - (largeH - normalH) / 2 : stepY
              const nextDefaultRect: Rect = { x: nextBx, y: nextBy, width: nextBlockW, height: nextBlockH }
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
            fill="#555"
          >
            RESULT: {outcome}
          </text>
          {selectedIds.has('outcome-badge') && renderHandles(outcomeVisualRect, 'outcome-badge')}
        </g>
      )}
    </g>
  )
}

