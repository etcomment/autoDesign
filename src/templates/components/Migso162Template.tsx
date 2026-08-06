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
    "x": 542,
    "y": 415,
    "width": 196,
    "height": 302,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 147 0 L 196 151 L 147 302 L 0 302 L 49 151 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 542,
    "y": 281,
    "width": 196,
    "height": 302,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 147 0 L 196 151 L 147 302 L 0 302 L 49 151 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 542,
    "y": 146,
    "width": 196,
    "height": 302,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 0 L 147 0 L 196 151 L 147 302 L 0 302 L 49 151 Z"
  },
  {
    "id": "sp-3",
    "x": 558,
    "y": 28,
    "width": 164,
    "height": 302,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 362,
    "y": 126,
    "width": 81,
    "height": 81,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 40 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 837,
    "y": 257,
    "width": 81,
    "height": 81,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 40 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 362,
    "y": 389,
    "width": 81,
    "height": 81,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 40 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 837,
    "y": 518,
    "width": 81,
    "height": 81,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 40 0 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 791,
    "y": 298,
    "width": 46,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 791,
    "y": 559,
    "width": 46,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 442,
    "y": 167,
    "width": 46,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 442,
    "y": 429,
    "width": 46,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 383,
    "y": 142,
    "width": 38,
    "height": 50,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 15 45 L 23 45 C 23 45, 24 45, 24 45 C 24 46, 23 46, 23 46 L 15 46 C 15 46, 14 46, 14 45 C 14 45, 15 45, 15 45 Z M 2 43 L 2 46 C 2 47, 3 48, 4 48 L 34 48 C 35 48, 36 47, 36 46 L 36 43 L 2 43 Z M 28 33 L 28 37 L 32 37 L 32 33 L 28 33 Z M 18 33 C 18 33, 17 34, 17 34 L 17 35 C 17 36, 18 37, 18 37 L 19 37 C 20 37, 21 36, 21 35 L 21 34 C 21 34, 20 33, 19 33 L 18 33 Z M 8 33 C 7 33, 6 34, 6 35 C 6 36, 7 37, 8 37 C 9 37, 10 36, 10 35 C 10 34, 9 33, 8 33 Z M 28 32 L 33 32 C 33 32, 33 32, 33 32 L 33 37 C 33 38, 33 38, 33 38 L 28 38 C 27 38, 27 38, 27 37 L 27 32 C 27 32, 27 32, 28 32 Z M 18 32 L 19 32 C 21 32, 22 33, 22 34 L 22 35 C 22 37, 21 38, 19 38 L 18 38 C 17 38, 16 37, 16 35 L 16 34 C 16 33, 17 32, 18 32 Z M 8 32 C 10 32, 11 33, 11 35 C 11 37, 10 38, 8 38 C 6 38, 5 37, 5 35 C 5 33, 6 32, 8 32 Z M 30 23 C 29 23, 28 24, 28 24 L 28 25 C 28 26, 29 26, 30 26 L 31 26 C 31 26, 32 26, 32 25 L 32 24 C 32 24, 31 23, 31 23 L 30 23 Z M 17 23 L 17 26 L 21 26 L 21 23 L 17 23 Z M 6 23 C 6 23, 6 23, 6 23 L 6 26 C 6 26, 6 26, 6 26 L 9 26 C 10 26, 10 26, 10 26 L 10 23 C 10 23, 10 23, 9 23 L 6 23 Z M 30 21 L 31 21 C 32 21, 33 23, 33 24 L 33 25 C 33 27, 32 28, 31 28 L 30 28 C 28 28, 27 27, 27 25 L 27 24 C 27 23, 28 21, 30 21 Z M 16 21 L 21 21 C 22 21, 22 22, 22 22 L 22 27 C 22 28, 22 28, 21 28 L 16 28 C 16 28, 16 28, 16 27 L 16 22 C 16 22, 16 21, 16 21 Z M 6 21 L 9 21 C 10 21, 11 22, 11 23 L 11 26 C 11 27, 10 28, 9 28 L 6 28 C 5 28, 5 27, 5 26 L 5 23 C 5 22, 5 21, 6 21 Z M 29 13 C 28 13, 28 13, 28 13 L 28 16 C 28 16, 28 16, 29 16 L 32 16 C 32 16, 32 16, 32 16 L 32 13 C 32 13, 32 13, 32 13 L 29 13 Z M 19 13 C 18 13, 17 14, 17 15 C 17 16, 18 16, 19 16 C 20 16, 21 16, 21 15 C 21 14, 20 13, 19 13 Z M 6 13 L 6 16 L 10 16 L 10 13 L 6 13 Z M 29 11 L 32 11 C 32 11, 33 12, 33 13 L 33 16 C 33 17, 32 18, 32 18 L 29 18 C 28 18, 27 17, 27 16 L 27 13 C 27 12, 28 11, 29 11 Z M 19 11 C 21 11, 22 13, 22 15 C 22 16, 21 18, 19 18 C 17 18, 16 16, 16 15 C 16 13, 17 11, 19 11 Z M 5 11 L 10 11 C 11 11, 11 12, 11 12 L 11 17 C 11 18, 11 18, 10 18 L 5 18 C 5 18, 5 18, 5 17 L 5 12 C 5 12, 5 11, 5 11 Z M 2 9 L 2 41 L 36 41 L 36 9 L 2 9 Z M 26 3 C 26 3, 27 4, 27 4 C 27 4, 26 5, 26 5 C 26 5, 25 4, 25 4 C 25 4, 26 3, 26 3 Z M 15 3 L 23 3 C 23 3, 24 4, 24 4 C 24 4, 23 5, 23 5 L 15 5 C 15 5, 14 4, 14 4 C 14 4, 15 3, 15 3 Z M 4 1 C 3 1, 2 3, 2 4 L 2 7 L 36 7 L 36 4 C 36 3, 35 1, 34 1 L 4 1 Z M 4 0 L 34 0 C 36 0, 38 2, 38 4 L 38 46 C 38 48, 36 50, 34 50 L 4 50 C 2 50, 0 48, 0 46 L 0 4 C 0 2, 2 0, 4 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 852,
    "y": 272,
    "width": 50,
    "height": 50,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 16 38 L 3 48 L 47 48 L 40 42 C 39 43, 38 43, 37 43 L 21 43 C 18 43, 16 41, 16 38 Z M 30 36 L 38 36 C 39 36, 39 36, 39 37 C 39 37, 39 37, 38 37 L 30 37 C 30 37, 29 37, 29 37 C 29 36, 30 36, 30 36 Z M 30 30 L 35 30 C 36 30, 36 31, 36 31 C 36 32, 36 32, 35 32 L 30 32 C 30 32, 29 32, 29 31 C 29 31, 30 30, 30 30 Z M 30 25 L 38 25 C 39 25, 39 25, 39 26 C 39 26, 39 26, 38 26 L 30 26 C 30 26, 29 26, 29 26 C 29 25, 30 25, 30 25 Z M 48 22 L 43 26 L 43 37 C 43 39, 42 41, 41 42 L 48 48 L 48 22 Z M 2 22 L 2 48 L 16 36 L 16 33 L 2 22 Z M 15 21 C 16 22, 17 23, 17 25 L 17 37 C 17 40, 19 41, 21 41 C 23 41, 25 40, 25 37 L 25 21 L 15 21 Z M 11 21 C 9 21, 8 22, 7 24 C 7 24, 7 24, 7 25 L 16 31 L 16 25 C 16 23, 14 21, 11 21 Z M 30 19 L 38 19 C 39 19, 39 20, 39 20 C 39 21, 39 21, 38 21 L 30 21 C 30 21, 29 21, 29 20 C 29 20, 30 19, 30 19 Z M 43 16 L 43 24 L 48 20 L 43 16 Z M 30 14 L 38 14 C 39 14, 39 14, 39 14 C 39 15, 39 15, 38 15 L 30 15 C 30 15, 29 15, 29 14 C 29 14, 30 14, 30 14 Z M 27 10 L 27 37 C 27 39, 26 40, 25 41 L 37 41 C 40 41, 42 40, 42 37 L 42 10 L 27 10 Z M 25 2 L 2 20 L 6 23 C 7 21, 9 19, 11 19 L 25 19 L 25 9 C 25 8, 26 8, 26 8 L 33 8 L 25 2 Z M 25 0 C 25 0, 25 0, 26 0 L 35 8 L 42 8 C 43 8, 43 8, 43 9 L 43 14 L 50 20 C 50 20, 50 20, 50 20 L 50 49 C 50 50, 50 50, 49 50 L 1 50 C 0 50, 0 50, 0 49 L 0 20 C 0 20, 0 20, 0 20 L 25 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 853,
    "y": 534,
    "width": 49,
    "height": 49,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 3 37 L 3 48 L 12 48 L 12 37 L 3 37 Z M 1 36 L 14 36 C 15 36, 15 36, 15 36 C 15 37, 15 37, 14 37 L 13 37 L 13 48 C 13 49, 13 49, 13 49 L 3 49 C 2 49, 2 49, 2 48 L 2 37 L 1 37 C 0 37, 0 37, 0 36 C 0 36, 0 36, 1 36 Z M 37 31 L 37 48 L 46 48 L 46 31 L 37 31 Z M 35 30 L 48 30 C 49 30, 49 30, 49 30 C 49 31, 49 31, 48 31 L 47 31 L 47 48 C 47 49, 47 49, 46 49 L 37 49 C 36 49, 36 49, 36 48 L 36 31 L 35 31 C 34 31, 34 31, 34 30 C 34 30, 34 30, 35 30 Z M 20 25 L 20 47 L 29 47 L 29 25 L 20 25 Z M 8 25 C 6 25, 4 26, 4 28 C 4 30, 6 31, 8 31 C 10 31, 11 30, 11 28 C 11 26, 10 25, 8 25 Z M 18 24 L 31 24 C 32 24, 32 24, 32 24 C 32 25, 32 25, 31 25 L 30 25 L 30 48 C 30 49, 30 49, 29 49 L 20 49 C 19 49, 19 49, 19 48 L 19 25 L 18 25 C 17 25, 17 25, 17 24 C 17 24, 17 24, 18 24 Z M 8 24 C 10 24, 12 26, 12 28 C 12 31, 10 33, 8 33 C 5 33, 3 31, 3 28 C 3 26, 5 24, 8 24 Z M 41 17 C 39 17, 37 19, 37 21 C 37 24, 39 26, 41 26 C 44 26, 46 24, 46 21 C 46 19, 44 17, 41 17 Z M 41 16 C 45 16, 47 18, 47 21 C 47 25, 45 27, 41 27 C 38 27, 36 25, 36 21 C 36 18, 38 16, 41 16 Z M 31 10 C 31 10, 31 10, 31 11 C 31 11, 31 11, 31 11 C 30 11, 30 11, 30 11 C 30 10, 30 10, 31 10 Z M 19 10 C 19 10, 20 10, 20 11 C 20 11, 19 11, 19 11 C 18 11, 18 11, 18 11 C 18 10, 18 10, 19 10 Z M 24 3 C 25 3, 25 4, 25 4 L 25 5 C 26 5, 27 6, 28 7 C 28 7, 28 8, 27 8 C 27 8, 27 8, 26 7 C 26 7, 25 6, 24 6 C 23 6, 22 7, 22 8 C 22 9, 23 10, 24 10 C 27 10, 28 11, 28 13 C 28 15, 27 16, 25 16 L 25 17 C 25 17, 25 18, 24 18 C 24 18, 24 17, 24 17 L 24 16 C 23 16, 22 15, 21 14 C 21 14, 21 13, 22 13 C 22 13, 22 13, 23 14 C 23 14, 24 15, 24 15 C 26 15, 27 14, 27 13 C 27 12, 26 11, 24 11 C 22 11, 21 10, 21 8 C 21 6, 22 5, 24 5 L 24 4 C 24 4, 24 3, 24 3 Z M 24 1 C 19 1, 15 6, 15 11 C 15 16, 19 20, 24 20 C 29 20, 34 16, 34 11 C 34 6, 29 1, 24 1 Z M 24 0 C 30 0, 35 5, 35 11 C 35 17, 30 21, 24 21 C 19 21, 14 17, 14 11 C 14 5, 19 0, 24 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 377,
    "y": 404,
    "width": 50,
    "height": 50,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 17 44 L 17 49 L 33 49 L 33 44 L 17 44 Z M 1 38 L 1 40 C 1 41, 3 42, 4 42 L 46 42 C 48 42, 49 41, 49 40 L 49 38 L 1 38 Z M 7 31 L 7 36 L 10 36 L 10 31 L 7 31 Z M 35 29 L 42 29 C 42 29, 43 30, 43 30 C 43 30, 42 31, 42 31 L 35 31 C 34 31, 34 30, 34 30 C 34 30, 34 29, 35 29 Z M 17 25 L 17 36 L 20 36 L 20 25 L 17 25 Z M 35 24 L 45 24 C 45 24, 46 24, 46 25 C 46 25, 45 26, 45 26 L 35 26 C 34 26, 34 25, 34 25 C 34 24, 34 24, 35 24 Z M 8 23 C 7 23, 7 24, 7 24 C 7 25, 7 26, 8 26 C 9 26, 10 25, 10 24 C 10 24, 9 23, 8 23 Z M 27 21 L 27 36 L 30 36 L 30 21 L 27 21 Z M 18 16 C 17 16, 17 17, 17 18 C 17 19, 17 19, 18 19 C 19 19, 20 19, 20 18 C 20 17, 19 16, 18 16 Z M 5 15 L 12 15 C 12 15, 13 15, 13 16 C 13 16, 12 17, 12 17 L 5 17 C 4 17, 4 16, 4 16 C 4 15, 4 15, 5 15 Z M 28 12 C 28 12, 27 12, 27 13 C 27 14, 28 15, 28 15 C 29 15, 30 14, 30 13 C 30 12, 29 12, 28 12 Z M 10 10 L 22 10 C 22 10, 22 10, 22 11 C 22 11, 22 12, 22 12 L 10 12 C 9 12, 9 11, 9 11 C 9 10, 9 10, 10 10 Z M 5 10 L 5 10 C 6 10, 6 10, 6 11 C 6 11, 6 12, 5 12 L 5 12 C 4 12, 4 11, 4 11 C 4 10, 4 10, 5 10 Z M 20 5 L 31 5 C 31 5, 31 6, 31 6 C 31 6, 31 7, 31 7 L 20 7 C 19 7, 19 6, 19 6 C 19 6, 19 5, 20 5 Z M 10 5 L 15 5 C 16 5, 16 6, 16 6 C 16 6, 16 7, 15 7 L 10 7 C 9 7, 9 6, 9 6 C 9 6, 9 5, 10 5 Z M 5 5 L 5 5 C 6 5, 6 6, 6 6 C 6 6, 6 7, 5 7 L 5 7 C 4 7, 4 6, 4 6 C 4 6, 4 5, 5 5 Z M 40 5 C 40 5, 40 5, 40 6 L 40 7 C 42 7, 43 8, 43 9 C 44 9, 43 10, 43 10 C 43 10, 42 10, 42 10 C 42 9, 41 8, 40 8 C 38 8, 37 9, 37 10 C 37 11, 38 12, 40 12 C 43 12, 44 14, 44 16 C 44 18, 42 20, 40 20 L 40 21 C 40 21, 40 22, 40 22 C 39 22, 39 21, 39 21 L 39 20 C 38 20, 36 19, 36 18 C 36 17, 36 17, 36 17 C 37 16, 37 17, 37 17 C 38 18, 39 18, 40 18 C 41 18, 42 17, 42 16 C 42 15, 42 14, 40 14 C 37 14, 36 12, 36 10 C 36 9, 37 7, 39 7 L 39 6 C 39 5, 39 5, 40 5 Z M 4 1 C 3 1, 1 3, 1 4 L 1 25 L 5 24 C 5 23, 7 21, 8 21 C 9 21, 10 22, 10 22 L 15 19 C 15 19, 15 18, 15 18 C 15 16, 17 15, 18 15 C 19 15, 20 15, 21 16 L 25 14 C 25 14, 25 13, 25 13 C 25 12, 27 10, 28 10 C 30 10, 31 12, 31 13 C 31 15, 30 16, 28 16 C 27 16, 27 16, 26 15 L 21 17 C 21 17, 21 18, 21 18 C 21 20, 20 21, 18 21 C 18 21, 17 21, 16 20 L 11 23 C 11 24, 11 24, 11 24 C 11 26, 10 27, 8 27 C 7 27, 6 27, 5 26 L 1 26 L 1 36 L 5 36 L 5 30 C 5 30, 6 30, 6 30 L 11 30 C 11 30, 11 30, 11 30 L 11 36 L 15 36 L 15 24 C 15 24, 16 24, 16 24 L 21 24 C 21 24, 21 24, 21 24 L 21 36 L 25 36 L 25 20 C 25 20, 26 19, 26 19 L 31 19 C 31 19, 31 20, 31 20 L 31 36 L 49 36 L 49 4 C 49 3, 48 1, 46 1 L 4 1 Z M 4 0 L 46 0 C 48 0, 50 2, 50 4 L 50 37 L 50 40 C 50 42, 48 44, 46 44 L 35 44 L 35 49 L 40 49 C 41 49, 41 49, 41 49 C 41 50, 41 50, 40 50 L 10 50 C 9 50, 9 50, 9 49 C 9 49, 9 49, 10 49 L 15 49 L 15 44 L 4 44 C 2 44, 0 42, 0 40 L 0 37 L 0 4 C 0 2, 2 0, 4 0 Z"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 1,
    "x": 931,
    "y": 259,
    "width": 289,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 3,
    "x": 931,
    "y": 519,
    "width": 289,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 0,
    "x": 58,
    "y": 127,
    "width": 292,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 2,
    "x": 58,
    "y": 387,
    "width": 292,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 593,
    "y": 133,
    "width": 96,
    "height": 36,
    "text": "Step 01"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 0,
    "x": 523,
    "y": 163,
    "width": 235,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 1,
    "x": 593,
    "y": 273,
    "width": 96,
    "height": 36,
    "text": "Step 02"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 1,
    "x": 523,
    "y": 303,
    "width": 235,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 2,
    "x": 593,
    "y": 404,
    "width": 96,
    "height": 36,
    "text": "Step 03"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 523,
    "y": 434,
    "width": 235,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 593,
    "y": 539,
    "width": 96,
    "height": 36,
    "text": "Step 04"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 523,
    "y": 568,
    "width": 235,
    "height": 82,
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

export function Migso162Template({ data }: { data: BrainData }): ReactElement {
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
