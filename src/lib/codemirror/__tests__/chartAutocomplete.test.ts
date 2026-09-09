import { describe, it, expect } from 'vitest'
import { EditorState } from '@codemirror/state'
import { CompletionContext } from '@codemirror/autocomplete'
import { chartCompletionSource } from '../chartAutocomplete'
import { templateDslUnifiedCompletionSource } from '../iconAutocomplete'

function createContext(doc: string): CompletionContext {
  const state = EditorState.create({ doc, selection: { anchor: doc.length } })
  return new CompletionContext(state, doc.length, false)
}

describe('chartAutocomplete', () => {
  it('propose les options chart: directement après le titre de la métrique', () => {
    const context = createContext('metric "Revenue" ')
    const result = chartCompletionSource(context)
    expect(result).not.toBeNull()
    const labels = result!.options.map(option => option.label)
    expect(labels).toContain('chart:line')
    expect(labels).toContain('chart:bar')
    expect(labels).toContain('chart:pie')
    expect(labels).toContain('chart:gauge')
    expect(labels).toContain('chart:stat')
  })

  it('filtre les options quand on commence à taper ch après le titre', () => {
    const context = createContext('metric "Revenue" ch')
    const result = chartCompletionSource(context)
    expect(result).not.toBeNull()
    expect(result!.from).toBe('metric "Revenue" '.length)
    const labels = result!.options.map(option => option.label)
    expect(labels).toContain('chart:line')
  })

  it('propose les types de graphiques après chart:', () => {
    const context = createContext('metric "Revenue" chart:')
    const result = chartCompletionSource(context)
    expect(result).not.toBeNull()
    const labels = result!.options.map(option => option.label)
    expect(labels).toContain('line')
    expect(labels).toContain('bar')
    expect(labels).toContain('pie')
    expect(labels).toContain('gauge')
    expect(labels).toContain('stat')
    expect(labels).toContain('progress')
    expect(labels).toContain('area')
  })

  it('gère le préfixe tapé après chart:li', () => {
    const context = createContext('metric "Revenue" chart:li')
    const result = chartCompletionSource(context)
    expect(result).not.toBeNull()
    expect(result!.from).toBe('metric "Revenue" chart:'.length)
  })

  it('permet l autocomplétion unifiée avec icon: et chart:', () => {
    const chartContext = createContext('metric "Revenue" chart:')
    const chartResult = templateDslUnifiedCompletionSource(chartContext)
    expect(chartResult).not.toBeNull()
    const chartLabels = chartResult!.options.map(o => o.label)
    expect(chartLabels).toContain('line')

    const iconContext = createContext('metric "Revenue" icon:')
    const iconResult = templateDslUnifiedCompletionSource(iconContext)
    expect(iconResult).not.toBeNull()
    const iconLabels = iconResult!.options.map(o => o.label)
    expect(iconLabels).toContain('briefcase')
  })
})
