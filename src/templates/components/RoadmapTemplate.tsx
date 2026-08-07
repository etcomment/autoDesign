import { TITLE_COLOR, MIGSO_PALETTE } from '../../lib/theme'
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

  const { title, milestones = [], startLabel = 'START', finishLabel = 'FINISH' } = data
  const N = milestones.length

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('pos-m16-title', { x: 50, y: 30, width: 350, height: 60 })
    
    // Original road geometry unchanged
    map.set('pos-m16-path', { x: 150, y: 140, width: 850, height: 438 })

    // Green Banners shifted 2px further upwards (y=130 and y=423)
    map.set('pos-m16-banner-start', { x: 765, y: 130, width: 110, height: 40 })
    map.set('pos-m16-banner-finish', { x: 765, y: 423, width: 110, height: 40 })
    
    milestones.forEach((_, idx) => {
      if (idx === 0) {
        // Milestone 1: x=895, centered vertically on top track
        map.set('pos-m16-card-0', { x: 895, y: 135, width: 250, height: 95 })
      } else if (idx === 1) {
        // Milestone 2: Right edge (x=229) touches centerline of Left Curve 1
        map.set('pos-m16-card-1', { x: 9, y: 180, width: 220, height: 95 })
        map.set('pos-m16-circle-1', { x: 210, y: 200, width: 55, height: 55 })
      } else if (idx === 2) {
        // Milestone 3: Left edge (x=811) touches centerline of Right Curve 2
        map.set('pos-m16-card-2', { x: 811, y: 280, width: 230, height: 95 })
        map.set('pos-m16-circle-2', { x: 775, y: 300, width: 55, height: 55 })
      } else if (idx === 3 || idx === N - 1) {
        // Milestone 4: x=895, centered vertically on bottom track
        map.set(`pos-m16-card-${idx}`, { x: 895, y: 428, width: 250, height: 95 })
      } else {
        const isRight = idx % 2 === 0
        const yPos = 180 + (idx / Math.max(1, N - 1)) * 280
        map.set(`pos-m16-card-${idx}`, { x: isRight ? 811 : 9, y: yPos, width: 230, height: 95 })
        map.set(`pos-m16-circle-${idx}`, { x: isRight ? 775 : 210, y: yPos + 20, width: 55, height: 55 })
      }
    })

    return map
  }, [N])

  // Force sync positions to store
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

  // 4 horizontal segments in [0, 1000] x [0, 515] virtual box (unchanged road)
  const roadD = "M 900 50 L 150 50 A 57.5 57.5 0 0 0 150 165 L 720 165 A 57.5 57.5 0 0 1 720 280 L 150 280 A 57.5 57.5 0 0 0 150 395 L 900 395"
  
  const titleR = getR('pos-m16-title')
  const roadPathR = getR('pos-m16-path')

  const startBannerR = getR('pos-m16-banner-start')
  const finishBannerR = getR('pos-m16-banner-finish')

  const trackYTop = roadPathR.y + roadPathR.height * (50 / 515)
  const trackYBottom = roadPathR.y + roadPathR.height * (395 / 515)

  return (
    <g ref={svgRef}>
      {/* Road path */}
      <g data-element-id="pos-m16-path" onMouseDown={e => startDrag(e, 'pos-m16-path', roadPathR)} transform={getTransform('pos-m16-path', roadPathR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${roadPathR.x}, ${roadPathR.y}) scale(${roadPathR.width / 1000}, ${roadPathR.height / 515})`}>
          <path d={roadD} fill="none" stroke="#D7D7D7" strokeWidth={55} strokeLinecap="round" strokeLinejoin="round" />
          <path d={roadD} fill="none" stroke="#ffffff" strokeWidth={10} strokeDasharray="22 24" strokeLinecap="butt" strokeLinejoin="round" />
        </g>
        {selectedIds.has('pos-m16-path') && renderHandles(roadPathR, 'pos-m16-path')}
      </g>

      {/* Main Title */}
      {title && (
        <g data-element-id="pos-m16-title" onMouseDown={e => startDrag(e, 'pos-m16-title', titleR)} transform={getTransform('pos-m16-title', titleR)} style={{ cursor: 'pointer' }}>
          <text x={titleR.x} y={titleR.y + 40} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={42} fontWeight={700} fill={tplColors['pos-m16-title'] || '#C07D66'}>{title}</text>
          <rect x={titleR.x} y={titleR.y + 55} width={60} height={6} fill={tplColors['pos-m16-title'] || '#23255a'} />
          {selectedIds.has('pos-m16-title') && renderHandles(titleR, 'pos-m16-title')}
        </g>
      )}

      {/* Start Banner (Top Green Banner) */}
      <line x1={startBannerR.x + startBannerR.width / 2} y1={startBannerR.y + startBannerR.height} x2={startBannerR.x + startBannerR.width / 2} y2={trackYTop} stroke={tplColors['pos-m16-banner-start'] || MIGSO_PALETTE[4]} strokeWidth={4} />
      <g data-element-id="pos-m16-banner-start" onMouseDown={e => startDrag(e, 'pos-m16-banner-start', startBannerR)} transform={getTransform('pos-m16-banner-start', startBannerR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${startBannerR.x}, ${startBannerR.y}) scale(${startBannerR.width / 110}, ${startBannerR.height / 40})`}>
          <path d={`M 20 0 L 110 0 L 110 40 L 20 40 L 0 20 Z`} fill={tplColors['pos-m16-banner-start'] || MIGSO_PALETTE[4]} />
          <text x={60} y={25} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight="bold" fill="#ffffff">{startLabel}</text>
        </g>
        {selectedIds.has('pos-m16-banner-start') && renderHandles(startBannerR, 'pos-m16-banner-start')}
      </g>

      {/* Finish Banner (Bottom Green Banner) */}
      <line x1={finishBannerR.x + finishBannerR.width / 2} y1={finishBannerR.y + finishBannerR.height} x2={finishBannerR.x + finishBannerR.width / 2} y2={trackYBottom} stroke={tplColors['pos-m16-banner-finish'] || MIGSO_PALETTE[4]} strokeWidth={4} />
      <g data-element-id="pos-m16-banner-finish" onMouseDown={e => startDrag(e, 'pos-m16-banner-finish', finishBannerR)} transform={getTransform('pos-m16-banner-finish', finishBannerR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${finishBannerR.x}, ${finishBannerR.y}) scale(${finishBannerR.width / 110}, ${finishBannerR.height / 40})`}>
          <path d={`M 20 0 L 110 0 L 110 40 L 20 40 L 0 20 Z`} fill={tplColors['pos-m16-banner-finish'] || MIGSO_PALETTE[4]} />
          <text x={60} y={25} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight="bold" fill="#ffffff">{finishLabel}</text>
        </g>
        {selectedIds.has('pos-m16-banner-finish') && renderHandles(finishBannerR, 'pos-m16-banner-finish')}
      </g>

      {/* Milestones rendering */}
      {milestones.map((ms, idx) => {
        const cardId = `pos-m16-card-${idx}`
        const circleId = `pos-m16-circle-${idx}`
        
        const cardR = getR(cardId)
        const circleR = getR(circleId)

        const hasCircle = defaultPositions.has(circleId)

        const trackYFraction = idx === 0 ? (50 / 515) : idx === N - 1 ? (395 / 515) : ((165 + (idx - 1) * 115) / 515)
        const trackY = roadPathR.y + roadPathR.height * trackYFraction

        return (
          <g key={idx} data-element-id={`pos-m16-ms-${idx}`}>
            {hasCircle && (
              <>
                <line x1={circleR.x + circleR.width / 2} y1={circleR.y + circleR.height / 2} x2={circleR.x + circleR.width / 2} y2={trackY} stroke={tplColors[circleId] || MIGSO_PALETTE[3]} strokeWidth={4} />
                <g data-element-id={circleId} onMouseDown={e => startDrag(e, circleId, circleR)} transform={getTransform(circleId, circleR)} style={{ cursor: 'pointer' }}>
                  <g transform={`translate(${circleR.x}, ${circleR.y}) scale(${circleR.width / 55}, ${circleR.height / 55})`}>
                    <circle cx={27.5} cy={27.5} r={27.5} fill={tplColors[circleId] || MIGSO_PALETTE[3]} />
                    <text x={27.5} y={24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight="bold" fill="#ffffff">YOUR</text>
                    <text x={27.5} y={37} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight="bold" fill="#ffffff">TITLE</text>
                  </g>
                  {selectedIds.has(circleId) && renderHandles(circleR, circleId)}
                </g>
              </>
            )}

            {/* Milestone Card */}
            <g data-element-id={cardId} onMouseDown={e => startDrag(e, cardId, cardR)} transform={getTransform(cardId, cardR)} style={{ cursor: 'pointer' }}>
              <rect x={cardR.x} y={cardR.y} width={cardR.width} height={cardR.height} fill={tplColors[cardId] || MIGSO_PALETTE[idx % MIGSO_PALETTE.length]} stroke={tplStrokeColors[cardId]} strokeWidth={tplStrokeWidths[cardId]} />
              <text x={cardR.x + cardR.width / 2} y={cardR.y + 38} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight="bold" fill="#ffffff">{ms.title}</text>
              {ms.subtitle && ms.subtitle.split('\n').map((line, lIdx) => (
                <text key={lIdx} x={cardR.x + cardR.width / 2} y={cardR.y + 65 + lIdx * 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="#ffffff" opacity={0.9}>{line}</text>
              ))}
              {selectedIds.has(cardId) && renderHandles(cardR, cardId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
