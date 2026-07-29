import { useTemplateStore } from '../store'
import { useDiagramStore } from '../../store/diagramStore'
import { MIGSO_PALETTE } from '../../lib/theme'

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

function elementLabel(elementId: string): string {
  const dash = elementId.indexOf('-')
  if (dash < 0) return elementId
  const prefix = elementId.slice(0, dash)
  const name = elementId.slice(dash + 1)
  const labels: Record<string, string> = {
    milestone: 'Milestone', circle: 'Circle', block: 'Block', step: 'Step', piece: 'Piece',
    level: 'Level', section: 'Section', metric: 'Metric', row: 'Row',
    item: 'Item', node: 'Node', station: 'Station', branch: 'Branch',
    primary: 'Activity', support: 'Support',
    timeline: 'Timeline', start: 'Start', finish: 'Finish', chevron: 'Chevron',
  }
  return `${labels[prefix] ?? prefix}: ${name}`
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

function updateElementField(
  elementId: string,
  field: string,
  value: string,
  templateData: Record<string, unknown>,
): Record<string, unknown> {
  const prefix = elementId.split('-')[0]!
  const index = parseInt(elementId.split('-')[1]!, 10)
  if (isNaN(index)) return templateData
  const collectionKey = collectionKeys[prefix]
  if (!collectionKey) return templateData
  const items = templateData[collectionKey] as Record<string, unknown>[] | undefined
  if (!items || !items[index]) return templateData
  const newItems = items.map((item, i) => {
    if (i !== index) return item
    return { ...item, [field]: value }
  })
  return { ...templateData, [collectionKey]: newItems }
}

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

  const elements = [...selectedIds]
  const primaryId = elements[0]!
  const isMulti = elements.length > 1
  const primaryFill = templateColors[primaryId] ?? ''
  const primaryStroke = templateStrokeColors[primaryId] ?? ''
  const primaryStrokeWidth = templateStrokeWidths[primaryId] ?? 1
  const primaryPos = templateElementPositions[primaryId] ?? { x: 0, y: 0, width: 100, height: 100 }
  const primaryRot = templateElementRotations[primaryId] ?? 0

  const prefix = primaryId.split('-')[0]!
  const paramIndex = parseInt(primaryId.split('-')[1]!, 10)
  const collKey = collectionKeys[prefix]
  let currentTitle = ''
  let currentSubtitle = ''

  if (templateData) {
    if (primaryId === 'title' && typeof templateData.title === 'string') {
      currentTitle = templateData.title
    } else if (collKey && !isNaN(paramIndex)) {
      const items = (templateData as unknown as Record<string, unknown>)[collKey] as Record<string, string>[] | undefined
      if (items && items[paramIndex]) {
        currentTitle = items[paramIndex].title ?? items[paramIndex].name ?? items[paramIndex].text ?? ''
        currentSubtitle = items[paramIndex].subtitle ?? items[paramIndex].description ?? ''
      }
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    if (!templateData) return
    if (primaryId === 'title' && field === 'title') {
      updateTemplateData({ ...templateData, title: value })
      return
    }
    const updated = updateElementField(primaryId, field, value, templateData as unknown as Record<string, unknown>)
    updateTemplateData(updated as never)
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

      {!isMulti && (primaryId !== 'title') && (
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

      {/* Position & Size Controls */}
      <div style={styles.section}>
        <label style={styles.sectionLabel}>Géométrie</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 6 }}>
          <div>
            <label style={{ fontSize: 10, color: '#666' }}>X (px)</label>
            <input
              type="number"
              value={Math.round(primaryPos.x)}
              onChange={(e) => moveTemplateElement(primaryId, { x: Number(e.target.value), y: primaryPos.y })}
              style={styles.textInput}
            />
          </div>
          <div>
            <label style={{ fontSize: 10, color: '#666' }}>Y (px)</label>
            <input
              type="number"
              value={Math.round(primaryPos.y)}
              onChange={(e) => moveTemplateElement(primaryId, { x: primaryPos.x, y: Number(e.target.value) })}
              style={styles.textInput}
            />
          </div>
          <div>
            <label style={{ fontSize: 10, color: '#666' }}>Largeur (px)</label>
            <input
              type="number"
              value={Math.round(primaryPos.width)}
              onChange={(e) => resizeTemplateElement(primaryId, { width: Number(e.target.value), height: primaryPos.height })}
              style={styles.textInput}
            />
          </div>
          <div>
            <label style={{ fontSize: 10, color: '#666' }}>Hauteur (px)</label>
            <input
              type="number"
              value={Math.round(primaryPos.height)}
              onChange={(e) => resizeTemplateElement(primaryId, { width: primaryPos.width, height: Number(e.target.value) })}
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
            onChange={(e) => rotateTemplateElement(primaryId, Number(e.target.value))}
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
    </div>
  )
}

const paramsAllowSubtitle = new Set(['milestone', 'block', 'step', 'piece', 'level', 'section', 'item', 'node', 'branch', 'station', 'primary', 'support', 'dot', 'card', 'segment'])

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
