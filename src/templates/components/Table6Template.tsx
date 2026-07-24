import { useRef, type ReactElement } from 'react'
import type { TableData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const BLUE_HEADER = '#1a56db'
const BLUE_ACCENT = '#eff6ff'
const BLUE_LINE = '#bfdbfe'

export function Table6Template({ data }: { data: TableData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, columns, rows } = data
  const W = 900
  const H = 600
  const labelW = 100
  const tableX = 40
  const tableW = W - tableX * 2
  const headerH = 44
  const rowH = 40
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

      <rect x={tableX} y={tableY} width={tableW} height={headerH} rx={6} fill={BLUE_HEADER} />
      <rect y={tableY + headerH - 6} width={tableW} height={6} fill={BLUE_HEADER} />

      <rect x={tableX} y={tableY} width={labelW} height={headerH} fill="#1e40af" />
      <rect y={tableY + headerH - 6} width={labelW} height={6} fill="#1e40af" />

      {columns.map((col, ci) => (
        <text key={`h-${ci}`} x={tableX + labelW + ci * colW + colW / 2} y={tableY + headerH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="white">
          {col}
        </text>
      ))}

      {rows.map((row, ri) => {
        const elementId = `row-${ri}`
        const isSelected = selectedIds.has(elementId)
        const isEven = ri % 2 === 0
        const rowY = tableY + headerH + ri * rowH
        const visualRect = { x: tableX, y: rowY, width: tableW, height: rowH }

        return (
          <g key={`r-${ri}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={tableX} y={rowY} width={tableW} height={rowH} fill={isSelected ? '#dbeafe' : isEven ? 'white' : BLUE_ACCENT} />
              <rect x={tableX} y={rowY} width={labelW} height={rowH} fill="#eff6ff" />

              <text x={tableX + labelW / 2} y={rowY + rowH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#1e40af">
                {row.label}
              </text>

              {row.cells.slice(0, columns.length).map((cell, ci) => (
                <text key={`c-${ri}-${ci}`} x={tableX + labelW + ci * colW + colW / 2} y={rowY + rowH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="#1a202c">
                  {cell}
                </text>
              ))}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {columns.map((_, ci) => (
        <line key={`vl-${ci}`} x1={tableX + labelW + ci * colW} y1={tableY} x2={tableX + labelW + ci * colW} y2={tableY + headerH + rows.length * rowH} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
      ))}
      {rows.map((_, ri) => (
        <line key={`hl-${ri}`} x1={tableX} y1={tableY + headerH + (ri + 1) * rowH} x2={tableX + tableW} y2={tableY + headerH + (ri + 1) * rowH} stroke={BLUE_LINE} strokeWidth={1} />
      ))}
    </g>
  )
}
