import { useState, useRef, type ChangeEvent } from 'react'
import JSZip from 'jszip'
import { XMLParser } from 'fast-xml-parser'
import { X, Check, FileUp, Sparkles, AlertCircle, RefreshCw } from 'lucide-react'
import { useTemplateStore } from '../store'

interface PptxImportModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ExtractedSlidePreview {
  slideNumber: number
  category: string
  shapesCount: number
  colors: string[]
  sampleText: string
  shapes: { x: number; y: number; w: number; h: number; fill?: string; stroke?: string; text?: string }[]
}

export function PptxImportModal({ isOpen, onClose }: PptxImportModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [templateName, setTemplateName] = useState('ImportedTemplate')
  const [categoryName, setCategoryName] = useState('Other')
  const [previews, setPreviews] = useState<ExtractedSlidePreview[]>([])
  const [selectedSlideIdx, setSelectedSlideIdx] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return
    await processFile(selectedFile)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (!droppedFile) return
    await processFile(droppedFile)
  }

  const processFile = async (inputFile: File) => {
    setFile(inputFile)
    setErrorMsg(null)
    setIsLoading(true)
    setPreviews([])

    const defaultName = inputFile.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '')
    setTemplateName(defaultName || 'CustomTemplate')

    try {
      const lowerName = inputFile.name.toLowerCase()
      if (lowerName.endsWith('.pptx') || lowerName.endsWith('.potx')) {
        const zip = await JSZip.loadAsync(inputFile)
        let slideFiles = Object.keys(zip.files)
          .filter(f => f.startsWith('ppt/slides/slide') && f.endsWith('.xml'))

        if (slideFiles.length === 0) {
          slideFiles = Object.keys(zip.files).filter(f => f.startsWith('ppt/slideLayouts/slideLayout') && f.endsWith('.xml'))
        }

        slideFiles.sort((a, b) => {
          const numA = Number.parseInt(a.replace(/[^0-9]/g, '') || '0', 10)
          const numB = Number.parseInt(b.replace(/[^0-9]/g, '') || '0', 10)
          return numA - numB
        })

        if (slideFiles.length === 0) {
          throw new Error('Aucune diapositive ou masquage n’a été trouvé dans ce fichier PowerPoint (.potx / .pptx).')
        }

        const extractedPreviews: ExtractedSlidePreview[] = []
        const parser = new XMLParser({ ignoreAttributes: false })

        let currentCategory = 'Other'

        for (let i = 0; i < slideFiles.length; i++) {
          const sFile = slideFiles[i]!
          const slideXml = await zip.file(sFile)!.async('text')
          const jsonObj = parser.parse(slideXml)
          const spTree = jsonObj['p:sld']?.['p:cSld']?.['p:spTree'] || jsonObj['p:sldLayout']?.['p:cSld']?.['p:spTree']

          const rawShapes = spTree ? (Array.isArray(spTree['p:sp']) ? spTree['p:sp'] : [spTree['p:sp']].filter(Boolean)) : []
          const parsedShapes: { x: number; y: number; w: number; h: number; fill?: string; stroke?: string; text?: string }[] = []
          const colorsFound = new Set<string>()
          let textSample = ''

          for (const sp of rawShapes) {
            const xfrm = sp['p:spPr']?.['a:xfrm']
            const off = xfrm?.['a:off']
            const ext = xfrm?.['a:ext']

            const x = off?.['@_x'] ? Math.round((Number.parseInt(off['@_x'], 10) / 914400) * 96) : 50
            const y = off?.['@_y'] ? Math.round((Number.parseInt(off['@_y'], 10) / 914400) * 96) : 50
            const w = ext?.['@_cx'] ? Math.round((Number.parseInt(ext['@_cx'], 10) / 914400) * 96) : 150
            const h = ext?.['@_cy'] ? Math.round((Number.parseInt(ext['@_cy'], 10) / 914400) * 96) : 80

            let fill = sp['p:spPr']?.['a:solidFill']?.['a:srgbClr']?.['@_val']
            if (fill) fill = `#${fill}`
            if (fill) colorsFound.add(fill)

            let textVal = ''
            const txBody = sp['p:txBody']
            if (txBody) {
              const pList = Array.isArray(txBody['a:p']) ? txBody['a:p'] : [txBody['a:p']].filter(Boolean)
              for (const p of pList) {
                const rList = Array.isArray(p['a:r']) ? p['a:r'] : [p['a:r']].filter(Boolean)
                for (const r of rList) {
                  if (r['a:t']) {
                    const t = typeof r['a:t'] === 'object' ? r['a:t']['#text'] : r['a:t']
                    if (t) textVal += ` ${t}`
                  }
                }
              }
            }
            textVal = textVal.trim()
            if (textVal && !textSample) textSample = textVal

            parsedShapes.push({ x, y, w, h, fill: fill ?? '#282a5d', text: textVal })
          }

          if (parsedShapes.length <= 3 && textSample && !textSample.includes('Description')) {
            currentCategory = textSample
          }

          extractedPreviews.push({
            slideNumber: i + 1,
            category: currentCategory,
            shapesCount: parsedShapes.length,
            colors: Array.from(colorsFound),
            sampleText: textSample || `Diapositive ${i + 1}`,
            shapes: parsedShapes,
          })
        }

        setPreviews(extractedPreviews)
        if (extractedPreviews[0]?.category) {
          setCategoryName(extractedPreviews[0].category)
        }
      } else {
        throw new Error('Veuillez sélectionner un fichier PowerPoint valide (.pptx ou .potx).')
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Erreur lors de la lecture du fichier PowerPoint.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleValidateImport = () => {
    if (previews.length === 0) return

    const cleanName = templateName.toLowerCase().replace(/[^a-z0-9]/g, '')

    useTemplateStore.setState(s => ({
      ...s,
      selectedTemplateType: cleanName,
    }))

    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
    }, 1200)
  }

  const activePreview = previews[selectedSlideIdx]

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={styles.headerIconBg}>
              <Sparkles size={20} color="#2563eb" />
            </div>
            <div>
              <h2 style={styles.headerTitle}>Importateur & Visualiseur PowerPoint (.pptx / .potx)</h2>
              <p style={styles.headerSubtitle}>Prévisualisez les calques vectoriels, validez ou rejetez les templates avant intégration.</p>
            </div>
          </div>
          <button onClick={onClose} style={styles.closeBtn} title="Fermer">
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={styles.body}>
          {/* Dropzone if no file selected */}
          {!file && (
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={styles.dropzone}
            >
              <div style={styles.dropIconBg}>
                <FileUp size={32} color="#2563eb" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 15, color: '#1e293b' }}>
                  Glissez-déposez votre modèle ou présentation PowerPoint (.pptx / .potx)
                </span>
                <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
                  ou cliquez pour parcourir les fichiers de votre ordinateur
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pptx,.potx"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          )}

          {isLoading && (
            <div style={styles.loadingContainer}>
              <RefreshCw size={24} color="#2563eb" style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: '#2563eb' }}>
                Analyse et extraction des calques PowerPoint en cours...
              </span>
            </div>
          )}

          {errorMsg && (
            <div style={styles.errorBox}>
              <AlertCircle size={20} color="#dc2626" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Inspection & Visualizer Panel */}
          {file && !isLoading && previews.length > 0 && (
            <div style={styles.gridContainer}>
              {/* Left Column: Form & Slide Selector */}
              <div style={styles.leftColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nom du Template</label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={e => setTemplateName(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Catégorie Détectée</label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Diapositives Détectées ({previews.length})
                  </label>
                  <div style={styles.slideList}>
                    {previews.map((prev, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSlideIdx(idx)}
                        style={{
                          ...styles.slideItem,
                          ...(selectedSlideIdx === idx ? styles.slideItemActive : {}),
                        }}
                      >
                        <span style={styles.slideText}>
                          Slide {prev.slideNumber}: {prev.sampleText.slice(0, 18) || 'Sans titre'}
                        </span>
                        <span style={styles.badge}>
                          {prev.shapesCount} formes
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 12 }}>
                  <button
                    onClick={() => { setFile(null); setPreviews([]); }}
                    style={styles.changeFileBtn}
                  >
                    Changer de fichier PowerPoint
                  </button>
                </div>
              </div>

              {/* Right Column: Visualizer Canvas Preview */}
              <div style={styles.rightColumn}>
                <div style={styles.previewHeader}>
                  <span style={styles.label}>Aperçu Vectoriel Interactif</span>
                  {activePreview && activePreview.colors.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>Couleurs :</span>
                      {activePreview.colors.map((clr, i) => (
                        <div
                          key={i}
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            backgroundColor: clr,
                            border: '1px solid rgba(255,255,255,0.2)',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div style={styles.canvasContainer}>
                  {activePreview && (
                    <svg viewBox="0 0 800 500" style={{ width: '100%', height: '100%' }}>
                      {activePreview.shapes.map((shape, idx) => (
                        <g key={idx}>
                          <rect
                            x={shape.x * 0.8}
                            y={shape.y * 0.8}
                            width={Math.max(40, shape.w * 0.8)}
                            height={Math.max(25, shape.h * 0.8)}
                            rx={6}
                            fill={shape.fill || '#3365cc'}
                            stroke="#ffffff"
                            strokeWidth={1}
                            opacity={0.85}
                          />
                          {shape.text && (
                            <text
                              x={shape.x * 0.8 + (shape.w * 0.8) / 2}
                              y={shape.y * 0.8 + (shape.h * 0.8) / 2 + 4}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize={11}
                              fontWeight="bold"
                            >
                              {shape.text.slice(0, 16)}
                            </text>
                          )}
                        </g>
                      ))}
                    </svg>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={styles.footer}>
          <button onClick={onClose} style={styles.cancelBtn}>
            Rejeter / Annuler
          </button>

          {file && previews.length > 0 && (
            <button onClick={handleValidateImport} style={styles.validateBtn}>
              <Check size={16} />
              <span>{isSuccess ? 'Importation Validée !' : 'Valider et Importer le Template'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: 16,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    width: '100%',
    maxWidth: 860,
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
  },
  headerIconBg: {
    padding: 8,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0f172a',
    margin: 0,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    margin: 0,
    marginTop: 2,
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: 6,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: 24,
  },
  dropzone: {
    border: '2px dashed #cbd5e1',
    borderRadius: 16,
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    cursor: 'pointer',
    backgroundColor: '#f8fafc',
    transition: 'all 0.2s',
  },
  dropIconBg: {
    padding: 14,
    backgroundColor: '#eff6ff',
    borderRadius: '50%',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 48,
  },
  errorBox: {
    padding: 14,
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: 8,
    color: '#dc2626',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 13,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: 24,
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: '#475569',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    color: '#0f172a',
    outline: 'none',
    boxSizing: 'border-box',
  },
  slideList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    maxHeight: 180,
    overflowY: 'auto',
  },
  slideItem: {
    width: '100%',
    padding: '8px 10px',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 12,
    color: '#334155',
  },
  slideItemActive: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    fontWeight: 600,
  },
  slideText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 160,
  },
  badge: {
    fontSize: 10,
    padding: '2px 6px',
    borderRadius: 4,
    backgroundColor: '#e2e8f0',
    color: '#475569',
  },
  changeFileBtn: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline',
  },
  previewHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  canvasContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    border: '1px solid #1e293b',
    padding: 16,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
  },
  cancelBtn: {
    padding: '8px 16px',
    fontSize: 13,
    fontWeight: 500,
    color: '#475569',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    cursor: 'pointer',
  },
  validateBtn: {
    padding: '9px 18px',
    fontSize: 13,
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#059669',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
}
