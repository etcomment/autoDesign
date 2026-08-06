import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 80,
    "y": 127,
    "width": 132,
    "height": 31,
    "text": "Chart TITLE",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 731,
    "y": 206,
    "width": 58,
    "height": 58,
    "fillColor": "#3365cc",
    "pathD": "M 29 0 A 29 29 0 1 1 29 0 Z"
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 0,
    "x": 739,
    "y": 217,
    "width": 43,
    "height": 36,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 0,
    "x": 802,
    "y": 183,
    "width": 159,
    "height": 104,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 731,
    "y": 379,
    "width": 58,
    "height": 58,
    "fillColor": "#ff4d38",
    "pathD": "M 29 0 A 29 29 0 1 1 29 0 Z"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 2,
    "x": 739,
    "y": 390,
    "width": 43,
    "height": 36,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 2,
    "x": 802,
    "y": 355,
    "width": 159,
    "height": 104,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 731,
    "y": 551,
    "width": 58,
    "height": 58,
    "fillColor": "#52c49c",
    "pathD": "M 29 0 A 29 29 0 1 1 29 0 Z"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 4,
    "x": 739,
    "y": 562,
    "width": 43,
    "height": 36,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 4,
    "x": 802,
    "y": 528,
    "width": 159,
    "height": 104,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 986,
    "y": 206,
    "width": 58,
    "height": 58,
    "fillColor": "#ffb900",
    "pathD": "M 29 0 A 29 29 0 1 1 29 0 Z"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 1,
    "x": 993,
    "y": 217,
    "width": 43,
    "height": 36,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 1,
    "x": 1057,
    "y": 183,
    "width": 159,
    "height": 104,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 986,
    "y": 379,
    "width": 58,
    "height": 58,
    "fillColor": "#ee6d90",
    "pathD": "M 29 0 A 29 29 0 1 1 29 0 Z"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 3,
    "x": 993,
    "y": 390,
    "width": 43,
    "height": 36,
    "text": "5",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 3,
    "x": 1057,
    "y": 355,
    "width": 159,
    "height": 104,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 986,
    "y": 551,
    "width": 58,
    "height": 58,
    "fillColor": "#4a90d9",
    "pathD": "M 29 0 A 29 29 0 1 1 29 0 Z"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 5,
    "x": 993,
    "y": 562,
    "width": 43,
    "height": 36,
    "text": "6",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 5,
    "x": 1057,
    "y": 528,
    "width": 159,
    "height": 104,
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

export function Imported2025migsopcubedcreativeandexampletemplates43Template({ data }: { data: BrainData }): ReactElement {
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
