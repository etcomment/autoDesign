import { DiagramModel } from '../core/model/DiagramModel'
import type { ShapeType } from '../core/model/Shape'
import dagre from 'dagre'
import { parseSequenceDiagram, isSequenceDiagram, isClassDiagram } from './parseSequenceDiagram'
import type { SequenceData } from './parseSequenceDiagram'
import { parseClassDiagram } from './parseClassDiagram'
import { parseStateDiagram, isStateDiagram } from './parseStateDiagram'
import { parseErDiagram, isErDiagram } from './parseErDiagram'
import { parseBlockDiagram, isBlockDiagram } from './parseBlockDiagram'
import { parsePieChart, isPieChart } from './parsePieChart'
import { parseQuadrant, isQuadrant } from './parseQuadrant'
import { parseTimeline, isTimeline } from './parseTimeline'
import { parseUserJourney, isUserJourney } from './parseUserJourney'
import { parseGantt, isGantt } from './parseGantt'
import { parseMindmap, isMindmap } from './parseMindmap'
import { parseGitGraph, isGitGraph } from './parseGitGraph'

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

interface ParsedStyle {
  nodeId: string
  properties: Record<string, string>
}

interface ParsedClassDef {
  className: string
  properties: Record<string, string>
}

export interface SubgraphGroup {
  readonly title: string
  readonly shapeIds: readonly string[]
}

export interface ParseResult {
  model: DiagramModel
  subgraphGroups: readonly SubgraphGroup[]
  diagramType: 'flowchart' | 'sequence' | 'class' | 'state' | 'er' | 'block' | 'pie' | 'quadrant' | 'timeline' | 'userJourney' | 'gantt' | 'mindmap' | 'gitGraph'
  sequenceData?: SequenceData
  diagramData?: Record<string, unknown>
}

function parseDirection(dsl: string): 'TD' | 'LR' | 'RL' | 'BT' {
  const match = /(?:graph|flowchart)\s+(TD|LR|RL|BT)/i.exec(dsl)
  return (match?.[1]?.toUpperCase() ?? 'TD') as 'TD' | 'LR' | 'RL' | 'BT'
}

function parseStyleProperties(styleStr: string): Record<string, string> {
  const props: Record<string, string> = {}
  const parts = styleStr.split(',').map(s => s.trim())
  for (const part of parts) {
    const colonIndex = part.indexOf(':')
    if (colonIndex === -1) continue
    const key = part.slice(0, colonIndex).trim()
    const value = part.slice(colonIndex + 1).trim()
    if (key && value) props[key] = value
  }
  return props
}

function parseStyles(lines: string[]): ParsedStyle[] {
  const styles: ParsedStyle[] = []
  for (const line of lines) {
    const trimmed = line.trim()
    const match = /^style\s+(\w[\w-]*)\s+(.+)$/i.exec(trimmed)
    if (!match) continue
    const nodeId = match[1]!
    const props = parseStyleProperties(match[2]!)
    styles.push({ nodeId, properties: props })
  }
  return styles
}

function parseClassDefs(lines: string[]): ParsedClassDef[] {
  const defs: ParsedClassDef[] = []
  for (const line of lines) {
    const trimmed = line.trim()
    const match = /^classDef\s+(\w[\w-]*)\s+(.+)$/i.exec(trimmed)
    if (!match) continue
    const className = match[1]!
    const props = parseStyleProperties(match[2]!)
    defs.push({ className, properties: props })
  }
  return defs
}

function parseClassAssignments(lines: string[]): Map<string, string> {
  const assignments = new Map<string, string>()
  for (const line of lines) {
    const trimmed = line.trim()
    const match = /^class\s+([\w\s,]+)\s+(\w[\w-]*)$/i.exec(trimmed)
    if (!match) continue
    const nodeIds = match[1]!.split(',').map(id => id.trim()).filter(Boolean)
    const className = match[2]!
    for (const id of nodeIds) {
      assignments.set(id, className)
    }
  }
  return assignments
}

function applyStyleProperty(key: string, value: string): Record<string, string | number> | null {
  switch (key) {
    case 'fill':
      return { fill: value }
    case 'stroke':
      return { stroke: value }
    case 'stroke-width':
      return { strokeWidth: parseInt(value, 10) || 2 }
    case 'color':
      return { color: value }
    case 'stroke-dasharray':
      return { strokeDasharray: value }
    default:
      return null
  }
}

