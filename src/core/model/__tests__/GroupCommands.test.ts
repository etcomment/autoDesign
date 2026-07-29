import { describe, it, expect, beforeEach } from 'vitest'
import { DiagramModel } from '../DiagramModel'
import { GroupShapesCommand, UngroupShapesCommand } from '../../commands/GroupCommands'

describe('GroupCommands & DiagramModel Grouping', () => {
  let model: DiagramModel

  beforeEach(() => {
    model = new DiagramModel()
  })

  it('groups multiple shapes together in DiagramModel', () => {
    const s1 = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
    const s2 = model.addShape('ellipse', { x: 200, y: 0 }, { width: 100, height: 50 })

    const groupId = model.groupShapes([s1.id, s2.id])
    expect(groupId).toBeDefined()

    const shape1 = model.getShape(s1.id)
    const shape2 = model.getShape(s2.id)

    expect(shape1?.groupId).toBe(groupId)
    expect(shape2?.groupId).toBe(groupId)
    expect(model.getGroupShapeIds(groupId)).toEqual([s1.id, s2.id])
  })

  it('ungroups shapes in DiagramModel', () => {
    const s1 = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
    const s2 = model.addShape('ellipse', { x: 200, y: 0 }, { width: 100, height: 50 })

    const groupId = model.groupShapes([s1.id, s2.id])
    expect(model.getShape(s1.id)?.groupId).toBe(groupId)

    const ungrouped = model.ungroupShapes(groupId)
    expect(ungrouped).toEqual([s1.id, s2.id])
    expect(model.getShape(s1.id)?.groupId).toBeUndefined()
    expect(model.getShape(s2.id)?.groupId).toBeUndefined()
  })

  it('GroupShapesCommand executes and undoes correctly', () => {
    const s1 = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
    const s2 = model.addShape('ellipse', { x: 200, y: 0 }, { width: 100, height: 50 })

    const cmd = new GroupShapesCommand([s1.id, s2.id])
    cmd.execute(model)

    const groupId = cmd.getGroupId()!
    expect(groupId).toBeDefined()
    expect(model.getShape(s1.id)?.groupId).toBe(groupId)
    expect(model.getShape(s2.id)?.groupId).toBe(groupId)

    cmd.undo(model)
    expect(model.getShape(s1.id)?.groupId).toBeUndefined()
    expect(model.getShape(s2.id)?.groupId).toBeUndefined()
  })

  it('UngroupShapesCommand executes and undoes correctly', () => {
    const s1 = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
    const s2 = model.addShape('ellipse', { x: 200, y: 0 }, { width: 100, height: 50 })

    const groupId = model.groupShapes([s1.id, s2.id])
    const cmd = new UngroupShapesCommand(groupId)

    cmd.execute(model)
    expect(model.getShape(s1.id)?.groupId).toBeUndefined()
    expect(model.getShape(s2.id)?.groupId).toBeUndefined()

    cmd.undo(model)
    expect(model.getShape(s1.id)?.groupId).toBe(groupId)
    expect(model.getShape(s2.id)?.groupId).toBe(groupId)
  })

  it('serializes and deserializes group ids', () => {
    const s1 = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
    const s2 = model.addShape('ellipse', { x: 200, y: 0 }, { width: 100, height: 50 })
    const groupId = model.groupShapes([s1.id, s2.id])

    const json = model.serialize()
    const deserialized = DiagramModel.deserialize(json)

    expect(deserialized.getShape(s1.id)?.groupId).toBe(groupId)
    expect(deserialized.getShape(s2.id)?.groupId).toBe(groupId)
  })
})
