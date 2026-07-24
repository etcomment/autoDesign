import { useRef, type ReactElement } from 'react'
import type { GoalsData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

export function Goals4Template({ data }: { data: GoalsData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, metrics } = data
  const W = 900
  const H = 500
  const barMaxW = 380
  const barH = 36
  const gap = 28
  const startX = 140
  const startY = 110

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={46} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {metrics.slice(0, 5).map((metric, i) => {
        const elementId = `bar-${i}`
        const targetNum = parseFloat(metric.target.replace(/[^0-9.]/g, '')) || 100
        const valueNum = parseFloat(metric.value.replace(/[^0-9.]/g, '')) || 0
        const pct = Math.min(valueNum / targetNum, 1)
        const barWidth = pct * barMaxW
        const y = startY + i * (barH + gap)
        const fillColor = pct >= 0.8 ? '#2ecc71' : pct >= 0.5 ? '#f39c12' : '#e74c3c'
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: startX, y, width: barMaxW, height: barH }

        return (
          <g key={i}>
            <text x={startX - 12} y={y + barH / 2 + 5} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#333">
              {metric.label}
            </text>
            <rect x={startX} y={y} width={barMaxW} height={barH} rx={6} fill="#f0f0f0" />
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={startX} y={y} width={barWidth} height={barH} rx={6} fill={fillColor} opacity={0.85} stroke={isSelected ? '#4a90d9' : 'none'} strokeWidth={isSelected ? 2.5 : 0} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={startX + barWidth / 2} y={y + barH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                {Math.round(pct * 100)}%
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
            <text x={startX + barMaxW + 14} y={y + barH / 2 + 5} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={11} fill="#777">
              {metric.value} / {metric.target}
            </text>
          </g>
        )
      })}
    </g>
  )
}
