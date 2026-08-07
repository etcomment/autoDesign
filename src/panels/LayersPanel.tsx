import React, { useState } from 'react'
import { Eye, EyeOff, Lock, Unlock, Layers, ChevronUp, ChevronDown, ChevronRight, LayoutTemplate, Square } from 'lucide-react'
import { useDiagramStore } from '../store/diagramStore'
import { useTemplateStore } from '../templates/store'
import type { Shape } from '../core/model/Shape'

interface LayerItem {
  id: string
  type: 'shape' | 'template'
  shape?: Shape
}

interface TemplateSubElement {
  id: string
  label: string
  children?: TemplateSubElement[]
}

function getTemplateSubElements(templateData: any, templateElementPositions: Record<string, any>): TemplateSubElement[] {
  if (!templateData) return []
  const subElements: TemplateSubElement[] = []
  const seenIds = new Set<string>()

  const add = (id: string, label: string, children?: TemplateSubElement[]) => {
    if (seenIds.has(id)) return
    seenIds.add(id)
    subElements.push({ id, label, children })
  }

  if (templateData.title) {
    add('title', `Titre: "${typeof templateData.title === 'string' ? templateData.title : 'Titre'}"`)
  }

  // Création des Groupes Virtuels par Bloc (ex: Groupe 1, Groupe 2...)
  const stepsCount = Array.isArray(templateData.steps) ? templateData.steps.length : (Array.isArray(templateData.milestones) ? templateData.milestones.length : 0)
  if (stepsCount > 0) {
    for (let i = 0; i < stepsCount; i++) {
      const idx = i + 1
      const blockId = `block-${idx}`
      const msItem = templateData.milestones?.[i]
      const stepItem = templateData.steps?.[i]
      const rawTitle = stepItem?.title || msItem?.quarter || msItem?.title || `Jalon ${idx}`

      const children: TemplateSubElement[] = []
      const strictSuffixPattern = new RegExp(`-${idx}$`)
      
      for (const posId of Object.keys(templateElementPositions)) {
        if (strictSuffixPattern.test(posId) && posId !== blockId && !seenIds.has(posId)) {
          let label = posId
          if (posId.startsWith('milestone-')) label = `Titre/Description Jalon`
          else if (posId.startsWith('step-body-')) label = `Ruban segment`
          else if (posId.startsWith('step-arrow-')) label = `Flèche triangulaire`
          else if (posId.startsWith('step-')) label = `Code/Libellé étape`

          children.push({ id: posId, label })
          seenIds.add(posId)
        }
      }

      add(blockId, `Groupe ${idx} : "${rawTitle}"`, children.length > 0 ? children : undefined)
    }
  }

  for (const id of Object.keys(templateElementPositions)) {
    if (!seenIds.has(id)) {
      add(id, `Élément: ${id}`)
    }
  }

  return subElements
}

