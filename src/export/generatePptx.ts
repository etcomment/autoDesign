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

function resolveColorToHex(color: string): string {
  if (!color || color === 'none' || color === 'transparent') return ''
  
  if (color.startsWith('#')) {
    let hex = color.replace('#', '')
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
    return hex.toUpperCase().slice(0, 6)
  }

  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (match) {
    const r = parseInt(match[1]!).toString(16).padStart(2, '0')
    const g = parseInt(match[2]!).toString(16).padStart(2, '0')
    const b = parseInt(match[3]!).toString(16).padStart(2, '0')
    return (r + g + b).toUpperCase()
  }

  // Fallback for named colors by forcing browser to resolve it
  if (typeof document !== 'undefined') {
    const temp = document.createElement('div')
    temp.style.color = color
    document.body.appendChild(temp)
    const computed = window.getComputedStyle(temp).color
    document.body.removeChild(temp)
    const m2 = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (m2) {
      const r = parseInt(m2[1]!).toString(16).padStart(2, '0')
      const g = parseInt(m2[2]!).toString(16).padStart(2, '0')
      const b = parseInt(m2[3]!).toString(16).padStart(2, '0')
      return (r + g + b).toUpperCase()
    }
  }

  return '000000'
}


async function svgToPngBase64(svgString: string, scale: number = 2): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)

    img.onload = () => {
      const w = (img.naturalWidth || img.width) * scale
      const h = (img.naturalHeight || img.height) * scale
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) { URL.revokeObjectURL(url); reject(new Error('No ctx')); return }
      ctx.scale(scale, scale)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, img.naturalWidth || img.width, img.naturalHeight || img.height)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/png'))
    }

    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('SVG load failed')) }
    img.src = url
  })
}

function parseSvgDimensions(svgString: string): { width: number; height: number } {
  const match = svgString.match(/<svg[^>]*\swidth="([^"]+)"[^>]*\sheight="([^"]+)"/)
  if (match) return { width: parseFloat(match[1]!), height: parseFloat(match[2]!) }
  const vbMatch = svgString.match(/viewBox="([^"]+)"/)
  if (vbMatch) {
    const parts = vbMatch[1]!.split(/\s+|,/)
    return { width: parseFloat(parts[2] ?? '960'), height: parseFloat(parts[3] ?? '540') }
  }
  return { width: 960, height: 540 }
}

export async function generateCanvasPptx(): Promise<Blob> {
  const pres = new PptxGenJS()
  pres.layout = 'LAYOUT_WIDE'
  pres.author = 'autoDesign'
  pres.title = 'Diagram'
  const slide = pres.addSlide()

  const svgString = await getContentSvg()
  const { width: svgW, height: svgH } = parseSvgDimensions(svgString)

  const slideW = 13.33
  const slideH = 7.5

  const svgRatio = svgW / svgH
  const slideRatio = slideW / slideH

  let imgW: number, imgH: number, imgX: number, imgY: number

  if (svgRatio > slideRatio) {
    imgW = slideW
    imgH = slideW / svgRatio
    imgX = 0
    imgY = (slideH - imgH) / 2
  } else {
    imgH = slideH
    imgW = slideH * svgRatio
    imgY = 0
    imgX = (slideW - imgW) / 2
  }

  slide.addShape('rect', {
    x: 0, y: 0, w: slideW, h: slideH,
    fill: { color: 'FFFFFF' },
    line: { color: 'FFFFFF', width: 0 },
  })

  const pngData = await svgToPngBase64(svgString, 2)

  slide.addImage({ data: pngData, x: imgX, y: imgY, w: imgW, h: imgH })

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

