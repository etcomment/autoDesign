export const RING_CENTER = { x: 108.07, y: 114.62 } as const
export const RING_START_ANGLE = 130
export const RING_END_ANGLE = 410
export const RING_ANGLE_STEP = 1
export const RING_GAP_WIDTH = 4

const AREA_SAMPLES = 4000

function squareDistanceToCenter(point: RingPoint): number {
  const dx = point.x - RING_CENTER.x
  const dy = point.y - RING_CENTER.y
  return dx * dx + dy * dy
}

function areaDensity(
  angle: number,
  outerContour: readonly (readonly [number, number])[],
  innerContour: readonly (readonly [number, number])[],
): number {
  const inner = squareDistanceToCenter(sampleContour(innerContour, angle))
  const outer = squareDistanceToCenter(sampleContour(outerContour, angle))
  return 0.5 * (outer - inner)
}

export function equalAreaBoundaries(
  count: number,
  outerContour: readonly (readonly [number, number])[] = OUTER_CONTOUR,
  innerContour: readonly (readonly [number, number])[] = INNER_CONTOUR,
): number[] {
  const span = RING_END_ANGLE - RING_START_ANGLE
  const angleForStep = (step: number) => RING_START_ANGLE + (span * step) / AREA_SAMPLES
  const cumulative = new Array<number>(AREA_SAMPLES + 1)
  cumulative[0] = 0
  for (let step = 1; step <= AREA_SAMPLES; step += 1) {
    const previous = areaDensity(angleForStep(step - 1), outerContour, innerContour)
    const current = areaDensity(angleForStep(step), outerContour, innerContour)
    cumulative[step] = cumulative[step - 1]! + 0.5 * (previous + current) * (span / AREA_SAMPLES)
  }
  const total = cumulative[AREA_SAMPLES]!
  const boundaries = [RING_START_ANGLE]
  for (let sector = 1; sector < count; sector += 1) {
    const target = (total * sector) / count
    let index = 0
    while (index <= AREA_SAMPLES && cumulative[index]! < target) index += 1
    const low = index === 0 ? 0 : cumulative[index - 1]!
    const high = cumulative[index]!
    const fraction = index === 0 ? 0 : (target - low) / Math.max(high - low, 1e-9)
    boundaries.push(angleForStep(index) - (span / AREA_SAMPLES) * (1 - fraction))
  }
  boundaries.push(RING_END_ANGLE)
  return boundaries
}

export type RingPoint = { x: number; y: number }

