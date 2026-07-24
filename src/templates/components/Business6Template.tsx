import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Business6Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, nodes } = data
  const W = 900
  const H = 600
  const barW = 600
  const barH = 48
  const accentW = 100
  const gap = 16
  const startX = (W - barW) / 2
  const startY = 110

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {nodes.slice(0, 6).map((node, i) => {
        const elementId = `node-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const y = startY + i * (barH + gap)
        const visualRect = { x: startX, y, width: barW, height: barH }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={startX} y={y} width={accentW} height={barH} rx={8} fill={color} />
              <rect x={startX + accentW - 8} y={y} width={barW - accentW + 8} height={barH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : '#e0e0e0'} strokeWidth={isSelected ? 2.5 : 1} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={startX + accentW + 24} y={y + barH / 2 + 5} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={600} fill="#333">
                {node.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
