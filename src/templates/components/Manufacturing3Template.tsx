import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { Arrow } from '../shared/primitives'
import { GearIcon } from '../shared/icons'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Manufacturing3Template({ data }: { data: ManufacturingData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, stations } = data
  const W = 900
  const H = 520
  const boxW = 130
  const boxH = 64
  const topY = title ? 100 : 60
  const bottomY = 380

  const totalPerSide = Math.ceil(stations.length / 2)
  const topStations = stations.slice(0, totalPerSide)
  const bottomStations = stations.slice(totalPerSide)

  const topStartX = 40
  const bottomStartX = W - 40 - bottomStations.length * boxW - (bottomStations.length - 1) * 20

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {topStations.map((station, i) => {
        const elementId = `station-t-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const sx = topStartX + i * (boxW + 20)
        const visualRect = { x: sx, y: topY, width: boxW, height: boxH }

        return (
          <g key={`top-${i}`}>
            {i < topStations.length - 1 && (
              <Arrow from={{ x: sx + boxW + 2, y: topY + boxH / 2 }} to={{ x: sx + boxW + 18, y: topY + boxH / 2 }} color={color} />
            )}
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={sx} y={topY} width={boxW} height={boxH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} />
              <g transform={`translate(${sx + boxW / 2 - 12}, ${topY + 8})`}>
                <GearIcon size={24} color={color} />
              </g>
              <text x={sx + boxW / 2} y={topY + boxH - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                {station.title.length > 14 ? station.title.slice(0, 12) + '..' : station.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {bottomStations.map((station, i) => {
        const elementId = `station-b-${i}`
        const color = tplColors[elementId] ?? PALETTE[(totalPerSide + i) % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const sx = bottomStartX + i * (boxW + 20)
        const visualRect = { x: sx, y: bottomY, width: boxW, height: boxH }

        return (
          <g key={`bot-${i}`}>
            {i < bottomStations.length - 1 && (
              <Arrow from={{ x: sx + boxW + 2, y: bottomY + boxH / 2 }} to={{ x: sx + boxW + 18, y: bottomY + boxH / 2 }} color={color} />
            )}
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={sx} y={bottomY} width={boxW} height={boxH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} />
              <g transform={`translate(${sx + boxW / 2 - 12}, ${bottomY + 8})`}>
                <GearIcon size={24} color={color} />
              </g>
              <text x={sx + boxW / 2} y={bottomY + boxH - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                {station.title.length > 14 ? station.title.slice(0, 12) + '..' : station.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {topStations.length > 0 && bottomStations.length > 0 && (() => {
        const lastTop = topStartX + (topStations.length - 1) * (boxW + 20) + boxW
        const firstBottom = bottomStartX + bottomStations.length * boxW + (bottomStations.length - 1) * 20
        const color = PALETTE[topStations.length - 1]!
        return (
          <>
            <Arrow from={{ x: lastTop, y: topY + boxH / 2 }} to={{ x: lastTop + 30, y: topY + boxH / 2 }} color={color} />
            <Arrow from={{ x: lastTop + 30, y: topY + boxH / 2 }} to={{ x: lastTop + 30, y: bottomY + boxH / 2 }} color={color} />
            <Arrow from={{ x: lastTop + 30, y: bottomY + boxH / 2 }} to={{ x: firstBottom, y: bottomY + boxH / 2 }} color={color} />
          </>
        )
      })()}
    </g>
  )
}
