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
        "x": 166,
        "y": 129,
        "width": 197,
        "height": 42.65410958904109,
        "localPctX": 0.07678571428571429,
        "localPctY": 0,
        "localPctW": 0.17589285714285716,
        "localPctH": 0.08047945205479451,
        "fillColor": "#3365cc",
        "text": ""
      },
      {
        "id": "sp-3",
        "x": 1003,
        "y": 129,
        "width": 197,
        "height": 42.65410958904109,
        "localPctX": 0.8241071428571428,
        "localPctY": 0,
        "localPctW": 0.17589285714285716,
        "localPctH": 0.08047945205479451,
        "fillColor": "#3365cc",
        "text": ""
      },
      {
        "id": "sp-4",
        "x": 584,
        "y": 129,
        "width": 197,
        "height": 42.65410958904109,
        "localPctX": 0.45,
        "localPctY": 0,
        "localPctW": 0.17589285714285716,
        "localPctH": 0.08047945205479451,
        "fillColor": "#3365cc",
        "text": ""
      },
      {
        "id": "sp-5",
        "x": 375,
        "y": 129,
        "width": 197,
        "height": 42.65410958904109,
        "localPctX": 0.26339285714285715,
        "localPctY": 0,
        "localPctW": 0.17589285714285716,
        "localPctH": 0.08047945205479451,
        "fillColor": "#3365cc",
        "text": ""
      },
      {
        "id": "sp-6",
        "x": 794,
        "y": 129,
        "width": 197,
        "height": 42.65410958904109,
        "localPctX": 0.6375,
        "localPctY": 0,
        "localPctW": 0.17589285714285716,
        "localPctH": 0.08047945205479451,
        "fillColor": "#3365cc",
        "text": ""
      },
      {
        "id": "sp-7",
        "x": 192,
        "y": 135.35273972602738,
        "width": 144,
        "height": 29.9486301369863,
        "localPctX": 0.1,
        "localPctY": 0.011986301369862982,
        "localPctW": 0.12857142857142856,
        "localPctH": 0.05650684931506849,
        "text": "November 2020"
      },
      {
        "id": "sp-8",
        "x": 402,
        "y": 135.35273972602738,
        "width": 143,
        "height": 29.9486301369863,
        "localPctX": 0.2875,
        "localPctY": 0.011986301369862982,
        "localPctW": 0.12767857142857142,
        "localPctH": 0.05650684931506849,
        "text": "December 2020"
      },
      {
        "id": "sp-9",
        "x": 619,
        "y": 135.35273972602738,
        "width": 127,
        "height": 29.9486301369863,
        "localPctX": 0.48125,
        "localPctY": 0.011986301369862982,
        "localPctW": 0.11339285714285714,
        "localPctH": 0.05650684931506849,
        "text": "January 2021"
      },
      {
        "id": "sp-10",
        "x": 825,
        "y": 135.35273972602738,
        "width": 134,
        "height": 29.9486301369863,
        "localPctX": 0.6651785714285714,
        "localPctY": 0.011986301369862982,
        "localPctW": 0.11964285714285715,
        "localPctH": 0.05650684931506849,
        "text": "February 2021"
      },
      {
        "id": "sp-11",
        "x": 1046,
        "y": 135.35273972602738,
        "width": 111,
        "height": 29.9486301369863,
        "localPctX": 0.8625,
        "localPctY": 0.011986301369862982,
        "localPctW": 0.09910714285714285,
        "localPctH": 0.05650684931506849,
        "text": "March 2021"
      },
      {
        "id": "sp-12",
        "x": 80,
        "y": 180.7294520547945,
        "width": 75,
        "height": 153.37328767123287,
        "localPctX": 0,
        "localPctY": 0.09760273972602737,
        "localPctW": 0.06696428571428571,
        "localPctH": 0.2893835616438356,
        "fillColor": "#ff4d38",
        "text": ""
      },
      {
        "id": "sp-13",
        "x": 67,
        "y": 240.62671232876713,
        "width": 102,
        "height": 30.85616438356164,
        "localPctX": -0.011607142857142858,
        "localPctY": 0.2106164383561644,
        "localPctW": 0.09107142857142857,
        "localPctH": 0.05821917808219178,
        "text": "Current"
      },
      {
        "id": "sp-14",
        "x": 80,
        "y": 343.17808219178085,
        "width": 75,
        "height": 153.37328767123287,
        "localPctX": 0,
        "localPctY": 0.40410958904109595,
        "localPctW": 0.06696428571428571,
        "localPctH": 0.2893835616438356,
        "fillColor": "#52c49c",
        "text": ""
      },
      {
        "id": "sp-15",
        "x": 52,
        "y": 403.07534246575347,
        "width": 131,
        "height": 30.85616438356164,
        "localPctX": -0.025,
        "localPctY": 0.517123287671233,
        "localPctW": 0.11696428571428572,
        "localPctH": 0.05821917808219178,
        "text": "Near-Term"
      },
      {
        "id": "sp-16",
        "x": 80,
        "y": 505.6267123287671,
        "width": 75,
        "height": 153.37328767123287,
        "localPctX": 0,
        "localPctY": 0.7106164383561643,
        "localPctW": 0.06696428571428571,
        "localPctH": 0.2893835616438356,
        "fillColor": "#ffb900",
        "text": ""
      },
      {
        "id": "sp-17",
        "x": 72,
        "y": 565.5239726027397,
        "width": 90,
        "height": 30.85616438356164,
        "localPctX": -0.007142857142857143,
        "localPctY": 0.8236301369863014,
        "localPctW": 0.08035714285714286,
        "localPctH": 0.05821917808219178,
        "text": "Future"
      },
      {
        "id": "sp-18",
        "x": 808,
        "y": 180.7294520547945,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.65,
        "localPctY": 0.09760273972602737,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-19",
        "x": 794,
        "y": 180.7294520547945,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.6375,
        "localPctY": 0.09760273972602737,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ff4d38",
        "text": ""
      },
      {
        "id": "sp-20",
        "x": 818,
        "y": 187.08219178082192,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.6589285714285714,
        "localPctY": 0.1095890410958904,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "File type support"
      },
      {
        "id": "sp-21",
        "x": 808,
        "y": 224.29109589041096,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.65,
        "localPctY": 0.1797945205479452,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-22",
        "x": 794,
        "y": 224.29109589041096,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.6375,
        "localPctY": 0.1797945205479452,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ff4d38",
        "text": ""
      },
      {
        "id": "sp-23",
        "x": 818,
        "y": 229.736301369863,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.6589285714285714,
        "localPctY": 0.19006849315068494,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "Filters"
      },
      {
        "id": "sp-24",
        "x": 808,
        "y": 267.8527397260274,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.65,
        "localPctY": 0.261986301369863,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-25",
        "x": 794,
        "y": 267.8527397260274,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.6375,
        "localPctY": 0.261986301369863,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ff4d38",
        "text": ""
      },
      {
        "id": "sp-26",
        "x": 818,
        "y": 273.29794520547944,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.6589285714285714,
        "localPctY": 0.2722602739726027,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "Executive view"
      },
      {
        "id": "sp-27",
        "x": 808,
        "y": 505.6267123287671,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.65,
        "localPctY": 0.7106164383561643,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-28",
        "x": 794,
        "y": 505.6267123287671,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.6375,
        "localPctY": 0.7106164383561643,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffb900",
        "text": ""
      },
      {
        "id": "sp-29",
        "x": 818,
        "y": 511.07191780821915,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.6589285714285714,
        "localPctY": 0.720890410958904,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "Content sharing"
      },
      {
        "id": "sp-30",
        "x": 808,
        "y": 549.1883561643835,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.65,
        "localPctY": 0.7928082191780822,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-31",
        "x": 794,
        "y": 549.1883561643835,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.6375,
        "localPctY": 0.7928082191780822,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffb900",
        "text": ""
      },
      {
        "id": "sp-32",
        "x": 818,
        "y": 554.6335616438356,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.6589285714285714,
        "localPctY": 0.8030821917808219,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "CMR Integration"
      },
      {
        "id": "sp-33",
        "x": 599,
        "y": 505.6267123287671,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.46339285714285716,
        "localPctY": 0.7106164383561643,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-34",
        "x": 584,
        "y": 505.6267123287671,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.45,
        "localPctY": 0.7106164383561643,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffb900",
        "text": ""
      },
      {
        "id": "sp-35",
        "x": 609,
        "y": 511.07191780821915,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.47232142857142856,
        "localPctY": 0.720890410958904,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "Issue Map"
      },
      {
        "id": "sp-36",
        "x": 599,
        "y": 549.1883561643835,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.46339285714285716,
        "localPctY": 0.7928082191780822,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-37",
        "x": 584,
        "y": 549.1883561643835,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.45,
        "localPctY": 0.7928082191780822,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffb900",
        "text": ""
      },
      {
        "id": "sp-38",
        "x": 609,
        "y": 554.6335616438356,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.47232142857142856,
        "localPctY": 0.8030821917808219,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "SQL Support"
      },
      {
        "id": "sp-39",
        "x": 599,
        "y": 343.17808219178085,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.46339285714285716,
        "localPctY": 0.40410958904109595,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-40",
        "x": 584,
        "y": 343.17808219178085,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.45,
        "localPctY": 0.40410958904109595,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#52c49c",
        "text": ""
      },
      {
        "id": "sp-41",
        "x": 609,
        "y": 348.6232876712329,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.47232142857142856,
        "localPctY": 0.41438356164383566,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "Account management"
      },
      {
        "id": "sp-42",
        "x": 599,
        "y": 386.7397260273973,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.46339285714285716,
        "localPctY": 0.48630136986301375,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-43",
        "x": 584,
        "y": 386.7397260273973,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.45,
        "localPctY": 0.48630136986301375,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#52c49c",
        "text": ""
      },
      {
        "id": "sp-44",
        "x": 609,
        "y": 392.18493150684935,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.47232142857142856,
        "localPctY": 0.4965753424657535,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "Custom colors"
      },
      {
        "id": "sp-45",
        "x": 599,
        "y": 429.3938356164383,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.46339285714285716,
        "localPctY": 0.5667808219178081,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-46",
        "x": 584,
        "y": 429.3938356164383,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.45,
        "localPctY": 0.5667808219178081,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#52c49c",
        "text": ""
      },
      {
        "id": "sp-47",
        "x": 609,
        "y": 435.7465753424657,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.47232142857142856,
        "localPctY": 0.5787671232876711,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "Allow group edits"
      },
      {
        "id": "sp-48",
        "x": 389,
        "y": 343.17808219178085,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.27589285714285716,
        "localPctY": 0.40410958904109595,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-49",
        "x": 375,
        "y": 343.17808219178085,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.26339285714285715,
        "localPctY": 0.40410958904109595,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#52c49c",
        "text": ""
      },
      {
        "id": "sp-50",
        "x": 399,
        "y": 348.6232876712329,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.28482142857142856,
        "localPctY": 0.41438356164383566,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "Advanced interactions"
      },
      {
        "id": "sp-51",
        "x": 389,
        "y": 505.6267123287671,
        "width": 182,
        "height": 49.91438356164383,
        "localPctX": 0.27589285714285716,
        "localPctY": 0.7106164383561643,
        "localPctW": 0.1625,
        "localPctH": 0.09417808219178081,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-52",
        "x": 375,
        "y": 505.6267123287671,
        "width": 14,
        "height": 49.91438356164383,
        "localPctX": 0.26339285714285715,
        "localPctY": 0.7106164383561643,
        "localPctW": 0.0125,
        "localPctH": 0.09417808219178081,
        "fillColor": "#ffb900",
        "text": ""
      },
      {
        "id": "sp-53",
        "x": 399,
        "y": 511.9794520547945,
        "width": 163,
        "height": 37.20890410958904,
        "localPctX": 0.28482142857142856,
        "localPctY": 0.7226027397260273,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.0702054794520548,
        "text": "Comments require approval"
      },
      {
        "id": "sp-54",
        "x": 389,
        "y": 180.7294520547945,
        "width": 182,
        "height": 49.91438356164383,
        "localPctX": 0.27589285714285716,
        "localPctY": 0.09760273972602737,
        "localPctW": 0.1625,
        "localPctH": 0.09417808219178081,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-55",
        "x": 375,
        "y": 180.7294520547945,
        "width": 14,
        "height": 49.91438356164383,
        "localPctX": 0.26339285714285715,
        "localPctY": 0.09760273972602737,
        "localPctW": 0.0125,
        "localPctH": 0.09417808219178081,
        "fillColor": "#ff4d38",
        "text": ""
      },
      {
        "id": "sp-56",
        "x": 399,
        "y": 187.98972602739727,
        "width": 163,
        "height": 37.20890410958904,
        "localPctX": 0.28482142857142856,
        "localPctY": 0.11130136986301371,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.0702054794520548,
        "text": "Google Chrome BRowser support"
      },
      {
        "id": "sp-57",
        "x": 1018,
        "y": 180.7294520547945,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.8375,
        "localPctY": 0.09760273972602737,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-58",
        "x": 1003,
        "y": 180.7294520547945,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.8241071428571428,
        "localPctY": 0.09760273972602737,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ff4d38",
        "text": ""
      },
      {
        "id": "sp-59",
        "x": 1027,
        "y": 187.08219178082192,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.8455357142857143,
        "localPctY": 0.1095890410958904,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "Description formatting"
      },
      {
        "id": "sp-60",
        "x": 1018,
        "y": 505.6267123287671,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.8375,
        "localPctY": 0.7106164383561643,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-61",
        "x": 1003,
        "y": 505.6267123287671,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.8241071428571428,
        "localPctY": 0.7106164383561643,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffb900",
        "text": ""
      },
      {
        "id": "sp-62",
        "x": 1027,
        "y": 511.07191780821915,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.8455357142857143,
        "localPctY": 0.720890410958904,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "Developer Dashboard"
      },
      {
        "id": "sp-63",
        "x": 1018,
        "y": 549.1883561643835,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.8375,
        "localPctY": 0.7928082191780822,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-64",
        "x": 1003,
        "y": 549.1883561643835,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.8241071428571428,
        "localPctY": 0.7928082191780822,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffb900",
        "text": ""
      },
      {
        "id": "sp-65",
        "x": 1027,
        "y": 554.6335616438356,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.8455357142857143,
        "localPctY": 0.8030821917808219,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "Interactive messages"
      },
      {
        "id": "sp-69",
        "x": 368,
        "y": 180.7294520547945,
        "width": 10,
        "height": 478.27054794520546,
        "localPctX": 0.2571428571428571,
        "localPctY": 0.09760273972602737,
        "localPctW": 0.0008928571428571428,
        "localPctH": 0.9023972602739726,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-70",
        "x": 578,
        "y": 181.63698630136986,
        "width": 10,
        "height": 477.36301369863014,
        "localPctX": 0.4446428571428571,
        "localPctY": 0.09931506849315068,
        "localPctW": 0.0008928571428571428,
        "localPctH": 0.9006849315068494,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-71",
        "x": 787,
        "y": 180.7294520547945,
        "width": 10,
        "height": 478.27054794520546,
        "localPctX": 0.63125,
        "localPctY": 0.09760273972602737,
        "localPctW": 0.0008928571428571428,
        "localPctH": 0.9023972602739726,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-72",
        "x": 997,
        "y": 180.7294520547945,
        "width": 10,
        "height": 478.27054794520546,
        "localPctX": 0.81875,
        "localPctY": 0.09760273972602737,
        "localPctW": 0.0008928571428571428,
        "localPctH": 0.9023972602739726,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-73",
        "x": 160,
        "y": 501.08904109589037,
        "width": 1040,
        "height": 10,
        "localPctX": 0.07142857142857142,
        "localPctY": 0.7020547945205479,
        "localPctW": 0.9285714285714286,
        "localPctH": 0.0018867924528301887,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-74",
        "x": 160,
        "y": 338.6404109589041,
        "width": 1040,
        "height": 10,
        "localPctX": 0.07142857142857142,
        "localPctY": 0.3955479452054795,
        "localPctW": 0.9285714285714286,
        "localPctH": 0.0018867924528301887,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-66",
        "x": 1018,
        "y": 224.29109589041096,
        "width": 182,
        "height": 32.671232876712324,
        "localPctX": 0.8375,
        "localPctY": 0.1797945205479452,
        "localPctW": 0.1625,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-67",
        "x": 1003,
        "y": 224.29109589041096,
        "width": 14,
        "height": 32.671232876712324,
        "localPctX": 0.8241071428571428,
        "localPctY": 0.1797945205479452,
        "localPctW": 0.0125,
        "localPctH": 0.061643835616438346,
        "fillColor": "#ff4d38",
        "text": ""
      },
      {
        "id": "sp-68",
        "x": 1027,
        "y": 229.736301369863,
        "width": 163,
        "height": 20.873287671232877,
        "localPctX": 0.8455357142857143,
        "localPctY": 0.19006849315068494,
        "localPctW": 0.1455357142857143,
        "localPctH": 0.039383561643835614,
        "text": "Auto Save"
      }
    ],
    "x": 80,
    "y": 129,
    "width": 1120,
    "height": 530
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

export function Migso166Template({ data }: { data: BrainData }): ReactElement {
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
