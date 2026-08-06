import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 198,
    "y": 156,
    "width": 899,
    "height": 363,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 102 344 L 784 344 L 784 363 L 102 363 Z M 42 0 L 805 0 L 805 0 L 811 0 C 842 2, 870 20, 886 47 C 903 76, 903 112, 886 141 C 871 169, 842 186, 811 188 L 807 188 L 807 188 L 805 188 L 805 188 L 805 188 L 98 188 L 88 189 C 64 192, 42 206, 30 227 C 16 251, 16 280, 29 305 C 43 329, 69 344, 97 344 L 97 363 C 62 363, 30 344, 13 314 C -5 284, -4 247, 14 217 C 30 189, 60 171, 92 169 L 96 169 L 96 169 L 805 169 L 805 169 C 832 169, 856 155, 870 132 C 883 108, 883 80, 870 57 C 856 34, 831 19, 805 19 L 805 19 L 42 19 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 953,
    "y": 156,
    "width": 188,
    "height": 188,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 157,
    "y": 334,
    "width": 188,
    "height": 188,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 736,
    "y": 243,
    "width": 31,
    "height": 20,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 16 0 L 31 20 L 0 20 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 559,
    "y": 410,
    "width": 31,
    "height": 20,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 16 0 L 31 20 L 0 20 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 450,
    "y": 592,
    "width": 31,
    "height": 20,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 16 0 L 31 20 L 0 20 Z"
  },
  {
    "id": "grp-6",
    "isGroup": true,
    "children": [
      {
        "id": "sp-28",
        "x": 191,
        "y": 116,
        "width": 97,
        "height": 97,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#3365cc",
        "text": "",
        "pathD": "M 49 0 A 49 49 0 1 1 48 0 Z"
      },
      {
        "id": "sp-29",
        "x": 197,
        "y": 122,
        "width": 85,
        "height": 85,
        "localPctX": 0.061855670103092786,
        "localPctY": 0.061855670103092786,
        "localPctW": 0.8762886597938144,
        "localPctH": 0.8762886597938144,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 43 0 A 43 43 0 1 1 42 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 191,
    "y": 116,
    "width": 97,
    "height": 97
  },
  {
    "id": "grp-9",
    "isGroup": true,
    "children": [
      {
        "id": "sp-30",
        "x": 533,
        "y": 116,
        "width": 97,
        "height": 97,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 49 0 A 49 49 0 1 1 48 0 Z"
      },
      {
        "id": "sp-31",
        "x": 539.5,
        "y": 122,
        "width": 85,
        "height": 85,
        "localPctX": 0.06701030927835051,
        "localPctY": 0.061855670103092786,
        "localPctW": 0.8762886597938144,
        "localPctH": 0.8762886597938144,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 43 0 A 43 43 0 1 1 42 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 533,
    "y": 116,
    "width": 97,
    "height": 97
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 562,
    "y": 145,
    "width": 39,
    "height": 35,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 9 22 C 3 25, 2 31, 1 34 L 38 34 C 37 31, 36 25, 30 22 C 28 26, 24 28, 20 28 C 15 28, 12 26, 9 22 Z M 10 20 C 10 21, 10 21, 10 21 C 12 24, 16 26, 20 26 C 23 26, 27 24, 29 21 C 29 21, 29 20, 30 21 C 39 25, 39 34, 39 34 C 39 35, 39 35, 39 35 C 39 35, 39 35, 38 35 L 1 35 C 0 35, 0 35, 0 35 C 0 35, 0 35, 0 34 C 0 34, 0 25, 9 21 C 9 20, 10 20, 10 20 Z M 20 1 C 16 1, 13 4, 13 8 L 13 16 C 13 19, 16 22, 20 22 C 23 22, 26 19, 26 16 L 26 8 C 26 4, 23 1, 20 1 Z M 20 0 C 24 0, 28 4, 28 8 L 28 16 C 28 20, 24 24, 20 24 C 15 24, 11 20, 11 16 L 11 8 C 11 4, 15 0, 20 0 Z"
  },
  {
    "id": "grp-13",
    "isGroup": true,
    "children": [
      {
        "id": "sp-32",
        "x": 874,
        "y": 116,
        "width": 97,
        "height": 97,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#52c49c",
        "text": "",
        "pathD": "M 49 0 A 49 49 0 1 1 48 0 Z"
      },
      {
        "id": "sp-33",
        "x": 880.5,
        "y": 122,
        "width": 85,
        "height": 85,
        "localPctX": 0.06701030927835051,
        "localPctY": 0.061855670103092786,
        "localPctW": 0.8762886597938144,
        "localPctH": 0.8762886597938144,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 43 0 A 43 43 0 1 1 42 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 874,
    "y": 116,
    "width": 97,
    "height": 97
  },
  {
    "id": "grp-16",
    "isGroup": true,
    "children": [
      {
        "id": "sp-34",
        "x": 701,
        "y": 286,
        "width": 97,
        "height": 97,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#ffb900",
        "text": "",
        "pathD": "M 49 0 A 49 49 0 1 1 48 0 Z"
      },
      {
        "id": "sp-35",
        "x": 707,
        "y": 292.5,
        "width": 85,
        "height": 85,
        "localPctX": 0.061855670103092786,
        "localPctY": 0.06701030927835051,
        "localPctW": 0.8762886597938144,
        "localPctH": 0.8762886597938144,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 43 0 A 43 43 0 1 1 42 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 701,
    "y": 286,
    "width": 97,
    "height": 97
  },
  {
    "id": "grp-19",
    "isGroup": true,
    "children": [
      {
        "id": "sp-36",
        "x": 353,
        "y": 286,
        "width": 97,
        "height": 97,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#ee6d90",
        "text": "",
        "pathD": "M 49 0 A 49 49 0 1 1 48 0 Z"
      },
      {
        "id": "sp-37",
        "x": 358.5,
        "y": 292.5,
        "width": 85,
        "height": 85,
        "localPctX": 0.05670103092783505,
        "localPctY": 0.06701030927835051,
        "localPctW": 0.8762886597938144,
        "localPctH": 0.8762886597938144,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 43 0 A 43 43 0 1 1 42 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 353,
    "y": 286,
    "width": 97,
    "height": 97
  },
  {
    "id": "grp-22",
    "isGroup": true,
    "children": [
      {
        "id": "sp-38",
        "x": 246,
        "y": 460,
        "width": 97,
        "height": 97,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#ffb900",
        "text": "",
        "pathD": "M 49 0 A 49 49 0 1 1 48 0 Z"
      },
      {
        "id": "sp-39",
        "x": 253,
        "y": 466.5,
        "width": 85,
        "height": 85,
        "localPctX": 0.07216494845360824,
        "localPctY": 0.06701030927835051,
        "localPctW": 0.8762886597938144,
        "localPctH": 0.8762886597938144,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 43 0 A 43 43 0 1 1 42 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 246,
    "y": 460,
    "width": 97,
    "height": 97
  },
  {
    "id": "grp-25",
    "isGroup": true,
    "children": [
      {
        "id": "sp-40",
        "x": 587,
        "y": 460,
        "width": 97,
        "height": 97,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#52c49c",
        "text": "",
        "pathD": "M 49 0 A 49 49 0 1 1 48 0 Z"
      },
      {
        "id": "sp-41",
        "x": 593.5,
        "y": 466.5,
        "width": 85,
        "height": 85,
        "localPctX": 0.06701030927835051,
        "localPctY": 0.06701030927835051,
        "localPctW": 0.8762886597938144,
        "localPctH": 0.8762886597938144,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 43 0 A 43 43 0 1 1 42 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 587,
    "y": 460,
    "width": 97,
    "height": 97
  },
  {
    "id": "grp-28",
    "isGroup": true,
    "children": [
      {
        "id": "sp-42",
        "x": 928,
        "y": 460,
        "width": 97,
        "height": 97,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#3365cc",
        "text": "",
        "pathD": "M 49 0 A 49 49 0 1 1 48 0 Z"
      },
      {
        "id": "sp-43",
        "x": 934,
        "y": 466.5,
        "width": 85,
        "height": 85,
        "localPctX": 0.061855670103092786,
        "localPctY": 0.06701030927835051,
        "localPctW": 0.8762886597938144,
        "localPctH": 0.8762886597938144,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 43 0 A 43 43 0 1 1 42 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 928,
    "y": 460,
    "width": 97,
    "height": 97
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 735,
    "y": 322,
    "width": 32,
    "height": 29,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 25 17 C 24 17, 23 16, 23 14 C 23 13, 24 12, 25 12 C 27 12, 28 13, 28 14 C 28 16, 27 17, 25 17 M 31 14 L 29 14 C 29 12, 27 11, 25 11 C 24 11, 22 12, 22 14 L 1 14 C 0 14, 0 14, 0 14 C 0 15, 0 15, 1 15 L 22 15 C 22 17, 24 18, 25 18 C 27 18, 29 17, 29 15 L 31 15 C 32 15, 32 15, 32 14 C 32 14, 32 14, 31 14 M 8 1 C 9 1, 10 2, 10 4 C 10 5, 9 6, 8 6 C 7 6, 6 5, 6 4 C 6 2, 7 1, 8 1 M 1 4 L 4 4 C 5 6, 6 7, 8 7 C 10 7, 11 6, 12 4 L 31 4 C 32 4, 32 4, 32 4 C 32 3, 32 3, 31 3 L 12 3 C 11 1, 10 0, 8 0 C 6 0, 5 1, 4 3 L 1 3 C 0 3, 0 3, 0 4 C 0 4, 0 4, 1 4 M 14 28 C 13 28, 12 27, 12 25 C 12 24, 13 23, 14 23 C 15 23, 16 24, 16 25 C 16 27, 15 28, 14 28 M 31 25 L 17 25 C 17 23, 16 22, 14 22 C 12 22, 11 23, 10 25 L 1 25 C 0 25, 0 25, 0 25 C 0 26, 0 26, 1 26 L 10 26 C 11 28, 12 29, 14 29 C 16 29, 17 28, 17 26 L 31 26 C 32 26, 32 26, 32 25 C 32 25, 32 25, 31 25"
  },
  {
    "id": "sp-8",
    "x": 389,
    "y": 315,
    "width": 24,
    "height": 38,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 23 14 L 13 14 L 13 13 L 13 13 C 14 12, 15 11, 15 10 L 15 5 L 15 5 C 15 4, 14 3, 13 3 L 13 1 L 13 1 C 18 2, 23 6, 23 12 L 23 14 Z M 12 37 L 12 37 C 6 37, 1 32, 1 26 L 1 15 L 23 15 L 23 26 L 23 26 C 23 32, 18 37, 12 37 Z M 11 1 L 11 3 L 11 3 C 10 3, 9 4, 9 5 L 9 10 L 9 10 C 9 11, 10 12, 11 13 L 11 14 L 1 14 L 1 12 L 1 12 C 1 6, 6 2, 11 1 Z M 12 11 L 12 11 C 11 11, 10 11, 10 10 L 10 5 L 10 5 C 10 4, 11 4, 12 4 L 12 4 C 13 4, 14 4, 14 5 L 14 10 L 14 10 C 14 11, 13 11, 12 11 Z M 12 0 L 12 0 C 5 0, 0 5, 0 12 L 0 26 L 0 26 C 0 33, 5 38, 12 38 L 12 38 C 19 38, 24 33, 24 26 L 24 12 L 24 12 C 24 5, 19 0, 12 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 277,
    "y": 493,
    "width": 36,
    "height": 34,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 30 19 L 30 22 C 30 23, 30 24, 30 25 C 30 25, 30 25, 30 25 C 30 26, 29 27, 29 28 C 29 28, 29 28, 29 28 C 29 28, 29 28, 29 28 L 29 28 C 32 28, 34 26, 34 23 C 34 21, 33 19, 30 19 Z M 2 14 L 2 22 C 2 26, 4 30, 7 32 L 23 32 C 25 31, 26 30, 27 28 C 28 27, 28 25, 28 24 C 29 23, 29 22, 29 22 L 29 18 L 29 14 Z M 1 13 L 29 13 C 30 13, 30 13, 30 13 L 30 17 C 33 17, 36 20, 36 23 C 36 27, 33 30, 29 30 L 29 30 C 29 30, 28 30, 28 30 C 27 31, 26 33, 24 34 C 24 34, 24 34, 24 34 L 7 34 C 7 34, 6 34, 6 34 C 2 31, 0 27, 0 22 L 0 13 C 0 13, 0 13, 1 13 Z M 22 2 C 22 2, 23 2, 23 3 L 23 10 C 23 10, 22 10, 22 10 C 21 10, 21 10, 21 10 L 21 3 C 21 2, 21 2, 22 2 Z M 8 2 C 8 2, 9 2, 9 3 L 9 10 C 9 10, 8 10, 8 10 C 7 10, 7 10, 7 10 L 7 3 C 7 2, 7 2, 8 2 Z M 15 0 C 15 0, 16 0, 16 1 L 16 10 C 16 10, 15 10, 15 10 C 15 10, 14 10, 14 10 L 14 1 C 14 0, 15 0, 15 0 Z"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 1,
    "x": 934,
    "y": 493,
    "width": 86,
    "height": 34,
    "text": "FINISH"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 0,
    "x": 197,
    "y": 148,
    "width": 85,
    "height": 34,
    "text": "START"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 616,
    "y": 489,
    "width": 39,
    "height": 35,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 9 22 C 3 25, 2 31, 1 34 L 38 34 C 37 31, 36 25, 30 22 C 28 26, 24 28, 20 28 C 15 28, 12 26, 9 22 Z M 10 20 C 10 21, 10 21, 10 21 C 12 24, 16 26, 20 26 C 23 26, 27 24, 29 21 C 29 21, 29 20, 30 21 C 39 25, 39 34, 39 34 C 39 35, 39 35, 39 35 C 39 35, 39 35, 38 35 L 1 35 C 0 35, 0 35, 0 35 C 0 35, 0 35, 0 34 C 0 34, 0 25, 9 21 C 9 20, 10 20, 10 20 Z M 20 1 C 16 1, 13 4, 13 8 L 13 16 C 13 19, 16 22, 20 22 C 23 22, 26 19, 26 16 L 26 8 C 26 4, 23 1, 20 1 Z M 20 0 C 24 0, 28 4, 28 8 L 28 16 C 28 20, 24 24, 20 24 C 15 24, 11 20, 11 16 L 11 8 C 11 4, 15 0, 20 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 907,
    "y": 146,
    "width": 36,
    "height": 34,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 30 19 L 30 22 C 30 23, 30 24, 30 25 C 30 25, 30 25, 30 25 C 30 26, 29 27, 29 28 C 29 28, 29 28, 29 28 C 29 28, 29 28, 29 28 L 29 28 C 32 28, 34 26, 34 23 C 34 21, 33 19, 30 19 Z M 2 14 L 2 22 C 2 26, 4 30, 7 32 L 23 32 C 25 31, 26 30, 27 28 C 28 27, 28 25, 28 24 C 29 23, 29 22, 29 22 L 29 18 L 29 14 Z M 1 13 L 29 13 C 30 13, 30 13, 30 13 L 30 17 C 33 17, 36 20, 36 23 C 36 27, 33 30, 29 30 L 29 30 C 29 30, 28 30, 28 30 C 27 31, 26 33, 24 34 C 24 34, 24 34, 24 34 L 7 34 C 7 34, 6 34, 6 34 C 2 31, 0 27, 0 22 L 0 13 C 0 13, 0 13, 1 13 Z M 22 2 C 22 2, 23 2, 23 3 L 23 10 C 23 10, 22 10, 22 10 C 21 10, 21 10, 21 10 L 21 3 C 21 2, 21 2, 22 2 Z M 8 2 C 8 2, 9 2, 9 3 L 9 10 C 9 10, 8 10, 8 10 C 7 10, 7 10, 7 10 L 7 3 C 7 2, 7 2, 8 2 Z M 15 0 C 15 0, 16 0, 16 1 L 16 10 C 16 10, 15 10, 15 10 C 15 10, 14 10, 14 10 L 14 1 C 14 0, 15 0, 15 0 Z"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 0,
    "x": 529,
    "y": 219,
    "width": 106,
    "height": 34,
    "text": "Your title"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 0,
    "x": 455,
    "y": 247,
    "width": 254,
    "height": 57,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 869,
    "y": 219,
    "width": 106,
    "height": 34,
    "text": "Your title"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 1,
    "x": 796,
    "y": 247,
    "width": 254,
    "height": 57,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 696,
    "y": 385,
    "width": 106,
    "height": 34,
    "text": "Your title"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 3,
    "x": 622,
    "y": 413,
    "width": 254,
    "height": 57,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 2,
    "x": 348,
    "y": 385,
    "width": 106,
    "height": 34,
    "text": "Your title"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 4,
    "x": 241,
    "y": 563,
    "width": 106,
    "height": 34,
    "text": "Your title"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 2,
    "x": 274,
    "y": 413,
    "width": 254,
    "height": 57,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 4,
    "x": 167,
    "y": 591,
    "width": 254,
    "height": 57,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 5,
    "x": 583,
    "y": 563,
    "width": 106,
    "height": 34,
    "text": "Your title"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 5,
    "x": 509,
    "y": 591,
    "width": 254,
    "height": 57,
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

export function Migso150Template({ data }: { data: BrainData }): ReactElement {
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
