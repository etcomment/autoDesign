import type { Dimensions, Position, Shape, ShapeStyle, ShapeText, ShapeType } from './Shape'
import { createDefaultStyle, createDefaultText } from './Shape'

let nextId = 1

function generateId(): string {
  return `shape-${nextId++}`
}

export class DiagramModel {
  private readonly shapeMap: Map<string, Shape>

  constructor(shapes: Shape[] = []) {
    this.shapeMap = new Map()
    for (const shape of shapes) {
      this.shapeMap.set(shape.id, shape)
    }
  }

  get shapes(): readonly Shape[] {
    return Array.from(this.shapeMap.values())
  }

  getShape(id: string): Shape | undefined {
    return this.shapeMap.get(id)
  }

  addShape(type: ShapeType, position: Position, dimensions: Dimensions): Shape {
    const shape: Shape = {
      id: generateId(),
      type,
      position: { ...position },
      dimensions: { ...dimensions },
      style: createDefaultStyle(),
      text: createDefaultText(),
    }
    this.shapeMap.set(shape.id, shape)
    return shape
  }

  removeShape(id: string): void {
    this.shapeMap.delete(id)
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
      dimensions: { width: dimensions.width, height: dimensions.height },
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
      dimensions: { width: dimensions.width, height: dimensions.height },
    })
  }

  serialize(): string {
    const data = this.shapes.map(({ id, type, position, dimensions, style, text }) => ({
      id,
      type,
      position,
      dimensions,
      style,
      text,
    }))
    return JSON.stringify(data)
  }

  static deserialize(json: string): DiagramModel {
    const data = JSON.parse(json) as Shape[]
    nextId = Math.max(0, ...data.map(s => {
      const match = /shape-(\d+)/.exec(s.id)
      return match ? Number(match[1]) : 0
    })) + 1
    return new DiagramModel(data)
  }

  clone(): DiagramModel {
    return DiagramModel.deserialize(this.serialize())
  }
}
