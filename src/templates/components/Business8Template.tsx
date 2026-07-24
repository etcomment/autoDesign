import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Business8Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, nodes } = data
  const W = 900
  const H = 600
  const lineX = 180
  const cardX = 220
  const cardW = 500
  const cardH = 50
  const circleR = 18
  const gap = 24
  const startY = 110

  const visible = nodes.slice(0, 6)
  const firstY = startY + circleR
  const lastY = startY + (visible.length - 1) * (cardH + gap) + circleR

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <line x1={lineX} y1={firstY} x2={lineX} y2={lastY} stroke="#ccc" strokeWidth={2} />

      {visible.map((node, i) => {
        const elementId = `node-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const y = startY + i * (cardH + gap)
        const visualRect = { x: cardX, y, width: cardW, height: cardH }

        return (
          <g key={i}>
            <circle cx={lineX} cy={y + circleR} r={circleR} fill={color} />
            <text x={lineX} y={y + circleR + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
              {i + 1}
            </text>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={cardX} y={y} width={cardW} height={cardH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 2} strokeDasharray={isSelected ? '4 2' : undefined} />
              <rect x={cardX} y={y} width={6} height={cardH} rx={3} fill={color} />
              <text x={cardX + 24} y={y + cardH / 2 + 5} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#333">
                {node.title.length > 40 ? node.title.slice(0, 38) + '..' : node.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
