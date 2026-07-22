export interface QuadrantData {
  xAxisLabel: string
  yAxisLabel: string
  quadrants: { label: string; x: number; y: number }[]
}

export function parseQuadrant(dsl: string): QuadrantData {
  const data: QuadrantData = { xAxisLabel: 'X', yAxisLabel: 'Y', quadrants: [] }
  const lines = dsl.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || /^quadrant/i.test(trimmed)) continue

    const axisMatch = /^([xy])-axis\s+(.+)/i.exec(trimmed)
    if (axisMatch) {
      const axis = axisMatch[1]!.toLowerCase()
      const label = axisMatch[2]!.trim()
      if (axis === 'x') data.xAxisLabel = label
      else data.yAxisLabel = label
      continue
    }

    const pointMatch = /^(.+?)\s*:\s*\[?\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\]?$/i.exec(trimmed)
    if (pointMatch) {
      data.quadrants.push({
        label: pointMatch[1]!.trim(),
        x: parseFloat(pointMatch[2]!),
        y: parseFloat(pointMatch[3]!),
      })
    }
  }

  return data
}

export function isQuadrant(dsl: string): boolean {
  return /^\s*quadrant/i.test(dsl)
}
