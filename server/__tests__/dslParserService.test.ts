import { describe, expect, it } from 'vitest'
import { parseDslToTemplateData } from '../services/dslParserService'

describe('dslParserService', () => {
  it('parses valid DSL with @ prefix', () => {
    const dsl = `@roadmap "Project Timeline"
  milestone "Kickoff" "Day 1"
  milestone "Delivery" "Final"
`
    const data = parseDslToTemplateData(dsl)
    expect(data).not.toBeNull()
    expect(data.type).toBe('roadmap')
    expect(data.title).toBe('Project Timeline')
  })

  it('normalizes and parses DSL without @ prefix', () => {
    const dsl = `roadmap "Project Timeline"
  milestone "Kickoff" "Day 1"
  milestone "Delivery" "Final"
`
    const data = parseDslToTemplateData(dsl)
    expect(data).not.toBeNull()
    expect(data.type).toBe('roadmap')
  })

  it('throws an error if DSL is empty or invalid', () => {
    expect(() => parseDslToTemplateData('')).toThrow()
    expect(() => parseDslToTemplateData('   \n\n  ')).toThrow()
    expect(() => parseDslToTemplateData('invalidSyntaxWithNoTemplateType')).toThrow()
  })
})
