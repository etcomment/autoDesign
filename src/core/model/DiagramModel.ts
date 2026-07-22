import type { ConnectionType, Dimensions, Position, Shape, ShapeStyle, ShapeText, ShapeType } from './Shape'
import { createDefaultStyle, createDefaultText } from './Shape'

let nextId = 1
let nextConnectionId = 1

const MIN_DIMENSION = 10

function clampDimension(value: number): number {
  return Math.max(value, MIN_DIMENSION)
}

function generateId(): string {
  return `shape-${nextId++}`
}

function generateConnectionId(): string {
  return `conn-${nextConnectionId++}`
}

export class DiagramModel {
  private readonly shapeMap: Map<string, Shape>
  private readonly connectionMap: Map<string, ConnectionType>

  constructor(shapes: Shape[] = [], connections: ConnectionType[] = []) {
    this.shapeMap = new Map()
    for (const shape of shapes) {
      this.shapeMap.set(shape.id, shape)
    }
    this.connectionMap = new Map()
    for (const conn of connections) {
      this.connectionMap.set(conn.id, conn)
    }
  }

  get shapes(): readonly Shape[] {
    return Array.from(this.shapeMap.values())
  }

  get connections(): readonly ConnectionType[] {
    return Array.from(this.connectionMap.values())
  }

  getShape(id: string): Shape | undefined {
    return this.shapeMap.get(id)
  }

  addShape(type: ShapeType, position: Position, dimensions: Dimensions): Shape {
    const shape: Shape = {
      id: generateId(),
      type,
      position: { ...position },
      dimensions: { width: clampDimension(dimensions.width), height: clampDimension(dimensions.height) },
      style: createDefaultStyle(),
      text: createDefaultText(),
    }
    this.shapeMap.set(shape.id, shape)
    return shape
  }

  removeShape(id: string): void {
    this.shapeMap.delete(id)
    for (const [connId, conn] of this.connectionMap) {
      if (conn.sourceId === id || conn.targetId === id) {
        this.connectionMap.delete(connId)
      }
    }
  }

  addConnection(sourceId: string, targetId: string): ConnectionType {
    if (!this.shapeMap.has(sourceId)) {
      throw new Error(`Source shape not found: ${sourceId}`)
    }
    if (!this.shapeMap.has(targetId)) {
      throw new Error(`Target shape not found: ${targetId}`)
    }
    const connection: ConnectionType = {
      id: generateConnectionId(),
      sourceId,
      targetId,
    }
    this.connectionMap.set(connection.id, connection)
    return connection
  }

  removeConnection(id: string): void {
    this.connectionMap.delete(id)
  }

  restoreConnection(connection: ConnectionType): void {
    this.connectionMap.set(connection.id, { ...connection })
  }

  mergeModel(other: DiagramModel): Map<string, string> {
    const idMap = new Map<string, string>()

    for (const shape of other.shapes) {
      const newShape = this.mergeMermaidShape(shape)
      idMap.set(shape.id, newShape.id)
    }

    for (const conn of other.connections) {
      const sourceId = idMap.get(conn.sourceId)
      const targetId = idMap.get(conn.targetId)
      if (sourceId && targetId) {
        this.addConnection(sourceId, targetId)
      }
    }

    return idMap
  }

  mergeMermaidShape(shape: Shape): Shape {
    const newShape = this.addShape(shape.type, shape.position, shape.dimensions)
    this.updateShapeStyle(newShape.id, shape.style)
    this.updateShapeText(newShape.id, shape.text)
    return newShape
  }

  restoreShape(shape: Shape): void {
    this.shapeMap.set(shape.id, {
      ...shape,
      position: { x: shape.position.x, y: shape.position.y },
      dimensions: { width: shape.dimensions.width, height: shape.dimensions.height },
      style: { ...shape.style },
      text: { ...shape.text },
    })
  }

  moveShape(id: string, position: Position): void {
    const shape = this.shapeMap.get(id)
    if (!shape) return
    this.shapeMap.set(id, {
      ...shape,
      position: { x: position.x, y: position.y },
    })
  }

  resizeShape(id: string, dimensions: Dimensions): void {
    const shape = this.shapeMap.get(id)
    if (!shape) return
    this.shapeMap.set(id, {
      ...shape,
      dimensions: { width: clampDimension(dimensions.width), height: clampDimension(dimensions.height) },
    })
  }

  updateShapeStyle(id: string, partialStyle: Partial<ShapeStyle>): void {
    const shape = this.shapeMap.get(id)
    if (!shape) return
    this.shapeMap.set(id, {
      ...shape,
      style: { ...shape.style, ...partialStyle },
    })
  }

  updateShapeText(id: string, partialText: Partial<ShapeText>): void {
    const shape = this.shapeMap.get(id)
    if (!shape) return
    this.shapeMap.set(id, {
      ...shape,
      text: { ...shape.text, ...partialText },
    })
  }

  moveAndResizeShape(id: string, position: Position, dimensions: Dimensions): void {
    const shape = this.shapeMap.get(id)
    if (!shape) return
    this.shapeMap.set(id, {
      ...shape,
      position: { x: position.x, y: position.y },
      dimensions: { width: clampDimension(dimensions.width), height: clampDimension(dimensions.height) },
    })
  }

  serialize(): string {
    const data = {
      shapes: this.shapes.map(({ id, type, position, dimensions, style, text }) => ({
        id,
        type,
        position,
        dimensions,
        style,
        text,
      })),
      connections: this.connections,
    }
    return JSON.stringify(data)
  }

  static deserialize(json: string): DiagramModel {
    const data = JSON.parse(json) as { shapes: Shape[]; connections: ConnectionType[] }
    const shapes = data.shapes ?? []
    const connections = data.connections ?? []

    nextId = Math.max(0, ...shapes.map(s => {
      const match = /shape-(\d+)/.exec(s.id)
      return match ? Number(match[1]) : 0
    })) + 1

    nextConnectionId = Math.max(0, ...connections.map(c => {
      const match = /conn-(\d+)/.exec(c.id)
      return match ? Number(match[1]) : 0
    })) + 1

    return new DiagramModel(shapes, connections)
  }

  clone(): DiagramModel {
    return DiagramModel.deserialize(this.serialize())
  }
}
