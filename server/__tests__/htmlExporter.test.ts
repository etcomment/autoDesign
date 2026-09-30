import { describe, expect, it } from 'vitest'
import { exportTemplateToHtml } from '../formats/htmlExporter'
import { parseDslToTemplateData } from '../services/dslParserService'

describe('htmlExporter', () => {
  it('wraps template SVG in a responsive HTML document', () => {
    const dsl = `@roadmap "Roadmap 2026"`
    const data = parseDslToTemplateData(dsl)
    const html = exportTemplateToHtml(data)

    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('<html lang="en">')
    expect(html).toContain('<svg xmlns="http://www.w3.org/2000/svg"')
    expect(html).toContain('Roadmap 2026')
    expect(html).toContain('</html>')
  })
})
