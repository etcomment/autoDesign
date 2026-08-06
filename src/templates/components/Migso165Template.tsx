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
    "x": 80,
    "y": 174,
    "width": 75,
    "height": 111,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 80,
    "y": 298,
    "width": 75,
    "height": 111,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 80,
    "y": 422,
    "width": 75,
    "height": 111,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 80,
    "y": 545,
    "width": 75,
    "height": 111,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 165,
    "y": 125,
    "width": 197,
    "height": 42,
    "text": ""
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1003,
    "y": 125,
    "width": 197,
    "height": 42,
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 584,
    "y": 125,
    "width": 197,
    "height": 42,
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 375,
    "y": 125,
    "width": 197,
    "height": 42,
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 794,
    "y": 125,
    "width": 197,
    "height": 42,
    "text": ""
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 239,
    "y": 128,
    "width": 49,
    "height": 36,
    "text": "1.1"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 1,
    "x": 449,
    "y": 128,
    "width": 49,
    "height": 36,
    "text": "1.2"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 2,
    "x": 658,
    "y": 128,
    "width": 49,
    "height": 36,
    "text": "1.3"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 3,
    "x": 868,
    "y": 128,
    "width": 49,
    "height": 36,
    "text": "2.1"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 4,
    "x": 1077,
    "y": 128,
    "width": 49,
    "height": 36,
    "text": "2.2"
  },
  {
    "id": "sp-14",
    "x": 57,
    "y": 215,
    "width": 121,
    "height": 29,
    "text": "Development"
  },
  {
    "id": "sp-15",
    "x": 77,
    "y": 339,
    "width": 80,
    "height": 29,
    "text": "Product"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 6,
    "x": 96,
    "y": 586,
    "width": 44,
    "height": 29,
    "text": "QA"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 5,
    "x": 97,
    "y": 463,
    "width": 42,
    "height": 29,
    "text": "UX"
  },
  {
    "id": "sp-119",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 165,
    "y": 292,
    "width": 1035,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-120",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 165,
    "y": 415,
    "width": 1035,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-121",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 165,
    "y": 539,
    "width": 1035,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 180,
    "y": 174,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 180,
    "y": 214,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 165,
    "y": 174,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 165,
    "y": 214,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 0,
    "x": 190,
    "y": 180,
    "width": 163,
    "height": 21,
    "text": "Front-end prototype"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 5,
    "x": 190,
    "y": 219,
    "width": 163,
    "height": 21,
    "text": "Repository deployment"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 389,
    "y": 174,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 389,
    "y": 214,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 389,
    "y": 254,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 375,
    "y": 174,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 375,
    "y": 214,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 375,
    "y": 254,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 1,
    "x": 399,
    "y": 180,
    "width": 163,
    "height": 21,
    "text": "Environment setup"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 6,
    "x": 399,
    "y": 219,
    "width": 163,
    "height": 21,
    "text": "Back-end engine"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 10,
    "x": 399,
    "y": 259,
    "width": 163,
    "height": 21,
    "text": "Feature A scope"
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 599,
    "y": 174,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 599,
    "y": 214,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 599,
    "y": 254,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 584,
    "y": 174,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 584,
    "y": 214,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 584,
    "y": 254,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 2,
    "x": 609,
    "y": 180,
    "width": 163,
    "height": 21,
    "text": "Store review"
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 7,
    "x": 609,
    "y": 219,
    "width": 163,
    "height": 21,
    "text": "Demo staging"
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 11,
    "x": 609,
    "y": 259,
    "width": 163,
    "height": 21,
    "text": "Feature B scope"
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 808,
    "y": 174,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-43",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 808,
    "y": 214,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 808,
    "y": 254,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-45",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 794,
    "y": 174,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-46",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 794,
    "y": 214,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-47",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 794,
    "y": 254,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 3,
    "x": 818,
    "y": 180,
    "width": 163,
    "height": 21,
    "text": "Environment setup"
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 8,
    "x": 818,
    "y": 219,
    "width": 163,
    "height": 21,
    "text": "Integrated prototype"
  },
  {
    "id": "sp-50",
    "dataNodeIdx": 12,
    "x": 818,
    "y": 259,
    "width": 163,
    "height": 21,
    "text": "Analytics engine"
  },
  {
    "id": "sp-51",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1018,
    "y": 174,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-52",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 1018,
    "y": 214,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-53",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 1018,
    "y": 254,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-54",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1003,
    "y": 174,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-55",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 1003,
    "y": 214,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-56",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 1003,
    "y": 254,
    "width": 14,
    "height": 32,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-57",
    "dataNodeIdx": 4,
    "x": 1027,
    "y": 180,
    "width": 163,
    "height": 21,
    "text": "Unit testing"
  },
  {
    "id": "sp-58",
    "dataNodeIdx": 9,
    "x": 1027,
    "y": 219,
    "width": 163,
    "height": 21,
    "text": "Back-end analytics"
  },
  {
    "id": "sp-59",
    "dataNodeIdx": 13,
    "x": 1027,
    "y": 259,
    "width": 163,
    "height": 21,
    "text": "Engineering review"
  },
  {
    "id": "sp-60",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 180,
    "y": 298,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-61",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 165,
    "y": 298,
    "width": 14,
    "height": 32,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-62",
    "dataNodeIdx": 14,
    "x": 190,
    "y": 303,
    "width": 163,
    "height": 21,
    "text": "MVP Requirements"
  },
  {
    "id": "sp-63",
    "isColorNode": true,
    "dataNodeIdx": 15,
    "x": 389,
    "y": 298,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-64",
    "isColorNode": true,
    "dataNodeIdx": 19,
    "x": 389,
    "y": 338,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-65",
    "isColorNode": true,
    "dataNodeIdx": 15,
    "x": 375,
    "y": 298,
    "width": 14,
    "height": 32,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-66",
    "isColorNode": true,
    "dataNodeIdx": 19,
    "x": 375,
    "y": 338,
    "width": 14,
    "height": 32,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-67",
    "dataNodeIdx": 15,
    "x": 399,
    "y": 303,
    "width": 163,
    "height": 21,
    "text": "Roadmap brief"
  },
  {
    "id": "sp-68",
    "dataNodeIdx": 19,
    "x": 399,
    "y": 343,
    "width": 163,
    "height": 21,
    "text": "Feature requirements"
  },
  {
    "id": "sp-69",
    "isColorNode": true,
    "dataNodeIdx": 16,
    "x": 599,
    "y": 298,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-70",
    "isColorNode": true,
    "dataNodeIdx": 20,
    "x": 599,
    "y": 338,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-71",
    "isColorNode": true,
    "dataNodeIdx": 16,
    "x": 584,
    "y": 298,
    "width": 14,
    "height": 32,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-72",
    "isColorNode": true,
    "dataNodeIdx": 20,
    "x": 584,
    "y": 338,
    "width": 14,
    "height": 32,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-73",
    "dataNodeIdx": 16,
    "x": 609,
    "y": 303,
    "width": 163,
    "height": 21,
    "text": "Pilot"
  },
  {
    "id": "sp-74",
    "dataNodeIdx": 20,
    "x": 609,
    "y": 343,
    "width": 163,
    "height": 21,
    "text": "Feedback"
  },
  {
    "id": "sp-75",
    "isColorNode": true,
    "dataNodeIdx": 17,
    "x": 808,
    "y": 298,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-76",
    "isColorNode": true,
    "dataNodeIdx": 21,
    "x": 808,
    "y": 338,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-77",
    "isColorNode": true,
    "dataNodeIdx": 17,
    "x": 794,
    "y": 298,
    "width": 14,
    "height": 32,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-78",
    "isColorNode": true,
    "dataNodeIdx": 21,
    "x": 794,
    "y": 338,
    "width": 14,
    "height": 32,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-79",
    "dataNodeIdx": 17,
    "x": 818,
    "y": 303,
    "width": 163,
    "height": 21,
    "text": "Launch"
  },
  {
    "id": "sp-80",
    "dataNodeIdx": 21,
    "x": 818,
    "y": 343,
    "width": 163,
    "height": 21,
    "text": "Customer Testing"
  },
  {
    "id": "sp-81",
    "isColorNode": true,
    "dataNodeIdx": 18,
    "x": 1018,
    "y": 298,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-82",
    "isColorNode": true,
    "dataNodeIdx": 22,
    "x": 1018,
    "y": 338,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-83",
    "isColorNode": true,
    "dataNodeIdx": 18,
    "x": 1003,
    "y": 298,
    "width": 14,
    "height": 32,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-84",
    "isColorNode": true,
    "dataNodeIdx": 22,
    "x": 1003,
    "y": 338,
    "width": 14,
    "height": 32,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-85",
    "dataNodeIdx": 18,
    "x": 1027,
    "y": 303,
    "width": 163,
    "height": 21,
    "text": "Backlog sweep"
  },
  {
    "id": "sp-86",
    "dataNodeIdx": 22,
    "x": 1027,
    "y": 343,
    "width": 163,
    "height": 21,
    "text": "Feature release A-B"
  },
  {
    "id": "sp-87",
    "isColorNode": true,
    "dataNodeIdx": 23,
    "x": 180,
    "y": 422,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-88",
    "isColorNode": true,
    "dataNodeIdx": 23,
    "x": 165,
    "y": 422,
    "width": 14,
    "height": 32,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-89",
    "dataNodeIdx": 23,
    "x": 190,
    "y": 427,
    "width": 163,
    "height": 21,
    "text": "Wireframe"
  },
  {
    "id": "sp-90",
    "isColorNode": true,
    "dataNodeIdx": 24,
    "x": 389,
    "y": 422,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-91",
    "isColorNode": true,
    "dataNodeIdx": 24,
    "x": 375,
    "y": 422,
    "width": 14,
    "height": 32,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-92",
    "dataNodeIdx": 24,
    "x": 399,
    "y": 427,
    "width": 163,
    "height": 21,
    "text": "UX Design Templates"
  },
  {
    "id": "sp-93",
    "isColorNode": true,
    "dataNodeIdx": 25,
    "x": 599,
    "y": 422,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-94",
    "isColorNode": true,
    "dataNodeIdx": 25,
    "x": 584,
    "y": 422,
    "width": 14,
    "height": 32,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-95",
    "dataNodeIdx": 25,
    "x": 609,
    "y": 427,
    "width": 163,
    "height": 21,
    "text": "Feature-level design"
  },
  {
    "id": "sp-96",
    "isColorNode": true,
    "dataNodeIdx": 26,
    "x": 808,
    "y": 422,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-97",
    "isColorNode": true,
    "dataNodeIdx": 26,
    "x": 794,
    "y": 422,
    "width": 14,
    "height": 32,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-98",
    "dataNodeIdx": 26,
    "x": 818,
    "y": 427,
    "width": 163,
    "height": 21,
    "text": "UX Audit"
  },
  {
    "id": "sp-99",
    "isColorNode": true,
    "dataNodeIdx": 27,
    "x": 1018,
    "y": 422,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-100",
    "isColorNode": true,
    "dataNodeIdx": 27,
    "x": 1003,
    "y": 422,
    "width": 14,
    "height": 32,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-101",
    "dataNodeIdx": 27,
    "x": 1027,
    "y": 427,
    "width": 163,
    "height": 21,
    "text": "High level design"
  },
  {
    "id": "sp-102",
    "isColorNode": true,
    "dataNodeIdx": 28,
    "x": 180,
    "y": 545,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-103",
    "isColorNode": true,
    "dataNodeIdx": 28,
    "x": 165,
    "y": 545,
    "width": 14,
    "height": 32,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-104",
    "dataNodeIdx": 28,
    "x": 190,
    "y": 551,
    "width": 163,
    "height": 21,
    "text": "Metrics"
  },
  {
    "id": "sp-105",
    "isColorNode": true,
    "dataNodeIdx": 29,
    "x": 389,
    "y": 545,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-106",
    "isColorNode": true,
    "dataNodeIdx": 29,
    "x": 375,
    "y": 545,
    "width": 14,
    "height": 32,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-107",
    "dataNodeIdx": 29,
    "x": 399,
    "y": 551,
    "width": 163,
    "height": 21,
    "text": "QA"
  },
  {
    "id": "sp-108",
    "isColorNode": true,
    "dataNodeIdx": 30,
    "x": 599,
    "y": 545,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-109",
    "isColorNode": true,
    "dataNodeIdx": 30,
    "x": 584,
    "y": 545,
    "width": 14,
    "height": 32,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-110",
    "dataNodeIdx": 30,
    "x": 609,
    "y": 551,
    "width": 163,
    "height": 21,
    "text": "Variance testing"
  },
  {
    "id": "sp-111",
    "isColorNode": true,
    "dataNodeIdx": 31,
    "x": 808,
    "y": 545,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-112",
    "isColorNode": true,
    "dataNodeIdx": 31,
    "x": 794,
    "y": 545,
    "width": 14,
    "height": 32,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-113",
    "dataNodeIdx": 31,
    "x": 818,
    "y": 551,
    "width": 163,
    "height": 21,
    "text": "UAT"
  },
  {
    "id": "sp-114",
    "isColorNode": true,
    "dataNodeIdx": 32,
    "x": 1018,
    "y": 545,
    "width": 182,
    "height": 32,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-115",
    "isColorNode": true,
    "dataNodeIdx": 32,
    "x": 1003,
    "y": 545,
    "width": 14,
    "height": 32,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-116",
    "dataNodeIdx": 32,
    "x": 1027,
    "y": 551,
    "width": 163,
    "height": 21,
    "text": "PM Testing"
  },
  {
    "id": "sp-122",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 368,
    "y": 174,
    "width": 10,
    "height": 482,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-123",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 578,
    "y": 174,
    "width": 10,
    "height": 482,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-124",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 787,
    "y": 174,
    "width": 10,
    "height": 482,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-125",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 997,
    "y": 174,
    "width": 10,
    "height": 482,
    "strokeColor": "#ffffff",
    "text": ""
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

export function Migso165Template({ data }: { data: BrainData }): ReactElement {
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
