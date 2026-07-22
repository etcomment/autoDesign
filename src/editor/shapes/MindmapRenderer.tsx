import { useDiagramStore } from '../../store/diagramStore'
import type { MindmapNode } from '../../mermaid/parseMindmap'

const COLORS = ['#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4']

export function MindmapRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)

  if (diagramType !== 'mindmap' || !diagramData?.root) return null
  const root = diagramData.root as MindmapNode
  if (!root) return null

  function renderNode(node: MindmapNode, x: number, y: number, depth: number, maxDepth: number): { x: number; y: number } {
    const boxW = Math.max(80, node.text.length * 9 + 20)
    const boxH = 28

    return (
      <>
        <rect x={x - boxW / 2} y={y - boxH / 2} width={boxW} height={boxH} rx={14}
          fill={COLORS[Math.min(depth, COLORS.length - 1)]!} stroke={COLORS[Math.min(depth, COLORS.length - 1)]!} strokeWidth={1} />
        <text x={x} y={y + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill={depth === 0 ? 'white' : 'white'}>
          {node.text}
        </text>
      </>
    )
  }

  function layoutChildren(node: MindmapNode, x: number, y: number, depth: number, maxDepth: number): number {
    if (node.children.length === 0) return y

    const childSpacing = 45
    const startY = y - ((node.children.length - 1) * childSpacing) / 2

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]!
      const childX = x + 160
      const childY = startY + i * childSpacing

      const childBox = renderNode(child, childX, childY, depth + 1, maxDepth)
      layoutChildren(child, childX, childY, depth + 1, maxDepth)
    }

    return y
  }

  const startX = 100
  const startY = 300

  return (
    <g>
      <rect x={startX - 60} y={startY - 20} width={120} height={40} rx={20}
        fill={COLORS[0]} stroke={COLORS[0]} strokeWidth={2} />
      <text x={startX} y={startY + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
        {root.text}
      </text>
      {(() => { layoutChildren(root, startX, startY, 0, 3); return null })()}
    </g>
  )
}
