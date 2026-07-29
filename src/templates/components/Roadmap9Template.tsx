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

function getChevronPath(x: number, y: number, w: number, h: number, isFirst: boolean, isLast: boolean, arrowW: number) {
  const p1 = `${x},${y}`
  const p2 = `${x + w - (isLast ? 0 : arrowW)},${y}`
  const p3 = isLast ? '' : `L ${x + w} ${y + h / 2}`
  const p4 = `${x + w - (isLast ? 0 : arrowW)},${y + h}`
  const p5 = `${x},${y + h}`
  const p6 = isFirst ? '' : `L ${x + arrowW} ${y + h / 2}`
  
  return `M ${p1} L ${p2} ${p3} L ${p4} L ${p5} ${p6} Z`
}

export function Roadmap9Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
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
      const boxW = colW
      const boxH = 70
      
      m.set(`chevron-${i}`, { x: MARGIN_X + colW * i, y: 220, width: boxW, height: boxH })
      
      const textW = boxW * 0.8
      m.set(`title-${i}`, { x: cx - textW / 2, y: 360, width: textW, height: 30 })
      m.set(`desc-${i}`, { x: cx - textW / 2, y: 400, width: textW, height: 80 })
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
        const chid = `chevron-${i}`
        const tid = `title-${i}`
        const did = `desc-${i}`
        
        const chr = rects.get(chid)!
        const tr = rects.get(tid)!
        const dr = rects.get(did)!

        const color = tplColors[chid] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const isSelCh = selectedIds.has(chid)
        const isSelTitle = selectedIds.has(tid)
        const isSelDesc = selectedIds.has(did)

        const styleFontSize = ms.style?.fontSize ?? 20
        const styleFontWeight = ms.style?.fontWeight ?? 700

        const arrowW = 35
        const path = getChevronPath(chr.x, chr.y, chr.width, chr.height, i === 0, i === N - 1, arrowW)

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, chid, chr)} style={{ cursor: 'pointer' }}>
              <path d={path} fill={color} stroke={tplStrokeColors[chid] || (isSelCh ? '#4a90d9' : 'white')} strokeWidth={isSelCh ? 2 : (tplStrokeWidths[chid] ?? 2)} />
              <text x={chr.x + chr.width / 2 + (i === 0 ? -arrowW/4 : i === N-1 ? arrowW/4 : 0)} y={chr.y + chr.height / 2 + 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={36} fontWeight={700} fill={ms.style?.fontColor ?? 'white'}>
                {(ms as any).date || (2019 + i).toString()}
              </text>
              {isSelCh && renderHandles(chr, chid)}
            </g>

            <g onMouseDown={e => startDrag(e, tid, tr)} style={{ cursor: 'pointer' }}>
              <text x={tr.x + tr.width/2} y={tr.y + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={tplColors[tid] ?? '#2c3e50'}>
                {ms.title}
              </text>
              {isSelTitle && renderHandles(tr, tid)}
            </g>

            <g onMouseDown={e => startDrag(e, did, dr)} style={{ cursor: 'pointer' }}>
              <text x={dr.x + dr.width/2} y={dr.y + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fill={tplColors[did] ?? '#555'}>
                {ms.subtitle ? ms.subtitle.split('\n').map((l, j) => (
                  <tspan x={dr.x + dr.width/2} dy={j === 0 ? 0 : 20} key={j}>{l}</tspan>
                )) : (
                  <>
                    <tspan x={dr.x + dr.width/2} dy="0">MIGSO-PCUBED content and</tspan>
                    <tspan x={dr.x + dr.width/2} dy="20">words to be added here as</tspan>
                    <tspan x={dr.x + dr.width/2} dy="20">required</tspan>
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
