import { describe, expect, it } from 'vitest'
import { exportTemplateToPng } from '../formats/pngExporter'
import { parseDslToTemplateData } from '../services/dslParserService'

describe('pngExporter', () => {
  it('converts template SVG into a valid PNG buffer', () => {
    const dsl = `@roadmap "Roadmap 2026"`
    const data = parseDslToTemplateData(dsl)
    const pngBuffer = exportTemplateToPng(data)

    expect(Buffer.isBuffer(pngBuffer)).toBe(true)
    expect(pngBuffer.length).toBeGreaterThan(1000)
    // PNG magic bytes: 0x89, 'P', 'N', 'G', 0x0D, 0x0A, 0x1A, 0x0A
    expect(pngBuffer[0]).toBe(0x89)
    expect(pngBuffer[1]).toBe(0x50)
    expect(pngBuffer[2]).toBe(0x4e)
    expect(pngBuffer[3]).toBe(0x47)
  })
})
