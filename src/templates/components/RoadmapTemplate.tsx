import { MIGSO_PALETTE } from '../../lib/theme'
import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'

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

  const { milestones = [], startLabel = 'START', finishLabel = 'FINISH' } = data
  const N = milestones.length

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    
    // ScaleX == ScaleY = 0.70 to guarantee PERFECT CIRCULAR ARCS with 0 squishing (width: 700, height: 360.5)
    map.set('rdm-v23-path', { x: 100, y: 120, width: 700, height: 360.5 })

    // Green Banners (START & FINISH) 20px left of Milestone 1 card (x = 580)
    map.set('rdm-v23-banner-start', { x: 580, y: 102, width: 100, height: 40 })
    map.set('rdm-v23-banner-finish', { x: 580, y: 343, width: 100, height: 40 })
    
    milestones.forEach((_, idx) => {
      if (idx === 0) {
        // Milestone 1: x=710 (20px overlap on road right end x=730)
        map.set('rdm-v23-card-0', { x: 710, y: 110, width: 210, height: 90 })
      } else if (idx === 1) {
        // Milestone 2: Right edge (x=165) touches centerline of Left Curve 1
        map.set('rdm-v23-card-1', { x: 5, y: 145, width: 160, height: 90 })
        map.set('rdm-v23-circle-1', { x: 210, y: 165, width: 50, height: 50 })
      } else if (idx === 2) {
        // Milestone 3: Left edge (x=644) touches centerline of Right Curve 2
        map.set('rdm-v23-card-2', { x: 644, y: 245, width: 200, height: 90 })
        map.set('rdm-v23-circle-2', { x: 565, y: 265, width: 50, height: 50 })
      } else if (idx === 3 || idx === N - 1) {
        // Milestone 4: x=710 (20px overlap on road right end x=730)
        map.set(`rdm-v23-card-${idx}`, { x: 710, y: 351, width: 210, height: 90 })
      } else {
        const isRight = idx % 2 === 0
        const yPos = 145 + (idx / Math.max(1, N - 1)) * 200
        map.set(`rdm-v23-card-${idx}`, { x: isRight ? 644 : 5, y: yPos, width: 200, height: 90 })
        map.set(`rdm-v23-circle-${idx}`, { x: isRight ? 565 : 210, y: yPos + 20, width: 50, height: 50 })
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

  // 4 horizontal segments in [0, 1000] x [0, 515] virtual box
  const roadD = "M 900 50 L 150 50 A 57.5 57.5 0 0 0 150 165 L 720 165 A 57.5 57.5 0 0 1 720 280 L 150 280 A 57.5 57.5 0 0 0 150 395 L 900 395"
  
  const roadPathR = getR('rdm-v23-path')

  const startBannerR = getR('rdm-v23-banner-start')
  const finishBannerR = getR('rdm-v23-banner-finish')

  const trackYTop = roadPathR.y + roadPathR.height * (50 / 515)
  const trackYBottom = roadPathR.y + roadPathR.height * (395 / 515)

  const halfRoadThickness = (55 * (roadPathR.height / 515)) / 2

  const startMaxChars = Math.max(6, Math.floor(startBannerR.width / 9))
  const startLines = wrapTextByWidth(startLabel || 'START', startMaxChars)

  const finishMaxChars = Math.max(6, Math.floor(finishBannerR.width / 9))
  const finishLines = wrapTextByWidth(finishLabel || 'FINISH', finishMaxChars)

  return (
    <g ref={svgRef}>
      {/* Road path element (scaleX == scaleY preserves perfectly round circular curves) */}
      <g data-element-id="rdm-v23-path" onMouseDown={e => startDrag(e, 'rdm-v23-path', roadPathR)} transform={getTransform('rdm-v23-path', roadPathR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${roadPathR.x}, ${roadPathR.y}) scale(${roadPathR.width / 1000}, ${roadPathR.height / 515})`}>
          <path d={roadD} fill="none" stroke="#D7D7D7" strokeWidth={55} strokeLinecap="round" strokeLinejoin="round" />
          <path d={roadD} fill="none" stroke="#ffffff" strokeWidth={10} strokeDasharray="22 24" strokeLinecap="butt" strokeLinejoin="round" />
        </g>
        {selectedIds.has('rdm-v23-path') && renderHandles(roadPathR, 'rdm-v23-path')}
      </g>

      {/* Start Banner (Top Green Banner) */}
      <line x1={startBannerR.x + startBannerR.width / 2} y1={startBannerR.y + startBannerR.height} x2={startBannerR.x + startBannerR.width / 2} y2={trackYTop + halfRoadThickness} stroke={tplColors['rdm-v23-banner-start'] || MIGSO_PALETTE[4]} strokeWidth={6} />
      <g data-element-id="rdm-v23-banner-start" onMouseDown={e => startDrag(e, 'rdm-v23-banner-start', startBannerR)} transform={getTransform('rdm-v23-banner-start', startBannerR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${startBannerR.x}, ${startBannerR.y}) scale(${startBannerR.width / 100}, ${startBannerR.height / 40})`}>
          <path d={`M 20 0 L 100 0 L 100 40 L 20 40 L 0 20 Z`} fill={tplColors['rdm-v23-banner-start'] || MIGSO_PALETTE[4]} />
          <text x={55} y={25 - (startLines.length - 1) * 7} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight="bold" fill="#ffffff">
            {startLines.map((line, lIdx) => (
              <tspan key={lIdx} x={55} dy={lIdx === 0 ? 0 : 16}>{line}</tspan>
            ))}
          </text>
        </g>
        {selectedIds.has('rdm-v23-banner-start') && renderHandles(startBannerR, 'rdm-v23-banner-start')}
      </g>

      {/* Finish Banner (Bottom Green Banner) */}
      <line x1={finishBannerR.x + finishBannerR.width / 2} y1={finishBannerR.y + finishBannerR.height} x2={finishBannerR.x + finishBannerR.width / 2} y2={trackYBottom + halfRoadThickness} stroke={tplColors['rdm-v23-banner-finish'] || MIGSO_PALETTE[4]} strokeWidth={6} />
      <g data-element-id="rdm-v23-banner-finish" onMouseDown={e => startDrag(e, 'rdm-v23-banner-finish', finishBannerR)} transform={getTransform('rdm-v23-banner-finish', finishBannerR)} style={{ cursor: 'pointer' }}>
        <g transform={`translate(${finishBannerR.x}, ${finishBannerR.y}) scale(${finishBannerR.width / 100}, ${finishBannerR.height / 40})`}>
          <path d={`M 0 0 L 80 0 L 100 20 L 80 40 L 0 40 Z`} fill={tplColors['rdm-v23-banner-finish'] || MIGSO_PALETTE[4]} />
          <text x={45} y={25 - (finishLines.length - 1) * 7} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight="bold" fill="#ffffff">
            {finishLines.map((line, lIdx) => (
              <tspan key={lIdx} x={45} dy={lIdx === 0 ? 0 : 16}>{line}</tspan>
            ))}
          </text>
        </g>
        {selectedIds.has('rdm-v23-banner-finish') && renderHandles(finishBannerR, 'rdm-v23-banner-finish')}
      </g>

      {/* Milestones rendering */}
      {milestones.map((ms, idx) => {
        const cardId = `rdm-v23-card-${idx}`
        const circleId = `rdm-v23-circle-${idx}`
        
        const cardR = getR(cardId)
        const circleR = getR(circleId)

        const hasCircle = defaultPositions.has(circleId)

        const trackYFraction = idx === 0 ? (50 / 515) : idx === N - 1 ? (395 / 515) : ((165 + (idx - 1) * 115) / 515)
        const trackY = roadPathR.y + roadPathR.height * trackYFraction

        const maxTitleChars = Math.max(8, Math.floor(cardR.width / 11))
        const maxSubtitleChars = Math.max(12, Math.floor(cardR.width / 7.5))

        const titleLines = wrapTextByWidth(ms.title || '', maxTitleChars)
        const subtitleLines = ms.subtitle ? wrapTextByWidth(ms.subtitle, maxSubtitleChars) : []

        // Dynamic height calculation based on lines of text
        const titleLineHeight = 22
        const subtitleLineHeight = 16
        const paddingTopBottom = 22
        const titleSubtitleGap = subtitleLines.length > 0 ? 6 : 0

        const neededHeight = paddingTopBottom + titleLines.length * titleLineHeight + titleSubtitleGap + subtitleLines.length * subtitleLineHeight
        const effectiveHeight = Math.max(cardR.height, neededHeight)

        const effectiveCardR: Rect = {
          ...cardR,
          height: effectiveHeight,
        }

        return (
          <g key={idx} data-element-id={`rdm-v23-ms-${idx}`}>
            {hasCircle && (
              <>
                <line x1={circleR.x + circleR.width / 2} y1={circleR.y + circleR.height / 2} x2={circleR.x + circleR.width / 2} y2={trackY + halfRoadThickness} stroke={tplColors[circleId] || MIGSO_PALETTE[3]} strokeWidth={6} />
                <g data-element-id={circleId} onMouseDown={e => startDrag(e, circleId, circleR)} transform={getTransform(circleId, circleR)} style={{ cursor: 'pointer' }}>
                  <g transform={`translate(${circleR.x}, ${circleR.y}) scale(${circleR.width / 50}, ${circleR.height / 50})`}>
                    <circle cx={25} cy={25} r={25} fill={tplColors[circleId] || MIGSO_PALETTE[3]} />
                    <text x={25} y={22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight="bold" fill="#ffffff">YOUR</text>
                    <text x={25} y={34} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight="bold" fill="#ffffff">TITLE</text>
                  </g>
                  {selectedIds.has(circleId) && renderHandles(circleR, circleId)}
                </g>
              </>
            )}

            {/* Milestone Card with Dynamic Height */}
            <g data-element-id={cardId} onMouseDown={e => startDrag(e, cardId, effectiveCardR)} transform={getTransform(cardId, effectiveCardR)} style={{ cursor: 'pointer' }}>
              <rect
                x={effectiveCardR.x}
                y={effectiveCardR.y}
                width={effectiveCardR.width}
                height={effectiveCardR.height}
                fill={tplColors[cardId] || MIGSO_PALETTE[idx % MIGSO_PALETTE.length]}
                stroke={tplStrokeColors[cardId]}
                strokeWidth={tplStrokeWidths[cardId]}
              />
              
              <text
                x={effectiveCardR.x + effectiveCardR.width / 2}
                y={effectiveCardR.y + 22 + 15}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={18}
                fontWeight="bold"
                fill="#ffffff"
              >
                {titleLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={effectiveCardR.x + effectiveCardR.width / 2} dy={lIdx === 0 ? 0 : titleLineHeight}>{line}</tspan>
                ))}
              </text>

              {subtitleLines.length > 0 && (
                <text
                  x={effectiveCardR.x + effectiveCardR.width / 2}
                  y={effectiveCardR.y + 22 + 15 + (titleLines.length - 1) * titleLineHeight + titleSubtitleGap + 12}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fill="#ffffff"
                  opacity={0.9}
                >
                  {subtitleLines.map((line, lIdx) => (
                    <tspan key={lIdx} x={effectiveCardR.x + effectiveCardR.width / 2} dy={lIdx === 0 ? 0 : subtitleLineHeight}>{line}</tspan>
                  ))}
                </text>
              )}

              {selectedIds.has(cardId) && renderHandles(effectiveCardR, cardId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
