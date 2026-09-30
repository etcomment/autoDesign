import { useEffect, useState } from 'react'
import { Sparkles, Loader2, Send } from 'lucide-react'
import { useTemplateStore } from '../store'
import { parseTemplateDsl } from '../dsl/parseTemplate'
import { requestDslGeneration } from '../services/aiClient'
import { Collapsible } from '../../ui/Collapsible'
import { Button } from '../../ui/Button'
import { CodeEditor } from '../../ui/CodeEditor'
import { theme } from '../../lib/theme'

const LIVE_PREVIEW_DELAY_MS = 700

const AVAILABLE_MODELS = [
  { id: 'stealth/space-bunny-alpha', label: 'Space Bunny Alpha (Stealth)' },
  { id: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
  { id: 'openai/gpt-4o', label: 'GPT-4o' },
  { id: 'openai/gpt-4o-mini', label: 'GPT-4o Mini' },
  { id: 'meta-llama/llama-3.3-70b-instruct', label: 'Llama 3.3 70B' },
]

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

  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedModel, setSelectedModel] = useState('stealth/space-bunny-alpha')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successInfo, setSuccessInfo] = useState<string | null>(null)

  useEffect(() => { setDsl(dslText) }, [dslText])

  const handleParse = () => {
    const data = parseTemplateDsl(dsl)
    if (data) selectTemplateWithData(data.type, data)
  }

  const handleGenerateAi = async () => {
    if (!aiPrompt.trim() || isGenerating) return
    setIsGenerating(true)
    setErrorMessage(null)
    setSuccessInfo(null)

    try {
      const result = await requestDslGeneration({
        prompt: aiPrompt,
        model: selectedModel,
      })

      setDsl(result.dsl)

      const parsed = parseTemplateDsl(result.dsl)
      if (parsed) {
        selectTemplateWithData(parsed.type, parsed)
        setSuccessInfo(`Généré avec succès (${parsed.type})`)
      } else {
        setSuccessInfo('DSL généré (cliquez sur Parse & Render)')
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de la génération IA'
      setErrorMessage(msg)
    } finally {
      setIsGenerating(false)
    }
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
      <div style={styles.aiBox}>
        <div style={styles.aiHeader}>
          <div style={styles.aiTitle}>
            <Sparkles size={15} color={theme.color.accent} />
            <span>Assistant IA — Générateur de DSL</span>
          </div>
          <select
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
            style={styles.modelSelect}
          >
            {AVAILABLE_MODELS.map(m => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>

        <textarea
          value={aiPrompt}
          onChange={e => setAiPrompt(e.target.value)}
          placeholder="Collez ici votre consigne ou vos données brutes (ex: 'Fais un budget 2026 avec 4 postes : R&D 60k prévu / 55k réalisé...')..."
          style={styles.aiTextarea}
          rows={3}
          disabled={isGenerating}
        />

        <div style={styles.aiActions}>
          <button
            onClick={handleGenerateAi}
            disabled={!aiPrompt.trim() || isGenerating}
            style={{
              ...styles.aiSubmitButton,
              opacity: !aiPrompt.trim() || isGenerating ? 0.6 : 1,
            }}
          >
            {isGenerating ? (
              <>
                <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Génération en cours...</span>
              </>
            ) : (
              <>
                <Send size={14} />
                <span>Générer le DSL</span>
              </>
            )}
          </button>

          {successInfo && (
            <span style={styles.successBadge}>{successInfo}</span>
          )}
        </div>

        {errorMessage && (
          <div style={styles.errorBanner}>{errorMessage}</div>
        )}
      </div>

      <CodeEditor
        value={dsl}
        onChange={setDsl}
        language="templates"
        placeholder="Cliquez sur un template pour générer le DSL..."
        minHeight="160px"
        maxHeight="320px"
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
  aiBox: {
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    background: '#f8fafc',
    border: `1px solid ${theme.color.border}`,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.xs,
  },
  aiTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: theme.font.sizeSm,
    fontWeight: theme.font.weightSemibold,
    color: '#1e293b',
  },
  modelSelect: {
    fontSize: 11,
    padding: '2px 6px',
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.color.border}`,
    background: 'white',
    color: '#334155',
    cursor: 'pointer',
  },
  aiTextarea: {
    width: '100%',
    padding: theme.spacing.xs,
    fontSize: theme.font.sizeXs,
    fontFamily: 'inherit',
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.color.border}`,
    background: 'white',
    color: '#1e293b',
    resize: 'vertical',
    outline: 'none',
    boxSizing: 'border-box',
  },
  aiActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  aiSubmitButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '5px 12px',
    fontSize: 12,
    fontWeight: 600,
    borderRadius: theme.radius.sm,
    border: 'none',
    background: theme.color.accent,
    color: 'white',
    cursor: 'pointer',
    transition: 'background 0.15s ease',
  },
  successBadge: {
    fontSize: 11,
    color: '#16a34a',
    fontWeight: 500,
  },
  errorBanner: {
    padding: '4px 8px',
    borderRadius: theme.radius.sm,
    background: '#fee2e2',
    color: '#b91c1c',
    fontSize: 11,
  },
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
