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
    "x": 624,
    "y": 180,
    "width": 319,
    "height": 255,
    "fillColor": "#52c49c",
    "pathD": "M 233 214 L 233 0 L 319 107 Z M 0 253 L 0 247 C 12 129, 108 36, 227 30 L 233 30 L 233 185 L 231 185 C 193 189, 162 217, 155 255 L 155 255 L 76 192 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 432,
    "y": 85,
    "width": 255,
    "height": 319,
    "fillColor": "#ff4d38",
    "pathD": "M 30 86 L 185 86 L 185 88 C 189 126, 217 157, 255 164 L 255 164 L 192 243 L 253 319 L 247 319 C 129 307, 36 211, 30 92 Z M 0 86 L 107 0 L 214 86 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 337,
    "y": 341,
    "width": 319,
    "height": 255,
    "fillColor": "#3365cc",
    "pathD": "M 86 225 L 86 70 L 88 70 C 126 66, 157 38, 164 0 L 164 0 L 243 63 L 319 2 L 319 8 C 307 126, 211 219, 92 225 Z M 0 148 L 86 41 L 86 225 L 86 255 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 593,
    "y": 370,
    "width": 255,
    "height": 319,
    "fillColor": "#ffb900",
    "pathD": "M 0 155 L 63 76 L 2 0 L 8 0 C 126 12, 219 108, 225 228 L 225 233 L 255 233 L 148 319 L 41 233 L 70 233 L 70 231 C 66 193, 38 162, 0 155 Z"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 1,
    "x": 619,
    "y": 195,
    "width": 64,
    "height": 58,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 6,
    "x": 598,
    "y": 522,
    "width": 64,
    "height": 58,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 4,
    "x": 772,
    "y": 360,
    "width": 64,
    "height": 58,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 3,
    "x": 444,
    "y": 349,
    "width": 64,
    "height": 58,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 926,
    "y": 165,
    "width": 141,
    "height": 36,
    "text": "Your title 3",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 1,
    "x": 926,
    "y": 205,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 3,
    "x": 926,
    "y": 452,
    "width": 141,
    "height": 36,
    "text": "Your title 4",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 3,
    "x": 926,
    "y": 493,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 212,
    "y": 165,
    "width": 141,
    "height": 36,
    "text": "Your title 2",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 0,
    "x": 80,
    "y": 205,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 212,
    "y": 452,
    "width": 141,
    "height": 36,
    "text": "Your title 1",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 2,
    "x": 80,
    "y": 493,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 7,
    "x": 705,
    "y": 493,
    "width": 67,
    "height": 67,
    "fillColor": "#ffffff",
    "pathD": "M 43 56 L 43 64 L 50 56 L 43 56 Z M 21 48 L 18 56 L 27 54 L 21 48 Z M 58 18 L 26 50 L 29 53 L 61 21 L 58 18 Z M 31 16 L 38 16 C 38 16, 39 17, 39 18 C 39 18, 38 19, 38 19 L 31 19 C 30 19, 30 18, 30 18 C 30 17, 30 16, 31 16 Z M 54 14 L 22 46 L 25 49 L 57 17 L 54 14 Z M 59 10 C 58 10, 58 10, 57 10 L 55 12 L 62 20 L 65 17 C 65 17, 65 16, 65 15 L 60 10 C 59 10, 59 10, 59 10 Z M 1 0 L 52 0 C 53 0, 54 0, 54 1 L 54 6 C 54 7, 53 7, 52 7 C 52 7, 51 7, 51 6 L 51 2 L 2 2 L 2 65 L 41 65 L 41 55 C 41 55, 41 54, 42 54 L 51 54 L 51 33 L 30 55 C 29 55, 29 55, 29 55 L 17 59 C 17 59, 17 59, 17 59 C 11 59, 7 54, 7 49 C 7 43, 11 39, 17 39 C 19 39, 20 37, 20 35 C 20 33, 19 31, 17 31 L 14 31 C 10 31, 7 28, 7 24 C 7 20, 10 17, 14 17 L 25 17 C 26 17, 26 17, 26 18 C 26 18, 26 19, 25 19 L 14 19 C 11 19, 9 21, 9 24 C 9 27, 11 29, 14 29 L 17 29 C 20 29, 23 32, 23 35 C 23 38, 20 41, 17 41 C 12 41, 9 44, 9 49 C 9 53, 12 56, 16 57 L 19 46 C 19 45, 19 45, 20 45 L 52 12 L 52 12 C 52 12, 52 11, 52 11 C 52 10, 53 10, 54 11 L 54 11 L 56 9 C 57 8, 58 8, 59 8 C 60 8, 60 8, 61 9 L 66 14 C 67 15, 67 17, 66 19 L 64 21 L 64 21 C 64 22, 64 22, 64 23 C 64 23, 64 23, 63 23 C 63 23, 63 23, 63 23 L 62 22 L 54 31 L 54 55 C 54 55, 53 56, 53 56 L 42 67 C 42 67, 42 67, 42 67 L 1 67 C 0 67, 0 67, 0 66 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 5,
    "x": 473,
    "y": 447,
    "width": 67,
    "height": 67,
    "fillColor": "#ffffff",
    "pathD": "M 6 57 L 23 57 C 23 57, 24 57, 24 58 C 24 58, 23 59, 23 59 L 6 59 C 6 59, 5 58, 5 58 C 5 57, 6 57, 6 57 Z M 7 49 L 19 49 C 19 49, 20 49, 20 50 C 20 50, 19 51, 19 51 L 7 51 C 6 51, 5 50, 5 50 C 5 49, 6 49, 7 49 Z M 52 43 C 52 43, 51 43, 51 44 C 50 44, 50 44, 50 45 C 49 46, 50 48, 51 48 C 53 49, 54 48, 54 47 C 55 46, 55 45, 54 45 C 54 44, 53 44, 53 43 C 52 43, 52 43, 52 43 Z M 53 41 C 54 42, 55 43, 56 44 C 57 45, 57 46, 56 47 C 56 49, 54 51, 52 51 C 52 51, 51 50, 51 50 C 48 50, 47 47, 48 45 C 48 43, 49 42, 50 42 C 51 41, 52 41, 53 41 Z M 16 41 L 22 41 C 23 41, 23 41, 23 42 C 23 42, 23 43, 22 43 L 16 43 C 15 43, 15 42, 15 42 C 15 41, 15 41, 16 41 Z M 7 41 L 11 41 C 11 41, 12 41, 12 42 C 12 42, 11 43, 11 43 L 7 43 C 6 43, 5 42, 5 42 C 5 41, 6 41, 7 41 Z M 7 33 L 19 33 C 19 33, 20 33, 20 34 C 20 34, 19 35, 19 35 L 7 35 C 6 35, 5 34, 5 34 C 5 33, 6 33, 7 33 Z M 46 30 C 47 30, 49 30, 50 31 C 51 31, 52 33, 53 35 C 53 36, 53 36, 53 36 C 53 36, 53 36, 53 36 C 55 33, 57 32, 58 32 C 60 31, 61 32, 63 33 C 63 34, 63 34, 63 35 C 63 35, 62 35, 62 35 C 60 34, 60 33, 59 34 C 57 34, 56 35, 55 37 C 55 37, 54 38, 53 38 C 52 38, 51 37, 51 36 C 50 34, 50 33, 49 32 C 48 32, 48 32, 47 32 C 45 33, 44 33, 44 34 C 44 35, 44 37, 45 38 C 45 39, 45 40, 44 41 C 44 42, 43 42, 42 42 C 40 41, 38 41, 37 41 C 37 42, 36 42, 36 43 C 36 45, 36 46, 36 46 C 37 47, 39 48, 40 48 C 41 48, 42 49, 43 49 C 43 50, 43 51, 42 52 C 41 53, 40 54, 40 55 C 40 55, 39 56, 39 56 C 39 56, 39 56, 38 56 C 38 55, 38 55, 38 54 C 38 53, 39 52, 41 51 C 41 50, 41 50, 41 50 C 41 50, 41 50, 40 50 C 38 50, 36 49, 35 48 C 34 47, 34 45, 34 43 C 34 41, 35 40, 36 40 C 38 39, 40 39, 42 40 C 43 40, 43 40, 43 40 C 43 39, 43 39, 43 39 C 42 37, 41 35, 42 33 C 43 32, 44 31, 46 30 Z M 29 26 L 29 57 L 65 57 L 65 26 L 29 26 Z M 6 24 L 23 24 C 23 24, 24 25, 24 25 C 24 26, 23 26, 23 26 L 6 26 C 6 26, 5 26, 5 25 C 5 25, 6 24, 6 24 Z M 36 16 L 47 16 C 48 16, 48 17, 48 17 C 48 18, 48 18, 47 18 L 36 18 C 36 18, 35 18, 35 17 C 35 17, 36 16, 36 16 Z M 20 16 L 30 16 C 31 16, 31 17, 31 17 C 31 18, 31 18, 30 18 L 20 18 C 19 18, 19 18, 19 17 C 19 17, 19 16, 20 16 Z M 7 16 L 15 16 C 15 16, 16 17, 16 17 C 16 18, 15 18, 15 18 L 7 18 C 6 18, 5 18, 5 17 C 5 17, 6 16, 7 16 Z M 15 2 L 15 5 C 15 7, 17 8, 19 8 L 35 8 C 36 8, 38 7, 38 5 L 38 2 L 15 2 Z M 6 2 C 4 2, 2 4, 2 6 L 2 61 C 2 63, 4 65, 6 65 L 47 65 C 49 65, 51 63, 51 61 L 51 59 L 28 59 C 28 59, 27 58, 27 58 L 27 25 C 27 25, 28 24, 28 24 L 51 24 L 51 6 C 51 4, 49 2, 47 2 L 40 2 L 40 5 C 40 8, 38 10, 35 10 L 19 10 C 16 10, 13 8, 13 5 L 13 2 L 6 2 Z M 6 0 L 47 0 C 51 0, 53 3, 53 6 L 53 24 L 66 24 C 67 24, 67 25, 67 25 L 67 58 C 67 58, 67 59, 66 59 L 53 59 L 53 61 C 53 64, 51 67, 47 67 L 6 67 C 3 67, 0 64, 0 61 L 0 6 C 0 3, 3 0, 6 0 Z"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 0,
    "x": 515,
    "y": 219,
    "width": 66,
    "height": 66,
    "fillColor": "#ffffff",
    "pathD": "M 33 47 C 31 47, 29 49, 29 52 C 29 54, 31 56, 33 56 C 35 56, 37 54, 37 52 C 37 49, 35 47, 33 47 Z M 33 45 C 37 45, 39 48, 39 52 C 39 55, 37 58, 33 58 C 30 58, 27 55, 27 52 C 27 48, 30 45, 33 45 Z M 49 38 C 49 38, 49 38, 48 38 C 47 39, 46 39, 46 40 C 44 42, 45 45, 47 46 C 49 47, 52 47, 53 45 C 54 43, 54 40, 52 39 C 51 38, 50 38, 49 38 Z M 48 36 C 49 36, 51 36, 53 37 C 54 38, 55 39, 56 41 C 56 42, 56 44, 55 46 C 54 47, 53 48, 51 49 C 50 49, 50 49, 49 49 C 48 49, 47 49, 46 48 C 45 47, 44 46, 43 44 C 43 42, 43 41, 44 39 C 45 38, 46 37, 48 36 Z M 49 19 C 49 19, 48 20, 47 20 C 45 21, 44 24, 46 26 C 46 27, 47 28, 48 28 C 49 28, 51 28, 52 28 C 54 26, 54 24, 53 22 C 52 20, 51 19, 49 19 Z M 17 19 C 15 19, 14 20, 13 22 C 13 23, 12 24, 13 25 C 13 26, 14 27, 15 27 C 16 28, 17 28, 18 28 C 19 28, 20 27, 21 26 C 22 24, 21 21, 19 20 C 18 20, 18 19, 17 19 Z M 51 18 C 53 18, 54 19, 55 21 C 56 22, 56 24, 56 25 C 55 27, 54 28, 53 29 C 52 30, 50 30, 49 30 C 49 30, 48 30, 48 30 C 46 29, 45 28, 44 27 C 43 25, 43 24, 43 22 C 44 20, 45 19, 46 18 C 48 17, 49 17, 51 18 Z M 15 18 C 17 17, 19 17, 20 18 C 23 20, 24 24, 22 27 C 22 28, 20 29, 19 30 C 18 30, 18 30, 17 30 C 16 30, 15 30, 14 29 C 11 27, 10 24, 11 21 C 12 19, 14 18, 15 18 Z M 33 10 C 31 10, 29 12, 29 14 C 29 17, 31 19, 33 19 C 35 19, 37 17, 37 14 C 37 12, 35 10, 33 10 Z M 33 8 C 37 8, 39 11, 39 14 C 39 18, 37 21, 33 21 C 30 21, 27 18, 27 14 C 27 11, 30 8, 33 8 Z M 39 2 C 24 0, 9 8, 4 23 C 3 26, 2 29, 2 32 C 2 33, 2 35, 4 36 C 4 36, 6 37, 7 36 L 15 35 C 16 35, 16 35, 17 35 C 19 35, 22 36, 23 39 C 25 42, 25 45, 23 47 L 17 54 C 17 55, 16 56, 16 58 C 17 59, 17 60, 19 60 C 21 62, 25 63, 28 64 C 43 66, 57 57, 62 43 C 65 34, 64 25, 60 17 C 55 10, 47 4, 39 2 Z M 39 1 C 48 2, 57 8, 61 16 C 66 25, 67 35, 64 44 C 60 57, 47 66, 33 66 C 31 66, 29 66, 27 66 C 24 65, 21 64, 18 62 C 16 61, 15 60, 14 58 C 14 56, 15 54, 16 53 L 21 46 C 23 44, 22 41, 22 40 C 21 38, 18 37, 16 37 L 7 38 C 6 39, 4 38, 2 37 C 1 36, 0 34, 0 32 C 0 29, 1 25, 2 22 C 7 7, 23 -2, 39 1 Z"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 2,
    "x": 741,
    "y": 248,
    "width": 67,
    "height": 61,
    "fillColor": "#ffffff",
    "pathD": "M 9 59 L 13 46 L 54 46 L 58 59 L 9 59 Z M 26 5 L 26 5 C 27 3, 29 2, 31 2 L 36 2 C 38 2, 40 3, 40 5 L 43 15 L 23 15 L 26 5 Z M 23 16 L 44 16 L 46 22 L 21 22 L 23 16 Z M 20 24 L 47 24 L 51 37 L 16 37 L 20 24 Z M 16 39 L 51 39 L 53 45 L 14 45 L 16 39 Z M 66 59 L 60 59 L 42 4 C 41 2, 39 0, 36 0 L 31 0 C 28 0, 25 2, 24 4 L 7 59 L 1 59 C 0 59, 0 59, 0 60 C 0 61, 0 61, 1 61 L 66 61 C 66 61, 67 61, 67 60 C 67 59, 66 59, 66 59 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates56Template({ data }: { data: BrainData }): ReactElement {
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

        {titleLines.length > 0 ? (() => {
          const fs = shapeDef.textSize || (shapeDef.isTitle ? 14 : (shapeDef.isSubtitle ? 10 : 12));
          return (
            <text
              x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)}
              y={bbox.y + fs * 0.9 + (shapeDef.pathD || finalColor ? 10 : 0)}
              fontFamily="Arial, sans-serif"
              fontSize={fs}
              fontWeight={shapeDef.isTitle ? 700 : 400}
              fill={shapeDef.textColor || (shapeDef.isTitle ? '#111827' : '#4b5563')}
            >
              {titleLines.map((line: string, lIdx: number) => (
                <tspan key={lIdx} x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)} dy={lIdx === 0 ? 0 : Math.round(fs * 1.2)}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })() : null}

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
