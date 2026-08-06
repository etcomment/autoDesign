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
    "x": 316,
    "y": 212,
    "width": 244,
    "height": 244,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 176 197 L 176 197 C 174 196, 173 195, 171 194 L 171 194 C 164 192, 157 188, 154 185 L 154 185 C 150 181, 148 176, 149 171 L 149 171 C 149 166, 152 161, 156 156 L 156 156 C 160 152, 165 149, 170 149 L 170 149 C 176 148, 180 150, 185 154 L 185 154 C 188 157, 191 162, 193 169 L 193 169 C 193 170, 194 171, 194 172 L 194 172 C 194 172, 194 172, 194 173 L 194 173 C 195 174, 196 175, 197 176 L 235 138 L 235 138 C 235 138, 236 137, 236 137 L 236 137 C 244 128, 243 114, 235 106 L 197 68 L 197 68 C 198 67, 199 66, 201 65 L 201 65 C 201 65, 201 65, 202 65 L 202 65 C 203 64, 204 64, 205 64 L 205 64 C 211 61, 216 58, 219 55 L 219 55 C 223 51, 225 46, 225 41 L 225 41 C 224 36, 221 31, 217 27 L 217 27 C 213 23, 208 20, 203 19 L 203 19 C 198 19, 193 21, 189 25 L 189 25 C 185 28, 181 35, 179 42 L 179 42 C 178 44, 177 45, 176 46 L 138 9 L 138 9 C 129 0, 115 0, 106 9 L 9 106 L 9 106 C 0 115, 0 129, 9 138 L 106 235 L 106 235 C 114 243, 128 244, 137 236 L 137 236 C 137 236, 138 235, 138 235 L 176 197"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 445,
    "y": 342,
    "width": 244,
    "height": 244,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 195 72 L 195 72 C 192 80, 189 86, 185 90 L 185 90 C 181 94, 176 96, 171 95 L 171 95 C 166 95, 161 92, 157 88 L 157 88 C 152 83, 150 78, 149 73 L 149 73 C 148 68, 150 63, 154 59 L 154 59 C 157 56, 163 53, 169 51 L 169 51 C 170 50, 171 50, 172 50 L 172 50 C 172 50, 173 49, 173 49 L 173 49 C 174 49, 175 48, 176 47 L 138 9 L 138 9 C 130 0, 116 0, 107 7 L 107 7 C 107 8, 106 8, 106 9 L 68 47 L 68 47 C 67 46, 66 44, 65 43 L 65 43 C 65 43, 65 43, 65 42 L 65 42 C 64 41, 64 40, 64 39 L 64 39 C 61 33, 58 28, 55 25 L 55 25 C 51 21, 46 19, 41 19 L 41 19 C 36 20, 31 22, 27 27 L 27 27 C 23 31, 20 36, 19 41 L 19 41 C 19 46, 21 51, 25 55 L 25 55 C 28 59, 35 62, 42 65 L 42 65 C 44 65, 45 67, 46 68 L 9 105 L 9 105 C 9 106, 8 106, 8 107 L 8 107 C 0 116, 0 130, 9 138 L 106 235 L 106 235 C 115 244, 129 244, 138 235 L 235 138 L 235 138 C 244 129, 244 114, 235 105 L 198 68 L 198 68 C 196 69, 195 71, 195 72"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 575,
    "y": 212,
    "width": 244,
    "height": 244,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 176 196 L 176 196 C 175 195, 173 193, 172 193 L 172 193 C 164 190, 158 187, 155 183 L 155 183 C 150 179, 149 174, 149 169 L 149 169 C 150 164, 152 159, 157 155 L 157 155 C 161 150, 166 148, 171 147 L 171 147 C 176 147, 181 149, 185 153 L 185 153 C 188 156, 191 161, 194 167 L 194 167 C 194 168, 194 169, 195 170 L 195 170 C 195 170, 195 171, 195 171 L 195 171 C 196 172, 197 174, 198 175 L 235 137 L 235 137 C 236 136, 237 135, 238 134 L 238 134 C 244 126, 243 113, 235 106 L 139 9 L 139 9 C 129 0, 115 0, 106 9 L 9 106 L 9 106 C 0 115, 0 129, 9 138 L 47 176 L 47 176 C 47 176, 47 176, 47 176 L 47 176 C 46 177, 45 178, 43 179 L 43 179 C 43 179, 43 179, 42 179 L 42 179 C 41 180, 40 180, 40 180 L 40 180 C 33 183, 28 186, 25 189 L 25 189 C 21 193, 19 198, 19 203 L 19 203 C 20 208, 23 213, 27 217 L 27 217 C 31 221, 36 224, 41 225 L 41 225 C 46 225, 51 223, 55 219 L 55 219 C 59 216, 63 209, 65 202 L 65 202 C 65 200, 67 199, 68 198 L 68 198 C 68 198, 68 198, 68 198 L 106 235 L 106 235 C 114 243, 127 244, 136 237 L 136 237 C 137 236, 138 235, 139 233 L 176 196"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 705,
    "y": 340,
    "width": 244,
    "height": 244,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 235 105 L 138 9 L 138 9 C 130 1, 117 0, 108 6 L 108 6 C 107 7, 106 8, 105 9 L 68 47 L 68 47 C 67 46, 66 44, 65 43 L 65 43 C 65 43, 65 42, 65 42 L 65 42 C 64 41, 64 40, 64 39 L 64 39 C 61 33, 58 28, 55 25 L 55 25 C 51 21, 46 19, 41 19 L 41 19 C 36 20, 31 22, 27 27 L 27 27 C 22 31, 20 36, 19 41 L 19 41 C 19 46, 21 51, 25 55 L 25 55 C 28 59, 35 62, 42 65 L 42 65 C 43 65, 45 67, 46 68 L 9 105 L 9 105 C 8 107, 7 108, 6 109 L 6 109 C 0 118, 1 131, 9 138 L 105 235 L 105 235 C 114 244, 129 244, 138 235 L 235 138 L 235 138 C 244 129, 244 115, 235 105"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 99,
    "y": 156,
    "width": 22,
    "height": 22,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 22 11 L 22 11 C 22 17, 17 22, 11 22 L 11 22 C 5 22, 0 17, 0 11 L 0 11 C 0 5, 5 0, 11 0 L 11 0 C 17 0, 22 5, 22 11"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 99,
    "y": 506,
    "width": 22,
    "height": 22,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 22 11 L 22 11 C 22 17, 17 22, 11 22 L 11 22 C 5 22, 0 17, 0 11 L 0 11 C 0 5, 5 0, 11 0 L 11 0 C 17 0, 22 5, 22 11"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 953,
    "y": 507,
    "width": 22,
    "height": 22,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 22 11 L 22 11 C 22 17, 17 22, 11 22 L 11 22 C 5 22, 0 17, 0 11 L 0 11 C 0 5, 5 0, 11 0 L 11 0 C 17 0, 22 5, 22 11"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 953,
    "y": 156,
    "width": 22,
    "height": 22,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 22 11 L 22 11 C 22 17, 17 22, 11 22 L 11 22 C 5 22, 0 17, 0 11 L 0 11 C 0 5, 5 0, 11 0 L 11 0 C 17 0, 22 5, 22 11"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 405,
    "y": 297,
    "width": 62,
    "height": 62,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 31 51 L 31 51 C 30 51, 30 51, 30 52 L 30 52 C 30 53, 30 53, 31 53 L 31 53 C 32 53, 32 53, 32 52 L 32 52 C 32 51, 32 51, 31 51 Z M 41 48 L 41 48 C 40 48, 40 49, 40 50 L 40 50 C 41 51, 42 51, 42 50 L 42 50 C 43 50, 43 49, 43 49 L 43 49 C 42 48, 42 48, 41 48 Z M 31 34 L 31 34 C 29 34, 28 33, 28 31 L 28 31 C 28 29, 29 28, 31 28 L 31 28 C 33 28, 34 29, 34 31 L 34 31 C 34 33, 33 34, 31 34 Z M 44 30 L 36 30 L 36 30 C 36 28, 34 26, 32 26 L 32 10 L 32 10 C 32 9, 32 8, 31 8 L 31 8 C 30 8, 30 9, 30 10 L 30 26 L 30 26 C 27 26, 25 28, 25 31 L 25 31 C 25 34, 28 37, 31 37 L 31 37 C 34 37, 36 35, 36 32 L 44 32 L 44 32 C 44 32, 45 32, 45 31 L 45 31 C 45 30, 44 30, 44 30 Z M 31 59 L 31 59 C 15 59, 3 47, 3 31 L 3 31 C 3 15, 15 3, 31 3 L 31 3 C 47 3, 59 15, 59 31 L 59 31 C 59 47, 47 59, 31 59 Z M 31 0 L 31 0 C 14 0, 0 14, 0 31 L 0 31 C 0 48, 14 62, 31 62 L 31 62 C 48 62, 62 48, 62 31 L 62 31 C 62 14, 48 0, 31 0 Z M 50 40 L 50 40 C 49 40, 48 40, 48 41 L 48 41 C 48 41, 48 42, 49 43 L 49 43 C 49 43, 50 43, 51 42 L 51 42 C 51 42, 51 41, 50 40 Z M 52 30 L 52 30 C 51 30, 51 30, 51 31 L 51 31 C 51 32, 51 32, 52 32 L 52 32 C 53 32, 53 32, 53 31 L 53 31 C 53 30, 53 30, 52 30 Z M 49 19 L 49 19 C 48 20, 48 20, 48 21 L 48 21 C 48 22, 49 22, 50 22 L 50 22 C 51 21, 51 20, 51 20 L 51 20 C 50 19, 49 19, 49 19 Z M 12 40 L 12 40 C 11 41, 11 42, 11 42 L 11 42 C 12 43, 13 43, 13 43 L 13 43 C 14 42, 14 41, 14 41 L 14 41 C 14 40, 13 40, 12 40 Z M 10 30 L 10 30 C 9 30, 8 30, 8 31 L 8 31 C 8 32, 9 32, 10 32 L 10 32 C 11 32, 11 32, 11 31 L 11 31 C 11 30, 11 30, 10 30 Z M 41 14 L 41 14 C 42 14, 42 14, 43 13 L 43 13 C 43 13, 43 12, 42 11 L 42 11 C 42 11, 41 11, 40 12 L 40 12 C 40 13, 40 14, 41 14 Z M 13 19 L 13 19 C 13 19, 12 19, 11 20 L 11 20 C 11 20, 11 21, 12 22 L 12 22 C 13 22, 14 22, 14 21 L 14 21 C 14 20, 14 20, 13 19 Z M 21 48 L 21 48 C 20 48, 20 48, 19 49 L 19 49 C 19 49, 19 50, 20 50 L 20 50 C 20 51, 21 51, 22 50 L 22 50 C 22 49, 22 48, 21 48 Z M 20 11 L 20 11 C 19 12, 19 13, 19 13 L 19 13 C 20 14, 20 14, 21 14 L 21 14 C 22 14, 22 13, 22 12 L 22 12 C 21 11, 20 11, 20 11 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 532,
    "y": 441,
    "width": 62,
    "height": 62,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 59 34 L 59 34 C 59 34, 59 34, 59 34 L 56 35 L 56 35 C 55 35, 54 36, 54 37 L 54 37 C 54 39, 53 41, 52 43 L 52 43 C 51 44, 51 45, 52 46 L 53 48 L 48 53 L 48 53 L 48 53 L 46 52 L 46 52 C 45 52, 45 51, 44 51 L 44 51 C 44 51, 43 52, 43 52 L 43 52 C 41 53, 39 54, 37 54 L 37 54 C 36 54, 35 55, 35 56 L 34 59 L 34 59 L 34 59 L 27 59 L 27 56 L 27 56 C 26 55, 26 54, 25 54 L 25 54 C 23 54, 21 53, 19 52 L 19 52 C 18 52, 18 51, 18 51 L 18 51 C 17 51, 17 52, 16 52 L 14 53 L 14 53 L 14 53 L 9 48 L 10 46 L 10 46 C 11 45, 11 44, 10 43 L 10 43 C 9 41, 8 39, 8 37 L 8 37 C 7 36, 7 35, 6 35 L 3 34 L 3 34 C 3 34, 3 34, 3 34 L 3 27 L 6 27 L 6 27 C 7 26, 7 26, 8 25 L 8 25 C 8 23, 9 21, 10 19 L 10 19 C 11 18, 11 17, 10 16 L 9 14 L 9 14 C 9 14, 9 14, 9 14 L 14 9 L 16 10 L 16 10 C 17 10, 17 11, 18 11 L 18 11 C 18 11, 18 10, 19 10 L 19 10 C 21 9, 23 8, 25 8 L 25 8 C 26 8, 26 7, 27 6 L 27 3 L 34 3 L 34 3 L 34 3 L 35 6 L 35 6 C 35 7, 36 8, 37 8 L 37 8 C 39 8, 41 9, 43 10 L 43 10 C 43 10, 44 11, 44 11 L 44 11 C 45 11, 45 10, 46 10 L 48 9 L 53 14 L 53 14 C 53 14, 53 14, 53 14 L 52 16 L 52 16 C 51 17, 51 18, 52 19 L 52 19 C 53 21, 54 23, 54 25 L 54 25 C 54 26, 55 26, 56 27 L 59 27 L 59 34 Z M 60 25 L 57 24 L 57 24 C 56 22, 55 20, 54 18 L 56 15 L 56 15 C 56 14, 57 13, 56 12 L 50 6 L 50 6 C 50 6, 49 6, 49 6 L 49 6 C 48 6, 47 6, 47 6 L 44 8 L 44 8 C 42 7, 40 6, 38 5 L 37 2 L 37 2 C 37 1, 36 0, 35 0 L 27 0 L 27 0 C 26 0, 25 1, 25 2 L 24 5 L 24 5 C 22 6, 20 7, 18 8 L 15 6 L 15 6 C 14 6, 14 6, 13 6 L 13 6 C 13 6, 12 6, 12 6 L 6 12 L 6 12 C 5 13, 6 14, 6 15 L 8 18 L 8 18 C 7 20, 6 22, 5 24 L 2 25 L 2 25 C 1 25, 0 26, 0 27 L 0 35 L 0 35 C 0 36, 1 37, 2 37 L 5 38 L 5 38 C 6 40, 7 42, 8 44 L 6 47 L 6 47 C 6 48, 5 49, 6 50 L 12 56 L 12 56 C 12 56, 13 56, 13 56 L 13 56 C 14 56, 14 56, 15 56 L 18 54 L 18 54 C 20 55, 22 56, 24 57 L 25 60 L 25 60 C 25 61, 26 62, 27 62 L 35 62 L 35 62 C 36 62, 37 61, 37 60 L 38 57 L 38 57 C 40 56, 42 55, 44 54 L 47 56 L 47 56 C 48 56, 48 56, 49 56 L 49 56 C 49 56, 50 56, 50 56 L 56 50 L 56 50 C 57 49, 56 48, 56 47 L 54 44 L 54 44 C 55 42, 56 40, 57 38 L 60 37 L 60 37 C 61 37, 62 36, 62 35 L 62 27 L 62 27 C 62 26, 61 25, 60 25 Z M 31 42 L 31 42 C 25 42, 20 37, 20 31 L 20 31 C 20 25, 25 20, 31 20 L 31 20 C 37 20, 42 25, 42 31 L 42 31 C 42 37, 37 42, 31 42 Z M 31 17 L 31 17 C 23 17, 17 23, 17 31 L 17 31 C 17 39, 23 45, 31 45 L 31 45 C 39 45, 45 39, 45 31 L 45 31 C 45 23, 39 17, 31 17 Z"
  },
  {
    "id": "sp-10",
    "x": 662,
    "y": 297,
    "width": 62,
    "height": 50,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 59 22 L 51 22 L 51 19 L 51 19 C 51 18, 49 17, 48 17 L 42 17 L 42 17 C 41 17, 39 18, 39 19 L 39 22 L 22 22 L 22 19 L 22 19 C 22 18, 21 17, 20 17 L 14 17 L 14 17 C 13 17, 11 18, 11 19 L 11 22 L 3 22 L 3 8 L 59 8 L 59 22 Z M 42 19 L 48 19 L 48 28 L 42 28 L 42 19 Z M 14 19 L 20 19 L 20 28 L 14 28 L 14 19 Z M 56 47 L 6 47 L 6 25 L 11 25 L 11 28 L 11 28 C 11 29, 13 31, 14 31 L 20 31 L 20 31 C 21 31, 22 29, 22 28 L 22 25 L 39 25 L 39 28 L 39 28 C 39 29, 41 31, 42 31 L 48 31 L 48 31 C 49 31, 51 29, 51 28 L 51 25 L 56 25 L 56 47 Z M 25 3 L 37 3 L 37 3 C 38 3, 39 4, 39 6 L 22 6 L 22 6 C 22 4, 24 3, 25 3 Z M 59 6 L 42 6 L 42 6 C 42 2, 40 0, 37 0 L 25 0 L 25 0 C 22 0, 20 2, 20 6 L 3 6 L 3 6 C 1 6, 0 7, 0 8 L 0 22 L 0 22 C 0 24, 1 25, 3 25 L 3 47 L 3 47 C 3 49, 4 50, 6 50 L 56 50 L 56 50 C 58 50, 59 49, 59 47 L 59 25 L 59 25 C 61 25, 62 24, 62 22 L 62 8 L 62 8 C 62 7, 61 6, 59 6 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 791,
    "y": 436,
    "width": 62,
    "height": 56,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 52 41 L 52 41 C 52 41, 46 40, 46 34 L 46 34 C 46 30, 49 28, 50 27 L 50 27 C 50 27, 51 26, 50 21 L 50 21 C 52 19, 53 14, 51 9 L 51 9 C 49 6, 48 5, 46 4 L 46 4 C 45 3, 43 3, 42 3 L 42 3 C 40 3, 38 3, 37 4 L 37 4 C 37 5, 37 5, 38 6 L 38 6 C 38 6, 38 6, 38 7 L 38 7 C 39 6, 40 6, 42 6 L 42 6 C 43 6, 44 6, 45 6 L 45 6 C 46 7, 47 8, 48 10 L 48 10 C 50 14, 49 18, 48 19 L 48 19 C 48 20, 47 21, 48 22 L 48 22 C 48 24, 48 25, 48 25 L 48 25 C 48 25, 48 25, 48 25 L 48 25 C 47 26, 47 26, 47 26 L 47 26 C 46 27, 44 30, 44 34 L 44 34 C 44 40, 48 43, 51 44 L 51 44 C 55 45, 58 46, 59 50 L 50 50 L 50 50 C 50 51, 50 52, 51 53 L 61 53 L 61 53 C 62 53, 62 52, 62 52 L 62 52 C 62 44, 55 42, 52 41 Z M 3 53 L 3 53 C 4 48, 8 46, 12 45 L 12 45 C 15 44, 20 41, 20 35 L 20 35 C 20 30, 17 27, 16 26 L 16 26 C 16 26, 16 26, 16 25 L 16 25 C 16 25, 16 25, 16 25 L 16 25 C 16 25, 15 24, 16 21 L 16 21 C 16 20, 16 20, 16 19 L 16 19 C 15 17, 13 13, 14 10 L 14 10 C 16 6, 18 5, 20 4 L 20 4 C 20 4, 21 4, 21 4 L 21 4 C 21 4, 24 3, 26 3 L 26 3 C 27 3, 28 3, 29 4 L 29 4 C 30 4, 31 5, 32 8 L 32 8 C 34 13, 34 17, 32 19 L 32 19 C 32 19, 32 20, 32 21 L 32 21 C 33 24, 32 25, 32 25 L 32 25 C 32 25, 32 25, 32 25 L 32 25 C 32 26, 32 26, 31 26 L 31 26 C 30 27, 28 30, 28 35 L 28 35 C 28 41, 33 44, 36 45 L 36 45 C 40 46, 44 48, 45 53 L 3 53 Z M 37 42 L 37 42 C 37 42, 31 41, 31 35 L 31 35 C 31 30, 33 28, 34 27 L 34 27 C 34 27, 36 25, 35 20 L 35 20 C 37 18, 37 13, 35 7 L 35 7 C 34 4, 32 2, 30 1 L 30 1 C 29 0, 27 0, 26 0 L 26 0 C 23 0, 20 1, 19 2 L 19 2 C 16 3, 14 4, 12 9 L 12 9 C 10 13, 12 18, 13 20 L 13 20 C 12 25, 14 27, 14 27 L 14 27 C 15 28, 17 30, 17 35 L 17 35 C 17 41, 11 42, 11 42 L 11 42 C 8 44, 0 46, 0 55 L 0 55 C 0 55, 0 56, 1 56 L 46 56 L 46 56 C 48 56, 48 55, 48 55 L 48 55 C 48 46, 40 44, 37 42 Z"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 138,
    "y": 187,
    "width": 244,
    "height": 81,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-13",
    "x": 138,
    "y": 147,
    "width": 95,
    "height": 37,
    "text": "Identify"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 138,
    "y": 536,
    "width": 244,
    "height": 81,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-15",
    "x": 138,
    "y": 496,
    "width": 102,
    "height": 37,
    "text": "Improve"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 991,
    "y": 187,
    "width": 244,
    "height": 81,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-17",
    "x": 991,
    "y": 147,
    "width": 126,
    "height": 37,
    "text": "Innovation"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 991,
    "y": 536,
    "width": 244,
    "height": 81,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-19",
    "x": 991,
    "y": 496,
    "width": 149,
    "height": 37,
    "text": "Management"
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

export function Migso178Template({ data }: { data: BrainData }): ReactElement {
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
