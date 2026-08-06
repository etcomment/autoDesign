import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "grp-0",
    "isGroup": true,
    "children": [
      {
        "id": "sp-10",
        "x": 401.02873030583874,
        "y": 129,
        "width": 509.4717330861909,
        "height": 318.66805411030174,
        "localPctX": 0.05746061167747914,
        "localPctY": 0,
        "localPctW": 0.943466172381835,
        "localPctH": 0.6638917793964619,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 240 0 C 368 0, 473 101, 480 227 L 480 233 L 509 233 L 402 319 L 295 233 L 326 233 L 326 231 C 321 188, 284 154, 240 154 C 200 154, 167 180, 157 215 L 155 224 L 76 161 L 0 222 L 2 204 C 19 89, 119 0, 240 0 Z"
      },
      {
        "id": "sp-11",
        "x": 370,
        "y": 290.33194588969826,
        "width": 509.97219647822055,
        "height": 318.66805411030174,
        "localPctX": 0,
        "localPctY": 0.33610822060353807,
        "localPctW": 0.9443929564411492,
        "localPctH": 0.6638917793964619,
        "fillColor": "#3365cc",
        "text": "",
        "pathD": "M 107 0 L 214 86 L 184 86 L 184 88 C 189 131, 226 165, 270 165 C 310 165, 343 139, 353 103 L 355 95 L 433 158 L 510 96 L 508 115 C 491 230, 391 319, 270 319 C 142 319, 37 218, 30 91 L 30 86 L 0 86 Z"
      }
    ],
    "x": 370,
    "y": 129,
    "width": 540,
    "height": 480
  },
  {
    "id": "sp-0",
    "dataNodeIdx": 0,
    "x": 621,
    "y": 179,
    "width": 64,
    "height": 58,
    "text": "1"
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 1,
    "x": 592,
    "y": 507,
    "width": 64,
    "height": 58,
    "text": "2"
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 1,
    "x": 926,
    "y": 290,
    "width": 141,
    "height": 36,
    "text": "Your title 2"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 926,
    "y": 330,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 0,
    "x": 212,
    "y": 290,
    "width": 141,
    "height": 36,
    "text": "Your title 1"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 79,
    "y": 330,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-6",
    "x": 442,
    "y": 333,
    "width": 68,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 57 62 C 55 62, 53 64, 53 66 L 62 66 C 61 64, 59 62, 57 62 Z M 11 62 C 9 62, 7 64, 6 66 L 15 66 C 14 64, 13 62, 11 62 Z M 24 60 C 21 60, 18 62, 17 66 L 32 66 C 31 62, 28 60, 24 60 Z M 42 58 C 38 58, 34 62, 34 66 L 51 66 C 50 62, 47 58, 42 58 Z M 12 37 C 12 45, 19 52, 27 52 L 32 52 C 31 43, 24 37, 16 37 L 12 37 Z M 49 32 C 41 32, 34 38, 34 46 L 38 46 C 46 46, 53 40, 54 32 L 49 32 Z M 41 14 C 42 14, 42 14, 42 15 C 42 15, 42 16, 41 16 C 40 16, 40 15, 40 15 C 40 14, 40 14, 41 14 Z M 24 14 C 25 14, 25 14, 25 15 C 25 15, 25 16, 24 16 C 24 16, 23 15, 23 15 C 23 14, 24 14, 24 14 Z M 33 5 C 33 5, 34 5, 34 6 L 34 7 C 35 7, 37 8, 37 9 C 37 10, 37 11, 37 11 C 36 11, 36 11, 35 10 C 35 9, 34 9, 33 9 C 31 9, 30 10, 30 11 C 30 13, 31 14, 33 14 C 36 14, 38 16, 38 18 C 38 20, 36 22, 34 23 L 34 24 C 34 24, 33 25, 33 25 C 32 25, 32 24, 32 24 L 32 23 C 30 22, 29 21, 28 20 C 28 19, 28 19, 29 18 C 29 18, 30 18, 30 19 C 30 20, 32 21, 33 21 C 34 21, 36 20, 36 18 C 36 17, 35 16, 33 16 C 29 16, 28 13, 28 11 C 28 9, 30 7, 32 7 L 32 6 C 32 5, 32 5, 33 5 Z M 33 2 C 26 2, 20 8, 20 15 C 20 22, 26 28, 33 28 C 40 28, 45 22, 45 15 C 45 8, 40 2, 33 2 Z M 33 0 C 41 0, 47 7, 47 15 C 47 23, 41 29, 34 30 L 34 39 C 37 33, 42 30, 49 30 L 55 30 C 55 30, 56 30, 56 31 C 56 40, 48 48, 38 48 L 34 48 L 34 61 C 36 58, 39 56, 42 56 C 47 56, 51 59, 52 63 C 53 61, 55 61, 57 61 C 61 61, 63 63, 64 66 L 67 66 C 67 66, 68 66, 68 67 C 68 68, 67 68, 67 68 L 1 68 C 1 68, 0 68, 0 67 C 0 66, 1 66, 1 66 L 4 66 C 5 63, 7 61, 11 61 C 13 61, 15 62, 16 63 C 17 60, 21 58, 24 58 C 27 58, 30 59, 32 61 L 32 54 L 27 54 C 17 54, 10 46, 10 36 C 10 35, 10 35, 11 35 L 16 35 C 23 35, 29 39, 32 44 L 32 30 C 24 29, 18 23, 18 15 C 18 7, 25 0, 33 0 Z"
  },
  {
    "id": "sp-7",
    "x": 770,
    "y": 333,
    "width": 63,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 28 24 C 26 24, 25 26, 25 28 C 25 30, 26 31, 28 31 C 30 31, 31 30, 31 28 C 31 26, 30 24, 28 24 Z M 28 22 C 31 22, 33 25, 33 28 C 33 31, 31 33, 28 33 C 25 33, 22 31, 22 28 C 22 25, 25 22, 28 22 Z M 28 18 C 23 18, 19 23, 19 28 C 19 31, 21 34, 24 36 C 24 36, 24 37, 24 37 L 24 62 L 28 65 L 31 63 L 29 61 C 29 60, 29 59, 29 58 L 31 57 L 30 56 C 29 55, 29 53, 30 53 L 31 51 L 30 50 C 29 50, 29 49, 29 49 C 29 48, 29 47, 30 47 L 32 45 L 32 37 C 32 37, 32 36, 32 36 C 36 34, 37 31, 37 28 C 37 23, 33 18, 28 18 Z M 28 16 C 34 16, 40 21, 40 28 C 40 32, 37 35, 34 38 L 34 45 C 34 45, 34 46, 34 46 L 31 48 L 32 49 L 33 51 C 33 51, 33 52, 33 52 L 31 54 L 32 55 L 33 56 C 33 56, 33 57, 33 57 C 33 57, 33 57, 33 58 L 31 60 L 33 62 C 33 62, 33 62, 33 63 C 33 63, 33 63, 33 63 L 29 68 C 28 68, 28 68, 28 68 C 28 68, 27 68, 27 68 L 23 63 C 22 63, 22 63, 22 62 L 22 38 C 19 35, 17 32, 17 28 C 17 21, 22 16, 28 16 Z M 28 10 C 33 10, 38 11, 41 15 C 44 18, 46 23, 46 28 C 46 33, 44 37, 41 41 C 41 41, 41 41, 40 41 C 40 41, 40 41, 40 41 C 39 40, 39 40, 40 39 C 43 36, 44 32, 44 28 C 44 23, 43 19, 40 16 C 37 13, 32 12, 28 12 C 24 12, 20 13, 17 16 C 14 19, 12 23, 12 28 C 12 32, 14 36, 17 39 C 17 40, 17 40, 17 41 C 16 41, 16 41, 15 41 C 12 37, 10 33, 10 28 C 10 23, 12 18, 15 15 C 19 11, 23 10, 28 10 Z M 28 0 C 43 0, 56 12, 56 28 C 56 28, 57 32, 62 37 C 62 38, 63 39, 63 41 C 63 41, 62 42, 61 43 C 59 44, 57 45, 56 46 C 56 48, 57 52, 56 55 C 55 59, 49 60, 45 60 C 44 60, 43 60, 43 62 L 43 67 C 43 67, 42 68, 42 68 C 41 68, 41 67, 41 67 L 41 62 C 41 59, 42 58, 45 58 C 50 58, 54 56, 54 55 C 55 51, 54 45, 54 45 C 54 45, 54 44, 54 44 C 54 44, 58 43, 60 41 C 61 41, 61 41, 61 40 C 61 40, 61 39, 60 38 C 55 32, 54 28, 54 28 L 54 28 C 54 14, 42 2, 28 2 C 14 2, 2 14, 2 28 C 2 32, 3 37, 6 41 C 6 41, 6 41, 6 41 C 6 42, 7 44, 8 45 C 10 48, 11 50, 12 52 C 14 57, 15 67, 15 67 C 15 67, 14 68, 14 68 C 13 68, 13 67, 13 67 C 13 67, 12 57, 10 53 C 9 51, 8 49, 6 46 C 6 45, 5 43, 4 42 C 4 42, 4 42, 4 42 C 1 38, 0 33, 0 28 C 0 12, 13 0, 28 0 Z"
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

export function Migso54Template({ data }: { data: BrainData }): ReactElement {
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
