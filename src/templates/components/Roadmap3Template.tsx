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

// Design from PDF Page 138:
// Horizontal timeline with dots per year. 2 milestone cards:
//   ms[0] floats ABOVE the timeline, connected via vertical pin to ms[0].date (or 2021 by default)
//   ms[1] floats BELOW the timeline, connected via vertical pin to ms[1].date (or 2026 by default)
// Years list comes from `quarters` DSL or from ms.date fields (auto-filled) or fallback 2019-2028.

export function Roadmap3Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones, quarters } = data
  const W = 1000

  const ms1 = milestones[0] || { title: 'Milestone 01', subtitle: 'Content and description to be\nadded here as required' }
  const ms2 = milestones[1] || { title: 'Milestone 02', subtitle: 'Content and description to be\nadded here as required' }

  // Build the list of year labels:
  // Priority 1: quarters DSL
  // Priority 2: fallback 2019-2028
  const years = useMemo(() => {
    if (quarters && quarters.length > 0) {
      return quarters.map(q => q.label)
    }
    return ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028']
  }, [quarters])

  const N = years.length
  const startX = 110
  const spacing = Math.min(88, (W - startX * 2) / Math.max(N - 1, 1))
  const timelineY = 500

  // Find the index of a given date label in the years array (for pin positioning)
  const findYearIdx = (dateStr: string | undefined, fallbackIdx: number): number => {
    if (!dateStr) return fallbackIdx
    const idx = years.indexOf(dateStr)
    return idx >= 0 ? idx : fallbackIdx
  }

  // ms[0] pins to ms1.date, default to year[2] (2021)
  // ms[1] pins to ms2.date, default to year[7] (2026)
  const pin0Idx = findYearIdx(ms1.date, Math.min(2, N - 1))
  const pin1Idx = findYearIdx(ms2.date, Math.min(7, N - 1))
  const pin0X = startX + pin0Idx * spacing
  const pin1X = startX + pin1Idx * spacing

  // Color pivot: year at pin1 index is the transition point
  const pivotIdx = pin1Idx

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('main-title', { x: 45, y: 40, width: 350, height: 60 })

    // Milestone cards
    map.set('card-0', { x: pin0X - 125, y: 180, width: 250, height: 270 })
    map.set('card-1', { x: pin1X - 125, y: 620, width: 250, height: 260 })

    years.forEach((_, i) => {
      const cx = startX + i * spacing
      map.set(`dot-${i}`, { x: cx - 10, y: timelineY - 10, width: 20, height: 20 })
      map.set(`year-${i}`, { x: cx - 35, y: timelineY + 25, width: 70, height: 30 })
    })

    return map
  }, [years, spacing, pin0X, pin1X])

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
  const card0R = getR('card-0')
  const card1R = getR('card-1')

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
            fill={tplColors['main-title'] || '#1e3a5f'}
          >
            {title}
          </text>
          {selectedIds.has('main-title') && renderHandles(titleR, 'main-title')}
        </g>
      )}

      {/* Horizontal Axis Lines */}
      <line x1={0} y1={timelineY} x2={pin1X} y2={timelineY} stroke="#23255a" strokeWidth={4} />
      <line x1={pin1X} y1={timelineY} x2={1000} y2={timelineY} stroke="#e0e0e0" strokeWidth={4} />

      {/* Vertical Pin Line for ms[0] (above timeline) */}
      <line x1={pin0X} y1={card0R.y + card0R.height} x2={pin0X} y2={timelineY} stroke="#23255a" strokeWidth={4} />
      {/* Vertical Pin Line for ms[1] (below timeline) */}
      <line x1={pin1X} y1={timelineY} x2={pin1X} y2={card1R.y} stroke="#2d62ed" strokeWidth={4} />

      {/* Year Points (Dots & Year Labels) */}
      {years.map((yr, i) => {
        const dotR = getR(`dot-${i}`)
        const yrR = getR(`year-${i}`)

        const isNavy = i <= pivotIdx
        const dotColor = isNavy ? '#23255a' : '#2d62ed'

        const cx = dotR.x + dotR.width / 2
        const cy = dotR.y + dotR.height / 2

        // Pin1 year label goes above the line
        const isPin1Year = i === pin1Idx
        const yrY = isPin1Year ? timelineY - 35 : yrR.y + 20

        return (
          <g key={i}>
            {/* Dot */}
            <g onMouseDown={e => startDrag(e, `dot-${i}`, dotR)} style={{ cursor: 'pointer' }}>
              <circle cx={cx} cy={cy} r={10} fill={tplColors[`dot-${i}`] || dotColor} />
              {selectedIds.has(`dot-${i}`) && renderHandles(dotR, `dot-${i}`)}
            </g>

            {/* Year Label */}
            <g onMouseDown={e => startDrag(e, `year-${i}`, yrR)} style={{ cursor: 'pointer' }}>
              <text
                x={yrR.x + yrR.width / 2}
                y={yrY}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={22}
                fontWeight="bold"
                fill="#222222"
              >
                {yr}
              </text>
              {selectedIds.has(`year-${i}`) && renderHandles(yrR, `year-${i}`)}
            </g>
          </g>
        )
      })}

      {/* Milestone 01 Box (Dark Navy, Left Arrow Pointer, floats ABOVE) */}
      <g onMouseDown={e => startDrag(e, 'card-0', card0R)} style={{ cursor: 'pointer' }}>
        <path
          d={`M ${card0R.x} ${card0R.y} L ${card0R.x + card0R.width} ${card0R.y} L ${card0R.x + card0R.width} ${card0R.y + card0R.height} L ${card0R.x} ${card0R.y + card0R.height} L ${card0R.x} ${card0R.y + 150} L ${card0R.x - 16} ${card0R.y + 135} L ${card0R.x} ${card0R.y + 120} Z`}
          fill={tplColors['card-0'] || '#23255a'}
        />
        <text
          x={card0R.x + 30}
          y={card0R.y + 55}
          fontFamily="Arial, sans-serif"
          fontSize={22}
          fontWeight="bold"
          fill="#ffffff"
        >
          {ms1.title}
        </text>
        {ms1.date && (
          <text x={card0R.x + 30} y={card0R.y + 82} fontFamily="Arial, sans-serif" fontSize={13} fill="#ffffff" opacity={0.7}>
            {ms1.date}
          </text>
        )}
        {ms1.subtitle && ms1.subtitle.split('\n').map((line, idx) => (
          <text
            key={idx}
            x={card0R.x + 30}
            y={card0R.y + 105 + idx * 26}
            fontFamily="Arial, sans-serif"
            fontSize={15}
            fill="#ffffff"
            opacity={0.9}
          >
            {line}
          </text>
        ))}
        {selectedIds.has('card-0') && renderHandles(card0R, 'card-0')}
      </g>

      {/* Milestone 02 Box (Medium Blue, Right Arrow Pointer, floats BELOW) */}
      <g onMouseDown={e => startDrag(e, 'card-1', card1R)} style={{ cursor: 'pointer' }}>
        <path
          d={`M ${card1R.x} ${card1R.y} L ${card1R.x + card1R.width} ${card1R.y} L ${card1R.x + card1R.width} ${card1R.y + 120} L ${card1R.x + card1R.width + 16} ${card1R.y + 135} L ${card1R.x + card1R.width} ${card1R.y + 150} L ${card1R.x + card1R.width} ${card1R.y + card1R.height} L ${card1R.x} ${card1R.y + card1R.height} Z`}
          fill={tplColors['card-1'] || '#2d62ed'}
        />
        <text
          x={card1R.x + card1R.width - 30}
          y={card1R.y + 55}
          textAnchor="end"
          fontFamily="Arial, sans-serif"
          fontSize={22}
          fontWeight="bold"
          fill="#ffffff"
        >
          {ms2.title}
        </text>
        {ms2.date && (
          <text x={card1R.x + card1R.width - 30} y={card1R.y + 82} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={13} fill="#ffffff" opacity={0.7}>
            {ms2.date}
          </text>
        )}
        {ms2.subtitle && ms2.subtitle.split('\n').map((line, idx) => (
          <text
            key={idx}
            x={card1R.x + card1R.width - 30}
            y={card1R.y + 105 + idx * 26}
            textAnchor="end"
            fontFamily="Arial, sans-serif"
            fontSize={15}
            fill="#ffffff"
            opacity={0.9}
          >
            {line}
          </text>
        ))}
        {selectedIds.has('card-1') && renderHandles(card1R, 'card-1')}
      </g>
    </g>
  )
}
