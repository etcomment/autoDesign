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
    "x": 201,
    "y": 333,
    "width": 221,
    "height": 189,
    "fillColor": "#3365cc",
    "pathD": "M 197 59 L 197 59 C 197 57, 197 56, 198 55 L 198 55 L 198 55 C 198 54, 198 54, 198 54 L 198 54 C 199 52, 201 51, 203 51 L 203 51 C 206 51, 208 50, 210 50 L 210 50 C 212 49, 214 49, 215 48 L 215 48 C 215 48, 216 48, 216 48 L 216 48 C 217 47, 219 45, 219 44 L 219 44 C 219 44, 219 44, 219 44 L 220 43 L 220 43 C 220 43, 220 43, 220 43 L 220 43 L 220 43 L 220 43 C 220 42, 220 41, 220 41 L 220 41 C 221 38, 220 34, 218 31 L 218 31 C 216 28, 213 25, 210 24 L 210 24 C 209 24, 207 24, 206 24 L 206 24 C 204 25, 203 25, 202 26 L 202 26 C 200 27, 197 30, 194 35 L 194 35 C 193 36, 191 38, 188 37 L 188 37 C 188 37, 188 37, 188 37 L 188 37 L 188 37 C 187 37, 186 37, 185 36 L 185 36 C 185 36, 184 36, 184 36 L 184 36 L 184 36 C 184 36, 184 36, 184 35 L 184 35 C 184 35, 184 35, 184 35 L 163 0 L 55 0 L 34 35 L 34 35 C 34 36, 34 37, 35 38 L 35 38 L 35 38 C 35 38, 35 38, 35 38 L 35 38 C 35 40, 37 41, 38 41 L 38 41 C 44 41, 49 42, 52 44 L 52 44 C 53 45, 54 45, 55 46 L 55 46 C 56 48, 57 50, 58 52 L 58 52 C 58 55, 58 59, 55 63 L 55 63 C 53 67, 50 70, 47 71 L 47 71 C 46 71, 45 72, 45 72 L 44 72 L 44 72 C 44 72, 44 72, 44 72 L 44 72 L 44 72 C 44 72, 44 72, 44 72 L 43 72 L 43 72 C 43 72, 43 72, 43 72 L 43 72 C 41 72, 39 71, 37 70 L 37 70 C 37 70, 37 70, 36 70 L 36 70 C 34 68, 30 65, 27 60 L 27 60 C 26 59, 25 58, 23 58 L 23 58 C 22 58, 21 59, 20 59 L 0 95 L 55 189 L 164 189 L 218 95 L 197 59 L 197 59 C 197 59, 197 59, 197 59"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 530,
    "y": 333,
    "width": 220,
    "height": 189,
    "fillColor": "#52c49c",
    "pathD": "M 34 36 L 34 36 C 34 37, 34 37, 34 38 L 34 38 C 35 40, 37 40, 38 41 L 38 41 C 41 41, 43 41, 46 42 L 46 42 C 48 42, 50 43, 51 44 L 51 44 C 52 45, 53 45, 54 46 L 54 46 C 56 48, 57 50, 57 52 L 57 52 C 58 55, 57 59, 55 63 L 55 63 C 53 67, 50 70, 47 71 L 47 71 C 46 71, 45 72, 44 72 L 44 72 L 44 72 C 44 72, 44 72, 44 72 L 44 72 L 44 72 C 44 72, 43 72, 43 72 L 43 72 L 43 72 C 43 72, 43 72, 43 72 L 43 72 C 41 72, 39 71, 37 70 L 37 70 C 37 70, 36 70, 36 70 L 36 70 C 33 68, 30 65, 27 60 L 27 60 C 26 59, 24 58, 23 58 L 23 58 C 22 58, 21 59, 21 59 L 0 95 L 54 189 L 163 189 L 217 95 L 196 59 L 196 59 C 196 59, 196 59, 196 59 L 196 59 C 196 58, 196 56, 197 55 L 197 55 L 197 55 C 197 55, 197 55, 197 55 L 197 55 C 197 55, 197 54, 197 54 L 197 54 C 198 52, 200 51, 202 51 L 202 51 C 207 51, 212 49, 214 48 L 214 48 C 214 48, 215 48, 215 48 L 215 48 C 216 47, 218 45, 218 44 L 218 44 C 218 44, 218 44, 218 44 L 218 44 C 218 44, 219 44, 219 43 L 219 43 L 219 43 C 219 43, 219 43, 219 43 L 219 43 L 219 43 L 219 43 C 219 42, 219 41, 219 41 L 219 41 C 220 38, 219 34, 217 31 L 217 31 C 215 28, 212 25, 209 24 L 209 24 C 208 24, 206 24, 205 24 L 205 24 C 205 24, 205 24, 205 24 L 205 24 C 205 24, 204 24, 204 24 L 204 24 C 203 25, 203 25, 202 25 L 202 25 C 202 25, 202 25, 202 26 L 202 26 C 201 26, 200 27, 199 28 L 199 28 C 197 29, 195 32, 193 35 L 193 35 C 192 36, 190 38, 187 37 L 187 37 C 187 37, 187 37, 187 37 L 187 37 L 187 37 C 187 37, 186 37, 186 37 L 186 37 C 185 37, 184 37, 183 36 L 183 36 C 183 36, 183 36, 183 36 L 162 0 L 55 0 L 34 36"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 366,
    "y": 238,
    "width": 220,
    "height": 189,
    "fillColor": "#ff4d38",
    "pathD": "M 184 153 L 184 153 C 185 152, 186 152, 187 151 L 187 151 L 187 151 C 187 151, 187 151, 187 151 L 187 151 C 190 151, 192 152, 193 154 L 193 154 C 196 159, 199 162, 201 163 L 201 163 C 203 164, 204 164, 205 165 L 205 165 C 206 165, 208 165, 209 165 L 209 165 C 212 164, 215 161, 217 158 L 217 158 C 219 154, 220 151, 219 148 L 219 148 C 219 148, 219 147, 219 146 L 219 146 L 219 146 L 219 146 C 219 146, 219 146, 219 146 L 219 146 L 219 146 C 219 146, 219 146, 219 145 L 219 145 L 219 145 L 218 145 L 218 145 C 218 145, 218 145, 218 145 L 218 145 C 218 144, 216 142, 215 141 L 215 141 C 215 141, 214 141, 214 141 L 214 141 C 213 140, 211 140, 209 139 L 209 139 C 207 139, 205 138, 202 138 L 202 138 C 200 138, 198 137, 197 135 L 197 135 C 197 135, 197 135, 197 134 L 197 134 L 197 134 C 196 133, 196 132, 196 130 L 196 130 C 196 130, 196 130, 196 130 L 217 94 L 163 0 L 54 0 L 0 94 L 20 130 L 20 130 C 21 130, 22 131, 23 131 L 23 131 C 24 131, 26 130, 27 128 L 27 128 C 30 124, 33 121, 36 119 L 36 119 C 36 119, 37 119, 37 119 L 37 119 C 39 118, 41 117, 43 117 L 43 117 L 43 117 C 43 117, 43 117, 43 117 L 43 117 L 43 117 C 43 117, 44 117, 44 117 L 44 117 L 44 117 C 44 117, 44 117, 44 117 L 44 117 L 44 117 C 45 117, 46 118, 47 118 L 47 118 C 50 119, 53 122, 55 125 L 55 125 C 57 130, 58 134, 57 137 L 57 137 C 57 139, 56 141, 54 143 L 54 143 C 54 144, 52 144, 51 145 L 51 145 C 50 146, 48 147, 45 147 L 45 147 C 43 148, 41 148, 38 148 L 38 148 C 37 148, 35 149, 34 151 L 34 151 C 34 152, 34 152, 34 153 L 55 189 L 163 189 L 183 154 L 183 154 C 183 154, 183 154, 183 154 L 183 154 C 183 153, 183 153, 183 153 L 184 153 L 184 153 C 184 153, 184 153, 184 153"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 695,
    "y": 238,
    "width": 220,
    "height": 189,
    "fillColor": "#ffb900",
    "pathD": "M 184 153 L 184 153 C 185 152, 186 152, 187 152 L 187 152 L 187 152 C 187 151, 187 151, 187 151 L 187 151 C 187 151, 188 151, 188 151 L 188 151 C 190 151, 192 153, 193 154 L 193 154 C 196 159, 199 162, 201 163 L 201 163 C 202 164, 204 164, 205 165 L 205 165 C 206 165, 208 165, 209 165 L 209 165 C 212 164, 215 161, 217 158 L 217 158 C 219 155, 220 151, 219 148 L 219 148 C 219 148, 219 147, 219 146 L 219 146 L 219 146 L 219 146 C 219 146, 219 146, 219 146 L 219 146 L 219 146 C 219 146, 219 146, 219 145 L 218 145 L 218 145 C 218 145, 218 145, 218 145 L 218 145 C 218 145, 218 144, 218 144 L 218 144 C 218 144, 218 144, 218 144 L 218 144 C 217 144, 217 144, 217 144 L 217 144 C 216 143, 216 142, 215 141 L 215 141 C 212 140, 207 139, 202 139 L 202 139 C 200 138, 198 137, 197 135 L 197 135 C 197 135, 197 135, 197 135 L 197 135 L 197 135 C 196 133, 196 132, 196 131 L 196 131 C 196 131, 196 131, 196 130 L 217 94 L 217 94 C 217 94, 217 94, 217 94 L 163 0 L 54 0 L 0 94 L 21 130 L 21 130 C 21 130, 22 130, 22 131 L 22 131 C 22 131, 22 131, 23 131 L 23 131 L 23 131 C 24 131, 26 130, 27 128 L 27 128 C 29 126, 31 123, 33 121 L 33 121 C 34 120, 35 120, 36 119 L 36 119 C 37 118, 38 118, 39 118 L 39 118 C 40 117, 41 117, 43 117 L 43 117 C 43 117, 43 117, 43 117 L 43 117 L 43 117 C 43 117, 43 117, 44 117 L 44 117 L 44 117 C 44 117, 44 117, 44 117 L 44 117 C 44 117, 44 117, 44 117 L 44 117 C 45 117, 46 118, 47 118 L 47 118 C 50 119, 53 122, 55 125 L 55 125 C 57 130, 58 134, 57 137 L 57 137 C 57 139, 56 141, 54 143 L 54 143 C 53 144, 52 144, 51 145 L 51 145 C 48 147, 43 148, 38 148 L 38 148 C 36 148, 35 149, 34 151 L 34 151 L 34 151 L 34 151 C 34 151, 34 151, 34 151 L 34 151 C 34 151, 34 151, 34 151 L 34 151 C 34 152, 34 152, 34 153 L 55 189 L 163 189 L 183 154 L 183 154 C 183 154, 183 154, 183 154 L 183 154 C 183 154, 183 154, 183 154 L 183 153 L 183 153 C 184 153, 184 153, 184 153"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 859,
    "y": 334,
    "width": 220,
    "height": 189,
    "fillColor": "#ee6d90",
    "pathD": "M 55 63 L 55 63 C 53 67, 50 70, 47 71 L 47 71 C 46 71, 45 72, 44 72 L 44 72 L 44 72 C 44 72, 44 72, 44 72 L 44 72 L 44 72 C 44 72, 44 72, 43 72 L 43 72 L 43 72 C 43 72, 43 72, 43 72 L 43 72 L 43 72 C 41 72, 39 71, 37 70 L 37 70 C 37 70, 36 70, 36 70 L 36 70 C 33 68, 30 65, 27 60 L 27 60 C 26 59, 24 58, 23 58 L 23 58 C 22 58, 21 59, 20 59 L 0 95 L 54 189 L 163 189 L 217 94 L 197 58 L 197 58 C 196 58, 196 58, 196 58 L 196 58 C 196 57, 197 55, 197 54 L 197 54 C 198 52, 200 51, 203 51 L 203 51 C 207 50, 212 49, 214 48 L 214 48 C 215 48, 215 48, 215 48 L 215 48 C 216 47, 218 45, 218 44 L 218 44 C 218 44, 218 44, 219 44 L 219 43 L 219 43 C 219 43, 219 43, 219 43 L 220 43 L 219 43 L 219 43 C 219 42, 219 41, 219 41 L 219 41 C 220 38, 219 34, 217 31 L 217 31 C 215 28, 213 25, 209 24 L 209 24 C 208 24, 206 24, 205 24 L 205 24 C 204 24, 203 25, 201 25 L 201 25 C 199 27, 196 30, 193 34 L 193 34 C 192 36, 190 38, 187 37 L 187 37 C 187 37, 187 37, 187 37 L 187 37 L 187 37 C 186 37, 185 37, 184 36 L 184 36 C 184 36, 184 36, 184 36 L 163 0 L 54 0 L 34 35 L 34 35 C 34 36, 34 37, 35 38 L 35 38 C 35 39, 37 40, 38 40 L 38 40 C 43 41, 48 42, 51 43 L 51 43 C 51 44, 51 44, 52 44 L 52 44 C 53 45, 54 46, 55 47 L 55 47 C 56 48, 57 50, 57 52 L 57 52 C 58 55, 57 59, 55 63"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 307,
    "y": 265,
    "width": 10,
    "height": 71,
    "fillColor": "#3365cc",
    "pathD": "M 1 64 C 2 64, 3 64, 3 65 L 3 69 C 3 70, 2 71, 1 71 C 1 71, 0 70, 0 69 L 0 65 C 0 64, 1 64, 1 64 Z M 1 47 C 2 47, 3 47, 3 48 L 3 57 C 3 58, 2 58, 1 58 C 1 58, 0 58, 0 57 L 0 48 C 0 47, 1 47, 1 47 Z M 1 29 C 2 29, 3 30, 3 31 L 3 40 C 3 41, 2 41, 1 41 C 1 41, 0 41, 0 40 L 0 31 C 0 30, 1 29, 1 29 Z M 1 12 C 2 12, 3 13, 3 14 L 3 23 C 3 23, 2 24, 1 24 C 1 24, 0 23, 0 23 L 0 14 C 0 13, 1 12, 1 12 Z M 1 0 C 2 0, 3 1, 3 2 L 3 6 C 3 6, 2 7, 1 7 C 1 7, 0 6, 0 6 L 0 2 C 0 1, 1 0, 1 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 474,
    "y": 423,
    "width": 10,
    "height": 71,
    "fillColor": "#ff4d38",
    "pathD": "M 2 64 C 2 64, 3 64, 3 65 L 3 69 C 3 70, 2 71, 2 71 C 1 71, 0 70, 0 69 L 0 65 C 0 64, 1 64, 2 64 Z M 2 47 C 2 47, 3 47, 3 48 L 3 57 C 3 58, 2 58, 2 58 C 1 58, 0 58, 0 57 L 0 48 C 0 47, 1 47, 2 47 Z M 2 30 C 2 30, 3 30, 3 31 L 3 40 C 3 41, 2 41, 2 41 C 1 41, 0 41, 0 40 L 0 31 C 0 30, 1 30, 2 30 Z M 2 13 C 2 13, 3 13, 3 14 L 3 23 C 3 24, 2 24, 2 24 C 1 24, 0 24, 0 23 L 0 14 C 0 13, 1 13, 2 13 Z M 2 0 C 2 0, 3 1, 3 2 L 3 6 C 3 7, 2 7, 2 7 C 1 7, 0 7, 0 6 L 0 2 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 638,
    "y": 265,
    "width": 10,
    "height": 71,
    "fillColor": "#52c49c",
    "pathD": "M 2 64 C 2 64, 3 64, 3 65 L 3 69 C 3 70, 2 71, 2 71 C 1 71, 0 70, 0 69 L 0 65 C 0 64, 1 64, 2 64 Z M 2 47 C 2 47, 3 47, 3 48 L 3 57 C 3 58, 2 58, 2 58 C 1 58, 0 58, 0 57 L 0 48 C 0 47, 1 47, 2 47 Z M 2 29 C 2 29, 3 30, 3 31 L 3 40 C 3 41, 2 41, 2 41 C 1 41, 0 41, 0 40 L 0 31 C 0 30, 1 29, 2 29 Z M 2 12 C 2 12, 3 13, 3 14 L 3 23 C 3 23, 2 24, 2 24 C 1 24, 0 23, 0 23 L 0 14 C 0 13, 1 12, 2 12 Z M 2 0 C 2 0, 3 1, 3 2 L 3 6 C 3 6, 2 7, 2 7 C 1 7, 0 6, 0 6 L 0 2 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 807,
    "y": 423,
    "width": 10,
    "height": 71,
    "fillColor": "#ffb900",
    "pathD": "M 2 64 C 2 64, 3 64, 3 65 L 3 69 C 3 70, 2 71, 2 71 C 1 71, 0 70, 0 69 L 0 65 C 0 64, 1 64, 2 64 Z M 2 47 C 2 47, 3 47, 3 48 L 3 57 C 3 58, 2 58, 2 58 C 1 58, 0 58, 0 57 L 0 48 C 0 47, 1 47, 2 47 Z M 2 30 C 2 30, 3 30, 3 31 L 3 40 C 3 41, 2 41, 2 41 C 1 41, 0 41, 0 40 L 0 31 C 0 30, 1 30, 2 30 Z M 2 13 C 2 13, 3 13, 3 14 L 3 23 C 3 24, 2 24, 2 24 C 1 24, 0 24, 0 23 L 0 14 C 0 13, 1 13, 2 13 Z M 2 0 C 2 0, 3 1, 3 2 L 3 6 C 3 7, 2 7, 2 7 C 1 7, 0 7, 0 6 L 0 2 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 962,
    "y": 265,
    "width": 10,
    "height": 71,
    "fillColor": "#ee6d90",
    "pathD": "M 2 64 C 2 64, 3 64, 3 65 L 3 69 C 3 70, 2 71, 2 71 C 1 71, 0 70, 0 69 L 0 65 C 0 64, 1 64, 2 64 Z M 2 47 C 2 47, 3 47, 3 48 L 3 57 C 3 58, 2 58, 2 58 C 1 58, 0 58, 0 57 L 0 48 C 0 47, 1 47, 2 47 Z M 2 29 C 2 29, 3 30, 3 31 L 3 40 C 3 41, 2 41, 2 41 C 1 41, 0 41, 0 40 L 0 31 C 0 30, 1 29, 2 29 Z M 2 12 C 2 12, 3 13, 3 14 L 3 23 C 3 23, 2 24, 2 24 C 1 24, 0 23, 0 23 L 0 14 C 0 13, 1 12, 2 12 Z M 2 0 C 2 0, 3 1, 3 2 L 3 6 C 3 6, 2 7, 2 7 C 1 7, 0 6, 0 6 L 0 2 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 0,
    "x": 210,
    "y": 164,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-11",
    "x": 267,
    "y": 124,
    "width": 102,
    "height": 37,
    "text": "Improve",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 3,
    "x": 368,
    "y": 534,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-13",
    "x": 429,
    "y": 494,
    "width": 95,
    "height": 37,
    "text": "Identify",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 532,
    "y": 164,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-15",
    "x": 566,
    "y": 124,
    "width": 149,
    "height": 37,
    "text": "Management",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 4,
    "x": 700,
    "y": 534,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 1,
    "x": 746,
    "y": 494,
    "width": 126,
    "height": 37,
    "text": "Innovation",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 2,
    "x": 855,
    "y": 164,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 0,
    "x": 906,
    "y": 124,
    "width": 115,
    "height": 37,
    "text": "Audience",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 2,
    "x": 270,
    "y": 375,
    "width": 76,
    "height": 107,
    "text": "A",
    "textColor": "#ffffff",
    "textSize": 60
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 0,
    "x": 437,
    "y": 274,
    "width": 76,
    "height": 107,
    "text": "B",
    "textColor": "#ffffff",
    "textSize": 60
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 604,
    "y": 375,
    "width": 76,
    "height": 107,
    "text": "C",
    "textColor": "#ffffff",
    "textSize": 60
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 1,
    "x": 764,
    "y": 274,
    "width": 76,
    "height": 107,
    "text": "D",
    "textColor": "#ffffff",
    "textSize": 60
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 4,
    "x": 929,
    "y": 375,
    "width": 71,
    "height": 107,
    "text": "E",
    "textColor": "#ffffff",
    "textSize": 60
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

export function Imported2025migsopcubedcreativeandexampletemplates181Template({ data }: { data: BrainData }): ReactElement {
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
