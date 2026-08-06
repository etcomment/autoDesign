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
        "id": "sp-15",
        "x": 296.54491017964074,
        "y": 523.6849315068494,
        "width": 36.64670658682635,
        "height": 60.57534246575342,
        "localPctX": 0.7305389221556887,
        "localPctY": 0.7773972602739727,
        "localPctW": 0.11976047904191617,
        "localPctH": 0.11301369863013698,
        "fillColor": "#0F587C",
        "text": "",
        "pathD": "M 28 24 L 37 61 L 0 0 L 28 24 Z"
      },
      {
        "id": "sp-16",
        "x": 226.91616766467064,
        "y": 134.53424657534248,
        "width": 42.1437125748503,
        "height": 58.73972602739726,
        "localPctX": 0.5029940119760479,
        "localPctY": 0.051369863013698655,
        "localPctW": 0.1377245508982036,
        "localPctH": 0.1095890410958904,
        "fillColor": "#6CCDEB",
        "text": "",
        "pathD": "M 42 34 C 32 50, 32 50, 32 50 C 0 59, 0 59, 0 59 C 7 0, 7 0, 7 0 C 22 19, 42 34, 42 34 Z"
      },
      {
        "id": "sp-17",
        "x": 226.91616766467064,
        "y": 185.93150684931507,
        "width": 86.11976047904191,
        "height": 91.78082191780823,
        "localPctX": 0.5029940119760479,
        "localPctY": 0.14726027397260275,
        "localPctW": 0.281437125748503,
        "localPctH": 0.17123287671232879,
        "fillColor": "#6CCDEB",
        "text": "",
        "pathD": "M 86 73 L 54 66 L 18 92 L 0 81 L 0 9 L 31 0 L 56 14 L 57 45 L 86 73 Z"
      },
      {
        "id": "sp-18",
        "x": 217.75449101796409,
        "y": 252.01369863013701,
        "width": 97.11377245508982,
        "height": 106.46575342465754,
        "localPctX": 0.4730538922155689,
        "localPctY": 0.2705479452054795,
        "localPctW": 0.31736526946107785,
        "localPctH": 0.19863013698630136,
        "fillColor": "#6CCDEB",
        "text": "",
        "pathD": "M 94 7 L 97 46 L 64 103 L 63 106 L 0 85 L 26 26 L 62 0 L 94 7 Z"
      },
      {
        "id": "sp-19",
        "x": 281.8862275449102,
        "y": 297.9041095890411,
        "width": 71.46107784431138,
        "height": 58.73972602739726,
        "localPctX": 0.6826347305389222,
        "localPctY": 0.35616438356164387,
        "localPctW": 0.23353293413173654,
        "localPctH": 0.1095890410958904,
        "fillColor": "#6CCDEB",
        "text": "",
        "pathD": "M 71 9 L 70 46 L 1 59 L 0 59 L 1 55 L 35 0 L 71 9 Z"
      },
      {
        "id": "sp-20",
        "x": 281.8862275449102,
        "y": 343.79452054794524,
        "width": 97.11377245508982,
        "height": 100.95890410958904,
        "localPctX": 0.6826347305389222,
        "localPctY": 0.44178082191780826,
        "localPctW": 0.31736526946107785,
        "localPctH": 0.18835616438356165,
        "fillColor": "#6CCDEB",
        "text": "",
        "pathD": "M 97 25 L 50 101 L 12 55 L 0 13 L 69 0 L 97 25 Z"
      },
      {
        "id": "sp-21",
        "x": 252.56886227544908,
        "y": 398.86301369863014,
        "width": 78.79041916167665,
        "height": 124.82191780821918,
        "localPctX": 0.5868263473053892,
        "localPctY": 0.5445205479452054,
        "localPctW": 0.2574850299401198,
        "localPctH": 0.23287671232876714,
        "fillColor": "#6CCDEB",
        "text": "",
        "pathD": "M 41 0 L 79 46 L 43 125 L 41 122 L 0 53 L 41 0 Z"
      },
      {
        "id": "sp-22",
        "x": 296.54491017964074,
        "y": 444.75342465753425,
        "width": 49.47305389221557,
        "height": 104.63013698630137,
        "localPctX": 0.7305389221556887,
        "localPctY": 0.6301369863013698,
        "localPctW": 0.16167664670658682,
        "localPctH": 0.1952054794520548,
        "fillColor": "#6CCDEB",
        "text": "",
        "pathD": "M 49 23 L 49 80 L 28 105 L 0 80 L 0 80 L 37 0 L 49 23 Z"
      },
      {
        "id": "sp-23",
        "x": 206.76047904191614,
        "y": 521.8493150684932,
        "width": 124.59880239520959,
        "height": 110.13698630136986,
        "localPctX": 0.4371257485029939,
        "localPctY": 0.7739726027397261,
        "localPctW": 0.407185628742515,
        "localPctH": 0.2054794520547945,
        "fillColor": "#6CCDEB",
        "text": "",
        "pathD": "M 88 3 L 125 64 L 91 110 L 0 48 L 87 0 L 88 3 L 88 3 Z"
      },
      {
        "id": "sp-24",
        "x": 192.10179640718565,
        "y": 107,
        "width": 40.31137724550898,
        "height": 49.56164383561644,
        "localPctX": 0.3892215568862276,
        "localPctY": 0,
        "localPctW": 0.13173652694610777,
        "localPctH": 0.09246575342465753,
        "fillColor": "#15739D",
        "text": "",
        "pathD": "M 40 28 C 0 50, 0 50, 0 50 C 27 0, 27 0, 27 0 C 28 9, 34 19, 40 28 Z"
      },
      {
        "id": "sp-25",
        "x": 157.2874251497006,
        "y": 569.5753424657535,
        "width": 142.92215568862275,
        "height": 73.42465753424658,
        "localPctX": 0.2754491017964072,
        "localPctY": 0.8630136986301371,
        "localPctW": 0.46706586826347307,
        "localPctH": 0.136986301369863,
        "fillColor": "#0F2A4B",
        "text": "",
        "pathD": "M 143 62 L 47 73 L 2 29 L 0 28 L 51 0 L 143 62 Z"
      },
      {
        "id": "sp-26",
        "x": 151.79041916167665,
        "y": 334.6164383561644,
        "width": 142.92215568862275,
        "height": 117.47945205479452,
        "localPctX": 0.2574850299401198,
        "localPctY": 0.4246575342465754,
        "localPctW": 0.46706586826347307,
        "localPctH": 0.2191780821917808,
        "fillColor": "#0F587C",
        "text": "",
        "pathD": "M 131 22 L 143 63 L 102 117 L 15 113 L 0 54 L 66 0 L 130 22 L 131 22 Z"
      },
      {
        "id": "sp-27",
        "x": 105.98203592814372,
        "y": 448.4246575342466,
        "width": 188.7305389221557,
        "height": 121.15068493150685,
        "localPctX": 0.10778443113772457,
        "localPctY": 0.636986301369863,
        "localPctW": 0.6167664670658682,
        "localPctH": 0.22602739726027396,
        "fillColor": "#0F587C",
        "text": "",
        "pathD": "M 189 73 L 102 121 L 0 53 L 61 0 L 148 5 L 189 73 Z"
      },
      {
        "id": "sp-28",
        "x": 206.76047904191614,
        "y": 277.71232876712327,
        "width": 36.64670658682635,
        "height": 58.73972602739726,
        "localPctX": 0.4371257485029939,
        "localPctY": 0.31849315068493145,
        "localPctW": 0.11976047904191617,
        "localPctH": 0.1095890410958904,
        "fillColor": "#0F587C",
        "text": "",
        "pathD": "M 37 0 L 11 59 L 0 45 L 37 0 Z"
      },
      {
        "id": "sp-29",
        "x": 192.10179640718565,
        "y": 266.6986301369863,
        "width": 51.30538922155689,
        "height": 55.06849315068493,
        "localPctX": 0.3892215568862276,
        "localPctY": 0.2979452054794521,
        "localPctW": 0.16766467065868262,
        "localPctH": 0.10273972602739725,
        "fillColor": "#0F587C",
        "text": "",
        "pathD": "M 51 11 L 15 55 L 0 37 L 33 0 L 51 11 Z"
      },
      {
        "id": "sp-30",
        "x": 192.10179640718565,
        "y": 134.53424657534248,
        "width": 40.31137724550898,
        "height": 58.73972602739726,
        "localPctX": 0.3892215568862276,
        "localPctY": 0.051369863013698655,
        "localPctW": 0.13173652694610777,
        "localPctH": 0.1095890410958904,
        "fillColor": "#0F587C",
        "text": "",
        "pathD": "M 40 0 L 33 59 L 7 59 L 0 21 L 40 0 Z"
      },
      {
        "id": "sp-31",
        "x": 184.77245508982037,
        "y": 195.1095890410959,
        "width": 40.31137724550898,
        "height": 110.13698630136986,
        "localPctX": 0.36526946107784436,
        "localPctY": 0.1643835616438356,
        "localPctW": 0.13173652694610777,
        "localPctH": 0.2054794520547945,
        "fillColor": "#15739D",
        "text": "",
        "pathD": "M 40 0 L 40 72 L 7 110 L 0 68 L 0 24 L 14 0 L 40 0 Z"
      },
      {
        "id": "sp-32",
        "x": 151.79041916167665,
        "y": 321.7671232876712,
        "width": 65.96407185628743,
        "height": 66.08219178082192,
        "localPctX": 0.2574850299401198,
        "localPctY": 0.40068493150684925,
        "localPctW": 0.21556886227544914,
        "localPctH": 0.1232876712328767,
        "fillColor": "#0F2A4B",
        "text": "",
        "pathD": "M 55 0 L 66 13 L 0 66 L 0 65 L 55 0 Z"
      },
      {
        "id": "sp-33",
        "x": 104.1497005988024,
        "y": 501.6575342465753,
        "width": 102.61077844311377,
        "height": 95.45205479452055,
        "localPctX": 0.10179640718562875,
        "localPctY": 0.7363013698630136,
        "localPctW": 0.33532934131736525,
        "localPctH": 0.1780821917808219,
        "fillColor": "#0F2A4B",
        "text": "",
        "pathD": "M 103 68 L 52 95 L 0 70 L 2 0 L 103 68 Z"
      },
      {
        "id": "sp-34",
        "x": 151.79041916167665,
        "y": 303.4109589041096,
        "width": 54.97005988023952,
        "height": 84.43835616438356,
        "localPctX": 0.2574850299401198,
        "localPctY": 0.3664383561643835,
        "localPctW": 0.17964071856287425,
        "localPctH": 0.15753424657534246,
        "fillColor": "#0F2A4B",
        "text": "",
        "pathD": "M 40 0 L 55 18 L 0 84 L 0 84 L 40 0 Z"
      },
      {
        "id": "sp-35",
        "x": 166.4491017964072,
        "y": 156.56164383561645,
        "width": 32.982035928143716,
        "height": 62.41095890410959,
        "localPctX": 0.3053892215568863,
        "localPctY": 0.09246575342465756,
        "localPctW": 0.10778443113772457,
        "localPctH": 0.11643835616438357,
        "fillColor": "#0F2A4B",
        "text": "",
        "pathD": "M 26 0 L 33 38 L 18 62 L 0 51 L 0 25 L 23 4 L 26 0 Z"
      },
      {
        "id": "sp-36",
        "x": 140.79640718562874,
        "y": 246.5068493150685,
        "width": 51.30538922155689,
        "height": 56.9041095890411,
        "localPctX": 0.22155688622754488,
        "localPctY": 0.26027397260273977,
        "localPctW": 0.16766467065868262,
        "localPctH": 0.10616438356164384,
        "fillColor": "#15739D",
        "text": "",
        "pathD": "M 44 15 L 51 57 L 0 23 L 16 0 L 44 15 Z"
      },
      {
        "id": "sp-37",
        "x": 109.64670658682635,
        "y": 303.4109589041096,
        "width": 82.45508982035928,
        "height": 86.27397260273973,
        "localPctX": 0.1197604790419162,
        "localPctY": 0.3664383561643835,
        "localPctW": 0.26946107784431134,
        "localPctH": 0.16095890410958905,
        "fillColor": "#0F587C",
        "text": "",
        "pathD": "M 42 85 L 41 86 L 0 62 L 82 0 L 42 85 Z"
      },
      {
        "id": "sp-38",
        "x": 109.64670658682635,
        "y": 296.06849315068496,
        "width": 82.45508982035928,
        "height": 69.75342465753425,
        "localPctX": 0.1197604790419162,
        "localPctY": 0.3527397260273973,
        "localPctW": 0.26946107784431134,
        "localPctH": 0.13013698630136988,
        "fillColor": "#0F2A4B",
        "text": "",
        "pathD": "M 82 8 L 0 70 L 0 35 L 30 0 L 82 8 Z"
      },
      {
        "id": "sp-39",
        "x": 140.79640718562874,
        "y": 270.36986301369865,
        "width": 51.30538922155689,
        "height": 34.87671232876713,
        "localPctX": 0.22155688622754488,
        "localPctY": 0.30479452054794526,
        "localPctW": 0.16766467065868262,
        "localPctH": 0.06506849315068494,
        "fillColor": "#15739D",
        "text": "",
        "pathD": "M 51 35 L 0 27 L 0 0 L 51 35 Z"
      },
      {
        "id": "sp-40",
        "x": 148.125748502994,
        "y": 207.95890410958904,
        "width": 36.64670658682635,
        "height": 55.06849315068493,
        "localPctX": 0.24550898203592816,
        "localPctY": 0.18835616438356165,
        "localPctW": 0.11976047904191617,
        "localPctH": 0.10273972602739725,
        "fillColor": "#15739D",
        "text": "",
        "pathD": "M 37 11 L 37 55 L 8 40 L 0 18 L 18 0 L 37 11 Z"
      },
      {
        "id": "sp-41",
        "x": 73,
        "y": 389.6849315068493,
        "width": 93.44910179640719,
        "height": 111.97260273972603,
        "localPctX": 0,
        "localPctY": 0.5273972602739726,
        "localPctW": 0.30538922155688625,
        "localPctH": 0.2089041095890411,
        "fillColor": "#0F2A4B",
        "text": "",
        "pathD": "M 79 0 L 93 59 L 32 112 L 10 112 L 0 93 L 28 48 L 78 1 L 79 0 Z"
      },
      {
        "id": "sp-42",
        "x": 80.32934131736526,
        "y": 365.82191780821915,
        "width": 69.62874251497006,
        "height": 71.58904109589041,
        "localPctX": 0.02395209580838321,
        "localPctY": 0.48287671232876705,
        "localPctW": 0.2275449101796407,
        "localPctH": 0.13356164383561644,
        "fillColor": "#0F2A4B",
        "text": "",
        "pathD": "M 70 24 L 20 72 L 0 48 L 29 0 L 70 24 Z"
      },
      {
        "id": "sp-43",
        "x": 73,
        "y": 107,
        "width": 304.16766467065867,
        "height": 536,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.9940119760479041,
        "localPctH": 1,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 159 28 C 153 19, 147 9, 146 0 C 119 49, 119 49, 119 49 C 116 54, 116 54, 116 54 C 93 74, 93 74, 93 74 C 93 100, 93 100, 93 100 C 74 118, 74 118, 74 118 C 83 139, 83 139, 83 139 C 67 163, 67 163, 67 163 C 67 189, 67 189, 67 189 C 36 224, 36 224, 36 224 C 36 259, 36 259, 36 259 C 7 306, 7 306, 7 306 C 28 330, 28 330, 28 330 C 0 375, 0 375, 0 375 C 10 394, 10 394, 10 394 C 32 394, 32 394, 32 394 C 30 465, 30 465, 30 465 C 83 490, 83 490, 83 490 C 84 491, 84 491, 84 491 C 129 536, 129 536, 129 536 C 225 524, 225 524, 225 524 C 258 478, 258 478, 258 478 C 249 442, 249 442, 249 442 C 271 417, 271 417, 271 417 C 271 360, 271 360, 271 360 C 258 337, 258 337, 258 337 C 304 261, 304 261, 304 261 C 277 237, 277 237, 277 237 C 278 199, 278 199, 278 199 C 242 190, 242 190, 242 190 C 239 151, 239 151, 239 151 C 210 123, 210 123, 210 123 C 209 93, 209 93, 209 93 C 184 78, 184 78, 184 78 C 194 62, 194 62, 194 62 C 194 62, 174 46, 159 28 Z"
      },
      {
        "id": "sp-44",
        "x": 192.10179640718565,
        "y": 134.53424657534248,
        "width": 120.93413173652695,
        "height": 141.34246575342465,
        "localPctX": 0.3892215568862276,
        "localPctY": 0.051369863013698655,
        "localPctW": 0.39520958083832336,
        "localPctH": 0.2636986301369863,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 121 122 L 88 116 L 52 141 L 34 130 L 34 59 L 41 0 L 0 22 L 7 59 L 34 59 L 66 50"
      },
      {
        "id": "sp-45",
        "x": 166.4491017964072,
        "y": 195.1095890410959,
        "width": 32.982035928143716,
        "height": 23.863013698630137,
        "localPctX": 0.3053892215568863,
        "localPctY": 0.1643835616438356,
        "localPctW": 0.10778443113772457,
        "localPctH": 0.04452054794520548,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 0 13 L 18 24 L 33 0"
      },
      {
        "id": "sp-46",
        "x": 157.2874251497006,
        "y": 218.97260273972603,
        "width": 29.317365269461078,
        "height": 44.054794520547944,
        "localPctX": 0.2754491017964072,
        "localPctY": 0.2089041095890411,
        "localPctW": 0.09580838323353294,
        "localPctH": 0.0821917808219178,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 29 0 L 29 44 L 0 29"
      },
      {
        "id": "sp-47",
        "x": 140.79640718562874,
        "y": 261.1917808219178,
        "width": 51.30538922155689,
        "height": 42.21917808219178,
        "localPctX": 0.22155688622754488,
        "localPctY": 0.2876712328767123,
        "localPctW": 0.16766467065868262,
        "localPctH": 0.07876712328767123,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 44 0 L 51 42 L 0 8"
      },
      {
        "id": "sp-48",
        "x": 140.79640718562874,
        "y": 266.6986301369863,
        "width": 86.11976047904191,
        "height": 38.54794520547945,
        "localPctX": 0.22155688622754488,
        "localPctY": 0.2979452054794521,
        "localPctW": 0.281437125748503,
        "localPctH": 0.07191780821917808,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 0 30 L 52 39 L 86 0"
      },
      {
        "id": "sp-49",
        "x": 102.31736526946108,
        "y": 277.71232876712327,
        "width": 142.92215568862275,
        "height": 159.6986301369863,
        "localPctX": 0.09580838323353294,
        "localPctY": 0.31849315068493145,
        "localPctW": 0.46706586826347307,
        "localPctH": 0.2979452054794521,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 91 27 L 106 45 L 117 58 L 143 0 L 106 45 L 51 111 L 50 113 L 9 88 L 91 27 L 51 111 L 50 113 L 0 160"
      },
      {
        "id": "sp-50",
        "x": 296.54491017964074,
        "y": 523.6849315068494,
        "width": 36.64670658682635,
        "height": 60.57534246575342,
        "localPctX": 0.7305389221556887,
        "localPctY": 0.7773972602739727,
        "localPctW": 0.11976047904191617,
        "localPctH": 0.11301369863013698,
        "strokeColor": "#FFFFFF",
        "text": ""
      },
      {
        "id": "sp-51",
        "x": 151.79041916167665,
        "y": 386.01369863013696,
        "width": 144.75449101796409,
        "height": 139.5068493150685,
        "localPctX": 0.2574850299401198,
        "localPctY": 0.5205479452054794,
        "localPctW": 0.4730538922155689,
        "localPctH": 0.26027397260273977,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 0 0 L 1 3 L 1 3 L 1 4 L 15 63 L 102 67 L 143 136 L 145 140"
      },
      {
        "id": "sp-52",
        "x": 157.2874251497006,
        "y": 521.8493150684932,
        "width": 137.4251497005988,
        "height": 75.26027397260275,
        "localPctX": 0.2754491017964072,
        "localPctY": 0.7739726027397261,
        "localPctW": 0.44910179640718567,
        "localPctH": 0.1404109589041096,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 137 0 L 51 47 L 0 75"
      },
      {
        "id": "sp-53",
        "x": 105.98203592814372,
        "y": 448.4246575342466,
        "width": 192.39520958083833,
        "height": 183.56164383561645,
        "localPctX": 0.10778443113772457,
        "localPctY": 0.636986301369863,
        "localPctW": 0.6287425149700598,
        "localPctH": 0.34246575342465757,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 192 184 L 101 121 L 0 53 L 61 0"
      },
      {
        "id": "sp-54",
        "x": 252.56886227544908,
        "y": 398.86301369863014,
        "width": 78.79041916167665,
        "height": 150.5205479452055,
        "localPctX": 0.5868263473053892,
        "localPctY": 0.5445205479452054,
        "localPctW": 0.2574850299401198,
        "localPctH": 0.2808219178082192,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 0 54 L 41 0 L 79 46 L 43 126 L 43 126 L 70 151"
      },
      {
        "id": "sp-55",
        "x": 281.8862275449102,
        "y": 343.79452054794524,
        "width": 67.79640718562874,
        "height": 55.06849315068493,
        "localPctX": 0.6826347305389222,
        "localPctY": 0.44178082191780826,
        "localPctW": 0.22155688622754488,
        "localPctH": 0.10273972602739725,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 12 55 L 0 13 L 68 0"
      },
      {
        "id": "sp-56",
        "x": 281.8862275449102,
        "y": 297.9041095890411,
        "width": 32.982035928143716,
        "height": 55.06849315068493,
        "localPctX": 0.6826347305389222,
        "localPctY": 0.35616438356164387,
        "localPctW": 0.10778443113772457,
        "localPctH": 0.10273972602739725,
        "strokeColor": "#FFFFFF",
        "text": ""
      },
      {
        "id": "sp-57",
        "x": 151.79041916167665,
        "y": 334.6164383561644,
        "width": 130.09580838323353,
        "height": 55.06849315068493,
        "localPctX": 0.2574850299401198,
        "localPctY": 0.4246575342465754,
        "localPctW": 0.4251497005988024,
        "localPctH": 0.10273972602739725,
        "strokeColor": "#FFFFFF",
        "text": "",
        "pathD": "M 130 22 L 129 22 L 66 0 L 1 54 L 0 55"
      }
    ],
    "x": 73,
    "y": 107,
    "width": 306,
    "height": 536
  },
  {
    "id": "sp-0",
    "x": 0,
    "y": 271,
    "width": 1280,
    "height": 394,
    "text": ""
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 220,
    "y": 107,
    "width": 308,
    "height": 10,
    "text": ""
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 217,
    "y": 642,
    "width": 311,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-1",
    "x": 511,
    "y": 177,
    "width": 38,
    "height": 96,
    "text": "",
    "pathD": "M 10 0 L 29 0 L 29 58 L 38 58 L 19 96 L 0 58 L 10 58 Z"
  },
  {
    "id": "sp-2",
    "x": 511,
    "y": 116,
    "width": 38,
    "height": 62,
    "text": "",
    "pathD": "M 10 0 L 29 0 L 29 37 L 38 37 L 19 62 L 0 37 L 10 37 Z"
  },
  {
    "id": "sp-3",
    "x": 511,
    "y": 387,
    "width": 38,
    "height": 248,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 29 0 L 29 149 L 38 149 L 19 248 L 0 149 L 10 149 Z"
  },
  {
    "id": "sp-4",
    "x": 511,
    "y": 280,
    "width": 38,
    "height": 169,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 29 0 L 29 101 L 38 101 L 19 169 L 0 101 L 10 101 Z"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 588,
    "y": 121,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 586,
    "y": 154,
    "width": 593,
    "height": 35,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 588,
    "y": 348,
    "width": 111,
    "height": 36,
    "text": "Your title"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 586,
    "y": 381,
    "width": 593,
    "height": 35,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 397,
    "y": 147,
    "width": 85,
    "height": 48,
    "text": "25%"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 1,
    "x": 397,
    "y": 413,
    "width": 85,
    "height": 48,
    "text": "75%"
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

export function Migso125Template({ data }: { data: BrainData }): ReactElement {
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
