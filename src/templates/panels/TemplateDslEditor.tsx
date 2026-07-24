import { useState, useEffect } from 'react'
import { useTemplateStore } from '../store'
import { parseTemplateDsl } from '../dsl/parseTemplate'

export function TemplateDslEditor() {
  const selectTemplateWithData = useTemplateStore(s => s.selectTemplateWithData)
  const dslText = useTemplateStore(s => s.dslText)
  const [collapsed, setCollapsed] = useState(true)
  const [dsl, setDsl] = useState('')

  useEffect(() => { setDsl(dslText) }, [dslText])

  const handleParse = () => {
    const data = parseTemplateDsl(dsl)
    if (data) selectTemplateWithData(data.type, data)
  }

  return (
    <div style={styles.panel}>
      <div style={{ ...styles.title, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }} onClick={() => setCollapsed(!collapsed)}>
        <span>{collapsed ? '\u25B6' : '\u25BC'}</span>
        Template DSL
      </div>
      {!collapsed && (
        <>
          <textarea
            value={dsl}
            onChange={e => setDsl(e.target.value)}
            style={styles.textarea}
            rows={8}
            placeholder="Cliquez sur un template pour générer le DSL..."
            spellCheck={false}
          />
          <button style={styles.button} onClick={handleParse}>
            Parse & Render
          </button>
        </>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  panel: { padding: 8, borderTop: '1px solid #ddd', marginTop: 4 },
  title: { fontSize: 13, fontWeight: 600, margin: '0 0 6px 0', color: '#333' },
  textarea: { width: '100%', height: 120, padding: 6, border: '1px solid #ccc', borderRadius: 4, fontSize: 11, fontFamily: 'monospace', resize: 'vertical' as const, boxSizing: 'border-box' as const, marginBottom: 6, background: '#fafafa' },
  button: { width: '100%', padding: '6px 0', borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#4a90d9', color: 'white' },
}
