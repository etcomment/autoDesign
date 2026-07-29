import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { CurvedPath, wrapTextByWidth } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store' // templateElementPositions and selectedIds imported from here
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#e74c3c']

export function BrainTemplate({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds) // Access selectedIds
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions) // Access templateElementPositions

  const { title, centerLabel, branches } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2
  const centerR = 55
  const branchW2 = 200
  const branchH2 = 66

  const branchPositions: { angle: number; bx: number; by: number }[] = [
    { angle: -90, bx: cx - branchW2 / 2, by: 130 },
    { angle: 90, bx: cx - branchW2 / 2, by: H - 130 - branchH2 },
    { angle: 0, bx: cx + centerR + 50, by: cy - branchH2 / 2 },
    { angle: 180, bx: cx - centerR - 50 - branchW2, by: cy - branchH2 / 2 },
  ]

  const usedBranches = branches.slice(0, 4)

  // Refactor: Title Element
  const titleId = 'title'
  // Estimated default bbox for the title text element based on original coordinates
  // x: W/2 for center, width=300, so (W/2 - 150). y: 42 is text baseline, fontSize 22, so 42-22 = 20 for top edge.
  const defaultTitleBbox = { x: W / 2 - 150, y: 20, width: 300, height: 30 }
  const customTitlePos = templateElementPositions[titleId]
  const isTitleSelected = selectedIds.has(titleId)

  const titleBbox = {
    x: customTitlePos?.x ?? defaultTitleBbox.x,
    y: customTitlePos?.y ?? defaultTitleBbox.y,
    width: customTitlePos?.width ?? defaultTitleBbox.width,
    height: customTitlePos?.height ?? defaultTitleBbox.height
  }
  const scaleTitleX = titleBbox.width / defaultTitleBbox.width
  const scaleTitleY = titleBbox.height / defaultTitleBbox.height

  // Refactor: Center Circle Element
  const centerCircleId = 'center-circle'
  // Default bbox for the circle: centered at cx, cy with radius centerR
  const defaultCenterCircleBbox = { x: cx - centerR, y: cy - centerR, width: 2 * centerR, height: 2 * centerR }
  const customCenterCirclePos = templateElementPositions[centerCircleId]
  const isCenterCircleSelected = selectedIds.has(centerCircleId)

  const centerCircleBbox = {
    x: customCenterCirclePos?.x ?? defaultCenterCircleBbox.x,
    y: customCenterCirclePos?.y ?? defaultCenterCircleBbox.y,
    width: customCenterCirclePos?.width ?? defaultCenterCircleBbox.width,
    height: customCenterCirclePos?.height ?? defaultCenterCircleBbox.height
  }
  const scaleCenterCircleX = centerCircleBbox.width / defaultCenterCircleBbox.width
  const scaleCenterCircleY = centerCircleBbox.height / defaultCenterCircleBbox.height

  // Refactor: Center Label Element
  const centerLabelId = 'center-label'
  // Default bbox for the center label text: centered at cx, y slightly above cy
  // Estimated for text at cx, cy-6: x: cx-100, y: (cy-6 - fontSize 13) approx. cy-19 for top edge. Let's use cy-20 for a clean bbox top.
  const defaultCenterLabelBbox = { x: cx - 100, y: cy - 20, width: 200, height: 30 }
  const customCenterLabelPos = templateElementPositions[centerLabelId]
  const isCenterLabelSelected = selectedIds.has(centerLabelId)

  const centerLabelBbox = {
    x: customCenterLabelPos?.x ?? defaultCenterLabelBbox.x,
    y: customCenterLabelPos?.y ?? defaultCenterLabelBbox.y,
    width: customCenterLabelPos?.width ?? defaultCenterLabelBbox.width,
    height: customCenterLabelPos?.height ?? defaultCenterLabelBbox.height
  }
  const scaleCenterLabelX = centerLabelBbox.width / defaultCenterLabelBbox.width
  const scaleCenterLabelY = centerLabelBbox.height / defaultCenterLabelBbox.height


  return (
    <g ref={svgRef}>
      {/* Interactive Title Element */}
      {title && (
        <g onMouseDown={e => startDrag(e, titleId, titleBbox)} style={{ cursor: 'pointer' }}>
          <g transform={`translate(${titleBbox.x}, ${titleBbox.y}) scale(${scaleTitleX}, ${scaleTitleY}) translate(${-defaultTitleBbox.x}, ${-defaultTitleBbox.y})`}>
            {/* Original static SVG elements go here EXACTLY as they were */}
            <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
              {title}
            </text>
          </g>
          {isTitleSelected && renderHandles(titleBbox, titleId)}
        </g>
      )}

      {/* Interactive Center Circle Element */}
      <g onMouseDown={e => startDrag(e, centerCircleId, centerCircleBbox)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${centerCircleBbox.x}, ${centerCircleBbox.y}) scale(${scaleCenterCircleX}, ${scaleCenterCircleY}) translate(${-defaultCenterCircleBbox.x}, ${-defaultCenterCircleBbox.y})`}>
          {/* Original static SVG elements go here EXACTLY as they were */}
          <circle cx={cx} cy={cy} r={centerR} fill="#1a1a2e" />
        </g>
        {isCenterCircleSelected && renderHandles(centerCircleBbox, centerCircleId)}
      </g>

      {/* Interactive Center Label Element */}
      <g onMouseDown={e => startDrag(e, centerLabelId, centerLabelBbox)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${centerLabelBbox.x}, ${centerLabelBbox.y}) scale(${scaleCenterLabelX}, ${scaleCenterLabelY}) translate(${-defaultCenterLabelBbox.x}, ${-defaultCenterLabelBbox.y})`}>
          {/* Original static SVG elements go here EXACTLY as they were */}
          <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
            {centerLabel.length > 14 ? centerLabel.slice(0, 12) + '...' : centerLabel}
          </text>
        </g>
        {isCenterLabelSelected && renderHandles(centerLabelBbox, centerLabelId)}
      </g>

      {usedBranches.map((branch, i) => {
        const elementId = `branch-${i}`
        const pos = branchPositions[i % branchPositions.length]! // Original static position for the branch card

        // Default logical bounding box for the branch card (original size and position)
        const defaultBranchBbox = { x: pos.bx, y: pos.by, width: branchW2, height: branchH2 }
        
        const customBranchPos = templateElementPositions[elementId]
        const isBranchSelected = selectedIds.has(elementId)

        // Current interactive bounding box, using custom position if available, otherwise default
        const branchBbox = { 
          x: customBranchPos?.x ?? defaultBranchBbox.x, 
          y: customBranchPos?.y ?? defaultBranchBbox.y, 
          width: customBranchPos?.width ?? defaultBranchBbox.width, 
          height: customBranchPos?.height ?? defaultBranchBbox.height 
        }
        
        // Scale factors for the content inside the transformed group
        const scaleBranchX = branchBbox.width / defaultBranchBbox.width
        const scaleBranchY = branchBbox.height / defaultBranchBbox.height

        // Midpoints calculated from the *current* interactive branchBbox for the CurvedPath
        const branchMidX = branchBbox.x + branchBbox.width / 2
        const branchMidY = branchBbox.y + branchBbox.height / 2
        
        // Edge points remain connected to the (untransformed) center circle, assuming center circle itself might be moved but not scaled by this branch's transform
        const edgeX = cx + centerR * Math.cos(pos.angle * Math.PI / 180)
        const edgeY = cy + centerR * Math.sin(pos.angle * Math.PI / 180)

        const color = tplColors[elementId] ?? branch.color ?? PALETTE[i % PALETTE.length]!

        return (
          <g key={i}>
            {/* CurvedPath connects to the current position of the branch card. It is not an individually draggable element here. */}
            <CurvedPath points={[{ x: edgeX, y: edgeY }, { x: branchMidX, y: branchMidY }]} color={color} strokeWidth={2.5} />

            {/* Interactive Group for the Branch Card (rect and text elements) */}
            <g onMouseDown={e => startDrag(e, elementId, branchBbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${branchBbox.x}, ${branchBbox.y}) scale(${scaleBranchX}, ${scaleBranchY}) translate(${-defaultBranchBbox.x}, ${-defaultBranchBbox.y})`}>
                {/* Original static SVG elements of the branch card go here EXACTLY as they were */}
                {/* x, y, width, height for rect and x, y for text are using their original, untransformed coordinates */}
                <rect x={pos.bx} y={pos.by} width={branchW2} height={branchH2} rx={10} fill={color} opacity={isBranchSelected ? 0.25 : 0.15} stroke={isBranchSelected ? '#4a90d9' : color} strokeWidth={isBranchSelected ? 2.5 : 2} strokeDasharray={isBranchSelected ? '4 2' : undefined} />
                <text x={pos.bx + branchW2 / 2} y={pos.by + branchH2 / 2 - 7} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={color}>
                  {branch.title}
                </text>
                {branch.subtitle && (
                  <text x={pos.bx + branchW2 / 2} y={pos.by + branchH2 / 2 + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#555">
                    {/* wrapTextByWidth should use the original width for text flow calculation, as font size scales implicitly with the group's scale */}
                    {wrapTextByWidth(branch.subtitle, Math.max(15, Math.floor(branchW2 / 6.5))).join(' ')}
                  </text>
                )}
              </g>
              {isBranchSelected && renderHandles(branchBbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}