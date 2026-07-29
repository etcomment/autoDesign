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
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

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
      {(() => {
        const r = pos['main-title'] ?? { x: W / 2 - 250, y: 15, width: 500, height: 35 }
        const fill = tplColors['main-title'] ?? '#1a1a2e'
        const stroke = tplStrokeColors['main-title']
        const sW = tplStrokeWidths['main-title'] ?? 1
        return title ? (
          <g onMouseDown={e => startDrag(e, 'main-title', r)} style={{ cursor: 'pointer' }}>
            {title.split('\n').map((line, i) => (
              <text key={i} x={r.x + r.width / 2} y={r.y + 24 + i * 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill={fill} stroke={stroke} strokeWidth={stroke ? sW : undefined}>
                {line}
              </text>
            ))}
            {selectedIds.has('main-title') && renderHandles(r, 'main-title')}
          </g>
        ) : null
      })()}

      {quarters.map((quarter, qi) => {
        const colX = gridLeft + qi * colWidth
        const qId = `quarter-${qi}`
        const defaultQRect = { x: colX, y: gridTop, width: colWidth, height: 36 }
        const qRect = pos[qId] ?? defaultQRect
        const defaultColor = PALETTE[qi % PALETTE.length]!
        const qColor = tplColors[qId] ?? defaultColor
        const qStroke = tplStrokeColors[qId] ?? (selectedIds.has(qId) ? '#4a90d9' : 'none')
        const qStrokeWidth = tplStrokeWidths[qId] ?? (selectedIds.has(qId) ? 2.5 : 1)
        const isSelected = selectedIds.has(qId)

        return (
          <g key={quarter.label} onMouseDown={e => startDrag(e, qId, qRect)} style={{ cursor: 'pointer' }}>
            <rect x={qRect.x} y={qRect.y} width={qRect.width} height={qRect.height} rx={4} fill={qColor} opacity={0.15} stroke={qStroke} strokeWidth={qStrokeWidth} />
            <text x={qRect.x + qRect.width / 2} y={qRect.y + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={qColor}>
              {quarter.label}
            </text>
            {quarter.year && (
              <text x={qRect.x + qRect.width / 2} y={qRect.y + 29} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#888">
                {quarter.year}
              </text>
            )}
            {isSelected && renderHandles(qRect, qId)}
          </g>
        )
      })}

      {lanes.map((lane, li) => {
        const rowY = gridTop + 36 + li * rowHeight
        const lId = `lane-${li}`
        const defaultLRect = { x: 8, y: rowY + 4, width: leftMargin - 20, height: rowHeight - 8 }
        const lRect = pos[lId] ?? defaultLRect
        const defaultLaneColor = PALETTE[li % PALETTE.length]!
        const laneColor = tplColors[lId] ?? defaultLaneColor
        const lStroke = tplStrokeColors[lId] ?? (selectedIds.has(lId) ? '#4a90d9' : 'none')
        const lStrokeWidth = tplStrokeWidths[lId] ?? (selectedIds.has(lId) ? 2.5 : 1)
        const isSelected = selectedIds.has(lId)

        return (
          <g key={lane.label}>
            <rect x={gridLeft} y={rowY} width={gridWidth} height={rowHeight} fill={LANE_BG[li % LANE_BG.length]} rx={2} />
            <rect x={0} y={rowY} width={4} height={rowHeight} fill={laneColor} rx={2} />
            <g onMouseDown={e => startDrag(e, lId, lRect)} style={{ cursor: 'pointer' }}>
              <rect x={lRect.x} y={lRect.y} width={lRect.width} height={lRect.height} rx={6} fill={laneColor} opacity={0.9} stroke={lStroke} strokeWidth={lStrokeWidth} />
              <text
                x={lRect.x + lRect.width / 2}
                y={lRect.y + lRect.height / 2 + 4}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={11}
                fontWeight={600}
                fill="#fff"
              >
                {lane.label}
              </text>
              {isSelected && renderHandles(lRect, lId)}
            </g>

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
        const color = tplColors[elementId] ?? milestone.style?.fill ?? PALETTE[mi % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : (milestone.style?.stroke || color))
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1)
        const isSelected = selectedIds.has(elementId)
        const cellX = gridLeft + quarterIndex * colWidth
        const cellY = gridTop + 36 + laneIndex * rowHeight
        const padding = 10
        const badgeW = milestone.style?.boxWidth ?? (colWidth - padding * 2)
        const badgeH = milestone.style?.boxHeight ?? 30
        const badgeX = cellX + padding
        const badgeY = cellY + (rowHeight - badgeH) / 2
        const _defaultRect = { x: badgeX, y: badgeY, width: badgeW, height: badgeH }
        const visualRect = (typeof pos !== 'undefined' && pos[elementId]) ? pos[elementId] : _defaultRect
        const rX = visualRect.x; const rY = visualRect.y; const rW = visualRect.width; const rH = visualRect.height;

        const label = milestone.title.length > 20 ? milestone.title.slice(0, 18) + '...' : milestone.title
        const styleFontSize = milestone.style?.fontSize ?? 10
        const styleFontWeight = milestone.style?.fontWeight ?? 600
        const styleFontColor = milestone.style?.fontColor ?? '#fff'

        return (
          <g key={`m-${mi}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={rX} y={rY} width={rW} height={rH} rx={4} fill={color} opacity={0.85} />
              <text x={rX + rW / 2} y={rY + rH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>
                {label}
              </text>
              <rect x={rX} y={rY} width={rW} height={rH} rx={4} fill="none" stroke={stroke} strokeWidth={strokeWidth} opacity={isSelected ? 1 : 0.6} strokeDasharray={isSelected ? '4 2' : undefined} />
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
