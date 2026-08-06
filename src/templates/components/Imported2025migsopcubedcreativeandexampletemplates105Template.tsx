import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 136,
    "width": 267,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-35",
    "x": 347,
    "y": 136,
    "width": 10,
    "height": 72,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-36",
    "x": 80,
    "y": 136,
    "width": 10,
    "height": 470,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 80,
    "y": 606,
    "width": 267,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 694,
    "y": 125,
    "width": 27,
    "height": 137,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 768,
    "y": 198,
    "width": 87,
    "height": 10,
    "strokeColor": "#3365cc"
  },
  {
    "id": "sp-39",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 769,
    "y": 320,
    "width": 86,
    "height": 10,
    "strokeColor": "#ff4d38"
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 766,
    "y": 438,
    "width": 89,
    "height": 10,
    "strokeColor": "#52c49c"
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 767,
    "y": 562,
    "width": 89,
    "height": 10,
    "strokeColor": "#ffb900"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 694,
    "y": 262,
    "width": 27,
    "height": 118,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 694,
    "y": 380,
    "width": 27,
    "height": 118,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 694,
    "y": 499,
    "width": 27,
    "height": 137,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 643,
    "y": 179,
    "width": 128,
    "height": 41,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 643,
    "y": 300,
    "width": 128,
    "height": 41,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 643,
    "y": 418,
    "width": 130,
    "height": 41,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 642,
    "y": 541,
    "width": 132,
    "height": 41,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-8",
    "x": 245,
    "y": 479,
    "width": 204,
    "height": 75,
    "fillColor": "#ffb900",
    "pathD": "M 0 0 L 37 75 L 167 75 L 204 0 L 0 0 Z"
  },
  {
    "id": "sp-9",
    "x": 204,
    "y": 394,
    "width": 285,
    "height": 80,
    "fillColor": "#52c49c",
    "pathD": "M 0 0 L 40 80 L 245 80 L 285 0 L 0 0 Z"
  },
  {
    "id": "sp-10",
    "x": 157,
    "y": 303,
    "width": 380,
    "height": 85,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 42 85 L 337 85 L 380 0 L 0 0 Z"
  },
  {
    "id": "sp-11",
    "x": 110,
    "y": 208,
    "width": 474,
    "height": 90,
    "fillColor": "#3365cc",
    "pathD": "M 429 90 L 474 0 L 0 0 L 45 90 L 429 90 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 95,
    "y": 218,
    "width": 70,
    "height": 70,
    "fillColor": "#3365cc",
    "pathD": "M 35 0 A 35 35 0 1 1 35 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 140,
    "y": 314,
    "width": 70,
    "height": 70,
    "fillColor": "#ff4d38",
    "pathD": "M 35 0 A 35 35 0 1 1 35 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 185,
    "y": 404,
    "width": 70,
    "height": 70,
    "fillColor": "#52c49c",
    "pathD": "M 35 0 A 35 35 0 1 1 35 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 221,
    "y": 486,
    "width": 69,
    "height": 70,
    "fillColor": "#ffb900",
    "pathD": "M 35 0 A 35 35 0 1 1 34 0 Z"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 108,
    "y": 234,
    "width": 45,
    "height": 37,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 1,
    "x": 152,
    "y": 331,
    "width": 45,
    "height": 37,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 2,
    "x": 197,
    "y": 420,
    "width": 45,
    "height": 37,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 3,
    "x": 232,
    "y": 502,
    "width": 45,
    "height": 37,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 0,
    "x": 673,
    "y": 180,
    "width": 66,
    "height": 37,
    "text": "Title",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 673,
    "y": 303,
    "width": 66,
    "height": 37,
    "text": "Title",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 2,
    "x": 673,
    "y": 420,
    "width": 66,
    "height": 37,
    "text": "Title",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 673,
    "y": 543,
    "width": 66,
    "height": 37,
    "text": "Title",
    "textColor": "#ffffff",
    "textSize": 17
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 315,
    "y": 220,
    "width": 64,
    "height": 65,
    "fillColor": "#ffffff",
    "pathD": "M 27 58 L 27 61 C 27 62, 28 63, 29 63 L 35 63 C 36 63, 36 63, 37 63 C 37 62, 37 62, 37 61 L 37 58 L 27 58 Z M 47 48 L 47 54 L 53 54 L 53 48 L 47 48 Z M 11 48 L 11 54 L 17 54 L 17 48 L 11 48 Z M 50 42 C 51 42, 51 42, 51 43 L 51 46 L 54 46 C 54 46, 55 46, 55 47 L 55 55 C 55 55, 54 56, 54 56 L 46 56 C 46 56, 45 55, 45 55 L 45 52 L 42 52 C 42 52, 41 51, 41 51 C 41 50, 42 50, 42 50 L 45 50 L 45 47 C 45 46, 46 46, 46 46 L 49 46 L 49 43 C 49 42, 50 42, 50 42 Z M 14 42 C 14 42, 15 42, 15 43 L 15 46 L 18 46 C 18 46, 19 46, 19 47 L 19 50 L 22 50 C 22 50, 23 50, 23 51 C 23 51, 22 52, 22 52 L 19 52 L 19 55 C 19 55, 18 56, 18 56 L 10 56 C 10 56, 9 55, 9 55 L 9 47 C 9 46, 10 46, 10 46 L 13 46 L 13 43 C 13 42, 13 42, 14 42 Z M 33 31 L 33 56 L 37 56 L 37 31 L 33 31 Z M 27 31 L 27 56 L 31 56 L 31 31 L 27 31 Z M 50 28 C 51 28, 51 29, 51 29 L 51 36 C 51 36, 51 37, 50 37 C 50 37, 49 36, 49 36 L 49 29 C 49 29, 50 28, 50 28 Z M 14 28 C 15 28, 15 29, 15 29 L 15 36 C 15 36, 15 37, 14 37 C 14 37, 13 36, 13 36 L 13 29 C 13 29, 14 28, 14 28 Z M 32 23 L 28 29 L 36 29 L 32 23 Z M 32 20 C 33 20, 33 20, 33 20 L 39 29 C 39 29, 39 30, 39 30 L 39 56 L 39 56 C 40 56, 40 57, 40 57 C 40 58, 40 58, 39 58 L 39 58 L 39 61 C 39 62, 39 63, 38 64 C 37 65, 36 65, 35 65 L 29 65 C 27 65, 25 63, 25 61 L 25 58 L 25 58 C 25 58, 24 58, 24 57 C 24 57, 25 56, 25 56 L 25 56 L 25 30 C 25 30, 25 30, 26 29 L 31 20 C 32 20, 32 20, 32 20 Z M 29 13 L 35 13 C 36 13, 36 14, 36 14 C 36 15, 36 15, 35 15 L 29 15 C 28 15, 28 15, 28 14 C 28 14, 28 13, 29 13 Z M 11 11 L 11 17 L 17 17 L 17 11 L 11 11 Z M 46 9 C 47 9, 47 10, 47 10 L 47 17 L 54 17 C 54 17, 55 17, 55 18 C 55 18, 54 19, 54 19 L 51 19 L 51 22 C 51 22, 51 23, 50 23 C 50 23, 49 22, 49 22 L 49 19 L 46 19 C 46 19, 45 18, 45 18 L 45 15 L 42 15 C 42 15, 41 15, 41 14 C 41 14, 42 13, 42 13 L 45 13 L 45 10 C 45 10, 46 9, 46 9 Z M 10 9 L 18 9 C 18 9, 19 10, 19 10 L 19 13 L 22 13 C 22 13, 23 14, 23 14 C 23 15, 22 15, 22 15 L 19 15 L 19 18 C 19 18, 18 19, 18 19 L 15 19 L 15 22 C 15 22, 14 23, 14 23 C 13 23, 13 22, 13 22 L 13 19 L 10 19 C 10 19, 9 18, 9 18 L 9 10 C 9 10, 10 9, 10 9 Z M 52 3 L 52 12 L 61 12 L 52 3 Z M 1 0 L 51 0 C 52 0, 52 0, 52 0 L 64 12 C 64 12, 64 12, 64 13 L 64 64 C 64 64, 64 65, 63 65 L 42 65 C 42 65, 41 64, 41 64 C 41 63, 42 63, 42 63 L 62 63 L 62 14 L 51 14 C 51 14, 50 13, 50 13 L 50 2 L 2 2 L 2 63 L 22 63 C 22 63, 23 63, 23 64 C 23 64, 22 65, 22 65 L 1 65 C 0 65, 0 64, 0 64 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 315,
    "y": 314,
    "width": 64,
    "height": 64,
    "fillColor": "#ffffff",
    "pathD": "M 21 56 L 21 62 L 43 62 L 43 56 L 21 56 Z M 2 49 L 2 53 C 2 54, 3 54, 4 54 L 60 54 C 61 54, 62 54, 62 53 L 62 49 L 2 49 Z M 54 30 L 54 39 L 62 39 L 62 30 L 54 30 Z M 54 20 L 54 28 L 62 28 L 62 20 L 54 20 Z M 40 18 L 28 23 L 28 37 L 40 31 L 40 18 Z M 13 18 L 13 31 L 26 37 L 26 23 L 13 18 Z M 27 11 L 15 16 L 27 22 L 39 16 L 27 11 Z M 54 10 L 54 18 L 62 18 L 62 10 L 54 10 Z M 26 9 C 27 9, 27 9, 27 9 L 42 15 C 42 16, 42 16, 42 16 L 42 32 C 42 32, 42 32, 41 33 L 27 39 C 27 39, 27 39, 27 39 C 27 39, 27 39, 27 39 C 27 39, 27 39, 26 39 L 26 39 L 12 33 C 12 32, 11 32, 11 32 L 11 16 C 11 16, 12 16, 12 15 L 26 9 Z M 4 2 C 3 2, 2 3, 2 4 L 2 8 L 4 8 C 4 8, 4 8, 4 9 C 4 9, 4 10, 4 10 L 2 10 L 2 16 L 4 16 C 4 16, 4 16, 4 16 C 4 17, 4 18, 4 18 L 2 18 L 2 23 L 4 23 C 4 23, 4 24, 4 24 C 4 25, 4 25, 4 25 L 2 25 L 2 31 L 4 31 C 4 31, 4 31, 4 32 C 4 33, 4 33, 4 33 L 2 33 L 2 39 L 4 39 C 4 39, 4 39, 4 40 C 4 40, 4 41, 4 41 L 2 41 L 2 47 L 8 47 L 8 45 C 8 45, 8 44, 9 44 C 9 44, 10 45, 10 45 L 10 47 L 16 47 L 16 45 C 16 45, 16 44, 16 44 C 17 44, 18 45, 18 45 L 18 47 L 23 47 L 23 45 C 23 45, 24 44, 24 44 C 25 44, 25 45, 25 45 L 25 47 L 31 47 L 31 45 C 31 45, 31 44, 32 44 C 33 44, 33 45, 33 45 L 33 47 L 39 47 L 39 45 C 39 45, 39 44, 40 44 C 40 44, 41 45, 41 45 L 41 47 L 47 47 L 47 45 C 47 45, 47 44, 48 44 C 48 44, 49 45, 49 45 L 49 47 L 62 47 L 62 41 L 53 41 C 52 41, 52 40, 52 40 L 52 9 C 52 8, 52 8, 53 8 L 62 8 L 62 4 C 62 3, 61 2, 60 2 L 4 2 Z M 4 0 L 60 0 C 62 0, 64 2, 64 4 L 64 53 C 64 55, 62 56, 60 56 L 45 56 L 45 62 L 51 62 C 52 62, 52 63, 52 63 C 52 64, 52 64, 51 64 L 13 64 C 12 64, 12 64, 12 63 C 12 63, 12 62, 13 62 L 19 62 L 19 56 L 4 56 C 2 56, 0 55, 0 53 L 0 4 C 0 2, 2 0, 4 0 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 315,
    "y": 484,
    "width": 64,
    "height": 64,
    "fillColor": "#ffffff",
    "pathD": "M 7 38 L 7 60 C 7 61, 8 62, 10 62 C 11 62, 12 61, 12 60 L 12 41 C 12 41, 12 40, 13 40 C 13 40, 14 41, 14 41 L 14 60 C 14 61, 15 62, 16 62 C 18 62, 19 61, 19 60 L 19 38 L 7 38 Z M 41 36 L 49 36 C 49 36, 50 37, 50 37 C 50 38, 49 38, 49 38 L 41 38 C 40 38, 40 38, 40 37 C 40 37, 40 36, 41 36 Z M 13 30 C 13 30, 14 30, 14 31 L 14 32 C 14 32, 13 33, 13 33 C 12 33, 12 32, 12 32 L 12 31 C 12 30, 12 30, 13 30 Z M 13 24 C 13 24, 14 25, 14 25 L 14 27 C 14 27, 13 27, 13 27 C 12 27, 12 27, 12 27 L 12 25 C 12 25, 12 24, 13 24 Z M 13 18 C 13 18, 14 19, 14 19 L 14 21 C 14 21, 13 22, 13 22 C 12 22, 12 21, 12 21 L 12 19 C 12 19, 12 18, 13 18 Z M 53 17 C 53 17, 54 17, 54 18 L 54 33 C 54 34, 53 34, 53 34 C 52 34, 52 34, 52 33 L 52 18 C 52 17, 52 17, 53 17 Z M 37 17 C 38 17, 38 17, 38 18 L 38 33 C 38 34, 38 34, 37 34 C 37 34, 36 34, 36 33 L 36 18 C 36 17, 37 17, 37 17 Z M 41 13 L 49 13 C 49 13, 50 13, 50 14 C 50 14, 49 15, 49 15 L 41 15 C 40 15, 40 14, 40 14 C 40 13, 40 13, 41 13 Z M 38 5 L 63 5 C 64 5, 64 6, 64 6 C 64 7, 64 7, 63 7 L 61 7 L 61 44 L 63 44 C 64 44, 64 44, 64 45 C 64 46, 64 46, 63 46 L 51 46 L 57 63 C 58 63, 57 64, 57 64 C 57 64, 57 64, 57 64 C 56 64, 56 64, 56 63 L 49 46 L 46 46 L 46 63 C 46 64, 45 64, 45 64 C 44 64, 44 64, 44 63 L 44 46 L 40 46 L 34 63 C 34 64, 34 64, 33 64 C 33 64, 33 64, 33 64 C 32 64, 32 63, 32 63 L 38 46 L 27 46 C 26 46, 26 46, 26 45 C 26 44, 26 44, 27 44 L 28 44 L 28 18 C 28 17, 29 17, 29 17 C 30 17, 30 17, 30 18 L 30 44 L 59 44 L 59 7 L 38 7 C 38 7, 37 7, 37 6 C 37 6, 38 5, 38 5 Z M 30 5 L 22 13 C 21 15, 19 15, 17 15 L 14 15 C 14 16, 13 16, 13 16 C 12 16, 12 16, 12 15 L 6 15 C 4 15, 2 17, 2 20 L 2 37 C 2 38, 3 39, 4 39 C 5 39, 5 38, 5 37 L 5 20 C 5 20, 6 19, 6 19 C 7 19, 7 20, 7 20 L 7 36 L 19 36 L 19 24 C 19 22, 19 21, 20 20 L 33 7 C 33 7, 33 6, 33 6 C 33 6, 33 5, 33 5 C 32 4, 31 4, 30 5 Z M 31 2 C 32 2, 33 3, 34 3 C 35 4, 35 5, 35 6 C 35 7, 35 8, 34 9 L 21 21 C 21 22, 21 23, 21 24 L 21 60 C 21 62, 19 64, 16 64 C 15 64, 14 63, 13 63 C 12 63, 11 64, 10 64 C 7 64, 5 62, 5 60 L 5 40 C 5 40, 4 41, 4 41 C 2 41, 0 39, 0 37 L 0 20 C 0 16, 3 13, 6 13 L 17 13 C 18 13, 20 13, 20 12 L 29 3 C 30 3, 31 2, 31 2 Z M 13 2 C 11 2, 9 4, 9 6 C 9 8, 11 9, 13 9 C 15 9, 16 8, 16 6 C 16 4, 15 2, 13 2 Z M 13 0 C 16 0, 18 2, 18 6 C 18 9, 16 11, 13 11 C 10 11, 7 9, 7 6 C 7 2, 10 0, 13 0 Z"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 314,
    "y": 402,
    "width": 65,
    "height": 64,
    "fillColor": "#ffffff",
    "pathD": "M 46 48 L 46 48 C 46 48, 46 49, 46 49 L 46 51 L 26 51 C 25 51, 25 52, 25 52 C 25 53, 25 53, 26 53 L 46 53 L 46 56 C 46 57, 46 57, 46 57 L 22 57 C 22 57, 22 57, 22 56 L 22 50 C 22 49, 22 48, 22 48 L 46 48 Z M 39 62 L 29 62 C 27 62, 25 61, 24 59 L 43 59 C 43 61, 41 62, 39 62 Z M 52 31 L 52 31 C 52 32, 52 32, 52 32 C 52 32, 52 31, 53 31 L 65 20 C 65 19, 65 19, 65 18 L 53 6 C 52 6, 52 6, 52 6 C 51 6, 51 7, 51 7 L 51 13 L 19 13 C 18 13, 18 13, 18 14 C 18 14, 18 15, 19 15 L 52 15 C 53 15, 53 14, 53 14 L 53 10 L 62 19 L 53 28 L 53 24 C 53 23, 53 23, 52 23 L 38 23 L 32 17 C 32 16, 31 16, 31 16 C 30 17, 30 17, 30 17 L 30 23 L 11 23 C 12 11, 22 2, 34 2 C 38 2, 43 3, 46 6 C 47 6, 48 6, 48 6 C 48 5, 48 5, 48 4 C 44 1, 39 0, 34 0 C 21 0, 10 10, 9 23 L 1 23 C 0 23, 0 23, 0 24 C 0 25, 0 25, 1 25 L 31 25 C 32 25, 32 25, 32 24 L 32 20 L 42 29 L 32 39 L 32 34 C 32 34, 32 33, 31 33 L 8 33 C 7 33, 7 34, 7 34 C 7 35, 7 35, 8 35 L 12 35 C 13 37, 14 39, 16 41 C 18 44, 20 46, 20 50 L 20 56 C 20 58, 21 59, 22 59 L 22 59 C 23 62, 25 64, 29 64 L 39 64 C 42 64, 45 62, 45 59 L 46 59 C 47 59, 48 58, 48 56 L 48 49 C 48 46, 49 43, 51 41 C 53 39, 55 37, 56 34 C 56 34, 56 33, 56 33 C 55 33, 54 33, 54 33 C 53 36, 52 38, 50 40 C 48 42, 47 44, 46 46 L 21 46 C 21 44, 19 42, 18 40 C 16 39, 15 37, 14 35 L 30 35 L 30 41 C 30 41, 30 42, 31 42 C 31 42, 31 42, 31 42 C 31 42, 32 42, 32 42 L 44 30 C 44 30, 44 29, 44 29 C 44 29, 44 29, 44 28 L 40 25 L 51 25 L 51 31 C 51 31, 51 31, 52 31 Z"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 0,
    "x": 864,
    "y": 169,
    "width": 342,
    "height": 59,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 1,
    "x": 864,
    "y": 293,
    "width": 342,
    "height": 59,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 2,
    "x": 864,
    "y": 409,
    "width": 342,
    "height": 59,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 3,
    "x": 864,
    "y": 533,
    "width": 342,
    "height": 59,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-42",
    "x": 347,
    "y": 556,
    "width": 10,
    "height": 50,
    "strokeColor": "#ffffff"
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

export function Imported2025migsopcubedcreativeandexampletemplates105Template({ data }: { data: BrainData }): ReactElement {
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
