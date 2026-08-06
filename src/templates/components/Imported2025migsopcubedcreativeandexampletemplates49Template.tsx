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
    "x": 663,
    "y": 207,
    "width": 555,
    "height": 99,
    "strokeColor": "#3365cc",
    "pathD": "M 10 0 L 545 0 Q 555 0 555 10 L 555 89 Q 555 99 545 99 L 10 99 Q 0 99 0 89 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 663,
    "y": 207,
    "width": 99,
    "height": 99,
    "fillColor": "#3365cc",
    "pathD": "M 50 0 A 50 50 0 1 1 49 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 663,
    "y": 347,
    "width": 555,
    "height": 99,
    "strokeColor": "#ff4d38",
    "pathD": "M 10 0 L 545 0 Q 555 0 555 10 L 555 89 Q 555 99 545 99 L 10 99 Q 0 99 0 89 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 663,
    "y": 347,
    "width": 99,
    "height": 99,
    "fillColor": "#ff4d38",
    "pathD": "M 50 0 A 50 50 0 1 1 49 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 663,
    "y": 487,
    "width": 555,
    "height": 99,
    "strokeColor": "#52c49c",
    "pathD": "M 10 0 L 545 0 Q 555 0 555 10 L 555 89 Q 555 99 545 99 L 10 99 Q 0 99 0 89 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 663,
    "y": 487,
    "width": 99,
    "height": 99,
    "fillColor": "#52c49c",
    "pathD": "M 50 0 A 50 50 0 1 1 49 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 465,
    "y": 420,
    "width": 104,
    "height": 104,
    "strokeColor": "#3365cc",
    "pathD": "M 52 0 A 52 52 0 1 1 52 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 200,
    "y": 151,
    "width": 104,
    "height": 104,
    "strokeColor": "#52c49c",
    "pathD": "M 52 0 A 52 52 0 1 1 52 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 59,
    "y": 329,
    "width": 104,
    "height": 104,
    "strokeColor": "#ff4d38",
    "pathD": "M 52 0 A 52 52 0 1 1 52 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 82,
    "y": 355,
    "width": 58,
    "height": 52,
    "fillColor": "#ff4d38",
    "pathD": "M 47 45 C 47 45, 48 46, 48 46 C 48 46, 47 47, 47 47 C 46 47, 46 46, 46 46 C 46 46, 46 45, 47 45 Z M 10 45 C 10 45, 10 46, 10 46 C 10 46, 10 47, 10 47 C 9 47, 9 46, 9 46 C 9 46, 9 45, 10 45 Z M 47 42 C 45 42, 43 44, 43 46 C 43 46, 43 46, 43 46 C 43 46, 43 46, 43 46 C 43 48, 45 50, 47 50 C 49 50, 51 48, 51 46 C 51 44, 49 42, 47 42 Z M 10 42 C 7 42, 6 44, 6 46 C 6 48, 7 50, 10 50 C 12 50, 14 48, 14 46 C 14 44, 12 42, 10 42 Z M 11 11 L 11 22 L 19 23 C 20 23, 20 23, 20 24 C 20 24, 20 25, 19 25 L 19 25 L 11 24 L 11 35 L 47 35 C 49 35, 51 33, 52 31 L 53 26 L 44 26 C 44 26, 44 25, 44 25 C 44 25, 44 24, 45 24 L 54 25 L 56 19 C 56 18, 56 18, 56 17 C 55 16, 55 16, 54 16 L 38 14 L 38 19 L 42 19 C 43 19, 43 20, 43 20 C 43 20, 43 21, 43 21 L 33 31 C 33 31, 33 31, 32 31 C 32 31, 32 31, 32 31 L 22 21 C 22 21, 22 20, 22 20 C 22 20, 22 19, 23 19 L 27 19 L 27 13 L 11 11 Z M 1 0 C 6 0, 10 4, 11 9 L 27 11 L 27 5 C 27 4, 28 4, 28 4 C 29 4, 29 4, 29 5 L 29 20 C 29 21, 29 21, 28 21 L 25 21 L 32 29 L 40 21 L 37 21 C 36 21, 36 21, 36 20 L 36 6 C 36 5, 36 5, 37 5 C 37 5, 38 5, 38 6 L 38 12 L 54 14 C 56 14, 57 15, 57 16 C 58 17, 58 19, 58 20 L 53 32 C 52 35, 49 36, 47 36 L 11 36 L 11 40 C 13 41, 15 43, 16 45 L 41 45 C 42 42, 44 40, 47 40 C 50 40, 53 43, 53 46 C 53 49, 50 52, 47 52 C 44 52, 42 50, 41 47 L 16 47 C 15 50, 13 52, 10 52 C 6 52, 4 49, 4 46 C 4 43, 6 41, 9 40 L 9 36 L 9 10 C 9 5, 5 2, 1 2 C 0 2, 0 1, 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 223,
    "y": 180,
    "width": 59,
    "height": 45,
    "fillColor": "#52c49c",
    "pathD": "M 45 39 C 45 39, 46 39, 46 40 C 46 40, 45 40, 45 40 C 44 40, 44 40, 44 40 C 44 39, 44 39, 45 39 Z M 11 39 C 11 39, 12 39, 12 40 C 12 40, 11 40, 11 40 C 10 40, 10 40, 10 40 C 10 39, 10 39, 11 39 Z M 11 36 C 9 36, 7 37, 7 39 C 7 42, 9 43, 11 43 C 13 43, 15 42, 15 39 C 15 37, 13 36, 11 36 Z M 45 36 C 43 36, 41 37, 41 39 C 41 42, 43 43, 45 43 C 47 43, 49 42, 49 39 C 49 37, 47 36, 45 36 Z M 11 34 C 14 34, 16 36, 16 39 C 16 42, 14 45, 11 45 C 8 45, 5 42, 5 39 C 5 36, 8 34, 11 34 Z M 55 29 C 54 29, 53 30, 53 30 L 53 31 C 53 32, 54 33, 55 33 L 57 33 L 57 29 L 55 29 Z M 39 26 L 43 26 C 43 26, 43 26, 43 27 C 43 27, 43 28, 43 28 L 40 28 L 40 28 C 40 29, 39 29, 39 29 C 38 29, 38 29, 38 28 L 38 27 C 38 26, 38 26, 39 26 Z M 2 16 L 2 30 L 13 30 L 19 30 L 19 16 L 2 16 Z M 38 12 L 42 21 L 48 21 L 44 12 L 38 12 Z M 33 6 L 33 31 L 33 39 L 39 39 C 40 36, 42 34, 45 34 C 48 34, 50 36, 50 39 L 53 39 C 55 39, 57 37, 57 35 L 57 35 L 55 35 C 53 35, 51 33, 51 31 L 51 30 C 51 29, 53 27, 55 27 L 57 27 L 57 27 C 57 25, 55 23, 53 23 L 50 23 L 41 23 C 41 23, 41 23, 40 22 L 36 12 C 36 11, 36 11, 36 11 C 36 10, 36 10, 37 10 L 43 10 L 42 7 C 41 7, 41 6, 40 6 L 33 6 Z M 11 2 L 11 14 L 20 14 C 20 14, 21 15, 21 15 L 21 30 L 31 30 L 31 6 L 31 2 L 11 2 Z M 10 0 L 32 0 C 33 0, 33 0, 33 1 L 33 5 L 40 5 C 41 5, 43 6, 43 7 L 50 21 L 53 21 C 56 21, 59 24, 59 27 L 59 28 L 59 34 L 59 35 C 59 38, 56 40, 53 40 L 50 40 C 50 43, 48 45, 45 45 C 42 45, 40 43, 39 40 L 32 40 L 20 40 C 20 40, 19 40, 19 39 C 19 39, 20 39, 20 39 L 31 39 L 31 32 L 20 32 L 12 32 L 2 32 L 2 35 C 2 35, 1 35, 1 35 C 0 35, 0 35, 0 35 L 0 31 L 0 15 C 0 15, 0 14, 1 14 L 9 14 L 9 1 C 9 0, 9 0, 10 0 Z"
  },
  {
    "id": "sp-11",
    "x": 488,
    "y": 442,
    "width": 57,
    "height": 58,
    "fillColor": "#3365cc",
    "pathD": "M 12 42 L 45 42 C 45 42, 46 42, 46 43 C 46 43, 45 44, 45 44 L 12 44 C 12 44, 12 43, 12 43 C 12 42, 12 42, 12 42 Z M 2 25 L 2 49 L 11 49 C 11 49, 12 49, 12 50 L 12 55 L 21 49 C 21 49, 22 49, 22 49 L 55 49 L 55 25 L 49 25 L 46 38 C 46 38, 46 39, 45 39 L 13 39 C 12 39, 12 38, 12 38 L 9 25 L 2 25 Z M 29 18 L 26 24 L 29 29 L 32 24 L 29 18 Z M 28 16 C 28 15, 29 15, 30 16 L 33 23 C 34 24, 34 24, 33 24 L 30 32 C 29 32, 29 32, 29 32 C 28 32, 28 32, 28 32 L 24 24 C 24 24, 24 24, 24 23 L 28 16 Z M 29 3 L 20 20 C 20 20, 20 20, 19 21 C 19 21, 19 21, 19 20 L 8 14 L 13 37 L 44 37 L 50 14 L 39 20 C 39 21, 39 21, 39 21 C 38 20, 38 20, 38 20 L 29 3 Z M 28 0 C 28 0, 29 0, 30 0 L 39 19 L 51 11 C 52 11, 52 11, 52 11 C 53 12, 53 12, 53 12 L 50 23 L 56 23 C 57 23, 57 24, 57 24 L 57 50 C 57 50, 57 51, 56 51 L 22 51 L 11 58 C 11 58, 11 58, 11 58 C 10 58, 10 58, 10 58 C 10 58, 10 57, 10 57 L 10 51 L 1 51 C 0 51, 0 50, 0 50 L 0 24 C 0 24, 0 23, 1 23 L 8 23 L 5 12 C 5 12, 5 12, 6 11 C 6 11, 6 11, 7 11 L 19 19 L 28 0 Z"
  },
  {
    "id": "sp-12",
    "x": 687,
    "y": 231,
    "width": 52,
    "height": 54,
    "fillColor": "#ffffff",
    "pathD": "M 11 39 L 41 39 C 41 39, 42 39, 42 40 C 42 40, 41 41, 41 41 L 11 41 C 11 41, 11 40, 11 40 C 11 39, 11 39, 11 39 Z M 2 23 L 2 45 L 10 45 C 10 45, 11 46, 11 46 L 11 52 L 19 46 C 20 45, 20 45, 20 45 L 50 45 L 50 23 L 45 23 L 42 35 C 42 36, 42 36, 41 36 L 12 36 C 11 36, 11 36, 11 35 L 8 23 L 2 23 Z M 26 17 L 24 22 L 26 27 L 29 22 L 26 17 Z M 26 15 C 26 14, 27 14, 27 15 L 31 22 C 31 22, 31 22, 31 23 L 27 30 C 27 30, 27 30, 26 30 C 26 30, 26 30, 26 30 L 22 23 C 22 22, 22 22, 22 22 L 26 15 Z M 26 3 L 18 19 C 18 19, 18 19, 18 19 C 17 19, 17 19, 17 19 L 7 13 L 12 34 L 41 34 L 46 13 L 36 19 C 36 19, 35 19, 35 19 C 35 19, 35 19, 35 19 L 26 3 Z M 26 0 C 26 0, 27 0, 27 0 L 36 17 L 47 11 C 47 10, 47 10, 48 11 C 48 11, 48 11, 48 11 L 45 22 L 51 22 C 52 22, 52 22, 52 23 L 52 46 C 52 47, 52 47, 51 47 L 20 47 L 10 54 C 10 54, 10 54, 10 54 C 10 54, 9 54, 9 54 C 9 54, 9 53, 9 53 L 9 47 L 1 47 C 0 47, 0 47, 0 46 L 0 23 C 0 22, 0 22, 1 22 L 7 22 L 5 11 C 5 11, 5 11, 5 11 C 5 10, 6 10, 6 11 L 17 17 L 26 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 686,
    "y": 516,
    "width": 54,
    "height": 42,
    "fillColor": "#ffffff",
    "pathD": "M 41 36 C 41 36, 42 37, 42 37 C 42 37, 41 38, 41 38 C 40 38, 40 37, 40 37 C 40 37, 40 36, 41 36 Z M 10 36 C 10 36, 11 37, 11 37 C 11 37, 10 38, 10 38 C 9 38, 9 37, 9 37 C 9 37, 9 36, 10 36 Z M 10 33 C 8 33, 6 35, 6 37 C 6 39, 8 40, 10 40 C 12 40, 13 39, 13 37 C 13 35, 12 33, 10 33 Z M 41 33 C 39 33, 38 35, 38 37 C 38 39, 39 40, 41 40 C 43 40, 45 39, 45 37 C 45 35, 43 33, 41 33 Z M 10 32 C 13 32, 15 34, 15 37 C 15 40, 13 42, 10 42 C 7 42, 5 40, 5 37 C 5 34, 7 32, 10 32 Z M 50 27 C 49 27, 49 28, 49 28 L 49 29 C 49 30, 49 31, 50 31 L 52 31 L 52 27 L 50 27 Z M 36 24 L 39 24 C 39 24, 40 25, 40 25 C 40 25, 39 26, 39 26 L 36 26 L 36 27 C 36 27, 36 27, 36 27 C 35 27, 35 27, 35 27 L 35 25 C 35 25, 35 24, 36 24 Z M 2 15 L 2 28 L 12 28 L 17 28 L 17 15 L 2 15 Z M 35 11 L 38 20 L 44 20 L 40 11 L 35 11 Z M 30 6 L 30 29 L 30 36 L 36 36 C 36 34, 39 32, 41 32 C 44 32, 46 34, 46 36 L 49 36 C 51 36, 52 34, 52 32 L 52 32 L 50 32 C 48 32, 47 31, 47 29 L 47 28 C 47 27, 48 25, 50 25 L 52 25 L 52 25 C 52 23, 51 21, 49 21 L 45 21 L 38 21 C 37 21, 37 21, 37 21 L 33 11 C 33 10, 33 10, 33 10 C 33 10, 33 10, 33 10 L 39 10 L 38 7 C 38 6, 37 6, 37 6 L 30 6 Z M 10 2 L 10 13 L 18 13 C 19 13, 19 14, 19 14 L 19 28 L 28 28 L 28 5 L 28 2 L 10 2 Z M 9 0 L 29 0 C 30 0, 30 0, 30 1 L 30 4 L 37 4 C 38 4, 39 5, 40 6 L 46 20 L 49 20 C 52 20, 54 22, 54 25 L 54 26 L 54 32 L 54 32 C 54 35, 52 38, 49 38 L 46 38 C 46 40, 44 42, 41 42 C 39 42, 36 40, 36 38 L 29 38 L 18 38 C 18 38, 17 37, 17 37 C 17 36, 18 36, 18 36 L 28 36 L 28 30 L 18 30 L 11 30 L 2 30 L 2 32 C 2 33, 1 33, 1 33 C 0 33, 0 33, 0 32 L 0 29 L 0 14 C 0 14, 0 13, 1 13 L 8 13 L 8 1 C 8 0, 9 0, 9 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 685,
    "y": 373,
    "width": 54,
    "height": 48,
    "fillColor": "#ffffff",
    "pathD": "M 44 42 C 44 42, 44 42, 44 42 C 44 43, 44 43, 44 43 C 43 43, 43 43, 43 42 C 43 42, 43 42, 44 42 Z M 9 42 C 9 42, 10 42, 10 42 C 10 43, 9 43, 9 43 C 8 43, 8 43, 8 42 C 8 42, 8 42, 9 42 Z M 44 39 C 42 39, 40 40, 40 42 C 40 43, 40 43, 40 43 C 40 43, 40 43, 40 43 C 40 45, 42 46, 44 46 C 46 46, 47 45, 47 43 C 47 40, 46 39, 44 39 Z M 9 39 C 7 39, 5 40, 5 43 C 5 45, 7 46, 9 46 C 11 46, 13 45, 13 43 C 13 40, 11 39, 9 39 Z M 10 10 L 10 21 L 18 21 C 18 21, 19 22, 19 22 C 19 22, 18 23, 18 23 L 18 23 L 10 22 L 10 32 L 43 32 C 45 32, 47 31, 48 29 L 50 24 L 41 24 C 41 24, 41 24, 41 23 C 41 23, 41 22, 41 22 L 50 23 L 52 18 C 52 17, 52 16, 52 16 C 52 15, 51 15, 50 14 L 35 13 L 35 18 L 39 18 C 40 18, 40 18, 40 18 C 40 19, 40 19, 40 19 L 31 29 C 31 29, 30 29, 30 29 C 30 29, 30 29, 30 29 L 20 19 C 20 19, 20 19, 20 18 C 20 18, 21 18, 21 18 L 26 18 L 26 12 L 10 10 Z M 1 0 C 6 0, 9 4, 10 8 L 26 10 L 26 4 C 26 4, 26 3, 26 3 C 27 3, 27 4, 27 4 L 27 19 C 27 19, 27 20, 26 20 L 23 20 L 30 27 L 37 20 L 34 20 C 34 20, 33 19, 33 19 L 33 5 C 33 5, 34 4, 34 4 C 35 4, 35 5, 35 5 L 35 11 L 50 13 C 52 13, 53 14, 53 15 C 54 16, 54 17, 54 18 L 49 29 C 49 32, 46 34, 43 34 L 10 34 L 10 37 C 12 38, 14 39, 14 42 L 38 42 C 39 39, 41 37, 44 37 C 47 37, 49 40, 49 43 C 49 46, 47 48, 44 48 C 41 48, 39 46, 38 43 L 14 43 C 14 46, 12 48, 9 48 C 6 48, 4 46, 4 43 C 4 40, 6 38, 8 37 L 8 33 L 8 9 C 8 5, 5 2, 1 2 C 0 2, 0 1, 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 0,
    "x": 784,
    "y": 214,
    "width": 141,
    "height": 36,
    "text": "Your title 1",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 782,
    "y": 241,
    "width": 416,
    "height": 60,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 1,
    "x": 784,
    "y": 354,
    "width": 141,
    "height": 36,
    "text": "Your title 2",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 1,
    "x": 782,
    "y": 382,
    "width": 416,
    "height": 60,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 2,
    "x": 784,
    "y": 494,
    "width": 141,
    "height": 36,
    "text": "Your title 3",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 2,
    "x": 782,
    "y": 522,
    "width": 416,
    "height": 60,
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

export function Imported2025migsopcubedcreativeandexampletemplates49Template({ data }: { data: BrainData }): ReactElement {
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
