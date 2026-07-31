import { useRef, type ReactElement } from 'react'
import type { Comparison5Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { StarIcon } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Comparison5Template({ data }: { data: Comparison5Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { entries } = data
  const count = Math.max(1, entries.length)
  const W = 800
  const cardW = Math.min(220, (W - 80 - (count - 1) * 20) / count)
  const gap = count > 1 ? Math.min(30, (W - 80 - count * cardW) / (count - 1)) : 30
  const totalW = count * cardW + (count - 1) * gap
  const startX = Math.max(40, (W - totalW) / 2)
  const cardY = 60
  const cardH = 140
  const maxScore = Math.max(...entries.map(e => e.score), 100)

  return (
    <g ref={svgRef}>
      {entries.map((entry, i) => {
        const elementId = `entry-${i}`
        const color = tplColors[elementId] ?? (entry.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!)
        const isSelected = selectedIds.has(elementId)
        const cx = startX + i * (cardW + gap)
        const isWinner = entry.score === Math.max(...entries.map(e => e.score))
        const barW = Math.max(10, (entry.score / maxScore) * (cardW - 20))
        const defaultBbox = { x: cx, y: cardY, width: cardW, height: cardH }

        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={12} fill="white" stroke={isSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSelected ? 2.5 : 1.5} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />

            {isWinner && (
              <g transform={`translate(${bbox.x + bbox.width / 2 - 14}, ${bbox.y - 18})`}>
                <StarIcon size={28} fill="#ffc107" color="#e0a800" />
              </g>
            )}

            <text x={bbox.x + bbox.width / 2} y={bbox.y + 50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={32} fontWeight={700} fill={color}>
              {entry.score}
            </text>

            <rect x={bbox.x + 10} y={bbox.y + 64} width={barW} height={8} rx={4} fill={color} opacity={0.8} />
            <rect x={bbox.x + 10} y={bbox.y + 64} width={bbox.width - 20} height={8} rx={4} fill={color} opacity={0.15} />

            <text x={bbox.x + bbox.width / 2} y={bbox.y + 100} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#333">
              {entry.name}
            </text>

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}

