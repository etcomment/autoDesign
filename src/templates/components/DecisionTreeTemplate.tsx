import { useRef, type ReactElement } from 'react'
import type { DecisionTreeData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'

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
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { rootQuestion, branches } = data
  const W = 900
  const nodeW = 170
  const nodeH = 52
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
      const yesX = parent.defaultX + nodeW + 60
      const yesY = parent.defaultY + 120
      const noX = parent.defaultX - nodeW - 60
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
          const childX = yesX + 100
          const childY = yesY + 100
          const childId = `node-${nodeCounter++}`
          connections.push({
            fromId: yesId,
            toId: childId,
            label: child.answer ? (child.answer === 'yes' ? 'Yes' : 'No') : '',
            color: child.answer === 'yes' ? '#2ecc71' : child.answer === 'no' ? '#e74c3c' : '#888',
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
            <line x1={fromX} y1={fromY} x2={toX} y2={toY} stroke={conn.color} strokeWidth={2} opacity={0.7} />
            {conn.label && (
              <text
                x={(fromX + toX) / 2 + (conn.label === 'Yes' ? 18 : -18)}
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
        const defaultFill = isRoot ? '#1a1a2e' : isLeaf ? '#f0fdf4' : '#f8f9fa'
        const fill = tplColors[elementId] || defaultFill
        const textFill = isRoot ? 'white' : isLeaf ? '#166534' : '#1e293b'
        const defaultStroke = isRoot ? '#1a1a2e' : isLeaf ? '#22c55e' : '#cbd5e1'
        const stroke = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : defaultStroke)
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 1.5)
        const rx = isLeaf ? 6 : 8

        const maxChars = Math.max(10, Math.floor(bbox.width / 7.5))
        const labelLines = wrapTextByWidth(node.label, maxChars)
        const outcomeLines = node.outcome ? wrapTextByWidth(node.outcome, maxChars) : []
        const startY = bbox.y + (outcomeLines.length > 0 ? 16 : (bbox.height - (labelLines.length - 1) * 13) / 2 + 4)

        return (
          <g key={elementId}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={rx} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
              <text x={bbox.x + bbox.width / 2} y={startY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill={textFill}>
                {labelLines.map((line, li) => (
                  <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>
              {outcomeLines.length > 0 && (
                <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="#16a34a">
                  {outcomeLines.map((line, li) => (
                    <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
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

