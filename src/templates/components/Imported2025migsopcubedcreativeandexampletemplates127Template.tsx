import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 78,
    "y": 254,
    "width": 260,
    "height": 260,
    "fillColor": "#ffffff",
    "pathD": "M 130 0 A 130 130 0 1 1 130 0 Z"
  },
  {
    "id": "sp-1",
    "x": 21,
    "y": 198,
    "width": 374,
    "height": 374,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 203,
    "y": 192,
    "width": 17,
    "height": 17,
    "fillColor": "#ffffff",
    "pathD": "M 9 0 A 9 9 0 1 1 8 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 203,
    "y": 559,
    "width": 17,
    "height": 17,
    "fillColor": "#ffffff",
    "pathD": "M 9 0 A 9 9 0 1 1 8 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 382,
    "y": 375,
    "width": 17,
    "height": 17,
    "fillColor": "#ffffff",
    "pathD": "M 9 0 A 9 9 0 1 1 8 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 294,
    "y": 218,
    "width": 17,
    "height": 17,
    "fillColor": "#ffffff",
    "pathD": "M 9 0 A 9 9 0 1 1 8 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 294,
    "y": 532,
    "width": 17,
    "height": 17,
    "fillColor": "#ffffff",
    "pathD": "M 9 0 A 9 9 0 1 1 8 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 359,
    "y": 466,
    "width": 17,
    "height": 17,
    "fillColor": "#ffffff",
    "pathD": "M 9 0 A 9 9 0 1 1 8 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 359,
    "y": 283,
    "width": 17,
    "height": 17,
    "fillColor": "#ffffff",
    "pathD": "M 9 0 A 9 9 0 1 1 8 0 Z"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 1,
    "x": 167,
    "y": 317,
    "width": 82,
    "height": 36,
    "text": "Waste",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-10",
    "x": 105,
    "y": 354,
    "width": 206,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 451,
    "y": 118,
    "width": 83,
    "height": 83,
    "pathD": "M 42 0 A 42 42 0 1 1 41 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 451,
    "y": 567,
    "width": 83,
    "height": 83,
    "pathD": "M 42 0 A 42 42 0 1 1 41 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 637,
    "y": 344,
    "width": 83,
    "height": 83,
    "fillColor": "#ffb900",
    "pathD": "M 42 0 A 42 42 0 1 1 41 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 595,
    "y": 254,
    "width": 83,
    "height": 83,
    "fillColor": "#52c49c",
    "pathD": "M 42 0 A 42 42 0 1 1 41 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 595,
    "y": 431,
    "width": 83,
    "height": 83,
    "fillColor": "#52c49c",
    "pathD": "M 42 0 A 42 42 0 1 1 41 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 528,
    "y": 508,
    "width": 83,
    "height": 83,
    "fillColor": "#ff4d38",
    "pathD": "M 42 0 A 42 42 0 1 1 41 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 527,
    "y": 177,
    "width": 83,
    "height": 83,
    "fillColor": "#ff4d38",
    "pathD": "M 42 0 A 42 42 0 1 1 41 0 Z"
  },
  {
    "id": "sp-41",
    "x": 400,
    "y": 384,
    "width": 237,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 375,
    "y": 472,
    "width": 221,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 374,
    "y": 297,
    "width": 221,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 311,
    "y": 226,
    "width": 216,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-45",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 235,
    "y": 158,
    "width": 216,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-46",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 211,
    "y": 157,
    "width": 25,
    "height": 35,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-47",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 310,
    "y": 542,
    "width": 216,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-48",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 235,
    "y": 608,
    "width": 216,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-49",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 211,
    "y": 576,
    "width": 24,
    "height": 33,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 0,
    "x": 338,
    "y": 125,
    "width": 106,
    "height": 32,
    "text": "Transport",
    "textColor": "#3365cc",
    "textSize": 14
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 1,
    "x": 348,
    "y": 575,
    "width": 93,
    "height": 32,
    "text": "Deffects",
    "textColor": "#3365cc",
    "textSize": 14
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 403,
    "y": 195,
    "width": 104,
    "height": 32,
    "text": "Inventory",
    "textColor": "#3365cc",
    "textSize": 14
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 402,
    "y": 485,
    "width": 121,
    "height": 55,
    "text": "Over Processing",
    "textColor": "#3365cc",
    "textSize": 14
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 0,
    "x": 467,
    "y": 416,
    "width": 119,
    "height": 55,
    "text": "Over Production",
    "textColor": "#3365cc",
    "textSize": 14
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 0,
    "x": 535,
    "y": 351,
    "width": 87,
    "height": 32,
    "text": "Waiting",
    "textColor": "#3365cc",
    "textSize": 14
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 501,
    "y": 263,
    "width": 81,
    "height": 32,
    "text": "Motion",
    "textColor": "#3365cc",
    "textSize": 14
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 469,
    "y": 145,
    "width": 46,
    "height": 28,
    "fillColor": "#ffffff",
    "pathD": "M 34 22 C 34 22, 33 22, 33 22 C 33 23, 32 23, 32 23 C 32 24, 33 24, 33 25 C 33 25, 34 25, 34 25 C 35 25, 35 25, 35 25 C 36 24, 36 24, 36 23 C 36 23, 36 23, 35 22 C 35 22, 35 22, 34 22 Z M 10 22 C 10 22, 9 22, 9 22 C 9 23, 8 23, 8 23 C 8 24, 9 24, 9 25 C 9 25, 10 25, 10 25 C 11 25, 11 25, 11 25 C 12 24, 12 24, 12 23 C 12 23, 12 23, 11 22 C 11 22, 11 22, 10 22 Z M 34 19 C 35 19, 36 19, 37 20 C 38 21, 39 22, 39 23 C 39 25, 38 26, 37 27 C 36 27, 35 28, 34 28 C 33 28, 32 27, 31 27 C 30 26, 30 25, 30 23 C 30 22, 30 21, 31 20 C 32 19, 33 19, 34 19 Z M 10 19 C 11 19, 12 19, 13 20 C 14 21, 15 22, 15 23 C 15 25, 14 26, 13 27 C 12 27, 11 28, 10 28 C 9 28, 8 27, 7 27 C 6 26, 6 25, 6 23 C 6 22, 6 21, 7 20 C 8 19, 9 19, 10 19 Z M 12 10 C 12 10, 11 10, 11 10 C 9 10, 8 11, 6 12 C 6 13, 5 14, 5 14 L 11 14 L 17 14 L 17 10 Z M 18 0 L 45 0 C 45 0, 45 0, 45 1 L 45 23 L 46 23 L 46 24 L 45 24 L 39 24 L 39 24 L 39 22 C 39 21, 38 20, 38 20 C 37 18, 35 18, 34 18 C 33 18, 31 18, 30 20 C 29 21, 29 22, 29 23 C 29 24, 29 24, 29 24 L 18 24 C 18 24, 18 24, 18 24 L 18 24 L 16 24 C 16 24, 16 24, 16 23 C 16 23, 16 23, 16 22 C 16 22, 16 22, 16 22 L 16 22 L 16 22 L 16 22 L 16 22 L 16 22 L 16 22 L 16 22 L 16 22 L 16 22 L 16 22 L 16 22 L 16 22 C 16 22, 16 22, 16 22 L 16 22 L 16 22 L 16 22 L 15 22 L 15 22 C 15 22, 15 22, 15 22 L 15 22 L 15 22 L 15 22 L 15 22 L 15 22 L 15 22 L 15 21 L 15 21 L 15 21 L 15 21 L 15 21 L 15 21 L 15 21 L 15 21 C 15 21, 15 21, 15 21 L 15 21 L 15 21 L 15 21 L 15 21 L 15 21 C 15 21, 15 21, 15 21 L 15 21 L 15 21 L 15 21 L 15 21 L 15 21 C 15 21, 15 21, 15 21 L 15 21 L 15 21 L 15 21 L 15 21 L 15 21 L 15 21 L 15 21 C 15 21, 15 21, 15 21 L 15 21 L 15 21 L 15 21 L 15 21 C 15 21, 15 20, 15 20 L 15 20 C 15 20, 15 20, 15 20 L 15 20 L 15 20 L 15 20 L 15 20 L 15 20 C 15 20, 15 20, 15 20 L 15 20 L 15 20 L 15 20 L 15 20 L 15 20 L 15 20 L 15 20 L 15 20 C 15 20, 15 20, 15 20 L 15 20 L 15 20 L 15 20 L 14 20 C 14 20, 14 20, 14 20 C 14 20, 14 20, 14 20 L 14 20 L 14 20 L 14 20 L 14 20 C 14 20, 14 20, 14 20 L 14 20 L 14 20 L 14 20 L 14 20 L 14 20 C 14 20, 14 20, 14 20 C 13 19, 12 18, 11 18 C 11 18, 10 18, 10 18 C 9 18, 7 18, 6 20 C 6 20, 6 20, 6 20 L 6 20 L 6 20 L 6 20 L 6 20 L 6 20 C 6 20, 6 20, 6 20 L 6 20 L 6 20 L 6 20 L 6 20 C 6 20, 6 20, 6 20 C 6 20, 6 20, 6 20 L 6 20 L 6 20 L 6 20 L 6 20 C 6 20, 6 20, 6 20 L 6 20 C 6 20, 6 20, 6 20 L 6 20 L 6 20 L 6 20 L 6 20 L 6 20 L 6 20 C 6 20, 6 20, 6 20 L 6 20 L 6 20 L 6 20 L 6 20 L 6 20 C 6 20, 6 20, 6 20 L 6 20 C 6 20, 6 21, 6 21 L 6 21 L 6 21 L 6 21 L 6 21 C 6 21, 6 21, 5 21 L 5 21 L 5 21 L 5 21 L 5 21 L 5 21 L 5 21 C 5 21, 5 21, 5 21 L 5 21 L 5 21 L 5 21 L 5 21 L 5 21 C 5 21, 5 21, 5 21 L 5 21 C 5 21, 5 21, 5 21 L 5 21 L 5 21 L 5 21 C 5 21, 5 21, 5 21 C 5 21, 5 21, 5 21 L 5 21 L 5 21 L 5 21 L 5 21 L 5 21 C 5 22, 5 22, 5 22 C 5 22, 5 22, 5 22 L 5 22 L 5 22 L 5 22 L 5 22 L 5 22 C 5 22, 5 22, 5 22 L 5 22 L 5 22 L 5 22 L 5 22 C 5 22, 5 22, 5 22 L 5 22 L 5 22 L 5 22 L 5 22 L 5 22 L 5 22 C 5 22, 5 22, 5 22 L 5 22 L 5 22 L 5 22 L 5 22 C 5 22, 5 22, 5 22 L 5 23 L 5 23 C 5 23, 5 23, 5 23 C 5 24, 5 24, 5 24 L 1 24 C 0 24, 0 24, 0 23 C 0 23, 0 23, 1 23 L 1 23 L 1 22 L 2 17 C 2 15, 3 14, 4 12 C 4 12, 5 11, 5 11 C 7 9, 9 8, 11 8 C 11 8, 11 8, 12 8 C 12 8, 12 8, 12 8 L 17 8 L 17 7 L 13 7 L 13 2 L 17 2 L 17 1 C 17 0, 17 0, 18 0 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 547,
    "y": 196,
    "width": 46,
    "height": 45,
    "fillColor": "#ffffff",
    "pathD": "M 23 28 L 31 31 L 38 28 L 38 39 C 38 40, 38 40, 38 40 L 23 45 C 23 45, 23 45, 23 45 Z M 23 28 L 23 45 C 23 45, 23 45, 23 45 L 8 40 C 8 40, 8 40, 8 39 L 8 28 L 15 31 Z M 15 14 L 23 17 L 31 14 L 46 19 L 38 22 L 46 25 L 31 30 L 23 27 L 37 22 L 23 17 L 9 22 L 23 27 L 15 30 L 0 25 L 8 22 L 0 19 Z M 23 0 L 28 5 L 26 5 L 26 14 L 20 14 L 20 5 L 18 5 Z"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 614,
    "y": 275,
    "width": 46,
    "height": 41,
    "fillColor": "#ffffff",
    "pathD": "M 40 22 C 40 22, 40 23, 40 23 C 40 23, 40 24, 40 24 C 40 24, 39 23, 39 23 C 39 23, 40 22, 40 22 Z M 31 22 C 31 22, 32 23, 32 23 C 32 23, 31 24, 31 24 C 31 24, 31 23, 31 23 C 31 23, 31 22, 31 22 Z M 19 22 C 19 22, 20 23, 20 23 C 20 23, 19 24, 19 24 C 19 24, 18 23, 18 23 C 18 23, 19 22, 19 22 Z M 40 22 C 39 22, 39 22, 39 22 C 39 22, 39 23, 39 23 C 39 23, 39 24, 39 24 C 39 24, 39 24, 40 24 C 40 24, 40 24, 41 24 C 41 24, 41 23, 41 23 C 41 23, 41 22, 41 22 C 40 22, 40 22, 40 22 Z M 31 22 C 31 22, 30 22, 30 22 C 30 22, 30 23, 30 23 C 30 23, 30 24, 30 24 C 30 24, 31 24, 31 24 C 31 24, 32 24, 32 24 C 32 24, 32 23, 32 23 C 32 23, 32 22, 32 22 C 32 22, 31 22, 31 22 Z M 19 22 C 19 22, 18 22, 18 22 C 18 22, 18 23, 18 23 C 18 23, 18 24, 18 24 C 18 24, 19 24, 19 24 C 19 24, 20 24, 20 24 C 20 24, 20 23, 20 23 C 20 23, 20 22, 20 22 C 20 22, 19 22, 19 22 Z M 40 20 C 41 20, 42 20, 42 21 C 43 21, 43 22, 43 23 C 43 24, 43 25, 42 25 C 42 26, 41 26, 40 26 C 39 26, 38 26, 37 25 C 37 25, 37 24, 37 23 C 37 22, 37 21, 37 21 C 38 20, 39 20, 40 20 Z M 31 20 C 32 20, 33 20, 33 21 C 34 21, 34 22, 34 23 C 34 24, 34 25, 33 25 C 33 26, 32 26, 31 26 C 30 26, 29 26, 29 25 C 28 25, 28 24, 28 23 C 28 22, 28 21, 29 21 C 29 20, 30 20, 31 20 Z M 19 20 C 20 20, 21 20, 21 21 C 22 21, 22 22, 22 23 C 22 24, 22 25, 21 25 C 21 26, 20 26, 19 26 C 18 26, 17 26, 17 25 C 16 25, 16 24, 16 23 C 16 22, 16 21, 17 21 C 17 20, 18 20, 19 20 Z M 3 17 L 9 18 L 6 20 L 6 21 C 7 23, 9 25, 10 26 C 11 27, 13 27, 14 27 L 15 27 L 20 27 L 20 27 L 20 27 L 46 27 C 46 27, 46 27, 46 27 L 46 29 C 46 29, 46 29, 46 29 L 20 29 L 18 30 C 17 30, 17 30, 16 31 C 15 32, 13 33, 12 36 L 11 38 L 14 40 L 8 41 L 7 35 L 10 37 L 11 35 C 12 32, 13 31, 15 29 L 15 29 L 5 29 L 4 33 L 0 28 L 5 24 L 5 27 L 9 27 L 9 27 C 7 26, 6 24, 5 22 L 4 21 L 1 23 Z M 39 15 L 39 15 L 40 15 L 42 15 L 43 15 L 43 15 L 42 15 L 40 15 Z M 29 15 L 29 15 L 30 15 L 32 15 L 33 15 L 33 15 L 32 15 L 30 15 Z M 21 13 C 19 13, 18 14, 17 15 C 16 15, 16 16, 15 16 L 21 16 L 24 16 L 24 13 L 21 13 C 21 13, 21 13, 21 13 C 21 13, 21 13, 21 13 C 21 13, 21 13, 21 13 Z M 21 12 C 21 12, 21 12, 21 12 C 21 12, 21 12, 21 12 L 25 12 C 25 12, 25 12, 25 12 L 25 18 L 44 18 C 45 18, 45 18, 45 19 L 45 22 L 45 22 L 45 24 L 44 24 L 44 24 C 44 23, 44 23, 44 23 C 44 22, 43 21, 43 20 C 42 19, 41 19, 40 19 C 39 19, 38 19, 37 20 C 36 21, 36 22, 36 23 C 36 23, 36 23, 36 24 L 35 24 C 35 23, 35 23, 35 23 C 35 22, 35 21, 34 20 C 33 19, 32 19, 31 19 C 30 19, 29 19, 28 20 C 28 21, 27 21, 27 22 C 27 22, 27 23, 27 23 C 27 23, 27 23, 27 24 L 25 24 C 25 24, 25 24, 25 24 L 25 24 L 25 24 L 23 24 C 23 23, 23 23, 23 23 C 23 22, 23 21, 22 20 C 21 20, 21 19, 21 19 C 20 19, 20 19, 19 19 C 18 19, 17 19, 16 20 C 15 21, 15 22, 15 23 C 15 23, 15 23, 15 24 L 13 24 L 13 24 C 12 24, 12 23, 12 23 C 12 23, 12 22, 13 22 L 13 22 L 13 18 C 13 17, 14 15, 16 14 C 17 12, 19 12, 21 12 Z M 42 11 C 42 11, 42 11, 42 11 L 41 12 C 41 12, 41 13, 41 13 C 42 13, 42 13, 42 13 L 42 13 L 42 14 L 42 14 L 43 14 L 43 13 L 43 13 C 43 13, 43 13, 43 13 C 44 13, 44 12, 43 12 L 43 11 C 43 11, 43 11, 42 11 Z M 40 11 C 40 11, 40 11, 40 11 L 39 12 C 39 12, 39 13, 39 13 C 39 13, 39 13, 39 13 L 39 13 L 39 14 L 40 14 L 40 14 L 40 13 L 40 13 C 41 13, 41 13, 41 13 C 41 13, 41 12, 41 12 L 40 11 C 40 11, 40 11, 40 11 Z M 32 11 C 32 11, 32 11, 32 11 L 31 12 C 31 12, 31 13, 31 13 C 31 13, 31 13, 32 13 L 32 13 L 32 14 L 32 14 L 33 14 L 33 13 L 33 13 C 33 13, 33 13, 33 13 C 33 13, 33 12, 33 12 L 32 11 C 32 11, 32 11, 32 11 Z M 30 11 C 30 11, 29 11, 29 11 L 29 12 C 28 12, 28 13, 29 13 C 29 13, 29 13, 29 13 L 29 13 L 29 14 L 30 14 L 30 14 L 30 13 L 30 13 C 30 13, 31 13, 31 13 C 31 13, 31 12, 31 12 L 30 11 C 30 11, 30 11, 30 11 Z M 36 9 L 37 9 L 40 9 L 42 9 L 45 9 L 46 9 L 46 10 L 46 17 L 46 17 L 45 17 L 42 17 L 40 17 L 37 17 L 36 17 L 36 17 L 36 10 Z M 26 9 L 27 9 L 30 9 L 32 9 L 35 9 L 36 9 L 36 10 L 36 17 L 36 17 L 35 17 L 32 17 L 30 17 L 27 17 L 26 17 L 26 17 L 26 10 Z M 39 5 L 39 6 L 40 6 L 42 6 L 43 6 L 43 5 L 42 5 L 40 5 Z M 29 5 L 29 6 L 30 6 L 32 6 L 33 6 L 33 5 L 32 5 L 30 5 Z M 42 2 C 42 2, 42 2, 42 2 L 41 3 C 41 3, 41 4, 41 4 C 42 4, 42 4, 42 4 L 42 3 L 42 5 L 42 5 L 43 5 L 43 3 L 43 4 C 43 4, 43 4, 43 4 C 44 4, 44 3, 43 3 L 43 2 L 43 2 C 43 2, 43 2, 42 2 Z M 40 2 C 40 2, 40 2, 40 2 L 39 3 C 39 3, 39 4, 39 4 C 39 4, 39 4, 39 4 L 39 3 L 39 5 L 40 5 L 40 5 L 40 3 L 40 4 C 41 4, 41 4, 41 4 C 41 4, 41 3, 41 3 L 40 2 L 40 2 C 40 2, 40 2, 40 2 Z M 32 2 C 32 2, 32 2, 32 2 L 31 3 C 31 3, 31 4, 31 4 C 31 4, 31 4, 32 4 L 32 3 L 32 5 L 32 5 L 33 5 L 33 3 L 33 4 C 33 4, 33 4, 33 4 C 33 4, 33 3, 33 3 L 32 2 L 32 2 C 32 2, 32 2, 32 2 Z M 30 2 C 30 2, 29 2, 29 2 L 29 3 C 28 3, 28 4, 29 4 C 29 4, 29 4, 29 4 L 29 3 L 29 5 L 30 5 L 30 5 L 30 3 L 30 4 C 30 4, 31 4, 31 4 C 31 4, 31 3, 31 3 L 30 2 L 30 2 C 30 2, 30 2, 30 2 Z M 36 0 L 37 0 L 40 0 L 42 0 L 45 0 L 46 0 L 46 1 L 46 8 L 46 8 L 45 8 L 42 8 L 40 8 L 37 8 L 36 8 L 36 8 L 36 1 Z M 26 0 L 27 0 L 30 0 L 32 0 L 35 0 L 36 0 L 36 1 L 36 8 L 36 8 L 35 8 L 32 8 L 30 8 L 27 8 L 26 8 L 26 8 L 26 1 Z"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 656,
    "y": 365,
    "width": 46,
    "height": 41,
    "fillColor": "#ffffff",
    "pathD": "M 34 35 C 34 35, 33 35, 33 35 C 32 36, 32 36, 32 37 C 32 37, 32 37, 33 38 C 33 38, 34 38, 34 38 C 34 38, 35 38, 35 38 C 35 37, 36 37, 36 37 C 36 36, 35 36, 35 35 C 35 35, 34 35, 34 35 Z M 10 35 C 10 35, 9 35, 9 35 C 9 36, 8 36, 8 37 C 8 37, 9 37, 9 38 C 9 38, 10 38, 10 38 C 11 38, 11 38, 11 38 C 12 37, 12 37, 12 37 C 12 36, 12 36, 11 35 C 11 35, 11 35, 10 35 Z M 34 32 C 35 32, 36 33, 37 33 C 38 34, 39 35, 39 37 C 39 38, 38 39, 37 40 C 36 40, 35 41, 34 41 C 33 41, 32 40, 31 40 C 30 39, 29 38, 29 37 C 29 35, 30 34, 31 33 C 32 33, 33 32, 34 32 Z M 10 32 C 11 32, 13 33, 13 33 C 14 34, 15 35, 15 37 C 15 38, 14 39, 13 40 C 13 40, 11 41, 10 41 C 9 41, 8 40, 7 40 C 6 39, 6 38, 6 37 C 6 35, 6 34, 7 33 C 8 33, 9 32, 10 32 Z M 12 23 C 12 23, 11 23, 11 24 C 9 24, 8 25, 6 26 C 6 26, 5 27, 5 28 L 11 28 L 17 28 L 17 23 Z M 18 14 L 20 14 L 20 14 C 20 17, 21 19, 23 21 C 25 24, 28 25, 31 25 C 34 25, 37 24, 39 21 C 41 19, 42 17, 42 14 L 42 14 L 44 14 C 45 14, 45 14, 45 15 L 45 36 L 46 36 L 46 38 L 45 38 L 44 38 L 44 38 L 39 38 C 40 36, 39 34, 38 33 C 37 32, 35 31, 34 31 C 33 31, 31 32, 30 33 C 29 34, 28 35, 28 37 C 28 37, 29 37, 29 38 L 18 38 L 18 38 L 18 38 L 16 38 C 16 37, 16 37, 16 37 C 16 36, 16 36, 16 36 C 16 36, 16 36, 16 36 L 16 36 L 16 36 L 16 36 L 16 36 L 16 35 L 16 35 L 16 35 L 16 35 L 16 35 L 16 35 L 16 35 L 16 35 C 15 35, 15 35, 15 35 L 15 35 L 15 35 L 15 35 L 15 35 C 15 35, 15 35, 15 35 L 15 35 L 15 35 L 15 35 L 15 35 L 15 35 L 15 35 L 15 35 L 15 35 L 15 35 L 15 35 L 15 35 L 15 35 L 15 35 L 15 35 L 15 34 L 15 34 L 15 34 L 15 34 L 15 34 L 15 34 C 15 34, 15 34, 15 34 L 15 34 L 15 34 L 15 34 L 15 34 C 15 34, 15 34, 15 34 L 15 34 L 15 34 L 15 34 L 15 34 L 15 34 L 15 34 L 15 34 C 15 34, 15 34, 15 34 L 15 34 L 15 34 L 15 34 L 15 34 L 15 34 C 15 34, 15 34, 15 34 L 15 34 C 15 34, 15 34, 15 34 L 15 34 L 15 34 L 15 34 L 15 34 C 15 34, 15 34, 15 34 L 15 33 L 15 33 L 15 33 L 15 33 L 15 33 L 15 33 L 15 33 C 15 33, 15 33, 15 33 L 15 33 L 15 33 L 14 33 L 14 33 C 14 33, 14 33, 14 33 C 14 33, 14 33, 14 33 L 14 33 L 14 33 L 14 33 L 14 33 C 14 33, 14 33, 14 33 L 14 33 L 14 33 L 14 33 L 14 33 L 14 33 C 14 33, 14 33, 14 33 C 13 32, 12 31, 11 31 C 11 31, 10 31, 10 31 C 9 31, 7 32, 6 33 C 6 33, 6 33, 6 33 L 6 33 L 6 33 L 6 33 L 6 33 L 6 33 C 6 33, 6 33, 6 33 L 6 33 L 6 33 L 6 33 L 6 33 C 6 33, 6 33, 6 33 C 6 33, 6 33, 6 33 L 6 33 L 6 33 L 6 33 L 6 33 L 6 33 C 6 33, 6 33, 6 33 L 6 33 C 6 33, 6 33, 6 33 L 6 33 L 6 33 L 6 33 L 6 33 L 6 34 L 6 34 C 6 34, 6 34, 6 34 L 6 34 L 6 34 L 6 34 L 6 34 C 6 34, 6 34, 6 34 C 6 34, 6 34, 6 34 L 6 34 L 6 34 L 6 34 L 6 34 L 6 34 C 6 34, 5 34, 5 34 L 5 34 L 5 34 L 5 34 L 5 34 L 5 34 L 5 34 C 5 34, 5 34, 5 34 L 5 34 L 5 34 L 5 34 L 5 34 C 5 34, 5 34, 5 34 L 5 34 C 5 34, 5 34, 5 34 L 5 34 L 5 34 L 5 34 C 5 35, 5 35, 5 35 C 5 35, 5 35, 5 35 L 5 35 L 5 35 L 5 35 L 5 35 L 5 35 C 5 35, 5 35, 5 35 L 5 35 C 5 35, 5 35, 5 35 L 5 35 L 5 35 L 5 35 L 5 35 C 5 35, 5 35, 5 35 L 5 35 L 5 35 L 5 35 L 5 35 C 5 35, 5 35, 5 35 L 5 35 L 5 35 L 5 35 L 5 35 L 5 35 L 5 35 L 5 35 L 5 36 L 5 36 L 5 36 L 5 36 L 5 36 L 5 36 L 5 36 C 5 36, 5 36, 5 37 C 5 37, 5 37, 5 38 L 5 38 L 5 38 L 4 38 L 2 38 L 2 38 L 1 38 C 0 38, 0 37, 0 37 C 0 36, 0 36, 1 36 L 1 36 L 1 36 L 2 31 C 2 29, 3 27, 4 26 C 4 25, 5 25, 5 24 C 7 23, 9 22, 11 22 C 11 22, 11 22, 12 22 C 12 22, 12 22, 12 22 L 17 22 L 17 15 C 17 14, 17 14, 18 14 Z M 31 6 C 31 6, 30 7, 30 7 L 30 15 C 30 15, 31 15, 31 15 L 34 15 L 37 15 C 37 15, 37 15, 37 15 C 37 14, 37 14, 37 14 L 34 14 L 32 14 L 32 7 C 32 7, 31 6, 31 6 Z M 29 0 L 33 0 C 34 0, 34 0, 34 1 C 34 1, 34 2, 33 2 L 32 2 L 32 4 L 34 4 C 36 5, 37 5, 38 7 C 40 8, 41 11, 41 14 C 41 16, 40 19, 38 21 C 37 22, 36 23, 34 23 C 33 24, 32 24, 31 24 C 28 24, 26 23, 24 21 C 22 19, 21 16, 21 14 C 21 11, 22 8, 24 7 C 25 6, 26 5, 27 4 L 30 4 L 30 2 L 29 2 C 28 2, 28 1, 28 1 C 28 0, 28 0, 29 0 Z"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 614,
    "y": 458,
    "width": 46,
    "height": 30,
    "fillColor": "#ffffff",
    "pathD": "M 40 18 C 40 18, 41 18, 41 18 C 41 18, 41 19, 41 19 C 41 20, 41 20, 41 20 C 41 20, 40 21, 40 21 C 39 21, 39 20, 39 20 C 38 20, 38 20, 38 19 C 38 19, 38 18, 39 18 C 39 18, 39 18, 40 18 Z M 31 18 C 32 18, 32 18, 32 18 C 33 18, 33 19, 33 19 C 33 20, 33 20, 32 20 C 32 20, 32 21, 31 21 C 31 21, 31 20, 30 20 C 30 20, 30 20, 30 19 C 30 19, 30 18, 30 18 C 31 18, 31 18, 31 18 Z M 23 18 C 23 18, 24 18, 24 18 C 24 18, 24 19, 24 19 C 24 20, 24 20, 24 20 C 24 20, 23 21, 23 21 C 23 21, 22 20, 22 20 C 22 20, 22 20, 22 19 C 22 19, 22 18, 22 18 C 22 18, 23 18, 23 18 Z M 15 18 C 15 18, 15 18, 16 18 C 16 18, 16 19, 16 19 C 16 20, 16 20, 16 20 C 15 20, 15 21, 15 21 C 14 21, 14 20, 14 20 C 13 20, 13 20, 13 19 C 13 19, 13 18, 14 18 C 14 18, 14 18, 15 18 Z M 6 18 C 7 18, 7 18, 7 18 C 8 18, 8 19, 8 19 C 8 20, 8 20, 7 20 C 7 20, 7 21, 6 21 C 6 21, 5 20, 5 20 C 5 20, 5 20, 5 19 C 5 19, 5 18, 5 18 C 5 18, 6 18, 6 18 Z M 40 16 C 39 16, 38 16, 37 17 C 37 17, 36 18, 36 19 C 36 20, 37 21, 37 22 C 38 22, 39 23, 40 23 C 41 23, 42 22, 42 22 C 43 21, 43 20, 43 19 C 43 18, 43 17, 42 17 C 42 16, 41 16, 40 16 Z M 31 16 C 30 16, 30 16, 29 17 C 28 17, 28 18, 28 19 C 28 20, 28 21, 29 22 C 30 22, 30 23, 31 23 C 32 23, 33 22, 34 22 C 34 21, 35 20, 35 19 C 35 18, 34 17, 34 17 C 33 16, 32 16, 31 16 Z M 23 16 C 22 16, 21 16, 21 17 C 20 17, 20 18, 20 19 C 20 20, 20 21, 21 22 C 21 22, 22 23, 23 23 C 24 23, 25 22, 25 22 C 26 21, 26 20, 26 19 C 26 18, 26 17, 25 17 C 25 16, 24 16, 23 16 Z M 15 16 C 14 16, 13 16, 12 17 C 12 17, 11 18, 11 19 C 11 20, 12 21, 12 22 C 13 22, 14 23, 15 23 C 16 23, 16 22, 17 22 C 18 21, 18 20, 18 19 C 18 18, 18 17, 17 17 C 16 16, 16 16, 15 16 Z M 6 16 C 5 16, 4 16, 4 17 C 3 17, 3 18, 3 19 C 3 20, 3 21, 4 22 C 4 22, 5 23, 6 23 C 7 23, 8 22, 9 22 C 9 21, 10 20, 10 19 C 10 18, 9 17, 9 17 C 8 16, 7 16, 6 16 Z M 6 13 L 15 13 L 23 13 L 31 13 L 40 13 C 41 13, 43 14, 44 15 C 45 16, 46 17, 46 19 C 46 21, 45 22, 44 24 C 43 25, 41 25, 40 25 L 36 25 L 36 28 L 38 28 C 39 28, 39 29, 39 29 C 39 30, 39 30, 38 30 L 33 30 C 32 30, 32 30, 32 29 C 32 29, 32 28, 33 28 L 34 28 L 34 25 L 31 25 L 23 25 L 15 25 L 12 25 L 12 28 L 14 28 C 15 28, 15 29, 15 29 C 15 30, 15 30, 14 30 L 9 30 C 8 30, 8 30, 8 29 C 8 29, 8 28, 9 28 L 11 28 L 11 25 L 6 25 C 5 25, 3 25, 2 24 C 1 22, 0 21, 0 19 C 0 17, 1 16, 2 15 C 3 14, 5 13, 6 13 Z M 35 10 L 35 11 L 36 11 L 36 11 L 37 11 L 37 11 L 37 10 L 37 10 L 36 10 L 36 10 Z M 18 10 L 18 11 L 18 11 L 19 11 L 20 11 L 20 11 L 20 10 L 20 10 L 19 10 L 18 10 Z M 26 10 L 26 11 L 29 11 L 31 11 L 31 10 L 29 10 Z M 8 10 L 8 11 L 11 11 L 14 11 L 14 10 L 11 10 Z M 37 9 L 36 9 L 37 9 L 37 10 L 37 10 L 37 10 L 37 9 L 37 9 Z M 36 9 L 35 9 L 36 9 L 36 10 L 36 10 L 36 10 L 36 9 L 36 9 Z M 26 9 L 26 9 L 29 9 L 31 9 L 31 9 L 29 9 Z M 20 9 L 19 9 L 19 9 L 19 10 L 20 10 L 20 10 L 20 9 L 20 9 Z M 18 9 L 18 9 L 18 9 L 18 10 L 18 10 L 19 10 L 19 9 L 19 9 Z M 8 9 L 8 9 L 11 9 L 14 9 L 14 9 L 11 9 Z M 30 1 L 30 4 L 30 4 L 30 4 L 30 4 L 31 4 L 31 4 L 31 4 L 32 4 L 32 4 L 32 4 L 33 4 L 33 4 L 33 4 L 33 4 L 33 1 Z M 13 1 L 13 4 L 13 4 L 13 4 L 13 4 L 13 4 L 14 4 L 14 4 L 14 4 L 15 4 L 15 4 L 15 4 L 15 4 L 16 4 L 16 4 L 16 1 Z M 25 0 L 28 0 L 29 0 L 30 0 L 33 0 L 35 0 L 36 0 L 36 0 L 37 0 L 38 0 C 38 0, 39 0, 39 1 L 39 11 C 39 12, 38 12, 38 12 L 37 12 L 36 12 L 36 12 L 29 12 L 25 12 C 25 12, 24 12, 24 11 L 24 1 C 24 0, 25 0, 25 0 Z M 8 0 L 11 0 L 11 0 L 13 0 L 16 0 L 17 0 L 18 0 L 19 0 L 20 0 L 21 0 C 21 0, 21 0, 21 1 L 21 11 C 21 12, 21 12, 21 12 L 20 12 L 19 12 L 18 12 L 11 12 L 8 12 C 7 12, 7 12, 7 11 L 7 1 C 7 0, 7 0, 8 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 547,
    "y": 528,
    "width": 46,
    "height": 44,
    "fillColor": "#ffffff",
    "pathD": "M 41 42 L 41 42 L 42 42 L 43 42 L 43 42 L 44 42 L 44 42 L 43 42 L 43 42 L 42 42 Z M 17 42 L 17 42 L 18 42 L 19 42 L 19 42 L 20 42 L 20 42 L 19 42 L 19 42 L 18 42 Z M 26 41 L 26 42 L 27 42 L 27 42 L 28 42 L 29 42 L 30 42 L 31 42 L 32 42 L 33 42 L 34 42 L 35 42 L 35 41 L 34 41 L 33 41 L 32 41 L 31 41 L 30 41 L 29 41 L 28 41 L 27 41 L 27 41 Z M 2 41 L 2 42 L 3 42 L 3 42 L 4 42 L 5 42 L 6 42 L 7 42 L 8 42 L 9 42 L 10 42 L 11 42 L 11 41 L 10 41 L 9 41 L 8 41 L 7 41 L 6 41 L 5 41 L 4 41 L 3 41 L 3 41 Z M 43 39 L 43 40 L 42 40 L 43 40 L 43 40 L 43 41 L 43 41 L 44 41 L 44 40 L 44 40 L 43 39 Z M 41 39 L 41 40 L 41 40 L 41 41 L 42 41 L 42 41 L 42 40 L 42 40 L 42 39 Z M 26 39 L 26 40 L 27 40 L 27 40 L 28 40 L 29 40 L 30 40 L 31 40 L 32 40 L 33 40 L 34 40 L 35 40 L 35 39 L 34 39 L 33 39 L 32 39 L 31 39 L 30 39 L 29 39 L 28 39 L 27 39 L 27 39 Z M 19 39 L 19 40 L 18 40 L 19 40 L 19 40 L 19 41 L 19 41 L 20 41 L 20 40 L 20 40 L 19 39 Z M 17 39 L 17 40 L 17 40 L 17 41 L 18 41 L 18 41 L 18 40 L 18 40 L 18 39 Z M 2 39 L 2 40 L 3 40 L 3 40 L 4 40 L 5 40 L 6 40 L 7 40 L 8 40 L 9 40 L 10 40 L 11 40 L 11 39 L 10 39 L 9 39 L 8 39 L 7 39 L 6 39 L 5 39 L 4 39 L 3 39 L 3 39 Z M 42 34 L 43 35 L 43 37 L 43 37 L 45 37 L 44 34 L 43 34 L 43 34 Z M 40 34 L 41 35 L 41 37 L 42 37 L 43 37 L 43 37 L 43 36 L 42 34 L 42 34 L 41 34 Z M 38 34 L 39 35 L 40 37 L 40 37 L 41 37 L 41 37 L 41 36 L 40 34 L 40 34 L 39 34 Z M 37 34 L 37 35 L 38 37 L 38 37 L 39 37 L 39 37 L 39 36 L 38 34 L 38 34 L 37 34 Z M 35 34 L 35 35 L 36 37 L 36 37 L 37 37 L 37 37 L 37 36 L 36 34 L 36 34 L 35 34 Z M 33 34 L 33 35 L 34 37 L 34 37 L 35 37 L 35 37 L 35 36 L 34 34 L 34 34 L 33 34 Z M 31 34 L 31 35 L 32 37 L 32 37 L 33 37 L 33 37 L 33 36 L 32 34 L 32 34 L 31 34 Z M 29 34 L 29 35 L 30 37 L 30 37 L 31 37 L 32 37 L 31 36 L 30 34 L 30 34 L 29 34 Z M 27 34 L 27 35 L 28 37 L 28 37 L 29 37 L 30 37 L 29 36 L 28 34 L 28 34 L 27 34 Z M 25 34 L 26 37 L 27 37 L 27 37 L 28 37 L 27 36 L 27 34 L 27 34 Z M 18 34 L 19 35 L 19 37 L 19 37 L 21 37 L 20 34 L 19 34 L 19 34 Z M 16 34 L 17 35 L 18 37 L 18 37 L 19 37 L 19 37 L 19 36 L 18 34 L 18 34 L 17 34 Z M 14 34 L 15 35 L 16 37 L 16 37 L 17 37 L 17 37 L 17 36 L 16 34 L 16 34 L 15 34 Z M 13 34 L 13 35 L 14 37 L 14 37 L 15 37 L 15 37 L 15 36 L 14 34 L 14 34 L 13 34 Z M 11 34 L 11 35 L 12 37 L 12 37 L 13 37 L 13 37 L 13 36 L 12 34 L 12 34 L 11 34 Z M 9 34 L 9 35 L 10 37 L 10 37 L 11 37 L 11 37 L 11 36 L 10 34 L 10 34 L 9 34 Z M 7 34 L 7 35 L 8 37 L 8 37 L 9 37 L 9 37 L 9 36 L 8 34 L 8 34 L 7 34 Z M 5 34 L 5 35 L 6 37 L 6 37 L 7 37 L 8 37 L 7 36 L 6 34 L 6 34 L 5 34 Z M 3 34 L 3 35 L 4 37 L 4 37 L 5 37 L 6 37 L 5 36 L 5 34 L 4 34 L 3 34 Z M 1 34 L 2 37 L 3 37 L 3 37 L 4 37 L 3 36 L 3 34 L 3 34 Z M 32 24 L 32 29 L 32 29 L 33 30 L 33 29 L 33 29 L 34 30 L 34 29 L 34 29 L 35 30 L 35 29 L 35 29 L 35 30 L 36 29 L 36 29 L 36 30 L 37 29 L 37 29 L 37 30 L 38 29 L 38 24 Z M 8 24 L 8 29 L 8 29 L 9 30 L 9 29 L 9 29 L 10 30 L 10 29 L 10 29 L 11 30 L 11 29 L 11 29 L 11 30 L 12 29 L 12 29 L 12 30 L 13 29 L 13 29 L 13 30 L 14 29 L 14 24 Z M 25 23 L 27 23 L 27 23 L 28 23 L 29 23 L 30 23 L 30 23 L 31 23 L 32 23 L 32 23 L 38 23 L 38 23 L 39 23 L 40 23 L 40 23 L 41 23 L 42 23 L 43 23 L 43 23 L 45 23 C 46 23, 46 23, 46 24 L 46 35 L 45 34 L 44 34 L 45 37 L 46 37 L 46 43 C 46 44, 45 44, 45 44 L 43 44 L 43 44 L 42 44 L 41 44 L 40 44 L 39 44 L 38 44 L 37 44 L 36 44 L 35 44 L 34 44 L 33 44 L 32 44 L 31 44 L 30 44 L 29 44 L 28 44 L 27 44 L 27 44 L 25 44 C 24 44, 24 44, 24 43 L 24 35 L 25 37 L 26 37 L 25 34 L 24 34 L 24 24 C 24 23, 24 23, 25 23 Z M 1 23 L 3 23 L 3 23 L 4 23 L 5 23 L 6 23 L 6 23 L 7 23 L 8 23 L 8 23 L 14 23 L 14 23 L 15 23 L 16 23 L 16 23 L 17 23 L 18 23 L 19 23 L 19 23 L 21 23 C 22 23, 22 23, 22 24 L 22 35 L 21 34 L 20 34 L 21 37 L 22 37 L 22 43 C 22 44, 22 44, 21 44 L 19 44 L 19 44 L 18 44 L 17 44 L 16 44 L 15 44 L 14 44 L 13 44 L 12 44 L 11 44 L 10 44 L 9 44 L 8 44 L 7 44 L 6 44 L 5 44 L 4 44 L 3 44 L 3 44 L 1 44 C 0 44, 0 44, 0 43 L 0 35 L 1 37 L 2 37 L 1 34 L 0 34 L 0 24 C 0 23, 1 23, 1 23 Z M 41 19 L 41 19 L 42 19 L 43 19 L 43 19 L 44 19 L 44 19 L 43 19 L 43 19 L 42 19 Z M 17 19 L 17 19 L 18 19 L 19 19 L 19 19 L 20 19 L 20 19 L 19 19 L 19 19 L 18 19 Z M 26 18 L 26 19 L 27 19 L 27 19 L 28 19 L 29 19 L 30 19 L 31 19 L 32 19 L 33 19 L 34 19 L 35 19 L 35 18 L 34 18 L 33 18 L 32 18 L 31 18 L 30 18 L 29 18 L 28 18 L 27 18 L 27 18 Z M 2 18 L 2 19 L 3 19 L 3 19 L 4 19 L 5 19 L 6 19 L 7 19 L 8 19 L 9 19 L 10 19 L 11 19 L 11 18 L 10 18 L 9 18 L 8 18 L 7 18 L 6 18 L 5 18 L 4 18 L 3 18 L 3 18 Z M 43 16 L 43 17 L 42 17 L 43 17 L 43 17 L 43 18 L 43 18 L 44 18 L 44 17 L 44 17 L 43 16 Z M 41 16 L 41 17 L 41 17 L 41 18 L 42 18 L 42 18 L 42 17 L 42 17 L 42 16 Z M 26 16 L 26 17 L 27 17 L 27 17 L 28 17 L 29 17 L 30 17 L 31 17 L 32 17 L 33 17 L 34 17 L 35 17 L 35 16 L 34 16 L 33 16 L 32 16 L 31 16 L 30 16 L 29 16 L 28 16 L 27 16 L 27 16 Z M 19 16 L 19 17 L 18 17 L 19 17 L 19 17 L 19 18 L 19 18 L 20 18 L 20 17 L 20 17 L 19 16 Z M 17 16 L 17 17 L 17 17 L 17 18 L 18 18 L 18 18 L 18 17 L 18 17 L 18 16 Z M 2 16 L 2 17 L 3 17 L 3 17 L 4 17 L 5 17 L 6 17 L 7 17 L 8 17 L 9 17 L 10 17 L 11 17 L 11 16 L 10 16 L 9 16 L 8 16 L 7 16 L 6 16 L 5 16 L 4 16 L 3 16 L 3 16 Z M 42 11 L 43 12 L 43 14 L 43 14 L 45 14 L 44 11 L 43 11 L 43 11 Z M 40 11 L 41 12 L 41 14 L 42 14 L 43 14 L 43 14 L 43 13 L 42 11 L 42 11 L 41 11 Z M 38 11 L 39 12 L 40 14 L 40 14 L 41 14 L 41 14 L 41 13 L 40 11 L 40 11 L 39 11 Z M 37 11 L 37 12 L 38 14 L 38 14 L 39 14 L 39 14 L 39 13 L 38 11 L 38 11 L 37 11 Z M 35 11 L 35 12 L 36 14 L 36 14 L 37 14 L 37 14 L 37 13 L 36 11 L 36 11 L 35 11 Z M 33 11 L 33 12 L 34 14 L 34 14 L 35 14 L 35 14 L 35 13 L 34 11 L 34 11 L 33 11 Z M 31 11 L 31 12 L 32 14 L 32 14 L 33 14 L 33 14 L 33 13 L 32 11 L 32 11 L 31 11 Z M 29 11 L 29 12 L 30 14 L 30 14 L 31 14 L 32 14 L 31 13 L 30 11 L 30 11 L 29 11 Z M 27 11 L 27 12 L 28 14 L 28 14 L 29 14 L 30 14 L 29 13 L 28 11 L 28 11 L 27 11 Z M 25 11 L 26 14 L 27 14 L 27 14 L 28 14 L 27 13 L 27 11 L 27 11 Z M 18 11 L 19 12 L 19 14 L 19 14 L 21 14 L 20 11 L 19 11 L 19 11 Z M 16 11 L 17 12 L 18 14 L 18 14 L 19 14 L 19 14 L 19 13 L 18 11 L 18 11 L 17 11 Z M 14 11 L 15 12 L 16 14 L 16 14 L 17 14 L 17 14 L 17 13 L 16 11 L 16 11 L 15 11 Z M 13 11 L 13 12 L 14 14 L 14 14 L 15 14 L 15 14 L 15 13 L 14 11 L 14 11 L 13 11 Z M 11 11 L 11 12 L 12 14 L 12 14 L 13 14 L 13 14 L 13 13 L 12 11 L 12 11 L 11 11 Z M 9 11 L 9 12 L 10 14 L 10 14 L 11 14 L 11 14 L 11 13 L 10 11 L 10 11 L 9 11 Z M 7 11 L 7 12 L 8 14 L 8 14 L 9 14 L 9 14 L 9 13 L 8 11 L 8 11 L 7 11 Z M 5 11 L 5 12 L 6 14 L 6 14 L 7 14 L 8 14 L 7 13 L 6 11 L 6 11 L 5 11 Z M 3 11 L 3 12 L 4 14 L 4 14 L 5 14 L 6 14 L 5 13 L 5 11 L 4 11 L 3 11 Z M 1 11 L 2 14 L 3 14 L 3 14 L 4 14 L 3 13 L 3 11 L 3 11 Z M 32 1 L 32 6 L 32 6 L 33 7 L 33 6 L 33 6 L 34 7 L 34 6 L 34 6 L 35 7 L 35 6 L 35 6 L 35 7 L 36 6 L 36 6 L 36 7 L 37 6 L 37 6 L 37 7 L 38 6 L 38 1 Z M 8 1 L 8 6 L 8 6 L 9 7 L 9 6 L 9 6 L 10 7 L 10 6 L 10 6 L 11 7 L 11 6 L 11 6 L 11 7 L 12 6 L 12 6 L 12 7 L 13 6 L 13 6 L 13 7 L 14 6 L 14 1 Z M 25 0 L 27 0 L 27 0 L 28 0 L 29 0 L 30 0 L 30 0 L 31 0 L 32 0 L 32 0 L 38 0 L 38 0 L 39 0 L 40 0 L 40 0 L 41 0 L 42 0 L 43 0 L 43 0 L 45 0 C 46 0, 46 0, 46 1 L 46 12 L 45 11 L 44 11 L 45 14 L 46 14 L 46 20 C 46 21, 45 21, 45 21 L 43 21 L 43 21 L 42 21 L 41 21 L 40 21 L 39 21 L 38 21 L 37 21 L 36 21 L 35 21 L 34 21 L 33 21 L 32 21 L 31 21 L 30 21 L 29 21 L 28 21 L 27 21 L 27 21 L 25 21 C 24 21, 24 21, 24 20 L 24 12 L 25 14 L 26 14 L 25 11 L 24 11 L 24 1 C 24 0, 24 0, 25 0 Z M 1 0 L 3 0 L 3 0 L 4 0 L 5 0 L 6 0 L 6 0 L 7 0 L 8 0 L 8 0 L 14 0 L 14 0 L 15 0 L 16 0 L 16 0 L 17 0 L 18 0 L 19 0 L 19 0 L 21 0 C 22 0, 22 0, 22 1 L 22 12 L 21 11 L 20 11 L 21 14 L 22 14 L 22 20 C 22 21, 22 21, 21 21 L 19 21 L 19 21 L 18 21 L 17 21 L 16 21 L 15 21 L 14 21 L 13 21 L 12 21 L 11 21 L 10 21 L 9 21 L 8 21 L 7 21 L 6 21 L 5 21 L 4 21 L 3 21 L 3 21 L 1 21 C 0 21, 0 21, 0 20 L 0 12 L 1 14 L 2 14 L 1 11 L 0 11 L 0 1 C 0 0, 1 0, 1 0 Z"
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 470,
    "y": 586,
    "width": 46,
    "height": 45,
    "fillColor": "#ffffff",
    "pathD": "M 26 31 L 26 41 C 26 42, 26 42, 26 42 L 20 43 L 17 44 L 15 45 L 15 34 L 17 33 L 19 33 L 19 35 C 19 35, 20 35, 20 35 L 20 35 L 22 35 C 22 35, 22 35, 22 35 L 22 32 Z M 4 31 C 4 31, 4 31, 4 31 L 13 33 L 15 34 L 15 45 L 15 45 C 15 45, 15 45, 15 45 L 13 44 L 4 42 C 4 42, 4 42, 4 41 Z M 9 28 L 13 30 L 17 31 L 19 32 L 17 33 L 15 34 C 15 34, 15 34, 15 34 L 13 33 L 4 30 C 4 30, 4 30, 4 30 C 4 30, 4 30, 4 30 Z M 15 26 L 17 27 L 20 28 L 25 30 C 26 30, 26 30, 26 30 L 22 31 L 20 31 L 17 30 L 13 28 L 11 28 L 13 27 L 15 26 C 15 26, 15 26, 15 26 Z M 39 9 C 40 9, 41 10, 41 11 C 42 12, 42 13, 42 14 L 43 27 L 46 41 C 46 41, 46 42, 46 43 C 45 43, 45 44, 44 44 L 44 44 C 43 44, 43 44, 42 43 C 42 43, 41 42, 41 42 L 41 42 C 41 42, 41 42, 41 42 L 41 41 L 38 30 L 33 41 C 33 42, 32 42, 32 42 C 31 43, 30 43, 30 42 C 29 42, 29 42, 28 41 C 28 40, 28 40, 28 39 L 28 39 C 28 39, 28 39, 28 39 L 35 22 L 36 16 L 31 18 L 30 19 L 31 19 L 30 20 L 24 23 L 24 23 L 23 23 L 19 21 L 17 21 L 18 20 L 24 17 L 25 16 L 25 16 L 28 18 L 28 16 C 28 16, 28 15, 29 15 C 30 14, 35 11, 38 10 C 38 9, 38 9, 39 9 Z M 9 9 C 10 9, 10 9, 11 9 C 12 10, 12 11, 12 11 C 13 12, 14 13, 14 14 C 15 14, 16 15, 17 15 C 17 16, 18 16, 18 16 C 18 17, 18 17, 18 18 C 18 18, 18 18, 18 18 C 18 18, 17 19, 17 19 C 16 19, 16 19, 15 19 C 14 19, 13 18, 12 17 L 11 16 C 11 21, 12 22, 14 26 L 10 27 L 9 25 L 9 28 C 7 28, 6 29, 4 29 C 6 24, 6 22, 6 16 C 5 17, 4 18, 4 20 C 4 20, 3 20, 3 21 C 2 21, 1 21, 0 20 C 0 18, 1 16, 2 14 C 3 13, 3 13, 4 12 C 5 11, 5 11, 6 10 C 7 9, 8 9, 9 9 C 9 9, 9 9, 9 9 Z M 39 1 C 40 1, 41 1, 42 2 C 43 3, 43 4, 43 5 C 43 6, 43 7, 42 8 C 41 8, 40 9, 39 9 C 38 9, 37 8, 37 8 C 36 7, 35 6, 35 5 C 35 4, 36 3, 37 2 C 37 1, 38 1, 39 1 Z M 9 0 C 10 0, 11 0, 12 1 C 12 2, 13 3, 13 4 C 13 5, 12 6, 12 7 C 11 7, 10 8, 9 8 C 8 8, 7 7, 6 7 C 5 6, 5 5, 5 4 C 5 3, 5 2, 6 1 C 7 0, 8 0, 9 0 Z"
  },
  {
    "id": "sp-32",
    "x": 731,
    "y": 359,
    "width": 439,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 0,
    "x": 697,
    "y": 448,
    "width": 473,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-34",
    "x": 697,
    "y": 272,
    "width": 357,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 0,
    "x": 630,
    "y": 194,
    "width": 394,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 1,
    "x": 630,
    "y": 525,
    "width": 394,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 1,
    "x": 551,
    "y": 590,
    "width": 473,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-38",
    "x": 551,
    "y": 124,
    "width": 530,
    "height": 27,
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

export function Imported2025migsopcubedcreativeandexampletemplates127Template({ data }: { data: BrainData }): ReactElement {
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
