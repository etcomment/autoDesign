import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 440,
    "y": 117,
    "width": 280,
    "height": 216,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 194 0 L 280 107 L 194 214 L 194 185 L 191 185 C 168 187, 148 198, 134 215 L 133 216 L 96 122 L 0 137 L 0 136 C 41 75, 110 34, 187 31 L 194 30 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 657,
    "y": 149,
    "width": 212,
    "height": 222,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 2 0 L 10 1 C 82 9, 144 48, 182 105 L 185 110 L 212 94 L 162 222 L 27 201 L 52 187 L 50 184 C 38 169, 21 159, 2 155 L 0 154 L 63 76 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 694,
    "y": 280,
    "width": 187,
    "height": 251,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 161 0 L 165 6 C 179 37, 187 72, 187 108 C 187 144, 179 179, 165 209 L 161 216 L 186 230 L 50 251 L 0 123 L 27 139 L 29 134 C 32 125, 33 117, 33 108 C 33 99, 32 90, 29 82 L 27 76 L 126 91 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 400,
    "y": 239,
    "width": 187,
    "height": 256,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 137 0 L 187 128 L 162 114 L 161 115 C 157 126, 154 137, 154 149 C 154 158, 155 166, 158 175 L 160 179 L 61 164 L 25 256 L 22 251 C 8 220, 0 185, 0 149 C 0 113, 8 78, 22 47 L 28 37 L 1 21 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 411,
    "y": 403,
    "width": 212,
    "height": 224,
    "text": "",
    "pathD": "M 50 0 L 185 21 L 159 36 L 162 40 C 174 55, 191 65, 210 69 L 212 70 L 148 149 L 209 224 L 202 223 C 130 215, 68 176, 30 119 L 26 113 L 0 128 Z"
  },
  {
    "id": "sp-5",
    "x": 560,
    "y": 441,
    "width": 284,
    "height": 218,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 149 0 L 184 90 L 284 75 L 280 81 C 239 142, 171 183, 93 187 L 86 187 L 86 218 L 0 111 L 86 4 L 86 33 L 89 33 C 112 31, 132 20, 146 3 Z"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 1,
    "x": 628,
    "y": 195,
    "width": 64,
    "height": 58,
    "text": "3"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 7,
    "x": 458,
    "y": 424,
    "width": 64,
    "height": 58,
    "text": "1"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 3,
    "x": 479,
    "y": 251,
    "width": 64,
    "height": 58,
    "text": "2"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 5,
    "x": 763,
    "y": 298,
    "width": 64,
    "height": 58,
    "text": "4"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 8,
    "x": 733,
    "y": 455,
    "width": 64,
    "height": 58,
    "text": "5"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 9,
    "x": 583,
    "y": 521,
    "width": 64,
    "height": 58,
    "text": "6"
  },
  {
    "id": "sp-12",
    "x": 508,
    "y": 485,
    "width": 51,
    "height": 55,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 23 20 C 21 20, 20 21, 20 22 C 20 24, 21 25, 23 25 C 24 25, 25 24, 25 22 C 25 21, 24 20, 23 20 Z M 23 18 C 25 18, 27 20, 27 22 C 27 25, 25 27, 23 27 C 20 27, 18 25, 18 22 C 18 20, 20 18, 23 18 Z M 23 15 C 19 15, 15 18, 15 22 C 15 25, 17 28, 19 29 C 20 29, 20 30, 20 30 L 20 50 L 23 53 L 25 51 L 24 50 C 23 49, 23 48, 24 47 L 25 46 L 24 45 C 23 44, 23 43, 24 43 L 25 42 L 24 40 C 24 40, 23 40, 23 39 C 23 39, 24 38, 24 38 L 26 36 L 26 30 C 26 30, 26 29, 26 29 C 29 28, 30 25, 30 22 C 30 18, 27 15, 23 15 Z M 23 13 C 28 13, 32 17, 32 22 C 32 26, 30 29, 27 30 L 27 37 C 27 37, 27 37, 27 37 L 25 39 L 26 40 L 27 41 C 27 41, 27 42, 27 42 L 25 44 L 26 44 L 27 45 C 27 46, 27 46, 27 46 C 27 46, 27 46, 27 47 L 25 48 L 27 50 C 27 50, 27 50, 27 51 C 27 51, 27 51, 27 51 L 23 55 C 23 55, 23 55, 23 55 C 22 55, 22 55, 22 55 L 18 51 C 18 51, 18 51, 18 50 L 18 30 C 15 29, 14 26, 14 22 C 14 17, 18 13, 23 13 Z M 23 8 C 27 8, 30 9, 33 12 C 36 15, 38 18, 38 22 C 38 26, 36 30, 33 33 C 33 33, 33 33, 33 33 C 32 33, 32 33, 32 33 C 32 32, 32 32, 32 32 C 35 29, 36 26, 36 22 C 36 19, 35 16, 32 13 C 30 11, 26 9, 23 9 C 19 9, 16 11, 13 13 C 11 16, 10 19, 10 22 C 10 26, 11 29, 13 32 C 14 32, 14 32, 13 33 C 13 33, 13 33, 12 33 C 10 30, 8 26, 8 22 C 8 18, 10 15, 12 12 C 15 9, 19 8, 23 8 Z M 23 0 C 35 0, 45 10, 45 22 C 45 23, 46 26, 50 30 C 50 31, 51 32, 51 33 C 51 34, 51 34, 49 35 C 48 36, 46 37, 45 37 C 45 38, 46 42, 45 45 C 45 48, 40 48, 37 48 C 36 48, 35 48, 35 50 L 35 54 C 35 55, 34 55, 34 55 C 33 55, 33 55, 33 54 L 33 50 C 33 48, 34 47, 37 47 C 41 47, 43 46, 44 44 C 44 41, 44 37, 44 37 C 43 36, 44 36, 44 36 C 44 36, 47 35, 49 33 C 49 33, 49 33, 49 33 C 49 32, 49 31, 49 31 C 44 26, 44 23, 44 23 L 44 23 C 44 11, 34 2, 23 2 C 11 2, 2 11, 2 23 C 2 26, 3 30, 4 33 C 4 33, 4 33, 4 33 C 5 34, 6 35, 7 36 C 8 39, 9 41, 10 42 C 12 46, 12 54, 12 54 C 12 55, 11 55, 11 55 C 10 55, 10 55, 10 54 C 10 54, 10 46, 8 43 C 8 41, 7 39, 5 37 C 4 36, 4 35, 3 34 C 3 34, 3 34, 3 34 C 1 30, 0 27, 0 23 C 0 10, 10 0, 23 0 Z"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 2,
    "x": 730,
    "y": 219,
    "width": 55,
    "height": 55,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 7 48 L 17 48 C 17 48, 17 48, 17 49 C 17 49, 17 49, 17 49 L 7 49 C 6 49, 6 49, 6 49 C 6 48, 6 48, 7 48 Z M 16 42 L 22 42 C 23 42, 23 43, 23 43 C 23 43, 23 44, 22 44 L 16 44 C 15 44, 15 43, 15 43 C 15 43, 15 42, 16 42 Z M 7 42 L 12 42 C 12 42, 13 43, 13 43 C 13 43, 12 44, 12 44 L 7 44 C 6 44, 6 43, 6 43 C 6 43, 6 42, 7 42 Z M 46 38 C 45 38, 44 39, 44 40 L 44 42 C 44 42, 45 43, 46 43 L 47 43 C 48 43, 49 42, 49 42 L 49 40 C 49 39, 48 38, 47 38 L 46 38 Z M 35 38 C 34 38, 33 39, 33 40 L 33 42 C 33 42, 34 43, 35 43 L 37 43 C 37 43, 38 42, 38 42 L 38 40 C 38 39, 37 38, 37 38 L 35 38 Z M 46 37 L 47 37 C 49 37, 50 38, 50 40 L 50 42 C 50 43, 49 45, 47 45 L 46 45 C 44 45, 42 43, 42 42 L 42 40 C 42 38, 44 37, 46 37 Z M 35 37 L 37 37 C 38 37, 40 38, 40 40 L 40 42 C 40 43, 38 45, 37 45 L 35 45 C 33 45, 32 43, 32 42 L 32 40 C 32 38, 33 37, 35 37 Z M 12 34 C 12 34, 13 34, 13 34 L 13 38 C 13 39, 12 39, 12 39 C 11 39, 11 39, 11 38 L 11 34 C 11 34, 11 34, 12 34 Z M 7 31 C 7 31, 8 32, 8 32 L 8 38 C 8 38, 7 39, 7 39 C 6 39, 6 38, 6 38 L 6 32 C 6 32, 6 31, 7 31 Z M 17 30 C 17 30, 18 31, 18 31 L 18 38 C 18 39, 17 39, 17 39 C 16 39, 16 39, 16 38 L 16 31 C 16 31, 16 30, 17 30 Z M 22 28 C 23 28, 23 29, 23 29 L 23 38 C 23 39, 23 39, 22 39 C 22 39, 21 39, 21 38 L 21 29 C 21 29, 22 28, 22 28 Z M 46 28 C 45 28, 44 28, 44 29 L 44 31 C 44 31, 45 32, 46 32 L 47 32 C 48 32, 49 31, 49 31 L 49 29 C 49 28, 48 28, 47 28 L 46 28 Z M 35 28 C 34 28, 33 28, 33 29 L 33 31 C 33 31, 34 32, 35 32 L 37 32 C 37 32, 38 31, 38 31 L 38 29 C 38 28, 37 28, 37 28 L 35 28 Z M 46 26 L 47 26 C 49 26, 50 27, 50 29 L 50 31 C 50 32, 49 34, 47 34 L 46 34 C 44 34, 42 32, 42 31 L 42 29 C 42 27, 44 26, 46 26 Z M 35 26 L 37 26 C 38 26, 40 27, 40 29 L 40 31 C 40 32, 38 34, 37 34 L 35 34 C 33 34, 32 32, 32 31 L 32 29 C 32 27, 33 26, 35 26 Z M 7 23 L 17 23 C 17 23, 17 24, 17 24 C 17 25, 17 25, 17 25 L 7 25 C 6 25, 6 25, 6 24 C 6 24, 6 23, 7 23 Z M 28 23 L 28 46 C 28 47, 29 48, 30 48 L 52 48 C 53 48, 53 47, 53 46 L 53 23 L 28 23 Z M 7 18 L 22 18 C 23 18, 23 18, 23 19 C 23 19, 23 20, 22 20 L 7 20 C 6 20, 6 19, 6 19 C 6 18, 6 18, 7 18 Z M 49 17 C 50 17, 50 17, 51 17 C 51 17, 51 17, 51 18 C 51 18, 51 18, 51 18 C 51 18, 50 18, 50 18 C 50 18, 50 18, 49 18 C 49 18, 49 18, 49 18 C 49 17, 49 17, 49 17 Z M 41 17 C 41 17, 41 17, 42 17 C 42 17, 42 17, 42 18 C 42 18, 42 18, 42 18 C 42 18, 41 18, 41 18 C 41 18, 41 18, 41 18 C 40 18, 40 18, 40 18 C 40 17, 40 17, 41 17 Z M 45 17 C 46 17, 46 17, 46 17 C 46 18, 46 18, 45 18 C 45 18, 45 18, 45 17 C 45 17, 45 17, 45 17 Z M 30 14 C 29 14, 28 14, 28 15 L 28 21 L 53 21 L 53 15 C 53 14, 53 14, 52 14 L 30 14 Z M 17 12 L 22 12 C 23 12, 23 12, 23 13 C 23 13, 23 14, 22 14 L 17 14 C 16 14, 16 13, 16 13 C 16 12, 16 12, 17 12 Z M 7 12 L 12 12 C 13 12, 13 12, 13 13 C 13 13, 13 14, 12 14 L 7 14 C 6 14, 6 13, 6 13 C 6 12, 6 12, 7 12 Z M 13 2 L 13 4 C 13 5, 14 7, 15 7 L 29 7 C 30 7, 31 5, 31 4 L 31 2 L 13 2 Z M 5 2 C 3 2, 2 3, 2 5 L 2 50 C 2 52, 3 53, 5 53 L 39 53 C 41 53, 42 52, 42 50 L 42 49 L 30 49 C 28 49, 27 48, 27 46 L 27 15 C 27 14, 28 12, 30 12 L 42 12 L 42 5 C 42 3, 41 2, 39 2 L 33 2 L 33 4 C 33 6, 31 8, 29 8 L 15 8 C 13 8, 11 6, 11 4 L 11 2 L 5 2 Z M 5 0 L 39 0 C 42 0, 44 2, 44 5 L 44 12 L 52 12 C 54 12, 55 14, 55 15 L 55 46 C 55 48, 54 49, 52 49 L 44 49 L 44 50 C 44 53, 42 55, 39 55 L 5 55 C 2 55, 0 53, 0 50 L 0 5 C 0 2, 2 0, 5 0 Z"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 10,
    "x": 672,
    "y": 514,
    "width": 55,
    "height": 55,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 18 48 L 30 48 C 30 48, 31 48, 31 49 C 31 49, 30 49, 30 49 L 18 49 C 17 49, 17 49, 17 49 C 17 48, 17 48, 18 48 Z M 7 48 L 13 48 C 14 48, 14 48, 14 49 C 14 49, 14 49, 13 49 L 7 49 C 6 49, 6 49, 6 49 C 6 48, 6 48, 7 48 Z M 25 34 L 25 42 L 35 42 L 35 34 L 25 34 Z M 14 34 L 14 42 L 24 42 L 24 34 L 14 34 Z M 7 34 L 7 42 L 12 42 L 12 34 L 7 34 Z M 25 25 L 25 32 L 35 32 L 35 25 L 25 25 Z M 14 25 L 14 32 L 24 32 L 24 25 L 14 25 Z M 7 25 L 7 32 L 12 32 L 12 25 L 7 25 Z M 25 18 L 25 23 L 35 23 L 35 18 L 25 18 Z M 14 18 L 14 23 L 24 23 L 24 18 L 14 18 Z M 7 18 L 7 23 L 12 23 L 12 18 L 7 18 Z M 7 17 L 36 17 C 36 17, 36 17, 36 17 L 36 43 C 36 44, 36 44, 36 44 L 7 44 C 6 44, 6 44, 6 43 L 6 17 C 6 17, 6 17, 7 17 Z M 19 11 L 24 11 C 25 11, 25 12, 25 12 C 25 12, 25 13, 24 13 L 19 13 C 19 13, 18 12, 18 12 C 18 12, 19 11, 19 11 Z M 7 11 L 15 11 C 15 11, 16 12, 16 12 C 16 12, 15 13, 15 13 L 7 13 C 6 13, 6 12, 6 12 C 6 12, 6 11, 7 11 Z M 15 6 L 24 6 C 25 6, 25 6, 25 6 C 25 7, 25 7, 24 7 L 15 7 C 15 7, 14 7, 14 6 C 14 6, 15 6, 15 6 Z M 7 6 L 11 6 C 12 6, 12 6, 12 6 C 12 7, 12 7, 11 7 L 7 7 C 6 7, 6 7, 6 6 C 6 6, 6 6, 7 6 Z M 31 3 L 31 11 L 39 11 L 31 3 Z M 2 2 L 2 53 L 40 53 L 40 13 L 30 13 C 29 13, 29 12, 29 12 L 29 2 L 2 2 Z M 51 0 L 54 0 C 55 0, 55 0, 55 1 L 55 54 C 55 55, 55 55, 54 55 L 51 55 C 51 55, 50 55, 50 54 C 50 54, 51 53, 51 53 L 53 53 L 53 2 L 51 2 C 51 2, 50 1, 50 1 C 50 0, 51 0, 51 0 Z M 34 0 L 47 0 C 48 0, 48 0, 48 1 L 48 54 C 48 55, 48 55, 47 55 L 44 55 C 44 55, 43 55, 43 54 C 43 54, 44 53, 44 53 L 47 53 L 47 2 L 34 2 C 34 2, 33 1, 33 1 C 33 0, 34 0, 34 0 Z M 1 0 L 30 0 C 30 0, 30 0, 30 0 L 41 11 C 41 11, 42 12, 42 12 L 42 54 C 42 55, 41 55, 41 55 L 1 55 C 0 55, 0 55, 0 54 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 6,
    "x": 772,
    "y": 384,
    "width": 55,
    "height": 55,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 13 41 C 12 41, 11 42, 11 43 C 11 44, 12 45, 13 45 C 14 45, 15 44, 15 43 C 15 42, 14 41, 13 41 Z M 24 34 C 23 34, 22 35, 22 36 C 22 37, 23 38, 24 38 C 25 38, 26 37, 26 36 C 26 35, 25 34, 24 34 Z M 33 26 L 54 26 C 55 26, 55 27, 55 27 C 55 28, 55 28, 54 28 L 33 28 C 33 28, 32 28, 32 27 C 32 27, 33 26, 33 26 Z M 32 16 C 31 16, 30 17, 30 18 C 30 19, 31 20, 32 20 C 33 20, 34 19, 34 18 C 34 17, 33 16, 32 16 Z M 9 14 L 25 14 C 25 14, 25 15, 25 15 C 25 16, 25 16, 25 16 L 9 16 C 8 16, 8 16, 8 15 C 8 15, 8 14, 9 14 Z M 17 9 L 31 9 C 32 9, 32 9, 32 10 C 32 10, 32 10, 31 10 L 17 10 C 17 10, 17 10, 17 10 C 17 9, 17 9, 17 9 Z M 9 9 L 13 9 C 13 9, 14 9, 14 10 C 14 10, 13 10, 13 10 L 9 10 C 8 10, 8 10, 8 10 C 8 9, 8 9, 9 9 Z M 42 5 C 41 5, 40 6, 40 7 C 40 8, 41 9, 42 9 C 43 9, 44 8, 44 7 C 44 6, 43 5, 42 5 Z M 25 3 L 31 3 C 32 3, 32 3, 32 4 C 32 4, 32 5, 31 5 L 25 5 C 24 5, 24 4, 24 4 C 24 3, 24 3, 25 3 Z M 9 3 L 20 3 C 20 3, 21 3, 21 4 C 21 4, 20 5, 20 5 L 9 5 C 8 5, 8 4, 8 4 C 8 3, 8 3, 9 3 Z M 4 0 C 5 0, 5 0, 5 1 L 5 42 L 10 42 C 10 41, 11 39, 13 39 C 14 39, 15 40, 16 40 L 20 38 C 20 37, 20 37, 20 36 C 20 34, 22 33, 24 33 C 24 33, 24 33, 24 33 L 26 28 L 9 28 C 8 28, 8 28, 8 28 C 8 27, 8 27, 9 27 L 27 27 L 30 21 C 29 20, 28 19, 28 18 C 28 16, 30 14, 32 14 C 33 14, 33 15, 34 15 L 39 9 C 39 8, 38 8, 38 7 C 38 5, 40 3, 42 3 C 44 3, 45 4, 45 6 L 51 6 L 51 5 L 54 7 L 51 9 L 51 8 L 45 8 C 45 9, 44 11, 42 11 C 41 11, 41 10, 40 10 L 35 16 C 35 16, 36 17, 36 18 C 36 20, 34 22, 32 22 C 32 22, 31 22, 31 22 L 26 34 C 27 34, 27 35, 27 36 C 27 38, 26 40, 24 40 C 23 40, 22 40, 21 39 L 16 42 C 17 42, 17 43, 17 43 C 17 45, 15 47, 13 47 C 11 47, 10 45, 10 44 L 5 44 L 5 50 L 54 50 C 55 50, 55 50, 55 51 C 55 51, 55 52, 54 52 L 52 52 L 52 54 C 52 55, 51 55, 51 55 C 50 55, 50 55, 50 54 L 50 52 L 44 52 L 44 54 C 44 55, 44 55, 43 55 C 43 55, 42 55, 42 54 L 42 52 L 36 52 L 36 54 C 36 55, 36 55, 35 55 C 35 55, 34 55, 34 54 L 34 52 L 28 52 L 28 54 C 28 55, 28 55, 27 55 C 27 55, 27 55, 27 54 L 27 52 L 21 52 L 21 54 C 21 55, 20 55, 20 55 C 19 55, 19 55, 19 54 L 19 52 L 13 52 L 13 54 C 13 55, 12 55, 12 55 C 11 55, 11 55, 11 54 L 11 52 L 5 52 L 5 54 C 5 55, 5 55, 4 55 C 4 55, 3 55, 3 54 L 3 52 L 1 52 C 0 52, 0 51, 0 51 C 0 50, 0 50, 1 50 L 3 50 L 3 44 L 1 44 C 0 44, 0 44, 0 43 C 0 43, 0 42, 1 42 L 3 42 L 3 36 L 1 36 C 0 36, 0 36, 0 35 C 0 35, 0 34, 1 34 L 3 34 L 3 28 L 1 28 C 0 28, 0 28, 0 28 C 0 27, 0 27, 1 27 L 3 27 L 3 21 L 1 21 C 0 21, 0 20, 0 20 C 0 19, 0 19, 1 19 L 3 19 L 3 13 L 1 13 C 0 13, 0 12, 0 12 C 0 11, 0 11, 1 11 L 3 11 L 3 5 L 1 5 C 0 5, 0 5, 0 4 C 0 4, 0 3, 1 3 L 3 3 L 3 1 C 3 0, 4 0, 4 0 Z"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 560,
    "y": 206,
    "width": 55,
    "height": 55,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 28 51 C 29 50, 29 50, 30 51 C 30 51, 30 51, 30 51 C 30 52, 30 52, 30 52 C 29 52, 29 52, 29 52 C 29 52, 28 52, 28 52 C 28 52, 28 52, 28 51 C 28 51, 28 51, 28 51 Z M 12 51 C 13 50, 13 50, 14 51 C 14 51, 14 51, 14 51 C 14 52, 14 52, 14 52 C 13 52, 13 52, 13 52 C 13 52, 13 52, 12 52 C 12 52, 12 52, 12 51 C 12 51, 12 51, 12 51 Z M 21 50 C 22 50, 22 51, 22 51 C 22 52, 22 52, 21 52 C 21 52, 20 52, 20 51 C 20 51, 21 50, 21 50 Z M 2 49 L 2 52 C 2 53, 2 53, 3 53 L 39 53 C 39 53, 40 53, 40 52 L 40 49 L 2 49 Z M 17 42 L 23 42 C 24 42, 24 43, 24 43 C 24 44, 24 44, 23 44 L 17 44 C 17 44, 16 44, 16 43 C 16 43, 17 42, 17 42 Z M 6 42 L 13 42 C 13 42, 13 43, 13 43 C 13 44, 13 44, 13 44 L 6 44 C 6 44, 5 44, 5 43 C 5 43, 6 42, 6 42 Z M 31 34 L 26 38 C 29 41, 33 43, 38 43 C 41 43, 45 42, 47 40 L 43 35 C 41 36, 40 37, 38 37 C 35 37, 33 36, 31 34 Z M 11 30 C 11 30, 12 30, 12 30 L 12 39 C 12 39, 11 40, 11 40 C 11 40, 10 39, 10 39 L 10 30 C 10 30, 11 30, 11 30 Z M 6 27 C 7 27, 7 27, 7 28 L 7 38 C 7 39, 7 39, 6 39 C 6 39, 5 39, 5 38 L 5 28 C 5 27, 6 27, 6 27 Z M 16 23 C 16 23, 17 23, 17 24 L 17 38 C 17 39, 16 39, 16 39 C 16 39, 15 39, 15 38 L 15 24 C 15 23, 16 23, 16 23 Z M 52 22 L 46 25 C 47 25, 47 27, 47 28 C 47 30, 46 32, 44 34 L 49 39 C 52 36, 53 32, 53 28 C 53 26, 53 24, 52 22 Z M 38 21 C 38 21, 39 21, 39 22 L 39 22 C 39 22, 40 23, 41 24 C 41 24, 41 25, 40 25 C 40 25, 39 25, 39 25 C 39 24, 38 24, 38 24 C 37 24, 36 24, 36 25 C 36 26, 37 27, 38 27 C 40 27, 41 28, 41 30 C 41 31, 40 32, 39 32 L 39 33 C 39 33, 38 34, 38 34 C 37 34, 37 33, 37 33 L 37 32 C 36 32, 35 32, 35 31 C 35 30, 35 30, 35 30 C 36 29, 36 30, 36 30 C 36 31, 37 31, 38 31 C 39 31, 39 30, 39 30 C 39 29, 39 28, 38 28 C 36 28, 34 27, 34 25 C 34 24, 35 23, 37 22 L 37 22 C 37 21, 37 21, 38 21 Z M 38 20 C 33 20, 30 23, 30 28 C 30 32, 33 35, 38 35 C 42 35, 45 32, 45 28 C 45 23, 42 20, 38 20 Z M 6 17 L 20 17 C 20 17, 21 17, 21 17 C 21 18, 20 18, 20 18 L 6 18 C 6 18, 5 18, 5 17 C 5 17, 6 17, 6 17 Z M 38 12 L 38 18 C 41 19, 44 20, 46 23 L 52 20 C 49 15, 44 12, 38 12 Z M 37 12 C 28 12, 22 19, 22 28 C 22 31, 23 34, 25 37 L 30 33 C 29 31, 28 29, 28 28 C 28 23, 32 19, 37 18 L 37 12 Z M 15 11 L 24 11 C 24 11, 25 12, 25 12 C 25 12, 24 13, 24 13 L 15 13 C 15 13, 14 12, 14 12 C 14 12, 15 11, 15 11 Z M 6 11 L 11 11 C 12 11, 12 12, 12 12 C 12 12, 12 13, 11 13 L 6 13 C 6 13, 5 12, 5 12 C 5 12, 6 11, 6 11 Z M 2 7 L 2 48 L 40 48 L 40 45 C 39 45, 38 45, 38 45 C 28 45, 20 37, 20 28 C 20 18, 28 10, 38 10 C 38 10, 39 10, 40 10 L 40 7 L 2 7 Z M 21 3 C 22 3, 22 3, 22 4 C 22 4, 22 4, 21 4 C 21 4, 20 4, 20 4 C 20 3, 21 3, 21 3 Z M 3 2 C 2 2, 2 2, 2 3 L 2 6 L 40 6 L 40 3 C 40 2, 39 2, 39 2 L 3 2 Z M 3 0 L 39 0 C 40 0, 42 1, 42 3 L 42 11 C 49 12, 55 19, 55 28 C 55 36, 49 43, 42 44 L 42 52 C 42 54, 40 55, 39 55 L 3 55 C 1 55, 0 54, 0 52 L 0 3 C 0 1, 1 0, 3 0 Z"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 4,
    "x": 453,
    "y": 326,
    "width": 55,
    "height": 55,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 4 42 L 4 53 L 13 53 L 13 42 L 4 42 Z M 1 40 L 16 40 C 17 40, 17 40, 17 41 C 17 41, 17 42, 16 42 L 15 42 L 15 54 C 15 55, 15 55, 14 55 L 3 55 C 3 55, 2 55, 2 54 L 2 42 L 1 42 C 0 42, 0 41, 0 41 C 0 40, 0 40, 1 40 Z M 42 35 L 42 53 L 51 53 L 51 35 L 42 35 Z M 39 33 L 54 33 C 55 33, 55 34, 55 34 C 55 34, 55 35, 54 35 L 53 35 L 53 54 C 53 55, 52 55, 52 55 L 41 55 C 40 55, 40 55, 40 54 L 40 35 L 39 35 C 38 35, 38 34, 38 34 C 38 34, 38 33, 39 33 Z M 23 28 L 23 53 L 32 53 L 32 28 L 23 28 Z M 9 28 C 7 28, 5 30, 5 32 C 5 34, 7 35, 9 35 C 11 35, 12 34, 12 32 C 12 30, 11 28, 9 28 Z M 20 26 L 35 26 C 36 26, 36 27, 36 27 C 36 28, 36 28, 35 28 L 34 28 L 34 54 C 34 55, 33 55, 33 55 L 22 55 C 22 55, 21 55, 21 54 L 21 28 L 20 28 C 19 28, 19 28, 19 27 C 19 27, 19 26, 20 26 Z M 9 26 C 12 26, 14 29, 14 32 C 14 35, 12 37, 9 37 C 6 37, 3 35, 3 32 C 3 29, 6 26, 9 26 Z M 47 19 C 44 19, 42 21, 42 24 C 42 27, 44 29, 47 29 C 49 29, 51 27, 51 24 C 51 21, 49 19, 47 19 Z M 47 18 C 50 18, 53 20, 53 24 C 53 28, 50 30, 47 30 C 43 30, 40 28, 40 24 C 40 20, 43 18, 47 18 Z M 34 11 C 35 11, 35 12, 35 12 C 35 12, 35 13, 34 13 C 34 13, 33 12, 33 12 C 33 12, 34 11, 34 11 Z M 21 11 C 22 11, 22 12, 22 12 C 22 12, 22 13, 21 13 C 21 13, 20 12, 20 12 C 20 12, 21 11, 21 11 Z M 27 4 C 28 4, 28 4, 28 5 L 28 5 C 30 6, 31 6, 31 8 C 31 8, 31 8, 31 9 C 30 9, 30 9, 30 8 C 29 7, 28 7, 27 7 C 26 7, 25 8, 25 9 C 25 10, 26 11, 27 11 C 30 11, 31 13, 31 15 C 31 16, 30 18, 28 18 L 28 19 C 28 20, 28 20, 27 20 C 27 20, 27 20, 27 19 L 27 18 C 25 18, 24 17, 24 16 C 24 16, 24 15, 24 15 C 25 15, 25 15, 25 15 C 26 16, 27 17, 27 17 C 29 17, 30 16, 30 15 C 30 13, 29 13, 27 13 C 25 13, 24 11, 24 9 C 24 7, 25 6, 27 5 L 27 5 C 27 4, 27 4, 27 4 Z M 27 2 C 22 2, 17 6, 17 12 C 17 18, 22 22, 27 22 C 33 22, 38 18, 38 12 C 38 6, 33 2, 27 2 Z M 27 0 C 34 0, 39 5, 39 12 C 39 19, 34 24, 27 24 C 21 24, 16 19, 16 12 C 16 5, 21 0, 27 0 Z"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 926,
    "y": 334,
    "width": 141,
    "height": 36,
    "text": "Your title 5"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 3,
    "x": 926,
    "y": 375,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 885,
    "y": 127,
    "width": 141,
    "height": 36,
    "text": "Your title 4"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 885,
    "y": 168,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 5,
    "x": 885,
    "y": 542,
    "width": 141,
    "height": 36,
    "text": "Your title 6"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 5,
    "x": 885,
    "y": 582,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 254,
    "y": 127,
    "width": 141,
    "height": 36,
    "text": "Your title 3"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 0,
    "x": 121,
    "y": 168,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 4,
    "x": 254,
    "y": 542,
    "width": 141,
    "height": 36,
    "text": "Your title 1"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 4,
    "x": 121,
    "y": 582,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 2,
    "x": 214,
    "y": 334,
    "width": 141,
    "height": 36,
    "text": "Your title 2"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 2,
    "x": 81,
    "y": 375,
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

export function Migso58Template({ data }: { data: BrainData }): ReactElement {
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
