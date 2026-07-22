import { describe, it, expect } from 'vitest'
import { parseClassDiagram } from '../parseClassDiagram'

describe('parseClassDiagram', () => {
  it('parse une classe vide', () => {
    const dsl = `classDiagram
    class Animal`

    const model = parseClassDiagram(dsl)
    expect(model.shapes).toHaveLength(1)
    const shape = model.shapes[0]!
    expect(shape.text.content).toContain('Animal')
    expect(shape.type).toBe('rectangle')
  })

  it('parse une classe avec attributs', () => {
    const dsl = `classDiagram
    class Animal {
        +String name
        +int age
    }`

    const model = parseClassDiagram(dsl)
    expect(model.shapes).toHaveLength(1)
    const text = model.shapes[0]!.text.content
    expect(text).toContain('+ name: String')
    expect(text).toContain('+ age: int')
  })

  it('parse une classe avec methodes', () => {
    const dsl = `classDiagram
    class Animal {
        +makeSound() void
        -eat() int
    }`

    const model = parseClassDiagram(dsl)
    const text = model.shapes[0]!.text.content
    expect(text).toContain('+ makeSound(): void')
    expect(text).toContain('- eat(): int')
  })

  it('parse plusieurs classes', () => {
    const dsl = `classDiagram
    class Animal {
        +String name
    }
    class Dog {
        +String breed
        +bark() void
    }`

    const model = parseClassDiagram(dsl)
    expect(model.shapes).toHaveLength(2)
  })

  it('parse une relation d heritage', () => {
    const dsl = `classDiagram
    class Animal
    class Dog
    Animal <|-- Dog`

    const model = parseClassDiagram(dsl)
    expect(model.shapes).toHaveLength(2)
    expect(model.connections).toHaveLength(1)
  })

  it('parse une composition', () => {
    const dsl = `classDiagram
    class Car
    class Engine
    Car *-- Engine`

    const model = parseClassDiagram(dsl)
    expect(model.connections).toHaveLength(1)
  })

  it('parse une agregation', () => {
    const dsl = `classDiagram
    class Library
    class Book
    Library o-- Book`

    const model = parseClassDiagram(dsl)
    expect(model.connections).toHaveLength(1)
  })

  it('parse une association', () => {
    const dsl = `classDiagram
    class Customer
    class Order
    Customer --> Order`

    const model = parseClassDiagram(dsl)
    expect(model.connections).toHaveLength(1)
  })

  it('gere la visibilite sans prefixe', () => {
    const dsl = `classDiagram
    class Config {
        maxRetries int
        timeout() int
    }`

    const model = parseClassDiagram(dsl)
    const text = model.shapes[0]!.text.content
    expect(text).toContain('int: maxRetries')
    expect(text).toContain('timeout(): int')
  })

  it('ne cree pas de connexions pour des classes inexistantes', () => {
    const dsl = `classDiagram
    class Animal
    Unknown <|-- Animal`

    const model = parseClassDiagram(dsl)
    expect(model.shapes).toHaveLength(1)
    expect(model.connections).toHaveLength(0)
  })
})
