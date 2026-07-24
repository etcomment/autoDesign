import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const PALETTE = ['#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']

export function ProductRoadmapTemplate({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, quarters, lanes, milestones } = data
  const W = 1000
  const H = 600
  const leftMargin = 140
  const topMargin = 100
  const rightPadding = 24
  const bottomPadding = 24

  const gridLeft = leftMargin
  const gridTop = topMargin
  const gridWidth = W - leftMargin - rightPadding
  const gridHeight = H - topMargin - bottomPadding
  const colWidth = gridWidth / quarters.length
  const rowHeight = gridHeight / lanes.length

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {quarters.map((quarter, qi) => {
        const colX = gridLeft + qi * colWidth
        return (
          <g key={quarter.label}>
            <rect x={colX} y={gridTop} width={colWidth} height={40} rx={6} fill="#f0f4f8" stroke="#d0d7de" strokeWidth={1} />
            <text x={colX + colWidth / 2} y={gridTop + 17} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#333">
              {quarter.label}
            </text>
            {quarter.year && (
              <text x={colX + colWidth / 2} y={gridTop + 31} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#888">
                {quarter.year}
              </text>
            )}
          </g>
        )
      })}

      {lanes.map((lane, li) => {
        const rowY = gridTop + 40 + li * rowHeight
        return (
          <g key={lane.label}>
            <rect x={16} y={rowY} width={leftMargin - 16 - 12} height={rowHeight} rx={6} fill="#f8f9fa" stroke="#e0e0e0" strokeWidth={1} />
            <text x={16 + (leftMargin - 28) / 2} y={rowY + rowHeight / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#444">
              {lane.label}
            </text>

            {quarters.map((quarter, qi) => {
              const colX = gridLeft + qi * colWidth
              return (
                <rect
                  key={`${lane.label}-${quarter.label}`}
                  x={colX}
                  y={rowY}
                  width={colWidth}
                  height={rowHeight}
                  fill="none"
                  stroke="#e8ecf0"
                  strokeWidth={1}
                />
              )
            })}
          </g>
        )
      })}

      {milestones.map((milestone, mi) => {
        const quarterIndex = quarters.findIndex(q => q.label === milestone.quarter)
        const laneIndex = lanes.findIndex(l => l.label === milestone.lane)
        if (quarterIndex < 0 || laneIndex < 0) return null

        const elementId = `milestone-${mi}`
        const color = tplColors[elementId] ?? PALETTE[mi % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const cellX = gridLeft + quarterIndex * colWidth
        const cellY = gridTop + 40 + laneIndex * rowHeight
        const padding = 12
        const badgeW = colWidth - padding * 2
        const badgeH = 38
        const badgeX = cellX + padding
        const badgeY = cellY + (rowHeight - badgeH) / 2
        const visualRect = { x: badgeX, y: badgeY, width: badgeW, height: badgeH }

        return (
          <g key={`${milestone.quarter}-${milestone.lane}-${milestone.title}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={badgeX} y={badgeY} width={badgeW} height={badgeH} rx={6} fill={color} opacity={isSelected ? 0.2 : 0.12} />
              <rect x={badgeX} y={badgeY} width={4} height={badgeH} fill={color} rx={2} />
              <rect x={badgeX} y={badgeY} width={badgeW} height={badgeH} rx={6} fill="none" stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 2.5 : 1} opacity={isSelected ? 1 : 0.4} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={badgeX + 14} y={badgeY + badgeH / 2 + 4} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill={color}>
                {milestone.title.length > 22 ? milestone.title.slice(0, 20) + '...' : milestone.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
