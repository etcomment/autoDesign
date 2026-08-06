import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 450,
    "y": 388,
    "width": 46,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1019,
    "y": 388,
    "width": 46,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 192,
    "y": 388,
    "width": 46,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 736,
    "y": 388,
    "width": 46,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 881,
    "y": 195,
    "width": 323,
    "height": 172,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 242 0 L 323 86 L 242 172 L 0 172 L 81 86 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 596,
    "y": 195,
    "width": 323,
    "height": 172,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 242 0 L 323 86 L 242 172 L 0 172 L 81 86 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 312,
    "y": 195,
    "width": 323,
    "height": 172,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 0 L 242 0 L 323 86 L 242 172 L 0 172 L 81 86 Z"
  },
  {
    "id": "sp-3",
    "x": 79,
    "y": 195,
    "width": 271,
    "height": 172,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 174,
    "y": 407,
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
    "x": 433,
    "y": 407,
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
    "x": 719,
    "y": 407,
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
    "x": 1002,
    "y": 407,
    "width": 81,
    "height": 81,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 41 0 A 41 41 0 1 1 40 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 450,
    "y": 426,
    "width": 47,
    "height": 44,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 5 31 C 5 30, 5 31, 5 31 L 7 34 C 7 34, 7 34, 7 34 C 7 34, 7 34, 8 34 L 10 32 C 10 32, 11 32, 11 33 C 12 33, 13 34, 14 35 C 14 35, 14 36, 14 36 L 12 39 C 12 39, 12 39, 12 39 C 12 39, 12 39, 12 39 L 15 41 C 15 41, 16 41, 16 40 L 17 38 C 17 38, 18 38, 18 38 C 19 38, 20 38, 21 39 C 22 39, 22 39, 22 39 L 22 42 C 22 42, 22 43, 22 43 L 26 43 C 26 43, 26 42, 26 42 L 26 39 C 26 39, 26 39, 27 39 C 28 38, 29 38, 30 38 C 30 38, 31 38, 31 38 L 32 40 C 33 41, 33 41, 33 41 L 36 39 C 36 39, 36 39, 36 39 C 36 39, 36 39, 36 39 L 34 36 C 34 36, 34 35, 35 35 C 36 34, 36 33, 37 33 C 37 32, 38 32, 38 32 L 41 34 C 41 34, 41 34, 41 34 C 41 34, 41 34, 41 34 L 43 31 C 43 31, 43 30, 44 31 C 44 31, 44 31, 44 32 L 42 34 C 42 35, 42 35, 41 35 C 41 35, 40 35, 40 35 L 38 34 C 37 35, 37 35, 36 36 L 37 38 C 37 38, 37 39, 37 39 C 37 40, 37 40, 36 40 L 34 42 C 33 42, 32 42, 31 41 L 30 39 C 29 40, 28 40, 27 40 L 27 42 C 27 43, 27 44, 26 44 L 22 44 C 21 44, 21 43, 21 42 L 21 40 C 20 40, 19 40, 18 39 L 17 41 C 16 42, 15 42, 14 42 L 12 40 C 11 40, 11 40, 11 39 C 11 39, 11 38, 11 38 L 12 36 C 12 35, 11 35, 10 34 L 8 35 C 8 35, 7 35, 7 35 C 6 35, 6 35, 6 34 L 4 32 C 4 31, 4 31, 5 31 Z M 15 27 C 15 27, 15 27, 15 28 C 17 31, 20 33, 24 33 C 28 33, 31 31, 33 28 C 33 27, 33 27, 33 27 L 15 27 Z M 7 19 L 5 22 L 7 25 L 10 25 L 12 22 L 10 19 L 7 19 Z M 7 18 L 11 18 C 11 18, 11 18, 11 18 L 13 22 C 13 22, 13 22, 13 22 L 11 26 C 11 26, 11 26, 11 26 L 7 26 C 6 26, 6 26, 6 26 L 4 22 C 4 22, 4 22, 4 22 L 6 18 C 6 18, 6 18, 7 18 Z M 8 15 C 5 15, 1 18, 1 22 C 1 26, 5 29, 8 29 C 11 29, 13 28, 14 26 C 14 26, 15 26, 15 26 L 33 26 C 33 26, 33 26, 34 26 C 35 28, 37 29, 39 29 C 42 29, 44 28, 45 26 L 38 26 C 38 26, 38 26, 38 26 L 36 22 C 36 22, 36 22, 36 22 L 38 18 C 38 18, 38 18, 38 18 L 45 18 C 44 16, 42 15, 39 15 C 37 15, 35 16, 34 18 C 33 18, 33 18, 33 18 L 15 18 C 15 18, 14 18, 14 18 C 13 16, 11 15, 8 15 Z M 24 11 C 20 11, 17 13, 15 16 C 15 17, 15 17, 15 17 L 33 17 C 33 17, 33 17, 33 16 C 31 13, 28 11, 24 11 Z M 24 10 C 28 10, 32 12, 34 15 C 36 14, 37 14, 39 14 C 43 14, 45 15, 47 18 C 47 18, 47 19, 47 19 C 47 19, 47 19, 46 19 L 39 19 L 37 22 L 39 25 L 46 25 C 47 25, 47 25, 47 25 C 47 25, 47 25, 47 26 C 45 29, 43 30, 39 30 C 37 30, 36 30, 34 29 C 32 32, 28 34, 24 34 C 20 34, 16 32, 14 29 C 12 30, 10 30, 8 30 C 4 30, 0 27, 0 22 C 0 17, 4 14, 8 14 C 10 14, 12 14, 14 15 C 16 12, 20 10, 24 10 Z M 22 0 L 26 0 C 27 0, 27 1, 27 2 L 27 4 C 28 4, 29 4, 30 5 L 31 3 C 31 2, 32 2, 32 2 C 33 2, 33 2, 34 2 L 36 4 C 37 4, 37 4, 37 5 C 37 5, 37 6, 37 6 L 36 8 C 37 9, 37 9, 38 10 L 40 9 C 40 9, 41 9, 41 9 C 42 9, 42 9, 42 10 L 44 12 C 44 13, 44 13, 44 13 C 43 13, 43 13, 43 13 C 43 13, 43 13, 43 13 L 41 10 C 41 10, 41 10, 41 10 C 41 10, 41 10, 41 10 L 38 12 C 38 12, 37 12, 37 11 C 36 11, 36 10, 35 9 C 34 9, 34 8, 34 8 L 36 5 C 36 5, 36 5, 36 5 L 33 3 C 33 3, 33 3, 32 4 L 31 6 C 31 6, 30 6, 30 6 C 29 6, 28 6, 27 5 C 26 5, 26 5, 26 5 L 26 2 C 26 2, 26 1, 26 1 L 22 1 C 22 1, 22 2, 22 2 L 22 5 C 22 5, 22 5, 21 5 C 20 6, 19 6, 18 6 C 18 6, 17 6, 17 6 L 16 4 C 16 3, 15 3, 15 3 L 12 5 C 12 5, 12 5, 12 5 C 12 5, 12 5, 12 5 L 14 8 C 14 8, 14 9, 14 9 C 13 10, 12 11, 11 11 C 11 12, 10 12, 10 12 L 8 10 C 7 10, 7 10, 7 10 C 7 10, 7 10, 7 10 L 5 13 C 5 13, 5 14, 5 13 C 4 13, 4 13, 4 12 L 6 10 C 6 9, 6 9, 7 9 C 7 9, 8 9, 8 9 L 10 10 C 11 9, 12 9, 12 8 L 11 6 C 11 6, 11 5, 11 5 C 11 4, 11 4, 12 4 L 14 2 C 15 2, 15 2, 16 2 C 16 2, 17 2, 17 3 L 18 5 C 19 4, 20 4, 21 4 L 21 2 C 21 1, 21 0, 22 0 Z"
  },
  {
    "id": "sp-9",
    "x": 741,
    "y": 424,
    "width": 37,
    "height": 46,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 8 33 C 9 33, 9 34, 9 34 L 9 44 L 18 40 C 18 40, 19 40, 19 40 L 28 44 L 28 34 C 28 34, 28 33, 29 33 C 29 33, 29 34, 29 34 L 29 45 C 29 46, 29 46, 29 46 C 29 46, 29 46, 29 46 C 29 46, 29 46, 28 46 L 19 41 L 9 46 C 8 46, 8 46, 8 46 C 8 46, 8 46, 8 45 L 8 34 C 8 34, 8 33, 8 33 Z M 19 12 L 17 16 C 17 16, 17 16, 16 16 L 13 16 L 15 19 C 15 19, 16 20, 16 20 L 15 24 L 18 22 C 18 22, 19 22, 19 22 L 22 24 L 22 20 C 21 20, 22 19, 22 19 L 24 16 L 21 16 C 20 16, 20 16, 20 16 L 19 12 Z M 18 10 C 18 10, 19 10, 19 10 L 21 15 L 26 15 C 26 15, 27 16, 27 16 C 27 16, 27 16, 26 17 L 23 20 L 24 25 C 24 25, 24 25, 24 25 C 23 26, 23 26, 23 25 L 19 23 L 14 25 C 14 25, 14 26, 14 26 C 14 26, 14 25, 14 25 C 13 25, 13 25, 13 25 L 14 20 L 11 17 C 10 16, 10 16, 10 16 C 10 16, 11 15, 11 15 L 16 15 L 18 10 Z M 18 7 C 12 7, 7 12, 7 18 C 7 25, 12 30, 18 30 C 25 30, 30 25, 30 18 C 30 12, 25 7, 18 7 Z M 18 6 C 25 6, 31 11, 31 18 C 31 25, 25 31, 18 31 C 11 31, 6 25, 6 18 C 6 11, 11 6, 18 6 Z M 19 2 L 16 4 C 16 4, 15 4, 15 4 L 12 3 L 10 6 C 10 6, 10 6, 10 6 L 7 6 L 6 10 C 6 10, 6 10, 6 10 L 3 12 L 4 15 C 4 15, 4 16, 4 16 L 2 18 L 4 21 C 4 21, 4 21, 4 22 L 3 25 L 6 26 C 6 27, 6 27, 6 27 L 7 30 L 10 31 C 10 31, 10 31, 10 31 L 12 34 L 15 33 C 15 33, 15 33, 15 33 C 16 33, 16 33, 16 33 L 19 35 L 21 33 C 21 33, 22 33, 22 33 L 25 34 L 27 31 C 27 31, 27 31, 27 31 L 31 30 L 31 27 C 31 27, 31 27, 31 26 L 34 25 L 33 22 C 33 21, 33 21, 33 21 L 35 18 L 33 16 C 33 16, 33 15, 33 15 L 34 12 L 31 10 C 31 10, 31 10, 31 10 L 31 6 L 27 6 C 27 6, 27 6, 27 6 L 25 3 L 22 4 C 22 4, 21 4, 21 4 L 19 2 Z M 18 0 C 18 0, 19 0, 19 0 L 22 2 L 25 1 C 25 1, 26 1, 26 2 L 28 5 L 31 5 C 31 5, 32 5, 32 6 L 32 9 L 35 11 C 36 11, 36 11, 36 12 L 35 15 L 37 18 C 37 18, 37 19, 37 19 L 35 22 L 36 25 C 36 25, 36 26, 35 26 L 32 27 L 32 31 C 32 31, 31 32, 31 32 L 28 32 L 26 35 C 26 35, 25 35, 25 35 L 22 35 L 19 37 C 19 37, 19 37, 19 37 C 18 37, 18 37, 18 37 L 15 35 L 12 35 C 12 35, 11 35, 11 35 L 9 32 L 6 32 C 6 32, 5 31, 5 31 L 5 27 L 2 26 C 1 26, 1 25, 1 25 L 2 22 L 0 19 C 0 19, 0 18, 0 18 L 2 15 L 1 12 C 1 11, 1 11, 2 11 L 5 9 L 5 6 C 5 5, 6 5, 6 5 L 9 5 L 11 2 C 11 1, 12 1, 12 1 L 15 2 L 18 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 1019,
    "y": 425,
    "width": 47,
    "height": 47,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 13 41 L 12 46 L 23 46 L 23 41 L 13 41 Z M 14 36 L 13 40 L 24 40 C 24 40, 24 40, 24 40 L 24 46 L 43 46 L 23 36 L 14 36 Z M 5 36 L 2 46 L 11 46 L 12 36 L 5 36 Z M 42 33 L 32 38 L 45 45 L 42 33 Z M 30 28 C 28 31, 26 34, 25 35 L 30 37 L 41 32 L 40 28 L 30 28 Z M 15 28 L 14 34 L 22 34 C 21 33, 19 31, 17 28 L 15 28 Z M 7 28 L 5 34 L 12 34 L 13 28 L 7 28 Z M 24 8 C 21 8, 19 11, 19 13 C 19 16, 21 18, 24 18 C 26 18, 28 16, 28 13 C 28 11, 26 8, 24 8 Z M 24 7 C 27 7, 30 10, 30 13 C 30 17, 27 20, 24 20 C 20 20, 17 17, 17 13 C 17 10, 20 7, 24 7 Z M 24 1 C 17 1, 12 7, 12 13 C 12 21, 21 32, 24 34 C 26 32, 35 21, 35 13 C 35 7, 30 1, 24 1 Z M 24 0 C 31 0, 37 6, 37 13 C 37 18, 34 23, 31 27 L 41 27 C 41 27, 41 27, 41 27 L 47 46 C 47 46, 47 46, 47 47 C 47 47, 47 47, 46 47 L 1 47 C 1 47, 0 47, 0 47 C 0 46, 0 46, 0 46 L 6 27 C 6 27, 6 27, 6 27 L 16 27 C 13 23, 10 18, 10 13 C 10 6, 16 0, 24 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 192,
    "y": 425,
    "width": 46,
    "height": 46,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 31 32 C 30 32, 29 33, 29 34 C 29 35, 29 36, 30 36 C 30 36, 30 36, 30 37 L 29 40 L 33 40 L 32 37 C 32 36, 32 36, 33 36 C 33 36, 33 35, 33 34 C 33 33, 32 32, 31 32 Z M 31 31 C 33 31, 35 32, 35 34 C 35 35, 34 36, 34 37 L 35 41 C 35 41, 35 41, 35 41 C 34 41, 34 41, 34 41 L 28 41 C 28 41, 28 41, 28 41 C 28 41, 28 41, 28 41 L 29 37 C 28 36, 28 35, 28 34 C 28 32, 29 31, 31 31 Z M 15 31 L 20 31 C 20 31, 21 31, 21 32 C 21 32, 20 32, 20 32 L 15 32 C 15 32, 14 32, 14 32 C 14 31, 15 31, 15 31 Z M 5 31 L 11 31 C 12 31, 12 31, 12 32 C 12 32, 12 32, 11 32 L 5 32 C 4 32, 4 32, 4 32 C 4 31, 4 31, 5 31 Z M 31 27 C 27 27, 23 31, 23 36 C 23 41, 27 45, 31 45 C 36 45, 40 41, 40 36 C 40 31, 36 27, 31 27 Z M 20 26 L 24 26 C 24 26, 25 26, 25 27 C 25 27, 24 28, 24 28 L 20 28 C 19 28, 19 27, 19 27 C 19 26, 19 26, 20 26 Z M 12 26 L 16 26 C 17 26, 17 26, 17 27 C 17 27, 17 28, 16 28 L 12 28 C 12 28, 12 27, 12 27 C 12 26, 12 26, 12 26 Z M 5 26 L 9 26 C 9 26, 10 26, 10 27 C 10 27, 9 28, 9 28 L 5 28 C 5 28, 4 27, 4 27 C 4 26, 5 26, 5 26 Z M 6 18 C 6 18, 5 18, 5 19 L 5 20 C 5 21, 6 21, 6 21 L 9 21 C 9 21, 10 21, 10 20 L 10 19 C 10 18, 9 18, 9 18 L 6 18 Z M 6 17 L 9 17 C 10 17, 11 18, 11 19 L 11 20 C 11 22, 10 22, 9 22 L 6 22 C 5 22, 4 22, 4 20 L 4 19 C 4 18, 5 17, 6 17 Z M 37 15 L 37 24 L 43 24 C 44 24, 45 24, 45 23 L 45 15 L 37 15 Z M 3 13 C 2 13, 1 13, 1 14 L 1 34 C 1 35, 2 35, 3 35 L 21 35 C 22 30, 26 26, 31 26 C 33 26, 34 26, 35 27 L 35 14 C 35 13, 35 13, 34 13 L 3 13 Z M 11 8 L 11 11 L 34 11 C 36 11, 37 12, 37 14 L 37 14 L 45 14 L 45 8 L 11 8 Z M 12 1 C 11 1, 11 2, 11 3 L 11 7 L 45 7 L 45 3 C 45 2, 44 1, 43 1 L 12 1 Z M 12 0 L 43 0 C 45 0, 46 1, 46 3 L 46 23 C 46 24, 45 26, 43 26 L 37 26 L 37 28 C 39 29, 41 32, 41 36 C 41 42, 37 46, 31 46 C 26 46, 22 42, 21 37 L 3 37 C 1 37, 0 36, 0 34 L 0 14 C 0 12, 1 11, 3 11 L 9 11 L 9 3 C 9 1, 10 0, 12 0 Z"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 104,
    "y": 505,
    "width": 221,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 363,
    "y": 505,
    "width": 221,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 647,
    "y": 505,
    "width": 221,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 3,
    "x": 931,
    "y": 505,
    "width": 221,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 160,
    "y": 234,
    "width": 96,
    "height": 36,
    "text": "Step 01"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 0,
    "x": 90,
    "y": 264,
    "width": 235,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 1,
    "x": 436,
    "y": 234,
    "width": 96,
    "height": 36,
    "text": "Step 02"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 1,
    "x": 366,
    "y": 264,
    "width": 235,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 2,
    "x": 719,
    "y": 234,
    "width": 96,
    "height": 36,
    "text": "Step 03"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 650,
    "y": 264,
    "width": 235,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 999,
    "y": 234,
    "width": 96,
    "height": 36,
    "text": "Step 04"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 929,
    "y": 264,
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

export function Migso161Template({ data }: { data: BrainData }): ReactElement {
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
