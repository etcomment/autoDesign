import { describe, expect, it } from 'vitest'
import { TEMPLATES } from '../../registry'
import { generateDslText, parseTemplateDsl } from '../parseTemplate'

describe('All Templates DSL Audit', () => {
  for (const tpl of TEMPLATES) {
    it(`should roundtrip DSL generation and parsing for ${tpl.type} (${tpl.category})`, () => {
      const generatedDsl = generateDslText(tpl.type, tpl.defaultData)
      expect(generatedDsl).toBeTruthy()
      expect(generatedDsl.trim().startsWith(`@${tpl.type}`)).toBe(true)

      const parsed = parseTemplateDsl(generatedDsl)
      expect(parsed).not.toBeNull()
      expect(parsed?.type).toBe(tpl.type)
    })
  }
})
