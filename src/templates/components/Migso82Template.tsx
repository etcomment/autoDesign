import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "grp-0",
    "isGroup": true,
    "children": [
      {
        "id": "sp-2",
        "x": 50,
        "y": 482.84999999999997,
        "width": 694.1982142857142,
        "height": 186.15,
        "localPctX": 0,
        "localPctY": 0.6578124999999999,
        "localPctW": 0.5794642857142857,
        "localPctH": 0.34218750000000003,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-3",
        "x": 765.5910714285715,
        "y": 482.84999999999997,
        "width": 482.40892857142853,
        "height": 186.15,
        "localPctX": 0.5973214285714286,
        "localPctY": 0.6578124999999999,
        "localPctW": 0.4026785714285714,
        "localPctH": 0.34218750000000003,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-4",
        "x": 50,
        "y": 326.45,
        "width": 384.0017857142857,
        "height": 141.95,
        "localPctX": 0,
        "localPctY": 0.3703125,
        "localPctW": 0.32053571428571426,
        "localPctH": 0.2609375,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-5",
        "x": 50,
        "y": 125,
        "width": 462.0857142857143,
        "height": 186.15,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.38571428571428573,
        "localPctH": 0.34218750000000003,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-6",
        "x": 457.5339285714286,
        "y": 326.45,
        "width": 384.0017857142857,
        "height": 141.95,
        "localPctX": 0.34017857142857144,
        "localPctY": 0.3703125,
        "localPctW": 0.32053571428571426,
        "localPctH": 0.2609375,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-7",
        "x": 863.9982142857143,
        "y": 326.45,
        "width": 384.0017857142857,
        "height": 141.95,
        "localPctX": 0.6794642857142857,
        "localPctY": 0.3703125,
        "localPctW": 0.32053571428571426,
        "localPctH": 0.2609375,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-8",
        "x": 785.9142857142857,
        "y": 125,
        "width": 462.0857142857143,
        "height": 186.15,
        "localPctX": 0.6142857142857143,
        "localPctY": 0,
        "localPctW": 0.38571428571428573,
        "localPctH": 0.34218750000000003,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-9",
        "x": 512.0857142857143,
        "y": 125,
        "width": 273.8285714285714,
        "height": 186.15,
        "localPctX": 0.38571428571428573,
        "localPctY": 0,
        "localPctW": 0.22857142857142856,
        "localPctH": 0.34218750000000003,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-10",
        "x": 62.83571428571429,
        "y": 486.25,
        "width": 162.5857142857143,
        "height": 35.699999999999996,
        "localPctX": 0.010714285714285718,
        "localPctY": 0.6640625,
        "localPctW": 0.1357142857142857,
        "localPctH": 0.06562499999999999,
        "text": "Your title here"
      },
      {
        "id": "sp-11",
        "x": 592.3089285714286,
        "y": 547.45,
        "width": 35.29821428571429,
        "height": 41.65,
        "localPctX": 0.4526785714285715,
        "localPctY": 0.7765625,
        "localPctW": 0.029464285714285717,
        "localPctH": 0.07656249999999999,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 9 41.65 L 9 17 L 0 17 L 18 0 L 35.29821428571429 17 L 26 17 L 26 41.65 Z"
      },
      {
        "id": "sp-12",
        "x": 671.4625,
        "y": 547.45,
        "width": 35.29821428571429,
        "height": 41.65,
        "localPctX": 0.5187499999999999,
        "localPctY": 0.7765625,
        "localPctW": 0.029464285714285717,
        "localPctH": 0.07656249999999999,
        "fillColor": "#52c49c",
        "text": "",
        "pathD": "M 9 0 L 26 0 L 26 25 L 35.29821428571429 25 L 18 41.65 L 0 25 L 9 25 Z"
      },
      {
        "id": "sp-13",
        "x": 607.2839285714285,
        "y": 495.59999999999997,
        "width": 84.50178571428572,
        "height": 48.449999999999996,
        "localPctX": 0.4651785714285714,
        "localPctY": 0.6812499999999999,
        "localPctW": 0.07053571428571428,
        "localPctH": 0.08906249999999999,
        "text": "73%"
      },
      {
        "id": "sp-14",
        "x": 584.8214285714286,
        "y": 594.2,
        "width": 51.34285714285714,
        "height": 28.9,
        "localPctX": 0.4464285714285714,
        "localPctY": 0.8625,
        "localPctW": 0.04285714285714286,
        "localPctH": 0.053125,
        "text": "73%"
      },
      {
        "id": "sp-15",
        "x": 663.975,
        "y": 594.2,
        "width": 51.34285714285714,
        "height": 28.9,
        "localPctX": 0.5125000000000001,
        "localPctY": 0.8625,
        "localPctW": 0.04285714285714286,
        "localPctH": 0.053125,
        "text": "73%"
      },
      {
        "id": "sp-16",
        "x": 570.9160714285714,
        "y": 614.6,
        "width": 78.08392857142857,
        "height": 43.35,
        "localPctX": 0.4348214285714285,
        "localPctY": 0.9,
        "localPctW": 0.06517857142857143,
        "localPctH": 0.07968750000000001,
        "text": "Type your text here"
      },
      {
        "id": "sp-17",
        "x": 651.1392857142857,
        "y": 614.6,
        "width": 78.08392857142857,
        "height": 43.35,
        "localPctX": 0.5017857142857143,
        "localPctY": 0.9,
        "localPctW": 0.06517857142857143,
        "localPctH": 0.07968750000000001,
        "text": "Type your text here"
      },
      {
        "id": "sp-18",
        "x": 1087.5535714285713,
        "y": 500.7,
        "width": 35.29821428571429,
        "height": 41.65,
        "localPctX": 0.8660714285714285,
        "localPctY": 0.6906249999999999,
        "localPctW": 0.029464285714285717,
        "localPctH": 0.07656249999999999,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 9 41.65 L 9 17 L 0 17 L 18 0 L 35.29821428571429 17 L 26 17 L 26 41.65 Z"
      },
      {
        "id": "sp-19",
        "x": 1166.7071428571428,
        "y": 500.7,
        "width": 35.29821428571429,
        "height": 41.65,
        "localPctX": 0.932142857142857,
        "localPctY": 0.6906249999999999,
        "localPctW": 0.029464285714285717,
        "localPctH": 0.07656249999999999,
        "fillColor": "#52c49c",
        "text": "",
        "pathD": "M 9 0 L 26 0 L 26 25 L 35.29821428571429 25 L 18 41.65 L 0 25 L 9 25 Z"
      },
      {
        "id": "sp-20",
        "x": 1078.9964285714284,
        "y": 547.45,
        "width": 51.34285714285714,
        "height": 28.9,
        "localPctX": 0.8589285714285713,
        "localPctY": 0.7765625,
        "localPctW": 0.04285714285714286,
        "localPctH": 0.053125,
        "text": "73%"
      },
      {
        "id": "sp-21",
        "x": 1159.2196428571428,
        "y": 547.45,
        "width": 51.34285714285714,
        "height": 28.9,
        "localPctX": 0.9258928571428572,
        "localPctY": 0.7765625,
        "localPctW": 0.04285714285714286,
        "localPctH": 0.053125,
        "text": "73%"
      },
      {
        "id": "sp-22",
        "x": 1065.0910714285712,
        "y": 567.8499999999999,
        "width": 78.08392857142857,
        "height": 43.35,
        "localPctX": 0.8473214285714284,
        "localPctY": 0.8140624999999998,
        "localPctW": 0.06517857142857143,
        "localPctH": 0.07968750000000001,
        "text": "Type your text here"
      },
      {
        "id": "sp-23",
        "x": 1145.3142857142857,
        "y": 567.8499999999999,
        "width": 78.08392857142857,
        "height": 43.35,
        "localPctX": 0.9142857142857143,
        "localPctY": 0.8140624999999998,
        "localPctW": 0.06517857142857143,
        "localPctH": 0.07968750000000001,
        "text": "Type your text here"
      },
      {
        "id": "sp-24",
        "x": 1056.5339285714285,
        "y": 610.35,
        "width": 178.63035714285715,
        "height": 56.949999999999996,
        "localPctX": 0.8401785714285714,
        "localPctY": 0.8921875,
        "localPctW": 0.14910714285714285,
        "localPctH": 0.10468749999999999,
        "text": "MIGSO-PCUBED content and words to be added here as required"
      },
      {
        "id": "sp-25",
        "x": 62.83571428571429,
        "y": 366.4,
        "width": 84.50178571428572,
        "height": 48.449999999999996,
        "localPctX": 0.010714285714285718,
        "localPctY": 0.44375,
        "localPctW": 0.07053571428571428,
        "localPctH": 0.08906249999999999,
        "text": "73%"
      },
      {
        "id": "sp-26",
        "x": 62.83571428571429,
        "y": 331.54999999999995,
        "width": 111.24285714285713,
        "height": 35.699999999999996,
        "localPctX": 0.010714285714285718,
        "localPctY": 0.3796874999999999,
        "localPctW": 0.09285714285714285,
        "localPctH": 0.06562499999999999,
        "text": "Your title"
      },
      {
        "id": "sp-27",
        "x": 62.83571428571429,
        "y": 405.5,
        "width": 159.37678571428572,
        "height": 56.949999999999996,
        "localPctX": 0.010714285714285718,
        "localPctY": 0.515625,
        "localPctW": 0.13303571428571428,
        "localPctH": 0.10468749999999999,
        "text": "MIGSO-PCUBED content and words to be added here as required"
      },
      {
        "id": "sp-28",
        "x": 468.23035714285714,
        "y": 409.75,
        "width": 84.50178571428572,
        "height": 48.449999999999996,
        "localPctX": 0.34910714285714284,
        "localPctY": 0.5234375,
        "localPctW": 0.07053571428571428,
        "localPctH": 0.08906249999999999,
        "text": "73%"
      },
      {
        "id": "sp-29",
        "x": 468.23035714285714,
        "y": 331.54999999999995,
        "width": 111.24285714285713,
        "height": 35.699999999999996,
        "localPctX": 0.34910714285714284,
        "localPctY": 0.3796874999999999,
        "localPctW": 0.09285714285714285,
        "localPctH": 0.06562499999999999,
        "text": "Your title"
      },
      {
        "id": "sp-30",
        "x": 468.23035714285714,
        "y": 355.34999999999997,
        "width": 159.37678571428572,
        "height": 56.949999999999996,
        "localPctX": 0.34910714285714284,
        "localPctY": 0.4234374999999999,
        "localPctW": 0.13303571428571428,
        "localPctH": 0.10468749999999999,
        "text": "MIGSO-PCUBED content and words to be added here as required"
      },
      {
        "id": "sp-31",
        "x": 1144.2446428571427,
        "y": 409.75,
        "width": 84.50178571428572,
        "height": 48.449999999999996,
        "localPctX": 0.913392857142857,
        "localPctY": 0.5234375,
        "localPctW": 0.07053571428571428,
        "localPctH": 0.08906249999999999,
        "text": "73%"
      },
      {
        "id": "sp-32",
        "x": 1069.3696428571427,
        "y": 355.34999999999997,
        "width": 159.37678571428572,
        "height": 56.949999999999996,
        "localPctX": 0.850892857142857,
        "localPctY": 0.4234374999999999,
        "localPctW": 0.13303571428571428,
        "localPctH": 0.10468749999999999,
        "text": "MIGSO-PCUBED content and words to be added here as required"
      },
      {
        "id": "sp-33",
        "x": 131.29285714285714,
        "y": 161.55,
        "width": 99.47678571428571,
        "height": 57.8,
        "localPctX": 0.06785714285714285,
        "localPctY": 0.06718750000000002,
        "localPctW": 0.08303571428571428,
        "localPctH": 0.10625,
        "text": "73%"
      },
      {
        "id": "sp-34",
        "x": 67.11428571428571,
        "y": 219.35,
        "width": 227.83392857142857,
        "height": 45.05,
        "localPctX": 0.014285714285714285,
        "localPctY": 0.1734375,
        "localPctW": 0.19017857142857142,
        "localPctH": 0.0828125,
        "text": "MIGSO-PCUBED content and words to be added here as required"
      },
      {
        "id": "sp-35",
        "x": 356.9875,
        "y": 189.6,
        "width": 35.29821428571429,
        "height": 41.65,
        "localPctX": 0.25625000000000003,
        "localPctY": 0.11875,
        "localPctW": 0.029464285714285717,
        "localPctH": 0.07656249999999999,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 9 41.65 L 9 17 L 0 17 L 18 0 L 35.29821428571429 17 L 26 17 L 26 41.65 Z"
      },
      {
        "id": "sp-36",
        "x": 436.1410714285714,
        "y": 189.6,
        "width": 35.29821428571429,
        "height": 41.65,
        "localPctX": 0.3223214285714286,
        "localPctY": 0.11875,
        "localPctW": 0.029464285714285717,
        "localPctH": 0.07656249999999999,
        "fillColor": "#52c49c",
        "text": "",
        "pathD": "M 9 0 L 26 0 L 26 25 L 35.29821428571429 25 L 18 41.65 L 0 25 L 9 25 Z"
      },
      {
        "id": "sp-37",
        "x": 371.96250000000003,
        "y": 137.75,
        "width": 84.50178571428572,
        "height": 48.449999999999996,
        "localPctX": 0.26875000000000004,
        "localPctY": 0.0234375,
        "localPctW": 0.07053571428571428,
        "localPctH": 0.08906249999999999,
        "text": "73%"
      },
      {
        "id": "sp-38",
        "x": 348.43035714285713,
        "y": 236.35,
        "width": 51.34285714285714,
        "height": 28.9,
        "localPctX": 0.24910714285714286,
        "localPctY": 0.2046875,
        "localPctW": 0.04285714285714286,
        "localPctH": 0.053125,
        "text": "73%"
      },
      {
        "id": "sp-39",
        "x": 428.6535714285714,
        "y": 236.35,
        "width": 51.34285714285714,
        "height": 28.9,
        "localPctX": 0.31607142857142856,
        "localPctY": 0.2046875,
        "localPctW": 0.04285714285714286,
        "localPctH": 0.053125,
        "text": "73%"
      },
      {
        "id": "sp-40",
        "x": 334.52500000000003,
        "y": 256.75,
        "width": 78.08392857142857,
        "height": 43.35,
        "localPctX": 0.23750000000000002,
        "localPctY": 0.2421875,
        "localPctW": 0.06517857142857143,
        "localPctH": 0.07968750000000001,
        "text": "Type your text here"
      },
      {
        "id": "sp-41",
        "x": 414.7482142857143,
        "y": 256.75,
        "width": 78.08392857142857,
        "height": 43.35,
        "localPctX": 0.30446428571428574,
        "localPctY": 0.2421875,
        "localPctW": 0.06517857142857143,
        "localPctH": 0.07968750000000001,
        "text": "Type your text here"
      },
      {
        "id": "sp-42",
        "x": 580.5428571428571,
        "y": 181.1,
        "width": 111.24285714285713,
        "height": 35.699999999999996,
        "localPctX": 0.44285714285714284,
        "localPctY": 0.103125,
        "localPctW": 0.09285714285714285,
        "localPctH": 0.06562499999999999,
        "text": "Your title"
      },
      {
        "id": "sp-43",
        "x": 534.5482142857143,
        "y": 219.35,
        "width": 227.83392857142857,
        "height": 45.05,
        "localPctX": 0.4044642857142857,
        "localPctY": 0.1734375,
        "localPctW": 0.19017857142857142,
        "localPctH": 0.0828125,
        "text": "MIGSO-PCUBED content and words to be added here as required"
      }
    ],
    "x": 50,
    "y": 125,
    "width": 1198,
    "height": 544
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

export function Migso82Template({ data }: { data: BrainData }): ReactElement {
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
