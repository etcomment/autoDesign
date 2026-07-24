import { useRef, type ReactElement } from 'react'
import type { TableData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

export function Table5Template({ data }: { data: TableData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, columns, rows } = data
  const W = 900
  const H = 560
  const labelW = 100
  const tableX = 40
  const tableW = W - tableX * 2
  const headerH = 36
  const rowH = 34
  const colW = (tableW - labelW) / Math.max(columns.length, 1)
  const tableY = title ? 100 : 70

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <line x1={tableX} y1={tableY + headerH} x2={tableX + tableW} y2={tableY + headerH} stroke="#333" strokeWidth={1.5} />

      <text x={tableX + labelW / 2} y={tableY + headerH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#333">
        #
      </text>

      {columns.map((col, ci) => (
        <text key={`h-${ci}`} x={tableX + labelW + ci * colW + colW / 2} y={tableY + headerH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#333">
          {col}
        </text>
      ))}

      {rows.map((row, ri) => {
        const elementId = `row-${ri}`
        const isSelected = selectedIds.has(elementId)
        const rowY = tableY + headerH + ri * rowH
        const visualRect = { x: tableX, y: rowY, width: tableW, height: rowH }

        return (
          <g key={`r-${ri}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <text x={tableX + labelW / 2} y={rowY + rowH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
                {row.label}
              </text>

              {row.cells.slice(0, columns.length).map((cell, ci) => (
                <text key={`c-${ri}-${ci}`} x={tableX + labelW + ci * colW + colW / 2} y={rowY + rowH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="#555">
                  {cell}
                </text>
              ))}

              <line x1={tableX} y1={rowY + rowH} x2={tableX + tableW} y2={rowY + rowH} stroke="#e2e8f0" strokeWidth={1} />
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {columns.map((_, ci) => (
        <line key={`vl-${ci}`} x1={tableX + labelW + ci * colW} y1={tableY} x2={tableX + labelW + ci * colW} y2={tableY + headerH + rows.length * rowH} stroke="#e2e8f0" strokeWidth={0.5} />
      ))}
    </g>
  )
}
