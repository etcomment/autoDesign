import { describe, expect, it } from 'vitest'
import { generateDslText, parseTemplateDsl } from '../parseTemplate'
import type { ImportedTemplateData } from '../../types'

const DATA: ImportedTemplateData = {
  type: 'importedPieSlide12',
  importedItems: [
    { ooxmlId: 'shape-1', title: 'Vision', subtitle: 'Direction', color: '#2c2b64' },
    { ooxmlId: 'shape-2', title: 'Exécution' },
    { ooxmlId: 'shape-3' },
  ],
}

describe('ImportedTemplate DSL', () => {
  it('génère une ligne item par élément importé', () => {
    const dsl = generateDslText(DATA.type, DATA)
    expect(dsl).toContain('@importedPieSlide12')
    expect(dsl).toContain('item "shape-1" "Vision" "Direction" #2c2b64')
    expect(dsl).toContain('item "shape-2" "Exécution"')
    expect(dsl).toContain('item "shape-3"')
  })

  it('roundtrip : le DSL généré reparses vers les mêmes items', () => {
    const dsl = generateDslText(DATA.type, DATA)
    const parsed = parseTemplateDsl(dsl) as unknown as ImportedTemplateData
    expect(parsed).not.toBeNull()
    expect(parsed.type).toBe('importedPieSlide12')
    expect(parsed.importedItems).toHaveLength(3)
    expect(parsed.importedItems[0]).toEqual({ ooxmlId: 'shape-1', title: 'Vision', subtitle: 'Direction', color: '#2c2b64' })
    expect(parsed.importedItems[1]!.ooxmlId).toBe('shape-2')
    expect(parsed.importedItems[1]!.title).toBe('Exécution')
    expect(parsed.importedItems[2]!.ooxmlId).toBe('shape-3')
  })

  it('les couleurs explicites sont préservées sans sous-titre', () => {
    const dsl = '@importedX\n  item "a" "Seulement titre" #ff5338'
    const parsed = parseTemplateDsl(dsl) as unknown as ImportedTemplateData
    expect(parsed.importedItems[0]).toEqual({ ooxmlId: 'a', title: 'Seulement titre', subtitle: undefined, color: '#ff5338' })
  })
})
