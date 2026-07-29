import { describe, it, expect, beforeEach } from 'vitest'
import { DiagramModel } from '../DiagramModel'

describe('DiagramModel - Layers / Calques', () => {
  let model: DiagramModel

  beforeEach(() => {
    model = new DiagramModel()
  })

  describe('setShapeHidden', () => {
    it('definit la propriete isHidden a true', () => {
      const shape = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      expect(shape.isHidden).toBeUndefined()

      model.setShapeHidden(shape.id, true)
      expect(model.getShape(shape.id)?.isHidden).toBe(true)
    })

    it('remet isHidden a false', () => {
      const shape = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      model.setShapeHidden(shape.id, true)
      model.setShapeHidden(shape.id, false)
      expect(model.getShape(shape.id)?.isHidden).toBe(false)
    })
  })

  describe('setShapeLocked', () => {
    it('definit la propriete isLocked a true', () => {
      const shape = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      expect(shape.isLocked).toBeUndefined()

      model.setShapeLocked(shape.id, true)
      expect(model.getShape(shape.id)?.isLocked).toBe(true)
    })

    it('remet isLocked a false', () => {
      const shape = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      model.setShapeLocked(shape.id, true)
      model.setShapeLocked(shape.id, false)
      expect(model.getShape(shape.id)?.isLocked).toBe(false)
    })
  })

  describe('reorderShapes', () => {
    it('reordonne les formes selon un tableau d IDs', () => {
      const shape1 = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      const shape2 = model.addShape('ellipse', { x: 10, y: 10 }, { width: 50, height: 50 })
      const shape3 = model.addShape('diamond', { x: 20, y: 20 }, { width: 40, height: 40 })

      expect(model.shapes.map(s => s.id)).toEqual([shape1.id, shape2.id, shape3.id])

      model.reorderShapes([shape3.id, shape1.id, shape2.id])
      expect(model.shapes.map(s => s.id)).toEqual([shape3.id, shape1.id, shape2.id])
    })
  })
})
