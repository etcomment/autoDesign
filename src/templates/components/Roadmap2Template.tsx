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

  const years = useMemo(() => {
    if (milestones.length > 0 && milestones.some(ms => ms.date)) {
      return milestones.map((ms, i) => ms.date ?? String(2022 + i))
    }
    if (quarters && quarters.length > 0) {
      return quarters.map(q => q.label)
    }
    return ['2022', '2023', '2024', '2025', '2026']
  }, [milestones, quarters])

  const N = Math.max(1, years.length)
  const startX = N <= 5 ? 140 : 80
  const spacing = Math.min(170, (W - startX * 2) / Math.max(N - 1, 1))
  const timelineY = 320

  const progressIdx = useMemo(() => {
    const target = current || progress
    if (target) {
      const targetStr = String(target).trim().toLowerCase()
      const foundYear = years.findIndex(y => y.toLowerCase() === targetStr)
      if (foundYear >= 0) return foundYear

      const foundMs = milestones.findIndex(
        m => m.title?.toLowerCase() === targetStr || m.date?.toLowerCase() === targetStr
      )
      if (foundMs >= 0) return foundMs

      const asNum = Number(target)
      if (!isNaN(asNum) && asNum >= 0 && asNum < N) return asNum
    }
    return Math.floor(N / 2)
  }, [current, progress, years, milestones, N])

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

    const tan30 = Math.tan((30 * Math.PI) / 180) // ~0.577

    years.forEach((_, i) => {
      const cx = startX + i * spacing
      const cy = timelineY
      map.set(`dot-${i}`, { x: cx - 12, y: cy - 12, width: 24, height: 24 })
      map.set(`year-${i}`, { x: cx - 40, y: cy + 24, width: 80, height: 30 })

      // Alternating heights: first low (i=0), second high (i=1), third low...
      const isTop = i % 2 === 1
      const connH = isTop ? 145 : 85
      const deltaX = Math.round(connH * tan30) // 30-degree offset to the left
      const cardW = 150
      const cardH = 80
      const cardX = cx - deltaX - cardW / 2
      const cardY = cy - 12 - connH - cardH - 15

      map.set(`text-${i}`, { x: cardX, y: cardY, width: cardW, height: cardH })
      map.set(`card-${i}`, { x: cardX, y: cardY, width: cardW, height: cardH })
      map.set(`conn-${i}`, {
        x: cx - deltaX,
        y: cy - 12 - connH - 15,
        width: deltaX,
        height: connH,
      })
    })

    return map
  }, [years, spacing, phases, startX, timelineY, N])

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

  const activeColor = trackColor || '#23255a'
  const inactiveColor = trackBgColor || '#d9dee4'

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
        {/* Active segment from start up to progress dot */}
        <line
          x1={timelineLineR.x}
          y1={timelineY2}
          x2={progressLineX}
          y2={timelineY2}
          stroke={activeColor}
          strokeWidth={6}
          strokeLinecap="round"
        />
        {/* Inactive segment from progress dot to end */}
        <line
          x1={progressLineX}
          y1={timelineY2}
          x2={timelineLineR.x + timelineLineR.width}
          y2={timelineY2}
          stroke={inactiveColor}
          strokeWidth={6}
          strokeLinecap="round"
        />
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
        const dotColor = laneColor || ms?.color || (i <= progressIdx ? '#23255a' : '#a0aec0')

        const maxTitleChars = Math.max(8, Math.floor(txtR.width / 9.5))
        const maxSubChars = Math.max(10, Math.floor(txtR.width / 7.5))
        const titleLines = wrapTextByWidth(ms?.title || `Step ${i + 1}`, maxTitleChars)
        const subLines = ms?.subtitle ? wrapTextByWidth(ms.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(ms?.icon, 16, dotColor)

        const dotCenterX = dotR.x + dotR.width / 2
        const dotCenterY = dotR.y + dotR.height / 2
        const cardBottomCenterX = txtR.x + txtR.width / 2
        const cardBottomCenterY = txtR.y + txtR.height

        const isTextSelected = selectedIds.has(`text-${i}`) || selectedIds.has(`card-${i}`)

        return (
          <g key={i}>
            {/* Dynamic solid grey connector line (30-degree slanted, matching middle track thickness) */}
            <g data-element-id={`conn-${i}`}>
              <line
                x1={dotCenterX}
                y1={dotCenterY - dotR.height / 2 - 25}
                x2={cardBottomCenterX}
                y2={cardBottomCenterY}
                stroke={tplColors[`conn-${i}`] || inactiveColor}
                strokeWidth={tplStrokeWidths[`conn-${i}`] || 6}
                strokeLinecap="round"
              />
            </g>

            {/* Text Card with transparent background & solid layout */}
            <g
              data-element-id={`text-${i}`}
              onMouseDown={e => startDrag(e, `text-${i}`, txtR)}
              transform={getTransform(`text-${i}`, txtR)}
              style={{ cursor: 'pointer' }}
            >
              {/* Card Container (Transparent background) */}
              <rect
                x={txtR.x}
                y={txtR.y}
                width={txtR.width}
                height={txtR.height}
                rx={6}
                fill={tplColors[`text-${i}`] || 'none'}
                stroke={tplStrokeColors[`text-${i}`] || (isTextSelected ? '#2196f3' : 'none')}
                strokeWidth={isTextSelected ? 2 : (tplStrokeWidths[`text-${i}`] ?? 0)}
              />
              <g transform={`translate(${txtR.x + 4}, ${txtR.y + 14})`}>
                {iconEl && <g transform="translate(0, -8)">{iconEl}</g>}
                <text
                  x={iconEl ? 22 : 0}
                  y={0}
                  fontFamily="Arial, sans-serif"
                  fontSize={14}
                  fontWeight={700}
                  fill={tplColors[`text-${i}`] ? '#ffffff' : '#23255a'}
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
                  fill="#555555"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={txtR.x + 4} dy={li === 0 ? 0 : 14}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
              {isTextSelected && renderHandles(txtR, `text-${i}`)}
            </g>

            {/* Timeline Dot */}
            <g
              data-element-id={`dot-${i}`}
              onMouseDown={e => startDrag(e, `dot-${i}`, dotR)}
              transform={getTransform(`dot-${i}`, dotR)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={dotCenterX}
                cy={dotCenterY}
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
                fill={tplColors[`year-${i}`] || (i <= progressIdx ? '#23255a' : '#888888')}
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
