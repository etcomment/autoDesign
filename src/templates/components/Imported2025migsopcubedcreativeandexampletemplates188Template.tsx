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
    "x": 649,
    "y": 127,
    "width": 165,
    "height": 192,
    "fillColor": "#4a90d9",
    "pathD": "M 83 0 L 165 41 L 165 151 L 83 192 L 0 151 L 0 41 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 649,
    "y": 453,
    "width": 165,
    "height": 192,
    "fillColor": "#ffb900",
    "pathD": "M 83 0 L 165 41 L 165 151 L 83 192 L 0 151 L 0 41 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 466,
    "y": 127,
    "width": 165,
    "height": 192,
    "pathD": "M 83 0 L 165 41 L 165 151 L 83 192 L 0 151 L 0 41 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 466,
    "y": 453,
    "width": 165,
    "height": 192,
    "fillColor": "#52c49c",
    "pathD": "M 83 0 L 165 41 L 165 151 L 83 192 L 0 151 L 0 41 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 740,
    "y": 290,
    "width": 165,
    "height": 192,
    "fillColor": "#ee6d90",
    "pathD": "M 83 0 L 165 41 L 165 151 L 83 192 L 0 151 L 0 41 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 374,
    "y": 290,
    "width": 165,
    "height": 192,
    "fillColor": "#ff4d38",
    "pathD": "M 83 0 L 165 41 L 165 151 L 83 192 L 0 151 L 0 41 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 703,
    "y": 516,
    "width": 58,
    "height": 66,
    "fillColor": "#ffffff",
    "pathD": "M 12 40 L 9 43 L 10 48 L 14 49 L 18 46 L 16 41 L 12 40 Z M 12 38 L 17 40 C 18 40, 18 40, 18 40 L 20 46 C 20 46, 20 46, 19 47 L 15 51 C 15 51, 15 51, 15 51 C 14 51, 14 51, 14 51 L 9 50 C 8 49, 8 49, 8 49 L 7 43 C 7 43, 7 43, 7 42 L 11 38 C 11 38, 12 38, 12 38 Z M 46 28 C 47 28, 47 28, 47 29 C 47 39, 39 47, 29 47 C 28 47, 28 47, 28 46 C 28 46, 28 45, 29 45 C 38 45, 45 38, 45 29 C 45 28, 46 28, 46 28 Z M 55 21 C 55 21, 54 21, 54 21 C 52 24, 48 25, 44 25 L 26 43 C 26 47, 25 51, 22 54 C 22 54, 21 54, 21 55 C 23 55, 26 56, 29 56 C 34 56, 39 54, 44 52 C 44 51, 45 51, 45 52 L 56 63 L 56 29 C 56 26, 55 23, 55 21 Z M 29 11 C 29 11, 30 11, 30 12 C 30 12, 29 13, 29 13 C 20 13, 12 20, 12 29 C 12 30, 12 30, 11 30 C 11 30, 10 30, 10 29 C 10 19, 19 11, 29 11 Z M 47 2 C 44 2, 41 3, 38 5 C 36 8, 35 11, 35 14 C 35 15, 35 15, 35 15 L 26 25 L 16 34 C 16 34, 16 35, 15 35 C 14 34, 14 34, 13 34 C 10 34, 8 35, 6 37 C 2 41, 2 48, 6 52 C 10 56, 16 56, 21 52 C 23 50, 24 46, 23 43 C 23 42, 23 42, 24 42 L 43 23 C 43 23, 43 23, 44 23 C 47 23, 50 22, 53 20 L 53 19 L 55 16 C 56 14, 56 12, 56 11 L 49 18 C 49 18, 48 18, 48 18 L 42 17 C 42 16, 42 16, 41 16 L 40 10 C 40 10, 40 9, 40 9 L 47 2 Z M 29 2 C 14 2, 2 14, 2 29 C 2 32, 3 35, 3 37 C 4 37, 4 36, 4 36 C 7 33, 11 32, 15 32 L 22 25 L 33 14 C 33 10, 34 6, 37 4 C 37 3, 37 3, 37 3 C 35 2, 32 2, 29 2 Z M 29 0 C 32 0, 36 1, 39 2 C 42 0, 46 -1, 50 1 C 50 1, 50 1, 50 1 C 50 2, 50 2, 50 2 L 42 10 L 43 15 L 48 16 L 56 8 C 56 8, 56 8, 57 8 C 57 8, 57 8, 57 8 C 59 12, 58 16, 56 19 C 57 22, 58 25, 58 29 L 58 65 C 58 65, 58 66, 57 66 C 57 66, 57 66, 57 66 C 57 66, 56 66, 56 66 L 44 54 C 40 57, 34 58, 29 58 C 25 58, 22 57, 19 56 C 17 57, 15 57, 13 57 C 10 57, 7 56, 4 54 C 1 50, 0 44, 2 39 C 1 36, 0 33, 0 29 C 0 13, 13 0, 29 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 424,
    "y": 353,
    "width": 66,
    "height": 66,
    "fillColor": "#ffffff",
    "pathD": "M 33 43 C 32 43, 31 44, 31 45 C 31 46, 32 47, 33 47 C 34 47, 35 46, 35 45 C 35 44, 34 43, 33 43 Z M 17 43 C 16 43, 15 44, 15 45 C 15 46, 16 47, 17 47 C 18 47, 19 46, 19 45 C 19 44, 18 43, 17 43 Z M 43 43 L 49 62 L 53 54 C 53 53, 53 53, 54 53 L 62 49 L 43 43 Z M 17 41 C 19 41, 21 42, 21 44 L 29 44 C 29 42, 31 41, 33 41 C 35 41, 37 43, 37 45 C 37 47, 35 49, 33 49 C 31 49, 29 48, 29 46 L 21 46 C 21 48, 19 49, 17 49 C 15 49, 13 47, 13 45 C 13 43, 15 41, 17 41 Z M 33 27 L 31 37 L 35 37 C 36 37, 37 36, 37 35 L 40 27 L 33 27 Z M 23 25 L 22 37 L 29 37 L 31 26 L 23 25 Z M 14 24 L 14 34 C 14 36, 15 37, 16 37 L 20 37 L 21 25 L 14 24 Z M 8 18 C 11 18, 13 20, 13 22 L 42 26 C 42 26, 42 26, 43 26 C 43 26, 43 27, 43 27 L 39 36 C 39 37, 37 38, 35 38 L 16 38 C 13 38, 12 37, 12 34 L 12 23 C 12 21, 10 20, 8 20 C 8 20, 7 19, 7 19 C 7 18, 8 18, 8 18 Z M 29 9 C 40 9, 49 18, 49 29 C 49 32, 48 35, 47 38 C 47 38, 47 38, 46 38 C 46 38, 46 38, 46 38 C 45 38, 45 37, 46 37 C 47 34, 47 32, 47 29 C 47 19, 39 11, 29 11 C 24 11, 19 13, 15 17 C 15 17, 14 17, 14 17 C 14 16, 14 16, 14 15 C 18 11, 23 9, 29 9 Z M 29 2 C 14 2, 2 14, 2 29 C 2 44, 14 56, 29 56 C 34 56, 39 54, 44 52 L 40 41 C 40 41, 40 41, 40 40 C 41 40, 41 40, 41 40 L 52 44 C 54 39, 56 34, 56 29 C 56 14, 44 2, 29 2 Z M 29 0 C 45 0, 58 13, 58 29 C 58 35, 56 40, 54 44 L 65 48 C 66 48, 66 49, 66 49 C 66 50, 66 50, 65 50 L 55 55 L 50 65 C 50 66, 50 66, 49 66 C 49 66, 48 66, 48 65 L 44 54 C 40 56, 35 58, 29 58 C 13 58, 0 45, 0 29 C 0 13, 13 0, 29 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 516,
    "y": 516,
    "width": 66,
    "height": 66,
    "fillColor": "#ffffff",
    "pathD": "M 11 55 L 3 64 L 63 64 L 55 55 L 38 55 L 34 59 C 33 59, 33 59, 33 59 C 33 59, 33 59, 32 59 L 28 55 L 11 55 Z M 49 30 C 49 30, 50 30, 50 30 C 51 30, 51 31, 50 31 L 42 40 C 42 40, 42 40, 42 40 C 41 40, 41 40, 41 40 C 40 39, 40 39, 41 38 L 49 30 Z M 36 30 C 37 30, 37 30, 38 30 C 38 30, 38 31, 38 31 L 30 40 C 30 40, 29 40, 29 40 C 29 40, 29 40, 28 40 C 28 39, 28 39, 28 38 L 36 30 Z M 23 30 C 24 30, 24 30, 25 30 C 25 30, 25 31, 25 31 L 17 40 C 17 40, 16 40, 16 40 C 16 40, 16 40, 15 40 C 15 39, 15 39, 15 38 L 23 30 Z M 17 22 C 16 23, 14 25, 12 25 L 10 25 L 10 44 L 17 44 C 17 44, 17 44, 18 44 L 33 57 L 48 44 C 49 44, 49 44, 49 44 L 56 44 L 56 25 L 54 25 C 52 25, 50 23, 49 22 C 48 23, 46 25, 44 25 L 38 25 C 36 25, 34 23, 33 22 C 32 23, 30 25, 28 25 L 22 25 C 20 25, 18 23, 17 22 Z M 50 18 L 50 18 C 50 21, 52 23, 54 23 L 60 23 C 62 23, 64 21, 64 18 L 64 18 L 50 18 Z M 34 18 L 34 18 C 34 21, 36 23, 38 23 L 44 23 C 46 23, 48 21, 48 18 L 48 18 L 34 18 Z M 18 18 L 18 18 C 18 21, 20 23, 22 23 L 28 23 C 30 23, 32 21, 32 18 L 32 18 L 18 18 Z M 2 18 L 2 18 C 2 21, 4 23, 6 23 L 12 23 C 14 23, 16 21, 16 18 L 16 18 L 2 18 Z M 47 10 L 50 16 L 63 16 L 57 10 L 47 10 Z M 34 10 L 34 16 L 47 16 L 44 10 L 34 10 Z M 22 10 L 19 16 L 32 16 L 32 10 L 22 10 Z M 9 10 L 3 16 L 16 16 L 19 10 L 9 10 Z M 10 2 L 10 8 L 56 8 L 56 2 L 10 2 Z M 9 0 L 57 0 C 58 0, 58 0, 58 1 L 58 9 L 66 16 C 66 16, 66 17, 66 17 L 66 18 C 66 22, 63 25, 60 25 L 58 25 L 58 45 C 58 45, 58 46, 57 46 L 49 46 L 40 53 L 56 53 C 56 53, 56 53, 56 54 L 66 64 C 66 65, 66 65, 66 65 C 66 66, 65 66, 65 66 L 1 66 C 1 66, 0 66, 0 65 C 0 65, 0 65, 0 64 L 10 54 C 10 53, 10 53, 10 53 L 26 53 L 17 46 L 9 46 C 8 46, 8 45, 8 45 L 8 25 L 6 25 C 3 25, 0 22, 0 18 L 0 17 C 0 17, 0 16, 0 16 L 8 9 L 8 1 C 8 0, 8 0, 9 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 790,
    "y": 353,
    "width": 66,
    "height": 66,
    "fillColor": "#ffffff",
    "pathD": "M 22 58 L 22 64 L 44 64 L 44 58 L 22 58 Z M 2 50 L 2 54 C 2 55, 3 56, 4 56 L 62 56 C 63 56, 64 55, 64 54 L 64 50 L 2 50 Z M 42 37 L 53 37 C 53 37, 54 37, 54 38 C 54 38, 53 39, 53 39 L 42 39 C 42 39, 41 38, 41 38 C 41 37, 42 37, 42 37 Z M 53 30 L 59 30 C 59 30, 60 30, 60 31 C 60 32, 59 32, 59 32 L 53 32 C 53 32, 52 32, 52 31 C 52 30, 53 30, 53 30 Z M 42 30 L 48 30 C 48 30, 48 30, 48 31 C 48 32, 48 32, 48 32 L 42 32 C 42 32, 41 32, 41 31 C 41 30, 42 30, 42 30 Z M 42 23 L 58 23 C 59 23, 59 24, 59 24 C 59 25, 59 25, 58 25 L 42 25 C 42 25, 41 25, 41 24 C 41 24, 42 23, 42 23 Z M 29 19 L 23 21 L 23 29 L 29 26 L 29 19 Z M 14 19 L 14 26 L 21 29 L 21 21 L 14 19 Z M 53 17 L 59 17 C 59 17, 60 17, 60 18 C 60 18, 59 19, 59 19 L 53 19 C 53 19, 52 18, 52 18 C 52 17, 53 17, 53 17 Z M 42 17 L 48 17 C 48 17, 48 17, 48 18 C 48 18, 48 19, 48 19 L 42 19 C 42 19, 41 18, 41 18 C 41 17, 42 17, 42 17 Z M 22 14 L 16 17 L 22 20 L 28 17 L 22 14 Z M 21 12 C 22 12, 22 12, 22 12 L 31 16 C 31 16, 31 17, 31 17 L 31 27 C 31 27, 31 28, 31 28 L 22 32 C 22 32, 22 32, 22 32 C 22 32, 21 32, 21 32 L 13 28 C 12 28, 12 27, 12 27 L 12 17 C 12 17, 12 16, 13 16 L 21 12 Z M 22 7 C 18 7, 14 9, 12 12 C 6 17, 6 26, 12 32 L 22 42 L 32 32 C 38 26, 38 17, 32 12 C 29 9, 26 7, 22 7 Z M 59 5 C 59 5, 60 5, 60 5 C 61 6, 61 6, 61 6 C 61 6, 61 7, 60 7 C 60 7, 60 7, 60 7 C 59 7, 59 7, 59 7 C 59 7, 59 6, 59 6 C 59 6, 59 6, 59 5 Z M 49 5 C 49 5, 50 5, 50 5 C 50 6, 50 6, 50 6 C 50 6, 50 7, 50 7 C 50 7, 49 7, 49 7 C 49 7, 49 7, 49 7 C 48 7, 48 6, 48 6 C 48 6, 48 6, 49 5 Z M 55 5 C 55 5, 56 6, 56 6 C 56 7, 55 7, 55 7 C 54 7, 54 7, 54 6 C 54 6, 54 5, 55 5 Z M 22 5 C 26 5, 31 7, 34 10 C 37 13, 38 17, 38 22 C 38 26, 37 30, 34 33 L 23 44 C 22 44, 22 45, 22 45 C 22 45, 21 44, 21 44 L 10 33 C 7 30, 5 26, 5 22 C 5 17, 7 13, 10 10 C 13 7, 17 5, 22 5 Z M 4 2 C 3 2, 2 3, 2 4 L 2 48 L 64 48 L 64 4 C 64 3, 63 2, 62 2 L 4 2 Z M 4 0 L 62 0 C 64 0, 66 2, 66 4 L 66 49 L 66 54 C 66 56, 64 58, 62 58 L 46 58 L 46 64 L 53 64 C 54 64, 54 64, 54 65 C 54 66, 54 66, 53 66 L 13 66 C 12 66, 12 66, 12 65 C 12 64, 12 64, 13 64 L 20 64 L 20 58 L 4 58 C 2 58, 0 56, 0 54 L 0 49 L 0 4 C 0 2, 2 0, 4 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 699,
    "y": 190,
    "width": 66,
    "height": 66,
    "fillColor": "#ffffff",
    "pathD": "M 41 63 L 54 63 C 55 63, 55 63, 55 64 C 55 64, 55 65, 54 65 L 41 65 C 40 65, 40 64, 40 64 C 40 63, 40 63, 41 63 Z M 17 63 L 36 63 C 36 63, 37 63, 37 64 C 37 64, 36 65, 36 65 L 17 65 C 16 65, 16 64, 16 64 C 16 63, 16 63, 17 63 Z M 2 58 L 2 64 L 8 64 L 8 58 L 2 58 Z M 31 56 L 44 56 C 44 56, 45 56, 45 57 C 45 58, 44 58, 44 58 L 31 58 C 30 58, 30 58, 30 57 C 30 56, 30 56, 31 56 Z M 17 56 L 26 56 C 26 56, 27 56, 27 57 C 27 58, 26 58, 26 58 L 17 58 C 16 58, 16 58, 16 57 C 16 56, 16 56, 17 56 Z M 1 56 L 9 56 C 9 56, 10 56, 10 57 L 10 65 C 10 66, 9 66, 9 66 L 1 66 C 0 66, 0 66, 0 65 L 0 57 C 0 56, 0 56, 1 56 Z M 49 45 L 60 45 C 60 45, 61 46, 61 46 C 61 47, 60 47, 60 47 L 49 47 C 48 47, 48 47, 48 46 C 48 46, 48 45, 49 45 Z M 29 45 L 44 45 C 44 45, 45 46, 45 46 C 45 47, 44 47, 44 47 L 29 47 C 29 47, 28 47, 28 46 C 28 46, 29 45, 29 45 Z M 17 45 L 24 45 C 25 45, 25 46, 25 46 C 25 47, 25 47, 24 47 L 17 47 C 16 47, 16 47, 16 46 C 16 46, 16 45, 17 45 Z M 2 41 L 2 46 L 8 46 L 8 41 L 2 41 Z M 17 39 L 34 39 C 35 39, 35 39, 35 40 C 35 40, 35 41, 34 41 L 17 41 C 16 41, 16 40, 16 40 C 16 39, 16 39, 17 39 Z M 1 39 L 9 39 C 9 39, 10 39, 10 40 L 10 48 C 10 48, 9 48, 9 48 L 1 48 C 0 48, 0 48, 0 48 L 0 40 C 0 39, 0 39, 1 39 Z M 36 28 L 53 28 C 54 28, 54 28, 54 29 C 54 29, 54 30, 53 30 L 36 30 C 36 30, 35 29, 35 29 C 35 28, 36 28, 36 28 Z M 17 28 L 31 28 C 32 28, 32 28, 32 29 C 32 29, 32 30, 31 30 L 17 30 C 16 30, 16 29, 16 29 C 16 28, 16 28, 17 28 Z M 2 23 L 2 29 L 8 29 L 8 23 L 2 23 Z M 29 21 L 38 21 C 39 21, 39 22, 39 23 C 39 23, 39 23, 38 23 L 29 23 C 29 23, 28 23, 28 23 C 28 22, 29 21, 29 21 Z M 17 21 L 24 21 C 24 21, 25 22, 25 23 C 25 23, 24 23, 24 23 L 17 23 C 16 23, 16 23, 16 23 C 16 22, 16 21, 17 21 Z M 1 21 L 9 21 C 9 21, 10 22, 10 22 L 10 30 C 10 31, 9 31, 9 31 L 1 31 C 0 31, 0 31, 0 30 L 0 22 C 0 22, 0 21, 1 21 Z M 65 17 C 66 17, 66 18, 66 18 L 66 65 C 66 66, 66 66, 65 66 C 64 66, 64 66, 64 65 L 64 18 C 64 18, 64 17, 65 17 Z M 7 6 L 20 6 C 21 6, 21 7, 21 7 C 21 8, 21 8, 20 8 L 7 8 C 7 8, 6 8, 6 7 C 6 7, 7 6, 7 6 Z M 54 2 L 54 12 L 64 12 L 64 2 L 54 2 Z M 2 2 L 2 12 L 52 12 L 52 2 L 2 2 Z M 1 0 L 65 0 C 66 0, 66 0, 66 1 L 66 13 C 66 13, 66 14, 65 14 L 1 14 C 0 14, 0 13, 0 13 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 516,
    "y": 190,
    "width": 66,
    "height": 66,
    "fillColor": "#ffffff",
    "pathD": "M 45 21 L 32 33 L 45 45 L 52 45 L 41 34 C 41 33, 41 33, 41 32 L 52 21 L 45 21 Z M 22 21 L 10 33 L 22 45 L 30 45 L 18 34 C 18 34, 18 33, 18 33 C 18 33, 18 32, 18 32 L 30 21 L 22 21 Z M 44 19 L 55 19 C 55 19, 56 19, 56 19 C 56 20, 56 20, 56 20 L 43 33 L 56 46 C 56 46, 56 46, 56 47 C 56 47, 55 47, 55 47 L 44 47 C 44 47, 44 47, 44 47 L 30 34 C 30 34, 30 33, 30 33 C 30 33, 30 32, 30 32 L 44 19 C 44 19, 44 19, 44 19 Z M 21 19 L 32 19 C 32 19, 33 19, 33 19 C 33 20, 33 20, 33 20 L 20 33 L 33 46 C 33 46, 33 46, 33 47 C 33 47, 32 47, 32 47 L 21 47 C 21 47, 21 47, 21 47 L 7 34 C 7 34, 7 33, 7 33 C 7 33, 7 32, 7 32 L 21 19 C 21 19, 21 19, 21 19 Z M 33 2 C 16 2, 2 16, 2 33 C 2 50, 16 64, 33 64 C 50 64, 64 50, 64 33 C 64 16, 50 2, 33 2 Z M 33 0 C 51 0, 66 15, 66 33 C 66 51, 51 66, 33 66 C 15 66, 0 51, 0 33 C 0 15, 15 0, 33 0 Z"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 3,
    "x": 938,
    "y": 338,
    "width": 141,
    "height": 36,
    "text": "Your title 5",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 3,
    "x": 942,
    "y": 379,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 5,
    "x": 852,
    "y": 501,
    "width": 141,
    "height": 36,
    "text": "Your title 4",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 5,
    "x": 856,
    "y": 542,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 852,
    "y": 175,
    "width": 141,
    "height": 36,
    "text": "Your title 06",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 1,
    "x": 856,
    "y": 216,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 4,
    "x": 282,
    "y": 501,
    "width": 141,
    "height": 36,
    "text": "Your title 3",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 4,
    "x": 190,
    "y": 542,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 0,
    "x": 282,
    "y": 175,
    "width": 141,
    "height": 36,
    "text": "Your title 01",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 0,
    "x": 190,
    "y": 216,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 2,
    "x": 197,
    "y": 338,
    "width": 141,
    "height": 36,
    "text": "Your title 2",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 2,
    "x": 105,
    "y": 379,
    "width": 233,
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

export function Imported2025migsopcubedcreativeandexampletemplates188Template({ data }: { data: BrainData }): ReactElement {
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
