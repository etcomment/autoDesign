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
    "x": 240,
    "y": 118,
    "width": 157,
    "height": 77,
    "text": ""
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 711,
    "y": 118,
    "width": 157,
    "height": 77,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 554,
    "y": 118,
    "width": 157,
    "height": 77,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 397,
    "y": 118,
    "width": 157,
    "height": 77,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1024,
    "y": 118,
    "width": 157,
    "height": 77,
    "fillColor": "#4a90d9",
    "text": ""
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 867,
    "y": 118,
    "width": 157,
    "height": 77,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 259,
    "y": 133,
    "width": 118,
    "height": 36,
    "text": "Column 1"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 416,
    "y": 133,
    "width": 118,
    "height": 36,
    "text": "Column 2"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 2,
    "x": 573,
    "y": 133,
    "width": 118,
    "height": 36,
    "text": "Column 3"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 3,
    "x": 730,
    "y": 133,
    "width": 118,
    "height": 36,
    "text": "Column 4"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 4,
    "x": 887,
    "y": 133,
    "width": 118,
    "height": 36,
    "text": "Column 5"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 5,
    "x": 1044,
    "y": 133,
    "width": 118,
    "height": 36,
    "text": "Column 6"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 61,
    "y": 203,
    "width": 178,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 61,
    "y": 267,
    "width": 178,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 61,
    "y": 331,
    "width": 178,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 61,
    "y": 395,
    "width": 178,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 61,
    "y": 459,
    "width": 178,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 61,
    "y": 523,
    "width": 178,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 61,
    "y": 587,
    "width": 178,
    "height": 64,
    "fillColor": "#ffffff",
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 0,
    "x": 109,
    "y": 217,
    "width": 83,
    "height": 36,
    "text": "Row 1"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 109,
    "y": 281,
    "width": 83,
    "height": 36,
    "text": "Row 2"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 109,
    "y": 345,
    "width": 83,
    "height": 36,
    "text": "Row 3"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 109,
    "y": 409,
    "width": 83,
    "height": 36,
    "text": "Row 4"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 4,
    "x": 109,
    "y": 473,
    "width": 83,
    "height": 36,
    "text": "Row 5"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 5,
    "x": 109,
    "y": 537,
    "width": 83,
    "height": 36,
    "text": "Row 6"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 6,
    "x": 109,
    "y": 601,
    "width": 83,
    "height": 36,
    "text": "Row 7"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 240,
    "y": 203,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 240,
    "y": 267,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 240,
    "y": 331,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 18,
    "x": 240,
    "y": 395,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 24,
    "x": 240,
    "y": 459,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 30,
    "x": 240,
    "y": 523,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 36,
    "x": 240,
    "y": 587,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 397,
    "y": 203,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 397,
    "y": 267,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 397,
    "y": 331,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 19,
    "x": 397,
    "y": 395,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 25,
    "x": 397,
    "y": 459,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 31,
    "x": 397,
    "y": 523,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-39",
    "isColorNode": true,
    "dataNodeIdx": 37,
    "x": 397,
    "y": 587,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 554,
    "y": 203,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 554,
    "y": 267,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 554,
    "y": 331,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 20,
    "x": 554,
    "y": 395,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 26,
    "x": 554,
    "y": 459,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-45",
    "isColorNode": true,
    "dataNodeIdx": 32,
    "x": 554,
    "y": 523,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-46",
    "isColorNode": true,
    "dataNodeIdx": 38,
    "x": 554,
    "y": 587,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-47",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 711,
    "y": 203,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-48",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 711,
    "y": 267,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-49",
    "isColorNode": true,
    "dataNodeIdx": 15,
    "x": 711,
    "y": 331,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-50",
    "isColorNode": true,
    "dataNodeIdx": 21,
    "x": 711,
    "y": 395,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-51",
    "isColorNode": true,
    "dataNodeIdx": 27,
    "x": 711,
    "y": 459,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-52",
    "isColorNode": true,
    "dataNodeIdx": 33,
    "x": 711,
    "y": 523,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-53",
    "isColorNode": true,
    "dataNodeIdx": 39,
    "x": 711,
    "y": 587,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-54",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 867,
    "y": 203,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-55",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 867,
    "y": 267,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-56",
    "isColorNode": true,
    "dataNodeIdx": 16,
    "x": 867,
    "y": 331,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-57",
    "isColorNode": true,
    "dataNodeIdx": 22,
    "x": 867,
    "y": 395,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-58",
    "isColorNode": true,
    "dataNodeIdx": 28,
    "x": 867,
    "y": 459,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-59",
    "isColorNode": true,
    "dataNodeIdx": 34,
    "x": 867,
    "y": 523,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-60",
    "isColorNode": true,
    "dataNodeIdx": 40,
    "x": 867,
    "y": 587,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-61",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1024,
    "y": 203,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-62",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 1024,
    "y": 267,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-63",
    "isColorNode": true,
    "dataNodeIdx": 17,
    "x": 1024,
    "y": 331,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-64",
    "isColorNode": true,
    "dataNodeIdx": 23,
    "x": 1024,
    "y": 395,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-65",
    "isColorNode": true,
    "dataNodeIdx": 29,
    "x": 1024,
    "y": 459,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-66",
    "isColorNode": true,
    "dataNodeIdx": 35,
    "x": 1024,
    "y": 523,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-67",
    "isColorNode": true,
    "dataNodeIdx": 41,
    "x": 1024,
    "y": 587,
    "width": 157,
    "height": 64,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-68",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 298,
    "y": 214,
    "width": 40,
    "height": 40,
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-69",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 298,
    "y": 278,
    "width": 40,
    "height": 40,
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-70",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 298,
    "y": 406,
    "width": 40,
    "height": 40,
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-71",
    "isColorNode": true,
    "dataNodeIdx": 15,
    "x": 298,
    "y": 470,
    "width": 40,
    "height": 40,
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-72",
    "isColorNode": true,
    "dataNodeIdx": 24,
    "x": 298,
    "y": 599,
    "width": 40,
    "height": 40,
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-73",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 455,
    "y": 214,
    "width": 40,
    "height": 40,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-74",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 455,
    "y": 343,
    "width": 40,
    "height": 40,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-75",
    "isColorNode": true,
    "dataNodeIdx": 16,
    "x": 455,
    "y": 470,
    "width": 40,
    "height": 40,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-76",
    "isColorNode": true,
    "dataNodeIdx": 21,
    "x": 455,
    "y": 534,
    "width": 40,
    "height": 40,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-77",
    "isColorNode": true,
    "dataNodeIdx": 25,
    "x": 455,
    "y": 599,
    "width": 40,
    "height": 40,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-78",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 612,
    "y": 214,
    "width": 40,
    "height": 40,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-79",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 612,
    "y": 278,
    "width": 40,
    "height": 40,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-80",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 612,
    "y": 406,
    "width": 40,
    "height": 40,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-81",
    "isColorNode": true,
    "dataNodeIdx": 17,
    "x": 612,
    "y": 470,
    "width": 40,
    "height": 40,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-82",
    "isColorNode": true,
    "dataNodeIdx": 26,
    "x": 612,
    "y": 599,
    "width": 40,
    "height": 40,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-83",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 769,
    "y": 214,
    "width": 40,
    "height": 40,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-84",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 769,
    "y": 343,
    "width": 40,
    "height": 40,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-85",
    "isColorNode": true,
    "dataNodeIdx": 18,
    "x": 769,
    "y": 470,
    "width": 40,
    "height": 40,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-86",
    "isColorNode": true,
    "dataNodeIdx": 22,
    "x": 769,
    "y": 534,
    "width": 40,
    "height": 40,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-87",
    "isColorNode": true,
    "dataNodeIdx": 27,
    "x": 769,
    "y": 599,
    "width": 40,
    "height": 40,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-88",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 926,
    "y": 214,
    "width": 40,
    "height": 40,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-89",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 926,
    "y": 278,
    "width": 40,
    "height": 40,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-90",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 926,
    "y": 406,
    "width": 40,
    "height": 40,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-91",
    "isColorNode": true,
    "dataNodeIdx": 19,
    "x": 926,
    "y": 470,
    "width": 40,
    "height": 40,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-92",
    "isColorNode": true,
    "dataNodeIdx": 28,
    "x": 926,
    "y": 599,
    "width": 40,
    "height": 40,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-93",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1083,
    "y": 214,
    "width": 40,
    "height": 40,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-94",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 1083,
    "y": 343,
    "width": 40,
    "height": 40,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-95",
    "isColorNode": true,
    "dataNodeIdx": 20,
    "x": 1083,
    "y": 470,
    "width": 40,
    "height": 40,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-96",
    "isColorNode": true,
    "dataNodeIdx": 23,
    "x": 1083,
    "y": 534,
    "width": 40,
    "height": 40,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-97",
    "isColorNode": true,
    "dataNodeIdx": 29,
    "x": 1083,
    "y": 599,
    "width": 40,
    "height": 40,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 20 0 A 20 20 0 1 1 20 0 Z"
  },
  {
    "id": "sp-98",
    "dataNodeIdx": 0,
    "x": 301,
    "y": 217,
    "width": 34,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-99",
    "dataNodeIdx": 6,
    "x": 301,
    "y": 281,
    "width": 34,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-100",
    "dataNodeIdx": 12,
    "x": 301,
    "y": 409,
    "width": 34,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-101",
    "dataNodeIdx": 15,
    "x": 301,
    "y": 473,
    "width": 34,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-102",
    "dataNodeIdx": 24,
    "x": 301,
    "y": 601,
    "width": 34,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-103",
    "dataNodeIdx": 2,
    "x": 615,
    "y": 217,
    "width": 34,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-104",
    "dataNodeIdx": 7,
    "x": 615,
    "y": 281,
    "width": 34,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-105",
    "dataNodeIdx": 13,
    "x": 615,
    "y": 409,
    "width": 34,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-106",
    "dataNodeIdx": 17,
    "x": 615,
    "y": 473,
    "width": 34,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-107",
    "dataNodeIdx": 26,
    "x": 615,
    "y": 601,
    "width": 34,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-108",
    "dataNodeIdx": 4,
    "x": 933,
    "y": 217,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-109",
    "dataNodeIdx": 8,
    "x": 933,
    "y": 281,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-110",
    "dataNodeIdx": 14,
    "x": 933,
    "y": 409,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-111",
    "dataNodeIdx": 19,
    "x": 933,
    "y": 473,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-112",
    "dataNodeIdx": 28,
    "x": 933,
    "y": 601,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-113",
    "dataNodeIdx": 3,
    "x": 776,
    "y": 217,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-114",
    "dataNodeIdx": 10,
    "x": 776,
    "y": 345,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-115",
    "dataNodeIdx": 22,
    "x": 776,
    "y": 537,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-116",
    "dataNodeIdx": 18,
    "x": 776,
    "y": 473,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-117",
    "dataNodeIdx": 27,
    "x": 776,
    "y": 601,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-118",
    "dataNodeIdx": 1,
    "x": 463,
    "y": 217,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-119",
    "dataNodeIdx": 9,
    "x": 463,
    "y": 345,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-120",
    "dataNodeIdx": 21,
    "x": 463,
    "y": 537,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-121",
    "dataNodeIdx": 16,
    "x": 463,
    "y": 473,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-122",
    "dataNodeIdx": 25,
    "x": 463,
    "y": 601,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-123",
    "dataNodeIdx": 5,
    "x": 1090,
    "y": 217,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-124",
    "dataNodeIdx": 11,
    "x": 1090,
    "y": 345,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-125",
    "dataNodeIdx": 23,
    "x": 1090,
    "y": 537,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-126",
    "dataNodeIdx": 20,
    "x": 1090,
    "y": 473,
    "width": 25,
    "height": 36,
    "text": "X"
  },
  {
    "id": "sp-127",
    "dataNodeIdx": 29,
    "x": 1090,
    "y": 601,
    "width": 25,
    "height": 36,
    "text": "X"
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

export function Migso194Template({ data }: { data: BrainData }): ReactElement {
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
