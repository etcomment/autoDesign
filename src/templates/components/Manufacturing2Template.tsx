import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { Arrow } from '../shared/primitives'
import { GearIcon, StarIcon } from '../shared/icons'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Manufacturing2Template({ data }: { data: ManufacturingData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, stations } = data
  const W = 700
  const H = 640
  const stationW = 300
  const stationH = 74
  const gap = 20
  const topY = title ? 100 : 60
  const midX = W / 2

  const displayStations = stations.slice(0, 5)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <rect x={midX - 20} y={topY} width={40} height={40} rx={8} fill="#e8f4fd" stroke="#4a90d9" strokeWidth={1.5} />
      <text x={midX} y={topY + 25 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="#4a90d9">
        IN
      </text>

      {displayStations.map((station, i) => {
        const elementId = `station-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const sy = topY + 52 + i * (stationH + gap)
        const sx = midX - stationW / 2
        const visualRect = { x: sx, y: sy, width: stationW, height: stationH }

        return (
          <g key={`s-${i}`}>
            {i > 0 && (
              <Arrow
                from={{ x: midX, y: sy - gap + 2 }}
                to={{ x: midX, y: sy - 2 }}
                color={color}
              />
            )}

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={sx} y={sy} width={stationW} height={stationH} rx={10} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <g transform={`translate(${sx + 16}, ${sy + (stationH - 28) / 2})`}>
                <GearIcon size={28} color={color} />
              </g>
              <text x={sx + 56} y={sy + stationH / 2 - 8} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={color}>
                {station.title}
              </text>
              {station.subtitle && (
                <text x={sx + 56} y={sy + stationH / 2 + 12} fontFamily="Arial, sans-serif" fontSize={11} fill="#777">
                  {station.subtitle.length > 30 ? station.subtitle.slice(0, 28) + '..' : station.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      <g transform={`translate(${midX - 16}, ${topY + 52 + displayStations.length * (stationH + gap) + 8})`}>
        <StarIcon size={32} fill="#ffc107" color="#e0a800" />
      </g>
      <text x={midX + 24} y={topY + 52 + displayStations.length * (stationH + gap) + 28} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#888">
        OUTPUT
      </text>
    </g>
  )
}
