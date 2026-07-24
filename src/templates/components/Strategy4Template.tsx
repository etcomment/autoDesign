import { useRef, type ReactElement } from 'react'
import type { Strategy4Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

const COLUMN_KEYS = ['Vision', 'Execution', 'Growth'] as const

export function Strategy4Template({ data }: { data: Strategy4Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const toggleElement = useTemplateStore(s => s.toggleTemplateElement)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, blocks } = data
  const W = 1000
  const H = 520
  const colW = 290
  const colStartX = 42
  const colGap = 20
  const cardW = 270
  const cardH = 58
  const cardGap = 10
  const headerH = 40
  const topY = 110

  const columns: { colIndex: number; cardIndex: number; blockIndex: number }[] = []
  for (let i = 0; i < blocks.length; i++) {
    columns.push({ colIndex: i % 3, cardIndex: Math.floor(i / 3), blockIndex: i })
  }

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {[0, 1, 2].map(colIdx => {
        const colX = colStartX + colIdx * (colW + colGap)
        const colColor = PALETTE[colIdx % PALETTE.length]!

        return (
          <g key={colIdx}>
            <rect x={colX} y={topY} width={colW} height={headerH} rx={6} fill={colColor} />
            <text x={colX + colW / 2} y={topY + headerH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
              {COLUMN_KEYS[colIdx]}
            </text>

            {columns
              .filter(c => c.colIndex === colIdx)
              .map(entry => {
                const block = blocks[entry.blockIndex]!
                const elementId = `block-${entry.blockIndex}`
                const color = tplColors[elementId] ?? PALETTE[(entry.blockIndex + 2) % PALETTE.length]!
                const isSelected = selectedIds.has(elementId)
                const by = topY + headerH + 16 + entry.cardIndex * (cardH + cardGap)
                const bx = colX + (colW - cardW) / 2
                const visualRect = { x: bx, y: by, width: cardW, height: cardH }

                return (
                  <g key={entry.blockIndex}>
                    <g onMouseDown={e => startDrag(e, elementId, visualRect)} onClick={e => { e.stopPropagation(); toggleElement(elementId); }} style={{ cursor: 'pointer' }}>
                      <rect x={bx} y={by} width={cardW} height={cardH} rx={6} fill={color} opacity={0.12} stroke={color} strokeWidth={1.5} />

                      {isSelected && (
                        <rect x={bx - 1} y={by - 1} width={cardW + 2} height={cardH + 2} rx={6} fill="none" stroke="#4a90d9" strokeWidth={2} strokeDasharray="4 2" />
                      )}

                      <text x={bx + 14} y={by + 24} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#333">
                        {block.title.length > 24 ? block.title.slice(0, 22) + '...' : block.title}
                      </text>

                      {block.subtitle && (
                        <text x={bx + 14} y={by + 42} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={10} fill="#777">
                          {block.subtitle.length > 30 ? block.subtitle.slice(0, 28) + '...' : block.subtitle}
                        </text>
                      )}

                      {isSelected && renderHandles(visualRect, elementId)}
                    </g>
                  </g>
                )
              })}
          </g>
        )
      })}
    </g>
  )
}
