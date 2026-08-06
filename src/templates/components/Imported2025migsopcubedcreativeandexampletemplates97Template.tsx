import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 367,
    "y": 379,
    "width": 693,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 498,
    "y": 188,
    "width": 174,
    "height": 190,
    "strokeColor": "#ff4d38"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 349,
    "y": 383,
    "width": 167,
    "height": 185,
    "strokeColor": "#ffb900"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 809,
    "y": 188,
    "width": 174,
    "height": 190,
    "strokeColor": "#52c49c"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 661,
    "y": 383,
    "width": 167,
    "height": 185,
    "strokeColor": "#ee6d90"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 508,
    "y": 370,
    "width": 19,
    "height": 19,
    "fillColor": "#FFFFFF",
    "strokeColor": "#ffb900",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 664,
    "y": 370,
    "width": 19,
    "height": 19,
    "fillColor": "#FFFFFF",
    "strokeColor": "#ff4d38",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 818,
    "y": 370,
    "width": 19,
    "height": 19,
    "fillColor": "#FFFFFF",
    "strokeColor": "#ee6d90",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 974,
    "y": 370,
    "width": 19,
    "height": 19,
    "fillColor": "#FFFFFF",
    "strokeColor": "#52c49c",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 453,
    "y": 439,
    "width": 12,
    "height": 12,
    "fillColor": "#ffb900",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 398,
    "y": 500,
    "width": 12,
    "height": 12,
    "fillColor": "#ffb900",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 321,
    "y": 567,
    "width": 196,
    "height": 42,
    "fillColor": "#ffb900",
    "pathD": "M 10 0 L 186 0 Q 196 0 196 10 L 196 32 Q 196 42 186 42 L 10 42 Q 0 42 0 32 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 631,
    "y": 567,
    "width": 196,
    "height": 42,
    "fillColor": "#ee6d90",
    "pathD": "M 10 0 L 186 0 Q 196 0 196 10 L 196 32 Q 196 42 186 42 L 10 42 Q 0 42 0 32 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 475,
    "y": 148,
    "width": 196,
    "height": 42,
    "fillColor": "#ff4d38",
    "pathD": "M 10 0 L 186 0 Q 196 0 196 10 L 196 32 Q 196 42 186 42 L 10 42 Q 0 42 0 32 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 785,
    "y": 148,
    "width": 196,
    "height": 42,
    "fillColor": "#52c49c",
    "pathD": "M 10 0 L 186 0 Q 196 0 196 10 L 196 32 Q 196 42 186 42 L 10 42 Q 0 42 0 32 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 765,
    "y": 439,
    "width": 12,
    "height": 12,
    "fillColor": "#ee6d90",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 711,
    "y": 500,
    "width": 12,
    "height": 12,
    "fillColor": "#ee6d90",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 548,
    "y": 245,
    "width": 12,
    "height": 12,
    "fillColor": "#ff4d38",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 604,
    "y": 305,
    "width": 12,
    "height": 12,
    "fillColor": "#ff4d38",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 860,
    "y": 245,
    "width": 12,
    "height": 12,
    "fillColor": "#52c49c",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 915,
    "y": 305,
    "width": 12,
    "height": 12,
    "fillColor": "#52c49c",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-21",
    "x": 1058,
    "y": 342,
    "width": 74,
    "height": 74,
    "fillColor": "#FFFFFF",
    "strokeColor": "#ffffff",
    "pathD": "M 37 0 A 37 37 0 1 1 37 0 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 188,
    "y": 188,
    "width": 174,
    "height": 190,
    "strokeColor": "#3365cc"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 353,
    "y": 370,
    "width": 19,
    "height": 19,
    "fillColor": "#FFFFFF",
    "strokeColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 164,
    "y": 148,
    "width": 196,
    "height": 42,
    "fillColor": "#3365cc",
    "pathD": "M 10 0 L 186 0 Q 196 0 196 10 L 196 32 Q 196 42 186 42 L 10 42 Q 0 42 0 32 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 238,
    "y": 245,
    "width": 12,
    "height": 12,
    "fillColor": "#3365cc",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 294,
    "y": 305,
    "width": 12,
    "height": 12,
    "fillColor": "#3365cc",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 0,
    "x": 208,
    "y": 150,
    "width": 108,
    "height": 37,
    "text": "Your title",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 1,
    "x": 519,
    "y": 150,
    "width": 108,
    "height": 37,
    "text": "Your title",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 2,
    "x": 829,
    "y": 150,
    "width": 108,
    "height": 37,
    "text": "Your title",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 3,
    "x": 365,
    "y": 569,
    "width": 108,
    "height": 37,
    "text": "Your title",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 4,
    "x": 675,
    "y": 569,
    "width": 108,
    "height": 37,
    "text": "Your title",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-32",
    "x": 1073,
    "y": 357,
    "width": 43,
    "height": 43,
    "fillColor": "#ffffff",
    "pathD": "M 21 37 C 22 37, 22 37, 22 38 L 22 40 C 22 40, 22 40, 21 40 C 21 40, 21 40, 21 40 L 21 38 C 21 37, 21 37, 21 37 Z M 14 35 C 14 35, 14 35, 14 36 L 13 37 C 13 38, 12 38, 12 38 C 12 38, 12 38, 12 38 C 12 37, 11 37, 12 37 L 13 35 C 13 35, 13 35, 14 35 Z M 7 29 C 7 29, 8 29, 8 29 C 8 29, 8 30, 8 30 L 6 31 C 6 31, 6 31, 5 31 C 5 31, 5 31, 5 31 C 5 30, 5 30, 5 30 L 7 29 Z M 24 27 C 23 27, 22 28, 22 29 L 22 33 C 22 34, 23 35, 24 35 L 26 35 L 26 27 L 24 27 Z M 27 26 L 27 38 C 27 40, 29 42, 31 42 L 34 42 C 34 41, 35 40, 35 38 L 35 29 C 35 28, 35 28, 35 28 C 36 28, 36 28, 36 29 L 36 38 C 36 39, 36 40, 36 42 L 36 42 C 38 42, 40 40, 40 38 L 40 26 L 27 26 Z M 27 24 L 41 24 C 41 24, 41 25, 41 25 L 41 38 C 41 39, 41 41, 40 42 L 42 42 C 43 42, 43 42, 43 42 C 43 43, 43 43, 42 43 L 25 43 C 25 43, 24 43, 24 42 C 24 42, 25 42, 25 42 L 28 42 C 27 41, 26 39, 26 38 L 26 36 L 24 36 C 22 36, 21 35, 21 33 L 21 29 C 21 28, 22 26, 24 26 L 26 26 L 26 25 C 26 25, 26 24, 27 24 Z M 37 21 L 39 21 C 40 21, 40 21, 40 21 C 40 22, 40 22, 39 22 L 37 22 C 37 22, 37 22, 37 21 C 37 21, 37 21, 37 21 Z M 3 21 L 5 21 C 6 21, 6 21, 6 21 C 6 22, 6 22, 5 22 L 3 22 C 3 22, 3 22, 3 21 C 3 21, 3 21, 3 21 Z M 21 20 C 20 20, 20 21, 20 22 C 20 22, 20 23, 21 23 C 22 23, 23 22, 23 22 C 23 21, 22 20, 21 20 Z M 37 12 C 37 12, 38 12, 38 12 C 38 12, 38 13, 38 13 L 36 14 C 36 14, 36 14, 35 14 C 35 14, 35 14, 35 14 C 35 13, 35 13, 35 13 L 37 12 Z M 6 12 L 8 13 C 8 13, 8 13, 8 14 C 8 14, 8 14, 7 14 C 7 14, 7 14, 7 14 L 5 13 C 5 13, 5 12, 5 12 C 5 12, 6 12, 6 12 Z M 21 8 C 22 8, 22 8, 22 9 L 22 19 C 23 19, 24 20, 24 21 L 30 21 C 31 21, 31 21, 31 22 C 31 22, 31 22, 30 22 L 24 22 C 24 23, 23 24, 21 24 C 20 24, 18 23, 18 22 C 18 20, 19 19, 21 19 L 21 9 C 21 8, 21 8, 21 8 Z M 31 5 C 31 5, 31 6, 31 6 L 30 8 C 30 8, 30 8, 29 8 C 29 8, 29 8, 29 8 C 29 8, 29 8, 29 7 L 30 5 C 30 5, 30 5, 31 5 Z M 12 5 C 12 5, 13 5, 13 5 L 14 7 C 14 8, 14 8, 14 8 C 13 8, 13 8, 13 8 C 13 8, 13 8, 13 8 L 12 6 C 11 6, 12 5, 12 5 Z M 21 3 C 22 3, 22 3, 22 3 L 22 5 C 22 6, 22 6, 21 6 C 21 6, 21 6, 21 5 L 21 3 C 21 3, 21 3, 21 3 Z M 21 0 C 33 0, 43 10, 43 21 C 43 22, 42 22, 42 22 C 42 22, 41 22, 41 21 C 41 10, 32 1, 21 1 C 10 1, 1 10, 1 21 C 1 32, 10 41, 21 41 C 22 41, 22 42, 22 42 C 22 42, 22 43, 21 43 C 10 43, 0 33, 0 21 C 0 10, 10 0, 21 0 Z"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 0,
    "x": 268,
    "y": 237,
    "width": 235,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 3,
    "x": 325,
    "y": 296,
    "width": 235,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 1,
    "x": 578,
    "y": 237,
    "width": 235,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 4,
    "x": 635,
    "y": 296,
    "width": 235,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 2,
    "x": 886,
    "y": 237,
    "width": 235,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 5,
    "x": 942,
    "y": 296,
    "width": 235,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 6,
    "x": 491,
    "y": 431,
    "width": 235,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 8,
    "x": 436,
    "y": 490,
    "width": 235,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 7,
    "x": 792,
    "y": 431,
    "width": 235,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 9,
    "x": 737,
    "y": 490,
    "width": 235,
    "height": 28,
    "text": "Add words",
    "textSize": 13
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

export function Imported2025migsopcubedcreativeandexampletemplates97Template({ data }: { data: BrainData }): ReactElement {
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
