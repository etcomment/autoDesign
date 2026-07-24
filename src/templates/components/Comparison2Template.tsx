import { useRef, type ReactElement } from 'react'
import type { Comparison2Data } from '../types'

const SERIES_A_COLOR = '#2563eb'
const SERIES_B_COLOR = '#dc2626'
const GRID_OPACITY = 0.1

export function Comparison2Template({ data }: { data: Comparison2Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)

  const { title, seriesAName, seriesBName, dimensions } = data
  const W = 700
  const H = title ? 580 : 540
  const cx = W / 2
  const cy = title ? 370 : 330
  const maxR = 180
  const dimCount = Math.max(dimensions.length, 3)
  const angleStep = (2 * Math.PI) / dimCount

  const maxVal = Math.max(...dimensions.map(d => Math.max(d.seriesA, d.seriesB)), 100)

  const gridRings = [0.25, 0.5, 0.75, 1]

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {gridRings.map((pct, gi) => (
        <circle key={`grid-${gi}`} cx={cx} cy={cy} r={maxR * pct} fill="none" stroke="#cbd5e0" strokeWidth={gi === 3 ? 1.5 : 0.5} opacity={GRID_OPACITY} />
      ))}

      {dimensions.map((dim, di) => {
        const angle = di * angleStep - Math.PI / 2
        const lx = cx + Math.cos(angle) * (maxR + 20)
        const ly = cy + Math.sin(angle) * (maxR + 20)
        const midX = cx + Math.cos(angle) * (maxR + 10)
        const midY = cy + Math.sin(angle) * (maxR + 10)

        return (
          <g key={`axis-${di}`}>
            <line x1={cx} y1={cy} x2={midX} y2={midY} stroke="#e2e8f0" strokeWidth={1} />
            <text x={lx} y={ly + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#555">
              {dim.label}
            </text>
          </g>
        )
      })}

      {(() => {
        const pointsA = dimensions.map((dim, di) => {
          const angle = di * angleStep - Math.PI / 2
          const r = (dim.seriesA / maxVal) * maxR
          return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`
        }).join(' ')

        const pointsB = dimensions.map((dim, di) => {
          const angle = di * angleStep - Math.PI / 2
          const r = (dim.seriesB / maxVal) * maxR
          return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`
        }).join(' ')

        return (
          <g>
            <polygon points={pointsA} fill={SERIES_A_COLOR} opacity={0.2} stroke={SERIES_A_COLOR} strokeWidth={2} />
            <polygon points={pointsB} fill={SERIES_B_COLOR} opacity={0.2} stroke={SERIES_B_COLOR} strokeWidth={2} strokeDasharray="6 3" />
            {dimensions.map((dim, di) => {
              const angle = di * angleStep - Math.PI / 2
              const rA = (dim.seriesA / maxVal) * maxR
              const rB = (dim.seriesB / maxVal) * maxR
              return (
                <g key={`dots-${di}`}>
                  <circle cx={cx + Math.cos(angle) * rA} cy={cy + Math.sin(angle) * rA} r={4} fill={SERIES_A_COLOR} />
                  <circle cx={cx + Math.cos(angle) * rB} cy={cy + Math.sin(angle) * rB} r={4} fill={SERIES_B_COLOR} />
                </g>
              )
            })}
          </g>
        )
      })()}

      <rect x={20} y={H - 50} width={14} height={14} rx={3} fill={SERIES_A_COLOR} opacity={0.8} />
      <text x={40} y={H - 39} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">{seriesAName}</text>

      <rect x={140} y={H - 50} width={14} height={14} rx={3} fill={SERIES_B_COLOR} opacity={0.8} />
      <text x={160} y={H - 39} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">{seriesBName}</text>
    </g>
  )
}
