import { useDiagramStore } from '../../store/diagramStore'
import type { PieData } from '../../mermaid/parsePieChart'

const PALETTE = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
  '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',
]

function arcPath(
  cx: number, cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const startRad = (startAngle * Math.PI) / 180
  const endRad = (endAngle * Math.PI) / 180
  const x1 = cx + r * Math.cos(startRad)
  const y1 = cy + r * Math.sin(startRad)
  const x2 = cx + r * Math.cos(endRad)
  const y2 = cy + r * Math.sin(endRad)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
}

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
  const cy = 260
  const outerR = 180
  const innerR = 50

  const legendX = cx + outerR + 60
  const legendY = 100

  return (
    <g>
      {data.title && (
        <text x={cx} y={40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={17} fontWeight={700} fill="#333">
          {data.title}
        </text>
      )}

      {(() => {
        let currentAngle = -90
        return slices.map((slice, i) => {
          const percent = slice.value / total
          const angle = percent * 360
          const startAngle = currentAngle
          const endAngle = currentAngle + angle
          const elementKey = `slice-${slice.label}`
          const color = diagramColors[elementKey] ?? PALETTE[i % PALETTE.length]!
          const isSelected = selectedIds.has(elementKey)

          const outerPath = arcPath(cx, cy, outerR, startAngle, endAngle)
          const innerPath = arcPath(cx, cy, innerR, startAngle, endAngle)
          const d = `${outerPath} ${innerPath}`
          const midAngle = ((startAngle + endAngle) / 2) * Math.PI / 180
          const labelR = outerR + 24
          const lx = cx + labelR * Math.cos(midAngle)
          const ly = cy + labelR * Math.sin(midAngle)
          const innerLabelR = (outerR + innerR) / 2
          const ilx = cx + innerLabelR * Math.cos(midAngle)
          const ily = cy + innerLabelR * Math.sin(midAngle)

          currentAngle = endAngle

          return (
            <g key={i}>
              <path
                d={d}
                fill={color}
                stroke={isSelected ? '#4a90d9' : 'white'}
                strokeWidth={isSelected ? 2.5 : 1.5}
                strokeDasharray={isSelected ? '4 2' : undefined}
                onClick={() => toggleElement(elementKey)}
                style={{ cursor: 'pointer' }}
              />
              <text
                x={ilx}
                y={ily}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Arial, sans-serif"
                fontSize={11}
                fill="white"
                fontWeight={700}
                pointerEvents="none"
              >
                {Math.round(percent * 100)}%
              </text>
              <line
                x1={cx + outerR * Math.cos(midAngle)}
                y1={cy + outerR * Math.sin(midAngle)}
                x2={lx}
                y2={ly}
                stroke="#999"
                strokeWidth={1}
              />
              <text
                x={lx + (lx > cx ? 6 : -6)}
                y={ly + 1}
                textAnchor={lx > cx ? 'start' : 'end'}
                fontFamily="Arial, sans-serif"
                fontSize={11}
                fill="#555"
                fontWeight={500}
              >
                {slice.label}
              </text>
              <text
                x={lx + (lx > cx ? 6 : -6)}
                y={ly + 14}
                textAnchor={lx > cx ? 'start' : 'end'}
                fontFamily="Arial, sans-serif"
                fontSize={9}
                fill="#999"
              >
                {slice.value} ({Math.round(percent * 100)}%)
              </text>
            </g>
          )
        })
      })()}

      {slices.map((slice, i) => {
        const elementKey = `slice-${slice.label}`
        const color = diagramColors[elementKey] ?? PALETTE[i % PALETTE.length]!
        return (
          <g key={`legend-${i}`} transform={`translate(${legendX}, ${legendY + i * 22})`}>
            <rect width={14} height={14} rx={3} fill={color} />
            <text x={20} y={11} fontFamily="Arial, sans-serif" fontSize={11} fill="#333">
              {slice.label} — {slice.value}
            </text>
          </g>
        )
      })}
    </g>
  )
}
