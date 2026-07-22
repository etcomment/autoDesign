import type { Dimensions, Position, ShapeStyle, ShapeText } from '../model/Shape'
import type { ShapeType} from '../model/Shape'
import type { DiagramModel } from '../model/DiagramModel'
import type { Command } from './Command'

export class History {
  private readonly model: DiagramModel
  private readonly undoStack: Command[] = []
  private readonly redoStack: Command[] = []

  constructor(model: DiagramModel) {
    this.model = model
  }

  get canUndo(): boolean {
    return this.undoStack.length > 0
  }

  get canRedo(): boolean {
    return this.redoStack.length > 0
  }

  undo(): void {
    const command = this.undoStack.pop()
    if (!command) return
    command.undo(this.model)
    this.redoStack.push(command)
  }

  redo(): void {
    const command = this.redoStack.pop()
    if (!command) return
    command.execute(this.model)
    this.undoStack.push(command)
  }

  private push(command: Command): void {
    this.undoStack.push(command)
    this.redoStack.length = 0
  }

  addShape(type: ShapeType, position: Position, dimensions: Dimensions) {
    const shape = this.model.addShape(type, position, dimensions)
    const snapshot = shape
    this.push({
      label: `Ajouter ${type}`,
      execute: (model) => {
        model.restoreShape(snapshot)
      },
      undo: (model) => {
        model.removeShape(snapshot.id)
      },
    })
    return shape
  }

  removeShape(id: string): void {
    const shape = this.model.getShape(id)
    if (!shape) return
    const snapshot = shape
    this.model.removeShape(id)
    this.push({
      label: 'Supprimer forme',
      execute: (model) => {
        model.removeShape(id)
      },
      undo: (model) => {
        model.restoreShape(snapshot)
      },
    })
  }

  moveShape(id: string, position: Position): void {
    const shape = this.model.getShape(id)
    if (!shape) return
    const previousPosition = { ...shape.position }
    this.model.moveShape(id, position)
    this.push({
      label: 'Deplacer forme',
      execute: (model) => {
        model.moveShape(id, position)
      },
      undo: (model) => {
        model.moveShape(id, previousPosition)
      },
    })
  }

  resizeShape(id: string, dimensions: Dimensions): void {
    const shape = this.model.getShape(id)
    if (!shape) return
    const previousDimensions = { ...shape.dimensions }
    this.model.resizeShape(id, dimensions)
    this.push({
      label: 'Redimensionner forme',
      execute: (model) => {
        model.resizeShape(id, dimensions)
      },
      undo: (model) => {
        model.resizeShape(id, previousDimensions)
      },
    })
  }

  updateShapeStyle(id: string, style: Partial<ShapeStyle>): void {
    const shape = this.model.getShape(id)
    if (!shape) return
    const previousStyle = { ...shape.style }
    this.model.updateShapeStyle(id, style)
    this.push({
      label: 'Modifier style',
      execute: (model) => {
        model.updateShapeStyle(id, style)
      },
      undo: (model) => {
        model.updateShapeStyle(id, previousStyle)
      },
    })
  }

  updateShapeText(id: string, text: Partial<ShapeText>): void {
    const shape = this.model.getShape(id)
    if (!shape) return
    const previousText = { ...shape.text }
    this.model.updateShapeText(id, text)
    this.push({
      label: 'Modifier texte',
      execute: (model) => {
        model.updateShapeText(id, text)
      },
      undo: (model) => {
        model.updateShapeText(id, previousText)
      },
    })
  }

  moveAndResizeShape(id: string, position: Position, dimensions: Dimensions): void {
    const shape = this.model.getShape(id)
    if (!shape) return
    const previousPosition = { ...shape.position }
    const previousDimensions = { ...shape.dimensions }
    this.model.moveAndResizeShape(id, position, dimensions)
    this.push({
      label: 'Redimensionner forme',
      execute: (model) => {
        model.moveAndResizeShape(id, position, dimensions)
      },
      undo: (model) => {
        model.moveAndResizeShape(id, previousPosition, previousDimensions)
      },
    })
  }
}
