import { DiagramModel } from '../core/model/DiagramModel'

export function parseStateDiagram(dsl: string): DiagramModel {
  const model = new DiagramModel()
  const lines = dsl.split('\n')
  const transitions: { source: string; target: string; label: string }[] = []
  const knownStates = new Set<string>()

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || /^stateDiagram/i.test(trimmed)) continue
    if (/^state\s+/i.test(trimmed)) continue

    const arrowMatch = /^(\S+)\s*-->\s*(\S+)\s*:?\s*(.*)$/.exec(trimmed)
    if (arrowMatch) {
      const source = arrowMatch[1]!
      const target = arrowMatch[2]!
      const label = (arrowMatch[3] ?? '').trim()

      if (source !== '[*]') knownStates.add(source)
      if (target !== '[*]') knownStates.add(target)
      transitions.push({ source, target, label })
      continue
    }

    if (/^\w[\w-]*$/.test(trimmed)) {
      knownStates.add(trimmed)
    }
  }

  const stateLayout = new Map<string, { x: number; y: number }>()
  let index = 0
  for (const state of knownStates) {
    const col = index % 4
    const row = Math.floor(index / 4)
    stateLayout.set(state, { x: 100 + col * 180, y: 40 + row * 120 })
    index++
  }

  const stateIds = new Map<string, string>()

  for (const [name, pos] of stateLayout) {
    const shape = model.addShape('rectangle', pos, { width: 140, height: 60 })
    model.updateShapeText(shape.id, { content: name })
    stateIds.set(name, shape.id)
  }

  for (const { source, target, label } of transitions) {
    if (source === '[*]' || target === '[*]') continue
    const sourceId = stateIds.get(source)
    const targetId = stateIds.get(target)
    if (sourceId && targetId) {
      model.addConnection(sourceId, targetId)
    }
  }

  return model
}

export function isStateDiagram(dsl: string): boolean {
  return /^\s*stateDiagram/i.test(dsl)
}
