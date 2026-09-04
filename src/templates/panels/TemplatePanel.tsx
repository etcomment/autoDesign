import { useState } from 'react'
import { useTemplateStore } from '../store'
import { getTemplatesByCategory } from '../registry'
import { Panel } from '../../ui/Panel'
import { theme } from '../../lib/theme'
import type { TemplateType } from '../types'

export function TemplatePanel() {
  const activeTemplate = useTemplateStore(s => s.activeTemplate)
  const selectTemplate = useTemplateStore(s => s.selectTemplate)
  const clearTemplate = useTemplateStore(s => s.clearTemplate)
  const importedTemplates = useTemplateStore(s => s.importedTemplates)

  const categories = getTemplatesByCategory()
  const merged = new Map(categories)
  for (const record of Object.values(importedTemplates)) {
    const list = merged.get(record.category) ?? []
    list.push({
      type: record.name,
      label: record.label,
      category: record.category,
      description: record.description,
      defaultData: record.data,
    })
    merged.set(record.category, list)
  }
  const categoryNames = [...merged.keys()]
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(categoryNames.length > 0 ? [categoryNames[0]!] : [])
  )

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }

  return (
    <Panel title="Templates" badge={categoryNames.length}>
      {categoryNames.map((category) => {
        const templates = merged.get(category)!
        const isExpanded = expandedCategories.has(category)
        return (
          <div key={category} style={styles.category}>
            <div
              style={styles.categoryHeader}
              onClick={() => toggleCategory(category)}
            >
              <span style={styles.arrow}>{isExpanded ? '▼' : '▶'}</span>
              {category}
            </div>
            {isExpanded && templates.map((tpl) => {
              const isActive = activeTemplate === tpl.type
              return (
                <button
                  key={tpl.type}
                  title={tpl.description || tpl.label}
                  style={{
                    ...styles.templateButton,
                    background: isActive ? theme.color.accent : theme.color.bgSurfaceHover,
                    color: isActive ? theme.color.textOnPrimary : theme.color.textSecondary,
                    border: isActive ? `1px solid ${theme.color.accent}` : `1px solid ${theme.color.border}`,
                  }}
                  onClick={() => selectTemplate(tpl.type as TemplateType)}
                >
                  {tpl.label}
                </button>
              )
            })}
          </div>
        )
      })}

      {activeTemplate && (
        <button style={styles.clearButton} onClick={clearTemplate}>
          Clear
        </button>
      )}
    </Panel>
  )
}

const styles: Record<string, React.CSSProperties> = {
  category: {
    marginBottom: theme.spacing.sm,
  },
  categoryHeader: {
    fontSize: theme.font.sizeXs,
    fontWeight: theme.font.weightSemibold,
    color: theme.color.textSecondary,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: theme.spacing.xs,
    paddingLeft: 2,
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  arrow: {
    fontSize: 10,
    display: 'inline-block',
    width: 12,
    textAlign: 'center' as const,
  },
  templateButton: {
    display: 'block',
    width: '100%',
    textAlign: 'left' as const,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontSize: theme.font.sizeXs,
    fontWeight: theme.font.weightMedium,
    cursor: 'pointer',
    border: `1px solid ${theme.color.border}`,
    marginBottom: 3,
    transition: theme.transition.fast,
  },
  clearButton: {
    width: '100%',
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    fontSize: theme.font.sizeXs,
    fontWeight: theme.font.weightSemibold,
    cursor: 'pointer',
    border: `1px solid ${theme.color.border}`,
    background: 'rgba(211, 47, 47, 0.06)',
    color: theme.color.danger,
    marginTop: theme.spacing.sm,
  },
}
