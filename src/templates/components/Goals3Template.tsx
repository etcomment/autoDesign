import { useRef, type ReactElement } from 'react'
import type { GoalsData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

export function Goals3Template({ data }: { data: GoalsData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, metrics } = data
  const W = 1000
  const H = 500
  const gaugeR = 70
  const gaugeY = 220
  const gaugeGap = 60
  const count = Math.min(metrics.length, 4)
  const totalW = count * gaugeR * 2 + (count - 1) * gaugeGap
  const startX = (W - totalW) / 2

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={46} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {metrics.slice(0, count).map((metric, i) => {
        const elementId = `gauge-${i}`
        const cx = startX + gaugeR + i * (gaugeR * 2 + gaugeGap)
        const cy = gaugeY
        const targetNum = parseFloat(metric.target.replace(/[^0-9.]/g, '')) || 100
        const valueNum = parseFloat(metric.value.replace(/[^0-9.]/g, '')) || 0
        const pct = Math.min(valueNum / targetNum, 1)
        const arcAngle = 180 + pct * 180
        const startAngle = 180
        const endAngle = arcAngle

        const startRad = (startAngle * Math.PI) / 180
        const endRad = (endAngle * Math.PI) / 180
        const x1 = cx + gaugeR * Math.cos(startRad)
        const y1 = cy + gaugeR * Math.sin(startRad)
        const x2 = cx + gaugeR * Math.cos(endRad)
        const y2 = cy + gaugeR * Math.sin(endRad)
        const largeArc = pct > 0.5 ? 1 : 0

        const fillColor = pct >= 0.8 ? '#2ecc71' : pct >= 0.5 ? '#f39c12' : '#e74c3c'
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: cx - gaugeR - 10, y: cy - gaugeR - 10, width: gaugeR * 2 + 20, height: gaugeR + 50 }

        return (
          <g key={i}>
            <path
              d={`M ${cx - gaugeR} ${cy} A ${gaugeR} ${gaugeR} 0 0 1 ${cx + gaugeR} ${cy}`}
              fill="none"
              stroke="#e8e8e8"
              strokeWidth={14}
            />
            <path
              d={`M ${x1} ${y1} A ${gaugeR} ${gaugeR} 0 ${largeArc} 1 ${x2} ${y2}`}
              fill="none"
              stroke={fillColor}
              strokeWidth={14}
              strokeLinecap="round"
            />
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={18} fontWeight={700} fill="#1a1a2e">
                {Math.round(pct * 100)}%
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
            <text x={cx} y={cy + 50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
              {metric.label}
            </text>
            <text x={cx} y={cy + 68} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#999">
              {metric.value} / {metric.target}
            </text>
          </g>
        )
      })}
    </g>
  )
}
