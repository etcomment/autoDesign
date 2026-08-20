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

function getNextDate(dateStr?: string, fallbackYear = 2022): string {
  if (!dateStr) return String(fallbackYear)
  const trimmed = dateStr.trim()
  const num = Number(trimmed)
  if (!isNaN(num)) {
    return String(num + 1)
  }
  const match = /(\d+)$/.exec(trimmed)
  if (match && match[1]) {
    const nextNum = Number(match[1]) + 1
    return trimmed.slice(0, match.index) + String(nextNum)
  }
  return String(fallbackYear)
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

  const {
    milestones = [],
    quarters,
    startLabel = 'START',
    trackColor,
    trackBgColor,
    progress,
    progressColor,
  } = data

  // Timeline years / quarters (same logic as Roadmap 3)
  const years = useMemo(() => {
    if (quarters && quarters.length > 0) {
      return quarters.map(q => q.label.trim())
    }
    const dates = milestones
      .map(m => m.date?.trim())
      .filter((d): d is string => Boolean(d))

    if (dates.length > 0) {
      const last = dates[dates.length - 1]!
      const next = getNextDate(last, 2022)
      return [...dates, next]
    }
    return ['2019', '2020', '2021', '2022']
  }, [quarters, milestones])

  const totalDots = Math.max(1, years.length)
  const N = Math.max(1, milestones.length)

  // Pinning milestones to year dots (like Roadmap 3)
  const findYearIdx = (dateStr: string | undefined, fallbackIdx: number): number => {
    if (!dateStr) return fallbackIdx
    const idx = years.indexOf(dateStr.trim())
    return idx >= 0 ? idx : fallbackIdx
  }

  const pinIndices = useMemo(() => {
    return milestones.map((ms, i) => {
      if (i === 0 && !ms.date) return -1 // -1 means attached to START badge
      return findYearIdx(ms.date, Math.min(i - 1, totalDots - 1))
    })
  }, [milestones, years, totalDots])

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
    const startX = 310
    const endX = 930
    const stepX = totalDots > 1 ? (endX - startX) / (totalDots - 1) : 0

    // Year Dots on the timeline
    years.forEach((_, idx) => {
      const slotX = totalDots > 1 ? startX + idx * stepX : (startX + endX) / 2
      const isOdd = (idx + 1) % 2 !== 0

      map.set(`dot-${idx}`, {
        x: slotX - 9,
        y: timelineY - 9,
        width: 18,
        height: 18,
      })

      const yearY = isOdd ? timelineY - 42 : timelineY + 16
      map.set(`year-${idx}`, {
        x: slotX - 45,
        y: yearY,
        width: 90,
        height: 28,
      })
    })

    // Milestone Cards
    milestones.forEach((_, i) => {
      const pinIdx = pinIndices[i]!
      if (pinIdx === -1) {
        map.set(`card-${i}`, {
          x: startCircleX + 16,
          y: 35,
          width: cardWidth,
          height: cardHeight,
        })
      } else {
        const slotX = totalDots > 1 ? startX + pinIdx * stepX : (startX + endX) / 2
        const isAbove = i % 2 === 0
        const cardY = isAbove ? 35 : timelineY + 50

        map.set(`card-${i}`, {
          x: slotX + 16,
          y: cardY,
          width: cardWidth,
          height: cardHeight,
        })
      }
    })

    return map
  }, [milestones, years, pinIndices, totalDots, startCircleX, startCircleR, timelineY])

  // Synchronisation avec le store Zustand (avec détection du changement de N ou totalDots)
  const prevCountRef = useRef({ N, totalDots })
  useEffect(() => {
    const countChanged = prevCountRef.current.N !== N || prevCountRef.current.totalDots !== totalDots
    prevCountRef.current = { N, totalDots }

    for (const [id, rect] of defaultPositions.entries()) {
      if (countChanged || !positions[id]) {
        moveElement(id, { x: rect.x, y: rect.y })
        resizeElement(id, { width: rect.width, height: rect.height })
      }
    }
  }, [N, totalDots, defaultPositions, positions, moveElement, resizeElement])

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
  const startColor = templateColors['start-badge'] || milestones[0]?.color || '#4cbfa0'

  const terminalDotRect = getElementRect(`dot-${totalDots - 1}`)
  const trackStartX = startBadgeRect.x + startBadgeRect.width
  const timelineEndX = terminalDotRect.x + terminalDotRect.width / 2

  // Progress Pivot calculation
  let pivotX: number
  if (progress && !isNaN(Number(progress))) {
    const progIdx = Math.max(0, Math.min(totalDots - 1, Number(progress) - 1))
    pivotX = getElementRect(`dot-${progIdx}`).x + getElementRect(`dot-${progIdx}`).width / 2
  } else if (progress && progress.includes('%')) {
    const pct = Math.max(0, Math.min(100, parseFloat(progress))) / 100
    pivotX = trackStartX + (timelineEndX - trackStartX) * pct
  } else {
    // Default pivot: active up to the middle or pinned dot
    const validPins = pinIndices.filter(idx => idx >= 0)
    const pivotIdx = validPins.length > 1
      ? validPins[Math.min(1, validPins.length - 1)]!
      : Math.max(0, Math.min(1, totalDots - 2))
    pivotX = getElementRect(`dot-${pivotIdx}`).x + getElementRect(`dot-${pivotIdx}`).width / 2
  }

  const activeTrackColor =
    templateColors['timeline-track-dark'] ||
    progressColor ||
    trackColor ||
    '#23255a'

  const inactiveTrackColor =
    templateColors['timeline-track-light'] ||
    trackBgColor ||
    '#d9dee4'

  return (
    <g ref={svgRef}>
      {/* Horizontal Timeline Track: Active Progress Section */}
      <line
        x1={trackStartX}
        y1={startBadgeRect.y + startBadgeRect.height / 2}
        x2={pivotX}
        y2={startBadgeRect.y + startBadgeRect.height / 2}
        stroke={activeTrackColor}
        strokeWidth={templateStrokeWidths['timeline-track'] || 4.5}
      />

      {/* Horizontal Timeline Track: Remaining Track Section */}
      <line
        x1={pivotX}
        y1={startBadgeRect.y + startBadgeRect.height / 2}
        x2={timelineEndX}
        y2={startBadgeRect.y + startBadgeRect.height / 2}
        stroke={inactiveTrackColor}
        strokeWidth={templateStrokeWidths['timeline-track'] || 4.5}
      />

      {/* Vertical Stems for Milestones */}
      {milestones.map((milestone, index) => {
        const pinIdx = pinIndices[index]!
        const stemColor =
          templateColors[`stem-${index}`] ||
          templateColors[`card-${index}`] ||
          milestone.color ||
          DEFAULT_PALETTE[index % DEFAULT_PALETTE.length]

        if (pinIdx === -1) {
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
        const dotRect = getElementRect(`dot-${pinIdx}`)
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

      {/* START Badge (Circle on Timeline) */}
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

      {/* Timeline Dots */}
      {years.map((_, dotIdx) => {
        const dotRect = getElementRect(`dot-${dotIdx}`)
        const matchedMsIdx = pinIndices.indexOf(dotIdx)
        const ms = matchedMsIdx >= 0 ? milestones[matchedMsIdx] : undefined
        const dotColor =
          templateColors[`dot-${dotIdx}`] ||
          (matchedMsIdx >= 0 ? templateColors[`card-${matchedMsIdx}`] : undefined) ||
          ms?.color ||
          DEFAULT_PALETTE[dotIdx % DEFAULT_PALETTE.length]
        const dotRadius = Math.min(dotRect.width, dotRect.height) / 2

        return (
          <g
            key={`dot-${dotIdx}`}
            data-element-id={`dot-${dotIdx}`}
            onMouseDown={event => startDrag(event, `dot-${dotIdx}`, dotRect)}
            transform={getTransform(`dot-${dotIdx}`, dotRect)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={dotRect.x + dotRect.width / 2}
              cy={dotRect.y + dotRect.height / 2}
              r={dotRadius}
              fill={dotColor}
            />
            {selectedIds.has(`dot-${dotIdx}`) && renderHandles(dotRect, `dot-${dotIdx}`)}
          </g>
        )
      })}

      {/* Year / Date Text Labels */}
      {years.map((yearLabel, dotIdx) => {
        const yearRect = getElementRect(`year-${dotIdx}`)
        const matchedMsIdx = pinIndices.indexOf(dotIdx)
        const ms = matchedMsIdx >= 0 ? milestones[matchedMsIdx] : undefined
        const dateColor =
          templateColors[`year-${dotIdx}`] ||
          (matchedMsIdx >= 0 ? templateColors[`card-${matchedMsIdx}`] : undefined) ||
          ms?.color ||
          DEFAULT_PALETTE[dotIdx % DEFAULT_PALETTE.length]

        return (
          <g
            key={`year-${dotIdx}`}
            data-element-id={`year-${dotIdx}`}
            onMouseDown={event => startDrag(event, `year-${dotIdx}`, yearRect)}
            transform={getTransform(`year-${dotIdx}`, yearRect)}
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
              {yearLabel}
            </text>
            {selectedIds.has(`year-${dotIdx}`) && renderHandles(yearRect, `year-${dotIdx}`)}
          </g>
        )
      })}

      {/* Milestone Texts (Title & Subtitle directly next to stems) */}
      {milestones.map((milestone, index) => {
        const cardId = `card-${index}`
        const cardRect = getElementRect(cardId)
        const isSelected = selectedIds.has(cardId)

        const titleColor = templateColors[cardId] || milestone.color || '#23255a'
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
