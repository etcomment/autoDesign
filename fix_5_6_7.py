import re
import sys
import os

def fix_business5():
    path = "src/templates/components/Business5Template.tsx"
    with open(path, "r") as f:
        code = f.read()

    # 1. Add templateElementPositions and tplStroke...
    if "templateElementPositions =" not in code:
        code = code.replace(
            "const tplColors = useTemplateStore(s => s.templateElementColors)",
            "const tplColors = useTemplateStore(s => s.templateElementColors)\n  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)\n  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)\n  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)"
        )
    else:
        # Check if tplStrokeColors exists
        if "tplStrokeColors =" not in code:
            code = code.replace("const tplColors = useTemplateStore(s => s.templateElementColors)", "const tplColors = useTemplateStore(s => s.templateElementColors)\n  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)\n  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)")

    # 2. displayNodes
    code = code.replace("const itemData = data.nodes?.[idx]", "const displayNodes = data.nodes && data.nodes.length > 0 ? data.nodes : DEFAULT_ITEMS\n        const itemData = displayNodes[idx % displayNodes.length]")

    # 3. Colors
    code = code.replace("stroke={isSelected ? '#007acc' : undefined}", "stroke={tplStrokeColors[elementId] || (isSelected ? '#007acc' : 'none')}")
    code = code.replace("strokeWidth={isSelected ? 2 : 0}", "strokeWidth={tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2 : 0)}")

    # 4. Custom pos and visualRect mapping
    rect_logic = """
        const defaultRect = {
          x: cfg.xLeft,
          y: cfg.titleY - 20,
          width,
          height,
        }
        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const dx = visualRect.x - defaultRect.x
        const dy = visualRect.y - defaultRect.y
        const scaleX = visualRect.width / defaultRect.width
        const scaleY = visualRect.height / defaultRect.height
"""
    code = re.sub(
        r"const visualRect = {[^}]+}",
        rect_logic,
        code,
        flags=re.MULTILINE
    )

    # 5. Multiline text support for title and value
    # We replace the text elements
    text_repl1 = """
            {/* Title above pin */}
            <text
              x={cfg.xPeak}
              y={cfg.titleY}
              textAnchor="middle"
              fontFamily="sans-serif"
              fontSize={14}
              fontWeight={700}
              fill="#1d2151"
            >
              {String(displayTitle).split('\\n').map((line, lIdx) => (
                  <tspan key={lIdx} x={cfg.xPeak} dy={lIdx === 0 ? 0 : 16}>{line}</tspan>
              ))}
            </text>
"""
    code = re.sub(r"\{\/\* Title above pin \*\/.*?<\/text>", text_repl1.strip(), code, flags=re.DOTALL)

    text_repl2 = """
            {/* Value Text inside mountain near base */}
            <text
              x={cfg.xPeak}
              y={yBase - 22}
              textAnchor="middle"
              fontFamily="sans-serif"
              fontSize={15}
              fontWeight={700}
              fill="#ffffff"
            >
              {String(displayValue).split('\\n').map((line, lIdx) => (
                  <tspan key={lIdx} x={cfg.xPeak} dy={lIdx === 0 ? 0 : 18}>{line}</tspan>
              ))}
            </text>
"""
    code = re.sub(r"\{\/\* Value Text inside mountain near base \*\/.*?<\/text>", text_repl2.strip(), code, flags=re.DOTALL)
    
    # 6. Apply transforms
    code = code.replace("<g key={elementId} onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>", 
    "<g key={elementId} onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>\n            <g transform={`translate(${visualRect.x}, ${visualRect.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultRect.x}, ${-defaultRect.y})`}>")

    code = code.replace("{isSelected && renderHandles(visualRect, elementId)}", "</g>\n            {isSelected && renderHandles(visualRect, elementId)}")

    # Adjust iter to itemsConfig
    # Actually, we want to map over displayNodes!
    code = code.replace("itemsConfig.map((cfg, idx) => {", "displayNodes.map((item, idx) => {\n        const cfg = itemsConfig[idx % itemsConfig.length]")
    
    # Let's write the whole file manually as a string replacing the core part to be safe
    # It's better to rewrite the whole return statement
    pass

