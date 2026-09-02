import type { ImportedTemplateData } from '../types'
import type { ImportedSlideSvg } from './svgImport'

export function sanitizeImportedName(raw: string): string {
  const clean = raw.replace(/[^a-zA-Z0-9]/g, '')
  const pascal = clean.charAt(0).toUpperCase() + clean.slice(1)
  return `imported${pascal}`
}

export function generateImportedComponentSource(
  templateName: string,
  slide: ImportedSlideSvg,
  data: ImportedTemplateData,
): string {
  const componentName = `${templateName.charAt(0).toUpperCase()}${templateName.slice(1)}Template`
  const slideJson = JSON.stringify(slide, null, 2)
  const dataJson = JSON.stringify(data, null, 2)

  return `import type { ReactElement } from 'react'
import type { ImportedTemplateData } from '../types'
import { ImportedSvgTemplate } from './ImportedSvgTemplate'
import type { ImportedSlideSvg } from '../import/svgImport'

const SLIDE: ImportedSlideSvg = ${slideJson}

const DEFAULT_DATA: ImportedTemplateData = ${dataJson}

export function ${componentName}({ data }: { data?: ImportedTemplateData }): ReactElement {
  return <ImportedSvgTemplate slide={SLIDE} data={data ?? DEFAULT_DATA} />
}
`
}

export function downloadGeneratedComponent(fileName: string, source: string): void {
  const blob = new Blob([source], { type: 'text/x-typescript' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
