import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 81,
    "y": 352,
    "width": 947,
    "height": 154,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 81,
    "y": 514,
    "width": 947,
    "height": 154,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 81,
    "y": 190,
    "width": 947,
    "height": 154,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-78",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 318,
    "y": 127,
    "width": 10,
    "height": 540,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-79",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 495,
    "y": 127,
    "width": 10,
    "height": 540,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-80",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 673,
    "y": 127,
    "width": 10,
    "height": 540,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-81",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 850,
    "y": 127,
    "width": 10,
    "height": 540,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-82",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 141,
    "y": 127,
    "width": 10,
    "height": 540,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 15,
    "x": 88,
    "y": 576,
    "width": 46,
    "height": 29,
    "text": "KPI"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 2,
    "x": 50,
    "y": 414,
    "width": 121,
    "height": 29,
    "text": "Development"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 5,
    "x": 63,
    "y": 252,
    "width": 96,
    "height": 29,
    "text": "Marketing"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 145,
    "y": 161,
    "width": 47,
    "height": 29,
    "text": "Jan"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 2,
    "x": 266,
    "y": 161,
    "width": 48,
    "height": 29,
    "text": "Mar"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 205,
    "y": 161,
    "width": 48,
    "height": 29,
    "text": "Feb"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 3,
    "x": 322,
    "y": 161,
    "width": 47,
    "height": 29,
    "text": "Apr"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 5,
    "x": 444,
    "y": 161,
    "width": 48,
    "height": 29,
    "text": "Jun"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 4,
    "x": 381,
    "y": 161,
    "width": 51,
    "height": 29,
    "text": "May"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 6,
    "x": 502,
    "y": 161,
    "width": 43,
    "height": 29,
    "text": "Jul"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 8,
    "x": 620,
    "y": 161,
    "width": 49,
    "height": 29,
    "text": "Sep"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 7,
    "x": 559,
    "y": 161,
    "width": 51,
    "height": 29,
    "text": "Aug"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 9,
    "x": 677,
    "y": 161,
    "width": 46,
    "height": 29,
    "text": "Oct"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 11,
    "x": 798,
    "y": 161,
    "width": 49,
    "height": 29,
    "text": "Dec"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 10,
    "x": 737,
    "y": 161,
    "width": 50,
    "height": 29,
    "text": "Nov"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 12,
    "x": 854,
    "y": 161,
    "width": 47,
    "height": 29,
    "text": "Jan"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 14,
    "x": 976,
    "y": 161,
    "width": 48,
    "height": 29,
    "text": "Mar"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 13,
    "x": 915,
    "y": 161,
    "width": 48,
    "height": 29,
    "text": "Feb"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 0,
    "x": 148,
    "y": 119,
    "width": 86,
    "height": 36,
    "text": "Q1 2020"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 1,
    "x": 326,
    "y": 119,
    "width": 86,
    "height": 36,
    "text": "Q2 2020"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 2,
    "x": 503,
    "y": 119,
    "width": 86,
    "height": 36,
    "text": "Q3 2020"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 3,
    "x": 680,
    "y": 119,
    "width": 86,
    "height": 36,
    "text": "Q4 2020"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 4,
    "x": 858,
    "y": 119,
    "width": 86,
    "height": 36,
    "text": "Q1 2021"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 0,
    "x": 144,
    "y": 204,
    "width": 58,
    "height": 36,
    "text": ""
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 0,
    "x": 203,
    "y": 204,
    "width": 113,
    "height": 36,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 0 L 56 0 L 57 0 L 113 0 L 113 36 L 57 36 L 56 36 L 0 36 Z"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 144,
    "y": 366,
    "width": 235,
    "height": 36,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 0 L 58 0 L 115 0 L 115 0 L 173 0 L 235 0 L 235 36 L 173 36 L 115 36 L 115 36 L 58 36 L 0 36 Z"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 2,
    "x": 144,
    "y": 411,
    "width": 58,
    "height": 36,
    "text": ""
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 3,
    "x": 144,
    "y": 455,
    "width": 58,
    "height": 36,
    "text": ""
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 6,
    "x": 203,
    "y": 455,
    "width": 92,
    "height": 36,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 0 L 50 0 L 50 0 L 92 0 L 92 36 L 50 36 L 50 36 L 0 36 Z"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 4,
    "x": 144,
    "y": 528,
    "width": 58,
    "height": 36,
    "text": ""
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 5,
    "x": 201,
    "y": 528,
    "width": 58,
    "height": 36,
    "text": ""
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 6,
    "x": 259,
    "y": 528,
    "width": 58,
    "height": 36,
    "text": ""
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 0,
    "x": 146,
    "y": 201,
    "width": 63,
    "height": 42,
    "text": "Press Launch"
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 1,
    "x": 146,
    "y": 408,
    "width": 63,
    "height": 42,
    "text": "Press Launch"
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 2,
    "x": 146,
    "y": 452,
    "width": 63,
    "height": 42,
    "text": "Press Launch"
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 2,
    "x": 146,
    "y": 533,
    "width": 101,
    "height": 26,
    "text": "Press Launch"
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 1,
    "x": 205,
    "y": 209,
    "width": 121,
    "height": 26,
    "text": "Media Campaign"
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 320,
    "y": 204,
    "width": 235,
    "height": 36,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 117 0 L 118 0 L 235 0 L 235 36 L 118 36 L 117 36 L 0 36 Z"
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 0,
    "x": 326,
    "y": 209,
    "width": 151,
    "height": 26,
    "text": "Celebrity Partnerships"
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 557,
    "y": 204,
    "width": 466,
    "height": 36,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 233 0 L 233 0 L 466 0 L 466 36 L 233 36 L 233 36 L 0 36 Z"
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 0,
    "x": 563,
    "y": 209,
    "width": 136,
    "height": 26,
    "text": "Ongoing Marketing"
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 0,
    "x": 146,
    "y": 371,
    "width": 109,
    "height": 26,
    "text": "Mobile Web v1"
  },
  {
    "id": "sp-45",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 381,
    "y": 366,
    "width": 174,
    "height": 36,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 87 0 L 87 0 L 174 0 L 174 36 L 87 36 L 87 36 L 0 36 Z"
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 1,
    "x": 387,
    "y": 371,
    "width": 109,
    "height": 26,
    "text": "Mobile Web v2"
  },
  {
    "id": "sp-47",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 557,
    "y": 366,
    "width": 466,
    "height": 36,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 233 0 L 233 0 L 466 0 L 466 36 L 233 36 L 233 36 L 0 36 Z"
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 1,
    "x": 563,
    "y": 371,
    "width": 136,
    "height": 26,
    "text": "Ongoing Marketing"
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 3,
    "x": 203,
    "y": 411,
    "width": 113,
    "height": 36,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 0 L 56 0 L 57 0 L 113 0 L 113 36 L 57 36 L 56 36 L 0 36 Z"
  },
  {
    "id": "sp-50",
    "dataNodeIdx": 4,
    "x": 205,
    "y": 416,
    "width": 121,
    "height": 26,
    "text": "Media Campaign"
  },
  {
    "id": "sp-51",
    "x": 320,
    "y": 411,
    "width": 204,
    "height": 36,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 102 0 L 102 0 L 204 0 L 204 36 L 102 36 L 102 36 L 0 36 Z"
  },
  {
    "id": "sp-52",
    "dataNodeIdx": 3,
    "x": 326,
    "y": 416,
    "width": 151,
    "height": 26,
    "text": "Celebrity Partnerships"
  },
  {
    "id": "sp-53",
    "x": 527,
    "y": 411,
    "width": 352,
    "height": 36,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 176 0 L 176 0 L 352 0 L 352 36 L 176 36 L 176 36 L 0 36 Z"
  },
  {
    "id": "sp-54",
    "dataNodeIdx": 2,
    "x": 532,
    "y": 416,
    "width": 136,
    "height": 26,
    "text": "Ongoing Marketing"
  },
  {
    "id": "sp-55",
    "x": 205,
    "y": 452,
    "width": 80,
    "height": 42,
    "text": "Media Campaign"
  },
  {
    "id": "sp-56",
    "x": 297,
    "y": 456,
    "width": 258,
    "height": 36,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 129 0 L 129 0 L 258 0 L 258 36 L 129 36 L 129 36 L 0 36 Z"
  },
  {
    "id": "sp-57",
    "dataNodeIdx": 5,
    "x": 303,
    "y": 461,
    "width": 151,
    "height": 26,
    "text": "Celebrity Partnerships"
  },
  {
    "id": "sp-58",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 557,
    "y": 456,
    "width": 175,
    "height": 36,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 87 0 L 88 0 L 175 0 L 175 36 L 88 36 L 87 36 L 0 36 Z"
  },
  {
    "id": "sp-59",
    "dataNodeIdx": 3,
    "x": 563,
    "y": 461,
    "width": 136,
    "height": 26,
    "text": "Ongoing Marketing"
  },
  {
    "id": "sp-60",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 320,
    "y": 528,
    "width": 235,
    "height": 36,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 117 0 L 118 0 L 235 0 L 235 36 L 118 36 L 117 36 L 0 36 Z"
  },
  {
    "id": "sp-61",
    "dataNodeIdx": 6,
    "x": 326,
    "y": 533,
    "width": 151,
    "height": 26,
    "text": "Celebrity Partnerships"
  },
  {
    "id": "sp-62",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 557,
    "y": 528,
    "width": 465,
    "height": 36,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 232 0 L 233 0 L 465 0 L 465 36 L 233 36 L 232 36 L 0 36 Z"
  },
  {
    "id": "sp-63",
    "dataNodeIdx": 4,
    "x": 563,
    "y": 533,
    "width": 136,
    "height": 26,
    "text": "Ongoing Marketing"
  },
  {
    "id": "sp-64",
    "dataNodeIdx": 1,
    "x": 1056,
    "y": 190,
    "width": 144,
    "height": 36,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 0 0 L 72 0 L 72 0 L 144 0 L 144 36 L 72 36 L 72 36 L 0 36 Z"
  },
  {
    "id": "sp-65",
    "dataNodeIdx": 0,
    "x": 1066,
    "y": 195,
    "width": 71,
    "height": 26,
    "text": "Delivery"
  },
  {
    "id": "sp-66",
    "dataNodeIdx": 0,
    "x": 1057,
    "y": 224,
    "width": 204,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-67",
    "dataNodeIdx": 2,
    "x": 1056,
    "y": 304,
    "width": 144,
    "height": 36,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 0 L 72 0 L 72 0 L 144 0 L 144 36 L 72 36 L 72 36 L 0 36 Z"
  },
  {
    "id": "sp-68",
    "dataNodeIdx": 1,
    "x": 1066,
    "y": 309,
    "width": 66,
    "height": 26,
    "text": "Budget"
  },
  {
    "id": "sp-69",
    "dataNodeIdx": 1,
    "x": 1057,
    "y": 339,
    "width": 204,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-70",
    "dataNodeIdx": 7,
    "x": 1056,
    "y": 534,
    "width": 144,
    "height": 36,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 72 0 L 72 0 L 144 0 L 144 36 L 72 36 L 72 36 L 0 36 Z"
  },
  {
    "id": "sp-71",
    "dataNodeIdx": 2,
    "x": 1066,
    "y": 539,
    "width": 71,
    "height": 26,
    "text": "Marcom"
  },
  {
    "id": "sp-72",
    "dataNodeIdx": 3,
    "x": 1057,
    "y": 568,
    "width": 204,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-73",
    "dataNodeIdx": 4,
    "x": 1056,
    "y": 419,
    "width": 144,
    "height": 36,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 72 0 L 72 0 L 144 0 L 144 36 L 72 36 L 72 36 L 0 36 Z"
  },
  {
    "id": "sp-74",
    "dataNodeIdx": 1,
    "x": 1066,
    "y": 424,
    "width": 80,
    "height": 26,
    "text": "Resource"
  },
  {
    "id": "sp-75",
    "dataNodeIdx": 2,
    "x": 1057,
    "y": 454,
    "width": 204,
    "height": 50,
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

export function Migso172Template({ data }: { data: BrainData }): ReactElement {
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
