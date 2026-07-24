import { useRef, type ReactElement } from 'react'
import type { GoalsData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

export function Goals5Template({ data }: { data: GoalsData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, metrics } = data
  const W = 1000
  const H = 500
  const thermoW = 44
  const thermoH = 220
  const bulbR = 28
  const gap = 80
  const startY = 110
  const count = Math.min(metrics.length, 4)
  const totalW = count * thermoW + (count - 1) * gap
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
        const elementId = `thermo-${i}`
        const targetNum = parseFloat(metric.target.replace(/[^0-9.]/g, '')) || 100
        const valueNum = parseFloat(metric.value.replace(/[^0-9.]/g, '')) || 0
        const pct = Math.min(valueNum / targetNum, 1)
        const x = startX + i * (thermoW + gap)
        const tubeH = thermoH - bulbR
        const fillH = pct * tubeH
        const fillColor = pct >= 0.8 ? '#2ecc71' : pct >= 0.5 ? '#f39c12' : '#e74c3c'
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: x - thermoW / 2 - 10, y: startY - 10, width: thermoW + 20, height: thermoH + 30 }

        return (
          <g key={i}>
            <rect x={x - thermoW / 2 + 4} y={startY} width={thermoW - 8} height={tubeH} rx={thermoW / 2 - 4} fill="#f0f0f0" stroke="#d0d0d0" strokeWidth={1.5} />
            <circle cx={x} cy={startY + tubeH} r={bulbR} fill="#f0f0f0" stroke="#d0d0d0" strokeWidth={1.5} />

            <line x1={x - thermoW / 2 - 14} y1={startY + tubeH * 0.2} x2={x + thermoW / 2 + 14} y2={startY + tubeH * 0.2} stroke="#e0e0e0" strokeWidth={1} strokeDasharray="3 3" />
            <text x={x + thermoW / 2 + 20} y={startY + tubeH * 0.2 + 4} fontFamily="Arial, sans-serif" fontSize={9} fill="#aaa">
              TARGET
            </text>

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              {fillH > 0 && (
                <>
                  <rect x={x - thermoW / 2 + 4} y={startY + tubeH - fillH} width={thermoW - 8} height={fillH} rx={fillH >= tubeH - 4 ? thermoW / 2 - 4 : 0} fill={fillColor} opacity={0.85} />
                  <circle cx={x} cy={startY + tubeH} r={bulbR - 2} fill={fillColor} opacity={0.85} />
                </>
              )}
              <text x={x} y={startY + tubeH + bulbR + 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={fillColor}>
                {Math.round(pct * 100)}%
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            <text x={x} y={startY + tubeH + bulbR + 46} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
              {metric.label}
            </text>
            <text x={x} y={startY + tubeH + bulbR + 64} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#999">
              {metric.value} / {metric.target}
            </text>
          </g>
        )
      })}
    </g>
  )
}
