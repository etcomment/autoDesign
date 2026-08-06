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
    "x": 130,
    "y": 376,
    "width": 863,
    "height": 60,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 130,
    "y": 561,
    "width": 863,
    "height": 60,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 130,
    "y": 499,
    "width": 863,
    "height": 60,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 130,
    "y": 438,
    "width": 863,
    "height": 60,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-4",
    "x": 863,
    "y": 263,
    "width": 491,
    "height": 226,
    "fillColor": "#4a90d9",
    "pathD": "M 246 0 L 491 226 L 0 226 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 130,
    "y": 130,
    "width": 171,
    "height": 243
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 303,
    "y": 130,
    "width": 171,
    "height": 243,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 475,
    "y": 130,
    "width": 171,
    "height": 243,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 649,
    "y": 130,
    "width": 171,
    "height": 243,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 822,
    "y": 130,
    "width": 171,
    "height": 243,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-10",
    "x": 455,
    "y": 388,
    "width": 212,
    "height": 36,
    "text": "Firm infrastructure",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "x": 398,
    "y": 450,
    "width": 328,
    "height": 36,
    "text": "Human resource management",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-12",
    "x": 423,
    "y": 512,
    "width": 277,
    "height": 36,
    "text": "Technology development",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "x": 486,
    "y": 573,
    "width": 152,
    "height": 36,
    "text": "Procurement",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 1045,
    "y": 356,
    "width": 88,
    "height": 36,
    "text": "Values",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-15",
    "x": 438,
    "y": 632,
    "width": 247,
    "height": 36,
    "text": "SUPPORT ACTIVITIES",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "x": -1,
    "y": 234,
    "width": 198,
    "height": 36,
    "text": "Primary activities",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 0,
    "x": 158,
    "y": 269,
    "width": 114,
    "height": 61,
    "text": "Inbound Logistics",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "x": 321,
    "y": 269,
    "width": 133,
    "height": 36,
    "text": "Operations",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 1,
    "x": 499,
    "y": 269,
    "width": 122,
    "height": 61,
    "text": "Outbound Logistics",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 2,
    "x": 673,
    "y": 269,
    "width": 121,
    "height": 61,
    "text": "Marketing And sales",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 860,
    "y": 269,
    "width": 96,
    "height": 36,
    "text": "Service",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 130,
    "y": 637,
    "width": 285,
    "height": 23,
    "pathD": "M 285 6 L 114 6 L 114 0 L 0 12 L 114 23 L 114 17 L 285 17 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 708,
    "y": 637,
    "width": 285,
    "height": 23,
    "pathD": "M 0 6 L 171 6 L 171 0 L 285 12 L 171 23 L 171 17 L 0 17 Z"
  },
  {
    "id": "sp-24",
    "x": 359,
    "y": 209,
    "width": 66,
    "height": 43,
    "fillColor": "#ffffff",
    "pathD": "M 57 25 C 58 25, 58 26, 59 26 C 59 26, 59 27, 59 27 C 59 28, 59 29, 59 29 C 58 29, 58 30, 57 30 C 57 30, 56 29, 56 29 C 55 29, 55 28, 55 27 C 55 27, 55 26, 56 26 C 56 26, 57 25, 57 25 Z M 45 25 C 46 25, 46 26, 46 26 C 47 26, 47 27, 47 27 C 47 28, 47 29, 46 29 C 46 29, 46 30, 45 30 C 44 30, 44 29, 44 29 C 43 29, 43 28, 43 27 C 43 27, 43 26, 44 26 C 44 26, 44 25, 45 25 Z M 33 25 C 34 25, 34 26, 34 26 C 35 26, 35 27, 35 27 C 35 28, 35 29, 34 29 C 34 29, 34 30, 33 30 C 32 30, 32 29, 32 29 C 31 29, 31 28, 31 27 C 31 27, 31 26, 32 26 C 32 26, 32 25, 33 25 Z M 21 25 C 22 25, 22 26, 22 26 C 23 26, 23 27, 23 27 C 23 28, 23 29, 22 29 C 22 29, 22 30, 21 30 C 20 30, 20 29, 20 29 C 19 29, 19 28, 19 27 C 19 27, 19 26, 20 26 C 20 26, 20 25, 21 25 Z M 9 25 C 10 25, 10 26, 10 26 C 11 26, 11 27, 11 27 C 11 28, 11 29, 10 29 C 10 29, 10 30, 9 30 C 8 30, 8 29, 7 29 C 7 29, 7 28, 7 27 C 7 27, 7 26, 7 26 C 8 26, 8 25, 9 25 Z M 57 23 C 56 23, 55 23, 54 24 C 53 25, 52 26, 52 27 C 52 29, 53 30, 54 31 C 55 32, 56 32, 57 32 C 58 32, 60 32, 60 31 C 61 30, 62 29, 62 27 C 62 26, 61 25, 60 24 C 60 23, 58 23, 57 23 Z M 45 23 C 44 23, 43 23, 42 24 C 41 25, 40 26, 40 27 C 40 29, 41 30, 42 31 C 43 32, 44 32, 45 32 C 46 32, 48 32, 48 31 C 49 30, 50 29, 50 27 C 50 26, 49 25, 48 24 C 48 23, 46 23, 45 23 Z M 33 23 C 32 23, 30 23, 30 24 C 29 25, 28 26, 28 27 C 28 29, 29 30, 30 31 C 30 32, 32 32, 33 32 C 34 32, 36 32, 36 31 C 37 30, 38 29, 38 27 C 38 26, 37 25, 36 24 C 36 23, 34 23, 33 23 Z M 21 23 C 20 23, 18 23, 18 24 C 17 25, 16 26, 16 27 C 16 29, 17 30, 18 31 C 18 32, 20 32, 21 32 C 22 32, 24 32, 24 31 C 25 30, 26 29, 26 27 C 26 26, 25 25, 24 24 C 24 23, 22 23, 21 23 Z M 9 23 C 8 23, 6 23, 6 24 C 5 25, 4 26, 4 27 C 4 29, 5 30, 6 31 C 6 32, 8 32, 9 32 C 10 32, 11 32, 12 31 C 13 30, 14 29, 14 27 C 14 26, 13 25, 12 24 C 11 23, 10 23, 9 23 Z M 9 18 L 21 18 L 33 18 L 45 18 L 57 18 C 60 18, 62 19, 63 21 C 65 23, 66 25, 66 27 C 66 30, 65 32, 63 34 C 62 35, 60 36, 57 36 L 52 36 L 52 40 L 55 40 C 56 40, 56 41, 56 42 C 56 42, 56 43, 55 43 L 47 43 C 46 43, 45 42, 45 42 C 45 41, 46 40, 47 40 L 49 40 L 49 36 L 45 36 L 33 36 L 21 36 L 18 36 L 18 40 L 21 40 C 21 40, 22 41, 22 42 C 22 42, 21 43, 21 43 L 12 43 C 12 43, 11 42, 11 42 C 11 41, 12 40, 12 40 L 15 40 L 15 36 L 9 36 C 6 36, 4 35, 3 34 C 1 32, 0 30, 0 27 C 0 25, 1 23, 3 21 C 4 19, 6 18, 9 18 Z M 51 15 L 51 15 L 51 15 L 52 15 L 53 15 L 54 15 L 54 15 L 53 15 L 52 15 L 51 15 L 51 15 Z M 26 15 L 26 15 L 27 15 L 27 15 L 28 15 L 29 15 L 29 15 L 28 15 L 27 15 L 27 15 L 26 15 Z M 37 14 L 37 15 L 41 15 L 45 15 L 45 14 L 41 14 L 37 14 Z M 12 14 L 12 15 L 16 15 L 20 15 L 20 14 L 16 14 L 12 14 Z M 53 12 L 52 13 L 53 13 L 53 14 L 53 14 L 53 14 L 53 13 L 54 13 L 53 12 Z M 51 12 L 51 13 L 51 13 L 51 14 L 51 14 L 52 14 L 52 13 L 52 13 L 51 12 Z M 37 12 L 37 13 L 41 13 L 45 13 L 45 12 L 41 12 L 37 12 Z M 28 12 L 27 13 L 28 13 L 28 14 L 28 14 L 29 14 L 29 13 L 29 13 L 28 12 Z M 27 12 L 26 13 L 26 13 L 26 14 L 27 14 L 27 14 L 27 13 L 27 13 L 27 12 Z M 12 12 L 12 13 L 16 13 L 20 13 L 20 12 L 16 12 L 12 12 Z M 43 1 L 43 5 L 43 6 L 43 6 L 44 6 L 44 6 L 45 6 L 45 6 L 45 6 L 46 6 L 46 6 L 47 6 L 47 6 L 47 6 L 48 6 L 48 1 L 43 1 Z M 18 1 L 18 5 L 18 6 L 18 6 L 19 6 L 19 6 L 20 6 L 20 6 L 21 6 L 21 6 L 21 6 L 22 6 L 22 6 L 23 6 L 23 6 L 23 1 L 18 1 Z M 36 0 L 41 0 L 41 0 L 43 0 L 48 0 L 50 0 L 51 0 L 52 0 L 53 0 L 55 0 C 55 0, 56 0, 56 1 L 56 16 C 56 17, 55 17, 55 17 L 53 17 L 52 17 L 51 17 L 41 17 L 36 17 C 36 17, 35 17, 35 16 L 35 1 C 35 0, 36 0, 36 0 Z M 11 0 L 16 0 L 16 0 L 18 0 L 23 0 L 25 0 L 27 0 L 27 0 L 28 0 L 30 0 C 30 0, 31 0, 31 1 L 31 16 C 31 17, 30 17, 30 17 L 28 17 L 27 17 L 27 17 L 16 17 L 11 17 C 11 17, 10 17, 10 16 L 10 1 C 10 0, 11 0, 11 0 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 192,
    "y": 199,
    "width": 66,
    "height": 54,
    "fillColor": "#ffffff",
    "pathD": "M 10 48 C 9 48, 9 48, 9 48 C 9 48, 8 49, 8 49 C 8 50, 9 50, 9 50 C 9 50, 9 51, 10 51 C 10 51, 11 50, 11 50 C 11 50, 11 50, 11 49 C 11 49, 11 48, 11 48 C 11 48, 10 48, 10 48 Z M 32 46 C 32 46, 31 46, 31 47 C 31 47, 31 47, 31 48 C 31 48, 31 49, 31 49 C 31 49, 32 50, 32 50 C 33 50, 33 49, 34 49 C 34 49, 34 48, 34 48 C 34 47, 34 47, 34 47 C 33 46, 33 46, 32 46 Z M 10 44 C 11 44, 12 45, 13 46 C 14 47, 15 48, 15 49 C 15 51, 14 52, 13 53 C 12 53, 11 54, 10 54 C 8 54, 7 53, 6 53 C 5 52, 5 51, 5 49 C 5 48, 5 47, 6 46 C 7 45, 8 44, 10 44 Z M 32 42 C 34 42, 36 43, 37 44 C 38 45, 39 46, 39 48 C 39 50, 38 51, 37 52 C 36 53, 34 54, 32 54 C 31 54, 29 53, 28 52 C 27 51, 26 50, 26 48 C 26 46, 27 45, 28 44 C 29 43, 31 42, 32 42 Z M 61 39 L 61 39 L 62 39 L 63 39 L 64 39 L 64 39 L 64 39 L 64 39 L 63 39 L 62 39 L 61 39 Z M 47 38 L 47 39 L 48 39 L 49 39 L 50 39 L 50 39 L 51 39 L 52 39 L 53 39 L 54 39 L 55 39 L 55 39 L 55 38 L 55 38 L 54 38 L 53 38 L 52 38 L 51 38 L 50 38 L 50 38 L 49 38 L 48 38 L 47 38 Z M 63 36 L 63 37 L 63 37 L 63 37 L 63 37 L 63 38 L 64 38 L 64 38 L 64 37 L 64 37 L 64 37 L 63 36 Z M 62 36 L 61 37 L 61 37 L 61 38 L 62 38 L 62 38 L 62 37 L 62 37 L 62 37 L 62 36 Z M 47 36 L 47 37 L 48 37 L 49 37 L 50 37 L 50 37 L 51 37 L 52 37 L 53 37 L 54 37 L 55 37 L 55 37 L 55 36 L 55 36 L 54 36 L 53 36 L 52 36 L 51 36 L 50 36 L 50 36 L 49 36 L 48 36 L 47 36 Z M 62 32 L 63 32 L 64 34 L 64 34 L 65 34 L 64 32 L 64 32 L 63 32 L 62 32 Z M 61 32 L 61 32 L 62 34 L 62 34 L 63 34 L 63 34 L 63 34 L 62 32 L 62 32 L 61 32 L 61 32 Z M 59 32 L 59 32 L 60 34 L 60 34 L 61 34 L 61 34 L 61 34 L 60 32 L 60 32 L 59 32 L 59 32 Z M 57 32 L 57 32 L 58 34 L 58 34 L 59 34 L 60 34 L 59 34 L 58 32 L 58 32 L 57 32 L 57 32 Z M 55 32 L 56 32 L 57 34 L 57 34 L 57 34 L 58 34 L 57 34 L 57 32 L 57 32 L 56 32 L 55 32 Z M 54 32 L 54 32 L 55 34 L 55 34 L 56 34 L 56 34 L 56 34 L 55 32 L 55 32 L 54 32 L 54 32 Z M 52 32 L 52 32 L 53 34 L 53 34 L 54 34 L 54 34 L 54 34 L 53 32 L 53 32 L 52 32 L 52 32 Z M 50 32 L 50 32 L 51 34 L 51 34 L 52 34 L 52 34 L 52 34 L 51 32 L 51 32 L 50 32 L 50 32 Z M 48 32 L 49 32 L 49 34 L 50 34 L 50 34 L 51 34 L 50 34 L 50 32 L 50 32 L 49 32 L 48 32 Z M 47 32 L 48 34 L 48 34 L 49 34 L 49 34 L 49 34 L 48 32 L 48 32 L 47 32 Z M 53 22 L 53 27 L 53 27 L 54 27 L 54 27 L 54 27 L 54 27 L 55 27 L 55 27 L 55 27 L 56 27 L 56 27 L 56 27 L 57 27 L 57 27 L 57 27 L 57 27 L 57 27 L 58 27 L 58 27 L 58 27 L 58 22 L 53 22 Z M 46 21 L 48 21 L 49 21 L 50 21 L 50 21 L 51 21 L 51 21 L 52 21 L 53 21 L 53 21 L 58 21 L 58 21 L 59 21 L 60 21 L 61 21 L 61 21 L 62 21 L 63 21 L 64 21 L 65 21 C 66 21, 66 22, 66 22 L 66 33 L 65 32 L 64 32 L 65 34 L 66 34 L 66 40 C 66 41, 66 41, 65 41 L 64 41 L 63 41 L 62 41 L 61 41 L 60 41 L 59 41 L 58 41 L 57 41 L 57 41 L 56 41 L 55 41 L 54 41 L 53 41 L 52 41 L 51 41 L 50 41 L 50 41 L 49 41 L 48 41 L 46 41 C 46 41, 45 41, 45 40 L 45 33 L 46 34 L 47 34 L 46 32 L 45 32 L 45 22 C 45 22, 46 21, 46 21 Z M 61 18 L 61 18 L 62 18 L 63 18 L 64 18 L 64 18 L 64 18 L 64 18 L 63 18 L 62 18 L 61 18 Z M 47 17 L 47 18 L 48 18 L 49 18 L 50 18 L 50 18 L 51 18 L 52 18 L 53 18 L 54 18 L 55 18 L 55 18 L 55 17 L 55 17 L 54 17 L 53 17 L 52 17 L 51 17 L 50 17 L 50 17 L 49 17 L 48 17 L 47 17 Z M 17 15 C 16 15, 16 15, 16 16 C 16 16, 16 16, 16 16 L 16 33 L 19 33 L 20 32 L 20 32 C 19 32, 19 32, 19 31 L 17 24 C 17 24, 18 23, 18 23 C 19 23, 19 23, 20 24 C 21 26, 21 28, 21 30 C 22 30, 22 30, 23 30 C 24 30, 26 29, 26 31 C 26 32, 25 32, 25 32 L 22 32 L 21 33 L 21 33 C 22 33, 22 34, 22 34 L 22 37 L 30 37 L 27 28 L 26 29 C 25 29, 25 29, 25 29 C 25 29, 25 28, 25 28 L 28 26 C 28 26, 29 26, 29 26 C 29 26, 29 27, 29 27 L 28 28 L 31 37 L 33 37 L 29 15 L 17 15 Z M 63 15 L 63 16 L 63 16 L 63 16 L 63 16 L 63 17 L 64 17 L 64 17 L 64 16 L 64 16 L 64 16 L 63 15 Z M 62 15 L 61 16 L 61 16 L 61 17 L 62 17 L 62 17 L 62 16 L 62 16 L 62 15 L 62 15 Z M 47 15 L 47 16 L 48 16 L 49 16 L 50 16 L 50 16 L 51 16 L 52 16 L 53 16 L 54 16 L 55 16 L 55 16 L 55 15 L 55 15 L 54 15 L 53 15 L 52 15 L 51 15 L 50 15 L 50 15 L 49 15 L 48 15 L 47 15 Z M 42 12 C 43 12, 43 13, 43 13 L 43 43 L 54 43 L 54 43 L 54 45 L 54 45 L 42 45 C 41 45, 41 45, 41 44 L 41 13 C 41 13, 41 12, 42 12 Z M 17 11 L 32 11 C 32 11, 33 12, 33 13 C 33 13, 32 15, 32 15 L 31 15 L 35 36 L 35 37 L 39 37 L 39 14 C 39 13, 39 13, 39 13 C 39 13, 40 13, 40 14 L 40 38 L 40 38 C 40 38, 40 38, 40 38 L 40 47 C 40 47, 40 47, 40 47 C 40 46, 39 44, 38 43 C 36 41, 34 41, 32 41 C 31 41, 29 41, 27 43 C 26 44, 25 46, 25 48 C 25 48, 25 48, 25 48 L 16 48 C 16 47, 15 46, 14 45 C 13 44, 11 43, 10 43 C 8 43, 7 44, 6 45 C 5 46, 4 47, 4 48 L 3 48 L 1 48 C 1 48, 0 48, 0 47 L 0 44 C 0 43, 0 43, 0 42 C 1 41, 1 41, 2 41 L 2 38 C 2 37, 2 36, 3 35 C 4 34, 6 33, 7 33 L 13 33 L 13 15 C 13 14, 14 13, 14 12 C 15 12, 16 11, 17 11 Z M 62 10 L 63 11 L 64 13 L 64 13 L 65 13 L 64 10 L 64 10 L 63 10 L 62 10 Z M 61 10 L 61 11 L 62 13 L 62 13 L 63 13 L 63 13 L 63 12 L 62 10 L 62 10 L 61 10 L 61 10 Z M 59 10 L 59 11 L 60 13 L 60 13 L 61 13 L 61 13 L 61 12 L 60 10 L 60 10 L 59 10 L 59 10 Z M 57 10 L 57 11 L 58 13 L 58 13 L 59 13 L 60 13 L 59 12 L 58 10 L 58 10 L 57 10 L 57 10 Z M 55 10 L 56 11 L 57 13 L 57 13 L 57 13 L 58 13 L 57 12 L 57 10 L 57 10 L 56 10 L 55 10 Z M 54 10 L 54 11 L 55 13 L 55 13 L 56 13 L 56 13 L 56 12 L 55 10 L 55 10 L 54 10 L 54 10 Z M 52 10 L 52 11 L 53 13 L 53 13 L 54 13 L 54 13 L 54 12 L 53 10 L 53 10 L 52 10 L 52 10 Z M 50 10 L 50 11 L 51 13 L 51 13 L 52 13 L 52 13 L 52 12 L 51 10 L 51 10 L 50 10 L 50 10 Z M 48 10 L 49 11 L 49 13 L 50 13 L 50 13 L 51 13 L 50 12 L 50 10 L 50 10 L 49 10 L 48 10 Z M 47 10 L 48 13 L 48 13 L 49 13 L 49 13 L 49 12 L 48 10 L 48 10 L 47 10 Z M 53 1 L 53 6 L 53 6 L 54 6 L 54 6 L 54 6 L 54 6 L 55 6 L 55 6 L 55 6 L 56 6 L 56 6 L 56 6 L 57 6 L 57 6 L 57 6 L 57 6 L 57 6 L 58 6 L 58 6 L 58 1 L 53 1 Z M 46 0 L 48 0 L 49 0 L 50 0 L 50 0 L 51 0 L 51 0 L 52 0 L 53 0 L 53 0 L 58 0 L 58 0 L 59 0 L 60 0 L 61 0 L 61 0 L 62 0 L 63 0 L 64 0 L 65 0 C 66 0, 66 0, 66 1 L 66 12 L 65 10 L 64 10 L 65 13 L 66 13 L 66 19 C 66 19, 66 20, 65 20 L 64 20 L 63 20 L 62 20 L 61 20 L 60 20 L 59 20 L 58 20 L 57 20 L 57 20 L 56 20 L 55 20 L 54 20 L 53 20 L 52 20 L 51 20 L 50 20 L 50 20 L 49 20 L 48 20 L 46 20 C 46 20, 45 19, 45 19 L 45 12 L 46 13 L 47 13 L 46 10 L 45 10 L 45 1 C 45 0, 46 0, 46 0 Z"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 0,
    "x": 519,
    "y": 209,
    "width": 85,
    "height": 31,
    "fillColor": "#ffffff",
    "pathD": "M 52 24 C 51 24, 50 24, 50 24 C 50 25, 50 25, 50 26 C 50 26, 50 27, 50 27 C 50 28, 51 28, 52 28 C 52 28, 53 28, 53 27 C 53 27, 53 26, 53 26 C 53 25, 53 25, 53 24 C 53 24, 52 24, 52 24 Z M 16 24 C 16 24, 15 24, 15 24 C 15 25, 15 25, 15 26 C 15 26, 15 27, 15 27 C 15 28, 16 28, 16 28 C 17 28, 17 28, 18 27 C 18 27, 18 26, 18 26 C 18 25, 18 25, 18 24 C 17 24, 17 24, 16 24 Z M 52 21 C 53 21, 54 21, 55 22 C 56 23, 57 24, 57 26 C 57 27, 56 29, 55 29 C 54 30, 53 31, 52 31 C 50 31, 49 30, 48 29 C 47 29, 46 27, 46 26 C 46 24, 47 23, 48 22 C 49 21, 50 21, 52 21 Z M 16 21 C 18 21, 19 21, 20 22 C 21 23, 22 24, 22 26 C 22 27, 21 29, 20 29 C 19 30, 18 31, 16 31 C 15 31, 14 30, 13 29 C 12 29, 11 27, 11 26 C 11 24, 12 23, 13 22 C 14 21, 15 21, 16 21 Z M 33 3 C 31 3, 28 4, 26 5 L 26 6 C 23 7, 21 9, 19 11 L 26 11 L 33 11 L 33 3 Z M 38 0 L 63 0 C 64 0, 64 1, 64 1 L 64 16 L 72 17 L 73 19 L 64 19 L 64 19 L 78 21 L 79 23 L 64 23 L 64 23 L 84 25 L 85 26 L 73 26 L 63 26 L 63 26 L 58 26 L 58 26 L 58 26 L 58 26 L 58 26 L 58 26 L 58 26 L 58 26 L 58 26 L 58 26 L 58 26 C 58 26, 58 26, 58 26 C 58 24, 57 23, 56 21 C 55 20, 53 20, 52 20 C 50 20, 48 20, 47 21 C 46 23, 45 24, 45 26 C 45 26, 45 26, 45 26 L 45 26 L 45 26 L 45 26 L 45 26 L 45 26 L 45 26 L 45 26 L 45 26 L 45 26 L 45 26 L 26 26 L 23 26 C 23 26, 23 26, 23 26 C 23 24, 22 23, 21 21 C 20 20, 18 20, 17 20 C 16 20, 16 20, 16 20 C 16 20, 16 20, 16 20 C 15 20, 13 20, 12 21 C 11 23, 10 24, 10 26 C 10 26, 10 26, 10 26 L 8 26 L 8 26 L 1 26 C 1 26, 0 26, 0 25 C 0 24, 1 24, 1 24 L 2 24 L 2 19 C 2 17, 3 16, 4 15 C 4 15, 4 15, 4 15 C 6 14, 8 14, 10 13 L 14 12 L 13 12 C 13 12, 12 12, 12 12 L 12 11 C 12 10, 12 9, 13 9 L 14 10 C 14 10, 14 10, 14 10 L 15 12 L 15 11 C 15 11, 16 11, 16 10 L 16 10 C 19 7, 22 5, 25 3 C 25 3, 26 3, 26 3 C 30 1, 34 0, 38 0 Z"
  },
  {
    "id": "sp-27",
    "x": 699,
    "y": 186,
    "width": 69,
    "height": 66,
    "fillColor": "#ffffff",
    "pathD": "M 69 46 L 69 61 C 69 61, 69 61, 69 61 L 62 64 L 57 65 L 54 66 L 54 50 L 57 49 L 60 48 L 60 52 C 60 52, 61 53, 61 52 L 62 52 L 63 52 C 63 52, 64 52, 64 51 L 64 47 L 69 46 C 69 46, 69 46, 69 46 Z M 39 46 C 39 46, 39 46, 39 46 L 51 50 L 54 50 L 54 66 L 54 66 C 54 66, 54 66, 54 66 L 51 65 L 39 61 C 39 61, 39 61, 39 61 L 39 46 Z M 46 42 L 51 44 L 57 47 L 60 48 L 57 49 L 54 50 C 54 50, 54 50, 54 50 L 51 49 L 39 45 C 39 45, 39 45, 39 45 C 39 45, 39 45, 39 45 L 46 42 Z M 54 40 C 54 40, 54 40, 54 40 L 57 41 L 62 42 L 69 45 C 69 45, 69 45, 69 45 C 69 45, 69 45, 69 45 L 63 47 L 62 46 L 57 45 L 51 42 L 48 41 L 51 41 L 54 40 Z M 14 38 C 15 38, 15 38, 16 38 L 16 38 C 17 39, 19 40, 20 40 C 22 41, 23 41, 25 41 C 27 41, 28 41, 30 40 C 31 40, 33 39, 34 38 C 35 38, 35 38, 36 38 C 37 38, 39 39, 41 40 C 42 40, 43 41, 44 42 L 41 43 L 39 43 C 37 44, 37 44, 37 45 L 37 61 L 37 61 L 37 61 L 37 61 L 37 61 C 37 62, 38 62, 39 63 L 41 63 C 39 64, 38 64, 35 64 C 33 64, 29 65, 25 65 C 13 65, 7 63, 4 61 C 0 59, 0 55, 0 51 C 0 48, 2 45, 4 43 C 7 41, 10 39, 14 38 Z M 21 16 C 20 17, 19 18, 17 19 C 16 20, 14 21, 11 21 C 11 23, 12 25, 13 27 L 15 31 L 19 32 L 23 32 L 24 31 L 25 31 C 26 31, 27 32, 27 33 C 27 33, 26 34, 25 34 L 24 34 L 23 34 L 19 34 L 18 33 L 20 35 C 21 36, 23 36, 25 36 C 29 36, 32 34, 35 32 C 37 29, 39 25, 39 20 C 39 20, 39 19, 39 18 C 38 18, 37 18, 36 19 C 35 19, 34 19, 32 19 C 30 19, 27 18, 25 18 C 24 17, 22 16, 21 16 Z M 25 0 C 35 0, 40 2, 43 5 C 44 7, 45 9, 46 11 L 46 17 L 48 18 C 48 18, 49 19, 49 20 L 49 23 C 49 24, 48 25, 48 25 C 47 26, 46 26, 45 26 L 44 26 C 44 26, 43 26, 43 26 C 42 25, 42 25, 42 24 L 42 19 C 42 18, 42 18, 43 17 L 43 17 L 43 17 L 43 17 L 43 12 C 42 10, 42 8, 41 7 C 38 4, 34 3, 25 3 C 16 3, 12 4, 9 7 C 8 8, 8 10, 7 12 L 7 17 L 7 17 L 7 17 C 8 18, 8 18, 8 19 L 8 24 C 8 25, 8 25, 7 26 L 7 26 L 8 28 C 8 29, 9 29, 10 30 L 12 31 L 10 28 C 9 25, 9 23, 9 20 C 9 15, 9 11, 11 8 C 13 5, 17 3, 25 3 C 33 3, 37 5, 39 8 C 41 11, 41 15, 41 20 C 41 25, 40 30, 37 33 C 34 37, 30 39, 25 39 C 20 39, 16 37, 13 33 L 13 33 L 11 33 C 10 32, 9 32, 9 32 C 7 31, 6 30, 6 29 L 5 26 L 5 26 C 4 26, 3 26, 2 25 C 2 25, 1 24, 1 23 L 1 20 C 1 19, 2 18, 2 18 L 4 17 L 5 11 C 5 8, 6 6, 7 5 C 10 2, 15 0, 25 0 Z"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 874,
    "y": 186,
    "width": 66,
    "height": 66,
    "fillColor": "#ffffff",
    "pathD": "M 37 45 L 37 61 C 37 61, 37 61, 37 61 L 29 64 L 25 65 L 22 66 L 22 50 L 25 49 L 28 48 L 28 52 C 28 52, 28 52, 29 52 L 29 52 L 31 51 C 31 51, 31 51, 31 51 L 31 47 L 37 45 Z M 6 45 C 6 45, 6 45, 6 45 L 18 49 L 21 50 L 21 66 L 21 66 C 21 66, 21 66, 21 66 L 18 65 L 6 61 C 6 61, 6 61, 6 61 L 6 45 Z M 13 41 L 18 44 L 25 46 L 28 47 L 25 48 L 21 49 C 21 49, 21 49, 21 49 L 18 48 L 6 44 C 6 44, 6 44, 6 44 C 6 44, 6 44, 6 44 L 13 41 Z M 21 39 L 25 40 L 29 41 L 37 44 C 37 44, 37 44, 37 44 L 31 46 L 29 46 L 25 44 L 18 42 L 16 41 L 18 40 L 21 39 C 21 39, 21 39, 21 39 Z M 55 14 C 57 14, 59 14, 60 16 C 60 17, 60 19, 60 21 L 61 40 L 66 60 C 66 61, 66 62, 65 62 C 65 63, 64 64, 63 64 L 63 64 C 62 64, 61 64, 60 64 C 60 63, 59 62, 59 61 L 59 61 C 59 61, 59 61, 59 61 L 59 60 L 54 45 L 47 60 C 47 61, 46 62, 45 62 C 45 63, 44 63, 43 62 C 42 62, 41 61, 41 60 C 40 59, 40 58, 41 57 L 41 57 C 41 57, 41 57, 41 57 L 51 32 L 52 24 L 44 27 L 43 27 L 45 28 L 43 29 L 35 34 L 34 34 L 34 34 L 27 31 L 25 31 L 26 29 L 35 24 L 35 24 L 36 24 L 40 26 L 39 24 C 40 23, 40 22, 41 22 C 43 20, 51 16, 54 14 C 55 14, 55 14, 55 14 Z M 13 13 C 14 13, 15 13, 16 14 C 17 14, 17 16, 18 17 C 19 18, 20 19, 21 20 C 22 21, 23 22, 24 22 C 25 23, 25 23, 26 24 C 26 25, 26 25, 26 26 C 26 26, 26 26, 26 26 C 25 27, 25 28, 24 28 C 23 28, 23 28, 22 28 C 20 27, 18 26, 17 25 L 16 24 C 16 31, 17 32, 20 38 L 14 40 L 13 37 L 12 40 C 10 41, 8 42, 6 43 C 8 35, 8 32, 9 23 C 7 25, 6 27, 5 29 C 5 29, 4 30, 4 30 C 2 31, 1 30, 0 29 C -1 27, 2 23, 3 21 C 4 20, 5 18, 6 17 C 7 16, 7 16, 8 15 C 10 14, 11 13, 13 13 C 13 13, 13 13, 13 13 Z M 56 1 C 58 1, 59 2, 61 3 C 62 4, 62 5, 62 7 C 62 9, 62 10, 61 11 C 59 12, 58 13, 56 13 C 55 13, 53 12, 52 11 C 51 10, 51 9, 51 7 C 51 5, 51 4, 52 3 C 53 2, 55 1, 56 1 Z M 13 0 C 14 0, 16 1, 17 2 C 18 3, 19 4, 19 6 C 19 7, 18 9, 17 10 C 16 11, 14 12, 13 12 C 11 12, 10 11, 9 10 C 8 9, 7 7, 7 6 C 7 4, 8 3, 9 2 C 10 1, 11 0, 13 0 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates202Template({ data }: { data: BrainData }): ReactElement {
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
