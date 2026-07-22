import PptxGenJS from 'pptxgenjs'
import type { DiagramModel } from '../core/model/DiagramModel'
import type { Shape } from '../core/model/Shape'

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

  const sx = (source.position.x + source.dimensions.width / 2) / 96
  const sy = (source.position.y + source.dimensions.height / 2) / 96
  const tx = (target.position.x + target.dimensions.width / 2) / 96
  const ty = (target.position.y + target.dimensions.height / 2) / 96

  slide.addShape('line', {
    x: sx,
    y: sy,
    w: tx - sx,
    h: ty - sy,
    line: { color: '666666', width: 1 },
    flipV: ty < sy,
    flipH: tx < sx,
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
