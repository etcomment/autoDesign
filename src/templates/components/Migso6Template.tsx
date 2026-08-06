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
    "x": 130,
    "y": 348,
    "width": 18,
    "height": 35,
    "text": "",
    "pathD": "M 18 21 L 18 21 L 17 20 L 17 20 L 17 19 L 16 19 L 16 19 L 16 18 L 15 18 L 14 17 L 13 17 L 13 16 L 12 16 L 11 16 L 10 15 L 10 15 L 9 15 L 9 15 L 8 14 L 7 14 L 7 14 L 7 14 L 6 13 L 6 13 L 6 13 L 6 13 L 5 12 L 5 12 L 5 11 L 5 11 L 5 11 L 5 10 L 6 10 L 6 10 L 6 10 L 6 9 L 7 9 L 7 9 L 7 9 L 7 9 L 8 9 L 8 9 L 9 8 L 9 8 L 10 8 L 10 8 L 10 8 L 11 9 L 11 9 L 12 9 L 13 9 L 13 9 L 14 10 L 14 10 L 14 10 L 15 10 L 15 11 L 15 11 L 15 11 L 15 11 L 15 11 L 15 11 L 16 11 L 16 10 L 16 10 L 17 7 L 17 7 L 17 7 L 17 7 L 17 7 L 17 7 L 17 6 L 17 6 L 16 6 L 16 6 L 15 5 L 15 5 L 14 5 L 14 5 L 13 5 L 13 4 L 12 4 L 12 4 L 11 4 L 11 1 L 11 0 L 11 0 L 11 0 L 11 0 L 11 0 L 8 0 L 8 0 L 8 0 L 7 0 L 7 0 L 7 1 L 7 4 L 7 4 L 6 5 L 5 5 L 5 5 L 4 5 L 3 6 L 3 6 L 2 7 L 2 7 L 1 8 L 1 8 L 1 9 L 1 10 L 1 10 L 0 11 L 0 12 L 0 12 L 1 13 L 1 14 L 1 14 L 1 15 L 2 15 L 2 16 L 3 16 L 3 17 L 4 17 L 4 18 L 5 18 L 5 18 L 6 19 L 7 19 L 7 19 L 8 19 L 8 20 L 9 20 L 10 20 L 10 20 L 11 21 L 12 21 L 12 22 L 13 22 L 13 22 L 13 23 L 13 23 L 13 23 L 13 23 L 13 24 L 13 24 L 13 24 L 13 25 L 13 25 L 12 25 L 12 26 L 12 26 L 12 26 L 11 26 L 11 26 L 11 26 L 10 26 L 10 27 L 10 27 L 9 27 L 8 27 L 8 26 L 7 26 L 7 26 L 6 26 L 5 26 L 5 25 L 4 25 L 4 24 L 3 24 L 3 24 L 3 24 L 3 24 L 3 24 L 3 24 L 2 24 L 2 24 L 0 27 L 0 27 L 0 27 L 0 27 L 0 28 L 0 28 L 1 28 L 1 28 L 1 29 L 2 29 L 3 29 L 3 30 L 4 30 L 4 30 L 5 30 L 5 31 L 6 31 L 7 31 L 7 31 L 7 34 L 7 35 L 7 35 L 8 35 L 8 35 L 11 35 L 11 35 L 11 35 L 11 35 L 11 34 L 11 31 L 12 31 L 13 31 L 13 30 L 14 30 L 14 30 L 15 29 L 16 29 L 16 28 L 17 28 L 17 27 L 17 27 L 18 26 L 18 25 L 18 25 L 18 24 L 18 23 L 18 23 L 18 22 L 18 22 L 18 21 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 303,
    "y": 352,
    "width": 19,
    "height": 27,
    "text": "",
    "pathD": "M 19 26 L 18 23 L 18 23 L 18 22 L 18 22 L 18 22 L 18 22 L 18 22 L 18 22 L 18 22 L 17 22 L 17 22 L 17 22 L 17 22 L 17 22 L 16 22 L 16 23 L 16 23 L 16 23 L 15 23 L 15 23 L 15 23 L 14 23 L 13 23 L 13 22 L 12 22 L 12 22 L 11 22 L 11 22 L 10 21 L 10 21 L 9 21 L 9 20 L 9 20 L 8 19 L 8 19 L 8 18 L 7 18 L 15 18 L 15 18 L 15 18 L 15 17 L 15 17 L 16 15 L 16 15 L 16 15 L 16 15 L 16 15 L 16 14 L 15 14 L 15 14 L 15 14 L 7 14 L 7 14 L 7 13 L 7 13 L 7 12 L 16 12 L 16 12 L 16 12 L 16 12 L 16 12 L 17 10 L 17 10 L 17 9 L 17 9 L 17 9 L 17 9 L 16 9 L 16 9 L 16 9 L 7 9 L 8 8 L 8 8 L 8 7 L 9 7 L 9 7 L 9 6 L 10 6 L 10 6 L 11 5 L 11 5 L 12 5 L 12 5 L 13 4 L 13 4 L 14 4 L 14 4 L 15 4 L 15 4 L 15 4 L 15 4 L 16 4 L 16 4 L 16 4 L 16 4 L 17 5 L 17 5 L 17 5 L 17 5 L 17 5 L 18 5 L 18 4 L 18 4 L 19 1 L 19 1 L 19 1 L 18 1 L 18 0 L 17 0 L 16 0 L 15 0 L 15 0 L 15 0 L 13 0 L 12 0 L 11 0 L 11 1 L 10 1 L 9 1 L 8 2 L 7 2 L 6 3 L 5 4 L 5 4 L 4 5 L 4 6 L 3 7 L 3 8 L 2 9 L 1 9 L 0 9 L 0 9 L 0 9 L 0 10 L 0 12 L 0 12 L 0 12 L 0 12 L 1 12 L 2 12 L 2 13 L 2 13 L 2 14 L 2 14 L 1 14 L 0 14 L 0 15 L 0 15 L 0 15 L 0 17 L 0 17 L 0 18 L 0 18 L 1 18 L 2 18 L 3 19 L 3 20 L 4 21 L 4 22 L 5 22 L 5 23 L 6 24 L 7 25 L 8 25 L 9 26 L 9 26 L 10 26 L 11 27 L 12 27 L 13 27 L 15 27 L 15 27 L 15 27 L 16 27 L 16 27 L 16 27 L 17 27 L 17 27 L 17 27 L 17 27 L 18 27 L 18 27 L 18 27 L 18 27 L 18 26 L 18 26 L 19 26 L 19 26 L 19 26 L 19 26 L 19 26 L 19 26 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 73,
    "y": 352,
    "width": 20,
    "height": 27,
    "text": "",
    "pathD": "M 20 19 L 20 19 L 19 19 L 16 19 L 16 19 L 16 19 L 16 19 L 16 19 L 16 23 L 7 23 L 7 16 L 13 16 L 14 15 L 14 15 L 14 15 L 14 15 L 14 12 L 14 12 L 14 12 L 14 12 L 13 12 L 7 12 L 7 8 L 7 7 L 7 7 L 8 7 L 8 6 L 8 6 L 8 6 L 8 6 L 8 5 L 9 5 L 9 5 L 9 5 L 10 5 L 10 5 L 10 4 L 11 4 L 11 4 L 12 4 L 12 4 L 13 5 L 13 5 L 14 5 L 14 5 L 15 6 L 15 6 L 15 6 L 15 6 L 15 6 L 15 6 L 16 6 L 16 6 L 18 3 L 18 3 L 18 3 L 18 3 L 18 2 L 17 2 L 16 1 L 15 1 L 15 1 L 14 0 L 13 0 L 12 0 L 11 0 L 10 0 L 9 0 L 8 0 L 8 1 L 7 1 L 6 1 L 6 2 L 5 2 L 4 3 L 4 3 L 3 4 L 3 5 L 3 5 L 3 6 L 3 7 L 2 8 L 2 12 L 1 12 L 0 12 L 0 12 L 0 12 L 0 12 L 0 15 L 0 15 L 0 15 L 0 15 L 1 16 L 2 16 L 2 23 L 1 23 L 0 23 L 0 23 L 0 23 L 0 24 L 0 26 L 0 27 L 0 27 L 0 27 L 1 27 L 19 27 L 20 27 L 20 27 L 20 27 L 20 26 L 20 19 L 20 19 L 20 19 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 186,
    "y": 352,
    "width": 22,
    "height": 27,
    "text": "",
    "pathD": "M 22 13 L 22 13 L 21 13 L 18 13 L 18 13 L 18 13 L 18 13 L 18 14 L 18 14 L 18 15 L 17 16 L 17 17 L 17 18 L 16 18 L 16 19 L 15 20 L 15 20 L 14 21 L 13 21 L 12 22 L 12 22 L 11 22 L 10 23 L 9 23 L 9 13 L 17 11 L 17 11 L 17 11 L 17 11 L 17 10 L 17 8 L 17 8 L 17 8 L 17 8 L 17 7 L 17 7 L 17 7 L 16 7 L 16 7 L 9 10 L 9 8 L 17 5 L 17 5 L 17 5 L 17 5 L 17 5 L 17 2 L 17 2 L 17 2 L 17 2 L 17 2 L 17 2 L 17 2 L 16 2 L 16 2 L 9 4 L 9 1 L 9 0 L 9 0 L 9 0 L 9 0 L 5 0 L 5 0 L 5 0 L 5 0 L 5 1 L 5 5 L 0 7 L 0 7 L 0 7 L 0 7 L 0 7 L 0 10 L 0 10 L 0 10 L 0 10 L 0 10 L 0 10 L 1 10 L 1 10 L 1 10 L 5 9 L 5 11 L 0 12 L 0 12 L 0 12 L 0 13 L 0 13 L 0 15 L 0 15 L 0 16 L 0 16 L 0 16 L 0 16 L 1 16 L 1 16 L 1 16 L 5 15 L 5 26 L 5 27 L 5 27 L 5 27 L 5 27 L 9 27 L 9 27 L 10 27 L 11 27 L 12 27 L 13 26 L 14 26 L 15 26 L 15 25 L 16 25 L 17 24 L 17 24 L 18 23 L 19 22 L 19 22 L 20 21 L 20 20 L 21 19 L 21 19 L 21 18 L 21 17 L 22 16 L 22 15 L 22 14 L 22 14 L 22 13 L 22 13 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 245,
    "y": 352,
    "width": 20,
    "height": 27,
    "text": "",
    "pathD": "M 20 0 L 20 0 L 20 0 L 20 0 L 19 0 L 19 0 L 16 0 L 16 0 L 15 0 L 15 0 L 15 0 L 15 0 L 11 8 L 11 9 L 11 10 L 10 10 L 10 11 L 10 10 L 10 9 L 9 9 L 9 9 L 5 0 L 5 0 L 5 0 L 5 0 L 4 0 L 4 0 L 1 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 1 L 0 1 L 6 12 L 2 12 L 2 12 L 2 12 L 2 12 L 1 13 L 1 15 L 2 15 L 2 15 L 2 15 L 2 15 L 8 15 L 8 17 L 2 17 L 2 17 L 2 17 L 2 17 L 1 17 L 1 19 L 2 20 L 2 20 L 2 20 L 2 20 L 8 20 L 8 26 L 8 27 L 8 27 L 8 27 L 8 27 L 12 27 L 12 27 L 12 27 L 12 27 L 12 26 L 12 20 L 18 20 L 18 20 L 18 20 L 19 20 L 19 19 L 19 17 L 19 17 L 18 17 L 18 17 L 18 17 L 12 17 L 12 15 L 18 15 L 18 15 L 18 15 L 19 15 L 19 15 L 19 13 L 19 12 L 18 12 L 18 12 L 18 12 L 14 12 L 20 1 L 20 1 L 20 1 L 20 0 L 20 0 Z"
  },
  {
    "id": "grp-5",
    "isGroup": true,
    "children": [
      {
        "id": "sp-41",
        "x": 693,
        "y": 356,
        "width": 10,
        "height": 25,
        "localPctX": 0,
        "localPctY": 0.16666666666666666,
        "localPctW": 0.16071428571428573,
        "localPctH": 0.8333333333333334,
        "text": "",
        "pathD": "M 1 1 L 1 2 L 1 2 L 1 2 L 0 3 L 0 3 L 0 3 L 0 4 L 0 4 L 0 21 L 0 21 L 0 21 L 0 22 L 0 22 L 1 23 L 1 23 L 1 23 L 1 24 L 2 24 L 2 24 L 2 24 L 3 25 L 3 25 L 3 25 L 4 25 L 4 25 L 6 25 L 6 0 L 4 0 L 4 0 L 3 0 L 3 0 L 3 0 L 2 1 L 2 1 L 2 1 L 1 1 Z"
      },
      {
        "id": "sp-42",
        "x": 700.5,
        "y": 351,
        "width": 20,
        "height": 30,
        "localPctX": 0.21428571428571427,
        "localPctY": 0,
        "localPctW": 0.5714285714285714,
        "localPctH": 1,
        "text": "",
        "pathD": "M 17 2 L 17 1 L 17 1 L 17 1 L 17 1 L 17 0 L 16 0 L 16 0 L 16 0 L 4 0 L 4 0 L 4 0 L 3 0 L 3 1 L 3 1 L 3 1 L 3 1 L 3 2 L 3 5 L 0 5 L 0 30 L 20 30 L 20 5 L 17 5 L 17 2 Z M 15 5 L 5 5 L 5 3 L 15 3 L 15 5 Z"
      },
      {
        "id": "sp-43",
        "x": 722.375,
        "y": 356,
        "width": 10,
        "height": 25,
        "localPctX": 0.8392857142857143,
        "localPctY": 0.16666666666666666,
        "localPctW": 0.16071428571428573,
        "localPctH": 0.8333333333333334,
        "text": "",
        "pathD": "M 4 1 L 4 1 L 4 1 L 3 1 L 3 0 L 3 0 L 2 0 L 2 0 L 1 0 L 0 0 L 0 25 L 1 25 L 2 25 L 2 25 L 3 25 L 3 25 L 3 24 L 4 24 L 4 24 L 4 24 L 5 23 L 5 23 L 5 23 L 5 22 L 5 22 L 5 21 L 6 21 L 6 21 L 6 4 L 6 4 L 5 3 L 5 3 L 5 3 L 5 2 L 5 2 L 5 2 L 4 1 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 59,
    "x": 693,
    "y": 351,
    "width": 35,
    "height": 30
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 63,
    "x": 1042,
    "y": 352,
    "width": 32,
    "height": 27,
    "text": "",
    "pathD": "M 31 1 L 31 1 L 31 0 L 30 0 L 30 0 L 30 0 L 29 0 L 29 0 L 29 0 L 3 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 0 L 1 0 L 1 1 L 1 1 L 1 1 L 1 1 L 0 2 L 0 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 24 L 0 24 L 0 25 L 0 25 L 0 25 L 0 25 L 1 26 L 1 26 L 1 26 L 1 26 L 1 27 L 2 27 L 2 27 L 2 27 L 3 27 L 3 27 L 3 27 L 29 27 L 29 27 L 29 27 L 30 27 L 30 27 L 30 27 L 31 27 L 31 26 L 31 26 L 31 26 L 31 26 L 32 25 L 32 25 L 32 25 L 32 25 L 32 24 L 32 24 L 32 3 L 32 3 L 32 2 L 32 2 L 32 2 L 32 2 L 31 1 L 31 1 L 31 1 Z M 10 24 L 10 24 L 10 24 L 9 25 L 9 25 L 3 25 L 3 25 L 3 24 L 3 24 L 2 24 L 2 20 L 3 20 L 3 20 L 3 20 L 3 20 L 9 20 L 9 20 L 10 20 L 10 20 L 10 20 L 10 24 Z M 10 17 L 10 17 L 10 17 L 9 17 L 9 17 L 3 17 L 3 17 L 3 17 L 3 17 L 2 17 L 2 13 L 3 13 L 3 12 L 3 12 L 3 12 L 9 12 L 9 12 L 10 12 L 10 13 L 10 13 L 10 17 Z M 10 9 L 10 9 L 10 10 L 9 10 L 9 10 L 3 10 L 3 10 L 3 10 L 3 9 L 2 9 L 2 6 L 3 5 L 3 5 L 3 5 L 3 5 L 9 5 L 9 5 L 10 5 L 10 5 L 10 6 L 10 9 Z M 20 24 L 20 24 L 20 24 L 19 25 L 19 25 L 13 25 L 13 25 L 12 24 L 12 24 L 12 24 L 12 20 L 12 20 L 12 20 L 13 20 L 13 20 L 19 20 L 19 20 L 20 20 L 20 20 L 20 20 L 20 24 Z M 20 17 L 20 17 L 20 17 L 19 17 L 19 17 L 13 17 L 13 17 L 12 17 L 12 17 L 12 17 L 12 13 L 12 13 L 12 12 L 13 12 L 13 12 L 19 12 L 19 12 L 20 12 L 20 13 L 20 13 L 20 17 Z M 20 9 L 20 9 L 20 10 L 19 10 L 19 10 L 13 10 L 13 10 L 12 10 L 12 9 L 12 9 L 12 6 L 12 5 L 12 5 L 13 5 L 13 5 L 19 5 L 19 5 L 20 5 L 20 5 L 20 6 L 20 9 Z M 30 24 L 29 24 L 29 24 L 29 25 L 29 25 L 23 25 L 23 25 L 22 24 L 22 24 L 22 24 L 22 20 L 22 20 L 22 20 L 23 20 L 23 20 L 29 20 L 29 20 L 29 20 L 29 20 L 30 20 L 30 24 Z M 30 17 L 29 17 L 29 17 L 29 17 L 29 17 L 23 17 L 23 17 L 22 17 L 22 17 L 22 17 L 22 13 L 22 13 L 22 12 L 23 12 L 23 12 L 29 12 L 29 12 L 29 12 L 29 13 L 30 13 L 30 17 Z M 30 9 L 29 9 L 29 10 L 29 10 L 29 10 L 23 10 L 23 10 L 22 10 L 22 9 L 22 9 L 22 6 L 22 5 L 22 5 L 23 5 L 23 5 L 29 5 L 29 5 L 29 5 L 29 5 L 30 6 L 30 9 Z"
  },
  {
    "id": "grp-10",
    "isGroup": true,
    "children": [
      {
        "id": "sp-44",
        "x": 427,
        "y": 351,
        "width": 25,
        "height": 30,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 25 9 L 24 8 L 24 8 L 24 8 L 24 7 L 18 1 L 17 1 L 17 1 L 16 1 L 16 0 L 16 0 L 15 0 L 15 0 L 14 0 L 2 0 L 1 0 L 1 0 L 1 0 L 1 1 L 0 1 L 0 1 L 0 2 L 0 2 L 0 28 L 0 29 L 0 29 L 0 29 L 1 29 L 1 30 L 1 30 L 1 30 L 2 30 L 23 30 L 23 30 L 24 30 L 24 30 L 24 29 L 25 29 L 25 29 L 25 29 L 25 28 L 25 11 L 25 10 L 25 10 L 25 9 L 25 9 Z M 15 3 L 15 3 L 16 3 L 22 9 L 22 9 L 22 10 L 15 10 L 15 3 Z M 22 27 L 2 27 L 2 3 L 12 3 L 12 11 L 13 11 L 13 11 L 13 12 L 13 12 L 13 12 L 14 12 L 14 12 L 14 13 L 22 13 L 22 27 Z"
      },
      {
        "id": "sp-45",
        "x": 431.375,
        "y": 371,
        "width": 15,
        "height": 10,
        "localPctX": 0.175,
        "localPctY": 0.6666666666666666,
        "localPctW": 0.6,
        "localPctH": 0.08333333333333333,
        "text": "",
        "pathD": "M 14 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 2 L 0 2 L 0 2 L 0 3 L 1 3 L 14 3 L 15 3 L 15 2 L 15 2 L 15 2 L 15 1 L 15 0 L 15 0 L 15 0 L 14 0 Z"
      },
      {
        "id": "sp-46",
        "x": 431.375,
        "y": 366,
        "width": 15,
        "height": 10,
        "localPctX": 0.175,
        "localPctY": 0.5,
        "localPctW": 0.6,
        "localPctH": 0.08333333333333333,
        "text": "",
        "pathD": "M 0 0 L 0 0 L 0 1 L 0 2 L 0 2 L 0 2 L 0 2 L 1 3 L 14 3 L 15 2 L 15 2 L 15 2 L 15 2 L 15 1 L 15 0 L 15 0 L 15 0 L 14 0 L 1 0 L 0 0 L 0 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 55,
    "x": 427,
    "y": 351,
    "width": 25,
    "height": 30
  },
  {
    "id": "grp-14",
    "isGroup": true,
    "children": [
      {
        "id": "sp-47",
        "x": 489,
        "y": 351,
        "width": 25,
        "height": 30,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 14 13 L 14 12 L 14 12 L 13 12 L 13 12 L 13 12 L 13 11 L 13 11 L 13 11 L 13 0 L 2 0 L 1 0 L 1 0 L 1 0 L 1 1 L 0 1 L 0 1 L 0 2 L 0 2 L 0 28 L 0 29 L 0 29 L 0 29 L 1 29 L 1 30 L 1 30 L 1 30 L 2 30 L 23 30 L 24 30 L 24 30 L 24 30 L 24 29 L 25 29 L 25 29 L 25 29 L 25 28 L 25 13 L 14 13 Z M 20 24 L 20 25 L 20 25 L 20 25 L 19 25 L 6 25 L 5 25 L 5 25 L 5 25 L 5 24 L 5 23 L 5 23 L 5 23 L 5 23 L 6 22 L 19 22 L 20 23 L 20 23 L 20 23 L 20 23 L 20 24 Z M 20 19 L 20 20 L 20 20 L 20 20 L 19 20 L 6 20 L 5 20 L 5 20 L 5 20 L 5 19 L 5 18 L 5 18 L 5 18 L 5 18 L 6 17 L 19 17 L 20 18 L 20 18 L 20 18 L 20 18 L 20 19 Z"
      },
      {
        "id": "sp-48",
        "x": 504,
        "y": 351,
        "width": 10,
        "height": 10,
        "localPctX": 0.6,
        "localPctY": 0,
        "localPctW": 0.4,
        "localPctH": 0.3333333333333333,
        "text": "",
        "pathD": "M 9 7 L 3 1 L 2 1 L 2 1 L 2 1 L 1 0 L 1 0 L 0 0 L 0 10 L 10 10 L 10 9 L 10 9 L 9 8 L 9 8 L 9 8 L 9 7 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 56,
    "x": 489,
    "y": 351,
    "width": 25,
    "height": 30
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 54,
    "x": 360,
    "y": 351,
    "width": 30,
    "height": 30,
    "text": "",
    "pathD": "M 30 0 L 29 0 L 29 0 L 29 0 L 29 0 L 1 0 L 1 0 L 1 0 L 1 0 L 0 0 L 0 1 L 0 1 L 0 1 L 0 1 L 0 29 L 0 29 L 0 29 L 0 29 L 0 30 L 1 30 L 1 30 L 1 30 L 1 30 L 29 30 L 29 30 L 29 30 L 29 30 L 30 30 L 30 29 L 30 29 L 30 29 L 30 29 L 30 1 L 30 1 L 30 1 L 30 1 L 30 0 Z M 14 24 L 14 24 L 14 24 L 13 24 L 13 24 L 4 24 L 3 24 L 3 24 L 3 24 L 3 24 L 3 4 L 3 4 L 3 3 L 3 3 L 4 3 L 13 3 L 13 3 L 14 3 L 14 4 L 14 4 L 14 24 Z M 27 16 L 27 16 L 27 17 L 27 17 L 26 17 L 17 17 L 17 17 L 16 17 L 16 16 L 16 16 L 16 4 L 16 4 L 16 3 L 17 3 L 17 3 L 26 3 L 27 3 L 27 3 L 27 4 L 27 4 L 27 16 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 57,
    "x": 551,
    "y": 351,
    "width": 32,
    "height": 30,
    "text": "",
    "pathD": "M 31 1 L 31 1 L 31 1 L 30 0 L 30 0 L 30 0 L 30 0 L 29 0 L 29 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 0 L 2 0 L 1 1 L 1 1 L 1 1 L 1 1 L 0 1 L 0 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 3 L 0 27 L 0 27 L 0 27 L 0 28 L 0 28 L 0 28 L 0 29 L 1 29 L 1 29 L 1 29 L 1 29 L 2 30 L 2 30 L 2 30 L 2 30 L 3 30 L 3 30 L 29 30 L 29 30 L 30 30 L 30 30 L 30 30 L 30 30 L 31 29 L 31 29 L 31 29 L 31 29 L 32 29 L 32 28 L 32 28 L 32 28 L 32 27 L 32 27 L 32 27 L 32 3 L 32 3 L 32 3 L 32 2 L 32 2 L 32 2 L 32 1 L 31 1 L 31 1 Z M 15 27 L 3 27 L 3 27 L 3 27 L 2 27 L 2 27 L 2 5 L 15 5 L 15 27 Z M 30 27 L 30 27 L 29 27 L 29 27 L 29 27 L 17 27 L 17 5 L 30 5 L 30 27 Z"
  },
  {
    "id": "grp-19",
    "isGroup": true,
    "children": [
      {
        "id": "sp-49",
        "x": 899,
        "y": 355,
        "width": 25,
        "height": 22,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.6410256410256411,
        "localPctH": 1,
        "text": "",
        "pathD": "M 22 17 L 22 17 L 22 17 L 21 17 L 21 17 L 10 17 L 10 10 L 14 10 L 14 10 L 14 10 L 14 10 L 15 9 L 15 9 L 15 9 L 15 9 L 15 9 L 15 8 L 15 8 L 15 8 L 15 8 L 9 0 L 8 0 L 8 0 L 8 0 L 8 0 L 7 0 L 7 0 L 7 0 L 7 0 L 0 8 L 0 8 L 0 8 L 0 8 L 0 9 L 0 9 L 0 9 L 0 9 L 0 9 L 1 10 L 1 10 L 1 10 L 1 10 L 5 10 L 5 21 L 5 21 L 5 21 L 5 22 L 5 22 L 5 22 L 5 22 L 5 22 L 5 22 L 5 22 L 6 22 L 24 22 L 25 22 L 25 22 L 25 22 L 25 21 L 25 21 L 25 21 L 22 17 Z"
      },
      {
        "id": "sp-50",
        "x": 913,
        "y": 355,
        "width": 25,
        "height": 22,
        "localPctX": 0.358974358974359,
        "localPctY": 0,
        "localPctW": 0.6410256410256411,
        "localPctH": 1,
        "text": "",
        "pathD": "M 25 13 L 24 12 L 24 12 L 24 12 L 24 12 L 20 12 L 20 1 L 20 1 L 20 1 L 20 0 L 20 0 L 20 0 L 20 0 L 20 0 L 20 0 L 20 0 L 19 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 1 L 0 1 L 3 5 L 3 5 L 3 5 L 4 5 L 4 5 L 15 5 L 15 12 L 11 12 L 11 12 L 11 12 L 11 12 L 10 13 L 10 13 L 10 13 L 10 13 L 10 13 L 10 14 L 10 14 L 10 14 L 10 14 L 16 22 L 17 22 L 17 22 L 17 22 L 17 22 L 18 22 L 18 22 L 18 22 L 18 22 L 25 14 L 25 14 L 25 14 L 25 14 L 25 13 L 25 13 L 25 13 L 25 13 L 25 13 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 899,
    "y": 355,
    "width": 39,
    "height": 22
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 62,
    "x": 975,
    "y": 351,
    "width": 30,
    "height": 30,
    "text": "",
    "pathD": "M 30 8 L 29 8 L 29 7 L 29 7 L 29 7 L 23 1 L 23 1 L 23 1 L 22 1 L 22 0 L 21 0 L 21 0 L 20 0 L 20 0 L 2 0 L 1 0 L 1 0 L 1 0 L 1 1 L 0 1 L 0 1 L 0 1 L 0 2 L 0 28 L 0 29 L 0 29 L 0 29 L 1 29 L 1 30 L 1 30 L 1 30 L 2 30 L 28 30 L 29 30 L 29 30 L 29 30 L 29 29 L 30 29 L 30 29 L 30 29 L 30 28 L 30 10 L 30 10 L 30 9 L 30 9 L 30 8 Z M 12 3 L 13 3 L 13 3 L 13 3 L 13 2 L 17 2 L 17 3 L 17 3 L 17 3 L 17 3 L 17 9 L 17 10 L 17 10 L 17 10 L 17 10 L 13 10 L 13 10 L 13 10 L 13 10 L 12 9 L 12 3 Z M 23 27 L 7 27 L 7 20 L 23 20 L 23 27 Z M 27 27 L 25 27 L 25 19 L 25 19 L 25 19 L 25 18 L 24 18 L 24 18 L 24 18 L 23 18 L 23 18 L 7 18 L 6 18 L 6 18 L 6 18 L 6 18 L 5 18 L 5 19 L 5 19 L 5 19 L 5 27 L 2 27 L 2 2 L 5 2 L 5 11 L 5 11 L 5 11 L 5 12 L 6 12 L 6 12 L 6 12 L 6 12 L 7 12 L 18 12 L 18 12 L 19 12 L 19 12 L 19 12 L 20 12 L 20 11 L 20 11 L 20 11 L 20 2 L 20 3 L 21 3 L 21 3 L 21 3 L 27 9 L 27 9 L 27 9 L 27 10 L 27 10 L 27 27 Z"
  },
  {
    "id": "grp-23",
    "isGroup": true,
    "children": [
      {
        "id": "sp-51",
        "x": 765,
        "y": 375.9230769230769,
        "width": 10,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.8307692307692301,
        "localPctW": 0.14473684210526316,
        "localPctH": 0.16923076923076924,
        "text": "",
        "pathD": "M 4 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 4 L 0 5 L 0 5 L 0 5 L 1 5 L 4 5 L 5 5 L 5 5 L 5 5 L 5 4 L 5 1 L 5 0 L 5 0 L 5 0 L 4 0 Z"
      },
      {
        "id": "sp-52",
        "x": 780.1973684210527,
        "y": 368.53846153846155,
        "width": 10,
        "height": 12.461538461538462,
        "localPctX": 0.4342105263157919,
        "localPctY": 0.5846153846153849,
        "localPctW": 0.14473684210526316,
        "localPctH": 0.4153846153846154,
        "text": "",
        "pathD": "M 4 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 12 L 0 12 L 0 12 L 0 12 L 1 12 L 4 12 L 5 12 L 5 12 L 5 12 L 5 12 L 5 1 L 5 0 L 5 0 L 5 0 L 4 0 Z"
      },
      {
        "id": "sp-53",
        "x": 772.3684210526317,
        "y": 373.15384615384613,
        "width": 10,
        "height": 10,
        "localPctX": 0.21052631578947642,
        "localPctY": 0.7384615384615377,
        "localPctW": 0.14473684210526316,
        "localPctH": 0.24615384615384617,
        "text": "",
        "pathD": "M 4 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 7 L 0 7 L 0 7 L 0 7 L 1 7 L 4 7 L 5 7 L 5 7 L 5 7 L 5 7 L 5 1 L 5 0 L 5 0 L 5 0 L 4 0 Z"
      },
      {
        "id": "sp-54",
        "x": 787.5657894736842,
        "y": 360.69230769230774,
        "width": 10,
        "height": 19.846153846153847,
        "localPctX": 0.6447368421052618,
        "localPctY": 0.32307692307692454,
        "localPctW": 0.14473684210526316,
        "localPctH": 0.6615384615384615,
        "text": "",
        "pathD": "M 4 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 19 L 0 19 L 0 20 L 0 20 L 1 20 L 4 20 L 5 20 L 5 20 L 5 19 L 5 19 L 5 1 L 5 0 L 5 0 L 5 0 L 4 0 Z"
      },
      {
        "id": "sp-55",
        "x": 794.9342105263158,
        "y": 351,
        "width": 10,
        "height": 30,
        "localPctX": 0.8552631578947382,
        "localPctY": 0,
        "localPctW": 0.14473684210526316,
        "localPctH": 1,
        "text": "",
        "pathD": "M 5 0 L 5 0 L 4 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 29 L 0 30 L 0 30 L 0 30 L 1 30 L 4 30 L 5 30 L 5 30 L 5 30 L 5 29 L 5 1 L 5 0 L 5 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 60,
    "x": 765,
    "y": 351,
    "width": 35,
    "height": 30
  },
  {
    "id": "grp-29",
    "isGroup": true,
    "children": [
      {
        "id": "sp-56",
        "x": 837,
        "y": 364.125,
        "width": 24,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.4375,
        "localPctW": 1,
        "localPctH": 0.16666666666666666,
        "text": ""
      },
      {
        "id": "sp-57",
        "x": 837,
        "y": 370.375,
        "width": 24,
        "height": 10.625,
        "localPctX": 0,
        "localPctY": 0.6458333333333334,
        "localPctW": 1,
        "localPctH": 0.3541666666666667,
        "text": "",
        "pathD": "M 0 0 L 0 1 L 0 2 L 0 2 L 0 2 L 0 3 L 0 3 L 1 4 L 1 4 L 1 4 L 1 4 L 2 5 L 2 5 L 2 5 L 3 5 L 3 5 L 3 5 L 4 5 L 14 5 L 14 11 L 19 5 L 20 5 L 21 5 L 21 5 L 21 5 L 22 5 L 22 5 L 22 5 L 23 4 L 23 4 L 23 4 L 23 4 L 24 3 L 24 3 L 24 2 L 24 2 L 24 2 L 24 1 L 24 0 L 0 0 Z"
      },
      {
        "id": "sp-58",
        "x": 837,
        "y": 357.875,
        "width": 24,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.22916666666666666,
        "localPctW": 1,
        "localPctH": 0.16666666666666666,
        "text": ""
      },
      {
        "id": "sp-59",
        "x": 837,
        "y": 351,
        "width": 24,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.16666666666666666,
        "text": "",
        "pathD": "M 24 4 L 24 3 L 24 3 L 24 3 L 24 2 L 24 2 L 23 2 L 23 1 L 23 1 L 23 1 L 22 1 L 22 0 L 22 0 L 21 0 L 21 0 L 21 0 L 20 0 L 4 0 L 3 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 1 L 1 1 L 1 1 L 1 1 L 1 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 3 L 0 4 L 0 5 L 24 5 L 24 4 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 61,
    "x": 837,
    "y": 351,
    "width": 24,
    "height": 30
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 46,
    "x": 742,
    "y": 291,
    "width": 29,
    "height": 27,
    "text": "",
    "pathD": "M 28 12 L 28 12 L 27 12 L 27 12 L 27 12 L 27 11 L 26 11 L 26 11 L 26 11 L 25 11 L 25 7 L 25 6 L 24 6 L 24 6 L 24 5 L 24 5 L 24 4 L 24 4 L 23 4 L 21 1 L 20 1 L 20 1 L 20 1 L 19 0 L 19 0 L 19 0 L 18 0 L 18 0 L 6 0 L 6 0 L 5 0 L 5 0 L 5 1 L 5 1 L 5 1 L 4 1 L 4 2 L 4 11 L 3 11 L 3 11 L 3 11 L 2 11 L 2 12 L 2 12 L 1 12 L 1 12 L 1 12 L 1 13 L 1 13 L 0 13 L 0 13 L 0 14 L 0 14 L 0 14 L 0 15 L 0 22 L 0 22 L 0 22 L 0 22 L 1 22 L 4 22 L 4 25 L 4 26 L 5 26 L 5 26 L 5 26 L 5 27 L 5 27 L 6 27 L 6 27 L 23 27 L 23 27 L 24 27 L 24 27 L 24 26 L 24 26 L 24 26 L 25 26 L 25 25 L 25 22 L 28 22 L 29 22 L 29 22 L 29 22 L 29 22 L 29 15 L 29 14 L 29 14 L 29 14 L 29 13 L 29 13 L 28 13 L 28 13 L 28 12 Z M 22 25 L 7 25 L 7 20 L 22 20 L 22 25 Z M 22 14 L 7 14 L 7 2 L 18 2 L 18 5 L 18 5 L 18 6 L 18 6 L 18 6 L 19 7 L 19 7 L 19 7 L 19 7 L 22 7 L 22 14 Z M 26 15 L 26 16 L 26 16 L 26 16 L 26 16 L 25 16 L 25 16 L 25 16 L 25 15 L 25 15 L 25 15 L 25 15 L 25 15 L 25 14 L 25 14 L 25 14 L 25 14 L 25 14 L 25 14 L 25 14 L 26 14 L 26 14 L 26 14 L 26 14 L 26 14 L 27 14 L 27 14 L 27 14 L 27 15 L 27 15 L 27 15 L 27 15 L 26 15 Z"
  },
  {
    "id": "grp-35",
    "isGroup": true,
    "children": [
      {
        "id": "sp-60",
        "x": 1039,
        "y": 408,
        "width": 34,
        "height": 22,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 34 0 L 33 0 L 33 0 L 33 0 L 33 0 L 1 0 L 1 0 L 1 0 L 1 0 L 0 0 L 0 0 L 0 1 L 0 1 L 0 1 L 0 21 L 0 21 L 0 21 L 0 22 L 0 22 L 1 22 L 1 22 L 1 22 L 1 22 L 33 22 L 33 22 L 33 22 L 33 22 L 34 22 L 34 22 L 34 21 L 34 21 L 34 21 L 34 1 L 34 1 L 34 1 L 34 0 L 34 0 Z M 32 15 L 31 15 L 31 15 L 30 16 L 30 16 L 30 16 L 29 16 L 29 16 L 29 17 L 28 17 L 28 17 L 28 18 L 28 18 L 27 19 L 27 19 L 27 19 L 27 20 L 7 20 L 7 19 L 7 19 L 7 19 L 6 18 L 6 18 L 6 17 L 6 17 L 5 17 L 5 16 L 5 16 L 4 16 L 4 16 L 4 16 L 3 15 L 3 15 L 2 15 L 2 7 L 3 7 L 3 7 L 4 6 L 4 6 L 4 6 L 5 6 L 5 6 L 5 5 L 6 5 L 6 5 L 6 4 L 6 4 L 7 3 L 7 3 L 7 3 L 7 2 L 27 2 L 27 3 L 27 3 L 27 3 L 28 4 L 28 4 L 28 5 L 28 5 L 29 5 L 29 6 L 29 6 L 30 6 L 30 6 L 30 6 L 31 7 L 31 7 L 32 7 L 32 15 Z"
      },
      {
        "id": "sp-61",
        "x": 1050.3333333333333,
        "y": 411.85,
        "width": 11.333333333333332,
        "height": 14.3,
        "localPctX": 0.3333333333333311,
        "localPctY": 0.17500000000000104,
        "localPctW": 0.3333333333333333,
        "localPctH": 0.65,
        "text": "",
        "pathD": "M 10 2 L 10 2 L 9 1 L 9 1 L 8 1 L 8 0 L 7 0 L 6 0 L 6 0 L 5 0 L 4 0 L 4 0 L 3 1 L 3 1 L 2 1 L 2 2 L 1 2 L 1 3 L 1 3 L 1 4 L 0 5 L 0 5 L 0 6 L 0 7 L 0 7 L 0 8 L 0 8 L 0 9 L 0 10 L 1 10 L 1 11 L 1 11 L 1 12 L 2 12 L 2 13 L 3 13 L 3 14 L 4 14 L 4 14 L 5 14 L 6 14 L 6 14 L 7 14 L 8 14 L 8 14 L 9 13 L 9 13 L 10 12 L 10 12 L 10 11 L 11 11 L 11 10 L 11 10 L 11 9 L 11 8 L 11 8 L 11 7 L 11 7 L 11 6 L 11 5 L 11 5 L 11 4 L 11 3 L 10 3 L 10 2 Z M 9 11 L 2 11 L 2 10 L 5 10 L 5 5 L 4 5 L 4 5 L 4 6 L 2 5 L 5 2 L 7 2 L 7 10 L 9 10 L 9 11 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 1039,
    "y": 408,
    "width": 34,
    "height": 22
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 58,
    "x": 621,
    "y": 348,
    "width": 34,
    "height": 35,
    "text": "",
    "pathD": "M 34 18 L 34 18 L 33 17 L 33 17 L 33 17 L 25 9 L 25 9 L 24 8 L 24 2 L 24 1 L 24 1 L 24 1 L 24 1 L 24 0 L 23 0 L 23 0 L 22 0 L 2 0 L 1 0 L 1 0 L 1 0 L 1 1 L 0 1 L 0 1 L 0 1 L 0 2 L 0 28 L 0 28 L 0 29 L 0 29 L 1 29 L 1 30 L 1 30 L 1 30 L 2 30 L 12 30 L 12 33 L 12 33 L 12 34 L 12 34 L 13 34 L 13 35 L 13 35 L 14 35 L 14 35 L 32 35 L 33 35 L 33 35 L 33 35 L 34 34 L 34 34 L 34 34 L 34 33 L 34 33 L 34 20 L 34 20 L 34 19 L 34 19 L 34 18 Z M 24 12 L 30 18 L 24 18 L 24 12 Z M 5 5 L 5 5 L 5 5 L 5 5 L 5 4 L 5 3 L 5 3 L 5 3 L 5 3 L 5 3 L 19 3 L 19 3 L 19 3 L 19 3 L 19 3 L 19 4 L 19 5 L 19 5 L 19 5 L 19 5 L 5 5 Z M 32 32 L 15 32 L 15 10 L 22 10 L 22 18 L 22 19 L 22 19 L 22 19 L 22 19 L 23 20 L 23 20 L 23 20 L 24 20 L 32 20 L 32 32 Z"
  },
  {
    "id": "grp-39",
    "isGroup": true,
    "children": [
      {
        "id": "sp-62",
        "x": 197,
        "y": 411,
        "width": 34,
        "height": 20,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 33 1 L 33 0 L 33 0 L 32 0 L 32 0 L 2 0 L 2 0 L 1 0 L 1 0 L 1 1 L 0 1 L 0 1 L 0 2 L 0 2 L 0 18 L 0 18 L 0 19 L 0 19 L 1 19 L 1 20 L 1 20 L 2 20 L 2 20 L 32 20 L 32 20 L 33 20 L 33 20 L 33 19 L 34 19 L 34 19 L 34 18 L 34 18 L 34 2 L 34 2 L 34 1 L 34 1 L 33 1 Z M 32 18 L 2 18 L 2 2 L 32 2 L 32 18 Z"
      },
      {
        "id": "sp-63",
        "x": 201.53333333333336,
        "y": 424.33333333333337,
        "width": 10,
        "height": 10,
        "localPctX": 0.1333333333333341,
        "localPctY": 0.6666666666666685,
        "localPctW": 0.06666666666666667,
        "localPctH": 0.11111111111111112,
        "text": "",
        "pathD": "M 0 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 0 L 2 0 L 2 0 L 2 0 L 2 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 2 L 0 2 L 0 2 L 0 2 L 0 2 Z"
      },
      {
        "id": "sp-64",
        "x": 201.53333333333336,
        "y": 419.8888888888889,
        "width": 10,
        "height": 10,
        "localPctX": 0.1333333333333341,
        "localPctY": 0.4444444444444457,
        "localPctW": 0.13333333333333333,
        "localPctH": 0.11111111111111112,
        "text": "",
        "pathD": "M 0 2 L 4 2 L 4 2 L 4 2 L 5 2 L 5 2 L 5 0 L 5 0 L 4 0 L 4 0 L 4 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 2 L 0 2 L 0 2 L 0 2 L 0 2 Z"
      },
      {
        "id": "sp-65",
        "x": 201.53333333333336,
        "y": 415.44444444444446,
        "width": 10,
        "height": 10,
        "localPctX": 0.1333333333333341,
        "localPctY": 0.22222222222222285,
        "localPctW": 0.06666666666666667,
        "localPctH": 0.11111111111111112,
        "text": "",
        "pathD": "M 0 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 0 L 2 0 L 2 0 L 2 0 L 2 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 2 L 0 2 L 0 2 L 0 2 L 0 2 Z"
      },
      {
        "id": "sp-66",
        "x": 206.06666666666666,
        "y": 424.33333333333337,
        "width": 15.866666666666667,
        "height": 10,
        "localPctX": 0.26666666666666655,
        "localPctY": 0.6666666666666685,
        "localPctW": 0.4666666666666667,
        "localPctH": 0.11111111111111112,
        "text": "",
        "pathD": "M 16 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 2 L 0 2 L 0 2 L 0 2 L 0 2 L 16 2 L 16 2 L 16 2 L 16 2 L 16 2 L 16 0 L 16 0 L 16 0 L 16 0 L 16 0 Z"
      },
      {
        "id": "sp-67",
        "x": 208.33333333333334,
        "y": 419.8888888888889,
        "width": 10,
        "height": 10,
        "localPctX": 0.3333333333333336,
        "localPctY": 0.4444444444444457,
        "localPctW": 0.06666666666666667,
        "localPctH": 0.11111111111111112,
        "text": "",
        "pathD": "M 0 2 L 0 2 L 0 2 L 0 2 L 0 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 0 L 2 0 L 2 0 L 2 0 L 2 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 2 Z"
      },
      {
        "id": "sp-68",
        "x": 206.06666666666666,
        "y": 415.44444444444446,
        "width": 10,
        "height": 10,
        "localPctX": 0.26666666666666655,
        "localPctY": 0.22222222222222285,
        "localPctW": 0.06666666666666667,
        "localPctH": 0.11111111111111112,
        "text": "",
        "pathD": "M 0 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 0 L 2 0 L 2 0 L 2 0 L 2 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 2 L 0 2 L 0 2 L 0 2 L 0 2 Z"
      },
      {
        "id": "sp-69",
        "x": 212.86666666666667,
        "y": 419.8888888888889,
        "width": 10,
        "height": 10,
        "localPctX": 0.4666666666666669,
        "localPctY": 0.4444444444444457,
        "localPctW": 0.06666666666666667,
        "localPctH": 0.11111111111111112,
        "text": "",
        "pathD": "M 0 2 L 0 2 L 0 2 L 0 2 L 0 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 0 L 2 0 L 2 0 L 2 0 L 2 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 2 Z"
      },
      {
        "id": "sp-70",
        "x": 210.60000000000002,
        "y": 415.44444444444446,
        "width": 10,
        "height": 10,
        "localPctX": 0.4000000000000007,
        "localPctY": 0.22222222222222285,
        "localPctW": 0.06666666666666667,
        "localPctH": 0.11111111111111112,
        "text": "",
        "pathD": "M 0 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 0 L 2 0 L 2 0 L 2 0 L 2 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 2 L 0 2 L 0 2 L 0 2 L 0 2 Z"
      },
      {
        "id": "sp-71",
        "x": 216.83333333333331,
        "y": 419.8888888888889,
        "width": 10,
        "height": 10,
        "localPctX": 0.5833333333333328,
        "localPctY": 0.4444444444444457,
        "localPctW": 0.06666666666666667,
        "localPctH": 0.11111111111111112,
        "text": "",
        "pathD": "M 0 2 L 0 2 L 0 2 L 0 2 L 0 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 0 L 2 0 L 2 0 L 2 0 L 2 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 2 Z"
      },
      {
        "id": "sp-72",
        "x": 223.63333333333333,
        "y": 424.33333333333337,
        "width": 10,
        "height": 10,
        "localPctX": 0.7833333333333331,
        "localPctY": 0.6666666666666685,
        "localPctW": 0.06666666666666667,
        "localPctH": 0.11111111111111112,
        "text": "",
        "pathD": "M 2 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 2 L 0 2 L 0 2 L 0 2 L 0 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 0 L 2 0 L 2 0 L 2 0 L 2 0 Z"
      },
      {
        "id": "sp-73",
        "x": 215.13333333333333,
        "y": 415.44444444444446,
        "width": 10,
        "height": 10,
        "localPctX": 0.5333333333333331,
        "localPctY": 0.22222222222222285,
        "localPctW": 0.06666666666666667,
        "localPctH": 0.11111111111111112,
        "text": "",
        "pathD": "M 0 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 0 L 2 0 L 2 0 L 2 0 L 2 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 2 L 0 2 L 0 2 L 0 2 L 0 2 Z"
      },
      {
        "id": "sp-74",
        "x": 219.10000000000002,
        "y": 415.44444444444446,
        "width": 10,
        "height": 10,
        "localPctX": 0.6500000000000007,
        "localPctY": 0.22222222222222285,
        "localPctW": 0.06666666666666667,
        "localPctH": 0.11111111111111112,
        "text": "",
        "pathD": "M 0 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 0 L 2 0 L 2 0 L 2 0 L 2 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 0 L 0 2 L 0 2 L 0 2 L 0 2 L 0 2 Z"
      },
      {
        "id": "sp-75",
        "x": 221.93333333333334,
        "y": 415.44444444444446,
        "width": 10,
        "height": 10,
        "localPctX": 0.7333333333333334,
        "localPctY": 0.22222222222222285,
        "localPctW": 0.13333333333333333,
        "localPctH": 0.33333333333333337,
        "text": "",
        "pathD": "M 0 6 L 0 7 L 0 7 L 0 7 L 0 7 L 4 7 L 4 7 L 4 7 L 4 7 L 5 6 L 5 0 L 4 0 L 4 0 L 4 0 L 4 0 L 3 0 L 2 0 L 2 0 L 2 0 L 2 0 L 2 4 L 0 4 L 0 4 L 0 5 L 0 5 L 0 5 L 0 6 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 197,
    "y": 411,
    "width": 34,
    "height": 20
  },
  {
    "id": "grp-54",
    "isGroup": true,
    "children": [
      {
        "id": "sp-76",
        "x": 929,
        "y": 294.8181818181818,
        "width": 10,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.27272727272727254,
        "localPctW": 0.14285714285714288,
        "localPctH": 0.18181818181818182,
        "text": "",
        "pathD": "M 4 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 4 L 0 4 L 0 4 L 0 4 L 1 5 L 4 5 L 4 4 L 4 4 L 4 4 L 4 4 L 4 1 L 4 0 L 4 0 L 4 0 L 4 0 Z"
      },
      {
        "id": "sp-77",
        "x": 929,
        "y": 308.45454545454544,
        "width": 10,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.8181818181818176,
        "localPctW": 0.14285714285714288,
        "localPctH": 0.18181818181818182,
        "text": "",
        "pathD": "M 4 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 4 L 0 4 L 0 4 L 0 4 L 1 5 L 4 5 L 4 4 L 4 4 L 4 4 L 4 4 L 4 1 L 4 0 L 4 0 L 4 0 L 4 0 Z"
      },
      {
        "id": "sp-78",
        "x": 929,
        "y": 301.6363636363636,
        "width": 10,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.5454545454545451,
        "localPctW": 0.14285714285714288,
        "localPctH": 0.18181818181818182,
        "text": "",
        "pathD": "M 4 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 4 L 0 4 L 0 4 L 0 4 L 1 5 L 4 5 L 4 4 L 4 4 L 4 4 L 4 4 L 4 1 L 4 0 L 4 0 L 4 0 L 4 0 Z"
      },
      {
        "id": "sp-79",
        "x": 929,
        "y": 288,
        "width": 10,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.14285714285714288,
        "localPctH": 0.18181818181818182,
        "text": "",
        "pathD": "M 4 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 4 L 0 4 L 0 4 L 0 4 L 1 5 L 4 5 L 4 4 L 4 4 L 4 4 L 4 4 L 4 1 L 4 0 L 4 0 L 4 0 L 4 0 Z"
      },
      {
        "id": "sp-80",
        "x": 935.6428571428571,
        "y": 308.45454545454544,
        "width": 24.357142857142858,
        "height": 10,
        "localPctX": 0.21428571428571325,
        "localPctY": 0.8181818181818176,
        "localPctW": 0.7857142857142857,
        "localPctH": 0.18181818181818182,
        "text": "",
        "pathD": "M 24 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 4 L 0 4 L 0 4 L 0 4 L 1 5 L 24 5 L 24 4 L 24 4 L 24 4 L 24 4 L 24 1 L 24 0 L 24 0 L 24 0 L 24 0 Z"
      },
      {
        "id": "sp-81",
        "x": 935.6428571428571,
        "y": 301.6363636363636,
        "width": 24.357142857142858,
        "height": 10,
        "localPctX": 0.21428571428571325,
        "localPctY": 0.5454545454545451,
        "localPctW": 0.7857142857142857,
        "localPctH": 0.18181818181818182,
        "text": "",
        "pathD": "M 24 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 4 L 0 4 L 0 4 L 0 4 L 1 5 L 24 5 L 24 4 L 24 4 L 24 4 L 24 4 L 24 1 L 24 0 L 24 0 L 24 0 L 24 0 Z"
      },
      {
        "id": "sp-82",
        "x": 935.6428571428571,
        "y": 288,
        "width": 24.357142857142858,
        "height": 10,
        "localPctX": 0.21428571428571325,
        "localPctY": 0,
        "localPctW": 0.7857142857142857,
        "localPctH": 0.18181818181818182,
        "text": "",
        "pathD": "M 24 0 L 24 0 L 24 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 4 L 0 4 L 0 4 L 0 4 L 1 5 L 24 5 L 24 4 L 24 4 L 24 4 L 24 4 L 24 1 L 24 0 L 24 0 Z"
      },
      {
        "id": "sp-83",
        "x": 935.6428571428571,
        "y": 294.8181818181818,
        "width": 24.357142857142858,
        "height": 10,
        "localPctX": 0.21428571428571325,
        "localPctY": 0.27272727272727254,
        "localPctW": 0.7857142857142857,
        "localPctH": 0.18181818181818182,
        "text": "",
        "pathD": "M 24 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 4 L 0 4 L 0 4 L 0 4 L 1 5 L 24 5 L 24 4 L 24 4 L 24 4 L 24 4 L 24 1 L 24 0 L 24 0 L 24 0 L 24 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 49,
    "x": 929,
    "y": 288,
    "width": 31,
    "height": 25
  },
  {
    "id": "grp-63",
    "isGroup": true,
    "children": [
      {
        "id": "sp-84",
        "x": 65,
        "y": 408,
        "width": 31,
        "height": 25.000000000000004,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1.0000000000000002,
        "text": "",
        "pathD": "M 30 1 L 30 1 L 30 0 L 30 0 L 29 0 L 29 0 L 29 0 L 29 0 L 28 0 L 3 0 L 2 0 L 2 0 L 2 0 L 2 0 L 1 0 L 1 0 L 1 1 L 1 1 L 1 1 L 0 1 L 0 1 L 0 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 22 L 0 22 L 0 23 L 0 23 L 0 23 L 0 24 L 0 24 L 1 24 L 1 24 L 1 24 L 1 24 L 1 25 L 2 25 L 2 25 L 2 25 L 2 25 L 3 25 L 28 25 L 29 25 L 29 25 L 29 25 L 29 25 L 30 25 L 30 24 L 30 24 L 30 24 L 30 24 L 31 24 L 31 24 L 31 23 L 31 23 L 31 23 L 31 22 L 31 22 L 31 3 L 31 3 L 31 2 L 31 2 L 31 2 L 31 1 L 31 1 L 30 1 L 30 1 Z M 29 22 L 29 22 L 29 23 L 28 23 L 28 23 L 3 23 L 3 23 L 2 23 L 2 22 L 2 22 L 2 7 L 2 7 L 2 7 L 3 7 L 3 7 L 28 7 L 28 7 L 29 7 L 29 7 L 29 7 L 29 22 Z"
      },
      {
        "id": "sp-85",
        "x": 69.42857142857144,
        "y": 426.1818181818182,
        "width": 10,
        "height": 10,
        "localPctX": 0.14285714285714338,
        "localPctY": 0.7272727272727275,
        "localPctW": 0.07142857142857144,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 2 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 2 L 0 2 L 0 2 L 0 2 L 1 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 1 L 2 0 L 2 0 L 2 0 L 2 0 Z"
      },
      {
        "id": "sp-86",
        "x": 69.42857142857144,
        "y": 421.6363636363636,
        "width": 10,
        "height": 10,
        "localPctX": 0.14285714285714338,
        "localPctY": 0.5454545454545451,
        "localPctW": 0.07142857142857144,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 2 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 2 L 0 2 L 0 2 L 0 2 L 1 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 1 L 2 0 L 2 0 L 2 0 L 2 0 Z"
      },
      {
        "id": "sp-87",
        "x": 69.42857142857144,
        "y": 417.09090909090907,
        "width": 10,
        "height": 10,
        "localPctX": 0.14285714285714338,
        "localPctY": 0.3636363636363626,
        "localPctW": 0.07142857142857144,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 2 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 2 L 0 2 L 0 2 L 0 2 L 1 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 2 L 2 1 L 2 0 L 2 0 L 2 0 L 2 0 Z"
      },
      {
        "id": "sp-88",
        "x": 73.85714285714289,
        "y": 426.1818181818182,
        "width": 17.714285714285715,
        "height": 10,
        "localPctX": 0.28571428571428675,
        "localPctY": 0.7272727272727275,
        "localPctW": 0.5714285714285715,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 17 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 2 L 0 2 L 0 2 L 0 2 L 1 2 L 17 2 L 17 2 L 18 2 L 18 2 L 18 2 L 18 1 L 18 0 L 18 0 L 17 0 L 17 0 Z"
      },
      {
        "id": "sp-89",
        "x": 73.85714285714289,
        "y": 421.6363636363636,
        "width": 17.714285714285715,
        "height": 10,
        "localPctX": 0.28571428571428675,
        "localPctY": 0.5454545454545451,
        "localPctW": 0.5714285714285715,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 17 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 2 L 0 2 L 0 2 L 0 2 L 1 2 L 17 2 L 17 2 L 18 2 L 18 2 L 18 2 L 18 1 L 18 0 L 18 0 L 17 0 L 17 0 Z"
      },
      {
        "id": "sp-90",
        "x": 73.85714285714289,
        "y": 417.09090909090907,
        "width": 17.714285714285715,
        "height": 10,
        "localPctX": 0.28571428571428675,
        "localPctY": 0.3636363636363626,
        "localPctW": 0.5714285714285715,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 17 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 2 L 0 2 L 0 2 L 0 2 L 1 2 L 17 2 L 17 2 L 18 2 L 18 2 L 18 2 L 18 1 L 18 0 L 18 0 L 17 0 L 17 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 66,
    "x": 65,
    "y": 408,
    "width": 31,
    "height": 25
  },
  {
    "id": "grp-71",
    "isGroup": true,
    "children": [
      {
        "id": "sp-91",
        "x": 866,
        "y": 298.09090909090907,
        "width": 10,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.3636363636363626,
        "localPctW": 0.2142857142857143,
        "localPctH": 0.2727272727272727,
        "text": "",
        "pathD": "M 3 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 0 L 1 1 L 1 1 L 1 1 L 1 1 L 1 2 L 0 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 3 L 0 4 L 0 4 L 0 4 L 0 5 L 0 5 L 1 5 L 1 6 L 1 6 L 1 6 L 1 6 L 2 6 L 2 7 L 2 7 L 3 7 L 3 7 L 3 7 L 4 7 L 4 7 L 4 7 L 5 7 L 5 6 L 5 6 L 5 6 L 6 6 L 6 6 L 6 5 L 6 5 L 6 5 L 6 4 L 7 4 L 7 4 L 7 3 L 7 3 L 7 3 L 6 2 L 6 2 L 6 2 L 6 2 L 6 1 L 6 1 L 5 1 L 5 1 L 5 0 L 5 0 L 4 0 L 4 0 L 4 0 L 3 0 Z"
      },
      {
        "id": "sp-92",
        "x": 866,
        "y": 289,
        "width": 10,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.2142857142857143,
        "localPctH": 0.2727272727272727,
        "text": "",
        "pathD": "M 3 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 0 L 1 1 L 1 1 L 1 1 L 1 1 L 1 2 L 0 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 3 L 0 4 L 0 4 L 0 4 L 0 5 L 0 5 L 1 5 L 1 6 L 1 6 L 1 6 L 1 6 L 2 6 L 2 7 L 2 7 L 3 7 L 3 7 L 3 7 L 4 7 L 4 7 L 4 7 L 5 7 L 5 6 L 5 6 L 5 6 L 6 6 L 6 6 L 6 5 L 6 5 L 6 5 L 6 4 L 7 4 L 7 4 L 7 3 L 7 3 L 7 3 L 6 2 L 6 2 L 6 2 L 6 2 L 6 1 L 6 1 L 5 1 L 5 1 L 5 0 L 5 0 L 4 0 L 4 0 L 4 0 L 3 0 Z"
      },
      {
        "id": "sp-93",
        "x": 866,
        "y": 307.1818181818182,
        "width": 10,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.7272727272727275,
        "localPctW": 0.2142857142857143,
        "localPctH": 0.2727272727272727,
        "text": "",
        "pathD": "M 3 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 0 L 1 1 L 1 1 L 1 1 L 1 1 L 1 2 L 0 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 3 L 0 4 L 0 4 L 0 4 L 0 5 L 0 5 L 1 5 L 1 6 L 1 6 L 1 6 L 1 6 L 2 6 L 2 7 L 2 7 L 3 7 L 3 7 L 3 7 L 4 7 L 4 7 L 4 7 L 5 7 L 5 6 L 5 6 L 5 6 L 6 6 L 6 6 L 6 5 L 6 5 L 6 5 L 6 4 L 7 4 L 7 4 L 7 3 L 7 3 L 7 3 L 6 2 L 6 2 L 6 2 L 6 2 L 6 1 L 6 1 L 5 1 L 5 1 L 5 0 L 5 0 L 4 0 L 4 0 L 4 0 L 3 0 Z"
      },
      {
        "id": "sp-94",
        "x": 874.8571428571429,
        "y": 290.1363636363636,
        "width": 22.142857142857146,
        "height": 10,
        "localPctX": 0.28571428571428675,
        "localPctY": 0.04545454545454504,
        "localPctW": 0.7142857142857144,
        "localPctH": 0.18181818181818182,
        "text": "",
        "pathD": "M 22 0 L 22 0 L 22 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 4 L 0 4 L 0 4 L 0 4 L 1 5 L 22 5 L 22 4 L 22 4 L 22 4 L 22 4 L 22 1 L 22 0 L 22 0 Z"
      },
      {
        "id": "sp-95",
        "x": 874.8571428571429,
        "y": 299.2272727272727,
        "width": 22.142857142857146,
        "height": 10,
        "localPctX": 0.28571428571428675,
        "localPctY": 0.4090909090909076,
        "localPctW": 0.7142857142857144,
        "localPctH": 0.18181818181818182,
        "text": "",
        "pathD": "M 22 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 4 L 0 4 L 0 4 L 0 4 L 1 5 L 22 5 L 22 4 L 22 4 L 22 4 L 22 4 L 22 1 L 22 0 L 22 0 L 22 0 L 22 0 Z"
      },
      {
        "id": "sp-96",
        "x": 874.8571428571429,
        "y": 308.3181818181818,
        "width": 22.142857142857146,
        "height": 10,
        "localPctX": 0.28571428571428675,
        "localPctY": 0.7727272727272725,
        "localPctW": 0.7142857142857144,
        "localPctH": 0.18181818181818182,
        "text": "",
        "pathD": "M 22 0 L 1 0 L 0 0 L 0 0 L 0 0 L 0 1 L 0 4 L 0 4 L 0 4 L 0 4 L 1 5 L 22 5 L 22 4 L 22 4 L 22 4 L 22 4 L 22 1 L 22 0 L 22 0 L 22 0 L 22 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 48,
    "x": 866,
    "y": 289,
    "width": 31,
    "height": 25
  },
  {
    "id": "sp-11",
    "x": 264,
    "y": 410,
    "width": 14,
    "height": 22,
    "text": "",
    "pathD": "M 13 1 L 13 0 L 13 0 L 12 0 L 12 0 L 2 0 L 2 0 L 1 0 L 1 0 L 1 1 L 0 1 L 0 1 L 0 2 L 0 2 L 0 20 L 0 20 L 0 21 L 0 21 L 1 21 L 1 22 L 1 22 L 2 22 L 2 22 L 12 22 L 12 22 L 13 22 L 13 22 L 13 21 L 14 21 L 14 21 L 14 20 L 14 20 L 14 2 L 14 2 L 14 1 L 14 1 L 13 1 Z M 6 2 L 8 2 L 9 2 L 9 2 L 9 2 L 9 2 L 9 3 L 9 3 L 9 3 L 8 3 L 6 3 L 5 3 L 5 3 L 5 3 L 5 2 L 5 2 L 5 2 L 5 2 L 6 2 Z M 8 21 L 8 21 L 8 21 L 7 21 L 7 21 L 7 21 L 6 21 L 6 21 L 6 21 L 6 21 L 6 20 L 6 20 L 6 20 L 6 20 L 6 19 L 6 19 L 6 19 L 6 19 L 6 19 L 7 18 L 7 18 L 7 18 L 8 19 L 8 19 L 8 19 L 8 19 L 8 19 L 8 20 L 8 20 L 8 20 L 8 20 L 8 21 L 8 21 Z M 12 17 L 12 17 L 12 17 L 12 18 L 12 18 L 2 18 L 2 18 L 2 17 L 2 17 L 2 17 L 2 5 L 2 5 L 2 5 L 2 4 L 2 4 L 12 4 L 12 4 L 12 5 L 12 5 L 12 5 L 12 17 Z"
  },
  {
    "id": "grp-79",
    "isGroup": true,
    "children": [
      {
        "id": "sp-97",
        "x": 1058,
        "y": 285,
        "width": 27.310344827586206,
        "height": 21.022727272727273,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.8275862068965517,
        "localPctH": 0.8409090909090909,
        "text": "",
        "pathD": "M 9 12 L 10 12 L 11 11 L 11 11 L 12 11 L 12 11 L 13 11 L 27 11 L 27 8 L 27 8 L 27 8 L 27 7 L 27 7 L 27 7 L 27 6 L 26 6 L 26 6 L 26 5 L 25 5 L 25 5 L 25 5 L 25 5 L 24 5 L 24 5 L 23 4 L 14 4 L 14 4 L 14 4 L 14 3 L 13 3 L 13 2 L 13 2 L 13 2 L 13 1 L 12 1 L 12 1 L 12 1 L 12 0 L 11 0 L 11 0 L 10 0 L 10 0 L 10 0 L 4 0 L 4 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 1 L 1 1 L 1 1 L 1 1 L 1 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 4 L 0 4 L 0 21 L 0 21 L 0 21 L 0 21 L 0 21 L 0 21 L 6 14 L 6 14 L 7 13 L 7 13 L 7 13 L 8 12 L 9 12 Z"
      },
      {
        "id": "sp-98",
        "x": 1059.7068965517242,
        "y": 298.6363636363636,
        "width": 31.862068965517242,
        "height": 11.363636363636365,
        "localPctX": 0.05172413793103591,
        "localPctY": 0.5454545454545451,
        "localPctW": 0.9655172413793104,
        "localPctH": 0.4545454545454546,
        "text": "",
        "pathD": "M 31 0 L 31 0 L 31 0 L 31 0 L 30 0 L 11 0 L 11 0 L 10 0 L 9 0 L 9 1 L 8 1 L 7 1 L 7 2 L 6 2 L 1 9 L 0 9 L 0 10 L 0 10 L 0 10 L 0 11 L 0 11 L 0 11 L 1 11 L 1 11 L 1 11 L 1 11 L 2 11 L 21 11 L 21 11 L 22 11 L 23 11 L 23 11 L 24 10 L 24 10 L 25 10 L 25 9 L 31 2 L 32 2 L 32 2 L 32 1 L 32 1 L 32 1 L 32 1 L 32 0 L 31 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 51,
    "x": 1058,
    "y": 285,
    "width": 33,
    "height": 25
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 50,
    "x": 992,
    "y": 285,
    "width": 33,
    "height": 25,
    "text": "",
    "pathD": "M 33 13 L 33 13 L 32 12 L 32 12 L 32 12 L 31 12 L 31 12 L 30 11 L 30 11 L 27 11 L 27 9 L 27 8 L 27 8 L 26 7 L 26 7 L 26 7 L 26 6 L 26 6 L 25 6 L 25 5 L 25 5 L 25 5 L 24 5 L 24 5 L 24 5 L 23 5 L 23 5 L 13 5 L 13 4 L 13 4 L 13 3 L 13 3 L 13 2 L 13 2 L 13 2 L 12 1 L 12 1 L 12 1 L 12 1 L 11 0 L 11 0 L 11 0 L 10 0 L 10 0 L 9 0 L 4 0 L 4 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 1 L 1 1 L 1 1 L 1 1 L 1 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 4 L 0 4 L 0 21 L 0 21 L 0 22 L 0 22 L 0 23 L 0 23 L 1 23 L 1 24 L 1 24 L 1 24 L 2 24 L 2 25 L 2 25 L 3 25 L 3 25 L 4 25 L 4 25 L 23 25 L 23 25 L 24 25 L 25 25 L 25 24 L 26 24 L 26 24 L 27 23 L 27 23 L 32 16 L 33 16 L 33 15 L 33 15 L 33 15 L 33 15 L 33 14 L 33 14 L 33 14 L 33 13 L 33 13 Z M 2 4 L 2 4 L 2 3 L 3 3 L 3 3 L 3 3 L 3 2 L 4 2 L 4 2 L 9 2 L 10 2 L 10 2 L 10 3 L 11 3 L 11 3 L 11 3 L 11 4 L 11 4 L 11 5 L 11 5 L 11 6 L 11 6 L 12 6 L 12 7 L 12 7 L 12 7 L 13 7 L 23 7 L 23 7 L 23 7 L 24 7 L 24 7 L 24 8 L 24 8 L 24 8 L 24 9 L 24 11 L 11 11 L 10 11 L 10 12 L 9 12 L 9 12 L 8 12 L 8 13 L 7 13 L 7 14 L 2 19 L 2 4 Z M 31 15 L 25 21 L 25 22 L 25 22 L 25 22 L 24 22 L 24 23 L 23 23 L 23 23 L 23 23 L 4 23 L 4 23 L 4 23 L 3 23 L 3 23 L 3 22 L 3 22 L 3 22 L 3 22 L 3 22 L 3 22 L 3 22 L 3 21 L 8 15 L 9 15 L 9 14 L 9 14 L 10 14 L 10 14 L 10 14 L 11 14 L 11 14 L 30 14 L 30 14 L 31 14 L 31 14 L 31 14 L 31 14 L 31 14 L 31 14 L 31 15 L 31 15 L 31 15 Z"
  },
  {
    "id": "grp-83",
    "isGroup": true,
    "children": [
      {
        "id": "sp-99",
        "x": 134.53333333333336,
        "y": 410,
        "width": 24.933333333333334,
        "height": 17.6,
        "localPctX": 0.1333333333333341,
        "localPctY": 0,
        "localPctW": 0.7333333333333334,
        "localPctH": 0.8,
        "text": "",
        "pathD": "M 3 18 L 22 18 L 22 18 L 23 18 L 23 17 L 23 17 L 23 17 L 24 17 L 24 17 L 24 17 L 24 17 L 24 16 L 25 16 L 25 16 L 25 16 L 25 15 L 25 15 L 25 15 L 25 3 L 25 2 L 25 2 L 25 2 L 25 2 L 25 1 L 24 1 L 24 1 L 24 1 L 24 1 L 24 0 L 23 0 L 23 0 L 23 0 L 23 0 L 22 0 L 22 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 0 L 1 0 L 1 0 L 1 1 L 1 1 L 1 1 L 0 1 L 0 1 L 0 2 L 0 2 L 0 2 L 0 2 L 0 3 L 0 15 L 0 15 L 0 15 L 0 16 L 0 16 L 0 16 L 0 16 L 1 17 L 1 17 L 1 17 L 1 17 L 1 17 L 2 17 L 2 17 L 2 18 L 3 18 L 3 18 Z M 2 3 L 2 3 L 2 2 L 3 2 L 3 2 L 22 2 L 22 2 L 22 2 L 23 3 L 23 3 L 23 15 L 23 15 L 22 15 L 22 15 L 22 15 L 3 15 L 3 15 L 2 15 L 2 15 L 2 15 L 2 3 Z"
      },
      {
        "id": "sp-100",
        "x": 130,
        "y": 428.70000000000005,
        "width": 34,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.8500000000000021,
        "localPctW": 1,
        "localPctH": 0.15000000000000002,
        "text": "",
        "pathD": "M 31 0 L 0 0 L 0 2 L 0 2 L 0 2 L 0 2 L 0 2 L 0 3 L 1 3 L 1 3 L 2 3 L 2 3 L 3 3 L 31 3 L 32 3 L 32 3 L 33 3 L 33 3 L 34 3 L 34 2 L 34 2 L 34 2 L 34 2 L 34 2 L 34 0 L 31 0 Z M 18 2 L 16 2 L 15 2 L 15 2 L 15 1 L 15 1 L 15 1 L 15 1 L 15 1 L 16 1 L 18 1 L 18 1 L 19 1 L 19 1 L 19 1 L 19 1 L 19 2 L 18 2 L 18 2 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 130,
    "y": 410,
    "width": 34,
    "height": 22
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 311,
    "y": 408,
    "width": 20,
    "height": 25,
    "text": "",
    "pathD": "M 19 1 L 19 1 L 19 0 L 18 0 L 18 0 L 18 0 L 18 0 L 17 0 L 17 0 L 3 0 L 2 0 L 2 0 L 2 0 L 2 0 L 1 0 L 1 0 L 1 1 L 1 1 L 1 1 L 0 1 L 0 2 L 0 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 22 L 0 22 L 0 23 L 0 23 L 0 23 L 0 24 L 0 24 L 1 24 L 1 24 L 1 24 L 1 25 L 1 25 L 2 25 L 2 25 L 2 25 L 2 25 L 3 25 L 17 25 L 17 25 L 18 25 L 18 25 L 18 25 L 18 25 L 19 25 L 19 24 L 19 24 L 19 24 L 19 24 L 20 24 L 20 23 L 20 23 L 20 23 L 20 22 L 20 22 L 20 3 L 20 3 L 20 2 L 20 2 L 20 2 L 20 2 L 19 1 L 19 1 L 19 1 Z M 11 24 L 11 24 L 10 24 L 10 24 L 10 24 L 10 24 L 10 24 L 9 24 L 9 24 L 9 23 L 9 23 L 9 23 L 9 23 L 9 23 L 9 22 L 9 22 L 9 22 L 9 22 L 10 22 L 10 22 L 10 22 L 10 22 L 10 22 L 11 22 L 11 22 L 11 22 L 11 22 L 11 23 L 11 23 L 11 23 L 11 23 L 11 23 L 11 24 Z M 18 20 L 18 20 L 18 20 L 17 20 L 17 20 L 3 20 L 3 20 L 2 20 L 2 20 L 2 20 L 2 3 L 2 3 L 2 2 L 3 2 L 3 2 L 17 2 L 17 2 L 18 2 L 18 3 L 18 3 L 18 20 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 67,
    "x": 365,
    "y": 406,
    "width": 34,
    "height": 29,
    "text": "",
    "pathD": "M 33 1 L 33 1 L 33 0 L 33 0 L 32 0 L 32 0 L 32 0 L 31 0 L 31 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 0 L 2 0 L 1 0 L 1 1 L 1 1 L 1 1 L 0 1 L 0 1 L 0 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 22 L 0 22 L 0 22 L 0 23 L 0 23 L 0 23 L 0 23 L 1 24 L 1 24 L 1 24 L 1 24 L 2 24 L 2 24 L 2 24 L 2 24 L 3 25 L 3 25 L 12 25 L 12 25 L 12 25 L 12 26 L 12 26 L 12 27 L 12 27 L 11 28 L 11 28 L 11 28 L 11 28 L 12 28 L 12 29 L 12 29 L 12 29 L 12 29 L 12 29 L 22 29 L 22 29 L 22 29 L 22 29 L 22 29 L 22 28 L 23 28 L 23 28 L 23 28 L 23 28 L 22 27 L 22 27 L 22 26 L 22 26 L 22 25 L 22 25 L 22 25 L 31 25 L 31 25 L 32 24 L 32 24 L 32 24 L 33 24 L 33 24 L 33 24 L 33 24 L 33 24 L 34 23 L 34 23 L 34 23 L 34 23 L 34 22 L 34 22 L 34 22 L 34 3 L 34 3 L 34 2 L 34 2 L 34 2 L 34 1 L 34 1 L 33 1 L 33 1 Z M 32 17 L 32 18 L 32 18 L 31 18 L 31 18 L 3 18 L 3 18 L 2 18 L 2 18 L 2 17 L 2 3 L 2 3 L 2 2 L 3 2 L 3 2 L 31 2 L 31 2 L 32 2 L 32 3 L 32 3 L 32 17 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 47,
    "x": 803,
    "y": 290,
    "width": 31,
    "height": 25,
    "text": "",
    "pathD": "M 28 0 L 28 0 C 3 0, 3 0, 3 0 C 1 0, 0 1, 0 3 C 0 22, 0 22, 0 22 C 0 23, 1 25, 3 25 C 28 25, 28 25, 28 25 C 29 25, 31 23, 31 22 C 31 3, 31 3, 31 3 C 31 1, 29 0, 28 0 Z M 28 22 L 28 22 C 3 22, 3 22, 3 22 C 3 3, 3 3, 3 3 C 28 3, 28 3, 28 3 L 28 22 Z M 14 16 L 14 16 C 6 16, 6 16, 6 16 C 6 18, 6 18, 6 18 C 14 18, 14 18, 14 18 L 14 16 Z M 14 11 L 14 11 C 6 11, 6 11, 6 11 C 6 14, 6 14, 6 14 C 14 14, 14 14, 14 14 L 14 11 Z M 14 6 L 14 6 C 6 6, 6 6, 6 6 C 6 9, 6 9, 6 9 C 14 9, 14 9, 14 9 L 14 6 Z M 24 16 L 24 16 C 24 16, 22 16, 22 14 C 22 13, 24 12, 24 9 C 24 8, 23 6, 21 6 C 19 6, 18 8, 18 9 C 18 12, 20 13, 20 14 C 20 16, 17 16, 17 16 L 17 18 C 25 18, 25 18, 25 18 C 25 18, 25 16, 24 16 Z"
  },
  {
    "id": "grp-89",
    "isGroup": true,
    "children": [
      {
        "id": "sp-101",
        "x": 1180,
        "y": 351,
        "width": 37,
        "height": 30,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 36 1 L 36 1 L 36 1 L 35 0 L 35 0 L 35 0 L 34 0 L 34 0 L 34 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 0 L 2 0 L 1 1 L 1 1 L 1 1 L 1 1 L 1 1 L 0 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 3 L 0 27 L 0 27 L 0 27 L 0 28 L 0 28 L 0 28 L 1 29 L 1 29 L 1 29 L 1 29 L 1 29 L 2 30 L 2 30 L 2 30 L 2 30 L 3 30 L 3 30 L 34 30 L 34 30 L 34 30 L 35 30 L 35 30 L 35 30 L 36 29 L 36 29 L 36 29 L 36 29 L 36 29 L 37 28 L 37 28 L 37 28 L 37 27 L 37 27 L 37 27 L 37 3 L 37 3 L 37 3 L 37 2 L 37 2 L 37 2 L 36 1 L 36 1 L 36 1 Z M 35 27 L 34 27 L 34 27 L 34 27 L 34 27 L 3 27 L 3 27 L 3 27 L 3 27 L 2 27 L 2 15 L 35 15 L 35 27 Z M 35 7 L 2 7 L 2 3 L 3 3 L 3 3 L 3 3 L 3 3 L 34 3 L 34 3 L 34 3 L 34 3 L 35 3 L 35 7 Z"
      },
      {
        "id": "sp-102",
        "x": 1184.9333333333334,
        "y": 373.5,
        "width": 10,
        "height": 10,
        "localPctX": 0.13333333333333497,
        "localPctY": 0.75,
        "localPctW": 0.13333333333333333,
        "localPctH": 0.08333333333333333,
        "text": ""
      },
      {
        "id": "sp-103",
        "x": 1192.3333333333333,
        "y": 373.5,
        "width": 10,
        "height": 10,
        "localPctX": 0.33333333333333126,
        "localPctY": 0.75,
        "localPctW": 0.2,
        "localPctH": 0.08333333333333333,
        "text": ""
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 65,
    "x": 1180,
    "y": 351,
    "width": 37,
    "height": 30
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 64,
    "x": 1112,
    "y": 351,
    "width": 30,
    "height": 30,
    "text": "",
    "pathD": "M 27 4 L 27 4 C 25 4, 25 4, 25 4 C 25 7, 25 7, 25 7 C 20 7, 20 7, 20 7 C 20 4, 20 4, 20 4 C 10 4, 10 4, 10 4 C 10 7, 10 7, 10 7 C 5 7, 5 7, 5 7 C 5 4, 5 4, 5 4 C 3 4, 3 4, 3 4 C 1 4, 0 5, 0 7 C 0 27, 0 27, 0 27 C 0 29, 1 30, 3 30 C 27 30, 27 30, 27 30 C 29 30, 30 29, 30 27 C 30 7, 30 7, 30 7 C 30 5, 29 4, 27 4 Z M 27 27 L 27 27 C 3 27, 3 27, 3 27 C 3 13, 3 13, 3 13 C 27 13, 27 13, 27 13 L 27 27 Z M 8 0 L 8 0 C 6 0, 6 0, 6 0 C 6 6, 6 6, 6 6 C 8 6, 8 6, 8 6 L 8 0 Z M 24 0 L 24 0 C 22 0, 22 0, 22 0 C 22 6, 22 6, 22 6 C 24 6, 24 6, 24 6 L 24 0 Z"
  },
  {
    "id": "grp-94",
    "isGroup": true,
    "children": [
      {
        "id": "sp-104",
        "x": 1122,
        "y": 302.64516129032256,
        "width": 29,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.6774193548387091,
        "localPctW": 1,
        "localPctH": 0.32258064516129026,
        "text": "",
        "pathD": "M 29 0 L 28 0 L 28 0 L 28 0 L 27 0 L 19 0 L 17 2 L 17 3 L 16 3 L 16 3 L 16 3 L 15 3 L 15 3 L 15 4 L 14 4 L 14 4 L 14 3 L 14 3 L 13 3 L 13 3 L 13 3 L 12 3 L 12 2 L 10 0 L 2 0 L 1 0 L 1 0 L 1 0 L 0 0 L 0 1 L 0 1 L 0 1 L 0 2 L 0 8 L 0 8 L 0 8 L 0 9 L 0 9 L 1 9 L 1 9 L 1 9 L 2 9 L 27 9 L 28 9 L 28 9 L 28 9 L 29 9 L 29 9 L 29 8 L 29 8 L 29 8 L 29 2 L 29 1 L 29 1 L 29 1 L 29 0 Z M 22 7 L 22 7 L 22 7 L 21 7 L 21 7 L 21 7 L 21 7 L 21 7 L 20 7 L 20 6 L 20 6 L 20 6 L 20 6 L 20 6 L 20 5 L 20 5 L 20 5 L 21 5 L 21 5 L 21 5 L 21 5 L 21 5 L 22 5 L 22 5 L 22 5 L 22 5 L 22 5 L 22 6 L 22 6 L 22 6 L 22 6 L 22 6 L 22 7 Z M 26 7 L 26 7 L 26 7 L 26 7 L 26 7 L 25 7 L 25 7 L 25 7 L 25 7 L 25 6 L 25 6 L 25 6 L 25 6 L 25 6 L 25 5 L 25 5 L 25 5 L 25 5 L 25 5 L 25 5 L 26 5 L 26 5 L 26 5 L 26 5 L 26 5 L 27 5 L 27 5 L 27 6 L 27 6 L 27 6 L 27 6 L 27 6 L 26 7 Z"
      },
      {
        "id": "sp-105",
        "x": 1126.53125,
        "y": 283,
        "width": 18.125,
        "height": 19.64516129032258,
        "localPctX": 0.15625,
        "localPctY": 0,
        "localPctW": 0.625,
        "localPctH": 0.6774193548387096,
        "text": "",
        "pathD": "M 8 19 L 8 19 L 9 20 L 9 20 L 9 20 L 9 20 L 9 20 L 10 19 L 10 19 L 18 11 L 18 11 L 18 11 L 18 11 L 18 11 L 18 10 L 18 10 L 18 10 L 18 10 L 18 10 L 18 9 L 17 9 L 17 9 L 12 9 L 12 1 L 12 1 L 12 1 L 12 1 L 12 0 L 12 0 L 12 0 L 12 0 L 11 0 L 7 0 L 7 0 L 6 0 L 6 0 L 6 0 L 6 1 L 6 1 L 6 1 L 6 1 L 6 9 L 1 9 L 1 9 L 1 9 L 0 10 L 0 10 L 0 10 L 0 10 L 0 10 L 0 11 L 0 11 L 0 11 L 0 11 L 0 11 L 8 19 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 52,
    "x": 1122,
    "y": 283,
    "width": 29,
    "height": 29
  },
  {
    "id": "grp-97",
    "isGroup": true,
    "children": [
      {
        "id": "sp-106",
        "x": 1183,
        "y": 297.04,
        "width": 29,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.6800000000000007,
        "localPctW": 1,
        "localPctH": 0.32,
        "text": "",
        "pathD": "M 28 1 L 28 0 L 28 0 L 28 0 L 27 0 L 20 0 L 20 0 L 19 1 L 19 1 L 19 2 L 18 2 L 18 2 L 17 2 L 17 2 L 12 2 L 12 2 L 11 2 L 11 2 L 10 2 L 10 1 L 10 1 L 9 0 L 9 0 L 2 0 L 1 0 L 1 0 L 1 0 L 1 1 L 0 1 L 0 1 L 0 1 L 0 2 L 0 7 L 0 8 L 0 8 L 0 8 L 1 9 L 1 9 L 1 9 L 1 9 L 2 9 L 27 9 L 28 9 L 28 9 L 28 9 L 28 9 L 29 8 L 29 8 L 29 8 L 29 7 L 29 2 L 29 1 L 29 1 L 29 1 L 28 1 Z M 22 6 L 22 7 L 22 7 L 21 7 L 21 7 L 21 7 L 21 7 L 21 7 L 20 6 L 20 6 L 20 6 L 20 6 L 20 6 L 20 5 L 20 5 L 20 5 L 20 5 L 21 5 L 21 5 L 21 5 L 21 4 L 21 5 L 22 5 L 22 5 L 22 5 L 22 5 L 22 5 L 22 5 L 22 6 L 22 6 L 22 6 L 22 6 L 22 6 Z M 26 6 L 26 7 L 26 7 L 26 7 L 26 7 L 25 7 L 25 7 L 25 7 L 25 6 L 25 6 L 25 6 L 25 6 L 25 6 L 25 5 L 25 5 L 25 5 L 25 5 L 25 5 L 25 5 L 25 5 L 26 4 L 26 5 L 26 5 L 26 5 L 26 5 L 27 5 L 27 5 L 27 5 L 27 6 L 27 6 L 27 6 L 27 6 L 26 6 Z"
      },
      {
        "id": "sp-107",
        "x": 1188.019230769231,
        "y": 278,
        "width": 17.846153846153847,
        "height": 19.040000000000003,
        "localPctX": 0.1730769230769291,
        "localPctY": 0,
        "localPctW": 0.6153846153846154,
        "localPctH": 0.68,
        "text": "",
        "pathD": "M 1 10 L 6 10 L 6 18 L 6 18 L 6 18 L 6 19 L 6 19 L 6 19 L 6 19 L 7 19 L 7 19 L 11 19 L 11 19 L 12 19 L 12 19 L 12 19 L 12 19 L 12 18 L 12 18 L 12 18 L 12 10 L 17 10 L 17 10 L 17 10 L 18 10 L 18 9 L 18 9 L 18 9 L 18 9 L 18 9 L 18 9 L 18 8 L 18 8 L 17 8 L 10 0 L 10 0 L 9 0 L 9 0 L 9 0 L 9 0 L 8 0 L 8 0 L 8 0 L 0 8 L 0 8 L 0 8 L 0 9 L 0 9 L 0 9 L 0 9 L 0 9 L 0 9 L 0 10 L 1 10 L 1 10 L 1 10 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 53,
    "x": 1183,
    "y": 278,
    "width": 29,
    "height": 28
  },
  {
    "id": "grp-100",
    "isGroup": true,
    "children": [
      {
        "id": "sp-108",
        "x": 428,
        "y": 418.125,
        "width": 14.5,
        "height": 10.125,
        "localPctX": 0,
        "localPctY": 0.375,
        "localPctW": 0.5,
        "localPctH": 0.375,
        "text": "",
        "pathD": "M 9 10 L 15 5 L 6 0 L 0 5 L 9 10 Z"
      },
      {
        "id": "sp-109",
        "x": 441.94230769230774,
        "y": 418.125,
        "width": 14.5,
        "height": 10.125,
        "localPctX": 0.4807692307692323,
        "localPctY": 0.375,
        "localPctW": 0.5,
        "localPctH": 0.375,
        "text": "",
        "pathD": "M 0 5 L 6 10 L 15 5 L 9 0 L 0 5 Z"
      },
      {
        "id": "sp-110",
        "x": 433.5769230769231,
        "y": 424.875,
        "width": 16.73076923076923,
        "height": 10.125,
        "localPctX": 0.1923076923076929,
        "localPctY": 0.625,
        "localPctW": 0.5769230769230769,
        "localPctH": 0.375,
        "text": "",
        "pathD": "M 8 0 L 8 0 L 8 0 L 8 0 L 8 0 L 3 5 L 0 3 L 0 5 L 8 10 L 8 10 L 8 10 L 8 10 L 8 10 L 17 5 L 17 3 L 14 5 L 8 0 Z"
      },
      {
        "id": "sp-111",
        "x": 428,
        "y": 408,
        "width": 14.5,
        "height": 10.125,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.5,
        "localPctH": 0.375,
        "text": "",
        "pathD": "M 0 5 L 6 10 L 15 5 L 9 0 L 0 5 Z"
      },
      {
        "id": "sp-112",
        "x": 441.94230769230774,
        "y": 408,
        "width": 14.5,
        "height": 10.125,
        "localPctX": 0.4807692307692323,
        "localPctY": 0,
        "localPctW": 0.5,
        "localPctH": 0.375,
        "text": "",
        "pathD": "M 6 0 L 0 5 L 9 10 L 15 5 L 6 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 68,
    "x": 428,
    "y": 408,
    "width": 29,
    "height": 27
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 75,
    "x": 1125,
    "y": 409,
    "width": 26,
    "height": 28,
    "text": "",
    "pathD": "M 25 5 L 25 4 L 25 4 L 24 4 L 24 4 L 22 4 L 22 2 L 22 2 L 22 2 L 22 2 L 22 1 L 22 1 L 22 1 L 21 1 L 21 1 L 21 1 L 21 0 L 21 0 L 20 0 L 20 0 L 20 0 L 20 0 L 19 0 L 18 0 L 18 0 L 18 0 L 18 0 L 18 0 L 17 0 L 17 0 L 17 1 L 17 1 L 17 1 L 16 1 L 16 1 L 16 1 L 16 2 L 16 2 L 16 2 L 16 2 L 16 4 L 10 4 L 10 2 L 10 2 L 10 2 L 10 2 L 10 1 L 10 1 L 10 1 L 9 1 L 9 1 L 9 1 L 9 0 L 9 0 L 8 0 L 8 0 L 8 0 L 8 0 L 8 0 L 7 0 L 6 0 L 6 0 L 6 0 L 6 0 L 5 0 L 5 0 L 5 1 L 5 1 L 5 1 L 4 1 L 4 1 L 4 1 L 4 2 L 4 2 L 4 2 L 4 2 L 4 4 L 2 4 L 2 4 L 1 4 L 1 4 L 1 5 L 0 5 L 0 5 L 0 6 L 0 6 L 0 26 L 0 26 L 0 27 L 0 27 L 1 27 L 1 28 L 1 28 L 2 28 L 2 28 L 24 28 L 24 28 L 25 28 L 25 28 L 25 27 L 26 27 L 26 27 L 26 26 L 26 26 L 26 6 L 26 6 L 26 5 L 26 5 L 25 5 Z M 18 2 L 18 2 L 18 2 L 18 2 L 18 2 L 19 2 L 20 2 L 20 2 L 20 2 L 20 2 L 20 7 L 20 7 L 20 7 L 20 7 L 19 7 L 18 7 L 18 7 L 18 7 L 18 7 L 18 7 L 18 2 Z M 6 2 L 6 2 L 6 2 L 6 2 L 7 2 L 8 2 L 8 2 L 8 2 L 8 2 L 8 2 L 8 7 L 8 7 L 8 7 L 8 7 L 8 7 L 7 7 L 6 7 L 6 7 L 6 7 L 6 7 L 6 2 Z M 24 26 L 2 26 L 2 10 L 24 10 L 24 26 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 76,
    "x": 1184,
    "y": 409,
    "width": 26,
    "height": 28,
    "text": "",
    "pathD": "M 25 5 L 25 4 L 25 4 L 24 4 L 24 4 L 22 4 L 22 2 L 22 2 L 22 2 L 22 2 L 22 1 L 22 1 L 22 1 L 21 1 L 21 1 L 21 1 L 21 0 L 21 0 L 20 0 L 20 0 L 20 0 L 20 0 L 20 0 L 18 0 L 18 0 L 18 0 L 18 0 L 18 0 L 17 0 L 17 0 L 17 1 L 17 1 L 17 1 L 16 1 L 16 1 L 16 1 L 16 2 L 16 2 L 16 2 L 16 2 L 16 4 L 10 4 L 10 2 L 10 2 L 10 2 L 10 2 L 10 1 L 10 1 L 10 1 L 9 1 L 9 1 L 9 1 L 9 0 L 9 0 L 8 0 L 8 0 L 8 0 L 8 0 L 7 0 L 6 0 L 6 0 L 6 0 L 6 0 L 6 0 L 5 0 L 5 0 L 5 1 L 5 1 L 5 1 L 4 1 L 4 1 L 4 1 L 4 2 L 4 2 L 4 2 L 4 2 L 4 4 L 2 4 L 2 4 L 1 4 L 1 4 L 1 5 L 0 5 L 0 5 L 0 6 L 0 6 L 0 26 L 0 26 L 0 27 L 0 27 L 1 27 L 1 28 L 1 28 L 2 28 L 2 28 L 24 28 L 24 28 L 25 28 L 25 28 L 25 27 L 26 27 L 26 27 L 26 26 L 26 26 L 26 6 L 26 6 L 26 5 L 26 5 L 25 5 Z M 6 26 L 2 26 L 2 21 L 6 21 L 6 26 Z M 6 21 L 2 21 L 2 15 L 6 15 L 6 21 Z M 6 15 L 2 15 L 2 10 L 6 10 L 6 15 Z M 6 7 L 6 7 L 6 7 L 6 2 L 6 2 L 6 2 L 6 2 L 6 2 L 7 2 L 8 2 L 8 2 L 8 2 L 8 2 L 8 7 L 8 7 L 8 7 L 8 7 L 7 7 L 6 7 L 6 7 L 6 7 Z M 12 26 L 7 26 L 7 21 L 12 21 L 12 26 Z M 12 21 L 7 21 L 7 15 L 12 15 L 12 21 Z M 12 15 L 7 15 L 7 10 L 12 10 L 12 15 Z M 18 26 L 14 26 L 14 21 L 18 21 L 18 26 Z M 18 21 L 14 21 L 14 15 L 18 15 L 18 21 Z M 18 15 L 14 15 L 14 10 L 18 10 L 18 15 Z M 18 7 L 18 7 L 18 7 L 18 2 L 18 2 L 18 2 L 18 2 L 18 2 L 20 2 L 20 2 L 20 2 L 20 2 L 20 2 L 20 7 L 20 7 L 20 7 L 20 7 L 20 7 L 18 7 L 18 7 L 18 7 Z M 24 26 L 20 26 L 20 21 L 24 21 L 24 26 Z M 24 21 L 20 21 L 20 15 L 24 15 L 24 21 Z M 24 15 L 20 15 L 20 10 L 24 10 L 24 15 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 69,
    "x": 487,
    "y": 411,
    "width": 31,
    "height": 25,
    "text": "",
    "pathD": "M 31 22 L 31 24 L 31 24 L 31 24 L 31 24 L 31 25 L 31 25 L 30 25 L 30 25 L 30 25 L 1 25 L 1 25 L 1 25 L 1 25 L 0 25 L 0 24 L 0 24 L 0 24 L 0 24 L 0 22 L 0 21 L 0 21 L 0 21 L 0 21 L 1 21 L 1 21 L 1 20 L 1 20 L 30 20 L 30 20 L 30 21 L 31 21 L 31 21 L 31 21 L 31 21 L 31 21 L 31 22 Z M 8 14 L 8 14 L 7 14 L 7 14 L 7 14 L 7 14 L 7 14 L 7 15 L 7 15 L 7 17 L 7 17 L 7 17 L 7 18 L 7 18 L 7 18 L 7 18 L 8 18 L 8 18 L 23 18 L 23 18 L 24 18 L 24 18 L 24 18 L 24 18 L 24 17 L 24 17 L 24 17 L 24 15 L 24 15 L 24 14 L 24 14 L 24 14 L 24 14 L 24 14 L 23 14 L 23 14 L 8 14 Z M 3 11 L 28 11 L 28 11 L 28 11 L 28 11 L 28 11 L 29 11 L 29 11 L 29 10 L 29 10 L 29 8 L 29 8 L 29 8 L 29 7 L 28 7 L 28 7 L 28 7 L 28 7 L 28 7 L 3 7 L 3 7 L 3 7 L 3 7 L 3 7 L 2 7 L 2 8 L 2 8 L 2 8 L 2 10 L 2 10 L 2 11 L 2 11 L 3 11 L 3 11 L 3 11 L 3 11 L 3 11 Z M 10 5 L 21 5 L 21 5 L 21 4 L 22 4 L 22 4 L 22 4 L 22 4 L 22 4 L 22 3 L 22 1 L 22 1 L 22 1 L 22 1 L 22 0 L 22 0 L 21 0 L 21 0 L 21 0 L 10 0 L 10 0 L 10 0 L 9 0 L 9 0 L 9 1 L 9 1 L 9 1 L 9 1 L 9 3 L 9 4 L 9 4 L 9 4 L 9 4 L 9 4 L 10 4 L 10 5 L 10 5 Z"
  },
  {
    "id": "grp-109",
    "isGroup": true,
    "children": [
      {
        "id": "sp-113",
        "x": 555,
        "y": 421.6363636363636,
        "width": 11.363636363636365,
        "height": 11.363636363636365,
        "localPctX": 0,
        "localPctY": 0.5454545454545451,
        "localPctW": 0.4545454545454546,
        "localPctH": 0.4545454545454546,
        "text": "",
        "pathD": "M 0 11 L 11 11 L 11 0 L 0 0 L 0 11 Z M 2 2 L 9 2 L 9 9 L 2 9 L 2 2 Z"
      },
      {
        "id": "sp-114",
        "x": 559.5454545454545,
        "y": 426.1818181818182,
        "width": 10,
        "height": 10,
        "localPctX": 0.18181818181818016,
        "localPctY": 0.7272727272727275,
        "localPctW": 0.09090909090909091,
        "localPctH": 0.09090909090909091,
        "text": ""
      },
      {
        "id": "sp-115",
        "x": 573.1818181818181,
        "y": 430.7272727272727,
        "width": 10,
        "height": 10,
        "localPctX": 0.7272727272727252,
        "localPctY": 0.9090909090909076,
        "localPctW": 0.09090909090909091,
        "localPctH": 0.09090909090909091,
        "text": ""
      },
      {
        "id": "sp-116",
        "x": 577.7272727272727,
        "y": 430.7272727272727,
        "width": 10,
        "height": 10,
        "localPctX": 0.90909090909091,
        "localPctY": 0.9090909090909076,
        "localPctW": 0.09090909090909091,
        "localPctH": 0.09090909090909091,
        "text": ""
      },
      {
        "id": "sp-117",
        "x": 568.6363636363636,
        "y": 421.6363636363636,
        "width": 11.363636363636365,
        "height": 11.363636363636365,
        "localPctX": 0.5454545454545451,
        "localPctY": 0.5454545454545451,
        "localPctW": 0.4545454545454546,
        "localPctH": 0.4545454545454546,
        "text": "",
        "pathD": "M 9 2 L 7 2 L 7 0 L 0 0 L 0 11 L 2 11 L 2 5 L 5 5 L 5 7 L 11 7 L 11 0 L 9 0 L 9 2 Z"
      },
      {
        "id": "sp-118",
        "x": 555,
        "y": 408,
        "width": 11.363636363636365,
        "height": 11.363636363636365,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.4545454545454546,
        "localPctH": 0.4545454545454546,
        "text": "",
        "pathD": "M 0 11 L 11 11 L 11 0 L 0 0 L 0 11 Z M 2 2 L 9 2 L 9 9 L 2 9 L 2 2 Z"
      },
      {
        "id": "sp-119",
        "x": 559.5454545454545,
        "y": 412.5454545454545,
        "width": 10,
        "height": 10,
        "localPctX": 0.18181818181818016,
        "localPctY": 0.18181818181818016,
        "localPctW": 0.09090909090909091,
        "localPctH": 0.09090909090909091,
        "text": ""
      },
      {
        "id": "sp-120",
        "x": 568.6363636363636,
        "y": 408,
        "width": 11.363636363636365,
        "height": 11.363636363636365,
        "localPctX": 0.5454545454545451,
        "localPctY": 0,
        "localPctW": 0.4545454545454546,
        "localPctH": 0.4545454545454546,
        "text": "",
        "pathD": "M 0 0 L 0 11 L 11 11 L 11 0 L 0 0 Z M 9 9 L 2 9 L 2 2 L 9 2 L 9 9 Z"
      },
      {
        "id": "sp-121",
        "x": 573.1818181818181,
        "y": 412.5454545454545,
        "width": 10,
        "height": 10,
        "localPctX": 0.7272727272727252,
        "localPctY": 0.18181818181818016,
        "localPctW": 0.09090909090909091,
        "localPctH": 0.09090909090909091,
        "text": ""
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 70,
    "x": 555,
    "y": 408,
    "width": 25,
    "height": 25
  },
  {
    "id": "grp-119",
    "isGroup": true,
    "children": [
      {
        "id": "sp-122",
        "x": 791,
        "y": 239.125,
        "width": 31,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.725,
        "localPctW": 1,
        "localPctH": 0.275,
        "text": "",
        "pathD": "M 30 0 L 1 0 L 1 0 L 1 0 L 1 0 L 0 0 L 0 1 L 0 1 L 0 1 L 0 1 L 0 6 L 0 6 L 0 6 L 0 6 L 0 7 L 1 7 L 1 7 L 1 7 L 1 7 L 30 7 L 30 7 L 30 7 L 31 7 L 31 7 L 31 6 L 31 6 L 31 6 L 31 6 L 31 1 L 31 1 L 31 1 L 31 1 L 31 0 L 31 0 L 30 0 L 30 0 L 30 0 Z M 29 5 L 18 5 L 18 2 L 29 2 L 29 5 Z"
      },
      {
        "id": "sp-123",
        "x": 791,
        "y": 230.375,
        "width": 31,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.375,
        "localPctW": 1,
        "localPctH": 0.275,
        "text": "",
        "pathD": "M 30 0 L 1 0 L 1 0 L 1 0 L 1 0 L 0 0 L 0 1 L 0 1 L 0 1 L 0 1 L 0 6 L 0 6 L 0 6 L 0 6 L 0 7 L 1 7 L 1 7 L 1 7 L 1 7 L 30 7 L 30 7 L 30 7 L 31 7 L 31 7 L 31 6 L 31 6 L 31 6 L 31 6 L 31 1 L 31 1 L 31 1 L 31 1 L 31 0 L 31 0 L 30 0 L 30 0 L 30 0 Z M 29 5 L 11 5 L 11 2 L 29 2 L 29 5 Z"
      },
      {
        "id": "sp-124",
        "x": 791,
        "y": 221,
        "width": 31,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.275,
        "text": "",
        "pathD": "M 31 0 L 31 0 L 30 0 L 30 0 L 30 0 L 1 0 L 1 0 L 1 0 L 1 0 L 0 0 L 0 1 L 0 1 L 0 1 L 0 1 L 0 6 L 0 6 L 0 6 L 0 6 L 0 7 L 1 7 L 1 7 L 1 7 L 1 7 L 30 7 L 30 7 L 30 7 L 31 7 L 31 7 L 31 6 L 31 6 L 31 6 L 31 6 L 31 1 L 31 1 L 31 1 L 31 1 L 31 0 Z M 29 5 L 22 5 L 22 2 L 29 2 L 29 5 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 29,
    "x": 791,
    "y": 221,
    "width": 31,
    "height": 25
  },
  {
    "id": "grp-123",
    "isGroup": true,
    "children": [
      {
        "id": "sp-125",
        "x": 700,
        "y": 417.25,
        "width": 16.5,
        "height": 10,
        "localPctX": 0.18181818181818182,
        "localPctY": 0.625,
        "localPctW": 0.5,
        "localPctH": 0.125,
        "text": "",
        "pathD": "M 17 2 L 0 0 L 0 4 L 16 5 L 17 2 Z"
      },
      {
        "id": "sp-126",
        "x": 700,
        "y": 424,
        "width": 16.5,
        "height": 10,
        "localPctX": 0.18181818181818182,
        "localPctY": 0.7857142857142857,
        "localPctW": 0.5,
        "localPctH": 0.08928571428571429,
        "text": "",
        "pathD": "M 17 0 L 0 0 L 0 4 L 17 4 L 17 0 Z"
      },
      {
        "id": "sp-127",
        "x": 703.75,
        "y": 402.25,
        "width": 15.75,
        "height": 11.25,
        "localPctX": 0.29545454545454547,
        "localPctY": 0.26785714285714285,
        "localPctW": 0.4772727272727273,
        "localPctH": 0.26785714285714285,
        "text": "",
        "pathD": "M 16 8 L 2 0 L 0 3 L 14 11 L 16 8 Z"
      },
      {
        "id": "sp-128",
        "x": 700.75,
        "y": 410.5,
        "width": 16.5,
        "height": 10,
        "localPctX": 0.20454545454545456,
        "localPctY": 0.4642857142857143,
        "localPctW": 0.5,
        "localPctH": 0.17857142857142858,
        "text": "",
        "pathD": "M 17 4 L 1 0 L 0 3 L 16 8 L 17 4 Z"
      },
      {
        "id": "sp-129",
        "x": 694,
        "y": 415.75,
        "width": 27,
        "height": 17.25,
        "localPctX": 0,
        "localPctY": 0.5892857142857143,
        "localPctW": 0.8181818181818182,
        "localPctH": 0.4107142857142857,
        "text": "",
        "pathD": "M 24 14 L 3 14 L 3 0 L 0 0 L 0 17 L 0 17 L 1 17 L 27 17 L 27 17 L 27 16 L 27 0 L 24 0 L 24 14 Z"
      },
      {
        "id": "sp-130",
        "x": 721,
        "y": 391,
        "width": 10,
        "height": 17.25,
        "localPctX": 0.8181818181818182,
        "localPctY": 0,
        "localPctW": 0.20454545454545456,
        "localPctH": 0.4107142857142857,
        "text": "",
        "pathD": "M 4 0 L 0 1 L 3 17 L 7 17 L 4 0 Z"
      },
      {
        "id": "sp-131",
        "x": 710.5,
        "y": 394,
        "width": 12,
        "height": 15.75,
        "localPctX": 0.5,
        "localPctY": 0.07142857142857142,
        "localPctW": 0.36363636363636365,
        "localPctH": 0.375,
        "text": "",
        "pathD": "M 0 2 L 9 16 L 12 14 L 3 0 L 0 2 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 694,
    "y": 391,
    "width": 33,
    "height": 42
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 841,
    "y": 399,
    "width": 39,
    "height": 37,
    "text": "",
    "pathD": "M 38 22 L 38 22 L 37 22 L 37 22 L 37 21 L 36 21 L 36 21 L 35 21 L 35 21 L 34 21 L 34 21 L 34 21 L 33 21 L 32 22 L 31 22 L 31 23 L 30 23 L 30 23 L 30 23 L 29 23 L 29 23 L 29 23 L 28 23 L 28 23 L 27 22 L 27 22 L 27 22 L 26 22 L 26 21 L 26 20 L 26 19 L 26 18 L 26 17 L 26 15 L 27 14 L 27 14 L 27 13 L 27 13 L 27 12 L 27 12 L 27 12 L 27 12 L 26 12 L 25 12 L 24 12 L 23 12 L 22 13 L 21 13 L 20 13 L 19 13 L 18 13 L 18 13 L 17 12 L 17 12 L 16 12 L 16 12 L 16 12 L 16 11 L 16 11 L 16 11 L 16 10 L 16 10 L 16 10 L 16 9 L 16 9 L 16 8 L 16 8 L 17 7 L 17 7 L 18 6 L 18 5 L 18 5 L 18 4 L 18 4 L 18 3 L 18 3 L 18 3 L 18 2 L 18 2 L 17 2 L 17 1 L 17 1 L 17 1 L 16 1 L 16 0 L 15 0 L 15 0 L 15 0 L 14 0 L 14 0 L 13 0 L 13 0 L 12 0 L 12 0 L 11 0 L 11 1 L 11 1 L 10 1 L 10 1 L 10 2 L 10 2 L 9 2 L 9 3 L 9 3 L 9 4 L 9 4 L 9 5 L 9 5 L 9 6 L 9 6 L 10 7 L 10 8 L 11 8 L 11 9 L 11 9 L 11 9 L 11 10 L 11 10 L 11 10 L 11 11 L 11 12 L 10 12 L 10 12 L 10 12 L 9 13 L 9 13 L 8 13 L 7 13 L 6 13 L 5 13 L 3 13 L 2 12 L 1 12 L 1 12 L 1 12 L 0 12 L 0 12 L 0 12 L 0 36 L 0 36 L 0 36 L 0 36 L 0 36 L 0 36 L 1 36 L 1 36 L 1 36 L 2 36 L 3 37 L 5 37 L 6 37 L 7 37 L 8 37 L 9 37 L 9 37 L 10 37 L 10 36 L 10 36 L 11 36 L 11 35 L 11 35 L 11 34 L 11 34 L 11 34 L 11 33 L 11 33 L 11 32 L 10 32 L 10 31 L 9 30 L 9 30 L 9 29 L 9 29 L 9 28 L 9 28 L 9 27 L 9 27 L 9 26 L 10 26 L 10 26 L 10 25 L 10 25 L 11 25 L 11 25 L 11 25 L 12 24 L 12 24 L 13 24 L 13 24 L 14 24 L 14 24 L 15 24 L 15 24 L 15 24 L 16 25 L 16 25 L 17 25 L 17 25 L 17 25 L 18 26 L 18 26 L 18 26 L 18 27 L 18 27 L 18 28 L 18 28 L 18 29 L 18 29 L 18 29 L 18 30 L 17 31 L 17 31 L 16 32 L 16 33 L 16 33 L 16 33 L 16 34 L 16 34 L 16 35 L 16 35 L 16 35 L 16 35 L 16 36 L 16 36 L 16 36 L 17 36 L 17 36 L 18 37 L 18 37 L 19 37 L 20 37 L 20 37 L 21 37 L 21 37 L 22 37 L 23 37 L 23 36 L 24 36 L 25 36 L 25 36 L 26 36 L 26 36 L 27 36 L 27 36 L 27 36 L 27 35 L 27 35 L 27 34 L 27 33 L 27 32 L 26 32 L 26 31 L 26 31 L 26 30 L 26 29 L 27 29 L 27 28 L 27 28 L 28 28 L 28 28 L 29 28 L 29 28 L 30 28 L 30 28 L 31 28 L 31 29 L 32 29 L 33 29 L 33 30 L 34 30 L 34 30 L 35 30 L 35 30 L 36 30 L 36 30 L 36 30 L 37 30 L 37 30 L 37 30 L 38 29 L 38 29 L 38 29 L 39 28 L 39 28 L 39 28 L 39 27 L 39 27 L 39 26 L 39 26 L 39 25 L 39 25 L 39 24 L 39 24 L 39 24 L 38 23 L 38 23 L 38 22 Z"
  },
  {
    "id": "grp-132",
    "isGroup": true,
    "children": [
      {
        "id": "sp-132",
        "x": 62,
        "y": 467.70909090909095,
        "width": 27.333333333333336,
        "height": 26.90909090909091,
        "localPctX": 0,
        "localPctY": 0.1272727272727283,
        "localPctW": 0.6666666666666667,
        "localPctH": 0.7272727272727273,
        "text": "",
        "pathD": "M 25 21 L 25 21 L 25 21 L 24 20 L 24 19 L 23 19 L 23 18 L 23 17 L 24 17 L 27 16 L 27 16 L 27 16 L 27 16 L 27 15 L 27 12 L 27 11 L 27 11 L 27 11 L 27 11 L 24 10 L 23 10 L 23 9 L 23 8 L 24 7 L 24 7 L 25 6 L 25 6 L 25 6 L 25 6 L 25 5 L 24 5 L 24 5 L 23 4 L 22 3 L 22 2 L 21 2 L 21 2 L 21 3 L 18 4 L 18 4 L 17 4 L 16 0 L 16 0 L 16 0 L 16 0 L 16 0 L 12 0 L 11 0 L 11 0 L 11 0 L 11 0 L 11 1 L 11 2 L 11 3 L 10 4 L 10 4 L 9 4 L 6 3 L 6 2 L 6 2 L 6 2 L 5 3 L 5 3 L 4 4 L 4 4 L 3 5 L 3 5 L 3 6 L 2 6 L 2 6 L 2 6 L 3 6 L 3 7 L 4 8 L 4 8 L 4 9 L 4 10 L 4 10 L 0 11 L 0 11 L 0 11 L 0 11 L 0 11 L 0 15 L 0 16 L 0 16 L 0 16 L 0 16 L 4 16 L 4 17 L 4 18 L 4 19 L 3 19 L 3 20 L 3 21 L 2 21 L 2 21 L 3 21 L 3 21 L 3 22 L 3 22 L 4 23 L 6 24 L 6 24 L 6 25 L 6 24 L 6 24 L 9 23 L 10 23 L 10 23 L 11 26 L 11 27 L 11 27 L 11 27 L 12 27 L 16 27 L 16 27 L 16 27 L 16 27 L 16 26 L 16 26 L 17 25 L 17 24 L 17 23 L 18 23 L 18 23 L 21 24 L 21 24 L 21 25 L 22 24 L 22 24 L 22 24 L 23 23 L 24 23 L 24 22 L 24 22 L 25 21 L 25 21 L 25 21 Z M 18 17 L 17 18 L 17 18 L 16 18 L 16 18 L 15 19 L 15 19 L 14 19 L 14 19 L 13 19 L 13 19 L 12 19 L 12 18 L 11 18 L 11 18 L 10 18 L 10 17 L 9 17 L 9 16 L 9 16 L 9 16 L 8 15 L 8 15 L 8 14 L 8 13 L 8 13 L 8 12 L 8 12 L 9 11 L 9 11 L 9 10 L 9 10 L 10 10 L 10 9 L 11 9 L 11 9 L 12 8 L 12 8 L 13 8 L 13 8 L 14 8 L 14 8 L 15 8 L 15 8 L 16 8 L 16 9 L 17 9 L 17 9 L 18 10 L 18 10 L 18 10 L 18 11 L 19 11 L 19 12 L 19 12 L 19 13 L 19 13 L 19 14 L 19 15 L 19 15 L 19 16 L 18 16 L 18 16 L 18 17 L 18 17 Z"
      },
      {
        "id": "sp-133",
        "x": 85.91666666666667,
        "y": 484.5272727272727,
        "width": 16.4,
        "height": 15.472727272727273,
        "localPctX": 0.5833333333333335,
        "localPctY": 0.5818181818181811,
        "localPctW": 0.39999999999999997,
        "localPctH": 0.41818181818181815,
        "text": "",
        "pathD": "M 13 6 L 13 5 L 13 5 L 13 3 L 13 3 L 14 2 L 14 2 L 14 2 L 14 1 L 12 1 L 12 0 L 11 0 L 11 0 L 11 0 L 10 0 L 10 1 L 9 2 L 9 2 L 8 2 L 8 2 L 8 2 L 8 2 L 7 2 L 6 1 L 6 0 L 5 0 L 5 0 L 5 0 L 4 1 L 4 1 L 3 1 L 3 1 L 3 2 L 3 2 L 3 2 L 3 3 L 3 3 L 4 5 L 3 5 L 3 6 L 2 6 L 1 6 L 0 6 L 0 6 L 0 6 L 0 6 L 0 9 L 0 9 L 0 9 L 0 9 L 1 10 L 2 10 L 3 10 L 3 10 L 4 11 L 3 12 L 3 13 L 3 14 L 3 14 L 3 14 L 3 14 L 4 15 L 5 15 L 5 15 L 5 15 L 6 15 L 6 15 L 6 15 L 6 15 L 7 14 L 8 13 L 8 13 L 8 13 L 8 13 L 9 13 L 9 14 L 10 15 L 10 15 L 11 15 L 11 15 L 11 15 L 11 15 L 12 15 L 12 15 L 14 14 L 14 14 L 14 14 L 14 14 L 13 13 L 13 12 L 13 11 L 13 10 L 13 10 L 15 10 L 16 10 L 16 9 L 16 9 L 16 9 L 16 9 L 16 6 L 16 6 L 16 6 L 16 6 L 16 6 L 15 6 L 13 6 Z M 10 10 L 10 10 L 9 10 L 9 10 L 8 10 L 8 10 L 7 10 L 7 10 L 6 10 L 6 9 L 6 9 L 6 8 L 5 8 L 6 7 L 6 7 L 6 6 L 6 6 L 7 6 L 7 5 L 8 5 L 8 5 L 9 5 L 9 5 L 10 6 L 10 6 L 11 6 L 11 7 L 11 7 L 11 8 L 11 8 L 11 9 L 11 9 L 10 10 Z"
      },
      {
        "id": "sp-134",
        "x": 85.91666666666667,
        "y": 463,
        "width": 16.4,
        "height": 15.472727272727273,
        "localPctX": 0.5833333333333335,
        "localPctY": 0,
        "localPctW": 0.39999999999999997,
        "localPctH": 0.41818181818181815,
        "text": "",
        "pathD": "M 13 6 L 13 5 L 13 5 L 13 3 L 13 3 L 14 2 L 14 2 L 14 2 L 14 1 L 12 1 L 12 0 L 11 0 L 11 0 L 11 0 L 10 0 L 10 1 L 9 2 L 9 2 L 8 2 L 8 2 L 8 2 L 8 2 L 7 2 L 6 1 L 6 0 L 5 0 L 5 0 L 5 0 L 4 1 L 4 1 L 3 1 L 3 1 L 3 2 L 3 2 L 3 2 L 3 3 L 3 3 L 4 5 L 3 5 L 3 6 L 2 6 L 1 6 L 0 6 L 0 6 L 0 6 L 0 6 L 0 9 L 0 9 L 0 9 L 0 9 L 1 10 L 2 10 L 3 10 L 3 10 L 4 11 L 3 12 L 3 13 L 3 13 L 3 14 L 3 14 L 3 14 L 4 15 L 5 15 L 5 15 L 5 15 L 6 15 L 6 15 L 6 15 L 6 14 L 7 14 L 8 13 L 8 13 L 8 13 L 8 13 L 9 13 L 9 14 L 10 14 L 10 15 L 11 15 L 11 15 L 11 15 L 11 15 L 12 15 L 12 15 L 14 14 L 14 14 L 14 14 L 14 13 L 13 13 L 13 12 L 13 11 L 13 10 L 13 10 L 15 10 L 16 10 L 16 9 L 16 9 L 16 9 L 16 9 L 16 6 L 16 6 L 16 6 L 16 6 L 16 6 L 15 6 L 13 6 Z M 10 10 L 10 10 L 9 10 L 9 10 L 8 10 L 8 10 L 7 10 L 7 10 L 6 10 L 6 9 L 6 9 L 6 8 L 5 8 L 6 7 L 6 7 L 6 6 L 6 6 L 7 5 L 7 5 L 8 5 L 8 5 L 9 5 L 9 5 L 10 5 L 10 6 L 11 6 L 11 7 L 11 7 L 11 8 L 11 8 L 11 9 L 11 9 L 10 10 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 62,
    "y": 463,
    "width": 41,
    "height": 37
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 77,
    "x": 132,
    "y": 463,
    "width": 33,
    "height": 29,
    "text": "",
    "pathD": "M 33 10 L 33 10 L 32 10 L 23 10 L 23 10 L 24 10 L 24 9 L 25 9 L 25 9 L 25 9 L 26 9 L 26 8 L 27 8 L 27 7 L 27 7 L 27 7 L 27 6 L 28 6 L 28 5 L 28 5 L 28 4 L 28 4 L 27 3 L 27 3 L 27 3 L 27 2 L 27 2 L 26 1 L 26 1 L 25 1 L 25 1 L 25 0 L 24 0 L 24 0 L 23 0 L 23 0 L 22 0 L 22 0 L 21 0 L 21 0 L 20 1 L 20 1 L 20 1 L 19 2 L 16 5 L 14 2 L 13 1 L 13 1 L 13 1 L 12 0 L 12 0 L 11 0 L 11 0 L 10 0 L 10 0 L 9 0 L 9 0 L 8 0 L 8 1 L 7 1 L 7 1 L 7 1 L 6 2 L 6 2 L 6 3 L 6 3 L 6 3 L 5 4 L 5 4 L 5 5 L 5 5 L 5 6 L 6 6 L 6 7 L 6 7 L 6 7 L 6 8 L 7 8 L 7 9 L 7 9 L 8 9 L 8 9 L 9 9 L 9 10 L 10 10 L 10 10 L 1 10 L 0 10 L 0 10 L 0 10 L 0 10 L 0 17 L 0 18 L 0 18 L 0 18 L 1 18 L 3 18 L 3 27 L 3 27 L 3 28 L 3 28 L 3 28 L 4 29 L 4 29 L 4 29 L 5 29 L 28 29 L 29 29 L 29 29 L 29 29 L 30 28 L 30 28 L 30 28 L 30 27 L 30 27 L 30 18 L 32 18 L 33 18 L 33 18 L 33 18 L 33 17 L 33 10 L 33 10 L 33 10 Z M 21 3 L 22 3 L 22 3 L 22 3 L 23 3 L 23 3 L 24 3 L 24 3 L 24 3 L 25 4 L 25 4 L 25 4 L 25 5 L 25 5 L 25 6 L 25 6 L 24 6 L 24 7 L 24 7 L 23 7 L 23 7 L 19 7 L 21 3 Z M 10 7 L 10 7 L 9 7 L 9 7 L 9 6 L 8 6 L 8 6 L 8 5 L 8 5 L 8 4 L 8 4 L 8 4 L 9 3 L 9 3 L 9 3 L 10 3 L 10 3 L 11 3 L 11 3 L 11 3 L 12 3 L 14 7 L 10 7 Z M 20 14 L 20 25 L 20 25 L 20 26 L 20 26 L 20 26 L 19 26 L 19 26 L 19 26 L 19 26 L 14 26 L 14 26 L 14 26 L 14 26 L 13 26 L 13 26 L 13 26 L 13 25 L 13 25 L 13 10 L 20 10 L 20 14 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 78,
    "x": 199,
    "y": 464,
    "width": 32,
    "height": 31,
    "text": "",
    "pathD": "M 28 22 L 28 22 L 29 22 L 29 23 L 29 23 L 30 23 L 30 23 L 30 23 L 30 23 L 31 23 L 31 22 L 32 22 L 32 22 L 32 21 L 32 21 L 32 21 L 32 20 L 31 20 L 30 19 L 30 18 L 29 18 L 29 18 L 28 17 L 28 16 L 27 16 L 26 15 L 26 15 L 26 15 L 26 15 L 25 15 L 25 15 L 25 15 L 24 16 L 24 16 L 24 16 L 23 17 L 23 17 L 24 17 L 24 17 L 24 18 L 24 18 L 25 18 L 25 19 L 25 19 L 26 19 L 24 21 L 17 14 L 18 13 L 18 13 L 19 12 L 19 11 L 19 10 L 19 9 L 19 8 L 20 7 L 20 6 L 19 6 L 19 5 L 19 4 L 19 4 L 18 3 L 18 3 L 18 2 L 17 2 L 17 1 L 16 1 L 15 1 L 15 0 L 14 0 L 13 0 L 13 0 L 12 0 L 11 0 L 10 0 L 10 1 L 9 1 L 8 1 L 7 1 L 7 2 L 6 2 L 5 3 L 5 3 L 4 4 L 3 5 L 3 5 L 2 6 L 2 7 L 1 7 L 1 8 L 1 9 L 1 10 L 0 10 L 0 11 L 0 12 L 0 13 L 0 14 L 0 14 L 0 15 L 1 16 L 1 16 L 1 17 L 2 17 L 2 18 L 3 18 L 3 19 L 4 19 L 4 19 L 5 20 L 6 20 L 6 20 L 7 20 L 8 20 L 9 20 L 10 20 L 11 19 L 11 19 L 12 19 L 13 18 L 14 17 L 27 30 L 27 31 L 27 31 L 28 31 L 28 31 L 28 31 L 29 31 L 29 31 L 30 30 L 30 30 L 30 29 L 30 29 L 30 29 L 30 28 L 30 28 L 30 28 L 30 27 L 26 23 L 27 21 L 28 21 L 28 22 Z M 15 10 L 15 10 L 14 11 L 14 11 L 14 11 L 13 11 L 13 11 L 13 11 L 12 11 L 12 11 L 11 11 L 11 11 L 11 11 L 11 11 L 11 12 L 11 12 L 11 12 L 11 13 L 11 13 L 11 14 L 11 14 L 11 14 L 10 15 L 10 15 L 10 15 L 10 15 L 9 16 L 9 16 L 9 16 L 8 16 L 8 16 L 8 16 L 7 16 L 7 16 L 7 16 L 6 16 L 6 16 L 6 16 L 5 16 L 5 15 L 5 15 L 5 15 L 4 15 L 4 14 L 4 14 L 4 14 L 4 13 L 4 13 L 4 12 L 4 12 L 4 12 L 4 11 L 4 11 L 4 11 L 4 10 L 5 10 L 5 10 L 5 10 L 5 9 L 6 9 L 6 9 L 6 9 L 7 9 L 7 9 L 7 9 L 8 9 L 8 9 L 9 9 L 9 9 L 9 9 L 9 8 L 9 8 L 9 8 L 9 7 L 9 7 L 9 6 L 9 6 L 9 6 L 9 5 L 9 5 L 10 5 L 10 5 L 10 4 L 11 4 L 11 4 L 11 4 L 11 4 L 12 4 L 12 4 L 13 4 L 13 4 L 13 4 L 14 4 L 14 4 L 14 4 L 15 5 L 15 5 L 15 5 L 15 5 L 15 6 L 16 6 L 16 6 L 16 7 L 16 7 L 16 8 L 16 8 L 16 8 L 16 9 L 16 9 L 15 9 L 15 10 L 15 10 L 15 10 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 81,
    "x": 489,
    "y": 464,
    "width": 35,
    "height": 30,
    "text": "",
    "pathD": "M 34 10 L 33 9 L 33 9 L 32 8 L 32 7 L 31 7 L 31 6 L 30 5 L 30 5 L 29 4 L 29 4 L 28 3 L 27 3 L 27 2 L 26 2 L 25 2 L 24 1 L 23 1 L 23 1 L 22 1 L 21 0 L 20 0 L 19 0 L 18 0 L 17 0 L 17 0 L 16 0 L 15 0 L 14 0 L 13 1 L 12 1 L 12 1 L 11 1 L 10 2 L 9 2 L 8 2 L 8 3 L 7 3 L 6 4 L 6 4 L 5 5 L 5 5 L 4 6 L 4 7 L 3 7 L 3 8 L 2 9 L 2 9 L 1 10 L 1 11 L 1 11 L 0 12 L 0 13 L 0 14 L 0 15 L 0 15 L 0 16 L 0 17 L 0 18 L 0 19 L 0 20 L 0 20 L 1 21 L 1 22 L 1 23 L 2 24 L 6 25 L 6 25 L 6 25 L 6 26 L 6 26 L 7 27 L 7 27 L 7 27 L 7 27 L 8 28 L 8 28 L 9 28 L 9 28 L 9 28 L 10 29 L 10 29 L 11 29 L 11 29 L 11 30 L 11 30 L 11 30 L 11 30 L 13 30 L 13 30 L 13 30 L 13 30 L 13 29 L 13 17 L 13 17 L 13 17 L 13 16 L 13 16 L 11 16 L 11 16 L 11 17 L 11 17 L 11 17 L 11 18 L 10 18 L 9 18 L 9 18 L 8 18 L 7 19 L 7 19 L 6 20 L 6 20 L 5 20 L 4 19 L 4 18 L 4 17 L 4 16 L 4 15 L 4 15 L 4 14 L 5 13 L 5 12 L 5 12 L 5 11 L 6 10 L 6 10 L 7 9 L 7 8 L 8 8 L 9 7 L 9 7 L 10 6 L 11 6 L 12 5 L 12 5 L 13 5 L 14 4 L 15 4 L 16 4 L 17 4 L 17 4 L 18 4 L 19 4 L 20 4 L 21 4 L 22 5 L 23 5 L 23 5 L 24 6 L 25 6 L 26 7 L 26 7 L 27 8 L 28 8 L 28 9 L 29 10 L 29 10 L 30 11 L 30 12 L 30 12 L 31 13 L 31 14 L 31 15 L 31 15 L 31 16 L 31 17 L 31 18 L 31 19 L 30 20 L 29 20 L 29 20 L 28 19 L 28 19 L 27 18 L 26 18 L 26 18 L 25 18 L 24 18 L 24 17 L 24 17 L 24 17 L 24 16 L 24 16 L 22 16 L 22 16 L 22 17 L 22 17 L 22 17 L 22 29 L 22 30 L 22 30 L 22 30 L 22 30 L 24 30 L 24 30 L 24 30 L 24 30 L 24 29 L 24 29 L 25 29 L 25 29 L 26 28 L 26 28 L 26 28 L 27 28 L 27 28 L 28 27 L 28 27 L 28 27 L 28 27 L 29 26 L 29 26 L 29 25 L 29 25 L 29 25 L 33 24 L 34 23 L 34 22 L 34 21 L 35 20 L 35 20 L 35 19 L 35 18 L 35 17 L 35 16 L 35 15 L 35 15 L 35 14 L 35 13 L 34 12 L 34 11 L 34 11 L 34 10 Z"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 82,
    "x": 551,
    "y": 461,
    "width": 33,
    "height": 35,
    "text": "",
    "pathD": "M 32 1 L 32 0 L 32 0 L 31 0 L 31 0 L 31 0 L 30 0 L 12 5 L 12 6 L 12 6 L 12 6 L 11 6 L 11 6 L 11 7 L 11 7 L 11 7 L 11 28 L 10 27 L 9 27 L 8 27 L 7 27 L 6 27 L 6 27 L 5 27 L 5 27 L 4 27 L 4 27 L 3 28 L 3 28 L 2 28 L 2 28 L 1 29 L 1 29 L 0 29 L 0 30 L 0 30 L 0 31 L 0 31 L 0 32 L 0 32 L 1 33 L 1 33 L 2 34 L 2 34 L 3 34 L 3 34 L 4 35 L 4 35 L 5 35 L 5 35 L 6 35 L 6 35 L 7 35 L 7 35 L 8 35 L 8 35 L 9 35 L 9 35 L 10 35 L 11 34 L 11 34 L 12 34 L 12 34 L 13 33 L 13 33 L 13 32 L 14 32 L 14 31 L 14 31 L 14 16 L 30 11 L 30 22 L 29 22 L 28 22 L 27 22 L 26 22 L 26 22 L 25 22 L 25 22 L 24 22 L 24 22 L 23 22 L 22 22 L 22 22 L 21 23 L 21 23 L 20 23 L 20 24 L 20 24 L 19 25 L 19 25 L 19 26 L 19 26 L 19 27 L 20 27 L 20 27 L 20 28 L 21 28 L 21 28 L 22 29 L 22 29 L 23 29 L 24 29 L 24 29 L 25 29 L 25 30 L 26 30 L 26 30 L 27 30 L 27 30 L 28 29 L 28 29 L 29 29 L 29 29 L 30 29 L 30 29 L 31 28 L 31 28 L 32 28 L 32 27 L 33 27 L 33 27 L 33 26 L 33 26 L 33 2 L 33 2 L 33 1 L 33 1 L 32 1 Z"
  },
  {
    "id": "grp-140",
    "isGroup": true,
    "children": [
      {
        "id": "sp-135",
        "x": 363,
        "y": 463,
        "width": 37,
        "height": 29,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 36 1 L 36 1 L 36 0 L 35 0 L 35 0 L 35 0 L 34 0 L 34 0 L 34 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 0 L 2 0 L 1 0 L 1 1 L 1 1 L 1 1 L 1 1 L 0 2 L 0 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 26 L 0 26 L 0 27 L 0 27 L 0 27 L 0 27 L 1 28 L 1 28 L 1 28 L 1 28 L 1 29 L 2 29 L 2 29 L 2 29 L 2 29 L 3 29 L 3 29 L 34 29 L 34 29 L 34 29 L 35 29 L 35 29 L 35 29 L 36 29 L 36 28 L 36 28 L 36 28 L 36 28 L 37 27 L 37 27 L 37 27 L 37 27 L 37 26 L 37 26 L 37 3 L 37 3 L 37 2 L 37 2 L 37 2 L 37 2 L 36 1 L 36 1 L 36 1 Z M 34 26 L 34 26 L 34 26 L 34 27 L 34 27 L 3 27 L 3 27 L 3 26 L 3 26 L 2 26 L 2 3 L 3 3 L 3 3 L 3 2 L 3 2 L 34 2 L 34 2 L 34 3 L 34 3 L 34 3 L 34 26 Z"
      },
      {
        "id": "sp-136",
        "x": 367.3166666666666,
        "y": 467.8333333333333,
        "width": 10,
        "height": 10,
        "localPctX": 0.11666666666666503,
        "localPctY": 0.16666666666666602,
        "localPctW": 0.2,
        "localPctH": 0.25,
        "text": "",
        "pathD": "M 4 7 L 4 7 L 4 7 L 5 7 L 5 7 L 5 7 L 6 7 L 6 6 L 6 6 L 7 6 L 7 6 L 7 5 L 7 5 L 7 5 L 7 4 L 7 4 L 7 4 L 7 3 L 7 3 L 7 3 L 7 2 L 7 2 L 7 2 L 7 1 L 6 1 L 6 1 L 6 1 L 5 0 L 5 0 L 5 0 L 4 0 L 4 0 L 4 0 L 3 0 L 3 0 L 3 0 L 2 0 L 2 0 L 2 1 L 1 1 L 1 1 L 1 1 L 1 2 L 0 2 L 0 2 L 0 3 L 0 3 L 0 3 L 0 4 L 0 4 L 0 4 L 0 5 L 0 5 L 0 5 L 1 6 L 1 6 L 1 6 L 1 6 L 2 7 L 2 7 L 2 7 L 3 7 L 3 7 L 3 7 L 4 7 Z"
      },
      {
        "id": "sp-137",
        "x": 367.3166666666666,
        "y": 470.85416666666663,
        "width": 27.133333333333333,
        "height": 16.3125,
        "localPctX": 0.11666666666666503,
        "localPctY": 0.27083333333333204,
        "localPctW": 0.7333333333333333,
        "localPctH": 0.5625,
        "text": "",
        "pathD": "M 9 10 L 6 7 L 0 13 L 0 16 L 27 16 L 27 8 L 19 0 L 9 10 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 79,
    "x": 363,
    "y": 463,
    "width": 37,
    "height": 29
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 80,
    "x": 427,
    "y": 463,
    "width": 37,
    "height": 30,
    "text": "",
    "pathD": "M 18 11 L 18 11 C 15 11, 13 13, 13 17 C 13 20, 15 22, 18 22 C 22 22, 24 20, 24 17 C 24 13, 22 11, 18 11 Z M 33 5 L 33 5 C 29 5, 29 5, 29 5 C 28 5, 28 5, 27 5 C 26 1, 26 1, 26 1 C 26 1, 25 0, 24 0 C 12 0, 12 0, 12 0 C 12 0, 11 1, 11 1 C 9 5, 9 5, 9 5 C 9 5, 9 5, 8 5 C 4 5, 4 5, 4 5 C 1 5, 0 7, 0 9 C 0 26, 0 26, 0 26 C 0 28, 1 30, 4 30 C 33 30, 33 30, 33 30 C 35 30, 37 28, 37 26 C 37 9, 37 9, 37 9 C 37 7, 35 5, 33 5 Z M 18 26 L 18 26 C 13 26, 9 22, 9 17 C 9 11, 13 7, 18 7 C 24 7, 28 11, 28 17 C 28 22, 24 26, 18 26 Z M 32 12 L 32 12 C 31 12, 30 11, 30 11 C 30 10, 31 9, 32 9 C 32 9, 33 10, 33 11 C 33 11, 32 12, 32 12 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 301,
    "y": 469,
    "width": 41,
    "height": 22,
    "text": "",
    "pathD": "M 38 3 L 37 3 L 36 2 L 35 1 L 34 1 L 33 1 L 32 0 L 31 0 L 30 0 L 11 0 L 10 0 L 9 0 L 8 1 L 7 1 L 6 1 L 5 2 L 4 3 L 3 3 L 2 4 L 2 5 L 1 6 L 1 7 L 0 8 L 0 9 L 0 10 L 0 11 L 0 12 L 0 13 L 0 14 L 1 15 L 1 16 L 2 17 L 2 18 L 3 19 L 4 20 L 5 20 L 6 21 L 7 21 L 8 22 L 9 22 L 10 22 L 11 22 L 12 22 L 13 22 L 14 22 L 15 21 L 16 21 L 17 20 L 17 20 L 18 19 L 23 19 L 24 20 L 24 20 L 25 21 L 26 21 L 27 22 L 28 22 L 29 22 L 30 22 L 31 22 L 32 22 L 33 22 L 34 21 L 35 21 L 36 20 L 37 20 L 38 19 L 39 18 L 39 17 L 40 16 L 40 15 L 41 14 L 41 13 L 41 12 L 41 11 L 41 10 L 41 9 L 41 8 L 40 7 L 40 6 L 39 5 L 39 4 L 38 3 Z M 18 12 L 18 13 L 18 13 L 17 13 L 17 13 L 13 13 L 13 17 L 13 17 L 13 18 L 13 18 L 12 18 L 10 18 L 9 18 L 9 18 L 9 17 L 9 17 L 9 13 L 5 13 L 4 13 L 4 13 L 4 13 L 4 12 L 4 10 L 4 9 L 4 9 L 4 9 L 5 9 L 9 9 L 9 5 L 9 5 L 9 4 L 9 4 L 10 4 L 12 4 L 13 4 L 13 4 L 13 5 L 13 5 L 13 9 L 17 9 L 17 9 L 18 9 L 18 9 L 18 10 L 18 12 Z M 29 16 L 29 16 L 28 16 L 28 16 L 27 17 L 27 16 L 26 16 L 26 16 L 25 16 L 25 15 L 25 15 L 25 14 L 25 14 L 25 13 L 25 13 L 25 12 L 25 12 L 26 11 L 26 11 L 27 11 L 27 11 L 28 11 L 28 11 L 29 11 L 29 12 L 30 12 L 30 13 L 30 13 L 30 14 L 30 14 L 30 15 L 30 15 L 29 16 Z M 35 10 L 34 11 L 34 11 L 33 11 L 33 11 L 32 11 L 32 11 L 31 11 L 31 10 L 31 10 L 30 9 L 30 9 L 30 8 L 30 8 L 30 7 L 31 7 L 31 6 L 31 6 L 32 6 L 32 6 L 33 6 L 33 6 L 34 6 L 34 6 L 35 6 L 35 7 L 35 7 L 35 8 L 36 8 L 35 9 L 35 9 L 35 10 L 35 10 Z"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 83,
    "x": 618,
    "y": 458,
    "width": 33,
    "height": 33,
    "text": "",
    "pathD": "M 33 1 L 33 1 L 32 0 L 32 0 L 32 0 L 2 0 L 1 0 L 1 0 L 0 1 L 0 1 L 0 1 L 0 2 L 0 2 L 0 2 L 0 2 L 0 2 L 0 3 L 12 14 L 12 25 L 12 26 L 12 26 L 12 26 L 12 27 L 18 33 L 19 33 L 19 33 L 19 33 L 19 33 L 20 33 L 20 33 L 20 33 L 21 32 L 21 32 L 21 31 L 21 14 L 33 3 L 33 2 L 33 2 L 33 2 L 33 2 L 33 2 L 33 1 L 33 1 L 33 1 Z"
  },
  {
    "id": "grp-147",
    "isGroup": true,
    "children": [
      {
        "id": "sp-138",
        "x": 70.1025641025641,
        "y": 147,
        "width": 35.8974358974359,
        "height": 35.8974358974359,
        "localPctX": -0.02564102564102565,
        "localPctY": 0,
        "localPctW": 1.0256410256410255,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 35 31 L 31 27 C 31 27, 30 27, 30 27 C 30 27, 30 27, 30 27 L 30 30 L 7 30 L 7 7 L 9 7 C 9 7, 9 7, 9 7 C 9 7, 10 6, 10 6 C 10 6, 9 5, 9 5 L 6 1 C 5 0, 5 0, 4 1 L 1 5 C 1 6, 1 6, 1 6 C 1 6, 1 7, 1 7 L 4 7 L 4 31 C 4 32, 4 33, 5 33 L 30 33 L 30 35 C 30 35, 30 36, 30 36 C 30 36, 30 36, 30 36 C 31 36, 31 36, 31 36 L 35 32 C 36 32, 36 31, 36 31 C 36 31, 36 31, 35 31 Z"
      },
      {
        "id": "sp-139",
        "x": 79.07692307692308,
        "y": 167.64102564102566,
        "width": 19.743589743589745,
        "height": 10,
        "localPctX": 0.23076923076923087,
        "localPctY": 0.5897435897435904,
        "localPctW": 0.5641025641025641,
        "localPctH": 0.15384615384615385,
        "text": "",
        "pathD": "M 1 3 C 1 4, 2 5, 3 5 L 17 5 C 19 5, 20 4, 20 3 C 20 2, 19 1, 17 1 L 3 1 C 2 1, 1 2, 1 3 Z"
      },
      {
        "id": "sp-140",
        "x": 79.07692307692308,
        "y": 161.35897435897436,
        "width": 12.564102564102564,
        "height": 10,
        "localPctX": 0.23076923076923087,
        "localPctY": 0.4102564102564104,
        "localPctW": 0.358974358974359,
        "localPctH": 0.15384615384615385,
        "text": "",
        "pathD": "M 3 5 L 10 5 C 11 5, 12 4, 12 3 C 12 2, 11 1, 10 1 L 3 1 C 2 1, 1 2, 1 3 C 1 4, 2 5, 3 5 Z"
      },
      {
        "id": "sp-141",
        "x": 79.07692307692308,
        "y": 155.97435897435898,
        "width": 16.153846153846153,
        "height": 10,
        "localPctX": 0.23076923076923087,
        "localPctY": 0.2564102564102565,
        "localPctW": 0.4615384615384615,
        "localPctH": 0.15384615384615385,
        "text": "",
        "pathD": "M 1 3 C 1 4, 2 5, 3 5 L 14 5 C 15 5, 16 4, 16 3 C 16 2, 15 1, 14 1 L 3 1 C 2 1, 1 2, 1 3 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 71,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-152",
    "isGroup": true,
    "children": [
      {
        "id": "sp-142",
        "x": 136.1025641025641,
        "y": 178.41025641025644,
        "width": 35.8974358974359,
        "height": 10,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.8974358974358982,
        "localPctW": 1.0256410256410255,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 34 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 L 34 4 C 35 4, 36 3, 36 2 C 36 1, 35 1, 34 1 Z"
      },
      {
        "id": "sp-143",
        "x": 138.7948717948718,
        "y": 158.66666666666669,
        "width": 32.30769230769231,
        "height": 19.743589743589745,
        "localPctX": 0.0512820512820513,
        "localPctY": 0.33333333333333387,
        "localPctW": 0.923076923076923,
        "localPctH": 0.5641025641025641,
        "text": "",
        "pathD": "M 2 16 C 1 16, 1 17, 1 18 C 1 19, 1 19, 2 19 L 30 19 C 31 19, 32 19, 32 18 C 32 17, 31 16, 30 16 L 30 16 L 30 2 L 30 2 C 31 2, 31 2, 31 1 C 31 1, 31 1, 30 1 L 2 1 C 2 1, 1 1, 1 1 C 1 2, 2 2, 2 2 L 3 2 L 3 16 L 2 16 Z M 27 2 L 27 16 L 22 16 L 22 2 L 27 2 Z M 19 2 L 19 16 L 14 16 L 14 2 L 19 2 Z M 6 2 L 11 2 L 11 16 L 6 16 L 6 2 Z"
      },
      {
        "id": "sp-144",
        "x": 136.1025641025641,
        "y": 147,
        "width": 35.8974358974359,
        "height": 10.76923076923077,
        "localPctX": -0.025641025641026056,
        "localPctY": 0,
        "localPctW": 1.0256410256410255,
        "localPctH": 0.3076923076923077,
        "text": "",
        "pathD": "M 2 11 L 34 11 C 34 11, 34 11, 34 11 C 35 11, 36 10, 36 9 C 36 8, 35 8, 35 8 L 19 1 C 18 0, 18 0, 17 1 L 2 8 C 1 8, 0 9, 1 9 C 1 10, 1 11, 2 11 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 137,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-156",
    "isGroup": true,
    "children": [
      {
        "id": "sp-145",
        "x": 210.07692307692307,
        "y": 161.35897435897436,
        "width": 10,
        "height": 10.76923076923077,
        "localPctX": 0.23076923076923045,
        "localPctY": 0.4102564102564104,
        "localPctW": 0.15384615384615385,
        "localPctH": 0.3076923076923077,
        "text": "",
        "pathD": "M 1 3 L 1 9 C 1 10, 2 11, 3 11 C 4 11, 5 10, 5 9 L 5 3 C 5 2, 4 1, 3 1 C 2 1, 1 2, 1 3 Z"
      },
      {
        "id": "sp-146",
        "x": 215.46153846153845,
        "y": 159.56410256410257,
        "width": 10,
        "height": 12.564102564102564,
        "localPctX": 0.38461538461538436,
        "localPctY": 0.35897435897435914,
        "localPctW": 0.15384615384615385,
        "localPctH": 0.358974358974359,
        "text": "",
        "pathD": "M 1 3 L 1 10 C 1 12, 2 13, 3 13 C 4 13, 5 12, 5 10 L 5 3 C 5 2, 4 1, 3 1 C 2 1, 1 2, 1 3 Z"
      },
      {
        "id": "sp-147",
        "x": 220.84615384615384,
        "y": 156.8717948717949,
        "width": 10,
        "height": 15.256410256410257,
        "localPctX": 0.5384615384615383,
        "localPctY": 0.28205128205128255,
        "localPctW": 0.15384615384615385,
        "localPctH": 0.4358974358974359,
        "text": "",
        "pathD": "M 1 3 L 1 13 C 1 14, 2 15, 3 15 C 4 15, 5 14, 5 13 L 5 3 C 5 2, 4 1, 3 1 C 2 1, 1 2, 1 3 Z"
      },
      {
        "id": "sp-148",
        "x": 201.1025641025641,
        "y": 147.8974358974359,
        "width": 35.8974358974359,
        "height": 32.30769230769231,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.025641025641026056,
        "localPctW": 1.0256410256410255,
        "localPctH": 0.923076923076923,
        "text": "",
        "pathD": "M 36 14 C 36 14, 35 14, 35 14 L 33 14 C 31 6, 25 1, 17 1 C 8 1, 1 8, 1 17 C 1 25, 8 32, 17 32 C 23 32, 28 29, 31 24 C 31 24, 31 23, 30 23 C 30 22, 29 22, 28 23 C 26 27, 22 30, 17 30 C 9 30, 4 24, 4 17 C 4 9, 9 3, 17 3 C 23 3, 28 8, 30 14 L 28 14 C 27 14, 27 14, 27 14 C 27 14, 27 15, 27 15 L 31 19 C 31 19, 31 19, 31 19 C 31 19, 32 19, 32 19 L 36 15 C 36 15, 36 14, 36 14 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 202,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-161",
    "isGroup": true,
    "children": [
      {
        "id": "sp-149",
        "x": 266.10256410256414,
        "y": 161.35897435897436,
        "width": 10,
        "height": 21.53846153846154,
        "localPctX": -0.025641025641024433,
        "localPctY": 0.4102564102564104,
        "localPctW": 0.23076923076923075,
        "localPctH": 0.6153846153846154,
        "text": "",
        "pathD": "M 6 1 L 2 1 C 1 1, 1 1, 1 2 L 1 20 C 1 20, 1 21, 2 21 L 6 21 C 7 21, 8 20, 8 20 L 8 2 C 8 1, 7 1, 6 1 Z"
      },
      {
        "id": "sp-150",
        "x": 275.0769230769231,
        "y": 165.84615384615387,
        "width": 10,
        "height": 16.153846153846153,
        "localPctX": 0.23076923076923128,
        "localPctY": 0.5384615384615391,
        "localPctW": 0.23076923076923075,
        "localPctH": 0.4615384615384615,
        "text": "",
        "pathD": "M 6 1 L 2 1 C 1 1, 1 1, 1 2 L 1 15 C 1 16, 1 16, 2 16 L 6 16 C 7 16, 8 16, 8 15 L 8 2 C 8 1, 7 1, 6 1 Z"
      },
      {
        "id": "sp-151",
        "x": 284.94871794871796,
        "y": 165.84615384615387,
        "width": 10,
        "height": 16.153846153846153,
        "localPctX": 0.512820512820513,
        "localPctY": 0.5384615384615391,
        "localPctW": 0.23076923076923075,
        "localPctH": 0.4615384615384615,
        "text": "",
        "pathD": "M 6 1 L 2 1 C 1 1, 1 1, 1 2 L 1 15 C 1 16, 1 16, 2 16 L 6 16 C 7 16, 8 16, 8 15 L 8 2 C 8 1, 7 1, 6 1 Z"
      },
      {
        "id": "sp-152",
        "x": 293.92307692307696,
        "y": 161.35897435897436,
        "width": 10,
        "height": 21.53846153846154,
        "localPctX": 0.7692307692307704,
        "localPctY": 0.4102564102564104,
        "localPctW": 0.23076923076923075,
        "localPctH": 0.6153846153846154,
        "text": "",
        "pathD": "M 6 1 L 2 1 C 1 1, 1 1, 1 2 L 1 20 C 1 20, 1 21, 2 21 L 6 21 C 7 21, 8 20, 8 20 L 8 2 C 8 1, 7 1, 6 1 Z"
      },
      {
        "id": "sp-153",
        "x": 284.0512820512821,
        "y": 155.97435897435898,
        "width": 10,
        "height": 10,
        "localPctX": 0.4871794871794886,
        "localPctY": 0.2564102564102565,
        "localPctW": 0.05128205128205129,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 0 1 L 0 3 C 1 3, 2 3, 2 2 C 2 1, 1 1, 0 1 Z"
      },
      {
        "id": "sp-154",
        "x": 281.35897435897436,
        "y": 151.4871794871795,
        "width": 10,
        "height": 10,
        "localPctX": 0.4102564102564104,
        "localPctY": 0.12820512820512867,
        "localPctW": 0.05128205128205129,
        "localPctH": 0.07692307692307693,
        "text": "",
        "pathD": "M 0 2 C 0 2, 1 3, 2 3 L 2 1 C 1 1, 0 1, 0 2 Z"
      },
      {
        "id": "sp-155",
        "x": 275.0769230769231,
        "y": 147,
        "width": 18.846153846153847,
        "height": 17.94871794871795,
        "localPctX": 0.23076923076923128,
        "localPctY": 0,
        "localPctW": 0.5384615384615384,
        "localPctH": 0.5128205128205128,
        "text": "",
        "pathD": "M 9 1 C 5 1, 1 5, 1 9 C 1 14, 5 18, 9 18 C 14 18, 18 14, 18 9 C 18 5, 14 1, 9 1 Z M 10 15 L 10 15 C 10 16, 10 16, 9 16 C 9 16, 9 16, 9 15 L 9 15 C 7 14, 5 13, 5 12 C 5 11, 6 11, 6 11 C 8 11, 7 13, 9 13 L 9 10 C 7 10, 6 9, 6 7 C 6 5, 7 4, 9 4 L 9 3 C 9 3, 9 3, 9 3 C 10 3, 10 3, 10 3 L 10 4 C 11 4, 13 5, 13 6 C 13 7, 13 7, 12 7 C 11 7, 12 6, 10 6 L 10 8 C 12 9, 14 9, 14 11 C 14 13, 12 14, 10 15 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 267,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-169",
    "isGroup": true,
    "children": [
      {
        "id": "sp-156",
        "x": 336.4871794871795,
        "y": 151.4871794871795,
        "width": 10,
        "height": 10,
        "localPctX": 0.12820512820512867,
        "localPctY": 0.12820512820512867,
        "localPctW": 0.2564102564102564,
        "localPctH": 0.2564102564102564,
        "text": "",
        "pathD": "M 9 7 L 7 5 C 7 5, 7 4, 7 4 C 7 2, 5 1, 4 1 C 2 1, 1 2, 1 4 C 1 5, 2 7, 4 7 C 4 7, 5 7, 5 6 L 8 8 C 8 8, 8 8, 9 7 Z"
      },
      {
        "id": "sp-157",
        "x": 351.7435897435897,
        "y": 147,
        "width": 10,
        "height": 11.666666666666668,
        "localPctX": 0.5641025641025635,
        "localPctY": 0,
        "localPctW": 0.2564102564102564,
        "localPctH": 0.33333333333333337,
        "text": "",
        "pathD": "M 2 11 L 5 7 C 5 7, 5 7, 6 7 C 7 7, 9 5, 9 4 C 9 2, 7 1, 6 1 C 4 1, 2 2, 2 4 C 2 4, 3 5, 3 6 L 1 10 C 1 11, 2 11, 2 11 Z"
      },
      {
        "id": "sp-158",
        "x": 356.2307692307692,
        "y": 162.25641025641028,
        "width": 10.76923076923077,
        "height": 10,
        "localPctX": 0.6923076923076922,
        "localPctY": 0.43589743589743646,
        "localPctW": 0.3076923076923077,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 7 1 C 6 1, 5 1, 4 2 L 1 2 C 1 2, 1 2, 1 2 C 1 3, 1 3, 1 4 L 4 4 C 5 5, 6 6, 7 6 C 9 6, 10 5, 10 3 C 10 2, 9 1, 7 1 Z"
      },
      {
        "id": "sp-159",
        "x": 349.05128205128204,
        "y": 171.23076923076925,
        "width": 10,
        "height": 10.76923076923077,
        "localPctX": 0.48717948717948695,
        "localPctY": 0.692307692307693,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.3076923076923077,
        "text": "",
        "pathD": "M 4 4 L 3 1 C 2 1, 2 1, 1 1 L 2 5 C 1 5, 1 6, 1 7 C 1 9, 2 10, 3 10 C 5 10, 6 9, 6 7 C 6 6, 5 4, 4 4 Z"
      },
      {
        "id": "sp-160",
        "x": 331.1025641025641,
        "y": 165.84615384615387,
        "width": 11.666666666666668,
        "height": 10,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.5384615384615391,
        "localPctW": 0.33333333333333337,
        "localPctH": 0.20512820512820515,
        "text": "",
        "pathD": "M 11 1 L 6 2 C 6 1, 5 1, 4 1 C 2 1, 1 2, 1 4 C 1 5, 2 7, 4 7 C 5 7, 7 5, 7 4 C 7 4, 7 4, 7 4 L 12 2 C 11 2, 11 1, 11 1 Z"
      },
      {
        "id": "sp-161",
        "x": 343.6666666666667,
        "y": 158.66666666666669,
        "width": 11.666666666666668,
        "height": 11.666666666666668,
        "localPctX": 0.33333333333333387,
        "localPctY": 0.33333333333333387,
        "localPctW": 0.33333333333333337,
        "localPctH": 0.33333333333333337,
        "text": "",
        "pathD": "M 11 6 C 11 9, 9 11, 6 11 C 3 11, 1 9, 1 6 C 1 3, 3 1, 6 1 C 9 1, 11 3, 11 6 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 332,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-176",
    "isGroup": true,
    "children": [
      {
        "id": "sp-162",
        "x": 396.1025641025641,
        "y": 163.15384615384616,
        "width": 10,
        "height": 18.846153846153847,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.46153846153846173,
        "localPctW": 0.20512820512820515,
        "localPctH": 0.5384615384615384,
        "text": "",
        "pathD": "M 6 1 L 2 1 C 1 1, 1 1, 1 2 L 1 17 C 1 18, 1 19, 2 19 L 6 19 C 7 19, 7 18, 7 17 L 7 2 C 7 1, 7 1, 6 1 Z"
      },
      {
        "id": "sp-163",
        "x": 405.07692307692304,
        "y": 168.53846153846155,
        "width": 10,
        "height": 14.35897435897436,
        "localPctX": 0.23076923076922964,
        "localPctY": 0.6153846153846156,
        "localPctW": 0.20512820512820515,
        "localPctH": 0.4102564102564103,
        "text": "",
        "pathD": "M 6 1 L 2 1 C 1 1, 1 1, 1 2 L 1 13 C 1 14, 1 14, 2 14 L 6 14 C 7 14, 7 14, 7 13 L 7 2 C 7 1, 7 1, 6 1 Z"
      },
      {
        "id": "sp-164",
        "x": 414.94871794871796,
        "y": 168.53846153846155,
        "width": 10,
        "height": 14.35897435897436,
        "localPctX": 0.512820512820513,
        "localPctY": 0.6153846153846156,
        "localPctW": 0.20512820512820515,
        "localPctH": 0.4102564102564103,
        "text": "",
        "pathD": "M 6 1 L 2 1 C 1 1, 1 1, 1 2 L 1 13 C 1 14, 1 14, 2 14 L 6 14 C 7 14, 7 14, 7 13 L 7 2 C 7 1, 7 1, 6 1 Z"
      },
      {
        "id": "sp-165",
        "x": 423.9230769230769,
        "y": 163.15384615384616,
        "width": 10,
        "height": 18.846153846153847,
        "localPctX": 0.7692307692307687,
        "localPctY": 0.46153846153846173,
        "localPctW": 0.20512820512820515,
        "localPctH": 0.5384615384615384,
        "text": "",
        "pathD": "M 6 1 L 2 1 C 1 1, 1 1, 1 2 L 1 17 C 1 18, 1 19, 2 19 L 6 19 C 7 19, 7 18, 7 17 L 7 2 C 7 1, 7 1, 6 1 Z"
      },
      {
        "id": "sp-166",
        "x": 401.48717948717945,
        "y": 147.8974358974359,
        "width": 21.53846153846154,
        "height": 18.846153846153847,
        "localPctX": 0.12820512820512703,
        "localPctY": 0.025641025641026056,
        "localPctW": 0.6153846153846154,
        "localPctH": 0.5384615384615384,
        "text": "",
        "pathD": "M 17 2 C 17 2, 16 2, 16 2 L 12 1 C 10 0, 9 1, 9 1 C 8 2, 8 2, 8 2 L 6 7 C 6 7, 6 8, 6 8 C 6 8, 7 9, 8 9 C 8 9, 9 9, 9 8 C 9 8, 10 8, 10 8 L 10 7 C 10 6, 11 6, 11 6 C 11 5, 12 6, 12 6 C 13 7, 18 12, 18 12 C 18 12, 18 13, 18 13 C 18 13, 17 13, 17 13 L 16 12 C 15 11, 15 11, 15 12 C 15 12, 15 12, 15 12 L 16 14 C 17 14, 17 14, 16 15 C 16 15, 16 15, 16 15 L 14 13 C 14 13, 14 13, 13 13 C 13 13, 13 14, 13 14 L 15 15 C 15 16, 15 16, 15 16 C 15 16, 14 17, 14 16 L 13 15 C 12 15, 12 15, 12 15 C 12 15, 12 15, 12 16 L 13 17 C 14 17, 13 18, 13 18 C 13 18, 13 18, 12 18 L 11 16 C 11 16, 11 15, 10 15 C 10 14, 9 14, 9 15 C 9 14, 9 14, 9 13 C 8 13, 8 13, 7 13 C 8 13, 8 12, 7 12 C 7 11, 6 11, 6 11 C 6 11, 6 10, 6 10 C 5 10, 5 9, 4 10 L 1 7 C 1 7, 1 7, 1 7 C 1 7, 1 7, 1 7 L 4 10 L 3 11 C 2 12, 2 12, 3 13 C 3 13, 4 13, 4 13 C 4 13, 4 14, 4 14 C 5 15, 6 15, 6 15 C 6 15, 6 16, 6 16 C 6 16, 7 17, 7 16 C 7 17, 7 17, 8 18 C 8 18, 9 18, 9 18 L 10 17 L 12 19 C 12 19, 13 19, 14 19 C 14 18, 14 18, 14 17 C 15 17, 15 17, 15 17 C 16 17, 16 16, 16 16 C 16 16, 17 16, 17 15 C 17 15, 18 15, 18 14 C 18 14, 18 14, 19 14 C 19 13, 19 12, 19 12 L 18 11 L 21 8 C 21 7, 21 7, 21 7 L 17 2 Z"
      },
      {
        "id": "sp-167",
        "x": 417.64102564102564,
        "y": 147,
        "width": 10,
        "height": 10,
        "localPctX": 0.5897435897435895,
        "localPctY": 0,
        "localPctW": 0.23076923076923075,
        "localPctH": 0.23076923076923075,
        "text": "",
        "pathD": "M 8 5 L 4 1 C 3 0, 3 0, 2 1 L 1 2 C 0 3, 0 3, 1 4 L 5 8 C 5 8, 6 8, 6 8 L 8 6 C 8 6, 8 5, 8 5 Z M 5 7 C 5 7, 5 6, 5 6 C 5 6, 5 5, 5 5 C 6 5, 6 6, 6 6 C 6 6, 6 7, 5 7 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 397,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-183",
    "isGroup": true,
    "children": [
      {
        "id": "sp-168",
        "x": 463.8974358974359,
        "y": 171.23076923076925,
        "width": 10,
        "height": 10.76923076923077,
        "localPctX": 0.025641025641026056,
        "localPctY": 0.692307692307693,
        "localPctW": 0.2564102564102564,
        "localPctH": 0.3076923076923077,
        "text": "",
        "pathD": "M 7 1 L 2 1 C 1 1, 1 1, 1 2 L 1 9 C 1 10, 1 11, 2 11 L 7 11 C 8 11, 9 10, 9 9 L 9 2 C 9 1, 8 1, 7 1 Z"
      },
      {
        "id": "sp-169",
        "x": 475.5641025641026,
        "y": 165.84615384615387,
        "width": 10,
        "height": 16.153846153846153,
        "localPctX": 0.3589743589743599,
        "localPctY": 0.5384615384615391,
        "localPctW": 0.2564102564102564,
        "localPctH": 0.4615384615384615,
        "text": "",
        "pathD": "M 7 1 L 2 1 C 1 1, 1 1, 1 2 L 1 15 C 1 16, 1 16, 2 16 L 7 16 C 8 16, 9 16, 9 15 L 9 2 C 9 1, 8 1, 7 1 Z"
      },
      {
        "id": "sp-170",
        "x": 488.12820512820514,
        "y": 159.56410256410257,
        "width": 10,
        "height": 23.333333333333336,
        "localPctX": 0.7179487179487183,
        "localPctY": 0.35897435897435914,
        "localPctW": 0.2564102564102564,
        "localPctH": 0.6666666666666667,
        "text": "",
        "pathD": "M 7 1 L 2 1 C 1 1, 1 1, 1 2 L 1 21 C 1 22, 1 23, 2 23 L 7 23 C 8 23, 9 22, 9 21 L 9 2 C 9 1, 8 1, 7 1 Z"
      },
      {
        "id": "sp-171",
        "x": 490.8205128205129,
        "y": 147,
        "width": 10,
        "height": 10,
        "localPctX": 0.7948717948717964,
        "localPctY": 0,
        "localPctW": 0.07692307692307693,
        "localPctH": 0.07692307692307693,
        "text": "",
        "pathD": "M 3 2 C 3 2, 2 3, 2 3 C 1 3, 1 2, 1 2 C 1 1, 1 1, 2 1 C 2 1, 3 1, 3 2 Z"
      },
      {
        "id": "sp-172",
        "x": 487.2307692307693,
        "y": 147,
        "width": 10,
        "height": 11.666666666666668,
        "localPctX": 0.6923076923076938,
        "localPctY": 0,
        "localPctW": 0.28205128205128205,
        "localPctH": 0.33333333333333337,
        "text": "",
        "pathD": "M 10 1 C 10 1, 9 0, 9 1 L 6 3 L 6 3 C 6 3, 6 3, 5 3 L 6 5 L 5 5 L 5 5 L 5 3 C 5 3, 5 3, 5 3 L 4 3 L 2 1 C 1 0, 1 1, 1 1 C 0 1, 1 1, 1 2 L 4 4 C 4 4, 4 4, 4 4 L 4 7 L 3 11 C 3 11, 3 11, 3 11 C 3 11, 3 11, 3 11 C 4 11, 4 11, 4 11 L 5 7 L 7 11 C 7 11, 7 11, 7 11 C 7 11, 7 11, 7 11 C 8 11, 8 11, 8 11 L 7 7 L 7 4 C 7 4, 7 4, 7 4 L 10 2 C 10 1, 10 1, 10 1 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 463,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-189",
    "isGroup": true,
    "children": [
      {
        "id": "sp-173",
        "x": 528,
        "y": 147,
        "width": 35.8974358974359,
        "height": 35.8974358974359,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1.0256410256410255,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 36 12 L 36 2 C 36 1, 35 1, 34 1 L 25 1 C 24 1, 23 1, 23 2 L 23 6 C 15 6, 9 12, 7 19 L 5 18 C 5 18, 4 19, 4 19 C 4 19, 4 19, 4 20 L 6 23 C 3 24, 1 26, 1 29 C 1 33, 3 36, 7 36 C 10 36, 13 33, 13 30 L 19 30 L 19 32 C 19 32, 19 32, 19 32 C 20 33, 20 33, 20 32 L 23 30 C 23 33, 26 36, 29 36 C 33 36, 36 33, 36 29 C 36 26, 33 23, 30 23 L 30 17 L 32 17 C 32 17, 32 17, 32 17 C 33 17, 33 16, 32 16 L 30 13 L 34 13 C 35 13, 36 13, 36 12 Z M 7 33 C 5 33, 4 31, 4 29 C 4 28, 5 26, 7 26 C 9 26, 10 28, 10 29 C 10 31, 9 33, 7 33 Z M 33 29 C 33 31, 31 33, 29 33 C 28 33, 26 31, 26 29 C 26 28, 28 26, 29 26 C 31 26, 33 28, 33 29 Z M 26 17 C 26 17, 27 17, 27 17 L 29 17 L 29 23 C 26 23, 23 26, 23 28 L 20 26 C 20 26, 20 26, 19 26 C 19 26, 19 27, 19 27 L 19 29 L 13 29 C 13 26, 11 23, 8 23 C 8 23, 8 23, 8 23 C 8 23, 8 23, 8 23 L 10 21 C 10 20, 10 20, 10 20 C 10 20, 10 19, 10 19 L 8 19 C 10 13, 16 8, 23 8 L 23 12 C 23 13, 24 13, 25 13 L 28 13 L 26 16 C 26 16, 26 17, 26 17 Z M 33 10 L 26 10 L 26 4 L 33 4 L 33 10 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 528,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-191",
    "isGroup": true,
    "children": [
      {
        "id": "sp-174",
        "x": 593,
        "y": 147,
        "width": 23.333333333333336,
        "height": 35.8974358974359,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.6666666666666667,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 21 21 L 3 21 L 3 4 L 21 4 L 21 10 L 22 11 L 22 4 C 23 3, 23 3, 23 2 C 23 1, 22 1, 22 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 3, 1 4 L 1 22 C 1 23, 2 23, 2 23 L 7 23 L 4 34 C 4 35, 4 35, 5 36 C 5 36, 5 36, 6 36 C 6 36, 7 35, 7 35 L 10 23 L 14 23 L 17 35 C 17 35, 17 36, 18 36 C 18 36, 18 36, 18 36 C 19 35, 20 35, 20 34 L 17 23 L 22 23 C 22 23, 22 23, 22 22 L 22 17 L 21 17 L 21 21 Z"
      },
      {
        "id": "sp-175",
        "x": 617.2307692307692,
        "y": 152.3846153846154,
        "width": 10,
        "height": 10,
        "localPctX": 0.6923076923076905,
        "localPctY": 0.1538461538461539,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 3 6 C 5 6, 6 5, 6 3 C 6 2, 5 1, 3 1 C 2 1, 1 2, 1 3 C 1 5, 2 6, 3 6 Z"
      },
      {
        "id": "sp-176",
        "x": 606.4615384615385,
        "y": 156.8717948717949,
        "width": 22.435897435897438,
        "height": 25.128205128205128,
        "localPctX": 0.38461538461538436,
        "localPctY": 0.28205128205128255,
        "localPctW": 0.6410256410256411,
        "localPctH": 0.717948717948718,
        "text": "",
        "pathD": "M 22 11 L 19 4 C 19 3, 18 3, 18 3 L 16 3 C 16 3, 15 3, 15 3 L 16 8 L 15 9 L 13 8 L 14 3 C 14 3, 13 3, 13 3 L 12 3 L 2 1 C 2 0, 1 1, 1 2 C 0 3, 1 3, 2 4 L 11 6 C 11 6, 11 6, 11 6 L 11 13 L 11 23 C 11 24, 11 25, 12 25 C 12 25, 12 25, 12 25 C 13 25, 14 24, 14 24 L 15 15 L 15 24 C 15 24, 16 25, 17 25 C 17 25, 17 25, 17 25 C 18 25, 18 24, 18 23 L 18 13 L 18 9 L 19 12 C 19 13, 20 13, 21 13 C 22 13, 22 12, 22 11 Z"
      },
      {
        "id": "sp-177",
        "x": 596.5897435897435,
        "y": 156.8717948717949,
        "width": 10,
        "height": 10,
        "localPctX": 0.10256410256410098,
        "localPctY": 0.28205128205128255,
        "localPctW": 0.05128205128205129,
        "localPctH": 0.2564102564102564,
        "text": "",
        "pathD": "M 0 1 L 0 8 C 0 9, 1 9, 1 9 C 1 9, 2 9, 2 8 L 2 1 C 2 1, 1 1, 1 1 C 1 1, 0 1, 0 1 Z"
      },
      {
        "id": "sp-178",
        "x": 600.1794871794872,
        "y": 151.4871794871795,
        "width": 10,
        "height": 15.256410256410257,
        "localPctX": 0.2051282051282052,
        "localPctY": 0.12820512820512867,
        "localPctW": 0.05128205128205129,
        "localPctH": 0.4358974358974359,
        "text": "",
        "pathD": "M 0 1 L 0 14 C 0 14, 1 15, 1 15 C 1 15, 2 14, 2 14 L 2 1 C 2 1, 1 1, 1 1 C 1 1, 0 1, 0 1 Z"
      },
      {
        "id": "sp-179",
        "x": 603.7692307692307,
        "y": 155.0769230769231,
        "width": 10,
        "height": 10.76923076923077,
        "localPctX": 0.3076923076923062,
        "localPctY": 0.23076923076923128,
        "localPctW": 0.05128205128205129,
        "localPctH": 0.3076923076923077,
        "text": "",
        "pathD": "M 0 1 L 0 10 C 0 11, 1 11, 1 11 C 1 11, 2 11, 2 10 L 2 1 C 2 1, 1 1, 1 1 C 1 1, 0 1, 0 1 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 593,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-198",
    "isGroup": true,
    "children": [
      {
        "id": "sp-180",
        "x": 661.5897435897435,
        "y": 147,
        "width": 27.82051282051282,
        "height": 35.8974358974359,
        "localPctX": 0.10256410256410098,
        "localPctY": 0,
        "localPctW": 0.7948717948717949,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 26 1 L 2 1 C 1 1, 1 1, 1 2 L 1 34 C 1 35, 1 36, 2 36 L 26 36 C 27 36, 28 35, 28 34 L 28 2 C 28 1, 27 1, 26 1 Z M 25 4 L 25 9 L 4 9 L 4 4 L 25 4 Z M 4 33 L 4 12 L 25 12 L 25 33 L 4 33 L 4 33 Z"
      },
      {
        "id": "sp-181",
        "x": 666.076923076923,
        "y": 159.56410256410257,
        "width": 10,
        "height": 10,
        "localPctX": 0.23076923076922803,
        "localPctY": 0.35897435897435914,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 5 1 L 1 1 C 1 1, 1 1, 1 1 L 1 5 C 1 5, 1 6, 1 6 L 5 6 C 5 6, 6 5, 6 5 L 6 1 C 6 1, 5 1, 5 1 Z"
      },
      {
        "id": "sp-182",
        "x": 672.3589743589744,
        "y": 159.56410256410257,
        "width": 10,
        "height": 10,
        "localPctX": 0.4102564102564104,
        "localPctY": 0.35897435897435914,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 5 1 L 1 1 C 1 1, 1 1, 1 1 L 1 5 C 1 5, 1 6, 1 6 L 5 6 C 5 6, 6 5, 6 5 L 6 1 C 6 1, 5 1, 5 1 Z"
      },
      {
        "id": "sp-183",
        "x": 678.6410256410256,
        "y": 159.56410256410257,
        "width": 10,
        "height": 10,
        "localPctX": 0.5897435897435895,
        "localPctY": 0.35897435897435914,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 5 1 L 1 1 C 1 1, 1 1, 1 1 L 1 5 C 1 5, 1 6, 1 6 L 5 6 C 5 6, 6 5, 6 5 L 6 1 C 6 1, 5 1, 5 1 Z"
      },
      {
        "id": "sp-184",
        "x": 666.076923076923,
        "y": 165.84615384615387,
        "width": 10,
        "height": 10,
        "localPctX": 0.23076923076922803,
        "localPctY": 0.5384615384615391,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 5 1 L 1 1 C 1 1, 1 1, 1 1 L 1 5 C 1 5, 1 6, 1 6 L 5 6 C 5 6, 6 5, 6 5 L 6 1 C 6 1, 5 1, 5 1 Z"
      },
      {
        "id": "sp-185",
        "x": 672.3589743589744,
        "y": 165.84615384615387,
        "width": 10,
        "height": 10,
        "localPctX": 0.4102564102564104,
        "localPctY": 0.5384615384615391,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 5 1 L 1 1 C 1 1, 1 1, 1 1 L 1 5 C 1 5, 1 6, 1 6 L 5 6 C 5 6, 6 5, 6 5 L 6 1 C 6 1, 5 1, 5 1 Z"
      },
      {
        "id": "sp-186",
        "x": 666.076923076923,
        "y": 172.12820512820514,
        "width": 10,
        "height": 10,
        "localPctX": 0.23076923076922803,
        "localPctY": 0.7179487179487183,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 5 1 L 1 1 C 1 1, 1 1, 1 1 L 1 5 C 1 5, 1 6, 1 6 L 5 6 C 5 6, 6 5, 6 5 L 6 1 C 6 1, 5 1, 5 1 Z"
      },
      {
        "id": "sp-187",
        "x": 672.3589743589744,
        "y": 172.12820512820514,
        "width": 10,
        "height": 10,
        "localPctX": 0.4102564102564104,
        "localPctY": 0.7179487179487183,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 5 1 L 1 1 C 1 1, 1 1, 1 1 L 1 5 C 1 5, 1 6, 1 6 L 5 6 C 5 6, 6 5, 6 5 L 6 1 C 6 1, 5 1, 5 1 Z"
      },
      {
        "id": "sp-188",
        "x": 678.6410256410256,
        "y": 165.84615384615387,
        "width": 10,
        "height": 11.666666666666668,
        "localPctX": 0.5897435897435895,
        "localPctY": 0.5384615384615391,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.33333333333333337,
        "text": "",
        "pathD": "M 5 1 L 1 1 C 1 1, 1 1, 1 1 L 1 11 C 1 11, 1 12, 1 12 L 5 12 C 5 12, 6 11, 6 11 L 6 1 C 6 1, 5 1, 5 1 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 658,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-208",
    "isGroup": true,
    "children": [
      {
        "id": "sp-189",
        "x": 727.5897435897436,
        "y": 147,
        "width": 27.82051282051282,
        "height": 35.8974358974359,
        "localPctX": 0.10256410256410423,
        "localPctY": 0,
        "localPctW": 0.7948717948717949,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 22 1 L 6 1 C 3 1, 1 3, 1 6 L 1 30 C 1 33, 3 36, 6 36 L 22 36 C 25 36, 28 33, 28 30 L 28 6 C 28 3, 25 1, 22 1 Z M 14 34 C 13 34, 12 33, 12 32 C 12 30, 13 30, 14 30 C 15 30, 16 30, 16 32 C 16 33, 15 34, 14 34 Z M 25 27 L 4 27 L 4 6 C 4 5, 5 4, 6 4 L 22 4 C 24 4, 25 5, 25 6 L 25 27 L 25 27 Z"
      },
      {
        "id": "sp-190",
        "x": 732.0769230769231,
        "y": 155.0769230769231,
        "width": 13.461538461538462,
        "height": 10,
        "localPctX": 0.23076923076923128,
        "localPctY": 0.23076923076923128,
        "localPctW": 0.38461538461538464,
        "localPctH": 0.2564102564102564,
        "text": "",
        "pathD": "M 6 8 C 7 7, 8 7, 9 6 C 9 6, 9 6, 9 5 C 9 4, 9 4, 10 4 C 11 4, 11 5, 11 6 C 11 6, 11 6, 11 6 C 11 6, 11 6, 11 6 C 12 6, 12 5, 13 5 C 13 4, 11 2, 8 1 C 4 0, 1 1, 1 3 C 0 4, 1 5, 2 6 L 1 9 C 1 9, 1 9, 1 9 C 1 9, 1 9, 1 9 C 1 9, 1 9, 2 9 L 5 8 C 5 8, 6 8, 6 8 C 6 8, 6 8, 6 8 Z M 5 4 C 5 5, 4 5, 4 5 C 3 5, 3 4, 3 4 C 3 3, 4 3, 4 3 C 5 3, 5 3, 5 4 Z M 6 4 C 6 4, 7 3, 7 4 C 8 4, 8 4, 8 5 C 8 5, 7 6, 7 5 C 6 5, 6 5, 6 4 Z"
      },
      {
        "id": "sp-191",
        "x": 737.4615384615385,
        "y": 160.46153846153848,
        "width": 13.461538461538462,
        "height": 10,
        "localPctX": 0.38461538461538436,
        "localPctY": 0.3846153846153852,
        "localPctW": 0.38461538461538464,
        "localPctH": 0.2564102564102564,
        "text": "",
        "pathD": "M 13 3 C 13 1, 9 0, 6 1 C 2 2, 0 4, 1 6 C 1 8, 4 9, 8 8 C 8 8, 8 8, 9 8 L 12 9 C 12 9, 13 9, 13 9 L 13 9 C 13 9, 13 9, 13 9 L 12 6 C 13 5, 13 4, 13 3 Z M 4 6 C 4 6, 3 6, 3 6 C 3 5, 3 4, 4 4 C 4 4, 5 4, 5 5 C 5 6, 5 6, 4 6 Z M 7 5 C 7 6, 6 5, 6 5 C 6 4, 6 4, 7 4 C 7 3, 8 4, 8 4 C 8 5, 8 5, 7 5 Z M 10 5 C 9 5, 9 5, 9 4 C 9 3, 9 3, 9 3 C 10 3, 11 3, 11 4 C 11 4, 11 5, 10 5 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 724,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-212",
    "isGroup": true,
    "children": [
      {
        "id": "sp-192",
        "x": 789,
        "y": 147,
        "width": 34.1025641025641,
        "height": 35.8974358974359,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.9743589743589743,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 28 30 C 25 27, 26 24, 28 20 C 29 16, 31 11, 29 7 C 28 4, 25 1, 19 1 L 19 1 C 17 1, 14 1, 12 3 C 11 3, 11 3, 11 3 C 11 4, 11 4, 11 4 C 12 4, 12 5, 12 5 C 10 6, 10 7, 9 8 C 9 9, 8 10, 6 12 C 5 12, 4 13, 4 14 C 4 14, 5 15, 5 16 C 5 16, 6 16, 6 16 C 6 16, 6 16, 7 16 C 7 16, 7 17, 7 17 C 8 17, 8 18, 8 18 C 9 18, 10 18, 10 17 C 11 17, 11 17, 12 16 C 12 16, 13 16, 14 16 C 14 16, 14 16, 14 16 C 15 17, 13 18, 12 19 C 9 21, 6 23, 7 26 C 7 27, 7 28, 10 29 C 5 30, 1 32, 1 33 C 1 34, 1 35, 6 35 C 9 36, 13 36, 17 36 C 21 36, 25 36, 28 35 C 33 35, 34 34, 34 33 C 34 32, 31 31, 28 30 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 789,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-214",
    "isGroup": true,
    "children": [
      {
        "id": "sp-193",
        "x": 860.2820512820513,
        "y": 147.8974358974359,
        "width": 27.82051282051282,
        "height": 23.333333333333336,
        "localPctX": 0.17948717948717915,
        "localPctY": 0.025641025641026056,
        "localPctW": 0.7948717948717949,
        "localPctH": 0.6666666666666667,
        "text": "",
        "pathD": "M 24 5 L 8 1 C 8 1, 7 1, 7 1 C 5 1, 3 2, 3 4 L 1 12 L 4 12 L 5 8 L 24 13 L 22 20 C 22 20, 21 20, 21 20 L 21 23 C 21 23, 21 23, 21 23 C 23 23, 24 22, 25 20 L 28 10 C 28 8, 27 6, 24 5 Z M 25 9 L 24 11 L 5 5 L 6 4 C 6 4, 6 4, 7 4 C 7 4, 7 4, 7 4 L 24 8 C 24 8, 25 9, 25 9 Z"
      },
      {
        "id": "sp-194",
        "x": 853.1025641025641,
        "y": 161.35897435897436,
        "width": 26.923076923076923,
        "height": 19.743589743589745,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.4102564102564104,
        "localPctW": 0.7692307692307693,
        "localPctH": 0.5641025641025641,
        "text": "",
        "pathD": "M 22 1 L 5 1 C 3 1, 1 2, 1 5 L 1 15 C 1 18, 3 19, 5 19 L 22 19 C 25 19, 27 18, 27 15 L 27 5 C 27 2, 25 1, 22 1 Z M 24 15 C 24 16, 23 16, 22 16 L 5 16 C 4 16, 4 16, 4 15 L 4 5 C 4 4, 4 4, 5 4 L 22 4 C 23 4, 24 4, 24 5 L 24 15 L 24 15 Z"
      },
      {
        "id": "sp-195",
        "x": 858.4871794871794,
        "y": 173.92307692307693,
        "width": 10,
        "height": 10,
        "localPctX": 0.12820512820512703,
        "localPctY": 0.7692307692307695,
        "localPctW": 0.15384615384615385,
        "localPctH": 0.07692307692307693,
        "text": "",
        "pathD": "M 5 1 L 1 1 C 1 1, 1 1, 1 1 L 1 2 C 1 2, 1 3, 1 3 L 5 3 C 5 3, 5 2, 5 2 L 5 1 C 5 1, 5 1, 5 1 Z"
      },
      {
        "id": "sp-196",
        "x": 863.8717948717949,
        "y": 173.92307692307693,
        "width": 10,
        "height": 10,
        "localPctX": 0.2820512820512834,
        "localPctY": 0.7692307692307695,
        "localPctW": 0.15384615384615385,
        "localPctH": 0.07692307692307693,
        "text": "",
        "pathD": "M 5 1 L 1 1 C 1 1, 1 1, 1 1 L 1 2 C 1 2, 1 3, 1 3 L 5 3 C 5 3, 5 2, 5 2 L 5 1 C 5 1, 5 1, 5 1 Z"
      },
      {
        "id": "sp-197",
        "x": 870.1538461538462,
        "y": 173.92307692307693,
        "width": 10,
        "height": 10,
        "localPctX": 0.46153846153846256,
        "localPctY": 0.7692307692307695,
        "localPctW": 0.15384615384615385,
        "localPctH": 0.07692307692307693,
        "text": "",
        "pathD": "M 5 1 L 1 1 C 1 1, 1 1, 1 1 L 1 2 C 1 2, 1 3, 1 3 L 5 3 C 5 3, 5 2, 5 2 L 5 1 C 5 1, 5 1, 5 1 Z"
      },
      {
        "id": "sp-198",
        "x": 865.6666666666666,
        "y": 165.84615384615387,
        "width": 10,
        "height": 10,
        "localPctX": 0.33333333333333226,
        "localPctY": 0.5384615384615391,
        "localPctW": 0.23076923076923075,
        "localPctH": 0.15384615384615385,
        "text": "",
        "pathD": "M 1 5 L 7 5 C 7 5, 8 5, 8 4 L 8 1 C 8 1, 7 1, 7 1 L 1 1 C 1 1, 1 1, 1 1 L 1 4 C 1 5, 1 5, 1 5 Z M 2 3 C 2 2, 2 2, 3 2 L 6 2 C 6 2, 6 2, 6 3 L 6 3 C 6 4, 6 4, 6 4 L 3 4 C 2 4, 2 4, 2 3 L 2 3 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 854,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-221",
    "isGroup": true,
    "children": [
      {
        "id": "sp-199",
        "x": 919,
        "y": 147,
        "width": 34.1025641025641,
        "height": 35.8974358974359,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.9743589743589743,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 33 7 L 18 1 C 17 1, 17 1, 16 1 L 2 7 C 1 7, 1 8, 1 9 L 1 28 C 1 28, 1 29, 2 29 L 16 36 C 17 36, 17 36, 17 36 C 17 36, 18 36, 18 36 L 33 29 C 33 29, 34 28, 34 28 L 34 9 C 34 8, 33 7, 33 7 Z M 20 16 L 30 11 L 30 24 L 20 16 Z M 4 11 L 14 16 L 4 24 L 4 11 Z M 15 19 L 15 31 L 5 27 L 15 19 Z M 17 4 L 28 9 L 17 13 L 7 9 L 17 4 Z M 19 19 L 29 27 L 19 31 L 19 19 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 919,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-223",
    "isGroup": true,
    "children": [
      {
        "id": "sp-200",
        "x": 985,
        "y": 147,
        "width": 17.94871794871795,
        "height": 17.94871794871795,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.5128205128205128,
        "localPctH": 0.5128205128205128,
        "text": "",
        "pathD": "M 16 12 C 16 10, 16 9, 17 7 C 17 3, 13 1, 9 1 C 4 1, 1 4, 1 9 C 1 13, 3 17, 7 17 C 9 15, 12 13, 16 12 Z M 6 11 C 6 11, 6 11, 6 11 L 8 11 L 8 10 L 8 10 L 6 10 C 6 10, 6 10, 6 9 C 6 9, 6 9, 6 9 L 7 9 L 5 6 C 5 5, 5 5, 5 5 C 5 4, 6 4, 6 4 C 7 4, 7 4, 7 5 L 9 8 L 11 5 C 11 4, 11 4, 12 4 C 12 4, 13 4, 13 5 C 13 5, 13 5, 13 6 L 11 9 L 12 9 C 12 9, 13 9, 13 9 C 13 10, 12 10, 12 10 L 10 10 L 10 10 L 10 11 L 12 11 C 12 11, 13 11, 13 11 C 13 11, 12 12, 12 12 L 10 12 L 10 13 C 10 14, 10 14, 9 14 C 8 14, 8 14, 8 13 L 8 12 L 6 12 C 6 12, 6 11, 6 11 Z"
      },
      {
        "id": "sp-201",
        "x": 1002.051282051282,
        "y": 150.5897435897436,
        "width": 17.94871794871795,
        "height": 17.05128205128205,
        "localPctX": 0.48717948717948534,
        "localPctY": 0.1025641025641026,
        "localPctW": 0.5128205128205128,
        "localPctH": 0.48717948717948717,
        "text": "",
        "pathD": "M 9 1 C 5 1, 1 4, 1 8 C 2 8, 4 8, 5 9 C 5 9, 5 8, 6 8 L 6 8 C 6 8, 6 7, 6 7 C 6 5, 7 4, 9 4 C 12 4, 13 5, 13 6 C 13 7, 12 7, 12 7 C 11 7, 11 6, 9 6 C 9 6, 8 6, 8 7 C 8 8, 8 8, 8 8 L 10 8 C 10 8, 11 9, 11 9 C 11 10, 10 10, 10 10 L 9 10 C 9 10, 9 10, 9 10 C 9 10, 9 11, 9 11 C 9 11, 10 12, 10 12 C 10 12, 11 12, 11 12 C 11 12, 12 12, 12 12 C 13 12, 13 12, 13 13 C 13 14, 12 14, 11 14 C 12 15, 12 16, 13 17 C 16 15, 18 12, 18 9 C 18 4, 14 1, 9 1 Z"
      },
      {
        "id": "sp-202",
        "x": 1002.051282051282,
        "y": 172.12820512820514,
        "width": 10,
        "height": 10,
        "localPctX": 0.48717948717948534,
        "localPctY": 0.7179487179487183,
        "localPctW": 0.07692307692307693,
        "localPctH": 0.1282051282051282,
        "text": "",
        "pathD": "M 1 1 L 1 4 C 1 4, 2 3, 2 2 C 2 1, 1 1, 1 1 Z"
      },
      {
        "id": "sp-203",
        "x": 999.3589743589744,
        "y": 166.74358974358975,
        "width": 10,
        "height": 10,
        "localPctX": 0.4102564102564104,
        "localPctY": 0.5641025641025643,
        "localPctW": 0.07692307692307693,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 1 2 C 1 3, 1 3, 2 4 L 2 1 C 1 1, 1 1, 1 2 Z"
      },
      {
        "id": "sp-204",
        "x": 991.2820512820513,
        "y": 160.46153846153848,
        "width": 22.435897435897438,
        "height": 22.435897435897438,
        "localPctX": 0.17948717948717915,
        "localPctY": 0.3846153846153852,
        "localPctW": 0.6410256410256411,
        "localPctH": 0.6410256410256411,
        "text": "",
        "pathD": "M 11 1 C 5 1, 1 5, 1 11 C 1 17, 5 22, 11 22 C 17 22, 22 17, 22 11 C 22 5, 17 1, 11 1 Z M 12 18 L 12 19 C 12 19, 12 19, 11 19 C 11 19, 11 19, 11 19 L 11 18 C 8 17, 6 16, 6 14 C 6 14, 7 13, 7 13 C 9 13, 8 16, 11 16 L 11 12 C 8 12, 7 10, 7 8 C 7 6, 9 5, 11 5 L 11 4 C 11 4, 11 3, 11 3 C 12 3, 12 4, 12 4 L 12 5 C 13 5, 16 6, 16 7 C 16 8, 16 8, 15 8 C 14 8, 14 7, 12 7 L 12 10 C 14 10, 16 11, 16 14 C 16 16, 14 17, 12 18 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 985,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-229",
    "isGroup": true,
    "children": [
      {
        "id": "sp-205",
        "x": 1049.102564102564,
        "y": 147,
        "width": 35.8974358974359,
        "height": 35.8974358974359,
        "localPctX": -0.025641025641029307,
        "localPctY": 0,
        "localPctW": 1.0256410256410255,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 35 7 L 31 5 C 31 5, 31 5, 31 5 L 20 5 L 20 2 C 20 1, 19 1, 18 1 C 17 1, 17 1, 17 2 L 17 13 L 5 13 C 5 13, 5 13, 5 13 L 1 15 C 1 15, 1 15, 1 15 C 1 16, 1 16, 1 16 L 5 18 C 5 18, 5 18, 5 18 L 17 18 L 17 30 L 13 30 C 9 30, 9 33, 9 34 L 9 34 C 9 35, 9 36, 10 36 L 26 36 C 27 36, 28 35, 28 34 L 28 34 C 28 33, 27 30, 23 30 L 20 30 L 20 11 L 31 11 C 31 11, 31 11, 31 11 L 35 9 C 36 9, 36 8, 36 8 C 36 8, 36 8, 35 7 Z M 31 9 L 20 9 L 20 7 L 31 7 L 33 8 L 31 9 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 15,
    "x": 1050,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-231",
    "isGroup": true,
    "children": [
      {
        "id": "sp-206",
        "x": 1115,
        "y": 147,
        "width": 35.8974358974359,
        "height": 35.8974358974359,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1.0256410256410255,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 35 11 L 25 1 C 25 1, 25 1, 24 1 L 6 1 C 3 1, 1 3, 1 6 L 1 30 C 1 33, 3 36, 6 36 L 30 36 C 33 36, 36 33, 36 30 L 36 12 C 36 12, 36 11, 35 11 Z M 24 4 L 32 12 L 24 12 L 24 4 Z M 30 33 L 6 33 C 5 33, 4 31, 4 30 L 4 6 C 4 5, 5 4, 6 4 L 23 4 L 23 13 C 23 13, 23 14, 23 14 L 33 14 L 33 30 C 33 31, 31 33, 30 33 Z"
      },
      {
        "id": "sp-207",
        "x": 1120.3846153846152,
        "y": 152.3846153846154,
        "width": 22.435897435897438,
        "height": 23.333333333333336,
        "localPctX": 0.15384615384614986,
        "localPctY": 0.1538461538461539,
        "localPctW": 0.6410256410256411,
        "localPctH": 0.6666666666666667,
        "text": "",
        "pathD": "M 10 2 C 9 1, 8 1, 7 1 C 5 1, 4 1, 3 2 L 3 3 C 2 3, 1 5, 1 6 C 1 7, 2 8, 3 9 L 12 18 C 12 19, 13 19, 14 19 C 14 19, 14 19, 14 19 C 15 19, 15 19, 16 18 L 17 17 C 17 17, 17 16, 17 15 C 17 15, 17 14, 17 13 L 8 5 C 8 5, 8 5, 7 5 C 7 6, 7 6, 7 7 L 15 15 C 16 15, 16 15, 16 15 C 16 16, 16 16, 15 16 L 15 17 C 14 17, 14 17, 14 17 L 14 17 C 13 17, 13 17, 13 17 L 4 8 C 3 7, 3 7, 3 6 C 3 5, 3 4, 4 4 L 4 3 C 6 2, 8 2, 9 3 L 20 14 C 20 14, 21 15, 21 16 C 21 17, 20 17, 20 18 L 16 21 C 15 22, 13 22, 12 21 L 2 11 C 2 11, 1 11, 1 11 C 0 11, 0 12, 1 12 L 11 22 C 12 23, 13 23, 14 23 C 15 23, 17 23, 17 22 L 21 19 C 22 18, 22 17, 22 16 C 22 15, 22 13, 21 13 L 10 2 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 16,
    "x": 1115,
    "y": 147,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-234",
    "isGroup": true,
    "children": [
      {
        "id": "sp-208",
        "x": 794.1282051282051,
        "y": 406.1794871794872,
        "width": 10,
        "height": 10,
        "localPctX": 0.7179487179487166,
        "localPctY": 0.2051282051282052,
        "localPctW": 0.28205128205128205,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 8 1 L 1 1 C 2 1, 3 2, 3 4 L 8 4 C 9 4, 10 3, 10 2 C 10 1, 9 1, 8 1 Z"
      },
      {
        "id": "sp-209",
        "x": 796.8205128205128,
        "y": 409.7692307692308,
        "width": 10,
        "height": 10,
        "localPctX": 0.7948717948717948,
        "localPctY": 0.3076923076923078,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 5 1 L 1 1 C 1 2, 1 3, 1 4 L 5 4 C 6 4, 6 3, 6 2 C 6 1, 6 1, 5 1 Z"
      },
      {
        "id": "sp-210",
        "x": 787.8461538461538,
        "y": 401.6923076923077,
        "width": 15.256410256410257,
        "height": 10,
        "localPctX": 0.5384615384615374,
        "localPctY": 0.07692307692307655,
        "localPctW": 0.4358974358974359,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 13 1 L 2 1 C 1 1, 1 1, 1 2 C 2 2, 4 3, 5 4 L 13 4 C 14 4, 15 3, 15 2 C 15 1, 14 1, 13 1 Z"
      },
      {
        "id": "sp-211",
        "x": 787.8461538461538,
        "y": 398.1025641025641,
        "width": 15.256410256410257,
        "height": 10,
        "localPctX": 0.5384615384615374,
        "localPctY": -0.025641025641026056,
        "localPctW": 0.4358974358974359,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 2 4 L 14 4 C 14 4, 15 3, 15 2 C 15 1, 14 1, 14 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 Z"
      },
      {
        "id": "sp-212",
        "x": 797.7179487179487,
        "y": 414.2564102564102,
        "width": 10,
        "height": 10,
        "localPctX": 0.8205128205128208,
        "localPctY": 0.43589743589743485,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 4 1 L 1 1 C 1 1, 1 1, 1 2 C 1 3, 1 3, 1 4 L 4 4 C 5 4, 6 3, 6 2 C 6 1, 5 1, 4 1 Z"
      },
      {
        "id": "sp-213",
        "x": 796.8205128205128,
        "y": 417.8461538461538,
        "width": 10,
        "height": 10,
        "localPctX": 0.7948717948717948,
        "localPctY": 0.5384615384615374,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 5 1 L 2 1 C 1 2, 1 3, 1 4 L 5 4 C 6 4, 6 3, 6 2 C 6 1, 6 1, 5 1 Z"
      },
      {
        "id": "sp-214",
        "x": 793.2307692307692,
        "y": 422.3333333333333,
        "width": 10.76923076923077,
        "height": 10,
        "localPctX": 0.6923076923076905,
        "localPctY": 0.6666666666666661,
        "localPctW": 0.3076923076923077,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 9 1 L 3 1 C 3 2, 2 3, 1 4 L 9 4 C 9 4, 10 3, 10 2 C 10 1, 9 1, 9 1 Z"
      },
      {
        "id": "sp-215",
        "x": 768.1025641025641,
        "y": 413.35897435897436,
        "width": 10,
        "height": 10,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.4102564102564104,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 2 4 L 6 4 C 6 3, 6 3, 6 2 C 6 2, 6 1, 6 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 Z"
      },
      {
        "id": "sp-216",
        "x": 768.1025641025641,
        "y": 417.8461538461538,
        "width": 10,
        "height": 10,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.5384615384615374,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 2 4 L 6 4 C 6 3, 5 2, 5 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 Z"
      },
      {
        "id": "sp-217",
        "x": 768.1025641025641,
        "y": 409.7692307692308,
        "width": 10,
        "height": 10,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.3076923076923078,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 2 4 L 5 4 C 5 3, 6 1, 6 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 Z"
      },
      {
        "id": "sp-218",
        "x": 768.1025641025641,
        "y": 406.1794871794872,
        "width": 10.76923076923077,
        "height": 10,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.2051282051282052,
        "localPctW": 0.3076923076923077,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 2 4 L 7 4 C 8 2, 9 1, 10 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 Z"
      },
      {
        "id": "sp-219",
        "x": 768.1025641025641,
        "y": 421.4358974358974,
        "width": 10,
        "height": 10,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.6410256410256401,
        "localPctW": 0.28205128205128205,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 2 4 L 10 4 C 9 3, 8 2, 7 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 Z"
      },
      {
        "id": "sp-220",
        "x": 768.1025641025641,
        "y": 425.9230769230769,
        "width": 15.256410256410257,
        "height": 10,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.7692307692307687,
        "localPctW": 0.4358974358974359,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 2 4 L 14 4 C 14 4, 15 3, 15 3 C 13 2, 12 2, 10 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 Z"
      },
      {
        "id": "sp-221",
        "x": 768.1025641025641,
        "y": 429.5128205128205,
        "width": 15.256410256410257,
        "height": 10,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.8717948717948714,
        "localPctW": 0.4358974358974359,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 14 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 L 14 4 C 14 4, 15 3, 15 2 C 15 1, 14 1, 14 1 Z"
      },
      {
        "id": "sp-222",
        "x": 774.3846153846154,
        "y": 404.38461538461536,
        "width": 23.333333333333336,
        "height": 23.333333333333336,
        "localPctX": 0.1538461538461531,
        "localPctY": 0.1538461538461531,
        "localPctW": 0.6666666666666667,
        "localPctH": 0.6666666666666667,
        "text": "",
        "pathD": "M 12 1 C 6 1, 1 6, 1 12 C 1 18, 6 23, 12 23 C 18 23, 23 18, 23 12 C 23 6, 18 1, 12 1 Z M 12 20 C 7 20, 4 16, 4 12 C 4 7, 7 4, 12 4 C 16 4, 20 7, 20 12 C 20 16, 16 20, 12 20 Z"
      },
      {
        "id": "sp-223",
        "x": 781.5641025641025,
        "y": 408.87179487179486,
        "width": 10,
        "height": 14.35897435897436,
        "localPctX": 0.3589743589743583,
        "localPctY": 0.28205128205128177,
        "localPctW": 0.2564102564102564,
        "localPctH": 0.4102564102564103,
        "text": "",
        "pathD": "M 5 6 L 5 3 C 7 3, 7 5, 8 5 C 8 5, 9 5, 9 4 C 9 3, 6 2, 5 2 L 5 1 C 5 1, 5 1, 5 1 C 4 1, 4 1, 4 1 L 4 2 C 2 2, 1 3, 1 5 C 1 7, 2 8, 4 8 L 4 11 C 2 11, 3 9, 1 9 C 1 9, 1 9, 1 10 C 1 11, 2 12, 4 12 L 4 13 C 4 14, 4 14, 5 14 C 5 14, 5 14, 5 13 L 5 12 C 7 12, 9 11, 9 9 C 9 7, 7 7, 5 6 Z M 4 6 C 3 6, 3 5, 3 5 C 3 4, 3 3, 4 3 L 4 6 Z M 5 11 L 5 8 C 6 8, 7 9, 7 10 C 7 11, 6 11, 5 11 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 72,
    "x": 769,
    "y": 399,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-251",
    "isGroup": true,
    "children": [
      {
        "id": "sp-224",
        "x": 1192.5641025641025,
        "y": 142.10256410256412,
        "width": 23.333333333333336,
        "height": 35.8974358974359,
        "localPctX": 0.3589743589743583,
        "localPctY": -0.025641025641025245,
        "localPctW": 0.6666666666666667,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 5 1 C 4 1, 3 1, 2 1 C 1 1, 0 2, 1 3 C 1 4, 2 4, 2 4 C 3 4, 3 4, 4 4 L 4 13 C 3 13, 3 13, 2 13 C 2 12, 1 13, 1 14 C 1 15, 1 16, 2 16 C 3 16, 3 16, 4 16 L 4 20 C 3 20, 3 20, 2 21 C 1 21, 1 21, 1 22 C 1 23, 2 24, 2 24 C 3 24, 3 24, 4 24 L 4 32 C 3 32, 3 32, 3 32 C 2 32, 1 33, 1 33 C 0 34, 1 35, 2 35 C 3 36, 4 36, 5 36 C 15 36, 23 28, 23 18 C 23 8, 15 1, 5 1 Z M 7 32 L 7 24 C 8 24, 10 24, 11 24 C 10 28, 9 31, 7 32 Z M 7 20 L 7 16 C 9 16, 10 16, 12 15 C 12 16, 12 17, 12 18 C 12 19, 12 20, 12 21 C 10 21, 9 20, 7 20 Z M 11 12 C 10 12, 8 13, 7 13 L 7 4 C 9 5, 10 8, 11 12 Z M 15 14 C 16 14, 18 13, 19 12 C 19 14, 20 16, 20 18 C 20 20, 19 22, 19 24 C 18 23, 16 22, 15 22 C 15 21, 15 19, 15 18 C 15 17, 15 16, 15 14 Z M 17 10 C 16 10, 15 11, 14 11 C 14 9, 13 7, 12 5 C 14 6, 16 8, 17 10 Z M 12 31 C 13 29, 14 27, 14 25 C 15 26, 16 26, 17 27 C 16 28, 14 30, 12 31 Z"
      },
      {
        "id": "sp-225",
        "x": 1180,
        "y": 145.69230769230768,
        "width": 13.461538461538462,
        "height": 27.82051282051282,
        "localPctX": 0,
        "localPctY": 0.07692307692307655,
        "localPctW": 0.38461538461538464,
        "localPctH": 0.7948717948717949,
        "text": "",
        "pathD": "M 11 22 C 11 21, 10 21, 10 20 L 5 20 C 5 18, 5 15, 5 14 C 5 13, 5 11, 5 9 L 10 8 C 10 8, 11 8, 11 7 L 13 3 C 13 3, 13 2, 13 1 C 12 1, 12 1, 11 1 C 11 1, 9 1, 9 1 C 5 1, 1 5, 1 14 C 1 24, 5 27, 9 28 C 9 28, 11 28, 11 28 C 12 28, 12 28, 13 27 C 13 26, 13 26, 13 25 L 11 22 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 17,
    "x": 1180,
    "y": 143,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-254",
    "isGroup": true,
    "children": [
      {
        "id": "sp-226",
        "x": 278.38461538461536,
        "y": 321.8205128205128,
        "width": 23.333333333333336,
        "height": 10,
        "localPctX": 0.1538461538461531,
        "localPctY": 0.7948717948717948,
        "localPctW": 0.6666666666666667,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 22 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 L 22 4 C 22 4, 23 3, 23 2 C 23 1, 22 1, 22 1 Z"
      },
      {
        "id": "sp-227",
        "x": 278.38461538461536,
        "y": 308.35897435897436,
        "width": 10,
        "height": 10,
        "localPctX": 0.1538461538461531,
        "localPctY": 0.4102564102564104,
        "localPctW": 0.07692307692307693,
        "localPctH": 0.20512820512820515,
        "text": "",
        "pathD": "M 1 2 L 1 6 C 1 6, 1 7, 2 7 C 2 7, 3 6, 3 6 L 3 2 C 3 1, 2 1, 2 1 C 1 1, 1 1, 1 2 Z"
      },
      {
        "id": "sp-228",
        "x": 281.97435897435895,
        "y": 306.5641025641026,
        "width": 10,
        "height": 10,
        "localPctX": 0.2564102564102557,
        "localPctY": 0.3589743589743599,
        "localPctW": 0.07692307692307693,
        "localPctH": 0.2564102564102564,
        "text": "",
        "pathD": "M 1 2 L 1 7 C 1 8, 1 9, 2 9 C 2 9, 3 8, 3 7 L 3 2 C 3 1, 2 1, 2 1 C 1 1, 1 1, 1 2 Z"
      },
      {
        "id": "sp-229",
        "x": 285.56410256410254,
        "y": 305.6666666666667,
        "width": 10,
        "height": 10.76923076923077,
        "localPctX": 0.3589743589743583,
        "localPctY": 0.33333333333333387,
        "localPctW": 0.07692307692307693,
        "localPctH": 0.3076923076923077,
        "text": "",
        "pathD": "M 1 2 L 1 9 C 1 10, 1 10, 2 10 C 2 10, 3 10, 3 9 L 3 2 C 3 1, 2 1, 2 1 C 1 1, 1 1, 1 2 Z"
      },
      {
        "id": "sp-230",
        "x": 272.1025641025641,
        "y": 296.69230769230774,
        "width": 35.8974358974359,
        "height": 23.333333333333336,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.07692307692307818,
        "localPctW": 1.0256410256410255,
        "localPctH": 0.6666666666666667,
        "text": "",
        "pathD": "M 34 1 L 2 1 C 1 1, 1 1, 1 2 L 1 22 C 1 22, 1 23, 2 23 L 33 23 C 33 23, 33 23, 33 23 L 30 21 C 29 22, 28 22, 26 22 C 24 22, 22 21, 21 20 L 4 20 L 4 4 L 33 4 L 33 8 C 34 10, 35 12, 35 14 C 35 15, 34 16, 34 18 L 36 20 L 36 2 C 36 1, 35 1, 34 1 Z"
      },
      {
        "id": "sp-231",
        "x": 290.94871794871796,
        "y": 302.974358974359,
        "width": 16.153846153846153,
        "height": 16.153846153846153,
        "localPctX": 0.512820512820513,
        "localPctY": 0.25641025641025733,
        "localPctW": 0.4615384615384615,
        "localPctH": 0.4615384615384615,
        "text": "",
        "pathD": "M 13 12 C 13 12, 13 12, 13 12 L 13 12 C 14 11, 14 9, 14 7 C 14 6, 14 4, 12 3 C 11 1, 9 1, 7 1 C 6 1, 4 1, 3 3 C 1 4, 1 6, 1 7 C 1 9, 1 11, 3 12 C 4 14, 6 14, 7 14 C 9 14, 11 14, 12 13 L 12 13 C 12 13, 12 13, 12 13 L 15 16 C 15 16, 15 16, 15 16 C 15 16, 16 16, 16 16 C 16 16, 16 15, 16 15 L 13 12 Z M 11 11 C 10 12, 9 13, 7 13 C 6 13, 5 12, 4 11 C 3 10, 2 9, 2 7 C 2 6, 3 5, 4 4 C 5 3, 6 2, 7 2 C 9 2, 10 3, 11 4 C 12 5, 13 6, 13 7 C 13 9, 12 10, 11 11 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 39,
    "x": 273,
    "y": 294,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-261",
    "isGroup": true,
    "children": [
      {
        "id": "sp-232",
        "x": 343.5897435897436,
        "y": 297.5897435897436,
        "width": 10,
        "height": 10,
        "localPctX": 0.1025641025641026,
        "localPctY": 0.1025641025641026,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 6 3 C 6 5, 5 6, 3 6 C 2 6, 1 5, 1 3 C 1 2, 2 1, 3 1 C 5 1, 6 2, 6 3 Z"
      },
      {
        "id": "sp-233",
        "x": 339.1025641025641,
        "y": 302.974358974359,
        "width": 11.666666666666668,
        "height": 21.53846153846154,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.25641025641025733,
        "localPctW": 0.33333333333333337,
        "localPctH": 0.6153846153846154,
        "text": "",
        "pathD": "M 11 13 C 11 13, 10 13, 10 12 C 9 12, 8 11, 8 11 C 8 10, 8 9, 8 8 L 11 1 C 11 1, 10 1, 10 1 L 9 1 C 8 1, 8 1, 8 1 L 7 1 C 7 1, 6 1, 6 1 L 5 1 C 4 1, 4 1, 3 1 L 1 8 C 0 9, 1 10, 1 10 C 2 11, 3 10, 3 10 L 5 6 L 5 10 L 2 20 C 2 20, 2 21, 3 21 C 3 21, 3 22, 3 22 C 4 22, 5 21, 5 20 L 7 11 L 10 20 L 11 15 L 11 13 Z"
      },
      {
        "id": "sp-234",
        "x": 364.2307692307692,
        "y": 297.5897435897436,
        "width": 10,
        "height": 10,
        "localPctX": 0.6923076923076922,
        "localPctY": 0.1025641025641026,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 3 6 C 5 6, 6 5, 6 3 C 6 2, 5 1, 3 1 C 2 1, 1 2, 1 3 C 1 5, 2 6, 3 6 Z"
      },
      {
        "id": "sp-235",
        "x": 363.3333333333333,
        "y": 302.974358974359,
        "width": 11.666666666666668,
        "height": 21.53846153846154,
        "localPctX": 0.6666666666666661,
        "localPctY": 0.25641025641025733,
        "localPctW": 0.33333333333333337,
        "localPctH": 0.6153846153846154,
        "text": "",
        "pathD": "M 11 8 L 9 1 C 8 1, 8 1, 7 1 L 6 1 C 6 1, 5 1, 5 1 L 4 1 C 4 1, 4 1, 3 1 L 2 1 C 2 1, 1 1, 1 1 L 4 8 C 4 9, 4 10, 4 11 C 4 11, 3 12, 2 12 C 2 13, 1 13, 1 13 L 1 15 L 2 20 L 5 11 L 7 20 C 7 21, 8 22, 9 22 C 9 22, 9 21, 9 21 C 10 21, 10 20, 10 20 L 7 10 L 7 6 L 9 10 C 9 10, 10 11, 11 10 C 11 10, 12 9, 11 8 Z"
      },
      {
        "id": "sp-236",
        "x": 353.46153846153845,
        "y": 294.8974358974359,
        "width": 10,
        "height": 10,
        "localPctX": 0.38461538461538436,
        "localPctY": 0.025641025641026056,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 3 6 C 5 6, 6 5, 6 3 C 6 2, 5 1, 3 1 C 2 1, 1 2, 1 3 C 1 5, 2 6, 3 6 Z"
      },
      {
        "id": "sp-237",
        "x": 348.97435897435895,
        "y": 302.0769230769231,
        "width": 17.05128205128205,
        "height": 26.025641025641026,
        "localPctX": 0.2564102564102557,
        "localPctY": 0.23076923076923128,
        "localPctW": 0.48717948717948717,
        "localPctH": 0.7435897435897436,
        "text": "",
        "pathD": "M 12 12 L 12 7 L 14 11 C 14 12, 15 13, 16 12 C 17 12, 17 11, 17 10 L 14 2 C 14 1, 13 1, 12 1 L 10 1 C 10 1, 10 1, 9 1 L 10 7 L 9 8 L 8 7 L 8 1 C 8 1, 8 1, 7 1 L 6 1 C 5 1, 4 1, 4 2 L 1 10 C 0 11, 1 12, 2 12 C 3 13, 4 12, 4 11 L 5 7 L 5 12 L 2 23 C 2 24, 3 25, 3 25 C 4 25, 4 25, 4 25 C 5 25, 5 25, 6 24 L 9 13 L 12 24 C 12 25, 13 25, 14 25 C 14 25, 14 25, 14 25 C 15 25, 16 24, 15 23 L 12 12 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 40,
    "x": 340,
    "y": 294,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-268",
    "isGroup": true,
    "children": [
      {
        "id": "sp-238",
        "x": 70.1025641025641,
        "y": 291.4871794871795,
        "width": 31.410256410256412,
        "height": 27.82051282051282,
        "localPctX": -0.02564102564102565,
        "localPctY": 0.12820512820512867,
        "localPctW": 0.8974358974358975,
        "localPctH": 0.7948717948717949,
        "text": "",
        "pathD": "M 24 3 C 24 3, 24 3, 24 3 L 17 1 C 15 0, 13 1, 12 2 C 12 2, 12 2, 12 3 L 9 10 C 9 10, 9 11, 9 11 C 9 12, 10 13, 11 13 C 12 13, 13 13, 14 12 C 14 12, 14 12, 14 11 L 15 10 C 15 9, 15 9, 16 9 C 16 8, 17 8, 17 8 C 19 10, 26 18, 26 18 C 27 18, 27 19, 26 19 C 26 19, 25 19, 25 19 L 23 17 C 23 17, 22 17, 22 17 C 22 17, 22 18, 22 18 L 24 20 C 24 20, 24 21, 24 21 C 24 22, 23 22, 23 21 L 21 19 C 20 19, 20 19, 20 19 C 19 19, 19 20, 20 20 L 22 22 C 22 23, 22 23, 22 24 C 21 24, 21 24, 21 24 L 18 21 C 18 21, 18 21, 17 21 C 17 22, 17 22, 17 23 L 19 25 C 20 25, 20 26, 19 26 C 19 26, 18 26, 18 26 L 16 23 C 16 23, 16 22, 15 21 C 15 21, 14 21, 13 21 C 14 21, 14 20, 13 19 C 12 18, 11 18, 11 19 C 11 18, 11 17, 11 17 C 10 16, 9 16, 8 17 C 9 16, 9 15, 8 14 C 8 14, 7 14, 6 14 L 2 10 C 2 9, 1 9, 1 10 C 0 10, 0 10, 1 11 L 5 15 L 4 16 C 3 17, 3 18, 4 19 C 5 19, 6 19, 6 19 C 6 19, 6 20, 6 21 C 7 22, 8 22, 8 21 C 8 22, 8 23, 9 23 C 9 24, 10 24, 11 23 C 10 24, 10 25, 11 26 C 12 26, 13 26, 13 26 L 14 24 L 17 27 C 18 28, 19 28, 20 27 C 21 27, 21 26, 21 25 C 22 25, 22 25, 23 25 C 23 24, 23 24, 23 23 C 24 23, 25 23, 25 22 C 25 22, 26 21, 26 21 C 26 21, 27 20, 27 20 C 28 19, 28 18, 27 17 L 26 16 L 31 11 C 31 11, 31 10, 31 10 L 24 3 Z"
      },
      {
        "id": "sp-239",
        "x": 94.33333333333333,
        "y": 288.7948717948718,
        "width": 11.666666666666668,
        "height": 11.666666666666668,
        "localPctX": 0.6666666666666665,
        "localPctY": 0.05128205128205211,
        "localPctW": 0.33333333333333337,
        "localPctH": 0.33333333333333337,
        "text": "",
        "pathD": "M 11 7 L 5 1 C 4 0, 4 0, 3 1 L 1 3 C 0 4, 0 4, 1 5 L 7 11 C 7 11, 8 11, 9 11 L 11 9 C 11 8, 11 7, 11 7 Z M 8 10 C 7 10, 7 9, 7 8 C 7 8, 7 7, 8 7 C 8 7, 9 8, 9 8 C 9 9, 8 10, 8 10 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 36,
    "x": 71,
    "y": 287,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-271",
    "isGroup": true,
    "children": [
      {
        "id": "sp-240",
        "x": 148.76923076923077,
        "y": 286.1025641025641,
        "width": 14.35897435897436,
        "height": 14.35897435897436,
        "localPctX": 0.3076923076923078,
        "localPctY": -0.025641025641026056,
        "localPctW": 0.4102564102564103,
        "localPctH": 0.4102564102564103,
        "text": "",
        "pathD": "M 6 14 L 7 11 L 7 11 C 6 11, 6 11, 7 11 L 7 10 C 7 10, 7 10, 7 10 L 8 11 C 8 11, 8 11, 8 11 L 8 11 L 8 14 C 12 14, 14 14, 14 13 C 14 11, 12 11, 11 11 C 10 10, 9 10, 9 8 C 10 8, 10 7, 10 7 C 10 7, 11 6, 11 5 C 11 5, 11 5, 11 5 C 11 5, 11 4, 11 4 C 11 2, 9 1, 7 1 C 5 1, 4 2, 4 4 C 4 4, 4 5, 4 5 C 4 5, 4 5, 4 5 C 4 6, 5 7, 5 7 C 5 7, 5 8, 5 8 C 6 10, 5 10, 4 11 C 2 11, 1 11, 1 13 C 1 14, 3 14, 6 14 Z"
      },
      {
        "id": "sp-241",
        "x": 137.1025641025641,
        "y": 312.12820512820514,
        "width": 10,
        "height": 10,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.7179487179487183,
        "localPctW": 0.28205128205128205,
        "localPctH": 0.28205128205128205,
        "text": "",
        "pathD": "M 7 7 C 7 7, 6 7, 6 6 C 7 5, 7 5, 7 5 C 7 5, 7 4, 7 4 C 7 3, 7 3, 7 3 C 7 3, 7 3, 7 3 C 7 1, 6 1, 5 1 C 4 1, 3 1, 3 3 C 3 3, 3 3, 3 3 C 3 3, 3 3, 3 4 C 3 4, 3 5, 3 5 C 3 5, 3 5, 4 6 C 4 7, 3 7, 3 7 C 2 8, 1 8, 1 9 C 1 9, 2 10, 4 10 L 5 8 L 5 7 C 5 7, 5 7, 5 7 L 5 7 C 5 7, 5 7, 5 7 L 5 7 C 6 7, 6 7, 6 7 L 5 8 L 6 10 C 8 10, 9 9, 9 9 C 9 8, 9 8, 7 7 Z"
      },
      {
        "id": "sp-242",
        "x": 150.56410256410254,
        "y": 312.12820512820514,
        "width": 10,
        "height": 10,
        "localPctX": 0.3589743589743583,
        "localPctY": 0.7179487179487183,
        "localPctW": 0.28205128205128205,
        "localPctH": 0.28205128205128205,
        "text": "",
        "pathD": "M 7 7 C 7 7, 6 7, 6 6 C 7 5, 7 5, 7 5 C 7 5, 7 4, 7 4 C 7 3, 7 3, 7 3 C 7 3, 7 3, 7 3 C 7 1, 6 1, 5 1 C 4 1, 3 1, 3 3 C 3 3, 3 3, 3 3 C 3 3, 3 3, 3 4 C 3 4, 3 5, 3 5 C 3 5, 3 5, 4 6 C 4 7, 3 7, 3 7 C 2 8, 1 8, 1 9 C 1 9, 2 10, 4 10 L 5 8 L 5 7 C 5 7, 5 7, 5 7 L 5 7 C 5 7, 5 7, 5 7 L 5 7 C 6 7, 6 7, 6 7 L 5 8 L 6 10 C 8 10, 9 9, 9 9 C 9 8, 9 8, 7 7 Z"
      },
      {
        "id": "sp-243",
        "x": 164.02564102564102,
        "y": 312.12820512820514,
        "width": 10,
        "height": 10,
        "localPctX": 0.7435897435897435,
        "localPctY": 0.7179487179487183,
        "localPctW": 0.28205128205128205,
        "localPctH": 0.28205128205128205,
        "text": "",
        "pathD": "M 8 7 C 7 7, 6 7, 6 6 C 7 5, 7 5, 7 5 C 7 5, 7 4, 7 4 C 7 3, 7 3, 7 3 C 7 3, 7 3, 7 3 C 7 1, 6 1, 5 1 C 4 1, 3 1, 3 3 C 3 3, 3 3, 3 3 C 3 3, 3 3, 3 4 C 3 4, 3 5, 3 5 C 3 5, 3 5, 4 6 C 4 7, 3 7, 3 7 C 2 8, 1 8, 1 9 C 1 9, 2 10, 4 10 L 5 8 L 5 7 C 5 7, 5 7, 5 7 L 5 7 C 5 7, 5 7, 5 7 L 5 7 C 6 7, 6 7, 6 7 L 5 8 L 6 10 C 8 10, 9 9, 9 9 C 9 8, 9 8, 8 7 Z"
      },
      {
        "id": "sp-244",
        "x": 140.69230769230768,
        "y": 300.46153846153845,
        "width": 28.71794871794872,
        "height": 10.76923076923077,
        "localPctX": 0.07692307692307655,
        "localPctY": 0.38461538461538436,
        "localPctW": 0.8205128205128206,
        "localPctH": 0.3076923076923077,
        "text": "",
        "pathD": "M 1 11 C 2 11, 2 10, 2 10 L 2 6 L 14 6 L 14 10 C 14 10, 14 11, 14 11 C 15 11, 15 10, 15 10 L 15 6 L 27 6 L 27 10 C 27 10, 27 11, 27 11 C 28 11, 28 10, 28 10 L 28 5 C 28 5, 28 4, 27 4 L 15 4 L 15 1 C 15 1, 15 1, 14 1 C 14 1, 14 1, 14 1 L 14 4 L 1 4 C 1 4, 1 5, 1 5 L 1 10 C 1 10, 1 11, 1 11 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 37,
    "x": 138,
    "y": 287,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-277",
    "isGroup": true,
    "children": [
      {
        "id": "sp-245",
        "x": 207.7948717948718,
        "y": 286.1025641025641,
        "width": 31.410256410256412,
        "height": 35.8974358974359,
        "localPctX": 0.0512820512820513,
        "localPctY": -0.025641025641026056,
        "localPctW": 0.8974358974358975,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 24 16 L 24 13 C 24 12, 23 11, 22 11 L 18 11 C 19 10, 19 9, 19 8 C 19 7, 18 6, 17 5 C 16 4, 15 3, 16 2 C 16 1, 16 1, 16 1 C 15 0, 15 1, 15 1 C 11 5, 13 7, 14 9 C 15 10, 16 11, 16 11 L 11 11 C 12 10, 12 9, 12 8 C 12 7, 11 6, 10 5 C 9 4, 8 3, 9 2 C 9 1, 9 1, 9 1 C 8 0, 8 1, 7 1 C 4 5, 6 7, 7 9 C 8 10, 9 11, 8 11 L 2 11 C 1 11, 1 12, 1 13 L 1 30 C 1 33, 3 36, 6 36 L 18 36 C 21 36, 24 34, 24 31 C 28 30, 31 27, 31 23 C 31 19, 28 16, 24 16 Z M 8 29 C 8 30, 7 31, 6 31 C 5 31, 5 30, 5 29 L 5 17 C 5 16, 5 16, 6 16 C 7 16, 8 16, 8 17 L 8 29 Z M 24 28 L 24 19 C 26 19, 28 21, 28 23 C 28 25, 26 27, 24 28 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 38,
    "x": 206,
    "y": 287,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-279",
    "isGroup": true,
    "children": [
      {
        "id": "sp-246",
        "x": 1192.5641025641025,
        "y": 223.17948717948718,
        "width": 10.76923076923077,
        "height": 10.76923076923077,
        "localPctX": 0.3589743589743583,
        "localPctY": 0.2051282051282052,
        "localPctW": 0.3076923076923077,
        "localPctH": 0.3076923076923077,
        "text": "",
        "pathD": "M 5 10 C 5 10, 5 10, 5 10 C 6 10, 6 10, 6 10 C 6 9, 7 8, 7 7 C 9 5, 10 4, 10 2 C 10 1, 10 1, 10 1 C 10 1, 10 1, 10 1 L 1 1 C 1 1, 1 1, 1 1 C 1 1, 1 1, 1 2 C 1 4, 2 5, 4 7 C 4 8, 5 9, 5 10 Z"
      },
      {
        "id": "sp-247",
        "x": 1188.076923076923,
        "y": 234.84615384615387,
        "width": 18.846153846153847,
        "height": 11.666666666666668,
        "localPctX": 0.23076923076923128,
        "localPctY": 0.5384615384615391,
        "localPctW": 0.5384615384615384,
        "localPctH": 0.33333333333333337,
        "text": "",
        "pathD": "M 10 1 C 10 1, 10 1, 9 1 C 9 1, 9 1, 9 1 C 9 2, 8 4, 7 4 C 4 6, 2 8, 1 11 C 1 11, 1 11, 1 11 C 1 12, 1 12, 1 12 L 17 12 C 18 12, 18 12, 18 11 C 18 11, 18 11, 18 11 C 17 8, 15 6, 12 4 C 11 4, 10 2, 10 1 Z"
      },
      {
        "id": "sp-248",
        "x": 1181.7948717948718,
        "y": 215.10256410256412,
        "width": 32.30769230769231,
        "height": 35.8974358974359,
        "localPctX": 0.05128205128205211,
        "localPctY": -0.025641025641025245,
        "localPctW": 0.923076923076923,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 30 33 L 30 33 C 29 26, 26 22, 23 18 C 26 15, 29 10, 30 4 L 30 4 C 31 4, 32 3, 32 2 C 32 1, 31 1, 30 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 L 3 4 C 3 10, 7 15, 10 18 C 7 22, 3 26, 3 33 L 2 33 C 1 33, 1 33, 1 34 C 1 35, 1 36, 2 36 L 4 36 L 28 36 L 30 36 C 31 36, 32 35, 32 34 C 32 33, 31 33, 30 33 Z M 6 33 C 6 27, 10 23, 13 19 L 13 19 C 14 19, 14 18, 13 17 L 13 17 C 10 14, 6 9, 6 4 L 27 4 C 26 9, 22 14, 20 17 L 19 17 C 19 18, 19 19, 19 19 L 20 19 C 22 23, 26 27, 27 33 L 6 33 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 35,
    "x": 1180,
    "y": 216,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-283",
    "isGroup": true,
    "children": [
      {
        "id": "sp-249",
        "x": 72.58974358974359,
        "y": 217.5897435897436,
        "width": 27.82051282051282,
        "height": 32.30769230769231,
        "localPctX": 0.1025641025641026,
        "localPctY": 0.1025641025641026,
        "localPctW": 0.7948717948717949,
        "localPctH": 0.923076923076923,
        "text": "",
        "pathD": "M 26 1 L 20 1 L 20 4 L 25 4 L 25 28 L 4 28 L 4 4 L 9 4 L 9 1 L 2 1 C 1 1, 1 1, 1 2 L 1 30 C 1 31, 1 32, 2 32 L 26 32 C 27 32, 28 31, 28 30 L 28 2 C 28 1, 27 1, 26 1 Z"
      },
      {
        "id": "sp-250",
        "x": 82.46153846153847,
        "y": 213.10256410256412,
        "width": 10,
        "height": 11.666666666666668,
        "localPctX": 0.38461538461538475,
        "localPctY": -0.025641025641025245,
        "localPctW": 0.2564102564102564,
        "localPctH": 0.33333333333333337,
        "text": "",
        "pathD": "M 1 11 C 1 11, 2 12, 5 12 C 7 12, 8 11, 8 11 C 9 11, 9 10, 9 10 L 9 1 C 9 1, 8 1, 8 1 L 1 1 C 1 1, 1 1, 1 1 L 1 10 C 1 10, 1 11, 1 11 Z M 2 2 L 7 2 L 7 10 C 7 10, 6 10, 5 10 C 4 10, 3 10, 2 10 L 2 2 L 2 2 Z"
      },
      {
        "id": "sp-251",
        "x": 78.87179487179488,
        "y": 228.35897435897436,
        "width": 16.153846153846153,
        "height": 16.153846153846153,
        "localPctX": 0.28205128205128216,
        "localPctY": 0.4102564102564104,
        "localPctW": 0.4615384615384615,
        "localPctH": 0.4615384615384615,
        "text": "",
        "pathD": "M 4 12 C 2 12, 1 13, 1 15 C 1 15, 3 16, 7 16 L 8 13 L 7 12 C 7 12, 7 12, 7 12 L 8 11 C 8 11, 8 11, 8 11 L 9 12 C 9 12, 9 12, 9 12 L 9 13 L 9 16 C 13 16, 16 15, 16 15 C 16 13, 14 12, 12 12 C 11 12, 10 11, 10 9 C 11 9, 11 7, 11 7 C 11 7, 12 7, 12 6 C 12 5, 12 5, 12 5 C 12 5, 12 5, 12 4 C 12 2, 10 1, 8 1 C 6 1, 4 2, 4 4 C 4 5, 4 5, 4 5 C 4 5, 4 5, 4 6 C 4 7, 5 7, 5 7 C 5 7, 5 9, 6 9 C 6 11, 5 12, 4 12 Z"
      },
      {
        "id": "sp-252",
        "x": 85.15384615384616,
        "y": 215.7948717948718,
        "width": 10,
        "height": 10,
        "localPctX": 0.46153846153846173,
        "localPctY": 0.0512820512820513,
        "localPctW": 0.07692307692307693,
        "localPctH": 0.07692307692307693,
        "text": "",
        "pathD": "M 3 2 C 3 2, 2 3, 2 3 C 1 3, 1 2, 1 2 C 1 1, 1 1, 2 1 C 2 1, 3 1, 3 2 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 18,
    "x": 69,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-288",
    "isGroup": true,
    "children": [
      {
        "id": "sp-253",
        "x": 163.7179487179487,
        "y": 219.3846153846154,
        "width": 10,
        "height": 10,
        "localPctX": 0.82051282051282,
        "localPctY": 0.1538461538461539,
        "localPctW": 0.05128205128205129,
        "localPctH": 0.05128205128205129,
        "text": "",
        "pathD": "M 1 1 C 1 1, 1 1, 0 0 L 0 2 C 1 2, 1 2, 1 1 Z"
      },
      {
        "id": "sp-254",
        "x": 161.9230769230769,
        "y": 216.6923076923077,
        "width": 10,
        "height": 10,
        "localPctX": 0.7692307692307687,
        "localPctY": 0.07692307692307736,
        "localPctW": 0.05128205128205129,
        "localPctH": 0.05128205128205129,
        "text": "",
        "pathD": "M 2 0 C 1 0, 1 1, 1 1 C 1 1, 1 2, 2 2 L 2 0 L 2 0 Z"
      },
      {
        "id": "sp-255",
        "x": 157.43589743589743,
        "y": 213.10256410256412,
        "width": 11.666666666666668,
        "height": 11.666666666666668,
        "localPctX": 0.6410256410256409,
        "localPctY": -0.025641025641025245,
        "localPctW": 0.33333333333333337,
        "localPctH": 0.33333333333333337,
        "text": "",
        "pathD": "M 6 11 C 9 11, 11 9, 11 6 C 11 3, 9 1, 6 1 C 3 1, 1 3, 1 6 C 1 9, 3 11, 6 11 Z M 4 5 C 4 3, 5 3, 6 3 L 6 2 C 6 2, 6 2, 6 2 C 6 2, 6 2, 6 2 L 6 3 C 7 3, 8 3, 8 4 C 8 4, 8 5, 8 5 C 7 5, 7 4, 6 4 L 6 5 C 7 6, 8 6, 8 7 C 8 8, 8 9, 6 9 L 6 10 C 6 10, 6 10, 6 10 C 6 10, 6 10, 6 10 L 6 9 C 4 9, 3 8, 3 8 C 3 7, 4 7, 4 7 C 5 7, 4 8, 6 8 L 6 6 C 4 6, 4 6, 4 5 Z"
      },
      {
        "id": "sp-256",
        "x": 135,
        "y": 238.23076923076925,
        "width": 10,
        "height": 10.76923076923077,
        "localPctX": 0,
        "localPctY": 0.692307692307693,
        "localPctW": 0.2564102564102564,
        "localPctH": 0.3076923076923077,
        "text": "",
        "pathD": "M 7 1 L 2 1 C 1 1, 1 1, 1 2 L 1 9 C 1 10, 1 11, 2 11 L 7 11 C 8 11, 9 10, 9 9 L 9 2 C 9 1, 8 1, 7 1 Z"
      },
      {
        "id": "sp-257",
        "x": 146.66666666666666,
        "y": 232.84615384615387,
        "width": 10,
        "height": 16.153846153846153,
        "localPctX": 0.33333333333333304,
        "localPctY": 0.5384615384615391,
        "localPctW": 0.2564102564102564,
        "localPctH": 0.4615384615384615,
        "text": "",
        "pathD": "M 7 1 L 2 1 C 1 1, 1 1, 1 2 L 1 15 C 1 16, 1 16, 2 16 L 7 16 C 8 16, 9 16, 9 15 L 9 2 C 9 1, 8 1, 7 1 Z"
      },
      {
        "id": "sp-258",
        "x": 159.23076923076923,
        "y": 225.66666666666669,
        "width": 10,
        "height": 23.333333333333336,
        "localPctX": 0.6923076923076922,
        "localPctY": 0.33333333333333387,
        "localPctW": 0.2564102564102564,
        "localPctH": 0.6666666666666667,
        "text": "",
        "pathD": "M 7 1 L 2 1 C 1 1, 1 1, 1 2 L 1 21 C 1 22, 1 23, 2 23 L 7 23 C 8 23, 9 22, 9 21 L 9 2 C 9 1, 8 1, 7 1 Z"
      },
      {
        "id": "sp-259",
        "x": 134.1025641025641,
        "y": 220.2820512820513,
        "width": 23.333333333333336,
        "height": 14.35897435897436,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.17948717948717996,
        "localPctW": 0.6666666666666667,
        "localPctH": 0.4102564102564103,
        "text": "",
        "pathD": "M 23 1 L 19 1 C 18 1, 18 1, 18 1 C 18 1, 18 1, 18 2 L 19 3 L 1 13 C 1 13, 0 13, 1 14 C 1 14, 1 14, 1 14 C 1 14, 2 14, 2 14 L 19 5 L 20 6 C 20 7, 21 7, 21 7 C 21 7, 21 7, 21 7 C 21 7, 22 7, 22 6 L 23 3 C 23 2, 23 2, 23 2 C 23 2, 23 1, 23 1 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 19,
    "x": 135,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-296",
    "isGroup": true,
    "children": [
      {
        "id": "sp-260",
        "x": 199.1025641025641,
        "y": 213.10256410256412,
        "width": 35.8974358974359,
        "height": 35.8974358974359,
        "localPctX": -0.025641025641026056,
        "localPctY": -0.025641025641025245,
        "localPctW": 1.0256410256410255,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 18 1 C 8 1, 1 8, 1 18 C 1 22, 2 26, 4 29 C 4 29, 4 29, 4 29 C 5 29, 6 28, 7 27 C 7 27, 7 27, 7 27 C 7 26, 8 26, 9 25 C 9 25, 9 25, 10 24 C 9 23, 9 22, 9 21 C 9 20, 10 19, 12 19 L 12 19 C 12 19, 12 18, 12 18 C 12 17, 12 16, 12 15 C 13 16, 15 16, 17 16 L 17 18 L 20 17 L 20 16 C 21 16, 23 16, 24 15 C 24 16, 25 17, 25 18 C 25 18, 25 18, 25 18 C 25 19, 25 20, 25 21 L 24 31 C 23 32, 23 33, 22 33 C 21 34, 21 34, 21 34 C 20 34, 19 33, 18 33 L 18 33 C 17 33, 15 34, 14 35 C 15 35, 17 36, 18 36 C 28 36, 36 28, 36 18 C 36 8, 28 1, 18 1 Z M 5 24 C 4 22, 4 20, 4 18 C 4 16, 4 14, 5 12 C 6 13, 7 14, 9 14 C 9 16, 9 17, 9 18 C 9 19, 9 21, 9 22 C 7 22, 6 23, 5 24 Z M 9 11 C 8 11, 7 10, 7 10 C 8 8, 10 6, 11 5 C 11 7, 10 9, 9 11 Z M 17 13 C 15 13, 14 12, 12 12 C 13 8, 15 5, 17 4 L 17 13 Z M 20 13 L 20 4 C 21 5, 23 8, 24 12 C 23 12, 21 13, 20 13 Z M 25 5 C 27 6, 28 8, 30 10 C 29 10, 28 11, 27 11 C 26 9, 26 7, 25 5 Z M 25 31 C 26 29, 26 27, 27 25 C 28 26, 29 26, 30 27 C 28 28, 27 30, 25 31 Z M 28 22 C 28 21, 28 19, 28 18 C 28 17, 28 16, 28 14 C 29 14, 30 13, 31 12 C 32 14, 33 16, 33 18 C 33 20, 32 22, 31 24 C 30 23, 29 22, 28 22 Z"
      },
      {
        "id": "sp-261",
        "x": 200,
        "y": 231.05128205128207,
        "width": 23.333333333333336,
        "height": 17.05128205128205,
        "localPctX": 0,
        "localPctY": 0.4871794871794878,
        "localPctW": 0.6666666666666667,
        "localPctH": 0.48717948717948717,
        "text": "",
        "pathD": "M 19 13 C 19 14, 19 14, 20 14 C 20 14, 20 14, 20 14 C 21 14, 21 13, 21 12 L 23 2 C 23 2, 23 1, 23 1 C 22 1, 22 0, 21 1 L 11 2 C 10 2, 10 3, 10 3 C 10 4, 10 4, 10 5 L 11 6 C 9 9, 5 12, 3 12 C 3 12, 3 12, 3 12 C 2 12, 1 12, 1 12 C 0 13, 0 14, 1 14 C 2 16, 4 17, 7 17 C 11 17, 15 14, 18 12 L 19 13 Z M 7 15 C 5 15, 3 14, 2 13 C 3 14, 3 14, 3 14 C 7 14, 12 8, 13 6 L 13 6 L 11 4 L 22 2 L 20 12 L 18 10 L 17 11 C 16 12, 11 15, 7 15 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 20,
    "x": 200,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-299",
    "isGroup": true,
    "children": [
      {
        "id": "sp-262",
        "x": 283.94871794871796,
        "y": 223.8717948717949,
        "width": 10,
        "height": 10,
        "localPctX": 0.512820512820513,
        "localPctY": 0.28205128205128255,
        "localPctW": 0.15384615384615385,
        "localPctH": 0.15384615384615385,
        "text": "",
        "pathD": "M 1 3 C 1 4, 2 5, 3 5 C 4 5, 5 4, 5 3 C 5 2, 4 1, 3 1 C 2 1, 1 2, 1 3 Z"
      },
      {
        "id": "sp-263",
        "x": 277.6666666666667,
        "y": 224.76923076923077,
        "width": 19.743589743589745,
        "height": 24.23076923076923,
        "localPctX": 0.33333333333333387,
        "localPctY": 0.3076923076923078,
        "localPctW": 0.5641025641025641,
        "localPctH": 0.6923076923076923,
        "text": "",
        "pathD": "M 19 1 C 19 0, 18 0, 17 1 L 11 5 L 10 5 C 10 5, 10 6, 10 6 L 10 10 L 9 11 L 8 10 L 9 6 C 9 6, 8 5, 8 5 L 7 5 L 2 2 L 1 4 L 6 8 C 6 8, 6 8, 7 8 L 7 14 L 4 23 C 4 23, 4 24, 5 24 C 5 24, 5 24, 6 24 C 6 24, 7 24, 7 23 L 9 15 L 12 23 C 12 24, 12 24, 13 24 C 13 24, 13 24, 13 24 C 14 24, 14 23, 14 23 L 12 14 L 12 8 C 12 8, 12 8, 13 8 L 19 3 C 20 2, 20 2, 19 1 Z"
      },
      {
        "id": "sp-264",
        "x": 269.5897435897436,
        "y": 213.10256410256412,
        "width": 19.743589743589745,
        "height": 20.641025641025642,
        "localPctX": 0.1025641025641026,
        "localPctY": -0.025641025641025245,
        "localPctW": 0.5641025641025641,
        "localPctH": 0.5897435897435898,
        "text": "",
        "pathD": "M 6 16 L 12 10 C 14 11, 16 11, 18 9 C 20 7, 20 4, 18 2 C 16 0, 13 0, 11 2 C 10 4, 9 6, 10 8 L 1 17 C 0 18, 0 19, 1 19 C 1 20, 2 20, 2 20 C 2 20, 3 20, 3 19 L 4 18 L 6 20 C 6 20, 6 21, 6 21 C 7 21, 7 20, 7 20 C 8 20, 8 19, 7 18 L 6 16 Z M 13 4 C 14 3, 15 3, 16 4 C 17 5, 17 6, 16 7 C 16 8, 14 8, 13 7 C 12 6, 12 5, 13 4 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 21,
    "x": 266,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-303",
    "isGroup": true,
    "children": [
      {
        "id": "sp-265",
        "x": 330.10256410256414,
        "y": 213.10256410256412,
        "width": 35.8974358974359,
        "height": 21.53846153846154,
        "localPctX": -0.025641025641024433,
        "localPctY": -0.025641025641025245,
        "localPctW": 1.0256410256410255,
        "localPctH": 0.6153846153846154,
        "text": "",
        "pathD": "M 34 1 L 2 1 C 1 1, 1 1, 1 2 L 1 22 C 1 21, 2 21, 2 21 L 4 21 L 4 20 L 9 20 C 9 20, 9 20, 9 20 C 9 19, 9 19, 9 19 L 4 19 L 4 10 L 9 10 L 9 15 C 9 15, 10 16, 10 16 L 14 16 C 15 16, 15 15, 15 15 C 15 14, 15 14, 14 14 L 11 14 L 11 9 C 11 9, 11 8, 10 8 L 4 8 L 4 4 L 14 4 L 14 11 C 14 11, 14 12, 15 12 C 15 12, 16 11, 16 11 L 16 4 L 23 4 L 23 8 L 21 8 C 20 8, 20 9, 20 9 C 20 10, 20 10, 21 10 L 28 10 C 28 10, 29 10, 29 9 C 29 9, 28 8, 28 8 L 25 8 L 25 4 L 33 4 L 33 9 C 33 10, 33 10, 33 10 L 36 12 L 36 2 C 36 1, 35 1, 34 1 Z"
      },
      {
        "id": "sp-266",
        "x": 330.10256410256414,
        "y": 229.25641025641028,
        "width": 35.8974358974359,
        "height": 19.743589743589745,
        "localPctX": -0.025641025641024433,
        "localPctY": 0.43589743589743646,
        "localPctW": 1.0256410256410255,
        "localPctH": 0.5641025641025641,
        "text": "",
        "pathD": "M 33 3 L 33 6 L 27 6 L 27 3 C 27 2, 27 2, 26 2 C 26 2, 25 2, 25 3 L 25 12 C 25 13, 26 13, 26 13 C 27 13, 27 13, 27 12 L 27 7 L 33 7 L 33 16 L 20 16 L 20 10 L 22 10 C 23 10, 23 9, 23 9 C 23 9, 23 8, 22 8 L 19 8 C 18 8, 18 9, 18 9 L 18 12 L 11 12 C 11 12, 10 13, 10 13 C 10 13, 11 14, 11 14 L 18 14 L 18 16 L 4 16 L 4 11 L 2 11 C 2 11, 1 11, 1 11 L 1 18 C 1 19, 1 19, 2 19 L 34 19 C 35 19, 36 19, 36 18 L 36 1 L 33 2 C 33 3, 33 3, 33 3 Z"
      },
      {
        "id": "sp-267",
        "x": 330.10256410256414,
        "y": 223.8717948717949,
        "width": 35.8974358974359,
        "height": 15.256410256410257,
        "localPctX": -0.025641025641024433,
        "localPctY": 0.28205128205128255,
        "localPctW": 1.0256410256410255,
        "localPctH": 0.4358974358974359,
        "text": "",
        "pathD": "M 35 3 L 32 1 C 32 1, 31 0, 31 1 C 30 1, 30 1, 30 2 L 30 2 L 21 2 C 20 2, 19 3, 19 4 L 19 8 L 14 8 C 13 8, 13 9, 13 10 L 13 12 L 2 12 C 1 12, 1 13, 1 14 C 1 15, 1 15, 2 15 L 14 15 C 15 15, 16 15, 16 14 L 16 12 L 21 12 C 22 12, 22 11, 22 10 L 22 5 L 30 5 L 30 6 C 30 6, 30 7, 31 7 C 31 7, 31 7, 31 7 C 32 7, 32 7, 32 7 L 35 5 C 36 5, 36 4, 36 4 C 36 3, 36 3, 35 3 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 22,
    "x": 331,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-307",
    "isGroup": true,
    "children": [
      {
        "id": "sp-268",
        "x": 403.28205128205127,
        "y": 218.4871794871795,
        "width": 22.435897435897438,
        "height": 30.512820512820515,
        "localPctX": 0.17948717948717915,
        "localPctY": 0.12820512820512867,
        "localPctW": 0.6410256410256411,
        "localPctH": 0.8717948717948718,
        "text": "",
        "pathD": "M 11 1 C 5 1, 1 5, 1 11 C 1 15, 2 17, 3 18 C 4 19, 4 20, 4 21 C 4 22, 5 23, 6 24 C 6 25, 6 27, 6 27 C 6 27, 6 27, 6 27 C 6 27, 7 28, 9 29 C 9 29, 9 30, 9 30 C 10 30, 10 30, 10 30 L 12 30 C 13 30, 13 30, 13 30 C 13 30, 14 29, 14 29 C 16 28, 16 27, 16 27 C 16 27, 16 25, 16 24 C 18 23, 18 22, 18 21 C 18 20, 19 19, 19 18 C 20 17, 22 15, 22 11 C 22 5, 17 1, 11 1 Z M 17 17 C 16 18, 16 19, 16 21 C 16 21, 15 22, 15 22 L 8 22 C 8 22, 7 21, 7 21 C 7 19, 6 18, 5 17 C 4 15, 3 14, 3 11 C 3 7, 7 3, 11 3 C 16 3, 19 7, 19 11 C 19 14, 18 15, 17 17 Z"
      },
      {
        "id": "sp-269",
        "x": 413.15384615384613,
        "y": 213.10256410256412,
        "width": 10,
        "height": 10,
        "localPctX": 0.4615384615384609,
        "localPctY": -0.025641025641025245,
        "localPctW": 0.05128205128205129,
        "localPctH": 0.1282051282051282,
        "text": "",
        "pathD": "M 1 4 C 1 4, 2 4, 2 3 L 2 1 C 2 1, 1 1, 1 1 C 1 1, 0 1, 0 1 L 0 3 C 0 4, 1 4, 1 4 Z"
      },
      {
        "id": "sp-270",
        "x": 405.97435897435895,
        "y": 215.7948717948718,
        "width": 10,
        "height": 10,
        "localPctX": 0.2564102564102557,
        "localPctY": 0.0512820512820513,
        "localPctW": 0.07692307692307693,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 1 3 C 2 3, 2 4, 2 4 C 2 4, 2 3, 2 3 C 3 3, 3 3, 3 3 L 2 1 C 1 1, 1 0, 1 1 C 1 1, 0 1, 1 2 L 1 3 Z"
      },
      {
        "id": "sp-271",
        "x": 399.6923076923077,
        "y": 221.17948717948718,
        "width": 10,
        "height": 10,
        "localPctX": 0.07692307692307655,
        "localPctY": 0.2051282051282052,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.07692307692307693,
        "text": "",
        "pathD": "M 3 1 L 2 1 C 1 0, 1 1, 1 1 C 0 1, 1 1, 1 2 L 3 3 C 3 3, 3 3, 3 3 C 3 3, 3 3, 3 2 C 4 2, 4 2, 3 1 Z"
      },
      {
        "id": "sp-272",
        "x": 397.8974358974359,
        "y": 228.35897435897436,
        "width": 10,
        "height": 10,
        "localPctX": 0.025641025641026056,
        "localPctY": 0.4102564102564104,
        "localPctW": 0.1282051282051282,
        "localPctH": 0.05128205128205129,
        "text": "",
        "pathD": "M 4 1 C 4 1, 4 0, 3 0 L 1 0 C 1 0, 1 1, 1 1 C 1 1, 1 2, 1 2 L 3 2 C 4 2, 4 1, 4 1 Z"
      },
      {
        "id": "sp-273",
        "x": 399.6923076923077,
        "y": 234.64102564102566,
        "width": 10,
        "height": 10,
        "localPctX": 0.07692307692307655,
        "localPctY": 0.5897435897435904,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.07692307692307693,
        "text": "",
        "pathD": "M 3 1 L 1 1 C 1 2, 0 2, 1 2 C 1 3, 1 3, 1 3 C 1 3, 1 3, 2 3 L 3 2 C 4 1, 4 1, 3 1 C 3 1, 3 0, 3 1 Z"
      },
      {
        "id": "sp-274",
        "x": 424.8205128205128,
        "y": 234.64102564102566,
        "width": 10,
        "height": 10,
        "localPctX": 0.7948717948717948,
        "localPctY": 0.5897435897435904,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.07692307692307693,
        "text": "",
        "pathD": "M 3 1 L 2 1 C 1 0, 1 1, 1 1 C 0 1, 1 1, 1 2 L 3 3 C 3 3, 3 3, 3 3 C 3 3, 3 3, 3 2 C 4 2, 4 2, 3 1 Z"
      },
      {
        "id": "sp-275",
        "x": 426.6153846153846,
        "y": 228.35897435897436,
        "width": 10,
        "height": 10,
        "localPctX": 0.8461538461538453,
        "localPctY": 0.4102564102564104,
        "localPctW": 0.1282051282051282,
        "localPctH": 0.05128205128205129,
        "text": "",
        "pathD": "M 3 0 L 1 0 L 1 0 C 1 0, 1 1, 1 1 C 1 1, 1 2, 1 2 L 3 2 L 3 2 C 4 2, 4 1, 4 1 C 4 1, 4 0, 3 0 Z"
      },
      {
        "id": "sp-276",
        "x": 424.8205128205128,
        "y": 221.17948717948718,
        "width": 10,
        "height": 10,
        "localPctX": 0.7948717948717948,
        "localPctY": 0.2051282051282052,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.07692307692307693,
        "text": "",
        "pathD": "M 1 3 C 1 3, 1 3, 2 3 L 3 2 C 4 1, 4 1, 3 1 C 3 1, 3 0, 3 1 L 1 1 C 1 2, 0 2, 1 2 C 1 3, 1 3, 1 3 Z"
      },
      {
        "id": "sp-277",
        "x": 419.43589743589746,
        "y": 215.7948717948718,
        "width": 10,
        "height": 10,
        "localPctX": 0.6410256410256417,
        "localPctY": 0.0512820512820513,
        "localPctW": 0.07692307692307693,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 1 3 C 1 3, 1 4, 1 4 C 1 4, 2 3, 2 3 L 3 2 C 3 1, 3 1, 2 1 C 2 0, 2 1, 1 1 L 1 3 C 0 3, 1 3, 1 3 Z"
      },
      {
        "id": "sp-278",
        "x": 412.2564102564103,
        "y": 223.8717948717949,
        "width": 10,
        "height": 10.76923076923077,
        "localPctX": 0.43589743589743646,
        "localPctY": 0.28205128205128255,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.3076923076923077,
        "text": "",
        "pathD": "M 1 10 C 1 10, 2 11, 2 11 C 3 11, 3 10, 3 10 L 4 5 C 4 5, 4 5, 4 4 L 4 2 C 4 1, 3 1, 2 1 C 1 1, 1 1, 1 2 L 1 4 C 1 5, 1 5, 1 5 L 1 10 Z"
      },
      {
        "id": "sp-279",
        "x": 412.2564102564103,
        "y": 235.53846153846155,
        "width": 10,
        "height": 10,
        "localPctX": 0.43589743589743646,
        "localPctY": 0.6153846153846156,
        "localPctW": 0.1282051282051282,
        "localPctH": 0.1282051282051282,
        "text": "",
        "pathD": "M 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 C 3 4, 4 3, 4 2 C 4 1, 3 1, 2 1 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 23,
    "x": 397,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-320",
    "isGroup": true,
    "children": [
      {
        "id": "sp-280",
        "x": 463,
        "y": 213.10256410256412,
        "width": 35.8974358974359,
        "height": 35.8974358974359,
        "localPctX": 0,
        "localPctY": -0.025641025641025245,
        "localPctW": 1.0256410256410255,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 35 33 L 30 28 C 30 27, 29 27, 29 27 L 28 26 C 30 24, 32 20, 32 16 C 32 12, 30 8, 27 5 C 24 2, 20 1, 16 1 C 12 1, 8 2, 5 5 C -1 11, -1 21, 5 27 C 8 30, 12 32, 16 32 C 20 32, 24 30, 26 28 L 27 29 C 27 29, 27 30, 28 30 L 33 35 C 33 36, 34 36, 34 36 C 35 36, 35 36, 35 35 C 36 35, 36 34, 35 33 Z M 16 29 C 13 29, 10 27, 7 25 C 3 20, 3 12, 7 7 C 10 5, 13 4, 16 4 C 19 4, 23 5, 25 7 C 27 10, 29 13, 29 16 C 29 19, 27 23, 25 25 C 23 27, 19 29, 16 29 Z"
      },
      {
        "id": "sp-281",
        "x": 476.4615384615385,
        "y": 228.35897435897436,
        "width": 11.666666666666668,
        "height": 10.76923076923077,
        "localPctX": 0.38461538461538597,
        "localPctY": 0.4102564102564104,
        "localPctW": 0.33333333333333337,
        "localPctH": 0.3076923076923077,
        "text": "",
        "pathD": "M 11 5 L 6 1 C 6 1, 6 1, 6 1 C 5 1, 5 1, 5 1 L 5 3 L 1 3 C 1 3, 1 4, 1 4 L 1 7 C 1 8, 1 8, 1 8 L 5 8 L 5 10 C 5 10, 5 10, 6 10 C 6 10, 6 10, 6 10 C 6 10, 6 10, 6 10 L 11 6 C 11 6, 11 6, 11 6 C 11 5, 11 5, 11 5 Z"
      },
      {
        "id": "sp-282",
        "x": 468.3846153846154,
        "y": 220.2820512820513,
        "width": 11.666666666666668,
        "height": 10.76923076923077,
        "localPctX": 0.15384615384615472,
        "localPctY": 0.17948717948717996,
        "localPctW": 0.33333333333333337,
        "localPctH": 0.3076923076923077,
        "text": "",
        "pathD": "M 11 7 L 11 4 C 11 4, 11 3, 11 3 L 7 3 L 7 1 C 7 1, 7 1, 6 1 C 6 1, 6 1, 6 1 L 1 5 C 1 5, 1 5, 1 6 C 1 6, 1 6, 1 6 L 6 10 C 6 10, 6 10, 6 10 C 6 10, 6 10, 6 10 C 7 10, 7 10, 7 10 L 7 8 L 11 8 C 11 8, 11 8, 11 7 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 24,
    "x": 463,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-324",
    "isGroup": true,
    "children": [
      {
        "id": "sp-283",
        "x": 538.7692307692307,
        "y": 214.8974358974359,
        "width": 10,
        "height": 10,
        "localPctX": 0.3076923076923062,
        "localPctY": 0.025641025641026056,
        "localPctW": 0.20512820512820515,
        "localPctH": 0.23076923076923075,
        "text": "",
        "pathD": "M 6 8 C 7 8, 7 7, 7 6 L 7 2 C 7 1, 7 1, 6 1 C 5 1, 4 1, 4 2 L 4 3 L 1 3 L 1 6 L 4 6 C 4 7, 5 8, 6 8 Z"
      },
      {
        "id": "sp-284",
        "x": 547.7435897435897,
        "y": 214.8974358974359,
        "width": 10,
        "height": 10,
        "localPctX": 0.5641025641025635,
        "localPctY": 0.025641025641026056,
        "localPctW": 0.20512820512820515,
        "localPctH": 0.23076923076923075,
        "text": "",
        "pathD": "M 6 8 C 7 8, 7 7, 7 6 L 7 2 C 7 1, 7 1, 6 1 C 5 1, 4 1, 4 2 L 4 3 L 1 3 L 1 6 L 4 6 C 4 7, 5 8, 6 8 Z"
      },
      {
        "id": "sp-285",
        "x": 527.1025641025641,
        "y": 214.8974358974359,
        "width": 35.8974358974359,
        "height": 30.512820512820515,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.025641025641026056,
        "localPctW": 1.0256410256410255,
        "localPctH": 0.8717948717948718,
        "text": "",
        "pathD": "M 34 3 L 30 3 L 30 6 L 33 6 L 33 11 L 4 11 L 4 6 L 8 6 C 8 7, 9 8, 10 8 C 10 8, 11 7, 11 6 L 11 2 C 11 1, 10 1, 10 1 C 9 1, 8 1, 8 2 L 8 3 L 2 3 C 1 3, 1 4, 1 5 L 1 28 C 1 29, 1 30, 2 30 L 10 30 C 10 29, 9 28, 9 27 L 4 27 L 4 12 L 33 12 L 33 27 L 27 27 C 27 28, 27 29, 26 30 L 34 30 C 35 30, 36 29, 36 28 L 36 5 C 36 4, 35 3, 34 3 Z"
      },
      {
        "id": "sp-286",
        "x": 543.2564102564103,
        "y": 232.84615384615387,
        "width": 10,
        "height": 10,
        "localPctX": 0.43589743589743646,
        "localPctY": 0.5384615384615391,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.28205128205128205,
        "text": "",
        "pathD": "M 6 8 L 3 7 C 3 6, 3 6, 3 6 L 3 1 C 3 1, 2 1, 2 1 C 2 1, 1 1, 1 1 L 1 6 C 1 6, 1 6, 1 7 C 1 8, 1 8, 2 8 C 2 8, 2 8, 2 8 L 5 9 C 5 10, 5 10, 6 10 C 6 10, 6 9, 6 9 C 6 9, 6 8, 6 8 Z M 2 7 C 2 7, 1 7, 1 7 C 1 7, 2 6, 2 6 C 2 6, 2 7, 2 7 C 2 7, 2 7, 2 7 Z"
      },
      {
        "id": "sp-287",
        "x": 536.974358974359,
        "y": 231.05128205128207,
        "width": 16.153846153846153,
        "height": 16.153846153846153,
        "localPctX": 0.25641025641025733,
        "localPctY": 0.4871794871794878,
        "localPctW": 0.4615384615384615,
        "localPctH": 0.4615384615384615,
        "text": "",
        "pathD": "M 8 1 C 4 1, 1 4, 1 8 C 1 13, 4 16, 8 16 C 13 16, 16 13, 16 8 C 16 4, 13 1, 8 1 Z M 8 15 C 5 15, 2 12, 2 8 C 2 5, 5 2, 8 2 C 12 2, 15 5, 15 8 C 15 12, 12 15, 8 15 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 25,
    "x": 528,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-330",
    "isGroup": true,
    "children": [
      {
        "id": "sp-288",
        "x": 593.1025641025641,
        "y": 221.17948717948718,
        "width": 27.82051282051282,
        "height": 22.435897435897438,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.2051282051282052,
        "localPctW": 0.7948717948717949,
        "localPctH": 0.6410256410256411,
        "text": "",
        "pathD": "M 27 16 L 24 3 L 24 2 C 24 1, 23 0, 22 1 C 21 1, 20 2, 20 2 L 2 12 C 2 12, 1 12, 1 12 C 1 12, 0 13, 1 13 L 1 15 L 2 17 L 2 18 C 2 19, 3 19, 3 19 C 3 19, 4 19, 4 18 L 5 18 C 5 21, 7 22, 10 22 C 10 22, 10 22, 11 22 C 12 22, 12 22, 13 21 C 14 20, 14 19, 14 18 L 24 18 C 25 19, 26 19, 26 19 C 27 18, 28 17, 28 17 L 27 16 Z M 12 20 C 11 20, 10 21, 10 21 C 8 21, 7 20, 7 18 L 12 18 C 12 19, 12 19, 12 20 Z M 5 15 L 21 6 L 23 14 L 5 15 Z"
      },
      {
        "id": "sp-289",
        "x": 621.8205128205128,
        "y": 226.56410256410257,
        "width": 10,
        "height": 10,
        "localPctX": 0.7948717948717948,
        "localPctY": 0.35897435897435914,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 2 3 L 6 2 C 6 2, 6 2, 6 1 C 6 1, 6 0, 5 1 L 1 2 C 1 2, 0 2, 1 3 C 1 3, 1 3, 2 3 Z"
      },
      {
        "id": "sp-290",
        "x": 621.8205128205128,
        "y": 233.74358974358975,
        "width": 10,
        "height": 10,
        "localPctX": 0.7948717948717948,
        "localPctY": 0.5641025641025643,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 6 2 L 2 1 C 1 0, 1 1, 1 1 C 0 2, 1 2, 1 2 L 5 3 C 5 3, 5 3, 6 3 C 6 3, 6 3, 6 3 C 6 2, 6 2, 6 2 Z"
      },
      {
        "id": "sp-291",
        "x": 619.1282051282051,
        "y": 219.3846153846154,
        "width": 10,
        "height": 10,
        "localPctX": 0.7179487179487166,
        "localPctY": 0.1538461538461539,
        "localPctW": 0.1794871794871795,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 2 6 C 2 6, 2 6, 2 5 L 5 2 C 6 2, 6 1, 5 1 C 5 0, 5 0, 4 1 L 1 4 C 0 5, 0 5, 1 5 C 1 6, 1 6, 2 6 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 26,
    "x": 594,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-335",
    "isGroup": true,
    "children": [
      {
        "id": "sp-292",
        "x": 659,
        "y": 213.10256410256412,
        "width": 35.8974358974359,
        "height": 35.8974358974359,
        "localPctX": 0,
        "localPctY": -0.025641025641025245,
        "localPctW": 1.0256410256410255,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 34 17 L 33 17 C 32 10, 27 4, 19 3 L 19 2 C 19 1, 19 1, 18 1 C 17 1, 17 1, 17 2 L 17 3 C 10 4, 4 10, 3 17 L 2 17 C 1 17, 1 17, 1 18 C 1 19, 1 19, 2 19 L 3 19 C 4 27, 10 32, 17 33 L 17 34 C 17 35, 17 36, 18 36 C 19 36, 19 35, 19 34 L 19 33 C 27 32, 32 27, 33 19 L 34 19 C 35 19, 36 19, 36 18 C 36 17, 35 17, 34 17 Z M 17 6 L 17 7 C 17 8, 17 9, 18 9 C 19 9, 19 8, 19 7 L 19 6 C 24 7, 28 10, 30 15 C 27 13, 23 10, 18 10 C 13 10, 9 13, 6 15 C 8 10, 12 7, 17 6 Z M 13 18 C 13 15, 15 13, 18 13 C 21 13, 24 15, 24 18 C 24 21, 21 24, 18 24 C 15 24, 13 21, 13 18 Z M 11 21 C 9 20, 7 19, 7 18 C 7 17, 9 16, 11 15 C 10 16, 10 17, 10 18 C 10 19, 10 20, 11 21 Z M 26 15 C 27 16, 29 17, 30 18 C 29 19, 27 20, 26 21 C 26 20, 26 19, 26 18 C 26 17, 26 16, 26 15 Z M 19 30 L 19 29 C 19 28, 19 28, 18 28 C 17 28, 17 28, 17 29 L 17 30 C 12 30, 8 26, 6 22 C 9 24, 13 26, 18 26 C 23 26, 27 24, 30 22 C 28 26, 24 30, 19 30 Z"
      },
      {
        "id": "sp-293",
        "x": 672.4615384615386,
        "y": 227.46153846153848,
        "width": 10,
        "height": 10,
        "localPctX": 0.38461538461538763,
        "localPctY": 0.3846153846153852,
        "localPctW": 0.20512820512820515,
        "localPctH": 0.20512820512820515,
        "text": "",
        "pathD": "M 7 4 C 7 6, 6 7, 4 7 C 2 7, 1 6, 1 4 C 1 2, 2 1, 4 1 C 6 1, 7 2, 7 4 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 27,
    "x": 659,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-338",
    "isGroup": true,
    "children": [
      {
        "id": "sp-294",
        "x": 724.1025641025641,
        "y": 213.10256410256412,
        "width": 35.8974358974359,
        "height": 35.8974358974359,
        "localPctX": -0.025641025641026056,
        "localPctY": -0.025641025641025245,
        "localPctW": 1.0256410256410255,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 34 1 L 11 1 C 10 1, 10 1, 10 2 L 10 17 L 2 17 C 1 17, 1 17, 1 18 L 1 34 C 1 35, 1 36, 2 36 L 17 36 L 34 36 C 35 36, 36 35, 36 34 L 36 18 L 36 2 C 36 1, 35 1, 34 1 Z M 13 4 L 33 4 L 33 15 L 26 12 C 26 12, 25 12, 25 12 L 17 17 L 13 17 L 13 4 L 13 4 Z M 4 20 L 11 20 L 16 20 L 16 33 L 4 33 L 4 20 Z M 33 33 L 19 33 L 19 19 L 26 15 L 33 19 L 33 33 L 33 33 Z"
      },
      {
        "id": "sp-295",
        "x": 728.5897435897436,
        "y": 234.64102564102566,
        "width": 10,
        "height": 10,
        "localPctX": 0.10256410256410423,
        "localPctY": 0.5897435897435904,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 3 1 L 1 1 C 1 1, 1 1, 1 1 L 1 3 C 1 3, 1 4, 1 4 L 3 4 C 3 4, 4 3, 4 3 L 4 1 C 4 1, 3 1, 3 1 Z"
      },
      {
        "id": "sp-296",
        "x": 733.974358974359,
        "y": 234.64102564102566,
        "width": 10,
        "height": 10,
        "localPctX": 0.25641025641025733,
        "localPctY": 0.5897435897435904,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 3 1 L 1 1 C 1 1, 1 1, 1 1 L 1 3 C 1 3, 1 4, 1 4 L 3 4 C 3 4, 4 3, 4 3 L 4 1 C 4 1, 3 1, 3 1 Z"
      },
      {
        "id": "sp-297",
        "x": 728.5897435897436,
        "y": 240.02564102564102,
        "width": 10,
        "height": 10,
        "localPctX": 0.10256410256410423,
        "localPctY": 0.7435897435897435,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 3 1 L 1 1 C 1 1, 1 1, 1 1 L 1 3 C 1 3, 1 4, 1 4 L 3 4 C 3 4, 4 3, 4 3 L 4 1 C 4 1, 3 1, 3 1 Z"
      },
      {
        "id": "sp-298",
        "x": 733.974358974359,
        "y": 240.02564102564102,
        "width": 10,
        "height": 10,
        "localPctX": 0.25641025641025733,
        "localPctY": 0.7435897435897435,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 3 1 L 1 1 C 1 1, 1 1, 1 1 L 1 3 C 1 3, 1 4, 1 4 L 3 4 C 3 4, 4 3, 4 3 L 4 1 C 4 1, 3 1, 3 1 Z"
      },
      {
        "id": "sp-299",
        "x": 744.7435897435897,
        "y": 234.64102564102566,
        "width": 10,
        "height": 10,
        "localPctX": 0.5641025641025635,
        "localPctY": 0.5897435897435904,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 3 1 L 1 1 C 1 1, 1 1, 1 1 L 1 3 C 1 3, 1 4, 1 4 L 3 4 C 3 4, 4 3, 4 3 L 4 1 C 4 1, 3 1, 3 1 Z"
      },
      {
        "id": "sp-300",
        "x": 750.1282051282052,
        "y": 234.64102564102566,
        "width": 10,
        "height": 10,
        "localPctX": 0.7179487179487198,
        "localPctY": 0.5897435897435904,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 1 4 L 3 4 C 3 4, 4 3, 4 3 L 4 1 C 4 1, 3 1, 3 1 L 1 1 C 1 1, 1 1, 1 1 L 1 3 C 1 3, 1 4, 1 4 Z"
      },
      {
        "id": "sp-301",
        "x": 744.7435897435897,
        "y": 240.02564102564102,
        "width": 10,
        "height": 10,
        "localPctX": 0.5641025641025635,
        "localPctY": 0.7435897435897435,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 3 1 L 1 1 C 1 1, 1 1, 1 1 L 1 3 C 1 3, 1 4, 1 4 L 3 4 C 3 4, 4 3, 4 3 L 4 1 C 4 1, 3 1, 3 1 Z"
      },
      {
        "id": "sp-302",
        "x": 750.1282051282052,
        "y": 240.02564102564102,
        "width": 10,
        "height": 10,
        "localPctX": 0.7179487179487198,
        "localPctY": 0.7435897435897435,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 1 4 L 3 4 C 3 4, 4 3, 4 3 L 4 1 C 4 1, 3 1, 3 1 L 1 1 C 1 1, 1 1, 1 1 L 1 3 C 1 3, 1 4, 1 4 Z"
      },
      {
        "id": "sp-303",
        "x": 739.3589743589744,
        "y": 219.3846153846154,
        "width": 10,
        "height": 10,
        "localPctX": 0.4102564102564104,
        "localPctY": 0.1538461538461539,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 1 4 L 3 4 C 3 4, 4 3, 4 3 L 4 1 C 4 1, 3 1, 3 1 L 1 1 C 1 1, 1 1, 1 1 L 1 3 C 1 3, 1 4, 1 4 Z"
      },
      {
        "id": "sp-304",
        "x": 744.7435897435897,
        "y": 219.3846153846154,
        "width": 10,
        "height": 10,
        "localPctX": 0.5641025641025635,
        "localPctY": 0.1538461538461539,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 1 4 L 3 4 C 3 4, 4 3, 4 3 L 4 1 C 4 1, 3 1, 3 1 L 1 1 C 1 1, 1 1, 1 1 L 1 3 C 1 3, 1 4, 1 4 Z"
      },
      {
        "id": "sp-305",
        "x": 739.3589743589744,
        "y": 224.76923076923077,
        "width": 10,
        "height": 10,
        "localPctX": 0.4102564102564104,
        "localPctY": 0.3076923076923078,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 3 4 C 3 4, 4 3, 4 3 L 4 1 C 4 1, 3 1, 3 1 L 1 1 C 1 1, 1 1, 1 1 L 1 3 C 1 3, 1 4, 1 4 L 3 4 Z"
      },
      {
        "id": "sp-306",
        "x": 750.1282051282052,
        "y": 219.3846153846154,
        "width": 10,
        "height": 10,
        "localPctX": 0.7179487179487198,
        "localPctY": 0.1538461538461539,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 1 4 L 3 4 C 3 4, 4 3, 4 3 L 4 1 C 4 1, 3 1, 3 1 L 1 1 C 1 1, 1 1, 1 1 L 1 3 C 1 3, 1 4, 1 4 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 28,
    "x": 725,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-352",
    "isGroup": true,
    "children": [
      {
        "id": "sp-307",
        "x": 614.1025641025641,
        "y": 403.6923076923077,
        "width": 35.8974358974359,
        "height": 28.71794871794872,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.07692307692307655,
        "localPctW": 1.0256410256410255,
        "localPctH": 0.8205128205128206,
        "text": "",
        "pathD": "M 34 6 L 26 6 L 24 1 C 24 1, 24 1, 24 1 L 13 1 C 12 1, 12 1, 12 1 L 10 6 L 2 6 C 1 6, 1 6, 1 7 L 1 27 C 1 28, 1 28, 2 28 L 34 28 C 35 28, 36 28, 36 27 L 36 7 C 36 6, 35 6, 34 6 Z M 31 9 C 28 11, 23 15, 18 15 C 13 15, 8 11, 5 9 L 31 9 Z M 13 2 L 23 2 L 25 6 L 12 6 L 13 2 Z M 4 25 L 4 10 C 7 13, 13 17, 18 17 C 23 17, 29 13, 33 10 L 33 25 L 4 25 Z"
      },
      {
        "id": "sp-308",
        "x": 629.3589743589744,
        "y": 412.66666666666663,
        "width": 10,
        "height": 10,
        "localPctX": 0.4102564102564104,
        "localPctY": 0.33333333333333226,
        "localPctW": 0.1282051282051282,
        "localPctH": 0.1282051282051282,
        "text": "",
        "pathD": "M 5 3 C 5 4, 4 5, 3 5 C 1 5, 1 4, 1 3 C 1 1, 1 1, 3 1 C 4 1, 5 1, 5 3 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 71,
    "x": 615,
    "y": 401,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-355",
    "isGroup": true,
    "children": [
      {
        "id": "sp-309",
        "x": 855.5897435897436,
        "y": 213.10256410256412,
        "width": 27.82051282051282,
        "height": 35.8974358974359,
        "localPctX": 0.10256410256410423,
        "localPctY": -0.025641025641025245,
        "localPctW": 0.7948717948717949,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 27 33 L 27 32 C 27 32, 27 31, 27 31 C 26 31, 22 29, 15 29 L 15 26 C 16 26, 16 25, 16 25 L 16 24 L 22 24 C 22 24, 22 24, 22 24 C 23 24, 24 23, 24 22 C 24 22, 24 22, 24 22 C 25 21, 26 21, 26 21 C 26 21, 26 20, 26 20 L 26 15 L 27 15 C 28 15, 28 15, 28 15 C 28 14, 28 14, 27 14 L 24 14 C 23 14, 23 14, 23 15 C 23 15, 23 15, 24 15 L 25 15 L 25 19 C 24 20, 23 20, 22 20 L 22 20 C 21 19, 21 19, 20 19 C 20 19, 19 19, 16 20 L 16 18 C 19 18, 21 17, 21 17 C 21 17, 22 16, 22 15 L 20 3 C 20 2, 20 2, 19 1 C 19 1, 17 1, 14 1 C 11 1, 9 1, 9 1 C 8 2, 8 2, 8 3 L 7 15 C 7 16, 7 17, 8 17 C 8 17, 9 18, 13 18 L 13 20 C 10 19, 8 19, 8 19 C 8 19, 7 19, 7 20 L 6 20 C 5 20, 4 20, 4 19 L 4 15 L 5 15 C 5 15, 6 15, 6 15 C 6 14, 5 14, 5 14 L 1 14 C 1 14, 1 14, 1 15 C 1 15, 1 15, 1 15 L 2 15 L 2 20 C 2 20, 2 21, 3 21 C 3 21, 3 21, 5 22 C 5 22, 5 22, 5 23 C 5 23, 6 24, 7 24 L 13 24 L 13 25 C 13 25, 13 26, 13 26 L 13 29 C 6 29, 2 31, 2 31 C 2 31, 1 32, 1 32 L 1 33 C 1 33, 1 33, 1 34 C 1 35, 1 36, 2 36 C 3 36, 4 35, 4 34 C 4 33, 4 33, 3 33 L 3 32 C 4 32, 8 31, 13 31 L 13 33 C 13 33, 13 33, 13 34 C 13 35, 13 36, 14 36 C 15 36, 16 35, 16 34 C 16 33, 16 33, 15 33 L 15 31 C 20 31, 24 32, 25 32 L 25 33 C 25 33, 25 33, 25 34 C 25 35, 25 36, 26 36 C 27 36, 28 35, 28 34 C 28 33, 28 33, 27 33 Z M 12 5 C 12 5, 12 5, 14 5 C 16 5, 17 5, 17 5 C 17 5, 17 6, 17 6 C 17 6, 17 6, 17 6 C 17 6, 17 6, 17 6 C 17 6, 16 6, 14 6 C 13 6, 12 6, 12 6 C 12 6, 11 6, 11 6 C 11 6, 11 5, 12 5 Z M 11 8 C 11 8, 12 7, 14 7 C 16 7, 17 8, 17 8 C 18 8, 18 8, 18 8 C 17 9, 17 9, 17 9 C 17 9, 17 9, 17 9 C 17 9, 16 8, 14 8 C 12 8, 11 9, 11 9 C 11 9, 11 9, 11 8 C 11 8, 11 8, 11 8 Z M 14 11 C 12 11, 11 11, 11 11 C 11 11, 11 11, 10 11 C 10 11, 10 11, 11 10 C 11 10, 12 10, 14 10 C 17 10, 18 10, 18 10 C 18 11, 18 11, 18 11 C 18 11, 18 11, 18 11 C 18 11, 17 11, 17 11 C 17 11, 16 11, 14 11 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 30,
    "x": 852,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-357",
    "isGroup": true,
    "children": [
      {
        "id": "sp-310",
        "x": 918,
        "y": 214.8974358974359,
        "width": 35.8974358974359,
        "height": 32.30769230769231,
        "localPctX": 0,
        "localPctY": 0.025641025641026056,
        "localPctW": 1.0256410256410255,
        "localPctH": 0.923076923076923,
        "text": "",
        "pathD": "M 36 14 C 36 14, 35 14, 35 14 L 33 14 C 31 6, 25 1, 17 1 C 8 1, 1 8, 1 17 C 1 25, 8 32, 17 32 C 23 32, 28 29, 31 24 C 31 24, 31 23, 30 23 C 30 22, 29 22, 28 23 C 26 27, 22 30, 17 30 C 9 30, 4 24, 4 17 C 4 9, 9 3, 17 3 C 23 3, 28 8, 30 14 L 28 14 C 27 14, 27 14, 27 14 C 27 14, 27 15, 27 15 L 31 19 C 31 19, 31 19, 31 19 C 31 19, 32 19, 32 19 L 36 15 C 36 15, 36 14, 36 14 Z"
      },
      {
        "id": "sp-311",
        "x": 931.4615384615385,
        "y": 218.4871794871795,
        "width": 11.666666666666668,
        "height": 18.846153846153847,
        "localPctX": 0.38461538461538436,
        "localPctY": 0.12820512820512867,
        "localPctW": 0.33333333333333337,
        "localPctH": 0.5384615384615384,
        "text": "",
        "pathD": "M 3 1 C 2 1, 2 1, 2 2 L 2 11 C 1 12, 1 12, 1 13 C 1 15, 2 16, 3 16 C 3 16, 4 16, 4 16 L 9 19 C 9 19, 10 19, 10 19 C 10 19, 11 18, 11 18 C 12 17, 11 16, 11 16 L 6 13 C 5 12, 5 12, 5 11 L 5 2 C 5 1, 4 1, 3 1 Z M 3 14 C 2 14, 2 14, 2 13 C 2 13, 2 12, 3 12 C 4 12, 4 13, 4 13 C 4 14, 4 14, 3 14 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 31,
    "x": 918,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-360",
    "isGroup": true,
    "children": [
      {
        "id": "sp-312",
        "x": 983,
        "y": 213.10256410256412,
        "width": 35.8974358974359,
        "height": 35.8974358974359,
        "localPctX": 0,
        "localPctY": -0.025641025641025245,
        "localPctW": 1.0256410256410255,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 36 18 C 36 8, 28 1, 18 1 C 8 1, 1 8, 1 18 C 1 28, 8 36, 18 36 C 19 36, 20 35, 20 34 L 20 20 L 34 20 C 35 20, 36 19, 36 18 Z"
      },
      {
        "id": "sp-313",
        "x": 1003.6410256410256,
        "y": 233.74358974358975,
        "width": 15.256410256410257,
        "height": 15.256410256410257,
        "localPctX": 0.5897435897435895,
        "localPctY": 0.5641025641025643,
        "localPctW": 0.4358974358974359,
        "localPctH": 0.4358974358974359,
        "text": "",
        "pathD": "M 14 1 L 1 1 C 1 1, 1 1, 1 1 L 1 14 C 1 15, 1 15, 1 15 C 1 15, 1 15, 1 15 C 1 15, 1 15, 1 15 C 9 14, 14 9, 15 1 C 15 1, 15 1, 15 1 C 15 1, 15 1, 14 1 Z M 2 13 L 2 2 L 13 2 C 12 8, 8 12, 2 13 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 32,
    "x": 983,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-363",
    "isGroup": true,
    "children": [
      {
        "id": "sp-314",
        "x": 1050.7948717948718,
        "y": 213.10256410256412,
        "width": 32.30769230769231,
        "height": 35.8974358974359,
        "localPctX": 0.05128205128205211,
        "localPctY": -0.025641025641025245,
        "localPctW": 0.923076923076923,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 32 2 C 32 1, 31 1, 30 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 3, 1 4 L 1 22 C 2 22, 2 21, 3 20 L 3 4 L 29 4 L 29 21 L 9 21 C 8 22, 8 22, 7 23 L 9 23 L 6 34 C 6 35, 6 35, 7 36 C 8 36, 9 35, 9 35 L 12 24 L 21 24 L 23 35 C 24 35, 24 36, 25 36 C 25 36, 25 36, 25 36 C 26 35, 27 35, 27 34 L 24 23 L 30 23 C 31 23, 31 23, 31 22 L 31 4 C 32 3, 32 3, 32 2 Z"
      },
      {
        "id": "sp-315",
        "x": 1064.2564102564104,
        "y": 223.8717948717949,
        "width": 10,
        "height": 10,
        "localPctX": 0.43589743589743973,
        "localPctY": 0.28205128205128255,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.28205128205128205,
        "text": "",
        "pathD": "M 4 8 L 4 2 C 4 1, 3 1, 2 1 C 1 1, 1 1, 1 2 L 1 8 C 1 9, 1 10, 2 10 C 3 10, 4 9, 4 8 Z"
      },
      {
        "id": "sp-316",
        "x": 1068.7435897435898,
        "y": 217.5897435897436,
        "width": 10,
        "height": 15.256410256410257,
        "localPctX": 0.5641025641025668,
        "localPctY": 0.1025641025641026,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.4358974358974359,
        "text": "",
        "pathD": "M 4 13 L 4 2 C 4 1, 3 1, 2 1 C 1 1, 1 1, 1 2 L 1 13 C 1 14, 1 15, 2 15 C 3 15, 4 14, 4 13 Z"
      },
      {
        "id": "sp-317",
        "x": 1074.128205128205,
        "y": 221.17948717948718,
        "width": 10,
        "height": 11.666666666666668,
        "localPctX": 0.7179487179487166,
        "localPctY": 0.2051282051282052,
        "localPctW": 0.10256410256410257,
        "localPctH": 0.33333333333333337,
        "text": "",
        "pathD": "M 4 10 L 4 2 C 4 1, 3 1, 2 1 C 1 1, 1 1, 1 2 L 1 10 C 1 11, 1 12, 2 12 C 3 12, 4 11, 4 10 Z"
      },
      {
        "id": "sp-318",
        "x": 1049.897435897436,
        "y": 227.46153846153848,
        "width": 12.564102564102564,
        "height": 12.564102564102564,
        "localPctX": 0.025641025641029307,
        "localPctY": 0.3846153846153852,
        "localPctW": 0.358974358974359,
        "localPctH": 0.358974358974359,
        "text": "",
        "pathD": "M 12 1 C 12 1, 12 1, 11 1 C 11 1, 1 10, 1 10 C 0 11, 0 11, 1 12 C 1 12, 2 12, 2 12 C 2 12, 12 1, 12 1 C 12 1, 12 1, 12 1 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 33,
    "x": 1049,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-369",
    "isGroup": true,
    "children": [
      {
        "id": "sp-319",
        "x": 1117.6923076923076,
        "y": 213.10256410256412,
        "width": 14.35897435897436,
        "height": 16.153846153846153,
        "localPctX": 0.07692307692307493,
        "localPctY": -0.025641025641025245,
        "localPctW": 0.4102564102564103,
        "localPctH": 0.4615384615384615,
        "text": "",
        "pathD": "M 9 16 L 9 16 L 10 16 C 10 15, 10 15, 11 15 L 14 9 L 10 1 C 10 1, 9 0, 8 1 L 2 3 C 1 3, 1 3, 1 4 C 0 4, 1 5, 1 5 L 8 16 C 8 16, 8 16, 9 16 Z"
      },
      {
        "id": "sp-320",
        "x": 1130.2564102564102,
        "y": 213.10256410256412,
        "width": 17.05128205128205,
        "height": 16.153846153846153,
        "localPctX": 0.43589743589743324,
        "localPctY": -0.025641025641025245,
        "localPctW": 0.48717948717948717,
        "localPctH": 0.4615384615384615,
        "text": "",
        "pathD": "M 17 4 C 16 3, 16 3, 16 3 L 9 1 C 9 0, 8 1, 7 1 L 1 14 C 1 14, 2 14, 2 14 L 3 15 L 3 14 C 4 14, 4 14, 5 14 C 6 14, 7 15, 8 16 L 8 16 L 9 16 C 9 16, 9 16, 9 16 L 16 5 C 17 5, 17 4, 17 4 Z"
      },
      {
        "id": "sp-321",
        "x": 1122.179487179487,
        "y": 228.35897435897436,
        "width": 20.641025641025642,
        "height": 20.641025641025642,
        "localPctX": 0.20512820512820196,
        "localPctY": 0.4102564102564104,
        "localPctW": 0.5897435897435898,
        "localPctH": 0.5897435897435898,
        "text": "",
        "pathD": "M 19 7 L 18 6 L 18 4 C 18 3, 17 3, 16 3 L 15 3 L 14 1 C 13 1, 13 0, 12 1 L 10 2 L 9 1 C 8 0, 7 1, 7 1 L 6 3 L 4 3 C 3 3, 3 3, 3 4 L 3 6 L 1 7 C 1 7, 0 8, 1 9 L 2 10 L 1 12 C 0 13, 1 13, 1 14 L 3 15 L 3 16 C 3 17, 3 18, 4 18 L 6 18 L 7 19 C 7 20, 8 20, 9 20 L 10 19 L 12 20 C 12 20, 12 20, 13 20 C 13 20, 14 20, 14 19 L 15 18 L 16 18 C 17 18, 18 17, 18 16 L 18 15 L 19 14 C 20 13, 20 13, 20 12 L 19 10 L 20 9 C 20 8, 20 7, 19 7 Z M 16 9 L 13 11 L 14 15 C 15 15, 14 15, 14 16 C 14 16, 14 16, 14 16 C 14 16, 13 16, 13 16 L 10 13 L 7 16 C 7 16, 7 16, 7 16 C 6 15, 6 15, 6 15 L 7 11 L 4 9 C 4 9, 4 9, 4 8 C 4 8, 5 8, 5 8 L 9 8 L 10 4 C 10 4, 10 4, 10 4 C 11 4, 11 4, 11 4 L 12 8 L 16 8 C 16 8, 16 8, 17 8 C 17 9, 17 9, 16 9 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 34,
    "x": 1115,
    "y": 214,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-373",
    "isGroup": true,
    "children": [
      {
        "id": "sp-322",
        "x": 893.1025641025641,
        "y": 400.48717948717945,
        "width": 30.512820512820515,
        "height": 30.512820512820515,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.12820512820512703,
        "localPctW": 0.8717948717948718,
        "localPctH": 0.8717948717948718,
        "text": "",
        "pathD": "M 26 12 C 26 12, 26 12, 26 12 C 25 13, 24 14, 24 14 C 25 16, 26 18, 26 19 C 27 22, 27 24, 25 25 C 25 26, 24 27, 22 27 C 19 27, 14 24, 10 20 C 4 14, 3 8, 5 5 C 6 5, 7 4, 8 4 C 11 4, 14 5, 17 7 C 17 6, 18 5, 19 5 C 19 5, 19 4, 19 4 C 15 2, 12 1, 8 1 C 6 1, 4 1, 3 3 C -2 7, 1 16, 8 23 C 12 27, 18 30, 22 30 C 25 30, 27 29, 28 28 C 30 26, 31 22, 30 18 C 29 16, 28 14, 26 12 Z"
      },
      {
        "id": "sp-323",
        "x": 901.1794871794872,
        "y": 406.7692307692307,
        "width": 16.153846153846153,
        "height": 16.153846153846153,
        "localPctX": 0.2051282051282052,
        "localPctY": 0.3076923076923062,
        "localPctW": 0.4615384615384615,
        "localPctH": 0.4615384615384615,
        "text": "",
        "pathD": "M 4 1 C 3 1, 2 1, 1 1 C 1 2, 0 4, 1 7 C 2 8, 3 10, 5 12 C 8 14, 11 16, 13 16 C 14 16, 15 16, 15 15 C 16 15, 17 13, 15 10 C 15 10, 15 9, 15 8 C 12 10, 10 10, 10 10 C 9 10, 8 10, 8 9 C 7 9, 7 8, 7 7 C 7 7, 7 5, 8 2 C 7 1, 5 1, 4 1 Z"
      },
      {
        "id": "sp-324",
        "x": 909.2564102564103,
        "y": 395.1025641025641,
        "width": 19.743589743589745,
        "height": 19.743589743589745,
        "localPctX": 0.43589743589743646,
        "localPctY": -0.025641025641026056,
        "localPctW": 0.5641025641025641,
        "localPctH": 0.5641025641025641,
        "text": "",
        "pathD": "M 19 6 C 19 6, 19 6, 19 6 L 16 5 L 14 1 C 14 1, 14 1, 14 1 C 14 1, 13 1, 13 1 L 10 4 C 10 4, 10 4, 10 5 L 10 7 C 8 7, 6 9, 4 11 C 1 14, 1 18, 1 19 C 1 19, 1 19, 1 19 C 1 19, 1 19, 1 19 C 2 19, 6 19, 9 16 C 11 14, 13 12, 13 10 L 15 10 C 16 10, 16 10, 16 10 L 19 7 C 19 7, 20 6, 19 6 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 73,
    "x": 894,
    "y": 396,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-377",
    "isGroup": true,
    "children": [
      {
        "id": "sp-325",
        "x": 968.3846153846154,
        "y": 399.1025641025641,
        "width": 23.333333333333336,
        "height": 31.410256410256412,
        "localPctX": 0.1538461538461531,
        "localPctY": -0.025641025641026056,
        "localPctW": 0.6666666666666667,
        "localPctH": 0.8974358974358975,
        "text": "",
        "pathD": "M 15 22 L 15 20 C 16 20, 17 19, 17 18 C 17 18, 16 18, 16 18 C 16 18, 17 17, 17 17 C 17 17, 16 16, 16 16 C 18 15, 20 12, 20 9 C 20 4, 16 1, 12 1 C 7 1, 4 4, 4 9 C 4 12, 5 15, 8 16 C 7 16, 7 17, 7 17 C 7 17, 7 18, 7 18 C 7 18, 7 18, 7 18 C 7 19, 8 20, 8 20 L 8 22 C 2 23, 1 26, 1 27 L 1 29 C 1 30, 1 31, 2 31 L 22 31 C 22 31, 23 30, 23 29 L 23 27 C 23 26, 22 23, 15 22 Z M 12 4 C 15 4, 17 6, 17 9 C 17 12, 15 14, 12 14 C 9 14, 7 12, 7 9 C 7 6, 9 4, 12 4 Z"
      },
      {
        "id": "sp-326",
        "x": 970.1794871794872,
        "y": 430.5128205128205,
        "width": 21.53846153846154,
        "height": 10,
        "localPctX": 0.2051282051282052,
        "localPctY": 0.8717948717948714,
        "localPctW": 0.6153846153846154,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 20 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 L 20 4 C 21 4, 22 3, 22 2 C 22 1, 21 1, 20 1 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 74,
    "x": 963,
    "y": 400,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-380",
    "isGroup": true,
    "children": [
      {
        "id": "sp-327",
        "x": 680.3846153846154,
        "y": 292.3846153846154,
        "width": 15.256410256410257,
        "height": 10,
        "localPctX": 0.1538461538461531,
        "localPctY": 0.15384615384615472,
        "localPctW": 0.4358974358974359,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 14 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 L 14 4 C 15 4, 15 3, 15 2 C 15 1, 15 1, 14 1 Z"
      },
      {
        "id": "sp-328",
        "x": 680.3846153846154,
        "y": 298.6666666666667,
        "width": 15.256410256410257,
        "height": 10,
        "localPctX": 0.1538461538461531,
        "localPctY": 0.33333333333333387,
        "localPctW": 0.4358974358974359,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 15 2 C 15 1, 15 1, 14 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 L 14 4 C 15 4, 15 3, 15 2 Z"
      },
      {
        "id": "sp-329",
        "x": 680.3846153846154,
        "y": 304.05128205128204,
        "width": 10,
        "height": 10,
        "localPctX": 0.1538461538461531,
        "localPctY": 0.48717948717948695,
        "localPctW": 0.28205128205128205,
        "localPctH": 0.10256410256410257,
        "text": "",
        "pathD": "M 8 4 C 9 4, 10 3, 10 2 C 10 1, 9 1, 8 1 L 2 1 C 1 1, 1 1, 1 2 C 1 3, 1 4, 2 4 L 8 4 Z"
      },
      {
        "id": "sp-330",
        "x": 674.1025641025641,
        "y": 286.1025641025641,
        "width": 27.82051282051282,
        "height": 35.8974358974359,
        "localPctX": -0.025641025641026056,
        "localPctY": -0.025641025641026056,
        "localPctW": 0.7948717948717949,
        "localPctH": 1.0256410256410255,
        "text": "",
        "pathD": "M 26 27 L 25 29 L 25 33 L 4 33 L 4 4 L 25 4 L 25 10 L 28 5 L 28 2 C 28 1, 27 1, 26 1 L 2 1 C 1 1, 1 1, 1 2 L 1 34 C 1 35, 1 36, 2 36 L 26 36 C 27 36, 28 35, 28 34 L 28 25 L 27 27 C 27 27, 27 27, 26 27 Z"
      },
      {
        "id": "sp-331",
        "x": 692.0512820512821,
        "y": 289.6923076923077,
        "width": 17.05128205128205,
        "height": 26.025641025641026,
        "localPctX": 0.4871794871794886,
        "localPctY": 0.07692307692307655,
        "localPctW": 0.48717948717948717,
        "localPctH": 0.7435897435897436,
        "text": "",
        "pathD": "M 17 4 C 17 4, 17 3, 15 1 C 13 0, 12 1, 11 1 C 11 1, 11 1, 11 1 L 1 18 C 1 18, 1 18, 1 19 L 1 25 C 1 25, 1 25, 1 25 C 1 26, 2 26, 2 25 L 7 22 C 7 22, 7 22, 7 22 L 17 5 C 17 4, 17 4, 17 4 Z M 4 23 C 4 23, 3 22, 3 22 C 3 22, 2 22, 2 22 L 2 20 C 2 20, 3 20, 4 20 C 5 21, 5 21, 5 22 L 4 23 Z"
      },
      {
        "id": "sp-332",
        "x": 679.4871794871796,
        "y": 310.33333333333337,
        "width": 12.564102564102564,
        "height": 10,
        "localPctX": 0.12820512820513028,
        "localPctY": 0.6666666666666677,
        "localPctW": 0.358974358974359,
        "localPctH": 0.1794871794871795,
        "text": "",
        "pathD": "M 7 5 C 7 5, 7 5, 7 5 C 7 5, 8 5, 8 5 C 9 5, 11 5, 12 5 C 13 5, 13 4, 12 4 C 11 4, 9 4, 8 4 C 8 4, 8 4, 8 4 C 7 3, 7 3, 7 3 C 7 3, 7 3, 7 3 C 7 3, 6 3, 6 3 C 7 2, 7 1, 7 1 C 7 1, 6 1, 6 1 C 5 0, 5 1, 4 2 C 3 3, 2 4, 1 6 C 0 6, 1 7, 2 6 C 3 5, 4 4, 5 3 C 5 3, 4 4, 4 4 C 4 5, 5 5, 5 5 C 5 4, 5 4, 5 4 C 5 4, 5 4, 5 4 C 5 4, 5 4, 5 4 C 5 4, 5 4, 5 5 C 5 5, 6 5, 6 5 C 6 5, 6 5, 7 5 C 7 5, 7 5, 7 5 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 45,
    "x": 675,
    "y": 287,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-387",
    "isGroup": true,
    "children": [
      {
        "id": "sp-333",
        "x": 618.7692307692307,
        "y": 300.0512820512821,
        "width": 19.743589743589745,
        "height": 10,
        "localPctX": 0.3076923076923062,
        "localPctY": 0.4871794871794886,
        "localPctW": 0.5641025641025641,
        "localPctH": 0.1282051282051282,
        "text": "",
        "pathD": "M 1 4 L 1 4 L 1 4 L 18 4 C 19 4, 19 4, 19 3 L 19 1 L 1 4 Z"
      },
      {
        "id": "sp-334",
        "x": 607.1025641025641,
        "y": 306.33333333333337,
        "width": 35.8974358974359,
        "height": 10,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.6666666666666677,
        "localPctW": 1.0256410256410255,
        "localPctH": 0.15384615384615385,
        "text": "",
        "pathD": "M 33 1 C 33 1, 32 1, 32 1 L 11 1 C 10 3, 8 4, 6 4 C 4 4, 2 3, 1 2 L 1 4 C 1 4, 1 5, 1 5 L 35 5 C 35 5, 35 5, 35 4 C 35 4, 35 4, 35 3 L 33 1 Z"
      },
      {
        "id": "sp-335",
        "x": 607.1025641025641,
        "y": 288.3846153846154,
        "width": 35.8974358974359,
        "height": 20.641025641025642,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.15384615384615472,
        "localPctW": 1.0256410256410255,
        "localPctH": 0.5897435897435898,
        "text": "",
        "pathD": "M 6 20 C 8 20, 11 18, 11 15 L 11 14 L 35 10 C 35 9, 35 9, 35 9 C 35 9, 36 5, 35 3 C 33 1, 32 1, 29 1 C 20 1, 2 10, 1 10 C 1 11, 1 11, 1 11 L 1 15 C 1 18, 3 20, 6 20 Z M 6 14 C 6 14, 7 14, 7 15 C 7 16, 6 17, 6 17 C 5 17, 4 16, 4 15 C 4 14, 5 14, 6 14 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 44,
    "x": 608,
    "y": 283,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-391",
    "isGroup": true,
    "children": [
      {
        "id": "sp-336",
        "x": 541,
        "y": 290,
        "width": 27.82051282051282,
        "height": 33.205128205128204,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.7948717948717949,
        "localPctH": 0.9487179487179487,
        "text": "",
        "pathD": "M 4 29 L 4 4 L 24 4 L 24 25 L 28 22 L 28 2 C 28 1, 27 1, 26 1 L 2 1 C 1 1, 1 1, 1 2 L 1 31 C 1 32, 1 33, 2 33 L 19 33 L 16 29 L 4 29 Z"
      },
      {
        "id": "sp-337",
        "x": 557.1538461538462,
        "y": 309.7435897435897,
        "width": 18.846153846153847,
        "height": 15.256410256410257,
        "localPctX": 0.46153846153846256,
        "localPctY": 0.5641025641025635,
        "localPctW": 0.5384615384615384,
        "localPctH": 0.4358974358974359,
        "text": "",
        "pathD": "M 18 1 C 18 0, 17 0, 17 1 L 8 8 L 2 4 C 2 4, 1 4, 1 5 C 1 5, 0 5, 1 6 L 7 14 C 7 15, 8 15, 8 15 C 8 15, 8 15, 8 15 C 8 15, 9 15, 9 15 L 18 2 C 19 2, 18 1, 18 1 Z"
      },
      {
        "id": "sp-338",
        "x": 547.2820512820513,
        "y": 296.28205128205127,
        "width": 16.153846153846153,
        "height": 10,
        "localPctX": 0.17948717948717915,
        "localPctY": 0.17948717948717915,
        "localPctW": 0.4615384615384615,
        "localPctH": 0.1282051282051282,
        "text": "",
        "pathD": "M 14 1 L 2 1 C 1 1, 1 1, 1 2 C 1 4, 1 4, 2 4 L 14 4 C 15 4, 16 4, 16 2 C 16 1, 15 1, 14 1 Z"
      },
      {
        "id": "sp-339",
        "x": 547.2820512820513,
        "y": 301.66666666666663,
        "width": 16.153846153846153,
        "height": 10,
        "localPctX": 0.17948717948717915,
        "localPctY": 0.33333333333333226,
        "localPctW": 0.4615384615384615,
        "localPctH": 0.1282051282051282,
        "text": "",
        "pathD": "M 14 1 L 2 1 C 1 1, 1 1, 1 2 C 1 4, 1 4, 2 4 L 14 4 C 15 4, 16 4, 16 2 C 16 1, 15 1, 14 1 Z"
      },
      {
        "id": "sp-340",
        "x": 547.2820512820513,
        "y": 307.94871794871796,
        "width": 16.153846153846153,
        "height": 10,
        "localPctX": 0.17948717948717915,
        "localPctY": 0.512820512820513,
        "localPctW": 0.4615384615384615,
        "localPctH": 0.1282051282051282,
        "text": "",
        "pathD": "M 14 1 L 2 1 C 1 1, 1 1, 1 2 C 1 4, 1 4, 2 4 L 14 4 C 15 4, 16 4, 16 2 C 16 1, 15 1, 14 1 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 43,
    "x": 541,
    "y": 290,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-397",
    "isGroup": true,
    "children": [
      {
        "id": "sp-341",
        "x": 483.87179487179486,
        "y": 290.89743589743586,
        "width": 14.35897435897436,
        "height": 14.35897435897436,
        "localPctX": 0.28205128205128177,
        "localPctY": 0.025641025641024433,
        "localPctW": 0.4102564102564103,
        "localPctH": 0.4102564102564103,
        "text": "",
        "pathD": "M 6 14 L 7 11 L 7 11 C 6 11, 6 11, 7 11 L 7 10 C 7 10, 7 10, 7 10 L 8 11 C 8 11, 8 11, 8 11 L 8 11 L 8 14 C 12 14, 14 14, 14 13 C 14 11, 12 11, 11 11 C 10 10, 9 10, 9 8 C 10 8, 10 7, 10 7 C 10 7, 11 6, 11 5 C 11 5, 11 5, 11 5 C 11 5, 11 4, 11 4 C 11 2, 9 1, 7 1 C 5 1, 4 2, 4 4 C 4 4, 4 5, 4 5 C 4 5, 4 5, 4 5 C 4 6, 5 7, 5 7 C 5 7, 5 8, 5 8 C 6 10, 5 10, 4 11 C 2 11, 1 11, 1 13 C 1 14, 3 14, 6 14 Z"
      },
      {
        "id": "sp-342",
        "x": 473.1025641025641,
        "y": 309.7435897435897,
        "width": 14.35897435897436,
        "height": 14.35897435897436,
        "localPctX": -0.025641025641026056,
        "localPctY": 0.5641025641025635,
        "localPctW": 0.4102564102564103,
        "localPctH": 0.4102564102564103,
        "text": "",
        "pathD": "M 11 11 C 10 10, 9 10, 9 8 C 10 8, 10 7, 10 7 C 10 7, 11 6, 11 5 C 11 5, 11 5, 11 5 C 11 5, 11 4, 11 4 C 11 2, 9 1, 7 1 C 5 1, 4 2, 4 4 C 4 4, 4 5, 4 5 C 4 5, 4 5, 4 5 C 4 6, 5 7, 5 7 C 5 7, 5 8, 5 8 C 6 10, 5 10, 4 11 C 2 11, 1 11, 1 13 C 1 14, 3 14, 6 14 L 7 11 L 7 11 C 6 11, 6 11, 7 11 L 7 10 C 7 10, 7 10, 7 10 L 8 11 C 8 11, 8 11, 8 11 L 8 11 L 8 14 C 12 14, 14 14, 14 13 C 14 11, 12 11, 11 11 Z"
      },
      {
        "id": "sp-343",
        "x": 495.53846153846155,
        "y": 309.7435897435897,
        "width": 14.35897435897436,
        "height": 14.35897435897436,
        "localPctX": 0.6153846153846156,
        "localPctY": 0.5641025641025635,
        "localPctW": 0.4102564102564103,
        "localPctH": 0.4102564102564103,
        "text": "",
        "pathD": "M 11 11 C 10 10, 9 10, 9 8 C 10 8, 10 7, 10 7 C 10 7, 11 6, 11 5 C 11 5, 11 5, 11 5 C 11 5, 11 4, 11 4 C 11 2, 9 1, 7 1 C 5 1, 4 2, 4 4 C 4 4, 4 5, 4 5 C 4 5, 4 5, 4 5 C 4 6, 5 7, 5 7 C 5 7, 5 8, 5 8 C 6 10, 5 10, 4 11 C 2 11, 1 11, 1 13 C 1 14, 3 14, 6 14 L 7 11 L 7 11 C 6 11, 6 11, 7 11 L 7 10 C 7 10, 7 10, 7 10 L 8 11 C 8 11, 8 11, 8 11 L 8 11 L 8 14 C 12 14, 14 14, 14 13 C 14 11, 12 11, 11 11 Z"
      },
      {
        "id": "sp-344",
        "x": 484.7692307692308,
        "y": 305.2564102564102,
        "width": 12.564102564102564,
        "height": 11.666666666666668,
        "localPctX": 0.3076923076923078,
        "localPctY": 0.43589743589743485,
        "localPctW": 0.358974358974359,
        "localPctH": 0.33333333333333337,
        "text": "",
        "pathD": "M 12 12 C 12 12, 12 12, 12 11 C 13 11, 13 10, 12 10 L 7 6 L 7 1 C 7 1, 7 1, 7 1 C 6 1, 6 1, 6 1 L 6 6 L 1 10 C 0 10, 0 11, 1 11 C 1 12, 2 12, 2 11 L 7 8 L 11 11 C 11 12, 12 12, 12 12 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 42,
    "x": 474,
    "y": 290,
    "width": 35,
    "height": 35
  },
  {
    "id": "grp-402",
    "isGroup": true,
    "children": [
      {
        "id": "sp-345",
        "x": 434.8205128205128,
        "y": 303.1538461538462,
        "width": 10,
        "height": 18.846153846153847,
        "localPctX": 0.7948717948717948,
        "localPctY": 0.46153846153846256,
        "localPctW": 0.20512820512820515,
        "localPctH": 0.5384615384615384,
        "text": "",
        "pathD": "M 5 1 L 2 1 C 1 1, 1 1, 1 2 L 1 17 C 1 18, 1 18, 2 18 L 5 18 C 6 18, 7 18, 7 17 L 7 2 C 7 1, 6 1, 5 1 Z M 4 17 C 4 17, 3 17, 2 17 C 2 16, 2 15, 2 15 C 3 14, 4 14, 4 15 C 5 15, 5 16, 4 17 Z"
      },
      {
        "id": "sp-346",
        "x": 406.1025641025641,
        "y": 286.1025641025641,
        "width": 26.923076923076923,
        "height": 33.205128205128204,
        "localPctX": -0.025641025641026056,
        "localPctY": -0.025641025641026056,
        "localPctW": 0.7692307692307693,
        "localPctH": 0.9487179487179487,
        "text": "",
        "pathD": "M 22 8 C 22 6, 23 4, 23 2 C 23 1, 22 1, 20 1 C 17 1, 17 3, 16 3 C 16 5, 16 10, 16 12 C 16 14, 13 16, 9 16 C 3 16, 1 14, 1 18 C 1 19, 1 20, 2 20 C 1 20, 1 21, 1 22 C 1 23, 1 24, 2 24 C 1 24, 1 25, 1 26 C 1 28, 1 29, 2 29 C 1 29, 1 30, 1 31 C 1 32, 1 33, 2 33 C 2 33, 5 33, 14 33 C 23 33, 26 33, 26 33 C 27 33, 27 33, 27 32 L 27 20 C 27 19, 27 19, 27 19 C 27 19, 22 14, 22 8 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 41,
    "x": 407,
    "y": 287,
    "width": 35,
    "height": 35
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 85,
    "x": 846,
    "y": 455,
    "width": 24,
    "height": 34,
    "text": "",
    "pathD": "M 22 16 L 22 16 L 22 15 L 21 15 L 21 14 L 20 13 L 19 12 L 19 11 L 18 10 L 18 9 L 17 8 L 17 7 L 16 6 L 15 5 L 15 4 L 14 3 L 14 1 L 14 1 L 14 1 L 13 1 L 13 0 L 13 0 L 13 0 L 12 0 L 12 0 L 12 0 L 11 0 L 11 0 L 11 0 L 11 1 L 10 1 L 10 1 L 10 1 L 10 3 L 9 4 L 9 5 L 8 6 L 7 7 L 7 8 L 6 9 L 6 10 L 5 11 L 5 12 L 4 13 L 3 14 L 3 15 L 2 15 L 2 16 L 2 16 L 1 17 L 1 17 L 1 18 L 0 19 L 0 20 L 0 21 L 0 21 L 0 22 L 0 23 L 0 25 L 1 26 L 1 27 L 1 28 L 2 29 L 3 30 L 4 31 L 4 31 L 5 32 L 6 33 L 7 33 L 8 34 L 10 34 L 11 34 L 12 34 L 13 34 L 14 34 L 16 34 L 17 33 L 18 33 L 19 32 L 20 31 L 20 31 L 21 30 L 22 29 L 23 28 L 23 27 L 24 26 L 24 25 L 24 23 L 24 22 L 24 21 L 24 20 L 24 20 L 24 19 L 23 18 L 23 17 L 23 17 L 22 16 Z M 11 27 L 11 28 L 10 28 L 10 28 L 9 28 L 8 28 L 8 28 L 7 28 L 7 27 L 7 27 L 6 26 L 6 26 L 6 25 L 6 25 L 6 24 L 6 24 L 7 24 L 7 23 L 7 23 L 7 23 L 7 22 L 8 22 L 8 21 L 8 21 L 8 20 L 9 20 L 9 20 L 9 20 L 9 20 L 9 20 L 9 20 L 9 20 L 10 20 L 10 21 L 10 21 L 10 22 L 11 22 L 11 23 L 11 23 L 11 23 L 12 24 L 12 24 L 12 24 L 12 25 L 12 25 L 12 26 L 12 26 L 12 27 L 11 27 Z"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 84,
    "x": 691,
    "y": 458,
    "width": 30,
    "height": 35,
    "text": "",
    "pathD": "M 30 2 L 29 2 L 29 2 L 29 2 L 29 2 L 20 4 L 19 4 L 19 4 L 19 5 L 19 5 L 13 5 L 13 5 L 13 4 L 13 4 L 13 3 L 13 3 L 13 3 L 13 2 L 13 2 L 13 2 L 12 2 L 12 1 L 12 1 L 12 1 L 11 1 L 11 0 L 11 0 L 11 0 L 10 0 L 10 0 L 10 0 L 9 0 L 9 0 L 9 0 L 8 0 L 8 0 L 8 1 L 7 1 L 7 1 L 7 1 L 7 2 L 7 2 L 6 2 L 6 2 L 6 3 L 6 3 L 6 3 L 6 4 L 6 4 L 6 5 L 7 5 L 6 6 L 6 6 L 5 6 L 4 6 L 3 7 L 3 8 L 2 9 L 1 9 L 1 10 L 0 11 L 0 11 L 0 11 L 0 11 L 0 12 L 0 12 L 0 12 L 0 12 L 0 13 L 1 13 L 1 13 L 1 13 L 1 13 L 2 13 L 2 13 L 2 13 L 3 12 L 3 12 L 3 12 L 3 11 L 4 11 L 4 10 L 5 9 L 6 9 L 6 9 L 7 8 L 7 8 L 8 8 L 8 8 L 9 8 L 10 8 L 10 8 L 10 10 L 10 10 L 9 10 L 9 11 L 8 11 L 8 11 L 8 12 L 7 12 L 7 12 L 6 13 L 6 13 L 6 14 L 6 14 L 6 15 L 6 15 L 5 16 L 5 16 L 5 34 L 5 34 L 6 34 L 6 34 L 6 35 L 6 35 L 6 35 L 7 35 L 7 35 L 18 35 L 18 35 L 18 35 L 18 35 L 19 35 L 19 34 L 19 34 L 19 34 L 19 34 L 19 16 L 19 16 L 19 15 L 19 15 L 19 14 L 18 14 L 18 13 L 18 13 L 18 12 L 17 12 L 17 11 L 16 11 L 16 11 L 15 10 L 15 10 L 14 10 L 14 10 L 14 8 L 19 8 L 19 8 L 19 8 L 19 8 L 20 8 L 29 10 L 29 10 L 29 10 L 29 10 L 30 10 L 30 10 L 30 10 L 30 10 L 30 10 L 30 3 L 30 3 L 30 2 L 30 2 L 30 2 Z M 10 4 L 10 5 L 10 5 L 10 5 L 10 5 L 9 5 L 9 5 L 9 5 L 9 4 L 8 4 L 8 4 L 8 4 L 8 3 L 8 3 L 8 3 L 8 3 L 9 2 L 9 2 L 9 2 L 9 2 L 10 2 L 10 2 L 10 2 L 10 2 L 10 2 L 11 3 L 11 3 L 11 3 L 11 3 L 11 4 L 11 4 L 11 4 L 10 4 Z"
  },
  {
    "id": "grp-407",
    "isGroup": true,
    "children": [
      {
        "id": "sp-347",
        "x": 767.4444444444445,
        "y": 455,
        "width": 18.88888888888889,
        "height": 33.42857142857143,
        "localPctX": 0.14814814814814856,
        "localPctY": 0,
        "localPctW": 0.6296296296296297,
        "localPctH": 0.8571428571428572,
        "text": "",
        "pathD": "M 2 27 L 3 27 L 3 28 L 4 29 L 5 29 L 5 30 L 6 31 L 7 31 L 7 32 L 8 32 L 9 33 L 10 33 L 11 33 L 11 33 L 11 33 L 11 33 L 10 32 L 10 31 L 10 31 L 10 30 L 10 30 L 9 29 L 9 29 L 9 28 L 10 27 L 10 27 L 10 26 L 10 26 L 11 26 L 11 25 L 11 25 L 12 24 L 12 24 L 13 24 L 13 23 L 14 23 L 14 22 L 15 22 L 15 21 L 16 21 L 16 20 L 17 20 L 17 20 L 17 19 L 18 18 L 18 18 L 18 17 L 19 16 L 19 16 L 19 15 L 19 14 L 19 13 L 19 12 L 19 11 L 18 10 L 18 9 L 18 8 L 17 7 L 17 7 L 16 6 L 16 5 L 15 5 L 14 4 L 14 3 L 13 3 L 12 2 L 11 2 L 11 1 L 10 1 L 9 0 L 8 0 L 8 0 L 8 0 L 8 1 L 9 1 L 9 2 L 9 3 L 9 3 L 9 4 L 9 4 L 9 5 L 9 5 L 9 6 L 9 6 L 9 7 L 9 7 L 8 8 L 8 8 L 8 9 L 7 9 L 7 10 L 6 10 L 6 10 L 5 11 L 5 11 L 4 12 L 4 12 L 3 12 L 3 13 L 2 13 L 2 14 L 1 14 L 1 15 L 1 16 L 0 16 L 0 17 L 0 18 L 0 19 L 0 20 L 0 21 L 0 22 L 0 23 L 1 24 L 1 24 L 1 25 L 2 26 L 2 27 Z"
      },
      {
        "id": "sp-348",
        "x": 763,
        "y": 491.77142857142854,
        "width": 30,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.9428571428571422,
        "localPctW": 1,
        "localPctH": 0.08571428571428572,
        "text": "",
        "pathD": "M 30 0 L 30 0 L 29 0 L 1 0 L 0 0 L 0 0 L 0 1 L 0 1 L 0 2 L 0 3 L 0 3 L 0 3 L 1 3 L 29 3 L 30 3 L 30 3 L 30 3 L 30 2 L 30 1 L 30 1 L 30 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 763,
    "y": 455,
    "width": 30,
    "height": 39
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 86,
    "x": 919,
    "y": 464,
    "width": 37,
    "height": 23,
    "text": "",
    "pathD": "M 28 11 L 28 11 C 28 7, 31 3, 32 3 C 33 3, 35 3, 35 3 C 34 1, 33 0, 28 0 C 10 0, 10 0, 10 0 C 3 0, 0 7, 0 11 C 0 16, 3 23, 10 23 C 28 23, 28 23, 28 23 C 33 23, 34 22, 35 20 C 35 20, 34 20, 32 20 C 31 20, 28 17, 28 11 Z M 23 15 L 23 15 C 23 15, 22 15, 22 15 C 16 13, 16 13, 16 13 C 16 13, 16 14, 16 15 C 15 15, 15 17, 14 15 C 12 14, 7 9, 7 9 C 7 9, 7 9, 7 8 C 7 8, 8 8, 8 8 C 13 11, 13 11, 13 11 C 13 11, 14 9, 15 9 C 15 7, 15 7, 16 8 C 18 9, 23 14, 23 14 C 23 14, 24 15, 23 15 Z M 35 7 L 35 7 C 34 7, 34 7, 34 7 C 32 7, 32 9, 32 11 C 32 14, 32 15, 34 15 C 35 15, 35 15, 35 15 C 36 15, 37 14, 37 11 C 37 9, 36 7, 35 7 Z"
  },
  {
    "id": "grp-411",
    "isGroup": true,
    "children": [
      {
        "id": "sp-349",
        "x": 66.0909090909091,
        "y": 517,
        "width": 22.727272727272727,
        "height": 40.90909090909091,
        "localPctX": 0.22727272727272735,
        "localPctY": 0,
        "localPctW": 0.5681818181818181,
        "localPctH": 1.0227272727272727,
        "text": "",
        "pathD": "M 22 5 L 18 5 L 18 1 C 18 1, 18 0, 17 0 L 6 0 C 5 0, 5 1, 5 1 L 5 5 L 1 5 C 1 5, 0 5, 0 6 L 0 40 C 0 40, 1 41, 1 41 L 22 41 C 22 41, 23 40, 23 40 L 23 6 C 23 5, 22 5, 22 5 Z M 20 35 C 20 36, 20 36, 19 36 L 3 36 C 3 36, 2 36, 2 35 L 2 31 C 2 30, 3 29, 3 29 L 19 29 C 20 29, 20 30, 20 31 L 20 35 Z M 20 25 C 20 26, 20 26, 19 26 L 3 26 C 3 26, 2 26, 2 25 L 2 21 C 2 20, 3 19, 3 19 L 19 19 C 20 19, 20 20, 20 21 L 20 25 Z M 20 15 C 20 16, 20 16, 19 16 L 3 16 C 3 16, 2 16, 2 15 L 2 10 C 2 10, 3 9, 3 9 L 19 9 C 20 9, 20 10, 20 10 L 20 15 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 57,
    "y": 517,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-413",
    "isGroup": true,
    "children": [
      {
        "id": "sp-350",
        "x": 138.72727272727272,
        "y": 536.1818181818182,
        "width": 35.45454545454545,
        "height": 18.18181818181818,
        "localPctX": 0.06818181818181798,
        "localPctY": 0.4545454545454561,
        "localPctW": 0.8863636363636364,
        "localPctH": 0.4545454545454545,
        "text": "",
        "pathD": "M 0 0 L 0 17 C 0 18, 1 18, 1 18 L 34 18 C 35 18, 35 18, 35 17 L 35 0 L 0 0 Z M 25 8 L 27 8 L 27 7 C 27 6, 27 5, 28 5 C 28 5, 29 6, 29 7 L 29 8 L 30 8 C 31 8, 31 8, 31 9 C 31 9, 31 10, 30 10 L 29 10 L 29 11 C 29 12, 28 12, 28 12 C 27 12, 27 12, 27 11 L 27 10 L 25 10 C 25 10, 24 9, 24 9 C 24 8, 25 8, 25 8 Z M 15 10 L 18 5 C 18 5, 18 5, 18 5 C 19 5, 19 5, 19 6 L 18 9 L 20 9 C 20 9, 20 9, 20 9 C 20 9, 20 9, 20 9 L 18 14 C 18 14, 18 14, 17 14 C 17 14, 17 14, 17 14 C 17 14, 17 14, 17 14 L 17 11 L 16 11 C 16 11, 16 11, 15 11 C 15 10, 15 10, 15 10 Z M 5 8 L 10 8 C 11 8, 11 8, 11 9 C 11 10, 11 10, 10 10 L 5 10 C 5 10, 4 10, 4 9 C 4 8, 5 8, 5 8 Z"
      },
      {
        "id": "sp-351",
        "x": 142.36363636363637,
        "y": 522.5454545454545,
        "width": 10,
        "height": 10,
        "localPctX": 0.15909090909090934,
        "localPctY": 0.1136363636363626,
        "localPctW": 0.18181818181818182,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 7 5 L 7 1 C 7 1, 7 0, 6 0 L 1 0 C 1 0, 0 1, 0 1 L 0 5 L 7 5 Z"
      },
      {
        "id": "sp-352",
        "x": 163.27272727272728,
        "y": 522.5454545454545,
        "width": 10,
        "height": 10,
        "localPctX": 0.681818181818182,
        "localPctY": 0.1136363636363626,
        "localPctW": 0.18181818181818182,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 7 5 L 7 1 C 7 1, 7 0, 6 0 L 1 0 C 1 0, 0 1, 0 1 L 0 5 L 7 5 Z"
      },
      {
        "id": "sp-353",
        "x": 136,
        "y": 528.9090909090909,
        "width": 40,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.27272727272727193,
        "localPctW": 1,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 39 0 L 39 0 L 1 0 C 1 0, 0 0, 0 1 L 0 3 C 0 4, 1 5, 1 5 L 39 5 C 40 5, 40 4, 40 3 L 40 1 C 40 0, 40 0, 39 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 136,
    "y": 518,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-418",
    "isGroup": true,
    "children": [
      {
        "id": "sp-354",
        "x": 218.63636363636363,
        "y": 535.2727272727273,
        "width": 32.72727272727273,
        "height": 12.727272727272727,
        "localPctX": 0.09090909090909065,
        "localPctY": 0.4318181818181813,
        "localPctW": 0.8181818181818181,
        "localPctH": 0.3181818181818182,
        "text": "",
        "pathD": "M 29 12 L 33 0 L 0 0 L 4 12 C 4 12, 4 13, 5 13 L 5 13 C 6 11, 7 11, 9 11 C 11 11, 12 11, 13 13 L 20 13 C 21 11, 22 11, 24 11 C 25 11, 27 11, 28 13 L 28 13 C 29 13, 29 12, 29 12 Z"
      },
      {
        "id": "sp-355",
        "x": 217.72727272727272,
        "y": 518,
        "width": 34.54545454545455,
        "height": 14.545454545454545,
        "localPctX": 0.06818181818181798,
        "localPctY": 0,
        "localPctW": 0.8636363636363636,
        "localPctH": 0.36363636363636365,
        "text": "",
        "pathD": "M 34 15 L 34 14 C 35 13, 34 13, 34 13 C 34 12, 34 12, 33 12 L 32 12 C 32 12, 32 11, 32 11 C 32 7, 29 5, 26 5 C 25 5, 25 5, 25 5 C 25 2, 23 0, 20 0 C 19 0, 18 0, 17 1 C 17 0, 16 0, 15 0 C 12 0, 10 2, 10 5 C 10 5, 10 5, 9 5 C 6 5, 3 7, 3 11 C 3 11, 3 12, 3 12 L 1 12 C 1 12, 1 12, 0 13 C 0 13, 0 13, 0 14 L 0 15 L 34 15 Z"
      },
      {
        "id": "sp-356",
        "x": 222.27272727272725,
        "y": 548,
        "width": 26.363636363636363,
        "height": 10.909090909090908,
        "localPctX": 0.1818181818181813,
        "localPctY": 0.75,
        "localPctW": 0.6590909090909091,
        "localPctH": 0.2727272727272727,
        "text": "",
        "pathD": "M 21 5 C 22 5, 23 4, 23 3 C 23 1, 22 0, 20 0 C 19 0, 18 1, 18 3 C 18 3, 18 4, 19 5 C 18 4, 17 4, 16 4 C 15 4, 14 4, 13 4 C 12 4, 11 4, 10 4 C 9 4, 8 4, 7 5 C 8 4, 8 3, 8 3 C 8 1, 7 0, 6 0 C 5 0, 3 1, 3 3 C 3 4, 5 5, 6 5 C 5 5, 5 6, 4 6 C 4 6, 4 6, 3 6 C 1 8, 0 9, 0 11 L 26 11 C 26 9, 25 8, 23 6 C 23 6, 23 6, 22 6 C 22 6, 21 5, 21 5 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 215,
    "y": 518,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-422",
    "isGroup": true,
    "children": [
      {
        "id": "sp-357",
        "x": 293,
        "y": 517,
        "width": 40,
        "height": 39.11111111111111,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 0.9777777777777776,
        "text": "",
        "pathD": "M 39 8 L 39 8 L 39 7 C 39 6, 38 5, 38 5 C 37 5, 36 6, 36 7 L 36 8 L 30 8 L 30 2 C 30 1, 30 0, 29 0 C 28 0, 27 1, 27 2 L 27 8 L 21 8 L 21 7 C 21 6, 21 5, 20 5 C 19 5, 19 6, 19 7 L 19 8 L 19 8 C 18 8, 18 8, 18 9 C 18 9, 18 10, 19 10 L 19 10 C 18 12, 16 14, 13 15 L 13 15 L 13 9 C 13 8, 12 8, 11 8 C 10 8, 10 8, 10 9 L 10 15 L 4 15 L 4 14 C 4 13, 3 13, 2 13 C 2 13, 1 13, 1 14 L 1 15 L 1 15 C 1 15, 0 16, 0 16 C 0 17, 1 17, 1 17 L 1 17 L 1 21 L 3 21 C 3 21, 6 20, 10 19 L 10 37 C 10 38, 10 39, 11 39 C 12 39, 13 38, 13 37 L 13 18 C 13 18, 14 18, 14 17 L 19 17 L 19 21 L 20 21 C 20 21, 24 20, 27 19 L 27 37 C 27 38, 28 39, 29 39 C 30 39, 30 38, 30 37 L 30 18 C 32 17, 34 16, 36 15 C 37 13, 38 11, 39 10 L 39 10 C 39 10, 40 9, 40 9 C 40 8, 39 8, 39 8 Z M 4 17 L 8 17 C 6 18, 5 18, 4 19 L 4 17 Z M 17 15 C 18 15, 18 15, 18 15 C 18 14, 19 14, 19 14 C 19 14, 19 14, 19 14 L 19 15 L 17 15 Z M 21 19 L 21 17 L 21 17 C 22 17, 22 17, 22 16 C 22 16, 22 15, 21 15 L 21 15 L 21 14 C 21 13, 21 13, 20 13 C 20 13, 20 13, 19 13 C 20 12, 21 11, 21 10 L 27 10 L 27 17 C 25 18, 23 18, 21 19 Z M 30 16 L 30 10 L 36 10 C 36 12, 33 14, 30 16 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 293,
    "y": 517,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-424",
    "isGroup": true,
    "children": [
      {
        "id": "sp-358",
        "x": 377.45454545454544,
        "y": 518,
        "width": 28.18181818181818,
        "height": 40,
        "localPctX": 0.13636363636363596,
        "localPctY": 0,
        "localPctW": 0.7045454545454545,
        "localPctH": 1,
        "text": "",
        "pathD": "M 26 18 C 26 18, 27 17, 27 16 L 27 15 L 27 15 C 28 15, 28 15, 28 14 C 28 14, 28 13, 27 13 L 20 13 L 20 10 L 22 10 L 22 11 C 22 12, 22 12, 23 12 C 24 12, 24 12, 24 11 L 24 10 L 24 10 C 25 10, 25 9, 25 9 C 25 8, 25 8, 24 8 L 19 8 L 15 1 C 15 1, 15 0, 15 0 C 14 0, 14 0, 13 1 L 9 8 L 4 8 C 3 8, 3 8, 3 9 C 3 9, 3 10, 4 10 L 4 10 L 4 11 C 4 12, 5 12, 5 12 C 6 12, 6 12, 6 11 L 6 10 L 8 10 L 8 13 L 1 13 C 1 13, 0 14, 0 14 C 0 15, 1 15, 1 15 L 1 15 L 1 16 C 1 17, 2 18, 2 18 C 3 18, 4 17, 4 16 L 4 15 L 8 15 L 8 19 C 8 19, 8 19, 8 19 L 8 24 L 4 35 C 2 37, 1 38, 1 40 L 27 40 C 27 38, 26 37, 24 35 L 20 24 L 20 15 L 25 15 L 25 16 C 25 17, 25 18, 26 18 Z M 14 33 C 12 33, 9 33, 7 34 L 8 32 L 14 28 L 20 32 L 21 34 C 19 33, 17 33, 14 33 Z M 11 21 L 17 24 L 14 26 L 11 24 L 11 21 Z M 10 26 L 12 27 L 9 29 L 10 26 Z M 16 27 L 18 26 L 19 29 L 16 27 Z M 12 19 L 18 16 L 18 22 L 12 19 Z M 18 12 L 13 10 L 18 10 L 18 12 Z M 14 3 L 17 8 L 11 8 L 14 3 Z M 11 11 L 15 13 L 11 13 L 11 11 Z M 14 15 L 11 17 L 11 15 L 14 15 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 372,
    "y": 518,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-426",
    "isGroup": true,
    "children": [
      {
        "id": "sp-359",
        "x": 451,
        "y": 520.7272727272727,
        "width": 40,
        "height": 35.45454545454545,
        "localPctX": 0,
        "localPctY": 0.0681818181818187,
        "localPctW": 1,
        "localPctH": 0.8863636363636364,
        "text": "",
        "pathD": "M 40 32 L 22 1 C 21 1, 21 0, 20 0 C 19 0, 19 1, 18 1 L 0 32 C 0 33, 0 34, 0 34 C 1 35, 1 35, 2 35 L 38 35 C 39 35, 39 35, 40 34 C 40 34, 40 33, 40 32 Z M 24 15 L 21 20 L 24 20 C 24 20, 24 20, 24 21 C 24 21, 24 21, 24 21 L 18 32 C 18 32, 18 32, 18 32 C 18 32, 17 32, 17 32 C 17 32, 17 31, 17 31 L 19 24 L 15 24 C 15 24, 15 24, 15 23 C 14 23, 14 23, 14 23 L 17 15 C 17 15, 17 14, 17 14 L 24 14 C 24 14, 24 15, 24 15 C 25 15, 25 15, 24 15 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 451,
    "y": 518,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-428",
    "isGroup": true,
    "children": [
      {
        "id": "sp-360",
        "x": 541.7272727272727,
        "y": 521.5454545454545,
        "width": 13.636363636363637,
        "height": 14.545454545454545,
        "localPctX": 0.3181818181818187,
        "localPctY": 0.1136363636363626,
        "localPctW": 0.34090909090909094,
        "localPctH": 0.36363636363636365,
        "text": "",
        "pathD": "M 9 14 C 10 13, 14 9, 14 5 C 13 1, 9 0, 7 0 C 5 0, 0 1, 0 5 C 0 9, 4 13, 5 14 C 6 14, 6 14, 7 14 C 8 14, 8 14, 9 14 Z"
      },
      {
        "id": "sp-361",
        "x": 534.4545454545455,
        "y": 535.1818181818182,
        "width": 14.545454545454545,
        "height": 13.636363636363637,
        "localPctX": 0.1363636363636374,
        "localPctY": 0.4545454545454561,
        "localPctW": 0.36363636363636365,
        "localPctH": 0.34090909090909094,
        "text": "",
        "pathD": "M 13 2 C 13 2, 13 1, 13 1 C 11 1, 6 -1, 2 1 C -1 3, 0 8, 1 10 C 3 12, 6 15, 9 13 C 12 12, 14 7, 15 5 C 13 4, 13 3, 13 2 Z"
      },
      {
        "id": "sp-362",
        "x": 549,
        "y": 535.1818181818182,
        "width": 14.545454545454545,
        "height": 13.636363636363637,
        "localPctX": 0.5,
        "localPctY": 0.4545454545454561,
        "localPctW": 0.36363636363636365,
        "localPctH": 0.34090909090909094,
        "text": "",
        "pathD": "M 13 1 C 9 -1, 3 1, 2 1 C 2 1, 2 2, 2 2 C 2 3, 1 4, 0 5 C 1 6, 2 12, 6 13 C 9 15, 12 12, 13 10 C 15 8, 16 3, 13 1 Z"
      },
      {
        "id": "sp-363",
        "x": 529,
        "y": 517,
        "width": 40.90909090909091,
        "height": 40.90909090909091,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1.0227272727272727,
        "localPctH": 1.0227272727272727,
        "text": "",
        "pathD": "M 20 0 C 9 0, 0 9, 0 20 C 0 32, 9 41, 20 41 C 32 41, 41 32, 41 20 C 41 9, 32 0, 20 0 Z M 20 39 C 10 39, 2 30, 2 20 C 2 10, 10 2, 20 2 C 30 2, 39 10, 39 20 C 39 30, 30 39, 20 39 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 529,
    "y": 517,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-433",
    "isGroup": true,
    "children": [
      {
        "id": "sp-364",
        "x": 614.3636363636364,
        "y": 518,
        "width": 27.272727272727273,
        "height": 22.727272727272727,
        "localPctX": 0.15909090909090934,
        "localPctY": 0,
        "localPctW": 0.6818181818181819,
        "localPctH": 0.5681818181818181,
        "text": "",
        "pathD": "M 27 23 L 27 5 C 27 4, 27 4, 26 4 L 25 4 L 25 1 C 25 1, 25 0, 24 0 L 19 0 C 19 0, 18 1, 18 1 L 18 4 L 16 4 C 16 4, 16 4, 16 4 L 15 5 L 4 5 C 2 5, 1 6, 1 7 L 1 17 L 0 18 C 0 18, 0 18, 0 19 L 0 23 L 27 23 Z M 6 9 L 10 9 L 6 13 L 6 9 Z"
      },
      {
        "id": "sp-365",
        "x": 614.3636363636364,
        "y": 553.4545454545455,
        "width": 27.272727272727273,
        "height": 10,
        "localPctX": 0.15909090909090934,
        "localPctY": 0.8863636363636374,
        "localPctW": 0.6818181818181819,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 0 0 L 0 3 C 0 4, 1 5, 1 5 L 26 5 C 27 5, 27 4, 27 3 L 27 0 L 0 0 Z"
      },
      {
        "id": "sp-366",
        "x": 624.3636363636364,
        "y": 542.5454545454545,
        "width": 10,
        "height": 10,
        "localPctX": 0.40909090909090934,
        "localPctY": 0.6136363636363626,
        "localPctW": 0.1590909090909091,
        "localPctH": 0.22727272727272724,
        "text": "",
        "pathD": "M 3 9 C 5 9, 6 8, 6 6 C 6 4, 4 1, 4 0 C 4 0, 3 0, 3 0 C 3 0, 3 0, 3 0 C 3 1, 0 4, 0 6 C 0 8, 1 9, 3 9 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 608,
    "y": 518,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-437",
    "isGroup": true,
    "children": [
      {
        "id": "sp-367",
        "x": 691.5454545454545,
        "y": 517,
        "width": 32.72727272727273,
        "height": 40.90909090909091,
        "localPctX": 0.1136363636363626,
        "localPctY": 0,
        "localPctW": 0.8181818181818181,
        "localPctH": 1.0227272727272727,
        "text": "",
        "pathD": "M 32 0 C 32 0, 31 0, 31 0 C 30 1, 25 6, 25 10 C 24 13, 25 17, 26 20 C 27 23, 28 25, 28 27 C 28 28, 27 29, 26 29 C 26 29, 25 28, 25 27 C 25 25, 25 20, 21 20 L 21 8 C 21 7, 21 7, 20 7 L 19 7 L 19 6 C 19 5, 19 5, 18 5 L 7 5 C 6 5, 6 5, 6 6 L 6 7 L 5 7 C 4 7, 3 7, 3 8 L 3 36 L 1 36 C 1 36, 0 37, 0 37 L 0 40 C 0 40, 1 41, 1 41 L 24 41 C 24 41, 25 40, 25 40 L 25 37 C 25 37, 24 36, 24 36 L 21 36 L 21 22 C 22 22, 23 23, 23 27 C 23 30, 25 31, 26 31 C 28 31, 30 30, 30 27 C 30 24, 29 22, 28 20 C 28 18, 27 16, 27 14 C 29 14, 30 13, 30 12 C 31 10, 30 7, 29 6 C 30 5, 31 3, 32 2 C 33 2, 33 1, 32 0 Z M 19 18 C 19 19, 18 19, 18 19 L 7 19 C 6 19, 6 19, 6 18 L 6 11 C 6 10, 6 9, 7 9 L 18 9 C 18 9, 19 10, 19 11 L 19 18 Z M 28 11 C 28 12, 28 12, 27 12 C 27 12, 27 11, 27 11 C 27 10, 27 9, 28 8 C 28 9, 29 10, 28 11 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 687,
    "y": 517,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-439",
    "isGroup": true,
    "children": [
      {
        "id": "sp-368",
        "x": 775.0909090909091,
        "y": 525.2727272727273,
        "width": 22.727272727272727,
        "height": 33.63636363636363,
        "localPctX": 0.22727272727272804,
        "localPctY": 0.1818181818181813,
        "localPctW": 0.5681818181818181,
        "localPctH": 0.8409090909090908,
        "text": "",
        "pathD": "M 11 0 C 5 0, 0 5, 0 11 C 0 16, 2 19, 6 21 L 6 23 C 5 24, 5 24, 5 25 C 5 26, 5 27, 6 27 L 8 27 C 7 27, 7 28, 7 28 C 7 29, 7 30, 8 30 L 9 30 L 9 32 C 9 33, 10 34, 11 34 L 11 34 C 12 34, 13 33, 13 32 L 13 30 L 14 30 C 15 30, 16 29, 16 28 C 16 28, 16 27, 15 27 L 16 27 C 17 27, 18 26, 18 25 C 18 24, 18 24, 17 23 L 17 21 C 21 19, 23 16, 23 11 C 23 5, 18 0, 11 0 Z M 11 17 L 10 11 L 13 11 L 11 17 Z M 15 20 C 15 20, 15 20, 15 21 L 15 23 L 12 23 L 12 20 L 16 10 C 16 10, 16 9, 15 9 C 15 9, 15 9, 14 9 L 8 9 C 8 9, 7 9, 7 9 C 7 9, 7 10, 7 10 L 10 20 L 10 23 L 8 23 L 8 21 C 8 20, 8 20, 7 20 C 4 18, 2 15, 2 11 C 2 6, 6 2, 11 2 C 16 2, 20 6, 20 11 C 20 15, 19 18, 15 20 Z"
      },
      {
        "id": "sp-369",
        "x": 784.1818181818182,
        "y": 518,
        "width": 10,
        "height": 10,
        "localPctX": 0.4545454545454561,
        "localPctY": 0,
        "localPctW": 0.09090909090909091,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 2 5 C 3 5, 4 4, 4 3 L 4 2 C 4 1, 3 0, 2 0 C 1 0, 0 1, 0 2 L 0 3 C 0 4, 1 5, 2 5 Z"
      },
      {
        "id": "sp-370",
        "x": 776,
        "y": 520.7272727272727,
        "width": 10,
        "height": 10,
        "localPctX": 0.25,
        "localPctY": 0.0681818181818187,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 1 4 C 2 4, 2 5, 3 5 C 3 5, 3 4, 4 4 C 5 4, 5 3, 4 2 L 3 1 C 3 0, 2 0, 1 0 C 0 1, 0 2, 0 3 L 1 4 Z"
      },
      {
        "id": "sp-371",
        "x": 769.6363636363636,
        "y": 528,
        "width": 10,
        "height": 10,
        "localPctX": 0.09090909090909065,
        "localPctY": 0.25,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 4 1 L 2 0 C 2 0, 1 0, 0 1 C 0 2, 0 3, 1 3 L 2 3 C 3 4, 3 4, 3 4 C 4 4, 4 3, 4 3 C 5 2, 4 1, 4 1 Z"
      },
      {
        "id": "sp-372",
        "x": 768.7272727272727,
        "y": 536.1818181818182,
        "width": 10,
        "height": 10,
        "localPctX": 0.0681818181818187,
        "localPctY": 0.4545454545454561,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 3 0 L 1 0 C 1 0, 0 1, 0 2 C 0 3, 1 4, 2 4 C 2 4, 2 4, 2 4 L 3 3 C 4 3, 5 2, 4 1 C 4 1, 4 0, 3 0 Z"
      },
      {
        "id": "sp-373",
        "x": 798.7272727272727,
        "y": 536.1818181818182,
        "width": 10,
        "height": 10,
        "localPctX": 0.8181818181818187,
        "localPctY": 0.4545454545454561,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 3 0 L 2 0 C 1 0, 0 1, 0 1 C 0 2, 1 3, 1 3 L 3 4 C 3 4, 3 4, 3 4 C 4 4, 4 3, 4 2 C 5 1, 4 0, 3 0 Z"
      },
      {
        "id": "sp-374",
        "x": 797.8181818181819,
        "y": 528,
        "width": 10,
        "height": 10,
        "localPctX": 0.7954545454545467,
        "localPctY": 0.25,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 2 3 L 4 3 C 4 3, 5 2, 4 1 C 4 0, 3 0, 2 0 L 1 1 C 0 1, 0 2, 0 3 C 0 3, 1 4, 2 4 C 2 4, 2 4, 2 3 Z"
      },
      {
        "id": "sp-375",
        "x": 792.3636363636364,
        "y": 520.7272727272727,
        "width": 10,
        "height": 10,
        "localPctX": 0.6590909090909094,
        "localPctY": 0.0681818181818187,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 1 4 C 1 4, 2 5, 2 5 C 2 5, 3 4, 3 4 L 4 3 C 5 2, 5 1, 4 0 C 3 0, 2 0, 1 1 L 0 2 C 0 3, 0 4, 1 4 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 766,
    "y": 518,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-448",
    "isGroup": true,
    "children": [
      {
        "id": "sp-376",
        "x": 856.7272727272727,
        "y": 525.2727272727273,
        "width": 13.636363636363637,
        "height": 33.63636363636363,
        "localPctX": 0.3181818181818187,
        "localPctY": 0.1818181818181813,
        "localPctW": 0.34090909090909094,
        "localPctH": 0.8409090909090908,
        "text": "",
        "pathD": "M 13 15 L 11 15 L 11 5 C 11 2, 9 0, 7 0 L 7 0 C 4 0, 2 2, 2 5 L 2 15 L 1 15 C 1 15, 0 16, 0 16 L 0 22 C 0 23, 1 23, 1 23 L 4 23 C 3 23, 2 24, 2 25 C 2 26, 3 27, 4 27 C 3 27, 2 28, 2 28 C 2 29, 3 30, 4 30 L 5 30 L 5 32 C 5 33, 6 34, 7 34 L 7 34 C 8 34, 9 33, 9 32 L 9 30 L 10 30 C 11 30, 11 29, 11 28 C 11 28, 11 27, 10 27 C 11 27, 11 26, 11 25 C 11 24, 11 23, 10 23 L 13 23 C 13 23, 14 23, 14 22 L 14 16 C 14 16, 13 15, 13 15 Z M 5 5 C 5 3, 6 2, 7 2 L 7 2 C 8 2, 9 3, 9 5 L 9 15 L 5 15 L 5 5 Z"
      },
      {
        "id": "sp-377",
        "x": 862.1818181818181,
        "y": 518,
        "width": 10,
        "height": 10,
        "localPctX": 0.45454545454545325,
        "localPctY": 0,
        "localPctW": 0.09090909090909091,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 2 5 C 3 5, 4 4, 4 3 L 4 2 C 4 1, 3 0, 2 0 C 1 0, 0 1, 0 2 L 0 3 C 0 4, 1 5, 2 5 Z"
      },
      {
        "id": "sp-378",
        "x": 855.8181818181819,
        "y": 519.8181818181818,
        "width": 10,
        "height": 10,
        "localPctX": 0.29545454545454675,
        "localPctY": 0.0454545454545439,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 1 4 C 2 4, 2 5, 3 5 C 3 5, 3 4, 4 4 C 5 4, 5 3, 4 2 L 3 1 C 3 0, 2 0, 1 0 C 0 1, 0 2, 0 3 L 1 4 Z"
      },
      {
        "id": "sp-379",
        "x": 851.2727272727273,
        "y": 525.2727272727273,
        "width": 10,
        "height": 10,
        "localPctX": 0.1818181818181813,
        "localPctY": 0.1818181818181813,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 4 1 L 2 0 C 2 0, 1 0, 0 1 C 0 2, 0 3, 1 3 L 2 3 C 3 4, 3 4, 3 4 C 4 4, 4 3, 4 3 C 5 2, 4 1, 4 1 Z"
      },
      {
        "id": "sp-380",
        "x": 850.3636363636364,
        "y": 531.6363636363636,
        "width": 10,
        "height": 10,
        "localPctX": 0.15909090909090934,
        "localPctY": 0.34090909090909066,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 3 0 L 1 0 C 1 0, 0 1, 0 2 C 0 3, 1 4, 2 4 C 2 4, 2 4, 2 4 L 3 3 C 4 3, 5 2, 4 1 C 4 1, 4 0, 3 0 Z"
      },
      {
        "id": "sp-381",
        "x": 867.6363636363636,
        "y": 519.8181818181818,
        "width": 10,
        "height": 10,
        "localPctX": 0.5909090909090906,
        "localPctY": 0.0454545454545439,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 1 4 C 1 4, 2 5, 2 5 C 2 5, 3 4, 3 4 L 4 3 C 5 2, 5 1, 4 0 C 3 0, 2 0, 1 1 L 0 2 C 0 3, 0 4, 1 4 Z"
      },
      {
        "id": "sp-382",
        "x": 871.2727272727273,
        "y": 525.2727272727273,
        "width": 10,
        "height": 10,
        "localPctX": 0.6818181818181813,
        "localPctY": 0.1818181818181813,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 2 3 L 4 3 C 4 3, 5 2, 4 1 C 4 0, 3 0, 2 0 L 1 1 C 0 1, 0 2, 0 3 C 1 3, 1 4, 2 4 C 2 4, 2 4, 2 3 Z"
      },
      {
        "id": "sp-383",
        "x": 872.1818181818181,
        "y": 531.6363636363636,
        "width": 10,
        "height": 10,
        "localPctX": 0.7045454545454533,
        "localPctY": 0.34090909090909066,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 3 0 L 2 0 C 1 0, 0 1, 0 1 C 0 2, 1 3, 1 3 L 3 4 C 3 4, 3 4, 3 4 C 4 4, 4 3, 4 2 C 5 1, 4 0, 3 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 844,
    "y": 518,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-457",
    "isGroup": true,
    "children": [
      {
        "id": "sp-384",
        "x": 932.0909090909091,
        "y": 525.2727272727273,
        "width": 22.727272727272727,
        "height": 33.63636363636363,
        "localPctX": 0.22727272727272804,
        "localPctY": 0.1818181818181813,
        "localPctW": 0.5681818181818181,
        "localPctH": 0.8409090909090908,
        "text": "",
        "pathD": "M 11 0 C 5 0, 0 5, 0 11 C 0 15, 2 19, 6 21 L 6 23 C 5 24, 5 25, 5 25 C 5 26, 5 27, 6 27 C 5 28, 5 28, 5 29 C 5 30, 6 31, 7 31 L 7 31 C 8 33, 10 34, 11 34 C 13 34, 15 33, 16 31 L 16 31 C 17 31, 18 30, 18 29 C 18 28, 18 28, 17 27 C 18 27, 18 26, 18 25 C 18 25, 18 24, 17 23 L 17 21 C 21 19, 23 15, 23 11 C 23 5, 18 0, 11 0 Z M 15 20 C 15 20, 15 20, 15 20 L 15 23 L 13 23 L 13 14 C 13 14, 13 14, 13 14 C 14 14, 15 14, 16 13 C 19 12, 18 9, 18 9 C 18 9, 17 8, 17 8 C 16 8, 16 8, 15 8 C 14 8, 12 8, 12 9 C 12 9, 11 9, 11 9 C 11 9, 11 9, 11 9 C 11 8, 9 8, 8 8 C 7 8, 6 8, 6 8 C 5 8, 5 9, 5 9 C 5 9, 4 12, 7 13 C 8 14, 9 14, 10 14 C 10 14, 10 14, 10 14 L 10 23 L 8 23 L 8 20 C 8 20, 8 20, 7 20 C 4 18, 2 15, 2 11 C 2 6, 6 2, 11 2 C 16 2, 21 6, 21 11 C 21 15, 19 18, 15 20 Z M 13 12 C 13 12, 13 11, 13 11 C 14 10, 14 10, 15 10 C 15 10, 16 10, 16 10 C 16 10, 16 11, 15 12 C 14 12, 14 12, 13 12 C 13 12, 13 12, 13 12 Z M 10 12 C 10 12, 10 12, 10 12 C 9 12, 8 12, 8 12 C 7 11, 7 10, 7 10 C 7 10, 8 10, 8 10 C 9 10, 9 10, 10 11 C 10 11, 10 12, 10 12 Z"
      },
      {
        "id": "sp-385",
        "x": 942.0909090909091,
        "y": 518,
        "width": 10,
        "height": 10,
        "localPctX": 0.47727272727272807,
        "localPctY": 0,
        "localPctW": 0.09090909090909091,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 2 5 C 3 5, 4 4, 4 3 L 4 2 C 4 1, 3 0, 2 0 C 1 0, 0 1, 0 2 L 0 3 C 0 4, 1 5, 2 5 Z"
      },
      {
        "id": "sp-386",
        "x": 933,
        "y": 520.7272727272727,
        "width": 10,
        "height": 10,
        "localPctX": 0.25,
        "localPctY": 0.0681818181818187,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 1 4 C 2 4, 2 5, 3 5 C 3 5, 3 4, 4 4 C 5 4, 5 3, 4 2 L 3 1 C 3 0, 2 0, 1 0 C 0 1, 0 2, 0 3 L 1 4 Z"
      },
      {
        "id": "sp-387",
        "x": 926.6363636363637,
        "y": 527.0909090909091,
        "width": 10,
        "height": 10,
        "localPctX": 0.09090909090909349,
        "localPctY": 0.22727272727272804,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 4 1 L 2 0 C 2 0, 1 0, 0 1 C 0 2, 0 3, 1 3 L 2 3 C 3 4, 3 4, 3 4 C 4 4, 4 3, 4 3 C 5 2, 4 1, 4 1 Z"
      },
      {
        "id": "sp-388",
        "x": 925.7272727272727,
        "y": 536.1818181818182,
        "width": 10,
        "height": 10,
        "localPctX": 0.0681818181818187,
        "localPctY": 0.4545454545454561,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 3 0 L 1 0 C 1 0, 0 1, 0 2 C 0 3, 1 4, 2 4 C 2 4, 2 4, 2 4 L 3 3 C 4 3, 5 2, 4 1 C 4 1, 4 0, 3 0 Z"
      },
      {
        "id": "sp-389",
        "x": 956.6363636363637,
        "y": 536.1818181818182,
        "width": 10,
        "height": 10,
        "localPctX": 0.8409090909090935,
        "localPctY": 0.4545454545454561,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 3 0 L 2 0 C 1 0, 0 1, 0 1 C 0 2, 1 3, 1 3 L 3 4 C 3 4, 3 4, 3 4 C 4 4, 4 3, 4 2 C 5 1, 4 0, 3 0 Z"
      },
      {
        "id": "sp-390",
        "x": 954.8181818181819,
        "y": 527.0909090909091,
        "width": 10,
        "height": 10,
        "localPctX": 0.7954545454545467,
        "localPctY": 0.22727272727272804,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.09090909090909091,
        "text": "",
        "pathD": "M 2 3 L 4 3 C 4 3, 5 2, 4 1 C 4 0, 3 0, 2 0 L 1 1 C 0 1, 0 2, 0 3 C 0 3, 1 4, 2 4 C 2 4, 2 4, 2 3 Z"
      },
      {
        "id": "sp-391",
        "x": 949.3636363636364,
        "y": 520.7272727272727,
        "width": 10,
        "height": 10,
        "localPctX": 0.6590909090909094,
        "localPctY": 0.0681818181818187,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 1 4 C 1 4, 2 5, 2 5 C 2 5, 3 4, 3 4 L 4 3 C 5 2, 5 1, 4 0 C 3 0, 2 0, 1 1 L 0 2 C 0 3, 0 4, 1 4 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 923,
    "y": 518,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-466",
    "isGroup": true,
    "children": [
      {
        "id": "sp-392",
        "x": 1013.8181818181819,
        "y": 517,
        "width": 36.36363636363636,
        "height": 40.90909090909091,
        "localPctX": 0.045454545454546746,
        "localPctY": 0,
        "localPctW": 0.909090909090909,
        "localPctH": 1.0227272727272727,
        "text": "",
        "pathD": "M 31 20 C 35 17, 37 13, 36 10 C 35 9, 34 8, 31 8 C 29 8, 27 8, 25 9 C 24 4, 21 0, 18 0 C 15 0, 13 4, 12 9 C 10 8, 8 8, 6 8 C 3 8, 1 9, 1 10 C -1 12, 0 15, 3 19 C 4 19, 4 20, 5 20 C 4 21, 4 22, 3 22 C 0 25, 0 28, 1 30 C 1 31, 3 33, 6 33 C 8 33, 10 32, 12 32 C 13 37, 15 41, 18 41 C 22 41, 24 37, 25 32 C 27 33, 29 33, 30 33 C 34 33, 35 32, 36 31 C 37 29, 36 26, 33 22 C 33 22, 32 21, 31 20 Z M 31 10 C 32 10, 34 10, 34 11 C 35 12, 34 14, 32 17 C 31 18, 30 18, 30 19 C 29 18, 28 17, 26 16 C 26 14, 26 12, 26 11 C 27 10, 29 10, 31 10 Z M 21 25 C 20 26, 19 26, 18 27 C 17 27, 16 26, 15 26 C 14 25, 14 25, 13 24 C 13 23, 13 22, 13 20 C 13 19, 13 18, 13 17 C 14 16, 14 16, 15 15 C 16 15, 17 14, 18 14 C 19 14, 20 15, 21 15 C 22 16, 23 17, 24 17 C 24 18, 24 19, 24 20 C 24 21, 24 22, 24 23 C 23 24, 22 25, 21 25 Z M 24 26 C 24 27, 24 28, 23 29 C 23 29, 22 29, 21 28 C 21 28, 22 28, 22 27 C 23 27, 23 27, 24 26 Z M 15 28 C 15 28, 14 29, 13 29 C 13 28, 13 27, 13 27 C 13 27, 14 27, 14 27 C 15 28, 15 28, 15 28 Z M 10 22 C 10 22, 9 21, 8 20 C 9 20, 10 19, 10 18 C 10 19, 10 20, 10 20 C 10 21, 10 22, 10 22 Z M 13 14 C 13 13, 13 12, 13 12 C 14 12, 15 12, 15 13 C 15 13, 15 13, 14 13 C 14 13, 13 14, 13 14 Z M 20 13 C 21 12, 22 12, 23 11 C 24 12, 24 13, 24 15 C 23 14, 23 14, 22 13 C 22 13, 21 13, 20 13 Z M 26 19 C 27 19, 28 20, 28 20 C 28 21, 27 21, 26 22 C 26 21, 26 21, 26 20 C 26 20, 26 19, 26 19 Z M 15 7 C 16 4, 17 2, 18 2 C 20 2, 21 4, 22 7 C 23 8, 23 9, 23 9 C 21 10, 20 10, 18 11 C 17 11, 15 10, 14 10 C 14 9, 14 8, 15 7 Z M 2 11 C 3 11, 4 10, 6 10 C 7 10, 9 10, 11 11 C 11 13, 11 14, 11 16 C 9 17, 8 18, 6 19 C 6 18, 5 18, 5 17 C 3 15, 2 13, 2 11 Z M 6 30 C 4 30, 3 30, 3 29 C 2 28, 3 26, 5 23 C 5 23, 6 22, 6 22 C 8 23, 9 24, 11 25 C 11 27, 11 28, 11 30 C 9 30, 8 30, 6 30 Z M 22 34 C 21 37, 20 39, 18 39 C 17 39, 16 37, 15 34 C 14 33, 14 32, 14 31 C 15 31, 17 30, 18 29 C 20 30, 21 31, 23 31 C 23 32, 23 33, 22 34 Z M 34 30 C 33 30, 32 31, 30 31 C 29 31, 27 30, 26 30 C 26 28, 26 26, 26 25 C 28 24, 29 23, 30 22 C 30 22, 31 23, 32 24 C 34 26, 34 28, 34 30 Z"
      },
      {
        "id": "sp-393",
        "x": 1030.181818181818,
        "y": 535.1818181818182,
        "width": 10,
        "height": 10,
        "localPctX": 0.4545454545454504,
        "localPctY": 0.4545454545454561,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 5 2 C 5 4, 4 5, 2 5 C 1 5, 0 4, 0 2 C 0 1, 1 0, 2 0 C 4 0, 5 1, 5 2 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 15,
    "x": 1012,
    "y": 517,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-469",
    "isGroup": true,
    "children": [
      {
        "id": "sp-394",
        "x": 1092,
        "y": 518,
        "width": 40,
        "height": 40,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 20 0 C 9 0, 0 9, 0 20 C 0 31, 9 40, 20 40 C 31 40, 40 31, 40 20 C 40 9, 31 0, 20 0 Z M 25 34 L 21 23 C 22 23, 23 21, 23 20 C 23 20, 23 20, 23 20 L 35 18 C 36 25, 32 32, 25 34 Z M 29 8 L 22 17 C 21 17, 21 17, 20 17 C 19 17, 19 17, 18 18 L 11 8 C 16 4, 24 4, 29 8 Z M 17 20 C 17 20, 17 20, 17 20 C 17 21, 18 22, 19 23 L 14 34 C 8 32, 4 25, 5 18 L 17 20 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 16,
    "x": 1092,
    "y": 518,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-471",
    "isGroup": true,
    "children": [
      {
        "id": "sp-395",
        "x": 1179.7272727272727,
        "y": 526.1818181818182,
        "width": 26.363636363636363,
        "height": 31.818181818181817,
        "localPctX": 0.0681818181818187,
        "localPctY": 0.20454545454545608,
        "localPctW": 0.6590909090909091,
        "localPctH": 0.7954545454545454,
        "text": "",
        "pathD": "M 24 28 L 23 4 C 24 4, 25 3, 25 2 C 25 1, 24 0, 22 0 L 4 0 C 3 0, 2 1, 2 2 C 2 3, 3 4, 4 4 L 4 4 L 2 28 C 1 29, 0 30, 0 32 L 2 32 C 2 32, 2 32, 2 32 L 24 32 C 24 32, 24 32, 24 32 L 26 32 C 26 30, 26 29, 24 28 Z M 7 17 L 13 16 L 10 11 C 10 11, 11 10, 13 10 C 15 10, 16 11, 16 11 L 13 16 L 19 17 C 19 17, 20 18, 19 19 C 18 21, 17 21, 17 21 L 13 16 L 10 21 C 10 21, 9 21, 8 19 C 7 18, 7 17, 7 17 Z"
      },
      {
        "id": "sp-396",
        "x": 1185.1818181818182,
        "y": 518,
        "width": 28.18181818181818,
        "height": 10,
        "localPctX": 0.20454545454545608,
        "localPctY": 0,
        "localPctW": 0.7045454545454545,
        "localPctH": 0.1590909090909091,
        "text": "",
        "pathD": "M 26 0 C 24 0, 23 1, 21 2 C 20 2, 20 3, 18 3 C 17 3, 16 2, 15 2 C 14 1, 13 0, 10 0 C 7 0, 6 1, 5 2 C 4 2, 3 3, 2 3 C 1 3, 0 4, 0 5 C 0 6, 1 6, 2 6 C 4 6, 6 5, 7 5 C 8 4, 8 4, 10 4 C 12 4, 12 4, 13 5 C 14 5, 16 6, 18 6 C 21 6, 22 5, 23 5 C 24 4, 25 4, 26 4 C 27 4, 28 3, 28 2 C 28 1, 27 0, 26 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 17,
    "x": 1177,
    "y": 518,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-474",
    "isGroup": true,
    "children": [
      {
        "id": "sp-397",
        "x": 1016,
        "y": 453.9090909090909,
        "width": 40,
        "height": 38.18181818181818,
        "localPctX": 0,
        "localPctY": 0.02272727272727195,
        "localPctW": 1,
        "localPctH": 0.9545454545454545,
        "text": "",
        "pathD": "M 40 18 L 35 14 L 36 8 C 36 8, 36 7, 35 7 L 30 6 L 27 1 C 27 0, 26 0, 25 0 L 20 3 L 15 0 C 14 0, 14 0, 13 1 L 11 6 L 5 7 C 4 7, 4 8, 4 8 L 5 14 L 0 18 C 0 19, 0 19, 0 20 L 5 24 L 4 30 C 4 31, 4 31, 5 31 L 11 32 L 13 38 C 13 38, 14 38, 14 38 C 14 38, 15 38, 15 38 L 20 35 L 25 38 C 26 38, 27 38, 27 38 L 30 32 L 35 31 C 36 31, 36 31, 36 30 L 35 24 L 40 20 C 40 19, 40 19, 40 18 Z M 20 32 C 13 32, 7 26, 7 19 C 7 12, 13 6, 20 6 C 27 6, 33 12, 33 19 C 33 26, 27 32, 20 32 Z"
      },
      {
        "id": "sp-398",
        "x": 1025.090909090909,
        "y": 462.0909090909091,
        "width": 22.727272727272727,
        "height": 22.727272727272727,
        "localPctX": 0.2272727272727252,
        "localPctY": 0.22727272727272804,
        "localPctW": 0.5681818181818181,
        "localPctH": 0.5681818181818181,
        "text": "",
        "pathD": "M 23 11 C 23 18, 18 23, 11 23 C 5 23, 0 18, 0 11 C 0 5, 5 0, 11 0 C 18 0, 23 5, 23 11 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 1016,
    "y": 453,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-477",
    "isGroup": true,
    "children": [
      {
        "id": "sp-399",
        "x": 1094,
        "y": 460.1818181818182,
        "width": 40,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.20454545454545467,
        "localPctW": 1,
        "localPctH": 0.20454545454545453,
        "text": "",
        "pathD": "M 2 5 C 3 5, 3 5, 4 6 C 5 7, 7 8, 9 8 C 12 8, 13 7, 14 6 C 15 5, 16 5, 16 5 C 17 5, 18 5, 19 6 C 20 7, 21 8, 24 8 C 26 8, 28 7, 29 6 C 30 5, 30 5, 31 5 C 32 5, 32 5, 33 6 C 34 7, 35 8, 38 8 C 39 8, 40 7, 40 6 C 40 5, 39 4, 38 4 C 37 4, 37 3, 36 3 C 35 2, 33 0, 31 0 C 28 0, 27 2, 26 3 C 25 3, 24 4, 24 4 C 23 4, 22 3, 22 3 C 21 2, 19 0, 16 0 C 14 0, 12 2, 11 3 C 11 3, 10 4, 9 4 C 8 4, 8 3, 7 3 C 6 2, 5 0, 2 0 C 1 0, 0 1, 0 2 C 0 4, 1 5, 2 5 Z"
      },
      {
        "id": "sp-400",
        "x": 1094,
        "y": 468.3636363636364,
        "width": 40,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.40909090909090934,
        "localPctW": 1,
        "localPctH": 0.20454545454545453,
        "text": "",
        "pathD": "M 38 4 C 37 4, 37 3, 36 3 C 35 2, 33 0, 31 0 C 28 0, 27 2, 26 3 C 25 3, 24 4, 24 4 C 23 4, 22 3, 22 3 C 21 2, 19 0, 16 0 C 14 0, 12 2, 11 3 C 11 3, 10 4, 9 4 C 8 4, 8 3, 7 3 C 6 2, 5 0, 2 0 C 1 0, 0 1, 0 2 C 0 4, 1 5, 2 5 C 3 5, 3 5, 4 6 C 5 7, 7 8, 9 8 C 12 8, 13 7, 14 6 C 15 5, 16 5, 16 5 C 17 5, 18 5, 19 6 C 20 7, 21 8, 24 8 C 26 8, 28 7, 29 6 C 30 5, 30 5, 31 5 C 32 5, 32 5, 33 6 C 34 7, 35 8, 38 8 C 39 8, 40 7, 40 6 C 40 5, 39 4, 38 4 Z"
      },
      {
        "id": "sp-401",
        "x": 1094,
        "y": 476.5454545454545,
        "width": 40,
        "height": 10,
        "localPctX": 0,
        "localPctY": 0.6136363636363626,
        "localPctW": 1,
        "localPctH": 0.20454545454545453,
        "text": "",
        "pathD": "M 38 4 C 37 4, 37 3, 36 3 C 35 2, 33 0, 31 0 C 28 0, 27 2, 26 3 C 25 3, 24 4, 24 4 C 23 4, 22 3, 22 3 C 21 2, 19 0, 16 0 C 14 0, 12 2, 11 3 C 11 3, 10 4, 9 4 C 8 4, 8 3, 7 3 C 6 2, 5 0, 2 0 C 1 0, 0 1, 0 2 C 0 4, 1 5, 2 5 C 3 5, 3 5, 4 6 C 5 7, 7 8, 9 8 C 12 8, 13 7, 14 6 C 15 5, 16 5, 16 5 C 17 5, 18 5, 19 6 C 20 7, 21 8, 24 8 C 26 8, 28 7, 29 6 C 30 5, 30 5, 31 5 C 32 5, 32 5, 33 6 C 34 7, 35 8, 38 8 C 39 8, 40 7, 40 6 C 40 5, 39 4, 38 4 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1094,
    "y": 452,
    "width": 40,
    "height": 40
  },
  {
    "id": "grp-481",
    "isGroup": true,
    "children": [
      {
        "id": "sp-402",
        "x": 1182.0909090909092,
        "y": 473,
        "width": 20,
        "height": 20,
        "localPctX": 0.2272727272727309,
        "localPctY": 0.5,
        "localPctW": 0.5,
        "localPctH": 0.5,
        "text": "",
        "pathD": "M 9 0 L 7 15 C 3 15, 0 17, 0 20 L 1 20 L 2 20 L 18 20 L 19 20 L 20 20 C 20 17, 17 15, 13 15 L 11 0 C 11 0, 10 0, 10 0 C 10 0, 9 0, 9 0 Z"
      },
      {
        "id": "sp-403",
        "x": 1190.2727272727273,
        "y": 453,
        "width": 10,
        "height": 11.818181818181818,
        "localPctX": 0.4318181818181813,
        "localPctY": 0,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.29545454545454547,
        "text": "",
        "pathD": "M 5 12 L 5 2 C 5 1, 4 0, 2 0 C 1 0, 0 1, 0 2 L 0 12 C 1 11, 2 11, 2 11 C 3 11, 4 11, 5 12 Z"
      },
      {
        "id": "sp-404",
        "x": 1179.3636363636365,
        "y": 468.45454545454544,
        "width": 10.909090909090908,
        "height": 10,
        "localPctX": 0.1590909090909122,
        "localPctY": 0.38636363636363596,
        "localPctW": 0.2727272727272727,
        "localPctH": 0.22727272727272724,
        "text": "",
        "pathD": "M 9 1 C 9 1, 9 0, 9 0 L 1 5 C 0 5, 0 7, 0 8 C 1 9, 2 9, 2 9 C 3 9, 3 9, 3 9 L 11 4 C 10 4, 9 2, 9 1 Z"
      },
      {
        "id": "sp-405",
        "x": 1194.8181818181818,
        "y": 468.45454545454544,
        "width": 10.909090909090908,
        "height": 10,
        "localPctX": 0.5454545454545439,
        "localPctY": 0.38636363636363596,
        "localPctW": 0.2727272727272727,
        "localPctH": 0.22727272727272724,
        "text": "",
        "pathD": "M 10 5 L 2 0 C 2 0, 2 1, 2 1 C 2 2, 1 4, 0 4 L 8 9 C 8 9, 8 9, 9 9 C 9 9, 10 9, 11 8 C 11 7, 11 5, 10 5 Z"
      },
      {
        "id": "sp-406",
        "x": 1190.2727272727273,
        "y": 466.6363636363636,
        "width": 10,
        "height": 10,
        "localPctX": 0.4318181818181813,
        "localPctY": 0.34090909090909066,
        "localPctW": 0.11363636363636362,
        "localPctH": 0.11363636363636362,
        "text": "",
        "pathD": "M 5 2 C 5 4, 4 5, 2 5 C 1 5, 0 4, 0 2 C 0 1, 1 0, 2 0 C 4 0, 5 1, 5 2 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 1173,
    "y": 453,
    "width": 40,
    "height": 40
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 87,
    "x": 63,
    "y": 588,
    "width": 34,
    "height": 25,
    "text": "",
    "pathD": "M 15 4 L 11 0 L 0 0 L 0 25 L 34 25 L 34 4 L 15 4 Z"
  },
  {
    "id": "grp-488",
    "isGroup": true,
    "children": [
      {
        "id": "sp-407",
        "x": 348.6666666666667,
        "y": 579,
        "width": 16.666666666666668,
        "height": 10,
        "localPctX": 0.22222222222222285,
        "localPctY": 0,
        "localPctW": 0.5555555555555556,
        "localPctH": 0.25806451612903225,
        "text": "",
        "pathD": "M 17 4 C 13 4, 13 4, 13 4 C 13 2, 11 0, 8 0 C 6 0, 4 2, 4 4 C 0 4, 0 4, 0 4 C 0 9, 0 9, 0 9 C 17 9, 17 9, 17 9 L 17 4 Z M 8 7 C 7 7, 6 5, 6 4 C 6 3, 7 2, 8 2 C 9 2, 11 3, 11 4 C 11 5, 9 7, 8 7 Z"
      },
      {
        "id": "sp-408",
        "x": 342,
        "y": 583.3870967741937,
        "width": 30,
        "height": 29.61290322580645,
        "localPctX": 0,
        "localPctY": 0.12903225806451915,
        "localPctW": 1,
        "localPctH": 0.8709677419354838,
        "text": "",
        "pathD": "M 26 0 L 26 6 L 4 6 L 4 0 L 0 0 L 0 30 L 30 30 L 30 0 L 26 0 Z M 14 25 L 12 23 L 6 18 L 10 15 L 14 19 L 23 11 L 26 14 L 14 25 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 91,
    "x": 342,
    "y": 579,
    "width": 30,
    "height": 34
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 89,
    "x": 200,
    "y": 579,
    "width": 33,
    "height": 30,
    "text": "",
    "pathD": "M 31 1 C 30 0, 28 0, 27 1 C 11 21, 11 21, 11 21 C 6 15, 6 15, 6 15 C 5 14, 3 13, 1 14 C 0 15, 0 17, 1 18 C 11 30, 11 30, 11 30 C 32 5, 32 5, 32 5 C 33 4, 33 2, 31 1 Z"
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 90,
    "x": 270,
    "y": 579,
    "width": 33,
    "height": 32,
    "text": "",
    "pathD": "M 33 2 C 31 0, 31 0, 31 0 C 25 6, 25 6, 25 6 C 23 4, 19 2, 15 2 C 7 2, 0 9, 0 17 C 0 25, 7 32, 15 32 C 23 32, 30 25, 30 17 C 30 14, 29 11, 28 9 L 33 2 Z M 28 17 C 28 24, 22 30, 15 30 C 8 30, 2 24, 2 17 C 2 10, 8 4, 15 4 C 19 4, 22 6, 24 8 C 15 18, 15 18, 15 18 C 8 11, 8 11, 8 11 C 5 16, 5 16, 5 16 C 13 24, 13 24, 13 24 C 14 26, 14 26, 14 26 C 16 24, 16 24, 16 24 C 26 11, 26 11, 26 11 C 27 13, 28 15, 28 17 Z"
  },
  {
    "id": "grp-493",
    "isGroup": true,
    "children": [
      {
        "id": "sp-409",
        "x": 479,
        "y": 583,
        "width": 30,
        "height": 30,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 0 0 L 0 30 L 30 30 L 30 0 L 0 0 Z M 28 28 L 2 28 L 2 2 L 28 2 L 28 28 Z"
      },
      {
        "id": "sp-410",
        "x": 485.6666666666667,
        "y": 589.6666666666667,
        "width": 18.88888888888889,
        "height": 17.77777777777778,
        "localPctX": 0.22222222222222285,
        "localPctY": 0.22222222222222474,
        "localPctW": 0.6296296296296297,
        "localPctH": 0.5925925925925927,
        "text": "",
        "pathD": "M 3 18 L 10 12 L 15 18 L 19 15 L 13 9 L 19 3 L 15 0 L 10 6 L 3 0 L 0 3 L 6 9 L 0 15 L 3 18 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 93,
    "x": 479,
    "y": 583,
    "width": 30,
    "height": 30
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 92,
    "x": 414,
    "y": 579,
    "width": 31,
    "height": 34,
    "text": "",
    "pathD": "M 0 9 C 0 25, 0 25, 0 25 C 0 30, 0 34, 7 34 C 15 34, 15 34, 15 34 C 20 34, 22 31, 22 28 C 30 18, 30 18, 30 18 C 31 18, 31 16, 30 16 C 30 15, 28 14, 26 14 C 25 14, 24 14, 23 16 C 20 18, 20 18, 20 18 C 20 4, 20 4, 20 4 C 20 3, 19 2, 17 2 C 15 2, 15 2, 15 2 C 15 1, 14 0, 13 0 C 11 0, 11 0, 11 0 C 10 0, 9 1, 9 2 C 7 2, 7 2, 7 2 C 5 2, 5 3, 5 4 C 5 6, 5 6, 5 6 C 2 6, 2 6, 2 6 C 1 6, 0 7, 0 9 Z M 2 9 C 5 9, 5 9, 5 9 C 5 11, 5 11, 5 11 C 5 17, 5 17, 5 17 C 7 17, 7 17, 7 17 C 7 6, 7 6, 7 6 C 7 4, 7 4, 7 4 C 9 4, 9 4, 9 4 C 9 6, 9 6, 9 6 C 9 17, 9 17, 9 17 C 11 17, 11 17, 11 17 C 11 4, 11 4, 11 4 C 11 2, 11 2, 11 2 C 13 2, 13 2, 13 2 C 13 4, 13 4, 13 4 C 13 17, 13 17, 13 17 C 15 17, 15 17, 15 17 C 15 9, 15 9, 15 9 C 15 6, 15 6, 15 6 C 15 4, 15 4, 15 4 C 17 4, 17 4, 17 4 C 17 6, 17 6, 17 6 C 17 9, 17 9, 17 9 C 17 21, 17 21, 17 21 C 20 21, 20 21, 20 21 C 20 21, 20 21, 20 21 C 20 21, 22 19, 24 17 C 25 16, 26 16, 26 16 C 28 16, 29 17, 29 17 C 20 28, 20 28, 20 28 C 20 28, 20 28, 20 28 C 20 28, 20 28, 20 28 C 20 30, 19 32, 15 32 C 11 32, 11 32, 7 32 C 2 32, 2 30, 2 25 C 2 22, 2 14, 2 11 L 2 9 Z"
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 88,
    "x": 131,
    "y": 579,
    "width": 34,
    "height": 34,
    "text": "",
    "pathD": "M 17 0 C 8 0, 0 8, 0 17 C 0 26, 8 34, 17 34 C 26 34, 34 26, 34 17 C 34 8, 26 0, 17 0 Z M 15 4 C 19 4, 19 4, 19 4 C 19 15, 19 15, 19 15 C 15 15, 15 15, 15 15 L 15 4 Z M 17 28 C 11 28, 6 23, 6 17 C 6 13, 9 9, 13 7 C 13 6, 13 6, 13 6 C 13 11, 13 11, 13 11 C 11 12, 9 14, 9 17 C 9 21, 13 25, 17 25 C 21 25, 25 21, 25 17 C 25 14, 23 12, 21 11 C 21 6, 21 6, 21 6 C 22 7, 22 7, 22 7 C 26 9, 28 13, 28 17 C 28 23, 23 28, 17 28 Z"
  },
  {
    "id": "grp-498",
    "isGroup": true,
    "children": [
      {
        "id": "sp-411",
        "x": 543,
        "y": 589.9677419354839,
        "width": 23.032258064516128,
        "height": 23.032258064516128,
        "localPctX": 0,
        "localPctY": 0.3225806451612912,
        "localPctW": 0.6774193548387096,
        "localPctH": 0.6774193548387096,
        "text": "",
        "pathD": "M 22 9 C 18 9, 18 9, 18 9 C 18 9, 18 8, 18 7 C 20 5, 20 5, 20 5 C 20 5, 20 4, 20 4 C 19 3, 19 3, 19 3 C 18 2, 18 2, 17 3 C 15 5, 15 5, 15 5 C 14 5, 14 4, 13 4 C 13 1, 13 1, 13 1 C 13 1, 12 0, 12 0 C 11 0, 11 0, 11 0 C 10 0, 9 1, 9 1 C 9 4, 9 4, 9 4 C 9 4, 8 5, 7 5 C 5 3, 5 3, 5 3 C 5 3, 4 3, 3 3 C 3 4, 3 4, 3 4 C 2 5, 2 5, 3 6 C 5 8, 5 8, 5 8 C 4 8, 4 9, 4 10 C 1 10, 1 10, 1 10 C 1 10, 0 11, 0 11 C 0 13, 0 13, 0 13 C 0 13, 1 14, 1 14 C 4 14, 4 14, 4 14 C 4 15, 4 15, 5 16 C 3 18, 3 18, 3 18 C 3 18, 3 19, 3 20 C 4 20, 4 20, 4 20 C 5 21, 5 21, 6 20 C 8 18, 8 18, 8 18 C 8 19, 9 19, 10 19 C 10 22, 10 22, 10 22 C 10 22, 10 23, 11 23 C 12 23, 12 23, 12 23 C 13 23, 14 22, 14 22 C 14 19, 14 19, 14 19 C 14 18, 15 18, 16 18 C 18 20, 18 20, 18 20 C 18 20, 19 20, 19 20 C 20 19, 20 19, 20 19 C 21 18, 21 18, 20 17 C 18 15, 18 15, 18 15 C 18 14, 18 14, 19 13 C 22 13, 22 13, 22 13 C 22 13, 23 13, 23 12 C 23 11, 23 11, 23 11 C 23 10, 22 9, 22 9 Z M 11 15 C 10 15, 8 13, 8 12 C 8 10, 10 8, 11 8 C 13 8, 14 10, 14 12 C 14 13, 13 15, 11 15 Z"
      },
      {
        "id": "sp-412",
        "x": 561.6451612903227,
        "y": 579,
        "width": 15.354838709677418,
        "height": 15.354838709677418,
        "localPctX": 0.5483870967741964,
        "localPctY": 0,
        "localPctW": 0.45161290322580644,
        "localPctH": 0.45161290322580644,
        "text": "",
        "pathD": "M 14 6 C 12 6, 12 6, 12 6 C 12 6, 12 5, 12 5 C 13 4, 13 4, 13 4 C 14 3, 14 3, 13 2 C 13 2, 13 2, 13 2 C 12 2, 12 2, 11 2 C 10 3, 10 3, 10 3 C 10 3, 9 3, 9 3 C 9 1, 9 1, 9 1 C 9 0, 8 0, 8 0 C 7 0, 7 0, 7 0 C 7 0, 6 0, 6 1 C 6 3, 6 3, 6 3 C 6 3, 5 3, 5 3 C 4 2, 4 2, 4 2 C 3 2, 3 2, 2 2 C 2 3, 2 3, 2 3 C 2 3, 2 4, 2 4 C 3 5, 3 5, 3 5 C 3 5, 3 6, 2 7 C 1 7, 1 7, 1 7 C 1 7, 0 7, 0 8 C 0 8, 0 8, 0 8 C 0 9, 1 9, 1 9 C 3 9, 3 9, 3 9 C 3 10, 3 10, 3 11 C 2 12, 2 12, 2 12 C 2 12, 2 13, 2 13 C 3 14, 3 14, 3 14 C 3 14, 4 14, 4 14 C 5 12, 5 12, 5 12 C 6 12, 6 13, 7 13 C 7 14, 7 14, 7 14 C 7 15, 7 15, 8 15 C 8 15, 8 15, 8 15 C 9 15, 9 15, 9 14 C 9 12, 9 12, 9 12 C 10 12, 10 12, 11 12 C 12 13, 12 13, 12 13 C 12 14, 13 14, 13 13 C 14 13, 14 13, 14 13 C 14 12, 14 12, 14 11 C 12 10, 12 10, 12 10 C 12 10, 12 9, 13 9 C 14 9, 14 9, 14 9 C 15 9, 15 8, 15 8 C 15 7, 15 7, 15 7 C 15 7, 15 6, 14 6 Z M 8 10 C 6 10, 5 9, 5 8 C 5 6, 6 5, 8 5 C 9 5, 10 6, 10 8 C 10 9, 9 10, 8 10 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 94,
    "x": 543,
    "y": 579,
    "width": 34,
    "height": 34
  },
  {
    "id": "grp-501",
    "isGroup": true,
    "children": [
      {
        "id": "sp-413",
        "x": 612,
        "y": 579,
        "width": 25.000000000000004,
        "height": 34,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1.0000000000000002,
        "localPctH": 1,
        "text": "",
        "pathD": "M 23 3 C 25 3, 25 3, 25 3 C 25 0, 25 0, 25 0 C 0 0, 0 0, 0 0 C 0 3, 0 3, 0 3 C 2 3, 2 3, 2 3 C 2 10, 5 14, 9 15 C 9 19, 9 19, 9 19 C 5 20, 3 24, 2 31 C 0 31, 0 31, 0 31 C 0 34, 0 34, 0 34 C 25 34, 25 34, 25 34 C 25 31, 25 31, 25 31 C 23 31, 23 31, 23 31 C 23 24, 21 20, 16 19 C 16 15, 16 15, 16 15 C 21 14, 23 10, 23 3 Z M 15 20 C 20 21, 21 26, 21 31 C 20 31, 20 31, 20 31 C 17 27, 17 27, 17 27 C 13 23, 13 23, 13 23 C 9 27, 9 27, 9 27 C 6 31, 6 31, 6 31 C 4 31, 4 31, 4 31 C 4 26, 5 21, 10 20 C 11 20, 11 20, 11 20 C 11 14, 11 14, 11 14 C 10 14, 10 14, 10 14 C 5 13, 4 8, 4 3 C 21 3, 21 3, 21 3 C 21 8, 20 13, 15 14 C 15 14, 15 14, 15 14 C 15 20, 15 20, 15 20 L 15 20 Z"
      },
      {
        "id": "sp-414",
        "x": 622.2272727272727,
        "y": 588.8709677419355,
        "width": 10,
        "height": 10,
        "localPctX": 0.4090909090909099,
        "localPctY": 0.2903225806451614,
        "localPctW": 0.2727272727272727,
        "localPctH": 0.12903225806451613,
        "text": "",
        "pathD": "M 7 0 L 0 0 L 2 2 L 3 4 L 5 2 L 7 0 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 95,
    "x": 612,
    "y": 579,
    "width": 25,
    "height": 34
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 96,
    "x": 693,
    "y": 586,
    "width": 34,
    "height": 30,
    "text": "",
    "pathD": "M 19 0 C 12 0, 5 6, 4 13 C 0 13, 0 13, 0 13 C 6 21, 6 21, 6 21 C 13 13, 13 13, 13 13 C 9 13, 9 13, 9 13 C 10 8, 14 4, 19 4 C 25 4, 30 9, 30 15 C 30 21, 25 26, 19 26 C 19 30, 19 30, 19 30 C 27 30, 34 23, 34 15 C 34 7, 27 0, 19 0 Z"
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 97,
    "x": 761,
    "y": 582,
    "width": 28,
    "height": 34,
    "text": "",
    "pathD": "M 18 0 L 0 0 L 0 34 L 28 34 L 28 10 L 18 0 Z M 24 30 L 4 30 L 4 4 L 16 4 L 17 5 L 17 11 L 23 11 L 24 11 L 24 30 Z"
  },
  {
    "id": "grp-506",
    "isGroup": true,
    "children": [
      {
        "id": "sp-415",
        "x": 1036,
        "y": 582,
        "width": 30,
        "height": 34,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 20 0 L 0 0 L 0 34 L 30 34 L 30 10 L 20 0 Z M 26 30 L 4 30 L 4 4 L 19 4 L 26 11 L 26 30 Z"
      },
      {
        "id": "sp-416",
        "x": 1043.7777777777778,
        "y": 596.258064516129,
        "width": 13.333333333333334,
        "height": 10,
        "localPctX": 0.25925925925926097,
        "localPctY": 0.4193548387096772,
        "localPctW": 0.4444444444444445,
        "localPctH": 0.06451612903225806,
        "text": ""
      },
      {
        "id": "sp-417",
        "x": 1043.7777777777778,
        "y": 591.8709677419355,
        "width": 10,
        "height": 10,
        "localPctX": 0.25925925925926097,
        "localPctY": 0.2903225806451614,
        "localPctW": 0.29629629629629634,
        "localPctH": 0.06451612903225806,
        "text": ""
      },
      {
        "id": "sp-418",
        "x": 1043.7777777777778,
        "y": 600.6451612903226,
        "width": 13.333333333333334,
        "height": 10,
        "localPctX": 0.25925925925926097,
        "localPctY": 0.5483870967741931,
        "localPctW": 0.4444444444444445,
        "localPctH": 0.06451612903225806,
        "text": ""
      },
      {
        "id": "sp-419",
        "x": 1043.7777777777778,
        "y": 605.0322580645161,
        "width": 13.333333333333334,
        "height": 10,
        "localPctX": 0.25925925925926097,
        "localPctY": 0.6774193548387089,
        "localPctW": 0.4444444444444445,
        "localPctH": 0.06451612903225806,
        "text": ""
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 101,
    "x": 1036,
    "y": 582,
    "width": 30,
    "height": 34
  },
  {
    "id": "grp-512",
    "isGroup": true,
    "children": [
      {
        "id": "sp-420",
        "x": 849.8620689655172,
        "y": 594.0645161290322,
        "width": 13.241379310344827,
        "height": 20.838709677419352,
        "localPctX": 0.6206896551724128,
        "localPctY": 0.35483870967741765,
        "localPctW": 0.41379310344827586,
        "localPctH": 0.6129032258064515,
        "text": "",
        "pathD": "M 7 0 C 3 0, 0 3, 0 6 C 0 8, 1 10, 2 11 C 2 21, 2 21, 2 21 C 7 17, 7 17, 7 17 C 11 21, 11 21, 11 21 C 11 11, 11 11, 11 11 C 12 10, 13 8, 13 6 C 13 3, 10 0, 7 0 Z M 7 11 C 4 11, 2 9, 2 6 C 2 4, 4 2, 7 2 C 9 2, 11 4, 11 6 C 11 9, 9 11, 7 11 Z"
      },
      {
        "id": "sp-421",
        "x": 830,
        "y": 582,
        "width": 27.586206896551722,
        "height": 34,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.8620689655172413,
        "localPctH": 1,
        "text": "",
        "pathD": "M 14 30 L 4 30 L 4 4 L 16 4 L 22 11 L 28 11 L 28 10 L 18 0 L 0 0 L 0 34 L 18 34 L 14 30 L 14 30 Z"
      },
      {
        "id": "sp-422",
        "x": 836.6206896551723,
        "y": 591.8709677419355,
        "width": 11.03448275862069,
        "height": 10,
        "localPctX": 0.20689655172413524,
        "localPctY": 0.2903225806451614,
        "localPctW": 0.3448275862068966,
        "localPctH": 0.06451612903225806,
        "text": ""
      },
      {
        "id": "sp-423",
        "x": 836.6206896551723,
        "y": 596.258064516129,
        "width": 11.03448275862069,
        "height": 10,
        "localPctX": 0.20689655172413524,
        "localPctY": 0.4193548387096772,
        "localPctW": 0.3448275862068966,
        "localPctH": 0.06451612903225806,
        "text": ""
      },
      {
        "id": "sp-424",
        "x": 836.6206896551723,
        "y": 600.6451612903226,
        "width": 11.03448275862069,
        "height": 10,
        "localPctX": 0.20689655172413524,
        "localPctY": 0.5483870967741931,
        "localPctW": 0.3448275862068966,
        "localPctH": 0.06451612903225806,
        "text": ""
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 98,
    "x": 830,
    "y": 582,
    "width": 32,
    "height": 34
  },
  {
    "id": "grp-518",
    "isGroup": true,
    "children": [
      {
        "id": "sp-425",
        "x": 1105,
        "y": 582,
        "width": 30,
        "height": 34,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 20 0 L 0 0 L 0 34 L 30 34 L 30 10 L 20 0 Z M 26 30 L 4 30 L 4 4 L 18 4 L 26 11 L 26 30 Z"
      },
      {
        "id": "sp-426",
        "x": 1111.6666666666665,
        "y": 596.258064516129,
        "width": 16.666666666666668,
        "height": 10.96774193548387,
        "localPctX": 0.22222222222221716,
        "localPctY": 0.4193548387096772,
        "localPctW": 0.5555555555555556,
        "localPctH": 0.3225806451612903,
        "text": "",
        "pathD": "M 6 2 L 0 8 L 0 11 L 6 5 L 11 9 L 17 3 L 17 0 L 11 6 L 6 2 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 102,
    "x": 1105,
    "y": 582,
    "width": 30,
    "height": 34
  },
  {
    "id": "grp-521",
    "isGroup": true,
    "children": [
      {
        "id": "sp-427",
        "x": 1173,
        "y": 582,
        "width": 30,
        "height": 34,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 20 0 L 0 0 L 0 34 L 30 34 L 30 10 L 20 0 Z M 26 30 L 4 30 L 4 4 L 18 4 L 26 11 L 26 30 Z"
      },
      {
        "id": "sp-428",
        "x": 1179.6666666666665,
        "y": 594.0645161290322,
        "width": 16.666666666666668,
        "height": 15.354838709677418,
        "localPctX": 0.22222222222221716,
        "localPctY": 0.35483870967741765,
        "localPctW": 0.5555555555555556,
        "localPctH": 0.45161290322580644,
        "text": "",
        "pathD": "M 0 15 L 17 15 L 17 0 L 0 0 L 0 15 Z M 8 2 L 15 2 L 15 7 L 8 7 L 8 2 Z M 8 9 L 15 9 L 15 13 L 8 13 L 8 9 Z M 2 2 L 6 2 L 6 7 L 2 7 L 2 2 Z M 2 9 L 6 9 L 6 13 L 2 13 L 2 9 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 103,
    "x": 1173,
    "y": 582,
    "width": 30,
    "height": 34
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 100,
    "x": 972,
    "y": 582,
    "width": 30,
    "height": 34,
    "text": "",
    "pathD": "M 20 0 L 0 0 L 0 34 L 30 34 L 30 10 L 20 0 Z M 26 30 L 4 30 L 4 4 L 9 4 L 9 23 L 13 17 L 17 23 L 17 4 L 18 4 L 26 11 L 26 30 Z"
  },
  {
    "id": "grp-525",
    "isGroup": true,
    "children": [
      {
        "id": "sp-429",
        "x": 899,
        "y": 582,
        "width": 30,
        "height": 34,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "text": "",
        "pathD": "M 20 0 L 0 0 L 0 34 L 30 34 L 30 10 L 20 0 Z M 13 17 L 15 17 L 15 15 L 13 15 L 13 13 L 15 13 L 15 11 L 13 11 L 13 9 L 15 9 L 15 6 L 13 6 L 13 4 L 15 4 L 15 6 L 17 6 L 17 9 L 15 9 L 15 11 L 17 11 L 17 13 L 15 13 L 15 15 L 17 15 L 17 17 L 15 17 L 15 19 L 17 19 L 17 21 L 15 21 L 15 19 L 13 19 L 13 17 Z M 9 30 L 4 30 L 4 4 L 11 4 L 11 21 L 9 21 L 9 30 Z M 19 32 L 11 32 L 11 23 L 19 23 L 19 32 Z M 26 30 L 21 30 L 21 21 L 19 21 L 19 5 L 26 11 L 26 30 Z"
      },
      {
        "id": "sp-430",
        "x": 911.2222222222222,
        "y": 607.2258064516129,
        "width": 10,
        "height": 10,
        "localPctX": 0.4074074074074057,
        "localPctY": 0.7419354838709684,
        "localPctW": 0.14814814814814817,
        "localPctH": 0.06451612903225806,
        "text": ""
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 99,
    "x": 899,
    "y": 582,
    "width": 30,
    "height": 34
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

export function Migso6Template({ data }: { data: BrainData }): ReactElement {
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
