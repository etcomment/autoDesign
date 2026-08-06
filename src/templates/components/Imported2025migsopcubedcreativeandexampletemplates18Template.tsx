import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 484,
    "y": 110,
    "width": 315,
    "height": 129,
    "fillColor": "#3365cc",
    "pathD": "M 146 0 C 148 0, 149 0, 149 0 C 232 0, 306 49, 314 122 L 315 129 L 0 129 L 0 128 C 1 119, -1 109, 9 84 C 43 4, 130 0, 146 0 Z"
  },
  {
    "id": "sp-1",
    "x": 437,
    "y": 246,
    "width": 362,
    "height": 130,
    "fillColor": "#ff4d38",
    "pathD": "M 45 0 L 362 0 L 362 1 C 362 52, 334 92, 314 125 L 311 130 L 26 130 L 27 129 C 27 127, 28 126, 29 124 C 15 115, 26 105, 29 97 C 30 81, 20 84, 6 78 C -7 72, 1 52, 30 20 C 37 12, 42 7, 44 2 L 45 0 Z"
  },
  {
    "id": "sp-2",
    "x": 464,
    "y": 384,
    "width": 288,
    "height": 130,
    "fillColor": "#52c49c",
    "pathD": "M 0 0 L 280 0 L 276 7 C 270 19, 266 30, 266 41 C 266 46, 266 50, 266 55 C 266 57, 272 85, 283 117 L 288 130 L 106 130 L 108 116 C 109 107, 110 98, 110 89 C 110 86, 110 83, 109 81 C 103 57, 67 69, 30 69 C -6 69, 0 45, 4 35 C 8 24, 6 13, 6 13 C 7 11, 2 6, 0 0 L 0 0 Z"
  },
  {
    "id": "sp-3",
    "x": 533,
    "y": 521,
    "width": 271,
    "height": 129,
    "fillColor": "#ffb900",
    "pathD": "M 36 0 L 222 0 L 230 19 C 233 26, 236 32, 239 38 C 266 87, 271 129, 271 129 L 236 129 L 28 129 L 0 129 C 0 129, 22 68, 34 9 L 36 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 615,
    "y": 554,
    "width": 62,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 18 52 L 36 52 C 36 52, 37 52, 37 52 C 37 53, 36 53, 36 53 L 18 53 C 18 53, 17 53, 17 52 C 17 52, 18 52, 18 52 Z M 10 50 C 9 50, 8 51, 8 52 C 8 53, 9 54, 10 54 C 11 54, 12 53, 12 52 C 12 51, 11 50, 10 50 Z M 10 48 C 12 48, 14 50, 14 52 C 14 54, 12 56, 10 56 C 8 56, 6 54, 6 52 C 6 50, 8 48, 10 48 Z M 18 39 L 27 39 C 27 39, 28 39, 28 40 C 28 40, 27 41, 27 41 L 18 41 C 18 41, 17 40, 17 40 C 17 39, 18 39, 18 39 Z M 10 38 C 9 38, 8 39, 8 40 C 8 41, 9 42, 10 42 C 11 42, 12 41, 12 40 C 12 39, 11 38, 10 38 Z M 10 36 C 12 36, 14 38, 14 40 C 14 42, 12 44, 10 44 C 8 44, 6 42, 6 40 C 6 38, 8 36, 10 36 Z M 46 27 L 44 31 C 44 32, 43 32, 43 32 L 39 32 L 42 36 C 42 36, 42 36, 42 37 L 41 41 L 45 39 C 46 39, 46 39, 46 39 C 46 39, 46 39, 46 39 L 50 41 L 50 37 C 50 36, 50 36, 50 36 L 53 32 L 49 32 C 48 32, 48 32, 48 31 L 46 27 Z M 18 26 L 28 26 C 29 26, 29 27, 29 27 C 29 28, 29 28, 28 28 L 18 28 C 18 28, 17 28, 17 27 C 17 27, 18 26, 18 26 Z M 10 25 C 9 25, 8 26, 8 27 C 8 29, 9 29, 10 29 C 11 29, 12 29, 12 27 C 12 26, 11 25, 10 25 Z M 45 24 C 45 24, 46 24, 47 24 L 49 30 L 55 31 C 56 31, 56 31, 56 31 C 56 32, 56 32, 56 32 L 52 37 L 53 43 C 53 43, 52 43, 52 44 C 52 44, 52 44, 52 44 C 51 44, 51 44, 51 44 L 46 41 L 41 44 C 40 44, 40 44, 39 44 C 39 43, 39 43, 39 43 L 40 37 L 36 32 C 36 32, 35 32, 36 31 C 36 31, 36 31, 36 31 L 42 30 L 45 24 Z M 10 23 C 12 23, 14 25, 14 27 C 14 29, 12 31, 10 31 C 8 31, 6 29, 6 27 C 6 25, 8 23, 10 23 Z M 46 21 C 38 21, 32 27, 32 35 C 32 43, 38 49, 46 49 C 54 49, 60 43, 60 35 C 60 27, 54 21, 46 21 Z M 31 14 L 42 14 C 43 14, 43 14, 43 15 C 43 15, 43 16, 42 16 L 31 16 C 31 16, 30 15, 30 15 C 30 14, 31 14, 31 14 Z M 18 14 L 26 14 C 27 14, 27 14, 27 15 C 27 15, 27 16, 26 16 L 18 16 C 18 16, 17 15, 17 15 C 17 14, 18 14, 18 14 Z M 10 13 C 9 13, 8 13, 8 15 C 8 16, 9 17, 10 17 C 11 17, 12 16, 12 15 C 12 13, 11 13, 10 13 Z M 10 11 C 12 11, 14 12, 14 15 C 14 17, 12 19, 10 19 C 8 19, 6 17, 6 15 C 6 12, 8 11, 10 11 Z M 14 2 L 14 5 C 14 6, 15 6, 16 6 L 34 6 C 34 6, 35 6, 35 5 L 35 2 L 14 2 Z M 5 2 C 3 2, 2 3, 2 5 L 2 57 C 2 59, 3 60, 5 60 L 45 60 C 46 60, 48 59, 48 57 L 48 51 C 47 51, 47 51, 46 51 C 37 51, 30 44, 30 35 C 30 26, 37 19, 46 19 C 47 19, 47 19, 48 19 L 48 5 C 48 3, 46 2, 45 2 L 37 2 L 37 5 C 37 7, 35 8, 34 8 L 16 8 C 14 8, 12 7, 12 5 L 12 2 L 5 2 Z M 5 0 L 45 0 C 47 0, 49 2, 49 5 L 49 19 C 57 21, 62 27, 62 35 C 62 42, 57 49, 49 50 L 49 57 C 49 60, 47 62, 45 62 L 5 62 C 2 62, 0 60, 0 57 L 0 5 C 0 2, 2 0, 5 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 615,
    "y": 418,
    "width": 62,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 35 52 L 45 52 C 46 52, 46 52, 46 53 C 46 53, 46 54, 45 54 L 35 54 C 35 54, 34 53, 34 53 C 34 52, 35 52, 35 52 Z M 29 52 L 30 52 C 31 52, 31 52, 31 53 C 31 53, 31 54, 30 54 L 29 54 C 29 54, 28 53, 28 53 C 28 52, 29 52, 29 52 Z M 35 46 L 45 46 C 46 46, 46 46, 46 47 C 46 47, 46 48, 45 48 L 35 48 C 35 48, 34 47, 34 47 C 34 46, 35 46, 35 46 Z M 29 46 L 30 46 C 31 46, 31 46, 31 47 C 31 47, 31 48, 30 48 L 29 48 C 29 48, 28 47, 28 47 C 28 46, 29 46, 29 46 Z M 29 39 L 37 39 C 37 39, 38 40, 38 40 C 38 41, 37 41, 37 41 L 29 41 C 29 41, 28 41, 28 40 C 28 40, 29 39, 29 39 Z M 29 33 L 34 33 C 35 33, 35 33, 35 34 C 35 34, 35 35, 34 35 L 29 35 C 29 35, 28 34, 28 34 C 28 33, 29 33, 29 33 Z M 29 27 L 34 27 C 35 27, 35 27, 35 28 C 35 28, 35 29, 34 29 L 29 29 C 29 29, 28 28, 28 28 C 28 27, 29 27, 29 27 Z M 50 23 C 50 23, 51 23, 51 23 L 51 24 C 52 25, 53 25, 54 27 C 54 27, 54 28, 53 28 C 53 28, 52 28, 52 27 C 52 27, 51 26, 50 26 C 49 26, 47 27, 47 28 C 47 29, 48 30, 50 30 C 53 30, 54 32, 54 34 C 54 36, 53 37, 51 38 L 51 39 C 51 39, 50 39, 50 39 C 49 39, 49 39, 49 39 L 49 38 C 47 37, 46 37, 46 35 C 46 35, 46 34, 46 34 C 47 34, 47 34, 48 35 C 48 35, 49 36, 50 36 C 51 36, 52 35, 52 34 C 52 33, 51 32, 50 32 C 47 32, 46 30, 46 28 C 46 26, 47 25, 49 24 L 49 23 C 49 23, 49 23, 50 23 Z M 50 21 C 44 21, 39 25, 39 31 C 39 37, 44 41, 50 41 C 55 41, 60 37, 60 31 C 60 25, 55 21, 50 21 Z M 29 20 L 37 20 C 37 20, 38 21, 38 21 C 38 22, 37 22, 37 22 L 29 22 C 29 22, 28 22, 28 21 C 28 21, 29 20, 29 20 Z M 2 18 L 2 37 C 2 40, 4 42, 7 42 C 10 42, 12 40, 12 37 L 12 18 L 7 21 C 7 21, 7 21, 7 21 L 2 18 Z M 35 14 L 45 14 C 46 14, 46 15, 46 15 C 46 16, 46 16, 45 16 L 35 16 C 35 16, 34 16, 34 15 C 34 15, 35 14, 35 14 Z M 29 14 L 30 14 C 31 14, 31 15, 31 15 C 31 16, 31 16, 30 16 L 29 16 C 29 16, 28 16, 28 15 C 28 15, 29 14, 29 14 Z M 35 8 L 45 8 C 46 8, 46 9, 46 9 C 46 10, 46 10, 45 10 L 35 10 C 35 10, 34 10, 34 9 C 34 9, 35 8, 35 8 Z M 29 8 L 30 8 C 31 8, 31 9, 31 9 C 31 10, 31 10, 30 10 L 29 10 C 29 10, 28 10, 28 9 C 28 9, 29 8, 29 8 Z M 24 2 C 25 3, 26 5, 26 7 L 26 59 L 31 56 C 31 56, 31 56, 31 56 C 31 56, 32 56, 32 56 L 37 60 L 43 56 C 43 56, 44 56, 44 56 L 49 59 L 49 43 C 43 43, 38 37, 38 31 C 38 25, 43 19, 49 19 L 49 7 C 49 4, 47 2, 44 2 L 24 2 Z M 19 2 C 16 2, 14 4, 14 7 L 14 37 C 14 39, 13 41, 12 42 L 24 42 L 24 7 C 24 4, 22 2, 19 2 Z M 19 0 L 44 0 C 48 0, 51 3, 51 7 L 51 19 C 57 19, 62 25, 62 31 C 62 37, 57 43, 51 43 L 51 61 C 51 61, 51 62, 50 62 C 50 62, 50 62, 49 62 L 44 58 L 38 62 C 38 62, 38 62, 37 62 C 37 62, 37 62, 37 62 L 31 58 L 25 62 C 25 62, 25 62, 25 62 C 24 62, 24 61, 24 61 L 24 44 L 7 44 C 3 44, 0 41, 0 37 L 0 16 C 0 16, 0 16, 1 16 C 1 15, 1 15, 1 16 L 7 19 L 12 16 L 12 7 C 12 3, 15 0, 19 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 615,
    "y": 144,
    "width": 62,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 21 54 L 21 60 L 41 60 L 41 54 L 21 54 Z M 2 47 L 2 51 C 2 52, 3 53, 3 53 L 59 53 C 59 53, 60 52, 60 51 L 60 47 L 2 47 Z M 41 35 C 39 35, 38 36, 38 38 C 38 39, 39 40, 41 40 C 43 40, 44 39, 44 38 C 44 36, 43 35, 41 35 Z M 21 35 C 20 35, 18 36, 18 38 C 18 39, 20 40, 21 40 C 23 40, 24 39, 24 38 C 24 36, 23 35, 21 35 Z M 21 33 C 23 33, 25 34, 26 37 L 37 37 C 37 34, 39 33, 41 33 C 44 33, 46 35, 46 38 C 46 40, 44 42, 41 42 C 39 42, 37 41, 37 38 L 26 38 C 25 41, 23 42, 21 42 C 19 42, 16 40, 16 38 C 16 35, 19 33, 21 33 Z M 40 16 L 38 29 L 43 29 C 44 29, 45 28, 46 27 L 49 18 L 40 16 Z M 28 15 L 27 29 L 36 29 L 38 16 L 28 15 Z M 17 14 L 17 26 C 17 28, 18 29, 20 29 L 25 29 L 26 15 L 17 14 Z M 11 6 C 14 6, 16 8, 17 12 L 51 16 C 51 16, 51 16, 52 16 C 52 17, 52 17, 52 17 L 47 28 C 47 30, 45 31, 43 31 L 20 31 C 17 31, 15 29, 15 26 L 15 12 C 15 10, 13 8, 11 8 C 10 8, 10 8, 10 7 C 10 7, 10 6, 11 6 Z M 55 6 C 56 5, 56 5, 57 6 C 57 6, 57 6, 57 6 C 57 6, 57 7, 57 7 C 57 7, 56 7, 56 7 C 56 7, 56 7, 55 7 C 55 7, 55 6, 55 6 C 55 6, 55 6, 55 6 Z M 45 6 C 45 5, 46 5, 46 6 C 47 6, 47 6, 47 6 C 47 6, 47 7, 46 7 C 46 7, 46 7, 46 7 C 46 7, 45 7, 45 7 C 45 7, 45 6, 45 6 C 45 6, 45 6, 45 6 Z M 51 5 C 52 5, 52 6, 52 6 C 52 7, 52 7, 51 7 C 51 7, 50 7, 50 6 C 50 6, 51 5, 51 5 Z M 3 2 C 3 2, 2 3, 2 3 L 2 45 L 60 45 L 60 3 C 60 3, 59 2, 59 2 L 3 2 Z M 3 0 L 59 0 C 60 0, 62 1, 62 3 L 62 51 C 62 53, 60 54, 59 54 L 43 54 L 43 60 L 50 60 C 50 60, 51 61, 51 61 C 51 62, 50 62, 50 62 L 12 62 C 12 62, 11 62, 11 61 C 11 61, 12 60, 12 60 L 19 60 L 19 54 L 3 54 C 2 54, 0 53, 0 51 L 0 3 C 0 1, 2 0, 3 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 615,
    "y": 280,
    "width": 62,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 44 42 C 43 42, 42 43, 42 45 C 42 46, 43 47, 44 47 C 45 47, 47 46, 47 45 C 47 43, 45 42, 44 42 Z M 17 42 C 16 42, 15 43, 15 45 C 15 46, 16 47, 17 47 C 19 47, 19 46, 19 45 C 19 43, 19 42, 17 42 Z M 44 41 C 47 41, 48 42, 48 45 C 48 47, 47 49, 44 49 C 42 49, 40 47, 40 45 C 40 42, 42 41, 44 41 Z M 17 41 C 20 41, 21 42, 21 45 C 21 47, 20 49, 17 49 C 15 49, 13 47, 13 45 C 13 42, 15 41, 17 41 Z M 31 36 C 31 36, 32 37, 32 38 L 32 38 C 33 39, 34 39, 34 41 C 35 41, 34 42, 34 42 C 34 42, 33 42, 33 41 C 33 41, 32 40, 31 40 C 29 40, 28 41, 28 42 C 28 43, 29 44, 31 44 C 34 44, 35 46, 35 48 C 35 50, 33 51, 32 52 L 32 52 C 32 53, 31 53, 31 53 C 30 53, 30 53, 30 52 L 30 52 C 28 51, 27 51, 27 49 C 27 49, 27 48, 27 48 C 28 48, 28 48, 29 49 C 29 49, 30 50, 31 50 C 32 50, 33 49, 33 48 C 33 47, 32 46, 31 46 C 28 46, 27 44, 27 42 C 27 40, 28 39, 30 38 L 30 38 C 30 37, 30 36, 31 36 Z M 11 35 C 11 37, 9 38, 7 39 L 7 51 C 9 51, 11 53, 11 54 L 51 54 C 51 53, 53 51, 54 51 L 54 39 C 53 38, 51 37, 51 35 L 11 35 Z M 10 33 L 52 33 C 52 33, 52 33, 52 34 C 52 36, 54 37, 55 37 C 56 37, 56 37, 56 38 L 56 51 C 56 52, 56 52, 55 52 C 54 52, 52 54, 52 55 C 52 56, 52 56, 52 56 L 10 56 C 10 56, 9 56, 9 55 C 9 54, 8 52, 6 52 C 6 52, 5 52, 5 51 L 5 38 C 5 37, 6 37, 6 37 C 8 37, 9 36, 9 34 C 9 33, 10 33, 10 33 Z M 2 29 L 2 60 L 60 60 L 60 29 L 2 29 Z M 25 17 C 26 17, 26 18, 26 18 L 26 25 C 26 25, 26 26, 25 26 C 25 26, 24 25, 24 25 L 24 18 C 24 18, 25 17, 25 17 Z M 31 13 C 31 13, 32 14, 32 14 L 32 25 C 32 25, 31 26, 31 26 C 30 26, 30 25, 30 25 L 30 14 C 30 14, 30 13, 31 13 Z M 16 13 C 15 13, 14 14, 14 15 C 14 16, 15 17, 16 17 C 17 17, 18 16, 18 15 C 18 14, 17 13, 16 13 Z M 16 8 C 15 8, 14 9, 14 10 C 14 10, 14 11, 15 11 C 15 11, 16 11, 16 11 C 17 11, 17 11, 18 11 C 18 11, 18 10, 18 10 C 18 9, 17 8, 16 8 Z M 25 6 C 26 6, 26 6, 26 7 L 26 14 C 26 14, 26 15, 25 15 C 25 15, 24 14, 24 14 L 24 7 C 24 6, 25 6, 25 6 Z M 16 6 C 18 6, 20 8, 20 10 C 20 11, 20 12, 19 12 C 20 13, 20 14, 20 15 C 20 17, 18 19, 16 19 C 14 19, 12 17, 12 15 C 12 14, 13 13, 13 12 C 13 12, 12 11, 12 10 C 12 8, 14 6, 16 6 Z M 8 0 L 36 0 C 38 0, 39 1, 39 3 L 39 7 L 54 7 C 55 7, 57 9, 57 11 L 57 25 C 57 25, 57 26, 56 26 C 56 26, 55 25, 55 25 L 55 11 C 55 10, 54 9, 54 9 L 50 9 L 50 25 C 50 25, 49 26, 49 26 C 48 26, 48 25, 48 25 L 48 9 L 39 9 L 39 28 L 61 28 C 62 28, 62 28, 62 29 L 62 61 C 62 62, 62 62, 61 62 L 1 62 C 0 62, 0 62, 0 61 L 0 29 C 0 28, 0 28, 1 28 L 38 28 L 38 3 C 38 3, 37 2, 36 2 L 8 2 C 8 2, 7 3, 7 3 L 7 25 C 7 25, 6 26, 6 26 C 5 26, 5 25, 5 25 L 5 3 C 5 1, 7 0, 8 0 Z"
  },
  {
    "id": "sp-8",
    "x": 839,
    "y": 538,
    "width": 121,
    "height": 36,
    "text": "Marketing",
    "textColor": "#ffb900",
    "textSize": 16
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 3,
    "x": 839,
    "y": 578,
    "width": 283,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 0,
    "x": 839,
    "y": 264,
    "width": 110,
    "height": 36,
    "text": "Planning",
    "textColor": "#ff4d38",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 1,
    "x": 839,
    "y": 305,
    "width": 283,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 1,
    "x": 335,
    "y": 401,
    "width": 109,
    "height": 36,
    "text": "Rebrand",
    "textColor": "#52c49c",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 2,
    "x": 160,
    "y": 442,
    "width": 283,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-14",
    "x": 381,
    "y": 127,
    "width": 62,
    "height": 36,
    "text": "Idea",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 0,
    "x": 160,
    "y": 168,
    "width": 283,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  }
]

