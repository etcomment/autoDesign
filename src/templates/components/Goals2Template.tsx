import { useEffect, useMemo, useRef, type ReactElement, type ComponentType } from 'react'
import type { GoalsData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function resolveDynamicIcon(iconName?: string, size = 18, color = '#ffffff'): ReactElement | null {
  if (!iconName) return null
  const cleanedName = iconName.trim()

  const templateIconFunction = TEMPLATE_ICONS[cleanedName] || TEMPLATE_ICONS[cleanedName.toLowerCase()]
  if (templateIconFunction) {
    return templateIconFunction({ size, color })
  }

  const pascalCaseName = cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1)
  const lucideIconMap = LucideIcons as unknown as Record<string, ComponentType<{ size?: number; color?: string; className?: string }>>
  const LucideIconComponent = lucideIconMap[pascalCaseName] || lucideIconMap[cleanedName] || lucideIconMap[cleanedName.toUpperCase()]

  if (LucideIconComponent) {
    return <LucideIconComponent size={size} color={color} />
  }

  return null
}

function retrieveElementRect(elementId: string, customPositions: Record<string, Rect>, defaultLayout: Map<string, Rect>): Rect {
  const storedRect = customPositions[elementId]
  const defaultRect = defaultLayout.get(elementId)
  if (defaultRect) {
    return storedRect ? { ...storedRect, width: storedRect.width || defaultRect.width, height: storedRect.height || defaultRect.height } : defaultRect
  }
  return storedRect || { x: 0, y: 0, width: 0, height: 0 }
}

const DEFAULT_ANGLES_5 = [-90, -22, 48, 132, -158]

