import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Business9Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, nodes } = data
  const W = 900
  const H = 600
  const cols = 3
  const rows = 3
  const cellSize = 160
  const gap = 16
  const gridW = cols * cellSize + (cols - 1) * gap
  const gridH = rows * cellSize + (rows - 1) * gap
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

      {nodes.slice(0, 9).map((node, i) => {
        const elementId = `node-${i}`
        const row = Math.floor(i / cols)
        const col = i % cols
        const x = offsetX + col * (cellSize + gap)
        const y = offsetY + row * (cellSize + gap)
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x, y, width: cellSize, height: cellSize }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={y} width={cellSize} height={cellSize} rx={8} fill={color} opacity={0.15} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={x + cellSize / 2} y={y + cellSize / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#333">
                {node.title.length > 16 ? node.title.slice(0, 14) + '..' : node.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {[0.5, 1.5].map(rowIdx =>
        <line key={`hl-${rowIdx}`} x1={offsetX} y1={offsetY + rowIdx * (cellSize + gap)} x2={offsetX + gridW} y2={offsetY + rowIdx * (cellSize + gap)} stroke="#e0e0e0" strokeWidth={1} />
      )}
      {[0.5, 1.5].map(colIdx =>
        <line key={`vl-${colIdx}`} x1={offsetX + colIdx * (cellSize + gap)} y1={offsetY} x2={offsetX + colIdx * (cellSize + gap)} y2={offsetY + gridH} stroke="#e0e0e0" strokeWidth={1} />
      )}
    </g>
  )
}
