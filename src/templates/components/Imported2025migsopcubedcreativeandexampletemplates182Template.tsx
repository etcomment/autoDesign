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
    "x": 442,
    "y": 145,
    "width": 181,
    "height": 281,
    "fillColor": "#3365cc",
    "pathD": "M 107 281 L 107 281 C 104 281, 101 278, 101 274 L 101 274 C 101 264, 98 254, 92 248 L 92 248 C 91 246, 90 245, 88 244 L 88 244 L 88 244 C 88 244, 88 243, 88 243 L 87 243 L 87 243 C 87 243, 87 243, 87 243 L 86 242 L 86 242 C 86 242, 86 242, 86 242 L 86 242 C 86 242, 85 242, 85 242 L 85 242 C 82 240, 77 238, 72 238 L 72 238 C 72 238, 71 238, 70 238 L 70 238 L 70 238 C 62 238, 49 242, 36 248 L 36 248 C 28 252, 20 251, 13 247 L 13 247 C 6 243, 1 235, 1 227 L 1 111 L 1 111 C 1 109, 0 108, 0 106 L 0 106 L 0 106 C 0 102, 3 99, 7 99 L 127 99 L 127 99 C 130 99, 134 97, 136 94 L 136 94 C 138 91, 138 87, 136 84 L 136 84 C 129 69, 125 54, 125 44 L 125 44 C 125 43, 125 42, 125 41 L 125 41 C 125 34, 127 28, 130 22 L 130 22 L 130 22 C 131 21, 131 21, 131 20 L 131 20 L 131 20 C 131 20, 132 20, 132 20 L 132 20 C 132 19, 132 19, 132 19 L 132 19 L 132 19 C 133 18, 133 18, 133 18 L 133 18 C 133 18, 133 18, 133 17 L 133 17 L 133 17 C 135 15, 137 13, 140 11 L 140 11 C 148 4, 161 0, 174 0 L 174 0 C 178 0, 181 3, 181 7 L 181 7 C 181 10, 178 13, 174 13 L 174 13 C 164 13, 154 16, 148 21 L 148 21 C 146 23, 145 24, 144 26 L 144 26 L 144 26 C 144 26, 143 26, 143 26 L 143 27 L 143 27 C 143 27, 143 27, 143 27 L 143 28 L 143 28 C 142 28, 142 28, 142 28 L 142 29 L 142 29 C 140 32, 138 37, 138 42 L 138 42 C 138 42, 138 43, 138 44 L 138 44 C 138 52, 142 65, 148 78 L 148 78 C 152 86, 151 94, 147 102 L 147 102 C 143 109, 135 113, 127 113 L 15 113 L 15 227 L 15 227 C 15 230, 17 234, 20 236 L 20 236 C 23 238, 27 238, 30 236 L 30 236 C 45 229, 60 225, 70 225 L 70 225 L 70 225 C 71 225, 72 225, 73 225 L 73 225 C 80 225, 86 227, 92 230 L 92 230 C 92 230, 92 230, 92 230 L 92 230 C 93 231, 93 231, 94 231 L 94 231 L 94 231 C 94 231, 94 232, 94 232 L 94 232 C 94 232, 95 232, 95 232 L 95 232 L 95 232 C 96 233, 96 233, 96 233 L 96 233 C 96 233, 96 233, 96 233 L 97 233 L 97 233 C 99 235, 101 237, 103 240 L 103 240 C 110 248, 114 261, 114 274 L 114 274 C 114 278, 111 281, 107 281"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 658,
    "y": 145,
    "width": 181,
    "height": 280,
    "fillColor": "#ff4d38",
    "pathD": "M 75 280 L 75 280 C 71 280, 68 277, 68 273 L 68 273 C 68 257, 73 243, 82 233 L 82 233 C 91 223, 104 217, 118 217 L 118 217 C 130 217, 146 222, 162 230 L 162 230 C 163 231, 164 230, 166 230 L 166 230 C 167 229, 168 228, 168 226 L 168 113 L 54 113 L 54 113 C 46 113, 39 109, 34 103 L 34 102 L 34 102 C 34 102, 34 102, 33 101 L 33 101 C 29 94, 28 85, 32 78 L 32 78 C 39 65, 43 52, 43 44 L 43 44 C 43 40, 42 37, 41 34 L 41 34 C 40 30, 38 26, 35 23 L 35 23 C 28 17, 19 13, 7 13 L 7 13 C 3 13, 0 10, 0 7 L 0 7 C 0 3, 3 0, 7 0 L 7 0 L 7 0 C 22 0, 35 5, 44 13 L 44 13 C 49 18, 52 23, 54 30 L 54 30 C 56 34, 56 39, 56 44 L 56 44 C 56 54, 52 69, 44 84 L 44 84 C 43 87, 43 91, 45 94 L 45 94 C 45 94, 45 94, 45 94 L 45 94 C 45 95, 45 95, 45 95 L 45 95 C 47 98, 50 99, 54 99 L 54 99 C 54 99, 54 99, 54 99 L 174 99 L 174 99 C 176 99, 178 100, 179 101 L 179 101 C 180 103, 181 104, 181 106 L 181 226 L 181 226 C 181 232, 178 238, 173 241 L 173 241 C 168 244, 161 245, 156 242 L 156 242 C 142 235, 128 230, 118 230 L 118 230 C 96 230, 81 247, 81 273 L 81 273 C 81 277, 78 280, 75 280"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 657,
    "y": 435,
    "width": 181,
    "height": 181,
    "fillColor": "#52c49c",
    "pathD": "M 174 181 L 174 181 C 173 181, 172 181, 172 180 L 54 180 L 54 180 C 46 180, 39 177, 34 170 L 34 170 L 34 170 C 34 170, 34 169, 33 169 L 33 169 C 29 162, 28 153, 32 146 L 32 146 C 39 133, 43 120, 43 111 L 43 111 C 43 108, 42 105, 41 102 L 41 102 C 40 97, 38 94, 35 91 L 35 91 C 28 84, 19 81, 7 81 L 7 81 C 3 81, 0 78, 0 75 L 0 75 C 0 71, 3 68, 7 68 L 7 68 L 7 68 C 22 68, 35 72, 44 81 L 44 81 C 49 86, 52 91, 54 98 L 54 98 C 56 102, 56 107, 56 111 L 56 111 C 56 122, 52 137, 44 152 L 44 152 C 43 155, 43 159, 45 162 L 45 162 C 45 162, 45 162, 45 162 L 45 162 C 45 162, 45 162, 45 163 L 45 163 C 47 165, 50 167, 54 167 L 54 167 C 54 167, 54 167, 54 167 L 168 167 L 168 54 L 168 54 C 168 53, 167 52, 166 51 L 166 51 C 165 50, 163 50, 162 51 L 162 51 C 146 58, 130 63, 118 63 L 118 63 C 104 63, 91 57, 82 47 L 82 47 C 73 37, 68 23, 68 7 L 68 7 C 68 3, 71 0, 75 0 L 75 0 C 78 0, 81 3, 81 7 L 81 7 C 81 33, 96 49, 118 49 L 118 49 C 128 49, 142 45, 156 39 L 156 39 C 161 36, 168 36, 173 40 L 173 40 C 178 43, 181 48, 181 54 L 181 174 L 181 174 C 181 178, 178 181, 174 181"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 443,
    "y": 437,
    "width": 180,
    "height": 180,
    "fillColor": "#ffb900",
    "pathD": "M 126 180 L 7 180 L 7 180 C 3 180, 0 177, 0 173 L 0 54 L 0 54 C 0 46, 4 39, 10 34 L 10 34 L 10 34 C 11 34, 11 33, 12 33 L 12 33 C 19 29, 27 28, 35 32 L 35 32 C 48 39, 61 43, 69 43 L 69 43 C 73 43, 76 42, 79 41 L 79 41 C 83 40, 87 38, 90 35 L 90 35 C 96 28, 99 19, 99 7 L 99 7 C 99 3, 102 0, 106 0 L 106 0 L 106 0 C 110 0, 113 3, 113 7 L 113 7 C 113 22, 108 35, 100 44 L 100 44 C 95 49, 89 52, 83 54 L 83 54 C 79 56, 74 56, 69 56 L 69 56 C 59 56, 44 52, 29 44 L 29 44 C 25 43, 22 43, 18 45 L 18 45 C 18 45, 18 45, 18 45 L 18 45 C 18 45, 18 45, 18 45 L 18 45 C 15 47, 13 50, 13 54 L 13 167 L 126 167 L 126 167 C 129 167, 133 165, 135 162 L 135 162 C 137 159, 137 155, 135 151 L 135 151 C 128 136, 124 122, 124 111 L 124 111 C 124 110, 124 109, 124 108 L 124 108 C 124 101, 126 95, 129 89 L 129 89 C 129 89, 129 89, 129 89 L 129 89 C 130 88, 130 88, 130 87 L 130 87 L 130 87 C 130 87, 131 87, 131 87 L 131 87 C 131 87, 131 86, 131 86 L 131 86 L 131 86 C 131 85, 132 85, 132 85 L 132 85 C 132 85, 132 85, 132 85 L 132 85 L 132 85 C 134 82, 136 80, 139 78 L 139 78 C 147 71, 160 67, 173 67 L 173 67 C 177 67, 180 70, 180 74 L 180 74 C 180 77, 177 81, 173 81 L 173 81 C 163 81, 153 83, 147 89 L 147 89 C 145 90, 144 91, 143 93 L 143 93 L 143 93 C 142 93, 142 93, 142 94 L 142 94 L 142 94 C 142 94, 142 94, 142 94 L 141 95 L 141 95 C 141 95, 141 95, 141 96 L 141 96 C 141 96, 141 96, 141 96 L 141 96 C 139 99, 137 104, 137 109 L 137 109 C 137 110, 137 110, 137 111 L 137 111 C 137 119, 141 133, 147 145 L 147 145 C 151 153, 150 162, 146 169 L 146 169 C 142 176, 134 180, 126 180"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 308,
    "y": 159,
    "width": 266,
    "height": 10,
    "fillColor": "#3365cc",
    "pathD": "M 259 0 L 263 0 C 265 0, 266 1, 266 3 C 266 4, 265 5, 263 5 L 259 5 C 258 5, 257 4, 257 3 C 257 1, 258 0, 259 0 Z M 243 0 L 251 0 C 253 0, 254 1, 254 3 C 254 4, 253 5, 251 5 L 243 5 C 242 5, 240 4, 240 3 C 240 1, 242 0, 243 0 Z M 227 0 L 235 0 C 236 0, 238 1, 238 3 C 238 4, 236 5, 235 5 L 227 5 C 225 5, 224 4, 224 3 C 224 1, 225 0, 227 0 Z M 211 0 L 219 0 C 220 0, 221 1, 221 3 C 221 4, 220 5, 219 5 L 211 5 C 209 5, 208 4, 208 3 C 208 1, 209 0, 211 0 Z M 194 0 L 202 0 C 204 0, 205 1, 205 3 C 205 4, 204 5, 202 5 L 194 5 C 193 5, 192 4, 192 3 C 192 1, 193 0, 194 0 Z M 178 0 L 186 0 C 188 0, 189 1, 189 3 C 189 4, 188 5, 186 5 L 178 5 C 176 5, 175 4, 175 3 C 175 1, 176 0, 178 0 Z M 162 0 L 170 0 C 171 0, 172 1, 172 3 C 172 4, 171 5, 170 5 L 162 5 C 160 5, 159 4, 159 3 C 159 1, 160 0, 162 0 Z M 145 0 L 153 0 C 155 0, 156 1, 156 3 C 156 4, 155 5, 153 5 L 145 5 C 144 5, 143 4, 143 3 C 143 1, 144 0, 145 0 Z M 129 0 L 137 0 C 139 0, 140 1, 140 3 C 140 4, 139 5, 137 5 L 129 5 C 127 5, 126 4, 126 3 C 126 1, 127 0, 129 0 Z M 113 0 L 121 0 C 122 0, 123 1, 123 3 C 123 4, 122 5, 121 5 L 113 5 C 111 5, 110 4, 110 3 C 110 1, 111 0, 113 0 Z M 96 0 L 104 0 C 106 0, 107 1, 107 3 C 107 4, 106 5, 104 5 L 96 5 C 95 5, 94 4, 94 3 C 94 1, 95 0, 96 0 Z M 80 0 L 88 0 C 90 0, 91 1, 91 3 C 91 4, 90 5, 88 5 L 80 5 C 79 5, 77 4, 77 3 C 77 1, 79 0, 80 0 Z M 64 0 L 72 0 C 73 0, 74 1, 74 3 C 74 4, 73 5, 72 5 L 64 5 C 62 5, 61 4, 61 3 C 61 1, 62 0, 64 0 Z M 47 0 L 56 0 C 57 0, 58 1, 58 3 C 58 4, 57 5, 56 5 L 47 5 C 46 5, 45 4, 45 3 C 45 1, 46 0, 47 0 Z M 31 0 L 39 0 C 41 0, 42 1, 42 3 C 42 4, 41 5, 39 5 L 31 5 C 30 5, 28 4, 28 3 C 28 1, 30 0, 31 0 Z M 15 0 L 23 0 C 24 0, 26 1, 26 3 C 26 4, 24 5, 23 5 L 15 5 C 13 5, 12 4, 12 3 C 12 1, 13 0, 15 0 Z M 3 0 L 7 0 C 8 0, 9 1, 9 3 C 9 4, 8 5, 7 5 L 3 5 C 1 5, 0 4, 0 3 C 0 1, 1 0, 3 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 683,
    "y": 157,
    "width": 267,
    "height": 10,
    "fillColor": "#ff4d38",
    "pathD": "M 260 0 L 264 0 C 266 0, 267 1, 267 3 C 267 4, 266 5, 264 5 L 260 5 C 259 5, 258 4, 258 3 C 258 1, 259 0, 260 0 Z M 244 0 L 252 0 C 253 0, 255 1, 255 3 C 255 4, 253 5, 252 5 L 244 5 C 242 5, 241 4, 241 3 C 241 1, 242 0, 244 0 Z M 227 0 L 236 0 C 237 0, 238 1, 238 3 C 238 4, 237 5, 236 5 L 227 5 C 226 5, 225 4, 225 3 C 225 1, 226 0, 227 0 Z M 211 0 L 219 0 C 221 0, 222 1, 222 3 C 222 4, 221 5, 219 5 L 211 5 C 210 5, 208 4, 208 3 C 208 1, 210 0, 211 0 Z M 195 0 L 203 0 C 204 0, 206 1, 206 3 C 206 4, 204 5, 203 5 L 195 5 C 193 5, 192 4, 192 3 C 192 1, 193 0, 195 0 Z M 178 0 L 187 0 C 188 0, 189 1, 189 3 C 189 4, 188 5, 187 5 L 178 5 C 177 5, 176 4, 176 3 C 176 1, 177 0, 178 0 Z M 162 0 L 170 0 C 172 0, 173 1, 173 3 C 173 4, 172 5, 170 5 L 162 5 C 161 5, 159 4, 159 3 C 159 1, 161 0, 162 0 Z M 146 0 L 154 0 C 155 0, 157 1, 157 3 C 157 4, 155 5, 154 5 L 146 5 C 144 5, 143 4, 143 3 C 143 1, 144 0, 146 0 Z M 129 0 L 138 0 C 139 0, 140 1, 140 3 C 140 4, 139 5, 138 5 L 129 5 C 128 5, 127 4, 127 3 C 127 1, 128 0, 129 0 Z M 113 0 L 121 0 C 123 0, 124 1, 124 3 C 124 4, 123 5, 121 5 L 113 5 C 112 5, 110 4, 110 3 C 110 1, 112 0, 113 0 Z M 97 0 L 105 0 C 106 0, 108 1, 108 3 C 108 4, 106 5, 105 5 L 97 5 C 95 5, 94 4, 94 3 C 94 1, 95 0, 97 0 Z M 80 0 L 89 0 C 90 0, 91 1, 91 3 C 91 4, 90 5, 89 5 L 80 5 C 79 5, 78 4, 78 3 C 78 1, 79 0, 80 0 Z M 64 0 L 72 0 C 74 0, 75 1, 75 3 C 75 4, 74 5, 72 5 L 64 5 C 63 5, 61 4, 61 3 C 61 1, 63 0, 64 0 Z M 48 0 L 56 0 C 57 0, 59 1, 59 3 C 59 4, 57 5, 56 5 L 48 5 C 46 5, 45 4, 45 3 C 45 1, 46 0, 48 0 Z M 31 0 L 40 0 C 41 0, 42 1, 42 3 C 42 4, 41 5, 40 5 L 31 5 C 30 5, 29 4, 29 3 C 29 1, 30 0, 31 0 Z M 15 0 L 23 0 C 25 0, 26 1, 26 3 C 26 4, 25 5, 23 5 L 15 5 C 14 5, 12 4, 12 3 C 12 1, 14 0, 15 0 Z M 3 0 L 7 0 C 8 0, 9 1, 9 3 C 9 4, 8 5, 7 5 L 3 5 C 1 5, 0 4, 0 3 C 0 1, 1 0, 3 0 Z"
  },
  {
    "id": "sp-6",
    "x": 816,
    "y": 477,
    "width": 133,
    "height": 10,
    "fillColor": "#52c49c",
    "pathD": "M 126 0 L 130 0 C 132 0, 133 1, 133 3 C 133 4, 132 5, 130 5 L 126 5 C 125 5, 124 4, 124 3 C 124 1, 125 0, 126 0 Z M 110 0 L 118 0 C 119 0, 121 1, 121 3 C 121 4, 119 5, 118 5 L 110 5 C 109 5, 107 4, 107 3 C 107 1, 109 0, 110 0 Z M 94 0 L 102 0 C 104 0, 105 1, 105 3 C 105 4, 104 5, 102 5 L 94 5 C 93 5, 91 4, 91 3 C 91 1, 93 0, 94 0 Z M 78 0 L 86 0 C 88 0, 89 1, 89 3 C 89 4, 88 5, 86 5 L 78 5 C 77 5, 75 4, 75 3 C 75 1, 77 0, 78 0 Z M 62 0 L 70 0 C 72 0, 73 1, 73 3 C 73 4, 72 5, 70 5 L 62 5 C 61 5, 60 4, 60 3 C 60 1, 61 0, 62 0 Z M 46 0 L 54 0 C 56 0, 57 1, 57 3 C 57 4, 56 5, 54 5 L 46 5 C 45 5, 44 4, 44 3 C 44 1, 45 0, 46 0 Z M 30 0 L 38 0 C 40 0, 41 1, 41 3 C 41 4, 40 5, 38 5 L 30 5 C 29 5, 28 4, 28 3 C 28 1, 29 0, 30 0 Z M 14 0 L 22 0 C 24 0, 25 1, 25 3 C 25 4, 24 5, 22 5 L 14 5 C 13 5, 12 4, 12 3 C 12 1, 13 0, 14 0 Z M 3 0 L 7 0 C 8 0, 9 1, 9 3 C 9 4, 8 5, 7 5 L 3 5 C 1 5, 0 4, 0 3 C 0 1, 1 0, 3 0 Z"
  },
  {
    "id": "sp-7",
    "x": 308,
    "y": 477,
    "width": 150,
    "height": 10,
    "fillColor": "#ffb900",
    "pathD": "M 143 0 L 147 0 C 149 0, 150 1, 150 3 C 150 4, 149 5, 147 5 L 143 5 C 142 5, 141 4, 141 3 C 141 1, 142 0, 143 0 Z M 127 0 L 135 0 C 137 0, 138 1, 138 3 C 138 4, 137 5, 135 5 L 127 5 C 126 5, 124 4, 124 3 C 124 1, 126 0, 127 0 Z M 111 0 L 119 0 C 121 0, 122 1, 122 3 C 122 4, 121 5, 119 5 L 111 5 C 110 5, 108 4, 108 3 C 108 1, 110 0, 111 0 Z M 95 0 L 103 0 C 104 0, 106 1, 106 3 C 106 4, 104 5, 103 5 L 95 5 C 93 5, 92 4, 92 3 C 92 1, 93 0, 95 0 Z M 79 0 L 87 0 C 88 0, 90 1, 90 3 C 90 4, 88 5, 87 5 L 79 5 C 77 5, 76 4, 76 3 C 76 1, 77 0, 79 0 Z M 63 0 L 71 0 C 72 0, 73 1, 73 3 C 73 4, 72 5, 71 5 L 63 5 C 61 5, 60 4, 60 3 C 60 1, 61 0, 63 0 Z M 47 0 L 55 0 C 56 0, 57 1, 57 3 C 57 4, 56 5, 55 5 L 47 5 C 45 5, 44 4, 44 3 C 44 1, 45 0, 47 0 Z M 31 0 L 39 0 C 40 0, 41 1, 41 3 C 41 4, 40 5, 39 5 L 31 5 C 29 5, 28 4, 28 3 C 28 1, 29 0, 31 0 Z M 14 0 L 23 0 C 24 0, 25 1, 25 3 C 25 4, 24 5, 23 5 L 14 5 C 13 5, 12 4, 12 3 C 12 1, 13 0, 14 0 Z M 3 0 L 7 0 C 8 0, 9 1, 9 3 C 9 4, 8 5, 7 5 L 3 5 C 1 5, 0 4, 0 3 C 0 1, 1 0, 3 0 Z"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 0,
    "x": 138,
    "y": 180,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-9",
    "x": 138,
    "y": 140,
    "width": 95,
    "height": 37,
    "text": "Identify",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 0,
    "x": 64,
    "y": 125,
    "width": 76,
    "height": 107,
    "text": "A",
    "textColor": "#3365cc",
    "textSize": 60
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 2,
    "x": 139,
    "y": 497,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-12",
    "x": 138,
    "y": 457,
    "width": 102,
    "height": 37,
    "text": "Improve",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 2,
    "x": 67,
    "y": 442,
    "width": 76,
    "height": 107,
    "text": "D",
    "textColor": "#ffb900",
    "textSize": 60
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 931,
    "y": 178,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-15",
    "x": 998,
    "y": 139,
    "width": 149,
    "height": 37,
    "text": "Management",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 3,
    "x": 931,
    "y": 495,
    "width": 217,
    "height": 105,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 14
  },
  {
    "id": "sp-17",
    "x": 1021,
    "y": 456,
    "width": 126,
    "height": 37,
    "text": "Innovation",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 1,
    "x": 1138,
    "y": 124,
    "width": 76,
    "height": 107,
    "text": "B",
    "textColor": "#ff4d38",
    "textSize": 60
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 3,
    "x": 1139,
    "y": 441,
    "width": 76,
    "height": 107,
    "text": "C",
    "textColor": "#52c49c",
    "textSize": 60
  },
  {
    "id": "sp-20",
    "x": 549,
    "y": 293,
    "width": 179,
    "height": 105,
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

export function Imported2025migsopcubedcreativeandexampletemplates182Template({ data }: { data: BrainData }): ReactElement {
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
