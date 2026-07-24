import { useRef, type ReactElement } from 'react'
import type { Process4Data } from '../types'
import { Arrow, CircleBadge } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Process4Template({ data }: { data: Process4Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const toggleElement = useTemplateStore(s => s.toggleTemplateElement)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, steps, outcome } = data
  const W = 1000
  const H = 380
  const cardW = 200
  const cardH = 95
  const gap = 18
  const circleR = 16
  const arrowInset = 14

  const totalWidth = steps.length * cardW + (steps.length - 1) * gap
  const startX = (W - totalWidth) / 2
  const cardY = 150

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {steps.map((step, index) => {
        const elementId = `step-${index}`
        const color = tplColors[elementId] ?? PALETTE[index % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const bx = startX + index * (cardW + gap)
        const by = cardY
        const visualRect = { x: bx, y: by, width: cardW, height: cardH }

        return (
          <g key={index}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} onClick={e => { e.stopPropagation(); toggleElement(elementId); }} style={{ cursor: 'pointer' }}>
              <rect x={bx} y={by} width={cardW} height={cardH} rx={8} fill={color} opacity={0.12} stroke={color} strokeWidth={1.5} />

              <CircleBadge cx={bx + cardW / 2} cy={by + 28} r={circleR} fill={color} label={String(step.number)} fontSize={13} />

              <text x={bx + cardW / 2} y={by + 58} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#333">
                {step.title.length > 20 ? step.title.slice(0, 18) + '...' : step.title}
              </text>

              {step.subtitle && (
                <text x={bx + cardW / 2} y={by + 78} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#666">
                  {step.subtitle.length > 26 ? step.subtitle.slice(0, 24) + '...' : step.subtitle}
                </text>
              )}

              {isSelected && (
                <rect x={bx - 1} y={by - 1} width={cardW + 2} height={cardH + 2} rx={8} fill="none" stroke="#4a90d9" strokeWidth={2} strokeDasharray="4 2" />
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {index < steps.length - 1 && (
              <Arrow
                from={{ x: bx + cardW + arrowInset / 2, y: by + cardH / 2 }}
                to={{ x: bx + cardW + gap - arrowInset / 2, y: by + cardH / 2 }}
                color="#999"
              />
            )}
          </g>
        )
      })}

      {outcome && (
        <text x={W / 2} y={H - 40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#777">
          Outcome: {outcome}
        </text>
      )}
    </g>
  )
}
