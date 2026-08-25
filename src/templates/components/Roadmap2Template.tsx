import { MIGSO_PALETTE } from '../../lib/theme'
import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData, TemplateLane } from '../types'
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

function getDynamicIcon(iconName?: string, size = 18, color = '#ffffff'): ReactElement | null {
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

const FALLBACK_PHASES: TemplateLane[] = [
  { label: 'Phase One', color: '#23255a' },
  { label: 'Phase Two', color: '#2d62ed' },
  { label: 'Phase Three', color: '#ff4a2b' },
]

export function Roadmap2Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { milestones = [], quarters, lanes, progress, current } = data
  const W = 1000

  const phases = useMemo(() => {
    if (lanes && lanes.length > 0) {
      return lanes.map((l, i) => ({
        label: l.label,
        color: l.color || MIGSO_PALETTE[i % MIGSO_PALETTE.length]!,
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

  const N = Math.max(1, years.length)
  const startX = 80
  const spacing = Math.min(95, (W - startX * 2) / Math.max(N - 1, 1))
  const timelineY = 460

  const progressIdx = useMemo(() => {
    const target = current || progress
    if (target) {
      const asNum = Number(target)
      if (!isNaN(asNum)) return Math.min(asNum, N - 1)
      const found = years.findIndex(y => y.toLowerCase() === target.toLowerCase())
      if (found >= 0) return found
    }
    return Math.floor(N / 2)
  }, [current, progress, years, N])

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('timeline-line', { x: 40, y: timelineY - 10, width: W - 80, height: 20 })

    const phaseCount = Math.max(1, phases.length)
    const phaseGap = 6
    const phaseTotalW = W - 80
    const phaseW = Math.floor((phaseTotalW - phaseGap * (phaseCount - 1)) / phaseCount)
    const phaseY = 530
    const phaseH = 55

    phases.forEach((_, i) => {
      const phaseX = 40 + i * (phaseW + phaseGap)
      map.set(`phase-${i}`, { x: phaseX, y: phaseY, width: phaseW, height: phaseH })
    })

    years.forEach((_, i) => {
      const cx = startX + i * spacing
      const cy = timelineY
      map.set(`dot-${i}`, { x: cx - 12, y: cy - 12, width: 24, height: 24 })
      map.set(`year-${i}`, { x: cx - 40, y: cy + 24, width: 80, height: 30 })

      const isTop = i % 2 === 0
      const txtX = cx - 75
      const txtY = isTop ? 100 : 250
      map.set(`text-${i}`, { x: txtX, y: txtY, width: 150, height: 95 })

      map.set(`conn-${i}`, {
        x: cx - 2,
        y: Math.min(cy - 12, txtY + 95),
        width: 4,
        height: Math.abs(cy - 12 - (txtY + 95)),
      })
    })

    return map
  }, [years, spacing, phases, timelineY, N])

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

  const timelineLineR = getR('timeline-line')
  const progressX = startX + progressIdx * spacing
  const timelineY2 = timelineLineR.y + timelineLineR.height / 2
  const progressLineX = timelineLineR.x + (progressX / W) * timelineLineR.width

  const chevronPath = (r: Rect, idx: number, total: number): string => {
    const { x, y, width: w, height: h } = r
    const n = 18
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
      {/* Timeline track */}
      <g
        data-element-id="timeline-line"
        onMouseDown={e => startDrag(e, 'timeline-line', timelineLineR)}
        transform={getTransform('timeline-line', timelineLineR)}
        style={{ cursor: 'pointer' }}
      >
        <line x1={timelineLineR.x} y1={timelineY2} x2={progressLineX} y2={timelineY2} stroke="#ff4a2b" strokeWidth={5} />
        <line x1={progressLineX} y1={timelineY2} x2={timelineLineR.x + timelineLineR.width} y2={timelineY2} stroke="#e0e0e0" strokeWidth={5} />
        {selectedIds.has('timeline-line') && renderHandles(timelineLineR, 'timeline-line')}
      </g>

      {/* Years, Dots, Connectors & Cards */}
      {years.map((yr, i) => {
        const dotR = getR(`dot-${i}`)
        const yrR = getR(`year-${i}`)
        const txtR = getR(`text-${i}`)
        const ms = milestones[i]

        const laneColor = ms?.lane
          ? (phases.find(p => p.label === ms.lane) || phases.find(p => p.label.startsWith(ms.lane!)))?.color
          : undefined
        const dotColor = laneColor || ms?.color || (i <= progressIdx ? '#1e204c' : '#2d62ed')

        const maxTitleChars = Math.max(8, Math.floor(txtR.width / 9.5))
        const maxSubChars = Math.max(10, Math.floor(txtR.width / 7.5))
        const titleLines = wrapTextByWidth(ms?.title || `Step ${i + 1}`, maxTitleChars)
        const subLines = ms?.subtitle ? wrapTextByWidth(ms.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(ms?.icon, 16, dotColor)

        return (
          <g key={i}>
            {/* Dynamic vertical connector line */}
            <g data-element-id={`conn-${i}`}>
              <line
                x1={dotR.x + dotR.width / 2}
                y1={dotR.y + dotR.height / 2}
                x2={txtR.x + txtR.width / 2}
                y2={txtR.y + txtR.height}
                stroke={tplColors[`conn-${i}`] || '#cccccc'}
                strokeWidth={tplStrokeWidths[`conn-${i}`] || 2.5}
                strokeDasharray="4 2"
              />
            </g>

            {/* Text Card */}
            <g
              data-element-id={`text-${i}`}
              onMouseDown={e => startDrag(e, `text-${i}`, txtR)}
              transform={getTransform(`text-${i}`, txtR)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={txtR.x}
                y={txtR.y}
                width={txtR.width}
                height={txtR.height}
                rx={6}
                fill={tplColors[`text-${i}`] || '#ffffff'}
                stroke={tplStrokeColors[`text-${i}`] || (selectedIds.has(`text-${i}`) ? '#2196f3' : '#e2e8f0')}
                strokeWidth={selectedIds.has(`text-${i}`) ? 2 : (tplStrokeWidths[`text-${i}`] ?? 1)}
              />
              <g transform={`translate(${txtR.x + 8}, ${txtR.y + 16})`}>
                {iconEl && <g transform="translate(0, -10)">{iconEl}</g>}
                <text
                  x={iconEl ? 22 : 0}
                  y={0}
                  fontFamily="Arial, sans-serif"
                  fontSize={13}
                  fontWeight={700}
                  fill={tplColors[`text-${i}`] ? '#ffffff' : '#222222'}
                >
                  {titleLines.map((line, li) => (
                    <tspan key={li} x={iconEl ? 22 : 0} dy={li === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
              {subLines.length > 0 && (
                <text
                  x={txtR.x + 8}
                  y={txtR.y + 18 + titleLines.length * 15 + 4}
                  fontFamily="Arial, sans-serif"
                  fontSize={11}
                  fill="#555555"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={txtR.x + 8} dy={li === 0 ? 0 : 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
              {selectedIds.has(`text-${i}`) && renderHandles(txtR, `text-${i}`)}
            </g>

            {/* Timeline Dot */}
            <g
              data-element-id={`dot-${i}`}
              onMouseDown={e => startDrag(e, `dot-${i}`, dotR)}
              transform={getTransform(`dot-${i}`, dotR)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={dotR.x + dotR.width / 2}
                cy={dotR.y + dotR.height / 2}
                r={Math.min(dotR.width, dotR.height) / 2}
                fill={tplColors[`dot-${i}`] || dotColor}
                stroke="#ffffff"
                strokeWidth={2}
              />
              {selectedIds.has(`dot-${i}`) && renderHandles(dotR, `dot-${i}`)}
            </g>

            {/* Year Label */}
            <g
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
                fill={tplColors[`year-${i}`] || '#222222'}
              >
                {yr}
              </text>
              {selectedIds.has(`year-${i}`) && renderHandles(yrR, `year-${i}`)}
            </g>
          </g>
        )
      })}

      {/* Phase Chevrons at bottom */}
      {phases.map((phase, i) => {
        const r = getR(`phase-${i}`)
        const fill = tplColors[`phase-${i}`] || phase.color
        const maxPhaseChars = Math.max(6, Math.floor(r.width / 11))
        const phaseLines = wrapTextByWidth(phase.label, maxPhaseChars)

        return (
          <g
            data-element-id={`phase-${i}`}
            key={`phase-${i}`}
            onMouseDown={e => startDrag(e, `phase-${i}`, r)}
            transform={getTransform(`phase-${i}`, r)}
            style={{ cursor: 'pointer' }}
          >
            <path d={chevronPath(r, i, phases.length)} fill={fill} />
            <text
              x={r.x + r.width / 2}
              y={r.y + r.height / 2 + 5 - (phaseLines.length - 1) * 7}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={15}
              fontWeight="bold"
              fill="#ffffff"
            >
              {phaseLines.map((line, li) => (
                <tspan key={li} x={r.x + r.width / 2} dy={li === 0 ? 0 : 16}>
                  {line}
                </tspan>
              ))}
            </text>
            {selectedIds.has(`phase-${i}`) && renderHandles(r, `phase-${i}`)}
          </g>
        )
      })}
    </g>
  )
}
