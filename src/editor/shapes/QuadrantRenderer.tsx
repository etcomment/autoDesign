import { useDiagramStore } from '../../store/diagramStore'
import type { QuadrantData } from '../../mermaid/parseQuadrant'

export function QuadrantRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)

  if (diagramType !== 'quadrant' || !diagramData) return null
  const data = diagramData as QuadrantData

  const size = 400
  const pad = 60
  const cx = pad + size / 2
  const cy = pad + size / 2

  return (
    <g>
      <line x1={pad} y1={cy} x2={pad + size} y2={cy} stroke="#999" strokeWidth={1} />
      <line x1={cx} y1={pad} x2={cx} y2={pad + size} stroke="#999" strokeWidth={1} />
      <text x={pad + size + 10} y={cy + 4} fontFamily="Arial, sans-serif" fontSize={12} fill="#333">{data.xAxisLabel} →</text>
      <text x={cx} y={pad - 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="#333">↑ {data.yAxisLabel}</text>
      <text x={pad} y={pad + size + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#999">Low</text>
      <text x={pad + size} y={pad + size + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#999">High</text>

      {data.quadrants.map((q, i) => {
        const px = cx + q.x * (size / 2)
        const py = cy - q.y * (size / 2)
        return (
          <g key={i}>
            <circle cx={px} cy={py} r={6} fill="#4a90d9" />
            <text x={px + 10} y={py + 4} fontFamily="Arial, sans-serif" fontSize={11} fill="#333">{q.label}</text>
          </g>
        )
      })}
    </g>
  )
}
