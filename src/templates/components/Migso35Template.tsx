import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 185,
    "y": 347,
    "width": 114,
    "height": 227,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 265,
    "y": 347,
    "width": 114,
    "height": 227,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 424,
    "y": 188,
    "width": 114,
    "height": 227,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 503,
    "y": 188,
    "width": 114,
    "height": 227,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 662,
    "y": 347,
    "width": 114,
    "height": 227,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 742,
    "y": 347,
    "width": 114,
    "height": 227,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 900,
    "y": 188,
    "width": 114,
    "height": 227,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 980,
    "y": 188,
    "width": 114,
    "height": 227,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 233,
    "y": 235,
    "width": 102,
    "height": 102,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 51 0 A 51 51 0 1 1 51 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 471,
    "y": 429,
    "width": 102,
    "height": 102,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 51 0 A 51 51 0 1 1 51 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 710,
    "y": 235,
    "width": 102,
    "height": 102,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 51 0 A 51 51 0 1 1 51 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 946,
    "y": 429,
    "width": 102,
    "height": 102,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 51 0 A 51 51 0 1 1 51 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 264,
    "y": 258,
    "width": 38,
    "height": 56,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 0 52 L 38 52 L 38 56 L 0 56 Z M 0 47 L 38 47 L 38 51 L 0 51 Z M 5 33 L 5 37 L 24 37 L 24 33 Z M 22 26 L 22 30 L 29 30 L 29 26 Z M 5 26 L 5 30 L 19 30 L 19 26 Z M 26 19 L 26 23 L 33 23 L 33 19 Z M 5 19 L 5 23 L 22 23 L 22 19 Z M 9 0 L 12 0 L 12 9 L 16 3 L 26 3 L 26 0 L 29 0 L 29 9 L 33 3 L 38 3 L 38 46 L 0 46 L 0 3 L 9 3 Z"
  },
  {
    "id": "sp-13",
    "x": 733,
    "y": 258,
    "width": 56,
    "height": 56,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 26 14 L 30 14 L 30 25 C 31 26, 31 27, 31 28 C 31 28, 31 29, 31 29 L 41 39 L 38 41 L 29 31 C 29 31, 28 32, 28 32 C 26 32, 24 30, 24 28 C 24 27, 25 26, 26 25 Z M 26 7 C 16 8, 8 16, 7 26 L 9 26 L 11 28 L 9 30 L 7 30 C 8 40, 16 48, 26 49 L 26 47 L 28 46 L 30 47 L 30 49 C 40 48, 48 40, 49 30 L 47 30 L 46 28 L 47 26 L 49 26 C 48 16, 40 8, 30 7 L 30 9 L 28 11 L 26 9 Z M 28 0 C 43 0, 56 13, 56 28 C 56 43, 43 56, 28 56 C 13 56, 0 43, 0 28 C 0 13, 13 0, 28 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 500,
    "y": 452,
    "width": 42,
    "height": 56,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 7 42 L 21 42 L 21 46 L 7 46 Z M 25 35 L 35 35 L 35 38 L 25 38 Z M 7 35 L 21 35 L 21 38 L 7 38 Z M 17 28 L 30 28 L 30 32 L 17 32 Z M 7 28 L 14 28 L 14 32 L 7 32 Z M 26 21 L 35 21 L 35 24 L 26 24 Z M 7 21 L 23 21 L 23 24 L 7 24 Z M 3 5 L 9 5 L 9 9 L 4 9 L 3 10 L 3 52 L 4 52 L 38 52 L 39 52 L 39 10 L 38 9 L 33 9 L 33 5 L 39 5 L 42 8 L 42 53 L 39 56 L 3 56 L 0 53 L 0 8 Z M 21 3 C 20 3, 19 4, 19 5 C 19 6, 20 7, 21 7 C 22 7, 23 6, 23 5 C 23 4, 22 3, 21 3 Z M 18 0 L 24 0 C 26 2, 28 4, 30 5 L 31 5 L 31 14 L 11 14 L 11 5 L 12 5 C 14 4, 16 2, 18 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 977,
    "y": 452,
    "width": 42,
    "height": 56,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 30 26 L 32 28 L 23 37 L 17 32 L 19 29 L 23 33 Z M 10 23 L 24 23 L 24 26 L 14 26 L 14 40 L 28 40 L 28 35 L 31 35 L 31 44 L 10 44 Z M 3 5 L 9 5 L 9 9 L 4 9 L 3 10 L 3 52 L 4 52 L 38 52 L 39 52 L 39 10 L 38 9 L 33 9 L 33 5 L 39 5 L 42 8 L 42 53 L 39 56 L 3 56 L 0 53 L 0 8 Z M 21 3 C 20 3, 19 4, 19 5 C 19 6, 20 7, 21 7 C 22 7, 23 6, 23 5 C 23 4, 22 3, 21 3 Z M 17 0 L 24 0 C 26 2, 28 4, 30 5 L 31 5 L 31 14 L 10 14 L 10 5 L 12 5 C 14 4, 16 2, 17 0 Z"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 2,
    "x": 256,
    "y": 442,
    "width": 55,
    "height": 87,
    "text": "1"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 0,
    "x": 492,
    "y": 227,
    "width": 55,
    "height": 87,
    "text": "2"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 733,
    "y": 442,
    "width": 55,
    "height": 87,
    "text": "3"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 1,
    "x": 970,
    "y": 227,
    "width": 55,
    "height": 87,
    "text": "4"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 2,
    "x": 351,
    "y": 580,
    "width": 336,
    "height": 56,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 466,
    "y": 549,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 829,
    "y": 580,
    "width": 336,
    "height": 56,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 943,
    "y": 549,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 114,
    "y": 148,
    "width": 336,
    "height": 56,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 0,
    "x": 229,
    "y": 117,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 1,
    "x": 592,
    "y": 148,
    "width": 336,
    "height": 56,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 1,
    "x": 706,
    "y": 117,
    "width": 111,
    "height": 36,
    "text": "Your title"
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

export function Migso35Template({ data }: { data: BrainData }): ReactElement {
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
