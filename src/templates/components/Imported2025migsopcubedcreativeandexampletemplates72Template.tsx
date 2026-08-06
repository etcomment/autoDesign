import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 654,
    "y": 313,
    "width": 178,
    "height": 162,
    "strokeColor": "#52c49c",
    "pathD": "M 45 0 L 134 0 L 178 81 L 134 162 L 45 162 L 0 81 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 449,
    "y": 313,
    "width": 178,
    "height": 162,
    "strokeColor": "#3365cc",
    "pathD": "M 45 0 L 134 0 L 178 81 L 134 162 L 45 162 L 0 81 Z"
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 0,
    "x": 473,
    "y": 364,
    "width": 134,
    "height": 58,
    "text": "PROS",
    "textColor": "#3365cc",
    "textSize": 30
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 675,
    "y": 364,
    "width": 136,
    "height": 58,
    "text": "CONS",
    "textColor": "#52c49c",
    "textSize": 30
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 908,
    "y": 166,
    "width": 63,
    "height": 63,
    "fillColor": "#52c49c",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 908,
    "y": 264,
    "width": 63,
    "height": 63,
    "fillColor": "#52c49c",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 908,
    "y": 363,
    "width": 63,
    "height": 63,
    "fillColor": "#52c49c",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 908,
    "y": 461,
    "width": 63,
    "height": 63,
    "fillColor": "#52c49c",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 908,
    "y": 559,
    "width": 63,
    "height": 63,
    "fillColor": "#52c49c",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 311,
    "y": 166,
    "width": 63,
    "height": 63,
    "fillColor": "#3365cc",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 311,
    "y": 264,
    "width": 63,
    "height": 63,
    "fillColor": "#3365cc",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 311,
    "y": 363,
    "width": 63,
    "height": 63,
    "fillColor": "#3365cc",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 311,
    "y": 461,
    "width": 63,
    "height": 63,
    "fillColor": "#3365cc",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 311,
    "y": 559,
    "width": 63,
    "height": 63,
    "fillColor": "#3365cc",
    "pathD": "M 32 0 A 32 32 0 1 1 31 0 Z"
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 374,
    "y": 197,
    "width": 75,
    "height": 196,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 374,
    "y": 394,
    "width": 75,
    "height": 98,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 374,
    "y": 394,
    "width": 75,
    "height": 196,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-39",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 374,
    "y": 296,
    "width": 75,
    "height": 98,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 374,
    "y": 394,
    "width": 75,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 831,
    "y": 197,
    "width": 76,
    "height": 196,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 831,
    "y": 394,
    "width": 76,
    "height": 98,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 831,
    "y": 394,
    "width": 76,
    "height": 196,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 831,
    "y": 296,
    "width": 76,
    "height": 98,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-45",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 831,
    "y": 394,
    "width": 76,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 327,
    "y": 183,
    "width": 30,
    "height": 29,
    "fillColor": "#ffffff",
    "pathD": "M 15 21 L 15 25 C 15 26, 16 26, 16 26 C 17 26, 17 26, 17 25 L 17 21 L 15 21 Z M 12 21 L 12 25 C 12 26, 13 26, 14 26 C 14 26, 15 26, 15 25 L 15 21 L 12 21 Z M 2 17 L 2 20 C 2 20, 2 20, 3 20 L 27 20 C 28 20, 28 20, 28 20 L 28 17 L 18 17 L 12 17 L 2 17 Z M 1 15 L 6 15 C 6 15, 7 15, 7 15 C 7 15, 6 15, 6 15 L 1 15 C 1 15, 1 15, 1 15 C 1 15, 1 15, 1 15 Z M 0 13 L 5 13 C 5 13, 5 13, 5 13 C 5 13, 5 14, 5 14 L 0 14 C 0 14, 0 13, 0 13 C 0 13, 0 13, 0 13 Z M 2 11 L 5 11 C 6 11, 6 11, 6 11 C 6 12, 6 12, 5 12 L 2 12 C 2 12, 1 12, 1 11 C 1 11, 2 11, 2 11 Z M 12 10 C 10 10, 9 11, 9 12 L 9 16 L 11 16 L 11 13 C 11 13, 11 12, 12 12 C 12 12, 12 13, 12 13 L 12 16 L 18 16 L 18 13 C 18 13, 18 12, 18 12 C 19 12, 19 13, 19 13 L 19 16 L 21 16 L 21 12 C 21 11, 20 10, 18 10 L 12 10 Z M 15 4 C 14 4, 13 5, 13 6 C 13 7, 14 8, 15 8 C 16 8, 17 7, 17 6 C 17 5, 16 4, 15 4 Z M 15 3 C 17 3, 18 4, 18 6 C 18 8, 17 9, 15 9 C 14 9, 12 8, 12 6 C 12 4, 14 3, 15 3 Z M 22 1 C 22 1, 21 1, 21 1 L 23 4 C 24 3, 24 2, 23 2 C 23 1, 23 1, 22 1 Z M 25 0 C 27 0, 29 1, 29 3 L 29 14 L 29 16 L 30 16 C 30 16, 30 17, 30 17 C 30 17, 30 17, 30 17 L 29 17 L 29 20 C 29 21, 28 21, 28 21 L 28 29 C 28 29, 28 29, 27 29 C 27 29, 27 29, 27 29 L 27 21 L 21 21 L 21 26 C 21 26, 20 26, 20 26 C 20 26, 20 26, 20 26 L 20 21 L 18 21 L 18 25 C 18 26, 18 27, 16 27 C 16 27, 15 27, 15 26 C 15 27, 14 27, 14 27 C 12 27, 12 26, 12 25 L 12 21 L 10 21 L 10 26 C 10 26, 10 26, 10 26 C 10 26, 9 26, 9 26 L 9 21 L 3 21 L 3 29 C 3 29, 3 29, 3 29 C 2 29, 2 29, 2 29 L 2 21 C 2 21, 1 21, 1 20 L 1 17 L 0 17 C 0 17, 0 17, 0 17 C 0 17, 0 16, 0 16 L 2 16 L 9 16 L 9 12 C 9 11, 10 9, 12 9 L 18 9 C 20 9, 21 11, 21 12 L 21 16 L 28 16 L 28 13 L 28 3 C 28 2, 27 1, 25 1 C 25 1, 25 1, 24 1 C 25 2, 25 2, 25 3 L 24 5 L 24 5 C 24 5, 24 5, 24 5 C 23 5, 23 5, 23 5 L 20 2 C 20 1, 20 1, 20 1 C 21 0, 22 0, 24 1 C 24 0, 25 0, 25 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 924,
    "y": 182,
    "width": 30,
    "height": 30,
    "fillColor": "#ffffff",
    "pathD": "M 12 27 L 11 29 L 19 29 L 18 27 L 12 27 Z M 1 24 L 1 25 C 1 26, 1 26, 2 26 L 12 26 L 18 26 L 28 26 C 29 26, 29 26, 29 25 L 29 24 L 1 24 Z M 4 19 L 11 19 C 11 19, 11 20, 11 20 C 11 20, 11 20, 11 20 L 4 20 C 3 20, 3 20, 3 20 C 3 20, 3 19, 4 19 Z M 8 16 L 13 16 C 13 16, 13 17, 13 17 C 13 17, 13 17, 13 17 L 8 17 C 8 17, 8 17, 8 17 C 8 17, 8 16, 8 16 Z M 4 16 L 6 16 C 6 16, 6 17, 6 17 C 6 17, 6 17, 6 17 L 4 17 C 3 17, 3 17, 3 17 C 3 17, 3 16, 4 16 Z M 24 15 C 24 15, 24 16, 24 16 L 24 21 C 24 21, 24 22, 24 22 C 23 22, 23 21, 23 21 L 23 16 C 23 16, 23 15, 24 15 Z M 10 13 L 13 13 C 13 13, 14 13, 14 14 C 14 14, 13 14, 13 14 L 10 14 C 10 14, 10 14, 10 14 C 10 13, 10 13, 10 13 Z M 4 13 L 8 13 C 8 13, 8 13, 8 14 C 8 14, 8 14, 8 14 L 4 14 C 3 14, 3 14, 3 14 C 3 13, 3 13, 4 13 Z M 4 10 L 11 10 C 11 10, 11 10, 11 10 C 11 11, 11 11, 11 11 L 4 11 C 3 11, 3 11, 3 10 C 3 10, 3 10, 4 10 Z M 14 8 C 13 9, 13 9, 14 10 L 20 16 C 20 16, 21 17, 21 18 L 21 23 L 26 23 L 26 16 C 26 16, 27 16, 27 16 C 27 16, 27 16, 27 16 L 27 23 L 29 23 L 29 16 C 29 15, 28 14, 27 14 L 24 14 L 24 14 C 24 14, 24 15, 24 15 C 23 15, 23 14, 23 14 L 23 14 L 21 14 C 20 14, 20 13, 19 13 L 15 8 C 14 8, 14 8, 14 8 Z M 24 7 C 23 7, 22 8, 22 9 C 22 10, 23 11, 24 11 C 25 11, 25 10, 25 9 C 25 8, 25 7, 24 7 Z M 4 7 L 7 7 C 8 7, 8 7, 8 7 C 8 7, 8 8, 7 8 L 4 8 C 3 8, 3 7, 3 7 C 3 7, 3 7, 4 7 Z M 24 6 C 25 6, 26 7, 26 9 C 26 10, 25 12, 24 12 C 22 12, 21 10, 21 9 C 21 7, 22 6, 24 6 Z M 2 0 L 28 0 C 29 0, 30 1, 30 2 L 30 11 C 30 11, 30 11, 30 11 C 29 11, 29 11, 29 11 L 29 2 C 29 1, 29 1, 28 1 L 2 1 C 1 1, 1 1, 1 2 L 1 23 L 20 23 L 20 18 C 20 17, 20 17, 19 17 L 13 10 C 12 10, 12 8, 13 8 C 14 7, 15 7, 15 8 L 20 12 C 20 12, 21 13, 21 13 L 27 13 C 29 13, 30 14, 30 16 L 30 25 C 30 26, 29 27, 28 27 L 19 27 L 20 29 L 22 29 C 22 29, 23 29, 23 30 C 23 30, 22 30, 22 30 L 20 30 L 10 30 L 8 30 C 8 30, 7 30, 7 30 C 7 29, 8 29, 8 29 L 10 29 L 11 27 L 2 27 C 1 27, 0 26, 0 25 L 0 24 L 0 2 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 327,
    "y": 281,
    "width": 30,
    "height": 29,
    "fillColor": "#ffffff",
    "pathD": "M 15 21 L 15 25 C 15 26, 16 26, 16 26 C 17 26, 17 26, 17 25 L 17 21 L 15 21 Z M 12 21 L 12 25 C 12 26, 13 26, 14 26 C 14 26, 15 26, 15 25 L 15 21 L 12 21 Z M 2 17 L 2 20 C 2 20, 2 20, 3 20 L 27 20 C 28 20, 28 20, 28 20 L 28 17 L 18 17 L 12 17 L 2 17 Z M 1 15 L 6 15 C 6 15, 7 15, 7 15 C 7 15, 6 15, 6 15 L 1 15 C 1 15, 1 15, 1 15 C 1 15, 1 15, 1 15 Z M 0 13 L 5 13 C 5 13, 5 13, 5 13 C 5 13, 5 14, 5 14 L 0 14 C 0 14, 0 13, 0 13 C 0 13, 0 13, 0 13 Z M 2 11 L 5 11 C 6 11, 6 11, 6 11 C 6 12, 6 12, 5 12 L 2 12 C 2 12, 1 12, 1 11 C 1 11, 2 11, 2 11 Z M 12 10 C 10 10, 9 11, 9 12 L 9 16 L 11 16 L 11 13 C 11 13, 11 12, 12 12 C 12 12, 12 13, 12 13 L 12 16 L 18 16 L 18 13 C 18 13, 18 12, 18 12 C 19 12, 19 13, 19 13 L 19 16 L 21 16 L 21 12 C 21 11, 20 10, 18 10 L 12 10 Z M 15 4 C 14 4, 13 5, 13 6 C 13 7, 14 8, 15 8 C 16 8, 17 7, 17 6 C 17 5, 16 4, 15 4 Z M 15 3 C 17 3, 18 4, 18 6 C 18 8, 17 9, 15 9 C 14 9, 12 8, 12 6 C 12 4, 14 3, 15 3 Z M 22 1 C 22 1, 21 1, 21 1 L 23 4 C 24 3, 24 2, 23 2 C 23 1, 23 1, 22 1 Z M 25 0 C 27 0, 29 1, 29 3 L 29 14 L 29 16 L 30 16 C 30 16, 30 17, 30 17 C 30 17, 30 17, 30 17 L 29 17 L 29 20 C 29 21, 28 21, 28 21 L 28 29 C 28 29, 28 29, 27 29 C 27 29, 27 29, 27 29 L 27 21 L 21 21 L 21 26 C 21 26, 20 26, 20 26 C 20 26, 20 26, 20 26 L 20 21 L 18 21 L 18 25 C 18 26, 18 27, 16 27 C 16 27, 15 27, 15 26 C 15 27, 14 27, 14 27 C 12 27, 12 26, 12 25 L 12 21 L 10 21 L 10 26 C 10 26, 10 26, 10 26 C 10 26, 9 26, 9 26 L 9 21 L 3 21 L 3 29 C 3 29, 3 29, 3 29 C 2 29, 2 29, 2 29 L 2 21 C 2 21, 1 21, 1 20 L 1 17 L 0 17 C 0 17, 0 17, 0 17 C 0 17, 0 16, 0 16 L 2 16 L 9 16 L 9 12 C 9 11, 10 9, 12 9 L 18 9 C 20 9, 21 11, 21 12 L 21 16 L 28 16 L 28 13 L 28 3 C 28 2, 27 1, 25 1 C 25 1, 25 1, 24 1 C 25 2, 25 2, 25 3 L 24 5 L 24 5 C 24 5, 24 5, 24 5 C 23 5, 23 5, 23 5 L 20 2 C 20 1, 20 1, 20 1 C 21 0, 22 0, 24 1 C 24 0, 25 0, 25 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 327,
    "y": 379,
    "width": 30,
    "height": 29,
    "fillColor": "#ffffff",
    "pathD": "M 15 21 L 15 25 C 15 26, 16 26, 16 26 C 17 26, 17 26, 17 25 L 17 21 L 15 21 Z M 12 21 L 12 25 C 12 26, 13 26, 14 26 C 14 26, 15 26, 15 25 L 15 21 L 12 21 Z M 2 17 L 2 20 C 2 20, 2 20, 3 20 L 27 20 C 28 20, 28 20, 28 20 L 28 17 L 18 17 L 12 17 L 2 17 Z M 1 15 L 6 15 C 6 15, 7 15, 7 15 C 7 15, 6 15, 6 15 L 1 15 C 1 15, 1 15, 1 15 C 1 15, 1 15, 1 15 Z M 0 13 L 5 13 C 5 13, 5 13, 5 13 C 5 13, 5 14, 5 14 L 0 14 C 0 14, 0 13, 0 13 C 0 13, 0 13, 0 13 Z M 2 11 L 5 11 C 6 11, 6 11, 6 11 C 6 12, 6 12, 5 12 L 2 12 C 2 12, 1 12, 1 11 C 1 11, 2 11, 2 11 Z M 12 10 C 10 10, 9 11, 9 12 L 9 16 L 11 16 L 11 13 C 11 13, 11 12, 12 12 C 12 12, 12 13, 12 13 L 12 16 L 18 16 L 18 13 C 18 13, 18 12, 18 12 C 19 12, 19 13, 19 13 L 19 16 L 21 16 L 21 12 C 21 11, 20 10, 18 10 L 12 10 Z M 15 4 C 14 4, 13 5, 13 6 C 13 7, 14 8, 15 8 C 16 8, 17 7, 17 6 C 17 5, 16 4, 15 4 Z M 15 3 C 17 3, 18 4, 18 6 C 18 8, 17 9, 15 9 C 14 9, 12 8, 12 6 C 12 4, 14 3, 15 3 Z M 22 1 C 22 1, 21 1, 21 1 L 23 4 C 24 3, 24 2, 23 2 C 23 1, 23 1, 22 1 Z M 25 0 C 27 0, 29 1, 29 3 L 29 14 L 29 16 L 30 16 C 30 16, 30 17, 30 17 C 30 17, 30 17, 30 17 L 29 17 L 29 20 C 29 21, 28 21, 28 21 L 28 29 C 28 29, 28 29, 27 29 C 27 29, 27 29, 27 29 L 27 21 L 21 21 L 21 26 C 21 26, 20 26, 20 26 C 20 26, 20 26, 20 26 L 20 21 L 18 21 L 18 25 C 18 26, 18 27, 16 27 C 16 27, 15 27, 15 26 C 15 27, 14 27, 14 27 C 12 27, 12 26, 12 25 L 12 21 L 10 21 L 10 26 C 10 26, 10 26, 10 26 C 10 26, 9 26, 9 26 L 9 21 L 3 21 L 3 29 C 3 29, 3 29, 3 29 C 2 29, 2 29, 2 29 L 2 21 C 2 21, 1 21, 1 20 L 1 17 L 0 17 C 0 17, 0 17, 0 17 C 0 17, 0 16, 0 16 L 2 16 L 9 16 L 9 12 C 9 11, 10 9, 12 9 L 18 9 C 20 9, 21 11, 21 12 L 21 16 L 28 16 L 28 13 L 28 3 C 28 2, 27 1, 25 1 C 25 1, 25 1, 24 1 C 25 2, 25 2, 25 3 L 24 5 L 24 5 C 24 5, 24 5, 24 5 C 23 5, 23 5, 23 5 L 20 2 C 20 1, 20 1, 20 1 C 21 0, 22 0, 24 1 C 24 0, 25 0, 25 0 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 327,
    "y": 477,
    "width": 30,
    "height": 29,
    "fillColor": "#ffffff",
    "pathD": "M 15 21 L 15 25 C 15 26, 16 26, 16 26 C 17 26, 17 26, 17 25 L 17 21 L 15 21 Z M 12 21 L 12 25 C 12 26, 13 26, 14 26 C 14 26, 15 26, 15 25 L 15 21 L 12 21 Z M 2 17 L 2 20 C 2 20, 2 20, 3 20 L 27 20 C 28 20, 28 20, 28 20 L 28 17 L 18 17 L 12 17 L 2 17 Z M 1 15 L 6 15 C 6 15, 7 15, 7 15 C 7 15, 6 15, 6 15 L 1 15 C 1 15, 1 15, 1 15 C 1 15, 1 15, 1 15 Z M 0 13 L 5 13 C 5 13, 5 13, 5 13 C 5 13, 5 14, 5 14 L 0 14 C 0 14, 0 13, 0 13 C 0 13, 0 13, 0 13 Z M 2 11 L 5 11 C 6 11, 6 11, 6 11 C 6 12, 6 12, 5 12 L 2 12 C 2 12, 1 12, 1 11 C 1 11, 2 11, 2 11 Z M 12 10 C 10 10, 9 11, 9 12 L 9 16 L 11 16 L 11 13 C 11 13, 11 12, 12 12 C 12 12, 12 13, 12 13 L 12 16 L 18 16 L 18 13 C 18 13, 18 12, 18 12 C 19 12, 19 13, 19 13 L 19 16 L 21 16 L 21 12 C 21 11, 20 10, 18 10 L 12 10 Z M 15 4 C 14 4, 13 5, 13 6 C 13 7, 14 8, 15 8 C 16 8, 17 7, 17 6 C 17 5, 16 4, 15 4 Z M 15 3 C 17 3, 18 4, 18 6 C 18 8, 17 9, 15 9 C 14 9, 12 8, 12 6 C 12 4, 14 3, 15 3 Z M 22 1 C 22 1, 21 1, 21 1 L 23 4 C 24 3, 24 2, 23 2 C 23 1, 23 1, 22 1 Z M 25 0 C 27 0, 29 1, 29 3 L 29 14 L 29 16 L 30 16 C 30 16, 30 17, 30 17 C 30 17, 30 17, 30 17 L 29 17 L 29 20 C 29 21, 28 21, 28 21 L 28 29 C 28 29, 28 29, 27 29 C 27 29, 27 29, 27 29 L 27 21 L 21 21 L 21 26 C 21 26, 20 26, 20 26 C 20 26, 20 26, 20 26 L 20 21 L 18 21 L 18 25 C 18 26, 18 27, 16 27 C 16 27, 15 27, 15 26 C 15 27, 14 27, 14 27 C 12 27, 12 26, 12 25 L 12 21 L 10 21 L 10 26 C 10 26, 10 26, 10 26 C 10 26, 9 26, 9 26 L 9 21 L 3 21 L 3 29 C 3 29, 3 29, 3 29 C 2 29, 2 29, 2 29 L 2 21 C 2 21, 1 21, 1 20 L 1 17 L 0 17 C 0 17, 0 17, 0 17 C 0 17, 0 16, 0 16 L 2 16 L 9 16 L 9 12 C 9 11, 10 9, 12 9 L 18 9 C 20 9, 21 11, 21 12 L 21 16 L 28 16 L 28 13 L 28 3 C 28 2, 27 1, 25 1 C 25 1, 25 1, 24 1 C 25 2, 25 2, 25 3 L 24 5 L 24 5 C 24 5, 24 5, 24 5 C 23 5, 23 5, 23 5 L 20 2 C 20 1, 20 1, 20 1 C 21 0, 22 0, 24 1 C 24 0, 25 0, 25 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 327,
    "y": 576,
    "width": 30,
    "height": 29,
    "fillColor": "#ffffff",
    "pathD": "M 15 21 L 15 25 C 15 26, 16 26, 16 26 C 17 26, 17 26, 17 25 L 17 21 L 15 21 Z M 12 21 L 12 25 C 12 26, 13 26, 14 26 C 14 26, 15 26, 15 25 L 15 21 L 12 21 Z M 2 17 L 2 20 C 2 20, 2 20, 3 20 L 27 20 C 28 20, 28 20, 28 20 L 28 17 L 18 17 L 12 17 L 2 17 Z M 1 15 L 6 15 C 6 15, 7 15, 7 15 C 7 15, 6 15, 6 15 L 1 15 C 1 15, 1 15, 1 15 C 1 15, 1 15, 1 15 Z M 0 13 L 5 13 C 5 13, 5 13, 5 13 C 5 13, 5 14, 5 14 L 0 14 C 0 14, 0 13, 0 13 C 0 13, 0 13, 0 13 Z M 2 11 L 5 11 C 6 11, 6 11, 6 11 C 6 12, 6 12, 5 12 L 2 12 C 2 12, 1 12, 1 11 C 1 11, 2 11, 2 11 Z M 12 10 C 10 10, 9 11, 9 12 L 9 16 L 11 16 L 11 13 C 11 13, 11 12, 12 12 C 12 12, 12 13, 12 13 L 12 16 L 18 16 L 18 13 C 18 13, 18 12, 18 12 C 19 12, 19 13, 19 13 L 19 16 L 21 16 L 21 12 C 21 11, 20 10, 18 10 L 12 10 Z M 15 4 C 14 4, 13 5, 13 6 C 13 7, 14 8, 15 8 C 16 8, 17 7, 17 6 C 17 5, 16 4, 15 4 Z M 15 3 C 17 3, 18 4, 18 6 C 18 8, 17 9, 15 9 C 14 9, 12 8, 12 6 C 12 4, 14 3, 15 3 Z M 22 1 C 22 1, 21 1, 21 1 L 23 4 C 24 3, 24 2, 23 2 C 23 1, 23 1, 22 1 Z M 25 0 C 27 0, 29 1, 29 3 L 29 14 L 29 16 L 30 16 C 30 16, 30 17, 30 17 C 30 17, 30 17, 30 17 L 29 17 L 29 20 C 29 21, 28 21, 28 21 L 28 29 C 28 29, 28 29, 27 29 C 27 29, 27 29, 27 29 L 27 21 L 21 21 L 21 26 C 21 26, 20 26, 20 26 C 20 26, 20 26, 20 26 L 20 21 L 18 21 L 18 25 C 18 26, 18 27, 16 27 C 16 27, 15 27, 15 26 C 15 27, 14 27, 14 27 C 12 27, 12 26, 12 25 L 12 21 L 10 21 L 10 26 C 10 26, 10 26, 10 26 C 10 26, 9 26, 9 26 L 9 21 L 3 21 L 3 29 C 3 29, 3 29, 3 29 C 2 29, 2 29, 2 29 L 2 21 C 2 21, 1 21, 1 20 L 1 17 L 0 17 C 0 17, 0 17, 0 17 C 0 17, 0 16, 0 16 L 2 16 L 9 16 L 9 12 C 9 11, 10 9, 12 9 L 18 9 C 20 9, 21 11, 21 12 L 21 16 L 28 16 L 28 13 L 28 3 C 28 2, 27 1, 25 1 C 25 1, 25 1, 24 1 C 25 2, 25 2, 25 3 L 24 5 L 24 5 C 24 5, 24 5, 24 5 C 23 5, 23 5, 23 5 L 20 2 C 20 1, 20 1, 20 1 C 21 0, 22 0, 24 1 C 24 0, 25 0, 25 0 Z"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 924,
    "y": 281,
    "width": 30,
    "height": 30,
    "fillColor": "#ffffff",
    "pathD": "M 12 27 L 11 29 L 19 29 L 18 27 L 12 27 Z M 1 24 L 1 25 C 1 26, 1 26, 2 26 L 12 26 L 18 26 L 28 26 C 29 26, 29 26, 29 25 L 29 24 L 1 24 Z M 4 19 L 11 19 C 11 19, 11 20, 11 20 C 11 20, 11 20, 11 20 L 4 20 C 3 20, 3 20, 3 20 C 3 20, 3 19, 4 19 Z M 8 16 L 13 16 C 13 16, 13 17, 13 17 C 13 17, 13 17, 13 17 L 8 17 C 8 17, 8 17, 8 17 C 8 17, 8 16, 8 16 Z M 4 16 L 6 16 C 6 16, 6 17, 6 17 C 6 17, 6 17, 6 17 L 4 17 C 3 17, 3 17, 3 17 C 3 17, 3 16, 4 16 Z M 24 15 C 24 15, 24 16, 24 16 L 24 21 C 24 21, 24 22, 24 22 C 23 22, 23 21, 23 21 L 23 16 C 23 16, 23 15, 24 15 Z M 10 13 L 13 13 C 13 13, 14 13, 14 14 C 14 14, 13 14, 13 14 L 10 14 C 10 14, 10 14, 10 14 C 10 13, 10 13, 10 13 Z M 4 13 L 8 13 C 8 13, 8 13, 8 14 C 8 14, 8 14, 8 14 L 4 14 C 3 14, 3 14, 3 14 C 3 13, 3 13, 4 13 Z M 4 10 L 11 10 C 11 10, 11 10, 11 10 C 11 11, 11 11, 11 11 L 4 11 C 3 11, 3 11, 3 10 C 3 10, 3 10, 4 10 Z M 14 8 C 13 9, 13 9, 14 10 L 20 16 C 20 16, 21 17, 21 18 L 21 23 L 26 23 L 26 16 C 26 16, 27 16, 27 16 C 27 16, 27 16, 27 16 L 27 23 L 29 23 L 29 16 C 29 15, 28 14, 27 14 L 24 14 L 24 14 C 24 14, 24 15, 24 15 C 23 15, 23 14, 23 14 L 23 14 L 21 14 C 20 14, 20 13, 19 13 L 15 8 C 14 8, 14 8, 14 8 Z M 24 7 C 23 7, 22 8, 22 9 C 22 10, 23 11, 24 11 C 25 11, 25 10, 25 9 C 25 8, 25 7, 24 7 Z M 4 7 L 7 7 C 8 7, 8 7, 8 7 C 8 7, 8 8, 7 8 L 4 8 C 3 8, 3 7, 3 7 C 3 7, 3 7, 4 7 Z M 24 6 C 25 6, 26 7, 26 9 C 26 10, 25 12, 24 12 C 22 12, 21 10, 21 9 C 21 7, 22 6, 24 6 Z M 2 0 L 28 0 C 29 0, 30 1, 30 2 L 30 11 C 30 11, 30 11, 30 11 C 29 11, 29 11, 29 11 L 29 2 C 29 1, 29 1, 28 1 L 2 1 C 1 1, 1 1, 1 2 L 1 23 L 20 23 L 20 18 C 20 17, 20 17, 19 17 L 13 10 C 12 10, 12 8, 13 8 C 14 7, 15 7, 15 8 L 20 12 C 20 12, 21 13, 21 13 L 27 13 C 29 13, 30 14, 30 16 L 30 25 C 30 26, 29 27, 28 27 L 19 27 L 20 29 L 22 29 C 22 29, 23 29, 23 30 C 23 30, 22 30, 22 30 L 20 30 L 10 30 L 8 30 C 8 30, 7 30, 7 30 C 7 29, 8 29, 8 29 L 10 29 L 11 27 L 2 27 C 1 27, 0 26, 0 25 L 0 24 L 0 2 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 924,
    "y": 379,
    "width": 30,
    "height": 30,
    "fillColor": "#ffffff",
    "pathD": "M 12 27 L 11 29 L 19 29 L 18 27 L 12 27 Z M 1 24 L 1 25 C 1 26, 1 26, 2 26 L 12 26 L 18 26 L 28 26 C 29 26, 29 26, 29 25 L 29 24 L 1 24 Z M 4 19 L 11 19 C 11 19, 11 20, 11 20 C 11 20, 11 20, 11 20 L 4 20 C 3 20, 3 20, 3 20 C 3 20, 3 19, 4 19 Z M 8 16 L 13 16 C 13 16, 13 17, 13 17 C 13 17, 13 17, 13 17 L 8 17 C 8 17, 8 17, 8 17 C 8 17, 8 16, 8 16 Z M 4 16 L 6 16 C 6 16, 6 17, 6 17 C 6 17, 6 17, 6 17 L 4 17 C 3 17, 3 17, 3 17 C 3 17, 3 16, 4 16 Z M 24 15 C 24 15, 24 16, 24 16 L 24 21 C 24 21, 24 22, 24 22 C 23 22, 23 21, 23 21 L 23 16 C 23 16, 23 15, 24 15 Z M 10 13 L 13 13 C 13 13, 14 13, 14 14 C 14 14, 13 14, 13 14 L 10 14 C 10 14, 10 14, 10 14 C 10 13, 10 13, 10 13 Z M 4 13 L 8 13 C 8 13, 8 13, 8 14 C 8 14, 8 14, 8 14 L 4 14 C 3 14, 3 14, 3 14 C 3 13, 3 13, 4 13 Z M 4 10 L 11 10 C 11 10, 11 10, 11 10 C 11 11, 11 11, 11 11 L 4 11 C 3 11, 3 11, 3 10 C 3 10, 3 10, 4 10 Z M 14 8 C 13 9, 13 9, 14 10 L 20 16 C 20 16, 21 17, 21 18 L 21 23 L 26 23 L 26 16 C 26 16, 27 16, 27 16 C 27 16, 27 16, 27 16 L 27 23 L 29 23 L 29 16 C 29 15, 28 14, 27 14 L 24 14 L 24 14 C 24 14, 24 15, 24 15 C 23 15, 23 14, 23 14 L 23 14 L 21 14 C 20 14, 20 13, 19 13 L 15 8 C 14 8, 14 8, 14 8 Z M 24 7 C 23 7, 22 8, 22 9 C 22 10, 23 11, 24 11 C 25 11, 25 10, 25 9 C 25 8, 25 7, 24 7 Z M 4 7 L 7 7 C 8 7, 8 7, 8 7 C 8 7, 8 8, 7 8 L 4 8 C 3 8, 3 7, 3 7 C 3 7, 3 7, 4 7 Z M 24 6 C 25 6, 26 7, 26 9 C 26 10, 25 12, 24 12 C 22 12, 21 10, 21 9 C 21 7, 22 6, 24 6 Z M 2 0 L 28 0 C 29 0, 30 1, 30 2 L 30 11 C 30 11, 30 11, 30 11 C 29 11, 29 11, 29 11 L 29 2 C 29 1, 29 1, 28 1 L 2 1 C 1 1, 1 1, 1 2 L 1 23 L 20 23 L 20 18 C 20 17, 20 17, 19 17 L 13 10 C 12 10, 12 8, 13 8 C 14 7, 15 7, 15 8 L 20 12 C 20 12, 21 13, 21 13 L 27 13 C 29 13, 30 14, 30 16 L 30 25 C 30 26, 29 27, 28 27 L 19 27 L 20 29 L 22 29 C 22 29, 23 29, 23 30 C 23 30, 22 30, 22 30 L 20 30 L 10 30 L 8 30 C 8 30, 7 30, 7 30 C 7 29, 8 29, 8 29 L 10 29 L 11 27 L 2 27 C 1 27, 0 26, 0 25 L 0 24 L 0 2 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 924,
    "y": 477,
    "width": 30,
    "height": 30,
    "fillColor": "#ffffff",
    "pathD": "M 12 27 L 11 29 L 19 29 L 18 27 L 12 27 Z M 1 24 L 1 25 C 1 26, 1 26, 2 26 L 12 26 L 18 26 L 28 26 C 29 26, 29 26, 29 25 L 29 24 L 1 24 Z M 4 19 L 11 19 C 11 19, 11 20, 11 20 C 11 20, 11 20, 11 20 L 4 20 C 3 20, 3 20, 3 20 C 3 20, 3 19, 4 19 Z M 8 16 L 13 16 C 13 16, 13 17, 13 17 C 13 17, 13 17, 13 17 L 8 17 C 8 17, 8 17, 8 17 C 8 17, 8 16, 8 16 Z M 4 16 L 6 16 C 6 16, 6 17, 6 17 C 6 17, 6 17, 6 17 L 4 17 C 3 17, 3 17, 3 17 C 3 17, 3 16, 4 16 Z M 24 15 C 24 15, 24 16, 24 16 L 24 21 C 24 21, 24 22, 24 22 C 23 22, 23 21, 23 21 L 23 16 C 23 16, 23 15, 24 15 Z M 10 13 L 13 13 C 13 13, 14 13, 14 14 C 14 14, 13 14, 13 14 L 10 14 C 10 14, 10 14, 10 14 C 10 13, 10 13, 10 13 Z M 4 13 L 8 13 C 8 13, 8 13, 8 14 C 8 14, 8 14, 8 14 L 4 14 C 3 14, 3 14, 3 14 C 3 13, 3 13, 4 13 Z M 4 10 L 11 10 C 11 10, 11 10, 11 10 C 11 11, 11 11, 11 11 L 4 11 C 3 11, 3 11, 3 10 C 3 10, 3 10, 4 10 Z M 14 8 C 13 9, 13 9, 14 10 L 20 16 C 20 16, 21 17, 21 18 L 21 23 L 26 23 L 26 16 C 26 16, 27 16, 27 16 C 27 16, 27 16, 27 16 L 27 23 L 29 23 L 29 16 C 29 15, 28 14, 27 14 L 24 14 L 24 14 C 24 14, 24 15, 24 15 C 23 15, 23 14, 23 14 L 23 14 L 21 14 C 20 14, 20 13, 19 13 L 15 8 C 14 8, 14 8, 14 8 Z M 24 7 C 23 7, 22 8, 22 9 C 22 10, 23 11, 24 11 C 25 11, 25 10, 25 9 C 25 8, 25 7, 24 7 Z M 4 7 L 7 7 C 8 7, 8 7, 8 7 C 8 7, 8 8, 7 8 L 4 8 C 3 8, 3 7, 3 7 C 3 7, 3 7, 4 7 Z M 24 6 C 25 6, 26 7, 26 9 C 26 10, 25 12, 24 12 C 22 12, 21 10, 21 9 C 21 7, 22 6, 24 6 Z M 2 0 L 28 0 C 29 0, 30 1, 30 2 L 30 11 C 30 11, 30 11, 30 11 C 29 11, 29 11, 29 11 L 29 2 C 29 1, 29 1, 28 1 L 2 1 C 1 1, 1 1, 1 2 L 1 23 L 20 23 L 20 18 C 20 17, 20 17, 19 17 L 13 10 C 12 10, 12 8, 13 8 C 14 7, 15 7, 15 8 L 20 12 C 20 12, 21 13, 21 13 L 27 13 C 29 13, 30 14, 30 16 L 30 25 C 30 26, 29 27, 28 27 L 19 27 L 20 29 L 22 29 C 22 29, 23 29, 23 30 C 23 30, 22 30, 22 30 L 20 30 L 10 30 L 8 30 C 8 30, 7 30, 7 30 C 7 29, 8 29, 8 29 L 10 29 L 11 27 L 2 27 C 1 27, 0 26, 0 25 L 0 24 L 0 2 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 924,
    "y": 575,
    "width": 30,
    "height": 30,
    "fillColor": "#ffffff",
    "pathD": "M 12 27 L 11 29 L 19 29 L 18 27 L 12 27 Z M 1 24 L 1 25 C 1 26, 1 26, 2 26 L 12 26 L 18 26 L 28 26 C 29 26, 29 26, 29 25 L 29 24 L 1 24 Z M 4 19 L 11 19 C 11 19, 11 20, 11 20 C 11 20, 11 20, 11 20 L 4 20 C 3 20, 3 20, 3 20 C 3 20, 3 19, 4 19 Z M 8 16 L 13 16 C 13 16, 13 17, 13 17 C 13 17, 13 17, 13 17 L 8 17 C 8 17, 8 17, 8 17 C 8 17, 8 16, 8 16 Z M 4 16 L 6 16 C 6 16, 6 17, 6 17 C 6 17, 6 17, 6 17 L 4 17 C 3 17, 3 17, 3 17 C 3 17, 3 16, 4 16 Z M 24 15 C 24 15, 24 16, 24 16 L 24 21 C 24 21, 24 22, 24 22 C 23 22, 23 21, 23 21 L 23 16 C 23 16, 23 15, 24 15 Z M 10 13 L 13 13 C 13 13, 14 13, 14 14 C 14 14, 13 14, 13 14 L 10 14 C 10 14, 10 14, 10 14 C 10 13, 10 13, 10 13 Z M 4 13 L 8 13 C 8 13, 8 13, 8 14 C 8 14, 8 14, 8 14 L 4 14 C 3 14, 3 14, 3 14 C 3 13, 3 13, 4 13 Z M 4 10 L 11 10 C 11 10, 11 10, 11 10 C 11 11, 11 11, 11 11 L 4 11 C 3 11, 3 11, 3 10 C 3 10, 3 10, 4 10 Z M 14 8 C 13 9, 13 9, 14 10 L 20 16 C 20 16, 21 17, 21 18 L 21 23 L 26 23 L 26 16 C 26 16, 27 16, 27 16 C 27 16, 27 16, 27 16 L 27 23 L 29 23 L 29 16 C 29 15, 28 14, 27 14 L 24 14 L 24 14 C 24 14, 24 15, 24 15 C 23 15, 23 14, 23 14 L 23 14 L 21 14 C 20 14, 20 13, 19 13 L 15 8 C 14 8, 14 8, 14 8 Z M 24 7 C 23 7, 22 8, 22 9 C 22 10, 23 11, 24 11 C 25 11, 25 10, 25 9 C 25 8, 25 7, 24 7 Z M 4 7 L 7 7 C 8 7, 8 7, 8 7 C 8 7, 8 8, 7 8 L 4 8 C 3 8, 3 7, 3 7 C 3 7, 3 7, 4 7 Z M 24 6 C 25 6, 26 7, 26 9 C 26 10, 25 12, 24 12 C 22 12, 21 10, 21 9 C 21 7, 22 6, 24 6 Z M 2 0 L 28 0 C 29 0, 30 1, 30 2 L 30 11 C 30 11, 30 11, 30 11 C 29 11, 29 11, 29 11 L 29 2 C 29 1, 29 1, 28 1 L 2 1 C 1 1, 1 1, 1 2 L 1 23 L 20 23 L 20 18 C 20 17, 20 17, 19 17 L 13 10 C 12 10, 12 8, 13 8 C 14 7, 15 7, 15 8 L 20 12 C 20 12, 21 13, 21 13 L 27 13 C 29 13, 30 14, 30 16 L 30 25 C 30 26, 29 27, 28 27 L 19 27 L 20 29 L 22 29 C 22 29, 23 29, 23 30 C 23 30, 22 30, 22 30 L 20 30 L 10 30 L 8 30 C 8 30, 7 30, 7 30 C 7 29, 8 29, 8 29 L 10 29 L 11 27 L 2 27 C 1 27, 0 26, 0 25 L 0 24 L 0 2 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 81,
    "y": 160,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 2,
    "x": 81,
    "y": 258,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 4,
    "x": 81,
    "y": 358,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 6,
    "x": 81,
    "y": 455,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 8,
    "x": 81,
    "y": 553,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 1,
    "x": 986,
    "y": 160,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 3,
    "x": 986,
    "y": 258,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 5,
    "x": 986,
    "y": 358,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 7,
    "x": 986,
    "y": 455,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 9,
    "x": 986,
    "y": 553,
    "width": 214,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
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

export function Imported2025migsopcubedcreativeandexampletemplates72Template({ data }: { data: BrainData }): ReactElement {
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
