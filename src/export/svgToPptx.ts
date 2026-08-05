import PptxGenJS from 'pptxgenjs'
import { getContentSvg } from './generateSvg'

const SLIDE_W = 13.33
const SLIDE_H = 7.5

interface ViewBox {
  vx: number
  vy: number
  vw: number
  vh: number
}

interface SlideLayout {
  contentX: number
  contentY: number
  scaleX: number
  scaleY: number
}

interface AbsBounds {
  x: number
  y: number
  w: number
  h: number
  rotation: number
}

function parseSvgViewBox(svgString: string): ViewBox {
  const vbMatch = svgString.match(/viewBox="([^"]+)"/)
  if (vbMatch) {
    const p = vbMatch[1]!.trim().split(/[\s,]+/).map(parseFloat)
    return { vx: p[0] ?? 0, vy: p[1] ?? 0, vw: p[2] ?? 960, vh: p[3] ?? 540 }
  }
  const wm = svgString.match(/\swidth="([^"]+)"/)
  const hm = svgString.match(/\sheight="([^"]+)"/)
  return { vx: 0, vy: 0, vw: parseFloat(wm?.[1] ?? '960'), vh: parseFloat(hm?.[1] ?? '540') }
}

function computeSlideLayout(vb: ViewBox): SlideLayout {
  const svgRatio = vb.vw / vb.vh
  const slideRatio = SLIDE_W / SLIDE_H
  let contentW: number, contentH: number, contentX: number, contentY: number
  if (svgRatio > slideRatio) {
    contentW = SLIDE_W
    contentH = SLIDE_W / svgRatio
    contentX = 0
    contentY = (SLIDE_H - contentH) / 2
  } else {
    contentH = SLIDE_H
    contentW = SLIDE_H * svgRatio
    contentX = (SLIDE_W - contentW) / 2
    contentY = 0
  }
  return {
    contentX,
    contentY,
    scaleX: contentW / vb.vw,
    scaleY: contentH / vb.vh,
  }
}

function toSlideX(absX: number, vb: ViewBox, layout: SlideLayout): number {
  return layout.contentX + (absX - vb.vx) * layout.scaleX
}

function toSlideY(absY: number, vb: ViewBox, layout: SlideLayout): number {
  return layout.contentY + (absY - vb.vy) * layout.scaleY
}

function toSlideW(w: number, layout: SlideLayout): number {
  return w * layout.scaleX
}

function toSlideH(h: number, layout: SlideLayout): number {
  return h * layout.scaleY
}

