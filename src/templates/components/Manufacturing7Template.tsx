import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const DAYS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5']

export function Manufacturing7Template({ data }: { data: ManufacturingData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, stations } = data
  const W = 960
  const H = title ? 500 : 460
  const marginX = 80
  const topY = title ? 110 : 70
  const colW = (W - marginX * 2) / 5
  const rowH = 60

  const useStations = stations.slice(0, 5)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {DAYS.map((day, di) => (
        <text key={`day-${di}`} x={marginX + di * colW + colW / 2} y={topY + 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#888">
          {day}
        </text>
      ))}

      <line x1={marginX} y1={topY + 18} x2={W - marginX} y2={topY + 18} stroke="#e2e8f0" strokeWidth={2} />

      {useStations.map((station, si) => {
        const elementId = `station-${si}`
        const color = tplColors[elementId] ?? PALETTE[si % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const startDay = si
        const spanDays = 2
        const barX = marginX + startDay * colW + 4
        const barW = spanDays * colW - 8
        const barY = topY + 30 + si * rowH
        const barH = rowH - 10
        const visualRect = { x: barX, y: barY, width: barW, height: barH }

        return (
          <g key={`s-${si}`}>
            <text x={10} y={barY + barH / 2 + 4} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#555">
              {station.title}
            </text>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={barX} y={barY} width={barW} height={barH} rx={6} fill={color} opacity={isSelected ? 0.9 : 0.7} stroke={isSelected ? '#333' : color} strokeWidth={isSelected ? 1.5 : 1} />
              <text x={barX + barW / 2} y={barY + barH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                {station.subtitle ?? ''}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {DAYS.map((_, di) => (
        <line key={`vline-${di}`} x1={marginX + di * colW} y1={topY + 18} x2={marginX + di * colW} y2={topY + 30 + useStations.length * rowH} stroke="#e2e8f0" strokeWidth={1} />
      ))}
    </g>
  )
}
