import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 170,
    "y": 598,
    "width": 46,
    "height": 40,
    "text": "~",
    "textColor": "#FFFFFF",
    "textSize": 24.61
  },
  {
    "id": "grp-1",
    "isGroup": true,
    "children": [
      {
        "id": "grp-2",
        "isGroup": true,
        "children": [
          {
            "id": "sp-14",
            "x": 173,
            "y": 448.43304843304844,
            "width": 111.43863179074445,
            "height": 111.56695156695157,
            "localPctX": 0,
            "localPctY": 0.25170068027210885,
            "localPctW": 1,
            "localPctH": 0.7482993197278911,
            "fillColor": "#3365cc",
            "pathD": "M 0 112 L 111 112 L 56 0 Z"
          },
          {
            "id": "sp-15",
            "x": 228.71931589537223,
            "y": 410.9059829059829,
            "width": 10,
            "height": 59.840455840455846,
            "localPctX": 0.5000000000000001,
            "localPctY": 0,
            "localPctW": 0.008973548794800038,
            "localPctH": 0.401360544217687,
            "strokeColor": "#3365cc"
          }
        ],
        "x": 173,
        "y": 410.9059829059829,
        "width": 111.43863179074445,
        "height": 149.09401709401712,
        "localPctX": 0,
        "localPctY": 0.5811965811965812,
        "localPctW": 0.11066398390342051,
        "localPctH": 0.41880341880341887
      },
      {
        "id": "grp-5",
        "isGroup": true,
        "children": [
          {
            "id": "sp-16",
            "x": 257.08551307847085,
            "y": 338.8945868945869,
            "width": 220.851106639839,
            "height": 221.10541310541313,
            "localPctX": 0,
            "localPctY": 0.240418118466899,
            "localPctW": 1,
            "localPctH": 0.7595818815331011,
            "fillColor": "#ff4d38",
            "pathD": "M 0 221 L 221 221 L 110 0 Z"
          },
          {
            "id": "sp-17",
            "x": 367.51106639839037,
            "y": 268.9116809116809,
            "width": 10,
            "height": 100.41025641025642,
            "localPctX": 0.5000000000000001,
            "localPctY": 0,
            "localPctW": 0.004527937465266074,
            "localPctH": 0.34494773519163763,
            "strokeColor": "#ff4d38"
          }
        ],
        "x": 257.08551307847085,
        "y": 268.9116809116809,
        "width": 220.851106639839,
        "height": 291.0883190883191,
        "localPctX": 0.08350100603621734,
        "localPctY": 0.18233618233618226,
        "localPctW": 0.21931589537223337,
        "localPctH": 0.8176638176638177
      },
      {
        "id": "grp-8",
        "isGroup": true,
        "children": [
          {
            "id": "sp-18",
            "x": 430.3219315895372,
            "y": 246.5982905982906,
            "width": 314.0543259557344,
            "height": 313.4017094017094,
            "localPctX": 0,
            "localPctY": 0.11965811965811961,
            "localPctW": 1,
            "localPctH": 0.8803418803418802,
            "fillColor": "#52c49c",
            "pathD": "M 0 313 L 314 313 L 157 0 Z"
          },
          {
            "id": "sp-19",
            "x": 586.3360160965794,
            "y": 204,
            "width": 10,
            "height": 85.1965811965812,
            "localPctX": 0.4967741935483871,
            "localPctY": 0,
            "localPctW": 0.0031841624755742067,
            "localPctH": 0.2393162393162393,
            "strokeColor": "#52c49c"
          }
        ],
        "x": 430.3219315895372,
        "y": 204,
        "width": 314.0543259557344,
        "height": 356.00000000000006,
        "localPctX": 0.255533199195171,
        "localPctY": 0,
        "localPctW": 0.3118712273641851,
        "localPctH": 1.0000000000000002
      },
      {
        "id": "grp-11",
        "isGroup": true,
        "children": [
          {
            "id": "sp-20",
            "x": 672.4476861167002,
            "y": 315.56695156695156,
            "width": 244.15191146881287,
            "height": 243.41880341880344,
            "localPctX": 0,
            "localPctY": 0.11721611721611727,
            "localPctW": 1,
            "localPctH": 0.8791208791208791,
            "fillColor": "#ffb900",
            "pathD": "M 0 243 L 244 243 L 122 0 Z"
          },
          {
            "id": "sp-21",
            "x": 794.0171026156942,
            "y": 283.1111111111111,
            "width": 10,
            "height": 85.1965811965812,
            "localPctX": 0.49792531120331956,
            "localPctY": 0,
            "localPctW": 0.004095810653228232,
            "localPctH": 0.3076923076923077,
            "strokeColor": "#ffb900"
          }
        ],
        "x": 672.4476861167002,
        "y": 283.1111111111111,
        "width": 244.15191146881287,
        "height": 276.8888888888889,
        "localPctX": 0.4959758551307847,
        "localPctY": 0.22222222222222215,
        "localPctW": 0.24245472837022133,
        "localPctH": 0.7777777777777779
      },
      {
        "id": "grp-14",
        "isGroup": true,
        "children": [
          {
            "id": "sp-22",
            "x": 865.9456740442655,
            "y": 245.58404558404555,
            "width": 314.0543259557344,
            "height": 313.4017094017094,
            "localPctX": 0,
            "localPctY": 0.08284023668639051,
            "localPctW": 1,
            "localPctH": 0.9142011834319527,
            "fillColor": "#ee6d90",
            "pathD": "M 0 313 L 314 313 L 157 0 Z"
          },
          {
            "id": "sp-23",
            "x": 1021.9597585513077,
            "y": 217.18518518518516,
            "width": 10,
            "height": 85.1965811965812,
            "localPctX": 0.4967741935483869,
            "localPctY": 0,
            "localPctW": 0.0031841624755742067,
            "localPctH": 0.24852071005917162,
            "strokeColor": "#ee6d90"
          }
        ],
        "x": 865.9456740442655,
        "y": 217.18518518518516,
        "width": 314.0543259557344,
        "height": 342.81481481481484,
        "localPctX": 0.6881287726358148,
        "localPctY": 0.03703703703703697,
        "localPctW": 0.3118712273641851,
        "localPctH": 0.962962962962963
      }
    ],
    "x": 173,
    "y": 204,
    "width": 1007,
    "height": 356
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 4,
    "x": 126,
    "y": 364,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 2,
    "x": 265,
    "y": 225,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 0,
    "x": 483,
    "y": 161,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 3,
    "x": 691,
    "y": 239,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 1,
    "x": 920,
    "y": 175,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 191,
    "y": 506,
    "width": 74,
    "height": 36,
    "text": "£0.8M",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 330,
    "y": 506,
    "width": 74,
    "height": 36,
    "text": "£2.0M",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 2,
    "x": 549,
    "y": 506,
    "width": 74,
    "height": 36,
    "text": "£3.1M",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 3,
    "x": 757,
    "y": 506,
    "width": 74,
    "height": 36,
    "text": "£2.6M",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 4,
    "x": 994,
    "y": 506,
    "width": 74,
    "height": 36,
    "text": "£3.9M",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "x": 80,
    "y": 604,
    "width": 1120,
    "height": 24,
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

export function Imported2025migsopcubedcreativeandexampletemplates31Template({ data }: { data: BrainData }): ReactElement {
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
