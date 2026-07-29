import re

with open('src/templates/components/Roadmap13Template.tsx', 'r') as f:
    content = f.read()

old_layoutmap = """  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number; cy: number; by: number; isTop: boolean }>()
    const startX = N === 1 ? 500 : 150
    const dx = N > 1 ? 700 / (N - 1) : 0
    milestones.forEach((_, i) => {
      const isTop = i % 2 === 0
      const cx = startX + i * dx
      const cy = 300
      const by = isTop ? cy - 80 : cy + 80
      m.set(`bubble-${i}`, { cx, cy, by, isTop })
      m.set(`week-${i}`, { cx, cy, by, isTop })
    })
    return m
  }, [milestones, N])"""

new_layoutmap = """  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number; cy: number; by: number; isTop: boolean }>()
    m.set('timeline', { cx: 50, cy: 300, by: 0, isTop: false })
    const startX = N === 1 ? 500 : 150
    const dx = N > 1 ? 700 / (N - 1) : 0
    milestones.forEach((_, i) => {
      const isTop = i % 2 === 0
      const cx = startX + i * dx
      const cy = 300
      const by = isTop ? cy - 80 : cy + 80
      m.set(`bubble-${i}`, { cx, cy, by, isTop })
      m.set(`week-${i}`, { cx, cy, by, isTop })
      m.set(`node-${i}`, { cx, cy, by, isTop })
    })
    return m
  }, [milestones, N])"""

content = content.replace(old_layoutmap, new_layoutmap)

old_getrect = """function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, any>): Rect {
  const s = pos[id]
  const l = layout.get(id)
  if (id.startsWith('bubble-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 80, height: s.height || 80 }
    return { x: l.cx - 40, y: l.by - 40, width: 80, height: 80 }
  }
  if (id.startsWith('week-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 120, height: s.height || 50 }
    return { x: l.cx - 60, y: l.isTop ? l.cy + 20 : l.cy - 70, width: 120, height: 50 }
  }
  return s || { x: 0, y: 0, width: 0, height: 0 }
}"""

new_getrect = """function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, any>): Rect {
  const s = pos[id]
  const l = layout.get(id)
  if (id === 'timeline') {
    if (s) return s
    return { x: 50, y: 298, width: 900, height: 4 }
  }
  if (id.startsWith('node-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 14, height: s.height || 14 }
    return { x: l.cx - 7, y: l.cy - 7, width: 14, height: 14 }
  }
  if (id.startsWith('bubble-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 80, height: s.height || 80 }
    return { x: l.cx - 40, y: l.by - 40, width: 80, height: 80 }
  }
  if (id.startsWith('week-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 120, height: s.height || 50 }
    return { x: l.cx - 60, y: l.isTop ? l.cy + 20 : l.cy - 70, width: 120, height: 50 }
  }
  return s || { x: 0, y: 0, width: 0, height: 0 }
}"""

content = content.replace(old_getrect, new_getrect)

old_render_timeline = """      <line x1={50} y1={300} x2={950} y2={300} stroke="#dcdcdc" strokeWidth={4} />"""

new_render_timeline = """      {(() => {
        const tr = rects.get('timeline')!
        return (
          <g onMouseDown={e => startDrag(e, 'timeline', tr)} style={{ cursor: 'pointer' }}>
            <line x1={tr.x} y1={tr.y + tr.height/2} x2={tr.x + tr.width} y2={tr.y + tr.height/2} stroke={tplColors['timeline'] || "#dcdcdc"} strokeWidth={tr.height} />
            {selectedIds.has('timeline') && renderHandles(tr, 'timeline')}
          </g>
        )
      })()}"""

content = content.replace(old_render_timeline, new_render_timeline)

old_node = """            <circle cx={l.cx} cy={l.cy} r={7} fill="#dcdcdc" />"""

new_node = """            {(() => {
              const nid = `node-${i}`
              const nr = rects.get(nid)!
              return (
                <g onMouseDown={e => startDrag(e, nid, nr)} style={{ cursor: 'pointer' }}>
                  <circle cx={nr.x + nr.width/2} cy={nr.y + nr.height/2} r={Math.min(nr.width, nr.height)/2} fill={tplColors[nid] || "#dcdcdc"} />
                  {selectedIds.has(nid) && renderHandles(nr, nid)}
                </g>
              )
            })()}"""

content = content.replace(old_node, new_node)

with open('src/templates/components/Roadmap13Template.tsx', 'w') as f:
    f.write(content)

print("Updated Roadmap13Template")
