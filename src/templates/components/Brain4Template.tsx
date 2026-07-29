import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12']

export function Brain4Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const W = 900
  const cx = W / 2
  const rootY = 90
  const trunkH = 60
  const nodeW = 150
  const nodeH = 44
  const levelGap = 90
  const levelsConfig = [1, 2, 3] // This array represents the number of nodes per level

  // Step 1: Prepare all default element data
  const allElementsDefaults: {
    id: string,
    defaultBbox: { x: number, y: number, width: number, height: number },
    type: 'node' | 'line' | 'title',
    // Specific data for nodes
    branch?: typeof data.branches[number],
    color?: string,
    level?: number,
    // Specific data for lines
    x1?: number, y1?: number, x2?: number, y2?: number, // for initial line points
    lineStrokeColor?: string,
    parentId?: string | null,
    childId?: string
  }[] = []

  // --- TITLE ---
  const titleElementId = 'title'
  const defaultTitleBbox = { x: W / 2 - 150, y: 20, width: 300, height: 40 } // Estimated bbox for the title text
  allElementsDefaults.push({ id: titleElementId, defaultBbox: defaultTitleBbox, type: 'title' })

  // --- CENTER NODE ---
  const centerNodeId = 'center-node'
  const defaultCenterNodeBbox = { x: cx - 30, y: rootY - 30, width: 60, height: 60 } // Bbox for the central circle
  allElementsDefaults.push({ id: centerNodeId, defaultBbox: defaultCenterNodeBbox, type: 'node', branch: { title: data.centerLabel, color: '#1a1a2e' }, color: '#1a1a2e', level: -1 })

  // --- BRANCH NODES & THEIR CONNECTING LINES (DATA) ---
  let nodeIdx = 0
  const nodesInLevels: string[][] = [] // Stores node IDs per level for parent lookup

  levelsConfig.forEach((count, li) => {
    const levelY = rootY + trunkH + (li + 1) * levelGap
    const totalRowW = count * nodeW + (count - 1) * 30
    const rowStartX = cx - totalRowW / 2
    const currentLevelNodes: string[] = []

    Array.from({ length: count }).forEach((_, ci) => {
      const branch = data.branches[nodeIdx % data.branches.length]!
      const elementId = `node-${nodeIdx}`
      const x = rowStartX + ci * (nodeW + 30)
      const y = levelY - nodeH / 2
      const defaultNodeBbox = { x, y, width: nodeW, height: nodeH }
      const color = tplColors[elementId] ?? branch.color ?? PALETTE[li % PALETTE.length]!

      let parentId: string | null = null
      if (li === 0) {
        parentId = centerNodeId // First level nodes connect to the center node
      } else {
        // Parent node is at index floor(ci/2) in the previous level
        const parentNodeIdxInPreviousLevel = Math.floor(ci / 2);
        parentId = nodesInLevels[li - 1]?.[parentNodeIdxInPreviousLevel] || null;
      }

      allElementsDefaults.push({
        id: elementId,
        defaultBbox: defaultNodeBbox,
        type: 'node',
        branch: branch,
        color: color,
        level: li,
        parentId: parentId
      })
      currentLevelNodes.push(elementId)

      // Add line data connecting this node to its parent (endpoints resolved dynamically during render)
      if (parentId) {
        const lineId = `line-${parentId}-${elementId}`
        // For the defaultBbox of the line itself, we use the initial connection points
        const parentDefaultBbox = allElementsDefaults.find(d => d.id === parentId)?.defaultBbox || defaultCenterNodeBbox;
        const initialLineX1 = parentDefaultBbox.x + parentDefaultBbox.width / 2;
        const initialLineY1 = parentDefaultBbox.y + parentDefaultBbox.height; // Connect from bottom of parent
        const initialLineX2 = defaultNodeBbox.x + defaultNodeBbox.width / 2;
        const initialLineY2 = defaultNodeBbox.y; // Connect to top of child

        const defaultLineBbox = {
          x: Math.min(initialLineX1, initialLineX2),
          y: Math.min(initialLineY1, initialLineY2),
          width: Math.abs(initialLineX2 - initialLineX1) || 1, // Ensure minimum width/height for bbox
          height: Math.abs(initialLineY2 - initialLineY1) || 1
        }

        allElementsDefaults.push({
          id: lineId,
          defaultBbox: defaultLineBbox,
          type: 'line',
          parentId: parentId,
          childId: elementId,
          lineStrokeColor: color, // Line takes child's color
          x1: initialLineX1, y1: initialLineY1, x2: initialLineX2, y2: initialLineY2 // Store initial points
        })
      }
      nodeIdx++
    })
    nodesInLevels.push(currentLevelNodes)
  })

  // --- TRUNK LINE (from center node to the first branch node) ---
  const trunkLineId = 'trunk-line'
  // Find the first node of level 0 to determine the trunk line's endpoint
  const firstNodeOfLevel0 = allElementsDefaults.find(el => el.type === 'node' && el.level === 0);
  const firstNodeDefaultBbox = firstNodeOfLevel0?.defaultBbox;

  const initialTrunkLineX1 = defaultCenterNodeBbox.x + defaultCenterNodeBbox.width / 2;
  const initialTrunkLineY1 = defaultCenterNodeBbox.y + defaultCenterNodeBbox.height; // From bottom of center node
  const initialTrunkLineX2 = firstNodeDefaultBbox ? firstNodeDefaultBbox.x + firstNodeDefaultBbox.width / 2 : cx; // To center of first child node or trunkH
  const initialTrunkLineY2 = firstNodeDefaultBbox ? firstNodeDefaultBbox.y : (rootY + trunkH); // To top of first child node or trunkH

  const defaultTrunkLineBbox = {
    x: Math.min(initialTrunkLineX1, initialTrunkLineX2),
    y: Math.min(initialTrunkLineY1, initialTrunkLineY2),
    width: Math.abs(initialTrunkLineX2 - initialTrunkLineX1) || 4, // Trunk original strokeWidth was 4
    height: Math.abs(initialTrunkLineY2 - initialTrunkLineY1) || 1
  }
  allElementsDefaults.push({
    id: trunkLineId,
    defaultBbox: defaultTrunkLineBbox,
    type: 'line',
    x1: initialTrunkLineX1, y1: initialTrunkLineY1, x2: initialTrunkLineX2, y2: initialTrunkLineY2,
    lineStrokeColor: '#8B4513',
    parentId: centerNodeId,
    childId: firstNodeOfLevel0?.id // Connects center node to the first node of level 0
  })


  // This map will store the *rendered* (transformed) bounding boxes of all elements.
  // This is crucial for lines to connect to the *actual* positions of nodes.
  const renderedElementBboxes: Record<string, typeof defaultTitleBbox> = {}

  // Filter elements by type for controlled rendering order
  const titleElements = allElementsDefaults.filter(el => el.type === 'title')
  const nodeElements = allElementsDefaults.filter(el => el.type === 'node')
  const lineElements = allElementsDefaults.filter(el => el.type === 'line')

  return (
    <g ref={svgRef}>
      {/* Render Title */}
      {titleElements.map(element => {
        const customPos = templateElementPositions[element.id]
        const isSelected = selectedIds.has(element.id)
        const bbox = {
          x: customPos?.x ?? element.defaultBbox.x,
          y: customPos?.y ?? element.defaultBbox.y,
          width: customPos?.width ?? element.defaultBbox.width,
          height: customPos?.height ?? element.defaultBbox.height
        }
        renderedElementBboxes[element.id] = bbox; // Store for other elements if needed
        const scaleX = bbox.width / element.defaultBbox.width
        const scaleY = bbox.height / element.defaultBbox.height

        return (
          data.title && ( // Only render if title exists
            <g key={element.id} onMouseDown={e => startDrag(e, element.id, bbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-element.defaultBbox.x}, ${-element.defaultBbox.y})`}>
                {/* Original content, with coordinates relative to its defaultBbox origin */}
                <text x={W / 2 - element.defaultBbox.x} y={42 - element.defaultBbox.y} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
                  {data.title}
                </text>
              </g>
              {isSelected && renderHandles(bbox, element.id)}
            </g>
          )
        )
      })}

      {/* Render Nodes (Center and Branches) - Populates renderedElementBboxes for lines */}
      {nodeElements.map(element => {
        const customPos = templateElementPositions[element.id]
        const isSelected = selectedIds.has(element.id)
        const bbox = {
          x: customPos?.x ?? element.defaultBbox.x,
          y: customPos?.y ?? element.defaultBbox.y,
          width: customPos?.width ?? element.defaultBbox.width,
          height: customPos?.height ?? element.defaultBbox.height
        }
        renderedElementBboxes[element.id] = bbox; // Crucial: store actual rendered bbox for lines
        const scaleX = bbox.width / element.defaultBbox.width
        const scaleY = bbox.height / element.defaultBbox.height

        const originalNodeX = element.defaultBbox.x
        const originalNodeY = element.defaultBbox.y

        if (element.id === centerNodeId) {
          return (
            <g key={element.id} onMouseDown={e => startDrag(e, element.id, bbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-originalNodeX}, ${-originalNodeY})`}>
                {/* Original content, with coordinates relative to its defaultBbox origin */}
                <circle cx={cx - originalNodeX} cy={rootY - originalNodeY} r={30} fill="#1a1a2e" />
                <text x={cx - originalNodeX} y={(rootY + 5) - originalNodeY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                  {data.centerLabel.length > 10 ? data.centerLabel.slice(0, 8) + '..' : data.centerLabel}
                </text>
              </g>
              {isSelected && renderHandles(bbox, element.id)}
            </g>
          )
        } else { // Regular branch node
          return (
            <g key={element.id} onMouseDown={e => startDrag(e, element.id, bbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-originalNodeX}, ${-originalNodeY})`}>
                {/* Original content, with coordinates relative to its defaultBbox origin */}
                <rect
                  x={0} y={0} // Node rect's x,y are the same as its defaultBbox origin
                  width={nodeW} height={nodeH}
                  rx={8} fill="white" stroke={isSelected ? '#4a90d9' : element.color}
                  strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined}
                />
                <text
                  x={nodeW / 2} // Text x is relative to node's top-left, so half of nodeW
                  y={nodeH / 2 + 4} // Text y is relative to node's top-left, so half of nodeH + baseline adjust
                  textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333"
                >
                  {element.branch!.title.length > 18 ? element.branch!.title.slice(0, 16) + '..' : element.branch!.title}
                </text>
              </g>
              {isSelected && renderHandles(bbox, element.id)}
            </g>
          )
        }
      })}

      {/* Render Lines - Uses renderedElementBboxes to get current node positions */}
      {lineElements.map(element => {
        const parentBbox = renderedElementBboxes[element.parentId!];
        const childBbox = renderedElementBboxes[element.childId!];

        if (!parentBbox || !childBbox) return null; // Skip if connected nodes aren't rendered yet

        // Calculate CURRENT line endpoints based on CURRENT node positions
        const currentLineX1 = parentBbox.x + parentBbox.width / 2;
        const currentLineY1 = parentBbox.y + parentBbox.height; // Connect from bottom of parent
        const currentLineX2 = childBbox.x + childBbox.width / 2;
        const currentLineY2 = childBbox.y; // Connect to top of child

        // The 'defaultBbox' for the line itself is derived from its *initial* calculated position.
        // This is necessary for the scaling factor computation.
        const lineDefaultBbox = element.defaultBbox;

        // Now calculate the current position for the draggable line element.
        // Its actual x,y,width,height are based on the current endpoints.
        const actualLineBbox = {
          x: Math.min(currentLineX1, currentLineX2),
          y: Math.min(currentLineY1, currentLineY2),
          width: Math.abs(currentLineX2 - currentLineX1) || 1,
          height: Math.abs(currentLineY2 - currentLineY1) || 1
        };

        const customPos = templateElementPositions[element.id];
        const isSelected = selectedIds.has(element.id);

        const bbox = {
          x: customPos?.x ?? actualLineBbox.x,
          y: customPos?.y ?? actualLineBbox.y,
          width: customPos?.width ?? actualLineBbox.width,
          height: customPos?.height ?? actualLineBbox.height
        };

        // Scale factors are based on its *original* derived defaultBbox vs its *current transformed* bbox
        const scaleX = bbox.width / lineDefaultBbox.width;
        const scaleY = bbox.height / lineDefaultBbox.height;

        return (
          <g key={element.id} onMouseDown={e => startDrag(e, element.id, bbox)} style={{ cursor: 'pointer' }}>
            <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-lineDefaultBbox.x}, ${-lineDefaultBbox.y})`}>
              {/* Original content, with coordinates relative to its defaultBbox origin */}
              <line
                x1={currentLineX1 - lineDefaultBbox.x} y1={currentLineY1 - lineDefaultBbox.y}
                x2={currentLineX2 - lineDefaultBbox.x} y2={currentLineY2 - lineDefaultBbox.y}
                stroke={element.lineStrokeColor}
                strokeWidth={element.id === trunkLineId ? 4 : 1.5}
                opacity={0.4}
              />
            </g>
            {isSelected && renderHandles(bbox, element.id)}
          </g>
        )
      })}
    </g>
  )
}