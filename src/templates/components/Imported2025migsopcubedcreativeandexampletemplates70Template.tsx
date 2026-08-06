import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-48",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 125,
    "y": 161,
    "width": 453,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-49",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 702,
    "y": 161,
    "width": 453,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 125,
    "y": 223,
    "width": 453,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 443 0 Q 453 0 453 10 L 453 52 Q 453 62 443 62 L 10 62 Q 0 62 0 52 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 125,
    "y": 223,
    "width": 62,
    "height": 62,
    "pathD": "M 31 0 A 31 31 0 1 1 31 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 125,
    "y": 307,
    "width": 453,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 443 0 Q 453 0 453 10 L 453 52 Q 453 62 443 62 L 10 62 Q 0 62 0 52 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 125,
    "y": 307,
    "width": 62,
    "height": 62,
    "pathD": "M 31 0 A 31 31 0 1 1 31 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 125,
    "y": 392,
    "width": 453,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 443 0 Q 453 0 453 10 L 453 52 Q 453 62 443 62 L 10 62 Q 0 62 0 52 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 125,
    "y": 392,
    "width": 62,
    "height": 62,
    "pathD": "M 31 0 A 31 31 0 1 1 31 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 125,
    "y": 476,
    "width": 453,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 443 0 Q 453 0 453 10 L 453 52 Q 453 62 443 62 L 10 62 Q 0 62 0 52 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 125,
    "y": 476,
    "width": 62,
    "height": 62,
    "pathD": "M 31 0 A 31 31 0 1 1 31 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 125,
    "y": 560,
    "width": 453,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 443 0 Q 453 0 453 10 L 453 52 Q 453 62 443 62 L 10 62 Q 0 62 0 52 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 125,
    "y": 560,
    "width": 62,
    "height": 62,
    "pathD": "M 31 0 A 31 31 0 1 1 31 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 702,
    "y": 223,
    "width": 453,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 443 0 Q 453 0 453 10 L 453 52 Q 453 62 443 62 L 10 62 Q 0 62 0 52 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 702,
    "y": 223,
    "width": 62,
    "height": 62,
    "fillColor": "#52c49c",
    "pathD": "M 31 0 A 31 31 0 1 1 31 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 702,
    "y": 307,
    "width": 453,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 443 0 Q 453 0 453 10 L 453 52 Q 453 62 443 62 L 10 62 Q 0 62 0 52 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 702,
    "y": 307,
    "width": 62,
    "height": 62,
    "fillColor": "#52c49c",
    "pathD": "M 31 0 A 31 31 0 1 1 31 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 702,
    "y": 392,
    "width": 453,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 443 0 Q 453 0 453 10 L 453 52 Q 453 62 443 62 L 10 62 Q 0 62 0 52 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 702,
    "y": 392,
    "width": 62,
    "height": 62,
    "fillColor": "#52c49c",
    "pathD": "M 31 0 A 31 31 0 1 1 31 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 702,
    "y": 476,
    "width": 453,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 443 0 Q 453 0 453 10 L 453 52 Q 453 62 443 62 L 10 62 Q 0 62 0 52 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 702,
    "y": 476,
    "width": 62,
    "height": 62,
    "fillColor": "#52c49c",
    "pathD": "M 31 0 A 31 31 0 1 1 31 0 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 702,
    "y": 560,
    "width": 453,
    "height": 62,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 443 0 Q 453 0 453 10 L 453 52 Q 453 62 443 62 L 10 62 Q 0 62 0 52 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 702,
    "y": 560,
    "width": 62,
    "height": 62,
    "fillColor": "#52c49c",
    "pathD": "M 31 0 A 31 31 0 1 1 31 0 Z"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 215,
    "y": 135,
    "width": 273,
    "height": 51,
    "pathD": "M 0 0 L 205 0 L 273 26 L 205 51 L 0 51 L 68 26 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 792,
    "y": 135,
    "width": 273,
    "height": 51,
    "fillColor": "#52c49c",
    "pathD": "M 0 0 L 205 0 L 273 26 L 205 51 L 0 51 L 68 26 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 596,
    "y": 116,
    "width": 44,
    "height": 90,
    "pathD": "M 44 0 L 44 90 L 40 90 C 18 87, 0 68, 0 45 C 0 22, 18 3, 40 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 640,
    "y": 116,
    "width": 44,
    "height": 90,
    "fillColor": "#52c49c",
    "pathD": "M 44 0 L 44 90 L 40 90 C 18 87, 0 68, 0 45 C 0 22, 18 3, 40 0 Z"
  },
  {
    "id": "sp-50",
    "x": 640,
    "y": 223,
    "width": 10,
    "height": 399,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 142,
    "y": 237,
    "width": 29,
    "height": 34,
    "fillColor": "#ffffff",
    "pathD": "M 15 25 C 14 26, 14 27, 13 28 C 12 28, 12 29, 12 29 C 13 30, 13 30, 14 30 L 14 29 C 14 29, 14 28, 15 28 C 15 28, 15 29, 15 29 L 15 30 C 16 30, 16 30, 16 30 C 17 29, 17 29, 17 28 C 16 27, 15 26, 15 25 Z M 15 21 C 10 21, 6 25, 6 30 C 6 31, 6 32, 7 33 L 14 33 L 14 31 C 13 31, 12 30, 11 29 C 11 28, 12 27, 12 27 C 13 26, 14 26, 14 24 C 14 24, 14 24, 14 24 C 14 24, 14 24, 15 24 C 15 24, 17 26, 18 28 C 18 29, 18 30, 17 30 C 17 31, 16 31, 15 31 L 15 33 L 22 33 C 23 32, 23 31, 23 30 C 23 25, 19 21, 15 21 Z M 8 16 C 4 18, 1 22, 1 28 C 1 30, 1 31, 2 33 L 6 33 C 5 32, 5 31, 5 30 C 5 25, 9 20, 15 20 C 20 20, 24 25, 24 30 C 24 31, 24 32, 23 33 L 27 33 C 28 31, 28 30, 28 28 C 28 22, 25 18, 21 16 L 8 16 Z M 6 10 C 8 11, 9 12, 9 15 L 20 15 C 20 12, 21 11, 23 10 L 6 10 Z M 5 9 L 24 9 C 25 9, 25 9, 25 9 C 25 10, 25 10, 25 10 C 24 10, 21 11, 21 15 C 26 17, 29 22, 29 28 C 29 30, 29 32, 28 34 C 28 34, 28 34, 27 34 L 23 34 L 6 34 L 2 34 C 1 34, 1 34, 1 34 C 0 32, 0 30, 0 28 C 0 22, 3 17, 8 15 C 8 11, 5 10, 4 10 C 4 10, 4 10, 4 9 C 4 9, 4 9, 5 9 Z M 10 2 C 11 2, 11 2, 10 3 C 10 3, 10 4, 10 4 C 11 5, 11 7, 10 8 C 10 8, 10 8, 10 8 C 10 8, 10 8, 10 8 C 9 8, 9 7, 10 7 C 10 7, 10 6, 10 5 C 9 4, 9 3, 10 2 C 10 2, 10 2, 10 2 Z M 20 1 C 20 1, 20 1, 20 2 C 19 2, 19 3, 20 4 C 21 5, 21 6, 20 7 C 20 7, 19 7, 19 7 C 19 7, 19 7, 19 7 C 19 7, 19 6, 19 6 C 19 6, 19 5, 19 4 C 18 3, 18 2, 19 1 C 19 1, 19 1, 20 1 Z M 15 0 C 15 0, 15 1, 15 1 C 15 1, 15 2, 15 3 C 16 4, 16 5, 15 6 C 15 6, 15 6, 15 6 C 14 6, 14 6, 14 6 C 14 6, 14 5, 14 5 C 15 5, 15 4, 14 3 C 13 2, 13 1, 14 0 C 14 0, 15 0, 15 0 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 139,
    "y": 323,
    "width": 34,
    "height": 32,
    "fillColor": "#ffffff",
    "pathD": "M 3 26 C 3 26, 3 26, 3 26 C 4 27, 4 27, 3 27 C 3 27, 3 27, 3 27 C 3 27, 3 27, 3 26 Z M 6 26 L 26 26 C 26 26, 26 26, 26 27 C 26 27, 26 27, 26 27 L 6 27 C 5 27, 5 27, 5 27 C 5 26, 5 26, 6 26 Z M 31 25 C 30 25, 29 26, 29 27 C 29 28, 30 29, 31 29 C 32 29, 33 28, 33 27 C 33 26, 32 25, 31 25 Z M 3 25 C 2 25, 1 26, 1 27 C 1 28, 2 29, 3 29 L 29 29 C 28 28, 28 28, 28 27 C 28 26, 28 25, 29 25 L 3 25 Z M 3 24 L 31 24 C 33 24, 34 25, 34 27 C 34 29, 33 30, 31 30 L 28 30 L 28 32 C 28 32, 28 32, 27 32 C 27 32, 27 32, 27 32 L 27 30 L 7 30 L 7 32 C 7 32, 7 32, 7 32 C 6 32, 6 32, 6 32 L 6 30 L 3 30 C 1 30, 0 29, 0 27 C 0 25, 1 24, 3 24 Z M 26 0 L 29 0 C 30 0, 30 0, 30 0 C 30 0, 30 1, 30 1 L 26 5 L 34 22 C 34 23, 34 23, 34 23 C 34 23, 33 23, 33 23 C 33 23, 33 23, 33 23 L 25 5 L 23 7 L 28 22 C 28 22, 28 23, 28 23 C 28 23, 28 23, 28 23 C 28 23, 27 23, 27 22 L 22 8 L 15 8 C 14 8, 13 8, 13 9 C 13 10, 14 11, 15 11 L 21 11 C 21 11, 21 11, 21 11 C 21 12, 21 12, 21 12 L 15 12 C 13 12, 12 11, 12 9 C 12 8, 13 7, 15 7 L 22 7 L 28 1 L 26 1 L 20 5 C 20 6, 20 5, 19 5 C 19 5, 19 5, 20 5 L 26 0 C 26 0, 26 0, 26 0 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 139,
    "y": 406,
    "width": 34,
    "height": 34,
    "fillColor": "#ffffff",
    "pathD": "M 16 26 C 16 26, 17 26, 18 27 C 19 28, 19 28, 20 28 C 21 28, 22 28, 22 27 C 24 26, 26 26, 27 27 C 27 27, 27 27, 27 27 C 27 28, 27 28, 27 28 C 25 27, 24 27, 23 28 C 22 29, 21 29, 20 29 C 19 29, 18 29, 17 28 C 16 27, 15 27, 13 28 C 13 29, 12 29, 11 29 C 10 29, 9 29, 8 28 C 8 28, 7 27, 7 27 C 6 27, 6 27, 6 27 C 6 26, 7 26, 7 26 C 8 26, 8 27, 9 27 C 9 28, 10 28, 11 28 C 12 28, 12 28, 13 27 C 14 26, 15 26, 16 26 Z M 27 21 C 28 21, 29 22, 30 22 C 30 23, 30 23, 30 23 C 30 23, 30 23, 29 23 C 28 22, 27 22, 25 23 C 25 24, 24 24, 23 24 C 22 24, 21 24, 20 23 C 19 22, 17 22, 16 23 C 15 24, 14 24, 13 24 C 12 24, 11 24, 11 23 C 9 22, 8 22, 7 23 C 6 24, 5 24, 5 24 C 4 24, 4 24, 4 24 C 4 24, 4 23, 4 23 C 5 23, 5 23, 6 22 C 7 21, 10 21, 11 22 C 12 23, 13 23, 13 23 C 14 23, 15 23, 15 22 C 17 21, 19 21, 21 22 C 21 23, 22 23, 23 23 C 23 23, 24 23, 25 22 C 25 22, 26 21, 27 21 Z M 1 21 C 1 21, 1 21, 1 21 C 3 28, 10 33, 17 33 C 24 33, 31 28, 33 21 C 33 21, 33 21, 33 21 C 33 21, 34 21, 34 21 C 32 29, 25 34, 17 34 C 9 34, 2 29, 0 21 C 0 21, 1 21, 1 21 Z M 17 17 C 18 17, 19 17, 20 18 C 21 19, 22 19, 24 18 C 24 17, 25 17, 26 17 C 27 17, 28 17, 29 18 C 29 18, 30 19, 31 19 C 31 19, 32 18, 33 18 C 33 18, 33 18, 33 18 C 34 18, 34 18, 33 19 C 33 19, 32 20, 31 20 C 30 20, 29 19, 28 19 C 28 18, 27 18, 26 18 C 25 18, 25 18, 24 19 C 23 20, 20 20, 19 19 C 18 18, 18 18, 17 18 C 16 18, 16 18, 15 19 C 14 20, 11 20, 10 19 C 9 18, 7 18, 6 19 C 4 20, 2 20, 1 19 C 0 18, 0 18, 1 18 C 1 18, 1 18, 1 18 C 2 18, 3 19, 3 19 C 4 19, 5 18, 5 18 C 7 16, 9 16, 10 18 C 12 19, 13 19, 14 18 C 15 17, 16 17, 17 17 Z M 19 10 L 19 13 L 26 13 L 26 10 L 19 10 Z M 19 6 L 19 9 L 26 9 L 26 6 L 19 6 Z M 28 5 C 29 5, 29 5, 29 5 C 32 8, 34 12, 34 16 C 34 16, 34 16, 34 16 C 34 16, 34 16, 33 16 C 33 16, 33 16, 33 16 C 33 12, 31 9, 28 6 C 28 6, 28 5, 28 5 Z M 19 3 L 19 5 L 26 5 L 26 3 L 19 3 Z M 16 0 C 16 0, 16 0, 16 1 C 16 1, 16 1, 16 1 C 8 2, 2 8, 1 16 C 1 16, 1 16, 1 16 C 0 16, 0 16, 0 16 C 0 16, 0 16, 0 16 C 1 8, 7 1, 16 0 Z M 19 0 C 19 0, 19 0, 19 1 L 19 2 L 26 2 L 26 1 C 26 0, 26 0, 26 0 C 26 0, 27 0, 27 1 L 27 15 C 27 15, 26 16, 26 16 C 26 16, 26 15, 26 15 L 26 14 L 19 14 L 19 15 C 19 15, 19 16, 19 16 C 18 16, 18 15, 18 15 L 18 1 C 18 0, 18 0, 19 0 Z"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 139,
    "y": 490,
    "width": 34,
    "height": 34,
    "fillColor": "#ffffff",
    "pathD": "M 26 33 C 26 33, 27 33, 27 33 C 27 33, 27 33, 27 33 C 27 34, 27 34, 27 34 C 27 34, 27 34, 27 34 C 26 34, 26 34, 26 34 C 26 34, 26 34, 26 33 C 26 33, 26 33, 26 33 Z M 31 32 C 31 32, 31 32, 32 32 C 32 32, 32 32, 32 32 C 32 33, 32 33, 32 33 C 32 33, 31 33, 31 33 C 31 33, 31 33, 31 33 C 31 33, 31 33, 31 32 C 31 32, 31 32, 31 32 Z M 22 32 C 22 32, 22 32, 22 32 C 23 32, 23 32, 23 32 C 23 33, 23 33, 22 33 C 22 33, 22 33, 22 33 C 22 33, 22 33, 22 33 C 22 33, 22 33, 22 32 C 22 32, 22 32, 22 32 Z M 27 30 C 27 30, 27 31, 27 31 C 27 31, 27 31, 27 31 C 26 31, 26 31, 26 31 C 26 31, 26 30, 27 30 Z M 31 30 C 31 29, 32 30, 32 30 C 32 30, 31 30, 31 31 L 31 31 C 31 31, 31 30, 31 30 C 31 30, 31 30, 31 30 Z M 22 30 C 23 30, 23 30, 23 30 C 23 30, 23 31, 22 31 L 22 31 C 22 30, 22 30, 22 30 C 22 30, 22 29, 22 30 Z M 27 28 C 27 28, 27 28, 27 28 C 27 29, 27 29, 27 29 C 26 29, 26 29, 26 28 C 26 28, 26 28, 27 28 Z M 31 27 C 31 27, 31 28, 31 28 C 31 28, 31 28, 31 28 L 31 28 C 31 28, 30 28, 30 28 C 30 28, 31 27, 31 27 Z M 23 27 C 23 27, 23 28, 23 28 C 23 28, 23 28, 22 28 L 22 28 C 22 28, 22 28, 22 28 C 22 28, 22 27, 23 27 Z M 27 25 C 27 25, 27 26, 27 26 C 27 26, 27 26, 27 26 C 26 26, 26 26, 26 26 C 26 26, 26 25, 27 25 Z M 31 25 C 31 25, 31 25, 31 25 C 31 26, 31 26, 31 26 L 31 26 C 30 26, 30 26, 30 26 C 30 25, 30 25, 31 25 Z M 23 25 C 23 25, 23 25, 23 26 C 23 26, 23 26, 23 26 L 23 26 C 22 26, 22 26, 22 25 C 22 25, 22 25, 23 25 Z M 27 23 C 27 23, 27 23, 27 23 C 27 24, 27 24, 27 24 C 26 24, 26 24, 26 23 C 26 23, 26 23, 27 23 Z M 30 23 C 31 23, 31 23, 31 23 C 31 23, 31 24, 30 24 C 30 24, 30 24, 30 24 C 30 24, 30 23, 30 23 C 30 23, 30 23, 30 23 Z M 23 23 C 23 23, 23 23, 23 23 C 23 23, 23 24, 23 24 C 23 24, 23 24, 23 24 C 22 24, 22 23, 22 23 C 22 23, 23 23, 23 23 Z M 8 15 C 8 15, 7 16, 7 16 C 7 17, 8 17, 8 17 L 21 18 C 21 18, 21 17, 22 16 C 22 16, 22 16, 23 16 C 23 16, 23 17, 23 17 C 22 18, 21 19, 21 20 L 32 20 C 32 17, 30 15, 27 15 L 8 15 Z M 14 0 L 29 0 C 32 0, 33 2, 33 4 C 33 6, 32 8, 29 8 L 5 8 C 3 8, 1 10, 1 12 C 1 14, 3 16, 5 16 L 6 16 C 7 15, 7 14, 8 14 L 27 14 C 30 14, 33 17, 33 20 L 34 20 C 34 20, 34 20, 34 21 C 34 21, 34 21, 34 21 L 33 21 L 21 21 L 20 21 C 20 21, 19 21, 19 21 C 19 20, 20 20, 20 20 L 20 20 C 20 20, 20 20, 20 19 L 8 18 C 7 18, 7 17, 6 17 L 5 17 C 2 17, 0 14, 0 12 C 0 9, 2 7, 5 7 L 29 7 C 31 7, 32 5, 32 4 C 32 2, 31 1, 29 1 L 14 1 C 14 1, 13 1, 13 1 C 13 0, 14 0, 14 0 Z"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 140,
    "y": 574,
    "width": 32,
    "height": 34,
    "fillColor": "#ffffff",
    "pathD": "M 29 23 C 30 23, 30 23, 30 24 C 30 24, 30 24, 29 24 C 29 24, 29 24, 29 24 C 29 23, 29 23, 29 23 Z M 4 9 C 5 9, 5 9, 5 9 C 5 10, 5 10, 5 10 L 2 12 C 1 12, 1 12, 1 13 C 1 13, 1 13, 1 13 L 12 32 C 12 33, 13 33, 13 33 L 22 28 C 23 27, 23 27, 23 28 C 23 28, 23 28, 23 28 L 14 34 C 14 34, 13 34, 13 34 C 13 34, 13 34, 12 34 C 12 34, 11 33, 11 33 L 0 14 C 0 13, 0 13, 0 12 C 0 12, 1 11, 1 11 L 4 9 Z M 22 8 C 21 8, 17 11, 17 14 C 17 15, 18 17, 20 17 C 21 17, 21 16, 22 15 C 22 15, 22 15, 22 15 C 22 15, 23 15, 23 15 C 23 16, 24 17, 25 17 C 26 17, 27 15, 27 14 C 27 11, 23 8, 22 8 Z M 22 7 C 22 6, 22 6, 22 7 C 23 7, 28 10, 28 14 C 28 16, 27 18, 25 18 C 24 18, 23 17, 23 17 L 23 19 L 23 19 C 23 19, 24 19, 24 19 C 24 20, 23 20, 23 20 L 21 20 C 21 20, 21 20, 21 19 C 21 19, 21 19, 21 19 L 22 19 L 22 17 C 21 17, 20 18, 20 18 C 18 18, 16 16, 16 14 C 16 10, 22 7, 22 7 Z M 11 4 C 11 4, 11 4, 11 4 C 11 4, 11 5, 11 5 L 7 6 C 7 6, 7 6, 7 6 C 7 6, 7 7, 7 7 L 12 28 C 12 29, 13 29, 14 29 L 19 27 C 19 27, 19 27, 19 28 C 20 28, 19 28, 19 28 L 14 30 C 14 30, 13 30, 13 30 C 12 30, 12 29, 11 28 L 6 7 C 6 7, 6 6, 6 6 C 6 5, 7 5, 7 5 L 11 4 Z M 15 2 C 16 2, 16 2, 16 3 C 16 3, 16 3, 15 3 C 15 3, 15 3, 15 3 C 15 2, 15 2, 15 2 Z M 15 1 C 14 1, 14 2, 14 2 L 14 24 C 14 25, 14 25, 15 25 L 30 25 C 31 25, 31 25, 31 24 L 31 2 C 31 2, 31 1, 30 1 L 15 1 Z M 15 0 L 30 0 C 31 0, 32 1, 32 2 L 32 24 C 32 25, 31 26, 30 26 L 15 26 C 14 26, 13 25, 13 24 L 13 2 C 13 1, 14 0, 15 0 Z"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 719,
    "y": 237,
    "width": 29,
    "height": 34,
    "fillColor": "#ffffff",
    "pathD": "M 15 25 C 14 26, 14 27, 13 28 C 12 28, 12 29, 12 29 C 13 30, 13 30, 14 30 L 14 29 C 14 29, 14 28, 15 28 C 15 28, 15 29, 15 29 L 15 30 C 16 30, 16 30, 16 30 C 17 29, 17 29, 17 28 C 16 27, 15 26, 15 25 Z M 15 21 C 10 21, 6 25, 6 30 C 6 31, 6 32, 7 33 L 14 33 L 14 31 C 13 31, 12 30, 11 29 C 11 28, 12 27, 12 27 C 13 26, 14 26, 14 24 C 14 24, 14 24, 14 24 C 14 24, 14 24, 15 24 C 15 24, 17 26, 18 28 C 18 29, 18 30, 17 30 C 17 31, 16 31, 15 31 L 15 33 L 22 33 C 23 32, 23 31, 23 30 C 23 25, 19 21, 15 21 Z M 8 16 C 4 18, 1 22, 1 28 C 1 30, 1 31, 2 33 L 6 33 C 5 32, 5 31, 5 30 C 5 25, 9 20, 15 20 C 20 20, 24 25, 24 30 C 24 31, 24 32, 23 33 L 27 33 C 28 31, 28 30, 28 28 C 28 22, 25 18, 21 16 L 8 16 Z M 6 10 C 8 11, 9 12, 9 15 L 20 15 C 20 12, 21 11, 23 10 L 6 10 Z M 5 9 L 24 9 C 25 9, 25 9, 25 9 C 25 10, 25 10, 25 10 C 24 10, 21 11, 21 15 C 26 17, 29 22, 29 28 C 29 30, 29 32, 28 34 C 28 34, 28 34, 27 34 L 23 34 L 6 34 L 2 34 C 1 34, 1 34, 1 34 C 0 32, 0 30, 0 28 C 0 22, 3 17, 8 15 C 8 11, 5 10, 4 10 C 4 10, 4 10, 4 9 C 4 9, 4 9, 5 9 Z M 10 2 C 11 2, 11 2, 10 3 C 10 3, 10 4, 10 4 C 11 5, 11 7, 10 8 C 10 8, 10 8, 10 8 C 10 8, 10 8, 10 8 C 9 8, 9 7, 10 7 C 10 7, 10 6, 10 5 C 9 4, 9 3, 10 2 C 10 2, 10 2, 10 2 Z M 20 1 C 20 1, 20 1, 20 2 C 19 2, 19 3, 20 4 C 21 5, 21 6, 20 7 C 20 7, 19 7, 19 7 C 19 7, 19 7, 19 7 C 19 7, 19 6, 19 6 C 19 6, 19 5, 19 4 C 18 3, 18 2, 19 1 C 19 1, 19 1, 20 1 Z M 15 0 C 15 0, 15 1, 15 1 C 15 1, 15 2, 15 3 C 16 4, 16 5, 15 6 C 15 6, 15 6, 15 6 C 14 6, 14 6, 14 6 C 14 6, 14 5, 14 5 C 15 5, 15 4, 14 3 C 13 2, 13 1, 14 0 C 14 0, 15 0, 15 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 716,
    "y": 323,
    "width": 34,
    "height": 32,
    "fillColor": "#ffffff",
    "pathD": "M 3 26 C 3 26, 3 26, 3 26 C 4 27, 4 27, 3 27 C 3 27, 3 27, 3 27 C 3 27, 3 27, 3 26 Z M 6 26 L 26 26 C 26 26, 26 26, 26 27 C 26 27, 26 27, 26 27 L 6 27 C 5 27, 5 27, 5 27 C 5 26, 5 26, 6 26 Z M 31 25 C 30 25, 29 26, 29 27 C 29 28, 30 29, 31 29 C 32 29, 33 28, 33 27 C 33 26, 32 25, 31 25 Z M 3 25 C 2 25, 1 26, 1 27 C 1 28, 2 29, 3 29 L 29 29 C 28 28, 28 28, 28 27 C 28 26, 28 25, 29 25 L 3 25 Z M 3 24 L 31 24 C 33 24, 34 25, 34 27 C 34 29, 33 30, 31 30 L 28 30 L 28 32 C 28 32, 28 32, 27 32 C 27 32, 27 32, 27 32 L 27 30 L 7 30 L 7 32 C 7 32, 7 32, 7 32 C 6 32, 6 32, 6 32 L 6 30 L 3 30 C 1 30, 0 29, 0 27 C 0 25, 1 24, 3 24 Z M 26 0 L 29 0 C 30 0, 30 0, 30 0 C 30 0, 30 1, 30 1 L 26 5 L 34 22 C 34 23, 34 23, 34 23 C 34 23, 33 23, 33 23 C 33 23, 33 23, 33 23 L 25 5 L 23 7 L 28 22 C 28 22, 28 23, 28 23 C 28 23, 28 23, 28 23 C 28 23, 27 23, 27 22 L 22 8 L 15 8 C 14 8, 13 8, 13 9 C 13 10, 14 11, 15 11 L 21 11 C 21 11, 21 11, 21 11 C 21 12, 21 12, 21 12 L 15 12 C 13 12, 12 11, 12 9 C 12 8, 13 7, 15 7 L 22 7 L 28 1 L 26 1 L 20 5 C 20 6, 20 5, 19 5 C 19 5, 19 5, 20 5 L 26 0 C 26 0, 26 0, 26 0 Z"
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 716,
    "y": 406,
    "width": 34,
    "height": 34,
    "fillColor": "#ffffff",
    "pathD": "M 16 26 C 16 26, 17 26, 18 27 C 19 28, 19 28, 20 28 C 21 28, 22 28, 22 27 C 24 26, 26 26, 27 27 C 27 27, 27 27, 27 27 C 27 28, 27 28, 27 28 C 25 27, 24 27, 23 28 C 22 29, 21 29, 20 29 C 19 29, 18 29, 17 28 C 16 27, 15 27, 13 28 C 13 29, 12 29, 11 29 C 10 29, 9 29, 8 28 C 8 28, 7 27, 7 27 C 6 27, 6 27, 6 27 C 6 26, 7 26, 7 26 C 8 26, 8 27, 9 27 C 9 28, 10 28, 11 28 C 12 28, 12 28, 13 27 C 14 26, 15 26, 16 26 Z M 27 21 C 28 21, 29 22, 30 22 C 30 23, 30 23, 30 23 C 30 23, 30 23, 29 23 C 28 22, 27 22, 25 23 C 25 24, 24 24, 23 24 C 22 24, 21 24, 20 23 C 19 22, 17 22, 16 23 C 15 24, 14 24, 13 24 C 12 24, 11 24, 11 23 C 9 22, 8 22, 7 23 C 6 24, 5 24, 5 24 C 4 24, 4 24, 4 24 C 4 24, 4 23, 4 23 C 5 23, 5 23, 6 22 C 7 21, 10 21, 11 22 C 12 23, 13 23, 13 23 C 14 23, 15 23, 15 22 C 17 21, 19 21, 21 22 C 21 23, 22 23, 23 23 C 23 23, 24 23, 25 22 C 25 22, 26 21, 27 21 Z M 1 21 C 1 21, 1 21, 1 21 C 3 28, 10 33, 17 33 C 24 33, 31 28, 33 21 C 33 21, 33 21, 33 21 C 33 21, 34 21, 34 21 C 32 29, 25 34, 17 34 C 9 34, 2 29, 0 21 C 0 21, 1 21, 1 21 Z M 17 17 C 18 17, 19 17, 20 18 C 21 19, 22 19, 24 18 C 24 17, 25 17, 26 17 C 27 17, 28 17, 29 18 C 29 18, 30 19, 31 19 C 31 19, 32 18, 33 18 C 33 18, 33 18, 33 18 C 34 18, 34 18, 33 19 C 33 19, 32 20, 31 20 C 30 20, 29 19, 28 19 C 28 18, 27 18, 26 18 C 25 18, 25 18, 24 19 C 23 20, 20 20, 19 19 C 18 18, 18 18, 17 18 C 16 18, 16 18, 15 19 C 14 20, 11 20, 10 19 C 9 18, 7 18, 6 19 C 4 20, 2 20, 1 19 C 0 18, 0 18, 1 18 C 1 18, 1 18, 1 18 C 2 18, 3 19, 3 19 C 4 19, 5 18, 5 18 C 7 16, 9 16, 10 18 C 12 19, 13 19, 14 18 C 15 17, 16 17, 17 17 Z M 19 10 L 19 13 L 26 13 L 26 10 L 19 10 Z M 19 6 L 19 9 L 26 9 L 26 6 L 19 6 Z M 28 5 C 29 5, 29 5, 29 5 C 32 8, 34 12, 34 16 C 34 16, 34 16, 34 16 C 34 16, 34 16, 33 16 C 33 16, 33 16, 33 16 C 33 12, 31 9, 28 6 C 28 6, 28 5, 28 5 Z M 19 3 L 19 5 L 26 5 L 26 3 L 19 3 Z M 16 0 C 16 0, 16 0, 16 1 C 16 1, 16 1, 16 1 C 8 2, 2 8, 1 16 C 1 16, 1 16, 1 16 C 0 16, 0 16, 0 16 C 0 16, 0 16, 0 16 C 1 8, 7 1, 16 0 Z M 19 0 C 19 0, 19 0, 19 1 L 19 2 L 26 2 L 26 1 C 26 0, 26 0, 26 0 C 26 0, 27 0, 27 1 L 27 15 C 27 15, 26 16, 26 16 C 26 16, 26 15, 26 15 L 26 14 L 19 14 L 19 15 C 19 15, 19 16, 19 16 C 18 16, 18 15, 18 15 L 18 1 C 18 0, 18 0, 19 0 Z"
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 716,
    "y": 490,
    "width": 34,
    "height": 34,
    "fillColor": "#ffffff",
    "pathD": "M 26 33 C 26 33, 27 33, 27 33 C 27 33, 27 33, 27 33 C 27 34, 27 34, 27 34 C 27 34, 27 34, 27 34 C 26 34, 26 34, 26 34 C 26 34, 26 34, 26 33 C 26 33, 26 33, 26 33 Z M 31 32 C 31 32, 31 32, 32 32 C 32 32, 32 32, 32 32 C 32 33, 32 33, 32 33 C 32 33, 31 33, 31 33 C 31 33, 31 33, 31 33 C 31 33, 31 33, 31 32 C 31 32, 31 32, 31 32 Z M 22 32 C 22 32, 22 32, 22 32 C 23 32, 23 32, 23 32 C 23 33, 23 33, 22 33 C 22 33, 22 33, 22 33 C 22 33, 22 33, 22 33 C 22 33, 22 33, 22 32 C 22 32, 22 32, 22 32 Z M 27 30 C 27 30, 27 31, 27 31 C 27 31, 27 31, 27 31 C 26 31, 26 31, 26 31 C 26 31, 26 30, 27 30 Z M 31 30 C 31 29, 32 30, 32 30 C 32 30, 31 30, 31 31 L 31 31 C 31 31, 31 30, 31 30 C 31 30, 31 30, 31 30 Z M 22 30 C 23 30, 23 30, 23 30 C 23 30, 23 31, 22 31 L 22 31 C 22 30, 22 30, 22 30 C 22 30, 22 29, 22 30 Z M 27 28 C 27 28, 27 28, 27 28 C 27 29, 27 29, 27 29 C 26 29, 26 29, 26 28 C 26 28, 26 28, 27 28 Z M 31 27 C 31 27, 31 28, 31 28 C 31 28, 31 28, 31 28 L 31 28 C 31 28, 30 28, 30 28 C 30 28, 31 27, 31 27 Z M 23 27 C 23 27, 23 28, 23 28 C 23 28, 23 28, 22 28 L 22 28 C 22 28, 22 28, 22 28 C 22 28, 22 27, 23 27 Z M 27 25 C 27 25, 27 26, 27 26 C 27 26, 27 26, 27 26 C 26 26, 26 26, 26 26 C 26 26, 26 25, 27 25 Z M 31 25 C 31 25, 31 25, 31 25 C 31 26, 31 26, 31 26 L 31 26 C 30 26, 30 26, 30 26 C 30 25, 30 25, 31 25 Z M 23 25 C 23 25, 23 25, 23 26 C 23 26, 23 26, 23 26 L 23 26 C 22 26, 22 26, 22 25 C 22 25, 22 25, 23 25 Z M 27 23 C 27 23, 27 23, 27 23 C 27 24, 27 24, 27 24 C 26 24, 26 24, 26 23 C 26 23, 26 23, 27 23 Z M 30 23 C 31 23, 31 23, 31 23 C 31 23, 31 24, 30 24 C 30 24, 30 24, 30 24 C 30 24, 30 23, 30 23 C 30 23, 30 23, 30 23 Z M 23 23 C 23 23, 23 23, 23 23 C 23 23, 23 24, 23 24 C 23 24, 23 24, 23 24 C 22 24, 22 23, 22 23 C 22 23, 23 23, 23 23 Z M 8 15 C 8 15, 7 16, 7 16 C 7 17, 8 17, 8 17 L 21 18 C 21 18, 21 17, 22 16 C 22 16, 22 16, 23 16 C 23 16, 23 17, 23 17 C 22 18, 21 19, 21 20 L 32 20 C 32 17, 30 15, 27 15 L 8 15 Z M 14 0 L 29 0 C 32 0, 33 2, 33 4 C 33 6, 32 8, 29 8 L 5 8 C 3 8, 1 10, 1 12 C 1 14, 3 16, 5 16 L 6 16 C 7 15, 7 14, 8 14 L 27 14 C 30 14, 33 17, 33 20 L 34 20 C 34 20, 34 20, 34 21 C 34 21, 34 21, 34 21 L 33 21 L 21 21 L 20 21 C 20 21, 19 21, 19 21 C 19 20, 20 20, 20 20 L 20 20 C 20 20, 20 20, 20 19 L 8 18 C 7 18, 7 17, 6 17 L 5 17 C 2 17, 0 14, 0 12 C 0 9, 2 7, 5 7 L 29 7 C 31 7, 32 5, 32 4 C 32 2, 31 1, 29 1 L 14 1 C 14 1, 13 1, 13 1 C 13 0, 14 0, 14 0 Z"
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 717,
    "y": 574,
    "width": 32,
    "height": 34,
    "fillColor": "#ffffff",
    "pathD": "M 29 23 C 30 23, 30 23, 30 24 C 30 24, 30 24, 29 24 C 29 24, 29 24, 29 24 C 29 23, 29 23, 29 23 Z M 4 9 C 5 9, 5 9, 5 9 C 5 10, 5 10, 5 10 L 2 12 C 1 12, 1 12, 1 13 C 1 13, 1 13, 1 13 L 12 32 C 12 33, 13 33, 13 33 L 22 28 C 23 27, 23 27, 23 28 C 23 28, 23 28, 23 28 L 14 34 C 14 34, 13 34, 13 34 C 13 34, 13 34, 12 34 C 12 34, 11 33, 11 33 L 0 14 C 0 13, 0 13, 0 12 C 0 12, 1 11, 1 11 L 4 9 Z M 22 8 C 21 8, 17 11, 17 14 C 17 15, 18 17, 20 17 C 21 17, 21 16, 22 15 C 22 15, 22 15, 22 15 C 22 15, 23 15, 23 15 C 23 16, 24 17, 25 17 C 26 17, 27 15, 27 14 C 27 11, 23 8, 22 8 Z M 22 7 C 22 6, 22 6, 22 7 C 23 7, 28 10, 28 14 C 28 16, 27 18, 25 18 C 24 18, 23 17, 23 17 L 23 19 L 23 19 C 23 19, 24 19, 24 19 C 24 20, 23 20, 23 20 L 21 20 C 21 20, 21 20, 21 19 C 21 19, 21 19, 21 19 L 22 19 L 22 17 C 21 17, 20 18, 20 18 C 18 18, 16 16, 16 14 C 16 10, 22 7, 22 7 Z M 11 4 C 11 4, 11 4, 11 4 C 11 4, 11 5, 11 5 L 7 6 C 7 6, 7 6, 7 6 C 7 6, 7 7, 7 7 L 12 28 C 12 29, 13 29, 14 29 L 19 27 C 19 27, 19 27, 19 28 C 20 28, 19 28, 19 28 L 14 30 C 14 30, 13 30, 13 30 C 12 30, 12 29, 11 28 L 6 7 C 6 7, 6 6, 6 6 C 6 5, 7 5, 7 5 L 11 4 Z M 15 2 C 16 2, 16 2, 16 3 C 16 3, 16 3, 15 3 C 15 3, 15 3, 15 3 C 15 2, 15 2, 15 2 Z M 15 1 C 14 1, 14 2, 14 2 L 14 24 C 14 25, 14 25, 15 25 L 30 25 C 31 25, 31 25, 31 24 L 31 2 C 31 2, 31 1, 30 1 L 15 1 Z M 15 0 L 30 0 C 31 0, 32 1, 32 2 L 32 24 C 32 25, 31 26, 30 26 L 15 26 C 14 26, 13 25, 13 24 L 13 2 C 13 1, 14 0, 15 0 Z"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 0,
    "x": 199,
    "y": 229,
    "width": 367,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 2,
    "x": 199,
    "y": 313,
    "width": 367,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 4,
    "x": 199,
    "y": 397,
    "width": 367,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 6,
    "x": 199,
    "y": 481,
    "width": 367,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 8,
    "x": 199,
    "y": 565,
    "width": 367,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 1,
    "x": 776,
    "y": 229,
    "width": 367,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 3,
    "x": 776,
    "y": 313,
    "width": 367,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 5,
    "x": 776,
    "y": 397,
    "width": 367,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 7,
    "x": 776,
    "y": 481,
    "width": 367,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 9,
    "x": 776,
    "y": 565,
    "width": 367,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 0,
    "x": 292,
    "y": 143,
    "width": 119,
    "height": 36,
    "text": "Option 01",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 1,
    "x": 869,
    "y": 143,
    "width": 119,
    "height": 36,
    "text": "Option 02",
    "textColor": "#ffffff",
    "textSize": 16
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

export function Imported2025migsopcubedcreativeandexampletemplates70Template({ data }: { data: BrainData }): ReactElement {
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
