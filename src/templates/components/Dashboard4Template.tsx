import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800']
const GAUGE_R = 70
const GAUGE_GAP = 40

function parseValue(val: string): number {
  const num = parseFloat(val.replace(/[^0-9.]/g, ''))
  return isNaN(num) ? 0 : num
}

function gaugeArc(r: number, startAngle: number, endAngle: number): string {
  const sRad = (startAngle * Math.PI) / 180
  const eRad = (endAngle * Math.PI) / 180
  const sx = r * Math.cos(sRad)
  const sy = r * Math.sin(sRad)
  const ex = r * Math.cos(eRad)
  const ey = r * Math.sin(eRad)
  const large = endAngle - startAngle > 180 ? 1 : 0
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`
}

export function Dashboard4Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, metrics } = data
  const W = 900
  const H = 500
  const displayed = metrics.slice(0, 4)
  const totalW = displayed.length * (GAUGE_R * 2 + GAUGE_GAP) - GAUGE_GAP
  const startX = (W - totalW) / 2
  const cy = 220

  const values = displayed.map(m => {
    const v = parseValue(m.value)
    return Math.min(Math.max(v / 100, 0.05), 0.98)
  })

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="#f7fafc" rx={8} />
      {title && (
        <text x={W / 2} y={44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {displayed.map((metric, i) => {
        const cx = startX + i * (GAUGE_R * 2 + GAUGE_GAP) + GAUGE_R
        const color = tplColors[`metric-${i}`] ?? metric.color ?? PALETTE[i % PALETTE.length]!
        const pct = values[i]!
        const needleAngle = 180 - pct * 180

        const bgArc = gaugeArc(GAUGE_R, 0, 180)
        const valArc = gaugeArc(GAUGE_R, 180 - pct * 180, 180)

        const nx = cx + GAUGE_R * 0.75 * Math.cos((needleAngle * Math.PI) / 180)
        const ny = cy + GAUGE_R * 0.75 * Math.sin((needleAngle * Math.PI) / 180)

        const elementId = `metric-${i}`
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: cx - GAUGE_R, y: cy - GAUGE_R - 10, width: GAUGE_R * 2, height: GAUGE_R + 60 }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${cx}, ${cy})`}>
                {isSelected && (
                  <rect x={-GAUGE_R - 5} y={-GAUGE_R - 15} width={GAUGE_R * 2 + 10} height={GAUGE_R + 75} rx={8} fill="none" stroke="#4a90d9" strokeWidth={2} strokeDasharray="6 3" />
                )}
                <path d={bgArc} fill="none" stroke="#edf2f7" strokeWidth={14} strokeLinecap="round" />
                <path d={valArc} fill="none" stroke={color} strokeWidth={14} strokeLinecap="round" />

                <line x1={0} y1={0} x2={nx - cx} y2={ny - cy} stroke="#1a202c" strokeWidth={2.5} />
                <circle cx={0} cy={0} r={6} fill="#1a202c" />
                <circle cx={0} cy={0} r={3} fill="white" />
              </g>

              <text x={cx} y={cy + GAUGE_R + 44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={18} fontWeight={800} fill={color}>
                {metric.value}
              </text>

              <text x={cx} y={cy + GAUGE_R + 66} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#718096">
                {metric.label.toUpperCase()}
              </text>

              {metric.change && (
                <text x={cx} y={cy + GAUGE_R + 82} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={metric.change.startsWith('+') ? '#48bb78' : '#f56565'}>
                  {metric.change}
                </text>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
