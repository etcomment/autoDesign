import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "dataNodeIdx": 2,
    "x": 680,
    "y": 419,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-1",
    "x": 674,
    "y": 454,
    "width": 529,
    "height": 34,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 3,
    "x": 624,
    "y": 564,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-3",
    "x": 618,
    "y": 599,
    "width": 553,
    "height": 34,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-4",
    "x": 122,
    "y": 188,
    "width": 376,
    "height": 376,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 188 376 L 188 376 C 292 376, 376 292, 376 188 L 376 188 C 376 84, 292 0, 188 0 L 188 0 C 84 0, 0 84, 0 188 L 0 188 C 0 292, 84 376, 188 376"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 310,
    "y": 161,
    "width": 215,
    "height": 430,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 0 174 C 23 174, 41 192, 41 215 C 41 237, 23 255, 0 255 Z M 0 88 C 70 88, 127 145, 127 215 C 127 285, 70 342, 0 342 L 0 293 C 43 293, 78 258, 78 215 C 78 172, 43 137, 0 137 Z M 0 0 C 118 0, 215 96, 215 215 C 215 333, 119 430, 0 430 L 0 381 C 92 381, 166 306, 166 215 C 166 123, 92 49, 0 49 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 95,
    "y": 161,
    "width": 215,
    "height": 430,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 215 175 L 215 255 C 192 255, 174 237, 174 215 C 174 193, 192 175, 215 175 Z M 215 88 L 215 137 C 171 137, 136 172, 136 215 C 136 258, 172 293, 215 293 L 215 342 C 145 342, 88 285, 88 215 C 88 145, 145 88, 215 88 Z M 215 0 L 215 49 C 123 49, 49 123, 49 215 C 49 307, 123 381, 215 381 L 215 430 C 97 430, 0 334, 0 215 C 0 97, 96 0, 215 0 Z"
  },
  {
    "id": "grp-7",
    "isGroup": true,
    "children": [
      {
        "id": "sp-13",
        "x": 469.29172932330823,
        "y": 180.97512437810943,
        "width": 13.479699248120301,
        "height": 288.55721393034827,
        "localPctX": 0.41654135338345855,
        "localPctY": -0.9502487562189057,
        "localPctW": 0.0406015037593985,
        "localPctH": 2.8855721393034828,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 0 9 L 0 9 C 0 4, 3 0, 7 0 L 7 0 C 10 0, 13 4, 13 9 L 13 279 L 13 279 C 13 284, 10 289, 7 289 L 7 289 C 3 289, 0 284, 0 279 L 0 9"
      },
      {
        "id": "sp-14",
        "x": 568.1428571428571,
        "y": 276,
        "width": 94.85714285714286,
        "height": 100,
        "localPctX": 0.7142857142857142,
        "localPctY": 0,
        "localPctW": 0.28571428571428575,
        "localPctH": 1,
        "fillColor": "#ff4d38",
        "text": ""
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 331,
    "y": 276,
    "width": 332,
    "height": 100
  },
  {
    "id": "grp-10",
    "isGroup": true,
    "children": [
      {
        "id": "sp-15",
        "x": 403.5,
        "y": 105.5,
        "width": 13.5,
        "height": 290,
        "localPctX": 0.4410828025477707,
        "localPctY": -0.20238095238095238,
        "localPctW": 0.042993630573248405,
        "localPctH": 2.3015873015873014,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 0 9 L 0 9 C 0 4, 3 0, 7 0 L 7 0 C 10 0, 13 4, 13 9 L 13 281 L 13 281 C 13 286, 10 290, 7 290 L 7 290 C 3 290, 0 286, 0 281 L 0 9"
      },
      {
        "id": "sp-16",
        "x": 484,
        "y": 131,
        "width": 95,
        "height": 100.5,
        "localPctX": 0.697452229299363,
        "localPctY": 0,
        "localPctW": 0.30254777070063693,
        "localPctH": 0.7976190476190477,
        "fillColor": "#3365cc",
        "text": ""
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 265,
    "y": 131,
    "width": 314,
    "height": 126
  },
  {
    "id": "grp-13",
    "isGroup": true,
    "children": [
      {
        "id": "sp-17",
        "x": 405.2187004754358,
        "y": 361,
        "width": 13.521394611727416,
        "height": 290,
        "localPctX": 0.43740095087163233,
        "localPctY": -1.104,
        "localPctW": 0.042789223454833596,
        "localPctH": 2.32,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 0 9 L 0 9 C 0 4, 3 0, 7 0 L 7 0 C 10 0, 13 4, 13 9 L 13 281 L 13 281 C 13 286, 10 290, 7 290 L 7 290 C 3 290, 0 286, 0 281 L 0 9"
      },
      {
        "id": "sp-18",
        "x": 485.3454833597465,
        "y": 526.5,
        "width": 95.15055467511885,
        "height": 100.5,
        "localPctX": 0.6909667194928686,
        "localPctY": 0.22,
        "localPctW": 0.3011093502377179,
        "localPctH": 0.804,
        "fillColor": "#ffb900",
        "text": ""
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 267,
    "y": 499,
    "width": 316,
    "height": 125
  },
  {
    "id": "grp-16",
    "isGroup": true,
    "children": [
      {
        "id": "sp-19",
        "x": 470.29172932330823,
        "y": 287.9751243781094,
        "width": 13.479699248120301,
        "height": 288.55721393034827,
        "localPctX": 0.41654135338345855,
        "localPctY": -0.950248756218906,
        "localPctW": 0.0406015037593985,
        "localPctH": 2.8855721393034828,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 0 9 L 0 9 C 0 4, 3 0, 7 0 L 7 0 C 10 0, 13 4, 13 9 L 13 279 L 13 279 C 13 284, 10 289, 7 289 L 7 289 C 3 289, 0 284, 0 279 L 0 9"
      },
      {
        "id": "sp-20",
        "x": 569.1428571428571,
        "y": 383,
        "width": 94.85714285714286,
        "height": 100,
        "localPctX": 0.7142857142857142,
        "localPctY": 0,
        "localPctW": 0.28571428571428575,
        "localPctH": 1,
        "fillColor": "#52c49c",
        "text": ""
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 332,
    "y": 383,
    "width": 332,
    "height": 100
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 680,
    "y": 250,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-8",
    "x": 674,
    "y": 285,
    "width": 510,
    "height": 35,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 630,
    "y": 104,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-10",
    "x": 624,
    "y": 139,
    "width": 579,
    "height": 35,
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

export function Migso121Template({ data }: { data: BrainData }): ReactElement {
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
