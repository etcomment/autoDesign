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
        "id": "sp-2",
        "x": 58,
        "y": 494.9,
        "width": 287.18270944741533,
        "height": 175.1,
        "localPctX": 0,
        "localPctY": 0.678125,
        "localPctW": 0.2415329768270945,
        "localPctH": 0.32187499999999997,
        "fillColor": "#ffffff",
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-3",
        "x": 58,
        "y": 310.45,
        "width": 588.1417112299466,
        "height": 175.1,
        "localPctX": 0,
        "localPctY": 0.3390625,
        "localPctW": 0.4946524064171124,
        "localPctH": 0.32187499999999997,
        "fillColor": "#ffffff",
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-4",
        "x": 58,
        "y": 126,
        "width": 287.18270944741533,
        "height": 175.1,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.2415329768270945,
        "localPctH": 0.32187499999999997,
        "fillColor": "#ffffff",
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-5",
        "x": 358.95900178253123,
        "y": 494.9,
        "width": 287.18270944741533,
        "height": 175.1,
        "localPctX": 0.2531194295900179,
        "localPctY": 0.678125,
        "localPctW": 0.2415329768270945,
        "localPctH": 0.32187499999999997,
        "fillColor": "#ffffff",
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-6",
        "x": 659.9180035650625,
        "y": 494.9,
        "width": 287.18270944741533,
        "height": 175.1,
        "localPctX": 0.5062388591800357,
        "localPctY": 0.678125,
        "localPctW": 0.2415329768270945,
        "localPctH": 0.32187499999999997,
        "fillColor": "#ffffff",
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-7",
        "x": 959.8172905525847,
        "y": 494.9,
        "width": 287.18270944741533,
        "height": 175.1,
        "localPctX": 0.7584670231729056,
        "localPctY": 0.678125,
        "localPctW": 0.2415329768270945,
        "localPctH": 0.32187499999999997,
        "fillColor": "#ffffff",
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-8",
        "x": 358.95900178253123,
        "y": 126,
        "width": 287.18270944741533,
        "height": 175.1,
        "localPctX": 0.2531194295900179,
        "localPctY": 0,
        "localPctW": 0.2415329768270945,
        "localPctH": 0.32187499999999997,
        "fillColor": "#ffffff",
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-9",
        "x": 659.9180035650625,
        "y": 126,
        "width": 588.1417112299466,
        "height": 359.55,
        "localPctX": 0.5062388591800357,
        "localPctY": 0,
        "localPctW": 0.4946524064171124,
        "localPctH": 0.6609375000000001,
        "fillColor": "#ffffff",
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-10",
        "x": 685.3511586452764,
        "y": 135.35,
        "width": 181.21122994652407,
        "height": 35.699999999999996,
        "localPctX": 0.5276292335115865,
        "localPctY": 0.01718749999999999,
        "localPctW": 0.15240641711229946,
        "localPctH": 0.06562499999999999,
        "text": "Latest activities",
        "textSize": 16
      },
      {
        "id": "sp-11",
        "x": 108.86631016042782,
        "y": 189.75,
        "width": 186.50980392156865,
        "height": 149.6,
        "localPctX": 0.04278074866310161,
        "localPctY": 0.1171875,
        "localPctW": 0.15686274509803924,
        "localPctH": 0.27499999999999997,
        "fillColor": "#ffffff"
      },
      {
        "id": "sp-12",
        "x": 86.61229946524065,
        "y": 135.35,
        "width": 166.37522281639932,
        "height": 35.699999999999996,
        "localPctX": 0.024064171122994662,
        "localPctY": 0.01718749999999999,
        "localPctW": 0.1399286987522282,
        "localPctH": 0.06562499999999999,
        "text": "Your business",
        "textSize": 16
      },
      {
        "id": "sp-13",
        "x": 387.5713012477719,
        "y": 135.35,
        "width": 191.8083778966132,
        "height": 35.699999999999996,
        "localPctX": 0.2771836007130125,
        "localPctY": 0.01718749999999999,
        "localPctW": 0.16131907308377896,
        "localPctH": 0.06562499999999999,
        "text": "Industry average",
        "textSize": 16
      },
      {
        "id": "sp-14",
        "x": 108.86631016042782,
        "y": 189.75,
        "width": 186.50980392156865,
        "height": 149.6,
        "localPctX": 0.04278074866310161,
        "localPctY": 0.1171875,
        "localPctW": 0.15686274509803924,
        "localPctH": 0.27499999999999997,
        "fillColor": "#3365cc"
      },
      {
        "id": "sp-45",
        "x": 82.37344028520499,
        "y": 263.7,
        "width": 236.31639928698755,
        "height": 10,
        "localPctX": 0.020499108734402853,
        "localPctY": 0.253125,
        "localPctW": 0.19875222816399288,
        "localPctH": 0.001838235294117647,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-15",
        "x": 208.47950089126562,
        "y": 189.75,
        "width": 18.015151515151516,
        "height": 83.3,
        "localPctX": 0.12655971479500894,
        "localPctY": 0.1171875,
        "localPctW": 0.015151515151515152,
        "localPctH": 0.15312499999999998,
        "fillColor": "#ffffff",
        "pathD": "M 9 0 L 18 77 L 18 77 L 9 83 L 0 77 L 0 77 Z"
      },
      {
        "id": "sp-16",
        "x": 272.0623885918004,
        "y": 173.6,
        "width": 50.866310160427815,
        "height": 28.9,
        "localPctX": 0.18003565062388596,
        "localPctY": 0.0875,
        "localPctW": 0.04278074866310161,
        "localPctH": 0.053125,
        "text": "6/10",
        "textSize": 12
      },
      {
        "id": "sp-17",
        "x": 94.03030303030303,
        "y": 263.7,
        "width": 48.746880570409985,
        "height": 28.9,
        "localPctX": 0.030303030303030304,
        "localPctY": 0.253125,
        "localPctW": 0.040998217468805706,
        "localPctH": 0.053125,
        "text": "Low",
        "textSize": 12
      },
      {
        "id": "sp-18",
        "x": 259.34581105169343,
        "y": 263.7,
        "width": 51.92602495543672,
        "height": 28.9,
        "localPctX": 0.16934046345811055,
        "localPctY": 0.253125,
        "localPctW": 0.04367201426024956,
        "localPctH": 0.053125,
        "text": "High",
        "textSize": 12
      },
      {
        "id": "sp-19",
        "x": 407.7058823529412,
        "y": 189.75,
        "width": 186.50980392156865,
        "height": 149.6,
        "localPctX": 0.29411764705882354,
        "localPctY": 0.1171875,
        "localPctW": 0.15686274509803924,
        "localPctH": 0.27499999999999997,
        "fillColor": "#ffffff"
      },
      {
        "id": "sp-20",
        "x": 407.7058823529412,
        "y": 189.75,
        "width": 186.50980392156865,
        "height": 149.6,
        "localPctX": 0.29411764705882354,
        "localPctY": 0.1171875,
        "localPctW": 0.15686274509803924,
        "localPctH": 0.27499999999999997,
        "fillColor": "#52c49c"
      },
      {
        "id": "sp-46",
        "x": 383.3324420677362,
        "y": 263.7,
        "width": 236.31639928698755,
        "height": 10,
        "localPctX": 0.27361853832442073,
        "localPctY": 0.253125,
        "localPctW": 0.19875222816399288,
        "localPctH": 0.001838235294117647,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-21",
        "x": 530.6327985739752,
        "y": 200.8,
        "width": 18.015151515151516,
        "height": 83.3,
        "localPctX": 0.3975044563279858,
        "localPctY": 0.1375,
        "localPctW": 0.015151515151515152,
        "localPctH": 0.15312499999999998,
        "fillColor": "#ffffff",
        "pathD": "M 9 0 L 18 77 L 18 77 L 9 83 L 0 77 L 0 77 Z"
      },
      {
        "id": "sp-22",
        "x": 563.4839572192515,
        "y": 173.6,
        "width": 50.866310160427815,
        "height": 28.9,
        "localPctX": 0.4251336898395723,
        "localPctY": 0.0875,
        "localPctW": 0.04278074866310161,
        "localPctH": 0.053125,
        "text": "8/10",
        "textSize": 12
      },
      {
        "id": "sp-23",
        "x": 394.98930481283423,
        "y": 263.7,
        "width": 48.746880570409985,
        "height": 28.9,
        "localPctX": 0.28342245989304815,
        "localPctY": 0.253125,
        "localPctW": 0.040998217468805706,
        "localPctH": 0.053125,
        "text": "Low",
        "textSize": 12
      },
      {
        "id": "sp-24",
        "x": 557.125668449198,
        "y": 263.7,
        "width": 51.92602495543672,
        "height": 28.9,
        "localPctX": 0.41978609625668456,
        "localPctY": 0.253125,
        "localPctW": 0.04367201426024956,
        "localPctH": 0.053125,
        "text": "High",
        "textSize": 12
      },
      {
        "id": "sp-25",
        "x": 82.37344028520499,
        "y": 344.45,
        "width": 29.672014260249558,
        "height": 23.8,
        "localPctX": 0.020499108734402853,
        "localPctY": 0.4015625,
        "localPctW": 0.024955436720142606,
        "localPctH": 0.043750000000000004,
        "pathD": "M 23 15 L 23 20 L 26 20 L 26 16 C 26 16, 25 15, 24 15 L 23 15 Z M 8 15 L 8 23 L 22 23 L 22 15 L 8 15 Z M 5 15 C 5 15, 4 16, 4 16 L 4 20 L 7 20 L 7 15 L 5 15 Z M 1 12 L 1 20 C 1 20, 1 20, 2 20 L 3 20 L 3 16 C 3 15, 4 14, 5 14 L 24 14 C 26 14, 27 15, 27 16 L 27 20 L 28 20 C 28 20, 29 20, 29 20 L 29 12 L 1 12 Z M 8 10 C 8 10, 8 10, 8 10 C 8 10, 8 10, 8 10 C 7 10, 7 10, 7 10 C 7 10, 7 10, 8 10 Z M 5 10 C 6 10, 6 10, 6 10 C 6 10, 6 10, 5 10 C 5 10, 5 10, 5 10 C 5 10, 5 10, 5 10 Z M 3 10 C 3 10, 3 10, 3 10 C 3 10, 3 10, 3 10 C 3 10, 2 10, 2 10 C 2 10, 3 10, 3 10 Z M 2 8 C 1 8, 1 9, 1 9 L 1 12 L 29 12 L 29 9 C 29 9, 28 8, 28 8 L 2 8 Z M 23 5 L 23 8 L 26 8 L 26 5 L 23 5 Z M 4 5 L 4 8 L 7 8 L 7 5 L 4 5 Z M 8 1 L 8 8 L 22 8 L 22 1 L 8 1 Z M 7 0 L 23 0 C 23 0, 23 0, 23 0 L 23 4 L 26 4 C 26 4, 27 4, 27 4 L 27 8 L 28 8 C 29 8, 30 8, 30 9 L 30 20 C 30 20, 29 21, 28 21 L 23 21 L 23 23 C 23 24, 23 24, 23 24 L 7 24 C 7 24, 7 24, 7 23 L 7 21 L 2 21 C 1 21, 0 20, 0 20 L 0 9 C 0 8, 1 8, 2 8 L 3 8 L 3 4 C 3 4, 3 4, 3 4 L 7 4 L 7 0 C 7 0, 7 0, 7 0 Z"
      },
      {
        "id": "sp-26",
        "x": 83.43315508021391,
        "y": 397.15,
        "width": 28.612299465240643,
        "height": 23.8,
        "localPctX": 0.021390374331550804,
        "localPctY": 0.4984375,
        "localPctW": 0.02406417112299465,
        "localPctH": 0.043750000000000004,
        "pathD": "M 17 17 L 20 17 C 20 17, 20 18, 20 18 C 20 18, 20 18, 20 18 L 17 18 C 16 18, 16 18, 16 18 C 16 18, 16 17, 17 17 Z M 4 17 L 14 17 C 15 17, 15 18, 15 18 C 15 18, 15 18, 14 18 L 4 18 C 3 18, 3 18, 3 18 C 3 18, 3 17, 4 17 Z M 17 15 L 22 15 C 22 15, 22 15, 22 15 C 22 15, 22 16, 22 16 L 17 16 C 16 16, 16 15, 16 15 C 16 15, 16 15, 17 15 Z M 10 15 L 13 15 C 13 15, 14 15, 14 15 C 14 15, 13 16, 13 16 L 10 16 C 9 16, 9 15, 9 15 C 9 15, 9 15, 10 15 Z M 17 13 L 20 13 C 21 13, 21 13, 21 13 C 21 13, 21 13, 20 13 L 17 13 C 16 13, 16 13, 16 13 C 16 13, 16 13, 17 13 Z M 10 13 L 14 13 C 15 13, 15 13, 15 13 C 15 13, 15 13, 14 13 L 10 13 C 9 13, 9 13, 9 13 C 9 13, 9 13, 10 13 Z M 4 11 L 4 15 L 7 15 L 7 11 L 4 11 Z M 17 10 L 22 10 C 22 10, 22 10, 22 10 C 22 11, 22 11, 22 11 L 17 11 C 16 11, 16 11, 16 10 C 16 10, 16 10, 17 10 Z M 10 10 L 14 10 C 15 10, 15 10, 15 10 C 15 11, 15 11, 14 11 L 10 11 C 9 11, 9 11, 9 10 C 9 10, 9 10, 10 10 Z M 4 10 L 7 10 C 8 10, 8 10, 8 10 L 8 15 C 8 15, 8 16, 7 16 L 4 16 C 3 16, 3 15, 3 15 L 3 10 C 3 10, 3 10, 4 10 Z M 17 8 L 22 8 C 22 8, 22 8, 22 8 C 22 8, 22 9, 22 9 L 17 9 C 16 9, 16 8, 16 8 C 16 8, 16 8, 17 8 Z M 4 8 L 14 8 C 15 8, 15 8, 15 8 C 15 8, 15 9, 14 9 L 4 9 C 3 9, 3 8, 3 8 C 3 8, 3 8, 4 8 Z M 25 4 L 25 21 C 25 21, 25 21, 25 21 L 5 21 L 5 23 L 28 23 L 28 4 L 25 4 Z M 4 3 L 4 5 L 21 5 L 21 3 L 4 3 Z M 4 2 L 22 2 C 22 2, 22 3, 22 3 L 22 6 C 22 6, 22 6, 22 6 L 4 6 C 3 6, 3 6, 3 6 L 3 3 C 3 3, 3 2, 4 2 Z M 1 1 L 1 20 L 24 20 L 24 1 L 1 1 Z M 0 0 L 25 0 C 25 0, 25 0, 25 0 L 25 3 L 28 3 C 28 3, 29 3, 29 3 L 29 23 C 29 24, 28 24, 28 24 L 4 24 C 4 24, 4 24, 4 23 L 4 21 L 0 21 C 0 21, 0 21, 0 21 L 0 0 C 0 0, 0 0, 0 0 Z"
      },
      {
        "id": "sp-27",
        "x": 82.37344028520499,
        "y": 449,
        "width": 29.672014260249558,
        "height": 23.8,
        "localPctX": 0.020499108734402853,
        "localPctY": 0.59375,
        "localPctW": 0.024955436720142606,
        "localPctH": 0.043750000000000004,
        "pathD": "M 23 16 L 20 19 L 25 23 C 26 23, 26 23, 27 23 L 29 21 C 29 21, 29 21, 29 21 C 29 21, 29 21, 29 20 L 23 16 Z M 20 15 C 20 15, 20 15, 19 16 C 19 16, 19 16, 19 16 L 20 18 L 22 16 L 20 15 Z M 11 5 C 12 5, 12 5, 12 5 C 12 5, 12 5, 11 5 C 9 5, 7 7, 7 9 C 7 9, 7 9, 6 9 C 6 9, 6 9, 6 9 C 6 7, 8 5, 11 5 Z M 11 3 C 10 3, 8 4, 6 5 C 3 7, 3 11, 6 13 C 8 14, 10 15, 11 15 C 13 15, 15 14, 17 13 C 18 12, 19 11, 19 9 C 19 8, 18 6, 17 5 C 15 4, 13 3, 11 3 Z M 11 3 C 14 3, 16 3, 17 5 C 19 6, 20 7, 20 9 C 20 11, 19 13, 17 14 C 16 15, 14 16, 11 16 C 9 16, 7 15, 6 14 C 2 11, 2 7, 6 5 C 7 3, 9 3, 11 3 Z M 11 1 C 9 1, 6 2, 4 3 C 0 6, 0 12, 4 15 C 8 18, 15 18, 19 15 C 21 13, 22 11, 22 9 C 22 7, 21 5, 19 3 C 17 2, 14 1, 11 1 Z M 11 0 C 14 0, 17 1, 19 3 C 21 4, 23 7, 23 9 C 23 11, 22 13, 21 14 L 22 16 L 23 15 C 23 15, 23 15, 24 15 L 29 20 C 29 20, 30 21, 30 21 C 30 21, 29 22, 29 22 L 27 23 C 27 24, 26 24, 26 24 C 26 24, 25 24, 25 23 L 19 19 C 19 19, 19 19, 19 19 C 19 19, 19 18, 19 18 L 20 18 L 18 17 C 16 18, 14 18, 11 18 C 8 18, 5 17, 3 16 C -1 12, -1 6, 3 3 C 5 1, 8 0, 11 0 Z"
      },
      {
        "id": "sp-28",
        "x": 125.82174688057043,
        "y": 341.9,
        "width": 99.6131907308378,
        "height": 28.9,
        "localPctX": 0.05704099821746882,
        "localPctY": 0.396875,
        "localPctW": 0.08377896613190731,
        "localPctH": 0.053125,
        "text": "Technology",
        "textSize": 12
      },
      {
        "id": "sp-29",
        "x": 125.82174688057043,
        "y": 393.75,
        "width": 108.0909090909091,
        "height": 28.9,
        "localPctX": 0.05704099821746882,
        "localPctY": 0.4921875,
        "localPctW": 0.09090909090909091,
        "localPctH": 0.053125,
        "text": "Accessibility",
        "textSize": 12
      },
      {
        "id": "sp-30",
        "x": 125.82174688057043,
        "y": 446.45,
        "width": 73.12032085561498,
        "height": 28.9,
        "localPctX": 0.05704099821746882,
        "localPctY": 0.5890624999999999,
        "localPctW": 0.06149732620320856,
        "localPctH": 0.053125,
        "text": "Security",
        "textSize": 12
      },
      {
        "id": "sp-31",
        "x": 284.7789661319073,
        "y": 351.25,
        "width": 325.3324420677362,
        "height": 10.2,
        "localPctX": 0.1907308377896613,
        "localPctY": 0.4140625,
        "localPctW": 0.27361853832442073,
        "localPctH": 0.01875,
        "fillColor": "#ffffff"
      },
      {
        "id": "sp-32",
        "x": 284.7789661319073,
        "y": 403.09999999999997,
        "width": 325.3324420677362,
        "height": 10.2,
        "localPctX": 0.1907308377896613,
        "localPctY": 0.5093749999999999,
        "localPctW": 0.27361853832442073,
        "localPctH": 0.01875,
        "fillColor": "#ffffff"
      },
      {
        "id": "sp-33",
        "x": 284.7789661319073,
        "y": 455.8,
        "width": 325.3324420677362,
        "height": 10.2,
        "localPctX": 0.1907308377896613,
        "localPctY": 0.6062500000000001,
        "localPctW": 0.27361853832442073,
        "localPctH": 0.01875,
        "fillColor": "#ffffff"
      },
      {
        "id": "sp-34",
        "x": 284.7789661319073,
        "y": 351.25,
        "width": 162.13636363636365,
        "height": 10.2,
        "localPctX": 0.1907308377896613,
        "localPctY": 0.4140625,
        "localPctW": 0.13636363636363638,
        "localPctH": 0.01875,
        "fillColor": "#3365cc"
      },
      {
        "id": "sp-35",
        "x": 284.7789661319073,
        "y": 403.09999999999997,
        "width": 236.31639928698755,
        "height": 10.2,
        "localPctX": 0.1907308377896613,
        "localPctY": 0.5093749999999999,
        "localPctW": 0.19875222816399288,
        "localPctH": 0.01875,
        "fillColor": "#ff4d38"
      },
      {
        "id": "sp-36",
        "x": 284.7789661319073,
        "y": 455.8,
        "width": 287.18270944741533,
        "height": 10.2,
        "localPctX": 0.1907308377896613,
        "localPctY": 0.6062500000000001,
        "localPctW": 0.2415329768270945,
        "localPctH": 0.01875,
        "fillColor": "#52c49c"
      },
      {
        "id": "sp-37",
        "x": 573.0213903743316,
        "y": 428.59999999999997,
        "width": 41.3288770053476,
        "height": 28.9,
        "localPctX": 0.4331550802139038,
        "localPctY": 0.5562499999999999,
        "localPctW": 0.03475935828877006,
        "localPctH": 0.053125,
        "text": "9/10",
        "textSize": 12
      },
      {
        "id": "sp-38",
        "x": 573.0213903743316,
        "y": 376.75,
        "width": 41.3288770053476,
        "height": 28.9,
        "localPctX": 0.4331550802139038,
        "localPctY": 0.4609375,
        "localPctW": 0.03475935828877006,
        "localPctH": 0.053125,
        "text": "7/10",
        "textSize": 12
      },
      {
        "id": "sp-39",
        "x": 573.0213903743316,
        "y": 324.9,
        "width": 41.3288770053476,
        "height": 28.9,
        "localPctX": 0.4331550802139038,
        "localPctY": 0.365625,
        "localPctW": 0.03475935828877006,
        "localPctH": 0.053125,
        "text": "5/10",
        "textSize": 12
      },
      {
        "id": "sp-40",
        "x": 685.3511586452764,
        "y": 501.7,
        "width": 83.7174688057041,
        "height": 35.699999999999996,
        "localPctX": 0.5276292335115865,
        "localPctY": 0.6906249999999999,
        "localPctW": 0.07040998217468805,
        "localPctH": 0.06562499999999999,
        "text": "Speed",
        "textSize": 16
      },
      {
        "id": "sp-41",
        "x": 978.8921568627452,
        "y": 501.7,
        "width": 153.65864527629236,
        "height": 35.699999999999996,
        "localPctX": 0.7745098039215688,
        "localPctY": 0.6906249999999999,
        "localPctW": 0.1292335115864528,
        "localPctH": 0.06562499999999999,
        "text": "Searchability",
        "textSize": 16
      },
      {
        "id": "sp-42",
        "x": 86.61229946524065,
        "y": 501.7,
        "width": 128.22549019607845,
        "height": 35.699999999999996,
        "localPctX": 0.024064171122994662,
        "localPctY": 0.6906249999999999,
        "localPctW": 0.10784313725490198,
        "localPctH": 0.06562499999999999,
        "text": "Aesthetics",
        "textSize": 16
      },
      {
        "id": "sp-43",
        "x": 387.5713012477719,
        "y": 501.7,
        "width": 129.28520499108737,
        "height": 35.699999999999996,
        "localPctX": 0.2771836007130125,
        "localPctY": 0.6906249999999999,
        "localPctW": 0.10873440285204994,
        "localPctH": 0.06562499999999999,
        "text": "Navigation",
        "textSize": 16
      },
      {
        "id": "sp-44",
        "x": 469.1693404634582,
        "y": 579.9,
        "width": 62.523172905525854,
        "height": 35.699999999999996,
        "localPctX": 0.3458110516934047,
        "localPctY": 0.834375,
        "localPctW": 0.05258467023172906,
        "localPctH": 0.06562499999999999,
        "text": "70%",
        "textSize": 16
      }
    ],
    "x": 58,
    "y": 126,
    "width": 1189,
    "height": 544
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

export function Imported2025migsopcubedcreativeandexampletemplates83Template({ data }: { data: BrainData }): ReactElement {
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
