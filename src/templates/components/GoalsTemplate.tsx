import { useRef, type ReactElement } from 'react'
import type { GoalsData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

export function GoalsTemplate({ data }: { data: GoalsData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, centerGoal, metrics } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2 + 20
  const ringColors = ['#e8f4fd', '#cce5ff', '#99ccff', '#66b2ff', '#3399ff']

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={46} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {metrics.map((_, i) => {
        const r = 50 + i * 50
        const color = ringColors[i % ringColors.length]!
        const strokeColor = i === metrics.length - 1 ? '#4a90d9' : '#a0c4e8'
        return (
          <g key={`ring-${i}`}>
            <circle cx={cx} cy={cy} r={r} fill={color} stroke={strokeColor} strokeWidth={1.5} opacity={0.3 + i * 0.1} />
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r={38} fill="#1a1a2e" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
        {centerGoal.length > 12 ? centerGoal.slice(0, 10) + '..' : centerGoal}
      </text>

      <line x1={cx} y1={cy - 38} x2={cx} y2={cy - 240} stroke="#4a90d9" strokeWidth={2} />
      <polygon points={`${cx - 6},${cy - 240} ${cx + 6},${cy - 240} ${cx},${cy - 256}`} fill="#4a90d9" />

      {metrics.map((metric, i) => {
        const elementId = `metric-${i}`
        const angle = -1.2 + (i / Math.max(metrics.length - 1, 1)) * 2.4
        const r = 75 + i * 50
        const labelX = cx + r * Math.cos(angle)
        const labelY = cy + r * Math.sin(angle)
        const boxW = 104
        const boxH = 48
        const boxX = labelX - boxW / 2
        const boxY = labelY - boxH / 2
        const visualRect = { x: boxX, y: boxY, width: boxW, height: boxH }
        const isSelected = selectedIds.has(elementId)

        return (
          <g key={`label-${i}`}>
            <line x1={cx} y1={cy} x2={labelX} y2={labelY} stroke="#aaa" strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={boxX} y={boxY} width={boxW} height={boxH} rx={6} fill="white" stroke={isSelected ? '#4a90d9' : '#4a90d9'} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={labelX} y={labelY - 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#333">
                {metric.label}
              </text>
              <text x={labelX} y={labelY + 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#888">
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
