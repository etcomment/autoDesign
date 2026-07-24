import { useState } from 'react'
import { useTemplateStore } from '../store'
import { parseTemplateDsl } from '../dsl/parseTemplate'

const HINT = `@roadmap (ou @roadmap2..16) : start finish milestone quarters lanes style
@productRoadmap (@productRoadmap2..12) : quarters lanes milestone Q:Lane "Titre"
@process (@process1..5) : step "Titre" "Description"
@strategy (@strategy2..8) : block "01" "Titre" "Description"
@puzzle (@puzzle2..7) : piece "Titre" "Description" #couleur
@funnel (@funnel2..5) : level "Titre" pourcentage #couleur
@dashboard (@dashboard2..5) : metric "Label" "Valeur" "Variation"
@table (@table2..6) : columns "C1" "C2" | row "Label" "A" "B"
@agenda (@agenda2..4) : item "01" "Titre" "Durée"
@comparison (@comparison2..7) : left/right "Titre" | comp "Label" "L" "R"
@business (@business2..11) : center "Core" | nodes "A" "B" "C"
@brain (@brain2..4) : center "Main" | branch "Topic" "Desc"
@budget (@budget2..5) : total "$X" | line "Label" "Montant" %
@decision (@decision2) : question "Q?" | yes/no "X" -> "Target"
@goals (@goals1..5) : center "Vision" | metric "L" "Now" "Target"
@manufacturing (@manufacturing2..8) : station "Nom" "Description"
@valueChain (@valueChain2) : primary/support "Titre" "Description"
@iceberg (@iceberg2) : above/below "Titre" "Description"

Style: style boxWidth 150 | style fontSize 14 | style fill #4a90d9 | style stroke #333
Line break: \\n in quoted text`

export function TemplateDslEditor() {
  const selectTemplateWithData = useTemplateStore(s => s.selectTemplateWithData)
  const [collapsed, setCollapsed] = useState(true)
  const [dsl, setDsl] = useState('')

  const handleParse = () => {
    const data = parseTemplateDsl(dsl)
    if (data) {
      selectTemplateWithData(data.type, data)
    }
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
            placeholder={`Tapez votre DSL ici...\nEx: @roadmap "Mon plan"\n  milestone "Etape 1" "Description"`}
            spellCheck={false}
          />
          <div style={styles.hint}>{HINT}</div>
          <button style={styles.button} onClick={handleParse}>
            Parse & Render
          </button>
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
    height: 120,
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
  hint: {
    fontSize: 8,
    color: '#999',
    lineHeight: 1.5,
    marginBottom: 6,
    maxHeight: 200,
    overflowY: 'auto',
    whiteSpace: 'pre-line' as const,
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
    marginBottom: 4,
  },
}
