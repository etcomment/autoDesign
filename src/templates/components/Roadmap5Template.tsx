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

  const timelineY = 360
  const startCircleX = 110
  const startCircleR = 45

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()

    // START Badge
    map.set('start-badge', {
      x: startCircleX - startCircleR,
      y: timelineY - startCircleR,
      width: startCircleR * 2,
      height: startCircleR * 2,
    })

    const cardWidth = 220
    const cardHeight = 115

    // Slot 0 (above START badge)
    map.set('card-0', {
      x: startCircleX - cardWidth / 2,
      y: timelineY - startCircleR - 35 - cardHeight,
      width: cardWidth,
      height: cardHeight,
    })
    map.set('year-0', {
      x: startCircleX - 35,
      y: timelineY - startCircleR - 28,
      width: 70,
      height: 24,
    })

    // Intermediate and subsequent slots
    if (N > 1) {
      const remainingCount = N - 1
      const startX = 320
      const endX = 900
      const stepX = remainingCount > 1 ? (endX - startX) / (remainingCount - 1) : 0
      const posX = remainingCount === 1 ? (startX + endX) / 2 : startX

      for (let i = 1; i < N; i++) {
        const slotX = remainingCount === 1 ? posX : startX + (i - 1) * stepX
        const isAbove = i % 2 === 0

        const cardY = isAbove
          ? timelineY - 45 - cardHeight
          : timelineY + 45

        map.set(`card-${i}`, {
          x: slotX - cardWidth / 2,
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

        const yearY = isAbove ? timelineY - 32 : timelineY + 12
        map.set(`year-${i}`, {
          x: slotX - 35,
          y: yearY,
          width: 70,
          height: 24,
        })
      }
    }

    return map
  }, [N, startCircleX, startCircleR, timelineY])

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

  const startR = getElementRect('start-badge')
  const startColor = templateColors['start-badge'] || MIGSO_PALETTE[4] // Vert MIGSO

  // Timeline track
  const lastDotX = N > 1 ? getElementRect(`dot-${N - 1}`).x + getElementRect(`dot-${N - 1}`).width / 2 : startR.x + startR.width + 120
  const timelineEndX = Math.max(startR.x + startR.width + 150, lastDotX + 60)

  return (
    <g ref={svgRef}>
      {/* Horizontal Timeline Track */}
      <line
        x1={startR.x + startR.width}
        y1={startR.y + startR.height / 2}
        x2={timelineEndX}
        y2={startR.y + startR.height / 2}
        stroke={templateColors['timeline-track'] || '#23255a'}
        strokeWidth={templateStrokeWidths['timeline-track'] || 5}
        strokeLinecap="round"
      />

      {/* Vertical Stems */}
      {milestones.map((_, i) => {
        const cardR = getElementRect(`card-${i}`)
        const color = templateColors[`stem-${i}`] || templateColors[`card-${i}`] || milestones[i]?.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length]

        if (i === 0) {
          // Stem from card-0 bottom to START badge top
          return (
            <line
              key={`stem-${i}`}
              x1={cardR.x + cardR.width / 2}
              y1={cardR.y + cardR.height}
              x2={startR.x + startR.width / 2}
              y2={startR.y}
              stroke={color}
              strokeWidth={3.5}
              strokeLinecap="round"
            />
          )
        }

        const dotR = getElementRect(`dot-${i}`)
        const dotCenterX = dotR.x + dotR.width / 2
        const dotCenterY = dotR.y + dotR.height / 2
        const isAbove = i % 2 === 0
        const cardAnchorY = isAbove ? cardR.y + cardR.height : cardR.y

        return (
          <line
            key={`stem-${i}`}
            x1={dotCenterX}
            y1={dotCenterY}
            x2={cardR.x + cardR.width / 2}
            y2={cardAnchorY}
            stroke={color}
            strokeWidth={3.5}
            strokeLinecap="round"
          />
        )
      })}

      {/* Year Dots for i > 0 */}
      {milestones.map((ms, i) => {
        if (i === 0) return null
        const dotR = getElementRect(`dot-${i}`)
        const dotColor = templateColors[`dot-${i}`] || ms.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length]
        const dotRadius = Math.min(dotR.width, dotR.height) / 2

        return (
          <g
            key={`dot-${i}`}
            data-element-id={`dot-${i}`}
            onMouseDown={e => startDrag(e, `dot-${i}`, dotR)}
            transform={getTransform(`dot-${i}`, dotR)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={dotR.x + dotR.width / 2}
              cy={dotR.y + dotR.height / 2}
              r={dotRadius}
              fill="#ffffff"
              stroke={dotColor}
              strokeWidth={3.5}
            />
            <circle
              cx={dotR.x + dotR.width / 2}
              cy={dotR.y + dotR.height / 2}
              r={Math.max(2, dotRadius - 4)}
              fill={dotColor}
            />
            {selectedIds.has(`dot-${i}`) && renderHandles(dotR, `dot-${i}`)}
          </g>
        )
      })}

      {/* Year Text Labels */}
      {milestones.map((ms, i) => {
        const yrR = getElementRect(`year-${i}`)
        const yrColor = templateColors[`year-${i}`] || ms.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length]
        const dateText = ms.date || String(2024 + i)

        return (
          <g
            key={`year-${i}`}
            data-element-id={`year-${i}`}
            onMouseDown={e => startDrag(e, `year-${i}`, yrR)}
            transform={getTransform(`year-${i}`, yrR)}
            style={{ cursor: 'pointer' }}
          >
            <text
              x={yrR.x + yrR.width / 2}
              y={yrR.y + yrR.height / 2 + 6}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={18}
              fontWeight="bold"
              fill={yrColor}
            >
              {dateText}
            </text>
            {selectedIds.has(`year-${i}`) && renderHandles(yrR, `year-${i}`)}
          </g>
        )
      })}

      {/* START Badge (Large Green Circle) */}
      <g
        data-element-id="start-badge"
        onMouseDown={e => startDrag(e, 'start-badge', startR)}
        transform={getTransform('start-badge', startR)}
        style={{ cursor: 'pointer' }}
      >
        <circle
          cx={startR.x + startR.width / 2}
          cy={startR.y + startR.height / 2}
          r={Math.min(startR.width, startR.height) / 2}
          fill={startColor}
          stroke={templateStrokeColors['start-badge'] || '#ffffff'}
          strokeWidth={templateStrokeWidths['start-badge'] || 3}
        />
        <text
          x={startR.x + startR.width / 2}
          y={startR.y + startR.height / 2 + 7}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={18}
          fontWeight="bold"
          fill="#ffffff"
        >
          {startLabel}
        </text>
        {selectedIds.has('start-badge') && renderHandles(startR, 'start-badge')}
      </g>

      {/* Milestone Cards */}
      {milestones.map((ms, i) => {
        const cardId = `card-${i}`
        const cardR = getElementRect(cardId)
        const isSelected = selectedIds.has(cardId)
        const msColor = templateColors[cardId] || ms.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length]

        const maxTitleChars = Math.max(8, Math.floor(cardR.width / 11))
        const titleLines = wrapTextByWidth(ms.title || `Milestone 0${i + 1}`, maxTitleChars)

        const maxSubtitleChars = Math.max(10, Math.floor(cardR.width / 7.5))
        const subtitleLines = ms.subtitle ? wrapTextByWidth(ms.subtitle, maxSubtitleChars) : []

        const iconElement = getDynamicIcon(ms.icon, 20, msColor)
        const iconSize = iconElement ? 24 : 0

        const titleLineHeight = 22
        const subtitleLineHeight = 16
        const titleTotalHeight = titleLines.length * titleLineHeight
        const subtitleTotalHeight = subtitleLines.length * subtitleLineHeight
        const neededHeight = Math.max(cardR.height, 20 + titleTotalHeight + (subtitleLines.length > 0 ? 10 + subtitleTotalHeight : 0))

        const effectiveCardR: Rect = {
          ...cardR,
          height: neededHeight,
        }

        return (
          <g
            key={cardId}
            data-element-id={cardId}
            onMouseDown={e => startDrag(e, cardId, effectiveCardR)}
            transform={getTransform(cardId, effectiveCardR)}
            style={{ cursor: 'pointer' }}
          >
            {/* Header: Icon + Title */}
            <g transform={`translate(${effectiveCardR.x}, ${effectiveCardR.y + 18})`}>
              {iconElement && (
                <g transform="translate(0, -14)">
                  {iconElement}
                </g>
              )}
              <text
                x={iconSize}
                y={0}
                fontFamily="Arial, sans-serif"
                fontSize={18}
                fontWeight="bold"
                fill={msColor}
              >
                {titleLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={iconSize} dy={lIdx === 0 ? 0 : titleLineHeight}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>

            {/* Subtitle */}
            {subtitleLines.length > 0 && (
              <text
                x={effectiveCardR.x}
                y={effectiveCardR.y + 20 + titleTotalHeight + 10}
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fill="#555555"
              >
                {subtitleLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={effectiveCardR.x} dy={lIdx === 0 ? 0 : subtitleLineHeight}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}

            {isSelected && renderHandles(effectiveCardR, cardId)}
          </g>
        )
      })}
    </g>
  )
}
