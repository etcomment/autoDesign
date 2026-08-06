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
    "x": 87,
    "y": 588,
    "width": 89,
    "height": 63,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 180,
    "y": 588,
    "width": 89,
    "height": 63,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 272,
    "y": 588,
    "width": 89,
    "height": 63,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 364,
    "y": 588,
    "width": 89,
    "height": 63,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 457,
    "y": 588,
    "width": 89,
    "height": 63,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 549,
    "y": 588,
    "width": 89,
    "height": 63,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 642,
    "y": 588,
    "width": 89,
    "height": 63,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 734,
    "y": 588,
    "width": 89,
    "height": 63,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 826,
    "y": 588,
    "width": 89,
    "height": 63,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 919,
    "y": 588,
    "width": 89,
    "height": 63,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 1011,
    "y": 588,
    "width": 89,
    "height": 63,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 1104,
    "y": 588,
    "width": 89,
    "height": 63,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-51",
    "x": 121,
    "y": 152,
    "width": 10,
    "height": 420,
    "text": ""
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 108,
    "y": 572,
    "width": 27,
    "height": 27,
    "fillColor": "#ffffff",
    "strokeColor": "#000000",
    "text": "",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 118,
    "y": 139,
    "width": 315,
    "height": 55,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-52",
    "x": 750,
    "y": 421,
    "width": 10,
    "height": 150,
    "text": ""
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 3,
    "x": 736,
    "y": 572,
    "width": 27,
    "height": 27,
    "fillColor": "#ffffff",
    "strokeColor": "#000000",
    "text": "",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 747,
    "y": 366,
    "width": 315,
    "height": 55,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-53",
    "x": 345,
    "y": 239,
    "width": 10,
    "height": 332,
    "text": ""
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 331,
    "y": 572,
    "width": 27,
    "height": 27,
    "fillColor": "#ffffff",
    "strokeColor": "#000000",
    "text": "",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-17",
    "x": 342,
    "y": 214,
    "width": 471,
    "height": 55,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-54",
    "x": 531,
    "y": 321,
    "width": 10,
    "height": 250,
    "text": ""
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 2,
    "x": 517,
    "y": 572,
    "width": 27,
    "height": 27,
    "fillColor": "#ffffff",
    "strokeColor": "#000000",
    "text": "",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-19",
    "x": 528,
    "y": 290,
    "width": 277,
    "height": 55,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-55",
    "x": 952,
    "y": 481,
    "width": 10,
    "height": 91,
    "text": ""
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 4,
    "x": 938,
    "y": 572,
    "width": 27,
    "height": 27,
    "fillColor": "#ffffff",
    "strokeColor": "#000000",
    "text": "",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-21",
    "x": 949,
    "y": 442,
    "width": 228,
    "height": 55,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 0,
    "x": 111,
    "y": 606,
    "width": 42,
    "height": 27,
    "text": "Jan"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 1,
    "x": 202,
    "y": 606,
    "width": 43,
    "height": 27,
    "text": "Feb"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 2,
    "x": 295,
    "y": 606,
    "width": 43,
    "height": 27,
    "text": "Mar"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 3,
    "x": 388,
    "y": 606,
    "width": 42,
    "height": 27,
    "text": "Apr"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 4,
    "x": 477,
    "y": 606,
    "width": 48,
    "height": 27,
    "text": "May"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 5,
    "x": 572,
    "y": 606,
    "width": 43,
    "height": 27,
    "text": "Jun"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 5,
    "x": 668,
    "y": 606,
    "width": 37,
    "height": 27,
    "text": "Jul"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 6,
    "x": 756,
    "y": 606,
    "width": 46,
    "height": 27,
    "text": "Aug"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 7,
    "x": 849,
    "y": 606,
    "width": 44,
    "height": 27,
    "text": "Sep"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 8,
    "x": 943,
    "y": 606,
    "width": 41,
    "height": 27,
    "text": "Oct"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 9,
    "x": 1036,
    "y": 606,
    "width": 46,
    "height": 27,
    "text": "Nov"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 10,
    "x": 1126,
    "y": 606,
    "width": 44,
    "height": 27,
    "text": "Dec"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 0,
    "x": 136,
    "y": 523,
    "width": 85,
    "height": 36,
    "text": "Goal 1"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 5,
    "x": 138,
    "y": 555,
    "width": 87,
    "height": 24,
    "text": "12/Jan/2019"
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 1,
    "x": 358,
    "y": 523,
    "width": 85,
    "height": 36,
    "text": "Goal 2"
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 6,
    "x": 360,
    "y": 555,
    "width": 88,
    "height": 24,
    "text": "30/Mar/2019"
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 2,
    "x": 546,
    "y": 523,
    "width": 85,
    "height": 36,
    "text": "Goal 3"
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 7,
    "x": 548,
    "y": 555,
    "width": 90,
    "height": 24,
    "text": "26/May/2019"
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 3,
    "x": 764,
    "y": 523,
    "width": 85,
    "height": 36,
    "text": "Goal 4"
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 8,
    "x": 766,
    "y": 555,
    "width": 83,
    "height": 24,
    "text": "7/Aug/2019"
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 4,
    "x": 965,
    "y": 523,
    "width": 85,
    "height": 36,
    "text": "Goal 5"
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 9,
    "x": 967,
    "y": 555,
    "width": 87,
    "height": 24,
    "text": "12/Oct/2019"
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 0,
    "x": 134,
    "y": 151,
    "width": 144,
    "height": 32,
    "text": "Your title here"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 1,
    "x": 358,
    "y": 225,
    "width": 144,
    "height": 32,
    "text": "Your title here"
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 2,
    "x": 544,
    "y": 302,
    "width": 144,
    "height": 32,
    "text": "Your title here"
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 3,
    "x": 763,
    "y": 378,
    "width": 144,
    "height": 32,
    "text": "Your title here"
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 4,
    "x": 964,
    "y": 454,
    "width": 144,
    "height": 32,
    "text": "Your title here"
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

export function Migso117Template({ data }: { data: BrainData }): ReactElement {
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
