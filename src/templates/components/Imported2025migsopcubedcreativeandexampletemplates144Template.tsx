import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "grp-0",
    "isGroup": true,
    "children": [
      {
        "id": "sp-11",
        "x": 447.30794060684315,
        "y": 204,
        "width": 385.38411878631376,
        "height": 75,
        "localPctX": 0.3279535183989671,
        "localPctY": 0,
        "localPctW": 0.34409296320206584,
        "localPctH": 1,
        "fillColor": "#ff4d38",
        "pathD": "M 353 0 L 0 0 L 33 38 L 0 75 L 353 75 L 385 38 C 385 38, 353 0, 353 0 Z"
      },
      {
        "id": "sp-12",
        "x": 80,
        "y": 204,
        "width": 385.38411878631376,
        "height": 75,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.34409296320206584,
        "localPctH": 1,
        "fillColor": "#3365cc",
        "pathD": "M 353 0 L 0 0 L 0 75 L 353 75 L 385 38 C 385 38, 353 0, 353 0 Z"
      },
      {
        "id": "sp-13",
        "x": 814.6158812136862,
        "y": 204,
        "width": 385.38411878631376,
        "height": 75,
        "localPctX": 0.655907036797934,
        "localPctY": 0,
        "localPctW": 0.34409296320206584,
        "localPctH": 1,
        "fillColor": "#52c49c",
        "pathD": "M 385 0 L 0 0 L 33 38 L 0 75 L 385 75 C 385 75, 385 0, 385 0 Z"
      }
    ],
    "x": 80,
    "y": 204,
    "width": 1120,
    "height": 75
  },
  {
    "id": "sp-0",
    "dataNodeIdx": 0,
    "x": 193,
    "y": 332,
    "width": 149,
    "height": 36,
    "text": "Milestone 01",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 0,
    "x": 147,
    "y": 376,
    "width": 242,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 1,
    "x": 566,
    "y": 332,
    "width": 149,
    "height": 36,
    "text": "Milestone 02",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 519,
    "y": 376,
    "width": 242,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 2,
    "x": 938,
    "y": 332,
    "width": 149,
    "height": 36,
    "text": "Milestone 03",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 2,
    "x": 892,
    "y": 376,
    "width": 242,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 209,
    "y": 213,
    "width": 109,
    "height": 58,
    "text": "2019",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 586,
    "y": 213,
    "width": 109,
    "height": 58,
    "text": "2020",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 2,
    "x": 962,
    "y": 213,
    "width": 109,
    "height": 58,
    "text": "2021",
    "textColor": "#ffffff",
    "textSize": 30
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

export function Imported2025migsopcubedcreativeandexampletemplates144Template({ data }: { data: BrainData }): ReactElement {
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
