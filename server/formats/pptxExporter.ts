import PptxGenJS from 'pptxgenjs'
import type { TemplateData } from '../../src/templates/types'
import type { RenderOptions } from '../types'
import { exportTemplateToPng } from './pngExporter'

const SLIDE_WIDTH = 13.33
const SLIDE_HEIGHT = 7.5
const HORIZONTAL_MARGIN = 0.5
const VERTICAL_MARGIN = 0.5

interface ImageLayout {
  x: number
  y: number
  width: number
  height: number
}

function calculateSlideImageLayout(aspectRatio: number): ImageLayout {
  const maxAvailableWidth = SLIDE_WIDTH - HORIZONTAL_MARGIN * 2
  const maxAvailableHeight = SLIDE_HEIGHT - VERTICAL_MARGIN * 2
  const availableRatio = maxAvailableWidth / maxAvailableHeight

  let finalWidth: number
  let finalHeight: number

  if (aspectRatio > availableRatio) {
    finalWidth = maxAvailableWidth
    finalHeight = maxAvailableWidth / aspectRatio
  } else {
    finalHeight = maxAvailableHeight
    finalWidth = maxAvailableHeight * aspectRatio
  }

  const x = (SLIDE_WIDTH - finalWidth) / 2
  const y = (SLIDE_HEIGHT - finalHeight) / 2

  return { x, y, width: finalWidth, height: finalHeight }
}

function getPptxConstructor(): typeof PptxGenJS {
  const mod = PptxGenJS as unknown as { default?: typeof PptxGenJS }
  if (typeof mod.default === 'function') {
    return mod.default
  }
  return PptxGenJS
}

export async function exportTemplateToPptx(data: TemplateData, options?: RenderOptions): Promise<Buffer> {
  const PptxConstructor = getPptxConstructor()
  const presentation = new PptxConstructor()
  presentation.layout = 'LAYOUT_WIDE'
  presentation.author = 'autoDesign'
  presentation.title = data.title ?? 'autoDesign Diagram'

  const slide = presentation.addSlide()
  const pngBuffer = exportTemplateToPng(data, { ...options, width: 2400 })
  const base64Data = pngBuffer.toString('base64')

  const layout = calculateSlideImageLayout(1000 / 600)

  slide.addImage({
    data: `image/png;base64,${base64Data}`,
    x: layout.x,
    y: layout.y,
    w: layout.width,
    h: layout.height,
  })

  const output = await presentation.write({ outputType: 'nodebuffer' })
  return output as Buffer
}
