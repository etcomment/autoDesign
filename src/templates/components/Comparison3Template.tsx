import { useRef, type ReactElement } from 'react'
import type { ComparisonData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const LEFT_COLOR = '#2563eb'
const RIGHT_COLOR = '#dc2626'
const MAX_BAR_W = 200

export function Comparison3Template({ data }: { data: ComparisonData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, leftTitle, rightTitle, items } = data
  const W = 800
  const H = title ? 550 : 510
  const midX = W / 2
  const rowH = 40
  const barH = 24
  const topY = title ? 110 : 70

  const allNumeric = items.every(i => !isNaN(Number(i.left.replace(/[^0-9.]/g, ''))) && !isNaN(Number(i.right.replace(/[^0-9.]/g, ''))))
  const getVal = (v: string) => allNumeric ? parseFloat(v.replace(/[^0-9.]/g, '')) || 0 : v.length * 8
  const maxVal = Math.max(...items.map(i => Math.max(getVal(i.left), getVal(i.right)))) || 100

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <text x={midX - MAX_BAR_W - 20} y={topY - 6} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={LEFT_COLOR}>
        {leftTitle}
      </text>
      <text x={midX + 20} y={topY - 6} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={RIGHT_COLOR}>
        {rightTitle}
      </text>

      {items.map((item, index) => {
        const elementId = `item-${index}`
        const isSelected = selectedIds.has(elementId)
        const rowY = topY + index * rowH
        const leftVal = getVal(item.left)
        const rightVal = getVal(item.right)
        const leftW = (leftVal / maxVal) * MAX_BAR_W
        const rightW = (rightVal / maxVal) * MAX_BAR_W
        const visualRect = { x: midX - MAX_BAR_W - 10, y: rowY, width: MAX_BAR_W * 2 + 20, height: rowH }

        return (
          <g key={`item-${index}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={midX - MAX_BAR_W - 10 - leftW} y={rowY + (rowH - barH) / 2} width={leftW} height={barH} rx={6} fill={LEFT_COLOR} opacity={isSelected ? 1 : 0.7} />
              <text x={midX - MAX_BAR_W - 16 - leftW} y={rowY + rowH / 2 + 4} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
                {item.left}
              </text>

              <rect x={midX + 10} y={rowY + (rowH - barH) / 2} width={rightW} height={barH} rx={6} fill={RIGHT_COLOR} opacity={isSelected ? 1 : 0.7} />
              <text x={midX + rightW + 16} y={rowY + rowH / 2 + 4} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
                {item.right}
              </text>

              <text x={midX} y={rowY + rowH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#555">
                {item.label}
              </text>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
