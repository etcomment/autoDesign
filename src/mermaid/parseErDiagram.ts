import { DiagramModel } from '../core/model/DiagramModel'

export function parseErDiagram(dsl: string): DiagramModel {
  const model = new DiagramModel()
  const lines = dsl.split('\n')
  const entityIds = new Map<string, string>()
  let entityIndex = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || /^erDiagram/i.test(trimmed)) continue

    const relationMatch = /^(\w[\w-]*)\s+(\}|\|)?(o\|?|\|o|)([.-]{2,3})(o\|?|\|o|)(\{|\|)?\s+(\w[\w-]*)\s*:?\s*(.*)$/.exec(trimmed)
    if (relationMatch) {
      const sourceName = relationMatch[1]!
      let targetName = relationMatch[7]!
      const label = (relationMatch[8] ?? '').trim()

      if (!entityIds.has(sourceName)) {
        const x = 100 + entityIndex * 200
        const shape = model.addShape('rectangle', { x, y: 40 }, { width: 150, height: 80 })
        model.updateShapeText(shape.id, { content: sourceName })
        entityIds.set(sourceName, shape.id)
        entityIndex++
      }
      if (!entityIds.has(targetName)) {
        const x = 100 + entityIndex * 200
        const shape = model.addShape('rectangle', { x, y: 40 }, { width: 150, height: 80 })
        model.updateShapeText(shape.id, { content: targetName })
        entityIds.set(targetName, shape.id)
        entityIndex++
      }

      const sourceId = entityIds.get(sourceName)!
      const targetId = entityIds.get(targetName)!
      model.addConnection(sourceId, targetId)
      continue
    }

    const entityMatch = /^(\w[\w-]*)\s*\{/.exec(trimmed)
    if (entityMatch) {
      const name = entityMatch[1]!
      if (!entityIds.has(name)) {
        const x = 100 + entityIndex * 200
        const shape = model.addShape('rectangle', { x, y: 40 }, { width: 150, height: 80 })
        model.updateShapeText(shape.id, { content: name })
        entityIds.set(name, shape.id)
        entityIndex++
      }
      continue
    }
  }

  if (entityIds.size === 0) {
    const entityNames = new Set<string>()
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('%%') || /^erDiagram/i.test(trimmed)) continue
      const name = /^(\w[\w-]*)$/.exec(trimmed)?.[1]
      if (name) entityNames.add(name)
    }
    let i = 0
    for (const name of entityNames) {
      const x = 100 + i * 200
      const shape = model.addShape('rectangle', { x, y: 40 }, { width: 150, height: 80 })
      model.updateShapeText(shape.id, { content: name })
      entityIds.set(name, shape.id)
      i++
    }
  }

  return model
}

export function isErDiagram(dsl: string): boolean {
  return /^\s*erDiagram/i.test(dsl)
}