export const OUTER_CONTOUR: readonly (readonly [number, number])[] = [
  [38.66, 195.06],
  [38.09, 194.43],
  [37.45, 193.71],
  [36.31, 192.4],
  [35.08, 190.97],
  [33.84, 189.47],
  [32.6, 187.91],
  [31.54, 186.52],
  [30.5, 185.1],
  [29.37, 183.49],
  [28.39, 182.05],
  [27.45, 180.59],
  [26.42, 178.93],
  [25.53, 177.44],
  [24.67, 175.93],
  [23.74, 174.22],
  [22.85, 172.49],
  [22.08, 170.94],
  [21.25, 169.18],
  [20.54, 167.6],
  [19.87, 166.0],
  [19.23, 164.39],
  [18.61, 162.77],
  [18.02, 161.13],
  [17.4, 159.28],
  [16.87, 157.61],
  [16.37, 155.93],
  [15.85, 154.03],
  [15.41, 152.33],
  [15.01, 150.61],
  [14.62, 148.88],
  [14.28, 147.14],
  [14.0, 145.6],
  [13.71, 143.84],
  [13.48, 142.28],
  [13.24, 140.49],
  [13.06, 138.92],
  [12.88, 137.11],
  [12.74, 135.5],
  [12.61, 133.79],
  [12.64, 131.85],
  [12.61, 130.13],
  [12.63, 128.5],
  [12.68, 126.73],
  [12.77, 124.94],
  [12.77, 123.49],
  [12.88, 121.7],
  [13.02, 119.93],
  [13.19, 118.2],
  [13.39, 116.46],
  [13.6, 114.89],
  [13.84, 113.33],
  [14.11, 111.77],
  [14.41, 110.21],
  [14.74, 108.65],
  [15.13, 106.92],
  [15.56, 105.2],
  [15.97, 103.65],
  [16.41, 102.11],
  [16.88, 100.57],
  [17.37, 99.04],
  [17.9, 97.52],
  [18.44, 96.0],
  [19.01, 94.49],
  [19.61, 92.98],
  [20.23, 91.49],
  [20.89, 90.01],
  [21.56, 88.53],
  [22.25, 87.07],
  [22.98, 85.61],
  [23.73, 84.17],
  [24.41, 82.9],
  [25.2, 81.48],
  [26.02, 80.07],
  [26.87, 78.68],
  [27.63, 77.46],
  [28.52, 76.09],
  [29.37, 74.82],
  [30.2, 73.63],
  [31.02, 72.51],
  [31.92, 71.29],
  [32.82, 70.15],
  [33.78, 68.94],
  [34.74, 67.77],
  [35.73, 66.59],
  [36.74, 65.44],
  [37.85, 64.22],
  [39.03, 62.97],
  [40.1, 61.86],
  [41.15, 60.8],
  [42.29, 59.68],
  [43.31, 58.73],
  [44.34, 57.82],
  [45.47, 56.83],
  [46.71, 55.78],
  [47.82, 54.88],
  [49.09, 53.87],
  [50.22, 53.0],
  [51.52, 52.03],
  [52.68, 51.2],
  [54.01, 50.28],
  [55.18, 49.49],
  [56.37, 48.71],
  [57.57, 47.96],
  [58.77, 47.22],
  [59.99, 46.5],
  [61.22, 45.8],
  [62.63, 45.02],
  [63.87, 44.36],
  [65.31, 43.63],
  [66.57, 43.01],
  [67.84, 42.4],
  [69.12, 41.82],
  [70.41, 41.26],
  [71.71, 40.72],
  [73.01, 40.19],
  [74.5, 39.62],
  [75.82, 39.13],
  [77.14, 38.66],
  [78.47, 38.22],
  [79.8, 37.8],
  [81.15, 37.4],
  [82.49, 37.01],
  [84.04, 36.6],
  [85.39, 36.26],
  [86.75, 35.93],
  [88.12, 35.64],
  [89.49, 35.36],
  [90.86, 35.11],
  [92.24, 34.87],
  [93.82, 34.63],
  [95.11, 34.44],
  [96.5, 34.27],
  [97.78, 34.13],
  [99.13, 34.0],
  [100.37, 33.91],
  [101.84, 33.82],
  [103.29, 33.75],
  [104.81, 33.69],
  [106.42, 33.64],
  [107.84, 33.6],
  [109.21, 33.6],
  [110.77, 33.62],
  [112.22, 33.68],
  [113.7, 33.79],
  [115.33, 33.91],
  [116.92, 34.05],
  [118.41, 34.2],
  [119.87, 34.37],
  [121.21, 34.55],
  [122.65, 34.75],
  [124.08, 34.98],
  [125.38, 35.2],
  [126.78, 35.47],
  [128.18, 35.75],
  [129.56, 36.05],
  [130.94, 36.38],
  [132.42, 36.75],
  [133.78, 37.11],
  [135.13, 37.49],
  [136.48, 37.9],
  [137.83, 38.33],
  [139.17, 38.78],
  [140.5, 39.25],
  [141.84, 39.73],
  [143.17, 40.25],
  [144.5, 40.78],
  [145.77, 41.31],
  [147.09, 41.89],
  [148.47, 42.51],
  [149.79, 43.14],
  [151.16, 43.82],
  [152.44, 44.48],
  [153.72, 45.16],
  [155.0, 45.87],
  [156.28, 46.61],
  [157.46, 47.31],
  [158.72, 48.08],
  [159.97, 48.87],
  [161.22, 49.68],
  [162.44, 50.51],
  [163.66, 51.35],
  [164.86, 52.21],
  [166.04, 53.08],
  [167.19, 53.96],
  [168.32, 54.85],
  [169.51, 55.82],
  [170.67, 56.79],
  [171.83, 57.81],
  [172.83, 58.69],
  [173.85, 59.66],
  [174.91, 60.73],
  [176.0, 61.86],
  [177.05, 62.99],
  [178.22, 64.26],
  [179.35, 65.5],
  [180.4, 66.68],
  [181.39, 67.83],
  [182.36, 69.0],
  [183.33, 70.22],
  [184.27, 71.43],
  [185.19, 72.67],
  [186.1, 73.93],
  [186.99, 75.2],
  [187.86, 76.48],
  [188.7, 77.77],
  [189.51, 79.07],
  [190.3, 80.38],
  [191.07, 81.7],
  [191.82, 83.04],
  [192.55, 84.4],
  [193.26, 85.77],
  [193.95, 87.16],
  [194.62, 88.57],
  [195.26, 89.99],
  [195.89, 91.41],
  [196.49, 92.85],
  [197.07, 94.3],
  [197.63, 95.76],
  [198.21, 97.38],
  [198.76, 98.99],
  [199.29, 100.62],
  [199.79, 102.25],
  [200.27, 103.88],
  [200.67, 105.36],
  [201.04, 106.85],
  [201.42, 108.48],
  [201.76, 110.1],
  [202.08, 111.73],
  [202.37, 113.34],
  [202.64, 115.09],
  [202.85, 116.69],
  [203.03, 118.28],
  [203.19, 120.04],
  [203.33, 121.85],
  [203.46, 123.56],
  [203.48, 125.0],
  [203.49, 126.65],
  [203.5, 128.32],
  [203.48, 130.03],
  [203.41, 131.73],
  [203.39, 133.73],
  [203.32, 135.64],
  [203.2, 137.32],
  [203.04, 138.99],
  [202.84, 140.69],
  [202.6, 142.44],
  [202.34, 144.15],
  [202.05, 145.93],
  [201.73, 147.69],
  [201.39, 149.4],
  [201.03, 151.05],
  [200.65, 152.64],
  [200.2, 154.33],
  [199.73, 155.99],
  [199.23, 157.63],
  [198.7, 159.26],
  [198.08, 161.04],
  [197.48, 162.66],
  [196.85, 164.28],
  [196.12, 166.04],
  [195.37, 167.78],
  [194.64, 169.37],
  [193.89, 170.95],
  [193.04, 172.66],
  [192.22, 174.21],
  [191.38, 175.74],
  [190.43, 177.4],
  [189.46, 179.04],
  [188.54, 180.52],
  [187.51, 182.11],
  [186.45, 183.68],
  [185.45, 185.1],
  [184.34, 186.62],
  [183.2, 188.11],
  [182.14, 189.45],
  [180.95, 190.88],
  [179.71, 192.33],
  [178.69, 193.48],
  [178.12, 194.12],
  [177.5, 194.8],
]

