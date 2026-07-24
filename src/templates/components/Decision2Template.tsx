import { useRef, type ReactElement } from 'react'
import type { DecisionTreeData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

export function Decision2Template({ data }: { data: DecisionTreeData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const { title, rootQuestion, branches } = data
  const W = 1000
  const H = 500
  const nodeW = 140
  const nodeH = 44
  const rootX = 60
  const rootY = H / 2 - nodeH / 2

  let nodeIdx = 0

  const buildNodes = (branchList: typeof branches, x: number, y: number, depth: number): { nodes: ReactElement[]; height: number } => {
    const stepX = 200
    const stepY = 100
    const elements: ReactElement[] = []

    branchList.forEach((branch, i) => {
      const id = `node-${nodeIdx}`
      const color = branch.answer === 'yes' ? '#2ecc71' : '#e74c3c'
      const fromMidY = y + (branchList.length > 1 ? i * stepY - (branchList.length - 1) * stepY / 2 : 0)
      const ny = fromMidY
      const nx = x + stepX
      const isSelected = selectedIds.has(id)
      const visualRect = { x: nx, y: ny - nodeH / 2, width: nodeW, height: nodeH }

      elements.push(
        <g key={id}>
          <line x1={x} y1={y} x2={nx} y2={ny} stroke={color} strokeWidth={2} opacity={0.6} />
          <text x={(x + nx) / 2 + (color === '#2ecc71' ? 15 : -15)} y={(y + ny) / 2 - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={color}>
            {branch.answer === 'yes' ? 'Yes' : 'No'}
          </text>
          <g onMouseDown={e => startDrag(e, id, visualRect)} style={{ cursor: 'pointer' }}>
            <rect x={nx} y={ny - nodeH / 2} width={nodeW} height={nodeH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 2} strokeDasharray={isSelected ? '4 2' : undefined} />
            <text x={nx + nodeW / 2} y={ny + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#333">
              {branch.label.length > 18 ? branch.label.slice(0, 16) + '..' : branch.label}
            </text>
            {branch.outcome && (
              <text x={nx + nodeW / 2} y={ny + nodeH / 2 + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill={color}>
                {branch.outcome}
              </text>
            )}
            {isSelected && renderHandles(visualRect, id)}
          </g>
        </g>
      )
      nodeIdx++

      if (branch.children && branch.children.length > 0) {
        const childResult = buildNodes(branch.children, nx + nodeW, ny, depth + 1)
        elements.push(...childResult.nodes)
      }
    })

    return { nodes: elements, height: 0 }
  }

  const result = buildNodes(branches, rootX + nodeW, rootY + nodeH / 2, 0)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <rect x={rootX} y={rootY} width={nodeW} height={nodeH} rx={10} fill="#1a1a2e" />
      <text x={rootX + nodeW / 2} y={rootY + nodeH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
        {rootQuestion.length > 16 ? rootQuestion.slice(0, 14) + '..' : rootQuestion}
      </text>

      {result.nodes}
    </g>
  )
}
