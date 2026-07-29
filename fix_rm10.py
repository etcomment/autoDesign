import re

with open('src/templates/components/Roadmap10Template.tsx', 'r') as f:
    content = f.read()

# Replace getRect
old_getrect = """function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number, isTop: boolean }>): Rect {
  const s = pos[id]
  if (id.startsWith('block-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const bx = l.cx - BOX_W / 2
    const by = l.isTop ? LINE_Y - 40 - BOX_H : LINE_Y + 40
    if (s) return { ...s, width: s.width || BOX_W, height: s.height || BOX_H }
    return { x: bx, y: by, width: BOX_W, height: BOX_H }
  }
  return s || { x: 0, y: 0, width: 0, height: 0 }
}"""

new_getrect = """function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number, isTop: boolean }>): Rect {
  const s = pos[id]
  if (s) return s
  if (id === 'timeline') return { x: 20, y: LINE_Y - 2, width: W - 40, height: 4 }
  
  const match = id.match(/^(node|conn|arrow|block)-(\d+)$/)
  if (!match) return { x: 0, y: 0, width: 0, height: 0 }
  
  const type = match[1]
  const i = match[2]
  const l = layout.get(`block-${i}`)
  if (!l) return { x: 0, y: 0, width: 0, height: 0 }
  
  const bx = l.cx
  const by = l.isTop ? LINE_Y - 40 - BOX_H : LINE_Y + 40
  const boxCx = bx
  const br = { x: bx - BOX_W / 2, y: by, width: BOX_W, height: BOX_H }

  if (type === 'block') {
    return { x: br.x, y: br.y, width: BOX_W, height: BOX_H }
  }
  
  const lineY1 = l.isTop ? LINE_Y - 6 : LINE_Y + 6
  const arrowY = l.isTop ? br.y + br.height : br.y
  const lineY2 = l.isTop ? arrowY + 8 : arrowY - 8

  if (type === 'node') {
    return { x: boxCx - 8, y: LINE_Y - 8, width: 16, height: 16 }
  }
  if (type === 'conn') {
    return { x: boxCx - 1.5, y: Math.min(lineY1, lineY2), width: 3, height: Math.abs(lineY2 - lineY1) }
  }
  if (type === 'arrow') {
    return { x: boxCx - 6, y: Math.min(arrowY, lineY2), width: 12, height: Math.abs(arrowY - lineY2) }
  }
  return { x: 0, y: 0, width: 0, height: 0 }
}"""

content = content.replace(old_getrect, new_getrect)

old_useeffect = """  useEffect(() => {
    for (const id of [...layoutMap.keys()]) {
      if (pos[id]) continue
      const r = getRect(id, pos, layoutMap)
      moveEl(id, { x: r.x, y: r.y })
      resizeEl(id, { width: r.width, height: r.height })
    }
  }, [layoutMap, greyMap, pos, moveEl, resizeEl])

  const rects = new Map<string, Rect>()
  for (const id of [...layoutMap.keys()]) {
    rects.set(id, getRect(id, pos, layoutMap))
  }"""

new_useeffect = """  useEffect(() => {
    const allIds = ['timeline'];
    for (const id of [...layoutMap.keys()]) {
      allIds.push(id, `node-${id.split('-')[1]}`, `conn-${id.split('-')[1]}`, `arrow-${id.split('-')[1]}`);
    }
    for (const id of allIds) {
      if (pos[id]) continue
      const r = getRect(id, pos, layoutMap)
      moveEl(id, { x: r.x, y: r.y })
      resizeEl(id, { width: r.width, height: r.height })
    }
  }, [layoutMap, greyMap, pos, moveEl, resizeEl])

  const rects = new Map<string, Rect>()
  const allIds = ['timeline'];
  for (const id of [...layoutMap.keys()]) {
    allIds.push(id, `node-${id.split('-')[1]}`, `conn-${id.split('-')[1]}`, `arrow-${id.split('-')[1]}`);
  }
  for (const id of allIds) {
    rects.set(id, getRect(id, pos, layoutMap))
  }"""

content = content.replace(old_useeffect, new_useeffect)

# Render section
old_render_timeline = """      {/* Horizontal timeline line */}
      <line x1={20} y1={LINE_Y} x2={W - 20} y2={LINE_Y} stroke="#e0e0e0" strokeWidth={4} />"""

new_render_timeline = """      {/* Horizontal timeline line */}
      {(() => {
        const tr = rects.get('timeline')!
        return (
          <g onMouseDown={e => startDrag(e, 'timeline', tr)} style={{ cursor: 'pointer' }}>
            <line x1={tr.x} y1={tr.y + tr.height/2} x2={tr.x + tr.width} y2={tr.y + tr.height/2} stroke={tplColors['timeline'] || "#e0e0e0"} strokeWidth={tr.height} />
            {selectedIds.has('timeline') && renderHandles(tr, 'timeline')}
          </g>
        )
      })()}"""

content = content.replace(old_render_timeline, new_render_timeline)

old_connections = """            {/* Timeline connection */}
            <circle cx={boxCx} cy={LINE_Y} r={8} fill="#e0e0e0" />
            <line x1={boxCx} y1={lineY1} x2={boxCx} y2={lineY2} stroke="#e0e0e0" strokeWidth={3} />
            {isTop ? (
              <polygon points={`${boxCx-6},${lineY2} ${boxCx+6},${lineY2} ${boxCx},${arrowY}`} fill="#e0e0e0" />
            ) : (
              <polygon points={`${boxCx-6},${lineY2} ${boxCx+6},${lineY2} ${boxCx},${arrowY}`} fill="#e0e0e0" />
            )}"""

new_connections = """            {/* Timeline connection */}
            {(() => {
              const nid = `node-${i}`
              const nr = rects.get(nid)!
              return (
                <g onMouseDown={e => startDrag(e, nid, nr)} style={{ cursor: 'pointer' }}>
                  <circle cx={nr.x + nr.width/2} cy={nr.y + nr.height/2} r={Math.min(nr.width, nr.height)/2} fill={tplColors[nid] || "#e0e0e0"} />
                  {selectedIds.has(nid) && renderHandles(nr, nid)}
                </g>
              )
            })()}
            {(() => {
              const cid = `conn-${i}`
              const cr = rects.get(cid)!
              return (
                <g onMouseDown={e => startDrag(e, cid, cr)} style={{ cursor: 'pointer' }}>
                  <line x1={cr.x + cr.width/2} y1={cr.y} x2={cr.x + cr.width/2} y2={cr.y + cr.height} stroke={tplColors[cid] || "#e0e0e0"} strokeWidth={cr.width || 3} />
                  {selectedIds.has(cid) && renderHandles(cr, cid)}
                </g>
              )
            })()}
            {(() => {
              const aid = `arrow-${i}`
              const ar = rects.get(aid)!
              return (
                <g onMouseDown={e => startDrag(e, aid, ar)} style={{ cursor: 'pointer' }}>
                  <polygon points={isTop 
                    ? `${ar.x},${ar.y+ar.height} ${ar.x+ar.width},${ar.y+ar.height} ${ar.x+ar.width/2},${ar.y}`
                    : `${ar.x},${ar.y} ${ar.x+ar.width},${ar.y} ${ar.x+ar.width/2},${ar.y+ar.height}`} fill={tplColors[aid] || "#e0e0e0"} />
                  {selectedIds.has(aid) && renderHandles(ar, aid)}
                </g>
              )
            })()}"""

content = content.replace(old_connections, new_connections)

with open('src/templates/components/Roadmap10Template.tsx', 'w') as f:
    f.write(content)

print("Updated Roadmap10Template")
