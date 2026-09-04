import type PptxGenJS from 'pptxgenjs'
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
  const pt = svgRoot.createSVGPoint()
  pt.x = lx + lw / 2
  pt.y = ly + lh / 2
  const center = pt.matrixTransform(ctm)

  const scaleX = Math.hypot(ctm.a, ctm.b)
  const scaleY = Math.hypot(ctm.c, ctm.d)
  const absW = lw * scaleX
  const absH = lh * scaleY
  const absX = center.x - absW / 2
  const absY = center.y - absH / 2

  const rawRotation = Math.atan2(ctm.b, ctm.a) * 180 / Math.PI
  const rotation = (Math.round(rawRotation * 100) / 100 % 360 + 360) % 360

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
  if (bounds.rotation !== 0) opts.rotate = bounds.rotation

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
  } as PptxGenJS.ShapeProps)
}

async function getElementAsSvgImage(el: SVGGraphicsElement, bbox: DOMRect | SVGRect, defsString: string): Promise<string> {
  const cloned = el.cloneNode(true) as SVGGraphicsElement
  cloned.removeAttribute('transform')
  const sw = parseFloat(el.getAttribute('stroke-width') || window.getComputedStyle(el).strokeWidth || '0')
  const strokePad = isNaN(sw) ? 0 : sw / 2
  const pad = 4 + strokePad
  const vbX = bbox.x - pad
  const vbY = bbox.y - pad
  const vbW = bbox.width + pad * 2
  const vbH = bbox.height + pad * 2
  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" width="${vbW}" height="${vbH}">${defsString}${cloned.outerHTML}</svg>`
  
  // PptxGenJS v3.7+ natively supports data:image/svg+xml.
  // PowerPoint will embed this as a true vector SVG file inside the PPTX media folder.
  // Users can then right-click the image in PowerPoint and "Convert to Shape" to make it fully editable.
  const base64 = btoa(unescape(encodeURIComponent(svgStr)))
  return `data:image/svg+xml;base64,${base64}`
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
    const svgDataUri = await getElementAsSvgImage(el, bbox, defsString)
    
    const sw = parseFloat(el.getAttribute('stroke-width') || window.getComputedStyle(el).strokeWidth || '0')
    const strokePad = isNaN(sw) ? 0 : sw / 2
    const padScaleX = bounds.w / (bbox.width || 1)
    const padScaleY = bounds.h / (bbox.height || 1)
    const padW = (4 + strokePad) * padScaleX * layout.scaleX
    const padH = (4 + strokePad) * padScaleY * layout.scaleY
    const imgOpts: PptxGenJS.ImageProps = {
      data: svgDataUri,
      x: toSlideX(bounds.x, vb, layout) - padW,
      y: toSlideY(bounds.y, vb, layout) - padH,
      w: Math.max(0.01, toSlideW(bounds.w, layout)) + padW * 2,
      h: Math.max(0.01, toSlideH(bounds.h, layout)) + padH * 2,
    }
    if (bounds.rotation !== 0) {
      imgOpts.rotate = bounds.rotation
    }

    slide.addImage(imgOpts)
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
    let ctm: DOMMatrix | null = null
    try { ctm = el.getCTM() } catch { /* skip */ }
    ctmScale = ctm ? Math.hypot(ctm.a, ctm.b) : 1

    let lx = bbox.x
    let ly = bbox.y
    let lw = bbox.width
    let lh = bbox.height

    // Fallback if bbox is 0 (e.g. rendered in hidden container)
    if (lw <= 0 || lh <= 0) {
      lx = parseFloat(el.getAttribute('x') || '0')
      ly = parseFloat(el.getAttribute('y') || '0')
      const tspans = Array.from(el.querySelectorAll('tspan'))
      const lineCount = Math.max(1, tspans.length)
      const approxCharWidth = fontSizePx * 0.6
      lw = Math.max(20, content.length * approxCharWidth / lineCount)
      lh = fontSizePx * lineCount * 1.3
      if (textAnchor === 'middle') lx -= lw / 2
      else if (textAnchor === 'end') lx -= lw
      ly -= fontSizePx * 0.8
    }

    if (ctm) {
      const pt = svgRoot.createSVGPoint()
      pt.x = lx + lw / 2
      pt.y = ly + lh / 2
      const center = pt.matrixTransform(ctm)

      const unrotatedW = lw * ctmScale
      const unrotatedH = lh * ctmScale
      const absX = center.x - unrotatedW / 2
      const absY = center.y - unrotatedH / 2

      const rawRotation = Math.atan2(ctm.b, ctm.a) * (180 / Math.PI)
      const rotation = (Math.round(rawRotation * 100) / 100 % 360 + 360) % 360

      bounds = {
        x: absX,
        y: absY,
        w: unrotatedW,
        h: unrotatedH,
        rotation,
      }
    } else {
      bounds = {
        x: lx,
        y: ly,
        w: lw,
        h: lh,
        rotation: 0,
      }
    }
  } catch { /* text bounds calculation fallback */ }

  if (!bounds) return

  const x = toSlideX(bounds.x, vb, layout)
  const y = toSlideY(bounds.y, vb, layout)
  const w = Math.max(0.2, toSlideW(bounds.w, layout))
  const h = Math.max(0.15, toSlideH(bounds.h, layout))
  const pptxFontSize = Math.max(6, Math.round(fontSizePx * ctmScale * layout.scaleX * 72))

  let align: PptxGenJS.HAlign = 'left'
  if (textAnchor === 'middle') align = 'center'
  else if (textAnchor === 'end') align = 'right'

  const fontWeightRaw = el.getAttribute('font-weight') || computed.fontWeight || 'normal'
  const isBold = fontWeightRaw === 'bold' || parseInt(fontWeightRaw) >= 600
  const fontStyleRaw = el.getAttribute('font-style') || computed.fontStyle || 'normal'
  const isItalic = fontStyleRaw === 'italic' || fontStyleRaw === 'oblique'

  const tspans = Array.from(el.querySelectorAll('tspan'))
  const textValue: string | PptxGenJS.TextProps[] = tspans.length > 1
    ? tspans.map((ts, i) => ({ text: ts.textContent || '', options: { breakLine: i < tspans.length - 1, bold: isBold, italic: isItalic } }))
    : content

  const textProps: PptxGenJS.TextPropsOptions = {
    x: Math.max(0, x),
    y: Math.max(0, y),
    w,
    h,
    fontSize: pptxFontSize,
    fontFace: fontFamily,
    color: hexColor,
    bold: isBold,
    italic: isItalic,
    align,
    valign: 'top',
    margin: 0,
    wrap: true,
    autoFit: true,
    isTextBox: true,
  }

  if (bounds.rotation !== 0) {
    textProps.rotate = bounds.rotation
  }

  slide.addText(textValue, textProps)
}

function isInteractiveElement(el: Element): boolean {
  const dash = el.getAttribute('stroke-dasharray')
  return (
    dash === '4 2' ||
    dash === '4 4' ||
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
  const { default: PptxGenJS } = await import('pptxgenjs')
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

  // Export icon groups / containers (e.g. lucide icons, template icons) as unified single vector SVG images
  const iconGroups = Array.from(svgRoot.querySelectorAll<SVGGraphicsElement>('svg.lucide, g.lucide, g[data-icon], g[data-slot="icon"]'))
  for (const iconEl of iconGroups) {
    if (isInteractiveElement(iconEl) || isInsideDefs(iconEl)) continue
    const bounds = getAbsBounds(iconEl, svgRoot)
    if (bounds && bounds.w > 0 && bounds.h > 0) {
      await addElementAsImageToSlide(slide, iconEl, bounds, vb, layout, allDefs)
    }
    iconEl.remove()
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
