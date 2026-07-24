import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { Arrow } from '../shared/primitives'
import { GearIcon } from '../shared/icons'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const QA_COLOR = '#4caf50'

export function Manufacturing4Template({ data }: { data: ManufacturingData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, stations } = data
  const productionStations = stations.filter(s => !s.isQuality)
  const qaStations = stations.filter(s => s.isQuality)
  const W = 960
  const H = title ? 540 : 500
  const boxW = 140
  const boxH = 64
  const gap = 24
  const topY = title ? 110 : 70
  const bottomY = 360


  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <text x={20} y={topY + boxH / 2 + 4} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#4a90d9">
        MAIN
      </text>

      <text x={20} y={bottomY + boxH / 2 + 4} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={QA_COLOR}>
        QA
      </text>

      {productionStations.map((station, i) => {
        const elementId = `prod-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const sx = 80 + i * (boxW + gap)
        const visualRect = { x: sx, y: topY, width: boxW, height: boxH }

        return (
          <g key={`prod-${i}`}>
            {i > 0 && <Arrow from={{ x: sx - gap + 2, y: topY + boxH / 2 }} to={{ x: sx - 2, y: topY + boxH / 2 }} color={color} />}
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={sx} y={topY} width={boxW} height={boxH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} />
              <g transform={`translate(${sx + boxW / 2 - 12}, ${topY + 8})`}>
                <GearIcon size={24} color={color} />
              </g>
              <text x={sx + boxW / 2} y={topY + boxH - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                {station.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {qaStations.map((station, i) => {
        const elementId = `qa-${i}`
        const color = tplColors[elementId] ?? QA_COLOR
        const isSelected = selectedIds.has(elementId)
        const sx = 80 + i * (boxW + gap)
        const visualRect = { x: sx, y: bottomY, width: boxW, height: boxH }

        return (
          <g key={`qa-${i}`}>
            {i > 0 && <Arrow from={{ x: sx - gap + 2, y: bottomY + boxH / 2 }} to={{ x: sx - 2, y: bottomY + boxH / 2 }} color={color} />}
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={sx} y={bottomY} width={boxW} height={boxH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <g transform={`translate(${sx + boxW / 2 - 12}, ${bottomY + 8})`}>
                <GearIcon size={24} color={color} />
              </g>
              <text x={sx + boxW / 2} y={bottomY + boxH - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                {station.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {/* Vertical connections between lines */}
      {productionStations.map((_, i) => {
        const sx = 80 + i * (boxW + gap) + boxW / 2
        return (
          <line key={`vline-${i}`} x1={sx} y1={topY + boxH} x2={sx} y2={bottomY} stroke="#cbd5e0" strokeWidth={1} strokeDasharray="4 4" />
        )
      })}
    </g>
  )
}
