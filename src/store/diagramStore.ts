import { create } from 'zustand'
import { DiagramModel } from '../core/model/DiagramModel'
import { History } from '../core/commands/History'
import type { Dimensions, Position, Shape, ShapeStyle, ShapeText, ShapeType } from '../core/model/Shape'

interface ViewBox {
  readonly x: number
  readonly y: number
  readonly scale: number
}

interface DiagramStore {
  readonly shapes: readonly Shape[]
  readonly selectedShapeIds: ReadonlySet<string>
  readonly viewBox: ViewBox

  readonly canUndo: boolean
  readonly canRedo: boolean

  undo: () => void
  redo: () => void

  addShape: (type: ShapeType, position: Position, dimensions: Dimensions) => void
  removeShape: (id: string) => void
  moveShape: (id: string, position: Position) => void
  resizeShape: (id: string, dimensions: Dimensions) => void
  updateShapeStyle: (id: string, style: Partial<ShapeStyle>) => void
  updateShapeText: (id: string, text: Partial<ShapeText>) => void
  moveAndResizeShape: (id: string, position: Position, dimensions: Dimensions) => void

  selectShape: (id: string) => void
  deselectShape: (id: string) => void
  toggleSelection: (id: string) => void
  selectAll: () => void
  clearSelection: () => void

  setViewBox: (viewBox: ViewBox) => void
  getModel: () => DiagramModel
}

export const useDiagramStore = create<DiagramStore>((set, get) => {
  const model = new DiagramModel()
  const history = new History(model)

  function syncState(): Partial<DiagramStore> {
    return {
      shapes: model.shapes,
      canUndo: history.canUndo,
      canRedo: history.canRedo,
    }
  }

  return {
    shapes: [],
    selectedShapeIds: new Set(),
    viewBox: { x: 0, y: 0, scale: 1 },
    canUndo: false,
    canRedo: false,

    undo: () => {
      history.undo()
      set({ ...syncState(), selectedShapeIds: new Set() })
    },

    redo: () => {
      history.redo()
      set({ ...syncState(), selectedShapeIds: new Set() })
    },

    addShape: (type, position, dimensions) => {
      const shape = history.addShape(type, position, dimensions)
      set({
        ...syncState(),
        selectedShapeIds: new Set([shape.id]),
      })
    },

    removeShape: (id) => {
      history.removeShape(id)
      set(syncState())
    },

    moveShape: (id, position) => {
      history.moveShape(id, position)
      set(syncState())
    },

    resizeShape: (id, dimensions) => {
      history.resizeShape(id, dimensions)
      set(syncState())
    },

    updateShapeStyle: (id, style) => {
      history.updateShapeStyle(id, style)
      set(syncState())
    },

    updateShapeText: (id, text) => {
      history.updateShapeText(id, text)
      set(syncState())
    },

    moveAndResizeShape: (id, position, dimensions) => {
      history.moveAndResizeShape(id, position, dimensions)
      set(syncState())
    },

    selectShape: (id) => {
      const { selectedShapeIds } = get()
      if (selectedShapeIds.has(id)) return
      const next = new Set(selectedShapeIds)
      next.add(id)
      set({ selectedShapeIds: next })
    },

    deselectShape: (id) => {
      const { selectedShapeIds } = get()
      if (!selectedShapeIds.has(id)) return
      const next = new Set(selectedShapeIds)
      next.delete(id)
      set({ selectedShapeIds: next })
    },

    toggleSelection: (id) => {
      const { selectedShapeIds } = get()
      const next = new Set(selectedShapeIds)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      set({ selectedShapeIds: next })
    },

    selectAll: () => {
      const ids = model.shapes.map(s => s.id)
      set({ selectedShapeIds: new Set(ids) })
    },

    clearSelection: () => {
      set({ selectedShapeIds: new Set() })
    },

    setViewBox: (viewBox) => {
      set({ viewBox })
    },

    getModel: () => model,
  }
})
