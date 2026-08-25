import { useRef, type ReactElement } from 'react'
import type { DecisionTreeData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'

export function Decision2Template({ data }: { data: DecisionTreeData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { rootQuestion, branches } = data
  const H = 450
  const nodeW = 150
  const nodeH = 52
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
      const stroke = tplStrokeColors[id] || (isSelected ? '#4a90d9' : color)
      const strokeWidth = tplStrokeWidths[id] !== undefined ? tplStrokeWidths[id] : (isSelected ? 2.5 : 2)

      const maxChars = Math.max(10, Math.floor(bbox.width / 7.5))
      const labelLines = wrapTextByWidth(branch.label, maxChars)
      const outcomeLines = branch.outcome ? wrapTextByWidth(branch.outcome, maxChars) : []
      const startY = bbox.y + (outcomeLines.length > 0 ? 16 : (bbox.height - (labelLines.length - 1) * 13) / 2 + 4)

      elements.push(
        <g key={id}>
          <line x1={x} y1={y} x2={bbox.x} y2={bbox.y + bbox.height / 2} stroke={color} strokeWidth={2} opacity={0.65} />
          {branch.answer && (
            <text x={(x + bbox.x) / 2 + (branch.answer === 'yes' ? 15 : -15)} y={(y + bbox.y + bbox.height / 2) / 2 - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={color}>
              {branch.answer === 'yes' ? 'Yes' : 'No'}
            </text>
          )}
          <g data-element-id={id} onMouseDown={e => startDrag(e, id, bbox)} transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}>
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill="white" stroke={stroke} strokeWidth={strokeWidth} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
            <text x={bbox.x + bbox.width / 2} y={startY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#333">
              {labelLines.map((line, li) => (
                <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
            {outcomeLines.length > 0 && (
              <text x={bbox.x + bbox.width / 2} y={bbox.y + 16 + labelLines.length * 13 + 3} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={color}>
                {outcomeLines.map((line, li) => (
                  <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 12}>
                    {line}
                  </tspan>
                ))}
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
  const rootFill = tplColors[rootId] ?? '#1a1a2e'
  const rootStroke = tplStrokeColors[rootId] || (isRootSelected ? '#4a90d9' : '#1a1a2e')
  const rootStrokeW = tplStrokeWidths[rootId] !== undefined ? tplStrokeWidths[rootId] : (isRootSelected ? 2.5 : 1)

  const rootMaxChars = Math.max(10, Math.floor(rootBbox.width / 7.5))
  const rootLines = wrapTextByWidth(rootQuestion, rootMaxChars)
  const rootStartY = (rootBbox.height - (rootLines.length - 1) * 14) / 2 + 4 + rootBbox.y

  const result = buildNodes(branches, rootBbox.x + rootBbox.width, rootBbox.y + rootBbox.height / 2, 0)

  return (
    <g ref={svgRef}>
      {/* Root question node */}
      <g key={rootId} data-element-id={rootId} onMouseDown={e => startDrag(e, rootId, rootBbox)} transform={getTransform(rootId, rootBbox)} style={{ cursor: 'pointer' }}>
        <rect x={rootBbox.x} y={rootBbox.y} width={rootBbox.width} height={rootBbox.height} rx={10} fill={rootFill} stroke={rootStroke} strokeWidth={rootStrokeW} />
        <text x={rootBbox.x + rootBbox.width / 2} y={rootStartY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
          {rootLines.map((line, li) => (
            <tspan key={li} x={rootBbox.x + rootBbox.width / 2} dy={li === 0 ? 0 : 14}>
              {line}
            </tspan>
          ))}
        </text>
        {isRootSelected && renderHandles(rootBbox, rootId)}
      </g>

      {result.nodes}
    </g>
  )
}

