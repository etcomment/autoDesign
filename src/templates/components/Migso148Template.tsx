import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 0,
    "y": 329,
    "width": 1280,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 742,
    "y": 319,
    "width": 20,
    "height": 20,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 519,
    "y": 319,
    "width": 20,
    "height": 20,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 295,
    "y": 319,
    "width": 20,
    "height": 20,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 965,
    "y": 319,
    "width": 20,
    "height": 20,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 118,
    "y": 157,
    "width": 132,
    "height": 132,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 574,
    "y": 157,
    "width": 132,
    "height": 132,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 1031,
    "y": 157,
    "width": 132,
    "height": 132,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 346,
    "y": 370,
    "width": 132,
    "height": 132,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 803,
    "y": 370,
    "width": 132,
    "height": 132,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 2,
    "x": 133,
    "y": 347,
    "width": 102,
    "height": 36,
    "text": "WEEK 1"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 0,
    "x": 361,
    "y": 276,
    "width": 102,
    "height": 36,
    "text": "WEEK 2"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 3,
    "x": 589,
    "y": 347,
    "width": 102,
    "height": 36,
    "text": "WEEK 3"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 818,
    "y": 276,
    "width": 102,
    "height": 36,
    "text": "WEEK 4"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 4,
    "x": 1046,
    "y": 347,
    "width": 102,
    "height": 36,
    "text": "WEEK 5"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 0,
    "x": 143,
    "y": 192,
    "width": 81,
    "height": 61,
    "text": "Your title"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 3,
    "x": 371,
    "y": 405,
    "width": 81,
    "height": 61,
    "text": "Your title"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 1,
    "x": 599,
    "y": 192,
    "width": 81,
    "height": 61,
    "text": "Your title"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 2,
    "x": 1056,
    "y": 192,
    "width": 81,
    "height": 61,
    "text": "Your title"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 4,
    "x": 828,
    "y": 405,
    "width": 81,
    "height": 61,
    "text": "Your title"
  },
  {
    "id": "sp-20",
    "x": 80,
    "y": 564,
    "width": 1120,
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

export function Migso148Template({ data }: { data: BrainData }): ReactElement {
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
