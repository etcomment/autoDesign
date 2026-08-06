import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "dataNodeIdx": 0,
    "x": 64,
    "y": 133,
    "width": 157,
    "height": 72,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 0,
    "x": 75,
    "y": 154,
    "width": 135,
    "height": 30,
    "text": "Start",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 1027,
    "y": 127,
    "width": 157,
    "height": 85,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 1034,
    "y": 135,
    "width": 144,
    "height": 68,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 64,
    "y": 284,
    "width": 157,
    "height": 85,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 2,
    "x": 71,
    "y": 292,
    "width": 144,
    "height": 68,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 257,
    "y": 284,
    "width": 157,
    "height": 85,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 3,
    "x": 263,
    "y": 292,
    "width": 144,
    "height": 68,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 450,
    "y": 284,
    "width": 157,
    "height": 85,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 4,
    "x": 456,
    "y": 292,
    "width": 144,
    "height": 68,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 642,
    "y": 284,
    "width": 157,
    "height": 85,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 5,
    "x": 649,
    "y": 292,
    "width": 144,
    "height": 68,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 835,
    "y": 274,
    "width": 157,
    "height": 104,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 0,
    "x": 859,
    "y": 311,
    "width": 108,
    "height": 30,
    "text": "Decision 1",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 9,
    "x": 835,
    "y": 593,
    "width": 157,
    "height": 72,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 1,
    "x": 846,
    "y": 618,
    "width": 135,
    "height": 30,
    "text": "End",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 64,
    "y": 451,
    "width": 157,
    "height": 85,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 6,
    "x": 71,
    "y": 460,
    "width": 144,
    "height": 68,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 257,
    "y": 451,
    "width": 157,
    "height": 85,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 7,
    "x": 263,
    "y": 460,
    "width": 144,
    "height": 68,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 450,
    "y": 451,
    "width": 157,
    "height": 85,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 8,
    "x": 456,
    "y": 460,
    "width": 144,
    "height": 68,
    "text": "MIGSO-PCUBED content and words",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 642,
    "y": 441,
    "width": 157,
    "height": 104,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 1,
    "x": 667,
    "y": 478,
    "width": 108,
    "height": 30,
    "text": "Decision 2",
    "textColor": "#ffffff",
    "textSize": 12.5
  },
  {
    "id": "sp-30",
    "x": 143,
    "y": 205,
    "width": 10,
    "height": 79
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 221,
    "y": 326,
    "width": 36,
    "height": 10
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 414,
    "y": 326,
    "width": 36,
    "height": 10
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 606,
    "y": 326,
    "width": 36,
    "height": 10
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 799,
    "y": 326,
    "width": 36,
    "height": 10
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 221,
    "y": 494,
    "width": 36,
    "height": 10
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 414,
    "y": 494,
    "width": 36,
    "height": 10
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 606,
    "y": 493,
    "width": 36,
    "height": 10
  },
  {
    "id": "sp-38",
    "x": 918,
    "y": 165,
    "width": 105,
    "height": 114
  },
  {
    "id": "sp-39",
    "x": 492,
    "y": 29,
    "width": 73,
    "height": 771
  },
  {
    "id": "sp-40",
    "x": 736,
    "y": 530,
    "width": 83,
    "height": 114
  },
  {
    "id": "sp-41",
    "x": 799,
    "y": 211,
    "width": 307,
    "height": 282
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 868,
    "y": 169,
    "width": 42,
    "height": 31,
    "text": "NO",
    "textSize": 16
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 0,
    "x": 853,
    "y": 381,
    "width": 53,
    "height": 31,
    "text": "YES",
    "textSize": 16
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 1,
    "x": 1062,
    "y": 460,
    "width": 42,
    "height": 31,
    "text": "NO",
    "textSize": 16
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 1,
    "x": 725,
    "y": 562,
    "width": 53,
    "height": 31,
    "text": "YES",
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

export function Imported2025migsopcubedcreativeandexampletemplates101Template({ data }: { data: BrainData }): ReactElement {
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
