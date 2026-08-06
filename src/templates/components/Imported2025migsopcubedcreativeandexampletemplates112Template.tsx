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
    "x": 78,
    "y": 615,
    "width": 92,
    "height": 39,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 170,
    "y": 615,
    "width": 92,
    "height": 39,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 263,
    "y": 615,
    "width": 92,
    "height": 39,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 355,
    "y": 615,
    "width": 92,
    "height": 39,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 448,
    "y": 615,
    "width": 92,
    "height": 39,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 540,
    "y": 615,
    "width": 92,
    "height": 39,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 633,
    "y": 615,
    "width": 92,
    "height": 39,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 725,
    "y": 615,
    "width": 92,
    "height": 39,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 818,
    "y": 615,
    "width": 92,
    "height": 39,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 910,
    "y": 615,
    "width": 92,
    "height": 39,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 1003,
    "y": 615,
    "width": 92,
    "height": 39,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 1095,
    "y": 615,
    "width": 92,
    "height": 39,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 9,
    "x": 93,
    "y": 617,
    "width": 62,
    "height": 36,
    "text": "JAN",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 10,
    "x": 186,
    "y": 617,
    "width": 62,
    "height": 36,
    "text": "FEB",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "x": 275,
    "y": 617,
    "width": 68,
    "height": 36,
    "text": "MAR",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 11,
    "x": 369,
    "y": 617,
    "width": 65,
    "height": 36,
    "text": "APR",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 13,
    "x": 555,
    "y": 617,
    "width": 62,
    "height": 36,
    "text": "JUN",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 14,
    "x": 649,
    "y": 617,
    "width": 60,
    "height": 36,
    "text": "JUL",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 15,
    "x": 738,
    "y": 617,
    "width": 67,
    "height": 36,
    "text": "AUG",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 16,
    "x": 833,
    "y": 617,
    "width": 62,
    "height": 36,
    "text": "SEP",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 17,
    "x": 924,
    "y": 617,
    "width": 65,
    "height": 36,
    "text": "OCT",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 18,
    "x": 1016,
    "y": 617,
    "width": 66,
    "height": 36,
    "text": "NOV",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 19,
    "x": 1109,
    "y": 617,
    "width": 65,
    "height": 36,
    "text": "DEC",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 12,
    "x": 462,
    "y": 617,
    "width": 65,
    "height": 36,
    "text": "MAY",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-70",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 170,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-71",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 263,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-72",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 355,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-73",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 448,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-74",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 540,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-75",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 633,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-76",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 725,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-77",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 818,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-78",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 910,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-79",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 1003,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-80",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 1095,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-81",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 1188,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-82",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 78,
    "y": 135,
    "width": 10,
    "height": 480,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 140,
    "y": 548,
    "width": 29,
    "height": 29,
    "fillColor": "#ff4d38",
    "pathD": "M 15 0 L 29 15 L 15 29 L 0 15 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 619,
    "y": 553,
    "width": 28,
    "height": 24,
    "fillColor": "#ffb900",
    "pathD": "M 14 0 L 28 24 L 0 24 Z"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 8,
    "x": 601,
    "y": 579,
    "width": 63,
    "height": 29,
    "text": "Today",
    "textColor": "#4D4D4D",
    "textSize": 14
  },
  {
    "id": "sp-83",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 154,
    "y": 523,
    "width": 10,
    "height": 29,
    "strokeColor": "#ff4d38"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 9,
    "x": 108,
    "y": 491,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 236,
    "y": 548,
    "width": 29,
    "height": 29,
    "fillColor": "#52c49c",
    "pathD": "M 15 0 L 29 15 L 15 29 L 0 15 Z"
  },
  {
    "id": "sp-84",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 251,
    "y": 445,
    "width": 10,
    "height": 106,
    "strokeColor": "#52c49c"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 6,
    "x": 204,
    "y": 414,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 380,
    "y": 548,
    "width": 29,
    "height": 29,
    "fillColor": "#ee6d90",
    "pathD": "M 15 0 L 29 15 L 15 29 L 0 15 Z"
  },
  {
    "id": "sp-85",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 395,
    "y": 523,
    "width": 10,
    "height": 29,
    "strokeColor": "#ee6d90"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 10,
    "x": 348,
    "y": 491,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 433,
    "y": 549,
    "width": 29,
    "height": 29,
    "fillColor": "#4a90d9",
    "pathD": "M 15 0 L 29 15 L 15 29 L 0 15 Z"
  },
  {
    "id": "sp-86",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 448,
    "y": 446,
    "width": 10,
    "height": 106,
    "strokeColor": "#4a90d9"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 7,
    "x": 401,
    "y": 414,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 653,
    "y": 550,
    "width": 29,
    "height": 29,
    "fillColor": "#52c49c",
    "pathD": "M 15 0 L 29 15 L 15 29 L 0 15 Z"
  },
  {
    "id": "sp-87",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 667,
    "y": 525,
    "width": 10,
    "height": 29,
    "strokeColor": "#52c49c"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 11,
    "x": 620,
    "y": 493,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 855,
    "y": 550,
    "width": 29,
    "height": 29,
    "fillColor": "#ee6d90",
    "pathD": "M 15 0 L 29 15 L 15 29 L 0 15 Z"
  },
  {
    "id": "sp-88",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 869,
    "y": 525,
    "width": 10,
    "height": 29,
    "strokeColor": "#ee6d90"
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 12,
    "x": 823,
    "y": 493,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 908,
    "y": 551,
    "width": 29,
    "height": 29,
    "fillColor": "#4a90d9",
    "pathD": "M 15 0 L 29 15 L 15 29 L 0 15 Z"
  },
  {
    "id": "sp-89",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 922,
    "y": 448,
    "width": 10,
    "height": 106,
    "strokeColor": "#4a90d9"
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 8,
    "x": 876,
    "y": 416,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 1100,
    "y": 550,
    "width": 29,
    "height": 29,
    "fillColor": "#ff4d38",
    "pathD": "M 15 0 L 29 15 L 15 29 L 0 15 Z"
  },
  {
    "id": "sp-90",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1114,
    "y": 525,
    "width": 10,
    "height": 29,
    "strokeColor": "#ff4d38"
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 13,
    "x": 1068,
    "y": 493,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 154,
    "y": 156,
    "width": 97,
    "height": 26,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 0,
    "x": 52,
    "y": 157,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 251,
    "y": 194,
    "width": 137,
    "height": 26,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 1,
    "x": 148,
    "y": 196,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-46",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 395,
    "y": 236,
    "width": 97,
    "height": 26,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 2,
    "x": 295,
    "y": 238,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-48",
    "x": 395,
    "y": 272,
    "width": 200,
    "height": 26,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 3,
    "x": 295,
    "y": 274,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-50",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 690,
    "y": 312,
    "width": 137,
    "height": 26,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-51",
    "dataNodeIdx": 4,
    "x": 588,
    "y": 314,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-52",
    "x": 796,
    "y": 348,
    "width": 311,
    "height": 26,
    "fillColor": "#4a90d9"
  },
  {
    "id": "sp-53",
    "dataNodeIdx": 5,
    "x": 696,
    "y": 350,
    "width": 95,
    "height": 22,
    "text": "Date start-end",
    "textColor": "#4D4D4D",
    "textSize": 10
  },
  {
    "id": "sp-54",
    "dataNodeIdx": 0,
    "x": 259,
    "y": 152,
    "width": 99,
    "height": 32,
    "text": "Your title",
    "textSize": 14
  },
  {
    "id": "sp-55",
    "dataNodeIdx": 1,
    "x": 395,
    "y": 191,
    "width": 99,
    "height": 32,
    "text": "Your title",
    "textSize": 14
  },
  {
    "id": "sp-56",
    "dataNodeIdx": 2,
    "x": 501,
    "y": 233,
    "width": 99,
    "height": 32,
    "text": "Your title",
    "textSize": 14
  },
  {
    "id": "sp-57",
    "dataNodeIdx": 3,
    "x": 606,
    "y": 269,
    "width": 99,
    "height": 32,
    "text": "Your title",
    "textSize": 14
  },
  {
    "id": "sp-58",
    "dataNodeIdx": 4,
    "x": 838,
    "y": 309,
    "width": 99,
    "height": 32,
    "text": "Your title",
    "textSize": 14
  },
  {
    "id": "sp-59",
    "dataNodeIdx": 5,
    "x": 1116,
    "y": 345,
    "width": 99,
    "height": 32,
    "text": "Your title",
    "textSize": 14
  },
  {
    "id": "sp-60",
    "dataNodeIdx": 3,
    "x": 123,
    "y": 463,
    "width": 61,
    "height": 32,
    "text": "Goal",
    "textSize": 14
  },
  {
    "id": "sp-61",
    "dataNodeIdx": 4,
    "x": 365,
    "y": 462,
    "width": 61,
    "height": 32,
    "text": "Goal",
    "textSize": 14
  },
  {
    "id": "sp-62",
    "dataNodeIdx": 5,
    "x": 636,
    "y": 462,
    "width": 61,
    "height": 32,
    "text": "Goal",
    "textSize": 14
  },
  {
    "id": "sp-63",
    "dataNodeIdx": 6,
    "x": 840,
    "y": 462,
    "width": 61,
    "height": 32,
    "text": "Goal",
    "textSize": 14
  },
  {
    "id": "sp-64",
    "dataNodeIdx": 2,
    "x": 893,
    "y": 386,
    "width": 61,
    "height": 32,
    "text": "Goal",
    "textSize": 14
  },
  {
    "id": "sp-65",
    "dataNodeIdx": 1,
    "x": 419,
    "y": 386,
    "width": 61,
    "height": 32,
    "text": "Goal",
    "textSize": 14
  },
  {
    "id": "sp-66",
    "dataNodeIdx": 0,
    "x": 221,
    "y": 386,
    "width": 61,
    "height": 32,
    "text": "Goal",
    "textSize": 14
  },
  {
    "id": "sp-67",
    "dataNodeIdx": 7,
    "x": 1084,
    "y": 462,
    "width": 61,
    "height": 32,
    "text": "Goal",
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

export function Imported2025migsopcubedcreativeandexampletemplates112Template({ data }: { data: BrainData }): ReactElement {
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
