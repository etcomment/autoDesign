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
    "x": 169,
    "y": 129,
    "width": 112,
    "height": 112,
    "pathD": "M 56 0 A 56 56 0 1 1 56 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 446,
    "y": 129,
    "width": 112,
    "height": 112,
    "fillColor": "#ff4d38",
    "pathD": "M 56 0 A 56 56 0 1 1 56 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 722,
    "y": 129,
    "width": 112,
    "height": 112,
    "fillColor": "#52c49c",
    "pathD": "M 56 0 A 56 56 0 1 1 56 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 998,
    "y": 129,
    "width": 112,
    "height": 112,
    "fillColor": "#ffb900",
    "pathD": "M 56 0 A 56 56 0 1 1 56 0 Z"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 0,
    "x": 177,
    "y": 256,
    "width": 97,
    "height": 36,
    "text": "Defects",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-5",
    "x": 411,
    "y": 256,
    "width": 181,
    "height": 36,
    "text": "OverProduction",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 1,
    "x": 730,
    "y": 256,
    "width": 97,
    "height": 36,
    "text": "Waiting",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-7",
    "x": 951,
    "y": 255,
    "width": 206,
    "height": 36,
    "text": "Non-utilized talent",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 0,
    "x": 132,
    "y": 291,
    "width": 192,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 1,
    "x": 409,
    "y": 291,
    "width": 192,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 2,
    "x": 685,
    "y": 291,
    "width": 192,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 3,
    "x": 958,
    "y": 291,
    "width": 192,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 169,
    "y": 388,
    "width": 112,
    "height": 112,
    "fillColor": "#3365cc",
    "pathD": "M 56 0 A 56 56 0 1 1 56 0 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 446,
    "y": 388,
    "width": 112,
    "height": 112,
    "fillColor": "#ffb900",
    "pathD": "M 56 0 A 56 56 0 1 1 56 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 722,
    "y": 388,
    "width": 112,
    "height": 112,
    "fillColor": "#4a90d9",
    "pathD": "M 56 0 A 56 56 0 1 1 56 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 998,
    "y": 388,
    "width": 112,
    "height": 112,
    "fillColor": "#ee6d90",
    "pathD": "M 56 0 A 56 56 0 1 1 56 0 Z"
  },
  {
    "id": "sp-16",
    "x": 140,
    "y": 516,
    "width": 170,
    "height": 36,
    "text": "Transportation",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-17",
    "x": 444,
    "y": 516,
    "width": 116,
    "height": 36,
    "text": "Inventory",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 2,
    "x": 733,
    "y": 516,
    "width": 90,
    "height": 36,
    "text": "Motion",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-19",
    "x": 957,
    "y": 515,
    "width": 195,
    "height": 36,
    "text": "Extra-Processing",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 4,
    "x": 132,
    "y": 551,
    "width": 192,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 5,
    "x": 406,
    "y": 551,
    "width": 192,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 6,
    "x": 682,
    "y": 551,
    "width": 192,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 7,
    "x": 958,
    "y": 551,
    "width": 192,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 1025,
    "y": 158,
    "width": 59,
    "height": 53,
    "fillColor": "#ffffff",
    "pathD": "M 0 24 L 21 24 L 21 28 C 21 29, 21 29, 22 29 L 37 29 C 38 29, 38 29, 38 28 L 38 24 L 59 24 L 59 52 C 59 52, 58 53, 58 53 L 1 53 C 1 53, 0 52, 0 52 L 0 24 Z M 30 18 C 29 18, 28 18, 28 19 L 28 22 C 28 23, 29 24, 30 24 C 30 24, 31 23, 31 22 L 31 19 C 31 18, 30 18, 30 18 Z M 24 12 L 35 12 L 35 27 L 24 27 L 24 12 Z M 22 0 L 37 0 C 41 0, 44 3, 44 7 L 44 12 L 58 12 C 58 12, 59 12, 59 13 L 59 21 L 38 21 L 38 15 L 38 12 L 41 12 L 41 7 C 41 5, 39 3, 37 3 L 22 3 C 20 3, 18 5, 18 7 L 18 12 L 21 12 L 21 15 L 21 21 L 0 21 L 0 13 C 0 12, 1 12, 1 12 L 15 12 L 15 7 C 15 3, 18 0, 22 0 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 196,
    "y": 158,
    "width": 59,
    "height": 53,
    "fillColor": "#ffffff",
    "pathD": "M 46 2 C 47 2, 47 2, 47 3 L 47 9 L 53 9 L 53 3 C 53 2, 53 2, 54 2 C 54 1, 55 1, 55 2 C 58 3, 59 6, 59 9 C 59 12, 57 15, 55 16 L 55 49 C 55 51, 53 53, 50 53 C 48 53, 46 51, 46 49 L 46 16 C 43 15, 41 12, 41 9 C 41 6, 43 3, 45 2 C 45 1, 46 1, 46 2 Z M 30 0 L 33 0 C 33 0, 34 1, 34 1 L 35 10 C 36 10, 35 11, 35 11 C 35 12, 34 12, 34 12 L 33 12 L 33 27 L 34 27 C 35 27, 35 27, 35 28 L 35 49 C 35 51, 33 53, 31 53 C 29 53, 27 51, 27 49 L 27 28 C 27 27, 27 27, 28 27 L 30 27 L 30 12 L 28 12 C 28 12, 27 12, 27 11 C 27 11, 26 10, 27 10 L 28 1 C 28 1, 29 0, 30 0 Z M 2 0 L 10 0 C 18 0, 21 3, 21 7 C 21 8, 20 9, 19 9 L 13 9 L 13 50 C 13 52, 12 53, 10 53 C 9 53, 7 52, 7 50 L 7 9 L 2 9 C 1 9, 0 8, 0 7 L 0 1 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 1025,
    "y": 415,
    "width": 59,
    "height": 59,
    "fillColor": "#ffffff",
    "pathD": "M 52 44 C 51 44, 50 45, 50 46 C 50 47, 51 47, 52 47 L 55 47 C 55 47, 56 47, 56 46 C 56 45, 55 44, 55 44 L 52 44 Z M 15 41 L 29 41 L 29 59 L 15 59 L 15 41 Z M 52 38 C 51 38, 50 39, 50 40 C 50 41, 51 41, 52 41 L 55 41 C 55 41, 56 41, 56 40 C 56 39, 55 38, 55 38 L 52 38 Z M 47 32 L 58 32 C 58 32, 59 33, 59 34 L 59 58 C 59 58, 58 59, 58 59 L 47 59 L 47 32 Z M 2 24 L 43 24 C 44 24, 44 24, 44 25 L 44 59 L 33 59 L 33 40 C 33 39, 32 38, 31 38 L 13 38 C 13 38, 12 39, 12 40 L 12 59 L 2 59 C 1 59, 0 58, 0 58 L 0 25 C 0 24, 1 24, 2 24 Z M 38 9 C 38 9, 38 10, 38 10 L 38 21 L 31 21 L 31 13 C 31 13, 31 12, 32 12 L 36 9 C 37 9, 37 9, 38 9 Z M 25 9 C 26 9, 26 10, 26 10 L 26 21 L 18 21 L 18 13 C 18 13, 19 12, 19 12 L 24 9 C 24 9, 25 9, 25 9 Z M 13 9 C 13 9, 13 10, 13 10 L 13 21 L 6 21 L 6 13 C 6 13, 6 12, 7 12 L 11 9 C 11 9, 12 9, 13 9 Z M 37 0 C 38 0, 38 1, 38 1 C 38 4, 36 5, 35 5 C 34 6, 34 6, 34 6 C 34 7, 33 7, 32 7 C 32 7, 31 7, 31 6 C 31 3, 33 3, 34 2 C 35 2, 35 2, 35 1 C 35 1, 36 0, 37 0 Z M 24 0 C 25 0, 26 1, 26 1 C 26 4, 24 5, 23 5 C 21 6, 21 6, 21 6 C 21 7, 21 7, 20 7 C 19 7, 18 7, 18 6 C 18 3, 21 3, 22 2 C 23 2, 23 2, 23 1 C 23 1, 24 0, 24 0 Z M 12 0 C 13 0, 13 1, 13 1 C 13 4, 11 5, 10 5 C 9 6, 9 6, 9 6 C 9 7, 8 7, 7 7 C 7 7, 6 7, 6 6 C 6 3, 8 3, 9 2 C 10 2, 10 2, 10 1 C 10 1, 11 0, 12 0 Z"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 196,
    "y": 416,
    "width": 59,
    "height": 59,
    "fillColor": "#ffffff",
    "pathD": "M 19 50 C 18 50, 18 51, 18 52 C 18 52, 18 53, 19 53 L 25 53 C 26 53, 27 52, 27 52 C 27 51, 26 50, 25 50 L 19 50 Z M 34 47 C 35 47, 35 48, 35 49 C 35 50, 35 50, 34 50 C 33 50, 32 50, 32 49 C 32 48, 33 47, 34 47 Z M 10 47 C 11 47, 12 48, 12 49 C 12 50, 11 50, 10 50 C 9 50, 9 50, 9 49 C 9 48, 9 47, 10 47 Z M 34 44 C 31 44, 30 46, 30 49 C 30 51, 31 53, 34 53 C 36 53, 38 51, 38 49 C 38 46, 36 44, 34 44 Z M 19 44 C 18 44, 18 45, 18 46 C 18 47, 18 47, 19 47 L 25 47 C 26 47, 27 47, 27 46 C 27 45, 26 44, 25 44 L 19 44 Z M 10 44 C 8 44, 6 46, 6 49 C 6 51, 8 53, 10 53 C 13 53, 15 51, 15 49 C 15 46, 13 44, 10 44 Z M 27 32 C 26 32, 25 33, 25 34 C 25 35, 26 35, 27 35 L 37 35 C 38 35, 38 35, 38 34 C 38 33, 38 32, 37 32 L 27 32 Z M 9 30 L 18 30 L 18 33 L 9 33 L 9 30 Z M 27 27 C 26 27, 25 27, 25 28 C 25 29, 26 29, 27 29 L 37 29 C 38 29, 38 29, 38 28 C 38 27, 38 27, 37 27 L 27 27 Z M 7 27 C 7 27, 6 27, 6 28 L 6 34 C 6 35, 7 35, 7 35 L 19 35 C 20 35, 21 35, 21 34 L 21 28 C 21 27, 20 27, 19 27 L 7 27 Z M 27 21 C 26 21, 25 21, 25 22 C 25 23, 26 24, 27 24 L 37 24 C 38 24, 38 23, 38 22 C 38 21, 38 21, 37 21 L 27 21 Z M 9 18 L 18 18 L 18 21 L 9 21 L 9 18 Z M 27 15 C 26 15, 25 15, 25 16 C 25 17, 26 18, 27 18 L 37 18 C 38 18, 38 17, 38 16 C 38 15, 38 15, 37 15 L 27 15 Z M 7 15 C 7 15, 6 15, 6 16 L 6 22 C 6 23, 7 24, 7 24 L 19 24 C 20 24, 21 23, 21 22 L 21 16 C 21 15, 20 15, 19 15 L 7 15 Z M 1 9 L 43 9 C 44 9, 44 9, 44 10 L 44 47 L 46 47 C 50 47, 53 44, 53 40 L 53 38 L 52 38 C 51 38, 50 38, 50 37 L 50 27 L 59 27 L 59 37 C 59 38, 58 38, 58 38 L 56 38 L 56 40 C 56 45, 51 50, 46 50 L 44 50 L 44 58 C 44 58, 44 59, 43 59 L 1 59 C 1 59, 0 58, 0 58 L 0 10 C 0 9, 1 9, 1 9 Z M 45 0 C 46 0, 46 0, 47 0 L 55 6 C 56 6, 56 7, 56 7 L 56 18 L 58 18 C 58 18, 59 18, 59 19 L 59 24 L 50 24 L 50 19 C 50 18, 51 18, 52 18 L 53 18 L 53 8 L 45 3 C 44 2, 44 1, 44 1 C 45 0, 45 0, 45 0 Z"
  },
  {
    "id": "sp-28",
    "x": 749,
    "y": 161,
    "width": 59,
    "height": 47,
    "fillColor": "#ffffff",
    "pathD": "M 53 35 C 52 35, 52 36, 52 37 L 52 40 C 52 41, 52 41, 53 41 C 54 41, 55 40, 55 40 L 55 37 C 55 36, 54 35, 53 35 Z M 3 29 L 44 29 L 44 47 L 4 47 C 4 47, 3 46, 3 45 L 3 29 Z M 53 26 C 52 26, 52 27, 52 28 L 52 31 C 52 32, 52 32, 53 32 C 54 32, 55 32, 55 31 L 55 28 C 55 27, 54 27, 53 26 Z M 7 15 L 13 15 C 14 15, 15 15, 15 16 L 15 21 L 18 21 L 18 16 C 18 15, 18 15, 19 15 L 25 15 C 26 15, 27 15, 27 16 L 27 21 L 29 21 L 29 16 C 29 15, 30 15, 31 15 L 37 15 C 38 15, 38 15, 38 16 L 38 21 L 44 21 L 44 26 L 3 26 C 1 26, 0 25, 0 23 C 0 22, 2 21, 3 21 L 6 21 L 6 16 C 6 15, 7 15, 7 15 Z M 47 9 L 59 9 L 59 46 C 59 46, 58 47, 58 47 L 47 47 L 47 9 Z M 48 0 L 58 0 C 58 0, 59 1, 59 1 L 59 6 L 47 6 L 47 6 C 45 9, 41 12, 39 12 C 38 12, 37 11, 37 9 C 38 9, 38 9, 39 9 C 41 9, 46 4, 46 1 C 46 1, 47 0, 48 0 Z"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 749,
    "y": 415,
    "width": 59,
    "height": 59,
    "fillColor": "#ffffff",
    "pathD": "M 28 38 L 31 38 C 34 38, 36 40, 37 42 C 35 43, 32 44, 30 44 C 27 44, 24 43, 22 42 C 23 40, 25 38, 28 38 Z M 30 24 C 33 24, 36 26, 36 30 C 36 33, 33 35, 30 35 C 26 35, 24 33, 24 30 C 24 26, 26 24, 30 24 Z M 30 15 C 38 15, 44 21, 44 30 C 44 34, 43 38, 40 40 C 39 39, 37 37, 35 36 C 37 35, 38 32, 38 30 C 38 25, 34 21, 30 21 C 25 21, 21 25, 21 30 C 21 32, 22 35, 24 36 C 22 37, 21 39, 19 40 C 17 38, 15 34, 15 30 C 15 21, 21 15, 30 15 Z M 30 12 C 20 12, 12 20, 12 30 C 12 39, 20 47, 30 47 C 39 47, 47 39, 47 30 C 47 20, 39 12, 30 12 Z M 25 0 L 34 0 C 35 0, 35 1, 35 1 L 35 5 C 38 6, 40 7, 43 8 L 45 5 C 46 5, 47 5, 47 5 L 54 12 C 54 12, 54 12, 54 13 C 54 13, 54 14, 54 14 L 51 16 C 52 19, 53 21, 54 24 L 58 24 C 58 24, 59 24, 59 25 L 59 34 C 59 35, 58 35, 58 35 L 54 35 C 53 38, 52 40, 51 43 L 54 45 C 54 45, 54 46, 54 46 C 54 47, 54 47, 54 47 L 47 53 C 47 54, 47 54, 46 54 C 46 54, 45 54, 45 53 L 43 51 C 40 52, 38 53, 35 54 L 35 58 C 35 58, 35 59, 34 59 L 25 59 C 24 59, 24 58, 24 58 L 24 54 C 21 53, 19 52, 16 51 L 14 53 C 13 54, 12 54, 12 53 L 6 47 C 5 47, 5 47, 5 46 C 5 46, 5 45, 6 45 L 8 43 C 7 40, 6 38, 5 35 L 2 35 C 1 35, 0 35, 0 34 L 0 25 C 0 24, 1 24, 2 24 L 5 24 C 6 21, 7 19, 8 16 L 6 14 C 5 14, 5 13, 5 13 C 5 12, 5 12, 6 12 L 12 5 C 12 5, 12 5, 13 5 C 13 5, 14 5, 14 5 L 16 8 C 19 7, 21 6, 24 5 L 24 1 C 24 1, 24 0, 25 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 474,
    "y": 158,
    "width": 56,
    "height": 53,
    "fillColor": "#ffffff",
    "pathD": "M 46 27 L 40 27 C 39 27, 38 26, 38 25 C 38 24, 39 24, 40 24 L 46 24 C 46 24, 47 24, 47 25 C 47 26, 46 27, 46 27 Z M 46 35 L 40 35 C 39 35, 38 35, 38 34 C 38 33, 39 32, 40 32 L 46 32 C 46 32, 47 33, 47 34 C 47 35, 46 35, 46 35 Z M 46 44 L 40 44 C 39 44, 38 44, 38 43 C 38 42, 39 41, 40 41 L 46 41 C 46 41, 47 42, 47 43 C 47 44, 46 44, 46 44 Z M 31 27 L 25 27 C 24 27, 24 26, 24 25 C 24 24, 24 24, 25 24 L 31 24 C 32 24, 32 24, 32 25 C 32 26, 32 27, 31 27 Z M 31 35 L 25 35 C 24 35, 24 35, 24 34 C 24 33, 24 32, 25 32 L 31 32 C 32 32, 32 33, 32 34 C 32 35, 32 35, 31 35 Z M 31 44 L 25 44 C 24 44, 24 44, 24 43 C 24 42, 24 41, 25 41 L 31 41 C 32 41, 32 42, 32 43 C 32 44, 32 44, 31 44 Z M 16 27 L 10 27 C 9 27, 9 26, 9 25 C 9 24, 9 24, 10 24 L 16 24 C 17 24, 18 24, 18 25 C 18 26, 17 27, 16 27 Z M 16 35 L 10 35 C 9 35, 9 35, 9 34 C 9 33, 9 32, 10 32 L 16 32 C 17 32, 18 33, 18 34 C 18 35, 17 35, 16 35 Z M 16 44 L 10 44 C 9 44, 9 44, 9 43 C 9 42, 9 41, 10 41 L 16 41 C 17 41, 18 42, 18 43 C 18 44, 17 44, 16 44 Z M 54 0 L 46 0 C 45 0, 44 1, 44 1 L 44 15 L 38 15 L 38 7 C 38 7, 38 6, 37 6 C 37 6, 36 6, 36 6 L 27 13 L 27 7 C 27 7, 26 6, 26 6 C 25 6, 25 6, 24 6 L 15 13 L 15 7 C 15 7, 14 6, 14 6 C 13 6, 13 6, 12 6 L 1 15 C 0 15, 0 16, 0 16 L 0 51 C 0 52, 1 53, 1 53 L 54 53 C 55 53, 56 52, 56 51 L 56 1 C 56 1, 55 0, 54 0 Z"
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 475,
    "y": 418,
    "width": 53,
    "height": 53,
    "fillColor": "#ffffff",
    "pathD": "M 9 46 L 44 46 L 51 53 L 2 53 L 9 46 Z M 25 36 L 25 43 L 18 43 L 25 36 Z M 31 30 L 31 43 L 28 43 L 28 33 L 31 30 Z M 37 24 L 37 43 L 34 43 L 34 27 L 37 24 Z M 43 18 L 43 43 L 40 43 L 40 21 L 43 18 Z M 39 10 L 43 10 L 43 14 L 14 43 L 10 43 L 10 39 L 39 10 Z M 28 10 L 35 10 L 28 17 L 28 10 Z M 22 10 L 25 10 L 25 20 L 22 23 L 22 10 Z M 16 10 L 19 10 L 19 26 L 16 29 L 16 10 Z M 10 10 L 13 10 L 13 32 L 10 35 L 10 10 Z M 53 2 L 53 51 L 46 44 L 46 9 L 53 2 Z M 0 2 L 7 9 L 7 44 L 0 51 L 0 2 Z M 2 0 L 51 0 L 44 7 L 9 7 L 2 0 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates134Template({ data }: { data: BrainData }): ReactElement {
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
