import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 79,
    "y": 145,
    "width": 1121,
    "height": 472,
    "strokeColor": "#ffffff",
    "pathD": "M 0 1 C 21 -21, 82 427, 138 438 C 193 448, 263 58, 334 64 C 404 70, 485 476, 562 472 C 638 468, 718 46, 791 41 C 864 36, 939 447, 1001 441 C 1057 436, 1096 1, 1121 7"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 345,
    "width": 220,
    "height": 75,
    "pathD": "M 0 0 L 165 0 L 220 38 L 165 75 L 0 75 L 55 38 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 305,
    "y": 345,
    "width": 220,
    "height": 75,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 165 0 L 220 38 L 165 75 L 0 75 L 55 38 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 530,
    "y": 345,
    "width": 220,
    "height": 75,
    "fillColor": "#52c49c",
    "pathD": "M 0 0 L 165 0 L 220 38 L 165 75 L 0 75 L 55 38 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 755,
    "y": 345,
    "width": 220,
    "height": 75,
    "fillColor": "#ffb900",
    "pathD": "M 0 0 L 165 0 L 220 38 L 165 75 L 0 75 L 55 38 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 980,
    "y": 345,
    "width": 220,
    "height": 75,
    "fillColor": "#ee6d90",
    "pathD": "M 0 0 L 165 0 L 220 38 L 165 75 L 0 75 L 55 38 Z"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 124,
    "y": 364,
    "width": 133,
    "height": 36,
    "text": "Awareness",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-7",
    "x": 333,
    "y": 364,
    "width": 164,
    "height": 36,
    "text": "Consideration",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 572,
    "y": 364,
    "width": 137,
    "height": 36,
    "text": "Acquisition",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 1,
    "x": 817,
    "y": 364,
    "width": 96,
    "height": 36,
    "text": "Service",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 2,
    "x": 1042,
    "y": 364,
    "width": 95,
    "height": 36,
    "text": "Loyalty",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 10,
    "x": 149,
    "y": 447,
    "width": 27,
    "height": 27,
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 16,
    "x": 177,
    "y": 531,
    "width": 27,
    "height": 27,
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 14,
    "x": 261,
    "y": 487,
    "width": 27,
    "height": 27,
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 6,
    "x": 332,
    "y": 291,
    "width": 27,
    "height": 27,
    "fillColor": "#ff4d38",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 1,
    "x": 369,
    "y": 217,
    "width": 27,
    "height": 27,
    "fillColor": "#ff4d38",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 7,
    "x": 456,
    "y": 267,
    "width": 27,
    "height": 27,
    "fillColor": "#ff4d38",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 12,
    "x": 533,
    "y": 456,
    "width": 27,
    "height": 27,
    "fillColor": "#52c49c",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 19,
    "x": 583,
    "y": 570,
    "width": 27,
    "height": 27,
    "fillColor": "#52c49c",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 17,
    "x": 701,
    "y": 502,
    "width": 27,
    "height": 27,
    "fillColor": "#52c49c",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 8,
    "x": 783,
    "y": 283,
    "width": 27,
    "height": 27,
    "fillColor": "#ffb900",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 836,
    "y": 187,
    "width": 27,
    "height": 27,
    "fillColor": "#ffb900",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 4,
    "x": 918,
    "y": 249,
    "width": 27,
    "height": 27,
    "fillColor": "#ffb900",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 13,
    "x": 990,
    "y": 442,
    "width": 27,
    "height": 27,
    "fillColor": "#ee6d90",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 18,
    "x": 1022,
    "y": 513,
    "width": 27,
    "height": 27,
    "fillColor": "#ee6d90",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 15,
    "x": 1118,
    "y": 469,
    "width": 27,
    "height": 27,
    "fillColor": "#ee6d90",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 20,
    "x": 1077,
    "y": 571,
    "width": 27,
    "height": 27,
    "fillColor": "#ee6d90",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 11,
    "x": 181,
    "y": 448,
    "width": 32,
    "height": 24,
    "text": "PR",
    "textSize": 12
  },
  {
    "id": "sp-28",
    "x": 115,
    "y": 513,
    "width": 56,
    "height": 63,
    "text": "Radio, TV, Print",
    "textSize": 12
  },
  {
    "id": "sp-29",
    "x": 472,
    "y": 447,
    "width": 52,
    "height": 44,
    "text": "Direct Mail",
    "textSize": 12
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 4,
    "x": 516,
    "y": 562,
    "width": 61,
    "height": 44,
    "text": "Store/ Branch",
    "textSize": 12
  },
  {
    "id": "sp-31",
    "x": 886,
    "y": 434,
    "width": 95,
    "height": 44,
    "text": "Call Center/ IVR",
    "textSize": 12
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 1,
    "x": 897,
    "y": 515,
    "width": 119,
    "height": 24,
    "text": "Word of Mouth",
    "textSize": 12
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 1,
    "x": 1002,
    "y": 573,
    "width": 70,
    "height": 24,
    "text": "Mailings",
    "textSize": 12
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 1,
    "x": 1043,
    "y": 460,
    "width": 70,
    "height": 44,
    "text": "Offers in Invoice",
    "textSize": 12
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 3,
    "x": 734,
    "y": 493,
    "width": 59,
    "height": 44,
    "text": "Agent/ Broker",
    "textSize": 12
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 2,
    "x": 295,
    "y": 478,
    "width": 67,
    "height": 44,
    "text": "Word of Mouth",
    "textSize": 12
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 1,
    "x": 264,
    "y": 292,
    "width": 61,
    "height": 24,
    "text": "Search",
    "textSize": 12
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 1,
    "x": 294,
    "y": 209,
    "width": 67,
    "height": 44,
    "text": "Paid Content",
    "textSize": 12
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 0,
    "x": 492,
    "y": 268,
    "width": 76,
    "height": 24,
    "text": "Websites",
    "textSize": 12
  },
  {
    "id": "sp-40",
    "x": 954,
    "y": 250,
    "width": 44,
    "height": 24,
    "text": "Chat",
    "textSize": 12
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 0,
    "x": 737,
    "y": 188,
    "width": 92,
    "height": 24,
    "text": "Community",
    "textSize": 12
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 0,
    "x": 651,
    "y": 285,
    "width": 124,
    "height": 24,
    "text": "Mobile App Site",
    "textSize": 12
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 5,
    "x": 111,
    "y": 285,
    "width": 27,
    "height": 27,
    "fillColor": "#3365cc",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 0,
    "x": 146,
    "y": 286,
    "width": 61,
    "height": 24,
    "text": "Search",
    "textSize": 12
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 0,
    "x": 87,
    "y": 184,
    "width": 27,
    "height": 27,
    "fillColor": "#3365cc",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 0,
    "x": 122,
    "y": 176,
    "width": 62,
    "height": 44,
    "text": "Online Display",
    "textSize": 12
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 9,
    "x": 1147,
    "y": 301,
    "width": 27,
    "height": 27,
    "fillColor": "#ee6d90",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 2,
    "x": 1079,
    "y": 302,
    "width": 60,
    "height": 24,
    "text": "Survey",
    "textSize": 12
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 3,
    "x": 1171,
    "y": 180,
    "width": 27,
    "height": 27,
    "fillColor": "#ee6d90",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-50",
    "dataNodeIdx": 0,
    "x": 1092,
    "y": 171,
    "width": 71,
    "height": 44,
    "text": "Loyalty Program",
    "textSize": 12
  },
  {
    "id": "sp-51",
    "x": 531,
    "y": 136,
    "width": 219,
    "height": 36,
    "text": "Digital Touchpoints",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-52",
    "x": 520,
    "y": 630,
    "width": 240,
    "height": 36,
    "text": "Physical Touchpoints",
    "textColor": "#3365cc",
    "textSize": 16
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

export function Imported2025migsopcubedcreativeandexampletemplates74Template({ data }: { data: BrainData }): ReactElement {
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
