import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 80,
    "y": 221,
    "width": 169,
    "height": 321,
    "text": "",
    "pathD": "M 10 0 L 159 0 Q 169 0 169 10 L 169 311 Q 169 321 159 321 L 10 321 Q 0 321 0 311 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-1",
    "x": 556,
    "y": 135,
    "width": 169,
    "height": 502,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 10 0 L 159 0 Q 169 0 169 10 L 169 492 Q 169 502 159 502 L 10 502 Q 0 502 0 492 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-2",
    "x": 1031,
    "y": 298,
    "width": 169,
    "height": 104,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 10 0 L 159 0 Q 169 0 169 10 L 169 94 Q 169 104 159 104 L 10 104 Q 0 104 0 94 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-3",
    "x": 318,
    "y": 159,
    "width": 169,
    "height": 445,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 10 0 L 159 0 Q 169 0 169 10 L 169 435 Q 169 445 159 445 L 10 445 Q 0 445 0 435 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-4",
    "x": 794,
    "y": 273,
    "width": 169,
    "height": 289,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 10 0 L 159 0 Q 169 0 169 10 L 169 279 Q 169 289 159 289 L 10 289 Q 0 289 0 279 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-5",
    "x": 89,
    "y": 325,
    "width": 151,
    "height": 124,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 327,
    "y": 232,
    "width": 151,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 327,
    "y": 438,
    "width": 151,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 565,
    "y": 256,
    "width": 151,
    "height": 51,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 8,
    "x": 803,
    "y": 463,
    "width": 151,
    "height": 51,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 0,
    "x": 565,
    "y": 186,
    "width": 151,
    "height": 51,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 6,
    "x": 803,
    "y": 393,
    "width": 151,
    "height": 51,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 3,
    "x": 803,
    "y": 324,
    "width": 151,
    "height": 51,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 9,
    "x": 565,
    "y": 531,
    "width": 151,
    "height": 51,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 7,
    "x": 565,
    "y": 463,
    "width": 151,
    "height": 51,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 5,
    "x": 565,
    "y": 393,
    "width": 151,
    "height": 51,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 2,
    "x": 565,
    "y": 324,
    "width": 151,
    "height": 51,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 4,
    "x": 1040,
    "y": 324,
    "width": 151,
    "height": 51,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-20",
    "x": 249,
    "y": 381,
    "width": 38,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 287,
    "y": 284,
    "width": 31,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 287,
    "y": 489,
    "width": 31,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-23",
    "x": 287,
    "y": 284,
    "width": 10,
    "height": 205,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 486,
    "y": 489,
    "width": 69,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 525,
    "y": 420,
    "width": 31,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 525,
    "y": 560,
    "width": 31,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 525,
    "y": 420,
    "width": 10,
    "height": 140,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 486,
    "y": 280,
    "width": 69,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 525,
    "y": 210,
    "width": 31,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 525,
    "y": 351,
    "width": 31,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 525,
    "y": 210,
    "width": 10,
    "height": 140,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 724,
    "y": 420,
    "width": 69,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 763,
    "y": 350,
    "width": 31,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 763,
    "y": 491,
    "width": 31,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 763,
    "y": 350,
    "width": 10,
    "height": 140,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 962,
    "y": 352,
    "width": 69,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
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

export function Migso89Template({ data }: { data: BrainData }): ReactElement {
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
