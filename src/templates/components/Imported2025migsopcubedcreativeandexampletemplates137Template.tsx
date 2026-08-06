import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 448,
    "y": 532,
    "width": 385,
    "height": 75,
    "fillColor": "#ff4d38",
    "pathD": "M 352 0 L 0 0 L 33 38 L 0 75 L 352 75 L 385 38 C 385 38, 352 0, 352 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 81,
    "y": 532,
    "width": 385,
    "height": 75,
    "fillColor": "#3365cc",
    "pathD": "M 352 0 L 0 0 L 0 75 L 352 75 L 385 38 C 385 38, 352 0, 352 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 815,
    "y": 532,
    "width": 385,
    "height": 75,
    "fillColor": "#52c49c",
    "pathD": "M 385 0 L 0 0 L 33 38 L 0 75 L 385 75 C 385 75, 385 0, 385 0 Z"
  },
  {
    "id": "sp-3",
    "x": 574,
    "y": 431,
    "width": 706,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-4",
    "x": 0,
    "y": 431,
    "width": 574,
    "height": 10,
    "strokeColor": "#52c49c"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 92,
    "y": 421,
    "width": 20,
    "height": 20,
    "fillColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 1153,
    "y": 421,
    "width": 20,
    "height": 20,
    "fillColor": "#ff4d38",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 210,
    "y": 421,
    "width": 20,
    "height": 20,
    "fillColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 446,
    "y": 421,
    "width": 20,
    "height": 20,
    "fillColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 564,
    "y": 421,
    "width": 20,
    "height": 20,
    "fillColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 800,
    "y": 421,
    "width": 20,
    "height": 20,
    "fillColor": "#ff4d38",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 917,
    "y": 421,
    "width": 20,
    "height": 20,
    "fillColor": "#ff4d38",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 1035,
    "y": 421,
    "width": 20,
    "height": 20,
    "fillColor": "#ff4d38",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 328,
    "y": 421,
    "width": 20,
    "height": 20,
    "fillColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 682,
    "y": 421,
    "width": 20,
    "height": 20,
    "fillColor": "#ff4d38",
    "pathD": "M 10 0 A 10 10 0 1 1 10 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 274,
    "y": 252,
    "width": 57,
    "height": 144,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 509,
    "y": 252,
    "width": 57,
    "height": 144,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 743,
    "y": 252,
    "width": 57,
    "height": 144,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 978,
    "y": 252,
    "width": 57,
    "height": 144,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 202,
    "y": 373,
    "width": 12,
    "height": 30,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 438,
    "y": 373,
    "width": 12,
    "height": 30,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 674,
    "y": 367,
    "width": 12,
    "height": 30,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 909,
    "y": 372,
    "width": 12,
    "height": 30,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 0,
    "x": 69,
    "y": 446,
    "width": 67,
    "height": 36,
    "text": "2019",
    "textSize": 16
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 1,
    "x": 187,
    "y": 446,
    "width": 67,
    "height": 36,
    "text": "2020",
    "textSize": 16
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 2,
    "x": 305,
    "y": 446,
    "width": 67,
    "height": 36,
    "text": "2021",
    "textSize": 16
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 3,
    "x": 422,
    "y": 446,
    "width": 67,
    "height": 36,
    "text": "2022",
    "textSize": 16
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 4,
    "x": 540,
    "y": 446,
    "width": 67,
    "height": 36,
    "text": "2023",
    "textSize": 16
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 5,
    "x": 658,
    "y": 446,
    "width": 67,
    "height": 36,
    "text": "2024",
    "textSize": 16
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 6,
    "x": 776,
    "y": 446,
    "width": 67,
    "height": 36,
    "text": "2025",
    "textSize": 16
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 7,
    "x": 894,
    "y": 446,
    "width": 67,
    "height": 36,
    "text": "2026",
    "textSize": 16
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 8,
    "x": 1012,
    "y": 446,
    "width": 67,
    "height": 36,
    "text": "2027",
    "textSize": 16
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 9,
    "x": 1130,
    "y": 446,
    "width": 67,
    "height": 36,
    "text": "2028",
    "textSize": 16
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 0,
    "x": 199,
    "y": 552,
    "width": 131,
    "height": 36,
    "text": "Phase One",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 1,
    "x": 576,
    "y": 552,
    "width": 130,
    "height": 36,
    "text": "Phase Two",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-35",
    "x": 934,
    "y": 552,
    "width": 147,
    "height": 36,
    "text": "Phase Three",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 5,
    "x": 342,
    "y": 290,
    "width": 171,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 4,
    "x": 109,
    "y": 290,
    "width": 171,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 6,
    "x": 577,
    "y": 290,
    "width": 171,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 7,
    "x": 813,
    "y": 290,
    "width": 171,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 1,
    "x": 411,
    "y": 172,
    "width": 171,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 0,
    "x": 177,
    "y": 172,
    "width": 171,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 2,
    "x": 645,
    "y": 172,
    "width": 171,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 3,
    "x": 881,
    "y": 172,
    "width": 171,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1146,
    "y": 372,
    "width": 12,
    "height": 30,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 8,
    "x": 1049,
    "y": 290,
    "width": 171,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
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

export function Imported2025migsopcubedcreativeandexampletemplates137Template({ data }: { data: BrainData }): ReactElement {
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
