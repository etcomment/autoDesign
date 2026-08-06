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
    "x": 884,
    "y": 230,
    "width": 54,
    "height": 54,
    "fillColor": "#ffffff",
    "pathD": "M 27 0 A 27 27 0 1 1 27 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 995,
    "y": 415,
    "width": 54,
    "height": 54,
    "fillColor": "#ffffff",
    "pathD": "M 27 0 A 27 27 0 1 1 27 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 774,
    "y": 415,
    "width": 54,
    "height": 54,
    "fillColor": "#ffffff",
    "pathD": "M 27 0 A 27 27 0 1 1 27 0 Z"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 779,
    "y": 424,
    "width": 43,
    "height": 36,
    "text": "2",
    "textSize": 16
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 2,
    "x": 1000,
    "y": 424,
    "width": 43,
    "height": 36,
    "text": "3",
    "textSize": 16
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 890,
    "y": 239,
    "width": 43,
    "height": 36,
    "text": "1",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 2,
    "x": 203,
    "y": 502,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 2,
    "x": 201,
    "y": 537,
    "width": 405,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 0,
    "x": 203,
    "y": 160,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 201,
    "y": 195,
    "width": 405,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 1,
    "x": 203,
    "y": 329,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 1,
    "x": 201,
    "y": 364,
    "width": 405,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 112,
    "y": 177,
    "width": 52,
    "height": 52,
    "fillColor": "#3365cc",
    "pathD": "M 11 43 L 23 43 C 24 43, 24 43, 24 44 C 24 44, 24 45, 23 45 L 11 45 C 11 45, 10 44, 10 44 C 10 43, 11 43, 11 43 Z M 6 43 L 7 43 C 7 43, 8 43, 8 44 C 8 44, 7 45, 7 45 L 6 45 C 5 45, 5 44, 5 44 C 5 43, 5 43, 6 43 Z M 42 37 C 41 40, 39 43, 38 44 C 41 43, 44 42, 46 39 C 45 39, 44 38, 42 37 Z M 28 37 C 27 38, 26 39, 25 39 C 27 42, 30 43, 33 44 C 32 43, 30 40, 28 37 Z M 36 36 L 36 43 C 38 42, 39 40, 41 37 C 39 36, 38 36, 36 36 Z M 35 36 C 33 36, 31 36, 30 37 C 31 40, 33 42, 35 43 L 35 36 Z M 11 36 L 18 36 C 18 36, 19 36, 19 37 C 19 37, 18 37, 18 37 L 11 37 C 11 37, 10 37, 10 37 C 10 36, 11 36, 11 36 Z M 6 36 L 7 36 C 7 36, 8 36, 8 37 C 8 37, 7 37, 7 37 L 6 37 C 5 37, 5 37, 5 37 C 5 36, 5 36, 6 36 Z M 45 30 C 45 32, 44 34, 43 36 C 45 37, 46 37, 47 38 C 49 36, 50 33, 50 30 L 45 30 Z M 36 30 L 36 34 C 38 34, 40 35, 42 35 C 42 34, 43 32, 43 30 L 36 30 Z M 28 30 C 28 32, 29 34, 29 35 C 31 35, 33 34, 35 34 L 35 30 L 28 30 Z M 21 30 C 21 33, 22 36, 23 38 C 25 37, 26 37, 28 36 C 27 34, 26 32, 26 30 L 21 30 Z M 11 28 L 16 28 C 16 28, 17 29, 17 29 C 17 30, 16 30, 16 30 L 11 30 C 11 30, 10 30, 10 29 C 10 29, 11 28, 11 28 Z M 6 28 L 7 28 C 7 28, 8 29, 8 29 C 8 30, 7 30, 7 30 L 6 30 C 5 30, 5 30, 5 29 C 5 29, 5 28, 6 28 Z M 42 23 C 40 23, 38 24, 36 24 L 36 28 L 43 28 C 43 26, 42 25, 42 23 Z M 29 23 C 29 25, 28 26, 28 28 L 35 28 L 35 24 C 33 24, 31 23, 29 23 Z M 11 21 L 18 21 C 18 21, 19 21, 19 22 C 19 22, 18 23, 18 23 L 11 23 C 11 23, 10 22, 10 22 C 10 21, 11 21, 11 21 Z M 6 21 L 7 21 C 7 21, 8 21, 8 22 C 8 22, 7 23, 7 23 L 6 23 C 5 23, 5 22, 5 22 C 5 21, 5 21, 6 21 Z M 47 20 C 46 21, 45 22, 43 22 C 44 24, 45 26, 45 28 L 50 28 C 50 25, 49 23, 47 20 Z M 23 20 C 22 23, 21 25, 21 28 L 26 28 C 26 26, 27 24, 28 22 C 26 22, 25 21, 23 20 Z M 36 15 L 36 22 C 38 22, 39 22, 41 21 C 39 19, 38 16, 36 15 Z M 35 15 C 33 16, 31 19, 30 21 C 31 22, 33 22, 35 22 L 35 15 Z M 38 14 C 39 16, 41 18, 42 21 C 44 20, 45 20, 46 19 C 44 17, 41 15, 38 14 Z M 33 14 C 30 15, 27 17, 25 19 C 26 20, 27 20, 28 21 C 30 18, 32 16, 33 14 Z M 11 14 L 23 14 C 24 14, 24 14, 24 15 C 24 15, 24 15, 23 15 L 11 15 C 11 15, 10 15, 10 15 C 10 14, 11 14, 11 14 Z M 6 14 L 7 14 C 7 14, 8 14, 8 15 C 8 15, 7 15, 7 15 L 6 15 C 5 15, 5 15, 5 15 C 5 14, 5 14, 6 14 Z M 12 2 L 12 4 C 12 5, 13 6, 14 6 L 27 6 C 28 6, 29 5, 29 4 L 29 2 L 12 2 Z M 4 2 C 3 2, 2 3, 2 4 L 2 48 C 2 49, 3 50, 4 50 L 38 50 C 39 50, 40 49, 40 48 L 40 45 C 39 45, 37 46, 35 46 C 26 46, 19 38, 19 29 C 19 20, 26 13, 35 13 C 37 13, 39 13, 40 13 L 40 4 C 40 3, 39 2, 38 2 L 31 2 L 31 4 C 31 6, 29 8, 27 8 L 14 8 C 12 8, 11 6, 11 4 L 11 2 L 4 2 Z M 4 0 L 38 0 C 40 0, 42 2, 42 4 L 42 14 C 48 16, 52 22, 52 29 C 52 36, 48 42, 42 45 L 42 48 C 42 50, 40 52, 38 52 L 4 52 C 2 52, 0 50, 0 48 L 0 4 C 0 2, 2 0, 4 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 112,
    "y": 346,
    "width": 52,
    "height": 52,
    "fillColor": "#ff4d38",
    "pathD": "M 25 47 L 25 49 C 25 50, 25 50, 26 50 L 39 50 C 39 50, 40 50, 40 49 L 40 47 L 25 47 Z M 3 47 L 3 49 C 3 50, 4 50, 4 50 L 12 50 C 13 50, 13 50, 13 49 L 13 47 L 3 47 Z M 22 38 C 23 39, 23 40, 23 40 L 23 45 C 23 46, 23 46, 23 46 L 42 46 C 42 46, 42 46, 42 45 L 42 43 L 26 43 C 26 43, 25 42, 25 42 C 25 41, 26 41, 26 41 L 42 41 L 42 40 C 42 39, 42 39, 42 38 L 22 38 Z M 28 31 L 29 36 L 35 36 L 37 31 C 35 31, 34 32, 32 32 C 31 32, 29 31, 28 31 Z M 33 12 C 32 15, 31 22, 33 28 C 33 29, 33 29, 33 30 C 33 30, 32 30, 32 30 C 32 30, 32 29, 32 29 C 29 24, 30 17, 31 13 C 29 16, 26 19, 26 23 C 26 29, 30 30, 32 30 C 35 30, 39 29, 39 23 C 39 19, 35 14, 33 12 Z M 3 10 L 3 46 L 7 46 L 7 10 L 3 10 Z M 8 2 L 4 8 L 12 8 L 8 2 Z M 32 2 C 22 2, 14 10, 14 20 C 14 25, 16 29, 19 32 C 21 34, 21 35, 22 36 L 28 36 L 26 29 C 25 28, 24 26, 24 23 C 24 17, 32 10, 32 10 C 32 10, 33 10, 33 10 C 33 10, 41 17, 41 23 C 41 26, 40 28, 39 29 L 37 36 L 43 36 C 43 35, 44 34, 45 32 C 49 29, 50 24, 50 20 C 50 10, 42 2, 32 2 Z M 32 0 C 43 0, 52 9, 52 20 C 52 25, 50 30, 46 33 C 45 35, 44 38, 44 40 L 44 45 C 44 46, 43 47, 42 47 L 42 47 L 42 49 C 42 51, 40 52, 39 52 L 26 52 C 25 52, 23 51, 23 49 L 23 47 L 23 47 C 22 47, 21 46, 21 45 L 21 40 C 21 38, 20 35, 18 34 C 15 30, 13 25, 13 20 C 13 9, 21 0, 32 0 Z M 8 0 C 8 0, 9 0, 9 0 L 15 9 C 15 9, 15 9, 15 10 C 14 10, 14 10, 14 10 L 9 10 L 9 46 L 13 46 L 13 31 C 13 31, 14 31, 14 31 C 14 31, 15 31, 15 31 L 15 46 L 15 46 C 16 46, 16 46, 16 46 C 16 47, 16 47, 15 47 L 15 47 L 15 49 C 15 51, 13 52, 12 52 L 4 52 C 3 52, 2 51, 2 49 L 2 47 L 1 47 C 0 47, 0 47, 0 46 C 0 46, 0 46, 1 46 L 2 46 L 2 9 C 2 9, 2 9, 2 9 L 7 0 C 8 0, 8 0, 8 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 113,
    "y": 516,
    "width": 52,
    "height": 52,
    "fillColor": "#52c49c",
    "pathD": "M 42 40 C 42 40, 43 40, 43 40 C 43 40, 43 41, 43 41 C 43 41, 43 41, 43 41 C 43 41, 43 42, 42 42 C 42 42, 42 41, 42 41 C 42 41, 42 41, 42 41 C 42 41, 42 40, 42 40 Z M 42 27 C 43 27, 43 28, 43 28 L 43 37 C 43 37, 43 37, 42 37 C 42 37, 42 37, 42 37 L 42 28 C 42 28, 42 27, 42 27 Z M 17 24 C 17 24, 18 24, 18 24 C 18 24, 18 24, 18 24 C 18 25, 18 25, 18 25 C 18 25, 18 25, 17 25 C 17 25, 17 25, 17 25 C 17 25, 17 25, 17 24 C 17 24, 17 24, 17 24 Z M 35 23 L 35 36 C 35 36, 34 37, 34 37 C 34 37, 34 37, 34 37 C 34 37, 33 37, 33 37 L 25 32 C 23 31, 22 31, 21 30 L 21 50 L 26 47 C 28 46, 30 45, 32 45 L 48 45 C 49 45, 50 44, 50 43 L 50 26 C 50 24, 49 23, 48 23 L 35 23 Z M 17 5 C 21 5, 23 8, 23 11 C 23 14, 22 15, 20 16 C 19 17, 18 18, 18 20 C 18 21, 18 21, 17 21 C 17 21, 17 21, 17 20 C 17 17, 18 16, 20 15 C 21 14, 22 13, 22 11 C 22 9, 20 7, 17 7 C 15 7, 13 9, 13 11 C 13 12, 12 12, 12 12 C 12 12, 11 12, 11 11 C 11 8, 14 5, 17 5 Z M 4 2 C 3 2, 3 2, 2 2 C 2 3, 2 3, 2 4 L 2 26 C 2 27, 2 28, 2 28 C 3 29, 3 29, 4 29 L 20 29 C 22 29, 24 29, 25 30 L 33 35 L 33 4 C 33 3, 33 3, 32 2 C 32 2, 31 2, 31 2 L 4 2 Z M 4 0 L 31 0 C 32 0, 33 0, 33 1 C 34 2, 35 3, 35 4 L 35 22 L 48 22 C 50 22, 52 24, 52 26 L 52 43 C 52 45, 50 47, 48 47 L 32 47 C 30 47, 28 47, 27 48 L 20 52 C 20 52, 20 52, 20 52 C 20 52, 20 52, 20 52 C 19 52, 19 51, 19 51 L 19 30 L 4 30 C 3 30, 2 30, 1 29 C 0 29, 0 27, 0 26 L 0 4 C 0 3, 0 2, 1 1 C 2 0, 3 0, 4 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 756,
    "y": 267,
    "width": 86,
    "height": 86,
    "fillColor": "#ffffff",
    "pathD": "M 19 71 L 39 71 C 39 71, 40 72, 40 73 C 40 73, 39 74, 39 74 L 19 74 C 18 74, 17 73, 17 73 C 17 72, 18 71, 19 71 Z M 10 71 L 12 71 C 12 71, 13 72, 13 73 C 13 73, 12 74, 12 74 L 10 74 C 9 74, 8 73, 8 73 C 8 72, 9 71, 10 71 Z M 70 62 C 68 67, 64 70, 62 73 C 68 72, 73 69, 77 65 C 75 64, 73 63, 70 62 Z M 47 62 C 45 63, 42 64, 41 65 C 44 69, 49 72, 55 73 C 53 70, 50 67, 47 62 Z M 60 60 L 60 71 C 62 69, 65 65, 68 61 C 65 60, 63 60, 60 60 Z M 57 60 C 55 60, 52 60, 50 61 C 52 65, 55 69, 57 71 L 57 60 Z M 19 59 L 30 59 C 31 59, 31 60, 31 60 C 31 61, 31 62, 30 62 L 19 62 C 18 62, 17 61, 17 60 C 17 60, 18 59, 19 59 Z M 10 59 L 12 59 C 12 59, 13 60, 13 60 C 13 61, 12 62, 12 62 L 10 62 C 9 62, 8 61, 8 60 C 8 60, 9 59, 10 59 Z M 74 49 C 74 53, 73 56, 71 59 C 74 60, 77 62, 78 63 C 81 59, 83 55, 83 49 L 74 49 Z M 60 49 L 60 57 C 63 57, 66 58, 69 59 C 70 56, 71 53, 71 49 L 60 49 Z M 46 49 C 46 53, 47 56, 48 59 C 51 58, 54 57, 57 57 L 57 49 L 46 49 Z M 34 49 C 34 55, 36 59, 39 63 C 41 62, 43 60, 46 59 C 45 56, 44 53, 43 49 L 34 49 Z M 19 47 L 26 47 C 27 47, 27 48, 27 48 C 27 49, 27 50, 26 50 L 19 50 C 18 50, 17 49, 17 48 C 17 48, 18 47, 19 47 Z M 10 47 L 12 47 C 12 47, 13 48, 13 48 C 13 49, 12 50, 12 50 L 10 50 C 9 50, 8 49, 8 48 C 8 48, 9 47, 10 47 Z M 69 38 C 66 39, 63 39, 60 40 L 60 47 L 71 47 C 71 44, 70 41, 69 38 Z M 48 38 C 47 41, 46 44, 46 47 L 57 47 L 57 40 C 54 39, 51 39, 48 38 Z M 19 35 L 30 35 C 31 35, 31 36, 31 36 C 31 37, 31 38, 30 38 L 19 38 C 18 38, 17 37, 17 36 C 17 36, 18 35, 19 35 Z M 10 35 L 12 35 C 12 35, 13 36, 13 36 C 13 37, 12 38, 12 38 L 10 38 C 9 38, 8 37, 8 36 C 8 36, 9 35, 10 35 Z M 79 33 C 77 35, 74 36, 71 37 C 73 40, 74 43, 74 47 L 83 47 C 83 42, 81 37, 79 33 Z M 39 33 C 36 37, 34 42, 34 47 L 43 47 C 44 43, 45 40, 46 37 C 43 36, 41 35, 39 33 Z M 60 25 L 60 37 C 63 37, 65 36, 68 35 C 65 31, 62 27, 60 25 Z M 57 25 C 55 27, 52 31, 50 35 C 52 36, 55 37, 57 37 L 57 25 Z M 62 24 C 64 26, 68 30, 70 35 C 73 34, 75 33, 77 31 C 73 27, 68 25, 62 24 Z M 55 24 C 49 25, 44 27, 41 31 C 42 33, 45 34, 47 35 C 50 30, 53 26, 55 24 Z M 19 23 L 39 23 C 39 23, 40 23, 40 24 C 40 25, 39 25, 39 25 L 19 25 C 18 25, 17 25, 17 24 C 17 23, 18 23, 19 23 Z M 10 23 L 12 23 C 12 23, 13 23, 13 24 C 13 25, 12 25, 12 25 L 10 25 C 9 25, 8 25, 8 24 C 8 23, 9 23, 10 23 Z M 20 3 L 20 7 C 20 9, 22 10, 24 10 L 45 10 C 47 10, 49 9, 49 7 L 49 3 L 20 3 Z M 6 3 C 4 3, 3 4, 3 7 L 3 79 C 3 82, 4 83, 6 83 L 62 83 C 64 83, 66 82, 66 79 L 66 75 C 64 75, 61 76, 59 76 C 44 76, 31 63, 31 48 C 31 33, 44 21, 59 21 C 61 21, 64 21, 66 22 L 66 7 C 66 4, 64 3, 62 3 L 51 3 L 51 7 C 51 10, 48 13, 45 13 L 24 13 C 20 13, 17 10, 17 7 L 17 3 L 6 3 Z M 6 0 L 62 0 C 66 0, 69 3, 69 7 L 69 23 C 79 27, 86 37, 86 48 C 86 60, 79 70, 69 74 L 69 79 C 69 83, 66 86, 62 86 L 6 86 C 3 86, 0 83, 0 79 L 0 7 C 0 3, 3 0, 6 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 980,
    "y": 267,
    "width": 86,
    "height": 86,
    "fillColor": "#ffffff",
    "pathD": "M 41 78 L 41 81 C 41 82, 42 83, 43 83 L 64 83 C 65 83, 66 82, 66 81 L 66 78 L 41 78 Z M 5 78 L 5 81 C 5 82, 6 83, 7 83 L 20 83 C 21 83, 22 82, 22 81 L 22 78 L 5 78 Z M 37 63 C 37 64, 37 65, 37 67 L 37 75 C 37 75, 38 76, 38 76 L 69 76 C 69 76, 70 75, 70 75 L 70 70 L 43 70 C 42 70, 42 70, 42 69 C 42 68, 42 68, 43 68 L 70 68 L 70 67 C 70 65, 70 64, 70 63 L 37 63 Z M 46 51 L 49 60 L 58 60 L 61 51 C 59 52, 56 53, 54 53 C 51 53, 48 52, 46 51 Z M 54 20 C 53 25, 51 37, 55 47 C 55 48, 55 49, 54 49 C 54 49, 54 49, 54 49 C 53 49, 53 49, 52 48 C 48 39, 50 28, 51 22 C 48 26, 43 32, 43 38 C 43 49, 50 50, 54 50 C 58 50, 64 49, 64 38 C 64 31, 57 23, 54 20 Z M 5 17 L 5 76 L 12 76 L 12 17 L 5 17 Z M 13 4 L 6 14 L 21 14 L 13 4 Z M 53 3 C 37 3, 23 16, 23 33 C 23 41, 27 48, 32 54 C 34 55, 35 58, 36 60 L 46 60 L 43 48 C 41 46, 40 42, 40 38 C 40 28, 52 17, 53 17 C 53 16, 54 16, 54 17 C 55 17, 67 28, 67 38 C 67 42, 66 46, 64 48 L 61 60 L 71 60 C 72 58, 73 55, 75 54 C 80 48, 83 40, 83 33 C 83 16, 70 3, 53 3 Z M 53 0 C 71 0, 86 15, 86 33 C 86 41, 83 49, 77 55 C 74 58, 72 62, 72 67 L 72 75 C 72 77, 71 78, 69 78 L 69 78 L 69 81 C 69 84, 67 86, 64 86 L 43 86 C 41 86, 38 84, 38 81 L 38 78 L 38 78 C 36 78, 35 77, 35 75 L 35 67 C 35 62, 33 58, 30 56 C 24 49, 21 41, 21 33 C 21 15, 35 0, 53 0 Z M 13 0 C 14 0, 14 0, 14 1 L 24 15 C 24 15, 24 15, 24 16 C 24 16, 24 17, 23 17 L 15 17 L 15 76 L 22 76 L 22 52 C 22 51, 22 50, 23 50 C 24 50, 24 51, 24 52 L 24 76 L 26 76 C 26 76, 27 76, 27 77 C 27 78, 26 78, 26 78 L 24 78 L 24 81 C 24 84, 22 86, 20 86 L 7 86 C 5 86, 3 84, 3 81 L 3 78 L 1 78 C 1 78, 0 78, 0 77 C 0 76, 1 76, 1 76 L 3 76 L 3 15 C 3 15, 3 15, 3 15 L 12 1 C 13 0, 13 0, 13 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 868,
    "y": 466,
    "width": 86,
    "height": 86,
    "fillColor": "#ffffff",
    "pathD": "M 69 67 C 70 66, 71 66, 71 67 C 71 67, 72 67, 72 68 C 72 68, 71 68, 71 68 C 71 69, 71 69, 70 69 C 70 69, 69 69, 69 68 C 69 68, 69 68, 69 68 C 69 67, 69 67, 69 67 Z M 70 45 C 71 45, 72 46, 72 46 L 72 61 C 72 61, 71 62, 70 62 C 69 62, 69 61, 69 61 L 69 46 C 69 46, 69 45, 70 45 Z M 28 40 C 28 39, 29 39, 30 40 C 30 40, 30 40, 30 40 C 30 41, 30 41, 30 41 C 30 42, 29 42, 29 42 C 28 42, 28 42, 28 41 C 28 41, 27 41, 27 40 C 27 40, 28 40, 28 40 Z M 57 39 L 57 60 C 57 60, 57 60, 57 61 C 56 61, 56 61, 56 61 C 56 61, 55 61, 55 61 L 41 52 C 39 51, 37 51, 34 50 L 34 83 L 43 77 C 46 76, 49 75, 53 75 L 79 75 C 82 75, 83 73, 83 71 L 83 43 C 83 40, 82 39, 79 39 L 57 39 Z M 29 9 C 34 9, 39 13, 39 19 C 39 23, 36 25, 34 27 C 32 28, 30 30, 30 34 C 30 34, 29 35, 29 35 C 28 35, 27 34, 27 34 C 27 29, 30 26, 32 25 C 34 23, 36 22, 36 19 C 36 15, 33 11, 29 11 C 24 11, 21 15, 21 19 C 21 20, 21 20, 20 20 C 19 20, 19 20, 19 19 C 19 13, 23 9, 29 9 Z M 7 3 C 6 3, 5 3, 4 4 C 3 5, 3 6, 3 7 L 3 44 C 3 45, 3 46, 4 47 C 5 47, 6 48, 7 48 L 33 48 C 36 48, 39 49, 42 50 L 55 57 L 55 7 C 55 6, 54 5, 53 4 C 53 3, 52 3, 51 3 L 7 3 Z M 7 0 L 51 0 C 52 0, 54 1, 55 2 C 56 3, 57 5, 57 7 L 57 36 L 79 36 C 83 36, 86 39, 86 43 L 86 71 C 86 75, 83 78, 79 78 L 53 78 C 50 78, 47 78, 44 80 L 34 86 C 33 86, 33 86, 33 86 C 33 86, 33 86, 32 86 C 32 86, 32 85, 32 85 L 32 50 L 7 50 C 5 50, 3 50, 2 48 C 1 47, 0 45, 0 44 L 0 7 C 0 5, 1 3, 2 2 C 3 1, 5 0, 7 0 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates152Template({ data }: { data: BrainData }): ReactElement {
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
