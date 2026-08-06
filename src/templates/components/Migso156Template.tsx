import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 529,
    "y": 266,
    "width": 223,
    "height": 223,
    "text": "",
    "pathD": "M 112 0 A 112 112 0 1 1 111 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 192,
    "y": 238,
    "width": 232,
    "height": 47,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 192,
    "y": 145,
    "width": 232,
    "height": 93,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 0 0 L 0 93 L 232 93 L 232 0 C 232 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 192,
    "y": 561,
    "width": 232,
    "height": 47,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 192,
    "y": 468,
    "width": 232,
    "height": 93,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 0 0 L 0 93 L 232 93 L 232 0 C 232 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 856,
    "y": 561,
    "width": 232,
    "height": 47,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 856,
    "y": 468,
    "width": 232,
    "height": 93,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 0 0 L 0 93 L 232 93 L 232 0 C 232 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 856,
    "y": 238,
    "width": 232,
    "height": 47,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 856,
    "y": 145,
    "width": 232,
    "height": 93,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 0 0 L 0 93 L 232 93 L 232 0 C 232 0, 0 0, 0 0 Z"
  },
  {
    "id": "sp-9",
    "x": 570,
    "y": 312,
    "width": 140,
    "height": 140,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 129 128 L 129 128 C 130 124, 114 75, 114 74 L 114 74 C 116 72, 126 63, 126 61 L 126 61 C 126 60, 120 54, 119 54 L 119 54 C 118 54, 112 60, 111 62 L 111 62 C 110 62, 106 45, 108 44 L 108 44 C 109 42, 123 30, 131 21 L 131 21 C 138 14, 140 2, 139 1 L 139 1 C 138 0, 126 2, 119 9 L 119 9 C 110 17, 98 31, 96 32 L 96 32 C 95 34, 78 30, 78 29 L 78 29 C 80 28, 86 22, 86 21 L 86 21 C 86 20, 80 14, 79 14 L 79 14 C 77 14, 68 24, 66 26 L 66 26 C 65 26, 16 10, 12 11 L 12 11 C 7 12, 2 16, 3 17 L 3 17 C 4 18, 42 35, 49 39 L 49 39 C 55 43, 68 56, 68 57 L 68 57 C 68 59, 34 97, 32 98 L 32 98 C 30 100, 16 93, 10 93 L 10 93 C 4 94, 0 98, 0 100 L 0 100 C 1 101, 23 111, 22 113 L 22 113 C 21 114, 15 124, 15 125 L 15 125 C 16 125, 26 119, 27 118 L 27 118 C 29 117, 39 139, 40 140 L 40 140 C 42 140, 46 136, 47 130 L 47 130 C 47 124, 40 110, 42 108 L 42 108 C 43 106, 81 72, 83 72 L 83 72 C 84 72, 96 85, 101 91 L 101 91 C 105 98, 122 136, 123 137 L 123 137 C 124 138, 128 133, 129 128"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 1,
    "x": 868,
    "y": 153,
    "width": 209,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 1,
    "x": 868,
    "y": 244,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 3,
    "x": 868,
    "y": 477,
    "width": 209,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 3,
    "x": 868,
    "y": 567,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 0,
    "x": 203,
    "y": 153,
    "width": 209,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 0,
    "x": 301,
    "y": 244,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 2,
    "x": 203,
    "y": 477,
    "width": 209,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 301,
    "y": 567,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 712,
    "y": 198,
    "width": 144,
    "height": 48,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 424,
    "y": 198,
    "width": 144,
    "height": 48,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 712,
    "y": 515,
    "width": 144,
    "height": 48,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 424,
    "y": 515,
    "width": 144,
    "height": 48,
    "fillColor": "#ffb900",
    "text": ""
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

export function Migso156Template({ data }: { data: BrainData }): ReactElement {
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