def rewrite_business5():
    with open("src/templates/components/Business5Template.tsx", "r") as f:
        orig = f.read()
    
    new_code = """import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const TRIANGLE_COLORS = ['#1d2151', '#2b62d9', '#ff4d2d', '#ffc107', '#4ecdc4']

const DEFAULT_ITEMS = [
  { title: 'Your title', value: '£0.8M' },
  { title: 'Your title', value: '£2.0M' },
  { title: 'Your title', value: '£3.1M' },
  { title: 'Your title', value: '£2.6M' },
  { title: 'Your title', value: '£3.9M' },
]

export function Business5Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, nodes = [] } = data

  const itemsConfig = [
    { xLeft: 125, xPeak: 165, xRight: 195, yPeak: 310, pinY: 285, titleY: 260 },
    { xLeft: 185, xPeak: 265, xRight: 335, yPeak: 235, pinY: 185, titleY: 160 },
    { xLeft: 315, xPeak: 415, xRight: 515, yPeak: 175, pinY: 140, titleY: 125 },
    { xLeft: 495, xPeak: 575, xRight: 655, yPeak: 220, pinY: 195, titleY: 170 },
    { xLeft: 635, xPeak: 750, xRight: 865, yPeak: 150, pinY: 150, titleY: 135 },
  ]

  const yBase = 420
  const displayNodes = nodes.length > 0 ? nodes : DEFAULT_ITEMS

  return (
    <g ref={svgRef}>
      <g>
        <text x={40} y={65} fontFamily="serif" fontSize={32} fontWeight={800} fill="#1d2151">
          {title || 'Business 5'}
        </text>
        <rect x={40} y={80} width={55} height={8} fill="#1d2151" />
      </g>

      {displayNodes.map((item, idx) => {
        const cfg = itemsConfig[idx % itemsConfig.length]
        const elementId = `mountain-${idx}`
        
        const nodeData = typeof item === 'object' && item !== null ? item : {}
        const displayTitle = nodeData.title || DEFAULT_ITEMS[idx % DEFAULT_ITEMS.length].title
        const displayValue = nodeData.subtitle || DEFAULT_ITEMS[idx % DEFAULT_ITEMS.length].value
        const color = nodeData.color ?? tplColors[elementId] ?? TRIANGLE_COLORS[idx % TRIANGLE_COLORS.length]
        
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#007acc' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2 : 0)

        const width = cfg.xRight - cfg.xLeft
        const height = yBase - (cfg.titleY - 20)
        
        const defaultRect = {
          x: cfg.xLeft,
          y: cfg.titleY - 20,
          width,
          height,
        }
        
        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        
        const scaleX = visualRect.width / defaultRect.width
        const scaleY = visualRect.height / defaultRect.height

        const titleLines = String(displayTitle).split('\\n').filter(Boolean)
        const valLines = String(displayValue).split('\\n').filter(Boolean)

        return (
          <g key={elementId}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${visualRect.x}, ${visualRect.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultRect.x}, ${-defaultRect.y})`}>
                <text
                  x={cfg.xPeak}
                  y={cfg.titleY}
                  textAnchor="middle"
                  fontFamily="sans-serif"
                  fontSize={14}
                  fontWeight={700}
                  fill="#1d2151"
                >
                  {titleLines.map((line, lIdx) => (
                    <tspan key={lIdx} x={cfg.xPeak} dy={lIdx === 0 ? 0 : 16}>{line}</tspan>
                  ))}
                </text>

                <line
                  x1={cfg.xPeak}
                  y1={cfg.pinY}
                  x2={cfg.xPeak}
                  y2={cfg.yPeak}
                  stroke={color}
                  strokeWidth={3}
                />
                <circle cx={cfg.xPeak} cy={cfg.pinY} r={5} fill={color} />

                <polygon
                  points={`${cfg.xLeft},${yBase} ${cfg.xPeak},${cfg.yPeak} ${cfg.xRight},${yBase}`}
                  fill={color}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={isSelected ? '4 2' : undefined}
                />

                <text
                  x={cfg.xPeak}
                  y={yBase - 22}
                  textAnchor="middle"
                  fontFamily="sans-serif"
                  fontSize={15}
                  fontWeight={700}
                  fill="#ffffff"
                >
                  {valLines.map((line, lIdx) => (
                    <tspan key={lIdx} x={cfg.xPeak} dy={lIdx === 0 ? 0 : 18}>{line}</tspan>
                  ))}
                </text>
              </g>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      <text x={450} y={460} textAnchor="middle" fontFamily="sans-serif" fontSize={12} fill="#555555">
        MIGSO-PCUBED content and words to be added here as required
      </text>
    </g>
  )
}
"""
    with open("src/templates/components/Business5Template.tsx", "w") as f:
        f.write(new_code)


