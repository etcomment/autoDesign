import { useRef, type ReactElement } from 'react'
import type { Process5Data } from '../types'
import { CircleBadge, wrapTextByWidth } from '../shared/primitives'
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

export function Process5Template({ data }: { data: Process5Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const steps = data.steps ?? []
  const outcome = data.outcome
  const W = 920
  const stepSpacing = 95
  const circleX = 120
  const circleR = 20
  const cardX = 165
  const cardW = 320
  const cardH = 75
  const firstStepY = 80

  const getElementRect = (elementId: string, defaultRect: Rect): Rect => {
    const stored = positions[elementId]
    return {
      x: stored?.x ?? defaultRect.x,
      y: stored?.y ?? defaultRect.y,
      width: stored?.width ?? defaultRect.width,
      height: stored?.height ?? defaultRect.height,
    }
  }

  const outcomeDefaultRect: Rect = {
    x: W / 2 - 150,
    y: firstStepY + steps.length * stepSpacing + 20,
    width: 300,
    height: 40,
  }
  const outcomeVisualRect = getElementRect('outcome-badge', outcomeDefaultRect)

  const circlePositions = steps.map((_, index) => {
    const circleId = `badge-${index}`
    const defaultRect: Rect = {
      x: circleX - circleR,
      y: firstStepY + index * stepSpacing - circleR,
      width: circleR * 2,
      height: circleR * 2,
    }
    const visual = getElementRect(circleId, defaultRect)
    return {
      id: circleId,
      cx: visual.x + visual.width / 2,
      cy: visual.y + visual.height / 2,
      visual,
    }
  })

  return (
    <g ref={svgRef}>
      {steps.length > 1 && circlePositions.length > 1 && (
        <line
          x1={circlePositions[0]!.cx}
          y1={circlePositions[0]!.cy}
          x2={circlePositions[circlePositions.length - 1]!.cx}
          y2={circlePositions[circlePositions.length - 1]!.cy}
          stroke="#ddd"
          strokeWidth={3}
          strokeLinecap="round"
        />
      )}

      {steps.map((step, index) => {
        const elementId = `step-${index}`
        const circleInfo = circlePositions[index]!
        const defaultColor = PALETTE[index % PALETTE.length]!
        const color = templateColors[elementId] ?? step.color ?? defaultColor
        const isSelected = selectedIds.has(elementId)
        const isCircleSelected = selectedIds.has(circleInfo.id)

        const cy = firstStepY + index * stepSpacing
        const by = cy - cardH / 2
        const isEven = index % 2 === 0
        const bgOpacity = isEven ? 0.1 : 0.18

        const defaultRect: Rect = { x: cardX, y: by, width: cardW, height: cardH }
        const visualRect = getElementRect(elementId, defaultRect)

        const titleLines = wrapTextByWidth(step.title, Math.max(12, Math.floor(visualRect.width / 11)))
        const subtitleLines = step.subtitle
          ? wrapTextByWidth(step.subtitle, Math.max(16, Math.floor(visualRect.width / 8)))
          : []

        const iconElement = renderDynamicIcon(step.icon, 18, '#FFFFFF')

        return (
          <g key={elementId}>
            <line
              x1={circleInfo.cx + circleR}
              y1={circleInfo.cy}
              x2={visualRect.x}
              y2={visualRect.y + visualRect.height / 2}
              stroke={color}
              strokeWidth={2}
            />

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
                opacity={bgOpacity}
                stroke={templateStrokeColors[elementId] ?? (isSelected ? '#4a90d9' : color)}
                strokeWidth={templateStrokeWidths[elementId] ?? (isSelected ? 2.5 : 1.5)}
              />

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

              <text
                x={visualRect.x + 16}
                y={visualRect.y + 24}
                textAnchor="start"
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={700}
                fill="#333"
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={visualRect.x + 16} dy={lineIndex === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>

              {subtitleLines.length > 0 && (
                <text
                  x={visualRect.x + 16}
                  y={visualRect.y + 24 + titleLines.length * 16 + 2}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={10.5}
                  fill="#777"
                >
                  {subtitleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={visualRect.x + 16} dy={lineIndex === 0 ? 0 : 14}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            <g
              data-element-id={circleInfo.id}
              onMouseDown={event => startDrag(event, circleInfo.id, circleInfo.visual)}
              transform={getTransform(circleInfo.id, circleInfo.visual)}
              style={{ cursor: 'pointer' }}
            >
              <CircleBadge
                cx={circleInfo.cx}
                cy={circleInfo.cy}
                r={circleR}
                fill={templateColors[circleInfo.id] ?? color}
                label={iconElement ? '' : String(step.number)}
                fontSize={13}
              />
              {iconElement && (
                <g transform={`translate(${circleInfo.cx - 9}, ${circleInfo.cy - 9})`}>
                  {iconElement}
                </g>
              )}
              {isCircleSelected && renderHandles(circleInfo.visual, circleInfo.id)}
            </g>
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
            fontWeight={600}
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

