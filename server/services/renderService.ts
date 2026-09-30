import type { RenderOptions, RenderResult, RenderFormat } from '../types'
import { parseDslToTemplateData } from './dslParserService'
import { exportTemplateToSvg } from '../formats/svgExporter'
import { exportTemplateToHtml } from '../formats/htmlExporter'
import { exportTemplateToPng } from '../formats/pngExporter'
import { exportTemplateToPptx } from '../formats/pptxExporter'

function sanitizeFilename(title?: string): string {
  if (!title) return 'diagram'
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'diagram'
}

export async function renderTemplateFromDsl(
  rawDsl: string,
  options?: RenderOptions
): Promise<RenderResult> {
  const templateData = parseDslToTemplateData(rawDsl)
  const format: RenderFormat = options?.format ?? 'svg'
  const baseFilename = sanitizeFilename(templateData.title)

  switch (format) {
    case 'svg': {
      const svgString = exportTemplateToSvg(templateData, options)
      return {
        content: Buffer.from(svgString, 'utf-8'),
        contentType: 'image/svg+xml; charset=utf-8',
        filename: `${baseFilename}.svg`,
      }
    }
    case 'html': {
      const htmlString = exportTemplateToHtml(templateData, options)
      return {
        content: Buffer.from(htmlString, 'utf-8'),
        contentType: 'text/html; charset=utf-8',
        filename: `${baseFilename}.html`,
      }
    }
    case 'png': {
      const pngBuffer = exportTemplateToPng(templateData, options)
      return {
        content: pngBuffer,
        contentType: 'image/png',
        filename: `${baseFilename}.png`,
      }
    }
    case 'pptx': {
      const pptxBuffer = await exportTemplateToPptx(templateData, options)
      return {
        content: pptxBuffer,
        contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        filename: `${baseFilename}.pptx`,
      }
    }
    default:
      throw new Error(`Unsupported output format: ${String(format)}`)
  }
}
