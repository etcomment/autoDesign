import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 497,
    "y": 125,
    "width": 285,
    "height": 94,
    "pathD": "M 10 0 L 275 0 Q 285 0 285 10 L 285 84 Q 285 94 275 94 L 10 94 Q 0 94 0 84 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 547,
    "y": 281,
    "width": 186,
    "height": 119,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 752,
    "y": 281,
    "width": 186,
    "height": 119,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 343,
    "y": 281,
    "width": 186,
    "height": 119,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 937,
    "y": 124,
    "width": 186,
    "height": 119,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 157,
    "y": 124,
    "width": 186,
    "height": 119,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1023,
    "y": 315,
    "width": 195,
    "height": 34,
    "fillColor": "#ee6d90",
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1023,
    "y": 374,
    "width": 195,
    "height": 34,
    "fillColor": "#ee6d90",
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1023,
    "y": 432,
    "width": 195,
    "height": 34,
    "fillColor": "#ee6d90",
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 820,
    "y": 491,
    "width": 195,
    "height": 34,
    "fillColor": "#ffb900",
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 820,
    "y": 550,
    "width": 195,
    "height": 34,
    "fillColor": "#ffb900",
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 820,
    "y": 608,
    "width": 195,
    "height": 34,
    "fillColor": "#ffb900",
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 265,
    "y": 491,
    "width": 195,
    "height": 34,
    "fillColor": "#ff4d38",
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 265,
    "y": 550,
    "width": 195,
    "height": 34,
    "fillColor": "#ff4d38",
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 265,
    "y": 608,
    "width": 195,
    "height": 34,
    "fillColor": "#ff4d38",
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 61,
    "y": 315,
    "width": 195,
    "height": 34,
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 61,
    "y": 374,
    "width": 195,
    "height": 34,
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 61,
    "y": 432,
    "width": 195,
    "height": 34,
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 542,
    "y": 462,
    "width": 195,
    "height": 34,
    "fillColor": "#52c49c",
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 542,
    "y": 521,
    "width": 195,
    "height": 34,
    "fillColor": "#52c49c",
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 542,
    "y": 580,
    "width": 195,
    "height": 34,
    "fillColor": "#52c49c",
    "pathD": "M 10 0 L 185 0 Q 195 0 195 10 L 195 24 Q 195 34 185 34 L 10 34 Q 0 34 0 24 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-54",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 887,
    "y": 313,
    "width": 206,
    "height": 66,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-55",
    "dataNodeIdx": 2,
    "x": 916,
    "y": 284,
    "width": 148,
    "height": 66,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-56",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 945,
    "y": 255,
    "width": 90,
    "height": 66,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-57",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 683,
    "y": 488,
    "width": 225,
    "height": 49,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-58",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 712,
    "y": 459,
    "width": 166,
    "height": 49,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-59",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 741,
    "y": 430,
    "width": 107,
    "height": 49,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-60",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 373,
    "y": 488,
    "width": 225,
    "height": 49,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-61",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 402,
    "y": 459,
    "width": 166,
    "height": 49,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-62",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 431,
    "y": 430,
    "width": 107,
    "height": 49,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-63",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 185,
    "y": 315,
    "width": 206,
    "height": 63,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-64",
    "dataNodeIdx": 1,
    "x": 214,
    "y": 286,
    "width": 148,
    "height": 63,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-65",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 243,
    "y": 256,
    "width": 89,
    "height": 63,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-66",
    "x": 609,
    "y": 432,
    "width": 62,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-67",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 628,
    "y": 509,
    "width": 24,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-68",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 628,
    "y": 567,
    "width": 24,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 0,
    "x": 71,
    "y": 314,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 2,
    "x": 71,
    "y": 372,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 4,
    "x": 71,
    "y": 431,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 6,
    "x": 274,
    "y": 489,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 10,
    "x": 274,
    "y": 548,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 13,
    "x": 274,
    "y": 607,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 9,
    "x": 829,
    "y": 489,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 12,
    "x": 829,
    "y": 548,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 14,
    "x": 829,
    "y": 607,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 1,
    "x": 1033,
    "y": 314,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 3,
    "x": 1033,
    "y": 372,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 5,
    "x": 1033,
    "y": 431,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 7,
    "x": 552,
    "y": 460,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 8,
    "x": 552,
    "y": 519,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 11,
    "x": 552,
    "y": 577,
    "width": 176,
    "height": 37,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 0,
    "x": 562,
    "y": 142,
    "width": 155,
    "height": 61,
    "text": "Decision tree analysis",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 0,
    "x": 195,
    "y": 128,
    "width": 109,
    "height": 36,
    "text": "TITLE 1",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 178,
    "y": 164,
    "width": 144,
    "height": 10,
    "pathD": "M 10 0 L 134 0 Q 144 0 144 10 L 144 -6 Q 144 4 134 4 L 10 4 Q 0 4 0 -6 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 0,
    "x": 163,
    "y": 170,
    "width": 175,
    "height": 41,
    "text": "MIGSO-PCUBED content and words",
    "textSize": 10
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 2,
    "x": 381,
    "y": 287,
    "width": 109,
    "height": 36,
    "text": "TITLE 2",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 363,
    "y": 323,
    "width": 144,
    "height": 10,
    "fillColor": "#ff4d38",
    "pathD": "M 10 0 L 134 0 Q 144 0 144 10 L 144 -6 Q 144 4 134 4 L 10 4 Q 0 4 0 -6 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 2,
    "x": 348,
    "y": 329,
    "width": 175,
    "height": 41,
    "text": "MIGSO-PCUBED content and words",
    "textSize": 10
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 3,
    "x": 585,
    "y": 287,
    "width": 109,
    "height": 36,
    "text": "TITLE 3",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 568,
    "y": 323,
    "width": 144,
    "height": 10,
    "fillColor": "#52c49c",
    "pathD": "M 10 0 L 134 0 Q 144 0 144 10 L 144 -6 Q 144 4 134 4 L 10 4 Q 0 4 0 -6 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 3,
    "x": 552,
    "y": 329,
    "width": 175,
    "height": 41,
    "text": "MIGSO-PCUBED content and words",
    "textSize": 10
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 4,
    "x": 790,
    "y": 287,
    "width": 109,
    "height": 36,
    "text": "TITLE 4",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-47",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 773,
    "y": 323,
    "width": 144,
    "height": 10,
    "fillColor": "#ffb900",
    "pathD": "M 10 0 L 134 0 Q 144 0 144 10 L 144 -6 Q 144 4 134 4 L 10 4 Q 0 4 0 -6 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 4,
    "x": 757,
    "y": 329,
    "width": 175,
    "height": 41,
    "text": "MIGSO-PCUBED content and words",
    "textSize": 10
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 1,
    "x": 975,
    "y": 128,
    "width": 109,
    "height": 36,
    "text": "TITLE 5",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-50",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 958,
    "y": 164,
    "width": 144,
    "height": 10,
    "fillColor": "#ee6d90",
    "pathD": "M 10 0 L 134 0 Q 144 0 144 10 L 144 -6 Q 144 4 134 4 L 10 4 Q 0 4 0 -6 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-51",
    "dataNodeIdx": 1,
    "x": 942,
    "y": 170,
    "width": 175,
    "height": 41,
    "text": "MIGSO-PCUBED content and words",
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

export function Imported2025migsopcubedcreativeandexampletemplates91Template({ data }: { data: BrainData }): ReactElement {
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
