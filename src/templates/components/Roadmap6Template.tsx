import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

// Roadmap 6: Horizontal chevron ribbon — milestones grouped by quarter/period.
// Each milestone is rendered as a chevron arrow in a continuous ribbon.
// Quarters are labelled above the ribbon.

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const RIBBON_Y = 200       // vertical center of the ribbon
const RIBBON_H = 90        // height of each chevron
const ARROW_TIP = 28       // horizontal depth of the chevron notch/tip
const LABEL_GAP = 16       // gap between ribbon bottom and milestone label
const TEXT_START_Y = RIBBON_Y + RIBBON_H / 2 + LABEL_GAP + 20

interface Rect { x: number; y: number; width: number; height: number }

/** Build chevron polygon points for one milestone cell */
function chevronPoints(x: number, y: number, w: number, h: number, isFirst: boolean, isLast: boolean): string {
  const top = y
  const bot = y + h
  const mid = y + h / 2
  const left = isFirst ? x : x + ARROW_TIP
  const right = isLast ? x + w : x + w

  if (isFirst && isLast) {
    return `${x},${top} ${x + w},${top} ${x + w},${bot} ${x},${bot}`
  }
  if (isFirst) {
    return `${x},${top} ${right},${top} ${right + ARROW_TIP},${mid} ${right},${bot} ${x},${bot}`
  }
  if (isLast) {
    return `${left - ARROW_TIP},${top} ${right},${top} ${right},${bot} ${left - ARROW_TIP},${bot} ${left},${mid}`
  }
  return `${left - ARROW_TIP},${top} ${right},${top} ${right + ARROW_TIP},${mid} ${right},${bot} ${left - ARROW_TIP},${bot} ${left},${mid}`
}

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, Rect>): Rect {
  const s = pos[id]
  const l = layout.get(id)
  if (l) return s ? { ...s, width: s.width || l.width, height: s.height || l.height } : l
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

function wrapText(text: string, maxLen: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const w of words) {
    if ((current + ' ' + w).length > maxLen) {
      if (current) lines.push(current)
      current = w
    } else {
      current = current ? current + ' ' + w : w
    }
  }
  if (current) lines.push(current)
  return lines
}

