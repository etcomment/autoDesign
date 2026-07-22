import { describe, it, expect, beforeEach } from 'vitest'
import { DiagramModel } from '../DiagramModel'
import type { ShapeType} from '../Shape'

describe('DiagramModel', () => {
  let model: DiagramModel

  beforeEach(() => {
    model = new DiagramModel()
  })

  describe('addShape', () => {
    it('ajoute une forme avec une position donnee', () => {
      const shape = model.addShape('rectangle', { x: 100, y: 200 }, { width: 80, height: 40 })
      expect(model.shapes).toHaveLength(1)
      expect(shape.position).toEqual({ x: 100, y: 200 })
      expect(shape.dimensions).toEqual({ width: 80, height: 40 })
      expect(shape.type).toBe('rectangle')
    })

    it('genere un id unique pour chaque forme', () => {
      const shape1 = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      const shape2 = model.addShape('ellipse', { x: 0, y: 0 }, { width: 100, height: 50 })
      expect(shape1.id).not.toBe(shape2.id)
    })

    it('applique le style par defaut', () => {
      const shape = model.addShape('diamond', { x: 0, y: 0 }, { width: 80, height: 80 })
      expect(shape.style.fill).toBe('#ffffff')
      expect(shape.style.stroke).toBe('#333333')
      expect(shape.style.strokeWidth).toBe(2)
    })
  })

  describe('removeShape', () => {
    it('retire une forme par son id', () => {
      const shape = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      model.removeShape(shape.id)
      expect(model.shapes).toHaveLength(0)
    })

    it('ne fait rien si l id n existe pas', () => {
      model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      model.removeShape('nonexistent')
      expect(model.shapes).toHaveLength(1)
    })
  })

  describe('moveShape', () => {
    it('deplace une forme vers de nouvelles coordonnees', () => {
      const shape = model.addShape('rectangle', { x: 100, y: 200 }, { width: 80, height: 40 })
      model.moveShape(shape.id, { x: 300, y: 400 })
      const moved = model.getShape(shape.id)
      expect(moved?.position).toEqual({ x: 300, y: 400 })
    })

    it('ne fait rien si l id n existe pas', () => {
      expect(() => model.moveShape('nonexistent', { x: 0, y: 0 })).not.toThrow()
    })
  })

  describe('resizeShape', () => {
    it('redimensionne une forme', () => {
      const shape = model.addShape('rectangle', { x: 0, y: 0 }, { width: 80, height: 40 })
      model.resizeShape(shape.id, { width: 160, height: 80 })
      const resized = model.getShape(shape.id)
      expect(resized?.dimensions).toEqual({ width: 160, height: 80 })
    })
  })

  describe('updateShapeStyle', () => {
    it('met a jour le style d une forme', () => {
      const shape = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      model.updateShapeStyle(shape.id, { fill: '#ff0000', strokeWidth: 4 })
      const updated = model.getShape(shape.id)
      expect(updated?.style.fill).toBe('#ff0000')
      expect(updated?.style.strokeWidth).toBe(4)
      expect(updated?.style.stroke).toBe('#333333') // unchanged
    })
  })

  describe('serialization', () => {
    it('exporte et importe vers/depuis JSON', () => {
      model.addShape('rectangle', { x: 100, y: 200 }, { width: 80, height: 40 })
      model.addShape('ellipse', { x: 300, y: 400 }, { width: 60, height: 60 })

      const json = model.serialize()
      const restored = DiagramModel.deserialize(json)

      expect(restored.shapes).toHaveLength(2)
      expect(restored.shapes[0]?.id).toBe(model.shapes[0]?.id)
      expect(restored.shapes[1]?.position).toEqual({ x: 300, y: 400 })
    })
  })

  describe('getShape', () => {
    it('retourne une forme par id', () => {
      const shape = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      const found = model.getShape(shape.id)
      expect(found).toBe(shape)
    })

    it('retourne undefined si l id n existe pas', () => {
      expect(model.getShape('nonexistent')).toBeUndefined()
    })
  })

  it('multiple form types sont acceptes', () => {
    const types: ShapeType[] = ['rectangle', 'ellipse', 'diamond']
    for (const type of types) {
      model.addShape(type, { x: 0, y: 0 }, { width: 100, height: 100 })
    }
    expect(model.shapes).toHaveLength(types.length)
    expect(model.shapes.map(s => s.type)).toEqual(types)
  })
})
