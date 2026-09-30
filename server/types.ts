export type RenderFormat = 'svg' | 'png' | 'pptx' | 'html'

export interface RenderOptions {
  format?: RenderFormat
  width?: number
  height?: number
}

export interface RenderRequest {
  dsl: string
  format?: RenderFormat
  width?: number
  height?: number
}

export interface RenderResult {
  content: Buffer
  contentType: string
  filename: string
}

export interface TemplateSummary {
  type: string
  label: string
  category: string
  description: string
  exampleDsl: string
}