const DEFAULT_COLORS = ["#282a5d","#3365cc","#ff4d38","#ffb900","#52c49c","#ee6d90"]

function wrapText(text: string, maxCharsPerLine: number): string[] {
  if (!text) return []
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim()
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines
}

export function Imported2025migsopcubedcreativeandexampletemplates18Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const branches = data?.branches && data.branches.length > 0 ? data.branches : []

  const renderShape = (shapeDef: any, parentBbox: any) => {
    const id = shapeDef.id
    const isRoot = parentBbox === null
    
    let bbox = { x: shapeDef.x, y: shapeDef.y, width: shapeDef.width || shapeDef.w, height: shapeDef.height || shapeDef.h }
    
    if (isRoot) {
      const pos = positions[id]
      bbox = {
        x: pos?.x ?? bbox.x,
        y: pos?.y ?? bbox.y,
        width: pos?.width ?? bbox.width,
        height: pos?.height ?? bbox.height,
      }
    } else if (parentBbox && shapeDef.localPctX !== undefined) {
      bbox = {
        x: parentBbox.x + shapeDef.localPctX * parentBbox.width,
        y: parentBbox.y + shapeDef.localPctY * parentBbox.height,
        width: Math.max(1, shapeDef.localPctW * parentBbox.width),
        height: Math.max(1, shapeDef.localPctH * parentBbox.height),
      }
    }

    const isSelected = selectedIds.has(id)
    
    const branch = (shapeDef.dataNodeIdx !== undefined && shapeDef.dataNodeIdx !== -1 && shapeDef.dataNodeIdx < branches.length) 
      ? branches[shapeDef.dataNodeIdx] 
      : null

    let finalColor = shapeDef.fillColor
    let finalStroke = shapeDef.strokeColor
    if (shapeDef.isColorNode && branch) {
      const branchColor = branch.color || DEFAULT_COLORS[shapeDef.dataNodeIdx % DEFAULT_COLORS.length]
      if (finalColor && finalColor.toLowerCase() !== '#ffffff' && finalColor.toLowerCase() !== '#000000') {
        finalColor = branchColor
      }
      if (finalStroke && finalStroke.toLowerCase() !== '#ffffff' && finalStroke.toLowerCase() !== '#000000') {
        finalStroke = branchColor
      }
    }
    
    finalColor = tplColors[id] ?? finalColor

    let finalText = shapeDef.text
    if (shapeDef.isTitle && branch?.title) {
      finalText = branch.title
    }
    if (shapeDef.isSubtitle && branch?.subtitle) {
      finalText = branch.subtitle
    }

    if (shapeDef.isGroup) {
      return (
        <g key={id} onMouseDown={isRoot ? (e => startDrag(e, id, bbox)) : undefined} transform={isRoot ? getTransform(id, bbox) : undefined} style={{ cursor: isRoot ? 'pointer' : 'default' }}>
          {shapeDef.children?.map((child: any) => renderShape(child, bbox))}
          {isRoot && isSelected && renderHandles(bbox, id)}
        </g>
      )
    }

    const titleLines = finalText ? wrapText(finalText, Math.max(10, Math.floor(bbox.width / 6))) : []

    return (
      <g key={id} onMouseDown={isRoot ? (e => startDrag(e, id, bbox)) : undefined} transform={isRoot ? getTransform(id, bbox) : undefined} style={{ cursor: isRoot ? 'pointer' : 'default' }}>
        {shapeDef.pathD ? (
          <path
            d={shapeDef.pathD}
            transform={`translate(${bbox.x}, ${bbox.y}) scale(${bbox.width / Math.max(1, shapeDef.width || shapeDef.w)}, ${bbox.height / Math.max(1, shapeDef.height || shapeDef.h)})`}
            fill={finalColor || 'transparent'}
            opacity={isSelected && isRoot ? 0.88 : 1}
            stroke={isSelected && isRoot ? '#4a90d9' : (finalStroke || 'transparent')}
            strokeWidth={isSelected && isRoot ? 2.5 : (finalStroke ? 1.5 : 0)}
          />
        ) : (
          (finalColor || finalStroke) && (
            <rect
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              rx={8}
              fill={finalColor || 'transparent'}
              opacity={isSelected && isRoot ? 0.88 : 1}
              stroke={isSelected && isRoot ? '#4a90d9' : (finalStroke || 'transparent')}
              strokeWidth={isSelected && isRoot ? 2.5 : (finalStroke ? 1.5 : 0)}
            />
          )
        )}

        {titleLines.length > 0 ? (() => {
          const fs = shapeDef.textSize || (shapeDef.isTitle ? 14 : (shapeDef.isSubtitle ? 10 : 12));
          return (
            <text
              x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)}
              y={bbox.y + fs * 0.9 + (shapeDef.pathD || finalColor ? 10 : 0)}
              fontFamily="Arial, sans-serif"
              fontSize={fs}
              fontWeight={shapeDef.isTitle ? 700 : 400}
              fill={shapeDef.textColor || (shapeDef.isTitle ? '#111827' : '#4b5563')}
            >
              {titleLines.map((line: string, lIdx: number) => (
                <tspan key={lIdx} x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)} dy={lIdx === 0 ? 0 : Math.round(fs * 1.2)}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })() : null}

        {isRoot && isSelected && renderHandles(bbox, id)}
      </g>
    )
  }

  return (
    <g ref={svgRef}>
      {PPTX_EXTRACTED_SHAPES.map((shapeDef) => renderShape(shapeDef, null))}
    </g>
  )
}
