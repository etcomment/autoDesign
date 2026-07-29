import re

with open('src/templates/components/Roadmap11Template.tsx', 'r') as f:
    content = f.read()

old_layoutmap = """  const layoutMap = useMemo(() => {
    const m = new Map<string, Rect>()
    const blockW = 800 / N
    milestones.forEach((_, i) => {
      const cx = 100 + i * blockW
      m.set(`block-${i}`, { x: cx, y: LINE_Y, width: blockW, height: BLOCK_H })
      const isTop = i % 2 === 0
      const textY = isTop ? 100 : 380
      m.set(`text-${i}`, { x: cx + blockW/2 - 100, y: textY, width: 200, height: 60 })
    })
    return m
  }, [milestones, N])"""

new_layoutmap = """  const layoutMap = useMemo(() => {
    const m = new Map<string, Rect>()
    const blockW = 800 / N
    milestones.forEach((_, i) => {
      const cx = 100 + i * blockW
      m.set(`block-${i}`, { x: cx, y: LINE_Y, width: blockW, height: BLOCK_H })
      const isTop = i % 2 === 0
      const textY = isTop ? 100 : 380
      m.set(`text-${i}`, { x: cx + blockW/2 - 100, y: textY, width: 200, height: 60 })
      
      const lineY1 = isTop ? LINE_Y : LINE_Y + BLOCK_H
      const lineY2 = isTop ? textY + 60 : textY
      m.set(`conn-${i}`, { 
        x: cx + blockW/2 - 1.5, 
        y: Math.min(lineY1, lineY2), 
        width: 3, 
        height: Math.abs(lineY2 - lineY1) 
      })
    })
    return m
  }, [milestones, N])"""

content = content.replace(old_layoutmap, new_layoutmap)

old_conn = """            {/* Connection Line */}
            <line x1={blockCx} y1={lineY1} x2={textCx} y2={lineY2} stroke="#cccccc" strokeWidth={3} />"""

new_conn = """            {/* Connection Line */}
            {(() => {
              const cid = `conn-${i}`
              const cr = rects.get(cid)!
              return (
                <g onMouseDown={e => startDrag(e, cid, cr)} style={{ cursor: 'pointer' }}>
                  <line 
                    x1={cr.x + cr.width/2} 
                    y1={isTop ? cr.y + cr.height : cr.y} 
                    x2={cr.x + cr.width/2} 
                    y2={isTop ? cr.y : cr.y + cr.height} 
                    stroke={tplColors[cid] || tplStrokeColors[cid] || "#cccccc"} 
                    strokeWidth={tplStrokeWidths[cid] || 3} 
                  />
                  {selectedIds.has(cid) && renderHandles(cr, cid)}
                </g>
              )
            })()}"""

content = content.replace(old_conn, new_conn)

with open('src/templates/components/Roadmap11Template.tsx', 'w') as f:
    f.write(content)

print("Updated Roadmap11Template")