function resolveNodeStyle(
  nodeId: string,
  styles: ParsedStyle[],
  classDefs: ParsedClassDef[],
  classAssignments: Map<string, string>,
): Record<string, string | number> {
  const resolved: Record<string, string | number> = {}

  const className = classAssignments.get(nodeId)
  if (className) {
    const classDef = classDefs.find(d => d.className === className)
    if (classDef) {
      for (const [key, value] of Object.entries(classDef.properties)) {
        const applied = applyStyleProperty(key, value)
        if (applied) Object.assign(resolved, applied)
      }
    }
  }

  const directStyle = styles.find(s => s.nodeId === nodeId)
  if (directStyle) {
    for (const [key, value] of Object.entries(directStyle.properties)) {
      const applied = applyStyleProperty(key, value)
      if (applied) Object.assign(resolved, applied)
    }
  }

  return resolved
}

function parseNodes(lines: string[]): ParsedNode[] {
  const nodes: ParsedNode[] = []
  const seenIds = new Set<string>()
  let currentSubgraph: string | undefined

  const bracketRegex = /(\w+)\s*\[([^\]]*)\]/g
  const circleRegex = /(\w+)\s*\(\(([^)]*)\)\)/g
  const diamondRegex = /(\w+)\s*\{([^}]*)\}/g
  const roundRegex = /(\w+)\s*\(([^(\s][^)]*)\)/g

  function addIfNew(id: string, type: ShapeType, nodeText: string) {
    if (!seenIds.has(id)) {
      seenIds.add(id)
      nodes.push({ id, type, text: nodeText, subgraph: currentSubgraph })
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    const subgraphMatch = /^subgraph\s+(.+)/i.exec(trimmed)
    if (subgraphMatch) {
      currentSubgraph = subgraphMatch[1]!.trim()
      continue
    }
    if (/^end\b/i.test(trimmed)) {
      currentSubgraph = undefined
      continue
    }

    for (const m of line.matchAll(circleRegex)) {
      addIfNew(m[1]!, 'ellipse', m[2]!)
    }
    for (const m of line.matchAll(diamondRegex)) {
      addIfNew(m[1]!, 'diamond', m[2]!)
    }
    for (const m of line.matchAll(bracketRegex)) {
      addIfNew(m[1]!, 'rectangle', m[2]!)
    }
    for (const m of line.matchAll(roundRegex)) {
      addIfNew(m[1]!, 'rectangle', m[2]!)
    }
  }

  return nodes
}

function parseEdges(lines: string[]): { edges: ParsedEdge[]; nodeIds: Set<string> } {
  const edges: ParsedEdge[] = []
  const nodeIds = new Set<string>()

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || trimmed.startsWith('graph') || trimmed.startsWith('flowchart')) continue
    if (/^(subgraph|end|style|classDef|class)\b/.test(trimmed)) continue

    let clean = trimmed.replace(/\|[^|]*\|/g, '')

    clean = clean.replace(/\s*--\s+[^-]+\s*--\s*/g, ' --> ')
    clean = clean.replace(/\s*==>\s*/g, ' --> ')
    clean = clean.replace(/\s*-\.->\s*/g, ' --> ')
    clean = clean.replace(/\s*---\s*/g, ' --> ')

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

