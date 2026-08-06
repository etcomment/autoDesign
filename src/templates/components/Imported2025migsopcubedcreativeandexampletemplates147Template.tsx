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
    "x": 424,
    "y": 351,
    "width": 122,
    "height": 157,
    "fillColor": "#ffffff",
    "pathD": "M 122 79 C 122 35, 87 0, 44 0 L 0 0 L 0 52 L 44 52 C 58 52, 70 64, 70 79 C 70 93, 58 105, 44 105 L 0 105 L 0 157 L 44 157 C 87 157, 122 122, 122 79 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 445,
    "y": 372,
    "width": 81,
    "height": 116,
    "fillColor": "#ffffff",
    "pathD": "M 0 10 L 0 0 L 20 0 L 20 10 C 20 10, 0 10, 0 10 Z M 53 20 C 48 16, 43 13, 37 12 L 40 2 C 47 4, 53 7, 59 12 C 59 12, 53 20, 53 20 Z M 71 49 C 70 43, 68 38, 65 33 L 73 28 C 77 34, 80 40, 81 47 C 81 47, 71 49, 71 49 Z M 73 89 L 65 83 C 68 78, 70 73, 71 67 L 81 69 C 80 76, 77 82, 73 89 Z M 40 114 L 37 104 C 43 103, 48 100, 53 96 L 59 104 C 53 109, 47 112, 40 114 Z M 0 116 L 0 106 L 19 106 L 19 116 C 19 116, 0 116, 0 116 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 732,
    "y": 246,
    "width": 122,
    "height": 157,
    "fillColor": "#ffffff",
    "pathD": "M 0 79 C 0 35, 35 0, 78 0 L 122 0 L 122 52 L 78 52 C 64 52, 52 64, 52 79 C 52 93, 64 105, 78 105 L 122 105 L 122 157 L 78 157 C 35 157, 0 122, 0 79 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 739,
    "y": 268,
    "width": 94,
    "height": 116,
    "fillColor": "#ffffff",
    "pathD": "M 71 10 L 71 0 L 94 0 L 94 10 C 94 10, 71 10, 71 10 Z M 25 12 C 32 7, 39 4, 47 2 L 50 12 C 44 13, 38 16, 32 20 C 32 20, 25 12, 25 12 Z M 0 47 C 2 40, 4 34, 9 28 L 19 33 C 15 38, 12 43, 11 49 C 11 49, 0 47, 0 47 Z M 0 69 L 11 67 C 12 73, 15 78, 19 83 L 9 89 C 5 82, 2 76, 0 69 Z M 25 104 L 32 96 C 38 100, 44 103, 51 104 L 47 114 C 39 112, 32 109, 25 104 Z M 71 116 L 71 106 L 94 106 L 94 116 C 94 116, 71 116, 71 116 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 545,
    "y": 351,
    "width": 192,
    "height": 52,
    "fillColor": "#ffffff",
    "pathD": "M 0 52 L 192 52 L 192 0 L 0 0 C 0 0, 0 52, 0 52 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 545,
    "y": 373,
    "width": 176,
    "height": 10,
    "fillColor": "#ffffff",
    "pathD": "M 156 10 L 156 0 L 176 0 L 176 10 C 176 10, 156 10, 156 10 Z M 117 10 L 117 0 L 137 0 L 137 10 C 137 10, 117 10, 117 10 Z M 78 10 L 78 0 L 98 0 L 98 10 C 98 10, 78 10, 78 10 Z M 39 10 L 39 0 L 59 0 L 59 10 C 59 10, 39 10, 39 10 Z M 0 10 L 0 0 L 20 0 L 20 10 C 20 10, 0 10, 0 10 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 545,
    "y": 246,
    "width": 188,
    "height": 52,
    "fillColor": "#ffffff",
    "pathD": "M 188 52 L 0 52 L 0 0 L 188 0 C 188 0, 188 52, 188 52 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 545,
    "y": 268,
    "width": 176,
    "height": 10,
    "fillColor": "#ffffff",
    "pathD": "M 0 10 L 0 0 L 20 0 L 20 10 C 20 10, 0 10, 0 10 Z M 39 10 L 39 0 L 59 0 L 59 10 C 59 10, 39 10, 39 10 Z M 78 10 L 78 0 L 98 0 L 98 10 C 98 10, 78 10, 78 10 Z M 117 10 L 117 0 L 137 0 L 137 10 C 137 10, 117 10, 117 10 Z M 156 10 L 156 0 L 176 0 L 176 10 C 176 10, 156 10, 156 10 Z"
  },
  {
    "id": "sp-8",
    "x": 545,
    "y": 455,
    "width": 234,
    "height": 52,
    "fillColor": "#ffffff",
    "pathD": "M 0 52 L 234 52 L 234 0 L 0 0 L 0 52 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 545,
    "y": 478,
    "width": 294,
    "height": 10,
    "fillColor": "#ffffff",
    "pathD": "M 274 10 L 274 0 L 294 0 L 294 10 C 294 10, 274 10, 274 10 Z M 235 10 L 235 0 L 255 0 L 255 10 C 255 10, 235 10, 235 10 Z M 196 10 L 196 0 L 216 0 L 216 10 C 216 10, 196 10, 196 10 Z M 157 10 L 157 0 L 176 0 L 176 10 C 176 10, 157 10, 157 10 Z M 118 10 L 118 0 L 137 0 L 137 10 C 137 10, 118 10, 118 10 Z M 78 10 L 78 0 L 98 0 L 98 10 C 98 10, 78 10, 78 10 Z M 39 10 L 39 0 L 59 0 L 59 10 C 59 10, 39 10, 39 10 Z M 0 10 L 0 0 L 20 0 L 20 10 C 20 10, 0 10, 0 10 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 424,
    "y": 142,
    "width": 122,
    "height": 157,
    "fillColor": "#ffffff",
    "pathD": "M 122 79 C 122 35, 87 0, 44 0 L 0 0 L 0 52 L 44 52 C 58 52, 70 64, 70 79 C 70 93, 58 105, 44 105 L 0 105 L 0 157 L 44 157 C 87 157, 122 122, 122 79 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 445,
    "y": 163,
    "width": 81,
    "height": 116,
    "fillColor": "#ffffff",
    "pathD": "M 0 10 L 0 0 L 20 0 L 20 10 C 20 10, 0 10, 0 10 Z M 53 20 C 48 16, 43 13, 37 12 L 40 2 C 47 4, 53 7, 59 12 C 59 12, 53 20, 53 20 Z M 71 49 C 70 43, 68 38, 65 33 L 73 28 C 77 34, 80 40, 81 47 C 81 47, 71 49, 71 49 Z M 73 89 L 65 83 C 68 78, 70 73, 71 67 L 81 69 C 80 76, 77 82, 73 89 Z M 40 114 L 37 104 C 43 103, 48 100, 53 96 L 59 104 C 53 109, 47 112, 40 114 Z M 0 116 L 0 106 L 19 106 L 19 116 C 19 116, 0 116, 0 116 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 545,
    "y": 141,
    "width": 307,
    "height": 52,
    "fillColor": "#ffffff",
    "pathD": "M 0 52 L 307 52 L 307 0 L 0 0 L 0 52 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 545,
    "y": 164,
    "width": 294,
    "height": 10,
    "fillColor": "#ffffff",
    "pathD": "M 274 10 L 274 0 L 294 0 L 294 10 C 294 10, 274 10, 274 10 Z M 235 10 L 235 0 L 255 0 L 255 10 C 255 10, 235 10, 235 10 Z M 196 10 L 196 0 L 216 0 L 216 10 C 216 10, 196 10, 196 10 Z M 157 10 L 157 0 L 176 0 L 176 10 C 176 10, 157 10, 157 10 Z M 118 10 L 118 0 L 137 0 L 137 10 C 137 10, 118 10, 118 10 Z M 78 10 L 78 0 L 98 0 L 98 10 C 98 10, 78 10, 78 10 Z M 39 10 L 39 0 L 59 0 L 59 10 C 59 10, 39 10, 39 10 Z M 0 10 L 0 0 L 20 0 L 20 10 C 20 10, 0 10, 0 10 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 732,
    "y": 455,
    "width": 122,
    "height": 157,
    "fillColor": "#ffffff",
    "pathD": "M 0 79 C 0 35, 35 0, 78 0 L 122 0 L 122 52 L 78 52 C 64 52, 52 64, 52 79 C 52 93, 64 105, 78 105 L 122 105 L 122 157 L 78 157 C 35 157, 0 122, 0 79 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 743,
    "y": 476,
    "width": 88,
    "height": 116,
    "fillColor": "#ffffff",
    "pathD": "M 67 10 L 67 0 L 88 0 L 88 10 C 88 10, 67 10, 67 10 Z M 24 12 C 30 7, 37 4, 44 2 L 47 12 C 41 13, 35 16, 30 20 C 30 20, 24 12, 24 12 Z M 0 47 C 1 40, 4 34, 8 28 L 17 33 C 14 38, 12 43, 10 49 C 10 49, 0 47, 0 47 Z M 0 69 L 10 67 C 12 73, 14 78, 17 83 L 8 89 C 4 82, 1 76, 0 69 Z M 24 104 L 30 96 C 35 100, 41 103, 47 104 L 44 114 C 37 112, 30 109, 24 104 Z M 67 116 L 67 106 L 88 106 L 88 116 C 88 116, 67 116, 67 116 Z"
  },
  {
    "id": "sp-16",
    "x": 0,
    "y": 559,
    "width": 736,
    "height": 52,
    "fillColor": "#ffffff",
    "pathD": "M 736 0 L 0 0 L 0 52 L 736 52 L 736 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 434,
    "y": 581,
    "width": 294,
    "height": 10,
    "fillColor": "#ffffff",
    "pathD": "M 274 10 L 274 0 L 294 0 L 294 10 C 294 10, 274 10, 274 10 Z M 235 10 L 235 0 L 255 0 L 255 10 C 255 10, 235 10, 235 10 Z M 196 10 L 196 0 L 216 0 L 216 10 C 216 10, 196 10, 196 10 Z M 157 10 L 157 0 L 176 0 L 176 10 C 176 10, 157 10, 157 10 Z M 118 10 L 118 0 L 137 0 L 137 10 C 137 10, 118 10, 118 10 Z M 78 10 L 78 0 L 98 0 L 98 10 C 98 10, 78 10, 78 10 Z M 39 10 L 39 0 L 59 0 L 59 10 C 59 10, 39 10, 39 10 Z M 0 10 L 0 0 L 20 0 L 20 10 C 20 10, 0 10, 0 10 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 125,
    "y": 581,
    "width": 294,
    "height": 10,
    "fillColor": "#ffffff",
    "pathD": "M 274 10 L 274 0 L 294 0 L 294 10 C 294 10, 274 10, 274 10 Z M 235 10 L 235 0 L 255 0 L 255 10 C 255 10, 235 10, 235 10 Z M 196 10 L 196 0 L 216 0 L 216 10 C 216 10, 196 10, 196 10 Z M 157 10 L 157 0 L 176 0 L 176 10 C 176 10, 157 10, 157 10 Z M 118 10 L 118 0 L 137 0 L 137 10 C 137 10, 118 10, 118 10 Z M 78 10 L 78 0 L 98 0 L 98 10 C 98 10, 78 10, 78 10 Z M 39 10 L 39 0 L 59 0 L 59 10 C 59 10, 39 10, 39 10 Z M 0 10 L 0 0 L 20 0 L 20 10 C 20 10, 0 10, 0 10 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 805,
    "y": 487,
    "width": 94,
    "height": 94,
    "fillColor": "#ffb900",
    "pathD": "M 46 0 L 48 0 C 74 0, 94 20, 94 46 L 94 48 C 94 74, 74 94, 48 94 L 46 94 C 20 94, 0 74, 0 48 L 0 46 C 0 20, 20 0, 46 0 C 46 0, 46 0, 46 0 Z"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 378,
    "y": 382,
    "width": 94,
    "height": 94,
    "fillColor": "#52c49c",
    "pathD": "M 46 0 L 48 0 C 74 0, 94 20, 94 46 L 94 48 C 94 74, 74 94, 48 94 L 46 94 C 20 94, 0 74, 0 48 L 0 46 C 0 20, 20 0, 46 0 C 46 0, 46 0, 46 0 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 805,
    "y": 278,
    "width": 94,
    "height": 94,
    "fillColor": "#ff4d38",
    "pathD": "M 46 0 L 48 0 C 74 0, 94 20, 94 46 L 94 48 C 94 74, 74 94, 48 94 L 46 94 C 20 94, 0 74, 0 48 L 0 46 C 0 20, 20 0, 46 0 C 46 0, 46 0, 46 0 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 378,
    "y": 173,
    "width": 94,
    "height": 94,
    "fillColor": "#3365cc",
    "pathD": "M 46 0 L 48 0 C 74 0, 94 20, 94 46 L 94 48 C 94 74, 74 94, 48 94 L 46 94 C 20 94, 0 74, 0 48 L 0 46 C 0 20, 20 0, 46 0 C 46 0, 46 0, 46 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 852,
    "y": 141,
    "width": 307,
    "height": 52,
    "fillColor": "#ffffff",
    "pathD": "M 0 52 L 307 52 L 307 0 L 0 0 L 0 52 Z"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 853,
    "y": 164,
    "width": 294,
    "height": 10,
    "fillColor": "#ffffff",
    "pathD": "M 274 10 L 274 0 L 294 0 L 294 10 C 294 10, 274 10, 274 10 Z M 235 10 L 235 0 L 255 0 L 255 10 C 255 10, 235 10, 235 10 Z M 196 10 L 196 0 L 216 0 L 216 10 C 216 10, 196 10, 196 10 Z M 157 10 L 157 0 L 176 0 L 176 10 C 176 10, 157 10, 157 10 Z M 118 10 L 118 0 L 137 0 L 137 10 C 137 10, 118 10, 118 10 Z M 78 10 L 78 0 L 98 0 L 98 10 C 98 10, 78 10, 78 10 Z M 39 10 L 39 0 L 59 0 L 59 10 C 59 10, 39 10, 39 10 Z M 0 10 L 0 0 L 20 0 L 20 10 C 20 10, 0 10, 0 10 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 402,
    "y": 407,
    "width": 44,
    "height": 44,
    "fillColor": "#ffffff",
    "pathD": "M 43 26 C 41 26, 40 28, 39 29 L 43 29 C 43 29, 43 29, 43 29 L 43 26 Z M 10 26 L 10 29 C 10 29, 10 29, 10 29 L 13 29 C 13 28, 12 26, 10 26 Z M 10 22 L 10 25 C 12 25, 14 27, 15 29 L 18 29 C 18 28, 18 26, 18 25 L 10 22 Z M 36 19 C 35 19, 35 20, 35 21 C 35 22, 35 22, 36 22 C 37 22, 37 22, 37 21 C 37 20, 37 19, 36 19 Z M 36 18 C 37 18, 39 19, 39 21 C 39 22, 37 23, 36 23 C 34 23, 33 22, 33 21 C 33 19, 34 18, 36 18 Z M 5 14 L 13 17 C 14 17, 14 17, 14 18 C 14 18, 13 18, 13 18 C 13 18, 13 18, 13 18 L 5 16 C 4 16, 4 15, 4 15 C 4 15, 5 14, 5 14 Z M 39 13 C 40 14, 41 16, 43 16 L 43 13 C 43 13, 43 13, 43 13 L 39 13 Z M 33 13 L 32 16 L 31 17 L 29 25 C 29 26, 28 27, 26 27 C 26 27, 26 27, 26 27 L 25 27 C 25 28, 25 29, 25 29 L 38 29 C 38 27, 40 25, 43 25 L 43 17 C 40 17, 38 15, 38 13 L 33 13 Z M 3 10 L 1 17 C 1 17, 1 18, 1 18 C 2 18, 2 19, 2 19 L 17 23 C 17 23, 17 23, 17 23 C 17 22, 18 21, 18 20 C 19 19, 20 19, 21 19 C 22 19, 23 19, 24 20 C 25 21, 25 22, 25 23 C 25 24, 25 24, 25 25 L 26 26 C 27 26, 28 25, 28 25 L 30 18 L 3 10 Z M 5 5 L 4 7 L 4 9 L 30 16 L 31 13 L 5 5 Z M 7 1 C 6 1, 6 2, 6 2 L 5 4 L 32 11 L 32 10 C 32 10, 32 9, 32 9 C 32 9, 31 8, 31 8 L 7 1 C 7 1, 7 1, 7 1 Z M 8 0 L 31 7 C 32 7, 33 8, 33 8 C 33 9, 33 10, 33 10 L 33 11 L 39 11 L 43 11 C 43 11, 44 12, 44 13 L 44 17 L 44 25 L 44 29 C 44 30, 43 31, 43 31 L 39 31 L 35 31 C 35 34, 34 39, 31 44 C 31 44, 30 44, 30 44 C 30 44, 30 44, 30 44 C 30 44, 29 43, 30 43 C 32 39, 34 35, 34 31 L 25 31 C 26 34, 27 35, 27 35 C 27 35, 27 36, 27 36 C 27 36, 27 37, 26 36 C 26 36, 23 34, 23 23 C 24 22, 23 21, 23 21 C 22 21, 22 20, 21 20 C 20 20, 20 20, 19 21 C 19 21, 19 22, 19 23 C 19 23, 19 24, 19 24 C 19 27, 20 32, 17 35 C 14 38, 16 43, 16 43 C 16 43, 16 44, 15 44 C 15 44, 15 44, 15 44 C 15 44, 15 44, 14 44 C 14 43, 13 38, 16 34 C 17 33, 17 32, 18 31 L 10 31 C 9 31, 9 30, 9 29 L 9 25 L 9 22 L 2 20 C 1 20, 1 19, 0 19 C 0 18, 0 17, 0 17 L 2 9 L 3 8 L 4 2 C 5 1, 6 0, 8 0 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 402,
    "y": 198,
    "width": 45,
    "height": 44,
    "fillColor": "#ffffff",
    "pathD": "M 37 30 L 39 30 C 40 30, 40 30, 40 31 C 40 31, 40 32, 39 32 L 37 32 C 37 32, 36 31, 36 31 C 36 30, 37 30, 37 30 Z M 21 27 L 25 38 L 27 33 C 27 33, 27 33, 27 33 L 32 31 L 21 27 Z M 31 25 L 39 25 C 40 25, 40 26, 40 26 C 40 26, 40 27, 39 27 L 31 27 C 31 27, 31 26, 31 26 C 31 26, 31 25, 31 25 Z M 31 21 L 39 21 C 40 21, 40 21, 40 21 C 40 22, 40 22, 39 22 L 31 22 C 31 22, 31 22, 31 21 C 31 21, 31 21, 31 21 Z M 11 19 L 11 27 L 16 23 L 11 19 Z M 12 18 L 17 22 L 21 18 L 12 18 Z M 12 16 L 21 16 C 22 16, 23 17, 23 19 L 23 24 C 23 25, 23 25, 23 25 C 22 25, 22 25, 22 24 L 22 19 L 18 23 L 18 24 C 19 24, 19 24, 18 25 C 18 25, 18 25, 18 25 C 18 25, 18 25, 17 25 L 17 24 L 12 28 L 18 28 C 18 28, 19 29, 19 29 C 19 29, 18 30, 18 30 L 12 30 C 11 30, 10 29, 10 28 L 10 19 C 10 17, 11 16, 12 16 Z M 37 16 L 39 16 C 40 16, 40 16, 40 17 C 40 17, 40 17, 39 17 L 37 17 C 37 17, 36 17, 36 17 C 36 16, 37 16, 37 16 Z M 31 16 L 34 16 C 34 16, 34 16, 34 17 C 34 17, 34 17, 34 17 L 31 17 C 30 17, 30 17, 30 17 C 30 16, 30 16, 31 16 Z M 17 13 C 11 13, 6 17, 6 23 C 6 29, 11 33, 17 33 C 18 33, 20 33, 21 32 L 19 26 C 19 26, 19 26, 19 26 C 20 26, 20 25, 20 26 L 26 28 C 27 26, 27 25, 27 23 C 27 17, 23 13, 17 13 Z M 34 11 L 39 11 C 40 11, 40 12, 40 12 C 40 12, 40 13, 39 13 L 34 13 C 34 13, 34 12, 34 12 C 34 12, 34 11, 34 11 Z M 27 11 L 31 11 C 31 11, 32 12, 32 12 C 32 12, 31 13, 31 13 L 27 13 C 27 13, 27 12, 27 12 C 27 12, 27 11, 27 11 Z M 17 11 C 23 11, 29 17, 29 23 C 29 25, 28 26, 27 28 L 34 30 C 34 30, 34 30, 34 31 C 34 31, 34 31, 34 31 L 28 34 L 25 40 C 25 40, 25 40, 25 40 C 24 40, 24 40, 24 40 L 22 34 C 20 34, 19 35, 17 35 C 10 35, 5 30, 5 23 C 5 17, 10 11, 17 11 Z M 1 8 L 1 43 L 44 43 L 44 8 L 1 8 Z M 40 4 C 40 3, 41 3, 41 4 C 41 4, 41 4, 41 4 C 41 4, 41 4, 41 5 C 41 5, 41 5, 41 5 C 41 5, 40 5, 40 5 C 40 4, 40 4, 40 4 C 40 4, 40 4, 40 4 Z M 33 4 C 33 3, 33 3, 34 4 C 34 4, 34 4, 34 4 C 34 4, 34 4, 34 5 C 33 5, 33 5, 33 5 C 33 5, 33 5, 33 5 C 32 4, 32 4, 32 4 C 32 4, 32 4, 33 4 Z M 37 3 C 37 3, 38 4, 38 4 C 38 4, 37 5, 37 5 C 37 5, 36 4, 36 4 C 36 4, 37 3, 37 3 Z M 1 1 L 1 7 L 44 7 L 44 1 L 1 1 Z M 1 0 L 44 0 C 45 0, 45 0, 45 1 L 45 7 L 45 43 C 45 44, 45 44, 44 44 L 1 44 C 0 44, 0 44, 0 43 L 0 7 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-27",
    "x": 829,
    "y": 515,
    "width": 45,
    "height": 37,
    "fillColor": "#ffffff",
    "pathD": "M 20 33 C 20 33, 19 34, 19 34 L 19 34 C 19 35, 20 36, 20 36 L 25 36 C 25 36, 26 35, 26 34 L 26 34 C 26 34, 25 33, 25 33 L 20 33 Z M 18 13 C 18 13, 19 13, 19 13 L 23 17 L 26 13 C 27 13, 27 13, 27 13 C 28 14, 28 14, 27 14 L 24 18 L 27 21 C 28 22, 28 22, 27 22 C 27 22, 27 23, 27 23 C 27 23, 26 22, 26 22 L 23 19 L 19 22 C 19 22, 19 23, 19 23 C 18 23, 18 22, 18 22 C 18 22, 18 22, 18 21 L 22 18 L 18 14 C 18 14, 18 14, 18 13 Z M 40 13 C 40 15, 40 16, 40 18 C 40 19, 40 21, 40 22 C 42 22, 44 20, 44 18 L 44 18 C 44 15, 42 13, 40 13 Z M 37 13 C 37 13, 37 13, 36 14 C 36 14, 36 14, 36 15 C 36 16, 36 17, 36 18 C 36 19, 36 20, 36 21 C 36 21, 36 22, 36 22 C 36 22, 37 23, 37 23 L 38 23 C 39 21, 39 19, 39 18 C 39 16, 39 14, 38 13 L 37 13 Z M 7 13 C 6 14, 6 16, 6 18 C 6 19, 6 21, 7 23 L 8 23 C 8 23, 9 22, 9 22 C 9 22, 9 21, 9 21 C 9 20, 9 19, 9 18 C 9 17, 9 16, 9 15 C 9 14, 9 14, 9 14 C 9 13, 8 13, 8 13 L 7 13 Z M 5 13 C 3 13, 1 15, 1 17 L 1 18 C 1 20, 3 22, 6 22 C 5 21, 5 19, 5 18 C 5 16, 5 15, 5 13 Z M 16 11 L 29 11 C 29 11, 30 11, 30 12 L 30 24 C 30 25, 29 25, 29 25 L 27 25 L 23 29 C 23 29, 23 29, 22 29 C 22 29, 22 29, 22 29 L 20 27 C 20 27, 20 27, 20 26 C 21 26, 21 26, 21 26 L 22 28 L 26 24 C 26 24, 26 24, 27 24 C 27 24, 27 24, 27 24 L 28 24 L 28 12 L 17 12 L 17 24 L 23 24 C 24 24, 24 24, 24 24 C 24 25, 24 25, 23 25 L 16 25 C 16 25, 15 25, 15 24 L 15 12 C 15 11, 16 11, 16 11 Z M 23 0 C 30 0, 37 5, 39 12 C 42 12, 45 14, 45 17 L 45 18 C 45 21, 42 24, 39 24 C 37 29, 33 33, 27 34 L 27 34 C 27 36, 26 37, 25 37 L 20 37 C 19 37, 18 36, 18 34 L 18 34 C 18 33, 19 32, 20 32 L 25 32 C 26 32, 27 32, 27 33 C 32 32, 36 28, 38 24 L 37 24 C 36 24, 36 23, 35 23 C 34 22, 34 21, 34 21 C 35 20, 35 19, 35 18 C 35 17, 35 16, 35 15 C 34 14, 35 13, 35 13 C 36 12, 36 12, 37 12 L 38 12 C 35 6, 29 1, 23 1 C 16 1, 10 6, 7 12 L 8 12 C 9 12, 9 12, 10 13 C 10 13, 11 14, 10 15 C 10 16, 10 17, 10 18 C 10 19, 10 20, 11 21 C 11 21, 11 22, 10 23 C 9 23, 9 24, 8 24 L 6 24 C 3 24, 0 21, 0 18 L 0 18 C 0 14, 3 12, 6 12 C 8 5, 15 0, 23 0 Z"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 833,
    "y": 303,
    "width": 38,
    "height": 45,
    "fillColor": "#ffffff",
    "pathD": "M 19 32 C 18 32, 17 33, 17 33 C 17 34, 18 34, 18 35 C 18 35, 18 35, 18 35 L 18 40 L 21 40 L 20 35 C 20 35, 20 35, 20 35 C 21 34, 21 34, 21 33 C 21 33, 20 32, 19 32 Z M 19 30 C 21 30, 22 32, 22 33 C 22 34, 22 35, 21 36 L 22 40 C 22 41, 22 41, 22 41 C 22 41, 22 41, 22 41 L 17 41 C 17 41, 16 41, 16 41 C 16 41, 16 41, 16 40 L 17 36 C 16 35, 16 34, 16 33 C 16 32, 17 30, 19 30 Z M 11 28 C 10 28, 9 29, 9 30 L 9 42 C 9 43, 10 44, 11 44 L 27 44 C 28 44, 29 43, 29 42 L 29 30 C 29 29, 28 28, 27 28 L 25 28 L 13 28 L 11 28 Z M 14 24 L 14 27 L 24 27 L 24 24 L 14 24 Z M 5 18 L 9 18 C 9 18, 10 19, 10 19 C 10 19, 9 20, 9 20 L 5 20 C 5 20, 5 19, 5 19 C 5 19, 5 18, 5 18 Z M 5 14 L 11 14 C 11 14, 12 14, 12 15 C 12 15, 11 16, 11 16 L 5 16 C 5 16, 5 15, 5 15 C 5 14, 5 14, 5 14 Z M 1 11 L 1 20 C 1 21, 2 22, 3 22 L 12 22 L 12 21 C 12 17, 15 14, 19 14 C 19 14, 20 15, 20 15 C 20 15, 19 16, 19 16 C 16 16, 14 18, 14 21 L 14 22 L 35 22 C 36 22, 37 21, 37 20 L 37 11 L 1 11 Z M 1 6 L 1 10 L 37 10 L 37 6 L 1 6 Z M 3 1 C 2 1, 1 2, 1 3 L 1 5 L 37 5 L 37 3 C 37 2, 36 1, 35 1 L 3 1 Z M 3 0 L 35 0 C 36 0, 38 2, 38 3 L 38 5 L 38 11 L 38 20 C 38 22, 36 24, 35 24 L 26 24 L 26 27 L 27 27 C 29 27, 30 28, 30 30 L 30 42 C 30 44, 29 45, 27 45 L 11 45 C 9 45, 8 44, 8 42 L 8 30 C 8 28, 9 27, 11 27 L 12 27 L 12 24 L 3 24 C 2 24, 0 22, 0 20 L 0 11 L 0 5 L 0 3 C 0 2, 2 0, 3 0 Z"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 1,
    "x": 916,
    "y": 308,
    "width": 96,
    "height": 36,
    "text": "Step 02",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 3,
    "x": 916,
    "y": 516,
    "width": 96,
    "height": 36,
    "text": "Step 04",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 0,
    "x": 269,
    "y": 202,
    "width": 96,
    "height": 36,
    "text": "Step 01",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 2,
    "x": 269,
    "y": 411,
    "width": 96,
    "height": 36,
    "text": "Step 03",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 3,
    "x": 1027,
    "y": 499,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 1,
    "x": 1027,
    "y": 290,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 2,
    "x": 55,
    "y": 394,
    "width": 198,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 0,
    "x": 55,
    "y": 185,
    "width": 198,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-37",
    "x": 1159,
    "y": 141,
    "width": 120,
    "height": 52,
    "fillColor": "#ffffff",
    "pathD": "M 0 52 L 120 52 L 120 0 L 0 0 L 0 52 Z"
  },
  {
    "id": "sp-38",
    "x": 1160,
    "y": 164,
    "width": 10,
    "height": 10,
    "fillColor": "#ffffff",
    "pathD": "M 1 10 L 1 0 L 1 0 L 1 10 C 1 10, 1 10, 1 10 Z M 1 10 L 1 0 L 1 0 L 1 10 C 1 10, 1 10, 1 10 Z M 1 10 L 1 0 L 1 0 L 1 10 C 1 10, 1 10, 1 10 Z M 1 10 L 1 0 L 1 0 L 1 10 C 1 10, 1 10, 1 10 Z M 0 10 L 0 0 L 0 0 L 0 10 C 0 10, 0 10, 0 10 Z M 0 10 L 0 0 L 0 0 L 0 10 C 0 10, 0 10, 0 10 Z M 0 10 L 0 0 L 0 0 L 0 10 C 0 10, 0 10, 0 10 Z M 0 10 L 0 0 L 0 0 L 0 10 C 0 10, 0 10, 0 10 Z"
  },
  {
    "id": "sp-39",
    "x": 9,
    "y": 581,
    "width": 98,
    "height": 10,
    "fillColor": "#ffffff",
    "pathD": "M 20 0 L 0 0 L 0 10 C 0 10, 20 10, 20 10 Z M 59 0 L 39 0 L 39 10 C 39 10, 59 10, 59 10 Z M 98 0 L 78 0 L 78 10 C 78 10, 98 10, 98 10 Z"
  },
  {
    "id": "sp-40",
    "x": 1159,
    "y": 164,
    "width": 120,
    "height": 10,
    "fillColor": "#ffffff",
    "pathD": "M 3 0 L 0 0 L 0 10 L 3 10 Z M 42 0 L 22 0 L 22 10 C 22 10, 42 10, 42 10 Z M 81 0 L 61 0 L 61 10 C 61 10, 81 10, 81 10 Z M 120 0 L 100 0 L 100 10 C 100 10, 120 10, 120 10 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates147Template({ data }: { data: BrainData }): ReactElement {
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
