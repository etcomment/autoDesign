import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 640,
    "y": 113,
    "width": 192,
    "height": 157,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 96 0 L 192 157 L 0 157 L 96 0 Z"
  },
  {
    "id": "sp-1",
    "x": 563,
    "y": 277,
    "width": 347,
    "height": 118,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 73 0 L 274 0 L 347 118 L 0 118 L 73 0 Z"
  },
  {
    "id": "sp-2",
    "x": 486,
    "y": 403,
    "width": 501,
    "height": 118,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 72 0 L 429 0 L 501 118 L 0 118 L 72 0 Z"
  },
  {
    "id": "sp-3",
    "x": 409,
    "y": 529,
    "width": 655,
    "height": 118,
    "text": "",
    "pathD": "M 72 0 L 583 0 L 655 118 L 0 118 L 72 0 Z"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 0,
    "x": 489,
    "y": 144,
    "width": 141,
    "height": 36,
    "text": "Your title 04"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 347,
    "y": 184,
    "width": 277,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 1,
    "x": 409,
    "y": 289,
    "width": 141,
    "height": 36,
    "text": "Your title 3"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 267,
    "y": 330,
    "width": 277,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 2,
    "x": 328,
    "y": 415,
    "width": 141,
    "height": 36,
    "text": "Your title 2"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 2,
    "x": 186,
    "y": 455,
    "width": 277,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 3,
    "x": 248,
    "y": 541,
    "width": 141,
    "height": 36,
    "text": "Your title 1"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 3,
    "x": 106,
    "y": 581,
    "width": 277,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 709,
    "y": 192,
    "width": 54,
    "height": 54,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 27 35 C 26 35, 25 36, 25 37 C 25 38, 26 39, 27 39 C 28 39, 29 38, 29 37 C 29 36, 28 35, 27 35 Z M 14 35 C 13 35, 12 36, 12 37 C 12 38, 13 39, 14 39 C 15 39, 16 38, 16 37 C 16 36, 15 35, 14 35 Z M 35 35 L 40 51 L 43 44 C 44 44, 44 44, 44 43 L 51 40 L 35 35 Z M 14 34 C 15 34, 17 35, 17 36 L 24 36 C 24 35, 25 34, 27 34 C 29 34, 30 35, 30 37 C 30 39, 29 40, 27 40 C 25 40, 24 39, 24 38 L 17 38 C 17 39, 15 40, 14 40 C 12 40, 11 39, 11 37 C 11 35, 12 34, 14 34 Z M 27 22 L 25 30 L 29 30 C 30 30, 30 29, 30 29 L 33 22 L 27 22 Z M 19 21 L 18 30 L 24 30 L 25 21 L 19 21 Z M 11 20 L 11 28 C 11 29, 12 30, 13 30 L 16 30 L 17 21 L 11 20 Z M 7 14 C 9 14, 11 16, 11 18 L 34 21 C 34 21, 35 21, 35 21 C 35 22, 35 22, 35 22 L 32 29 C 32 31, 30 31, 29 31 L 13 31 C 11 31, 10 30, 10 28 L 10 19 C 10 17, 8 16, 7 16 C 6 16, 6 16, 6 15 C 6 15, 6 14, 7 14 Z M 24 7 C 33 7, 40 15, 40 24 C 40 26, 40 29, 39 31 C 39 31, 38 31, 38 31 C 38 31, 38 31, 38 31 C 37 31, 37 30, 37 30 C 38 28, 39 26, 39 24 C 39 15, 32 9, 24 9 C 19 9, 15 10, 13 14 C 12 14, 12 14, 11 14 C 11 13, 11 13, 11 12 C 15 9, 19 7, 24 7 Z M 24 2 C 12 2, 2 12, 2 24 C 2 36, 12 46, 24 46 C 28 46, 32 45, 36 42 L 33 34 C 33 34, 33 33, 33 33 C 33 33, 33 33, 34 33 L 42 36 C 45 32, 46 28, 46 24 C 46 12, 36 2, 24 2 Z M 24 0 C 37 0, 48 11, 48 24 C 48 28, 46 33, 44 36 L 53 40 C 54 40, 54 40, 54 40 C 54 41, 54 41, 54 41 L 45 45 L 41 53 C 41 54, 41 54, 40 54 C 40 54, 40 54, 40 53 L 36 44 C 33 46, 28 47, 24 47 C 11 47, 0 37, 0 24 C 0 11, 11 0, 24 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 709,
    "y": 309,
    "width": 54,
    "height": 54,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 9 45 L 3 52 L 51 52 L 45 45 L 31 45 L 28 48 C 27 49, 27 49, 27 49 C 27 49, 27 49, 26 48 L 23 45 L 9 45 Z M 40 25 C 40 24, 41 24, 41 25 C 41 25, 41 25, 41 26 L 35 32 C 34 33, 34 33, 34 33 C 34 33, 34 33, 33 32 C 33 32, 33 32, 33 31 L 40 25 Z M 30 25 C 30 24, 31 24, 31 25 C 31 25, 31 25, 31 26 L 24 32 C 24 33, 24 33, 24 33 C 24 33, 23 33, 23 32 C 23 32, 23 32, 23 31 L 30 25 Z M 19 25 C 20 24, 20 24, 20 25 C 21 25, 21 25, 20 26 L 14 32 C 14 33, 13 33, 13 33 C 13 33, 13 33, 13 32 C 12 32, 12 32, 13 31 L 19 25 Z M 14 18 C 13 19, 11 20, 10 20 L 8 20 L 8 36 L 14 36 C 14 36, 14 36, 14 36 L 27 47 L 40 36 C 40 36, 40 36, 40 36 L 46 36 L 46 20 L 44 20 C 43 20, 41 19, 40 18 C 39 19, 38 20, 36 20 L 31 20 C 30 20, 28 19, 27 18 C 26 19, 24 20, 23 20 L 18 20 C 16 20, 15 19, 14 18 Z M 41 15 L 41 15 C 41 17, 42 19, 44 19 L 49 19 C 51 19, 52 17, 52 15 L 52 15 L 41 15 Z M 28 15 L 28 15 C 28 17, 29 19, 31 19 L 36 19 C 38 19, 39 17, 39 15 L 39 15 L 28 15 Z M 15 15 L 15 15 C 15 17, 16 19, 18 19 L 23 19 C 25 19, 26 17, 26 15 L 26 15 L 15 15 Z M 2 15 L 2 15 C 2 17, 3 19, 5 19 L 10 19 C 12 19, 13 17, 13 15 L 13 15 L 2 15 Z M 38 8 L 41 13 L 51 13 L 46 8 L 38 8 Z M 28 8 L 28 13 L 39 13 L 36 8 L 28 8 Z M 18 8 L 15 13 L 26 13 L 26 8 L 18 8 Z M 8 8 L 3 13 L 13 13 L 16 8 L 8 8 Z M 8 2 L 8 7 L 46 7 L 46 2 L 8 2 Z M 7 0 L 47 0 C 47 0, 47 0, 47 1 L 47 7 L 54 13 C 54 13, 54 14, 54 14 L 54 15 C 54 18, 52 20, 49 20 L 47 20 L 47 37 C 47 37, 47 37, 47 37 L 40 37 L 33 44 L 46 44 C 46 44, 46 44, 46 44 L 54 53 C 54 53, 54 53, 54 53 C 54 54, 54 54, 53 54 L 1 54 C 1 54, 0 54, 0 53 C 0 53, 0 53, 0 53 L 8 44 C 8 44, 8 44, 8 44 L 21 44 L 14 37 L 7 37 C 7 37, 7 37, 7 37 L 7 20 L 5 20 C 2 20, 0 18, 0 15 L 0 14 C 0 14, 0 13, 0 13 L 7 7 L 7 1 C 7 0, 7 0, 7 0 Z"
  },
  {
    "id": "sp-14",
    "x": 709,
    "y": 564,
    "width": 54,
    "height": 48,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 42 41 C 43 41, 43 41, 43 42 C 43 42, 43 42, 42 42 C 42 42, 41 42, 41 42 C 41 41, 42 41, 42 41 Z M 14 41 C 14 41, 15 41, 15 42 C 15 42, 14 42, 14 42 C 14 42, 13 42, 13 42 C 13 41, 14 41, 14 41 Z M 42 37 C 40 37, 38 39, 38 42 C 38 44, 40 46, 42 46 C 45 46, 47 44, 47 42 C 47 39, 45 37, 42 37 Z M 14 37 C 11 37, 9 39, 9 42 C 9 44, 11 46, 14 46 C 16 46, 18 44, 18 42 C 18 39, 16 37, 14 37 Z M 2 33 L 2 39 C 2 40, 2 41, 3 41 L 8 41 C 8 38, 11 35, 14 35 C 17 35, 20 38, 20 41 L 31 41 L 31 33 L 2 33 Z M 37 31 L 41 31 C 41 31, 42 31, 42 32 C 42 32, 41 32, 41 32 L 37 32 C 36 32, 36 32, 36 32 C 36 31, 36 31, 37 31 Z M 22 17 L 22 22 L 23 21 C 24 21, 24 21, 24 21 L 26 22 L 26 17 L 22 17 Z M 17 17 L 17 31 L 31 31 L 31 17 L 27 17 L 27 23 C 27 23, 27 23, 27 24 C 27 24, 26 24, 26 24 L 24 23 L 21 24 C 21 24, 21 24, 21 24 C 21 24, 21 24, 21 24 C 20 23, 20 23, 20 23 L 20 17 L 17 17 Z M 6 17 L 6 22 L 8 21 C 8 21, 8 21, 8 21 C 9 21, 9 21, 9 21 L 10 22 L 10 17 L 6 17 Z M 2 17 L 2 31 L 15 31 L 15 17 L 12 17 L 12 23 C 12 23, 12 23, 12 24 C 11 24, 11 24, 11 24 C 11 24, 11 24, 11 24 L 8 23 L 6 24 C 6 24, 5 24, 5 24 C 5 23, 5 23, 5 23 L 5 17 L 2 17 Z M 38 12 L 38 22 C 38 24, 39 25, 41 25 L 48 25 L 43 14 C 42 13, 41 12, 39 12 L 38 12 Z M 32 12 L 32 41 L 36 41 C 36 38, 39 35, 42 35 C 45 35, 48 38, 49 41 L 51 41 C 52 41, 52 40, 52 39 L 52 37 L 50 37 C 49 37, 49 37, 49 36 C 49 36, 49 35, 50 35 L 52 35 L 52 32 L 50 32 C 49 32, 49 32, 49 32 C 49 31, 49 31, 50 31 L 52 31 L 52 31 C 52 29, 51 27, 49 27 L 41 27 C 38 27, 36 25, 36 22 L 36 12 L 32 12 Z M 14 2 L 14 6 L 16 5 C 16 5, 16 5, 16 5 L 18 6 L 18 2 L 14 2 Z M 9 2 L 9 15 L 23 15 L 23 2 L 20 2 L 20 7 C 20 8, 19 8, 19 8 C 19 8, 19 8, 19 8 C 19 8, 19 8, 18 8 L 16 7 L 14 8 C 13 8, 13 8, 13 8 C 13 8, 13 8, 13 7 L 13 2 L 9 2 Z M 8 0 L 24 0 C 24 0, 25 0, 25 1 L 25 15 L 31 15 L 31 11 C 31 10, 31 10, 31 10 L 39 10 C 41 10, 43 11, 44 14 L 49 25 C 52 26, 54 28, 54 31 L 54 39 C 54 41, 53 43, 51 43 L 49 43 C 48 46, 45 48, 42 48 C 39 48, 36 46, 36 43 L 20 43 C 20 46, 17 48, 14 48 C 11 48, 8 46, 8 43 L 3 43 C 1 43, 0 41, 0 39 L 0 32 L 0 16 C 0 16, 0 15, 1 15 L 8 15 L 8 1 C 8 0, 8 0, 8 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 709,
    "y": 435,
    "width": 54,
    "height": 54,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 4 39 C 5 39, 5 39, 5 39 C 5 40, 5 40, 4 40 C 4 40, 4 40, 4 39 C 4 39, 4 39, 4 39 Z M 49 38 C 48 38, 46 39, 45 40 C 43 40, 41 41, 38 42 C 38 42, 38 43, 38 43 C 38 44, 38 44, 38 44 C 42 43, 46 42, 48 41 C 48 41, 48 41, 48 41 C 49 40, 49 39, 49 39 C 49 39, 49 39, 49 38 Z M 8 37 L 8 50 C 12 51, 34 57, 51 44 C 51 43, 52 43, 52 42 C 52 42, 52 42, 52 41 C 52 41, 50 42, 48 42 C 46 43, 42 45, 36 46 C 34 47, 32 47, 30 47 C 28 47, 25 47, 22 47 C 22 47, 22 46, 22 46 C 22 45, 22 45, 23 45 C 30 46, 33 45, 35 45 C 36 44, 37 44, 37 43 C 37 42, 36 42, 36 41 C 35 40, 34 40, 34 40 C 26 41, 25 40, 23 39 C 22 38, 20 37, 8 37 Z M 2 37 L 2 50 L 7 50 L 7 37 L 2 37 Z M 1 35 L 8 35 C 20 35, 22 36, 24 37 C 26 38, 27 39, 34 39 C 34 39, 36 39, 37 40 C 37 40, 37 40, 38 41 C 40 40, 42 39, 44 38 C 47 37, 49 36, 50 37 C 51 38, 51 38, 51 39 C 51 39, 51 39, 51 40 C 52 39, 52 39, 53 40 C 54 41, 54 42, 54 42 C 54 44, 52 45, 52 45 C 43 52, 33 54, 25 54 C 16 54, 9 52, 8 51 L 1 51 C 0 51, 0 51, 0 51 L 0 36 C 0 35, 0 35, 1 35 Z M 35 2 L 35 9 L 50 9 L 50 2 L 35 2 Z M 27 2 L 27 18 L 30 17 C 30 16, 30 16, 30 16 C 30 16, 30 16, 30 17 L 34 18 L 34 2 L 27 2 Z M 10 2 L 10 9 L 25 9 L 25 2 L 10 2 Z M 9 0 L 51 0 C 51 0, 52 0, 52 1 L 52 10 C 52 10, 51 10, 51 10 L 49 10 L 49 34 C 49 35, 49 35, 48 35 C 48 35, 48 35, 48 34 L 48 10 L 35 10 L 35 19 C 35 20, 35 20, 35 20 C 35 20, 35 20, 34 20 C 34 20, 34 20, 34 20 L 30 18 L 26 20 C 26 20, 26 20, 25 20 C 25 20, 25 20, 25 19 L 25 10 L 13 10 L 13 33 C 13 33, 12 34, 12 34 C 11 34, 11 33, 11 33 L 11 10 L 9 10 C 9 10, 8 10, 8 10 L 8 1 C 8 0, 9 0, 9 0 Z"
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

export function Migso189Template({ data }: { data: BrainData }): ReactElement {
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
