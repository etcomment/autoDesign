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
        "id": "sp-33",
        "x": 394,
        "y": 169,
        "width": 476,
        "height": 385,
        "localPctX": 0.054307116104868915,
        "localPctY": 0,
        "localPctW": 0.8913857677902621,
        "localPctH": 1,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 308 256 C 322 231, 377 145, 425 74 C 445 45, 463 18, 476 0 C 0 0, 0 0, 0 0 C 13 18, 31 45, 51 74 C 104 155, 170 257, 170 257 C 170 257, 170 383, 170 383 C 170 384, 170 384, 170 385 C 308 385, 308 385, 308 385 C 308 384, 308 384, 308 383 L 308 256 Z"
      },
      {
        "id": "grp-2",
        "isGroup": true,
        "children": [
          {
            "id": "sp-34",
            "x": 702,
            "y": 169,
            "width": 197,
            "height": 385,
            "localPctX": 0.6310861423220974,
            "localPctY": 0,
            "localPctW": 0.36891385767790263,
            "localPctH": 1,
            "fillColor": "#ffffff",
            "text": "",
            "pathD": "M 117 74 C 70 145, 14 231, 0 256 C 0 383, 0 383, 0 383 C 0 384, 0 384, 0 385 C 19 385, 19 385, 19 385 C 19 275, 19 275, 19 275 C 31 252, 73 186, 118 118 C 145 77, 173 35, 197 0 C 168 0, 168 0, 168 0 C 155 18, 137 45, 117 74 Z"
          },
          {
            "id": "sp-35",
            "x": 365,
            "y": 169,
            "width": 200,
            "height": 385,
            "localPctX": 0,
            "localPctY": 0,
            "localPctW": 0.37453183520599254,
            "localPctH": 1,
            "fillColor": "#ffffff",
            "text": "",
            "pathD": "M 200 257 C 199 257, 134 155, 80 74 C 60 45, 42 18, 30 0 C 0 0, 0 0, 0 0 C 15 22, 32 48, 50 74 C 113 170, 181 276, 181 276 C 181 277, 182 338, 182 385 C 200 385, 200 385, 200 385 C 200 384, 200 384, 200 383 C 200 383, 200 257, 200 257 Z"
          }
        ],
        "x": 365,
        "y": 169,
        "width": 534,
        "height": 385,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1
      }
    ],
    "x": 365,
    "y": 169,
    "width": 534,
    "height": 385
  },
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 441,
    "y": 170,
    "width": 103,
    "height": 101,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 52 0 A 52 51 0 1 1 51 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 578,
    "y": 170,
    "width": 103,
    "height": 101,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 52 0 A 52 51 0 1 1 51 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 719,
    "y": 169,
    "width": 103,
    "height": 101,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 52 0 A 52 51 0 1 1 51 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 509,
    "y": 259,
    "width": 103,
    "height": 101,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 52 0 A 52 51 0 1 1 51 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 649,
    "y": 259,
    "width": 103,
    "height": 101,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 52 0 A 52 51 0 1 1 51 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 578,
    "y": 347,
    "width": 103,
    "height": 101,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 52 0 A 52 51 0 1 1 51 0 Z"
  },
  {
    "id": "sp-6",
    "x": 592,
    "y": 541,
    "width": 80,
    "height": 46,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 470,
    "y": 195,
    "width": 46,
    "height": 50,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 6 42 L 15 42 C 15 42, 15 42, 15 43 C 15 43, 15 44, 15 44 L 6 44 C 5 44, 5 43, 5 43 C 5 42, 5 42, 6 42 Z M 24 36 L 30 36 C 30 36, 31 37, 31 37 C 31 37, 30 38, 30 38 L 24 38 C 23 38, 23 37, 23 37 C 23 37, 23 36, 24 36 Z M 6 36 L 19 36 C 19 36, 19 37, 19 37 C 19 37, 19 38, 19 38 L 6 38 C 5 38, 5 37, 5 37 C 5 37, 5 36, 6 36 Z M 17 30 L 30 30 C 30 30, 31 31, 31 31 C 31 31, 30 32, 30 32 L 17 32 C 16 32, 16 31, 16 31 C 16 31, 16 30, 17 30 Z M 6 30 L 11 30 C 12 30, 12 31, 12 31 C 12 31, 12 32, 11 32 L 6 32 C 5 32, 5 31, 5 31 C 5 31, 5 30, 6 30 Z M 25 24 L 30 24 C 30 24, 31 25, 31 25 C 31 25, 30 26, 30 26 L 25 26 C 25 26, 25 25, 25 25 C 25 25, 25 24, 25 24 Z M 6 24 L 20 24 C 21 24, 21 25, 21 25 C 21 25, 21 26, 20 26 L 6 26 C 5 26, 5 25, 5 25 C 5 25, 5 24, 6 24 Z M 6 18 L 22 18 C 22 18, 23 18, 23 19 C 23 19, 22 20, 22 20 L 6 20 C 5 20, 5 19, 5 19 C 5 18, 5 18, 6 18 Z M 28 13 L 28 18 L 33 18 L 28 13 Z M 1 12 L 1 48 L 34 48 L 34 20 L 27 20 C 27 20, 26 19, 26 19 L 26 12 L 1 12 Z M 7 7 L 7 10 L 27 10 C 27 10, 27 10, 28 10 L 36 18 C 36 19, 36 19, 36 19 L 36 43 L 39 43 L 39 7 L 7 7 Z M 12 1 L 12 5 L 40 5 C 41 5, 41 5, 41 6 L 41 38 L 45 38 L 45 1 L 12 1 Z M 11 0 L 45 0 C 46 0, 46 0, 46 1 L 46 39 C 46 40, 46 40, 45 40 L 41 40 L 41 44 C 41 45, 41 45, 40 45 L 36 45 L 36 49 C 36 50, 36 50, 35 50 L 1 50 C 0 50, 0 50, 0 49 L 0 11 C 0 10, 0 10, 1 10 L 5 10 L 5 6 C 5 5, 5 5, 6 5 L 10 5 L 10 1 C 10 0, 10 0, 11 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 536,
    "y": 285,
    "width": 50,
    "height": 50,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 23 44 C 22 44, 21 45, 21 46 L 21 47 C 21 48, 22 48, 23 48 L 28 48 C 29 48, 29 48, 29 47 L 29 46 C 29 45, 29 44, 28 44 L 23 44 Z M 26 29 C 26 29, 26 29, 26 30 C 26 30, 26 30, 26 30 C 25 30, 25 30, 25 30 C 25 29, 25 29, 26 29 Z M 45 23 C 46 23, 46 23, 46 24 L 46 30 C 46 30, 46 31, 45 31 C 45 31, 45 30, 45 30 L 45 24 C 45 23, 45 23, 45 23 Z M 5 23 C 5 23, 6 23, 6 24 L 6 30 C 6 30, 5 31, 5 31 C 4 31, 4 30, 4 30 L 4 24 C 4 23, 4 23, 5 23 Z M 44 20 C 43 20, 42 20, 42 21 L 42 33 C 42 34, 43 34, 44 34 L 44 34 C 47 34, 48 32, 48 30 L 48 24 C 48 22, 47 20, 44 20 L 44 20 Z M 6 20 C 3 20, 2 22, 2 24 L 2 30 C 2 32, 3 34, 6 34 L 7 34 C 8 34, 8 34, 8 33 L 8 21 C 8 20, 8 20, 7 20 L 6 20 Z M 27 16 C 28 16, 29 17, 30 19 C 30 21, 29 23, 27 24 C 27 24, 26 25, 26 25 L 26 26 C 26 26, 26 27, 25 27 C 25 27, 25 26, 25 26 L 25 25 C 25 24, 25 23, 27 22 C 28 22, 29 21, 28 19 C 28 18, 27 17, 26 17 C 25 17, 24 17, 24 18 C 23 18, 23 19, 23 20 C 23 20, 22 21, 22 21 C 22 21, 21 20, 21 20 C 21 19, 22 17, 23 17 C 24 16, 25 16, 27 16 Z M 16 12 L 16 32 L 20 32 C 20 32, 20 32, 20 32 L 25 37 L 29 32 C 30 32, 30 32, 30 32 L 34 32 L 34 12 L 16 12 Z M 15 11 L 35 11 C 35 11, 36 11, 36 12 L 36 33 C 36 33, 35 34, 35 34 L 30 34 L 26 38 C 25 39, 25 39, 25 39 C 25 39, 25 39, 24 38 L 20 34 L 15 34 C 14 34, 14 33, 14 33 L 14 12 C 14 11, 14 11, 15 11 Z M 19 0 L 31 0 C 39 0, 46 7, 46 15 L 46 19 C 48 19, 50 21, 50 24 L 50 30 C 50 33, 48 35, 46 35 C 46 44, 39 50, 31 50 L 23 50 C 21 50, 19 49, 19 47 L 19 46 C 19 44, 21 42, 23 42 L 28 42 C 29 42, 31 44, 31 46 L 31 47 C 31 47, 31 48, 30 48 L 31 48 C 38 48, 44 43, 45 36 C 44 36, 44 36, 44 36 L 44 36 C 42 36, 41 35, 41 33 L 41 21 C 41 19, 42 18, 44 18 L 44 18 C 44 18, 44 18, 45 18 L 45 15 C 45 8, 39 1, 31 1 L 19 1 C 11 1, 5 8, 5 15 L 5 18 C 6 18, 6 18, 6 18 L 7 18 C 8 18, 10 19, 10 21 L 10 33 C 10 35, 8 36, 7 36 L 6 36 C 3 36, 0 33, 0 30 L 0 24 C 0 21, 2 19, 4 19 L 4 15 C 4 7, 11 0, 19 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 605,
    "y": 195,
    "width": 48,
    "height": 48,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 37 25 C 37 31, 32 37, 25 37 L 25 44 C 35 43, 43 35, 44 25 L 37 25 Z M 4 25 C 5 35, 13 43, 23 44 L 23 37 C 16 37, 11 31, 11 25 L 4 25 Z M 24 20 C 22 20, 20 22, 20 24 C 20 26, 22 28, 24 28 C 26 28, 28 26, 28 24 C 28 24, 28 24, 28 23 C 28 23, 28 23, 28 23 C 26 23, 25 22, 25 20 C 25 20, 25 20, 25 20 C 24 20, 24 20, 24 20 Z M 28 19 C 27 19, 26 19, 26 20 C 26 21, 27 22, 28 22 C 29 22, 29 21, 29 20 C 29 19, 29 19, 28 19 Z M 28 17 C 29 17, 31 19, 31 20 C 31 21, 30 22, 29 23 C 29 23, 29 24, 29 24 C 29 27, 27 30, 24 30 C 21 30, 18 27, 18 24 C 18 21, 21 19, 24 19 C 24 19, 25 19, 25 19 C 26 18, 27 17, 28 17 Z M 24 12 C 17 12, 12 17, 12 24 C 12 31, 17 36, 24 36 C 31 36, 36 31, 36 24 C 36 17, 31 12, 24 12 Z M 25 4 L 25 11 C 32 11, 37 16, 37 23 L 44 23 C 43 13, 35 5, 25 4 Z M 23 4 C 13 5, 5 13, 4 23 L 11 23 C 11 16, 16 11, 23 11 L 23 4 Z M 24 0 C 24 0, 25 0, 25 1 L 25 3 C 36 3, 45 12, 45 23 L 47 23 C 48 23, 48 24, 48 24 C 48 24, 48 25, 47 25 L 45 25 C 45 36, 36 45, 25 45 L 25 47 C 25 48, 24 48, 24 48 C 24 48, 23 48, 23 47 L 23 45 C 12 45, 3 36, 3 25 L 1 25 C 0 25, 0 24, 0 24 C 0 24, 0 23, 1 23 L 3 23 C 3 12, 12 3, 23 3 L 23 1 C 23 0, 24 0, 24 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 676,
    "y": 286,
    "width": 48,
    "height": 48,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 24 36 C 23 36, 22 37, 22 38 C 22 40, 23 41, 24 41 C 25 41, 26 40, 26 38 C 26 37, 25 36, 24 36 Z M 28 33 L 47 33 C 48 33, 48 33, 48 34 L 48 43 C 48 44, 48 44, 47 44 L 28 44 C 28 44, 27 44, 27 43 C 27 43, 28 42, 28 42 L 47 42 L 47 35 L 28 35 C 28 35, 27 34, 27 34 C 27 33, 28 33, 28 33 Z M 1 33 L 20 33 C 20 33, 21 33, 21 34 C 21 34, 20 34, 20 34 L 1 34 L 1 46 L 7 42 C 7 42, 7 42, 8 42 L 20 42 C 20 42, 21 43, 21 43 C 21 43, 20 44, 20 44 L 8 44 L 1 48 C 1 48, 1 48, 1 48 C 1 48, 0 48, 0 48 C 0 48, 0 48, 0 47 L 0 34 C 0 33, 0 33, 1 33 Z M 24 20 C 23 20, 22 21, 22 22 C 22 23, 23 24, 24 24 C 25 24, 26 23, 26 22 C 26 21, 25 20, 24 20 Z M 28 16 L 47 16 C 48 16, 48 17, 48 17 L 48 31 C 48 31, 48 31, 48 31 C 48 31, 47 31, 47 31 C 47 31, 47 31, 47 31 L 40 27 L 28 27 C 28 27, 27 27, 27 26 C 27 26, 28 26, 28 26 L 41 26 C 41 26, 41 26, 41 26 L 47 29 L 47 18 L 28 18 C 28 18, 27 18, 27 17 C 27 17, 28 16, 28 16 Z M 1 16 L 20 16 C 20 16, 21 17, 21 17 C 21 18, 20 18, 20 18 L 1 18 L 1 26 L 20 26 C 20 26, 21 26, 21 26 C 21 27, 20 27, 20 27 L 1 27 C 0 27, 0 27, 0 26 L 0 17 C 0 17, 0 16, 1 16 Z M 24 3 C 23 3, 22 4, 22 5 C 22 6, 23 7, 24 7 C 25 7, 26 6, 26 5 C 26 4, 25 3, 24 3 Z M 24 2 C 26 2, 27 3, 27 5 C 27 7, 26 9, 25 9 L 25 18 C 26 19, 27 20, 27 22 C 27 24, 26 25, 25 25 L 25 35 C 26 35, 27 37, 27 38 C 27 40, 26 42, 24 42 C 22 42, 20 40, 20 38 C 20 37, 22 35, 23 35 L 23 25 C 22 25, 20 24, 20 22 C 20 20, 22 19, 23 18 L 23 9 C 22 9, 20 7, 20 5 C 20 3, 22 2, 24 2 Z M 28 0 L 47 0 C 48 0, 48 0, 48 1 L 48 10 C 48 10, 48 11, 47 11 L 28 11 C 28 11, 27 10, 27 10 C 27 10, 28 9, 28 9 L 47 9 L 47 1 L 28 1 C 28 1, 27 1, 27 1 C 27 0, 28 0, 28 0 Z M 1 0 L 20 0 C 20 0, 21 0, 21 1 C 21 1, 20 1, 20 1 L 1 1 L 1 13 L 7 9 C 7 9, 7 9, 8 9 L 20 9 C 20 9, 21 10, 21 10 C 21 10, 20 11, 20 11 L 8 11 L 1 15 C 1 15, 1 15, 1 15 C 1 15, 0 15, 0 15 C 0 15, 0 14, 0 14 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 749,
    "y": 196,
    "width": 44,
    "height": 48,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 20 17 C 18 17, 17 18, 17 19 C 17 21, 18 22, 20 22 C 21 22, 22 21, 22 19 C 22 18, 21 17, 20 17 Z M 20 16 C 22 16, 23 17, 23 19 C 23 22, 22 23, 20 23 C 17 23, 16 22, 16 19 C 16 17, 17 16, 20 16 Z M 20 13 C 16 13, 13 16, 13 20 C 13 22, 15 24, 17 25 C 17 26, 17 26, 17 26 L 17 44 L 20 46 L 21 44 L 21 43 C 20 43, 20 42, 21 41 L 22 40 L 21 39 C 20 39, 20 38, 21 37 L 22 36 L 21 35 C 20 35, 20 35, 20 34 C 20 34, 20 33, 21 33 L 22 32 L 22 26 C 22 26, 22 26, 23 25 C 25 24, 26 22, 26 20 C 26 16, 23 13, 20 13 Z M 20 12 C 24 12, 28 15, 28 20 C 28 22, 26 25, 24 26 L 24 32 C 24 32, 24 32, 23 32 L 22 34 L 22 35 L 23 36 C 23 36, 23 36, 23 37 L 22 38 L 22 39 L 23 40 C 23 40, 23 40, 23 40 C 23 40, 23 41, 23 41 L 22 42 L 23 44 C 23 44, 23 44, 23 44 C 23 44, 23 45, 23 45 L 20 48 C 20 48, 20 48, 20 48 C 19 48, 19 48, 19 48 L 16 45 C 16 44, 16 44, 16 44 L 16 26 C 13 25, 12 22, 12 20 C 12 15, 15 12, 20 12 Z M 20 7 C 23 7, 26 8, 29 10 C 31 13, 32 16, 32 20 C 32 23, 31 26, 29 29 C 29 29, 28 29, 28 29 C 28 29, 28 29, 28 29 C 27 28, 27 28, 28 28 C 30 25, 31 23, 31 20 C 31 16, 30 14, 28 11 C 25 9, 23 8, 20 8 C 17 8, 14 9, 12 11 C 10 14, 8 16, 8 20 C 8 23, 10 25, 12 28 C 12 28, 12 28, 12 29 C 11 29, 11 29, 11 29 C 8 26, 7 23, 7 20 C 7 16, 8 13, 11 10 C 13 8, 16 7, 20 7 Z M 20 0 C 30 0, 39 9, 39 20 C 39 20, 40 22, 43 26 C 43 27, 44 28, 44 29 C 44 29, 44 30, 43 31 C 41 31, 40 32, 39 32 C 39 34, 40 37, 39 39 C 39 42, 34 42, 32 42 C 31 42, 30 42, 30 44 L 30 47 C 30 48, 29 48, 29 48 C 29 48, 28 48, 28 47 L 28 44 C 28 42, 30 41, 32 41 C 35 41, 37 40, 38 39 C 38 36, 38 32, 38 32 C 38 32, 38 31, 38 31 C 38 31, 40 30, 42 29 C 42 29, 43 29, 43 28 C 43 28, 42 27, 42 27 C 38 23, 38 20, 38 20 L 38 20 C 38 10, 30 1, 20 1 C 10 1, 1 10, 1 20 C 1 23, 2 26, 4 29 C 4 29, 4 29, 4 29 C 4 30, 5 31, 6 32 C 7 34, 8 35, 9 37 C 10 40, 10 47, 10 47 C 10 48, 10 48, 9 48 C 9 48, 9 48, 9 47 C 9 47, 9 40, 7 37 C 7 36, 6 34, 5 33 C 4 32, 3 31, 3 30 C 3 29, 3 29, 3 29 C 1 27, 0 23, 0 20 C 0 9, 9 0, 20 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 605,
    "y": 374,
    "width": 48,
    "height": 48,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 3 36 L 3 47 L 12 47 L 12 36 L 3 36 Z M 1 35 L 14 35 C 15 35, 15 35, 15 36 C 15 36, 15 36, 14 36 L 13 36 L 13 47 C 13 48, 13 48, 12 48 L 3 48 C 2 48, 2 48, 2 47 L 2 36 L 1 36 C 0 36, 0 36, 0 36 C 0 35, 0 35, 1 35 Z M 36 30 L 36 47 L 45 47 L 45 30 L 36 30 Z M 34 29 L 47 29 C 48 29, 48 29, 48 30 C 48 30, 48 30, 47 30 L 46 30 L 46 47 C 46 48, 46 48, 45 48 L 36 48 C 35 48, 35 48, 35 47 L 35 30 L 34 30 C 33 30, 33 30, 33 30 C 33 29, 33 29, 34 29 Z M 20 25 L 20 47 L 28 47 L 28 25 L 20 25 Z M 8 24 C 6 24, 4 26, 4 28 C 4 29, 6 31, 8 31 C 9 31, 11 29, 11 28 C 11 26, 9 24, 8 24 Z M 17 23 L 31 23 C 31 23, 31 23, 31 24 C 31 24, 31 24, 31 24 L 30 24 L 30 47 C 30 48, 29 48, 29 48 L 19 48 C 19 48, 18 48, 18 47 L 18 24 L 17 24 C 17 24, 17 24, 17 24 C 17 23, 17 23, 17 23 Z M 8 23 C 10 23, 12 25, 12 28 C 12 30, 10 32, 8 32 C 5 32, 3 30, 3 28 C 3 25, 5 23, 8 23 Z M 41 17 C 38 17, 36 19, 36 21 C 36 23, 38 25, 41 25 C 43 25, 45 23, 45 21 C 45 19, 43 17, 41 17 Z M 41 15 C 44 15, 46 18, 46 21 C 46 24, 44 27, 41 27 C 37 27, 35 24, 35 21 C 35 18, 37 15, 41 15 Z M 30 10 C 30 10, 31 10, 31 10 C 31 11, 30 11, 30 11 C 29 11, 29 11, 29 10 C 29 10, 29 10, 30 10 Z M 18 10 C 19 10, 19 10, 19 10 C 19 11, 19 11, 18 11 C 18 11, 18 11, 18 10 C 18 10, 18 10, 18 10 Z M 24 3 C 24 3, 25 4, 25 4 L 25 5 C 26 5, 27 6, 27 7 C 27 7, 27 7, 27 8 C 26 8, 26 8, 26 7 C 26 7, 25 6, 24 6 C 23 6, 22 7, 22 8 C 22 9, 23 10, 24 10 C 27 10, 27 11, 27 13 C 27 14, 26 16, 25 16 L 25 17 C 25 17, 24 17, 24 17 C 24 17, 23 17, 23 17 L 23 16 C 22 16, 21 15, 21 14 C 21 14, 21 13, 21 13 C 22 13, 22 13, 22 13 C 22 14, 23 15, 24 15 C 25 15, 26 14, 26 13 C 26 12, 25 11, 24 11 C 21 11, 21 9, 21 8 C 21 6, 22 5, 23 5 L 23 4 C 23 4, 24 3, 24 3 Z M 24 1 C 19 1, 15 5, 15 10 C 15 15, 19 19, 24 19 C 29 19, 33 15, 33 10 C 33 5, 29 1, 24 1 Z M 24 0 C 30 0, 34 5, 34 10 C 34 16, 30 21, 24 21 C 18 21, 14 16, 14 10 C 14 5, 18 0, 24 0 Z"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 5,
    "x": 942,
    "y": 470,
    "width": 121,
    "height": 37,
    "text": "Title here"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 5,
    "x": 935,
    "y": 505,
    "width": 271,
    "height": 83,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 1,
    "x": 942,
    "y": 182,
    "width": 121,
    "height": 37,
    "text": "Title here"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 935,
    "y": 218,
    "width": 271,
    "height": 83,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 3,
    "x": 942,
    "y": 326,
    "width": 121,
    "height": 37,
    "text": "Title here"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 935,
    "y": 361,
    "width": 271,
    "height": 83,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 910,
    "y": 192,
    "width": 19,
    "height": 19,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 910,
    "y": 334,
    "width": 19,
    "height": 19,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 910,
    "y": 477,
    "width": 19,
    "height": 19,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 4,
    "x": 202,
    "y": 470,
    "width": 121,
    "height": 37,
    "text": "Title here"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 4,
    "x": 59,
    "y": 505,
    "width": 271,
    "height": 83,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 203,
    "y": 182,
    "width": 121,
    "height": 37,
    "text": "Title here"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 0,
    "x": 59,
    "y": 218,
    "width": 271,
    "height": 83,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 2,
    "x": 203,
    "y": 326,
    "width": 121,
    "height": 37,
    "text": "Title here"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 2,
    "x": 59,
    "y": 361,
    "width": 271,
    "height": 83,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 336,
    "y": 192,
    "width": 19,
    "height": 19,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 336,
    "y": 334,
    "width": 19,
    "height": 19,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 336,
    "y": 477,
    "width": 19,
    "height": 19,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
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

export function Migso107Template({ data }: { data: BrainData }): ReactElement {
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
