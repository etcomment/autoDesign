import { useTemplateStore } from '../../templates/store'
import { useDiagramStore } from '../../store/diagramStore'
import { getTemplateByType } from '../../templates/registry'
import { NumberInput } from '../../ui/Input'
import { ColorField } from './ColorField'
import { fieldStyles } from './fieldStyles'
import { theme } from '../../lib/theme'
import { elementLabel, numericFields, parseTemplateElementId } from './templateElementUtils'

export function TemplateElementProperties() {
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
          if (parsed.prefix === 'circle') {
            currentTitle = String(item.value ?? item.date ?? item.quarter ?? item.label ?? item.title ?? 'YOUR\nTITLE')
          } else {
            currentTitle = String(item.label ?? item.title ?? item.name ?? item.text ?? '')
            currentSubtitle = String(item.subtitle ?? item.description ?? '')
            currentAmount = String(item.amount ?? '')
            currentPercentage = item.percentage != null ? String(item.percentage) : ''
          }
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
        if (parsed.prefix === 'circle' && field === 'title') {
          return { ...item, value: coerced }
        }
        if (parsed.collectionKey === 'lanes' && field === 'title') {
          return { ...item, label: coerced }
        }
        return { ...item, [field]: coerced }
      })

      updateTemplateData({
        ...templateData,
        [parsed.collectionKey]: newItems,
      } as never)
    }
  }

  return (
    <>
      <div style={fieldStyles.section}>
        <span style={styles.elementName}>
          {isMulti ? `${elements.length} éléments sélectionnés` : elementLabel(primaryId)}
        </span>
      </div>

      {!isMulti && (
        <div style={fieldStyles.section}>
          <label style={fieldStyles.sectionLabel}>Titre / Texte</label>
          <textarea
            value={currentTitle}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Titre..."
            style={fieldStyles.textarea}
            rows={2}
          />
        </div>
      )}

      {!isMulti && !parsed.isMainTitle && !parsed.isStartBanner && !parsed.isFinishBanner && parsed.prefix !== 'circle' && (
        <div style={fieldStyles.section}>
          <label style={fieldStyles.sectionLabel}>Sous-titre / Description</label>
          <textarea
            value={currentSubtitle}
            onChange={(e) => handleFieldChange('subtitle', e.target.value)}
            placeholder="Description..."
            style={fieldStyles.textarea}
            rows={3}
          />
        </div>
      )}

      {!isMulti && parsed.prefix === 'item' && currentAmount !== '' && (
        <div style={fieldStyles.section}>
          <label style={fieldStyles.sectionLabel}>Montant / Tarif</label>
          <input
            type="text"
            value={currentAmount}
            onChange={(e) => handleFieldChange('amount', e.target.value)}
            placeholder="Ex: €40,000"
            style={fieldStyles.textInput}
          />
        </div>
      )}

      {!isMulti && parsed.prefix === 'item' && currentPercentage !== '' && (
        <div style={fieldStyles.section}>
          <label style={fieldStyles.sectionLabel}>Pourcentage</label>
          <input
            type="number"
            min={0}
            max={100}
            value={currentPercentage}
            onChange={(e) => handleFieldChange('percentage', e.target.value)}
            placeholder="Ex: 40"
            style={fieldStyles.textInput}
          />
        </div>
      )}

      <div style={fieldStyles.section}>
        <label style={fieldStyles.sectionLabel}>Géométrie</label>
        <div style={styles.geometryGrid}>
          <NumberInput
            label="X (px)"
            value={Math.round(groupPos.x)}
            onChange={(newX) => {
              const dx = newX - groupPos.x
              elements.forEach(id => {
                const currentP = templateElementPositions[id] ?? primaryPos
                moveTemplateElement(id, { x: currentP.x + dx, y: currentP.y })
              })
            }}
          />
          <NumberInput
            label="Y (px)"
            value={Math.round(groupPos.y)}
            onChange={(newY) => {
              const dy = newY - groupPos.y
              elements.forEach(id => {
                const currentP = templateElementPositions[id] ?? primaryPos
                moveTemplateElement(id, { x: currentP.x, y: currentP.y + dy })
              })
            }}
          />
          <NumberInput
            label="Largeur (px)"
            value={Math.round(groupPos.width)}
            min={10}
            onChange={(newW) => {
              if (groupPos.width <= 0) return
              const scaleX = newW / groupPos.width
              elements.forEach(id => {
                const currentP = templateElementPositions[id] ?? primaryPos
                const relX = currentP.x - groupPos.x
                moveTemplateElement(id, { x: groupPos.x + relX * scaleX, y: currentP.y })
                resizeTemplateElement(id, { width: currentP.width * scaleX, height: currentP.height })
              })
            }}
          />
          <NumberInput
            label="Hauteur (px)"
            value={Math.round(groupPos.height)}
            min={10}
            onChange={(newH) => {
              if (groupPos.height <= 0) return
              const scaleY = newH / groupPos.height
              elements.forEach(id => {
                const currentP = templateElementPositions[id] ?? primaryPos
                const relY = currentP.y - groupPos.y
                moveTemplateElement(id, { x: currentP.x, y: groupPos.y + relY * scaleY })
                resizeTemplateElement(id, { width: currentP.width, height: currentP.height * scaleY })
              })
            }}
          />
        </div>

        <label style={{ ...fieldStyles.sectionLabel, marginTop: theme.spacing.xs }}>Rotation</label>
        <div style={styles.rangeRow}>
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
            style={fieldStyles.range}
          />
          <span style={fieldStyles.rangeValue}>{primaryRot}°</span>
        </div>
      </div>

      <ColorField
        label="Remplissage (Fill)"
        value={primaryFill}
        onChange={(c) => elements.forEach(id => updateTemplateColor(id, c))}
      />

      {supportsStroke && (
        <div style={fieldStyles.section}>
          <ColorField
            label="Contour (Stroke)"
            value={primaryStroke}
            onChange={(c) => elements.forEach(id => updateTemplateStrokeColor(id, c))}
          />
          <label style={fieldStyles.sectionLabel}>Épaisseur de contour</label>
          <div style={styles.rangeRow}>
            <input
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={primaryStrokeWidth}
              onChange={(e) => elements.forEach(id => updateTemplateStrokeWidth(id, Number(e.target.value)))}
              style={fieldStyles.range}
            />
            <span style={fieldStyles.rangeValue}>{primaryStrokeWidth}px</span>
          </div>
        </div>
      )}
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  elementName: {
    fontSize: theme.font.sizeSm,
    fontWeight: theme.font.weightSemibold,
    color: theme.color.textPrimary,
  },
  geometryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  rangeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
}
