import { DiagramModel } from '../core/model/DiagramModel'

interface ErEntity {
  name: string
  alias?: string
  attributes: string[]
}

export function parseErDiagram(dsl: string): DiagramModel {
  const model = new DiagramModel()
  const lines = dsl.split('\n')
  const entities = new Map<string, ErEntity>()
  const relations: { source: string; target: string }[] = []

  let currentEntity: ErEntity | null = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || /^erDiagram/i.test(trimmed)) continue

    if (/^direction\s+(TB|BT|LR|RL)$/i.test(trimmed)) continue

    if (/^subgraph\s+/i.test(trimmed) || trimmed === 'end') continue

    const entityMatch = /^(?:"([^"]*)"|(\w[\w-]*))(?:\s*\[([^\]]+)\])?\s*\{$/.exec(trimmed)
    if (entityMatch) {
      const name = entityMatch[1] ?? entityMatch[2]!
      const alias = entityMatch[3]?.replace(/^"|"$/g, '')
      currentEntity = { name, alias, attributes: [] }
      entities.set(name, currentEntity)
      continue
    }

    if (trimmed === '}') {
      currentEntity = null
      continue
    }

    if (currentEntity) {
      const attrMatch = /^([a-zA-Z][\w\-()[\]]*)(\??)\s+(\*?\w[\w\-()[\]]*)(?:\s+((?:PK|FK|UK)(?:\s*,\s*(?:PK|FK|UK))*))?(?:\s+"([^"]*)")?\s*$/.exec(trimmed)
      if (attrMatch) {
        const type = attrMatch[1]! + (attrMatch[2] ?? '')
        const attrName = attrMatch[3]!
        let attrStr = `${attrName}: ${type}`
        if (attrMatch[4]) attrStr += ` [${attrMatch[4]}]`
        if (attrMatch[5]) attrStr += ` "${attrMatch[5]}"`
        currentEntity.attributes.push(attrStr)
      }
      continue
    }

    const relationMatch = /^(?:"([^"]*)"|(\w[\w-]*))\s+(\|\||\}\||}o|\|o)(--|\.\.)(\|\||\|\{|o\{|o\|)\s+(?:"([^"]*)"|(\w[\w-]*))(?:\s*:\s*(.*))?$/.exec(trimmed)
    if (relationMatch) {
      const sourceName = relationMatch[1] ?? relationMatch[2]!
      const targetName = relationMatch[6] ?? relationMatch[7]!

      if (!entities.has(sourceName)) {
        entities.set(sourceName, { name: sourceName, attributes: [] })
      }
      if (!entities.has(targetName)) {
        entities.set(targetName, { name: targetName, attributes: [] })
      }
      relations.push({ source: sourceName, target: targetName })
      continue
    }

    const standaloneMatch = /^(?:"([^"]*)"|(\w[\w-]*))\s*$/.exec(trimmed)
    if (standaloneMatch) {
      const name = standaloneMatch[1] ?? standaloneMatch[2]!
      if (!entities.has(name)) {
        entities.set(name, { name, attributes: [] })
      }
    }
  }

  const entityIds = new Map<string, string>()
  let index = 0
  for (const [name, entity] of entities) {
    const x = 100 + (index % 4) * 220
    const y = 40 + Math.floor(index / 4) * 180
    const displayName = entity.alias ? `${name} (${entity.alias})` : name
    const lines = [displayName, ...entity.attributes]
    const height = 50 + entity.attributes.length * 20
    const shape = model.addShape('rectangle', { x, y }, { width: 170, height })
    model.updateShapeText(shape.id, { content: lines.join('\n'), fontAlign: 'left', fontSize: 11 })
    entityIds.set(name, shape.id)
    index++
  }

  for (const { source, target } of relations) {
    const sourceId = entityIds.get(source)
    const targetId = entityIds.get(target)
    if (sourceId && targetId) {
      model.addConnection(sourceId, targetId)
    }
  }

  return model
}

export function isErDiagram(dsl: string): boolean {
  return /^\s*erDiagram/i.test(dsl)
}
