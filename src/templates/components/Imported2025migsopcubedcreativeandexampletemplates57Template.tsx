import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 584,
    "y": 148,
    "width": 268,
    "height": 208,
    "fillColor": "#52c49c",
    "pathD": "M 56 0 C 131 0, 197 34, 241 87 L 245 92 L 268 75 L 232 208 L 95 201 L 120 183 L 117 179 C 101 163, 80 154, 56 154 C 53 154, 50 154, 47 154 L 45 155 L 81 60 L 0 7 L 11 4 C 25 1, 40 0, 56 0 Z"
  },
  {
    "id": "sp-1",
    "x": 401,
    "y": 132,
    "width": 264,
    "height": 240,
    "fillColor": "#ff4d38",
    "pathD": "M 149 0 L 264 75 L 215 204 L 206 176 L 205 176 C 181 187, 162 209, 155 235 L 154 240 L 76 177 L 0 237 L 1 225 C 13 135, 74 60, 156 30 L 159 29 Z"
  },
  {
    "id": "sp-2",
    "x": 689,
    "y": 259,
    "width": 191,
    "height": 288,
    "fillColor": "#ffb900",
    "pathD": "M 153 0 L 159 9 C 179 45, 191 85, 191 129 C 191 179, 176 225, 150 263 L 149 264 L 173 281 L 36 288 L 0 155 L 25 174 L 27 170 C 34 158, 37 144, 37 129 C 37 118, 35 107, 31 97 L 29 92 L 127 97 Z"
  },
  {
    "id": "sp-3",
    "x": 369,
    "y": 309,
    "width": 232,
    "height": 302,
    "fillColor": "#3365cc",
    "pathD": "M 107 0 L 215 86 L 185 86 L 185 88 C 188 116, 204 140, 227 154 L 232 156 L 147 211 L 182 302 L 172 298 C 92 262, 36 184, 31 92 L 31 86 L 0 86 Z"
  },
  {
    "id": "sp-4",
    "x": 516,
    "y": 445,
    "width": 308,
    "height": 204,
    "fillColor": "#ee6d90",
    "pathD": "M 115 0 L 106 28 L 106 28 C 112 29, 118 30, 124 30 C 145 30, 164 22, 179 10 L 183 6 L 209 102 L 308 97 L 301 106 C 257 154, 194 184, 124 184 C 103 184, 83 181, 64 176 L 58 175 L 49 204 L 0 75 Z"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 569,
    "y": 195,
    "width": 64,
    "height": 58,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 3,
    "x": 747,
    "y": 278,
    "width": 64,
    "height": 58,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 5,
    "x": 727,
    "y": 465,
    "width": 64,
    "height": 58,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 6,
    "x": 542,
    "y": 509,
    "width": 64,
    "height": 58,
    "text": "5",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 4,
    "x": 446,
    "y": 336,
    "width": 64,
    "height": 58,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 774,
    "y": 392,
    "width": 56,
    "height": 45,
    "fillColor": "#ffffff",
    "pathD": "M 28 18 C 25 18, 23 20, 23 22 C 23 25, 25 27, 28 27 C 31 27, 33 25, 33 22 C 33 22, 33 22, 33 22 C 33 22, 32 22, 32 22 C 30 22, 29 20, 29 18 C 29 18, 29 18, 29 18 C 28 18, 28 18, 28 18 Z M 32 16 C 31 16, 30 17, 30 18 C 30 19, 31 20, 32 20 C 34 20, 34 19, 34 18 C 34 17, 34 16, 32 16 Z M 32 14 C 34 14, 36 16, 36 18 C 36 19, 35 20, 34 21 C 34 21, 34 22, 34 22 C 34 26, 32 29, 28 29 C 24 29, 21 26, 21 22 C 21 19, 24 16, 28 16 C 28 16, 29 16, 29 16 C 30 15, 31 14, 32 14 Z M 28 8 C 24 8, 21 10, 19 12 L 21 14 C 21 15, 21 15, 21 16 C 21 16, 21 16, 20 16 C 20 16, 20 16, 20 16 L 17 13 C 15 16, 14 18, 14 22 L 18 22 C 18 22, 18 22, 18 22 C 18 23, 18 23, 18 23 L 14 23 C 14 27, 15 29, 17 32 L 20 29 C 20 29, 21 29, 21 29 C 21 30, 21 30, 21 31 L 19 33 C 21 35, 24 36, 27 36 L 27 33 C 27 32, 27 32, 28 32 C 28 32, 29 32, 29 33 L 29 36 C 32 36, 35 35, 37 33 L 34 31 C 34 30, 34 30, 34 29 C 35 29, 35 29, 36 29 L 38 32 C 40 29, 41 26, 41 22 C 41 15, 35 8, 28 8 Z M 28 7 C 36 7, 43 14, 43 22 C 43 31, 36 38, 28 38 C 19 38, 12 31, 12 22 C 12 14, 19 7, 28 7 Z M 2 2 L 2 14 C 2 30, 14 43, 30 43 L 54 43 L 54 30 C 54 15, 41 2, 26 2 L 2 2 Z M 1 0 L 26 0 C 42 0, 56 14, 56 30 L 56 44 C 56 45, 56 45, 55 45 L 30 45 C 14 45, 0 31, 0 14 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 2,
    "x": 500,
    "y": 243,
    "width": 56,
    "height": 56,
    "fillColor": "#ffffff",
    "pathD": "M 19 49 L 19 54 L 37 54 L 37 49 L 19 49 Z M 2 42 L 2 45 C 2 46, 3 48, 4 48 L 52 48 C 53 48, 54 46, 54 45 L 54 42 L 2 42 Z M 47 27 L 47 34 L 54 34 L 54 27 L 47 27 Z M 30 23 L 22 34 L 38 34 L 30 23 Z M 47 17 L 47 25 L 54 25 L 54 17 L 47 17 Z M 15 17 L 8 27 L 8 34 L 20 34 L 23 29 L 15 17 Z M 27 13 C 26 13, 25 14, 25 15 C 25 16, 26 17, 27 17 C 28 17, 29 16, 29 15 C 29 14, 28 13, 27 13 Z M 27 11 C 29 11, 31 13, 31 15 C 31 17, 29 19, 27 19 C 25 19, 23 17, 23 15 C 23 13, 25 11, 27 11 Z M 47 8 L 47 16 L 54 16 L 54 8 L 47 8 Z M 8 8 L 8 24 L 14 15 C 15 15, 15 15, 16 15 L 24 28 L 29 21 C 30 20, 30 20, 31 21 L 38 32 L 38 8 L 8 8 Z M 8 7 L 39 7 C 40 7, 40 7, 40 8 L 40 35 C 40 35, 40 35, 39 35 L 8 35 C 7 35, 7 35, 7 35 L 7 8 C 7 7, 7 7, 8 7 Z M 4 2 C 3 2, 2 3, 2 4 L 2 41 L 54 41 L 54 36 L 46 36 C 46 36, 45 35, 45 35 L 45 8 C 45 7, 46 7, 46 7 L 54 7 L 54 4 C 54 3, 53 2, 52 2 L 4 2 Z M 4 0 L 52 0 C 54 0, 56 2, 56 4 L 56 45 C 56 47, 54 49, 52 49 L 39 49 L 39 54 L 45 54 C 45 54, 46 55, 46 55 C 46 56, 45 56, 45 56 L 11 56 C 11 56, 10 56, 10 55 C 10 55, 11 54, 11 54 L 17 54 L 17 49 L 4 49 C 2 49, 0 47, 0 45 L 0 4 C 0 2, 2 0, 4 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 464,
    "y": 430,
    "width": 56,
    "height": 48,
    "fillColor": "#ffffff",
    "pathD": "M 40 39 L 32 46 L 51 46 C 53 46, 54 45, 54 43 C 54 41, 53 39, 51 39 L 40 39 Z M 31 39 L 23 46 L 30 46 L 37 39 L 31 39 Z M 22 39 L 14 46 L 21 46 L 28 39 L 22 39 Z M 13 39 L 5 46 C 5 46, 5 46, 5 46 L 12 46 L 19 39 L 13 39 Z M 5 39 C 3 39, 2 41, 2 43 C 2 44, 2 45, 3 46 L 10 39 L 5 39 Z M 5 37 L 51 37 C 54 37, 56 40, 56 43 C 56 46, 54 48, 51 48 L 5 48 C 2 48, 0 46, 0 43 C 0 40, 2 37, 5 37 Z M 44 21 C 43 21, 42 22, 42 23 C 42 24, 43 25, 44 25 C 45 25, 46 24, 46 23 C 46 22, 45 21, 44 21 Z M 44 19 C 46 19, 48 21, 48 23 C 48 25, 46 26, 44 26 C 42 26, 41 25, 41 23 C 41 21, 42 19, 44 19 Z M 44 13 L 43 16 C 43 17, 43 17, 43 17 C 42 17, 42 17, 42 17 C 42 17, 41 17, 41 17 L 39 16 C 38 16, 38 16, 37 17 L 39 19 C 39 19, 39 20, 39 20 C 39 20, 39 21, 39 21 C 39 21, 38 21, 38 21 L 35 22 C 35 22, 35 23, 35 23 C 35 23, 35 23, 35 24 L 38 24 C 38 24, 39 25, 39 25 C 39 25, 39 25, 39 26 C 39 26, 39 26, 39 26 L 37 29 C 38 29, 38 30, 39 30 L 41 28 C 41 28, 42 28, 42 28 C 42 28, 42 29, 43 29 C 43 29, 43 29, 43 29 L 44 32 C 44 32, 45 32, 46 32 L 46 29 C 46 29, 46 29, 47 29 C 47 29, 47 28, 47 28 C 48 28, 48 28, 48 28 L 51 30 C 51 30, 51 29, 52 29 L 50 26 C 50 26, 50 26, 50 26 C 50 25, 50 25, 50 25 C 51 25, 51 24, 51 24 L 54 24 C 54 23, 54 23, 54 23 C 54 23, 54 22, 54 22 L 51 21 C 51 21, 51 21, 50 21 C 50 21, 50 20, 50 20 C 50 20, 50 19, 50 19 L 52 17 C 51 16, 51 16, 51 16 L 48 17 C 48 17, 48 17, 47 17 C 47 17, 47 17, 47 17 C 46 17, 46 17, 46 16 L 46 13 C 45 13, 44 13, 44 13 Z M 43 12 C 44 12, 45 12, 46 12 C 47 12, 47 12, 47 12 L 48 16 C 48 16, 48 16, 48 16 L 50 14 C 50 14, 51 14, 51 14 C 52 14, 53 15, 54 16 C 54 17, 54 17, 54 17 L 52 20 C 52 20, 52 20, 52 20 L 55 20 C 55 20, 55 21, 56 21 C 56 22, 56 22, 56 23 C 56 23, 56 24, 56 25 C 55 25, 55 25, 55 25 L 52 26 L 54 28 C 54 29, 54 29, 54 29 C 53 30, 52 31, 51 32 C 51 32, 50 32, 50 32 L 48 30 C 48 30, 48 30, 48 30 L 47 33 C 47 34, 47 34, 46 34 C 46 34, 45 34, 45 34 C 44 34, 43 34, 43 34 C 42 34, 42 34, 42 33 L 42 30 C 42 30, 42 30, 42 30 L 39 32 C 39 32, 38 32, 38 32 C 37 31, 36 30, 35 29 C 35 29, 35 29, 35 28 L 37 26 C 37 26, 37 26, 37 26 L 34 25 C 34 25, 34 25, 34 25 C 33 24, 33 23, 33 23 C 33 22, 33 22, 34 21 C 34 21, 34 20, 34 20 L 37 20 C 37 20, 37 20, 37 20 L 35 17 C 35 17, 35 17, 35 16 C 36 15, 37 14, 38 14 C 38 14, 39 14, 39 14 L 42 16 L 42 16 L 42 12 C 42 12, 42 12, 43 12 Z M 17 10 C 13 10, 10 13, 10 16 C 10 20, 13 23, 17 23 C 20 23, 23 20, 23 16 C 23 13, 20 10, 17 10 Z M 17 8 C 21 8, 25 12, 25 16 C 25 21, 21 25, 17 25 C 12 25, 8 21, 8 16 C 8 12, 12 8, 17 8 Z M 44 6 C 48 6, 52 8, 55 10 C 56 11, 56 11, 55 12 C 55 12, 55 12, 55 12 C 55 12, 54 12, 54 12 C 51 9, 48 8, 44 8 C 42 8, 40 8, 39 9 C 38 9, 38 9, 38 9 C 37 8, 38 8, 38 8 C 40 7, 42 6, 44 6 Z M 18 2 L 15 2 L 15 4 C 15 4, 15 4, 15 5 C 14 5, 13 5, 12 5 C 12 5, 11 5, 11 5 L 10 3 L 8 4 L 9 6 C 9 6, 9 7, 9 7 C 8 8, 8 8, 7 9 C 7 9, 6 9, 6 9 L 4 8 L 3 10 L 5 11 C 5 11, 5 12, 5 12 C 5 13, 5 14, 5 15 C 5 15, 4 15, 4 15 L 2 15 L 2 18 L 4 17 C 4 17, 5 18, 5 18 C 5 19, 5 20, 5 21 C 5 21, 5 22, 5 22 L 3 23 L 4 25 L 6 24 C 6 23, 7 24, 7 24 C 8 25, 8 25, 9 26 C 9 26, 9 26, 9 27 L 8 29 L 10 30 L 11 28 C 11 28, 12 28, 12 28 C 12 28, 12 28, 12 28 C 13 28, 14 28, 15 28 C 15 28, 15 29, 15 29 L 15 31 L 18 31 L 18 29 C 18 29, 18 28, 18 28 C 19 28, 20 28, 21 28 C 21 27, 22 28, 22 28 L 23 30 L 25 29 L 24 27 C 24 26, 24 26, 24 26 C 25 25, 25 25, 26 24 C 26 24, 27 23, 27 24 L 29 25 L 30 23 L 28 22 C 28 22, 28 21, 28 21 C 28 20, 28 19, 28 18 C 29 18, 29 17, 29 17 L 31 17 L 31 15 L 29 15 C 29 15, 29 15, 28 15 C 28 14, 28 13, 28 12 C 28 12, 28 11, 28 11 L 30 10 L 29 8 L 27 9 C 27 9, 26 9, 26 9 C 25 8, 25 8, 24 7 C 24 7, 24 6, 24 6 L 25 4 L 23 3 L 22 5 C 22 5, 21 5, 21 5 C 20 5, 19 5, 18 5 C 18 4, 18 4, 18 4 L 18 2 Z M 44 1 C 46 1, 48 1, 50 1 C 50 1, 50 2, 50 2 C 50 3, 50 3, 49 3 C 48 2, 46 2, 44 2 C 41 2, 37 3, 34 5 C 33 5, 33 5, 33 5 C 33 5, 33 5, 32 5 C 32 5, 32 4, 33 4 C 36 2, 40 1, 44 1 Z M 15 0 L 18 0 C 19 0, 19 1, 19 2 L 19 3 C 20 3, 20 3, 21 3 L 22 2 C 22 1, 23 1, 24 2 L 26 3 C 26 3, 26 3, 27 4 C 27 4, 27 5, 26 5 L 26 6 C 26 6, 26 7, 27 7 L 28 7 C 28 6, 29 6, 29 6 C 30 6, 30 7, 30 7 L 31 9 C 32 10, 32 10, 32 10 C 31 11, 31 11, 31 11 L 30 12 C 30 13, 30 13, 30 14 L 31 14 C 32 14, 33 14, 33 15 L 33 18 C 33 18, 32 19, 31 19 L 30 19 C 30 20, 30 20, 30 21 L 31 21 C 31 22, 31 22, 32 22 C 32 23, 32 23, 31 24 L 30 26 C 30 26, 30 26, 29 26 C 29 26, 28 26, 28 26 L 27 25 C 26 26, 26 26, 26 27 L 26 28 C 27 28, 27 29, 27 29 C 26 29, 26 30, 26 30 L 24 31 C 23 32, 22 31, 22 31 L 21 29 C 20 30, 20 30, 19 30 L 19 31 C 19 32, 19 33, 18 33 L 15 33 C 14 33, 14 32, 14 31 L 14 30 C 13 30, 13 30, 12 29 L 12 31 C 11 31, 10 32, 9 31 L 7 30 C 7 30, 7 29, 6 29 C 6 29, 6 28, 7 28 L 7 27 C 7 26, 7 26, 6 25 L 5 26 C 4 27, 3 26, 3 26 L 2 24 C 1 23, 1 23, 1 22 C 2 22, 2 22, 2 21 L 3 21 C 3 20, 3 20, 3 19 L 2 19 C 1 19, 0 18, 0 18 L 0 15 C 0 14, 1 14, 2 14 L 3 14 C 3 13, 3 13, 3 12 L 2 11 C 2 11, 2 11, 1 10 C 1 10, 1 10, 2 9 L 3 7 C 3 6, 4 6, 5 7 L 6 7 C 7 7, 7 6, 7 6 L 7 5 C 6 5, 6 4, 6 4 C 7 3, 7 3, 7 3 L 9 2 C 10 1, 11 1, 12 2 L 12 3 C 13 3, 13 3, 14 3 L 14 2 C 14 1, 14 0, 15 0 Z"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 7,
    "x": 637,
    "y": 522,
    "width": 56,
    "height": 56,
    "fillColor": "#ffffff",
    "pathD": "M 39 48 L 49 48 C 49 48, 50 49, 50 49 C 50 50, 49 50, 49 50 L 39 50 C 38 50, 38 50, 38 49 C 38 49, 38 48, 39 48 Z M 34 46 C 35 46, 35 47, 35 47 L 35 52 C 35 52, 35 52, 34 52 C 34 52, 33 52, 33 52 L 33 50 L 6 50 C 6 50, 6 50, 6 49 C 6 49, 6 48, 6 48 L 33 48 L 33 47 C 33 47, 34 46, 34 46 Z M 25 19 L 25 32 L 35 26 L 25 19 Z M 23 16 C 24 16, 24 16, 24 16 L 37 25 C 37 25, 37 25, 37 26 C 37 26, 37 26, 37 26 L 24 35 C 24 35, 24 35, 24 35 C 24 35, 24 35, 23 35 C 23 35, 23 34, 23 34 L 23 17 C 23 17, 23 17, 23 16 Z M 28 11 C 19 11, 13 17, 13 26 C 13 34, 19 41, 28 41 C 36 41, 43 34, 43 26 C 43 17, 36 11, 28 11 Z M 28 9 C 37 9, 44 16, 44 26 C 44 35, 37 42, 28 42 C 19 42, 11 35, 11 26 C 11 16, 19 9, 28 9 Z M 4 2 C 3 2, 2 3, 2 4 L 2 52 C 2 53, 3 54, 4 54 L 52 54 C 53 54, 54 53, 54 52 L 54 4 C 54 3, 53 2, 52 2 L 4 2 Z M 4 0 L 52 0 C 54 0, 56 2, 56 4 L 56 52 C 56 54, 54 56, 52 56 L 4 56 C 2 56, 0 54, 0 52 L 0 4 C 0 2, 2 0, 4 0 Z"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 690,
    "y": 208,
    "width": 56,
    "height": 56,
    "fillColor": "#ffffff",
    "pathD": "M 24 51 L 32 51 C 32 51, 33 51, 33 51 C 33 52, 32 52, 32 52 L 24 52 C 23 52, 23 52, 23 51 C 23 51, 23 51, 24 51 Z M 2 49 L 2 52 C 2 53, 3 54, 4 54 L 52 54 C 53 54, 54 53, 54 52 L 54 49 L 2 49 Z M 50 44 C 50 44, 50 44, 50 45 C 50 45, 50 46, 50 46 C 49 46, 49 45, 49 45 C 49 44, 49 44, 50 44 Z M 45 44 C 46 44, 46 44, 46 45 C 46 45, 46 46, 45 46 C 45 46, 44 45, 44 45 C 44 44, 45 44, 45 44 Z M 41 44 C 41 44, 42 44, 42 45 C 42 45, 41 46, 41 46 C 40 46, 40 45, 40 45 C 40 44, 40 44, 41 44 Z M 36 44 C 37 44, 37 44, 37 45 C 37 45, 37 46, 36 46 C 36 46, 36 45, 36 45 C 36 44, 36 44, 36 44 Z M 32 44 C 33 44, 33 44, 33 45 C 33 45, 33 46, 32 46 C 32 46, 31 45, 31 45 C 31 44, 32 44, 32 44 Z M 28 44 C 28 44, 29 44, 29 45 C 29 45, 28 46, 28 46 C 27 46, 27 45, 27 45 C 27 44, 27 44, 28 44 Z M 24 44 C 24 44, 24 44, 24 45 C 24 45, 24 46, 24 46 C 23 46, 23 45, 23 45 C 23 44, 23 44, 24 44 Z M 19 44 C 20 44, 20 44, 20 45 C 20 45, 20 46, 19 46 C 19 46, 18 45, 18 45 C 18 44, 19 44, 19 44 Z M 15 44 C 15 44, 16 44, 16 45 C 16 45, 15 46, 15 46 C 15 46, 14 45, 14 45 C 14 44, 15 44, 15 44 Z M 10 44 C 11 44, 11 44, 11 45 C 11 45, 11 46, 10 46 C 10 46, 9 45, 9 45 C 9 44, 10 44, 10 44 Z M 6 44 C 7 44, 7 44, 7 45 C 7 45, 7 46, 6 46 C 6 46, 5 45, 5 45 C 5 44, 6 44, 6 44 Z M 48 40 C 49 40, 49 41, 49 41 C 49 42, 49 42, 48 42 C 48 42, 47 42, 47 41 C 47 41, 48 40, 48 40 Z M 44 40 C 44 40, 45 41, 45 41 C 45 42, 44 42, 44 42 C 43 42, 43 42, 43 41 C 43 41, 43 40, 44 40 Z M 39 40 C 40 40, 40 41, 40 41 C 40 42, 40 42, 39 42 C 39 42, 38 42, 38 41 C 38 41, 39 40, 39 40 Z M 35 40 C 35 40, 35 41, 35 41 C 35 42, 35 42, 35 42 C 34 42, 34 42, 34 41 C 34 41, 34 40, 35 40 Z M 30 40 C 31 40, 31 41, 31 41 C 31 42, 31 42, 30 42 C 29 42, 29 42, 29 41 C 29 41, 29 40, 30 40 Z M 26 40 C 26 40, 27 41, 27 41 C 27 42, 26 42, 26 42 C 25 42, 25 42, 25 41 C 25 41, 25 40, 26 40 Z M 21 40 C 22 40, 22 41, 22 41 C 22 42, 22 42, 21 42 C 21 42, 20 42, 20 41 C 20 41, 21 40, 21 40 Z M 17 40 C 17 40, 17 41, 17 41 C 17 42, 17 42, 17 42 C 16 42, 16 42, 16 41 C 16 41, 16 40, 17 40 Z M 12 40 C 12 40, 13 41, 13 41 C 13 42, 12 42, 12 42 C 11 42, 11 42, 11 41 C 11 41, 11 40, 12 40 Z M 7 40 C 8 40, 8 41, 8 41 C 8 42, 8 42, 7 42 C 7 42, 6 42, 6 41 C 6 41, 7 40, 7 40 Z M 47 37 C 47 37, 48 37, 48 38 C 48 38, 47 39, 47 39 C 47 39, 46 38, 46 38 C 46 37, 47 37, 47 37 Z M 43 37 C 43 37, 44 37, 44 38 C 44 38, 43 39, 43 39 C 42 39, 42 38, 42 38 C 42 37, 42 37, 43 37 Z M 39 37 C 39 37, 39 37, 39 38 C 39 38, 39 39, 39 39 C 38 39, 38 38, 38 38 C 38 37, 38 37, 39 37 Z M 34 37 C 35 37, 35 37, 35 38 C 35 38, 35 39, 34 39 C 34 39, 33 38, 33 38 C 33 37, 34 37, 34 37 Z M 30 37 C 30 37, 31 37, 31 38 C 31 38, 30 39, 30 39 C 29 39, 29 38, 29 38 C 29 37, 29 37, 30 37 Z M 26 37 C 26 37, 27 37, 27 38 C 27 38, 26 39, 26 39 C 25 39, 25 38, 25 38 C 25 37, 25 37, 26 37 Z M 21 37 C 22 37, 22 37, 22 38 C 22 38, 22 39, 21 39 C 21 39, 21 38, 21 38 C 21 37, 21 37, 21 37 Z M 17 37 C 18 37, 18 37, 18 38 C 18 38, 18 39, 17 39 C 17 39, 16 38, 16 38 C 16 37, 17 37, 17 37 Z M 13 37 C 13 37, 14 37, 14 38 C 14 38, 13 39, 13 39 C 12 39, 12 38, 12 38 C 12 37, 12 37, 13 37 Z M 9 37 C 9 37, 9 37, 9 38 C 9 38, 9 39, 9 39 C 8 39, 8 38, 8 38 C 8 37, 8 37, 9 37 Z M 6 36 L 2 48 L 54 48 L 50 36 L 6 36 Z M 24 28 L 37 28 C 38 28, 38 29, 38 29 C 38 30, 38 30, 37 30 L 24 30 C 23 30, 23 30, 23 29 C 23 29, 23 28, 24 28 Z M 11 28 L 19 28 C 20 28, 20 29, 20 29 C 20 30, 20 30, 19 30 L 11 30 C 11 30, 10 30, 10 29 C 10 29, 11 28, 11 28 Z M 37 22 L 45 22 C 45 22, 46 23, 46 23 C 46 24, 45 24, 45 24 L 37 24 C 36 24, 36 24, 36 23 C 36 23, 36 22, 37 22 Z M 27 22 L 32 22 C 33 22, 33 23, 33 23 C 33 24, 33 24, 32 24 L 27 24 C 26 24, 26 24, 26 23 C 26 23, 26 22, 27 22 Z M 40 17 L 45 17 C 45 17, 46 17, 46 18 C 46 18, 45 19, 45 19 L 40 19 C 40 19, 39 18, 39 18 C 39 17, 40 17, 40 17 Z M 27 17 L 36 17 C 36 17, 36 17, 36 18 C 36 18, 36 19, 36 19 L 27 19 C 26 19, 26 18, 26 18 C 26 17, 26 17, 27 17 Z M 12 13 L 12 22 L 22 22 L 22 13 L 12 13 Z M 37 11 L 45 11 C 45 11, 46 11, 46 12 C 46 12, 45 13, 45 13 L 37 13 C 36 13, 36 12, 36 12 C 36 11, 36 11, 37 11 Z M 27 11 L 32 11 C 33 11, 33 11, 33 12 C 33 12, 33 13, 32 13 L 27 13 C 26 13, 26 12, 26 12 C 26 11, 26 11, 27 11 Z M 11 11 L 22 11 C 23 11, 23 11, 23 12 L 23 23 C 23 24, 23 24, 22 24 L 11 24 C 11 24, 10 24, 10 23 L 10 12 C 10 11, 11 11, 11 11 Z M 20 6 L 36 6 C 36 6, 36 6, 36 6 C 36 7, 36 7, 36 7 L 20 7 C 19 7, 19 7, 19 6 C 19 6, 19 6, 20 6 Z M 9 2 C 7 2, 6 3, 6 4 L 6 34 L 50 34 L 50 4 C 50 3, 49 2, 47 2 L 9 2 Z M 9 0 L 47 0 C 50 0, 52 2, 52 4 L 52 35 L 56 48 C 56 48, 56 48, 56 48 L 56 52 C 56 54, 54 56, 52 56 L 4 56 C 2 56, 0 54, 0 52 L 0 48 C 0 48, 0 48, 0 48 L 5 35 L 5 4 C 5 2, 6 0, 9 0 Z"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 0,
    "x": 884,
    "y": 127,
    "width": 141,
    "height": 36,
    "text": "Your title 3",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 884,
    "y": 168,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 4,
    "x": 884,
    "y": 542,
    "width": 141,
    "height": 36,
    "text": "Your title 5",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 4,
    "x": 884,
    "y": 582,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 2,
    "x": 926,
    "y": 334,
    "width": 141,
    "height": 36,
    "text": "Your title 4",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 2,
    "x": 926,
    "y": 375,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 213,
    "y": 231,
    "width": 141,
    "height": 36,
    "text": "Your title 2",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 1,
    "x": 80,
    "y": 272,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 213,
    "y": 438,
    "width": 141,
    "height": 36,
    "text": "Your title 1",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 3,
    "x": 80,
    "y": 479,
    "width": 274,
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

export function Imported2025migsopcubedcreativeandexampletemplates57Template({ data }: { data: BrainData }): ReactElement {
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
