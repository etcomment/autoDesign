import { Resvg } from '@resvg/resvg-js'
import type { TemplateData } from '../../src/templates/types'
import type { RenderOptions } from '../types'
import { exportTemplateToSvg } from './svgExporter'

const DEFAULT_PNG_WIDTH = 1600

export function exportTemplateToPng(data: TemplateData, options?: RenderOptions): Buffer {
  const svgContent = exportTemplateToSvg(data, options)
  const targetWidth = options?.width ?? DEFAULT_PNG_WIDTH

  const resvg = new Resvg(svgContent, {
    fitTo: {
      mode: 'width',
      value: targetWidth,
    },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: 'Arial',
    },
  })

  const renderedImage = resvg.render()
  return renderedImage.asPng()
}
