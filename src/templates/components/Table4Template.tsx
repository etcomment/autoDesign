import { useRef, type ReactElement } from 'react'
import type { TableData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Table4Template({ data }: { data: TableData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { columns, rows } = data
  const W = 900
  const labelW = 120
  const tableX = 40
  const tableW = W - tableX * 2
  const headerH = 48
  const rowH = 44
  const colW = (tableW - labelW) / Math.max(columns.length, 1)
  const tableY = 40

  return (
    <g ref={svgRef}>
      {/* Header Bar */}
      {(() => {
        const headerId = 'table-header'
        const defaultBbox = { x: tableX, y: tableY, width: tableW, height: headerH }
        const customPos = positions[headerId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(headerId)

        return (
          <g
            key={headerId}
            data-element-id={headerId}
            onMouseDown={e => startDrag(e, headerId, bbox)}
            transform={getTransform(headerId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={labelW} height={bbox.height} fill="#2a4365" />
            <text x={bbox.x + labelW / 2} y={bbox.y + bbox.height / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
              #
            </text>

            {columns.map((col, ci) => {
              const colX = bbox.x + labelW + ci * colW
              const color = PALETTE[ci % PALETTE.length]!
              const maxChars = Math.max(6, Math.floor(colW / 8))
              const colLines = wrapTextByWidth(col, maxChars)
              return (
                <g key={`h-${ci}`}>
                  <rect x={colX} y={bbox.y} width={colW} height={bbox.height} fill={color} opacity={0.9} stroke={color} strokeWidth={1} />
                  <text x={colX + colW / 2} y={bbox.y + bbox.height / 2 + (colLines.length > 1 ? -3 : 6)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                    {colLines.map((line, lineIndex) => (
                      <tspan key={lineIndex} x={colX + colW / 2} dy={lineIndex === 0 ? 0 : 13}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              )
            })}
            {isSelected && renderHandles(bbox, headerId)}
          </g>
        )
      })()}

      {rows.map((row, ri) => {
        const elementId = `row-${ri}`
        const isSelected = selectedIds.has(elementId)
        const rowY = tableY + headerH + ri * rowH
        const defaultBbox = { x: tableX, y: rowY, width: tableW, height: rowH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const rowFill = ri % 2 === 0 ? '#ffffff' : '#f9fafb'
        const hoverFill = isSelected ? '#e8f4fd' : rowFill
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 0)
        const labelLines = wrapTextByWidth(row.label, Math.max(6, Math.floor(labelW / 8)))

        return (
          <g key={`r-${ri}`}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} fill={hoverFill} stroke={strokeColor} strokeWidth={strokeWidth} />

              <text x={bbox.x + labelW / 2} y={bbox.y + bbox.height / 2 + (labelLines.length > 1 ? -3 : 5)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#1a202c">
                {labelLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={bbox.x + labelW / 2} dy={lineIndex === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>

              {row.cells.slice(0, columns.length).map((cell, ci) => {
                const maxChars = Math.max(6, Math.floor(colW / 8))
                const cellLines = wrapTextByWidth(cell, maxChars)
                const cellCenterX = bbox.x + labelW + ci * colW + colW / 2
                return (
                  <text key={`c-${ri}-${ci}`} x={cellCenterX} y={bbox.y + bbox.height / 2 + (cellLines.length > 1 ? -3 : 5)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill={isSelected ? '#1a56db' : '#1a202c'} fontWeight={isSelected ? 600 : 400}>
                    {cellLines.map((line, lineIndex) => (
                      <tspan key={lineIndex} x={cellCenterX} dy={lineIndex === 0 ? 0 : 13}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                )
              })}

              <line x1={bbox.x} y1={bbox.y + bbox.height} x2={bbox.x + bbox.width} y2={bbox.y + bbox.height} stroke="#e2e8f0" strokeWidth={1} />
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
