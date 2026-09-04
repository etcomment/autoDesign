import { describe, it, expect } from 'vitest'
import { EditorState } from '@codemirror/state'
import { CompletionContext } from '@codemirror/autocomplete'
import { iconCompletionSource } from '../iconAutocomplete'

function createContext(doc: string): CompletionContext {
  const state = EditorState.create({ doc, selection: { anchor: doc.length } })
  return new CompletionContext(state, doc.length, false)
}

describe('iconAutocomplete', () => {
  it('propose des autocomplétions immédiatement après icon:', () => {
    const context = createContext('piece "Identify" "desc" icon:')
    const result = iconCompletionSource(context)
    expect(result).not.toBeNull()
    expect(result!.from).toBe(29)
    expect(result!.options.length).toBeGreaterThan(100)
    const labels = result!.options.map(option => option.label)
    expect(labels).toContain('clock')
    expect(labels).toContain('briefcase')
    expect(labels).toContain('people')
    expect(labels).toContain('gear')
  })

  it('gère le préfixe tapé après icon:', () => {
    const context = createContext('piece "Identify" "desc" icon:clo')
    const result = iconCompletionSource(context)
    expect(result).not.toBeNull()
    expect(result!.from).toBe(29)
  })

  it('gère les guillemets ouverts après icon:"', () => {
    const context = createContext('piece "Identify" "desc" icon:"br')
    const result = iconCompletionSource(context)
    expect(result).not.toBeNull()
    expect(result!.from).toBe(30)
  })

  it('retourne null en dehors du contexte icon:', () => {
    const context = createContext('piece "Identify" "desc"')
    const result = iconCompletionSource(context)
    expect(result).toBeNull()
  })

  it('inclut des icônes Lucide et des icônes MIGSO', () => {
    const context = createContext('piece "Test" icon:')
    const result = iconCompletionSource(context)
    const labels = result!.options.map(option => option.label)
    expect(labels).toContain('rocket')
    expect(labels).toContain('set1_line_001')
  })
})
