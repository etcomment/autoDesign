import { useTemplateStore } from '../store'
import { useDiagramStore } from '../../store/diagramStore'
import { MIGSO_PALETTE } from '../../lib/theme'
import { getTemplateByType } from '../registry'

const PRESET_COLORS = [
  '#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7',
  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
  '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
  '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b',
  '#333333', '#000000',
]

function ColorGrid({ currentColor, onPick, prefix }: { currentColor: string; onPick: (color: string) => void; prefix: string }) {
  return (
    <>
      <label style={{ fontSize: 9, color: '#999', marginBottom: 3, display: 'block' }}>MIGSO-PCUBED</label>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(6, 1fr)`, gap: 3, marginBottom: 6 }}>
        {MIGSO_PALETTE.map((color) => (
          <button
            key={`${prefix}m-${color}`}
            style={{
              ...styles.colorButton,
              backgroundColor: color,
              border: currentColor === color ? '2px solid #333' : '1px solid #ccc',
            }}
            onClick={() => onPick(color)}
            title={color}
          />
        ))}
      </div>
      <label style={{ fontSize: 9, color: '#999', marginBottom: 3, display: 'block' }}>Standard</label>
      <div style={styles.colorGrid}>
        {PRESET_COLORS.map((color) => (
          <button
            key={`${prefix}s-${color}`}
            style={{
              ...styles.colorButton,
              backgroundColor: color,
              border: currentColor === color ? '2px solid #333' : '1px solid #ccc',
            }}
            onClick={() => onPick(color)}
            title={color}
          />
        ))}
      </div>
    </>
  )
}

const collectionKeys: Record<string, string> = {
  milestone: 'milestones',
  circle: 'milestones',
  block: 'blocks',
  step: 'steps',
  piece: 'pieces',
  level: 'levels',
  section: 'sections',
  metric: 'metrics',
  row: 'rows',
  item: 'items',
  node: 'nodes',
  branch: 'branches',
  station: 'stations',
  primary: 'primary',
  support: 'support',
  dot: 'milestones',
  card: 'milestones',
  tick: 'milestones',
  segment: 'segments',
  ring: 'rings',
  bar: 'bars',
  gauge: 'gauges',
  entry: 'entries',
  thermo: 'thermos',
  prod: 'products',
  q: 'quarters',
  qa: 'qaItems',
  quadrant: 'quadrants',
}

interface ParsedElement {
  prefix: string
  collectionKey?: string
  index: number
  isStartBanner?: boolean
  isFinishBanner?: boolean
  isMainTitle?: boolean
}

function parseTemplateElementId(elementId: string): ParsedElement {
  const parts = elementId.split('-')
  
  if (parts.includes('start')) {
    return { prefix: 'banner', isStartBanner: true, index: NaN }
  }
  if (parts.includes('finish')) {
    return { prefix: 'banner', isFinishBanner: true, index: NaN }
  }
  if (parts.length === 1 && parts[0] === 'title') {
    return { prefix: 'title', isMainTitle: true, index: NaN }
  }
  if (parts.includes('title') && !parts.includes('card') && !parts.includes('item') && !parts.includes('ms')) {
    return { prefix: 'title', isMainTitle: true, index: NaN }
  }

  // Find numeric index from parts
  let rawIdx = NaN
  for (let i = parts.length - 1; i >= 0; i--) {
    const parsed = parseInt(parts[i]!, 10)
    if (!isNaN(parsed)) {
      rawIdx = parsed
      break
    }
  }

  // Find prefix matching collectionKeys
  let prefix = ''
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i]!
    if (collectionKeys[part]) {
      prefix = part
      break
    }
  }

  if (!prefix && parts.length > 0) {
    prefix = parts[0]!
  }

  const collectionKey = collectionKeys[prefix]
  return { prefix, collectionKey, index: rawIdx }
}

function elementLabel(elementId: string): string {
  const parsed = parseTemplateElementId(elementId)
  if (parsed.isMainTitle) return 'Titre Principal'
  if (parsed.isStartBanner) return 'Bannière Début (Start)'
  if (parsed.isFinishBanner) return 'Bannière Fin (Finish)'
  const labels: Record<string, string> = {
    milestone: 'Jalon', circle: 'Cercle', block: 'Bloc', step: 'Étape', piece: 'Pièce',
    level: 'Niveau', section: 'Section', metric: 'Métrique', row: 'Ligne',
    item: 'Élément', node: 'Nœud', station: 'Station', branch: 'Branche',
    primary: 'Activité', support: 'Support', card: 'Carte Jalon',
    timeline: 'Chronologie', start: 'Début', finish: 'Fin', chevron: 'Chevron',
  }
  const label = labels[parsed.prefix] ?? parsed.prefix
  return !isNaN(parsed.index) ? `${label} ${parsed.index + 1}` : label
}

const numericFields = new Set(['percentage', 'width', 'height', 'x', 'y'])

export function TemplatePropertiesPanel() {
  const activeTemplate = useTemplateStore(s => s.activeTemplate)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const selectedShapeIds = useDiagramStore(s => s.selectedShapeIds)
  const templateColors = useTemplateStore(s => s.templateElementColors)
  const templateStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)
  const templateElementRotations = useTemplateStore(s => s.templateElementRotations)
  const templateData = useTemplateStore(s => s.templateData)
  
  const updateTemplateColor = useTemplateStore(s => s.updateTemplateColor)
  const updateTemplateStrokeColor = useTemplateStore(s => s.updateTemplateStrokeColor)
  const updateTemplateStrokeWidth = useTemplateStore(s => s.updateTemplateStrokeWidth)
  const updateTemplateData = useTemplateStore(s => s.updateTemplateData)
  const moveTemplateElement = useTemplateStore(s => s.moveTemplateElement)
  const resizeTemplateElement = useTemplateStore(s => s.resizeTemplateElement)
  const rotateTemplateElement = useTemplateStore(s => s.rotateTemplateElement)

  if (!activeTemplate || selectedIds.size === 0 || selectedShapeIds.size > 0) return null

  const tplDef = getTemplateByType(activeTemplate)
  const supportsStroke = tplDef?.supportsStroke ?? true

  const elements = [...selectedIds]
  const primaryId = elements[0]!
  const isMulti = elements.length > 1
  const primaryPos = templateElementPositions[primaryId] ?? { x: 0, y: 0, width: 100, height: 100 }
  const primaryRot = templateElementRotations[primaryId] ?? 0
  const primaryFill = templateColors[primaryId] ?? ''
  const primaryStroke = templateStrokeColors[primaryId] ?? ''
  const primaryStrokeWidth = templateStrokeWidths[primaryId] ?? 1
  let groupPos = primaryPos
  if (isMulti) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    elements.forEach(id => {
      const p = templateElementPositions[id]
      if (p) {
        minX = Math.min(minX, p.x)
        minY = Math.min(minY, p.y)
        maxX = Math.max(maxX, p.x + p.width)
        maxY = Math.max(maxY, p.y + p.height)
      }
    })
    if (minX !== Infinity) {
      groupPos = { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
    }
  }

  const parsed = parseTemplateElementId(primaryId)
  let currentTitle = ''
  let currentSubtitle = ''
  let currentAmount = ''
  let currentPercentage = ''

  if (templateData) {
    if (parsed.isMainTitle && typeof templateData.title === 'string') {
      currentTitle = templateData.title
    } else if (parsed.isStartBanner && typeof (templateData as Record<string, unknown>).startLabel === 'string') {
      currentTitle = (templateData as Record<string, unknown>).startLabel as string
    } else if (parsed.isFinishBanner && typeof (templateData as Record<string, unknown>).finishLabel === 'string') {
      currentTitle = (templateData as Record<string, unknown>).finishLabel as string
    } else if (parsed.collectionKey && !isNaN(parsed.index)) {
      const items = (templateData as unknown as Record<string, unknown>)[parsed.collectionKey] as Record<string, unknown>[] | undefined
      if (items) {
        const item = items[parsed.index] ?? (parsed.index > 0 ? items[parsed.index - 1] : undefined)
        if (item) {
          currentTitle = String(item.label ?? item.title ?? item.name ?? item.text ?? '')
          currentSubtitle = String(item.subtitle ?? item.description ?? '')
          currentAmount = String(item.amount ?? '')
          currentPercentage = item.percentage != null ? String(item.percentage) : ''
        }
      }
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    if (!templateData) return

    if (parsed.isMainTitle && field === 'title') {
      updateTemplateData({ ...templateData, title: value })
      return
    }
    if (parsed.isStartBanner && field === 'title') {
      updateTemplateData({ ...templateData, startLabel: value } as never)
      return
    }
    if (parsed.isFinishBanner && field === 'title') {
      updateTemplateData({ ...templateData, finishLabel: value } as never)
      return
    }

    if (parsed.collectionKey && !isNaN(parsed.index)) {
      const items = (templateData as unknown as Record<string, unknown>)[parsed.collectionKey] as Record<string, unknown>[] | undefined
      if (!items) return

      let targetIndex = parsed.index
      if (!items[targetIndex] && targetIndex > 0 && items[targetIndex - 1]) {
        targetIndex = targetIndex - 1
      }
      if (!items[targetIndex]) return

      const coerced = numericFields.has(field) ? (value === '' ? '' : Number(value)) : value
      
      const newItems = items.map((item, i) => {
        if (i !== targetIndex) return item
        return { ...item, [field]: coerced }
      })

      updateTemplateData({
        ...templateData,
        [parsed.collectionKey]: newItems,
      } as never)
    }
  }

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Propriétés de l'élément</h3>

      <div style={styles.section}>
        <label style={styles.label}>
          {isMulti ? `${elements.length} éléments sélectionnés` : elementLabel(primaryId)}
        </label>
      </div>

      {!isMulti && (
        <div style={styles.section}>
          <label style={styles.sectionLabel}>Titre / Texte</label>
          <textarea
            value={currentTitle}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Titre..."
            style={styles.textarea}
            rows={2}
          />
        </div>
      )}

      {!isMulti && !parsed.isMainTitle && !parsed.isStartBanner && !parsed.isFinishBanner && (
        <div style={styles.section}>
          <label style={styles.sectionLabel}>Sous-titre / Description</label>
          <textarea
            value={currentSubtitle}
            onChange={(e) => handleFieldChange('subtitle', e.target.value)}
            placeholder="Description..."
            style={styles.textarea}
            rows={3}
          />
        </div>
      )}

      {!isMulti && parsed.prefix === 'item' && currentAmount !== '' && (
        <div style={styles.section}>
          <label style={styles.sectionLabel}>Montant / Tarif</label>
          <input
            type="text"
            value={currentAmount}
            onChange={(e) => handleFieldChange('amount', e.target.value)}
            placeholder="Ex: €40,000"
            style={styles.textInput}
          />
        </div>
      )}

      {!isMulti && parsed.prefix === 'item' && currentPercentage !== '' && (
        <div style={styles.section}>
          <label style={styles.sectionLabel}>Pourcentage</label>
          <input
            type="number"
            min={0}
            max={100}
            value={currentPercentage}
            onChange={(e) => handleFieldChange('percentage', e.target.value)}
            placeholder="Ex: 40"
            style={styles.textInput}
          />
        </div>
      )}

      {/* Position & Size Controls */}
      <div style={styles.section}>
        <label style={styles.sectionLabel}>Géométrie</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 6 }}>
          <div>
            <label style={{ fontSize: 10, color: '#666' }}>X (px)</label>
            <input
              type="number"
              value={Math.round(groupPos.x)}
              onChange={(e) => {
                const newX = Number(e.target.value)
                const dx = newX - groupPos.x
                elements.forEach(id => {
                  const currentP = templateElementPositions[id] ?? primaryPos
                  moveTemplateElement(id, { x: currentP.x + dx, y: currentP.y })
                })
              }}
              style={styles.textInput}
            />
          </div>
          <div>
            <label style={{ fontSize: 10, color: '#666' }}>Y (px)</label>
            <input
              type="number"
              value={Math.round(groupPos.y)}
              onChange={(e) => {
                const newY = Number(e.target.value)
                const dy = newY - groupPos.y
                elements.forEach(id => {
                  const currentP = templateElementPositions[id] ?? primaryPos
                  moveTemplateElement(id, { x: currentP.x, y: currentP.y + dy })
                })
              }}
              style={styles.textInput}
            />
          </div>
          <div>
            <label style={{ fontSize: 10, color: '#666' }}>Largeur (px)</label>
            <input
              type="number"
              value={Math.round(groupPos.width)}
              onChange={(e) => {
                const newW = Math.max(10, Number(e.target.value))
                if (groupPos.width <= 0) return
                const scaleX = newW / groupPos.width
                elements.forEach(id => {
                  const currentP = templateElementPositions[id] ?? primaryPos
                  const relX = currentP.x - groupPos.x
                  moveTemplateElement(id, { x: groupPos.x + relX * scaleX, y: currentP.y })
                  resizeTemplateElement(id, { width: currentP.width * scaleX, height: currentP.height })
                })
              }}
              style={styles.textInput}
            />
          </div>
          <div>
            <label style={{ fontSize: 10, color: '#666' }}>Hauteur (px)</label>
            <input
              type="number"
              value={Math.round(groupPos.height)}
              onChange={(e) => {
                const newH = Math.max(10, Number(e.target.value))
                if (groupPos.height <= 0) return
                const scaleY = newH / groupPos.height
                elements.forEach(id => {
                  const currentP = templateElementPositions[id] ?? primaryPos
                  const relY = currentP.y - groupPos.y
                  moveTemplateElement(id, { x: currentP.x, y: groupPos.y + relY * scaleY })
                  resizeTemplateElement(id, { width: currentP.width, height: currentP.height * scaleY })
                })
              }}
              style={styles.textInput}
            />
          </div>
        </div>

        <label style={{ ...styles.sectionLabel, marginTop: 6 }}>Rotation</label>
        <div style={styles.row}>
          <input
            type="range"
            min={0}
            max={360}
            step={1}
            value={primaryRot}
            onChange={(e) => {
              const targetRot = Number(e.target.value)
              if (elements.length <= 1) {
                elements.forEach(id => rotateTemplateElement(id, targetRot))
                return
              }

              let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
              elements.forEach(id => {
                const pos = templateElementPositions[id] ?? primaryPos
                minX = Math.min(minX, pos.x)
                minY = Math.min(minY, pos.y)
                maxX = Math.max(maxX, pos.x + pos.width)
                maxY = Math.max(maxY, pos.y + pos.height)
              })

              const centerX = minX + (maxX - minX) / 2
              const centerY = minY + (maxY - minY) / 2
              const deltaAngle = targetRot - primaryRot
              const rad = (deltaAngle * Math.PI) / 180
              const cos = Math.cos(rad)
              const sin = Math.sin(rad)

              elements.forEach(id => {
                const pos = templateElementPositions[id] ?? primaryPos
                const curRot = templateElementRotations[id] ?? 0
                const sCenterX = pos.x + pos.width / 2
                const sCenterY = pos.y + pos.height / 2
                const relX = sCenterX - centerX
                const relY = sCenterY - centerY

                const newCenterX = centerX + (relX * cos - relY * sin)
                const newCenterY = centerY + (relX * sin + relY * cos)

                moveTemplateElement(id, { x: newCenterX - pos.width / 2, y: newCenterY - pos.height / 2 })
                let newRot = (curRot + deltaAngle) % 360
                if (newRot < 0) newRot += 360
                rotateTemplateElement(id, Math.round(newRot))
              })
            }}
            style={styles.range}
          />
          <span style={styles.value}>{primaryRot}°</span>
        </div>
      </div>

      <div style={styles.section}>
        <label style={styles.sectionLabel}>Remplissage (Fill)</label>
        <ColorGrid currentColor={primaryFill} onPick={(c) => elements.forEach(id => updateTemplateColor(id, c))} prefix="tpl-f-" />
        <div style={styles.row}>
          <input
            type="color"
            value={primaryFill || '#ffffff'}
            onChange={(e) => elements.forEach(id => updateTemplateColor(id, e.target.value))}
            style={styles.colorInput}
          />
        </div>
      </div>

      {supportsStroke && (
      <div style={styles.section}>
        <label style={styles.sectionLabel}>Contour (Stroke)</label>
        <ColorGrid currentColor={primaryStroke} onPick={(c) => elements.forEach(id => updateTemplateStrokeColor(id, c))} prefix="tpl-s-" />
        <div style={styles.row}>
          <input
            type="color"
            value={primaryStroke || '#000000'}
            onChange={(e) => elements.forEach(id => updateTemplateStrokeColor(id, e.target.value))}
            style={styles.colorInput}
          />
        </div>
        <label style={{ ...styles.sectionLabel, marginTop: 8 }}>Épaisseur de contour</label>
        <div style={styles.row}>
          <input
            type="range"
            min={0}
            max={10}
            step={0.5}
            value={primaryStrokeWidth}
            onChange={(e) => elements.forEach(id => updateTemplateStrokeWidth(id, Number(e.target.value)))}
            style={styles.range}
          />
          <span style={styles.value}>{primaryStrokeWidth}px</span>
        </div>
      </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    width: '100%',
    background: '#ffffff',
    borderBottom: '1px solid #ddd',
    padding: 12,
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    margin: '0 0 12px 0',
    color: '#333',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    display: 'block',
    fontSize: 11,
    fontWeight: 500,
    color: '#333',
  },
  sectionLabel: {
    display: 'block',
    fontSize: 11,
    fontWeight: 500,
    color: '#666',
    marginBottom: 6,
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: 3,
    marginBottom: 8,
  },
  colorButton: {
    width: 22,
    height: 22,
    borderRadius: 3,
    cursor: 'pointer',
    padding: 0,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  colorInput: {
    width: 32,
    height: 24,
    padding: 0,
    border: 'none',
    cursor: 'pointer',
  },
  range: {
    flex: 1,
    cursor: 'pointer',
  },
  value: {
    fontSize: 12,
    color: '#666',
    minWidth: 30,
  },
  textInput: {
    width: '100%',
    padding: '4px 8px',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 12,
    boxSizing: 'border-box' as const,
  },
  textarea: {
    width: '100%',
    padding: '4px 8px',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 12,
    boxSizing: 'border-box' as const,
    resize: 'vertical' as const,
    fontFamily: 'inherit',
  },
}
