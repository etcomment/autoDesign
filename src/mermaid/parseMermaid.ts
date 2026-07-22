import { DiagramModel } from '../core/model/DiagramModel'
import type { ShapeType } from '../core/model/Shape'
import dagre from 'dagre'

interface ParsedNode {
  id: string
  type: ShapeType
  text: string
  subgraph?: string
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

  function addIfNew(id: string, type: ShapeType, nodeText: string) {
    if (!seenIds.has(id)) {
      seenIds.add(id)
      nodes.push({ id, type, text: nodeText })
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

  // round parentheses: (text)
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
    if (/^(subgraph|end)\b/.test(trimmed)) continue

    // Strip edge labels: |text| patterns
    let clean = trimmed.replace(/\|[^|]*\|/g, '')

    // Normalize all edge notations to " --> " for consistent splitting
    // -- text --> (labeled edge)
    clean = clean.replace(/\s*--\s+[^-]+\s*--\s*/g, ' --> ')
    // ==> (thick arrow)
    clean = clean.replace(/\s*==>\s*/g, ' --> ')
    // -.-> (dotted arrow)
    clean = clean.replace(/\s*-\.->\s*/g, ' --> ')
    // --- (undirected line)
    clean = clean.replace(/\s*---\s*/g, ' --> ')

    // Now split on all remaining edge markers
    const parts = clean.split(/\s*-->/)

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
  edges: ParsedEdge[],
  direction: string,
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()

  if (nodes.length === 0) return positions

  const graph = new dagre.graphlib.Graph()
  graph.setDefaultEdgeLabel(() => ({}))
  graph.setGraph({ rankdir: direction })

  for (const node of nodes) {
    graph.setNode(node.id, { width: 120, height: 80 })
  }

  for (const edge of edges) {
    graph.setEdge(edge.sourceId, edge.targetId)
  }

  dagre.layout(graph)

  for (const node of nodes) {
    const dagreNode = graph.node(node.id)
    if (dagreNode) {
      positions.set(node.id, {
        x: dagreNode.x - 60,
        y: dagreNode.y - 40,
      })
    }
  }

  return positions
}

export function parseMermaid(dsl: string): DiagramModel {
  const trimmed = dsl.trim()
  if (!trimmed) return new DiagramModel()

  const lines = trimmed.split('\n').filter(line => {
    const t = line.trim()
    return !t.startsWith('%%')
  })

  const direction = parseDirection(trimmed)
  const nodes = parseNodes(lines)
  const { edges, nodeIds: edgeNodeIds } = parseEdges(lines)

  // Add default rectangle shapes for any IDs referenced in edges but not explicitly defined
  for (const id of edgeNodeIds) {
    if (!nodes.some(n => n.id === id)) {
      nodes.push({ id, type: 'rectangle', text: id })
    }
  }

  const positions = computeLayout(nodes, edges, direction)

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
