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
    "x": 91,
    "y": 135,
    "width": 458,
    "height": 247,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 91,
    "y": 394,
    "width": 458,
    "height": 247,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-2",
    "x": 560,
    "y": 394,
    "width": 358,
    "height": 247,
    "fillColor": "#4a90d9",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 929,
    "y": 394,
    "width": 282,
    "height": 247,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 929,
    "y": 135,
    "width": 282,
    "height": 247,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 560,
    "y": 135,
    "width": 173,
    "height": 247,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 745,
    "y": 135,
    "width": 173,
    "height": 247,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 0,
    "x": 108,
    "y": 146,
    "width": 98,
    "height": 36,
    "text": "Visitors"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 0,
    "x": 574,
    "y": 146,
    "width": 131,
    "height": 36,
    "text": "Comments"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 759,
    "y": 146,
    "width": 79,
    "height": 36,
    "text": "Users"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 1,
    "x": 946,
    "y": 146,
    "width": 69,
    "height": 36,
    "text": "Files"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 1,
    "x": 108,
    "y": 404,
    "width": 136,
    "height": 36,
    "text": "Page views"
  },
  {
    "id": "sp-12",
    "x": 574,
    "y": 404,
    "width": 83,
    "height": 36,
    "text": "Clicks"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 946,
    "y": 404,
    "width": 109,
    "height": 36,
    "text": "Revenue"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 603,
    "y": 211,
    "width": 97,
    "height": 97,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 43 74 C 44 73, 45 73, 45 74 C 46 74, 46 75, 46 75 C 46 75, 46 76, 45 76 C 45 76, 45 76, 44 76 C 44 76, 43 76, 43 76 C 43 76, 43 75, 43 75 C 43 75, 43 74, 43 74 Z M 16 74 C 16 73, 17 73, 18 74 C 18 74, 18 75, 18 75 C 18 75, 18 76, 18 76 C 18 76, 17 76, 17 76 C 16 76, 16 76, 16 76 C 16 76, 15 75, 15 75 C 15 75, 16 74, 16 74 Z M 31 73 C 31 73, 32 74, 32 75 C 32 76, 31 76, 31 76 C 30 76, 29 76, 29 75 C 29 74, 30 73, 31 73 Z M 8 44 C 5 44, 3 46, 3 48 L 3 80 C 3 82, 5 85, 8 85 L 38 85 C 41 85, 45 85, 48 87 L 58 93 L 58 57 L 50 57 C 47 57, 44 57, 41 59 L 25 68 C 25 68, 24 69, 24 69 C 24 69, 24 68, 23 68 C 23 68, 23 68, 23 67 L 23 44 L 8 44 Z M 36 41 L 70 41 C 71 41, 71 41, 71 42 C 71 43, 71 44, 70 44 L 36 44 C 35 44, 35 43, 35 42 C 35 41, 35 41, 36 41 Z M 55 27 L 83 27 C 84 27, 85 28, 85 28 C 85 29, 84 30, 83 30 L 55 30 C 54 30, 54 29, 54 28 C 54 28, 54 27, 55 27 Z M 36 27 L 45 27 C 46 27, 47 28, 47 28 C 47 29, 46 30, 45 30 L 36 30 C 35 30, 35 29, 35 28 C 35 28, 35 27, 36 27 Z M 73 13 L 83 13 C 84 13, 85 14, 85 15 C 85 15, 84 16, 83 16 L 73 16 C 72 16, 71 15, 71 15 C 71 14, 72 13, 73 13 Z M 36 13 L 63 13 C 64 13, 64 14, 64 15 C 64 15, 64 16, 63 16 L 36 16 C 35 16, 35 15, 35 15 C 35 14, 35 13, 36 13 Z M 30 3 C 29 3, 28 3, 27 4 C 26 5, 26 6, 26 7 L 26 65 L 40 56 C 43 55, 47 54, 50 54 L 89 54 C 91 54, 92 53, 93 52 C 94 52, 94 50, 94 49 L 94 7 C 94 6, 94 5, 93 4 C 92 3, 91 3, 89 3 L 30 3 Z M 30 0 L 89 0 C 91 0, 93 1, 95 2 C 96 3, 97 6, 97 7 L 97 49 C 97 51, 96 53, 95 55 C 93 56, 91 57, 89 57 L 61 57 L 61 95 C 61 96, 61 96, 61 97 C 60 97, 60 97, 60 97 C 60 97, 59 97, 59 97 L 47 90 C 44 88, 41 88, 38 88 L 8 88 C 3 88, 0 84, 0 80 L 0 48 C 0 44, 3 41, 8 41 L 23 41 L 23 7 C 23 6, 24 3, 25 2 C 26 1, 28 0, 30 0 Z"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 2,
    "x": 641,
    "y": 341,
    "width": 77,
    "height": 29,
    "text": "100,000"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 784,
    "y": 211,
    "width": 95,
    "height": 97,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 77 86 C 78 86, 79 86, 79 87 L 79 96 C 79 96, 78 97, 77 97 C 76 97, 76 96, 76 96 L 76 87 C 76 86, 76 86, 77 86 Z M 18 86 C 19 86, 20 86, 20 87 L 20 96 C 20 96, 19 97, 18 97 C 17 97, 17 96, 17 96 L 17 87 C 17 86, 17 86, 18 86 Z M 38 61 L 37 61 C 36 66, 33 69, 28 70 C 30 76, 42 82, 47 84 C 53 82, 65 76, 67 70 C 62 69, 59 66, 58 61 L 58 61 C 55 63, 51 64, 47 64 C 44 64, 40 63, 38 61 Z M 57 27 C 54 27, 51 28, 48 30 C 40 34, 33 32, 28 30 C 28 32, 28 34, 28 36 C 28 50, 37 61, 47 61 C 59 61, 67 50, 67 36 C 67 34, 67 32, 67 30 C 63 28, 60 27, 57 27 Z M 47 3 C 28 3, 15 18, 15 41 C 15 52, 17 63, 22 68 L 27 67 C 31 67, 34 64, 35 60 L 35 59 C 29 54, 25 46, 25 36 C 25 33, 25 30, 26 27 C 26 27, 27 27, 27 27 C 28 27, 28 27, 28 27 C 31 29, 39 32, 47 27 C 54 22, 61 23, 68 27 C 69 28, 69 28, 69 28 C 70 31, 70 34, 70 36 C 70 46, 66 54, 60 59 L 61 60 C 61 64, 64 67, 68 67 L 74 68 C 78 63, 80 52, 80 41 C 80 18, 67 3, 47 3 Z M 47 0 C 69 0, 83 16, 83 41 C 83 52, 81 62, 77 69 L 78 69 C 88 71, 95 79, 95 90 L 95 96 C 95 96, 95 97, 94 97 C 93 97, 92 96, 92 96 L 92 90 C 92 81, 86 73, 77 72 L 70 71 C 68 79, 53 85, 49 86 L 49 96 C 49 96, 48 97, 47 97 C 47 97, 46 96, 46 96 L 46 86 C 42 85, 27 79, 25 71 L 18 72 C 9 73, 3 81, 3 90 L 3 96 C 3 96, 2 97, 1 97 C 1 97, 0 96, 0 96 L 0 90 C 0 79, 7 71, 18 69 L 18 69 C 14 62, 12 52, 12 41 C 12 16, 26 0, 47 0 Z"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 3,
    "x": 826,
    "y": 341,
    "width": 77,
    "height": 29,
    "text": "100,000"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 1026,
    "y": 211,
    "width": 89,
    "height": 97,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 11 82 L 29 82 C 29 82, 30 82, 30 83 C 30 84, 29 85, 29 85 L 11 85 C 10 85, 9 84, 9 83 C 9 82, 10 82, 11 82 Z M 46 70 L 58 70 C 59 70, 59 71, 59 72 C 59 73, 59 73, 58 73 L 46 73 C 45 73, 44 73, 44 72 C 44 71, 45 70, 46 70 Z M 11 70 L 36 70 C 37 70, 37 71, 37 72 C 37 73, 37 73, 36 73 L 11 73 C 10 73, 9 73, 9 72 C 9 71, 10 70, 11 70 Z M 32 59 L 58 59 C 59 59, 59 59, 59 60 C 59 61, 59 62, 58 62 L 32 62 C 31 62, 31 61, 31 60 C 31 59, 31 59, 32 59 Z M 11 59 L 22 59 C 23 59, 24 59, 24 60 C 24 61, 23 62, 22 62 L 11 62 C 10 62, 9 61, 9 60 C 9 59, 10 59, 11 59 Z M 49 47 L 58 47 C 59 47, 59 48, 59 48 C 59 49, 59 50, 58 50 L 49 50 C 48 50, 47 49, 47 48 C 47 48, 48 47, 49 47 Z M 11 47 L 39 47 C 40 47, 40 48, 40 48 C 40 49, 40 50, 39 50 L 11 50 C 10 50, 9 49, 9 48 C 9 48, 10 47, 11 47 Z M 11 35 L 42 35 C 43 35, 44 36, 44 36 C 44 37, 43 38, 42 38 L 11 38 C 10 38, 9 37, 9 36 C 9 36, 10 35, 11 35 Z M 54 25 L 54 35 L 64 35 L 54 25 Z M 3 23 L 3 94 L 66 94 L 66 38 L 52 38 C 52 38, 51 38, 51 37 L 51 23 L 3 23 Z M 13 13 L 13 20 L 52 20 C 53 20, 53 20, 53 20 L 69 36 C 69 36, 69 36, 69 37 L 69 84 L 76 84 L 76 13 L 13 13 Z M 22 3 L 22 10 L 78 10 C 79 10, 79 10, 79 11 L 79 74 L 86 74 L 86 3 L 22 3 Z M 21 0 L 88 0 C 88 0, 89 1, 89 1 L 89 76 C 89 77, 88 77, 88 77 L 79 77 L 79 86 C 79 86, 79 87, 78 87 L 69 87 L 69 95 C 69 96, 69 97, 68 97 L 1 97 C 1 97, 0 96, 0 95 L 0 21 C 0 20, 1 20, 1 20 L 10 20 L 10 11 C 10 10, 10 10, 11 10 L 20 10 L 20 1 C 20 1, 20 0, 21 0 Z"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 4,
    "x": 1121,
    "y": 341,
    "width": 77,
    "height": 29,
    "text": "100,000"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1026,
    "y": 470,
    "width": 89,
    "height": 90,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 45 81 C 43 81, 41 83, 41 85 L 41 87 L 83 87 L 83 85 C 83 83, 81 81, 79 81 L 78 81 L 47 81 L 45 81 Z M 57 55 C 57 68, 53 75, 50 78 L 74 78 C 72 75, 68 68, 68 55 L 57 55 Z M 57 46 L 57 52 L 67 52 L 67 46 L 57 46 Z M 36 40 C 36 40, 37 40, 37 41 L 37 43 C 39 43, 42 45, 42 47 C 43 48, 42 49, 42 49 C 41 49, 40 49, 40 48 C 39 47, 38 46, 36 46 C 33 46, 31 47, 31 50 C 31 51, 32 54, 36 54 C 41 54, 43 57, 43 60 C 43 63, 40 66, 37 67 L 37 68 C 37 69, 36 70, 36 70 C 35 70, 34 69, 34 68 L 34 67 C 32 66, 30 65, 29 63 C 29 62, 29 61, 30 61 C 30 61, 31 61, 31 62 C 32 63, 34 64, 36 64 C 38 64, 40 62, 40 60 C 40 58, 39 56, 36 56 C 30 56, 28 53, 28 50 C 28 46, 31 44, 34 43 L 34 41 C 34 40, 35 40, 36 40 Z M 54 33 L 58 43 L 67 43 L 70 33 L 54 33 Z M 62 23 C 63 23, 64 24, 64 25 L 64 30 L 72 30 C 73 30, 73 30, 73 30 C 74 31, 74 31, 73 32 L 70 43 L 72 43 C 73 43, 74 44, 74 45 C 74 45, 73 46, 72 46 L 70 46 L 70 52 L 72 52 C 73 52, 74 53, 74 54 C 74 54, 73 55, 72 55 L 70 55 C 71 71, 77 77, 78 78 L 79 78 C 83 78, 86 81, 86 85 L 86 87 L 88 87 C 88 87, 89 88, 89 89 C 89 89, 88 90, 88 90 L 37 90 C 36 90, 35 89, 35 89 C 35 88, 36 87, 37 87 L 39 87 L 39 85 C 39 81, 42 78, 45 78 L 46 78 C 48 77, 54 71, 54 55 L 52 55 C 51 55, 51 54, 51 54 C 51 53, 51 52, 52 52 L 54 52 L 54 46 L 52 46 C 51 46, 51 45, 51 45 C 51 44, 51 43, 52 43 L 55 43 L 51 32 C 51 31, 51 31, 51 30 C 51 30, 52 30, 52 30 L 61 30 L 61 25 C 61 24, 61 23, 62 23 Z M 26 3 C 25 3, 24 3, 23 3 C 23 4, 22 5, 23 6 L 28 20 C 28 21, 30 22, 31 22 L 30 13 C 30 12, 31 11, 31 11 C 32 11, 33 11, 33 12 L 34 23 C 35 23, 35 23, 36 23 C 36 23, 37 23, 38 23 L 39 12 C 39 11, 40 11, 40 11 C 41 11, 42 12, 41 13 L 40 22 C 42 22, 43 21, 44 20 L 49 6 C 49 5, 49 4, 48 3 C 48 3, 47 3, 46 3 L 40 5 C 37 6, 35 6, 32 5 L 26 3 Z M 27 0 L 33 3 C 35 3, 37 3, 39 3 L 45 0 C 47 0, 49 0, 50 1 C 52 3, 52 5, 52 7 L 47 20 C 48 21, 50 22, 52 25 C 52 25, 52 26, 52 27 C 51 27, 50 27, 50 26 C 48 24, 47 23, 46 22 C 43 24, 40 26, 36 26 C 32 26, 28 24, 26 22 C 22 26, 7 41, 8 67 C 8 71, 6 75, 4 79 C 4 80, 3 82, 3 86 C 5 87, 20 87, 27 87 L 31 87 C 32 87, 32 87, 32 88 C 32 89, 32 89, 31 89 L 27 90 C 25 90, 23 90, 21 90 C 9 90, 2 89, 1 87 C 0 87, 0 86, 0 86 C 0 83, 1 80, 2 77 C 4 74, 5 71, 5 67 C 5 38, 21 23, 25 20 L 20 7 C 19 5, 20 3, 21 1 C 23 0, 25 0, 27 0 Z"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 1089,
    "y": 603,
    "width": 109,
    "height": 29,
    "text": "£100,000.00"
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

export function Migso80Template({ data }: { data: BrainData }): ReactElement {
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
