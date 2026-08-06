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
        "x": 56,
        "y": 111,
        "width": 1180,
        "height": 544,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 1,
        "localPctH": 1,
        "fillColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-3",
        "x": 68.64285714285714,
        "y": 499,
        "width": 1156.8214285714287,
        "height": 149,
        "localPctX": 0.010714285714285711,
        "localPctY": 0.7132352941176471,
        "localPctW": 0.9803571428571429,
        "localPctH": 0.27389705882352944,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 10 0 L 1146.8214285714287 0 Q 1156.8214285714287 0 1156.8214285714287 10 L 1156.8214285714287 139 Q 1156.8214285714287 149 1146.8214285714287 149 L 10 149 Q 0 149 0 139 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-4",
        "x": 68.64285714285714,
        "y": 187,
        "width": 1156.8214285714287,
        "height": 149,
        "localPctX": 0.010714285714285711,
        "localPctY": 0.13970588235294118,
        "localPctW": 0.9803571428571429,
        "localPctH": 0.27389705882352944,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 10 0 L 1146.8214285714287 0 Q 1156.8214285714287 0 1156.8214285714287 10 L 1156.8214285714287 139 Q 1156.8214285714287 149 1146.8214285714287 149 L 10 149 Q 0 149 0 139 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-5",
        "x": 68.64285714285714,
        "y": 343,
        "width": 1156.8214285714287,
        "height": 149,
        "localPctX": 0.010714285714285711,
        "localPctY": 0.4264705882352941,
        "localPctW": 0.9803571428571429,
        "localPctH": 0.27389705882352944,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 10 0 L 1146.8214285714287 0 Q 1156.8214285714287 0 1156.8214285714287 10 L 1156.8214285714287 139 Q 1156.8214285714287 149 1146.8214285714287 149 L 10 149 Q 0 149 0 139 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-6",
        "x": 81.28571428571429,
        "y": 194,
        "width": 99.03571428571429,
        "height": 29,
        "localPctX": 0.021428571428571432,
        "localPctY": 0.15257352941176472,
        "localPctW": 0.08392857142857144,
        "localPctH": 0.05330882352941176,
        "text": "Web Team"
      },
      {
        "id": "sp-7",
        "x": 81.28571428571429,
        "y": 505,
        "width": 141.17857142857144,
        "height": 29,
        "localPctX": 0.021428571428571432,
        "localPctY": 0.7242647058823529,
        "localPctW": 0.11964285714285716,
        "localPctH": 0.05330882352941176,
        "text": "Marketing Team"
      },
      {
        "id": "sp-8",
        "x": 81.28571428571429,
        "y": 349,
        "width": 115.89285714285715,
        "height": 29,
        "localPctX": 0.021428571428571432,
        "localPctY": 0.4375,
        "localPctW": 0.09821428571428573,
        "localPctH": 0.05330882352941176,
        "text": "Mobile Team"
      },
      {
        "id": "sp-9",
        "x": 81.28571428571429,
        "y": 154,
        "width": 49.517857142857146,
        "height": 29,
        "localPctX": 0.021428571428571432,
        "localPctY": 0.07904411764705882,
        "localPctW": 0.04196428571428572,
        "localPctH": 0.05330882352941176,
        "text": "Jan"
      },
      {
        "id": "sp-10",
        "x": 1086.392857142857,
        "y": 154,
        "width": 45.30357142857143,
        "height": 29,
        "localPctX": 0.8732142857142857,
        "localPctY": 0.07904411764705882,
        "localPctW": 0.038392857142857145,
        "localPctH": 0.05330882352941176,
        "text": "Jul"
      },
      {
        "id": "sp-11",
        "x": 918.875,
        "y": 154,
        "width": 50.57142857142857,
        "height": 29,
        "localPctX": 0.73125,
        "localPctY": 0.07904411764705882,
        "localPctW": 0.04285714285714286,
        "localPctH": 0.05330882352941176,
        "text": "Jun"
      },
      {
        "id": "sp-12",
        "x": 751.3571428571429,
        "y": 154,
        "width": 53.73214285714286,
        "height": 29,
        "localPctX": 0.5892857142857143,
        "localPctY": 0.07904411764705882,
        "localPctW": 0.04553571428571429,
        "localPctH": 0.05330882352941176,
        "text": "May"
      },
      {
        "id": "sp-13",
        "x": 583.8392857142858,
        "y": 154,
        "width": 49.517857142857146,
        "height": 29,
        "localPctX": 0.44732142857142865,
        "localPctY": 0.07904411764705882,
        "localPctW": 0.04196428571428572,
        "localPctH": 0.05330882352941176,
        "text": "Apr"
      },
      {
        "id": "sp-14",
        "x": 416.3214285714286,
        "y": 154,
        "width": 50.57142857142857,
        "height": 29,
        "localPctX": 0.3053571428571429,
        "localPctY": 0.07904411764705882,
        "localPctW": 0.04285714285714286,
        "localPctH": 0.05330882352941176,
        "text": "Mar"
      },
      {
        "id": "sp-15",
        "x": 248.80357142857144,
        "y": 154,
        "width": 50.57142857142857,
        "height": 29,
        "localPctX": 0.16339285714285715,
        "localPctY": 0.07904411764705882,
        "localPctW": 0.04285714285714286,
        "localPctH": 0.05330882352941176,
        "text": "Feb"
      },
      {
        "id": "sp-73",
        "x": 583.8392857142858,
        "y": 168,
        "width": 10,
        "height": 480,
        "localPctX": 0.44732142857142865,
        "localPctY": 0.10477941176470588,
        "localPctW": 0.000847457627118644,
        "localPctH": 0.8823529411764706,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-74",
        "x": 415.26785714285717,
        "y": 168,
        "width": 10,
        "height": 480,
        "localPctX": 0.30446428571428574,
        "localPctY": 0.10477941176470588,
        "localPctW": 0.000847457627118644,
        "localPctH": 0.8823529411764706,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-75",
        "x": 247.75,
        "y": 168,
        "width": 10,
        "height": 480,
        "localPctX": 0.1625,
        "localPctY": 0.10477941176470588,
        "localPctW": 0.000847457627118644,
        "localPctH": 0.8823529411764706,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-76",
        "x": 750.3035714285714,
        "y": 168,
        "width": 10,
        "height": 480,
        "localPctX": 0.5883928571428572,
        "localPctY": 0.10477941176470588,
        "localPctW": 0.000847457627118644,
        "localPctH": 0.8823529411764706,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-77",
        "x": 918.875,
        "y": 168,
        "width": 10,
        "height": 480,
        "localPctX": 0.73125,
        "localPctY": 0.10477941176470588,
        "localPctW": 0.000847457627118644,
        "localPctH": 0.8823529411764706,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-78",
        "x": 1086.392857142857,
        "y": 168,
        "width": 10,
        "height": 480,
        "localPctX": 0.8732142857142857,
        "localPctY": 0.10477941176470588,
        "localPctW": 0.000847457627118644,
        "localPctH": 0.8823529411764706,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-79",
        "x": 81.28571428571429,
        "y": 168,
        "width": 10,
        "height": 480,
        "localPctX": 0.021428571428571432,
        "localPctY": 0.10477941176470588,
        "localPctW": 0.000847457627118644,
        "localPctH": 0.8823529411764706,
        "strokeColor": "#ffffff",
        "text": ""
      },
      {
        "id": "sp-16",
        "x": 81.28571428571429,
        "y": 115,
        "width": 70.58928571428572,
        "height": 36,
        "localPctX": 0.021428571428571432,
        "localPctY": 0.007352941176470588,
        "localPctW": 0.05982142857142858,
        "localPctH": 0.0661764705882353,
        "text": "2020"
      },
      {
        "id": "sp-17",
        "x": 583.8392857142858,
        "y": 115,
        "width": 50.57142857142857,
        "height": 36,
        "localPctX": 0.44732142857142865,
        "localPctY": 0.007352941176470588,
        "localPctW": 0.04285714285714286,
        "localPctH": 0.0661764705882353,
        "text": "Q2"
      },
      {
        "id": "sp-18",
        "x": 1086.392857142857,
        "y": 115,
        "width": 50.57142857142857,
        "height": 36,
        "localPctX": 0.8732142857142857,
        "localPctY": 0.007352941176470588,
        "localPctW": 0.04285714285714286,
        "localPctH": 0.0661764705882353,
        "text": "Q3"
      },
      {
        "id": "sp-19",
        "x": 81.28571428571429,
        "y": 225,
        "width": 167.51785714285714,
        "height": 32,
        "localPctX": 0.021428571428571432,
        "localPctY": 0.20955882352941177,
        "localPctW": 0.1419642857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#3365cc",
        "text": "",
        "pathD": "M 10 0 L 157.51785714285714 0 Q 167.51785714285714 0 167.51785714285714 10 L 167.51785714285714 22 Q 167.51785714285714 32 157.51785714285714 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-20",
        "x": 583.8392857142858,
        "y": 297,
        "width": 167.51785714285714,
        "height": 32,
        "localPctX": 0.44732142857142865,
        "localPctY": 0.34191176470588236,
        "localPctW": 0.1419642857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 10 0 L 157.51785714285714 0 Q 167.51785714285714 0 167.51785714285714 10 L 167.51785714285714 22 Q 167.51785714285714 32 157.51785714285714 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-21",
        "x": 414.2142857142857,
        "y": 261,
        "width": 168.57142857142858,
        "height": 32,
        "localPctX": 0.3035714285714286,
        "localPctY": 0.2757352941176471,
        "localPctW": 0.14285714285714288,
        "localPctH": 0.058823529411764705,
        "fillColor": "#52c49c",
        "text": "",
        "pathD": "M 10 0 L 158.57142857142858 0 Q 168.57142857142858 0 168.57142857142858 10 L 168.57142857142858 22 Q 168.57142857142858 32 158.57142857142858 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-22",
        "x": 81.28571428571429,
        "y": 381,
        "width": 166.46428571428572,
        "height": 32,
        "localPctX": 0.021428571428571432,
        "localPctY": 0.4963235294117647,
        "localPctW": 0.14107142857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#3365cc",
        "text": "",
        "pathD": "M 10 0 L 156.46428571428572 0 Q 166.46428571428572 0 166.46428571428572 10 L 166.46428571428572 22 Q 166.46428571428572 32 156.46428571428572 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-23",
        "x": 247.75,
        "y": 417,
        "width": 333.9821428571429,
        "height": 32,
        "localPctX": 0.1625,
        "localPctY": 0.5625,
        "localPctW": 0.28303571428571433,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 10 0 L 323.9821428571429 0 Q 333.9821428571429 0 333.9821428571429 10 L 333.9821428571429 22 Q 333.9821428571429 32 323.9821428571429 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-24",
        "x": 81.28571428571429,
        "y": 537,
        "width": 166.46428571428572,
        "height": 32,
        "localPctX": 0.021428571428571432,
        "localPctY": 0.7830882352941176,
        "localPctW": 0.14107142857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ee6d90",
        "text": "",
        "pathD": "M 10 0 L 156.46428571428572 0 Q 166.46428571428572 0 166.46428571428572 10 L 166.46428571428572 22 Q 166.46428571428572 32 156.46428571428572 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-25",
        "x": 750.3035714285714,
        "y": 609,
        "width": 167.51785714285714,
        "height": 32,
        "localPctX": 0.5883928571428572,
        "localPctY": 0.9154411764705882,
        "localPctW": 0.1419642857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#3365cc",
        "text": "",
        "pathD": "M 10 0 L 157.51785714285714 0 Q 167.51785714285714 0 167.51785714285714 10 L 167.51785714285714 22 Q 167.51785714285714 32 157.51785714285714 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-26",
        "x": 416.3214285714286,
        "y": 573,
        "width": 166.46428571428572,
        "height": 32,
        "localPctX": 0.3053571428571429,
        "localPctY": 0.8492647058823529,
        "localPctW": 0.14107142857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ee6d90",
        "text": "",
        "pathD": "M 10 0 L 156.46428571428572 0 Q 166.46428571428572 0 166.46428571428572 10 L 166.46428571428572 22 Q 166.46428571428572 32 156.46428571428572 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-27",
        "x": 248.80357142857144,
        "y": 225,
        "width": 333.9821428571429,
        "height": 32,
        "localPctX": 0.16339285714285715,
        "localPctY": 0.20955882352941177,
        "localPctW": 0.28303571428571433,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 10 0 L 323.9821428571429 0 Q 333.9821428571429 0 333.9821428571429 10 L 333.9821428571429 22 Q 333.9821428571429 32 323.9821428571429 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-28",
        "x": 583.8392857142858,
        "y": 261,
        "width": 333.9821428571429,
        "height": 32,
        "localPctX": 0.44732142857142865,
        "localPctY": 0.2757352941176471,
        "localPctW": 0.28303571428571433,
        "localPctH": 0.058823529411764705,
        "fillColor": "#52c49c",
        "text": "",
        "pathD": "M 10 0 L 323.9821428571429 0 Q 333.9821428571429 0 333.9821428571429 10 L 333.9821428571429 22 Q 333.9821428571429 32 323.9821428571429 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-29",
        "x": 918.875,
        "y": 261,
        "width": 306.5892857142857,
        "height": 32,
        "localPctX": 0.73125,
        "localPctY": 0.2757352941176471,
        "localPctW": 0.2598214285714286,
        "localPctH": 0.058823529411764705,
        "fillColor": "#3365cc",
        "text": "",
        "pathD": "M 10 0 L 296.5892857142857 0 Q 306.5892857142857 0 306.5892857142857 10 L 306.5892857142857 22 Q 306.5892857142857 32 296.5892857142857 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-30",
        "x": 751.3571428571429,
        "y": 297,
        "width": 167.51785714285714,
        "height": 32,
        "localPctX": 0.5892857142857143,
        "localPctY": 0.34191176470588236,
        "localPctW": 0.1419642857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ffb900",
        "text": "",
        "pathD": "M 10 0 L 157.51785714285714 0 Q 167.51785714285714 0 167.51785714285714 10 L 167.51785714285714 22 Q 167.51785714285714 32 157.51785714285714 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-31",
        "x": 918.875,
        "y": 297,
        "width": 306.5892857142857,
        "height": 32,
        "localPctX": 0.73125,
        "localPctY": 0.34191176470588236,
        "localPctW": 0.2598214285714286,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ffb900",
        "text": "",
        "pathD": "M 10 0 L 296.5892857142857 0 Q 306.5892857142857 0 306.5892857142857 10 L 306.5892857142857 22 Q 306.5892857142857 32 296.5892857142857 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-32",
        "x": 247.75,
        "y": 381,
        "width": 166.46428571428572,
        "height": 32,
        "localPctX": 0.1625,
        "localPctY": 0.4963235294117647,
        "localPctW": 0.14107142857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ffb900",
        "text": "",
        "pathD": "M 10 0 L 156.46428571428572 0 Q 166.46428571428572 0 166.46428571428572 10 L 166.46428571428572 22 Q 166.46428571428572 32 156.46428571428572 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-33",
        "x": 416.3214285714286,
        "y": 381,
        "width": 166.46428571428572,
        "height": 32,
        "localPctX": 0.3053571428571429,
        "localPctY": 0.4963235294117647,
        "localPctW": 0.14107142857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ffb900",
        "text": "",
        "pathD": "M 10 0 L 156.46428571428572 0 Q 166.46428571428572 0 166.46428571428572 10 L 166.46428571428572 22 Q 166.46428571428572 32 156.46428571428572 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-34",
        "x": 583.8392857142858,
        "y": 381,
        "width": 166.46428571428572,
        "height": 32,
        "localPctX": 0.44732142857142865,
        "localPctY": 0.4963235294117647,
        "localPctW": 0.14107142857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ffb900",
        "text": "",
        "pathD": "M 10 0 L 156.46428571428572 0 Q 166.46428571428572 0 166.46428571428572 10 L 166.46428571428572 22 Q 166.46428571428572 32 156.46428571428572 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-35",
        "x": 583.8392857142858,
        "y": 417,
        "width": 166.46428571428572,
        "height": 32,
        "localPctX": 0.44732142857142865,
        "localPctY": 0.5625,
        "localPctW": 0.14107142857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 10 0 L 156.46428571428572 0 Q 166.46428571428572 0 166.46428571428572 10 L 166.46428571428572 22 Q 166.46428571428572 32 156.46428571428572 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-36",
        "x": 752.4107142857143,
        "y": 417,
        "width": 166.46428571428572,
        "height": 32,
        "localPctX": 0.5901785714285714,
        "localPctY": 0.5625,
        "localPctW": 0.14107142857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ee6d90",
        "text": "",
        "pathD": "M 10 0 L 156.46428571428572 0 Q 166.46428571428572 0 166.46428571428572 10 L 166.46428571428572 22 Q 166.46428571428572 32 156.46428571428572 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-37",
        "x": 917.8214285714286,
        "y": 417,
        "width": 166.46428571428572,
        "height": 32,
        "localPctX": 0.7303571428571428,
        "localPctY": 0.5625,
        "localPctW": 0.14107142857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 10 0 L 156.46428571428572 0 Q 166.46428571428572 0 166.46428571428572 10 L 166.46428571428572 22 Q 166.46428571428572 32 156.46428571428572 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-38",
        "x": 752.4107142857143,
        "y": 453,
        "width": 166.46428571428572,
        "height": 32,
        "localPctX": 0.5901785714285714,
        "localPctY": 0.6286764705882353,
        "localPctW": 0.14107142857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#52c49c",
        "text": "",
        "pathD": "M 10 0 L 156.46428571428572 0 Q 166.46428571428572 0 166.46428571428572 10 L 166.46428571428572 22 Q 166.46428571428572 32 156.46428571428572 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-39",
        "x": 918.875,
        "y": 453,
        "width": 305.5357142857143,
        "height": 32,
        "localPctX": 0.73125,
        "localPctY": 0.6286764705882353,
        "localPctW": 0.2589285714285714,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ffb900",
        "text": "",
        "pathD": "M 10 0 L 295.5357142857143 0 Q 305.5357142857143 0 305.5357142857143 10 L 305.5357142857143 22 Q 305.5357142857143 32 295.5357142857143 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-40",
        "x": 247.75,
        "y": 537,
        "width": 337.14285714285717,
        "height": 32,
        "localPctX": 0.1625,
        "localPctY": 0.7830882352941176,
        "localPctW": 0.28571428571428575,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 10 0 L 327.14285714285717 0 Q 337.14285714285717 0 337.14285714285717 10 L 337.14285714285717 22 Q 337.14285714285717 32 327.14285714285717 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-41",
        "x": 583.8392857142858,
        "y": 537,
        "width": 166.46428571428572,
        "height": 32,
        "localPctX": 0.44732142857142865,
        "localPctY": 0.7830882352941176,
        "localPctW": 0.14107142857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ee6d90",
        "text": "",
        "pathD": "M 10 0 L 156.46428571428572 0 Q 166.46428571428572 0 166.46428571428572 10 L 166.46428571428572 22 Q 166.46428571428572 32 156.46428571428572 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-42",
        "x": 582.7857142857143,
        "y": 573,
        "width": 335.0357142857143,
        "height": 32,
        "localPctX": 0.44642857142857145,
        "localPctY": 0.8492647058823529,
        "localPctW": 0.2839285714285714,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ee6d90",
        "text": "",
        "pathD": "M 10 0 L 325.0357142857143 0 Q 335.0357142857143 0 335.0357142857143 10 L 335.0357142857143 22 Q 335.0357142857143 32 325.0357142857143 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-43",
        "x": 918.875,
        "y": 573,
        "width": 166.46428571428572,
        "height": 32,
        "localPctX": 0.73125,
        "localPctY": 0.8492647058823529,
        "localPctW": 0.14107142857142857,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ee6d90",
        "text": "",
        "pathD": "M 10 0 L 156.46428571428572 0 Q 166.46428571428572 0 166.46428571428572 10 L 166.46428571428572 22 Q 166.46428571428572 32 156.46428571428572 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-44",
        "x": 1086.392857142857,
        "y": 573,
        "width": 138.01785714285714,
        "height": 32,
        "localPctX": 0.8732142857142857,
        "localPctY": 0.8492647058823529,
        "localPctW": 0.11696428571428572,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ee6d90",
        "text": "",
        "pathD": "M 10 0 L 128.01785714285714 0 Q 138.01785714285714 0 138.01785714285714 10 L 138.01785714285714 22 Q 138.01785714285714 32 128.01785714285714 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-45",
        "x": 918.875,
        "y": 609,
        "width": 305.5357142857143,
        "height": 32,
        "localPctX": 0.73125,
        "localPctY": 0.9154411764705882,
        "localPctW": 0.2589285714285714,
        "localPctH": 0.058823529411764705,
        "fillColor": "#ffb900",
        "text": "",
        "pathD": "M 10 0 L 295.5357142857143 0 Q 305.5357142857143 0 305.5357142857143 10 L 305.5357142857143 22 Q 305.5357142857143 32 295.5357142857143 32 L 10 32 Q 0 32 0 22 L 0 10 Q 0 0 10 0 Z"
      },
      {
        "id": "sp-46",
        "x": 88.66071428571429,
        "y": 228,
        "width": 148.55357142857144,
        "height": 26,
        "localPctX": 0.027678571428571434,
        "localPctY": 0.21507352941176472,
        "localPctW": 0.12589285714285717,
        "localPctH": 0.04779411764705882,
        "text": "New Admin Console"
      },
      {
        "id": "sp-47",
        "x": 88.66071428571429,
        "y": 384,
        "width": 118,
        "height": 26,
        "localPctX": 0.027678571428571434,
        "localPctY": 0.5018382352941176,
        "localPctW": 0.1,
        "localPctH": 0.04779411764705882,
        "text": "Mobile mockup"
      },
      {
        "id": "sp-48",
        "x": 88.66071428571429,
        "y": 541,
        "width": 119.05357142857143,
        "height": 26,
        "localPctX": 0.027678571428571434,
        "localPctY": 0.7904411764705882,
        "localPctW": 0.10089285714285715,
        "localPctH": 0.04779411764705882,
        "text": "Market analysis"
      },
      {
        "id": "sp-49",
        "x": 256.17857142857144,
        "y": 541,
        "width": 142.23214285714286,
        "height": 26,
        "localPctX": 0.16964285714285715,
        "localPctY": 0.7904411764705882,
        "localPctW": 0.12053571428571429,
        "localPctH": 0.04779411764705882,
        "text": "Customer Outreach"
      },
      {
        "id": "sp-50",
        "x": 256.17857142857144,
        "y": 420,
        "width": 127.48214285714286,
        "height": 26,
        "localPctX": 0.16964285714285715,
        "localPctY": 0.5680147058823529,
        "localPctW": 0.10803571428571429,
        "localPctH": 0.04779411764705882,
        "text": "Media Campaign"
      },
      {
        "id": "sp-51",
        "x": 256.17857142857144,
        "y": 384,
        "width": 132.75,
        "height": 26,
        "localPctX": 0.16964285714285715,
        "localPctY": 0.5018382352941176,
        "localPctW": 0.1125,
        "localPctH": 0.04779411764705882,
        "text": "UX Improvements"
      },
      {
        "id": "sp-52",
        "x": 256.17857142857144,
        "y": 228,
        "width": 151.71428571428572,
        "height": 26,
        "localPctX": 0.16964285714285715,
        "localPctY": 0.21507352941176472,
        "localPctW": 0.1285714285714286,
        "localPctH": 0.04779411764705882,
        "text": "3 rd party integrations"
      },
      {
        "id": "sp-53",
        "x": 422.64285714285717,
        "y": 264,
        "width": 94.82142857142857,
        "height": 26,
        "localPctX": 0.3107142857142857,
        "localPctY": 0.28125,
        "localPctW": 0.08035714285714285,
        "localPctH": 0.04779411764705882,
        "text": "Security 2.0"
      },
      {
        "id": "sp-54",
        "x": 422.64285714285717,
        "y": 384,
        "width": 111.67857142857143,
        "height": 26,
        "localPctX": 0.3107142857142857,
        "localPctY": 0.5018382352941176,
        "localPctW": 0.09464285714285714,
        "localPctH": 0.04779411764705882,
        "text": "Cloud Support"
      },
      {
        "id": "sp-55",
        "x": 422.64285714285717,
        "y": 576,
        "width": 82.17857142857143,
        "height": 26,
        "localPctX": 0.3107142857142857,
        "localPctY": 0.8547794117647058,
        "localPctW": 0.06964285714285715,
        "localPctH": 0.04779411764705882,
        "text": "Lead Gen"
      },
      {
        "id": "sp-56",
        "x": 590.1607142857143,
        "y": 384,
        "width": 132.75,
        "height": 26,
        "localPctX": 0.4526785714285715,
        "localPctY": 0.5018382352941176,
        "localPctW": 0.1125,
        "localPctH": 0.04779411764705882,
        "text": "UX Improvements"
      },
      {
        "id": "sp-57",
        "x": 590.1607142857143,
        "y": 300,
        "width": 132.75,
        "height": 26,
        "localPctX": 0.4526785714285715,
        "localPctY": 0.3474264705882353,
        "localPctW": 0.1125,
        "localPctH": 0.04779411764705882,
        "text": "Self Service portal"
      },
      {
        "id": "sp-58",
        "x": 590.1607142857143,
        "y": 264,
        "width": 142.23214285714286,
        "height": 26,
        "localPctX": 0.4526785714285715,
        "localPctY": 0.28125,
        "localPctW": 0.12053571428571429,
        "localPctH": 0.04779411764705882,
        "text": "On premise backup"
      },
      {
        "id": "sp-59",
        "x": 590.1607142857143,
        "y": 420,
        "width": 144.33928571428572,
        "height": 26,
        "localPctX": 0.4526785714285715,
        "localPctY": 0.5680147058823529,
        "localPctW": 0.12232142857142858,
        "localPctH": 0.04779411764705882,
        "text": "Interactive dialogue"
      },
      {
        "id": "sp-60",
        "x": 590.1607142857143,
        "y": 541,
        "width": 82.17857142857143,
        "height": 26,
        "localPctX": 0.4526785714285715,
        "localPctY": 0.7904411764705882,
        "localPctW": 0.06964285714285715,
        "localPctH": 0.04779411764705882,
        "text": "SEO Plan"
      },
      {
        "id": "sp-61",
        "x": 590.1607142857143,
        "y": 576,
        "width": 108.51785714285715,
        "height": 26,
        "localPctX": 0.4526785714285715,
        "localPctY": 0.8547794117647058,
        "localPctW": 0.09196428571428572,
        "localPctH": 0.04779411764705882,
        "text": "Pricing review"
      },
      {
        "id": "sp-62",
        "x": 758.7321428571429,
        "y": 300,
        "width": 43.19642857142857,
        "height": 26,
        "localPctX": 0.5955357142857143,
        "localPctY": 0.3474264705882353,
        "localPctW": 0.03660714285714285,
        "localPctH": 0.04779411764705882,
        "text": "API"
      },
      {
        "id": "sp-63",
        "x": 758.7321428571429,
        "y": 420,
        "width": 138.01785714285714,
        "height": 26,
        "localPctX": 0.5955357142857143,
        "localPctY": 0.5680147058823529,
        "localPctW": 0.11696428571428572,
        "localPctH": 0.04779411764705882,
        "text": "Automatic renewal"
      },
      {
        "id": "sp-64",
        "x": 758.7321428571429,
        "y": 456,
        "width": 147.5,
        "height": 26,
        "localPctX": 0.5955357142857143,
        "localPctY": 0.6341911764705882,
        "localPctW": 0.125,
        "localPctH": 0.04779411764705882,
        "text": "Application upgrade"
      },
      {
        "id": "sp-65",
        "x": 758.7321428571429,
        "y": 612,
        "width": 76.91071428571429,
        "height": 26,
        "localPctX": 0.5955357142857143,
        "localPctY": 0.9209558823529411,
        "localPctW": 0.06517857142857143,
        "localPctH": 0.04779411764705882,
        "text": "Analytics"
      },
      {
        "id": "sp-66",
        "x": 927.3035714285714,
        "y": 612,
        "width": 186.48214285714286,
        "height": 26,
        "localPctX": 0.7383928571428572,
        "localPctY": 0.9209558823529411,
        "localPctW": 0.15803571428571428,
        "localPctH": 0.04779411764705882,
        "text": "Performance management"
      },
      {
        "id": "sp-67",
        "x": 927.3035714285714,
        "y": 576,
        "width": 114.83928571428572,
        "height": 26,
        "localPctX": 0.7383928571428572,
        "localPctY": 0.8547794117647058,
        "localPctW": 0.09732142857142857,
        "localPctH": 0.04779411764705882,
        "text": "Content review"
      },
      {
        "id": "sp-68",
        "x": 927.3035714285714,
        "y": 455,
        "width": 95.875,
        "height": 26,
        "localPctX": 0.7383928571428572,
        "localPctY": 0.6323529411764706,
        "localPctW": 0.08125,
        "localPctH": 0.04779411764705882,
        "text": "Q4 Initiative"
      },
      {
        "id": "sp-69",
        "x": 927.3035714285714,
        "y": 420,
        "width": 125.375,
        "height": 26,
        "localPctX": 0.7383928571428572,
        "localPctY": 0.5680147058823529,
        "localPctW": 0.10625,
        "localPctH": 0.04779411764705882,
        "text": "Ticketing system"
      },
      {
        "id": "sp-70",
        "x": 927.3035714285714,
        "y": 299,
        "width": 202.28571428571428,
        "height": 26,
        "localPctX": 0.7383928571428572,
        "localPctY": 0.34558823529411764,
        "localPctW": 0.17142857142857143,
        "localPctH": 0.04779411764705882,
        "text": "Shopping cart improvements"
      },
      {
        "id": "sp-71",
        "x": 927.3035714285714,
        "y": 264,
        "width": 99.03571428571429,
        "height": 26,
        "localPctX": 0.7383928571428572,
        "localPctY": 0.28125,
        "localPctW": 0.08392857142857144,
        "localPctH": 0.04779411764705882,
        "text": "Code review"
      },
      {
        "id": "sp-72",
        "x": 1091.6607142857142,
        "y": 568,
        "width": 119.05357142857143,
        "height": 42,
        "localPctX": 0.8776785714285714,
        "localPctY": 0.8400735294117647,
        "localPctW": 0.10089285714285715,
        "localPctH": 0.07720588235294118,
        "text": "Productive email campaign"
      }
    ],
    "x": 56,
    "y": 111,
    "width": 1180,
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

export function Migso173Template({ data }: { data: BrainData }): ReactElement {
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
