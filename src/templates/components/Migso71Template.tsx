import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "dataNodeIdx": 1,
    "x": 802,
    "y": 145,
    "width": 143,
    "height": 42,
    "text": "Option 02"
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 0,
    "x": 348,
    "y": 145,
    "width": 143,
    "height": 42,
    "text": "Option 01"
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 0,
    "x": 213,
    "y": 192,
    "width": 278,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 798,
    "y": 192,
    "width": 282,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-4",
    "x": 591,
    "y": 158,
    "width": 98,
    "height": 81,
    "text": "VS"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 310,
    "width": 82,
    "height": 82,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 41 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 80,
    "y": 396,
    "width": 82,
    "height": 82,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 41 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 80,
    "y": 481,
    "width": 82,
    "height": 82,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 41 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 80,
    "y": 566,
    "width": 82,
    "height": 82,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 41 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 438,
    "y": 183,
    "width": 69,
    "height": 334,
    "text": ""
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 550,
    "y": 381,
    "width": 69,
    "height": 111,
    "text": ""
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 383,
    "y": 299,
    "width": 69,
    "height": 445,
    "text": ""
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 494,
    "y": 496,
    "width": 69,
    "height": 222,
    "text": ""
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 0,
    "x": 99,
    "y": 338,
    "width": 43,
    "height": 26,
    "text": "75%"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 99,
    "y": 424,
    "width": 43,
    "height": 26,
    "text": "25%"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 1,
    "x": 93,
    "y": 509,
    "width": 55,
    "height": 26,
    "text": "100%"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 4,
    "x": 99,
    "y": 593,
    "width": 43,
    "height": 26,
    "text": "50%"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 661,
    "y": 466,
    "width": 69,
    "height": 111,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 716,
    "y": 239,
    "width": 69,
    "height": 222,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 828,
    "y": 214,
    "width": 69,
    "height": 445,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 773,
    "y": 439,
    "width": 69,
    "height": 335,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 560,
    "y": 337,
    "width": 159,
    "height": 27,
    "text": "",
    "pathD": "M 10 0 L 149 0 Q 159 0 159 10 L 159 17 Q 159 27 149 27 L 10 27 Q 0 27 0 17 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 0,
    "x": 590,
    "y": 339,
    "width": 102,
    "height": 26,
    "text": "Aspect 01"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 560,
    "y": 422,
    "width": 159,
    "height": 27,
    "text": "",
    "pathD": "M 10 0 L 149 0 Q 159 0 159 10 L 159 17 Q 159 27 149 27 L 10 27 Q 0 27 0 17 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 1,
    "x": 590,
    "y": 424,
    "width": 102,
    "height": 26,
    "text": "Aspect 02"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 560,
    "y": 508,
    "width": 159,
    "height": 27,
    "text": "",
    "pathD": "M 10 0 L 149 0 Q 159 0 159 10 L 159 17 Q 159 27 149 27 L 10 27 Q 0 27 0 17 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 2,
    "x": 590,
    "y": 510,
    "width": 102,
    "height": 26,
    "text": "Aspect 03"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 560,
    "y": 593,
    "width": 159,
    "height": 27,
    "text": "",
    "pathD": "M 10 0 L 149 0 Q 159 0 159 10 L 159 17 Q 159 27 149 27 L 10 27 Q 0 27 0 17 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 3,
    "x": 590,
    "y": 595,
    "width": 102,
    "height": 26,
    "text": "Aspect 04"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1121,
    "y": 310,
    "width": 82,
    "height": 82,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 41 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1121,
    "y": 396,
    "width": 82,
    "height": 82,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 41 0 Z"
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1121,
    "y": 481,
    "width": 82,
    "height": 82,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 41 0 Z"
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 1121,
    "y": 566,
    "width": 82,
    "height": 82,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 41 0 Z"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 1,
    "x": 1140,
    "y": 338,
    "width": 43,
    "height": 26,
    "text": "50%"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 0,
    "x": 1134,
    "y": 424,
    "width": 55,
    "height": 26,
    "text": "100%"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 3,
    "x": 1140,
    "y": 509,
    "width": 43,
    "height": 26,
    "text": "25%"
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 5,
    "x": 1140,
    "y": 593,
    "width": 43,
    "height": 26,
    "text": "75%"
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

export function Migso71Template({ data }: { data: BrainData }): ReactElement {
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
