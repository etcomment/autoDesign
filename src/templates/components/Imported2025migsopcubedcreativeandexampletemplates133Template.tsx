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
        "id": "sp-4",
        "x": 529,
        "y": 92,
        "width": 416,
        "height": 359.3333333333333,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.6666666666666666,
        "localPctH": 0.6666666666666666,
        "pathD": "M 208 0 L 312 179 L 208 359 L 416 359 L 416 359 L 0 359 Z"
      },
      {
        "id": "sp-5",
        "x": 737,
        "y": 92,
        "width": 416,
        "height": 359.3333333333333,
        "localPctX": 0.3333333333333333,
        "localPctY": 0,
        "localPctW": 0.6666666666666666,
        "localPctH": 0.6666666666666666,
        "pathD": "M 208 0 L 416 359 L 0 359 L 0 359 L 208 359 L 104 179 Z"
      },
      {
        "id": "sp-6",
        "x": 633.2275711159738,
        "y": 450.4213197969543,
        "width": 416,
        "height": 180.57868020304568,
        "localPctX": 0.1670313639679067,
        "localPctY": 0.6649746192893401,
        "localPctW": 0.6666666666666666,
        "localPctH": 0.3350253807106599,
        "pathD": "M 104 0 L 312 0 L 416 181 L 0 181 Z"
      },
      {
        "id": "sp-7",
        "x": 737,
        "y": 270.75465313028764,
        "width": 208,
        "height": 179.66666666666666,
        "localPctX": 0.3333333333333333,
        "localPctY": 0.3316412859560067,
        "localPctW": 0.3333333333333333,
        "localPctH": 0.3333333333333333,
        "fillColor": "#ffb900",
        "pathD": "M 104 0 L 208 179.66666666666666 L 0 179.66666666666666 Z"
      },
      {
        "id": "sp-8",
        "x": 919.512035010941,
        "y": 406.1886632825719,
        "width": 208,
        "height": 179.66666666666666,
        "localPctX": 0.62582056892779,
        "localPctY": 0.5829103214890017,
        "localPctW": 0.3333333333333333,
        "localPctH": 0.3333333333333333,
        "fillColor": "#ff4d38",
        "pathD": "M 104 0 L 208 179.66666666666666 L 0 179.66666666666666 Z"
      },
      {
        "id": "sp-9",
        "x": 554.487964989059,
        "y": 406.1886632825719,
        "width": 208,
        "height": 179.66666666666666,
        "localPctX": 0.04084609773887666,
        "localPctY": 0.5829103214890017,
        "localPctW": 0.3333333333333333,
        "localPctH": 0.3333333333333333,
        "fillColor": "#ff4d38",
        "pathD": "M 104 0 L 208 179.66666666666666 L 0 179.66666666666666 Z"
      },
      {
        "id": "sp-10",
        "x": 737,
        "y": 92,
        "width": 208,
        "height": 179.66666666666666,
        "localPctX": 0.3333333333333333,
        "localPctY": 0,
        "localPctW": 0.3333333333333333,
        "localPctH": 0.3333333333333333,
        "fillColor": "#ff4d38",
        "pathD": "M 104 0 L 208 179.66666666666666 L 0 179.66666666666666 Z"
      },
      {
        "id": "sp-11",
        "x": 764.308533916849,
        "y": 369.25211505922164,
        "width": 156.1137855579869,
        "height": 61.56091370558376,
        "localPctX": 0.3770970094821298,
        "localPctY": 0.5143824027072758,
        "localPctW": 0.25018234865062,
        "localPctH": 0.11421319796954316,
        "text": "Lean Manufacturing",
        "textColor": "#ffffff",
        "textSize": 16
      },
      {
        "id": "sp-12",
        "x": 866.7155361050329,
        "y": 293.5549915397631,
        "width": 228.0262582056893,
        "height": 45.14467005076142,
        "localPctX": 0.5412107950401168,
        "localPctY": 0.37394247038917083,
        "localPctW": 0.3654266958424508,
        "localPctH": 0.08375634517766498,
        "text": "TECHNOLOGY",
        "textColor": "#ffffff",
        "textSize": 22
      },
      {
        "id": "sp-13",
        "x": 629.1312910284464,
        "y": 293.5549915397631,
        "width": 160.6652078774617,
        "height": 45.14467005076142,
        "localPctX": 0.1604668125455872,
        "localPctY": 0.37394247038917083,
        "localPctW": 0.2574762946754194,
        "localPctH": 0.08375634517766498,
        "text": "SYSTEMS",
        "textColor": "#ffffff",
        "textSize": 22
      },
      {
        "id": "sp-14",
        "x": 771.1356673960613,
        "y": 522.0143824027073,
        "width": 139.27352297592998,
        "height": 45.14467005076142,
        "localPctX": 0.388037928519329,
        "localPctY": 0.7978003384094755,
        "localPctW": 0.22319474835886213,
        "localPctH": 0.08375634517766498,
        "text": "PEOPLE",
        "textColor": "#ffffff",
        "textSize": 22
      },
      {
        "id": "sp-15",
        "x": 784.3347921225384,
        "y": 110.69627749576989,
        "width": 113.7855579868709,
        "height": 87.55329949238579,
        "localPctX": 0.4091903719912474,
        "localPctY": 0.034686971235194604,
        "localPctW": 0.18234865061998543,
        "localPctH": 0.16243654822335027,
        "text": "TOTAL QUALITY FOCUS",
        "textColor": "#ffffff",
        "textSize": 16
      },
      {
        "id": "sp-16",
        "x": 550.8468271334792,
        "y": 474.5896785109983,
        "width": 163.8512035010941,
        "height": 87.55329949238579,
        "localPctX": 0.03501094091903722,
        "localPctY": 0.709813874788494,
        "localPctW": 0.26258205689277897,
        "localPctH": 0.16243654822335027,
        "text": "CONTINUOUS IMPROVE- MENT",
        "textColor": "#ffffff",
        "textSize": 16
      },
      {
        "id": "sp-17",
        "x": 995.9759299781183,
        "y": 487.3578680203046,
        "width": 106.50328227571116,
        "height": 61.56091370558376,
        "localPctX": 0.7483588621444204,
        "localPctY": 0.733502538071066,
        "localPctW": 0.17067833698030635,
        "localPctH": 0.11421319796954316,
        "text": "SHORT CYCLES",
        "textColor": "#ffffff",
        "textSize": 16
      }
    ],
    "x": 529,
    "y": 92,
    "width": 624,
    "height": 539
  },
  {
    "id": "sp-0",
    "x": 80,
    "y": 227,
    "width": 382,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-1",
    "x": 76,
    "y": 187,
    "width": 163,
    "height": 36,
    "text": "Your title here",
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

export function Imported2025migsopcubedcreativeandexampletemplates133Template({ data }: { data: BrainData }): ReactElement {
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
