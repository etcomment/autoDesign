import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const MARGIN_X = 60

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, Rect>): Rect {
  const s = pos[id]
  const l = layout.get(id)
  if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
  return s ? { x: s.x, y: s.y, width: s.width || l.width, height: s.height || l.height } : l
}

export function Roadmap8Template({ data }: { data: RoadmapData }): ReactElement {
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
  const N = milestones.length

  const layoutMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('main-title', { x: MARGIN_X, y: 60, width: 400, height: 40 })
    m.set('title-underline', { x: MARGIN_X, y: 120, width: 80, height: 8 })

    const availableW = W - MARGIN_X * 2
    const colW = N > 0 ? availableW / N : availableW
    
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + colW * i + colW / 2
      const boxW = Math.min(180, colW * 0.85)
      const boxH = 90
      
      m.set(`year-${i}`, { x: cx - 60, y: 185, width: 120, height: 30 })
      m.set(`card-${i}`, { x: cx - boxW / 2, y: 250, width: boxW, height: boxH })
      m.set(`desc-${i}`, { x: cx - boxW / 2, y: 370, width: boxW, height: 80 })
      if (i < N - 1) {
        m.set(`arrow-${i}`, { x: MARGIN_X + colW * (i + 1) - 10, y: 190, width: 16, height: 16 })
      }
    })
    return m
  }, [milestones, N])

  useEffect(() => {
    for (const id of layoutMap.keys()) {
      if (pos[id]) continue
      const r = getRect(id, pos, layoutMap)
      moveEl(id, { x: r.x, y: r.y })
      resizeEl(id, { width: r.width, height: r.height })
    }
  }, [layoutMap, pos, moveEl, resizeEl])

  const rects = new Map<string, Rect>()
  for (const id of layoutMap.keys()) {
    rects.set(id, getRect(id, pos, layoutMap))
  }

  return (
    <g ref={svgRef}>
      {(() => {
        const id = 'main-title'
        const r = rects.get(id)
        if (!r || !title) return null
        const fill = tplColors[id] ?? '#2c3e50'
        const stroke = tplStrokeColors[id]
        const sW = tplStrokeWidths[id] ?? 1
        return (
          <g onMouseDown={e => startDrag(e, id, r)} style={{ cursor: 'pointer' }}>
            {title.split('\n').map((line, i) => (
              <text key={i} x={r.x} y={r.y + 32 + i * 36} fontFamily="Arial, sans-serif" fontSize={42} fontWeight={700} fill={fill} stroke={stroke} strokeWidth={stroke ? sW : undefined}>
                {line}
              </text>
            ))}
            {selectedIds.has(id) && renderHandles(r, id)}
          </g>
        )
      })()}

      {(() => {
        const id = 'title-underline'
        const r = rects.get(id)
        if (!r) return null
        const fill = tplColors[id] ?? '#2c3e50'
        return (
          <g onMouseDown={e => startDrag(e, id, r)} style={{ cursor: 'pointer' }}>
            <rect x={r.x} y={r.y} width={r.width} height={r.height} fill={fill} />
            {selectedIds.has(id) && renderHandles(r, id)}
          </g>
        )
      })()}

      {milestones.map((ms, i) => {
        const yid = `year-${i}`
        const cid = `card-${i}`
        const did = `desc-${i}`
        const aid = `arrow-${i}`
        
        const yr = rects.get(yid)!
        const cr = rects.get(cid)!
        const dr = rects.get(did)!
        const ar = rects.get(aid)

        const color = tplColors[cid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSelCard = selectedIds.has(cid)
        const isSelYear = selectedIds.has(yid)
        const isSelDesc = selectedIds.has(did)
        const isSelArr = ar && selectedIds.has(aid)

        const styleFontSize = ms.style?.fontSize ?? 20
        const styleFontWeight = ms.style?.fontWeight ?? 700
        const styleFontColor = ms.style?.fontColor ?? 'white'

        return (
          <g key={i}>
            {ar && (
              <g onMouseDown={e => startDrag(e, aid, ar)} style={{ cursor: 'pointer' }}>
                <polygon points={`${ar.x},${ar.y} ${ar.x + ar.width},${ar.y + ar.height/2} ${ar.x},${ar.y + ar.height}`} fill={tplColors[aid] ?? '#dcdcdc'} />
                {isSelArr && renderHandles(ar, aid)}
              </g>
            )}

            <g onMouseDown={e => startDrag(e, yid, yr)} style={{ cursor: 'pointer' }}>
              <text x={yr.x + yr.width/2} y={yr.y + 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={36} fontWeight={700} fill={tplColors[yid] ?? '#2c3e50'}>
                {(ms as any).date || (2019 + i).toString()}
              </text>
              {isSelYear && renderHandles(yr, yid)}
            </g>

            <g onMouseDown={e => startDrag(e, cid, cr)} style={{ cursor: 'pointer' }}>
              <rect x={cr.x} y={cr.y} width={cr.width} height={cr.height} fill={color} stroke={tplStrokeColors[cid] || (isSelCard ? '#4a90d9' : undefined)} strokeWidth={isSelCard ? 2 : (tplStrokeWidths[cid] ?? 0)} />
              <text x={cr.x + cr.width / 2} y={cr.y + cr.height / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>
                {ms.title}
              </text>
              {isSelCard && renderHandles(cr, cid)}
            </g>

            <g onMouseDown={e => startDrag(e, did, dr)} style={{ cursor: 'pointer' }}>
              <text x={dr.x + dr.width/2} y={dr.y + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fill={tplColors[did] ?? '#555'}>
                {ms.subtitle ? ms.subtitle.split('\n').map((l, j) => (
                  <tspan x={dr.x + dr.width/2} dy={j === 0 ? 0 : 20} key={j}>{l}</tspan>
                )) : (
                  <>
                    <tspan x={dr.x + dr.width/2} dy="0">MIGSO-PCUBED</tspan>
                    <tspan x={dr.x + dr.width/2} dy="20">content and words to be</tspan>
                    <tspan x={dr.x + dr.width/2} dy="20">added here as required</tspan>
                  </>
                )}
              </text>
              {isSelDesc && renderHandles(dr, did)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
