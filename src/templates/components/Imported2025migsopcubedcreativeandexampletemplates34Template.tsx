import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 663,
    "y": 217,
    "width": 148,
    "height": 322,
    "fillColor": "#ff4d38",
    "pathD": "M 14 0 C 11 14, 9 29, 7 44 C -5 136, -1 230, 18 322 C 48 316, 76 301, 100 278 C 164 213, 164 109, 100 45 C 75 21, 45 6, 14 0 Z"
  },
  {
    "id": "sp-1",
    "x": 483,
    "y": 337,
    "width": 270,
    "height": 206,
    "fillColor": "#ffb900",
    "pathD": "M 5 0 C 4 7, 2 13, 1 20 C 1 20, 1 21, 1 21 C 1 24, 1 28, 0 31 C 0 31, 0 32, 0 32 C 0 38, 0 44, 0 50 C 0 51, 0 52, 0 53 C 1 56, 1 59, 1 61 C 1 64, 2 66, 2 68 C 3 71, 3 74, 4 77 C 4 80, 5 83, 6 86 C 6 88, 7 89, 7 91 C 8 94, 10 98, 11 101 C 12 103, 12 104, 13 106 C 14 109, 16 113, 18 117 C 18 118, 19 119, 19 120 C 22 124, 24 128, 27 132 C 27 132, 27 132, 27 132 C 30 136, 33 140, 36 144 C 36 145, 37 146, 38 147 C 41 151, 44 154, 48 158 C 52 162, 56 166, 60 169 C 65 173, 69 176, 73 179 C 74 180, 76 180, 77 181 C 80 183, 83 185, 87 187 C 89 188, 90 189, 92 190 C 95 191, 98 192, 101 193 C 103 194, 105 195, 107 196 C 110 197, 113 198, 115 199 C 118 199, 120 200, 122 201 C 125 201, 127 202, 130 203 C 133 203, 135 204, 138 204 C 140 204, 143 205, 145 205 C 148 205, 151 205, 154 206 C 156 206, 158 206, 160 206 C 163 206, 166 206, 169 206 C 171 206, 173 206, 175 206 C 178 205, 182 205, 185 205 C 187 204, 188 204, 190 204 C 193 203, 197 203, 201 202 C 202 202, 203 201, 204 201 C 208 200, 212 199, 216 198 C 216 197, 217 197, 218 197 C 222 195, 226 194, 230 192 C 231 192, 231 191, 232 191 C 236 189, 240 187, 244 185 C 245 185, 245 184, 246 184 C 250 182, 254 179, 257 177 C 258 177, 258 176, 259 176 C 262 173, 266 170, 270 167 C 270 167, 270 167, 270 167 C 196 91, 105 34, 5 0 Z"
  },
  {
    "id": "sp-2",
    "x": 666,
    "y": 429,
    "width": 87,
    "height": 110,
    "fillColor": "#52c49c",
    "pathD": "M 0 0 C 3 37, 8 74, 15 110 C 16 110, 17 110, 18 110 C 19 109, 20 109, 22 109 C 25 108, 28 107, 32 106 C 33 105, 34 105, 35 105 C 44 102, 53 98, 61 93 C 61 93, 61 93, 61 93 C 62 93, 62 92, 62 92 C 66 90, 70 87, 75 84 C 79 81, 83 78, 87 75 C 60 47, 31 22, 0 0 Z"
  },
  {
    "id": "sp-3",
    "x": 483,
    "y": 215,
    "width": 317,
    "height": 187,
    "fillColor": "#4a90d9",
    "pathD": "M 164 0 C 122 0, 80 16, 48 48 C 10 86, -5 138, 2 187 C 100 138, 207 110, 317 105 C 309 84, 297 65, 280 48 C 248 16, 206 0, 164 0 Z"
  },
  {
    "id": "sp-4",
    "x": 664,
    "y": 217,
    "width": 136,
    "height": 121,
    "fillColor": "#3365cc",
    "pathD": "M 13 0 C 11 14, 8 29, 6 44 C 3 69, 1 95, 0 121 C 45 111, 90 105, 136 102 C 136 102, 136 102, 136 102 C 134 97, 132 92, 129 87 C 127 82, 124 78, 121 73 C 121 73, 121 73, 121 72 C 121 72, 121 72, 121 72 C 118 68, 115 64, 112 59 C 111 59, 111 59, 111 58 C 111 58, 111 58, 111 58 C 110 58, 110 57, 109 57 C 106 53, 103 49, 99 45 C 95 42, 92 38, 88 35 C 87 34, 85 33, 84 32 C 82 30, 79 28, 76 26 C 74 25, 73 24, 71 23 C 68 21, 64 19, 61 17 C 60 17, 60 16, 59 16 C 59 16, 59 16, 59 16 C 55 14, 51 12, 47 10 C 45 9, 43 8, 41 8 C 38 7, 36 6, 33 5 C 31 4, 29 4, 27 3 C 25 3, 22 2, 20 1 C 18 1, 16 0, 13 0 Z"
  },
  {
    "id": "sp-5",
    "x": 483,
    "y": 337,
    "width": 81,
    "height": 65,
    "fillColor": "#ee6d90",
    "pathD": "M 5 0 C 4 3, 4 7, 3 10 C 2 13, 2 17, 1 20 C 1 21, 1 22, 1 23 C 1 25, 1 27, 0 29 C 0 31, 0 33, 0 36 C 0 36, 0 37, 0 38 C 0 41, 0 43, 0 45 C 0 46, 0 47, 0 48 C 0 50, 0 53, 1 56 C 1 59, 1 62, 2 65 C 28 52, 54 41, 81 31 C 56 19, 31 9, 5 0 Z"
  },
  {
    "id": "sp-6",
    "x": 396,
    "y": 318,
    "width": 527,
    "height": 134,
    "strokeColor": "#ffffff",
    "pathD": "M 0 134 C 145 38, 317 -9, 491 1 C 503 2, 515 3, 527 4"
  },
  {
    "id": "sp-7",
    "x": 663,
    "y": 125,
    "width": 44,
    "height": 517,
    "strokeColor": "#ffffff",
    "pathD": "M 38 0 C 23 44, 13 90, 7 136 C -9 257, 4 381, 39 500 C 41 506, 42 511, 44 517"
  },
  {
    "id": "sp-8",
    "x": 357,
    "y": 306,
    "width": 445,
    "height": 252,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 C 169 22, 323 106, 432 236 C 436 241, 441 247, 445 252"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 656,
    "y": 117,
    "width": 75,
    "height": 75,
    "fillColor": "#3365cc",
    "pathD": "M 38 0 A 38 38 0 1 1 37 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 753,
    "y": 501,
    "width": 75,
    "height": 75,
    "fillColor": "#52c49c",
    "pathD": "M 38 0 A 38 38 0 1 1 37 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 348,
    "y": 430,
    "width": 75,
    "height": 75,
    "fillColor": "#ee6d90",
    "pathD": "M 38 0 A 38 38 0 1 1 37 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 310,
    "y": 264,
    "width": 75,
    "height": 75,
    "fillColor": "#4a90d9",
    "pathD": "M 38 0 A 38 38 0 1 1 37 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 867,
    "y": 282,
    "width": 75,
    "height": 75,
    "fillColor": "#ff4d38",
    "pathD": "M 38 0 A 38 38 0 1 1 37 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 660,
    "y": 583,
    "width": 75,
    "height": 75,
    "fillColor": "#ffb900",
    "pathD": "M 38 0 A 38 38 0 1 1 37 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 679,
    "y": 602,
    "width": 36,
    "height": 37,
    "fillColor": "#ffffff",
    "pathD": "M 20 29 C 20 29, 20 29, 20 30 C 20 30, 20 30, 20 30 C 19 30, 19 30, 19 30 C 19 29, 19 29, 20 29 Z M 25 26 L 25 30 L 28 30 L 28 26 L 25 26 Z M 8 26 L 8 30 L 11 30 L 11 26 L 8 26 Z M 16 24 L 16 36 L 20 36 L 20 24 L 16 24 Z M 25 23 L 25 25 L 28 25 L 28 23 L 25 23 Z M 8 23 L 8 25 L 11 25 L 11 23 L 8 23 Z M 25 22 L 29 22 C 29 22, 29 23, 29 23 L 29 30 L 30 30 C 30 30, 30 30, 30 30 C 30 31, 30 31, 30 31 L 24 31 C 24 31, 23 31, 23 30 C 23 30, 24 30, 24 30 L 24 30 L 24 23 C 24 23, 24 22, 25 22 Z M 7 22 L 11 22 C 12 22, 12 23, 12 23 L 12 30 L 12 30 C 12 30, 13 30, 13 30 C 13 31, 12 31, 12 31 L 6 31 C 6 31, 6 31, 6 30 C 6 30, 6 30, 6 30 L 7 30 L 7 23 C 7 23, 7 22, 7 22 Z M 4 18 L 4 36 L 15 36 L 15 24 L 14 24 C 14 24, 14 23, 14 23 C 14 23, 14 22, 14 22 L 22 22 C 22 22, 22 23, 22 23 C 22 23, 22 24, 22 24 L 21 24 L 21 36 L 32 36 L 32 18 L 4 18 Z M 18 8 C 17 8, 16 9, 16 10 L 16 13 L 20 13 L 20 10 C 20 9, 19 8, 18 8 Z M 18 7 C 20 7, 22 8, 22 10 L 22 13 L 22 13 C 22 13, 22 14, 22 14 C 22 14, 22 15, 22 15 L 14 15 C 14 15, 14 14, 14 14 C 14 14, 14 13, 14 13 L 15 13 L 15 10 C 15 8, 16 7, 18 7 Z M 18 1 L 2 17 L 34 17 L 18 1 Z M 7 1 L 7 11 L 10 7 L 10 1 L 7 1 Z M 5 0 L 12 0 C 12 0, 13 0, 13 1 C 13 1, 12 1, 12 1 L 11 1 L 11 6 L 18 0 C 18 0, 18 0, 18 0 L 36 17 C 36 18, 36 18, 36 18 C 36 18, 36 18, 35 18 L 33 18 L 33 36 L 35 36 C 36 36, 36 36, 36 36 C 36 37, 36 37, 35 37 L 1 37 C 0 37, 0 37, 0 36 C 0 36, 0 36, 1 36 L 3 36 L 3 18 L 1 18 C 0 18, 0 18, 0 18 C 0 18, 0 18, 0 17 L 6 12 L 6 1 L 5 1 C 5 1, 5 1, 5 1 C 5 0, 5 0, 5 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 886,
    "y": 303,
    "width": 37,
    "height": 34,
    "fillColor": "#ffffff",
    "pathD": "M 4 24 C 4 24, 4 24, 4 24 L 6 26 C 6 26, 6 26, 6 26 C 6 26, 6 26, 6 26 L 8 25 C 8 25, 8 25, 9 25 C 9 26, 10 27, 11 27 C 11 27, 11 28, 11 28 L 10 30 C 10 30, 10 30, 10 30 C 10 30, 10 30, 10 30 L 12 31 C 12 31, 12 31, 12 31 L 13 29 C 14 29, 14 29, 14 29 C 15 29, 16 30, 17 30 C 17 30, 17 30, 17 30 L 17 33 C 17 33, 18 33, 18 33 L 20 33 C 20 33, 20 33, 20 33 L 20 30 C 20 30, 21 30, 21 30 C 22 30, 23 29, 24 29 C 24 29, 24 29, 24 29 L 26 31 C 26 31, 26 31, 26 31 L 28 30 C 28 30, 28 30, 28 30 C 28 30, 28 30, 28 30 L 27 28 C 27 28, 27 27, 27 27 C 28 27, 29 26, 29 25 C 29 25, 30 25, 30 25 L 32 26 C 32 26, 32 26, 32 26 C 32 26, 32 26, 32 26 L 34 24 C 34 24, 34 24, 34 24 C 35 24, 35 24, 35 24 L 33 27 C 33 27, 33 27, 32 27 C 32 27, 32 27, 31 27 L 30 26 C 29 27, 29 27, 28 28 L 29 29 C 29 30, 29 30, 29 30 C 29 31, 29 31, 29 31 L 26 32 C 26 33, 25 32, 25 32 L 24 30 C 23 31, 22 31, 22 31 L 22 33 C 22 33, 21 34, 20 34 L 18 34 C 17 34, 16 33, 16 33 L 16 31 C 16 31, 15 31, 14 30 L 13 32 C 13 32, 12 33, 11 32 L 9 31 C 9 31, 9 31, 9 30 C 8 30, 9 30, 9 29 L 10 28 C 9 27, 9 27, 8 26 L 7 27 C 6 27, 6 27, 5 27 C 5 27, 5 27, 5 27 L 3 24 C 3 24, 3 24, 4 24 Z M 12 21 C 12 21, 12 21, 12 21 C 13 24, 16 25, 19 25 C 22 25, 25 24, 26 21 C 26 21, 26 21, 26 21 L 12 21 Z M 6 15 L 4 17 L 6 19 L 8 19 L 9 17 L 8 15 L 6 15 Z M 5 14 L 8 14 C 9 14, 9 14, 9 14 L 10 17 C 10 17, 10 17, 10 17 L 9 20 C 9 20, 9 20, 8 20 L 5 20 C 5 20, 5 20, 5 20 L 3 17 C 3 17, 3 17, 3 17 L 5 14 C 5 14, 5 14, 5 14 Z M 7 12 C 4 12, 1 14, 1 17 C 1 20, 4 22, 7 22 C 8 22, 10 22, 11 20 C 11 20, 11 20, 12 20 L 26 20 C 26 20, 26 20, 26 20 C 27 22, 29 22, 31 22 C 33 22, 34 22, 35 20 L 30 20 C 30 20, 30 20, 30 20 L 28 17 C 28 17, 28 17, 28 17 L 30 14 C 30 14, 30 14, 30 14 L 35 14 C 34 12, 33 12, 31 12 C 29 12, 27 12, 26 14 C 26 14, 26 14, 26 14 L 12 14 C 11 14, 11 14, 11 14 C 10 12, 8 12, 7 12 Z M 19 9 C 16 9, 13 10, 12 13 C 12 13, 12 13, 12 13 L 26 13 C 26 13, 26 13, 26 13 C 25 10, 22 9, 19 9 Z M 19 8 C 22 8, 25 9, 27 12 C 28 11, 29 10, 31 10 C 34 10, 36 12, 37 14 C 37 14, 37 15, 37 15 C 37 15, 37 15, 36 15 L 31 15 L 29 17 L 31 19 L 36 19 C 37 19, 37 19, 37 19 C 37 19, 37 20, 37 20 C 36 22, 34 24, 31 24 C 29 24, 28 23, 27 22 C 25 25, 22 26, 19 26 C 15 26, 12 25, 11 22 C 10 23, 8 24, 7 24 C 3 24, 0 21, 0 17 C 0 13, 3 10, 7 10 C 8 10, 10 11, 11 12 C 12 9, 15 8, 19 8 Z M 18 0 L 20 0 C 21 0, 22 1, 22 1 L 22 3 C 22 3, 23 3, 24 4 L 25 2 C 25 2, 25 2, 25 2 C 26 1, 26 1, 26 2 L 29 3 C 29 3, 29 3, 29 4 C 29 4, 29 4, 29 5 L 28 6 C 29 7, 29 7, 30 8 L 31 7 C 32 7, 32 7, 32 7 C 33 7, 33 7, 33 7 L 35 10 C 35 10, 35 10, 34 10 C 34 10, 34 10, 34 10 C 34 10, 34 10, 34 10 L 32 8 C 32 8, 32 8, 32 8 C 32 8, 32 8, 32 8 L 30 9 C 30 9, 29 9, 29 9 C 29 8, 28 7, 27 7 C 27 7, 27 6, 27 6 L 28 4 C 28 4, 28 4, 28 4 L 26 3 C 26 3, 26 3, 26 3 L 24 5 C 24 5, 24 5, 24 5 C 23 5, 22 4, 21 4 C 21 4, 20 4, 20 4 L 20 1 C 20 1, 20 1, 20 1 L 18 1 C 18 1, 17 1, 17 1 L 17 4 C 17 4, 17 4, 17 4 C 16 4, 15 5, 14 5 C 14 5, 14 5, 13 5 L 12 3 C 12 3, 12 3, 12 3 L 10 4 C 10 4, 10 4, 10 4 C 10 4, 10 4, 10 4 L 11 6 C 11 6, 11 7, 11 7 C 10 7, 9 8, 9 9 C 8 9, 8 9, 8 9 L 6 8 C 6 8, 6 8, 6 8 C 6 8, 6 8, 6 8 L 4 10 C 4 10, 4 10, 4 10 C 3 10, 3 10, 3 10 L 5 7 C 5 7, 5 7, 5 7 C 6 7, 6 7, 7 7 L 8 8 C 9 7, 9 7, 10 6 L 9 5 C 9 4, 8 4, 9 4 C 9 3, 9 3, 9 3 L 11 2 C 12 1, 12 1, 12 2 C 13 2, 13 2, 13 2 L 14 4 C 15 3, 16 3, 16 3 L 16 1 C 16 1, 17 0, 18 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 371,
    "y": 449,
    "width": 29,
    "height": 36,
    "fillColor": "#ffffff",
    "pathD": "M 6 26 C 7 26, 7 26, 7 27 L 7 35 L 14 31 C 14 31, 15 31, 15 31 L 22 35 L 22 27 C 22 26, 22 26, 23 26 C 23 26, 23 26, 23 27 L 23 35 C 23 36, 23 36, 23 36 C 23 36, 23 36, 23 36 C 22 36, 22 36, 22 36 L 15 32 L 7 36 C 7 36, 6 36, 6 36 C 6 36, 6 36, 6 35 L 6 27 C 6 26, 6 26, 6 26 Z M 15 10 L 13 12 C 13 12, 13 12, 13 12 L 10 13 L 12 15 C 12 15, 12 15, 12 15 L 12 18 L 14 17 C 14 17, 15 17, 15 17 L 17 18 L 17 15 C 17 15, 17 15, 17 15 L 19 13 L 16 12 C 16 12, 16 12, 16 12 L 15 10 Z M 14 8 C 14 8, 15 8, 15 8 L 17 11 L 20 12 C 21 12, 21 12, 21 12 C 21 13, 21 13, 21 13 L 18 16 L 19 19 C 19 20, 19 20, 18 20 C 18 20, 18 20, 18 20 L 15 18 L 11 20 C 11 20, 11 20, 11 20 C 11 20, 11 20, 11 20 C 10 20, 10 20, 10 19 L 11 16 L 8 13 C 8 13, 8 13, 8 12 C 8 12, 8 12, 9 12 L 12 11 L 14 8 Z M 14 5 C 9 5, 5 9, 5 14 C 5 19, 9 23, 14 23 C 19 23, 23 19, 23 14 C 23 9, 19 5, 14 5 Z M 14 4 C 20 4, 24 9, 24 14 C 24 20, 20 24, 14 24 C 9 24, 4 20, 4 14 C 4 9, 9 4, 14 4 Z M 15 1 L 12 3 C 12 3, 12 3, 12 3 L 9 2 L 8 4 C 8 5, 8 5, 8 5 L 5 5 L 5 8 C 5 8, 5 8, 5 8 L 2 9 L 3 12 C 3 12, 3 12, 3 12 L 1 14 L 3 16 C 3 17, 3 17, 3 17 L 2 19 L 5 21 C 5 21, 5 21, 5 21 L 5 24 L 8 24 C 8 24, 8 24, 8 24 L 9 27 L 12 26 C 12 26, 12 26, 12 26 C 12 26, 12 26, 12 26 L 15 28 L 17 26 C 17 26, 17 26, 17 26 L 20 27 L 21 24 C 21 24, 21 24, 21 24 L 24 24 L 24 21 C 24 21, 24 21, 25 21 L 27 19 L 26 17 C 26 17, 26 17, 26 16 L 28 14 L 26 12 C 26 12, 26 12, 26 12 L 27 9 L 25 8 C 24 8, 24 8, 24 8 L 24 5 L 21 5 C 21 5, 21 5, 21 4 L 20 2 L 17 3 C 17 3, 17 3, 17 3 L 15 1 Z M 14 0 C 14 0, 15 0, 15 0 L 17 2 L 20 1 C 20 1, 20 1, 20 1 L 22 4 L 24 4 C 25 4, 25 4, 25 5 L 25 7 L 28 9 C 28 9, 28 9, 28 9 L 27 12 L 29 14 C 29 14, 29 14, 29 15 L 27 17 L 28 20 C 28 20, 28 20, 28 20 L 25 21 L 25 24 C 25 24, 25 25, 24 25 L 22 25 L 20 27 C 20 28, 20 28, 20 28 L 17 27 L 15 29 C 15 29, 15 29, 15 29 C 14 29, 14 29, 14 29 L 12 27 L 9 28 C 9 28, 9 28, 9 27 L 7 25 L 5 25 C 4 25, 4 24, 4 24 L 4 21 L 1 20 C 1 20, 1 20, 1 20 L 2 17 L 0 15 C 0 14, 0 14, 0 14 L 2 12 L 1 9 C 1 9, 1 9, 1 9 L 4 7 L 4 5 C 4 4, 4 4, 5 4 L 7 4 L 9 1 C 9 1, 9 1, 9 1 L 12 2 L 14 0 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 772,
    "y": 524,
    "width": 37,
    "height": 31,
    "fillColor": "#ffffff",
    "pathD": "M 4 30 L 33 30 C 33 30, 33 30, 33 30 C 33 31, 33 31, 33 31 L 4 31 C 4 31, 4 31, 4 30 C 4 30, 4 30, 4 30 Z M 29 24 C 29 24, 30 24, 30 24 C 30 25, 29 25, 29 25 C 29 25, 28 25, 28 24 C 28 24, 29 24, 29 24 Z M 26 24 C 26 24, 27 24, 27 24 C 27 25, 26 25, 26 25 C 26 25, 25 25, 25 24 C 25 24, 26 24, 26 24 Z M 23 24 C 23 24, 24 24, 24 24 C 24 25, 23 25, 23 25 C 23 25, 23 25, 23 24 C 23 24, 23 24, 23 24 Z M 20 24 C 20 24, 21 24, 21 24 C 21 25, 20 25, 20 25 C 20 25, 20 25, 20 24 C 20 24, 20 24, 20 24 Z M 17 24 C 17 24, 18 24, 18 24 C 18 25, 17 25, 17 25 C 17 25, 17 25, 17 24 C 17 24, 17 24, 17 24 Z M 14 24 C 14 24, 15 24, 15 24 C 15 25, 14 25, 14 25 C 14 25, 13 25, 13 24 C 13 24, 14 24, 14 24 Z M 11 24 C 12 24, 12 24, 12 24 C 12 25, 12 25, 11 25 C 11 25, 11 25, 11 24 C 11 24, 11 24, 11 24 Z M 8 24 C 9 24, 9 24, 9 24 C 9 25, 9 25, 8 25 C 8 25, 8 25, 8 24 C 8 24, 8 24, 8 24 Z M 29 21 C 30 21, 30 21, 30 21 C 30 22, 30 22, 29 22 C 29 22, 29 22, 29 21 C 29 21, 29 21, 29 21 Z M 26 21 C 27 21, 27 21, 27 21 C 27 22, 27 22, 26 22 C 26 22, 26 22, 26 21 C 26 21, 26 21, 26 21 Z M 23 21 C 24 21, 24 21, 24 21 C 24 22, 24 22, 23 22 C 23 22, 23 22, 23 21 C 23 21, 23 21, 23 21 Z M 20 21 C 20 21, 21 21, 21 21 C 21 22, 20 22, 20 22 C 20 22, 20 22, 20 21 C 20 21, 20 21, 20 21 Z M 17 21 C 17 21, 18 21, 18 21 C 18 22, 17 22, 17 22 C 17 22, 17 22, 17 21 C 17 21, 17 21, 17 21 Z M 14 21 C 14 21, 14 21, 14 21 C 14 22, 14 22, 14 22 C 14 22, 13 22, 13 21 C 13 21, 14 21, 14 21 Z M 11 21 C 11 21, 11 21, 11 21 C 11 22, 11 22, 11 22 C 11 22, 10 22, 10 21 C 10 21, 11 21, 11 21 Z M 8 21 C 8 21, 8 21, 8 21 C 8 22, 8 22, 8 22 C 7 22, 7 22, 7 21 C 7 21, 7 21, 8 21 Z M 35 10 C 34 10, 33 11, 33 11 C 33 12, 34 13, 35 13 C 35 13, 36 12, 36 11 C 36 11, 35 10, 35 10 Z M 2 10 C 2 10, 1 11, 1 11 C 1 12, 2 13, 2 13 C 3 13, 4 12, 4 11 C 4 11, 3 10, 2 10 Z M 12 5 C 12 5, 12 5, 11 5 L 10 16 C 10 16, 10 17, 10 17 C 10 17, 9 17, 9 17 L 4 13 C 4 13, 4 13, 3 14 L 6 27 L 31 27 L 34 14 C 33 13, 33 13, 33 13 L 28 17 C 28 17, 27 17, 27 17 C 27 17, 27 16, 27 16 L 26 5 C 25 5, 25 5, 25 5 L 19 14 C 19 14, 18 14, 18 14 L 12 5 Z M 26 1 C 25 1, 25 2, 25 2 C 25 3, 25 4, 26 4 C 27 4, 27 3, 27 2 C 27 2, 27 1, 26 1 Z M 11 1 C 10 1, 10 2, 10 2 C 10 3, 10 4, 11 4 C 12 4, 12 3, 12 2 C 12 2, 12 1, 11 1 Z M 11 0 C 12 0, 14 1, 14 2 C 14 3, 13 4, 13 4 L 18 12 L 24 4 C 24 4, 23 3, 23 2 C 23 1, 25 0, 26 0 C 27 0, 28 1, 28 2 C 28 4, 28 4, 27 5 L 28 15 L 32 12 C 32 12, 32 12, 32 11 C 32 10, 33 9, 35 9 C 36 9, 37 10, 37 11 C 37 13, 36 14, 35 14 L 32 28 C 32 28, 31 28, 31 28 L 6 28 C 6 28, 5 28, 5 28 L 2 14 C 1 14, 0 13, 0 11 C 0 10, 1 9, 2 9 C 4 9, 5 10, 5 11 C 5 12, 5 12, 5 12 L 9 15 L 10 5 C 9 4, 9 4, 9 2 C 9 1, 10 0, 11 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 329,
    "y": 283,
    "width": 36,
    "height": 37,
    "fillColor": "#ffffff",
    "pathD": "M 28 24 L 28 31 L 31 31 L 31 25 C 31 24, 31 24, 30 24 L 28 24 Z M 9 24 L 9 36 L 27 36 L 27 24 L 9 24 Z M 6 24 C 5 24, 5 24, 5 25 L 5 31 L 8 31 L 8 24 L 6 24 Z M 1 19 L 1 30 C 1 31, 2 31, 2 31 L 4 31 L 4 25 C 4 24, 5 22, 6 22 L 30 22 C 31 22, 32 24, 32 25 L 32 31 L 34 31 C 35 31, 35 31, 35 30 L 35 19 L 1 19 Z M 9 15 C 10 15, 10 15, 10 16 C 10 16, 10 16, 9 16 C 9 16, 9 16, 9 16 C 9 15, 9 15, 9 15 Z M 6 15 C 7 15, 7 15, 7 16 C 7 16, 7 16, 6 16 C 6 16, 6 16, 6 16 C 6 15, 6 15, 6 15 Z M 4 15 C 4 15, 4 15, 4 16 C 4 16, 4 16, 4 16 C 3 16, 3 16, 3 16 C 3 15, 3 15, 4 15 Z M 2 13 C 2 13, 1 13, 1 14 L 1 18 L 35 18 L 35 14 C 35 13, 35 13, 34 13 L 2 13 Z M 28 7 L 28 12 L 31 12 L 31 7 L 28 7 Z M 5 7 L 5 12 L 8 12 L 8 7 L 5 7 Z M 9 1 L 9 12 L 27 12 L 27 1 L 9 1 Z M 9 0 L 27 0 C 28 0, 28 0, 28 1 L 28 6 L 32 6 C 32 6, 32 6, 32 6 L 32 12 L 34 12 C 35 12, 36 13, 36 14 L 36 30 C 36 32, 35 32, 34 32 L 28 32 L 28 36 C 28 37, 28 37, 27 37 L 9 37 C 8 37, 8 37, 8 36 L 8 32 L 2 32 C 1 32, 0 32, 0 30 L 0 14 C 0 13, 1 12, 2 12 L 4 12 L 4 6 C 4 6, 4 6, 4 6 L 8 6 L 8 1 C 8 0, 8 0, 9 0 Z"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 676,
    "y": 136,
    "width": 35,
    "height": 37,
    "fillColor": "#ffffff",
    "pathD": "M 20 27 L 24 27 C 24 27, 25 27, 25 28 C 25 28, 24 28, 24 28 L 20 28 C 20 28, 20 28, 20 28 C 20 27, 20 27, 20 27 Z M 4 27 L 18 27 C 18 27, 18 27, 18 28 C 18 28, 18 28, 18 28 L 4 28 C 4 28, 4 28, 4 28 C 4 27, 4 27, 4 27 Z M 20 23 L 26 23 C 27 23, 27 23, 27 24 C 27 24, 27 24, 26 24 L 20 24 C 20 24, 20 24, 20 24 C 20 23, 20 23, 20 23 Z M 12 23 L 16 23 C 16 23, 17 23, 17 24 C 17 24, 16 24, 16 24 L 12 24 C 11 24, 11 24, 11 24 C 11 23, 11 23, 12 23 Z M 20 20 L 25 20 C 25 20, 25 20, 25 20 C 25 20, 25 21, 25 21 L 20 21 C 20 21, 20 20, 20 20 C 20 20, 20 20, 20 20 Z M 12 20 L 17 20 C 18 20, 18 20, 18 20 C 18 20, 18 21, 17 21 L 12 21 C 11 21, 11 20, 11 20 C 11 20, 11 20, 12 20 Z M 5 17 L 5 23 L 9 23 L 9 17 L 5 17 Z M 20 16 L 26 16 C 27 16, 27 16, 27 16 C 27 17, 27 17, 26 17 L 20 17 C 20 17, 20 17, 20 16 C 20 16, 20 16, 20 16 Z M 12 16 L 17 16 C 18 16, 18 16, 18 16 C 18 17, 18 17, 17 17 L 12 17 C 11 17, 11 17, 11 16 C 11 16, 11 16, 12 16 Z M 4 16 L 9 16 C 9 16, 10 16, 10 16 L 10 24 C 10 24, 9 24, 9 24 L 4 24 C 4 24, 4 24, 4 24 L 4 16 C 4 16, 4 16, 4 16 Z M 20 12 L 26 12 C 27 12, 27 12, 27 13 C 27 13, 27 13, 26 13 L 20 13 C 20 13, 20 13, 20 13 C 20 12, 20 12, 20 12 Z M 4 12 L 18 12 C 18 12, 18 12, 18 13 C 18 13, 18 13, 18 13 L 4 13 C 4 13, 4 13, 4 13 C 4 12, 4 12, 4 12 Z M 31 6 L 31 32 C 31 32, 30 32, 30 32 L 6 32 L 6 36 L 34 36 L 34 6 L 31 6 Z M 5 5 L 5 8 L 26 8 L 26 5 L 5 5 Z M 4 4 L 26 4 C 27 4, 27 4, 27 4 L 27 9 C 27 9, 27 9, 26 9 L 4 9 C 4 9, 4 9, 4 9 L 4 4 C 4 4, 4 4, 4 4 Z M 1 1 L 1 31 L 29 31 L 29 1 L 1 1 Z M 1 0 L 30 0 C 30 0, 31 0, 31 1 L 31 4 L 34 4 C 35 4, 35 5, 35 5 L 35 36 C 35 37, 35 37, 34 37 L 5 37 C 5 37, 4 37, 4 36 L 4 32 L 1 32 C 0 32, 0 32, 0 32 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 960,
    "y": 276,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 1,
    "x": 960,
    "y": 313,
    "width": 240,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 4,
    "x": 839,
    "y": 496,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 3,
    "x": 839,
    "y": 534,
    "width": 240,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 0,
    "x": 745,
    "y": 109,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-26",
    "x": 745,
    "y": 147,
    "width": 293,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 5,
    "x": 524,
    "y": 577,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-28",
    "x": 325,
    "y": 615,
    "width": 310,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 3,
    "x": 214,
    "y": 425,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 2,
    "x": 86,
    "y": 463,
    "width": 240,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 1,
    "x": 181,
    "y": 258,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 0,
    "x": 53,
    "y": 296,
    "width": 240,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
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

export function Imported2025migsopcubedcreativeandexampletemplates34Template({ data }: { data: BrainData }): ReactElement {
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
