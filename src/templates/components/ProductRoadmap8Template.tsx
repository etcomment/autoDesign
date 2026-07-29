import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE, TITLE_COLOR } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function ProductRoadmap8Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, lanes, milestones } = data
  const W = 960
  const marginX = 120
  const topY = title ? 110 : 70
  const monthW = (W - marginX) / 12
  const rowH = 52
  const labelW = 100

  return (
    <g ref={svgRef}>
      {(() => {
        const r = pos['main-title'] ?? { x: W / 2 - 250, y: 15, width: 500, height: 35 }
        const fill = tplColors['main-title'] ?? TITLE_COLOR
        const stroke = tplStrokeColors['main-title']
        const sW = tplStrokeWidths['main-title'] ?? 1
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

      {MONTHS.map((m, mi) => {
        const id = `month-${mi}`
        const defaultR = { x: marginX + mi * monthW, y: topY - 5, width: monthW, height: 20 }
        const r = pos[id] ?? defaultR
        return (
          <g key={id} onMouseDown={e => startDrag(e, id, r)} style={{ cursor: 'pointer' }}>
            <text x={r.x + r.width / 2} y={r.y + 13} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill={tplColors[id] ?? "#888"}>
              {m}
            </text>
            {selectedIds.has(id) && renderHandles(r, id)}
          </g>
        )
      })}

      {lanes.map((lane, li) => {
        const laneY = topY + 20 + li * rowH
        const lId = `lane-${li}`
        const defaultLRect = { x: 4, y: laneY, width: labelW - 8, height: rowH - 4 }
        const lRect = pos[lId] ?? defaultLRect
        const laneColor = tplColors[lId] ?? PALETTE[li % PALETTE.length]!
        const lStroke = tplStrokeColors[lId]
        const lStrokeWidth = tplStrokeWidths[lId] ?? 1
        const isSelected = selectedIds.has(lId)

        return (
          <g key={`lane-${li}`}>
            <g onMouseDown={e => startDrag(e, lId, lRect)} style={{ cursor: 'pointer' }}>
              <rect x={lRect.x} y={lRect.y} width={lRect.width} height={lRect.height} rx={4} fill={laneColor} opacity={0.85} stroke={lStroke} strokeWidth={lStroke ? lStrokeWidth : undefined} />
              <text x={lRect.x + lRect.width / 2} y={lRect.y + lRect.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                {lane.label}
              </text>
              {isSelected && renderHandles(lRect, lId)}
            </g>
            {(() => {
              const lineId = `line-lane-${li}`
              const defaultLineR = { x: marginX, y: laneY + rowH / 2 - 2, width: W - marginX / 2 - marginX, height: 4 }
              const lRectLine = pos[lineId] ?? defaultLineR
              const stroke = tplStrokeColors[lineId] ?? '#e2e8f0'
              const sW = tplStrokeWidths[lineId] ?? 1
              return (
                <g onMouseDown={e => startDrag(e, lineId, lRectLine)} style={{ cursor: 'pointer' }}>
                  <line x1={lRectLine.x} y1={lRectLine.y + lRectLine.height / 2} x2={lRectLine.x + lRectLine.width} y2={lRectLine.y + lRectLine.height / 2} stroke={stroke} strokeWidth={sW} />
                  {selectedIds.has(lineId) && renderHandles(lRectLine, lineId)}
                </g>
              )
            })()}
          </g>
        )
      })}

      {milestones.map((m, mi) => {
        const elementId = `bar-${mi}`
        const li = lanes.findIndex(l => l.label === m.lane)
        if (li < 0 || !m.quarter) return null
        const qi = parseInt(m.quarter.replace('Q', '')) || 1
        const startMonth = (qi - 1) * 3
        const spanMonths = 3
        const laneY = topY + 20 + li * rowH
        const defaultBarX = marginX + startMonth * monthW + 2
        const defaultBarW = spanMonths * monthW - 4
        const defaultBarH = rowH - 12
        const defaultBarY = laneY + 6
        const color = tplColors[elementId] ?? m.style?.fill ?? PALETTE[mi % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] ?? (selectedIds.has(elementId) ? '#333' : m.style?.stroke)
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 1.5 : 1)
        const isSelected = selectedIds.has(elementId)
        const defaultRect = { x: defaultBarX, y: defaultBarY, width: m.style?.boxWidth ?? defaultBarW, height: m.style?.boxHeight ?? defaultBarH }
        const visualRect = pos[elementId] ?? defaultRect
        const styleFontSize = m.style?.fontSize ?? 11
        const styleFontWeight = m.style?.fontWeight ?? 700
        const styleFontColor = m.style?.fontColor ?? 'white'

        return (
          <g key={`bar-${mi}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={visualRect.x} y={visualRect.y} width={visualRect.width} height={visualRect.height} rx={6} fill={color} opacity={isSelected ? 1 : 0.8} stroke={stroke} strokeWidth={stroke ? strokeWidth : undefined} />
              <text x={visualRect.x + visualRect.width / 2} y={visualRect.y + visualRect.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>
                {m.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {Array.from({ length: 12 }, (_, mi) => {
        const id = `vg-${mi}`
        const defaultR = { x: marginX + mi * monthW - 2, y: topY + 20, width: 4, height: lanes.length * rowH }
        const r = pos[id] ?? defaultR
        const stroke = tplStrokeColors[id] ?? '#e2e8f0'
        const sW = tplStrokeWidths[id] ?? 0.5
        return (
          <g key={id} onMouseDown={e => startDrag(e, id, r)} style={{ cursor: 'pointer' }}>
            <line x1={r.x + r.width / 2} y1={r.y} x2={r.x + r.width / 2} y2={r.y + r.height} stroke={stroke} strokeWidth={sW} />
            {selectedIds.has(id) && renderHandles(r, id)}
          </g>
        )
      })}
    </g>
  )
}