export function Roadmap6Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { milestones, quarters } = data
  const N = Math.max(1, milestones.length)

  // Determine groups from quarters DSL or split evenly across 3 groups
  const quarterList = quarters && quarters.length > 0 ? quarters : []
  const numGroups = Math.max(1, quarterList.length || 3)

  // Assign each milestone to a group
  const groups = useMemo(() => {
    const grps: number[][] = Array.from({ length: numGroups }, () => [])
    milestones.forEach((_, i) => {
      const grpIdx = Math.min(Math.floor((i / N) * numGroups), numGroups - 1)
      grps[grpIdx]!.push(i)
    })
    return grps
  }, [milestones, N, numGroups])

  // Chevron widths — each milestone gets equal width across total ribbon
  const MARGIN_X = 40
  const totalW = W - MARGIN_X * 2
  const chevronW = totalW / N

  const layoutMap = useMemo(() => {
    const m = new Map<string, Rect>()
    // Group labels above ribbon
    let msOffset = 0
    groups.forEach((indices, gi) => {
      const count = indices.length
      if (count === 0) return
      const x = MARGIN_X + msOffset * chevronW
      const w = count * chevronW
      const labelId = `group-label-${gi}`
      m.set(labelId, { x, y: RIBBON_Y - 50, width: w, height: 28 })
      msOffset += count
    })

    // Each chevron
    milestones.forEach((_, i) => {
      const x = MARGIN_X + i * chevronW
      m.set(`chevron-${i}`, { x, y: RIBBON_Y, width: chevronW, height: RIBBON_H })
      m.set(`chevron-title-${i}`, { x: x + 4, y: TEXT_START_Y, width: chevronW - 8, height: 50 })
      m.set(`chevron-subtitle-${i}`, { x: x + 4, y: TEXT_START_Y + 50, width: chevronW - 8, height: 60 })
    })
    return m
  }, [milestones, groups, chevronW])

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

  // Assign group color (alternating) for each milestone
  const groupColorOf = (i: number): string => {
    let cumCount = 0
    for (let gi = 0; gi < groups.length; gi++) {
      const cnt = groups[gi]!.length
      if (i < cumCount + cnt) {
        return tplColors[`group-label-${gi}`] ?? PALETTE[gi % PALETTE.length]!
      }
      cumCount += cnt
    }
    return PALETTE[i % PALETTE.length]!
  }

  return (
    <g ref={svgRef}>
      {/* Group labels above the ribbon */}
      {groups.map((indices, gi) => {
        if (indices.length === 0) return null
        const labelId = `group-label-${gi}`
        const lr = rects.get(labelId)
        if (!lr) return null
        const color = tplColors[labelId] ?? PALETTE[gi % PALETTE.length]!
        return (
          <g key={`grp-${gi}`} onMouseDown={e => startDrag(e, labelId, lr)} transform={getTransform(labelId, lr)} style={{ cursor: 'pointer' }}>
            <text
              x={lr.x}
              y={lr.y + lr.height - 4}
              textAnchor="start"
              fontFamily="Arial, sans-serif"
              fontSize={20}
              fontWeight={700}
              fill={color}
            >
              {quarterList[gi]?.label ?? `Q${gi + 1}`}
            </text>
            {selectedIds.has(labelId) && renderHandles(lr, labelId)}
          </g>
        )
      })}

      {/* Chevron arrows for each milestone */}
      {milestones.map((ms, i) => {
        const chevId = `chevron-${i}`
        const cr = rects.get(chevId)!
        const titleId = `chevron-title-${i}`
        const subId = `chevron-subtitle-${i}`
        const tr = rects.get(titleId)!
        const sr = rects.get(subId)!

        const isFirst = i === 0
        const isLast = i === N - 1
        const color = tplColors[chevId] ?? ms.style?.fill ?? groupColorOf(i)
        const strokeC = tplStrokeColors[chevId]
        const strokeW = tplStrokeWidths[chevId] ?? 0
        const isSel = selectedIds.has(chevId)

        const points = chevronPoints(cr.x, cr.y, cr.width, cr.height, isFirst, isLast)

        return (
          <g key={i}>
            {/* Chevron shape */}
            <g onMouseDown={e => startDrag(e, chevId, cr)} transform={getTransform(chevId, cr)} style={{ cursor: 'pointer' }}>
              <polygon
                points={points}
                fill={color}
                stroke={strokeC || (isSel ? '#fff' : 'none')}
                strokeWidth={isSel ? 2 : strokeW}
              />
              {isSel && renderHandles(cr, chevId)}
            </g>

            {/* Milestone title below ribbon */}
            <g onMouseDown={e => startDrag(e, titleId, tr)} transform={getTransform(titleId, tr)} style={{ cursor: 'pointer' }}>
              <text
                x={tr.x + tr.width / 2}
                y={tr.y + 16}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={700}
                fill={tplColors[titleId] ?? '#292b3a'}
              >
                {ms.title}
              </text>
              {selectedIds.has(titleId) && renderHandles(tr, titleId)}
            </g>

            {/* Subtitle below title */}
            {ms.subtitle && (
              <g onMouseDown={e => startDrag(e, subId, sr)} transform={getTransform(subId, sr)} style={{ cursor: 'pointer' }}>
                {wrapText(ms.subtitle, 28).map((line, li) => (
                  <text
                    key={li}
                    x={sr.x + sr.width / 2}
                    y={sr.y + 14 + li * 18}
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize={11}
                    fill={tplColors[subId] ?? '#666'}
                  >
                    {line}
                  </text>
                ))}
                {selectedIds.has(subId) && renderHandles(sr, subId)}
              </g>
            )}
          </g>
        )
      })}
    </g>
  )
}
