import re

with open('src/templates/components/Roadmap12Template.tsx', 'r') as f:
    content = f.read()

old_layoutmap = """  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number; cy: number; isEven: boolean }>()
    milestones.forEach((_, i) => {
      const isEven = i % 2 === 0
      const cx = isEven ? LEFT_X - R : RIGHT_X + R
      const cy = START_Y + i * 2 * R + R
      m.set(`node-${i}`, { cx, cy, isEven })
      m.set(`text-${i}`, { cx, cy, isEven })
    })
    return m
  }, [milestones])"""

new_layoutmap = """  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number; cy: number; isEven: boolean }>()
    m.set('path', { cx: 0, cy: 0, isEven: false })
    milestones.forEach((_, i) => {
      const isEven = i % 2 === 0
      const cx = isEven ? LEFT_X - R : RIGHT_X + R
      const cy = START_Y + i * 2 * R + R
      m.set(`node-${i}`, { cx, cy, isEven })
      m.set(`text-${i}`, { cx, cy, isEven })
    })
    return m
  }, [milestones])"""

content = content.replace(old_layoutmap, new_layoutmap)

old_getrect = """function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, any>): Rect {
  const s = pos[id]
  const l = layout.get(id)
  if (id.startsWith('node-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 70, height: s.height || 70 }
    return { x: l.cx - 35, y: l.cy - 35, width: 70, height: 70 }
  }
  if (id.startsWith('text-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const tw = 250
    const th = 60
    if (s) return { ...s, width: s.width || tw, height: s.height || th }
    return {
      x: l.isEven ? l.cx - 60 - tw : l.cx + 60,
      y: l.cy - th / 2,
      width: tw,
      height: th
    }
  }
  return s || { x: 0, y: 0, width: 0, height: 0 }
}"""

new_getrect = """function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, any>): Rect {
  const s = pos[id]
  const l = layout.get(id)
  if (id === 'path') {
    if (s) return s
    return { x: 0, y: 0, width: W, height: START_Y + 10 * 2 * R } // Approx
  }
  if (id.startsWith('node-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 70, height: s.height || 70 }
    return { x: l.cx - 35, y: l.cy - 35, width: 70, height: 70 }
  }
  if (id.startsWith('text-')) {
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const tw = 250
    const th = 60
    if (s) return { ...s, width: s.width || tw, height: s.height || th }
    return {
      x: l.isEven ? l.cx - 60 - tw : l.cx + 60,
      y: l.cy - th / 2,
      width: tw,
      height: th
    }
  }
  return s || { x: 0, y: 0, width: 0, height: 0 }
}"""

content = content.replace(old_getrect, new_getrect)

old_path = """      {N > 0 && (
        <>
          <path d={pathD} stroke="#e6e6e6" strokeWidth={50} fill="none" />
          <path d={pathD} stroke="white" strokeWidth={8} strokeDasharray="24 16" fill="none" />
        </>
      )}"""

new_path = """      {N > 0 && (() => {
        const pr = rects.get('path')!
        return (
          <g transform={`translate(${pr.x}, ${pr.y})`} onMouseDown={e => startDrag(e, 'path', pr)} style={{ cursor: 'pointer' }}>
            <path d={pathD} stroke="#e6e6e6" strokeWidth={50} fill="none" />
            <path d={pathD} stroke="white" strokeWidth={8} strokeDasharray="24 16" fill="none" />
            {selectedIds.has('path') && renderHandles(pr, 'path')}
          </g>
        )
      })()}"""

content = content.replace(old_path, new_path)

with open('src/templates/components/Roadmap12Template.tsx', 'w') as f:
    f.write(content)

print("Updated Roadmap12Template")
