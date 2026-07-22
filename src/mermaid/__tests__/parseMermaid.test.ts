import { describe, it, expect } from 'vitest'
import { parseMermaid } from '../parseMermaid'

describe('parseMermaid', () => {
  it('parse un graph simple avec des rectangles', () => {
    const dsl = `graph TD
    A[Login] --> B[Dashboard]`

    const model = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(2)

    const shapeA = model.shapes.find(s => s.text.content === 'Login')
    expect(shapeA?.type).toBe('rectangle')

    const shapeB = model.shapes.find(s => s.text.content === 'Dashboard')
    expect(shapeB?.type).toBe('rectangle')
  })

  it('parse un graph avec des connexions', () => {
    const dsl = `graph TD
    A[Start] --> B[End]`

    const model = parseMermaid(dsl)
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

    const model = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(4)

    const types = model.shapes.map(s => s.type)
    expect(types).toContain('rectangle')
    expect(types).toContain('ellipse') // circle → ellipse
    expect(types).toContain('diamond')
  })

  it('parse des connexions en chaine', () => {
    const dsl = `graph LR
    A --> B --> C`

    const model = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(3)
    expect(model.connections).toHaveLength(2)
  })

  it('accepte flowchart comme alias de graph', () => {
    const dsl = `flowchart TD
    A[Test] --> B[Result]`

    const model = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(2)
    expect(model.connections).toHaveLength(1)
  })

  it('attribue des positions initiales', () => {
    const dsl = `graph TD
    A[Top] --> B[Bottom]`

    const model = parseMermaid(dsl)
    for (const shape of model.shapes) {
      expect(typeof shape.position.x).toBe('number')
      expect(typeof shape.position.y).toBe('number')
    }
  })

  it('retourne un modele vide pour un DSL vide', () => {
    const model = parseMermaid('')
    expect(model.shapes).toHaveLength(0)
    expect(model.connections).toHaveLength(0)
  })

  it('ignore les lignes de commentaire', () => {
    const dsl = `graph TD
    %% This is a comment
    A[Hello] --> B[World]`

    const model = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(2)
  })

  it('gere les connexions avec label', () => {
    const dsl = `graph LR
    A[User] -->|click| B[Result]`

    const model = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(2)
    expect(model.connections).toHaveLength(1)
  })

  it('ne duplique pas les formes referencees plusieurs fois', () => {
    const dsl = `graph TD
    A[Center] --> B[Left]
    A --> C[Right]`

    const model = parseMermaid(dsl)
    expect(model.shapes).toHaveLength(3) // A, B, C — A should appear only once
    expect(model.connections).toHaveLength(2)
  })
})