export function parseMermaid(dsl: string): ParseResult {
  const trimmed = dsl.trim()
  if (!trimmed) return { model: new DiagramModel(), subgraphGroups: [], diagramType: 'flowchart' }

  if (isSequenceDiagram(trimmed)) {
    const { model, sequenceData } = parseSequenceDiagram(trimmed)
    return { model, subgraphGroups: [], diagramType: 'sequence', sequenceData }
  }

  if (isClassDiagram(trimmed)) {
    const model = parseClassDiagram(trimmed)
    return { model, subgraphGroups: [], diagramType: 'class' }
  }

  if (isStateDiagram(trimmed)) {
    const model = parseStateDiagram(trimmed)
    return { model, subgraphGroups: [], diagramType: 'state' }
  }

  if (isErDiagram(trimmed)) {
    const model = parseErDiagram(trimmed)
    return { model, subgraphGroups: [], diagramType: 'er' }
  }

  if (isBlockDiagram(trimmed)) {
    const model = parseBlockDiagram(trimmed)
    return { model, subgraphGroups: [], diagramType: 'block' }
  }

  if (isPieChart(trimmed)) {
    const slices = parsePieChart(trimmed)
    return { model: new DiagramModel(), subgraphGroups: [], diagramType: 'pie', diagramData: { slices } }
  }

  if (isQuadrant(trimmed)) {
    const data = parseQuadrant(trimmed)
    return { model: new DiagramModel(), subgraphGroups: [], diagramType: 'quadrant', diagramData: data }
  }

  if (isTimeline(trimmed)) {
    const data = parseTimeline(trimmed)
    return { model: new DiagramModel(), subgraphGroups: [], diagramType: 'timeline', diagramData: data }
  }

  if (isUserJourney(trimmed)) {
    const data = parseUserJourney(trimmed)
    return { model: new DiagramModel(), subgraphGroups: [], diagramType: 'userJourney', diagramData: data }
  }

  if (isGantt(trimmed)) {
    const data = parseGantt(trimmed)
    return { model: new DiagramModel(), subgraphGroups: [], diagramType: 'gantt', diagramData: data }
  }

  if (isMindmap(trimmed)) {
    const data = parseMindmap(trimmed)
    return { model: new DiagramModel(), subgraphGroups: [], diagramType: 'mindmap', diagramData: data }
  }

  if (isGitGraph(trimmed)) {
    const data = parseGitGraph(trimmed)
    return { model: new DiagramModel(), subgraphGroups: [], diagramType: 'gitGraph', diagramData: data }
  }

  const lines = trimmed.split('\n').filter(line => {
    const t = line.trim()
    return !t.startsWith('%%')
  })

  const direction = parseDirection(trimmed)
  const nodes = parseNodes(lines)
  const { edges, nodeIds: edgeNodeIds } = parseEdges(lines)

  for (const id of edgeNodeIds) {
    if (!nodes.some(n => n.id === id)) {
      nodes.push({ id, type: 'rectangle', text: id })
    }
  }

  const styles = parseStyles(lines)
  const classDefs = parseClassDefs(lines)
  const classAssignments = parseClassAssignments(lines)

  const positions = computeLayout(nodes, edges, direction)

  const model = new DiagramModel()

  const idMap = new Map<string, string>()

  for (const node of nodes) {
    const pos = positions.get(node.id) ?? { x: 0, y: 0 }
    const shape = model.addShape(node.type, pos, { width: 120, height: 80 })
    model.updateShapeText(shape.id, { content: node.text })

    const resolvedStyle = resolveNodeStyle(node.id, styles, classDefs, classAssignments)
    if (Object.keys(resolvedStyle).length > 0) {
      const stylePatch: Record<string, string | number> = {}
      if ('fill' in resolvedStyle) stylePatch['fill'] = resolvedStyle['fill'] as string
      if ('stroke' in resolvedStyle) stylePatch['stroke'] = resolvedStyle['stroke'] as string
      if ('strokeWidth' in resolvedStyle) stylePatch['strokeWidth'] = resolvedStyle['strokeWidth'] as number
      model.updateShapeStyle(shape.id, stylePatch as Parameters<typeof model.updateShapeStyle>[1])
    }

    idMap.set(node.id, shape.id)
  }

  for (const edge of edges) {
    const sourceShapeId = idMap.get(edge.sourceId)
    const targetShapeId = idMap.get(edge.targetId)
    if (sourceShapeId && targetShapeId) {
      model.addConnection(sourceShapeId, targetShapeId)
    }
  }

  const subgraphMap = new Map<string, string[]>()
  for (const node of nodes) {
    if (node.subgraph) {
      const shapeId = idMap.get(node.id)
      if (!shapeId) continue
      let group = subgraphMap.get(node.subgraph)
      if (!group) {
        group = []
        subgraphMap.set(node.subgraph, group)
      }
      group.push(shapeId)
    }
  }

  const subgraphGroups: SubgraphGroup[] = []
  for (const [title, shapeIds] of subgraphMap) {
    subgraphGroups.push({ title, shapeIds })
  }

  return { model, subgraphGroups, diagramType: 'flowchart' }
}
