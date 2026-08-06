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
    "x": 132,
    "y": 140,
    "width": 1068,
    "height": 77,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 126,
    "width": 105,
    "height": 105,
    "fillColor": "#3365cc",
    "strokeColor": "#ffffff",
    "text": "",
    "pathD": "M 53 0 A 53 53 0 1 1 52 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 132,
    "y": 250,
    "width": 1068,
    "height": 77,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 80,
    "y": 236,
    "width": 105,
    "height": 105,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "text": "",
    "pathD": "M 53 0 A 53 53 0 1 1 52 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 132,
    "y": 360,
    "width": 1068,
    "height": 77,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 80,
    "y": 345,
    "width": 105,
    "height": 105,
    "fillColor": "#52c49c",
    "strokeColor": "#ffffff",
    "text": "",
    "pathD": "M 53 0 A 53 53 0 1 1 52 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 132,
    "y": 469,
    "width": 1068,
    "height": 77,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 80,
    "y": 455,
    "width": 105,
    "height": 105,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff",
    "text": "",
    "pathD": "M 53 0 A 53 53 0 1 1 52 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 132,
    "y": 579,
    "width": 1068,
    "height": 77,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 80,
    "y": 565,
    "width": 105,
    "height": 105,
    "fillColor": "#ee6d90",
    "strokeColor": "#ffffff",
    "text": "",
    "pathD": "M 53 0 A 53 53 0 1 1 52 0 Z"
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 388,
    "y": 126,
    "width": 10,
    "height": 542,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 591,
    "y": 126,
    "width": 10,
    "height": 542,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 794,
    "y": 126,
    "width": 10,
    "height": 542,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-45",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 997,
    "y": 126,
    "width": 10,
    "height": 542,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 0,
    "x": 214,
    "y": 161,
    "width": 145,
    "height": 36,
    "text": "Row Title 01"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 1,
    "x": 214,
    "y": 270,
    "width": 145,
    "height": 36,
    "text": "Row Title 02"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 2,
    "x": 214,
    "y": 380,
    "width": 145,
    "height": 36,
    "text": "Row Title 03"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 3,
    "x": 214,
    "y": 490,
    "width": 145,
    "height": 36,
    "text": "Row Title 04"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 4,
    "x": 214,
    "y": 600,
    "width": 145,
    "height": 36,
    "text": "Row Title 05"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 0,
    "x": 400,
    "y": 152,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 603,
    "y": 152,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 806,
    "y": 152,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 1009,
    "y": 152,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 4,
    "x": 400,
    "y": 261,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 5,
    "x": 603,
    "y": 261,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 6,
    "x": 806,
    "y": 261,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 7,
    "x": 1009,
    "y": 261,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 8,
    "x": 400,
    "y": 371,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 9,
    "x": 603,
    "y": 371,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 10,
    "x": 806,
    "y": 371,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 11,
    "x": 1009,
    "y": 371,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 12,
    "x": 400,
    "y": 481,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 13,
    "x": 603,
    "y": 481,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 14,
    "x": 806,
    "y": 481,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 15,
    "x": 1009,
    "y": 481,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 16,
    "x": 400,
    "y": 591,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 17,
    "x": 603,
    "y": 591,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 18,
    "x": 806,
    "y": 591,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 19,
    "x": 1009,
    "y": 591,
    "width": 178,
    "height": 53,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 109,
    "y": 155,
    "width": 47,
    "height": 48,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 26 38 C 26 38, 26 38, 26 39 C 26 39, 26 39, 26 39 C 25 39, 25 39, 25 39 C 25 38, 25 38, 26 38 Z M 33 34 L 33 39 L 37 39 L 37 34 L 33 34 Z M 10 34 L 10 39 L 14 39 L 14 34 L 10 34 Z M 20 31 L 20 47 L 27 47 L 27 31 L 20 31 Z M 33 30 L 33 33 L 37 33 L 37 30 L 33 30 Z M 10 30 L 10 33 L 14 33 L 14 30 L 10 30 Z M 32 29 L 38 29 C 38 29, 38 29, 38 30 L 38 39 L 39 39 C 39 39, 39 39, 39 39 C 39 40, 39 40, 39 40 L 31 40 C 31 40, 30 40, 30 39 C 30 39, 31 39, 31 39 L 31 39 L 31 30 C 31 29, 32 29, 32 29 Z M 9 29 L 15 29 C 15 29, 16 29, 16 30 L 16 39 L 16 39 C 16 39, 17 39, 17 39 C 17 40, 16 40, 16 40 L 8 40 C 8 40, 8 40, 8 39 C 8 39, 8 39, 8 39 L 9 39 L 9 30 C 9 29, 9 29, 9 29 Z M 5 24 L 5 47 L 19 47 L 19 31 L 19 31 C 18 31, 18 30, 18 30 C 18 29, 18 29, 19 29 L 28 29 C 29 29, 29 29, 29 30 C 29 30, 29 31, 28 31 L 28 31 L 28 47 L 42 47 L 42 24 L 5 24 Z M 24 10 C 22 10, 21 12, 21 13 L 21 17 L 27 17 L 27 13 C 27 12, 25 10, 24 10 Z M 24 9 C 26 9, 28 11, 28 13 L 28 17 L 28 17 C 29 17, 29 18, 29 18 C 29 19, 29 19, 28 19 L 19 19 C 18 19, 18 19, 18 18 C 18 18, 18 17, 19 17 L 19 17 L 19 13 C 19 11, 21 9, 24 9 Z M 24 2 L 2 22 L 44 22 L 24 2 Z M 9 1 L 9 14 L 14 9 L 14 1 L 9 1 Z M 7 0 L 16 0 C 16 0, 16 0, 16 1 C 16 1, 16 1, 16 1 L 15 1 L 15 8 L 23 0 C 23 0, 24 0, 24 0 L 47 22 C 47 23, 47 23, 47 23 C 47 24, 47 24, 46 24 L 43 24 L 43 47 L 46 47 C 47 47, 47 47, 47 47 C 47 48, 47 48, 46 48 L 1 48 C 0 48, 0 48, 0 47 C 0 47, 0 47, 1 47 L 4 47 L 4 24 L 1 24 C 0 24, 0 24, 0 23 C 0 23, 0 23, 0 22 L 8 15 L 8 1 L 7 1 C 7 1, 6 1, 6 1 C 6 0, 7 0, 7 0 Z"
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 113,
    "y": 594,
    "width": 38,
    "height": 47,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 8 34 C 9 34, 9 34, 9 35 L 9 45 L 19 41 C 19 41, 19 41, 19 41 L 29 45 L 29 35 C 29 34, 29 34, 29 34 C 30 34, 30 34, 30 35 L 30 46 C 30 47, 30 47, 30 47 C 30 47, 30 47, 29 47 C 29 47, 29 47, 29 47 L 19 42 L 9 47 C 9 47, 8 47, 8 47 C 8 47, 8 47, 8 46 L 8 35 C 8 34, 8 34, 8 34 Z M 19 12 L 17 16 C 17 16, 17 16, 17 16 L 13 17 L 16 20 C 16 20, 16 20, 16 20 L 15 24 L 19 22 C 19 22, 19 22, 19 22 L 23 24 L 22 20 C 22 20, 22 20, 22 20 L 25 17 L 21 16 C 21 16, 21 16, 21 16 L 19 12 Z M 18 10 C 19 10, 19 10, 20 10 L 22 15 L 27 16 C 27 16, 27 16, 27 16 C 27 16, 27 17, 27 17 L 24 20 L 24 25 C 24 26, 24 26, 24 26 C 24 26, 24 26, 23 26 L 19 24 L 15 26 C 15 26, 14 26, 14 26 C 14 26, 14 26, 14 26 C 14 26, 14 26, 14 25 L 14 20 L 11 17 C 11 17, 11 16, 11 16 C 11 16, 11 16, 11 16 L 16 15 L 18 10 Z M 19 7 C 12 7, 7 12, 7 19 C 7 25, 12 30, 19 30 C 25 30, 31 25, 31 19 C 31 12, 25 7, 19 7 Z M 19 6 C 26 6, 32 12, 32 19 C 32 26, 26 32, 19 32 C 12 32, 6 26, 6 19 C 6 12, 12 6, 19 6 Z M 19 2 L 16 4 C 16 4, 16 4, 16 4 L 12 3 L 11 6 C 10 6, 10 6, 10 6 L 7 7 L 6 10 C 6 10, 6 10, 6 10 L 3 12 L 4 15 C 4 16, 4 16, 4 16 L 2 19 L 4 21 C 4 22, 4 22, 4 22 L 3 25 L 6 27 C 6 27, 6 27, 6 28 L 7 31 L 10 31 C 10 31, 10 32, 11 32 L 12 35 L 16 34 C 16 34, 16 34, 16 34 C 16 34, 16 34, 16 34 L 19 36 L 22 34 C 22 34, 22 34, 22 34 L 26 35 L 27 32 C 28 32, 28 31, 28 31 L 31 31 L 32 28 C 32 27, 32 27, 32 27 L 35 25 L 34 22 C 34 22, 34 22, 34 21 L 36 19 L 34 16 C 34 16, 34 16, 34 15 L 35 12 L 32 10 C 32 10, 32 10, 32 10 L 31 7 L 28 6 C 28 6, 28 6, 27 6 L 26 3 L 22 4 C 22 4, 22 4, 22 4 L 19 2 Z M 19 0 C 19 0, 19 0, 19 0 L 22 2 L 26 1 C 26 1, 26 1, 27 2 L 29 5 L 32 5 C 32 5, 33 6, 33 6 L 33 9 L 36 11 C 37 11, 37 12, 37 12 L 36 15 L 38 18 C 38 19, 38 19, 38 19 L 36 22 L 37 26 C 37 26, 37 26, 36 26 L 33 28 L 33 32 C 33 32, 32 32, 32 32 L 29 33 L 27 36 C 26 36, 26 36, 26 36 L 22 35 L 19 37 C 19 37, 19 37, 19 37 C 19 37, 19 37, 19 37 L 16 35 L 12 36 C 12 36, 12 36, 11 36 L 10 33 L 6 32 C 6 32, 5 32, 5 32 L 5 28 L 2 26 C 1 26, 1 26, 1 26 L 2 22 L 0 19 C 0 19, 0 19, 0 18 L 2 15 L 1 12 C 1 12, 1 11, 2 11 L 5 9 L 5 6 C 5 6, 6 5, 6 5 L 10 5 L 11 2 C 12 1, 12 1, 12 1 L 16 2 L 19 0 Z"
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 109,
    "y": 484,
    "width": 47,
    "height": 48,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 37 30 L 37 41 L 41 41 L 41 33 C 41 32, 40 30, 39 30 L 37 30 Z M 12 30 L 12 47 L 35 47 L 35 30 L 12 30 Z M 8 30 C 7 30, 6 32, 6 33 L 6 41 L 10 41 L 10 30 L 8 30 Z M 1 25 L 1 40 C 1 40, 2 41, 3 41 L 5 41 L 5 33 C 5 31, 6 29, 8 29 L 39 29 C 41 29, 42 31, 42 33 L 42 41 L 44 41 C 45 41, 46 40, 46 40 L 46 25 L 1 25 Z M 12 19 C 13 19, 13 20, 13 20 C 13 21, 13 21, 12 21 C 12 21, 12 21, 12 20 C 12 20, 12 19, 12 19 Z M 8 19 C 9 19, 9 20, 9 20 C 9 21, 9 21, 8 21 C 8 21, 8 21, 8 20 C 8 20, 8 19, 8 19 Z M 5 19 C 5 19, 5 20, 5 20 C 5 21, 5 21, 5 21 C 4 21, 4 21, 4 20 C 4 20, 4 19, 5 19 Z M 3 17 C 2 17, 1 18, 1 18 L 1 23 L 46 23 L 46 18 C 46 18, 45 17, 44 17 L 3 17 Z M 37 9 L 37 15 L 41 15 L 41 9 L 37 9 Z M 6 9 L 6 15 L 10 15 L 10 9 L 6 9 Z M 12 1 L 12 15 L 35 15 L 35 1 L 12 1 Z M 11 0 L 36 0 C 36 0, 37 0, 37 1 L 37 8 L 42 8 C 42 8, 42 8, 42 8 L 42 15 L 44 15 C 46 15, 47 17, 47 18 L 47 40 C 47 41, 46 42, 44 42 L 37 42 L 37 47 C 37 48, 36 48, 36 48 L 11 48 C 11 48, 10 48, 10 47 L 10 42 L 3 42 C 1 42, 0 41, 0 40 L 0 18 C 0 17, 1 15, 3 15 L 5 15 L 5 8 C 5 8, 5 8, 5 8 L 10 8 L 10 1 C 10 0, 11 0, 11 0 Z"
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 109,
    "y": 374,
    "width": 47,
    "height": 48,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 21 37 C 21 37, 21 37, 21 37 L 21 41 C 21 41, 21 41, 21 41 L 26 41 C 26 41, 26 41, 26 41 L 26 37 C 26 37, 26 37, 26 37 L 21 37 Z M 8 37 C 8 37, 8 37, 8 37 L 8 41 C 8 41, 8 41, 8 41 L 13 41 C 13 41, 13 41, 13 41 L 13 37 C 13 37, 13 37, 13 37 L 8 37 Z M 21 36 L 26 36 C 27 36, 28 36, 28 37 L 28 41 C 28 41, 27 42, 26 42 L 21 42 C 20 42, 19 41, 19 41 L 19 37 C 19 36, 20 36, 21 36 Z M 8 36 L 13 36 C 14 36, 15 36, 15 37 L 15 41 C 15 41, 14 42, 13 42 L 8 42 C 7 42, 7 41, 7 41 L 7 37 C 7 36, 7 36, 8 36 Z M 34 27 C 34 27, 34 27, 34 27 L 34 30 C 34 30, 34 31, 34 31 L 39 31 C 39 31, 39 30, 39 30 L 39 27 C 39 27, 39 27, 39 27 L 34 27 Z M 21 27 C 21 27, 21 27, 21 27 L 21 30 C 21 30, 21 31, 21 31 L 26 31 C 26 31, 26 30, 26 30 L 26 27 C 26 27, 26 27, 26 27 L 21 27 Z M 8 27 C 8 27, 8 27, 8 27 L 8 30 C 8 30, 8 31, 8 31 L 13 31 C 13 31, 13 30, 13 30 L 13 27 C 13 27, 13 27, 13 27 L 8 27 Z M 34 25 L 39 25 C 40 25, 41 26, 41 27 L 41 30 C 41 31, 40 32, 39 32 L 34 32 C 33 32, 32 31, 32 30 L 32 27 C 32 26, 33 25, 34 25 Z M 21 25 L 26 25 C 27 25, 28 26, 28 27 L 28 30 C 28 31, 27 32, 26 32 L 21 32 C 20 32, 19 31, 19 30 L 19 27 C 19 26, 20 25, 21 25 Z M 8 25 L 13 25 C 14 25, 15 26, 15 27 L 15 30 C 15 31, 14 32, 13 32 L 8 32 C 7 32, 7 31, 7 30 L 7 27 C 7 26, 7 25, 8 25 Z M 34 16 C 34 16, 34 17, 34 17 L 34 20 C 34 20, 34 20, 34 20 L 39 20 C 39 20, 39 20, 39 20 L 39 17 C 39 17, 39 16, 39 16 L 34 16 Z M 21 16 C 21 16, 21 17, 21 17 L 21 20 C 21 20, 21 20, 21 20 L 26 20 C 26 20, 26 20, 26 20 L 26 17 C 26 17, 26 16, 26 16 L 21 16 Z M 34 15 L 39 15 C 40 15, 41 16, 41 17 L 41 20 C 41 21, 40 22, 39 22 L 34 22 C 33 22, 32 21, 32 20 L 32 17 C 32 16, 33 15, 34 15 Z M 21 15 L 26 15 C 27 15, 28 16, 28 17 L 28 20 C 28 21, 27 22, 26 22 L 21 22 C 20 22, 19 21, 19 20 L 19 17 C 19 16, 20 15, 21 15 Z M 1 11 L 1 44 C 1 46, 2 47, 4 47 L 43 47 C 45 47, 46 46, 46 44 L 46 11 L 1 11 Z M 4 3 C 2 3, 1 4, 1 6 L 1 10 L 46 10 L 46 6 C 46 4, 45 3, 43 3 L 41 3 L 41 5 C 41 5, 40 5, 40 5 C 40 5, 39 5, 39 5 L 39 3 L 34 3 L 34 5 C 34 5, 34 5, 33 5 C 33 5, 33 5, 33 5 L 33 3 L 27 3 L 27 5 C 27 5, 27 5, 27 5 C 26 5, 26 5, 26 5 L 26 3 L 21 3 L 21 5 C 21 5, 20 5, 20 5 C 20 5, 19 5, 19 5 L 19 3 L 14 3 L 14 5 C 14 5, 14 5, 13 5 C 13 5, 13 5, 13 5 L 13 3 L 7 3 L 7 5 C 7 5, 7 5, 7 5 C 6 5, 6 5, 6 5 L 6 3 L 4 3 Z M 7 0 C 7 0, 7 0, 7 1 L 7 2 L 13 2 L 13 1 C 13 0, 13 0, 13 0 C 14 0, 14 0, 14 1 L 14 2 L 19 2 L 19 1 C 19 0, 20 0, 20 0 C 20 0, 21 0, 21 1 L 21 2 L 26 2 L 26 1 C 26 0, 26 0, 27 0 C 27 0, 27 0, 27 1 L 27 2 L 33 2 L 33 1 C 33 0, 33 0, 33 0 C 34 0, 34 0, 34 1 L 34 2 L 39 2 L 39 1 C 39 0, 40 0, 40 0 C 40 0, 41 0, 41 1 L 41 2 L 43 2 C 45 2, 47 4, 47 6 L 47 44 C 47 46, 45 48, 43 48 L 4 48 C 2 48, 0 46, 0 44 L 0 6 C 0 4, 2 2, 4 2 L 6 2 L 6 1 C 6 0, 6 0, 7 0 Z"
  },
  {
    "id": "sp-39",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 113,
    "y": 264,
    "width": 40,
    "height": 47,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 18 25 L 18 28 L 22 28 L 22 25 L 18 25 Z M 18 23 L 22 23 C 23 23, 23 24, 23 24 L 23 29 C 23 29, 23 29, 22 29 L 18 29 C 17 29, 17 29, 17 29 L 17 24 C 17 24, 17 23, 18 23 Z M 14 20 L 14 31 C 16 32, 18 33, 20 33 C 22 33, 24 32, 26 31 L 26 20 L 14 20 Z M 20 11 L 12 19 L 28 19 L 20 11 Z M 20 7 C 13 7, 7 13, 7 20 C 7 24, 9 28, 13 30 L 13 20 L 10 20 C 10 20, 10 20, 10 20 C 10 20, 10 19, 10 19 L 20 10 C 20 10, 20 10, 21 10 L 30 19 C 31 19, 31 20, 30 20 C 30 20, 30 20, 30 20 L 28 20 L 28 30 C 31 28, 33 24, 33 20 C 33 13, 27 7, 20 7 Z M 20 5 C 28 5, 35 12, 35 20 C 35 28, 28 34, 20 34 C 12 34, 5 28, 5 20 C 5 12, 12 5, 20 5 Z M 20 1 C 15 1, 11 3, 7 7 C 0 14, 0 25, 7 32 L 20 45 L 33 32 C 40 25, 40 14, 33 7 C 29 3, 25 1, 20 1 Z M 20 0 C 25 0, 30 2, 34 6 C 42 13, 42 26, 34 33 L 20 47 C 20 47, 20 47, 20 47 C 20 47, 20 47, 19 47 L 6 33 C -2 26, -2 13, 6 6 C 10 2, 15 0, 20 0 Z"
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

export function Migso199Template({ data }: { data: BrainData }): ReactElement {
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
