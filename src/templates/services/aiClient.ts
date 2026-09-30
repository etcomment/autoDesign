import { AUTO_DESIGN_SYSTEM_PROMPT } from '../dsl/systemPrompt'
import { parseTemplateDsl } from '../dsl/parseTemplate'

export interface GenerateDslClientOptions {
  prompt: string
  model?: string
  apiKey?: string
}

export interface GenerateDslClientResult {
  dsl: string
  model: string
  templateType?: string
}

function cleanMarkdownFences(raw: string): string {
  const trimmed = raw.trim()
  const codeBlockMatch = /^```(?:dsl|template|text)?\s*([\s\S]*?)\s*```$/i.exec(trimmed)
  if (codeBlockMatch && codeBlockMatch[1]) {
    return codeBlockMatch[1].trim()
  }
  return trimmed
}

export async function requestDslGeneration(options: GenerateDslClientOptions): Promise<GenerateDslClientResult> {
  const prompt = options.prompt.trim()
  if (!prompt) {
    throw new Error('Le prompt ne peut pas être vide.')
  }

  const model = options.model || 'stealth/space-bunny-alpha'
  const savedKey = typeof window !== 'undefined' ? localStorage.getItem('autodesign_openrouter_key') : null
  const apiKey = options.apiKey || savedKey || undefined

  try {
    const res = await fetch('/api/ai/generate-dsl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model,
        apiKey,
      }),
    })

    if (res.ok) {
      const data = await res.json()
      if (data.success && data.dsl) {
        return {
          dsl: data.dsl,
          model: data.model || model,
          templateType: data.templateType,
        }
      }
      throw new Error(data.error || 'Erreur inconnue du serveur')
    }
  } catch (err: unknown) {
    if (apiKey) {
      return callDirectOpenRouter(prompt, model, apiKey)
    }
    throw err
  }

  throw new Error('Impossible de contacter le serveur de génération DSL')
}

async function callDirectOpenRouter(prompt: string, model: string, apiKey: string): Promise<GenerateDslClientResult> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'autoDesign AI Assistant',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: AUTO_DESIGN_SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Erreur OpenRouter (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) {
    throw new Error('Réponse vide retournée par le modèle')
  }

  const dsl = cleanMarkdownFences(content)
  const parsed = parseTemplateDsl(dsl)

  return {
    dsl,
    model,
    templateType: parsed?.type,
  }
}
