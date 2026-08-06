import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 153,
    "y": 267,
    "width": 142,
    "height": 236,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 0 0 L 142 43 L 142 193 L 0 236 L 0 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 299,
    "y": 256,
    "width": 156,
    "height": 260,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 0 L 156 48 L 156 212 L 0 260 L 0 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 985,
    "y": 267,
    "width": 142,
    "height": 236,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 0 0 L 142 43 L 142 193 L 0 236 L 0 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 460,
    "y": 238,
    "width": 177,
    "height": 295,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 177 54 L 177 241 L 0 295 L 0 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 642,
    "y": 238,
    "width": 177,
    "height": 295,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 177 54 L 177 241 L 0 295 L 0 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 825,
    "y": 256,
    "width": 156,
    "height": 260,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 0 0 L 156 48 L 156 212 L 0 260 L 0 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 157,
    "y": 508,
    "width": 10,
    "height": 42,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 549,
    "y": 514,
    "width": 10,
    "height": 74,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 978,
    "y": 520,
    "width": 10,
    "height": 42,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 305,
    "y": 210,
    "width": 10,
    "height": 42,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 728,
    "y": 186,
    "width": 10,
    "height": 74,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1123,
    "y": 211,
    "width": 10,
    "height": 52,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 514,
    "y": 350,
    "width": 70,
    "height": 70,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 43 40 C 42 41, 41 42, 40 43 L 40 55 C 47 53, 53 47, 54 40 L 43 40 Z M 15 40 C 17 47, 23 53, 30 55 L 30 43 C 29 42, 28 41, 27 40 L 15 40 Z M 43 37 L 56 37 C 56 37, 56 38, 57 38 C 57 38, 57 38, 57 39 C 55 48, 48 55, 39 57 C 39 57, 39 57, 38 57 C 38 57, 38 57, 38 57 C 38 56, 37 56, 37 56 L 37 43 C 37 42, 38 42, 38 42 C 40 41, 41 40, 42 38 C 42 38, 42 37, 43 37 Z M 14 37 L 27 37 C 28 37, 28 38, 28 38 C 29 40, 30 41, 32 42 C 32 42, 33 42, 33 43 L 33 56 C 33 56, 32 56, 32 57 C 32 57, 32 57, 31 57 C 31 57, 31 57, 31 57 C 22 55, 15 48, 13 39 C 13 38, 13 38, 13 38 C 14 38, 14 37, 14 37 Z M 40 15 L 40 27 C 41 28, 42 29, 43 30 L 54 30 C 53 23, 47 17, 40 15 Z M 30 15 C 23 17, 17 23, 15 30 L 27 30 C 28 29, 29 28, 30 27 L 30 15 Z M 39 13 C 48 15, 55 22, 57 31 C 57 32, 57 32, 57 32 C 56 32, 56 33, 56 33 L 43 33 C 42 33, 42 32, 42 32 C 41 30, 40 29, 38 28 C 38 28, 37 28, 37 27 L 37 14 C 37 14, 38 14, 38 13 C 38 13, 38 13, 39 13 Z M 31 13 C 32 13, 32 13, 32 13 C 32 14, 33 14, 33 14 L 33 27 C 33 28, 32 28, 32 28 C 30 29, 29 30, 28 32 C 28 32, 28 33, 27 33 L 14 33 C 14 33, 14 32, 13 32 C 13 32, 13 32, 13 31 C 15 22, 22 15, 31 13 Z M 32 2 C 32 2, 32 2, 32 3 L 32 7 C 32 8, 31 8, 31 8 C 29 9, 27 9, 25 10 C 25 10, 24 10, 24 9 L 22 5 C 22 5, 21 5, 21 5 C 21 5, 21 5, 21 5 L 16 8 C 16 8, 16 8, 16 8 C 16 8, 16 9, 16 9 L 18 13 C 19 13, 19 14, 18 14 C 17 15, 15 17, 14 18 C 14 19, 13 19, 13 18 L 9 16 C 9 16, 8 16, 8 16 C 8 16, 8 16, 8 16 L 5 21 C 5 21, 5 21, 5 21 C 5 21, 5 22, 6 22 L 9 24 C 10 24, 10 25, 10 25 C 9 27, 9 29, 8 31 C 8 31, 8 32, 7 32 L 3 32 C 2 32, 2 32, 2 32 L 2 38 C 2 38, 2 38, 3 38 L 7 38 C 8 38, 8 39, 8 39 C 9 41, 9 43, 10 45 C 10 45, 10 46, 9 46 L 6 48 C 5 48, 5 49, 5 49 C 5 49, 5 49, 5 49 L 8 54 C 8 54, 8 54, 9 54 L 13 52 C 13 51, 14 52, 14 52 C 15 53, 17 55, 18 56 C 19 56, 19 57, 18 57 L 16 61 C 16 62, 16 62, 16 62 C 16 62, 16 62, 16 62 L 21 65 C 21 65, 21 65, 22 65 L 24 61 C 24 60, 24 60, 25 60 C 25 60, 25 60, 25 60 C 27 61, 29 61, 31 62 C 31 62, 32 62, 32 63 L 32 67 C 32 68, 32 68, 32 68 L 38 68 C 38 68, 38 68, 38 67 L 38 63 C 38 62, 39 62, 39 62 C 41 61, 43 61, 45 60 C 45 60, 46 60, 46 61 L 48 65 C 48 65, 49 65, 49 65 C 49 65, 49 65, 49 65 L 54 62 C 54 62, 54 62, 54 61 L 52 57 C 51 57, 51 56, 52 56 C 53 55, 55 53, 56 52 C 56 52, 57 51, 57 52 L 61 54 C 61 54, 62 54, 62 54 C 62 54, 62 54, 62 54 L 65 49 C 65 49, 65 49, 65 48 L 61 46 C 60 46, 60 45, 60 45 C 61 43, 61 41, 62 39 C 62 39, 62 38, 63 38 L 67 38 C 68 38, 68 38, 68 38 L 68 32 C 68 32, 68 32, 67 32 L 63 32 C 62 32, 62 31, 62 31 C 61 29, 61 27, 60 25 C 60 25, 60 24, 61 24 L 65 22 C 65 21, 65 21, 65 21 L 62 16 C 62 16, 62 16, 62 16 C 62 16, 61 16, 61 16 L 57 18 C 57 19, 56 19, 56 18 C 55 17, 53 15, 52 14 C 51 14, 51 13, 52 13 L 54 9 C 54 8, 54 8, 54 8 L 49 5 C 49 5, 49 5, 49 5 C 49 5, 48 5, 48 5 L 46 9 C 46 10, 45 10, 45 10 C 43 9, 41 9, 39 8 C 39 8, 38 8, 38 7 L 38 3 C 38 2, 38 2, 38 2 L 32 2 Z M 32 0 L 38 0 C 39 0, 40 1, 40 3 L 40 6 C 42 7, 43 7, 45 8 L 47 4 C 47 4, 48 3, 48 3 C 49 3, 50 3, 50 3 L 55 6 C 56 7, 56 8, 56 10 L 54 13 C 55 14, 56 15, 57 16 L 60 14 C 61 14, 62 14, 62 14 C 63 14, 64 15, 64 15 L 67 20 C 67 21, 67 23, 66 24 L 62 25 C 63 27, 63 28, 64 30 L 67 30 C 69 30, 70 31, 70 32 L 70 38 C 70 39, 69 40, 67 40 L 64 40 C 63 42, 63 43, 62 45 L 66 46 C 67 47, 67 49, 67 50 L 64 55 C 64 55, 63 56, 62 56 C 62 56, 61 56, 60 56 L 57 54 C 56 55, 55 56, 54 57 L 56 60 C 56 62, 56 63, 55 64 L 50 67 C 50 67, 49 67, 48 67 C 48 67, 47 66, 47 66 L 45 62 C 43 63, 42 63, 40 64 L 40 67 C 40 69, 39 70, 38 70 L 32 70 C 31 70, 30 69, 30 67 L 30 64 C 28 63, 27 63, 25 62 L 23 66 C 23 66, 23 67, 22 67 C 21 67, 20 67, 20 67 L 15 64 C 15 64, 14 63, 14 62 C 14 62, 14 61, 14 60 L 16 57 C 15 56, 14 55, 13 54 L 10 56 C 8 57, 7 56, 6 55 L 3 50 C 3 50, 3 49, 3 48 C 3 48, 4 47, 5 46 L 8 45 C 7 43, 7 42, 6 40 L 3 40 C 1 40, 0 39, 0 38 L 0 32 C 0 31, 1 30, 3 30 L 6 30 C 7 28, 7 27, 8 25 L 5 24 C 4 23, 3 22, 3 22 C 3 21, 3 20, 3 20 L 6 15 C 6 15, 7 14, 8 14 C 8 14, 9 14, 10 14 L 13 16 C 14 15, 15 14, 16 13 L 14 10 C 14 9, 14 8, 14 8 C 14 7, 15 6, 15 6 L 20 3 C 20 3, 21 3, 22 3 C 23 3, 23 4, 23 4 L 25 8 C 27 7, 28 7, 30 6 L 30 3 C 30 1, 31 0, 32 0 Z"
  },
  {
    "id": "sp-13",
    "x": 699,
    "y": 351,
    "width": 56,
    "height": 70,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 13 58 L 14 65 C 14 67, 16 68, 17 68 L 39 68 C 40 68, 42 67, 42 65 L 43 58 C 39 61, 34 63, 28 63 C 22 63, 17 61, 13 58 Z M 28 53 C 29 53, 29 54, 29 54 L 29 58 C 29 59, 29 59, 28 59 C 28 59, 27 59, 27 58 L 27 54 C 27 54, 28 53, 28 53 Z M 37 51 C 38 50, 38 50, 39 51 L 40 54 C 41 55, 40 55, 40 56 C 40 56, 40 56, 39 56 C 39 56, 39 56, 39 55 L 37 52 C 37 52, 37 51, 37 51 Z M 19 51 C 20 51, 20 52, 20 52 L 18 55 C 17 56, 17 56, 17 56 C 16 56, 16 56, 16 56 C 16 55, 15 55, 16 54 L 18 51 C 18 50, 19 50, 19 51 Z M 45 44 L 48 46 C 49 46, 49 47, 49 47 C 48 47, 48 48, 48 48 C 47 48, 47 48, 47 47 L 44 46 C 43 45, 43 45, 44 44 C 44 44, 44 43, 45 44 Z M 11 44 C 12 43, 12 44, 12 44 C 13 45, 13 45, 12 46 L 9 47 C 9 48, 9 48, 8 48 C 8 48, 8 47, 7 47 C 7 47, 7 46, 8 46 L 11 44 Z M 47 34 L 51 34 C 51 34, 52 35, 52 35 C 52 36, 51 36, 51 36 L 47 36 C 46 36, 46 36, 46 35 C 46 35, 46 34, 47 34 Z M 5 34 L 9 34 C 9 34, 10 35, 10 35 C 10 36, 9 36, 9 36 L 5 36 C 5 36, 4 36, 4 35 C 4 35, 5 34, 5 34 Z M 47 23 C 48 22, 48 23, 49 23 C 49 24, 49 24, 48 25 L 45 26 C 45 26, 45 27, 44 27 C 44 27, 44 26, 44 26 C 43 26, 43 25, 44 25 L 47 23 Z M 9 23 L 12 25 C 13 25, 13 26, 12 26 C 12 26, 12 27, 12 27 C 11 27, 11 26, 11 26 L 8 25 C 7 24, 7 24, 7 23 C 8 23, 8 22, 9 23 Z M 28 21 C 29 21, 29 21, 29 22 L 29 34 L 36 34 C 37 34, 38 35, 38 35 C 38 36, 37 36, 36 36 L 28 36 C 28 36, 27 36, 27 35 L 27 22 C 27 21, 28 21, 28 21 Z M 40 15 C 40 15, 41 16, 40 16 L 39 19 C 38 20, 38 20, 38 20 C 38 20, 37 20, 37 20 C 37 19, 37 19, 37 18 L 39 15 C 39 15, 39 14, 40 15 Z M 16 15 C 17 14, 17 15, 18 15 L 20 18 C 20 19, 20 19, 19 20 C 19 20, 19 20, 19 20 C 18 20, 18 20, 18 19 L 16 16 C 15 16, 16 15, 16 15 Z M 28 12 C 29 12, 29 12, 29 13 L 29 16 C 29 17, 29 17, 28 17 C 28 17, 27 17, 27 16 L 27 13 C 27 12, 28 12, 28 12 Z M 28 9 C 14 9, 2 21, 2 35 C 2 49, 14 61, 28 61 C 42 61, 54 49, 54 35 C 54 21, 42 9, 28 9 Z M 17 2 C 16 2, 14 3, 14 5 L 13 12 C 17 9, 22 7, 28 7 C 34 7, 39 9, 43 12 L 42 5 C 42 3, 40 2, 39 2 L 17 2 Z M 17 0 L 39 0 C 41 0, 43 2, 44 4 L 46 14 C 52 19, 56 26, 56 35 C 56 44, 52 51, 46 57 L 44 66 C 43 68, 41 70, 39 70 L 17 70 C 15 70, 13 68, 12 66 L 10 57 C 4 51, 0 44, 0 35 C 0 26, 4 19, 10 14 L 12 4 C 13 2, 15 0, 17 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1021,
    "y": 351,
    "width": 70,
    "height": 70,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 43 64 L 43 68 L 57 68 L 57 64 L 43 64 Z M 6 37 C 6 37, 7 37, 7 37 C 7 37, 7 38, 7 38 C 7 38, 7 38, 7 39 C 7 39, 7 39, 6 39 C 6 39, 6 39, 6 39 C 5 38, 5 38, 5 38 C 5 38, 5 37, 6 37 Z M 6 25 C 7 25, 7 26, 7 27 C 7 27, 7 28, 6 28 C 6 28, 5 27, 5 27 C 5 26, 6 25, 6 25 Z M 39 23 C 38 23, 36 24, 36 25 L 36 49 C 36 50, 36 50, 36 50 C 36 50, 35 51, 35 50 C 34 50, 32 50, 29 50 C 26 50, 23 52, 23 53 C 23 54, 23 55, 23 55 C 24 55, 26 55, 28 55 C 29 55, 29 55, 30 55 C 33 56, 35 58, 37 60 C 39 61, 41 62, 42 62 L 57 62 L 57 42 C 57 40, 56 40, 55 40 C 54 40, 54 40, 54 40 C 53 40, 53 40, 53 40 C 52 40, 52 39, 52 39 C 52 38, 51 37, 50 37 C 49 37, 49 37, 48 38 C 48 38, 48 38, 47 38 C 47 38, 47 38, 47 38 C 46 36, 44 36, 43 38 C 42 38, 42 38, 41 38 C 41 38, 41 38, 41 37 L 41 25 C 41 24, 40 23, 39 23 Z M 64 21 C 64 21, 65 21, 65 22 L 65 32 C 65 32, 64 33, 64 33 C 63 33, 63 32, 63 32 L 63 22 C 63 21, 63 21, 64 21 Z M 6 15 C 6 14, 7 14, 7 15 C 7 15, 7 15, 7 15 C 7 16, 7 16, 7 16 C 7 16, 7 16, 6 16 C 6 16, 6 16, 6 16 C 5 16, 5 16, 5 15 C 5 15, 5 15, 6 15 Z M 27 12 L 43 12 C 47 12, 50 15, 50 18 L 50 32 C 50 33, 50 33, 49 33 C 49 33, 48 33, 48 32 L 48 18 C 48 16, 46 14, 43 14 L 27 14 C 24 14, 22 16, 22 18 L 22 35 C 22 38, 24 40, 27 40 L 31 40 C 32 40, 32 40, 32 41 C 32 41, 32 42, 31 42 L 27 42 C 23 42, 20 39, 20 35 L 20 18 C 20 15, 23 12, 27 12 Z M 13 2 L 13 51 L 22 51 C 23 49, 26 48, 29 48 C 31 48, 33 48, 34 48 L 34 25 C 34 23, 36 21, 39 21 C 41 21, 43 23, 43 25 L 43 35 C 44 34, 46 35, 47 36 C 48 35, 49 35, 50 35 C 51 35, 53 36, 54 38 C 54 37, 55 37, 55 37 C 57 37, 59 39, 59 42 C 59 42, 59 42, 59 42 L 59 51 L 64 51 C 66 51, 68 49, 68 47 L 68 6 C 68 4, 66 2, 64 2 L 59 2 L 59 35 C 59 36, 59 36, 58 36 C 58 36, 57 36, 57 35 L 57 2 L 13 2 Z M 6 2 C 4 2, 2 4, 2 6 L 2 47 C 2 49, 4 51, 6 51 L 11 51 L 11 2 L 6 2 Z M 6 0 L 64 0 C 67 0, 70 3, 70 6 L 70 47 C 70 50, 67 53, 64 53 L 59 53 L 59 69 C 59 70, 59 70, 58 70 L 42 70 C 41 70, 40 70, 40 69 L 40 64 C 39 64, 38 63, 36 61 C 34 60, 32 58, 29 57 C 28 57, 25 57, 23 57 C 22 57, 22 57, 22 57 C 22 57, 21 56, 21 53 C 21 53, 21 53, 21 53 L 6 53 C 3 53, 0 50, 0 47 L 0 6 C 0 3, 3 0, 6 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 867,
    "y": 350,
    "width": 70,
    "height": 70,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 49 25 C 50 25, 50 26, 50 27 L 50 60 C 50 61, 50 61, 49 61 C 48 61, 48 61, 48 60 L 48 27 C 48 26, 48 25, 49 25 Z M 35 25 C 36 25, 36 26, 36 27 L 36 60 C 36 61, 36 61, 35 61 C 35 61, 34 61, 34 60 L 34 27 C 34 26, 35 25, 35 25 Z M 21 25 C 22 25, 22 26, 22 27 L 22 60 C 22 61, 22 61, 21 61 C 20 61, 20 61, 20 60 L 20 27 C 20 26, 20 25, 21 25 Z M 3 19 C 5 23, 6 28, 6 33 L 6 62 C 6 65, 9 68, 12 68 L 58 68 C 61 68, 64 65, 64 62 L 64 33 C 64 28, 65 23, 67 19 L 3 19 Z M 10 11 C 6 11, 3 13, 2 17 L 68 17 C 67 13, 64 11, 60 11 L 10 11 Z M 28 2 C 24 2, 21 5, 21 9 L 49 9 C 49 5, 46 2, 42 2 L 28 2 Z M 28 0 L 42 0 C 47 0, 51 4, 52 9 L 60 9 C 66 9, 70 13, 70 18 C 70 18, 70 18, 70 19 C 67 23, 66 28, 66 33 L 66 62 C 66 66, 62 70, 58 70 L 12 70 C 8 70, 4 66, 4 62 L 4 33 C 4 28, 3 23, 0 19 C 0 18, 0 18, 0 18 C 0 13, 4 9, 10 9 L 18 9 C 19 4, 23 0, 28 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 342,
    "y": 351,
    "width": 70,
    "height": 70,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 35 48 C 33 48, 31 50, 31 52 C 31 54, 33 55, 35 55 C 37 55, 38 54, 38 52 C 38 50, 37 48, 35 48 Z M 35 46 C 38 46, 40 49, 40 52 C 40 55, 38 58, 35 58 C 32 58, 29 55, 29 52 C 29 49, 32 46, 35 46 Z M 33 36 L 32 41 C 32 41, 32 42, 32 42 C 31 42, 31 42, 30 42 C 30 43, 29 43, 29 42 L 25 39 C 24 40, 23 41, 22 42 L 25 46 C 26 46, 26 47, 25 47 C 25 48, 25 48, 25 49 C 25 49, 24 49, 24 49 L 19 50 C 19 51, 19 51, 19 52 C 19 53, 19 53, 19 54 L 24 55 C 24 55, 25 55, 25 55 C 25 56, 25 56, 25 57 C 26 57, 26 57, 25 58 L 22 62 C 23 63, 24 64, 25 64 L 29 61 C 29 61, 30 61, 30 61 C 31 62, 31 62, 32 62 C 32 62, 32 62, 32 63 L 33 68 C 34 68, 35 68, 37 68 L 37 63 C 38 62, 38 62, 38 62 C 39 62, 39 62, 39 61 C 40 61, 40 61, 41 61 L 45 64 C 46 64, 46 63, 47 62 L 44 58 C 44 57, 44 57, 44 57 C 44 56, 45 56, 45 55 C 45 55, 45 55, 46 55 L 51 54 C 51 53, 51 53, 51 52 C 51 51, 51 51, 51 50 L 46 49 C 45 49, 45 49, 45 49 C 45 48, 44 48, 44 47 C 44 47, 44 46, 44 46 L 47 42 C 46 41, 46 40, 45 39 L 41 42 C 40 43, 40 43, 39 42 C 39 42, 39 42, 38 42 C 38 42, 38 41, 37 41 L 37 36 C 35 36, 34 36, 33 36 Z M 32 34 C 34 34, 36 34, 38 34 C 38 34, 39 34, 39 35 L 39 40 C 40 40, 40 40, 40 40 L 44 37 C 44 37, 45 37, 45 37 C 47 38, 48 40, 49 41 C 50 42, 50 42, 49 43 L 46 47 C 46 47, 46 47, 47 47 L 52 48 C 52 48, 52 49, 53 49 C 53 50, 53 51, 53 52 C 53 53, 53 54, 53 55 C 52 55, 52 56, 52 56 L 47 57 C 46 57, 46 57, 46 57 L 49 61 C 50 62, 50 62, 49 62 C 48 64, 47 65, 45 67 C 45 67, 44 67, 44 67 L 40 64 C 40 64, 40 64, 39 64 L 39 69 C 39 69, 38 70, 38 70 C 37 70, 36 70, 35 70 C 34 70, 33 70, 32 70 C 31 70, 31 69, 31 69 L 30 64 C 30 64, 30 64, 30 64 L 26 67 C 25 67, 25 67, 24 67 C 23 65, 21 64, 20 62 C 20 62, 20 62, 20 61 L 23 57 C 23 57, 23 57, 23 57 L 18 56 C 18 56, 17 55, 17 55 C 17 54, 17 53, 17 52 C 17 51, 17 50, 17 49 C 17 49, 18 48, 18 48 L 23 47 C 23 47, 23 47, 23 47 L 20 43 C 20 42, 20 42, 20 41 C 21 40, 23 38, 24 37 C 25 37, 25 37, 26 37 L 30 40 C 30 40, 30 40, 30 40 L 31 35 C 31 34, 31 34, 32 34 Z M 8 25 L 25 25 C 26 25, 26 26, 26 27 C 26 27, 26 28, 25 28 L 8 28 C 8 28, 7 27, 7 27 C 7 26, 8 25, 8 25 Z M 37 17 L 54 17 C 54 17, 55 17, 55 18 C 55 19, 54 19, 54 19 L 37 19 C 36 19, 36 19, 36 18 C 36 17, 36 17, 37 17 Z M 11 11 L 11 17 L 24 17 C 26 17, 28 18, 29 19 L 34 24 C 35 25, 36 25, 38 25 L 59 25 L 59 11 L 11 11 Z M 7 2 C 4 2, 2 4, 2 7 L 2 19 C 3 18, 5 17, 7 17 L 9 17 L 9 9 C 9 9, 9 8, 10 8 L 60 8 C 61 8, 61 9, 61 9 L 61 25 L 63 25 C 65 25, 67 26, 68 27 L 68 7 C 68 4, 66 2, 63 2 L 7 2 Z M 7 0 L 63 0 C 67 0, 70 3, 70 7 L 70 55 C 70 58, 67 61, 63 61 L 53 61 C 53 61, 52 61, 52 60 C 52 60, 53 59, 53 59 L 63 59 C 66 59, 68 57, 68 55 L 68 32 C 68 30, 66 27, 63 27 L 38 27 C 36 27, 34 27, 32 25 L 28 21 C 27 20, 25 19, 24 19 L 7 19 C 4 19, 2 21, 2 24 L 2 55 C 2 57, 4 59, 7 59 L 17 59 C 17 59, 18 60, 18 60 C 18 61, 17 61, 17 61 L 7 61 C 3 61, 0 58, 0 55 L 0 7 C 0 3, 3 0, 7 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 189,
    "y": 351,
    "width": 70,
    "height": 70,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 46 48 C 42 48, 39 51, 39 54 C 39 54, 39 55, 38 55 C 38 55, 38 55, 37 54 C 37 54, 36 54, 35 54 C 33 54, 32 55, 32 57 C 32 57, 32 58, 32 58 C 33 59, 33 59, 32 59 C 32 60, 32 60, 32 60 C 30 60, 28 62, 28 64 C 28 66, 30 68, 32 68 L 55 68 C 58 68, 60 65, 60 62 C 60 59, 57 56, 53 57 C 53 57, 53 57, 52 57 C 52 57, 52 56, 52 56 C 52 55, 52 55, 52 55 C 52 51, 49 48, 46 48 Z M 24 31 C 18 31, 13 36, 13 42 C 13 42, 13 43, 14 44 C 14 44, 14 44, 13 44 C 13 45, 13 45, 12 45 C 12 45, 11 45, 11 45 C 6 45, 2 48, 2 53 C 2 58, 6 62, 11 62 L 27 62 C 27 60, 29 59, 30 58 C 30 58, 30 57, 30 57 C 30 54, 32 51, 35 51 C 36 51, 37 52, 37 52 C 38 49, 41 46, 44 46 C 44 46, 44 45, 44 45 C 44 42, 42 40, 39 40 C 38 40, 37 40, 36 41 C 35 41, 35 41, 35 41 C 34 41, 34 41, 34 40 C 33 35, 29 31, 24 31 Z M 40 17 C 33 17, 27 23, 26 29 C 31 30, 34 34, 36 38 C 37 38, 38 37, 39 37 C 42 37, 45 39, 46 42 C 50 40, 53 35, 53 30 C 53 23, 47 17, 40 17 Z M 40 15 C 48 15, 55 22, 55 30 C 55 36, 51 41, 46 44 C 47 44, 47 45, 47 45 C 47 45, 47 46, 46 46 C 51 46, 54 50, 54 55 C 54 55, 54 55, 54 55 C 59 55, 62 58, 62 62 C 62 67, 59 70, 55 70 L 32 70 C 29 70, 26 67, 26 64 C 26 64, 26 64, 26 64 L 11 64 C 5 64, 0 59, 0 53 C 0 47, 5 42, 11 42 C 11 42, 11 42, 11 42 C 11 35, 17 29, 24 29 C 24 29, 24 29, 24 29 C 25 21, 32 15, 40 15 Z M 39 0 C 39 0, 40 0, 40 0 L 49 9 L 60 9 C 61 9, 61 9, 61 10 L 61 21 L 70 29 C 70 30, 70 30, 70 30 C 70 30, 70 31, 70 31 L 61 39 L 61 51 C 61 51, 61 52, 60 52 L 57 52 C 56 52, 56 51, 56 51 C 56 50, 56 50, 57 50 L 59 50 L 59 39 C 59 38, 59 38, 60 38 L 67 30 L 60 22 C 59 22, 59 22, 59 22 L 59 11 L 48 11 C 48 11, 48 11, 48 10 L 40 3 L 32 10 C 32 11, 31 11, 31 11 L 20 11 L 20 22 C 20 22, 20 22, 20 22 L 12 30 L 13 31 C 13 31, 13 32, 13 32 C 12 33, 12 33, 11 32 L 10 31 C 9 31, 9 30, 10 29 L 18 21 L 18 10 C 18 9, 18 9, 19 9 L 31 9 L 39 0 Z"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 148,
    "y": 556,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 0,
    "x": 152,
    "y": 590,
    "width": 270,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 5,
    "x": 969,
    "y": 565,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 973,
    "y": 600,
    "width": 270,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 4,
    "x": 539,
    "y": 585,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-23",
    "x": 543,
    "y": 620,
    "width": 337,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 205,
    "y": 125,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 0,
    "x": 32,
    "y": 160,
    "width": 281,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 2,
    "x": 1023,
    "y": 125,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 1,
    "x": 850,
    "y": 160,
    "width": 281,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 1,
    "x": 627,
    "y": 100,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-29",
    "x": 422,
    "y": 135,
    "width": 312,
    "height": 43,
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

export function Migso32Template({ data }: { data: BrainData }): ReactElement {
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
