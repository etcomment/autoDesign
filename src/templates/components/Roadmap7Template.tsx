import { useEffect, useMemo, useRef, type ReactElement, type ComponentType } from 'react'
import type { RoadmapData } from '../types'
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

function resolveDynamicIcon(iconName?: string, size = 20, color = '#ffffff'): ReactElement | null {
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

export function Roadmap7Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedElementIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const customColors = useTemplateStore(state => state.templateElementColors)
  const customStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const customStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const customPositions = useTemplateStore(state => state.templateElementPositions)
  const moveElement = useTemplateStore(state => state.moveTemplateElement)
  const resizeElement = useTemplateStore(state => state.resizeTemplateElement)

  const { milestones = [] } = data
  const milestoneCount = Math.max(1, milestones.length)

  const canvasWidth = 1000
  const timelineX = 220
  const dateLabelWidth = 150
  const dateLabelRightEdgeX = timelineX - 25

  const topVerticalPosition = milestoneCount === 1 ? 260 : (milestoneCount <= 3 ? 120 : (milestoneCount <= 5 ? 80 : 50))
  const bottomVerticalPosition = milestoneCount === 1 ? 260 : (milestoneCount <= 3 ? 480 : (milestoneCount <= 5 ? 520 : 550))
  const verticalSpacing = milestoneCount > 1 ? (bottomVerticalPosition - topVerticalPosition) / (milestoneCount - 1) : 0
  const bubbleRadius = milestoneCount <= 3 ? 46 : (milestoneCount <= 5 ? 40 : Math.max(26, Math.min(36, (verticalSpacing - 16) / 2)))

  const bubbleCenterX = timelineX + 90
  const textStartX = bubbleCenterX + bubbleRadius + 28
  const textWidth = canvasWidth - textStartX - 35

  const defaultLayoutMap = useMemo(() => {
    const layoutMap = new Map<string, Rect>()
    const timelineHeight = (milestoneCount - 1) * verticalSpacing + 80
    layoutMap.set('timeline', {
      x: timelineX - 2,
      y: topVerticalPosition - 40,
      width: 4,
      height: timelineHeight,
    })

    milestones.forEach((_, index) => {
      const centerY = topVerticalPosition + index * verticalSpacing
      layoutMap.set(`date-${index}`, {
        x: dateLabelRightEdgeX - dateLabelWidth,
        y: centerY - 20,
        width: dateLabelWidth,
        height: 40,
      })
      layoutMap.set(`dot-${index}`, {
        x: timelineX - 8,
        y: centerY - 8,
        width: 16,
        height: 16,
      })
      layoutMap.set(`conn-${index}`, {
        x: timelineX,
        y: centerY - 14,
        width: bubbleCenterX - bubbleRadius - timelineX,
        height: 28,
      })
      layoutMap.set(`bubble-${index}`, {
        x: bubbleCenterX - bubbleRadius,
        y: centerY - bubbleRadius,
        width: bubbleRadius * 2,
        height: bubbleRadius * 2,
      })
      layoutMap.set(`desc-${index}`, {
        x: textStartX,
        y: centerY - 30,
        width: textWidth,
        height: Math.max(60, bubbleRadius * 2),
      })
    })

    return layoutMap
  }, [milestones, milestoneCount, verticalSpacing, topVerticalPosition, timelineX, dateLabelRightEdgeX, dateLabelWidth, bubbleCenterX, bubbleRadius, textStartX, textWidth])

  const prevNRef = useRef(milestoneCount)
  useEffect(() => {
    const countChanged = prevNRef.current !== milestoneCount
    prevNRef.current = milestoneCount

    for (const [elementId, defaultRect] of defaultLayoutMap.entries()) {
      if (countChanged || !customPositions[elementId]) {
        moveElement(elementId, { x: defaultRect.x, y: defaultRect.y })
        resizeElement(elementId, { width: defaultRect.width, height: defaultRect.height })
      }
    }
  }, [milestoneCount, defaultLayoutMap, customPositions, moveElement, resizeElement])

  const calculatedRects = useMemo(() => {
    const rects = new Map<string, Rect>()
    for (const elementId of defaultLayoutMap.keys()) {
      rects.set(elementId, retrieveElementRect(elementId, customPositions, defaultLayoutMap))
    }
    return rects
  }, [defaultLayoutMap, customPositions])

  const timelineRect = calculatedRects.get('timeline') ?? { x: timelineX - 2, y: topVerticalPosition - 40, width: 4, height: 200 }
  const timelineColor = customColors['timeline'] ?? '#cbd5e1'
  const isTimelineSelected = selectedElementIds.has('timeline')

  return (
    <g ref={svgRef}>
      <g
        data-element-id="timeline"
        onMouseDown={event => startDrag(event, 'timeline', timelineRect)}
        transform={getTransform('timeline', timelineRect)}
        style={{ cursor: 'pointer' }}
      >
        <rect
          x={timelineRect.x}
          y={timelineRect.y}
          width={timelineRect.width}
          height={timelineRect.height}
          rx={2}
          fill={timelineColor}
        />
        {isTimelineSelected && renderHandles(timelineRect, 'timeline')}
      </g>

      {milestones.map((milestone, index) => {
        const dateElementId = `date-${index}`
        const dotElementId = `dot-${index}`
        const connectionElementId = `conn-${index}`
        const bubbleElementId = `bubble-${index}`
        const descriptionElementId = `desc-${index}`

        const dateRect = calculatedRects.get(dateElementId)!
        const dotRect = calculatedRects.get(dotElementId)!
        const connectionRect = calculatedRects.get(connectionElementId)!
        const bubbleRect = calculatedRects.get(bubbleElementId)!
        const descriptionRect = calculatedRects.get(descriptionElementId)!

        const dateLabel = milestone.date ?? milestone.quarter ?? ''
        const bubbleValue = milestone.value ?? milestone.percent ?? String(index + 1)
        const cardTitle = milestone.title || ''
        const cardDescription = milestone.subtitle || ''
        const elementColor = customColors[bubbleElementId] ?? milestone.color ?? milestone.style?.fill ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!

        const strokeColor = customStrokeColors[bubbleElementId]
        const strokeWidth = customStrokeWidths[bubbleElementId] ?? 0

        const isDateSelected = selectedElementIds.has(dateElementId)
        const isDotSelected = selectedElementIds.has(dotElementId)
        const isBubbleSelected = selectedElementIds.has(bubbleElementId)
        const isDescriptionSelected = selectedElementIds.has(descriptionElementId)

        const dotCenterX = dotRect.x + dotRect.width / 2
        const dotCenterY = dotRect.y + dotRect.height / 2
        const bubbleCenterXPosition = bubbleRect.x + bubbleRect.width / 2
        const bubbleCenterYPosition = bubbleRect.y + bubbleRect.height / 2
        const bubbleCurrentRadius = bubbleRect.width / 2

        const deltaX = bubbleCenterXPosition - dotCenterX
        const deltaY = bubbleCenterYPosition - dotCenterY
        const distance = Math.hypot(deltaX, deltaY)
        const pointerBaseHeight = Math.min(24, bubbleRect.height * 0.38)

        let connectorPoints = ''
        if (distance > 5) {
          const unitX = deltaX / distance
          const unitY = deltaY / distance
          const edgeTargetX = bubbleCenterXPosition - unitX * bubbleCurrentRadius
          const edgeTargetY = bubbleCenterYPosition - unitY * bubbleCurrentRadius
          const perpendicularX = -unitY * (pointerBaseHeight / 2)
          const perpendicularY = unitX * (pointerBaseHeight / 2)
          const pointOneX = edgeTargetX + perpendicularX
          const pointOneY = edgeTargetY + perpendicularY
          const pointTwoX = edgeTargetX - perpendicularX
          const pointTwoY = edgeTargetY - perpendicularY
          connectorPoints = `${dotCenterX},${dotCenterY} ${pointOneX},${pointOneY} ${pointTwoX},${pointTwoY}`
        } else {
          connectorPoints = `${connectionRect.x},${connectionRect.y + connectionRect.height / 2} ${connectionRect.x + connectionRect.width},${connectionRect.y} ${connectionRect.x + connectionRect.width},${connectionRect.y + connectionRect.height}`
        }

        const dateLines = dateLabel ? wrapTextByWidth(dateLabel, Math.max(8, Math.floor(dateRect.width / 10))) : []
        const titleLines = cardTitle ? wrapTextByWidth(cardTitle, Math.max(10, Math.floor(descriptionRect.width / 10))) : []
        const descriptionLines = cardDescription
          ? wrapTextByWidth(cardDescription, Math.max(12, Math.floor(descriptionRect.width / 7.5)))
          : []

        const dateFontSize = milestoneCount <= 4 ? 18 : 15
        const titleFontSize = milestoneCount <= 4 ? 16 : 14
        const descriptionFontSize = milestoneCount <= 4 ? 13 : 11
        const bubbleFontSize = Math.min(24, Math.max(12, Math.floor(bubbleRect.width * 0.34)))

        const dynamicIconElement = resolveDynamicIcon(milestone.icon, Math.floor(bubbleRect.width * 0.38), '#ffffff')
        const hasBothIconAndValue = Boolean(dynamicIconElement && milestone.value)

        const contentHeight = 16 + (titleLines.length > 0 ? titleLines.length * 20 : 0) + (descriptionLines.length > 0 ? descriptionLines.length * 17 + 6 : 0) + 10
        const effectiveDescRect: Rect = {
          ...descriptionRect,
          height: Math.max(descriptionRect.height, contentHeight),
        }

        const dateFill = customColors[dateElementId] ?? 'transparent'
        const dateStroke = customStrokeColors[dateElementId] ?? 'none'
        const dateStrokeWidth = customStrokeWidths[dateElementId] ?? (dateStroke !== 'none' && dateStroke !== 'transparent' ? 2 : 0)
        const hasDateBg = dateFill !== 'transparent' && dateFill !== 'none'
        const hasDateBorder = dateStroke !== 'transparent' && dateStroke !== 'none' && dateStrokeWidth > 0

        const descFill = customColors[descriptionElementId] ?? 'transparent'
        const descStroke = customStrokeColors[descriptionElementId] ?? 'none'
        const descStrokeWidth = customStrokeWidths[descriptionElementId] ?? (descStroke !== 'none' && descStroke !== 'transparent' ? 2 : 0)
        const hasDescBg = descFill !== 'transparent' && descFill !== 'none'
        const hasDescBorder = descStroke !== 'transparent' && descStroke !== 'none' && descStrokeWidth > 0

        return (
          <g key={`milestone-${index}`}>
            {dateLabel && (
              <g
                data-element-id={dateElementId}
                onMouseDown={event => startDrag(event, dateElementId, dateRect)}
                transform={getTransform(dateElementId, dateRect)}
                style={{ cursor: 'pointer' }}
              >
                {(hasDateBg || hasDateBorder) && (
                  <rect
                    x={dateRect.x}
                    y={dateRect.y}
                    width={dateRect.width}
                    height={dateRect.height}
                    rx={4}
                    fill={dateFill}
                    stroke={dateStroke}
                    strokeWidth={dateStrokeWidth}
                  />
                )}
                <text
                  x={dateRect.x + dateRect.width - (hasDateBg || hasDateBorder ? 10 : 0)}
                  y={dateRect.y + dateRect.height / 2 - ((dateLines.length - 1) * 11) + 5}
                  textAnchor="end"
                  fontFamily="Arial, sans-serif"
                  fontSize={dateFontSize}
                  fontWeight={700}
                  fill={customColors[`${dateElementId}-text`] ?? (hasDateBg ? '#ffffff' : (customColors[dateElementId] ?? '#2c2b64'))}
                >
                  {dateLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={dateRect.x + dateRect.width - (hasDateBg || hasDateBorder ? 10 : 0)} dy={lineIndex === 0 ? 0 : 22}>
                      {line}
                    </tspan>
                  ))}
                </text>
                {isDateSelected && renderHandles(dateRect, dateElementId)}
              </g>
            )}

            <g
              data-element-id={dotElementId}
              onMouseDown={event => startDrag(event, dotElementId, dotRect)}
              transform={getTransform(dotElementId, dotRect)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={dotCenterX}
                cy={dotCenterY}
                r={dotRect.width / 2}
                fill={customColors[dotElementId] ?? elementColor}
                stroke="#ffffff"
                strokeWidth={2}
              />
              {isDotSelected && renderHandles(dotRect, dotElementId)}
            </g>

            <g data-element-id={connectionElementId}>
              <polygon
                points={connectorPoints}
                fill={customColors[connectionElementId] ?? elementColor}
                opacity={0.85}
              />
            </g>

            <g
              data-element-id={bubbleElementId}
              onMouseDown={event => startDrag(event, bubbleElementId, bubbleRect)}
              transform={getTransform(bubbleElementId, bubbleRect)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={bubbleCenterXPosition}
                cy={bubbleCenterYPosition}
                r={bubbleCurrentRadius}
                fill={elementColor}
                stroke={strokeColor || '#ffffff'}
                strokeWidth={strokeWidth || 2}
              />

              {hasBothIconAndValue ? (
                <>
                  <g transform={`translate(${bubbleCenterXPosition - (bubbleRect.width * 0.38) / 2}, ${bubbleCenterYPosition - bubbleCurrentRadius * 0.65})`}>
                    {dynamicIconElement}
                  </g>
                  <text
                    x={bubbleCenterXPosition}
                    y={bubbleCenterYPosition + bubbleCurrentRadius * 0.45}
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize={Math.max(10, Math.floor(bubbleFontSize * 0.7))}
                    fontWeight={700}
                    fill={customColors[`${bubbleElementId}-text`] ?? '#ffffff'}
                  >
                    {bubbleValue}
                  </text>
                </>
              ) : dynamicIconElement ? (
                <g transform={`translate(${bubbleCenterXPosition - (bubbleRect.width * 0.38) / 2}, ${bubbleCenterYPosition - (bubbleRect.width * 0.38) / 2})`}>
                  {dynamicIconElement}
                </g>
              ) : (
                <text
                  x={bubbleCenterXPosition}
                  y={bubbleCenterYPosition + bubbleFontSize * 0.35}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={bubbleFontSize}
                  fontWeight={700}
                  fill={customColors[`${bubbleElementId}-text`] ?? '#ffffff'}
                >
                  {bubbleValue}
                </text>
              )}
              {isBubbleSelected && renderHandles(bubbleRect, bubbleElementId)}
            </g>

            {(cardTitle || cardDescription || hasDescBg || hasDescBorder) && (
              <g
                data-element-id={descriptionElementId}
                onMouseDown={event => startDrag(event, descriptionElementId, effectiveDescRect)}
                transform={getTransform(descriptionElementId, effectiveDescRect)}
                style={{ cursor: 'pointer' }}
              >
                {(hasDescBg || hasDescBorder) && (
                  <rect
                    x={effectiveDescRect.x - 8}
                    y={effectiveDescRect.y}
                    width={effectiveDescRect.width + 16}
                    height={effectiveDescRect.height}
                    rx={6}
                    fill={descFill}
                    stroke={descStroke}
                    strokeWidth={descStrokeWidth}
                  />
                )}

                {titleLines.length > 0 && (
                  <text
                    x={effectiveDescRect.x}
                    y={effectiveDescRect.y + 16}
                    fontFamily="Arial, sans-serif"
                    fontSize={titleFontSize}
                    fontWeight={700}
                    fill={customColors[`${descriptionElementId}-title`] ?? '#2c2b64'}
                  >
                    {titleLines.map((line, lineIndex) => (
                      <tspan key={lineIndex} x={effectiveDescRect.x} dy={lineIndex === 0 ? 0 : 20}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                )}

                {descriptionLines.length > 0 && (
                  <text
                    x={effectiveDescRect.x}
                    y={effectiveDescRect.y + 16 + (titleLines.length > 0 ? titleLines.length * 20 + 2 : 0)}
                    fontFamily="Arial, sans-serif"
                    fontSize={descriptionFontSize}
                    fontWeight={400}
                    fill={customColors[`${descriptionElementId}-subtitle`] ?? '#5f6368'}
                  >
                    {descriptionLines.map((line, lineIndex) => (
                      <tspan key={lineIndex} x={effectiveDescRect.x} dy={lineIndex === 0 ? 0 : 17}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                )}
                {isDescriptionSelected && renderHandles(effectiveDescRect, descriptionElementId)}
              </g>
            )}
          </g>
        )
      })}
    </g>
  )
}
