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
            "id": "sp-15",
            "x": 219.01503759398497,
            "y": 231,
            "width": 82.48872180451129,
            "height": 77.6030534351145,
            "localPctX": 0.35150375939849626,
            "localPctY": 0,
            "localPctW": 0.29887218045112784,
            "localPctH": 0.5706106870229007,
            "fillColor": "#52c49c",
            "text": "",
            "pathD": "M 41 0 C 55 0, 69 2, 82 6 L 82 6 L 59 78 L 54 76 C 50 75, 45 75, 41 75 C 37 75, 32 75, 28 76 L 23 78 L 0 6 L 6 4 C 17 2, 29 0, 41 0 Z"
          },
          {
            "id": "sp-16",
            "x": 150.27443609022555,
            "y": 238.5267175572519,
            "width": 88.19548872180451,
            "height": 91.61832061068702,
            "localPctX": 0.10244360902255634,
            "localPctY": 0.055343511450381716,
            "localPctW": 0.31954887218045114,
            "localPctH": 0.6736641221374046,
            "fillColor": "#ff4d38",
            "text": "",
            "pathD": "M 65 0 L 88 71 L 85 73 C 76 77, 67 83, 61 91 L 60 92 L 0 47 L 3 43 C 19 24, 39 9, 62 1 L 65 0 Z"
          },
          {
            "id": "sp-17",
            "x": 281.53007518796994,
            "y": 238.78625954198475,
            "width": 88.97368421052632,
            "height": 91.87786259541984,
            "localPctX": 0.5780075187969925,
            "localPctY": 0.057251908396946674,
            "localPctW": 0.3223684210526316,
            "localPctH": 0.6755725190839694,
            "fillColor": "#ffb900",
            "text": "",
            "pathD": "M 24 0 L 26 1 C 51 10, 73 27, 89 48 L 89 48 L 28 92 L 27 90 C 21 82, 12 76, 3 72 L 0 71 L 24 0 Z"
          },
          {
            "id": "sp-18",
            "x": 122,
            "y": 288.618320610687,
            "width": 86.12030075187971,
            "height": 78.6412213740458,
            "localPctX": 0,
            "localPctY": 0.42366412213740456,
            "localPctW": 0.31203007518797,
            "localPctH": 0.5782442748091603,
            "text": "",
            "pathD": "M 26 0 L 86 45 L 86 45 C 80 54, 76 64, 75 74 L 75 79 L 0 79 L 0 74 C 1 48, 10 24, 24 3 L 26 0 Z"
          },
          {
            "id": "sp-19",
            "x": 312.3984962406015,
            "y": 290.17557251908397,
            "width": 85.6015037593985,
            "height": 77.08396946564885,
            "localPctX": 0.6898496240601504,
            "localPctY": 0.4351145038167939,
            "localPctW": 0.3101503759398496,
            "localPctH": 0.5667938931297709,
            "fillColor": "#ee6d90",
            "text": "",
            "pathD": "M 61 0 L 62 2 C 76 22, 84 46, 85 72 L 86 77 L 11 77 L 10 73 C 10 64, 7 56, 3 49 L 0 44 L 61 0 Z"
          }
        ],
        "x": 122,
        "y": 231,
        "width": 276,
        "height": 136,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1
      },
      {
        "id": "sp-12",
        "x": 198.36516853932585,
        "y": 308.1054131054131,
        "width": 122.88202247191012,
        "height": 58.5071225071225,
        "localPctX": 0.276685393258427,
        "localPctY": 0.566951566951567,
        "localPctW": 0.4452247191011236,
        "localPctH": 0.4301994301994302,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 61 0 C 93 0, 120 24, 123 56 L 123 59 L 0 59 L 0 56 C 3 24, 30 0, 61 0 Z"
      },
      {
        "id": "sp-13",
        "x": 211.1573033707865,
        "y": 305.39316239316236,
        "width": 10,
        "height": 92.99145299145299,
        "localPctX": 0.3230337078651685,
        "localPctY": 0.5470085470085467,
        "localPctW": 0.033707865168539325,
        "localPctH": 0.6837606837606838,
        "text": "",
        "pathD": "M 5 0 L 9.303370786516854 92.99145299145299 L 0 92.99145299145299 Z"
      },
      {
        "id": "sp-14",
        "x": 251.85955056179773,
        "y": 349.17663817663816,
        "width": 15.893258426966293,
        "height": 15.886039886039885,
        "localPctX": 0.470505617977528,
        "localPctY": 0.8689458689458689,
        "localPctW": 0.05758426966292135,
        "localPctH": 0.1168091168091168,
        "text": "",
        "pathD": "M 8 0 A 8 8 0 1 1 8 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 122,
    "y": 231,
    "width": 276,
    "height": 136
  },
  {
    "id": "grp-10",
    "isGroup": true,
    "children": [
      {
        "id": "grp-11",
        "isGroup": true,
        "children": [
          {
            "id": "sp-23",
            "x": 599.015037593985,
            "y": 231,
            "width": 82.48872180451129,
            "height": 77.6030534351145,
            "localPctX": 0.35150375939849626,
            "localPctY": 0,
            "localPctW": 0.29887218045112784,
            "localPctH": 0.5706106870229007,
            "fillColor": "#52c49c",
            "text": "",
            "pathD": "M 41 0 C 55 0, 69 2, 82 6 L 82 6 L 59 78 L 54 76 C 50 75, 45 75, 41 75 C 37 75, 32 75, 28 76 L 23 78 L 0 6 L 6 4 C 17 2, 29 0, 41 0 Z"
          },
          {
            "id": "sp-24",
            "x": 530.2744360902255,
            "y": 238.5267175572519,
            "width": 88.19548872180451,
            "height": 91.61832061068702,
            "localPctX": 0.10244360902255634,
            "localPctY": 0.055343511450381716,
            "localPctW": 0.31954887218045114,
            "localPctH": 0.6736641221374046,
            "fillColor": "#ff4d38",
            "text": "",
            "pathD": "M 65 0 L 88 71 L 85 73 C 76 77, 67 83, 61 91 L 60 92 L 0 47 L 3 43 C 19 24, 39 9, 62 1 L 65 0 Z"
          },
          {
            "id": "sp-25",
            "x": 661.5300751879699,
            "y": 238.78625954198475,
            "width": 88.97368421052632,
            "height": 91.87786259541984,
            "localPctX": 0.5780075187969925,
            "localPctY": 0.057251908396946674,
            "localPctW": 0.3223684210526316,
            "localPctH": 0.6755725190839694,
            "fillColor": "#ffb900",
            "text": "",
            "pathD": "M 24 0 L 26 1 C 51 10, 73 27, 89 48 L 89 48 L 28 92 L 27 90 C 21 82, 12 76, 3 72 L 0 71 L 24 0 Z"
          },
          {
            "id": "sp-26",
            "x": 502,
            "y": 288.618320610687,
            "width": 86.12030075187971,
            "height": 78.6412213740458,
            "localPctX": 0,
            "localPctY": 0.42366412213740456,
            "localPctW": 0.31203007518797,
            "localPctH": 0.5782442748091603,
            "text": "",
            "pathD": "M 26 0 L 86 45 L 86 45 C 80 54, 76 64, 75 74 L 75 79 L 0 79 L 0 74 C 1 48, 10 24, 24 3 L 26 0 Z"
          },
          {
            "id": "sp-27",
            "x": 692.3984962406015,
            "y": 290.17557251908397,
            "width": 85.6015037593985,
            "height": 77.08396946564885,
            "localPctX": 0.6898496240601504,
            "localPctY": 0.4351145038167939,
            "localPctW": 0.3101503759398496,
            "localPctH": 0.5667938931297709,
            "fillColor": "#ee6d90",
            "text": "",
            "pathD": "M 61 0 L 62 2 C 76 22, 84 46, 85 72 L 86 77 L 11 77 L 10 73 C 10 64, 7 56, 3 49 L 0 44 L 61 0 Z"
          }
        ],
        "x": 502,
        "y": 231,
        "width": 276,
        "height": 136,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1
      },
      {
        "id": "sp-20",
        "x": 578.3651685393259,
        "y": 308.1054131054131,
        "width": 122.88202247191012,
        "height": 58.5071225071225,
        "localPctX": 0.276685393258427,
        "localPctY": 0.566951566951567,
        "localPctW": 0.4452247191011236,
        "localPctH": 0.4301994301994302,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 61 0 C 93 0, 120 24, 123 56 L 123 59 L 0 59 L 0 56 C 3 24, 30 0, 61 0 Z"
      },
      {
        "id": "sp-21",
        "x": 635.3483146067415,
        "y": 261.6096866096866,
        "width": 10,
        "height": 92.99145299145299,
        "localPctX": 0.4831460674157301,
        "localPctY": 0.22507122507122504,
        "localPctW": 0.033707865168539325,
        "localPctH": 0.6837606837606838,
        "text": "",
        "pathD": "M 5 0 L 9.303370786516854 92.99145299145299 L 0 92.99145299145299 Z"
      },
      {
        "id": "sp-22",
        "x": 631.8595505617977,
        "y": 349.17663817663816,
        "width": 15.893258426966293,
        "height": 15.886039886039885,
        "localPctX": 0.470505617977528,
        "localPctY": 0.8689458689458689,
        "localPctW": 0.05758426966292135,
        "localPctH": 0.1168091168091168,
        "text": "",
        "pathD": "M 8 0 A 8 8 0 1 1 8 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 502,
    "y": 231,
    "width": 276,
    "height": 136
  },
  {
    "id": "grp-20",
    "isGroup": true,
    "children": [
      {
        "id": "grp-21",
        "isGroup": true,
        "children": [
          {
            "id": "sp-31",
            "x": 979.015037593985,
            "y": 231,
            "width": 82.48872180451129,
            "height": 77.6030534351145,
            "localPctX": 0.35150375939849626,
            "localPctY": 0,
            "localPctW": 0.29887218045112784,
            "localPctH": 0.5706106870229007,
            "fillColor": "#52c49c",
            "text": "",
            "pathD": "M 41 0 C 55 0, 69 2, 82 6 L 82 6 L 59 78 L 54 76 C 50 75, 45 75, 41 75 C 37 75, 32 75, 28 76 L 23 78 L 0 6 L 6 4 C 17 2, 29 0, 41 0 Z"
          },
          {
            "id": "sp-32",
            "x": 910.2744360902255,
            "y": 238.5267175572519,
            "width": 88.19548872180451,
            "height": 91.61832061068702,
            "localPctX": 0.10244360902255634,
            "localPctY": 0.055343511450381716,
            "localPctW": 0.31954887218045114,
            "localPctH": 0.6736641221374046,
            "fillColor": "#ff4d38",
            "text": "",
            "pathD": "M 65 0 L 88 71 L 85 73 C 76 77, 67 83, 61 91 L 60 92 L 0 47 L 3 43 C 19 24, 39 9, 62 1 L 65 0 Z"
          },
          {
            "id": "sp-33",
            "x": 1041.53007518797,
            "y": 238.78625954198475,
            "width": 88.97368421052632,
            "height": 91.87786259541984,
            "localPctX": 0.5780075187969925,
            "localPctY": 0.057251908396946674,
            "localPctW": 0.3223684210526316,
            "localPctH": 0.6755725190839694,
            "fillColor": "#ffb900",
            "text": "",
            "pathD": "M 24 0 L 26 1 C 51 10, 73 27, 89 48 L 89 48 L 28 92 L 27 90 C 21 82, 12 76, 3 72 L 0 71 L 24 0 Z"
          },
          {
            "id": "sp-34",
            "x": 882,
            "y": 288.618320610687,
            "width": 86.12030075187971,
            "height": 78.6412213740458,
            "localPctX": 0,
            "localPctY": 0.42366412213740456,
            "localPctW": 0.31203007518797,
            "localPctH": 0.5782442748091603,
            "text": "",
            "pathD": "M 26 0 L 86 45 L 86 45 C 80 54, 76 64, 75 74 L 75 79 L 0 79 L 0 74 C 1 48, 10 24, 24 3 L 26 0 Z"
          },
          {
            "id": "sp-35",
            "x": 1072.3984962406016,
            "y": 290.17557251908397,
            "width": 85.6015037593985,
            "height": 77.08396946564885,
            "localPctX": 0.6898496240601508,
            "localPctY": 0.4351145038167939,
            "localPctW": 0.3101503759398496,
            "localPctH": 0.5667938931297709,
            "fillColor": "#ee6d90",
            "text": "",
            "pathD": "M 61 0 L 62 2 C 76 22, 84 46, 85 72 L 86 77 L 11 77 L 10 73 C 10 64, 7 56, 3 49 L 0 44 L 61 0 Z"
          }
        ],
        "x": 882,
        "y": 231,
        "width": 276,
        "height": 136,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1
      },
      {
        "id": "sp-28",
        "x": 958.3651685393259,
        "y": 308.1054131054131,
        "width": 122.88202247191012,
        "height": 58.5071225071225,
        "localPctX": 0.276685393258427,
        "localPctY": 0.566951566951567,
        "localPctW": 0.4452247191011236,
        "localPctH": 0.4301994301994302,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 61 0 C 93 0, 120 24, 123 56 L 123 59 L 0 59 L 0 56 C 3 24, 30 0, 61 0 Z"
      },
      {
        "id": "sp-29",
        "x": 1060.7022471910113,
        "y": 305.005698005698,
        "width": 10,
        "height": 92.99145299145299,
        "localPctX": 0.6474719101123599,
        "localPctY": 0.5441595441595439,
        "localPctW": 0.033707865168539325,
        "localPctH": 0.6837606837606838,
        "text": "",
        "pathD": "M 5 0 L 9.303370786516854 92.99145299145299 L 0 92.99145299145299 Z"
      },
      {
        "id": "sp-30",
        "x": 1011.8595505617977,
        "y": 349.17663817663816,
        "width": 15.893258426966293,
        "height": 15.886039886039885,
        "localPctX": 0.470505617977528,
        "localPctY": 0.8689458689458689,
        "localPctW": 0.05758426966292135,
        "localPctH": 0.1168091168091168,
        "text": "",
        "pathD": "M 8 0 A 8 8 0 1 1 8 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 882,
    "y": 231,
    "width": 276,
    "height": 136
  },
  {
    "id": "grp-30",
    "isGroup": true,
    "children": [
      {
        "id": "grp-31",
        "isGroup": true,
        "children": [
          {
            "id": "sp-39",
            "x": 409.01503759398497,
            "y": 510,
            "width": 82.48872180451129,
            "height": 77.76403577977739,
            "localPctX": 0.35150375939849626,
            "localPctY": 0,
            "localPctW": 0.29887218045112784,
            "localPctH": 0.5706106870229007,
            "fillColor": "#52c49c",
            "text": "",
            "pathD": "M 41 0 C 55 0, 69 2, 82 6 L 82 6 L 59 78 L 54 76 C 50 76, 45 75, 41 75 C 37 75, 32 76, 28 76 L 23 78 L 0 6 L 6 4 C 17 2, 29 0, 41 0 Z"
          },
          {
            "id": "sp-40",
            "x": 340.27443609022555,
            "y": 517.5423312294768,
            "width": 88.19548872180451,
            "height": 91.80837668983753,
            "localPctX": 0.10244360902255634,
            "localPctY": 0.05534351145038184,
            "localPctW": 0.31954887218045114,
            "localPctH": 0.6736641221374047,
            "fillColor": "#ff4d38",
            "text": "",
            "pathD": "M 65 0 L 88 72 L 85 73 C 76 77, 67 83, 61 91 L 60 92 L 0 47 L 3 43 C 19 24, 39 10, 62 1 L 65 0 Z"
          },
          {
            "id": "sp-41",
            "x": 471.53007518796994,
            "y": 517.8024116167,
            "width": 88.97368421052632,
            "height": 92.06845707706086,
            "localPctX": 0.5780075187969925,
            "localPctY": 0.05725190839694644,
            "localPctW": 0.3223684210526316,
            "localPctH": 0.6755725190839694,
            "fillColor": "#ffb900",
            "text": "",
            "pathD": "M 24 0 L 26 1 C 51 10, 73 27, 89 48 L 89 48 L 28 92 L 27 90 C 21 83, 12 76, 3 72 L 0 71 L 24 0 Z"
          },
          {
            "id": "sp-42",
            "x": 312,
            "y": 567.7378459635805,
            "width": 86.12030075187971,
            "height": 78.80435732867073,
            "localPctX": 0,
            "localPctY": 0.4236641221374045,
            "localPctW": 0.31203007518797,
            "localPctH": 0.5782442748091603,
            "text": "",
            "pathD": "M 26 0 L 86 45 L 86 45 C 80 54, 76 64, 75 74 L 75 79 L 0 79 L 0 74 C 1 48, 10 24, 24 3 L 26 0 Z"
          },
          {
            "id": "sp-43",
            "x": 502.3984962406015,
            "y": 569.2983282869205,
            "width": 85.6015037593985,
            "height": 77.24387500533072,
            "localPctX": 0.6898496240601504,
            "localPctY": 0.4351145038167938,
            "localPctW": 0.3101503759398496,
            "localPctH": 0.566793893129771,
            "fillColor": "#ee6d90",
            "text": "",
            "pathD": "M 61 0 L 62 2 C 76 22, 84 46, 85 72 L 86 77 L 11 77 L 10 73 C 10 64, 7 56, 3 49 L 0 44 L 61 0 Z"
          }
        ],
        "x": 312,
        "y": 510,
        "width": 276,
        "height": 136.28212290502793,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.9804469273743017
      },
      {
        "id": "sp-36",
        "x": 388.36516853932585,
        "y": 587.2653631284916,
        "width": 122.88202247191012,
        "height": 58.62849162011173,
        "localPctX": 0.276685393258427,
        "localPctY": 0.5558659217877091,
        "localPctW": 0.4452247191011236,
        "localPctH": 0.4217877094972067,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 61 0 C 93 0, 120 24, 123 56 L 123 59 L 0 59 L 0 56 C 3 24, 30 0, 61 0 Z"
      },
      {
        "id": "sp-37",
        "x": 416.2752808988764,
        "y": 555.427374301676,
        "width": 10,
        "height": 93.18435754189944,
        "localPctX": 0.377808988764045,
        "localPctY": 0.32681564245810046,
        "localPctW": 0.033707865168539325,
        "localPctH": 0.670391061452514,
        "text": "",
        "pathD": "M 5 0 L 9.303370786516854 93.18435754189944 L 0 93.18435754189944 Z"
      },
      {
        "id": "sp-38",
        "x": 441.85955056179773,
        "y": 628.4217877094972,
        "width": 15.893258426966293,
        "height": 15.918994413407821,
        "localPctX": 0.470505617977528,
        "localPctY": 0.8519553072625694,
        "localPctW": 0.05758426966292135,
        "localPctH": 0.11452513966480447,
        "text": "",
        "pathD": "M 8 0 A 8 8 0 1 1 8 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 312,
    "y": 510,
    "width": 276,
    "height": 139
  },
  {
    "id": "grp-40",
    "isGroup": true,
    "children": [
      {
        "id": "grp-41",
        "isGroup": true,
        "children": [
          {
            "id": "sp-47",
            "x": 789.015037593985,
            "y": 510,
            "width": 82.48872180451129,
            "height": 77.33201335877864,
            "localPctX": 0.35150375939849626,
            "localPctY": 0,
            "localPctW": 0.29887218045112784,
            "localPctH": 0.5706106870229009,
            "fillColor": "#52c49c",
            "text": "",
            "pathD": "M 41 0 C 55 0, 69 2, 82 6 L 82 6 L 59 77 L 54 76 C 50 75, 45 75, 41 75 C 37 75, 32 75, 28 76 L 23 77 L 0 6 L 6 4 C 17 2, 29 0, 41 0 Z"
          },
          {
            "id": "sp-48",
            "x": 720.2744360902255,
            "y": 517.500429389313,
            "width": 88.19548872180451,
            "height": 91.29833015267177,
            "localPctX": 0.10244360902255634,
            "localPctY": 0.05534351145038194,
            "localPctW": 0.31954887218045114,
            "localPctH": 0.6736641221374047,
            "fillColor": "#ff4d38",
            "text": "",
            "pathD": "M 65 0 L 88 71 L 85 72 C 76 76, 67 82, 61 90 L 60 91 L 0 47 L 3 43 C 19 24, 39 9, 62 1 L 65 0 Z"
          },
          {
            "id": "sp-49",
            "x": 851.5300751879699,
            "y": 517.7590648854962,
            "width": 88.97368421052632,
            "height": 91.55696564885497,
            "localPctX": 0.5780075187969925,
            "localPctY": 0.05725190839694649,
            "localPctW": 0.3223684210526316,
            "localPctH": 0.6755725190839695,
            "fillColor": "#ffb900",
            "text": "",
            "pathD": "M 24 0 L 26 1 C 51 10, 73 26, 89 48 L 89 48 L 28 92 L 27 90 C 21 82, 12 76, 3 72 L 0 71 L 24 0 Z"
          },
          {
            "id": "sp-50",
            "x": 692,
            "y": 567.4170801526718,
            "width": 86.12030075187971,
            "height": 78.36655534351146,
            "localPctX": 0,
            "localPctY": 0.423664122137405,
            "localPctW": 0.31203007518797,
            "localPctH": 0.5782442748091604,
            "text": "",
            "pathD": "M 26 0 L 86 44 L 86 45 C 80 53, 76 63, 75 74 L 75 78 L 0 78 L 0 73 C 1 47, 10 23, 24 3 L 26 0 Z"
          },
          {
            "id": "sp-51",
            "x": 882.3984962406015,
            "y": 568.968893129771,
            "width": 85.6015037593985,
            "height": 76.81474236641222,
            "localPctX": 0.6898496240601504,
            "localPctY": 0.43511450381679395,
            "localPctW": 0.3101503759398496,
            "localPctH": 0.566793893129771,
            "fillColor": "#ee6d90",
            "text": "",
            "pathD": "M 61 0 L 62 2 C 76 22, 84 46, 85 72 L 86 77 L 11 77 L 10 72 C 10 64, 7 56, 3 49 L 0 44 L 61 0 Z"
          }
        ],
        "x": 692,
        "y": 510,
        "width": 276,
        "height": 135.525,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.9750000000000001
      },
      {
        "id": "sp-44",
        "x": 768.3651685393259,
        "y": 586.8361111111112,
        "width": 122.88202247191012,
        "height": 58.30277777777778,
        "localPctX": 0.276685393258427,
        "localPctY": 0.5527777777777786,
        "localPctW": 0.4452247191011236,
        "localPctH": 0.41944444444444445,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 61 0 C 93 0, 120 24, 123 55 L 123 58 L 0 58 L 0 55 C 3 24, 30 0, 61 0 Z"
      },
      {
        "id": "sp-45",
        "x": 855.5842696629213,
        "y": 556.3333333333334,
        "width": 10,
        "height": 92.66666666666667,
        "localPctX": 0.592696629213483,
        "localPctY": 0.3333333333333336,
        "localPctW": 0.033707865168539325,
        "localPctH": 0.6666666666666667,
        "text": "",
        "pathD": "M 5 0 L 9.303370786516854 92.66666666666667 L 0 92.66666666666667 Z"
      },
      {
        "id": "sp-46",
        "x": 821.8595505617977,
        "y": 627.7638888888889,
        "width": 15.893258426966293,
        "height": 15.830555555555556,
        "localPctX": 0.470505617977528,
        "localPctY": 0.8472222222222224,
        "localPctW": 0.05758426966292135,
        "localPctH": 0.11388888888888889,
        "text": "",
        "pathD": "M 8 0 A 8 8 0 1 1 8 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 692,
    "y": 510,
    "width": 276,
    "height": 139
  },
  {
    "id": "sp-0",
    "x": 398,
    "y": 409,
    "width": 106,
    "height": 36,
    "text": "Strategy"
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 1,
    "x": 255,
    "y": 446,
    "width": 364,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 1,
    "x": 783,
    "y": 409,
    "width": 95,
    "height": 36,
    "text": "Culture"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 2,
    "x": 648,
    "y": 446,
    "width": 364,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 0,
    "x": 976,
    "y": 130,
    "width": 89,
    "height": 36,
    "text": "Market"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 1,
    "x": 838,
    "y": 167,
    "width": 350,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-6",
    "x": 600,
    "y": 130,
    "width": 81,
    "height": 36,
    "text": "Talent"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 0,
    "x": 458,
    "y": 167,
    "width": 350,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-8",
    "x": 193,
    "y": 130,
    "width": 134,
    "height": 36,
    "text": "Leadership"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 83,
    "y": 167,
    "width": 359,
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

export function Migso85Template({ data }: { data: BrainData }): ReactElement {
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
