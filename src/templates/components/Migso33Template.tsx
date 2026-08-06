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
    "x": 83,
    "y": 300,
    "width": 269,
    "height": 337,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 0 0 L 269 0 L 269 337 L 135 294 L 0 337 L 0 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 218,
    "y": 298,
    "width": 135,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 135 0 L 0 44 L 0 68 L 135 24 L 135 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 83,
    "y": 298,
    "width": 135,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 135 0 L 0 44 L 0 68 L 135 24 L 135 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 646,
    "y": 300,
    "width": 269,
    "height": 337,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 269 0 L 269 337 L 135 294 L 0 337 L 0 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 780,
    "y": 298,
    "width": 135,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 135 0 L 0 44 L 0 68 L 135 24 L 135 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 646,
    "y": 298,
    "width": 135,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 135 0 L 0 44 L 0 68 L 135 24 L 135 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 927,
    "y": 300,
    "width": 269,
    "height": 337,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 0 L 269 0 L 269 337 L 135 294 L 0 337 L 0 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 1062,
    "y": 298,
    "width": 135,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 135 0 L 0 44 L 0 68 L 135 24 L 135 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 927,
    "y": 298,
    "width": 135,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 135 0 L 0 44 L 0 68 L 135 24 L 135 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 364,
    "y": 300,
    "width": 269,
    "height": 337,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 0 L 269 0 L 269 337 L 135 294 L 0 337 L 0 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 499,
    "y": 298,
    "width": 135,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 135 0 L 0 44 L 0 68 L 135 24 L 135 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 364,
    "y": 298,
    "width": 135,
    "height": 68,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 135 0 L 0 44 L 0 68 L 135 24 L 135 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 164,
    "y": 190,
    "width": 108,
    "height": 108,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 54 0 A 54 54 0 1 1 54 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 445,
    "y": 190,
    "width": 108,
    "height": 108,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 54 0 A 54 54 0 1 1 54 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1008,
    "y": 190,
    "width": 108,
    "height": 108,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 54 0 A 54 54 0 1 1 54 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 726,
    "y": 190,
    "width": 108,
    "height": 108,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 54 0 A 54 54 0 1 1 54 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 752,
    "y": 217,
    "width": 57,
    "height": 53,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 6 37 C 6 37, 6 37, 7 37 L 9 40 C 9 41, 9 41, 9 41 C 9 41, 9 41, 9 41 L 12 39 C 13 39, 13 39, 13 39 C 14 40, 15 41, 16 42 C 17 43, 17 43, 17 43 L 15 46 C 15 47, 15 47, 15 47 C 15 47, 15 47, 15 47 L 18 49 C 19 49, 19 49, 19 49 L 21 46 C 21 45, 21 45, 22 45 C 23 46, 25 46, 26 47 C 26 47, 27 47, 27 47 L 27 51 C 27 51, 27 51, 27 51 L 31 51 C 31 51, 32 51, 32 51 L 32 47 C 32 47, 32 47, 32 47 C 34 46, 35 46, 37 45 C 37 45, 37 45, 38 46 L 39 49 C 39 49, 40 49, 40 49 L 43 47 C 43 47, 43 47, 43 47 C 43 47, 43 47, 43 46 L 42 43 C 41 43, 42 43, 42 42 C 43 41, 44 40, 45 39 C 45 39, 46 39, 46 39 L 49 41 C 49 41, 49 41, 49 41 C 50 41, 50 41, 50 40 L 52 37 C 52 37, 52 37, 53 37 C 53 37, 53 38, 53 38 L 51 41 C 51 42, 50 42, 50 42 C 49 43, 49 42, 48 42 L 46 41 C 45 42, 44 42, 44 43 L 45 46 C 45 46, 45 47, 45 47 C 45 48, 45 48, 44 48 L 41 50 C 40 51, 38 51, 38 50 L 36 47 C 35 48, 34 48, 33 48 L 33 51 C 33 52, 32 53, 31 53 L 27 53 C 26 53, 25 52, 25 51 L 25 48 C 24 48, 23 48, 22 47 L 21 50 C 20 51, 19 51, 18 50 L 14 48 C 14 48, 13 48, 13 47 C 13 47, 13 46, 13 46 L 15 43 C 14 42, 13 42, 12 41 L 10 42 C 10 42, 9 43, 8 42 C 8 42, 7 42, 7 41 L 5 38 C 5 38, 5 37, 6 37 Z M 18 33 C 18 33, 18 33, 18 33 C 20 37, 24 40, 29 40 C 34 40, 38 37, 40 33 C 40 33, 40 33, 40 33 L 18 33 Z M 9 23 L 7 26 L 9 30 L 12 30 L 14 26 L 12 23 L 9 23 Z M 8 22 L 13 22 C 13 22, 13 22, 14 22 L 16 26 C 16 26, 16 27, 16 27 L 14 31 C 13 31, 13 31, 13 31 L 8 31 C 8 31, 7 31, 7 31 L 5 27 C 5 27, 5 26, 5 26 L 7 22 C 7 22, 8 22, 8 22 Z M 10 18 C 6 18, 2 22, 2 26 C 2 31, 6 35, 10 35 C 13 35, 16 34, 17 31 C 17 31, 18 31, 18 31 L 40 31 C 40 31, 41 31, 41 31 C 42 34, 45 35, 48 35 C 51 35, 53 34, 55 31 L 46 31 C 46 31, 46 31, 46 31 L 43 27 C 43 27, 43 26, 43 26 L 46 22 C 46 22, 46 22, 46 22 L 55 22 C 53 19, 51 18, 48 18 C 45 18, 42 19, 41 22 C 41 22, 40 22, 40 22 L 18 22 C 18 22, 17 22, 17 22 C 16 19, 13 18, 10 18 Z M 29 13 C 24 13, 20 16, 18 20 C 18 20, 18 20, 18 20 L 40 20 C 40 20, 40 20, 40 20 C 38 16, 34 13, 29 13 Z M 29 12 C 34 12, 39 14, 41 18 C 43 17, 45 16, 48 16 C 52 16, 55 19, 57 22 C 57 22, 57 23, 57 23 C 57 23, 56 23, 56 23 L 47 23 L 45 26 L 47 30 L 56 30 C 56 30, 57 30, 57 30 C 57 30, 57 31, 57 31 C 55 34, 52 37, 48 37 C 45 37, 43 36, 41 35 C 39 39, 34 41, 29 41 C 24 41, 19 39, 16 35 C 15 36, 13 37, 10 37 C 5 37, 0 32, 0 26 C 0 21, 5 16, 10 16 C 13 16, 15 17, 16 19 C 19 14, 24 12, 29 12 Z M 27 0 L 31 0 C 32 0, 33 1, 33 2 L 33 5 C 34 5, 35 5, 36 6 L 38 3 C 38 3, 39 3, 39 2 C 40 2, 40 2, 41 3 L 44 5 C 45 5, 45 5, 45 6 C 45 6, 45 7, 45 7 L 44 10 C 44 10, 45 11, 46 12 L 48 11 C 49 10, 49 10, 50 11 C 50 11, 51 11, 51 12 L 53 15 C 53 15, 53 16, 53 16 C 53 16, 53 16, 52 16 C 52 16, 52 16, 52 16 L 50 12 C 50 12, 50 12, 49 12 C 49 12, 49 12, 49 12 L 46 14 C 46 14, 45 14, 45 14 C 44 13, 43 12, 42 11 C 42 10, 41 10, 42 10 L 43 7 C 44 6, 43 6, 43 6 L 40 4 C 40 4, 39 4, 39 4 L 38 7 C 37 8, 37 8, 37 8 C 35 7, 34 7, 32 6 C 32 6, 32 6, 32 6 L 32 2 C 32 2, 31 2, 31 2 L 27 2 C 27 2, 27 2, 27 2 L 27 6 C 27 6, 26 6, 26 6 C 25 7, 23 7, 22 8 C 21 8, 21 8, 21 7 L 19 4 C 19 4, 19 4, 18 4 L 15 6 C 15 6, 15 6, 15 6 C 15 6, 15 6, 15 7 L 17 10 C 17 10, 17 10, 16 11 C 15 12, 14 13, 13 14 C 13 14, 13 14, 12 14 L 9 12 C 9 12, 9 12, 9 12 C 9 12, 9 12, 9 12 L 7 16 C 6 16, 6 16, 6 16 C 5 16, 5 15, 5 15 L 7 12 C 7 11, 8 11, 8 11 C 9 10, 10 10, 10 11 L 12 12 C 13 11, 14 10, 15 10 L 13 7 C 13 7, 13 6, 13 6 C 13 5, 14 5, 14 5 L 18 3 C 18 2, 19 2, 19 2 C 20 3, 20 3, 21 3 L 22 6 C 23 5, 24 5, 25 5 L 25 2 C 25 1, 26 0, 27 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 1033,
    "y": 216,
    "width": 57,
    "height": 57,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 55 46 L 55 46 C 50 46, 46 50, 46 55 L 11 55 C 10 50, 7 46, 2 46 L 2 17 L 5 28 C 6 31, 9 33, 12 33 L 13 33 L 13 34 C 13 36, 15 38, 17 38 C 19 38, 21 36, 21 34 L 21 33 L 36 33 L 36 34 C 36 36, 38 38, 40 38 C 42 38, 44 36, 44 34 L 44 33 L 45 33 C 48 33, 51 31, 51 28 L 55 17 L 55 46 Z M 55 53 L 55 53 C 55 54, 54 55, 53 55 L 48 55 C 48 51, 51 48, 55 48 L 55 53 Z M 4 55 L 4 55 C 3 55, 2 54, 2 53 L 2 48 C 6 48, 9 51, 9 55 L 4 55 Z M 20 30 L 20 34 C 20 35, 18 36, 17 36 C 16 36, 14 35, 14 34 L 14 30 L 20 30 Z M 43 30 L 43 34 C 43 35, 41 36, 40 36 C 39 36, 37 35, 37 34 L 37 30 L 43 30 Z M 2 10 L 2 10 C 3 9, 3 9, 4 9 L 53 9 C 53 9, 54 9, 55 10 C 55 10, 55 11, 55 12 L 50 28 C 49 30, 47 31, 45 31 L 44 31 L 44 29 C 44 29, 44 28, 43 28 L 37 28 C 36 28, 36 29, 36 29 L 36 31 L 21 31 L 21 29 C 21 29, 21 28, 20 28 L 14 28 C 13 28, 13 29, 13 29 L 13 31 L 12 31 C 10 31, 8 30, 7 28 L 2 12 C 2 11, 2 10, 2 10 Z M 18 5 L 18 5 C 18 3, 19 2, 22 2 L 35 2 C 37 2, 39 3, 39 5 L 39 7 L 18 7 L 18 5 Z M 56 9 L 56 9 C 55 8, 54 7, 53 7 L 41 7 L 41 5 C 41 2, 38 0, 35 0 L 22 0 C 19 0, 16 2, 16 5 L 16 7 L 4 7 C 3 7, 2 8, 1 9 C 0 10, 0 10, 0 11 L 0 53 C 0 55, 2 57, 4 57 L 53 57 C 55 57, 57 55, 57 53 L 57 11 C 57 10, 57 10, 56 9 Z"
  },
  {
    "id": "sp-18",
    "x": 190,
    "y": 220,
    "width": 57,
    "height": 48,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 7 46 L 50 46 C 51 46, 51 47, 51 47 C 51 48, 51 48, 50 48 L 7 48 C 6 48, 6 48, 6 47 C 6 47, 6 46, 7 46 Z M 45 37 C 45 37, 46 37, 46 38 C 46 38, 45 38, 45 38 C 44 38, 44 38, 44 38 C 44 37, 44 37, 45 37 Z M 40 37 C 40 37, 41 37, 41 38 C 41 38, 40 38, 40 38 C 39 38, 39 38, 39 38 C 39 37, 39 37, 40 37 Z M 36 37 C 36 37, 36 37, 36 38 C 36 38, 36 38, 36 38 C 35 38, 35 38, 35 38 C 35 37, 35 37, 36 37 Z M 31 37 C 32 37, 32 37, 32 38 C 32 38, 32 38, 31 38 C 31 38, 30 38, 30 38 C 30 37, 31 37, 31 37 Z M 26 37 C 27 37, 27 37, 27 38 C 27 38, 27 38, 26 38 C 26 38, 25 38, 25 38 C 25 37, 26 37, 26 37 Z M 22 37 C 22 37, 23 37, 23 38 C 23 38, 22 38, 22 38 C 21 38, 21 38, 21 38 C 21 37, 21 37, 22 37 Z M 17 37 C 18 37, 18 37, 18 38 C 18 38, 18 38, 17 38 C 17 38, 16 38, 16 38 C 16 37, 17 37, 17 37 Z M 13 37 C 13 37, 14 37, 14 38 C 14 38, 13 38, 13 38 C 12 38, 12 38, 12 38 C 12 37, 12 37, 13 37 Z M 45 32 C 46 32, 46 33, 46 33 C 46 34, 46 34, 45 34 C 45 34, 44 34, 44 33 C 44 33, 45 32, 45 32 Z M 41 32 C 41 32, 41 33, 41 33 C 41 34, 41 34, 41 34 C 40 34, 40 34, 40 33 C 40 33, 40 32, 41 32 Z M 36 32 C 36 32, 37 33, 37 33 C 37 34, 36 34, 36 34 C 35 34, 35 34, 35 33 C 35 33, 35 32, 36 32 Z M 31 32 C 31 32, 32 33, 32 33 C 32 34, 31 34, 31 34 C 30 34, 30 34, 30 33 C 30 33, 30 32, 31 32 Z M 26 32 C 27 32, 27 33, 27 33 C 27 34, 27 34, 26 34 C 26 34, 25 34, 25 33 C 25 33, 26 32, 26 32 Z M 21 32 C 22 32, 22 33, 22 33 C 22 34, 22 34, 21 34 C 21 34, 20 34, 20 33 C 20 33, 21 32, 21 32 Z M 17 32 C 17 32, 18 33, 18 33 C 18 34, 17 34, 17 34 C 16 34, 16 34, 16 33 C 16 33, 16 32, 17 32 Z M 12 32 C 13 32, 13 33, 13 33 C 13 34, 13 34, 12 34 C 12 34, 11 34, 11 33 C 11 33, 12 32, 12 32 Z M 53 16 C 52 16, 51 17, 51 18 C 51 19, 52 20, 53 20 C 54 20, 55 19, 55 18 C 55 17, 54 16, 53 16 Z M 4 16 C 3 16, 2 17, 2 18 C 2 19, 3 20, 4 20 C 5 20, 6 19, 6 18 C 6 17, 5 16, 4 16 Z M 18 7 C 18 7, 18 7, 18 7 L 16 25 C 16 26, 15 26, 15 26 C 15 26, 14 26, 14 26 L 6 20 C 6 21, 6 21, 5 21 L 10 42 L 47 42 L 52 21 C 51 21, 51 21, 51 20 L 43 26 C 43 26, 42 26, 42 26 C 42 26, 41 26, 41 25 L 39 7 C 39 7, 39 7, 38 7 L 29 21 C 29 21, 28 21, 28 21 L 18 7 Z M 40 2 C 39 2, 38 3, 38 4 C 38 5, 39 6, 40 6 C 41 6, 42 5, 42 4 C 42 3, 41 2, 40 2 Z M 17 2 C 16 2, 15 3, 15 4 C 15 5, 16 6, 17 6 C 18 6, 19 5, 19 4 C 19 3, 18 2, 17 2 Z M 17 0 C 19 0, 21 2, 21 4 C 21 5, 21 6, 20 6 L 28 19 L 37 6 C 36 6, 36 5, 36 4 C 36 2, 38 0, 40 0 C 42 0, 44 2, 44 4 C 44 5, 43 7, 41 7 L 43 24 L 50 19 C 50 19, 50 18, 50 18 C 50 16, 51 14, 53 14 C 55 14, 57 16, 57 18 C 57 20, 55 21, 53 21 L 49 43 C 49 43, 48 43, 48 43 L 9 43 C 9 43, 8 43, 8 43 L 4 21 C 2 21, 0 20, 0 18 C 0 16, 2 14, 4 14 C 6 14, 7 16, 7 18 C 7 18, 7 19, 7 19 L 14 24 L 16 7 C 14 7, 13 5, 13 4 C 13 2, 15 0, 17 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 472,
    "y": 216,
    "width": 54,
    "height": 57,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 32 42 L 37 42 C 38 42, 38 42, 38 42 C 38 43, 38 43, 37 43 L 32 43 C 31 43, 31 43, 31 42 C 31 42, 31 42, 32 42 Z M 7 42 L 27 42 C 28 42, 28 42, 28 42 C 28 43, 28 43, 27 43 L 7 43 C 6 43, 6 43, 6 42 C 6 42, 6 42, 7 42 Z M 32 36 L 41 36 C 41 36, 41 36, 41 37 C 41 37, 41 37, 41 37 L 32 37 C 31 37, 31 37, 31 37 C 31 36, 31 36, 32 36 Z M 18 36 L 25 36 C 25 36, 26 36, 26 37 C 26 37, 25 37, 25 37 L 18 37 C 18 37, 17 37, 17 37 C 17 36, 18 36, 18 36 Z M 32 30 L 38 30 C 39 30, 39 31, 39 31 C 39 32, 39 32, 38 32 L 32 32 C 31 32, 31 32, 31 31 C 31 31, 31 30, 32 30 Z M 18 30 L 27 30 C 27 30, 28 31, 28 31 C 28 32, 27 32, 27 32 L 18 32 C 18 32, 17 32, 17 31 C 17 31, 18 30, 18 30 Z M 8 26 L 8 36 L 13 36 L 13 26 L 8 26 Z M 32 24 L 41 24 C 41 24, 41 25, 41 25 C 41 26, 41 26, 41 26 L 32 26 C 31 26, 31 26, 31 25 C 31 25, 31 24, 32 24 Z M 18 24 L 27 24 C 27 24, 28 25, 28 25 C 28 26, 27 26, 27 26 L 18 26 C 18 26, 17 26, 17 25 C 17 25, 18 24, 18 24 Z M 7 24 L 14 24 C 15 24, 15 25, 15 25 L 15 37 C 15 37, 15 37, 14 37 L 7 37 C 6 37, 6 37, 6 37 L 6 25 C 6 25, 6 24, 7 24 Z M 32 19 L 41 19 C 41 19, 41 19, 41 19 C 41 20, 41 20, 41 20 L 32 20 C 31 20, 31 20, 31 19 C 31 19, 31 19, 32 19 Z M 7 19 L 27 19 C 28 19, 28 19, 28 19 C 28 20, 28 20, 27 20 L 7 20 C 6 20, 6 20, 6 19 C 6 19, 6 19, 7 19 Z M 47 9 L 47 49 C 47 50, 47 50, 46 50 L 9 50 L 9 55 L 52 55 L 52 9 L 47 9 Z M 8 8 L 8 13 L 40 13 L 40 8 L 8 8 Z M 7 6 L 41 6 C 41 6, 42 6, 42 7 L 42 14 C 42 14, 41 15, 41 15 L 7 15 C 6 15, 6 14, 6 14 L 6 7 C 6 6, 6 6, 7 6 Z M 2 2 L 2 48 L 45 48 L 45 2 L 2 2 Z M 1 0 L 46 0 C 47 0, 47 0, 47 1 L 47 7 L 53 7 C 54 7, 54 7, 54 8 L 54 56 C 54 57, 54 57, 53 57 L 8 57 C 7 57, 7 57, 7 56 L 7 50 L 1 50 C 0 50, 0 50, 0 49 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 0,
    "x": 97,
    "y": 447,
    "width": 242,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 0,
    "x": 97,
    "y": 404,
    "width": 242,
    "height": 36,
    "text": "Your title 1"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 1,
    "x": 378,
    "y": 447,
    "width": 242,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 1,
    "x": 378,
    "y": 404,
    "width": 242,
    "height": 36,
    "text": "Your title 2"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 2,
    "x": 659,
    "y": 447,
    "width": 242,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 2,
    "x": 659,
    "y": 404,
    "width": 242,
    "height": 36,
    "text": "Your title 3"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 3,
    "x": 941,
    "y": 447,
    "width": 242,
    "height": 43,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 3,
    "x": 941,
    "y": 404,
    "width": 242,
    "height": 36,
    "text": "Your title 4"
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

export function Migso33Template({ data }: { data: BrainData }): ReactElement {
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
