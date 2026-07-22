import { useDiagramStore } from '../../store/diagramStore'
import type { XYChartData } from '../../mermaid/parseXYChart'

const DEFAULT_PALETTE = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
  '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',
]

export function XYChartRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'xyChart' || !diagramData) return null
  const data = diagramData as unknown as XYChartData
  if (data.series.length === 0) return null

  const chartLeft = 80
  const chartTop = 40
  const chartWidth = 500
  const chartHeight = 300
  const maxVal = Math.max(...data.series.flatMap(s => s.data), 1)
  const barWidth = chartWidth / data.xLabels.length

  return (
    <g>
      {data.title && (
        <text x={chartLeft + chartWidth / 2} y={20} textAnchor="middle"
          fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#333">{data.title}</text>
      )}

      <line x1={chartLeft} y1={chartTop + chartHeight} x2={chartLeft + chartWidth} y2={chartTop + chartHeight} stroke="#333" strokeWidth={1} />
      <line x1={chartLeft} y1={chartTop} x2={chartLeft} y2={chartTop + chartHeight} stroke="#333" strokeWidth={1} />

      {data.xLabels.map((label, i) => (
        <text key={`x-${i}`} x={chartLeft + i * barWidth + barWidth / 2} y={chartTop + chartHeight + 20}
          textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#666">{label}</text>
      ))}

      {data.yLabel && (
        <text x={chartLeft - 10} y={chartTop} textAnchor="end"
          fontFamily="Arial, sans-serif" fontSize={11} fill="#333" transform={`rotate(-90, ${chartLeft - 40}, ${chartTop + chartHeight / 2})`}>
          {data.yLabel}
        </text>
      )}

      {data.series.map((series, si) => {
        const elementKey = `series-${series.label}`
        const color = diagramColors[elementKey] ?? DEFAULT_PALETTE[si % 20]
        const isSelected = selectedIds.has(elementKey)
        return (
          <g key={si}>
            {series.data.map((val, i) => {
              const barH = (val / maxVal) * chartHeight
              const x = chartLeft + i * barWidth + 4 + si * 20
              const y = chartTop + chartHeight - barH
              const w = barWidth - 8

              return (
                <g key={`${si}-${i}`}>
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={barH}
                    rx={2}
                    fill={color}
                    opacity={0.8}
                    stroke={isSelected ? '#4a90d9' : undefined}
                    strokeWidth={isSelected ? 2 : undefined}
                    strokeDasharray={isSelected ? '4 2' : undefined}
                    onClick={() => toggleElement(elementKey)}
                    style={{ cursor: 'pointer' }}
                  />
                  <text x={x + w / 2} y={y - 4} textAnchor="middle"
                    fontFamily="Arial, sans-serif" fontSize={9} fill="#333">{val}</text>
                </g>
              )
            })}
          </g>
        )
      })}

      {data.series.map((series, si) => {
        const elementKey = `series-${series.label}`
        const color = diagramColors[elementKey] ?? DEFAULT_PALETTE[si % 20]
        return (
          <g key={`legend-${si}`} transform={`translate(${chartLeft + chartWidth + 20}, ${chartTop + si * 20})`}>
            <rect width={10} height={10} fill={color} rx={2} />
            <text x={14} y={9} fontFamily="Arial, sans-serif" fontSize={10} fill="#333">{series.label}</text>
          </g>
        )
      })}
    </g>
  )
}
