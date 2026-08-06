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
    "x": 58,
    "y": 150,
    "width": 137,
    "height": 92
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 0,
    "x": 84,
    "y": 167,
    "width": 64,
    "height": 58,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 58,
    "y": 278,
    "width": 137,
    "height": 92,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 2,
    "x": 84,
    "y": 295,
    "width": 64,
    "height": 58,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 58,
    "y": 405,
    "width": 137,
    "height": 92,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 4,
    "x": 84,
    "y": 422,
    "width": 64,
    "height": 58,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 58,
    "y": 532,
    "width": 137,
    "height": 92,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 6,
    "x": 84,
    "y": 549,
    "width": 64,
    "height": 58,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 0,
    "x": 223,
    "y": 149,
    "width": 179,
    "height": 36,
    "text": "Agenda item 01",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 228,
    "y": 190,
    "width": 393,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 2,
    "x": 223,
    "y": 276,
    "width": 179,
    "height": 36,
    "text": "Agenda item 02",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 2,
    "x": 228,
    "y": 317,
    "width": 393,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 4,
    "x": 223,
    "y": 406,
    "width": 179,
    "height": 36,
    "text": "Agenda item 03",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 4,
    "x": 228,
    "y": 444,
    "width": 393,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 6,
    "x": 223,
    "y": 531,
    "width": 179,
    "height": 36,
    "text": "Agenda item 04",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 6,
    "x": 228,
    "y": 572,
    "width": 393,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 673,
    "y": 150,
    "width": 137,
    "height": 92
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 1,
    "x": 699,
    "y": 167,
    "width": 64,
    "height": 58,
    "text": "5",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 673,
    "y": 278,
    "width": 137,
    "height": 92,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 3,
    "x": 699,
    "y": 295,
    "width": 64,
    "height": 58,
    "text": "6",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 673,
    "y": 405,
    "width": 137,
    "height": 92,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 5,
    "x": 699,
    "y": 422,
    "width": 64,
    "height": 58,
    "text": "7",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 673,
    "y": 532,
    "width": 137,
    "height": 92,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 7,
    "x": 699,
    "y": 549,
    "width": 64,
    "height": 58,
    "text": "8",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 1,
    "x": 838,
    "y": 149,
    "width": 179,
    "height": 36,
    "text": "Agenda item 05",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 1,
    "x": 842,
    "y": 190,
    "width": 393,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 3,
    "x": 838,
    "y": 276,
    "width": 179,
    "height": 36,
    "text": "Agenda item 06",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 3,
    "x": 842,
    "y": 317,
    "width": 393,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 5,
    "x": 838,
    "y": 403,
    "width": 179,
    "height": 36,
    "text": "Agenda item 07",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 5,
    "x": 842,
    "y": 444,
    "width": 393,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 7,
    "x": 838,
    "y": 531,
    "width": 179,
    "height": 36,
    "text": "Agenda item 08",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 7,
    "x": 842,
    "y": 572,
    "width": 393,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
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

export function Imported2025migsopcubedcreativeandexampletemplates14Template({ data }: { data: BrainData }): ReactElement {
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
