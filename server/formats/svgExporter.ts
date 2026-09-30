import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import type { TemplateData } from '../../src/templates/types'
import { TEMPLATE_MAP } from '../../src/templates/TemplateRenderer'
import type { RenderOptions } from '../types'

const globalScope = globalThis as unknown as { React?: typeof React }
if (!globalScope.React) {
  globalScope.React = React
}

const DEFAULT_WIDTH = 1000
const DEFAULT_HEIGHT = 600

export function exportTemplateToSvg(data: TemplateData, options?: RenderOptions): string {
  const componentRenderer = TEMPLATE_MAP[data.type]
  if (!componentRenderer) {
    throw new Error(`Unsupported template type: ${data.type}`)
  }

  const renderedContent = renderToStaticMarkup(componentRenderer({ data }))
  const width = options?.width ?? DEFAULT_WIDTH
  const height = options?.height ?? DEFAULT_HEIGHT

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${DEFAULT_WIDTH} ${DEFAULT_HEIGHT}" width="${width}" height="${height}">
  <style>
    text { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
  </style>
  ${renderedContent}
</svg>`
}
