import { useRef, type ReactElement } from 'react'
import type { TableData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const PALETTE = ['#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function TableTemplate({ data }: { data: TableData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, columns, rows } = data
  const W = 900
  const H = 600

  const labelW = 100
  const tableX = 40
  const tableW = W - tableX * 2
  const headerH = 44
  const rowH = 40
  const colW = (tableW - labelW) / Math.max(columns.length, 1)
  const tableH = headerH + rows.length * rowH
  const tableY = title ? 100 : 70

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <rect x={tableX} y={tableY} width={tableW} height={tableH} rx={8} fill="#f8fafc" stroke="#cbd5e0" strokeWidth={1.5} />

      <rect x={tableX} y={tableY} width={tableW} height={headerH} rx={8} fill="#1e3a5f" />
      <rect y={tableY + headerH - 8} width={tableW} height={8} fill="#1e3a5f" />

      <rect x={tableX} y={tableY} width={labelW} height={headerH} fill="#2a4365" />
      <rect y={tableY + headerH - 8} width={labelW} height={8} fill="#2a4365" />

      {columns.map((col, ci) => (
        <text
          key={'h-' + ci}
          x={tableX + labelW + ci * colW + colW / 2}
          y={tableY + headerH / 2 + 5}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={13}
          fontWeight={600}
          fill="white"
        >
          {col}
        </text>
      ))}

      {rows.map((row, ri) => {
        const elementId = `row-${ri}`
        const defaultColor = PALETTE[ri % PALETTE.length]!
        const color = tplColors[elementId] ?? defaultColor
        
        const isSelected = selectedIds.has(elementId)
        const isEven = ri % 2 === 0
        const rowY = tableY + headerH + ri * rowH
        const visualRect = { x: tableX, y: rowY, width: tableW, height: rowH }

        return (
          <g key={'r-' + ri}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={tableX} y={rowY} width={tableW} height={rowH} fill={isEven ? 'white' : '#f1f5f9'} />
              <rect x={tableX} y={rowY} width={labelW} height={rowH} fill={color} />

              <text
                x={tableX + labelW / 2}
                y={rowY + rowH / 2 + 5}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fontWeight={600}
                fill="white"
              >
                {row.label}
              </text>

              {row.cells.slice(0, columns.length).map((cell, ci) => (
                <text
                  key={'c-' + ri + '-' + ci}
                  x={tableX + labelW + ci * colW + colW / 2}
                  y={rowY + rowH / 2 + 5}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fill="#1a202c"
                >
                  {cell}
                </text>
              ))}

              <line x1={tableX} y1={rowY + rowH} x2={tableX + tableW} y2={rowY + rowH} stroke="#e2e8f0" strokeWidth={1} />

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {columns.map((_, ci) => {
        const x = tableX + labelW + ci * colW
        return (
          <line
            key={'vline-' + ci}
            x1={x}
            y1={tableY}
            x2={x}
            y2={tableY + tableH}
            stroke="#e2e8f0"
            strokeWidth={1}
          />
        )
      })}
    </g>
  )
}
