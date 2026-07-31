import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

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
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { metrics } = data
  const displayed = metrics && metrics.length > 0 ? metrics : [
    { label: 'CPU Usage', value: '64%', change: '+2%' },
    { label: 'Memory', value: '82%', change: '+5%' },
    { label: 'Disk IO', value: '45%', change: '-1%' },
    { label: 'Bandwidth', value: '30%', change: '+0%' },
  ]

  const W = 900
  const count = Math.min(displayed.length, 4)
  const totalW = count * (GAUGE_R * 2 + GAUGE_GAP) - GAUGE_GAP
  const startX = (W - totalW) / 2
  const cy = 180

  const values = displayed.map(m => {
    const v = parseValue(m.value)
    return Math.min(Math.max(v / 100, 0.05), 0.98)
  })

  return (
    <g ref={svgRef}>
      {displayed.slice(0, count).map((metric, i) => {
        const elementId = `metric-${i}`
        const cx = startX + i * (GAUGE_R * 2 + GAUGE_GAP) + GAUGE_R
        const color = tplColors[elementId] ?? metric.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const pct = values[i]!
        const needleAngle = 180 - pct * 180

        const bgArc = gaugeArc(GAUGE_R, 0, 180)
        const valArc = gaugeArc(GAUGE_R, 180 - pct * 180, 180)

        const defaultBbox = { x: cx - GAUGE_R, y: cy - GAUGE_R - 10, width: GAUGE_R * 2, height: GAUGE_R + 100 }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const centerCx = bbox.x + bbox.width / 2
        const centerCy = bbox.y + GAUGE_R + 10

        const nx = centerCx + GAUGE_R * 0.75 * Math.cos((needleAngle * Math.PI) / 180)
        const ny = centerCy + GAUGE_R * 0.75 * Math.sin((needleAngle * Math.PI) / 180)

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <g transform={`translate(${centerCx}, ${centerCy})`}>
              <path d={bgArc} fill="none" stroke="#edf2f7" strokeWidth={14} strokeLinecap="round" />
              <path d={valArc} fill="none" stroke={color} strokeWidth={14} strokeLinecap="round" />

              <line x1={0} y1={0} x2={nx - centerCx} y2={ny - centerCy} stroke="#1a202c" strokeWidth={2.5} />
              <circle cx={0} cy={0} r={6} fill="#1a202c" />
              <circle cx={0} cy={0} r={3} fill="white" />
            </g>

            <text x={centerCx} y={centerCy + GAUGE_R + 32} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={18} fontWeight={800} fill={color}>
              {metric.value}
            </text>

            <text x={centerCx} y={centerCy + GAUGE_R + 52} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#718096">
              {metric.label.toUpperCase()}
            </text>

            {metric.change && (
              <text x={centerCx} y={centerCy + GAUGE_R + 68} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={metric.change.startsWith('+') ? '#48bb78' : '#f56565'}>
                {metric.change}
              </text>
            )}

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}

