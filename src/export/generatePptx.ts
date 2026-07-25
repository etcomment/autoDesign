import PptxGenJS from 'pptxgenjs'
import type { DiagramModel } from '../core/model/DiagramModel'
import type { Shape } from '../core/model/Shape'
import { computeEdgePoints } from '../core/geometry'
import { getContentSvg } from './generateSvg'

function mapHexToPptxColor(hex: string): string {
  return hex.startsWith('#') ? hex.replace('#', '') : hex
}

function addShapeToSlide(slide: PptxGenJS.Slide, shape: Shape): void {
  const x = shape.position.x / 96
  const y = shape.position.y / 96
  const w = shape.dimensions.width / 96
  const h = shape.dimensions.height / 96

  const hexStroke = mapHexToPptxColor(shape.style.stroke)
  const hexFill = mapHexToPptxColor(shape.style.fill)

  const shapeOpts: PptxGenJS.ShapeProps = {
    x,
    y,
    w,
    h,
    line: {
      color: hexStroke,
      width: Math.max(0.5, shape.style.strokeWidth * 0.75),
      dashType: 'solid',
    },
  }

  if (shape.style.fill !== '#ffffff' && shape.style.fill !== 'transparent') {
    shapeOpts.fill = { color: hexFill }
  }

  switch (shape.type) {
    case 'rectangle':
      slide.addShape('rect', shapeOpts)
      break
    case 'ellipse':
      slide.addShape('ellipse', shapeOpts)
      break
    case 'diamond':
      slide.addShape('diamond', shapeOpts)
      break
  }

  if (shape.text.content) {
    slide.addText(shape.text.content, {
      x,
      y,
      w,
      h,
      align: shape.text.fontAlign,
      valign: 'middle',
      fontSize: shape.text.fontSize,
      fontFace: shape.text.fontFamily,
      color: hexStroke,
    })
  }
}

function addConnectionToSlide(
  slide: PptxGenJS.Slide,
  shapes: readonly Shape[],
  sourceId: string,
  targetId: string,
): void {
  const source = shapes.find(s => s.id === sourceId)
  const target = shapes.find(s => s.id === targetId)
  if (!source || !target) return

  const { startX, startY, endX, endY } = computeEdgePoints(source, target)

  const sx = startX / 96
  const sy = startY / 96
  const ex = endX / 96
  const ey = endY / 96

  slide.addShape('line', {
    x: sx,
    y: sy,
    w: ex - sx,
    h: ey - sy,
    line: { color: '666666', width: 1 },
    lineHead: 'triangle',
    flipV: ey < sy,
    flipH: ex < sx,
  })
}

export async function generatePptx(model: DiagramModel): Promise<Blob> {
  const pres = new PptxGenJS()

  pres.layout = 'LAYOUT_WIDE'
  pres.author = 'autoDesign'
  pres.title = 'Diagram'

  const slide = pres.addSlide()

  for (const shape of model.shapes) {
    addShapeToSlide(slide, shape)
  }

  for (const conn of model.connections) {
    addConnectionToSlide(slide, model.shapes, conn.sourceId, conn.targetId)
  }

  const data = await pres.write({ outputType: 'arraybuffer' })
  const buffer = data as ArrayBuffer
  return new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  })
}

