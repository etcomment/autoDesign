import PptxGenJS from 'pptxgenjs'
import type { DiagramModel } from '../core/model/DiagramModel'
import type { Shape } from '../core/model/Shape'
import { computeEdgePoints } from '../core/geometry'


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

function getComputedSvgStyle(el: Element): { fill: string; stroke: string; strokeWidth: number; rx: number } {
  let fill = ''
  let stroke = ''
  let strokeWidth = -1
  let rx = 0

  let current: Element | null = el
  while (current && current.tagName.toLowerCase() !== 'svg') {
    const f = current.getAttribute('fill')
    if (!fill && f) fill = f

    const s = current.getAttribute('stroke')
    if (!stroke && s) stroke = s

    const sw = current.getAttribute('stroke-width')
    if (strokeWidth < 0 && sw) strokeWidth = parseFloat(sw)

    const r = current.getAttribute('rx')
    if (rx <= 0 && r) rx = parseFloat(r)

    const styleAttr = current.getAttribute('style')
    if (styleAttr) {
      const parts = styleAttr.split(';')
      for (const part of parts) {
        const [k, v] = part.split(':').map(str => str.trim())
        if (k === 'fill' && v && !fill) fill = v
        if (k === 'stroke' && v && !stroke) stroke = v
        if (k === 'stroke-width' && v && strokeWidth < 0) strokeWidth = parseFloat(v)
      }
    }
    current = current.parentElement
  }

  return {
    fill: fill || 'none',
    stroke: stroke || 'none',
    strokeWidth: strokeWidth >= 0 ? strokeWidth : 1,
    rx,
  }
}

