import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1058,
    "y": 179,
    "width": 143,
    "height": 474,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 915,
    "y": 179,
    "width": 143,
    "height": 474,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 773,
    "y": 179,
    "width": 143,
    "height": 474,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 630,
    "y": 179,
    "width": 143,
    "height": 474,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 488,
    "y": 179,
    "width": 143,
    "height": 474,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 345,
    "y": 179,
    "width": 143,
    "height": 474,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-84",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 80,
    "y": 347,
    "width": 1120,
    "height": 10
  },
  {
    "id": "sp-85",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 80,
    "y": 501,
    "width": 1120,
    "height": 10
  },
  {
    "id": "sp-86",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 180,
    "width": 1120,
    "height": 10
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 386,
    "y": 136,
    "width": 60,
    "height": 60,
    "fillColor": "#4a90d9",
    "pathD": "M 30 0 A 30 30 0 1 1 30 0 Z"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 0,
    "x": 393,
    "y": 152,
    "width": 47,
    "height": 29,
    "text": "Jan",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 529,
    "y": 136,
    "width": 60,
    "height": 60,
    "fillColor": "#4a90d9",
    "pathD": "M 30 0 A 30 30 0 1 1 30 0 Z"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 1,
    "x": 535,
    "y": 152,
    "width": 48,
    "height": 29,
    "text": "Feb",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 671,
    "y": 136,
    "width": 60,
    "height": 60,
    "fillColor": "#4a90d9",
    "pathD": "M 30 0 A 30 30 0 1 1 30 0 Z"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 2,
    "x": 677,
    "y": 152,
    "width": 48,
    "height": 29,
    "text": "Mar",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 814,
    "y": 136,
    "width": 60,
    "height": 60,
    "fillColor": "#4a90d9",
    "pathD": "M 30 0 A 30 30 0 1 1 30 0 Z"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 3,
    "x": 820,
    "y": 152,
    "width": 47,
    "height": 29,
    "text": "Apr",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 956,
    "y": 136,
    "width": 60,
    "height": 60,
    "fillColor": "#4a90d9",
    "pathD": "M 30 0 A 30 30 0 1 1 30 0 Z"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 4,
    "x": 961,
    "y": 152,
    "width": 51,
    "height": 29,
    "text": "May",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1099,
    "y": 136,
    "width": 60,
    "height": 60,
    "fillColor": "#4a90d9",
    "pathD": "M 30 0 A 30 30 0 1 1 30 0 Z"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 5,
    "x": 1105,
    "y": 152,
    "width": 48,
    "height": 29,
    "text": "Jun",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 140,
    "y": 221,
    "width": 42,
    "height": 48,
    "fillColor": "#3365cc",
    "pathD": "M 11 34 L 31 34 C 32 34, 33 35, 33 36 C 33 38, 32 39, 31 39 L 11 39 C 10 39, 9 38, 9 36 C 9 35, 10 34, 11 34 Z M 11 26 L 31 26 C 32 26, 33 27, 33 28 C 33 29, 32 31, 31 31 L 11 31 C 10 31, 9 29, 9 28 C 9 27, 10 26, 11 26 Z M 14 14 L 14 17 L 28 17 L 28 14 L 14 14 Z M 11 9 L 31 9 C 32 9, 33 10, 33 12 L 33 20 C 33 21, 32 22, 31 22 L 11 22 C 10 22, 9 21, 9 20 L 9 12 C 9 10, 10 9, 11 9 Z M 5 5 L 5 43 L 37 43 L 37 5 L 5 5 Z M 3 0 L 39 0 C 41 0, 42 1, 42 3 L 42 45 C 42 47, 41 48, 39 48 L 3 48 C 1 48, 0 47, 0 45 L 0 3 C 0 1, 1 0, 3 0 Z"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 1,
    "x": 100,
    "y": 277,
    "width": 122,
    "height": 36,
    "text": "Web Team",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 137,
    "y": 538,
    "width": 48,
    "height": 43,
    "fillColor": "#3365cc",
    "pathD": "M 32 27 C 33 27, 34 28, 34 30 L 34 32 C 34 33, 33 34, 32 34 C 30 34, 29 33, 29 32 L 29 30 C 29 28, 30 27, 32 27 Z M 24 27 C 25 27, 27 28, 27 30 L 27 32 C 27 33, 25 34, 24 34 C 23 34, 21 33, 21 32 L 21 30 C 21 28, 23 27, 24 27 Z M 17 27 C 18 27, 19 28, 19 30 L 19 32 C 19 33, 18 34, 17 34 C 15 34, 14 33, 14 32 L 14 30 C 14 28, 15 27, 17 27 Z M 10 24 L 11 37 C 11 37, 12 38, 12 38 L 36 38 C 36 38, 37 37, 37 37 L 38 24 L 10 24 Z M 7 16 C 6 16, 5 17, 5 18 L 6 19 L 7 19 L 41 19 L 42 19 L 43 18 C 43 17, 42 16, 41 16 L 41 16 L 40 17 L 40 16 L 8 16 L 8 17 L 7 16 L 7 16 Z M 17 1 C 18 0, 19 0, 20 1 C 21 2, 21 4, 20 5 L 14 11 L 34 11 L 28 5 C 27 4, 27 2, 28 1 C 29 0, 30 0, 31 1 L 41 11 L 41 11 C 45 11, 48 14, 48 18 C 48 20, 47 21, 46 22 L 44 23 L 42 37 C 42 40, 39 43, 36 43 L 12 43 C 9 43, 6 40, 6 37 L 4 23 L 2 22 C 1 21, 0 20, 0 18 C 0 14, 3 11, 7 11 L 7 11 L 17 1 Z"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 1,
    "x": 75,
    "y": 590,
    "width": 172,
    "height": 36,
    "text": "Marketing Team",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-22",
    "x": 144,
    "y": 379,
    "width": 33,
    "height": 49,
    "fillColor": "#3365cc",
    "pathD": "M 17 35 C 16 35, 15 36, 15 37 C 15 38, 16 39, 17 39 C 18 39, 19 38, 19 37 C 19 36, 18 35, 17 35 Z M 17 34 C 19 34, 20 35, 20 37 C 20 39, 19 41, 17 41 C 15 41, 13 39, 13 37 C 13 35, 15 34, 17 34 Z M 13 7 L 20 7 C 21 7, 22 8, 22 9 C 22 11, 21 12, 20 12 L 13 12 C 11 12, 10 11, 10 9 C 10 8, 11 7, 13 7 Z M 8 5 C 6 5, 5 7, 5 8 L 5 41 C 5 43, 6 44, 8 44 L 25 44 C 27 44, 28 43, 28 41 L 28 8 C 28 7, 27 5, 25 5 L 8 5 Z M 8 0 L 25 0 C 29 0, 33 4, 33 8 L 33 41 C 33 45, 29 49, 25 49 L 8 49 C 4 49, 0 45, 0 41 L 0 8 C 0 4, 4 0, 8 0 Z"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 0,
    "x": 79,
    "y": 436,
    "width": 164,
    "height": 36,
    "text": "Mobile Mockup",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 349,
    "y": 206,
    "width": 135,
    "height": 36
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 776,
    "y": 297,
    "width": 135,
    "height": 36,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 349,
    "y": 360,
    "width": 135,
    "height": 36
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 919,
    "y": 451,
    "width": 135,
    "height": 36,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 491,
    "y": 405,
    "width": 277,
    "height": 36
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 15,
    "x": 349,
    "y": 514,
    "width": 135,
    "height": 36
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 19,
    "x": 919,
    "y": 605,
    "width": 135,
    "height": 36,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 17,
    "x": 634,
    "y": 560,
    "width": 135,
    "height": 36
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 491,
    "y": 206,
    "width": 277,
    "height": 36
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 634,
    "y": 252,
    "width": 135,
    "height": 36
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 776,
    "y": 252,
    "width": 277,
    "height": 36,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 1061,
    "y": 252,
    "width": 135,
    "height": 36,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 919,
    "y": 297,
    "width": 135,
    "height": 36,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1061,
    "y": 297,
    "width": 135,
    "height": 36,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 491,
    "y": 360,
    "width": 135,
    "height": 36
  },
  {
    "id": "sp-39",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 634,
    "y": 360,
    "width": 135,
    "height": 36
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 776,
    "y": 360,
    "width": 135,
    "height": 36,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 776,
    "y": 405,
    "width": 135,
    "height": 36,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 919,
    "y": 405,
    "width": 135,
    "height": 36,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 1061,
    "y": 405,
    "width": 135,
    "height": 36,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 1061,
    "y": 451,
    "width": 135,
    "height": 36,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-45",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 491,
    "y": 514,
    "width": 277,
    "height": 36
  },
  {
    "id": "sp-46",
    "isColorNode": true,
    "dataNodeIdx": 16,
    "x": 776,
    "y": 514,
    "width": 135,
    "height": 36,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-47",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 776,
    "y": 560,
    "width": 277,
    "height": 36,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-48",
    "isColorNode": true,
    "dataNodeIdx": 18,
    "x": 1061,
    "y": 560,
    "width": 135,
    "height": 36,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-49",
    "isColorNode": true,
    "dataNodeIdx": 20,
    "x": 1061,
    "y": 605,
    "width": 135,
    "height": 36,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-50",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 959,
    "y": 96,
    "width": 16,
    "height": 16,
    "fillColor": "#ff4d38",
    "pathD": "M 8 0 A 8 8 0 1 1 8 0 Z"
  },
  {
    "id": "sp-51",
    "dataNodeIdx": 1,
    "x": 977,
    "y": 89,
    "width": 107,
    "height": 29,
    "text": "In progress",
    "textSize": 12
  },
  {
    "id": "sp-52",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 1104,
    "y": 96,
    "width": 16,
    "height": 16,
    "fillColor": "#52c49c",
    "pathD": "M 8 0 A 8 8 0 1 1 8 0 Z"
  },
  {
    "id": "sp-53",
    "x": 1122,
    "y": 89,
    "width": 82,
    "height": 29,
    "text": "Planned",
    "textSize": 12
  },
  {
    "id": "sp-54",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 815,
    "y": 96,
    "width": 16,
    "height": 16,
    "fillColor": "#3365cc",
    "pathD": "M 8 0 A 8 8 0 1 1 8 0 Z"
  },
  {
    "id": "sp-55",
    "dataNodeIdx": 0,
    "x": 833,
    "y": 89,
    "width": 103,
    "height": 29,
    "text": "Completed",
    "textSize": 12
  },
  {
    "id": "sp-56",
    "dataNodeIdx": 0,
    "x": 354,
    "y": 206,
    "width": 125,
    "height": 37,
    "text": "New admin console",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-57",
    "dataNodeIdx": 0,
    "x": 500,
    "y": 214,
    "width": 260,
    "height": 21,
    "text": "3 rd party integrations",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-58",
    "dataNodeIdx": 0,
    "x": 639,
    "y": 258,
    "width": 125,
    "height": 21,
    "text": "Security 2.0",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-59",
    "dataNodeIdx": 2,
    "x": 781,
    "y": 305,
    "width": 125,
    "height": 21,
    "text": "Self-Service portal",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-60",
    "dataNodeIdx": 3,
    "x": 924,
    "y": 305,
    "width": 125,
    "height": 21,
    "text": "API",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-61",
    "dataNodeIdx": 2,
    "x": 1066,
    "y": 297,
    "width": 125,
    "height": 37,
    "text": "Shopping cart improvements",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-62",
    "dataNodeIdx": 1,
    "x": 1066,
    "y": 259,
    "width": 125,
    "height": 21,
    "text": "Code review",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-63",
    "dataNodeIdx": 8,
    "x": 1066,
    "y": 412,
    "width": 125,
    "height": 21,
    "text": "Ticketing System",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-64",
    "dataNodeIdx": 9,
    "x": 1066,
    "y": 458,
    "width": 125,
    "height": 21,
    "text": "Q3 Initiative",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-65",
    "dataNodeIdx": 13,
    "x": 1066,
    "y": 567,
    "width": 125,
    "height": 21,
    "text": "Content review",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-66",
    "dataNodeIdx": 6,
    "x": 1066,
    "y": 605,
    "width": 125,
    "height": 37,
    "text": "Performance management",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-67",
    "dataNodeIdx": 14,
    "x": 924,
    "y": 613,
    "width": 125,
    "height": 21,
    "text": "Analytics",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-68",
    "dataNodeIdx": 4,
    "x": 924,
    "y": 405,
    "width": 125,
    "height": 37,
    "text": "Automatic renewal Service",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-69",
    "dataNodeIdx": 5,
    "x": 924,
    "y": 450,
    "width": 125,
    "height": 37,
    "text": "Application upgrade",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-70",
    "dataNodeIdx": 7,
    "x": 781,
    "y": 367,
    "width": 125,
    "height": 21,
    "text": "UX Improvements",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-71",
    "dataNodeIdx": 3,
    "x": 781,
    "y": 404,
    "width": 125,
    "height": 37,
    "text": "Interaction dialogue box",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-72",
    "dataNodeIdx": 11,
    "x": 781,
    "y": 522,
    "width": 125,
    "height": 21,
    "text": "SEO plan",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-73",
    "dataNodeIdx": 6,
    "x": 639,
    "y": 367,
    "width": 125,
    "height": 21,
    "text": "Cloud support",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-74",
    "dataNodeIdx": 12,
    "x": 639,
    "y": 567,
    "width": 125,
    "height": 21,
    "text": "Legal generation",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-75",
    "dataNodeIdx": 4,
    "x": 354,
    "y": 367,
    "width": 125,
    "height": 21,
    "text": "Mobile mock up",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-76",
    "dataNodeIdx": 10,
    "x": 354,
    "y": 522,
    "width": 125,
    "height": 21,
    "text": "Market analysis",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-77",
    "dataNodeIdx": 5,
    "x": 497,
    "y": 367,
    "width": 125,
    "height": 21,
    "text": "UX Improvements",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-78",
    "dataNodeIdx": 1,
    "x": 785,
    "y": 258,
    "width": 260,
    "height": 21,
    "text": "On premise backup",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-79",
    "dataNodeIdx": 2,
    "x": 500,
    "y": 412,
    "width": 260,
    "height": 21,
    "text": "Android application",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-80",
    "dataNodeIdx": 3,
    "x": 500,
    "y": 522,
    "width": 260,
    "height": 21,
    "text": "Customer outreach",
    "textColor": "#ffffff",
    "textSize": 10
  },
  {
    "id": "sp-81",
    "dataNodeIdx": 4,
    "x": 785,
    "y": 568,
    "width": 260,
    "height": 21,
    "text": "Pricing review",
    "textColor": "#ffffff",
    "textSize": 10
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

export function Imported2025migsopcubedcreativeandexampletemplates164Template({ data }: { data: BrainData }): ReactElement {
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
