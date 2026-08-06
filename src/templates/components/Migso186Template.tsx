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
    "x": 80,
    "y": 138,
    "width": 242,
    "height": 506,
    "text": "",
    "pathD": "M 10 0 L 232 0 Q 242 0 242 10 L 242 496 Q 242 506 232 506 L 10 506 Q 0 506 0 496 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 113,
    "y": 171,
    "width": 177,
    "height": 177,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 89 0 A 89 89 0 1 1 88 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 373,
    "y": 138,
    "width": 242,
    "height": 506,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 10 0 L 232 0 Q 242 0 242 10 L 242 496 Q 242 506 232 506 L 10 506 Q 0 506 0 496 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 405,
    "y": 171,
    "width": 177,
    "height": 177,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 89 0 A 89 89 0 1 1 88 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 665,
    "y": 138,
    "width": 242,
    "height": 506,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 10 0 L 232 0 Q 242 0 242 10 L 242 496 Q 242 506 232 506 L 10 506 Q 0 506 0 496 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 698,
    "y": 171,
    "width": 177,
    "height": 177,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 89 0 A 89 89 0 1 1 88 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 958,
    "y": 138,
    "width": 242,
    "height": 506,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 10 0 L 232 0 Q 242 0 242 10 L 242 496 Q 242 506 232 506 L 10 506 Q 0 506 0 496 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 990,
    "y": 171,
    "width": 177,
    "height": 177,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 89 0 A 89 89 0 1 1 88 0 Z"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 0,
    "x": 131,
    "y": 399,
    "width": 141,
    "height": 36,
    "text": "Your title 01"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 104,
    "y": 440,
    "width": 194,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 1,
    "x": 423,
    "y": 399,
    "width": 141,
    "height": 36,
    "text": "Your title 2"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 1,
    "x": 397,
    "y": 440,
    "width": 194,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 2,
    "x": 716,
    "y": 399,
    "width": 141,
    "height": 36,
    "text": "Your title 3"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 2,
    "x": 689,
    "y": 440,
    "width": 194,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 3,
    "x": 1008,
    "y": 399,
    "width": 141,
    "height": 36,
    "text": "Your title 4"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 3,
    "x": 982,
    "y": 440,
    "width": 194,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 164,
    "y": 222,
    "width": 74,
    "height": 74,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 25 65 L 25 72 L 49 72 L 49 65 L 25 65 Z M 2 56 L 2 61 C 2 62, 3 63, 4 63 L 70 63 C 71 63, 72 62, 72 61 L 72 56 L 2 56 Z M 32 39 C 32 39, 33 39, 34 39 C 34 39, 34 40, 34 40 C 34 40, 34 41, 34 41 C 33 41, 33 41, 33 41 C 33 41, 32 41, 32 41 C 32 41, 32 40, 32 40 C 32 40, 32 39, 32 39 Z M 56 38 L 56 45 L 59 45 C 61 45, 63 43, 63 41 C 63 39, 61 38, 59 38 L 56 38 Z M 14 38 C 13 38, 11 39, 11 41 C 11 43, 13 45, 14 45 L 18 45 L 18 38 L 14 38 Z M 33 33 C 33 33, 34 33, 34 34 C 34 35, 33 35, 33 35 C 32 35, 32 35, 32 34 C 32 33, 32 33, 33 33 Z M 33 20 C 33 20, 34 21, 34 21 L 34 28 C 34 28, 33 29, 33 29 C 32 29, 32 28, 32 28 L 32 21 C 32 21, 32 20, 33 20 Z M 26 20 C 26 20, 27 21, 27 21 L 27 40 C 27 41, 26 41, 26 41 C 25 41, 24 41, 24 40 L 24 21 C 24 21, 25 20, 26 20 Z M 48 15 L 48 45 L 54 45 L 54 17 C 54 16, 53 15, 52 15 L 48 15 Z M 41 15 L 41 45 L 46 45 L 46 15 L 41 15 Z M 22 15 C 21 15, 20 16, 20 17 L 20 45 L 39 45 L 39 15 L 22 15 Z M 22 13 L 40 13 L 47 13 L 52 13 C 54 13, 56 15, 56 17 L 56 36 L 59 36 C 62 36, 65 38, 65 41 C 65 44, 62 47, 59 47 L 14 47 C 11 47, 9 44, 9 41 C 9 38, 11 36, 14 36 L 18 36 L 18 17 C 18 15, 20 13, 22 13 Z M 66 6 C 66 6, 67 6, 68 6 C 68 6, 68 6, 68 7 C 68 7, 68 7, 68 8 C 67 8, 67 8, 67 8 C 66 8, 66 8, 66 8 C 66 7, 66 7, 66 7 C 66 6, 66 6, 66 6 Z M 54 6 C 54 6, 55 6, 56 6 C 56 6, 56 6, 56 7 C 56 7, 56 7, 56 8 C 55 8, 55 8, 55 8 C 55 8, 54 8, 54 8 C 54 7, 54 7, 54 7 C 54 6, 54 6, 54 6 Z M 61 6 C 61 6, 62 7, 62 7 C 62 8, 61 8, 61 8 C 60 8, 60 8, 60 7 C 60 7, 60 6, 61 6 Z M 4 2 C 3 2, 2 3, 2 4 L 2 54 L 72 54 L 72 4 C 72 3, 71 2, 70 2 L 4 2 Z M 4 0 L 70 0 C 72 0, 74 2, 74 4 L 74 61 C 74 63, 72 65, 70 65 L 52 65 L 52 72 L 59 72 C 60 72, 61 72, 61 73 C 61 74, 60 74, 59 74 L 15 74 C 14 74, 14 74, 14 73 C 14 72, 14 72, 15 72 L 22 72 L 22 65 L 4 65 C 2 65, 0 63, 0 61 L 0 4 C 0 2, 2 0, 4 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 457,
    "y": 222,
    "width": 74,
    "height": 74,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 20 52 C 20 52, 21 53, 21 53 C 21 54, 20 54, 20 54 C 19 54, 18 54, 18 53 C 18 53, 19 52, 20 52 Z M 16 37 L 16 57 L 23 57 L 23 37 L 16 37 Z M 37 14 C 36 14, 35 14, 35 14 C 35 16, 36 20, 35 22 C 34 26, 31 29, 29 31 C 27 33, 25 35, 25 36 L 25 57 L 52 57 C 52 57, 52 57, 52 57 C 54 56, 55 55, 55 53 C 55 53, 55 52, 55 52 C 54 51, 54 51, 55 51 C 55 50, 55 50, 55 50 C 57 50, 58 48, 58 47 C 58 46, 58 45, 57 45 C 57 45, 57 44, 57 44 C 57 44, 57 43, 57 43 C 58 42, 59 42, 59 41 C 59 39, 58 38, 57 38 C 56 38, 56 38, 56 37 C 56 36, 56 36, 57 36 C 57 36, 58 35, 58 33 C 58 32, 57 30, 56 30 L 42 30 C 42 30, 41 30, 41 30 C 41 30, 41 29, 41 29 C 41 28, 42 25, 42 21 C 41 17, 39 14, 37 14 Z M 37 12 C 41 12, 43 16, 44 21 C 44 24, 44 26, 43 28 L 56 28 C 58 28, 60 30, 60 33 C 60 35, 60 36, 59 37 C 60 38, 61 39, 61 41 C 61 42, 60 43, 59 44 C 60 45, 60 46, 60 47 C 60 49, 59 51, 57 52 C 57 52, 57 53, 57 53 C 57 56, 55 58, 52 59 C 52 59, 52 59, 52 59 L 12 59 C 11 59, 11 58, 11 58 C 11 57, 11 57, 12 57 L 14 57 L 14 37 L 4 37 C 4 37, 3 36, 3 36 C 3 35, 4 35, 4 35 L 23 35 C 24 33, 25 32, 27 30 C 29 27, 32 25, 33 22 C 33 20, 33 16, 32 14 C 32 13, 32 13, 33 12 C 33 12, 34 12, 37 12 Z M 37 2 C 18 2, 2 18, 2 37 C 2 56, 18 72, 37 72 C 43 72, 49 70, 55 67 C 55 67, 55 67, 56 67 L 71 71 L 67 56 C 67 56, 67 55, 67 55 C 70 50, 72 43, 72 37 C 72 18, 56 2, 37 2 Z M 37 0 C 57 0, 74 17, 74 37 C 74 44, 72 50, 69 56 L 74 73 C 74 73, 74 73, 74 74 C 73 74, 73 74, 73 74 C 73 74, 73 74, 73 74 L 56 69 C 50 72, 44 74, 37 74 C 17 74, 0 57, 0 37 C 0 17, 17 0, 37 0 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 749,
    "y": 222,
    "width": 74,
    "height": 74,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 12 62 L 4 72 L 70 72 L 62 62 L 43 62 L 38 66 C 38 66, 37 66, 37 66 C 37 66, 37 66, 36 66 L 31 62 L 12 62 Z M 55 34 C 55 33, 56 33, 56 34 C 57 34, 57 35, 56 35 L 47 44 C 47 45, 47 45, 47 45 C 46 45, 46 45, 46 44 C 45 44, 45 43, 46 43 L 55 34 Z M 41 34 C 41 33, 42 33, 42 34 C 43 34, 43 35, 42 35 L 33 44 C 33 45, 33 45, 33 45 C 32 45, 32 45, 32 44 C 31 44, 31 43, 32 43 L 41 34 Z M 26 34 C 27 33, 27 33, 28 34 C 28 34, 28 35, 28 35 L 19 44 C 19 45, 18 45, 18 45 C 18 45, 17 45, 17 44 C 17 44, 17 43, 17 43 L 26 34 Z M 19 24 C 18 26, 16 28, 13 28 L 11 28 L 11 49 L 19 49 C 19 49, 20 49, 20 49 L 37 64 L 54 49 C 54 49, 55 49, 55 49 L 63 49 L 63 28 L 61 28 C 58 28, 56 26, 55 24 C 54 26, 51 28, 49 28 L 43 28 C 41 28, 38 26, 37 24 C 36 26, 34 28, 31 28 L 25 28 C 23 28, 20 26, 19 24 Z M 56 20 L 56 20 C 56 23, 58 25, 61 25 L 67 25 C 70 25, 72 23, 72 20 L 72 20 L 56 20 Z M 38 20 L 38 20 C 38 23, 40 25, 43 25 L 49 25 C 52 25, 54 23, 54 20 L 54 20 L 38 20 Z M 20 20 L 20 20 C 20 23, 22 25, 25 25 L 31 25 C 34 25, 36 23, 36 20 L 36 20 L 20 20 Z M 2 20 L 2 20 C 2 23, 4 25, 7 25 L 13 25 C 16 25, 18 23, 18 20 L 18 20 L 2 20 Z M 52 11 L 56 18 L 70 18 L 63 11 L 52 11 Z M 38 11 L 38 18 L 53 18 L 50 11 L 38 11 Z M 24 11 L 21 18 L 36 18 L 36 11 L 24 11 Z M 11 11 L 4 18 L 18 18 L 22 11 L 11 11 Z M 11 2 L 11 9 L 63 9 L 63 2 L 11 2 Z M 10 0 L 64 0 C 65 0, 65 0, 65 1 L 65 10 L 74 18 C 74 18, 74 19, 74 19 L 74 20 C 74 24, 71 28, 67 28 L 65 28 L 65 50 C 65 51, 65 51, 64 51 L 55 51 L 45 60 L 62 60 C 63 60, 63 60, 63 60 L 74 72 C 74 72, 74 73, 74 73 C 74 74, 73 74, 73 74 L 1 74 C 1 74, 0 74, 0 73 C 0 73, 0 72, 0 72 L 11 60 C 11 60, 11 60, 12 60 L 29 60 L 19 51 L 10 51 C 10 51, 9 51, 9 50 L 9 28 L 7 28 C 3 28, 0 24, 0 20 L 0 19 C 0 19, 0 18, 0 18 L 9 10 L 9 1 C 9 0, 10 0, 10 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1042,
    "y": 222,
    "width": 74,
    "height": 74,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 50 23 L 36 37 L 50 51 L 59 51 L 46 38 C 45 37, 45 37, 46 36 L 59 23 L 50 23 Z M 24 23 L 11 37 L 24 51 L 33 51 L 20 38 C 20 38, 20 37, 20 37 C 20 37, 20 36, 20 36 L 33 23 L 24 23 Z M 50 21 L 62 21 C 62 21, 62 21, 63 22 C 63 22, 63 22, 62 23 L 48 37 L 62 51 C 63 52, 63 52, 63 52 C 62 53, 62 53, 62 53 L 50 53 C 49 53, 49 53, 49 53 L 34 38 C 34 38, 34 37, 34 37 C 34 37, 34 36, 34 36 L 49 21 C 49 21, 49 21, 50 21 Z M 24 21 L 36 21 C 36 21, 37 21, 37 22 C 37 22, 37 22, 37 23 L 23 37 L 37 51 C 37 52, 37 52, 37 52 C 37 53, 36 53, 36 53 L 24 53 C 24 53, 23 53, 23 53 L 8 38 C 8 38, 8 37, 8 37 C 8 37, 8 36, 8 36 L 23 21 C 23 21, 24 21, 24 21 Z M 37 2 C 18 2, 2 18, 2 37 C 2 56, 18 72, 37 72 C 56 72, 72 56, 72 37 C 72 18, 56 2, 37 2 Z M 37 0 C 57 0, 74 17, 74 37 C 74 57, 57 74, 37 74 C 17 74, 0 57, 0 37 C 0 17, 17 0, 37 0 Z"
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

export function Migso186Template({ data }: { data: BrainData }): ReactElement {
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
