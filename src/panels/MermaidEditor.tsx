import { useState } from 'react'
import { useDiagramStore } from '../store/diagramStore'
import { parseMermaid } from '../mermaid/parseMermaid'

export function MermaidEditor() {
  const [dsl, setDsl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState(true)

  const mergeModel = useDiagramStore(s => s.mergeModel)

  const handleImport = () => {
    if (!dsl.trim()) return
    try {
      setError(null)
      const model = parseMermaid(dsl)
      mergeModel(model)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid Mermaid syntax')
    }
  }

  return (
    <div style={styles.container}>
      <button
        style={styles.toggle}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? '▶ Mermaid' : '▼ Mermaid'}
      </button>
      {!collapsed && (
        <div style={styles.body}>
          <textarea
            style={styles.textarea}
            value={dsl}
            onChange={(e) => setDsl(e.target.value)}
            placeholder={`graph TD\n  A[Start] --> B[End]`}
            rows={6}
          />
          {error && <div style={styles.error}>{error}</div>}
          <div style={styles.buttons}>
            <button style={styles.importButton} onClick={handleImport}>
              Import
            </button>
            <button
              style={styles.clearButton}
              onClick={() => { setDsl(''); setError(null) }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    borderBottom: '1px solid #ddd',
    background: '#fafafa',
  },
  toggle: {
    width: '100%',
    padding: '6px 12px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 600,
    color: '#555',
  },
  body: {
    padding: '0 12px 12px',
  },
  textarea: {
    width: '100%',
    padding: 8,
    border: '1px solid #ddd',
    borderRadius: 4,
    fontFamily: 'monospace',
    fontSize: 12,
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  error: {
    color: '#d32f2f',
    fontSize: 11,
    marginTop: 4,
    padding: '4px 8px',
    background: '#fde',
    borderRadius: 3,
  },
  buttons: {
    display: 'flex',
    gap: 8,
    marginTop: 8,
  },
  importButton: {
    padding: '4px 12px',
    border: 'none',
    borderRadius: 4,
    background: '#4a90d9',
    color: 'white',
    fontSize: 12,
    cursor: 'pointer',
  },
  clearButton: {
    padding: '4px 12px',
    border: '1px solid #ccc',
    borderRadius: 4,
    background: 'white',
    fontSize: 12,
    cursor: 'pointer',
  },
}
