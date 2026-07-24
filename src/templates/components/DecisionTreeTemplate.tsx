import { useRef, type ReactElement } from 'react'
import type { DecisionTreeData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

interface NodePosition {
  x: number
  y: number
  label: string
  answer?: 'yes' | 'no'
  outcome?: string
}

export function DecisionTreeTemplate({ data }: { data: DecisionTreeData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, rootQuestion, branches } = data
  const W = 900
  const H = 600
  const nodeW = 160
  const nodeH = 44
  const cx = W / 2

  const rootY = 80

  const nodes: NodePosition[] = []
  const connections: { fromX: number; fromY: number; toX: number; toY: number; label: string; color: string }[] = []

  const maxDepth = Math.min(branches.length, 4)
  const depths: NodePosition[][] = []

  depths[0] = [{ x: cx - nodeW / 2, y: rootY, label: rootQuestion }]
  nodes.push({ x: cx - nodeW / 2, y: rootY, label: rootQuestion })

  for (let d = 0; d < maxDepth; d++) {
    const currentNodes = depths[d]!
    const nextNodes: NodePosition[] = []

    for (let i = 0; i < currentNodes.length; i++) {
      const currentBranch = branches[d + i]
      if (!currentBranch) continue

      const parent = currentNodes[i]!
      const fromMidX = parent.x + nodeW / 2
      const fromBotY = parent.y + nodeH

      const yesX = parent.x + nodeW + 80
      const yesY = parent.y + 120
      const noX = parent.x - nodeW - 80
      const noY = parent.y + 120

      connections.push({ fromX: fromMidX, fromY: fromBotY, toX: yesX + nodeW / 2, toY: yesY, label: 'Yes', color: '#2ecc71' })
      connections.push({ fromX: parent.x + nodeW / 2, fromY: fromBotY, toX: noX + nodeW / 2, toY: noY, label: 'No', color: '#e74c3c' })

      const yesNode: NodePosition = { x: yesX, y: yesY, label: currentBranch.label, answer: 'yes' }
      const noNode: NodePosition = { x: noX, y: noY, label: currentBranch.label, answer: 'no' }

      nodes.push(yesNode, noNode)
      nextNodes.push(yesNode)

      if (currentBranch.children) {
        for (const child of currentBranch.children) {
          const childX = yesX + 120
          const childY = yesY + 100
          connections.push({
            fromX: yesX + nodeW / 2,
            fromY: yesY + nodeH,
            toX: childX + nodeW / 2,
            toY: childY,
            label: '',
            color: '#888',
          })
          nodes.push({ x: childX, y: childY, label: child.label, answer: child.answer, outcome: child.outcome })
        }
      }
    }

    depths[d + 1] = nextNodes
  }

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {connections.map((conn, i) => (
        <g key={`c-${i}`}>
          <line x1={conn.fromX} y1={conn.fromY} x2={conn.toX} y2={conn.toY} stroke={conn.color} strokeWidth={1.5} opacity={0.6} />
          {conn.label && (
            <text
              x={(conn.fromX + conn.toX) / 2 + (conn.label === 'Yes' ? 20 : -20)}
              y={(conn.fromY + conn.toY) / 2 - 6}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={11}
              fontWeight={700}
              fill={conn.color}
            >
              {conn.label}
            </text>
          )}
        </g>
      ))}

      {nodes.map((node, i) => {
        const elementId = `node-${i}`
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: node.x, y: node.y, width: nodeW, height: nodeH }
        const isRoot = i === 0
        const isLeaf = node.outcome !== undefined
        const fill = isRoot ? '#1a1a2e' : isLeaf ? '#f0f4ff' : '#f8f9fa'
        const textFill = isRoot ? 'white' : isLeaf ? '#1a56db' : '#333'
        const stroke = isSelected ? '#4a90d9' : isRoot ? '#1a1a2e' : isLeaf ? '#4a90d9' : '#ccc'
        const rx = isLeaf ? 4 : 8

        return (
          <g key={`n-${i}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={node.x} y={node.y} width={nodeW} height={nodeH} rx={rx} fill={fill} stroke={stroke} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={node.x + nodeW / 2} y={node.y + nodeH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill={textFill}>
                {node.label.length > 22 ? node.label.slice(0, 20) + '..' : node.label}
              </text>
              {node.outcome && (
                <text x={node.x + nodeW / 2} y={node.y + nodeH + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#2ecc71">
                  {node.outcome}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
