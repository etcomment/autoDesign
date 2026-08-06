import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 80,
    "y": 338,
    "width": 216,
    "height": 81,
    "pathD": "M 0 8 C 0 4, 5 0, 11 0 L 205 0 C 211 0, 216 4, 216 8 L 216 73 C 216 77, 211 81, 205 81 L 11 81 C 5 81, 0 77, 0 73 L 0 8 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 235,
    "y": 291,
    "width": 183,
    "height": 10,
    "strokeColor": "#ffffff",
    "pathD": "M 0 1 L 183 1"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 356,
    "y": 165,
    "width": 216,
    "height": 81,
    "fillColor": "#52c49c",
    "pathD": "M 0 8 C 0 4, 5 0, 11 0 L 205 0 C 211 0, 216 4, 216 8 L 216 73 C 216 77, 211 81, 205 81 L 11 81 C 5 81, 0 77, 0 73 L 0 8 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 566,
    "y": 183,
    "width": 74,
    "height": 10,
    "strokeColor": "#ffffff",
    "pathD": "M 0 1 L 74 1"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 633,
    "y": 121,
    "width": 216,
    "height": 81,
    "fillColor": "#52c49c",
    "pathD": "M 0 8 C 0 4, 5 0, 11 0 L 205 0 C 211 0, 216 4, 216 8 L 216 73 C 216 77, 211 81, 205 81 L 11 81 C 5 81, 0 77, 0 73 L 0 8 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 566,
    "y": 226,
    "width": 74,
    "height": 10,
    "strokeColor": "#ffffff",
    "pathD": "M 0 1 L 74 1"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 633,
    "y": 208,
    "width": 216,
    "height": 81,
    "fillColor": "#52c49c",
    "pathD": "M 0 8 C 0 4, 5 0, 11 0 L 205 0 C 211 0, 216 4, 216 8 L 216 73 C 216 77, 211 81, 205 81 L 11 81 C 5 81, 0 77, 0 73 L 0 8 Z"
  },
  {
    "id": "sp-7",
    "x": 296,
    "y": 377,
    "width": 60,
    "height": 10,
    "strokeColor": "#ffffff",
    "pathD": "M 0 1 L 60 1"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 356,
    "y": 338,
    "width": 216,
    "height": 81,
    "fillColor": "#ff4d38",
    "pathD": "M 0 8 C 0 4, 5 0, 11 0 L 205 0 C 211 0, 216 4, 216 8 L 216 73 C 216 77, 211 81, 205 81 L 11 81 C 5 81, 0 77, 0 73 L 0 8 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 566,
    "y": 356,
    "width": 74,
    "height": 10,
    "strokeColor": "#ffffff",
    "pathD": "M 0 1 L 74 1"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 633,
    "y": 294,
    "width": 216,
    "height": 81,
    "fillColor": "#ff4d38",
    "pathD": "M 0 8 C 0 4, 5 0, 11 0 L 205 0 C 211 0, 216 4, 216 8 L 216 73 C 216 77, 211 81, 205 81 L 11 81 C 5 81, 0 77, 0 73 L 0 8 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 566,
    "y": 399,
    "width": 74,
    "height": 10,
    "strokeColor": "#ffffff",
    "pathD": "M 0 1 L 74 1"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 633,
    "y": 381,
    "width": 216,
    "height": 81,
    "fillColor": "#ff4d38",
    "pathD": "M 0 8 C 0 4, 5 0, 11 0 L 205 0 C 211 0, 216 4, 216 8 L 216 73 C 216 77, 211 81, 205 81 L 11 81 C 5 81, 0 77, 0 73 L 0 8 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 235,
    "y": 464,
    "width": 183,
    "height": 10,
    "strokeColor": "#ffffff",
    "pathD": "M 0 1 L 183 1"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 356,
    "y": 511,
    "width": 216,
    "height": 81,
    "fillColor": "#52c49c",
    "pathD": "M 0 8 C 0 4, 5 0, 11 0 L 205 0 C 211 0, 216 4, 216 8 L 216 73 C 216 77, 211 81, 205 81 L 11 81 C 5 81, 0 77, 0 73 L 0 8 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 566,
    "y": 529,
    "width": 74,
    "height": 10,
    "strokeColor": "#ffffff",
    "pathD": "M 0 1 L 74 1"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 633,
    "y": 467,
    "width": 216,
    "height": 81,
    "fillColor": "#52c49c",
    "pathD": "M 0 8 C 0 4, 5 0, 11 0 L 205 0 C 211 0, 216 4, 216 8 L 216 73 C 216 77, 211 81, 205 81 L 11 81 C 5 81, 0 77, 0 73 L 0 8 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 566,
    "y": 572,
    "width": 74,
    "height": 10,
    "strokeColor": "#ffffff",
    "pathD": "M 0 1 L 74 1"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 633,
    "y": 554,
    "width": 216,
    "height": 81,
    "fillColor": "#52c49c",
    "pathD": "M 0 8 C 0 4, 5 0, 11 0 L 205 0 C 211 0, 216 4, 216 8 L 216 73 C 216 77, 211 81, 205 81 L 11 81 C 5 81, 0 77, 0 73 L 0 8 Z"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 4,
    "x": 101,
    "y": 353,
    "width": 175,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 5,
    "x": 377,
    "y": 353,
    "width": 175,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 377,
    "y": 180,
    "width": 175,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 8,
    "x": 377,
    "y": 526,
    "width": 175,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 7,
    "x": 654,
    "y": 483,
    "width": 175,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 9,
    "x": 654,
    "y": 569,
    "width": 175,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 3,
    "x": 654,
    "y": 310,
    "width": 175,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 6,
    "x": 654,
    "y": 396,
    "width": 175,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 0,
    "x": 654,
    "y": 137,
    "width": 175,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 2,
    "x": 654,
    "y": 223,
    "width": 175,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 2,
    "x": 955,
    "y": 331,
    "width": 226,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textSize": 12
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 1,
    "x": 955,
    "y": 272,
    "width": 226,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textSize": 12
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 0,
    "x": 955,
    "y": 214,
    "width": 226,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textSize": 12
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 5,
    "x": 955,
    "y": 508,
    "width": 226,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textSize": 12
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 4,
    "x": 955,
    "y": 449,
    "width": 226,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textSize": 12
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 3,
    "x": 955,
    "y": 390,
    "width": 226,
    "height": 51,
    "text": "MIGSO-PCUBED content and words",
    "textSize": 12
  },
  {
    "id": "sp-35",
    "x": 930,
    "y": 159,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 935,
    "y": 222,
    "width": 12,
    "height": 12,
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 935,
    "y": 281,
    "width": 12,
    "height": 12,
    "fillColor": "#ff4d38",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 935,
    "y": 339,
    "width": 12,
    "height": 12,
    "fillColor": "#52c49c",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-39",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 935,
    "y": 398,
    "width": 12,
    "height": 12,
    "fillColor": "#ffb900",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 935,
    "y": 457,
    "width": 12,
    "height": 12,
    "fillColor": "#ee6d90",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 935,
    "y": 516,
    "width": 12,
    "height": 12,
    "fillColor": "#4a90d9",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates90Template({ data }: { data: BrainData }): ReactElement {
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
