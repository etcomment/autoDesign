import { useRef, type ReactElement } from 'react'
import type { DecisionTreeData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

export function Decision2Template({ data }: { data: DecisionTreeData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { rootQuestion, branches } = data
  const W = 1000
  const H = 450
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
      const defaultColor = branch.answer === 'yes' ? '#2ecc71' : '#e74c3c'
      const color = tplColors[id] || defaultColor

      const fromMidY = y + (branchList.length > 1 ? i * stepY - ((branchList.length - 1) * stepY) / 2 : 0)
      const ny = fromMidY
      const nx = x + stepX

      const defaultBbox = { x: nx, y: ny - nodeH / 2, width: nodeW, height: nodeH }
      const customPos = positions[id]
      const bbox = {
        x: customPos?.x ?? defaultBbox.x,
        y: customPos?.y ?? defaultBbox.y,
        width: customPos?.width ?? defaultBbox.width,
        height: customPos?.height ?? defaultBbox.height,
      }

      const isSelected = selectedIds.has(id)

      elements.push(
        <g key={id}>
          <line x1={x} y1={y} x2={bbox.x} y2={bbox.y + bbox.height / 2} stroke={color} strokeWidth={2} opacity={0.6} />
          <text x={(x + bbox.x) / 2 + (color === '#2ecc71' ? 15 : -15)} y={(y + bbox.y + bbox.height / 2) / 2 - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={color}>
            {branch.answer === 'yes' ? 'Yes' : 'No'}
          </text>
          <g onMouseDown={e => startDrag(e, id, bbox)} transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}>
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 2} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#333">
              {branch.label.length > 18 ? branch.label.slice(0, 16) + '..' : branch.label}
            </text>
            {branch.outcome && (
              <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill={color}>
                {branch.outcome}
              </text>
            )}
            {isSelected && renderHandles(bbox, id)}
          </g>
        </g>
      )
      nodeIdx++

      if (branch.children && branch.children.length > 0) {
        const childResult = buildNodes(branch.children, bbox.x + bbox.width, bbox.y + bbox.height / 2, depth + 1)
        elements.push(...childResult.nodes)
      }
    })

    return { nodes: elements, height: 0 }
  }

  const rootId = 'node-root'
  const defaultRootBbox = { x: rootX, y: rootY, width: nodeW, height: nodeH }
  const customRootPos = positions[rootId]
  const rootBbox = {
    x: customRootPos?.x ?? defaultRootBbox.x,
    y: customRootPos?.y ?? defaultRootBbox.y,
    width: customRootPos?.width ?? defaultRootBbox.width,
    height: customRootPos?.height ?? defaultRootBbox.height,
  }
  const isRootSelected = selectedIds.has(rootId)

  const result = buildNodes(branches, rootBbox.x + rootBbox.width, rootBbox.y + rootBbox.height / 2, 0)

  return (
    <g ref={svgRef}>
      {/* Root question node */}
      <g key={rootId} onMouseDown={e => startDrag(e, rootId, rootBbox)} transform={getTransform(rootId, rootBbox)} style={{ cursor: 'pointer' }}>
        <rect x={rootBbox.x} y={rootBbox.y} width={rootBbox.width} height={rootBbox.height} rx={10} fill="#1a1a2e" stroke={isRootSelected ? '#4a90d9' : '#1a1a2e'} strokeWidth={isRootSelected ? 2.5 : 1} />
        <text x={rootBbox.x + rootBbox.width / 2} y={rootBbox.y + rootBbox.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
          {rootQuestion.length > 16 ? rootQuestion.slice(0, 14) + '..' : rootQuestion}
        </text>
        {isRootSelected && renderHandles(rootBbox, rootId)}
      </g>

      {result.nodes}
    </g>
  )
}

