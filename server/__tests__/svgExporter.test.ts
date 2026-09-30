import { describe, expect, it } from 'vitest'
import { exportTemplateToSvg } from '../formats/svgExporter'
import { parseDslToTemplateData } from '../services/dslParserService'

describe('svgExporter', () => {
  it('renders template data into a full SVG document', () => {
    const dsl = `@roadmap "Q1 Release"
  milestone "Kickoff" "Jan"
  milestone "Launch" "Mar"
`
    const data = parseDslToTemplateData(dsl)
    const svg = exportTemplateToSvg(data)

    expect(svg).toContain('<svg xmlns="http://www.w3.org/2000/svg"')
    expect(svg).toContain('viewBox="0 0 1000 600"')
    expect(svg).toContain('Kickoff')
    expect(svg).toContain('Launch')
    expect(svg).toContain('</svg>')
  })

  it('respects custom width and height options', () => {
    const dsl = `@puzzle "Team Puzzle"`
    const data = parseDslToTemplateData(dsl)
    const svg = exportTemplateToSvg(data, { width: 1200, height: 720 })

    expect(svg).toContain('width="1200"')
    expect(svg).toContain('height="720"')
    expect(svg).toContain('viewBox="0 0 1000 600"')
  })
})
