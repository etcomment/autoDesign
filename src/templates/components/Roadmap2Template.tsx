import { MIGSO_PALETTE, TITLE_COLOR } from '../../lib/theme'
import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData, TemplateLane } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

const FALLBACK_PHASES: TemplateLane[] = [
  { label: 'Phase One', color: '#23255a' },
  { label: 'Phase Two', color: '#2d62ed' },
  { label: 'Phase Three', color: '#ff4a2b' },
]

export function Roadmap2Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones, quarters, lanes, progress } = data
  const W = 1000

  const phases = useMemo(() => {
    if (lanes && lanes.length > 0) {
      return lanes.map((l, i) => ({
        label: l.label,
        color: l.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length],
      }))
    }
    return FALLBACK_PHASES
  }, [lanes])

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

  const progressIdx = useMemo(() => {
    if (progress) {
      const asNum = Number(progress)
      if (!isNaN(asNum)) return Math.min(asNum, N - 1)
      const found = years.findIndex(y => y === progress)
      if (found >= 0) return found
    }
    return Math.floor(N / 2)
  }, [progress, years, N])

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('main-title', { x: 45, y: 40, width: 350, height: 60 })

    const phaseCount = phases.length
    const phaseGap = 5
    const phaseTotalW = W - 80
    const phaseW = Math.floor((phaseTotalW - phaseGap * (phaseCount - 1)) / phaseCount)
    const phaseY = 740
    const phaseH = 100

    phases.forEach((_, i) => {
      const phaseX = 40 + i * (phaseW + phaseGap)
      map.set(`phase-${i}`, { x: phaseX, y: phaseY, width: phaseW, height: phaseH })
    })

    years.forEach((_, i) => {
      const cx = startX + i * spacing
      map.set(`dot-${i}`, { x: cx - 10, y: timelineY - 10, width: 20, height: 20 })
      map.set(`year-${i}`, { x: cx - 35, y: timelineY + 30, width: 70, height: 30 })
      map.set(`text-${i}`, { x: cx - 30, y: 250 + (i % 2 === 0 ? 0 : 160), width: 150, height: 80 })
    })

    return map
  }, [years, spacing, phases])

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
  const progressX = startX + progressIdx * spacing

  const chevronPath = (r: Rect, idx: number, total: number): string => {
    const { x, y, width: w, height: h } = r
    const n = 25
    if (total === 1) {
      return `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`
    }
    if (idx === 0) {
      return `M ${x} ${y} L ${x + w - n} ${y} L ${x + w} ${y + h / 2} L ${x + w - n} ${y + h} L ${x} ${y + h} Z`
    }
    if (idx === total - 1) {
      return `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} L ${x + n} ${y + h / 2} Z`
    }
    return `M ${x} ${y} L ${x + w - n} ${y} L ${x + w} ${y + h / 2} L ${x + w - n} ${y + h} L ${x} ${y + h} L ${x + n} ${y + h / 2} Z`
  }

  return (
    <g ref={svgRef}>
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

      <line x1={0} y1={timelineY} x2={progressX} y2={timelineY} stroke="#ff4a2b" strokeWidth={5} />
      <line x1={progressX} y1={timelineY} x2={1000} y2={timelineY} stroke="#e0e0e0" strokeWidth={5} />

      {years.map((yr, i) => {
        const dotR = getR(`dot-${i}`)
        const yrR = getR(`year-${i}`)
        const txtR = getR(`text-${i}`)
        const ms = milestones[i]
        const laneColor = ms?.lane ? (phases.find(p => p.label === ms.lane) || phases.find(p => p.label.startsWith(ms.lane!)))?.color : undefined
        const dotColor = laneColor || (i <= progressIdx ? '#1e204c' : '#2d62ed')
        const cx = dotR.x + dotR.width / 2
        const cy = dotR.y + dotR.height / 2
        const lineTopX = txtR.x + txtR.width / 2
        const lineTopY = txtR.y + txtR.height

        return (
          <g key={i}>
            <line x1={cx} y1={cy - 12} x2={lineTopX} y2={lineTopY} stroke="#cccccc" strokeWidth={3} />

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

            <g onMouseDown={e => startDrag(e, `dot-${i}`, dotR)} style={{ cursor: 'pointer' }}>
              <circle cx={cx} cy={cy} r={12} fill={tplColors[`dot-${i}`] || dotColor} />
              {selectedIds.has(`dot-${i}`) && renderHandles(dotR, `dot-${i}`)}
            </g>

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

      {phases.map((phase, i) => {
        const r = getR(`phase-${i}`)
        const fill = tplColors[`phase-${i}`] || phase.color
        return (
          <g key={`phase-${i}`} onMouseDown={e => startDrag(e, `phase-${i}`, r)} style={{ cursor: 'pointer' }}>
            <path d={chevronPath(r, i, phases.length)} fill={fill} />
            <text
              x={r.x + r.width / 2}
              y={r.y + r.height / 2 + 8}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={22}
              fontWeight="bold"
              fill="#ffffff"
            >
              {phase.label}
            </text>
            {selectedIds.has(`phase-${i}`) && renderHandles(r, `phase-${i}`)}
          </g>
        )
      })}
    </g>
  )
}
