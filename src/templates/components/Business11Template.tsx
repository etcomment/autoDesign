import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Business11Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, nodes } = data
  const W = 1000
  const H = 450
  const lineY = 220
  const circleR = 10
  const cardW = 120
  const cardH = 50
  const count = Math.min(nodes.length, 6)
  const totalW = (count - 1) * 180 + cardW
  const startX = (W - totalW) / 2

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <line x1={startX - 20} y1={lineY} x2={startX + totalW + 20} y2={lineY} stroke="#ccc" strokeWidth={2} />
      <polygon points={`${startX + totalW + 26},${lineY - 6} ${startX + totalW + 26},${lineY + 6} ${startX + totalW + 40},${lineY}`} fill="#ccc" />

      {nodes.slice(0, count).map((node, i) => {
        const elementId = `node-${i}`
        const x = startX + i * 180
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: x, y: lineY - circleR - cardH - 14, width: cardW, height: cardH }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={lineY - circleR - cardH - 14} width={cardW} height={cardH} rx={8} fill={color} opacity={0.15} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={x + cardW / 2} y={lineY - circleR - cardH / 2 - 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                PHASE {i + 1}
              </text>
              <text x={x + cardW / 2} y={lineY - circleR - cardH / 2 + 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
                {node.title.length > 14 ? node.title.slice(0, 12) + '..' : node.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
            <circle cx={x + cardW / 2} cy={lineY} r={circleR} fill="white" stroke={color} strokeWidth={2.5} />
            {i < count - 1 && (
              <line x1={x + cardW} y1={lineY - circleR / 2} x2={x + 180} y2={lineY - circleR / 2} stroke={color} strokeWidth={1} strokeDasharray="2 4" />
            )}
          </g>
        )
      })}
    </g>
  )
}
