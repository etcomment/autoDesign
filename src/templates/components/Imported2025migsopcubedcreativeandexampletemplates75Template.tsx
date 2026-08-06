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
    "x": 247,
    "y": 179,
    "width": 242,
    "height": 63,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 477,
    "y": 179,
    "width": 242,
    "height": 63,
    "fillColor": "#3365cc",
    "pathD": "M 0 0 L 182 0 L 242 32 L 182 63 L 0 63 L 61 32 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 707,
    "y": 179,
    "width": 242,
    "height": 63,
    "fillColor": "#3365cc",
    "pathD": "M 0 0 L 182 0 L 242 32 L 182 63 L 0 63 L 61 32 Z"
  },
  {
    "id": "sp-3",
    "x": 937,
    "y": 179,
    "width": 263,
    "height": 63,
    "fillColor": "#3365cc",
    "pathD": "M 0 0 L 197 0 L 263 32 L 197 63 L 0 63 L 66 32 Z"
  },
  {
    "id": "sp-4",
    "x": 59,
    "y": 179,
    "width": 180,
    "height": 63,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 101,
    "y": 193,
    "width": 95,
    "height": 36,
    "text": "Phases",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 317,
    "y": 196,
    "width": 80,
    "height": 29,
    "text": "Phase 1",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 558,
    "y": 196,
    "width": 80,
    "height": 29,
    "text": "Phase 2",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 2,
    "x": 788,
    "y": 196,
    "width": 80,
    "height": 29,
    "text": "Phase 3",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 3,
    "x": 1017,
    "y": 196,
    "width": 80,
    "height": 29,
    "text": "Phase 4",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 247,
    "y": 247,
    "width": 238,
    "height": 98,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 59,
    "y": 247,
    "width": 180,
    "height": 98,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 477,
    "y": 247,
    "width": 238,
    "height": 98,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 179 0 L 238 49 L 179 98 L 0 98 L 60 49 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 707,
    "y": 247,
    "width": 238,
    "height": 98,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 179 0 L 238 49 L 179 98 L 0 98 L 60 49 Z"
  },
  {
    "id": "sp-14",
    "x": 937,
    "y": 247,
    "width": 257,
    "height": 98,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 193 0 L 257 49 L 193 98 L 0 98 L 64 49 Z"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 1,
    "x": 100,
    "y": 282,
    "width": 97,
    "height": 36,
    "text": "Activity",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 503,
    "y": 258,
    "width": 189,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 733,
    "y": 258,
    "width": 189,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 963,
    "y": 258,
    "width": 189,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 0,
    "x": 263,
    "y": 258,
    "width": 189,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 247,
    "y": 353,
    "width": 220,
    "height": 99,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 477,
    "y": 353,
    "width": 220,
    "height": 99,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 707,
    "y": 353,
    "width": 220,
    "height": 99,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 937,
    "y": 353,
    "width": 242,
    "height": 99,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 59,
    "y": 353,
    "width": 180,
    "height": 99,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 0,
    "x": 81,
    "y": 382,
    "width": 135,
    "height": 36,
    "text": "Touchpoint",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 0,
    "x": 255,
    "y": 362,
    "width": 205,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 1,
    "x": 484,
    "y": 362,
    "width": 205,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 2,
    "x": 714,
    "y": 362,
    "width": 205,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-29",
    "x": 941,
    "y": 362,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 937,
    "y": 462,
    "width": 242,
    "height": 85,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 707,
    "y": 462,
    "width": 220,
    "height": 85,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 477,
    "y": 462,
    "width": 220,
    "height": 85,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 247,
    "y": 462,
    "width": 220,
    "height": 85,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 59,
    "y": 462,
    "width": 180,
    "height": 86,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 1,
    "x": 81,
    "y": 487,
    "width": 134,
    "height": 36,
    "text": "Experience",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 3,
    "x": 255,
    "y": 467,
    "width": 205,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 4,
    "x": 484,
    "y": 467,
    "width": 205,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 5,
    "x": 714,
    "y": 467,
    "width": 205,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 0,
    "x": 947,
    "y": 467,
    "width": 221,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 937,
    "y": 553,
    "width": 242,
    "height": 85,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 707,
    "y": 553,
    "width": 220,
    "height": 85,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 477,
    "y": 553,
    "width": 220,
    "height": 85,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 247,
    "y": 553,
    "width": 220,
    "height": 85,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 59,
    "y": 553,
    "width": 180,
    "height": 86,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-45",
    "x": 77,
    "y": 578,
    "width": 143,
    "height": 36,
    "text": "Opportunity",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 6,
    "x": 255,
    "y": 558,
    "width": 205,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 7,
    "x": 484,
    "y": 558,
    "width": 205,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 8,
    "x": 714,
    "y": 558,
    "width": 205,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 1,
    "x": 947,
    "y": 558,
    "width": 221,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-50",
    "x": 57,
    "y": 141,
    "width": 183,
    "height": 36,
    "text": "Product NAME:",
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

export function Imported2025migsopcubedcreativeandexampletemplates75Template({ data }: { data: BrainData }): ReactElement {
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