export const INNER_CONTOUR: readonly (readonly [number, number])[] = [
  [65.32, 161.47],
  [65.0, 161.02],
  [64.69, 160.57],
  [64.38, 160.11],
  [64.07, 159.64],
  [63.46, 158.72],
  [62.86, 157.79],
  [62.28, 156.84],
  [61.71, 155.87],
  [61.17, 154.89],
  [60.67, 153.96],
  [60.18, 153.01],
  [59.72, 152.05],
  [59.27, 151.09],
  [58.84, 150.11],
  [58.43, 149.13],
  [58.05, 148.13],
  [57.68, 147.14],
  [57.33, 146.13],
  [56.98, 145.07],
  [56.65, 144.0],
  [56.36, 142.99],
  [56.09, 141.97],
  [55.84, 140.96],
  [55.61, 139.94],
  [55.41, 138.92],
  [55.23, 137.91],
  [55.07, 136.9],
  [54.94, 135.92],
  [54.82, 134.91],
  [54.67, 133.96],
  [54.56, 132.99],
  [54.48, 131.99],
  [54.44, 130.97],
  [54.41, 129.97],
  [54.41, 128.95],
  [54.41, 127.97],
  [54.43, 126.97],
  [54.48, 126.0],
  [54.59, 124.91],
  [54.69, 123.9],
  [54.8, 122.91],
  [54.92, 121.94],
  [55.05, 120.95],
  [55.2, 120.04],
  [55.37, 119.06],
  [55.56, 118.14],
  [55.76, 117.22],
  [55.98, 116.3],
  [56.22, 115.37],
  [56.48, 114.45],
  [56.73, 113.59],
  [57.01, 112.73],
  [57.29, 111.87],
  [57.6, 111.01],
  [57.93, 110.1],
  [58.26, 109.25],
  [58.61, 108.41],
  [58.96, 107.57],
  [59.33, 106.74],
  [59.71, 105.91],
  [60.11, 105.1],
  [60.51, 104.29],
  [60.92, 103.49],
  [61.32, 102.76],
  [61.76, 101.99],
  [62.17, 101.27],
  [62.63, 100.52],
  [63.06, 99.83],
  [63.54, 99.1],
  [63.99, 98.44],
  [64.49, 97.74],
  [64.99, 97.06],
  [65.5, 96.39],
  [66.02, 95.75],
  [66.57, 95.08],
  [67.02, 94.48],
  [67.22, 93.71],
  [67.52, 93.0],
  [67.97, 92.32],
  [68.53, 91.71],
  [69.09, 91.14],
  [69.67, 90.55],
  [70.25, 89.98],
  [70.81, 89.44],
  [71.46, 88.88],
  [72.41, 88.48],
  [73.25, 88.06],
  [73.95, 87.62],
  [74.55, 87.14],
  [75.16, 86.66],
  [75.76, 86.2],
  [76.35, 85.76],
  [76.97, 85.32],
  [77.59, 84.89],
  [78.23, 84.47],
  [78.85, 84.06],
  [79.49, 83.66],
  [80.11, 83.28],
  [80.74, 82.91],
  [81.38, 82.54],
  [82.03, 82.18],
  [82.68, 81.82],
  [83.33, 81.47],
  [83.96, 81.15],
  [84.61, 80.82],
  [85.27, 80.5],
  [85.95, 80.18],
  [86.6, 79.89],
  [87.25, 79.6],
  [87.92, 79.32],
  [88.58, 79.06],
  [89.24, 78.8],
  [89.93, 78.55],
  [90.6, 78.32],
  [91.27, 78.09],
  [91.93, 77.89],
  [92.63, 77.68],
  [93.3, 77.49],
  [93.99, 77.3],
  [94.66, 77.13],
  [95.34, 76.97],
  [96.0, 76.82],
  [96.68, 76.67],
  [97.36, 76.53],
  [98.02, 76.41],
  [98.7, 76.28],
  [99.38, 76.17],
  [100.05, 76.06],
  [100.75, 75.95],
  [101.4, 75.86],
  [102.05, 75.77],
  [102.71, 75.68],
  [103.36, 75.6],
  [104.0, 75.53],
  [104.63, 75.45],
  [105.3, 75.35],
  [106.0, 75.24],
  [106.69, 75.12],
  [107.39, 75.09],
  [108.13, 75.09],
  [108.82, 75.09],
  [109.52, 75.11],
  [110.22, 75.14],
  [110.89, 75.2],
  [111.59, 75.3],
  [112.25, 75.43],
  [112.88, 75.59],
  [113.52, 75.66],
  [114.17, 75.74],
  [114.84, 75.83],
  [115.5, 75.93],
  [116.22, 76.04],
  [116.93, 76.16],
  [117.57, 76.28],
  [118.21, 76.4],
  [118.91, 76.54],
  [119.6, 76.68],
  [120.28, 76.84],
  [120.96, 77.0],
  [121.64, 77.17],
  [122.3, 77.34],
  [122.97, 77.53],
  [123.63, 77.72],
  [124.34, 77.93],
  [124.99, 78.14],
  [125.69, 78.38],
  [126.33, 78.6],
  [126.96, 78.83],
  [127.65, 79.09],
  [128.27, 79.34],
  [128.95, 79.62],
  [129.62, 79.9],
  [130.28, 80.2],
  [130.94, 80.5],
  [131.59, 80.82],
  [132.25, 81.14],
  [132.94, 81.5],
  [133.59, 81.84],
  [134.23, 82.19],
  [134.86, 82.55],
  [135.49, 82.92],
  [136.12, 83.3],
  [136.74, 83.69],
  [137.36, 84.09],
  [137.98, 84.5],
  [138.56, 84.91],
  [139.17, 85.33],
  [139.79, 85.78],
  [140.38, 86.22],
  [140.98, 86.68],
  [141.56, 87.14],
  [142.16, 87.62],
  [142.84, 88.06],
  [143.64, 88.5],
  [144.55, 88.91],
  [145.17, 89.5],
  [145.76, 90.06],
  [146.34, 90.64],
  [146.93, 91.25],
  [147.49, 91.84],
  [148.07, 92.48],
  [148.52, 93.15],
  [148.83, 93.83],
  [149.06, 94.6],
  [149.54, 95.19],
  [150.07, 95.85],
  [150.57, 96.5],
  [151.07, 97.17],
  [151.57, 97.85],
  [152.05, 98.53],
  [152.52, 99.22],
  [153.01, 99.97],
  [153.46, 100.67],
  [153.93, 101.43],
  [154.35, 102.14],
  [154.8, 102.92],
  [155.19, 103.64],
  [155.61, 104.43],
  [155.99, 105.16],
  [156.38, 105.96],
  [156.75, 106.77],
  [157.11, 107.58],
  [157.46, 108.4],
  [157.8, 109.23],
  [158.12, 110.06],
  [158.45, 110.96],
  [158.74, 111.8],
  [159.04, 112.71],
  [159.31, 113.57],
  [159.56, 114.43],
  [159.81, 115.37],
  [160.04, 116.24],
  [160.26, 117.19],
  [160.47, 118.14],
  [160.65, 119.04],
  [160.83, 120.01],
  [160.99, 120.98],
  [161.14, 122.01],
  [161.28, 123.02],
  [161.44, 124.04],
  [161.63, 125.14],
  [161.84, 126.24],
  [161.9, 127.21],
  [161.95, 128.21],
  [161.96, 129.21],
  [161.96, 130.16],
  [161.93, 131.1],
  [161.88, 132.06],
  [161.76, 133.0],
  [161.59, 133.89],
  [161.35, 134.79],
  [161.21, 135.79],
  [161.07, 136.79],
  [160.91, 137.81],
  [160.73, 138.82],
  [160.52, 139.89],
  [160.3, 140.9],
  [160.06, 141.91],
  [159.79, 142.96],
  [159.52, 143.96],
  [159.21, 144.99],
  [158.88, 146.02],
  [158.53, 147.04],
  [158.16, 148.06],
  [157.76, 149.06],
  [157.35, 150.06],
  [156.9, 151.09],
  [156.45, 152.07],
  [155.96, 153.08],
  [155.47, 154.04],
  [154.93, 155.03],
  [154.41, 155.97],
  [153.85, 156.91],
  [153.29, 157.82],
  [152.69, 158.75],
  [152.09, 159.65],
  [151.78, 160.12],
  [151.49, 160.55],
  [151.17, 161.01],
  [150.88, 161.42],
]