def rewrite_business6():
    with open("src/templates/components/Business6Template.tsx", "r") as f:
        orig = f.read()

    new_code = """import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const DEFAULT_COLORS = ['#242254', '#2b60d3', '#ff472e', '#ffc000', '#48be93', '#90052d']

const DEFAULT_TITLES = ['Your title 01', 'Your title 02', 'Your title 03', 'Your title 04', 'Your title 05', 'Your title 06']

export function Business6Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, nodes = [] } = data

  const startX = 100
  const shapeW = 112
  const overlap = 15
  const stepX = shapeW - overlap
  const centerY = 310

  const heights = [
    { hLeft: 170, hRight: 210 },
    { hLeft: 210, hRight: 250 },
    { hLeft: 250, hRight: 210 },
    { hLeft: 210, hRight: 250 },
    { hLeft: 250, hRight: 210 },
    { hLeft: 210, hRight: 170 },
  ]

  const textPositions = [
    { isTop: true, textX: startX + 45, lineX: startX + shapeW, lineY1: 175, lineY2: centerY - 210 / 2 },
    { isTop: true, textX: startX + stepX + 35, lineX: startX + stepX + shapeW, lineY1: 145, lineY2: centerY - 210 / 2 },
    { isTop: false, textX: startX + stepX * 2 + 25, lineX: startX + stepX * 2 + 60, lineY1: centerY + 250 / 2 - 20, lineY2: 450 },
    { isTop: true, textX: startX + stepX * 3 + 35, lineX: startX + stepX * 3 + shapeW, lineY1: 145, lineY2: centerY - 210 / 2 },
    { isTop: false, textX: startX + stepX * 4 + 25, lineX: startX + stepX * 4 + 60, lineY1: centerY + 250 / 2 - 20, lineY2: 450 },
    { isTop: true, textX: startX + stepX * 5 + 35, lineX: startX + stepX * 5 + shapeW, lineY1: 175, lineY2: centerY - 210 / 2 },
  ]

  const defaultText = 'MIGSO-PCUBED content and words to be added here as required'
  const displayNodes = nodes.length > 0 ? nodes : Array.from({ length: 6 })

  return (
    <g ref={svgRef}>
      {title && (
        <g>
          <text x={40} y={65} textAnchor="start" fontFamily="Georgia, serif" fontSize={36} fontWeight={700} fill="#1a1c36">
            {title}
          </text>
          <rect x={40} y={82} width={55} height={8} fill="#242254" rx={2} />
        </g>
      )}

      {displayNodes.map((item, i) => {
        const nodeData = typeof item === 'object' && item !== null ? (item as any) : {}
        const elementId = `node-${i}`
        
        const xLeft = startX + i * stepX
        const xRight = xLeft + shapeW
        const h = heights[i % heights.length]!
        const yLTop = centerY - h.hLeft / 2
        const yLBot = centerY + h.hLeft / 2
        const yRTop = centerY - h.hRight / 2
        const yRBot = centerY + h.hRight / 2

        const mainColor = nodeData.color ?? tplColors[elementId] ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]!
        
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeW = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 0)

        const blockTitle = nodeData.title || DEFAULT_TITLES[i % DEFAULT_TITLES.length]
        const blockDesc = nodeData.subtitle || defaultText

        const polygonPath = `M ${xLeft} ${yLTop} L ${xRight} ${yRTop} L ${xRight} ${yRBot} L ${xLeft} ${yLBot} Z`
        const defaultRect = {
          x: xLeft,
          y: Math.min(yLTop, yRTop),
          width: shapeW,
          height: Math.max(h.hLeft, h.hRight),
        }

        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        
        const scaleX = visualRect.width / defaultRect.width
        const scaleY = visualRect.height / defaultRect.height

        const tPos = textPositions[i % textPositions.length]!
        const iconCx = xLeft + shapeW / 2
        const iconCy = centerY

        const descLines = blockDesc.split('\\n').flatMap(line => {
          if (line.length > 35) {
            const words = line.split(' ');
            const res = [];
            let current = '';
            words.forEach(w => {
              if ((current + w).length > 35) { res.push(current); current = w + ' '; }
              else { current += w + ' '; }
            });
            if (current) res.push(current);
            return res.map(l => l.trim());
          }
          return [line]
        })
        const titleLines = blockTitle.split('\\n').filter(Boolean)

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${visualRect.x}, ${visualRect.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultRect.x}, ${-defaultRect.y})`}>
                {i === 0 && <line x1={xLeft + shapeW} y1={175} x2={xLeft + shapeW} y2={yRTop} stroke="#cccccc" strokeWidth={2} />}
                {i === 1 && <line x1={xLeft + shapeW} y1={145} x2={xLeft + shapeW} y2={yRTop} stroke="#cccccc" strokeWidth={2} />}
                {i === 2 && <line x1={xLeft + 60} y1={yLBot} x2={xLeft + 60} y2={450} stroke="#cccccc" strokeWidth={2} />}
                {i === 3 && <line x1={xLeft + shapeW} y1={145} x2={xLeft + shapeW} y2={yRTop} stroke="#cccccc" strokeWidth={2} />}
                {i === 4 && <line x1={xLeft + 60} y1={yLBot} x2={xLeft + 60} y2={450} stroke="#cccccc" strokeWidth={2} />}
                {i === 5 && <line x1={xLeft + shapeW} y1={175} x2={xLeft + shapeW} y2={yRTop} stroke="#cccccc" strokeWidth={2} />}

                {tPos.isTop ? (
                  <g>
                    <text
                      x={tPos.textX}
                      y={130}
                      textAnchor="end"
                      fontFamily="Arial, sans-serif"
                      fontSize={18}
                      fontWeight={700}
                      fill={mainColor}
                    >
                      {titleLines.map((l, lIdx) => <tspan key={lIdx} x={tPos.textX} dy={lIdx === 0 ? 0 : 20}>{l}</tspan>)}
                    </text>
                    <text
                      x={tPos.textX}
                      y={130 + titleLines.length * 20}
                      textAnchor="end"
                      fontFamily="Arial, sans-serif"
                      fontSize={11}
                      fill="#444444"
                    >
                      {descLines.map((l, lIdx) => <tspan key={lIdx} x={tPos.textX} dy={lIdx === 0 ? 0 : 15}>{l}</tspan>)}
                    </text>
                  </g>
                ) : (
                  <g>
                    <text
                      x={tPos.textX}
                      y={475}
                      textAnchor="start"
                      fontFamily="Arial, sans-serif"
                      fontSize={18}
                      fontWeight={700}
                      fill={mainColor}
                    >
                      {titleLines.map((l, lIdx) => <tspan key={lIdx} x={tPos.textX} dy={lIdx === 0 ? 0 : 20}>{l}</tspan>)}
                    </text>
                    <text
                      x={tPos.textX}
                      y={475 + titleLines.length * 20}
                      textAnchor="start"
                      fontFamily="Arial, sans-serif"
                      fontSize={11}
                      fill="#444444"
                    >
                      {descLines.map((l, lIdx) => <tspan key={lIdx} x={tPos.textX} dy={lIdx === 0 ? 0 : 15}>{l}</tspan>)}
                    </text>
                  </g>
                )}

                <path
                  d={polygonPath}
                  fill={mainColor}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  strokeDasharray={isSelected ? '4 2' : undefined}
                />

                <g transform={`translate(${iconCx - 24}, ${iconCy - 24})`} stroke="#ffffff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  {i % 6 === 0 && (
                    <>
                      <circle cx="16" cy="16" r="6" strokeDasharray="2 2" />
                      <path d="M7 26a6 6 0 0 1 12 0H7z" />
                      <path d="M12 20a4 4 0 0 1 8 0" />
                      <path d="M22 10l2-2M26 16h3M22 22l2 2M16 6V3" />
                    </>
                  )}
                  {i % 6 === 1 && (
                    <>
                      <path d="M4 8a2 2 0 0 1 2-2h8l3 3h9a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
                      <circle cx="20" cy="20" r="3" />
                      <path d="M20 15v2M20 23v2M15 20h2M23 20h2" />
                    </>
                  )}
                  {i % 6 === 2 && (
                    <>
                      <circle cx="24" cy="24" r="14" />
                      <circle cx="24" cy="24" r="6" />
                      <path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M10 38l4-4M34 14l4-4" />
                    </>
                  )}
                  {i % 6 === 3 && (
                    <>
                      <circle cx="24" cy="24" r="10" />
                      <polyline points="24 18 24 24 28 24" />
                      <path d="M18 6h12l2 8H16l2-8zM18 42h12l2-8H16l2 8z" />
                    </>
                  )}
                  {i % 6 === 4 && (
                    <>
                      <path d="M10 12h28l-3 26H13L10 12z" />
                      <path d="M8 12h32M18 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
                      <line x1="18" y1="18" x2="18" y2="32" />
                      <line x1="24" y1="18" x2="24" y2="32" />
                      <line x1="30" y1="18" x2="30" y2="32" />
                    </>
                  )}
                  {i % 6 === 5 && (
                    <>
                      <rect x="6" y="8" width="28" height="32" rx="4" />
                      <circle cx="22" cy="20" r="4" />
                      <path d="M22 24v10a2 2 0 0 0 4 0v-4" />
                    </>
                  )}
                </g>
              </g>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
"""
    with open("src/templates/components/Business6Template.tsx", "w") as f:
        f.write(new_code)


