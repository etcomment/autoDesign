import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 328,
    "y": 233,
    "width": 230,
    "height": 10,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 230 3 L 0 3 L 0 0 L 230 0 L 230 3"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 316,
    "y": 223,
    "width": 24,
    "height": 24,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 24 12 L 24 12 C 24 19, 19 24, 12 24 L 12 24 C 5 24, 0 19, 0 12 L 0 12 C 0 5, 5 0, 12 0 L 12 0 C 19 0, 24 5, 24 12"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 718,
    "y": 233,
    "width": 230,
    "height": 10,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 230 3 L 0 3 L 0 0 L 230 0 L 230 3"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 940,
    "y": 223,
    "width": 24,
    "height": 24,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 24 12 L 24 12 C 24 19, 19 24, 12 24 L 12 24 C 5 24, 0 19, 0 12 L 0 12 C 0 5, 5 0, 12 0 L 12 0 C 19 0, 24 5, 24 12"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 386,
    "y": 362,
    "width": 290,
    "height": 254,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 285 156 L 285 156 C 285 156, 285 156, 285 156 L 285 156 C 285 156, 284 155, 284 155 L 284 155 C 284 155, 284 155, 284 155 L 284 155 C 284 155, 284 155, 284 155 L 284 155 C 284 155, 284 155, 283 155 L 283 155 C 283 155, 283 155, 283 155 L 283 155 C 282 154, 280 153, 278 153 L 278 153 C 277 153, 277 153, 277 153 L 277 153 C 273 153, 268 155, 264 157 L 264 157 C 262 158, 259 158, 258 157 L 258 157 C 256 156, 254 154, 254 152 L 254 152 C 254 152, 254 152, 254 151 L 254 110 L 254 110 C 194 110, 145 61, 145 0 L 145 0 C 145 0, 145 0, 145 0 L 100 0 L 100 0 C 100 0, 100 1, 100 1 L 100 1 C 99 3, 98 5, 99 7 L 99 7 C 102 12, 103 17, 103 20 L 103 20 C 103 21, 103 21, 103 21 L 103 21 C 103 23, 103 25, 102 27 L 102 27 L 102 27 L 102 27 C 101 27, 101 27, 101 27 L 101 27 C 101 27, 101 27, 101 27 L 101 27 C 101 28, 101 28, 101 28 L 101 28 C 101 28, 101 28, 101 28 L 101 28 C 101 28, 101 28, 101 28 L 101 28 C 100 29, 100 29, 99 30 L 99 30 C 96 32, 92 33, 88 33 L 88 33 C 83 33, 79 32, 77 29 L 77 29 C 75 28, 74 26, 73 25 L 73 25 C 73 23, 73 22, 73 20 L 73 20 C 73 17, 74 12, 77 7 L 77 7 C 78 5, 78 3, 77 1 L 77 1 C 77 1, 76 1, 76 1 L 76 1 C 76 1, 76 0, 76 0 L 0 0 L 0 0 C 0 141, 114 254, 254 254 L 254 228 L 254 185 L 254 185 C 254 185, 256 181, 257 180 L 257 180 C 257 180, 258 180, 258 180 L 258 180 C 260 179, 262 178, 264 179 L 264 179 C 269 182, 274 183, 277 183 L 277 183 C 278 183, 280 183, 281 183 L 281 183 C 283 182, 285 181, 286 180 L 286 180 C 288 177, 290 173, 290 168 L 290 168 C 290 164, 289 160, 287 157 L 287 157 C 286 157, 285 156, 285 156"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 640,
    "y": 327,
    "width": 254,
    "height": 289,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 183 35 L 183 35 C 182 35, 181 33, 181 33 L 181 33 C 181 32, 180 32, 180 32 L 180 32 C 179 30, 179 28, 180 26 L 180 26 C 183 21, 184 16, 184 13 L 184 13 C 184 12, 184 10, 184 9 L 184 9 C 183 7, 182 5, 181 4 L 181 4 C 178 1, 174 0, 169 0 L 169 0 C 165 0, 161 1, 158 3 L 158 3 C 157 4, 157 5, 156 5 L 156 5 C 156 5, 156 5, 156 5 L 156 5 C 156 5, 156 6, 156 6 L 156 6 C 156 6, 156 6, 156 6 L 156 6 L 156 6 L 156 6 C 156 6, 156 6, 156 7 L 156 7 L 156 7 L 156 7 C 155 8, 154 10, 154 12 L 154 12 C 154 13, 154 13, 154 13 L 154 13 C 154 16, 155 22, 158 26 L 158 26 C 159 28, 158 31, 157 32 L 157 32 C 157 33, 156 35, 156 35 L 109 35 L 109 35 C 109 35, 109 35, 109 35 L 109 35 C 109 96, 60 145, 0 145 L 0 187 L 0 187 C 0 189, 2 191, 3 192 L 3 192 C 5 193, 7 193, 9 192 L 9 192 C 14 190, 19 188, 23 188 L 23 188 C 23 188, 23 188, 23 188 L 23 188 C 26 188, 27 189, 29 190 L 29 190 C 29 190, 29 190, 29 190 L 29 190 C 29 190, 29 190, 30 190 L 30 190 C 30 190, 30 190, 30 190 L 30 190 C 30 190, 30 190, 30 190 L 30 190 C 30 190, 30 191, 30 191 L 30 191 C 30 191, 30 191, 30 191 L 30 191 C 31 191, 32 192, 32 192 L 32 192 C 34 195, 36 199, 36 203 L 36 203 C 36 208, 34 212, 32 215 L 32 215 C 30 216, 29 217, 27 218 L 27 218 C 25 218, 24 218, 23 218 L 23 218 C 19 218, 14 217, 9 214 L 9 214 C 8 213, 5 214, 3 215 L 3 215 C 3 215, 3 215, 3 215 L 3 215 C 2 216, 0 220, 0 220 L 0 263 L 0 289 L 0 289 C 140 289, 254 176, 254 35 L 183 35"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 605,
    "y": 107,
    "width": 289,
    "height": 254,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 35 0 L 35 72 L 35 72 C 34 73, 33 74, 33 74 L 33 74 C 33 74, 32 74, 32 74 L 32 74 C 30 75, 28 76, 26 75 L 26 75 C 21 72, 16 71, 13 71 L 13 71 C 12 71, 10 71, 9 71 L 9 71 C 7 72, 5 73, 4 74 L 4 74 C 1 77, 0 81, 0 86 L 0 86 C 0 90, 1 94, 3 97 L 3 97 C 4 97, 5 98, 5 98 L 5 98 C 5 98, 5 98, 5 98 L 5 98 C 5 99, 6 99, 6 99 L 6 99 C 6 99, 6 99, 6 99 L 6 99 C 6 99, 6 99, 6 99 L 6 99 C 6 99, 6 99, 7 99 L 7 99 L 7 99 L 7 99 C 8 100, 10 101, 12 101 L 12 101 C 13 101, 13 101, 13 101 L 13 101 C 17 101, 22 99, 26 97 L 26 97 C 28 96, 31 96, 32 97 L 32 97 C 33 98, 34 99, 35 100 L 35 145 L 35 145 C 95 145, 144 194, 144 254 L 190 254 L 190 254 C 191 253, 192 252, 192 251 L 192 251 C 193 249, 193 247, 193 245 L 193 245 C 190 240, 189 235, 189 232 L 189 232 C 189 232, 189 232, 189 231 L 189 231 C 189 229, 189 227, 190 226 L 190 226 L 190 226 L 190 226 C 190 225, 191 225, 191 225 L 191 225 L 191 225 L 191 225 C 191 225, 191 225, 191 225 L 191 225 C 191 225, 191 224, 191 224 L 191 224 C 191 224, 191 224, 191 224 L 191 224 C 192 224, 192 223, 193 222 L 193 222 C 196 220, 200 219, 204 219 L 204 219 C 209 219, 213 220, 215 223 L 215 223 C 217 224, 218 226, 218 228 L 218 228 C 219 229, 219 231, 219 232 L 219 232 C 219 235, 218 240, 215 245 L 215 245 C 214 247, 214 249, 215 251 L 215 251 C 215 251, 215 251, 215 252 L 215 252 C 216 252, 217 253, 218 254 L 289 254 L 289 254 C 289 114, 175 0, 35 0"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 386,
    "y": 107,
    "width": 254,
    "height": 288,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 100 256 L 100 256 C 100 255, 100 255, 100 255 L 145 255 L 145 255 C 145 194, 194 145, 254 145 L 254 100 L 254 100 C 253 99, 253 98, 252 98 L 252 98 C 250 96, 248 96, 246 97 L 246 97 C 241 100, 236 101, 232 101 L 232 101 C 232 101, 232 101, 232 101 L 232 101 C 230 101, 228 100, 226 99 L 226 99 L 226 99 L 226 99 C 226 99, 226 99, 226 99 L 226 99 C 225 99, 225 99, 225 99 L 225 99 C 225 99, 225 99, 225 99 L 225 99 C 225 99, 225 99, 225 99 L 225 99 C 225 99, 225 99, 225 99 L 225 99 C 224 98, 223 97, 223 97 L 223 97 C 221 94, 219 90, 219 86 L 219 86 C 219 81, 221 77, 223 74 L 223 74 C 225 73, 226 72, 228 71 L 228 71 C 230 71, 231 71, 232 71 L 232 71 C 236 71, 241 72, 246 75 L 246 75 C 248 76, 250 76, 252 75 L 252 75 C 252 74, 252 74, 252 74 L 252 74 C 253 74, 253 73, 254 72 L 254 0 L 254 0 C 113 0, 0 114, 0 255 L 76 255 L 76 255 C 76 255, 76 255, 76 255 L 76 255 C 76 256, 76 256, 77 256 L 77 256 C 78 258, 78 260, 77 262 L 77 262 C 74 267, 73 272, 73 275 L 73 275 C 73 276, 73 278, 73 279 L 73 279 C 74 281, 75 283, 76 284 L 76 284 C 79 286, 83 288, 88 288 L 88 288 C 92 288, 96 287, 99 285 L 99 285 C 99 284, 100 283, 101 283 L 101 283 C 101 283, 101 283, 101 283 L 101 283 C 101 283, 101 282, 101 282 L 101 282 C 101 282, 101 282, 101 282 L 101 282 C 101 282, 101 282, 101 282 L 101 282 C 101 282, 101 282, 101 281 L 101 281 L 101 281 L 101 281 C 102 280, 103 278, 103 276 L 103 276 C 103 275, 103 275, 103 275 L 103 275 C 103 271, 102 267, 99 262 L 99 262 C 98 260, 98 257, 100 256"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 723,
    "y": 487,
    "width": 230,
    "height": 10,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 230 3 L 0 3 L 0 0 L 230 0 L 230 3"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 331,
    "y": 487,
    "width": 230,
    "height": 10,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 230 3 L 0 3 L 0 0 L 230 0 L 230 3"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 316,
    "y": 477,
    "width": 24,
    "height": 24,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 24 12 L 24 12 C 24 19, 19 24, 12 24 L 12 24 C 5 24, 0 19, 0 12 L 0 12 C 0 5, 5 0, 12 0 L 12 0 C 19 0, 24 5, 24 12"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 940,
    "y": 477,
    "width": 24,
    "height": 24,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 24 12 L 24 12 C 24 19, 19 24, 12 24 L 12 24 C 5 24, 0 19, 0 12 L 0 12 C 0 5, 5 0, 12 0 L 12 0 C 19 0, 24 5, 24 12"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 737,
    "y": 445,
    "width": 72,
    "height": 72,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 14 59 L 25 44 L 30 51 L 30 51 C 30 52, 30 52, 31 52 L 31 52 C 31 52, 32 52, 32 52 L 37 47 L 45 59 L 14 59 Z M 49 60 L 49 60 L 49 60 C 49 60, 49 60, 49 60 L 39 44 L 39 44 L 39 44 C 39 43, 38 42, 38 42 L 38 42 C 37 42, 37 43, 36 43 L 31 48 L 26 40 L 26 40 C 26 40, 25 39, 25 39 L 25 39 C 24 39, 23 40, 23 40 L 23 40 L 10 60 L 10 60 L 10 60 C 10 60, 10 60, 10 60 L 10 60 C 10 61, 10 62, 11 62 L 47 62 L 47 62 C 48 62, 49 61, 49 60 L 49 60 C 49 60, 49 60, 49 60 Z M 56 65 L 56 65 C 56 67, 54 69, 52 69 L 6 69 L 6 69 C 5 69, 3 67, 3 65 L 3 20 L 3 20 C 3 18, 5 16, 6 16 L 52 16 L 52 16 C 54 16, 56 18, 56 20 L 56 65 Z M 52 13 L 6 13 L 6 13 C 3 13, 0 16, 0 20 L 0 65 L 0 65 C 0 69, 3 72, 6 72 L 52 72 L 52 72 C 56 72, 59 69, 59 65 L 59 20 L 59 20 C 59 16, 56 13, 52 13 Z M 65 0 L 20 0 L 20 0 C 16 0, 13 3, 13 7 L 13 8 L 13 8 C 13 9, 14 10, 15 10 L 15 10 C 16 10, 16 9, 16 8 L 16 7 L 16 7 C 16 5, 18 3, 20 3 L 65 3 L 65 3 C 67 3, 69 5, 69 7 L 69 52 L 69 52 C 69 54, 67 56, 65 56 L 64 56 L 64 56 C 63 56, 62 56, 62 57 L 62 57 C 62 58, 63 59, 64 59 L 65 59 L 65 59 C 69 59, 72 56, 72 52 L 72 7 L 72 7 C 72 3, 69 0, 65 0 L 16 26 L 16 26 C 18 26, 20 28, 20 29 L 20 29 C 20 31, 18 33, 16 33 L 16 33 C 14 33, 13 31, 13 29 L 13 29 C 13 28, 14 26, 16 26 L 65 0 Z M 16 36 L 16 36 C 20 36, 23 33, 23 29 L 23 29 C 23 26, 20 23, 16 23 L 16 23 C 13 23, 10 26, 10 29 L 10 29 C 10 33, 13 36, 16 36 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 469,
    "y": 445,
    "width": 72,
    "height": 72,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 49 39 L 49 39 C 47 39, 46 38, 46 36 L 46 36 C 46 34, 47 33, 49 33 L 49 33 C 51 33, 52 34, 52 36 L 52 36 C 52 38, 51 39, 49 39 Z M 60 34 L 55 34 L 55 34 C 55 32, 52 29, 49 29 L 49 29 C 46 29, 43 32, 43 34 L 11 34 L 11 34 C 10 34, 10 35, 10 36 L 10 36 C 10 37, 10 38, 11 38 L 43 38 L 43 38 C 43 40, 46 43, 49 43 L 49 43 C 52 43, 55 40, 55 38 L 60 38 L 60 38 C 61 38, 62 37, 62 36 L 62 36 C 62 35, 61 34, 60 34 Z M 26 21 L 26 21 C 24 21, 23 20, 23 18 L 23 18 C 23 16, 24 15, 26 15 L 26 15 C 28 15, 29 16, 29 18 L 29 18 C 29 20, 28 21, 26 21 Z M 60 16 L 32 16 L 32 16 C 32 14, 29 11, 26 11 L 26 11 C 23 11, 21 14, 20 16 L 11 16 L 11 16 C 10 16, 10 17, 10 18 L 10 18 C 10 19, 10 20, 11 20 L 20 20 L 20 20 C 21 22, 23 25, 26 25 L 26 25 C 29 25, 32 22, 32 20 L 60 20 L 60 20 C 61 20, 62 19, 62 18 L 62 18 C 62 17, 61 16, 60 16 Z M 69 65 L 69 65 C 69 67, 67 69, 65 69 L 6 69 L 6 69 C 5 69, 3 67, 3 65 L 3 7 L 3 7 C 3 5, 5 3, 6 3 L 65 3 L 65 3 C 67 3, 69 5, 69 7 L 69 65 Z M 65 0 L 6 0 L 6 0 C 3 0, 0 3, 0 7 L 0 65 L 0 65 C 0 69, 3 72, 6 72 L 65 72 L 65 72 C 69 72, 72 69, 72 65 L 72 7 L 72 7 C 72 3, 69 0, 65 0 Z M 33 57 L 33 57 C 31 57, 29 56, 29 54 L 29 54 C 29 52, 31 51, 33 51 L 33 51 C 34 51, 36 52, 36 54 L 36 54 C 36 56, 34 57, 33 57 Z M 60 52 L 39 52 L 39 52 C 38 50, 36 47, 33 47 L 33 47 C 30 47, 27 50, 26 52 L 11 52 L 11 52 C 10 52, 10 53, 10 54 L 10 54 C 10 55, 10 56, 11 56 L 26 56 L 26 56 C 27 58, 30 60, 33 60 L 33 60 C 36 60, 38 58, 39 56 L 60 56 L 60 56 C 61 56, 62 55, 62 54 L 62 54 C 62 53, 61 52, 60 52 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 459,
    "y": 213,
    "width": 72,
    "height": 72,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 61 54 L 31 54 L 31 54 C 30 54, 29 55, 29 56 L 29 56 C 29 56, 30 57, 31 57 L 61 57 L 61 57 C 61 57, 62 56, 62 56 L 62 56 C 62 55, 61 54, 61 54 Z M 61 34 L 31 34 L 31 34 C 30 34, 29 35, 29 36 L 29 36 C 29 37, 30 38, 31 38 L 61 38 L 61 38 C 61 38, 62 37, 62 36 L 62 36 C 62 35, 61 34, 61 34 Z M 69 65 L 69 65 C 69 67, 67 69, 65 69 L 6 69 L 6 69 C 5 69, 3 67, 3 65 L 3 7 L 3 7 C 3 5, 5 3, 6 3 L 65 3 L 65 3 C 67 3, 69 5, 69 7 L 69 65 Z M 65 0 L 6 0 L 6 0 C 3 0, 0 3, 0 7 L 0 65 L 0 65 C 0 69, 3 72, 6 72 L 65 72 L 65 72 C 69 72, 72 69, 72 65 L 72 7 L 72 7 C 72 3, 69 0, 65 0 Z M 61 15 L 31 15 L 31 15 C 30 15, 29 15, 29 16 L 29 16 C 29 17, 30 18, 31 18 L 61 18 L 61 18 C 61 18, 62 17, 62 16 L 62 16 C 62 15, 61 15, 61 15 Z M 16 10 L 15 15 L 10 15 L 14 18 L 12 23 L 16 20 L 21 23 L 19 18 L 23 15 L 18 15 L 16 10 Z M 18 54 L 16 49 L 15 54 L 10 54 L 14 57 L 12 62 L 16 59 L 21 62 L 19 57 L 23 54 L 18 54 Z M 16 29 L 15 34 L 10 34 L 14 37 L 12 43 L 16 39 L 21 43 L 19 37 L 23 34 L 18 34 L 16 29 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 736,
    "y": 214,
    "width": 72,
    "height": 72,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 69 29 L 3 29 L 3 23 L 69 23 L 69 29 Z M 62 69 L 10 69 L 10 33 L 62 33 L 62 69 Z M 13 3 L 39 3 L 39 11 L 39 11 C 39 12, 40 13, 41 13 L 49 13 L 49 20 L 13 20 L 13 3 Z M 42 5 L 47 10 L 42 10 L 42 5 Z M 59 7 L 59 20 L 52 20 L 52 10 L 49 7 L 59 7 Z M 69 20 L 62 20 L 62 7 L 62 7 C 62 5, 61 3, 59 3 L 46 3 L 42 0 L 13 0 L 13 0 C 11 0, 10 1, 10 3 L 10 20 L 3 20 L 3 20 C 1 20, 0 21, 0 23 L 0 29 L 0 29 C 0 31, 1 33, 3 33 L 7 33 L 7 69 L 7 69 C 7 70, 8 72, 10 72 L 62 72 L 62 72 C 64 72, 65 70, 65 69 L 65 33 L 69 33 L 69 33 C 70 33, 72 31, 72 29 L 72 23 L 72 23 C 72 21, 70 20, 69 20 Z M 26 43 L 46 43 L 46 46 L 26 46 L 26 43 Z M 26 49 L 46 49 L 46 49 C 48 49, 49 48, 49 46 L 49 43 L 49 43 C 49 41, 48 39, 46 39 L 26 39 L 26 39 C 24 39, 23 41, 23 43 L 23 46 L 23 46 C 23 48, 24 49, 26 49 Z"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 79,
    "y": 251,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-17",
    "x": 201,
    "y": 210,
    "width": 95,
    "height": 37,
    "text": "Identify"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 2,
    "x": 79,
    "y": 505,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-19",
    "x": 193,
    "y": 465,
    "width": 102,
    "height": 37,
    "text": "Improve"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 984,
    "y": 251,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-21",
    "x": 984,
    "y": 210,
    "width": 126,
    "height": 37,
    "text": "Innovation"
  },
  {
    "id": "sp-22",
    "x": 984,
    "y": 505,
    "width": 217,
    "height": 129,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-23",
    "x": 985,
    "y": 465,
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

export function Migso179Template({ data }: { data: BrainData }): ReactElement {
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
