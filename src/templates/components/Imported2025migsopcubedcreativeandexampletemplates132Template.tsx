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
    "x": 80,
    "y": 336,
    "width": 208,
    "height": 93
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 308,
    "y": 336,
    "width": 208,
    "height": 93,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 536,
    "y": 336,
    "width": 208,
    "height": 93,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 764,
    "y": 336,
    "width": 208,
    "height": 93,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 992,
    "y": 336,
    "width": 208,
    "height": 93,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-5",
    "x": 124,
    "y": 365,
    "width": 121,
    "height": 36,
    "text": "Employee",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "x": 366,
    "y": 365,
    "width": 93,
    "height": 36,
    "text": "Quality",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-7",
    "x": 565,
    "y": 365,
    "width": 150,
    "height": 36,
    "text": "Maintenance",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-8",
    "x": 801,
    "y": 365,
    "width": 133,
    "height": 36,
    "text": "Production",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-9",
    "x": 1044,
    "y": 365,
    "width": 103,
    "height": 36,
    "text": "Process",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 155,
    "y": 246,
    "width": 57,
    "height": 71,
    "pathD": "M 14 71 L 14 28 L 0 28 L 29 0 L 57 28 L 43 28 L 43 71 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 383,
    "y": 246,
    "width": 57,
    "height": 71,
    "fillColor": "#ff4d38",
    "pathD": "M 14 71 L 14 28 L 0 28 L 29 0 L 57 28 L 43 28 L 43 71 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 611,
    "y": 246,
    "width": 57,
    "height": 71,
    "fillColor": "#52c49c",
    "pathD": "M 14 71 L 14 28 L 0 28 L 29 0 L 57 28 L 43 28 L 43 71 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 839,
    "y": 246,
    "width": 57,
    "height": 71,
    "fillColor": "#ffb900",
    "pathD": "M 14 71 L 14 28 L 0 28 L 29 0 L 57 28 L 43 28 L 43 71 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1067,
    "y": 246,
    "width": 57,
    "height": 71,
    "fillColor": "#ee6d90",
    "pathD": "M 14 71 L 14 28 L 0 28 L 29 0 L 57 28 L 43 28 L 43 71 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 155,
    "y": 449,
    "width": 57,
    "height": 71,
    "pathD": "M 14 0 L 43 0 L 43 43 L 57 43 L 29 71 L 0 43 L 14 43 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 383,
    "y": 449,
    "width": 57,
    "height": 71,
    "fillColor": "#ff4d38",
    "pathD": "M 14 0 L 43 0 L 43 43 L 57 43 L 29 71 L 0 43 L 14 43 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 611,
    "y": 449,
    "width": 57,
    "height": 71,
    "fillColor": "#52c49c",
    "pathD": "M 14 0 L 43 0 L 43 43 L 57 43 L 29 71 L 0 43 L 14 43 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 839,
    "y": 449,
    "width": 57,
    "height": 71,
    "fillColor": "#ffb900",
    "pathD": "M 14 0 L 43 0 L 43 43 L 57 43 L 29 71 L 0 43 L 14 43 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 1067,
    "y": 449,
    "width": 57,
    "height": 71,
    "fillColor": "#ee6d90",
    "pathD": "M 14 0 L 43 0 L 43 43 L 57 43 L 29 71 L 0 43 L 14 43 Z"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 0,
    "x": 80,
    "y": 161,
    "width": 208,
    "height": 57,
    "text": "Individual Piecework",
    "textSize": 16
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 308,
    "y": 161,
    "width": 208,
    "height": 57,
    "text": "Detection % defective",
    "textSize": 16
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 2,
    "x": 536,
    "y": 161,
    "width": 208,
    "height": 57,
    "text": "Reactive run to failure",
    "textSize": 16
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 764,
    "y": 161,
    "width": 208,
    "height": 57,
    "text": "Push                 batch",
    "textSize": 16
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 4,
    "x": 992,
    "y": 161,
    "width": 208,
    "height": 57,
    "text": "Complex cumbersome",
    "textSize": 16
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 0,
    "x": 80,
    "y": 549,
    "width": 208,
    "height": 31,
    "text": "Teamwork cells",
    "textSize": 16
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 5,
    "x": 308,
    "y": 549,
    "width": 208,
    "height": 57,
    "text": "Prevention 100% quality",
    "textSize": 16
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 6,
    "x": 536,
    "y": 549,
    "width": 208,
    "height": 57,
    "text": "Proactive            TPM",
    "textSize": 16
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 1,
    "x": 764,
    "y": 549,
    "width": 208,
    "height": 31,
    "text": "Pull one price flow",
    "textSize": 16
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 2,
    "x": 992,
    "y": 549,
    "width": 208,
    "height": 31,
    "text": "Simple streamlined",
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

export function Imported2025migsopcubedcreativeandexampletemplates132Template({ data }: { data: BrainData }): ReactElement {
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
