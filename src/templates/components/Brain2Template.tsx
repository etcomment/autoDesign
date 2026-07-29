import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { CurvedPath } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#e74c3c']

export function Brain2Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, centerLabel, branches } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2 + 20
  const centerR = 48
  const branchW = 180
  const branchH = 56
  const branchGapX = 80
  const branchGapY = 30

  const visibleBranches = branches.slice(0, 6)
  const leftBranchesData = visibleBranches.slice(0, Math.ceil(visibleBranches.length / 2))
  const rightBranchesData = visibleBranches.slice(Math.ceil(visibleBranches.length / 2))

  // --- Calculate default and current BBoxes for main elements ---

  // 1. Title Element
  const titleElementId = 'title'
  // Estimate default bounding box for the title text
  const titleDefaultBbox = { x: W / 2 - 150, y: 20, width: 300, height: 40 } // Adjusted estimation for a typical title width
  const titleCustomPos = templateElementPositions[titleElementId]
  const titleBbox = {
    x: titleCustomPos?.x ?? titleDefaultBbox.x,
    y: titleCustomPos?.y ?? titleDefaultBbox.y,
    width: titleCustomPos?.width ?? titleDefaultBbox.width,
    height: titleCustomPos?.height ?? titleDefaultBbox.height
  }
  const isTitleSelected = selectedIds.has(titleElementId)
  const titleScaleX = titleBbox.width / titleDefaultBbox.width
  const titleScaleY = titleBbox.height / titleDefaultBbox.height

  // 2. Center Node Element (Circle + Text)
  const centerNodeElementId = 'center-node'
  const centerNodeDefaultBbox = { x: cx - centerR, y: cy - centerR, width: centerR * 2, height: centerR * 2 }
  const centerNodeCustomPos = templateElementPositions[centerNodeElementId]
  const centerNodeBbox = {
    x: centerNodeCustomPos?.x ?? centerNodeDefaultBbox.x,
    y: centerNodeCustomPos?.y ?? centerNodeDefaultBbox.y,
    width: centerNodeCustomPos?.width ?? centerNodeDefaultBbox.width,
    height: centerNodeCustomPos?.height ?? centerNodeDefaultBbox.height
  }
  const isCenterNodeSelected = selectedIds.has(centerNodeElementId)
  const centerNodeScaleX = centerNodeBbox.width / centerNodeDefaultBbox.width
  const centerNodeScaleY = centerNodeBbox.height / centerNodeDefaultBbox.height

  // 3. Branches
  interface BranchRenderData {
    elementId: string;
    branch: (typeof visibleBranches)[0];
    color: string;
    isLeft: boolean;
    i: number;
    defaultBbox: { x: number; y: number; width: number; height: number; };
    bbox: { x: number; y: number; width: number; height: number; };
    isSelected: boolean;
    scaleX: number;
    scaleY: number;
  }

  const allBranchesRenderData: BranchRenderData[] = []

  const calculateBranchRenderData = (branch: (typeof visibleBranches)[0], i: number, isLeft: boolean) => {
    const elementId = `branch-${isLeft ? 'l' : 'r'}-${i}`
    const color = tplColors[elementId] ?? branch.color ?? PALETTE[i % PALETTE.length]!

    // Calculate original static position for this branch
    const bx = isLeft
      ? cx - centerR - branchGapX - branchW
      : cx + centerR + branchGapX
    const by = cy - ((isLeft ? leftBranchesData : rightBranchesData).length * (branchH + branchGapY)) / 2 + i * (branchH + branchGapY)
    
    const defaultBbox = { x: bx, y: by, width: branchW, height: branchH }
    const customPos = templateElementPositions[elementId]
    const bbox = {
      x: customPos?.x ?? defaultBbox.x,
      y: customPos?.y ?? defaultBbox.y,
      width: customPos?.width ?? defaultBbox.width,
      height: customPos?.height ?? defaultBbox.height
    }
    const isSelected = selectedIds.has(elementId)
    const scaleX = bbox.width / defaultBbox.width
    const scaleY = bbox.height / defaultBbox.height

    allBranchesRenderData.push({
      elementId,
      branch,
      color,
      isLeft,
      i,
      defaultBbox,
      bbox,
      isSelected,
      scaleX,
      scaleY
    })
  }

  leftBranchesData.forEach((b, i) => calculateBranchRenderData(b, i, true))
  rightBranchesData.forEach((b, i) => calculateBranchRenderData(b, i, false))


  return (
    <g ref={svgRef}>
      {/* Title Element */}
      {title && (
        <g onMouseDown={e => startDrag(e, titleElementId, titleBbox)} style={{ cursor: 'pointer' }}>
          <g transform={`translate(${titleBbox.x}, ${titleBbox.y}) scale(${titleScaleX}, ${titleScaleY}) translate(${-titleDefaultBbox.x}, ${-titleDefaultBbox.y})`}>
            {/* Original static SVG elements go here EXACTLY as they were */}
            <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
              {title}
            </text>
          </g>
          {isTitleSelected && renderHandles(titleBbox, titleElementId)}
        </g>
      )}

      {/* Center Node Element */}
      <g onMouseDown={e => startDrag(e, centerNodeElementId, centerNodeBbox)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${centerNodeBbox.x}, ${centerNodeBbox.y}) scale(${centerNodeScaleX}, ${centerNodeScaleY}) translate(${-centerNodeDefaultBbox.x}, ${-centerNodeDefaultBbox.y})`}>
          {/* Original static SVG elements go here EXACTLY as they were */}
          <circle cx={cx} cy={cy} r={centerR} fill="#1a1a2e" />
          <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
            {centerLabel.length > 12 ? centerLabel.slice(0, 10) + '..' : centerLabel}
          </text>
        </g>
        {isCenterNodeSelected && renderHandles(centerNodeBbox, centerNodeElementId)}
      </g>

      {/* Paths (Connectors between Center Node and Branches) */}
      {allBranchesRenderData.map((data) => {
        // Calculate dynamic connection points based on current bounding boxes
        const fromX = data.isLeft
          ? centerNodeBbox.x + centerNodeBbox.width // Right edge of center node for left branches
          : centerNodeBbox.x; // Left edge of center node for right branches
        const fromY = centerNodeBbox.y + centerNodeBbox.height / 2;

        const toX = data.isLeft
          ? data.bbox.x + data.bbox.width // Right edge of branch for left branches
          : data.bbox.x; // Left edge of branch for right branches
        const toY = data.bbox.y + data.bbox.height / 2;

        return (
          <CurvedPath key={`path-${data.elementId}`} points={[{ x: fromX, y: fromY }, { x: toX, y: toY }]} color={data.color} strokeWidth={2} />
        );
      })}

      {/* Branch Elements */}
      {allBranchesRenderData.map((data) => (
        <g key={`branch-interactive-${data.elementId}`} onMouseDown={e => startDrag(e, data.elementId, data.bbox)} style={{ cursor: 'pointer' }}>
          <g transform={`translate(${data.bbox.x}, ${data.bbox.y}) scale(${data.scaleX}, ${data.scaleY}) translate(${-data.defaultBbox.x}, ${-data.defaultBbox.y})`}>
            {/* Original static SVG elements go here EXACTLY as they were */}
            <rect x={data.defaultBbox.x} y={data.defaultBbox.y} width={branchW} height={branchH} rx={10} fill={data.color} opacity={data.isSelected ? 0.25 : 0.12} stroke={data.isSelected ? '#4a90d9' : data.color} strokeWidth={data.isSelected ? 2.5 : 2} strokeDasharray={data.isSelected ? '4 2' : undefined} />
            <text x={data.defaultBbox.x + branchW / 2} y={data.defaultBbox.y + branchH / 2 - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={data.color}>
              {data.branch.title.length > 22 ? data.branch.title.slice(0, 20) + '..' : data.branch.title}
            </text>
            {data.branch.subtitle && (
              <text x={data.defaultBbox.x + branchW / 2} y={data.defaultBbox.y + branchH / 2 + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#777">
                {data.branch.subtitle.length > 24 ? data.branch.subtitle.slice(0, 22) + '..' : data.branch.subtitle}
              </text>
            )}
          </g>
          {data.isSelected && renderHandles(data.bbox, data.elementId)}
        </g>
      ))}
    </g>
  )
}