export async function downloadPptx(model: DiagramModel, filename: string = 'diagram.pptx'): Promise<void> {
  const blob = await generatePptx(model)
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function parseSvgStyle(el: Element): { fill: string; stroke: string; strokeWidth: number; rx: number } {
  let fill = el.getAttribute('fill') || ''
  let stroke = el.getAttribute('stroke') || ''
  let strokeWidth = parseFloat(el.getAttribute('stroke-width') || '0')
  const rx = parseFloat(el.getAttribute('rx') || '0')

  const styleAttr = el.getAttribute('style')
  if (styleAttr) {
    const parts = styleAttr.split(';')
    for (const part of parts) {
      const [k, v] = part.split(':').map(s => s.trim())
      if (k === 'fill' && v) fill = v
      if (k === 'stroke' && v) stroke = v
      if (k === 'stroke-width' && v) strokeWidth = parseFloat(v)
    }
  }

  return { fill, stroke, strokeWidth, rx }
}

export async function generateCanvasPptx(): Promise<Blob> {
  const svgString = getContentSvg()
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')
  const svgEl = doc.querySelector('svg')

  const pres = new PptxGenJS()
  pres.layout = 'LAYOUT_WIDE'
  pres.author = 'autoDesign'
  pres.title = 'Diagram'
  const slide = pres.addSlide()

  if (!svgEl) {
    const data = await pres.write({ outputType: 'arraybuffer' })
    return new Blob([data as ArrayBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    })
  }

  // Parse viewBox bounds
  const viewBoxAttr = svgEl.getAttribute('viewBox')
  let vx = 0, vy = 0, vw = 900, vh = 600
  if (viewBoxAttr) {
    const parts = viewBoxAttr.split(/[\s,]+/).map(Number)
    if (parts.length === 4 && parts.every(n => typeof n === 'number' && !isNaN(n))) {
      vx = parts[0]!
      vy = parts[1]!
      vw = parts[2]!
      vh = parts[3]!
    }
  }

  // Target slide dimensions in inches (13.33 x 7.5 for widescreen)
  const slideW = 13.33
  const slideH = 7.5

  const scaleX = slideW / (vw || 900)
  const scaleY = slideH / (vh || 600)
  const scale = Math.min(scaleX, scaleY)

  const offsetX = (slideW - (vw * scale)) / 2
  const offsetY = (slideH - (vh * scale)) / 2

  const mapX = (x: number) => offsetX + (x - vx) * scale
  const mapY = (y: number) => offsetY + (y - vy) * scale
  const mapW = (w: number) => w * scale
  const mapH = (h: number) => h * scale

  // 1. Convert SVG visual elements to native PowerPoint shapes
  svgEl.querySelectorAll('rect, circle, ellipse, polygon, path, line').forEach((el) => {
    const tagName = el.tagName.toLowerCase()

    // Ignore selection marquee, handles or transparent overlays
    if (el.getAttribute('stroke-dasharray') || el.classList.contains('handle')) return

    const { fill, stroke, strokeWidth, rx } = parseSvgStyle(el)

    const isFillTransparent = !fill || fill === 'none' || fill === 'transparent'
    const isStrokeTransparent = !stroke || stroke === 'none' || stroke === 'transparent' || strokeWidth <= 0

    if (isFillTransparent && isStrokeTransparent) return

    const hexFill = mapHexToPptxColor(fill || '#ffffff')
    const hexStroke = mapHexToPptxColor(stroke || '#000000')

    const shapeOpts: PptxGenJS.ShapeProps = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    }

    if (!isFillTransparent) {
      shapeOpts.fill = { color: hexFill }
    }

    if (!isStrokeTransparent) {
      shapeOpts.line = {
        color: hexStroke,
        width: Math.max(0.5, strokeWidth * scale * 0.75),
      }
    }

    if (tagName === 'rect') {
      const x = parseFloat(el.getAttribute('x') || '0')
      const y = parseFloat(el.getAttribute('y') || '0')
      const w = parseFloat(el.getAttribute('width') || '0')
      const h = parseFloat(el.getAttribute('height') || '0')
      if (w <= 0 || h <= 0) return

      // Skip white background rect of entire canvas
      if (x === vx && y === vy && w === vw && h === vh && (fill === 'white' || fill === '#ffffff')) return

      shapeOpts.x = mapX(x)
      shapeOpts.y = mapY(y)
      shapeOpts.w = mapW(w)
      shapeOpts.h = mapH(h)

      const shapeType = rx > 0 ? 'roundRect' : 'rect'
      slide.addShape(shapeType, shapeOpts)
    } else if (tagName === 'circle') {
      const cx = parseFloat(el.getAttribute('cx') || '0')
      const cy = parseFloat(el.getAttribute('cy') || '0')
      const r = parseFloat(el.getAttribute('r') || '0')
      if (r <= 0) return

      shapeOpts.x = mapX(cx - r)
      shapeOpts.y = mapY(cy - r)
      shapeOpts.w = mapW(r * 2)
      shapeOpts.h = mapH(r * 2)
      slide.addShape('ellipse', shapeOpts)
    } else if (tagName === 'ellipse') {
      const cx = parseFloat(el.getAttribute('cx') || '0')
      const cy = parseFloat(el.getAttribute('cy') || '0')
      const rx = parseFloat(el.getAttribute('rx') || '0')
      const ry = parseFloat(el.getAttribute('ry') || '0')
      if (rx <= 0 || ry <= 0) return

      shapeOpts.x = mapX(cx - rx)
      shapeOpts.y = mapY(cy - ry)
      shapeOpts.w = mapW(rx * 2)
      shapeOpts.h = mapH(ry * 2)
      slide.addShape('ellipse', shapeOpts)
    } else if (tagName === 'line') {
      const x1 = parseFloat(el.getAttribute('x1') || '0')
      const y1 = parseFloat(el.getAttribute('y1') || '0')
      const x2 = parseFloat(el.getAttribute('x2') || '0')
      const y2 = parseFloat(el.getAttribute('y2') || '0')

      const sx = mapX(x1)
      const sy = mapY(y1)
      const ex = mapX(x2)
      const ey = mapY(y2)

      slide.addShape('line', {
        x: sx,
        y: sy,
        w: ex - sx,
        h: ey - sy,
        line: {
          color: hexStroke,
          width: Math.max(0.5, strokeWidth * scale * 0.75),
        },
        flipV: ey < sy,
        flipH: ex < sx,
      })
    } else if (tagName === 'polygon') {
      const pointsAttr = el.getAttribute('points') || ''
      const pts = pointsAttr.trim().split(/[\s,]+/).map(Number)
      if (pts.length >= 6) {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
        for (let i = 0; i < pts.length; i += 2) {
          const px = pts[i]!
          const py = pts[i + 1]!
          if (px < minX) minX = px
          if (px > maxX) maxX = px
          if (py < minY) minY = py
          if (py > maxY) maxY = py
        }
        shapeOpts.x = mapX(minX)
        shapeOpts.y = mapY(minY)
        shapeOpts.w = mapW(maxX - minX)
        shapeOpts.h = mapH(maxY - minY)
        slide.addShape('diamond', shapeOpts)
      }
    } else if (tagName === 'path') {
      const pathData = el.getAttribute('d') || ''
      if (!pathData) return

      // Compute bounding box from path numbers
      const coords = pathData.match(/[-+]?\d*\.?\d+/g)?.map(Number) || []
      if (coords.length >= 4) {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
        for (let i = 0; i < coords.length - 1; i += 2) {
          const px = coords[i]!
          const py = coords[i + 1]!
          if (px >= vx - 500 && px <= vx + vw + 500 && py >= vy - 500 && py <= vy + vh + 500) {
            if (px < minX) minX = px
            if (px > maxX) maxX = px
            if (py < minY) minY = py
            if (py > maxY) maxY = py
          }
        }
        if (minX < maxX && minY < maxY) {
          shapeOpts.x = mapX(minX)
          shapeOpts.y = mapY(minY)
          shapeOpts.w = mapW(maxX - minX)
          shapeOpts.h = mapH(maxY - minY)
          slide.addShape('rect', shapeOpts)
        }
      }
    }
  })

  // 2. Convert SVG text elements to native, editable PowerPoint text boxes
  svgEl.querySelectorAll('text').forEach((el) => {
    const textContent = el.textContent?.trim()
    if (!textContent) return

    const x = parseFloat(el.getAttribute('x') || '0')
    const y = parseFloat(el.getAttribute('y') || '0')
    const fontSizeSvg = parseFloat(el.getAttribute('font-size') || '14')
    const fontFamily = el.getAttribute('font-family') || 'Arial, sans-serif'
    const fill = parseSvgStyle(el).fill || el.getAttribute('fill') || '#111111'
    const textAnchor = el.getAttribute('text-anchor') || 'start'

    const pptxFontSize = Math.max(9, Math.round(fontSizeSvg * scale * 72 / 96))
    const hexColor = mapHexToPptxColor(fill)

    let align: PptxGenJS.HAlign = 'left'
    if (textAnchor === 'middle') align = 'center'
    else if (textAnchor === 'end') align = 'right'

    const estWidth = Math.max(1.8, (textContent.length * fontSizeSvg * 0.65 * scale) / 96)
    const estHeight = Math.max(0.4, (fontSizeSvg * 1.5 * scale) / 96)

    let pptxX = mapX(x)
    if (textAnchor === 'middle') pptxX -= estWidth / 2
    else if (textAnchor === 'end') pptxX -= estWidth

    const pptxY = mapY(y) - estHeight / 2

    slide.addText(textContent, {
      x: Math.max(0, pptxX),
      y: Math.max(0, pptxY),
      w: estWidth,
      h: estHeight,
      fontSize: pptxFontSize,
      fontFace: fontFamily.replace(/['",]/g, ''),
      color: hexColor,
      align,
      valign: 'middle',
    })
  })

  const data = await pres.write({ outputType: 'arraybuffer' })
  return new Blob([data as ArrayBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  })
}

export async function downloadCanvasPptx(filename: string = 'diagram.pptx'): Promise<void> {
  const blob = await generateCanvasPptx()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
