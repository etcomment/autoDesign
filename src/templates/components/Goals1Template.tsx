import { useRef, type ReactElement } from 'react'
import type { GoalsData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

export function Goals1Template({ data }: { data: GoalsData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, centerGoal, metrics } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2 + 20
  const ringColors = ['#ffe0e0', '#ffe0b2', '#fff9c4', '#c8e6c9', '#b3e5fc']
  const ringCount = Math.min(metrics.length, 5)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={46} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {metrics.slice(0, ringCount).map((_, i) => {
        const r = 45 + i * 50
        const color = ringColors[ringCount - 1 - i]!
        return (
          <g key={`ring-${i}`}>
            <circle cx={cx} cy={cy} r={r} fill={color} stroke={i === ringCount - 1 ? '#4a90d9' : '#ccc'} strokeWidth={1.5} opacity={0.5} />
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r={35} fill="#e74c3c" />
      <circle cx={cx} cy={cy} r={20} fill="#1a1a2e" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={8} fontWeight={700} fill="white">
        {centerGoal.length > 10 ? centerGoal.slice(0, 8) + '..' : centerGoal}
      </text>

      <line x1={cx} y1={cy - 45} x2={cx} y2={cy - 285} stroke="#4a90d9" strokeWidth={2} />
      <polygon points={`${cx - 6},${cy - 285} ${cx + 6},${cy - 285} ${cx},${cy - 300}`} fill="#4a90d9" />

      {metrics.slice(0, ringCount).map((metric, i) => {
        const elementId = `metric-${i}`
        const angle = -1.5 + i * 0.75
        const r = 70 + i * 50
        const lx = cx + r * Math.cos(angle)
        const ly = cy + r * Math.sin(angle)
        const boxW = 110
        const boxH = 44
        const boxX = lx - boxW / 2
        const boxY = ly - boxH / 2
        const visualRect = { x: boxX, y: boxY, width: boxW, height: boxH }
        const isSelected = selectedIds.has(elementId)

        return (
          <g key={`metric-${i}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={boxX} y={boxY} width={boxW} height={boxH} rx={6} fill="white" stroke={isSelected ? '#4a90d9' : '#4a90d9'} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={lx} y={ly - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#333">
                {metric.label}
              </text>
              <text x={lx} y={ly + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#888">
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
