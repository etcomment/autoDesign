export interface Puzzle2GeometryBox {
  x: number
  y: number
  width: number
  height: number
}

export const PIECE_PATHS: [string, string, string, string] = [
  "M383.23 319.06L383.23 319.06C382.29 318.02 381.04 317.08 379.90 316.67L379.90 316.67C374.17 314.69 369.17 311.88 366.46 309.17L366.46 309.17C363.33 306.04 361.88 302.19 362.29 298.23L362.29 298.23C362.60 294.38 364.69 290.31 368.13 286.98L368.13 286.98C371.46 283.65 375.42 281.56 379.27 281.25L379.27 281.25C383.23 280.73 387.08 282.19 390.31 285.42L390.31 285.42C392.60 287.71 394.90 291.88 396.77 296.77L396.77 296.77C397.08 297.50 397.29 298.23 397.50 298.96L397.50 298.96C397.60 299.27 397.71 299.48 397.81 299.79L397.81 299.79C398.33 300.73 399.06 301.77 399.90 302.50L429.17 273.13L429.17 273.13C429.58 272.81 430.00 272.40 430.42 271.98L430.42 271.98C436.46 264.90 436.04 254.27 429.38 247.60L400.10 218.33L400.10 218.33C400.83 217.50 401.77 216.77 402.81 216.25L402.81 216.25C403.13 216.15 403.33 216.04 403.65 215.94L403.65 215.94C404.38 215.73 405.10 215.42 405.73 215.21L405.73 215.21C410.73 213.33 414.90 210.94 417.19 208.65L417.19 208.65C420.31 205.52 421.77 201.67 421.35 197.71L421.35 197.71C420.94 193.85 418.96 189.90 415.52 186.56L415.52 186.56C412.19 183.13 408.23 181.04 404.38 180.73L404.38 180.73C400.31 180.31 396.56 181.77 393.33 184.90L393.33 184.90C390.73 187.60 387.92 192.60 385.94 198.33L385.94 198.33C385.52 199.48 384.58 200.73 383.44 201.67L354.48 172.60L354.48 172.60C347.40 165.63 335.83 165.63 328.85 172.60L253.96 247.60L253.96 247.60C246.88 254.69 246.88 266.25 253.96 273.13L328.85 348.13L328.85 348.13C335.52 354.79 346.04 355.21 353.13 349.27L353.13 349.27C353.54 348.85 353.96 348.54 354.27 348.13L383.23 319.06",
  "M499.17 322.92L499.17 322.92C497.29 328.65 494.38 333.65 491.77 336.35L491.77 336.35C488.65 339.58 484.79 340.94 480.73 340.52L480.73 340.52C476.88 340.10 472.92 338.02 469.58 334.79L469.58 334.79C466.15 331.35 464.06 327.40 463.75 323.54L463.75 323.54C463.33 319.48 464.79 315.73 467.92 312.50L467.92 312.50C470.21 310.31 474.38 307.92 479.38 306.04L479.38 306.04C480.10 305.73 480.73 305.52 481.46 305.31L481.46 305.31C481.77 305.21 482.08 305.10 482.29 305.00L482.29 305.00C483.23 304.48 484.17 303.85 484.90 303.02L455.42 273.54L455.42 273.54C448.85 266.98 438.33 266.67 431.15 272.50L431.15 272.50C430.73 272.81 430.31 273.23 429.90 273.54L400.63 302.92L400.63 302.92C399.69 302.19 398.96 301.25 398.54 300.21L398.54 300.21C398.44 299.90 398.33 299.69 398.23 299.38L398.23 299.38C397.92 298.65 397.71 297.92 397.50 297.19L397.50 297.19C395.63 292.29 393.23 288.13 390.94 285.83L390.94 285.83C387.81 282.71 383.96 281.25 379.90 281.67L379.90 281.67C376.04 281.98 372.19 284.06 368.75 287.50L368.75 287.50C365.42 290.83 363.33 294.79 362.92 298.65L362.92 298.65C362.50 302.60 363.96 306.46 367.08 309.58L367.08 309.58C369.79 312.40 374.90 315.10 380.52 317.08L380.52 317.08C381.77 317.50 383.02 318.44 383.96 319.48L354.90 348.54L354.90 348.54C354.58 348.96 354.17 349.38 353.85 349.79L353.85 349.79C347.92 356.77 348.23 367.50 354.90 374.17L429.90 449.17L429.90 449.17C436.88 456.25 448.44 456.25 455.42 449.17L530.42 374.17L530.42 374.17C537.50 367.08 537.50 355.63 530.42 348.54L501.56 319.69L501.56 319.69C500.42 320.63 499.58 321.77 499.17 322.92",
  "M585.83 317.92L585.83 317.92C585.00 316.88 583.65 315.83 582.50 315.42L582.50 315.42C576.77 313.54 571.77 310.73 569.06 308.02L569.06 308.02C565.94 304.90 564.48 301.04 564.90 296.98L564.90 296.98C565.31 293.23 567.40 289.17 570.73 285.83L570.73 285.83C574.06 282.50 578.02 280.42 581.88 280.00L581.88 280.00C585.94 279.58 589.69 281.04 592.92 284.17L592.92 284.17C595.21 286.46 597.60 290.63 599.38 295.63L599.38 295.63C599.69 296.35 599.90 297.08 600.21 297.81L600.21 297.81C600.21 298.13 600.31 298.33 600.42 298.54L600.42 298.54C600.94 299.58 601.67 300.52 602.60 301.25L631.88 271.98L631.88 271.98C632.50 271.25 633.23 270.73 634.06 270.10L634.06 270.10C638.54 263.23 637.71 253.75 631.56 247.71L556.56 172.71L556.56 172.71C549.48 165.63 538.02 165.63 530.94 172.71L456.04 247.71L456.04 247.71C448.96 254.69 448.96 266.25 456.04 273.13L485.31 302.50L485.31 302.50C485.21 302.50 485.21 302.60 485.21 302.60L485.21 302.60C484.48 303.44 483.54 304.06 482.60 304.58L482.60 304.58C482.40 304.69 482.08 304.79 481.77 304.90L481.77 304.90C481.04 305.10 480.42 305.31 479.69 305.63L479.69 305.63C474.69 307.50 470.52 309.90 468.23 312.19L468.23 312.19C465.10 315.31 463.65 319.17 464.06 323.23L464.06 323.23C464.38 326.98 466.46 330.94 469.90 334.38L469.90 334.38C473.23 337.71 477.19 339.79 481.04 340.21L481.04 340.21C485.10 340.52 488.96 339.17 492.08 335.94L492.08 335.94C494.69 333.33 497.60 328.23 499.48 322.60L499.48 322.60C499.90 321.35 500.73 320.21 501.88 319.27L501.88 319.27C501.88 319.27 501.88 319.17 501.98 319.17L530.94 348.23L530.94 348.23C537.29 354.58 547.29 355.21 554.38 350.00L554.38 350.00C555.10 348.96 555.94 347.92 556.88 346.98L585.83 317.92",
  "M732.50 347.50L657.50 272.50L657.50 272.50C651.15 266.25 641.15 265.63 634.06 270.63L634.06 270.63C633.33 271.25 632.60 271.88 631.88 272.50L602.71 301.88L602.71 301.88C601.77 301.15 601.04 300.10 600.52 299.17L600.52 299.17C600.42 298.85 600.31 298.65 600.21 298.33L600.21 298.33C600.00 297.60 599.69 296.88 599.48 296.15L599.48 296.15C597.60 291.15 595.21 286.98 592.92 284.79L592.92 284.79C589.79 281.56 585.94 280.10 581.88 280.52L581.88 280.52C578.13 280.94 574.17 283.02 570.83 286.46L570.83 286.46C567.40 289.69 565.31 293.75 564.90 297.60L564.90 297.60C564.58 301.67 565.94 305.42 569.06 308.54L569.06 308.54C571.88 311.25 576.88 314.06 582.60 316.04L582.60 316.04C583.75 316.46 585.00 317.40 585.94 318.54L556.88 347.50L556.88 347.50C556.04 348.54 555.10 349.48 554.48 350.63L554.48 350.63C550.00 357.60 550.83 367.08 556.88 373.13L631.88 448.13L631.88 448.13C638.96 455.21 650.42 455.21 657.50 448.13L732.50 373.13L732.50 373.13C739.58 366.04 739.58 354.58 732.50 347.50",
]

