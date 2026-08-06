import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 733,
    "y": 269,
    "width": 381,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-1",
    "x": 729,
    "y": 229,
    "width": 163,
    "height": 36,
    "text": "Your title here",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "grp-2",
    "isGroup": true,
    "children": [
      {
        "id": "sp-4",
        "x": 392,
        "y": 112,
        "width": 260,
        "height": 392,
        "localPctX": 0.5047438330170778,
        "localPctY": 0,
        "localPctW": 0.49335863377609107,
        "localPctH": 0.7438330170777988,
        "fillColor": "#ff4d38",
        "pathD": "M 0 0 L 10 0 C 149 7, 260 122, 260 263 C 260 309, 248 351, 228 389 L 226 392 L 135 339 L 135 338 C 147 316, 154 290, 154 263 C 154 179, 88 110, 5 106 L 0 106 L 0 0 Z"
      },
      {
        "id": "sp-5",
        "x": 126,
        "y": 112,
        "width": 260,
        "height": 392,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.49335863377609107,
        "localPctH": 0.7438330170777988,
        "pathD": "M 260 0 L 260 106 L 255 106 C 172 110, 106 179, 106 263 C 106 290, 113 316, 125 338 L 125 339 L 34 392 L 32 389 C 12 351, 0 309, 0 263 C 0 122, 111 7, 250 0 L 260 0 Z"
      },
      {
        "id": "sp-6",
        "x": 162,
        "y": 457,
        "width": 453,
        "height": 182,
        "localPctX": 0.0683111954459203,
        "localPctY": 0.6546489563567363,
        "localPctW": 0.8595825426944972,
        "localPctH": 0.34535104364326374,
        "fillColor": "#52c49c",
        "pathD": "M 92 0 L 96 7 C 124 49, 172 76, 226 76 C 281 76, 329 49, 357 7 L 361 0 L 453 53 L 452 55 C 406 131, 322 182, 226 182 C 131 182, 47 131, 1 55 L 0 53 L 92 0 Z"
      },
      {
        "id": "sp-7",
        "x": 259,
        "y": 224,
        "width": 260,
        "height": 94,
        "localPctX": 0.2523719165085389,
        "localPctY": 0.2125237191650854,
        "localPctW": 0.49335863377609107,
        "localPctH": 0.17836812144212524,
        "fillColor": "#ffb900",
        "pathD": "M 130 0 C 182 0, 229 27, 256 67 L 260 74 L 225 94 L 222 90 C 202 60, 168 40, 130 40 C 92 40, 58 60, 38 90 L 35 94 L 0 74 L 4 67 C 31 27, 78 0, 130 0 Z"
      },
      {
        "id": "sp-8",
        "x": 238,
        "y": 303,
        "width": 148,
        "height": 224,
        "localPctX": 0.2125237191650854,
        "localPctY": 0.36242884250474383,
        "localPctW": 0.2808349146110057,
        "localPctH": 0.4250474383301708,
        "fillColor": "#ee6d90",
        "pathD": "M 18 0 L 53 20 L 49 29 C 43 42, 40 57, 40 72 C 40 130, 84 177, 140 183 L 148 184 L 148 224 L 143 224 C 64 220, 0 154, 0 72 C 0 46, 7 22, 18 0 L 18 0 Z"
      },
      {
        "id": "sp-9",
        "x": 392,
        "y": 303,
        "width": 148,
        "height": 224,
        "localPctX": 0.5047438330170778,
        "localPctY": 0.36242884250474383,
        "localPctW": 0.2808349146110057,
        "localPctH": 0.4250474383301708,
        "fillColor": "#4a90d9",
        "pathD": "M 130 0 L 130 0 C 141 22, 148 46, 148 72 C 148 154, 84 220, 4 224 L 0 224 L 0 184 L 8 183 C 64 177, 108 130, 108 72 C 108 57, 105 42, 99 29 L 95 20 L 130 0 Z"
      },
      {
        "id": "sp-10",
        "x": 315,
        "y": 348,
        "width": 149,
        "height": 55,
        "localPctX": 0.3586337760910816,
        "localPctY": 0.4478178368121442,
        "localPctW": 0.2827324478178368,
        "localPctH": 0.10436432637571158,
        "text": "Lean Manufacturing",
        "textColor": "#3365cc",
        "textSize": 14
      },
      {
        "id": "sp-11",
        "x": 122,
        "y": 268,
        "width": 169,
        "height": 32,
        "localPctX": -0.007590132827324478,
        "localPctY": 0.29601518026565465,
        "localPctW": 0.3206831119544592,
        "localPctH": 0.06072106261859583,
        "text": "SHORT CYCLES",
        "textColor": "#ffffff",
        "textSize": 16
      },
      {
        "id": "sp-12",
        "x": 492,
        "y": 256,
        "width": 162,
        "height": 55,
        "localPctX": 0.6944971537001897,
        "localPctY": 0.2732447817836812,
        "localPctW": 0.30740037950664134,
        "localPctH": 0.10436432637571158,
        "text": "CONTINUOUS IMPROVEMENT",
        "textColor": "#ffffff",
        "textSize": 16
      },
      {
        "id": "sp-13",
        "x": 305,
        "y": 553,
        "width": 170,
        "height": 55,
        "localPctX": 0.3396584440227704,
        "localPctY": 0.8368121442125237,
        "localPctW": 0.3225806451612903,
        "localPctH": 0.10436432637571158,
        "text": "TOTAL QUALITY FOCUS",
        "textColor": "#ffffff",
        "textSize": 16
      },
      {
        "id": "sp-14",
        "x": 337,
        "y": 235,
        "width": 104,
        "height": 29,
        "localPctX": 0.40037950664136623,
        "localPctY": 0.2333965844402277,
        "localPctW": 0.19734345351043645,
        "localPctH": 0.05502846299810247,
        "text": "ProcessES",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-15",
        "x": 181,
        "y": 177,
        "width": 399,
        "height": 395,
        "localPctX": 0.10436432637571158,
        "localPctY": 0.12333965844402277,
        "localPctW": 0.7571157495256167,
        "localPctH": 0.7495256166982922,
        "text": "TECHNOLOGY",
        "textColor": "#ffffff",
        "textSize": 12,
        "pathD": "M 200 0 A 200 198 0 1 1 199 0 Z"
      },
      {
        "id": "sp-16",
        "x": 193,
        "y": 168,
        "width": 399,
        "height": 395,
        "localPctX": 0.127134724857685,
        "localPctY": 0.1062618595825427,
        "localPctW": 0.7571157495256167,
        "localPctH": 0.7495256166982922,
        "text": "PEOPLE",
        "textColor": "#ffffff",
        "textSize": 12,
        "pathD": "M 200 0 A 200 198 0 1 1 199 0 Z"
      }
    ],
    "x": 126,
    "y": 112,
    "width": 527,
    "height": 527
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

export function Imported2025migsopcubedcreativeandexampletemplates131Template({ data }: { data: BrainData }): ReactElement {
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
