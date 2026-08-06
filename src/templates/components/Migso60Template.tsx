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
    "x": 492,
    "y": 111,
    "width": 194,
    "height": 231,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 72 L 95 0 L 190 72 L 172 72 L 172 74 C 174 91, 181 107, 192 120 L 194 122 L 193 124 L 91 129 L 86 230 L 85 231 L 80 226 C 44 186, 21 134, 18 77 L 18 72 Z"
  },
  {
    "id": "sp-1",
    "x": 638,
    "y": 156,
    "width": 189,
    "height": 172,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 0 172 L 0 166 C 3 109, 26 57, 62 17 L 66 13 L 53 0 L 167 22 L 189 136 L 175 122 L 174 123 C 163 136, 156 152, 154 169 L 154 172 L 77 113 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 407,
    "y": 208,
    "width": 168,
    "height": 182,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 131 L 6 6 L 131 0 L 120 11 L 128 16 C 139 23, 151 27, 164 28 L 167 28 L 108 104 L 168 180 L 168 182 L 160 182 C 103 179, 51 156, 12 120 L 11 120 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 688,
    "y": 241,
    "width": 230,
    "height": 193,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 0 85 L 4 81 C 44 45, 96 22, 153 19 L 155 19 L 155 0 L 230 96 L 155 191 L 155 173 L 150 174 C 135 177, 122 183, 111 192 L 110 193 L 92 103 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 364,
    "y": 342,
    "width": 231,
    "height": 193,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 97 L 75 2 L 75 21 L 80 21 C 95 18, 109 12, 120 2 L 122 0 L 125 3 L 137 98 L 231 109 L 227 113 C 187 150, 135 173, 77 175 L 75 176 L 75 193 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 704,
    "y": 386,
    "width": 170,
    "height": 183,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 0 154 L 0 153 L 60 77 L 0 1 L 0 0 L 8 0 C 65 3, 117 26, 157 62 L 157 63 L 170 50 L 163 176 L 37 183 L 48 172 L 40 167 C 29 160, 17 156, 4 154 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 595,
    "y": 435,
    "width": 195,
    "height": 229,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 0 109 L 1 108 L 103 102 L 109 0 L 109 0 L 114 5 C 150 45, 173 97, 176 154 L 176 157 L 195 157 L 99 229 L 3 157 L 22 157 L 21 151 C 18 136, 12 123, 2 112 Z"
  },
  {
    "id": "sp-7",
    "x": 458,
    "y": 451,
    "width": 183,
    "height": 172,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 0 37 L 11 48 L 17 40 C 23 29, 27 17, 29 4 L 29 0 L 30 0 L 106 58 L 182 0 L 183 0 L 183 8 C 180 65, 157 117, 121 157 L 120 157 L 135 172 L 15 157 Z"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 0,
    "x": 525,
    "y": 227,
    "width": 52,
    "height": 45,
    "text": "3"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 2,
    "x": 644,
    "y": 202,
    "width": 52,
    "height": 45,
    "text": "4"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 5,
    "x": 747,
    "y": 268,
    "width": 52,
    "height": 45,
    "text": "5"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 8,
    "x": 777,
    "y": 392,
    "width": 52,
    "height": 45,
    "text": "6"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 13,
    "x": 707,
    "y": 507,
    "width": 52,
    "height": 45,
    "text": "7"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 11,
    "x": 587,
    "y": 528,
    "width": 52,
    "height": 45,
    "text": "8"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 9,
    "x": 477,
    "y": 465,
    "width": 52,
    "height": 45,
    "text": "1"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 6,
    "x": 451,
    "y": 338,
    "width": 52,
    "height": 45,
    "text": "2"
  },
  {
    "id": "sp-16",
    "x": 461,
    "y": 406,
    "width": 41,
    "height": 33,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 20 13 C 19 13, 17 15, 17 17 C 17 19, 19 20, 20 20 C 22 20, 24 19, 24 17 C 24 17, 24 17, 24 16 C 24 16, 24 16, 24 16 C 22 16, 21 15, 21 13 C 21 13, 21 13, 21 13 C 21 13, 21 13, 20 13 Z M 24 11 C 23 11, 22 12, 22 13 C 22 14, 23 15, 24 15 C 25 15, 26 14, 26 13 C 26 12, 25 11, 24 11 Z M 24 10 C 26 10, 27 12, 27 13 C 27 15, 26 16, 25 16 C 25 16, 25 16, 25 17 C 25 19, 23 21, 20 21 C 18 21, 16 19, 16 17 C 16 14, 18 12, 20 12 C 21 12, 21 12, 21 12 C 22 11, 23 10, 24 10 Z M 20 6 C 15 6, 10 11, 10 17 C 10 22, 15 27, 20 27 C 26 27, 31 22, 31 17 C 31 11, 26 6, 20 6 Z M 20 5 C 27 5, 32 10, 32 17 C 32 23, 27 28, 20 28 C 14 28, 9 23, 9 17 C 9 10, 14 5, 20 5 Z M 21 1 C 13 1, 7 7, 3 11 C 1 14, 1 19, 3 22 C 7 26, 13 32, 21 32 C 28 32, 34 26, 38 22 C 40 19, 40 14, 38 11 C 34 7, 28 1, 21 1 Z M 21 0 C 28 0, 35 6, 39 11 C 42 14, 42 19, 39 22 C 35 27, 28 33, 21 33 C 13 33, 6 27, 2 22 C -1 19, -1 14, 2 11 C 6 6, 13 0, 21 0 Z"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 1,
    "x": 584,
    "y": 204,
    "width": 41,
    "height": 41,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 5 23 L 5 21 L 33 21 L 33 23 L 5 23 Z M 5 17 L 33 17 L 33 19 L 5 19 L 5 17 Z M 4 23 L 2 23 C 2 23, 2 23, 2 23 C 1 23, 1 22, 1 22 L 1 18 C 1 17, 2 17, 2 17 L 4 17 L 4 23 Z M 34 17 L 39 20 L 34 23 L 34 17 Z M 40 23 L 40 23 C 40 23, 40 23, 40 23 L 40 40 L 21 40 L 21 39 C 21 37, 22 37, 23 37 L 36 37 C 37 37, 37 36, 37 36 L 37 26 C 37 25, 37 25, 36 25 C 36 25, 36 25, 36 26 L 36 35 L 23 35 C 22 35, 22 36, 21 36 L 21 24 L 34 24 C 34 24, 34 24, 34 24 L 41 21 C 41 20, 41 20, 41 20 C 41 20, 41 20, 41 20 L 34 16 C 34 16, 34 16, 34 16 L 21 16 L 21 3 C 21 2, 22 1, 23 1 L 36 1 L 36 14 C 36 15, 36 15, 36 15 C 37 15, 37 15, 37 14 L 37 5 L 40 5 L 40 17 C 40 17, 40 17, 40 17 C 41 17, 41 17, 41 17 L 41 5 C 41 4, 41 4, 40 4 L 37 4 L 37 1 C 37 0, 37 0, 36 0 L 23 0 C 22 0, 21 1, 20 1 C 20 1, 19 0, 18 0 L 5 0 C 4 0, 4 0, 4 1 L 4 4 L 1 4 C 0 4, 0 4, 0 5 L 0 14 C 0 15, 0 15, 1 15 C 1 15, 1 15, 1 14 L 1 5 L 4 5 L 4 13 C 4 13, 4 13, 5 13 C 5 13, 5 13, 5 13 L 5 1 L 18 1 C 19 1, 20 2, 20 3 L 20 16 L 5 16 L 5 15 C 5 15, 5 15, 5 15 C 4 15, 4 15, 4 15 L 4 16 L 2 16 C 1 16, 0 17, 0 18 L 0 22 C 0 23, 1 24, 2 24 L 4 24 L 4 25 C 4 25, 4 25, 5 25 C 5 25, 5 25, 5 25 L 5 24 L 20 24 L 20 36 C 19 36, 18 35, 18 35 L 5 35 L 5 28 C 5 27, 5 27, 5 27 C 4 27, 4 27, 4 28 L 4 36 C 4 36, 4 37, 5 37 L 18 37 C 19 37, 20 37, 20 39 L 20 40 L 1 40 L 1 26 C 1 26, 1 25, 1 25 C 0 25, 0 26, 0 26 L 0 40 C 0 41, 0 41, 1 41 L 20 41 L 40 41 C 41 41, 41 41, 41 40 L 41 23 C 41 23, 41 23, 40 23 Z"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 4,
    "x": 482,
    "y": 274,
    "width": 41,
    "height": 41,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 15 35 L 14 36 L 17 40 L 24 40 L 21 35 C 20 35, 19 36, 18 36 C 17 36, 16 35, 15 35 Z M 3 31 L 1 34 L 1 40 L 15 40 L 10 31 C 9 31, 7 32, 6 32 C 5 32, 4 31, 3 31 Z M 18 30 L 16 34 C 17 35, 19 35, 20 34 L 18 30 Z M 6 26 L 4 30 C 5 30, 5 31, 6 31 C 7 31, 8 30, 9 30 L 6 26 Z M 15 20 C 14 20, 14 21, 14 22 C 14 23, 14 24, 15 24 C 16 24, 17 23, 17 22 C 17 21, 16 20, 15 20 Z M 15 19 C 17 19, 19 20, 19 22 C 19 24, 17 25, 15 25 C 14 25, 12 24, 12 22 C 12 20, 14 19, 15 19 Z M 1 16 L 1 31 L 6 24 C 6 24, 7 24, 7 24 L 14 35 L 18 29 C 18 29, 18 29, 19 29 L 25 38 L 25 16 L 1 16 Z M 9 9 L 9 15 L 25 15 C 26 15, 26 15, 26 16 L 26 32 L 32 32 L 32 9 L 9 9 Z M 16 1 L 16 7 L 33 7 C 33 7, 34 8, 34 8 L 34 25 L 40 25 L 40 1 L 16 1 Z M 16 0 L 40 0 C 41 0, 41 0, 41 1 L 41 25 C 41 26, 41 26, 40 26 L 34 26 L 34 33 C 34 33, 33 34, 33 34 L 26 34 L 26 40 C 26 41, 26 41, 25 41 L 1 41 C 0 41, 0 41, 0 40 L 0 16 C 0 15, 0 15, 1 15 L 7 15 L 7 8 C 7 8, 8 7, 8 7 L 15 7 L 15 1 C 15 0, 15 0, 16 0 Z"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 7,
    "x": 783,
    "y": 331,
    "width": 41,
    "height": 38,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 19 28 C 19 28, 19 29, 19 29 C 19 29, 19 30, 19 30 L 19 30 C 18 30, 18 29, 18 29 C 18 29, 19 28, 19 28 Z M 19 26 C 19 26, 19 26, 19 26 C 19 27, 19 27, 19 27 L 19 27 C 18 27, 18 27, 18 27 C 18 26, 18 26, 19 26 Z M 18 23 C 18 23, 19 24, 19 24 C 19 24, 19 25, 18 25 C 18 25, 18 25, 18 25 C 18 25, 18 24, 18 24 C 17 24, 18 24, 18 23 Z M 30 22 C 30 22, 30 23, 30 23 C 30 23, 30 24, 30 24 C 30 24, 30 24, 30 24 C 29 24, 29 23, 29 23 C 29 23, 29 22, 30 22 Z M 17 21 C 17 21, 18 21, 18 21 C 18 22, 18 22, 18 22 C 17 22, 17 22, 17 22 C 17 22, 17 22, 17 22 C 17 22, 17 21, 17 21 Z M 29 20 C 30 20, 30 20, 30 20 C 30 21, 30 21, 29 21 C 29 21, 29 21, 29 21 C 29 21, 29 21, 29 21 C 29 20, 29 20, 29 20 Z M 16 19 C 16 19, 16 19, 17 19 C 17 20, 17 20, 16 20 C 16 20, 16 20, 16 20 C 16 20, 16 20, 15 20 C 15 20, 15 19, 16 19 Z M 14 18 L 14 18 L 14 18 L 14 18 Z M 29 18 C 29 17, 29 18, 29 18 C 30 18, 29 19, 29 19 C 29 19, 29 19, 29 19 C 29 19, 28 19, 28 18 C 28 18, 28 18, 29 18 Z M 14 17 C 14 17, 15 17, 15 17 C 15 18, 15 18, 15 18 C 15 18, 15 18, 15 18 L 14 18 L 14 17 Z M 28 15 C 28 15, 28 15, 29 16 C 29 16, 29 16, 28 16 C 28 16, 28 16, 28 16 C 28 16, 27 16, 27 16 L 27 16 C 27 16, 27 15, 28 15 Z M 26 13 C 27 13, 27 13, 27 13 C 27 14, 27 14, 27 14 C 27 14, 27 14, 27 14 C 27 14, 26 14, 26 14 C 26 14, 26 13, 26 13 Z M 10 13 C 8 15, 1 21, 1 28 C 1 33, 5 37, 10 37 C 13 37, 16 35, 17 32 C 14 30, 11 27, 11 22 C 11 20, 11 18, 12 16 C 11 15, 10 14, 10 13 Z M 25 11 C 25 11, 26 11, 26 11 C 26 12, 26 12, 26 12 C 26 12, 26 12, 25 12 C 25 12, 25 12, 25 12 C 25 12, 25 11, 25 11 Z M 20 7 C 19 9, 12 15, 12 22 C 12 27, 16 31, 20 31 C 24 31, 27 29, 28 26 C 24 25, 22 21, 22 17 C 22 14, 22 12, 23 10 C 22 9, 21 8, 20 7 Z M 31 1 C 30 3, 23 10, 23 17 C 23 21, 27 25, 31 25 C 36 25, 40 21, 40 17 C 40 10, 33 3, 31 1 Z M 31 0 C 31 0, 31 0, 32 0 C 32 0, 41 8, 41 17 C 41 22, 37 26, 31 26 C 31 26, 30 26, 29 26 C 28 30, 25 32, 20 32 C 20 32, 19 32, 19 32 C 17 35, 14 38, 10 38 C 4 38, 0 34, 0 28 C 0 20, 9 12, 9 12 C 10 12, 10 12, 10 12 C 10 12, 11 13, 13 15 C 16 10, 20 6, 20 6 C 20 6, 21 6, 21 6 C 21 6, 22 7, 24 9 C 26 4, 31 0, 31 0 Z"
  },
  {
    "id": "sp-20",
    "x": 768,
    "y": 467,
    "width": 31,
    "height": 41,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 38 C 10 39, 11 40, 12 40 L 19 40 C 20 40, 21 39, 21 38 L 10 38 Z M 8 31 C 8 31, 8 31, 8 32 L 8 36 C 8 36, 8 36, 8 36 L 23 36 C 23 36, 23 36, 23 36 L 23 34 L 11 34 C 10 34, 10 34, 10 34 C 10 33, 10 33, 11 33 L 23 33 L 23 32 C 23 31, 23 31, 23 31 L 8 31 Z M 12 24 L 14 30 L 18 30 L 19 24 L 12 24 Z M 14 12 C 13 14, 11 17, 11 19 C 11 21, 11 22, 12 23 L 15 23 C 13 19, 14 15, 14 12 Z M 16 12 C 15 14, 14 18, 16 23 L 19 23 C 20 22, 20 21, 20 19 C 20 16, 17 13, 16 12 Z M 16 4 C 16 4, 17 4, 17 5 L 18 6 C 18 6, 18 6, 19 6 L 20 5 C 20 5, 21 5, 21 5 C 22 6, 22 6, 22 7 L 23 8 C 23 8, 23 8, 23 8 L 24 9 C 25 9, 25 9, 26 10 C 26 10, 26 11, 26 11 L 25 12 C 25 13, 25 13, 26 13 L 27 14 C 27 14, 27 15, 27 15 C 27 16, 27 16, 27 17 L 26 18 C 25 18, 25 18, 25 18 L 26 21 C 26 21, 26 22, 26 22 C 26 22, 26 22, 26 22 C 25 22, 25 22, 25 21 L 24 19 C 24 18, 24 17, 25 17 L 26 16 C 26 16, 26 16, 26 15 C 26 15, 26 15, 26 15 L 25 14 C 24 13, 24 13, 24 12 L 25 11 C 25 11, 25 10, 25 10 C 24 10, 24 10, 24 10 L 23 10 C 22 10, 22 9, 21 8 L 21 7 C 21 7, 21 7, 21 7 C 21 6, 20 6, 20 7 L 19 7 C 18 7, 18 7, 17 6 L 16 5 C 16 5, 15 5, 15 5 L 14 6 C 14 7, 13 7, 12 7 L 11 7 C 11 6, 11 6, 11 7 C 10 7, 10 7, 10 7 L 10 8 C 10 9, 9 10, 9 10 L 7 10 C 7 10, 7 10, 7 10 C 7 10, 7 11, 7 11 L 7 12 C 7 13, 7 13, 7 14 L 6 15 C 6 15, 6 15, 6 15 C 6 16, 6 16, 6 16 L 7 17 C 7 17, 7 18, 7 19 L 6 21 C 6 22, 6 22, 6 22 C 5 22, 5 21, 5 21 L 6 18 C 6 18, 6 18, 6 18 L 5 17 C 4 16, 4 16, 4 15 C 4 15, 4 14, 5 14 L 6 13 C 6 13, 6 13, 6 12 L 6 11 C 6 11, 6 10, 6 10 C 6 9, 7 9, 7 9 L 8 8 C 9 8, 9 8, 9 8 L 9 7 C 9 6, 10 6, 10 5 C 10 5, 11 5, 11 5 L 13 6 C 13 6, 13 6, 13 6 L 14 5 C 15 4, 15 4, 16 4 Z M 16 1 C 8 1, 1 8, 1 16 C 1 19, 3 23, 5 26 C 6 27, 7 28, 8 30 L 12 30 L 11 23 C 10 22, 10 21, 10 19 C 10 15, 15 10, 15 10 C 15 10, 16 10, 16 10 C 16 10, 21 15, 21 19 C 21 21, 21 22, 20 23 L 19 30 L 24 30 C 24 28, 25 27, 26 26 C 28 23, 30 19, 30 16 C 30 8, 23 1, 16 1 Z M 16 0 C 24 0, 31 7, 31 16 C 31 20, 29 24, 27 26 C 25 28, 24 30, 24 32 L 24 36 C 24 37, 24 38, 23 38 L 23 38 C 22 40, 21 41, 19 41 L 12 41 C 10 41, 9 40, 8 38 L 8 38 C 7 38, 7 37, 7 36 L 7 32 C 7 30, 6 28, 4 26 C 2 24, 0 20, 0 16 C 0 7, 7 0, 16 0 Z"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 12,
    "x": 655,
    "y": 531,
    "width": 41,
    "height": 41,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 28 28 C 29 28, 29 28, 29 28 L 32 31 L 34 28 C 34 28, 35 28, 35 28 C 35 29, 35 29, 35 29 L 32 32 L 35 34 C 35 34, 35 35, 35 35 C 35 35, 35 35, 35 35 C 34 35, 34 35, 34 35 L 32 32 L 29 35 C 29 35, 29 35, 29 35 C 29 35, 28 35, 28 35 C 28 35, 28 34, 28 34 L 31 32 L 28 29 C 28 29, 28 29, 28 28 Z M 17 27 C 18 27, 18 27, 18 27 C 19 28, 19 28, 18 28 L 10 37 C 10 37, 10 37, 10 37 C 9 37, 9 37, 9 37 L 4 31 C 4 31, 4 31, 4 30 C 4 30, 5 30, 5 30 L 10 35 L 17 27 Z M 32 24 C 27 24, 24 27, 24 32 C 24 36, 27 40, 32 40 C 33 40, 34 39, 35 39 C 36 39, 36 39, 36 39 L 40 40 L 39 36 C 39 36, 39 36, 39 35 C 39 34, 40 33, 40 32 C 40 27, 36 24, 32 24 Z M 32 22 C 37 22, 41 27, 41 32 C 41 33, 41 34, 40 36 L 41 40 C 41 40, 41 41, 41 41 C 41 41, 41 41, 40 41 C 40 41, 40 41, 40 41 L 36 40 C 34 41, 33 41, 32 41 C 27 41, 22 37, 22 32 C 22 27, 27 22, 32 22 Z M 9 22 C 12 22, 14 23, 16 25 C 16 25, 16 26, 16 26 C 15 26, 15 26, 15 26 C 13 24, 11 24, 9 24 C 5 24, 1 27, 1 32 C 1 33, 2 34, 2 35 C 2 36, 2 36, 2 36 L 1 40 L 5 39 C 5 39, 5 39, 6 39 C 7 39, 8 40, 9 40 C 13 40, 17 37, 17 33 C 17 32, 18 32, 18 32 C 18 32, 19 33, 18 33 C 18 38, 14 41, 9 41 C 8 41, 7 41, 5 40 L 1 41 L 1 41 C 0 41, 0 41, 0 41 C 0 41, 0 40, 0 40 L 1 36 C 0 34, 0 33, 0 32 C 0 27, 4 22, 9 22 Z M 28 6 C 29 6, 29 6, 29 6 L 32 8 L 34 6 C 34 6, 35 6, 35 6 C 35 6, 35 6, 35 7 L 32 9 L 35 12 C 35 12, 35 12, 35 13 C 35 13, 35 13, 35 13 C 34 13, 34 13, 34 13 L 32 10 L 29 13 C 29 13, 29 13, 29 13 C 29 13, 28 13, 28 13 C 28 12, 28 12, 28 12 L 31 9 L 28 7 C 28 6, 28 6, 28 6 Z M 6 6 C 6 6, 6 6, 7 6 L 9 8 L 12 6 C 12 6, 12 6, 12 6 C 13 6, 13 6, 12 7 L 10 9 L 12 12 C 13 12, 13 12, 12 13 C 12 13, 12 13, 12 13 C 12 13, 12 13, 12 13 L 9 10 L 7 13 C 7 13, 6 13, 6 13 C 6 13, 6 13, 6 13 C 6 12, 6 12, 6 12 L 8 9 L 6 7 C 6 6, 6 6, 6 6 Z M 32 1 C 27 1, 24 5, 24 9 C 24 14, 27 17, 32 17 C 36 17, 40 14, 40 9 C 40 8, 39 7, 39 6 C 39 5, 39 5, 39 5 L 40 1 L 36 2 C 36 2, 36 2, 35 2 C 34 2, 33 1, 32 1 Z M 9 1 C 8 1, 7 2, 6 2 C 5 2, 5 2, 5 2 L 1 1 L 2 5 C 2 5, 2 5, 2 6 C 2 7, 1 8, 1 9 C 1 14, 5 17, 9 17 C 14 17, 17 14, 17 9 C 17 5, 14 1, 9 1 Z M 32 0 C 33 0, 34 0, 36 1 L 40 0 C 40 0, 41 0, 41 0 C 41 0, 41 1, 41 1 L 40 5 C 41 7, 41 8, 41 9 C 41 14, 37 19, 32 19 C 27 19, 22 14, 22 9 C 22 4, 27 0, 32 0 Z M 9 0 C 14 0, 19 4, 19 9 C 19 14, 14 19, 9 19 C 4 19, 0 14, 0 9 C 0 8, 0 7, 1 5 L 0 1 C 0 1, 0 0, 0 0 C 0 0, 1 0, 1 0 L 5 1 C 7 0, 8 0, 9 0 Z"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 10,
    "x": 523,
    "y": 510,
    "width": 41,
    "height": 41,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 14 36 C 12 36, 10 38, 10 40 L 31 40 C 31 38, 29 36, 27 36 L 14 36 Z M 18 33 L 18 35 L 23 35 L 23 33 L 18 33 Z M 20 11 L 19 14 C 19 15, 19 15, 18 15 L 15 15 L 18 18 C 18 18, 18 18, 18 18 L 17 21 L 20 20 C 20 20, 21 20, 21 20 L 24 21 L 23 18 C 23 18, 23 18, 23 18 L 26 15 L 22 15 C 22 15, 22 15, 22 14 L 20 11 Z M 20 10 C 20 9, 21 9, 21 10 L 23 14 L 27 14 C 27 14, 27 14, 27 15 C 28 15, 27 15, 27 15 L 24 18 L 25 22 C 25 22, 25 23, 25 23 C 25 23, 24 23, 24 23 L 20 21 L 17 23 C 17 23, 17 23, 16 23 C 16 23, 16 23, 16 23 C 16 23, 16 22, 16 22 L 17 18 L 13 15 C 13 15, 13 15, 13 15 C 13 14, 14 14, 14 14 L 18 14 L 20 10 Z M 36 5 C 34 5, 33 6, 33 8 L 33 17 C 33 19, 32 21, 31 23 L 32 23 C 36 23, 40 20, 40 16 L 40 5 L 36 5 Z M 1 5 L 1 16 C 1 20, 5 23, 9 23 L 10 23 C 9 21, 8 19, 8 17 L 8 8 C 8 6, 7 5, 5 5 L 1 5 Z M 10 1 L 10 5 L 28 5 C 28 5, 29 5, 29 6 C 29 6, 28 6, 28 6 L 10 6 L 10 17 C 10 22, 13 26, 17 28 C 18 28, 18 28, 18 28 L 18 31 L 23 31 L 23 28 C 23 28, 23 28, 24 28 C 28 26, 31 22, 31 17 L 31 1 L 10 1 Z M 7 0 L 34 0 C 34 0, 34 0, 34 1 C 34 1, 34 1, 34 1 L 33 1 L 33 5 C 34 4, 35 3, 36 3 L 40 3 C 41 3, 41 4, 41 4 L 41 16 C 41 20, 37 24, 32 24 L 30 24 C 29 26, 27 28, 24 29 L 24 31 L 25 31 C 26 31, 26 32, 26 32 C 26 32, 26 33, 25 33 L 24 33 L 24 35 L 27 35 C 30 35, 33 37, 33 40 C 33 41, 32 41, 32 41 L 9 41 C 9 41, 8 41, 8 40 C 8 37, 11 35, 14 35 L 17 35 L 17 33 L 16 33 C 15 33, 15 32, 15 32 C 15 32, 15 31, 16 31 L 17 31 L 17 29 C 14 28, 12 26, 11 24 L 9 24 C 4 24, 0 20, 0 16 L 0 4 C 0 4, 0 3, 1 3 L 5 3 C 6 3, 7 4, 8 5 L 8 1 L 7 1 C 7 1, 7 1, 7 1 C 7 0, 7 0, 7 0 Z"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 709,
    "y": 220,
    "width": 40,
    "height": 41,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 39 40 L 1 40 L 1 28 L 5 34 C 5 34, 5 34, 5 34 L 34 34 C 35 34, 35 34, 35 34 L 39 28 L 39 40 Z M 38 26 L 34 33 L 6 33 L 2 26 L 38 26 Z M 7 20 L 7 25 L 2 25 L 7 20 Z M 8 19 L 13 19 L 13 22 C 13 22, 14 23, 14 23 C 14 23, 15 22, 15 22 L 15 13 C 15 13, 14 12, 14 12 L 9 12 L 20 2 L 31 12 L 26 12 C 26 12, 25 13, 25 13 L 25 22 C 25 22, 26 23, 26 23 C 26 23, 27 22, 27 22 L 27 19 L 31 19 L 31 25 L 8 25 L 8 19 Z M 33 20 L 38 25 L 33 25 L 33 20 Z M 40 25 L 32 18 C 32 18, 32 18, 32 18 L 27 18 L 27 14 L 32 14 C 32 14, 33 14, 33 13 C 33 13, 33 13, 33 13 L 20 0 C 20 0, 20 0, 20 0 L 7 13 C 7 13, 7 13, 7 13 C 7 14, 8 14, 8 14 L 13 14 L 13 18 L 8 18 C 8 18, 8 18, 7 18 L 0 25 C 0 25, 0 25, 0 25 L 0 40 C 0 41, 0 41, 1 41 L 39 41 C 40 41, 40 41, 40 40 L 40 25 C 40 25, 40 25, 40 25 Z"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 4,
    "x": 214,
    "y": 411,
    "width": 141,
    "height": 36,
    "text": "Your title 2"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 3,
    "x": 81,
    "y": 452,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 2,
    "x": 214,
    "y": 270,
    "width": 141,
    "height": 36,
    "text": "Your title 3"
  },
  {
    "id": "sp-27",
    "x": 81,
    "y": 311,
    "width": 274,
    "height": 79,
    "text": "MIGSO-PCUBED content and words to be added here as required ."
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 6,
    "x": 282,
    "y": 551,
    "width": 141,
    "height": 36,
    "text": "Your title 1"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 5,
    "x": 149,
    "y": 592,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 0,
    "x": 282,
    "y": 129,
    "width": 141,
    "height": 36,
    "text": "Your title 4"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 0,
    "x": 149,
    "y": 170,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 7,
    "x": 853,
    "y": 551,
    "width": 141,
    "height": 36,
    "text": "Your title 8"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 6,
    "x": 857,
    "y": 592,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 1,
    "x": 853,
    "y": 129,
    "width": 141,
    "height": 36,
    "text": "Your title 5"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 1,
    "x": 857,
    "y": 170,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 5,
    "x": 924,
    "y": 411,
    "width": 141,
    "height": 36,
    "text": "Your title 7"
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 4,
    "x": 927,
    "y": 452,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 3,
    "x": 924,
    "y": 270,
    "width": 141,
    "height": 36,
    "text": "Your title 6"
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 2,
    "x": 927,
    "y": 311,
    "width": 274,
    "height": 51,
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

export function Migso60Template({ data }: { data: BrainData }): ReactElement {
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
