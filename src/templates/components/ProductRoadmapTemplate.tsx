import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']

export function ProductRoadmapTemplate({ data }: { data: ProductRoadmapData }): ReactElement {
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

      {(() => {
        const r = pos['main-title'] ?? { x: W / 2 - 200, y: 18, width: 400, height: 30 }
        const fill = (typeof tplColors !== 'undefined' && tplColors['main-title']) ? tplColors['main-title'] : '#222'
        const stroke = (typeof tplStrokeColors !== 'undefined') ? tplStrokeColors['main-title'] : undefined
        const sW = (typeof tplStrokeWidths !== 'undefined' && tplStrokeWidths['main-title']) ? tplStrokeWidths['main-title'] : 1
        return title ? (
          <g onMouseDown={e => startDrag(e, 'main-title', r)} style={{ cursor: 'pointer' }}>
            {title.split('\n').map((line, i) => (
              <text key={i} x={r.x + r.width / 2} y={r.y + 24 + i * 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill={fill} stroke={stroke} strokeWidth={stroke ? sW : undefined}>
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
        const defaultQRect = { x: colX, y: gridTop, width: colWidth, height: 40 }
        const qRect = pos[qId] ?? defaultQRect
        const qColor = tplColors[qId] ?? '#f0f4f8'
        const qStroke = tplStrokeColors[qId] ?? (selectedIds.has(qId) ? '#4a90d9' : '#d0d7de')
        const qStrokeWidth = tplStrokeWidths[qId] ?? (selectedIds.has(qId) ? 2.5 : 1)
        const isSelected = selectedIds.has(qId)

        return (
          <g key={quarter.label} onMouseDown={e => startDrag(e, qId, qRect)} style={{ cursor: 'pointer' }}>
            <rect x={qRect.x} y={qRect.y} width={qRect.width} height={qRect.height} rx={6} fill={qColor} stroke={qStroke} strokeWidth={qStrokeWidth} />
            <text x={qRect.x + qRect.width / 2} y={qRect.y + 17} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#333">
              {quarter.label}
            </text>
            {quarter.year && (
              <text x={qRect.x + qRect.width / 2} y={qRect.y + 31} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#888">
                {quarter.year}
              </text>
            )}
            {isSelected && renderHandles(qRect, qId)}
          </g>
        )
      })}

      {lanes.map((lane, li) => {
        const rowY = gridTop + 40 + li * rowHeight
        const lId = `lane-${li}`
        const defaultLRect = { x: 16, y: rowY, width: leftMargin - 28, height: rowHeight }
        const lRect = pos[lId] ?? defaultLRect
        const lColor = tplColors[lId] ?? '#f8f9fa'
        const lStroke = tplStrokeColors[lId] ?? (selectedIds.has(lId) ? '#4a90d9' : '#e0e0e0')
        const lStrokeWidth = tplStrokeWidths[lId] ?? (selectedIds.has(lId) ? 2.5 : 1)
        const isSelected = selectedIds.has(lId)

        return (
          <g key={lane.label}>
            <g onMouseDown={e => startDrag(e, lId, lRect)} style={{ cursor: 'pointer' }}>
              <rect x={lRect.x} y={lRect.y} width={lRect.width} height={lRect.height} rx={6} fill={lColor} stroke={lStroke} strokeWidth={lStrokeWidth} />
              <text x={lRect.x + lRect.width / 2} y={lRect.y + lRect.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#444">
                {lane.label}
              </text>
              {isSelected && renderHandles(lRect, lId)}
            </g>

            {quarters.map((quarter, qi) => {
              const colX = gridLeft + qi * colWidth
              const id = `bg-rect-${li}-${qi}`
              const defaultR = { x: colX, y: rowY, width: colWidth, height: rowHeight }
              const r = pos[id] ?? defaultR
              return (
                <g key={`${lane.label}-${quarter.label}`} onMouseDown={e => startDrag(e, id, r)} style={{ cursor: 'pointer' }}>
                  <rect
                    x={r.x}
                    y={r.y}
                    width={r.width}
                    height={r.height}
                    fill={tplColors[id] ?? "none"}
                    stroke={tplStrokeColors[id] ?? "#e8ecf0"}
                    strokeWidth={tplStrokeWidths[id] ?? 1}
                  />
                  {selectedIds.has(id) && renderHandles(r, id)}
                </g>
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
        const color = tplColors[elementId] ?? milestone.style?.fill ?? PALETTE[mi % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : (milestone.style?.stroke || color))
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1)
        const isSelected = selectedIds.has(elementId)
        const cellX = gridLeft + quarterIndex * colWidth
        const cellY = gridTop + 40 + laneIndex * rowHeight
        const padding = 12
        const badgeW = milestone.style?.boxWidth ?? (colWidth - padding * 2)
        const badgeH = milestone.style?.boxHeight ?? 38
        const badgeX = cellX + padding
        const badgeY = cellY + (rowHeight - badgeH) / 2
        const _defaultRect = { x: badgeX, y: badgeY, width: badgeW, height: badgeH }
        const visualRect = (typeof pos !== 'undefined' && pos[elementId]) ? pos[elementId] : _defaultRect
        const rX = visualRect.x; const rY = visualRect.y; const rW = visualRect.width; const rH = visualRect.height;
        const styleFontSize = milestone.style?.fontSize ?? 10
        const styleFontWeight = milestone.style?.fontWeight ?? 600
        const styleFontColor = milestone.style?.fontColor ?? color

        return (
          <g key={`${milestone.quarter}-${milestone.lane}-${milestone.title}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={rX} y={rY} width={rW} height={rH} rx={6} fill={color} opacity={isSelected ? 0.2 : 0.12} />
              <rect x={rX} y={rY} width={4} height={rH} fill={color} rx={2} />
              <rect x={rX} y={rY} width={rW} height={rH} rx={6} fill="none" stroke={stroke} strokeWidth={strokeWidth} opacity={isSelected ? 1 : 0.4} strokeDasharray={isSelected ? '4 2' : undefined} />
              {milestone.title.split('\n').map((line, li) => (<text x={rX + 14} key={li} y={rY + rH / 2 + 4 + li * 12 - ((milestone.title.split('\\n').length - 1) * 6)} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>{line}</text>))}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
