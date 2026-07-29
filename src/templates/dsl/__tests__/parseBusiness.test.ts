import { describe, it, expect } from 'vitest'
import { parseTemplateDsl } from '../parseTemplate'
import type { BusinessData } from '../../types'

describe('parseBusiness DSL', () => {
  it('parses multi-line node syntax with title, subtitle and color', () => {
    const dsl = `@business "Stratégie Entreprise"
center "Vision 2030"
node "Analyse Marché" "Étude des tendances et concurrence" #3b82f6
node "Innovation R&D" "Développement des brevets" #10b981
node "Déploiement" "Commercialisation mondiale"
`
    const parsed = parseTemplateDsl(dsl) as BusinessData
    expect(parsed).not.toBeNull()
    expect(parsed.type).toBe('business')
    expect(parsed.title).toBe('Stratégie Entreprise')
    expect(parsed.centerLabel).toBe('Vision 2030')
    expect(parsed.nodes).toHaveLength(3)
    expect(parsed.nodes[0]).toEqual({
      title: 'Analyse Marché',
      subtitle: 'Étude des tendances et concurrence',
      color: '#3b82f6',
    })
    expect(parsed.nodes[1]).toEqual({
      title: 'Innovation R&D',
      subtitle: 'Développement des brevets',
      color: '#10b981',
    })
    expect(parsed.nodes[2]).toEqual({
      title: 'Déploiement',
      subtitle: 'Commercialisation mondiale',
      color: undefined,
    })
  })

  it('parses multi-line node syntax with title, subtitle, val, pct and color', () => {
    const dsl = `@business "Stratégie Entreprise"
center "Vision 2030"
node "Analyse Marché" "Étude des tendances" val:"£2.5M" pct:"65%" #3b82f6
node "Innovation R&D" "Développement" pct:"80%"
`
    const parsed = parseTemplateDsl(dsl) as BusinessData
    expect(parsed).not.toBeNull()
    expect(parsed.nodes[0]).toEqual({
      title: 'Analyse Marché',
      subtitle: 'Étude des tendances',
      value: '£2.5M',
      percent: '65%',
      color: '#3b82f6',
    })
    expect(parsed.nodes[1]?.percent).toBe('80%')
  })
})
