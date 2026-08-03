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
      if (inputFile.name.endsWith('.pptx')) {
        const zip = await JSZip.loadAsync(inputFile)
        const slideFiles = Object.keys(zip.files)
          .filter(f => f.startsWith('ppt/slides/slide') && f.endsWith('.xml'))
          .sort((a, b) => {
            const numA = Number.parseInt(a.replace(/[^0-9]/g, '') || '0', 10)
            const numB = Number.parseInt(b.replace(/[^0-9]/g, '') || '0', 10)
            return numA - numB
          })

        if (slideFiles.length === 0) {
          throw new Error('Aucune diapositive n’a été trouvée dans ce fichier PowerPoint.')
        }

        const extractedPreviews: ExtractedSlidePreview[] = []
        const parser = new XMLParser({ ignoreAttributes: false })

        let currentCategory = 'Other'

        for (let i = 0; i < slideFiles.length; i++) {
          const sFile = slideFiles[i]!
          const slideXml = await zip.file(sFile)!.async('text')
          const jsonObj = parser.parse(slideXml)
          const spTree = jsonObj['p:sld']?.['p:cSld']?.['p:spTree']

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
        throw new Error('Veuillez sélectionner un fichier .pptx valide.')
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Erreur lors de la lecture du fichier PowerPoint.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleValidateImport = () => {
    if (previews.length === 0) return

    // Register dynamically in Template Store so user can preview and place immediately
    const cleanName = templateName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const selectedSlide = previews[selectedSlideIdx]!

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg fontWeight-700 font-bold">Importateur & Visualiseur PowerPoint (.pptx)</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Prévisualisez les calques, validez ou rejetez les templates avant intégration.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Dropzone if no file selected */}
          {!file && (
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-900/30 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 text-center"
            >
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full">
                <FileUp className="w-8 h-8" />
              </div>
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Glissez-déposez votre présentation PowerPoint (.pptx)</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">ou cliquez pour parcourir les fichiers de votre ordinateur</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pptx"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center gap-3 py-12 text-blue-600 dark:text-blue-400 font-medium">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>Analyse et extraction des diapositives PowerPoint en cours...</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg text-red-600 dark:text-red-400 flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Inspection & Visualizer Panel */}
          {file && !isLoading && previews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Form & Slide Selector */}
              <div className="space-y-4 md:col-span-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Nom du Template</label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={e => setTemplateName(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Catégorie Détectée</label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    Diapositives Détectées ({previews.length})
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {previews.map((prev, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSlideIdx(idx)}
                        className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                          selectedSlideIdx === idx
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-xs truncate">Slide {prev.slideNumber}: {prev.sampleText.slice(0, 20) || 'Sans titre'}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {prev.shapesCount} formes
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => { setFile(null); setPreviews([]); }}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Changer de fichier PowerPoint
                  </button>
                </div>
              </div>

              {/* Right Column: Visualizer Canvas Preview */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Aperçu Vectoriel Interactif</span>
                  {activePreview && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400">Couleurs :</span>
                      {activePreview.colors.map((clr, i) => (
                        <div key={i} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: clr }} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-full h-72 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
                  {activePreview && (
                    <svg viewBox="0 0 800 500" className="w-full h-full">
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
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Rejeter / Annuler
          </button>

          {file && previews.length > 0 && (
            <button
              onClick={handleValidateImport}
              className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm flex items-center gap-2 transition-colors"
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Importation Validée !</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Valider et Importer le Template</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
