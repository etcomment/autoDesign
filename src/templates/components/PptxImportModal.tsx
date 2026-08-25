import { useState, useRef, type ChangeEvent } from 'react'
import { X, Check, FileUp, Sparkles, AlertCircle, RefreshCw } from 'lucide-react'
import { useTemplateStore } from '../store'
import { PptxRenderer } from 'pptx-svg'
import wasmUrl from 'pptx-svg/wasm?url'
import { useIsMobile } from '../../hooks/useIsMobile'

interface PptxImportModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ExtractedSlidePreview {
  slideNumber: number
  category: string
  svgString: string
  shapesCount: number
  colors: string[]
  sampleText: string
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

  const isMobile = useIsMobile()

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

    const now = new Date()
    const timestamp = now.toISOString().replace(/[-:T.]/g, '').slice(0, 14)
    const baseName = inputFile.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '')
    const defaultName = `Import_${timestamp}_${baseName || 'Template'}`
    setTemplateName(defaultName)

    try {
      const lowerName = inputFile.name.toLowerCase()
      if (lowerName.endsWith('.pptx') || lowerName.endsWith('.potx')) {
        const arrayBuffer = await inputFile.arrayBuffer()
        
        const renderer = new PptxRenderer()
        await renderer.init(wasmUrl)
        const { slideCount } = await renderer.loadPptx(arrayBuffer)
        
        if (slideCount === 0) {
          throw new Error('Aucune diapositive trouvée.')
        }

        const extractedPreviews: ExtractedSlidePreview[] = []
        let globalCategory = 'Other'

        for (let i = 0; i < slideCount; i++) {
          const svg = renderer.renderSlideSvg(i)
          
          // Parse SVG to extract metadata
          const parser = new DOMParser()
          const doc = parser.parseFromString(svg, 'image/svg+xml')
          
          const textNodes = Array.from(doc.querySelectorAll('text, tspan'))
            .map(n => n.textContent?.trim())
            .filter(Boolean) as string[]
          const textSample = textNodes.join(' ').substring(0, 50)
          
          const fillNodes = Array.from(doc.querySelectorAll('[fill]'))
            .map(n => n.getAttribute('fill'))
            .filter(f => f && f.startsWith('#') && f !== '#ffffff' && f !== '#000000') as string[]
          
          const colors = Array.from(new Set(fillNodes)).slice(0, 6)
          const shapesCount = doc.querySelectorAll('g[data-ooxml-id], path, rect, circle, ellipse').length

          if (i === 0 && textNodes.length > 0 && textNodes[0]) {
            globalCategory = textNodes[0].substring(0, 20)
          }

          extractedPreviews.push({
            slideNumber: i + 1,
            category: textNodes[0]?.substring(0, 20) || 'Slide',
            svgString: svg,
            shapesCount,
            colors,
            sampleText: textSample || `Diapositive ${i + 1}`
          })
        }

        setPreviews(extractedPreviews)
        setCategoryName(globalCategory)
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
              <h2 style={styles.headerTitle}>Importateur PowerPoint VRAI (.pptx)</h2>
              <p style={styles.headerSubtitle}>Basé sur pptx-svg pour un rendu haute fidélité</p>
            </div>
          </div>
          <button onClick={onClose} style={styles.closeBtn} title="Fermer">
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={styles.body}>
          {/* Form / Meta row */}
          {file && !isLoading && previews.length > 0 && (
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
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
            </div>
          )}

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
                  Glissez-déposez votre PPTX
                </span>
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
                Rendu SVG natif via pptx-svg...
              </span>
            </div>
          )}

          {errorMsg && (
            <div style={styles.errorBox}>
              <AlertCircle size={20} color="#dc2626" />
              <span>{errorMsg}</span>
            </div>
          )}

          {file && !isLoading && previews.length > 0 && (
            <div style={isMobile ? styles.gridContainerMobile : styles.gridContainer}>
              <div style={styles.leftColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Diapositives Détectées ({previews.length})</label>
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
                          {prev.shapesCount} éléments
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
                    Changer de fichier
                  </button>
                </div>
              </div>

              <div style={styles.rightColumn}>
                <div style={styles.previewHeader}>
                  <span style={styles.label}>Aperçu Exact (Généré par pptx-svg)</span>
                  {activePreview && activePreview.colors.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>Couleurs détectées :</span>
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
                <div style={isMobile ? styles.canvasContainerMobile : styles.canvasContainer}>
                  {activePreview && (
                    <div 
                      dangerouslySetInnerHTML={{ __html: activePreview.svgString }} 
                      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={styles.footer}>
          <button onClick={onClose} style={styles.cancelBtn}>
            Fermer
          </button>
          {file && previews.length > 0 && (
            <button onClick={handleValidateImport} style={styles.validateBtn}>
              <Check size={16} />
              <span>{isSuccess ? 'Importation Validée !' : 'Valider'}</span>
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
    maxWidth: 960,
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
  gridContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: '#475569',
  },
  slideList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    maxHeight: 280,
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
    maxWidth: 140,
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
    height: 480,
    backgroundColor: '#cbd5e1',
    borderRadius: 12,
    border: '1px solid #1e293b',
    padding: 16,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  canvasContainerMobile: {
    width: '100%',
    height: 300,
    backgroundColor: '#cbd5e1',
    borderRadius: 12,
    border: '1px solid #1e293b',
    padding: 12,
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
