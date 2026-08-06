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
    "x": 427,
    "y": 106,
    "width": 207,
    "height": 67
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 948,
    "y": 106,
    "width": 207,
    "height": 67
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 688,
    "y": 106,
    "width": 207,
    "height": 67
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 0,
    "x": 466,
    "y": 122,
    "width": 129,
    "height": 36,
    "text": "Column 01",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 1,
    "x": 726,
    "y": 122,
    "width": 129,
    "height": 36,
    "text": "Column 02",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 2,
    "x": 987,
    "y": 122,
    "width": 129,
    "height": 36,
    "text": "Column 03",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 209,
    "y": 73,
    "width": 67,
    "height": 291,
    "fillColor": "#3365cc",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 0,
    "x": 119,
    "y": 201,
    "width": 83,
    "height": 36,
    "text": "Row 1",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 324,
    "y": 201,
    "width": 36,
    "height": 36,
    "fillColor": "#ffffff",
    "pathD": "M 22 20 C 22 21, 21 22, 20 22 L 20 28 C 24 27, 27 24, 28 20 L 22 20 Z M 8 20 C 9 24, 12 27, 16 28 L 16 22 C 15 22, 14 21, 14 20 L 8 20 Z M 22 19 L 29 19 C 29 19, 29 19, 29 19 C 29 20, 29 20, 29 20 C 28 25, 25 28, 20 29 C 20 29, 20 29, 20 29 C 20 29, 20 29, 19 29 C 19 29, 19 29, 19 29 L 19 22 C 19 22, 19 22, 20 21 C 20 21, 21 20, 21 20 C 22 19, 22 19, 22 19 Z M 7 19 L 14 19 C 14 19, 14 19, 15 20 C 15 20, 16 21, 16 21 C 17 22, 17 22, 17 22 L 17 29 C 17 29, 17 29, 17 29 C 16 29, 16 29, 16 29 C 16 29, 16 29, 16 29 C 11 28, 8 25, 7 20 C 7 20, 7 20, 7 19 C 7 19, 7 19, 7 19 Z M 20 8 L 20 14 C 21 14, 22 15, 22 16 L 28 16 C 27 12, 24 9, 20 8 Z M 16 8 C 12 9, 9 12, 8 16 L 14 16 C 14 15, 15 14, 16 14 L 16 8 Z M 20 7 C 25 8, 28 11, 29 16 C 29 16, 29 16, 29 17 C 29 17, 29 17, 29 17 L 22 17 C 22 17, 22 17, 21 16 C 21 16, 20 15, 20 15 C 19 14, 19 14, 19 14 L 19 7 C 19 7, 19 7, 19 7 C 20 7, 20 7, 20 7 Z M 16 7 C 16 7, 16 7, 17 7 C 17 7, 17 7, 17 7 L 17 14 C 17 14, 17 14, 16 15 C 16 15, 15 16, 15 16 C 14 17, 14 17, 14 17 L 7 17 C 7 17, 7 17, 7 17 C 7 16, 7 16, 7 16 C 8 11, 11 8, 16 7 Z M 17 1 C 17 1, 16 1, 16 1 L 16 4 C 16 4, 16 4, 16 4 C 15 4, 14 5, 13 5 C 13 5, 12 5, 12 5 L 11 3 C 11 3, 11 3, 11 3 C 11 3, 11 3, 11 3 L 8 4 C 8 4, 8 4, 8 4 C 8 4, 8 4, 8 4 L 9 6 C 10 7, 10 7, 9 7 C 9 8, 8 9, 7 9 C 7 10, 7 10, 7 9 L 4 8 C 4 8, 4 8, 4 8 C 4 8, 4 8, 4 8 L 3 11 C 3 11, 3 11, 3 11 C 3 11, 3 11, 3 11 L 5 12 C 5 12, 5 13, 5 13 C 5 14, 4 15, 4 16 C 4 16, 4 16, 4 16 L 1 16 C 1 16, 1 17, 1 17 L 1 19 C 1 19, 1 20, 1 20 L 4 20 C 4 20, 4 20, 4 20 C 4 21, 5 22, 5 23 C 5 23, 5 24, 5 24 L 3 25 C 3 25, 3 25, 3 25 C 3 25, 3 25, 3 25 L 4 28 C 4 28, 4 28, 4 28 L 7 27 C 7 26, 7 26, 7 27 C 8 27, 9 28, 9 29 C 10 29, 10 29, 9 30 L 8 32 C 8 32, 8 32, 8 32 C 8 32, 8 32, 8 32 L 11 33 C 11 33, 11 33, 11 33 L 12 31 C 12 31, 13 31, 13 31 C 13 31, 13 31, 13 31 C 14 31, 15 32, 16 32 C 16 32, 16 32, 16 32 L 16 35 C 16 35, 17 35, 17 35 L 19 35 C 20 35, 20 35, 20 35 L 20 32 C 20 32, 20 32, 20 32 C 21 32, 22 31, 23 31 C 23 31, 24 31, 24 31 L 25 33 C 25 33, 25 33, 25 33 C 25 33, 25 33, 25 33 L 28 32 C 28 32, 28 32, 28 32 L 27 30 C 26 29, 26 29, 27 29 C 27 28, 28 27, 29 27 C 29 26, 29 26, 29 27 L 32 28 C 32 28, 32 28, 32 28 C 32 28, 32 28, 32 28 L 33 25 C 33 25, 33 25, 33 25 L 31 24 C 31 24, 31 23, 31 23 C 31 22, 32 21, 32 20 C 32 20, 32 20, 32 20 L 35 20 C 35 20, 35 19, 35 19 L 35 17 C 35 17, 35 16, 35 16 L 32 16 C 32 16, 32 16, 32 16 C 32 15, 31 14, 31 13 C 31 13, 31 12, 31 12 L 33 11 C 33 11, 33 11, 33 11 L 32 8 C 32 8, 32 8, 32 8 C 32 8, 32 8, 32 8 L 29 9 C 29 10, 29 10, 29 9 C 28 9, 27 8, 27 7 C 26 7, 26 7, 27 6 L 28 4 C 28 4, 28 4, 28 4 L 25 3 C 25 3, 25 3, 25 3 C 25 3, 25 3, 25 3 L 24 5 C 24 5, 23 5, 23 5 C 22 5, 21 4, 20 4 C 20 4, 20 4, 20 4 L 20 1 C 20 1, 20 1, 19 1 L 17 1 Z M 17 0 L 19 0 C 20 0, 21 1, 21 1 L 21 3 C 21 3, 22 4, 23 4 L 24 2 C 24 2, 24 2, 25 2 C 25 1, 26 2, 26 2 L 28 3 C 29 3, 29 4, 29 5 L 28 7 C 28 7, 29 8, 29 8 L 31 7 C 31 7, 32 7, 32 7 C 32 7, 33 8, 33 8 L 34 10 C 35 11, 34 12, 34 12 L 32 13 C 32 14, 33 14, 33 15 L 35 15 C 35 15, 36 16, 36 17 L 36 19 C 36 20, 35 21, 35 21 L 33 21 C 33 22, 32 22, 32 23 L 34 24 C 34 24, 35 25, 34 26 L 33 28 C 33 28, 32 29, 32 29 C 32 29, 31 29, 31 29 L 29 28 C 29 28, 28 29, 28 29 L 29 31 C 29 32, 29 33, 28 33 L 26 34 C 26 34, 25 35, 25 34 C 24 34, 24 34, 24 34 L 23 32 C 22 32, 21 33, 21 33 L 21 35 C 21 35, 20 36, 19 36 L 17 36 C 16 36, 15 35, 15 35 L 15 33 C 15 33, 14 32, 13 32 L 12 34 C 12 34, 12 34, 11 34 C 11 35, 10 34, 10 34 L 8 33 C 8 33, 7 32, 7 32 C 7 32, 7 31, 7 31 L 8 29 C 8 29, 7 28, 7 28 L 5 29 C 4 29, 3 29, 3 28 L 2 26 C 2 26, 2 25, 2 25 C 2 24, 2 24, 2 24 L 4 23 C 4 22, 3 22, 3 21 L 1 21 C 1 21, 0 20, 0 19 L 0 17 C 0 16, 1 15, 1 15 L 3 15 C 3 14, 4 14, 4 13 L 2 12 C 2 12, 2 12, 2 11 C 2 11, 2 10, 2 10 L 3 8 C 3 8, 4 7, 4 7 C 4 7, 5 7, 5 7 L 7 8 C 7 8, 8 7, 8 7 L 7 5 C 7 5, 7 4, 7 4 C 7 4, 8 3, 8 3 L 10 2 C 10 2, 11 1, 11 2 C 12 2, 12 2, 12 2 L 13 4 C 14 4, 15 3, 15 3 L 15 1 C 15 1, 16 0, 17 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 758,
    "y": -174,
    "width": 67,
    "height": 785,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 0,
    "x": 420,
    "y": 200,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 1,
    "x": 681,
    "y": 200,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 2,
    "x": 941,
    "y": 200,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 209,
    "y": 152,
    "width": 67,
    "height": 291,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 119,
    "y": 280,
    "width": 83,
    "height": 36,
    "text": "Row 2",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 324,
    "y": 280,
    "width": 36,
    "height": 36,
    "fillColor": "#ffffff",
    "pathD": "M 25 13 C 26 13, 26 13, 26 14 L 26 31 C 26 31, 26 32, 25 32 C 25 32, 25 31, 25 31 L 25 14 C 25 13, 25 13, 25 13 Z M 18 13 C 18 13, 19 13, 19 14 L 19 31 C 19 31, 18 32, 18 32 C 18 32, 18 31, 18 31 L 18 14 C 18 13, 18 13, 18 13 Z M 11 13 C 11 13, 11 13, 11 14 L 11 31 C 11 31, 11 32, 11 32 C 10 32, 10 31, 10 31 L 10 14 C 10 13, 10 13, 11 13 Z M 1 10 C 3 12, 3 15, 3 17 L 3 32 C 3 34, 5 35, 6 35 L 30 35 C 31 35, 33 34, 33 32 L 33 17 C 33 15, 33 12, 35 10 L 1 10 Z M 5 5 C 3 5, 1 7, 1 9 L 35 9 C 35 7, 33 5, 31 5 L 5 5 Z M 14 1 C 12 1, 11 3, 11 4 L 25 4 C 25 3, 24 1, 22 1 L 14 1 Z M 14 0 L 22 0 C 24 0, 26 2, 27 4 L 31 4 C 34 4, 36 7, 36 9 C 36 9, 36 9, 36 10 C 35 12, 34 14, 34 17 L 34 32 C 34 34, 32 36, 30 36 L 6 36 C 4 36, 2 34, 2 32 L 2 17 C 2 14, 1 12, 0 10 C 0 9, 0 9, 0 9 C 0 7, 2 4, 5 4 L 9 4 C 10 2, 12 0, 14 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 758,
    "y": -94,
    "width": 67,
    "height": 785,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 3,
    "x": 420,
    "y": 279,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 4,
    "x": 681,
    "y": 279,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 5,
    "x": 941,
    "y": 279,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 209,
    "y": 232,
    "width": 67,
    "height": 291,
    "fillColor": "#52c49c",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 119,
    "y": 360,
    "width": 83,
    "height": 36,
    "text": "Row 3",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 324,
    "y": 359,
    "width": 36,
    "height": 36,
    "fillColor": "#ffffff",
    "pathD": "M 11 8 L 8 11 C 8 12, 8 12, 8 13 L 13 18 C 13 18, 13 18, 13 18 C 13 18, 13 18, 13 18 L 8 23 C 8 24, 8 24, 8 25 L 11 28 C 12 28, 12 28, 13 28 L 17 23 L 14 20 C 14 20, 14 19, 14 19 C 14 19, 15 19, 15 19 L 23 28 C 24 28, 24 28, 25 28 L 28 25 C 28 24, 28 24, 28 23 L 23 18 C 23 18, 22 18, 22 18 C 22 18, 23 18, 23 18 L 28 13 C 28 12, 28 12, 28 11 L 25 8 C 24 8, 24 8, 23 8 L 19 13 L 22 16 C 22 16, 22 17, 22 17 C 22 17, 22 17, 22 17 C 21 17, 21 17, 21 17 L 13 8 C 12 8, 12 8, 11 8 Z M 12 7 C 12 7, 13 7, 13 8 L 18 12 L 23 8 C 23 7, 25 7, 26 8 L 28 10 C 29 11, 29 11, 29 12 C 29 12, 29 13, 28 13 L 24 18 L 28 23 C 29 23, 29 25, 28 26 L 26 28 C 25 29, 23 29, 23 28 L 18 24 L 13 28 C 13 29, 12 29, 12 29 C 11 29, 11 29, 10 28 L 8 26 C 7 25, 7 25, 7 24 C 7 24, 7 23, 8 23 L 12 18 L 8 13 C 7 13, 7 12, 7 12 C 7 11, 7 11, 8 10 L 10 8 C 11 7, 11 7, 12 7 Z M 11 1 C 5 1, 1 5, 1 11 L 1 25 C 1 31, 5 35, 11 35 L 25 35 C 31 35, 35 31, 35 25 L 35 11 C 35 5, 31 1, 25 1 L 11 1 Z M 11 0 L 25 0 C 31 0, 36 5, 36 11 L 36 25 C 36 31, 31 36, 25 36 L 11 36 C 5 36, 0 31, 0 25 L 0 11 C 0 5, 5 0, 11 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 758,
    "y": -15,
    "width": 67,
    "height": 785,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 6,
    "x": 420,
    "y": 359,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 7,
    "x": 681,
    "y": 359,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 8,
    "x": 941,
    "y": 359,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 209,
    "y": 311,
    "width": 67,
    "height": 291,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 3,
    "x": 119,
    "y": 439,
    "width": 83,
    "height": 36,
    "text": "Row 4",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 324,
    "y": 438,
    "width": 36,
    "height": 36,
    "fillColor": "#ffffff",
    "pathD": "M 33 30 L 30 33 L 31 35 C 31 35, 32 35, 32 35 L 35 32 C 35 32, 35 32, 35 32 C 35 31, 35 31, 35 31 L 33 30 Z M 28 25 L 25 28 L 29 33 L 33 29 L 28 25 Z M 14 8 C 14 8, 14 8, 14 9 C 14 9, 14 9, 14 9 C 11 9, 9 11, 9 14 C 9 14, 9 14, 8 14 C 8 14, 8 14, 8 14 C 8 11, 10 8, 14 8 Z M 14 6 C 9 6, 5 9, 5 14 C 5 18, 9 22, 14 22 C 18 22, 22 18, 22 14 C 22 9, 18 6, 14 6 Z M 14 4 C 19 4, 23 9, 23 14 C 23 19, 19 23, 14 23 C 8 23, 4 19, 4 14 C 4 9, 8 4, 14 4 Z M 14 1 C 7 1, 1 7, 1 14 C 1 21, 7 26, 14 26 C 16 26, 19 26, 21 24 C 21 24, 21 24, 21 24 C 21 24, 22 24, 22 24 L 24 27 L 27 24 L 24 22 C 24 22, 24 21, 24 21 C 26 19, 26 16, 26 14 C 26 7, 21 1, 14 1 Z M 14 0 C 21 0, 27 6, 27 14 C 27 16, 27 19, 25 21 L 28 24 L 28 23 C 28 23, 28 23, 29 23 L 35 30 C 36 31, 36 32, 35 33 L 33 35 C 33 36, 32 36, 32 36 C 31 36, 31 36, 30 35 L 23 29 C 23 29, 23 28, 23 28 C 23 28, 23 28, 23 28 L 24 28 L 21 25 C 19 27, 16 28, 14 28 C 6 28, 0 21, 0 14 C 0 6, 6 0, 14 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 758,
    "y": 64,
    "width": 67,
    "height": 785,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 9,
    "x": 420,
    "y": 438,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 10,
    "x": 681,
    "y": 438,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 11,
    "x": 941,
    "y": 438,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 209,
    "y": 390,
    "width": 67,
    "height": 291,
    "fillColor": "#ee6d90",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 4,
    "x": 119,
    "y": 518,
    "width": 83,
    "height": 36,
    "text": "Row 5",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 324,
    "y": 518,
    "width": 36,
    "height": 36,
    "fillColor": "#ffffff",
    "pathD": "M 12 28 C 13 28, 13 28, 13 28 C 13 29, 13 29, 12 29 C 12 29, 12 29, 12 28 C 12 28, 12 28, 12 28 Z M 24 27 L 24 31 L 28 31 L 28 27 L 24 27 Z M 19 27 L 19 31 L 23 31 L 23 27 L 19 27 Z M 24 22 L 24 26 L 28 26 L 28 22 L 24 22 Z M 19 22 L 19 26 L 23 26 L 23 22 L 19 22 Z M 8 21 L 8 35 L 14 35 L 14 21 L 8 21 Z M 19 20 L 29 20 C 29 20, 30 21, 30 21 L 30 31 L 30 31 C 30 31, 31 31, 31 31 C 31 31, 30 32, 30 32 L 18 32 C 17 32, 17 31, 17 31 C 17 31, 17 31, 18 31 L 18 31 L 18 21 C 18 21, 19 20, 19 20 Z M 3 17 L 3 35 L 7 35 L 7 21 L 6 21 C 6 21, 5 21, 5 21 C 5 21, 6 20, 6 20 L 15 20 C 16 20, 16 21, 16 21 C 16 21, 16 21, 15 21 L 15 21 L 15 35 L 33 35 L 33 17 L 3 17 Z M 15 11 C 16 12, 17 13, 18 13 C 19 13, 21 12, 21 11 L 15 11 Z M 18 7 C 17 7, 16 8, 15 9 L 21 9 C 21 8, 19 7, 18 7 Z M 18 6 C 20 6, 22 8, 22 10 C 22 12, 20 14, 18 14 C 16 14, 14 12, 14 10 C 14 8, 16 6, 18 6 Z M 18 1 L 2 16 L 34 16 L 18 1 Z M 18 0 C 18 0, 18 0, 18 0 L 36 16 C 36 16, 36 17, 36 17 C 36 17, 36 17, 35 17 L 34 17 L 34 35 L 35 35 C 36 35, 36 35, 36 35 C 36 36, 36 36, 35 36 L 1 36 C 0 36, 0 36, 0 35 C 0 35, 0 35, 1 35 L 2 35 L 2 17 L 1 17 C 0 17, 0 17, 0 17 C 0 17, 0 16, 0 16 L 18 0 Z"
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 758,
    "y": 143,
    "width": 67,
    "height": 785,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 12,
    "x": 420,
    "y": 517,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 13,
    "x": 681,
    "y": 517,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 14,
    "x": 941,
    "y": 517,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 209,
    "y": 469,
    "width": 67,
    "height": 291,
    "fillColor": "#4a90d9",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 5,
    "x": 119,
    "y": 597,
    "width": 83,
    "height": 36,
    "text": "Row 6",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 323,
    "y": 596,
    "width": 37,
    "height": 37,
    "fillColor": "#ffffff",
    "pathD": "M 35 35 L 35 35 C 34 36, 33 36, 33 36 C 32 36, 31 36, 31 35 L 20 24 L 24 20 L 35 31 C 36 32, 36 34, 35 35 Z M 10 32 L 8 30 L 31 7 L 33 10 L 10 32 Z M 7 35 L 7 35 C 7 36, 6 36, 5 35 L 2 32 C 2 32, 2 31, 2 31 C 2 31, 2 30, 2 30 L 4 28 L 10 33 L 7 35 Z M 28 4 L 30 7 L 7 29 L 5 27 L 28 4 Z M 10 14 L 10 14 C 10 14, 10 13, 9 13 C 9 13, 9 14, 9 14 L 8 15 C 7 16, 6 16, 5 16 C 4 16, 3 16, 3 15 L 11 7 C 11 7, 11 6, 11 6 L 6 2 C 8 1, 10 2, 12 3 C 13 5, 14 7, 14 9 C 14 9, 14 9, 14 9 C 14 9, 14 10, 14 10 L 17 13 L 13 17 L 10 14 Z M 2 7 L 6 11 L 4 12 C 4 12, 4 12, 3 12 C 2 11, 1 9, 2 7 Z M 33 9 L 29 4 L 35 2 L 33 9 Z M 35 30 L 25 19 L 34 10 C 34 10, 34 10, 34 10 L 37 1 C 37 1, 37 1, 36 1 C 36 1, 36 0, 36 1 L 27 3 C 27 3, 27 3, 27 3 L 18 12 L 15 9 C 15 7, 14 4, 13 3 C 11 1, 8 0, 5 1 C 5 1, 5 1, 5 1 C 5 2, 5 2, 5 2 L 10 6 L 6 10 L 2 5 C 2 5, 1 5, 1 5 C 1 5, 1 5, 1 5 C 0 8, 1 11, 3 13 C 3 13, 3 13, 3 13 L 1 15 C 1 15, 1 15, 1 16 C 2 17, 4 17, 5 17 C 6 17, 8 17, 9 16 L 9 15 L 12 18 L 4 26 L 4 26 C 4 26, 3 26, 3 26 C 3 26, 3 26, 3 27 L 4 27 L 1 29 C 1 30, 0 30, 0 31 C 0 32, 1 32, 1 33 L 5 36 C 5 37, 6 37, 6 37 C 7 37, 8 37, 8 36 L 10 34 L 11 34 C 11 34, 11 34, 11 34 C 11 34, 11 34, 12 34 C 12 34, 12 34, 12 33 L 11 33 L 19 25 L 30 36 C 31 37, 32 37, 33 37 C 34 37, 35 37, 35 36 C 37 34, 37 32, 35 30 Z"
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 758,
    "y": 222,
    "width": 67,
    "height": 785,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 15,
    "x": 420,
    "y": 596,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 16,
    "x": 681,
    "y": 596,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 17,
    "x": 941,
    "y": 596,
    "width": 221,
    "height": 37,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 10
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

export function Imported2025migsopcubedcreativeandexampletemplates198Template({ data }: { data: BrainData }): ReactElement {
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
