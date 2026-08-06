import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 80,
    "y": 386,
    "width": 1120,
    "height": 12,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 1110 0 Q 1120 0 1120 10 L 1120 2 Q 1120 12 1110 12 L 10 12 Q 0 12 0 2 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "grp-1",
    "isGroup": true,
    "children": [
      {
        "id": "sp-23",
        "x": 113,
        "y": 150,
        "width": 179,
        "height": 240.91603053435117,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.9160305343511451,
        "fillColor": "#3365cc",
        "pathD": "M 179 90 L 179 90 C 179 40, 139 0, 89 0 L 89 0 C 40 0, 0 40, 0 90 L 0 90 C 0 129, 25 162, 59 175 L 89 241 L 120 175 L 120 175 C 154 162, 179 129, 179 90"
      },
      {
        "id": "sp-24",
        "x": 133.78277153558054,
        "y": 170.74554707379139,
        "width": 137.43445692883896,
        "height": 138.5267175572519,
        "localPctX": 0.11610486891385775,
        "localPctY": 0.07888040712468207,
        "localPctW": 0.7677902621722846,
        "localPctH": 0.5267175572519084,
        "pathD": "M 137 69 L 137 69 C 137 108, 107 138, 69 138 L 69 138 C 31 138, 0 108, 0 69 L 0 69 C 0 31, 31 0, 69 0 L 69 0 C 107 0, 137 31, 137 69"
      },
      {
        "id": "sp-25",
        "x": 180.71161048689135,
        "y": 369.5012722646311,
        "width": 43.576779026217224,
        "height": 43.49872773536896,
        "localPctX": 0.3782771535580522,
        "localPctY": 0.8346055979643768,
        "localPctW": 0.24344569288389512,
        "localPctH": 0.16539440203562342,
        "fillColor": "#3365cc",
        "pathD": "M 44 22 L 44 22 C 44 10, 34 0, 22 0 L 22 0 C 10 0, 0 10, 0 22 L 0 22 C 0 34, 10 43, 22 43 L 22 43 C 34 43, 44 34, 44 22"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 113,
    "y": 150,
    "width": 179,
    "height": 263
  },
  {
    "id": "grp-5",
    "isGroup": true,
    "children": [
      {
        "id": "sp-26",
        "x": 332,
        "y": 150,
        "width": 179,
        "height": 240.91603053435117,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.9160305343511451,
        "fillColor": "#ff4d38",
        "pathD": "M 179 90 L 179 90 C 179 40, 139 0, 90 0 L 90 0 C 40 0, 0 40, 0 90 L 0 90 C 0 129, 25 162, 59 175 L 90 241 L 120 175 L 120 175 C 154 162, 179 129, 179 90"
      },
      {
        "id": "sp-27",
        "x": 352.78277153558054,
        "y": 170.74554707379139,
        "width": 137.43445692883896,
        "height": 138.5267175572519,
        "localPctX": 0.11610486891385775,
        "localPctY": 0.07888040712468207,
        "localPctW": 0.7677902621722846,
        "localPctH": 0.5267175572519084,
        "pathD": "M 137 69 L 137 69 C 137 108, 107 138, 69 138 L 69 138 C 31 138, 0 108, 0 69 L 0 69 C 0 31, 31 0, 69 0 L 69 0 C 107 0, 137 31, 137 69"
      },
      {
        "id": "sp-28",
        "x": 399.71161048689135,
        "y": 369.5012722646311,
        "width": 43.576779026217224,
        "height": 43.49872773536896,
        "localPctX": 0.3782771535580522,
        "localPctY": 0.8346055979643768,
        "localPctW": 0.24344569288389512,
        "localPctH": 0.16539440203562342,
        "fillColor": "#ff4d38",
        "pathD": "M 44 22 L 44 22 C 44 10, 34 0, 22 0 L 22 0 C 10 0, 0 10, 0 22 L 0 22 C 0 34, 10 43, 22 43 L 22 43 C 34 43, 44 34, 44 22"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 332,
    "y": 150,
    "width": 179,
    "height": 263
  },
  {
    "id": "grp-9",
    "isGroup": true,
    "children": [
      {
        "id": "sp-29",
        "x": 551,
        "y": 150,
        "width": 179,
        "height": 240.91603053435117,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.9160305343511451,
        "fillColor": "#52c49c",
        "pathD": "M 179 90 L 179 90 C 179 40, 139 0, 90 0 L 90 0 C 40 0, 0 40, 0 90 L 0 90 C 0 129, 25 162, 59 175 L 90 241 L 120 175 L 120 175 C 154 162, 179 129, 179 90"
      },
      {
        "id": "sp-30",
        "x": 571.1123595505618,
        "y": 170.74554707379139,
        "width": 137.43445692883896,
        "height": 138.5267175572519,
        "localPctX": 0.11235955056179772,
        "localPctY": 0.07888040712468207,
        "localPctW": 0.7677902621722846,
        "localPctH": 0.5267175572519084,
        "pathD": "M 137 69 L 137 69 C 137 108, 107 138, 69 138 L 69 138 C 31 138, 0 108, 0 69 L 0 69 C 0 31, 31 0, 69 0 L 69 0 C 107 0, 137 31, 137 69"
      },
      {
        "id": "sp-31",
        "x": 618.0411985018727,
        "y": 369.5012722646311,
        "width": 43.576779026217224,
        "height": 43.49872773536896,
        "localPctX": 0.3745318352059928,
        "localPctY": 0.8346055979643768,
        "localPctW": 0.24344569288389512,
        "localPctH": 0.16539440203562342,
        "fillColor": "#52c49c",
        "pathD": "M 44 22 L 44 22 C 44 10, 34 0, 22 0 L 22 0 C 10 0, 0 10, 0 22 L 0 22 C 0 34, 10 43, 22 43 L 22 43 C 34 43, 44 34, 44 22"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 551,
    "y": 150,
    "width": 179,
    "height": 263
  },
  {
    "id": "grp-13",
    "isGroup": true,
    "children": [
      {
        "id": "sp-32",
        "x": 769,
        "y": 150,
        "width": 179,
        "height": 240.91603053435117,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.9160305343511451,
        "fillColor": "#ffb900",
        "pathD": "M 179 90 L 179 90 C 179 40, 139 0, 89 0 L 89 0 C 40 0, 0 40, 0 90 L 0 90 C 0 129, 25 162, 59 175 L 89 241 L 120 175 L 120 175 C 154 162, 179 129, 179 90"
      },
      {
        "id": "sp-33",
        "x": 789.7827715355807,
        "y": 170.74554707379139,
        "width": 137.43445692883896,
        "height": 138.5267175572519,
        "localPctX": 0.11610486891385838,
        "localPctY": 0.07888040712468207,
        "localPctW": 0.7677902621722846,
        "localPctH": 0.5267175572519084,
        "pathD": "M 137 69 L 137 69 C 137 108, 107 138, 69 138 L 69 138 C 31 138, 0 108, 0 69 L 0 69 C 0 31, 31 0, 69 0 L 69 0 C 107 0, 137 31, 137 69"
      },
      {
        "id": "sp-34",
        "x": 836.7116104868915,
        "y": 369.5012722646311,
        "width": 43.576779026217224,
        "height": 43.49872773536896,
        "localPctX": 0.37827715355805286,
        "localPctY": 0.8346055979643768,
        "localPctW": 0.24344569288389512,
        "localPctH": 0.16539440203562342,
        "fillColor": "#ffb900",
        "pathD": "M 44 22 L 44 22 C 44 10, 34 0, 22 0 L 22 0 C 10 0, 0 10, 0 22 L 0 22 C 0 34, 10 43, 22 43 L 22 43 C 34 43, 44 34, 44 22"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 769,
    "y": 150,
    "width": 179,
    "height": 263
  },
  {
    "id": "grp-17",
    "isGroup": true,
    "children": [
      {
        "id": "sp-35",
        "x": 988,
        "y": 150,
        "width": 179,
        "height": 240.91603053435117,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.9160305343511451,
        "fillColor": "#ee6d90",
        "pathD": "M 179 90 L 179 90 C 179 40, 139 0, 89 0 L 89 0 C 40 0, 0 40, 0 90 L 0 90 C 0 129, 25 162, 59 175 L 89 241 L 120 175 L 120 175 C 154 162, 179 129, 179 90"
      },
      {
        "id": "sp-36",
        "x": 1008.7827715355807,
        "y": 170.74554707379139,
        "width": 137.43445692883896,
        "height": 138.5267175572519,
        "localPctX": 0.11610486891385838,
        "localPctY": 0.07888040712468207,
        "localPctW": 0.7677902621722846,
        "localPctH": 0.5267175572519084,
        "pathD": "M 137 69 L 137 69 C 137 108, 107 138, 69 138 L 69 138 C 31 138, 0 108, 0 69 L 0 69 C 0 31, 31 0, 69 0 L 69 0 C 107 0, 137 31, 137 69"
      },
      {
        "id": "sp-37",
        "x": 1055.7116104868915,
        "y": 369.5012722646311,
        "width": 43.576779026217224,
        "height": 43.49872773536896,
        "localPctX": 0.37827715355805286,
        "localPctY": 0.8346055979643768,
        "localPctW": 0.24344569288389512,
        "localPctH": 0.16539440203562342,
        "fillColor": "#ee6d90",
        "pathD": "M 44 22 L 44 22 C 44 10, 34 0, 22 0 L 22 0 C 10 0, 0 10, 0 22 L 0 22 C 0 34, 10 43, 22 43 L 22 43 C 34 43, 44 34, 44 22"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 988,
    "y": 150,
    "width": 179,
    "height": 263
  },
  {
    "id": "sp-1",
    "x": 178,
    "y": 215,
    "width": 49,
    "height": 50,
    "pathD": "M 7 9 C 8 8, 10 8, 11 9 C 13 10, 13 12, 11 13 C 4 20, 4 32, 11 39 C 15 42, 20 44, 25 44 C 29 44, 34 42, 38 39 C 45 32, 45 20, 38 13 C 36 12, 36 10, 38 9 C 39 8, 41 8, 42 9 C 51 18, 51 34, 42 43 C 37 48, 31 50, 25 50 C 18 50, 12 48, 7 43 C -2 34, -2 18, 7 9 Z M 25 0 C 26 0, 27 1, 27 3 L 27 22 C 27 24, 26 25, 25 25 C 23 25, 22 24, 22 22 L 22 3 C 22 1, 23 0, 25 0 Z"
  },
  {
    "id": "sp-2",
    "x": 389,
    "y": 212,
    "width": 65,
    "height": 56,
    "pathD": "M 43 34 C 44 34, 46 35, 46 37 L 46 49 C 46 51, 44 52, 43 52 C 41 52, 40 51, 40 49 L 40 37 C 40 35, 41 34, 43 34 Z M 31 30 C 34 30, 37 33, 37 37 L 37 53 C 37 55, 36 56, 34 56 C 33 56, 31 55, 31 53 L 31 37 C 31 37, 31 36, 31 36 C 30 36, 30 37, 30 37 L 30 42 C 30 44, 28 45, 27 45 C 25 45, 24 44, 24 42 L 24 37 C 24 33, 27 30, 31 30 Z M 31 20 C 36 20, 41 22, 44 26 C 45 28, 44 30, 43 31 C 41 32, 40 31, 39 30 C 37 27, 34 25, 31 25 C 25 25, 21 30, 21 35 L 21 50 C 21 52, 20 53, 18 53 C 16 53, 15 52, 15 50 L 15 35 C 15 26, 22 20, 31 20 Z M 6 14 C 7 15, 8 17, 7 18 C 6 19, 6 20, 6 20 C 5 21, 4 22, 3 22 C 2 22, 2 22, 1 21 C 0 21, 0 19, 0 17 C 1 17, 1 16, 2 15 C 3 13, 5 13, 6 14 Z M 19 12 C 21 11, 23 12, 23 13 C 24 15, 24 17, 22 17 C 16 21, 11 27, 11 34 L 11 44 C 11 46, 10 47, 8 47 C 7 47, 5 46, 5 44 L 5 34 C 5 25, 11 16, 19 12 Z M 30 10 C 44 10, 55 21, 55 35 L 55 52 C 55 54, 54 55, 52 55 C 51 55, 49 54, 49 52 L 49 35 C 49 24, 41 16, 30 16 C 29 16, 27 14, 27 13 C 27 11, 29 10, 30 10 Z M 30 0 C 49 0, 65 16, 65 35 C 65 37, 64 38, 62 38 C 60 38, 59 37, 59 35 C 59 19, 46 6, 30 6 C 24 6, 18 8, 14 11 C 12 12, 10 12, 9 11 C 8 9, 9 8, 10 7 C 16 2, 23 0, 30 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 615,
    "y": 213,
    "width": 50,
    "height": 55,
    "pathD": "M 11 39 C 8 39, 6 41, 6 44 C 6 47, 8 49, 11 49 C 12 49, 13 48, 14 47 L 16 44 L 15 44 L 15 43 L 14 41 C 13 40, 12 39, 11 39 Z M 39 30 C 37 30, 34 32, 34 35 C 34 37, 37 40, 39 40 C 42 40, 44 37, 44 35 C 44 32, 42 30, 39 30 Z M 44 7 L 21 16 L 21 19 L 44 10 L 44 7 Z M 45 0 C 46 0, 48 0, 48 0 C 49 1, 50 2, 50 3 L 50 34 L 50 35 L 50 35 C 50 41, 45 46, 39 46 C 33 46, 28 41, 28 35 C 28 29, 33 24, 39 24 L 44 26 L 44 17 L 21 26 L 21 43 L 22 44 C 22 50, 17 55, 11 55 C 5 55, 0 50, 0 44 C 0 38, 5 33, 11 33 L 15 35 L 15 14 C 15 13, 16 12, 17 11 L 45 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 838,
    "y": 212,
    "width": 42,
    "height": 55,
    "pathD": "M 3 22 C 5 22, 6 24, 6 25 C 6 33, 13 40, 21 40 C 29 40, 36 33, 36 25 C 36 24, 37 22, 39 22 C 41 22, 42 24, 42 25 C 42 34, 37 41, 29 44 L 24 45 L 24 52 C 24 54, 23 55, 21 55 C 19 55, 18 54, 18 52 L 18 45 L 13 44 C 5 41, 0 34, 0 25 C 0 24, 1 22, 3 22 Z M 21 6 C 18 6, 16 8, 16 10 L 16 25 C 16 27, 18 29, 21 29 C 23 29, 25 27, 25 25 L 25 10 C 25 8, 23 6, 21 6 Z M 21 0 C 27 0, 31 5, 31 10 L 31 25 C 31 30, 27 35, 21 35 C 15 35, 10 30, 10 25 L 10 10 C 10 5, 15 0, 21 0 Z"
  },
  {
    "id": "sp-5",
    "x": 1052,
    "y": 224,
    "width": 51,
    "height": 32,
    "pathD": "M 36 7 C 38 7, 39 9, 39 10 L 39 21 C 39 22, 38 24, 36 24 C 34 24, 33 22, 33 21 L 33 10 C 33 9, 34 7, 36 7 Z M 28 7 C 29 7, 31 9, 31 10 L 31 21 C 31 22, 29 24, 28 24 C 26 24, 25 22, 25 21 L 25 10 C 25 9, 26 7, 28 7 Z M 19 7 C 21 7, 22 9, 22 10 L 22 21 C 22 22, 21 24, 19 24 C 18 24, 17 22, 17 21 L 17 10 C 17 9, 18 7, 19 7 Z M 11 7 C 13 7, 14 9, 14 10 L 14 21 C 14 22, 13 24, 11 24 C 10 24, 8 22, 8 21 L 8 10 C 8 9, 10 7, 11 7 Z M 6 6 L 6 26 L 41 26 L 41 22 C 41 20, 42 19, 44 19 L 45 19 L 45 13 L 44 13 C 42 13, 41 12, 41 10 L 41 6 L 6 6 Z M 2 0 L 44 0 C 46 0, 47 1, 47 3 L 47 7 L 48 7 C 49 7, 51 8, 51 10 L 51 22 C 51 23, 49 25, 48 25 L 47 25 L 47 29 C 47 30, 46 32, 44 32 L 2 32 C 1 32, 0 30, 0 29 L 0 3 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 149,
    "y": 436,
    "width": 108,
    "height": 36,
    "text": "Q1, 2020",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 368,
    "y": 436,
    "width": 108,
    "height": 36,
    "text": "Q2, 2020",
    "textColor": "#ff4d38",
    "textSize": 16
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 2,
    "x": 586,
    "y": 436,
    "width": 108,
    "height": 36,
    "text": "Q3, 2020",
    "textColor": "#52c49c",
    "textSize": 16
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 3,
    "x": 804,
    "y": 436,
    "width": 108,
    "height": 36,
    "text": "Q4, 2020",
    "textColor": "#ffb900",
    "textSize": 16
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 4,
    "x": 1023,
    "y": 436,
    "width": 108,
    "height": 36,
    "text": "Q1, 2021",
    "textColor": "#ee6d90",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 0,
    "x": 126,
    "y": 485,
    "width": 154,
    "height": 36,
    "text": "Milestone 01",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 132,
    "y": 520,
    "width": 141,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 347,
    "y": 485,
    "width": 149,
    "height": 36,
    "text": "Milestone 02",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 351,
    "y": 520,
    "width": 141,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 2,
    "x": 566,
    "y": 485,
    "width": 149,
    "height": 36,
    "text": "Milestone 03",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 2,
    "x": 570,
    "y": 520,
    "width": 141,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 3,
    "x": 784,
    "y": 485,
    "width": 149,
    "height": 36,
    "text": "Milestone 04",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 788,
    "y": 520,
    "width": 141,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 4,
    "x": 1003,
    "y": 485,
    "width": 149,
    "height": 36,
    "text": "Milestone 05",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 4,
    "x": 1007,
    "y": 520,
    "width": 141,
    "height": 99,
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

export function Imported2025migsopcubedcreativeandexampletemplates175Template({ data }: { data: BrainData }): ReactElement {
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
