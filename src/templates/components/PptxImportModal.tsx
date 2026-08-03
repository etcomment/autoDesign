import { useState, useRef, type ChangeEvent } from 'react'
import JSZip from 'jszip'
import { XMLParser } from 'fast-xml-parser'
import { X, Check, FileUp, Sparkles, AlertCircle, RefreshCw } from 'lucide-react'
import { useTemplateStore } from '../store'

interface PptxImportModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ParsedShape {
  id: string
  x: number
  y: number
  w: number
  h: number
  fill: string
  stroke?: string
  text?: string
}

interface ExtractedSlidePreview {
  slideNumber: number
  category: string
  shapesCount: number
  colors: string[]
  sampleText: string
  shapes: ParsedShape[]
  bbox: { minX: number; minY: number; maxX: number; maxY: number; width: number; height: number }
}

const PALETTE_FALLBACKS = ['#282a5d', '#3365cc', '#ff4d38', '#ffb900', '#52c49c', '#ee6d90', '#7c3aed', '#0284c7']

function parseEMU(val: any): number {
  if (!val) return 0
  const n = typeof val === 'string' || typeof val === 'number' ? Number.parseInt(String(val), 10) : 0
  if (isNaN(n)) return 0
  return Math.round((n / 914400) * 96)
}

function extractColor(clrObj: any): string | null {
  if (!clrObj) return null
  if (clrObj['a:srgbClr']?.['@_val']) return `#${clrObj['a:srgbClr']['@_val']}`
  if (clrObj['a:sysClr']?.['@_lastClr']) return `#${clrObj['a:sysClr']['@_lastClr']}`
  if (clrObj['a:schemeClr']?.['@_val']) {
    const val = clrObj['a:schemeClr']['@_val']
    if (val.includes('accent1')) return '#3365cc'
    if (val.includes('accent2')) return '#ff4d38'
    if (val.includes('accent3')) return '#ffb900'
    if (val.includes('accent4')) return '#52c49c'
    if (val.includes('accent5')) return '#ee6d90'
    if (val.includes('accent6')) return '#7c3aed'
    if (val.includes('dk1') || val.includes('tx1')) return '#282a5d'
    if (val.includes('lt1') || val.includes('bg1')) return '#ffffff'
  }
  return null
}

function extractText(sp: any): string {
  const txBody = sp['p:txBody']
  if (!txBody) return ''
  const paragraphs = Array.isArray(txBody['a:p']) ? txBody['a:p'] : [txBody['a:p']].filter(Boolean)
  const parts: string[] = []
  for (const p of paragraphs) {
    const runs = Array.isArray(p['a:r']) ? p['a:r'] : [p['a:r']].filter(Boolean)
    for (const r of runs) {
      if (r['a:t']) {
        const textVal = typeof r['a:t'] === 'object' ? r['a:t']['#text'] : r['a:t']
        if (textVal) parts.push(String(textVal))
      }
    }
  }
  return parts.join(' ').trim()
}

function parseSingleShape(sp: any, idx: number, parentX = 0, parentY = 0): ParsedShape | null {
  const spPr = sp['p:spPr']
  if (!spPr) return null

  const xfrm = spPr['a:xfrm']
  const off = xfrm?.['a:off']
  const ext = xfrm?.['a:ext']

  const x = parentX + parseEMU(off?.['@_x'])
  const y = parentY + parseEMU(off?.['@_y'])
  const w = parseEMU(ext?.['@_cx'])
  const h = parseEMU(ext?.['@_cy'])

  if (w <= 2 && h <= 2) return null

  const fill = extractColor(spPr['a:solidFill']) ?? PALETTE_FALLBACKS[idx % PALETTE_FALLBACKS.length]!
  const stroke = extractColor(spPr['a:ln']?.['a:solidFill']) ?? undefined
  const text = extractText(sp)

  return {
    id: `sp-${idx}`,
    x, y, w, h,
    fill,
    stroke,
    text,
  }
}

