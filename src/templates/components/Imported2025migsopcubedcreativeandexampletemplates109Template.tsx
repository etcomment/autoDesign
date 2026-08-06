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
        "id": "grp-1",
        "isGroup": true,
        "children": [
          {
            "id": "sp-23",
            "x": 431,
            "y": 139,
            "width": 419,
            "height": 32.4,
            "localPctX": 0,
            "localPctY": 0,
            "localPctW": 1,
            "localPctH": 1,
            "fillColor": "#ffffff"
          },
          {
            "id": "sp-24",
            "x": 639.8997134670487,
            "y": 139,
            "width": 210.1002865329513,
            "height": 32.4,
            "localPctX": 0.49856733524355307,
            "localPctY": 0,
            "localPctW": 0.501432664756447,
            "localPctH": 1,
            "fillColor": "#ffffff"
          }
        ],
        "x": 431,
        "y": 139,
        "width": 419,
        "height": 32.4,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.07826086956521738
      },
      {
        "id": "grp-4",
        "isGroup": true,
        "children": [
          {
            "id": "sp-25",
            "x": 431,
            "y": 181,
            "width": 419,
            "height": 316.8,
            "localPctX": 0,
            "localPctY": 0,
            "localPctW": 1,
            "localPctH": 1,
            "fillColor": "#ffffff",
            "pathD": "M 0 0 L 419 0 L 234 317 L 183 317 L 0 0 Z"
          },
          {
            "id": "sp-26",
            "x": 639.8997134670487,
            "y": 181,
            "width": 210.1002865329513,
            "height": 316.8,
            "localPctX": 0.49856733524355307,
            "localPctY": 0,
            "localPctW": 0.501432664756447,
            "localPctH": 1,
            "fillColor": "#ffffff",
            "pathD": "M 210 0 L 0 0 L 183 317 L 210 317 L 210 0 Z"
          }
        ],
        "x": 431,
        "y": 181,
        "width": 419,
        "height": 316.8,
        "localPctX": 0,
        "localPctY": 0.10144927536231885,
        "localPctW": 1,
        "localPctH": 0.7652173913043478
      },
      {
        "id": "grp-7",
        "isGroup": true,
        "children": [
          {
            "id": "sp-27",
            "x": 615.8882521489971,
            "y": 505.00000000000006,
            "width": 51.62464183381089,
            "height": 48,
            "localPctX": 0,
            "localPctY": 0,
            "localPctW": 1,
            "localPctH": 1,
            "fillColor": "#ffffff"
          },
          {
            "id": "sp-28",
            "x": 639.8997134670487,
            "y": 505.00000000000006,
            "width": 26.412607449856736,
            "height": 48,
            "localPctX": 0.46511627906976794,
            "localPctY": 0,
            "localPctW": 0.5116279069767442,
            "localPctH": 1,
            "fillColor": "#ffffff"
          }
        ],
        "x": 615.8882521489971,
        "y": 505.00000000000006,
        "width": 51.62464183381089,
        "height": 48,
        "localPctX": 0.44126074498567336,
        "localPctY": 0.8840579710144929,
        "localPctW": 0.12320916905444126,
        "localPctH": 0.11594202898550725
      }
    ],
    "x": 431,
    "y": 139,
    "width": 419,
    "height": 414
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 401,
    "y": 225,
    "width": 210,
    "height": 10,
    "strokeColor": "#ff4d38"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 668,
    "y": 301,
    "width": 210,
    "height": 10,
    "strokeColor": "#52c49c"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 401,
    "y": 378,
    "width": 210,
    "height": 10,
    "strokeColor": "#ffb900"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 668,
    "y": 454,
    "width": 210,
    "height": 10,
    "strokeColor": "#ee6d90"
  },
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 608,
    "y": 193,
    "width": 63,
    "height": 63,
    "fillColor": "#ff4d38",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 608,
    "y": 270,
    "width": 63,
    "height": 63,
    "fillColor": "#52c49c",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 608,
    "y": 346,
    "width": 63,
    "height": 63,
    "fillColor": "#ffb900",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 608,
    "y": 423,
    "width": 63,
    "height": 63,
    "fillColor": "#ee6d90",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 0,
    "x": 618,
    "y": 206,
    "width": 45,
    "height": 37,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 1,
    "x": 618,
    "y": 283,
    "width": 45,
    "height": 37,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 2,
    "x": 618,
    "y": 359,
    "width": 45,
    "height": 37,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 3,
    "x": 618,
    "y": 436,
    "width": 45,
    "height": 37,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 897,
    "y": 283,
    "width": 121,
    "height": 37,
    "text": "Title here",
    "textColor": "#3365cc",
    "textSize": 17
  },
  {
    "id": "sp-9",
    "x": 890,
    "y": 319,
    "width": 271,
    "height": 83,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 3,
    "x": 897,
    "y": 436,
    "width": 121,
    "height": 37,
    "text": "Title here",
    "textColor": "#3365cc",
    "textSize": 17
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 2,
    "x": 890,
    "y": 472,
    "width": 271,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 2,
    "x": 262,
    "y": 359,
    "width": 121,
    "height": 37,
    "text": "Title here",
    "textColor": "#3365cc",
    "textSize": 17
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 119,
    "y": 394,
    "width": 271,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 0,
    "x": 262,
    "y": 206,
    "width": 121,
    "height": 37,
    "text": "Title here",
    "textColor": "#3365cc",
    "textSize": 17
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 0,
    "x": 119,
    "y": 242,
    "width": 271,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-16",
    "x": 564,
    "y": 569,
    "width": 154,
    "height": 74,
    "text": "£40M",
    "textColor": "#3365cc",
    "textSize": 40
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

export function Imported2025migsopcubedcreativeandexampletemplates109Template({ data }: { data: BrainData }): ReactElement {
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
