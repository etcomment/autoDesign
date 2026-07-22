import { describe, it, expect, beforeEach } from 'vitest'
import { History } from '../History'
import { DiagramModel } from '../../model/DiagramModel'

describe('History (Undo/Redo)', () => {
  let model: DiagramModel
  let history: History

  beforeEach(() => {
    model = new DiagramModel()
    history = new History(model)
  })

  describe('undo/redo suite complete', () => {
    it('ajoute une forme, undo la retire, redo la remet', () => {
      const shape = history.addShape('rectangle', { x: 10, y: 20 }, { width: 100, height: 50 })
      expect(model.shapes).toHaveLength(1)

      history.undo()
      expect(model.shapes).toHaveLength(0)

      history.redo()
      expect(model.shapes).toHaveLength(1)
      expect(model.getShape(shape.id)?.position).toEqual({ x: 10, y: 20 })
    })

    it('deplace une forme, undo la remet a sa place', () => {
      const shape = history.addShape('rectangle', { x: 0, y: 0 }, { width: 80, height: 40 })

      history.moveShape(shape.id, { x: 100, y: 200 })
      expect(model.getShape(shape.id)?.position).toEqual({ x: 100, y: 200 })

      history.undo()
      expect(model.getShape(shape.id)?.position).toEqual({ x: 0, y: 0 })

      history.redo()
      expect(model.getShape(shape.id)?.position).toEqual({ x: 100, y: 200 })
    })

    it('redimensionne une forme, undo restore les dimensions originales', () => {
      const shape = history.addShape('ellipse', { x: 0, y: 0 }, { width: 50, height: 50 })

      history.resizeShape(shape.id, { width: 200, height: 100 })
      expect(model.getShape(shape.id)?.dimensions).toEqual({ width: 200, height: 100 })

      history.undo()
      expect(model.getShape(shape.id)?.dimensions).toEqual({ width: 50, height: 50 })
    })

    it('supprime une forme, undo la restaure', () => {
      const shape = history.addShape('diamond', { x: 50, y: 50 }, { width: 80, height: 80 })

      history.removeShape(shape.id)
      expect(model.shapes).toHaveLength(0)

      history.undo()
      expect(model.shapes).toHaveLength(1)
      expect(model.getShape(shape.id)?.type).toBe('diamond')
    })

    it('modifie le style, undo restaure le style original', () => {
      const shape = history.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      const originalFill = shape.style.fill

      history.updateShapeStyle(shape.id, { fill: '#ff0000', strokeWidth: 8 })
      expect(model.getShape(shape.id)?.style.fill).toBe('#ff0000')
      expect(model.getShape(shape.id)?.style.strokeWidth).toBe(8)

      history.undo()
      expect(model.getShape(shape.id)?.style.fill).toBe(originalFill)
      expect(model.getShape(shape.id)?.style.strokeWidth).toBe(2)
    })
  })

  describe('commandes multiples', () => {
    it('undo successifs dans l ordre inverse', () => {
      history.addShape('rectangle', { x: 0, y: 0 }, { width: 50, height: 50 })
      const shape2 = history.addShape('ellipse', { x: 100, y: 0 }, { width: 50, height: 50 })
      history.moveShape(shape2.id, { x: 200, y: 100 })

      expect(model.shapes).toHaveLength(2)

      history.undo() // undo move
      expect(model.getShape(shape2.id)?.position).toEqual({ x: 100, y: 0 })

      history.undo() // undo add shape2
      expect(model.shapes).toHaveLength(1)

      history.undo() // undo add shape1
      expect(model.shapes).toHaveLength(0)
    })

    it('redo successifs dans l ordre', () => {
      history.addShape('rectangle', { x: 0, y: 0 }, { width: 50, height: 50 })
      history.addShape('ellipse', { x: 100, y: 0 }, { width: 50, height: 50 })

      history.undo()
      history.undo()
      expect(model.shapes).toHaveLength(0)

      history.redo()
      expect(model.shapes).toHaveLength(1)

      history.redo()
      expect(model.shapes).toHaveLength(2)
    })

    it('nouvelle commande apres undo vide la pile redo', () => {
      history.addShape('rectangle', { x: 0, y: 0 }, { width: 50, height: 50 })
      history.addShape('ellipse', { x: 100, y: 0 }, { width: 50, height: 50 })

      history.undo()
      expect(history.canRedo).toBe(true)

      history.addShape('diamond', { x: 200, y: 0 }, { width: 50, height: 50 })
      expect(history.canRedo).toBe(false)
    })
  })

  describe('canUndo / canRedo', () => {
    it('pas de undo avant premiere commande', () => {
      expect(history.canUndo).toBe(false)
      expect(history.canRedo).toBe(false)
    })

    it('peut undo apres commande', () => {
      history.addShape('rectangle', { x: 0, y: 0 }, { width: 50, height: 50 })
      expect(history.canUndo).toBe(true)
      expect(history.canRedo).toBe(false)
    })

    it('peut redo apres undo', () => {
      history.addShape('rectangle', { x: 0, y: 0 }, { width: 50, height: 50 })
      history.undo()
      expect(history.canUndo).toBe(false)
      expect(history.canRedo).toBe(true)
    })
  })

  describe('undo/redo ne fait rien si vide', () => {
    it('undo sur pile vide ne jette pas', () => {
      expect(() => history.undo()).not.toThrow()
    })

    it('redo sur pile vide ne jette pas', () => {
      expect(() => history.redo()).not.toThrow()
    })
  })
})