export const PIECE_BOXES: [Puzzle2GeometryBox, Puzzle2GeometryBox, Puzzle2GeometryBox, Puzzle2GeometryBox] = [
  { x: 247.0, y: 165.9, width: 190.6, height: 190.6 },
  { x: 347.9, y: 266.9, width: 190.6, height: 190.6 },
  { x: 449.3, y: 165.7, width: 190.6, height: 190.6 },
  { x: 550.7, y: 265.7, width: 190.6, height: 190.6 },
]

export const DOT_CENTERS: [{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }, { x: number; y: number }] = [
  { x: 86.1, y: 130.6 },
  { x: 86.1, y: 404.2 },
  { x: 753.5, y: 130.6 },
  { x: 753.5, y: 404.7 },
]

export const DOT_RADIUS = 8.3

export const CARD_TITLE_X_LEFT = 114.6
export const CARD_TITLE_X_RIGHT = 781.3
export const CARD_TITLE_Y_TOP = 139.6
export const CARD_TITLE_Y_BOTTOM = 412.5
export const CARD_BODY_Y_TOP = 163.5
export const CARD_BODY_Y_BOTTOM = 436.5
export const CARD_BODY_LINE_HEIGHT = 13.5

export function translatePiecePath(path: string, deltaX: number): string {
  let coordinateIndex = 0
  return path.replace(/(-?\d+\.?\d*)/g, value => {
    const delta = coordinateIndex % 2 === 0 ? deltaX : 0
    coordinateIndex++
    return (parseFloat(value) + delta).toFixed(2).replace(/\.00$/, '')
  })
}

