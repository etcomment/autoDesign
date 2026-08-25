import { useRef, type ReactElement } from 'react'
import type { ProcessData } from '../types'
import { CurvedPath, CircleBadge, wrapTextByWidth } from '../shared/primitives'
import { StarIcon, TEMPLATE_ICONS } from '../shared/icons'
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

const COLORS = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function ProcessTemplate({ data }: { data: ProcessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const steps = data.steps ?? []
  const outcome = data.outcome

  const halfCount = Math.ceil(steps.length / 2)
  const topSteps = steps.slice(0, halfCount)
  const bottomSteps = steps.slice(halfCount)

  const topStartX = 160
  const topEndX = 800
  const topY = 120
  const topWidth = topEndX - topStartX

  const bottomStartX = 800
  const bottomEndX = 160
  const bottomY = 320
  const bottomWidth = bottomStartX - bottomEndX

  const topPositions = topSteps.map((_, i) => {
    const defaultX = topStartX + (topWidth * i) / Math.max(topSteps.length - 1, 1)
    const custom = positions[`step-${i}`]
    return {
      x: custom?.x ?? defaultX,
      y: custom?.y ?? topY,
      stepIndex: i,
    }
  })

  const bottomPositions = bottomSteps.map((_, i) => {
    const defaultX = bottomStartX - (bottomWidth * i) / Math.max(bottomSteps.length - 1, 1)
    const custom = positions[`step-${halfCount + i}`]
    return {
      x: custom?.x ?? defaultX,
      y: custom?.y ?? bottomY,
      stepIndex: halfCount + i,
    }
  })

  const allPositions = [...topPositions, ...bottomPositions]

  const startPoint = { x: 80, y: topPositions[0]?.y ?? topY }
  const lastPos = allPositions.length > 0 ? allPositions[allPositions.length - 1]! : { x: 180, y: topY }
  const outcomeDefaultX = lastPos.x
  const outcomeDefaultY = 470

  const getElementRect = (elementId: string, defaultRect: Rect): Rect => {
    const stored = positions[elementId]
    return {
      x: stored?.x ?? defaultRect.x,
      y: stored?.y ?? defaultRect.y,
      width: stored?.width ?? defaultRect.width,
      height: stored?.height ?? defaultRect.height,
    }
  }

  const outcomeDefaultRect: Rect = { x: outcomeDefaultX, y: outcomeDefaultY - 40, width: 220, height: 60 }
  const outcomeVisualRect = getElementRect('outcome-badge', outcomeDefaultRect)
  const outcomeX = outcomeVisualRect.x
  const outcomeY = outcomeVisualRect.y + 40

  const curvePoints: { x: number; y: number }[] = [startPoint]

  if (topPositions.length > 0) {
    for (const p of topPositions) curvePoints.push({ x: p.x, y: p.y })
    const lastTop = topPositions[topPositions.length - 1]!
    if (bottomPositions.length > 0) {
      const firstBottom = bottomPositions[0]!
      curvePoints.push({ x: lastTop.x + 50, y: lastTop.y })
      curvePoints.push({ x: firstBottom.x + 50, y: (lastTop.y + firstBottom.y) / 2 })
      curvePoints.push({ x: firstBottom.x, y: firstBottom.y - 50 })
      for (const p of bottomPositions) curvePoints.push({ x: p.x, y: p.y })
    }
    const finalPos = bottomPositions.length > 0 ? bottomPositions[bottomPositions.length - 1]! : lastTop
    curvePoints.push({ x: finalPos.x - 50, y: finalPos.y })
    curvePoints.push({ x: outcomeX - 50, y: (finalPos.y + outcomeY) / 2 })
  } else {
    curvePoints.push({ x: outcomeX, y: outcomeY })
  }

  curvePoints.push({ x: outcomeX, y: outcomeY })

  return (
    <g ref={svgRef}>
      <CurvedPath points={curvePoints} color="#bbb" strokeWidth={2.5} />

      <text
        x={startPoint.x - 16}
        y={startPoint.y + 4}
        textAnchor="end"
        fontFamily="Arial, sans-serif"
        fontSize={11}
        fontWeight={700}
        fill="#888"
        letterSpacing={1}
      >
        START
      </text>

      {allPositions.map(pos => {
        const step = steps[pos.stepIndex]!
        const elementId = `step-${pos.stepIndex}`
        const defaultColor = COLORS[pos.stepIndex % COLORS.length]!
        const color = templateColors[elementId] ?? step.color ?? defaultColor
        const strokeColor = templateStrokeColors[elementId]
        const strokeW = templateStrokeWidths[elementId]

        const isSelected = selectedIds.has(elementId)
        const isTop = topPositions.some(tp => tp.stepIndex === pos.stepIndex)
        const finalW = 120
        const finalH = 75

        const defaultRect: Rect = isTop
          ? { x: pos.x - finalW / 2, y: pos.y - 20, width: finalW, height: finalH }
          : { x: pos.x - finalW / 2, y: pos.y - finalH + 14, width: finalW, height: finalH }

        const visualRect = getElementRect(elementId, defaultRect)
        const finalX = visualRect.x + visualRect.width / 2
        const finalY = isTop ? visualRect.y + 20 : visualRect.y + visualRect.height - 14

        const labelOffsetY = isTop ? 28 : -28

        const titleLines = wrapTextByWidth(step.title, Math.max(10, Math.floor(visualRect.width / 8.5)))
        const subtitleLines = step.subtitle
          ? wrapTextByWidth(step.subtitle, Math.max(12, Math.floor(visualRect.width / 7.5)))
          : []

        const iconElement = renderDynamicIcon(step.icon, 16, '#FFFFFF')

        return (
          <g key={pos.stepIndex}>
            <g
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <CircleBadge cx={finalX} cy={finalY} r={16} fill={color} label={iconElement ? '' : String(step.number)} fontSize={12} />
              {iconElement && (
                <g transform={`translate(${finalX - 8}, ${finalY - 8})`}>
                  {iconElement}
                </g>
              )}

              {(strokeColor || strokeW) && (
                <circle cx={finalX} cy={finalY} r={16} fill="none" stroke={strokeColor || color} strokeWidth={strokeW || 1} />
              )}

              {isSelected && (
                <>
                  <circle cx={finalX} cy={finalY} r={18} fill="none" stroke="#4a90d9" strokeWidth={2.5} strokeDasharray="4 2" />
                  <rect
                    x={visualRect.x}
                    y={visualRect.y}
                    width={visualRect.width}
                    height={visualRect.height}
                    rx={4}
                    fill="none"
                    stroke="#4a90d9"
                    strokeWidth={1}
                    strokeDasharray="4 2"
                    opacity={0.5}
                  />
                </>
              )}

              <text
                x={finalX}
                y={finalY + labelOffsetY}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={11}
                fontWeight={700}
                fill="#333"
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={finalX} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>

              {subtitleLines.length > 0 && (
                <text
                  x={finalX}
                  y={finalY + labelOffsetY + titleLines.length * 14}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={9}
                  fill="#777"
                >
                  {subtitleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={finalX} dy={lineIndex === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      <g
        data-element-id="outcome-badge"
        onMouseDown={event => startDrag(event, 'outcome-badge', outcomeVisualRect)}
        transform={getTransform('outcome-badge', outcomeVisualRect)}
        style={{ cursor: 'pointer' }}
      >
        <g transform={`translate(${outcomeX + 8}, ${outcomeY - 40})`}>
          <StarIcon size={32} fill={templateColors['outcome-badge'] ?? '#ffc107'} color="#e0a800" />
        </g>

        {outcome && (
          <text
            x={outcomeX + 52}
            y={outcomeY - 12}
            textAnchor="start"
            fontFamily="Arial, sans-serif"
            fontSize={14}
            fontWeight={700}
            fill="#333"
          >
            {wrapTextByWidth(outcome, Math.max(14, Math.floor((outcomeVisualRect.width - 55) / 9))).map(
              (line, lineIndex) => (
                <tspan key={lineIndex} x={outcomeX + 52} dy={lineIndex === 0 ? 0 : 18}>
                  {line}
                </tspan>
              )
            )}
          </text>
        )}

        {selectedIds.has('outcome-badge') && renderHandles(outcomeVisualRect, 'outcome-badge')}
      </g>
    </g>
  )
}

