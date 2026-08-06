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
    "x": 148,
    "y": 123,
    "width": 289,
    "height": 105,
    "fillColor": "#3365cc",
    "pathD": "M 10 0 L 279 0 Q 289 0 289 10 L 289 95 Q 289 105 279 105 L 10 105 Q 0 105 0 95 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 419,
    "y": 123,
    "width": 217,
    "height": 105,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 636,
    "y": 123,
    "width": 217,
    "height": 105,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 851,
    "y": 123,
    "width": 217,
    "height": 158,
    "fillColor": "#ee6d90",
    "pathD": "M 0 0 L 0 105 L 112 105 L 112 158 L 217 158 L 217 89 L 217 16 C 217 14, 217 12, 217 11 C 217 9, 217 8, 216 7 C 216 5, 215 4, 214 3 C 213 2, 212 1, 210 1 C 209 0, 208 0, 206 0 C 205 0, 203 0, 201 0 L 128 0 L 0 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 851,
    "y": 280,
    "width": 217,
    "height": 158,
    "fillColor": "#52c49c",
    "pathD": "M 112 0 L 112 53 L 0 53 L 0 158 L 201 158 L 201 158 C 203 158, 205 158, 206 158 C 208 158, 209 158, 210 157 C 212 157, 213 156, 214 155 C 215 154, 216 153, 216 151 C 217 150, 217 149, 217 147 C 217 146, 217 144, 217 142 L 217 141 L 217 141 L 217 69 L 217 0 L 112 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 636,
    "y": 334,
    "width": 217,
    "height": 105,
    "fillColor": "#4a90d9"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 419,
    "y": 334,
    "width": 217,
    "height": 105,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 202,
    "y": 334,
    "width": 217,
    "height": 158,
    "fillColor": "#ffb900",
    "pathD": "M 112 0 L 112 53 L 0 53 L 0 158 L 201 158 L 201 158 C 203 158, 205 158, 206 158 C 208 158, 209 158, 210 157 C 212 157, 213 156, 214 155 C 215 154, 216 153, 216 151 C 217 150, 217 149, 217 147 C 217 146, 217 144, 217 142 L 217 141 L 217 141 L 217 69 L 217 0 L 112 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 202,
    "y": 492,
    "width": 217,
    "height": 158,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 0 69 L 0 141 L 0 141 L 0 142 C 0 144, 0 146, 0 147 C 0 149, 0 150, 1 151 C 1 153, 2 154, 3 155 C 4 156, 5 157, 7 157 C 8 158, 9 158, 11 158 C 12 158, 14 158, 16 158 L 16 158 L 217 158 L 217 53 L 105 53 L 105 0 L 0 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 835,
    "y": 545,
    "width": 289,
    "height": 105,
    "fillColor": "#4a90d9",
    "pathD": "M 10 0 L 279 0 Q 289 0 289 10 L 289 95 Q 289 105 279 105 L 10 105 Q 0 105 0 95 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 636,
    "y": 545,
    "width": 217,
    "height": 105,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 419,
    "y": 545,
    "width": 217,
    "height": 105,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 154,
    "y": 147,
    "width": 42,
    "height": 58,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-13",
    "x": 203,
    "y": 134,
    "width": 191,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 427,
    "y": 147,
    "width": 42,
    "height": 58,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 0,
    "x": 475,
    "y": 134,
    "width": 148,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 2,
    "x": 643,
    "y": 147,
    "width": 42,
    "height": 58,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 1,
    "x": 692,
    "y": 134,
    "width": 148,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 859,
    "y": 147,
    "width": 42,
    "height": 58,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 2,
    "x": 908,
    "y": 134,
    "width": 148,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 7,
    "x": 859,
    "y": 357,
    "width": 42,
    "height": 58,
    "text": "5",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 6,
    "x": 908,
    "y": 344,
    "width": 148,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 6,
    "x": 643,
    "y": 357,
    "width": 42,
    "height": 58,
    "text": "6",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 5,
    "x": 692,
    "y": 344,
    "width": 148,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 5,
    "x": 426,
    "y": 357,
    "width": 42,
    "height": 58,
    "text": "7",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 4,
    "x": 475,
    "y": 344,
    "width": 148,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 4,
    "x": 210,
    "y": 357,
    "width": 42,
    "height": 58,
    "text": "8",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 3,
    "x": 258,
    "y": 344,
    "width": 148,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 1,
    "x": 629,
    "y": 568,
    "width": 62,
    "height": 58,
    "text": "11",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 9,
    "x": 692,
    "y": 556,
    "width": 148,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 0,
    "x": 414,
    "y": 568,
    "width": 64,
    "height": 58,
    "text": "10",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 8,
    "x": 475,
    "y": 556,
    "width": 148,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 8,
    "x": 210,
    "y": 568,
    "width": 42,
    "height": 58,
    "text": "9",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 7,
    "x": 258,
    "y": 556,
    "width": 148,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 2,
    "x": 854,
    "y": 569,
    "width": 64,
    "height": 58,
    "text": "12",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 10,
    "x": 913,
    "y": 556,
    "width": 148,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-36",
    "x": 77,
    "y": 158,
    "width": 89,
    "height": 36,
    "text": "START",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-37",
    "x": 1117,
    "y": 580,
    "width": 65,
    "height": 36,
    "text": "END",
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

export function Imported2025migsopcubedcreativeandexampletemplates29Template({ data }: { data: BrainData }): ReactElement {
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
