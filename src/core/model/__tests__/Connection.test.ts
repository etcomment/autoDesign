import { describe, it, expect, beforeEach } from 'vitest'
import { DiagramModel } from '../DiagramModel'

describe('DiagramModel — connections', () => {
  let model: DiagramModel

  beforeEach(() => {
    model = new DiagramModel()
  })

  describe('addConnection', () => {
    it('cree une connexion entre deux formes existantes', () => {
      const a = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      const b = model.addShape('ellipse', { x: 200, y: 0 }, { width: 100, height: 50 })

      const conn = model.addConnection(a.id, b.id)

      expect(model.connections).toHaveLength(1)
      expect(conn.sourceId).toBe(a.id)
      expect(conn.targetId).toBe(b.id)
      expect(conn.id).toBeTruthy()
    })

    it('genere un id unique', () => {
      const a = model.addShape('rectangle', { x: 0, y: 0 }, { width: 80, height: 40 })
      const b = model.addShape('ellipse', { x: 100, y: 0 }, { width: 80, height: 40 })
      const c1 = model.addConnection(a.id, b.id)
      const c2 = model.addConnection(b.id, a.id)
      expect(c1.id).not.toBe(c2.id)
    })

    it('jette si la forme source n existe pas', () => {
      model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      expect(() => model.addConnection('nonexistent', 'n')).toThrow()
    })

    it('jette si la forme cible n existe pas', () => {
      model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      expect(() => model.addConnection(model.shapes[0]!.id, 'nonexistent')).toThrow()
    })
  })

  describe('removeConnection', () => {
    it('retire une connexion par son id', () => {
      const a = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      const b = model.addShape('ellipse', { x: 200, y: 0 }, { width: 100, height: 50 })
      const conn = model.addConnection(a.id, b.id)
      expect(model.connections).toHaveLength(1)

      model.removeConnection(conn.id)
      expect(model.connections).toHaveLength(0)
    })
  })

  describe('serialization avec connexions', () => {
    it('preserve les connexions a la serialisation/deserialisation', () => {
      const a = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      const b = model.addShape('ellipse', { x: 200, y: 0 }, { width: 100, height: 50 })
      model.addConnection(a.id, b.id)

      const json = model.serialize()
      const restored = DiagramModel.deserialize(json)

      expect(restored.connections).toHaveLength(1)
      expect(restored.connections[0]?.sourceId).toBe(a.id)
      expect(restored.connections[0]?.targetId).toBe(b.id)
    })
  })

  describe('removeShape nettoye les connexions', () => {
    it('supprime les connexions liees a la forme', () => {
      const a = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
      const b = model.addShape('ellipse', { x: 200, y: 0 }, { width: 100, height: 50 })
      model.addConnection(a.id, b.id)

      model.removeShape(a.id)
      expect(model.connections).toHaveLength(0)
    })
  })
})
