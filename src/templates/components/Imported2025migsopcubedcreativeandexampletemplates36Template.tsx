import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 80,
    "y": 135,
    "width": 50,
    "height": 585,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 130,
    "y": 176,
    "width": 477,
    "height": 78,
    "fillColor": "#3365cc",
    "pathD": "M 0 0 L 0 78 L 419 78 L 477 39 L 419 0 L 0 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 176,
    "width": 50,
    "height": 78,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 130,
    "y": 295,
    "width": 477,
    "height": 78,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 0 78 L 419 78 L 477 39 L 419 0 L 0 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 80,
    "y": 295,
    "width": 50,
    "height": 78,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 130,
    "y": 413,
    "width": 477,
    "height": 78,
    "fillColor": "#52c49c",
    "pathD": "M 0 0 L 0 78 L 419 78 L 477 39 L 419 0 L 0 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 80,
    "y": 413,
    "width": 50,
    "height": 78,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 130,
    "y": 532,
    "width": 477,
    "height": 78,
    "fillColor": "#ffb900",
    "pathD": "M 0 0 L 0 78 L 419 78 L 477 39 L 419 0 L 0 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 80,
    "y": 532,
    "width": 50,
    "height": 78,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-9",
    "x": 162,
    "y": 429,
    "width": 36,
    "height": 48,
    "fillColor": "#ffffff",
    "pathD": "M 25 11 L 25 4 L 32 11 L 25 11 Z M 31 21 L 22 21 L 22 18 L 31 18 L 31 21 Z M 31 33 L 21 33 L 21 30 L 31 30 L 31 33 Z M 18 33 L 4 33 L 4 30 L 18 30 L 18 33 Z M 18 39 L 4 39 L 4 36 L 18 36 L 18 39 Z M 4 24 L 11 24 L 11 27 L 4 27 L 4 24 Z M 27 27 L 13 27 L 13 24 L 27 24 L 27 27 Z M 4 18 L 19 18 L 19 21 L 4 21 L 4 18 Z M 26 0 L 0 0 L 0 48 L 36 48 L 36 10 L 26 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 156,
    "y": 549,
    "width": 48,
    "height": 45,
    "fillColor": "#ffffff",
    "pathD": "M 15 36 L 33 36 L 33 39 L 15 39 Z M 16 30 L 31 30 L 31 33 L 16 33 Z M 12 27 L 12 42 L 36 42 L 36 27 Z M 12 17 C 11 17, 10 17, 10 18 C 10 19, 11 20, 12 20 C 13 20, 14 19, 14 18 C 14 17, 13 17, 12 17 Z M 6 17 C 5 17, 4 17, 4 18 C 4 19, 5 20, 6 20 C 7 20, 8 19, 8 18 C 8 17, 7 17, 6 17 Z M 4 12 L 44 12 L 48 16 L 48 33 L 39 33 L 39 45 L 9 45 L 9 33 L 0 33 L 0 16 Z M 9 0 L 39 0 L 39 10 L 36 10 L 36 3 L 12 3 L 12 10 L 9 10 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 156,
    "y": 310,
    "width": 48,
    "height": 48,
    "fillColor": "#ffffff",
    "pathD": "M 31 33 L 38 33 L 38 39 L 31 39 Z M 21 33 L 27 33 L 27 39 L 21 39 Z M 10 33 L 16 33 L 16 39 L 10 39 Z M 31 24 L 38 24 L 38 30 L 31 30 Z M 21 24 L 27 24 L 27 30 L 21 30 Z M 10 24 L 16 24 L 16 30 L 10 30 Z M 0 20 L 3 20 L 3 45 L 39 45 L 39 39 L 45 39 L 45 20 L 48 20 L 48 41 L 41 48 L 0 48 Z M 12 0 L 15 0 L 15 12 L 18 6 L 33 6 L 33 0 L 36 0 L 36 12 L 39 6 L 44 6 L 48 10 L 48 18 L 0 18 L 0 10 L 4 6 L 12 6 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 156,
    "y": 194,
    "width": 48,
    "height": 42,
    "fillColor": "#ffffff",
    "pathD": "M 37 24 L 19 24 L 19 21 L 37 21 L 37 24 Z M 33 30 L 24 30 L 24 27 L 33 27 L 33 30 Z M 46 9 L 11 9 L 9 11 L 9 36 L 9 36 C 9 38, 8 39, 6 39 L 6 39 C 4 39, 3 38, 3 36 L 3 4 L 4 3 L 16 3 L 21 6 L 35 6 L 36 7 L 36 8 L 39 8 L 39 5 L 37 3 L 21 3 L 17 0 L 2 0 L 0 2 L 0 36 L 0 36 C 0 39, 3 42, 6 42 L 42 42 L 42 42 C 45 42, 48 39, 48 36 L 48 11 L 46 9 Z"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 0,
    "x": 239,
    "y": 197,
    "width": 284,
    "height": 36,
    "text": "Executing Summary",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 239,
    "y": 316,
    "width": 284,
    "height": 36,
    "text": "Market Analysis",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 2,
    "x": 239,
    "y": 435,
    "width": 284,
    "height": 36,
    "text": "Products & Services",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 3,
    "x": 239,
    "y": 553,
    "width": 284,
    "height": 36,
    "text": "Financial Planning",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 0,
    "x": 702,
    "y": 186,
    "width": 100,
    "height": 58,
    "text": "25%",
    "textColor": "#3365cc",
    "textSize": 30
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 1,
    "x": 702,
    "y": 305,
    "width": 100,
    "height": 58,
    "text": "50%",
    "textColor": "#ff4d38",
    "textSize": 30
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 2,
    "x": 702,
    "y": 423,
    "width": 100,
    "height": 58,
    "text": "75%",
    "textColor": "#52c49c",
    "textSize": 30
  },
  {
    "id": "sp-20",
    "x": 679,
    "y": 542,
    "width": 122,
    "height": 58,
    "text": "100%",
    "textColor": "#ffb900",
    "textSize": 30
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 0,
    "x": 831,
    "y": 187,
    "width": 369,
    "height": 56,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 1,
    "x": 831,
    "y": 306,
    "width": 369,
    "height": 56,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 2,
    "x": 831,
    "y": 425,
    "width": 369,
    "height": 56,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 3,
    "x": 831,
    "y": 543,
    "width": 369,
    "height": 56,
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

export function Imported2025migsopcubedcreativeandexampletemplates36Template({ data }: { data: BrainData }): ReactElement {
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
