import { create } from 'zustand'
import { DiagramModel } from '../core/model/DiagramModel'
import { History } from '../core/commands/History'
import { parseMermaid } from '../mermaid/parseMermaid'
import type { ConnectionType, Dimensions, Position, Shape, ShapeStyle, ShapeText, ShapeType } from '../core/model/Shape'

interface ViewBox {
  readonly x: number
  readonly y: number
  readonly scale: number
}

interface DiagramStore {
  readonly shapes: readonly Shape[]
  readonly connections: readonly ConnectionType[]
  readonly selectedShapeIds: ReadonlySet<string>
  readonly viewBox: ViewBox
  readonly isConnectMode: boolean

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
  batchUpdateShapeStyle: (ids: string[], style: Partial<ShapeStyle>) => void

  addConnection: (sourceId: string, targetId: string) => void
  removeConnection: (connectionId: string) => void

  selectShape: (id: string) => void
  deselectShape: (id: string) => void
  toggleSelection: (id: string) => void
  selectAll: () => void
  clearSelection: () => void

  setViewBox: (viewBox: ViewBox) => void
  toggleConnectMode: () => void
  mergeModel: (model: DiagramModel) => void
  mergeMermaid: (dsl: string) => void
  getModel: () => DiagramModel
}

export const useDiagramStore = create<DiagramStore>((set, get) => {
  const model = new DiagramModel()
  const history = new History(model)

  function syncState(): Partial<DiagramStore> {
    return {
      shapes: model.shapes,
      connections: model.connections,
      canUndo: history.canUndo,
      canRedo: history.canRedo,
    }
  }

  return {
    shapes: [],
    connections: [],
    selectedShapeIds: new Set(),
    viewBox: { x: 0, y: 0, scale: 1 },
    isConnectMode: false,
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

    batchUpdateShapeStyle: (ids, style) => {
      for (const id of ids) {
        history.updateShapeStyle(id, style)
      }
      set(syncState())
    },

    addConnection: (sourceId, targetId) => {
      history.addConnection(sourceId, targetId)
      set(syncState())
    },

    removeConnection: (connectionId) => {
      history.removeConnection(connectionId)
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

    toggleConnectMode: () => {
      set(s => ({ isConnectMode: !s.isConnectMode, selectedShapeIds: new Set() }))
    },

    mergeModel: (importedModel) => {
      model.mergeModel(importedModel)
      set({ ...syncState(), selectedShapeIds: new Set() })
    },

    mergeMermaid: (dsl) => {
      const imported = parseMermaid(dsl)
      const existingShapes = model.shapes

      // Build text → ID mapping from existing shapes
      const existingByText = new Map<string, string>()
      for (const shape of existingShapes) {
        if (shape.text.content) {
          existingByText.set(shape.text.content, shape.id)
        }
      }

      // map imported shape IDs → existing/new shape IDs
      const idMap = new Map<string, string>()

      for (const importedShape of imported.shapes) {
        const existingId = existingByText.get(importedShape.text.content)
        if (existingId) {
          idMap.set(importedShape.id, existingId)
          // Update style from imported if content matches
          model.updateShapeStyle(existingId, importedShape.style)
        } else {
          const newShape = model.mergeMermaidShape(importedShape)
          idMap.set(importedShape.id, newShape.id)
        }
      }

      // Map connections
      for (const conn of imported.connections) {
        const sourceId = idMap.get(conn.sourceId)
        const targetId = idMap.get(conn.targetId)
        if (sourceId && targetId) {
          // Check if connection already exists
          const exists = model.connections.some(
            c => c.sourceId === sourceId && c.targetId === targetId,
          )
          if (!exists) {
            model.addConnection(sourceId, targetId)
          }
        }
      }

      set({ ...syncState(), selectedShapeIds: new Set() })
    },

    getModel: () => model,
  }
})