export function LayersPanel() {
  const shapes = useDiagramStore(s => s.shapes)
  const selectedShapeIds = useDiagramStore(s => s.selectedShapeIds)
  const templateZIndex = useDiagramStore(s => s.templateZIndex)
  const setTemplateZIndex = useDiagramStore(s => s.setTemplateZIndex)
  const selectShape = useDiagramStore(s => s.selectShape)
  const deselectShape = useDiagramStore(s => s.deselectShape)
  const clearSelection = useDiagramStore(s => s.clearSelection)
  const toggleShapeHidden = useDiagramStore(s => s.toggleShapeHidden)
  const toggleShapeLocked = useDiagramStore(s => s.toggleShapeLocked)
  const reorderShapes = useDiagramStore(s => s.reorderShapes)

  const activeTemplate = useTemplateStore(s => s.activeTemplate)
  const templateData = useTemplateStore(s => s.templateData)
  const isTemplateHidden = useTemplateStore(s => s.isTemplateHidden)
  const toggleTemplateHidden = useTemplateStore(s => s.toggleTemplateHidden)
  const hiddenTemplateElementIds = useTemplateStore(s => s.hiddenTemplateElementIds)
  const toggleTemplateElementHidden = useTemplateStore(s => s.toggleTemplateElementHidden)
  const selectedTemplateElementIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const selectTemplateElement = useTemplateStore(s => s.selectTemplateElement)
  const toggleTemplateElement = useTemplateStore(s => s.toggleTemplateElement)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)
  const [isTemplateTreeExpanded, setIsTemplateTreeExpanded] = useState(true)

  // Construct bottom-to-top SVG render order list of items
  const clampedTemplateIndex = Math.max(0, Math.min(shapes.length, templateZIndex))
  const svgOrderItems: LayerItem[] = []
  for (let i = 0; i <= shapes.length; i++) {
    if (activeTemplate && i === clampedTemplateIndex) {
      svgOrderItems.push({ id: 'template-layer-item', type: 'template' })
    }
    if (i < shapes.length) {
      const shape = shapes[i]
      if (shape) {
        svgOrderItems.push({ id: shape.id, type: 'shape', shape })
      }
    }
  }

  // UI display order is top-to-bottom (reversed SVG render order)
  const reversedLayerItems = [...svgOrderItems].reverse()
  const templateSubElements = getTemplateSubElements(templateData, templateElementPositions)
  const totalCount = (activeTemplate ? 1 + templateSubElements.length : 0) + shapes.length

  const handleSelect = (item: LayerItem, e: React.MouseEvent) => {
    if (item.type === 'template') return
    if (!item.shape) return

    if (e.ctrlKey || e.metaKey) {
      if (selectedShapeIds.has(item.shape.id)) {
        deselectShape(item.shape.id)
      } else {
        selectShape(item.shape.id)
      }
    } else {
      clearSelection()
      selectShape(item.shape.id)
    }
  }

  const handleSelectSubElement = (subId: string, e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      toggleTemplateElement(subId)
    } else {
      clearSelection()
      selectTemplateElement(subId)
    }
  }

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'move'
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (dragOverId !== id) {
      setDragOverId(id)
    }
  }

  const handleDragLeave = () => {
    setDragOverId(null)
  }

  const applyNewReversedOrder = (updatedReversed: LayerItem[]) => {
    const newSvgOrder = [...updatedReversed].reverse()
    let newTemplateIndex = newSvgOrder.findIndex(item => item.type === 'template')
    if (newTemplateIndex === -1) newTemplateIndex = 0

    const newShapeIds = newSvgOrder
      .filter(item => item.type === 'shape' && item.shape)
      .map(item => item.shape!.id)

    reorderShapes(newShapeIds)
    if (activeTemplate) {
      setTemplateZIndex(newTemplateIndex)
    }
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    const sourceId = draggedId || e.dataTransfer.getData('text/plain')
    setDraggedId(null)
    setDragOverId(null)

    if (!sourceId || sourceId === targetId) return

    const currentReversed = reversedLayerItems.map(item => item.id)
    const fromIndex = currentReversed.indexOf(sourceId)
    const toIndex = currentReversed.indexOf(targetId)

    if (fromIndex === -1 || toIndex === -1) return

    const updatedReversed = [...reversedLayerItems]
    const moved = updatedReversed[fromIndex]
    if (!moved) return
    updatedReversed.splice(fromIndex, 1)
    updatedReversed.splice(toIndex, 0, moved)

    applyNewReversedOrder(updatedReversed)
  }

  const handleMoveUp = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const currentReversed = reversedLayerItems.map(item => item.id)
    const index = currentReversed.indexOf(id)
    if (index <= 0) return
    const updatedReversed = [...reversedLayerItems]
    const moved = updatedReversed[index]
    if (!moved) return
    updatedReversed.splice(index, 1)
    updatedReversed.splice(index - 1, 0, moved)

    applyNewReversedOrder(updatedReversed)
  }

  const handleMoveDown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const currentReversed = reversedLayerItems.map(item => item.id)
    const index = currentReversed.indexOf(id)
    if (index === -1 || index >= currentReversed.length - 1) return
    const updatedReversed = [...reversedLayerItems]
    const moved = updatedReversed[index]
    if (!moved) return
    updatedReversed.splice(index, 1)
    updatedReversed.splice(index + 1, 0, moved)

    applyNewReversedOrder(updatedReversed)
  }

  const getItemLabel = (item: LayerItem): string => {
    if (item.type === 'template') {
      return `Template (${activeTemplate ?? ''})`
    }
    const shape = item.shape!
    if (shape.text?.content?.trim()) {
      return shape.text.content.trim()
    }
    if (shape.iconName) {
      return `Icône (${shape.iconName})`
    }
    return `${shape.type.charAt(0).toUpperCase() + shape.type.slice(1)} (${shape.id})`
  }

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <Layers size={16} style={{ marginRight: 6 }} />
        <span style={styles.title}>Calques ({totalCount})</span>
      </div>

      {totalCount === 0 ? (
        <div style={styles.emptyState}>Aucun élément sur le canvas</div>
      ) : (
        <div style={styles.list}>
          {reversedLayerItems.map((item, index) => {
            const isTemplate = item.type === 'template'
            const isSelected = !isTemplate && item.shape && selectedShapeIds.has(item.shape.id)
            const isDraggingThis = draggedId === item.id
            const isDragOverThis = dragOverId === item.id
            const isHidden = isTemplate ? isTemplateHidden : !!item.shape?.isHidden
            const isLocked = isTemplate ? false : !!item.shape?.isLocked

            return (
              <React.Fragment key={item.id}>
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragOver={(e) => handleDragOver(e, item.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, item.id)}
                  onClick={(e) => handleSelect(item, e)}
                  style={{
                    ...styles.item,
                    ...(isSelected ? styles.selectedItem : {}),
                    ...(isTemplate ? styles.templateItem : {}),
                    ...(isDraggingThis ? styles.draggingItem : {}),
                    ...(isDragOverThis ? styles.dragOverItem : {}),
                  }}
                >
                  <div style={styles.itemContent}>
                    <span style={styles.dragHandle} title="Glisser pour réordonner">
                      ⋮⋮
                    </span>
                    {isTemplate && (
                      <button
                        type="button"
                        style={{ ...styles.actionBtn, padding: 0, marginRight: 2 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsTemplateTreeExpanded(!isTemplateTreeExpanded)
                        }}
                      >
                        {isTemplateTreeExpanded ? <ChevronDown size={14} color="#4a90d9" /> : <ChevronRight size={14} color="#4a90d9" />}
                      </button>
                    )}
                    {isTemplate && <LayoutTemplate size={14} color="#4a90d9" style={{ flexShrink: 0 }} />}
                    <span
                      style={{
                        ...styles.itemLabel,
                        opacity: isHidden ? 0.5 : 1,
                        textDecoration: isHidden ? 'line-through' : 'none',
                        fontWeight: isTemplate ? 600 : 400,
                      }}
                      title={getItemLabel(item)}
                    >
                      {getItemLabel(item)}
                    </span>
                  </div>

                  <div style={styles.actions}>
                    <button
                      type="button"
                      style={styles.actionBtn}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (isTemplate) {
                          toggleTemplateHidden()
                        } else if (item.shape) {
                          toggleShapeHidden(item.shape.id)
                        }
                      }}
                      title={isHidden ? 'Afficher' : 'Masquer'}
                    >
                      {isHidden ? <EyeOff size={14} color="#888" /> : <Eye size={14} color="#555" />}
                    </button>

                    {!isTemplate && (
                      <button
                        type="button"
                        style={styles.actionBtn}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (item.shape) {
                            toggleShapeLocked(item.shape.id)
                          }
                        }}
                        title={isLocked ? 'Déverrouiller' : 'Verrouiller'}
                      >
                        {isLocked ? <Lock size={14} color="#d9534f" /> : <Unlock size={14} color="#888" />}
                      </button>
                    )}

                    <button
                      type="button"
                      style={{
                        ...styles.actionBtn,
                        opacity: index === 0 ? 0.3 : 1,
                        cursor: index === 0 ? 'default' : 'pointer',
                      }}
                      disabled={index === 0}
                      onClick={(e) => handleMoveUp(item.id, e)}
                      title="Monter l'élément"
                    >
                      <ChevronUp size={14} color="#555" />
                    </button>

                    <button
                      type="button"
                      style={{
                        ...styles.actionBtn,
                        opacity: index === reversedLayerItems.length - 1 ? 0.3 : 1,
                        cursor: index === reversedLayerItems.length - 1 ? 'default' : 'pointer',
                      }}
                      disabled={index === reversedLayerItems.length - 1}
                      onClick={(e) => handleMoveDown(item.id, e)}
                      title="Descendre l'élément"
                    >
                      <ChevronDown size={14} color="#555" />
                    </button>
                  </div>
                </div>

                {/* Render Template Child Sub-Elements */}
                {isTemplate && isTemplateTreeExpanded && templateSubElements.map((subItem) => {
                  const isSubHidden = hiddenTemplateElementIds.has(subItem.id) || isTemplateHidden

                  const renderSubItemRow = (item: TemplateSubElement, isChild = false) => {
                    const isSelected = selectedTemplateElementIds.has(item.id)
                    const isHidden = hiddenTemplateElementIds.has(item.id) || (!isChild && isSubHidden) || (isChild && isSubHidden) || isTemplateHidden

                    return (
                      <div
                        key={`sub-${item.id}`}
                        onClick={(e) => handleSelectSubElement(item.id, e)}
                        style={{
                          ...styles.item,
                          paddingLeft: isChild ? 42 : 28,
                          backgroundColor: isSelected ? '#e3f2fd' : '#fafafa',
                        }}
                      >
                        <div style={styles.itemContent}>
                          <Square size={10} color={isChild ? "#a0a0a0" : "#757575"} style={{ flexShrink: 0 }} />
                          <span
                            style={{
                              ...styles.itemLabel,
                              fontSize: 11,
                              opacity: isHidden ? 0.4 : 1,
                              textDecoration: isHidden ? 'line-through' : 'none',
                            }}
                            title={item.label}
                          >
                            {item.label}
                          </span>
                        </div>
                        <div style={styles.actions}>
                          <button
                            type="button"
                            style={styles.actionBtn}
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleTemplateElementHidden(item.id)
                            }}
                            title={isHidden ? 'Afficher la sous-composante' : 'Masquer la sous-composante'}
                          >
                            {isHidden ? <EyeOff size={13} color="#888" /> : <Eye size={13} color="#555" />}
                          </button>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <React.Fragment key={`frag-${subItem.id}`}>
                      {renderSubItemRow(subItem, false)}
                      {subItem.children?.map(child => renderSubItemRow(child, true))}
                    </React.Fragment>
                  )
                })}
              </React.Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
    maxHeight: 280,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #eee',
    fontWeight: 600,
    fontSize: 13,
    color: '#333',
  },
  title: {
    userSelect: 'none',
  },
  emptyState: {
    padding: 16,
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  list: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 220,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6px 10px',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: 12,
    transition: 'background-color 0.15s',
  },
  selectedItem: {
    backgroundColor: '#e6f0fa',
  },
  templateItem: {
    backgroundColor: '#f0f7ff',
  },
  draggingItem: {
    opacity: 0.4,
  },
  dragOverItem: {
    borderTop: '2px solid #4a90d9',
  },
  itemContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 0,
    marginRight: 8,
  },
  dragHandle: {
    cursor: 'grab',
    color: '#999',
    fontSize: 12,
    lineHeight: 1,
  },
  itemLabel: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#333',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  actionBtn: {
    border: 'none',
    background: 'transparent',
    padding: 2,
    borderRadius: 3,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
