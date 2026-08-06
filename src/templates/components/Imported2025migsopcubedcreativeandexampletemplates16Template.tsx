import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "grp-0",
    "isGroup": true,
    "children": [
      {
        "id": "sp-14",
        "x": 1020.0021978021978,
        "y": 151.68239564428313,
        "width": 98.76923076923077,
        "height": 103.41197822141561,
        "localPctX": 0.7406593406593406,
        "localPctY": 0.039927404718693306,
        "localPctW": 0.23076923076923078,
        "localPctH": 0.19963702359346644,
        "fillColor": "#3365cc",
        "pathD": "M 0 0 L 3 1 C 35 17, 62 41, 85 76 C 90 84, 94 92, 98 100 L 99 103 L 0 103 L 0 0 Z"
      },
      {
        "id": "sp-15",
        "x": 758.4989010989011,
        "y": 155.44283121597095,
        "width": 84.65934065934066,
        "height": 99.65154264972777,
        "localPctX": 0.1296703296703297,
        "localPctY": 0.04718693284936478,
        "localPctW": 0.1978021978021978,
        "localPctH": 0.19237749546279492,
        "fillColor": "#3365cc",
        "pathD": "M 85 0 L 85 100 L 0 100 L 0 99 C 9 60, 32 31, 66 10 C 70 8, 73 6, 76 4 L 85 0 Z"
      },
      {
        "id": "sp-16",
        "x": 712.4065934065934,
        "y": 260.73502722323053,
        "width": 131.69230769230768,
        "height": 125.0344827586207,
        "localPctX": 0.021978021978021966,
        "localPctY": 0.25045372050816705,
        "localPctW": 0.30769230769230765,
        "localPctH": 0.2413793103448276,
        "fillColor": "#ff4d38",
        "pathD": "M 46 0 L 132 0 L 132 125 L 0 125 L 1 124 C 3 121, 6 119, 8 117 C 30 95, 45 70, 43 36 C 43 24, 44 13, 45 3 L 46 0 Z"
      },
      {
        "id": "sp-17",
        "x": 1020.0021978021978,
        "y": 260.73502722323053,
        "width": 111.93846153846154,
        "height": 125.0344827586207,
        "localPctX": 0.7406593406593406,
        "localPctY": 0.25045372050816705,
        "localPctW": 0.26153846153846155,
        "localPctH": 0.2413793103448276,
        "fillColor": "#ff4d38",
        "pathD": "M 0 0 L 101 0 L 103 4 C 110 26, 113 51, 112 79 C 111 92, 108 105, 104 119 L 102 125 L 0 125 L 0 0 Z"
      },
      {
        "id": "sp-18",
        "x": 703,
        "y": 392.3502722323049,
        "width": 140.15824175824176,
        "height": 125.0344827586207,
        "localPctX": 0,
        "localPctY": 0.5045372050816698,
        "localPctW": 0.3274725274725275,
        "localPctH": 0.2413793103448276,
        "fillColor": "#52c49c",
        "pathD": "M 4 0 L 140 0 L 140 125 L 40 125 L 41 121 C 40 115, 39 109, 34 105 C 29 100, 27 94, 32 88 C 36 84, 33 83, 31 81 C 20 72, 20 72, 27 61 C 33 51, 32 46, 25 38 C 20 32, 14 29, 8 25 C -1 18, -2 11, 4 0 L 4 0 Z"
      },
      {
        "id": "sp-19",
        "x": 1020.0021978021978,
        "y": 392.3502722323049,
        "width": 99.70989010989011,
        "height": 125.0344827586207,
        "localPctX": 0.7406593406593406,
        "localPctY": 0.5045372050816698,
        "localPctW": 0.23296703296703297,
        "localPctH": 0.2413793103448276,
        "fillColor": "#52c49c",
        "pathD": "M 0 0 L 100 0 L 99 1 C 93 18, 83 36, 70 52 C 62 63, 53 73, 46 85 C 40 95, 36 105, 33 116 L 31 125 L 0 125 L 0 0 Z"
      },
      {
        "id": "sp-20",
        "x": 737.8043956043956,
        "y": 523.9655172413793,
        "width": 105.35384615384615,
        "height": 57.346642468239565,
        "localPctX": 0.08131868131868134,
        "localPctY": 0.7586206896551724,
        "localPctW": 0.24615384615384614,
        "localPctH": 0.11070780399274048,
        "fillColor": "#ffb900",
        "pathD": "M 5 0 L 105 0 L 105 50 L 105 50 C 95 50, 86 53, 76 54 C 58 55, 39 60, 21 55 C 3 49, -3 40, 1 19 C 2 15, 3 12, 3 8 L 5 0 Z"
      },
      {
        "id": "sp-21",
        "x": 1020.0021978021978,
        "y": 523.9655172413793,
        "width": 55.4989010989011,
        "height": 124.09437386569873,
        "localPctX": 0.7406593406593406,
        "localPctY": 0.7586206896551724,
        "localPctW": 0.12967032967032968,
        "localPctH": 0.2395644283121597,
        "fillColor": "#ffb900",
        "pathD": "M 0 0 L 31 0 L 30 8 C 30 19, 31 31, 33 42 C 39 65, 47 88, 53 110 C 57 123, 57 123, 45 124 C 40 124, 25 124, 5 124 L 0 124 L 0 0 Z"
      },
      {
        "id": "sp-22",
        "x": 844.0989010989011,
        "y": 131,
        "width": 175.9032967032967,
        "height": 123.15426497277677,
        "localPctX": 0.3296703296703298,
        "localPctY": 0,
        "localPctW": 0.41098901098901097,
        "localPctH": 0.23774954627949185,
        "fillColor": "#3365cc",
        "pathD": "M 86 0 C 91 0, 95 0, 99 0 C 124 2, 147 8, 168 17 L 176 20 L 176 123 L 0 123 L 0 24 L 2 23 C 29 9, 57 0, 86 0 Z"
      },
      {
        "id": "sp-23",
        "x": 844.0989010989011,
        "y": 260.73502722323053,
        "width": 175.9032967032967,
        "height": 125.0344827586207,
        "localPctX": 0.3296703296703298,
        "localPctY": 0.25045372050816705,
        "localPctW": 0.41098901098901097,
        "localPctH": 0.2413793103448276,
        "fillColor": "#ff4d38",
        "pathD": "M 0 0 L 176 0 L 176 125 L 0 125 L 0 0 Z"
      },
      {
        "id": "sp-24",
        "x": 844.0989010989011,
        "y": 392.3502722323049,
        "width": 175.9032967032967,
        "height": 125.0344827586207,
        "localPctX": 0.3296703296703298,
        "localPctY": 0.5045372050816698,
        "localPctW": 0.41098901098901097,
        "localPctH": 0.2413793103448276,
        "fillColor": "#52c49c",
        "pathD": "M 0 0 L 176 0 L 176 125 L 0 125 L 0 0 Z"
      },
      {
        "id": "sp-25",
        "x": 844.0989010989011,
        "y": 523.9655172413793,
        "width": 175.9032967032967,
        "height": 125.0344827586207,
        "localPctX": 0.3296703296703298,
        "localPctY": 0.7586206896551724,
        "localPctW": 0.41098901098901097,
        "localPctH": 0.2413793103448276,
        "fillColor": "#ffb900",
        "pathD": "M 0 0 L 176 0 L 176 124 L 169 124 C 127 124, 72 124, 47 125 C 37 125, 32 122, 31 111 C 28 97, 24 83, 23 69 C 22 59, 17 54, 9 52 C 7 51, 6 51, 4 51 L 0 50 L 0 0 Z"
      },
      {
        "id": "sp-26",
        "x": 906.1824175824177,
        "y": 167.66424682395646,
        "width": 50.79560439560439,
        "height": 50.76588021778584,
        "localPctX": 0.47472527472527487,
        "localPctY": 0.07078039927404722,
        "localPctW": 0.11868131868131868,
        "localPctH": 0.09800362976406533,
        "fillColor": "#ffffff",
        "pathD": "M 22 46 L 22 48 C 22 49, 22 49, 23 49 L 28 49 C 29 49, 29 49, 29 49 C 29 49, 29 48, 29 48 L 29 46 L 22 46 Z M 37 37 L 37 42 L 42 42 L 42 37 L 37 37 Z M 9 37 L 9 42 L 13 42 L 13 37 L 9 37 Z M 40 33 C 40 33, 41 33, 41 34 L 41 36 L 43 36 C 43 36, 44 36, 44 37 L 44 43 C 44 43, 43 43, 43 43 L 37 43 C 36 43, 36 43, 36 43 L 36 40 L 34 40 C 33 40, 33 40, 33 40 C 33 39, 33 39, 34 39 L 36 39 L 36 37 C 36 36, 36 36, 37 36 L 39 36 L 39 34 C 39 33, 39 33, 40 33 Z M 11 33 C 11 33, 12 33, 12 34 L 12 36 L 14 36 C 14 36, 15 36, 15 37 L 15 39 L 17 39 C 18 39, 18 39, 18 40 C 18 40, 18 40, 17 40 L 15 40 L 15 43 C 15 43, 14 43, 14 43 L 8 43 C 8 43, 7 43, 7 43 L 7 37 C 7 36, 8 36, 8 36 L 10 36 L 10 34 C 10 33, 11 33, 11 33 Z M 26 24 L 26 44 L 29 44 L 29 24 L 26 24 Z M 22 24 L 22 44 L 25 44 L 25 24 L 22 24 Z M 40 22 C 40 22, 41 22, 41 23 L 41 28 C 41 28, 40 29, 40 29 C 40 29, 39 28, 39 28 L 39 23 C 39 22, 40 22, 40 22 Z M 11 22 C 12 22, 12 22, 12 23 L 12 28 C 12 28, 12 29, 11 29 C 11 29, 11 28, 11 28 L 11 23 C 11 22, 11 22, 11 22 Z M 26 18 L 22 23 L 29 23 L 26 18 Z M 26 15 C 26 15, 26 16, 26 16 L 31 23 C 31 23, 31 23, 31 23 L 31 44 L 31 44 C 32 44, 32 44, 32 45 C 32 45, 32 46, 31 46 L 31 46 L 31 48 C 31 49, 31 49, 30 50 C 30 50, 29 51, 28 51 L 23 51 C 21 51, 20 49, 20 48 L 20 46 L 20 46 C 19 46, 19 45, 19 45 C 19 44, 19 44, 20 44 L 20 44 L 20 23 C 20 23, 20 23, 20 23 L 25 16 C 25 16, 25 15, 26 15 Z M 23 10 L 28 10 C 28 10, 29 11, 29 11 C 29 12, 28 12, 28 12 L 23 12 C 22 12, 22 12, 22 11 C 22 11, 22 10, 23 10 Z M 9 9 L 9 13 L 13 13 L 13 9 L 9 9 Z M 37 7 C 37 7, 37 7, 37 8 L 37 13 L 43 13 C 43 13, 44 14, 44 14 C 44 14, 43 15, 43 15 L 41 15 L 41 17 C 41 17, 40 18, 40 18 C 39 18, 39 17, 39 17 L 39 15 L 37 15 C 36 15, 36 14, 36 14 L 36 12 L 34 12 C 33 12, 33 11, 33 11 C 33 11, 33 10, 34 10 L 36 10 L 36 8 C 36 7, 36 7, 37 7 Z M 8 7 L 14 7 C 14 7, 15 7, 15 8 L 15 10 L 17 10 C 18 10, 18 11, 18 11 C 18 11, 18 12, 17 12 L 15 12 L 15 14 C 15 14, 14 15, 14 15 L 12 15 L 12 17 C 12 17, 11 18, 11 18 C 11 18, 10 17, 10 17 L 10 15 L 8 15 C 8 15, 7 14, 7 14 L 7 8 C 7 7, 8 7, 8 7 Z M 42 3 L 42 9 L 48 9 L 42 3 Z M 1 0 L 41 0 C 41 0, 41 0, 41 0 L 51 9 C 51 10, 51 10, 51 10 L 51 50 C 51 50, 50 50, 50 50 L 34 50 C 33 50, 33 50, 33 50 C 33 49, 33 49, 34 49 L 49 49 L 49 11 L 41 11 C 40 11, 40 10, 40 10 L 40 1 L 2 1 L 2 49 L 17 49 C 18 49, 18 49, 18 50 C 18 50, 18 50, 17 50 L 1 50 C 0 50, 0 50, 0 50 L 0 1 C 0 0, 0 0, 1 0 Z"
      },
      {
        "id": "sp-27",
        "x": 906.1824175824177,
        "y": 298.3393829401089,
        "width": 50.79560439560439,
        "height": 50.76588021778584,
        "localPctX": 0.47472527472527487,
        "localPctY": 0.3230490018148821,
        "localPctW": 0.11868131868131868,
        "localPctH": 0.09800362976406533,
        "fillColor": "#ffffff",
        "pathD": "M 30 46 L 30 47 C 30 48, 31 49, 33 49 L 47 49 C 48 49, 49 48, 49 47 L 49 46 L 30 46 Z M 48 34 L 31 41 L 30 44 L 49 44 L 48 34 Z M 47 25 L 32 31 L 31 39 L 48 32 L 47 25 Z M 36 19 C 34 19, 33 20, 33 22 L 32 29 L 47 23 L 47 22 C 47 20, 45 19, 44 19 L 42 19 L 36 19 Z M 38 12 L 38 17 L 42 17 L 42 12 L 38 12 Z M 37 10 L 42 10 C 43 10, 43 11, 43 11 L 43 17 L 44 17 C 46 17, 48 19, 48 22 L 51 45 L 51 45 L 51 47 C 51 49, 49 51, 47 51 L 33 51 C 30 51, 29 49, 29 47 L 29 45 L 29 45 L 31 22 C 31 19, 34 17, 36 17 L 36 17 L 36 11 C 36 11, 37 10, 37 10 Z M 7 9 C -3 29, 3 46, 4 49 L 11 49 C 12 48, 13 44, 13 38 C 14 32, 13 26, 12 20 C 11 16, 9 12, 7 9 Z M 8 2 L 8 6 L 30 6 L 30 2 L 8 2 Z M 8 0 L 30 0 C 31 0, 31 0, 31 1 L 31 7 C 32 9, 33 12, 34 14 C 34 15, 34 15, 34 15 C 33 15, 33 15, 33 15 C 32 12, 31 10, 30 8 L 9 8 C 11 11, 12 15, 13 19 L 28 19 C 29 19, 29 20, 29 20 C 29 21, 29 21, 28 21 L 13 21 C 15 26, 15 32, 15 37 L 27 37 C 27 37, 28 37, 28 38 C 28 38, 27 39, 27 39 L 15 39 C 14 44, 13 48, 13 49 L 26 49 C 27 49, 27 50, 27 50 C 27 51, 27 51, 26 51 L 3 51 C 3 51, 3 51, 3 50 C 3 50, -6 31, 7 7 L 7 1 C 7 0, 7 0, 8 0 Z"
      },
      {
        "id": "sp-28",
        "x": 906.1824175824177,
        "y": 429.9546279491833,
        "width": 50.79560439560439,
        "height": 50.76588021778584,
        "localPctX": 0.47472527472527487,
        "localPctY": 0.5771324863883848,
        "localPctW": 0.11868131868131868,
        "localPctH": 0.09800362976406533,
        "fillColor": "#ffffff",
        "pathD": "M 35 47 L 35 48 C 35 49, 35 49, 36 49 L 38 49 C 39 49, 39 49, 39 48 L 39 47 L 35 47 Z M 12 47 L 12 48 C 12 49, 13 49, 13 49 L 15 49 C 16 49, 17 49, 17 48 L 17 47 L 12 47 Z M 43 40 C 40 40, 38 42, 38 45 L 42 45 C 43 45, 43 45, 43 44 L 43 40 Z M 8 40 L 8 44 C 8 45, 8 45, 9 45 L 14 45 C 13 42, 11 40, 8 40 Z M 44 34 C 45 34, 45 34, 45 35 L 45 44 C 45 45, 44 47, 42 47 L 41 47 L 41 48 C 41 50, 40 51, 38 51 L 36 51 C 34 51, 33 50, 33 48 L 33 47 L 18 47 L 18 48 C 18 50, 17 51, 15 51 L 13 51 C 12 51, 11 50, 11 48 L 11 47 L 9 47 C 8 47, 6 45, 6 44 L 6 36 C 6 35, 7 35, 7 35 C 8 35, 8 35, 8 36 L 8 38 C 12 38, 15 41, 15 45 L 36 45 C 37 41, 40 38, 43 38 L 43 35 C 43 34, 44 34, 44 34 Z M 8 27 L 8 30 L 42 30 L 42 27 L 8 27 Z M 44 23 L 44 30 L 49 27 L 44 23 Z M 8 23 L 8 26 L 42 26 L 42 23 L 8 23 Z M 3 23 C 3 23, 2 23, 2 23 C 2 23, 2 24, 2 24 L 2 29 C 2 30, 2 30, 3 30 L 6 30 L 6 23 L 3 23 Z M 7 20 C 7 20, 8 20, 8 21 L 8 21 L 43 21 C 43 21, 43 21, 43 21 L 50 26 C 51 26, 51 26, 51 27 C 51 27, 51 27, 50 27 L 43 32 C 43 32, 43 32, 43 32 L 8 32 L 8 32 C 8 33, 7 33, 7 33 C 7 33, 6 33, 6 32 L 6 32 L 3 32 C 1 32, 0 31, 0 29 L 0 24 C 0 22, 1 21, 3 21 L 6 21 L 6 21 C 6 20, 7 20, 7 20 Z M 38 8 C 38 11, 40 13, 43 13 L 43 9 C 43 8, 43 8, 42 8 L 38 8 Z M 9 8 C 8 8, 8 8, 8 9 L 8 13 C 11 13, 13 11, 14 8 L 9 8 Z M 22 1 C 20 1, 19 3, 19 4 L 19 6 L 32 6 L 32 4 C 32 3, 31 1, 30 1 L 22 1 Z M 22 0 L 30 0 C 32 0, 34 2, 34 4 L 34 6 L 42 6 C 44 6, 45 7, 45 9 L 45 18 C 45 19, 45 19, 44 19 C 44 19, 43 19, 43 18 L 43 15 C 40 15, 37 12, 36 8 L 15 8 C 15 12, 12 15, 8 15 L 8 17 C 8 18, 8 18, 7 18 C 7 18, 6 18, 6 17 L 6 9 C 6 7, 8 6, 9 6 L 18 6 L 18 4 C 18 2, 19 0, 22 0 Z"
      },
      {
        "id": "sp-29",
        "x": 906.1824175824177,
        "y": 561.5698729582577,
        "width": 50.79560439560439,
        "height": 50.76588021778584,
        "localPctX": 0.47472527472527487,
        "localPctY": 0.8312159709618876,
        "localPctW": 0.11868131868131868,
        "localPctH": 0.09800362976406533,
        "fillColor": "#ffffff",
        "pathD": "M 36 45 C 37 45, 37 45, 37 46 C 38 46, 37 47, 37 47 C 34 49, 30 50, 26 50 C 23 50, 21 49, 18 49 L 18 50 L 15 46 L 19 46 L 19 47 C 25 49, 31 48, 36 45 Z M 41 42 C 41 43, 42 43, 41 43 C 41 44, 41 45, 41 45 L 41 49 L 49 49 L 49 45 C 49 45, 49 44, 49 43 C 48 43, 48 43, 49 42 C 49 42, 50 42, 50 42 C 50 43, 51 44, 51 45 L 51 50 C 51 50, 50 51, 50 51 L 40 51 C 39 51, 39 50, 39 50 L 39 45 C 39 44, 39 43, 40 42 C 40 42, 41 42, 41 42 Z M 2 42 C 3 43, 3 43, 2 43 C 2 44, 2 45, 2 45 L 2 49 L 10 49 L 10 45 C 10 45, 10 44, 10 43 C 10 43, 10 43, 10 42 C 10 42, 11 42, 11 42 C 12 43, 12 44, 12 45 L 12 50 C 12 50, 12 51, 11 51 L 1 51 C 1 51, 0 50, 0 50 L 0 45 C 0 44, 1 43, 1 42 C 2 42, 2 42, 2 42 Z M 45 37 C 44 37, 43 38, 43 39 C 43 40, 44 41, 45 41 C 46 41, 47 40, 47 39 C 47 38, 46 37, 45 37 Z M 6 37 C 5 37, 4 38, 4 39 C 4 40, 5 41, 6 41 C 7 41, 8 40, 8 39 C 8 38, 7 37, 6 37 Z M 45 36 C 47 36, 48 37, 48 39 C 48 41, 47 42, 45 42 C 43 42, 42 41, 42 39 C 42 37, 43 36, 45 36 Z M 6 36 C 8 36, 9 37, 9 39 C 9 41, 8 42, 6 42 C 4 42, 3 41, 3 39 C 3 37, 4 36, 6 36 Z M 25 22 C 24 22, 22 23, 22 25 C 22 27, 24 28, 25 28 C 27 28, 29 27, 29 25 C 29 23, 27 22, 25 22 Z M 25 20 C 28 20, 30 23, 30 25 C 30 28, 28 30, 25 30 C 23 30, 21 28, 21 25 C 21 23, 23 20, 25 20 Z M 3 17 L 4 22 L 3 21 C 2 25, 3 30, 4 33 C 4 34, 4 34, 4 34 C 3 34, 3 34, 3 34 C 3 34, 3 34, 3 34 C 1 30, 1 25, 1 21 L 0 21 L 3 17 Z M 47 17 C 48 17, 48 17, 48 17 C 50 22, 50 26, 49 31 L 51 31 L 47 34 L 46 30 L 48 30 C 49 26, 48 22, 47 18 C 47 18, 47 17, 47 17 Z M 24 13 L 23 17 C 23 17, 23 17, 23 18 C 22 18, 22 18, 22 18 C 21 18, 21 18, 21 18 L 18 16 C 17 16, 16 17, 15 18 L 18 21 C 18 21, 18 22, 18 22 C 18 22, 18 22, 17 23 C 17 23, 17 23, 17 23 L 13 24 C 13 24, 13 25, 13 26 C 13 26, 13 27, 13 27 L 17 28 C 17 28, 17 28, 17 28 C 18 29, 18 29, 18 29 C 18 30, 18 30, 18 30 L 15 33 C 16 34, 17 35, 18 35 L 21 33 C 21 33, 21 33, 22 33 C 22 33, 22 33, 23 33 C 23 34, 23 34, 23 34 L 24 38 C 25 38, 26 38, 27 38 L 27 34 C 27 34, 28 34, 28 33 C 28 33, 29 33, 29 33 C 29 33, 29 33, 30 33 L 33 35 C 34 35, 34 34, 35 33 L 33 30 C 33 30, 33 30, 33 29 C 33 29, 33 29, 33 28 C 33 28, 33 28, 34 28 L 38 27 C 38 27, 38 26, 38 26 C 38 25, 38 24, 38 24 L 34 23 C 33 23, 33 23, 33 23 C 33 23, 33 22, 33 22 C 33 22, 33 21, 33 21 L 35 18 C 34 17, 34 16, 33 16 L 30 18 C 29 18, 29 18, 29 18 C 29 18, 28 18, 28 18 C 28 17, 27 17, 27 17 L 27 13 C 26 13, 25 13, 24 13 Z M 23 12 C 25 11, 26 11, 28 12 C 28 12, 28 12, 28 12 L 29 16 C 29 16, 29 16, 29 16 L 33 14 C 33 14, 33 14, 33 14 C 35 15, 36 16, 37 17 C 37 17, 37 18, 37 18 L 34 22 C 34 22, 34 22, 34 22 L 39 23 C 39 23, 39 23, 39 23 C 39 24, 39 25, 39 26 C 39 26, 39 27, 39 28 C 39 28, 39 28, 39 28 L 34 29 C 34 29, 34 29, 34 30 L 37 33 C 37 33, 37 34, 37 34 C 36 35, 35 36, 33 37 C 33 37, 33 37, 33 37 L 29 35 C 29 35, 29 35, 29 35 L 28 39 C 28 39, 28 39, 28 40 C 27 40, 26 40, 25 40 C 25 40, 24 40, 23 40 C 23 39, 22 39, 22 39 L 22 35 C 22 35, 21 35, 21 35 L 18 37 C 18 37, 17 37, 17 37 C 16 36, 15 35, 14 34 C 14 34, 14 33, 14 33 L 16 30 C 16 29, 16 29, 16 29 L 12 28 C 12 28, 12 28, 11 28 C 11 27, 11 26, 11 26 C 11 25, 11 24, 11 23 C 12 23, 12 23, 12 23 L 16 22 C 16 22, 16 22, 16 22 L 14 18 C 14 18, 14 17, 14 17 C 15 16, 16 15, 17 14 C 17 14, 18 14, 18 14 L 21 16 C 21 16, 22 16, 22 16 L 22 12 C 22 12, 23 12, 23 12 Z M 41 6 C 41 7, 42 7, 41 7 C 41 8, 41 9, 41 9 L 41 13 L 49 13 L 49 9 C 49 9, 49 8, 49 7 C 48 7, 48 7, 49 6 C 49 6, 50 6, 50 6 C 50 7, 51 8, 51 9 L 51 14 C 51 14, 50 15, 50 15 L 40 15 C 39 15, 39 14, 39 14 L 39 9 C 39 8, 39 7, 40 6 C 40 6, 41 6, 41 6 Z M 2 6 C 3 7, 3 7, 2 7 C 2 8, 2 9, 2 9 L 2 13 L 10 13 L 10 9 C 10 9, 10 8, 10 7 C 10 7, 10 7, 10 6 C 10 6, 11 6, 11 6 C 12 7, 12 8, 12 9 L 12 14 C 12 14, 12 15, 11 15 L 1 15 C 1 15, 0 14, 0 14 L 0 9 C 0 8, 1 7, 1 6 C 2 6, 2 6, 2 6 Z M 45 2 C 44 2, 43 2, 43 3 C 43 4, 44 5, 45 5 C 46 5, 47 4, 47 3 C 47 2, 46 2, 45 2 Z M 6 2 C 5 2, 4 2, 4 3 C 4 4, 5 5, 6 5 C 7 5, 8 4, 8 3 C 8 2, 7 2, 6 2 Z M 24 1 C 27 1, 31 1, 35 3 L 35 1 L 38 5 L 33 5 L 34 4 C 27 2, 20 2, 14 6 C 14 6, 13 6, 13 6 C 13 6, 13 6, 13 6 C 12 5, 12 5, 13 5 C 16 3, 20 1, 24 1 Z M 45 0 C 47 0, 48 1, 48 3 C 48 5, 47 7, 45 7 C 43 7, 42 5, 42 3 C 42 1, 43 0, 45 0 Z M 6 0 C 8 0, 9 1, 9 3 C 9 5, 8 7, 6 7 C 4 7, 3 5, 3 3 C 3 1, 4 0, 6 0 Z"
      }
    ],
    "x": 703,
    "y": 131,
    "width": 428,
    "height": 518
  },
  {
    "id": "sp-0",
    "dataNodeIdx": 0,
    "x": 74,
    "y": 141,
    "width": 71,
    "height": 121,
    "text": "1",
    "textColor": "#3365cc",
    "textSize": 69
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 0,
    "x": 172,
    "y": 159,
    "width": 110,
    "height": 36,
    "text": "Planning",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 0,
    "x": 176,
    "y": 197,
    "width": 420,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 74,
    "y": 265,
    "width": 71,
    "height": 121,
    "text": "2",
    "textColor": "#ff4d38",
    "textSize": 69
  },
  {
    "id": "sp-4",
    "x": 172,
    "y": 284,
    "width": 62,
    "height": 36,
    "text": "Idea",
    "textColor": "#ff4d38",
    "textSize": 16
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 1,
    "x": 176,
    "y": 321,
    "width": 420,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 2,
    "x": 74,
    "y": 391,
    "width": 71,
    "height": 121,
    "text": "3",
    "textColor": "#52c49c",
    "textSize": 69
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 172,
    "y": 410,
    "width": 106,
    "height": 36,
    "text": "Solution",
    "textColor": "#52c49c",
    "textSize": 16
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 2,
    "x": 176,
    "y": 447,
    "width": 420,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 3,
    "x": 74,
    "y": 517,
    "width": 71,
    "height": 121,
    "text": "4",
    "textColor": "#ffb900",
    "textSize": 69
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 2,
    "x": 172,
    "y": 535,
    "width": 107,
    "height": 36,
    "text": "Rebrand",
    "textColor": "#ffb900",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 3,
    "x": 176,
    "y": 573,
    "width": 420,
    "height": 51,
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

export function Imported2025migsopcubedcreativeandexampletemplates16Template({ data }: { data: BrainData }): ReactElement {
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
