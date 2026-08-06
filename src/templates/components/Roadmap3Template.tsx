import { MIGSO_PALETTE, TITLE_COLOR } from '../../lib/theme'
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

export function Roadmap3Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones, quarters, lanes } = data
  const W = 1000

  const phases = useMemo(() => {
    if (lanes && lanes.length > 0) {
      return lanes.map((l, i) => ({
        label: l.label,
        color: l.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length],
      }))
    }
    return milestones.map((m, i) => ({
      label: m.title,
      color: m.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length],
    }))
  }, [lanes, milestones])

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

  const findYearIdx = (dateStr: string | undefined, fallbackIdx: number): number => {
    if (!dateStr) return fallbackIdx
    const idx = years.indexOf(dateStr)
    return idx >= 0 ? idx : fallbackIdx
  }

  const pinIndices = useMemo(() => {
    return milestones.map((ms, i) => findYearIdx(ms.date, Math.min(Math.floor(i * N / Math.max(milestones.length, 1)), N - 1)))
  }, [milestones, years, N])

  const sortedByDate = useMemo(() => {
    return [...milestones.keys()].sort((a, b) => pinIndices[a]! - pinIndices[b]!)
  }, [milestones, pinIndices])

  const getDotColor = (yearIdx: number): string => {
    let color: string = MIGSO_PALETTE[0]!
    for (const mi of sortedByDate) {
      const ms = milestones[mi]
      if (!ms) continue
      if (ms.date && years.indexOf(ms.date) <= yearIdx) {
        const laneColor = ms.lane ? (phases.find(p => p.label === ms.lane) || phases.find(p => p.label.startsWith(ms.lane!)))?.color : undefined
        color = laneColor || ms.color || phases[mi]?.color || color
      }
    }
    return color
  }

  const getMsColor = (msIdx: number): string => {
    const ms = milestones[msIdx]
    if (!ms) return MIGSO_PALETTE[msIdx % MIGSO_PALETTE.length]!
    const laneColor = ms.lane ? (phases.find(p => p.label === ms.lane) || phases.find(p => p.label.startsWith(ms.lane!)))?.color : undefined
    return laneColor || ms.color || phases[msIdx]?.color || MIGSO_PALETTE[msIdx % MIGSO_PALETTE.length]!
  }

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('main-title', { x: 45, y: 40, width: 350, height: 60 })

    milestones.forEach((_, i) => {
      const pinX = startX + pinIndices[i]! * spacing
      const above = i % 2 === 0
      const cardW = 250
      const cardH = 200
      const cardY = above ? 180 : timelineY + 60
      map.set(`card-${i}`, { x: pinX - cardW / 2, y: cardY, width: cardW, height: cardH })
      
      const lineY1 = above ? cardY + cardH : timelineY
      const lineY2 = above ? timelineY : cardY
      map.set(`vline-${i}`, { x: pinX - 2, y: Math.min(lineY1, lineY2), width: 4, height: Math.abs(lineY2 - lineY1) })
    })

    sortedByDate.forEach((mi, si) => {
      const pinX = startX + pinIndices[mi]! * spacing
      const prevMi = si > 0 ? sortedByDate[si - 1] : undefined
      const prevX = prevMi !== undefined ? startX + pinIndices[prevMi]! * spacing : 0
      
      if (si === 0) {
        map.set(`timeline-line-first-${mi}`, { x: 0, y: timelineY - 2, width: pinX, height: 4 })
      }
      if (si > 0) {
        map.set(`timeline-line-${mi}`, { x: prevX, y: timelineY - 2, width: pinX - prevX, height: 4 })
      }
      if (si === sortedByDate.length - 1) {
        map.set(`timeline-line-last-${mi}`, { x: pinX, y: timelineY - 2, width: 1000 - pinX, height: 4 })
      }
    })

    years.forEach((_, i) => {
      const cx = startX + i * spacing
      map.set(`dot-${i}`, { x: cx - 10, y: timelineY - 10, width: 20, height: 20 })
      map.set(`year-${i}`, { x: cx - 35, y: timelineY + 25, width: 70, height: 30 })
    })

    return map
  }, [years, spacing, milestones, pinIndices, sortedByDate])

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

  const cardPath = (r: Rect, above: boolean, leftArrow: boolean): string => {
    const { x, y, width: w, height: h } = r
    const aY1 = y + h * 0.6
    const aY2 = y + h * 0.75
    const aYM = y + h * 0.675
    const aW = Math.min(16, w * 0.1)
    if (above && leftArrow) {
      return `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} L ${x} ${aY2} L ${x - aW} ${aYM} L ${x} ${aY1} Z`
    }
    if (!above && !leftArrow) {
      return `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${aY1} L ${x + w + aW} ${aYM} L ${x + w} ${aY2} L ${x + w} ${y + h} L ${x} ${y + h} Z`
    }
    if (above && !leftArrow) {
      return `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${aY2} L ${x + w + aW} ${aYM} L ${x + w} ${aY1} L ${x + w} ${y + h} L ${x} ${y + h} Z`
    }
    return `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} L ${x} ${aY1} L ${x - aW} ${aYM} L ${x} ${aY2} Z`
  }

  return (
    <g ref={svgRef}>
      {title && (
        <g data-element-id="main-title" onMouseDown={e => startDrag(e, 'main-title', titleR)} transform={getTransform('main-title', titleR)} style={{ cursor: 'pointer' }}>
          <text
            x={titleR.x + titleR.width / 2}
            y={titleR.y + titleR.height / 2 + 8}
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

      {sortedByDate.map((mi, si) => {
        const color = getMsColor(mi)
        const prevMi = si > 0 ? sortedByDate[si - 1] : undefined
        const prevColor = prevMi !== undefined ? getMsColor(prevMi) : color

        const firstId = `timeline-line-first-${mi}`
        const midId = `timeline-line-${mi}`
        const lastId = `timeline-line-last-${mi}`

        const firstR = getR(firstId)
        const midR = getR(midId)
        const lastR = getR(lastId)

        return (
          <g key={`line-${mi}`}>
            {si === 0 && (
              <g onMouseDown={e => startDrag(e, firstId, firstR)} transform={getTransform(firstId, firstR)} style={{ cursor: 'pointer' }}>
                <rect x={firstR.x} y={firstR.y} width={firstR.width} height={firstR.height} fill={tplColors[firstId] || color} />
                {selectedIds.has(firstId) && renderHandles(firstR, firstId)}
              </g>
            )}
            {si > 0 && (
              <g onMouseDown={e => startDrag(e, midId, midR)} transform={getTransform(midId, midR)} style={{ cursor: 'pointer' }}>
                <rect x={midR.x} y={midR.y} width={midR.width} height={midR.height} fill={tplColors[midId] || prevColor} />
                {selectedIds.has(midId) && renderHandles(midR, midId)}
              </g>
            )}
            {si === sortedByDate.length - 1 && (
              <g onMouseDown={e => startDrag(e, lastId, lastR)} transform={getTransform(lastId, lastR)} style={{ cursor: 'pointer' }}>
                <rect x={lastR.x} y={lastR.y} width={lastR.width} height={lastR.height} fill={tplColors[lastId] || "#e0e0e0"} />
                {selectedIds.has(lastId) && renderHandles(lastR, lastId)}
              </g>
            )}
          </g>
        )
      })}

      {milestones.map((ms, i) => {
        const r = getR(`card-${i}`)
        const above = i % 2 === 0
        const leftArrow = i % 2 === 0
        const color = getMsColor(i)
        const pinX = startX + pinIndices[i]! * spacing
        const textAnchor = leftArrow ? 'start' : 'end'
        const textX = leftArrow ? r.x + 30 : r.x + r.width - 30

        return (
          <g key={`card-${i}`}>
            {(() => {
              const pinYearIdx = pinIndices[i]!
              const dotR = getR(`dot-${pinYearIdx}`)
              const dotCx = dotR.x + dotR.width / 2
              const dotCy = dotR.y + dotR.height / 2
              const cardMiddleX = r.x + r.width / 2
              const cardYEdge = above ? r.y + r.height : r.y
              return (
                <line
                  x1={cardMiddleX}
                  y1={cardYEdge}
                  x2={dotCx}
                  y2={dotCy}
                  stroke={tplColors[`vline-${i}`] || color}
                  strokeWidth={4}
                />
              )
            })()}
            <g data-element-id={`card-${i}`} onMouseDown={e => startDrag(e, `card-${i}`, r)} transform={getTransform(`card-${i}`, r)} style={{ cursor: 'pointer' }}>
              <path d={cardPath(r, above, leftArrow)} fill={tplColors[`card-${i}`] || color} />
              <text
                x={textX}
                y={r.y + r.height * 0.275}
                textAnchor={textAnchor}
                fontFamily="Arial, sans-serif"
                fontSize={22}
                fontWeight="bold"
                fill="#ffffff"
              >
                {ms.title}
              </text>
              {ms.date && (
                <text x={textX} y={r.y + r.height * 0.41} textAnchor={textAnchor} fontFamily="Arial, sans-serif" fontSize={13} fill="#ffffff" opacity={0.7}>
                  {ms.date}
                </text>
              )}
              {ms.subtitle && ms.subtitle.split('\n').map((line, li) => (
                <text
                  key={li}
                  x={textX}
                  y={r.y + r.height * 0.525 + li * 26}
                  textAnchor={textAnchor}
                  fontFamily="Arial, sans-serif"
                  fontSize={15}
                  fill="#ffffff"
                  opacity={0.9}
                >
                  {line}
                </text>
              ))}
              {selectedIds.has(`card-${i}`) && renderHandles(r, `card-${i}`)}
            </g>
          </g>
        )
      })}

      {years.map((yr, i) => {
        const dotR = getR(`dot-${i}`)
        const yrR = getR(`year-${i}`)
        const dotColor = getDotColor(i)
        const cx = dotR.x + dotR.width / 2
        const cy = dotR.y + dotR.height / 2
        const pinIdx = pinIndices.findIndex(p => p === i)
        const yrY = pinIdx >= 0 && pinIdx % 2 !== 0 ? yrR.y + yrR.height / 2 : yrR.y + 20

        return (
          <g key={i}>
            <g data-element-id={`dot-${i}`} onMouseDown={e => startDrag(e, `dot-${i}`, dotR)} transform={getTransform(`dot-${i}`, dotR)} style={{ cursor: 'pointer' }}>
              <circle cx={cx} cy={cy} r={Math.min(dotR.width, dotR.height) / 2} fill={tplColors[`dot-${i}`] || dotColor} />
              {selectedIds.has(`dot-${i}`) && renderHandles(dotR, `dot-${i}`)}
            </g>
            <g data-element-id={`year-${i}`} onMouseDown={e => startDrag(e, `year-${i}`, yrR)} transform={getTransform(`year-${i}`, yrR)} style={{ cursor: 'pointer' }}>
              <text
                x={yrR.x + yrR.width / 2}
                y={yrR.y + yrR.height / 2 + 6}
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
    </g>
  )
}
