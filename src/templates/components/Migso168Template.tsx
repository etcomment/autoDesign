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
    "x": 89,
    "y": 326,
    "width": 157,
    "height": 136,
    "text": "",
    "pathD": "M 79 0 L 157 136 L 0 136 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 154,
    "y": 404,
    "width": 27,
    "height": 28,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 4 5 C 5 4, 6 4, 6 5 C 7 6, 7 7, 6 7 C 2 11, 2 18, 6 22 C 8 24, 11 25, 14 25 C 16 25, 19 24, 21 22 C 25 18, 25 11, 21 7 C 20 7, 20 6, 21 5 C 21 4, 22 4, 23 5 C 28 10, 28 19, 23 24 C 20 27, 17 28, 14 28 C 10 28, 7 27, 4 24 C -1 19, -1 10, 4 5 Z M 14 0 C 14 0, 15 1, 15 2 L 15 12 C 15 13, 14 14, 14 14 C 13 14, 12 13, 12 12 L 12 2 C 12 1, 13 0, 14 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 325,
    "y": 326,
    "width": 157,
    "height": 136,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 79 0 L 157 136 L 0 136 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 386,
    "y": 402,
    "width": 36,
    "height": 31,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 24 19 C 24 19, 25 19, 25 20 L 25 27 C 25 28, 24 29, 24 29 C 23 29, 22 28, 22 27 L 22 20 C 22 19, 23 19, 24 19 Z M 17 17 C 19 17, 21 18, 21 21 L 21 29 C 21 30, 20 31, 19 31 C 18 31, 17 30, 17 29 L 17 21 C 17 20, 17 20, 17 20 C 17 20, 16 20, 16 21 L 16 23 C 16 24, 16 25, 15 25 C 14 25, 13 24, 13 23 L 13 21 C 13 18, 15 17, 17 17 Z M 17 11 C 20 11, 23 12, 24 15 C 25 15, 24 16, 24 17 C 23 17, 22 17, 21 16 C 20 15, 19 14, 17 14 C 14 14, 12 16, 12 19 L 12 28 C 12 29, 11 29, 10 29 C 9 29, 8 29, 8 28 L 8 19 C 8 15, 12 11, 17 11 Z M 3 8 C 4 8, 4 9, 4 10 C 3 10, 3 11, 3 11 C 3 12, 2 12, 2 12 C 1 12, 1 12, 1 12 C 0 11, 0 10, 0 10 C 0 9, 1 9, 1 8 C 2 7, 3 7, 3 8 Z M 11 7 C 12 6, 13 7, 13 7 C 13 8, 13 9, 12 10 C 9 11, 6 15, 6 19 L 6 24 C 6 25, 6 26, 5 26 C 4 26, 3 25, 3 24 L 3 19 C 3 14, 6 9, 11 7 Z M 17 5 C 24 5, 31 12, 31 19 L 31 29 C 31 30, 30 30, 29 30 C 28 30, 27 30, 27 29 L 27 19 C 27 13, 23 9, 17 9 C 16 9, 15 8, 15 7 C 15 6, 16 5, 17 5 Z M 17 0 C 27 0, 36 9, 36 19 C 36 20, 35 21, 34 21 C 33 21, 33 20, 33 19 C 33 11, 26 3, 17 3 C 13 3, 10 4, 7 6 C 7 7, 6 7, 5 6 C 5 5, 5 4, 6 4 C 9 1, 13 0, 17 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 443,
    "y": 326,
    "width": 157,
    "height": 136,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 79 0 L 157 136 L 0 136 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 508,
    "y": 358,
    "width": 28,
    "height": 30,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 6 21 C 5 21, 3 23, 3 24 C 3 25, 5 27, 6 27 C 7 27, 7 26, 8 26 L 9 24 L 8 24 L 8 23 L 8 22 C 7 22, 7 21, 6 21 Z M 22 16 C 20 16, 19 18, 19 19 C 19 20, 20 22, 22 22 C 23 22, 24 20, 24 19 C 24 18, 23 16, 22 16 Z M 25 0 C 26 0, 27 0, 27 0 C 28 1, 28 1, 28 2 L 28 19 L 28 19 L 26 23 C 25 24, 23 25, 22 25 C 18 25, 16 22, 16 19 C 16 16, 18 13, 22 13 L 25 14 L 25 4 L 12 9 L 12 23 L 12 24 C 12 27, 9 30, 6 30 C 3 30, 0 27, 0 24 C 0 21, 3 18, 6 18 L 8 19 L 8 8 C 8 7, 9 6, 10 6 L 25 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 207,
    "y": 326,
    "width": 157,
    "height": 136,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 79 0 L 157 136 L 0 136 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 269,
    "y": 358,
    "width": 32,
    "height": 30,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 22 20 L 22 27 L 28 27 L 28 20 L 22 20 Z M 2 17 C 3 16, 4 16, 4 17 L 8 21 L 12 17 C 13 16, 14 16, 15 17 C 15 17, 15 19, 15 19 L 11 23 L 15 27 C 15 28, 15 29, 15 30 C 14 30, 14 30, 13 30 C 13 30, 13 30, 12 30 L 8 26 L 4 30 C 4 30, 3 30, 3 30 C 3 30, 2 30, 2 30 C 1 29, 1 28, 2 27 L 6 23 L 2 19 C 1 19, 1 17, 2 17 Z M 20 17 L 30 17 C 31 17, 31 17, 31 18 L 31 28 C 31 29, 31 30, 30 30 L 20 30 C 19 30, 19 29, 19 28 L 19 18 C 19 17, 19 17, 20 17 Z M 8 5 L 5 11 L 12 11 L 8 5 Z M 25 3 C 23 3, 21 5, 21 7 C 21 9, 23 11, 25 11 C 27 11, 29 9, 29 7 C 29 5, 27 3, 25 3 Z M 8 1 C 9 1, 9 1, 10 1 L 16 11 C 17 12, 17 13, 16 13 C 16 14, 15 14, 15 14 L 2 14 C 1 14, 0 14, 0 13 C 0 13, 0 12, 0 11 L 7 1 C 7 1, 8 1, 8 1 Z M 25 0 C 29 0, 32 3, 32 7 C 32 11, 29 14, 25 14 C 21 14, 18 11, 18 7 C 18 3, 21 0, 25 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 561,
    "y": 326,
    "width": 157,
    "height": 136,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 79 0 L 157 136 L 0 136 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 628,
    "y": 402,
    "width": 23,
    "height": 30,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 2 12 C 3 12, 3 13, 3 14 C 3 18, 7 22, 12 22 C 16 22, 20 18, 20 14 C 20 13, 20 12, 21 12 C 22 12, 23 13, 23 14 C 23 18, 20 22, 16 24 L 13 25 L 13 28 C 13 29, 12 30, 12 30 C 11 30, 10 29, 10 28 L 10 25 L 7 24 C 3 22, 0 18, 0 14 C 0 13, 1 12, 2 12 Z M 11 3 C 10 3, 9 4, 9 6 L 9 14 C 9 15, 10 16, 11 16 C 13 16, 14 15, 14 14 L 14 6 C 14 4, 13 3, 11 3 Z M 11 0 C 15 0, 17 3, 17 6 L 17 14 C 17 17, 15 19, 11 19 C 8 19, 6 17, 6 14 L 6 6 C 6 3, 8 0, 11 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 798,
    "y": 326,
    "width": 157,
    "height": 136,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 79 0 L 157 136 L 0 136 Z"
  },
  {
    "id": "sp-11",
    "x": 862,
    "y": 409,
    "width": 28,
    "height": 18,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 20 4 C 21 4, 22 5, 22 6 L 22 12 C 22 13, 21 13, 20 13 C 19 13, 18 13, 18 12 L 18 6 C 18 5, 19 4, 20 4 Z M 15 4 C 16 4, 17 5, 17 6 L 17 12 C 17 13, 16 13, 15 13 C 14 13, 14 13, 14 12 L 14 6 C 14 5, 14 4, 15 4 Z M 11 4 C 12 4, 12 5, 12 6 L 12 12 C 12 13, 12 13, 11 13 C 10 13, 9 13, 9 12 L 9 6 C 9 5, 10 4, 11 4 Z M 6 4 C 7 4, 8 5, 8 6 L 8 12 C 8 13, 7 13, 6 13 C 5 13, 5 13, 5 12 L 5 6 C 5 5, 5 4, 6 4 Z M 3 3 L 3 15 L 23 15 L 23 12 C 23 11, 23 10, 24 10 L 25 10 L 25 7 L 24 7 C 23 7, 23 6, 23 6 L 23 3 L 3 3 Z M 1 0 L 24 0 C 25 0, 26 1, 26 2 L 26 4 L 26 4 C 27 4, 28 5, 28 6 L 28 12 C 28 13, 27 14, 26 14 L 26 14 L 26 16 C 26 17, 25 18, 24 18 L 1 18 C 0 18, 0 17, 0 16 L 0 2 C 0 1, 0 0, 1 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 1034,
    "y": 326,
    "width": 157,
    "height": 136,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 79 0 L 157 136 L 0 136 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 1098,
    "y": 403,
    "width": 29,
    "height": 29,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 24 23 C 23 23, 23 23, 23 23 C 22 23, 22 24, 23 25 C 23 25, 24 25, 26 26 C 25 24, 25 23, 25 23 C 24 23, 24 23, 24 23 Z M 24 19 C 25 19, 26 20, 27 21 C 28 22, 29 26, 29 27 C 29 28, 29 28, 29 29 C 28 29, 28 29, 27 29 C 27 29, 27 29, 27 29 C 26 29, 22 28, 21 27 C 19 25, 19 22, 21 21 C 22 20, 23 19, 24 19 Z M 12 19 L 12 23 C 12 23, 12 23, 12 23 L 14 21 L 12 19 Z M 19 12 L 21 14 L 23 12 C 23 12, 23 12, 23 12 L 19 12 Z M 3 3 C 3 5, 3 7, 4 8 L 16 19 L 19 16 L 8 4 C 7 3, 5 3, 3 3 Z M 3 0 C 5 0, 9 0, 10 2 L 17 9 L 17 9 L 23 9 C 24 9, 25 10, 26 11 C 26 12, 26 14, 25 14 L 23 17 L 22 17 L 22 17 L 17 22 L 17 23 L 17 23 L 15 25 C 14 26, 13 26, 12 26 C 12 26, 12 26, 11 26 C 10 25, 9 24, 9 23 L 9 17 L 9 17 L 2 10 C 0 8, 0 2, 0 1 C 0 1, 1 0, 1 0 C 2 0, 2 0, 3 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 916,
    "y": 326,
    "width": 157,
    "height": 136,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 79 0 L 157 136 L 0 136 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 980,
    "y": 360,
    "width": 30,
    "height": 26,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 17 8 L 17 8 Z M 15 16 L 15 16 C 16 16, 17 16, 17 16 C 18 16, 18 16, 18 17 L 18 20 L 26 13 L 18 6 L 18 8 C 18 9, 18 9, 17 10 C 17 10, 16 11, 14 11 C 11 12, 6 14, 4 18 C 8 16, 13 16, 15 16 Z M 17 26 L 17 26 C 16 26, 16 26, 16 26 C 15 26, 15 25, 15 24 L 15 19 C 12 19, 6 19, 3 23 C 3 24, 2 24, 1 24 C 0 24, 0 23, 0 23 C 0 13, 8 10, 13 8 C 14 8, 15 8, 15 7 L 15 2 C 15 1, 15 1, 16 0 C 17 0, 17 0, 18 1 L 29 12 C 30 13, 30 14, 29 14 L 18 25 C 17 26, 17 26, 17 26 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 679,
    "y": 326,
    "width": 157,
    "height": 136,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 79 0 L 157 136 L 0 136 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 743,
    "y": 358,
    "width": 31,
    "height": 30,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 18 23 L 18 12 L 26 12 L 18 23 Z M 5 12 L 14 12 L 14 24 L 5 12 Z M 9 4 L 13 9 L 5 9 L 9 4 Z M 16 7 L 12 3 L 19 3 L 16 7 Z M 22 4 L 26 9 L 19 9 L 22 4 Z M 31 11 L 31 11 L 31 11 C 31 11, 31 11, 31 11 C 31 11, 31 11, 31 11 C 31 11, 31 11, 31 11 C 31 11, 31 11, 31 11 L 31 10 C 31 10, 31 10, 31 10 C 31 10, 31 10, 31 10 C 31 10, 31 10, 31 10 C 31 10, 31 10, 31 10 C 31 10, 31 10, 31 10 C 31 10, 31 10, 31 10 C 31 10, 31 10, 31 10 C 31 10, 31 10, 31 10 C 31 10, 31 10, 31 10 C 31 10, 31 10, 31 9 C 31 9, 31 9, 31 9 C 31 9, 31 9, 31 9 C 31 9, 31 9, 31 9 L 23 1 C 23 1, 23 1, 23 1 C 23 1, 23 0, 23 0 C 23 0, 23 0, 23 0 C 23 0, 23 0, 23 0 C 23 0, 23 0, 23 0 C 23 0, 23 0, 22 0 C 22 0, 22 0, 22 0 L 22 0 L 9 0 C 9 0, 9 0, 9 0 C 9 0, 9 0, 9 0 C 9 0, 8 0, 8 0 L 8 0 C 8 0, 8 0, 8 1 L 0 9 C 0 9, 0 9, 0 9 C 0 9, 0 9, 0 9 C 0 9, 0 9, 0 9 C 0 10, 0 10, 0 10 C 0 10, 0 10, 0 10 C 0 10, 0 10, 0 10 C 0 10, 0 10, 0 10 C 0 10, 0 10, 0 10 C 0 10, 0 10, 0 10 C 0 10, 0 10, 0 10 C 0 10, 0 10, 0 10 C 0 10, 0 10, 0 10 C 0 10, 0 10, 0 10 C 0 10, 0 11, 0 11 C 0 11, 0 11, 0 11 C 0 11, 0 11, 0 11 C 0 11, 0 11, 0 11 C 0 11, 0 11, 0 11 L 0 11 C 0 11, 0 11, 0 11 C 0 11, 0 11, 0 11 C 0 11, 0 11, 0 11 L 14 29 C 14 30, 15 30, 16 30 C 16 30, 16 30, 17 29 L 31 11 C 31 11, 31 11, 31 11 C 31 11, 31 11, 31 11 C 31 11, 31 11, 31 11 Z"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 4,
    "x": 107,
    "y": 476,
    "width": 121,
    "height": 45,
    "text": "SPR 20"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 5,
    "x": 344,
    "y": 476,
    "width": 119,
    "height": 45,
    "text": "AUT 20"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 6,
    "x": 579,
    "y": 476,
    "width": 121,
    "height": 45,
    "text": "SPR 21"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 7,
    "x": 817,
    "y": 476,
    "width": 119,
    "height": 45,
    "text": "AUT 21"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 8,
    "x": 1052,
    "y": 476,
    "width": 121,
    "height": 45,
    "text": "SPR 22"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 1,
    "x": 462,
    "y": 262,
    "width": 118,
    "height": 45,
    "text": "WIN 20"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 222,
    "y": 262,
    "width": 126,
    "height": 45,
    "text": "SUM 20"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 2,
    "x": 695,
    "y": 262,
    "width": 126,
    "height": 45,
    "text": "SUM 21"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 3,
    "x": 935,
    "y": 262,
    "width": 118,
    "height": 45,
    "text": "WIN 21"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 4,
    "x": 108,
    "y": 542,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 4,
    "x": 73,
    "y": 578,
    "width": 189,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 5,
    "x": 344,
    "y": 542,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 5,
    "x": 309,
    "y": 578,
    "width": 189,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 6,
    "x": 581,
    "y": 542,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 6,
    "x": 545,
    "y": 578,
    "width": 189,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 7,
    "x": 817,
    "y": 542,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 7,
    "x": 782,
    "y": 578,
    "width": 189,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 8,
    "x": 1053,
    "y": 542,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 8,
    "x": 1018,
    "y": 578,
    "width": 189,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 0,
    "x": 226,
    "y": 122,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 0,
    "x": 191,
    "y": 159,
    "width": 189,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 1,
    "x": 462,
    "y": 122,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 1,
    "x": 427,
    "y": 159,
    "width": 189,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 2,
    "x": 699,
    "y": 122,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 2,
    "x": 664,
    "y": 159,
    "width": 189,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 3,
    "x": 935,
    "y": 122,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 3,
    "x": 900,
    "y": 159,
    "width": 189,
    "height": 75,
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

export function Migso168Template({ data }: { data: BrainData }): ReactElement {
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
