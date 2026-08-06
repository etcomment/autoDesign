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
    "x": 817,
    "y": 542,
    "width": 184,
    "height": 38,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 9,
    "x": 755,
    "y": 505,
    "width": 123,
    "height": 37,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 16,
    "x": 633,
    "y": 466,
    "width": 61,
    "height": 37,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 755,
    "y": 352,
    "width": 246,
    "height": 38,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 633,
    "y": 314,
    "width": 184,
    "height": 38,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 3,
    "x": 571,
    "y": 277,
    "width": 123,
    "height": 37,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 448,
    "y": 239,
    "width": 184,
    "height": 38,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 66,
    "y": 428,
    "width": 1120,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 66,
    "y": 200,
    "width": 1120,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 3,
    "x": 448,
    "y": 166,
    "width": 61,
    "height": 34,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 4,
    "x": 509,
    "y": 166,
    "width": 61,
    "height": 34,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 5,
    "x": 571,
    "y": 166,
    "width": 61,
    "height": 34,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 6,
    "x": 632,
    "y": 166,
    "width": 61,
    "height": 34,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 7,
    "x": 694,
    "y": 166,
    "width": 61,
    "height": 34,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 8,
    "x": 755,
    "y": 166,
    "width": 61,
    "height": 34,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 9,
    "x": 817,
    "y": 166,
    "width": 61,
    "height": 34,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 10,
    "x": 878,
    "y": 166,
    "width": 61,
    "height": 34,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 11,
    "x": 940,
    "y": 166,
    "width": 61,
    "height": 34,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 12,
    "x": 1001,
    "y": 166,
    "width": 61,
    "height": 34,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 13,
    "x": 1063,
    "y": 166,
    "width": 61,
    "height": 34,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 14,
    "x": 1124,
    "y": 166,
    "width": 61,
    "height": 34,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 0,
    "x": 462,
    "y": 166,
    "width": 31,
    "height": 36,
    "text": "1"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 1,
    "x": 524,
    "y": 166,
    "width": 31,
    "height": 36,
    "text": "2"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 2,
    "x": 586,
    "y": 166,
    "width": 31,
    "height": 36,
    "text": "3"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 3,
    "x": 647,
    "y": 166,
    "width": 31,
    "height": 36,
    "text": "4"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 11,
    "x": 1140,
    "y": 166,
    "width": 31,
    "height": 36,
    "text": "4"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 6,
    "x": 832,
    "y": 166,
    "width": 31,
    "height": 36,
    "text": "3"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 7,
    "x": 893,
    "y": 166,
    "width": 31,
    "height": 36,
    "text": "4"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 8,
    "x": 956,
    "y": 166,
    "width": 31,
    "height": 36,
    "text": "1"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 9,
    "x": 1017,
    "y": 166,
    "width": 31,
    "height": 36,
    "text": "2"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 4,
    "x": 708,
    "y": 166,
    "width": 31,
    "height": 36,
    "text": "1"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 5,
    "x": 770,
    "y": 166,
    "width": 31,
    "height": 36,
    "text": "2"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 10,
    "x": 1078,
    "y": 166,
    "width": 31,
    "height": 36,
    "text": "3"
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 448,
    "y": 128,
    "width": 246,
    "height": 38,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 0,
    "x": 538,
    "y": 131,
    "width": 67,
    "height": 36,
    "text": "2018"
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 694,
    "y": 128,
    "width": 246,
    "height": 38,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 1,
    "x": 784,
    "y": 131,
    "width": 67,
    "height": 36,
    "text": "2019"
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 940,
    "y": 128,
    "width": 246,
    "height": 38,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 2,
    "x": 1030,
    "y": 131,
    "width": 67,
    "height": 36,
    "text": "2020"
  },
  {
    "id": "sp-39",
    "x": 66,
    "y": 128,
    "width": 246,
    "height": 72,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-40",
    "x": 312,
    "y": 128,
    "width": 136,
    "height": 72,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-41",
    "x": 140,
    "y": 146,
    "width": 97,
    "height": 36,
    "text": "Activity"
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 0,
    "x": 324,
    "y": 146,
    "width": 113,
    "height": 36,
    "text": "Progress"
  },
  {
    "id": "sp-75",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 66,
    "y": 238,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-76",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 66,
    "y": 277,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-77",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 66,
    "y": 314,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-78",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 66,
    "y": 352,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-79",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 66,
    "y": 390,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-80",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 66,
    "y": 428,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-81",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 66,
    "y": 466,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-82",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 66,
    "y": 504,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-83",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 66,
    "y": 542,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-84",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 66,
    "y": 580,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-85",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 66,
    "y": 617,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-86",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 311,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-87",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 66,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-88",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 448,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-89",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 509,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-90",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 571,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-91",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 632,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-92",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 694,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-93",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 755,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-94",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 817,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-95",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 878,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-96",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 940,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-97",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 1001,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-98",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 1063,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-99",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 1124,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-100",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 1186,
    "y": 200,
    "width": 10,
    "height": 417,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 0,
    "x": 87,
    "y": 207,
    "width": 105,
    "height": 29,
    "text": "Main Task 1"
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 1,
    "x": 87,
    "y": 246,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 2,
    "x": 87,
    "y": 283,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 4,
    "x": 87,
    "y": 321,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 5,
    "x": 87,
    "y": 359,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 6,
    "x": 87,
    "y": 397,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 1,
    "x": 87,
    "y": 435,
    "width": 105,
    "height": 29,
    "text": "Main Task 2"
  },
  {
    "id": "sp-50",
    "dataNodeIdx": 7,
    "x": 87,
    "y": 473,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-51",
    "dataNodeIdx": 8,
    "x": 87,
    "y": 510,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-52",
    "dataNodeIdx": 10,
    "x": 87,
    "y": 549,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-53",
    "dataNodeIdx": 11,
    "x": 87,
    "y": 587,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-54",
    "dataNodeIdx": 15,
    "x": 331,
    "y": 246,
    "width": 60,
    "height": 29,
    "text": "100%"
  },
  {
    "id": "sp-55",
    "dataNodeIdx": 0,
    "x": 331,
    "y": 283,
    "width": 52,
    "height": 29,
    "text": "25%"
  },
  {
    "id": "sp-56",
    "dataNodeIdx": 1,
    "x": 331,
    "y": 321,
    "width": 52,
    "height": 29,
    "text": "35%"
  },
  {
    "id": "sp-57",
    "dataNodeIdx": 2,
    "x": 331,
    "y": 359,
    "width": 52,
    "height": 29,
    "text": "45%"
  },
  {
    "id": "sp-58",
    "dataNodeIdx": 3,
    "x": 331,
    "y": 397,
    "width": 43,
    "height": 29,
    "text": "0%"
  },
  {
    "id": "sp-59",
    "dataNodeIdx": 4,
    "x": 331,
    "y": 473,
    "width": 52,
    "height": 29,
    "text": "10%"
  },
  {
    "id": "sp-60",
    "dataNodeIdx": 5,
    "x": 331,
    "y": 510,
    "width": 52,
    "height": 29,
    "text": "55%"
  },
  {
    "id": "sp-61",
    "dataNodeIdx": 6,
    "x": 331,
    "y": 549,
    "width": 52,
    "height": 29,
    "text": "27%"
  },
  {
    "id": "sp-62",
    "dataNodeIdx": 7,
    "x": 331,
    "y": 587,
    "width": 43,
    "height": 29,
    "text": "0%"
  },
  {
    "id": "sp-63",
    "dataNodeIdx": 12,
    "x": 746,
    "y": 602,
    "width": 28,
    "height": 24,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 14 0 L 28 24 L 0 24 Z"
  },
  {
    "id": "sp-64",
    "dataNodeIdx": 17,
    "x": 730,
    "y": 628,
    "width": 63,
    "height": 29,
    "text": "Today"
  },
  {
    "id": "sp-65",
    "dataNodeIdx": 0,
    "x": 126,
    "y": 648,
    "width": 78,
    "height": 26,
    "text": "Title here"
  },
  {
    "id": "sp-66",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 85,
    "y": 650,
    "width": 36,
    "height": 15,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-67",
    "dataNodeIdx": 1,
    "x": 271,
    "y": 648,
    "width": 78,
    "height": 26,
    "text": "Title here"
  },
  {
    "id": "sp-68",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 230,
    "y": 650,
    "width": 36,
    "height": 15,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-69",
    "dataNodeIdx": 2,
    "x": 419,
    "y": 648,
    "width": 78,
    "height": 26,
    "text": "Title here"
  },
  {
    "id": "sp-70",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 378,
    "y": 650,
    "width": 36,
    "height": 15,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-71",
    "dataNodeIdx": 3,
    "x": 579,
    "y": 648,
    "width": 78,
    "height": 26,
    "text": "Title here"
  },
  {
    "id": "sp-72",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 538,
    "y": 650,
    "width": 36,
    "height": 15,
    "fillColor": "#ee6d90",
    "text": ""
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

export function Migso114Template({ data }: { data: BrainData }): ReactElement {
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
