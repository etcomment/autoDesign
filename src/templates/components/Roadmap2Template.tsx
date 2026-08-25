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

function getDynamicIcon(iconName?: string, size = 18, color = '#2c2b64'): ReactElement | null {
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

function computePriorDate(firstDate: string): string {
  const numMatch = firstDate.match(/\b(19\d\d|20\d\d)\b/)
  if (numMatch) {
    const yr = Number(numMatch[1])
    return firstDate.replace(numMatch[1], String(yr - 1))
  }
  const qMatch = firstDate.match(/^Q([1-4])\s*(\d{4})$/i)
  if (qMatch) {
    const q = Number(qMatch[1])
    const yr = Number(qMatch[2])
    if (q === 1) return `Q4 ${yr - 1}`
    return `Q${q - 1} ${yr}`
  }
  return 'Start'
}

const FALLBACK_PHASES: TemplateLane[] = [
  { label: 'Phase One', color: '#2c2b64' },
  { label: 'Phase Two', color: '#3366cc' },
  { label: 'Phase Three', color: '#ff5338' },
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

  const { milestones = [], quarters, lanes, progress, current, trackColor, trackBgColor } = data
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

  const rawYears = useMemo(() => {
    if (milestones.length > 0 && milestones.some(ms => ms.date)) {
      return milestones.map((ms, i) => ms.date ?? String(2020 + i))
    }
    if (quarters && quarters.length > 0) {
      return quarters.map(q => q.label)
    }
    return ['2020', '2021', '2022', '2023', '2024']
  }, [milestones, quarters])

  const priorDate = useMemo(() => {
    const first = rawYears[0] || '2020'
    return computePriorDate(first)
  }, [rawYears])

  // Total points on timeline: Point 0 = priorDate, Points 1..N = rawYears
  const allYears = useMemo(() => [priorDate, ...rawYears], [priorDate, rawYears])

  const totalPoints = allYears.length
  const startX = 80
  const spacing = Math.min(150, (W - startX * 2) / Math.max(totalPoints - 1, 1))
  const timelineY = 320

  const progressIdx = useMemo(() => {
    const target = current || progress
    if (target) {
      const targetStr = String(target).trim().toLowerCase()
      const foundIdx = allYears.findIndex(y => y.toLowerCase() === targetStr)
      if (foundIdx >= 0) return foundIdx

      const foundRaw = rawYears.findIndex(y => y.toLowerCase() === targetStr)
      if (foundRaw >= 0) return foundRaw + 1

      const foundMs = milestones.findIndex(
        m => m.title?.toLowerCase() === targetStr || m.date?.toLowerCase() === targetStr
      )
      if (foundMs >= 0) return foundMs + 1

      const asNum = Number(target)
      if (!isNaN(asNum) && asNum >= 0 && asNum < totalPoints) return asNum
    }
    return Math.min(3, totalPoints - 1)
  }, [current, progress, allYears, rawYears, milestones, totalPoints])

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('timeline-line', { x: 50, y: timelineY - 10, width: W - 100, height: 20 })

    const phaseCount = Math.max(1, phases.length)
    const phaseGap = 6
    const phaseTotalW = W - 100
    const phaseW = Math.floor((phaseTotalW - phaseGap * (phaseCount - 1)) / phaseCount)
    const phaseY = 440
    const phaseH = 55

    phases.forEach((_, i) => {
      const phaseX = 50 + i * (phaseW + phaseGap)
      map.set(`phase-${i}`, { x: phaseX, y: phaseY, width: phaseW, height: phaseH })
    })

    const tan20 = Math.tan((20 * Math.PI) / 180) // ~0.364 (20 degrees)

    allYears.forEach((_, ptIdx) => {
      const cx = startX + ptIdx * spacing
      const cy = timelineY
      map.set(`dot-${ptIdx}`, { x: cx - 12, y: cy - 12, width: 24, height: 24 })
      map.set(`year-${ptIdx}`, { x: cx - 40, y: cy + 24, width: 80, height: 30 })

      // Point 0 is origin date anchor without card
      if (ptIdx > 0) {
        const msIdx = ptIdx - 1
        // Alternating heights: first milestone (msIdx=0) low (35px), second (msIdx=1) high (145px)...
        const isTop = msIdx % 2 === 1
        const lineH = isTop ? 145 : 35
        const deltaX = Math.round(lineH * tan20) // Exact 20-degree offset for this height
        const cardW = 150
        const cardH = 50
        const lineY1 = cy - 12 - 25
        const lineY2 = lineY1 - lineH
        const lineX2 = cx - deltaX

        const cardX = lineX2 - cardW / 2
        const cardY = lineY2 - cardH

        map.set(`text-${msIdx}`, { x: cardX, y: cardY, width: cardW, height: cardH })
        map.set(`card-${msIdx}`, { x: cardX, y: cardY, width: cardW, height: cardH })
        map.set(`conn-${msIdx}`, {
          x: lineX2,
          y: lineY2,
          width: deltaX,
          height: lineH,
        })
      }
    })

    return map
  }, [allYears, spacing, phases, startX, timelineY])

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
  const timelineY2 = timelineLineR.y + timelineLineR.height / 2
  const activeDotR = getR(`dot-${progressIdx}`)
  const progressLineX = activeDotR.x + activeDotR.width / 2

  // MIGSO Red for active progress track
  const activeColor = trackColor || '#ff5338'
  // MIGSO Gray for inactive track and connector lines
  const inactiveColor = trackBgColor || '#d7d7d7'

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
        {/* Active MIGSO red segment from start up to progress dot */}
        <line
          x1={timelineLineR.x}
          y1={timelineY2}
          x2={progressLineX}
          y2={timelineY2}
          stroke={activeColor}
          strokeWidth={5}
          strokeLinecap="round"
        />
        {/* Inactive MIGSO gray segment from progress dot to end */}
        <line
          x1={progressLineX}
          y1={timelineY2}
          x2={timelineLineR.x + timelineLineR.width}
          y2={timelineY2}
          stroke={inactiveColor}
          strokeWidth={5}
          strokeLinecap="round"
        />
        {selectedIds.has('timeline-line') && renderHandles(timelineLineR, 'timeline-line')}
      </g>

      {/* Timeline Points: Point 0 (Prior Date) + Milestones */}
      {allYears.map((yr, ptIdx) => {
        const dotR = getR(`dot-${ptIdx}`)
        const yrR = getR(`year-${ptIdx}`)
        const dotCenterX = dotR.x + dotR.width / 2
        const dotCenterY = dotR.y + dotR.height / 2

        if (ptIdx === 0) {
          // Origin / Prior Date Point: Same color as Phase 1
          const originDotColor = phases[0]?.color || '#2c2b64'

          return (
            <g key="origin-point">
              {/* Origin Dot */}
              <g
                data-element-id="dot-0"
                onMouseDown={e => startDrag(e, 'dot-0', dotR)}
                transform={getTransform('dot-0', dotR)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={dotCenterX}
                  cy={dotCenterY}
                  r={Math.min(dotR.width, dotR.height) / 2}
                  fill={tplColors['dot-0'] || originDotColor}
                />
                {selectedIds.has('dot-0') && renderHandles(dotR, 'dot-0')}
              </g>

              {/* Origin Year Label */}
              <g
                data-element-id="year-0"
                onMouseDown={e => startDrag(e, 'year-0', yrR)}
                transform={getTransform('year-0', yrR)}
                style={{ cursor: 'pointer' }}
              >
                <text
                  x={yrR.x + yrR.width / 2}
                  y={yrR.y + yrR.height / 2 + 6}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={18}
                  fontWeight="bold"
                  fill={tplColors['year-0'] || originDotColor}
                >
                  {yr}
                </text>
                {selectedIds.has('year-0') && renderHandles(yrR, 'year-0')}
              </g>
            </g>
          )
        }

        // Milestone Point (ptIdx >= 1)
        const msIdx = ptIdx - 1
        const txtR = getR(`text-${msIdx}`)
        const ms = milestones[msIdx]

        const laneColor = ms?.lane
          ? (phases.find(p => p.label === ms.lane) || phases.find(p => p.label.startsWith(ms.lane!)))?.color
          : undefined
        const dotColor = laneColor || ms?.color || (ptIdx <= progressIdx ? (phases[0]?.color || '#2c2b64') : '#d7d7d7')

        const maxTitleChars = Math.max(8, Math.floor(txtR.width / 9.5))
        const maxSubChars = Math.max(10, Math.floor(txtR.width / 7.5))
        const titleLines = wrapTextByWidth(ms?.title || `Step ${msIdx + 1}`, maxTitleChars)
        const subLines = ms?.subtitle ? wrapTextByWidth(ms.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(ms?.icon, 16, dotColor)
        const cardBottomCenterX = txtR.x + txtR.width / 2
        const cardBottomCenterY = txtR.y + txtR.height

        const isTextSelected = selectedIds.has(`text-${msIdx}`) || selectedIds.has(`card-${msIdx}`)
        const dotRadius = Math.min(dotR.width, dotR.height) / 2
        const lineY1 = dotCenterY - dotRadius - 25

        return (
          <g key={`ms-${msIdx}`}>
            {/* Dynamic solid grey connector line (30-degree slanted, 5px MIGSO gray) */}
            <g data-element-id={`conn-${msIdx}`}>
              <line
                x1={dotCenterX}
                y1={lineY1}
                x2={cardBottomCenterX}
                y2={cardBottomCenterY}
                stroke={tplColors[`conn-${msIdx}`] || inactiveColor}
                strokeWidth={tplStrokeWidths[`conn-${msIdx}`] || 5}
                strokeLinecap="round"
              />
            </g>

            {/* Text Card with transparent background */}
            <g
              data-element-id={`text-${msIdx}`}
              onMouseDown={e => startDrag(e, `text-${msIdx}`, txtR)}
              transform={getTransform(`text-${msIdx}`, txtR)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={txtR.x}
                y={txtR.y}
                width={txtR.width}
                height={txtR.height}
                rx={6}
                fill={tplColors[`text-${msIdx}`] || 'none'}
                stroke={tplStrokeColors[`text-${msIdx}`] || (isTextSelected ? '#2196f3' : 'none')}
                strokeWidth={isTextSelected ? 2 : (tplStrokeWidths[`text-${msIdx}`] ?? 0)}
              />
              <g transform={`translate(${txtR.x + 4}, ${txtR.y + 14})`}>
                {iconEl && <g transform="translate(0, -8)">{iconEl}</g>}
                <text
                  x={iconEl ? 22 : 0}
                  y={0}
                  fontFamily="Arial, sans-serif"
                  fontSize={14}
                  fontWeight={700}
                  fill={tplColors[`text-${msIdx}`] ? '#ffffff' : '#2c2b64'}
                >
                  {titleLines.map((line, li) => (
                    <tspan key={li} x={iconEl ? 22 : 0} dy={li === 0 ? 0 : 16}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
              {subLines.length > 0 && (
                <text
                  x={txtR.x + 4}
                  y={txtR.y + 16 + titleLines.length * 16 + 4}
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fill="#2c2b64"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={txtR.x + 4} dy={li === 0 ? 0 : 14}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
              {isTextSelected && renderHandles(txtR, `text-${msIdx}`)}
            </g>

            {/* Timeline Dot */}
            <g
              data-element-id={`dot-${ptIdx}`}
              onMouseDown={e => startDrag(e, `dot-${ptIdx}`, dotR)}
              transform={getTransform(`dot-${ptIdx}`, dotR)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={dotCenterX}
                cy={dotCenterY}
                r={Math.min(dotR.width, dotR.height) / 2}
                fill={tplColors[`dot-${ptIdx}`] || dotColor}
              />
              {selectedIds.has(`dot-${ptIdx}`) && renderHandles(dotR, `dot-${ptIdx}`)}
            </g>

            {/* Year Label */}
            <g
              data-element-id={`year-${ptIdx}`}
              onMouseDown={e => startDrag(e, `year-${ptIdx}`, yrR)}
              transform={getTransform(`year-${ptIdx}`, yrR)}
              style={{ cursor: 'pointer' }}
            >
              <text
                x={yrR.x + yrR.width / 2}
                y={yrR.y + yrR.height / 2 + 6}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={18}
                fontWeight="bold"
                fill={tplColors[`year-${ptIdx}`] || '#2c2b64'}
              >
                {yr}
              </text>
              {selectedIds.has(`year-${ptIdx}`) && renderHandles(yrR, `year-${ptIdx}`)}
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
