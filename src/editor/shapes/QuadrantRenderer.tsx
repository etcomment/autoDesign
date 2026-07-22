import { useDiagramStore } from '../../store/diagramStore'
import type { QuadrantData } from '../../mermaid/parseQuadrant'

export function QuadrantRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'quadrant' || !diagramData) return null
  const data = diagramData as unknown as QuadrantData

  const size = 400
  const pad = 80
  const cx = pad + size / 2
  const cy = pad + size / 2

  return (
    <g>
      {data.title && (
        <text x={cx} y={30} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="#333">
          {data.title}
        </text>
      )}

      <rect x={pad} y={pad} width={size / 2} height={size / 2} fill="#e8f5e9" opacity={0.5} />
      <rect x={cx} y={pad} width={size / 2} height={size / 2} fill="#fff3e0" opacity={0.5} />
      <rect x={pad} y={cy} width={size / 2} height={size / 2} fill="#ffebee" opacity={0.5} />
      <rect x={cx} y={cy} width={size / 2} height={size / 2} fill="#e3f2fd" opacity={0.5} />

      <text x={pad + 10} y={pad + 20} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#2e7d32">{data.quadrantLabels[0]}</text>
      <text x={cx + 10} y={pad + 20} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#ef6c00">{data.quadrantLabels[1]}</text>
      <text x={pad + 10} y={cy + 20} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#c62828">{data.quadrantLabels[2]}</text>
      <text x={cx + 10} y={cy + 20} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#1565c0">{data.quadrantLabels[3]}</text>

      <line x1={pad} y1={cy} x2={pad + size} y2={cy} stroke="#999" strokeWidth={1} />
      <line x1={cx} y1={pad} x2={cx} y2={pad + size} stroke="#999" strokeWidth={1} />
      <text x={pad + size + 10} y={cy + 4} fontFamily="Arial, sans-serif" fontSize={12} fill="#333">{data.xAxisLabel}</text>
      <text x={cx} y={pad - 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="#333">{data.yAxisLabel}</text>

      {data.quadrants.map((q, i) => {
        const px = cx + q.x * (size / 2)
        const py = cy - q.y * (size / 2)
        const elementKey = `point-${i}`
        const color = diagramColors[elementKey] ?? '#4a90d9'
        const isSelected = selectedIds.has(elementKey)
        return (
          <g key={i}>
            <circle
              cx={px}
              cy={py}
              r={6}
              fill={color}
              stroke={isSelected ? '#4a90d9' : undefined}
              strokeWidth={isSelected ? 2 : undefined}
              strokeDasharray={isSelected ? '4 2' : undefined}
              onClick={() => toggleElement(elementKey)}
              style={{ cursor: 'pointer' }}
            />
            <text x={px + 10} y={py + 4} fontFamily="Arial, sans-serif" fontSize={11} fill="#333">{q.label}</text>
          </g>
        )
      })}
    </g>
  )
}
