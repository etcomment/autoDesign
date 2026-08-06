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
        "id": "sp-8",
        "x": 564.6622516556291,
        "y": 314.84210526315786,
        "width": 102.33774834437085,
        "height": 116.1561403508772,
        "localPctX": 0.662251655629139,
        "localPctY": 0.26315789473684204,
        "localPctW": 0.3377483443708609,
        "localPctH": 0.25087719298245614,
        "fillColor": "#32A8D7",
        "text": "",
        "pathD": "M 95 35 C 102 116, 102 116, 102 116 C 85 99, 85 99, 85 99 C 23 42, 0 0, 0 0 C 69 5, 69 5, 69 5 C 69 5, 69 5, 69 5 C 77 18, 86 30, 95 35 Z"
      },
      {
        "id": "sp-9",
        "x": 564.6622516556291,
        "y": 314.84210526315786,
        "width": 92.3046357615894,
        "height": 147.83508771929823,
        "localPctX": 0.662251655629139,
        "localPctY": 0.26315789473684204,
        "localPctW": 0.3046357615894039,
        "localPctH": 0.319298245614035,
        "fillColor": "#12426D",
        "text": "",
        "pathD": "M 86 99 C 86 99, 92 120, 84 148 C 84 148, 84 148, 84 148 C 54 86, 54 86, 54 86 C 22 89, 22 89, 22 89 C 8 36, 8 36, 8 36 C 0 0, 0 0, 0 0 C 0 0, 23 42, 86 99 Z"
      },
      {
        "id": "sp-10",
        "x": 515.8344370860927,
        "y": 400.9438596491228,
        "width": 132.43708609271522,
        "height": 133.21403508771928,
        "localPctX": 0.501103752759382,
        "localPctY": 0.4491228070175439,
        "localPctW": 0.43708609271523174,
        "localPctH": 0.287719298245614,
        "fillColor": "#12689B",
        "text": "",
        "pathD": "M 132 61 C 132 61, 132 61, 132 61 C 125 84, 106 111, 61 133 C 49 95, 49 95, 49 95 C 31 115, 31 115, 31 115 C 0 86, 0 86, 0 86 C 16 3, 16 3, 16 3 C 70 3, 70 3, 70 3 C 102 0, 102 0, 102 0 L 132 61 Z"
      },
      {
        "id": "sp-11",
        "x": 539.2450331125829,
        "y": 279.1017543859649,
        "width": 94.31125827814569,
        "height": 40.614035087719294,
        "localPctX": 0.5783664459161151,
        "localPctY": 0.18596491228070175,
        "localPctW": 0.31125827814569534,
        "localPctH": 0.08771929824561403,
        "fillColor": "#12689B",
        "text": "",
        "pathD": "M 94 41 C 25 35, 25 35, 25 35 C 0 0, 0 0, 0 0 C 77 9, 77 9, 77 9 C 82 18, 88 30, 94 41 Z"
      },
      {
        "id": "sp-12",
        "x": 539.2450331125829,
        "y": 263.6684210526316,
        "width": 76.9205298013245,
        "height": 24.36842105263158,
        "localPctX": 0.5783664459161151,
        "localPctY": 0.1526315789473684,
        "localPctW": 0.25386313465783666,
        "localPctH": 0.05263157894736842,
        "fillColor": "#C8DFED",
        "text": "",
        "pathD": "M 77 24 C 0 16, 0 16, 0 16 C 40 1, 40 1, 40 1 C 66 0, 66 0, 66 0 C 66 0, 69 10, 77 24 Z"
      },
      {
        "id": "sp-13",
        "x": 388.0794701986755,
        "y": 340.83508771929826,
        "width": 198.65562913907283,
        "height": 146.21052631578948,
        "localPctX": 0.07947019867549668,
        "localPctY": 0.31929824561403514,
        "localPctW": 0.6556291390728476,
        "localPctH": 0.31578947368421056,
        "fillColor": "#10728E",
        "text": "",
        "pathD": "M 185 10 C 199 63, 199 63, 199 63 C 144 63, 144 63, 144 63 C 128 146, 128 146, 128 146 C 128 146, 42 128, 27 131 C 0 102, 0 102, 0 102 C 0 0, 0 0, 0 0 C 56 10, 56 10, 56 10 C 86 111, 86 111, 86 111 C 128 10, 128 10, 128 10 L 185 10 Z"
      },
      {
        "id": "sp-14",
        "x": 539.2450331125829,
        "y": 193,
        "width": 40.80132450331126,
        "height": 86.10175438596491,
        "localPctX": 0.5783664459161151,
        "localPctY": 0,
        "localPctW": 0.1346578366445916,
        "localPctH": 0.18596491228070175,
        "fillColor": "#F5F8FA",
        "text": "",
        "pathD": "M 0 0 L 41 72 L 0 86 L 0 0 Z"
      },
      {
        "id": "sp-15",
        "x": 487.7417218543046,
        "y": 495.98070175438596,
        "width": 89.62913907284768,
        "height": 72.29298245614035,
        "localPctX": 0.40838852097130235,
        "localPctY": 0.6543859649122807,
        "localPctW": 0.2958057395143488,
        "localPctH": 0.15614035087719297,
        "fillColor": "#12426D",
        "text": "",
        "pathD": "M 77 0 L 90 38 L 86 72 L 0 4 L 59 19 L 77 0 Z"
      },
      {
        "id": "sp-16",
        "x": 515.8344370860927,
        "y": 314.84210526315786,
        "width": 57.52317880794702,
        "height": 35.74035087719298,
        "localPctX": 0.501103752759382,
        "localPctY": 0.26315789473684204,
        "localPctW": 0.18984547461368653,
        "localPctH": 0.07719298245614034,
        "fillColor": "#12689B",
        "text": "",
        "pathD": "M 49 0 L 58 36 L 0 36 L 49 0 Z"
      },
      {
        "id": "sp-17",
        "x": 388.0794701986755,
        "y": 442.3701754385965,
        "width": 185.27814569536423,
        "height": 199.82105263157894,
        "localPctX": 0.07947019867549668,
        "localPctY": 0.5385964912280702,
        "localPctW": 0.6114790286975718,
        "localPctH": 0.431578947368421,
        "fillColor": "#08588F",
        "text": "",
        "pathD": "M 185 126 C 182 146, 182 146, 182 146 C 128 116, 128 116, 128 116 C 128 163, 128 163, 128 163 C 100 91, 100 91, 100 91 C 101 200, 101 200, 101 200 C 92 183, 77 156, 61 126 C 86 62, 86 62, 86 62 C 40 59, 40 59, 40 59 C 17 39, 17 39, 17 39 C 7 19, 0 4, 0 0 C 27 29, 27 29, 27 29 C 42 26, 128 45, 128 45 C 159 74, 159 74, 159 74 C 100 59, 100 59, 100 59 L 185 126 Z"
      },
      {
        "id": "sp-18",
        "x": 487.7417218543046,
        "y": 532.5333333333333,
        "width": 82.94039735099338,
        "height": 124.27894736842104,
        "localPctX": 0.40838852097130235,
        "localPctY": 0.7333333333333333,
        "localPctW": 0.2737306843267108,
        "localPctH": 0.26842105263157895,
        "fillColor": "#0D7899",
        "text": "",
        "pathD": "M 83 55 C 28 99, 28 99, 28 99 C 21 82, 21 82, 21 82 C 9 124, 9 124, 9 124 C 9 124, 7 119, 1 109 C 0 0, 0 0, 0 0 C 28 73, 28 73, 28 73 C 28 25, 28 25, 28 25 L 83 55 Z"
      },
      {
        "id": "sp-19",
        "x": 473.6953642384106,
        "y": 279.1017543859649,
        "width": 90.96688741721854,
        "height": 71.48070175438596,
        "localPctX": 0.3620309050772627,
        "localPctY": 0.18596491228070175,
        "localPctW": 0.30022075055187636,
        "localPctH": 0.15438596491228068,
        "fillColor": "#32A8D7",
        "text": "",
        "pathD": "M 66 0 L 91 36 L 42 71 L 0 17 L 66 0 Z"
      },
      {
        "id": "sp-20",
        "x": 495.7682119205298,
        "y": 193,
        "width": 43.47682119205298,
        "height": 86.10175438596491,
        "localPctX": 0.43487858719646794,
        "localPctY": 0,
        "localPctW": 0.1434878587196468,
        "localPctH": 0.18596491228070175,
        "fillColor": "#32A8D7",
        "text": "",
        "pathD": "M 43 0 L 43 86 L 0 68 L 43 0 Z"
      },
      {
        "id": "sp-21",
        "x": 473.6953642384106,
        "y": 260.419298245614,
        "width": 66.21854304635761,
        "height": 35.74035087719298,
        "localPctX": 0.3620309050772627,
        "localPctY": 0.14561403508771925,
        "localPctW": 0.21854304635761587,
        "localPctH": 0.07719298245614034,
        "fillColor": "#12426D",
        "text": "",
        "pathD": "M 66 19 L 0 36 L 0 0 L 23 0 L 66 19 Z"
      },
      {
        "id": "sp-22",
        "x": 428.2119205298013,
        "y": 293.72280701754386,
        "width": 87.62251655629139,
        "height": 56.04736842105263,
        "localPctX": 0.21192052980132448,
        "localPctY": 0.2175438596491228,
        "localPctW": 0.2891832229580574,
        "localPctH": 0.12105263157894737,
        "fillColor": "#F5F8FA",
        "text": "",
        "pathD": "M 45 2 L 88 56 L 16 56 L 0 0 L 45 2 Z"
      },
      {
        "id": "sp-23",
        "x": 444.26490066225165,
        "y": 349.7701754385965,
        "width": 71.56953642384106,
        "height": 100.72280701754386,
        "localPctX": 0.2649006622516556,
        "localPctY": 0.3385964912280702,
        "localPctW": 0.23620309050772625,
        "localPctH": 0.2175438596491228,
        "fillColor": "#1997A7",
        "text": "",
        "pathD": "M 72 0 L 29 101 L 0 0 L 72 0 Z"
      },
      {
        "id": "sp-24",
        "x": 404.80132450331126,
        "y": 481.359649122807,
        "width": 68.89403973509934,
        "height": 86.9140350877193,
        "localPctX": 0.13465783664459163,
        "localPctY": 0.6228070175438596,
        "localPctW": 0.2273730684326711,
        "localPctH": 0.18771929824561404,
        "fillColor": "#12689B",
        "text": "",
        "pathD": "M 69 23 C 44 87, 44 87, 44 87 C 28 56, 12 25, 0 0 C 24 19, 24 19, 24 19 L 69 23 Z"
      },
      {
        "id": "sp-25",
        "x": 388.0794701986755,
        "y": 293.72280701754386,
        "width": 56.185430463576154,
        "height": 56.04736842105263,
        "localPctX": 0.07947019867549668,
        "localPctY": 0.2175438596491228,
        "localPctW": 0.18543046357615892,
        "localPctH": 0.12105263157894737,
        "fillColor": "#32A8D7",
        "text": "",
        "pathD": "M 40 0 L 56 56 L 0 46 L 40 0 Z"
      },
      {
        "id": "sp-26",
        "x": 364,
        "y": 340.83508771929826,
        "width": 23.410596026490065,
        "height": 101.53508771929825,
        "localPctX": 0,
        "localPctY": 0.31929824561403514,
        "localPctW": 0.07726269315673288,
        "localPctH": 0.2192982456140351,
        "fillColor": "#1997A7",
        "text": "",
        "pathD": "M 23 0 L 23 102 L 0 99 L 0 27 L 23 0 Z"
      }
    ],
    "x": 364,
    "y": 193,
    "width": 303,
    "height": 463
  },
  {
    "id": "sp-0",
    "x": 0,
    "y": 360,
    "width": 1280,
    "height": 305,
    "text": ""
  },
  {
    "id": "sp-1",
    "x": 860,
    "y": 278,
    "width": 136,
    "height": 95,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 51 74 C 49 74, 47 76, 47 78 C 47 81, 49 83, 51 83 C 54 83, 55 81, 55 78 C 55 76, 54 74, 51 74 Z M 34 74 C 31 74, 29 76, 29 78 C 29 81, 31 83, 34 83 C 36 83, 38 81, 38 78 C 38 76, 36 74, 34 74 Z M 16 74 C 14 74, 12 76, 12 78 C 12 81, 14 83, 16 83 C 19 83, 21 81, 21 78 C 21 76, 19 74, 16 74 Z M 118 66 C 119 66, 119 66, 120 67 C 120 67, 120 67, 120 67 C 121 67, 122 67, 122 68 C 122 68, 122 68, 122 68 C 123 69, 123 70, 123 72 C 123 72, 123 72, 123 72 C 123 72, 123 72, 123 72 C 123 73, 123 74, 122 75 C 122 75, 122 75, 122 75 L 122 75 L 125 78 C 124 79, 123 80, 121 81 C 121 81, 121 81, 121 81 C 121 81, 121 81, 121 81 L 119 77 L 119 77 L 119 77 C 119 77, 118 77, 118 77 C 117 77, 116 77, 116 77 C 116 77, 116 77, 116 77 C 114 76, 113 75, 113 74 C 113 74, 113 74, 113 74 C 112 73, 112 73, 112 72 C 112 72, 112 72, 112 71 C 112 71, 112 71, 112 71 C 112 70, 113 69, 114 68 C 114 68, 114 68, 114 68 C 114 67, 115 67, 116 67 C 116 67, 116 67, 116 67 C 117 66, 117 66, 118 66 Z M 94 66 C 95 66, 95 66, 96 67 C 96 67, 96 67, 96 67 C 97 67, 98 67, 98 68 L 98 68 L 102 66 C 102 66, 102 66, 102 66 C 102 67, 103 67, 103 68 C 103 68, 103 69, 104 70 C 104 71, 104 71, 104 71 C 104 71, 104 71, 104 71 L 100 72 L 100 72 C 100 72, 100 72, 100 72 C 100 73, 99 74, 99 75 C 99 75, 99 75, 99 75 L 99 75 L 101 78 C 100 79, 99 80, 98 81 C 97 81, 97 81, 97 81 C 97 81, 97 81, 97 81 L 95 77 L 95 77 C 95 77, 94 77, 94 77 C 93 77, 93 77, 92 77 C 92 77, 92 77, 92 77 C 91 76, 90 75, 89 74 C 89 74, 89 74, 89 74 C 89 73, 89 73, 89 72 C 89 72, 89 72, 89 71 C 89 71, 89 71, 89 71 C 89 70, 89 69, 90 68 C 90 68, 90 68, 90 68 C 91 67, 91 67, 92 67 C 92 67, 92 67, 92 67 C 93 66, 93 66, 94 66 Z M 118 62 L 118 62 L 120 63 C 120 63, 120 63, 120 63 L 120 66 C 119 66, 118 66, 118 66 C 117 66, 117 66, 116 66 L 115 63 L 112 64 C 112 65, 111 65, 110 66 L 110 66 L 114 68 C 113 69, 112 70, 112 71 L 108 71 L 108 71 C 108 71, 108 71, 108 72 C 108 73, 108 74, 109 75 L 110 77 L 113 74 C 113 75, 114 76, 116 77 L 114 80 L 114 80 L 112 79 L 112 79 C 112 80, 113 80, 114 80 L 114 80 C 115 81, 116 81, 118 81 C 119 81, 120 81, 121 81 C 121 81, 121 81, 121 81 C 121 81, 121 81, 121 81 C 123 80, 124 79, 125 78 C 125 78, 126 77, 126 77 C 127 76, 127 74, 127 72 C 127 72, 127 72, 127 71 L 127 71 L 123 72 C 123 72, 123 72, 123 72 C 123 70, 123 69, 122 68 L 126 66 L 126 66 C 124 65, 123 63, 120 63 C 120 63, 120 63, 120 63 C 120 62, 119 62, 118 62 Z M 94 62 L 94 62 L 97 63 C 97 63, 97 63, 97 63 L 96 66 C 95 66, 95 66, 94 66 C 93 66, 93 66, 92 66 L 92 63 L 89 64 C 88 65, 87 65, 86 66 L 86 66 L 90 68 C 89 69, 89 70, 88 71 L 85 71 L 85 71 C 85 71, 85 71, 85 72 C 85 73, 85 74, 85 75 L 86 77 L 89 74 C 90 75, 91 76, 92 77 L 90 80 L 90 80 L 90 80 C 91 81, 93 81, 94 81 C 95 81, 96 81, 97 81 C 97 81, 97 81, 97 81 C 97 81, 97 81, 98 81 C 99 80, 100 79, 101 78 C 102 78, 102 77, 102 77 C 103 76, 104 74, 104 72 C 104 72, 104 72, 104 71 C 104 71, 104 71, 104 71 C 104 71, 104 71, 104 70 C 103 69, 103 68, 103 68 C 103 67, 102 67, 102 66 C 102 66, 102 66, 102 66 C 101 65, 99 63, 97 63 C 97 63, 97 63, 97 63 C 96 62, 95 62, 94 62 Z M 0 54 L 23 54 L 31 59 L 82 59 L 90 54 L 136 54 C 136 54, 135 71, 132 83 C 130 90, 126 95, 121 95 L 83 95 L 53 95 L 15 95 C 10 95, 6 90, 4 83 C 1 71, 0 54, 0 54 Z M 77 45 L 77 49 L 82 49 L 82 45 Z M 67 45 L 67 49 L 72 49 L 72 45 Z M 57 45 L 57 49 L 63 49 L 63 45 Z M 48 45 L 48 49 L 53 49 L 53 45 Z M 38 45 L 38 49 L 43 49 L 43 45 Z M 28 45 L 28 49 L 33 49 L 33 45 Z M 19 45 L 19 49 L 24 49 L 24 45 Z M 81 38 L 81 42 L 86 42 L 86 38 Z M 71 38 L 71 42 L 76 42 L 76 38 Z M 61 38 L 61 42 L 66 42 L 66 38 Z M 51 38 L 51 42 L 57 42 L 57 38 Z M 42 38 L 42 42 L 47 42 L 47 38 Z M 32 38 L 32 42 L 37 42 L 37 38 Z M 23 38 L 23 42 L 28 42 L 28 38 Z M 93 24 L 93 28 L 98 28 L 98 24 Z M 83 24 L 83 28 L 88 28 L 88 24 Z M 73 24 L 73 28 L 79 28 L 79 24 Z M 64 24 L 64 28 L 69 28 L 69 24 Z M 54 24 L 54 28 L 59 28 L 59 24 Z M 45 24 L 45 28 L 50 28 L 50 24 Z M 35 24 L 35 28 L 40 28 L 40 24 Z M 31 18 L 100 18 L 105 32 L 26 32 L 25 33 L 106 33 L 106 33 L 112 33 L 113 38 L 91 38 L 90 42 L 115 42 L 116 45 L 116 45 L 88 45 L 88 49 L 118 49 L 119 53 L 90 53 L 82 58 L 31 58 L 23 53 L 11 53 L 18 33 L 25 33 Z M 61 12 L 96 12 L 97 17 L 60 17 Z M 35 6 L 48 6 L 48 17 L 35 17 Z M 33 0 L 50 0 L 50 5 L 33 5 Z"
  },
  {
    "id": "sp-2",
    "x": 714,
    "y": 458,
    "width": 498,
    "height": 34,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 715,
    "y": 416,
    "width": 163,
    "height": 36,
    "text": "Your title here"
  },
  {
    "id": "sp-4",
    "x": 58,
    "y": 177,
    "width": 329,
    "height": 61,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 58,
    "y": 135,
    "width": 163,
    "height": 36,
    "text": "Your title here"
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

export function Migso124Template({ data }: { data: BrainData }): ReactElement {
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
