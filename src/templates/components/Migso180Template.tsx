import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 588,
    "y": 376,
    "width": 288,
    "height": 181,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 40 108 L 40 108 C 43 106, 46 106, 49 108 L 49 108 C 50 109, 51 109, 51 110 L 51 110 C 53 111, 53 114, 53 116 L 53 116 L 53 181 L 234 181 L 234 181 L 234 181 L 234 116 L 234 116 C 234 116, 234 115, 234 115 L 234 115 C 235 112, 236 109, 239 108 L 239 108 C 241 107, 244 106, 247 107 L 247 107 C 247 107, 248 107, 248 108 L 248 108 C 249 108, 250 109, 251 109 L 251 109 C 257 112, 264 114, 268 114 L 268 114 C 274 114, 279 111, 283 107 L 283 107 C 286 103, 288 97, 288 91 L 288 91 C 288 84, 286 78, 283 74 L 283 74 C 279 70, 274 68, 268 68 L 268 68 C 263 68, 255 70, 248 73 L 248 73 C 245 75, 241 75, 239 73 L 239 73 C 238 72, 237 72, 237 71 L 237 71 C 235 70, 234 67, 234 65 L 234 65 L 234 0 L 206 0 L 206 0 L 169 0 L 169 0 C 167 0, 166 1, 165 3 L 165 3 C 164 4, 163 7, 164 8 L 164 8 C 168 16, 170 23, 170 29 L 170 29 C 170 29, 170 30, 170 30 L 170 30 C 170 37, 168 43, 162 48 L 162 48 C 162 48, 162 48, 162 48 L 162 48 C 162 48, 162 48, 162 48 L 162 48 C 162 48, 162 48, 161 49 L 161 49 C 161 49, 161 49, 161 49 L 161 49 C 161 49, 161 49, 161 49 L 161 49 C 156 52, 151 53, 145 54 L 145 54 C 145 54, 144 54, 144 54 L 144 54 C 129 54, 118 45, 117 33 L 117 33 C 117 32, 117 31, 117 30 L 117 30 C 117 24, 119 16, 124 8 L 124 8 C 125 7, 124 4, 123 3 L 123 3 C 122 1, 120 0, 118 0 L 53 0 L 53 65 L 53 65 C 53 65, 53 66, 53 66 L 53 66 C 53 69, 52 71, 49 73 L 49 73 C 47 74, 44 75, 41 74 L 41 74 C 41 74, 40 73, 40 73 L 40 73 C 39 73, 38 72, 37 72 L 37 72 C 31 69, 24 67, 20 67 L 20 67 C 14 67, 9 69, 5 74 L 5 74 C 2 78, 0 84, 0 90 L 0 90 C 0 97, 2 103, 5 107 L 5 107 C 9 111, 14 113, 20 113 L 20 113 C 25 113, 33 111, 40 108"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 458,
    "y": 322,
    "width": 181,
    "height": 287,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 234 L 68 234 L 68 234 C 70 235, 72 236, 73 238 L 73 238 C 74 240, 75 243, 74 246 L 74 246 C 74 246, 74 247, 73 247 L 73 247 C 73 248, 72 249, 72 250 L 72 250 C 69 256, 67 263, 67 267 L 67 267 C 67 273, 69 278, 74 282 L 74 282 C 78 285, 84 287, 90 287 L 90 287 C 97 287, 103 285, 107 282 L 107 282 C 111 278, 113 273, 113 267 L 113 267 C 113 262, 111 254, 108 247 L 108 247 C 106 244, 106 241, 108 238 L 108 238 C 108 237, 109 236, 110 236 L 110 236 C 110 235, 111 235, 113 234 L 181 234 L 181 169 L 181 169 C 181 167, 180 166, 178 164 L 178 164 C 177 163, 174 163, 173 164 L 173 164 C 165 168, 158 170, 152 170 L 152 170 C 152 170, 151 170, 151 170 L 151 170 C 144 170, 138 168, 133 162 L 133 162 C 133 162, 133 162, 133 162 L 133 162 C 133 162, 133 162, 133 162 L 133 162 C 133 162, 133 161, 132 161 L 132 161 C 132 161, 132 161, 132 161 L 132 161 C 132 161, 132 160, 132 160 L 132 160 C 129 156, 128 151, 127 145 L 127 145 C 127 145, 127 144, 127 144 L 127 144 C 127 129, 136 118, 148 117 L 148 117 C 149 117, 150 117, 151 117 L 151 117 C 157 117, 164 119, 173 124 L 173 124 C 174 124, 176 124, 178 123 L 178 123 C 180 122, 181 120, 181 118 L 181 54 L 116 54 L 116 54 C 116 54, 115 54, 115 53 L 115 53 C 112 53, 109 51, 108 49 L 108 49 C 107 47, 106 44, 107 41 L 107 41 C 107 41, 107 40, 108 40 L 108 40 C 108 39, 109 38, 109 37 L 109 37 C 112 31, 114 24, 114 20 L 114 20 C 114 14, 111 9, 107 5 L 107 5 C 103 2, 97 0, 91 0 L 91 0 C 84 0, 78 2, 74 5 L 74 5 C 70 9, 68 14, 68 20 L 68 20 C 68 25, 70 33, 73 40 L 73 40 C 75 43, 75 46, 73 49 L 73 49 C 72 50, 72 51, 71 51 L 71 51 C 70 53, 67 54, 65 54 L 65 54 L 0 54 L 0 205 L 0 205 L 0 233 L 0 233 L 0 234"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 405,
    "y": 192,
    "width": 288,
    "height": 182,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 283 75 L 283 75 C 279 71, 274 69, 268 69 L 268 69 C 263 69, 255 71, 248 75 L 248 75 C 245 76, 241 76, 239 74 L 239 74 C 238 74, 237 73, 237 73 L 237 73 C 235 71, 234 69, 234 66 L 234 66 L 234 8 L 234 0 L 54 0 L 54 2 L 54 68 L 54 68 C 54 68, 54 68, 54 68 L 54 68 C 53 70, 52 73, 49 74 L 49 74 C 47 76, 44 76, 41 75 L 41 75 C 41 75, 40 75, 40 75 L 40 75 C 39 74, 38 74, 37 73 L 37 73 C 31 70, 24 69, 20 69 L 20 69 C 14 69, 9 71, 5 75 L 5 75 C 2 79, 0 85, 0 92 L 0 92 C 0 98, 2 104, 5 108 L 5 108 C 9 112, 14 115, 20 115 L 20 115 C 25 115, 33 112, 40 109 L 40 109 C 43 107, 47 108, 49 109 L 49 109 C 50 110, 51 110, 51 111 L 51 111 C 52 112, 53 114, 54 116 L 54 182 L 54 182 L 54 182 L 82 182 L 82 182 L 118 182 L 118 182 C 120 182, 122 181, 123 179 L 123 179 C 124 177, 124 175, 124 173 L 124 173 C 120 166, 118 159, 117 153 L 117 153 C 117 153, 117 152, 117 152 L 117 152 C 117 144, 120 138, 125 134 L 125 134 C 125 134, 126 134, 126 134 L 126 134 C 126 134, 126 134, 126 134 L 126 134 C 126 134, 126 134, 126 133 L 126 133 C 127 133, 127 133, 127 133 L 127 133 C 127 133, 127 133, 127 133 L 127 133 C 131 130, 137 129, 143 128 L 143 128 C 143 128, 144 128, 144 128 L 144 128 C 159 128, 169 137, 171 149 L 171 149 C 171 150, 171 151, 171 152 L 171 152 C 171 157, 168 165, 164 173 L 164 173 C 163 175, 163 177, 164 179 L 164 179 C 166 181, 167 182, 169 182 L 234 182 L 234 117 L 234 117 C 234 117, 234 116, 234 116 L 234 116 C 235 113, 236 111, 239 109 L 239 109 C 241 108, 244 107, 247 108 L 247 108 C 247 108, 247 108, 248 109 L 248 109 C 249 109, 250 110, 251 110 L 251 110 C 257 113, 263 115, 268 115 L 268 115 C 274 115, 279 112, 283 108 L 283 108 C 286 104, 288 98, 288 92 L 288 92 C 288 85, 286 79, 283 75"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 641,
    "y": 138,
    "width": 181,
    "height": 289,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 181 55 L 181 53 L 116 53 L 116 53 C 115 53, 115 53, 114 53 L 114 53 C 112 53, 109 51, 108 49 L 108 49 C 106 47, 106 44, 107 41 L 107 41 C 107 41, 107 40, 107 40 L 107 40 C 108 39, 108 38, 109 37 L 109 37 C 112 31, 114 24, 114 20 L 114 20 C 114 14, 111 9, 107 5 L 107 5 C 103 2, 97 0, 90 0 L 90 0 C 84 0, 78 2, 74 5 L 74 5 C 70 9, 67 14, 67 20 L 67 20 C 67 25, 69 33, 73 40 L 73 40 C 74 43, 74 46, 73 49 L 73 49 C 72 50, 72 50, 71 51 L 71 51 C 69 53, 67 53, 65 53 L 65 53 L 0 53 L 0 82 L 0 82 L 0 120 L 0 120 C 0 122, 1 124, 3 125 L 3 125 C 4 126, 6 126, 8 125 L 8 125 C 16 121, 23 119, 29 119 L 29 119 C 29 119, 30 119, 30 119 L 30 119 C 37 119, 43 122, 48 127 L 48 127 C 48 127, 48 127, 48 127 L 48 127 C 48 127, 48 127, 48 127 L 48 127 C 48 127, 48 128, 48 128 L 48 128 C 49 128, 49 128, 49 128 L 49 128 C 49 129, 49 129, 49 129 L 49 129 C 52 133, 53 138, 54 144 L 54 144 C 54 144, 54 145, 54 145 L 54 145 C 54 160, 45 171, 33 172 L 33 172 C 32 172, 31 172, 30 172 L 30 172 C 24 172, 17 170, 8 165 L 8 165 C 7 165, 5 165, 3 166 L 3 166 C 1 167, 0 169, 0 171 L 0 235 L 65 235 L 65 235 C 65 235, 66 235, 66 236 L 66 236 C 69 236, 71 237, 73 240 L 73 240 C 74 242, 75 245, 74 248 L 74 248 C 74 248, 74 249, 73 249 L 73 249 C 73 250, 72 251, 72 252 L 72 252 C 69 258, 67 265, 67 269 L 67 269 C 67 275, 70 280, 74 284 L 74 284 C 78 287, 84 289, 90 289 L 90 289 C 97 289, 103 287, 107 284 L 107 284 C 111 280, 113 275, 113 269 L 113 269 C 113 264, 111 256, 108 249 L 108 249 C 106 246, 106 243, 108 240 L 108 240 C 109 239, 109 239, 110 238 L 110 238 C 111 236, 114 235, 116 235 L 116 235 L 181 235 L 181 55 L 181 55"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 79,
    "y": 185,
    "width": 193,
    "height": 32,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 193 32 L 0 32 L 0 0 L 193 0 L 193 32"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 990,
    "y": 185,
    "width": 193,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 193 32 L 0 32 L 0 0 L 193 0 L 193 32"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 990,
    "y": 369,
    "width": 193,
    "height": 32,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 193 32 L 0 32 L 0 0 L 193 0 L 193 32"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 79,
    "y": 369,
    "width": 193,
    "height": 32,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 193 32 L 0 32 L 0 0 L 193 0 L 193 32"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 813,
    "y": 212,
    "width": 149,
    "height": 10,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 143 0 L 147 0 C 148 0, 149 1, 149 3 C 149 4, 148 5, 147 5 L 143 5 C 141 5, 140 4, 140 3 C 140 1, 141 0, 143 0 Z M 127 0 L 135 0 C 136 0, 137 1, 137 3 C 137 4, 136 5, 135 5 L 127 5 C 125 5, 124 4, 124 3 C 124 1, 125 0, 127 0 Z M 111 0 L 119 0 C 120 0, 121 1, 121 3 C 121 4, 120 5, 119 5 L 111 5 C 109 5, 108 4, 108 3 C 108 1, 109 0, 111 0 Z M 95 0 L 103 0 C 104 0, 105 1, 105 3 C 105 4, 104 5, 103 5 L 95 5 C 93 5, 92 4, 92 3 C 92 1, 93 0, 95 0 Z M 79 0 L 87 0 C 88 0, 89 1, 89 3 C 89 4, 88 5, 87 5 L 79 5 C 77 5, 76 4, 76 3 C 76 1, 77 0, 79 0 Z M 63 0 L 71 0 C 72 0, 73 1, 73 3 C 73 4, 72 5, 71 5 L 63 5 C 61 5, 60 4, 60 3 C 60 1, 61 0, 63 0 Z M 47 0 L 55 0 C 56 0, 57 1, 57 3 C 57 4, 56 5, 55 5 L 47 5 C 45 5, 44 4, 44 3 C 44 1, 45 0, 47 0 Z M 30 0 L 38 0 C 40 0, 41 1, 41 3 C 41 4, 40 5, 38 5 L 30 5 C 29 5, 28 4, 28 3 C 28 1, 29 0, 30 0 Z M 14 0 L 22 0 C 24 0, 25 1, 25 3 C 25 4, 24 5, 22 5 L 14 5 C 13 5, 12 4, 12 3 C 12 1, 13 0, 14 0 Z M 2 0 L 6 0 C 8 0, 9 1, 9 3 C 9 4, 8 5, 6 5 L 2 5 C 1 5, 0 4, 0 3 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 316,
    "y": 213,
    "width": 149,
    "height": 10,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 143 0 L 147 0 C 148 0, 149 1, 149 3 C 149 4, 148 5, 147 5 L 143 5 C 141 5, 140 4, 140 3 C 140 1, 141 0, 143 0 Z M 127 0 L 135 0 C 136 0, 137 1, 137 3 C 137 4, 136 5, 135 5 L 127 5 C 125 5, 124 4, 124 3 C 124 1, 125 0, 127 0 Z M 111 0 L 119 0 C 120 0, 121 1, 121 3 C 121 4, 120 5, 119 5 L 111 5 C 109 5, 108 4, 108 3 C 108 1, 109 0, 111 0 Z M 95 0 L 103 0 C 104 0, 105 1, 105 3 C 105 4, 104 5, 103 5 L 95 5 C 93 5, 92 4, 92 3 C 92 1, 93 0, 95 0 Z M 79 0 L 87 0 C 88 0, 89 1, 89 3 C 89 4, 88 5, 87 5 L 79 5 C 77 5, 76 4, 76 3 C 76 1, 77 0, 79 0 Z M 63 0 L 71 0 C 72 0, 73 1, 73 3 C 73 4, 72 5, 71 5 L 63 5 C 61 5, 60 4, 60 3 C 60 1, 61 0, 63 0 Z M 47 0 L 55 0 C 56 0, 57 1, 57 3 C 57 4, 56 5, 55 5 L 47 5 C 45 5, 44 4, 44 3 C 44 1, 45 0, 47 0 Z M 30 0 L 39 0 C 40 0, 41 1, 41 3 C 41 4, 40 5, 39 5 L 30 5 C 29 5, 28 4, 28 3 C 28 1, 29 0, 30 0 Z M 14 0 L 22 0 C 24 0, 25 1, 25 3 C 25 4, 24 5, 22 5 L 14 5 C 13 5, 12 4, 12 3 C 12 1, 13 0, 14 0 Z M 2 0 L 6 0 C 8 0, 9 1, 9 3 C 9 4, 8 5, 6 5 L 2 5 C 1 5, 0 4, 0 3 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 813,
    "y": 400,
    "width": 148,
    "height": 10,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 142 0 L 146 0 C 147 0, 148 1, 148 2 C 148 4, 147 5, 146 5 L 142 5 C 141 5, 139 4, 139 2 C 139 1, 141 0, 142 0 Z M 126 0 L 134 0 C 135 0, 136 1, 136 2 C 136 4, 135 5, 134 5 L 126 5 C 125 5, 124 4, 124 2 C 124 1, 125 0, 126 0 Z M 110 0 L 118 0 C 119 0, 120 1, 120 2 C 120 4, 119 5, 118 5 L 110 5 C 109 5, 108 4, 108 2 C 108 1, 109 0, 110 0 Z M 94 0 L 102 0 C 103 0, 104 1, 104 2 C 104 4, 103 5, 102 5 L 94 5 C 93 5, 92 4, 92 2 C 92 1, 93 0, 94 0 Z M 78 0 L 86 0 C 87 0, 88 1, 88 2 C 88 4, 87 5, 86 5 L 78 5 C 77 5, 76 4, 76 2 C 76 1, 77 0, 78 0 Z M 62 0 L 70 0 C 71 0, 72 1, 72 2 C 72 4, 71 5, 70 5 L 62 5 C 61 5, 60 4, 60 2 C 60 1, 61 0, 62 0 Z M 46 0 L 54 0 C 56 0, 57 1, 57 2 C 57 4, 56 5, 54 5 L 46 5 C 45 5, 44 4, 44 2 C 44 1, 45 0, 46 0 Z M 30 0 L 38 0 C 40 0, 41 1, 41 2 C 41 4, 40 5, 38 5 L 30 5 C 29 5, 28 4, 28 2 C 28 1, 29 0, 30 0 Z M 14 0 L 22 0 C 24 0, 25 1, 25 2 C 25 4, 24 5, 22 5 L 14 5 C 13 5, 12 4, 12 2 C 12 1, 13 0, 14 0 Z M 2 0 L 6 0 C 8 0, 9 1, 9 2 C 9 4, 8 5, 6 5 L 2 5 C 1 5, 0 4, 0 2 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 316,
    "y": 400,
    "width": 149,
    "height": 10,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 143 0 L 147 0 C 148 0, 149 1, 149 2 C 149 4, 148 5, 147 5 L 143 5 C 141 5, 140 4, 140 2 C 140 1, 141 0, 143 0 Z M 127 0 L 135 0 C 136 0, 137 1, 137 2 C 137 4, 136 5, 135 5 L 127 5 C 125 5, 124 4, 124 2 C 124 1, 125 0, 127 0 Z M 111 0 L 119 0 C 120 0, 121 1, 121 2 C 121 4, 120 5, 119 5 L 111 5 C 109 5, 108 4, 108 2 C 108 1, 109 0, 111 0 Z M 95 0 L 103 0 C 104 0, 105 1, 105 2 C 105 4, 104 5, 103 5 L 95 5 C 93 5, 92 4, 92 2 C 92 1, 93 0, 95 0 Z M 79 0 L 87 0 C 88 0, 89 1, 89 2 C 89 4, 88 5, 87 5 L 79 5 C 77 5, 76 4, 76 2 C 76 1, 77 0, 79 0 Z M 63 0 L 71 0 C 72 0, 73 1, 73 2 C 73 4, 72 5, 71 5 L 63 5 C 61 5, 60 4, 60 2 C 60 1, 61 0, 63 0 Z M 47 0 L 55 0 C 56 0, 57 1, 57 2 C 57 4, 56 5, 55 5 L 47 5 C 45 5, 44 4, 44 2 C 44 1, 45 0, 47 0 Z M 30 0 L 39 0 C 40 0, 41 1, 41 2 C 41 4, 40 5, 39 5 L 30 5 C 29 5, 28 4, 28 2 C 28 1, 29 0, 30 0 Z M 14 0 L 22 0 C 24 0, 25 1, 25 2 C 25 4, 24 5, 22 5 L 14 5 C 13 5, 12 4, 12 2 C 12 1, 13 0, 14 0 Z M 2 0 L 6 0 C 8 0, 9 1, 9 2 C 9 4, 8 5, 6 5 L 2 5 C 1 5, 0 4, 0 2 C 0 1, 1 0, 2 0 Z"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 0,
    "x": 75,
    "y": 220,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-13",
    "x": 81,
    "y": 180,
    "width": 95,
    "height": 37,
    "text": "Identify"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 75,
    "y": 403,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-15",
    "x": 81,
    "y": 363,
    "width": 102,
    "height": 37,
    "text": "Improve"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 1,
    "x": 985,
    "y": 220,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-17",
    "x": 991,
    "y": 180,
    "width": 126,
    "height": 37,
    "text": "Innovation"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 985,
    "y": 403,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-19",
    "x": 991,
    "y": 363,
    "width": 149,
    "height": 37,
    "text": "Management"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 0,
    "x": 473,
    "y": 193,
    "width": 62,
    "height": 107,
    "text": "1"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 745,
    "y": 191,
    "width": 62,
    "height": 107,
    "text": "2"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 2,
    "x": 472,
    "y": 449,
    "width": 62,
    "height": 107,
    "text": "4"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 744,
    "y": 441,
    "width": 62,
    "height": 107,
    "text": "3"
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

export function Migso180Template({ data }: { data: BrainData }): ReactElement {
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
