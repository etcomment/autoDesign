import { useDiagramStore } from '../../store/diagramStore'
import type { SankeyLink } from '../../mermaid/parseSankey'

const DEFAULT_PALETTE = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
  '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',
]

export function SankeyRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'sankey' || !diagramData?.links) return null
  const links = diagramData.links as SankeyLink[]
  const nodes = (diagramData.nodes as string[]) ?? []
  if (links.length === 0) return null

  const nodeMap = new Map<string, { x: number; y: number; value: number }>()
  const height = 500

  const incoming = new Map<string, number>()
  for (const l of links) incoming.set(l.target, (incoming.get(l.target) ?? 0) + l.value)

  let y = 30
  const spacing = height / nodes.length
  for (const node of nodes) {
    nodeMap.set(node, { x: 80, y, value: incoming.get(node) ?? 0 })
    y += spacing
  }

  const gap = 300 / Math.max(1, Math.floor(nodes.length / 2))
  let y2 = 30
  for (const node of nodes) {
    const entry = nodeMap.get(node)
    if (entry) {
      entry.x = 80 + gap
    }
    y2 += spacing
  }

  return (
    <g>
      {nodes.map((node, i) => {
        const n = nodeMap.get(node)
        if (!n) return null
        const w = 30 + (incoming.get(node) ?? 1) * 2
        const elementKey = `node-${node}`
        const color = diagramColors[elementKey] ?? DEFAULT_PALETTE[i % 20]
        const isSelected = selectedIds.has(elementKey)
        return (
          <g key={node}>
            <rect
              x={n.x - w / 2}
              y={n.y - 10}
              width={w}
              height={20}
              rx={3}
              fill={color}
              opacity={0.8}
              stroke={isSelected ? '#4a90d9' : undefined}
              strokeWidth={isSelected ? 2 : undefined}
              strokeDasharray={isSelected ? '4 2' : undefined}
              onClick={() => toggleElement(elementKey)}
              style={{ cursor: 'pointer' }}
            />
            <text x={n.x - w / 2 - 5} y={n.y + 4} textAnchor="end"
              fontFamily="Arial, sans-serif" fontSize={10} fill="#333">{node}</text>
          </g>
        )
      })}
      {links.map((link, i) => {
        const src = nodeMap.get(link.source)
        const tgt = nodeMap.get(link.target)
        if (!src || !tgt) return null

        const midX = (src.x + tgt.x) / 2
        const d = `M ${src.x + 15} ${src.y} C ${midX} ${src.y}, ${midX} ${tgt.y}, ${tgt.x - 15} ${tgt.y}`

        return (
          <g key={i}>
            <path d={d} fill="none" stroke={DEFAULT_PALETTE[i % 20]}
              strokeWidth={Math.max(2, link.value * 0.5)} opacity={0.5} />
          </g>
        )
      })}
    </g>
  )
}
