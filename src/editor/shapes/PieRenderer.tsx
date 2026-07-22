import { useDiagramStore } from '../../store/diagramStore'
import type { PieData } from '../../mermaid/parsePieChart'

const DEFAULT_PALETTE = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
  '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',
]

export function PieRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'pie' || !diagramData?.slices) return null
  const data = diagramData as unknown as PieData
  const slices = data.slices

  const total = slices.reduce((sum, s) => sum + s.value, 0)
  if (total === 0) return null

  const cx = 300
  const cy = 250
  const r = 180
  let currentAngle = 0

  return (
    <g>
      {data.title && (
        <text x={cx} y={30} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="#333">
          {data.title}
        </text>
      )}
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

        const elementKey = `slice-${slice.label}`
        const color = diagramColors[elementKey] ?? DEFAULT_PALETTE[i % 20]
        const isSelected = selectedIds.has(elementKey)

        currentAngle = endAngle

        return (
          <g key={i}>
            <path
              d={d}
              fill={color}
              stroke={isSelected ? '#4a90d9' : 'white'}
              strokeWidth={isSelected ? 2 : 1}
              strokeDasharray={isSelected ? '4 2' : undefined}
              onClick={() => toggleElement(elementKey)}
              style={{ cursor: 'pointer' }}
            />
            <text x={lx} y={ly} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="white" fontWeight={600}>
              {Math.round(percent * 100)}%
            </text>
          </g>
        )
      })}
      {slices.map((slice, i) => (
        <g key={`legend-${i}`} transform={`translate(560, ${30 + i * 22})`}>
          <rect width={12} height={12} fill={DEFAULT_PALETTE[i % 20]} rx={2} />
          <text x={18} y={10} fontFamily="Arial, sans-serif" fontSize={11} fill="#333">
            {slice.label} ({slice.value})
          </text>
        </g>
      ))}
    </g>
  )
}