function resolveColor(color: string): string {
  if (!color || color === 'none' || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return ''
  if (color.startsWith('context-') || color.startsWith('url(')) return ''
  if (color.startsWith('#')) {
    let hex = color.slice(1)
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
    return hex.toUpperCase().slice(0, 6)
  }
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (m) {
    return [m[1], m[2], m[3]]
      .map(v => parseInt(v!).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  }
  const tmp = document.createElement('div')
  tmp.style.color = color
  document.body.appendChild(tmp)
  const resolved = window.getComputedStyle(tmp).color
  document.body.removeChild(tmp)
  const m2 = resolved.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (m2) {
    return [m2[1], m2[2], m2[3]]
      .map(v => parseInt(v!).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  }
  return '000000'
}

function getLocalBounds(el: SVGGraphicsElement): { lx: number; ly: number; lw: number; lh: number } | null {
  const tag = el.tagName.toLowerCase()
  if (tag === 'rect') {
    const lw = parseFloat(el.getAttribute('width') || '0')
    const lh = parseFloat(el.getAttribute('height') || '0')
    if (lw <= 0 || lh <= 0) return null
    return { lx: parseFloat(el.getAttribute('x') || '0'), ly: parseFloat(el.getAttribute('y') || '0'), lw, lh }
  }
  if (tag === 'circle') {
    const r = parseFloat(el.getAttribute('r') || '0')
    if (r <= 0) return null
    const cx = parseFloat(el.getAttribute('cx') || '0')
    const cy = parseFloat(el.getAttribute('cy') || '0')
    return { lx: cx - r, ly: cy - r, lw: r * 2, lh: r * 2 }
  }
  if (tag === 'ellipse') {
    const rx = parseFloat(el.getAttribute('rx') || '0')
    const ry = parseFloat(el.getAttribute('ry') || '0')
    if (rx <= 0 || ry <= 0) return null
    const cx = parseFloat(el.getAttribute('cx') || '0')
    const cy = parseFloat(el.getAttribute('cy') || '0')
    return { lx: cx - rx, ly: cy - ry, lw: rx * 2, lh: ry * 2 }
  }
  if (tag === 'line') {
    const x1 = parseFloat(el.getAttribute('x1') || '0')
    const y1 = parseFloat(el.getAttribute('y1') || '0')
    const x2 = parseFloat(el.getAttribute('x2') || '0')
    const y2 = parseFloat(el.getAttribute('y2') || '0')
    return { lx: Math.min(x1, x2), ly: Math.min(y1, y2), lw: Math.abs(x2 - x1), lh: Math.abs(y2 - y1) }
  }
  try {
    const bbox = el.getBBox()
    if (bbox.width > 0 && bbox.height > 0) {
      return { lx: bbox.x, ly: bbox.y, lw: bbox.width, lh: bbox.height }
    }
  } catch { /* element not rendered */ }
  return null
}

function getAbsBounds(el: SVGGraphicsElement, svgRoot: SVGSVGElement): AbsBounds | null {
  const local = getLocalBounds(el)
  if (!local) return null

  let ctm: DOMMatrix | null = null
  try { ctm = el.getCTM() } catch { return null }
  if (!ctm) return null

  const { lx, ly, lw, lh } = local
  const corners: Array<{ x: number; y: number }> = [
    [lx, ly], [lx + lw, ly], [lx + lw, ly + lh], [lx, ly + lh],
  ].map(([px, py]) => {
    const pt = svgRoot.createSVGPoint()
    pt.x = px!
    pt.y = py!
    return pt.matrixTransform(ctm!)
  })

  const xs = corners.map(c => c.x)
  const ys = corners.map(c => c.y)
  const absX = Math.min(...xs)
  const absY = Math.min(...ys)
  const absW = Math.max(...xs) - absX
  const absH = Math.max(...ys) - absY

  const rotation = Math.round(Math.atan2(ctm.b, ctm.a) * 180 / Math.PI * 100) / 100

  return { x: absX, y: absY, w: absW, h: absH, rotation }
}

function getElementStyle(el: Element): { fill: string; stroke: string; strokeWidth: number } {
  const svgEl = el as SVGElement
  const computed = window.getComputedStyle(el)
  const fill = el.getAttribute('fill') || svgEl.style.fill || computed.fill || 'none'
  const stroke = el.getAttribute('stroke') || svgEl.style.stroke || computed.stroke || 'none'
  const swRaw = el.getAttribute('stroke-width') || svgEl.style.strokeWidth || computed.strokeWidth || '0'
  return { fill, stroke, strokeWidth: parseFloat(swRaw) }
}

function addRectToSlide(
  slide: PptxGenJS.Slide,
  el: SVGGraphicsElement,
  bounds: AbsBounds,
  vb: ViewBox,
  layout: SlideLayout,
): void {
  const { fill, stroke, strokeWidth } = getElementStyle(el)
  const hexFill = resolveColor(fill)
  const hexStroke = resolveColor(stroke)
  const rx = parseFloat(el.getAttribute('rx') || '0')

  const x = toSlideX(bounds.x, vb, layout)
  const y = toSlideY(bounds.y, vb, layout)
  const w = Math.max(0.01, toSlideW(bounds.w, layout))
  const h = Math.max(0.01, toSlideH(bounds.h, layout))

  const opts: PptxGenJS.ShapeProps = { x, y, w, h }
  if (hexFill) opts.fill = { color: hexFill }
  if (hexStroke && strokeWidth > 0) opts.line = { color: hexStroke, width: Math.max(0.25, strokeWidth * layout.scaleX * 72) }
  if (bounds.rotation !== 0) opts.rotate = bounds.rotation

  slide.addShape(rx > 0 ? 'roundRect' : 'rect', opts)
}

function addEllipseToSlide(
  slide: PptxGenJS.Slide,
  el: SVGGraphicsElement,
  bounds: AbsBounds,
  vb: ViewBox,
  layout: SlideLayout,
): void {
  const { fill, stroke, strokeWidth } = getElementStyle(el)
  const hexFill = resolveColor(fill)
  const hexStroke = resolveColor(stroke)

  const x = toSlideX(bounds.x, vb, layout)
  const y = toSlideY(bounds.y, vb, layout)
  const w = Math.max(0.01, toSlideW(bounds.w, layout))
  const h = Math.max(0.01, toSlideH(bounds.h, layout))

  const opts: PptxGenJS.ShapeProps = { x, y, w, h }
  if (hexFill) opts.fill = { color: hexFill }
  if (hexStroke && strokeWidth > 0) opts.line = { color: hexStroke, width: Math.max(0.25, strokeWidth * layout.scaleX * 72) }

  slide.addShape('ellipse', opts)
}

function addLineToSlide(
  slide: PptxGenJS.Slide,
  el: SVGGraphicsElement,
  svgRoot: SVGSVGElement,
  vb: ViewBox,
  layout: SlideLayout,
): void {
  const { stroke, strokeWidth } = getElementStyle(el)
  const hexStroke = resolveColor(stroke)
  if (!hexStroke) return

  let ctm: DOMMatrix | null = null
  try { ctm = el.getCTM() } catch { return }
  if (!ctm) return

  const pt = svgRoot.createSVGPoint()
  const applyCtm = (lx: number, ly: number) => {
    pt.x = lx; pt.y = ly
    return pt.matrixTransform(ctm!)
  }

  const x1 = parseFloat(el.getAttribute('x1') || '0')
  const y1 = parseFloat(el.getAttribute('y1') || '0')
  const x2 = parseFloat(el.getAttribute('x2') || '0')
  const y2 = parseFloat(el.getAttribute('y2') || '0')

  const p1 = applyCtm(x1, y1)
  const p2 = applyCtm(x2, y2)

  const sx = toSlideX(p1.x, vb, layout)
  const sy = toSlideY(p1.y, vb, layout)
  const ex = toSlideX(p2.x, vb, layout)
  const ey = toSlideY(p2.y, vb, layout)

  slide.addShape('line', {
    x: Math.min(sx, ex),
    y: Math.min(sy, ey),
    w: Math.max(0.01, Math.abs(ex - sx)),
    h: Math.max(0.01, Math.abs(ey - sy)),
    flipH: ex < sx,
    flipV: ey < sy,
    line: { color: hexStroke, width: Math.max(0.25, strokeWidth * layout.scaleX * 72) },
  })
}

function addPolygonToSlide(
  slide: PptxGenJS.Slide,
  el: SVGGraphicsElement,
  svgRoot: SVGSVGElement,
  vb: ViewBox,
  layout: SlideLayout,
): void {
  const pointsAttr = el.getAttribute('points')
  if (!pointsAttr) return

  let ctm: DOMMatrix | null = null
  try { ctm = el.getCTM() } catch { return }
  if (!ctm) return

  const nums = pointsAttr.trim().split(/[\s,]+/).map(parseFloat).filter(n => !isNaN(n))
  if (nums.length < 6) return

  const pt = svgRoot.createSVGPoint()
  const absPoints: Array<{ x: number; y: number }> = []
  for (let i = 0; i + 1 < nums.length; i += 2) {
    pt.x = nums[i]!; pt.y = nums[i + 1]!
    const abs = pt.matrixTransform(ctm)
    absPoints.push({ x: toSlideX(abs.x, vb, layout), y: toSlideY(abs.y, vb, layout) })
  }

  const { fill, stroke, strokeWidth } = getElementStyle(el)
  const hexFill = resolveColor(fill)
  const hexStroke = resolveColor(stroke)

  const minX = Math.min(...absPoints.map(p => p.x))
  const minY = Math.min(...absPoints.map(p => p.y))
  const maxX = Math.max(...absPoints.map(p => p.x))
  const maxY = Math.max(...absPoints.map(p => p.y))

  const relPoints = absPoints.map(p => ({ x: p.x - minX, y: p.y - minY }))

  slide.addShape('custGeom' as PptxGenJS.ShapeType, {
    x: minX,
    y: minY,
    w: Math.max(0.01, maxX - minX),
    h: Math.max(0.01, maxY - minY),
    points: relPoints as unknown as PptxGenJS.ShapeProps['points'],
    fill: hexFill ? { color: hexFill } : { type: 'none' },
    line: hexStroke && strokeWidth > 0 ? { color: hexStroke, width: Math.max(0.25, strokeWidth * layout.scaleX * 72) } : undefined,
async function rasterizeElementToPng(el: SVGGraphicsElement, bbox: DOMRect | SVGRect, defsString: string): Promise<string> {
  const sw = parseFloat(el.getAttribute('stroke-width') || window.getComputedStyle(el).strokeWidth || '0')
  const strokePad = isNaN(sw) ? 0 : sw / 2
  const pad = 4 + strokePad
  const vbX = bbox.x - pad
  const vbY = bbox.y - pad
  const vbW = bbox.width + pad * 2
  const vbH = bbox.height + pad * 2
  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" width="${vbW}" height="${vbH}">${defsString}${el.outerHTML}</svg>`
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      const scale = 12 // Super high scale for ultra crisp vectors in PPTX
      const canvas = document.createElement('canvas')
      canvas.width = (img.naturalWidth || img.width) * scale
      canvas.height = (img.naturalHeight || img.height) * scale
      const ctx = canvas.getContext('2d')
      if (!ctx) { URL.revokeObjectURL(url); reject(new Error('no ctx')); return }
      ctx.scale(scale, scale)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('raster fail')) }
    img.src = url
  })
}

async function addElementAsImageToSlide(
  slide: PptxGenJS.Slide,
  el: SVGGraphicsElement,
  bounds: AbsBounds,
  vb: ViewBox,
  layout: SlideLayout,
  defsString: string
): Promise<void> {
  try {
    const bbox = el.getBBox()
    if (bbox.width <= 0 || bbox.height <= 0) return
    const pngData = await rasterizeElementToPng(el, bbox, defsString)
    
    let ctmScale = 1
    try {
      const ctm = el.getCTM()
      if (ctm) ctmScale = Math.hypot(ctm.a, ctm.b)
    } catch {}

    const sw = parseFloat(el.getAttribute('stroke-width') || window.getComputedStyle(el).strokeWidth || '0')
    const strokePad = isNaN(sw) ? 0 : sw / 2
    const padAbs = (4 + strokePad) * ctmScale
    const padW = padAbs * layout.scaleX
    const padH = padAbs * layout.scaleY

    slide.addImage({
      data: pngData,
      x: toSlideX(bounds.x, vb, layout) - padW,
      y: toSlideY(bounds.y, vb, layout) - padH,
      w: Math.max(0.01, toSlideW(bounds.w, layout)) + padW * 2,
      h: Math.max(0.01, toSlideH(bounds.h, layout)) + padH * 2,
    })
  } catch { /* skip unrenderable elements */ }
}

function addTextToSlide(
  slide: PptxGenJS.Slide,
  el: SVGTextElement,
  svgRoot: SVGSVGElement,
  vb: ViewBox,
  layout: SlideLayout,
): void {
  const content = el.textContent?.trim()
  if (!content) return

  const svgEl = el as SVGElement
  const computed = window.getComputedStyle(el)
  const rawFill = el.getAttribute('fill') || svgEl.style.fill || computed.fill || '#000000'
  const hexColor = resolveColor(rawFill) || '111111'
  const fontSizePx = parseFloat(el.getAttribute('font-size') || computed.fontSize || '14')
  const fontFamily = (el.getAttribute('font-family') || computed.fontFamily || 'Arial').replace(/['"]/g, '').split(',')[0]!.trim()
  const textAnchor = el.getAttribute('text-anchor') || 'start'

  let bounds: AbsBounds | null = null
  let ctmScale = 1
  try {
    const bbox = el.getBBox()
    if (bbox.width > 0 && bbox.height > 0) {
      let ctm: DOMMatrix | null = null
      try { ctm = el.getCTM() } catch { /* skip */ }
      if (ctm) {
        ctmScale = Math.hypot(ctm.a, ctm.b)
        const pt = svgRoot.createSVGPoint()
        const corners = [
          [bbox.x, bbox.y], [bbox.x + bbox.width, bbox.y],
          [bbox.x + bbox.width, bbox.y + bbox.height], [bbox.x, bbox.y + bbox.height],
        ].map(([px, py]) => { pt.x = px!; pt.y = py!; return pt.matrixTransform(ctm!) })
        const xs = corners.map(c => c.x)
        const ys = corners.map(c => c.y)
        bounds = {
          x: Math.min(...xs), y: Math.min(...ys),
          w: Math.max(...xs) - Math.min(...xs),
          h: Math.max(...ys) - Math.min(...ys),
          rotation: 0,
        }
      }
    }
  } catch { /* getBBox failed */ }

  if (!bounds) return

  const x = toSlideX(bounds.x, vb, layout)
  const y = toSlideY(bounds.y, vb, layout)
  const w = Math.max(0.2, toSlideW(bounds.w, layout))
  const h = Math.max(0.15, toSlideH(bounds.h, layout))
  const pptxFontSize = Math.max(6, Math.round(fontSizePx * ctmScale * layout.scaleX * 72))

  let align: PptxGenJS.HAlign = 'left'
  if (textAnchor === 'middle') align = 'center'
  else if (textAnchor === 'end') align = 'right'

  const tspans = Array.from(el.querySelectorAll('tspan'))
  const textValue: string | PptxGenJS.TextProps[] = tspans.length > 1
    ? tspans.map((ts, i) => ({ text: ts.textContent || '', options: { breakLine: i < tspans.length - 1 } }))
    : content

  slide.addText(textValue, {
    x: Math.max(0, x),
    y: Math.max(0, y),
    w,
    h,
    fontSize: pptxFontSize,
    fontFace: fontFamily,
    color: hexColor,
    align,
    valign: 'middle',
    margin: 0,
    wrap: false,
    isTextBox: true,
  })
}

function isInteractiveElement(el: Element): boolean {
  return (
    el.getAttribute('stroke-dasharray') === '4 2' ||
    el.classList.contains('handle') ||
    el.getAttribute('data-handle') !== null ||
    el.getAttribute('fill') === 'url(#grid)'
  )
}

function isInsideDefs(el: Element): boolean {
  let node: Element | null = el.parentElement
  while (node && node.tagName.toLowerCase() !== 'svg') {
    if (node.tagName.toLowerCase() === 'defs') return true
    node = node.parentElement
  }
  return false
}

function isWhiteBackground(el: Element, vb: ViewBox): boolean {
  const x = parseFloat(el.getAttribute('x') || '-1')
  const y = parseFloat(el.getAttribute('y') || '-1')
  const w = parseFloat(el.getAttribute('width') || '0')
  const h = parseFloat(el.getAttribute('height') || '0')
  const fill = el.getAttribute('fill') || ''
  return (
    Math.abs(x - vb.vx) < 2 &&
    Math.abs(y - vb.vy) < 2 &&
    Math.abs(w - vb.vw) < 2 &&
    Math.abs(h - vb.vh) < 2 &&
    (fill === 'white' || fill === '#ffffff' || fill === '#fff')
  )
}

export async function generateCanvasPptx(): Promise<Blob> {
  const pres = new PptxGenJS()
  pres.layout = 'LAYOUT_WIDE'
  pres.author = 'autoDesign'
  pres.title = 'Diagram'
  const slide = pres.addSlide()

  const svgString = await getContentSvg()
  const vb = parseSvgViewBox(svgString)
  const layout = computeSlideLayout(vb)

  const container = document.createElement('div')
  container.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;left:-99999px;top:0;'
  container.innerHTML = svgString
  document.body.appendChild(container)

  const svgRoot = container.querySelector('svg') as SVGSVGElement
  // Remove viewBox, width and height so getCTM() returns pure unscaled user coordinates
  svgRoot.removeAttribute('viewBox')
  svgRoot.removeAttribute('width')
  svgRoot.removeAttribute('height')

  // Removed white slide background completely so it defaults to transparent / slide master background

  const allDefs = Array.from(svgRoot.querySelectorAll('defs')).map(d => d.outerHTML).join('\n')

  // Export clipped groups as high-res images to support complex cuts (e.g. Brain1 silhouette)
  const clippedGroups = Array.from(svgRoot.querySelectorAll<SVGGraphicsElement>('g[clip-path]'))
  for (const g of clippedGroups) {
    if (isInteractiveElement(g) || isInsideDefs(g)) continue
    const bounds = getAbsBounds(g, svgRoot)
    if (bounds && bounds.w > 0 && bounds.h > 0) {
      await addElementAsImageToSlide(slide, g, bounds, vb, layout, allDefs)
    }
    // Remove so children aren't drawn independently as unclipped rects
    g.remove()
  }

  const shapes = Array.from(svgRoot.querySelectorAll<SVGGraphicsElement>('rect, circle, ellipse, polygon, path, line'))
  for (const el of shapes) {
    if (isInteractiveElement(el) || isInsideDefs(el)) continue
    const tag = el.tagName.toLowerCase()

    if (tag === 'rect' && isWhiteBackground(el, vb)) continue

    if (tag === 'line') {
      addLineToSlide(slide, el, svgRoot, vb, layout)
      continue
    }

    if (tag === 'polygon') {
      addPolygonToSlide(slide, el, svgRoot, vb, layout)
      continue
    }

    const bounds = getAbsBounds(el, svgRoot)
    if (!bounds || bounds.w <= 0 || bounds.h <= 0) continue

    if (tag === 'rect') addRectToSlide(slide, el, bounds, vb, layout)
    else if (tag === 'circle' || tag === 'ellipse') addEllipseToSlide(slide, el, bounds, vb, layout)
    else if (tag === 'path') await addElementAsImageToSlide(slide, el, bounds, vb, layout, allDefs)
  }

  const texts = Array.from(svgRoot.querySelectorAll<SVGTextElement>('text'))
  for (const el of texts) {
    if (isInsideDefs(el)) continue
    addTextToSlide(slide, el, svgRoot, vb, layout)
  }

  container.remove()

  const data = await pres.write({ outputType: 'arraybuffer' })
  return new Blob([data as ArrayBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  })
}

export async function downloadCanvasPptx(filename: string = 'diagram.pptx'): Promise<void> {
  const blob = await generateCanvasPptx()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