export interface Puzzle2PieceComputedLayout {
  path: string
  box: Puzzle2GeometryBox
  centerCx: number
  centerCy: number
  titleX: number
  titleY: number
  bodyY: number
  textAnchor: 'start' | 'middle'
  cardRect: Puzzle2GeometryBox
  dot: { x: number; y: number }
  dotRect: Puzzle2GeometryBox
}

export function computePuzzle2PieceLayout(index: number, totalPieces: number): Puzzle2PieceComputedLayout {
  if (totalPieces === 4 && index >= 0 && index < 4) {
    const box = PIECE_BOXES[index]!
    const path = PIECE_PATHS[index]!
    const isLeft = index === 0 || index === 1
    const isTop = index === 0 || index === 2
    const titleX = isLeft ? CARD_TITLE_X_LEFT : CARD_TITLE_X_RIGHT
    const titleY = isTop ? CARD_TITLE_Y_TOP : CARD_TITLE_Y_BOTTOM
    const bodyY = isTop ? CARD_BODY_Y_TOP : CARD_BODY_Y_BOTTOM
    const dot = DOT_CENTERS[index]!
    const cardRect: Puzzle2GeometryBox = {
      x: titleX - 4,
      y: titleY - 18,
      width: 204,
      height: 80,
    }
    const dotRect: Puzzle2GeometryBox = {
      x: dot.x - DOT_RADIUS,
      y: dot.y - DOT_RADIUS,
      width: DOT_RADIUS * 2,
      height: DOT_RADIUS * 2,
    }
    return {
      path,
      box,
      centerCx: box.x + box.width / 2,
      centerCy: box.y + box.height / 2,
      titleX,
      titleY,
      bodyY,
      textAnchor: 'start',
      cardRect,
      dot,
      dotRect,
    }
  }

  const stepX = 101.4
  const pieceWidth = 190.6
  const pieceHeight = 190.6
  const chainWidth = (totalPieces - 1) * stepX + pieceWidth
  const scale = chainWidth > 920 ? 920 / chainWidth : 1
  const startX = Math.max(10, (1000 - chainWidth * scale) / 2)

  const pieceX = startX + index * stepX * scale
  const isTop = index % 2 === 0
  const pieceY = isTop ? 165.8 : 266.3
  const box: Puzzle2GeometryBox = {
    x: pieceX,
    y: pieceY,
    width: pieceWidth * scale,
    height: pieceHeight * scale,
  }

  let basePath: string
  let deltaX: number
  if (index === 0) {
    basePath = PIECE_PATHS[0]
    deltaX = pieceX - 247.0
  } else if (isTop) {
    basePath = PIECE_PATHS[2]
    deltaX = pieceX - 449.3
  } else if (index === totalPieces - 1) {
    basePath = PIECE_PATHS[3]
    deltaX = pieceX - 550.7
  } else {
    basePath = PIECE_PATHS[1]
    deltaX = pieceX - 347.9
  }

  const path = deltaX !== 0 ? translatePiecePath(basePath, deltaX) : basePath
  const centerCx = pieceX + (pieceWidth * scale) / 2
  const centerCy = pieceY + (pieceHeight * scale) / 2

  const cardWidth = Math.min(180, Math.max(110, (stepX * 2 - 15) * scale))
  const cardHeight = 75
  const cardX = centerCx - cardWidth / 2

  let cardY: number
  let titleY: number
  let bodyY: number
  let dotY: number

  if (isTop) {
    cardY = Math.max(15, pieceY - 85)
    titleY = cardY + 18
    bodyY = cardY + 36
    dotY = pieceY - 10
  } else {
    cardY = pieceY + pieceHeight + 25
    titleY = cardY + 18
    bodyY = cardY + 36
    dotY = pieceY + pieceHeight + 10
  }

  const dot = { x: centerCx, y: dotY }
  const dotRect: Puzzle2GeometryBox = {
    x: dot.x - DOT_RADIUS,
    y: dot.y - DOT_RADIUS,
    width: DOT_RADIUS * 2,
    height: DOT_RADIUS * 2,
  }
  const cardRect: Puzzle2GeometryBox = {
    x: cardX,
    y: cardY,
    width: cardWidth,
    height: cardHeight,
  }

  return {
    path,
    box,
    centerCx,
    centerCy,
    titleX: centerCx,
    titleY,
    bodyY,
    textAnchor: 'middle',
    cardRect,
    dot,
    dotRect,
  }
}
