import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "dataNodeIdx": 1,
    "x": 982,
    "y": 139,
    "width": 141,
    "height": 36,
    "text": "Your title 6",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 1,
    "x": 986,
    "y": 180,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 5,
    "x": 982,
    "y": 517,
    "width": 141,
    "height": 36,
    "text": "Your title 4",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 5,
    "x": 986,
    "y": 558,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 3,
    "x": 982,
    "y": 328,
    "width": 141,
    "height": 36,
    "text": "Your title 05",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 3,
    "x": 986,
    "y": 369,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 153,
    "y": 139,
    "width": 141,
    "height": 36,
    "text": "Your title 1",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 0,
    "x": 80,
    "y": 180,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 4,
    "x": 153,
    "y": 517,
    "width": 141,
    "height": 36,
    "text": "Your title 3",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 4,
    "x": 80,
    "y": 558,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 2,
    "x": 153,
    "y": 328,
    "width": 141,
    "height": 36,
    "text": "Your title 2",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 2,
    "x": 80,
    "y": 369,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 644,
    "y": 192,
    "width": 164,
    "height": 150,
    "fillColor": "#4a90d9",
    "pathD": "M 0 0 L 6 0 C 73 4, 131 40, 164 95 L 164 95 L 68 150 L 67 148 C 53 128, 31 114, 5 111 L 0 111 L 0 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 472,
    "y": 192,
    "width": 164,
    "height": 150,
    "pathD": "M 164 0 L 164 111 L 159 111 C 133 114, 111 128, 97 148 L 96 150 L 0 95 L 0 95 C 33 40, 91 4, 158 0 L 164 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 716,
    "y": 293,
    "width": 120,
    "height": 189,
    "fillColor": "#ee6d90",
    "pathD": "M 96 0 L 96 1 C 111 29, 120 61, 120 94 C 120 128, 111 160, 96 188 L 96 189 L 0 134 L 3 128 C 7 118, 10 106, 10 94 C 10 83, 7 71, 3 61 L 0 55 L 96 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 444,
    "y": 293,
    "width": 120,
    "height": 189,
    "fillColor": "#ff4d38",
    "pathD": "M 24 0 L 120 55 L 117 61 C 113 71, 110 83, 110 94 C 110 106, 113 118, 117 128 L 120 134 L 24 189 L 24 188 C 9 160, 0 128, 0 94 C 0 61, 9 29, 24 1 L 24 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 472,
    "y": 434,
    "width": 164,
    "height": 150,
    "fillColor": "#52c49c",
    "pathD": "M 96 0 L 97 2 C 111 22, 133 36, 159 39 L 164 39 L 164 150 L 158 150 C 91 146, 33 110, 0 55 L 0 55 L 96 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 644,
    "y": 434,
    "width": 164,
    "height": 150,
    "fillColor": "#ffb900",
    "pathD": "M 68 0 L 164 55 L 164 55 C 131 110, 73 146, 6 150 L 0 150 L 0 39 L 5 39 C 31 36, 53 22, 67 2 L 68 0 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 550,
    "y": 242,
    "width": 41,
    "height": 42,
    "fillColor": "#ffffff",
    "pathD": "M 22 38 L 23 38 C 23 38, 23 38, 23 38 C 23 39, 23 39, 23 39 L 22 39 C 21 39, 21 39, 21 38 C 21 38, 21 38, 22 38 Z M 15 38 L 18 38 C 18 38, 18 38, 18 38 C 18 39, 18 39, 18 39 L 15 39 C 14 39, 14 39, 14 38 C 14 38, 14 38, 15 38 Z M 9 38 L 10 38 C 11 38, 11 38, 11 38 C 11 39, 11 39, 10 39 L 9 39 C 9 39, 9 39, 9 38 C 9 38, 9 38, 9 38 Z M 1 35 L 1 38 C 1 39, 3 41, 4 41 L 28 41 C 30 41, 31 39, 31 38 L 31 35 L 1 35 Z M 22 18 L 25 23 L 31 23 L 34 18 L 22 18 Z M 25 12 C 26 13, 26 13, 26 13 L 23 17 L 33 17 L 31 13 C 31 13, 31 13, 31 12 C 31 12, 32 12, 32 13 L 35 17 L 36 17 C 36 17, 37 17, 37 17 C 37 18, 36 18, 36 18 L 36 18 L 32 24 C 32 25, 32 25, 32 25 L 25 25 C 25 25, 24 25, 24 24 L 21 18 L 20 18 C 20 18, 20 18, 20 17 C 20 17, 20 17, 20 17 L 22 17 L 24 13 C 25 12, 25 12, 25 12 Z M 28 7 C 22 7, 17 12, 17 18 C 17 20, 17 22, 18 24 C 19 24, 19 25, 19 25 L 17 29 L 22 28 C 22 28, 22 28, 22 28 C 22 28, 22 28, 22 28 C 24 29, 26 30, 28 30 C 35 30, 40 25, 40 18 C 40 12, 35 7, 28 7 Z M 22 3 C 23 3, 23 4, 23 4 C 23 4, 23 5, 22 5 C 22 5, 21 4, 21 4 C 21 4, 22 3, 22 3 Z M 13 3 L 19 3 C 19 3, 20 4, 20 4 C 20 4, 19 5, 19 5 L 13 5 C 13 5, 12 4, 12 4 C 12 4, 13 3, 13 3 Z M 4 1 C 3 1, 1 3, 1 4 L 1 34 L 31 34 L 31 31 C 30 31, 29 31, 28 31 C 26 31, 24 30, 22 29 L 16 31 C 16 31, 16 31, 16 31 C 16 31, 16 31, 16 31 C 16 31, 15 30, 16 30 L 17 25 C 16 23, 16 21, 16 18 C 16 12, 21 6, 28 6 C 29 6, 30 6, 31 6 L 31 4 C 31 3, 30 1, 28 1 L 4 1 Z M 4 0 L 28 0 C 31 0, 32 2, 32 4 L 32 7 C 37 8, 41 13, 41 18 C 41 24, 37 29, 32 30 L 32 38 C 32 40, 31 42, 28 42 L 4 42 C 2 42, 0 40, 0 38 L 0 4 C 0 2, 2 0, 4 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 549,
    "y": 489,
    "width": 42,
    "height": 43,
    "fillColor": "#ffffff",
    "pathD": "M 26 39 C 25 39, 25 40, 25 40 C 25 41, 25 42, 26 42 C 27 42, 27 41, 27 40 C 27 40, 27 39, 26 39 Z M 16 39 C 15 39, 15 40, 15 40 C 15 41, 15 42, 16 42 C 17 42, 17 41, 17 40 C 17 40, 17 39, 16 39 Z M 16 38 C 17 38, 18 39, 19 40 L 24 40 C 24 39, 25 38, 26 38 C 27 38, 29 39, 29 40 C 29 42, 27 43, 26 43 C 25 43, 24 42, 24 41 L 19 41 C 18 42, 17 43, 16 43 C 15 43, 14 42, 14 40 C 14 39, 15 38, 16 38 Z M 26 29 L 25 35 L 27 35 C 28 35, 28 35, 29 34 L 30 29 L 26 29 Z M 20 28 L 19 35 L 24 35 L 25 29 L 20 28 Z M 14 27 L 14 34 C 14 34, 15 35, 15 35 L 18 35 L 19 28 L 14 27 Z M 11 23 C 13 23, 14 24, 14 26 L 31 28 C 32 28, 32 28, 32 28 C 32 29, 32 29, 32 29 L 30 35 C 29 36, 28 36, 27 36 L 15 36 C 14 36, 13 35, 13 34 L 13 27 C 13 25, 12 24, 11 24 C 11 24, 10 24, 10 24 C 10 23, 11 23, 11 23 Z M 32 15 L 32 15 C 32 17, 33 18, 35 18 L 38 18 C 40 18, 41 17, 41 15 L 41 15 L 32 15 Z M 22 15 L 22 15 C 22 17, 23 18, 24 18 L 28 18 C 29 18, 31 17, 31 15 L 31 15 L 22 15 Z M 11 15 L 11 15 C 11 17, 13 18, 14 18 L 18 18 C 19 18, 20 17, 20 15 L 20 15 L 11 15 Z M 1 15 L 1 15 C 1 17, 3 18, 4 18 L 7 18 C 9 18, 10 17, 10 15 L 10 15 L 1 15 Z M 30 10 L 32 14 L 40 14 L 36 10 L 30 10 Z M 22 10 L 22 14 L 30 14 L 28 10 L 22 10 Z M 14 10 L 12 14 L 20 14 L 20 10 L 14 10 Z M 6 10 L 2 14 L 10 14 L 12 10 L 6 10 Z M 32 5 C 32 4, 32 4, 32 5 C 33 5, 33 5, 33 5 C 33 5, 33 5, 32 6 C 32 6, 32 6, 32 6 C 32 6, 32 6, 32 6 C 31 5, 31 5, 31 5 C 31 5, 31 5, 32 5 Z M 24 5 C 24 4, 25 4, 25 5 C 25 5, 25 5, 25 5 C 25 5, 25 5, 25 6 C 25 6, 24 6, 24 6 C 24 6, 24 6, 24 6 C 24 5, 24 5, 24 5 C 24 5, 24 5, 24 5 Z M 28 4 C 29 4, 29 5, 29 5 C 29 5, 29 6, 28 6 C 28 6, 28 5, 28 5 C 28 5, 28 4, 28 4 Z M 6 1 L 6 9 L 36 9 L 36 1 L 6 1 Z M 6 0 L 36 0 C 37 0, 37 0, 37 1 L 37 9 L 42 14 C 42 14, 42 14, 42 14 L 42 15 C 42 18, 40 19, 38 19 L 37 19 L 37 42 C 37 43, 37 43, 36 43 L 30 43 C 30 43, 30 43, 30 42 C 30 42, 30 41, 30 41 L 36 41 L 36 19 L 35 19 C 33 19, 32 19, 31 18 C 30 19, 29 19, 28 19 L 24 19 C 23 19, 22 19, 21 18 C 20 19, 19 19, 18 19 L 14 19 C 13 19, 12 19, 11 18 C 10 19, 9 19, 7 19 L 6 19 L 6 41 L 12 41 C 12 41, 12 42, 12 42 C 12 43, 12 43, 12 43 L 6 43 C 5 43, 5 43, 5 42 L 5 19 L 4 19 C 2 19, 0 18, 0 15 L 0 14 C 0 14, 0 14, 0 14 L 5 9 L 5 1 C 5 0, 5 0, 6 0 Z"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 759,
    "y": 367,
    "width": 42,
    "height": 42,
    "fillColor": "#ffffff",
    "pathD": "M 30 29 L 27 20 L 36 23 L 32 25 C 32 25, 32 25, 32 25 L 30 29 Z M 41 30 L 31 30 L 33 26 L 38 24 C 38 24, 39 24, 39 23 C 39 23, 38 23, 38 23 L 30 20 L 30 16 C 30 16, 30 16, 29 16 C 29 16, 29 16, 29 16 L 29 20 L 26 19 C 26 19, 26 19, 26 19 C 25 19, 25 19, 25 19 L 27 24 L 13 24 L 13 8 L 29 8 L 29 11 C 28 12, 22 18, 21 19 L 17 15 C 17 15, 16 15, 16 15 C 16 16, 16 16, 16 16 L 20 21 C 21 21, 21 21, 21 21 C 30 12, 30 12, 30 12 L 30 7 C 30 7, 30 7, 29 7 L 13 7 C 12 7, 12 7, 12 7 L 12 24 C 12 25, 12 25, 13 25 L 27 25 L 30 31 C 30 32, 30 32, 30 32 L 41 32 L 41 34 C 41 35, 40 36, 39 36 L 3 36 C 2 36, 1 35, 1 34 L 1 32 L 27 32 C 27 32, 27 32, 27 31 C 27 31, 27 30, 27 30 L 1 30 L 1 3 C 1 2, 2 1, 3 1 L 39 1 C 40 1, 41 2, 41 3 L 41 30 Z M 28 41 L 14 41 L 14 37 L 28 37 L 28 41 Z M 39 0 L 3 0 C 1 0, 0 1, 0 3 L 0 34 C 0 35, 1 37, 3 37 L 13 37 L 13 41 L 8 41 C 8 41, 8 41, 8 41 C 8 42, 8 42, 8 42 L 34 42 C 34 42, 34 42, 34 41 C 34 41, 34 41, 34 41 L 29 41 L 29 37 L 39 37 C 40 37, 42 35, 42 34 L 42 3 C 42 1, 40 0, 39 0 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 478,
    "y": 367,
    "width": 42,
    "height": 42,
    "fillColor": "#ffffff",
    "pathD": "M 18 35 L 30 35 C 30 35, 30 36, 30 36 C 30 36, 30 37, 30 37 L 18 37 C 18 37, 18 36, 18 36 C 18 36, 18 35, 18 35 Z M 6 35 L 14 35 C 14 35, 14 36, 14 36 C 14 36, 14 37, 14 37 L 6 37 C 5 37, 5 36, 5 36 C 5 36, 5 35, 6 35 Z M 32 30 L 36 30 C 37 30, 37 31, 37 31 C 37 31, 37 32, 36 32 L 32 32 C 31 32, 31 31, 31 31 C 31 31, 31 30, 32 30 Z M 23 30 L 28 30 C 28 30, 28 31, 28 31 C 28 31, 28 32, 28 32 L 23 32 C 23 32, 22 31, 22 31 C 22 31, 23 30, 23 30 Z M 14 30 L 19 30 C 19 30, 19 31, 19 31 C 19 31, 19 32, 19 32 L 14 32 C 14 32, 14 31, 14 31 C 14 31, 14 30, 14 30 Z M 6 30 L 10 30 C 11 30, 11 31, 11 31 C 11 31, 11 32, 10 32 L 6 32 C 5 32, 5 31, 5 31 C 5 31, 5 30, 6 30 Z M 33 19 C 33 19, 32 20, 31 20 C 31 20, 31 20, 31 20 C 32 21, 32 22, 31 23 C 31 23, 31 23, 31 23 C 32 24, 33 24, 33 24 C 34 24, 35 23, 35 22 C 35 20, 34 19, 33 19 Z M 33 18 C 35 18, 37 20, 37 22 C 37 24, 35 25, 33 25 C 32 25, 31 25, 31 24 C 31 24, 31 24, 31 24 C 30 25, 29 25, 28 25 C 27 25, 26 25, 26 24 C 25 24, 25 24, 26 23 C 26 23, 26 23, 27 23 C 28 24, 29 24, 30 23 C 31 23, 31 21, 30 20 C 30 20, 30 19, 30 19 C 30 19, 30 19, 31 19 C 31 19, 31 19, 31 19 C 31 19, 32 18, 33 18 Z M 6 18 L 11 18 C 11 18, 12 18, 12 19 C 12 19, 11 19, 11 19 L 6 19 C 6 19, 6 20, 6 20 L 6 24 C 6 24, 6 24, 6 24 L 13 24 C 13 24, 13 24, 13 24 L 13 23 C 13 22, 14 22, 14 22 C 14 22, 15 22, 15 23 L 15 24 C 15 25, 14 25, 13 25 L 6 25 C 6 25, 5 25, 5 24 L 5 20 C 5 19, 6 18, 6 18 Z M 3 15 C 2 15, 1 16, 1 17 L 1 39 C 1 40, 2 41, 3 41 L 39 41 C 40 41, 41 40, 41 39 L 41 17 C 41 16, 40 15, 39 15 L 32 15 C 30 20, 22 26, 21 27 C 21 27, 21 27, 21 27 C 21 27, 21 27, 21 27 C 20 26, 12 20, 10 15 L 3 15 Z M 21 8 C 20 8, 19 9, 19 10 C 19 10, 20 11, 20 11 C 20 11, 20 12, 20 12 L 19 16 L 23 16 L 22 12 C 22 12, 22 11, 22 11 C 22 11, 23 10, 23 10 C 23 9, 22 8, 21 8 Z M 21 7 C 23 7, 24 8, 24 10 C 24 11, 24 11, 23 12 L 24 17 C 24 17, 24 17, 24 17 C 24 17, 24 17, 23 17 L 19 17 C 18 17, 18 17, 18 17 C 18 17, 18 17, 18 17 L 19 12 C 18 11, 18 11, 18 10 C 18 8, 19 7, 21 7 Z M 21 1 L 11 4 L 11 13 C 11 18, 19 24, 21 25 C 23 24, 31 18, 31 13 L 31 4 L 21 1 Z M 21 0 C 21 0, 21 0, 21 0 L 31 3 C 32 3, 32 4, 32 4 L 32 13 C 32 13, 32 14, 32 14 L 39 14 C 41 14, 42 15, 42 17 L 42 39 C 42 41, 41 42, 39 42 L 3 42 C 1 42, 0 41, 0 39 L 0 17 C 0 15, 1 14, 3 14 L 10 14 C 10 14, 10 13, 10 13 L 10 4 C 10 4, 10 3, 11 3 L 21 0 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 687,
    "y": 489,
    "width": 42,
    "height": 42,
    "fillColor": "#ffffff",
    "pathD": "M 18 38 L 24 38 C 24 38, 25 39, 25 39 C 25 39, 24 39, 24 39 L 18 39 C 18 39, 18 39, 18 39 C 18 39, 18 38, 18 38 Z M 1 37 L 1 39 C 1 40, 2 41, 3 41 L 39 41 C 40 41, 41 40, 41 39 L 41 37 L 1 37 Z M 4 30 L 2 36 L 40 36 L 38 30 L 4 30 Z M 29 10 C 29 10, 30 10, 30 10 C 30 11, 30 11, 30 11 L 21 20 C 21 20, 21 20, 21 20 C 21 20, 21 20, 21 20 L 16 16 C 16 15, 16 15, 16 15 C 17 15, 17 15, 17 15 L 21 19 L 29 10 Z M 21 6 C 23 6, 25 7, 26 8 C 27 8, 27 8, 27 9 C 26 9, 26 9, 26 9 C 24 8, 23 7, 21 7 C 17 7, 13 11, 13 15 L 13 25 L 16 22 C 16 22, 17 22, 17 22 C 18 23, 20 23, 21 23 C 25 23, 28 20, 29 17 C 29 16, 29 16, 29 16 C 30 16, 30 17, 30 17 C 29 21, 25 24, 21 24 C 19 24, 18 24, 17 23 L 13 27 C 13 27, 13 27, 12 27 C 12 27, 12 27, 12 27 C 12 27, 12 27, 12 27 L 12 15 C 12 10, 16 6, 21 6 Z M 7 1 C 6 1, 5 2, 5 3 L 5 29 L 37 29 L 37 3 C 37 2, 36 1, 35 1 L 7 1 Z M 7 0 L 35 0 C 37 0, 39 1, 39 3 L 39 29 L 42 36 C 42 36, 42 36, 42 36 L 42 39 C 42 41, 41 42, 39 42 L 3 42 C 1 42, 0 41, 0 39 L 0 36 C 0 36, 0 36, 0 36 L 3 29 L 3 3 C 3 1, 5 0, 7 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 687,
    "y": 242,
    "width": 42,
    "height": 42,
    "fillColor": "#ffffff",
    "pathD": "M 17 34 C 16 34, 15 35, 15 36 C 15 37, 16 37, 17 37 C 18 37, 18 37, 18 36 C 18 35, 18 34, 17 34 Z M 17 33 C 18 33, 19 34, 19 36 C 19 37, 18 39, 17 39 C 15 39, 14 37, 14 36 C 14 34, 15 33, 17 33 Z M 10 27 C 9 27, 8 28, 8 29 C 8 30, 9 30, 10 30 C 11 30, 11 30, 11 29 C 11 28, 11 27, 10 27 Z M 18 27 C 18 27, 19 27, 19 27 C 19 27, 19 27, 19 28 L 9 38 C 9 38, 8 38, 8 38 C 8 38, 8 38, 8 38 C 8 38, 8 37, 8 37 L 18 27 Z M 10 26 C 11 26, 12 27, 12 29 C 12 30, 11 32, 10 32 C 8 32, 7 30, 7 29 C 7 27, 8 26, 10 26 Z M 4 22 L 1 41 L 25 41 L 23 22 L 21 22 L 21 24 C 21 24, 20 24, 20 24 C 20 24, 20 24, 20 24 L 20 22 L 7 22 L 7 24 C 7 24, 7 24, 7 24 C 6 24, 6 24, 6 24 L 6 22 L 4 22 Z M 13 15 C 10 15, 8 17, 7 20 L 20 20 C 19 17, 17 15, 13 15 Z M 13 14 C 17 14, 20 17, 21 20 L 24 20 C 24 20, 24 21, 24 21 L 27 41 C 27 41, 27 42, 27 42 C 26 42, 26 42, 26 42 L 1 42 C 0 42, 0 42, 0 42 C 0 42, 0 41, 0 41 L 3 21 C 3 21, 3 20, 3 20 L 6 20 C 6 17, 9 14, 13 14 Z M 27 1 C 23 1, 21 4, 21 7 L 21 9 L 33 9 L 33 7 C 33 4, 30 1, 27 1 Z M 27 0 C 31 0, 34 3, 34 7 L 34 9 L 38 9 C 38 9, 39 9, 39 9 L 42 36 C 42 36, 42 37, 42 37 C 42 37, 42 37, 41 37 L 28 37 C 28 37, 27 37, 27 36 C 27 36, 28 36, 28 36 L 41 36 L 40 31 L 27 31 C 27 31, 27 31, 27 30 C 27 30, 27 30, 27 30 L 40 30 L 37 10 L 34 10 L 34 13 C 34 13, 34 13, 34 13 C 33 13, 33 13, 33 13 L 33 10 L 21 10 L 21 13 C 21 13, 20 13, 20 13 C 20 13, 19 13, 19 13 L 19 10 L 16 10 L 16 13 C 16 13, 16 13, 15 13 C 15 13, 15 13, 15 12 L 15 9 C 15 9, 16 9, 16 9 L 19 9 L 19 7 C 19 3, 23 0, 27 0 Z"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 323,
    "y": 345,
    "width": 86,
    "height": 86,
    "fillColor": "#ff4d38",
    "pathD": "M 43 0 A 43 43 0 1 1 43 0 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 323,
    "y": 156,
    "width": 86,
    "height": 86,
    "pathD": "M 43 0 A 43 43 0 1 1 43 0 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 323,
    "y": 534,
    "width": 86,
    "height": 86,
    "fillColor": "#52c49c",
    "pathD": "M 43 0 A 43 43 0 1 1 43 0 Z"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 871,
    "y": 345,
    "width": 86,
    "height": 86,
    "fillColor": "#ee6d90",
    "pathD": "M 43 0 A 43 43 0 1 1 43 0 Z"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 871,
    "y": 156,
    "width": 86,
    "height": 86,
    "fillColor": "#4a90d9",
    "pathD": "M 43 0 A 43 43 0 1 1 43 0 Z"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 871,
    "y": 534,
    "width": 86,
    "height": 86,
    "fillColor": "#ffb900",
    "pathD": "M 43 0 A 43 43 0 1 1 43 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 348,
    "y": 370,
    "width": 35,
    "height": 35,
    "fillColor": "#ffffff",
    "pathD": "M 15 29 L 25 29 C 25 29, 25 30, 25 30 C 25 30, 25 30, 25 30 L 15 30 C 15 30, 15 30, 15 30 C 15 30, 15 29, 15 29 Z M 5 29 L 12 29 C 12 29, 12 30, 12 30 C 12 30, 12 30, 12 30 L 5 30 C 4 30, 4 30, 4 30 C 4 30, 4 29, 5 29 Z M 26 25 L 30 25 C 31 25, 31 25, 31 26 C 31 26, 31 26, 30 26 L 26 26 C 26 26, 26 26, 26 26 C 26 25, 26 25, 26 25 Z M 19 25 L 23 25 C 23 25, 24 25, 24 26 C 24 26, 23 26, 23 26 L 19 26 C 19 26, 19 26, 19 26 C 19 25, 19 25, 19 25 Z M 12 25 L 16 25 C 16 25, 16 25, 16 26 C 16 26, 16 26, 16 26 L 12 26 C 12 26, 11 26, 11 26 C 11 25, 12 25, 12 25 Z M 5 25 L 9 25 C 9 25, 9 25, 9 26 C 9 26, 9 26, 9 26 L 5 26 C 4 26, 4 26, 4 26 C 4 25, 4 25, 5 25 Z M 28 16 C 27 16, 27 16, 26 17 C 26 17, 26 17, 26 17 C 27 18, 27 19, 26 20 C 26 20, 26 20, 26 20 C 27 20, 27 20, 28 20 C 29 20, 30 19, 30 18 C 30 17, 29 16, 28 16 Z M 28 15 C 29 15, 31 17, 31 18 C 31 20, 29 21, 28 21 C 27 21, 26 21, 26 20 C 26 20, 26 20, 26 20 C 25 21, 24 21, 24 21 C 23 21, 22 21, 21 20 C 21 20, 21 20, 21 20 C 22 19, 22 19, 22 20 C 23 20, 24 20, 25 20 C 26 19, 26 18, 25 17 C 25 17, 25 16, 25 16 C 25 16, 25 16, 26 16 C 26 16, 26 16, 26 16 C 26 15, 27 15, 28 15 Z M 5 15 L 9 15 C 10 15, 10 15, 10 16 C 10 16, 10 16, 9 16 L 5 16 C 5 16, 5 16, 5 16 L 5 20 C 5 20, 5 20, 5 20 L 11 20 C 11 20, 11 20, 11 20 L 11 19 C 11 19, 11 18, 12 18 C 12 18, 12 19, 12 19 L 12 20 C 12 21, 12 21, 11 21 L 5 21 C 5 21, 4 21, 4 20 L 4 16 C 4 16, 5 15, 5 15 Z M 3 12 C 2 12, 1 13, 1 14 L 1 32 C 1 33, 2 34, 3 34 L 32 34 C 33 34, 34 33, 34 32 L 34 14 C 34 13, 33 12, 32 12 L 26 12 C 25 17, 18 22, 18 22 C 18 22, 18 22, 18 22 C 17 22, 17 22, 17 22 C 17 22, 10 17, 9 12 L 3 12 Z M 18 7 C 17 7, 16 7, 16 8 C 16 9, 16 9, 17 9 C 17 9, 17 10, 17 10 L 16 13 L 19 13 L 18 10 C 18 10, 18 9, 18 9 C 19 9, 19 9, 19 8 C 19 7, 18 7, 18 7 Z M 18 6 C 19 6, 20 7, 20 8 C 20 9, 20 9, 19 10 L 20 14 C 20 14, 20 14, 20 14 C 20 14, 20 15, 19 15 L 16 15 C 15 15, 15 14, 15 14 C 15 14, 15 14, 15 14 L 16 10 C 15 9, 15 9, 15 8 C 15 7, 16 6, 18 6 Z M 18 1 L 10 4 L 10 11 C 10 15, 16 20, 18 21 C 19 20, 25 15, 25 11 L 25 4 L 18 1 Z M 17 0 C 17 0, 18 0, 18 0 L 26 3 C 26 3, 27 3, 27 3 L 27 11 C 27 11, 27 11, 27 11 L 32 11 C 34 11, 35 13, 35 14 L 35 32 C 35 34, 34 35, 32 35 L 3 35 C 1 35, 0 34, 0 32 L 0 14 C 0 13, 1 11, 3 11 L 8 11 C 8 11, 8 11, 8 11 L 8 3 C 8 3, 9 3, 9 3 L 17 0 Z"
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 349,
    "y": 181,
    "width": 34,
    "height": 35,
    "fillColor": "#ffffff",
    "pathD": "M 18 31 L 19 31 C 19 31, 19 32, 19 32 C 19 32, 19 32, 19 32 L 18 32 C 18 32, 17 32, 17 32 C 17 32, 18 31, 18 31 Z M 12 31 L 15 31 C 15 31, 15 32, 15 32 C 15 32, 15 32, 15 32 L 12 32 C 12 32, 12 32, 12 32 C 12 32, 12 31, 12 31 Z M 8 31 L 9 31 C 9 31, 9 32, 9 32 C 9 32, 9 32, 9 32 L 8 32 C 7 32, 7 32, 7 32 C 7 32, 7 31, 8 31 Z M 1 29 L 1 32 C 1 33, 2 34, 3 34 L 23 34 C 25 34, 26 33, 26 32 L 26 29 L 1 29 Z M 19 15 L 21 20 L 26 20 L 28 15 L 19 15 Z M 21 10 C 21 11, 21 11, 21 11 L 19 14 L 27 14 L 26 11 C 26 11, 26 11, 26 10 C 26 10, 26 10, 27 11 L 29 14 L 30 14 C 30 14, 30 14, 30 14 C 30 15, 30 15, 30 15 L 29 15 L 27 20 C 27 20, 27 21, 26 21 L 21 21 C 20 21, 20 20, 20 20 L 17 15 L 17 15 C 17 15, 16 15, 16 14 C 16 14, 17 14, 17 14 L 18 14 L 20 11 C 20 10, 21 10, 21 10 Z M 23 6 C 18 6, 14 10, 14 15 C 14 17, 14 19, 15 20 C 15 20, 15 20, 15 21 L 14 24 L 18 23 C 18 23, 18 23, 18 23 C 18 23, 18 23, 19 23 C 20 24, 22 25, 23 25 C 29 25, 33 21, 33 15 C 33 10, 29 6, 23 6 Z M 18 3 C 19 3, 19 3, 19 3 C 19 4, 19 4, 18 4 C 18 4, 18 4, 18 3 C 18 3, 18 3, 18 3 Z M 11 3 L 16 3 C 16 3, 16 3, 16 3 C 16 4, 16 4, 16 4 L 11 4 C 11 4, 10 4, 10 3 C 10 3, 11 3, 11 3 Z M 3 1 C 2 1, 1 2, 1 3 L 1 28 L 26 28 L 26 26 C 25 26, 24 26, 23 26 C 22 26, 20 25, 18 24 L 14 26 C 14 26, 13 26, 13 26 C 13 26, 13 26, 13 26 C 13 26, 13 25, 13 25 L 14 21 C 13 19, 13 17, 13 15 C 13 10, 18 5, 23 5 C 24 5, 25 5, 26 5 L 26 3 C 26 2, 25 1, 23 1 L 3 1 Z M 3 0 L 23 0 C 25 0, 27 2, 27 3 L 27 5 C 31 7, 34 11, 34 15 C 34 20, 31 24, 27 25 L 27 32 C 27 33, 25 35, 23 35 L 3 35 C 2 35, 0 33, 0 32 L 0 3 C 0 2, 2 0, 3 0 Z"
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 348,
    "y": 559,
    "width": 35,
    "height": 36,
    "fillColor": "#ffffff",
    "pathD": "M 22 33 C 21 33, 21 33, 21 34 C 21 34, 21 35, 22 35 C 22 35, 23 34, 23 34 C 23 33, 22 33, 22 33 Z M 14 33 C 13 33, 12 33, 12 34 C 12 34, 13 35, 14 35 C 14 35, 15 34, 15 34 C 15 33, 14 33, 14 33 Z M 14 32 C 14 32, 15 32, 16 33 L 20 33 C 20 32, 21 32, 22 32 C 23 32, 24 33, 24 34 C 24 35, 23 36, 22 36 C 21 36, 20 35, 20 34 L 16 34 C 15 35, 14 36, 14 36 C 12 36, 11 35, 11 34 C 11 33, 12 32, 14 32 Z M 22 24 L 21 29 L 23 29 C 23 29, 24 29, 24 29 L 25 25 L 22 24 Z M 17 23 L 16 29 L 20 29 L 21 24 L 17 23 Z M 12 23 L 12 28 C 12 29, 12 29, 13 29 L 15 29 L 16 23 L 12 23 Z M 9 19 C 10 19, 12 20, 12 22 L 26 24 C 26 24, 26 24, 27 24 C 27 24, 27 24, 27 24 L 25 29 C 24 30, 24 30, 23 30 L 13 30 C 12 30, 11 29, 11 28 L 11 22 C 11 21, 10 20, 9 20 C 9 20, 9 20, 9 20 C 9 20, 9 19, 9 19 Z M 27 13 L 27 13 C 27 14, 28 15, 29 15 L 32 15 C 33 15, 34 14, 34 13 L 34 13 L 27 13 Z M 18 13 L 18 13 C 18 14, 19 15, 20 15 L 23 15 C 24 15, 25 14, 25 13 L 25 13 L 18 13 Z M 10 13 L 10 13 C 10 14, 11 15, 12 15 L 15 15 C 16 15, 17 14, 17 13 L 17 13 L 10 13 Z M 1 13 L 1 13 C 1 14, 2 15, 3 15 L 6 15 C 7 15, 8 14, 8 13 L 8 13 L 1 13 Z M 25 8 L 26 12 L 33 12 L 30 8 L 25 8 Z M 18 8 L 18 12 L 25 12 L 24 8 L 18 8 Z M 11 8 L 10 12 L 17 12 L 17 8 L 11 8 Z M 5 8 L 2 12 L 9 12 L 10 8 L 5 8 Z M 26 4 C 26 4, 27 4, 27 4 C 27 4, 27 4, 27 4 C 27 4, 27 5, 27 5 C 27 5, 27 5, 27 5 C 27 5, 26 5, 26 5 C 26 5, 26 4, 26 4 C 26 4, 26 4, 26 4 Z M 20 4 C 20 4, 20 4, 21 4 C 21 4, 21 4, 21 4 C 21 4, 21 5, 21 5 C 21 5, 20 5, 20 5 C 20 5, 20 5, 20 5 C 20 5, 20 4, 20 4 C 20 4, 20 4, 20 4 Z M 23 4 C 24 4, 24 4, 24 4 C 24 5, 24 5, 23 5 C 23 5, 23 5, 23 4 C 23 4, 23 4, 23 4 Z M 5 1 L 5 7 L 30 7 L 30 1 L 5 1 Z M 5 0 L 30 0 C 31 0, 31 0, 31 1 L 31 8 L 35 12 C 35 12, 35 12, 35 12 L 35 13 C 35 15, 33 16, 32 16 L 31 16 L 31 35 C 31 36, 31 36, 30 36 L 25 36 C 25 36, 25 36, 25 35 C 25 35, 25 35, 25 35 L 30 35 L 30 16 L 29 16 C 28 16, 27 16, 26 15 C 25 16, 24 16, 23 16 L 20 16 C 19 16, 18 16, 18 15 C 17 16, 16 16, 15 16 L 12 16 C 11 16, 10 16, 9 15 C 8 16, 7 16, 6 16 L 5 16 L 5 35 L 10 35 C 10 35, 10 35, 10 35 C 10 36, 10 36, 10 36 L 5 36 C 4 36, 4 36, 4 35 L 4 16 L 3 16 C 2 16, 0 15, 0 13 L 0 12 C 0 12, 0 12, 0 12 L 4 8 L 4 1 C 4 0, 4 0, 5 0 Z"
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 896,
    "y": 559,
    "width": 35,
    "height": 35,
    "fillColor": "#ffffff",
    "pathD": "M 15 32 L 20 32 C 20 32, 21 32, 21 32 C 21 33, 20 33, 20 33 L 15 33 C 15 33, 15 33, 15 32 C 15 32, 15 32, 15 32 Z M 1 31 L 1 32 C 1 33, 2 34, 3 34 L 32 34 C 33 34, 34 33, 34 32 L 34 31 L 1 31 Z M 4 25 L 1 30 L 34 30 L 31 25 L 4 25 Z M 24 9 C 24 9, 25 9, 25 9 C 25 9, 25 9, 25 9 L 18 17 C 18 17, 18 17, 18 17 C 17 17, 17 17, 17 17 L 14 13 C 13 13, 13 13, 14 12 C 14 12, 14 12, 14 12 L 18 16 L 24 9 Z M 17 5 C 19 5, 21 5, 22 6 C 22 7, 22 7, 22 7 C 22 7, 22 7, 21 7 C 20 6, 19 6, 17 6 C 14 6, 11 9, 11 13 L 11 21 L 13 18 C 14 18, 14 18, 14 18 C 15 19, 16 19, 17 19 C 21 19, 23 17, 24 14 C 24 14, 24 14, 24 14 C 25 14, 25 14, 25 14 C 24 18, 21 20, 17 20 C 16 20, 15 20, 14 19 L 11 23 C 11 23, 11 23, 10 23 C 10 23, 10 23, 10 23 C 10 23, 10 22, 10 22 L 10 13 C 10 8, 13 5, 17 5 Z M 5 1 C 5 1, 4 2, 4 3 L 4 24 L 31 24 L 31 3 C 31 2, 30 1, 30 1 L 5 1 Z M 5 0 L 30 0 C 31 0, 32 1, 32 3 L 32 24 L 35 30 C 35 30, 35 30, 35 30 L 35 32 C 35 34, 34 35, 32 35 L 3 35 C 1 35, 0 34, 0 32 L 0 30 C 0 30, 0 30, 0 30 L 3 24 L 3 3 C 3 1, 4 0, 5 0 Z"
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 896,
    "y": 370,
    "width": 35,
    "height": 35,
    "fillColor": "#ffffff",
    "pathD": "M 25 25 L 23 17 L 30 20 L 27 21 C 27 21, 27 21, 27 21 L 25 25 Z M 34 25 L 26 25 L 28 22 L 32 20 C 32 20, 32 20, 32 19 C 32 19, 32 19, 32 19 L 25 17 L 25 14 C 25 13, 25 13, 25 13 C 24 13, 24 13, 24 14 L 24 16 L 22 16 C 22 16, 21 16, 21 16 C 21 16, 21 16, 21 16 L 22 20 L 11 20 L 11 7 L 24 7 L 24 9 C 23 10, 19 15, 17 16 L 14 13 C 14 13, 13 13, 13 13 C 13 13, 13 13, 13 14 L 17 17 C 17 17, 17 17, 18 17 C 25 10, 25 10, 25 10 L 25 6 C 25 6, 25 6, 25 6 L 10 6 C 10 6, 10 6, 10 6 L 10 20 C 10 21, 10 21, 10 21 L 23 21 L 25 26 C 25 26, 25 26, 25 26 L 34 26 L 34 28 C 34 29, 33 30, 32 30 L 3 30 C 2 30, 1 29, 1 28 L 1 26 L 22 26 C 23 26, 23 26, 23 26 C 23 26, 23 25, 22 25 L 1 25 L 1 3 C 1 2, 2 1, 3 1 L 32 1 C 33 1, 34 2, 34 3 L 34 25 Z M 23 34 L 12 34 L 12 31 L 23 31 L 23 34 Z M 32 0 L 3 0 C 1 0, 0 1, 0 3 L 0 28 C 0 30, 1 31, 3 31 L 11 31 L 11 34 L 7 34 C 7 34, 6 34, 6 34 C 6 35, 7 35, 7 35 L 28 35 C 28 35, 29 35, 29 34 C 29 34, 28 34, 28 34 L 24 34 L 24 31 L 32 31 C 34 31, 35 30, 35 28 L 35 3 C 35 1, 34 0, 32 0 Z"
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 896,
    "y": 181,
    "width": 35,
    "height": 35,
    "fillColor": "#ffffff",
    "pathD": "M 14 29 C 13 29, 13 29, 13 30 C 13 31, 13 31, 14 31 C 15 31, 15 31, 15 30 C 15 29, 15 29, 14 29 Z M 14 28 C 15 28, 16 29, 16 30 C 16 31, 15 32, 14 32 C 13 32, 12 31, 12 30 C 12 29, 13 28, 14 28 Z M 8 23 C 7 23, 7 23, 7 24 C 7 25, 7 25, 8 25 C 9 25, 9 25, 9 24 C 9 23, 9 23, 8 23 Z M 15 22 C 15 22, 15 22, 16 22 C 16 23, 16 23, 16 23 L 7 32 C 7 32, 7 32, 7 32 C 7 32, 7 32, 6 32 C 6 31, 6 31, 6 31 L 15 22 Z M 8 22 C 9 22, 10 23, 10 24 C 10 25, 9 26, 8 26 C 7 26, 6 25, 6 24 C 6 23, 7 22, 8 22 Z M 3 18 L 1 34 L 21 34 L 19 18 L 17 18 L 17 20 C 17 20, 17 20, 17 20 C 17 20, 16 20, 16 20 L 16 18 L 6 18 L 6 20 C 6 20, 6 20, 5 20 C 5 20, 5 20, 5 20 L 5 18 L 3 18 Z M 11 12 C 8 12, 6 14, 6 17 L 16 17 C 16 14, 14 12, 11 12 Z M 11 11 C 14 11, 17 14, 17 17 L 20 17 C 20 17, 20 17, 20 17 L 22 34 C 22 35, 22 35, 22 35 C 22 35, 22 35, 22 35 L 1 35 C 0 35, 0 35, 0 35 C 0 35, 0 35, 0 34 L 2 17 C 2 17, 2 17, 3 17 L 5 17 C 5 14, 8 11, 11 11 Z M 22 1 C 20 1, 17 3, 17 6 L 17 7 L 28 7 L 28 6 C 28 3, 25 1, 22 1 Z M 22 0 C 26 0, 29 3, 29 6 L 29 7 L 32 7 C 32 7, 32 7, 32 8 L 35 30 C 35 30, 35 30, 35 31 C 35 31, 35 31, 34 31 L 23 31 C 23 31, 23 31, 23 30 C 23 30, 23 30, 23 30 L 34 30 L 33 26 L 23 26 C 22 26, 22 26, 22 25 C 22 25, 22 25, 23 25 L 33 25 L 31 8 L 29 8 L 29 10 C 29 11, 28 11, 28 11 C 28 11, 28 11, 28 10 L 28 8 L 17 8 L 17 10 C 17 11, 17 11, 17 11 C 16 11, 16 11, 16 10 L 16 8 L 14 8 L 13 11 C 13 11, 13 11, 13 11 C 12 11, 12 11, 12 10 L 13 8 C 13 7, 13 7, 13 7 L 16 7 L 16 6 C 16 3, 19 0, 22 0 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates187Template({ data }: { data: BrainData }): ReactElement {
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