export async function generateCanvasPptx(): Promise<Blob> {
  const pres = new PptxGenJS()
  pres.layout = 'LAYOUT_WIDE'
  pres.author = 'autoDesign'
  pres.title = 'Diagram'
  const slide = pres.addSlide()

  const liveSvg = (document.querySelector('svg[data-canvas-svg="true"]') || document.querySelector('svg')) as SVGSVGElement | null
  if (!liveSvg) {
    const data = await pres.write({ outputType: 'arraybuffer' })
    return new Blob([data as ArrayBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    })
  }

  // Clone SVG to DOM to allow getBBox() calculations
  const clonedSvg = liveSvg.cloneNode(true) as SVGSVGElement
  clonedSvg.style.position = 'absolute'
  clonedSvg.style.visibility = 'hidden'
  clonedSvg.style.pointerEvents = 'none'
  document.body.appendChild(clonedSvg)

  // Cleanup interactive elements (similar to getContentSvg)
  const gridRect = clonedSvg.querySelector('rect[fill="url(#grid)"]')
  if (gridRect) gridRect.remove()
  clonedSvg.querySelectorAll('[stroke-dasharray="4 2"], .handle, rect[fill*="rgba(74, 144, 217"]').forEach(el => el.remove())
  clonedSvg.querySelectorAll('[data-shape-id]').forEach(el => el.removeAttribute('data-shape-id'))

  // Remove top transform to match viewBox coordinates
  const mainGroup = clonedSvg.querySelector('g[transform]')
  if (mainGroup) {
    mainGroup.removeAttribute('transform')
  }

  let vx = 0, vy = 0, vw = 900, vh = 600
  try {
    const bbox = (mainGroup as SVGGElement || clonedSvg).getBBox()
    if (bbox && bbox.width > 0 && bbox.height > 0) {
      const padding = 40
      vx = bbox.x - padding
      vy = bbox.y - padding
      vw = bbox.width + padding * 2
      vh = bbox.height + padding * 2
    } else {
      const vb = clonedSvg.viewBox.baseVal
      if (vb.width > 0) {
        vx = vb.x; vy = vb.y; vw = vb.width; vh = vb.height
      }
    }
  } catch {
    const vb = clonedSvg.viewBox.baseVal
    if (vb.width > 0) {
      vx = vb.x; vy = vb.y; vw = vb.width; vh = vb.height
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

  // 1. Process SVG shape elements
  const elements = Array.from(clonedSvg.querySelectorAll('rect, circle, ellipse, polygon, path, line'))
  for (const el of elements) {
    const tagName = el.tagName.toLowerCase()

    // Ignore interactive editor handles or selection bounding boxes
    if (el.getAttribute('stroke-dasharray') === '4 2' || el.classList.contains('handle') || el.getAttribute('data-handle')) continue

    const { fill, stroke, strokeWidth, rx } = getComputedSvgStyle(el)

    const isFillTransparent = !fill || fill === 'none' || fill === 'transparent'
    const isStrokeTransparent = !stroke || stroke === 'none' || stroke === 'transparent' || strokeWidth <= 0

    if (isFillTransparent && isStrokeTransparent) continue

    const hexFill = mapHexToPptxColor(fill === 'none' ? '#ffffff' : fill)
    const hexStroke = mapHexToPptxColor(stroke === 'none' ? '#000000' : stroke)

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
      if (w <= 0 || h <= 0) continue

      // Skip white background rect of entire canvas
      if (x === vx && y === vy && w === vw && h === vh && (fill === 'white' || fill === '#ffffff')) continue

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
      if (r <= 0) continue

      shapeOpts.x = mapX(cx - r)
      shapeOpts.y = mapY(cy - r)
      shapeOpts.w = mapW(r * 2)
      shapeOpts.h = mapH(r * 2)
      slide.addShape('ellipse', shapeOpts)
    } else if (tagName === 'ellipse') {
      const cx = parseFloat(el.getAttribute('cx') || '0')
      const cy = parseFloat(el.getAttribute('cy') || '0')
      const rxAttr = parseFloat(el.getAttribute('rx') || '0')
      const ryAttr = parseFloat(el.getAttribute('ry') || '0')
      if (rxAttr <= 0 || ryAttr <= 0) continue

      shapeOpts.x = mapX(cx - rxAttr)
      shapeOpts.y = mapY(cy - ryAttr)
      shapeOpts.w = mapW(rxAttr * 2)
      shapeOpts.h = mapH(ryAttr * 2)
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
    } else if (tagName === 'polygon' || tagName === 'path') {
      try {
        const svgEl = el as SVGGraphicsElement
        const bbox = svgEl.getBBox()
        if (bbox && bbox.width > 0 && bbox.height > 0) {
          const pad = 2
          const bX = bbox.x - pad
          const bY = bbox.y - pad
          const bW = bbox.width + pad * 2
          const bH = bbox.height + pad * 2
          
          const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bX} ${bY} ${bW} ${bH}" width="${bW}" height="${bH}">${el.outerHTML}</svg>`
          const base64 = window.btoa(unescape(encodeURIComponent(svgStr)))
          
          slide.addImage({
            data: 'data:image/svg+xml;base64,' + base64,
            x: mapX(bX),
            y: mapY(bY),
            w: mapW(bW),
            h: mapH(bH)
          })
        }
      } catch (e) {
        // Fallback for paths with errors
      }
    }
  }

  // 2. Convert SVG text elements to native, editable PowerPoint text boxes
  const textElements = Array.from(clonedSvg.querySelectorAll('text'))
  for (const el of textElements) {
    const textContent = el.textContent?.trim()
    if (!textContent) continue

    const x = parseFloat(el.getAttribute('x') || '0')
    const y = parseFloat(el.getAttribute('y') || '0')
    const fontSizeSvg = parseFloat(el.getAttribute('font-size') || '14')
    const fontFamily = el.getAttribute('font-family') || 'Arial, sans-serif'
    const { fill } = getComputedSvgStyle(el)
    const textAnchor = el.getAttribute('text-anchor') || 'start'

    const pptxFontSize = Math.max(9, Math.round(fontSizeSvg * scale * 72 / 96))
    const hexColor = mapHexToPptxColor(fill === 'none' ? '#111111' : fill)

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
  }

  // Remove the cloned SVG from DOM
  clonedSvg.remove()

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
