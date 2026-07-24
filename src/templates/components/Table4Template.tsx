import { useRef, type ReactElement } from 'react'
import type { TableData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Table4Template({ data }: { data: TableData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, columns, rows } = data
  const W = 900
  const H = 600
  const labelW = 100
  const tableX = 40
  const tableW = W - tableX * 2
  const headerH = 52
  const rowH = 42
  const colW = (tableW - labelW) / Math.max(columns.length, 1)
  const tableY = title ? 110 : 70

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {columns.map((col, ci) => {
        const colX = tableX + labelW + ci * colW
        const color = PALETTE[ci % PALETTE.length]!
        return (
          <g key={`h-${ci}`}>
            <rect x={colX} y={tableY} width={colW} height={headerH} rx={0} fill={color} opacity={0.9} stroke={color} strokeWidth={1} />
            <text x={colX + colW / 2} y={tableY + headerH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
              {col}
            </text>
          </g>
        )
      })}

      <rect x={tableX} y={tableY} width={labelW} height={headerH} fill="#2a4365" />
      <text x={tableX + labelW / 2} y={tableY + headerH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
        #
      </text>

      {rows.map((row, ri) => {
        const elementId = `row-${ri}`
        const isSelected = selectedIds.has(elementId)
        const rowY = tableY + headerH + ri * rowH
        const rowFill = ri % 2 === 0 ? '#ffffff' : '#f9fafb'
        const hoverFill = isSelected ? '#e8f4fd' : rowFill
        const visualRect = { x: tableX, y: rowY, width: tableW, height: rowH }

        return (
          <g key={`r-${ri}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={tableX} y={rowY} width={tableW} height={rowH} fill={hoverFill} />
              <rect x={tableX} y={rowY} width={labelW} height={rowH} fill={hoverFill} />

              <text x={tableX + labelW / 2} y={rowY + rowH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#1a202c">
                {row.label}
              </text>

              {row.cells.slice(0, columns.length).map((cell, ci) => (
                <text key={`c-${ri}-${ci}`} x={tableX + labelW + ci * colW + colW / 2} y={rowY + rowH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill={isSelected ? '#1a56db' : '#1a202c'} fontWeight={isSelected ? 600 : 400}>
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
        <line key={`vl-${ci}`} x1={tableX + labelW + ci * colW} y1={tableY} x2={tableX + labelW + ci * colW} y2={tableY + headerH + rows.length * rowH} stroke="#e2e8f0" strokeWidth={1} />
      ))}
    </g>
  )
}
