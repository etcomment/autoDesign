import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 378,
    "y": 136,
    "width": 510,
    "height": 533,
    "fillColor": "#ffffff",
    "pathD": "M 273 0 C 375 1, 476 49, 502 150 C 542 304, 417 416, 417 416 C 417 416, 385 475, 398 533 L 398 533 L 196 533 L 195 529 C 188 507, 173 486, 143 487 C 81 490, 75 508, 60 485 C 45 462, 60 449, 50 439 C 50 439, 35 431, 35 421 C 35 411, 45 408, 45 408 C 45 408, 28 408, 28 397 C 27 386, 34 385, 17 378 C 0 371, -5 364, 6 346 C 16 328, 52 277, 48 255 C 44 233, -8 108, 121 37 C 165 12, 219 0, 273 0 Z"
  },
  {
    "id": "sp-1",
    "x": 966,
    "y": 207,
    "width": 62,
    "height": 36,
    "text": "Idea",
    "textColor": "#ff4d38",
    "textSize": 16
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 1,
    "x": 971,
    "y": 248,
    "width": 229,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-3",
    "x": 965,
    "y": 479,
    "width": 121,
    "height": 36,
    "text": "Marketing",
    "textColor": "#ffb900",
    "textSize": 16
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 3,
    "x": 971,
    "y": 520,
    "width": 229,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 204,
    "y": 207,
    "width": 110,
    "height": 36,
    "text": "Planning",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 81,
    "y": 248,
    "width": 229,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 209,
    "y": 479,
    "width": 106,
    "height": 36,
    "text": "Solution",
    "textColor": "#52c49c",
    "textSize": 16
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 2,
    "x": 81,
    "y": 520,
    "width": 229,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-9",
    "x": 468,
    "y": 132,
    "width": 206,
    "height": 281,
    "fillColor": "#3365cc",
    "strokeColor": "#ffffff",
    "pathD": "M 206 209 C 206 224, 197 234, 197 234 C 200 245, 202 256, 203 265 L 203 270 L 203 270 L 202 272 C 198 274, 194 277, 189 278 L 189 278 L 189 278 C 184 280, 178 281, 173 281 C 151 281, 132 267, 132 249 C 132 241, 136 234, 142 228 L 56 228 L 56 228 L 55 228 L 55 228 L 55 228 L 55 228 L 55 228 L 55 228 L 56 228 L 56 147 L 56 147 L 56 147 L 56 147 L 56 141 L 55 142 L 55 141 L 51 145 C 49 147, 48 148, 46 149 L 43 150 L 43 150 L 41 151 L 39 151 L 39 151 L 38 152 L 35 152 L 35 152 C 34 152, 33 152, 32 152 C 14 152, 0 134, 0 112 L 0 112 L 0 111 L 0 108 L 1 105 L 1 104 L 1 103 L 2 98 L 2 98 L 2 98 L 3 95 C 8 81, 19 70, 33 70 C 40 70, 46 73, 51 77 L 55 82 L 55 6 L 56 5 L 56 5 L 59 4 L 59 4 L 63 2 C 108 -12, 135 40, 135 40 C 137 40, 139 40, 140 41 L 143 41 L 144 42 L 144 42 L 143 41 L 145 42 C 147 43, 149 43, 151 44 L 151 45 L 152 45 C 153 46, 154 46, 155 47 L 155 47 L 156 48 L 157 49 L 156 49 L 156 49 L 157 49 L 158 51 C 165 60, 164 72, 164 72 C 193 82, 184 112, 184 112 C 191 116, 193 122, 194 128 C 194 137, 189 147, 189 147 L 190 147 L 190 147 L 193 149 C 212 161, 198 187, 198 187 C 204 195, 206 203, 206 209 Z"
  },
  {
    "id": "sp-10",
    "x": 656,
    "y": 175,
    "width": 201,
    "height": 194,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "pathD": "M 201 44 C 201 51, 200 58, 199 64 L 196 74 L 196 74 L 196 75 C 183 114, 147 130, 147 130 C 147 159, 103 162, 103 162 C 97 181, 71 190, 59 193 L 57 193 L 57 193 L 56 193 C 56 194, 55 194, 55 194 L 53 194 L 53 194 L 53 194 L 53 146 L 51 148 C 46 152, 40 155, 33 155 C 15 155, 0 137, 0 114 L 0 113 L 0 112 C 0 90, 15 71, 33 71 C 35 71, 37 72, 40 72 L 41 73 L 43 73 L 44 74 L 46 75 L 46 75 L 47 76 C 49 76, 50 77, 52 78 L 53 80 L 53 0 L 53 0 L 53 0 L 53 0 L 53 0 L 53 0 L 140 0 C 134 6, 130 13, 130 21 C 130 39, 148 53, 171 53 C 176 53, 182 52, 187 51 L 187 51 L 187 50 C 192 49, 196 47, 200 44 L 201 42 Z"
  },
  {
    "id": "sp-11",
    "x": 588,
    "y": 390,
    "width": 349,
    "height": 208,
    "fillColor": "#52c49c",
    "strokeColor": "#ffffff",
    "pathD": "M 349 0 L 349 81 L 345 78 C 340 74, 335 73, 330 73 L 329 73 L 329 73 C 311 73, 296 91, 296 113 C 296 136, 311 154, 329 154 L 329 154 L 330 154 C 335 154, 340 152, 345 149 L 349 146 L 349 195 L 348 195 C 348 195, 348 195, 348 195 C 337 215, 312 201, 312 201 C 274 221, 261 192, 261 192 C 223 192, 236 153, 236 153 C 212 165, 203 142, 203 142 C 193 142, 187 137, 184 129 L 183 127 L 183 127 L 182 124 C 178 107, 183 83, 183 83 C 179 82, 177 79, 176 77 L 175 75 L 175 75 L 174 72 C 172 65, 175 57, 175 57 C 173 59, 171 60, 169 61 L 168 62 L 167 62 C 163 66, 147 70, 125 72 L 121 72 L 121 72 L 114 72 C 110 73, 106 73, 101 73 L 85 73 L 85 73 L 84 73 L 0 73 L 0 60 L 0 47 L 84 47 L 85 47 L 85 47 L 101 47 L 121 48 L 127 48 L 133 48 L 140 45 L 140 45 L 147 42 C 158 36, 167 31, 175 26 L 178 24 L 179 23 C 189 15, 195 9, 195 9 C 196 7, 197 5, 198 2 L 199 0 L 205 0 L 202 3 L 201 5 C 198 8, 197 11, 196 15 L 195 20 L 194 21 L 194 21 L 195 20 L 195 21 C 195 23, 195 25, 196 27 L 196 27 L 196 28 C 200 42, 216 53, 236 53 C 258 53, 276 39, 276 21 C 276 15, 274 9, 270 5 L 270 5 L 270 5 L 266 0 L 349 0 L 349 0 Z"
  },
  {
    "id": "sp-12",
    "x": 497,
    "y": 259,
    "width": 155,
    "height": 277,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff",
    "pathD": "M 155 156 L 155 224 L 154 224 L 154 224 L 73 224 L 75 226 C 79 231, 82 237, 82 244 C 82 245, 82 246, 82 247 L 82 248 L 82 248 C 80 258, 74 266, 64 271 L 61 273 L 57 274 C 52 276, 47 277, 41 277 C 20 277, 2 264, 0 247 L 0 245 L 0 245 L 0 245 L 0 245 L 0 244 C 0 237, 3 231, 7 226 L 9 224 L 5 224 L 5 224 L 7 220 C 22 194, 39 200, 39 200 C 29 177, 29 159, 32 146 L 32 143 L 32 143 L 32 143 L 32 143 L 33 141 C 35 131, 39 126, 39 126 C 41 84, 79 89, 79 89 C 74 10, 119 15, 119 15 C 130 -7, 153 2, 153 2 L 154 1 L 154 78 L 150 74 C 145 69, 139 67, 133 67 L 132 67 L 131 67 C 114 67, 99 85, 99 108 C 99 130, 114 148, 131 148 C 132 148, 133 148, 135 148 L 135 148 L 135 148 L 138 147 C 144 146, 149 142, 154 137 C 154 136, 154 136, 154 136 L 154 137 L 150 141 L 148 143 L 148 143 L 148 143 L 148 143 L 148 143 L 150 141 L 154 137 L 154 137 L 155 137 L 155 156 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 587,
    "y": 370,
    "width": 50,
    "height": 49,
    "fillColor": "#ffffff",
    "pathD": "M 47 32 L 47 32 C 47 32, 45 33, 40 31 C 39 31, 39 31, 39 31 C 40 29, 41 27, 42 25 C 47 29, 48 31, 47 32 Z M 37 30 L 37 30 C 34 29, 30 27, 26 25 C 27 25, 27 24, 28 24 C 32 22, 37 18, 41 15 C 42 16, 42 17, 42 19 C 42 23, 40 27, 37 30 Z M 34 35 L 16 35 C 15 34, 15 32, 14 31 C 17 30, 21 28, 25 26 C 29 28, 33 30, 36 31 C 35 33, 35 34, 34 35 Z M 34 38 L 34 39 L 19 39 C 19 39, 18 40, 18 40 C 18 40, 19 41, 19 41 L 34 41 L 34 43 C 34 43, 34 43, 34 43 L 16 43 C 16 43, 16 43, 16 43 L 16 38 C 16 38, 16 37, 16 37 L 34 37 C 34 37, 34 37, 34 38 L 29 47 L 21 47 C 20 47, 18 46, 18 45 L 32 45 C 32 46, 30 47, 29 47 L 34 38 Z M 8 19 L 8 19 C 8 17, 8 16, 8 15 C 12 18, 17 21, 22 24 C 22 24, 23 25, 23 25 C 20 27, 16 29, 13 30 C 10 27, 8 23, 8 19 Z M 10 31 L 10 31 C 5 33, 3 32, 2 32 C 2 31, 3 29, 8 25 C 8 27, 10 29, 11 31 C 11 31, 11 31, 10 31 Z M 7 12 L 7 12 C 3 8, 2 6, 2 5 C 3 5, 5 4, 11 7 C 10 8, 8 10, 8 12 C 7 12, 7 12, 7 12 Z M 25 1 L 25 1 C 32 1, 39 7, 41 13 C 38 16, 33 20, 27 23 C 26 23, 26 24, 25 24 C 24 24, 23 23, 23 23 C 17 20, 13 17, 9 13 C 11 7, 17 1, 25 1 Z M 47 5 L 47 5 C 48 6, 46 9, 42 12 C 41 10, 40 8, 39 7 C 45 4, 47 5, 47 5 Z M 43 23 L 43 23 C 43 22, 43 20, 43 19 C 43 17, 43 15, 43 14 C 47 10, 50 7, 49 5 C 48 3, 44 3, 38 5 C 34 2, 30 0, 25 0 C 20 0, 15 2, 12 5 C 6 3, 2 3, 1 5 C 0 6, 2 9, 6 13 C 6 13, 7 14, 7 14 C 7 15, 7 17, 7 19 C 7 20, 7 22, 7 23 C 2 28, 0 31, 1 33 C 2 33, 2 34, 4 34 C 6 34, 8 33, 11 32 C 11 32, 12 32, 12 32 C 14 34, 15 36, 15 38 L 15 43 C 15 44, 15 45, 16 45 L 17 45 C 17 47, 19 49, 21 49 L 29 49 C 31 49, 33 47, 33 45 L 34 45 C 35 45, 36 44, 36 43 L 36 38 C 36 36, 36 33, 38 32 C 38 32, 39 32, 39 32 C 42 33, 44 34, 46 34 C 47 34, 48 33, 49 33 C 50 31, 48 28, 43 23 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 556,
    "y": 230,
    "width": 43,
    "height": 49,
    "fillColor": "#ffffff",
    "pathD": "M 9 37 L 6 39 L 6 42 L 9 43 L 11 42 L 11 39 L 9 37 Z M 8 35 C 9 35, 9 35, 9 35 L 13 38 C 13 38, 13 38, 13 38 L 13 42 C 13 42, 13 43, 13 43 L 9 45 C 9 45, 9 45, 9 45 C 9 45, 8 45, 8 45 L 5 43 C 5 43, 5 42, 5 42 L 5 38 C 5 38, 5 38, 5 38 L 8 35 Z M 19 13 C 25 13, 31 18, 31 25 C 31 31, 25 36, 19 36 C 18 36, 18 36, 18 36 C 18 35, 18 35, 19 35 C 24 35, 29 30, 29 25 C 29 19, 24 14, 19 14 C 18 14, 18 14, 18 13 C 18 13, 18 13, 19 13 Z M 5 2 C 3 3, 1 6, 1 8 C 1 10, 3 13, 5 14 C 5 14, 5 14, 5 15 L 5 34 C 5 34, 5 34, 5 34 C 3 36, 1 38, 1 40 C 1 44, 5 47, 9 47 C 13 47, 16 44, 16 40 C 16 38, 15 36, 13 34 C 13 34, 13 34, 13 34 L 13 15 C 13 14, 13 14, 13 14 C 15 13, 16 10, 16 8 C 16 6, 15 3, 13 2 L 13 9 C 13 9, 13 10, 13 10 L 9 12 C 9 12, 9 12, 8 12 L 5 10 C 5 10, 5 9, 5 9 L 5 2 Z M 5 0 C 5 0, 5 0, 6 0 C 6 0, 6 1, 6 1 L 6 9 L 9 10 L 12 9 L 12 1 C 12 1, 12 0, 12 0 C 12 0, 12 0, 13 0 C 16 2, 17 5, 17 8 C 17 11, 16 13, 14 15 L 14 33 C 16 35, 17 37, 17 40 C 17 45, 14 49, 9 49 C 4 49, 0 45, 0 40 C 0 37, 1 35, 4 33 L 4 15 C 1 13, 0 11, 0 8 C 0 5, 2 2, 5 0 Z M 17 0 L 20 0 C 21 0, 22 1, 22 2 L 22 5 C 23 5, 24 5, 25 5 L 27 3 C 27 3, 27 2, 28 2 C 28 2, 29 2, 29 2 L 32 4 C 33 5, 33 6, 33 7 L 32 9 C 32 10, 33 10, 34 11 L 36 10 C 37 10, 37 10, 38 10 C 38 10, 39 10, 39 11 L 41 14 C 41 14, 41 15, 41 15 C 41 16, 40 16, 40 16 L 38 18 C 38 19, 38 20, 38 21 L 41 21 C 42 21, 43 22, 43 23 L 43 26 C 43 27, 42 28, 41 28 L 38 28 C 38 29, 38 30, 38 31 L 40 32 C 41 33, 41 34, 41 35 L 39 38 C 39 38, 38 39, 38 39 C 37 39, 37 39, 36 39 L 34 38 C 33 38, 32 39, 32 40 L 33 42 C 33 43, 33 44, 32 45 L 29 46 C 29 47, 28 47, 28 47 C 27 46, 27 46, 27 46 L 25 43 C 24 44, 23 44, 22 44 L 22 47 C 22 48, 21 49, 20 49 L 17 49 C 17 49, 17 48, 17 48 C 17 48, 17 47, 17 47 L 20 47 C 20 47, 21 47, 21 47 L 21 44 C 21 43, 21 43, 21 43 C 23 43, 24 42, 25 42 C 26 42, 26 42, 26 42 L 28 45 C 28 45, 28 45, 28 45 C 28 45, 28 45, 28 45 L 32 43 C 32 43, 32 43, 32 43 L 30 40 C 30 40, 30 39, 30 39 C 31 38, 32 37, 33 36 C 33 36, 34 36, 34 36 L 37 38 C 37 38, 37 38, 37 38 C 37 38, 37 37, 38 37 L 39 34 C 39 34, 39 34, 39 34 C 39 34, 39 34, 39 34 L 36 32 C 36 32, 36 32, 36 31 C 37 30, 37 29, 37 27 C 37 27, 37 27, 38 27 L 41 27 C 41 27, 41 26, 41 26 L 41 23 C 41 22, 41 22, 41 22 L 38 22 C 37 22, 37 22, 37 21 C 37 20, 37 19, 36 18 C 36 17, 36 17, 36 17 L 39 15 C 39 15, 39 15, 39 15 C 39 15, 39 15, 39 14 L 38 11 C 37 11, 37 11, 37 11 C 37 11, 37 11, 37 11 L 34 13 C 34 13, 33 13, 33 13 C 32 12, 31 11, 30 10 C 30 10, 30 9, 30 9 L 32 6 C 32 6, 32 6, 32 5 L 28 4 C 28 4, 28 4, 28 4 C 28 4, 28 4, 28 4 L 26 7 C 26 7, 26 7, 25 7 C 24 6, 23 6, 21 6 C 21 6, 21 5, 21 5 L 21 2 C 21 2, 20 1, 20 1 L 17 1 C 17 1, 17 1, 17 1 C 17 0, 17 0, 17 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 734,
    "y": 390,
    "width": 49,
    "height": 48,
    "fillColor": "#ffffff",
    "pathD": "M 41 40 C 40 40, 40 40, 40 41 C 40 42, 40 42, 41 42 C 42 42, 43 42, 43 41 C 43 40, 42 40, 41 40 Z M 41 38 C 43 38, 44 39, 44 41 C 44 43, 43 44, 41 44 C 40 44, 39 43, 38 42 L 26 42 C 25 42, 25 41, 25 41 C 25 41, 25 40, 26 40 L 38 40 C 39 39, 40 38, 41 38 Z M 31 32 C 30 32, 30 33, 30 34 C 30 34, 30 35, 31 35 C 32 35, 33 34, 33 34 C 33 33, 32 32, 31 32 Z M 31 31 C 33 31, 34 32, 34 33 L 43 33 C 44 33, 44 33, 44 34 C 44 34, 44 34, 43 34 L 34 34 C 34 36, 33 37, 31 37 C 30 37, 29 36, 29 34 L 26 34 C 25 34, 25 34, 25 34 C 25 33, 25 33, 26 33 L 29 33 C 29 32, 30 31, 31 31 Z M 38 25 C 37 25, 36 26, 36 26 C 36 27, 37 28, 38 28 C 39 28, 39 27, 39 26 C 39 26, 39 25, 38 25 Z M 38 24 C 39 24, 40 24, 41 26 L 43 26 C 44 26, 44 26, 44 26 C 44 27, 44 27, 43 27 L 41 27 C 40 28, 39 29, 38 29 C 36 29, 35 28, 35 27 L 26 27 C 25 27, 25 27, 25 26 C 25 26, 25 26, 26 26 L 35 26 C 35 24, 36 24, 38 24 Z M 21 21 L 21 47 L 47 47 L 47 21 L 21 21 Z M 20 19 L 48 19 C 49 19, 49 20, 49 20 L 49 47 C 49 48, 49 48, 48 48 L 20 48 C 20 48, 20 48, 20 47 L 20 20 C 20 20, 20 19, 20 19 Z M 11 6 C 10 6, 10 6, 10 7 C 10 8, 10 9, 11 9 C 12 9, 13 8, 13 7 C 13 6, 12 6, 11 6 Z M 11 4 C 13 4, 15 6, 15 7 C 15 9, 13 10, 11 10 C 10 10, 8 9, 8 7 C 8 6, 10 4, 11 4 Z M 1 0 L 30 0 C 31 0, 31 0, 31 1 L 31 16 C 31 17, 31 17, 30 17 C 30 17, 30 17, 30 16 L 30 1 L 2 1 L 2 22 L 8 13 C 8 13, 8 13, 8 13 C 9 13, 9 13, 9 13 L 13 18 L 21 7 C 21 7, 22 7, 22 7 L 28 16 C 28 16, 28 17, 28 17 C 28 17, 27 17, 27 17 L 21 9 L 14 20 L 17 25 C 17 25, 17 25, 17 26 C 17 26, 17 26, 17 26 C 16 26, 16 26, 16 25 L 8 15 L 2 24 L 2 29 L 17 29 C 17 29, 17 29, 17 30 C 17 30, 17 31, 17 31 L 1 31 C 0 31, 0 30, 0 30 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 723,
    "y": 240,
    "width": 49,
    "height": 49,
    "fillColor": "#ffffff",
    "pathD": "M 39 41 C 39 41, 39 41, 39 41 L 39 43 C 39 44, 39 44, 39 44 C 38 44, 38 44, 38 43 L 38 41 C 38 41, 38 41, 39 41 Z M 17 41 C 17 41, 18 41, 18 41 L 18 43 C 18 44, 17 44, 17 44 C 16 44, 16 44, 16 43 L 16 41 C 16 41, 16 41, 17 41 Z M 42 38 L 43 38 C 44 38, 44 38, 44 38 C 44 39, 44 39, 43 39 L 42 39 C 41 39, 41 39, 41 38 C 41 38, 41 38, 42 38 Z M 12 38 L 14 38 C 14 38, 14 38, 14 38 C 14 39, 14 39, 14 39 L 12 39 C 11 39, 11 39, 11 38 C 11 38, 11 38, 12 38 Z M 28 24 L 23 27 L 28 30 L 32 27 L 28 24 Z M 38 18 L 29 24 L 34 27 C 34 27, 34 27, 34 27 C 34 28, 34 28, 34 28 L 29 31 L 38 37 L 38 18 Z M 17 18 L 17 37 L 26 31 L 21 28 C 21 28, 21 28, 21 27 C 21 27, 21 27, 21 27 L 26 24 L 17 18 Z M 16 16 C 17 16, 17 16, 17 16 L 28 23 L 38 16 C 38 16, 39 16, 39 16 C 39 16, 39 16, 39 17 L 39 38 C 39 39, 39 39, 39 39 C 39 39, 39 39, 39 39 C 38 39, 38 39, 38 39 L 28 32 L 17 39 C 17 39, 17 39, 17 39 C 17 39, 16 39, 16 39 C 16 39, 16 39, 16 38 L 16 17 C 16 16, 16 16, 16 16 Z M 42 16 L 43 16 C 44 16, 44 16, 44 17 C 44 17, 44 17, 43 17 L 42 17 C 41 17, 41 17, 41 17 C 41 16, 41 16, 42 16 Z M 12 16 L 14 16 C 14 16, 14 16, 14 17 C 14 17, 14 17, 14 17 L 12 17 C 11 17, 11 17, 11 17 C 11 16, 11 16, 12 16 Z M 39 11 C 39 11, 39 11, 39 12 L 39 14 C 39 14, 39 14, 39 14 C 38 14, 38 14, 38 14 L 38 12 C 38 11, 38 11, 39 11 Z M 17 11 C 17 11, 18 11, 18 12 L 18 14 C 18 14, 17 14, 17 14 C 16 14, 16 14, 16 14 L 16 12 C 16 11, 16 11, 17 11 Z M 8 8 L 8 35 C 8 36, 8 36, 7 36 C 4 36, 2 39, 2 42 C 2 45, 4 47, 7 47 L 47 47 L 47 8 L 8 8 Z M 6 2 C 4 2, 2 4, 2 7 L 2 37 C 3 36, 4 35, 6 35 L 6 2 Z M 7 0 C 8 0, 8 0, 8 1 L 8 6 L 48 6 C 49 6, 49 6, 49 7 L 49 48 C 49 49, 49 49, 48 49 L 7 49 C 3 49, 0 46, 0 42 L 0 7 C 0 3, 3 0, 7 0 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates19Template({ data }: { data: BrainData }): ReactElement {
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
