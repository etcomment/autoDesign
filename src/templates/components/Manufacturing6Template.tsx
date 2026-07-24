import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { Arrow } from '../shared/primitives'
import { GearIcon } from '../shared/icons'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Manufacturing6Template({ data }: { data: ManufacturingData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, stations } = data
  const W = 800
  const H = title ? 620 : 580
  const cx = W / 2
  const cy = title ? 370 : 330
  const hubR = 44
  const spokeLen = 160
  const boxW = 120
  const boxH = 56

  const useStations = stations.slice(0, 6)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <circle cx={cx} cy={cy} r={hubR} fill="#2c2b64" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
        Warehouse
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="rgba(255,255,255,0.7)">
        HUB
      </text>

      {useStations.map((station, i) => {
        const elementId = `station-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const angle = (i / useStations.length) * 2 * Math.PI - Math.PI / 2
        const spokeEndX = cx + Math.cos(angle) * spokeLen
        const spokeEndY = cy + Math.sin(angle) * spokeLen
        const bx = spokeEndX - boxW / 2
        const by = spokeEndY - boxH / 2
        const visualRect = { x: bx, y: by, width: boxW, height: boxH }

        return (
          <g key={`s-${i}`}>
            <line x1={cx + Math.cos(angle) * hubR} y1={cy + Math.sin(angle) * hubR} x2={spokeEndX} y2={spokeEndY} stroke={color} strokeWidth={2} opacity={0.5} />

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={bx} y={by} width={boxW} height={boxH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} />
              <g transform={`translate(${bx + boxW / 2 - 12}, ${by + 4})`}>
                <GearIcon size={20} color={color} />
              </g>
              <text x={spokeEndX} y={by + boxH - 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                {station.title.length > 14 ? station.title.slice(0, 12) + '..' : station.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            <Arrow
              from={{ x: spokeEndX, y: spokeEndY + boxH / 2 + 2 }}
              to={{ x: spokeEndX, y: spokeEndY + boxH / 2 + 22 }}
              color={color}
            />
          </g>
        )
      })}
    </g>
  )
}
