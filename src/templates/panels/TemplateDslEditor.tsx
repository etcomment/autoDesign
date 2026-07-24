import { useState } from 'react'
import { useTemplateStore } from '../store'
import { parseTemplateDsl } from '../dsl/parseTemplate'

export function TemplateDslEditor() {
  const selectTemplateWithData = useTemplateStore(s => s.selectTemplateWithData)
  const [collapsed, setCollapsed] = useState(true)

  const [dsl, setDsl] = useState(`@roadmap "Product Launch"
  start "Kickoff"
  finish "GA Release"

  style boxWidth 150
  style fontSize 13

  milestone "Alpha" "Internal testing\nphase 1 of 2"
    style fill #4a90d9

  milestone "Beta" "Early access"
    style fill #2ecc71
    style boxWidth 180

  milestone "RC1" "Release candidate"

  milestone "GA" "Go live"`)

  const handleParse = () => {
    const data = parseTemplateDsl(dsl)
    if (data) {
      selectTemplateWithData(data.type, data)
    }
  }

  return (
    <div style={styles.panel}>
      <div style={{ ...styles.title, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }} onClick={() => setCollapsed(!collapsed)}>
        <span>{collapsed ? '▶' : '▼'}</span>
        Template DSL
      </div>
      {!collapsed && (
        <>
          <textarea
        value={dsl}
        onChange={e => setDsl(e.target.value)}
        style={styles.textarea}
        rows={10}
        placeholder={`@roadmap "My Roadmap"\n  start "Begin"\n  finish "End"\n\n  milestone "Step 1" "Description"\n  milestone "Step 2"`}
        spellCheck={false}
      />
      <button style={styles.button} onClick={handleParse}>
        Parse & Render
      </button>
      <div style={styles.hint}>
        <strong>Commands:</strong> @roadmap start finish milestone<br />
        <strong>Grid:</strong> quarters lanes milestone Q:Lane "Title"<br />
        <strong>Style:</strong> style boxWidth 150 | style fontSize 13 | style fill #4a90d9<br />
        <strong>Line break:</strong> use \n in quoted text
        </div>
        </>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    padding: 8,
    borderTop: '1px solid #ddd',
    marginTop: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    margin: '0 0 6px 0',
    color: '#333',
  },
  textarea: {
    width: '100%',
    height: 140,
    padding: 6,
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 11,
    fontFamily: 'monospace',
    resize: 'vertical' as const,
    boxSizing: 'border-box' as const,
    marginBottom: 6,
    background: '#fafafa',
  },
  button: {
    width: '100%',
    padding: '6px 0',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    background: '#4a90d9',
    color: 'white',
    marginBottom: 6,
  },
  hint: {
    fontSize: 9,
    color: '#999',
    lineHeight: 1.4,
  },
}