function sampleContour(contour: readonly (readonly [number, number])[], angle: number): RingPoint {
  const normalized = Math.max(RING_START_ANGLE, Math.min(RING_END_ANGLE, angle))
  const position = (normalized - RING_START_ANGLE) / RING_ANGLE_STEP
  const index = Math.max(0, Math.min(contour.length - 2, Math.floor(position)))
  const fraction = position - index
  const p0 = contour[index]!
  const p1 = contour[index + 1]!
  return {
    x: p0[0] + (p1[0] - p0[0]) * fraction,
    y: p0[1] + (p1[1] - p0[1]) * fraction,
  }
}

function formatPoint(point: RingPoint): string {
  return `${point.x.toFixed(2)},${point.y.toFixed(2)}`
}

function arcPoints(contour: readonly (readonly [number, number])[], from: number, to: number): string[] {
  const points: string[] = []
  const direction = from <= to ? RING_ANGLE_STEP : -RING_ANGLE_STEP
  let angle = from
  while ((direction > 0 && angle <= to) || (direction < 0 && angle >= to)) {
    points.push(formatPoint(sampleContour(contour, angle)))
    angle += direction
  }
  const last = sampleContour(contour, to)
  const previous = points[points.length - 1]!
  if (previous !== formatPoint(last)) {
    points.push(formatPoint(last))
  }
  return points
}

