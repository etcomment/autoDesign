import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "dataNodeIdx": 0,
    "x": 386,
    "y": 263,
    "width": 98,
    "height": 81,
    "text": "VS"
  },
  {
    "id": "grp-1",
    "isGroup": true,
    "children": [
      {
        "id": "sp-25",
        "x": 92.14548238897396,
        "y": 184.12,
        "width": 269.2802450229709,
        "height": 241.9037037037037,
        "localPctX": 0.018376722817764143,
        "localPctY": 0.08000000000000002,
        "localPctW": 0.9617151607963247,
        "localPctH": 0.837037037037037,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 198 189 L 198 189 C 191 200, 175 210, 162 210 L 108 210 L 108 210 C 94 210, 78 200, 71 189 L 44 142 L 44 142 C 37 130, 37 112, 44 100 L 71 53 L 71 53 C 78 42, 94 32, 108 32 L 162 32 L 162 32 C 175 32, 191 42, 198 53 L 225 100 L 225 100 C 232 112, 232 130, 225 142 L 198 189 Z M 217 21 L 217 21 C 210 9, 194 0, 180 0 L 89 0 L 89 0 C 76 0, 59 9, 52 21 L 7 100 L 7 100 C 0 112, 0 130, 7 142 L 52 221 L 52 221 C 59 232, 76 242, 89 242 L 180 242 L 180 242 C 194 242, 210 232, 217 221 L 263 142 L 263 142 C 269 130, 269 112, 263 100 L 217 21 Z"
      },
      {
        "id": "sp-26",
        "x": 93.43185298621745,
        "y": 165.70962962962963,
        "width": 269.2802450229709,
        "height": 276.15555555555557,
        "localPctX": 0.02297090352220518,
        "localPctY": 0.016296296296296302,
        "localPctW": 0.9617151607963247,
        "localPctH": 0.9555555555555556,
        "fillColor": "#3365cc",
        "text": ""
      },
      {
        "id": "sp-27",
        "x": 87,
        "y": 161,
        "width": 280,
        "height": 289,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 113 55 L 167 55 C 180 55, 196 64, 203 76 L 230 122 C 237 134, 237 153, 230 164 L 203 211 C 196 223, 180 232, 167 232 L 113 232 C 99 232, 83 223, 76 211 L 49 164 C 43 153, 43 134, 49 122 L 76 76 C 83 64, 99 55, 113 55 Z M 94 22 C 81 22, 64 32, 57 43 L 12 122 C 5 134, 5 153, 12 164 L 57 243 C 64 255, 81 264, 94 264 L 185 264 C 199 264, 215 255, 222 243 L 267 164 C 274 153, 274 134, 267 122 L 222 43 C 215 32, 199 22, 185 22 Z M 0 0 L 280 0 L 280 289 L 0 289 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 87,
    "y": 161,
    "width": 280,
    "height": 289
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 93,
    "y": 504,
    "width": 213,
    "height": 26,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 203 0 Q 213 0 213 10 L 213 16 Q 213 26 203 26 L 10 26 Q 0 26 0 16 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 3,
    "x": 93,
    "y": 504,
    "width": 106,
    "height": 26,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 10 0 L 96 0 Q 106 0 106 10 L 106 16 Q 106 26 96 26 L 10 26 Q 0 26 0 16 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 0,
    "x": 311,
    "y": 499,
    "width": 62,
    "height": 36,
    "text": "35%"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 0,
    "x": 87,
    "y": 548,
    "width": 280,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 172,
    "y": 132,
    "width": 111,
    "height": 36,
    "text": "Brand 01"
  },
  {
    "id": "grp-10",
    "isGroup": true,
    "children": [
      {
        "id": "sp-28",
        "x": 505.14548238897396,
        "y": 184.12,
        "width": 269.2802450229709,
        "height": 241.9037037037037,
        "localPctX": 0.018376722817764143,
        "localPctY": 0.08000000000000002,
        "localPctW": 0.9617151607963247,
        "localPctH": 0.837037037037037,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 198 189 L 198 189 C 191 200, 175 210, 162 210 L 108 210 L 108 210 C 94 210, 78 200, 71 189 L 44 142 L 44 142 C 37 130, 37 112, 44 100 L 71 53 L 71 53 C 78 42, 94 32, 108 32 L 162 32 L 162 32 C 175 32, 191 42, 198 53 L 225 100 L 225 100 C 232 112, 232 130, 225 142 L 198 189 Z M 217 21 L 217 21 C 210 9, 194 0, 180 0 L 89 0 L 89 0 C 76 0, 59 9, 52 21 L 7 100 L 7 100 C 0 112, 0 130, 7 142 L 52 221 L 52 221 C 59 232, 76 242, 89 242 L 180 242 L 180 242 C 194 242, 210 232, 217 221 L 263 142 L 263 142 C 269 130, 269 112, 263 100 L 217 21 Z"
      },
      {
        "id": "sp-29",
        "x": 506.43185298621745,
        "y": 165.70962962962963,
        "width": 269.2802450229709,
        "height": 276.15555555555557,
        "localPctX": 0.02297090352220518,
        "localPctY": 0.016296296296296302,
        "localPctW": 0.9617151607963247,
        "localPctH": 0.9555555555555556,
        "fillColor": "#52c49c",
        "text": ""
      },
      {
        "id": "sp-30",
        "x": 500,
        "y": 161,
        "width": 280,
        "height": 289,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 113 55 L 167 55 C 180 55, 196 64, 203 76 L 230 122 C 237 134, 237 153, 230 164 L 203 211 C 196 223, 180 232, 167 232 L 113 232 C 99 232, 83 223, 76 211 L 49 164 C 43 153, 43 134, 49 122 L 76 76 C 83 64, 99 55, 113 55 Z M 94 22 C 81 22, 64 32, 57 43 L 12 122 C 5 134, 5 153, 12 164 L 57 243 C 64 255, 81 264, 94 264 L 185 264 C 199 264, 215 255, 222 243 L 267 164 C 274 153, 274 134, 267 122 L 222 43 C 215 32, 199 22, 185 22 Z M 0 0 L 280 0 L 280 289 L 0 289 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 500,
    "y": 161,
    "width": 280,
    "height": 289
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 506,
    "y": 504,
    "width": 213,
    "height": 26,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 203 0 Q 213 0 213 10 L 213 16 Q 213 26 203 26 L 10 26 Q 0 26 0 16 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-7",
    "x": 506,
    "y": 504,
    "width": 193,
    "height": 26,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 10 0 L 183 0 Q 193 0 193 10 L 193 16 Q 193 26 183 26 L 10 26 Q 0 26 0 16 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 724,
    "y": 499,
    "width": 62,
    "height": 36,
    "text": "95%"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 1,
    "x": 500,
    "y": 548,
    "width": 280,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 1,
    "x": 585,
    "y": 132,
    "width": 111,
    "height": 36,
    "text": "Brand 02"
  },
  {
    "id": "grp-19",
    "isGroup": true,
    "children": [
      {
        "id": "sp-31",
        "x": 918.145482388974,
        "y": 184.12,
        "width": 269.2802450229709,
        "height": 241.9037037037037,
        "localPctX": 0.018376722817764143,
        "localPctY": 0.08000000000000002,
        "localPctW": 0.9617151607963247,
        "localPctH": 0.837037037037037,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 198 189 L 198 189 C 191 200, 175 210, 162 210 L 108 210 L 108 210 C 94 210, 78 200, 71 189 L 44 142 L 44 142 C 37 130, 37 112, 44 100 L 71 53 L 71 53 C 78 42, 94 32, 108 32 L 162 32 L 162 32 C 175 32, 191 42, 198 53 L 225 100 L 225 100 C 232 112, 232 130, 225 142 L 198 189 Z M 217 21 L 217 21 C 210 9, 194 0, 180 0 L 89 0 L 89 0 C 76 0, 59 9, 52 21 L 7 100 L 7 100 C 0 112, 0 130, 7 142 L 52 221 L 52 221 C 59 232, 76 242, 89 242 L 180 242 L 180 242 C 194 242, 210 232, 217 221 L 263 142 L 263 142 C 269 130, 269 112, 263 100 L 217 21 Z"
      },
      {
        "id": "sp-32",
        "x": 919.4318529862175,
        "y": 165.70962962962963,
        "width": 269.2802450229709,
        "height": 276.15555555555557,
        "localPctX": 0.02297090352220518,
        "localPctY": 0.016296296296296302,
        "localPctW": 0.9617151607963247,
        "localPctH": 0.9555555555555556,
        "fillColor": "#ffb900",
        "text": ""
      },
      {
        "id": "sp-33",
        "x": 913,
        "y": 161,
        "width": 280,
        "height": 289,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 113 55 L 167 55 C 180 55, 196 64, 203 76 L 230 122 C 237 134, 237 153, 230 164 L 203 211 C 196 223, 180 232, 167 232 L 113 232 C 99 232, 83 223, 76 211 L 49 164 C 43 153, 43 134, 49 122 L 76 76 C 83 64, 99 55, 113 55 Z M 94 22 C 81 22, 64 32, 57 43 L 12 122 C 5 134, 5 153, 12 164 L 57 243 C 64 255, 81 264, 94 264 L 185 264 C 199 264, 215 255, 222 243 L 267 164 C 274 153, 274 134, 267 122 L 222 43 C 215 32, 199 22, 185 22 Z M 0 0 L 280 0 L 280 289 L 0 289 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 913,
    "y": 161,
    "width": 280,
    "height": 289
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 919,
    "y": 504,
    "width": 213,
    "height": 26,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 203 0 Q 213 0 213 10 L 213 16 Q 213 26 203 26 L 10 26 Q 0 26 0 16 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-12",
    "x": 919,
    "y": 504,
    "width": 157,
    "height": 26,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 10 0 L 147 0 Q 157 0 157 10 L 157 16 Q 157 26 147 26 L 10 26 Q 0 26 0 16 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 2,
    "x": 1137,
    "y": 499,
    "width": 62,
    "height": 36,
    "text": "75%"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 913,
    "y": 548,
    "width": 280,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 2,
    "x": 998,
    "y": 132,
    "width": 111,
    "height": 36,
    "text": "Brand 03"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 797,
    "y": 263,
    "width": 98,
    "height": 81,
    "text": "VS"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 0,
    "x": 176,
    "y": 322,
    "width": 100,
    "height": 58,
    "text": "85%"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 1,
    "x": 589,
    "y": 322,
    "width": 100,
    "height": 58,
    "text": "65%"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 2,
    "x": 1003,
    "y": 322,
    "width": 100,
    "height": 58,
    "text": "25%"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 197,
    "y": 242,
    "width": 60,
    "height": 71,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 58 64 C 55 64, 53 66, 53 69 L 58 69 L 58 64 Z M 2 64 L 2 69 L 7 69 C 7 66, 5 64, 2 64 Z M 45 55 C 44 55, 43 56, 43 57 L 43 57 C 43 59, 44 60, 45 60 L 45 60 C 47 60, 48 59, 48 57 L 48 57 C 48 56, 47 55, 45 55 L 45 55 Z M 15 55 C 14 55, 13 56, 13 57 L 13 57 C 13 59, 14 60, 15 60 L 16 60 C 17 60, 18 59, 18 57 L 18 57 C 18 56, 17 55, 16 55 L 15 55 Z M 45 53 L 45 53 C 48 53, 50 54, 50 57 L 50 57 C 50 60, 48 62, 45 62 L 45 62 C 42 62, 41 60, 41 57 L 41 57 C 41 54, 42 53, 45 53 Z M 15 53 L 16 53 C 18 53, 20 54, 20 57 L 20 57 C 20 60, 18 62, 16 62 L 15 62 C 13 62, 11 60, 11 57 L 11 57 C 11 54, 13 53, 15 53 Z M 30 47 C 31 47, 31 48, 31 48 L 31 49 C 33 50, 35 52, 35 54 C 35 54, 35 55, 34 55 C 33 55, 33 54, 33 54 C 33 53, 32 51, 30 51 C 29 51, 28 53, 28 54 C 28 55, 28 56, 30 56 C 34 56, 35 58, 35 61 C 35 63, 33 64, 31 65 L 31 66 C 31 66, 31 67, 30 67 C 30 67, 29 66, 29 66 L 29 65 C 27 64, 25 63, 25 61 C 25 60, 26 60, 27 60 C 27 60, 28 60, 28 61 C 28 62, 29 63, 30 63 C 32 63, 33 62, 33 61 C 33 59, 32 58, 30 58 C 27 58, 25 56, 25 54 C 25 52, 27 50, 29 49 L 29 48 C 29 48, 30 47, 30 47 Z M 53 45 C 53 48, 55 50, 58 50 L 58 45 L 53 45 Z M 10 45 C 9 49, 6 52, 2 53 L 2 61 C 6 62, 9 65, 10 69 L 50 69 C 51 65, 54 62, 58 61 L 58 53 C 54 52, 51 49, 50 45 L 10 45 Z M 2 45 L 2 50 C 5 50, 7 48, 7 45 L 2 45 Z M 47 12 C 45 14, 41 20, 42 25 C 42 27, 44 29, 46 30 L 46 20 C 46 20, 46 19, 47 19 C 48 19, 48 20, 48 20 L 48 30 C 51 29, 52 27, 52 25 C 53 20, 49 14, 47 12 Z M 46 10 C 47 10, 47 10, 48 10 C 48 10, 56 18, 54 25 C 54 29, 52 31, 48 33 L 48 35 C 48 37, 46 39, 44 39 L 33 39 C 32 39, 31 40, 31 41 L 31 43 L 58 43 C 59 43, 60 44, 60 45 L 60 69 C 60 70, 59 71, 58 71 L 2 71 C 1 71, 0 70, 0 69 L 0 45 C 0 44, 1 43, 2 43 L 29 43 L 29 41 C 29 39, 31 37, 33 37 L 44 37 C 45 37, 46 36, 46 35 L 46 33 C 42 31, 40 29, 40 25 C 38 18, 46 10, 46 10 Z M 11 6 C 9 8, 5 14, 6 19 C 6 21, 7 23, 10 24 L 10 14 C 10 14, 10 13, 11 13 C 11 13, 12 14, 12 14 L 12 24 C 14 23, 16 21, 16 19 C 17 14, 13 8, 11 6 Z M 10 4 C 10 3, 11 3, 12 4 C 12 4, 20 12, 18 19 C 18 22, 16 25, 12 27 L 12 29 C 12 30, 13 31, 14 31 L 27 31 C 29 31, 31 33, 31 35 C 31 36, 31 36, 30 36 C 30 36, 29 36, 29 35 C 29 34, 28 33, 27 33 L 14 33 C 12 33, 10 31, 10 29 L 10 27 C 6 25, 4 22, 4 19 C 2 12, 10 4, 10 4 Z M 30 3 C 28 5, 24 11, 25 16 C 25 18, 27 19, 29 21 L 29 11 C 29 10, 29 10, 30 10 C 31 10, 31 10, 31 11 L 31 21 C 33 19, 35 18, 35 16 C 36 10, 32 5, 30 3 Z M 29 0 C 30 0, 30 0, 31 0 C 31 1, 39 9, 37 16 C 37 19, 35 21, 31 23 L 31 28 C 31 29, 31 29, 30 29 C 29 29, 29 29, 29 28 L 29 23 C 25 21, 23 19, 23 16 C 21 9, 29 1, 29 0 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 612,
    "y": 242,
    "width": 58,
    "height": 71,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 36 65 C 36 65, 37 65, 37 66 C 37 66, 36 67, 36 67 C 35 67, 35 66, 35 66 C 35 65, 35 65, 36 65 Z M 25 65 C 26 65, 26 65, 26 66 C 26 66, 26 67, 25 67 C 24 67, 24 66, 24 66 C 24 65, 24 65, 25 65 Z M 14 65 C 15 65, 15 65, 15 66 C 15 66, 15 67, 14 67 C 13 67, 13 66, 13 66 C 13 65, 13 65, 14 65 Z M 38 29 C 36 29, 34 29, 33 31 C 32 32, 31 34, 31 36 C 31 37, 32 39, 33 40 C 34 42, 36 42, 38 42 C 40 42, 41 42, 43 40 C 45 38, 45 33, 43 31 C 41 29, 40 29, 38 29 Z M 50 22 L 44 29 C 46 31, 47 33, 47 35 L 56 35 C 56 30, 53 25, 50 22 Z M 39 18 L 39 27 C 40 27, 41 27, 43 28 L 48 21 C 45 19, 42 18, 39 18 Z M 37 18 C 27 18, 20 26, 20 36 L 20 58 L 26 50 C 26 50, 26 50, 26 50 C 27 50, 27 50, 27 50 C 30 52, 34 53, 38 53 C 47 53, 55 46, 56 37 L 47 37 C 47 39, 46 40, 44 42 C 43 44, 40 45, 38 45 C 36 45, 35 44, 33 43 L 30 48 C 30 48, 30 48, 29 48 C 29 48, 29 48, 28 48 C 28 48, 28 47, 28 47 L 32 42 C 32 42, 31 42, 31 42 C 30 40, 29 38, 29 36 C 29 33, 30 31, 31 29 C 33 28, 35 27, 37 27 L 37 18 Z M 2 11 L 2 60 L 12 60 C 13 60, 13 61, 13 61 C 13 62, 13 62, 12 62 L 2 62 L 2 65 C 2 67, 4 69, 6 69 L 43 69 C 46 69, 48 67, 48 65 L 48 62 L 26 62 C 26 62, 25 62, 25 61 C 25 61, 26 60, 26 60 L 48 60 L 48 53 C 45 55, 41 56, 38 56 C 34 56, 30 55, 27 52 L 20 62 C 19 62, 19 62, 19 62 C 19 62, 18 62, 18 62 C 18 62, 18 62, 18 61 L 18 36 C 18 25, 27 16, 38 16 C 41 16, 45 17, 48 18 L 48 11 L 2 11 Z M 29 5 C 30 4, 30 4, 31 5 C 31 5, 31 5, 31 6 C 31 6, 31 6, 31 6 C 31 7, 30 7, 30 7 C 30 7, 30 7, 29 6 C 29 6, 29 6, 29 6 C 29 5, 29 5, 29 5 Z M 18 5 C 19 4, 20 4, 20 5 C 20 5, 20 5, 20 6 C 20 6, 20 6, 20 6 C 20 7, 20 7, 19 7 C 19 7, 19 7, 18 6 C 18 6, 18 6, 18 6 C 18 5, 18 5, 18 5 Z M 25 4 C 26 4, 26 5, 26 6 C 26 6, 26 7, 25 7 C 24 7, 24 6, 24 6 C 24 5, 24 4, 25 4 Z M 6 2 C 4 2, 2 4, 2 6 L 2 9 L 48 9 L 48 6 C 48 4, 46 2, 43 2 L 6 2 Z M 6 0 L 43 0 C 47 0, 50 3, 50 6 L 50 20 C 55 23, 58 29, 58 36 C 58 42, 55 48, 50 52 L 50 65 C 50 68, 47 71, 43 71 L 6 71 C 3 71, 0 68, 0 65 L 0 6 C 0 3, 3 0, 6 0 Z"
  },
  {
    "id": "sp-22",
    "x": 1017,
    "y": 242,
    "width": 71,
    "height": 71,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 59 49 C 57 48, 56 48, 55 49 C 55 50, 54 50, 54 51 C 54 51, 54 51, 54 51 C 54 51, 55 51, 55 51 C 55 51, 55 51, 55 51 C 55 51, 55 51, 55 52 C 56 52, 56 52, 56 52 C 56 52, 56 52, 56 52 C 56 52, 57 52, 57 53 C 57 53, 57 53, 57 53 C 57 53, 57 53, 58 53 C 58 53, 58 53, 58 53 C 58 54, 58 54, 58 54 C 58 54, 59 54, 59 54 C 59 54, 59 55, 59 55 C 59 55, 59 55, 59 55 C 60 55, 60 55, 60 56 C 60 56, 61 56, 61 56 C 61 56, 61 57, 61 57 C 61 57, 61 57, 62 57 C 62 58, 62 58, 63 58 C 63 58, 63 58, 63 59 C 63 59, 63 59, 64 59 C 64 60, 64 60, 64 60 C 64 60, 64 60, 64 60 C 64 61, 64 61, 64 61 C 65 61, 65 61, 65 62 C 65 62, 65 62, 65 62 C 65 62, 65 62, 65 63 C 65 63, 65 63, 65 63 C 66 63, 66 63, 66 64 C 66 64, 66 64, 66 64 C 66 63, 67 62, 68 62 C 70 60, 69 58, 64 53 C 62 51, 60 50, 59 49 Z M 51 28 C 52 27, 53 27, 53 28 C 53 28, 53 28, 53 29 C 53 29, 53 29, 53 29 C 53 30, 52 30, 52 30 C 52 30, 52 30, 51 29 C 51 29, 51 29, 51 29 C 51 28, 51 28, 51 28 Z M 52 8 C 55 8, 58 11, 58 14 C 58 17, 56 18, 55 19 C 54 20, 53 20, 53 22 C 53 23, 53 23, 52 23 C 52 23, 51 23, 51 22 C 51 19, 53 18, 54 17 C 55 16, 56 16, 56 14 C 56 12, 54 10, 52 10 C 50 10, 49 12, 49 14 C 49 15, 48 15, 47 15 C 47 15, 46 15, 46 14 C 46 11, 49 8, 52 8 Z M 6 7 C 6 7, 6 7, 6 7 L 6 7 C 6 8, 6 8, 6 8 C 6 8, 6 8, 5 8 C -2 19, 3 33, 20 51 C 38 68, 52 73, 63 66 C 63 65, 63 65, 63 65 C 63 65, 63 65, 63 65 C 63 65, 63 65, 63 65 C 63 65, 63 65, 64 65 C 64 65, 64 65, 64 65 C 64 65, 64 64, 64 64 C 64 64, 64 64, 64 64 C 64 64, 64 64, 64 64 C 63 64, 63 64, 63 64 C 63 64, 63 64, 63 64 C 63 63, 63 63, 63 63 C 63 63, 63 63, 63 63 C 63 63, 63 63, 63 63 C 63 63, 63 63, 63 63 C 63 63, 63 62, 63 62 C 63 62, 63 62, 63 62 C 63 62, 63 62, 63 62 C 62 62, 62 62, 62 62 C 62 62, 62 61, 62 61 C 62 61, 62 61, 62 61 C 62 61, 62 61, 62 61 C 62 61, 62 61, 61 60 C 61 60, 61 60, 61 60 C 61 60, 61 60, 61 60 C 61 60, 61 60, 61 60 C 61 60, 61 59, 60 59 C 60 59, 60 59, 60 59 C 60 59, 60 59, 60 59 C 60 58, 60 58, 60 58 C 59 58, 59 58, 59 58 C 59 58, 59 57, 59 57 C 57 56, 55 54, 54 53 C 54 53, 53 53, 53 53 L 53 53 C 53 53, 52 52, 52 52 C 52 52, 52 52, 52 52 C 52 52, 52 52, 51 52 L 51 52 C 43 57, 36 49, 29 42 C 21 35, 14 28, 19 20 L 19 20 C 19 19, 19 19, 19 19 C 19 19, 19 19, 19 19 C 19 19, 19 19, 19 19 C 19 19, 19 19, 19 19 C 19 19, 19 19, 18 18 C 18 18, 18 18, 18 18 C 18 18, 18 18, 18 18 C 18 18, 18 18, 18 18 C 18 18, 18 18, 18 18 C 18 18, 18 17, 18 17 C 18 17, 18 17, 18 17 C 18 17, 18 17, 18 17 C 18 17, 18 17, 18 17 C 17 17, 17 17, 17 16 C 17 16, 17 16, 17 16 C 17 16, 17 16, 17 16 C 17 16, 17 16, 17 16 C 17 16, 17 16, 17 15 C 17 15, 17 15, 16 15 C 16 15, 16 15, 16 15 C 16 15, 16 15, 16 15 C 16 15, 16 15, 16 14 C 16 14, 16 14, 16 14 C 15 14, 15 14, 15 14 C 15 14, 15 14, 15 14 C 15 14, 15 14, 15 13 C 15 13, 15 13, 15 13 C 15 13, 14 13, 14 13 C 14 13, 14 12, 14 12 C 13 12, 13 12, 13 12 C 13 12, 13 11, 13 11 C 13 11, 13 11, 12 11 C 12 11, 12 11, 12 11 C 12 11, 12 10, 12 10 C 12 10, 12 10, 11 10 C 11 10, 11 10, 11 10 C 11 10, 11 10, 11 10 C 11 9, 11 9, 11 9 C 10 9, 10 9, 10 9 C 10 9, 10 9, 10 9 C 10 9, 10 9, 10 9 C 10 9, 10 9, 9 9 C 9 8, 9 8, 9 8 C 9 8, 9 8, 9 8 C 9 8, 9 8, 9 8 C 9 8, 8 8, 8 8 C 8 8, 8 8, 8 8 C 8 8, 8 8, 8 8 C 8 8, 8 8, 8 8 C 8 8, 7 8, 7 7 C 7 7, 7 7, 7 7 C 7 7, 7 7, 7 7 C 7 7, 7 7, 7 7 C 7 7, 7 7, 7 7 C 7 7, 6 7, 6 7 C 6 7, 6 7, 6 7 Z M 12 2 C 11 2, 10 2, 9 3 C 9 4, 8 5, 7 5 C 7 5, 7 5, 7 5 C 8 5, 8 5, 8 5 C 8 6, 8 6, 8 6 C 9 6, 9 6, 9 6 L 9 6 C 10 6, 10 6, 10 7 C 10 7, 10 7, 11 7 C 11 7, 11 7, 11 7 L 12 7 C 12 8, 12 8, 12 8 C 12 8, 12 8, 13 8 C 13 9, 14 9, 14 10 C 14 10, 14 10, 15 10 C 15 10, 15 11, 15 11 C 15 11, 16 11, 16 11 C 16 12, 16 12, 16 12 C 16 12, 17 12, 17 12 C 17 12, 17 12, 17 12 C 17 13, 17 13, 18 13 C 18 13, 18 13, 18 13 C 18 14, 18 14, 18 14 C 18 14, 18 14, 18 14 C 18 14, 19 15, 19 15 L 19 15 C 19 15, 19 15, 19 16 C 19 16, 19 16, 19 16 C 20 16, 20 16, 20 16 C 20 16, 20 16, 20 17 C 20 17, 20 17, 20 17 C 21 17, 21 16, 22 16 C 24 14, 23 12, 18 7 C 16 5, 14 3, 12 2 Z M 38 2 C 37 2, 36 3, 36 4 L 36 33 C 36 34, 37 35, 38 35 L 60 35 C 60 35, 61 35, 61 36 L 69 42 L 69 4 C 69 3, 68 2, 67 2 L 38 2 Z M 38 0 L 67 0 C 69 0, 71 2, 71 4 L 71 44 C 71 45, 71 45, 70 45 C 70 46, 70 46, 70 46 C 70 46, 69 45, 69 45 L 60 37 L 38 37 C 36 37, 34 36, 34 33 L 34 4 C 34 2, 36 0, 38 0 Z M 11 0 C 14 0, 17 3, 19 5 C 22 9, 27 13, 23 17 C 22 18, 21 19, 21 20 C 17 27, 22 33, 30 41 C 38 49, 44 54, 50 50 C 52 50, 53 49, 54 48 C 55 46, 57 46, 60 47 C 61 48, 63 49, 66 52 C 68 54, 69 56, 70 57 C 71 60, 71 62, 69 63 C 68 65, 66 66, 65 67 C 61 70, 57 71, 52 71 C 43 71, 32 65, 19 52 C 1 34, -4 19, 4 6 C 5 5, 6 3, 8 2 C 9 1, 10 0, 11 0 Z"
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

export function Migso67Template({ data }: { data: BrainData }): ReactElement {
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
