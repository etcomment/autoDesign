import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 107,
    "y": 543,
    "width": 1076,
    "height": 128,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 107,
    "y": 268,
    "width": 1076,
    "height": 128,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 107,
    "y": 406,
    "width": 1076,
    "height": 128,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 107,
    "y": 131,
    "width": 1076,
    "height": 128,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1005,
    "y": 152,
    "width": 158,
    "height": 85
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 206,
    "y": 237,
    "width": 10,
    "height": 53
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 206,
    "y": 375,
    "width": 10,
    "height": 53
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 398,
    "y": 375,
    "width": 10,
    "height": 45
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 591,
    "y": 383,
    "width": 10,
    "height": 45
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 591,
    "y": 512,
    "width": 10,
    "height": 53
  },
  {
    "id": "sp-45",
    "x": 928,
    "y": 290,
    "width": 185,
    "height": 90
  },
  {
    "id": "sp-46",
    "x": 862,
    "y": 242,
    "width": 243,
    "height": 365
  },
  {
    "id": "sp-47",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 783,
    "y": 512,
    "width": 10,
    "height": 45
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 63,
    "y": 543,
    "width": 44,
    "height": 128,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 512,
    "y": 565,
    "width": 158,
    "height": 85,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 704,
    "y": 557,
    "width": 158,
    "height": 101,
    "fillColor": "#ffb900",
    "pathD": "M 79 0 L 158 51 L 79 101 L 0 51 Z"
  },
  {
    "id": "sp-48",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 670,
    "y": 607,
    "width": 34,
    "height": 10
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 3,
    "x": 43,
    "y": 596,
    "width": 83,
    "height": 23,
    "text": "CONTROL",
    "textColor": "#ffffff",
    "textSize": 11
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 3,
    "x": 524,
    "y": 592,
    "width": 133,
    "height": 30,
    "text": "Order entered",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 4,
    "x": 739,
    "y": 592,
    "width": 89,
    "height": 30,
    "text": "In stock?",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 63,
    "y": 268,
    "width": 44,
    "height": 128,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 127,
    "y": 290,
    "width": 158,
    "height": 85,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 319,
    "y": 290,
    "width": 158,
    "height": 85,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 512,
    "y": 282,
    "width": 158,
    "height": 101,
    "fillColor": "#ff4d38",
    "pathD": "M 79 0 L 158 51 L 79 101 L 0 51 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 704,
    "y": 290,
    "width": 158,
    "height": 85,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-49",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 477,
    "y": 332,
    "width": 34,
    "height": 10
  },
  {
    "id": "sp-50",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 670,
    "y": 332,
    "width": 34,
    "height": 10
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 55,
    "y": 321,
    "width": 59,
    "height": 23,
    "text": "SALES",
    "textColor": "#ffffff",
    "textSize": 11
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 140,
    "y": 307,
    "width": 133,
    "height": 50,
    "text": "Order completed",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 332,
    "y": 307,
    "width": 133,
    "height": 50,
    "text": "Credit problem addressed",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 0,
    "x": 717,
    "y": 317,
    "width": 133,
    "height": 30,
    "text": "Order Stopped",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 546,
    "y": 317,
    "width": 89,
    "height": 30,
    "text": "OK?",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 63,
    "y": 406,
    "width": 44,
    "height": 128,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 127,
    "y": 427,
    "width": 158,
    "height": 85,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 896,
    "y": 427,
    "width": 158,
    "height": 85,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 319,
    "y": 419,
    "width": 158,
    "height": 101,
    "fillColor": "#52c49c",
    "pathD": "M 79 0 L 158 51 L 79 101 L 0 51 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 512,
    "y": 427,
    "width": 158,
    "height": 85,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 704,
    "y": 427,
    "width": 158,
    "height": 85,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-51",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 285,
    "y": 470,
    "width": 34,
    "height": 10
  },
  {
    "id": "sp-52",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 477,
    "y": 470,
    "width": 34,
    "height": 10
  },
  {
    "id": "sp-53",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 670,
    "y": 470,
    "width": 50,
    "height": 10
  },
  {
    "id": "sp-54",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 846,
    "y": 470,
    "width": 50,
    "height": 10
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 1,
    "x": 52,
    "y": 458,
    "width": 65,
    "height": 23,
    "text": "CREDIT",
    "textColor": "#ffffff",
    "textSize": 11
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 1,
    "x": 140,
    "y": 455,
    "width": 133,
    "height": 30,
    "text": "Order received",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 4,
    "x": 524,
    "y": 445,
    "width": 133,
    "height": 50,
    "text": "Invoice prepared",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 2,
    "x": 909,
    "y": 455,
    "width": 133,
    "height": 30,
    "text": "Invoice sent",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-31",
    "x": 733,
    "y": 435,
    "width": 101,
    "height": 70,
    "text": "Check if order shipped",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 2,
    "x": 354,
    "y": 455,
    "width": 89,
    "height": 30,
    "text": "OK?",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 63,
    "y": 131,
    "width": 44,
    "height": 128
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 127,
    "y": 152,
    "width": 158,
    "height": 85
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 0,
    "x": 38,
    "y": 183,
    "width": 95,
    "height": 23,
    "text": "CUSTOMER",
    "textColor": "#ffffff",
    "textSize": 11
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 0,
    "x": 140,
    "y": 170,
    "width": 133,
    "height": 50,
    "text": "Order generated",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 1,
    "x": 1018,
    "y": 169,
    "width": 133,
    "height": 50,
    "text": "Process Payment",
    "textColor": "#ffffff",
    "textSize": 12.5
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

export function Imported2025migsopcubedcreativeandexampletemplates102Template({ data }: { data: BrainData }): ReactElement {
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
