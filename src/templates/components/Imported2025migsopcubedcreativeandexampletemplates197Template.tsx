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
    "x": 357,
    "y": 96,
    "width": 212,
    "height": 96,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 569,
    "y": 96,
    "width": 212,
    "height": 96,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 782,
    "y": 96,
    "width": 212,
    "height": 96,
    "fillColor": "#52c49c",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 994,
    "y": 96,
    "width": 212,
    "height": 96,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 87,
    "y": 192,
    "width": 270,
    "height": 112,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 87,
    "y": 305,
    "width": 270,
    "height": 112,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 87,
    "y": 417,
    "width": 270,
    "height": 112,
    "fillColor": "#52c49c",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 87,
    "y": 530,
    "width": 270,
    "height": 112,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 357,
    "y": 192,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 569,
    "y": 192,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 782,
    "y": 192,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 994,
    "y": 192,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 357,
    "y": 305,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 569,
    "y": 305,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 782,
    "y": 305,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 994,
    "y": 305,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 357,
    "y": 417,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 569,
    "y": 417,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 782,
    "y": 417,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 994,
    "y": 417,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 357,
    "y": 530,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 569,
    "y": 530,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 782,
    "y": 530,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 15,
    "x": 994,
    "y": 530,
    "width": 212,
    "height": 112,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 401,
    "y": 126,
    "width": 123,
    "height": 36,
    "text": "Aspect 01",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 1,
    "x": 615,
    "y": 126,
    "width": 121,
    "height": 36,
    "text": "Aspect 02",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 2,
    "x": 827,
    "y": 126,
    "width": 121,
    "height": 36,
    "text": "Aspect 03",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 3,
    "x": 1040,
    "y": 126,
    "width": 121,
    "height": 36,
    "text": "Aspect 04",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 0,
    "x": 138,
    "y": 231,
    "width": 168,
    "height": 36,
    "text": "Description 01",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 1,
    "x": 138,
    "y": 343,
    "width": 168,
    "height": 36,
    "text": "Description 02",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 2,
    "x": 138,
    "y": 456,
    "width": 168,
    "height": 36,
    "text": "Description 03",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 3,
    "x": 138,
    "y": 568,
    "width": 168,
    "height": 36,
    "text": "Description 04",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 0,
    "x": 371,
    "y": 217,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 4,
    "x": 371,
    "y": 329,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 8,
    "x": 371,
    "y": 442,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 12,
    "x": 371,
    "y": 554,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 1,
    "x": 583,
    "y": 217,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 5,
    "x": 583,
    "y": 329,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 9,
    "x": 583,
    "y": 442,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 13,
    "x": 583,
    "y": 554,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 2,
    "x": 796,
    "y": 217,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 6,
    "x": 796,
    "y": 329,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 10,
    "x": 796,
    "y": 442,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 14,
    "x": 796,
    "y": 554,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 3,
    "x": 1008,
    "y": 217,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 7,
    "x": 1008,
    "y": 329,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 11,
    "x": 1008,
    "y": 442,
    "width": 185,
    "height": 63,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 15,
    "x": 1008,
    "y": 554,
    "width": 185,
    "height": 63,
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

export function Imported2025migsopcubedcreativeandexampletemplates197Template({ data }: { data: BrainData }): ReactElement {
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
