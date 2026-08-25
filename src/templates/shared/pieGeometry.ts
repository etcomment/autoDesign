export interface PolarPoint {
  x: number
  y: number
}

export interface PieSliceArc {
  start: number
  end: number
}

export function polarPoint(cx: number, cy: number, radius: number, angle: number): PolarPoint {
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) }
}

// Part de camembert pleine (coin au centre) entre startAngle et endAngle (radians).
export function pieSlicePath(cx: number, cy: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarPoint(cx, cy, radius, startAngle)
  const end = polarPoint(cx, cy, radius, endAngle)
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
  return [
    `M ${cx.toFixed(1)} ${cy.toFixed(1)}`,
    `L ${start.x.toFixed(1)} ${start.y.toFixed(1)}`,
    `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`,
    'Z',
  ].join(' ')
}

// Anneau (donut) entre radii intérieur/extérieur.
export function donutSlicePath(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  const startOuter = polarPoint(cx, cy, outerRadius, startAngle)
  const endOuter = polarPoint(cx, cy, outerRadius, endAngle)
  const endInner = polarPoint(cx, cy, innerRadius, endAngle)
  const startInner = polarPoint(cx, cy, innerRadius, startAngle)
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
  return [
    `M ${startOuter.x.toFixed(1)} ${startOuter.y.toFixed(1)}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${endOuter.x.toFixed(1)} ${endOuter.y.toFixed(1)}`,
    `L ${endInner.x.toFixed(1)} ${endInner.y.toFixed(1)}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${startInner.x.toFixed(1)} ${startInner.y.toFixed(1)}`,
    'Z',
  ].join(' ')
}

// Distribution des angles selon les valeurs (parts égales si pas de valeurs).
export function sliceBounds(values: Array<number | undefined>): PieSliceArc[] {
  const total = values.reduce<number>((sum, v) => sum + ((v ?? 0) > 0 ? v! : 1), 0) || 1
  let cursor = -Math.PI / 2
  return values.map(v => {
    const weight = v && v > 0 ? v : 1
    const start = cursor
    const end = cursor + (weight / total) * Math.PI * 2
    cursor = end
    return { start, end }
  })
}