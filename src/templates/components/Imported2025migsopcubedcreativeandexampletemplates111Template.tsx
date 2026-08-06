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
        "id": "sp-46",
        "x": 160,
        "y": 290.0729927007299,
        "width": 990,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.4306569343065693,
        "localPctW": 1,
        "localPctH": 0.003236245954692557,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-47",
        "x": 160,
        "y": 334.0547445255474,
        "width": 990,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.5729927007299268,
        "localPctW": 1,
        "localPctH": 0.003236245954692557,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-48",
        "x": 160,
        "y": 378.0364963503649,
        "width": 990,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.7153284671532846,
        "localPctW": 1,
        "localPctH": 0.003236245954692557,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-49",
        "x": 160,
        "y": 422.01824817518246,
        "width": 990,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.8576642335766422,
        "localPctW": 1,
        "localPctH": 0.003236245954692557,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-50",
        "x": 160,
        "y": 157,
        "width": 990,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.003236245954692557,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-51",
        "x": 160,
        "y": 200.98175182481748,
        "width": 990,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.14233576642335755,
        "localPctW": 1,
        "localPctH": 0.003236245954692557,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-52",
        "x": 160,
        "y": 244.96350364963502,
        "width": 990,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.28467153284671526,
        "localPctW": 1,
        "localPctH": 0.003236245954692557,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-53",
        "x": 160,
        "y": 465.99999999999994,
        "width": 990,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.9999999999999998,
        "localPctW": 1,
        "localPctH": 0.003236245954692557,
        "strokeColor": "#ffffff"
      }
    ],
    "x": 160,
    "y": 157,
    "width": 990,
    "height": 309
  },
  {
    "id": "grp-9",
    "isGroup": true,
    "children": [
      {
        "id": "sp-54",
        "x": 184,
        "y": 140,
        "width": 10,
        "height": 359,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.0010362694300518134,
        "localPctH": 1,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-55",
        "x": 271.90890269151134,
        "y": 140,
        "width": 10,
        "height": 359,
        "localPctX": 0.09109730848861279,
        "localPctY": 0,
        "localPctW": 0.0010362694300518134,
        "localPctH": 1,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-56",
        "x": 359.8178053830228,
        "y": 140,
        "width": 10,
        "height": 359,
        "localPctX": 0.1821946169772257,
        "localPctY": 0,
        "localPctW": 0.0010362694300518134,
        "localPctH": 1,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-57",
        "x": 447.72670807453414,
        "y": 140,
        "width": 10,
        "height": 359,
        "localPctX": 0.27329192546583847,
        "localPctY": 0,
        "localPctW": 0.0010362694300518134,
        "localPctH": 1,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-58",
        "x": 534.6366459627329,
        "y": 140,
        "width": 10,
        "height": 359,
        "localPctX": 0.36335403726708076,
        "localPctY": 0,
        "localPctW": 0.0010362694300518134,
        "localPctH": 1,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-59",
        "x": 622.5455486542443,
        "y": 140,
        "width": 10,
        "height": 359,
        "localPctX": 0.45445134575569357,
        "localPctY": 0,
        "localPctW": 0.0010362694300518134,
        "localPctH": 1,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-60",
        "x": 710.4544513457556,
        "y": 140,
        "width": 10,
        "height": 359,
        "localPctX": 0.5455486542443063,
        "localPctY": 0,
        "localPctW": 0.0010362694300518134,
        "localPctH": 1,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-61",
        "x": 798.3633540372671,
        "y": 140,
        "width": 10,
        "height": 359,
        "localPctX": 0.6366459627329193,
        "localPctY": 0,
        "localPctW": 0.0010362694300518134,
        "localPctH": 1,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-62",
        "x": 885.2732919254657,
        "y": 140,
        "width": 10,
        "height": 359,
        "localPctX": 0.7267080745341614,
        "localPctY": 0,
        "localPctW": 0.0010362694300518134,
        "localPctH": 1,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-63",
        "x": 973.1821946169772,
        "y": 140,
        "width": 10,
        "height": 359,
        "localPctX": 0.8178053830227743,
        "localPctY": 0,
        "localPctW": 0.0010362694300518134,
        "localPctH": 1,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-64",
        "x": 1061.0910973084885,
        "y": 140,
        "width": 10,
        "height": 359,
        "localPctX": 0.9089026915113871,
        "localPctY": 0,
        "localPctW": 0.0010362694300518134,
        "localPctH": 1,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-65",
        "x": 1149,
        "y": 140,
        "width": 10,
        "height": 359,
        "localPctX": 1,
        "localPctY": 0,
        "localPctW": 0.0010362694300518134,
        "localPctH": 1,
        "strokeColor": "#ffffff"
      }
    ],
    "x": 184,
    "y": 140,
    "width": 965,
    "height": 359
  },
  {
    "id": "sp-0",
    "x": 184,
    "y": 148,
    "width": 236,
    "height": 17,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-1",
    "x": 367,
    "y": 191,
    "width": 203,
    "height": 17,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 622,
    "y": 278,
    "width": 175,
    "height": 17,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-3",
    "x": 498,
    "y": 237,
    "width": 193,
    "height": 17,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 709,
    "y": 326,
    "width": 177,
    "height": 17,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-5",
    "x": 375,
    "y": 457,
    "width": 774,
    "height": 17,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 834,
    "y": 369,
    "width": 96,
    "height": 17,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 929,
    "y": 415,
    "width": 96,
    "height": 17,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 758,
    "y": 160,
    "width": 264,
    "height": 81
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 890,
    "y": 274,
    "width": 264,
    "height": 81,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 226,
    "y": 359,
    "width": 264,
    "height": 81,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 0,
    "x": 158,
    "y": 503,
    "width": 52,
    "height": 31,
    "text": "JAN",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 246,
    "y": 503,
    "width": 53,
    "height": 31,
    "text": "FEB",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 331,
    "y": 503,
    "width": 58,
    "height": 31,
    "text": "MAR",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 420,
    "y": 503,
    "width": 55,
    "height": 31,
    "text": "APR",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 4,
    "x": 597,
    "y": 503,
    "width": 53,
    "height": 31,
    "text": "JUN",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 686,
    "y": 503,
    "width": 51,
    "height": 31,
    "text": "JUL",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 5,
    "x": 770,
    "y": 503,
    "width": 57,
    "height": 31,
    "text": "AUG",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 6,
    "x": 859,
    "y": 503,
    "width": 54,
    "height": 31,
    "text": "SEP",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 7,
    "x": 946,
    "y": 503,
    "width": 56,
    "height": 31,
    "text": "OCT",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 8,
    "x": 1034,
    "y": 503,
    "width": 57,
    "height": 31,
    "text": "NOV",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 9,
    "x": 1122,
    "y": 503,
    "width": 56,
    "height": 31,
    "text": "DEC",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 507,
    "y": 503,
    "width": 56,
    "height": 31,
    "text": "MAY",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 0,
    "x": 81,
    "y": 141,
    "width": 70,
    "height": 31,
    "text": "Task 1",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 1,
    "x": 81,
    "y": 186,
    "width": 70,
    "height": 31,
    "text": "Task 2",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 2,
    "x": 81,
    "y": 230,
    "width": 70,
    "height": 31,
    "text": "Task 3",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 3,
    "x": 81,
    "y": 275,
    "width": 70,
    "height": 31,
    "text": "Task 4",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 4,
    "x": 81,
    "y": 319,
    "width": 70,
    "height": 31,
    "text": "Task 5",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 5,
    "x": 81,
    "y": 363,
    "width": 70,
    "height": 31,
    "text": "Task 6",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 6,
    "x": 81,
    "y": 407,
    "width": 70,
    "height": 31,
    "text": "Task 7",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 7,
    "x": 81,
    "y": 450,
    "width": 70,
    "height": 31,
    "text": "Task 8",
    "textColor": "#3365cc",
    "textSize": 13
  },
  {
    "id": "sp-31",
    "x": 331,
    "y": 575,
    "width": 849,
    "height": 34,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 0,
    "x": 773,
    "y": 164,
    "width": 84,
    "height": 32,
    "text": "Title 01",
    "textColor": "#ffffff",
    "textSize": 14
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 0,
    "x": 766,
    "y": 189,
    "width": 252,
    "height": 33,
    "text": "MIGSO-PCUBED content",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 1,
    "x": 902,
    "y": 278,
    "width": 84,
    "height": 32,
    "text": "Title 02",
    "textColor": "#ffffff",
    "textSize": 14
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 1,
    "x": 895,
    "y": 303,
    "width": 252,
    "height": 33,
    "text": "MIGSO-PCUBED content",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 2,
    "x": 239,
    "y": 366,
    "width": 84,
    "height": 32,
    "text": "Title 03",
    "textColor": "#ffffff",
    "textSize": 14
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 2,
    "x": 232,
    "y": 391,
    "width": 252,
    "height": 33,
    "text": "MIGSO-PCUBED content",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 78,
    "y": 566,
    "width": 24,
    "height": 24
  },
  {
    "id": "sp-39",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 78,
    "y": 595,
    "width": 24,
    "height": 24,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 78,
    "y": 625,
    "width": 24,
    "height": 24,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 3,
    "x": 111,
    "y": 563,
    "width": 97,
    "height": 29,
    "text": "Completed",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-42",
    "x": 111,
    "y": 593,
    "width": 102,
    "height": 29,
    "text": "In Progress",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 8,
    "x": 111,
    "y": 622,
    "width": 78,
    "height": 29,
    "text": "Pending",
    "textColor": "#3365cc",
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

export function Imported2025migsopcubedcreativeandexampletemplates111Template({ data }: { data: BrainData }): ReactElement {
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
