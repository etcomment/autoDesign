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
    "x": 80,
    "y": 296,
    "width": 241,
    "height": 97
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 300,
    "y": 296,
    "width": 241,
    "height": 97,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 181 0 L 241 49 L 181 97 L 0 97 L 60 49 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 519,
    "y": 296,
    "width": 241,
    "height": 97,
    "fillColor": "#52c49c",
    "pathD": "M 0 0 L 181 0 L 241 49 L 181 97 L 0 97 L 60 49 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 739,
    "y": 296,
    "width": 241,
    "height": 97,
    "fillColor": "#ffb900",
    "pathD": "M 0 0 L 181 0 L 241 49 L 181 97 L 0 97 L 60 49 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 959,
    "y": 296,
    "width": 241,
    "height": 97,
    "fillColor": "#ee6d90",
    "pathD": "M 0 0 L 181 0 L 241 49 L 181 97 L 0 97 L 60 49 Z"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 154,
    "y": 426,
    "width": 94,
    "height": 36,
    "text": "Item 01",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 114,
    "y": 466,
    "width": 174,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 373,
    "y": 426,
    "width": 94,
    "height": 36,
    "text": "Item 02",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 333,
    "y": 466,
    "width": 174,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 2,
    "x": 593,
    "y": 426,
    "width": 94,
    "height": 36,
    "text": "Item 03",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 2,
    "x": 553,
    "y": 466,
    "width": 174,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 3,
    "x": 813,
    "y": 426,
    "width": 94,
    "height": 36,
    "text": "Item 04",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 3,
    "x": 773,
    "y": 466,
    "width": 174,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 4,
    "x": 1032,
    "y": 426,
    "width": 94,
    "height": 36,
    "text": "Item 05",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 4,
    "x": 992,
    "y": 466,
    "width": 174,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 0,
    "x": 169,
    "y": 315,
    "width": 64,
    "height": 58,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 388,
    "y": 315,
    "width": 64,
    "height": 58,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 608,
    "y": 315,
    "width": 64,
    "height": 58,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 828,
    "y": 315,
    "width": 64,
    "height": 58,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 4,
    "x": 1047,
    "y": 315,
    "width": 64,
    "height": 58,
    "text": "5",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 395,
    "y": 222,
    "width": 51,
    "height": 51,
    "fillColor": "#ff4d38",
    "pathD": "M 49 41 L 49 41 C 45 42, 42 45, 41 49 L 10 49 C 9 45, 6 42, 2 41 L 2 15 L 5 25 C 6 28, 8 29, 10 29 L 11 29 L 11 30 C 11 32, 13 34, 15 34 C 17 34, 19 32, 19 30 L 19 29 L 32 29 L 32 30 C 32 32, 34 34, 36 34 C 38 34, 40 32, 40 30 L 40 29 L 40 29 C 43 29, 45 28, 46 25 L 49 15 L 49 41 Z M 49 47 L 49 47 C 49 48, 48 49, 47 49 L 43 49 C 43 46, 46 43, 49 43 L 49 47 Z M 4 49 L 4 49 C 3 49, 2 48, 2 47 L 2 43 C 5 43, 8 46, 8 49 L 4 49 Z M 18 27 L 18 30 C 18 31, 16 32, 15 32 C 14 32, 13 31, 13 30 L 13 27 L 18 27 Z M 38 27 L 38 30 C 38 31, 37 32, 36 32 C 35 32, 33 31, 33 30 L 33 27 L 38 27 Z M 2 9 L 2 9 C 2 8, 3 8, 4 8 L 47 8 C 48 8, 48 8, 49 9 C 49 9, 49 10, 49 11 L 45 25 C 44 27, 42 28, 40 28 L 40 28 L 40 26 C 40 26, 39 25, 39 25 L 33 25 C 32 25, 32 26, 32 26 L 32 28 L 19 28 L 19 26 C 19 26, 19 25, 18 25 L 12 25 C 12 25, 11 26, 11 26 L 11 28 L 10 28 C 9 28, 7 27, 6 25 L 2 11 C 1 10, 2 9, 2 9 Z M 16 5 L 16 5 C 16 3, 17 2, 19 2 L 32 2 C 33 2, 35 3, 35 5 L 35 6 L 16 6 L 16 5 Z M 50 8 L 50 8 C 49 7, 48 6, 47 6 L 37 6 L 37 5 C 37 2, 34 0, 32 0 L 19 0 C 17 0, 14 2, 14 5 L 14 6 L 4 6 C 3 6, 2 7, 1 8 C 0 9, 0 9, 0 10 L 0 47 C 0 49, 2 51, 4 51 L 47 51 C 49 51, 51 49, 51 47 L 51 10 C 51 9, 51 9, 50 8 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1060,
    "y": 222,
    "width": 39,
    "height": 51,
    "fillColor": "#ee6d90",
    "pathD": "M 32 32 L 32 32 C 31 33, 30 35, 29 37 L 20 37 L 20 31 C 21 31, 21 32, 22 32 C 23 32, 25 31, 25 30 C 26 29, 27 28, 26 27 C 26 25, 25 23, 23 23 C 22 23, 21 23, 20 24 L 20 20 L 28 20 C 28 20, 28 20, 28 20 C 28 20, 28 19, 28 19 C 28 19, 28 19, 28 19 C 27 18, 27 17, 27 16 C 27 15, 28 14, 30 14 C 30 14, 31 14, 32 15 C 32 15, 33 16, 33 17 C 33 17, 32 18, 32 19 C 31 19, 31 19, 31 20 C 32 20, 32 20, 32 20 L 37 20 C 37 24, 35 29, 32 32 Z M 29 40 L 29 45 C 29 45, 29 45, 29 45 L 10 45 C 10 45, 10 45, 10 45 L 10 42 L 26 42 C 26 42, 26 42, 26 42 C 26 41, 26 41, 26 41 L 10 41 L 10 39 C 10 39, 10 39, 10 38 L 29 38 C 29 39, 29 39, 29 40 L 23 49 L 15 49 C 14 49, 12 48, 12 47 L 27 47 C 26 48, 25 49, 23 49 L 29 40 Z M 7 32 L 7 32 C 4 29, 2 24, 2 20 L 9 20 C 9 20, 10 20, 10 19 C 10 19, 10 19, 9 19 C 9 18, 8 17, 9 16 C 9 15, 10 14, 11 14 C 12 14, 12 14, 13 15 C 14 15, 14 16, 14 17 C 14 17, 14 18, 13 19 C 13 19, 13 19, 13 20 C 13 20, 13 20, 13 20 L 19 20 L 19 25 C 19 25, 19 26, 19 26 C 19 26, 19 26, 19 26 C 20 26, 20 26, 20 26 C 21 25, 22 25, 23 25 C 24 25, 25 26, 25 27 C 25 28, 25 28, 24 29 C 23 30, 21 30, 20 29 C 20 29, 19 29, 19 29 C 19 29, 19 29, 19 30 L 19 37 L 9 37 C 9 35, 8 33, 7 32 L 19 2 L 19 7 C 19 7, 19 7, 19 7 C 19 7, 20 7, 20 7 C 20 7, 20 7, 20 7 C 21 6, 21 6, 22 6 C 24 6, 25 7, 25 9 C 25 9, 25 10, 24 11 C 23 12, 21 12, 20 11 C 20 10, 19 10, 19 10 C 19 10, 19 11, 19 11 L 19 19 L 15 19 C 15 18, 15 17, 15 17 C 15 15, 15 14, 14 13 C 13 13, 12 12, 10 12 C 9 13, 7 14, 7 16 C 7 17, 7 18, 7 19 L 2 19 C 2 9, 9 2, 19 2 L 7 32 Z M 20 2 L 20 2 C 29 2, 37 9, 37 19 L 34 19 C 34 18, 34 17, 34 17 C 34 15, 34 14, 33 13 C 32 13, 31 12, 29 12 C 27 13, 26 14, 26 16 C 26 17, 26 18, 26 19 L 20 19 L 20 13 C 22 13, 24 13, 25 12 C 26 11, 26 10, 26 8 C 26 6, 25 5, 22 5 C 22 5, 21 5, 20 5 L 20 2 Z M 20 0 L 20 0 C 9 0, 0 9, 0 19 C 0 24, 2 29, 6 33 C 7 35, 8 37, 8 39 L 8 45 C 8 46, 9 47, 10 47 L 10 47 C 11 49, 13 51, 15 51 L 23 51 C 26 51, 28 49, 28 47 L 29 47 C 30 47, 31 46, 31 45 L 31 40 C 31 37, 32 35, 33 33 C 37 29, 39 24, 39 19 C 39 9, 30 0, 20 0 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 839,
    "y": 222,
    "width": 41,
    "height": 51,
    "fillColor": "#ffb900",
    "pathD": "M 9 37 C 10 37, 10 37, 10 38 L 10 49 L 20 44 C 20 44, 21 44, 21 44 L 31 49 L 31 38 C 31 37, 31 37, 32 37 C 32 37, 33 37, 33 38 L 33 50 C 33 50, 33 51, 32 51 C 32 51, 32 51, 32 51 C 32 51, 32 51, 32 51 L 21 46 L 9 51 C 9 51, 9 51, 9 51 C 8 51, 8 50, 8 50 L 8 38 C 8 37, 9 37, 9 37 Z M 21 13 L 19 17 C 19 17, 18 18, 18 18 L 14 18 L 17 21 C 17 21, 17 22, 17 22 L 16 26 L 20 24 C 20 24, 21 24, 21 24 L 25 26 L 24 22 C 24 22, 24 21, 24 21 L 27 18 L 23 18 C 23 18, 22 17, 22 17 L 21 13 Z M 20 11 C 20 11, 21 11, 21 11 L 24 16 L 29 17 C 29 17, 29 17, 30 17 C 30 18, 30 18, 29 18 L 25 22 L 26 27 C 26 28, 26 28, 26 28 C 26 28, 26 28, 25 28 L 21 26 L 16 28 C 16 28, 16 28, 15 28 C 15 28, 15 28, 15 28 C 15 28, 15 28, 15 27 L 16 22 L 12 18 C 11 18, 11 18, 11 17 C 12 17, 12 17, 12 17 L 17 16 L 20 11 Z M 20 8 C 13 8, 8 13, 8 20 C 8 27, 13 33, 20 33 C 27 33, 33 27, 33 20 C 33 13, 27 8, 20 8 Z M 20 6 C 28 6, 35 13, 35 20 C 35 28, 28 35, 20 35 C 13 35, 6 28, 6 20 C 6 13, 13 6, 20 6 Z M 21 2 L 18 4 C 17 4, 17 4, 17 4 L 13 3 L 11 6 C 11 6, 11 7, 11 7 L 7 7 L 7 11 C 7 11, 7 11, 6 11 L 3 13 L 4 17 C 4 17, 4 17, 4 17 L 2 20 L 4 23 C 4 23, 4 24, 4 24 L 3 27 L 6 29 C 7 30, 7 30, 7 30 L 7 33 L 11 34 C 11 34, 11 34, 11 34 L 13 38 L 17 37 C 17 37, 17 37, 17 37 C 17 37, 17 37, 18 37 L 21 39 L 24 37 C 24 37, 24 37, 24 37 L 28 38 L 30 34 C 30 34, 30 34, 30 34 L 34 33 L 34 30 C 34 30, 35 30, 35 29 L 38 27 L 37 24 C 37 24, 37 23, 37 23 L 39 20 L 37 17 C 37 17, 37 17, 37 17 L 38 13 L 35 11 C 35 11, 34 11, 34 11 L 34 7 L 30 7 C 30 7, 30 6, 30 6 L 28 3 L 24 4 C 24 4, 24 4, 24 4 L 21 2 Z M 20 0 C 20 0, 21 0, 21 0 L 24 2 L 28 1 C 28 1, 29 2, 29 2 L 31 5 L 35 6 C 35 6, 35 6, 35 6 L 36 10 L 39 12 C 39 12, 40 13, 40 13 L 39 17 L 41 20 C 41 20, 41 21, 41 21 L 39 24 L 40 28 C 40 28, 39 28, 39 28 L 36 30 L 35 34 C 35 35, 35 35, 35 35 L 31 35 L 29 39 C 29 39, 28 39, 28 39 L 24 38 L 21 41 C 21 41, 21 41, 21 41 C 20 41, 20 41, 20 41 L 17 38 L 13 39 C 13 39, 12 39, 12 39 L 10 35 L 6 35 C 6 35, 6 35, 6 34 L 5 30 L 2 28 C 2 28, 1 28, 2 28 L 2 24 L 0 21 C 0 21, 0 20, 0 20 L 2 17 L 2 13 C 1 13, 2 12, 2 12 L 5 10 L 6 6 C 6 6, 6 6, 6 6 L 10 5 L 12 2 C 12 2, 13 1, 13 1 L 17 2 L 20 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 615,
    "y": 222,
    "width": 49,
    "height": 51,
    "fillColor": "#52c49c",
    "pathD": "M 29 37 L 34 37 C 34 37, 35 38, 35 38 C 35 38, 34 39, 34 39 L 29 39 C 28 39, 28 38, 28 38 C 28 38, 28 37, 29 37 Z M 6 37 L 25 37 C 25 37, 26 38, 26 38 C 26 38, 25 39, 25 39 L 6 39 C 6 39, 5 38, 5 38 C 5 38, 6 37, 6 37 Z M 29 32 L 37 32 C 37 32, 38 32, 38 33 C 38 33, 37 34, 37 34 L 29 34 C 28 34, 28 33, 28 33 C 28 32, 28 32, 29 32 Z M 16 32 L 23 32 C 23 32, 23 32, 23 33 C 23 33, 23 34, 23 34 L 16 34 C 16 34, 16 33, 16 33 C 16 32, 16 32, 16 32 Z M 29 27 L 35 27 C 35 27, 36 27, 36 28 C 36 28, 35 29, 35 29 L 29 29 C 28 29, 28 28, 28 28 C 28 27, 28 27, 29 27 Z M 16 27 L 24 27 C 25 27, 25 27, 25 28 C 25 28, 25 29, 24 29 L 16 29 C 16 29, 16 28, 16 28 C 16 27, 16 27, 16 27 Z M 7 23 L 7 32 L 12 32 L 12 23 L 7 23 Z M 29 22 L 37 22 C 37 22, 38 22, 38 22 C 38 23, 37 23, 37 23 L 29 23 C 28 23, 28 23, 28 22 C 28 22, 28 22, 29 22 Z M 16 22 L 24 22 C 25 22, 25 22, 25 22 C 25 23, 25 23, 24 23 L 16 23 C 16 23, 16 23, 16 22 C 16 22, 16 22, 16 22 Z M 6 22 L 13 22 C 13 22, 14 22, 14 22 L 14 33 C 14 33, 13 34, 13 34 L 6 34 C 6 34, 5 33, 5 33 L 5 22 C 5 22, 6 22, 6 22 Z M 29 17 L 37 17 C 37 17, 38 17, 38 17 C 38 18, 37 18, 37 18 L 29 18 C 28 18, 28 18, 28 17 C 28 17, 28 17, 29 17 Z M 6 17 L 25 17 C 25 17, 26 17, 26 17 C 26 18, 25 18, 25 18 L 6 18 C 6 18, 5 18, 5 17 C 5 17, 6 17, 6 17 Z M 43 8 L 43 44 C 43 44, 42 45, 42 45 L 8 45 L 8 49 L 47 49 L 47 8 L 43 8 Z M 7 7 L 7 11 L 36 11 L 36 7 L 7 7 Z M 6 5 L 37 5 C 37 5, 38 6, 38 6 L 38 12 C 38 13, 37 13, 37 13 L 6 13 C 6 13, 5 13, 5 12 L 5 6 C 5 6, 6 5, 6 5 Z M 2 2 L 2 43 L 41 43 L 41 2 L 2 2 Z M 1 0 L 42 0 C 42 0, 43 0, 43 1 L 43 6 L 48 6 C 49 6, 49 6, 49 7 L 49 50 C 49 51, 49 51, 48 51 L 7 51 C 7 51, 6 51, 6 50 L 6 45 L 1 45 C 0 45, 0 44, 0 44 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 175,
    "y": 222,
    "width": 51,
    "height": 51,
    "fillColor": "#3365cc",
    "pathD": "M 14 44 L 13 49 L 25 49 L 25 44 L 14 44 Z M 15 39 L 14 43 L 26 43 C 26 43, 26 43, 26 44 L 26 49 L 47 49 L 25 39 L 15 39 Z M 5 39 L 2 49 L 11 49 L 13 39 L 5 39 Z M 45 36 L 34 41 L 49 49 L 45 36 Z M 33 30 C 30 34, 28 36, 27 38 L 33 41 L 45 35 L 43 30 L 33 30 Z M 16 30 L 15 37 L 24 37 C 22 36, 20 33, 18 30 L 16 30 Z M 8 30 L 6 37 L 13 37 L 15 30 L 8 30 Z M 26 9 C 23 9, 20 11, 20 14 C 20 17, 23 20, 26 20 C 28 20, 31 17, 31 14 C 31 11, 28 9, 26 9 Z M 26 7 C 29 7, 32 11, 32 14 C 32 18, 29 21, 26 21 C 22 21, 19 18, 19 14 C 19 11, 22 7, 26 7 Z M 26 2 C 19 2, 13 7, 13 14 C 13 23, 23 34, 26 37 C 28 34, 38 23, 38 14 C 38 7, 33 2, 26 2 Z M 26 0 C 33 0, 40 6, 40 14 C 40 19, 37 24, 34 29 L 44 29 C 44 29, 45 29, 45 29 L 51 50 C 51 50, 51 50, 51 51 C 51 51, 50 51, 50 51 L 1 51 C 1 51, 0 51, 0 51 C 0 50, 0 50, 0 50 L 6 29 C 6 29, 7 29, 7 29 L 17 29 C 14 24, 11 19, 11 14 C 11 6, 18 0, 26 0 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates12Template({ data }: { data: BrainData }): ReactElement {
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
