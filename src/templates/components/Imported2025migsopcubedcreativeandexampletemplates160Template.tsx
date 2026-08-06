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
    "x": 96,
    "y": 213,
    "width": 79,
    "height": 79,
    "fillColor": "#3365cc",
    "pathD": "M 40 0 A 40 40 0 1 1 39 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 322,
    "y": 324,
    "width": 79,
    "height": 79,
    "fillColor": "#ff4d38",
    "pathD": "M 40 0 A 40 40 0 1 1 39 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 607,
    "y": 435,
    "width": 79,
    "height": 79,
    "fillColor": "#52c49c",
    "pathD": "M 40 0 A 40 40 0 1 1 39 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 864,
    "y": 546,
    "width": 79,
    "height": 79,
    "fillColor": "#ffb900",
    "pathD": "M 40 0 A 40 40 0 1 1 39 0 Z"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 135,
    "y": 252,
    "width": 302,
    "height": 10
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 362,
    "y": 363,
    "width": 302,
    "height": 10,
    "strokeColor": "#ff4d38"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 647,
    "y": 474,
    "width": 302,
    "height": 10,
    "strokeColor": "#52c49c"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 903,
    "y": 585,
    "width": 302,
    "height": 10,
    "strokeColor": "#ffb900"
  },
  {
    "id": "sp-4",
    "x": 70,
    "y": 521,
    "width": 449,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-5",
    "x": 71,
    "y": 484,
    "width": 107,
    "height": 36,
    "text": "Success",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 116,
    "y": 233,
    "width": 39,
    "height": 39,
    "fillColor": "#ffffff",
    "pathD": "M 18 34 C 17 34, 16 35, 16 36 L 16 36 C 16 37, 17 38, 18 38 L 22 38 C 22 38, 23 37, 23 36 L 23 36 C 23 35, 22 34, 22 34 L 18 34 Z M 20 22 C 20 22, 21 23, 21 23 C 21 23, 20 24, 20 24 C 20 24, 19 23, 19 23 C 19 23, 20 22, 20 22 Z M 35 18 C 36 18, 36 18, 36 19 L 36 23 C 36 24, 36 24, 35 24 C 35 24, 35 24, 35 23 L 35 19 C 35 18, 35 18, 35 18 Z M 4 18 C 4 18, 4 18, 4 19 L 4 23 C 4 24, 4 24, 4 24 C 3 24, 3 24, 3 23 L 3 19 C 3 18, 3 18, 4 18 Z M 34 15 C 33 15, 33 16, 33 16 L 33 26 C 33 26, 33 27, 34 27 L 34 27 C 36 27, 38 25, 38 23 L 38 19 C 38 17, 36 15, 34 15 L 34 15 Z M 5 15 C 3 15, 1 17, 1 19 L 1 23 C 1 25, 3 27, 5 27 L 5 27 C 6 27, 6 26, 6 26 L 6 16 C 6 16, 6 15, 5 15 L 5 15 Z M 21 12 C 22 13, 23 14, 23 15 C 24 16, 23 18, 21 19 C 21 19, 21 19, 21 20 L 21 20 C 21 21, 20 21, 20 21 C 20 21, 19 21, 19 20 L 19 20 C 19 19, 20 18, 21 17 C 22 17, 22 16, 22 15 C 22 14, 21 14, 20 13 C 20 13, 19 13, 19 14 C 18 14, 18 15, 18 16 C 18 16, 17 16, 17 16 C 17 16, 17 16, 17 16 C 17 15, 17 14, 18 13 C 19 12, 20 12, 21 12 Z M 12 10 L 12 25 L 16 25 C 16 25, 16 25, 16 25 L 20 29 L 23 25 C 23 25, 23 25, 23 25 L 27 25 L 27 10 L 12 10 Z M 12 8 L 27 8 C 28 8, 28 9, 28 9 L 28 26 C 28 26, 28 26, 27 26 L 24 26 L 20 30 C 20 30, 20 30, 20 30 C 19 30, 19 30, 19 30 L 15 26 L 12 26 C 11 26, 11 26, 11 26 L 11 9 C 11 9, 11 8, 12 8 Z M 15 0 L 24 0 C 31 0, 36 5, 36 12 L 36 14 C 38 15, 39 17, 39 19 L 39 23 C 39 25, 38 27, 36 28 C 36 34, 31 39, 24 39 L 18 39 C 16 39, 15 38, 15 36 L 15 36 C 15 34, 16 33, 18 33 L 22 33 C 23 33, 24 34, 24 36 L 24 36 C 24 37, 24 37, 24 38 L 24 38 C 30 38, 35 33, 35 28 C 35 28, 35 28, 34 28 L 34 28 C 33 28, 32 27, 32 26 L 32 16 C 32 15, 33 14, 34 14 L 34 14 C 35 14, 35 14, 35 14 L 35 12 C 35 6, 30 1, 24 1 L 15 1 C 9 1, 4 6, 4 12 L 4 14 C 4 14, 4 14, 5 14 L 5 14 C 7 14, 7 15, 7 16 L 7 26 C 7 27, 7 28, 5 28 L 5 28 C 2 28, 0 26, 0 23 L 0 19 C 0 17, 1 15, 3 14 L 3 12 C 3 5, 8 0, 15 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 342,
    "y": 344,
    "width": 39,
    "height": 38,
    "fillColor": "#ffffff",
    "pathD": "M 17 35 L 22 35 C 23 35, 23 35, 23 35 C 23 36, 23 36, 22 36 L 17 36 C 16 36, 16 36, 16 35 C 16 35, 16 35, 17 35 Z M 1 33 L 1 35 C 1 36, 2 37, 3 37 L 36 37 C 37 37, 38 36, 38 35 L 38 33 L 1 33 Z M 4 27 L 2 32 L 37 32 L 35 27 L 4 27 Z M 24 11 L 23 21 L 25 21 L 28 11 L 24 11 Z M 16 11 L 18 21 L 21 21 L 23 11 L 16 11 Z M 11 11 L 14 21 L 16 21 L 15 11 L 11 11 Z M 16 6 C 16 5, 16 5, 16 6 C 17 6, 17 6, 16 6 L 13 10 L 26 10 L 23 6 C 22 6, 22 6, 23 6 C 23 5, 23 5, 23 6 L 28 10 L 30 10 C 30 10, 31 10, 31 11 C 31 11, 30 11, 30 11 L 29 11 L 26 21 C 26 22, 26 22, 26 22 L 13 22 C 13 22, 13 22, 13 21 L 10 11 L 9 11 C 9 11, 8 11, 8 11 C 8 10, 9 10, 9 10 L 11 10 L 16 6 Z M 6 1 C 5 1, 4 2, 4 3 L 4 26 L 35 26 L 35 3 C 35 2, 34 1, 33 1 L 6 1 Z M 6 0 L 33 0 C 35 0, 36 1, 36 3 L 36 27 L 39 33 C 39 33, 39 33, 39 33 L 39 35 C 39 37, 38 38, 36 38 L 3 38 C 1 38, 0 37, 0 35 L 0 33 C 0 33, 0 33, 0 33 L 3 27 L 3 3 C 3 1, 4 0, 6 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 627,
    "y": 455,
    "width": 39,
    "height": 38,
    "fillColor": "#ffffff",
    "pathD": "M 27 30 C 27 30, 26 30, 26 31 C 26 32, 27 32, 27 32 C 28 32, 29 32, 29 31 C 29 30, 28 30, 27 30 Z M 4 22 L 4 35 C 4 36, 5 37, 6 37 C 7 37, 7 36, 7 35 L 7 24 C 7 24, 7 24, 8 24 C 8 24, 8 24, 8 24 L 8 35 C 8 36, 9 37, 10 37 C 11 37, 11 36, 11 35 L 11 22 L 4 22 Z M 8 18 C 8 18, 8 18, 8 18 L 8 19 C 8 19, 8 19, 8 19 C 8 19, 7 19, 7 19 L 7 18 C 7 18, 8 18, 8 18 Z M 30 17 L 27 21 C 26 21, 26 21, 26 21 L 22 20 L 19 23 L 19 25 L 36 25 L 36 18 L 34 19 C 34 19, 34 19, 34 19 L 30 17 Z M 8 14 C 8 14, 8 15, 8 15 L 8 16 C 8 16, 8 16, 8 16 C 8 16, 7 16, 7 16 L 7 15 C 7 15, 8 14, 8 14 Z M 8 11 C 8 11, 8 11, 8 11 L 8 12 C 8 13, 8 13, 8 13 C 8 13, 7 13, 7 12 L 7 11 C 7 11, 8 11, 8 11 Z M 36 8 L 34 11 C 34 11, 34 11, 34 11 L 30 11 L 27 14 C 27 14, 27 14, 26 14 L 23 14 L 19 19 L 19 22 L 22 19 C 22 19, 22 19, 22 19 L 26 20 L 30 16 C 30 16, 30 16, 30 16 L 34 18 L 36 16 L 36 8 Z M 23 3 L 38 3 C 39 3, 39 3, 39 3 C 39 4, 39 4, 38 4 L 37 4 L 37 25 L 38 25 C 39 25, 39 25, 39 25 C 39 25, 39 26, 38 26 L 28 26 L 28 28 C 29 29, 30 30, 30 31 C 30 32, 29 33, 27 33 C 26 33, 25 32, 25 31 C 25 30, 26 29, 27 28 L 27 26 L 16 26 C 16 26, 16 25, 16 25 C 16 25, 16 25, 16 25 L 17 25 L 17 10 C 17 10, 18 10, 18 10 C 18 10, 19 10, 19 10 L 19 17 L 23 13 C 23 12, 23 12, 23 12 L 26 13 L 30 9 C 30 9, 30 9, 30 9 L 33 10 L 36 7 L 36 4 L 23 4 C 23 4, 23 4, 23 3 C 23 3, 23 3, 23 3 Z M 18 3 L 13 8 C 12 9, 12 9, 10 9 L 8 9 C 8 9, 8 9, 8 9 C 8 9, 7 9, 7 9 L 4 9 C 2 9, 1 10, 1 11 L 1 22 C 1 22, 2 23, 2 23 C 3 23, 3 22, 3 22 L 3 12 C 3 12, 3 11, 4 11 C 4 11, 4 12, 4 12 L 4 21 L 11 21 L 11 14 C 11 13, 12 12, 12 12 L 20 4 C 20 4, 20 3, 20 3 C 19 2, 19 2, 18 3 Z M 19 1 C 20 1, 20 1, 21 2 C 22 3, 22 4, 21 5 L 13 12 C 13 13, 12 13, 12 14 L 12 35 C 12 37, 11 38, 10 38 C 9 38, 8 38, 8 37 C 7 38, 7 38, 6 38 C 4 38, 3 37, 3 35 L 3 24 C 3 24, 3 24, 2 24 C 1 24, 0 23, 0 22 L 0 11 C 0 9, 2 8, 4 8 L 10 8 C 11 8, 12 7, 12 7 L 18 2 C 18 1, 19 1, 19 1 Z M 8 1 C 7 1, 6 2, 6 3 C 6 5, 7 5, 8 5 C 9 5, 10 5, 10 3 C 10 2, 9 1, 8 1 Z M 8 0 C 10 0, 11 1, 11 3 C 11 5, 10 7, 8 7 C 6 7, 4 5, 4 3 C 4 1, 6 0, 8 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 884,
    "y": 566,
    "width": 38,
    "height": 38,
    "fillColor": "#ffffff",
    "pathD": "M 1 33 L 1 37 L 37 37 L 37 33 L 1 33 Z M 24 22 C 25 22, 25 22, 25 22 C 25 23, 25 23, 24 23 C 24 23, 24 23, 24 22 C 24 22, 24 22, 24 22 Z M 14 22 C 14 22, 14 22, 14 22 C 14 23, 14 23, 14 23 C 13 23, 13 23, 13 22 C 13 22, 13 22, 14 22 Z M 19 15 C 19 15, 19 15, 19 15 L 19 16 C 21 16, 22 17, 22 18 C 22 18, 22 19, 22 19 C 22 19, 21 19, 21 19 C 21 18, 20 17, 19 17 C 18 17, 16 18, 16 19 C 16 20, 17 21, 19 21 C 21 21, 22 23, 22 25 C 22 26, 21 28, 19 28 L 19 29 C 19 29, 19 30, 19 30 C 19 30, 18 29, 18 29 L 18 28 C 17 28, 16 27, 16 26 C 15 26, 16 25, 16 25 C 16 25, 17 25, 17 26 C 17 26, 18 27, 19 27 C 20 27, 21 26, 21 25 C 21 24, 21 23, 19 23 C 16 23, 15 21, 15 19 C 15 18, 17 16, 18 16 L 18 15 C 18 15, 19 15, 19 15 Z M 26 12 L 28 15 C 28 15, 28 15, 28 15 L 28 29 C 28 30, 28 30, 28 30 L 26 32 L 33 32 L 32 30 C 32 30, 31 30, 31 29 L 31 15 C 31 15, 32 15, 32 15 L 33 12 L 26 12 Z M 13 12 L 11 15 L 11 29 L 13 32 L 25 32 L 27 29 L 27 15 L 25 12 L 13 12 Z M 5 12 L 6 15 C 7 15, 7 15, 7 15 L 7 29 C 7 30, 7 30, 6 30 L 5 32 L 12 32 L 10 30 C 10 30, 10 30, 10 29 L 10 15 C 10 15, 10 15, 10 15 L 12 12 L 5 12 Z M 19 5 L 15 8 L 23 8 L 19 5 Z M 19 4 C 19 4, 19 4, 19 4 L 26 8 C 26 8, 26 8, 26 9 C 26 9, 26 9, 25 9 L 12 9 C 12 9, 12 9, 12 9 C 12 8, 12 8, 12 8 L 19 4 Z M 19 1 L 3 11 L 35 11 L 19 1 Z M 19 0 C 19 0, 19 0, 19 0 L 38 11 C 38 11, 38 11, 38 11 C 38 12, 38 12, 37 12 L 35 12 L 33 15 L 33 29 L 35 32 L 37 32 C 38 32, 38 33, 38 33 L 38 37 C 38 38, 38 38, 37 38 L 1 38 C 0 38, 0 38, 0 37 L 0 33 C 0 33, 0 32, 1 32 L 3 32 L 5 29 L 5 15 L 3 12 L 1 12 C 0 12, 0 12, 0 11 C 0 11, 0 11, 0 11 L 19 0 Z"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 0,
    "x": 150,
    "y": 140,
    "width": 60,
    "height": 53,
    "text": "1",
    "textColor": "#3365cc",
    "textSize": 27
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 0,
    "x": 221,
    "y": 153,
    "width": 96,
    "height": 36,
    "text": "Step 01",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-12",
    "x": 216,
    "y": 185,
    "width": 241,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 376,
    "y": 259,
    "width": 60,
    "height": 53,
    "text": "2",
    "textColor": "#ff4d38",
    "textSize": 27
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 447,
    "y": 272,
    "width": 96,
    "height": 36,
    "text": "Step 02",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 0,
    "x": 442,
    "y": 304,
    "width": 253,
    "height": 57,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 2,
    "x": 661,
    "y": 369,
    "width": 60,
    "height": 53,
    "text": "3",
    "textColor": "#52c49c",
    "textSize": 27
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 732,
    "y": 382,
    "width": 96,
    "height": 36,
    "text": "Step 03",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 1,
    "x": 727,
    "y": 414,
    "width": 253,
    "height": 57,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 3,
    "x": 917,
    "y": 480,
    "width": 60,
    "height": 53,
    "text": "4",
    "textColor": "#ffb900",
    "textSize": 27
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 3,
    "x": 988,
    "y": 493,
    "width": 96,
    "height": 36,
    "text": "Step 04",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 984,
    "y": 525,
    "width": 253,
    "height": 57,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
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

export function Imported2025migsopcubedcreativeandexampletemplates160Template({ data }: { data: BrainData }): ReactElement {
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
