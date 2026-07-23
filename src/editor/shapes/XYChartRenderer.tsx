import { useDiagramStore } from '../../store/diagramStore'
import type { XYChartData } from '../../mermaid/parseXYChart'

const PALETTE = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
  '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',
]

const CHART_LEFT = 70
const CHART_TOP = 50
const CHART_W = 500
const CHART_H = 320
const TICK_COUNT = 5
const GRID_COLOR = '#eee'

function yTicks(maxVal: number): number[] {
  const step = Math.ceil(maxVal / TICK_COUNT)
  const ticks: number[] = []
  for (let v = 0; v <= maxVal; v += step) ticks.push(v)
  if (ticks[ticks.length - 1]! < maxVal) ticks.push(maxVal)
  return ticks
}

export function XYChartRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'xyChart' || !diagramData) return null
  const data = diagramData as unknown as XYChartData
  if (data.series.length === 0) return null

  const maxVal = Math.max(...data.series.flatMap(s => s.data), 1)
  const barWidth = CHART_W / data.xLabels.length
  const seriesCount = data.series.length
  const groupBarW = Math.min(barWidth * 0.7, 60)
  const perBarW = seriesCount > 0 ? groupBarW / seriesCount : 0

  const ticks = yTicks(maxVal)
  const plotH = CHART_H - 10

  const children: React.ReactElement[] = []

  if (data.title) {
    children.push(
      <text key="title" x={CHART_LEFT + CHART_W / 2} y={25} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="#333">
        {data.title}
      </text>
    )
  }

  for (const t of ticks) {
    const y = CHART_TOP + plotH - (t / maxVal) * plotH
    children.push(
      <line key={`grid-${t}`} x1={CHART_LEFT} y1={y} x2={CHART_LEFT + CHART_W} y2={y} stroke={GRID_COLOR} strokeWidth={0.5} />
    )
    children.push(
      <text key={`tick-${t}`} x={CHART_LEFT - 6} y={y + 4} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={9} fill="#999">
        {t}
      </text>
    )
  }

  children.push(
    <line key="axis-x" x1={CHART_LEFT} y1={CHART_TOP + plotH} x2={CHART_LEFT + CHART_W} y2={CHART_TOP + plotH} stroke="#333" strokeWidth={1.5} />
  )
  children.push(
    <line key="axis-y" x1={CHART_LEFT} y1={CHART_TOP} x2={CHART_LEFT} y2={CHART_TOP + plotH} stroke="#333" strokeWidth={1.5} />
  )

  for (let xi = 0; xi < data.xLabels.length; xi++) {
    const label = data.xLabels[xi]!
    const cx = CHART_LEFT + xi * barWidth + barWidth / 2
    children.push(
      <text key={`xlabel-${xi}`} x={cx} y={CHART_TOP + plotH + 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#666">
        {label}
      </text>
    )
  }

  if (data.chartType === 'bar') {
    for (let si = 0; si < data.series.length; si++) {
      const series = data.series[si]!
      const elementKey = `series-${series.label}`
      const color = diagramColors[elementKey] ?? PALETTE[si % PALETTE.length]!
      const isSelected = selectedIds.has(elementKey)

      for (let xi = 0; xi < series.data.length && xi < data.xLabels.length; xi++) {
        const val = series.data[xi]!
        const barH = (val / maxVal) * plotH
        const bx = CHART_LEFT + xi * barWidth + (barWidth - groupBarW) / 2 + si * perBarW

        children.push(
          <rect
            key={`bar-${si}-${xi}`}
            x={bx}
            y={CHART_TOP + plotH - barH}
            width={Math.max(2, perBarW - 2)}
            height={barH}
            rx={2}
            fill={color}
            opacity={0.8}
            stroke={isSelected ? '#4a90d9' : undefined}
            strokeWidth={isSelected ? 2 : undefined}
            strokeDasharray={isSelected ? '4 2' : undefined}
            onClick={() => toggleElement(elementKey)}
            style={{ cursor: 'pointer' }}
          >
            <title>{`${series.label}: ${val}`}</title>
          </rect>
        )
      }
    }
  } else {
    const linePoints: Array<Array<{ x: number; y: number }>> = data.series.map(() => [])
    for (let si = 0; si < data.series.length; si++) {
      const series = data.series[si]!
      const elementKey = `series-${series.label}`
      const color = diagramColors[elementKey] ?? PALETTE[si % PALETTE.length]!
      const isSelected = selectedIds.has(elementKey)
      const pts = linePoints[si]!

      for (let xi = 0; xi < series.data.length && xi < data.xLabels.length; xi++) {
        const val = series.data[xi]!
        const px = CHART_LEFT + xi * barWidth + barWidth / 2
        const py = CHART_TOP + plotH - (val / maxVal) * plotH
        pts.push({ x: px, y: py })
      }

      if (pts.length > 1) {
        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
        children.push(
          <path
            key={`line-${si}`}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={isSelected ? 3 : 2}
            strokeDasharray={isSelected ? '4 2' : undefined}
            onClick={() => toggleElement(elementKey)}
            style={{ cursor: 'pointer' }}
          />
        )

        for (let xi = 0; xi < pts.length; xi++) {
          const p = pts[xi]!
          children.push(
            <circle
              key={`dot-${si}-${xi}`}
              cx={p.x}
              cy={p.y}
              r={isSelected ? 5 : 3}
              fill="white"
              stroke={color}
              strokeWidth={2}
              onClick={() => toggleElement(elementKey)}
              style={{ cursor: 'pointer' }}
            >
              <title>{`${series.label}: ${series.data[xi]}`}</title>
            </circle>
          )
        }
      }
    }
  }

  for (let si = 0; si < data.series.length; si++) {
    const series = data.series[si]!
    const elementKey = `series-${series.label}`
    const color = diagramColors[elementKey] ?? PALETTE[si % PALETTE.length]!
    const isSelected = selectedIds.has(elementKey)
    const lx = CHART_LEFT + CHART_W + 24
    const ly = CHART_TOP + si * 20

    children.push(
      <g key={`legend-${si}`} transform={`translate(${lx}, ${ly})`}>
        <rect
          width={12}
          height={12}
          rx={2}
          fill={color}
          stroke={isSelected ? '#4a90d9' : 'none'}
          strokeWidth={isSelected ? 1.5 : 0}
          onClick={() => toggleElement(elementKey)}
          style={{ cursor: 'pointer' }}
        />
        <text x={18} y={10} fontFamily="Arial, sans-serif" fontSize={10} fill="#333">
          {series.label}
        </text>
      </g>
    )
  }

  return <g>{children}</g>
}
