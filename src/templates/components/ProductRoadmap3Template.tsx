import { useRef, type ReactElement } from 'react'
import type { ProductRoadmap3Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']

export function ProductRoadmap3Template({ data }: { data: ProductRoadmap3Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, quarters, milestones, lanes } = data
  const W = 1000
  const H = 640
  const topMargin = 50
  const headerHeight = 60
  const timelineY = topMargin + headerHeight
  const cardSpacing = 220
  const cardW = 160
  const cardH = 90
  const leftPad = 40

  const sortedMilestones = [...milestones].sort((a, b) => {
    const qiA = quarters.findIndex(q => q.label === a.quarter)
    const qiB = quarters.findIndex(q => q.label === b.quarter)
    return qiA - qiB
  })

  const quarterGroups = new Map<string, (typeof sortedMilestones)[number][]>()
  for (const m of sortedMilestones) {
    const q = m.quarter ?? '?'
    if (!quarterGroups.has(q)) quarterGroups.set(q, [])
    quarterGroups.get(q)!.push(m)
  }

  const totalCards = sortedMilestones.length
  const totalWidth = totalCards * cardSpacing + leftPad * 2
  const startX = Math.max(leftPad, (W - totalWidth) / 2 + leftPad)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={28} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill="#1a1a2e">
          {title}
        </text>
      )}

      {quarters.map((quarter, qi) => {
        const qKey = quarter.label
        const qMs = sortedMilestones.filter(m => m.quarter === qKey)
        const firstIdx = sortedMilestones.findIndex(m => m.quarter === qKey)
        const lastIdx = firstIdx + qMs.length - 1
        if (qMs.length === 0) return null

        const qStartX = startX + firstIdx * cardSpacing - 10
        const qEndX = startX + lastIdx * cardSpacing + cardW + 10
        const qWidth = qEndX - qStartX
        const color = PALETTE[qi % PALETTE.length]

        return (
          <g key={`q-group-${qKey}`}>
            <rect x={qStartX} y={topMargin} width={qWidth} height={headerHeight} rx={8} fill={color} opacity={0.1} stroke={color} strokeWidth={1.5} />
            <text x={qStartX + qWidth / 2} y={topMargin + headerHeight / 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={color}>
              {qKey} {quarter.year ? quarter.year : ''}
            </text>
          </g>
        )
      })}

      <line x1={startX} y1={timelineY + 30} x2={startX + (totalCards - 1) * cardSpacing + cardW} y2={timelineY + 30} stroke="#c0c8d0" strokeWidth={2} />

      {sortedMilestones.map((milestone, mi) => {
        const elementId = `milestone-${mi}`
        const qi = quarters.findIndex(q => q.label === milestone.quarter)
        const color = tplColors[elementId] ?? PALETTE[qi >= 0 ? qi % PALETTE.length : mi % PALETTE.length]
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const cardX = startX + mi * cardSpacing
        const cardY = topMargin + headerHeight + 20
        const visualRect = { x: cardX, y: cardY, width: cardW, height: cardH }

        const laneColor = lanes.find(l => l.label === milestone.lane)
          ? PALETTE[lanes.findIndex(l => l.label === milestone.lane) % PALETTE.length]
          : color

        return (
          <g key={`m-${mi}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={cardX} y={cardY} width={cardW} height={cardH} rx={8} fill="#fff" stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 2.5 : 1} />
              <rect x={cardX} y={cardY} width={cardW} height={32} rx={8} fill={color} opacity={0.15} />
              <rect x={cardX} y={cardY + 24} width={cardW} height={8} fill={color} opacity={0.15} />
              <rect x={cardX + 4} y={cardY + 3} width={4} height={26} rx={2} fill={laneColor} />
              <text x={cardX + 14} y={cardY + 20} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                {milestone.title.length > 18 ? milestone.title.slice(0, 16) + '...' : milestone.title}
              </text>
              {milestone.subtitle && (
                <text x={cardX + cardW / 2} y={cardY + 52} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#666">
                  {milestone.subtitle.length > 24 ? milestone.subtitle.slice(0, 22) + '...' : milestone.subtitle}
                </text>
              )}
              <text x={cardX + cardW / 2} y={cardY + 72} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={8} fill="#aaa">
                {milestone.lane ?? ''}  ·  {milestone.quarter ?? ''}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {totalCards > 0 && [...Array(totalCards)].map((_, i) => {
        const cx = startX + i * cardSpacing + cardW / 2
        return (
          <g key={`dot-${i}`}>
            <circle cx={cx} cy={timelineY + 30} r={5} fill={PALETTE[sortedMilestones[i] ? quarters.findIndex(q => q.label === sortedMilestones[i]!.quarter) % PALETTE.length : i % PALETTE.length]} />
            <circle cx={cx} cy={timelineY + 30} r={2.5} fill="#fff" />
          </g>
        )
      })}
    </g>
  )
}
