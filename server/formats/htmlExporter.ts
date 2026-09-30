import type { TemplateData } from '../../src/templates/types'
import type { RenderOptions } from '../types'
import { exportTemplateToSvg } from './svgExporter'

export function exportTemplateToHtml(data: TemplateData, options?: RenderOptions): string {
  const svgContent = exportTemplateToSvg(data, options)
  const title = data.title ? `${data.title} - autoDesign` : 'autoDesign Diagram'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      padding: 24px;
    }
    .diagram-container {
      width: 100%;
      max-width: 1200px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
      padding: 32px;
      overflow: hidden;
    }
    svg {
      width: 100%;
      height: auto;
      max-height: 85vh;
      display: block;
    }
  </style>
</head>
<body>
  <div class="diagram-container">
    ${svgContent}
  </div>
</body>
</html>`
}
