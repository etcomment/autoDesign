import { useRef, type ReactElement } from 'react'
import type { ProcessData } from '../types'
import { CurvedPath, CircleBadge } from '../shared/primitives'
import { StarIcon } from '../shared/icons'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const COLORS = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function ProcessTemplate({ data }: { data: ProcessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, steps, outcome } = data
  const W = 1000
  const H = 600

  const halfCount = Math.ceil(steps.length / 2)
  const topSteps = steps.slice(0, halfCount)
  const bottomSteps = steps.slice(halfCount)

  const topStartX = 160
  const topEndX = 800
  const topY = 170
  const topWidth = topEndX - topStartX

  const bottomStartX = 800
  const bottomEndX = 160
  const bottomY = 380
  const bottomWidth = bottomStartX - bottomEndX

  const topPositions = topSteps.map((_, i) => ({
    x: topStartX + (topWidth * i) / Math.max(topSteps.length - 1, 1),
    y: topY,
    stepIndex: i,
  }))

  const bottomPositions = bottomSteps.map((_, i) => ({
    x: bottomStartX - (bottomWidth * i) / Math.max(bottomSteps.length - 1, 1),
    y: bottomY,
    stepIndex: halfCount + i,
  }))

  const allPositions = [...topPositions, ...bottomPositions]

  const startPoint = { x: 80, y: topY }

  const lastPos = allPositions.length > 0 ? allPositions[allPositions.length - 1]! : { x: 180, y: topY }
  const outcomeX = lastPos.x
  const outcomeY = 530

  const curvePoints: { x: number; y: number }[] = [startPoint]

  if (topPositions.length > 0) {
    for (const p of topPositions) curvePoints.push({ x: p.x, y: p.y })
    const lastTop = topPositions[topPositions.length - 1]!
    if (bottomPositions.length > 0) {
      const firstBottom = bottomPositions[0]!
      curvePoints.push({ x: lastTop.x + 50, y: lastTop.y })
      curvePoints.push({ x: firstBottom.x + 50, y: (lastTop.y + firstBottom.y) / 2 })
      curvePoints.push({ x: firstBottom.x, y: firstBottom.y - 50 })
      for (const p of bottomPositions) curvePoints.push({ x: p.x, y: p.y })
    }
    const finalPos = bottomPositions.length > 0 ? bottomPositions[bottomPositions.length - 1]! : lastTop
    curvePoints.push({ x: finalPos.x - 50, y: finalPos.y })
    curvePoints.push({ x: outcomeX - 50, y: (finalPos.y + outcomeY) / 2 })
  } else {
    curvePoints.push({ x: outcomeX, y: outcomeY })
  }

  curvePoints.push({ x: outcomeX, y: outcomeY })

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <CurvedPath points={curvePoints} color="#bbb" strokeWidth={2.5} />

      <text x={startPoint.x - 16} y={startPoint.y + 4} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#888" letterSpacing={1}>
        START
      </text>

      {allPositions.map((pos) => {
        const step = steps[pos.stepIndex]!
        const elementId = `step-${pos.stepIndex}`
        const defaultColor = COLORS[pos.stepIndex % COLORS.length]!
        const color = tplColors[elementId] ?? defaultColor
        
        const isSelected = selectedIds.has(elementId)
        const isTop = topPositions.some(tp => tp.stepIndex === pos.stepIndex)
        const labelOffsetY = isTop ? 28 : -28
        const visualRect = isTop
          ? { x: pos.x - 55, y: pos.y - 20, width: 110, height: 64 }
          : { x: pos.x - 55, y: pos.y - 50, width: 110, height: 64 }

        return (
          <g key={pos.stepIndex}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <CircleBadge cx={pos.x} cy={pos.y} r={16} fill={color} label={String(step.number)} fontSize={12} />
              {isSelected && (
                <>
                  <circle cx={pos.x} cy={pos.y} r={18} fill="none" stroke="#4a90d9" strokeWidth={2.5} strokeDasharray="4 2" />
                  <rect x={visualRect.x} y={visualRect.y} width={visualRect.width} height={visualRect.height} rx={4} fill="none" stroke="#4a90d9" strokeWidth={1} strokeDasharray="4 2" opacity={0.5} />
                </>
              )}

              <text x={pos.x} y={pos.y + labelOffsetY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#333">
                {step.title}
              </text>

              {step.subtitle && (
                <text x={pos.x} y={pos.y + labelOffsetY + 15} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#777">
                  {step.subtitle.length > 24 ? step.subtitle.slice(0, 22) + '...' : step.subtitle}
                </text>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      <g transform={`translate(${outcomeX + 8}, ${outcomeY - 40})`}>
        <StarIcon size={32} fill="#ffc107" color="#e0a800" />
      </g>

      {outcome && (
        <text x={outcomeX + 52} y={outcomeY - 12} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#333">
          {outcome}
        </text>
      )}
    </g>
  )
}
