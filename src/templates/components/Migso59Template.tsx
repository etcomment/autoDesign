import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 494,
    "y": 134,
    "width": 235,
    "height": 188,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 196 0 L 235 108 L 153 188 L 157 168 L 155 168 C 152 168, 149 168, 146 168 C 128 168, 111 173, 97 182 L 96 183 L 87 93 L 1 64 L 0 63 L 2 61 C 42 31, 92 13, 146 13 C 158 13, 170 14, 182 16 L 192 18 Z"
  },
  {
    "id": "sp-1",
    "x": 664,
    "y": 155,
    "width": 205,
    "height": 211,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 34 0 L 36 0 C 101 17, 155 61, 187 119 L 188 121 L 205 113 L 145 211 L 32 197 L 49 188 L 47 185 C 36 169, 20 156, 1 150 L 0 150 L 65 87 L 34 0 Z"
  },
  {
    "id": "sp-2",
    "x": 400,
    "y": 191,
    "width": 193,
    "height": 192,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 73 0 L 182 36 L 193 150 L 181 135 L 179 136 C 166 150, 156 168, 154 188 L 154 192 L 77 142 L 0 191 L 0 185 C 3 119, 33 61, 79 19 L 84 15 Z"
  },
  {
    "id": "sp-3",
    "x": 703,
    "y": 288,
    "width": 177,
    "height": 219,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 155 0 L 158 6 C 170 35, 177 67, 177 100 C 177 133, 170 165, 158 194 L 157 196 L 173 204 L 60 219 L 0 121 L 18 130 L 20 126 C 22 118, 24 109, 24 100 C 24 91, 22 82, 20 74 L 17 67 L 17 67 L 107 78 L 154 1 Z"
  },
  {
    "id": "sp-4",
    "x": 380,
    "y": 333,
    "width": 202,
    "height": 240,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 96 0 L 193 62 L 174 62 L 174 64 C 176 84, 185 103, 199 116 L 202 119 L 115 149 L 106 240 L 106 240 L 98 233 C 53 192, 23 133, 20 68 L 20 62 L 0 62 Z"
  },
  {
    "id": "sp-5",
    "x": 624,
    "y": 430,
    "width": 231,
    "height": 209,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 92 0 L 139 77 L 229 65 L 231 66 L 228 72 C 198 127, 148 168, 88 187 L 78 190 L 82 209 L 0 129 L 40 21 L 44 40 L 49 38 C 65 32, 78 20, 88 6 Z"
  },
  {
    "id": "sp-6",
    "x": 484,
    "y": 444,
    "width": 205,
    "height": 184,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 119 0 L 107 15 L 113 18 C 125 26, 140 30, 156 30 C 159 30, 162 30, 165 29 L 170 29 L 171 30 L 140 115 L 205 179 L 205 179 L 204 179 C 189 182, 172 184, 156 184 C 102 184, 52 166, 12 136 L 12 136 L 0 151 L 11 37 Z"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 5,
    "x": 448,
    "y": 343,
    "width": 52,
    "height": 45,
    "text": "2"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 0,
    "x": 530,
    "y": 224,
    "width": 52,
    "height": 45,
    "text": "3"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 2,
    "x": 670,
    "y": 211,
    "width": 52,
    "height": 45,
    "text": "4"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 6,
    "x": 768,
    "y": 319,
    "width": 52,
    "height": 45,
    "text": "5"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 10,
    "x": 747,
    "y": 459,
    "width": 52,
    "height": 45,
    "text": "6"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 12,
    "x": 630,
    "y": 531,
    "width": 52,
    "height": 45,
    "text": "7"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 9,
    "x": 490,
    "y": 477,
    "width": 52,
    "height": 45,
    "text": "1"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 601,
    "y": 196,
    "width": 49,
    "height": 49,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 22 44 C 22 43, 23 43, 23 44 C 23 44, 23 44, 23 44 C 23 44, 23 45, 23 45 C 23 45, 23 45, 23 45 C 22 45, 22 45, 22 45 C 22 45, 22 44, 22 44 C 22 44, 22 44, 22 44 Z M 8 44 C 9 43, 9 43, 9 44 C 10 44, 10 44, 10 44 C 10 44, 10 45, 9 45 C 9 45, 9 45, 9 45 C 9 45, 8 45, 8 45 C 8 45, 8 44, 8 44 C 8 44, 8 44, 8 44 Z M 33 43 L 38 43 C 39 43, 39 44, 39 44 C 39 45, 39 45, 38 45 L 33 45 C 33 45, 33 45, 33 44 C 33 44, 33 43, 33 43 Z M 16 43 C 16 43, 17 44, 17 44 C 17 45, 16 45, 16 45 C 15 45, 15 45, 15 44 C 15 44, 15 43, 16 43 Z M 1 40 L 1 43 C 1 46, 3 48, 6 48 L 25 48 C 28 48, 30 46, 30 43 L 30 40 C 29 41, 28 41, 27 41 L 4 41 C 3 41, 2 41, 1 40 Z M 36 24 C 37 24, 37 24, 37 24 C 37 25, 37 25, 36 25 C 36 25, 36 25, 36 24 C 36 24, 36 24, 36 24 Z M 25 24 C 25 24, 25 24, 25 24 C 25 25, 25 25, 25 25 C 24 25, 24 25, 24 24 C 24 24, 24 24, 25 24 Z M 11 18 C 11 18, 12 18, 12 18 L 12 21 L 18 21 C 18 21, 18 21, 18 21 C 18 22, 18 22, 18 22 L 11 22 C 10 22, 10 22, 10 21 L 10 20 L 6 24 L 10 28 L 10 27 C 10 27, 10 27, 11 27 L 18 27 C 18 27, 18 27, 18 27 C 18 28, 18 28, 18 28 L 12 28 L 12 30 C 12 31, 11 31, 11 31 C 11 31, 11 31, 11 31 C 11 31, 10 31, 10 31 L 4 25 C 4 25, 4 24, 4 24 L 10 18 C 10 18, 11 18, 11 18 Z M 30 17 C 31 17, 31 18, 31 18 L 31 19 C 32 19, 33 20, 34 21 C 34 21, 34 21, 33 22 C 33 22, 33 22, 32 21 C 32 21, 31 20, 30 20 C 29 20, 28 21, 28 22 C 28 23, 29 24, 30 24 C 33 24, 34 25, 34 27 C 34 28, 33 30, 31 30 L 31 31 C 31 31, 31 32, 30 32 C 30 32, 30 31, 30 31 L 30 30 C 28 30, 27 29, 27 28 C 27 28, 27 27, 27 27 C 28 27, 28 27, 28 27 C 29 28, 30 29, 30 29 C 32 29, 32 28, 32 27 C 32 26, 32 25, 30 25 C 28 25, 27 23, 27 22 C 27 20, 28 19, 30 19 L 30 18 C 30 18, 30 17, 30 17 Z M 30 15 C 25 15, 21 19, 21 25 C 21 30, 25 34, 30 34 C 35 34, 39 30, 39 25 C 39 19, 35 15, 30 15 Z M 4 9 C 2 9, 1 10, 1 12 L 1 37 C 1 39, 2 40, 4 40 L 27 40 C 29 40, 30 39, 30 37 L 30 35 C 24 35, 20 30, 20 25 C 20 19, 24 14, 30 14 L 30 12 C 30 10, 29 9, 27 9 L 4 9 Z M 33 4 L 38 4 C 39 4, 39 4, 39 5 C 39 5, 39 5, 38 5 L 33 5 C 33 5, 33 5, 33 5 C 33 4, 33 4, 33 4 Z M 16 4 C 16 4, 17 4, 17 5 C 17 5, 16 5, 16 5 C 15 5, 15 5, 15 5 C 15 4, 15 4, 16 4 Z M 6 1 C 3 1, 1 3, 1 6 L 1 9 C 2 8, 3 8, 4 8 L 27 8 C 28 8, 29 8, 30 9 L 30 6 C 30 3, 28 1, 25 1 L 6 1 Z M 32 0 L 47 0 C 48 0, 49 1, 49 2 L 49 47 C 49 48, 48 49, 47 49 L 32 49 C 31 49, 31 49, 31 48 C 31 48, 31 48, 32 48 L 47 48 C 47 48, 48 47, 48 47 L 48 41 L 33 41 C 33 41, 33 41, 33 40 C 33 40, 33 40, 33 40 L 48 40 L 48 9 L 33 9 C 33 9, 33 9, 33 9 C 33 8, 33 8, 33 8 L 48 8 L 48 2 C 48 2, 47 1, 47 1 L 32 1 C 31 1, 31 1, 31 1 C 31 0, 31 0, 32 0 Z M 6 0 L 25 0 C 29 0, 31 3, 31 6 L 31 14 C 37 14, 41 19, 41 25 C 41 30, 37 35, 31 35 L 31 43 C 31 46, 29 49, 25 49 L 6 49 C 3 49, 0 46, 0 43 L 0 6 C 0 3, 3 0, 6 0 Z"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 3,
    "x": 485,
    "y": 264,
    "width": 45,
    "height": 49,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 26 19 C 26 19, 27 20, 27 20 C 27 21, 26 21, 26 21 C 25 21, 25 21, 25 20 C 25 20, 25 19, 26 19 Z M 14 19 C 15 19, 15 20, 15 20 C 15 21, 15 21, 14 21 C 14 21, 13 21, 13 20 C 13 20, 14 19, 14 19 Z M 26 13 C 26 13, 27 13, 27 13 C 31 17, 31 23, 27 27 C 27 27, 27 27, 26 27 C 26 27, 26 27, 26 27 C 26 26, 26 26, 26 26 C 29 23, 29 17, 26 14 C 26 14, 26 13, 26 13 Z M 13 13 C 14 13, 14 13, 14 13 C 15 13, 15 14, 14 14 C 11 17, 11 23, 14 26 C 15 26, 15 26, 14 27 C 14 27, 14 27, 14 27 C 14 27, 13 27, 13 27 C 10 23, 10 17, 13 13 Z M 20 12 C 20 12, 21 13, 21 13 L 21 14 C 22 14, 23 15, 24 16 C 24 16, 23 17, 23 17 C 23 17, 22 17, 22 17 C 22 16, 21 15, 20 15 C 19 15, 18 16, 18 17 C 18 19, 19 19, 20 19 C 23 19, 24 21, 24 23 C 24 24, 22 26, 21 26 L 21 27 C 21 27, 20 28, 20 28 C 20 28, 19 27, 19 27 L 19 26 C 18 26, 17 25, 17 24 C 16 24, 17 23, 17 23 C 17 23, 18 23, 18 23 C 18 24, 19 25, 20 25 C 21 25, 22 24, 22 23 C 22 21, 21 21, 20 21 C 17 21, 16 19, 16 17 C 16 16, 18 14, 19 14 L 19 13 C 19 13, 20 12, 20 12 Z M 20 7 C 13 7, 8 13, 8 20 C 8 27, 13 32, 20 32 C 22 32, 24 32, 26 31 C 26 31, 26 31, 27 31 C 27 31, 27 31, 27 31 L 33 35 L 33 20 C 33 13, 27 7, 20 7 Z M 20 6 C 28 6, 34 12, 34 20 L 34 36 C 34 36, 34 37, 34 37 C 34 37, 34 37, 33 37 C 33 37, 33 37, 33 37 L 27 32 C 25 33, 22 34, 20 34 C 12 34, 6 28, 6 20 C 6 12, 12 6, 20 6 Z M 20 0 C 31 0, 40 9, 40 20 C 40 20, 41 23, 44 27 C 44 27, 45 28, 45 29 C 45 30, 45 31, 44 31 C 42 32, 41 33, 40 33 C 40 34, 40 38, 40 40 C 39 43, 35 43, 32 43 C 32 43, 30 43, 30 45 L 30 48 C 30 49, 30 49, 30 49 C 29 49, 29 49, 29 48 L 29 45 C 29 43, 30 42, 32 42 C 36 42, 38 41, 38 40 C 39 37, 38 33, 38 33 C 38 32, 39 32, 39 32 C 39 32, 41 31, 43 30 C 43 30, 44 29, 44 29 C 44 29, 43 28, 43 28 C 39 23, 39 20, 39 20 C 39 20, 39 20, 39 20 C 39 10, 30 1, 20 1 C 10 1, 1 10, 1 20 C 1 23, 2 27, 4 29 L 4 29 C 4 30, 5 31, 6 33 C 7 34, 8 36, 9 38 C 10 41, 10 48, 10 48 C 10 49, 10 49, 10 49 C 9 49, 9 49, 9 48 C 9 48, 9 41, 7 38 C 7 37, 6 35, 5 33 C 4 32, 3 31, 3 30 L 3 30 C 1 27, 0 24, 0 20 C 0 9, 9 0, 20 0 Z"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 11,
    "x": 549,
    "y": 513,
    "width": 49,
    "height": 49,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 42 42 C 43 42, 43 43, 43 43 C 42 44, 42 44, 42 43 C 41 43, 41 43, 41 43 C 42 42, 42 42, 42 42 Z M 18 41 C 18 40, 19 40, 19 41 C 19 41, 19 42, 19 42 L 18 42 C 17 43, 17 45, 18 46 C 19 46, 21 46, 21 46 C 22 45, 22 45, 22 46 C 23 46, 23 46, 22 47 C 22 47, 21 48, 20 48 C 19 48, 18 47, 17 47 C 16 45, 16 43, 17 41 L 18 41 Z M 39 38 C 40 39, 40 39, 40 39 C 39 40, 39 40, 39 40 C 38 39, 38 39, 38 39 C 39 38, 39 38, 39 38 Z M 14 37 C 14 37, 15 37, 15 37 C 16 38, 16 38, 15 38 L 9 44 C 9 45, 9 45, 9 45 C 8 45, 8 45, 8 44 C 8 44, 8 44, 8 43 L 14 37 Z M 11 34 C 11 33, 11 33, 12 34 C 12 34, 12 35, 12 35 L 3 44 C 3 44, 2 44, 2 44 C 2 44, 2 44, 2 44 C 1 43, 1 43, 2 43 L 11 34 Z M 47 32 C 47 32, 47 33, 47 33 C 47 34, 46 34, 46 34 C 45 33, 45 33, 46 32 C 46 32, 46 32, 47 32 Z M 1 28 C 1 28, 2 28, 2 28 C 2 28, 2 29, 2 29 C 2 29, 2 30, 2 31 C 2 31, 2 32, 2 32 C 3 33, 4 33, 5 32 L 7 30 C 8 30, 8 30, 8 30 C 9 30, 9 31, 8 31 L 6 33 C 6 34, 5 34, 4 34 C 3 34, 2 34, 1 33 C 0 32, 0 32, 0 31 C 0 30, 0 29, 1 28 Z M 14 26 L 10 27 L 22 39 L 23 35 L 19 30 L 14 26 Z M 46 24 C 46 24, 46 25, 46 25 C 46 26, 45 26, 45 25 C 45 25, 45 25, 45 25 C 45 24, 45 24, 46 24 Z M 21 21 L 16 25 L 20 29 L 24 33 L 28 28 L 24 26 C 23 26, 23 26, 23 25 L 21 21 Z M 26 18 L 22 20 L 24 25 L 29 27 L 31 23 L 28 22 C 27 22, 27 22, 27 21 L 26 18 Z M 30 15 L 27 17 L 29 21 L 32 22 L 34 19 L 32 18 C 32 18, 31 17, 31 17 L 30 15 Z M 47 13 C 48 13, 48 14, 48 14 C 47 14, 47 15, 46 14 C 46 14, 46 14, 46 13 C 46 13, 47 13, 47 13 Z M 41 13 L 25 35 L 30 46 L 43 13 L 41 13 Z M 4 11 C 5 11, 5 12, 5 12 C 5 12, 5 13, 4 13 C 4 13, 3 12, 3 12 C 3 12, 4 11, 4 11 Z M 37 10 L 31 14 L 33 16 L 35 18 L 39 12 L 38 11 C 38 11, 38 11, 38 11 L 37 10 Z M 36 6 L 3 19 L 14 24 L 36 8 L 36 6 Z M 18 5 C 19 5, 19 6, 19 6 C 19 7, 19 7, 18 7 C 18 7, 17 7, 17 6 C 17 6, 18 5, 18 5 Z M 9 3 C 10 3, 10 4, 10 4 C 10 5, 10 5, 9 5 C 9 5, 9 5, 9 4 C 9 4, 9 3, 9 3 Z M 47 2 L 37 6 L 39 10 L 43 12 L 47 2 Z M 24 1 C 25 1, 25 2, 25 2 C 25 3, 25 3, 24 3 C 24 3, 23 3, 23 2 C 23 2, 24 1, 24 1 Z M 48 0 C 48 0, 49 0, 49 0 C 49 0, 49 1, 49 1 L 30 49 C 30 49, 30 49, 30 49 C 29 49, 29 49, 29 49 L 24 37 L 23 41 C 23 41, 22 41, 22 41 L 22 41 C 22 41, 22 41, 22 41 L 8 27 C 8 27, 7 27, 8 27 C 8 26, 8 26, 8 26 L 12 25 L 0 20 C 0 20, 0 20, 0 19 C 0 19, 0 19, 0 19 L 48 0 Z"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 4,
    "x": 738,
    "y": 252,
    "width": 49,
    "height": 49,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 12 38 L 12 42 L 16 42 L 16 38 L 12 38 Z M 22 33 L 22 42 L 26 42 L 26 33 L 22 33 Z M 44 24 C 44 25, 43 26, 42 27 L 45 30 C 45 30, 46 30, 47 30 C 48 29, 48 28, 47 27 L 44 24 Z M 30 22 L 28 25 C 28 25, 27 25, 27 25 L 22 23 L 18 28 C 17 28, 17 28, 17 28 L 13 26 L 7 32 L 7 42 L 11 42 L 11 37 C 11 37, 11 36, 11 36 L 16 36 C 17 36, 17 37, 17 37 L 17 42 L 21 42 L 21 32 C 21 32, 21 31, 21 31 L 26 31 C 27 31, 27 32, 27 32 L 27 42 L 30 42 L 30 27 C 30 27, 31 27, 31 27 C 32 27, 32 27, 32 27 L 32 42 L 35 42 L 35 28 C 33 27, 31 25, 30 22 Z M 11 17 L 23 17 C 23 17, 23 17, 23 18 C 23 18, 23 19, 23 19 L 11 19 C 11 19, 10 18, 10 18 C 10 17, 11 17, 11 17 Z M 38 16 C 38 16, 39 17, 39 17 C 39 18, 38 18, 38 18 C 36 18, 35 19, 35 21 C 35 21, 35 21, 34 21 C 34 21, 34 21, 34 21 C 34 18, 35 16, 38 16 Z M 38 14 C 34 14, 32 17, 32 20 C 32 24, 34 27, 38 27 C 41 27, 44 24, 44 20 C 44 17, 41 14, 38 14 Z M 21 12 L 28 12 C 28 12, 28 13, 28 13 C 28 14, 28 14, 28 14 L 21 14 C 20 14, 20 14, 20 13 C 20 13, 20 12, 21 12 Z M 11 12 L 17 12 C 17 12, 18 13, 18 13 C 18 14, 17 14, 17 14 L 11 14 C 11 14, 10 14, 10 13 C 10 13, 11 12, 11 12 Z M 12 2 C 13 3, 14 4, 14 6 L 47 6 C 47 4, 45 2, 42 2 L 12 2 Z M 7 2 C 4 2, 2 4, 2 7 L 2 48 L 41 48 L 41 28 L 40 28 C 40 28, 39 28, 38 28 C 37 28, 37 28, 37 28 L 37 43 C 37 43, 37 43, 36 43 L 6 43 C 6 43, 6 43, 6 43 L 6 13 C 6 12, 6 12, 6 12 C 7 12, 7 12, 7 13 L 7 30 L 13 25 C 13 25, 13 25, 14 25 L 17 26 L 21 22 C 22 22, 22 22, 22 22 L 27 24 L 30 20 C 30 16, 34 13, 38 13 C 39 13, 40 13, 41 14 L 41 8 L 14 8 C 13 8, 13 8, 13 7 C 13 4, 10 2, 7 2 Z M 7 0 L 42 0 C 46 0, 49 3, 49 7 C 49 8, 49 8, 48 8 L 43 8 L 43 15 C 44 16, 45 18, 45 20 C 45 21, 45 22, 45 23 L 48 26 C 49 27, 49 29, 48 31 C 47 31, 47 32, 46 32 C 45 32, 44 31, 43 31 L 43 30 L 43 48 C 43 49, 42 49, 42 49 L 1 49 C 0 49, 0 49, 0 48 L 0 7 C 0 3, 3 0, 7 0 Z"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 13,
    "x": 697,
    "y": 507,
    "width": 49,
    "height": 49,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 37 36 C 36 38, 34 39, 32 39 C 29 39, 27 38, 27 37 C 26 37, 26 37, 25 37 C 24 37, 24 37, 23 38 C 22 38, 21 39, 21 40 L 21 41 C 24 43, 27 45, 31 45 L 31 44 C 31 43, 31 43, 32 43 C 32 43, 32 43, 32 44 L 32 45 C 36 45, 40 43, 42 41 L 42 40 C 42 39, 41 38, 40 38 C 40 37, 39 37, 38 37 C 38 37, 37 37, 37 36 Z M 30 34 C 29 35, 29 35, 28 36 C 28 37, 30 38, 32 38 C 34 38, 35 37, 35 36 C 35 35, 34 35, 34 34 C 33 34, 32 34, 32 34 C 31 34, 30 34, 30 34 Z M 32 24 C 29 24, 28 25, 28 28 C 28 31, 29 33, 32 33 C 34 33, 36 31, 36 28 C 36 25, 34 24, 32 24 Z M 31 18 C 24 18, 18 24, 18 31 L 19 31 C 20 31, 20 31, 20 32 C 20 32, 20 32, 19 32 L 18 32 C 18 35, 19 37, 20 39 C 20 38, 21 37, 22 36 C 23 36, 24 36, 25 35 C 25 35, 26 35, 26 35 C 27 35, 28 34, 28 33 C 28 33, 28 33, 28 33 C 27 32, 26 30, 26 28 C 26 24, 28 22, 32 22 C 35 22, 37 24, 37 28 C 37 30, 36 32, 35 33 C 35 33, 35 33, 35 33 C 35 34, 36 35, 37 35 C 37 35, 38 35, 38 35 C 39 36, 40 36, 41 36 C 42 37, 43 38, 43 39 C 44 37, 45 35, 45 32 L 44 32 C 43 32, 43 32, 43 32 C 43 31, 43 31, 44 31 L 45 31 C 45 24, 39 18, 32 18 L 32 19 C 32 20, 32 20, 32 20 C 31 20, 31 20, 31 19 L 31 18 Z M 32 14 C 32 14, 32 15, 32 15 L 32 16 C 40 17, 46 23, 47 31 L 48 31 C 49 31, 49 31, 49 32 C 49 32, 49 32, 48 32 L 47 32 C 46 40, 40 46, 32 47 L 32 48 C 32 49, 32 49, 32 49 C 31 49, 31 49, 31 48 L 31 47 C 23 46, 17 40, 16 32 L 15 32 C 15 32, 14 32, 14 32 C 14 31, 15 31, 15 31 L 16 31 C 17 23, 23 17, 31 16 L 31 15 C 31 15, 31 14, 32 14 Z M 17 9 C 15 9, 13 11, 13 14 C 13 16, 15 19, 17 19 C 20 19, 21 16, 21 14 C 21 11, 20 9, 17 9 Z M 17 0 C 18 0, 18 0, 18 1 L 18 2 C 24 3, 29 6, 31 11 C 31 11, 31 12, 31 12 C 31 12, 30 12, 30 12 C 28 7, 23 4, 18 4 L 18 5 C 18 6, 18 6, 17 6 C 17 6, 17 6, 17 5 L 17 4 C 10 4, 4 10, 4 17 L 5 17 C 6 17, 6 17, 6 17 C 6 18, 6 18, 5 18 L 4 18 C 4 20, 5 23, 6 25 C 6 24, 7 23, 8 22 C 9 22, 10 21, 11 21 C 11 21, 12 21, 12 21 C 13 20, 14 20, 14 19 C 14 19, 14 19, 14 19 C 13 18, 12 16, 12 14 C 12 10, 14 8, 17 8 C 21 8, 23 10, 23 14 C 23 17, 20 20, 17 20 C 17 20, 16 20, 15 20 C 15 20, 14 21, 14 22 C 14 22, 15 23, 16 24 C 17 24, 17 24, 17 24 C 17 25, 16 25, 16 25 C 16 25, 16 25, 16 25 C 14 25, 13 24, 12 22 C 12 22, 12 22, 11 22 C 10 23, 9 23, 9 23 C 8 24, 7 25, 7 26 L 7 26 C 8 28, 10 29, 12 30 C 12 30, 12 30, 12 31 C 12 31, 12 31, 11 31 C 11 31, 11 31, 11 31 C 6 29, 3 24, 2 18 L 1 18 C 0 18, 0 18, 0 17 C 0 17, 0 17, 1 17 L 2 17 C 3 9, 9 3, 17 2 L 17 1 C 17 0, 17 0, 17 0 Z"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 8,
    "x": 777,
    "y": 387,
    "width": 49,
    "height": 49,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 32 43 C 32 43, 32 43, 32 44 L 32 48 C 32 49, 32 49, 32 49 C 31 49, 31 49, 31 48 L 31 44 C 31 43, 31 43, 32 43 Z M 8 43 C 8 43, 9 43, 9 44 L 9 48 C 9 49, 8 49, 8 49 C 8 49, 7 49, 7 48 L 7 44 C 7 43, 8 43, 8 43 Z M 25 35 L 21 38 L 24 41 L 27 36 C 26 36, 26 36, 25 35 Z M 14 35 C 14 36, 13 36, 12 36 L 15 41 L 18 38 L 14 35 Z M 16 32 L 15 33 C 15 33, 15 33, 15 34 L 20 37 L 24 34 C 24 33, 24 33, 24 33 L 24 32 C 22 32, 21 33, 20 33 C 18 33, 17 32, 16 32 Z M 20 13 C 16 13, 14 14, 13 16 C 14 17, 18 19, 25 17 C 25 17, 25 17, 25 17 C 26 18, 25 18, 25 18 C 23 19, 21 19, 19 19 C 16 19, 13 18, 12 17 C 12 19, 11 20, 11 21 C 11 27, 15 31, 20 31 C 24 31, 28 27, 28 21 C 28 16, 25 13, 20 13 Z M 30 10 C 28 10, 26 11, 24 12 C 28 14, 29 17, 29 21 C 29 23, 29 25, 28 27 C 29 27, 30 27, 30 27 C 35 27, 39 23, 39 18 C 39 14, 35 10, 30 10 Z M 30 8 C 36 8, 40 13, 40 18 C 40 24, 36 29, 30 29 C 29 29, 28 28, 27 28 C 27 29, 26 30, 25 31 L 25 32 C 26 34, 27 35, 28 35 L 33 36 C 37 37, 39 39, 39 43 L 39 48 C 39 49, 39 49, 38 49 C 38 49, 38 49, 38 48 L 38 43 C 38 40, 36 38, 33 37 L 29 37 L 25 42 C 25 42, 25 42, 24 42 C 24 42, 24 42, 24 42 C 24 42, 24 42, 24 42 L 20 39 L 20 48 C 20 49, 20 49, 20 49 C 19 49, 19 49, 19 48 L 19 39 L 16 42 C 15 42, 15 42, 15 42 C 15 42, 15 42, 15 42 C 15 42, 15 42, 14 42 L 11 37 L 6 37 C 3 38, 1 40, 1 43 L 1 48 C 1 49, 1 49, 1 49 C 0 49, 0 49, 0 48 L 0 43 C 0 39, 2 37, 6 36 L 11 35 C 12 35, 14 34, 14 32 L 14 31 C 12 29, 10 25, 10 21 C 10 15, 14 11, 20 11 C 21 11, 22 11, 23 12 C 25 10, 27 8, 30 8 Z M 29 0 L 32 0 C 33 0, 33 1, 33 2 L 33 3 C 34 4, 35 4, 36 4 L 36 2 C 37 2, 38 1, 39 2 L 41 3 C 41 3, 42 4, 42 4 C 42 5, 42 5, 42 5 L 41 7 C 41 7, 42 8, 42 8 L 44 7 C 44 7, 45 7, 46 8 L 47 10 C 48 11, 47 12, 47 13 L 45 14 C 45 14, 45 15, 46 16 L 47 16 C 48 16, 49 16, 49 17 L 49 20 C 49 21, 48 22, 47 22 L 46 22 C 45 22, 45 23, 45 24 L 47 24 C 47 25, 47 25, 47 25 C 47 26, 47 26, 47 27 L 46 29 C 46 29, 45 30, 45 30 C 44 30, 44 30, 44 30 L 42 29 C 42 29, 41 30, 41 30 L 42 32 C 42 32, 42 33, 42 33 C 42 33, 41 34, 41 34 L 39 35 C 38 35, 38 36, 38 36 C 37 36, 37 35, 36 35 L 36 33 C 35 33, 34 34, 33 34 C 32 34, 32 34, 32 33 C 32 33, 32 32, 33 32 C 34 32, 35 32, 36 32 C 36 31, 36 32, 37 32 L 38 34 C 38 34, 38 34, 38 34 L 40 33 C 40 33, 40 33, 40 32 L 39 30 C 39 30, 39 30, 39 29 C 40 29, 41 28, 41 27 C 42 27, 42 27, 42 27 L 44 28 C 44 28, 45 28, 45 28 L 46 26 C 46 26, 46 26, 46 26 L 44 24 C 43 24, 43 24, 43 24 C 44 23, 44 22, 44 21 C 44 20, 45 20, 45 20 L 47 20 C 47 20, 48 20, 48 20 L 48 17 C 48 17, 47 17, 47 17 L 45 17 C 45 17, 44 17, 44 16 C 44 15, 44 14, 43 13 C 43 13, 43 13, 44 13 L 46 11 C 46 11, 46 11, 46 11 L 45 9 C 45 9, 44 9, 44 9 L 42 10 C 42 10, 42 10, 41 10 C 41 9, 40 8, 39 8 C 39 7, 39 7, 39 7 L 40 5 C 40 5, 40 5, 40 5 C 40 5, 40 5, 40 4 L 38 3 C 38 3, 38 3, 38 3 L 37 5 C 36 6, 36 6, 36 6 C 35 5, 34 5, 33 5 C 32 5, 32 4, 32 4 L 32 2 C 32 2, 32 1, 32 1 L 29 1 C 29 1, 29 2, 29 2 L 29 4 C 29 4, 29 5, 28 5 C 27 5, 26 5, 26 6 C 25 6, 25 6, 25 5 L 23 3 C 23 3, 23 3, 23 3 L 21 4 C 21 5, 21 5, 21 5 C 21 5, 21 5, 21 5 L 22 7 C 22 7, 22 7, 22 8 C 21 8, 20 9, 20 10 C 20 10, 19 10, 19 10 L 17 9 C 17 9, 17 9, 16 9 L 16 10 C 16 10, 15 10, 15 10 C 15 10, 14 9, 15 9 L 15 8 C 16 7, 17 7, 17 7 L 19 8 C 19 8, 20 7, 20 7 L 20 5 C 19 5, 19 5, 19 4 C 20 4, 20 3, 20 3 L 22 2 C 23 1, 24 2, 25 2 L 26 4 C 26 4, 27 4, 28 3 L 28 2 C 28 1, 28 0, 29 0 Z"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 7,
    "x": 453,
    "y": 405,
    "width": 49,
    "height": 49,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 20 28 L 20 45 C 20 46, 20 47, 22 47 C 23 47, 24 46, 24 45 L 24 31 C 24 31, 24 31, 24 31 C 25 31, 25 31, 25 31 L 25 39 C 25 40, 26 41, 27 41 C 28 41, 29 40, 29 39 L 29 28 L 20 28 Z M 40 23 C 40 23, 41 23, 41 23 L 49 31 C 49 31, 49 32, 49 32 C 49 32, 49 32, 48 32 L 44 32 L 44 48 C 44 49, 44 49, 43 49 C 43 49, 43 49, 43 48 L 43 32 C 43 31, 43 31, 43 31 L 46 31 L 40 25 L 34 31 L 37 31 C 38 31, 38 31, 38 32 L 38 48 C 38 49, 38 49, 37 49 C 37 49, 36 49, 36 48 L 36 32 L 32 32 C 32 32, 32 32, 32 32 C 32 32, 32 31, 32 31 L 40 23 Z M 24 23 C 25 23, 25 23, 25 24 C 25 24, 25 24, 24 24 C 24 24, 24 24, 24 24 C 24 23, 24 23, 24 23 Z M 24 19 C 25 19, 25 19, 25 20 C 25 20, 25 20, 24 20 C 24 20, 24 20, 24 20 C 24 19, 24 19, 24 19 Z M 24 15 C 25 15, 25 15, 25 16 C 25 16, 25 17, 24 17 C 24 17, 24 16, 24 16 C 24 15, 24 15, 24 15 Z M 8 15 C 8 15, 9 15, 9 15 L 17 23 C 17 23, 17 23, 17 24 C 17 24, 17 24, 16 24 L 13 24 L 13 48 C 13 48, 12 49, 12 49 C 11 49, 11 48, 11 48 L 11 23 C 11 23, 11 23, 12 23 L 15 23 L 9 17 L 3 23 L 6 23 C 6 23, 6 23, 6 23 L 6 48 C 6 48, 6 49, 6 49 C 5 49, 5 48, 5 48 L 5 24 L 1 24 C 0 24, 0 24, 0 24 C 0 23, 0 23, 0 23 L 8 15 Z M 9 3 C 8 3, 8 4, 8 4 C 8 4, 7 4, 7 5 C 7 5, 7 6, 8 6 L 18 16 C 19 17, 20 18, 20 20 L 20 27 L 29 27 L 29 20 C 29 18, 30 17, 30 16 L 41 6 C 41 6, 41 5, 41 5 C 41 4, 41 4, 41 4 C 40 3, 39 3, 39 4 L 32 11 C 31 12, 29 12, 28 12 L 21 12 C 19 12, 18 12, 17 11 L 10 4 C 10 4, 9 3, 9 3 Z M 9 2 C 10 2, 10 2, 11 3 L 18 10 C 19 11, 20 11, 21 11 L 28 11 C 29 11, 30 11, 31 10 L 38 3 C 38 2, 39 2, 40 2 C 40 2, 41 2, 42 3 C 42 3, 43 4, 43 5 C 43 6, 43 6, 42 7 L 32 17 C 31 18, 31 19, 31 20 L 31 39 C 31 41, 29 43, 27 43 C 26 43, 26 43, 25 42 L 25 45 C 25 45, 25 45, 25 45 C 25 47, 24 49, 22 49 C 20 49, 18 47, 18 45 L 18 20 C 18 19, 18 18, 17 17 L 7 7 C 6 6, 6 6, 6 5 C 6 4, 6 3, 7 3 C 8 2, 8 2, 9 2 Z M 24 1 C 23 1, 21 3, 21 5 C 21 6, 23 8, 24 8 C 26 8, 27 6, 27 5 C 27 3, 26 1, 24 1 Z M 24 0 C 27 0, 29 2, 29 5 C 29 7, 27 9, 24 9 C 22 9, 20 7, 20 5 C 20 2, 22 0, 24 0 Z"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 6,
    "x": 276,
    "y": 551,
    "width": 141,
    "height": 36,
    "text": "Your title 1"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 6,
    "x": 143,
    "y": 592,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 0,
    "x": 276,
    "y": 129,
    "width": 141,
    "height": 36,
    "text": "Your title 4"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 0,
    "x": 143,
    "y": 170,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 4,
    "x": 214,
    "y": 411,
    "width": 141,
    "height": 36,
    "text": "Your title 2"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 4,
    "x": 81,
    "y": 452,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 2,
    "x": 214,
    "y": 270,
    "width": 141,
    "height": 36,
    "text": "Your title 3"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 2,
    "x": 81,
    "y": 311,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 1,
    "x": 878,
    "y": 165,
    "width": 141,
    "height": 36,
    "text": "Your title 5"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 1,
    "x": 882,
    "y": 206,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 5,
    "x": 878,
    "y": 515,
    "width": 141,
    "height": 36,
    "text": "Your title 7"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 5,
    "x": 882,
    "y": 556,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 3,
    "x": 921,
    "y": 340,
    "width": 141,
    "height": 36,
    "text": "Your title 6"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 3,
    "x": 925,
    "y": 381,
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

export function Migso59Template({ data }: { data: BrainData }): ReactElement {
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
