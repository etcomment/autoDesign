import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 949,
    "y": 336,
    "width": 253,
    "height": 307,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "pathD": "M 0 77 L 152 77 L 152 0 L 253 154 L 152 307 L 152 230 L 0 230 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 729,
    "y": 380,
    "width": 253,
    "height": 218,
    "fillColor": "#ee6d90",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 512,
    "y": 380,
    "width": 253,
    "height": 218,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-3",
    "x": 511,
    "y": 163,
    "width": 221,
    "height": 254,
    "fillColor": "#52c49c",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 292,
    "y": 163,
    "width": 253,
    "height": 218,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 75,
    "y": 163,
    "width": 253,
    "height": 218,
    "fillColor": "#3365cc",
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 143,
    "y": 195,
    "width": 81,
    "height": 81,
    "fillColor": "#ffffff",
    "pathD": "M 55 57 C 53 57, 51 58, 51 61 C 51 62, 52 63, 52 63 C 53 64, 53 64, 53 64 L 51 71 L 58 71 L 57 64 C 57 64, 57 64, 57 63 C 58 63, 59 62, 59 61 C 59 58, 57 57, 55 57 Z M 55 54 C 58 54, 61 57, 61 61 C 61 62, 61 63, 60 64 L 61 72 C 61 72, 61 72, 61 72 C 61 73, 60 73, 60 73 L 50 73 C 50 73, 49 73, 49 72 C 49 72, 49 72, 49 72 L 50 64 C 49 63, 49 62, 49 61 C 49 57, 51 54, 55 54 Z M 26 54 L 35 54 C 36 54, 37 55, 37 56 C 37 56, 36 57, 35 57 L 26 57 C 26 57, 25 56, 25 56 C 25 55, 26 54, 26 54 Z M 8 54 L 20 54 C 21 54, 21 55, 21 56 C 21 56, 21 57, 20 57 L 8 57 C 8 57, 7 56, 7 56 C 7 55, 8 54, 8 54 Z M 55 48 C 47 48, 40 55, 40 63 C 40 72, 47 79, 55 79 C 64 79, 70 72, 70 63 C 70 55, 64 48, 55 48 Z M 35 46 L 42 46 C 43 46, 43 46, 43 47 C 43 48, 43 48, 42 48 L 35 48 C 34 48, 34 48, 34 47 C 34 46, 34 46, 35 46 Z M 22 46 L 29 46 C 29 46, 30 46, 30 47 C 30 48, 29 48, 29 48 L 22 48 C 21 48, 20 48, 20 47 C 20 46, 21 46, 22 46 Z M 9 46 L 16 46 C 17 46, 17 46, 17 47 C 17 48, 17 48, 16 48 L 9 48 C 8 48, 8 48, 8 47 C 8 46, 8 46, 9 46 Z M 11 32 C 10 32, 10 32, 10 33 L 10 36 C 10 37, 10 37, 11 37 L 16 37 C 16 37, 17 37, 17 36 L 17 33 C 17 32, 16 32, 16 32 L 11 32 Z M 11 29 L 16 29 C 18 29, 19 31, 19 33 L 19 36 C 19 38, 18 40, 16 40 L 11 40 C 9 40, 7 38, 7 36 L 7 33 C 7 31, 9 29, 11 29 Z M 65 27 L 65 43 L 76 43 C 78 43, 79 42, 79 40 L 79 27 L 65 27 Z M 4 22 C 3 22, 2 23, 2 24 L 2 60 C 2 61, 3 62, 4 62 L 38 62 C 38 53, 46 46, 55 46 C 58 46, 60 46, 62 47 L 62 24 C 62 23, 61 22, 60 22 L 4 22 Z M 19 14 L 19 20 L 60 20 C 63 20, 65 22, 65 24 L 65 25 L 79 25 L 79 14 L 19 14 Z M 21 2 C 20 2, 19 3, 19 5 L 19 11 L 79 11 L 79 5 C 79 3, 78 2, 76 2 L 21 2 Z M 21 0 L 76 0 C 79 0, 81 2, 81 5 L 81 40 C 81 43, 79 45, 76 45 L 65 45 L 65 49 C 70 52, 73 57, 73 63 C 73 73, 65 81, 55 81 C 46 81, 38 74, 38 65 L 4 65 C 2 65, 0 63, 0 60 L 0 24 C 0 22, 2 20, 4 20 L 16 20 L 16 5 C 16 2, 18 0, 21 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 581,
    "y": 429,
    "width": 81,
    "height": 81,
    "fillColor": "#ffffff",
    "pathD": "M 32 46 L 32 75 C 32 77, 34 78, 36 78 C 38 78, 39 77, 39 75 L 39 52 C 39 51, 40 51, 40 51 C 41 51, 41 51, 41 52 L 41 65 C 41 67, 43 68, 45 68 C 47 68, 48 67, 48 65 L 48 46 L 32 46 Z M 66 38 C 66 38, 67 38, 68 38 L 81 51 C 81 52, 81 52, 81 53 C 81 53, 80 53, 80 53 L 73 53 L 73 80 C 73 80, 73 81, 72 81 C 71 81, 71 80, 71 80 L 71 52 C 71 52, 71 51, 72 51 L 77 51 L 67 41 L 57 51 L 61 51 C 62 51, 63 52, 63 52 L 63 80 C 63 80, 62 81, 61 81 C 61 81, 60 80, 60 80 L 60 53 L 54 53 C 53 53, 53 53, 52 53 C 52 52, 52 52, 53 51 L 66 38 Z M 40 38 C 41 38, 42 38, 42 39 C 42 40, 41 40, 40 40 C 40 40, 39 40, 39 39 C 39 38, 40 38, 40 38 Z M 40 31 C 41 31, 42 32, 42 32 C 42 33, 41 34, 40 34 C 40 34, 39 33, 39 32 C 39 32, 40 31, 40 31 Z M 40 25 C 41 25, 42 25, 42 26 C 42 27, 41 27, 40 27 C 40 27, 39 27, 39 26 C 39 25, 40 25, 40 25 Z M 13 25 C 14 24, 15 24, 15 25 L 28 38 C 29 38, 29 39, 28 39 C 28 40, 28 40, 27 40 L 21 40 L 21 79 C 21 80, 20 81, 20 81 C 19 81, 18 80, 18 79 L 18 39 C 18 38, 19 38, 20 38 L 24 38 L 14 27 L 4 38 L 9 38 C 10 38, 10 38, 10 39 L 10 79 C 10 80, 10 81, 9 81 C 8 81, 8 80, 8 79 L 8 40 L 1 40 C 1 40, 0 40, 0 39 C 0 39, 0 38, 0 38 L 13 25 Z M 14 6 C 14 6, 13 6, 13 6 C 13 7, 12 7, 12 8 C 12 9, 12 9, 13 10 L 30 27 C 32 28, 32 30, 32 32 L 32 44 L 48 44 L 48 32 C 48 30, 49 28, 50 27 L 68 10 C 68 9, 68 9, 68 8 C 68 7, 68 7, 68 6 C 67 5, 65 6, 64 6 L 53 18 C 51 20, 49 21, 46 21 L 34 21 C 32 21, 30 20, 28 18 L 16 6 C 16 6, 15 6, 14 6 Z M 15 3 C 16 3, 17 4, 18 5 L 30 16 C 31 18, 32 18, 34 18 L 46 18 C 48 18, 50 18, 51 16 L 62 5 C 63 4, 65 3, 66 3 C 67 3, 68 4, 69 4 C 70 5, 71 6, 71 8 C 71 9, 70 10, 69 11 L 52 29 C 51 30, 51 31, 51 32 L 51 65 C 51 68, 48 71, 45 71 C 44 71, 42 70, 41 70 L 41 75 C 41 75, 41 75, 41 75 C 41 78, 39 81, 36 81 C 32 81, 30 78, 30 75 L 30 32 C 30 31, 29 30, 28 29 L 11 11 C 10 10, 10 9, 10 8 C 10 6, 10 5, 12 4 C 12 4, 14 3, 15 3 Z M 40 2 C 37 2, 35 5, 35 7 C 35 10, 37 13, 40 13 C 43 13, 45 10, 45 7 C 45 5, 43 2, 40 2 Z M 40 0 C 44 0, 48 3, 48 7 C 48 12, 44 15, 40 15 C 36 15, 33 12, 33 7 C 33 3, 36 0, 40 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 378,
    "y": 195,
    "width": 80,
    "height": 77,
    "fillColor": "#ffffff",
    "pathD": "M 48 68 C 49 68, 49 69, 49 69 C 49 70, 49 71, 48 71 C 47 71, 47 70, 47 69 C 47 69, 47 68, 48 68 Z M 8 68 C 8 68, 9 69, 9 69 C 9 70, 8 71, 8 71 C 7 71, 6 70, 6 69 C 6 69, 7 68, 8 68 Z M 48 64 C 45 64, 43 66, 43 69 C 43 72, 45 75, 48 75 C 51 75, 54 72, 54 69 C 54 66, 51 64, 48 64 Z M 8 64 C 5 64, 2 66, 2 69 C 2 72, 5 75, 8 75 C 11 75, 13 72, 13 69 C 13 66, 11 64, 8 64 Z M 8 62 C 12 62, 15 64, 15 68 L 41 68 C 41 64, 44 62, 48 62 C 53 62, 56 65, 56 69 C 56 74, 53 77, 48 77 C 44 77, 41 74, 41 70 L 15 70 C 15 74, 12 77, 8 77 C 3 77, 0 74, 0 69 C 0 65, 3 62, 8 62 Z M 42 34 L 47 34 C 47 34, 48 35, 48 36 C 48 36, 47 37, 47 37 L 42 37 C 41 37, 40 36, 40 36 C 40 35, 41 34, 42 34 Z M 17 34 L 22 34 C 22 34, 23 35, 23 36 C 23 36, 22 37, 22 37 L 17 37 C 16 37, 16 36, 16 36 C 16 35, 16 34, 17 34 Z M 33 25 C 33 25, 34 26, 34 26 L 34 27 C 35 28, 37 29, 37 30 C 37 31, 37 32, 36 32 C 36 32, 35 32, 35 31 C 34 30, 34 30, 32 29 C 32 29, 31 30, 31 30 C 30 30, 30 31, 30 31 C 30 32, 30 33, 30 33 C 30 34, 31 34, 32 34 C 34 34, 35 35, 36 36 C 36 37, 37 38, 37 39 C 37 40, 36 42, 35 42 C 34 43, 33 43, 33 43 L 32 44 C 32 45, 32 45, 31 45 L 31 45 C 30 45, 30 45, 30 44 L 30 43 C 29 43, 27 42, 27 40 C 27 39, 27 39, 28 38 C 28 38, 29 39, 29 39 C 29 40, 30 41, 32 41 C 32 41, 33 41, 33 40 C 34 40, 34 39, 34 39 C 34 38, 34 38, 34 37 C 33 37, 33 36, 32 36 C 30 36, 29 35, 28 35 C 27 34, 27 33, 27 31 C 27 30, 28 29, 29 28 C 30 27, 31 27, 31 27 L 31 26 C 32 25, 32 25, 33 25 Z M 17 23 C 16 27, 14 29, 10 30 L 10 41 C 14 41, 16 44, 17 47 L 43 47 C 44 44, 47 41, 51 41 L 53 29 C 52 29, 51 28, 50 27 C 49 26, 48 25, 49 23 L 17 23 Z M 16 21 L 50 21 C 50 21, 51 21, 51 21 C 51 22, 51 22, 51 22 C 51 24, 51 25, 52 26 C 52 27, 53 27, 55 27 C 55 27, 55 27, 56 27 C 56 28, 56 28, 56 29 L 53 42 C 53 43, 52 43, 51 43 C 48 43, 45 45, 45 48 C 45 49, 44 49, 44 49 L 16 49 C 15 49, 14 49, 14 48 C 14 45, 12 43, 9 43 C 9 43, 8 42, 8 42 L 8 29 C 8 28, 9 28, 9 28 C 12 28, 14 25, 14 22 C 14 22, 15 21, 16 21 Z M 8 15 C 5 15, 2 18, 2 21 L 2 50 C 2 53, 5 55, 8 55 L 50 55 C 53 55, 56 53, 56 50 L 65 15 L 8 15 Z M 69 0 L 79 0 C 79 0, 80 1, 80 1 C 80 2, 79 2, 79 2 L 70 2 L 59 50 C 58 54, 54 57, 50 57 L 8 57 C 3 57, 0 54, 0 50 L 0 21 C 0 16, 3 13, 8 13 L 65 13 L 68 1 C 68 0, 69 0, 69 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 584,
    "y": 194,
    "width": 75,
    "height": 75,
    "fillColor": "#ffffff",
    "pathD": "M 10 72 L 15 57 L 60 57 L 65 72 L 10 72 Z M 30 6 L 30 6 C 30 4, 32 3, 34 3 L 41 3 C 43 3, 45 4, 45 6 L 49 18 L 26 18 L 30 6 Z M 25 20 L 49 20 L 51 27 L 23 27 L 25 20 Z M 23 30 L 52 30 L 57 45 L 18 45 L 23 30 Z M 18 48 L 57 48 L 59 55 L 15 55 L 18 48 Z M 74 72 L 67 72 L 47 5 C 46 2, 44 0, 41 0 L 34 0 C 31 0, 28 2, 27 5 L 8 72 L 1 72 C 0 72, 0 73, 0 74 C 0 74, 0 75, 1 75 L 74 75 C 74 75, 75 74, 75 74 C 75 73, 74 72, 74 72 Z"
  },
  {
    "id": "sp-10",
    "x": 816,
    "y": 429,
    "width": 61,
    "height": 81,
    "fillColor": "#ffffff",
    "pathD": "M 19 74 C 20 77, 22 79, 24 79 L 37 79 C 39 79, 42 77, 42 74 L 19 74 Z M 15 61 C 16 61, 16 62, 16 63 L 16 71 C 16 72, 16 72, 16 72 L 45 72 C 45 72, 46 72, 46 71 L 46 68 L 21 68 C 20 68, 20 67, 20 66 C 20 66, 20 65, 21 65 L 46 65 L 46 63 C 46 62, 46 61, 46 61 L 15 61 Z M 24 47 L 27 58 L 35 58 L 37 47 L 24 47 Z M 28 24 C 25 28, 22 33, 22 38 C 22 41, 22 43, 23 45 L 29 45 C 26 37, 27 29, 28 24 Z M 31 23 C 30 27, 28 36, 31 45 L 38 45 C 39 43, 40 41, 40 38 C 40 32, 34 25, 31 23 Z M 31 8 C 32 8, 33 8, 34 9 L 35 11 C 36 11, 36 11, 37 11 L 39 11 C 40 10, 41 10, 42 11 C 43 11, 44 12, 44 13 L 44 16 C 45 16, 45 17, 45 17 L 48 17 C 49 18, 50 18, 50 19 C 51 20, 51 21, 51 22 L 50 25 C 50 25, 50 26, 50 26 L 52 28 C 53 28, 53 29, 53 30 C 53 31, 53 32, 52 33 L 50 35 C 50 35, 50 36, 50 36 L 52 41 C 52 42, 51 42, 51 43 C 51 43, 50 43, 50 43 C 50 43, 49 42, 49 42 L 48 37 C 47 35, 48 34, 49 33 L 51 31 C 51 31, 51 31, 51 30 C 51 30, 51 30, 51 29 L 49 28 C 48 27, 47 25, 48 24 L 48 21 C 48 21, 48 21, 48 20 C 48 20, 48 20, 47 20 L 45 19 C 44 19, 42 18, 42 16 L 42 14 C 41 13, 41 13, 41 13 C 41 13, 40 13, 40 13 L 37 14 C 36 14, 35 14, 34 13 L 32 11 C 31 10, 30 10, 30 11 L 28 13 C 27 14, 26 14, 24 14 L 22 13 C 22 13, 21 13, 21 13 C 21 13, 20 13, 20 14 L 20 16 C 19 18, 18 19, 17 19 L 14 20 C 14 20, 14 20, 14 20 C 13 21, 13 21, 13 21 L 14 24 C 15 25, 14 27, 13 28 L 11 29 C 11 30, 11 30, 11 30 C 11 31, 11 31, 11 31 L 13 33 C 14 34, 15 35, 14 37 L 13 42 C 12 43, 12 43, 11 43 C 10 42, 10 42, 10 41 L 12 36 C 12 36, 12 35, 12 35 L 10 33 C 9 32, 8 31, 8 30 C 8 29, 9 28, 10 28 L 12 26 C 12 26, 12 25, 12 25 L 11 22 C 11 21, 11 20, 11 19 C 12 18, 13 18, 14 17 L 16 17 C 17 17, 17 16, 17 16 L 18 13 C 18 12, 19 11, 20 11 C 21 10, 22 10, 23 11 L 25 11 C 26 11, 26 11, 26 11 L 28 9 C 29 8, 30 8, 31 8 Z M 31 3 C 15 3, 2 15, 2 31 C 2 38, 5 45, 11 51 C 13 53, 14 56, 15 58 L 24 58 L 22 46 C 20 44, 19 41, 19 38 C 19 29, 29 20, 30 20 C 30 19, 31 19, 31 20 C 32 20, 42 29, 42 38 C 42 41, 41 44, 40 46 L 37 58 L 46 58 C 47 55, 48 53, 51 50 C 56 45, 59 38, 59 31 C 59 15, 46 3, 31 3 Z M 31 0 C 47 0, 61 14, 61 31 C 61 39, 58 46, 52 52 C 50 55, 48 59, 48 63 L 48 71 C 48 73, 47 74, 45 74 L 45 74 C 44 78, 41 81, 37 81 L 24 81 C 20 81, 17 78, 17 74 L 16 74 C 14 74, 13 73, 13 71 L 13 63 C 13 59, 12 55, 9 52 C 3 47, 0 39, 0 31 C 0 14, 14 0, 31 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1021,
    "y": 429,
    "width": 81,
    "height": 81,
    "fillColor": "#ffffff",
    "pathD": "M 44 37 C 45 37, 46 37, 46 38 C 46 43, 45 48, 41 51 C 38 54, 35 56, 31 56 C 29 56, 27 55, 25 54 L 24 56 L 21 50 L 27 51 L 26 52 C 31 54, 36 53, 40 49 C 43 47, 44 42, 43 38 C 43 38, 44 37, 44 37 Z M 38 25 L 41 31 L 34 30 L 35 29 C 31 27, 25 28, 22 31 C 19 34, 18 39, 18 43 C 18 43, 18 44, 17 44 C 17 44, 17 44, 17 44 C 17 44, 16 44, 16 43 C 15 38, 17 33, 20 30 C 25 26, 31 24, 37 27 L 38 25 Z M 29 12 C 28 12, 28 12, 28 12 L 28 16 C 28 17, 28 17, 27 18 C 26 18, 24 18, 22 19 C 22 19, 21 19, 21 18 L 19 15 C 19 15, 19 15, 19 15 L 15 17 C 15 17, 15 17, 15 17 L 17 21 C 17 21, 17 22, 16 22 C 15 23, 14 25, 13 26 C 12 26, 12 26, 11 26 L 8 24 C 8 24, 7 24, 7 24 L 5 28 C 5 28, 5 28, 5 28 L 9 30 C 9 31, 9 31, 9 32 C 9 34, 8 35, 8 37 C 8 37, 7 38, 7 38 L 3 38 C 3 38, 3 38, 3 38 L 3 42 C 3 43, 3 43, 3 43 L 7 43 C 7 43, 8 43, 8 44 C 8 45, 9 47, 9 49 C 9 49, 9 50, 9 50 L 5 52 C 5 52, 5 52, 5 52 L 7 56 C 7 56, 8 56, 8 56 L 11 54 C 12 54, 12 54, 13 55 C 14 56, 15 57, 16 58 C 17 59, 17 59, 17 60 L 15 63 C 15 63, 15 63, 15 63 L 19 66 C 19 66, 19 66, 19 66 L 21 62 C 21 62, 21 62, 22 62 C 22 62, 22 62, 22 62 C 24 62, 26 63, 27 63 C 28 63, 28 64, 28 64 L 28 68 C 28 68, 28 68, 29 68 L 33 68 C 33 68, 33 68, 33 68 L 33 64 C 33 64, 34 63, 34 63 C 36 63, 38 62, 39 62 C 40 61, 40 62, 41 62 L 43 66 C 43 66, 43 66, 43 66 L 47 63 C 47 63, 47 63, 47 63 L 45 60 C 45 59, 45 59, 45 58 C 46 57, 48 56, 49 55 C 49 54, 50 54, 50 54 L 54 56 C 54 56, 54 56, 54 56 L 56 52 C 56 52, 56 52, 56 52 L 53 50 C 52 50, 52 49, 52 49 C 53 47, 53 45, 54 44 C 54 43, 54 43, 55 43 L 59 43 C 59 43, 59 43, 59 42 L 59 38 C 59 38, 59 38, 59 38 L 55 38 C 54 38, 54 37, 54 37 C 53 35, 53 34, 52 32 C 52 31, 52 31, 53 30 L 56 28 C 56 28, 56 28, 56 28 L 54 24 C 54 24, 54 24, 54 24 C 54 24, 54 24, 54 24 L 50 26 C 50 26, 49 26, 49 26 C 48 25, 46 23, 45 22 C 45 22, 45 21, 45 21 L 47 17 C 47 17, 47 17, 47 17 C 47 17, 47 17, 47 17 L 43 15 C 43 15, 43 15, 43 15 L 41 18 C 40 19, 40 19, 39 19 C 38 18, 36 18, 34 18 C 34 17, 33 17, 33 16 L 33 12 C 33 12, 33 12, 33 12 L 29 12 Z M 29 10 L 33 10 C 34 10, 36 11, 36 12 L 36 15 C 37 16, 38 16, 39 16 L 41 14 C 41 12, 43 12, 44 13 L 48 15 C 49 15, 49 16, 49 17 C 49 17, 49 18, 49 19 L 48 21 C 48 22, 49 23, 50 24 L 53 22 C 53 22, 54 22, 55 22 C 55 22, 56 22, 56 23 L 58 27 C 59 28, 59 30, 57 31 L 55 32 C 55 33, 56 34, 56 35 L 59 35 C 60 35, 62 37, 62 38 L 62 42 C 62 44, 60 45, 59 45 L 56 45 C 56 46, 55 47, 55 49 L 57 50 C 59 51, 59 52, 58 54 L 56 57 C 56 58, 55 58, 55 59 C 54 59, 53 59, 53 58 L 50 57 C 49 58, 48 59, 47 59 L 49 62 C 49 63, 49 63, 49 64 C 49 65, 49 65, 48 66 L 44 68 C 43 69, 41 68, 41 67 L 39 64 C 38 65, 37 65, 36 65 L 36 68 C 36 70, 34 71, 33 71 L 29 71 C 27 71, 26 70, 26 68 L 26 65 C 25 65, 24 65, 22 64 L 21 67 C 20 68, 19 69, 17 68 L 14 66 C 12 65, 12 63, 13 62 L 14 59 C 13 59, 12 58, 11 57 L 9 58 C 8 59, 6 59, 5 57 L 3 54 C 2 52, 3 51, 4 50 L 7 49 C 6 47, 6 46, 6 45 L 3 45 C 1 45, 0 44, 0 42 L 0 38 C 0 37, 1 35, 3 35 L 6 35 C 6 34, 6 33, 7 32 L 4 31 C 3 30, 3 30, 3 29 C 3 28, 3 27, 3 27 L 5 23 C 6 22, 6 22, 7 22 C 8 22, 8 22, 9 22 L 11 24 C 12 23, 13 22, 14 21 L 13 19 C 12 18, 12 17, 12 17 C 12 16, 13 15, 14 15 L 17 13 C 19 12, 20 12, 21 14 L 22 16 C 24 16, 25 16, 26 15 L 26 12 C 26 11, 27 10, 29 10 Z M 65 4 L 65 16 L 77 16 L 65 4 Z M 14 0 L 63 0 C 64 0, 64 0, 64 0 L 81 17 C 81 17, 81 17, 81 18 L 81 80 C 81 80, 80 81, 80 81 L 14 81 C 14 81, 13 80, 13 80 L 13 72 C 13 71, 14 70, 14 70 C 15 70, 16 71, 16 72 L 16 79 L 78 79 L 78 19 L 63 19 C 63 19, 62 18, 62 18 L 62 3 L 16 3 L 16 9 C 16 10, 15 11, 14 11 C 14 11, 13 10, 13 9 L 13 1 C 13 1, 14 0, 14 0 Z"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 136,
    "y": 305,
    "width": 96,
    "height": 36,
    "text": "Step 01",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 370,
    "y": 305,
    "width": 96,
    "height": 36,
    "text": "Step 02",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 574,
    "y": 305,
    "width": 96,
    "height": 36,
    "text": "Step 03",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 3,
    "x": 574,
    "y": 539,
    "width": 96,
    "height": 36,
    "text": "Step 04",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 4,
    "x": 799,
    "y": 539,
    "width": 96,
    "height": 36,
    "text": "Step 05",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 5,
    "x": 1014,
    "y": 539,
    "width": 96,
    "height": 36,
    "text": "Step 06",
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

export function Imported2025migsopcubedcreativeandexampletemplates158Template({ data }: { data: BrainData }): ReactElement {
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
