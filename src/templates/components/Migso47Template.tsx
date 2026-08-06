import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "dataNodeIdx": 0,
    "x": 902,
    "y": 177,
    "width": 141,
    "height": 36,
    "text": "Your title 1"
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 0,
    "x": 900,
    "y": 216,
    "width": 307,
    "height": 60,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 1,
    "x": 902,
    "y": 448,
    "width": 141,
    "height": 36,
    "text": "Your title 2"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 900,
    "y": 487,
    "width": 307,
    "height": 60,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 0,
    "x": 98,
    "y": 141,
    "width": 73,
    "height": 42,
    "text": "70%"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 1,
    "x": 204,
    "y": 141,
    "width": 73,
    "height": 42,
    "text": "50%"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 2,
    "x": 315,
    "y": 141,
    "width": 73,
    "height": 42,
    "text": "90%"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 3,
    "x": 424,
    "y": 141,
    "width": 73,
    "height": 42,
    "text": "75%"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 4,
    "x": 537,
    "y": 141,
    "width": 73,
    "height": 42,
    "text": "95%"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 32,
    "x": 105,
    "y": 315,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 38,
    "x": 105,
    "y": 334,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 105,
    "y": 276,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 33,
    "x": 105,
    "y": 296,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 105,
    "y": 238,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 105,
    "y": 257,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 105,
    "y": 199,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 105,
    "y": 218,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 46,
    "x": 105,
    "y": 353,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 56,
    "x": 105,
    "y": 373,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 125,
    "x": 105,
    "y": 508,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 128,
    "x": 105,
    "y": 527,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 99,
    "x": 105,
    "y": 469,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 126,
    "x": 105,
    "y": 488,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 79,
    "x": 105,
    "y": 431,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 100,
    "x": 105,
    "y": 450,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 64,
    "x": 105,
    "y": 392,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 80,
    "x": 105,
    "y": 411,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 141,
    "x": 105,
    "y": 546,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 156,
    "x": 105,
    "y": 565,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 39,
    "x": 212,
    "y": 315,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 49,
    "x": 212,
    "y": 334,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 15,
    "x": 212,
    "y": 276,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 35,
    "x": 212,
    "y": 296,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 212,
    "y": 238,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 16,
    "x": 212,
    "y": 257,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 212,
    "y": 199,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 212,
    "y": 218,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 57,
    "x": 212,
    "y": 353,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 67,
    "x": 212,
    "y": 373,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-39",
    "isColorNode": true,
    "dataNodeIdx": 132,
    "x": 212,
    "y": 508,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 143,
    "x": 212,
    "y": 527,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 127,
    "x": 212,
    "y": 469,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 133,
    "x": 212,
    "y": 488,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 101,
    "x": 212,
    "y": 431,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 103,
    "x": 212,
    "y": 450,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-45",
    "isColorNode": true,
    "dataNodeIdx": 69,
    "x": 212,
    "y": 392,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-46",
    "isColorNode": true,
    "dataNodeIdx": 102,
    "x": 212,
    "y": 411,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-47",
    "isColorNode": true,
    "dataNodeIdx": 158,
    "x": 212,
    "y": 546,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-48",
    "isColorNode": true,
    "dataNodeIdx": 164,
    "x": 212,
    "y": 565,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-49",
    "isColorNode": true,
    "dataNodeIdx": 40,
    "x": 323,
    "y": 315,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-50",
    "isColorNode": true,
    "dataNodeIdx": 50,
    "x": 323,
    "y": 334,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-51",
    "isColorNode": true,
    "dataNodeIdx": 17,
    "x": 323,
    "y": 276,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-52",
    "isColorNode": true,
    "dataNodeIdx": 41,
    "x": 323,
    "y": 296,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-53",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 323,
    "y": 238,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-54",
    "isColorNode": true,
    "dataNodeIdx": 18,
    "x": 323,
    "y": 257,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-55",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 323,
    "y": 199,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-56",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 323,
    "y": 218,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-57",
    "isColorNode": true,
    "dataNodeIdx": 58,
    "x": 323,
    "y": 353,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-58",
    "isColorNode": true,
    "dataNodeIdx": 70,
    "x": 323,
    "y": 373,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-59",
    "isColorNode": true,
    "dataNodeIdx": 136,
    "x": 323,
    "y": 508,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-60",
    "isColorNode": true,
    "dataNodeIdx": 145,
    "x": 323,
    "y": 527,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-61",
    "isColorNode": true,
    "dataNodeIdx": 104,
    "x": 323,
    "y": 469,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-62",
    "isColorNode": true,
    "dataNodeIdx": 137,
    "x": 323,
    "y": 488,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-63",
    "isColorNode": true,
    "dataNodeIdx": 81,
    "x": 323,
    "y": 431,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-64",
    "isColorNode": true,
    "dataNodeIdx": 105,
    "x": 323,
    "y": 450,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-65",
    "isColorNode": true,
    "dataNodeIdx": 73,
    "x": 323,
    "y": 392,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-66",
    "isColorNode": true,
    "dataNodeIdx": 82,
    "x": 323,
    "y": 411,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-67",
    "isColorNode": true,
    "dataNodeIdx": 161,
    "x": 323,
    "y": 546,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-68",
    "isColorNode": true,
    "dataNodeIdx": 165,
    "x": 323,
    "y": 565,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-69",
    "isColorNode": true,
    "dataNodeIdx": 42,
    "x": 432,
    "y": 315,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-70",
    "isColorNode": true,
    "dataNodeIdx": 59,
    "x": 432,
    "y": 334,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-71",
    "isColorNode": true,
    "dataNodeIdx": 23,
    "x": 432,
    "y": 276,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-72",
    "isColorNode": true,
    "dataNodeIdx": 43,
    "x": 432,
    "y": 296,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-73",
    "isColorNode": true,
    "dataNodeIdx": 20,
    "x": 432,
    "y": 238,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-74",
    "isColorNode": true,
    "dataNodeIdx": 24,
    "x": 432,
    "y": 257,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-75",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 432,
    "y": 199,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-76",
    "isColorNode": true,
    "dataNodeIdx": 21,
    "x": 432,
    "y": 218,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-77",
    "isColorNode": true,
    "dataNodeIdx": 72,
    "x": 432,
    "y": 353,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-78",
    "isColorNode": true,
    "dataNodeIdx": 74,
    "x": 432,
    "y": 373,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-79",
    "isColorNode": true,
    "dataNodeIdx": 149,
    "x": 432,
    "y": 508,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-80",
    "isColorNode": true,
    "dataNodeIdx": 163,
    "x": 432,
    "y": 527,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-81",
    "isColorNode": true,
    "dataNodeIdx": 117,
    "x": 432,
    "y": 469,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-82",
    "isColorNode": true,
    "dataNodeIdx": 138,
    "x": 432,
    "y": 488,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-83",
    "isColorNode": true,
    "dataNodeIdx": 84,
    "x": 432,
    "y": 431,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-84",
    "isColorNode": true,
    "dataNodeIdx": 118,
    "x": 432,
    "y": 450,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-85",
    "isColorNode": true,
    "dataNodeIdx": 83,
    "x": 432,
    "y": 392,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-86",
    "isColorNode": true,
    "dataNodeIdx": 85,
    "x": 432,
    "y": 411,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-87",
    "isColorNode": true,
    "dataNodeIdx": 166,
    "x": 432,
    "y": 546,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-88",
    "isColorNode": true,
    "dataNodeIdx": 167,
    "x": 432,
    "y": 565,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-89",
    "isColorNode": true,
    "dataNodeIdx": 60,
    "x": 545,
    "y": 315,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-90",
    "isColorNode": true,
    "dataNodeIdx": 62,
    "x": 545,
    "y": 334,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-91",
    "isColorNode": true,
    "dataNodeIdx": 27,
    "x": 545,
    "y": 276,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-92",
    "isColorNode": true,
    "dataNodeIdx": 61,
    "x": 545,
    "y": 296,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-93",
    "isColorNode": true,
    "dataNodeIdx": 25,
    "x": 545,
    "y": 238,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-94",
    "isColorNode": true,
    "dataNodeIdx": 28,
    "x": 545,
    "y": 257,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-95",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 545,
    "y": 199,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-96",
    "isColorNode": true,
    "dataNodeIdx": 26,
    "x": 545,
    "y": 218,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-97",
    "isColorNode": true,
    "dataNodeIdx": 77,
    "x": 545,
    "y": 353,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-98",
    "isColorNode": true,
    "dataNodeIdx": 94,
    "x": 545,
    "y": 373,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-99",
    "isColorNode": true,
    "dataNodeIdx": 139,
    "x": 545,
    "y": 508,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-100",
    "isColorNode": true,
    "dataNodeIdx": 155,
    "x": 545,
    "y": 527,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-101",
    "isColorNode": true,
    "dataNodeIdx": 121,
    "x": 545,
    "y": 469,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-102",
    "isColorNode": true,
    "dataNodeIdx": 140,
    "x": 545,
    "y": 488,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-103",
    "isColorNode": true,
    "dataNodeIdx": 108,
    "x": 545,
    "y": 431,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-104",
    "isColorNode": true,
    "dataNodeIdx": 122,
    "x": 545,
    "y": 450,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-105",
    "isColorNode": true,
    "dataNodeIdx": 95,
    "x": 545,
    "y": 392,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-106",
    "isColorNode": true,
    "dataNodeIdx": 109,
    "x": 545,
    "y": 411,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-107",
    "isColorNode": true,
    "dataNodeIdx": 172,
    "x": 545,
    "y": 546,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-108",
    "isColorNode": true,
    "dataNodeIdx": 173,
    "x": 545,
    "y": 565,
    "width": 58,
    "height": 13,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-109",
    "isColorNode": true,
    "dataNodeIdx": 129,
    "x": 105,
    "y": 508,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-110",
    "isColorNode": true,
    "dataNodeIdx": 131,
    "x": 105,
    "y": 527,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-111",
    "isColorNode": true,
    "dataNodeIdx": 113,
    "x": 105,
    "y": 469,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-112",
    "isColorNode": true,
    "dataNodeIdx": 130,
    "x": 105,
    "y": 488,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-113",
    "isColorNode": true,
    "dataNodeIdx": 114,
    "x": 105,
    "y": 450,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-114",
    "isColorNode": true,
    "dataNodeIdx": 142,
    "x": 105,
    "y": 546,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-115",
    "isColorNode": true,
    "dataNodeIdx": 157,
    "x": 105,
    "y": 565,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-116",
    "isColorNode": true,
    "dataNodeIdx": 134,
    "x": 212,
    "y": 508,
    "width": 58,
    "height": 13,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-117",
    "isColorNode": true,
    "dataNodeIdx": 144,
    "x": 212,
    "y": 527,
    "width": 58,
    "height": 13,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-118",
    "isColorNode": true,
    "dataNodeIdx": 135,
    "x": 212,
    "y": 488,
    "width": 58,
    "height": 13,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-119",
    "isColorNode": true,
    "dataNodeIdx": 159,
    "x": 212,
    "y": 546,
    "width": 58,
    "height": 13,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-120",
    "isColorNode": true,
    "dataNodeIdx": 160,
    "x": 212,
    "y": 565,
    "width": 58,
    "height": 13,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-121",
    "isColorNode": true,
    "dataNodeIdx": 51,
    "x": 323,
    "y": 315,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-122",
    "isColorNode": true,
    "dataNodeIdx": 52,
    "x": 323,
    "y": 334,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-123",
    "isColorNode": true,
    "dataNodeIdx": 68,
    "x": 323,
    "y": 353,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-124",
    "isColorNode": true,
    "dataNodeIdx": 71,
    "x": 323,
    "y": 373,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-125",
    "isColorNode": true,
    "dataNodeIdx": 146,
    "x": 323,
    "y": 508,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-126",
    "isColorNode": true,
    "dataNodeIdx": 148,
    "x": 323,
    "y": 527,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-127",
    "isColorNode": true,
    "dataNodeIdx": 116,
    "x": 323,
    "y": 469,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-128",
    "isColorNode": true,
    "dataNodeIdx": 147,
    "x": 323,
    "y": 488,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-129",
    "isColorNode": true,
    "dataNodeIdx": 97,
    "x": 323,
    "y": 431,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-130",
    "isColorNode": true,
    "dataNodeIdx": 106,
    "x": 323,
    "y": 450,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-131",
    "isColorNode": true,
    "dataNodeIdx": 93,
    "x": 323,
    "y": 392,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-132",
    "isColorNode": true,
    "dataNodeIdx": 98,
    "x": 323,
    "y": 411,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-133",
    "isColorNode": true,
    "dataNodeIdx": 162,
    "x": 323,
    "y": 546,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-134",
    "isColorNode": true,
    "dataNodeIdx": 170,
    "x": 323,
    "y": 565,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-135",
    "isColorNode": true,
    "dataNodeIdx": 150,
    "x": 432,
    "y": 508,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-136",
    "isColorNode": true,
    "dataNodeIdx": 154,
    "x": 432,
    "y": 527,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-137",
    "isColorNode": true,
    "dataNodeIdx": 119,
    "x": 432,
    "y": 469,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-138",
    "isColorNode": true,
    "dataNodeIdx": 151,
    "x": 432,
    "y": 488,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-139",
    "isColorNode": true,
    "dataNodeIdx": 107,
    "x": 432,
    "y": 431,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-140",
    "isColorNode": true,
    "dataNodeIdx": 120,
    "x": 432,
    "y": 450,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-141",
    "isColorNode": true,
    "dataNodeIdx": 86,
    "x": 432,
    "y": 411,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-142",
    "isColorNode": true,
    "dataNodeIdx": 168,
    "x": 432,
    "y": 546,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-143",
    "isColorNode": true,
    "dataNodeIdx": 171,
    "x": 432,
    "y": 565,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-144",
    "isColorNode": true,
    "dataNodeIdx": 44,
    "x": 545,
    "y": 315,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-145",
    "isColorNode": true,
    "dataNodeIdx": 55,
    "x": 545,
    "y": 334,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-146",
    "isColorNode": true,
    "dataNodeIdx": 29,
    "x": 545,
    "y": 276,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-147",
    "isColorNode": true,
    "dataNodeIdx": 45,
    "x": 545,
    "y": 296,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-148",
    "isColorNode": true,
    "dataNodeIdx": 63,
    "x": 545,
    "y": 353,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-149",
    "isColorNode": true,
    "dataNodeIdx": 78,
    "x": 545,
    "y": 373,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-150",
    "isColorNode": true,
    "dataNodeIdx": 152,
    "x": 545,
    "y": 508,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-151",
    "isColorNode": true,
    "dataNodeIdx": 169,
    "x": 545,
    "y": 527,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-152",
    "isColorNode": true,
    "dataNodeIdx": 123,
    "x": 545,
    "y": 469,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-153",
    "isColorNode": true,
    "dataNodeIdx": 153,
    "x": 545,
    "y": 488,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-154",
    "isColorNode": true,
    "dataNodeIdx": 111,
    "x": 545,
    "y": 431,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-155",
    "isColorNode": true,
    "dataNodeIdx": 124,
    "x": 545,
    "y": 450,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-156",
    "isColorNode": true,
    "dataNodeIdx": 88,
    "x": 545,
    "y": 392,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-157",
    "isColorNode": true,
    "dataNodeIdx": 112,
    "x": 545,
    "y": 411,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-158",
    "isColorNode": true,
    "dataNodeIdx": 174,
    "x": 545,
    "y": 546,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-159",
    "isColorNode": true,
    "dataNodeIdx": 175,
    "x": 545,
    "y": 565,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-160",
    "isColorNode": true,
    "dataNodeIdx": 89,
    "x": 105,
    "y": 431,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-161",
    "isColorNode": true,
    "dataNodeIdx": 90,
    "x": 105,
    "y": 411,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-162",
    "isColorNode": true,
    "dataNodeIdx": 65,
    "x": 105,
    "y": 392,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-163",
    "isColorNode": true,
    "dataNodeIdx": 66,
    "x": 105,
    "y": 373,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-164",
    "isColorNode": true,
    "dataNodeIdx": 47,
    "x": 105,
    "y": 353,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-165",
    "isColorNode": true,
    "dataNodeIdx": 48,
    "x": 105,
    "y": 334,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-166",
    "isColorNode": true,
    "dataNodeIdx": 34,
    "x": 105,
    "y": 315,
    "width": 58,
    "height": 13,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-167",
    "isColorNode": true,
    "dataNodeIdx": 91,
    "x": 212,
    "y": 411,
    "width": 58,
    "height": 13,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-168",
    "isColorNode": true,
    "dataNodeIdx": 96,
    "x": 212,
    "y": 431,
    "width": 58,
    "height": 13,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-169",
    "isColorNode": true,
    "dataNodeIdx": 92,
    "x": 212,
    "y": 392,
    "width": 58,
    "height": 13,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-170",
    "isColorNode": true,
    "dataNodeIdx": 110,
    "x": 212,
    "y": 450,
    "width": 58,
    "height": 13,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-171",
    "isColorNode": true,
    "dataNodeIdx": 115,
    "x": 212,
    "y": 469,
    "width": 58,
    "height": 13,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-172",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 323,
    "y": 238,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-173",
    "isColorNode": true,
    "dataNodeIdx": 19,
    "x": 323,
    "y": 257,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-174",
    "isColorNode": true,
    "dataNodeIdx": 22,
    "x": 323,
    "y": 276,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-175",
    "isColorNode": true,
    "dataNodeIdx": 36,
    "x": 323,
    "y": 296,
    "width": 58,
    "height": 13,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-176",
    "isColorNode": true,
    "dataNodeIdx": 75,
    "x": 432,
    "y": 373,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-177",
    "isColorNode": true,
    "dataNodeIdx": 87,
    "x": 432,
    "y": 392,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-178",
    "isColorNode": true,
    "dataNodeIdx": 53,
    "x": 432,
    "y": 334,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-179",
    "isColorNode": true,
    "dataNodeIdx": 76,
    "x": 432,
    "y": 353,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-180",
    "isColorNode": true,
    "dataNodeIdx": 54,
    "x": 432,
    "y": 315,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-181",
    "isColorNode": true,
    "dataNodeIdx": 30,
    "x": 545,
    "y": 257,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-182",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 545,
    "y": 218,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-183",
    "isColorNode": true,
    "dataNodeIdx": 31,
    "x": 545,
    "y": 238,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-184",
    "isColorNode": true,
    "dataNodeIdx": 37,
    "x": 432,
    "y": 296,
    "width": 58,
    "height": 13,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-185",
    "dataNodeIdx": 0,
    "x": 749,
    "y": 209,
    "width": 100,
    "height": 58,
    "text": "80%"
  },
  {
    "id": "sp-186",
    "dataNodeIdx": 1,
    "x": 749,
    "y": 478,
    "width": 100,
    "height": 58,
    "text": "60%"
  },
  {
    "id": "sp-187",
    "dataNodeIdx": 0,
    "x": 88,
    "y": 596,
    "width": 93,
    "height": 36,
    "text": "Title 1"
  },
  {
    "id": "sp-188",
    "dataNodeIdx": 1,
    "x": 194,
    "y": 596,
    "width": 93,
    "height": 36,
    "text": "Title 2"
  },
  {
    "id": "sp-189",
    "dataNodeIdx": 2,
    "x": 305,
    "y": 596,
    "width": 93,
    "height": 36,
    "text": "Title 3"
  },
  {
    "id": "sp-190",
    "dataNodeIdx": 3,
    "x": 414,
    "y": 596,
    "width": 93,
    "height": 36,
    "text": "Title 4"
  },
  {
    "id": "sp-191",
    "dataNodeIdx": 4,
    "x": 527,
    "y": 596,
    "width": 93,
    "height": 36,
    "text": "Title 5"
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

export function Migso47Template({ data }: { data: BrainData }): ReactElement {
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
