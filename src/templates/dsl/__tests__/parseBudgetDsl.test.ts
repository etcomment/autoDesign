import { describe, expect, it } from 'vitest'
import { generateDslText, parseTemplateDsl } from '../parseTemplate'
import { TEMPLATES } from '../../registry'
import type { BudgetData } from '../../types'

describe('Budget DSL Specification & Parsing', () => {
  it('parses @budget (Slide 21) with items, bullets, amounts and colors', () => {
    const dsl = `
@budget "Budget Summary"
  total "Total" "£100,000"
  item "Budget" "£50,000" #1a2249
    bullet "First bullet point"
    bullet "Second bullet point"
  item "Spending" "£30,000" #2b63d9
    - "Dashed bullet"
  item "Saving" "£20,000" #ff5338
    point "Point bullet"
`
    const parsed = parseTemplateDsl(dsl) as BudgetData
    expect(parsed).not.toBeNull()
    expect(parsed.type).toBe('budget')
    expect(parsed.title).toBe('Budget Summary')
    expect(parsed.totalLabel).toBe('Total')
    expect(parsed.totalAmount).toBe('£100,000')
    expect(parsed.items).toHaveLength(3)

    expect(parsed.items[0]?.label).toBe('Budget')
    expect(parsed.items[0]?.amount).toBe('£50,000')
    expect(parsed.items[0]?.color).toBe('#1a2249')
    expect(parsed.items[0]?.bullets).toEqual(['First bullet point', 'Second bullet point'])

    expect(parsed.items[1]?.label).toBe('Spending')
    expect(parsed.items[1]?.amount).toBe('£30,000')
    expect(parsed.items[1]?.bullets).toEqual(['Dashed bullet'])

    expect(parsed.items[2]?.label).toBe('Saving')
    expect(parsed.items[2]?.amount).toBe('£20,000')
    expect(parsed.items[2]?.bullets).toEqual(['Point bullet'])
  })

  it('parses @budget2 (Slide 22) with horizontal bars and percentages', () => {
    const dsl = `
@budget2 "Yearly Progression"
  bar "2020" 30% #1a2249
  bar "2021" 45% #2b63d9
  bar "2022" 60% #ff5338
  bar "2023" 75% #ffb100
  bar "2024" 90% #48bb95
`
    const parsed = parseTemplateDsl(dsl) as BudgetData
    expect(parsed).not.toBeNull()
    expect(parsed.type).toBe('budget2')
    expect(parsed.title).toBe('Yearly Progression')
    expect(parsed.items).toHaveLength(5)
    expect(parsed.items[0]?.label).toBe('2020')
    expect(parsed.items[0]?.percentage).toBe(30)
    expect(parsed.items[0]?.color).toBe('#1a2249')
    expect(parsed.items[4]?.label).toBe('2024')
    expect(parsed.items[4]?.percentage).toBe(90)
    expect(parsed.items[4]?.color).toBe('#48bb95')
  })

  it('parses @budget3 (Slide 23) with cones, amounts and auto-calculated heights', () => {
    const dsl = `
@budget3 "Monthly Cones"
  total "Total" "£76,100"
  cone "JANUARY" "£17,300" 70% #1a2249
  cone "FEBRUARY" "£7,600" 30% #2b63d9
  cone "MARCH" "£25,000" 100% #ff5338
`
    const parsed = parseTemplateDsl(dsl) as BudgetData
    expect(parsed).not.toBeNull()
    expect(parsed.type).toBe('budget3')
    expect(parsed.title).toBe('Monthly Cones')
    expect(parsed.totalAmount).toBe('£76,100')
    expect(parsed.items).toHaveLength(3)
    expect(parsed.items[0]?.label).toBe('JANUARY')
    expect(parsed.items[0]?.amount).toBe('£17,300')
    expect(parsed.items[0]?.percentage).toBe(70)

    const dslAutoHeight = `
@budget3
  cone "JANUARY" "£10,000"
  cone "MAY" "£20,000"
`
    const parsedAuto = parseTemplateDsl(dslAutoHeight) as BudgetData
    expect(parsedAuto.items[1]?.percentage).toBe(100)
    expect(parsedAuto.items[0]?.percentage).toBe(50)
  })

  it('parses @budget4 (Slide 24) with gauges, subtitles and percentages', () => {
    const dsl = `
@budget4 "Performance Gauges"
  total "Average" "60%"
  gauge "Title 01" "Detailed explanation for 01" 72% #1a2249
  gauge "Title 02" 68% #2b63d9
    subtitle "Indented explanation for 02"
`
    const parsed = parseTemplateDsl(dsl) as BudgetData
    expect(parsed).not.toBeNull()
    expect(parsed.type).toBe('budget4')
    expect(parsed.items).toHaveLength(2)
    expect(parsed.items[0]?.label).toBe('Title 01')
    expect(parsed.items[0]?.subtitle).toBe('Detailed explanation for 01')
    expect(parsed.items[0]?.percentage).toBe(72)
    expect(parsed.items[0]?.color).toBe('#1a2249')

    expect(parsed.items[1]?.label).toBe('Title 02')
    expect(parsed.items[1]?.subtitle).toBe('Indented explanation for 02')
    expect(parsed.items[1]?.percentage).toBe(68)
  })

  it('parses @budget5 (Slide 25) with columns, rows and multi-value total', () => {
    const dsl = `
@budget5 "Financial Table"
  columns "Cost type" "Planned (£)" "Actual (£)" "Variance (£)"
  row "Staff Costs" "£5,000.00" "£3,000.00" "£2,000.00"
  row "Material" "£4,000.00" "£2,500.00" "£1,500.00"
  total "Total costs" "£9,000.00" "£5,500.00" "£3,500.00"
`
    const parsed = parseTemplateDsl(dsl) as BudgetData
    expect(parsed).not.toBeNull()
    expect(parsed.type).toBe('budget5')
    expect(parsed.columns).toEqual(['Cost type', 'Planned (£)', 'Actual (£)', 'Variance (£)'])
    expect(parsed.totalLabel).toBe('Total costs')
    expect(parsed.totalAmount).toBe('£9,000.00')
    expect(parsed.totalActual).toBe('£5,500.00')
    expect(parsed.totalVariance).toBe('£3,500.00')

    expect(parsed.items).toHaveLength(2)
    expect(parsed.items[0]?.label).toBe('Staff Costs')
    expect(parsed.items[0]?.planned).toBe('£5,000.00')
    expect(parsed.items[0]?.actual).toBe('£3,000.00')
    expect(parsed.items[0]?.variance).toBe('£2,000.00')
  })

  it('roundtrips generateDslText and parseTemplateDsl cleanly for all 5 budget templates', () => {
    const budgetTypes = ['budget', 'budget2', 'budget3', 'budget4', 'budget5'] as const
    for (const bType of budgetTypes) {
      const tpl = TEMPLATES.find(t => t.type === bType)!
      expect(tpl).toBeDefined()

      const generated = generateDslText(bType, tpl.defaultData)
      expect(generated).toContain(`@${bType}`)
      expect(generated).not.toContain('""%')

      const reparsed = parseTemplateDsl(generated) as BudgetData
      expect(reparsed).not.toBeNull()
      expect(reparsed.type).toBe(bType)
      expect(reparsed.items.length).toBe((tpl.defaultData as BudgetData).items.length)

      if (bType === 'budget') {
        expect(reparsed.items[0]?.bullets?.length).toBeGreaterThan(0)
      } else if (bType === 'budget4') {
        expect(reparsed.items[0]?.subtitle).toBeTruthy()
        expect(reparsed.items[0]?.percentage).toBe(72)
      } else if (bType === 'budget5') {
        expect(reparsed.columns?.length).toBe(4)
        expect(reparsed.items[0]?.planned).toBeTruthy()
        expect(reparsed.items[0]?.actual).toBeTruthy()
        expect(reparsed.items[0]?.variance).toBeTruthy()
        expect(reparsed.totalActual).toBe('£30,000.00')
        expect(reparsed.totalVariance).toBe('£20,000.00')
      }
    }
  })
})
