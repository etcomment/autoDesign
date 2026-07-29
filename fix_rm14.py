import re

with open('src/templates/components/Roadmap14Template.tsx', 'r') as f:
    content = f.read()

old_layoutmap = """  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`item-${i}`, { cx })
    })
    return m
  }, [milestones, availableW])"""

new_layoutmap = """  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`item-${i}`, { cx })
      if (i < N - 1) m.set(`arc-${i}`, { cx })
    })
    return m
  }, [milestones, availableW, N])"""

content = content.replace(old_layoutmap, new_layoutmap)


old_getrect = """function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('item-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || ARROW_W, height: s.height || (ARROW_H1 + ARROW_H2) }
    return { x: l.cx - ARROW_W / 2, y: TOP_Y, width: ARROW_W, height: ARROW_H1 + ARROW_H2 }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}"""

new_getrect = """function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('arc-')) {
    const l = layout.get(id.replace('arc-', 'item-'))
    const nl = layout.get(`item-${parseInt(id.split('-')[1]) + 1}`)
    if (!l || !nl) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return s
    const startX = l.cx + 30
    const endX = nl.cx - 30
    return { x: startX, y: TOP_Y - 50, width: endX - startX, height: 30 }
  }
  if (id.startsWith('item-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || ARROW_W, height: s.height || (ARROW_H1 + ARROW_H2) }
    return { x: l.cx - ARROW_W / 2, y: TOP_Y, width: ARROW_W, height: ARROW_H1 + ARROW_H2 }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}"""

content = content.replace(old_getrect, new_getrect)


old_arc = """            {nextLayout && (
              <path 
                d={`M ${cx + 30} ${r.y - 20} Q ${cx + (nextLayout.cx - cx) / 2} ${r.y - 50} ${nextLayout.cx - 30} ${r.y - 20}`} 
                fill="none" stroke="#e0e0e0" strokeWidth={3} markerEnd="url(#arrowhead)" 
              />
            )}"""

new_arc = """            {(() => {
              if (i >= N - 1) return null;
              const aid = `arc-${i}`
              const ar = rects.get(aid)!
              return (
                <g onMouseDown={e => startDrag(e, aid, ar)} style={{ cursor: 'pointer' }}>
                  <path 
                    d={`M ${ar.x} ${ar.y + ar.height} Q ${ar.x + ar.width/2} ${ar.y} ${ar.x + ar.width} ${ar.y + ar.height}`} 
                    fill="none" stroke={tplColors[aid] || tplStrokeColors[aid] || "#e0e0e0"} strokeWidth={tplStrokeWidths[aid] || 3} markerEnd="url(#arrowhead)" 
                  />
                  {selectedIds.has(aid) && renderHandles(ar, aid)}
                </g>
              )
            })()}"""

content = content.replace(old_arc, new_arc)

with open('src/templates/components/Roadmap14Template.tsx', 'w') as f:
    f.write(content)

print("Updated Roadmap14Template")
