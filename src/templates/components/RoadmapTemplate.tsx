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
    map.set('rdm9-title', { x: 50, y: 40, width: 350, height: 60 })
    map.set('rdm9-path', { x: 150, y: 140, width: 850, height: 438 })

    // Banners: Start (Top Right) & Finish (Bottom Right)
    map.set('rdm9-banner-start', { x: 580, y: 110, width: 110, height: 40 })
    map.set('rdm9-banner-finish', { x: 740, y: 420, width: 110, height: 40 })
    
    milestones.forEach((_, idx) => {
      if (idx === 0) {
        // First milestone: Always top right at the end of top track
        map.set('rdm9-card-0', { x: 720, y: 50, width: 260, height: 110 })
      } else if (idx === N - 1 && N > 1) {
        // Last milestone: Always bottom right at the end of bottom track
        map.set(`rdm9-card-${idx}`, { x: 720, y: 440, width: 260, height: 110 })
      } else {
        // Intermediate milestones
        const isRight = idx % 2 === 0
        const yPos = 180 + (idx / Math.max(1, N - 1)) * 260
        map.set(`rdm9-card-${idx}`, { x: isRight ? 720 : 80, y: yPos, width: 260, height: 110 })
        map.set(`rdm9-circle-${idx}`, { x: isRight ? 460 : 400, y: yPos + 25, width: 60, height: 60 })
      }
    })

    return map
  }, [N])

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

  // 4 horizontal segments in [0, 1000] x [0, 515] virtual box (scaleX = scaleY = 0.85)
  const roadD = "M 900 50 L 150 50 A 57.5 57.5 0 0 0 150 165 L 720 165 A 57.5 57.5 0 0 1 720 280 L 150 280 A 57.5 57.5 0 0 0 150 395 L 900 395"
  
  const titleR = getR('rdm9-title')
  const roadPathR = getR('rdm9-path')

  const startBannerR = getR('rdm9-banner-start')
  const finishBannerR = getR('rdm9-banner-finish')

  const trackYTop = roadPathR.y + roadPathR.height * (50 / 515)
  const trackYBottom = roadPathR.y + roadPathR.height * (395 / 515)

  return (
    <g ref={svgRef}>
      {/* Road path */}
      <g data-element-id="rdm9-path" onMouseDown={e => startDrag(e, 'rdm9-path', roadPathR)} transform={getTransform('rdm9-path', roadPathR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${roadPathR.x}, ${roadPathR.y}) scale(${roadPathR.width / 1000}, ${roadPathR.height / 515})`}>
          <path d={roadD} fill="none" stroke="#D7D7D7" strokeWidth={55} strokeLinecap="round" strokeLinejoin="round" />
          <path d={roadD} fill="none" stroke="#ffffff" strokeWidth={10} strokeDasharray="22 24" strokeLinecap="butt" strokeLinejoin="round" />
        </g>
        {selectedIds.has('rdm9-path') && renderHandles(roadPathR, 'rdm9-path')}
      </g>

      {/* Main Title */}
      {title && (
        <g data-element-id="rdm9-title" onMouseDown={e => startDrag(e, 'rdm9-title', titleR)} transform={getTransform('rdm9-title', titleR)} style={{ cursor: 'pointer' }}>
          <text x={titleR.x} y={titleR.y + 40} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={42} fontWeight={700} fill={tplColors['rdm9-title'] || '#C07D66'}>{title}</text>
          <rect x={titleR.x} y={titleR.y + 55} width={60} height={6} fill={tplColors['rdm9-title'] || '#23255a'} />
          {selectedIds.has('rdm9-title') && renderHandles(titleR, 'rdm9-title')}
        </g>
      )}

      {/* Start Banner (Top Green Banner) */}
      <line x1={startBannerR.x + startBannerR.width / 2} y1={startBannerR.y + startBannerR.height / 2} x2={startBannerR.x + startBannerR.width / 2} y2={trackYTop} stroke={tplColors['rdm9-banner-start'] || MIGSO_PALETTE[4]} strokeWidth={5} />
      <g data-element-id="rdm9-banner-start" onMouseDown={e => startDrag(e, 'rdm9-banner-start', startBannerR)} transform={getTransform('rdm9-banner-start', startBannerR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${startBannerR.x}, ${startBannerR.y}) scale(${startBannerR.width / 110}, ${startBannerR.height / 40})`}>
          <path d={`M 20 0 L 110 0 L 110 40 L 20 40 L 0 20 Z`} fill={tplColors['rdm9-banner-start'] || MIGSO_PALETTE[4]} />
          <text x={60} y={25} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight="bold" fill="#ffffff">{startLabel}</text>
        </g>
        {selectedIds.has('rdm9-banner-start') && renderHandles(startBannerR, 'rdm9-banner-start')}
      </g>

      {/* Finish Banner (Bottom Green Banner near end of bottom segment) */}
      <line x1={finishBannerR.x + finishBannerR.width / 2} y1={finishBannerR.y + finishBannerR.height / 2} x2={finishBannerR.x + finishBannerR.width / 2} y2={trackYBottom} stroke={tplColors['rdm9-banner-finish'] || MIGSO_PALETTE[4]} strokeWidth={5} />
      <g data-element-id="rdm9-banner-finish" onMouseDown={e => startDrag(e, 'rdm9-banner-finish', finishBannerR)} transform={getTransform('rdm9-banner-finish', finishBannerR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${finishBannerR.x}, ${finishBannerR.y}) scale(${finishBannerR.width / 110}, ${finishBannerR.height / 40})`}>
          <path d={`M 20 0 L 110 0 L 110 40 L 20 40 L 0 20 Z`} fill={tplColors['rdm9-banner-finish'] || MIGSO_PALETTE[4]} />
          <text x={60} y={25} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight="bold" fill="#ffffff">{finishLabel}</text>
        </g>
        {selectedIds.has('rdm9-banner-finish') && renderHandles(finishBannerR, 'rdm9-banner-finish')}
      </g>

      {/* Milestones rendering */}
      {milestones.map((ms, idx) => {
        const cardId = `rdm9-card-${idx}`
        const circleId = `rdm9-circle-${idx}`
        
        const cardR = getR(cardId)
        const circleR = getR(circleId)

        const hasCircle = defaultPositions.has(circleId)

        // Calculate track y coordinate for intermediate milestone circles
        const trackYFraction = idx === 0 ? (50 / 515) : idx === N - 1 ? (395 / 515) : ((165 + (idx - 1) * 115) / 515)
        const trackY = roadPathR.y + roadPathR.height * trackYFraction

        return (
          <g key={idx} data-element-id={`rdm9-ms-${idx}`}>
            {hasCircle && (
              <>
                <line x1={circleR.x + circleR.width / 2} y1={circleR.y + circleR.height / 2} x2={circleR.x + circleR.width / 2} y2={trackY} stroke={tplColors[circleId] || MIGSO_PALETTE[3]} strokeWidth={5} />
                <g data-element-id={circleId} onMouseDown={e => startDrag(e, circleId, circleR)} transform={getTransform(circleId, circleR)} style={{ cursor: 'pointer' }}>
                  <g transform={`translate(${circleR.x}, ${circleR.y}) scale(${circleR.width / 60}, ${circleR.height / 60})`}>
                    <circle cx={30} cy={30} r={30} fill={tplColors[circleId] || MIGSO_PALETTE[3]} />
                    <text x={30} y={26} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight="bold" fill="#ffffff">YOUR</text>
                    <text x={30} y={40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight="bold" fill="#ffffff">TITLE</text>
                  </g>
                  {selectedIds.has(circleId) && renderHandles(circleR, circleId)}
                </g>
              </>
            )}

            {/* Milestone Card */}
            <g data-element-id={cardId} onMouseDown={e => startDrag(e, cardId, cardR)} transform={getTransform(cardId, cardR)} style={{ cursor: 'pointer' }}>
              <rect x={cardR.x} y={cardR.y} width={cardR.width} height={cardR.height} fill={tplColors[cardId] || MIGSO_PALETTE[idx % MIGSO_PALETTE.length]} stroke={tplStrokeColors[cardId]} strokeWidth={tplStrokeWidths[cardId]} />
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
