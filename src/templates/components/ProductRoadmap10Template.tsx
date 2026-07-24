import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function ProductRoadmap10Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, quarters, lanes, milestones } = data
  const W = 960
  const H = title ? 540 : 500
  const marginX = 140
  const topY = title ? 110 : 70
  const colW = (W - marginX) / Math.max(quarters.length, 1)
  const rowH = 56
  const labelW = 120

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {quarters.map((q, qi) => (
        <text key={`qh-${qi}`} x={marginX + qi * colW + colW / 2} y={topY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#888">
          {q.label} {q.year ?? ''}
        </text>
      ))}
      {quarters.map((_, qi) => (
        <line key={`vl-${qi}`} x1={marginX + qi * colW} y1={topY + 6} x2={marginX + qi * colW} y2={topY + 6 + lanes.length * rowH} stroke="#e2e8f0" strokeWidth={1} />
      ))}

      {lanes.map((lane, li) => {
        const laneY = topY + 20 + li * rowH
        const teamColor = PALETTE[li % PALETTE.length]!

        return (
          <g key={`lane-${li}`}>
            <rect x={4} y={laneY} width={labelW - 8} height={rowH - 6} rx={6} fill={teamColor} opacity={0.85} />
            <text x={labelW / 2 - 8} y={laneY + rowH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
              {lane.label}
            </text>
            <line x1={marginX} y1={laneY + rowH / 2} x2={W - 8} y2={laneY + rowH / 2} stroke="#e2e8f0" strokeWidth={1} />
          </g>
        )
      })}

      {milestones.map((m, mi) => {
        const elementId = `bar-${mi}`
        const li = lanes.findIndex(l => l.label === m.lane)
        const qi = quarters.findIndex(q => q.label === m.quarter)
        if (li < 0 || qi < 0) return null
        const color = tplColors[elementId] ?? PALETTE[mi % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const laneY = topY + 20 + li * rowH
        const barX = marginX + qi * colW + 4
        const barW = colW - 8
        const barH = rowH - 12
        const barY = laneY + 6
        const visualRect = { x: barX, y: barY, width: barW, height: barH }

        return (
          <g key={`bar-${mi}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={barX} y={barY} width={barW} height={barH} rx={6} fill={color} opacity={isSelected ? 0.9 : 0.75} stroke={isSelected ? '#333' : color} strokeWidth={isSelected ? 1.5 : 1} />
              <text x={barX + barW / 2} y={barY + barH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                {m.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