function extractShapesRecursively(spTree: any, parentX = 0, parentY = 0): ParsedShape[] {
  if (!spTree) return []
  const result: ParsedShape[] = []

  let shapeIndex = 0

  // 1. Direct shapes (p:sp)
  const rawSp = Array.isArray(spTree['p:sp']) ? spTree['p:sp'] : [spTree['p:sp']].filter(Boolean)
  for (const sp of rawSp) {
    const s = parseSingleShape(sp, shapeIndex++, parentX, parentY)
    if (s) result.push(s)
  }

  // 2. Connection shapes (p:cxnSp)
  const rawCxn = Array.isArray(spTree['p:cxnSp']) ? spTree['p:cxnSp'] : [spTree['p:cxnSp']].filter(Boolean)
  for (const cxn of rawCxn) {
    const s = parseSingleShape(cxn, shapeIndex++, parentX, parentY)
    if (s) result.push(s)
  }

  // 3. Grouped shapes (p:grpSp)
  const rawGrp = Array.isArray(spTree['p:grpSp']) ? spTree['p:grpSp'] : [spTree['p:grpSp']].filter(Boolean)
  for (const grp of rawGrp) {
    const grpXfrm = grp['p:grpSpPr']?.['a:xfrm']
    const grpX = parentX + parseEMU(grpXfrm?.['a:off']?.['@_x'])
    const grpY = parentY + parseEMU(grpXfrm?.['a:off']?.['@_y'])
    const childShapes = extractShapesRecursively(grp, grpX, grpY)
    result.push(...childShapes)
  }

  return result
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

    const now = new Date()
    const timestamp = now.toISOString().replace(/[-:T.]/g, '').slice(0, 14)
    const baseName = inputFile.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '')
    const defaultName = `Import_${timestamp}_${baseName || 'Template'}`
    setTemplateName(defaultName)

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
          throw new Error('Aucune diapositive n’a été trouvée dans ce fichier PowerPoint (.potx / .pptx).')
        }

        const extractedPreviews: ExtractedSlidePreview[] = []
        const parser = new XMLParser({ ignoreAttributes: false })

        let currentCategory = 'Other'

        for (let i = 0; i < slideFiles.length; i++) {
          const sFile = slideFiles[i]!
          const slideXml = await zip.file(sFile)!.async('text')
          const jsonObj = parser.parse(slideXml)
          const spTree = jsonObj['p:sld']?.['p:cSld']?.['p:spTree'] || jsonObj['p:sldLayout']?.['p:cSld']?.['p:spTree']

          const shapes = extractShapesRecursively(spTree)
          const colorsFound = new Set<string>()
          let textSample = ''

          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity

          for (const s of shapes) {
            colorsFound.add(s.fill)
            if (s.text && !textSample) textSample = s.text

            minX = Math.min(minX, s.x)
            minY = Math.min(minY, s.y)
            maxX = Math.max(maxX, s.x + s.w)
            maxY = Math.max(maxY, s.y + s.h)
          }

          if (minX === Infinity) {
            minX = 0; minY = 0; maxX = 800; maxY = 500
          }

          const bbox = {
            minX, minY, maxX, maxY,
            width: Math.max(100, maxX - minX),
            height: Math.max(100, maxY - minY),
          }

          if (shapes.length <= 3 && textSample && !textSample.includes('Description')) {
            currentCategory = textSample
          }

          extractedPreviews.push({
            slideNumber: i + 1,
            category: currentCategory,
            shapesCount: shapes.length,
            colors: Array.from(colorsFound),
            sampleText: textSample || `Diapositive ${i + 1}`,
            shapes,
            bbox,
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
                    <svg
                      viewBox={`${activePreview.bbox.minX - 30} ${activePreview.bbox.minY - 30} ${activePreview.bbox.width + 60} ${activePreview.bbox.height + 60}`}
                      style={{ width: '100%', height: '100%' }}
                    >
                      {activePreview.shapes.map((shape, idx) => (
                        <g key={idx}>
                          <rect
                            x={shape.x}
                            y={shape.y}
                            width={shape.w}
                            height={shape.h}
                            rx={6}
                            fill={shape.fill}
                            stroke={shape.stroke || '#ffffff'}
                            strokeWidth={1.5}
                            opacity={0.9}
                          />
                          {shape.text && (
                            <text
                              x={shape.x + shape.w / 2}
                              y={shape.y + shape.h / 2 + 5}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize={Math.min(14, Math.max(9, shape.h * 0.25))}
                              fontWeight="bold"
                            >
                              {shape.text.length > 25 ? `${shape.text.slice(0, 22)}...` : shape.text}
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
