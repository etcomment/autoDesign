import { useRef, type ReactElement } from 'react'
import type { GoalsData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

export function Goals2Template({ data }: { data: GoalsData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, centerGoal, metrics } = data
  const W = 900
  const H = 600
  const peakX = W / 2
  const peakY = 130
  const baseY = 430
  const halfBase = 300

  const pathD = `M ${peakX - halfBase} ${baseY} L ${peakX - halfBase * 0.5} ${peakY + 140} L ${peakX - halfBase * 0.2} ${peakY + 60} L ${peakX} ${peakY} L ${peakX + halfBase * 0.2} ${peakY + 60} L ${peakX + halfBase * 0.5} ${peakY + 140} L ${peakX + halfBase} ${baseY} Z`

  const stepPositions = metrics.slice(0, 4).map((_, i) => {
    const t = 0.15 + i * 0.23
    const sx = peakX - halfBase + (i + 1) * (halfBase * 2) / 5
    const sy = peakY + (baseY - peakY) * (1 - t) + i * 40
    return { x: sx, y: sy }
  })

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={46} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <path d={pathD} fill="#e8f5e9" stroke="#4caf50" strokeWidth={2} />

      <polygon points={`${peakX - 16},${peakY + 8} ${peakX + 16},${peakY + 8} ${peakX},${peakY - 16}`} fill="#4caf50" />
      <rect x={peakX - 16} y={peakY - 2} width={12} height={20} rx={1} fill="#4caf50" />

      <text x={peakX} y={peakY - 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#4caf50">
        GOAL
      </text>
      <text x={peakX} y={peakY + 42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#1a1a2e">
        {centerGoal}
      </text>

      {metrics.slice(0, 4).map((metric, i) => {
        const elementId = `step-${i}`
        const pos = stepPositions[i]!
        const boxW = 130
        const boxH = 54
        const bx = pos.x - boxW / 2
        const by = pos.y - boxH / 2
        const visualRect = { x: bx, y: by, width: boxW, height: boxH }
        const isSelected = selectedIds.has(elementId)

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={bx} y={by} width={boxW} height={boxH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : '#4caf50'} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={pos.x} y={pos.y - 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#333">
                {metric.label}
              </text>
              <text x={pos.x} y={pos.y + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#888">
                {metric.value} / {metric.target}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
