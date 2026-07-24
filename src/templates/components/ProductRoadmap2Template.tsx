import { useRef, type ReactElement } from 'react'
import type { ProductRoadmap2Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']

const LANE_BG = ['#e8f4fd', '#eaf7e9', '#fef3e2', '#f5eefa', '#fde8ec', '#e0f7fa']

export function ProductRoadmap2Template({ data }: { data: ProductRoadmap2Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, quarters, lanes, milestones } = data
  const W = 1000
  const H = 580
  const leftMargin = 150
  const topMargin = 90
  const rightPadding = 20
  const bottomPadding = 20
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
        <text x={W / 2} y={36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill="#1a1a2e">
          {title}
        </text>
      )}

      {quarters.map((quarter, qi) => {
        const colX = gridLeft + qi * colWidth
        return (
          <g key={quarter.label}>
            <rect x={colX} y={gridTop} width={colWidth} height={36} rx={4} fill={PALETTE[qi % PALETTE.length]} opacity={0.15} />
            <text x={colX + colWidth / 2} y={gridTop + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={PALETTE[qi % PALETTE.length]}>
              {quarter.label}
            </text>
            {quarter.year && (
              <text x={colX + colWidth / 2} y={gridTop + 29} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#888">
                {quarter.year}
              </text>
            )}
          </g>
        )
      })}

      {lanes.map((lane, li) => {
        const rowY = gridTop + 36 + li * rowHeight
        const laneColor = PALETTE[li % PALETTE.length]
        return (
          <g key={lane.label}>
            <rect x={gridLeft} y={rowY} width={gridWidth} height={rowHeight} fill={LANE_BG[li % LANE_BG.length]} rx={2} />
            <rect x={0} y={rowY} width={4} height={rowHeight} fill={laneColor} rx={2} />
            <rect x={8} y={rowY + 4} width={leftMargin - 20} height={rowHeight - 8} rx={6} fill={laneColor} opacity={0.9} />
            <text
              x={8 + (leftMargin - 20) / 2}
              y={rowY + rowHeight / 2 + 4}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={11}
              fontWeight={600}
              fill="#fff"
            >
              {lane.label}
            </text>

            {quarters.map((_q, qi) => (
              <line
                key={`grid-${li}-${qi}`}
                x1={gridLeft + qi * colWidth}
                y1={rowY}
                x2={gridLeft + qi * colWidth}
                y2={rowY + rowHeight}
                stroke="#d0d7de"
                strokeWidth={0.5}
              />
            ))}
            <line x1={gridLeft} y1={rowY} x2={gridLeft + gridWidth} y2={rowY} stroke="#c0c8d0" strokeWidth={1} />
          </g>
        )
      })}

      {milestones.map((milestone, mi) => {
        const quarterIndex = quarters.findIndex(q => q.label === milestone.quarter)
        const laneIndex = lanes.findIndex(l => l.label === milestone.lane)
        if (quarterIndex < 0 || laneIndex < 0) return null

        const elementId = `milestone-${mi}`
        const color = tplColors[elementId] ?? PALETTE[mi % PALETTE.length]
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const cellX = gridLeft + quarterIndex * colWidth
        const cellY = gridTop + 36 + laneIndex * rowHeight
        const padding = 10
        const badgeW = colWidth - padding * 2
        const badgeH = 30
        const badgeX = cellX + padding
        const badgeY = cellY + (rowHeight - badgeH) / 2
        const visualRect = { x: badgeX, y: badgeY, width: badgeW, height: badgeH }

        const label = milestone.title.length > 20 ? milestone.title.slice(0, 18) + '...' : milestone.title

        return (
          <g key={`m-${mi}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={badgeX} y={badgeY} width={badgeW} height={badgeH} rx={4} fill={color} opacity={0.85} />
              <text x={badgeX + badgeW / 2} y={badgeY + badgeH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#fff">
                {label}
              </text>
              <rect x={badgeX} y={badgeY} width={badgeW} height={badgeH} rx={4} fill="none" stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 2.5 : 1} opacity={isSelected ? 1 : 0.6} strokeDasharray={isSelected ? '4 2' : undefined} />
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
