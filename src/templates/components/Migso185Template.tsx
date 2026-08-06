import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 0,
    "y": 195,
    "width": 1280,
    "height": 186,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 163,
    "width": 181,
    "height": 298,
    "text": ""
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 261,
    "y": 163,
    "width": 16,
    "height": 32,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 315,
    "y": 163,
    "width": 181,
    "height": 298,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 495,
    "y": 163,
    "width": 16,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 550,
    "y": 163,
    "width": 181,
    "height": 298,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 730,
    "y": 163,
    "width": 16,
    "height": 32,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 785,
    "y": 163,
    "width": 181,
    "height": 298,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 965,
    "y": 163,
    "width": 16,
    "height": 32,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1019,
    "y": 163,
    "width": 181,
    "height": 298,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1200,
    "y": 163,
    "width": 16,
    "height": 32,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 0,
    "x": 100,
    "y": 483,
    "width": 141,
    "height": 36,
    "text": "Your title 1"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 80,
    "y": 524,
    "width": 181,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 335,
    "y": 483,
    "width": 141,
    "height": 36,
    "text": "Your title 2"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 315,
    "y": 524,
    "width": 181,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 2,
    "x": 569,
    "y": 483,
    "width": 141,
    "height": 36,
    "text": "Your title 3"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 2,
    "x": 550,
    "y": 524,
    "width": 181,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 3,
    "x": 804,
    "y": 483,
    "width": 141,
    "height": 36,
    "text": "Your title 4"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 785,
    "y": 524,
    "width": 181,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 4,
    "x": 1039,
    "y": 483,
    "width": 141,
    "height": 36,
    "text": "Your title 5"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 4,
    "x": 1019,
    "y": 524,
    "width": 181,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 373,
    "y": 200,
    "width": 65,
    "height": 65,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 28 59 L 37 59 C 38 59, 38 60, 38 60 C 38 61, 38 61, 37 61 L 28 61 C 27 61, 27 61, 27 60 C 27 60, 27 59, 28 59 Z M 2 57 L 2 60 C 2 62, 3 63, 5 63 L 60 63 C 62 63, 63 62, 63 60 L 63 57 L 2 57 Z M 7 47 L 3 55 L 62 55 L 58 47 L 7 47 Z M 45 16 C 45 16, 46 16, 46 16 C 47 17, 47 17, 46 18 L 33 31 C 33 31, 33 31, 33 31 C 32 31, 32 31, 32 31 L 25 24 C 25 24, 25 23, 25 23 C 26 23, 26 23, 27 23 L 33 29 L 45 16 Z M 32 9 C 36 9, 38 10, 41 12 C 41 12, 41 13, 41 13 C 41 14, 40 14, 40 14 C 38 12, 35 11, 32 11 C 26 11, 20 17, 20 23 L 20 39 L 25 34 C 25 34, 26 34, 26 34 C 28 35, 30 36, 32 36 C 38 36, 43 31, 44 26 C 44 25, 45 25, 45 25 C 46 25, 46 26, 46 26 C 45 33, 39 37, 32 37 C 30 37, 28 37, 26 36 L 20 42 C 20 42, 20 42, 19 42 C 19 42, 19 42, 19 42 C 19 42, 18 42, 18 41 L 18 23 C 18 15, 25 9, 32 9 Z M 10 2 C 9 2, 7 3, 7 5 L 7 45 L 58 45 L 58 5 C 58 3, 56 2, 55 2 L 10 2 Z M 10 0 L 55 0 C 58 0, 60 2, 60 5 L 60 45 L 65 56 C 65 56, 65 56, 65 56 L 65 60 C 65 63, 63 65, 60 65 L 5 65 C 2 65, 0 63, 0 60 L 0 56 C 0 56, 0 56, 0 56 L 5 45 L 5 5 C 5 2, 7 0, 10 0 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1077,
    "y": 200,
    "width": 65,
    "height": 65,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 26 53 C 25 53, 24 54, 24 56 C 24 57, 25 58, 26 58 C 27 58, 28 57, 28 56 C 28 54, 27 53, 26 53 Z M 26 51 C 28 51, 30 53, 30 56 C 30 58, 28 60, 26 60 C 24 60, 22 58, 22 56 C 22 53, 24 51, 26 51 Z M 15 42 C 14 42, 13 43, 13 45 C 13 46, 14 47, 15 47 C 16 47, 17 46, 17 45 C 17 43, 16 42, 15 42 Z M 28 41 C 28 41, 29 41, 29 41 C 29 42, 29 43, 29 43 L 13 59 C 13 59, 13 59, 13 59 C 12 59, 12 59, 12 59 C 12 58, 12 58, 12 57 L 28 41 Z M 15 40 C 17 40, 19 42, 19 45 C 19 47, 17 49, 15 49 C 13 49, 11 47, 11 45 C 11 42, 13 40, 15 40 Z M 6 34 L 2 63 L 39 63 L 36 34 L 32 34 L 32 37 C 32 37, 32 37, 31 37 C 31 37, 30 37, 30 37 L 30 34 L 11 34 L 11 37 C 11 37, 11 37, 10 37 C 10 37, 9 37, 9 37 L 9 34 L 6 34 Z M 21 23 C 16 23, 12 27, 11 32 L 30 32 C 30 27, 26 23, 21 23 Z M 21 21 C 27 21, 32 26, 32 32 L 36 32 C 37 32, 37 32, 37 32 L 41 64 C 41 64, 41 65, 41 65 C 41 65, 41 65, 40 65 L 1 65 C 1 65, 0 65, 0 65 C 0 65, 0 64, 0 64 L 4 32 C 4 32, 4 32, 5 32 L 9 32 C 10 26, 15 21, 21 21 Z M 42 2 C 36 2, 32 6, 32 12 L 32 13 L 51 13 L 51 12 C 51 6, 47 2, 42 2 Z M 42 0 C 48 0, 53 5, 53 12 L 53 13 L 59 13 C 59 13, 60 14, 60 14 L 65 56 C 65 56, 65 57, 65 57 C 65 57, 64 57, 64 57 L 43 57 C 43 57, 42 57, 42 56 C 42 56, 43 55, 43 55 L 63 55 L 62 48 L 42 48 C 42 48, 41 48, 41 47 C 41 46, 42 46, 42 46 L 62 46 L 58 15 L 53 15 L 53 19 C 53 20, 53 20, 52 20 C 52 20, 51 20, 51 19 L 51 15 L 32 15 L 32 19 C 32 20, 32 20, 31 20 C 31 20, 30 20, 30 19 L 30 15 L 25 15 L 25 20 C 25 20, 24 20, 24 20 C 23 20, 23 20, 23 19 L 24 14 C 24 14, 24 13, 25 13 L 30 13 L 30 12 C 30 5, 35 0, 42 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 608,
    "y": 200,
    "width": 65,
    "height": 65,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 17 46 C 18 46, 18 46, 18 47 C 18 47, 18 48, 17 48 C 17 48, 16 47, 16 47 C 16 46, 17 46, 17 46 Z M 14 32 L 14 50 L 20 50 L 20 32 L 14 32 Z M 33 12 C 32 12, 31 12, 30 12 C 31 14, 31 18, 31 20 C 30 23, 27 25, 25 27 C 24 29, 22 31, 22 31 L 22 50 L 45 50 C 46 50, 46 50, 46 50 C 47 49, 48 48, 48 47 C 48 46, 48 46, 48 45 C 48 45, 48 45, 48 45 C 48 44, 48 44, 49 44 C 50 44, 51 43, 51 41 C 51 41, 51 40, 50 39 C 50 39, 50 39, 50 39 C 50 38, 50 38, 50 38 C 51 37, 51 36, 51 36 C 51 34, 51 34, 50 34 C 49 34, 49 33, 49 33 C 49 32, 49 32, 50 32 C 50 31, 51 31, 51 29 C 51 28, 50 27, 49 27 L 37 27 C 37 27, 36 27, 36 26 C 36 26, 36 26, 36 25 C 36 24, 37 22, 37 19 C 36 15, 35 12, 33 12 Z M 33 10 C 36 10, 38 14, 39 18 C 39 21, 39 23, 38 25 L 49 25 C 51 25, 53 27, 53 29 C 53 31, 53 32, 52 32 C 53 33, 53 34, 53 36 C 53 37, 53 38, 52 39 C 53 40, 53 40, 53 41 C 53 43, 52 45, 50 46 C 50 46, 50 46, 50 47 C 50 49, 48 51, 46 52 C 46 52, 46 52, 45 52 L 10 52 C 10 52, 9 51, 9 51 C 9 50, 10 50, 10 50 L 12 50 L 12 32 L 4 32 C 3 32, 3 32, 3 31 C 3 31, 3 31, 4 31 L 21 31 C 21 29, 22 28, 24 26 C 26 24, 28 22, 29 19 C 29 18, 29 14, 28 12 C 28 11, 28 11, 29 11 C 29 11, 30 10, 33 10 Z M 32 2 C 16 2, 2 16, 2 33 C 2 49, 16 63, 32 63 C 38 63, 43 62, 48 59 C 48 59, 49 59, 49 59 L 63 63 L 59 49 C 59 49, 59 48, 59 48 C 62 43, 63 38, 63 33 C 63 16, 49 2, 32 2 Z M 32 0 C 50 0, 65 15, 65 33 C 65 38, 63 44, 61 49 L 65 64 C 65 64, 65 65, 65 65 C 64 65, 64 65, 64 65 C 64 65, 64 65, 64 65 L 49 61 C 44 63, 38 65, 32 65 C 15 65, 0 50, 0 33 C 0 15, 15 0, 32 0 Z"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 843,
    "y": 200,
    "width": 65,
    "height": 65,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 62 34 C 47 35, 35 47, 34 62 L 62 34 Z M 33 18 L 28 26 C 28 27, 28 27, 28 27 L 19 28 L 25 34 C 25 35, 26 35, 26 35 L 24 44 L 32 40 C 32 40, 33 40, 33 40 L 39 43 C 39 43, 40 42, 41 42 L 39 35 C 39 35, 40 35, 40 34 L 46 28 L 37 27 C 37 27, 37 27, 37 26 L 33 18 Z M 32 7 C 33 7, 34 7, 35 8 L 36 9 C 37 9, 37 10, 38 9 L 39 9 C 40 8, 41 8, 42 9 C 43 9, 44 10, 44 11 L 45 12 C 45 13, 46 13, 46 13 L 48 13 C 49 13, 50 13, 51 14 C 51 15, 52 16, 52 17 L 52 18 C 52 19, 52 20, 53 20 L 54 21 C 55 21, 56 22, 56 23 C 57 23, 57 25, 56 25 L 56 27 C 55 27, 55 28, 56 29 C 56 29, 56 30, 56 30 C 56 31, 55 31, 55 30 C 53 29, 53 27, 54 26 L 54 25 C 55 24, 55 24, 54 23 C 54 23, 54 23, 53 22 L 52 22 C 51 21, 50 20, 50 18 L 50 17 C 50 16, 50 16, 49 16 C 49 15, 48 15, 48 15 L 47 15 C 45 15, 44 14, 43 13 L 42 11 C 42 11, 42 11, 41 10 C 41 10, 41 10, 40 11 L 39 11 C 37 12, 36 11, 35 10 L 34 9 C 33 9, 33 9, 32 9 C 32 9, 32 9, 31 9 L 30 10 C 29 11, 27 12, 26 11 L 25 11 C 24 10, 24 10, 23 10 C 23 11, 23 11, 22 11 L 22 13 C 21 14, 20 15, 18 15 L 17 15 C 16 15, 16 15, 16 16 C 15 16, 15 16, 15 17 L 15 18 C 15 20, 14 21, 13 22 L 11 22 C 11 23, 11 23, 10 23 C 10 24, 10 24, 11 25 L 11 26 C 12 27, 11 29, 10 30 L 9 31 C 9 32, 9 32, 9 32 C 9 33, 9 33, 9 34 L 10 35 C 11 36, 12 37, 11 39 L 11 40 C 10 41, 10 41, 10 42 C 11 42, 11 42, 11 42 L 13 43 C 14 44, 15 45, 15 47 L 15 48 C 15 48, 15 49, 16 49 C 16 50, 16 50, 17 50 L 18 50 C 20 50, 21 51, 22 52 L 22 54 C 23 54, 23 54, 23 54 C 24 55, 24 55, 25 54 L 26 54 C 27 53, 29 54, 30 55 C 31 55, 31 56, 30 56 C 30 56, 29 56, 29 56 C 28 55, 27 55, 27 56 L 25 56 C 25 56, 24 57, 24 57 C 23 57, 23 56, 23 56 C 22 56, 21 55, 21 54 L 20 53 C 20 52, 19 52, 18 52 L 17 52 C 16 52, 15 51, 14 51 C 13 50, 13 49, 13 48 L 13 46 C 13 46, 13 45, 12 45 L 11 44 C 10 44, 9 43, 9 42 C 8 41, 8 40, 9 39 L 9 38 C 10 37, 9 37, 9 36 L 8 35 C 7 34, 7 33, 7 32 C 7 31, 7 31, 8 30 L 9 29 C 9 28, 10 27, 9 27 L 9 25 C 8 25, 8 23, 9 23 C 9 22, 10 21, 11 21 L 12 20 C 13 20, 13 19, 13 18 L 13 17 C 13 16, 13 15, 14 14 C 15 13, 16 13, 17 13 L 18 13 C 19 13, 20 13, 20 12 L 21 11 C 21 10, 22 9, 23 9 C 23 8, 25 8, 25 9 L 27 9 C 28 10, 28 9, 29 9 L 30 8 C 30 7, 31 7, 32 7 Z M 33 2 C 16 2, 2 16, 2 33 C 2 49, 15 63, 32 63 C 32 56, 34 50, 38 45 L 33 42 L 23 47 C 23 47, 23 47, 23 47 C 22 47, 22 47, 22 47 C 22 47, 22 46, 22 46 L 23 36 L 16 28 C 16 28, 16 28, 16 27 C 16 27, 16 27, 16 27 L 27 25 L 32 16 C 32 15, 33 15, 33 16 L 38 25 L 48 27 C 49 27, 49 27, 49 27 C 49 28, 49 28, 49 28 L 41 36 L 42 40 C 48 35, 55 32, 63 32 C 63 15, 49 2, 33 2 Z M 33 0 C 50 0, 65 15, 65 33 C 65 33, 65 33, 65 33 L 33 65 C 33 65, 33 65, 33 65 C 15 65, 0 50, 0 33 C 0 15, 15 0, 33 0 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 138,
    "y": 200,
    "width": 65,
    "height": 65,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 60 54 L 54 60 L 56 63 C 57 63, 58 63, 58 63 L 63 58 C 63 58, 63 58, 63 57 C 63 57, 63 56, 63 56 L 60 54 Z M 51 44 L 44 51 L 52 59 L 59 52 L 51 44 Z M 44 41 C 43 41, 43 42, 42 42 C 42 43, 41 43, 41 44 L 45 48 L 48 45 L 44 41 Z M 25 18 C 23 18, 21 20, 21 22 C 21 24, 23 25, 25 25 C 27 25, 29 24, 29 22 C 29 20, 27 18, 25 18 Z M 25 16 C 28 16, 31 19, 31 22 C 31 25, 28 27, 25 27 C 22 27, 19 25, 19 22 C 19 19, 22 16, 25 16 Z M 25 11 C 22 11, 20 13, 18 14 C 16 16, 15 19, 15 22 C 15 25, 16 27, 18 29 L 25 37 L 32 29 C 36 25, 36 19, 32 14 C 30 13, 28 11, 25 11 Z M 25 9 C 28 9, 32 11, 34 13 C 39 18, 39 26, 34 31 L 28 37 L 38 37 C 38 37, 39 37, 39 38 C 39 38, 38 39, 38 39 L 13 39 C 12 39, 12 38, 12 38 C 12 37, 12 37, 13 37 L 23 37 L 16 31 C 12 26, 12 18, 16 13 C 19 11, 22 9, 25 9 Z M 25 2 C 19 2, 13 4, 9 9 C 4 13, 2 19, 2 25 C 2 31, 4 37, 9 41 C 13 45, 19 48, 25 48 C 31 48, 37 45, 41 41 C 45 37, 48 31, 48 25 C 48 19, 45 13, 41 9 C 37 4, 31 2, 25 2 Z M 25 0 C 31 0, 38 3, 42 7 C 47 12, 50 18, 50 25 C 50 30, 48 35, 45 39 L 49 43 L 50 42 C 51 42, 51 42, 52 42 L 64 55 C 65 56, 65 58, 64 60 L 60 64 C 59 65, 58 65, 57 65 C 56 65, 55 65, 55 64 L 42 52 C 42 51, 42 51, 42 50 L 43 49 L 39 45 C 35 48, 30 50, 25 50 C 18 50, 12 47, 7 42 C 3 38, 0 31, 0 25 C 0 18, 3 12, 7 7 C 12 3, 18 0, 25 0 Z"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 0,
    "x": 127,
    "y": 302,
    "width": 87,
    "height": 82,
    "text": "1"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 1,
    "x": 362,
    "y": 302,
    "width": 87,
    "height": 82,
    "text": "2"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 2,
    "x": 597,
    "y": 302,
    "width": 87,
    "height": 82,
    "text": "3"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 3,
    "x": 831,
    "y": 302,
    "width": 87,
    "height": 82,
    "text": "4"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 4,
    "x": 1066,
    "y": 302,
    "width": 87,
    "height": 82,
    "text": "5"
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

export function Migso185Template({ data }: { data: BrainData }): ReactElement {
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
