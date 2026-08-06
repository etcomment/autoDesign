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
    "x": 659,
    "y": 133,
    "width": 10,
    "height": 246,
    "strokeColor": "#3365cc"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 161,
    "y": 133,
    "width": 10,
    "height": 246,
    "strokeColor": "#ee6d90"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 660,
    "y": 380,
    "width": 498,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 161,
    "y": 380,
    "width": 499,
    "height": 10,
    "strokeColor": "#3365cc"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1148,
    "y": 370,
    "width": 19,
    "height": 19,
    "fillColor": "#ff4d38",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 401,
    "y": 370,
    "width": 19,
    "height": 19,
    "fillColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 650,
    "y": 370,
    "width": 19,
    "height": 19,
    "fillColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 899,
    "y": 370,
    "width": 19,
    "height": 19,
    "fillColor": "#ff4d38",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 908,
    "y": 380,
    "width": 10,
    "height": 246,
    "strokeColor": "#ff4d38"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 410,
    "y": 380,
    "width": 10,
    "height": 246,
    "strokeColor": "#3365cc"
  },
  {
    "id": "sp-10",
    "x": 98,
    "y": 317,
    "width": 127,
    "height": 127,
    "fillColor": "#ee6d90",
    "pathD": "M 64 0 A 64 64 0 1 1 63 0 Z"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 0,
    "x": 170,
    "y": 156,
    "width": 149,
    "height": 36,
    "text": "Milestone 01",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 170,
    "y": 194,
    "width": 288,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 669,
    "y": 156,
    "width": 149,
    "height": 36,
    "text": "Milestone 03",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 669,
    "y": 194,
    "width": 288,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 2,
    "x": 420,
    "y": 462,
    "width": 149,
    "height": 36,
    "text": "Milestone 02",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 2,
    "x": 420,
    "y": 501,
    "width": 288,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 3,
    "x": 919,
    "y": 462,
    "width": 149,
    "height": 36,
    "text": "Milestone 04",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 919,
    "y": 501,
    "width": 288,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 0,
    "x": 377,
    "y": 325,
    "width": 67,
    "height": 36,
    "text": "2019",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 875,
    "y": 325,
    "width": 67,
    "height": 36,
    "text": "2021",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 626,
    "y": 396,
    "width": 67,
    "height": 36,
    "text": "2020",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 1124,
    "y": 396,
    "width": 67,
    "height": 36,
    "text": "2022",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-23",
    "x": 117,
    "y": 363,
    "width": 89,
    "height": 36,
    "text": "START",
    "textColor": "#ffffff",
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

export function Imported2025migsopcubedcreativeandexampletemplates140Template({ data }: { data: BrainData }): ReactElement {
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
