import { useRef, type ReactElement } from 'react'
import type { DecisionTreeData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

interface NodePosition {
  id: string
  defaultX: number
  defaultY: number
  label: string
  answer?: 'yes' | 'no'
  outcome?: string
}

export function DecisionTreeTemplate({ data }: { data: DecisionTreeData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { rootQuestion, branches } = data
  const W = 900
  const nodeW = 160
  const nodeH = 44
  const cx = W / 2
  const rootY = 40

  const nodes: NodePosition[] = []
  const connections: { fromId: string; toId: string; label: string; color: string }[] = []

  const maxDepth = Math.min(branches.length, 4)
  const depths: NodePosition[][] = []

  depths[0] = [{ id: 'node-0', defaultX: cx - nodeW / 2, defaultY: rootY, label: rootQuestion }]
  nodes.push({ id: 'node-0', defaultX: cx - nodeW / 2, defaultY: rootY, label: rootQuestion })

  let nodeCounter = 1

  for (let d = 0; d < maxDepth; d++) {
    const currentNodes = depths[d]!
    const nextNodes: NodePosition[] = []

    for (let i = 0; i < currentNodes.length; i++) {
      const currentBranch = branches[d + i]
      if (!currentBranch) continue

      const parent = currentNodes[i]!
      const yesX = parent.defaultX + nodeW + 80
      const yesY = parent.defaultY + 120
      const noX = parent.defaultX - nodeW - 80
      const noY = parent.defaultY + 120

      const yesId = `node-${nodeCounter++}`
      const noId = `node-${nodeCounter++}`

      connections.push({ fromId: parent.id, toId: yesId, label: 'Yes', color: '#2ecc71' })
      connections.push({ fromId: parent.id, toId: noId, label: 'No', color: '#e74c3c' })

      const yesNode: NodePosition = { id: yesId, defaultX: yesX, defaultY: yesY, label: currentBranch.label, answer: 'yes' }
      const noNode: NodePosition = { id: noId, defaultX: noX, defaultY: noY, label: currentBranch.label, answer: 'no' }

      nodes.push(yesNode, noNode)
      nextNodes.push(yesNode)

      if (currentBranch.children) {
        for (const child of currentBranch.children) {
          const childX = yesX + 120
          const childY = yesY + 100
          const childId = `node-${nodeCounter++}`
          connections.push({
            fromId: yesId,
            toId: childId,
            label: '',
            color: '#888',
          })
          nodes.push({ id: childId, defaultX: childX, defaultY: childY, label: child.label, answer: child.answer, outcome: child.outcome })
        }
      }
    }

    depths[d + 1] = nextNodes
  }

  // Helper function to resolve stored node bounding box or default
  const getNodeBbox = (node: NodePosition) => {
    const customPos = positions[node.id]
    return {
      x: customPos?.x ?? node.defaultX,
      y: customPos?.y ?? node.defaultY,
      width: customPos?.width ?? nodeW,
      height: customPos?.height ?? nodeH,
    }
  }

  return (
    <g ref={svgRef}>
      {/* Dynamic connections connecting node positions in store */}
      {connections.map((conn, i) => {
        const fromNode = nodes.find(n => n.id === conn.fromId)
        const toNode = nodes.find(n => n.id === conn.toId)
        if (!fromNode || !toNode) return null

        const fromBbox = getNodeBbox(fromNode)
        const toBbox = getNodeBbox(toNode)

        const fromX = fromBbox.x + fromBbox.width / 2
        const fromY = fromBbox.y + fromBbox.height
        const toX = toBbox.x + toBbox.width / 2
        const toY = toBbox.y

        return (
          <g key={`c-${i}`}>
            <line x1={fromX} y1={fromY} x2={toX} y2={toY} stroke={conn.color} strokeWidth={1.5} opacity={0.6} />
            {conn.label && (
              <text
                x={(fromX + toX) / 2 + (conn.label === 'Yes' ? 20 : -20)}
                y={(fromY + toY) / 2 - 6}
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
        )
      })}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const elementId = node.id
        const isSelected = selectedIds.has(elementId)
        const bbox = getNodeBbox(node)
        const isRoot = i === 0
        const isLeaf = node.outcome !== undefined
        const fill = isRoot ? '#1a1a2e' : isLeaf ? '#f0f4ff' : '#f8f9fa'
        const textFill = isRoot ? 'white' : isLeaf ? '#1a56db' : '#333'
        const stroke = isSelected ? '#4a90d9' : (tplColors[elementId] || (isRoot ? '#1a1a2e' : isLeaf ? '#4a90d9' : '#ccc'))
        const rx = isLeaf ? 4 : 8

        return (
          <g key={elementId}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={rx} fill={fill} stroke={stroke} strokeWidth={isSelected ? 2.5 : 1.5} />
              <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill={textFill}>
                {node.label.length > 22 ? node.label.slice(0, 20) + '..' : node.label}
              </text>
              {node.outcome && (
                <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#2ecc71">
                  {node.outcome}
                </text>
              )}
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}

