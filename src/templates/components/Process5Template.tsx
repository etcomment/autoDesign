import { useRef, type ReactElement } from 'react'
import type { Process5Data } from '../types'
import { CircleBadge } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Process5Template({ data }: { data: Process5Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const toggleElement = useTemplateStore(s => s.toggleTemplateElement)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, steps, outcome } = data
  const W = 920
  const stepSpacing = 90
  const totalHeight = (title ? 70 : 10) + steps.length * stepSpacing + (outcome ? 100 : 60)
  const H = Math.max(400, totalHeight)
  const circleX = 120
  const circleR = 20
  const cardX = 155
  const cardW = 260
  const cardH = 62
  const firstStepY = title ? 120 : 70

  const lineTop = firstStepY + circleR
  const lineBottom = firstStepY + (steps.length - 1) * stepSpacing + circleR

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {steps.length > 1 && (
        <line x1={circleX} y1={lineTop} x2={circleX} y2={lineBottom} stroke="#ddd" strokeWidth={3} strokeLinecap="round" />
      )}

      {steps.map((step, index) => {
        const elementId = `step-${index}`
        const color = tplColors[elementId] ?? PALETTE[index % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const cy = firstStepY + index * stepSpacing
        const by = cy - cardH / 2
        const isEven = index % 2 === 0
        const bgOpacity = isEven ? 0.1 : 0.18
        const visualRect = { x: cardX, y: by, width: cardW, height: cardH }

        return (
          <g key={index}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} onClick={e => { e.stopPropagation(); toggleElement(elementId); }} style={{ cursor: 'pointer' }}>
              <rect x={cardX} y={by} width={cardW} height={cardH} rx={8} fill={color} opacity={bgOpacity} stroke={color} strokeWidth={1.5} />

              <line x1={circleX + circleR} y1={cy} x2={cardX} y2={cy} stroke={color} strokeWidth={2} />

              {isSelected && (
                <rect x={cardX - 1} y={by - 1} width={cardW + 2} height={cardH + 2} rx={8} fill="none" stroke="#4a90d9" strokeWidth={2} strokeDasharray="4 2" />
              )}

              <text x={cardX + 16} y={by + 26} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#333">
                {step.title.length > 28 ? step.title.slice(0, 26) + '...' : step.title}
              </text>

              {step.subtitle && (
                <text x={cardX + 16} y={by + 44} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={10} fill="#777">
                  {step.subtitle.length > 34 ? step.subtitle.slice(0, 32) + '...' : step.subtitle}
                </text>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            <CircleBadge cx={circleX} cy={cy} r={circleR} fill={color} label={String(step.number)} fontSize={13} />
          </g>
        )
      })}

      {outcome && (
        <text x={W / 2} y={H - 40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={600} fill="#888">
          Outcome: {outcome}
        </text>
      )}
    </g>
  )
}
