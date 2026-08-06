import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 0,
    "y": 145,
    "width": 1280,
    "height": 48,
    "fillColor": "#ffffff",
    "pathD": "M 0 12 L 768 12 L 768 0 L 1280 24 L 768 48 L 768 36 L 0 36 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 283,
    "width": 178,
    "height": 384
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 457,
    "y": 283,
    "width": 178,
    "height": 384,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 268,
    "y": 283,
    "width": 178,
    "height": 384,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 645,
    "y": 283,
    "width": 178,
    "height": 384,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1022,
    "y": 283,
    "width": 178,
    "height": 384,
    "fillColor": "#4a90d9"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 834,
    "y": 283,
    "width": 178,
    "height": 384,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 193,
    "width": 178,
    "height": 79,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 457,
    "y": 193,
    "width": 178,
    "height": 79,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 268,
    "y": 193,
    "width": 178,
    "height": 79,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 645,
    "y": 193,
    "width": 178,
    "height": 79,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1022,
    "y": 193,
    "width": 178,
    "height": 79,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 834,
    "y": 193,
    "width": 178,
    "height": 79,
    "fillColor": "#ffffff"
  },
  {
    "id": "grp-13",
    "isGroup": true,
    "children": [
      {
        "id": "sp-39",
        "x": 115,
        "y": 116,
        "width": 107.00000000000001,
        "height": 107.00000000000001,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1.0000000000000002,
        "localPctH": 1.0000000000000002,
        "pathD": "M 54 0 A 54 54 0 1 1 53 0 Z"
      },
      {
        "id": "sp-40",
        "x": 122.53521126760563,
        "y": 123.53521126760563,
        "width": 91.92957746478874,
        "height": 91.92957746478874,
        "localPctX": 0.0704225352112676,
        "localPctY": 0.0704225352112676,
        "localPctW": 0.8591549295774649,
        "localPctH": 0.8591549295774649,
        "fillColor": "#3365cc",
        "pathD": "M 46 0 A 46 46 0 1 1 46 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 115,
    "y": 116,
    "width": 107,
    "height": 107
  },
  {
    "id": "grp-16",
    "isGroup": true,
    "children": [
      {
        "id": "sp-41",
        "x": 304,
        "y": 116,
        "width": 107.00000000000001,
        "height": 107.00000000000001,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1.0000000000000002,
        "localPctH": 1.0000000000000002,
        "pathD": "M 54 0 A 54 54 0 1 1 53 0 Z"
      },
      {
        "id": "sp-42",
        "x": 311.53521126760563,
        "y": 123.53521126760563,
        "width": 91.92957746478874,
        "height": 91.92957746478874,
        "localPctX": 0.0704225352112676,
        "localPctY": 0.0704225352112676,
        "localPctW": 0.8591549295774649,
        "localPctH": 0.8591549295774649,
        "fillColor": "#ff4d38",
        "pathD": "M 46 0 A 46 46 0 1 1 46 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 304,
    "y": 116,
    "width": 107,
    "height": 107
  },
  {
    "id": "grp-19",
    "isGroup": true,
    "children": [
      {
        "id": "sp-43",
        "x": 492,
        "y": 116,
        "width": 107.00000000000001,
        "height": 107.00000000000001,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1.0000000000000002,
        "localPctH": 1.0000000000000002,
        "pathD": "M 54 0 A 54 54 0 1 1 53 0 Z"
      },
      {
        "id": "sp-44",
        "x": 499.53521126760563,
        "y": 123.53521126760563,
        "width": 91.92957746478874,
        "height": 91.92957746478874,
        "localPctX": 0.0704225352112676,
        "localPctY": 0.0704225352112676,
        "localPctW": 0.8591549295774649,
        "localPctH": 0.8591549295774649,
        "fillColor": "#52c49c",
        "pathD": "M 46 0 A 46 46 0 1 1 46 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 492,
    "y": 116,
    "width": 107,
    "height": 107
  },
  {
    "id": "grp-22",
    "isGroup": true,
    "children": [
      {
        "id": "sp-45",
        "x": 681,
        "y": 116,
        "width": 107.00000000000001,
        "height": 107.00000000000001,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1.0000000000000002,
        "localPctH": 1.0000000000000002,
        "pathD": "M 54 0 A 54 54 0 1 1 53 0 Z"
      },
      {
        "id": "sp-46",
        "x": 688.5352112676056,
        "y": 123.53521126760563,
        "width": 91.92957746478874,
        "height": 91.92957746478874,
        "localPctX": 0.0704225352112676,
        "localPctY": 0.0704225352112676,
        "localPctW": 0.8591549295774649,
        "localPctH": 0.8591549295774649,
        "fillColor": "#ffb900",
        "pathD": "M 46 0 A 46 46 0 1 1 46 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 681,
    "y": 116,
    "width": 107,
    "height": 107
  },
  {
    "id": "grp-25",
    "isGroup": true,
    "children": [
      {
        "id": "sp-47",
        "x": 869,
        "y": 116,
        "width": 107.00000000000001,
        "height": 107.00000000000001,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1.0000000000000002,
        "localPctH": 1.0000000000000002,
        "pathD": "M 54 0 A 54 54 0 1 1 53 0 Z"
      },
      {
        "id": "sp-48",
        "x": 876.5352112676056,
        "y": 123.53521126760563,
        "width": 91.92957746478874,
        "height": 91.92957746478874,
        "localPctX": 0.0704225352112676,
        "localPctY": 0.0704225352112676,
        "localPctW": 0.8591549295774649,
        "localPctH": 0.8591549295774649,
        "fillColor": "#ee6d90",
        "pathD": "M 46 0 A 46 46 0 1 1 46 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 869,
    "y": 116,
    "width": 107,
    "height": 107
  },
  {
    "id": "grp-28",
    "isGroup": true,
    "children": [
      {
        "id": "sp-49",
        "x": 1058,
        "y": 116,
        "width": 107.00000000000001,
        "height": 107.00000000000001,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1.0000000000000002,
        "localPctH": 1.0000000000000002,
        "pathD": "M 54 0 A 54 54 0 1 1 53 0 Z"
      },
      {
        "id": "sp-50",
        "x": 1065.5352112676055,
        "y": 123.53521126760563,
        "width": 91.92957746478874,
        "height": 91.92957746478874,
        "localPctX": 0.07042253521126653,
        "localPctY": 0.0704225352112676,
        "localPctW": 0.8591549295774649,
        "localPctH": 0.8591549295774649,
        "fillColor": "#4a90d9",
        "pathD": "M 46 0 A 46 46 0 1 1 46 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1058,
    "y": 116,
    "width": 107,
    "height": 107
  },
  {
    "id": "sp-13",
    "x": 104,
    "y": 601,
    "width": 48,
    "height": 50,
    "fillColor": "#ffffff",
    "pathD": "M 7 9 C 8 8, 10 8, 11 9 C 12 10, 12 12, 11 13 C 4 20, 4 32, 11 39 C 15 42, 19 44, 24 44 C 29 44, 33 42, 37 39 C 44 32, 44 20, 37 13 C 36 12, 36 10, 37 9 C 38 8, 40 8, 41 9 C 50 18, 50 34, 41 43 C 36 48, 30 50, 24 50 C 18 50, 12 48, 7 43 C -2 34, -2 18, 7 9 Z M 24 0 C 26 0, 27 1, 27 3 L 27 22 C 27 24, 26 25, 24 25 C 22 25, 21 24, 21 22 L 21 3 C 21 1, 22 0, 24 0 Z"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 7,
    "x": 476,
    "y": 598,
    "width": 64,
    "height": 55,
    "fillColor": "#ffffff",
    "pathD": "M 42 33 C 44 33, 45 34, 45 36 L 45 48 C 45 50, 44 51, 42 51 C 41 51, 39 50, 39 48 L 39 36 C 39 34, 41 33, 42 33 Z M 30 30 C 34 30, 37 33, 37 36 L 37 52 C 37 54, 35 55, 34 55 C 32 55, 31 54, 31 52 L 31 36 C 31 36, 31 36, 30 36 C 30 36, 29 36, 29 36 L 29 41 C 29 43, 28 44, 26 44 C 25 44, 23 43, 23 41 L 23 36 C 23 33, 26 30, 30 30 Z M 30 19 C 35 19, 40 22, 43 26 C 44 27, 43 29, 42 30 C 41 31, 39 31, 38 29 C 36 27, 33 25, 30 25 C 25 25, 21 29, 21 34 L 21 49 C 21 51, 19 52, 18 52 C 16 52, 15 51, 15 49 L 15 34 C 15 26, 22 19, 30 19 Z M 6 14 C 7 15, 8 17, 7 18 C 6 19, 6 19, 5 20 C 5 21, 4 21, 3 21 C 2 21, 2 21, 1 21 C 0 20, 0 18, 0 17 C 1 16, 1 15, 2 15 C 3 13, 5 13, 6 14 Z M 19 12 C 21 11, 22 12, 23 13 C 24 15, 23 16, 22 17 C 15 20, 11 27, 11 34 L 11 43 C 11 45, 10 46, 8 46 C 7 46, 5 45, 5 43 L 5 34 C 5 24, 11 16, 19 12 Z M 30 10 C 43 10, 54 21, 54 34 L 54 51 C 54 53, 53 54, 51 54 C 50 54, 49 53, 49 51 L 49 34 C 49 24, 40 15, 30 15 C 28 15, 27 14, 27 13 C 27 11, 28 10, 30 10 Z M 30 0 C 49 0, 64 15, 64 34 C 64 36, 63 37, 61 37 C 59 37, 58 36, 58 34 C 58 19, 45 6, 30 6 C 24 6, 18 8, 13 11 C 12 12, 10 12, 9 11 C 8 9, 9 7, 10 7 C 16 2, 23 0, 30 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 664,
    "y": 599,
    "width": 50,
    "height": 54,
    "fillColor": "#ffffff",
    "pathD": "M 11 38 C 8 38, 6 41, 6 43 C 6 46, 8 48, 11 48 C 12 48, 13 47, 14 47 L 15 44 L 15 43 L 15 42 L 14 40 C 13 39, 12 38, 11 38 Z M 39 29 C 36 29, 34 32, 34 34 C 34 37, 36 39, 39 39 C 41 39, 44 37, 44 34 C 44 32, 41 29, 39 29 Z M 46 0 C 46 0, 48 0, 48 0 C 49 1, 50 2, 50 3 L 50 34 L 49 34 L 46 42 C 44 44, 42 45, 39 45 C 33 45, 28 40, 28 34 C 28 28, 33 23, 39 23 L 44 26 L 44 7 L 21 16 L 21 42 L 22 43 C 22 49, 17 54, 11 54 C 5 54, 0 49, 0 43 C 0 37, 5 33, 11 33 L 15 34 L 15 14 C 15 13, 16 11, 17 11 L 46 0 Z"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 6,
    "x": 291,
    "y": 599,
    "width": 58,
    "height": 54,
    "fillColor": "#ffffff",
    "pathD": "M 39 36 L 39 48 L 51 48 L 51 36 L 39 36 Z M 3 30 C 5 29, 6 29, 7 30 L 15 38 L 22 30 C 24 29, 25 29, 26 30 C 28 31, 28 33, 26 34 L 19 42 L 26 49 C 28 50, 28 52, 26 53 C 26 54, 25 54, 24 54 C 24 54, 23 54, 22 53 L 15 46 L 7 53 C 7 54, 6 54, 5 54 C 5 54, 4 54, 3 53 C 2 52, 2 50, 3 49 L 11 42 L 3 34 C 2 33, 2 31, 3 30 Z M 36 30 L 54 30 C 56 30, 57 31, 57 33 L 57 51 C 57 52, 56 54, 54 54 L 36 54 C 35 54, 34 52, 34 51 L 34 33 C 34 31, 35 30, 36 30 Z M 15 9 L 8 19 L 21 19 L 15 9 Z M 45 6 C 41 6, 38 9, 38 13 C 38 17, 41 20, 45 20 C 49 20, 52 17, 52 13 C 52 9, 49 6, 45 6 Z M 15 1 C 16 1, 17 2, 17 2 L 29 21 C 30 22, 30 23, 30 24 C 29 25, 28 25, 27 25 L 3 25 C 2 25, 1 25, 0 24 C 0 23, 0 22, 1 21 L 13 2 C 13 2, 14 1, 15 1 Z M 45 0 C 52 0, 58 6, 58 13 C 58 20, 52 26, 45 26 C 38 26, 32 20, 32 13 C 32 6, 38 0, 45 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 851,
    "y": 599,
    "width": 41,
    "height": 55,
    "fillColor": "#ffffff",
    "pathD": "M 3 22 C 5 22, 6 24, 6 25 C 6 33, 12 40, 21 40 C 29 40, 35 33, 35 25 C 35 24, 36 22, 38 22 C 40 22, 41 24, 41 25 C 41 34, 36 41, 28 44 L 23 45 L 23 52 C 23 54, 22 55, 21 55 C 19 55, 18 54, 18 52 L 18 45 L 13 44 C 5 41, 0 34, 0 25 C 0 24, 1 22, 3 22 Z M 20 6 C 18 6, 16 8, 16 10 L 16 25 C 16 27, 18 29, 20 29 C 23 29, 25 27, 25 25 L 25 10 C 25 8, 23 6, 20 6 Z M 20 0 C 26 0, 30 5, 30 10 L 30 25 C 30 30, 26 35, 20 35 C 15 35, 10 30, 10 25 L 10 10 C 10 5, 15 0, 20 0 Z"
  },
  {
    "id": "sp-18",
    "x": 1040,
    "y": 610,
    "width": 51,
    "height": 32,
    "fillColor": "#ffffff",
    "pathD": "M 36 7 C 38 7, 39 9, 39 10 L 39 21 C 39 22, 38 24, 36 24 C 34 24, 33 22, 33 21 L 33 10 C 33 9, 34 7, 36 7 Z M 28 7 C 29 7, 31 9, 31 10 L 31 21 C 31 22, 29 24, 28 24 C 26 24, 25 22, 25 21 L 25 10 C 25 9, 26 7, 28 7 Z M 19 7 C 21 7, 22 9, 22 10 L 22 21 C 22 22, 21 24, 19 24 C 18 24, 17 22, 17 21 L 17 10 C 17 9, 18 7, 19 7 Z M 11 7 C 13 7, 14 9, 14 10 L 14 21 C 14 22, 13 24, 11 24 C 10 24, 8 22, 8 21 L 8 10 C 8 9, 10 7, 11 7 Z M 6 6 L 6 26 L 41 26 L 41 22 C 41 20, 42 19, 44 19 L 45 19 L 45 13 L 44 13 C 42 13, 41 12, 41 10 L 41 6 L 6 6 Z M 2 0 L 44 0 C 46 0, 47 1, 47 3 L 47 7 L 48 7 C 49 7, 51 8, 51 10 L 51 22 C 51 23, 49 25, 48 25 L 47 25 L 47 29 C 47 30, 46 32, 44 32 L 2 32 C 1 32, 0 30, 0 29 L 0 3 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 0,
    "x": 109,
    "y": 227,
    "width": 119,
    "height": 36,
    "text": "Milestone",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 298,
    "y": 227,
    "width": 119,
    "height": 36,
    "text": "Milestone",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 486,
    "y": 227,
    "width": 119,
    "height": 36,
    "text": "Milestone",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 675,
    "y": 227,
    "width": 119,
    "height": 36,
    "text": "Milestone",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 4,
    "x": 863,
    "y": 227,
    "width": 119,
    "height": 36,
    "text": "Milestone",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 5,
    "x": 1052,
    "y": 227,
    "width": 119,
    "height": 36,
    "text": "Milestone",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 0,
    "x": 87,
    "y": 302,
    "width": 163,
    "height": 100,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 1,
    "x": 276,
    "y": 302,
    "width": 163,
    "height": 100,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 2,
    "x": 464,
    "y": 302,
    "width": 163,
    "height": 100,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 3,
    "x": 653,
    "y": 302,
    "width": 163,
    "height": 100,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 4,
    "x": 841,
    "y": 302,
    "width": 163,
    "height": 100,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 5,
    "x": 1030,
    "y": 302,
    "width": 163,
    "height": 100,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 0,
    "x": 135,
    "y": 139,
    "width": 67,
    "height": 61,
    "text": "Q1, 2020",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 1,
    "x": 324,
    "y": 139,
    "width": 67,
    "height": 61,
    "text": "Q2, 2020",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 2,
    "x": 512,
    "y": 139,
    "width": 67,
    "height": 61,
    "text": "Q3, 2020",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 3,
    "x": 701,
    "y": 139,
    "width": 67,
    "height": 61,
    "text": "Q4, 2020",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 4,
    "x": 889,
    "y": 139,
    "width": 67,
    "height": 61,
    "text": "Q1, 2021",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 5,
    "x": 1078,
    "y": 139,
    "width": 67,
    "height": 61,
    "text": "Q2, 2021",
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

export function Imported2025migsopcubedcreativeandexampletemplates170Template({ data }: { data: BrainData }): ReactElement {
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
