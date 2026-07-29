import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Brain3Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const getElementInfo = (elementId: string, initialBbox: { x: number; y: number; width: number; height: number }) => {
    const customPos = templateElementPositions[elementId]
    const bbox = {
      x: customPos?.x ?? initialBbox.x,
      y: customPos?.y ?? initialBbox.y,
      width: customPos?.width ?? initialBbox.width,
      height: customPos?.height ?? initialBbox.height,
    }
    return { cx: bbox.x + bbox.width / 2, cy: bbox.y + bbox.height / 2, bbox }
  }

  const { title, centerLabel, branches } = data
  const W = 900
  const H = 600
  const cx_initial = W / 2
  const cy_initial = H / 2 + 20
  const centerR = 44
  const orbitR = 200
  const nodeW = 130
  const nodeH = 46
  const count = Math.min(branches.length, 8)

  // --- Calculations for Center Node ---
  const elementId_center = 'center-node'
  const defaultBbox_center = { x: cx_initial - centerR, y: cy_initial - centerR, width: 2 * centerR, height: 2 * centerR }

  const { cx: current_center_cx, cy: current_center_cy, bbox: bbox_center } = getElementInfo(elementId_center, defaultBbox_center)
  const isSelected_center = selectedIds.has(elementId_center)

  const scaleX_center = bbox_center.width / defaultBbox_center.width
  const scaleY_center = bbox_center.height / defaultBbox_center.height
  // Effective radius for connection lines based on the scaled width of the bbox.
  // This assumes the circle is scaled uniformly to fit within the new bbox's width for connection points.
  const current_center_effective_r = bbox_center.width / 2;


  // --- Pre-calculate Branch Node positions and properties for consistent access ---
  const branchNodes = branches.slice(0, count).map((branch, i) => {
    const elementId = `branch-${i}`
    const color = tplColors[elementId] ?? branch.color ?? PALETTE[i % PALETTE.length]!

    // Calculate initial position for defaultBbox based on original static layout
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2
    const initial_nx = cx_initial + orbitR * Math.cos(angle)
    const initial_ny = cy_initial + orbitR * Math.sin(angle)
    const initial_boxX = initial_nx - nodeW / 2
    const initial_boxY = initial_ny - nodeH / 2
    const defaultBbox = { x: initial_boxX, y: initial_boxY, width: nodeW, height: nodeH }

    // Get current position and center from store or default
    const { cx: current_nx, cy: current_ny, bbox } = getElementInfo(elementId, defaultBbox)
    const isSelected = selectedIds.has(elementId)

    const scaleX = bbox.width / defaultBbox.width
    const scaleY = bbox.height / defaultBbox.height

    return {
      elementId,
      color,
      isSelected,
      defaultBbox,
      bbox,
      scaleX,
      scaleY,
      current_nx, // Current center X of this branch node
      current_ny, // Current center Y of this branch node
      initial_boxX, // Original X for inner rect/text positioning relative to defaultBbox origin
      initial_boxY, // Original Y for inner rect/text positioning relative to defaultBbox origin
      initial_nx,   // Original X for inner text positioning relative to defaultBbox origin
      initial_ny,   // Original Y for inner text positioning relative to defaultBbox origin
      branchTitle: branch.title, // Pass title for text content
    }
  })

  return (
    <g ref={svgRef}>
      {/* Title element */}
      {title && (
        (() => {
          const elementId = 'title'
          // Estimate logical bounding box for the title's initial position
          // Assuming a default width of 300 centered at W/2, and height of 40 centered at y=42 (adjusting for font size 22)
          const defaultBbox = { x: W / 2 - 150, y: 20, width: 300, height: 40 }
          
          const { bbox } = getElementInfo(elementId, defaultBbox)
          const isSelected = selectedIds.has(elementId)

          const scaleX = bbox.width / defaultBbox.width
          const scaleY = bbox.height / defaultBbox.height

          return (
            <g onMouseDown={e => startDrag(e, elementId, bbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`}>
                <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
                  {title}
                </text>
              </g>
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          )
        })()
      )}

      {/* Center Node (Circle + Text) element */}
      <g onMouseDown={e => startDrag(e, elementId_center, bbox_center)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${bbox_center.x}, ${bbox_center.y}) scale(${scaleX_center}, ${scaleY_center}) translate(${-defaultBbox_center.x}, ${-defaultBbox_center.y})`}>
          <circle cx={cx_initial} cy={cy_initial} r={centerR} fill="#1a1a2e" />
          <text x={cx_initial} y={cy_initial + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
            {centerLabel.length > 10 ? centerLabel.slice(0, 8) + '..' : centerLabel}
          </text>
        </g>
        {isSelected_center && renderHandles(bbox_center, elementId_center)}
      </g>

      {/* Branch Nodes and their dynamic connections to the Center Node */}
      {branchNodes.map((node, i) => {
        // Calculate connection line endpoints based on current positions of center and branch nodes
        const dx = node.current_nx - current_center_cx
        const dy = node.current_ny - current_center_cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Point on the edge of the scaled center circle, connecting to the current branch node center
        const edgeX = current_center_cx + (dx / dist) * current_center_effective_r
        const edgeY = current_center_cy + (dy / dist) * current_center_effective_r

        return (
          <g key={i}>
            {/* Connection line from center node to branch node */}
            <line x1={edgeX} y1={edgeY} x2={node.current_nx} y2={node.current_ny} stroke={node.color} strokeWidth={1.5} opacity={0.5} />
            
            {/* Interactive group for the branch node itself (rect + text) */}
            <g onMouseDown={e => startDrag(e, node.elementId, node.bbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${node.bbox.x}, ${node.bbox.y}) scale(${node.scaleX}, ${node.scaleY}) translate(${-node.defaultBbox.x}, ${-node.defaultBbox.y})`}>
                <rect x={node.initial_boxX} y={node.initial_boxY} width={nodeW} height={nodeH} rx={8} fill="white" stroke={node.isSelected ? '#4a90d9' : node.color} strokeWidth={node.isSelected ? 2.5 : 1.5} strokeDasharray={node.isSelected ? '4 2' : undefined} />
                <text x={node.initial_nx} y={node.initial_ny + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#333">
                  {node.branchTitle.length > 16 ? node.branchTitle.slice(0, 14) + '..' : node.branchTitle}
                </text>
              </g>
              {node.isSelected && renderHandles(node.bbox, node.elementId)}
            </g>
          </g>
        )
      })}

      {/* Web Lines between Branch Nodes (dynamic connections) */}
      {branchNodes.flatMap((node1, i) =>
        branchNodes.slice(i + 1).map((node2, j) => {
          // Connect current centers of branch nodes
          return <line key={`web-${i}-${i + 1 + j}`} x1={node1.current_nx} y1={node1.current_ny} x2={node2.current_nx} y2={node2.current_ny} stroke="#d0d0d0" strokeWidth={0.8} strokeDasharray="3 4" opacity={0.4} />
        })
      )}
    </g>
  )
}