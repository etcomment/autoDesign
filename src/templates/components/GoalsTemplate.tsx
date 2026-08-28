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

export function GoalsTemplate({ data }: { data: GoalsData }): ReactElement {
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

  const arrowStartX = 90
  const arrowStartY = 450
  const targetCenterX = 850
  const targetCenterY = 190
  const targetOuterRadius = 90

  const defaultLayoutMap = useMemo(() => {
    const layoutMap = new Map<string, Rect>()

    layoutMap.set('target', {
      x: targetCenterX - targetOuterRadius,
      y: targetCenterY - targetOuterRadius,
      width: targetOuterRadius * 2,
      height: targetOuterRadius * 2,
    })

    layoutMap.set('arrow-shaft', {
      x: arrowStartX,
      y: targetCenterY,
      width: targetCenterX - arrowStartX,
      height: arrowStartY - targetCenterY + 20,
    })

    metrics.forEach((_, index) => {
      const t = count === 1 ? 0.45 : 0.12 + (index * 0.72) / (count - 1)
      const nodeX = arrowStartX + t * (targetCenterX - arrowStartX)
      const nodeY = arrowStartY + t * (targetCenterY - arrowStartY)
      const isTop = index % 2 === 0
      const textBlockY = isTop ? nodeY - 145 : nodeY + 45
      const textBlockX = nodeX - 70

      layoutMap.set(`node-${index}`, {
        x: nodeX - 26,
        y: nodeY - 26,
        width: 52,
        height: 52,
      })

      layoutMap.set(`text-${index}`, {
        x: Math.max(20, Math.min(720, textBlockX)),
        y: textBlockY,
        width: 220,
        height: 85,
      })
    })

    return layoutMap
  }, [metrics, count])

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
  const targetCurrentCenterX = targetRect.x + targetRect.width / 2
  const targetCurrentCenterY = targetRect.y + targetRect.height / 2
  const targetRadius = targetRect.width / 2

  const arrowRect = calculatedRects.get('arrow-shaft') ?? {
    x: arrowStartX,
    y: targetCenterY,
    width: targetCenterX - arrowStartX,
    height: arrowStartY - targetCenterY + 20,
  }
  const isArrowSelected = selectedElementIds.has('arrow-shaft')
  const arrowColor = customColors['arrow-shaft'] ?? '#cbd5e1'

  const dx = targetCurrentCenterX - arrowStartX
  const dy = targetCurrentCenterY - arrowStartY
  const length = Math.hypot(dx, dy)
  const unitX = dx / Math.max(1, length)
  const unitY = dy / Math.max(1, length)
  const perpX = -unitY
  const perpY = unitX
  const arrowThickness = 12

  const arrowShaftEnd = length - 30
  const shaftPt1X = arrowStartX + perpX * (arrowThickness / 2)
  const shaftPt1Y = arrowStartY + perpY * (arrowThickness / 2)
  const shaftPt2X = arrowStartX - perpX * (arrowThickness / 2)
  const shaftPt2Y = arrowStartY - perpY * (arrowThickness / 2)
  const shaftPt3X = arrowStartX + unitX * arrowShaftEnd - perpX * (arrowThickness / 2)
  const shaftPt3Y = arrowStartY + unitY * arrowShaftEnd - perpY * (arrowThickness / 2)
  const shaftPt4X = arrowStartX + unitX * arrowShaftEnd + perpX * (arrowThickness / 2)
  const shaftPt4Y = arrowStartY + unitY * arrowShaftEnd + perpY * (arrowThickness / 2)

  const headTipX = arrowStartX + unitX * length
  const headTipY = arrowStartY + unitY * length
  const headBase1X = arrowStartX + unitX * arrowShaftEnd + perpX * 18
  const headBase1Y = arrowStartY + unitY * arrowShaftEnd + perpY * 18
  const headBase2X = arrowStartX + unitX * arrowShaftEnd - perpX * 18
  const headBase2Y = arrowStartY + unitY * arrowShaftEnd - perpY * 18

  return (
    <g ref={svgRef}>
      <g
        data-element-id="target"
        onMouseDown={event => startDrag(event, 'target', targetRect)}
        transform={getTransform('target', targetRect)}
        style={{ cursor: 'pointer' }}
      >
        <defs>
          <clipPath id="goals-target-left">
            <rect
              x={targetCurrentCenterX - targetRadius}
              y={targetCurrentCenterY - targetRadius}
              width={targetRadius}
              height={targetRadius * 2}
            />
          </clipPath>
          <clipPath id="goals-target-right">
            <rect
              x={targetCurrentCenterX}
              y={targetCurrentCenterY - targetRadius}
              width={targetRadius}
              height={targetRadius * 2}
            />
          </clipPath>
        </defs>

        <circle cx={targetCurrentCenterX} cy={targetCurrentCenterY} r={targetRadius} fill="#52b788" clipPath="url(#goals-target-left)" />
        <circle cx={targetCurrentCenterX} cy={targetCurrentCenterY} r={targetRadius} fill="#2d6a4f" clipPath="url(#goals-target-right)" />

        <circle cx={targetCurrentCenterX} cy={targetCurrentCenterY} r={targetRadius * 0.72} fill="#ffffff" />

        <circle cx={targetCurrentCenterX} cy={targetCurrentCenterY} r={targetRadius * 0.52} fill="#52b788" clipPath="url(#goals-target-left)" />
        <circle cx={targetCurrentCenterX} cy={targetCurrentCenterY} r={targetRadius * 0.52} fill="#2d6a4f" clipPath="url(#goals-target-right)" />

        <circle cx={targetCurrentCenterX} cy={targetCurrentCenterY} r={targetRadius * 0.28} fill="#ffffff" />

        <circle cx={targetCurrentCenterX} cy={targetCurrentCenterY} r={targetRadius * 0.14} fill="#52b788" clipPath="url(#goals-target-left)" />
        <circle cx={targetCurrentCenterX} cy={targetCurrentCenterY} r={targetRadius * 0.14} fill="#2d6a4f" clipPath="url(#goals-target-right)" />

        {isTargetSelected && renderHandles(targetRect, 'target')}
      </g>

      <g
        data-element-id="arrow-shaft"
        onMouseDown={event => startDrag(event, 'arrow-shaft', arrowRect)}
        transform={getTransform('arrow-shaft', arrowRect)}
        style={{ cursor: 'pointer' }}
      >
        <polygon
          points={`${shaftPt1X},${shaftPt1Y} ${shaftPt2X},${shaftPt2Y} ${shaftPt3X},${shaftPt3Y} ${shaftPt4X},${shaftPt4Y}`}
          fill={arrowColor}
        />
        <polygon
          points={`${headTipX},${headTipY} ${headBase1X},${headBase1Y} ${headBase2X},${headBase2Y}`}
          fill={arrowColor}
        />
        {isArrowSelected && renderHandles(arrowRect, 'arrow-shaft')}
      </g>

      {metrics.map((metric, index) => {
        const nodeElementId = `node-${index}`
        const textElementId = `text-${index}`

        const nodeRect = calculatedRects.get(nodeElementId)!
        const textRect = calculatedRects.get(textElementId)!

        const isNodeSelected = selectedElementIds.has(nodeElementId)
        const isTextSelected = selectedElementIds.has(textElementId)

        const elementColor = customColors[nodeElementId] ?? metric.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const nodeStrokeColor = customStrokeColors[nodeElementId]
        const nodeStrokeWidth = customStrokeWidths[nodeElementId] ?? (nodeStrokeColor ? 2 : 0)

        const textFill = customColors[textElementId] ?? 'transparent'
        const textStroke = customStrokeColors[textElementId] ?? 'none'
        const textStrokeWidth = customStrokeWidths[textElementId] ?? (textStroke !== 'none' && textStroke !== 'transparent' ? 2 : 0)
        const hasTextBg = textFill !== 'transparent' && textFill !== 'none'
        const hasTextBorder = textStroke !== 'transparent' && textStroke !== 'none' && textStrokeWidth > 0

        const nodeCenterX = nodeRect.x + nodeRect.width / 2
        const nodeCenterY = nodeRect.y + nodeRect.height / 2
        const nodeRadius = nodeRect.width / 2

        const isTop = index % 2 === 0
        const stemEndY = isTop ? textRect.y + textRect.height : textRect.y
        const stemStartX = nodeCenterX
        const stemStartY = isTop ? nodeCenterY - nodeRadius : nodeCenterY + nodeRadius

        const displayTitle = metric.label || `Your title 0${index + 1}`
        const displayDesc = metric.description || metric.subtitle || metric.value || 'MIGSO-PCUBED content and words to be added here'

        const titleLines = wrapTextByWidth(displayTitle, Math.max(10, Math.floor(textRect.width / 10)))
        const descLines = wrapTextByWidth(displayDesc, Math.max(12, Math.floor(textRect.width / 7.5)))

        const contentHeight = 12 + titleLines.length * 20 + descLines.length * 17 + 8
        const effectiveTextRect: Rect = {
          ...textRect,
          height: Math.max(textRect.height, contentHeight),
        }

        const dynamicIconElement = resolveDynamicIcon(metric.icon, Math.floor(nodeRect.width * 0.42), '#ffffff')
        const displayValue = metric.value && metric.value.length <= 4 ? metric.value : String(index + 1).padStart(2, '0')

        return (
          <g key={`goal-item-${index}`}>
            <line
              x1={stemStartX}
              y1={stemStartY}
              x2={stemStartX}
              y2={stemEndY}
              stroke={elementColor}
              strokeWidth={3}
            />

            <g
              data-element-id={nodeElementId}
              onMouseDown={event => startDrag(event, nodeElementId, nodeRect)}
              transform={getTransform(nodeElementId, nodeRect)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={nodeCenterX}
                cy={nodeCenterY}
                r={nodeRadius}
                fill={elementColor}
                stroke={nodeStrokeColor || '#ffffff'}
                strokeWidth={nodeStrokeWidth || 3}
              />

              {index >= 2 && (
                <circle
                  cx={nodeCenterX}
                  cy={nodeCenterY}
                  r={nodeRadius + 4}
                  fill="none"
                  stroke={elementColor}
                  strokeWidth={2}
                />
              )}

              {dynamicIconElement ? (
                <g transform={`translate(${nodeCenterX - (nodeRect.width * 0.42) / 2}, ${nodeCenterY - (nodeRect.width * 0.42) / 2})`}>
                  {dynamicIconElement}
                </g>
              ) : (
                <text
                  x={nodeCenterX}
                  y={nodeCenterY + 5}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={14}
                  fontWeight={700}
                  fill={customColors[`${nodeElementId}-text`] ?? '#ffffff'}
                >
                  {displayValue}
                </text>
              )}

              {isNodeSelected && renderHandles(nodeRect, nodeElementId)}
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

              <rect
                x={effectiveTextRect.x + 2}
                y={effectiveTextRect.y + 6}
                width={3}
                height={Math.max(26, titleLines.length * 20)}
                fill={elementColor}
              />

              <text
                x={effectiveTextRect.x + 12}
                y={effectiveTextRect.y + 20}
                fontFamily="Arial, sans-serif"
                fontSize={15}
                fontWeight={700}
                fill={customColors[`${textElementId}-title`] ?? '#2c2b64'}
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={effectiveTextRect.x + 12} dy={lineIndex === 0 ? 0 : 20}>
                    {line}
                  </tspan>
                ))}
              </text>

              <text
                x={effectiveTextRect.x + 12}
                y={effectiveTextRect.y + 20 + titleLines.length * 20 + 2}
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={400}
                fill={customColors[`${textElementId}-desc`] ?? '#5f6368'}
              >
                {descLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={effectiveTextRect.x + 12} dy={lineIndex === 0 ? 0 : 17}>
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