type ContourCrossing = { point: RingPoint; angle: number }

function edgeIntersection(
  contour: readonly (readonly [number, number])[],
  centerlineAngle: number,
  sign: 1 | -1,
  gapWidth: number,
): ContourCrossing {
  const radians = (centerlineAngle * Math.PI) / 180
  const nx = -Math.sin(radians)
  const ny = Math.cos(radians)
  const offset = (sign * gapWidth) / 2
  const windowHalfWidth = 6
  const steps = 48
  let previousAngle = centerlineAngle - windowHalfWidth
  let previous = sampleContour(contour, previousAngle)
  let previousDistance =
    (previous.x - RING_CENTER.x) * nx + (previous.y - RING_CENTER.y) * ny - offset
  for (let step = 1; step <= steps; step += 1) {
    const angle = centerlineAngle - windowHalfWidth + (2 * windowHalfWidth * step) / steps
    const point = sampleContour(contour, angle)
    const distance =
      (point.x - RING_CENTER.x) * nx + (point.y - RING_CENTER.y) * ny - offset
    if (previousDistance * distance <= 0) {
      const fraction = -previousDistance / (distance - previousDistance)
      return {
        point: {
          x: previous.x + (point.x - previous.x) * fraction,
          y: previous.y + (point.y - previous.y) * fraction,
        },
        angle: previousAngle + (angle - previousAngle) * fraction,
      }
    }
    previous = point
    previousAngle = angle
    previousDistance = distance
  }
  return { point: sampleContour(contour, centerlineAngle), angle: centerlineAngle }
}

