import { describe, it, expect } from 'vitest'
import { parseMermaid } from '../parseMermaid'

describe('parseMermaid', () => {
  it('parse un graph simple avec des rectangles', () => {
    const dsl = `graph TD
    A[Login] --> B[Dashboard]`

    const { model } = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(2)

    const shapeA = model.shapes.find(s => s.text.content === 'Login')
    expect(shapeA?.type).toBe('rectangle')

    const shapeB = model.shapes.find(s => s.text.content === 'Dashboard')
    expect(shapeB?.type).toBe('rectangle')
  })

  it('parse un graph avec des connexions', () => {
    const dsl = `graph TD
    A[Start] --> B[End]`

    const { model } = parseMermaid(dsl)
    expect(model.connections).toHaveLength(1)

    const shapeA = model.shapes.find(s => s.text.content === 'Start')!
    const shapeB = model.shapes.find(s => s.text.content === 'End')!
    expect(model.connections[0]?.sourceId).toBe(shapeA.id)
    expect(model.connections[0]?.targetId).toBe(shapeB.id)
  })

  it('parse plusieurs types de formes', () => {
    const dsl = `graph LR
    A[Rectangle]
    B(Diamond)
    C{Decision}
    D((Circle))`

    const { model } = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(4)

    const types = model.shapes.map(s => s.type)
    expect(types).toContain('rectangle')
    expect(types).toContain('ellipse')
    expect(types).toContain('diamond')
  })

  it('parse des connexions en chaine', () => {
    const dsl = `graph LR
    A --> B --> C`

    const { model } = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(3)
    expect(model.connections).toHaveLength(2)
  })

  it('accepte flowchart comme alias de graph', () => {
    const dsl = `flowchart TD
    A[Test] --> B[Result]`

    const { model } = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(2)
    expect(model.connections).toHaveLength(1)
  })

  it('attribue des positions initiales', () => {
    const dsl = `graph TD
    A[Top] --> B[Bottom]`

    const { model } = parseMermaid(dsl)
    for (const shape of model.shapes) {
      expect(typeof shape.position.x).toBe('number')
      expect(typeof shape.position.y).toBe('number')
    }
  })

  it('retourne un modele vide pour un DSL vide', () => {
    const { model, subgraphGroups } = parseMermaid('')
    expect(model.shapes).toHaveLength(0)
    expect(model.connections).toHaveLength(0)
    expect(subgraphGroups).toHaveLength(0)
  })

  it('ignore les lignes de commentaire', () => {
    const dsl = `graph TD
    %% This is a comment
    A[Hello] --> B[World]`

    const { model } = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(2)
  })

  it('gere les connexions avec label', () => {
    const dsl = `graph LR
    A[User] -->|click| B[Result]`

    const { model } = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(2)
    expect(model.connections).toHaveLength(1)
  })

  it('ne duplique pas les formes referencees plusieurs fois', () => {
    const dsl = `graph TD
    A[Center] --> B[Left]
    A --> C[Right]`

    const { model } = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(3)
    expect(model.connections).toHaveLength(2)
  })

  describe('subgraphs', () => {
    it('parse un subgraph simple', () => {
      const dsl = `graph TD
    subgraph Groupe
      A[Alpha]
      B[Beta]
    end
    C[Gamma]`

      const { model, subgraphGroups } = parseMermaid(dsl)
      expect(model.shapes).toHaveLength(3)
      expect(subgraphGroups).toHaveLength(1)
      expect(subgraphGroups[0]?.title).toBe('Groupe')
      expect(subgraphGroups[0]?.shapeIds).toHaveLength(2)
    })

    it('parse plusieurs subgraphs', () => {
      const dsl = `graph LR
    subgraph Front-end
      A[React]
      B[Vue]
    end
    subgraph Back-end
      C[Node]
      D[Python]
    end`

      const { model, subgraphGroups } = parseMermaid(dsl)
      expect(model.shapes).toHaveLength(4)
      expect(subgraphGroups).toHaveLength(2)
    })

    it('garde les formes sans subgraph hors des groupes', () => {
      const dsl = `graph TD
    subgraph G1
      A[One]
      B[Two]
    end
    C[Three]`

      const { model, subgraphGroups } = parseMermaid(dsl)
      expect(model.shapes).toHaveLength(3)
      expect(subgraphGroups).toHaveLength(1)

      const shapeC = model.shapes.find(s => s.text.content === 'Three')!
      const allGrouped = subgraphGroups.flatMap(g => g.shapeIds)
      expect(allGrouped).not.toContain(shapeC.id)
    })
  })

  describe('styling', () => {
    it('applique un style direct sur un noeud', () => {
      const dsl = `graph TD
    A[Red] --> B[Blue]
    style A fill:#ff0000,stroke:#990000
    style B fill:#0000ff`

      const { model } = parseMermaid(dsl)
      const shapeA = model.shapes.find(s => s.text.content === 'Red')!
      const shapeB = model.shapes.find(s => s.text.content === 'Blue')!

      expect(shapeA.style.fill).toBe('#ff0000')
      expect(shapeA.style.stroke).toBe('#990000')
      expect(shapeB.style.fill).toBe('#0000ff')
    })

    it('applique un style via classDef et class', () => {
      const dsl = `graph TD
    classDef highlight fill:#f9f,stroke:#333,stroke-width:4px
    A[Important] --> B[Normal]
    class A highlight`

      const { model } = parseMermaid(dsl)
      const shapeA = model.shapes.find(s => s.text.content === 'Important')!
      const shapeB = model.shapes.find(s => s.text.content === 'Normal')!

      expect(shapeA.style.fill).toBe('#f9f')
      expect(shapeA.style.stroke).toBe('#333')
      expect(shapeA.style.strokeWidth).toBe(4)
      expect(shapeB.style.fill).toBe('#ffffff')
    })

    it('le style direct override le classDef', () => {
      const dsl = `graph TD
    classDef myclass fill:#f9f
    style A fill:#ff0000
    A[Styled] --> B[Classed]
    class A,B myclass`

      const { model } = parseMermaid(dsl)
      const shapeA = model.shapes.find(s => s.text.content === 'Styled')!
      const shapeB = model.shapes.find(s => s.text.content === 'Classed')!

      expect(shapeA.style.fill).toBe('#ff0000')
      expect(shapeB.style.fill).toBe('#f9f')
    })
  })
})
