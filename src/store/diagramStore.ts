import { create } from 'zustand'
import { DiagramModel } from '../core/model/DiagramModel'
import type { ConnectionOptions } from '../core/model/DiagramModel'
import { History } from '../core/commands/History'
import { parseMermaid } from '../mermaid/parseMermaid'
import type { SubgraphGroup } from '../mermaid/parseMermaid'
import type { SequenceData } from '../mermaid/parseSequenceDiagram'
import { createDefaultSubgraphStyle } from '../core/model/SubgraphStyle'
import type { SubgraphStyle } from '../core/model/SubgraphStyle'
import type { ConnectionType, Dimensions, Position, Shape, ShapeStyle, ShapeText, ShapeType } from '../core/model/Shape'

interface ViewBox {
  readonly x: number
  readonly y: number
  readonly scale: number
}

interface DiagramStore {
  readonly shapes: readonly Shape[]
  readonly connections: readonly ConnectionType[]
  readonly subgraphGroups: readonly SubgraphGroup[]
  readonly subgraphStyle: SubgraphStyle
  readonly sequenceData: SequenceData | null
  readonly diagramType: string
  readonly diagramData: Record<string, unknown> | null
  readonly diagramColors: Record<string, string>
  readonly diagramStrokeColors: Record<string, string>
  readonly diagramElementPositions: Record<string, { x: number; y: number; width: number; height: number }>
  readonly selectedShapeIds: ReadonlySet<string>
  readonly selectedDiagramElementIds: ReadonlySet<string>
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

  addConnection: (sourceId: string, targetId: string, options?: ConnectionOptions) => void
  removeConnection: (connectionId: string) => void

  selectShape: (id: string) => void
  deselectShape: (id: string) => void
  toggleSelection: (id: string) => void
  selectAll: () => void
  clearSelection: () => void

  selectDiagramElement: (id: string) => void
  deselectDiagramElement: (id: string) => void
  toggleDiagramElement: (id: string) => void
  clearDiagramElementSelection: () => void

  moveDiagramElement: (id: string, position: Position) => void
  resizeDiagramElement: (id: string, size: Dimensions) => void

  updateDiagramColor: (elementId: string, color: string) => void
  updateDiagramStrokeColor: (elementId: string, color: string) => void
  setDiagramColors: (colors: Record<string, string>) => void

  setViewBox: (viewBox: ViewBox) => void
  toggleConnectMode: () => void
  mergeModel: (model: DiagramModel) => void
  mergeMermaid: (dsl: string) => void
  getModel: () => DiagramModel
  updateSubgraphStyle: (style: Partial<SubgraphStyle>) => void
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
    subgraphGroups: [],
    subgraphStyle: createDefaultSubgraphStyle(),
    sequenceData: null,
    diagramType: 'flowchart',
    diagramData: null,
    diagramColors: {},
    diagramStrokeColors: {},
    diagramElementPositions: {},
    selectedShapeIds: new Set(),
    selectedDiagramElementIds: new Set(),
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

    addConnection: (sourceId, targetId, options) => {
      history.addConnection(sourceId, targetId, options)
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

    selectDiagramElement: (id) => {
      const { selectedDiagramElementIds } = get()
      if (selectedDiagramElementIds.has(id)) return
      const next = new Set(selectedDiagramElementIds)
      next.add(id)
      set({ selectedDiagramElementIds: next, selectedShapeIds: new Set() })
    },

    deselectDiagramElement: (id) => {
      const { selectedDiagramElementIds } = get()
      if (!selectedDiagramElementIds.has(id)) return
      const next = new Set(selectedDiagramElementIds)
      next.delete(id)
      set({ selectedDiagramElementIds: next })
    },

    toggleDiagramElement: (id) => {
      const { selectedDiagramElementIds } = get()
      const next = new Set(selectedDiagramElementIds)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      set({ selectedDiagramElementIds: next, selectedShapeIds: new Set() })
    },

    clearDiagramElementSelection: () => {
      set({ selectedDiagramElementIds: new Set() })
    },

    moveDiagramElement: (id, position) => {
      const { diagramElementPositions } = get()
      const current = diagramElementPositions[id]
      set({
        diagramElementPositions: {
          ...diagramElementPositions,
          [id]: {
            width: current?.width ?? 0,
            height: current?.height ?? 0,
            ...position,
          },
        },
      })
    },

    resizeDiagramElement: (id, size) => {
      const { diagramElementPositions } = get()
      const current = diagramElementPositions[id]
      set({
        diagramElementPositions: {
          ...diagramElementPositions,
          [id]: {
            x: current?.x ?? 0,
            y: current?.y ?? 0,
            ...size,
          },
        },
      })
    },

    updateDiagramColor: (elementId, color) => {
      const { diagramColors } = get()
      set({ diagramColors: { ...diagramColors, [elementId]: color } })
    },

    updateDiagramStrokeColor: (elementId, color) => {
      const { diagramStrokeColors } = get()
      set({ diagramStrokeColors: { ...diagramStrokeColors, [elementId]: color } })
    },

    setDiagramColors: (colors) => {
      set({ diagramColors: { ...colors } })
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
      const { model: imported, subgraphGroups, sequenceData, diagramType, diagramData, diagramColors } = parseMermaid(dsl)

      model.clear()

      const idMap = new Map<string, string>()

      for (const importedShape of imported.shapes) {
        const newShape = model.mergeMermaidShape(importedShape)
        idMap.set(importedShape.id, newShape.id)
      }

      for (const conn of imported.connections) {
        const sourceId = idMap.get(conn.sourceId)
        const targetId = idMap.get(conn.targetId)
        if (sourceId && targetId) {
          model.addConnection(sourceId, targetId, {
            label: conn.label,
            arrowStyle: conn.arrowStyle,
            arrowHead: conn.arrowHead,
            arrowDirection: conn.arrowDirection,
            lineColor: conn.lineColor,
          })
        }
      }

      const resolvedGroups: SubgraphGroup[] = []
      for (const group of subgraphGroups) {
        const shapeIds = group.shapeIds
          .map(mermaidId => idMap.get(mermaidId))
          .filter((id): id is string => id !== undefined)
        if (shapeIds.length > 0) {
          resolvedGroups.push({ title: group.title, shapeIds })
        }
      }

      set({ ...syncState(), selectedShapeIds: new Set(), selectedDiagramElementIds: new Set(), subgraphGroups: resolvedGroups, sequenceData: sequenceData ?? null, diagramType, diagramData: diagramData ?? null, diagramColors: diagramColors ?? {} })
    },

    getModel: () => model,

    updateSubgraphStyle: (style) => {
      set(s => ({ subgraphStyle: { ...s.subgraphStyle, ...style } }))
    },
  }
})