const START_CAP_OUTER = { x: 39.25919, y: 195.70138 }
const START_CAP_INNER = { x: 68.85478, y: 165.7958 }
const START_CAP_CURVE = "L 54.08487,180.74859 C 45.96142,188.97263 39.28987,195.70138 39.25919,195.70138"
const END_CAP_OUTER = { x: 176.88632, y: 195.46801 }
const END_CAP_INNER = { x: 162.08327, y: 180.64845 }

export function buildSectorPath(
  startAngle: number,
  endAngle: number,
  gapWidth = RING_GAP_WIDTH,
  outerContour: readonly (readonly [number, number])[] = OUTER_CONTOUR,
  innerContour: readonly (readonly [number, number])[] = INNER_CONTOUR,
): string {
  const isFirst = startAngle === RING_START_ANGLE
  const isLast = endAngle === RING_END_ANGLE
  const startGap = isFirst ? 0 : gapWidth
  const endGap = isLast ? 0 : gapWidth
  const outerStart = edgeIntersection(outerContour, startAngle, 1, startGap)
  const outerEnd = edgeIntersection(outerContour, endAngle, -1, endGap)
  const innerStart = edgeIntersection(innerContour, startAngle, 1, startGap)
  const innerEnd = edgeIntersection(innerContour, endAngle, -1, endGap)
  const outer = arcPoints(outerContour, outerStart.angle, outerEnd.angle)
  const inner = arcPoints(innerContour, innerEnd.angle, innerStart.angle)
  if (isFirst) {
    return [
      "M",
      formatPoint(START_CAP_OUTER),
      ...outer,
      "L",
      formatPoint(innerEnd.point),
      ...inner.slice(0, -1),
      formatPoint(START_CAP_INNER),
      START_CAP_CURVE,
      "Z",
    ].join(" ")
  }
  if (isLast) {
    return [
      "M",
      ...outer,
      formatPoint(END_CAP_OUTER),
      "L",
      formatPoint(END_CAP_INNER),
      ...inner.slice(1),
      "L",
      formatPoint(innerStart.point),
      "Z",
    ].join(" ")
  }
  return [
    "M",
    ...outer,
    "L",
    formatPoint(innerEnd.point),
    ...inner,
    "L",
    formatPoint(innerStart.point),
    "Z",
  ].join(" ")
}

export function getRingPoint(
  angle: number,
  innerFraction: number,
  outerContour: readonly (readonly [number, number])[] = OUTER_CONTOUR,
  innerContour: readonly (readonly [number, number])[] = INNER_CONTOUR,
): RingPoint {
  const inner = sampleContour(innerContour, angle)
  const outer = sampleContour(outerContour, angle)
  return {
    x: inner.x + (outer.x - inner.x) * innerFraction,
    y: inner.y + (outer.y - inner.y) * innerFraction,
  }
}
