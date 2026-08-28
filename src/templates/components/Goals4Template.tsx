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

function createArcPath(cx: number, cy: number, rOuter: number, rInner: number, startAngleDeg: number, endAngleDeg: number): string {
  const startRad = (startAngleDeg * Math.PI) / 180
  const endRad = (endAngleDeg * Math.PI) / 180

  const x1 = cx + rOuter * Math.cos(startRad)
  const y1 = cy + rOuter * Math.sin(startRad)
  const x2 = cx + rOuter * Math.cos(endRad)
  const y2 = cy + rOuter * Math.sin(endRad)

  const x3 = cx + rInner * Math.cos(endRad)
  const y3 = cy + rInner * Math.sin(endRad)
  const x4 = cx + rInner * Math.cos(startRad)
  const y4 = cy + rInner * Math.sin(startRad)

  const largeArcFlag = Math.abs(endAngleDeg - startAngleDeg) > 180 ? 1 : 0

  return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`
}

const QUADRANT_CONFIGS = [
  { startAngle: 180, endAngle: 270, badgeAngle: 225, textX: 60, textY: 130, isRight: false, defaultColor: '#ea580c' },
  { startAngle: 270, endAngle: 360, badgeAngle: 315, textX: 720, textY: 130, isRight: true, defaultColor: '#2c2b64' },
  { startAngle: 90, endAngle: 180, badgeAngle: 135, textX: 60, textY: 420, isRight: false, defaultColor: '#eab308' },
  { startAngle: 0, endAngle: 90, badgeAngle: 45, textX: 720, textY: 420, isRight: true, defaultColor: '#2563eb' },
]

export function Goals4Template({ data }: { data: GoalsData }): ReactElement {
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
  const count = Math.min(4, Math.max(1, metrics.length))

  const targetCenterX = 490
  const targetCenterY = 300
  const outerRingRadius = 155
  const outerRingInnerRadius = 143

  const defaultLayoutMap = useMemo(() => {
    const layoutMap = new Map<string, Rect>()

    layoutMap.set('target', {
      x: targetCenterX - outerRingRadius - 20,
      y: targetCenterY - outerRingRadius - 20,
      width: (outerRingRadius + 20) * 2,
      height: (outerRingRadius + 20) * 2,
    })

    metrics.slice(0, 4).forEach((_, index) => {
      const config = QUADRANT_CONFIGS[index]!
      const badgeRad = (config.badgeAngle * Math.PI) / 180
      const badgeX = targetCenterX + Math.cos(badgeRad) * outerRingRadius
      const badgeY = targetCenterY + Math.sin(badgeRad) * outerRingRadius

      layoutMap.set(`badge-${index}`, {
        x: badgeX - 22,
        y: badgeY - 22,
        width: 44,
        height: 44,
      })

      layoutMap.set(`text-${index}`, {
        x: config.textX,
        y: config.textY,
        width: 220,
        height: 85,
      })
    })

    return layoutMap
  }, [metrics, targetCenterX, targetCenterY, outerRingRadius])

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
    x: targetCenterX - outerRingRadius - 20,
    y: targetCenterY - outerRingRadius - 20,
    width: (outerRingRadius + 20) * 2,
    height: (outerRingRadius + 20) * 2,
  }
  const isTargetSelected = selectedElementIds.has('target')

  return (
    <g ref={svgRef}>
      <g
        data-element-id="target"
        onMouseDown={event => startDrag(event, 'target', targetRect)}
        transform={getTransform('target', targetRect)}
        style={{ cursor: 'pointer' }}
      >
        <circle cx={targetCenterX} cy={targetCenterY} r={124} fill="#52b788" />
        <circle cx={targetCenterX} cy={targetCenterY} r={94} fill="#ffffff" />
        <circle cx={targetCenterX} cy={targetCenterY} r={78} fill="#52b788" />
        <circle cx={targetCenterX} cy={targetCenterY} r={48} fill="#ffffff" />
        <circle cx={targetCenterX} cy={targetCenterY} r={32} fill="#52b788" />

        {QUADRANT_CONFIGS.slice(0, 4).map((config, index) => {
          const segmentColor = customColors[`segment-${index}`] ?? config.defaultColor
          return (
            <path
              key={`segment-${index}`}
              d={createArcPath(targetCenterX, targetCenterY, outerRingRadius, outerRingInnerRadius, config.startAngle, config.endAngle)}
              fill={segmentColor}
            />
          )
        })}

        <g opacity={0.25}>
          <polygon points={`${targetCenterX},${targetCenterY} ${targetCenterX - 110},${targetCenterY - 110} ${targetCenterX - 80},${targetCenterY - 140}`} fill="#ea580c" />
          <polygon points={`${targetCenterX},${targetCenterY} ${targetCenterX + 110},${targetCenterY - 110} ${targetCenterX + 140},${targetCenterY - 80}`} fill="#2c2b64" />
          <polygon points={`${targetCenterX},${targetCenterY} ${targetCenterX - 110},${targetCenterY + 110} ${targetCenterX - 80},${targetCenterY + 140}`} fill="#eab308" />
          <polygon points={`${targetCenterX},${targetCenterY} ${targetCenterX + 110},${targetCenterY + 110} ${targetCenterX + 140},${targetCenterY + 80}`} fill="#2563eb" />
        </g>

        <g transform={`translate(${targetCenterX}, ${targetCenterY})`}>
          <g transform="rotate(-35)">
            <line x1={0} y1={0} x2={85} y2={0} stroke="#4a3b32" strokeWidth={8} strokeLinecap="round" />
            <polygon points="65,-14 95,0 65,14" fill="#ea580c" />
          </g>
          <g transform="rotate(80)">
            <line x1={0} y1={0} x2={80} y2={0} stroke="#3e2723" strokeWidth={8} strokeLinecap="round" />
            <polygon points="60,-14 90,0 60,14" fill="#2563eb" />
          </g>
          <g transform="rotate(-165)">
            <line x1={0} y1={0} x2={78} y2={0} stroke="#4e342e" strokeWidth={8} strokeLinecap="round" />
            <polygon points="58,-14 88,0 58,14" fill="#2c2b64" />
          </g>
        </g>

        {isTargetSelected && renderHandles(targetRect, 'target')}
      </g>

      {metrics.slice(0, 4).map((metric, index) => {
        const badgeElementId = `badge-${index}`
        const textElementId = `text-${index}`

        const badgeRect = calculatedRects.get(badgeElementId)!
        const textRect = calculatedRects.get(textElementId)!

        const isBadgeSelected = selectedElementIds.has(badgeElementId)
        const isTextSelected = selectedElementIds.has(textElementId)

        const config = QUADRANT_CONFIGS[index]!
        const elementColor = customColors[badgeElementId] ?? metric.color ?? config.defaultColor ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!

        const badgeStrokeColor = customStrokeColors[badgeElementId]
        const badgeStrokeWidth = customStrokeWidths[badgeElementId] ?? (badgeStrokeColor ? 2 : 0)

        const textFill = customColors[textElementId] ?? 'transparent'
        const textStroke = customStrokeColors[textElementId] ?? 'none'
        const textStrokeWidth = customStrokeWidths[textElementId] ?? (textStroke !== 'none' && textStroke !== 'transparent' ? 2 : 0)
        const hasTextBg = textFill !== 'transparent' && textFill !== 'none'
        const hasTextBorder = textStroke !== 'transparent' && textStroke !== 'none' && textStrokeWidth > 0

        const badgeCenterX = badgeRect.x + badgeRect.width / 2
        const badgeCenterY = badgeRect.y + badgeRect.height / 2
        const badgeRadius = badgeRect.width / 2

        const displayTitle = metric.label || `Your title 0${index + 1}`
        const displayDesc = metric.description || metric.subtitle || metric.value || 'MIGSO-PCUBED content and words to be added here as required'

        const titleLines = wrapTextByWidth(displayTitle, Math.max(10, Math.floor(textRect.width / 10)))
        const descLines = wrapTextByWidth(displayDesc, Math.max(12, Math.floor(textRect.width / 7.5)))

        const contentHeight = 12 + titleLines.length * 20 + descLines.length * 17 + 8
        const effectiveTextRect: Rect = {
          ...textRect,
          height: Math.max(textRect.height, contentHeight),
        }

        const dynamicIconElement = resolveDynamicIcon(metric.icon, Math.floor(badgeRect.width * 0.46), '#ffffff')

        return (
          <g key={`goal4-item-${index}`}>
            <g
              data-element-id={badgeElementId}
              onMouseDown={event => startDrag(event, badgeElementId, badgeRect)}
              transform={getTransform(badgeElementId, badgeRect)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={badgeCenterX}
                cy={badgeCenterY}
                r={badgeRadius}
                fill={elementColor}
                stroke={badgeStrokeColor || '#ffffff'}
                strokeWidth={badgeStrokeWidth || 2.5}
              />

              {dynamicIconElement ? (
                <g transform={`translate(${badgeCenterX - (badgeRect.width * 0.46) / 2}, ${badgeCenterY - (badgeRect.width * 0.46) / 2})`}>
                  {dynamicIconElement}
                </g>
              ) : (
                <text
                  x={badgeCenterX}
                  y={badgeCenterY + 5}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={14}
                  fontWeight={700}
                  fill={customColors[`${badgeElementId}-text`] ?? '#ffffff'}
                >
                  {String(index + 1).padStart(2, '0')}
                </text>
              )}

              {isBadgeSelected && renderHandles(badgeRect, badgeElementId)}
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
                x={config.isRight ? effectiveTextRect.x : effectiveTextRect.x + effectiveTextRect.width}
                y={effectiveTextRect.y + 18}
                textAnchor={config.isRight ? 'start' : 'end'}
                fontFamily="Arial, sans-serif"
                fontSize={16}
                fontWeight={700}
                fill={customColors[`${textElementId}-title`] ?? elementColor}
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan
                    key={lineIndex}
                    x={config.isRight ? effectiveTextRect.x : effectiveTextRect.x + effectiveTextRect.width}
                    dy={lineIndex === 0 ? 0 : 20}
                  >
                    {line}
                  </tspan>
                ))}
              </text>

              <text
                x={config.isRight ? effectiveTextRect.x : effectiveTextRect.x + effectiveTextRect.width}
                y={effectiveTextRect.y + 18 + titleLines.length * 20 + 2}
                textAnchor={config.isRight ? 'start' : 'end'}
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={400}
                fill={customColors[`${textElementId}-desc`] ?? '#5f6368'}
              >
                {descLines.map((line, lineIndex) => (
                  <tspan
                    key={lineIndex}
                    x={config.isRight ? effectiveTextRect.x : effectiveTextRect.x + effectiveTextRect.width}
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
