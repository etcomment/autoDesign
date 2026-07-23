import { describe, it, expect } from 'vitest'
import { parseSequenceDiagram } from '../parseSequenceDiagram'

describe('parseSequenceDiagram', () => {
  it('parse des participants', () => {
    const dsl = `sequenceDiagram
    participant Alice
    participant Bob`

    const { model, sequenceData } = parseSequenceDiagram(dsl)
    expect(sequenceData.participants).toHaveLength(2)
    expect(sequenceData.participants[0]?.name).toBe('Alice')
    expect(sequenceData.participants[1]?.name).toBe('Bob')
    expect(model.shapes).toHaveLength(2)
  })

  it('parse un participant avec alias as', () => {
    const dsl = `sequenceDiagram
    participant A as Alice
    participant B`

    const { model, sequenceData } = parseSequenceDiagram(dsl)
    expect(sequenceData.participants[0]?.name).toBe('A')
    const shapeA = model.shapes.find(s => s.text.content === 'Alice')
    expect(shapeA).toBeTruthy()
  })

  it('parse des messages simples', () => {
    const dsl = `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>Bob: Hello`

    const { model, sequenceData } = parseSequenceDiagram(dsl)
    expect(sequenceData.messages).toHaveLength(1)
    expect(sequenceData.messages[0]?.label).toBe('Hello')
    expect(sequenceData.messages[0]?.type).toBe('open')
    expect(model.connections).toHaveLength(1)
  })

  it('parse des messages dashed', () => {
    const dsl = `sequenceDiagram
    participant A
    participant B
    A-->B: Response`

    const { sequenceData } = parseSequenceDiagram(dsl)
    expect(sequenceData.messages[0]?.type).toBe('dashed')
  })

  it('parse plusieurs messages entre les memes participants', () => {
    const dsl = `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>Bob: Request
    Bob-->>Alice: Response
    Alice->>Bob: Another`

    const { model, sequenceData } = parseSequenceDiagram(dsl)
    expect(model.shapes).toHaveLength(2)
    expect(sequenceData.messages).toHaveLength(3)
    expect(model.connections).toHaveLength(3)
  })

  it('gère les messages sans label', () => {
    const dsl = `sequenceDiagram
    participant A
    participant B
    A->>B`

    const { sequenceData } = parseSequenceDiagram(dsl)
    expect(sequenceData.messages[0]?.label).toBe('')
  })

  it('supporte le type actor', () => {
    const dsl = `sequenceDiagram
    actor User
    actor System`

    const { model, sequenceData } = parseSequenceDiagram(dsl)
    expect(sequenceData.participants).toHaveLength(2)
    expect(model.shapes).toHaveLength(2)
  })

  it('positionne les participants horizontalement', () => {
    const dsl = `sequenceDiagram
    participant A
    participant B
    participant C`

    const { model } = parseSequenceDiagram(dsl)
    const shapes = model.shapes
    expect(shapes[0]!.position.x).toBe(100)
    expect(shapes[1]!.position.x).toBe(300)
    expect(shapes[2]!.position.x).toBe(500)
  })

  it('gère les flèches d\'activation +', () => {
    const dsl = `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>+Bob: Activate
    Bob-->>-Alice: Deactivate`

    const { sequenceData } = parseSequenceDiagram(dsl)
    expect(sequenceData.messages).toHaveLength(2)
    expect(sequenceData.messages[0]?.type).toBe('open')
    expect(sequenceData.messages[1]?.type).toBe('dotted-open')
    expect(sequenceData.activations).toHaveLength(1)
    expect(sequenceData.activations[0]?.actorName).toBe('Bob')
    expect(sequenceData.activations[0]?.startMessageIndex).toBe(0)
    expect(sequenceData.activations[0]?.endMessageIndex).toBe(1)
  })

  it('gère les flèches de désactivation -', () => {
    const dsl = `sequenceDiagram
    participant A
    participant B
    A->>+B: Call
    B->>-A: Return`

    const { sequenceData } = parseSequenceDiagram(dsl)
    expect(sequenceData.activations).toHaveLength(1)
    expect(sequenceData.activations[0]?.actorName).toBe('B')
    expect(sequenceData.activations[0]?.startMessageIndex).toBe(0)
    expect(sequenceData.activations[0]?.endMessageIndex).toBe(1)
  })

  it('gère activate/deactivate manuel', () => {
    const dsl = `sequenceDiagram
    participant A
    activate A
    A->>A: Self
    deactivate A`

    const { sequenceData } = parseSequenceDiagram(dsl)
    expect(sequenceData.activations).toHaveLength(1)
    expect(sequenceData.activations[0]?.actorName).toBe('A')
  })
})
