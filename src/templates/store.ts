import { create } from 'zustand'
import type { TemplateData, TemplateType } from './types'
import { getTemplateByType } from './registry'

interface TemplateStore {
  readonly activeTemplate: TemplateType | null
  readonly templateData: TemplateData | null
  readonly selectedTemplateElementIds: ReadonlySet<string>
  readonly templateElementColors: Record<string, string>
  readonly templateStrokeColors: Record<string, string>
  readonly templateElementPositions: Record<string, { x: number; y: number; width: number; height: number }>

  selectTemplate: (type: TemplateType) => void
  clearTemplate: () => void
  updateTemplateData: (data: TemplateData) => void
  toggleTemplateElement: (id: string) => void
  updateTemplateColor: (id: string, color: string) => void
  updateTemplateStrokeColor: (id: string, color: string) => void
  moveTemplateElement: (id: string, pos: { x: number; y: number }) => void
  resizeTemplateElement: (id: string, size: { width: number; height: number }) => void
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  activeTemplate: null,
  templateData: null,
  selectedTemplateElementIds: new Set(),
  templateElementColors: {},
  templateStrokeColors: {},
  templateElementPositions: {},

  selectTemplate: (type) => {
    const def = getTemplateByType(type)
    set({
      activeTemplate: type,
      templateData: def?.defaultData ?? null,
      selectedTemplateElementIds: new Set(),
      templateElementColors: {},
      templateStrokeColors: {},
      templateElementPositions: {},
    })
  },

  clearTemplate: () => {
    set({
      activeTemplate: null,
      templateData: null,
      selectedTemplateElementIds: new Set(),
      templateElementColors: {},
      templateStrokeColors: {},
      templateElementPositions: {},
    })
  },

  updateTemplateData: (data) => {
    set({ templateData: data })
  },

  toggleTemplateElement: (id) => {
    const { selectedTemplateElementIds } = get()
    const next = new Set(selectedTemplateElementIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    set({ selectedTemplateElementIds: next })
  },

  updateTemplateColor: (id, color) => {
    const { templateElementColors } = get()
    set({ templateElementColors: { ...templateElementColors, [id]: color } })
  },

  updateTemplateStrokeColor: (id, color) => {
    const { templateStrokeColors } = get()
    set({ templateStrokeColors: { ...templateStrokeColors, [id]: color } })
  },

  moveTemplateElement: (id, pos) => {
    const { templateElementPositions } = get()
    set({
      templateElementPositions: {
        ...templateElementPositions,
        [id]: { ...templateElementPositions[id], x: pos.x, y: pos.y, width: templateElementPositions[id]?.width ?? 0, height: templateElementPositions[id]?.height ?? 0 },
      },
    })
  },

  resizeTemplateElement: (id, size) => {
    const { templateElementPositions } = get()
    set({
      templateElementPositions: {
        ...templateElementPositions,
        [id]: { ...templateElementPositions[id], x: templateElementPositions[id]?.x ?? 0, y: templateElementPositions[id]?.y ?? 0, width: size.width, height: size.height },
      },
    })
  },
}))
