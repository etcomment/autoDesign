import { DiagramModel } from '../core/model/DiagramModel'
import type { ShapeType } from '../core/model/Shape'

interface ParsedNode {
  id: string
  type: ShapeType
  text: string
}

interface ParsedEdge {
  sourceId: string
  targetId: string
}

function parseDirection(dsl: string): 'TD' | 'LR' | 'RL' | 'BT' {
  const match = /(?:graph|flowchart)\s+(TD|LR|RL|BT)/i.exec(dsl)
  return (match?.[1]?.toUpperCase() ?? 'TD') as 'TD' | 'LR' | 'RL' | 'BT'
}

function parseNodes(lines: string[]): ParsedNode[] {
  const nodes: ParsedNode[] = []
  const seenIds = new Set<string>()

  const text = lines.join('\n')

  const bracketRegex = /(\w+)\s*\[([^\]]*)\]/g
  const circleRegex = /(\w+)\s*\(\(([^)]*)\)\)/g
  const diamondRegex = /(\w+)\s*\{([^}]*)\}/g
  const roundRegex = /(\w+)\s*\(([^(\s][^)]*)\)/g

  function addIfNew(id: string, type: ShapeType, text: string) {
    if (!seenIds.has(id)) {
      seenIds.add(id)
      nodes.push({ id, type, text })
    }
  }

  // circles: ((text))
  for (const m of text.matchAll(circleRegex)) {
    addIfNew(m[1]!, 'ellipse', m[2]!)
  }

  // diamonds: {text}
  for (const m of text.matchAll(diamondRegex)) {
    addIfNew(m[1]!, 'diamond', m[2]!)
  }

  // brackets: [text]
  for (const m of text.matchAll(bracketRegex)) {
    addIfNew(m[1]!, 'rectangle', m[2]!)
  }

  // round parentheses: (text) — must be before circle to avoid overlap
  for (const m of text.matchAll(roundRegex)) {
    addIfNew(m[1]!, 'rectangle', m[2]!)
  }

  return nodes
}

function parseEdges(lines: string[]): { edges: ParsedEdge[]; nodeIds: Set<string> } {
  const edges: ParsedEdge[] = []
  const nodeIds = new Set<string>()

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || trimmed.startsWith('graph') || trimmed.startsWith('flowchart')) continue

    // strip labels like |click|
    const cleanLine = trimmed.replace(/\|[^|]*\|/g, '')

    const parts = cleanLine.split(/\s*-->/)
    if (parts.length < 2) continue

    for (let i = 0; i < parts.length - 1; i++) {
      const sourceMatch = /(\w+)/.exec(parts[i] ?? '')
      const targetMatch = /(\w+)/.exec(parts[i + 1] ?? '')
      const sourceId = sourceMatch?.[1]
      const targetId = targetMatch?.[1]

      if (sourceId && targetId) {
        edges.push({ sourceId, targetId })
        nodeIds.add(sourceId)
        nodeIds.add(targetId)
      }
    }
  }

  return { edges, nodeIds }
}

function computeLayout(
  nodes: ParsedNode[],
  direction: string,
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()
  const gapX = 200
  const gapY = 120
  const startX = 50
  const startY = 50

  if (direction === 'TD' || direction === 'BT') {
    const rows = Math.ceil(nodes.length / 3)
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]!
      const col = i % 3
      const row = direction === 'BT' ? rows - 1 - Math.floor(i / 3) : Math.floor(i / 3)
      positions.set(node.id, {
        x: startX + col * gapX,
        y: startY + row * gapY,
      })
    }
  } else {
    const cols = Math.max(1, Math.ceil(nodes.length / 3))
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]!
      const row = i % 3
      const col = direction === 'RL' ? cols - 1 - Math.floor(i / 3) : Math.floor(i / 3)
      positions.set(node.id, {
        x: startX + col * gapX,
        y: startY + row * gapY,
      })
    }
  }

  return positions
}

export function parseMermaid(dsl: string): DiagramModel {
  const trimmed = dsl.trim()
  if (!trimmed) return new DiagramModel()

  const lines = trimmed.split('\n').filter(l => !l.trim().startsWith('%%'))

  const direction = parseDirection(trimmed)
  const nodes = parseNodes(lines)
  const { edges, nodeIds: edgeNodeIds } = parseEdges(lines)

  // Add default rectangle shapes for any IDs referenced in edges but not explicitly defined
  for (const id of edgeNodeIds) {
    if (!nodes.some(n => n.id === id)) {
      nodes.push({ id, type: 'rectangle', text: id })
    }
  }

  const positions = computeLayout(nodes, direction)

  const model = new DiagramModel()

  const idMap = new Map<string, string>()

  for (const node of nodes) {
    const pos = positions.get(node.id) ?? { x: 0, y: 0 }
    const shape = model.addShape(node.type, pos, { width: 120, height: 80 })
    model.updateShapeText(shape.id, { content: node.text })
    idMap.set(node.id, shape.id)
  }

  for (const edge of edges) {
    const sourceShapeId = idMap.get(edge.sourceId)
    const targetShapeId = idMap.get(edge.targetId)
    if (sourceShapeId && targetShapeId) {
      model.addConnection(sourceShapeId, targetShapeId)
    }
  }

  return model
}
