import { DiagramModel } from '../core/model/DiagramModel'

interface ClassDef {
  name: string
  attributes: string[]
  methods: string[]
}

export function parseClassDiagram(dsl: string): DiagramModel {
  const model = new DiagramModel()
  const lines = dsl.split('\n')
  const classes: ClassDef[] = []
  const relations: { source: string; target: string }[] = []

  let currentClass: ClassDef | null = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || /^classDiagram/i.test(trimmed)) continue

    const classMatch = /^class\s+(\w[\w-]*)\s*(\{?)/.exec(trimmed)
    if (classMatch) {
      currentClass = { name: classMatch[1]!, attributes: [], methods: [] }
      classes.push(currentClass)
      if (!classMatch[2]) {
        currentClass = null
      }
      continue
    }

    if (trimmed === '}') {
      currentClass = null
      continue
    }

    if (currentClass) {
      const memberMatch = /^([+\-#~]?)\s*(.+)$/.exec(trimmed)
      if (memberMatch) {
        const rawVisibility = memberMatch[1] ?? ''
        const rest = (memberMatch[2] ?? '').trim()

        let visibility = ''
        if (rawVisibility === '+') visibility = '+ '
        else if (rawVisibility === '-') visibility = '- '
        else if (rawVisibility === '#') visibility = '# '
        else if (rawVisibility === '~') visibility = '~ '

        const methodMatch = /^(\w[\w-]*)\s*\(([^)]*)\)(?:\s*:?\s*(.*))?$/.exec(rest)
        if (methodMatch) {
          const methodName = methodMatch[1]!
          const params = methodMatch[2] ?? ''
          const returnType = methodMatch[3]?.trim() ?? ''
          const methodStr = params ? `${visibility}${methodName}(${params})` : `${visibility}${methodName}()`
          const fullMethod = returnType ? `${methodStr}: ${returnType}` : methodStr
          currentClass.methods.push(fullMethod)
        } else {
          const attrMatch = /^(\S+)\s+(\w[\w-]*)$/.exec(rest)
          if (attrMatch) {
            const attrType = attrMatch[1]!
            const attrName = attrMatch[2]!
            currentClass.attributes.push(`${visibility}${attrName}: ${attrType}`)
          }
        }
        continue
      }
      continue
    }

    const relationMatch = /^(\w[\w-]*)\s*(<\|--|--\|>|\*--|--\*|o--|--o|-->|<--|--|\.\.>|\.\.\|>|<\|\.\.|<\.\.\.|\.\.\.>)\s*(\w[\w-]*)/.exec(trimmed)
    if (relationMatch) {
      const sourceName = relationMatch[1]!
      const arrowType = relationMatch[2]!
      const targetName = relationMatch[3]!

      let source = sourceName
      let target = targetName

      if (arrowType.includes('<') && !arrowType.startsWith('<')) {
        source = targetName
        target = sourceName
      } else if (arrowType.includes('>') && arrowType.startsWith('<')) {
        source = targetName
        target = sourceName
      }

      relations.push({ source, target })
      continue
    }
  }

  const classByName = new Map<string, ClassDef>()
  for (const cls of classes) {
    classByName.set(cls.name, cls)
  }

  const classNameById = new Map<string, string>()
  let col = 0
  let row = 0
  const maxPerRow = 4

  for (const [name, cls] of classByName) {
    const totalLines = 1 + cls.attributes.length + cls.methods.length
    const classHeight = 30 + totalLines * 16 + 20
    const x = 100 + col * 220
    const y = 20 + row * 280

    const shape = model.addShape('rectangle', { x, y }, { width: 200, height: classHeight })
    const textLines = [name, ...cls.attributes, ...cls.methods]
    model.updateShapeText(shape.id, { content: textLines.join('\n'), fontAlign: 'left', fontSize: 12 })

    classNameById.set(name, shape.id)

    col++
    if (col >= maxPerRow) { col = 0; row++ }
  }

  for (const { source, target } of relations) {
    const sourceId = classNameById.get(source)
    const targetId = classNameById.get(target)
    if (sourceId && targetId) {
      model.addConnection(sourceId, targetId)
    }
  }

  return model
}
