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
    current,
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

  // Current Step calculation: determines which stage is active/current
  const currentStepIdx = useMemo(() => {
    // 1. Explicit current in data: e.g. "current 2020" or "current 2" or "current Milestone 03"
    if (current) {
      const trimmed = current.trim()
      const yrIdx = years.indexOf(trimmed)
      if (yrIdx >= 0) return yrIdx

      const num = Number(trimmed)
      if (!isNaN(num) && num >= 1 && num <= totalDots) {
        return num - 1
      }

      const msMatch = milestones.findIndex(m => m.title.toLowerCase() === trimmed.toLowerCase())
      if (msMatch >= 0 && pinIndices[msMatch] !== undefined && pinIndices[msMatch]! >= 0) {
        return pinIndices[msMatch]!
      }
    }

    // 2. Explicit milestone marked with current: true or status: 'current'
    const currentMsIdx = milestones.findIndex(m => m.current || m.status === 'current')
    if (currentMsIdx >= 0 && pinIndices[currentMsIdx] !== undefined && pinIndices[currentMsIdx]! >= 0) {
      return pinIndices[currentMsIdx]!
    }

    // 3. Explicit progress e.g. "progress 2020" or "progress 2"
    if (progress) {
      const yrIdx = years.indexOf(progress.trim())
      if (yrIdx >= 0) return yrIdx
      const num = Number(progress.trim())
      if (!isNaN(num) && num >= 1 && num <= totalDots) return num - 1
    }

    // 4. Default: active up to 2020 or the 2nd dot (index 1)
    const default2020Idx = years.indexOf('2020')
    if (default2020Idx >= 0) return default2020Idx

    const validPins = pinIndices.filter(idx => idx >= 0)
    if (validPins.length > 1) {
      return validPins[Math.min(1, validPins.length - 1)]!
    }
    return Math.max(0, Math.min(1, totalDots - 2))
  }, [current, progress, milestones, pinIndices, years, totalDots])

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

  // Synchronisation avec le store Zustand
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

  const inactiveTrackColor =
    templateColors['timeline-track-light'] ||
    trackBgColor ||
    '#d9dee4'

  return (
    <g ref={svgRef}>
      {/* Horizontal Timeline Track: Segment 0 from START to first Dot */}
      {totalDots > 0 && (() => {
        const firstDotRect = getElementRect('dot-0')
        const firstDotCenterX = firstDotRect.x + firstDotRect.width / 2
        const isCompleted = currentStepIdx >= 0
        const seg0Color = isCompleted
          ? templateColors['seg-start'] ||
            trackColor ||
            progressColor ||
            milestones[0]?.color ||
            '#4cbfa0'
          : inactiveTrackColor

        return (
          <line
            key="seg-start"
            x1={startBadgeRect.x + startBadgeRect.width}
            y1={startBadgeRect.y + startBadgeRect.height / 2}
            x2={firstDotCenterX}
            y2={startBadgeRect.y + startBadgeRect.height / 2}
            stroke={seg0Color}
            strokeWidth={templateStrokeWidths['timeline-track'] || 4.5}
          />
        )
      })()}

      {/* Horizontal Timeline Track: Segments between Dots (colored starting from dot-i) */}
      {Array.from({ length: Math.max(0, totalDots - 1) }, (_, i) => {
        const dotFromRect = getElementRect(`dot-${i}`)
        const dotToRect = getElementRect(`dot-${i + 1}`)
        const fromX = dotFromRect.x + dotFromRect.width / 2
        const toX = dotToRect.x + dotToRect.width / 2
        const lineY = startBadgeRect.y + startBadgeRect.height / 2

        // Completed starting from dot-i towards dot-(i+1) if origin i < currentStepIdx
        const isCompleted = i < currentStepIdx
        const matchedMsIdx = pinIndices.indexOf(i)
        const ms = matchedMsIdx >= 0 ? milestones[matchedMsIdx] : undefined

        const activeColor =
          templateColors[`seg-${i}`] ||
          trackColor ||
          progressColor ||
          ms?.color ||
          (i <= currentStepIdx ? '#23255a' : '#2d62ed')

        const segColor = isCompleted ? activeColor : inactiveTrackColor

        return (
          <line
            key={`seg-${i}`}
            x1={fromX}
            y1={lineY}
            x2={toX}
            y2={lineY}
            stroke={segColor}
            strokeWidth={templateStrokeWidths['timeline-track'] || 4.5}
          />
        )
      })}

      {/* Vertical Stems for Milestones */}
      {milestones.map((milestone, index) => {
        const pinIdx = pinIndices[index]!
        const isPastOrCurrent = pinIdx <= currentStepIdx
        const defaultColor = isPastOrCurrent ? '#23255a' : '#2d62ed'

        const stemColor =
          templateColors[`stem-${index}`] ||
          templateColors[`card-${index}`] ||
          milestone.color ||
          (index === 0 ? '#4cbfa0' : defaultColor)

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
        const isPastOrCurrent = dotIdx <= currentStepIdx
        const defaultDotColor = isPastOrCurrent ? '#23255a' : '#2d62ed'

        const dotColor =
          templateColors[`dot-${dotIdx}`] ||
          (matchedMsIdx >= 0 ? templateColors[`card-${matchedMsIdx}`] : undefined) ||
          ms?.color ||
          defaultDotColor

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
        const isPastOrCurrent = dotIdx <= currentStepIdx
        const defaultDateColor = isPastOrCurrent ? '#23255a' : '#2d62ed'

        const dateColor =
          templateColors[`year-${dotIdx}`] ||
          (matchedMsIdx >= 0 ? templateColors[`card-${matchedMsIdx}`] : undefined) ||
          ms?.color ||
          defaultDateColor

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

        const pinIdx = pinIndices[index]!
        const isPastOrCurrent = pinIdx <= currentStepIdx
        const defaultTitleColor = isPastOrCurrent ? '#23255a' : '#23255a'

        const titleColor = templateColors[cardId] || milestone.color || defaultTitleColor
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
