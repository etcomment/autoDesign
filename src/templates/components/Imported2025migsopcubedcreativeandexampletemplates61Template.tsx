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
    "x": 625,
    "y": 111,
    "width": 542,
    "height": 542,
    "fillColor": "#ffffff",
    "pathD": "M 271 0 A 271 271 0 1 1 271 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 625,
    "y": 111,
    "width": 542,
    "height": 542
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 661,
    "y": 147,
    "width": 469,
    "height": 469,
    "fillColor": "#ffffff",
    "pathD": "M 235 0 A 235 235 0 1 1 234 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 661,
    "y": 147,
    "width": 469,
    "height": 469,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 699,
    "y": 184,
    "width": 394,
    "height": 394,
    "fillColor": "#ffffff",
    "pathD": "M 197 0 A 197 197 0 1 1 197 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 699,
    "y": 184,
    "width": 394,
    "height": 394,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 738,
    "y": 224,
    "width": 316,
    "height": 316,
    "fillColor": "#ffffff",
    "pathD": "M 158 0 A 158 158 0 1 1 158 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 738,
    "y": 224,
    "width": 316,
    "height": 316,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 773,
    "y": 258,
    "width": 246,
    "height": 246,
    "fillColor": "#ffffff",
    "pathD": "M 123 0 A 123 123 0 1 1 123 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 773,
    "y": 258,
    "width": 246,
    "height": 246,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-10",
    "x": 813,
    "y": 299,
    "width": 165,
    "height": 165,
    "fillColor": "#ffffff",
    "pathD": "M 83 0 A 83 83 0 1 1 82 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 117,
    "y": 150,
    "width": 75,
    "height": 75,
    "pathD": "M 38 0 A 38 38 0 1 1 37 0 Z"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 215,
    "y": 140,
    "width": 141,
    "height": 36,
    "text": "Your title 1",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 0,
    "x": 219,
    "y": 181,
    "width": 359,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 117,
    "y": 251,
    "width": 75,
    "height": 75,
    "fillColor": "#ff4d38",
    "pathD": "M 38 0 A 38 38 0 1 1 37 0 Z"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 1,
    "x": 215,
    "y": 241,
    "width": 141,
    "height": 36,
    "text": "Your title 2",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 219,
    "y": 282,
    "width": 359,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 117,
    "y": 352,
    "width": 75,
    "height": 75,
    "fillColor": "#52c49c",
    "pathD": "M 38 0 A 38 38 0 1 1 37 0 Z"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 2,
    "x": 215,
    "y": 342,
    "width": 141,
    "height": 36,
    "text": "Your title 3",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 2,
    "x": 219,
    "y": 382,
    "width": 359,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 117,
    "y": 452,
    "width": 75,
    "height": 75,
    "fillColor": "#ffb900",
    "pathD": "M 38 0 A 38 38 0 1 1 37 0 Z"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 3,
    "x": 215,
    "y": 442,
    "width": 141,
    "height": 36,
    "text": "Your title 4",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 219,
    "y": 483,
    "width": 359,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 117,
    "y": 553,
    "width": 75,
    "height": 75,
    "fillColor": "#ee6d90",
    "pathD": "M 38 0 A 38 38 0 1 1 37 0 Z"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 4,
    "x": 215,
    "y": 543,
    "width": 141,
    "height": 36,
    "text": "Your title 5",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 4,
    "x": 219,
    "y": 584,
    "width": 359,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 136,
    "y": 572,
    "width": 37,
    "height": 37,
    "fillColor": "#ffffff",
    "pathD": "M 2 33 C 2 33, 1 34, 1 34 L 1 36 L 19 36 L 19 34 C 19 34, 19 33, 18 33 L 2 33 Z M 5 29 C 5 29, 4 30, 4 30 L 4 32 L 16 32 L 16 30 C 16 30, 16 29, 15 29 L 5 29 Z M 20 29 C 21 28, 21 28, 21 29 L 24 31 C 24 32, 24 32, 24 32 C 24 32, 24 32, 23 32 C 23 32, 23 32, 23 32 L 20 29 C 20 29, 20 29, 20 29 Z M 5 28 L 15 28 C 17 28, 18 29, 18 30 L 18 32 L 18 32 C 20 32, 21 33, 21 34 L 21 36 L 36 36 C 37 36, 37 36, 37 36 C 37 37, 37 37, 36 37 L 1 37 C 0 37, 0 37, 0 36 L 0 34 C 0 33, 1 32, 2 32 L 3 32 L 3 30 C 3 29, 4 28, 5 28 Z M 22 26 L 25 26 C 25 26, 26 26, 26 27 C 26 27, 25 27, 25 27 L 22 27 C 21 27, 21 27, 21 27 C 21 26, 21 26, 22 26 Z M 23 21 C 23 21, 24 21, 24 21 C 24 21, 24 22, 24 22 L 21 24 C 21 25, 21 25, 21 25 C 21 25, 20 25, 20 24 C 20 24, 20 24, 20 24 L 23 21 Z M 4 20 C 3 20, 3 20, 3 20 L 3 22 C 3 22, 3 22, 4 22 L 17 22 C 17 22, 17 22, 17 22 L 17 20 C 17 20, 17 20, 17 20 L 4 20 Z M 19 10 L 19 13 L 35 13 C 35 13, 36 13, 36 13 L 36 11 C 36 10, 35 10, 35 10 L 19 10 Z M 15 8 L 15 15 L 18 15 L 18 8 L 15 8 Z M 6 5 L 6 19 L 14 19 L 14 5 L 9 5 L 9 16 C 9 17, 9 17, 9 17 C 8 17, 8 17, 8 16 L 8 5 L 6 5 Z M 4 1 C 3 1, 3 1, 3 1 L 3 4 C 3 4, 3 4, 4 4 L 17 4 C 17 4, 17 4, 17 4 L 17 1 C 17 1, 17 1, 17 1 L 4 1 Z M 4 0 L 17 0 C 18 0, 18 1, 18 1 L 18 4 C 18 4, 18 5, 17 5 L 15 5 L 15 7 L 18 7 C 19 7, 19 7, 19 8 L 19 9 L 35 9 C 36 9, 37 10, 37 11 L 37 13 C 37 14, 36 15, 35 15 L 19 15 L 19 16 C 19 16, 19 16, 18 16 L 15 16 L 15 19 L 17 19 C 18 19, 18 19, 18 20 L 18 22 C 18 23, 18 24, 17 24 L 4 24 C 3 24, 2 23, 2 22 L 2 20 C 2 19, 3 19, 4 19 L 5 19 L 5 5 L 4 5 C 3 5, 2 4, 2 4 L 2 1 C 2 1, 3 0, 4 0 Z"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 138,
    "y": 472,
    "width": 32,
    "height": 37,
    "fillColor": "#ffffff",
    "pathD": "M 21 16 C 22 16, 22 16, 22 16 C 22 17, 22 17, 21 17 C 21 17, 21 17, 21 16 C 21 16, 21 16, 21 16 Z M 11 16 C 11 16, 12 16, 12 16 C 12 17, 11 17, 11 17 C 11 17, 10 17, 10 16 C 10 16, 11 16, 11 16 Z M 21 10 C 22 10, 22 10, 22 10 C 24 12, 25 14, 25 16 C 25 19, 24 21, 22 23 C 22 23, 22 23, 22 23 C 22 23, 21 23, 21 23 C 21 22, 21 22, 21 22 C 23 20, 24 18, 24 16 C 24 14, 23 12, 21 11 C 21 11, 21 10, 21 10 Z M 10 10 C 10 10, 10 10, 11 10 C 11 10, 11 11, 11 11 C 8 14, 8 19, 11 22 C 11 22, 11 22, 11 23 C 11 23, 10 23, 10 23 C 10 23, 10 23, 10 23 C 6 19, 6 14, 10 10 Z M 16 10 C 16 10, 16 10, 16 10 L 16 11 C 17 11, 18 12, 19 13 C 19 13, 19 13, 18 14 C 18 14, 18 14, 18 13 C 17 13, 17 12, 16 12 C 15 12, 14 13, 14 14 C 14 15, 14 16, 16 16 C 18 16, 19 17, 19 19 C 19 20, 18 21, 16 21 L 16 22 C 16 23, 16 23, 16 23 C 16 23, 15 23, 15 22 L 15 21 C 14 21, 13 21, 13 20 C 13 19, 13 19, 13 19 C 14 19, 14 19, 14 19 C 14 20, 15 20, 16 20 C 17 20, 18 20, 18 19 C 18 18, 18 17, 16 17 C 14 17, 13 15, 13 14 C 13 12, 14 11, 15 11 L 15 10 C 15 10, 16 10, 16 10 Z M 16 6 C 10 6, 5 10, 5 16 C 5 22, 10 27, 16 27 C 22 27, 26 22, 26 16 C 26 10, 22 6, 16 6 Z M 16 5 C 22 5, 28 10, 28 16 C 28 23, 22 28, 16 28 C 9 28, 4 23, 4 16 C 4 10, 9 5, 16 5 Z M 16 1 C 8 1, 1 8, 1 16 C 1 25, 8 31, 16 31 C 19 31, 22 31, 24 29 C 24 29, 24 29, 24 29 C 25 29, 25 29, 25 29 L 31 35 L 31 16 C 31 8, 24 1, 16 1 Z M 16 0 C 25 0, 32 7, 32 16 L 32 36 C 32 37, 32 37, 32 37 C 32 37, 31 37, 31 37 C 31 37, 31 37, 31 37 L 24 30 C 22 32, 19 33, 16 33 C 7 33, 0 25, 0 16 C 0 7, 7 0, 16 0 Z"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 136,
    "y": 270,
    "width": 37,
    "height": 37,
    "fillColor": "#ffffff",
    "pathD": "M 1 33 L 1 36 L 36 36 L 36 33 L 1 33 Z M 24 21 C 24 21, 24 21, 24 22 C 24 22, 24 22, 24 22 C 23 22, 23 22, 23 22 C 23 21, 23 21, 24 21 Z M 13 21 C 14 21, 14 21, 14 22 C 14 22, 14 22, 13 22 C 13 22, 13 22, 13 22 C 13 21, 13 21, 13 21 Z M 18 14 C 19 14, 19 14, 19 15 L 19 16 C 20 16, 21 17, 22 18 C 22 18, 22 18, 21 18 C 21 19, 21 18, 21 18 C 20 17, 19 17, 18 17 C 17 17, 16 18, 16 19 C 16 20, 16 21, 18 21 C 21 21, 22 23, 22 24 C 22 26, 21 27, 19 27 L 19 28 C 19 29, 19 29, 18 29 C 18 29, 18 29, 18 28 L 18 27 C 17 27, 16 26, 15 25 C 15 25, 15 25, 15 25 C 16 24, 16 25, 16 25 C 17 26, 17 26, 18 26 C 20 26, 21 25, 21 24 C 21 23, 20 22, 18 22 C 16 22, 15 20, 15 19 C 15 17, 16 16, 18 16 L 18 15 C 18 14, 18 14, 18 14 Z M 26 12 L 27 14 C 27 14, 27 14, 27 14 L 27 29 C 27 29, 27 29, 27 29 L 26 31 L 32 31 L 31 29 C 31 29, 31 29, 31 29 L 31 14 C 31 14, 31 14, 31 14 L 32 12 L 26 12 Z M 13 12 L 11 15 L 11 28 L 13 31 L 24 31 L 26 28 L 26 15 L 24 12 L 13 12 Z M 5 12 L 6 14 C 6 14, 6 14, 6 14 L 6 29 C 6 29, 6 29, 6 29 L 5 31 L 11 31 L 10 29 C 10 29, 10 29, 10 29 L 10 14 C 10 14, 10 14, 10 14 L 11 12 L 5 12 Z M 18 5 L 14 8 L 23 8 L 18 5 Z M 18 4 C 18 4, 19 4, 19 4 L 25 8 C 25 8, 25 8, 25 8 C 25 9, 25 9, 25 9 L 12 9 C 12 9, 12 9, 12 8 C 11 8, 12 8, 12 8 L 18 4 Z M 18 1 L 3 10 L 34 10 L 18 1 Z M 18 0 C 18 0, 19 0, 19 0 L 37 11 C 37 11, 37 11, 37 11 C 37 11, 37 12, 36 12 L 34 12 L 32 15 L 32 28 L 34 31 L 36 31 C 37 31, 37 32, 37 32 L 37 36 C 37 37, 37 37, 36 37 L 1 37 C 0 37, 0 37, 0 36 L 0 32 C 0 32, 0 31, 1 31 L 3 31 L 5 28 L 5 15 L 3 12 L 1 12 C 0 12, 0 11, 0 11 C 0 11, 0 11, 0 11 L 18 0 Z"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 136,
    "y": 371,
    "width": 37,
    "height": 37,
    "fillColor": "#ffffff",
    "pathD": "M 11 31 L 14 31 C 14 31, 14 31, 14 32 C 14 32, 14 32, 14 32 L 11 32 C 10 32, 10 32, 10 32 C 10 31, 10 31, 11 31 Z M 4 31 L 8 31 C 8 31, 8 31, 8 32 C 8 32, 8 32, 8 32 L 4 32 C 4 32, 3 32, 3 32 C 3 31, 4 31, 4 31 Z M 8 27 L 15 27 C 16 27, 16 27, 16 27 C 16 28, 16 28, 15 28 L 8 28 C 8 28, 8 28, 8 27 C 8 27, 8 27, 8 27 Z M 4 27 L 5 27 C 6 27, 6 27, 6 27 C 6 28, 6 28, 5 28 L 4 28 C 4 28, 3 28, 3 27 C 3 27, 4 27, 4 27 Z M 30 26 C 30 26, 30 26, 30 27 L 30 28 C 30 28, 30 29, 30 29 L 32 29 C 32 29, 33 28, 33 28 L 33 27 C 33 26, 32 26, 32 26 L 30 26 Z M 23 26 C 23 26, 22 26, 22 27 L 22 28 C 22 28, 23 29, 23 29 L 24 29 C 25 29, 25 28, 25 28 L 25 27 C 25 26, 25 26, 24 26 L 23 26 Z M 30 25 L 32 25 C 33 25, 34 26, 34 27 L 34 28 C 34 29, 33 30, 32 30 L 30 30 C 29 30, 28 29, 28 28 L 28 27 C 28 26, 29 25, 30 25 Z M 23 25 L 24 25 C 26 25, 27 26, 27 27 L 27 28 C 27 29, 26 30, 24 30 L 23 30 C 22 30, 21 29, 21 28 L 21 27 C 21 26, 22 25, 23 25 Z M 8 22 L 15 22 C 16 22, 16 23, 16 23 C 16 23, 16 24, 15 24 L 8 24 C 8 24, 8 23, 8 23 C 8 23, 8 22, 8 22 Z M 4 22 L 5 22 C 6 22, 6 23, 6 23 C 6 23, 6 24, 5 24 L 4 24 C 4 24, 3 23, 3 23 C 3 23, 4 22, 4 22 Z M 30 19 C 30 19, 30 19, 30 20 L 30 21 C 30 21, 30 22, 30 22 L 32 22 C 32 22, 33 21, 33 21 L 33 20 C 33 19, 32 19, 32 19 L 30 19 Z M 23 19 C 23 19, 22 19, 22 20 L 22 21 C 22 21, 23 22, 23 22 L 24 22 C 25 22, 25 21, 25 21 L 25 20 C 25 19, 25 19, 24 19 L 23 19 Z M 4 18 L 11 18 C 11 18, 11 18, 11 19 C 11 19, 11 19, 11 19 L 4 19 C 4 19, 3 19, 3 19 C 3 18, 4 18, 4 18 Z M 30 17 L 32 17 C 33 17, 34 18, 34 20 L 34 21 C 34 22, 33 23, 32 23 L 30 23 C 29 23, 28 22, 28 21 L 28 20 C 28 18, 29 17, 30 17 Z M 23 17 L 24 17 C 26 17, 27 18, 27 20 L 27 21 C 27 22, 26 23, 24 23 L 23 23 C 22 23, 21 22, 21 21 L 21 20 C 21 18, 22 17, 23 17 Z M 19 15 L 19 31 C 19 32, 19 32, 20 32 L 35 32 C 36 32, 36 32, 36 31 L 36 15 L 19 15 Z M 8 14 L 15 14 C 16 14, 16 14, 16 14 C 16 15, 16 15, 15 15 L 8 15 C 8 15, 8 15, 8 14 C 8 14, 8 14, 8 14 Z M 4 14 L 5 14 C 6 14, 6 14, 6 14 C 6 15, 6 15, 5 15 L 4 15 C 4 15, 3 15, 3 14 C 3 14, 4 14, 4 14 Z M 33 11 C 33 11, 34 11, 34 11 C 34 11, 34 12, 34 12 C 34 12, 34 12, 34 12 C 34 12, 34 12, 34 12 C 33 12, 33 12, 33 12 C 33 12, 33 12, 33 12 C 33 12, 33 11, 33 11 Z M 27 11 C 27 11, 28 11, 28 11 C 28 11, 28 12, 28 12 C 28 12, 28 12, 28 12 C 28 12, 28 12, 28 12 C 27 12, 27 12, 27 12 C 27 12, 27 12, 27 12 C 27 12, 27 11, 27 11 Z M 30 11 C 31 11, 31 11, 31 12 C 31 12, 31 12, 30 12 C 30 12, 30 12, 30 12 C 30 11, 30 11, 30 11 Z M 8 9 L 15 9 C 16 9, 16 10, 16 10 C 16 10, 16 11, 15 11 L 8 11 C 8 11, 8 10, 8 10 C 8 10, 8 9, 8 9 Z M 4 9 L 5 9 C 6 9, 6 10, 6 10 C 6 10, 6 11, 5 11 L 4 11 C 4 11, 3 10, 3 10 C 3 10, 4 9, 4 9 Z M 20 9 C 19 9, 19 10, 19 10 L 19 14 L 36 14 L 36 10 C 36 10, 36 9, 35 9 L 20 9 Z M 8 1 L 8 3 C 8 4, 9 4, 10 4 L 20 4 C 21 4, 22 4, 22 3 L 22 1 L 8 1 Z M 3 1 C 2 1, 1 2, 1 3 L 1 34 C 1 35, 2 36, 3 36 L 27 36 C 28 36, 28 35, 28 34 L 28 33 L 20 33 C 19 33, 18 32, 18 31 L 18 10 C 18 9, 19 8, 20 8 L 28 8 L 28 3 C 28 2, 28 1, 27 1 L 23 1 L 23 3 C 23 4, 22 6, 20 6 L 10 6 C 8 6, 7 4, 7 3 L 7 1 L 3 1 Z M 3 0 L 27 0 C 28 0, 30 1, 30 3 L 30 8 L 35 8 C 36 8, 37 9, 37 10 L 37 31 C 37 32, 36 33, 35 33 L 30 33 L 30 34 C 30 36, 28 37, 27 37 L 3 37 C 1 37, 0 36, 0 34 L 0 3 C 0 1, 1 0, 3 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 136,
    "y": 170,
    "width": 37,
    "height": 37,
    "fillColor": "#ffffff",
    "pathD": "M 30 34 L 26 34 L 26 26 C 26 26, 26 25, 25 25 C 25 25, 25 26, 25 26 L 25 34 L 18 34 L 18 19 L 20 19 C 20 19, 20 19, 20 19 L 21 17 L 23 20 C 23 21, 23 21, 23 22 C 23 23, 24 24, 25 24 C 27 24, 28 23, 28 22 C 28 22, 28 22, 28 21 L 30 20 L 30 34 Z M 17 15 L 17 15 C 17 15, 16 15, 16 15 L 16 18 L 14 19 C 14 19, 14 19, 14 19 L 12 22 C 12 22, 12 22, 12 22 C 11 22, 10 23, 9 24 L 8 24 C 7 24, 7 24, 7 24 L 3 29 L 3 12 L 8 8 L 11 13 C 12 13, 12 13, 12 13 L 15 13 C 15 13, 16 14, 17 14 C 17 14, 18 14, 18 14 L 20 17 L 20 18 L 18 18 L 18 15 C 18 15, 17 15, 17 15 Z M 13 25 L 13 25 C 13 25, 12 26, 12 26 C 11 26, 10 25, 10 25 C 10 24, 11 23, 12 23 C 12 23, 13 24, 13 25 Z M 16 34 L 12 34 L 12 29 C 12 29, 12 28, 12 28 C 11 28, 11 29, 11 29 L 11 34 L 3 34 L 3 31 L 8 25 L 9 25 C 9 26, 10 27, 12 27 C 13 27, 14 26, 14 25 C 14 24, 14 23, 13 23 L 15 20 L 16 20 L 16 34 Z M 17 10 L 17 10 C 18 10, 18 11, 18 11 C 18 12, 18 13, 17 13 C 16 13, 16 12, 16 11 C 16 11, 16 10, 17 10 Z M 27 22 L 27 22 C 27 22, 26 23, 25 23 C 25 23, 24 22, 24 22 C 24 21, 25 20, 25 20 C 26 20, 27 21, 27 22 Z M 30 10 L 30 10 C 31 10, 32 11, 32 12 C 32 12, 31 13, 30 13 C 30 13, 29 12, 29 12 C 29 11, 30 10, 30 10 Z M 36 34 L 31 34 L 31 20 L 32 20 L 36 25 C 36 25, 36 26, 36 26 C 36 26, 37 26, 37 25 C 37 25, 37 25, 37 25 L 33 18 C 33 18, 33 18, 32 18 L 31 19 L 31 16 C 31 16, 31 15, 30 15 C 30 15, 30 16, 30 16 L 30 19 L 27 20 C 27 20, 26 19, 25 19 C 25 19, 25 19, 24 20 L 22 17 L 25 11 L 28 12 C 28 13, 29 14, 30 14 C 32 14, 33 13, 33 12 C 33 11, 33 11, 32 10 L 37 5 C 37 5, 37 5, 37 5 C 36 4, 36 4, 36 5 L 32 10 C 31 9, 31 9, 30 9 C 29 9, 29 10, 28 11 L 25 10 C 24 10, 24 10, 24 10 L 21 16 L 19 13 C 19 12, 19 12, 19 11 C 19 10, 18 9, 17 9 C 16 9, 15 10, 15 11 C 15 11, 15 11, 15 11 L 12 12 L 9 7 C 9 7, 9 7, 9 7 C 8 7, 8 7, 8 7 L 3 10 L 3 1 C 3 0, 3 0, 3 0 C 3 0, 2 0, 2 1 L 2 2 L 1 2 C 0 2, 0 2, 0 3 C 0 3, 0 3, 1 3 L 2 3 L 2 7 L 1 7 C 0 7, 0 8, 0 8 C 0 8, 0 9, 1 9 L 2 9 L 2 13 L 1 13 C 0 13, 0 13, 0 13 C 0 14, 0 14, 1 14 L 2 14 L 2 18 L 1 18 C 0 18, 0 18, 0 18 C 0 19, 0 19, 1 19 L 2 19 L 2 23 L 1 23 C 0 23, 0 23, 0 24 C 0 24, 0 24, 1 24 L 2 24 L 2 28 L 1 28 C 0 28, 0 29, 0 29 C 0 29, 0 29, 1 29 L 2 29 L 2 34 L 1 34 C 0 34, 0 34, 0 34 C 0 34, 0 35, 1 35 L 2 35 L 2 36 C 2 37, 3 37, 3 37 C 3 37, 3 37, 3 36 L 3 35 L 36 35 C 37 35, 37 34, 37 34 C 37 34, 37 34, 36 34 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates61Template({ data }: { data: BrainData }): ReactElement {
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
