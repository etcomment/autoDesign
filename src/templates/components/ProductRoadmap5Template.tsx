import { useRef, type ReactElement } from 'react'
import type { ProductRoadmap5Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']

export function ProductRoadmap5Template({ data }: { data: ProductRoadmap5Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, quarters, milestones } = data
  const W = 1040
  const H = 600
  const timelineY = H / 2
  const cardW = 180
  const cardH = 90

  const sorted = [...milestones].sort((a, b) => {
    const qiA = quarters.findIndex(q => q.label === a.quarter)
    const qiB = quarters.findIndex(q => q.label === b.quarter)
    return qiA - qiB
  })

  if (sorted.length === 0) {
    return (
      <g ref={svgRef}>
        <rect width={W} height={H} fill="white" rx={8} />
        {title && <text x={W / 2} y={36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill="#1a1a2e">{title}</text>}
      </g>
    )
  }

  const spacing = Math.min(260, (W - 80) / sorted.length)
  const startX = 60 + Math.max(0, (W - 80 - sorted.length * spacing) / 2)

  const quarterBoundaries: Array<{ qi: number; x: number; label: string; color: string }> = []
  let lastQi = -1
  for (let i = 0; i < sorted.length; i++) {
    const qi = quarters.findIndex(q => q.label === sorted[i]!.quarter)
    if (qi !== lastQi && qi >= 0) {
      quarterBoundaries.push({
        qi,
        x: startX + i * spacing,
        label: quarters[qi]!.label,
        color: PALETTE[qi % PALETTE.length]!,
      })
      lastQi = qi
    }
  }

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={34} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill="#1a1a2e">
          {title}
        </text>
      )}

      {quarterBoundaries.map((qb, bi) => {
        const nextX = bi < quarterBoundaries.length - 1
          ? quarterBoundaries[bi + 1]!.x
          : startX + sorted.length * spacing
        const qW = nextX - qb.x
        return (
          <g key={`qb-${bi}`}>
            <rect x={qb.x} y={60} width={qW} height={40} rx={6} fill={qb.color} opacity={0.12} />
            <text x={qb.x + qW / 2} y={85} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill={qb.color}>
              {qb.label}
            </text>
          </g>
        )
      })}

      <line x1={startX} y1={timelineY} x2={startX + (sorted.length - 1) * spacing} y2={timelineY} stroke="#b0b8c0" strokeWidth={3} strokeLinecap="round" />

      {sorted.map((milestone, mi) => {
        const elementId = `milestone-${mi}`
        const qi = quarters.findIndex(q => q.label === milestone.quarter)
        const color = tplColors[elementId] ?? (PALETTE as string[])[qi >= 0 ? qi % PALETTE.length : mi % PALETTE.length]
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const isAbove = mi % 2 === 0
        const cx = startX + mi * spacing
        const cardX = cx - cardW / 2
        const cardY = isAbove ? timelineY - cardH - 30 : timelineY + 30
        const visualRect = { x: cardX, y: cardY, width: cardW, height: cardH }

        return (
          <g key={`m-${mi}`}>
            <line x1={cx} y1={isAbove ? cardY + cardH : timelineY} x2={cx} y2={isAbove ? timelineY - 8 : cardY} stroke={color} strokeWidth={1.5} strokeDasharray="3 3" />
            <circle cx={cx} cy={timelineY} r={10} fill={color} />
            <circle cx={cx} cy={timelineY} r={5} fill="#fff" />
            <text x={cx} y={timelineY + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={8} fontWeight={700} fill={color}>
              {mi + 1}
            </text>

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={cardX} y={cardY} width={cardW} height={cardH} rx={8} fill="#fff" stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 2.5 : 1} />
              <rect x={cardX} y={cardY} width={cardW} height={28} rx={8} fill={color} />
              <rect x={cardX} y={cardY + 20} width={cardW} height={8} fill={color} />
              <text x={cardX + cardW / 2} y={cardY + 19} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#fff">
                {milestone.title.length > 18 ? milestone.title.slice(0, 16) + '...' : milestone.title}
              </text>
              {milestone.subtitle && (
                <text x={cardX + cardW / 2} y={cardY + 50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#666">
                  {milestone.subtitle.length > 24 ? milestone.subtitle.slice(0, 22) + '...' : milestone.subtitle}
                </text>
              )}
              <text x={cardX + cardW / 2} y={cardY + 72} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={8} fill="#aaa">
                {milestone.quarter ?? ''} {milestone.lane ? ` · ${milestone.lane}` : ''}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
