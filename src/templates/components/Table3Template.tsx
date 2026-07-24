import { useRef, type ReactElement } from 'react'
import type { TableData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c']

export function Table3Template({ data }: { data: TableData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, columns, rows } = data
  const W = 800
  const H = 620
  const cardX = 40
  const cardW = W - cardX * 2
  const cardH = 64
  const gap = 12
  const topY = title ? 100 : 65
  const accentW = 6

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {rows.map((row, ri) => {
        const elementId = `row-${ri}`
        const color = tplColors[elementId] ?? PALETTE[ri % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const ry = topY + ri * (cardH + gap)
        const visualRect = { x: cardX, y: ry, width: cardW, height: cardH }

        const colCount = Math.min(columns.length, 4)
        const innerColW = (cardW - accentW - 20 - row.label.length > 0 ? 100 : 0) / colCount

        return (
          <g key={`r-${ri}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={cardX} y={ry} width={cardW} height={cardH} rx={10} fill="white" stroke={isSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSelected ? 2.5 : 1.5} />
              <rect x={cardX} y={ry} width={accentW} height={cardH} rx={3} fill={color} />

              <text x={cardX + accentW + 14} y={ry + cardH / 2 + 5} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#333">
                {row.label}
              </text>

              {columns.slice(0, 4).map((col, ci) => (
                <g key={`colh-${ci}`}>
                  <text x={cardX + accentW + 120 + ci * innerColW} y={ry + 20} fontFamily="Arial, sans-serif" fontSize={9} fontWeight={600} fill="#888">
                    {col}
                  </text>
                  <text x={cardX + accentW + 120 + ci * innerColW} y={ry + 46} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill={color}>
                    {row.cells[ci] ?? ''}
                  </text>
                </g>
              ))}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
