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

// Design from PDF Page 137:
// Horizontal timeline with dots per year, slanted leader lines to text blocks above.
// Bottom phase chevron banners (Phase One/Two/Three).
// Years come from `quarters` DSL or from each milestone's `date:` field.
// Default fallback: 2019–2028 (10 years).

export function Roadmap2Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones, quarters } = data
  const W = 1000

  // Build the list of year labels:
  // Priority 1: each milestone's ms.date field
  // Priority 2: quarters DSL list
  // Priority 3: fallback 2019–2028
  const years = useMemo(() => {
    if (milestones.length > 0 && milestones.some(ms => ms.date)) {
      return milestones.map((ms, i) => ms.date ?? String(2019 + i))
    }
    if (quarters && quarters.length > 0) {
      return quarters.map(q => q.label)
    }
    return ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028']
  }, [milestones, quarters])

  const N = years.length
  const startX = 80
  const spacing = Math.min(95, (W - startX * 2) / Math.max(N - 1, 1))
  const timelineY = 600

  // Index considered the "pivot" year (where color changes). Default: index 4 (2023 in default mode).
  // If custom years: pivot at the middle.
  const pivotIdx = Math.floor(N / 2)

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('main-title', { x: 45, y: 40, width: 350, height: 60 })
    map.set('phase-1', { x: 65, y: 740, width: 280, height: 100 })
    map.set('phase-2', { x: 350, y: 740, width: 300, height: 100 })
    map.set('phase-3', { x: 635, y: 740, width: 300, height: 100 })

    years.forEach((_, i) => {
      const cx = startX + i * spacing
      map.set(`dot-${i}`, { x: cx - 10, y: timelineY - 10, width: 20, height: 20 })
      map.set(`year-${i}`, { x: cx - 35, y: timelineY + 30, width: 70, height: 30 })
      map.set(`text-${i}`, { x: cx - 80, y: 250 + (i % 2 === 0 ? 0 : 160), width: 150, height: 80 })
    })

    return map
  }, [years, spacing])

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
  const p1R = getR('phase-1')
  const p2R = getR('phase-2')
  const p3R = getR('phase-3')

  const pivotX = startX + pivotIdx * spacing

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
      <line x1={0} y1={timelineY} x2={pivotX} y2={timelineY} stroke="#ff4a2b" strokeWidth={5} />
      <line x1={pivotX} y1={timelineY} x2={1000} y2={timelineY} stroke="#e0e0e0" strokeWidth={5} />

      {/* Year Points (Dots, Slanted Leader Lines & Text Blocks) */}
      {years.map((yr, i) => {
        const dotR = getR(`dot-${i}`)
        const yrR = getR(`year-${i}`)
        const txtR = getR(`text-${i}`)

        const isDark = i <= pivotIdx
        const dotColor = isDark ? '#1e204c' : '#2d62ed'
        const ms = milestones[i]

        const cx = dotR.x + dotR.width / 2
        const cy = dotR.y + dotR.height / 2

        const lineTopX = txtR.x + txtR.width - 20
        const lineTopY = txtR.y + txtR.height + 20

        return (
          <g key={i}>
            {/* Slanted Leader Line */}
            <line
              x1={cx}
              y1={cy - 12}
              x2={lineTopX}
              y2={lineTopY}
              stroke="#cccccc"
              strokeWidth={3}
            />

            {/* Text Box (milestone title+subtitle if available, else placeholder) */}
            <g onMouseDown={e => startDrag(e, `text-${i}`, txtR)} style={{ cursor: 'pointer' }}>
              {ms ? (
                <>
                  <text x={txtR.x} y={txtR.y + 18} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#222">{ms.title}</text>
                  {ms.subtitle && ms.subtitle.split('\n').map((line, li) => (
                    <text key={li} x={txtR.x} y={txtR.y + 36 + li * 18} fontFamily="Arial, sans-serif" fontSize={12} fill="#555">{line}</text>
                  ))}
                </>
              ) : (
                <>
                  <text x={txtR.x} y={txtR.y + 20} fontFamily="Arial, sans-serif" fontSize={13} fill="#444444">Content and description</text>
                  <text x={txtR.x} y={txtR.y + 38} fontFamily="Arial, sans-serif" fontSize={13} fill="#444444">to be added here as</text>
                  <text x={txtR.x} y={txtR.y + 56} fontFamily="Arial, sans-serif" fontSize={13} fill="#444444">required for step</text>
                </>
              )}
              {selectedIds.has(`text-${i}`) && renderHandles(txtR, `text-${i}`)}
            </g>

            {/* Dot */}
            <g onMouseDown={e => startDrag(e, `dot-${i}`, dotR)} style={{ cursor: 'pointer' }}>
              <circle cx={cx} cy={cy} r={12} fill={tplColors[`dot-${i}`] || dotColor} />
              {selectedIds.has(`dot-${i}`) && renderHandles(dotR, `dot-${i}`)}
            </g>

            {/* Year Label */}
            <g onMouseDown={e => startDrag(e, `year-${i}`, yrR)} style={{ cursor: 'pointer' }}>
              <text
                x={yrR.x + yrR.width / 2}
                y={yrR.y + 20}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={24}
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

      {/* Bottom Phase Banners (Chevrons) */}
      {/* Phase One */}
      <g onMouseDown={e => startDrag(e, 'phase-1', p1R)} style={{ cursor: 'pointer' }}>
        <path
          d={`M ${p1R.x} ${p1R.y} L ${p1R.x + p1R.width - 25} ${p1R.y} L ${p1R.x + p1R.width} ${p1R.y + p1R.height / 2} L ${p1R.x + p1R.width - 25} ${p1R.y + p1R.height} L ${p1R.x} ${p1R.y + p1R.height} Z`}
          fill={tplColors['phase-1'] || '#23255a'}
        />
        <text
          x={p1R.x + p1R.width / 2 - 10}
          y={p1R.y + p1R.height / 2 + 8}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={22}
          fontWeight="bold"
          fill="#ffffff"
        >
          Phase One
        </text>
        {selectedIds.has('phase-1') && renderHandles(p1R, 'phase-1')}
      </g>

      {/* Phase Two */}
      <g onMouseDown={e => startDrag(e, 'phase-2', p2R)} style={{ cursor: 'pointer' }}>
        <path
          d={`M ${p2R.x} ${p2R.y} L ${p2R.x + p2R.width - 25} ${p2R.y} L ${p2R.x + p2R.width} ${p2R.y + p2R.height / 2} L ${p2R.x + p2R.width - 25} ${p2R.y + p2R.height} L ${p2R.x} ${p2R.y + p2R.height} L ${p2R.x + 25} ${p2R.y + p2R.height / 2} Z`}
          fill={tplColors['phase-2'] || '#2d62ed'}
        />
        <text
          x={p2R.x + p2R.width / 2}
          y={p2R.y + p2R.height / 2 + 8}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={22}
          fontWeight="bold"
          fill="#ffffff"
        >
          Phase Two
        </text>
        {selectedIds.has('phase-2') && renderHandles(p2R, 'phase-2')}
      </g>

      {/* Phase Three */}
      <g onMouseDown={e => startDrag(e, 'phase-3', p3R)} style={{ cursor: 'pointer' }}>
        <path
          d={`M ${p3R.x} ${p3R.y} L ${p3R.x + p3R.width} ${p3R.y} L ${p3R.x + p3R.width} ${p3R.y + p3R.height} L ${p3R.x} ${p3R.y + p3R.height} L ${p3R.x + 25} ${p3R.y + p3R.height / 2} Z`}
          fill={tplColors['phase-3'] || '#ff4a2b'}
        />
        <text
          x={p3R.x + p3R.width / 2 + 10}
          y={p3R.y + p3R.height / 2 + 8}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={22}
          fontWeight="bold"
          fill="#ffffff"
        >
          Phase Three
        </text>
        {selectedIds.has('phase-3') && renderHandles(p3R, 'phase-3')}
      </g>
    </g>
  )
}
