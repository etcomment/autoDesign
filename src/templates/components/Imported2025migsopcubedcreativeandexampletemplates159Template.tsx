import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 469,
    "y": 288,
    "width": 143,
    "height": 143,
    "fillColor": "#52c49c",
    "pathD": "M 72 0 A 72 72 0 1 1 71 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 293,
    "y": 390,
    "width": 143,
    "height": 143,
    "fillColor": "#ff4d38",
    "pathD": "M 72 0 A 72 72 0 1 1 71 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 821,
    "y": 83,
    "width": 143,
    "height": 143,
    "fillColor": "#ee6d90",
    "pathD": "M 72 0 A 72 72 0 1 1 71 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 117,
    "y": 492,
    "width": 143,
    "height": 143,
    "fillColor": "#3365cc",
    "pathD": "M 72 0 A 72 72 0 1 1 71 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 106,
    "y": 489,
    "width": 54,
    "height": 54,
    "fillColor": "#3365cc",
    "pathD": "M 27 0 A 27 27 0 1 1 27 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 291,
    "y": 381,
    "width": 54,
    "height": 54,
    "fillColor": "#ff4d38",
    "pathD": "M 27 0 A 27 27 0 1 1 27 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 468,
    "y": 275,
    "width": 54,
    "height": 54,
    "fillColor": "#52c49c",
    "pathD": "M 27 0 A 27 27 0 1 1 27 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 818,
    "y": 75,
    "width": 54,
    "height": 54,
    "fillColor": "#ee6d90",
    "pathD": "M 27 0 A 27 27 0 1 1 27 0 Z"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 249,
    "y": 499,
    "width": 52,
    "height": 27,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 427,
    "y": 396,
    "width": 52,
    "height": 27,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 602,
    "y": 294,
    "width": 52,
    "height": 27,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 779,
    "y": 193,
    "width": 52,
    "height": 27,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 645,
    "y": 185,
    "width": 143,
    "height": 143,
    "fillColor": "#ffb900",
    "pathD": "M 72 0 A 72 72 0 1 1 71 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 638,
    "y": 173,
    "width": 54,
    "height": 54,
    "fillColor": "#ffb900",
    "pathD": "M 27 0 A 27 27 0 1 1 27 0 Z"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 3,
    "x": 301,
    "y": 394,
    "width": 33,
    "height": 24,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 9
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 4,
    "x": 117,
    "y": 501,
    "width": 33,
    "height": 24,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 9
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 2,
    "x": 478,
    "y": 290,
    "width": 33,
    "height": 24,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 9
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 648,
    "y": 187,
    "width": 33,
    "height": 24,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 9
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 0,
    "x": 829,
    "y": 90,
    "width": 33,
    "height": 24,
    "text": "5",
    "textColor": "#ffffff",
    "textSize": 9
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 683,
    "y": 224,
    "width": 65,
    "height": 65,
    "fillColor": "#ffffff",
    "pathD": "M 38 58 C 39 58, 39 58, 39 59 C 39 59, 39 60, 38 60 C 38 60, 37 59, 37 59 C 37 58, 38 58, 38 58 Z M 32 58 C 33 58, 33 58, 33 59 C 33 59, 33 60, 32 60 C 32 60, 31 59, 31 59 C 31 58, 32 58, 32 58 Z M 26 58 C 27 58, 27 58, 27 59 C 27 59, 27 60, 26 60 C 26 60, 25 59, 25 59 C 25 58, 26 58, 26 58 Z M 15 58 C 16 58, 16 58, 16 59 C 16 59, 16 60, 15 60 C 14 60, 14 59, 14 59 C 14 58, 14 58, 15 58 Z M 9 58 C 10 58, 10 58, 10 59 C 10 59, 10 60, 9 60 C 9 60, 8 59, 8 59 C 8 58, 9 58, 9 58 Z M 38 53 C 39 53, 39 53, 39 54 C 39 54, 39 55, 38 55 C 38 55, 37 54, 37 54 C 37 53, 38 53, 38 53 Z M 32 53 C 33 53, 33 53, 33 54 C 33 54, 33 55, 32 55 C 32 55, 31 54, 31 54 C 31 53, 32 53, 32 53 Z M 26 53 C 27 53, 27 53, 27 54 C 27 54, 27 55, 26 55 C 26 55, 25 54, 25 54 C 25 53, 26 53, 26 53 Z M 15 53 C 16 53, 16 53, 16 54 C 16 54, 16 55, 15 55 C 14 55, 14 54, 14 54 C 14 53, 14 53, 15 53 Z M 9 53 C 10 53, 10 53, 10 54 C 10 54, 10 55, 9 55 C 9 55, 8 54, 8 54 C 8 53, 9 53, 9 53 Z M 38 47 C 39 47, 39 48, 39 48 C 39 49, 39 49, 38 49 C 38 49, 37 49, 37 48 C 37 48, 38 47, 38 47 Z M 32 47 C 33 47, 33 48, 33 48 C 33 49, 33 49, 32 49 C 32 49, 31 49, 31 48 C 31 48, 32 47, 32 47 Z M 26 47 C 27 47, 27 48, 27 48 C 27 49, 27 49, 26 49 C 26 49, 25 49, 25 48 C 25 48, 26 47, 26 47 Z M 15 47 C 16 47, 16 48, 16 48 C 16 49, 16 49, 15 49 C 14 49, 14 49, 14 48 C 14 48, 14 47, 15 47 Z M 9 47 C 10 47, 10 48, 10 48 C 10 49, 10 49, 9 49 C 9 49, 8 49, 8 48 C 8 48, 9 47, 9 47 Z M 38 42 C 39 42, 39 43, 39 43 C 39 44, 39 44, 38 44 C 38 44, 37 44, 37 43 C 37 43, 38 42, 38 42 Z M 32 42 C 33 42, 33 43, 33 43 C 33 44, 33 44, 32 44 C 32 44, 31 44, 31 43 C 31 43, 32 42, 32 42 Z M 26 42 C 27 42, 27 43, 27 43 C 27 44, 27 44, 26 44 C 26 44, 25 44, 25 43 C 25 43, 26 42, 26 42 Z M 15 42 C 16 42, 16 43, 16 43 C 16 44, 16 44, 15 44 C 14 44, 14 44, 14 43 C 14 43, 14 42, 15 42 Z M 9 42 C 10 42, 10 43, 10 43 C 10 44, 10 44, 9 44 C 9 44, 8 44, 8 43 C 8 43, 9 42, 9 42 Z M 38 37 C 39 37, 39 37, 39 38 C 39 38, 39 39, 38 39 C 38 39, 37 38, 37 38 C 37 37, 38 37, 38 37 Z M 32 37 C 33 37, 33 37, 33 38 C 33 38, 33 39, 32 39 C 32 39, 31 38, 31 38 C 31 37, 32 37, 32 37 Z M 26 37 C 27 37, 27 37, 27 38 C 27 38, 27 39, 26 39 C 26 39, 25 38, 25 38 C 25 37, 26 37, 26 37 Z M 15 37 C 16 37, 16 37, 16 38 C 16 38, 16 39, 15 39 C 14 39, 14 38, 14 38 C 14 37, 14 37, 15 37 Z M 9 37 C 10 37, 10 37, 10 38 C 10 38, 10 39, 9 39 C 9 39, 8 38, 8 38 C 8 37, 9 37, 9 37 Z M 38 32 C 39 32, 39 32, 39 33 C 39 33, 39 34, 38 34 C 38 34, 37 33, 37 33 C 37 32, 38 32, 38 32 Z M 32 32 C 33 32, 33 32, 33 33 C 33 33, 33 34, 32 34 C 32 34, 31 33, 31 33 C 31 32, 32 32, 32 32 Z M 26 32 C 27 32, 27 32, 27 33 C 27 33, 27 34, 26 34 C 26 34, 25 33, 25 33 C 25 32, 26 32, 26 32 Z M 15 32 C 16 32, 16 32, 16 33 C 16 33, 16 34, 15 34 C 14 34, 14 33, 14 33 C 14 32, 14 32, 15 32 Z M 9 32 C 10 32, 10 32, 10 33 C 10 33, 10 34, 9 34 C 9 34, 8 33, 8 33 C 8 32, 9 32, 9 32 Z M 38 26 C 39 26, 39 27, 39 27 C 39 28, 39 28, 38 28 C 38 28, 37 28, 37 27 C 37 27, 38 26, 38 26 Z M 32 26 C 33 26, 33 27, 33 27 C 33 28, 33 28, 32 28 C 32 28, 31 28, 31 27 C 31 27, 32 26, 32 26 Z M 26 26 C 27 26, 27 27, 27 27 C 27 28, 27 28, 26 28 C 26 28, 25 28, 25 27 C 25 27, 26 26, 26 26 Z M 15 26 C 16 26, 16 27, 16 27 C 16 28, 16 28, 15 28 C 14 28, 14 28, 14 27 C 14 27, 14 26, 15 26 Z M 9 26 C 10 26, 10 27, 10 27 C 10 28, 10 28, 9 28 C 9 28, 8 28, 8 27 C 8 27, 9 26, 9 26 Z M 45 26 L 45 30 L 55 30 C 56 30, 56 31, 56 31 C 56 32, 56 32, 55 32 L 45 32 L 45 37 L 55 37 C 56 37, 56 37, 56 38 C 56 38, 56 39, 55 39 L 45 39 L 45 43 L 55 43 C 56 43, 56 44, 56 44 C 56 45, 56 45, 55 45 L 45 45 L 45 50 L 55 50 C 56 50, 56 50, 56 51 C 56 51, 56 52, 55 52 L 45 52 L 45 56 L 55 56 C 56 56, 56 57, 56 57 C 56 58, 56 58, 55 58 L 45 58 L 45 63 L 60 63 L 60 26 L 45 26 Z M 38 21 C 39 21, 39 21, 39 22 C 39 22, 39 23, 38 23 C 38 23, 37 22, 37 22 C 37 21, 38 21, 38 21 Z M 32 21 C 33 21, 33 21, 33 22 C 33 22, 33 23, 32 23 C 32 23, 31 22, 31 22 C 31 21, 32 21, 32 21 Z M 26 21 C 27 21, 27 21, 27 22 C 27 22, 27 23, 26 23 C 26 23, 25 22, 25 22 C 25 21, 26 21, 26 21 Z M 15 21 C 16 21, 16 21, 16 22 C 16 22, 16 23, 15 23 C 14 23, 14 22, 14 22 C 14 21, 14 21, 15 21 Z M 9 21 C 10 21, 10 21, 10 22 C 10 22, 10 23, 9 23 C 9 23, 8 22, 8 22 C 8 21, 9 21, 9 21 Z M 5 18 L 5 63 L 20 63 L 20 18 L 5 18 Z M 38 16 C 39 16, 39 16, 39 17 C 39 17, 39 18, 38 18 C 38 18, 37 17, 37 17 C 37 16, 38 16, 38 16 Z M 32 16 C 33 16, 33 16, 33 17 C 33 17, 33 18, 32 18 C 32 18, 31 17, 31 17 C 31 16, 32 16, 32 16 Z M 26 16 C 27 16, 27 16, 27 17 C 27 17, 27 18, 26 18 C 26 18, 25 17, 25 17 C 25 16, 26 16, 26 16 Z M 38 10 C 39 10, 39 11, 39 11 C 39 12, 39 12, 38 12 C 38 12, 37 12, 37 11 C 37 11, 38 10, 38 10 Z M 32 10 C 33 10, 33 11, 33 11 C 33 12, 33 12, 32 12 C 32 12, 31 12, 31 11 C 31 11, 32 10, 32 10 Z M 26 10 C 27 10, 27 11, 27 11 C 27 12, 27 12, 26 12 C 26 12, 25 12, 25 11 C 25 11, 26 10, 26 10 Z M 38 5 C 39 5, 39 6, 39 6 C 39 7, 39 7, 38 7 C 38 7, 37 7, 37 6 C 37 6, 38 5, 38 5 Z M 32 5 C 33 5, 33 6, 33 6 C 33 7, 33 7, 32 7 C 32 7, 31 7, 31 6 C 31 6, 32 5, 32 5 Z M 26 5 C 27 5, 27 6, 27 6 C 27 7, 27 7, 26 7 C 26 7, 25 7, 25 6 C 25 6, 26 5, 26 5 Z M 22 2 L 22 63 L 43 63 L 43 2 L 22 2 Z M 18 0 L 47 0 C 47 0, 48 0, 48 1 C 48 2, 47 2, 47 2 L 45 2 L 45 24 L 64 24 C 65 24, 65 24, 65 25 C 65 25, 65 26, 64 26 L 62 26 L 62 63 L 64 63 C 65 63, 65 63, 65 64 C 65 65, 65 65, 64 65 L 1 65 C 0 65, 0 65, 0 64 C 0 63, 0 63, 1 63 L 3 63 L 3 18 L 1 18 C 0 18, 0 17, 0 17 C 0 16, 0 16, 1 16 L 20 16 L 20 2 L 18 2 C 18 2, 17 2, 17 1 C 17 0, 18 0, 18 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 860,
    "y": 122,
    "width": 64,
    "height": 64,
    "fillColor": "#ffffff",
    "pathD": "M 54 8 C 53 8, 52 9, 51 9 C 49 10, 47 11, 46 12 L 40 18 C 40 18, 40 18, 39 18 L 14 13 C 13 13, 13 13, 13 13 L 10 15 C 9 15, 9 15, 9 15 C 9 15, 9 15, 10 16 L 32 25 C 32 26, 32 26, 32 26 C 32 26, 32 27, 32 27 L 20 39 C 20 40, 19 40, 19 40 L 14 40 C 13 40, 12 40, 11 41 L 8 42 L 17 45 L 19 44 C 19 43, 20 43, 20 44 C 21 44, 21 45, 20 45 L 18 47 L 22 55 L 23 53 C 24 52, 24 51, 24 50 L 24 45 C 24 44, 24 44, 24 43 L 37 32 C 37 31, 37 31, 38 31 C 38 31, 38 32, 38 32 L 48 54 C 48 54, 48 55, 49 55 C 49 55, 49 54, 49 54 L 51 51 C 51 51, 51 50, 51 50 L 45 24 C 45 24, 45 24, 46 23 L 52 18 C 53 16, 56 10, 55 8 C 55 8, 55 8, 54 8 Z M 54 6 C 55 6, 56 6, 57 7 C 59 10, 55 17, 53 19 L 47 24 L 53 49 C 53 50, 53 51, 52 52 L 51 55 C 50 56, 50 56, 49 56 C 48 56, 47 56, 46 55 L 37 34 L 26 45 C 26 45, 26 45, 26 45 L 26 50 C 26 51, 25 53, 25 54 L 23 57 C 23 57, 22 57, 22 57 C 22 57, 21 57, 21 57 C 21 57, 20 57, 20 56 L 17 48 L 14 51 C 14 52, 13 52, 13 52 C 13 52, 13 52, 12 51 C 12 51, 12 50, 12 50 L 15 47 L 7 44 C 7 43, 6 43, 6 42 C 6 42, 7 41, 7 41 L 10 39 C 11 38, 12 38, 14 38 L 19 38 C 19 38, 19 38, 19 38 L 30 27 L 9 17 C 8 17, 7 16, 7 15 C 7 14, 8 13, 9 13 L 12 11 C 12 11, 13 11, 14 11 L 39 16 L 45 11 C 46 10, 48 8, 50 7 C 52 7, 53 6, 54 6 Z M 9 2 C 5 2, 2 5, 2 9 L 2 55 C 2 59, 5 62, 9 62 L 55 62 C 59 62, 62 59, 62 55 L 62 9 C 62 5, 59 2, 55 2 L 9 2 Z M 9 0 L 55 0 C 60 0, 64 4, 64 9 L 64 55 C 64 60, 60 64, 55 64 L 9 64 C 4 64, 0 60, 0 55 L 0 9 C 0 4, 4 0, 9 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 161,
    "y": 536,
    "width": 64,
    "height": 54,
    "fillColor": "#ffffff",
    "pathD": "M 56 52 L 40 52 L 40 45 L 50 45 C 53 45, 56 43, 57 41 C 60 41, 62 44, 62 46 C 62 50, 60 52, 56 52 Z M 38 52 L 17 52 L 17 45 L 38 45 L 38 52 Z M 8 43 L 8 43 C 6 43, 5 42, 4 41 C 4 40, 3 39, 4 38 C 6 30, 6 21, 4 13 L 2 6 L 13 4 L 16 16 C 19 24, 25 30, 34 32 L 46 35 C 44 38, 44 41, 44 43 L 8 43 Z M 19 2 L 21 10 L 17 11 L 15 3 L 19 2 Z M 25 20 L 22 22 C 20 20, 19 18, 18 15 L 18 13 L 22 12 L 23 15 C 23 17, 24 18, 25 20 Z M 34 27 L 31 29 C 28 28, 25 26, 23 24 L 26 22 C 28 24, 31 26, 34 27 Z M 47 33 L 34 30 C 34 30, 34 30, 33 30 L 36 28 L 49 31 C 48 32, 47 32, 47 33 Z M 52 31 L 52 31 C 54 32, 56 35, 56 37 C 56 40, 53 43, 50 43 L 46 43 C 46 41, 46 34, 52 31 Z M 58 39 L 58 39 C 58 38, 58 38, 58 37 C 58 33, 55 30, 52 29 L 36 26 C 31 24, 26 20, 24 14 L 20 1 C 20 0, 20 0, 19 0 L 1 5 C 1 5, 0 5, 0 5 C 0 5, 0 6, 0 6 L 2 14 C 4 21, 4 30, 2 37 C 1 39, 2 41, 3 43 C 4 44, 6 45, 8 45 L 15 45 L 15 52 L 1 52 C 0 52, 0 52, 0 53 C 0 53, 0 54, 1 54 L 56 54 C 61 54, 64 51, 64 46 C 64 43, 61 40, 58 39 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 332,
    "y": 428,
    "width": 65,
    "height": 65,
    "fillColor": "#ffffff",
    "pathD": "M 5 46 C 6 46, 6 47, 6 47 C 6 48, 6 48, 5 48 C 5 48, 4 48, 4 47 C 4 47, 5 46, 5 46 Z M 59 46 C 58 46, 56 47, 54 48 C 52 49, 49 50, 46 51 C 46 51, 46 52, 46 52 C 46 53, 46 53, 46 53 C 51 52, 55 50, 57 49 C 58 49, 58 49, 58 49 C 59 48, 59 48, 59 47 C 59 47, 59 47, 59 46 Z M 10 44 L 10 60 C 15 62, 41 69, 61 53 C 62 52, 63 51, 63 51 C 63 50, 63 50, 63 50 C 62 49, 60 50, 58 51 C 55 52, 50 54, 43 56 C 41 56, 39 57, 36 57 C 33 57, 30 57, 27 56 C 27 56, 26 56, 26 55 C 26 55, 27 54, 27 54 C 36 55, 40 55, 42 54 C 42 54, 42 54, 42 54 C 44 53, 44 52, 44 52 C 44 51, 44 50, 43 50 C 42 49, 41 49, 41 49 C 32 49, 30 48, 28 47 C 26 46, 24 44, 10 44 Z M 2 44 L 2 60 L 8 60 L 8 44 L 2 44 Z M 38 27 C 37 27, 35 29, 35 30 C 35 31, 37 32, 38 32 C 39 32, 40 31, 40 30 C 40 29, 39 27, 38 27 Z M 38 25 C 40 25, 42 27, 42 30 C 42 32, 41 33, 39 34 L 39 47 C 40 47, 40 47, 41 47 C 41 47, 43 47, 45 48 C 45 48, 45 49, 45 49 C 48 48, 51 47, 53 46 C 56 44, 58 44, 60 45 C 61 45, 61 46, 61 47 C 61 47, 61 48, 61 48 C 62 47, 63 48, 64 48 C 65 49, 65 50, 65 51 C 65 53, 63 54, 63 54 C 52 63, 40 65, 30 65 C 19 65, 10 62, 9 62 L 1 62 C 0 62, 0 62, 0 61 L 0 43 C 0 43, 0 42, 1 42 L 9 42 C 24 42, 27 44, 29 45 C 30 46, 32 47, 37 47 L 37 34 C 35 33, 34 32, 34 30 C 34 27, 35 25, 38 25 Z M 38 17 C 42 17, 46 19, 49 22 C 49 22, 49 23, 49 23 C 49 23, 49 23, 48 23 C 48 23, 48 23, 47 23 C 42 18, 34 18, 28 23 C 28 23, 27 23, 27 23 C 27 23, 27 22, 27 22 C 30 19, 34 17, 38 17 Z M 38 9 C 44 9, 50 11, 55 16 C 55 16, 55 17, 55 17 C 54 17, 54 17, 54 17 C 54 17, 53 17, 53 17 C 45 9, 31 9, 22 17 C 22 17, 21 17, 21 17 C 20 17, 20 16, 21 16 C 25 11, 31 9, 38 9 Z M 38 0 C 46 0, 55 3, 61 9 C 61 10, 61 10, 61 11 C 61 11, 60 11, 60 11 C 60 11, 60 11, 59 11 C 54 5, 46 2, 38 2 C 30 2, 22 5, 16 11 C 16 11, 15 11, 15 11 C 14 10, 14 10, 15 9 C 21 3, 29 0, 38 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 508,
    "y": 327,
    "width": 65,
    "height": 65,
    "fillColor": "#ffffff",
    "pathD": "M 38 56 C 39 55, 39 55, 40 56 C 40 56, 40 57, 39 57 C 39 57, 39 57, 39 57 C 38 57, 38 57, 38 57 C 37 56, 38 56, 38 56 Z M 50 53 C 50 52, 51 52, 51 53 C 52 53, 52 53, 52 53 C 52 54, 52 54, 51 54 C 51 54, 51 54, 51 54 C 50 54, 50 54, 50 54 C 50 54, 50 54, 50 53 C 50 53, 50 53, 50 53 Z M 57 50 C 57 49, 58 49, 58 50 C 58 50, 58 50, 58 50 C 58 51, 58 51, 58 51 C 58 51, 58 51, 57 51 C 57 51, 57 51, 57 51 C 56 51, 56 51, 56 50 C 56 50, 56 50, 57 50 Z M 33 48 C 33 47, 34 47, 34 48 C 35 48, 34 49, 34 49 C 34 49, 34 49, 33 49 C 33 49, 33 49, 32 49 C 32 48, 32 48, 33 48 Z M 51 45 C 52 46, 52 46, 52 46 C 52 46, 52 47, 51 47 C 51 47, 51 47, 51 47 C 50 47, 50 47, 50 47 C 50 47, 50 46, 50 46 C 50 46, 50 46, 50 46 C 50 45, 51 45, 51 45 Z M 57 42 C 57 42, 58 42, 58 42 C 58 42, 58 43, 58 43 C 58 43, 58 44, 58 44 C 58 44, 58 44, 57 44 C 57 44, 57 44, 57 44 C 56 44, 56 43, 56 43 C 56 43, 56 42, 57 42 Z M 28 40 C 28 40, 29 40, 29 40 C 30 40, 30 41, 29 41 C 29 41, 29 42, 28 42 C 28 42, 28 41, 28 41 C 27 41, 27 40, 28 40 Z M 63 34 L 44 43 L 44 62 L 63 54 L 63 34 Z M 24 34 L 24 54 L 43 62 L 43 43 L 24 34 Z M 51 32 C 51 32, 52 32, 52 33 C 52 33, 51 34, 51 34 C 50 34, 50 33, 50 33 C 50 32, 50 32, 51 32 Z M 37 32 C 37 32, 38 32, 38 33 C 38 33, 37 34, 37 34 C 36 34, 36 33, 36 33 C 36 32, 36 32, 37 32 Z M 13 28 C 14 28, 14 28, 15 28 C 15 28, 15 28, 15 29 C 15 29, 15 29, 15 29 C 14 30, 14 30, 14 30 C 14 30, 13 30, 13 29 C 13 29, 13 29, 13 29 C 13 28, 13 28, 13 28 Z M 28 24 C 29 24, 29 24, 30 25 C 30 25, 30 26, 30 26 C 29 26, 29 26, 29 26 C 29 26, 28 26, 28 26 C 28 25, 28 25, 28 24 Z M 44 24 L 25 33 L 44 41 L 62 33 L 44 24 Z M 6 22 C 6 21, 6 21, 7 22 C 7 22, 7 22, 7 22 C 7 23, 7 23, 7 23 C 7 23, 6 23, 6 23 C 6 23, 6 23, 6 23 C 5 23, 5 23, 5 22 C 5 22, 5 22, 6 22 Z M 11 20 C 12 20, 12 20, 12 21 C 12 22, 12 22, 11 22 C 11 22, 10 22, 10 21 C 10 20, 11 20, 11 20 Z M 16 18 C 16 18, 17 18, 17 18 C 17 19, 17 19, 17 19 C 17 19, 17 20, 17 20 C 17 20, 17 20, 16 20 C 16 20, 16 20, 16 20 C 15 20, 15 19, 15 19 C 15 19, 15 19, 16 18 Z M 40 15 L 22 18 L 18 35 L 22 34 L 22 33 C 22 32, 22 32, 23 32 L 37 25 L 40 15 Z M 8 12 C 8 12, 9 12, 9 12 C 9 12, 9 13, 9 13 C 9 13, 9 13, 9 14 C 9 14, 9 14, 8 14 C 8 14, 8 14, 8 14 C 7 13, 7 13, 7 13 C 7 13, 7 12, 8 12 Z M 21 11 C 22 11, 22 11, 23 11 C 23 12, 23 12, 23 12 C 23 12, 23 13, 23 13 C 22 13, 22 13, 22 13 C 22 13, 21 13, 21 13 C 21 13, 21 12, 21 12 C 21 12, 21 12, 21 11 Z M 26 11 C 26 10, 27 11, 27 11 C 27 12, 27 12, 26 12 C 26 12, 26 12, 26 12 C 26 12, 25 12, 25 12 C 25 11, 25 11, 26 11 Z M 30 10 C 30 9, 31 9, 31 10 C 32 10, 32 10, 32 10 C 32 11, 32 11, 31 11 C 31 11, 31 11, 31 11 C 30 11, 30 11, 30 11 C 30 11, 30 11, 30 10 C 30 10, 30 10, 30 10 Z M 16 7 C 16 7, 17 7, 17 7 C 17 8, 17 8, 17 8 C 17 8, 17 8, 17 9 C 17 9, 17 9, 16 9 C 16 9, 16 9, 16 9 C 15 8, 15 8, 15 8 C 15 8, 15 8, 16 7 Z M 6 7 L 2 23 L 16 35 L 20 18 L 6 7 Z M 20 6 C 21 6, 21 6, 22 7 C 22 7, 21 8, 21 8 C 21 8, 21 8, 21 8 C 20 8, 20 8, 20 7 C 20 7, 20 6, 20 6 Z M 24 6 C 25 5, 26 5, 26 6 C 26 6, 26 6, 26 6 C 26 7, 26 7, 26 7 C 26 7, 25 7, 25 7 C 25 7, 25 7, 24 7 C 24 7, 24 7, 24 6 C 24 6, 24 6, 24 6 Z M 25 2 L 8 5 L 22 17 L 39 13 L 25 2 Z M 25 0 C 25 0, 26 0, 26 0 L 42 13 C 42 13, 42 14, 42 14 L 40 24 L 43 22 C 43 22, 44 22, 44 22 L 64 32 C 65 32, 65 32, 65 33 L 65 54 C 65 55, 65 55, 64 55 L 44 65 C 44 65, 44 65, 44 65 C 43 65, 43 65, 43 65 L 23 55 C 22 55, 22 55, 22 54 L 22 36 L 17 37 C 17 37, 17 37, 17 37 C 17 37, 16 37, 16 37 L 0 25 C 0 24, 0 24, 0 24 L 5 5 C 5 4, 5 4, 5 4 L 25 0 Z"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 4,
    "x": 271,
    "y": 554,
    "width": 256,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 3,
    "x": 446,
    "y": 452,
    "width": 256,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 2,
    "x": 622,
    "y": 350,
    "width": 256,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 1,
    "x": 798,
    "y": 247,
    "width": 256,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 975,
    "y": 145,
    "width": 256,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-25",
    "x": 70,
    "y": 155,
    "width": 365,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
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

export function Imported2025migsopcubedcreativeandexampletemplates159Template({ data }: { data: BrainData }): ReactElement {
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
