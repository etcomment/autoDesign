import { useRef, type ReactElement } from 'react'
import type { Comparison5Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { StarIcon } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Comparison5Template({ data }: { data: Comparison5Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, entries } = data
  const W = 800
  const H = title ? 520 : 480
  const cardW = 220
  const gap = 30
  const totalW = entries.length * cardW + (entries.length - 1) * gap
  const startX = (W - totalW) / 2
  const cardY = title ? 140 : 90
  const cardH = 140
  const maxScore = Math.max(...entries.map(e => e.score), 100)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {entries.map((entry, i) => {
        const elementId = `entry-${i}`
        const color = tplColors[elementId] ?? (entry.color ?? PALETTE[i % PALETTE.length]!)
        const isSelected = selectedIds.has(elementId)
        const cx = startX + i * (cardW + gap)
        const isWinner = entry.score === Math.max(...entries.map(e => e.score))
        const barW = (entry.score / maxScore) * (cardW - 20)
        const visualRect = { x: cx, y: cardY, width: cardW, height: cardH }

        return (
          <g key={`entry-${i}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={cx} y={cardY} width={cardW} height={cardH} rx={12} fill="white" stroke={isSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSelected ? 2.5 : 1.5} />

              {isWinner && (
                <g transform={`translate(${cx + cardW / 2 - 14}, ${cardY - 18})`}>
                  <StarIcon size={28} fill="#ffc107" color="#e0a800" />
                </g>
              )}

              <text x={cx + cardW / 2} y={cardY + 50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={32} fontWeight={700} fill={color}>
                {entry.score}
              </text>

              <rect x={cx + 10} y={cardY + 64} width={barW} height={8} rx={4} fill={color} opacity={0.8} />
              <rect x={cx + 10} y={cardY + 64} width={cardW - 20} height={8} rx={4} fill={color} opacity={0.15} />

              <text x={cx + cardW / 2} y={cardY + 100} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#333">
                {entry.name}
              </text>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
