import { Router, type Request, type Response } from 'express'
import { TEMPLATES } from '../../src/templates/registry'
import { generateDslText } from '../../src/templates/dsl/parseTemplate'
import type { TemplateSummary } from '../types'

export function createTemplatesRouter(): Router {
  const router = Router()

  router.get('/', (_req: Request, res: Response) => {
    const templateSummaries: TemplateSummary[] = TEMPLATES.map(template => {
      let exampleDsl = ''
      try {
        exampleDsl = generateDslText(template.type, template.defaultData)
      } catch {
        exampleDsl = `@${template.type} "${template.label}"`
      }

      return {
        type: template.type,
        label: template.label,
        category: template.category,
        description: template.description,
        exampleDsl,
      }
    })

    res.status(200).json({
      count: templateSummaries.length,
      templates: templateSummaries,
    })
  })

  router.get('/:type', (req: Request, res: Response) => {
    const requestedType = req.params.type?.toLowerCase()
    const foundTemplate = TEMPLATES.find(
      template => template.type.toLowerCase() === requestedType
    )

    if (!foundTemplate) {
      res.status(404).json({
        error: `Template type '${req.params.type}' not found`,
      })
      return
    }

    let exampleDsl = ''
    try {
      exampleDsl = generateDslText(foundTemplate.type, foundTemplate.defaultData)
    } catch {
      exampleDsl = `@${foundTemplate.type} "${foundTemplate.label}"`
    }

    const summary: TemplateSummary = {
      type: foundTemplate.type,
      label: foundTemplate.label,
      category: foundTemplate.category,
      description: foundTemplate.description,
      exampleDsl,
    }

    res.status(200).json(summary)
  })

  return router
}
