import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "grp-0",
    "isGroup": true,
    "children": [
      {
        "id": "sp-26",
        "x": 896.1617647058824,
        "y": 108,
        "width": 211.05882352941174,
        "height": 184.94896851248643,
        "localPctX": 0.5082720588235295,
        "localPctY": 0,
        "localPctW": 0.338235294117647,
        "localPctH": 0.3496199782844734,
        "fillColor": "#ffb900",
        "pathD": "M 0 0 L 11 0 C 85 4, 153 34, 204 81 L 211 88 L 114 185 L 106 177 C 78 154, 42 140, 3 138 L 0 137 L 0 0 Z"
      },
      {
        "id": "sp-27",
        "x": 674.2058823529412,
        "y": 108,
        "width": 211.05882352941174,
        "height": 184.94896851248643,
        "localPctX": 0.15257352941176477,
        "localPctY": 0,
        "localPctW": 0.338235294117647,
        "localPctH": 0.3496199782844734,
        "fillColor": "#52c49c",
        "pathD": "M 211 0 L 211 137 L 208 138 C 169 140, 133 154, 105 177 L 97 185 L 0 88 L 7 81 C 59 34, 126 4, 201 0 L 211 0 Z"
      },
      {
        "id": "sp-28",
        "x": 1017.75,
        "y": 203.34636264929426,
        "width": 184.67647058823528,
        "height": 211.37024972855593,
        "localPctX": 0.703125,
        "localPctY": 0.18023887079261675,
        "localPctW": 0.2959558823529411,
        "localPctH": 0.3995656894679696,
        "fillColor": "#ee6d90",
        "pathD": "M 97 0 L 104 7 C 151 59, 181 126, 184 201 L 185 211 L 47 211 L 47 208 C 45 169, 31 134, 8 106 L 0 97 L 97 0 Z"
      },
      {
        "id": "sp-29",
        "x": 579,
        "y": 203.34636264929426,
        "width": 184.67647058823528,
        "height": 211.37024972855593,
        "localPctX": 0,
        "localPctY": 0.18023887079261675,
        "localPctW": 0.2959558823529411,
        "localPctH": 0.3995656894679696,
        "fillColor": "#ff4d38",
        "pathD": "M 88 0 L 185 97 L 177 106 C 154 134, 139 169, 137 208 L 137 211 L 0 211 L 0 201 C 4 126, 34 59, 81 7 L 88 0 Z"
      },
      {
        "id": "sp-30",
        "x": 579,
        "y": 426.20412595005433,
        "width": 184.67647058823528,
        "height": 211.37024972855593,
        "localPctX": 0,
        "localPctY": 0.6015200868621065,
        "localPctW": 0.2959558823529411,
        "localPctH": 0.3995656894679696,
        "pathD": "M 0 0 L 137 0 L 137 3 C 139 42, 154 78, 177 106 L 185 114 L 88 211 L 81 205 C 34 153, 4 85, 0 11 L 0 0 Z"
      },
      {
        "id": "sp-31",
        "x": 1017.75,
        "y": 426.20412595005433,
        "width": 184.67647058823528,
        "height": 211.37024972855593,
        "localPctX": 0.703125,
        "localPctY": 0.6015200868621065,
        "localPctW": 0.2959558823529411,
        "localPctH": 0.3995656894679696,
        "fillColor": "#4a90d9",
        "pathD": "M 47 0 L 185 0 L 184 11 C 181 85, 151 153, 104 205 L 97 211 L 0 114 L 8 106 C 31 78, 45 42, 47 3 L 47 0 Z"
      },
      {
        "id": "sp-32",
        "x": 788.9117647058824,
        "y": 333.1552660152009,
        "width": 200.16176470588235,
        "height": 304.41910966340936,
        "localPctX": 0.33639705882352955,
        "localPctY": 0.4256243213897937,
        "localPctW": 0.3207720588235294,
        "localPctH": 0.5754614549402823,
        "pathD": "M 161 186 L 161 186 C 161 184, 161 181, 161 178 L 161 178 C 160 155, 198 125, 198 79 L 198 79 C 198 34, 156 2, 109 2 L 109 2 C 109 2, 54 0, 33 50 L 33 50 C 24 75, 36 72, 20 90 L 20 90 C 4 108, 0 119, 7 122 L 7 122 C 14 126, 20 124, 19 133 L 19 133 C 18 138, 12 143, 19 148 L 19 148 C 14 156, 22 161, 21 163 L 21 163 C 21 163, 22 169, 20 175 L 20 175 C 18 181, 15 194, 34 194 L 34 194 C 54 194, 73 187, 76 201 L 76 201 C 77 202, 77 204, 77 206 L 77 206 C 76 243, 55 304, 55 304 L 70 304 L 182 304 L 200 304 L 200 304 C 200 304, 197 281, 183 253 L 183 253 C 169 227, 161 188, 161 186"
      }
    ],
    "x": 579,
    "y": 108,
    "width": 624,
    "height": 529
  },
  {
    "id": "sp-0",
    "x": 844,
    "y": 373,
    "width": 105,
    "height": 104,
    "fillColor": "#f0f0f0",
    "pathD": "M 74 78 L 74 78 C 74 79, 74 80, 74 80 L 74 84 L 42 84 C 41 84, 40 84, 40 85 C 40 86, 41 87, 42 87 L 74 87 L 74 92 C 74 92, 74 92, 74 92 L 35 92 C 35 92, 35 92, 35 92 L 35 81 C 35 80, 35 79, 35 78 L 74 78 Z M 63 101 L 46 101 C 43 101, 40 98, 39 95 L 70 95 C 69 98, 66 101, 63 101 Z M 83 51 L 83 51 C 83 51, 84 51, 84 51 C 84 51, 85 51, 85 51 L 104 32 C 105 31, 105 30, 104 30 L 85 10 C 84 10, 84 10, 83 10 C 83 10, 82 11, 82 12 L 82 21 L 30 21 C 29 21, 29 21, 29 22 C 29 23, 29 24, 30 24 L 84 24 C 85 24, 85 23, 85 22 L 85 15 L 101 31 L 85 46 L 85 39 C 85 38, 85 37, 84 37 L 62 37 L 51 27 C 51 27, 50 27, 50 27 C 49 27, 49 28, 49 28 L 49 38 L 18 38 C 19 18, 35 3, 54 3 C 62 3, 69 5, 75 10 C 76 10, 77 10, 77 9 C 78 9, 78 8, 77 7 C 70 2, 62 0, 54 0 C 33 0, 16 17, 15 38 L 1 38 C 1 38, 0 38, 0 39 C 0 40, 1 41, 1 41 L 50 41 C 51 41, 52 40, 52 39 L 52 32 L 67 47 L 52 63 L 52 56 C 52 55, 51 54, 50 54 L 12 54 C 11 54, 11 55, 11 56 C 11 56, 11 57, 12 57 L 19 57 C 21 61, 23 64, 26 67 C 30 71, 32 75, 32 81 L 32 92 C 32 93, 33 95, 35 95 L 36 95 C 37 100, 41 104, 46 104 L 63 104 C 68 104, 72 100, 73 95 L 74 95 C 75 95, 77 93, 77 92 L 77 80 C 77 75, 79 70, 83 67 C 86 63, 89 60, 91 55 C 91 55, 91 54, 90 53 C 89 53, 88 53, 88 54 C 86 58, 83 62, 80 65 C 78 67, 76 71, 75 75 L 34 75 C 33 71, 31 68, 29 65 C 26 63, 24 60, 23 57 L 49 57 L 49 66 C 49 67, 49 68, 50 68 C 50 68, 50 68, 50 68 C 51 68, 51 68, 51 67 L 71 48 C 71 48, 71 48, 71 47 C 71 47, 71 46, 71 46 L 65 41 L 82 41 L 82 50 C 82 50, 83 51, 83 51 Z"
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 10,
    "x": 655,
    "y": 580,
    "width": 31,
    "height": 36,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 11,
    "x": 1095,
    "y": 580,
    "width": 31,
    "height": 36,
    "text": "6",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 7,
    "x": 1118,
    "y": 380,
    "width": 31,
    "height": 36,
    "text": "5",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 6,
    "x": 632,
    "y": 380,
    "width": 31,
    "height": 36,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 3,
    "x": 755,
    "y": 245,
    "width": 31,
    "height": 36,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 4,
    "x": 990,
    "y": 245,
    "width": 31,
    "height": 36,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 2,
    "x": 613,
    "y": 494,
    "width": 115,
    "height": 75,
    "text": "MIGSO-PCUBED content",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 3,
    "x": 1056,
    "y": 494,
    "width": 115,
    "height": 75,
    "text": "MIGSO-PCUBED content",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 613,
    "y": 294,
    "width": 115,
    "height": 75,
    "text": "MIGSO-PCUBED content",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 1,
    "x": 1056,
    "y": 294,
    "width": 115,
    "height": 75,
    "text": "MIGSO-PCUBED content",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 0,
    "x": 717,
    "y": 189,
    "width": 152,
    "height": 51,
    "text": "MIGSO-PCUBED content",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 1,
    "x": 911,
    "y": 189,
    "width": 152,
    "height": 51,
    "text": "MIGSO-PCUBED content",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 8,
    "x": 632,
    "y": 447,
    "width": 31,
    "height": 36,
    "fillColor": "#ffffff",
    "pathD": "M 6 27 L 4 28 L 4 31 L 6 32 L 8 31 L 8 28 L 6 27 Z M 6 26 C 6 26, 6 26, 7 26 L 9 28 C 9 28, 9 28, 9 28 L 9 31 C 9 31, 9 31, 9 31 L 7 33 C 6 33, 6 33, 6 33 C 6 33, 6 33, 6 33 L 4 31 C 3 31, 3 31, 3 31 L 3 28 C 3 28, 3 28, 4 28 L 6 26 Z M 13 9 C 18 9, 22 13, 22 18 C 22 23, 18 27, 13 27 C 13 27, 13 26, 13 26 C 13 26, 13 26, 13 26 C 18 26, 21 22, 21 18 C 21 14, 18 10, 13 10 C 13 10, 13 10, 13 10 C 13 10, 13 9, 13 9 Z M 3 2 C 2 3, 1 4, 1 6 C 1 8, 2 9, 3 10 C 4 10, 4 11, 4 11 L 4 25 C 4 25, 4 25, 3 25 C 2 26, 1 28, 1 30 C 1 33, 3 35, 6 35 C 9 35, 12 33, 12 30 C 12 28, 11 26, 9 25 C 9 25, 9 25, 9 25 L 9 11 C 9 11, 9 10, 9 10 C 11 9, 12 8, 12 6 C 12 4, 11 3, 9 2 L 9 7 C 9 7, 9 7, 9 7 L 7 9 C 6 9, 6 9, 6 9 L 4 7 C 3 7, 3 7, 3 7 L 3 2 Z M 4 0 C 4 0, 4 0, 4 0 C 4 0, 4 0, 4 1 L 4 6 L 6 8 L 8 6 L 8 1 C 8 0, 8 0, 9 0 C 9 0, 9 0, 9 0 C 11 1, 13 3, 13 6 C 13 8, 12 10, 10 11 L 10 24 C 12 26, 13 27, 13 30 C 13 33, 10 36, 6 36 C 3 36, 0 33, 0 30 C 0 27, 1 26, 3 24 L 3 11 C 1 10, 0 8, 0 6 C 0 3, 1 1, 4 0 Z M 13 0 L 15 0 C 15 0, 16 1, 16 1 L 16 3 C 17 3, 17 4, 18 4 L 19 2 C 19 2, 20 2, 20 2 C 20 1, 21 2, 21 2 L 23 3 C 24 3, 24 4, 24 5 L 23 7 C 23 7, 24 8, 24 8 L 26 7 C 26 7, 27 7, 27 7 C 27 7, 28 7, 28 8 L 29 10 C 29 10, 29 11, 29 11 C 29 12, 29 12, 29 12 L 27 13 C 27 14, 28 14, 28 15 L 30 15 C 30 15, 31 16, 31 17 L 31 19 C 31 20, 30 21, 30 21 L 28 21 C 28 21, 27 22, 27 23 L 29 24 C 29 24, 30 25, 29 26 L 28 28 C 28 28, 27 29, 27 29 C 27 29, 26 29, 26 29 L 24 28 C 24 28, 23 29, 23 29 L 24 31 C 24 31, 24 32, 23 33 L 21 34 C 21 34, 20 34, 20 34 C 20 34, 19 34, 19 34 L 18 32 C 17 32, 17 32, 16 32 L 16 34 C 16 35, 15 36, 15 36 L 13 36 C 12 36, 12 36, 12 35 C 12 35, 12 35, 13 35 L 15 35 C 15 35, 15 35, 15 34 L 15 32 C 15 32, 15 32, 15 31 C 16 31, 17 31, 18 31 C 18 31, 19 31, 19 31 L 20 33 C 20 33, 20 33, 20 33 C 20 33, 20 33, 21 33 L 23 32 C 23 32, 23 31, 23 31 L 22 29 C 22 29, 22 29, 22 29 C 23 28, 23 27, 24 27 C 24 26, 24 26, 25 26 L 27 28 C 27 28, 27 28, 27 28 C 27 28, 27 28, 27 27 L 28 25 C 28 25, 28 25, 28 25 C 28 25, 28 25, 28 25 L 26 24 C 26 23, 26 23, 26 23 C 26 22, 27 21, 27 20 C 27 20, 27 20, 27 20 L 30 20 C 30 20, 30 19, 30 19 L 30 17 C 30 16, 30 16, 30 16 L 27 16 C 27 16, 27 16, 27 16 C 27 15, 26 14, 26 13 C 26 13, 26 12, 26 12 L 28 11 C 28 11, 28 11, 28 11 C 28 11, 28 11, 28 11 L 27 8 C 27 8, 27 8, 27 8 C 27 8, 27 8, 27 8 L 25 9 C 24 10, 24 9, 24 9 C 23 9, 23 8, 22 7 C 22 7, 22 7, 22 6 L 23 4 C 23 4, 23 4, 23 4 L 21 3 C 20 3, 20 3, 20 3 C 20 3, 20 3, 20 3 L 19 5 C 19 5, 18 5, 18 5 C 17 5, 16 4, 15 4 C 15 4, 15 4, 15 4 L 15 1 C 15 1, 15 1, 15 1 L 13 1 C 12 1, 12 1, 12 1 C 12 0, 12 0, 13 0 Z"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 2,
    "x": 651,
    "y": 249,
    "width": 32,
    "height": 36,
    "fillColor": "#ffffff",
    "pathD": "M 13 33 L 13 33 C 13 34, 13 35, 14 35 L 18 35 C 19 35, 19 34, 19 33 L 19 33 L 13 33 Z M 11 29 L 11 31 C 11 32, 11 32, 12 32 L 20 32 C 21 32, 21 32, 21 31 L 21 29 L 11 29 Z M 25 13 C 26 13, 26 13, 26 13 C 26 13, 26 14, 26 14 L 16 24 C 16 24, 16 24, 16 24 C 16 24, 16 24, 16 24 L 11 20 C 11 19, 11 19, 11 19 C 12 19, 12 19, 12 19 L 16 23 L 25 13 Z M 16 9 C 16 9, 16 9, 16 10 C 16 10, 16 10, 16 10 C 13 10, 10 12, 10 15 C 10 16, 10 16, 10 16 C 10 16, 9 16, 9 16 C 9 16, 9 16, 9 15 C 10 12, 12 9, 16 9 Z M 16 6 C 19 6, 22 7, 24 10 C 25 10, 24 11, 24 11 C 24 11, 24 11, 24 11 C 22 8, 19 7, 16 7 C 11 7, 7 11, 7 17 C 7 19, 8 21, 9 23 C 10 24, 11 26, 11 27 L 11 28 L 21 28 L 21 27 C 21 26, 22 24, 23 23 C 24 22, 25 20, 25 18 C 25 18, 26 18, 26 18 C 26 18, 26 18, 26 18 C 26 20, 25 22, 23 24 C 23 25, 22 26, 22 27 L 22 31 C 22 32, 21 33, 20 33 L 20 33 L 20 33 C 20 35, 19 36, 18 36 L 14 36 C 13 36, 12 35, 12 33 L 12 33 C 11 33, 10 32, 10 31 L 10 27 C 10 26, 10 25, 9 24 C 7 22, 6 19, 6 17 C 6 11, 10 6, 16 6 Z M 16 0 C 25 0, 32 7, 32 16 C 32 22, 29 27, 25 30 C 25 30, 25 30, 24 30 C 24 30, 24 29, 24 29 C 29 26, 31 21, 31 16 C 31 8, 24 1, 16 1 C 8 1, 1 8, 1 16 L 1 32 L 7 32 C 7 32, 8 32, 8 32 C 8 33, 7 33, 7 33 L 1 33 C 0 33, 0 33, 0 32 L 0 16 C 0 7, 7 0, 16 0 Z"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 1,
    "x": 926,
    "y": 137,
    "width": 35,
    "height": 35,
    "fillColor": "#ffffff",
    "pathD": "M 29 26 L 29 29 L 34 29 L 34 26 L 29 26 Z M 5 26 L 5 29 L 11 29 L 11 26 L 5 26 Z M 23 19 L 24 19 L 23 20 L 23 19 Z M 29 17 L 29 21 L 34 21 L 34 17 L 29 17 Z M 5 17 L 5 21 L 11 21 L 11 17 L 5 17 Z M 28 17 L 25 18 L 23 18 L 23 17 L 28 17 Z M 29 9 L 29 12 L 34 12 L 34 9 L 29 9 Z M 5 9 L 5 12 L 11 12 L 11 9 L 5 9 Z M 5 8 L 11 8 C 11 8, 12 8, 12 8 L 12 10 L 28 10 L 28 8 C 28 8, 28 8, 28 8 L 34 8 C 35 8, 35 8, 35 8 L 35 13 C 35 13, 35 13, 34 13 L 32 13 L 32 16 L 34 16 C 35 16, 35 17, 35 17 L 35 21 C 35 21, 35 22, 34 22 L 32 22 L 32 25 L 34 25 C 35 25, 35 25, 35 25 L 35 30 C 35 30, 35 30, 34 30 L 28 30 C 28 30, 28 30, 28 30 L 28 25 C 28 25, 28 25, 28 25 L 31 25 L 31 22 L 28 22 C 28 22, 28 21, 28 21 L 28 19 L 24 19 L 25 18 L 28 18 L 28 17 C 28 17, 28 16, 28 16 L 31 16 L 31 13 L 28 13 C 28 13, 28 13, 28 13 L 28 11 L 12 11 L 12 13 C 12 13, 11 13, 11 13 L 8 13 L 8 16 L 11 16 C 11 16, 12 17, 12 17 L 12 18 L 16 18 L 16 17 C 16 17, 16 16, 16 16 L 23 16 C 23 16, 23 17, 23 17 L 23 17 L 22 17 L 17 17 L 17 21 L 22 21 L 23 20 L 23 21 C 23 21, 23 22, 23 22 L 20 22 L 20 27 C 20 28, 20 28, 20 28 L 12 28 L 12 30 C 12 30, 11 30, 11 30 L 5 30 C 4 30, 4 30, 4 30 L 4 25 C 4 25, 4 25, 5 25 L 11 25 C 11 25, 12 25, 12 25 L 12 27 L 19 27 L 19 22 L 16 22 C 16 22, 16 21, 16 21 L 16 19 L 12 19 L 12 21 C 12 21, 11 22, 11 22 L 5 22 C 4 22, 4 21, 4 21 L 4 17 C 4 17, 4 16, 5 16 L 7 16 L 7 13 L 5 13 C 4 13, 4 13, 4 13 L 4 8 C 4 8, 4 8, 5 8 Z M 9 1 L 9 2 C 9 3, 9 4, 10 4 L 19 4 C 19 4, 20 3, 20 2 L 20 1 L 9 1 Z M 3 0 L 26 0 C 28 0, 29 1, 29 3 L 29 5 C 29 6, 28 6, 28 6 C 28 6, 28 6, 28 5 L 28 3 C 28 2, 27 1, 26 1 L 21 1 L 21 2 C 21 3, 20 5, 19 5 L 10 5 C 9 5, 7 3, 7 2 L 7 1 L 3 1 C 2 1, 1 2, 1 3 L 1 32 C 1 33, 2 34, 3 34 L 26 34 C 27 34, 28 33, 28 32 C 28 32, 28 32, 28 32 C 28 32, 29 32, 29 32 C 29 34, 28 35, 26 35 L 3 35 C 1 35, 0 34, 0 32 L 0 3 C 0 1, 1 0, 3 0 Z"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 820,
    "y": 137,
    "width": 35,
    "height": 35,
    "fillColor": "#ffffff",
    "pathD": "M 18 4 L 13 15 L 19 14 C 19 14, 19 14, 19 14 C 19 14, 19 14, 19 14 C 19 14, 19 15, 19 15 L 19 23 L 24 11 L 18 12 C 18 12, 18 12, 18 12 C 18 12, 18 12, 18 11 L 18 4 Z M 22 2 L 23 2 C 24 2, 25 3, 25 4 L 25 6 L 29 6 C 30 6, 31 7, 31 8 L 31 10 L 33 10 C 34 10, 35 11, 35 12 L 35 16 C 35 18, 34 18, 33 18 L 31 18 L 31 19 C 31 20, 30 21, 29 21 L 25 21 L 25 22 C 25 23, 24 24, 23 24 L 22 24 C 22 24, 22 24, 22 24 C 22 23, 22 23, 22 23 L 23 23 C 24 23, 24 23, 24 22 L 24 21 C 24 21, 24 20, 24 20 C 24 20, 24 20, 25 20 L 29 20 C 29 20, 30 20, 30 19 L 30 16 C 30 15, 30 15, 30 15 C 31 15, 31 15, 31 16 L 31 17 L 33 17 C 34 17, 34 17, 34 16 L 34 12 C 34 12, 34 11, 33 11 L 29 11 L 29 14 C 29 15, 28 15, 28 15 C 28 15, 28 15, 28 14 L 28 11 C 28 11, 28 10, 28 10 L 30 10 L 30 8 C 30 7, 29 7, 29 7 L 24 7 C 24 7, 24 7, 24 7 L 24 4 C 24 4, 23 3, 23 3 L 22 3 C 21 3, 21 3, 21 3 C 21 2, 21 2, 22 2 Z M 14 2 L 15 2 C 15 2, 15 2, 15 3 C 15 3, 15 3, 15 3 L 14 3 C 13 3, 13 4, 13 4 L 13 8 C 13 8, 13 8, 12 8 C 12 8, 12 8, 12 8 L 12 7 L 6 7 C 6 7, 5 7, 5 8 L 5 10 L 9 10 C 9 10, 9 10, 9 11 L 9 16 C 9 16, 9 17, 9 17 C 8 17, 8 16, 8 16 L 8 11 L 2 11 C 1 11, 1 12, 1 12 L 1 22 C 1 23, 1 23, 2 23 L 8 23 L 8 20 L 5 20 C 5 20, 4 20, 4 19 C 4 19, 5 19, 5 19 L 8 19 C 9 19, 9 19, 9 19 L 9 33 C 9 34, 9 34, 10 34 L 11 34 C 12 34, 12 34, 12 33 L 12 28 C 12 27, 12 27, 13 27 C 13 27, 13 27, 13 28 L 13 30 L 14 30 C 14 30, 15 30, 15 30 L 15 24 L 13 24 C 13 24, 13 24, 13 23 L 13 19 C 13 19, 13 19, 13 19 C 13 19, 14 19, 14 19 L 14 23 L 15 23 C 16 23, 16 23, 16 23 L 16 30 C 16 31, 15 31, 14 31 L 13 31 L 13 33 C 13 34, 12 35, 11 35 L 10 35 C 9 35, 8 34, 8 33 L 8 24 L 2 24 C 1 24, 0 23, 0 22 L 0 12 C 0 11, 1 10, 2 10 L 4 10 L 4 8 C 4 7, 5 6, 6 6 L 12 6 L 12 4 C 12 3, 13 2, 14 2 Z M 18 0 C 18 0, 19 0, 19 1 L 19 11 L 24 10 C 25 10, 25 10, 25 10 C 25 10, 25 10, 25 10 L 19 26 C 19 26, 19 26, 19 26 C 19 26, 19 26, 19 26 C 18 26, 18 26, 18 26 L 18 15 L 13 17 C 12 17, 12 17, 12 16 C 12 16, 12 16, 12 16 L 18 0 C 18 0, 18 0, 18 0 Z"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 5,
    "x": 1093,
    "y": 249,
    "width": 35,
    "height": 36,
    "fillColor": "#ffffff",
    "pathD": "M 15 32 L 15 34 C 15 34, 15 35, 16 35 L 19 35 C 20 35, 20 35, 20 35 C 20 34, 20 34, 20 34 L 20 32 L 15 32 Z M 26 26 L 26 30 L 29 30 L 29 26 L 26 26 Z M 6 26 L 6 30 L 9 30 L 9 26 L 6 26 Z M 27 23 C 28 23, 28 23, 28 24 L 28 25 L 29 25 C 30 25, 30 26, 30 26 L 30 30 C 30 31, 30 31, 29 31 L 25 31 C 25 31, 25 31, 25 30 L 25 29 L 23 29 C 23 29, 23 28, 23 28 C 23 28, 23 28, 23 28 L 25 28 L 25 26 C 25 26, 25 25, 25 25 L 27 25 L 27 24 C 27 23, 27 23, 27 23 Z M 8 23 C 8 23, 8 23, 8 24 L 8 25 L 10 25 C 10 25, 10 26, 10 26 L 10 28 L 12 28 C 12 28, 12 28, 12 28 C 12 28, 12 29, 12 29 L 10 29 L 10 30 C 10 31, 10 31, 10 31 L 6 31 C 5 31, 5 31, 5 30 L 5 26 C 5 26, 5 25, 6 25 L 7 25 L 7 24 C 7 23, 7 23, 8 23 Z M 18 17 L 18 31 L 20 31 L 20 17 L 18 17 Z M 15 17 L 15 31 L 17 31 L 17 17 L 15 17 Z M 28 16 C 28 16, 28 16, 28 16 L 28 20 C 28 20, 28 20, 28 20 C 27 20, 27 20, 27 20 L 27 16 C 27 16, 27 16, 28 16 Z M 8 16 C 8 16, 8 16, 8 16 L 8 20 C 8 20, 8 20, 8 20 C 8 20, 7 20, 7 20 L 7 16 C 7 16, 8 16, 8 16 Z M 18 12 L 15 16 L 20 16 L 18 12 Z M 18 11 C 18 11, 18 11, 18 11 L 21 16 C 21 16, 21 16, 21 17 L 21 31 L 22 31 C 22 31, 22 32, 22 32 C 22 32, 22 32, 22 32 L 21 32 L 21 34 C 21 34, 21 35, 21 35 C 20 36, 20 36, 19 36 L 16 36 C 15 36, 14 35, 14 34 L 14 32 L 14 32 C 13 32, 13 32, 13 32 C 13 32, 13 31, 14 31 L 14 31 L 14 17 C 14 16, 14 16, 14 16 L 17 11 C 17 11, 17 11, 18 11 Z M 16 7 L 19 7 C 20 7, 20 8, 20 8 C 20 8, 20 9, 19 9 L 16 9 C 15 9, 15 8, 15 8 C 15 8, 15 7, 16 7 Z M 6 6 L 6 9 L 9 9 L 9 6 L 6 6 Z M 25 5 C 26 5, 26 5, 26 6 L 26 9 L 29 9 C 30 9, 30 10, 30 10 C 30 10, 30 10, 29 10 L 28 10 L 28 12 C 28 12, 28 13, 27 13 C 27 13, 27 12, 27 12 L 27 10 L 25 10 C 25 10, 25 10, 25 10 L 25 8 L 23 8 C 23 8, 23 8, 23 8 C 23 7, 23 7, 23 7 L 25 7 L 25 6 C 25 5, 25 5, 25 5 Z M 6 5 L 10 5 C 10 5, 10 5, 10 6 L 10 7 L 12 7 C 12 7, 12 7, 12 8 C 12 8, 12 8, 12 8 L 10 8 L 10 10 C 10 10, 10 10, 10 10 L 8 10 L 8 12 C 8 12, 8 13, 8 13 C 7 13, 7 12, 7 12 L 7 10 L 6 10 C 5 10, 5 10, 5 10 L 5 6 C 5 5, 5 5, 6 5 Z M 29 2 L 29 7 L 33 7 L 29 2 Z M 1 0 L 28 0 C 28 0, 28 0, 29 0 L 35 7 C 35 7, 35 7, 35 7 L 35 35 C 35 36, 35 36, 34 36 L 23 36 C 23 36, 23 36, 23 35 C 23 35, 23 35, 23 35 L 34 35 L 34 8 L 28 8 C 28 8, 28 7, 28 7 L 28 1 L 1 1 L 1 35 L 12 35 C 12 35, 12 35, 12 35 C 12 36, 12 36, 12 36 L 1 36 C 0 36, 0 36, 0 35 L 0 1 C 0 0, 0 0, 1 0 Z"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 9,
    "x": 1115,
    "y": 447,
    "width": 36,
    "height": 36,
    "fillColor": "#ffffff",
    "pathD": "M 32 16 L 30 14 L 32 11 L 35 14 L 32 16 Z M 24 18 L 20 20 C 20 20, 20 20, 20 20 L 18 24 L 15 15 L 24 18 Z M 12 15 L 10 12 L 12 10 L 15 12 L 12 15 Z M 14 30 L 16 32 L 14 35 L 11 32 L 14 30 Z M 4 23 L 4 23 C 4 23, 2 23, 2 23 C 1 22, 1 21, 2 20 C 2 20, 3 20, 3 20 C 3 20, 4 20, 4 20 C 5 21, 5 22, 4 23 Z M 20 2 L 20 2 C 21 1, 21 1, 21 1 C 22 1, 22 1, 23 2 C 23 2, 23 4, 23 4 C 22 5, 21 5, 20 4 C 20 4, 20 3, 20 3 C 20 3, 20 2, 20 2 Z M 36 13 L 33 10 C 32 10, 32 10, 32 10 L 31 12 C 27 8, 21 7, 16 9 L 20 5 C 20 6, 21 6, 21 6 C 22 6, 23 5, 23 5 C 24 4, 24 2, 23 1 C 22 0, 21 0, 19 1 C 19 2, 19 2, 19 3 C 19 4, 19 4, 19 5 L 14 10 L 13 9 C 12 9, 12 9, 12 9 L 9 12 C 8 12, 8 12, 9 13 L 10 14 L 5 19 C 4 18, 2 19, 1 20 C 0 21, 0 22, 1 23 C 2 24, 2 24, 3 24 C 4 24, 4 24, 5 23 C 6 23, 6 21, 5 20 L 9 16 C 7 21, 8 27, 12 31 L 10 32 C 10 32, 10 32, 10 33 L 13 36 C 14 36, 14 36, 14 36 C 14 36, 14 36, 14 36 L 17 33 C 18 32, 18 32, 17 32 L 14 29 C 14 29, 14 29, 13 29 L 12 30 C 10 28, 9 25, 9 21 C 9 19, 10 17, 11 15 L 12 16 C 12 16, 12 16, 12 16 C 12 16, 13 16, 13 16 L 14 15 L 17 26 C 17 26, 18 26, 18 26 C 18 26, 18 26, 18 26 C 18 26, 18 26, 18 26 L 21 21 L 26 18 C 26 18, 26 18, 26 18 C 26 18, 26 17, 26 17 L 15 14 L 16 13 C 16 12, 16 12, 16 12 L 15 11 C 17 10, 19 9, 21 9 C 25 9, 28 10, 30 12 L 29 13 C 28 14, 28 14, 29 14 L 32 17 C 32 17, 32 18, 32 18 C 32 18, 32 17, 33 17 L 36 14 C 36 14, 36 14, 36 13 Z"
  },
  {
    "id": "sp-25",
    "x": 477,
    "y": 137,
    "width": 10,
    "height": 500,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 0,
    "x": 55,
    "y": 216,
    "width": 308,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-20",
    "x": 49,
    "y": 172,
    "width": 110,
    "height": 36,
    "text": "Planning",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 55,
    "y": 288,
    "width": 308,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 2,
    "x": 55,
    "y": 364,
    "width": 308,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
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

export function Imported2025migsopcubedcreativeandexampletemplates17Template({ data }: { data: BrainData }): ReactElement {
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
