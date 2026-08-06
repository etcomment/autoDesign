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
    "y": 200,
    "width": 128,
    "height": 115,
    "fillColor": "#3365cc",
    "pathD": "M 0 0 L 0 115 L 98 115 L 128 58 L 98 0 C 98 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 190,
    "y": 200,
    "width": 128,
    "height": 115,
    "fillColor": "#3365cc",
    "pathD": "M 0 0 L 30 58 L 0 115 L 98 115 L 128 58 L 98 0 C 98 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 300,
    "y": 200,
    "width": 128,
    "height": 115,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 30 58 L 0 115 L 98 115 L 128 58 L 98 0 C 98 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 411,
    "y": 200,
    "width": 128,
    "height": 115,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 30 58 L 0 115 L 98 115 L 128 58 L 98 0 C 98 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 521,
    "y": 200,
    "width": 128,
    "height": 115,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 30 58 L 0 115 L 98 115 L 128 58 L 98 0 C 98 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 631,
    "y": 200,
    "width": 128,
    "height": 115,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 30 58 L 0 115 L 98 115 L 128 58 L 98 0 C 98 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 741,
    "y": 200,
    "width": 128,
    "height": 115,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 30 58 L 0 115 L 98 115 L 128 58 L 98 0 C 98 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 851,
    "y": 200,
    "width": 128,
    "height": 115,
    "fillColor": "#52c49c",
    "pathD": "M 0 0 L 30 58 L 0 115 L 98 115 L 128 58 L 98 0 C 98 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 962,
    "y": 200,
    "width": 128,
    "height": 115,
    "fillColor": "#52c49c",
    "pathD": "M 0 0 L 30 58 L 0 115 L 98 115 L 128 58 L 98 0 C 98 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 1072,
    "y": 200,
    "width": 128,
    "height": 115,
    "fillColor": "#52c49c",
    "pathD": "M 0 0 L 30 58 L 0 115 L 98 115 L 128 58 L 98 0 C 98 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 0,
    "x": 80,
    "y": 151,
    "width": 67,
    "height": 36,
    "text": "2019",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 1,
    "x": 300,
    "y": 151,
    "width": 67,
    "height": 36,
    "text": "2020",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 2,
    "x": 851,
    "y": 151,
    "width": 67,
    "height": 36,
    "text": "2021",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 0,
    "x": 193,
    "y": 378,
    "width": 149,
    "height": 36,
    "text": "Milestone 01",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 0,
    "x": 147,
    "y": 422,
    "width": 242,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 1,
    "x": 566,
    "y": 378,
    "width": 149,
    "height": 36,
    "text": "Milestone 02",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 519,
    "y": 422,
    "width": 242,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 938,
    "y": 378,
    "width": 149,
    "height": 36,
    "text": "Milestone 03",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 2,
    "x": 892,
    "y": 422,
    "width": 242,
    "height": 75,
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

export function Imported2025migsopcubedcreativeandexampletemplates141Template({ data }: { data: BrainData }): ReactElement {
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
