import { useRef, useId, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { HEAD_PATH } from '../shared/headPath'
import { MIGSO_PALETTE } from '../../lib/theme'

// Default 4-piece brain puzzle paths + centers + icons based on user reference image
// Coordinates centered inside a ~300x380 brain bounding box at (350, 60) -> (650, 480)

const PIECE_PATHS = [
  // Piece 0: Top-Left (Dark Navy)
  {
    path: `M 490 80
      C 450 65, 410 75, 390 95
      C 360 110, 345 135, 350 160
      C 345 185, 355 210, 365 220
      L 405 220
      C 405 238, 435 238, 435 220
      L 490 220
      L 490 175
      C 508 175, 508 145, 490 145
      Z`,
    cx: 420,
    cy: 150,
    defaultColor: '#23255a',
    // Wrench & Gear Icon
    icon: (
      <g stroke="white" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx={420} cy={144} r={11} />
        <path d="M 420 133 L 420 130 M 420 158 L 420 155 M 409 144 L 406 144 M 431 144 L 434 144" />
        <path d="M 412 136 L 410 134 M 428 152 L 430 154 M 412 152 L 410 154 M 428 136 L 430 134" />
        <path d="M 410 158 L 418 150" strokeWidth={2.5} />
        <path d="M 408 160 L 412 164" strokeWidth={2.5} />
      </g>
    )
  },
  // Piece 1: Top-Right (Royal Blue)
  {
    path: `M 490 80
      L 490 145
      C 508 145, 508 175, 490 175
      L 490 220
      L 545 220
      C 545 238, 575 238, 575 220
      L 630 220
      C 645 200, 645 175, 635 150
      C 630 120, 600 85, 560 70
      C 530 65, 510 75, 490 80
      Z`,
    cx: 560,
    cy: 150,
    defaultColor: '#2d62ed',
    // Blueprint / Grid Icon
    icon: (
      <g stroke="white" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x={544} y={135} width={32} height={30} rx={2} />
        <line x1={544} y1={150} x2={576} y2={150} />
        <line x1={560} y1={135} x2={560} y2={165} />
        <path d="M 548 139 L 572 161 M 572 139 L 548 161" strokeWidth={1.5} opacity={0.7} />
      </g>
    )
  },
  // Piece 2: Bottom-Left (Yellow Gold)
  {
    path: `M 490 220
      L 435 220
      C 435 238, 405 238, 405 220
      L 365 220
      C 355 240, 360 270, 375 290
      C 390 315, 420 335, 450 335
      C 475 335, 485 320, 490 310
      L 490 275
      C 508 275, 508 245, 490 245
      Z`,
    cx: 430,
    cy: 270,
    defaultColor: '#ffbe00',
    // Atom / Idea Lightbulb Icon
    icon: (
      <g stroke="white" strokeWidth={2} fill="none" strokeLinecap="round">
        <ellipse cx={430} cy={270} rx={14} ry={6} transform="rotate(-30 430 270)" />
        <ellipse cx={430} cy={270} rx={14} ry={6} transform="rotate(30 430 270)" />
        <circle cx={430} cy={270} r={4} fill="white" />
      </g>
    )
  },
  // Piece 3: Bottom-Right + Spinal Stem (Coral Red)
  {
    path: `M 490 220
      L 490 245
      C 508 245, 508 275, 490 275
      L 490 310
      C 485 330, 482 360, 484 485
      L 504 485
      C 506 360, 515 325, 535 315
      C 570 330, 610 320, 635 290
      C 650 270, 645 240, 630 220
      L 575 220
      C 575 238, 545 238, 545 220
      Z`,
    cx: 560,
    cy: 270,
    defaultColor: '#ff472e',
    // Sliders / Picture Controls Icon
    icon: (
      <g stroke="white" strokeWidth={2} fill="none" strokeLinecap="round">
        <rect x={546} y={142} width={28} height={20} rx={2} transform="translate(0, 115)" />
        <path d="M 552 267 L 568 267 M 552 272 L 560 272" opacity={0.9} />
        <line x1={546} y1={255} x2={574} y2={255} />
        <circle cx={554} cy={255} r={3} fill="white" />
        <circle cx={568} cy={263} r={3} fill="white" />
      </g>
    )
  }
]

export function Brain4Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const uid = useId().replace(/:/g, '')
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const headId = 'head'
  const headDef = { x: 315, y: 25, width: 345, height: 475 }
  const headPos = positions[headId]
  const headBbox = {
    x: headPos?.x ?? headDef.x,
    y: headPos?.y ?? headDef.y,
    width: headPos?.width ?? headDef.width,
    height: headPos?.height ?? headDef.height,
  }
  const isHeadSelected = selectedIds.has(headId)

  const branches = data.branches.length > 0 ? data.branches : [
    { title: 'Technical & Engineering', subtitle: 'Maintenance, tools & mechanics' },
    { title: 'Architecture & Design', subtitle: 'Blueprints, planning & structure' },
    { title: 'Research & Innovation', subtitle: 'Ideas, concepts & discovery' },
    { title: 'Media & Operations', subtitle: 'Content management & controls' },
  ]

  return (
    <g ref={svgRef}>
      {/* Head Silhouette Background (Facing Left) */}
      <g transform={getTransform(headId, headBbox)}>
        <path
          d={HEAD_PATH}
          transform={`translate(${headBbox.x},${headBbox.y}) scale(${headBbox.width / 300},${headBbox.height / 420})`}
          fill="#f0f3f8"
          stroke={isHeadSelected ? '#4a90d9' : '#e2e8f0'}
          strokeWidth={isHeadSelected ? 3 : 1.5}
          style={{ cursor: 'pointer' }}
          onMouseDown={e => startDrag(e, headId, headBbox)}
        />
        {isHeadSelected && renderHandles(headBbox, headId)}
      </g>

      {/* Brain Outer Glow Contour */}
      <path
        d="M 490 68 C 380 65 330 140 340 220 C 340 290 410 345 470 345 C 500 420 480 495 480 495 L 508 495 C 510 420 535 330 610 310 C 665 290 660 170 600 90 C 560 65 520 68 490 68 Z"
        fill="#ffffff"
        opacity={0.85}
        filter="drop-shadow(0 2px 10px rgba(0,0,0,0.06))"
      />

      {/* The 4 Brain Puzzle Pieces */}
      {PIECE_PATHS.map((piece, i) => {
        const pid = `piece-${i}`
        const branch = branches[i]
        const color = tplColors[pid] ?? branch?.color ?? piece.defaultColor
        const pDef = { x: piece.cx - 50, y: piece.cy - 50, width: 100, height: 100 }
        const pos = positions[pid]
        const bbox = {
          x: pos?.x ?? pDef.x,
          y: pos?.y ?? pDef.y,
          width: pos?.width ?? pDef.width,
          height: pos?.height ?? pDef.height,
        }
        const isSel = selectedIds.has(pid)

        return (
          <g
            key={pid}
            onMouseDown={e => startDrag(e, pid, bbox)}
            transform={getTransform(pid, bbox)}
            style={{ cursor: 'pointer' }}
          >
            {/* Puzzle Path */}
            <path
              d={piece.path}
              fill={color}
              stroke="#ffffff"
              strokeWidth={5}
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity={isSel ? 0.88 : 1}
            />

            {/* Vector Icon */}
            {piece.icon}

            {isSel && renderHandles(bbox, pid)}
          </g>
        )
      })}

      {/* Callout Cards & Dynamic Connectors */}
      {branches.slice(0, 4).map((branch, i) => {
        const id = `callout-${i}`
        const pieceId = `piece-${i}`
        const defaultPiece = PIECE_PATHS[i]!
        const color = tplColors[id] ?? branch.color ?? tplColors[pieceId] ?? defaultPiece.defaultColor
        
        const isLeft = i % 2 === 0
        const cW = 240
        const cH = 76

        const piecePos = positions[pieceId]
        const pcX = piecePos ? piecePos.x + piecePos.width / 2 : defaultPiece.cx
        const pcY = piecePos ? piecePos.y + piecePos.height / 2 : defaultPiece.cy

        const defaultDx = isLeft ? 50 : 710
        const defaultDy = pcY - cH / 2

        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? defaultDx,
          y: pos?.y ?? defaultDy,
          width: pos?.width ?? cW,
          height: pos?.height ?? cH,
        }
        const isSel = selectedIds.has(id)
        const connStartX = isLeft ? bbox.x + bbox.width : bbox.x
        const connStartY = bbox.y + bbox.height / 2

        return (
          <g key={id}>
            {/* Dynamic Connector Line */}
            <line
              x1={connStartX}
              y1={connStartY}
              x2={pcX}
              y2={pcY}
              stroke={color}
              strokeWidth={2}
              strokeDasharray="4 3"
              opacity={0.85}
            />
            <circle cx={pcX} cy={pcY} r={5} fill={color} stroke="#ffffff" strokeWidth={1.5} />

            {/* Callout Card */}
            <g
              onMouseDown={e => startDrag(e, id, bbox)}
              transform={getTransform(id, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={bbox.x}
                y={bbox.y}
                width={bbox.width}
                height={bbox.height}
                rx={8}
                fill="#ffffff"
                stroke={isSel ? '#4a90d9' : '#e2e8f0'}
                strokeWidth={isSel ? 2.5 : 1}
                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.08))"
              />
              <rect
                x={isLeft ? bbox.x : bbox.x + bbox.width - 6}
                y={bbox.y}
                width={6}
                height={bbox.height}
                rx={3}
                fill={color}
              />
              <text
                x={isLeft ? bbox.x + 16 : bbox.x + 12}
                y={bbox.y + 26}
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={700}
                fill="#1a1a2e"
              >
                {branch.title}
              </text>
              <text
                x={isLeft ? bbox.x + 16 : bbox.x + 12}
                y={bbox.y + 48}
                fontFamily="Arial, sans-serif"
                fontSize={11}
                fill="#666666"
              >
                {branch.subtitle ?? `Description ${i + 1}`}
              </text>
              {isSel && renderHandles(bbox, id)}
            </g>
          </g>
        )
      })}
    </g>
  )
}