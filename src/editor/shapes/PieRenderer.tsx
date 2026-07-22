import { useDiagramStore } from '../../store/diagramStore'
import type { PieSlice } from '../../mermaid/parsePieChart'

const COLORS = ['#4a90d9', '#f44336', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4', '#e91e63', '#ffeb3b', '#3f51b5', '#009688', '#ff5722', '#607d8b']

export function PieRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)

  if (diagramType !== 'pie' || !diagramData?.slices) return null
  const slices = diagramData.slices as PieSlice[]

  const total = slices.reduce((sum, s) => sum + s.value, 0)
  if (total === 0) return null

  const cx = 300
  const cy = 250
  const r = 180
  let currentAngle = 0

  return (
    <g>
      {slices.map((slice, i) => {
        const percent = slice.value / total
        const angle = percent * 360
        const endAngle = currentAngle + angle
        const startRad = (currentAngle * Math.PI) / 180
        const endRad = (endAngle * Math.PI) / 180

        const x1 = cx + r * Math.cos(startRad)
        const y1 = cy + r * Math.sin(startRad)
        const x2 = cx + r * Math.cos(endRad)
        const y2 = cy + r * Math.sin(endRad)

        const largeArc = angle > 180 ? 1 : 0
        const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`

        const midAngle = ((currentAngle + endAngle) / 2) * Math.PI / 180
        const labelR = r * 0.65
        const lx = cx + labelR * Math.cos(midAngle)
        const ly = cy + labelR * Math.sin(midAngle)

        currentAngle = endAngle

        return (
          <g key={i}>
            <path d={d} fill={COLORS[i % COLORS.length]!} stroke="white" strokeWidth={1} />
            <text x={lx} y={ly} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="white" fontWeight={600}>
              {Math.round(percent * 100)}%
            </text>
          </g>
        )
      })}
      {slices.map((slice, i) => (
        <g key={`legend-${i}`} transform={`translate(560, ${30 + i * 22})`}>
          <rect width={12} height={12} fill={COLORS[i % COLORS.length]!} rx={2} />
          <text x={18} y={10} fontFamily="Arial, sans-serif" fontSize={11} fill="#333">
            {slice.label} ({slice.value})
          </text>
        </g>
      ))}
    </g>
  )
}
