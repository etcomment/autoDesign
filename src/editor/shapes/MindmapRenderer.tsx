import { useDiagramStore } from '../../store/diagramStore'
import type { MindmapNode } from '../../mermaid/parseMindmap'

const SECTION_PALETTE = [
  '#ef5350', '#66bb6a', '#42a5f5', '#ffa726',
  '#ab47bc', '#26c6da', '#8d6e63', '#78909c',
]

const ROOT_COLOR = '#e8f4f8'

interface LayoutNode {
  node: MindmapNode
  x: number
  y: number
  depth: number
  section: number
}

function countLeaves(node: MindmapNode): number {
  if (node.children.length === 0) return 1
  let total = 0
  for (const child of node.children) total += countLeaves(child)
  return total
}

const LEAF_WIDTH = 140
const LEVEL_HEIGHT = 110
const NODE_HEIGHT = 34
const ROOT_HEIGHT = 40

function computeNodeWidth(node: MindmapNode): number {
  return Math.max(80, node.text.length * 8 + 24)
}

function layoutTree(root: MindmapNode): LayoutNode[] {
  const result: LayoutNode[] = []
  const totalLeaves = countLeaves(root)
  const totalWidth = Math.max(totalLeaves * LEAF_WIDTH, 400)
  const canvasWidth = totalWidth + 80
  const startX = (canvasWidth - totalWidth) / 2

  function position(
    node: MindmapNode,
    left: number,
    right: number,
    depth: number,
    section: number,
  ): void {
    const x = startX + (left + right) / 2
    const y = 50 + depth * LEVEL_HEIGHT
    result.push({ node, x, y, depth, section })

    if (node.children.length === 0) return

    const childLeaves = node.children.map(c => countLeaves(c))
    const totalChildLeaves = childLeaves.reduce((a, b) => a + b, 0)
    if (totalChildLeaves === 0) return

    const span = right - left
    let currentLeft = left
    for (let i = 0; i < node.children.length; i++) {
      const segment = (childLeaves[i]! / totalChildLeaves) * span
      const childSection = depth === 0 ? i % 4 : section
      position(node.children[i]!, currentLeft, currentLeft + segment, depth + 1, childSection)
      currentLeft += segment
    }
  }

  position(root, 0, totalWidth, 0, 0)
  return result
}

function bezierPath(x1: number, y1: number, x2: number, y2: number): string {
  const cy = (y1 + y2) / 2
  return `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`
}

function getSectionColor(section: number, elementId: string, diagramColors: Record<string, string>): string {
  return diagramColors[elementId] ?? SECTION_PALETTE[section % SECTION_PALETTE.length]!
}

export function MindmapRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'mindmap' || !diagramData?.root) return null
  const root = diagramData.root as MindmapNode

  const layoutNodes = layoutTree(root)

  return (
    <g>
      {layoutNodes.filter(n => n.depth > 0).map(({ node, x, y }) => {
        const parent = layoutNodes.find(p => p.node.children.includes(node))
        if (!parent) return null
        const parentH = parent.depth === 0 ? ROOT_HEIGHT : NODE_HEIGHT
        return (
          <path
            key={`conn-${node.id}`}
            d={bezierPath(parent.x, parent.y + parentH / 2, x, y - NODE_HEIGHT / 2)}
            fill="none"
            stroke="#666"
            strokeWidth={1.5}
          />
        )
      })}
      {layoutNodes.map(({ node, x, y, depth, section }) => {
        const elementId = `node-${node.text}`
        const isSelected = selectedIds.has(elementId)
        const isRoot = depth === 0
        const h = isRoot ? ROOT_HEIGHT : NODE_HEIGHT
        const boxW = computeNodeWidth(node)
        const color = isRoot
          ? (diagramColors[elementId] ?? ROOT_COLOR)
          : getSectionColor(section, elementId, diagramColors)
        const textColor = isRoot ? '#333' : '#fff'

        return (
          <g key={node.id} onClick={() => toggleElement(elementId)} cursor="pointer">
            {isRoot ? (
              <rect
                x={x - boxW / 2}
                y={y - h / 2}
                width={boxW}
                height={h}
                rx={h / 2}
                ry={h / 2}
                fill={color}
                stroke={isSelected ? '#2196F3' : '#333'}
                strokeWidth={isSelected ? 2.5 : 1.5}
                strokeDasharray={isSelected ? '6 3' : 'none'}
              />
            ) : (
              <rect
                x={x - boxW / 2}
                y={y - h / 2}
                width={boxW}
                height={h}
                rx={6}
                ry={6}
                fill={color}
                stroke={isSelected ? '#2196F3' : color}
                strokeWidth={isSelected ? 2.5 : 1}
                strokeDasharray={isSelected ? '6 3' : 'none'}
              />
            )}
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Arial, sans-serif"
              fontSize={11}
              fill={textColor}
              pointerEvents="none"
            >
              {node.text}
            </text>
          </g>
        )
      })}
    </g>
  )
}
