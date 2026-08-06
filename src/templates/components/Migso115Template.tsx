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
    "x": 354,
    "y": 153,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 423,
    "y": 153,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 492,
    "y": 153,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 560,
    "y": 153,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 629,
    "y": 153,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 698,
    "y": 153,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 767,
    "y": 153,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 836,
    "y": 153,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 905,
    "y": 153,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 973,
    "y": 153,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 1042,
    "y": 153,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 1111,
    "y": 153,
    "width": 69,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-12",
    "x": 60,
    "y": 153,
    "width": 172,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-13",
    "x": 232,
    "y": 153,
    "width": 121,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 0,
    "x": 357,
    "y": 155,
    "width": 62,
    "height": 36,
    "fillColor": "#ffffff",
    "text": "JAN"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 1,
    "x": 426,
    "y": 155,
    "width": 62,
    "height": 36,
    "fillColor": "#ffffff",
    "text": "FEB"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 492,
    "y": 155,
    "width": 68,
    "height": 36,
    "text": "MAR"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 562,
    "y": 155,
    "width": 65,
    "height": 36,
    "text": "APR"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 9,
    "x": 1114,
    "y": 155,
    "width": 65,
    "height": 36,
    "text": "DEC"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 5,
    "x": 772,
    "y": 155,
    "width": 58,
    "height": 36,
    "text": "JUL"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 6,
    "x": 836,
    "y": 155,
    "width": 67,
    "height": 36,
    "text": "AUG"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 902,
    "y": 155,
    "width": 75,
    "height": 36,
    "text": "SEPT"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 7,
    "x": 976,
    "y": 155,
    "width": 65,
    "height": 36,
    "text": "OCT"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 631,
    "y": 155,
    "width": 65,
    "height": 36,
    "text": "MAY"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 4,
    "x": 701,
    "y": 155,
    "width": 62,
    "height": 36,
    "text": "JUN"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 8,
    "x": 1044,
    "y": 155,
    "width": 66,
    "height": 36,
    "text": "NOV"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 0,
    "x": 242,
    "y": 155,
    "width": 102,
    "height": 36,
    "text": "PERIOD"
  },
  {
    "id": "sp-27",
    "x": 101,
    "y": 155,
    "width": 90,
    "height": 36,
    "text": "TASKS"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 354,
    "y": 115,
    "width": 207,
    "height": 38,
    "text": ""
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 0,
    "x": 396,
    "y": 117,
    "width": 122,
    "height": 36,
    "text": "1 st Quarter"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 560,
    "y": 115,
    "width": 207,
    "height": 38,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 1,
    "x": 600,
    "y": 117,
    "width": 126,
    "height": 36,
    "text": "2 nd Quarter"
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 767,
    "y": 115,
    "width": 207,
    "height": 38,
    "text": ""
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 2,
    "x": 808,
    "y": 117,
    "width": 123,
    "height": 36,
    "text": "3 rd Quarter"
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 973,
    "y": 115,
    "width": 207,
    "height": 38,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 3,
    "x": 1015,
    "y": 117,
    "width": 123,
    "height": 36,
    "text": "4 th Quarter"
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 60,
    "y": 495,
    "width": 1120,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-37",
    "x": 60,
    "y": 344,
    "width": 1120,
    "height": 36,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 60,
    "y": 191,
    "width": 1120,
    "height": 38,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-86",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 354,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-87",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 422,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-88",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 492,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-89",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 560,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-90",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 629,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-91",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 697,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-92",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 767,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-93",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 835,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-94",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 905,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-95",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 973,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-96",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 1042,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-97",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 1111,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-98",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 1180,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-99",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 232,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-100",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 60,
    "y": 191,
    "width": 10,
    "height": 418,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-101",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 60,
    "y": 229,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-102",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 60,
    "y": 268,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-103",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 60,
    "y": 305,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-104",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 60,
    "y": 343,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-105",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 60,
    "y": 381,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-106",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 60,
    "y": 419,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-107",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 60,
    "y": 457,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-108",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 60,
    "y": 495,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-109",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 60,
    "y": 533,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-110",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 60,
    "y": 571,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-111",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 60,
    "y": 608,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 1,
    "x": 73,
    "y": 198,
    "width": 105,
    "height": 29,
    "text": "Main Task 1"
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 4,
    "x": 73,
    "y": 237,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 5,
    "x": 73,
    "y": 275,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 6,
    "x": 73,
    "y": 312,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 2,
    "x": 73,
    "y": 350,
    "width": 105,
    "height": 29,
    "text": "Main Task 2"
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 7,
    "x": 73,
    "y": 388,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 8,
    "x": 73,
    "y": 426,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 9,
    "x": 73,
    "y": 464,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 3,
    "x": 73,
    "y": 502,
    "width": 105,
    "height": 29,
    "text": "Main Task 3"
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 10,
    "x": 73,
    "y": 540,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 11,
    "x": 73,
    "y": 578,
    "width": 117,
    "height": 29,
    "text": "Subtask here"
  },
  {
    "id": "sp-50",
    "dataNodeIdx": 2,
    "x": 245,
    "y": 237,
    "width": 69,
    "height": 29,
    "text": "X days"
  },
  {
    "id": "sp-51",
    "dataNodeIdx": 3,
    "x": 245,
    "y": 275,
    "width": 69,
    "height": 29,
    "text": "X days"
  },
  {
    "id": "sp-52",
    "dataNodeIdx": 4,
    "x": 245,
    "y": 312,
    "width": 69,
    "height": 29,
    "text": "X days"
  },
  {
    "id": "sp-53",
    "dataNodeIdx": 5,
    "x": 245,
    "y": 388,
    "width": 69,
    "height": 29,
    "text": "X days"
  },
  {
    "id": "sp-54",
    "dataNodeIdx": 6,
    "x": 245,
    "y": 426,
    "width": 69,
    "height": 29,
    "text": "X days"
  },
  {
    "id": "sp-55",
    "dataNodeIdx": 7,
    "x": 245,
    "y": 464,
    "width": 69,
    "height": 29,
    "text": "X days"
  },
  {
    "id": "sp-56",
    "dataNodeIdx": 8,
    "x": 245,
    "y": 540,
    "width": 69,
    "height": 29,
    "text": "X days"
  },
  {
    "id": "sp-57",
    "dataNodeIdx": 9,
    "x": 245,
    "y": 578,
    "width": 69,
    "height": 29,
    "text": "X days"
  },
  {
    "id": "sp-58",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 609,
    "y": 598,
    "width": 28,
    "height": 24,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 14 0 L 28 24 L 0 24 Z"
  },
  {
    "id": "sp-59",
    "dataNodeIdx": 10,
    "x": 591,
    "y": 624,
    "width": 63,
    "height": 29,
    "text": "Today"
  },
  {
    "id": "sp-60",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 371,
    "y": 239,
    "width": 172,
    "height": 19,
    "text": ""
  },
  {
    "id": "sp-61",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 370,
    "y": 234,
    "width": 29,
    "height": 29,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-62",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 515,
    "y": 234,
    "width": 29,
    "height": 29,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-63",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 509,
    "y": 277,
    "width": 172,
    "height": 19,
    "text": ""
  },
  {
    "id": "sp-64",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 508,
    "y": 272,
    "width": 29,
    "height": 29,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-65",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 652,
    "y": 272,
    "width": 29,
    "height": 29,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-66",
    "x": 439,
    "y": 314,
    "width": 104,
    "height": 19,
    "text": ""
  },
  {
    "id": "sp-67",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 439,
    "y": 309,
    "width": 29,
    "height": 29,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-68",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 515,
    "y": 309,
    "width": 29,
    "height": 29,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-69",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 522,
    "y": 391,
    "width": 145,
    "height": 19,
    "text": ""
  },
  {
    "id": "sp-70",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 508,
    "y": 386,
    "width": 29,
    "height": 29,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 14 0 Z"
  },
  {
    "id": "sp-71",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 652,
    "y": 386,
    "width": 29,
    "height": 29,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 14 0 Z"
  },
  {
    "id": "sp-72",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 660,
    "y": 429,
    "width": 78,
    "height": 19,
    "text": ""
  },
  {
    "id": "sp-73",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 646,
    "y": 424,
    "width": 29,
    "height": 29,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 14 0 Z"
  },
  {
    "id": "sp-74",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 722,
    "y": 424,
    "width": 29,
    "height": 29,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 14 0 Z"
  },
  {
    "id": "sp-75",
    "x": 797,
    "y": 467,
    "width": 217,
    "height": 19,
    "text": ""
  },
  {
    "id": "sp-76",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 783,
    "y": 462,
    "width": 29,
    "height": 29,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 14 0 Z"
  },
  {
    "id": "sp-77",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 999,
    "y": 462,
    "width": 29,
    "height": 29,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 14 0 Z"
  },
  {
    "id": "sp-78",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 865,
    "y": 542,
    "width": 149,
    "height": 19,
    "text": ""
  },
  {
    "id": "sp-79",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 850,
    "y": 537,
    "width": 29,
    "height": 29,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 15 0 L 29 29 L 0 29 Z"
  },
  {
    "id": "sp-80",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 999,
    "y": 537,
    "width": 29,
    "height": 29,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 15 0 L 29 29 L 0 29 Z"
  },
  {
    "id": "sp-81",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1071,
    "y": 580,
    "width": 80,
    "height": 19,
    "text": ""
  },
  {
    "id": "sp-82",
    "isColorNode": true,
    "dataNodeIdx": 15,
    "x": 1057,
    "y": 574,
    "width": 29,
    "height": 29,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 15 0 L 29 29 L 0 29 Z"
  },
  {
    "id": "sp-83",
    "isColorNode": true,
    "dataNodeIdx": 16,
    "x": 1136,
    "y": 574,
    "width": 29,
    "height": 29,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 15 0 L 29 29 L 0 29 Z"
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

export function Migso115Template({ data }: { data: BrainData }): ReactElement {
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
