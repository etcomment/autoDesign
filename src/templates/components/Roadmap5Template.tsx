import { MIGSO_PALETTE } from '../../lib/theme'
import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
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

function getDynamicIcon(iconName?: string, size = 18, color = '#23255a'): ReactElement | null {
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

export function Roadmap5Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)
  const moveElement = useTemplateStore(state => state.moveTemplateElement)
  const resizeElement = useTemplateStore(state => state.resizeTemplateElement)

  const { milestones = [], startLabel = 'START' } = data
  const N = Math.max(1, milestones.length)

  const timelineY = 380
  const startBadgeX = 45
  const startBadgeWidth = 90
  const startBadgeHeight = 90
  const startBadgeY = timelineY - startBadgeHeight / 2

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()

    map.set('start-badge', {
      x: startBadgeX,
      y: startBadgeY,
      width: startBadgeWidth,
      height: startBadgeHeight,
    })

    const startX = 200
    const endX = 940
    const availableWidth = endX - startX
    const stepSpacing = N > 1 ? availableWidth / (N - 1) : availableWidth / 2
    const cardWidth = Math.min(230, Math.max(140, stepSpacing - 20))
    const cardHeight = 140

    map.set('timeline-track', {
      x: startBadgeX + startBadgeWidth,
      y: timelineY - 3,
      width: Math.max(260, (N - 1) * stepSpacing + 120),
      height: 6,
    })

    milestones.forEach((_, index) => {
      const isAboveTimeline = index % 2 === 0
      const centerX = N === 1 ? startX + availableWidth / 2 : startX + index * stepSpacing

      const cardY = isAboveTimeline ? timelineY - 65 - cardHeight : timelineY + 65
      map.set(`card-${index}`, {
        x: centerX - cardWidth / 2,
        y: cardY,
        width: cardWidth,
        height: cardHeight,
      })

      map.set(`dot-${index}`, {
        x: centerX - 10,
        y: timelineY - 10,
        width: 20,
        height: 20,
      })

      const yearY = isAboveTimeline ? timelineY - 38 : timelineY + 16
      map.set(`year-${index}`, {
        x: centerX - 35,
        y: yearY,
        width: 70,
        height: 24,
      })
    })

    return map
  }, [milestones, N, startBadgeX, startBadgeY, startBadgeWidth, startBadgeHeight, timelineY])

  // Synchronisation avec le store Zustand (avec détection du changement de N)
  const prevNRef = useRef(N)
  useEffect(() => {
    const countChanged = prevNRef.current !== N
    prevNRef.current = N

    for (const [id, rect] of defaultPositions.entries()) {
      if (countChanged || !positions[id]) {
        moveElement(id, { x: rect.x, y: rect.y })
        resizeElement(id, { width: rect.width, height: rect.height })
      }
    }
  }, [N, defaultPositions, positions, moveElement, resizeElement])

  const getElementRect = (id: string): Rect => {
    const stored = positions[id]
    const defaultRect = defaultPositions.get(id) || { x: 0, y: 0, width: 100, height: 50 }
    return {
      x: stored?.x ?? defaultRect.x,
      y: stored?.y ?? defaultRect.y,
      width: stored?.width || defaultRect.width,
      height: stored?.height || defaultRect.height,
    }
  }

  const startBadgeRect = getElementRect('start-badge')
  const startBadgeColor = templateColors['start-badge'] || MIGSO_PALETTE[4]

  const lastDotRect = getElementRect(`dot-${N - 1}`)
  const trackStartX = startBadgeRect.x + startBadgeRect.width
  const trackEndX = Math.max(trackStartX + 120, lastDotRect.x + lastDotRect.width + 50)
  const trackY = startBadgeRect.y + startBadgeRect.height / 2

  return (
    <g ref={svgRef}>
      {/* Dynamic Main Timeline Track */}
      <line
        x1={trackStartX}
        y1={trackY}
        x2={trackEndX}
        y2={trackY}
        stroke={templateColors['timeline-track'] || '#23255a'}
        strokeWidth={templateStrokeWidths['timeline-track'] || 5}
        strokeLinecap="round"
      />

      {/* Dynamic Stems connecting cards and timeline dots */}
      {milestones.map((milestone, index) => {
        const isAboveTimeline = index % 2 === 0
        const cardRect = getElementRect(`card-${index}`)
        const dotRect = getElementRect(`dot-${index}`)

        const milestoneColor =
          templateColors[`card-${index}`] ||
          milestone.color ||
          milestone.style?.fill ||
          MIGSO_PALETTE[index % MIGSO_PALETTE.length]

        const stemColor = templateColors[`stem-${index}`] || milestoneColor
        const dotCenterX = dotRect.x + dotRect.width / 2
        const dotCenterY = dotRect.y + dotRect.height / 2
        const cardCenterX = cardRect.x + cardRect.width / 2
        const cardEdgeY = isAboveTimeline ? cardRect.y + cardRect.height : cardRect.y

        return (
          <line
            key={`stem-${index}`}
            x1={dotCenterX}
            y1={dotCenterY}
            x2={cardCenterX}
            y2={cardEdgeY}
            stroke={stemColor}
            strokeWidth={3}
            strokeDasharray="none"
          />
        )
      })}

      {/* START Badge */}
      <g
        data-element-id="start-badge"
        onMouseDown={event => startDrag(event, 'start-badge', startBadgeRect)}
        transform={getTransform('start-badge', startBadgeRect)}
        style={{ cursor: 'pointer' }}
      >
        <circle
          cx={startBadgeRect.x + startBadgeRect.width / 2}
          cy={startBadgeRect.y + startBadgeRect.height / 2}
          r={Math.min(startBadgeRect.width, startBadgeRect.height) / 2}
          fill={startBadgeColor}
          stroke={templateStrokeColors['start-badge'] || '#ffffff'}
          strokeWidth={templateStrokeWidths['start-badge'] || 3}
        />
        <text
          x={startBadgeRect.x + startBadgeRect.width / 2}
          y={startBadgeRect.y + startBadgeRect.height / 2 + 7}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={Math.max(12, Math.floor(startBadgeRect.width / 4.5))}
          fontWeight="bold"
          fill="#ffffff"
        >
          {startLabel}
        </text>
        {selectedIds.has('start-badge') && renderHandles(startBadgeRect, 'start-badge')}
      </g>

      {/* Timeline Dots */}
      {milestones.map((milestone, index) => {
        const dotRect = getElementRect(`dot-${index}`)
        const milestoneColor =
          templateColors[`card-${index}`] ||
          milestone.color ||
          milestone.style?.fill ||
          MIGSO_PALETTE[index % MIGSO_PALETTE.length]
        const dotColor = templateColors[`dot-${index}`] || milestoneColor
        const dotRadius = Math.min(dotRect.width, dotRect.height) / 2

        return (
          <g
            key={`dot-${index}`}
            data-element-id={`dot-${index}`}
            onMouseDown={event => startDrag(event, `dot-${index}`, dotRect)}
            transform={getTransform(`dot-${index}`, dotRect)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={dotRect.x + dotRect.width / 2}
              cy={dotRect.y + dotRect.height / 2}
              r={dotRadius}
              fill="#ffffff"
              stroke={dotColor}
              strokeWidth={4}
            />
            <circle
              cx={dotRect.x + dotRect.width / 2}
              cy={dotRect.y + dotRect.height / 2}
              r={Math.max(2, dotRadius - 4)}
              fill={dotColor}
            />
            {selectedIds.has(`dot-${index}`) && renderHandles(dotRect, `dot-${index}`)}
          </g>
        )
      })}

      {/* Year Badges */}
      {milestones.map((milestone, index) => {
        const yearRect = getElementRect(`year-${index}`)
        const milestoneColor =
          templateColors[`card-${index}`] ||
          milestone.color ||
          milestone.style?.fill ||
          MIGSO_PALETTE[index % MIGSO_PALETTE.length]
        const yearColor = templateColors[`year-${index}`] || milestoneColor
        const dateText = milestone.date ?? String(2024 + index)

        return (
          <g
            key={`year-${index}`}
            data-element-id={`year-${index}`}
            onMouseDown={event => startDrag(event, `year-${index}`, yearRect)}
            transform={getTransform(`year-${index}`, yearRect)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={yearRect.x}
              y={yearRect.y}
              width={yearRect.width}
              height={yearRect.height}
              rx={6}
              fill={templateColors[`year-bg-${index}`] || '#ffffff'}
              stroke={yearColor}
              strokeWidth={1.5}
            />
            <text
              x={yearRect.x + yearRect.width / 2}
              y={yearRect.y + yearRect.height / 2 + 5}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={14}
              fontWeight="bold"
              fill={yearColor}
            >
              {dateText}
            </text>
            {selectedIds.has(`year-${index}`) && renderHandles(yearRect, `year-${index}`)}
          </g>
        )
      })}

      {/* Milestone Cards */}
      {milestones.map((milestone, index) => {
        const cardRect = getElementRect(`card-${index}`)
        const milestoneColor =
          templateColors[`card-${index}`] ||
          milestone.color ||
          milestone.style?.fill ||
          MIGSO_PALETTE[index % MIGSO_PALETTE.length]
        const isSelected = selectedIds.has(`card-${index}`)

        const milestoneValue =
          milestone.value ??
          milestone.percent ??
          (milestone as unknown as Record<string, string>).val ??
          (milestone as unknown as Record<string, string>).pct

        const maxTitleChars = Math.max(8, Math.floor((cardRect.width - 30) / 9))
        const titleLines = wrapTextByWidth(milestone.title || `Milestone 0${index + 1}`, maxTitleChars)

        const maxSubtitleChars = Math.max(10, Math.floor((cardRect.width - 30) / 7))
        const subtitleLines = milestone.subtitle ? wrapTextByWidth(milestone.subtitle, maxSubtitleChars) : []

        const iconElement = getDynamicIcon(milestone.icon, 18, milestoneColor)
        const hasIconOrValue = Boolean(iconElement || milestoneValue)

        const contentStartX = cardRect.x + 14
        const headerY = cardRect.y + 22
        const titleStartY = hasIconOrValue ? headerY + 22 : headerY + 4
        const titleLineHeight = 18
        const subtitleStartY = titleStartY + (titleLines.length > 0 ? (titleLines.length - 1) * titleLineHeight + 20 : 20)
        const subtitleLineHeight = 15

        return (
          <g
            key={`card-${index}`}
            data-element-id={`card-${index}`}
            onMouseDown={event => startDrag(event, `card-${index}`, cardRect)}
            transform={getTransform(`card-${index}`, cardRect)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={cardRect.x}
              y={cardRect.y}
              width={cardRect.width}
              height={cardRect.height}
              rx={10}
              fill={templateColors[`card-bg-${index}`] || '#ffffff'}
              stroke={isSelected ? '#2563eb' : milestoneColor}
              strokeWidth={isSelected ? 2.5 : 1.5}
            />

            <rect
              x={cardRect.x}
              y={cardRect.y}
              width={cardRect.width}
              height={5}
              rx={2}
              fill={milestoneColor}
            />

            {hasIconOrValue && (
              <g transform={`translate(${contentStartX}, ${headerY - 14})`}>
                {iconElement && <g>{iconElement}</g>}
                {milestoneValue && (
                  <g transform={`translate(${iconElement ? 24 : 0}, 0)`}>
                    <rect x={0} y={-2} width={Math.max(28, milestoneValue.length * 8 + 12)} height={18} rx={9} fill={milestoneColor} />
                    <text
                      x={Math.max(28, milestoneValue.length * 8 + 12) / 2}
                      y={11}
                      textAnchor="middle"
                      fontFamily="Arial, sans-serif"
                      fontSize={11}
                      fontWeight="bold"
                      fill="#ffffff"
                    >
                      {milestoneValue}
                    </text>
                  </g>
                )}
              </g>
            )}

            <text
              x={contentStartX}
              y={titleStartY}
              fontFamily="Arial, sans-serif"
              fontSize={15}
              fontWeight="bold"
              fill={milestoneColor}
            >
              {titleLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={contentStartX} dy={lineIndex === 0 ? 0 : titleLineHeight}>
                  {line}
                </tspan>
              ))}
            </text>

            {subtitleLines.length > 0 && (
              <text
                x={contentStartX}
                y={subtitleStartY}
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fill="#555555"
              >
                {subtitleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={contentStartX} dy={lineIndex === 0 ? 0 : subtitleLineHeight}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}

            {isSelected && renderHandles(cardRect, `card-${index}`)}
          </g>
        )
      })}
    </g>
  )
}
