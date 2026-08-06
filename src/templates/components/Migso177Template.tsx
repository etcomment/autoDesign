import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 422,
    "y": 297,
    "width": 217,
    "height": 283,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 214 200 L 214 200 C 212 198, 209 198, 207 199 L 207 199 C 198 204, 189 206, 182 207 L 182 207 C 182 207, 181 207, 180 207 L 180 207 C 172 207, 164 203, 159 197 L 159 197 C 159 197, 159 197, 159 197 L 159 197 C 159 197, 159 197, 159 197 L 159 197 C 159 196, 158 196, 158 196 L 158 196 C 158 196, 158 195, 158 195 L 158 195 C 158 195, 158 195, 158 195 L 158 195 C 154 190, 152 184, 152 176 L 152 176 C 152 176, 152 175, 152 174 L 152 174 C 152 156, 162 144, 177 142 L 177 142 C 178 142, 179 142, 180 142 L 180 142 C 187 142, 197 145, 207 150 L 207 150 C 209 151, 212 151, 214 150 L 214 150 C 216 148, 217 146, 217 144 L 217 65 L 138 65 L 138 65 C 138 65, 137 65, 137 65 L 137 65 C 133 64, 130 63, 129 60 L 129 60 C 127 57, 126 53, 128 50 L 128 50 C 128 50, 128 49, 128 49 L 128 49 C 129 48, 129 46, 130 45 L 130 45 C 133 37, 136 30, 136 24 L 136 24 C 136 17, 133 11, 127 6 L 127 6 C 122 2, 115 0, 108 0 L 108 0 C 100 0, 92 2, 88 6 L 88 6 C 82 11, 80 17, 80 24 L 80 24 C 80 31, 82 40, 87 49 L 87 49 C 88 52, 88 56, 86 60 L 86 60 C 85 61, 85 61, 84 62 L 84 62 C 82 64, 79 65, 76 65 L 76 65 L 0 65 L 0 65 C 1 185, 97 282, 217 283 L 217 206 L 217 206 C 217 203, 216 201, 214 200"
  },
  {
    "id": "sp-1",
    "x": 577,
    "y": 362,
    "width": 282,
    "height": 218,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 282 0 L 205 0 L 205 0 C 203 0, 200 1, 199 3 L 199 3 C 198 5, 198 8, 199 10 L 199 10 C 203 19, 206 28, 206 35 L 206 35 C 206 35, 206 36, 206 37 L 206 37 C 206 45, 203 53, 197 58 L 197 58 C 196 58, 196 58, 196 58 L 196 58 C 196 58, 196 58, 196 58 L 196 58 C 196 58, 196 59, 195 59 L 195 59 C 195 59, 195 59, 194 59 L 194 59 C 194 59, 194 59, 194 59 L 194 59 C 189 63, 183 65, 176 65 L 176 65 C 175 65, 175 65, 174 65 L 174 65 C 156 65, 143 55, 142 40 L 142 40 C 142 39, 142 38, 142 37 L 142 37 C 142 30, 145 20, 150 10 L 150 10 C 151 8, 151 5, 149 3 L 149 3 C 148 1, 146 0, 143 0 L 65 0 L 65 79 L 65 79 C 65 79, 65 80, 65 80 L 65 80 C 64 84, 62 87, 59 88 L 59 88 C 57 90, 53 91, 50 89 L 50 89 C 49 89, 49 89, 49 89 L 49 89 C 47 88, 46 88, 45 87 L 45 87 C 37 84, 30 81, 24 81 L 24 81 C 17 81, 11 84, 6 89 L 6 89 C 2 94, 0 102, 0 109 L 0 109 C 0 117, 2 125, 6 129 L 6 129 C 11 135, 17 137, 24 137 L 24 137 C 30 137, 40 135, 49 130 L 49 130 C 52 129, 56 129, 60 131 L 60 131 C 60 132, 61 132, 62 133 L 62 133 C 64 135, 65 138, 65 141 L 65 141 L 65 218 L 65 218 C 185 217, 281 120, 282 0"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 642,
    "y": 143,
    "width": 217,
    "height": 282,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 3 83 L 3 83 C 5 84, 8 84, 10 83 L 10 83 C 19 79, 28 76, 35 76 L 35 76 C 35 75, 36 75, 36 75 L 36 75 C 45 75, 52 79, 58 85 L 58 85 C 58 85, 58 85, 58 85 L 58 85 C 58 85, 58 86, 58 86 L 58 86 C 58 86, 58 86, 59 86 L 59 86 C 59 87, 59 87, 59 87 L 59 87 C 59 87, 59 87, 59 87 L 59 87 C 63 92, 65 99, 65 106 L 65 106 C 65 107, 65 107, 65 108 L 65 108 C 65 126, 55 138, 40 140 L 40 140 C 39 140, 38 140, 36 140 L 36 140 C 29 140, 20 137, 10 132 L 10 132 C 8 131, 5 131, 3 132 L 3 132 C 1 134, 0 136, 0 138 L 0 217 L 78 217 L 78 217 C 79 217, 79 217, 80 217 L 80 217 C 83 218, 86 219, 88 222 L 88 222 C 90 225, 90 229, 89 232 L 89 232 C 89 232, 89 233, 89 233 L 89 233 C 88 234, 87 236, 87 237 L 87 237 C 83 245, 81 252, 81 258 L 81 258 C 81 265, 84 271, 89 276 L 89 276 C 94 280, 101 282, 109 282 L 109 282 C 117 282, 124 280, 129 276 L 129 276 C 134 271, 137 265, 137 258 L 137 258 C 137 251, 134 242, 130 233 L 130 233 C 128 230, 129 226, 131 222 L 131 222 C 131 221, 132 221, 132 220 L 132 220 C 134 218, 137 217, 140 217 L 140 217 L 217 217 L 217 217 C 216 97, 119 1, 0 0 L 0 77 L 0 77 C 0 79, 1 81, 3 83"
  },
  {
    "id": "sp-3",
    "x": 422,
    "y": 143,
    "width": 281,
    "height": 217,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 82 214 L 82 214 C 83 212, 83 209, 82 207 L 82 207 C 78 198, 76 189, 75 182 L 75 182 C 75 182, 75 181, 75 180 L 75 180 C 75 172, 78 164, 85 159 L 85 159 C 85 159, 85 159, 85 159 L 85 159 C 85 159, 85 159, 85 159 L 85 159 C 85 159, 86 158, 86 158 L 86 158 C 86 158, 86 158, 87 158 L 87 158 C 87 158, 87 158, 87 158 L 87 158 C 92 154, 98 152, 105 152 L 105 152 C 106 152, 107 152, 107 152 L 107 152 C 125 152, 138 162, 139 177 L 139 177 C 139 178, 139 179, 139 180 L 139 180 C 139 187, 137 197, 132 207 L 132 207 C 130 209, 131 212, 132 214 L 132 214 C 133 216, 135 217, 138 217 L 216 217 L 216 138 L 216 138 C 216 138, 216 137, 216 137 L 216 137 C 217 134, 219 131, 222 129 L 222 129 C 224 127, 228 127, 231 128 L 231 128 C 232 128, 232 128, 233 128 L 233 128 C 234 129, 235 129, 236 130 L 236 130 C 244 134, 252 136, 257 136 L 257 136 C 264 136, 270 133, 275 128 L 275 128 C 279 123, 281 116, 281 108 L 281 108 C 281 100, 279 93, 275 88 L 275 88 C 270 82, 264 80, 257 80 L 257 80 C 251 80, 241 82, 232 87 L 232 87 C 229 88, 225 88, 221 86 L 221 86 C 221 86, 220 85, 219 84 L 219 84 C 217 82, 216 80, 216 77 L 216 77 L 216 0 L 216 0 C 97 1, 1 98, 0 217 L 76 217 L 76 217 C 79 217, 81 216, 82 214"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 502,
    "y": 219,
    "width": 57,
    "height": 57,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 11 47 L 19 35 L 23 41 L 23 41 C 24 41, 24 41, 25 41 L 25 41 C 25 41, 25 41, 25 41 L 29 37 L 35 47 L 11 47 Z M 39 47 L 39 47 L 39 47 C 39 47, 39 47, 39 47 L 31 34 L 31 34 L 31 34 C 31 34, 30 34, 30 34 L 30 34 C 29 34, 29 34, 29 34 L 25 38 L 21 32 L 21 32 C 20 31, 20 31, 19 31 L 19 31 C 19 31, 19 31, 18 32 L 18 32 L 8 47 L 8 47 L 8 47 C 8 47, 8 48, 8 48 L 8 48 C 8 49, 8 49, 9 49 L 37 49 L 37 49 C 38 49, 39 49, 39 48 L 39 48 C 39 48, 39 48, 39 47 Z M 44 52 L 44 52 C 44 53, 43 54, 41 54 L 5 54 L 5 54 C 4 54, 3 53, 3 52 L 3 16 L 3 16 C 3 14, 4 13, 5 13 L 41 13 L 41 13 C 43 13, 44 14, 44 16 L 44 52 Z M 41 10 L 5 10 L 5 10 C 2 10, 0 13, 0 16 L 0 52 L 0 52 C 0 55, 2 57, 5 57 L 41 57 L 41 57 C 44 57, 47 55, 47 52 L 47 16 L 47 16 C 47 13, 44 10, 41 10 Z M 52 0 L 15 0 L 15 0 C 13 0, 10 2, 10 5 L 10 6 L 10 6 C 10 7, 11 8, 12 8 L 12 8 C 12 8, 13 7, 13 6 L 13 5 L 13 5 C 13 4, 14 3, 15 3 L 52 3 L 52 3 C 53 3, 54 4, 54 5 L 54 41 L 54 41 C 54 43, 53 44, 52 44 L 50 44 L 50 44 C 50 44, 49 45, 49 45 L 49 45 C 49 46, 50 47, 50 47 L 52 47 L 52 47 C 55 47, 57 44, 57 41 L 57 5 L 57 5 C 57 2, 55 0, 52 0 Z M 13 21 L 13 21 C 14 21, 15 22, 15 23 L 15 23 C 15 25, 14 26, 13 26 L 13 26 C 11 26, 10 25, 10 23 L 10 23 C 10 22, 11 21, 13 21 Z M 13 28 L 13 28 C 16 28, 18 26, 18 23 L 18 23 C 18 20, 16 18, 13 18 L 13 18 C 10 18, 8 20, 8 23 L 8 23 C 8 26, 10 28, 13 28 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 712,
    "y": 219,
    "width": 57,
    "height": 57,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 48 43 L 25 43 L 25 43 C 24 43, 23 43, 23 44 L 23 44 C 23 45, 24 45, 25 45 L 48 45 L 48 45 C 49 45, 49 45, 49 44 L 49 44 C 49 43, 49 43, 48 43 Z M 48 27 L 25 27 L 25 27 C 24 27, 23 28, 23 28 L 23 28 C 23 29, 24 30, 25 30 L 48 30 L 48 30 C 49 30, 49 29, 49 28 L 49 28 C 49 28, 49 27, 48 27 Z M 54 52 L 54 52 C 54 53, 53 54, 52 54 L 5 54 L 5 54 C 4 54, 3 53, 3 52 L 3 5 L 3 5 C 3 4, 4 3, 5 3 L 52 3 L 52 3 C 53 3, 54 4, 54 5 L 54 52 Z M 52 0 L 5 0 L 5 0 C 2 0, 0 2, 0 5 L 0 52 L 0 52 C 0 55, 2 57, 5 57 L 52 57 L 52 57 C 55 57, 57 55, 57 52 L 57 5 L 57 5 C 57 2, 55 0, 52 0 Z M 48 12 L 25 12 L 25 12 C 24 12, 23 12, 23 13 L 23 13 C 23 14, 24 14, 25 14 L 48 14 L 48 14 C 49 14, 49 14, 49 13 L 49 13 C 49 12, 49 12, 48 12 Z M 13 8 L 12 12 L 8 12 L 11 14 L 9 18 L 13 16 L 16 18 L 15 14 L 18 12 L 14 12 L 13 8 Z M 14 43 L 13 39 L 12 43 L 8 43 L 11 45 L 9 49 L 13 47 L 16 49 L 15 45 L 18 43 L 14 43 Z M 13 23 L 12 27 L 8 27 L 11 29 L 9 34 L 13 31 L 16 34 L 15 29 L 18 27 L 14 27 L 13 23 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 496,
    "y": 438,
    "width": 57,
    "height": 57,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 39 31 L 39 31 C 37 31, 36 30, 36 28 L 36 28 C 36 27, 37 26, 39 26 L 39 26 C 40 26, 41 27, 41 28 L 41 28 C 41 30, 40 31, 39 31 Z M 48 27 L 44 27 L 44 27 C 43 25, 41 23, 39 23 L 39 23 C 36 23, 34 25, 34 27 L 9 27 L 9 27 C 8 27, 8 28, 8 28 L 8 28 C 8 29, 8 30, 9 30 L 34 30 L 34 30 C 34 32, 36 34, 39 34 L 39 34 C 41 34, 43 32, 44 30 L 48 30 L 48 30 C 49 30, 49 29, 49 28 L 49 28 C 49 28, 49 27, 48 27 Z M 21 17 L 21 17 C 19 17, 18 16, 18 14 L 18 14 C 18 13, 19 12, 21 12 L 21 12 C 22 12, 23 13, 23 14 L 23 14 C 23 16, 22 17, 21 17 Z M 48 13 L 26 13 L 26 13 C 25 11, 23 9, 21 9 L 21 9 C 18 9, 16 11, 16 13 L 9 13 L 9 13 C 8 13, 8 13, 8 14 L 8 14 C 8 15, 8 15, 9 15 L 16 15 L 16 15 C 16 18, 18 19, 21 19 L 21 19 C 23 19, 25 18, 26 15 L 48 15 L 48 15 C 49 15, 49 15, 49 14 L 49 14 C 49 13, 49 13, 48 13 Z M 54 52 L 54 52 C 54 53, 53 54, 52 54 L 5 54 L 5 54 C 4 54, 3 53, 3 52 L 3 5 L 3 5 C 3 4, 4 3, 5 3 L 52 3 L 52 3 C 53 3, 54 4, 54 5 L 54 52 Z M 52 0 L 5 0 L 5 0 C 2 0, 0 2, 0 5 L 0 52 L 0 52 C 0 55, 2 57, 5 57 L 52 57 L 52 57 C 55 57, 57 55, 57 52 L 57 5 L 57 5 C 57 2, 55 0, 52 0 Z M 26 45 L 26 45 C 24 45, 23 44, 23 43 L 23 43 C 23 41, 24 40, 26 40 L 26 40 C 27 40, 28 41, 28 43 L 28 43 C 28 44, 27 45, 26 45 Z M 48 41 L 31 41 L 31 41 C 30 39, 28 37, 26 37 L 26 37 C 24 37, 21 39, 21 41 L 9 41 L 9 41 C 8 41, 8 42, 8 43 L 8 43 C 8 43, 8 44, 9 44 L 21 44 L 21 44 C 21 46, 24 48, 26 48 L 26 48 C 28 48, 30 46, 31 44 L 48 44 L 48 44 C 49 44, 49 43, 49 43 L 49 43 C 49 42, 49 41, 48 41 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 367,
    "y": 247,
    "width": 127,
    "height": 10,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 127 3 L 0 3 L 0 0 L 127 0 L 127 3"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 359,
    "y": 241,
    "width": 16,
    "height": 16,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 0 8 L 0 8 C 0 12, 4 16, 8 16 L 8 16 C 12 16, 16 12, 16 8 L 16 8 C 16 4, 12 0, 8 0 L 8 0 C 4 0, 0 4, 0 8"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 782,
    "y": 247,
    "width": 127,
    "height": 10,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 127 3 L 0 3 L 0 0 L 127 0 L 127 3"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 905,
    "y": 241,
    "width": 16,
    "height": 16,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 16 8 L 16 8 C 16 4, 12 0, 8 0 L 8 0 C 4 0, 0 4, 0 8 L 0 8 C 0 12, 4 16, 8 16 L 8 16 C 12 16, 16 12, 16 8"
  },
  {
    "id": "sp-11",
    "x": 367,
    "y": 463,
    "width": 86,
    "height": 10,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 86 0 L 86 3 L 0 3 L 0 0"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 358,
    "y": 457,
    "width": 16,
    "height": 16,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 8 L 0 8 C 0 12, 4 16, 8 16 L 8 16 C 12 16, 16 12, 16 8 L 16 8 C 16 4, 12 0, 8 0 L 8 0 C 4 0, 0 4, 0 8"
  },
  {
    "id": "sp-13",
    "x": 825,
    "y": 465,
    "width": 82,
    "height": 10,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 82 3 L 0 3 L 0 0 L 82 0 L 82 3"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 904,
    "y": 458,
    "width": 16,
    "height": 16,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 16 8 L 16 8 C 16 4, 12 0, 8 0 L 8 0 C 4 0, 0 4, 0 8 L 0 8 C 0 12, 4 16, 8 16 L 8 16 C 12 16, 16 12, 16 8"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 721,
    "y": 439,
    "width": 57,
    "height": 57,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 54 23 L 3 23 L 3 18 L 54 18 C 54 18, 54 23, 54 23 Z M 49 54 L 8 54 L 8 26 L 49 26 C 49 26, 49 54, 49 54 Z M 10 3 L 31 3 L 31 9 C 31 10, 32 10, 32 10 L 39 10 L 39 16 L 10 16 C 10 16, 10 3, 10 3 Z M 34 4 L 38 8 L 34 8 C 34 8, 34 4, 34 4 Z M 47 5 L 47 16 L 41 16 L 41 8 L 39 5 C 39 5, 47 5, 47 5 Z M 54 16 L 49 16 L 49 5 C 49 4, 48 3, 47 3 L 36 3 L 34 0 L 10 0 C 9 0, 8 1, 8 3 L 8 16 L 3 16 C 1 16, 0 17, 0 18 L 0 23 C 0 25, 1 26, 3 26 L 5 26 L 5 54 C 5 56, 6 57, 8 57 L 49 57 C 51 57, 52 56, 52 54 L 52 26 L 54 26 C 56 26, 57 25, 57 23 L 57 18 C 57 17, 56 16, 54 16 M 21 34 L 36 34 L 36 36 L 21 36 C 21 36, 21 34, 21 34 Z M 21 39 L 36 39 C 38 39, 39 38, 39 36 L 39 34 C 39 32, 38 31, 36 31 L 21 31 C 19 31, 18 32, 18 34 L 18 36 C 18 38, 19 39, 21 39"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 119,
    "y": 221,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-17",
    "x": 234,
    "y": 181,
    "width": 102,
    "height": 37,
    "text": "Improve"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 2,
    "x": 119,
    "y": 436,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-19",
    "x": 241,
    "y": 396,
    "width": 95,
    "height": 37,
    "text": "Identify"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 949,
    "y": 222,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-21",
    "x": 949,
    "y": 181,
    "width": 126,
    "height": 37,
    "text": "Innovation"
  },
  {
    "id": "sp-22",
    "x": 949,
    "y": 435,
    "width": 217,
    "height": 129,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-23",
    "x": 949,
    "y": 395,
    "width": 149,
    "height": 37,
    "text": "Management"
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

export function Migso177Template({ data }: { data: BrainData }): ReactElement {
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
