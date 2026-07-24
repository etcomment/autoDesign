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

export async function generateCanvasPptx(): Promise<Blob> {
  const svgElement = document.querySelector('svg')
  if (!svgElement) throw new Error('No SVG element found on canvas')
  const svgString = new XMLSerializer().serializeToString(svgElement)

  return new Promise((resolve, reject) => {
    const img = new Image()
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(svgBlob)

    img.onload = async () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(url)
        return reject(new Error('Canvas context not available'))
      }
      ctx.drawImage(img, 0, 0)
      const dataUrl = canvas.toDataURL('image/png')
      URL.revokeObjectURL(url)

      const pres = new PptxGenJS()
      pres.layout = 'LAYOUT_WIDE'
      pres.author = 'autoDesign'
      pres.title = 'Diagram'
      const slide = pres.addSlide()

      const slideW = 13.33
      const slideH = 7.5
      const aspect = img.width / img.height
      let imgW: number
      let imgH: number
      if (aspect > slideW / slideH) {
        imgW = slideW
        imgH = slideW / aspect
      } else {
        imgH = slideH
        imgW = slideH * aspect
      }

      const x = (slideW - imgW) / 2
      const y = (slideH - imgH) / 2

      slide.addImage({ data: dataUrl, x, y, w: imgW, h: imgH })

      const data = await pres.write({ outputType: 'arraybuffer' })
      resolve(new Blob([data as ArrayBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      }))
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load SVG'))
    }

    img.src = url
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
