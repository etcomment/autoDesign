import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { GearIcon } from '../shared/icons'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Manufacturing8Template({ data }: { data: ManufacturingData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, stations } = data
  const W = 700
  const H = 600
  const cx = W / 2
  const cy = title ? 370 : 330
  const circleR = 180
  const boxW = 110
  const boxH = 48

  const useStations = stations.slice(0, 6)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <circle cx={cx} cy={cy} r={circleR} fill="none" stroke="#cbd5e0" strokeWidth={2} strokeDasharray="8 4" />

      {/* Arrow heads along the circle path */}
      {useStations.map((station, i) => {
        const elementId = `station-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const angle = (i / useStations.length) * 2 * Math.PI - Math.PI / 2
        const sx = cx + Math.cos(angle) * circleR
        const sy = cy + Math.sin(angle) * circleR
        const bx = sx - boxW / 2
        const by = sy - boxH / 2
        const visualRect = { x: bx, y: by, width: boxW, height: boxH }

        return (
          <g key={`s-${i}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={bx} y={by} width={boxW} height={boxH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} />
              <g transform={`translate(${bx + 6}, ${by + 6})`}>
                <GearIcon size={16} color={color} />
              </g>
              <text x={sx} y={by + boxH - 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                {station.title.length > 12 ? station.title.slice(0, 10) + '..' : station.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r={28} fill={PALETTE[0]} />
      <text x={cx} y={cy} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
        QA
      </text>
    </g>
  )
}
