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

const DEFAULT_PALETTE = ['#4cbfa0', '#23255a', '#23255a', '#2d62ed', '#2d62ed', ...MIGSO_PALETTE]

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

  const timelineY = 290
  const startCircleX = 100
  const startCircleR = 52

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()

    // START Badge
    map.set('start-badge', {
      x: startCircleX - startCircleR,
      y: timelineY - startCircleR,
      width: startCircleR * 2,
      height: startCircleR * 2,
    })

    const cardWidth = 230
    const cardHeight = 120

    // Milestone 0 (text to the right of green stem above START badge)
    map.set('card-0', {
      x: startCircleX + 16,
      y: 35,
      width: cardWidth,
      height: cardHeight,
    })

    // Intermediate and subsequent milestones
    if (N > 1) {
      const remainingCount = N - 1
      const startX = 310
      const endX = 920
      const stepX = remainingCount > 1 ? (endX - startX) / remainingCount : (endX - startX)

      for (let i = 1; i < N; i++) {
        const slotX = startX + (i - 1) * stepX
        const isAbove = i % 2 === 0

        const cardY = isAbove ? 35 : timelineY + 50

        map.set(`card-${i}`, {
          x: slotX + 16,
          y: cardY,
          width: cardWidth,
          height: cardHeight,
        })

        map.set(`dot-${i}`, {
          x: slotX - 9,
          y: timelineY - 9,
          width: 18,
          height: 18,
        })

        const yearY = isAbove ? timelineY + 16 : timelineY - 42
        map.set(`year-${i}`, {
          x: slotX - 45,
          y: yearY,
          width: 90,
          height: 28,
        })
      }
    }

    return map
  }, [milestones, N, startCircleX, startCircleR, timelineY])

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
  const startColor = templateColors['start-badge'] || '#4cbfa0'

  // Midpoint pivot for the two-tone horizontal line
  const pivotIndex = Math.min(2, N - 1)
  const pivotX = N > 1 ? getElementRect(`dot-${pivotIndex}`).x + getElementRect(`dot-${pivotIndex}`).width / 2 : startBadgeRect.x + startBadgeRect.width + 250
  const lastDotX = N > 1 ? getElementRect(`dot-${N - 1}`).x + getElementRect(`dot-${N - 1}`).width / 2 : startBadgeRect.x + startBadgeRect.width + 120
  const timelineEndX = Math.max(startBadgeRect.x + startBadgeRect.width + 200, lastDotX + 60)

  return (
    <g ref={svgRef}>
      {/* Horizontal Timeline Track: Dark Navy Section */}
      <line
        x1={startBadgeRect.x + startBadgeRect.width}
        y1={startBadgeRect.y + startBadgeRect.height / 2}
        x2={pivotX}
        y2={startBadgeRect.y + startBadgeRect.height / 2}
        stroke={templateColors['timeline-track-dark'] || '#23255a'}
        strokeWidth={templateStrokeWidths['timeline-track'] || 4.5}
      />

      {/* Horizontal Timeline Track: Light Grey Section */}
      <line
        x1={pivotX}
        y1={startBadgeRect.y + startBadgeRect.height / 2}
        x2={timelineEndX}
        y2={startBadgeRect.y + startBadgeRect.height / 2}
        stroke={templateColors['timeline-track-light'] || '#d9dee4'}
        strokeWidth={templateStrokeWidths['timeline-track'] || 4.5}
      />

      {/* Vertical Stems */}
      {milestones.map((milestone, index) => {
        const stemColor =
          templateColors[`stem-${index}`] ||
          templateColors[`card-${index}`] ||
          milestone.color ||
          DEFAULT_PALETTE[index % DEFAULT_PALETTE.length]

        if (index === 0) {
          // Green stem going straight up from top of START circle
          const stemX = startBadgeRect.x + startBadgeRect.width / 2
          return (
            <line
              key={`stem-${index}`}
              x1={stemX}
              y1={startBadgeRect.y}
              x2={stemX}
              y2={0}
              stroke={stemColor}
              strokeWidth={4}
            />
          )
        }

        const isAbove = index % 2 === 0
        const dotRect = getElementRect(`dot-${index}`)
        const dotCenterX = dotRect.x + dotRect.width / 2
        const dotCenterY = dotRect.y + dotRect.height / 2
        const stemEndY = isAbove ? 0 : 580

        return (
          <line
            key={`stem-${index}`}
            x1={dotCenterX}
            y1={dotCenterY}
            x2={dotCenterX}
            y2={stemEndY}
            stroke={stemColor}
            strokeWidth={4}
          />
        )
      })}

      {/* START Badge (Green Circle on Timeline) */}
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
          fill={startColor}
          stroke={templateStrokeColors['start-badge'] || '#ffffff'}
          strokeWidth={templateStrokeWidths['start-badge'] || 0}
        />
        <text
          x={startBadgeRect.x + startBadgeRect.width / 2}
          y={startBadgeRect.y + startBadgeRect.height / 2 + 7}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={20}
          fontWeight="bold"
          fill="#ffffff"
        >
          {startLabel}
        </text>
        {selectedIds.has('start-badge') && renderHandles(startBadgeRect, 'start-badge')}
      </g>

      {/* Timeline Dots for milestones i >= 1 */}
      {milestones.map((milestone, index) => {
        if (index === 0) return null
        const dotRect = getElementRect(`dot-${index}`)
        const dotColor =
          templateColors[`dot-${index}`] ||
          templateColors[`card-${index}`] ||
          milestone.color ||
          DEFAULT_PALETTE[index % DEFAULT_PALETTE.length]
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
              fill={dotColor}
            />
            {selectedIds.has(`dot-${index}`) && renderHandles(dotRect, `dot-${index}`)}
          </g>
        )
      })}

      {/* Year / Date Text Labels */}
      {milestones.map((milestone, index) => {
        if (index === 0) return null
        const yearRect = getElementRect(`year-${index}`)
        const dateColor =
          templateColors[`year-${index}`] ||
          templateColors[`card-${index}`] ||
          milestone.color ||
          DEFAULT_PALETTE[index % DEFAULT_PALETTE.length]
        const dateText = milestone.date ?? String(2018 + index)

        return (
          <g
            key={`year-${index}`}
            data-element-id={`year-${index}`}
            onMouseDown={event => startDrag(event, `year-${index}`, yearRect)}
            transform={getTransform(`year-${index}`, yearRect)}
            style={{ cursor: 'pointer' }}
          >
            <text
              x={yearRect.x + yearRect.width / 2}
              y={yearRect.y + yearRect.height / 2 + 7}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={22}
              fontWeight="bold"
              fill={dateColor}
            >
              {dateText}
            </text>
            {selectedIds.has(`year-${index}`) && renderHandles(yearRect, `year-${index}`)}
          </g>
        )
      })}

      {/* Milestone Texts (Title & Subtitle directly next to stems) */}
      {milestones.map((milestone, index) => {
        const cardId = `card-${index}`
        const cardRect = getElementRect(cardId)
        const isSelected = selectedIds.has(cardId)

        const titleColor = templateColors[cardId] || '#23255a'
        const subtitleColor = templateColors[`subtitle-${index}`] || '#23255a'

        const maxTitleChars = Math.max(8, Math.floor(cardRect.width / 11))
        const titleLines = wrapTextByWidth(milestone.title || `Milestone 0${index + 1}`, maxTitleChars)

        const maxSubtitleChars = Math.max(10, Math.floor(cardRect.width / 7.2))
        const subtitleLines = milestone.subtitle
          ? wrapTextByWidth(milestone.subtitle, maxSubtitleChars)
          : ['MIGSO-PCUBED content and words to', 'be added here as required']

        const iconElement = getDynamicIcon(milestone.icon, 20, titleColor)
        const iconOffset = iconElement ? 24 : 0

        const titleLineHeight = 24
        const subtitleLineHeight = 18
        const titleTotalHeight = titleLines.length * titleLineHeight
        const subtitleTotalHeight = subtitleLines.length * subtitleLineHeight
        const neededHeight = Math.max(cardRect.height, titleTotalHeight + subtitleTotalHeight + 20)

        const effectiveCardRect: Rect = {
          ...cardRect,
          height: neededHeight,
        }

        return (
          <g
            key={cardId}
            data-element-id={cardId}
            onMouseDown={event => startDrag(event, cardId, effectiveCardRect)}
            transform={getTransform(cardId, effectiveCardRect)}
            style={{ cursor: 'pointer' }}
          >
            {/* Title */}
            <g transform={`translate(${effectiveCardRect.x}, ${effectiveCardRect.y + 20})`}>
              {iconElement && (
                <g transform="translate(0, -16)">
                  {iconElement}
                </g>
              )}
              <text
                x={iconOffset}
                y={0}
                fontFamily="Arial, sans-serif"
                fontSize={20}
                fontWeight="bold"
                fill={titleColor}
              >
                {titleLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={iconOffset} dy={lIdx === 0 ? 0 : titleLineHeight}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>

            {/* Subtitle */}
            {subtitleLines.length > 0 && (
              <text
                x={effectiveCardRect.x}
                y={effectiveCardRect.y + 20 + titleTotalHeight + 8}
                fontFamily="Arial, sans-serif"
                fontSize={13.5}
                fill={subtitleColor}
                opacity={0.88}
              >
                {subtitleLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={effectiveCardRect.x} dy={lIdx === 0 ? 0 : subtitleLineHeight}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}

            {isSelected && renderHandles(effectiveCardRect, cardId)}
          </g>
        )
      })}
    </g>
  )
}
