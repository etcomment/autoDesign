import { TITLE_COLOR } from '../../lib/theme'
import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const W = 1200
const H = 700

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
    map.set('main-title', { x: 50, y: 50, width: 350, height: 60 })
    map.set('road-path', { x: 200, y: 150, width: 800, height: 400 })
    
    // Road coordinates logic:
    // Top track: y=200, right to left.
    // Middle track: y=350, left to right.
    // Bottom track: y=500, right to left.
    
    milestones.forEach((_, idx) => {
      if (idx === 0) {
        // Milestone 1 (Top right)
        map.set('card-0', { x: 800, y: 100, width: 260, height: 120 })
        map.set('banner-0', { x: 650, y: 130, width: 100, height: 40 })
      } else if (idx === 1) {
        // Milestone 2 (Middle left)
        map.set('card-1', { x: 150, y: 250, width: 260, height: 120 })
        map.set('circle-1', { x: 450, y: 260, width: 60, height: 60 })
      } else if (idx === 2) {
        // Milestone 3 (Bottom right)
        map.set('card-2', { x: 800, y: 400, width: 260, height: 120 })
        map.set('circle-2', { x: 550, y: 410, width: 60, height: 60 })
        map.set('banner-2', { x: 650, y: 420, width: 100, height: 40 })
      } else {
        // Fallback for extra milestones
        const yOffset = 550 + (idx - 2) * 150
        const isRight = idx % 2 === 0
        map.set(`card-${idx}`, { x: isRight ? 800 : 150, y: yOffset, width: 260, height: 120 })
        map.set(`circle-${idx}`, { x: 450, y: yOffset + 10, width: 60, height: 60 })
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

  // S-shape road path coordinates based on road-path bounding box
  // We map the virtual coordinates [0, 1000] x [0, 400] to the road-path Rect
  const roadD = "M 950 50 L 150 50 A 75 75 0 0 0 150 200 L 850 200 A 75 75 0 0 1 850 350 L 50 350"
  const titleR = getR('main-title')
  const roadPathR = getR('road-path')

  return (
    <g ref={svgRef}>
      <g data-element-id="road-path" onMouseDown={e => startDrag(e, 'road-path', roadPathR)} transform={getTransform('road-path', roadPathR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${roadPathR.x}, ${roadPathR.y}) scale(${roadPathR.width / 1000}, ${roadPathR.height / 400})`}>
          <path d={roadD} fill="none" stroke="#D9D1C6" strokeWidth={100} strokeLinecap="round" strokeLinejoin="round" />
          <path d={roadD} fill="none" stroke="#ffffff" strokeWidth={10} strokeDasharray="30 20" strokeLinecap="butt" strokeLinejoin="round" />
        </g>
        {selectedIds.has('road-path') && renderHandles(roadPathR, 'road-path')}
      </g>

      {title && (
        <g data-element-id="main-title" onMouseDown={e => startDrag(e, 'main-title', titleR)} transform={getTransform('main-title', titleR)} style={{ cursor: 'pointer' }}>
          <text x={titleR.x} y={titleR.y + 40} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={48} fontWeight={700} fill={tplColors['main-title'] || '#C07D66'}>{title}</text>
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

        const hasBanner = defaultPositions.has(bannerId)
        const hasCircle = defaultPositions.has(circleId)

        // Find nearest point on road for the connecting lines
        // Top track: y=150+50=200
        // Middle track: y=150+200=350
        // Bottom track: y=150+350=500
        const trackY = idx === 0 ? 200 : (idx === 1 ? 350 : 500)

        return (
          <g key={idx} data-element-id={`milestone-${idx}`}>
            {hasBanner && (
              <>
                <line x1={bannerR.x + bannerR.width / 2} y1={bannerR.y + bannerR.height} x2={bannerR.x + bannerR.width / 2} y2={trackY} stroke={tplColors[bannerId] || '#68DA6A'} strokeWidth={6} />
                <g data-element-id={bannerId} onMouseDown={e => startDrag(e, bannerId, bannerR)} transform={getTransform(bannerId, bannerR)} style={{ cursor: 'pointer' }}>
                  <g transform={`translate(${bannerR.x}, ${bannerR.y}) scale(${bannerR.width / 100}, ${bannerR.height / 40})`}>
                    <path d={`M 20 0 L 100 0 L 100 40 L 20 40 L 0 20 Z`} fill={tplColors[bannerId] || '#68DA6A'} />
                    <text x={55} y={25} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fill="#ffffff">Your title</text>
                  </g>
                  {selectedIds.has(bannerId) && renderHandles(bannerR, bannerId)}
                </g>
              </>
            )}

            {hasCircle && (
              <>
                <line x1={circleR.x + circleR.width / 2} y1={circleR.y + circleR.height} x2={circleR.x + circleR.width / 2} y2={trackY} stroke={tplColors[circleId] || '#FF9F1D'} strokeWidth={6} />
                <g data-element-id={circleId} onMouseDown={e => startDrag(e, circleId, circleR)} transform={getTransform(circleId, circleR)} style={{ cursor: 'pointer' }}>
                  <g transform={`translate(${circleR.x}, ${circleR.y}) scale(${circleR.width / 60}, ${circleR.height / 60})`}>
                    <circle cx={30} cy={30} r={30} fill={tplColors[circleId] || '#FF9F1D'} />
                    <text x={30} y={26} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight="bold" fill="#ffffff">YOUR</text>
                    <text x={30} y={40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight="bold" fill="#ffffff">TITLE</text>
                  </g>
                  {selectedIds.has(circleId) && renderHandles(circleR, circleId)}
                </g>
              </>
            )}

            <g data-element-id={cardId} onMouseDown={e => startDrag(e, cardId, cardR)} transform={getTransform(cardId, cardR)} style={{ cursor: 'pointer' }}>
              <rect x={cardR.x} y={cardR.y} width={cardR.width} height={cardR.height} fill={tplColors[cardId] || (idx === 0 ? '#282a5d' : idx === 1 ? '#3365cc' : '#ff4d38')} stroke={tplStrokeColors[cardId]} strokeWidth={tplStrokeWidths[cardId]} />
              <text x={cardR.x + cardR.width / 2} y={cardR.y + 40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={24} fontWeight="bold" fill="#ffffff">{ms.title}</text>
              {ms.subtitle && ms.subtitle.split('\n').map((line, lIdx) => (
                <text key={lIdx} x={cardR.x + cardR.width / 2} y={cardR.y + 70 + lIdx * 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fill="#ffffff" opacity={0.9}>{line}</text>
              ))}
              {selectedIds.has(cardId) && renderHandles(cardR, cardId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