def rewrite_business7():
    with open("src/templates/components/Business7Template.tsx", "r") as f:
        orig = f.read()

    new_code = """import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const DEFAULT_COLORS = ['#27295c', '#2962ff', '#ff4d30', '#ffc107']

export function Business7Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, nodes = [] } = data
  const W = 900

  const totalWidth = 800
  const startX = (W - totalWidth) / 2
  
  const iconRadius = 38
  const iconY = 160
  const cardTopY = 200
  const cardH = 340
  const notchDepth = 35

  const defaultTitles = ['Your title 01', 'Your title 02', 'Your title 03', 'Your title 04']
  const defaultDesc = 'MIGSO-PCUBED content and words to be added here as required'

  const displayNodes = nodes.length > 0 ? nodes : Array.from({ length: 4 })
  const count = displayNodes.length
  
  // Calculate width per column, but if count is huge it might overflow.
  // Using generic scaling per element
  const columnGap = 16
  const colW = count > 1 ? (totalWidth - (count - 1) * columnGap) / count : totalWidth

  return (
    <g ref={svgRef}>
      {title && (
        <g>
          <text x={startX} y={65} textAnchor="start" fontFamily="Georgia, serif" fontSize={32} fontWeight={700} fill="#1a1c36">
            {title}
          </text>
          <rect x={startX} y={80} width={55} height={8} fill="#27295c" rx={2} />
        </g>
      )}

      {displayNodes.map((item, i) => {
        const elementId = `node-${i}`
        const nodeData = typeof item === 'object' && item !== null ? (item as any) : {}
        const x = startX + i * (colW + columnGap)
        const mainColor = nodeData.color ?? tplColors[elementId] ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]!
        
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeW = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 0)

        const colTitle = nodeData.title || defaultTitles[i % defaultTitles.length]!
        const colDesc = nodeData.subtitle || defaultDesc

        const defaultRect = { x, y: iconY - iconRadius, width: colW, height: cardTopY + cardH - (iconY - iconRadius) }
        
        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        
        const scaleX = visualRect.width / defaultRect.width
        const scaleY = visualRect.height / defaultRect.height

        const grayChevronPath = `
          M ${x} ${cardTopY + notchDepth}
          L ${x + colW / 2} ${cardTopY}
          L ${x + colW} ${cardTopY + notchDepth}
          L ${x + colW} ${cardTopY + notchDepth + 20}
          L ${x + colW / 2} ${cardTopY + 20}
          L ${x} ${cardTopY + notchDepth + 20}
          Z
        `

        const bodyPath = `
          M ${x} ${cardTopY + notchDepth + 18}
          L ${x + colW / 2} ${cardTopY + 18}
          L ${x + colW} ${cardTopY + notchDepth + 18}
          L ${x + colW} ${cardTopY + cardH}
          L ${x} ${cardTopY + cardH}
          Z
        `

        const titleLines = colTitle.split('\\n').filter(Boolean)
        const descLines = colDesc.split('\\n').flatMap(line => {
          if (line.length > 35) {
            const words = line.split(' ');
            const res = [];
            let current = '';
            words.forEach(w => {
              if ((current + w).length > 35) { res.push(current); current = w + ' '; }
              else { current += w + ' '; }
            });
            if (current) res.push(current);
            return res.map(l => l.trim());
          }
          return [line]
        })

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${visualRect.x}, ${visualRect.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultRect.x}, ${-defaultRect.y})`}>
                <path d={grayChevronPath} fill="#afb4b9" />

                <path
                  d={bodyPath}
                  fill={mainColor}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  strokeDasharray={isSelected ? '4 2' : undefined}
                />

                <circle cx={x + colW / 2} cy={iconY} r={iconRadius} fill={mainColor} stroke="#ffffff" strokeWidth={3} />

                <g transform={`translate(${x + colW / 2 - 16}, ${iconY - 16})`} stroke="#ffffff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  {i % 4 === 0 && <path d="M4 22h24L28 10l-6 6-6-10-6 10-6-6z" />}
                  {i % 4 === 1 && (
                    <>
                      <rect x="5" y="4" width="22" height="24" rx="2" />
                      <line x1="9" y1="10" x2="23" y2="10" />
                      <line x1="9" y1="15" x2="23" y2="15" />
                      <line x1="9" y1="20" x2="17" y2="20" />
                    </>
                  )}
                  {i % 4 === 2 && (
                    <>
                      <circle cx="16" cy="16" r="8" />
                      <path d="M16 2v4M16 26v4M2 16h4M26 16h4" />
                    </>
                  )}
                  {i % 4 === 3 && (
                    <>
                      <rect x="5" y="10" width="22" height="17" rx="2" />
                      <path d="M11 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                      <line x1="5" y1="17" x2="27" y2="17" />
                    </>
                  )}
                </g>

                <text
                  x={x + 18}
                  y={cardTopY + notchDepth + 70}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={18}
                  fontWeight={700}
                  fill="#ffffff"
                >
                  {titleLines.map((l, lIdx) => <tspan key={lIdx} x={x + 18} dy={lIdx === 0 ? 0 : 20}>{l}</tspan>)}
                </text>

                <text
                  x={x + 18}
                  y={cardTopY + notchDepth + 70 + titleLines.length * 20}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fill="#ffffff"
                  opacity={0.9}
                >
                  {descLines.map((l, lIdx) => <tspan key={lIdx} x={x + 18} dy={lIdx === 0 ? 0 : 18}>{l}</tspan>)}
                </text>
              </g>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
"""
    with open("src/templates/components/Business7Template.tsx", "w") as f:
        f.write(new_code)


if __name__ == '__main__':
    rewrite_business5()
    rewrite_business6()
    rewrite_business7()
    print("Done")
