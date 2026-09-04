import { create } from 'zustand'
import type { TemplateData, TemplateType } from './types'
import { getTemplateByType } from './registry'
import { generateDslText } from './dsl/parseTemplate'
import type { ImportedSlideSvg } from './import/svgImport'
import type { ImportedTemplateData } from './types'

export interface ImportedTemplateRecord {
  readonly name: string
  readonly label: string
  readonly category: string
  readonly description: string
  readonly slide: ImportedSlideSvg
  readonly data: ImportedTemplateData
}

interface TemplateStore {
  readonly activeTemplate: TemplateType | null
  readonly templateData: TemplateData | null
  readonly importedTemplates: Record<string, ImportedTemplateRecord>
  readonly isTemplateHidden: boolean
  readonly selectedTemplateElementIds: ReadonlySet<string>
  readonly templateElementColors: Record<string, string>
  readonly templateStrokeColors: Record<string, string>
  readonly templateStrokeWidths: Record<string, number>
  readonly templateElementPositions: Record<string, { x: number; y: number; width: number; height: number }>
  readonly hiddenTemplateElementIds: ReadonlySet<string>
  readonly templateElementRotations: Record<string, number>
  readonly templateGroups: Record<string, string[]>
  readonly templateElementGroupIds: Record<string, string>
  readonly dslText: string

  selectTemplate: (type: TemplateType) => void
  selectTemplateWithData: (type: TemplateType, data: TemplateData) => void
  addImportedTemplate: (record: ImportedTemplateRecord) => void
  removeImportedTemplate: (name: string) => void
  clearTemplate: () => void
  toggleTemplateHidden: () => void
  toggleTemplateElementHidden: (id: string) => void
  updateTemplateData: (data: TemplateData) => void
  selectTemplateElement: (id: string) => void
  toggleTemplateElement: (id: string) => void
  clearTemplateElementSelection: () => void
  updateTemplateColor: (id: string, color: string) => void
  updateTemplateStrokeColor: (id: string, color: string) => void
  updateTemplateStrokeWidth: (id: string, width: number) => void
  moveTemplateElement: (id: string, pos: { x: number; y: number }) => void
  resizeTemplateElement: (id: string, size: { width: number; height: number }) => void
  rotateTemplateElement: (id: string, angle: number) => void
  initTemplateElement: (id: string, rect: { x: number; y: number; width: number; height: number }) => void
  groupTemplateElements: (ids?: string[]) => void
  ungroupTemplateElements: (groupId?: string) => void
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  activeTemplate: null,
  templateData: null,
  importedTemplates: {},
  isTemplateHidden: false,
  hiddenTemplateElementIds: new Set(),
  selectedTemplateElementIds: new Set(),
  templateElementColors: {},
  templateStrokeColors: {},
  templateStrokeWidths: {},
  templateElementPositions: {},
  templateElementRotations: {},
  templateGroups: {},
  templateElementGroupIds: {},
  dslText: '',

  selectTemplate: (type) => {
    const imported = get().importedTemplates[type]
    if (imported) {
      set({
        activeTemplate: type,
        templateData: imported.data,
        isTemplateHidden: false,
        hiddenTemplateElementIds: new Set(),
        dslText: generateDslText(type, imported.data),
        selectedTemplateElementIds: new Set(),
        templateElementColors: {},
        templateStrokeColors: {},
        templateStrokeWidths: {},
        templateElementPositions: {},
        templateElementRotations: {},
        templateGroups: {},
        templateElementGroupIds: {},
      })
      return
    }
    const def = getTemplateByType(type)
    const data = def?.defaultData ?? null
    set({
      activeTemplate: type,
      templateData: data,
      isTemplateHidden: false,
      hiddenTemplateElementIds: new Set(),
      dslText: data ? generateDslText(type, data) : '',
      selectedTemplateElementIds: new Set(),
      templateElementColors: {},
      templateStrokeColors: {},
      templateStrokeWidths: {},
      templateElementPositions: {},
      templateElementRotations: {},
      templateGroups: {},
      templateElementGroupIds: {},
    })
  },

  selectTemplateWithData: (type, data) => {
    set({
      activeTemplate: type,
      templateData: data,
      isTemplateHidden: false,
      hiddenTemplateElementIds: new Set(),
      dslText: generateDslText(type, data),
      selectedTemplateElementIds: new Set(),
      templateElementColors: {},
      templateStrokeColors: {},
      templateStrokeWidths: {},
      templateElementPositions: {},
      templateElementRotations: {},
      templateGroups: {},
      templateElementGroupIds: {},
    })
  },

  addImportedTemplate: (record) => {
    set(s => ({ importedTemplates: { ...s.importedTemplates, [record.name]: record } }))
  },

  removeImportedTemplate: (name) => {
    set(s => {
      const next = { ...s.importedTemplates }
      delete next[name]
      return { importedTemplates: next }
    })
  },

  clearTemplate: () => {
    set({
      activeTemplate: null,
      templateData: null,
      isTemplateHidden: false,
      hiddenTemplateElementIds: new Set(),
      selectedTemplateElementIds: new Set(),
      templateElementColors: {},
      templateStrokeColors: {},
      templateStrokeWidths: {},
      templateElementPositions: {},
      templateElementRotations: {},
      templateGroups: {},
      templateElementGroupIds: {},
    })
  },

