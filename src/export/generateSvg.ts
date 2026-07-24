import type { DiagramModel } from '../core/model/DiagramModel'
import type { Shape } from '../core/model/Shape'

interface Bounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

function computeBounds(shapes: readonly Shape[]): Bounds {
  if (shapes.length === 0) {
    return { minX: 0, minY: 0, maxX: 800, maxY: 600 }
  }

  let minX = Number.POSITIVE_INFINITY
  let minY = Number.POSITIVE_INFINITY
  let maxX = Number.NEGATIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY

  for (const shape of shapes) {
    const { x, y } = shape.position
    const { width, height } = shape.dimensions
    if (x < minX) minX = x
    if (y < minY) minY = y
    if (x + width > maxX) maxX = x + width
    if (y + height > maxY) maxY = y + height
  }

  return { minX, minY, maxX, maxY }
}

function shapeToSvg(shape: Shape): string {
  const { dimensions, position, style, text, type } = shape
  const { width: w, height: h } = dimensions
  const { x, y } = position

  const styleAttrs = [
    `fill="${escapeXml(style.fill)}"`,
    `stroke="${escapeXml(style.stroke)}"`,
    `stroke-width="${style.strokeWidth}"`,
    `opacity="${style.opacity}"`,
  ].join(' ')

  const cx = x + w / 2
  const cy = y + h / 2

  let shapeSvg = ''

  switch (type) {
    case 'rectangle':
      shapeSvg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" ${styleAttrs}/>`
      break
    case 'ellipse':
      shapeSvg = `<ellipse cx="${cx}" cy="${cy}" rx="${w / 2}" ry="${h / 2}" ${styleAttrs}/>`
      break
    case 'diamond': {
      const points = `${cx},${y} ${x + w},${cy} ${cx},${y + h} ${x},${cy}`
      shapeSvg = `<polygon points="${points}" ${styleAttrs}/>`
      break
    }
  }

  if (text.content) {
    const textAlign = text.fontAlign === 'left' ? 'start' : text.fontAlign === 'right' ? 'end' : 'middle'
    shapeSvg += `<text x="${cx}" y="${cy}" text-anchor="${textAlign}" dominant-baseline="central" font-size="${text.fontSize}" font-family="${escapeXml(text.fontFamily)}" fill="${escapeXml(style.stroke)}" pointer-events="none">${escapeXml(text.content)}</text>`
  }

  return shapeSvg
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function generateSvg(model: DiagramModel): string {
  const shapes = model.shapes
  const bounds = computeBounds(shapes)

  const padding = 40
  const viewMinX = bounds.minX - padding
  const viewMinY = bounds.minY - padding
  const viewWidth = bounds.maxX - bounds.minX + padding * 2
  const viewHeight = bounds.maxY - bounds.minY + padding * 2

  const shapesSvg = shapes.map(shapeToSvg).join('\n  ')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewMinX} ${viewMinY} ${viewWidth} ${viewHeight}" width="${viewWidth}" height="${viewHeight}">\n  ${shapesSvg}\n</svg>`
}

export function downloadSvg(model: DiagramModel, filename: string = 'diagram.svg'): void {
  const svg = generateSvg(model)
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function exportCanvasToSvg(): string {
  const svgElement = document.querySelector('svg')
  if (!svgElement) throw new Error('No SVG element found on canvas')
  return new XMLSerializer().serializeToString(svgElement)
}

export function downloadCanvasSvg(filename: string = 'diagram.svg'): void {
  const svg = exportCanvasToSvg()
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
