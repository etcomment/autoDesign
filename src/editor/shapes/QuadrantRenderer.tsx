import { useDiagramStore } from '../../store/diagramStore'
import type { QuadrantData } from '../../mermaid/parseQuadrant'

const PALETTE = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
  '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',
]

const QUAD_COLORS = ['#e8f5e9', '#fff3e0', '#ffebee', '#e3f2fd']
const QUAD_TEXT_COLORS = ['#2e7d32', '#ef6c00', '#c62828', '#1565c0']
const SIZE = 420
const PAD = 90

export function QuadrantRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'quadrant' || !diagramData) return null
  const data = diagramData as unknown as QuadrantData

  const cx = PAD + SIZE / 2
  const cy = PAD + SIZE / 2
  const hs = SIZE / 2

  return (
    <g>
      {data.title && (
        <text x={cx} y={30} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={17} fontWeight={700} fill="#333">
          {data.title}
        </text>
      )}

      <rect x={PAD} y={PAD} width={hs} height={hs} fill={QUAD_COLORS[0]!} opacity={0.6} rx={4} />
      <rect x={cx} y={PAD} width={hs} height={hs} fill={QUAD_COLORS[1]!} opacity={0.6} rx={4} />
      <rect x={PAD} y={cy} width={hs} height={hs} fill={QUAD_COLORS[2]!} opacity={0.6} rx={4} />
      <rect x={cx} y={cy} width={hs} height={hs} fill={QUAD_COLORS[3]!} opacity={0.6} rx={4} />

      <line x1={PAD} y1={cy} x2={PAD + SIZE} y2={cy} stroke="#888" strokeWidth={1.5} />
      <line x1={cx} y1={PAD} x2={cx} y2={PAD + SIZE} stroke="#888" strokeWidth={1.5} />

      <text x={PAD + 12} y={PAD + 22} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={QUAD_TEXT_COLORS[0]!}>
        {data.quadrantLabels[0]}
      </text>
      <text x={cx + 12} y={PAD + 22} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={QUAD_TEXT_COLORS[1]!}>
        {data.quadrantLabels[1]}
      </text>
      <text x={PAD + 12} y={cy + 22} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={QUAD_TEXT_COLORS[2]!}>
        {data.quadrantLabels[2]}
      </text>
      <text x={cx + 12} y={cy + 22} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={QUAD_TEXT_COLORS[3]!}>
        {data.quadrantLabels[3]}
      </text>

      <text x={PAD + SIZE + 14} y={cy + 4} fontFamily="Arial, sans-serif" fontSize={13} fill="#555">
        {data.xAxisLabel}
      </text>
      <text x={cx} y={PAD - 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fill="#555">
        {data.yAxisLabel}
      </text>

      {data.quadrants.map((q, i) => {
        const px = cx + q.x * hs
        const py = cy - q.y * hs
        const elementKey = `point-${i}`
        const color = diagramColors[elementKey] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementKey)

        return (
          <g key={i}>
            <circle
              cx={px}
              cy={py}
              r={7}
              fill={color}
              stroke={isSelected ? '#4a90d9' : 'white'}
              strokeWidth={isSelected ? 2.5 : 2}
              strokeDasharray={isSelected ? '4 2' : undefined}
              onClick={() => toggleElement(elementKey)}
              style={{ cursor: 'pointer' }}
            />
            <text
              x={px + 12}
              y={py + 1}
              fontFamily="Arial, sans-serif"
              fontSize={11}
              fill="#333"
              fontWeight={500}
              onClick={() => toggleElement(elementKey)}
              style={{ cursor: 'pointer' }}
            >
              {q.label}
            </text>
          </g>
        )
      })}
    </g>
  )
}
