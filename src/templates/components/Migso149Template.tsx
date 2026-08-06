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
    "x": 114,
    "y": 248,
    "width": 156,
    "height": 194,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 0 49 L 94 49 L 94 0 L 156 97 L 94 194 L 94 146 L 0 146 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 338,
    "y": 248,
    "width": 156,
    "height": 194,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 49 L 94 49 L 94 0 L 156 97 L 94 194 L 94 146 L 0 146 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 562,
    "y": 248,
    "width": 156,
    "height": 194,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 49 L 94 49 L 94 0 L 156 97 L 94 194 L 94 146 L 0 146 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 785,
    "y": 248,
    "width": 156,
    "height": 194,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 49 L 94 49 L 94 0 L 156 97 L 94 194 L 94 146 L 0 146 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1009,
    "y": 248,
    "width": 156,
    "height": 194,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 0 49 L 94 49 L 94 0 L 156 97 L 94 194 L 94 146 L 0 146 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 444,
    "y": 222,
    "width": 156,
    "height": 29,
    "strokeColor": "#ffffff",
    "text": "",
    "pathD": "M 0 27 C 54 -10, 106 -9, 156 29"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 659,
    "y": 222,
    "width": 156,
    "height": 29,
    "strokeColor": "#ffffff",
    "text": "",
    "pathD": "M 0 27 C 54 -10, 106 -9, 156 29"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 883,
    "y": 222,
    "width": 156,
    "height": 29,
    "strokeColor": "#ffffff",
    "text": "",
    "pathD": "M 0 27 C 54 -10, 106 -9, 156 29"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 220,
    "y": 222,
    "width": 156,
    "height": 29,
    "strokeColor": "#ffffff",
    "text": "",
    "pathD": "M 0 27 C 54 -10, 106 -9, 156 29"
  },
  {
    "id": "sp-9",
    "x": 162,
    "y": 298,
    "width": 60,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 12 41 L 9 45 L 10 49 L 15 50 L 18 47 L 17 43 L 12 41 Z M 12 39 L 18 41 C 18 41, 19 41, 19 41 L 20 47 C 20 47, 20 48, 20 48 L 16 52 C 16 52, 15 53, 15 53 C 15 53, 15 52, 15 52 L 9 51 C 9 51, 9 51, 8 50 L 7 45 C 7 44, 7 44, 7 44 L 11 39 C 12 39, 12 39, 12 39 Z M 48 29 C 48 29, 49 29, 49 30 C 49 40, 40 49, 30 49 C 29 49, 29 48, 29 48 C 29 47, 29 47, 30 47 C 39 47, 47 39, 47 30 C 47 29, 47 29, 48 29 Z M 57 21 C 56 22, 56 22, 56 22 C 53 25, 49 26, 45 26 L 26 44 C 27 48, 26 52, 23 55 C 22 56, 22 56, 21 56 C 24 57, 27 58, 30 58 C 35 58, 41 56, 45 53 C 46 53, 46 53, 47 53 L 58 65 L 58 30 C 58 27, 57 24, 57 21 Z M 30 11 C 30 11, 31 12, 31 12 C 31 13, 30 13, 30 13 C 20 13, 13 21, 13 30 C 13 30, 12 31, 12 31 C 11 31, 11 30, 11 30 C 11 20, 19 11, 30 11 Z M 49 2 C 46 2, 42 3, 39 5 C 37 8, 36 11, 37 15 C 37 15, 36 16, 36 16 L 27 25 L 17 35 C 16 36, 16 36, 16 36 C 15 36, 14 35, 14 35 C 11 35, 8 37, 6 39 C 2 43, 2 50, 6 54 C 10 58, 17 58, 21 54 C 24 51, 25 48, 24 44 C 24 44, 24 43, 25 43 L 44 24 C 44 23, 45 23, 45 23 C 49 24, 52 23, 55 20 L 55 20 L 57 16 C 58 14, 58 13, 58 11 L 50 18 C 50 19, 50 19, 49 19 L 44 17 C 43 17, 43 17, 43 16 L 41 11 C 41 10, 41 10, 42 10 L 49 2 Z M 30 2 C 15 2, 2 15, 2 30 C 2 33, 3 36, 3 38 C 4 38, 4 38, 5 37 C 7 34, 12 33, 15 33 L 23 26 L 34 15 C 34 11, 35 7, 38 4 C 38 4, 38 4, 38 3 C 36 3, 33 2, 30 2 Z M 30 0 C 34 0, 37 1, 40 2 C 44 0, 48 -1, 51 1 C 52 1, 52 1, 52 1 C 52 2, 52 2, 52 2 L 44 11 L 45 15 L 49 16 L 58 8 C 58 8, 58 8, 59 8 C 59 8, 59 8, 59 9 C 61 12, 60 16, 58 19 C 59 23, 60 26, 60 30 L 60 67 C 60 67, 60 68, 59 68 C 59 68, 59 68, 59 68 C 59 68, 58 68, 58 68 L 46 55 C 41 58, 36 60, 30 60 C 26 60, 23 59, 19 58 C 17 59, 16 59, 14 59 C 10 59, 7 58, 5 55 C 1 51, 0 45, 2 41 C 1 37, 0 34, 0 30 C 0 13, 13 0, 30 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 382,
    "y": 298,
    "width": 68,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 34 44 C 33 44, 32 45, 32 46 C 32 48, 33 49, 34 49 C 35 49, 36 48, 36 46 C 36 45, 35 44, 34 44 Z M 17 44 C 16 44, 15 45, 15 46 C 15 48, 16 49, 17 49 C 19 49, 20 48, 20 46 C 20 45, 19 44, 17 44 Z M 44 44 L 51 64 L 55 55 C 55 55, 55 55, 55 55 L 64 51 L 44 44 Z M 17 42 C 19 42, 21 44, 22 45 L 30 45 C 30 44, 32 42, 34 42 C 36 42, 38 44, 38 46 C 38 49, 36 51, 34 51 C 32 51, 30 49, 30 48 L 22 48 C 21 49, 19 51, 17 51 C 15 51, 13 49, 13 46 C 13 44, 15 42, 17 42 Z M 34 27 L 32 38 L 36 38 C 37 38, 38 37, 38 36 L 42 28 L 34 27 Z M 24 26 L 23 38 L 30 38 L 32 27 L 24 26 Z M 14 25 L 14 35 C 14 37, 15 38, 16 38 L 21 38 L 22 26 L 14 25 Z M 8 18 C 11 18, 13 20, 14 23 L 43 26 C 43 26, 44 27, 44 27 C 44 27, 44 28, 44 28 L 40 37 C 40 39, 38 40, 36 40 L 16 40 C 14 40, 12 38, 12 35 L 12 24 C 12 22, 10 20, 8 20 C 8 20, 7 20, 7 19 C 7 19, 8 18, 8 18 Z M 30 9 C 41 9, 51 18, 51 30 C 51 33, 50 36, 49 39 C 49 39, 48 39, 48 39 C 48 39, 47 39, 47 39 C 47 39, 47 38, 47 38 C 48 35, 49 33, 49 30 C 49 19, 40 11, 30 11 C 25 11, 19 13, 16 17 C 15 17, 15 17, 14 17 C 14 17, 14 16, 14 16 C 18 11, 24 9, 30 9 Z M 30 2 C 15 2, 2 14, 2 30 C 2 45, 15 58, 30 58 C 35 58, 41 56, 45 53 L 41 43 C 41 42, 41 42, 41 42 C 42 41, 42 41, 43 41 L 53 45 C 56 41, 58 35, 58 30 C 58 14, 45 2, 30 2 Z M 30 0 C 46 0, 60 13, 60 30 C 60 36, 58 41, 55 46 L 67 50 C 68 50, 68 50, 68 51 C 68 51, 68 51, 67 52 L 56 57 L 52 67 C 52 68, 51 68, 51 68 C 50 68, 50 68, 50 67 L 46 55 C 41 58, 36 60, 30 60 C 13 60, 0 46, 0 30 C 0 13, 13 0, 30 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 606,
    "y": 298,
    "width": 68,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 11 57 L 3 66 L 65 66 L 57 57 L 39 57 L 35 61 C 34 61, 34 61, 34 61 C 34 61, 34 61, 33 61 L 29 57 L 11 57 Z M 50 31 C 51 31, 51 31, 52 31 C 52 31, 52 32, 52 32 L 44 41 C 43 41, 43 41, 43 41 C 43 41, 42 41, 42 41 C 42 40, 42 40, 42 39 L 50 31 Z M 37 31 C 38 31, 39 31, 39 31 C 39 31, 39 32, 39 32 L 31 41 C 30 41, 30 41, 30 41 C 30 41, 29 41, 29 41 C 29 40, 29 40, 29 39 L 37 31 Z M 24 31 C 25 31, 25 31, 26 31 C 26 31, 26 32, 26 32 L 17 41 C 17 41, 17 41, 17 41 C 16 41, 16 41, 16 41 C 15 40, 15 40, 16 39 L 24 31 Z M 18 22 C 16 24, 14 25, 12 25 L 10 25 L 10 45 L 18 45 C 18 45, 18 45, 18 45 L 34 59 L 50 45 C 50 45, 50 45, 50 45 L 58 45 L 58 25 L 56 25 C 54 25, 52 24, 50 22 C 49 24, 47 25, 45 25 L 39 25 C 37 25, 35 24, 34 22 C 33 24, 31 25, 28 25 L 23 25 C 21 25, 19 24, 18 22 Z M 52 18 L 52 19 C 52 21, 53 23, 56 23 L 61 23 C 64 23, 66 21, 66 19 L 66 18 L 52 18 Z M 35 18 L 35 19 C 35 21, 37 23, 39 23 L 45 23 C 47 23, 49 21, 49 19 L 49 18 L 35 18 Z M 19 18 L 19 19 C 19 21, 21 23, 23 23 L 28 23 C 31 23, 33 21, 33 19 L 33 18 L 19 18 Z M 2 18 L 2 19 C 2 21, 4 23, 7 23 L 12 23 C 14 23, 16 21, 16 19 L 16 18 L 2 18 Z M 48 10 L 51 16 L 64 16 L 58 10 L 48 10 Z M 35 10 L 35 16 L 49 16 L 46 10 L 35 10 Z M 22 10 L 19 16 L 33 16 L 33 10 L 22 10 Z M 10 10 L 4 16 L 17 16 L 20 10 L 10 10 Z M 10 2 L 10 8 L 58 8 L 58 2 L 10 2 Z M 9 0 L 59 0 C 59 0, 60 0, 60 1 L 60 9 L 68 17 C 68 17, 68 17, 68 17 L 68 19 C 68 22, 65 25, 61 25 L 60 25 L 60 46 C 60 46, 59 47, 59 47 L 51 47 L 42 55 L 57 55 C 58 55, 58 55, 58 55 L 68 66 C 68 67, 68 67, 68 67 C 68 68, 67 68, 67 68 L 1 68 C 1 68, 0 68, 0 67 C 0 67, 0 67, 0 66 L 10 55 C 10 55, 10 55, 11 55 L 26 55 L 17 47 L 9 47 C 9 47, 8 46, 8 46 L 8 25 L 7 25 C 3 25, 0 22, 0 19 L 0 17 C 0 17, 0 17, 0 17 L 8 9 L 8 1 C 8 0, 9 0, 9 0 Z"
  },
  {
    "id": "sp-12",
    "x": 829,
    "y": 302,
    "width": 68,
    "height": 60,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 53 51 C 54 51, 54 51, 54 52 C 54 53, 54 53, 53 53 C 53 53, 52 53, 52 52 C 52 51, 53 51, 53 51 Z M 18 51 C 18 51, 19 51, 19 52 C 19 53, 18 53, 18 53 C 17 53, 17 53, 17 52 C 17 51, 17 51, 18 51 Z M 53 46 C 50 46, 47 49, 47 52 C 47 55, 50 58, 53 58 C 56 58, 59 55, 59 52 C 59 49, 56 46, 53 46 Z M 18 46 C 14 46, 12 49, 12 52 C 12 55, 14 58, 18 58 C 21 58, 23 55, 23 52 C 23 49, 21 46, 18 46 Z M 2 41 L 2 49 C 2 50, 3 51, 4 51 L 10 51 C 10 47, 14 44, 18 44 C 22 44, 25 47, 25 51 L 38 51 L 38 41 L 2 41 Z M 46 38 L 51 38 C 52 38, 53 39, 53 39 C 53 40, 52 40, 51 40 L 46 40 C 46 40, 45 40, 45 39 C 45 39, 46 38, 46 38 Z M 27 21 L 27 27 L 30 26 C 30 26, 30 26, 30 26 L 32 27 L 32 21 L 27 21 Z M 21 21 L 21 39 L 38 39 L 38 21 L 34 21 L 34 29 C 34 29, 34 29, 34 29 C 34 30, 33 30, 33 30 L 30 28 L 27 30 C 27 30, 27 30, 26 30 C 26 30, 26 30, 26 29 C 26 29, 25 29, 25 29 L 25 21 L 21 21 Z M 8 21 L 8 27 L 10 26 C 10 26, 11 26, 11 26 C 11 26, 11 26, 11 26 L 13 27 L 13 21 L 8 21 Z M 2 21 L 2 39 L 19 39 L 19 21 L 15 21 L 15 29 C 15 29, 15 29, 15 29 C 14 30, 14 30, 14 30 C 14 30, 14 30, 14 30 L 11 28 L 8 30 C 7 30, 7 30, 7 29 C 6 29, 6 29, 6 29 L 6 21 L 2 21 Z M 47 14 L 47 27 C 47 30, 49 32, 52 32 L 60 32 L 54 18 C 53 16, 51 14, 49 14 L 47 14 Z M 41 14 L 41 51 L 45 51 C 46 47, 49 44, 53 44 C 57 44, 61 47, 61 51 L 64 51 C 65 51, 66 50, 66 49 L 66 46 L 62 46 C 62 46, 61 46, 61 45 C 61 45, 62 44, 62 44 L 66 44 L 66 40 L 62 40 C 62 40, 61 40, 61 39 C 61 39, 62 38, 62 38 L 66 38 L 66 38 C 66 36, 64 34, 61 34 L 52 34 C 48 34, 45 31, 45 27 L 45 14 L 41 14 Z M 18 2 L 18 8 L 20 7 C 20 7, 20 7, 21 7 L 23 8 L 23 2 L 18 2 Z M 12 2 L 12 19 L 29 19 L 29 2 L 25 2 L 25 9 C 25 10, 25 10, 24 10 C 24 10, 24 10, 24 10 C 24 10, 23 10, 23 10 L 20 9 L 17 10 C 17 10, 17 10, 16 10 C 16 10, 16 10, 16 9 L 16 2 L 12 2 Z M 11 0 L 30 0 C 30 0, 31 0, 31 1 L 31 19 L 38 19 L 38 13 C 38 13, 39 12, 39 12 L 49 12 C 52 12, 55 14, 56 17 L 62 32 C 65 32, 68 35, 68 38 L 68 49 C 68 51, 66 53, 64 53 L 61 53 C 61 57, 57 60, 53 60 C 49 60, 46 57, 45 53 L 25 53 C 25 57, 22 60, 18 60 C 14 60, 10 57, 10 53 L 4 53 C 2 53, 0 51, 0 49 L 0 40 L 0 20 C 0 20, 0 19, 1 19 L 10 19 L 10 1 C 10 0, 10 0, 11 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 1053,
    "y": 298,
    "width": 68,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 5 49 C 6 49, 7 49, 7 50 C 7 50, 6 51, 5 51 C 5 51, 4 50, 4 50 C 4 49, 5 49, 5 49 Z M 61 48 C 61 48, 58 49, 56 50 C 54 51, 51 52, 48 53 C 48 53, 48 54, 48 55 C 48 55, 48 55, 48 56 C 53 54, 57 53, 60 51 C 60 51, 61 51, 61 51 C 61 50, 62 50, 62 49 C 62 49, 62 49, 61 48 Z M 11 46 L 11 63 C 15 64, 43 72, 64 55 C 65 55, 66 54, 66 53 C 66 53, 66 52, 65 52 C 65 52, 63 52, 61 53 C 57 55, 52 57, 45 59 C 43 59, 41 59, 37 59 C 35 59, 32 59, 28 59 C 28 59, 27 58, 27 58 C 27 57, 28 57, 29 57 C 38 58, 42 57, 44 57 C 46 56, 46 55, 46 54 C 46 53, 46 52, 45 52 C 44 51, 43 51, 43 51 C 33 51, 31 50, 29 49 C 27 48, 25 46, 11 46 Z M 2 46 L 2 63 L 9 63 L 9 46 L 2 46 Z M 1 44 L 10 44 C 25 44, 28 46, 30 47 C 32 48, 34 49, 43 49 C 43 49, 45 49, 47 50 C 47 51, 47 51, 47 51 C 50 50, 53 49, 56 48 C 59 46, 61 46, 63 47 C 64 47, 64 48, 64 49 C 64 49, 64 50, 64 50 C 65 50, 66 50, 67 50 C 68 51, 68 52, 68 53 C 68 55, 66 57, 66 57 C 54 66, 42 68, 31 68 C 20 68, 11 65, 10 65 L 1 65 C 0 65, 0 64, 0 64 L 0 45 C 0 45, 0 44, 1 44 Z M 44 2 L 44 11 L 63 11 L 63 2 L 44 2 Z M 33 2 L 33 23 L 37 21 C 38 21, 38 21, 38 21 C 38 21, 38 21, 38 21 L 42 23 L 42 2 L 33 2 Z M 13 2 L 13 11 L 31 11 L 31 2 L 13 2 Z M 12 0 L 64 0 C 65 0, 65 0, 65 1 L 65 12 C 65 13, 65 13, 64 13 L 62 13 L 62 43 C 62 44, 62 44, 61 44 C 60 44, 60 44, 60 43 L 60 13 L 44 13 L 44 24 C 44 25, 44 25, 44 25 C 44 25, 44 25, 43 25 C 43 25, 43 25, 43 25 L 38 23 L 33 25 C 32 26, 32 26, 32 25 C 32 25, 31 25, 31 24 L 31 13 L 16 13 L 16 41 C 16 42, 15 42, 15 42 C 14 42, 14 42, 14 41 L 14 13 L 12 13 C 11 13, 11 13, 11 12 L 11 1 C 11 0, 11 0, 12 0 Z"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 0,
    "x": 95,
    "y": 440,
    "width": 194,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 1,
    "x": 319,
    "y": 440,
    "width": 194,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 2,
    "x": 543,
    "y": 440,
    "width": 194,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 3,
    "x": 767,
    "y": 440,
    "width": 194,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 4,
    "x": 990,
    "y": 440,
    "width": 194,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 0,
    "x": 159,
    "y": 195,
    "width": 67,
    "height": 36,
    "text": "2019"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 382,
    "y": 195,
    "width": 67,
    "height": 36,
    "text": "2020"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 606,
    "y": 195,
    "width": 67,
    "height": 36,
    "text": "2021"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 830,
    "y": 195,
    "width": 67,
    "height": 36,
    "text": "2022"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 4,
    "x": 1054,
    "y": 195,
    "width": 67,
    "height": 36,
    "text": "2023"
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

export function Migso149Template({ data }: { data: BrainData }): ReactElement {
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
