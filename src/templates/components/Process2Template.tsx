import { useRef, type ReactElement } from 'react'
import type { Process2Data } from '../types'
import { ChevronArrow, Arrow, CircleBadge } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Process2Template({ data }: { data: Process2Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const toggleElement = useTemplateStore(s => s.toggleTemplateElement)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, steps, outcome } = data
  const W = 1000
  const normalW = 130
  const normalH = 48
  const largeW = 180
  const largeH = 66
  const gap = 14
  const circleR = 14

  const normalCount = Math.max(steps.length - 1, 0)
  const totalWidth = normalCount * normalW + largeW + (steps.length - 1) * gap
  const startX = (W - totalWidth) / 2
  const stepY = 160

  return (
    <g ref={svgRef}>

      {title && (
        <text x={W / 2} y={50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {steps.map((step, index) => {
        const elementId = `step-${index}`
        const isLast = index === steps.length - 1
        const blockW = isLast ? largeW : normalW
        const blockH = isLast ? largeH : normalH
        const bx = startX + index * (normalW + gap) + (isLast ? (normalW - largeW) : 0)
        const by = isLast ? stepY - (largeH - normalH) / 2 : stepY
        const color = tplColors[elementId] ?? PALETTE[index % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos?.x ?? bx,
          y: customPos?.y ?? by,
          width: customPos?.width ?? blockW,
          height: customPos?.height ?? blockH
        }

        return (
          <g key={index}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, visualRect)} transform={getTransform(elementId, visualRect)} onClick={e => { e.stopPropagation(); toggleElement(elementId); }} style={{ cursor: 'pointer' }}>
              <ChevronArrow x={visualRect.x} y={visualRect.y} width={visualRect.width} height={visualRect.height} fill={color} />
              {isSelected && (
                <rect x={visualRect.x - 1} y={visualRect.y - 1} width={visualRect.width + 2} height={visualRect.height + 2} rx={2} fill="none" stroke="#4a90d9" strokeWidth={2.5} strokeDasharray="4 2" />
              )}

              <CircleBadge cx={visualRect.x + 36} cy={visualRect.y + visualRect.height / 2} r={circleR} fill={isLast ? '#fff' : 'white'} label={String(step.number)} fontSize={11} />
              {isLast && (
                <circle cx={visualRect.x + 36} cy={visualRect.y + visualRect.height / 2} r={circleR} fill="none" stroke="white" strokeWidth={1.5} />
              )}

              <text
                x={visualRect.x + visualRect.width / 2 + 12}
                y={visualRect.y + visualRect.height / 2 + (visualRect.height > 50 ? -4 : 4)}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={isLast ? 14 : 11}
                fontWeight={700}
                fill={color === '#f2cb13' ? '#333' : 'white'}
              >
                {step.title.length > (isLast ? 18 : 14) ? step.title.slice(0, isLast ? 16 : 12) + '...' : step.title}
              </text>

              {step.subtitle && (
                <text
                  x={visualRect.x + visualRect.width / 2 + 12}
                  y={visualRect.y + visualRect.height / 2 + (visualRect.height > 50 ? 14 : 18)}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={9}
                  fill={color === '#f2cb13' ? '#555' : 'rgba(255,255,255,0.8)'}
                >
                  {step.subtitle.length > 22 ? step.subtitle.slice(0, 20) + '...' : step.subtitle}
                </text>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {index < steps.length - 1 && (() => {
              const nextId = `step-${index + 1}`
              const isNextLast = (index + 1) === steps.length - 1
              const nextBlockW = isNextLast ? largeW : normalW
              const nextBlockH = isNextLast ? largeH : normalH
              const nextBx = startX + (index + 1) * (normalW + gap) + (isNextLast ? (normalW - largeW) : 0)
              const nextBy = isNextLast ? stepY - (largeH - normalH) / 2 : stepY
              const nextCustomPos = templateElementPositions[nextId]
              const nextVisualRect = {
                x: nextCustomPos?.x ?? nextBx,
                y: nextCustomPos?.y ?? nextBy,
                width: nextCustomPos?.width ?? nextBlockW,
                height: nextCustomPos?.height ?? nextBlockH
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
        <text x={W / 2} y={stepY + 110} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#555">
          RESULT: {outcome}
        </text>
      )}
    </g>
  )
}
