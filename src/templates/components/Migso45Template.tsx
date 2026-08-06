import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 105,
    "y": 346,
    "width": 222,
    "height": 181,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 111 0 L 222 181 L 0 181 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 274,
    "y": 272,
    "width": 222,
    "height": 256,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 111 0 L 222 256 L 0 256 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 444,
    "y": 277,
    "width": 222,
    "height": 251,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 111 0 L 222 251 L 0 251 Z"
  },
  {
    "id": "sp-3",
    "x": 614,
    "y": 389,
    "width": 222,
    "height": 139,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 111 0 L 222 139 L 0 139 Z"
  },
  {
    "id": "sp-4",
    "x": 784,
    "y": 293,
    "width": 222,
    "height": 235,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 111 0 L 222 235 L 0 235 Z"
  },
  {
    "id": "sp-5",
    "x": 953,
    "y": 203,
    "width": 222,
    "height": 325,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 111 0 L 222 325 L 0 325 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 180,
    "y": 257,
    "width": 71,
    "height": 71,
    "strokeColor": "#3365cc",
    "text": "",
    "pathD": "M 36 0 A 36 36 0 1 1 35 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 350,
    "y": 183,
    "width": 71,
    "height": 71,
    "strokeColor": "#ff4d38",
    "text": "",
    "pathD": "M 36 0 A 36 36 0 1 1 35 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 520,
    "y": 188,
    "width": 71,
    "height": 71,
    "strokeColor": "#52c49c",
    "text": "",
    "pathD": "M 36 0 A 36 36 0 1 1 35 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 689,
    "y": 300,
    "width": 71,
    "height": 71,
    "strokeColor": "#ffb900",
    "text": "",
    "pathD": "M 36 0 A 36 36 0 1 1 35 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 859,
    "y": 204,
    "width": 71,
    "height": 71,
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 36 0 A 36 36 0 1 1 35 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 1029,
    "y": 114,
    "width": 71,
    "height": 71,
    "strokeColor": "#4a90d9",
    "text": "",
    "pathD": "M 36 0 A 36 36 0 1 1 35 0 Z"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 158,
    "y": 542,
    "width": 115,
    "height": 36,
    "text": "Q1 - 2019"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 328,
    "y": 542,
    "width": 115,
    "height": 36,
    "text": "Q2 - 2019"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 498,
    "y": 542,
    "width": 115,
    "height": 36,
    "text": "Q3 - 2019"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 3,
    "x": 667,
    "y": 542,
    "width": 115,
    "height": 36,
    "text": "Q4 - 2019"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 4,
    "x": 837,
    "y": 542,
    "width": 115,
    "height": 36,
    "text": "Q1 - 2020"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 5,
    "x": 1006,
    "y": 542,
    "width": 115,
    "height": 36,
    "text": "Q2 - 2020"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 185,
    "y": 275,
    "width": 62,
    "height": 36,
    "text": "50%"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 0,
    "x": 354,
    "y": 201,
    "width": 62,
    "height": 36,
    "text": "80%"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 524,
    "y": 205,
    "width": 62,
    "height": 36,
    "text": "79%"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 4,
    "x": 694,
    "y": 318,
    "width": 62,
    "height": 36,
    "text": "30%"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 2,
    "x": 863,
    "y": 222,
    "width": 62,
    "height": 36,
    "text": "75%"
  },
  {
    "id": "sp-23",
    "x": 1027,
    "y": 131,
    "width": 74,
    "height": 36,
    "text": "100%"
  },
  {
    "id": "sp-24",
    "x": 160,
    "y": 600,
    "width": 911,
    "height": 27,
    "text": "MIGSO-PCUBED content and words to be added here as required"
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

export function Migso45Template({ data }: { data: BrainData }): ReactElement {
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
