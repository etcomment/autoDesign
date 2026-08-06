import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-31",
    "x": 696,
    "y": 372,
    "width": 295,
    "height": 87,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-32",
    "x": 374,
    "y": 435,
    "width": 324,
    "height": 112,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-33",
    "x": 150,
    "y": 528,
    "width": 226,
    "height": 56,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-34",
    "x": 149,
    "y": 434,
    "width": 225,
    "height": 86,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-35",
    "x": 291,
    "y": 396,
    "width": 83,
    "height": 128,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-36",
    "x": 368,
    "y": 301,
    "width": 71,
    "height": 227,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-37",
    "x": 975,
    "y": 374,
    "width": 10,
    "height": 235,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 988,
    "y": 375,
    "width": 139,
    "height": 93,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 1,
    "x": 987,
    "y": 355,
    "width": 169,
    "height": 23,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-40",
    "x": 893,
    "y": 166,
    "width": 95,
    "height": 207,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-41",
    "x": 991,
    "y": 197,
    "width": 101,
    "height": 176,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 852,
    "y": 284,
    "width": 136,
    "height": 89,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-0",
    "x": 533,
    "y": 294,
    "width": 325,
    "height": 325,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 163 0 A 163 163 0 1 1 162 0 Z"
  },
  {
    "id": "sp-1",
    "x": 901,
    "y": 286,
    "width": 174,
    "height": 174,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 87 0 A 87 87 0 1 1 87 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 825,
    "y": 257,
    "width": 54,
    "height": 54,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 27 0 A 27 27 0 1 1 27 0 Z"
  },
  {
    "id": "sp-3",
    "x": 825,
    "y": 100,
    "width": 135,
    "height": 135,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 68 0 A 68 68 0 1 1 67 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1129,
    "y": 328,
    "width": 54,
    "height": 54,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 27 0 A 27 27 0 1 1 27 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 1012,
    "y": 119,
    "width": 157,
    "height": 157,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 79 0 A 79 79 0 1 1 78 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1094,
    "y": 435,
    "width": 65,
    "height": 65,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 33 0 A 33 33 0 1 1 32 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 897,
    "y": 499,
    "width": 156,
    "height": 156,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 78 0 A 78 78 0 1 1 78 0 Z"
  },
  {
    "id": "sp-8",
    "x": 263,
    "y": 422,
    "width": 212,
    "height": 212,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 106 0 A 106 106 0 1 1 106 0 Z"
  },
  {
    "id": "sp-9",
    "x": 380,
    "y": 245,
    "width": 118,
    "height": 118,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 59 0 A 59 59 0 1 1 59 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 272,
    "y": 363,
    "width": 54,
    "height": 54,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 27 0 A 27 27 0 1 1 27 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 62,
    "y": 327,
    "width": 145,
    "height": 145,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 73 0 A 73 73 0 1 1 72 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 77,
    "y": 512,
    "width": 144,
    "height": 144,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 72 0 A 72 72 0 1 1 72 0 Z"
  },
  {
    "id": "sp-13",
    "x": 63,
    "y": 136,
    "width": 488,
    "height": 41,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 285,
    "y": 378,
    "width": 28,
    "height": 25,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 4 23 L 2 24 L 5 24 L 4 23 Z M 14 4 C 14 4, 13 4, 13 5 C 13 5, 14 5, 14 5 L 20 5 C 20 5, 21 5, 21 5 C 21 4, 20 4, 20 4 L 14 4 Z M 14 3 L 20 3 C 21 3, 22 4, 22 5 C 22 6, 21 6, 20 6 L 14 6 C 13 6, 12 6, 12 5 C 12 4, 13 3, 14 3 Z M 3 1 L 1 24 L 3 22 L 5 2 L 3 1 Z M 8 1 L 6 2 L 4 22 L 6 24 L 8 1 Z M 9 1 L 7 24 L 27 24 L 25 1 L 9 1 Z M 9 0 C 9 0, 9 0, 9 0 L 26 0 C 26 0, 26 0, 26 0 L 28 25 C 28 25, 28 25, 28 25 C 28 25, 28 25, 28 25 L 7 25 L 0 25 L 0 25 C 0 25, 0 25, 0 25 C 0 25, 0 25, 0 25 L 0 25 C 0 25, 0 25, 0 25 C 0 25, 0 25, 0 25 L 0 25 C 0 25, 0 25, 0 25 C 0 25, 0 25, 0 25 L 2 0 C 2 0, 2 0, 2 0 C 2 0, 3 0, 3 0 L 5 2 L 8 0 C 8 0, 8 0, 9 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 838,
    "y": 272,
    "width": 28,
    "height": 23,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 20 L 10 22 L 17 22 L 17 20 L 10 20 Z M 21 20 L 21 22 L 27 22 L 27 20 L 26 20 L 21 20 Z M 10 18 L 10 20 L 17 20 L 17 18 L 17 18 L 10 18 Z M 20 18 L 20 19 L 21 19 L 26 19 L 26 18 L 20 18 L 20 18 Z M 10 15 L 10 17 L 16 17 L 16 15 L 10 15 Z M 21 15 L 21 17 L 26 17 L 27 17 L 27 15 L 26 15 L 21 15 Z M 10 12 L 10 14 L 16 14 L 16 12 L 10 12 Z M 19 12 L 19 14 L 20 14 L 25 14 L 25 12 L 21 12 L 19 12 Z M 10 12 L 17 12 C 17 12, 17 12, 17 12 L 17 15 L 17 17 L 17 17 C 17 17, 17 17, 17 17 L 17 20 L 17 23 C 17 23, 17 23, 17 23 L 10 23 C 10 23, 10 23, 10 23 L 10 20 L 10 18 L 10 18 C 9 18, 9 18, 9 17 L 9 15 L 9 12 C 9 12, 9 12, 10 12 Z M 3 12 L 8 12 C 8 12, 8 12, 8 12 C 8 12, 8 12, 8 12 L 3 12 C 3 12, 3 12, 3 12 C 3 12, 3 12, 3 12 Z M 21 10 L 21 12 L 26 12 L 27 12 L 27 10 L 27 10 L 21 10 Z M 14 9 L 17 9 C 17 9, 18 9, 18 9 C 18 10, 17 10, 17 10 L 14 10 C 14 10, 14 10, 14 9 C 14 9, 14 9, 14 9 Z M 9 9 L 12 9 C 12 9, 12 9, 12 9 C 12 10, 12 10, 12 10 L 9 10 C 8 10, 8 10, 8 9 C 8 9, 8 9, 9 9 Z M 3 9 L 6 9 C 6 9, 7 9, 7 9 C 7 10, 6 10, 6 10 L 3 10 C 3 10, 3 10, 3 9 C 3 9, 3 9, 3 9 Z M 20 7 L 20 9 L 21 9 L 26 9 L 26 7 L 26 7 L 20 7 Z M 20 5 L 20 6 L 20 6 L 26 6 L 26 5 L 20 5 Z M 4 4 C 4 4, 4 4, 4 4 L 4 6 C 4 6, 4 6, 4 6 L 6 6 C 6 6, 7 6, 7 6 L 7 4 C 7 4, 6 4, 6 4 L 4 4 Z M 19 4 L 26 4 C 26 4, 27 4, 27 4 L 27 6 L 27 6 C 27 6, 27 6, 27 7 L 27 9 L 28 9 C 28 9, 28 9, 28 9 L 28 12 C 28 12, 28 12, 28 12 L 26 12 L 26 14 L 27 14 C 27 14, 28 14, 28 15 L 28 17 C 28 17, 27 18, 27 18 L 27 18 L 27 19 L 28 19 C 28 19, 28 20, 28 20 L 28 22 C 28 23, 28 23, 28 23 L 21 23 C 20 23, 20 23, 20 22 L 20 20 L 19 20 C 19 20, 19 20, 19 20 L 19 17 C 19 17, 19 17, 19 17 L 20 17 L 20 15 L 19 15 C 19 15, 18 15, 18 15 L 18 12 C 18 12, 19 12, 19 12 L 20 12 L 20 10 L 20 10 C 20 10, 19 10, 19 9 L 19 7 L 19 7 C 19 7, 19 7, 19 7 L 19 4 C 19 4, 19 4, 19 4 Z M 4 3 L 6 3 C 7 3, 7 4, 7 4 L 7 6 C 7 6, 7 7, 6 7 L 4 7 C 3 7, 3 6, 3 6 L 3 4 C 3 4, 3 3, 4 3 Z M 2 0 L 23 0 C 24 0, 25 1, 25 2 C 25 2, 24 2, 24 2 C 24 2, 24 2, 24 2 C 24 1, 23 1, 23 1 L 2 1 C 1 1, 1 1, 1 2 L 1 14 C 1 14, 1 15, 2 15 L 7 15 C 7 15, 7 15, 7 15 C 7 16, 7 16, 7 16 L 2 16 C 1 16, 0 15, 0 14 L 0 2 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1142,
    "y": 344,
    "width": 28,
    "height": 24,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 1 21 L 1 22 C 1 23, 1 23, 2 23 L 26 23 C 27 23, 27 23, 27 22 L 27 21 L 1 21 Z M 3 18 L 1 21 L 27 21 L 25 18 L 3 18 Z M 16 13 C 16 13, 16 13, 16 13 C 16 14, 16 14, 16 14 C 17 14, 17 14, 17 13 C 17 13, 17 13, 16 13 Z M 10 13 C 10 13, 9 13, 9 13 C 9 14, 10 14, 10 14 C 11 14, 11 14, 11 13 C 11 13, 11 13, 10 13 Z M 9 8 L 10 10 L 17 10 L 18 9 L 18 8 L 9 8 Z M 21 7 L 25 7 C 26 7, 26 8, 26 8 C 26 8, 26 8, 25 8 L 21 8 C 21 8, 21 8, 21 8 C 21 8, 21 7, 21 7 Z M 9 6 L 9 7 L 18 7 L 18 6 L 9 6 Z M 21 3 C 21 3, 21 3, 21 4 C 21 4, 21 4, 21 4 C 20 4, 19 5, 19 5 L 19 6 L 18 10 L 18 12 C 18 13, 18 13, 18 13 C 18 14, 17 15, 16 15 C 16 15, 15 15, 15 14 L 12 14 C 12 15, 11 15, 10 15 C 9 15, 9 14, 9 13 C 9 13, 9 12, 10 12 C 11 12, 12 12, 12 13 L 15 13 C 15 12, 16 12, 16 12 C 17 12, 17 12, 17 12 L 17 11 L 9 11 C 9 11, 9 11, 9 10 L 8 6 C 8 5, 8 5, 8 5 C 8 5, 8 5, 8 5 L 18 5 C 19 4, 20 3, 21 3 Z M 4 0 L 24 0 C 25 0, 26 1, 26 2 L 26 5 C 26 6, 26 6, 25 6 L 22 6 C 22 6, 22 6, 22 5 C 22 5, 22 5, 22 5 L 25 5 L 25 2 C 25 1, 25 1, 24 1 L 4 1 C 3 1, 3 1, 3 2 L 3 17 L 25 17 L 25 11 L 21 11 C 21 11, 21 10, 21 10 C 21 10, 21 10, 21 10 L 25 10 C 26 10, 26 10, 26 10 L 26 17 L 28 21 C 28 21, 28 21, 28 21 L 28 21 C 28 21, 28 21, 28 21 L 28 22 C 28 23, 27 24, 26 24 L 2 24 C 1 24, 0 23, 0 22 L 0 21 C 0 21, 0 21, 0 21 L 0 21 C 0 21, 0 21, 0 21 L 2 17 L 2 2 C 2 1, 3 0, 4 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1113,
    "y": 454,
    "width": 27,
    "height": 28,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 20 11 L 14 14 L 14 17 L 18 15 C 18 15, 19 15, 19 15 C 19 15, 19 15, 18 16 L 14 18 L 14 27 L 20 24 L 20 11 Z M 7 11 L 7 24 L 13 27 L 13 18 L 9 16 C 8 15, 8 15, 8 15 C 8 15, 9 15, 9 15 L 13 17 L 13 14 L 7 11 Z M 26 8 L 20 11 L 20 24 L 26 21 L 26 12 L 22 14 C 22 14, 22 14, 22 14 C 21 14, 21 14, 21 14 C 21 14, 21 13, 21 13 L 26 11 L 26 8 Z M 1 8 L 1 11 L 6 13 C 6 13, 6 14, 6 14 C 6 14, 6 14, 5 14 C 5 14, 5 14, 5 14 L 1 12 L 1 21 L 7 24 L 7 11 L 1 8 Z M 6 5 C 6 5, 7 5, 7 5 C 7 5, 7 5, 6 6 L 1 8 L 7 10 L 10 9 C 10 9, 10 9, 10 9 C 10 10, 10 10, 10 10 L 8 11 L 13 13 L 19 11 L 17 10 C 17 10, 17 10, 17 9 C 17 9, 18 9, 18 9 L 20 10 L 26 8 L 23 7 C 23 7, 23 6, 23 6 C 23 6, 23 6, 23 6 L 27 7 C 27 7, 27 7, 27 7 L 27 7 C 27 7, 27 7, 27 7 L 27 7 C 27 7, 27 8, 27 8 C 27 8, 27 8, 27 8 C 27 8, 27 8, 27 8 C 27 8, 27 8, 27 8 L 27 11 L 27 22 C 27 22, 27 22, 27 22 L 14 28 C 14 28, 14 28, 14 28 C 14 28, 14 28, 13 28 C 13 28, 13 28, 13 28 C 13 28, 13 28, 13 28 L 7 25 L 0 22 C 0 22, 0 22, 0 22 L 0 11 L 0 8 L 0 8 C 0 8, 0 8, 0 8 C 0 8, 0 8, 0 8 C 0 8, 0 8, 0 8 C 0 8, 0 8, 0 8 C 0 8, 0 7, 0 7 C 0 7, 0 7, 0 7 C 0 7, 0 7, 0 7 C 0 7, 0 7, 0 7 L 0 7 L 6 5 Z M 11 3 C 10 3, 9 4, 9 5 C 9 7, 10 8, 11 8 L 13 8 L 13 5 C 13 4, 12 3, 11 3 Z M 18 1 C 16 1, 14 2, 14 4 L 14 5 C 14 5, 14 5, 14 5 L 14 8 L 18 8 C 20 8, 21 6, 21 4 C 21 2, 20 1, 18 1 Z M 18 0 C 20 0, 22 2, 22 4 C 22 7, 20 9, 18 9 L 14 9 C 15 10, 15 10, 16 11 C 16 11, 16 11, 16 11 C 16 11, 16 11, 16 11 C 16 11, 16 11, 16 11 C 15 11, 14 11, 14 10 C 14 11, 13 11, 12 11 C 12 11, 12 11, 12 11 C 12 11, 12 11, 12 11 C 11 11, 12 11, 12 11 C 13 10, 13 10, 13 9 L 11 9 C 9 9, 8 7, 8 5 C 8 4, 9 2, 11 2 C 12 2, 13 3, 14 3 C 14 1, 16 0, 18 0 Z"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 0,
    "x": 64,
    "y": 138,
    "width": 163,
    "height": 36,
    "text": "Your title here"
  },
  {
    "id": "sp-19",
    "x": 63,
    "y": 182,
    "width": 488,
    "height": 27,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-20",
    "x": 560,
    "y": 403,
    "width": 272,
    "height": 107,
    "text": "Decision tree diagram"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 294,
    "y": 491,
    "width": 150,
    "height": 74,
    "text": "Your title here"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 0,
    "x": 913,
    "y": 334,
    "width": 150,
    "height": 74,
    "text": "Your title here"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 84,
    "y": 536,
    "width": 129,
    "height": 99,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 2,
    "x": 70,
    "y": 352,
    "width": 129,
    "height": 99,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-25",
    "x": 380,
    "y": 262,
    "width": 118,
    "height": 84,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 4,
    "x": 910,
    "y": 527,
    "width": 129,
    "height": 99,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 1,
    "x": 1025,
    "y": 148,
    "width": 129,
    "height": 99,
    "text": "MIGSO-PCUBED content and words"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 0,
    "x": 828,
    "y": 118,
    "width": 129,
    "height": 99,
    "text": "MIGSO-PCUBED content and words"
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

export function Migso92Template({ data }: { data: BrainData }): ReactElement {
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
