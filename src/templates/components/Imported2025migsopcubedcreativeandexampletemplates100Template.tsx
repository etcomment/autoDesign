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
    "x": 329,
    "y": 135,
    "width": 257,
    "height": 77
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 0,
    "x": 340,
    "y": 156,
    "width": 236,
    "height": 35,
    "text": "How to boil rice",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 791,
    "y": 135,
    "width": 257,
    "height": 77
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 802,
    "y": 156,
    "width": 236,
    "height": 35,
    "text": "Serve rice",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 329,
    "y": 263,
    "width": 257,
    "height": 77,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 2,
    "x": 340,
    "y": 284,
    "width": 236,
    "height": 35,
    "text": "Fill pan with water",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 791,
    "y": 263,
    "width": 257,
    "height": 77,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 3,
    "x": 802,
    "y": 284,
    "width": 236,
    "height": 35,
    "text": "Drain pan into sieve",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 329,
    "y": 391,
    "width": 257,
    "height": 77,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 4,
    "x": 340,
    "y": 412,
    "width": 236,
    "height": 35,
    "text": "Heat pan on stove",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 791,
    "y": 391,
    "width": 257,
    "height": 77,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-11",
    "x": 802,
    "y": 398,
    "width": 236,
    "height": 63,
    "text": "Reduce heat to low, cook for 15 m",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-12",
    "x": 329,
    "y": 508,
    "width": 257,
    "height": 129,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-13",
    "x": 386,
    "y": 541,
    "width": 144,
    "height": 63,
    "text": "Is the water boiling?",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 791,
    "y": 534,
    "width": 257,
    "height": 77,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 5,
    "x": 802,
    "y": 555,
    "width": 236,
    "height": 35,
    "text": "Add rice",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 458,
    "y": 212,
    "width": 10,
    "height": 51
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 458,
    "y": 340,
    "width": 10,
    "height": 51
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 458,
    "y": 467,
    "width": 10,
    "height": 41
  },
  {
    "id": "sp-23",
    "x": 587,
    "y": 573,
    "width": 205,
    "height": 10
  },
  {
    "id": "sp-24",
    "x": 920,
    "y": 468,
    "width": 10,
    "height": 67
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 920,
    "y": 340,
    "width": 10,
    "height": 51
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 920,
    "y": 212,
    "width": 10,
    "height": 51
  },
  {
    "id": "sp-27",
    "x": 329,
    "y": 429,
    "width": 10,
    "height": 143
  },
  {
    "id": "sp-16",
    "x": 231,
    "y": 488,
    "width": 42,
    "height": 31,
    "text": "NO",
    "textSize": 16
  },
  {
    "id": "sp-17",
    "x": 663,
    "y": 537,
    "width": 53,
    "height": 31,
    "text": "YES",
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

export function Imported2025migsopcubedcreativeandexampletemplates100Template({ data }: { data: BrainData }): ReactElement {
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
