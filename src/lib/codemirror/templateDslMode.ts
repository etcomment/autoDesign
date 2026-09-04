import { StreamLanguage, type StreamParser } from '@codemirror/language'
import { iconCompletionSource } from './iconAutocomplete'

const DIRECTIVE_KEYWORDS = new Set([
  'start', 'finish', 'progress', 'quarters', 'lanes', 'style', 'columns',
  'left', 'right', 'center', 'total', 'question', 'nodes',
])

const ITEM_KEYWORDS = new Set([
  'step', 'milestone', 'block', 'piece', 'level', 'metric', 'item', 'segment',
  'station', 'row', 'branch', 'primary', 'support', 'above', 'below', 'node',
  'comp', 'leaf', 'yes', 'no', 'line',
])

const KV_PREFIX = /^(val|pct|icon|date|lane):/

const templateDslParser: StreamParser<Record<string, never>> = {
  name: 'templateDsl',
  startState: () => ({}),
  token(stream) {
    if (stream.eatSpace()) return null

    if (stream.match(/^\/\//)) {
      stream.skipToEnd()
      return 'lineComment'
    }

    if (stream.match(/^@[A-Za-z][\w-]*/)) return 'meta'

    const word = stream.match(/^([\w-]+)/)
    if (word && typeof word !== 'boolean') {
      const value = word[1]!
      if (DIRECTIVE_KEYWORDS.has(value)) return 'keyword'
      if (ITEM_KEYWORDS.has(value)) return 'keyword'
      if (KV_PREFIX.test(value + 'x')) return 'propertyName'
      return 'variableName'
    }

    if (stream.match(/^"([^"]*)"|^'([^']*)'/)) return 'string'
    if (stream.match(/^#[0-9a-fA-F]{3,8}\b/)) return 'color'
    if (stream.match(/^\d+(\.\d+)?[%$€£¥]?/)) return 'number'
    if (stream.match(/^->/)) return 'operator'
    if (stream.match(/^[{}[\]()]/)) return 'bracket'
    if (stream.match(/^:/)) return 'operator'

    stream.next()
    return null
  },
}

export const templateDslLanguage = StreamLanguage.define(templateDslParser)
export const templateDslAutocomplete = templateDslLanguage.data.of({
  autocomplete: iconCompletionSource,
})
