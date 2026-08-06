import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-17",
    "x": 80,
    "y": 551,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "grp-1",
    "isGroup": true,
    "children": [
      {
        "id": "sp-18",
        "x": 110,
        "y": 272.43736263736264,
        "width": 111.00000000000001,
        "height": 248.56263736263736,
        "localPctX": 0,
        "localPctY": 0.07252747252747253,
        "localPctW": 1.0000000000000002,
        "localPctH": 0.9274725274725275,
        "fillColor": "#3365cc",
        "pathD": "M 111 249 L 0 249 L 55 0 L 111 249"
      },
      {
        "id": "sp-19",
        "x": 148.37765957446805,
        "y": 254.767032967033,
        "width": 34.83510638297873,
        "height": 34.751648351648356,
        "localPctX": 0.3457446808510636,
        "localPctY": 0.006593406593406729,
        "localPctW": 0.3138297872340426,
        "localPctH": 0.12967032967032968,
        "pathD": "M 35 17 L 35 17 C 35 8, 27 0, 17 0 L 17 0 C 8 0, 0 8, 0 17 L 0 17 C 0 27, 8 35, 17 35 L 17 35 C 27 35, 35 27, 35 17"
      },
      {
        "id": "sp-20",
        "x": 146.0159574468085,
        "y": 253,
        "width": 38.96808510638298,
        "height": 38.87472527472528,
        "localPctX": 0.32446808510638286,
        "localPctY": 0,
        "localPctW": 0.35106382978723405,
        "localPctH": 0.14505494505494507,
        "fillColor": "#3365cc",
        "pathD": "M 19 4 L 19 4 C 11 4, 4 11, 4 19 L 4 19 C 4 28, 11 35, 19 35 L 19 35 C 28 35, 35 28, 35 19 L 35 19 C 35 11, 28 4, 19 4 Z M 19 39 L 19 39 C 9 39, 0 30, 0 19 L 0 19 C 0 9, 9 0, 19 0 L 19 0 C 30 0, 39 9, 39 19 L 39 19 C 39 30, 30 39, 19 39 Z"
      }
    ],
    "x": 110,
    "y": 253,
    "width": 111,
    "height": 268
  },
  {
    "id": "grp-5",
    "isGroup": true,
    "children": [
      {
        "id": "sp-21",
        "x": 269,
        "y": 338.86217008797655,
        "width": 111.00000000000001,
        "height": 182.72727272727275,
        "localPctX": 0,
        "localPctY": 0.09384164222873906,
        "localPctW": 1.0000000000000002,
        "localPctH": 0.9090909090909092,
        "fillColor": "#ff4d38",
        "pathD": "M 111 183 L 0 183 L 55 0 L 111 183"
      },
      {
        "id": "sp-22",
        "x": 306.78723404255317,
        "y": 322.3577712609971,
        "width": 34.83510638297873,
        "height": 34.77712609970675,
        "localPctX": 0.3404255319148934,
        "localPctY": 0.011730205278592453,
        "localPctW": 0.3138297872340426,
        "localPctH": 0.17302052785923755,
        "pathD": "M 35 17 L 35 17 C 35 8, 27 0, 17 0 L 17 0 C 8 0, 0 8, 0 17 L 0 17 C 0 27, 8 35, 17 35 L 17 35 C 27 35, 35 27, 35 17"
      },
      {
        "id": "sp-23",
        "x": 305.0159574468085,
        "y": 320,
        "width": 38.96808510638298,
        "height": 38.903225806451616,
        "localPctX": 0.32446808510638286,
        "localPctY": 0,
        "localPctW": 0.35106382978723405,
        "localPctH": 0.19354838709677422,
        "fillColor": "#ff4d38",
        "pathD": "M 19 4 L 19 4 C 11 4, 4 11, 4 19 L 4 19 C 4 28, 11 35, 19 35 L 19 35 C 28 35, 35 28, 35 19 L 35 19 C 35 11, 28 4, 19 4 Z M 19 39 L 19 39 C 9 39, 0 30, 0 19 L 0 19 C 0 9, 9 0, 19 0 L 19 0 C 30 0, 39 9, 39 19 L 39 19 C 39 30, 30 39, 19 39 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 269,
    "y": 320,
    "width": 111,
    "height": 201
  },
  {
    "id": "grp-9",
    "isGroup": true,
    "children": [
      {
        "id": "sp-24",
        "x": 427,
        "y": 283.48283752860414,
        "width": 111.00000000000001,
        "height": 238.51716247139586,
        "localPctX": 0,
        "localPctY": 0.07551487414187649,
        "localPctW": 1.0000000000000002,
        "localPctH": 0.9244851258581235,
        "fillColor": "#52c49c",
        "pathD": "M 111 238 L 0 238 L 55 0 L 111 238"
      },
      {
        "id": "sp-25",
        "x": 464.7872340425531,
        "y": 265.7711670480549,
        "width": 34.83510638297873,
        "height": 34.83295194508009,
        "localPctX": 0.3404255319148929,
        "localPctY": 0.0068649885583523486,
        "localPctW": 0.3138297872340426,
        "localPctH": 0.13501144164759724,
        "pathD": "M 35 17 L 35 17 C 35 8, 27 0, 17 0 L 17 0 C 8 0, 0 8, 0 17 L 0 17 C 0 27, 8 35, 17 35 L 17 35 C 27 35, 35 27, 35 17"
      },
      {
        "id": "sp-26",
        "x": 463.01595744680844,
        "y": 264,
        "width": 38.96808510638298,
        "height": 38.96567505720824,
        "localPctX": 0.32446808510638236,
        "localPctY": 0,
        "localPctW": 0.35106382978723405,
        "localPctH": 0.15102974828375285,
        "fillColor": "#52c49c",
        "pathD": "M 19 4 L 19 4 C 11 4, 4 11, 4 19 L 4 19 C 4 28, 11 35, 19 35 L 19 35 C 28 35, 35 28, 35 19 L 35 19 C 35 11, 28 4, 19 4 Z M 19 39 L 19 39 C 9 39, 0 30, 0 19 L 0 19 C 0 9, 9 0, 19 0 L 19 0 C 30 0, 39 9, 39 19 L 39 19 C 39 30, 30 39, 19 39 Z"
      }
    ],
    "x": 427,
    "y": 264,
    "width": 111,
    "height": 258
  },
  {
    "id": "grp-13",
    "isGroup": true,
    "children": [
      {
        "id": "sp-27",
        "x": 585,
        "y": 397.4754098360656,
        "width": 111.00000000000001,
        "height": 124.52459016393442,
        "localPctX": 0,
        "localPctY": 0.1352459016393443,
        "localPctW": 1.0000000000000002,
        "localPctH": 0.8647540983606556,
        "fillColor": "#ffb900",
        "pathD": "M 111 124 L 0 124 L 55 0 L 111 124"
      },
      {
        "id": "sp-28",
        "x": 623.377659574468,
        "y": 379.7704918032787,
        "width": 34.83510638297873,
        "height": 34.81967213114754,
        "localPctX": 0.345744680851063,
        "localPctY": 0.01229508196721301,
        "localPctW": 0.3138297872340426,
        "localPctH": 0.24180327868852458,
        "pathD": "M 35 17 L 35 17 C 35 8, 27 0, 17 0 L 17 0 C 8 0, 0 8, 0 17 L 0 17 C 0 27, 8 35, 17 35 L 17 35 C 27 35, 35 27, 35 17"
      },
      {
        "id": "sp-29",
        "x": 621.0159574468084,
        "y": 378,
        "width": 38.96808510638298,
        "height": 38.950819672131146,
        "localPctX": 0.32446808510638236,
        "localPctY": 0,
        "localPctW": 0.35106382978723405,
        "localPctH": 0.2704918032786885,
        "fillColor": "#ffb900",
        "pathD": "M 19 4 L 19 4 C 11 4, 4 11, 4 19 L 4 19 C 4 28, 11 35, 19 35 L 19 35 C 28 35, 35 28, 35 19 L 35 19 C 35 11, 28 4, 19 4 Z M 19 39 L 19 39 C 9 39, 0 30, 0 19 L 0 19 C 0 9, 9 0, 19 0 L 19 0 C 30 0, 39 9, 39 19 L 39 19 C 39 30, 30 39, 19 39 Z"
      }
    ],
    "x": 585,
    "y": 378,
    "width": 111,
    "height": 144
  },
  {
    "id": "grp-17",
    "isGroup": true,
    "children": [
      {
        "id": "sp-30",
        "x": 743,
        "y": 178.86644951140065,
        "width": 111.00000000000001,
        "height": 342.5439739413681,
        "localPctX": 0,
        "localPctY": 0.05211726384364819,
        "localPctW": 1.0000000000000002,
        "localPctH": 0.9462540716612379,
        "fillColor": "#3365cc",
        "pathD": "M 111 343 L 0 343 L 55 0 L 111 343"
      },
      {
        "id": "sp-31",
        "x": 781.3776595744681,
        "y": 161.7687296416938,
        "width": 34.83510638297873,
        "height": 34.785016286644954,
        "localPctX": 0.3457446808510641,
        "localPctY": 0.004885993485341977,
        "localPctW": 0.3138297872340426,
        "localPctH": 0.09609120521172639,
        "pathD": "M 35 17 L 35 17 C 35 8, 27 0, 17 0 L 17 0 C 8 0, 0 8, 0 17 L 0 17 C 0 27, 8 35, 17 35 L 17 35 C 27 35, 35 27, 35 17"
      },
      {
        "id": "sp-32",
        "x": 779.0159574468086,
        "y": 160,
        "width": 38.96808510638298,
        "height": 38.91205211726385,
        "localPctX": 0.3244680851063834,
        "localPctY": 0,
        "localPctW": 0.35106382978723405,
        "localPctH": 0.10749185667752444,
        "fillColor": "#3365cc",
        "pathD": "M 19 4 L 19 4 C 11 4, 4 11, 4 19 L 4 19 C 4 28, 11 35, 19 35 L 19 35 C 28 35, 35 28, 35 19 L 35 19 C 35 11, 28 4, 19 4 Z M 19 39 L 19 39 C 9 39, 0 30, 0 19 L 0 19 C 0 9, 9 0, 19 0 L 19 0 C 30 0, 39 9, 39 19 L 39 19 C 39 30, 30 39, 19 39 Z"
      }
    ],
    "x": 743,
    "y": 160,
    "width": 111,
    "height": 362
  },
  {
    "id": "grp-21",
    "isGroup": true,
    "children": [
      {
        "id": "sp-33",
        "x": 901,
        "y": 452.45033112582786,
        "width": 111.00000000000001,
        "height": 69.54966887417218,
        "localPctX": 0,
        "localPctY": 0.2185430463576164,
        "localPctW": 1.0000000000000002,
        "localPctH": 0.7814569536423841,
        "fillColor": "#ff4d38",
        "pathD": "M 111 70 L 0 70 L 56 0 L 111 70"
      },
      {
        "id": "sp-34",
        "x": 939.3776595744681,
        "y": 434.76821192052984,
        "width": 34.83510638297873,
        "height": 34.77483443708609,
        "localPctX": 0.3457446808510641,
        "localPctY": 0.019867549668874565,
        "localPctW": 0.3138297872340426,
        "localPctH": 0.39072847682119205,
        "pathD": "M 35 17 L 35 17 C 35 8, 27 0, 17 0 L 17 0 C 8 0, 0 8, 0 17 L 0 17 C 0 27, 8 35, 17 35 L 17 35 C 27 35, 35 27, 35 17"
      },
      {
        "id": "sp-35",
        "x": 937.0159574468086,
        "y": 433,
        "width": 38.96808510638298,
        "height": 38.90066225165563,
        "localPctX": 0.3244680851063834,
        "localPctY": 0,
        "localPctW": 0.35106382978723405,
        "localPctH": 0.4370860927152318,
        "fillColor": "#ff4d38",
        "pathD": "M 19 4 L 19 4 C 11 4, 4 11, 4 19 L 4 19 C 4 28, 11 35, 19 35 L 19 35 C 28 35, 35 28, 35 19 L 35 19 C 35 11, 28 4, 19 4 Z M 19 39 L 19 39 C 9 39, 0 30, 0 19 L 0 19 C 0 9, 9 0, 19 0 L 19 0 C 30 0, 39 9, 39 19 L 39 19 C 39 30, 30 39, 19 39 Z"
      }
    ],
    "x": 901,
    "y": 433,
    "width": 111,
    "height": 89
  },
  {
    "id": "grp-25",
    "isGroup": true,
    "children": [
      {
        "id": "sp-36",
        "x": 1059,
        "y": 348.7399380804954,
        "width": 111.00000000000001,
        "height": 173.26006191950466,
        "localPctX": 0,
        "localPctY": 0.09287925696594446,
        "localPctW": 1.0000000000000002,
        "localPctH": 0.9071207430340559,
        "fillColor": "#52c49c",
        "pathD": "M 111 173 L 0 173 L 55 0 L 111 173"
      },
      {
        "id": "sp-37",
        "x": 1097.377659574468,
        "y": 332.77399380804957,
        "width": 34.83510638297873,
        "height": 34.88854489164087,
        "localPctX": 0.345744680851063,
        "localPctY": 0.009287925696594595,
        "localPctW": 0.3138297872340426,
        "localPctH": 0.1826625386996904,
        "pathD": "M 35 17 L 35 17 C 35 8, 27 0, 17 0 L 17 0 C 8 0, 0 8, 0 17 L 0 17 C 0 27, 8 35, 17 35 L 17 35 C 27 35, 35 27, 35 17"
      },
      {
        "id": "sp-38",
        "x": 1095.0159574468084,
        "y": 331,
        "width": 38.96808510638298,
        "height": 39.027863777089784,
        "localPctX": 0.32446808510638236,
        "localPctY": 0,
        "localPctW": 0.35106382978723405,
        "localPctH": 0.2043343653250774,
        "fillColor": "#52c49c",
        "pathD": "M 19 4 L 19 4 C 11 4, 4 11, 4 19 L 4 19 C 4 28, 11 35, 19 35 L 19 35 C 28 35, 35 28, 35 19 L 35 19 C 35 11, 28 4, 19 4 Z M 19 39 L 19 39 C 9 39, 0 30, 0 19 L 0 19 C 0 9, 9 0, 19 0 L 19 0 C 30 0, 39 9, 39 19 L 39 19 C 39 30, 30 39, 19 39 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1059,
    "y": 331,
    "width": 111,
    "height": 191
  },
  {
    "id": "sp-0",
    "x": 105,
    "y": 534,
    "width": 122,
    "height": 36,
    "text": "JANUARY",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-1",
    "x": 255,
    "y": 534,
    "width": 138,
    "height": 36,
    "text": "FEBRUARY",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-2",
    "x": 432,
    "y": 534,
    "width": 99,
    "height": 36,
    "text": "MARCH",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-3",
    "x": 598,
    "y": 534,
    "width": 84,
    "height": 36,
    "text": "APRIL",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-4",
    "x": 765,
    "y": 534,
    "width": 65,
    "height": 36,
    "text": "MAY",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 7,
    "x": 918,
    "y": 534,
    "width": 77,
    "height": 36,
    "text": "JUNE",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 8,
    "x": 1078,
    "y": 534,
    "width": 72,
    "height": 36,
    "text": "JULY",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 127,
    "y": 215,
    "width": 77,
    "height": 29,
    "text": "£17,300",
    "textSize": 12
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 3,
    "x": 290,
    "y": 284,
    "width": 69,
    "height": 29,
    "text": "£7,600",
    "textSize": 12
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 2,
    "x": 443,
    "y": 227,
    "width": 77,
    "height": 29,
    "text": "£15,200",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 5,
    "x": 606,
    "y": 340,
    "width": 69,
    "height": 29,
    "text": "£4,000",
    "textSize": 12
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 0,
    "x": 759,
    "y": 122,
    "width": 77,
    "height": 29,
    "text": "£25,000",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 6,
    "x": 922,
    "y": 397,
    "width": 69,
    "height": 29,
    "text": "£2,000",
    "textSize": 12
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 4,
    "x": 1080,
    "y": 295,
    "width": 69,
    "height": 29,
    "text": "£5,000",
    "textSize": 12
  },
  {
    "id": "sp-14",
    "x": 160,
    "y": 593,
    "width": 911,
    "height": 27,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
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

export function Imported2025migsopcubedcreativeandexampletemplates23Template({ data }: { data: BrainData }): ReactElement {
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
