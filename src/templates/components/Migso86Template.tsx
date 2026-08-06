import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 136,
    "width": 538,
    "height": 38,
    "text": ""
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 0,
    "x": 207,
    "y": 134,
    "width": 284,
    "height": 36,
    "text": "Sales volume by category"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 80,
    "y": 418,
    "width": 538,
    "height": 38,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 207,
    "y": 419,
    "width": 284,
    "height": 36,
    "text": "Sales volume by category"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 662,
    "y": 133,
    "width": 538,
    "height": 38,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-5",
    "x": 799,
    "y": 137,
    "width": 264,
    "height": 36,
    "text": "Last month comparison"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 662,
    "y": 418,
    "width": 538,
    "height": 38,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-7",
    "x": 809,
    "y": 419,
    "width": 243,
    "height": 36,
    "text": "Monthly sales volume"
  },
  {
    "id": "grp-8",
    "isGroup": true,
    "children": [
      {
        "id": "sp-12",
        "x": 785,
        "y": 202,
        "width": 10,
        "height": 93.44927536231884,
        "localPctX": 0.1875,
        "localPctY": 0,
        "localPctW": 0.59375,
        "localPctH": 0.8985507246376812,
        "text": "",
        "pathD": "M 5 0 L 9.5 93.44927536231884 L 0 93.44927536231884 Z"
      },
      {
        "id": "sp-13",
        "x": 782,
        "y": 289.92270531400965,
        "width": 16,
        "height": 16.07729468599034,
        "localPctX": 0,
        "localPctY": 0.8454106280193235,
        "localPctW": 1,
        "localPctH": 0.15458937198067632,
        "text": "",
        "pathD": "M 8 0 A 8 8 0 1 1 8 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 782,
    "y": 202,
    "width": 16,
    "height": 104
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 0,
    "x": 687,
    "y": 344,
    "width": 205,
    "height": 48,
    "text": "Last month Sales volume $50%"
  },
  {
    "id": "grp-12",
    "isGroup": true,
    "children": [
      {
        "id": "sp-14",
        "x": 1062,
        "y": 202,
        "width": 10,
        "height": 93.44927536231884,
        "localPctX": 0.1875,
        "localPctY": 0,
        "localPctW": 0.59375,
        "localPctH": 0.8985507246376812,
        "text": "",
        "pathD": "M 5 0 L 9.5 93.44927536231884 L 0 93.44927536231884 Z"
      },
      {
        "id": "sp-15",
        "x": 1059,
        "y": 289.92270531400965,
        "width": 16,
        "height": 16.07729468599034,
        "localPctX": 0,
        "localPctY": 0.8454106280193235,
        "localPctW": 1,
        "localPctH": 0.15458937198067632,
        "text": "",
        "pathD": "M 8 0 A 8 8 0 1 1 8 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1059,
    "y": 202,
    "width": 16,
    "height": 104
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 1,
    "x": 965,
    "y": 344,
    "width": 205,
    "height": 48,
    "text": "This month Sales volume $75%"
  }
]

const DEFAULT_COLORS = ["#282a5d","#3365cc","#ff4d38","#ffb900","#52c49c","#ee6d90"]

function wrapText(text: string, maxCharsPerLine: number): string[] {
  if (!text) return []
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim()
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines
}

export function Migso86Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const branches = data?.branches && data.branches.length > 0 ? data.branches : []

  const renderShape = (shapeDef: any, parentBbox: any) => {
    const id = shapeDef.id
    const isRoot = parentBbox === null
    
    let bbox = { x: shapeDef.x, y: shapeDef.y, width: shapeDef.width || shapeDef.w, height: shapeDef.height || shapeDef.h }
    
    if (isRoot) {
      const pos = positions[id]
      bbox = {
        x: pos?.x ?? bbox.x,
        y: pos?.y ?? bbox.y,
        width: pos?.width ?? bbox.width,
        height: pos?.height ?? bbox.height,
      }
    } else if (parentBbox && shapeDef.localPctX !== undefined) {
      bbox = {
        x: parentBbox.x + shapeDef.localPctX * parentBbox.width,
        y: parentBbox.y + shapeDef.localPctY * parentBbox.height,
        width: Math.max(1, shapeDef.localPctW * parentBbox.width),
        height: Math.max(1, shapeDef.localPctH * parentBbox.height),
      }
    }

    const isSelected = selectedIds.has(id)
    
    const branch = (shapeDef.dataNodeIdx !== undefined && shapeDef.dataNodeIdx !== -1 && shapeDef.dataNodeIdx < branches.length) 
      ? branches[shapeDef.dataNodeIdx] 
      : null

    let finalColor = shapeDef.fillColor
    let finalStroke = shapeDef.strokeColor
    if (shapeDef.isColorNode && branch) {
      const branchColor = branch.color || DEFAULT_COLORS[shapeDef.dataNodeIdx % DEFAULT_COLORS.length]
      if (finalColor && finalColor.toLowerCase() !== '#ffffff' && finalColor.toLowerCase() !== '#000000') {
        finalColor = branchColor
      }
      if (finalStroke && finalStroke.toLowerCase() !== '#ffffff' && finalStroke.toLowerCase() !== '#000000') {
        finalStroke = branchColor
      }
    }
    
    finalColor = tplColors[id] ?? finalColor

    let finalText = shapeDef.text
    if (shapeDef.isTitle && branch?.title) {
      finalText = branch.title
    }
    if (shapeDef.isSubtitle && branch?.subtitle) {
      finalText = branch.subtitle
    }

    if (shapeDef.isGroup) {
      return (
        <g key={id} onMouseDown={isRoot ? (e => startDrag(e, id, bbox)) : undefined} transform={isRoot ? getTransform(id, bbox) : undefined} style={{ cursor: isRoot ? 'pointer' : 'default' }}>
          {shapeDef.children?.map((child: any) => renderShape(child, bbox))}
          {isRoot && isSelected && renderHandles(bbox, id)}
        </g>
      )
    }

    const titleLines = finalText ? wrapText(finalText, Math.max(10, Math.floor(bbox.width / 6))) : []

    return (
      <g key={id} onMouseDown={isRoot ? (e => startDrag(e, id, bbox)) : undefined} transform={isRoot ? getTransform(id, bbox) : undefined} style={{ cursor: isRoot ? 'pointer' : 'default' }}>
        {shapeDef.pathD ? (
          <path
            d={shapeDef.pathD}
            transform={`translate(${bbox.x}, ${bbox.y}) scale(${bbox.width / Math.max(1, shapeDef.width || shapeDef.w)}, ${bbox.height / Math.max(1, shapeDef.height || shapeDef.h)})`}
            fill={finalColor || 'transparent'}
            opacity={isSelected && isRoot ? 0.88 : 1}
            stroke={isSelected && isRoot ? '#4a90d9' : (finalStroke || 'transparent')}
            strokeWidth={isSelected && isRoot ? 2.5 : (finalStroke ? 1.5 : 0)}
          />
        ) : (
          (finalColor || finalStroke) && (
            <rect
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              rx={8}
              fill={finalColor || 'transparent'}
              opacity={isSelected && isRoot ? 0.88 : 1}
              stroke={isSelected && isRoot ? '#4a90d9' : (finalStroke || 'transparent')}
              strokeWidth={isSelected && isRoot ? 2.5 : (finalStroke ? 1.5 : 0)}
            />
          )
        )}

        {titleLines.length > 0 && (
          <text
            x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)}
            y={bbox.y + (shapeDef.pathD || finalColor ? 20 : 10)}
            fontFamily="Arial, sans-serif"
            fontSize={shapeDef.isTitle ? 14 : (shapeDef.isSubtitle ? 10 : 12)}
            fontWeight={shapeDef.isTitle ? 700 : 400}
            fill={shapeDef.isTitle ? '#111827' : '#4b5563'}
          >
            {titleLines.map((line: string, lIdx: number) => (
              <tspan key={lIdx} x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)} dy={lIdx === 0 ? 0 : (shapeDef.isTitle ? 18 : 14)}>
                {line}
              </tspan>
            ))}
          </text>
        )}

        {isRoot && isSelected && renderHandles(bbox, id)}
      </g>
    )
  }

  return (
    <g ref={svgRef}>
      {PPTX_EXTRACTED_SHAPES.map((shapeDef) => renderShape(shapeDef, null))}
    </g>
  )
}
