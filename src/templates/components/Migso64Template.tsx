import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 642,
    "y": 262,
    "width": 156,
    "height": 156,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 6 0 C 87 4, 152 69, 156 150 L 156 156 L 68 156 L 67 151 C 64 118, 38 92, 5 89 L 0 88 L 0 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 642,
    "y": 101,
    "width": 156,
    "height": 156,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 156 0 L 156 88 L 151 89 C 118 92, 92 118, 89 151 L 88 156 L 0 156 L 0 150 C 4 69, 69 4, 150 0 L 156 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 482,
    "y": 101,
    "width": 156,
    "height": 156,
    "text": "",
    "pathD": "M 0 0 L 88 0 L 89 5 C 92 38, 118 64, 151 67 L 156 68 L 156 156 L 150 156 C 69 152, 4 87, 0 6 L 0 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 642,
    "y": 489,
    "width": 156,
    "height": 156,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 0 0 L 6 0 C 87 4, 152 69, 156 150 L 156 156 L 68 156 L 67 151 C 64 118, 38 92, 5 89 L 0 88 L 0 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 482,
    "y": 329,
    "width": 156,
    "height": 156,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 88 0 L 89 5 C 92 38, 118 64, 151 67 L 156 68 L 156 156 L 150 156 C 69 152, 4 87, 0 6 L 0 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 482,
    "y": 489,
    "width": 156,
    "height": 156,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 68 0 L 156 0 L 156 6 C 152 87, 87 152, 6 156 L 0 156 L 0 68 L 5 67 C 38 64, 64 38, 67 5 L 68 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 540,
    "y": 547,
    "width": 41,
    "height": 41,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 21 37 C 20 37, 19 38, 19 39 L 19 40 L 38 40 L 38 39 C 38 38, 37 37, 36 37 L 36 37 L 22 37 L 21 37 Z M 26 25 C 26 31, 24 34, 23 36 L 34 36 C 33 34, 31 31, 31 25 L 26 25 Z M 26 21 L 26 24 L 31 24 L 31 21 L 26 21 Z M 16 18 C 17 18, 17 18, 17 19 L 17 20 C 18 20, 19 20, 20 21 C 20 22, 20 22, 19 22 C 19 22, 19 22, 18 22 C 18 21, 17 21, 16 21 C 15 21, 14 22, 14 23 C 14 23, 15 24, 16 24 C 19 24, 20 26, 20 27 C 20 29, 19 30, 17 30 L 17 31 C 17 32, 17 32, 16 32 C 16 32, 16 32, 16 31 L 16 30 C 15 30, 14 30, 13 29 C 13 28, 13 28, 14 28 C 14 28, 14 28, 14 28 C 15 29, 16 29, 16 29 C 18 29, 19 28, 19 27 C 19 27, 18 26, 16 26 C 14 26, 13 24, 13 23 C 13 21, 14 20, 16 20 L 16 19 C 16 18, 16 18, 16 18 Z M 25 15 L 27 20 L 31 20 L 32 15 L 25 15 Z M 29 11 C 29 11, 29 11, 29 11 L 29 14 L 33 14 C 33 14, 34 14, 34 14 C 34 14, 34 14, 34 14 L 32 20 L 33 20 C 34 20, 34 20, 34 20 C 34 21, 34 21, 33 21 L 32 21 L 32 24 L 33 24 C 34 24, 34 24, 34 24 C 34 25, 34 25, 33 25 L 32 25 C 33 32, 35 35, 36 36 L 36 36 C 38 36, 39 37, 39 39 L 39 40 L 40 40 C 41 40, 41 40, 41 40 C 41 41, 41 41, 40 41 L 17 41 C 17 41, 16 41, 16 40 C 16 40, 17 40, 17 40 L 18 40 L 18 39 C 18 37, 19 36, 21 36 L 21 36 C 22 35, 25 32, 25 25 L 24 25 C 24 25, 23 25, 23 24 C 23 24, 24 24, 24 24 L 25 24 L 25 21 L 24 21 C 24 21, 23 21, 23 20 C 23 20, 24 20, 24 20 L 25 20 L 23 14 C 23 14, 23 14, 24 14 C 24 14, 24 14, 24 14 L 28 14 L 28 11 C 28 11, 28 11, 29 11 Z M 12 1 C 11 1, 11 1, 11 2 C 10 2, 10 2, 10 3 L 13 9 C 13 9, 14 10, 14 10 L 14 6 C 14 5, 14 5, 14 5 C 15 5, 15 5, 15 6 L 16 10 C 16 10, 16 10, 17 10 C 17 10, 17 10, 17 10 L 18 6 C 18 5, 18 5, 19 5 C 19 5, 19 5, 19 6 L 19 10 C 19 10, 20 9, 20 9 L 23 3 C 23 2, 23 2, 22 2 C 22 1, 22 1, 21 1 L 18 2 C 17 3, 16 3, 15 2 L 12 1 Z M 12 0 L 15 1 C 16 2, 17 2, 18 1 L 21 0 C 22 0, 23 0, 23 1 C 24 1, 24 2, 24 3 L 22 9 C 22 9, 23 10, 24 11 C 24 12, 24 12, 24 12 C 24 12, 23 12, 23 12 C 22 11, 21 10, 21 10 C 20 11, 18 12, 17 12 C 15 12, 13 11, 12 10 C 10 12, 3 18, 3 31 C 3 33, 3 34, 2 36 C 2 37, 1 38, 1 39 C 2 40, 9 40, 13 40 L 14 40 C 15 40, 15 40, 15 40 C 15 40, 15 41, 14 41 L 13 41 C 12 41, 11 41, 10 41 C 4 41, 1 41, 0 40 C 0 40, 0 39, 0 39 C 0 38, 0 36, 1 35 C 2 34, 2 32, 2 31 C 2 18, 10 11, 11 9 L 9 3 C 9 2, 9 1, 10 1 C 10 0, 11 0, 12 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 539,
    "y": 159,
    "width": 41,
    "height": 41,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 14 36 L 14 40 L 27 40 L 27 36 L 14 36 Z M 1 31 L 1 33 C 1 34, 2 35, 3 35 L 38 35 C 39 35, 40 34, 40 33 L 40 31 L 1 31 Z M 6 26 L 6 30 L 8 30 L 8 26 L 6 26 Z M 28 24 L 34 24 C 35 24, 35 24, 35 25 C 35 25, 35 25, 34 25 L 28 25 C 28 25, 28 25, 28 25 C 28 24, 28 24, 28 24 Z M 14 21 L 14 30 L 16 30 L 16 21 L 14 21 Z M 28 20 L 37 20 C 37 20, 37 20, 37 20 C 37 21, 37 21, 37 21 L 28 21 C 28 21, 28 21, 28 20 C 28 20, 28 20, 28 20 Z M 7 19 C 6 19, 6 19, 6 20 C 6 21, 6 21, 7 21 C 7 21, 8 21, 8 20 C 8 19, 7 19, 7 19 Z M 22 17 L 22 30 L 25 30 L 25 17 L 22 17 Z M 15 13 C 14 13, 14 14, 14 15 C 14 15, 14 16, 15 16 C 16 16, 16 15, 16 15 C 16 14, 16 13, 15 13 Z M 4 12 L 10 12 C 10 12, 10 13, 10 13 C 10 13, 10 14, 10 14 L 4 14 C 3 14, 3 13, 3 13 C 3 13, 3 12, 4 12 Z M 23 10 C 23 10, 22 10, 22 11 C 22 12, 23 12, 23 12 C 24 12, 25 12, 25 11 C 25 10, 24 10, 23 10 Z M 8 8 L 18 8 C 18 8, 18 9, 18 9 C 18 9, 18 10, 18 10 L 8 10 C 8 10, 7 9, 7 9 C 7 9, 8 8, 8 8 Z M 4 8 L 5 8 C 5 8, 5 9, 5 9 C 5 9, 5 10, 5 10 L 4 10 C 3 10, 3 9, 3 9 C 3 9, 3 8, 4 8 Z M 16 4 L 25 4 C 25 4, 26 5, 26 5 C 26 5, 25 6, 25 6 L 16 6 C 16 6, 15 5, 15 5 C 15 5, 16 4, 16 4 Z M 8 4 L 13 4 C 13 4, 13 5, 13 5 C 13 5, 13 6, 13 6 L 8 6 C 8 6, 7 5, 7 5 C 7 5, 8 4, 8 4 Z M 4 4 L 5 4 C 5 4, 5 5, 5 5 C 5 5, 5 6, 5 6 L 4 6 C 3 6, 3 5, 3 5 C 3 5, 3 4, 4 4 Z M 33 4 C 33 4, 33 4, 33 5 L 33 5 C 34 6, 35 6, 36 7 C 36 8, 36 8, 35 8 C 35 8, 35 8, 34 8 C 34 7, 33 7, 33 7 C 31 7, 30 7, 30 8 C 30 9, 31 10, 33 10 C 35 10, 36 12, 36 13 C 36 15, 35 16, 33 16 L 33 17 C 33 17, 33 18, 33 18 C 32 18, 32 17, 32 17 L 32 16 C 31 16, 30 15, 29 14 C 29 14, 29 14, 30 14 C 30 13, 30 14, 31 14 C 31 15, 32 15, 33 15 C 34 15, 35 14, 35 13 C 35 12, 34 11, 33 11 C 30 11, 29 10, 29 8 C 29 7, 30 6, 32 5 L 32 5 C 32 4, 32 4, 33 4 Z M 3 1 C 2 1, 1 2, 1 3 L 1 20 L 4 20 C 4 19, 5 17, 7 17 C 7 17, 8 18, 8 18 L 13 15 C 13 15, 13 15, 13 15 C 13 13, 14 12, 15 12 C 16 12, 16 13, 17 13 L 21 11 C 21 11, 21 11, 21 11 C 21 9, 22 8, 23 8 C 25 8, 26 9, 26 11 C 26 12, 25 13, 23 13 C 23 13, 22 13, 21 12 L 17 14 C 17 14, 17 14, 17 15 C 17 16, 16 17, 15 17 C 14 17, 14 17, 13 16 L 9 19 C 9 19, 9 20, 9 20 C 9 21, 8 22, 7 22 C 6 22, 5 22, 4 21 L 1 22 L 1 30 L 4 30 L 4 25 C 4 25, 5 24, 5 24 L 9 24 C 9 24, 9 25, 9 25 L 9 30 L 13 30 L 13 20 C 13 20, 13 19, 13 19 L 17 19 C 17 19, 17 20, 17 20 L 17 30 L 21 30 L 21 16 C 21 16, 21 16, 21 16 L 25 16 C 26 16, 26 16, 26 16 L 26 30 L 40 30 L 40 3 C 40 2, 39 1, 38 1 L 3 1 Z M 3 0 L 38 0 C 40 0, 41 1, 41 3 L 41 30 L 41 33 C 41 35, 40 36, 38 36 L 29 36 L 29 40 L 33 40 C 33 40, 34 40, 34 40 C 34 41, 33 41, 33 41 L 8 41 C 8 41, 7 41, 7 40 C 7 40, 8 40, 8 40 L 12 40 L 12 36 L 3 36 C 1 36, 0 35, 0 33 L 0 30 L 0 3 C 0 1, 1 0, 3 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 700,
    "y": 319,
    "width": 41,
    "height": 41,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 12 32 L 11 35 C 13 36, 15 36, 18 37 L 18 33 C 16 33, 14 33, 12 32 Z M 32 30 C 31 30, 30 31, 30 32 C 30 33, 31 34, 32 34 C 33 34, 33 33, 33 32 C 33 31, 33 30, 32 30 Z M 32 29 C 33 29, 35 30, 35 32 C 35 34, 33 35, 32 35 C 30 35, 28 34, 28 32 C 28 30, 30 29, 32 29 Z M 7 27 L 4 28 C 5 31, 7 32, 10 34 L 11 31 C 9 30, 8 28, 7 27 Z M 31 24 L 30 26 C 30 26, 30 27, 30 27 C 30 27, 30 27, 29 27 C 29 27, 29 27, 29 27 L 27 25 C 26 26, 26 26, 25 27 L 27 29 C 27 29, 27 29, 27 29 C 27 30, 27 30, 27 30 C 27 30, 26 30, 26 30 L 24 31 C 24 31, 24 31, 24 32 C 24 32, 24 32, 24 33 L 26 33 C 26 33, 27 33, 27 33 C 27 34, 27 34, 27 34 C 27 34, 27 35, 27 35 L 25 37 C 26 37, 26 38, 27 38 L 29 36 C 29 36, 29 36, 29 36 C 30 37, 30 37, 30 37 C 30 37, 30 37, 30 37 L 31 40 C 31 40, 32 40, 33 40 L 33 37 C 33 37, 33 37, 33 37 C 34 37, 34 37, 34 36 C 34 36, 35 36, 35 36 L 37 38 C 37 38, 38 37, 38 37 L 36 35 C 36 35, 36 34, 36 34 C 37 34, 37 34, 37 33 C 37 33, 37 33, 37 33 L 40 33 C 40 32, 40 32, 40 32 C 40 31, 40 31, 40 31 L 37 30 C 37 30, 37 30, 37 30 C 37 30, 37 30, 36 29 C 36 29, 36 29, 36 29 L 38 27 C 38 26, 37 26, 37 25 L 35 27 C 35 27, 34 27, 34 27 C 34 27, 34 27, 33 27 C 33 27, 33 26, 33 26 L 33 24 C 32 24, 31 24, 31 24 Z M 30 22 C 31 22, 32 22, 33 22 C 33 23, 34 23, 34 23 L 34 26 C 34 26, 34 26, 34 26 L 36 24 C 37 24, 37 24, 37 24 C 38 25, 39 25, 39 26 C 39 26, 39 27, 39 27 L 38 29 L 38 29 L 40 30 C 41 30, 41 30, 41 30 C 41 31, 41 31, 41 32 C 41 32, 41 33, 41 33 C 41 33, 41 34, 40 34 L 38 34 C 38 34, 38 34, 38 34 L 39 36 C 39 37, 39 37, 39 37 C 39 38, 38 39, 37 39 C 37 39, 37 39, 36 39 L 34 38 C 34 38, 34 38, 34 38 L 34 40 C 34 41, 33 41, 33 41 C 33 41, 32 41, 32 41 C 31 41, 31 41, 30 41 C 30 41, 30 41, 30 40 L 29 38 C 29 38, 29 38, 29 38 L 27 39 C 27 39, 26 39, 26 39 C 25 39, 25 38, 24 37 C 24 37, 24 37, 24 36 L 26 34 C 26 34, 26 34, 26 34 L 23 34 C 23 34, 23 33, 23 33 C 22 33, 22 32, 22 32 C 22 31, 22 31, 23 30 C 23 30, 23 30, 23 30 L 26 29 L 26 29 L 24 27 C 24 27, 24 26, 24 26 C 25 25, 25 25, 26 24 C 26 24, 27 24, 27 24 L 29 26 C 29 26, 29 26, 29 26 L 30 23 C 30 23, 30 23, 30 22 Z M 1 20 C 1 22, 2 25, 3 27 L 6 26 C 5 24, 5 22, 5 20 L 1 20 Z M 27 18 C 27 18, 28 19, 28 19 C 28 19, 27 20, 27 20 C 27 20, 26 19, 26 19 C 26 19, 27 18, 27 18 Z M 11 18 C 11 18, 11 19, 11 19 C 11 19, 11 20, 11 20 C 10 20, 10 19, 10 19 C 10 19, 10 18, 11 18 Z M 34 11 L 31 12 C 32 14, 33 16, 33 18 L 36 18 C 36 16, 36 13, 34 11 Z M 3 11 C 2 13, 1 16, 1 18 L 5 18 C 5 16, 5 14, 6 12 L 3 11 Z M 19 9 C 19 9, 20 10, 20 10 L 20 11 C 21 12, 22 13, 23 14 C 23 14, 23 15, 23 15 C 22 15, 22 15, 22 14 C 21 13, 20 13, 19 13 C 17 13, 16 14, 16 15 C 16 17, 17 18, 19 18 C 22 18, 23 20, 23 22 C 23 24, 22 26, 20 26 L 20 28 C 20 28, 19 28, 19 28 C 19 28, 18 28, 18 28 L 18 26 C 17 26, 15 25, 15 24 C 15 23, 15 23, 15 23 C 15 23, 16 23, 16 23 C 16 24, 18 25, 19 25 C 21 25, 22 24, 22 22 C 22 20, 21 19, 19 19 C 16 19, 15 18, 15 15 C 15 13, 16 12, 18 11 L 18 10 C 18 10, 19 9, 19 9 Z M 28 4 L 26 7 C 28 8, 30 9, 31 11 L 34 10 C 32 7, 30 5, 28 4 Z M 10 4 C 7 5, 5 7, 4 10 L 7 11 C 8 9, 9 8, 11 7 L 10 4 Z M 19 1 L 19 5 C 22 5, 24 5, 25 6 L 27 3 C 25 2, 22 1, 19 1 Z M 18 1 C 15 1, 13 2, 11 3 L 12 6 C 14 5, 16 5, 18 5 L 18 1 Z M 19 0 C 29 0, 38 9, 38 19 C 38 20, 38 22, 37 23 C 37 23, 37 23, 37 23 C 36 23, 36 23, 36 23 C 36 22, 36 21, 36 20 L 33 20 C 33 20, 33 21, 33 21 C 33 21, 33 22, 32 22 C 32 22, 32 21, 32 21 C 32 20, 32 20, 32 19 C 32 12, 26 6, 19 6 C 12 6, 6 12, 6 19 C 6 26, 12 32, 19 32 C 19 32, 20 32, 21 32 C 21 32, 21 32, 21 32 C 22 33, 21 33, 21 33 C 20 33, 20 33, 19 33 L 19 37 C 20 37, 21 36, 22 36 C 23 36, 23 36, 23 37 C 23 37, 23 37, 23 37 C 21 38, 20 38, 19 38 C 8 38, 0 29, 0 19 C 0 9, 8 0, 19 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 700,
    "y": 547,
    "width": 41,
    "height": 41,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 22 16 C 20 16, 19 17, 19 19 C 19 20, 20 22, 22 22 C 23 22, 25 20, 25 19 C 25 19, 24 19, 24 19 C 23 19, 22 18, 22 16 C 22 16, 22 16, 22 16 Z M 24 15 C 23 15, 23 15, 23 16 C 23 17, 23 18, 24 18 C 25 18, 26 17, 26 16 C 26 15, 25 15, 24 15 Z M 24 14 C 26 14, 27 15, 27 16 C 27 17, 27 18, 26 18 C 26 18, 26 18, 26 19 C 26 21, 24 23, 22 23 C 19 23, 17 21, 17 19 C 17 16, 19 14, 22 14 C 22 14, 22 14, 22 14 C 23 14, 23 14, 24 14 Z M 22 10 C 17 10, 13 14, 13 19 C 13 23, 17 27, 22 27 C 26 27, 30 23, 30 19 C 30 14, 26 10, 22 10 Z M 3 0 C 3 0, 4 0, 4 1 L 4 23 L 7 20 C 7 20, 7 20, 8 20 L 12 25 L 14 24 C 13 22, 12 21, 12 19 C 12 13, 16 9, 22 9 C 24 9, 26 9, 27 10 L 29 8 C 30 8, 30 8, 30 8 L 32 10 L 40 2 C 40 2, 41 2, 41 2 C 41 2, 41 3, 41 3 L 32 11 C 32 11, 32 11, 32 11 C 32 11, 32 11, 31 11 L 30 10 L 28 11 C 30 13, 31 16, 31 19 C 31 24, 27 28, 22 28 C 19 28, 16 27, 14 25 L 13 26 C 13 27, 13 27, 12 27 C 12 27, 12 27, 12 26 L 7 21 L 4 25 L 4 37 L 8 37 L 8 26 C 8 26, 9 26, 9 26 C 9 26, 10 26, 10 26 L 10 37 L 14 37 L 14 28 C 14 28, 14 27, 15 27 C 15 27, 15 28, 15 28 L 15 37 L 20 37 L 20 30 C 20 29, 20 29, 21 29 C 21 29, 21 29, 21 30 L 21 37 L 26 37 L 26 29 C 26 29, 26 28, 26 28 C 27 28, 27 29, 27 29 L 27 37 L 31 37 L 31 23 C 31 23, 32 23, 32 23 C 32 23, 33 23, 33 23 L 33 37 L 37 37 L 37 8 C 37 8, 38 7, 38 7 C 38 7, 39 8, 39 8 L 39 37 L 40 37 C 41 37, 41 38, 41 38 C 41 38, 41 39, 40 39 L 4 39 L 4 40 C 4 41, 3 41, 3 41 C 3 41, 2 41, 2 40 L 2 39 L 1 39 C 0 39, 0 38, 0 38 C 0 38, 0 37, 1 37 L 2 37 L 2 33 L 1 33 C 0 33, 0 32, 0 32 C 0 32, 0 31, 1 31 L 2 31 L 2 27 L 1 27 C 0 27, 0 27, 0 26 C 0 26, 0 26, 1 26 L 2 26 L 2 21 L 1 21 C 0 21, 0 21, 0 20 C 0 20, 0 20, 1 20 L 2 20 L 2 15 L 1 15 C 0 15, 0 15, 0 15 C 0 14, 0 14, 1 14 L 2 14 L 2 10 L 1 10 C 0 10, 0 9, 0 9 C 0 9, 0 8, 1 8 L 2 8 L 2 4 L 1 4 C 0 4, 0 3, 0 3 C 0 3, 0 2, 1 2 L 2 2 L 2 1 C 2 0, 3 0, 3 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 700,
    "y": 159,
    "width": 41,
    "height": 41,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 7 30 C 7 29, 8 29, 8 30 L 9 31 L 10 30 C 11 29, 11 29, 11 30 C 12 30, 12 30, 11 31 L 10 32 L 11 33 C 12 33, 12 34, 11 34 C 11 34, 11 34, 11 34 C 11 34, 11 34, 10 34 L 9 33 L 8 34 C 8 34, 8 34, 8 34 C 8 34, 7 34, 7 34 C 7 34, 7 33, 7 33 L 8 32 L 7 31 C 7 30, 7 30, 7 30 Z M 6 28 C 5 28, 5 28, 5 28 L 5 36 C 5 36, 5 36, 6 36 L 13 36 C 13 36, 13 36, 13 36 L 13 28 C 13 28, 13 28, 13 28 L 6 28 Z M 32 27 C 32 27, 31 27, 31 27 C 31 28, 31 28, 31 28 C 31 29, 31 29, 31 29 C 32 30, 33 30, 33 29 C 34 29, 34 28, 33 27 C 33 27, 33 27, 32 27 Z M 6 27 L 13 27 C 14 27, 14 27, 14 28 L 14 36 C 14 36, 14 37, 13 37 L 6 37 C 5 37, 4 36, 4 36 L 4 28 C 4 27, 5 27, 6 27 Z M 32 26 C 33 26, 34 26, 34 26 C 35 27, 35 29, 34 30 C 34 31, 33 31, 32 31 C 31 31, 31 31, 30 30 C 30 30, 29 29, 29 28 C 29 28, 30 27, 30 26 C 31 26, 31 26, 32 26 Z M 25 19 C 25 19, 24 20, 24 20 C 24 20, 23 21, 23 21 C 23 21, 24 22, 24 22 C 24 23, 26 23, 26 22 C 27 22, 27 21, 26 20 C 26 20, 25 19, 25 19 Z M 34 18 C 34 18, 35 18, 35 18 C 35 19, 35 19, 35 19 L 23 31 C 23 31, 23 31, 23 31 C 23 31, 23 31, 22 31 C 22 31, 22 30, 22 30 L 34 18 Z M 25 18 C 26 18, 26 19, 27 19 C 28 20, 28 22, 27 23 C 26 24, 26 24, 25 24 C 24 24, 24 24, 23 23 C 22 22, 22 22, 22 21 C 22 20, 22 20, 23 19 C 24 19, 24 18, 25 18 Z M 9 15 C 10 15, 10 15, 10 16 L 10 17 L 11 17 C 12 17, 12 17, 12 18 C 12 18, 12 18, 11 18 L 10 18 L 10 20 C 10 20, 10 20, 9 20 C 9 20, 9 20, 9 20 L 9 18 L 7 18 C 7 18, 7 18, 7 18 C 7 17, 7 17, 7 17 L 9 17 L 9 16 C 9 15, 9 15, 9 15 Z M 29 14 C 23 14, 18 19, 18 25 C 18 31, 23 36, 29 36 C 35 36, 40 31, 40 25 C 40 19, 35 14, 29 14 Z M 6 14 C 5 14, 5 14, 5 14 L 5 21 C 5 21, 5 22, 6 22 L 13 22 C 13 22, 13 21, 13 21 L 13 14 C 13 14, 13 14, 13 14 L 6 14 Z M 6 12 L 13 12 C 14 12, 14 13, 14 14 L 14 21 C 14 22, 14 23, 13 23 L 6 23 C 5 23, 4 22, 4 21 L 4 14 C 4 13, 5 12, 6 12 Z M 3 10 C 2 10, 1 10, 1 11 L 1 38 C 1 39, 2 40, 3 40 L 30 40 C 31 40, 31 39, 31 38 L 31 37 C 31 37, 30 37, 29 37 C 22 37, 17 31, 17 25 C 17 18, 22 13, 29 13 C 30 13, 31 13, 31 13 L 31 11 C 31 10, 31 10, 30 10 L 3 10 Z M 27 4 C 28 4, 28 4, 28 4 C 28 4, 28 5, 28 5 C 28 5, 28 5, 28 5 C 28 5, 28 5, 28 5 C 28 5, 27 5, 27 5 C 27 5, 27 5, 27 5 C 27 5, 27 4, 27 4 Z M 19 4 C 19 4, 20 4, 20 4 C 20 4, 20 5, 20 5 C 20 5, 20 5, 20 5 C 20 5, 20 5, 19 5 C 19 5, 19 5, 19 5 C 19 5, 19 5, 19 5 C 19 5, 19 4, 19 4 Z M 24 4 C 24 4, 24 5, 24 5 C 24 5, 24 6, 24 6 C 23 6, 23 5, 23 5 C 23 5, 23 4, 24 4 Z M 3 1 C 2 1, 1 2, 1 3 L 1 6 C 1 7, 2 8, 3 8 L 30 8 C 31 8, 31 7, 31 6 L 31 3 C 31 2, 31 1, 30 1 L 3 1 Z M 3 0 L 30 0 C 31 0, 33 1, 33 3 L 33 6 C 33 7, 32 8, 31 9 C 32 9, 33 10, 33 11 L 33 13 C 38 15, 41 19, 41 25 C 41 30, 38 35, 33 36 L 33 38 C 33 40, 31 41, 30 41 L 3 41 C 1 41, 0 40, 0 38 L 0 11 C 0 10, 1 9, 1 9 C 1 8, 0 7, 0 6 L 0 3 C 0 1, 1 0, 3 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 539,
    "y": 386,
    "width": 41,
    "height": 41,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 18 37 L 24 37 C 24 37, 24 38, 24 38 C 24 38, 24 39, 24 39 L 18 39 C 17 39, 17 38, 17 38 C 17 38, 17 37, 18 37 Z M 1 36 L 1 38 C 1 39, 2 40, 3 40 L 38 40 C 39 40, 40 39, 40 38 L 40 36 L 1 36 Z M 4 29 L 2 35 L 39 35 L 37 29 L 4 29 Z M 25 12 L 24 22 L 27 22 L 29 12 L 25 12 Z M 17 12 L 18 22 L 23 22 L 24 12 L 17 12 Z M 12 12 L 14 22 L 17 22 L 16 12 L 12 12 Z M 16 6 C 17 6, 17 6, 17 6 C 17 6, 17 7, 17 7 L 13 11 L 28 11 L 24 7 C 24 7, 24 6, 24 6 C 24 6, 24 6, 25 6 L 30 11 L 32 11 C 32 11, 32 11, 32 12 C 32 12, 32 12, 32 12 L 30 12 L 28 23 C 28 23, 27 24, 27 24 L 14 24 C 14 24, 13 23, 13 23 L 11 12 L 9 12 C 9 12, 9 12, 9 12 C 9 11, 9 11, 9 11 L 11 11 L 16 6 Z M 6 1 C 5 1, 5 2, 5 3 L 5 28 L 36 28 L 36 3 C 36 2, 36 1, 35 1 L 6 1 Z M 6 0 L 35 0 C 36 0, 38 1, 38 3 L 38 29 L 41 35 C 41 35, 41 35, 41 35 L 41 38 C 41 40, 40 41, 38 41 L 3 41 C 1 41, 0 40, 0 38 L 0 35 C 0 35, 0 35, 0 35 L 3 29 L 3 3 C 3 1, 5 0, 6 0 Z"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 280,
    "y": 114,
    "width": 141,
    "height": 36,
    "text": "Your title 1"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 0,
    "x": 145,
    "y": 155,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 4,
    "x": 280,
    "y": 528,
    "width": 141,
    "height": 36,
    "text": "Your title 5"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 4,
    "x": 145,
    "y": 569,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 2,
    "x": 280,
    "y": 321,
    "width": 141,
    "height": 36,
    "text": "Your title 4"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 145,
    "y": 362,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 1,
    "x": 858,
    "y": 114,
    "width": 141,
    "height": 36,
    "text": "Your title 2"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 1,
    "x": 861,
    "y": 155,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 5,
    "x": 858,
    "y": 528,
    "width": 141,
    "height": 36,
    "text": "Your title 6"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 5,
    "x": 861,
    "y": 569,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 858,
    "y": 321,
    "width": 141,
    "height": 36,
    "text": "Your title 3"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 861,
    "y": 358,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
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

export function Migso64Template({ data }: { data: BrainData }): ReactElement {
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

        {titleLines.length > 0 && (
          <text
            x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)}
            y={bbox.y + (shapeDef.pathD || finalColor ? 20 : 10)}
            fontFamily="Arial, sans-serif"
            fontSize={shapeDef.isTitle ? 14 : (shapeDef.isSubtitle ? 10 : 12)}
            fontWeight={shapeDef.isTitle ? 700 : 400}
            fill={shapeDef.isTitle ? '#111827' : '#4b5563'}
          >
            {titleLines.map((line: string, lIdx: number) => (
              <tspan key={lIdx} x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)} dy={lIdx === 0 ? 0 : (shapeDef.isTitle ? 18 : 14)}>
                {line}
              </tspan>
            ))}
          </text>
        )}

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
