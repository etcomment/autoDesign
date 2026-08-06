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
        "id": "sp-13",
        "x": 377,
        "y": 124,
        "width": 256,
        "height": 256,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.4951644100580271,
        "localPctH": 0.4951644100580271,
        "fillColor": "#3365cc",
        "pathD": "M 256 0 L 256 48 L 248 48 C 140 53, 53 140, 48 248 L 48 256 L 0 256 L 0 245 C 7 113, 113 7, 245 0 L 256 0 Z"
      },
      {
        "id": "sp-14",
        "x": 638,
        "y": 124,
        "width": 256,
        "height": 256,
        "localPctX": 0.504835589941973,
        "localPctY": 0,
        "localPctW": 0.4951644100580271,
        "localPctH": 0.4951644100580271,
        "fillColor": "#ff4d38",
        "pathD": "M 0 0 L 11 0 C 143 7, 249 113, 256 245 L 256 256 L 208 256 L 208 248 C 203 140, 116 53, 8 48 L 0 48 L 0 0 Z"
      },
      {
        "id": "sp-15",
        "x": 377,
        "y": 385,
        "width": 256,
        "height": 256,
        "localPctX": 0,
        "localPctY": 0.504835589941973,
        "localPctW": 0.4951644100580271,
        "localPctH": 0.4951644100580271,
        "fillColor": "#ffb900",
        "pathD": "M 0 0 L 48 0 L 48 8 C 53 116, 140 203, 248 208 L 256 208 L 256 256 L 245 256 C 113 249, 7 143, 0 11 L 0 0 Z"
      },
      {
        "id": "sp-16",
        "x": 638,
        "y": 385,
        "width": 256,
        "height": 256,
        "localPctX": 0.504835589941973,
        "localPctY": 0.504835589941973,
        "localPctW": 0.4951644100580271,
        "localPctH": 0.4951644100580271,
        "fillColor": "#52c49c",
        "pathD": "M 208 0 L 256 0 L 256 11 C 249 143, 143 249, 11 256 L 0 256 L 0 208 L 8 208 C 116 203, 203 116, 208 8 L 208 0 Z"
      },
      {
        "id": "sp-17",
        "x": 493,
        "y": 178,
        "width": 140,
        "height": 121,
        "localPctX": 0.22437137330754353,
        "localPctY": 0.10444874274661509,
        "localPctW": 0.27079303675048355,
        "localPctH": 0.23404255319148937,
        "fillColor": "#3365cc",
        "pathD": "M 140 0 L 140 89 L 131 90 C 107 92, 86 101, 69 115 L 63 121 L 0 58 L 13 46 C 45 19, 87 2, 132 0 L 140 0 Z"
      },
      {
        "id": "sp-18",
        "x": 638,
        "y": 178,
        "width": 140,
        "height": 121,
        "localPctX": 0.504835589941973,
        "localPctY": 0.10444874274661509,
        "localPctW": 0.27079303675048355,
        "localPctH": 0.23404255319148937,
        "fillColor": "#ff4d38",
        "pathD": "M 0 0 L 8 0 C 53 2, 95 19, 127 46 L 140 58 L 77 121 L 71 115 C 54 101, 33 92, 9 90 L 0 89 L 0 0 Z"
      },
      {
        "id": "sp-19",
        "x": 719,
        "y": 240,
        "width": 121,
        "height": 140,
        "localPctX": 0.6615087040618955,
        "localPctY": 0.22437137330754353,
        "localPctW": 0.23404255319148937,
        "localPctH": 0.27079303675048355,
        "fillColor": "#ff4d38",
        "pathD": "M 63 0 L 75 13 C 102 45, 119 87, 121 132 L 121 140 L 32 140 L 31 131 C 29 107, 20 86, 6 69 L 0 63 L 63 0 Z"
      },
      {
        "id": "sp-20",
        "x": 431,
        "y": 240,
        "width": 121,
        "height": 140,
        "localPctX": 0.10444874274661509,
        "localPctY": 0.22437137330754353,
        "localPctW": 0.23404255319148937,
        "localPctH": 0.27079303675048355,
        "fillColor": "#3365cc",
        "pathD": "M 58 0 L 121 63 L 115 69 C 101 86, 92 107, 90 131 L 89 140 L 0 140 L 0 132 C 2 87, 19 45, 46 13 L 58 0 Z"
      },
      {
        "id": "sp-21",
        "x": 431,
        "y": 385,
        "width": 121,
        "height": 140,
        "localPctX": 0.10444874274661509,
        "localPctY": 0.504835589941973,
        "localPctW": 0.23404255319148937,
        "localPctH": 0.27079303675048355,
        "fillColor": "#ffb900",
        "pathD": "M 0 0 L 89 0 L 90 9 C 92 33, 101 54, 115 71 L 121 77 L 58 140 L 46 127 C 19 95, 2 53, 0 8 L 0 0 Z"
      },
      {
        "id": "sp-22",
        "x": 719,
        "y": 385,
        "width": 121,
        "height": 140,
        "localPctX": 0.6615087040618955,
        "localPctY": 0.504835589941973,
        "localPctW": 0.23404255319148937,
        "localPctH": 0.27079303675048355,
        "fillColor": "#52c49c",
        "pathD": "M 32 0 L 121 0 L 121 8 C 119 53, 102 95, 75 127 L 63 140 L 0 77 L 6 71 C 20 54, 29 33, 31 9 L 32 0 Z"
      },
      {
        "id": "sp-23",
        "x": 638,
        "y": 466,
        "width": 140,
        "height": 121,
        "localPctX": 0.504835589941973,
        "localPctY": 0.6615087040618955,
        "localPctW": 0.27079303675048355,
        "localPctH": 0.23404255319148937,
        "fillColor": "#52c49c",
        "pathD": "M 77 0 L 140 63 L 127 75 C 95 102, 53 119, 8 121 L 0 121 L 0 32 L 9 31 C 33 29, 54 20, 71 6 L 77 0 Z"
      },
      {
        "id": "sp-24",
        "x": 493,
        "y": 466,
        "width": 140,
        "height": 121,
        "localPctX": 0.22437137330754353,
        "localPctY": 0.6615087040618955,
        "localPctW": 0.27079303675048355,
        "localPctH": 0.23404255319148937,
        "fillColor": "#ffb900",
        "pathD": "M 63 0 L 69 6 C 86 20, 107 29, 131 31 L 140 32 L 140 121 L 132 121 C 87 119, 45 102, 13 75 L 0 63 L 63 0 Z"
      },
      {
        "id": "sp-25",
        "x": 411,
        "y": 200,
        "width": 121,
        "height": 36,
        "localPctX": 0.06576402321083172,
        "localPctY": 0.1470019342359768,
        "localPctW": 0.23404255319148937,
        "localPctH": 0.06963249516441006,
        "text": "LOGISTIC",
        "textColor": "#ffffff",
        "textSize": 16
      },
      {
        "id": "sp-26",
        "x": 766,
        "y": 438,
        "width": 81,
        "height": 29,
        "localPctX": 0.7524177949709865,
        "localPctY": 0.6073500967117988,
        "localPctW": 0.15667311411992263,
        "localPctH": 0.05609284332688588,
        "text": "DESIGN",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-27",
        "x": 417,
        "y": 296,
        "width": 100,
        "height": 29,
        "localPctX": 0.07736943907156674,
        "localPctY": 0.33268858800773693,
        "localPctW": 0.19342359767891681,
        "localPctH": 0.05609284332688588,
        "text": "DELIVERY",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-28",
        "x": 646,
        "y": 537,
        "width": 119,
        "height": 29,
        "localPctX": 0.5203094777562862,
        "localPctY": 0.7988394584139265,
        "localPctW": 0.23017408123791103,
        "localPctH": 0.05609284332688588,
        "text": "PROTOTYPE",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-29",
        "x": 516,
        "y": 199,
        "width": 97,
        "height": 29,
        "localPctX": 0.2688588007736944,
        "localPctY": 0.1450676982591876,
        "localPctW": 0.18762088974854932,
        "localPctH": 0.05609284332688588,
        "text": "SUPPORT",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-30",
        "x": 520,
        "y": 538,
        "width": 88,
        "height": 29,
        "localPctX": 0.2765957446808511,
        "localPctY": 0.8007736943907157,
        "localPctW": 0.1702127659574468,
        "localPctH": 0.05609284332688588,
        "text": "Planning",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-31",
        "x": 651,
        "y": 201,
        "width": 110,
        "height": 29,
        "localPctX": 0.5299806576402321,
        "localPctY": 0.14893617021276595,
        "localPctW": 0.2127659574468085,
        "localPctH": 0.05609284332688588,
        "text": "RESEARCH",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-32",
        "x": 420,
        "y": 440,
        "width": 90,
        "height": 29,
        "localPctX": 0.08317214700193423,
        "localPctY": 0.6112185686653772,
        "localPctW": 0.17408123791102514,
        "localPctH": 0.05609284332688588,
        "text": "TESTING",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-33",
        "x": 755,
        "y": 298,
        "width": 100,
        "height": 29,
        "localPctX": 0.7311411992263056,
        "localPctY": 0.3365570599613153,
        "localPctW": 0.19342359767891681,
        "localPctH": 0.05609284332688588,
        "text": "ANALYSIS",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-34",
        "x": 474,
        "y": 308,
        "width": 46,
        "height": 35,
        "localPctX": 0.18762088974854932,
        "localPctY": 0.35589941972920697,
        "localPctW": 0.08897485493230174,
        "localPctH": 0.06769825918762089,
        "fillColor": "#ffffff",
        "pathD": "M 38 30 C 38 30, 38 30, 38 31 C 38 31, 38 31, 38 31 C 37 31, 37 31, 37 31 C 37 30, 37 30, 38 30 Z M 26 30 C 26 30, 27 30, 27 31 C 27 31, 26 31, 26 31 C 26 31, 25 31, 25 31 C 25 30, 26 30, 26 30 Z M 10 30 C 10 30, 10 30, 10 31 C 10 31, 10 31, 10 31 C 9 31, 9 31, 9 31 C 9 30, 9 30, 10 30 Z M 38 29 C 37 29, 37 29, 37 29 C 36 30, 36 30, 36 31 C 36 31, 36 31, 37 32 C 37 32, 37 32, 38 32 C 38 32, 39 32, 39 32 C 39 31, 39 31, 39 31 C 39 30, 39 30, 39 29 C 39 29, 38 29, 38 29 Z M 26 29 C 26 29, 25 29, 25 29 C 25 30, 24 30, 24 31 C 24 31, 25 31, 25 32 C 25 32, 26 32, 26 32 C 27 32, 27 32, 27 32 C 28 31, 28 31, 28 31 C 28 30, 28 30, 27 29 C 27 29, 27 29, 26 29 Z M 10 29 C 9 29, 9 29, 8 29 C 8 30, 8 30, 8 31 C 8 31, 8 31, 8 32 C 9 32, 9 32, 10 32 C 10 32, 11 32, 11 32 C 11 31, 11 31, 11 31 C 11 30, 11 30, 11 29 C 11 29, 10 29, 10 29 Z M 38 26 C 39 26, 40 27, 41 27 C 42 28, 42 29, 42 31 C 42 32, 42 33, 41 34 C 40 34, 39 35, 38 35 C 37 35, 35 34, 35 34 C 34 33, 33 32, 33 31 C 33 29, 34 28, 35 27 C 35 27, 37 26, 38 26 Z M 26 26 C 27 26, 28 27, 29 27 C 30 28, 30 29, 30 31 C 30 32, 30 33, 29 34 C 28 34, 27 35, 26 35 C 25 35, 24 34, 23 34 C 22 33, 22 32, 22 31 C 22 29, 22 28, 23 27 C 24 27, 25 26, 26 26 Z M 10 26 C 11 26, 12 27, 13 27 C 14 28, 14 29, 14 31 C 14 32, 14 33, 13 34 C 12 34, 11 35, 10 35 C 8 35, 7 34, 7 34 C 6 33, 5 32, 5 31 C 5 29, 6 28, 7 27 C 7 27, 8 26, 10 26 Z M 36 19 L 36 20 L 38 20 L 41 20 L 43 20 L 43 19 L 41 19 L 38 19 Z M 23 19 L 23 20 L 24 20 L 27 20 L 29 20 L 29 19 L 27 19 L 24 19 Z M 12 17 C 10 17, 8 18, 6 20 C 6 20, 5 21, 5 22 L 12 22 L 16 22 L 16 17 L 12 17 C 12 17, 12 17, 12 17 C 12 17, 12 17, 12 17 C 12 17, 12 17, 12 17 Z M 12 15 C 12 15, 12 15, 12 15 C 12 15, 12 15, 12 15 C 12 15, 12 15, 12 15 C 12 15, 12 15, 12 15 C 12 15, 12 15, 12 15 L 17 15 C 18 15, 18 16, 18 16 L 18 24 L 44 24 C 44 24, 45 24, 45 25 L 45 30 L 45 30 L 45 31 L 44 31 L 43 31 C 43 31, 43 31, 43 31 C 43 29, 43 28, 42 27 C 41 26, 39 25, 38 25 C 36 25, 35 26, 34 27 C 33 28, 32 29, 32 31 C 32 31, 32 31, 32 31 L 31 31 C 31 31, 31 31, 31 31 C 31 29, 31 28, 30 27 C 29 26, 27 25, 26 25 C 25 25, 23 26, 22 27 C 21 27, 21 28, 21 30 C 21 30, 21 30, 21 31 C 21 31, 21 31, 21 31 L 18 31 C 17 31, 17 31, 17 31 L 17 31 L 17 31 L 15 31 C 15 31, 15 31, 15 31 C 15 29, 14 28, 13 27 C 13 26, 12 26, 12 26 C 11 25, 10 25, 10 25 C 8 25, 7 26, 6 27 C 5 28, 4 29, 4 31 C 4 31, 4 31, 4 31 L 2 31 L 2 31 L 1 31 C 0 31, 0 31, 0 31 C 0 30, 0 30, 1 30 L 1 30 L 2 24 C 2 22, 3 20, 5 18 C 7 17, 9 15, 12 15 Z M 41 15 C 41 15, 41 15, 41 15 L 40 16 C 40 16, 40 17, 40 17 C 40 17, 40 17, 41 17 L 41 17 L 41 18 L 41 18 L 42 18 L 42 17 L 42 17 C 42 17, 43 17, 43 17 C 43 17, 43 16, 43 16 L 42 15 C 42 15, 41 15, 41 15 Z M 38 15 C 38 15, 38 15, 37 15 L 36 16 C 36 16, 36 17, 36 17 C 37 17, 37 17, 37 17 L 37 17 L 37 18 L 38 18 L 38 18 L 38 17 L 39 17 C 39 17, 39 17, 39 17 C 39 17, 39 16, 39 16 L 38 15 C 38 15, 38 15, 38 15 Z M 27 15 C 27 15, 27 15, 27 15 L 26 16 C 26 16, 26 17, 26 17 C 26 17, 26 17, 27 17 L 27 17 L 27 18 L 27 18 L 28 18 L 28 17 L 28 17 C 28 17, 29 17, 29 17 C 29 17, 29 16, 29 16 L 28 15 C 28 15, 28 15, 27 15 Z M 24 15 C 24 15, 24 15, 24 15 L 22 16 C 22 16, 22 17, 22 17 C 23 17, 23 17, 23 17 L 23 17 L 23 18 L 24 18 L 24 18 L 24 17 L 25 17 C 25 17, 25 17, 25 17 C 26 17, 26 16, 25 16 L 24 15 C 24 15, 24 15, 24 15 Z M 33 12 L 34 12 L 38 12 L 41 12 L 45 12 L 46 12 L 46 13 L 46 22 L 46 23 L 45 23 L 41 23 L 38 23 L 34 23 L 33 23 L 33 22 L 33 13 Z M 19 12 L 20 12 L 24 12 L 27 12 L 31 12 L 32 12 L 32 13 L 32 22 L 32 23 L 31 23 L 27 23 L 24 23 L 20 23 L 19 23 L 19 22 L 19 13 Z M 36 7 L 36 8 L 38 8 L 41 8 L 43 8 L 43 7 L 41 7 L 38 7 Z M 23 7 L 23 8 L 24 8 L 27 8 L 29 8 L 29 7 L 27 7 L 24 7 Z M 41 3 C 41 3, 41 3, 41 3 L 40 4 C 40 4, 40 5, 40 5 C 40 5, 40 5, 41 5 L 41 5 L 41 6 L 41 6 L 42 6 L 42 5 L 42 5 C 42 5, 43 5, 43 5 C 43 5, 43 4, 43 4 L 42 3 C 42 3, 41 3, 41 3 Z M 38 3 C 38 3, 38 3, 37 3 L 36 4 C 36 4, 36 5, 36 5 C 37 5, 37 5, 37 5 L 37 5 L 37 6 L 38 6 L 38 6 L 38 5 L 39 5 C 39 5, 39 5, 39 5 C 39 5, 39 4, 39 4 L 38 3 C 38 3, 38 3, 38 3 Z M 27 3 C 27 3, 27 3, 27 3 L 26 4 C 26 4, 26 5, 26 5 C 26 5, 26 5, 27 5 L 27 5 L 27 6 L 27 6 L 28 6 L 28 5 L 28 5 C 28 5, 29 5, 29 5 C 29 5, 29 4, 29 4 L 28 3 C 28 3, 28 3, 27 3 Z M 24 3 C 24 3, 24 3, 24 3 L 22 4 C 22 4, 22 5, 22 5 C 23 5, 23 5, 23 5 L 23 5 L 23 6 L 24 6 L 24 6 L 24 5 L 25 5 C 25 5, 25 5, 25 5 C 26 5, 26 4, 25 4 L 24 3 C 24 3, 24 3, 24 3 Z M 33 0 L 34 0 L 38 0 L 41 0 L 45 0 L 46 0 L 46 1 L 46 10 L 46 11 L 45 11 L 41 11 L 38 11 L 34 11 L 33 11 L 33 10 L 33 1 Z M 19 0 L 20 0 L 24 0 L 27 0 L 31 0 L 32 0 L 32 1 L 32 10 L 32 11 L 31 11 L 27 11 L 24 11 L 20 11 L 19 11 L 19 10 L 19 1 Z"
      },
      {
        "id": "sp-35",
        "x": 560,
        "y": 224,
        "width": 40,
        "height": 45,
        "localPctX": 0.3539651837524178,
        "localPctY": 0.19342359767891681,
        "localPctW": 0.07736943907156674,
        "localPctH": 0.08704061895551257,
        "fillColor": "#ffffff",
        "pathD": "M 20 0 L 21 3 L 24 3 C 28 4, 31 6, 34 9 C 38 12, 40 17, 40 23 C 40 23, 40 24, 39 24 C 39 24, 38 23, 38 23 C 38 22, 37 21, 36 21 C 35 20, 34 20, 33 20 C 32 20, 32 20, 31 20 C 30 20, 30 21, 29 21 C 29 22, 28 22, 28 21 C 28 21, 27 20, 26 20 C 26 20, 25 20, 24 20 C 24 20, 23 20, 22 20 L 21 21 L 21 36 L 21 36 C 21 37, 21 38, 21 39 C 21 41, 21 42, 20 43 C 19 44, 17 45, 16 45 C 14 45, 13 44, 12 43 C 11 42, 10 41, 10 39 C 10 39, 11 38, 12 38 C 12 38, 13 39, 13 39 C 13 40, 13 41, 14 41 C 14 42, 15 42, 16 42 C 16 42, 17 42, 18 41 C 18 41, 19 40, 19 39 C 19 38, 19 37, 18 36 L 19 36 L 19 21 L 18 20 C 17 20, 16 20, 16 20 C 15 20, 14 20, 14 20 C 13 20, 12 21, 12 21 C 11 22, 11 22, 11 21 C 10 21, 10 20, 9 20 C 8 20, 8 20, 7 20 C 6 20, 5 20, 4 21 C 3 21, 2 22, 2 23 C 2 24, 1 24, 1 24 C 0 23, 0 23, 0 23 C 0 17, 2 12, 6 9 C 9 6, 12 4, 16 3 L 19 3 Z"
      },
      {
        "id": "sp-36",
        "x": 479,
        "y": 420,
        "width": 36,
        "height": 40,
        "localPctX": 0.19729206963249515,
        "localPctY": 0.5725338491295938,
        "localPctW": 0.06963249516441006,
        "localPctH": 0.07736943907156674,
        "fillColor": "#ffffff",
        "pathD": "M 19 20 L 18 22 L 17 24 L 18 24 L 19 24 Z M 22 17 L 24 17 L 24 21 L 26 21 L 26 17 L 27 17 L 27 27 L 26 27 L 26 23 L 24 23 L 24 27 L 22 27 Z M 19 17 L 21 17 L 21 24 L 21 24 L 21 25 L 21 25 L 21 27 L 19 27 L 19 25 L 18 25 L 16 25 L 16 24 L 18 18 Z M 13 16 C 13 16, 14 17, 14 17 C 14 17, 15 17, 15 18 C 15 18, 15 19, 15 19 C 15 20, 15 20, 15 20 C 15 21, 15 21, 14 21 C 14 22, 14 22, 14 22 C 14 23, 13 23, 13 23 C 13 24, 13 24, 12 24 C 12 24, 12 24, 12 25 C 12 25, 12 25, 12 25 C 12 25, 12 26, 12 26 C 12 26, 12 26, 12 26 L 15 26 L 15 27 L 10 27 L 10 26 C 10 25, 10 25, 10 25 C 10 24, 11 24, 11 24 C 11 23, 11 23, 11 23 C 12 23, 12 22, 12 22 C 12 22, 13 22, 13 21 C 13 21, 13 21, 13 20 C 13 20, 13 20, 13 19 C 13 19, 13 19, 13 18 C 13 18, 13 18, 13 18 C 13 18, 13 18, 13 18 C 12 18, 12 18, 12 18 C 12 18, 12 19, 12 19 L 12 20 L 10 20 L 10 19 C 10 19, 10 18, 10 18 C 11 17, 11 17, 11 17 C 12 17, 12 16, 13 16 Z M 33 13 C 34 13, 34 13, 34 13 C 34 13, 34 13, 34 13 L 34 13 C 34 13, 34 13, 34 13 C 35 14, 35 15, 35 16 C 36 17, 36 18, 36 19 C 36 19, 36 20, 35 20 C 35 20, 35 20, 35 20 L 32 20 L 32 20 C 31 20, 31 20, 31 19 C 31 19, 31 19, 31 19 C 31 19, 30 18, 30 18 C 30 17, 30 17, 30 16 L 30 16 C 29 16, 30 15, 30 15 L 30 15 L 33 13 C 33 13, 33 13, 33 13 Z M 27 6 C 27 6, 27 6, 27 6 C 27 6, 27 6, 27 6 C 27 6, 27 6, 27 6 C 28 6, 29 7, 29 7 C 30 8, 30 8, 31 9 C 31 9, 31 10, 31 10 L 28 12 L 28 12 C 28 13, 27 13, 27 13 C 27 13, 27 12, 27 12 C 27 12, 27 12, 27 12 C 27 12, 27 12, 27 12 C 26 12, 26 12, 26 12 C 26 11, 25 11, 25 11 L 25 11 C 25 11, 25 10, 25 10 L 26 6 C 26 6, 27 6, 27 6 Z M 15 0 C 15 0, 15 0, 15 0 L 21 6 C 22 7, 22 7, 21 8 L 21 8 L 15 14 C 15 14, 14 14, 14 14 C 14 13, 14 13, 14 13 L 14 10 C 13 10, 13 10, 12 10 C 11 11, 10 12, 9 13 C 8 14, 7 15, 6 17 C 5 18, 5 20, 5 22 C 5 24, 5 25, 6 27 C 7 28, 8 30, 9 31 C 10 32, 12 33, 13 34 C 15 34, 16 35, 18 35 C 20 35, 21 34, 23 34 C 25 33, 26 32, 27 31 C 28 30, 29 29, 30 27 C 30 26, 31 25, 31 24 L 36 25 C 36 26, 35 28, 34 30 C 33 32, 32 33, 31 35 C 29 36, 27 38, 25 39 C 23 40, 20 40, 18 40 C 16 40, 13 40, 11 39 C 9 38, 7 36, 5 35 C 4 33, 2 31, 1 29 C 0 27, 0 24, 0 22 C 0 19, 0 17, 1 15 C 2 13, 4 11, 5 9 C 7 7, 8 6, 10 5 C 11 5, 13 4, 14 4 L 14 1 C 14 0, 14 0, 15 0 Z"
      },
      {
        "id": "sp-37",
        "x": 667,
        "y": 500,
        "width": 40,
        "height": 38,
        "localPctX": 0.5609284332688588,
        "localPctY": 0.7272727272727273,
        "localPctW": 0.07736943907156674,
        "localPctH": 0.0735009671179884,
        "fillColor": "#ffffff",
        "pathD": "M 10 17 C 10 17, 10 17, 10 17 L 10 18 C 9 17, 9 17, 9 17 C 8 17, 7 18, 6 18 C 6 19, 5 19, 5 20 C 5 20, 5 21, 5 22 C 5 22, 5 22, 5 22 C 5 22, 5 22, 5 22 C 5 22, 6 22, 6 21 C 6 21, 6 21, 7 22 C 7 22, 7 22, 7 22 C 7 22, 7 22, 8 22 C 8 22, 8 23, 8 22 C 8 22, 8 22, 8 22 C 9 22, 9 22, 9 22 C 9 22, 9 23, 10 23 C 10 23, 10 23, 10 23 L 10 28 C 10 28, 10 29, 10 29 C 10 29, 10 29, 10 29 C 10 29, 10 29, 10 29 C 10 29, 9 29, 9 29 C 9 29, 9 28, 9 28 C 9 28, 8 28, 8 28 C 8 27, 8 27, 8 27 C 8 27, 8 27, 8 28 C 8 28, 8 28, 8 29 C 8 29, 9 29, 9 30 C 9 30, 9 30, 10 30 C 10 30, 10 30, 10 29 C 10 29, 10 29, 10 29 C 11 29, 11 29, 11 29 C 11 29, 11 29, 11 28 C 11 28, 11 28, 11 28 L 11 28 L 11 23 C 11 23, 11 23, 11 23 C 11 23, 11 23, 11 23 C 12 23, 12 23, 12 24 C 12 24, 12 24, 13 24 C 13 24, 13 24, 13 24 C 13 24, 13 24, 13 24 C 14 24, 14 24, 14 24 C 14 24, 15 25, 15 25 C 15 25, 15 25, 15 26 C 15 26, 16 26, 16 26 C 16 26, 16 26, 16 25 L 16 25 C 16 24, 16 22, 15 21 C 14 20, 12 18, 11 18 L 11 17 C 11 17, 11 17, 10 17 Z M 40 9 L 40 31 C 40 31, 40 31, 40 31 L 20 38 L 20 16 L 29 13 L 29 18 C 29 18, 29 19, 29 18 L 32 17 C 33 17, 33 17, 33 17 L 33 11 L 40 9 C 40 9, 40 9, 40 9 Z M 0 9 C 0 9, 0 9, 0 9 L 10 12 L 20 16 L 20 38 C 20 38, 20 38, 20 38 L 10 35 L 0 31 C 0 31, 0 31, 0 31 Z M 9 4 L 21 9 L 28 12 L 21 15 L 20 15 C 20 15, 20 15, 20 15 L 0 8 C 0 8, 0 8, 0 8 C 0 7, 0 7, 0 7 Z M 20 0 L 21 0 L 40 7 C 40 7, 40 7, 40 7 C 40 7, 40 8, 40 8 L 33 10 L 21 6 L 13 3 L 20 0 C 20 0, 20 0, 20 0 Z"
      },
      {
        "id": "sp-38",
        "x": 752,
        "y": 313,
        "width": 46,
        "height": 28,
        "localPctX": 0.7253384912959381,
        "localPctY": 0.3655705996131528,
        "localPctW": 0.08897485493230174,
        "localPctH": 0.05415860735009671,
        "fillColor": "#ffffff",
        "pathD": "M 0 26 L 46 26 L 46 28 L 0 28 Z M 35 14 L 40 16 L 41 21 C 41 21, 39 21, 37 21 Z M 11 7 L 19 9 L 21 21 C 21 21, 18 21, 16 20 Z M 8 1 C 7 1, 6 1, 6 1 C 5 2, 5 2, 4 2 L 6 3 L 6 3 Z M 8 0 C 9 0, 10 0, 11 0 C 11 0, 11 0, 11 0 C 18 2, 25 5, 33 8 C 35 9, 37 10, 39 11 L 43 9 L 43 9 C 43 9, 43 9, 44 9 L 45 9 C 46 10, 46 10, 46 11 C 46 11, 46 11, 46 11 L 42 18 C 42 18, 41 18, 41 18 L 41 15 L 34 13 L 35 16 C 34 16, 34 16, 33 16 L 32 16 L 21 13 L 21 13 L 20 8 L 10 5 L 12 10 L 6 9 L 4 8 L 4 8 L 4 8 L 4 8 L 4 8 C 4 8, 3 8, 2 7 C 1 7, 0 6, 0 5 C 0 5, 0 5, 0 5 C 1 3, 2 2, 5 1 C 5 1, 5 1, 6 0 C 7 0, 8 0, 8 0 Z M 26 0 C 26 0, 26 0, 26 0 L 31 1 C 32 1, 32 2, 31 2 L 25 4 C 23 3, 20 3, 18 2 Z"
      },
      {
        "id": "sp-39",
        "x": 560,
        "y": 503,
        "width": 44,
        "height": 34,
        "localPctX": 0.3539651837524178,
        "localPctY": 0.7330754352030948,
        "localPctW": 0.0851063829787234,
        "localPctH": 0.06576402321083172,
        "fillColor": "#ffffff",
        "pathD": "M 8 29 C 8 29, 7 29, 7 29 C 7 30, 7 30, 7 30 C 7 30, 7 31, 7 31 C 7 31, 8 31, 8 31 C 8 31, 9 31, 9 31 C 9 31, 9 30, 9 30 C 9 30, 9 30, 9 29 C 9 29, 8 29, 8 29 Z M 26 28 C 26 28, 26 28, 25 28 C 25 28, 25 29, 25 29 C 25 30, 25 30, 25 30 C 26 30, 26 31, 26 31 C 27 31, 27 30, 27 30 C 28 30, 28 30, 28 29 C 28 29, 28 28, 27 28 C 27 28, 27 28, 26 28 Z M 8 26 C 9 26, 10 27, 11 27 C 11 28, 12 29, 12 30 C 12 31, 11 32, 11 33 C 10 33, 9 34, 8 34 C 7 34, 6 33, 5 33 C 5 32, 4 31, 4 30 C 4 29, 5 28, 5 27 C 6 27, 7 26, 8 26 Z M 26 24 C 28 24, 29 25, 30 26 C 31 27, 31 28, 31 29 C 31 30, 31 32, 30 33 C 29 33, 28 34, 26 34 C 25 34, 24 33, 23 33 C 22 32, 21 30, 21 29 C 21 28, 22 27, 23 26 C 24 25, 25 24, 26 24 Z M 13 3 C 13 3, 13 3, 13 3 C 13 3, 13 4, 13 4 L 13 17 L 15 17 L 16 17 L 16 17 C 16 17, 15 16, 15 16 L 14 10 C 14 10, 14 9, 15 9 C 15 9, 16 9, 16 10 C 17 12, 17 13, 17 15 C 17 15, 18 15, 19 15 C 19 15, 21 14, 21 16 C 21 16, 20 17, 20 17 L 18 17 L 17 17 L 17 17 C 18 17, 18 18, 18 18 L 18 20 L 25 20 L 22 13 L 21 14 C 21 14, 20 14, 20 14 C 20 14, 20 13, 20 13 L 23 11 C 23 11, 23 11, 23 12 C 23 12, 23 12, 23 12 L 22 13 L 25 20 L 27 20 L 23 3 Z M 34 1 C 35 1, 35 1, 35 2 L 35 25 L 44 25 L 44 25 L 44 27 L 44 27 L 34 27 C 34 27, 33 26, 33 26 L 33 2 C 33 1, 34 1, 34 1 Z M 13 0 L 26 0 C 26 0, 27 0, 27 1 C 27 1, 26 3, 26 3 L 25 3 L 28 20 L 28 20 L 31 20 L 31 2 C 31 1, 31 1, 32 1 C 32 1, 32 1, 32 2 L 32 21 L 32 21 C 32 21, 32 21, 32 21 L 32 28 C 32 29, 32 29, 32 29 C 32 27, 31 26, 30 25 C 29 24, 28 23, 26 23 C 25 23, 23 24, 22 25 C 21 26, 20 28, 20 29 C 20 29, 20 29, 20 29 L 13 29 C 13 28, 12 27, 11 27 C 10 26, 9 25, 8 25 C 7 25, 5 26, 5 27 C 4 27, 3 28, 3 29 L 2 29 L 1 29 C 0 29, 0 29, 0 28 L 0 26 C 0 25, 0 25, 0 24 C 0 24, 1 24, 1 24 L 1 21 C 1 20, 2 19, 3 19 C 3 18, 5 17, 6 17 L 11 17 L 11 3 C 11 2, 11 1, 12 1 C 12 0, 13 0, 13 0 Z"
      },
      {
        "id": "sp-40",
        "x": 668,
        "y": 228,
        "width": 46,
        "height": 36,
        "localPctX": 0.562862669245648,
        "localPctY": 0.2011605415860735,
        "localPctW": 0.08897485493230174,
        "localPctH": 0.06963249516441006,
        "fillColor": "#ffffff",
        "pathD": "M 7 30 L 7 31 L 15 31 L 22 31 L 22 30 L 15 30 Z M 5 29 L 5 29 L 6 29 L 6 30 L 5 30 L 5 30 Z M 4 28 L 4 29 L 4 31 L 4 31 L 4 31 L 5 31 L 6 31 L 7 31 L 7 31 L 7 29 L 7 28 L 6 28 L 5 28 L 4 28 Z M 7 24 L 7 25 L 15 25 L 22 25 L 22 24 L 15 24 Z M 5 24 L 5 24 L 6 24 L 6 24 L 5 24 L 5 24 Z M 4 23 L 4 23 L 4 25 L 4 25 L 4 25 L 5 25 L 6 25 L 7 25 L 7 25 L 7 23 L 7 23 L 6 23 L 5 23 L 4 23 Z M 7 19 L 7 20 L 15 20 L 22 20 L 22 19 L 15 19 Z M 5 18 L 5 18 L 6 18 L 6 19 L 5 19 L 5 19 Z M 4 17 L 4 17 L 4 19 L 4 20 L 4 20 L 5 20 L 6 20 L 7 20 L 7 19 L 7 17 L 7 17 L 6 17 L 5 17 L 4 17 Z M 27 16 L 32 18 L 32 33 L 32 33 C 32 33, 32 33, 32 33 L 32 33 L 27 32 Z M 7 13 L 7 14 L 15 14 L 22 14 L 22 13 L 15 13 Z M 46 13 L 46 28 C 46 28, 46 29, 46 29 L 39 31 L 35 32 L 32 33 L 32 18 L 35 17 L 38 16 L 38 19 C 38 20, 38 20, 39 20 L 39 20 L 41 19 C 41 19, 41 19, 41 19 L 41 15 L 46 13 L 46 13 C 46 13, 46 13, 46 13 Z M 5 12 L 5 12 L 6 12 L 6 13 L 5 13 L 5 13 Z M 4 11 L 4 12 L 4 14 L 4 14 L 4 14 L 5 14 L 6 14 L 7 14 L 7 14 L 7 12 L 7 11 L 6 11 L 5 11 L 4 11 Z M 27 11 L 32 13 L 35 14 L 38 15 L 35 16 L 32 17 C 32 17, 32 17, 32 17 L 32 17 L 27 15 Z M 32 7 L 35 8 L 39 9 L 46 12 C 46 12, 46 12, 46 12 C 46 12, 46 12, 46 12 L 41 14 L 39 14 L 35 12 L 32 11 L 27 9 L 32 7 L 32 7 C 32 7, 32 7, 32 7 Z M 7 0 C 7 0, 7 0, 7 0 C 8 0, 8 1, 8 1 L 8 7 C 8 7, 7 8, 7 8 L 1 8 C 0 8, 0 7, 0 7 C 0 6, 0 6, 0 6 L 6 0 C 6 0, 7 0, 7 0 Z M 9 0 L 15 0 L 25 0 C 26 0, 26 0, 26 1 L 26 35 C 26 36, 26 36, 25 36 L 15 36 L 5 36 L 1 36 C 0 36, 0 36, 0 35 L 0 9 L 5 9 L 7 9 C 8 9, 9 8, 9 7 Z"
      },
      {
        "id": "sp-41",
        "x": 744,
        "y": 421,
        "width": 45,
        "height": 38,
        "localPctX": 0.7098646034816247,
        "localPctY": 0.574468085106383,
        "localPctW": 0.08704061895551257,
        "localPctH": 0.0735009671179884,
        "fillColor": "#ffffff",
        "pathD": "M 36 34 L 36 35 L 37 35 L 38 35 L 39 35 L 40 35 L 41 35 L 42 35 L 42 34 L 41 34 L 40 34 L 39 34 L 38 34 L 37 34 Z M 13 33 L 13 35 L 14 35 L 15 35 L 16 35 L 17 35 L 17 35 L 18 35 L 19 35 L 20 35 L 21 35 L 22 35 L 23 35 L 24 35 L 25 35 L 26 35 L 27 35 L 27 33 L 26 33 L 25 33 L 24 33 L 23 33 L 22 33 L 21 33 L 20 33 L 19 33 L 18 33 L 17 33 L 17 33 L 16 33 L 15 33 L 14 33 Z M 41 30 L 40 31 L 39 32 L 40 32 L 40 33 L 40 33 L 41 33 L 41 33 L 41 32 L 42 32 L 41 31 Z M 38 30 L 37 31 L 36 32 L 37 32 L 37 33 L 37 33 L 38 33 L 38 33 L 38 32 L 39 32 L 38 31 Z M 13 30 L 13 31 L 14 31 L 15 31 L 16 31 L 17 31 L 17 31 L 18 31 L 19 31 L 20 31 L 21 31 L 22 31 L 23 31 L 24 31 L 25 31 L 26 31 L 27 31 L 27 30 L 26 30 L 25 30 L 24 30 L 23 30 L 22 30 L 21 30 L 20 30 L 19 30 L 18 30 L 17 30 L 17 30 L 16 30 L 15 30 L 14 30 Z M 41 23 L 41 24 L 42 26 L 42 26 L 43 26 L 42 23 L 42 23 L 41 23 Z M 39 23 L 39 24 L 40 26 L 40 26 L 41 26 L 41 26 L 41 25 L 40 23 L 40 23 L 39 23 Z M 37 23 L 37 24 L 38 26 L 38 26 L 39 26 L 39 26 L 39 25 L 38 23 L 38 23 L 37 23 Z M 35 23 L 35 24 L 36 26 L 36 26 L 37 26 L 37 26 L 37 25 L 36 23 L 36 23 L 35 23 Z M 33 23 L 33 24 L 34 26 L 34 26 L 35 26 L 36 26 L 35 25 L 34 23 L 34 23 L 33 23 Z M 31 23 L 31 24 L 32 26 L 32 26 L 33 26 L 34 26 L 33 25 L 32 23 L 32 23 L 31 23 Z M 29 23 L 29 24 L 30 26 L 30 26 L 31 26 L 32 26 L 31 25 L 30 23 L 30 23 L 29 23 Z M 27 23 L 27 24 L 28 26 L 28 26 L 29 26 L 30 26 L 29 25 L 28 23 L 28 23 L 27 23 Z M 25 23 L 25 24 L 26 26 L 26 26 L 27 26 L 28 26 L 27 26 L 26 23 L 26 23 L 25 23 Z M 23 23 L 23 24 L 24 26 L 24 26 L 25 26 L 26 26 L 25 25 L 24 23 L 24 23 L 23 23 Z M 21 23 L 21 24 L 22 26 L 22 26 L 23 26 L 24 26 L 23 25 L 22 23 L 22 23 L 21 23 Z M 19 23 L 19 24 L 20 26 L 20 26 L 21 26 L 22 26 L 21 25 L 21 23 L 20 23 L 19 23 Z M 17 23 L 17 24 L 18 26 L 18 26 L 19 26 L 20 26 L 19 25 L 19 23 L 18 23 L 17 23 Z M 15 23 L 16 24 L 16 26 L 17 26 L 17 26 L 18 26 L 17 25 L 17 23 L 17 23 L 16 23 Z M 13 23 L 14 24 L 14 26 L 15 26 L 16 26 L 16 26 L 16 25 L 15 23 L 15 23 L 14 23 L 13 23 Z M 11 23 L 13 26 L 13 26 L 14 26 L 14 26 L 14 25 L 13 23 L 13 23 Z M 23 9 L 23 17 L 23 17 L 23 18 L 24 18 L 24 17 L 24 17 L 25 18 L 25 18 L 26 17 L 26 18 L 27 18 L 27 17 L 28 18 L 28 18 L 29 17 L 29 18 L 29 18 L 30 17 L 30 17 L 31 18 L 31 18 L 32 17 L 32 17 L 32 9 Z M 23 7 L 23 7 L 23 7 L 32 7 L 32 7 L 32 7 L 33 7 L 34 7 L 35 7 L 36 7 L 37 7 L 38 7 L 39 7 L 40 7 L 41 7 L 42 7 L 43 7 C 44 7, 45 8, 45 9 L 45 23 L 45 23 L 45 24 L 45 25 L 44 23 L 43 23 L 44 26 L 45 26 L 45 36 C 45 37, 44 38, 43 38 L 42 38 L 41 38 L 40 38 L 39 38 L 38 38 L 37 38 L 36 38 L 35 38 L 34 38 L 33 38 L 32 38 L 31 38 L 30 38 L 29 38 L 28 38 L 27 38 L 26 38 L 25 38 L 24 38 L 23 38 L 22 38 L 21 38 L 20 38 L 19 38 L 18 38 L 17 38 L 17 38 L 16 38 L 15 38 L 14 38 L 13 38 L 11 38 C 10 38, 10 37, 10 36 L 10 26 L 10 26 L 10 25 L 10 24 L 11 26 L 12 26 L 11 23 L 10 23 L 10 17 C 11 18, 12 18, 13 18 C 13 18, 13 18, 13 18 C 13 18, 14 18, 14 18 C 14 18, 14 18, 15 18 C 15 18, 15 18, 16 18 C 16 18, 16 17, 17 17 C 17 17, 17 17, 17 17 C 18 17, 18 17, 18 16 C 19 16, 19 16, 19 16 C 20 15, 20 15, 20 15 C 20 15, 20 15, 20 15 C 21 14, 21 14, 21 13 C 22 13, 22 12, 22 11 C 23 10, 23 9, 23 8 C 23 8, 23 8, 23 7 Z M 13 3 C 11 3, 10 4, 9 5 C 8 6, 7 7, 7 9 C 7 10, 8 12, 9 13 C 10 14, 11 14, 13 14 C 14 14, 16 14, 17 13 C 18 12, 18 10, 18 9 C 18 7, 18 6, 17 5 C 16 4, 14 3, 13 3 Z M 13 0 C 15 0, 17 1, 19 3 C 20 4, 21 6, 21 9 C 21 11, 20 13, 19 15 C 17 16, 15 17, 13 17 C 12 17, 11 17, 10 16 L 9 16 L 7 19 L 8 20 C 8 20, 8 21, 8 21 L 4 27 C 4 27, 4 27, 4 27 C 4 28, -1 25, 0 24 L 4 18 C 4 18, 4 18, 4 18 C 4 18, 4 18, 5 18 L 6 18 L 8 15 L 7 15 C 5 13, 4 11, 4 9 C 4 6, 5 4, 7 3 C 8 1, 11 0, 13 0 Z"
      }
    ],
    "x": 377,
    "y": 124,
    "width": 517,
    "height": 517
  },
  {
    "id": "sp-0",
    "x": 897,
    "y": 140,
    "width": 192,
    "height": 36,
    "text": "Mass Production",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 1,
    "x": 897,
    "y": 173,
    "width": 297,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-2",
    "x": 897,
    "y": 497,
    "width": 100,
    "height": 36,
    "text": "Flexible",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 3,
    "x": 897,
    "y": 531,
    "width": 297,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-4",
    "x": 294,
    "y": 140,
    "width": 79,
    "height": 36,
    "text": "Rapid",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 76,
    "y": 173,
    "width": 297,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-6",
    "x": 149,
    "y": 497,
    "width": 224,
    "height": 36,
    "text": "Mass customization",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 2,
    "x": 77,
    "y": 531,
    "width": 297,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 402,
    "y": 180,
    "width": 548,
    "height": 499,
    "text": "BASELINE SYSTEM",
    "textColor": "#ffffff",
    "textSize": 16,
    "pathD": "M 274 0 A 274 250 0 1 1 274 0 Z"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 319,
    "y": 176,
    "width": 548,
    "height": 499,
    "text": "ProductION",
    "textColor": "#ffffff",
    "textSize": 16,
    "pathD": "M 274 0 A 274 250 0 1 1 274 0 Z"
  },
  {
    "id": "sp-10",
    "x": 412,
    "y": 93,
    "width": 519,
    "height": 511,
    "text": "DEVELOPMENT",
    "textColor": "#ffffff",
    "textSize": 14,
    "pathD": "M 260 0 A 260 256 0 1 1 259 0 Z"
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

export function Imported2025migsopcubedcreativeandexampletemplates128Template({ data }: { data: BrainData }): ReactElement {
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
