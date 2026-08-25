import { useRef, type ReactElement } from 'react'
import type { TableData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c']

export function Table3Template({ data }: { data: TableData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { columns, rows } = data
  const W = 800
  const cardX = 40
  const cardW = W - cardX * 2
  const cardH = 68
  const gap = 12
  const topY = 40
  const accentW = 6

  return (
    <g ref={svgRef}>
      {rows.map((row, ri) => {
        const elementId = `row-${ri}`
        const color = tplColors[elementId] ?? PALETTE[ri % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const ry = topY + ri * (cardH + gap)
        const defaultBbox = { x: cardX, y: ry, width: cardW, height: cardH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : '#e2e8f0')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 1.5)

        const colCount = Math.min(columns.length, 4)
        const innerColW = (bbox.width - accentW - 140) / Math.max(colCount, 1)
        const labelLines = wrapTextByWidth(row.label, 12)

        return (
          <g key={`r-${ri}`}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={10} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
              <rect x={bbox.x} y={bbox.y} width={accentW} height={bbox.height} rx={3} fill={color} />

              <text x={bbox.x + accentW + 14} y={bbox.y + bbox.height / 2 + (labelLines.length > 1 ? -3 : 5)} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#333">
                {labelLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={bbox.x + accentW + 14} dy={lineIndex === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>

              {columns.slice(0, 4).map((col, ci) => {
                const cellText = row.cells[ci] ?? ''
                const colLines = wrapTextByWidth(col, 10)
                const cellLines = wrapTextByWidth(cellText, 10)
                const colX = bbox.x + accentW + 120 + ci * innerColW

                return (
                  <g key={`colh-${ci}`}>
                    <text x={colX} y={bbox.y + 20} fontFamily="Arial, sans-serif" fontSize={9} fontWeight={600} fill="#888">
                      {colLines[0] || ''}
                    </text>
                    <text x={colX} y={bbox.y + 46} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill={color}>
                      {cellLines[0] || ''}
                    </text>
                  </g>
                )
              })}

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
