import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "grp-0",
    "isGroup": true,
    "children": [
      {
        "id": "sp-23",
        "x": 998.5,
        "y": 138.5,
        "width": 188,
        "height": 188,
        "localPctX": 0.06279069767441861,
        "localPctY": 0.06279069767441861,
        "localPctW": 0.8744186046511628,
        "localPctH": 0.8744186046511628,
        "fillColor": "#ffffff",
        "pathD": "M 94 188 L 94 188 C 146 188, 188 146, 188 94 L 188 94 C 188 42, 146 0, 94 0 L 94 0 C 42 0, 0 42, 0 94 L 0 94 C 0 146, 42 188, 94 188"
      },
      {
        "id": "sp-24",
        "x": 1092.5,
        "y": 125,
        "width": 107.5,
        "height": 215,
        "localPctX": 0.5,
        "localPctY": 0,
        "localPctW": 0.5,
        "localPctH": 1,
        "fillColor": "#ee6d90",
        "pathD": "M 0 87 C 11 87, 20 96, 20 107 C 20 119, 11 128, 0 128 Z M 0 44 C 35 44, 64 72, 64 107 C 64 142, 35 171, 0 171 L 0 147 C 22 147, 39 129, 39 107 C 39 86, 22 68, 0 68 Z M 0 0 C 59 0, 107 48, 107 107 C 108 167, 59 215, 0 215 L 0 191 C 46 191, 83 153, 83 107 C 83 62, 46 24, 0 24 Z"
      },
      {
        "id": "sp-25",
        "x": 985,
        "y": 125,
        "width": 107.5,
        "height": 215,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.5,
        "localPctH": 1,
        "fillColor": "#ee6d90",
        "pathD": "M 107 87 L 107 128 C 96 128, 87 119, 87 107 C 87 96, 96 87, 107 87 Z M 107 44 L 107 68 C 86 68, 68 86, 68 108 C 68 129, 86 147, 107 147 L 107 171 C 72 171, 44 143, 44 108 C 44 72, 72 44, 107 44 Z M 107 0 L 107 24 C 62 24, 24 62, 24 108 C 24 153, 62 191, 107 191 L 108 215 C 48 215, 0 167, 0 108 C 0 48, 48 0, 107 0 Z"
      }
    ],
    "x": 985,
    "y": 125,
    "width": 215,
    "height": 215
  },
  {
    "id": "sp-0",
    "x": 96,
    "y": 358,
    "width": 1013,
    "height": 41,
    "fillColor": "#ffffff",
    "pathD": "M 0 10 L 608 10 L 608 0 L 1013 21 L 608 41 L 608 31 L 0 31 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 167,
    "y": 448,
    "width": 95,
    "height": 95,
    "strokeColor": "#3365cc",
    "pathD": "M 48 0 A 48 48 0 1 1 47 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 390,
    "y": 380,
    "width": 95,
    "height": 95,
    "strokeColor": "#ff4d38",
    "pathD": "M 48 0 A 48 48 0 1 1 47 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 614,
    "y": 313,
    "width": 95,
    "height": 95,
    "strokeColor": "#52c49c",
    "pathD": "M 48 0 A 48 48 0 1 1 47 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 838,
    "y": 247,
    "width": 95,
    "height": 95,
    "strokeColor": "#ffb900",
    "pathD": "M 48 0 A 48 48 0 1 1 47 0 Z"
  },
  {
    "id": "sp-5",
    "x": 186,
    "y": 469,
    "width": 57,
    "height": 51,
    "fillColor": "#3365cc",
    "pathD": "M 55 45 C 55 45, 55 45, 55 46 C 55 46, 54 46, 54 46 C 54 46, 54 46, 54 46 C 54 46, 54 46, 54 46 C 54 46, 53 46, 53 46 L 53 46 C 53 46, 53 47, 53 47 C 53 47, 52 47, 52 47 C 52 47, 52 47, 52 47 C 52 48, 52 48, 52 48 C 52 48, 52 48, 52 48 C 52 48, 52 48, 52 48 C 52 49, 52 49, 52 49 C 52 49, 51 49, 51 49 C 51 49, 51 49, 51 49 L 55 49 C 55 49, 55 49, 55 49 L 55 45 Z M 10 45 L 10 49 C 10 49, 11 49, 11 49 L 14 49 C 14 49, 14 49, 14 49 C 14 49, 14 49, 14 49 C 14 49, 14 48, 14 48 C 14 48, 14 48, 14 48 C 14 48, 14 48, 14 48 C 14 48, 14 48, 13 47 C 13 47, 13 47, 13 47 C 13 47, 13 47, 13 47 C 13 47, 13 46, 13 46 C 13 46, 12 46, 12 46 C 12 46, 12 46, 12 46 C 12 46, 12 46, 12 46 C 12 46, 11 46, 11 46 C 11 46, 11 46, 11 46 C 11 45, 11 45, 11 45 C 10 45, 10 45, 10 45 Z M 45 36 C 44 36, 44 36, 44 37 L 44 39 C 44 39, 44 40, 45 40 L 47 40 C 47 40, 48 39, 48 39 L 48 37 C 48 36, 47 36, 47 36 L 45 36 Z M 19 36 C 18 36, 18 36, 18 37 L 18 39 C 18 39, 18 40, 19 40 L 21 40 C 21 40, 22 39, 22 39 L 22 37 C 22 36, 21 36, 21 36 L 19 36 Z M 45 34 L 47 34 C 48 34, 49 35, 49 37 L 49 39 C 49 40, 48 42, 47 42 L 45 42 C 43 42, 42 40, 42 39 L 42 37 C 42 35, 43 34, 45 34 Z M 19 34 L 21 34 C 22 34, 24 35, 24 37 L 24 39 C 24 40, 22 42, 21 42 L 19 42 C 17 42, 16 40, 16 39 L 16 37 C 16 35, 17 34, 19 34 Z M 33 29 C 33 29, 34 30, 34 30 L 34 31 C 35 31, 36 32, 37 34 C 37 34, 37 35, 36 35 C 36 35, 35 35, 35 34 C 35 33, 34 33, 33 33 C 31 33, 30 34, 30 35 C 30 36, 31 37, 33 37 C 36 37, 37 39, 37 41 C 37 43, 36 44, 34 45 L 34 45 C 34 46, 33 46, 33 46 C 32 46, 32 46, 32 45 L 32 45 C 31 44, 29 43, 29 42 C 29 42, 29 41, 29 41 C 30 41, 30 41, 30 42 C 31 42, 32 43, 33 43 C 34 43, 35 42, 35 41 C 35 39, 34 39, 33 39 C 30 39, 29 37, 29 35 C 29 33, 30 32, 32 31 L 32 30 C 32 30, 32 29, 33 29 Z M 51 27 C 51 27, 52 27, 52 27 C 52 27, 52 27, 52 27 C 52 27, 52 28, 52 28 C 52 28, 52 28, 52 28 C 52 28, 52 28, 52 28 C 52 28, 52 28, 52 29 C 52 29, 53 29, 53 29 C 53 29, 53 29, 53 29 C 53 29, 53 29, 53 29 C 53 30, 54 30, 54 30 C 54 30, 54 30, 54 30 C 54 30, 55 30, 55 30 C 55 30, 55 30, 55 30 L 55 27 C 55 27, 55 27, 55 27 L 51 27 Z M 16 27 C 16 27, 16 27, 16 27 C 16 27, 16 27, 16 28 L 16 28 C 16 28, 16 28, 15 28 C 15 28, 15 29, 15 29 C 15 29, 15 29, 15 29 C 15 29, 15 29, 15 30 C 14 30, 14 31, 13 31 C 13 31, 13 31, 13 31 C 13 31, 13 31, 13 31 C 13 31, 13 32, 12 32 C 12 32, 12 32, 12 32 C 11 32, 11 32, 11 32 C 11 32, 11 32, 10 32 L 10 44 C 11 44, 11 44, 11 44 C 11 44, 11 44, 12 44 C 12 44, 12 44, 12 44 C 13 44, 13 44, 13 44 C 13 44, 13 45, 13 45 C 13 45, 13 45, 13 45 C 14 45, 14 46, 15 46 C 15 46, 15 46, 15 46 C 15 47, 15 47, 15 47 C 15 47, 15 47, 15 47 C 16 48, 16 48, 16 48 C 16 49, 16 49, 16 49 C 16 49, 16 49, 16 49 L 50 49 C 50 49, 50 49, 50 49 C 50 49, 50 49, 50 48 C 50 48, 50 48, 50 47 C 50 47, 50 47, 50 47 C 50 47, 51 47, 51 46 C 51 46, 51 46, 51 46 C 51 46, 51 46, 52 46 C 52 45, 52 45, 52 45 C 52 45, 52 45, 52 45 C 53 45, 53 44, 53 44 C 53 44, 53 44, 53 44 C 54 44, 54 44, 54 44 L 54 44 C 54 44, 55 44, 55 44 C 55 44, 55 44, 55 44 L 55 32 L 55 32 C 55 32, 54 32, 54 32 L 54 32 C 54 32, 54 32, 53 32 C 53 31, 53 31, 53 31 C 53 31, 53 31, 52 31 C 52 31, 52 31, 52 31 C 52 31, 52 30, 52 30 C 51 30, 51 30, 51 29 C 51 29, 51 29, 51 29 C 51 29, 50 29, 50 29 C 50 29, 50 28, 50 28 C 50 28, 50 28, 50 28 C 50 27, 50 27, 50 27 C 50 27, 50 27, 50 27 L 16 27 Z M 11 27 C 11 27, 10 27, 10 27 L 10 30 C 10 30, 10 30, 11 30 C 11 30, 11 30, 11 30 C 11 30, 11 30, 11 30 C 11 30, 12 30, 12 30 C 12 30, 12 30, 12 30 C 12 30, 12 30, 12 30 C 12 30, 13 29, 13 29 C 13 29, 13 29, 13 29 C 13 29, 13 29, 13 29 L 13 28 C 14 28, 14 28, 14 28 C 14 28, 14 28, 14 28 C 14 28, 14 28, 14 27 C 14 27, 14 27, 14 27 C 14 27, 14 27, 14 27 L 11 27 Z M 11 25 L 15 25 L 50 25 L 55 25 C 56 25, 57 26, 57 27 L 57 31 L 57 44 L 57 49 C 57 50, 56 51, 55 51 L 50 51 L 15 51 L 11 51 C 10 51, 9 50, 9 49 L 9 44 L 9 31 L 9 27 C 9 26, 10 25, 11 25 Z M 43 17 C 43 17, 44 17, 44 18 L 44 21 C 44 22, 43 22, 43 22 L 40 22 C 39 22, 39 22, 39 21 C 39 21, 39 20, 40 20 L 42 20 L 42 18 C 42 17, 43 17, 43 17 Z M 5 17 C 6 17, 6 17, 6 18 L 6 20 L 9 20 C 9 20, 10 21, 10 21 C 10 22, 9 22, 9 22 L 5 22 C 5 22, 4 22, 4 21 L 4 18 C 4 17, 5 17, 5 17 Z M 25 5 C 26 5, 28 6, 29 7 C 29 7, 29 8, 29 8 C 28 8, 28 8, 27 8 C 27 7, 26 7, 25 7 C 24 7, 22 8, 22 10 L 25 10 C 26 10, 26 10, 26 10 C 26 11, 26 11, 25 11 L 21 11 C 21 12, 21 12, 21 13 C 21 14, 21 14, 21 15 L 25 15 C 26 15, 26 15, 26 16 C 26 16, 26 17, 25 17 L 22 17 C 22 18, 24 19, 25 19 C 26 19, 27 19, 27 18 C 28 18, 28 18, 29 18 C 29 18, 29 19, 29 19 C 28 20, 26 21, 25 21 C 23 21, 21 19, 20 17 L 19 17 C 18 17, 18 16, 18 16 C 18 15, 18 15, 19 15 L 19 15 C 19 14, 19 14, 19 13 C 19 12, 19 12, 19 11 L 19 11 C 18 11, 18 11, 18 10 C 18 10, 18 10, 19 10 L 20 10 C 21 7, 23 5, 25 5 Z M 31 5 C 32 4, 32 4, 32 5 C 35 7, 36 10, 36 13 C 36 16, 35 19, 32 22 C 32 22, 32 22, 32 22 C 32 22, 31 22, 31 22 C 31 22, 31 21, 31 21 C 33 19, 34 16, 34 13 C 34 11, 33 8, 31 6 C 31 6, 31 5, 31 5 Z M 17 5 C 18 5, 18 6, 17 6 C 16 8, 15 11, 15 13 C 15 16, 16 19, 17 21 C 18 21, 18 22, 17 22 C 17 22, 17 22, 17 22 C 16 22, 16 22, 16 22 C 14 19, 13 16, 13 13 C 13 10, 14 7, 16 5 C 16 4, 17 4, 17 5 Z M 40 4 L 43 4 C 43 4, 44 5, 44 5 L 44 9 C 44 9, 43 10, 43 10 C 43 10, 42 9, 42 9 L 42 6 L 40 6 C 39 6, 39 6, 39 5 C 39 5, 39 4, 40 4 Z M 5 4 L 9 4 C 9 4, 10 5, 10 5 C 10 6, 9 6, 9 6 L 6 6 L 6 9 C 6 9, 6 10, 5 10 C 5 10, 4 9, 4 9 L 4 5 C 4 5, 5 4, 5 4 Z M 3 0 L 46 0 C 47 0, 48 1, 48 3 L 48 21 C 48 22, 48 22, 47 22 C 47 22, 47 22, 47 21 L 47 3 C 47 2, 46 2, 46 2 L 3 2 C 2 2, 2 2, 2 3 L 2 24 C 2 24, 2 24, 3 24 L 5 24 C 6 24, 6 25, 6 25 C 6 26, 6 26, 5 26 L 3 26 C 1 26, 0 25, 0 24 L 0 3 C 0 1, 1 0, 3 0 Z"
  },
  {
    "id": "sp-6",
    "x": 412,
    "y": 399,
    "width": 51,
    "height": 57,
    "fillColor": "#ff4d38",
    "pathD": "M 28 47 C 28 47, 29 48, 29 48 C 29 48, 28 49, 28 49 C 28 49, 27 48, 27 48 C 27 48, 28 47, 28 47 Z M 23 47 C 24 47, 24 48, 24 48 C 24 48, 24 49, 23 49 C 23 49, 22 48, 22 48 C 22 48, 23 47, 23 47 Z M 31 43 C 31 43, 31 43, 31 44 C 31 44, 31 45, 31 45 C 30 45, 30 44, 30 44 C 30 43, 30 43, 31 43 Z M 25 43 C 26 43, 26 43, 26 44 C 26 44, 26 45, 25 45 C 25 45, 25 44, 25 44 C 25 43, 25 43, 25 43 Z M 20 43 C 21 43, 21 43, 21 44 C 21 44, 21 45, 20 45 C 20 45, 20 44, 20 44 C 20 43, 20 43, 20 43 Z M 33 39 C 34 39, 34 39, 34 40 C 34 40, 34 40, 33 40 C 33 40, 32 40, 32 40 C 32 39, 33 39, 33 39 Z M 28 39 C 28 39, 29 39, 29 40 C 29 40, 28 40, 28 40 C 28 40, 27 40, 27 40 C 27 39, 28 39, 28 39 Z M 23 39 C 24 39, 24 39, 24 40 C 24 40, 24 40, 23 40 C 23 40, 22 40, 22 40 C 22 39, 23 39, 23 39 Z M 18 39 C 18 39, 19 39, 19 40 C 19 40, 18 40, 18 40 C 17 40, 17 40, 17 40 C 17 39, 17 39, 18 39 Z M 31 34 C 31 34, 31 35, 31 35 C 31 36, 31 36, 31 36 C 30 36, 30 36, 30 35 C 30 35, 30 34, 31 34 Z M 25 34 C 26 34, 26 35, 26 35 C 26 36, 26 36, 25 36 C 25 36, 25 36, 25 35 C 25 35, 25 34, 25 34 Z M 20 34 C 21 34, 21 35, 21 35 C 21 36, 21 36, 20 36 C 20 36, 20 36, 20 35 C 20 35, 20 34, 20 34 Z M 22 26 C 20 29, 16 31, 12 31 C 12 32, 12 32, 12 32 C 12 39, 14 44, 16 49 C 17 49, 16 50, 16 50 C 16 50, 16 50, 16 50 C 15 50, 15 50, 15 50 C 12 45, 11 39, 11 32 C 11 32, 11 32, 11 31 C 9 31, 8 30, 6 30 C 6 30, 6 31, 6 32 C 6 52, 16 55, 26 55 C 35 55, 45 52, 45 32 C 45 31, 45 30, 45 30 C 43 30, 42 31, 40 31 C 40 32, 40 32, 40 32 C 40 39, 39 45, 36 50 C 36 50, 36 50, 35 50 C 35 50, 35 50, 35 50 C 35 50, 34 49, 35 49 C 37 44, 39 39, 39 32 C 39 32, 39 32, 39 31 C 35 31, 31 29, 29 26 L 26 31 C 26 32, 26 32, 25 32 C 25 32, 25 32, 25 31 L 22 26 Z M 39 11 C 39 11, 40 11, 40 12 L 40 12 C 41 13, 42 14, 43 15 C 43 15, 43 16, 42 16 C 42 16, 41 16, 41 15 C 41 15, 40 14, 39 14 C 38 14, 37 15, 37 16 C 37 18, 37 18, 39 18 C 42 18, 43 20, 43 22 C 43 24, 42 26, 40 26 L 40 27 C 40 27, 39 28, 39 28 C 39 28, 38 27, 38 27 L 38 26 C 37 26, 36 25, 35 24 C 35 23, 35 23, 36 22 C 36 22, 37 22, 37 23 C 37 24, 38 24, 39 24 C 40 24, 41 23, 41 22 C 41 21, 41 20, 39 20 C 36 20, 35 18, 35 16 C 35 14, 36 13, 38 12 L 38 12 C 38 11, 39 11, 39 11 Z M 12 11 C 12 11, 13 11, 13 12 L 13 12 C 14 13, 15 14, 16 15 C 16 15, 16 16, 15 16 C 15 16, 14 16, 14 15 C 14 15, 13 14, 12 14 C 11 14, 10 15, 10 16 C 10 18, 10 18, 12 18 C 15 18, 16 20, 16 22 C 16 24, 15 26, 13 26 L 13 27 C 13 27, 12 28, 12 28 C 11 28, 11 27, 11 27 L 11 26 C 10 26, 9 25, 8 24 C 8 23, 8 23, 9 22 C 9 22, 10 22, 10 23 C 10 24, 11 24, 12 24 C 13 24, 14 23, 14 22 C 14 21, 14 20, 12 20 C 9 20, 8 18, 8 16 C 8 14, 9 13, 11 12 L 11 12 C 11 11, 11 11, 12 11 Z M 39 9 C 33 9, 29 13, 29 19 C 29 25, 33 29, 39 29 C 45 29, 49 25, 49 19 C 49 13, 45 9, 39 9 Z M 12 9 C 6 9, 2 13, 2 19 C 2 25, 6 29, 12 29 C 18 29, 22 25, 22 19 C 22 13, 18 9, 12 9 Z M 26 7 C 22 7, 20 7, 17 8 C 21 10, 24 14, 24 19 C 24 21, 23 23, 23 25 L 25 29 L 28 25 C 28 23, 27 21, 27 19 C 27 14, 30 10, 34 8 C 31 7, 29 7, 26 7 Z M 40 2 C 40 4, 39 5, 38 7 C 38 7, 39 7, 39 7 C 40 7, 41 7, 42 7 C 42 5, 41 3, 40 2 Z M 11 2 C 10 3, 9 5, 9 7 C 10 7, 11 7, 12 7 C 12 7, 13 7, 13 7 C 12 5, 11 4, 11 2 Z M 12 0 C 12 0, 13 0, 13 0 C 13 0, 13 1, 13 1 C 13 1, 13 5, 15 7 C 18 6, 22 5, 26 5 C 29 5, 33 6, 36 7 C 38 5, 38 1, 38 1 C 38 1, 38 0, 38 0 C 38 0, 39 0, 39 0 C 39 0, 44 2, 44 8 C 48 10, 51 14, 51 19 C 51 23, 49 26, 46 29 C 46 30, 46 31, 46 32 C 46 49, 40 57, 26 57 C 11 57, 5 49, 5 32 C 5 31, 5 30, 5 29 C 2 26, 0 23, 0 19 C 0 14, 3 10, 7 8 C 7 2, 12 0, 12 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 633,
    "y": 332,
    "width": 57,
    "height": 57,
    "fillColor": "#52c49c",
    "pathD": "M 20 37 C 19 37, 18 38, 18 39 C 18 40, 19 40, 20 40 C 21 40, 22 40, 22 39 C 22 38, 21 37, 20 37 Z M 45 27 C 45 27, 46 27, 46 28 L 46 31 C 46 32, 45 32, 45 32 C 44 32, 44 32, 44 31 L 44 28 C 44 27, 44 27, 45 27 Z M 30 27 C 29 27, 29 28, 29 29 C 29 30, 29 30, 30 30 C 31 30, 32 30, 32 29 C 32 28, 31 27, 30 27 Z M 39 20 L 49 25 L 56 21 C 56 21, 57 21, 57 21 C 57 21, 57 22, 57 22 L 50 27 C 49 27, 49 27, 49 27 L 38 21 L 33 27 C 34 27, 34 28, 34 29 C 34 30, 33 32, 31 32 L 31 38 C 31 39, 31 39, 30 39 C 30 39, 30 39, 30 38 L 30 32 C 28 32, 27 30, 27 29 C 27 28, 27 28, 27 28 L 20 26 L 10 35 C 9 35, 9 35, 9 35 C 9 35, 9 35, 8 35 C 8 35, 8 34, 9 34 L 19 24 C 19 24, 20 24, 20 24 L 28 27 C 28 26, 29 25, 30 25 C 31 25, 32 25, 32 26 L 38 20 C 38 20, 38 19, 39 20 Z M 45 8 C 44 8, 43 9, 43 10 C 43 11, 44 12, 45 12 C 46 12, 47 11, 47 10 C 47 9, 46 8, 45 8 Z M 4 0 C 5 0, 5 1, 5 1 L 5 52 L 19 52 L 19 42 C 19 42, 18 42, 18 41 L 10 49 C 10 49, 9 49, 9 49 C 9 49, 9 49, 9 49 C 8 48, 8 48, 9 47 L 17 40 C 16 40, 16 39, 16 39 C 16 37, 18 35, 20 35 C 22 35, 23 37, 23 39 L 35 42 L 41 34 C 41 34, 41 34, 41 34 L 56 38 C 57 38, 57 39, 57 39 C 57 39, 56 40, 56 40 L 42 36 L 36 43 C 36 43, 35 43, 35 43 L 23 40 C 22 41, 22 42, 21 42 L 21 52 L 30 52 L 30 46 C 30 45, 30 45, 30 45 C 31 45, 31 45, 31 46 L 31 52 L 44 52 L 44 40 C 44 40, 44 39, 45 39 C 45 39, 46 40, 46 40 L 46 52 L 56 52 C 57 52, 57 52, 57 53 C 57 53, 57 54, 56 54 L 5 54 L 5 56 C 5 57, 5 57, 4 57 C 4 57, 3 57, 3 56 L 3 54 L 1 54 C 0 54, 0 53, 0 53 C 0 52, 0 52, 1 52 L 3 52 L 3 46 L 1 46 C 0 46, 0 45, 0 45 C 0 44, 0 44, 1 44 L 3 44 L 3 37 L 1 37 C 0 37, 0 36, 0 36 C 0 35, 0 35, 1 35 L 3 35 L 3 27 L 1 27 C 0 27, 0 27, 0 27 C 0 26, 0 26, 1 26 L 3 26 L 3 18 L 1 18 C 0 18, 0 18, 0 17 C 0 17, 0 16, 1 16 L 3 16 L 3 9 L 1 9 C 0 9, 0 9, 0 8 C 0 8, 0 7, 1 7 L 3 7 L 3 1 C 3 1, 4 0, 4 0 Z M 56 0 C 56 0, 57 0, 57 0 C 57 1, 57 1, 57 1 L 48 8 C 48 9, 48 9, 48 10 C 48 11, 47 13, 46 13 L 46 19 C 46 20, 45 20, 45 20 C 44 20, 44 20, 44 19 L 44 13 C 42 13, 41 11, 41 10 C 41 10, 41 10, 41 10 L 29 7 L 18 16 C 18 16, 18 16, 18 16 C 17 16, 17 16, 17 16 L 9 10 C 8 10, 8 10, 8 9 C 9 9, 9 9, 10 9 L 17 14 L 29 5 C 29 5, 29 5, 29 5 L 42 8 C 42 7, 44 6, 45 6 C 46 6, 46 7, 47 7 L 56 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 856,
    "y": 266,
    "width": 57,
    "height": 57,
    "fillColor": "#ffb900",
    "pathD": "M 23 52 L 21 55 L 36 55 L 34 52 L 23 52 Z M 29 33 C 27 33, 26 34, 26 35 C 26 36, 27 37, 27 37 C 27 37, 27 38, 27 38 L 26 44 L 31 44 L 30 38 C 30 38, 30 37, 30 37 C 31 37, 31 36, 31 35 C 31 34, 30 33, 29 33 Z M 29 31 C 31 31, 33 33, 33 35 C 33 36, 32 37, 32 38 L 33 45 C 33 45, 33 45, 33 46 C 33 46, 33 46, 33 46 L 24 46 C 24 46, 24 46, 24 46 C 24 45, 24 45, 24 45 L 26 38 C 25 37, 24 36, 24 35 C 24 33, 26 31, 29 31 Z M 28 9 C 29 9, 29 9, 29 10 L 29 11 C 30 11, 31 12, 32 13 C 32 13, 32 14, 31 14 C 31 14, 30 14, 30 13 C 30 13, 29 12, 28 12 C 27 12, 26 13, 26 14 C 26 15, 27 16, 28 16 C 31 16, 32 17, 32 19 C 32 21, 31 22, 29 22 L 29 23 C 29 24, 29 24, 28 24 C 28 24, 28 24, 28 23 L 28 22 C 26 22, 26 21, 25 20 C 25 20, 25 19, 26 19 C 26 19, 26 19, 27 20 C 27 20, 28 21, 28 21 C 29 21, 30 20, 30 19 C 30 18, 30 17, 28 17 C 26 17, 25 16, 25 14 C 25 12, 26 11, 28 11 L 28 10 C 28 9, 28 9, 28 9 Z M 48 8 C 48 8, 49 8, 49 8 L 57 16 C 57 16, 57 17, 57 17 L 49 25 C 49 25, 49 25, 48 25 C 48 25, 48 25, 48 25 C 48 25, 48 25, 48 25 L 48 21 L 42 21 C 42 21, 41 20, 41 20 C 41 20, 42 19, 42 19 L 48 19 C 49 19, 49 20, 49 20 L 49 22 L 55 17 L 49 11 L 49 13 C 49 14, 49 14, 48 14 L 42 14 C 42 14, 41 14, 41 13 C 41 13, 42 12, 42 12 L 48 12 L 48 9 C 48 9, 48 8, 48 8 Z M 28 7 C 23 7, 19 11, 19 17 C 19 22, 23 26, 28 26 C 34 26, 38 22, 38 17 C 38 11, 34 7, 28 7 Z M 28 5 C 35 5, 40 10, 40 17 C 40 23, 35 28, 28 28 C 22 28, 17 23, 17 17 C 17 10, 22 5, 28 5 Z M 3 0 L 53 0 C 55 0, 57 2, 57 3 L 57 10 C 57 10, 56 11, 56 11 C 55 11, 55 10, 55 10 L 55 3 C 55 3, 54 2, 53 2 L 3 2 C 2 2, 2 3, 2 3 L 2 12 L 5 12 L 5 9 C 5 9, 5 8, 6 8 C 6 8, 6 8, 7 8 L 14 16 C 15 16, 15 17, 14 17 L 7 25 C 7 25, 6 25, 6 25 C 6 25, 6 25, 6 25 C 5 25, 5 25, 5 24 L 5 21 L 2 21 L 2 44 L 19 44 C 19 44, 20 44, 20 45 C 20 45, 19 46, 19 46 L 2 46 L 2 48 C 2 49, 2 50, 3 50 L 22 50 L 34 50 L 53 50 C 54 50, 55 49, 55 48 L 55 46 L 38 46 C 37 46, 37 45, 37 45 C 37 44, 37 44, 38 44 L 55 44 L 55 24 C 55 23, 55 23, 56 23 C 56 23, 57 23, 57 24 L 57 45 L 57 48 C 57 50, 55 52, 53 52 L 36 52 L 38 55 L 42 55 C 42 55, 43 56, 43 56 C 43 57, 42 57, 42 57 L 37 57 L 20 57 L 15 57 C 14 57, 14 57, 14 56 C 14 56, 14 55, 15 55 L 19 55 L 21 52 L 3 52 C 2 52, 0 50, 0 48 L 0 45 L 0 20 C 0 19, 0 19, 1 19 L 6 19 C 7 19, 7 19, 7 20 L 7 22 L 13 17 L 7 11 L 7 13 C 7 14, 7 14, 6 14 L 1 14 C 0 14, 0 14, 0 13 L 0 3 C 0 2, 2 0, 3 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 390,
    "y": 495,
    "width": 10,
    "height": 126,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 838,
    "y": 361,
    "width": 10,
    "height": 126,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 167,
    "y": 299,
    "width": 10,
    "height": 126,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 614,
    "y": 164,
    "width": 10,
    "height": 126,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 183,
    "y": 304,
    "width": 141,
    "height": 36,
    "text": "Your title 01",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 183,
    "y": 339,
    "width": 186,
    "height": 79,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 3,
    "x": 407,
    "y": 504,
    "width": 141,
    "height": 36,
    "text": "Your title 2",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 3,
    "x": 407,
    "y": 539,
    "width": 186,
    "height": 79,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 0,
    "x": 630,
    "y": 171,
    "width": 141,
    "height": 36,
    "text": "Your title 3",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 0,
    "x": 630,
    "y": 206,
    "width": 186,
    "height": 79,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 2,
    "x": 854,
    "y": 371,
    "width": 141,
    "height": 36,
    "text": "Your title 4",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 2,
    "x": 854,
    "y": 406,
    "width": 186,
    "height": 79,
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

export function Imported2025migsopcubedcreativeandexampletemplates119Template({ data }: { data: BrainData }): ReactElement {
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
