import { TITLE_COLOR } from '../../lib/theme'
import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

// Design from PDF Page 140:
// Large green circle "START" on left, horizontal timeline, 4 milestones alternating above/below.
// Each milestone is anchored to a specific x position on the timeline.
// The year label comes from ms.date (or fallback 2019/2020/2021/2022).
// 4 year dots at ms[0].date, ms[1].date, ms[2].date, ms[3].date positions.

const DEFAULT_DATES = ['2019', '2020', '2021', '2022']
const POSITIONS_X = [320, 515, 710, 905]  // default x positions for 4 milestones

export function Roadmap5Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones } = data
  const W = 1000

  // Take the first 4 milestones (the design has 4 slots)
  const slots = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      ms: milestones[i] || null,
      date: milestones[i]?.date ?? DEFAULT_DATES[i]!,
      x: POSITIONS_X[i]!,
    }))
  }, [milestones])

  const timelineY = 520
  const startCircleX = 125
  const startCircleR = 50

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('main-title', { x: 45, y: 40, width: 350, height: 60 })
    map.set('start-badge', { x: startCircleX - startCircleR, y: timelineY - startCircleR, width: 100, height: 100 })

    // Cards: ms[0] top-left, ms[1] bottom, ms[2] top, ms[3] bottom
    map.set('card-0', { x: slots[0]!.x - 125, y: 220, width: 250, height: 120 })
    map.set('card-1', { x: slots[1]!.x - 125, y: 650, width: 250, height: 120 })
    map.set('card-2', { x: slots[2]!.x - 125, y: 220, width: 250, height: 120 })
    map.set('card-3', { x: slots[3]!.x - 125, y: 650, width: 250, height: 120 })

    // Year labels
    slots.forEach((slot, i) => {
      const above = i % 2 === 0 // slots 0,2 above; slots 1,3 below
      map.set(`year-${i}`, {
        x: slot.x - 30,
        y: above ? timelineY - 40 : timelineY + 15,
        width: 60,
        height: 30,
      })
    })

    return map
  }, [slots])

  useEffect(() => {
    for (const [id, rect] of defaultPositions.entries()) {
      if (!pos[id]) {
        moveEl(id, { x: rect.x, y: rect.y })
        resizeEl(id, { width: rect.width, height: rect.height })
      }
    }
  }, [defaultPositions, pos, moveEl, resizeEl])

  const getR = (id: string): Rect => {
    const p = pos[id]
    const d = defaultPositions.get(id) || { x: 0, y: 0, width: 100, height: 50 }
    return {
      x: p?.x ?? d.x,
      y: p?.y ?? d.y,
      width: p?.width || d.width,
      height: p?.height || d.height,
    }
  }

  const titleR = getR('main-title')
  const startR = getR('start-badge')

  // Colors for stems & dots
  const stemColors = ['#4cbfa0', '#23255a', '#23255a', '#2d62ed']
  const dotColors  = ['#23255a', '#23255a', '#2d62ed', '#2d62ed']

  return (
    <g ref={svgRef}>
      {/* Title */}
      {title && (
        <g onMouseDown={e => startDrag(e, 'main-title', titleR)} style={{ cursor: 'pointer' }}>
          <text
            x={W / 2}
            y={48}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={22}
            fontWeight={700}
            fill={tplColors['main-title'] || TITLE_COLOR}
          >
            {title}
          </text>
          {selectedIds.has('main-title') && renderHandles(titleR, 'main-title')}
        </g>
      )}

      {/* Horizontal Timeline Lines */}
      {/* Dark Navy line from START to slot[1].x (pivot) */}
      <line x1={startCircleX + startCircleR} y1={timelineY} x2={slots[1]!.x} y2={timelineY} stroke="#23255a" strokeWidth={5} />
      {/* Light Grey line from slot[1].x to end */}
      <line x1={slots[1]!.x} y1={timelineY} x2={slots[3]!.x + 50} y2={timelineY} stroke="#e0e0e0" strokeWidth={5} />

      {/* Vertical Stems (slot 0: up from start, others up or down alternately) */}
      {slots.map((slot, i) => {
        const cardR = getR(`card-${i}`)
        const above = i % 2 === 0
        const color = tplColors[`stem-${i}`] ?? stemColors[i]!

        if (i === 0) {
          // Stem from START circle top to card bottom
          return (
            <line
              key={`stem-${i}`}
              x1={startCircleX}
              y1={cardR.y + cardR.height}
              x2={startCircleX}
              y2={timelineY - startCircleR}
              stroke={color}
              strokeWidth={4}
            />
          )
        }
        if (above) {
          // Stem goes up from timeline to card bottom
          return (
            <line
              key={`stem-${i}`}
              x1={slot.x}
              y1={cardR.y + cardR.height}
              x2={slot.x}
              y2={timelineY}
              stroke={color}
              strokeWidth={4}
            />
          )
        }
        // Stem goes down from timeline to card top
        return (
          <line
            key={`stem-${i}`}
            x1={slot.x}
            y1={timelineY}
            x2={slot.x}
            y2={cardR.y}
            stroke={color}
            strokeWidth={4}
          />
        )
      })}

      {/* Year Dots */}
      {slots.map((slot, i) => (
        <circle
          key={`dot-${i}`}
          cx={slot.x}
          cy={timelineY}
          r={8}
          fill={tplColors[`dot-${i}`] ?? dotColors[i]!}
        />
      ))}

      {/* Year Text Labels */}
      {slots.map((slot, i) => {
        const yrR = getR(`year-${i}`)
        const above = i % 2 === 0
        const yPos = above ? timelineY - 15 : timelineY + 32
        return (
          <g key={`year-${i}`} onMouseDown={e => startDrag(e, `year-${i}`, yrR)} style={{ cursor: 'pointer' }}>
            <text
              x={slot.x}
              y={yPos}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={22}
              fontWeight="bold"
              fill={dotColors[i]!}
            >
              {slot.date}
            </text>
            {selectedIds.has(`year-${i}`) && renderHandles(yrR, `year-${i}`)}
          </g>
        )
      })}

      {/* START Badge (Large Green Circle) */}
      <g onMouseDown={e => startDrag(e, 'start-badge', startR)} style={{ cursor: 'pointer' }}>
        <circle cx={startCircleX} cy={timelineY} r={startCircleR} fill={tplColors['start-badge'] || '#4cbfa0'} />
        <text x={startCircleX} y={timelineY + 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight="bold" fill="#ffffff">START</text>
        {selectedIds.has('start-badge') && renderHandles(startR, 'start-badge')}
      </g>

      {/* Milestone Cards */}
      {slots.map((slot, i) => {
        const cardR = getR(`card-${i}`)
        const ms = slot.ms
        const title_ = ms?.title ?? `Milestone 0${i + 1}`
        const subtitle_ = ms?.subtitle ?? 'Content and description to be\nadded here as required'
        return (
          <g key={`card-${i}`} onMouseDown={e => startDrag(e, `card-${i}`, cardR)} style={{ cursor: 'pointer' }}>
            <text x={cardR.x} y={cardR.y + 25} fontFamily="Arial, sans-serif" fontSize={22} fontWeight="bold" fill="#23255a">{title_}</text>
            {subtitle_.split('\n').map((line: string, li: number) => (
              <text key={li} x={cardR.x} y={cardR.y + 55 + li * 24} fontFamily="Arial, sans-serif" fontSize={14} fill="#555555">{line}</text>
            ))}
            {selectedIds.has(`card-${i}`) && renderHandles(cardR, `card-${i}`)}
          </g>
        )
      })}
    </g>
  )
}
