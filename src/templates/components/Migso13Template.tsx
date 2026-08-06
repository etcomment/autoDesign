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
    "x": 60,
    "y": 147,
    "width": 128,
    "height": 128,
    "text": "",
    "pathD": "M 64 0 L 128 64 L 64 128 L 0 64 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 60,
    "y": 314,
    "width": 128,
    "height": 128,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 64 0 L 128 64 L 64 128 L 0 64 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 60,
    "y": 481,
    "width": 128,
    "height": 128,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 64 0 L 128 64 L 64 128 L 0 64 Z"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 0,
    "x": 213,
    "y": 164,
    "width": 179,
    "height": 36,
    "text": "Agenda item 01"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 0,
    "x": 217,
    "y": 205,
    "width": 389,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 2,
    "x": 213,
    "y": 331,
    "width": 179,
    "height": 36,
    "text": "Agenda item 02"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 2,
    "x": 217,
    "y": 372,
    "width": 389,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 4,
    "x": 213,
    "y": 498,
    "width": 179,
    "height": 36,
    "text": "Agenda item 03"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 4,
    "x": 217,
    "y": 538,
    "width": 389,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 663,
    "y": 147,
    "width": 128,
    "height": 128,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 64 0 L 128 64 L 64 128 L 0 64 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 663,
    "y": 314,
    "width": 128,
    "height": 128,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 64 0 L 128 64 L 64 128 L 0 64 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 663,
    "y": 481,
    "width": 128,
    "height": 128,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 64 0 L 128 64 L 64 128 L 0 64 Z"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 1,
    "x": 816,
    "y": 164,
    "width": 179,
    "height": 36,
    "text": "Agenda item 04"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 820,
    "y": 205,
    "width": 389,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 3,
    "x": 816,
    "y": 331,
    "width": 179,
    "height": 36,
    "text": "Agenda item 05"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 3,
    "x": 820,
    "y": 372,
    "width": 389,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 5,
    "x": 816,
    "y": 498,
    "width": 179,
    "height": 36,
    "text": "Agenda item 06"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 5,
    "x": 820,
    "y": 538,
    "width": 389,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 101,
    "y": 189,
    "width": 45,
    "height": 45,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 13 38 L 22 38 C 23 38, 23 38, 23 38 C 23 39, 23 39, 22 39 L 13 39 C 13 39, 13 39, 13 38 C 13 38, 13 38, 13 38 Z M 7 36 C 7 36, 6 37, 6 38 C 6 39, 7 40, 7 40 C 8 40, 9 39, 9 38 C 9 37, 8 36, 7 36 Z M 7 35 C 9 35, 10 36, 10 38 C 10 40, 9 41, 7 41 C 6 41, 5 40, 5 38 C 5 36, 6 35, 7 35 Z M 27 34 L 27 37 L 44 37 L 43 34 L 27 34 Z M 13 28 L 22 28 C 23 28, 23 29, 23 29 C 23 29, 23 30, 22 30 L 13 30 C 13 30, 13 29, 13 29 C 13 29, 13 28, 13 28 Z M 7 27 C 7 27, 6 28, 6 29 C 6 30, 7 30, 7 30 C 8 30, 9 30, 9 29 C 9 28, 8 27, 7 27 Z M 7 26 C 9 26, 10 27, 10 29 C 10 30, 9 32, 7 32 C 6 32, 5 30, 5 29 C 5 27, 6 26, 7 26 Z M 29 20 L 27 33 L 43 33 L 42 20 L 40 20 L 40 23 C 40 23, 39 23, 39 23 C 39 23, 38 23, 38 23 L 38 20 L 32 20 L 32 23 C 32 23, 32 23, 32 23 C 31 23, 31 23, 31 23 L 31 20 L 29 20 Z M 13 19 L 22 19 C 23 19, 23 20, 23 20 C 23 20, 23 21, 22 21 L 13 21 C 13 21, 13 20, 13 20 C 13 20, 13 19, 13 19 Z M 7 18 C 7 18, 6 19, 6 20 C 6 21, 7 22, 7 22 C 8 22, 9 21, 9 20 C 9 19, 8 18, 7 18 Z M 7 17 C 9 17, 10 18, 10 20 C 10 22, 9 23, 7 23 C 6 23, 5 22, 5 20 C 5 18, 6 17, 7 17 Z M 35 15 C 34 15, 32 16, 32 18 L 32 19 L 38 19 L 38 18 C 38 16, 37 15, 35 15 Z M 35 14 C 38 14, 40 16, 40 18 L 40 19 L 43 19 C 43 19, 43 19, 43 20 L 45 38 C 45 38, 45 38, 45 38 C 45 39, 45 39, 44 39 L 26 39 C 26 39, 26 39, 26 38 C 25 38, 25 38, 25 38 L 27 20 C 27 19, 28 19, 28 19 L 31 19 L 31 18 C 31 16, 33 14, 35 14 Z M 22 10 L 31 10 C 31 10, 31 10, 31 11 C 31 11, 31 11, 31 11 L 22 11 C 21 11, 21 11, 21 11 C 21 10, 21 10, 22 10 Z M 14 10 L 18 10 C 19 10, 19 10, 19 11 C 19 11, 19 11, 18 11 L 14 11 C 13 11, 13 11, 13 11 C 13 10, 13 10, 14 10 Z M 7 9 C 7 9, 6 10, 6 11 C 6 12, 7 12, 7 12 C 8 12, 9 12, 9 11 C 9 10, 8 9, 7 9 Z M 7 8 C 9 8, 10 9, 10 11 C 10 12, 9 14, 7 14 C 6 14, 5 12, 5 11 C 5 9, 6 8, 7 8 Z M 10 1 L 10 3 C 10 4, 11 5, 11 5 L 24 5 C 25 5, 25 4, 25 3 L 25 1 L 10 1 Z M 3 0 L 32 0 C 34 0, 36 1, 36 3 L 36 12 C 36 12, 35 12, 35 12 C 35 12, 34 12, 34 12 L 34 3 C 34 2, 34 1, 32 1 L 27 1 L 27 3 C 27 5, 26 6, 24 6 L 11 6 C 10 6, 9 5, 9 3 L 9 1 L 3 1 C 2 1, 1 2, 1 3 L 1 42 C 1 43, 2 44, 3 44 L 32 44 C 34 44, 34 43, 34 42 L 34 41 C 34 40, 35 40, 35 40 C 35 40, 36 40, 36 41 L 36 42 C 36 43, 34 45, 32 45 L 3 45 C 1 45, 0 43, 0 42 L 0 3 C 0 1, 1 0, 3 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 704,
    "y": 523,
    "width": 45,
    "height": 45,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 12 32 C 12 32, 13 32, 13 32 C 13 33, 12 33, 12 33 C 11 33, 11 33, 11 32 C 11 32, 11 32, 12 32 Z M 10 22 L 10 34 L 14 34 L 14 22 L 10 22 Z M 23 8 C 22 8, 21 8, 21 9 C 21 10, 22 12, 21 14 C 21 16, 19 17, 18 19 C 17 20, 15 21, 15 22 L 15 34 L 31 34 C 32 34, 32 34, 32 34 C 33 34, 33 33, 33 32 C 33 32, 33 32, 33 31 C 33 31, 33 31, 33 31 C 33 31, 33 31, 34 30 C 35 30, 35 29, 35 29 C 35 28, 35 28, 35 27 C 35 27, 35 27, 35 27 C 35 26, 35 26, 35 26 C 35 26, 36 25, 36 25 C 36 24, 35 23, 35 23 C 34 23, 34 23, 34 23 C 34 22, 34 22, 35 22 C 35 22, 35 21, 35 20 C 35 19, 35 18, 34 18 L 26 18 C 25 18, 25 18, 25 18 C 25 18, 25 18, 25 18 C 25 17, 26 15, 25 13 C 25 10, 24 8, 23 8 Z M 23 7 C 25 7, 26 9, 27 13 C 27 15, 27 16, 26 17 L 34 17 C 35 17, 37 19, 37 20 C 37 21, 36 22, 36 22 C 37 23, 37 24, 37 25 C 37 25, 37 26, 36 27 C 36 27, 37 28, 37 29 C 37 30, 36 31, 35 32 C 35 32, 35 32, 35 32 C 35 34, 34 36, 32 36 C 32 36, 32 36, 31 36 L 7 36 C 7 36, 6 35, 6 35 C 6 35, 7 34, 7 34 L 8 34 L 8 22 L 3 22 C 2 22, 2 22, 2 22 C 2 21, 2 21, 3 21 L 14 21 C 15 20, 15 19, 17 18 C 18 17, 19 15, 20 13 C 20 12, 20 10, 20 8 C 19 8, 20 8, 20 8 C 20 7, 21 7, 23 7 Z M 22 1 C 11 1, 1 11, 1 23 C 1 34, 11 44, 22 44 C 26 44, 30 43, 33 41 C 34 41, 34 41, 34 41 L 43 43 L 41 34 C 41 34, 41 34, 41 33 C 43 30, 44 26, 44 23 C 44 11, 34 1, 22 1 Z M 22 0 C 35 0, 45 10, 45 23 C 45 26, 44 30, 42 34 L 45 44 C 45 44, 45 45, 45 45 C 45 45, 44 45, 44 45 C 44 45, 44 45, 44 45 L 34 42 C 30 44, 27 45, 22 45 C 10 45, 0 35, 0 23 C 0 10, 10 0, 22 0 Z"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 104,
    "y": 523,
    "width": 39,
    "height": 45,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 8 27 L 6 30 L 7 33 L 10 33 L 12 31 L 11 28 L 8 27 Z M 8 26 L 12 27 C 12 27, 12 27, 12 27 L 13 31 C 13 31, 13 32, 13 32 L 10 35 C 10 35, 10 35, 10 35 C 10 35, 10 35, 10 35 L 6 34 C 6 34, 6 34, 5 33 L 5 30 C 4 29, 5 29, 5 29 L 7 26 C 8 26, 8 26, 8 26 Z M 31 19 C 31 19, 32 19, 32 20 C 32 27, 26 32, 19 32 C 19 32, 19 32, 19 31 C 19 31, 19 31, 19 31 C 25 31, 30 26, 30 20 C 30 19, 31 19, 31 19 Z M 37 14 C 37 14, 37 14, 37 14 C 35 16, 32 17, 29 17 L 17 29 C 18 32, 17 35, 15 37 C 15 37, 14 37, 14 37 C 16 38, 18 38, 19 38 C 23 38, 26 37, 29 35 C 30 35, 30 35, 30 35 L 38 43 L 38 20 C 38 18, 37 16, 37 14 Z M 19 7 C 20 7, 20 8, 20 8 C 20 8, 20 9, 19 9 C 13 9, 8 14, 8 20 C 8 20, 8 20, 8 20 C 7 20, 7 20, 7 20 C 7 13, 12 7, 19 7 Z M 32 1 C 30 1, 27 2, 26 3 C 24 5, 23 8, 24 10 C 24 10, 24 10, 24 10 L 17 17 L 11 23 C 11 23, 10 24, 10 24 C 10 23, 9 23, 9 23 C 7 23, 5 24, 4 25 C 1 28, 1 33, 4 36 C 7 38, 11 38, 14 36 C 15 34, 16 32, 16 29 C 16 29, 16 29, 16 29 L 29 16 C 29 16, 29 15, 29 15 C 32 16, 34 15, 36 14 L 36 13 L 37 11 C 38 10, 38 8, 38 7 L 33 12 C 33 12, 32 12, 32 12 L 28 11 C 28 11, 28 11, 28 11 L 27 7 C 27 7, 27 6, 27 6 L 32 1 Z M 19 1 C 10 1, 1 10, 1 20 C 1 22, 2 24, 2 25 C 2 25, 3 25, 3 25 C 5 23, 8 22, 10 22 L 15 17 L 22 10 C 22 7, 23 4, 25 2 C 25 2, 25 2, 25 2 C 23 2, 21 1, 19 1 Z M 19 0 C 22 0, 24 0, 26 1 C 28 0, 31 0, 33 0 C 34 1, 34 1, 34 1 C 34 1, 34 1, 34 2 L 28 7 L 29 10 L 32 11 L 37 5 C 38 5, 38 5, 38 5 C 38 5, 38 5, 39 6 C 39 8, 39 11, 38 13 C 39 15, 39 17, 39 20 L 39 44 C 39 45, 39 45, 39 45 C 39 45, 38 45, 38 45 C 38 45, 38 45, 38 45 L 30 37 C 27 39, 23 40, 19 40 C 17 40, 15 39, 12 38 C 11 39, 10 39, 9 39 C 7 39, 5 38, 3 37 C 0 34, 0 30, 1 27 C 0 25, 0 22, 0 20 C 0 9, 9 0, 19 0 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 101,
    "y": 356,
    "width": 45,
    "height": 45,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 7 38 L 2 44 L 43 44 L 38 38 L 26 38 L 23 40 C 23 40, 23 40, 22 40 C 22 40, 22 40, 22 40 L 19 38 L 7 38 Z M 33 20 C 34 20, 34 20, 34 20 C 35 21, 35 21, 34 21 L 29 27 C 29 27, 28 27, 28 27 C 28 27, 28 27, 28 27 C 28 27, 28 26, 28 26 L 33 20 Z M 25 20 C 25 20, 26 20, 26 20 C 26 21, 26 21, 26 21 L 20 27 C 20 27, 20 27, 20 27 C 20 27, 19 27, 19 27 C 19 27, 19 26, 19 26 L 25 20 Z M 16 20 C 16 20, 17 20, 17 20 C 17 21, 17 21, 17 21 L 12 27 C 11 27, 11 27, 11 27 C 11 27, 11 27, 11 27 C 10 27, 10 26, 11 26 L 16 20 Z M 12 15 C 11 16, 9 17, 8 17 L 7 17 L 7 30 L 12 30 C 12 30, 12 30, 12 30 L 22 39 L 33 30 C 33 30, 33 30, 33 30 L 38 30 L 38 17 L 37 17 C 36 17, 34 16, 33 15 C 33 16, 31 17, 30 17 L 26 17 C 25 17, 23 16, 22 15 C 22 16, 20 17, 19 17 L 15 17 C 14 17, 12 16, 12 15 Z M 34 12 L 34 12 C 34 14, 35 15, 37 15 L 41 15 C 42 15, 44 14, 44 12 L 44 12 L 34 12 Z M 23 12 L 23 12 C 23 14, 25 15, 26 15 L 30 15 C 31 15, 33 14, 33 12 L 33 12 L 23 12 Z M 12 12 L 12 12 C 12 14, 14 15, 15 15 L 19 15 C 21 15, 22 14, 22 12 L 22 12 L 12 12 Z M 1 12 L 1 12 C 1 14, 3 15, 4 15 L 8 15 C 10 15, 11 14, 11 12 L 11 12 L 1 12 Z M 32 7 L 34 11 L 43 11 L 39 7 L 32 7 Z M 23 7 L 23 11 L 32 11 L 30 7 L 23 7 Z M 15 7 L 13 11 L 22 11 L 22 7 L 15 7 Z M 6 7 L 2 11 L 11 11 L 13 7 L 6 7 Z M 7 1 L 7 5 L 38 5 L 38 1 L 7 1 Z M 6 0 L 39 0 C 39 0, 40 0, 40 1 L 40 6 L 45 11 C 45 11, 45 11, 45 12 L 45 12 C 45 15, 43 17, 41 17 L 40 17 L 40 30 C 40 31, 39 31, 39 31 L 34 31 L 28 36 L 38 36 C 38 36, 38 36, 38 37 L 45 44 C 45 44, 45 44, 45 45 C 45 45, 45 45, 44 45 L 1 45 C 0 45, 0 45, 0 45 C 0 44, 0 44, 0 44 L 7 37 C 7 36, 7 36, 7 36 L 17 36 L 11 31 L 6 31 C 6 31, 6 31, 6 30 L 6 17 L 4 17 C 2 17, 0 15, 0 12 L 0 12 C 0 11, 0 11, 0 11 L 6 6 L 6 1 C 6 0, 6 0, 6 0 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 704,
    "y": 356,
    "width": 45,
    "height": 45,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 23 14 L 27 19 C 27 19, 28 19, 27 20 C 27 20, 27 20, 27 20 L 8 20 L 8 25 L 27 25 C 27 25, 27 25, 27 25 C 28 26, 27 26, 27 26 L 23 31 L 28 31 L 36 23 L 28 14 L 23 14 Z M 21 13 L 28 13 C 28 13, 29 13, 29 13 L 38 22 C 38 22, 38 22, 38 23 C 38 23, 38 23, 38 23 L 29 32 C 29 32, 28 32, 28 32 L 21 32 C 21 32, 20 32, 20 32 C 20 32, 20 31, 20 31 L 25 26 L 8 26 C 7 26, 7 26, 7 26 L 7 19 C 7 19, 7 19, 8 19 L 25 19 L 20 14 C 20 14, 20 13, 20 13 C 20 13, 21 13, 21 13 Z M 23 1 C 11 1, 1 11, 1 22 C 1 34, 11 44, 23 44 C 34 44, 44 34, 44 22 C 44 11, 34 1, 23 1 Z M 23 0 C 35 0, 45 10, 45 22 C 45 35, 35 45, 23 45 C 10 45, 0 35, 0 22 C 0 10, 10 0, 23 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 707,
    "y": 189,
    "width": 40,
    "height": 45,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 26 33 L 20 39 C 20 39, 20 39, 20 39 C 20 39, 20 39, 20 39 L 14 33 C 6 34, 1 36, 1 38 C 1 41, 9 44, 20 44 C 31 44, 39 41, 39 38 C 39 36, 34 34, 26 33 Z M 20 9 C 16 9, 13 12, 13 16 C 13 20, 16 23, 20 23 C 24 23, 27 20, 27 16 C 27 12, 24 9, 20 9 Z M 20 8 C 25 8, 28 12, 28 16 C 28 21, 25 25, 20 25 C 15 25, 12 21, 12 16 C 12 12, 15 8, 20 8 Z M 20 1 C 16 1, 12 3, 9 6 C 6 9, 5 12, 5 16 C 5 20, 6 24, 9 27 L 20 37 L 31 27 C 34 24, 35 20, 35 16 C 35 12, 34 9, 31 6 C 28 3, 24 1, 20 1 Z M 20 0 C 24 0, 29 2, 32 5 C 35 8, 36 12, 36 16 C 36 21, 35 25, 32 28 L 27 32 C 34 33, 40 35, 40 38 C 40 43, 30 45, 20 45 C 10 45, 0 43, 0 38 C 0 35, 6 33, 13 32 L 8 28 C 5 25, 4 21, 4 16 C 4 12, 5 8, 8 5 C 11 2, 16 0, 20 0 Z"
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

export function Migso13Template({ data }: { data: BrainData }): ReactElement {
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
