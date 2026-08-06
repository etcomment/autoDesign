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
    "x": 183,
    "y": 200,
    "width": 10,
    "height": 194,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-1",
    "x": 315,
    "y": 309,
    "width": 10,
    "height": 85,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 927,
    "y": 201,
    "width": 10,
    "height": 193,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-3",
    "x": 351,
    "y": 456,
    "width": 10,
    "height": 147,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 791,
    "y": 456,
    "width": 10,
    "height": 72,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 270,
    "y": 394,
    "width": 166,
    "height": 62,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 462,
    "y": 394,
    "width": 166,
    "height": 62,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 654,
    "y": 394,
    "width": 166,
    "height": 62,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 844,
    "y": 394,
    "width": 166,
    "height": 62,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1034,
    "y": 394,
    "width": 166,
    "height": 62,
    "fillColor": "#4a90d9"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 394,
    "width": 166,
    "height": 62,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-11",
    "x": 102,
    "y": 407,
    "width": 122,
    "height": 36,
    "text": "JANUARY",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-12",
    "x": 284,
    "y": 407,
    "width": 138,
    "height": 36,
    "text": "FEBRUARY",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "x": 495,
    "y": 407,
    "width": 99,
    "height": 36,
    "text": "MARCH",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "x": 695,
    "y": 407,
    "width": 84,
    "height": 36,
    "text": "APRIL",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "x": 895,
    "y": 407,
    "width": 65,
    "height": 36,
    "text": "MAY",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "x": 1079,
    "y": 407,
    "width": 77,
    "height": 36,
    "text": "JUNE",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 0,
    "x": 161,
    "y": 168,
    "width": 43,
    "height": 36,
    "text": "20",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "x": 299,
    "y": 276,
    "width": 31,
    "height": 36,
    "text": "7",
    "textColor": "#ff4d38",
    "textSize": 16
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 4,
    "x": 330,
    "y": 601,
    "width": 43,
    "height": 36,
    "text": "14",
    "textColor": "#ff4d38",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 3,
    "x": 769,
    "y": 526,
    "width": 43,
    "height": 36,
    "text": "23",
    "textColor": "#ffb900",
    "textSize": 16
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 906,
    "y": 167,
    "width": 43,
    "height": 36,
    "text": "15",
    "textColor": "#ee6d90",
    "textSize": 16
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 610,
    "y": 322,
    "width": 10,
    "height": 72,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 2,
    "x": 588,
    "y": 276,
    "width": 43,
    "height": 36,
    "text": "25",
    "textColor": "#ff4d38",
    "textSize": 16
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 207,
    "y": 149,
    "width": 213,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 2,
    "x": 333,
    "y": 257,
    "width": 213,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 3,
    "x": 636,
    "y": 257,
    "width": 213,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 1,
    "x": 951,
    "y": 148,
    "width": 213,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 4,
    "x": 815,
    "y": 507,
    "width": 213,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 5,
    "x": 377,
    "y": 582,
    "width": 213,
    "height": 76,
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

export function Imported2025migsopcubedcreativeandexampletemplates146Template({ data }: { data: BrainData }): ReactElement {
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
