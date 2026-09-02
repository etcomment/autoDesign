import { useState, type ReactElement } from 'react'
import { Lock, Trash2, X, ShieldCheck } from 'lucide-react'
import { useTemplateStore } from '../templates/store'
import { theme } from '../lib/theme'

const ADMIN_PASSWORD = 'administrateur'

export function AdminPage(): ReactElement {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const importedTemplates = useTemplateStore(s => s.importedTemplates)
  const removeImportedTemplate = useTemplateStore(s => s.removeImportedTemplate)

  const closeAdmin = (): void => {
    window.location.hash = ''
  }

  const handleLogin = (): void => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError(null)
    } else {
      setError('Mot de passe incorrect.')
    }
  }

  const records = Object.values(importedTemplates)

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <ShieldCheck size={22} color={theme.color.accent} />
          <span style={styles.title}>Administration</span>
          <button onClick={closeAdmin} style={styles.closeBtn} title="Fermer">
            <X size={18} />
          </button>
        </div>

        {!isAuthenticated ? (
          <div style={styles.section}>
            <p style={styles.hint}>Cette page est réservée à l'administration des templates importés.</p>
            <div style={styles.passwordRow}>
              <Lock size={16} color={theme.color.textSecondary} />
              <input
                type="password"
                value={password}
                autoFocus
                placeholder="Mot de passe"
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleLogin()
                }}
                style={styles.input}
              />
              <button onClick={handleLogin} style={styles.button}>Valider</button>
            </div>
            {error && <p style={styles.error}>{error}</p>}
          </div>
        ) : (
          <div style={styles.section}>
            <p style={styles.hint}>
              {records.length} template{records.length > 1 ? 's' : ''} importé{records.length > 1 ? 's' : ''}
            </p>
            {records.length === 0 && <p style={styles.empty}>Aucun template importé.</p>}
            {records.map(record => (
              <div key={record.name} style={styles.row}>
                <div style={styles.rowInfo}>
                  <span style={styles.rowLabel}>{record.label}</span>
                  <span style={styles.rowMeta}>{record.category} · {record.name} · {record.slide.items.length} éléments</span>
                </div>
                <button
                  onClick={() => removeImportedTemplate(record.name)}
                  style={styles.deleteBtn}
                  title={`Supprimer ${record.name}`}
                >
                  <Trash2 size={15} />
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    position: 'fixed',
    inset: 0,
    background: theme.color.bgCanvas,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: theme.zIndex.modal,
  },
  card: {
    background: theme.color.bgSurface,
    border: `1px solid ${theme.color.border}`,
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadow.lg,
    width: 560,
    maxWidth: '92vw',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.lg,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.font.sizeLg,
    fontWeight: theme.font.weightSemibold,
    color: theme.color.textPrimary,
    flex: 1,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: theme.color.textSecondary,
    display: 'flex',
    padding: theme.spacing.xs,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    overflowY: 'auto',
  },
  hint: {
    fontSize: theme.font.sizeSm,
    color: theme.color.textSecondary,
    margin: 0,
  },
  empty: {
    fontSize: theme.font.sizeSm,
    color: theme.color.disabled,
    fontStyle: 'italic',
  },
  passwordRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    border: `1px solid ${theme.color.border}`,
    borderRadius: theme.radius.sm,
    fontSize: theme.font.sizeSm,
  },
  button: {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    background: theme.color.accent,
    color: theme.color.textOnPrimary,
    border: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.font.sizeSm,
    fontWeight: theme.font.weightSemibold,
    cursor: 'pointer',
  },
  error: {
    color: theme.color.danger,
    fontSize: theme.font.sizeSm,
    margin: 0,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    border: `1px solid ${theme.color.border}`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
  },
  rowInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
  },
  rowLabel: {
    fontSize: theme.font.sizeSm,
    fontWeight: theme.font.weightMedium,
    color: theme.color.textPrimary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  rowMeta: {
    fontSize: theme.font.sizeXs,
    color: theme.color.textSecondary,
  },
  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    background: 'rgba(211, 47, 47, 0.06)',
    color: theme.color.danger,
    border: `1px solid ${theme.color.danger}33`,
    borderRadius: theme.radius.sm,
    fontSize: theme.font.sizeXs,
    fontWeight: theme.font.weightSemibold,
    cursor: 'pointer',
  },
}
