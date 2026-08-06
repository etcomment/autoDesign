import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 847,
    "y": 539,
    "width": 137,
    "height": 38,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1054,
    "y": 577,
    "width": 137,
    "height": 37,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 984,
    "y": 463,
    "width": 69,
    "height": 38,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 779,
    "y": 425,
    "width": 137,
    "height": 38,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 847,
    "y": 387,
    "width": 137,
    "height": 38,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-5",
    "x": 503,
    "y": 387,
    "width": 345,
    "height": 38,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 72,
    "y": 502,
    "width": 1120,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-7",
    "x": 72,
    "y": 350,
    "width": 1120,
    "height": 36,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 72,
    "y": 197,
    "width": 1120,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 779,
    "y": 311,
    "width": 68,
    "height": 38,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 641,
    "y": 235,
    "width": 138,
    "height": 38,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 503,
    "y": 275,
    "width": 138,
    "height": 36,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-12",
    "x": 365,
    "y": 236,
    "width": 275,
    "height": 38,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 365,
    "y": 159,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 434,
    "y": 159,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 503,
    "y": 159,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 572,
    "y": 159,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 641,
    "y": 159,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 710,
    "y": 159,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 778,
    "y": 159,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 847,
    "y": 159,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 916,
    "y": 159,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 985,
    "y": 159,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 1054,
    "y": 159,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 1123,
    "y": 159,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-25",
    "x": 71,
    "y": 159,
    "width": 172,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-26",
    "x": 244,
    "y": 159,
    "width": 121,
    "height": 38,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 2,
    "x": 371,
    "y": 160,
    "width": 58,
    "height": 36,
    "fillColor": "#ffffff",
    "text": "JUL",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 3,
    "x": 435,
    "y": 160,
    "width": 67,
    "height": 36,
    "fillColor": "#ffffff",
    "text": "AUG",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 4,
    "x": 506,
    "y": 160,
    "width": 62,
    "height": 36,
    "text": "SEP",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 5,
    "x": 574,
    "y": 160,
    "width": 65,
    "height": 36,
    "text": "OCT",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 12,
    "x": 1126,
    "y": 160,
    "width": 62,
    "height": 36,
    "text": "JUN",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 8,
    "x": 781,
    "y": 160,
    "width": 62,
    "height": 36,
    "text": "JAN",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 9,
    "x": 850,
    "y": 160,
    "width": 62,
    "height": 36,
    "text": "FEB",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 0,
    "x": 917,
    "y": 160,
    "width": 68,
    "height": 36,
    "text": "MAR",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 10,
    "x": 987,
    "y": 160,
    "width": 65,
    "height": 36,
    "text": "APR",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 6,
    "x": 642,
    "y": 160,
    "width": 66,
    "height": 36,
    "text": "NOV",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 7,
    "x": 712,
    "y": 160,
    "width": 65,
    "height": 36,
    "text": "DEC",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 11,
    "x": 1056,
    "y": 160,
    "width": 65,
    "height": 36,
    "text": "MAY",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 0,
    "x": 254,
    "y": 160,
    "width": 102,
    "height": 36,
    "text": "PERIOD",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 0,
    "x": 112,
    "y": 160,
    "width": 90,
    "height": 36,
    "text": "TASKS",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 365,
    "y": 121,
    "width": 413,
    "height": 38
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 0,
    "x": 538,
    "y": 122,
    "width": 67,
    "height": 36,
    "text": "2019",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 778,
    "y": 121,
    "width": 413,
    "height": 38,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 1,
    "x": 951,
    "y": 122,
    "width": 67,
    "height": 36,
    "text": "2020",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-71",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 365,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-72",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 434,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-73",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 503,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-74",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 571,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-75",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 641,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-76",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 709,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-77",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 778,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-78",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 847,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-79",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 916,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-80",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 984,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-81",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 1054,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-82",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 1122,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-83",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 1191,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-84",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 244,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-85",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 71,
    "y": 197,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-86",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 71,
    "y": 235,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-87",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 71,
    "y": 274,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-88",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 71,
    "y": 311,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-89",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 71,
    "y": 349,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-90",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 71,
    "y": 387,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-91",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 71,
    "y": 425,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-92",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 71,
    "y": 463,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-93",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 71,
    "y": 501,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-94",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 71,
    "y": 539,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-95",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 71,
    "y": 577,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-96",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 71,
    "y": 614,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 1,
    "x": 84,
    "y": 204,
    "width": 105,
    "height": 29,
    "text": "Main Task 1",
    "textSize": 12
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 0,
    "x": 84,
    "y": 242,
    "width": 117,
    "height": 29,
    "text": "Subtask here",
    "textSize": 12
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 1,
    "x": 84,
    "y": 280,
    "width": 117,
    "height": 29,
    "text": "Subtask here",
    "textSize": 12
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 2,
    "x": 84,
    "y": 318,
    "width": 117,
    "height": 29,
    "text": "Subtask here",
    "textSize": 12
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 2,
    "x": 84,
    "y": 356,
    "width": 105,
    "height": 29,
    "text": "Main Task 2",
    "textSize": 12
  },
  {
    "id": "sp-50",
    "dataNodeIdx": 3,
    "x": 84,
    "y": 393,
    "width": 117,
    "height": 29,
    "text": "Subtask here",
    "textSize": 12
  },
  {
    "id": "sp-51",
    "dataNodeIdx": 4,
    "x": 84,
    "y": 432,
    "width": 117,
    "height": 29,
    "text": "Subtask here",
    "textSize": 12
  },
  {
    "id": "sp-52",
    "dataNodeIdx": 5,
    "x": 84,
    "y": 470,
    "width": 117,
    "height": 29,
    "text": "Subtask here",
    "textSize": 12
  },
  {
    "id": "sp-53",
    "dataNodeIdx": 3,
    "x": 84,
    "y": 507,
    "width": 105,
    "height": 29,
    "text": "Main Task 3",
    "textSize": 12
  },
  {
    "id": "sp-54",
    "dataNodeIdx": 6,
    "x": 84,
    "y": 545,
    "width": 117,
    "height": 29,
    "text": "Subtask here",
    "textSize": 12
  },
  {
    "id": "sp-55",
    "dataNodeIdx": 7,
    "x": 84,
    "y": 583,
    "width": 117,
    "height": 29,
    "text": "Subtask here",
    "textSize": 12
  },
  {
    "id": "sp-56",
    "dataNodeIdx": 1,
    "x": 253,
    "y": 204,
    "width": 90,
    "height": 29,
    "text": "XXX days",
    "textSize": 12
  },
  {
    "id": "sp-57",
    "dataNodeIdx": 1,
    "x": 253,
    "y": 242,
    "width": 69,
    "height": 29,
    "text": "X days",
    "textSize": 12
  },
  {
    "id": "sp-58",
    "dataNodeIdx": 2,
    "x": 253,
    "y": 280,
    "width": 69,
    "height": 29,
    "text": "X days",
    "textSize": 12
  },
  {
    "id": "sp-59",
    "dataNodeIdx": 3,
    "x": 253,
    "y": 318,
    "width": 69,
    "height": 29,
    "text": "X days",
    "textSize": 12
  },
  {
    "id": "sp-60",
    "dataNodeIdx": 2,
    "x": 253,
    "y": 356,
    "width": 90,
    "height": 29,
    "text": "XXX days",
    "textSize": 12
  },
  {
    "id": "sp-61",
    "dataNodeIdx": 4,
    "x": 253,
    "y": 393,
    "width": 69,
    "height": 29,
    "text": "X days",
    "textSize": 12
  },
  {
    "id": "sp-62",
    "dataNodeIdx": 5,
    "x": 253,
    "y": 432,
    "width": 69,
    "height": 29,
    "text": "X days",
    "textSize": 12
  },
  {
    "id": "sp-63",
    "dataNodeIdx": 6,
    "x": 253,
    "y": 470,
    "width": 69,
    "height": 29,
    "text": "X days",
    "textSize": 12
  },
  {
    "id": "sp-64",
    "dataNodeIdx": 3,
    "x": 253,
    "y": 507,
    "width": 90,
    "height": 29,
    "text": "XXX days",
    "textSize": 12
  },
  {
    "id": "sp-65",
    "dataNodeIdx": 7,
    "x": 253,
    "y": 545,
    "width": 69,
    "height": 29,
    "text": "X days",
    "textSize": 12
  },
  {
    "id": "sp-66",
    "dataNodeIdx": 8,
    "x": 253,
    "y": 583,
    "width": 69,
    "height": 29,
    "text": "X days",
    "textSize": 12
  },
  {
    "id": "sp-67",
    "x": 618,
    "y": 601,
    "width": 28,
    "height": 24,
    "fillColor": "#ffffff",
    "pathD": "M 14 0 L 28 24 L 0 24 Z"
  },
  {
    "id": "sp-68",
    "dataNodeIdx": 13,
    "x": 604,
    "y": 626,
    "width": 55,
    "height": 30,
    "text": "Today",
    "textColor": "#4D4D4D",
    "textSize": 14
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

export function Imported2025migsopcubedcreativeandexampletemplates113Template({ data }: { data: BrainData }): ReactElement {
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
