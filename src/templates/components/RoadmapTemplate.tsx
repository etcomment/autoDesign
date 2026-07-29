import { TITLE_COLOR } from '../../lib/theme'
import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const W = 1000

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

// Colors from page 136:
// Road path: #dedede / #e3e3e3 with white dashed line
// Titles & Boxes:
// Dark Blue: #23255a
// Medium Blue: #2d62ed
// Orange/Red: #ff4a2b
// Teal/Green: #4cbfa0
// Yellow/Gold: #ffbe00

export function RoadmapTemplate({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones } = data

  const ms1 = milestones[0] || { title: 'Milestone 01', subtitle: 'Content and description to be added here as required' }
  const ms2 = milestones[1] || { title: 'Milestone 02', subtitle: 'Content and description to be added here as required' }
  const ms3 = milestones[2] || { title: 'Milestone 03', subtitle: 'Content and description to be added here as required' }

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('main-title', { x: 45, y: 40, width: 350, height: 60 })
    map.set('road-path', { x: 300, y: 220, width: 400, height: 440 })
    
    // Milestone 01 (Dark Blue box top right)
    map.set('card-0', { x: 680, y: 150, width: 215, height: 220 })
    // Milestone 02 (Blue box top left)
    map.set('card-1', { x: 100, y: 260, width: 215, height: 220 })
    // Milestone 03 (Red box bottom right)
    map.set('card-2', { x: 680, y: 665, width: 215, height: 220 })

    // Green arrow banner top (pointing right/left at top road)
    map.set('banner-0', { x: 560, y: 195, width: 115, height: 70 })
    // Green arrow banner bottom
    map.set('banner-1', { x: 560, y: 705, width: 115, height: 70 })

    // Yellow circles along the road
    map.set('circle-0', { x: 370, y: 335, width: 66, height: 66 })
    map.set('circle-1', { x: 475, y: 505, width: 66, height: 66 })

    return map
  }, [])

  useEffect(() => {
    for (const [id, rect] of defaultPositions.entries()) {
      if (!pos[id]) {
        moveEl(id, { x: rect.x, y: rect.y })
        resizeEl(id, { width: rect.width, height: rect.height })
      }
    }
  }, [defaultPositions, pos, moveEl, resizeEl])

  const getR = (id: string): Rect => {
    const p = pos[id]
    const d = defaultPositions.get(id) || { x: 0, y: 0, width: 100, height: 50 }
    return {
      x: p?.x ?? d.x,
      y: p?.y ?? d.y,
      width: p?.width || d.width,
      height: p?.height || d.height,
    }
  }

  // Draw S-curved winding road according to exact layout in PDF 136
  // Top horizontal lane ~ y=270, Middle ~ y=440, Bottom ~ y=610
  // Left curve around x=350, Right curve around x=650
  const roadD = "M 680 270 L 400 270 A 85 85 0 0 0 400 440 L 600 440 A 85 85 0 0 1 600 610 L 680 610"

  const titleR = getR('main-title')
  const card0R = getR('card-0')
  const card1R = getR('card-1')
  const card2R = getR('card-2')
  const banner0R = getR('banner-0')
  const banner1R = getR('banner-1')
  const circ0R = getR('circle-0')
  const circ1R = getR('circle-1')
  const roadPathR = getR('road-path')

  return (
    <g ref={svgRef}>
      {/* S-shaped Road Vector */}
      <g onMouseDown={e => startDrag(e, 'road-path', roadPathR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${roadPathR.x - 300}, ${roadPathR.y - 220}) scale(${roadPathR.width / 400}, ${roadPathR.height / 440})`}>
          {/* Grey outer road */}
          <path
            d={roadD}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth={90}
            strokeLinecap="square"
            strokeLinejoin="round"
          />
          {/* White center dashed line */}
          <path
            d={roadD}
            fill="none"
            stroke="#ffffff"
            strokeWidth={8}
            strokeDasharray="24 16"
            strokeLinecap="butt"
            strokeLinejoin="round"
          />
        </g>
        {selectedIds.has('road-path') && renderHandles(roadPathR, 'road-path')}
      </g>

      {/* Main Title */}
      {title && (
        <g onMouseDown={e => startDrag(e, 'main-title', titleR)} style={{ cursor: 'pointer' }}>
          <text
            x={W / 2}
            y={48}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={22}
            fontWeight={700}
            fill={tplColors['main-title'] || TITLE_COLOR}
          >
            {title}
          </text>
          {selectedIds.has('main-title') && renderHandles(titleR, 'main-title')}
        </g>
      )}

      {/* Green Banner 1 (Top Road) */}
      <g onMouseDown={e => startDrag(e, 'banner-0', banner0R)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${banner0R.x - 560}, ${banner0R.y - 195}) scale(${banner0R.width / 115}, ${banner0R.height / 70})`}>
          {/* Vertical line connecting to road */}
          <line x1={560 + 63} y1={195 + 35} x2={560 + 63} y2={195 + 75} stroke={tplColors['banner-0'] || '#4cbfa0'} strokeWidth={6} />
          {/* Arrow shape */}
          <path
            d={`M ${560 + 25} ${195} L ${560 + 115} ${195} L ${560 + 115} ${195 + 70} L ${560 + 25} ${195 + 70} L ${560} ${195 + 35} Z`}
            fill={tplColors['banner-0'] || '#4cbfa0'}
          />
          <text
            x={560 + 65}
            y={195 + 42}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={15}
            fontWeight="bold"
            fill="#ffffff"
          >
            Your title
          </text>
        </g>
        {selectedIds.has('banner-0') && renderHandles(banner0R, 'banner-0')}
      </g>

      {/* Green Banner 2 (Bottom Road) */}
      <g onMouseDown={e => startDrag(e, 'banner-1', banner1R)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${banner1R.x - 560}, ${banner1R.y - 705}) scale(${banner1R.width / 115}, ${banner1R.height / 70})`}>
          {/* Vertical line connecting to road */}
          <line x1={560 + 56} y1={705 + 35} x2={560 + 56} y2={705 + 105} stroke={tplColors['banner-1'] || '#4cbfa0'} strokeWidth={6} />
          {/* Arrow shape */}
          <path
            d={`M ${560 + 25} ${705} L ${560 + 115} ${705} L ${560 + 115} ${705 + 70} L ${560 + 25} ${705 + 70} L ${560} ${705 + 35} Z`}
            fill={tplColors['banner-1'] || '#4cbfa0'}
          />
          <text
            x={560 + 65}
            y={705 + 42}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={15}
            fontWeight="bold"
            fill="#ffffff"
          >
            Your title
          </text>
        </g>
        {selectedIds.has('banner-1') && renderHandles(banner1R, 'banner-1')}
      </g>

      {/* Yellow Circle 1 (YOUR TITLE) */}
      <g onMouseDown={e => startDrag(e, 'circle-0', circ0R)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${circ0R.x - 370}, ${circ0R.y - 335}) scale(${circ0R.width / 66}, ${circ0R.height / 66})`}>
          <line x1={370 + 33} y1={335 + 33} x2={370 + 33} y2={335 + 115} stroke={tplColors['circle-0'] || '#ffbe00'} strokeWidth={6} />
          <circle cx={370 + 33} cy={335 + 33} r={33} fill={tplColors['circle-0'] || '#ffbe00'} />
          <text x={370 + 33} y={335 + 26} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight="bold" fill="#ffffff">YOUR</text>
          <text x={370 + 33} y={335 + 42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight="bold" fill="#ffffff">TITLE</text>
        </g>
        {selectedIds.has('circle-0') && renderHandles(circ0R, 'circle-0')}
      </g>

      {/* Yellow Circle 2 (YOUR TITLE) */}
      <g onMouseDown={e => startDrag(e, 'circle-1', circ1R)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${circ1R.x - 475}, ${circ1R.y - 505}) scale(${circ1R.width / 66}, ${circ1R.height / 66})`}>
          <line x1={475 + 33} y1={505 + 33} x2={475 + 33} y2={505 + 115} stroke={tplColors['circle-1'] || '#ffbe00'} strokeWidth={6} />
          <circle cx={475 + 33} cy={505 + 33} r={33} fill={tplColors['circle-1'] || '#ffbe00'} />
          <text x={475 + 33} y={505 + 26} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight="bold" fill="#ffffff">YOUR</text>
          <text x={475 + 33} y={505 + 42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight="bold" fill="#ffffff">TITLE</text>
        </g>
        {selectedIds.has('circle-1') && renderHandles(circ1R, 'circle-1')}
      </g>

      {/* Milestone 01 Box (Dark Blue) */}
      <g onMouseDown={e => startDrag(e, 'card-0', card0R)} style={{ cursor: 'pointer' }}>
        <rect
          x={card0R.x}
          y={card0R.y}
          width={card0R.width}
          height={card0R.height}
          fill={tplColors['card-0'] || '#23255a'}
          stroke={tplStrokeColors['card-0']}
          strokeWidth={tplStrokeWidths['card-0']}
        />
        <text
          x={card0R.x + card0R.width / 2}
          y={card0R.y + 50}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={20}
          fontWeight="bold"
          fill="#ffffff"
        >
          {ms1.title}
        </text>
        {ms1.subtitle && ms1.subtitle.split('\n').map((line, idx) => (
          <text
            key={idx}
            x={card0R.x + card0R.width / 2}
            y={card0R.y + 95 + idx * 24}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={14}
            fill="#ffffff"
            opacity={0.9}
          >
            {line}
          </text>
        ))}
        {selectedIds.has('card-0') && renderHandles(card0R, 'card-0')}
      </g>

      {/* Milestone 02 Box (Blue) */}
      <g onMouseDown={e => startDrag(e, 'card-1', card1R)} style={{ cursor: 'pointer' }}>
        <rect
          x={card1R.x}
          y={card1R.y}
          width={card1R.width}
          height={card1R.height}
          fill={tplColors['card-1'] || '#2d62ed'}
          stroke={tplStrokeColors['card-1']}
          strokeWidth={tplStrokeWidths['card-1']}
        />
        <text
          x={card1R.x + card1R.width / 2}
          y={card1R.y + 50}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={20}
          fontWeight="bold"
          fill="#ffffff"
        >
          {ms2.title}
        </text>
        {ms2.subtitle && ms2.subtitle.split('\n').map((line, idx) => (
          <text
            key={idx}
            x={card1R.x + card1R.width / 2}
            y={card1R.y + 95 + idx * 24}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={14}
            fill="#ffffff"
            opacity={0.9}
          >
            {line}
          </text>
        ))}
        {selectedIds.has('card-1') && renderHandles(card1R, 'card-1')}
      </g>

      {/* Milestone 03 Box (Red/Orange) */}
      <g onMouseDown={e => startDrag(e, 'card-2', card2R)} style={{ cursor: 'pointer' }}>
        <rect
          x={card2R.x}
          y={card2R.y}
          width={card2R.width}
          height={card2R.height}
          fill={tplColors['card-2'] || '#ff4a2b'}
          stroke={tplStrokeColors['card-2']}
          strokeWidth={tplStrokeWidths['card-2']}
        />
        <text
          x={card2R.x + card2R.width / 2}
          y={card2R.y + 50}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={20}
          fontWeight="bold"
          fill="#ffffff"
        >
          {ms3.title}
        </text>
        {ms3.subtitle && ms3.subtitle.split('\n').map((line, idx) => (
          <text
            key={idx}
            x={card2R.x + card2R.width / 2}
            y={card2R.y + 95 + idx * 24}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={14}
            fill="#ffffff"
            opacity={0.9}
          >
            {line}
          </text>
        ))}
        {selectedIds.has('card-2') && renderHandles(card2R, 'card-2')}
      </g>
    </g>
  )
}

