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
        "id": "sp-8",
        "x": 158,
        "y": 151,
        "width": 223,
        "height": 356,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#ffffff",
        "pathD": "M 112 0 C 104 0, 96 3, 90 9 L 9 90 C -3 102, -3 121, 9 133 C 21 145, 40 145, 52 133 L 81 104 L 81 326 C 81 342, 95 356, 112 356 C 128 356, 142 342, 142 326 L 142 104 L 171 133 C 183 145, 202 145, 214 133 C 226 121, 226 102, 214 90 L 133 9 C 127 3, 119 0, 112 0 Z"
      },
      {
        "id": "sp-9",
        "x": 158,
        "y": 356.53066666666666,
        "width": 223,
        "height": 150.46933333333334,
        "localPctX": 0,
        "localPctY": 0.5773333333333334,
        "localPctW": 1,
        "localPctH": 0.4226666666666667
      },
      {
        "id": "sp-10",
        "x": 158,
        "y": 151,
        "width": 223,
        "height": 356,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#ffffff",
        "pathD": "M 142 104 L 171 133 C 183 145, 202 145, 214 133 C 219 128, 221 123, 222 117 L 223 111 L 223 356 L 112 356 C 128 356, 142 342, 142 326 Z M 112 0 L 223 0 L 223 111 L 222 105 C 221 100, 219 94, 214 90 L 133 9 C 127 3, 119 0, 112 0 Z M 0 0 L 112 0 C 104 0, 96 3, 90 9 L 9 90 C -3 102, -3 121, 9 133 C 21 145, 40 145, 52 133 L 81 104 L 81 326 C 81 342, 95 356, 112 356 L 0 356 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 158,
    "y": 151,
    "width": 223,
    "height": 356
  },
  {
    "id": "grp-4",
    "isGroup": true,
    "children": [
      {
        "id": "sp-11",
        "x": 530,
        "y": 151,
        "width": 223,
        "height": 356,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#ffffff",
        "pathD": "M 112 0 C 104 0, 96 3, 90 9 L 9 90 C -3 102, -3 121, 9 133 C 21 145, 40 145, 52 133 L 81 104 L 81 326 C 81 342, 95 356, 112 356 C 128 356, 142 342, 142 326 L 142 104 L 171 133 C 183 145, 202 145, 214 133 C 226 121, 226 102, 214 90 L 133 9 C 127 3, 119 0, 112 0 Z"
      },
      {
        "id": "sp-12",
        "x": 530,
        "y": 276.7866666666667,
        "width": 223,
        "height": 230.21333333333334,
        "localPctX": 0,
        "localPctY": 0.3533333333333334,
        "localPctW": 1,
        "localPctH": 0.6466666666666667,
        "fillColor": "#ff4d38"
      },
      {
        "id": "sp-13",
        "x": 530,
        "y": 151,
        "width": 223,
        "height": 356,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#ffffff",
        "pathD": "M 142 104 L 171 133 C 183 145, 202 145, 214 133 C 219 128, 221 123, 222 117 L 223 111 L 223 356 L 112 356 C 128 356, 142 342, 142 326 Z M 112 0 L 223 0 L 223 111 L 222 105 C 221 100, 219 94, 214 90 L 133 9 C 127 3, 119 0, 112 0 Z M 0 0 L 112 0 C 104 0, 96 3, 90 9 L 9 90 C -3 102, -3 121, 9 133 C 21 145, 40 145, 52 133 L 81 104 L 81 326 C 81 342, 95 356, 112 356 L 0 356 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 530,
    "y": 151,
    "width": 223,
    "height": 356
  },
  {
    "id": "grp-8",
    "isGroup": true,
    "children": [
      {
        "id": "sp-14",
        "x": 902,
        "y": 151,
        "width": 223,
        "height": 356,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#ffffff",
        "pathD": "M 112 0 C 104 0, 96 3, 90 9 L 9 90 C -3 102, -3 121, 9 133 C 21 145, 40 145, 52 133 L 81 104 L 81 326 C 81 342, 95 356, 112 356 C 128 356, 142 342, 142 326 L 142 104 L 171 133 C 183 145, 202 145, 214 133 C 226 121, 226 102, 214 90 L 133 9 C 127 3, 119 0, 112 0 Z"
      },
      {
        "id": "sp-15",
        "x": 902,
        "y": 174.25866666666667,
        "width": 223,
        "height": 332.74133333333333,
        "localPctX": 0,
        "localPctY": 0.06533333333333334,
        "localPctW": 1,
        "localPctH": 0.9346666666666666,
        "fillColor": "#52c49c"
      },
      {
        "id": "sp-16",
        "x": 902,
        "y": 151,
        "width": 223,
        "height": 356,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#ffffff",
        "pathD": "M 142 104 L 171 133 C 183 145, 202 145, 214 133 C 219 128, 221 123, 222 117 L 223 111 L 223 356 L 112 356 C 128 356, 142 342, 142 326 Z M 112 0 L 223 0 L 223 111 L 222 105 C 221 100, 219 94, 214 90 L 133 9 C 127 3, 119 0, 112 0 Z M 0 0 L 112 0 C 104 0, 96 3, 90 9 L 9 90 C -3 102, -3 121, 9 133 C 21 145, 40 145, 52 133 L 81 104 L 81 326 C 81 342, 95 356, 112 356 L 0 356 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 902,
    "y": 151,
    "width": 223,
    "height": 356
  },
  {
    "id": "sp-0",
    "dataNodeIdx": 1,
    "x": 569,
    "y": 538,
    "width": 141,
    "height": 36,
    "text": "Your title 2",
    "textColor": "#ff4d38",
    "textSize": 16
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 1,
    "x": 485,
    "y": 578,
    "width": 312,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 2,
    "x": 941,
    "y": 538,
    "width": 141,
    "height": 36,
    "text": "Your title 3",
    "textColor": "#52c49c",
    "textSize": 16
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 2,
    "x": 857,
    "y": 578,
    "width": 312,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 0,
    "x": 198,
    "y": 538,
    "width": 141,
    "height": 36,
    "text": "Your title 1",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 114,
    "y": 578,
    "width": 312,
    "height": 44,
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

export function Imported2025migsopcubedcreativeandexampletemplates30Template({ data }: { data: BrainData }): ReactElement {
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
