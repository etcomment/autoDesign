import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 80,
    "y": 138,
    "width": 138,
    "height": 127,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 265,
    "width": 138,
    "height": 96,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 80,
    "y": 361,
    "width": 138,
    "height": 96,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 80,
    "y": 457,
    "width": 138,
    "height": 96,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 80,
    "y": 553,
    "width": 138,
    "height": 96,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 218,
    "y": 138,
    "width": 197,
    "height": 63,
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 415,
    "y": 138,
    "width": 197,
    "height": 63,
    "fillColor": "#ff4d38",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 612,
    "y": 138,
    "width": 197,
    "height": 63,
    "fillColor": "#52c49c",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 809,
    "y": 138,
    "width": 197,
    "height": 63,
    "fillColor": "#ffb900",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1006,
    "y": 138,
    "width": 197,
    "height": 63,
    "fillColor": "#3365cc",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 218,
    "y": 265,
    "width": 984,
    "height": 96,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 218,
    "y": 361,
    "width": 984,
    "height": 96,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 218,
    "y": 457,
    "width": 984,
    "height": 96,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 218,
    "y": 553,
    "width": 984,
    "height": 96,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 218,
    "y": 202,
    "width": 65,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 283,
    "y": 202,
    "width": 66,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 350,
    "y": 202,
    "width": 65,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 415,
    "y": 202,
    "width": 65,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 480,
    "y": 202,
    "width": 66,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 547,
    "y": 202,
    "width": 65,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 612,
    "y": 202,
    "width": 65,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 677,
    "y": 202,
    "width": 66,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 744,
    "y": 202,
    "width": 65,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 809,
    "y": 202,
    "width": 65,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 874,
    "y": 202,
    "width": 66,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 940,
    "y": 202,
    "width": 65,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 1006,
    "y": 202,
    "width": 65,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 1071,
    "y": 202,
    "width": 66,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 1137,
    "y": 202,
    "width": 65,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 0,
    "x": 293,
    "y": 152,
    "width": 48,
    "height": 36,
    "text": "Q1"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 1,
    "x": 489,
    "y": 152,
    "width": 48,
    "height": 36,
    "text": "Q2"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 2,
    "x": 686,
    "y": 152,
    "width": 48,
    "height": 36,
    "text": "Q3"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 3,
    "x": 883,
    "y": 152,
    "width": 48,
    "height": 36,
    "text": "Q4"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 4,
    "x": 1080,
    "y": 152,
    "width": 48,
    "height": 36,
    "text": "Q1"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 5,
    "x": 227,
    "y": 219,
    "width": 47,
    "height": 29,
    "text": "Jan"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 6,
    "x": 292,
    "y": 219,
    "width": 48,
    "height": 29,
    "text": "Feb"
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 7,
    "x": 359,
    "y": 219,
    "width": 48,
    "height": 29,
    "text": "Mar"
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 8,
    "x": 424,
    "y": 219,
    "width": 47,
    "height": 29,
    "text": "Apr"
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 9,
    "x": 488,
    "y": 219,
    "width": 51,
    "height": 29,
    "text": "May"
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 10,
    "x": 556,
    "y": 219,
    "width": 48,
    "height": 29,
    "text": "Jun"
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 11,
    "x": 623,
    "y": 219,
    "width": 43,
    "height": 29,
    "text": "Jul"
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 12,
    "x": 686,
    "y": 219,
    "width": 51,
    "height": 29,
    "text": "Aug"
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 13,
    "x": 752,
    "y": 219,
    "width": 49,
    "height": 29,
    "text": "Sep"
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 14,
    "x": 818,
    "y": 219,
    "width": 46,
    "height": 29,
    "text": "Oct"
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 15,
    "x": 882,
    "y": 219,
    "width": 50,
    "height": 29,
    "text": "Nov"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 16,
    "x": 949,
    "y": 219,
    "width": 49,
    "height": 29,
    "text": "Dec"
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 17,
    "x": 1014,
    "y": 219,
    "width": 47,
    "height": 29,
    "text": "Jan"
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 18,
    "x": 1081,
    "y": 219,
    "width": 48,
    "height": 29,
    "text": "Feb"
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 19,
    "x": 1146,
    "y": 219,
    "width": 48,
    "height": 29,
    "text": "Mar"
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 0,
    "x": 94,
    "y": 296,
    "width": 110,
    "height": 36,
    "text": "Stream 1"
  },
  {
    "id": "sp-50",
    "dataNodeIdx": 1,
    "x": 94,
    "y": 392,
    "width": 110,
    "height": 36,
    "text": "Stream 2"
  },
  {
    "id": "sp-51",
    "dataNodeIdx": 2,
    "x": 94,
    "y": 487,
    "width": 110,
    "height": 36,
    "text": "Stream 3"
  },
  {
    "id": "sp-52",
    "dataNodeIdx": 3,
    "x": 94,
    "y": 583,
    "width": 110,
    "height": 36,
    "text": "Stream 4"
  },
  {
    "id": "sp-53",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 350,
    "y": 275,
    "width": 327,
    "height": 33,
    "text": "",
    "pathD": "M 0 8 L 196 8 L 196 0 L 327 17 L 196 33 L 196 25 L 0 25 Z"
  },
  {
    "id": "sp-54",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 874,
    "y": 318,
    "width": 197,
    "height": 33,
    "text": "",
    "pathD": "M 0 8 L 118 8 L 118 0 L 197 17 L 118 33 L 118 25 L 0 25 Z"
  },
  {
    "id": "sp-55",
    "dataNodeIdx": 0,
    "x": 469,
    "y": 277,
    "width": 88,
    "height": 29,
    "text": "Product 1"
  },
  {
    "id": "sp-56",
    "dataNodeIdx": 1,
    "x": 928,
    "y": 320,
    "width": 88,
    "height": 29,
    "text": "Product 2"
  },
  {
    "id": "sp-57",
    "x": 282,
    "y": 374,
    "width": 657,
    "height": 33,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 8 L 394 8 L 394 0 L 657 17 L 394 33 L 394 25 L 0 25 Z"
  },
  {
    "id": "sp-58",
    "x": 809,
    "y": 414,
    "width": 164,
    "height": 33,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 8 L 98 8 L 98 0 L 164 17 L 98 33 L 98 25 L 0 25 Z"
  },
  {
    "id": "sp-59",
    "dataNodeIdx": 2,
    "x": 568,
    "y": 373,
    "width": 88,
    "height": 29,
    "text": "Product 3"
  },
  {
    "id": "sp-60",
    "dataNodeIdx": 3,
    "x": 846,
    "y": 416,
    "width": 88,
    "height": 29,
    "text": "Product 4"
  },
  {
    "id": "sp-61",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 579,
    "y": 467,
    "width": 197,
    "height": 33,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 8 L 118 8 L 118 0 L 197 17 L 118 33 L 118 25 L 0 25 Z"
  },
  {
    "id": "sp-62",
    "x": 874,
    "y": 510,
    "width": 264,
    "height": 33,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 8 L 158 8 L 158 0 L 264 17 L 158 33 L 158 25 L 0 25 Z"
  },
  {
    "id": "sp-63",
    "dataNodeIdx": 4,
    "x": 633,
    "y": 469,
    "width": 88,
    "height": 29,
    "text": "Product 5"
  },
  {
    "id": "sp-64",
    "dataNodeIdx": 5,
    "x": 961,
    "y": 512,
    "width": 88,
    "height": 29,
    "text": "Product 6"
  },
  {
    "id": "sp-65",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 384,
    "y": 563,
    "width": 326,
    "height": 33,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 8 L 196 8 L 196 0 L 326 17 L 196 33 L 196 25 L 0 25 Z"
  },
  {
    "id": "sp-66",
    "x": 1043,
    "y": 606,
    "width": 134,
    "height": 33,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 8 L 80 8 L 80 0 L 134 17 L 80 33 L 80 25 L 0 25 Z"
  },
  {
    "id": "sp-67",
    "dataNodeIdx": 6,
    "x": 503,
    "y": 565,
    "width": 88,
    "height": 29,
    "text": "Product 7"
  },
  {
    "id": "sp-68",
    "dataNodeIdx": 7,
    "x": 1066,
    "y": 608,
    "width": 88,
    "height": 29,
    "text": "Product 8"
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

export function Migso171Template({ data }: { data: BrainData }): ReactElement {
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