export function Goals2Template({ data }: { data: GoalsData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedElementIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const customColors = useTemplateStore(state => state.templateElementColors)
  const customStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const customStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const customPositions = useTemplateStore(state => state.templateElementPositions)
  const moveElement = useTemplateStore(state => state.moveTemplateElement)
  const resizeElement = useTemplateStore(state => state.resizeTemplateElement)

  const { metrics = [] } = data
  const count = Math.max(1, metrics.length)

  const targetCenterX = 490
  const targetCenterY = 300
  const targetOuterRadius = 145

  const defaultLayoutMap = useMemo(() => {
    const layoutMap = new Map<string, Rect>()

    layoutMap.set('target', {
      x: targetCenterX - targetOuterRadius,
      y: targetCenterY - targetOuterRadius,
      width: targetOuterRadius * 2,
      height: targetOuterRadius * 2,
    })

    metrics.forEach((_, index) => {
      const angleDeg = count === 5 ? DEFAULT_ANGLES_5[index]! : -90 + (index * 360) / count
      const angleRad = (angleDeg * Math.PI) / 180
      const cosA = Math.cos(angleRad)
      const sinA = Math.sin(angleRad)

      const arrowTipX = targetCenterX + cosA * (targetOuterRadius + 45)
      const arrowTipY = targetCenterY + sinA * (targetOuterRadius + 45)

      layoutMap.set(`arrow-${index}`, {
        x: Math.min(targetCenterX, arrowTipX) - 25,
        y: Math.min(targetCenterY, arrowTipY) - 25,
        width: Math.abs(arrowTipX - targetCenterX) + 50,
        height: Math.abs(arrowTipY - targetCenterY) + 50,
      })

      const isRightSide = cosA >= -0.1
      const textX = isRightSide ? 740 : 40
      const textY = Math.max(50, Math.min(500, targetCenterY + sinA * 180 - 30))

      layoutMap.set(`text-${index}`, {
        x: textX,
        y: textY,
        width: 220,
        height: 80,
      })
    })

    return layoutMap
  }, [metrics, count, targetCenterX, targetCenterY, targetOuterRadius])

  const prevNRef = useRef(count)
  useEffect(() => {
    const countChanged = prevNRef.current !== count
    prevNRef.current = count
    for (const [elementId, defaultRect] of defaultLayoutMap.entries()) {
      if (countChanged || !customPositions[elementId]) {
        moveElement(elementId, { x: defaultRect.x, y: defaultRect.y })
        resizeElement(elementId, { width: defaultRect.width, height: defaultRect.height })
      }
    }
  }, [count, defaultLayoutMap, customPositions, moveElement, resizeElement])

  const calculatedRects = useMemo(() => {
    const rects = new Map<string, Rect>()
    for (const elementId of defaultLayoutMap.keys()) {
      rects.set(elementId, retrieveElementRect(elementId, customPositions, defaultLayoutMap))
    }
    return rects
  }, [defaultLayoutMap, customPositions])

  const targetRect = calculatedRects.get('target') ?? {
    x: targetCenterX - targetOuterRadius,
    y: targetCenterY - targetOuterRadius,
    width: targetOuterRadius * 2,
    height: targetOuterRadius * 2,
  }
  const isTargetSelected = selectedElementIds.has('target')
  const currentCenterX = targetRect.x + targetRect.width / 2
  const currentCenterY = targetRect.y + targetRect.height / 2
  const currentOuterRadius = targetRect.width / 2

  return (
    <g ref={svgRef}>
      <g
        data-element-id="target"
        onMouseDown={event => startDrag(event, 'target', targetRect)}
        transform={getTransform('target', targetRect)}
        style={{ cursor: 'pointer' }}
      >
        <defs>
          <clipPath id="goals2-target-left">
            <rect
              x={currentCenterX - currentOuterRadius}
              y={currentCenterY - currentOuterRadius}
              width={currentOuterRadius}
              height={currentOuterRadius * 2}
            />
          </clipPath>
          <clipPath id="goals2-target-right">
            <rect
              x={currentCenterX}
              y={currentCenterY - currentOuterRadius}
              width={currentOuterRadius}
              height={currentOuterRadius * 2}
            />
          </clipPath>
        </defs>

        <circle cx={currentCenterX} cy={currentCenterY} r={currentOuterRadius} fill="#52b788" clipPath="url(#goals2-target-left)" />
        <circle cx={currentCenterX} cy={currentCenterY} r={currentOuterRadius} fill="#2d6a4f" clipPath="url(#goals2-target-right)" />

        <circle cx={currentCenterX} cy={currentCenterY} r={currentOuterRadius * 0.76} fill="#ffffff" />

        <circle cx={currentCenterX} cy={currentCenterY} r={currentOuterRadius * 0.54} fill="#52b788" clipPath="url(#goals2-target-left)" />
        <circle cx={currentCenterX} cy={currentCenterY} r={currentOuterRadius * 0.54} fill="#2d6a4f" clipPath="url(#goals2-target-right)" />

        <circle cx={currentCenterX} cy={currentCenterY} r={currentOuterRadius * 0.3} fill="#ffffff" />

        <circle cx={currentCenterX} cy={currentCenterY} r={currentOuterRadius * 0.14} fill="#52b788" clipPath="url(#goals2-target-left)" />
        <circle cx={currentCenterX} cy={currentCenterY} r={currentOuterRadius * 0.14} fill="#2d6a4f" clipPath="url(#goals2-target-right)" />

        {isTargetSelected && renderHandles(targetRect, 'target')}
      </g>

      {metrics.map((metric, index) => {
        const arrowElementId = `arrow-${index}`
        const textElementId = `text-${index}`

        const arrowRect = calculatedRects.get(arrowElementId)!
        const textRect = calculatedRects.get(textElementId)!

        const isArrowSelected = selectedElementIds.has(arrowElementId)
        const isTextSelected = selectedElementIds.has(textElementId)

        const elementColor = customColors[arrowElementId] ?? metric.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!

        const textFill = customColors[textElementId] ?? 'transparent'
        const textStroke = customStrokeColors[textElementId] ?? 'none'
        const textStrokeWidth = customStrokeWidths[textElementId] ?? (textStroke !== 'none' && textStroke !== 'transparent' ? 2 : 0)
        const hasTextBg = textFill !== 'transparent' && textFill !== 'none'
        const hasTextBorder = textStroke !== 'transparent' && textStroke !== 'none' && textStrokeWidth > 0

        const angleDeg = count === 5 ? DEFAULT_ANGLES_5[index]! : -90 + (index * 360) / count
        const angleRad = (angleDeg * Math.PI) / 180
        const cosA = Math.cos(angleRad)
        const sinA = Math.sin(angleRad)

        const shaftStartX = currentCenterX + cosA * 22
        const shaftStartY = currentCenterY + sinA * 22
        const shaftEndX = currentCenterX + cosA * (currentOuterRadius + 32)
        const shaftEndY = currentCenterY + sinA * (currentOuterRadius + 32)

        const displayTitle = metric.label || `Your title 0${index + 1}`
        const displayDesc = metric.description || metric.subtitle || metric.value || 'MIGSO-PCUBED content and words to be added here as required'

        const isRightSide = cosA >= -0.1
        const titleLines = wrapTextByWidth(displayTitle, Math.max(10, Math.floor(textRect.width / 10)))
        const descLines = wrapTextByWidth(displayDesc, Math.max(12, Math.floor(textRect.width / 7.5)))

        const contentHeight = 12 + titleLines.length * 20 + descLines.length * 17 + 8
        const effectiveTextRect: Rect = {
          ...textRect,
          height: Math.max(textRect.height, contentHeight),
        }

        const dynamicIconElement = resolveDynamicIcon(metric.icon, 18, '#ffffff')

        return (
          <g key={`goal2-item-${index}`}>
            <g
              data-element-id={arrowElementId}
              onMouseDown={event => startDrag(event, arrowElementId, arrowRect)}
              transform={getTransform(arrowElementId, arrowRect)}
              style={{ cursor: 'pointer' }}
            >
              <line
                x1={shaftStartX}
                y1={shaftStartY}
                x2={shaftEndX}
                y2={shaftEndY}
                stroke="#ffffff"
                strokeWidth={5}
                strokeLinecap="round"
              />

              <circle cx={shaftStartX} cy={shaftStartY} r={4} fill="#ffffff" />

              <g transform={`translate(${shaftEndX}, ${shaftEndY}) rotate(${angleDeg + 90})`}>
                <polygon
                  points="-12,0 -16,-22 -3,-17 0,-20 3,-17 16,-22 12,0 0,6"
                  fill={elementColor}
                  stroke="#ffffff"
                  strokeWidth={1}
                />
                {dynamicIconElement && (
                  <g transform="translate(-9, -15)">
                    {dynamicIconElement}
                  </g>
                )}
              </g>

              {isArrowSelected && renderHandles(arrowRect, arrowElementId)}
            </g>

            <g
              data-element-id={textElementId}
              onMouseDown={event => startDrag(event, textElementId, effectiveTextRect)}
              transform={getTransform(textElementId, effectiveTextRect)}
              style={{ cursor: 'pointer' }}
            >
              {(hasTextBg || hasTextBorder) && (
                <rect
                  x={effectiveTextRect.x}
                  y={effectiveTextRect.y}
                  width={effectiveTextRect.width}
                  height={effectiveTextRect.height}
                  rx={6}
                  fill={textFill}
                  stroke={textStroke}
                  strokeWidth={textStrokeWidth}
                />
              )}

              <text
                x={isRightSide ? effectiveTextRect.x : effectiveTextRect.x + effectiveTextRect.width}
                y={effectiveTextRect.y + 18}
                textAnchor={isRightSide ? 'start' : 'end'}
                fontFamily="Arial, sans-serif"
                fontSize={16}
                fontWeight={700}
                fill={customColors[`${textElementId}-title`] ?? elementColor}
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan
                    key={lineIndex}
                    x={isRightSide ? effectiveTextRect.x : effectiveTextRect.x + effectiveTextRect.width}
                    dy={lineIndex === 0 ? 0 : 20}
                  >
                    {line}
                  </tspan>
                ))}
              </text>

              <text
                x={isRightSide ? effectiveTextRect.x : effectiveTextRect.x + effectiveTextRect.width}
                y={effectiveTextRect.y + 18 + titleLines.length * 20 + 2}
                textAnchor={isRightSide ? 'start' : 'end'}
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={400}
                fill={customColors[`${textElementId}-desc`] ?? '#5f6368'}
              >
                {descLines.map((line, lineIndex) => (
                  <tspan
                    key={lineIndex}
                    x={isRightSide ? effectiveTextRect.x : effectiveTextRect.x + effectiveTextRect.width}
                    dy={lineIndex === 0 ? 0 : 17}
                  >
                    {line}
                  </tspan>
                ))}
              </text>

              {isTextSelected && renderHandles(effectiveTextRect, textElementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
