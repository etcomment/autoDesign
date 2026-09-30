import { describe, expect, it } from 'vitest'
import { exportTemplateToPptx } from '../formats/pptxExporter'
import { parseDslToTemplateData } from '../services/dslParserService'

describe('pptxExporter', () => {
  it('generates a valid PPTX presentation buffer', async () => {
    const dsl = `@roadmap "Roadmap 2026"`
    const data = parseDslToTemplateData(dsl)
    const pptxBuffer = await exportTemplateToPptx(data)

    expect(Buffer.isBuffer(pptxBuffer)).toBe(true)
    expect(pptxBuffer.length).toBeGreaterThan(1000)
    // PPTX is a zip file: magic bytes 0x50, 0x4B (PK)
    expect(pptxBuffer[0]).toBe(0x50)
    expect(pptxBuffer[1]).toBe(0x4b)
  })
})
