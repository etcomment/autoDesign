import { useCallback, useLayoutEffect, useRef, type ReactElement } from 'react'
import type { ImportedTemplateData } from '../types'
import type { ImportedItem, ImportedSlideSvg } from '../import/svgImport'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function applyOverrides(el: SVGGElement, color: string | undefined, title: string | undefined, subtitle: string | undefined): void {
  if (color) {
    for (const target of Array.from(el.querySelectorAll('[fill]'))) {
      const fill = target.getAttribute('fill')
      if (!fill || fill === 'none' || fill.startsWith('url(')) continue
      target.setAttribute('fill', color)
    }
  }
  if (title || subtitle) {
    const texts = Array.from(el.querySelectorAll('text'))
    if (title && texts[0]) texts[0].textContent = title
    if (subtitle && texts[1]) texts[1].textContent = subtitle
  }
}

export function ImportedSvgTemplate({ slide, data }: { slide: ImportedSlideSvg; data: ImportedTemplateData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const hiddenIds = useTemplateStore(s => s.hiddenTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const initElement = useTemplateStore(s => s.initTemplateElement)

  const itemRefs = useRef<Map<string, SVGGElement | null>>(new Map())
  const defaultBboxes = useRef<Map<string, Rect>>(new Map())

  const items: ImportedItem[] = slide.items
  const dataItems = data.importedItems ?? []

  useLayoutEffect(() => {
    for (const [index, item] of items.entries()) {
      const id = `item-${index + 1}`
      const el = itemRefs.current.get(id)
      if (!el) continue
      if (!defaultBboxes.current.has(id)) {
        try {
          const b = el.getBBox()
          defaultBboxes.current.set(id, { x: b.x, y: b.y, width: b.width, height: b.height })
          initElement(id, { x: b.x, y: b.y, width: b.width, height: b.height })
        } catch {
          // getBBox indisponible (tests jsdom) : pas de bbox par défaut
        }
      }
      const dataItem = dataItems[index]
      applyOverrides(el, tplColors[id] ?? dataItem?.color, dataItem?.title, dataItem?.subtitle)
    }
  })

  const getBbox = useCallback((id: string): Rect | null => {
    const position = positions[id]
    if (position && position.width > 0) return position
    return defaultBboxes.current.get(id) ?? null
  }, [positions])

  const staticContent = `${slide.defsMarkup}${slide.staticMarkup}`

  return (
    <g ref={svgRef}>
      {staticContent.length > 0 && (
        <g dangerouslySetInnerHTML={{ __html: staticContent }} />
      )}
      {items.map((item, index) => {
        const id = `item-${index + 1}`
        if (hiddenIds.has(id)) return null
        const defaultBbox = defaultBboxes.current.get(id)
        const bbox = getBbox(id)
        const sx = defaultBbox && bbox && defaultBbox.width > 0 ? bbox.width / defaultBbox.width : 1
        const sy = defaultBbox && bbox && defaultBbox.height > 0 ? bbox.height / defaultBbox.height : 1
        const mappingTransform = defaultBbox && bbox
          ? `translate(${bbox.x}, ${bbox.y}) scale(${sx}, ${sy}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`
          : undefined
        const rotation = bbox ? getTransform(id, bbox) : undefined
        const transform = [rotation, mappingTransform].filter(Boolean).join(' ') || undefined
        const dataItem = dataItems[index]
        return (
          <g
            key={`${item.ooxmlId}-${index}`}
            ref={el => {
              itemRefs.current.set(id, el)
            }}
            data-element-id={id}
            transform={transform}
            onMouseDown={e => {
              if (bbox) startDrag(e, id, bbox)
            }}
            style={{ cursor: 'pointer' }}
            dangerouslySetInnerHTML={{ __html: item.markup }}
          />
        )
      })}
      {Array.from(selectedIds).map(id => {
        const bbox = getBbox(id)
        return bbox ? <g key={`handles-${id}`}>{renderHandles(bbox, id)}</g> : null
      })}
    </g>
  )
}