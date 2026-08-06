import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 139,
    "y": 136,
    "width": 872,
    "height": 60,
    "text": "",
    "pathD": "M 0 0 L 841 0 L 872 60 L 0 60 Z"
  },
  {
    "id": "sp-1",
    "x": 139,
    "y": 321,
    "width": 970,
    "height": 60,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 939 0 L 970 59 L 969 60 L 0 60 Z"
  },
  {
    "id": "sp-2",
    "x": 139,
    "y": 259,
    "width": 938,
    "height": 60,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 907 0 L 938 60 L 0 60 Z"
  },
  {
    "id": "sp-3",
    "x": 139,
    "y": 197,
    "width": 905,
    "height": 60,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 0 L 874 0 L 905 60 L 0 60 Z"
  },
  {
    "id": "sp-4",
    "x": 984,
    "y": 136,
    "width": 228,
    "height": 491,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 0 0 L 171 0 L 228 246 L 171 491 L 0 491 L 57 246 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 139,
    "y": 383,
    "width": 186,
    "height": 243,
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 329,
    "y": 383,
    "width": 186,
    "height": 243,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 518,
    "y": 383,
    "width": 186,
    "height": 243,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 707,
    "y": 383,
    "width": 186,
    "height": 243,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-9",
    "x": 897,
    "y": 383,
    "width": 212,
    "height": 243,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 84 243 L 212 243 L 84 0 L 84 0 L 0 0 L 0 243 L 84 243 Z"
  },
  {
    "id": "sp-10",
    "x": 505,
    "y": 148,
    "width": 212,
    "height": 36,
    "text": "Firm infrastructure"
  },
  {
    "id": "sp-11",
    "x": 447,
    "y": 209,
    "width": 328,
    "height": 36,
    "text": "Human resource management"
  },
  {
    "id": "sp-12",
    "x": 472,
    "y": 271,
    "width": 277,
    "height": 36,
    "text": "Technology development"
  },
  {
    "id": "sp-13",
    "x": 535,
    "y": 333,
    "width": 152,
    "height": 36,
    "text": "Procurement"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 0,
    "x": 175,
    "y": 442,
    "width": 114,
    "height": 61,
    "text": "Inbound Logistics"
  },
  {
    "id": "sp-15",
    "x": 355,
    "y": 442,
    "width": 133,
    "height": 36,
    "text": "Operations"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 550,
    "y": 442,
    "width": 122,
    "height": 61,
    "text": "Outbound Logistics"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 739,
    "y": 442,
    "width": 121,
    "height": 61,
    "text": "Marketing And sales"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 1,
    "x": 936,
    "y": 442,
    "width": 96,
    "height": 36,
    "text": "Service"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 2,
    "x": 1055,
    "y": 481,
    "width": 90,
    "height": 36,
    "text": "Margin"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 0,
    "x": 1055,
    "y": 241,
    "width": 90,
    "height": 36,
    "text": "Margin"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 512,
    "y": 632,
    "width": 198,
    "height": 36,
    "text": "Primary activities"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 0,
    "x": 9,
    "y": 242,
    "width": 200,
    "height": 36,
    "text": "Support activities"
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

export function Migso201Template({ data }: { data: BrainData }): ReactElement {
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

        {titleLines.length > 0 && (
          <text
            x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)}
            y={bbox.y + (shapeDef.pathD || finalColor ? 20 : 10)}
            fontFamily="Arial, sans-serif"
            fontSize={shapeDef.isTitle ? 14 : (shapeDef.isSubtitle ? 10 : 12)}
            fontWeight={shapeDef.isTitle ? 700 : 400}
            fill={shapeDef.isTitle ? '#111827' : '#4b5563'}
          >
            {titleLines.map((line: string, lIdx: number) => (
              <tspan key={lIdx} x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)} dy={lIdx === 0 ? 0 : (shapeDef.isTitle ? 18 : 14)}>
                {line}
              </tspan>
            ))}
          </text>
        )}

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
