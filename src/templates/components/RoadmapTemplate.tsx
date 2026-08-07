import { TITLE_COLOR } from '../../lib/theme'
import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

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
    map.set('rdm-title', { x: 50, y: 40, width: 350, height: 60 })
    map.set('rdm2-path', { x: 150, y: 140, width: 850, height: 460 })
    
    milestones.forEach((_, idx) => {
      if (idx === 0) {
        map.set('rdm-card-0', { x: 700, y: 60, width: 280, height: 110 })
        map.set('rdm-banner-0', { x: 540, y: 110, width: 100, height: 40 })
      } else if (idx === 1) {
        map.set('rdm-card-1', { x: 100, y: 180, width: 280, height: 110 })
        map.set('rdm-circle-1', { x: 420, y: 200, width: 60, height: 60 })
      } else if (idx === 2) {
        map.set('rdm-card-2', { x: 700, y: 310, width: 280, height: 110 })
        map.set('rdm-circle-2', { x: 460, y: 320, width: 60, height: 60 })
        map.set('rdm-banner-2', { x: 560, y: 330, width: 100, height: 40 })
      } else if (idx === 3) {
        map.set('rdm-card-3', { x: 100, y: 440, width: 280, height: 110 })
        map.set('rdm-circle-3', { x: 420, y: 450, width: 60, height: 60 })
      } else {
        const yOffset = 570 + (idx - 4) * 150
        const isRight = idx % 2 === 0
        map.set(`rdm-card-${idx}`, { x: isRight ? 700 : 100, y: yOffset, width: 280, height: 110 })
        map.set(`rdm-circle-${idx}`, { x: 420, y: yOffset + 20, width: 60, height: 60 })
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

  // 4 horizontal segments in [0, 1000] x [0, 500] virtual box with significantly larger vertical track spacing
  const roadD = "M 900 40 L 150 40 A 70 70 0 0 0 150 180 L 720 180 A 70 70 0 0 1 720 320 L 150 320 A 70 70 0 0 0 150 460 L 900 460"
  
  const titleR = getR('rdm-title')
  const roadPathR = getR('rdm2-path')

  return (
    <g ref={svgRef}>
      <g data-element-id="rdm2-path" onMouseDown={e => startDrag(e, 'rdm2-path', roadPathR)} transform={getTransform('rdm2-path', roadPathR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${roadPathR.x}, ${roadPathR.y}) scale(${roadPathR.width / 1000}, ${roadPathR.height / 500})`}>
          <path d={roadD} fill="none" stroke="#D7D7D7" strokeWidth={55} strokeLinecap="round" strokeLinejoin="round" />
          <path d={roadD} fill="none" stroke="#ffffff" strokeWidth={10} strokeDasharray="34 24" strokeLinecap="butt" strokeLinejoin="round" />
        </g>
        {selectedIds.has('rdm-path') && renderHandles(roadPathR, 'rdm-path')}
      </g>

      {title && (
        <g data-element-id="rdm-title" onMouseDown={e => startDrag(e, 'rdm-title', titleR)} transform={getTransform('rdm-title', titleR)} style={{ cursor: 'pointer' }}>
          <text x={titleR.x} y={titleR.y + 40} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={42} fontWeight={700} fill={tplColors['rdm-title'] || '#C07D66'}>{title}</text>
          <rect x={titleR.x} y={titleR.y + 55} width={60} height={6} fill={tplColors['rdm-title'] || '#23255a'} />
          {selectedIds.has('rdm-title') && renderHandles(titleR, 'rdm-title')}
        </g>
      )}

      {milestones.map((ms, idx) => {
        const cardId = `rdm-card-${idx}`
        const bannerId = `rdm-banner-${idx}`
        const circleId = `rdm-circle-${idx}`
        
        const cardR = getR(cardId)
        const bannerR = getR(bannerId)
        const circleR = getR(circleId)

        const hasBanner = defaultPositions.has(bannerId)
        const hasCircle = defaultPositions.has(circleId)

        const trackYFraction = idx === 0 ? (40/500) : idx === 1 ? (180/500) : idx === 2 ? (320/500) : (460/500)
        const trackY = roadPathR.y + roadPathR.height * trackYFraction

        return (
          <g key={idx} data-element-id={`rdm-ms-${idx}`}>
            {hasBanner && (
              <>
                <line x1={bannerR.x + bannerR.width / 2} y1={bannerR.y + bannerR.height / 2} x2={bannerR.x + bannerR.width / 2} y2={trackY} stroke={tplColors[bannerId] || '#68DA6A'} strokeWidth={5} />
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
                <line x1={circleR.x + circleR.width / 2} y1={circleR.y + circleR.height / 2} x2={circleR.x + circleR.width / 2} y2={trackY} stroke={tplColors[circleId] || '#FF9F1D'} strokeWidth={5} />
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
              <rect x={cardR.x} y={cardR.y} width={cardR.width} height={cardR.height} fill={tplColors[cardId] || (idx === 0 ? '#23255a' : idx === 1 ? '#2d62ed' : '#ff4a2b')} stroke={tplStrokeColors[cardId]} strokeWidth={tplStrokeWidths[cardId]} />
              <text x={cardR.x + cardR.width / 2} y={cardR.y + 45} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight="bold" fill="#ffffff">{ms.title}</text>
              {ms.subtitle && ms.subtitle.split('\n').map((line, lIdx) => (
                <text key={lIdx} x={cardR.x + cardR.width / 2} y={cardR.y + 75 + lIdx * 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="#ffffff" opacity={0.9}>{line}</text>
              ))}
              {selectedIds.has(cardId) && renderHandles(cardR, cardId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