  toggleTemplateHidden: () => {
    set(s => ({ isTemplateHidden: !s.isTemplateHidden }))
  },

  toggleTemplateElementHidden: (id) => {
    set(s => {
      const next = new Set(s.hiddenTemplateElementIds)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return { hiddenTemplateElementIds: next }
    })
  },

  updateTemplateData: (data) => {
    const currentData = get().templateData as Record<string, unknown> | null
    const nextData = data as unknown as Record<string, unknown> | null
    const getCount = (d: Record<string, unknown> | null) => {
      if (!d) return 0
      let total = 0
      for (const val of Object.values(d)) {
        if (Array.isArray(val)) total += val.length
      }
      return total
    }
    const typeChanged = currentData?.type !== nextData?.type
    const countChanged = getCount(currentData) !== getCount(nextData)
    if (typeChanged || countChanged) {
      set({
        templateData: data,
        templateElementPositions: {},
        selectedTemplateElementIds: new Set(),
      })
    } else {
      set({ templateData: data })
    }
  },

  selectTemplateElement: (id) => {
    const { templateElementGroupIds, templateGroups } = get()
    const groupId = templateElementGroupIds[id]
    if (groupId) {
      set({ selectedTemplateElementIds: new Set(templateGroups[groupId] ?? []) })
    } else {
      set({ selectedTemplateElementIds: new Set([id]) })
    }
  },

  toggleTemplateElement: (id) => {
    const { selectedTemplateElementIds, templateElementGroupIds, templateGroups } = get()
    const next = new Set(selectedTemplateElementIds)
    const groupId = templateElementGroupIds[id]
    const elementsToToggle = groupId && templateGroups[groupId] ? templateGroups[groupId] : [id]

    // If all are selected, deselect all. Otherwise, select all.
    const allSelected = elementsToToggle.every(elId => next.has(elId))
    if (allSelected) {
      for (const elId of elementsToToggle) next.delete(elId)
    } else {
      for (const elId of elementsToToggle) next.add(elId)
    }
    
    set({ selectedTemplateElementIds: next })
  },

  clearTemplateElementSelection: () => {
    set({ selectedTemplateElementIds: new Set() })
  },

  updateTemplateColor: (id, color) => {
    const { templateElementColors } = get()
    set({ templateElementColors: { ...templateElementColors, [id]: color } })
  },

  updateTemplateStrokeColor: (id, color) => {
    const { templateStrokeColors } = get()
    set({ templateStrokeColors: { ...templateStrokeColors, [id]: color } })
  },

  updateTemplateStrokeWidth: (id, width) => {
    const { templateStrokeWidths } = get()
    set({ templateStrokeWidths: { ...templateStrokeWidths, [id]: width } })
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

  initTemplateElement: (id, rect) => {
    const { templateElementPositions } = get()
    if (templateElementPositions[id]) return
    set({
      templateElementPositions: {
        ...templateElementPositions,
        [id]: { ...rect },
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

  rotateTemplateElement: (id, angle) => {
    const { templateElementRotations } = get()
    set({
      templateElementRotations: {
        ...templateElementRotations,
        [id]: angle,
      },
    })
  },

  groupTemplateElements: (ids) => {
    const { selectedTemplateElementIds, templateGroups, templateElementGroupIds } = get()
    const isExplicitCall = !!ids
    const elementsToGroup = ids ?? Array.from(selectedTemplateElementIds)
    if (elementsToGroup.length < 2) return

    const groupId = 'group_' + Math.random().toString(36).substring(2, 9)
    const nextGroups = { ...templateGroups, [groupId]: elementsToGroup }
    const nextElementGroupIds = { ...templateElementGroupIds }
    
    // Remove from existing groups if any
    for (const id of elementsToGroup) {
      const oldGroupId = nextElementGroupIds[id]
      if (oldGroupId && nextGroups[oldGroupId]) {
        nextGroups[oldGroupId] = nextGroups[oldGroupId].filter(e => e !== id)
        if (nextGroups[oldGroupId].length === 0) delete nextGroups[oldGroupId]
      }
      nextElementGroupIds[id] = groupId
    }

    set({
      templateGroups: nextGroups,
      templateElementGroupIds: nextElementGroupIds,
      selectedTemplateElementIds: isExplicitCall ? selectedTemplateElementIds : new Set(elementsToGroup)
    })
  },

  ungroupTemplateElements: (groupId) => {
    const { selectedTemplateElementIds, templateGroups, templateElementGroupIds } = get()
    
    // Find groups to ungroup (either specified, or those containing selected elements)
    const groupsToUngroup = new Set<string>()
    if (groupId) {
      groupsToUngroup.add(groupId)
    } else {
      for (const id of selectedTemplateElementIds) {
        if (templateElementGroupIds[id]) {
          groupsToUngroup.add(templateElementGroupIds[id])
        }
      }
    }

    if (groupsToUngroup.size === 0) return

    const nextGroups = { ...templateGroups }
    const nextElementGroupIds = { ...templateElementGroupIds }
    const nextSelected = new Set(selectedTemplateElementIds)

    for (const gid of groupsToUngroup) {
      const groupElements = nextGroups[gid] || []
      for (const id of groupElements) {
        delete nextElementGroupIds[id]
      }
      delete nextGroups[gid]
    }

    set({
      templateGroups: nextGroups,
      templateElementGroupIds: nextElementGroupIds,
      selectedTemplateElementIds: nextSelected
    })
  },
}))
