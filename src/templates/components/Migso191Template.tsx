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
    "x": 80,
    "y": 148,
    "width": 255,
    "height": 480,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 0 480 L 255 480 L 255 480 L 0 480 Z M 0 0 L 255 0 L 255 221 L 128 157 L 0 221 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 305,
    "width": 255,
    "height": 323,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 0,
    "x": 150,
    "y": 172,
    "width": 114,
    "height": 36,
    "text": "1. People"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 181,
    "y": 226,
    "width": 52,
    "height": 52,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 37 47 C 37 46, 38 47, 38 47 C 38 47, 38 48, 38 48 C 34 50, 30 51, 26 51 C 22 51, 18 50, 15 48 C 14 48, 14 48, 14 47 C 14 47, 15 47, 15 47 C 22 50, 30 50, 37 47 Z M 42 43 C 42 44, 43 44, 42 44 C 42 45, 41 46, 41 46 L 41 50 L 50 50 L 50 46 C 50 46, 50 45, 50 44 C 49 44, 49 44, 50 43 C 50 43, 51 43, 51 43 C 52 44, 52 45, 52 46 L 52 51 C 52 52, 52 52, 51 52 L 41 52 C 40 52, 40 52, 40 51 L 40 46 C 40 45, 40 44, 41 43 C 41 43, 42 43, 42 43 Z M 2 43 C 2 44, 3 44, 2 44 C 2 45, 2 46, 2 46 L 2 50 L 11 50 L 11 46 C 11 46, 10 45, 10 44 C 9 44, 10 44, 10 43 C 10 43, 11 43, 11 43 C 12 44, 12 45, 12 46 L 12 51 C 12 52, 12 52, 11 52 L 1 52 C 0 52, 0 52, 0 51 L 0 46 C 0 45, 0 44, 1 43 C 1 43, 2 43, 2 43 Z M 46 38 C 45 38, 44 39, 44 40 C 44 41, 45 42, 46 42 C 47 42, 48 41, 48 40 C 48 39, 47 38, 46 38 Z M 6 38 C 5 38, 4 39, 4 40 C 4 41, 5 42, 6 42 C 7 42, 8 41, 8 40 C 8 39, 7 38, 6 38 Z M 46 37 C 48 37, 49 38, 49 40 C 49 42, 48 44, 46 44 C 44 44, 42 42, 42 40 C 42 38, 44 37, 46 37 Z M 6 37 C 8 37, 9 38, 9 40 C 9 42, 8 44, 6 44 C 4 44, 3 42, 3 40 C 3 38, 4 37, 6 37 Z M 25 33 L 32 33 C 33 33, 33 33, 33 33 C 33 34, 33 34, 32 34 L 25 34 C 25 34, 24 34, 24 33 C 24 33, 25 33, 25 33 Z M 25 27 L 32 27 C 33 27, 33 28, 33 28 C 33 29, 33 29, 32 29 L 25 29 C 25 29, 24 29, 24 28 C 24 28, 25 27, 25 27 Z M 21 22 L 21 41 L 36 41 L 36 22 L 21 22 Z M 16 21 L 16 39 C 16 40, 17 41, 19 41 L 20 41 L 20 22 L 19 22 C 18 22, 17 21, 16 21 Z M 49 17 C 49 17, 50 17, 50 18 C 52 24, 52 30, 49 35 C 49 36, 49 36, 49 36 C 48 36, 48 36, 48 36 C 48 36, 48 35, 48 35 C 50 30, 50 24, 48 18 C 48 18, 48 17, 49 17 Z M 4 17 C 4 17, 4 18, 4 18 C 2 23, 2 29, 4 34 C 4 35, 4 35, 4 35 C 4 35, 4 35, 4 35 C 3 35, 3 35, 3 35 C 1 29, 1 23, 3 18 C 3 17, 3 17, 4 17 Z M 19 15 C 17 15, 16 16, 16 18 C 16 19, 17 20, 19 20 L 34 20 C 34 19, 34 17, 34 15 L 19 15 Z M 19 14 L 37 14 C 37 14, 37 14, 37 15 C 37 15, 37 15, 37 15 L 36 15 C 35 17, 35 19, 36 20 L 37 20 C 37 20, 37 20, 37 21 L 37 42 C 37 42, 37 43, 37 43 L 19 43 C 16 43, 15 41, 15 39 L 15 18 C 15 16, 16 14, 19 14 Z M 42 7 C 42 7, 43 7, 42 8 C 42 8, 41 9, 41 10 L 41 14 L 50 14 L 50 10 C 50 9, 50 8, 50 8 C 49 7, 49 7, 50 7 C 50 6, 51 6, 51 7 C 52 7, 52 8, 52 10 L 52 14 C 52 15, 52 15, 51 15 L 41 15 C 40 15, 40 15, 40 14 L 40 10 C 40 8, 40 7, 41 7 C 41 6, 42 6, 42 7 Z M 2 7 C 2 7, 3 7, 2 8 C 2 8, 2 9, 2 10 L 2 14 L 11 14 L 11 10 C 11 9, 10 8, 10 8 C 9 7, 10 7, 10 7 C 10 6, 11 6, 11 7 C 12 7, 12 8, 12 10 L 12 14 C 12 15, 12 15, 11 15 L 1 15 C 0 15, 0 15, 0 14 L 0 10 C 0 8, 0 7, 1 7 C 1 6, 2 6, 2 7 Z M 46 2 C 45 2, 44 2, 44 3 C 44 4, 45 5, 46 5 C 47 5, 48 4, 48 3 C 48 2, 47 2, 46 2 Z M 6 2 C 5 2, 4 2, 4 3 C 4 4, 5 5, 6 5 C 7 5, 8 4, 8 3 C 8 2, 7 2, 6 2 Z M 26 1 C 30 1, 35 2, 39 5 C 39 5, 39 6, 39 6 C 39 6, 38 6, 38 6 C 31 2, 21 2, 14 6 C 14 6, 13 6, 13 6 C 13 6, 13 6, 13 6 C 12 6, 12 5, 13 5 C 17 2, 21 1, 26 1 Z M 46 0 C 48 0, 49 2, 49 3 C 49 5, 48 7, 46 7 C 44 7, 42 5, 42 3 C 42 2, 44 0, 46 0 Z M 6 0 C 8 0, 9 2, 9 3 C 9 5, 8 7, 6 7 C 4 7, 3 5, 3 3 C 3 2, 4 0, 6 0 Z"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 0,
    "x": 97,
    "y": 379,
    "width": 220,
    "height": 61,
    "text": "Get aligned and organized"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 97,
    "y": 446,
    "width": 220,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 368,
    "y": 148,
    "width": 255,
    "height": 480,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 480 L 255 480 L 255 480 L 0 480 Z M 0 0 L 255 0 L 255 221 L 128 157 L 0 221 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 368,
    "y": 305,
    "width": 255,
    "height": 323,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-8",
    "x": 442,
    "y": 172,
    "width": 107,
    "height": 36,
    "text": "2. Policy"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 470,
    "y": 226,
    "width": 52,
    "height": 52,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 37 47 C 37 46, 38 47, 38 47 C 38 47, 38 48, 38 48 C 34 50, 30 51, 26 51 C 22 51, 18 50, 15 48 C 14 48, 14 48, 14 47 C 14 47, 15 47, 15 47 C 22 50, 30 50, 37 47 Z M 42 43 C 42 44, 43 44, 42 44 C 42 45, 41 46, 41 46 L 41 50 L 50 50 L 50 46 C 50 46, 50 45, 50 44 C 49 44, 49 44, 50 43 C 50 43, 51 43, 51 43 C 52 44, 52 45, 52 46 L 52 51 C 52 52, 52 52, 51 52 L 41 52 C 40 52, 40 52, 40 51 L 40 46 C 40 45, 40 44, 41 43 C 41 43, 42 43, 42 43 Z M 2 43 C 2 44, 3 44, 2 44 C 2 45, 2 46, 2 46 L 2 50 L 11 50 L 11 46 C 11 46, 10 45, 10 44 C 9 44, 10 44, 10 43 C 10 43, 11 43, 11 43 C 12 44, 12 45, 12 46 L 12 51 C 12 52, 12 52, 11 52 L 1 52 C 0 52, 0 52, 0 51 L 0 46 C 0 45, 0 44, 1 43 C 1 43, 2 43, 2 43 Z M 46 38 C 45 38, 44 39, 44 40 C 44 41, 45 42, 46 42 C 47 42, 48 41, 48 40 C 48 39, 47 38, 46 38 Z M 6 38 C 5 38, 4 39, 4 40 C 4 41, 5 42, 6 42 C 7 42, 8 41, 8 40 C 8 39, 7 38, 6 38 Z M 46 37 C 48 37, 49 38, 49 40 C 49 42, 48 44, 46 44 C 44 44, 42 42, 42 40 C 42 38, 44 37, 46 37 Z M 6 37 C 8 37, 9 38, 9 40 C 9 42, 8 44, 6 44 C 4 44, 3 42, 3 40 C 3 38, 4 37, 6 37 Z M 25 33 L 32 33 C 33 33, 33 33, 33 33 C 33 34, 33 34, 32 34 L 25 34 C 25 34, 24 34, 24 33 C 24 33, 25 33, 25 33 Z M 25 27 L 32 27 C 33 27, 33 28, 33 28 C 33 29, 33 29, 32 29 L 25 29 C 25 29, 24 29, 24 28 C 24 28, 25 27, 25 27 Z M 21 22 L 21 41 L 36 41 L 36 22 L 21 22 Z M 16 21 L 16 39 C 16 40, 17 41, 19 41 L 20 41 L 20 22 L 19 22 C 18 22, 17 21, 16 21 Z M 49 17 C 49 17, 50 17, 50 18 C 52 24, 52 30, 49 35 C 49 36, 49 36, 49 36 C 48 36, 48 36, 48 36 C 48 36, 48 35, 48 35 C 50 30, 50 24, 48 18 C 48 18, 48 17, 49 17 Z M 4 17 C 4 17, 4 18, 4 18 C 2 23, 2 29, 4 34 C 4 35, 4 35, 4 35 C 4 35, 4 35, 4 35 C 3 35, 3 35, 3 35 C 1 29, 1 23, 3 18 C 3 17, 3 17, 4 17 Z M 19 15 C 17 15, 16 16, 16 18 C 16 19, 17 20, 19 20 L 34 20 C 34 19, 34 17, 34 15 L 19 15 Z M 19 14 L 37 14 C 37 14, 37 14, 37 15 C 37 15, 37 15, 37 15 L 36 15 C 35 17, 35 19, 36 20 L 37 20 C 37 20, 37 20, 37 21 L 37 42 C 37 42, 37 43, 37 43 L 19 43 C 16 43, 15 41, 15 39 L 15 18 C 15 16, 16 14, 19 14 Z M 42 7 C 42 7, 43 7, 42 8 C 42 8, 41 9, 41 10 L 41 14 L 50 14 L 50 10 C 50 9, 50 8, 50 8 C 49 7, 49 7, 50 7 C 50 6, 51 6, 51 7 C 52 7, 52 8, 52 10 L 52 14 C 52 15, 52 15, 51 15 L 41 15 C 40 15, 40 15, 40 14 L 40 10 C 40 8, 40 7, 41 7 C 41 6, 42 6, 42 7 Z M 2 7 C 2 7, 3 7, 2 8 C 2 8, 2 9, 2 10 L 2 14 L 11 14 L 11 10 C 11 9, 10 8, 10 8 C 9 7, 10 7, 10 7 C 10 6, 11 6, 11 7 C 12 7, 12 8, 12 10 L 12 14 C 12 15, 12 15, 11 15 L 1 15 C 0 15, 0 15, 0 14 L 0 10 C 0 8, 0 7, 1 7 C 1 6, 2 6, 2 7 Z M 46 2 C 45 2, 44 2, 44 3 C 44 4, 45 5, 46 5 C 47 5, 48 4, 48 3 C 48 2, 47 2, 46 2 Z M 6 2 C 5 2, 4 2, 4 3 C 4 4, 5 5, 6 5 C 7 5, 8 4, 8 3 C 8 2, 7 2, 6 2 Z M 26 1 C 30 1, 35 2, 39 5 C 39 5, 39 6, 39 6 C 39 6, 38 6, 38 6 C 31 2, 21 2, 14 6 C 14 6, 13 6, 13 6 C 13 6, 13 6, 13 6 C 12 6, 12 5, 13 5 C 17 2, 21 1, 26 1 Z M 46 0 C 48 0, 49 2, 49 3 C 49 5, 48 7, 46 7 C 44 7, 42 5, 42 3 C 42 2, 44 0, 46 0 Z M 6 0 C 8 0, 9 2, 9 3 C 9 5, 8 7, 6 7 C 4 7, 3 5, 3 3 C 3 2, 4 0, 6 0 Z"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 1,
    "x": 386,
    "y": 379,
    "width": 220,
    "height": 61,
    "text": "Codify agreements"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 1,
    "x": 386,
    "y": 446,
    "width": 220,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 657,
    "y": 148,
    "width": 255,
    "height": 480,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 480 L 255 480 L 255 480 L 0 480 Z M 0 0 L 255 0 L 255 221 L 128 157 L 0 221 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 657,
    "y": 305,
    "width": 255,
    "height": 323,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 721,
    "y": 172,
    "width": 127,
    "height": 36,
    "text": "3. Process"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 758,
    "y": 226,
    "width": 52,
    "height": 52,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 37 47 C 37 46, 38 47, 38 47 C 38 47, 38 48, 38 48 C 34 50, 30 51, 26 51 C 22 51, 18 50, 15 48 C 14 48, 14 48, 14 47 C 14 47, 15 47, 15 47 C 22 50, 30 50, 37 47 Z M 42 43 C 42 44, 43 44, 42 44 C 42 45, 41 46, 41 46 L 41 50 L 50 50 L 50 46 C 50 46, 50 45, 50 44 C 49 44, 49 44, 50 43 C 50 43, 51 43, 51 43 C 52 44, 52 45, 52 46 L 52 51 C 52 52, 52 52, 51 52 L 41 52 C 40 52, 40 52, 40 51 L 40 46 C 40 45, 40 44, 41 43 C 41 43, 42 43, 42 43 Z M 2 43 C 2 44, 3 44, 2 44 C 2 45, 2 46, 2 46 L 2 50 L 11 50 L 11 46 C 11 46, 10 45, 10 44 C 9 44, 10 44, 10 43 C 10 43, 11 43, 11 43 C 12 44, 12 45, 12 46 L 12 51 C 12 52, 12 52, 11 52 L 1 52 C 0 52, 0 52, 0 51 L 0 46 C 0 45, 0 44, 1 43 C 1 43, 2 43, 2 43 Z M 46 38 C 45 38, 44 39, 44 40 C 44 41, 45 42, 46 42 C 47 42, 48 41, 48 40 C 48 39, 47 38, 46 38 Z M 6 38 C 5 38, 4 39, 4 40 C 4 41, 5 42, 6 42 C 7 42, 8 41, 8 40 C 8 39, 7 38, 6 38 Z M 46 37 C 48 37, 49 38, 49 40 C 49 42, 48 44, 46 44 C 44 44, 42 42, 42 40 C 42 38, 44 37, 46 37 Z M 6 37 C 8 37, 9 38, 9 40 C 9 42, 8 44, 6 44 C 4 44, 3 42, 3 40 C 3 38, 4 37, 6 37 Z M 25 33 L 32 33 C 33 33, 33 33, 33 33 C 33 34, 33 34, 32 34 L 25 34 C 25 34, 24 34, 24 33 C 24 33, 25 33, 25 33 Z M 25 27 L 32 27 C 33 27, 33 28, 33 28 C 33 29, 33 29, 32 29 L 25 29 C 25 29, 24 29, 24 28 C 24 28, 25 27, 25 27 Z M 21 22 L 21 41 L 36 41 L 36 22 L 21 22 Z M 16 21 L 16 39 C 16 40, 17 41, 19 41 L 20 41 L 20 22 L 19 22 C 18 22, 17 21, 16 21 Z M 49 17 C 49 17, 50 17, 50 18 C 52 24, 52 30, 49 35 C 49 36, 49 36, 49 36 C 48 36, 48 36, 48 36 C 48 36, 48 35, 48 35 C 50 30, 50 24, 48 18 C 48 18, 48 17, 49 17 Z M 4 17 C 4 17, 4 18, 4 18 C 2 23, 2 29, 4 34 C 4 35, 4 35, 4 35 C 4 35, 4 35, 4 35 C 3 35, 3 35, 3 35 C 1 29, 1 23, 3 18 C 3 17, 3 17, 4 17 Z M 19 15 C 17 15, 16 16, 16 18 C 16 19, 17 20, 19 20 L 34 20 C 34 19, 34 17, 34 15 L 19 15 Z M 19 14 L 37 14 C 37 14, 37 14, 37 15 C 37 15, 37 15, 37 15 L 36 15 C 35 17, 35 19, 36 20 L 37 20 C 37 20, 37 20, 37 21 L 37 42 C 37 42, 37 43, 37 43 L 19 43 C 16 43, 15 41, 15 39 L 15 18 C 15 16, 16 14, 19 14 Z M 42 7 C 42 7, 43 7, 42 8 C 42 8, 41 9, 41 10 L 41 14 L 50 14 L 50 10 C 50 9, 50 8, 50 8 C 49 7, 49 7, 50 7 C 50 6, 51 6, 51 7 C 52 7, 52 8, 52 10 L 52 14 C 52 15, 52 15, 51 15 L 41 15 C 40 15, 40 15, 40 14 L 40 10 C 40 8, 40 7, 41 7 C 41 6, 42 6, 42 7 Z M 2 7 C 2 7, 3 7, 2 8 C 2 8, 2 9, 2 10 L 2 14 L 11 14 L 11 10 C 11 9, 10 8, 10 8 C 9 7, 10 7, 10 7 C 10 6, 11 6, 11 7 C 12 7, 12 8, 12 10 L 12 14 C 12 15, 12 15, 11 15 L 1 15 C 0 15, 0 15, 0 14 L 0 10 C 0 8, 0 7, 1 7 C 1 6, 2 6, 2 7 Z M 46 2 C 45 2, 44 2, 44 3 C 44 4, 45 5, 46 5 C 47 5, 48 4, 48 3 C 48 2, 47 2, 46 2 Z M 6 2 C 5 2, 4 2, 4 3 C 4 4, 5 5, 6 5 C 7 5, 8 4, 8 3 C 8 2, 7 2, 6 2 Z M 26 1 C 30 1, 35 2, 39 5 C 39 5, 39 6, 39 6 C 39 6, 38 6, 38 6 C 31 2, 21 2, 14 6 C 14 6, 13 6, 13 6 C 13 6, 13 6, 13 6 C 12 6, 12 5, 13 5 C 17 2, 21 1, 26 1 Z M 46 0 C 48 0, 49 2, 49 3 C 49 5, 48 7, 46 7 C 44 7, 42 5, 42 3 C 42 2, 44 0, 46 0 Z M 6 0 C 8 0, 9 2, 9 3 C 9 5, 8 7, 6 7 C 4 7, 3 5, 3 3 C 3 2, 4 0, 6 0 Z"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 2,
    "x": 674,
    "y": 379,
    "width": 220,
    "height": 61,
    "text": "Make it actionable"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 674,
    "y": 446,
    "width": 220,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 945,
    "y": 148,
    "width": 255,
    "height": 480,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 480 L 255 480 L 255 480 L 0 480 Z M 0 0 L 255 0 L 255 221 L 128 157 L 0 221 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 945,
    "y": 305,
    "width": 255,
    "height": 323,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 2,
    "x": 1009,
    "y": 172,
    "width": 127,
    "height": 36,
    "text": "4. Practice"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1047,
    "y": 226,
    "width": 52,
    "height": 52,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 37 47 C 37 46, 38 47, 38 47 C 38 47, 38 48, 38 48 C 34 50, 30 51, 26 51 C 22 51, 18 50, 15 48 C 14 48, 14 48, 14 47 C 14 47, 15 47, 15 47 C 22 50, 30 50, 37 47 Z M 42 43 C 42 44, 43 44, 42 44 C 42 45, 41 46, 41 46 L 41 50 L 50 50 L 50 46 C 50 46, 50 45, 50 44 C 49 44, 49 44, 50 43 C 50 43, 51 43, 51 43 C 52 44, 52 45, 52 46 L 52 51 C 52 52, 52 52, 51 52 L 41 52 C 40 52, 40 52, 40 51 L 40 46 C 40 45, 40 44, 41 43 C 41 43, 42 43, 42 43 Z M 2 43 C 2 44, 3 44, 2 44 C 2 45, 2 46, 2 46 L 2 50 L 11 50 L 11 46 C 11 46, 10 45, 10 44 C 9 44, 10 44, 10 43 C 10 43, 11 43, 11 43 C 12 44, 12 45, 12 46 L 12 51 C 12 52, 12 52, 11 52 L 1 52 C 0 52, 0 52, 0 51 L 0 46 C 0 45, 0 44, 1 43 C 1 43, 2 43, 2 43 Z M 46 38 C 45 38, 44 39, 44 40 C 44 41, 45 42, 46 42 C 47 42, 48 41, 48 40 C 48 39, 47 38, 46 38 Z M 6 38 C 5 38, 4 39, 4 40 C 4 41, 5 42, 6 42 C 7 42, 8 41, 8 40 C 8 39, 7 38, 6 38 Z M 46 37 C 48 37, 49 38, 49 40 C 49 42, 48 44, 46 44 C 44 44, 42 42, 42 40 C 42 38, 44 37, 46 37 Z M 6 37 C 8 37, 9 38, 9 40 C 9 42, 8 44, 6 44 C 4 44, 3 42, 3 40 C 3 38, 4 37, 6 37 Z M 25 33 L 32 33 C 33 33, 33 33, 33 33 C 33 34, 33 34, 32 34 L 25 34 C 25 34, 24 34, 24 33 C 24 33, 25 33, 25 33 Z M 25 27 L 32 27 C 33 27, 33 28, 33 28 C 33 29, 33 29, 32 29 L 25 29 C 25 29, 24 29, 24 28 C 24 28, 25 27, 25 27 Z M 21 22 L 21 41 L 36 41 L 36 22 L 21 22 Z M 16 21 L 16 39 C 16 40, 17 41, 19 41 L 20 41 L 20 22 L 19 22 C 18 22, 17 21, 16 21 Z M 49 17 C 49 17, 50 17, 50 18 C 52 24, 52 30, 49 35 C 49 36, 49 36, 49 36 C 48 36, 48 36, 48 36 C 48 36, 48 35, 48 35 C 50 30, 50 24, 48 18 C 48 18, 48 17, 49 17 Z M 4 17 C 4 17, 4 18, 4 18 C 2 23, 2 29, 4 34 C 4 35, 4 35, 4 35 C 4 35, 4 35, 4 35 C 3 35, 3 35, 3 35 C 1 29, 1 23, 3 18 C 3 17, 3 17, 4 17 Z M 19 15 C 17 15, 16 16, 16 18 C 16 19, 17 20, 19 20 L 34 20 C 34 19, 34 17, 34 15 L 19 15 Z M 19 14 L 37 14 C 37 14, 37 14, 37 15 C 37 15, 37 15, 37 15 L 36 15 C 35 17, 35 19, 36 20 L 37 20 C 37 20, 37 20, 37 21 L 37 42 C 37 42, 37 43, 37 43 L 19 43 C 16 43, 15 41, 15 39 L 15 18 C 15 16, 16 14, 19 14 Z M 42 7 C 42 7, 43 7, 42 8 C 42 8, 41 9, 41 10 L 41 14 L 50 14 L 50 10 C 50 9, 50 8, 50 8 C 49 7, 49 7, 50 7 C 50 6, 51 6, 51 7 C 52 7, 52 8, 52 10 L 52 14 C 52 15, 52 15, 51 15 L 41 15 C 40 15, 40 15, 40 14 L 40 10 C 40 8, 40 7, 41 7 C 41 6, 42 6, 42 7 Z M 2 7 C 2 7, 3 7, 2 8 C 2 8, 2 9, 2 10 L 2 14 L 11 14 L 11 10 C 11 9, 10 8, 10 8 C 9 7, 10 7, 10 7 C 10 6, 11 6, 11 7 C 12 7, 12 8, 12 10 L 12 14 C 12 15, 12 15, 11 15 L 1 15 C 0 15, 0 15, 0 14 L 0 10 C 0 8, 0 7, 1 7 C 1 6, 2 6, 2 7 Z M 46 2 C 45 2, 44 2, 44 3 C 44 4, 45 5, 46 5 C 47 5, 48 4, 48 3 C 48 2, 47 2, 46 2 Z M 6 2 C 5 2, 4 2, 4 3 C 4 4, 5 5, 6 5 C 7 5, 8 4, 8 3 C 8 2, 7 2, 6 2 Z M 26 1 C 30 1, 35 2, 39 5 C 39 5, 39 6, 39 6 C 39 6, 38 6, 38 6 C 31 2, 21 2, 14 6 C 14 6, 13 6, 13 6 C 13 6, 13 6, 13 6 C 12 6, 12 5, 13 5 C 17 2, 21 1, 26 1 Z M 46 0 C 48 0, 49 2, 49 3 C 49 5, 48 7, 46 7 C 44 7, 42 5, 42 3 C 42 2, 44 0, 46 0 Z M 6 0 C 8 0, 9 2, 9 3 C 9 5, 8 7, 6 7 C 4 7, 3 5, 3 3 C 3 2, 4 0, 6 0 Z"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 963,
    "y": 379,
    "width": 220,
    "height": 61,
    "text": "Execute & automate"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 963,
    "y": 446,
    "width": 220,
    "height": 76,
    "text": "MIGSO-PCUBED content and words to be added here as required"
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

export function Migso191Template({ data }: { data: BrainData }): ReactElement {
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
