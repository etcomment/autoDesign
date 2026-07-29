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

export function RoadmapTemplate({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones = [] } = data

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('main-title', { x: 45, y: 40, width: 350, height: 60 })
    map.set('road-path', { x: 300, y: 220, width: 400, height: 440 })
    
    milestones.forEach((_, idx) => {
      if (idx === 0) {
        map.set('card-0', { x: 680, y: 150, width: 215, height: 220 })
        map.set('banner-0', { x: 560, y: 195, width: 115, height: 70 })
        map.set('circle-0', { x: 370, y: 335, width: 66, height: 66 })
      } else if (idx === 1) {
        map.set('card-1', { x: 100, y: 260, width: 215, height: 220 })
        map.set('banner-1', { x: 560, y: 705, width: 115, height: 70 }) // Used originally near bottom
        map.set('circle-1', { x: 475, y: 505, width: 66, height: 66 })
      } else if (idx === 2) {
        map.set('card-2', { x: 680, y: 665, width: 215, height: 220 })
      } else {
        // dynamic placement for 4th+ milestone
        const yOffset = 665 + (idx - 2) * 250
        const isRight = idx % 2 === 0
        map.set(`card-${idx}`, { x: isRight ? 680 : 100, y: yOffset, width: 215, height: 220 })
        map.set(`banner-${idx}`, { x: isRight ? 560 : 320, y: yOffset + 40, width: 115, height: 70 })
        map.set(`circle-${idx}`, { x: 475, y: yOffset - 50, width: 66, height: 66 })
      }
    })

    return map
  }, [milestones.length])

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

  const roadD = "M 680 270 L 400 270 A 85 85 0 0 0 400 440 L 600 440 A 85 85 0 0 1 600 610 L 680 610"
  const titleR = getR('main-title')
  const roadPathR = getR('road-path')

  return (
    <g ref={svgRef}>
      <g data-element-id="road-path" onMouseDown={e => startDrag(e, 'road-path', roadPathR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${roadPathR.x - 300}, ${roadPathR.y - 220}) scale(${roadPathR.width / 400}, ${roadPathR.height / 440})`}>
          <path d={roadD} fill="none" stroke="#e0e0e0" strokeWidth={90} strokeLinecap="square" strokeLinejoin="round" />
          <path d={roadD} fill="none" stroke="#ffffff" strokeWidth={8} strokeDasharray="24 16" strokeLinecap="butt" strokeLinejoin="round" />
        </g>
        {selectedIds.has('road-path') && renderHandles(roadPathR, 'road-path')}
      </g>

      {title && (
        <g data-element-id="main-title" onMouseDown={e => startDrag(e, 'main-title', titleR)} style={{ cursor: 'pointer' }}>
          <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill={tplColors['main-title'] || TITLE_COLOR}>{title}</text>
          {selectedIds.has('main-title') && renderHandles(titleR, 'main-title')}
        </g>
      )}

      {milestones.map((ms, idx) => {
        const cardId = `card-${idx}`
        const bannerId = `banner-${idx}`
        const circleId = `circle-${idx}`
        
        const cardR = getR(cardId)
        const bannerR = getR(bannerId)
        const circleR = getR(circleId)

        // Only render banner/circle if they have default positions initialized
        const hasBanner = defaultPositions.has(bannerId)
        const hasCircle = defaultPositions.has(circleId)

        return (
          <g key={idx} data-element-id={`milestone-${idx}`}>
            {hasBanner && (
              <g data-element-id={bannerId} onMouseDown={e => startDrag(e, bannerId, bannerR)} style={{ cursor: 'pointer' }}>
                <g transform={`translate(${bannerR.x - 560}, ${bannerR.y - 195}) scale(${bannerR.width / 115}, ${bannerR.height / 70})`}>
                  <line x1={560 + 63} y1={195 + 35} x2={560 + 63} y2={195 + 75} stroke={tplColors[bannerId] || '#4cbfa0'} strokeWidth={6} />
                  <path d={`M ${560 + 25} ${195} L ${560 + 115} ${195} L ${560 + 115} ${195 + 70} L ${560 + 25} ${195 + 70} L ${560} ${195 + 35} Z`} fill={tplColors[bannerId] || '#4cbfa0'} />
                  <text x={560 + 65} y={195 + 42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight="bold" fill="#ffffff">Your title</text>
                </g>
                {selectedIds.has(bannerId) && renderHandles(bannerR, bannerId)}
              </g>
            )}

            {hasCircle && (
              <g data-element-id={circleId} onMouseDown={e => startDrag(e, circleId, circleR)} style={{ cursor: 'pointer' }}>
                <g transform={`translate(${circleR.x - 370}, ${circleR.y - 335}) scale(${circleR.width / 66}, ${circleR.height / 66})`}>
                  <line x1={370 + 33} y1={335 + 33} x2={370 + 33} y2={335 + 115} stroke={tplColors[circleId] || '#ffbe00'} strokeWidth={6} />
                  <circle cx={370 + 33} cy={335 + 33} r={33} fill={tplColors[circleId] || '#ffbe00'} />
                  <text x={370 + 33} y={335 + 26} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight="bold" fill="#ffffff">YOUR</text>
                  <text x={370 + 33} y={335 + 42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight="bold" fill="#ffffff">TITLE</text>
                </g>
                {selectedIds.has(circleId) && renderHandles(circleR, circleId)}
              </g>
            )}

            <g data-element-id={cardId} onMouseDown={e => startDrag(e, cardId, cardR)} style={{ cursor: 'pointer' }}>
              <rect x={cardR.x} y={cardR.y} width={cardR.width} height={cardR.height} fill={tplColors[cardId] || (idx === 0 ? '#23255a' : idx === 1 ? '#2d62ed' : '#ff4a2b')} stroke={tplStrokeColors[cardId]} strokeWidth={tplStrokeWidths[cardId]} />
              <text x={cardR.x + cardR.width / 2} y={cardR.y + 50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight="bold" fill="#ffffff">{ms.title}</text>
              {ms.subtitle && ms.subtitle.split('\n').map((line, lIdx) => (
                <text key={lIdx} x={cardR.x + cardR.width / 2} y={cardR.y + 95 + lIdx * 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fill="#ffffff" opacity={0.9}>{line}</text>
              ))}
              {selectedIds.has(cardId) && renderHandles(cardR, cardId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}

