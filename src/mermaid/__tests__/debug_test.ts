import { describe, it, expect } from 'vitest'
import { parseMermaid } from '../parseMermaid'

describe('debug styling', () => {
  it('style direct', () => {
    const dsl = `graph TD
    A[Red] --> B[Blue]
    style A fill:#ff0000,stroke:#990000
    style B fill:#0000ff`

    const { model } = parseMermaid(dsl)
    console.log('shapes:', model.shapes.length)
    for (const s of model.shapes) {
      console.log('  shape:', s.text.content, 'fill:', s.style.fill, 'stroke:', s.style.stroke)
    }
    const shapeA = model.shapes.find(s => s.text.content === 'Red')!
    console.log('shapeA fill:', shapeA.style.fill)
    expect(shapeA.style.fill).toBe('#ff0000')
  })
})
