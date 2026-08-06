import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 388,
    "y": 161,
    "width": 454,
    "height": 480,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 227 0 L 454 0 L 340 240 L 227 480 L 114 240 L 0 0 L 227 0 Z"
  },
  {
    "id": "sp-1",
    "x": 365,
    "y": 143,
    "width": 500,
    "height": 53,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 477 0 C 477 0, 477 0, 477 0 C 251 0, 251 0, 251 0 C 249 0, 249 0, 249 0 C 23 0, 23 0, 23 0 C 23 0, 23 0, 23 0 C 10 1, 0 12, 0 26 C 0 41, 10 52, 23 53 C 23 53, 23 53, 23 53 C 249 53, 249 53, 249 53 C 251 53, 251 53, 251 53 C 477 53, 477 53, 477 53 C 477 53, 477 53, 477 53 C 490 52, 500 41, 500 26 C 500 12, 490 1, 477 0 Z"
  },
  {
    "id": "sp-2",
    "x": 400,
    "y": 222,
    "width": 429,
    "height": 53,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 405 0 C 405 0, 405 0, 405 0 C 216 0, 216 0, 216 0 C 214 0, 214 0, 214 0 C 24 0, 24 0, 24 0 C 24 0, 24 0, 24 0 C 11 0, 0 12, 0 27 C 0 41, 11 53, 24 53 C 214 53, 214 53, 214 53 C 216 53, 216 53, 216 53 C 405 53, 405 53, 405 53 C 418 53, 429 41, 429 27 C 429 12, 418 0, 405 0 Z"
  },
  {
    "id": "sp-3",
    "x": 442,
    "y": 301,
    "width": 345,
    "height": 53,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 322 0 C 322 0, 322 0, 322 0 C 174 0, 174 0, 174 0 C 172 0, 172 0, 172 0 C 23 0, 23 0, 23 0 C 23 0, 23 0, 23 0 C 10 1, 0 12, 0 27 C 0 41, 10 52, 23 53 C 23 53, 23 53, 23 53 C 172 53, 172 53, 172 53 C 174 53, 174 53, 174 53 C 322 53, 322 53, 322 53 C 322 53, 322 53, 322 53 C 335 52, 345 41, 345 27 C 345 12, 335 1, 322 0 Z"
  },
  {
    "id": "sp-4",
    "x": 481,
    "y": 381,
    "width": 267,
    "height": 53,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 243 0 C 135 0, 135 0, 135 0 C 132 0, 132 0, 132 0 C 24 0, 24 0, 24 0 C 11 0, 0 12, 0 26 C 0 41, 11 53, 24 53 C 132 53, 132 53, 132 53 C 135 53, 135 53, 135 53 C 243 53, 243 53, 243 53 C 256 53, 267 41, 267 26 C 267 12, 256 0, 243 0 Z"
  },
  {
    "id": "sp-5",
    "x": 516,
    "y": 460,
    "width": 198,
    "height": 53,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 174 0 C 174 0, 174 0, 174 0 C 100 0, 100 0, 100 0 C 98 0, 98 0, 98 0 C 24 0, 24 0, 24 0 C 24 0, 24 0, 24 0 C 11 0, 0 12, 0 27 C 0 41, 11 53, 24 53 C 98 53, 98 53, 98 53 C 100 53, 100 53, 100 53 C 174 53, 174 53, 174 53 C 187 53, 198 41, 198 27 C 198 12, 187 0, 174 0 Z"
  },
  {
    "id": "sp-6",
    "x": 546,
    "y": 539,
    "width": 138,
    "height": 53,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 113 0 C 113 0, 113 0, 113 0 C 70 0, 70 0, 70 0 C 68 0, 68 0, 68 0 C 25 0, 25 0, 25 0 C 25 0, 25 0, 25 0 C 11 0, 0 12, 0 27 C 0 41, 11 53, 25 53 C 68 53, 68 53, 68 53 C 70 53, 70 53, 70 53 C 113 53, 113 53, 113 53 C 127 53, 138 41, 138 27 C 138 12, 127 0, 113 0 Z"
  },
  {
    "id": "grp-7",
    "isGroup": true,
    "children": [
      {
        "id": "sp-21",
        "x": 871,
        "y": 145,
        "width": 39,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.007692307692307693,
        "text": ""
      },
      {
        "id": "sp-22",
        "x": 871,
        "y": 275,
        "width": 39,
        "height": 10,
        "localPctX": 0,
        "localPctY": 1,
        "localPctW": 1,
        "localPctH": 0.007692307692307693,
        "text": ""
      },
      {
        "id": "sp-23",
        "x": 910,
        "y": 145,
        "width": 10,
        "height": 130,
        "localPctX": 1,
        "localPctY": 0,
        "localPctW": 0.02564102564102564,
        "localPctH": 1,
        "text": ""
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 871,
    "y": 145,
    "width": 39,
    "height": 130
  },
  {
    "id": "grp-11",
    "isGroup": true,
    "children": [
      {
        "id": "sp-24",
        "x": 388,
        "y": 304,
        "width": 39,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.007692307692307693,
        "strokeColor": "#ff4d38",
        "text": ""
      },
      {
        "id": "sp-25",
        "x": 388,
        "y": 434,
        "width": 39,
        "height": 10,
        "localPctX": 0,
        "localPctY": 1,
        "localPctW": 1,
        "localPctH": 0.007692307692307693,
        "strokeColor": "#ff4d38",
        "text": ""
      },
      {
        "id": "sp-26",
        "x": 427,
        "y": 304,
        "width": 10,
        "height": 130,
        "localPctX": 1,
        "localPctY": 0,
        "localPctW": 0.02564102564102564,
        "localPctH": 1,
        "strokeColor": "#ff4d38",
        "text": ""
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 388,
    "y": 304,
    "width": 39,
    "height": 130
  },
  {
    "id": "grp-15",
    "isGroup": true,
    "children": [
      {
        "id": "sp-27",
        "x": 724,
        "y": 460,
        "width": 39,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.007575757575757576,
        "strokeColor": "#52c49c",
        "text": ""
      },
      {
        "id": "sp-28",
        "x": 724,
        "y": 592,
        "width": 39,
        "height": 10,
        "localPctX": 0,
        "localPctY": 1,
        "localPctW": 1,
        "localPctH": 0.007575757575757576,
        "strokeColor": "#52c49c",
        "text": ""
      },
      {
        "id": "sp-29",
        "x": 763,
        "y": 460,
        "width": 10,
        "height": 132,
        "localPctX": 1,
        "localPctY": 0,
        "localPctW": 0.02564102564102564,
        "localPctH": 1,
        "strokeColor": "#52c49c",
        "text": ""
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 724,
    "y": 460,
    "width": 39,
    "height": 132
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 0,
    "x": 927,
    "y": 156,
    "width": 121,
    "height": 37,
    "text": "Title here"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 0,
    "x": 921,
    "y": 192,
    "width": 279,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 1,
    "x": 251,
    "y": 306,
    "width": 121,
    "height": 37,
    "text": "Title here"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 1,
    "x": 99,
    "y": 342,
    "width": 279,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 0,
    "x": 572,
    "y": 151,
    "width": 85,
    "height": 37,
    "text": "Title 1"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 1,
    "x": 572,
    "y": 230,
    "width": 85,
    "height": 37,
    "text": "Title 2"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 2,
    "x": 572,
    "y": 309,
    "width": 85,
    "height": 37,
    "text": "Title 3"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 3,
    "x": 572,
    "y": 389,
    "width": 85,
    "height": 37,
    "text": "Title 4"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 4,
    "x": 572,
    "y": 468,
    "width": 85,
    "height": 37,
    "text": "Title 5"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 5,
    "x": 572,
    "y": 547,
    "width": 85,
    "height": 37,
    "text": "Title 6"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 781,
    "y": 471,
    "width": 121,
    "height": 37,
    "text": "Title here"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 2,
    "x": 776,
    "y": 507,
    "width": 279,
    "height": 58,
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

export function Migso108Template({ data }: { data: BrainData }): ReactElement {
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
