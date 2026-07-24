import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function ProductRoadmap8Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, lanes, milestones } = data
  const W = 960
  const H = 560
  const marginX = 120
  const topY = title ? 110 : 70
  const monthW = (W - marginX) / 12
  const rowH = 52
  const labelW = 100

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {MONTHS.map((m, mi) => (
        <text key={`mh-${mi}`} x={marginX + mi * monthW + monthW / 2} y={topY + 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#888">
          {m}
        </text>
      ))}

      {lanes.map((lane, li) => {
        const laneY = topY + 20 + li * rowH
        const laneColor = PALETTE[li % PALETTE.length]!

        return (
          <g key={`lane-${li}`}>
            <rect x={4} y={laneY} width={labelW - 8} height={rowH - 4} rx={4} fill={laneColor} opacity={0.85} />
            <text x={labelW / 2} y={laneY + rowH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
              {lane.label}
            </text>
            <line x1={marginX} y1={laneY + rowH / 2} x2={W - marginX / 2} y2={laneY + rowH / 2} stroke="#e2e8f0" strokeWidth={1} />
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
        const barX = marginX + startMonth * monthW + 2
        const barW = spanMonths * monthW - 4
        const barH = rowH - 12
        const barY = laneY + 6
        const color = tplColors[elementId] ?? PALETTE[mi % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: barX, y: barY, width: barW, height: barH }

        return (
          <g key={`bar-${mi}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={barX} y={barY} width={barW} height={barH} rx={6} fill={color} opacity={isSelected ? 1 : 0.8} stroke={isSelected ? '#333' : undefined} strokeWidth={isSelected ? 1.5 : undefined} />
              <text x={barX + barW / 2} y={barY + barH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                {m.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {Array.from({ length: 12 }, (_, mi) => (
        <line key={`vg-${mi}`} x1={marginX + mi * monthW} y1={topY + 20} x2={marginX + mi * monthW} y2={topY + 20 + lanes.length * rowH} stroke="#e2e8f0" strokeWidth={0.5} />
      ))}
    </g>
  )
}
