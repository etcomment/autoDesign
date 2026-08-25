import { useEffect, useState } from 'react'
import { useTemplateStore } from '../store'
import { parseTemplateDsl } from '../dsl/parseTemplate'
import { Collapsible } from '../../ui/Collapsible'
import { Button } from '../../ui/Button'
import { CodeEditor } from '../../ui/CodeEditor'
import { theme } from '../../lib/theme'

const LIVE_PREVIEW_DELAY_MS = 700

export function TemplateDslEditor() {
  return (
    <Collapsible title="Template DSL">
      <TemplateDslEditorBody />
    </Collapsible>
  )
}

export function TemplateDslEditorBody() {
  const selectTemplateWithData = useTemplateStore(s => s.selectTemplateWithData)
  const dslText = useTemplateStore(s => s.dslText)
  const [dsl, setDsl] = useState(dslText)
  const [livePreview, setLivePreview] = useState(false)

  useEffect(() => { setDsl(dslText) }, [dslText])

  const handleParse = () => {
    const data = parseTemplateDsl(dsl)
    if (data) selectTemplateWithData(data.type, data)
  }

  useEffect(() => {
    if (!livePreview || !dsl.trim()) return
    const timer = setTimeout(() => {
      const data = parseTemplateDsl(dsl)
      if (!data) return
      const state = useTemplateStore.getState()
      if (state.activeTemplate !== data.type) {
        state.selectTemplateWithData(data.type, data)
      } else {
        state.updateTemplateData(data)
      }
    }, LIVE_PREVIEW_DELAY_MS)
    return () => clearTimeout(timer)
  }, [dsl, livePreview])

  return (
    <>
      <CodeEditor
        value={dsl}
        onChange={setDsl}
        language="templates"
        placeholder="Cliquez sur un template pour générer le DSL..."
        minHeight="180px"
        maxHeight="360px"
      />
      <div style={styles.actions}>
        <button
          style={{ ...styles.liveButton, ...(livePreview ? styles.liveButtonActive : {}) }}
          onClick={() => setLivePreview(!livePreview)}
          title="Rendre automatiquement le template pendant la saisie"
        >
          <span style={{ ...styles.liveDot, ...(livePreview ? styles.liveDotActive : {}) }} />
          Live
        </button>
        <Button size="sm" onClick={handleParse} disabled={!dsl.trim()}>
          Parse & Render
        </Button>
      </div>
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  liveButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.color.border}`,
    background: theme.color.bgSurfaceHover,
    color: theme.color.textSecondary,
    fontSize: theme.font.sizeXs,
    fontWeight: theme.font.weightMedium,
    cursor: 'pointer',
    transition: theme.transition.fast,
  },
  liveButtonActive: {
    background: theme.color.accent,
    borderColor: theme.color.accent,
    color: theme.color.textOnPrimary,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: theme.radius.full,
    background: theme.color.disabled,
    transition: theme.transition.fast,
  },
  liveDotActive: {
    background: theme.color.textOnPrimary,
  },
}
