import { generateSvg, exportCanvasToSvg } from './generateSvg'
import type { DiagramModel } from '../core/model/DiagramModel'

export async function generatePng(model: DiagramModel): Promise<Blob> {
  const svg = generateSvg(model)
  return rasterizeSvg(svg, 'image/png')
}

export async function generateJpg(model: DiagramModel): Promise<Blob> {
  const svg = generateSvg(model)
  return rasterizeSvg(svg, 'image/jpeg', 0.9)
}

export async function generateCanvasPng(): Promise<Blob> {
  const svg = exportCanvasToSvg()
  return rasterizeSvg(svg, 'image/png')
}

export async function generateCanvasJpg(): Promise<Blob> {
  const svg = exportCanvasToSvg()
  return rasterizeSvg(svg, 'image/jpeg', 0.9)
}

async function rasterizeSvg(svg: string, mimeType: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(url)
        reject(new Error('Canvas context not available'))
        return
      }
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(
        (result) => {
          URL.revokeObjectURL(url)
          if (result) resolve(result)
          else reject(new Error('Rasterization failed'))
        },
        mimeType,
        quality,
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load SVG'))
    }

    img.src = url
  })
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
