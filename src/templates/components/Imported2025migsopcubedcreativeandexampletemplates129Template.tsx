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
        "id": "grp-1",
        "isGroup": true,
        "children": [
          {
            "id": "sp-21",
            "x": 278.8650306748466,
            "y": 385,
            "width": 262.0368098159509,
            "height": 268,
            "localPctX": 0.28921998247151615,
            "localPctY": 0.5,
            "localPctW": 0.49255039439088516,
            "localPctH": 0.5,
            "fillColor": "#ffb900",
            "pathD": "M 191 0 C 201 8, 212 14, 224 18 C 236 22, 249 24, 262 24 C 241 25, 221 36, 211 53 C 201 70, 201 91, 211 108 C 233 141, 232 180, 214 211 C 197 242, 163 265, 120 268 C 91 270, 63 261, 42 245 C 20 230, 5 207, 0 180 C 12 176, 24 170, 34 162 C 44 154, 53 144, 60 134 C 45 158, 51 184, 68 201 C 85 217, 113 224, 140 212 C 156 205, 167 192, 171 177 C 175 163, 174 147, 165 133 C 151 111, 147 84, 152 59 C 158 36, 171 15, 191 0 Z"
          },
          {
            "id": "sp-22",
            "x": 240.1656441717791,
            "y": 117,
            "width": 263.43558282208585,
            "height": 268,
            "localPctX": 0.21647677475898325,
            "localPctY": 0,
            "localPctW": 0.495179666958808,
            "localPctH": 0.5,
            "fillColor": "#3365cc",
            "pathD": "M 73 268 C 63 260, 51 254, 38 249 C 26 245, 13 243, 0 243 C 22 243, 42 232, 53 214 C 63 196, 63 175, 52 158 C 15 99, 48 24, 119 4 C 152 -5, 185 1, 212 16 C 238 32, 258 57, 263 88 C 251 92, 240 98, 230 105 C 220 113, 211 123, 204 134 C 215 115, 214 94, 203 78 C 193 61, 174 50, 151 50 C 102 49, 73 99, 99 137 C 112 157, 116 181, 112 204 C 108 229, 94 252, 73 268 Z"
          },
          {
            "id": "sp-23",
            "x": 339.01226993865026,
            "y": 198.43408360128618,
            "width": 318.4539877300613,
            "height": 186.56591639871382,
            "localPctX": 0.40227870289219975,
            "localPctY": 0.15192926045016078,
            "localPctW": 0.5985977212971078,
            "localPctH": 0.34807073954983925,
            "fillColor": "#ff4d38",
            "pathD": "M 0 54 C 13 73, 36 83, 59 80 C 80 78, 98 67, 107 49 C 129 17, 165 1, 201 0 C 238 -1, 274 15, 298 46 C 315 68, 321 94, 317 119 C 314 145, 300 169, 277 187 C 268 179, 257 173, 245 169 C 233 165, 220 162, 208 162 C 230 160, 248 148, 258 132 C 267 116, 268 96, 257 78 C 233 39, 173 40, 150 79 C 137 98, 119 113, 96 122 C 70 132, 40 133, 13 124 C 15 112, 15 100, 13 88 C 11 76, 6 65, 0 54 Z"
          },
          {
            "id": "sp-24",
            "x": 429.93251533742324,
            "y": 278.14469453376205,
            "width": 227.06748466257667,
            "height": 292.9903536977492,
            "localPctX": 0.5731814198071865,
            "localPctY": 0.30064308681672025,
            "localPctW": 0.4268185801928133,
            "localPctH": 0.5466237942122186,
            "fillColor": "#52c49c",
            "pathD": "M 58 0 C 49 17, 50 37, 60 54 C 71 71, 91 82, 112 82 C 186 82, 241 146, 224 212 C 216 243, 194 267, 166 281 C 139 294, 106 297, 74 287 C 76 275, 76 263, 74 251 C 71 238, 67 226, 60 215 C 72 236, 95 245, 117 244 C 139 242, 160 230, 169 208 C 177 190, 174 171, 163 156 C 153 141, 134 131, 112 131 C 84 131, 57 121, 36 104 C 17 88, 4 67, 0 44 C 12 40, 23 34, 33 26 C 43 19, 51 10, 58 0 Z"
          },
          {
            "id": "sp-25",
            "x": 125,
            "y": 385,
            "width": 318.4539877300613,
            "height": 186.56591639871382,
            "localPctX": 0,
            "localPctY": 0.5,
            "localPctW": 0.5985977212971078,
            "localPctH": 0.34807073954983925,
            "fillColor": "#ee6d90",
            "pathD": "M 305 63 C 303 74, 303 86, 305 98 C 307 110, 312 122, 318 133 C 307 116, 287 105, 265 106 C 243 106, 224 118, 214 135 C 193 167, 157 185, 121 186 C 83 188, 45 174, 21 142 C 3 120, -3 93, 1 67 C 5 42, 18 18, 41 0 C 51 8, 63 14, 75 18 C 88 23, 101 25, 114 25 C 87 25, 67 40, 58 60 C 49 81, 53 106, 74 123 C 89 136, 108 139, 126 136 C 143 133, 159 123, 168 108 C 183 85, 206 69, 233 61 C 256 54, 282 55, 305 63 Z"
          },
          {
            "id": "sp-26",
            "x": 125.46625766871165,
            "y": 198.0032154340836,
            "width": 227.06748466257667,
            "height": 296.00643086816723,
            "localPctX": 0.0008764241893076098,
            "localPctY": 0.1511254019292604,
            "localPctW": 0.4268185801928133,
            "localPctH": 0.552250803858521,
            "fillColor": "#4a90d9",
            "pathD": "M 227 249 C 215 253, 204 259, 194 267 C 183 275, 174 285, 167 296 C 178 279, 178 258, 168 240 C 157 222, 136 211, 114 211 C 83 211, 56 201, 35 182 C 14 164, 1 139, 0 110 C -1 72, 18 40, 47 21 C 76 1, 116 -6, 154 7 C 152 18, 152 29, 153 40 C 155 52, 159 64, 165 75 C 139 39, 80 42, 59 81 C 39 119, 70 163, 115 162 C 143 162, 170 171, 190 188 C 210 204, 223 226, 227 249 Z"
          },
          {
            "id": "sp-27",
            "x": 445.3190184049079,
            "y": 174.30546623794214,
            "width": 58.74846625766871,
            "height": 74.54019292604502,
            "localPctX": 0.6021034180543382,
            "localPctY": 0.10691318327974281,
            "localPctW": 0.11042944785276074,
            "localPctH": 0.13906752411575565,
            "fillColor": "#3365cc",
            "pathD": "M 0 75 C 4 67, 7 58, 7 49 C 7 41, 5 32, 1 25 C 8 19, 16 14, 24 10 C 31 6, 39 3, 48 0 C 50 5, 52 10, 54 15 C 56 20, 58 25, 59 30 C 48 34, 38 39, 29 45 C 17 53, 7 63, 0 75 Z"
          },
          {
            "id": "sp-28",
            "x": 546.4969325153374,
            "y": 335.88102893890675,
            "width": 92.78527607361963,
            "height": 48.68810289389068,
            "localPctX": 0.7922874671340929,
            "localPctY": 0.4083601286173633,
            "localPctW": 0.17440841367221735,
            "localPctH": 0.09083601286173634,
            "fillColor": "#ff4d38",
            "pathD": "M 0 24 C 10 24, 20 21, 29 16 C 36 11, 42 6, 46 0 C 55 3, 63 6, 71 10 C 78 15, 86 19, 93 25 C 90 29, 86 33, 83 37 C 79 41, 75 45, 70 49 C 61 41, 50 35, 38 31 C 26 27, 13 25, 0 24 Z"
          },
          {
            "id": "sp-29",
            "x": 446.2515337423312,
            "y": 384.56913183279744,
            "width": 94.1840490797546,
            "height": 49.54983922829582,
            "localPctX": 0.6038562664329534,
            "localPctY": 0.4991961414790997,
            "localPctW": 0.17703768624014024,
            "localPctH": 0.09244372990353698,
            "fillColor": "#ffb900",
            "pathD": "M 23 0 C 19 3, 15 7, 11 11 C 7 15, 3 20, 0 25 C 7 30, 14 35, 22 39 C 30 43, 38 47, 46 50 C 51 42, 59 36, 67 32 C 75 27, 85 25, 94 24 C 82 24, 69 22, 58 19 C 45 14, 33 8, 23 0 Z"
          },
          {
            "id": "sp-30",
            "x": 393.5644171779141,
            "y": 441.443729903537,
            "width": 48.95705521472392,
            "height": 74.9710610932476,
            "localPctX": 0.5048203330411919,
            "localPctY": 0.6053054662379422,
            "localPctW": 0.09202453987730061,
            "localPctH": 0.13987138263665597,
            "fillColor": "#ee6d90",
            "pathD": "M 2 0 C 1 8, 0 16, 0 24 C 0 32, 1 41, 2 49 C 11 50, 20 53, 28 57 C 36 61, 44 67, 49 75 C 43 64, 38 53, 36 40 C 34 29, 34 17, 36 6 C 31 4, 25 3, 19 2 C 13 1, 8 0, 2 0 Z"
          },
          {
            "id": "sp-31",
            "x": 490.07975460122697,
            "y": 493.57877813504825,
            "width": 49.42331288343558,
            "height": 77.55627009646302,
            "localPctX": 0.6862401402278703,
            "localPctY": 0.7025723472668811,
            "localPctW": 0.09290096406660824,
            "localPctH": 0.14469453376205788,
            "fillColor": "#52c49c",
            "pathD": "M 14 72 C 20 74, 25 75, 31 76 C 36 77, 42 77, 47 78 C 49 69, 49 61, 49 53 C 49 44, 49 36, 47 28 C 38 27, 29 24, 21 20 C 12 15, 5 8, 0 0 C 6 10, 11 22, 13 34 C 16 46, 16 59, 14 72 Z"
          },
          {
            "id": "sp-32",
            "x": 278.8650306748466,
            "y": 521.1543408360128,
            "width": 58.74846625766871,
            "height": 74.9710610932476,
            "localPctX": 0.28921998247151615,
            "localPctY": 0.7540192926045015,
            "localPctW": 0.11042944785276074,
            "localPctH": 0.13987138263665597,
            "fillColor": "#ffb900",
            "pathD": "M 0 44 C 1 49, 2 55, 4 60 C 6 65, 8 70, 11 75 C 19 72, 28 69, 35 65 C 43 60, 50 55, 57 50 C 53 42, 51 33, 51 25 C 51 16, 54 8, 59 0 C 52 10, 43 19, 33 27 C 23 34, 12 40, 0 44 Z"
          },
          {
            "id": "sp-33",
            "x": 292.3865030674846,
            "y": 416.4533762057878,
            "width": 59.68098159509202,
            "height": 77.9871382636656,
            "localPctX": 0.3146362839614373,
            "localPctY": 0.5586816720257235,
            "localPctW": 0.11218229623137597,
            "localPctH": 0.14549839228295822,
            "fillColor": "#4a90d9",
            "pathD": "M 0 78 C 5 70, 8 61, 8 51 C 8 42, 6 33, 2 25 C 9 19, 17 15, 24 11 C 32 6, 40 3, 49 0 C 51 5, 54 10, 56 15 C 57 20, 59 26, 60 31 C 49 35, 38 40, 29 47 C 17 55, 7 66, 0 78 Z"
          },
          {
            "id": "sp-34",
            "x": 142.71779141104292,
            "y": 385,
            "width": 96.98159509202453,
            "height": 49.54983922829582,
            "localPctX": 0.03330411919368971,
            "localPctY": 0.5,
            "localPctW": 0.18229623137598597,
            "localPctH": 0.09244372990353698,
            "fillColor": "#ee6d90",
            "pathD": "M 23 0 C 19 4, 14 7, 10 12 C 7 16, 3 20, 0 24 C 7 30, 14 35, 21 39 C 29 43, 37 47, 46 50 C 52 41, 60 35, 70 30 C 78 26, 87 24, 97 24 C 83 25, 69 22, 56 18 C 44 14, 33 8, 23 0 Z"
          },
          {
            "id": "sp-35",
            "x": 240.1656441717791,
            "y": 198.0032154340836,
            "width": 49.889570552147234,
            "height": 74.10932475884245,
            "localPctX": 0.21647677475898325,
            "localPctY": 0.1511254019292604,
            "localPctW": 0.09377738825591585,
            "localPctH": 0.1382636655948553,
            "fillColor": "#4a90d9",
            "pathD": "M 38 7 C 32 5, 26 3, 20 2 C 14 1, 8 0, 2 0 C 1 8, 0 17, 0 25 C 0 33, 1 42, 2 50 C 11 50, 19 52, 27 56 C 36 60, 44 66, 50 74 C 44 63, 40 52, 38 40 C 36 29, 36 18, 38 7 Z"
          },
          {
            "id": "sp-36",
            "x": 242.03067484662574,
            "y": 336.3118971061093,
            "width": 93.25153374233128,
            "height": 48.68810289389068,
            "localPctX": 0.2199824715162138,
            "localPctY": 0.40916398713826363,
            "localPctW": 0.17528483786152496,
            "localPctH": 0.09083601286173634,
            "fillColor": "#3365cc",
            "pathD": "M 0 24 C 9 24, 19 21, 27 17 C 35 13, 42 7, 47 0 C 56 3, 64 7, 72 11 C 79 15, 86 20, 93 25 C 90 30, 87 34, 84 38 C 80 42, 76 45, 71 49 C 61 41, 50 35, 38 31 C 26 27, 13 24, 0 24 Z"
          },
          {
            "id": "sp-37",
            "x": 339.47852760736197,
            "y": 253.15434083601286,
            "width": 50.355828220858896,
            "height": 75.40192926045016,
            "localPctX": 0.40315512708150747,
            "localPctY": 0.2540192926045016,
            "localPctW": 0.09465381244522349,
            "localPctH": 0.14067524115755628,
            "fillColor": "#000000",
            "pathD": "M 0 0 C 5 8, 13 14, 22 19 C 30 23, 39 26, 48 26 C 49 34, 50 42, 50 50 C 50 59, 50 67, 48 75 C 42 75, 37 75, 31 74 C 25 73, 19 71, 13 69 C 15 58, 15 46, 13 34 C 11 22, 6 11, 0 0 Z"
          },
          {
            "id": "sp-38",
            "x": 430.39877300613495,
            "y": 279.86816720257235,
            "width": 56.88343558282208,
            "height": 72.38585209003216,
            "localPctX": 0.5740578439964943,
            "localPctY": 0.30385852090032156,
            "localPctW": 0.10692375109553023,
            "localPctH": 0.13504823151125403,
            "fillColor": "#52c49c",
            "pathD": "M 57 0 C 53 7, 51 16, 51 24 C 51 32, 53 40, 57 47 C 50 53, 43 58, 35 62 C 27 66, 19 70, 11 72 C 8 68, 6 63, 4 58 C 2 53, 1 47, 0 42 C 12 38, 23 33, 32 25 C 42 18, 50 10, 57 0 Z"
          }
        ],
        "x": 125,
        "y": 117,
        "width": 532,
        "height": 536,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1
      },
      {
        "id": "sp-15",
        "x": 336.68098159509196,
        "y": 193.69453376205786,
        "width": 109.1042944785276,
        "height": 48.68810289389068,
        "localPctX": 0.3978965819456616,
        "localPctY": 0.1430868167202572,
        "localPctW": 0.2050832602979842,
        "localPctH": 0.09083601286173634,
        "text": "MASS ProductION",
        "textSize": 12
      },
      {
        "id": "sp-16",
        "x": 334.81595092024537,
        "y": 515.5530546623795,
        "width": 112.3680981595092,
        "height": 62.90675241157557,
        "localPctX": 0.39439088518843113,
        "localPctY": 0.7435691318327976,
        "localPctW": 0.2112182296231376,
        "localPctH": 0.11736334405144695,
        "text": "MASS CUSTOMIZA- TION",
        "textSize": 12
      },
      {
        "id": "sp-17",
        "x": 485.41717791411037,
        "y": 288.0546623794212,
        "width": 116.09815950920245,
        "height": 27.14469453376206,
        "localPctX": 0.6774758983347939,
        "localPctY": 0.3191318327974276,
        "localPctW": 0.21822962313759858,
        "localPctH": 0.05064308681672026,
        "text": "JUST IN TIME",
        "textSize": 12
      },
      {
        "id": "sp-18",
        "x": 498.00613496932516,
        "y": 453.9389067524116,
        "width": 90.920245398773,
        "height": 27.14469453376206,
        "localPctX": 0.7011393514461,
        "localPctY": 0.6286173633440515,
        "localPctW": 0.17090271691498685,
        "localPctH": 0.05064308681672026,
        "text": "FLEXIBLE",
        "textSize": 12
      },
      {
        "id": "sp-19",
        "x": 207.5276073619632,
        "y": 287.6237942122186,
        "width": 64.80981595092024,
        "height": 27.14469453376206,
        "localPctX": 0.1551270815074496,
        "localPctY": 0.3183279742765273,
        "localPctW": 0.12182296231375984,
        "localPctH": 0.05064308681672026,
        "text": "RAPID",
        "textSize": 12
      },
      {
        "id": "sp-20",
        "x": 207.5276073619632,
        "y": 450.49196141479104,
        "width": 64.34355828220859,
        "height": 27.14469453376206,
        "localPctX": 0.1551270815074496,
        "localPctY": 0.622186495176849,
        "localPctW": 0.12094653812445223,
        "localPctH": 0.05064308681672026,
        "text": "AGILE",
        "textSize": 12
      }
    ],
    "x": 125,
    "y": 117,
    "width": 532,
    "height": 536
  },
  {
    "id": "sp-0",
    "x": 319,
    "y": 354,
    "width": 144,
    "height": 48,
    "text": "LEAN MANUFACTURE",
    "textSize": 12
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 3,
    "x": 784,
    "y": 390,
    "width": 373,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 4,
    "x": 784,
    "y": 475,
    "width": 373,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 2,
    "x": 784,
    "y": 305,
    "width": 373,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 1,
    "x": 784,
    "y": 220,
    "width": 373,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 5,
    "x": 784,
    "y": 560,
    "width": 373,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 784,
    "y": 135,
    "width": 373,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 745,
    "y": 140,
    "width": 21,
    "height": 21,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 745,
    "y": 225,
    "width": 21,
    "height": 21,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 745,
    "y": 310,
    "width": 21,
    "height": 21,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 745,
    "y": 395,
    "width": 21,
    "height": 21,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 745,
    "y": 480,
    "width": 21,
    "height": 21,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 745,
    "y": 565,
    "width": 21,
    "height": 21,
    "fillColor": "#4a90d9"
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

export function Imported2025migsopcubedcreativeandexampletemplates129Template({ data }: { data: BrainData }): ReactElement {
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
