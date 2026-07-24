import { useRef, type ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { GearIcon } from '../shared/icons'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Manufacturing5Template({ data }: { data: ManufacturingData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, stations } = data
  const W = 800
  const H = 560
  const cx = W / 2
  const cy = 340

  const diamondW = 300
  const diamondH = 240
  const halfW = diamondW / 2
  const halfH = diamondH / 2

  const positions = [
    { x: cx, y: cy - halfH },
    { x: cx + halfW, y: cy },
    { x: cx, y: cy + halfH },
    { x: cx - halfW, y: cy },
  ]

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <polygon
        points={`${cx},${cy - halfH} ${cx + halfW},${cy} ${cx},${cy + halfH} ${cx - halfW},${cy}`}
        fill="none" stroke="#cbd5e0" strokeWidth={2} strokeDasharray="8 4"
      />

      {positions.map((pos, i) => {
        const station = stations[i]
        if (!station) return null

        const elementId = `station-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const boxW = 120
        const boxH = 56
        const visualRect = { x: pos.x - boxW / 2, y: pos.y - boxH / 2, width: boxW, height: boxH }

        return (
          <g key={`s-${i}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={pos.x - boxW / 2} y={pos.y - boxH / 2} width={boxW} height={boxH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} />
              <g transform={`translate(${pos.x - 14}, ${pos.y - boxH / 2 + 4})`}>
                <GearIcon size={20} color={color} />
              </g>
              <text x={pos.x} y={pos.y + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                {station.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {/* Central QA station */}
      <rect x={cx - 54} y={cy - 22} width={108} height={44} rx={8} fill="#fff3e0" stroke="#e67e22" strokeWidth={2} />
      <text x={cx} y={cy - 1} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#e67e22">
        QA Control
      </text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#888">
        quality check
      </text>
    </g>
  )
}
