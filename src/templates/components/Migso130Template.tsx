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
    "x": 924,
    "y": 98,
    "width": 222,
    "height": 194,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 1 0 L 41 67 L 0 135 C 32 137, 64 150, 89 175 C 95 181, 100 187, 105 194 L 184 194 L 222 125 C 212 109, 199 93, 185 79 C 134 28, 68 2, 1 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 686,
    "y": 98,
    "width": 258,
    "height": 199,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 218 0 C 153 3, 88 29, 38 79 C 23 94, 11 110, 0 127 L 77 128 L 115 199 C 120 191, 127 182, 134 175 C 157 152, 187 139, 217 136 L 258 67 L 218 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1039,
    "y": 241,
    "width": 149,
    "height": 255,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 117 0 L 79 69 L 0 68 C 18 106, 18 149, 1 187 L 40 255 L 118 253 C 139 214, 149 170, 149 127 C 149 83, 138 39, 117 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 645,
    "y": 243,
    "width": 151,
    "height": 255,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 31 0 C 10 40, 0 84, 0 128 C 0 171, 11 215, 32 255 L 70 188 L 151 190 C 132 154, 131 111, 146 73 L 107 0 L 31 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 889,
    "y": 446,
    "width": 259,
    "height": 195,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 141 0 C 136 7, 131 14, 124 20 C 101 43, 72 56, 41 59 L 0 129 L 39 195 C 105 192, 170 166, 220 116 C 235 101, 248 84, 259 67 L 180 68 L 141 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 688,
    "y": 449,
    "width": 222,
    "height": 192,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 38 0 L 0 66 C 10 83, 23 98, 37 113 C 88 163, 154 190, 220 192 L 181 126 L 222 56 C 190 54, 158 41, 133 17 C 128 12, 124 7, 120 2 L 38 0 Z"
  },
  {
    "id": "sp-6",
    "x": 815,
    "y": 331,
    "width": 205,
    "height": 74,
    "text": "Lean Manufacturing"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 63,
    "y": 607,
    "width": 21,
    "height": 21,
    "fillColor": "#4a90d9",
    "text": ""
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 4,
    "x": 102,
    "y": 608,
    "width": 438,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 1,
    "x": 98,
    "y": 575,
    "width": 79,
    "height": 36,
    "text": "Rapid"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 63,
    "y": 519,
    "width": 21,
    "height": 21,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 3,
    "x": 102,
    "y": 521,
    "width": 438,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 98,
    "y": 488,
    "width": 72,
    "height": 36,
    "text": "Agile"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 63,
    "y": 432,
    "width": 21,
    "height": 21,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 102,
    "y": 433,
    "width": 438,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-15",
    "x": 98,
    "y": 400,
    "width": 224,
    "height": 36,
    "text": "Mass customization"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 63,
    "y": 343,
    "width": 21,
    "height": 21,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 1,
    "x": 102,
    "y": 344,
    "width": 438,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "x": 98,
    "y": 311,
    "width": 100,
    "height": 36,
    "text": "Flexible"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 63,
    "y": 254,
    "width": 21,
    "height": 21,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 0,
    "x": 102,
    "y": 256,
    "width": 438,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-21",
    "x": 98,
    "y": 223,
    "width": 139,
    "height": 36,
    "text": "Just in time"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 63,
    "y": 167,
    "width": 21,
    "height": 21,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-23",
    "x": 102,
    "y": 168,
    "width": 500,
    "height": 27,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-24",
    "x": 98,
    "y": 132,
    "width": 192,
    "height": 36,
    "text": "Mass Production"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 801,
    "y": 153,
    "width": 62,
    "height": 59,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 14 36 C 14 36, 14 36, 15 36 C 15 36, 15 36, 15 36 C 15 36, 16 36, 16 37 C 16 37, 16 38, 16 38 C 16 38, 16 38, 16 39 C 16 39, 16 39, 16 39 C 15 39, 15 39, 15 39 L 15 41 C 15 41, 15 41, 15 41 C 15 41, 15 41, 14 41 C 14 41, 14 41, 14 41 L 14 39 C 14 39, 13 39, 13 38 C 13 38, 13 38, 13 37 C 13 37, 13 37, 13 37 C 13 36, 13 36, 13 36 C 14 36, 14 36, 14 36 Z M 13 29 C 13 29, 13 29, 13 29 L 15 30 L 16 30 C 16 31, 17 31, 17 31 C 17 32, 17 32, 17 33 L 17 34 L 15 33 L 12 32 L 12 30 C 12 30, 12 30, 12 30 C 12 30, 12 30, 13 29 C 13 29, 13 29, 13 29 Z M 13 28 C 12 28, 12 28, 12 28 C 11 29, 11 29, 11 29 C 11 30, 11 30, 11 30 L 11 32 L 11 32 C 10 32, 10 31, 10 31 C 10 31, 9 32, 9 32 C 9 32, 9 32, 9 32 C 9 33, 9 33, 9 33 L 9 39 C 9 39, 9 40, 9 40 C 9 41, 10 41, 10 41 L 15 43 L 19 45 C 19 45, 19 45, 20 45 C 20 45, 20 45, 20 45 C 21 45, 21 44, 21 44 C 21 44, 21 44, 21 43 L 21 38 C 21 37, 21 37, 21 36 C 20 36, 20 35, 20 35 L 19 35 L 19 33 C 19 32, 19 31, 18 31 C 18 30, 17 30, 16 29 L 15 29 L 14 28 C 13 28, 13 28, 13 28 Z M 62 13 L 62 48 C 62 48, 62 48, 62 48 L 32 59 L 32 24 L 44 20 L 44 28 C 44 28, 45 29, 46 29 L 50 27 C 51 27, 51 27, 51 26 L 51 17 L 62 13 C 62 13, 62 13, 62 13 Z M 0 13 C 0 13, 0 13, 0 13 L 15 19 L 30 24 L 30 59 C 30 59, 30 59, 30 59 L 15 53 L 0 48 C 0 48, 0 48, 0 48 L 0 13 Z M 14 6 L 32 13 L 44 18 L 32 23 L 31 23 C 31 23, 31 23, 31 23 L 1 12 C 0 12, 0 12, 0 12 C 0 11, 0 11, 0 11 L 14 6 Z M 31 0 L 32 0 L 61 11 C 62 11, 62 11, 62 11 C 62 12, 62 12, 62 12 L 50 16 L 32 9 L 20 4 L 31 0 C 31 0, 31 0, 31 0 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 771,
    "y": 506,
    "width": 56,
    "height": 62,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 30 31 L 28 34 L 27 37 L 28 37 L 30 37 L 30 31 Z M 34 26 L 37 26 L 37 33 L 40 33 L 40 26 L 43 26 L 43 42 L 40 42 L 40 35 L 37 35 L 37 42 L 34 42 L 34 26 Z M 29 26 L 32 26 L 32 37 L 33 37 L 33 39 L 32 39 L 32 42 L 30 42 L 30 39 L 28 39 L 25 39 L 25 37 L 28 28 L 29 26 Z M 20 25 C 21 25, 21 26, 22 26 C 22 26, 23 27, 23 27 C 23 28, 24 29, 24 30 C 24 30, 23 31, 23 32 C 23 32, 23 33, 23 33 C 22 34, 22 34, 22 35 C 21 35, 21 36, 20 36 C 20 36, 20 37, 19 37 C 19 38, 19 38, 19 38 C 18 39, 18 39, 18 39 C 18 39, 18 40, 18 40 C 18 40, 18 40, 18 40 L 23 40 L 23 42 L 16 42 L 16 40 C 16 39, 16 39, 16 38 C 16 38, 17 37, 17 37 C 17 36, 17 36, 18 35 C 18 35, 19 35, 19 34 C 19 34, 20 33, 20 33 C 20 33, 21 32, 21 31 C 21 31, 21 30, 21 30 C 21 29, 21 29, 21 29 C 21 28, 21 28, 20 28 C 20 28, 20 28, 20 28 C 19 28, 19 28, 19 28 C 18 28, 18 29, 18 29 L 18 31 L 16 31 L 16 30 C 16 29, 16 28, 16 27 C 17 27, 17 26, 18 26 C 18 26, 19 25, 20 25 Z M 52 20 C 52 20, 53 20, 53 21 C 53 21, 53 21, 53 21 L 53 21 C 53 21, 53 21, 53 21 C 54 22, 54 23, 55 25 C 55 26, 56 28, 56 29 C 56 30, 56 31, 55 31 C 55 31, 55 31, 55 31 L 49 31 L 49 31 C 49 31, 48 31, 48 30 C 48 30, 48 30, 48 30 C 48 29, 47 28, 47 28 C 47 27, 47 26, 46 25 L 46 25 C 46 25, 46 24, 47 24 L 47 24 L 51 20 C 51 20, 52 20, 52 20 Z M 42 9 C 42 9, 42 9, 43 9 C 43 9, 43 9, 43 9 C 43 9, 43 9, 43 9 C 44 10, 44 11, 45 11 C 46 12, 47 13, 48 14 C 48 14, 48 15, 48 15 L 44 19 L 44 19 C 43 20, 43 20, 42 19 C 42 19, 42 19, 42 19 C 42 19, 42 19, 42 19 C 42 19, 42 19, 42 19 C 41 19, 41 18, 40 18 C 40 18, 39 17, 39 17 L 39 17 C 38 16, 38 16, 39 15 L 41 10 C 41 10, 41 9, 42 9 Z M 23 0 C 23 0, 23 0, 24 0 L 33 10 C 34 10, 34 11, 33 12 L 33 12 L 24 21 C 23 22, 22 22, 22 21 C 21 21, 21 21, 21 20 L 21 15 C 21 15, 20 15, 19 16 C 17 17, 15 18, 14 19 C 12 21, 11 24, 10 26 C 9 28, 8 31, 8 34 C 8 36, 9 39, 10 41 C 11 44, 12 46, 14 48 C 16 50, 18 51, 20 52 C 23 53, 25 54, 28 54 C 31 54, 33 53, 36 52 C 38 51, 40 50, 42 48 C 44 46, 45 45, 46 42 C 47 41, 47 39, 48 37 L 56 38 C 55 41, 55 44, 53 46 C 52 49, 50 51, 48 54 C 45 56, 42 58, 39 60 C 35 61, 32 62, 28 62 C 24 62, 21 61, 17 60 C 14 58, 11 56, 8 54 C 6 51, 4 48, 2 45 C 1 41, 0 38, 0 34 C 0 30, 1 26, 2 23 C 4 20, 6 16, 8 14 C 11 11, 13 10, 16 8 C 18 7, 20 7, 21 6 L 21 1 C 21 1, 22 0, 23 0 Z"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 683,
    "y": 322,
    "width": 62,
    "height": 51,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 45 38 L 45 43 L 48 43 L 50 43 L 50 38 L 48 38 L 45 38 Z M 34 38 L 34 43 L 36 43 L 39 43 L 39 38 L 36 38 L 34 38 Z M 23 38 L 23 43 L 25 43 L 28 43 L 28 38 L 25 38 L 23 38 Z M 12 38 L 12 43 L 14 43 L 17 43 L 17 38 L 14 38 L 12 38 Z M 45 27 L 45 32 L 48 32 L 50 32 L 50 27 L 48 27 L 45 27 Z M 34 27 L 34 32 L 36 32 L 39 32 L 39 27 L 36 27 L 34 27 Z M 23 27 L 23 32 L 25 32 L 28 32 L 28 27 L 25 27 L 23 27 Z M 12 27 L 12 32 L 14 32 L 17 32 L 17 27 L 14 27 L 12 27 Z M 45 17 L 45 22 L 48 22 L 50 22 L 50 17 L 48 17 L 45 17 Z M 34 17 L 34 22 L 36 22 L 39 22 L 39 17 L 36 17 L 34 17 Z M 23 17 L 23 22 L 25 22 L 28 22 L 28 17 L 25 17 L 23 17 Z M 1 4 L 4 4 L 8 4 L 8 4 L 8 9 L 8 9 L 8 9 C 8 10, 9 11, 10 11 C 11 11, 12 10, 12 9 L 12 4 L 12 4 L 14 4 L 18 4 L 18 4 L 18 9 L 18 9 L 18 9 C 18 10, 19 11, 21 11 C 22 11, 23 10, 23 9 L 23 4 L 23 4 L 25 4 L 29 4 L 29 4 L 29 9 L 29 9 L 29 9 C 29 10, 30 11, 31 11 C 32 11, 33 10, 33 9 L 33 4 L 33 4 L 36 4 L 39 4 L 39 4 L 39 9 L 39 9 L 39 9 C 39 10, 40 11, 41 11 C 43 11, 44 10, 44 9 L 44 4 L 44 4 L 48 4 L 49 4 L 50 4 L 50 9 L 49 9 L 49 9 C 49 10, 51 11, 52 11 C 53 11, 54 10, 54 9 L 54 4 L 54 4 L 58 4 L 61 4 C 61 4, 62 5, 62 6 C 62 8, 61 9, 61 9 L 59 9 L 59 46 C 59 47, 59 49, 58 50 C 57 50, 55 51, 54 51 L 48 51 L 36 51 L 25 51 L 14 51 L 8 51 C 6 51, 5 50, 4 50 C 3 49, 3 47, 3 46 L 3 9 L 1 9 C 0 9, 0 8, 0 6 C 0 5, 0 4, 1 4 Z M 52 0 C 53 0, 53 0, 53 1 L 53 9 C 53 10, 53 10, 52 10 C 51 10, 51 10, 51 9 L 51 1 C 51 0, 51 0, 52 0 Z M 41 0 C 42 0, 42 0, 42 1 L 42 9 C 42 10, 42 10, 41 10 C 41 10, 40 10, 40 9 L 40 1 C 40 0, 41 0, 41 0 Z M 31 0 C 32 0, 32 0, 32 1 L 32 9 C 32 10, 32 10, 31 10 C 30 10, 30 10, 30 9 L 30 1 C 30 0, 30 0, 31 0 Z M 21 0 C 21 0, 22 0, 22 1 L 22 9 C 22 10, 21 10, 21 10 C 20 10, 19 10, 19 9 L 19 1 C 19 0, 20 0, 21 0 Z M 10 0 C 11 0, 11 0, 11 1 L 11 9 C 11 10, 11 10, 10 10 C 10 10, 9 10, 9 9 L 9 1 C 9 0, 10 0, 10 0 Z"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 960,
    "y": 532,
    "width": 64,
    "height": 48,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 53 41 C 53 41, 54 41, 54 42 C 54 42, 53 43, 53 43 C 52 43, 52 42, 52 42 C 52 41, 52 41, 53 41 Z M 36 41 C 37 41, 37 41, 37 42 C 37 42, 37 43, 36 43 C 36 43, 35 42, 35 42 C 35 41, 36 41, 36 41 Z M 13 41 C 14 41, 14 41, 14 42 C 14 42, 14 43, 13 43 C 13 43, 12 42, 12 42 C 12 41, 13 41, 13 41 Z M 53 40 C 52 40, 51 40, 51 40 C 51 41, 50 41, 50 42 C 50 43, 51 43, 51 44 C 51 44, 52 44, 53 44 C 53 44, 54 44, 54 44 C 55 43, 55 43, 55 42 C 55 41, 55 41, 54 40 C 54 40, 53 40, 53 40 Z M 36 40 C 36 40, 35 40, 35 40 C 34 41, 34 41, 34 42 C 34 43, 34 43, 35 44 C 35 44, 36 44, 36 44 C 37 44, 37 44, 38 44 C 38 43, 39 43, 39 42 C 39 41, 38 41, 38 40 C 37 40, 37 40, 36 40 Z M 13 40 C 13 40, 12 40, 12 40 C 11 41, 11 41, 11 42 C 11 43, 11 43, 12 44 C 12 44, 13 44, 13 44 C 14 44, 15 44, 15 44 C 15 43, 16 43, 16 42 C 16 41, 15 41, 15 40 C 15 40, 14 40, 13 40 Z M 53 36 C 54 36, 56 36, 57 38 C 58 39, 59 40, 59 42 C 59 44, 58 45, 57 46 C 56 47, 54 48, 53 48 C 51 48, 49 47, 48 46 C 47 45, 46 44, 46 42 C 46 40, 47 39, 48 38 C 49 36, 51 36, 53 36 Z M 36 36 C 38 36, 40 36, 41 38 C 42 39, 42 40, 42 42 C 42 44, 42 45, 41 46 C 40 47, 38 48, 36 48 C 35 48, 33 47, 32 46 C 31 45, 30 44, 30 42 C 30 40, 31 39, 32 38 C 33 36, 35 36, 36 36 Z M 13 36 C 15 36, 17 36, 18 38 C 19 39, 20 40, 20 42 C 20 44, 19 45, 18 46 C 17 47, 15 48, 13 48 C 12 48, 10 47, 9 46 C 8 45, 7 44, 7 42 C 7 40, 8 39, 9 38 C 10 36, 12 36, 13 36 Z M 51 26 L 51 28 L 53 28 L 57 28 L 59 28 L 59 26 L 57 26 L 53 26 L 51 26 Z M 31 26 L 31 28 L 33 28 L 38 28 L 40 28 L 40 26 L 38 26 L 33 26 L 31 26 Z M 16 24 C 14 24, 11 25, 9 27 C 8 28, 7 29, 6 30 L 16 30 L 23 30 L 23 24 L 17 24 C 17 24, 16 24, 16 24 C 16 24, 16 24, 16 24 C 16 24, 16 24, 16 24 Z M 16 21 C 16 21, 16 21, 16 21 C 16 21, 16 21, 16 21 C 16 21, 16 21, 16 21 C 16 21, 17 21, 17 21 C 17 21, 16 21, 16 21 L 24 21 C 25 21, 25 22, 25 22 L 25 33 L 61 33 C 62 33, 62 34, 62 34 L 62 41 L 63 41 L 63 43 L 61 43 L 60 43 C 60 43, 60 42, 60 42 C 60 40, 59 38, 58 37 C 56 35, 55 34, 53 34 C 51 34, 49 35, 47 37 C 46 38, 45 40, 45 42 C 45 42, 45 43, 45 43 L 44 43 C 44 43, 44 42, 44 42 C 44 40, 43 38, 41 37 C 40 35, 38 34, 36 34 C 34 34, 32 35, 31 37 C 30 38, 29 39, 29 41 C 29 41, 29 41, 29 42 C 29 42, 29 43, 29 43 L 24 43 C 24 43, 24 43, 24 43 L 24 43 L 24 43 L 21 43 C 21 43, 21 42, 21 42 C 21 40, 20 38, 19 37 C 18 36, 17 35, 16 35 C 15 35, 14 34, 13 34 C 11 34, 9 35, 8 37 C 7 38, 6 40, 6 42 C 6 42, 6 43, 6 43 L 3 43 L 2 43 L 1 43 C 1 43, 0 43, 0 42 C 0 41, 1 41, 1 41 L 1 41 L 2 34 C 3 30, 5 27, 7 25 C 10 23, 13 21, 16 21 Z M 57 21 C 57 21, 57 21, 57 21 L 55 22 C 55 23, 55 23, 55 23 C 56 23, 56 23, 56 23 L 57 23 L 57 25 L 57 25 L 58 25 L 58 23 L 59 23 C 59 23, 59 23, 59 23 C 60 23, 60 23, 59 22 L 58 21 C 58 21, 58 21, 57 21 Z M 53 21 C 52 21, 52 21, 52 21 L 51 22 C 50 23, 50 23, 51 23 C 51 23, 51 23, 51 23 L 52 23 L 52 25 L 53 25 L 53 25 L 53 23 L 54 23 C 54 23, 54 23, 55 23 C 55 23, 55 23, 55 22 L 53 21 C 53 21, 53 21, 53 21 Z M 38 21 C 38 21, 38 21, 38 21 L 36 22 C 36 23, 36 23, 36 23 C 36 23, 37 23, 37 23 L 38 23 L 38 25 L 38 25 L 39 25 L 39 23 L 39 23 C 40 23, 40 23, 40 23 C 40 23, 40 23, 40 22 L 39 21 C 39 21, 38 21, 38 21 Z M 33 21 C 33 21, 33 21, 33 21 L 31 22 C 31 23, 31 23, 31 23 C 32 23, 32 23, 32 23 L 33 23 L 33 25 L 33 25 L 34 25 L 34 23 L 34 23 C 35 23, 35 23, 35 23 C 36 23, 36 23, 35 22 L 34 21 C 34 21, 33 21, 33 21 Z M 46 16 L 47 16 L 53 16 L 57 16 L 63 16 L 64 16 L 64 18 L 64 30 L 64 32 L 63 32 L 57 32 L 53 32 L 47 32 L 46 32 L 46 30 L 46 18 L 46 16 Z M 27 16 L 28 16 L 33 16 L 38 16 L 43 16 L 45 16 L 45 18 L 45 30 L 45 32 L 43 32 L 38 32 L 33 32 L 28 32 L 27 32 L 27 30 L 27 18 L 27 16 Z M 51 10 L 51 11 L 53 11 L 57 11 L 59 11 L 59 10 L 57 10 L 53 10 L 51 10 Z M 31 10 L 31 11 L 33 11 L 38 11 L 40 11 L 40 10 L 38 10 L 33 10 L 31 10 Z M 57 4 C 57 4, 57 4, 57 4 L 55 6 C 55 6, 55 7, 55 7 C 56 7, 56 7, 56 7 L 57 6 L 57 9 L 57 9 L 58 9 L 58 6 L 59 7 C 59 7, 59 7, 59 7 C 60 7, 60 6, 59 6 L 58 4 C 58 4, 58 4, 57 4 Z M 53 4 C 52 4, 52 4, 52 4 L 51 6 C 50 6, 50 7, 51 7 C 51 7, 51 7, 51 7 L 52 6 L 52 9 L 53 9 L 53 9 L 53 6 L 54 7 C 54 7, 54 7, 55 7 C 55 7, 55 6, 55 6 L 53 4 C 53 4, 53 4, 53 4 Z M 38 4 C 38 4, 38 4, 38 4 L 36 6 C 36 6, 36 7, 36 7 C 36 7, 37 7, 37 7 L 38 6 L 38 9 L 38 9 L 39 9 L 39 6 L 39 7 C 40 7, 40 7, 40 7 C 40 7, 40 6, 40 6 L 39 4 C 39 4, 38 4, 38 4 Z M 33 4 C 33 4, 33 4, 33 4 L 31 6 C 31 6, 31 7, 31 7 C 32 7, 32 7, 32 7 L 33 6 L 33 9 L 33 9 L 34 9 L 34 6 L 34 7 C 35 7, 35 7, 35 7 C 36 7, 36 6, 35 6 L 34 4 C 34 4, 33 4, 33 4 Z M 46 0 L 47 0 L 53 0 L 57 0 L 63 0 L 64 0 L 64 1 L 64 14 L 64 15 L 63 15 L 57 15 L 53 15 L 47 15 L 46 15 L 46 14 L 46 1 L 46 0 Z M 27 0 L 28 0 L 33 0 L 38 0 L 43 0 L 45 0 L 45 1 L 45 14 L 45 15 L 43 15 L 38 15 L 33 15 L 28 15 L 27 15 L 27 14 L 27 1 L 27 0 Z"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 1097,
    "y": 365,
    "width": 55,
    "height": 62,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 27 0 L 29 4 L 33 5 C 38 6, 43 8, 47 12 C 52 17, 55 24, 55 31 C 55 32, 54 33, 54 33 C 53 33, 53 32, 52 32 C 52 30, 51 29, 50 29 C 49 28, 47 27, 46 27 C 45 27, 44 28, 43 28 C 42 28, 41 29, 40 29 C 40 30, 39 30, 39 29 C 38 29, 37 28, 36 28 C 35 28, 34 27, 33 27 C 33 27, 32 28, 31 28 L 29 29 L 29 49 L 29 49 C 29 51, 29 53, 29 54 C 29 56, 29 58, 27 60 C 26 61, 24 62, 22 62 C 20 62, 18 61, 16 60 C 15 58, 14 56, 14 54 C 14 53, 15 52, 16 52 C 17 52, 18 53, 18 54 C 18 55, 18 56, 19 57 C 20 58, 21 58, 22 58 C 23 58, 24 58, 24 57 C 25 56, 25 55, 25 54 C 25 53, 25 51, 25 49 L 26 49 L 26 29 L 24 28 C 23 28, 22 27, 21 27 C 20 27, 20 28, 19 28 C 18 28, 17 29, 16 29 C 16 30, 15 30, 15 29 C 14 29, 13 28, 12 28 C 11 28, 10 27, 10 27 C 8 27, 6 28, 5 29 C 4 29, 3 30, 2 32 C 2 32, 1 33, 1 32 C 0 32, 0 32, 0 31 C 0 24, 3 17, 8 12 C 12 8, 17 6, 22 5 L 26 4 L 27 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1010,
    "y": 181,
    "width": 61,
    "height": 61,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 6 46 C 6 46, 6 46, 5 46 L 5 46 C 5 46, 5 46, 5 46 C 5 47, 5 47, 5 47 C 5 47, 5 47, 5 47 C 5 47, 5 47, 5 47 C 5 47, 5 47, 5 47 C 6 47, 6 47, 6 47 C 6 47, 6 47, 6 47 C 6 47, 6 47, 6 46 L 6 46 Z M 10 45 C 10 45, 9 45, 9 45 C 9 46, 9 46, 9 46 C 9 46, 9 47, 9 47 C 9 47, 10 47, 10 47 L 10 47 C 10 47, 10 47, 10 47 C 10 47, 10 46, 10 46 C 10 46, 10 46, 10 45 C 10 45, 10 45, 10 45 Z M 20 45 C 20 45, 20 46, 20 46 L 20 48 L 20 48 L 20 45 Z M 14 44 C 14 44, 15 45, 15 45 C 15 45, 15 45, 15 45 L 15 46 C 15 45, 14 45, 14 45 C 14 45, 14 45, 14 45 C 14 45, 14 45, 14 45 C 13 46, 13 46, 13 46 C 13 46, 13 47, 14 47 C 14 47, 14 47, 14 47 C 14 47, 14 47, 14 47 C 15 47, 15 47, 15 46 L 15 47 C 15 47, 15 47, 15 48 C 15 48, 14 48, 14 48 C 14 48, 13 48, 13 47 C 13 47, 12 47, 12 46 C 12 46, 13 45, 13 45 C 13 45, 14 44, 14 44 Z M 5 44 L 5 44 C 6 44, 6 44, 6 45 C 6 45, 7 45, 7 45 C 7 45, 7 45, 7 46 L 7 47 C 7 47, 7 47, 7 47 C 7 47, 7 48, 7 48 L 6 48 C 6 48, 6 48, 6 47 C 6 47, 6 47, 6 47 C 6 48, 6 48, 6 48 C 6 48, 5 48, 5 48 C 5 48, 5 48, 5 48 C 5 48, 4 48, 4 48 C 4 47, 4 47, 4 47 C 4 47, 4 47, 4 46 C 4 46, 4 46, 4 46 C 5 46, 5 46, 5 46 C 5 46, 5 46, 5 46 C 6 46, 6 46, 6 46 L 6 46 C 6 45, 6 45, 6 45 C 6 45, 6 45, 5 45 C 5 45, 5 45, 5 45 C 5 45, 5 45, 5 46 L 4 45 C 4 45, 4 45, 4 45 C 5 45, 5 44, 5 44 Z M 19 44 C 19 44, 19 44, 19 45 C 19 45, 19 45, 18 45 L 18 44 C 19 44, 19 44, 19 44 Z M 8 43 L 9 43 L 9 45 C 9 45, 9 45, 10 44 C 10 44, 10 44, 10 44 C 10 44, 11 45, 11 45 C 11 45, 11 46, 11 46 C 11 47, 11 47, 11 47 C 11 48, 10 48, 10 48 C 10 48, 10 48, 10 48 C 10 48, 10 48, 9 48 C 9 48, 9 47, 9 47 L 9 48 L 8 48 L 8 43 Z M 37 21 C 32 21, 29 23, 26 25 C 23 28, 21 32, 21 36 C 21 41, 23 44, 26 47 C 29 50, 32 52, 37 52 C 41 52, 45 50, 47 47 C 50 44, 52 41, 52 36 C 52 32, 50 28, 47 25 C 45 23, 41 21, 37 21 Z M 37 18 C 42 18, 46 20, 49 24 C 53 27, 55 31, 55 36 C 55 40, 53 44, 51 46 L 50 48 L 54 52 L 55 52 C 55 52, 56 52, 56 52 C 56 52, 57 52, 57 52 C 57 52, 57 52, 57 52 L 61 56 L 61 61 L 56 61 L 52 57 C 52 57, 52 56, 52 56 L 53 54 L 48 50 L 47 51 C 44 53, 40 54, 37 54 C 32 54, 27 52, 24 49 C 21 46, 19 41, 19 36 C 19 31, 21 27, 24 24 C 27 20, 32 18, 37 18 Z M 43 0 L 46 0 L 46 19 C 45 19, 44 19, 43 18 L 43 0 Z M 42 0 L 42 0 L 42 18 C 42 18, 42 18, 42 18 L 42 0 Z M 40 0 L 41 0 L 41 17 C 40 17, 40 17, 40 17 L 40 0 Z M 38 0 L 39 0 L 39 17 C 39 17, 39 17, 38 17 L 38 0 Z M 36 0 L 38 0 L 38 17 C 37 17, 37 17, 37 17 C 36 17, 36 17, 36 17 L 36 0 Z M 34 0 L 35 0 L 35 17 C 35 17, 35 17, 34 17 L 34 0 Z M 32 0 L 33 0 L 33 17 C 33 17, 32 18, 32 18 L 32 0 Z M 28 0 L 31 0 L 31 18 C 30 18, 29 19, 28 19 L 28 0 Z M 24 0 L 26 0 L 26 21 C 25 21, 24 22, 24 22 L 24 0 Z M 20 0 L 22 0 L 22 24 C 21 25, 20 26, 20 28 L 20 0 Z M 16 0 L 18 0 L 18 31 C 18 33, 18 35, 18 36 C 18 38, 18 40, 18 41 L 18 42 L 16 42 L 16 0 Z M 14 0 L 15 0 L 15 42 L 14 42 L 14 0 Z M 12 0 L 13 0 L 13 42 L 12 42 L 12 0 Z M 8 0 L 10 0 L 10 42 L 8 42 L 8 0 Z M 6 0 L 7 0 L 7 42 L 6 42 L 6 0 Z M 4 0 L 5 0 L 5 42 L 4 42 L 4 0 Z M 0 0 L 2 0 L 2 48 L 0 48 L 0 0 Z"
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

export function Migso130Template({ data }: { data: BrainData }): ReactElement {
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
