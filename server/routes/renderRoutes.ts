import { Router, type Request, type Response, type NextFunction } from 'express'
import type { RenderFormat, RenderOptions } from '../types'
import { renderTemplateFromDsl } from '../services/renderService'

const VALID_FORMATS = new Set<string>(['svg', 'png', 'pptx', 'html'])

function extractDsl(req: Request): string {
  if (typeof req.body === 'string') {
    return req.body.trim()
  }
  if (typeof req.body === 'object' && req.body !== null && typeof req.body.dsl === 'string') {
    return req.body.dsl.trim()
  }
  return ''
}

function resolveFormat(req: Request): RenderFormat {
  const paramFormat = req.params.format?.toLowerCase()
  if (paramFormat) {
    if (!VALID_FORMATS.has(paramFormat)) {
      throw new Error(`Invalid format in URL: '${paramFormat}'. Must be one of: svg, png, pptx, html`)
    }
    return paramFormat as RenderFormat
  }

  const bodyFormat = typeof req.body === 'object' && req.body !== null ? req.body.format : undefined
  const queryFormat = typeof req.query.format === 'string' ? req.query.format : undefined
  const formatCandidate = (bodyFormat || queryFormat || 'svg').toLowerCase()

  if (!VALID_FORMATS.has(formatCandidate)) {
    throw new Error(`Invalid format: '${formatCandidate}'. Must be one of: svg, png, pptx, html`)
  }

  return formatCandidate as RenderFormat
}

function resolveDimensions(req: Request): { width?: number; height?: number } {
  const body = typeof req.body === 'object' && req.body !== null ? req.body : {}
  const rawWidth = body.width ?? req.query.width
  const rawHeight = body.height ?? req.query.height

  const width = rawWidth ? Number(rawWidth) : undefined
  const height = rawHeight ? Number(rawHeight) : undefined

  return { width, height }
}

async function handleRender(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dsl = extractDsl(req)
    if (!dsl) {
      res.status(400).json({
        error: 'Missing DSL input. Please provide DSL code in body.dsl (JSON) or as raw text body.',
      })
      return
    }

    const format = resolveFormat(req)
    const dimensions = resolveDimensions(req)

    const options: RenderOptions = {
      format,
      width: dimensions.width,
      height: dimensions.height,
    }

    const result = await renderTemplateFromDsl(dsl, options)

    res.setHeader('Content-Type', result.contentType)
    res.setHeader('Content-Disposition', `inline; filename="${result.filename}"`)
    res.status(200).send(result.content)
  } catch (error) {
    next(error)
  }
}

export function createRenderRouter(): Router {
  const router = Router()

  router.post('/', handleRender)
  router.post('/:format', handleRender)

  return router
}
