import type { ReactElement } from 'react'

export interface PictogramCategory {
  count: number
  color: string
  label?: string
  percent?: string
}

export interface PictogramGridProps {
  x: number
  y: number
  width: number
  height: number
  categories: PictogramCategory[]
  totalItems?: number
  columns?: number
  rows?: number
  showLegend?: boolean
}

export function PictogramPerson({
  x,
  y,
  size,
  color,
}: {
  x: number
  y: number
  size: number
  color: string
}): ReactElement {
  const headRadius = size * 0.22
  const headCx = x + size / 2
  const headCy = y + headRadius + 1

  const bodyTop = y + size * 0.46
  const bodyW = size * 0.72
  const bodyH = size * 0.52
  const bodyLeft = x + (size - bodyW) / 2

  return (
    <g fill={color}>
      <circle cx={headCx} cy={headCy} r={headRadius} />
      <path
        d={`M ${bodyLeft} ${bodyTop + bodyH} L ${bodyLeft} ${bodyTop + 4} Q ${bodyLeft} ${bodyTop} ${bodyLeft + 4} ${bodyTop} L ${bodyLeft + bodyW - 4} ${bodyTop} Q ${bodyLeft + bodyW} ${bodyTop} ${bodyLeft + bodyW} ${bodyTop + 4} L ${bodyLeft + bodyW} ${bodyTop + bodyH} Z`}
        rx={3}
      />
    </g>
  )
}

export function PictogramGrid({
  x,
  y,
  width,
  height,
  categories,
  totalItems = 50,
  columns = 10,
  rows = 5,
  showLegend = true,
}: PictogramGridProps): ReactElement {
  const legendWidth = showLegend ? 70 : 0
  const gridWidth = width - legendWidth
  const itemSize = Math.min(gridWidth / columns, height / rows)
  const cellW = gridWidth / columns
  const cellH = height / rows

  const iconColors: string[] = []
  for (const cat of categories) {
    for (let i = 0; i < cat.count; i++) {
      if (iconColors.length < totalItems) {
        iconColors.push(cat.color)
      }
    }
  }
  while (iconColors.length < totalItems) {
    iconColors.push('#cbd5e1')
  }

  return (
    <g>
      {Array.from({ length: totalItems }).map((_, idx) => {
        const col = idx % columns
        const row = Math.floor(idx / columns)
        const personX = x + col * cellW + (cellW - itemSize) / 2
        const personY = y + row * cellH + (cellH - itemSize) / 2
        const color = iconColors[idx]!

        return (
          <PictogramPerson
            key={idx}
            x={personX}
            y={personY}
            size={itemSize * 0.9}
            color={color}
          />
        )
      })}

      {showLegend && (
        <g transform={`translate(${x + gridWidth + 12}, ${y})`}>
          {categories.map((cat, idx) => {
            const legY = idx * (height / Math.max(1, categories.length)) + 8
            return (
              <g key={idx} transform={`translate(0, ${legY})`}>
                <circle cx={6} cy={0} r={5} fill={cat.color} />
                <text
                  x={18}
                  y={4}
                  fill="#2d3748"
                  fontSize={11}
                  fontWeight={600}
                  fontFamily="Arial, sans-serif"
                >
                  {cat.percent ?? `${cat.count}`}
                </text>
              </g>
            )
          })}
        </g>
      )}
    </g>
  )
}
