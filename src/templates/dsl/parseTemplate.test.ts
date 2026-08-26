import { describe, expect, it } from 'vitest'
import { parseTemplateDsl } from './parseTemplate'
import type {
  ValueChainData,
  ValueChain3Data,
  ValueChain4Data,
  ValueChain5Data,
} from '../types'

describe('parseValueChain DSL', () => {
  it('parses @valueChain with primary and support activities', () => {
    const dsl = `
@valueChain "Company Value Chain"
  primary "Inbound Logistics" "Receiving" #1a2249
  primary "Operations" "Manufacturing" #2b63d9
  support "Firm infrastructure" "IT" #ff5338
  support "HR Management" "Recruitment" #ffb100
`
    const parsed = parseTemplateDsl(dsl) as ValueChainData
    expect(parsed).not.toBeNull()
    expect(parsed.type).toBe('valueChain')
    expect(parsed.title).toBe('Company Value Chain')
    expect(parsed.primary).toHaveLength(2)
    expect(parsed.primary[0]!.title).toBe('Inbound Logistics')
    expect(parsed.primary[0]!.subtitle).toBe('Receiving')
    expect(parsed.primary[0]!.color).toBe('#1a2249')
    expect(parsed.support).toHaveLength(2)
    expect(parsed.support[0]!.title).toBe('Firm infrastructure')
    expect(parsed.support[0]!.subtitle).toBe('IT')
    expect(parsed.support[0]!.color).toBe('#ff5338')
  })

  it('parses @valueChain2', () => {
    const dsl = `
@valueChain2 "Operations Value Chain"
  primary "Inbound" #1a2249
  primary "Outbound" #2b63d9
  support "Infrastructure" #7b9fd9
`
    const parsed = parseTemplateDsl(dsl) as ValueChainData
    expect(parsed).not.toBeNull()
    expect(parsed.type).toBe('valueChain2')
    expect(parsed.title).toBe('Operations Value Chain')
    expect(parsed.primary).toHaveLength(2)
    expect(parsed.support).toHaveLength(1)
  })

  it('parses @valueChain3 with topBar, bottomBar, footerText, and items', () => {
    const dsl = `
@valueChain3 "Supply Chain"
  topBar "Product Design"
  bottomBar "Marketing & Sales"
  footerText "Detailed notes here"
  item "Logistics" #1a2249
  item "Purchasing" #2b63d9
  item "Manufacturing" #ff5338
`
    const parsed = parseTemplateDsl(dsl) as ValueChain3Data
    expect(parsed).not.toBeNull()
    expect(parsed.type).toBe('valueChain3')
    expect(parsed.title).toBe('Supply Chain')
    expect(parsed.topBar).toBe('Product Design')
    expect(parsed.bottomBar).toBe('Marketing & Sales')
    expect(parsed.footerText).toBe('Detailed notes here')
    expect(parsed.items).toHaveLength(3)
    expect(parsed.items![0]!.title).toBe('Logistics')
    expect(parsed.items![0]!.color).toBe('#1a2249')
  })

  it('parses @valueChain4 with labels, primary and support', () => {
    const dsl = `
@valueChain4 "IT Value Stream"
  upperLabel "Value streams"
  lowerLabel "Supporting activities"
  centerLabel "Reference architecture"
  rightLabel "Efficiency & Agility"
  primary "Strategy to portfolio" "Plan" #57c5a0
  primary "Requirement to deploy" "Build" #1a2249
  support "Governance" #ffb100
  support "Sourcing" #ffb100
`
    const parsed = parseTemplateDsl(dsl) as ValueChain4Data
    expect(parsed).not.toBeNull()
    expect(parsed.type).toBe('valueChain4')
    expect(parsed.title).toBe('IT Value Stream')
    expect(parsed.upperLabel).toBe('Value streams')
    expect(parsed.lowerLabel).toBe('Supporting activities')
    expect(parsed.centerLabel).toBe('Reference architecture')
    expect(parsed.rightLabel).toBe('Efficiency & Agility')
    expect(parsed.primary).toHaveLength(2)
    expect(parsed.primary![0]!.subtitle).toBe('Plan')
    expect(parsed.support).toHaveLength(2)
  })

  it('parses @valueChain5 with left, bar, and chevron elements', () => {
    const dsl = `
@valueChain5 "Horizontal Value Flow"
  left "Block 1" #1a2249
  left "Block 2" #2b63d9
  bar "Step 1" #ff5338
  bar "Step 2" #ff5338
  chevron "Chevron Yellow" #ffb100
  chevron "Chevron Green" #48bb95
`
    const parsed = parseTemplateDsl(dsl) as ValueChain5Data
    expect(parsed).not.toBeNull()
    expect(parsed.type).toBe('valueChain5')
    expect(parsed.title).toBe('Horizontal Value Flow')
    expect(parsed.leftBlocks).toHaveLength(2)
    expect(parsed.leftBlocks![0]!.title).toBe('Block 1')
    expect(parsed.centerBars).toHaveLength(2)
    expect(parsed.centerBars![0]!.title).toBe('Step 1')
    expect(parsed.rightChevrons).toHaveLength(2)
    expect(parsed.rightChevrons![0]!.title).toBe('Chevron Yellow')
  })
})
