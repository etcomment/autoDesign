import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 498,
    "y": 229,
    "width": 277,
    "height": 277,
    "fillColor": "#ffffff",
    "pathD": "M 277 138 L 277 138 C 277 62, 215 0, 139 0 L 139 0 C 62 0, 0 62, 0 138 L 0 138 C 0 215, 62 277, 139 277 L 139 277 C 215 277, 277 215, 277 138"
  },
  {
    "id": "sp-1",
    "x": 452,
    "y": 184,
    "width": 368,
    "height": 368,
    "fillColor": "#ee6d90",
    "pathD": "M 184 92 C 235 92, 276 133, 276 184 C 276 235, 235 276, 184 276 C 133 276, 92 235, 92 184 C 92 133, 133 92, 184 92 Z M 184 45 C 107 45, 45 107, 45 183 C 45 260, 107 322, 184 322 C 261 322, 323 260, 323 183 C 323 107, 261 45, 184 45 Z M 184 0 C 286 0, 368 82, 368 184 C 368 286, 286 368, 184 368 C 82 368, 0 286, 0 184 C 0 82, 82 0, 184 0 Z"
  },
  {
    "id": "sp-2",
    "x": 591,
    "y": 323,
    "width": 90,
    "height": 90,
    "fillColor": "#FFFFFF",
    "pathD": "M 90 45 L 90 45 C 90 20, 70 0, 45 0 L 45 0 C 20 0, 0 20, 0 45 L 0 45 C 0 70, 20 90, 45 90 L 45 90 C 70 90, 90 70, 90 45"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 632,
    "y": 365,
    "width": 10,
    "height": 12,
    "fillColor": "#6D6E71",
    "pathD": "M 10 6 L 10 6 C 10 9, 8 12, 5 12 L 5 12 C 2 12, 0 9, 0 6 L 0 6 C 0 3, 2 0, 5 0 L 5 0 C 8 0, 10 3, 10 6"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 636,
    "y": 372,
    "width": 135,
    "height": 141,
    "fillColor": "#4a90d9",
    "pathD": "M 0 4 L 113 141 L 135 121 L 8 0 L 0 4"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 707,
    "y": 266,
    "width": 46,
    "height": 62,
    "fillColor": "#52c49c",
    "pathD": "M 0 62 L 5 33 L 46 0 L 41 39 L 0 62"
  },
  {
    "id": "sp-6",
    "x": 705,
    "y": 335,
    "width": 39,
    "height": 40,
    "fillColor": "#52c49c",
    "pathD": "M 1 15 L 0 32 L 33 40 L 39 0 L 1 15"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 748,
    "y": 266,
    "width": 10,
    "height": 39,
    "fillColor": "#52c49c",
    "pathD": "M 5 0 L 9 1 L 4 38 L 0 39 L 5 0"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 738,
    "y": 334,
    "width": 10,
    "height": 41,
    "fillColor": "#52c49c",
    "pathD": "M 6 1 L 0 41 L 3 41 L 9 0 L 9 0 L 6 1"
  },
  {
    "id": "sp-9",
    "x": 633,
    "y": 304,
    "width": 124,
    "height": 73,
    "fillColor": "#503119",
    "pathD": "M 5 73 C 2 73, 0 70, 0 68 L 0 66 C 0 64, 2 62, 4 61 L 116 0 L 124 28 L 9 72 C 9 72, 7 73, 6 73 L 5 73"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 742,
    "y": 302,
    "width": 25,
    "height": 30,
    "fillColor": "#503119",
    "pathD": "M 25 16 C 25 24, 20 30, 13 30 L 12 30 C 6 30, 0 23, 0 15 L 0 14 C 0 6, 5 0, 12 0 L 12 0 C 19 0, 25 6, 25 15 L 25 16"
  },
  {
    "id": "sp-11",
    "x": 617,
    "y": 276,
    "width": 21,
    "height": 99,
    "fillColor": "#503119",
    "pathD": "M 10 99 C 9 99, 8 98, 7 97 C 7 96, 6 94, 6 94 L 0 3 L 21 0 L 15 94 C 15 96, 15 97, 13 98 C 13 99, 12 99, 12 99 L 10 99"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 618,
    "y": 269,
    "width": 21,
    "height": 19,
    "fillColor": "#503119",
    "pathD": "M 21 12 C 20 14, 17 17, 14 18 C 14 19, 13 19, 13 19 L 6 19 C 3 18, 1 17, 0 14 L 0 8 C 1 5, 4 2, 7 1 C 9 0, 10 0, 12 0 C 16 0, 20 2, 21 5 L 21 12"
  },
  {
    "id": "sp-13",
    "x": 537,
    "y": 374,
    "width": 99,
    "height": 39,
    "fillColor": "#503119",
    "pathD": "M 99 5 C 99 6, 99 6, 98 7 C 97 8, 95 9, 95 9 L 9 39 L 0 20 L 93 0 C 93 0, 94 0, 95 0 C 96 0, 97 0, 97 1 C 98 2, 99 3, 99 4 L 99 5"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 531,
    "y": 394,
    "width": 20,
    "height": 20,
    "fillColor": "#503119",
    "pathD": "M 20 12 C 20 15, 19 17, 17 19 C 16 19, 15 20, 14 20 L 10 20 C 7 19, 5 18, 3 16 C 1 14, 0 11, 0 9 L 0 8 C 0 5, 1 3, 3 2 C 5 1, 6 0, 8 0 C 11 0, 15 2, 17 5 C 19 7, 20 9, 20 11 L 20 12"
  },
  {
    "id": "sp-15",
    "x": 532,
    "y": 389,
    "width": 136,
    "height": 143,
    "fillColor": "#4a90d9",
    "pathD": "M 0 4 L 114 143 L 136 123 L 8 0 L 0 4"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 493,
    "y": 363,
    "width": 135,
    "height": 142,
    "fillColor": "#4a90d9",
    "pathD": "M 0 4 L 113 142 L 135 122 L 8 0 L 0 4"
  },
  {
    "id": "sp-17",
    "x": 588,
    "y": 264,
    "width": 36,
    "height": 48,
    "fillColor": "#ff4d38",
    "pathD": "M 0 48 L 4 26 L 36 0 L 32 30 L 0 48"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 602,
    "y": 254,
    "width": 10,
    "height": 30,
    "fillColor": "#ff4d38",
    "pathD": "M 4 0 L 7 1 L 3 29 L 0 30 L 4 0"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 630,
    "y": 291,
    "width": 31,
    "height": 31,
    "fillColor": "#ff4d38",
    "pathD": "M 1 11 L 0 25 L 26 31 L 31 0 L 1 11"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 648,
    "y": 277,
    "width": 10,
    "height": 33,
    "fillColor": "#ff4d38",
    "pathD": "M 5 1 L 0 33 L 2 33 L 7 0 L 7 0 L 5 1"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 536,
    "y": 395,
    "width": 42,
    "height": 56,
    "fillColor": "#3365cc",
    "pathD": "M 0 56 L 4 30 L 42 0 L 37 35 L 0 56"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 554,
    "y": 358,
    "width": 36,
    "height": 37,
    "fillColor": "#3365cc",
    "pathD": "M 1 13 L 0 30 L 30 37 L 36 0 L 1 13"
  },
  {
    "id": "sp-23",
    "x": 531,
    "y": 412,
    "width": 10,
    "height": 35,
    "fillColor": "#3365cc",
    "pathD": "M 5 0 L 8 1 L 3 34 L 0 35 L 5 0"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 551,
    "y": 355,
    "width": 10,
    "height": 38,
    "fillColor": "#3365cc",
    "pathD": "M 6 1 L 0 38 L 3 38 L 9 0 L 9 0 L 6 1"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 407,
    "y": 139,
    "width": 458,
    "height": 459
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 407,
    "y": 139,
    "width": 458,
    "height": 459,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 407,
    "y": 139,
    "width": 458,
    "height": 459,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 407,
    "y": 139,
    "width": 458,
    "height": 459,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 760,
    "y": 493,
    "width": 61,
    "height": 61,
    "fillColor": "#ff4d38",
    "pathD": "M 31 0 A 31 31 0 1 1 30 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 760,
    "y": 183,
    "width": 61,
    "height": 61,
    "fillColor": "#3365cc",
    "pathD": "M 31 0 A 31 31 0 1 1 30 0 Z"
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 450,
    "y": 493,
    "width": 61,
    "height": 61,
    "fillColor": "#ffb900",
    "pathD": "M 31 0 A 31 31 0 1 1 30 0 Z"
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 450,
    "y": 183,
    "width": 61,
    "height": 61,
    "fillColor": "#52c49c",
    "pathD": "M 31 0 A 31 31 0 1 1 30 0 Z"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 1,
    "x": 907,
    "y": 187,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 1,
    "x": 901,
    "y": 222,
    "width": 294,
    "height": 61,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 3,
    "x": 907,
    "y": 437,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#ff4d38",
    "textSize": 16
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 3,
    "x": 901,
    "y": 472,
    "width": 294,
    "height": 61,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 0,
    "x": 253,
    "y": 187,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#52c49c",
    "textSize": 16
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 0,
    "x": 76,
    "y": 222,
    "width": 294,
    "height": 61,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 2,
    "x": 253,
    "y": 437,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#ffb900",
    "textSize": 16
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 2,
    "x": 76,
    "y": 472,
    "width": 294,
    "height": 61,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 464,
    "y": 509,
    "width": 33,
    "height": 28,
    "fillColor": "#ffffff",
    "pathD": "M 3 19 C 3 19, 3 19, 3 19 C 3 20, 3 20, 3 20 C 2 20, 2 20, 2 19 C 2 19, 2 19, 3 19 Z M 30 19 C 29 19, 28 19, 27 19 C 26 20, 25 20, 23 21 C 23 21, 23 21, 23 22 C 23 22, 23 22, 23 22 C 26 22, 28 21, 29 20 C 29 20, 29 20, 29 20 C 30 20, 30 19, 30 19 C 30 19, 30 19, 30 19 Z M 5 18 L 5 26 C 7 26, 21 30, 31 22 C 31 22, 32 21, 32 21 C 32 21, 32 21, 32 20 C 32 20, 31 21, 30 21 C 28 22, 25 23, 22 24 C 21 24, 20 24, 18 24 C 17 24, 15 24, 14 24 C 13 24, 13 23, 13 23 C 13 23, 14 23, 14 23 C 18 23, 20 23, 21 23 L 21 23 C 21 23, 21 23, 21 23 C 22 22, 22 22, 22 22 C 22 21, 22 21, 22 20 C 22 20, 21 20, 21 20 C 16 20, 15 20, 14 19 C 13 18, 12 18, 5 18 Z M 1 18 L 1 26 L 4 26 L 4 18 L 1 18 Z M 1 17 L 5 17 C 12 17, 14 17, 15 18 C 16 19, 16 19, 21 19 C 21 19, 22 19, 23 20 C 23 20, 23 20, 23 20 C 24 20, 26 19, 27 19 C 29 18, 30 17, 30 18 C 31 18, 31 19, 31 19 C 31 19, 31 19, 31 19 C 32 19, 32 19, 32 20 C 33 20, 33 21, 33 21 C 33 22, 32 23, 32 23 C 26 27, 20 28, 15 28 C 10 28, 5 27, 5 27 L 1 27 C 0 27, 0 26, 0 26 L 0 17 C 0 17, 0 17, 1 17 Z M 29 15 C 29 15, 29 16, 29 16 C 29 16, 29 16, 28 17 C 28 17, 28 17, 28 17 C 28 17, 28 17, 28 17 C 27 17, 27 16, 28 16 C 28 16, 28 16, 28 15 C 28 15, 29 15, 29 15 Z M 10 14 C 11 14, 11 14, 11 14 C 11 14, 11 14, 11 15 C 12 15, 11 15, 11 15 C 11 15, 11 16, 11 16 C 11 16, 11 15, 11 15 C 10 15, 10 15, 10 14 C 10 14, 10 14, 10 14 Z M 23 12 C 23 12, 22 12, 22 12 C 22 13, 22 14, 22 14 C 23 15, 23 15, 24 14 C 25 14, 25 13, 24 12 C 24 12, 23 12, 23 12 Z M 30 12 C 30 12, 30 12, 30 13 C 30 13, 30 13, 30 14 C 30 14, 30 14, 30 14 C 30 14, 30 14, 30 14 C 29 14, 29 13, 29 13 C 29 13, 29 13, 29 12 C 30 12, 30 12, 30 12 Z M 23 11 C 24 11, 24 11, 25 12 C 26 13, 26 14, 25 15 C 24 15, 24 16, 23 16 C 22 16, 22 15, 21 15 C 20 14, 20 13, 21 12 C 22 11, 22 11, 23 11 Z M 10 10 C 10 10, 10 10, 10 11 L 10 11 C 10 11, 10 11, 10 12 C 11 12, 10 12, 10 12 C 10 12, 10 12, 10 12 C 10 12, 10 12, 9 12 C 9 11, 9 11, 9 11 C 9 10, 10 10, 10 10 Z M 30 9 C 30 9, 30 9, 31 9 C 31 9, 31 10, 31 10 C 31 10, 30 10, 30 10 C 30 10, 30 10, 30 10 C 30 10, 30 10, 30 10 C 30 10, 30 9, 30 9 C 29 9, 30 9, 30 9 Z M 10 7 C 11 7, 11 7, 11 7 C 11 8, 11 8, 11 8 C 10 9, 10 9, 10 9 C 10 9, 10 9, 10 9 C 10 9, 10 8, 10 8 C 10 8, 10 7, 10 7 C 10 7, 10 7, 10 7 Z M 17 6 C 17 6, 16 6, 16 6 C 15 7, 15 8, 16 8 C 16 9, 17 9, 18 8 C 18 8, 18 7, 18 6 C 18 6, 17 6, 17 6 Z M 29 5 C 29 5, 29 5, 29 6 C 30 6, 30 6, 30 7 C 30 7, 30 7, 30 7 C 30 7, 29 7, 29 7 C 29 7, 29 7, 29 7 C 29 7, 29 6, 29 6 C 28 6, 29 5, 29 5 Z M 25 5 C 25 5, 25 5, 25 5 C 26 5, 26 6, 25 6 L 15 16 C 15 16, 15 16, 15 16 C 15 16, 15 16, 15 16 C 14 15, 14 15, 15 15 L 25 5 Z M 17 5 C 18 5, 18 5, 19 6 C 20 6, 20 8, 19 9 C 18 9, 18 9, 17 9 C 16 9, 16 9, 15 9 C 14 8, 14 6, 15 6 C 16 5, 16 5, 17 5 Z M 12 4 C 13 4, 13 4, 12 5 C 12 5, 12 5, 12 5 C 12 5, 12 5, 11 5 C 11 5, 11 5, 11 5 C 11 5, 11 5, 11 5 C 11 4, 11 4, 12 4 C 12 4, 12 4, 12 4 Z M 27 3 C 27 3, 28 3, 28 3 C 28 4, 28 4, 28 4 C 28 4, 28 4, 28 4 C 27 4, 27 4, 27 4 C 27 4, 27 4, 26 3 C 26 3, 26 3, 26 3 C 27 3, 27 3, 27 3 Z M 14 1 C 15 1, 15 1, 15 2 C 15 2, 15 2, 15 2 C 15 3, 14 3, 14 3 C 14 3, 14 3, 14 3 C 14 3, 14 3, 13 3 C 13 3, 13 2, 14 2 C 14 2, 14 2, 14 1 Z M 24 1 C 24 1, 25 1, 25 1 C 25 1, 25 1, 25 2 C 25 2, 25 2, 25 2 C 25 2, 25 2, 25 2 C 24 2, 24 2, 24 2 C 23 1, 23 1, 23 1 C 24 1, 24 1, 24 1 Z M 18 0 C 18 0, 18 0, 18 0 C 18 1, 18 1, 18 1 C 18 1, 17 1, 17 1 C 17 1, 17 1, 17 1 C 17 1, 16 1, 16 1 C 16 1, 16 0, 17 0 C 17 0, 17 0, 18 0 Z M 20 0 C 21 0, 21 0, 21 0 C 22 0, 22 0, 22 1 C 22 1, 22 1, 21 1 C 21 1, 21 1, 21 1 C 21 1, 21 1, 20 1 C 20 1, 20 1, 20 0 C 20 0, 20 0, 20 0 Z"
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 465,
    "y": 197,
    "width": 32,
    "height": 33,
    "fillColor": "#ffffff",
    "pathD": "M 23 13 L 16 16 L 16 20 L 22 17 C 22 17, 22 17, 22 18 C 22 18, 22 18, 22 18 L 16 21 L 16 32 L 23 29 L 23 13 Z M 9 13 L 9 29 L 15 32 L 15 21 L 10 18 C 10 18, 10 18, 10 18 C 10 17, 10 17, 10 17 L 15 20 L 15 16 L 9 13 Z M 31 10 L 24 13 L 24 28 L 31 25 L 31 14 L 26 17 C 26 17, 26 17, 26 17 C 25 17, 25 17, 25 16 C 25 16, 25 16, 25 16 L 31 13 L 31 10 Z M 1 10 L 1 13 L 7 16 C 7 16, 7 16, 7 16 C 7 17, 7 17, 6 17 C 6 17, 6 17, 6 17 L 1 14 L 1 25 L 8 28 L 8 13 L 1 10 Z M 7 6 C 8 5, 8 6, 8 6 C 8 6, 8 6, 8 7 L 2 9 L 9 12 L 11 11 C 12 11, 12 11, 12 11 C 12 11, 12 12, 12 12 L 10 13 L 16 15 L 22 13 L 21 12 C 20 12, 20 11, 20 11 C 21 11, 21 11, 21 11 L 24 12 L 30 9 L 27 8 C 27 8, 27 7, 27 7 C 27 7, 28 7, 28 7 L 32 9 C 32 9, 32 9, 32 9 L 32 9 C 32 9, 32 9, 32 9 L 32 9 C 32 9, 32 9, 32 9 C 32 9, 32 9, 32 9 C 32 9, 32 9, 32 9 C 32 9, 32 9, 32 9 L 32 14 L 32 26 C 32 26, 32 26, 32 26 L 16 33 C 16 33, 16 33, 16 33 C 16 33, 16 33, 16 33 C 16 33, 16 33, 16 33 C 16 33, 16 33, 16 33 L 8 30 L 0 26 C 0 26, 0 26, 0 26 L 0 14 L 0 9 L 0 9 C 0 9, 0 9, 0 9 C 0 9, 0 9, 0 9 C 0 9, 0 9, 0 9 C 0 9, 0 9, 0 9 C 0 9, 0 9, 0 9 C 0 9, 0 9, 0 9 C 0 9, 0 9, 0 9 C 0 9, 0 9, 0 9 L 0 9 L 7 6 Z M 13 3 C 11 3, 10 5, 10 6 C 10 8, 11 9, 13 9 L 16 9 L 16 6 C 16 5, 15 3, 13 3 Z M 21 1 C 19 1, 17 3, 17 5 L 17 6 C 17 6, 17 6, 17 6 L 17 9 L 21 9 C 23 9, 25 7, 25 5 C 25 3, 23 1, 21 1 Z M 21 0 C 24 0, 26 2, 26 5 C 26 8, 24 10, 21 10 L 17 10 C 17 11, 18 12, 19 13 C 19 13, 19 13, 19 13 C 19 13, 19 13, 19 13 C 19 13, 19 13, 19 13 C 18 13, 17 12, 16 12 C 16 12, 15 13, 14 13 C 14 13, 14 13, 14 13 C 14 13, 14 13, 14 13 C 14 13, 14 13, 14 13 C 15 12, 16 11, 16 10 L 13 10 C 11 10, 9 9, 9 6 C 9 4, 11 2, 13 2 C 14 2, 15 3, 16 4 C 17 2, 19 0, 21 0 Z"
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 775,
    "y": 199,
    "width": 33,
    "height": 30,
    "fillColor": "#ffffff",
    "pathD": "M 20 21 L 17 17 L 28 11 L 32 16 L 20 21 Z M 28 24 L 17 29 L 17 18 L 20 22 C 20 22, 20 23, 20 23 C 20 23, 20 23, 20 23 L 28 19 L 28 24 Z M 16 16 L 10 13 L 7 11 L 6 11 L 12 8 L 12 10 L 11 10 L 12 13 L 13 10 L 12 10 L 12 8 L 16 6 L 16 14 C 16 14, 16 14, 16 14 C 17 14, 17 14, 17 14 L 17 6 L 19 7 L 19 9 L 19 9 L 20 11 L 21 9 L 20 9 L 20 8 L 27 11 L 27 11 L 16 16 Z M 16 29 L 5 24 L 5 19 L 12 23 C 13 23, 13 23, 13 23 C 13 23, 13 22, 13 22 L 16 18 L 16 29 Z M 1 16 L 4 11 L 14 16 L 16 17 L 13 21 L 1 16 Z M 33 16 L 29 11 C 29 11, 29 11, 29 11 C 29 10, 29 10, 29 10 C 29 10, 29 10, 29 10 C 29 10, 29 10, 29 10 C 29 10, 29 10, 29 10 C 29 10, 29 10, 29 10 L 20 7 L 20 1 C 20 0, 20 0, 20 0 C 20 0, 19 0, 19 1 L 19 6 L 17 5 C 17 5, 17 5, 16 5 C 16 5, 16 5, 16 5 L 12 7 L 12 2 C 12 2, 12 2, 12 2 C 12 2, 12 2, 12 2 L 12 7 L 4 10 L 4 10 C 4 10, 4 10, 4 10 C 4 10, 4 10, 4 10 L 4 10 C 4 10, 4 10, 4 11 C 4 11, 4 11, 4 11 L 0 16 C 0 16, 0 17, 0 17 C 0 17, 0 17, 0 17 L 4 19 L 4 24 C 4 24, 4 24, 4 24 L 16 30 C 16 30, 16 30, 16 30 C 17 30, 17 30, 17 30 L 29 24 C 29 24, 29 24, 29 24 L 29 19 L 33 17 C 33 17, 33 17, 33 17 C 33 17, 33 16, 33 16 Z"
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 777,
    "y": 507,
    "width": 28,
    "height": 33,
    "fillColor": "#ffffff",
    "pathD": "M 17 30 C 17 30, 18 31, 18 31 L 18 32 C 18 32, 18 32, 18 32 L 27 32 C 27 32, 27 32, 27 32 L 27 31 C 27 31, 27 30, 27 30 C 28 30, 28 31, 28 31 L 28 32 C 28 32, 27 33, 27 33 L 18 33 C 17 33, 17 32, 17 32 L 17 31 C 17 31, 17 30, 17 30 Z M 16 6 C 16 6, 15 7, 15 7 L 15 21 C 15 22, 15 22, 15 22 C 15 22, 15 22, 14 22 C 14 22, 13 21, 11 22 C 9 22, 8 23, 8 24 C 8 24, 8 24, 8 25 C 8 25, 10 24, 10 24 C 11 24, 11 24, 11 24 C 13 25, 14 26, 16 27 C 17 28, 17 29, 18 29 L 27 29 C 27 29, 27 28, 27 28 L 27 17 C 27 17, 27 17, 27 17 C 27 16, 26 16, 25 16 C 25 16, 25 16, 25 16 C 25 16, 24 16, 24 16 C 24 16, 24 16, 24 16 C 24 15, 23 15, 23 15 C 22 15, 22 15, 22 15 C 21 15, 21 15, 21 15 C 21 15, 21 15, 21 15 C 21 14, 20 14, 20 14 C 19 14, 19 14, 19 15 C 18 15, 18 15, 18 15 C 18 15, 18 15, 18 15 L 18 7 C 18 7, 17 6, 16 6 Z M 16 5 C 18 5, 19 6, 19 7 L 19 14 C 19 13, 21 13, 21 14 C 22 14, 22 14, 23 14 C 24 14, 24 14, 25 15 C 25 15, 25 15, 25 15 C 27 15, 28 16, 28 17 C 28 17, 28 17, 28 17 L 28 28 C 28 29, 27 30, 27 30 L 18 30 C 17 30, 16 29, 15 28 C 14 27, 13 26, 11 25 C 11 25, 9 26, 8 26 C 7 26, 7 26, 7 25 C 7 25, 7 25, 7 24 C 7 22, 8 21, 11 21 C 12 20, 13 21, 14 21 L 14 7 C 14 6, 15 5, 16 5 Z M 9 3 C 10 3, 10 4, 10 4 L 10 5 C 11 5, 12 5, 12 6 C 12 6, 12 7, 12 7 C 12 7, 11 7, 11 7 C 11 6, 10 6, 9 6 C 8 6, 8 6, 8 7 C 8 8, 8 9, 9 9 C 12 9, 12 10, 12 11 C 12 13, 11 14, 10 14 L 10 15 C 10 15, 10 15, 9 15 C 9 15, 9 15, 9 15 L 9 14 C 8 14, 7 13, 7 12 C 7 12, 7 12, 7 12 C 7 12, 8 12, 8 12 C 8 13, 9 13, 9 13 C 10 13, 11 12, 11 11 C 11 11, 11 10, 9 10 C 7 10, 7 8, 7 7 C 7 6, 8 5, 9 5 L 9 4 C 9 4, 9 3, 9 3 Z M 4 0 L 15 0 C 17 0, 19 2, 19 4 C 19 4, 18 4, 18 4 C 18 4, 18 4, 18 4 C 18 2, 16 1, 15 1 L 4 1 C 2 1, 1 2, 1 4 L 1 15 C 1 16, 2 18, 4 18 L 12 18 C 13 18, 13 18, 13 18 C 13 18, 13 19, 12 19 L 4 19 C 2 19, 0 17, 0 15 L 0 4 C 0 2, 2 0, 4 0 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates122Template({ data }: { data: BrainData }): ReactElement {
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
