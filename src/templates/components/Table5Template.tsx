import { useRef, type ReactElement } from 'react'
import type { TableData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'

export function Table5Template({ data }: { data: TableData }): ReactElement {
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
  const headerH = 40
  const rowH = 38
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
            <line x1={bbox.x} y1={bbox.y + bbox.height} x2={bbox.x + bbox.width} y2={bbox.y + bbox.height} stroke="#333" strokeWidth={1.5} />
            <text x={bbox.x + labelW / 2} y={bbox.y + bbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#333">
              #
            </text>

            {columns.map((col, ci) => {
              const maxChars = Math.max(6, Math.floor(colW / 8))
              const colLines = wrapTextByWidth(col, maxChars)
              const colCenterX = bbox.x + labelW + ci * colW + colW / 2
              return (
                <text key={`h-${ci}`} x={colCenterX} y={bbox.y + bbox.height / 2 + (colLines.length > 1 ? -3 : 5)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#333">
                  {colLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={colCenterX} dy={lineIndex === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
                </text>
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
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 0)
        const labelLines = wrapTextByWidth(row.label, Math.max(6, Math.floor(labelW / 8)))

        return (
          <g key={`r-${ri}`}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
              {strokeWidth > 0 && (
                <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={4} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
              )}
              <text x={bbox.x + labelW / 2} y={bbox.y + bbox.height / 2 + (labelLines.length > 1 ? -3 : 4)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
                {labelLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={bbox.x + labelW / 2} dy={lineIndex === 0 ? 0 : 12}>
                    {line}
                  </tspan>
                ))}
              </text>

              {row.cells.slice(0, columns.length).map((cell, ci) => {
                const maxChars = Math.max(6, Math.floor(colW / 8))
                const cellLines = wrapTextByWidth(cell, maxChars)
                const cellCenterX = bbox.x + labelW + ci * colW + colW / 2
                return (
                  <text key={`c-${ri}-${ci}`} x={cellCenterX} y={bbox.y + bbox.height / 2 + (cellLines.length > 1 ? -3 : 4)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="#555">
                    {cellLines.map((line, lineIndex) => (
                      <tspan key={lineIndex} x={cellCenterX} dy={lineIndex === 0 ? 0 : 12}>
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
