import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 169,
    "y": 392,
    "width": 481,
    "height": 247,
    "fillColor": "#ff4d38",
    "pathD": "M 69 0 L 481 0 L 412 247 L 0 247 L 69 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 142,
    "y": 440,
    "width": 106,
    "height": 106,
    "fillColor": "#ffffff",
    "strokeColor": "#ff4d38",
    "pathD": "M 53 0 A 53 53 0 1 1 53 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 170,
    "y": 143,
    "width": 481,
    "height": 247,
    "fillColor": "#3365cc",
    "pathD": "M 69 0 L 481 0 L 412 247 L 0 247 L 69 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 143,
    "y": 237,
    "width": 106,
    "height": 106,
    "fillColor": "#ffffff",
    "strokeColor": "#3365cc",
    "pathD": "M 53 0 A 53 53 0 1 1 53 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 630,
    "y": 392,
    "width": 481,
    "height": 247,
    "fillColor": "#52c49c",
    "pathD": "M 69 0 L 481 0 L 412 247 L 0 247 L 69 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1032,
    "y": 440,
    "width": 106,
    "height": 106,
    "fillColor": "#ffffff",
    "strokeColor": "#52c49c",
    "pathD": "M 53 0 A 53 53 0 1 1 53 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 629,
    "y": 143,
    "width": 481,
    "height": 247,
    "fillColor": "#ffb900",
    "pathD": "M 69 0 L 481 0 L 412 247 L 0 247 L 69 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1031,
    "y": 237,
    "width": 106,
    "height": 106,
    "fillColor": "#ffffff",
    "strokeColor": "#ffb900",
    "pathD": "M 53 0 A 53 53 0 1 1 53 0 Z"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 0,
    "x": 277,
    "y": 171,
    "width": 64,
    "height": 58,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 277,
    "y": 234,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 0,
    "x": 281,
    "y": 276,
    "width": 265,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 1,
    "x": 938,
    "y": 171,
    "width": 64,
    "height": 58,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 1,
    "x": 891,
    "y": 234,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 733,
    "y": 276,
    "width": 265,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 277,
    "y": 419,
    "width": 64,
    "height": 58,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 2,
    "x": 277,
    "y": 482,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 2,
    "x": 281,
    "y": 524,
    "width": 265,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 3,
    "x": 938,
    "y": 419,
    "width": 64,
    "height": 58,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 891,
    "y": 482,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 3,
    "x": 733,
    "y": 524,
    "width": 265,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 170,
    "y": 269,
    "width": 51,
    "height": 42,
    "fillColor": "#3365cc",
    "pathD": "M 43 34 L 43 40 L 49 40 L 49 34 L 43 34 Z M 1 33 C 1 33, 2 33, 2 34 L 2 40 L 42 40 L 42 34 L 36 34 C 36 34, 36 34, 36 34 C 36 33, 36 33, 36 33 L 42 33 L 50 33 C 51 33, 51 33, 51 34 L 51 41 C 51 42, 51 42, 50 42 L 42 42 L 1 42 C 0 42, 0 42, 0 41 L 0 34 C 0 33, 0 33, 1 33 Z M 27 30 C 25 30, 24 32, 24 33 C 24 35, 25 36, 27 36 C 29 36, 30 35, 30 33 C 30 32, 29 30, 27 30 Z M 27 29 C 30 29, 32 31, 32 33 C 32 36, 30 38, 27 38 C 25 38, 23 36, 23 34 L 11 34 L 11 36 C 11 36, 11 37, 11 37 C 10 37, 10 36, 10 36 L 10 34 L 7 34 L 7 37 C 7 38, 6 38, 6 38 C 6 38, 5 38, 5 37 L 5 33 C 5 33, 6 33, 6 33 L 23 33 C 23 30, 25 29, 27 29 Z M 25 16 L 31 16 C 32 16, 32 17, 32 17 C 32 17, 32 18, 31 18 L 25 18 C 24 18, 24 17, 24 17 C 24 17, 24 16, 25 16 Z M 14 16 L 21 16 C 21 16, 21 17, 21 17 C 21 17, 21 18, 21 18 L 14 18 C 14 18, 13 17, 13 17 C 13 17, 14 16, 14 16 Z M 6 16 L 10 16 C 10 16, 11 17, 11 17 C 11 17, 10 18, 10 18 L 6 18 C 6 18, 5 17, 5 17 C 5 17, 6 16, 6 16 Z M 39 11 L 45 11 C 45 11, 45 11, 45 11 C 45 12, 45 12, 45 12 L 39 12 C 39 12, 39 12, 39 11 C 39 11, 39 11, 39 11 Z M 30 11 L 35 11 C 36 11, 36 11, 36 11 C 36 12, 36 12, 35 12 L 30 12 C 30 12, 30 12, 30 11 C 30 11, 30 11, 30 11 Z M 17 11 L 26 11 C 27 11, 27 11, 27 11 C 27 12, 27 12, 26 12 L 17 12 C 16 12, 16 12, 16 11 C 16 11, 16 11, 17 11 Z M 6 11 L 12 11 C 13 11, 13 11, 13 11 C 13 12, 13 12, 12 12 L 6 12 C 6 12, 5 12, 5 11 C 5 11, 6 11, 6 11 Z M 36 5 L 45 5 C 45 5, 45 6, 45 6 C 45 7, 45 7, 45 7 L 36 7 C 36 7, 36 7, 36 6 C 36 6, 36 5, 36 5 Z M 26 5 L 32 5 C 32 5, 33 6, 33 6 C 33 7, 32 7, 32 7 L 26 7 C 26 7, 25 7, 25 6 C 25 6, 26 5, 26 5 Z M 15 5 L 22 5 C 22 5, 23 6, 23 6 C 23 7, 22 7, 22 7 L 15 7 C 14 7, 14 7, 14 6 C 14 6, 14 5, 15 5 Z M 6 5 L 10 5 C 11 5, 11 6, 11 6 C 11 7, 11 7, 10 7 L 6 7 C 6 7, 5 7, 5 6 C 5 6, 6 5, 6 5 Z M 2 2 L 2 21 L 33 21 C 34 21, 34 22, 34 22 L 34 26 L 43 21 C 43 21, 43 21, 43 21 C 43 21, 44 21, 44 21 C 44 21, 44 21, 44 21 C 44 21, 44 21, 44 21 L 49 21 L 49 2 L 2 2 Z M 1 0 L 50 0 C 51 0, 51 0, 51 1 L 51 22 C 51 22, 51 22, 51 23 C 51 23, 50 23, 50 23 L 44 23 L 34 28 C 34 28, 34 28, 33 28 C 33 28, 33 28, 33 28 C 33 28, 33 28, 33 28 L 33 23 L 1 23 C 1 23, 0 23, 0 23 C 0 22, 0 22, 0 22 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 170,
    "y": 467,
    "width": 51,
    "height": 51,
    "fillColor": "#ff4d38",
    "pathD": "M 26 35 C 26 35, 26 35, 26 36 L 26 50 C 26 51, 26 51, 26 51 C 25 51, 25 51, 25 50 L 25 36 C 25 35, 25 35, 26 35 Z M 40 30 C 41 30, 41 31, 41 31 C 39 36, 36 39, 31 41 C 31 41, 31 41, 31 41 C 31 41, 30 41, 30 40 C 30 40, 30 39, 31 39 C 35 38, 38 35, 39 31 C 40 30, 40 30, 40 30 Z M 11 30 C 11 30, 12 30, 12 31 C 13 35, 16 38, 21 39 C 21 39, 21 40, 21 40 C 21 41, 21 41, 20 41 C 20 41, 20 41, 20 41 C 16 39, 12 36, 10 31 C 10 31, 10 30, 11 30 Z M 46 30 C 47 30, 47 30, 47 31 L 47 46 C 47 47, 47 47, 46 47 L 31 47 C 30 47, 30 47, 30 46 C 30 46, 30 46, 31 46 L 45 46 L 45 31 C 45 30, 46 30, 46 30 Z M 5 30 C 5 30, 6 30, 6 31 L 6 46 L 20 46 C 20 46, 21 46, 21 46 C 21 47, 20 47, 20 47 L 5 47 C 4 47, 4 47, 4 46 L 4 31 C 4 30, 4 30, 5 30 Z M 36 25 L 50 25 C 51 25, 51 25, 51 26 C 51 26, 51 26, 50 26 L 36 26 C 36 26, 35 26, 35 26 C 35 25, 36 25, 36 25 Z M 1 25 L 15 25 C 15 25, 16 25, 16 26 C 16 26, 15 26, 15 26 L 1 26 C 0 26, 0 26, 0 26 C 0 25, 0 25, 1 25 Z M 26 20 C 23 20, 21 23, 21 25 C 21 28, 23 31, 26 31 C 28 31, 31 28, 31 25 C 31 23, 28 20, 26 20 Z M 26 19 C 29 19, 32 22, 32 25 C 32 29, 29 32, 26 32 C 22 32, 19 29, 19 25 C 19 22, 22 19, 26 19 Z M 31 10 C 36 12, 39 15, 41 20 C 41 20, 41 21, 40 21 C 40 21, 40 21, 40 21 C 40 21, 39 21, 39 20 C 38 16, 35 13, 31 12 C 30 12, 30 11, 30 11 C 30 10, 31 10, 31 10 Z M 20 10 C 20 10, 21 10, 21 11 C 21 11, 21 12, 21 12 C 16 13, 13 16, 12 20 C 12 21, 12 21, 11 21 C 11 21, 11 21, 11 21 C 10 21, 10 20, 10 20 C 12 15, 16 12, 20 10 Z M 31 4 L 46 4 C 47 4, 47 4, 47 5 L 47 20 C 47 20, 47 21, 46 21 C 46 21, 45 20, 45 20 L 45 5 L 31 5 C 30 5, 30 5, 30 5 C 30 4, 30 4, 31 4 Z M 5 4 L 20 4 C 20 4, 21 4, 21 5 C 21 5, 20 5, 20 5 L 6 5 L 6 20 C 6 20, 5 21, 5 21 C 4 21, 4 20, 4 20 L 4 5 C 4 4, 4 4, 5 4 Z M 26 0 C 26 0, 26 0, 26 1 L 26 15 C 26 16, 26 16, 26 16 C 25 16, 25 16, 25 15 L 25 1 C 25 0, 25 0, 26 0 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1060,
    "y": 264,
    "width": 51,
    "height": 51,
    "fillColor": "#ffb900",
    "pathD": "M 49 35 L 43 42 C 43 43, 43 43, 43 43 L 8 43 C 8 43, 7 43, 7 42 L 2 36 L 2 49 L 49 49 L 49 35 Z M 34 22 C 33 24, 32 25, 31 26 L 37 32 C 38 33, 39 33, 40 32 L 40 31 C 41 31, 41 30, 40 29 L 34 22 Z M 35 20 C 35 20, 35 21, 35 21 L 42 28 C 43 29, 43 31, 42 32 L 41 33 C 40 34, 39 34, 38 34 C 38 34, 37 34, 36 33 L 29 27 C 27 28, 25 28, 23 28 C 17 28, 13 25, 10 21 L 2 33 L 31 33 C 32 33, 32 33, 32 33 C 32 34, 32 34, 31 34 L 2 34 L 8 41 L 42 41 L 48 34 L 45 34 C 45 34, 45 34, 45 33 C 45 33, 45 33, 45 33 L 49 33 L 40 20 L 35 20 Z M 22 7 C 19 7, 15 10, 15 14 C 15 18, 19 21, 22 21 C 26 21, 30 18, 30 14 C 30 10, 26 7, 22 7 Z M 22 5 C 27 5, 31 9, 31 14 C 31 19, 27 23, 22 23 C 18 23, 14 19, 14 14 C 14 9, 18 5, 22 5 Z M 23 2 C 16 2, 10 7, 10 14 C 10 21, 16 27, 23 27 C 29 27, 35 21, 35 14 C 35 7, 29 2, 23 2 Z M 23 0 C 30 0, 37 6, 37 14 C 37 16, 36 17, 36 18 L 40 18 C 40 18, 41 18, 41 19 L 51 33 C 51 33, 51 33, 51 33 C 51 33, 51 33, 51 33 C 51 33, 51 33, 51 33 C 51 33, 51 33, 51 33 L 51 50 C 51 51, 51 51, 50 51 L 1 51 C 0 51, 0 51, 0 50 L 0 33 C 0 33, 0 33, 0 33 C 0 33, 0 33, 0 33 C 0 33, 0 33, 0 33 C 0 33, 0 33, 0 33 L 10 20 C 9 18, 9 16, 9 14 C 9 6, 15 0, 23 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1059,
    "y": 470,
    "width": 51,
    "height": 49,
    "fillColor": "#52c49c",
    "pathD": "M 21 36 L 21 41 L 25 41 C 25 41, 25 41, 25 41 C 26 41, 26 40, 26 40 L 24 37 C 24 36, 24 36, 23 36 L 21 36 Z M 14 31 L 14 46 C 14 47, 15 47, 16 47 L 18 47 C 19 47, 20 47, 20 46 L 20 42 L 20 35 L 20 31 L 14 31 Z M 46 16 L 46 24 C 48 23, 49 21, 49 20 C 49 18, 48 16, 46 16 Z M 15 14 C 16 14, 16 14, 16 15 L 16 25 C 16 25, 16 25, 15 25 C 15 25, 15 25, 15 25 L 15 15 C 15 14, 15 14, 15 14 Z M 10 14 C 11 14, 11 14, 11 15 L 11 25 C 11 25, 11 25, 10 25 C 10 25, 10 25, 10 25 L 10 15 C 10 14, 10 14, 10 14 Z M 41 14 C 42 14, 42 14, 42 14 C 42 15, 42 15, 42 15 C 38 16, 33 16, 24 17 C 24 17, 23 16, 23 16 C 23 15, 24 15, 24 15 C 33 15, 38 14, 41 14 Z M 11 10 C 6 10, 2 14, 2 20 C 2 25, 6 30, 11 30 L 14 30 L 20 30 L 20 10 L 11 10 Z M 45 3 C 42 5, 35 9, 21 10 L 21 30 C 35 30, 42 34, 45 36 L 45 3 Z M 46 0 C 46 0, 46 0, 46 1 L 46 14 C 49 14, 51 17, 51 20 C 51 22, 49 25, 46 25 L 46 38 C 46 39, 46 39, 46 39 C 46 39, 46 39, 46 39 C 46 39, 45 39, 45 39 C 45 39, 39 31, 21 31 L 21 35 L 23 35 C 24 35, 25 35, 26 36 L 27 39 C 27 40, 27 41, 27 42 C 26 42, 26 43, 25 43 L 21 43 L 21 46 C 21 48, 20 49, 18 49 L 16 49 C 14 49, 13 48, 13 46 L 13 31 L 11 31 C 5 31, 0 26, 0 20 C 0 13, 5 8, 11 8 L 21 8 C 39 8, 45 0, 45 0 C 45 0, 46 0, 46 0 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates28Template({ data }: { data: BrainData }): ReactElement {
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
