import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Business3Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, nodes } = data
  const W = 900
  const H = 600
  const cols = 3
  const rows = 2
  const nodeW = 200
  const nodeH = 100
  const gapX = 40
  const gapY = 30
  const gridW = cols * nodeW + (cols - 1) * gapX
  const gridH = rows * nodeH + (rows - 1) * gapY
  const offsetX = (W - gridW) / 2
  const offsetY = (H - gridH) / 2 + 20

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {[0, 1].map(row =>
        [0, 1, 2].map(col => {
          const x1 = offsetX + col * (nodeW + gapX)
          const x2 = x1 + nodeW + gapX
          if (col < cols - 1) {
            return <line key={`v-${row}-${col}`} x1={x2 - gapX / 2} y1={offsetY} x2={x2 - gapX / 2} y2={offsetY + gridH} stroke="#e0e0e0" strokeWidth={1} />
          }
          return null
        })
      )}
      {[0, 1, 2].map(col =>
        <line key={`h-${col}`} x1={offsetX} y1={offsetY + nodeH + gapY / 2} x2={offsetX + gridW} y2={offsetY + nodeH + gapY / 2} stroke="#e0e0e0" strokeWidth={1} />
      )}

      {nodes.slice(0, 6).map((node, i) => {
        const elementId = `node-${i}`
        const row = Math.floor(i / cols)
        const col = i % cols
        const x = offsetX + col * (nodeW + gapX)
        const y = offsetY + row * (nodeH + gapY)
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x, y, width: nodeW, height: nodeH }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={y} width={nodeW} height={nodeH} rx={10} fill={color} opacity={0.12} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 2} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={x + nodeW / 2} y={y + nodeH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#333">
                {node.title.length > 22 ? node.title.slice(0, 20) + '...' : node.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
