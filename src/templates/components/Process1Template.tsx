import { useRef, type ReactElement } from 'react'
import type { ProcessData } from '../types'
import { Arrow } from '../shared/primitives'
import { CircleBadge } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE, TITLE_COLOR } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Process1Template({ data }: { data: ProcessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, steps, outcome } = data
  const W = 960
  const stepW = 150
  const stepH = 80
  const gap = 30
  const totalW = steps.length * stepW + (steps.length - 1) * gap
  const startX = (W - totalW) / 2
  const stepY = title ? 140 : 100

  const useItems = steps.slice(0, 5)

  return (
    <g ref={svgRef}>
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill={TITLE_COLOR}>
          {title}
        </text>
      )}

      {useItems.map((step, i) => {
        const elementId = `step-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const sx = startX + i * (stepW + gap)
        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos?.x ?? sx,
          y: customPos?.y ?? stepY,
          width: customPos?.width ?? stepW,
          height: customPos?.height ?? stepH
        }

        return (
          <g key={`step-${i}`}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, visualRect)} transform={getTransform(elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={visualRect.x} y={visualRect.y} width={visualRect.width} height={visualRect.height} rx={12} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 2} strokeDasharray={isSelected ? '4 2' : undefined} />
              <CircleBadge cx={visualRect.x + visualRect.width / 2} cy={visualRect.y + 24} r={16} fill={color} label={String(step.number)} fontSize={11} />
              <text x={visualRect.x + visualRect.width / 2} y={visualRect.y + 58} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#333">
                {step.title}
              </text>
              {step.subtitle && (
                <text x={visualRect.x + visualRect.width / 2} y={visualRect.y + visualRect.height + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#888">
                  {step.subtitle.length > 22 ? step.subtitle.slice(0, 20) + '..' : step.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {i < useItems.length - 1 && (() => {
              const nextId = `step-${i + 1}`
              const nextCustomPos = templateElementPositions[nextId]
              const nextSx = startX + (i + 1) * (stepW + gap)
              const nextVisualRect = {
                x: nextCustomPos?.x ?? nextSx,
                y: nextCustomPos?.y ?? stepY,
                width: nextCustomPos?.width ?? stepW,
                height: nextCustomPos?.height ?? stepH
              }
              return (
                <Arrow
                  from={{ x: visualRect.x + visualRect.width + 2, y: visualRect.y + visualRect.height / 2 }}
                  to={{ x: nextVisualRect.x - 2, y: nextVisualRect.y + nextVisualRect.height / 2 }}
                  color={color}
                />
              )
            })()}
          </g>
        )
      })}

      {outcome && (
        <text x={W / 2} y={stepY + stepH + 80} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#888">
          Outcome: {outcome}
        </text>
      )}
    </g>
  )
}
