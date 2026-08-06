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
    "x": 73,
    "y": 153,
    "width": 264,
    "height": 67,
    "fillColor": "#3365cc",
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 264 0 L 264 67 L 0 67 L 35 34 L 0 0 Z"
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 0,
    "x": 178,
    "y": 169,
    "width": 83,
    "height": 36,
    "text": "Row 1",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 73,
    "y": 236,
    "width": 264,
    "height": 67,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 264 0 L 264 67 L 0 67 L 35 34 L 0 0 Z"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 178,
    "y": 252,
    "width": 83,
    "height": 36,
    "text": "Row 2",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 73,
    "y": 320,
    "width": 264,
    "height": 67,
    "fillColor": "#52c49c",
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 264 0 L 264 67 L 0 67 L 35 34 L 0 0 Z"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 2,
    "x": 178,
    "y": 336,
    "width": 83,
    "height": 36,
    "text": "Row 3",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 73,
    "y": 403,
    "width": 264,
    "height": 67,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 264 0 L 264 67 L 0 67 L 35 34 L 0 0 Z"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 3,
    "x": 178,
    "y": 419,
    "width": 83,
    "height": 36,
    "text": "Row 4",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 73,
    "y": 487,
    "width": 264,
    "height": 67,
    "fillColor": "#ee6d90",
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 264 0 L 264 67 L 0 67 L 35 34 L 0 0 Z"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 4,
    "x": 178,
    "y": 502,
    "width": 83,
    "height": 36,
    "text": "Row 5",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 73,
    "y": 570,
    "width": 264,
    "height": 67,
    "fillColor": "#4a90d9",
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 264 0 L 264 67 L 0 67 L 35 34 L 0 0 Z"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 5,
    "x": 178,
    "y": 586,
    "width": 83,
    "height": 36,
    "text": "Row 6",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 427,
    "y": 101,
    "width": 118,
    "height": 36,
    "text": "Column 1",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 722,
    "y": 101,
    "width": 118,
    "height": 36,
    "text": "Column 2",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 1017,
    "y": 101,
    "width": 118,
    "height": 36,
    "text": "Column 3",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 338,
    "y": 153,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 633,
    "y": 153,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 928,
    "y": 153,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 0,
    "x": 362,
    "y": 162,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 1,
    "x": 657,
    "y": 162,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 2,
    "x": 952,
    "y": 162,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 338,
    "y": 236,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 633,
    "y": 236,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 928,
    "y": 236,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 3,
    "x": 362,
    "y": 245,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 4,
    "x": 657,
    "y": 245,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 5,
    "x": 952,
    "y": 245,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 338,
    "y": 320,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 633,
    "y": 320,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 928,
    "y": 320,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 6,
    "x": 362,
    "y": 328,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 7,
    "x": 657,
    "y": 328,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 8,
    "x": 952,
    "y": 328,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 338,
    "y": 403,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 633,
    "y": 403,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 928,
    "y": 403,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 9,
    "x": 362,
    "y": 412,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 10,
    "x": 657,
    "y": 412,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 11,
    "x": 952,
    "y": 412,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-39",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 338,
    "y": 487,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 633,
    "y": 487,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 928,
    "y": 487,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 12,
    "x": 362,
    "y": 495,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 13,
    "x": 657,
    "y": 495,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 14,
    "x": 952,
    "y": 495,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-45",
    "isColorNode": true,
    "dataNodeIdx": 15,
    "x": 338,
    "y": 570,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-46",
    "isColorNode": true,
    "dataNodeIdx": 16,
    "x": 633,
    "y": 570,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-47",
    "isColorNode": true,
    "dataNodeIdx": 17,
    "x": 928,
    "y": 570,
    "width": 295,
    "height": 67,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 15,
    "x": 362,
    "y": 578,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 16,
    "x": 657,
    "y": 578,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
  },
  {
    "id": "sp-50",
    "dataNodeIdx": 17,
    "x": 952,
    "y": 578,
    "width": 246,
    "height": 50,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 9
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

export function Imported2025migsopcubedcreativeandexampletemplates195Template({ data }: { data: BrainData }): ReactElement {
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
