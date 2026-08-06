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
    "x": 390,
    "y": 357,
    "width": 257,
    "height": 289,
    "fillColor": "#ffb900",
    "pathD": "M 254 240 L 254 240 C 252 239, 249 239, 247 240 L 247 240 C 241 243, 234 245, 230 245 L 230 245 C 230 245, 229 245, 229 245 L 229 245 C 226 244, 224 244, 222 243 L 222 243 C 222 243, 222 243, 222 242 L 222 242 C 222 242, 222 242, 221 242 L 221 242 C 221 242, 221 242, 221 242 L 221 242 C 221 242, 221 242, 221 242 L 221 242 C 221 242, 221 242, 220 242 L 220 242 C 220 241, 220 241, 220 241 L 220 241 C 219 241, 219 240, 218 239 L 218 239 C 215 236, 214 231, 214 226 L 214 226 C 214 219, 216 214, 219 211 L 219 211 C 220 209, 222 208, 225 207 L 225 207 C 227 207, 228 206, 230 206 L 230 206 C 234 206, 241 208, 247 212 L 247 212 C 249 213, 252 213, 254 211 L 254 211 C 254 211, 254 211, 255 211 L 255 211 C 255 210, 256 209, 257 209 L 257 167 L 146 167 L 146 167 C 133 167, 122 156, 122 143 L 122 42 L 76 42 L 76 42 L 76 42 C 75 41, 75 41, 75 41 L 75 41 C 75 41, 75 41, 75 40 L 75 40 C 73 38, 73 35, 74 33 L 74 33 C 78 27, 79 21, 79 16 L 79 16 C 79 15, 79 13, 79 11 L 79 11 C 78 9, 77 7, 75 5 L 75 5 C 72 2, 67 0, 60 0 L 60 0 C 55 0, 50 2, 47 4 L 47 4 C 46 5, 45 6, 45 7 L 45 7 C 45 7, 44 7, 44 7 L 44 7 C 44 7, 44 7, 44 7 L 44 7 C 44 7, 44 7, 44 7 L 44 7 C 44 8, 44 8, 44 8 L 44 8 C 44 8, 44 8, 43 8 L 43 8 C 43 8, 43 8, 43 8 L 43 8 C 42 10, 42 13, 41 15 L 41 15 C 41 16, 41 16, 41 16 L 41 16 C 41 21, 43 27, 46 33 L 46 33 C 47 35, 47 38, 46 41 L 46 41 C 45 41, 45 41, 45 42 L 0 42 L 0 241 L 0 241 C 0 267, 22 289, 48 289 L 256 289 L 257 242 L 257 242 C 256 242, 255 241, 254 240"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 604,
    "y": 395,
    "width": 286,
    "height": 250,
    "fillColor": "#52c49c",
    "pathD": "M 244 0 L 244 0 C 243 1, 242 1, 242 2 L 242 2 C 241 4, 240 7, 242 9 L 242 9 C 245 15, 246 22, 246 26 L 246 26 C 246 26, 246 27, 246 27 L 246 27 C 246 30, 245 32, 244 34 L 244 34 C 244 34, 244 34, 244 34 L 244 34 C 244 34, 244 35, 244 35 L 244 35 C 244 35, 244 35, 244 35 L 244 35 C 244 35, 244 35, 244 35 L 244 35 C 244 35, 243 36, 243 36 L 243 36 C 243 36, 243 36, 243 36 L 243 36 C 243 37, 242 37, 241 38 L 241 38 C 238 41, 233 42, 227 42 L 227 42 C 221 42, 216 41, 213 37 L 213 37 C 211 36, 210 34, 209 31 L 209 31 C 209 30, 208 28, 208 26 L 208 26 C 208 22, 210 16, 213 9 L 213 9 C 215 7, 214 4, 213 2 L 213 2 C 213 2, 213 2, 213 2 L 213 2 C 212 1, 212 0, 211 0 L 164 0 L 164 104 L 164 104 C 164 117, 153 128, 140 128 L 43 128 L 43 170 L 43 170 C 42 171, 42 171, 41 172 L 41 172 C 41 172, 41 172, 40 172 L 40 172 C 38 174, 35 174, 33 173 L 33 173 C 27 170, 21 168, 16 168 L 16 168 C 15 168, 13 168, 11 168 L 11 168 C 9 169, 7 171, 5 172 L 5 172 C 2 176, 0 181, 0 187 L 0 187 C 0 192, 2 197, 4 200 L 4 200 C 5 201, 6 202, 7 203 L 7 203 C 7 203, 7 203, 7 203 L 7 203 C 7 203, 7 203, 7 203 L 7 203 C 7 203, 7 203, 7 203 L 7 203 C 8 203, 8 203, 8 203 L 8 203 C 8 203, 8 203, 8 204 L 8 204 C 8 204, 8 204, 8 204 L 8 204 C 10 205, 13 206, 15 206 L 15 206 C 16 206, 16 206, 16 206 L 16 206 C 21 206, 27 204, 33 201 L 33 201 C 35 200, 38 200, 41 201 L 41 201 C 41 202, 42 203, 43 204 L 42 250 L 238 250 L 238 250 C 264 250, 286 228, 286 202 L 286 0 L 244 0"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 638,
    "y": 148,
    "width": 251,
    "height": 290,
    "fillColor": "#ff4d38",
    "pathD": "M 203 0 L 0 0 L 0 45 L 0 45 C 0 45, 0 45, 0 45 L 0 45 C 3 46, 5 47, 8 45 L 8 45 C 14 42, 20 41, 24 41 L 24 41 C 25 41, 25 41, 25 41 L 25 41 C 28 41, 31 41, 33 43 L 33 43 L 33 43 L 33 43 C 33 43, 33 43, 33 43 L 33 43 C 33 43, 33 43, 33 43 L 33 43 C 33 43, 34 43, 34 43 L 34 43 C 34 43, 34 44, 34 44 L 34 44 C 34 44, 34 44, 34 44 L 34 44 C 35 44, 36 45, 37 46 L 37 46 C 39 49, 41 54, 41 60 L 41 60 C 41 66, 39 71, 36 74 L 36 74 C 34 76, 32 77, 30 78 L 30 78 C 28 78, 26 79, 24 79 L 24 79 C 20 79, 14 77, 8 74 L 8 74 C 5 72, 3 73, 0 74 L 0 74 C 0 74, 0 74, 0 74 L 0 74 C 0 74, 0 74, 0 74 L 0 122 L 105 122 L 105 122 C 118 122, 129 133, 129 147 L 129 247 L 176 247 L 176 247 C 177 248, 177 248, 178 249 L 178 249 C 178 249, 178 249, 178 249 L 178 249 C 180 252, 180 254, 178 257 L 178 257 C 175 263, 173 269, 173 273 L 173 273 C 173 275, 174 277, 174 279 L 174 279 C 175 281, 176 283, 178 285 L 178 285 C 181 288, 186 290, 192 290 L 192 290 C 198 290, 203 288, 206 286 L 206 286 C 207 285, 208 284, 208 283 L 208 283 C 208 283, 208 283, 208 283 L 208 283 C 208 283, 209 283, 209 283 L 209 283 C 209 283, 209 283, 209 282 L 209 282 C 209 282, 209 282, 209 282 L 209 282 C 209 282, 209 282, 209 282 L 209 282 C 209 282, 209 282, 209 282 L 209 282 C 211 280, 211 277, 211 274 L 211 274 C 211 274, 211 274, 211 273 L 211 273 C 211 269, 210 263, 207 257 L 207 257 C 206 254, 206 252, 207 249 L 207 249 C 207 249, 208 248, 209 247 L 251 247 L 251 48 L 251 48 C 251 22, 229 0, 203 0"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 390,
    "y": 148,
    "width": 289,
    "height": 251,
    "fillColor": "#3365cc",
    "pathD": "M 248 74 L 248 74 C 248 74, 248 74, 249 74 L 249 74 C 251 73, 254 72, 256 74 L 256 74 C 262 77, 268 79, 273 79 L 273 79 C 274 79, 276 78, 278 78 L 278 78 C 280 77, 282 76, 284 74 L 284 74 C 287 71, 289 66, 289 60 L 289 60 C 289 54, 287 49, 285 46 L 285 46 C 284 45, 283 44, 282 44 L 282 44 C 282 44, 282 44, 282 44 L 282 44 C 282 44, 282 43, 282 43 L 282 43 C 282 43, 282 43, 282 43 L 282 43 C 281 43, 281 43, 281 43 L 281 43 C 281 43, 281 43, 281 43 L 281 43 L 281 43 L 281 43 C 279 41, 276 41, 273 41 L 273 41 C 273 41, 273 41, 273 41 L 273 41 C 268 41, 262 42, 256 45 L 256 45 C 253 47, 251 46, 248 45 L 248 45 C 248 45, 248 45, 248 45 L 248 0 L 248 0 L 48 0 L 48 0 C 22 0, 0 22, 0 48 L 0 251 L 45 251 L 45 251 C 45 250, 45 250, 46 250 L 46 250 C 47 247, 47 245, 46 242 L 46 242 C 43 236, 41 230, 41 225 L 41 225 C 41 225, 41 225, 41 224 L 41 224 C 41 222, 42 219, 43 217 L 43 217 C 43 217, 43 217, 43 217 L 43 217 C 44 217, 44 217, 44 217 L 44 217 C 44 217, 44 217, 44 216 L 44 216 C 44 216, 44 216, 44 216 L 44 216 C 44 216, 44 216, 44 216 L 44 216 C 44 216, 44 216, 45 216 L 45 216 C 45 215, 46 214, 47 213 L 47 213 C 50 211, 55 209, 60 209 L 60 209 C 66 209, 71 211, 75 214 L 75 214 C 77 216, 78 218, 79 220 L 79 220 C 79 222, 79 224, 79 225 L 79 225 C 79 230, 77 236, 74 242 L 74 242 C 73 244, 73 247, 75 249 L 75 249 C 75 250, 75 250, 75 250 L 75 250 C 75 250, 75 250, 76 251 L 122 251 L 122 146 L 122 146 C 122 133, 133 122, 146 122 L 248 122 L 248 122 L 248 74 L 248 74 C 248 74, 248 74, 248 74"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 421,
    "y": 552,
    "width": 68,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 65 59 L 3 59 L 3 40 L 22 40 L 22 40 C 22 46, 28 51, 34 51 L 34 51 C 40 51, 45 46, 46 40 L 65 40 L 65 59 Z M 68 38 L 68 38 L 52 7 L 52 7 L 52 7 C 52 7, 52 6, 51 6 L 49 6 L 49 6 C 49 6, 48 7, 48 8 L 48 8 C 48 9, 49 9, 49 9 L 50 9 L 64 37 L 45 37 L 45 37 C 44 37, 43 38, 43 39 L 43 39 C 43 44, 39 48, 34 48 L 34 48 C 29 48, 25 44, 25 39 L 25 39 C 25 38, 24 37, 23 37 L 4 37 L 18 9 L 19 9 L 19 9 C 19 9, 20 9, 20 8 L 20 8 C 20 7, 19 6, 19 6 L 17 6 L 17 6 C 16 6, 16 7, 16 7 L 16 7 L 0 38 L 0 38 L 0 38 C 0 38, 0 38, 0 39 L 0 60 L 0 60 C 0 61, 1 62, 2 62 L 66 62 L 66 62 C 67 62, 68 61, 68 60 L 68 39 L 68 39 C 68 38, 68 38, 68 38 Z M 25 12 L 25 12 C 25 12, 26 12, 26 12 L 32 5 L 32 36 L 32 36 C 32 36, 33 37, 34 37 L 34 37 C 35 37, 36 36, 36 36 L 36 5 L 42 12 L 42 12 C 42 12, 43 12, 43 12 L 43 12 C 44 12, 45 12, 45 11 L 45 11 C 45 10, 45 10, 44 10 L 35 0 L 35 0 C 35 0, 34 0, 34 0 L 34 0 C 34 0, 33 0, 33 0 L 24 10 L 24 10 C 23 10, 23 10, 23 11 L 23 11 C 23 12, 24 12, 25 12 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 796,
    "y": 546,
    "width": 62,
    "height": 68,
    "fillColor": "#ffffff",
    "pathD": "M 54 65 L 54 65 C 52 65, 50 63, 50 60 L 50 60 C 50 58, 52 56, 54 56 L 54 56 C 57 56, 59 58, 59 60 L 59 60 C 59 63, 57 65, 54 65 Z M 8 39 L 8 39 C 5 39, 3 36, 3 34 L 3 34 C 3 31, 5 29, 8 29 L 8 29 C 10 29, 12 31, 12 34 L 12 34 C 12 36, 10 39, 8 39 Z M 54 3 L 54 3 C 57 3, 59 5, 59 8 L 59 8 C 59 10, 57 12, 54 12 L 54 12 C 52 12, 50 10, 50 8 L 50 8 C 50 5, 52 3, 54 3 Z M 54 52 L 54 52 C 52 52, 50 54, 48 55 L 15 36 L 15 36 C 15 36, 15 35, 15 34 L 15 34 C 15 33, 15 32, 15 32 L 48 13 L 48 13 C 50 14, 52 15, 54 15 L 54 15 C 58 15, 62 12, 62 8 L 62 8 C 62 3, 58 0, 54 0 L 54 0 C 50 0, 46 3, 46 8 L 46 8 C 46 9, 47 9, 47 10 L 14 29 L 14 29 C 12 27, 10 26, 8 26 L 8 26 C 3 26, 0 30, 0 34 L 0 34 C 0 38, 3 42, 8 42 L 8 42 C 10 42, 12 41, 14 39 L 47 58 L 47 58 C 47 59, 46 59, 46 60 L 46 60 C 46 64, 50 68, 54 68 L 54 68 C 58 68, 62 64, 62 60 L 62 60 C 62 56, 58 52, 54 52 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 418,
    "y": 178,
    "width": 68,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 65 59 L 3 59 L 3 40 L 22 40 L 22 40 C 22 46, 28 51, 34 51 L 34 51 C 40 51, 45 46, 46 40 L 65 40 L 65 59 Z M 68 38 L 68 38 L 52 7 L 52 7 L 52 7 C 52 7, 52 6, 51 6 L 40 6 L 40 6 C 39 6, 39 7, 39 8 L 39 8 C 39 9, 39 9, 40 9 L 50 9 L 64 37 L 45 37 L 45 37 C 44 37, 43 38, 43 39 L 43 39 C 43 44, 39 48, 34 48 L 34 48 C 29 48, 25 44, 25 39 L 25 39 C 25 38, 24 37, 23 37 L 4 37 L 18 9 L 28 9 L 28 9 C 29 9, 29 9, 29 8 L 29 8 C 29 7, 29 6, 28 6 L 17 6 L 17 6 C 16 6, 16 7, 16 7 L 16 7 L 0 38 L 0 38 L 0 38 C 0 38, 0 38, 0 39 L 0 60 L 0 60 C 0 61, 1 62, 1 62 L 66 62 L 66 62 C 67 62, 68 61, 68 60 L 68 39 L 68 39 C 68 38, 68 38, 68 38 Z M 25 25 L 25 25 C 24 25, 23 25, 23 26 L 23 26 C 23 27, 23 27, 24 27 L 33 37 L 33 37 C 33 37, 34 37, 34 37 L 34 37 C 34 37, 35 37, 35 37 L 44 27 L 44 27 C 45 27, 45 27, 45 26 L 45 26 C 45 25, 44 25, 43 25 L 43 25 C 43 25, 42 25, 42 25 L 36 32 L 36 2 L 36 2 C 36 1, 35 0, 34 0 L 34 0 C 33 0, 32 1, 32 2 L 32 32 L 26 25 L 26 25 C 25 25, 25 25, 25 25 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 806,
    "y": 178,
    "width": 56,
    "height": 68,
    "fillColor": "#ffffff",
    "pathD": "M 28 15 L 28 15 C 14 15, 3 13, 3 9 L 3 9 C 3 6, 14 3, 28 3 L 28 3 C 42 3, 53 6, 53 9 L 53 9 C 53 13, 42 15, 28 15 Z M 53 22 L 53 22 C 53 25, 42 28, 28 28 L 28 28 C 14 28, 3 25, 3 22 L 3 13 L 3 13 C 8 16, 17 19, 28 19 L 28 19 C 39 19, 48 16, 53 13 L 53 22 Z M 28 34 L 28 34 C 14 34, 3 31, 3 28 L 3 28 C 3 27, 3 27, 4 26 L 4 26 C 9 29, 18 31, 28 31 L 28 31 C 38 31, 47 29, 52 26 L 52 26 C 53 27, 53 27, 53 28 L 53 28 C 53 31, 42 34, 28 34 Z M 53 40 L 53 40 C 53 44, 42 46, 28 46 L 28 46 C 14 46, 3 44, 3 40 L 3 32 L 3 32 C 8 35, 17 37, 28 37 L 28 37 C 39 37, 48 35, 53 32 L 53 40 Z M 28 52 L 28 52 C 14 52, 3 50, 3 46 L 3 46 C 3 46, 3 45, 4 45 L 4 45 C 9 48, 18 49, 28 49 L 28 49 C 38 49, 47 48, 52 45 L 52 45 C 53 45, 53 46, 53 46 L 53 46 C 53 50, 42 52, 28 52 Z M 53 59 L 53 59 C 53 62, 42 65, 28 65 L 28 65 C 14 65, 3 62, 3 59 L 3 51 L 3 51 C 8 54, 17 56, 28 56 L 28 56 C 39 56, 48 54, 53 51 L 53 59 Z M 56 9 L 56 9 C 56 4, 43 0, 28 0 L 28 0 C 13 0, 0 4, 0 9 L 0 22 L 0 22 C 0 23, 1 24, 2 25 L 2 25 C 1 26, 0 27, 0 28 L 0 40 L 0 40 C 0 41, 1 42, 2 43 L 2 43 C 1 44, 0 45, 0 46 L 0 59 L 0 59 C 0 64, 13 68, 28 68 L 28 68 C 43 68, 56 64, 56 59 L 56 46 L 56 46 C 56 45, 55 44, 54 43 L 54 43 C 55 42, 56 41, 56 40 L 56 28 L 56 28 C 56 27, 55 26, 54 25 L 54 25 C 55 24, 56 23, 56 22 L 56 9 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 304,
    "y": 176,
    "width": 89,
    "height": 19,
    "fillColor": "#3365cc",
    "pathD": "M 89 7 L 19 7 L 19 7 C 18 3, 14 0, 9 0 L 9 0 C 4 0, 0 4, 0 10 L 0 10 C 0 15, 4 19, 9 19 L 9 19 C 13 19, 17 16, 18 13 L 89 13 L 89 7"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 304,
    "y": 410,
    "width": 87,
    "height": 19,
    "fillColor": "#ffb900",
    "pathD": "M 87 7 L 19 7 L 19 7 C 18 3, 14 0, 9 0 L 9 0 C 4 0, 0 4, 0 9 L 0 9 C 0 15, 4 19, 9 19 L 9 19 C 13 19, 17 16, 18 13 L 87 13 L 87 7"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 887,
    "y": 178,
    "width": 90,
    "height": 19,
    "fillColor": "#ff4d38",
    "pathD": "M 0 11 L 72 11 L 72 11 C 72 16, 76 19, 81 19 L 81 19 C 86 19, 90 15, 90 9 L 90 9 C 90 4, 86 0, 81 0 L 81 0 C 77 0, 73 3, 72 6 L 0 6 L 0 11"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 889,
    "y": 411,
    "width": 88,
    "height": 19,
    "fillColor": "#52c49c",
    "pathD": "M 0 11 L 70 11 L 70 11 C 70 16, 74 19, 79 19 L 79 19 C 84 19, 88 15, 88 9 L 88 9 C 88 4, 84 0, 79 0 L 79 0 C 75 0, 71 3, 70 6 L 0 6 L 0 11"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 75,
    "y": 170,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-13",
    "x": 190,
    "y": 131,
    "width": 102,
    "height": 37,
    "text": "Improve",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 75,
    "y": 425,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-15",
    "x": 197,
    "y": 386,
    "width": 95,
    "height": 37,
    "text": "Identify",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 988,
    "y": 171,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-17",
    "x": 988,
    "y": 131,
    "width": 126,
    "height": 37,
    "text": "Innovation",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 988,
    "y": 425,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-19",
    "x": 988,
    "y": 385,
    "width": 149,
    "height": 37,
    "text": "Management",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 0,
    "x": 552,
    "y": 153,
    "width": 62,
    "height": 107,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 60
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 799,
    "y": 276,
    "width": 62,
    "height": 107,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 60
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 2,
    "x": 424,
    "y": 398,
    "width": 62,
    "height": 107,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 60
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 666,
    "y": 529,
    "width": 62,
    "height": 107,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 60
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

export function Imported2025migsopcubedcreativeandexampletemplates183Template({ data }: { data: BrainData }): ReactElement {
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
