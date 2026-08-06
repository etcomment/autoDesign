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
    "x": 413,
    "y": 169,
    "width": 167,
    "height": 62,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 1,
    "x": 424,
    "y": 185,
    "width": 144,
    "height": 30,
    "text": "Read email"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 413,
    "y": 266,
    "width": 167,
    "height": 62,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 0,
    "x": 424,
    "y": 272,
    "width": 144,
    "height": 50,
    "text": "Check sender’s identity"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 413,
    "y": 363,
    "width": 167,
    "height": 101,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 446,
    "y": 378,
    "width": 99,
    "height": 70,
    "text": "What’s the identity of Sender?"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 413,
    "y": 499,
    "width": 167,
    "height": 62,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 3,
    "x": 424,
    "y": 504,
    "width": 144,
    "height": 50,
    "text": "Forward to Help Desk"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 6,
    "x": 424,
    "y": 595,
    "width": 144,
    "height": 42,
    "text": ""
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 2,
    "x": 435,
    "y": 601,
    "width": 122,
    "height": 30,
    "text": "Finish"
  },
  {
    "id": "sp-10",
    "x": 475,
    "y": 93,
    "width": 42,
    "height": 42,
    "text": ""
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 5,
    "x": 134,
    "y": 595,
    "width": 144,
    "height": 42,
    "text": ""
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 1,
    "x": 145,
    "y": 601,
    "width": 122,
    "height": 30,
    "text": "Finish"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 123,
    "y": 499,
    "width": 167,
    "height": 62,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-14",
    "x": 135,
    "y": 494,
    "width": 144,
    "height": 70,
    "text": "Forward to Sales Department"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 123,
    "y": 161,
    "width": 167,
    "height": 78,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 135,
    "y": 178,
    "width": 144,
    "height": 30,
    "text": "Email"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 702,
    "y": 259,
    "width": 165,
    "height": 77,
    "fillColor": "#ee6d90",
    "strokeColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 702,
    "y": 363,
    "width": 165,
    "height": 101,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 1,
    "x": 736,
    "y": 378,
    "width": 99,
    "height": 70,
    "text": "Is the issue urgent?"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 713,
    "y": 282,
    "width": 144,
    "height": 50,
    "text": "Customer database"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 990,
    "y": 382,
    "width": 167,
    "height": 62,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 2,
    "x": 1002,
    "y": 388,
    "width": 144,
    "height": 50,
    "text": "Forward to email queue"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 4,
    "x": 1002,
    "y": 508,
    "width": 144,
    "height": 42,
    "text": ""
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 1013,
    "y": 514,
    "width": 122,
    "height": 30,
    "text": "Finish"
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 496,
    "y": 135,
    "width": 10,
    "height": 35,
    "text": ""
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 496,
    "y": 231,
    "width": 10,
    "height": 35,
    "text": ""
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 496,
    "y": 328,
    "width": 10,
    "height": 35,
    "text": ""
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 496,
    "y": 464,
    "width": 10,
    "height": 35,
    "text": ""
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 496,
    "y": 561,
    "width": 10,
    "height": 35,
    "text": ""
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 579,
    "y": 413,
    "width": 123,
    "height": 10,
    "text": ""
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 867,
    "y": 413,
    "width": 123,
    "height": 10,
    "text": ""
  },
  {
    "id": "sp-39",
    "x": 206,
    "y": 413,
    "width": 206,
    "height": 85,
    "text": ""
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 206,
    "y": 561,
    "width": 10,
    "height": 35,
    "text": ""
  },
  {
    "id": "sp-41",
    "x": 649,
    "y": 394,
    "width": 66,
    "height": 205,
    "text": ""
  },
  {
    "id": "sp-42",
    "x": 1074,
    "y": 444,
    "width": 10,
    "height": 64,
    "text": ""
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 579,
    "y": 297,
    "width": 123,
    "height": 10,
    "text": ""
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 290,
    "y": 200,
    "width": 123,
    "height": 10,
    "text": ""
  },
  {
    "id": "sp-25",
    "x": 216,
    "y": 385,
    "width": 134,
    "height": 24,
    "text": "SALE PARTNER"
  },
  {
    "id": "sp-26",
    "x": 605,
    "y": 385,
    "width": 70,
    "height": 24,
    "text": "PUBLIC"
  },
  {
    "id": "sp-27",
    "x": 504,
    "y": 469,
    "width": 96,
    "height": 24,
    "text": "PAID USER"
  },
  {
    "id": "sp-28",
    "x": 791,
    "y": 485,
    "width": 42,
    "height": 24,
    "text": "YES"
  },
  {
    "id": "sp-29",
    "x": 912,
    "y": 384,
    "width": 34,
    "height": 24,
    "text": "NO"
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

export function Migso103Template({ data }: { data: BrainData }): ReactElement {
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
