import { useRef, useId, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

function getDynamicIcon(iconName?: string) {
  if (!iconName) return null
  const clean = iconName.trim()

  // 1. Check TEMPLATE_ICONS (exact or lowercase)
  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn

  // 2. Format to PascalCase and check Lucide icons (ex: "wrench" -> "Wrench")
  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const LucideFn = (LucideIcons as Record<string, any>)[pascalName] || (LucideIcons as Record<string, any>)[clean] || (LucideIcons as Record<string, any>)[clean.toUpperCase()]
  if (LucideFn) {
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? 32} color={props.color ?? 'white'} />
  }

  return null
}

function createSectorPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const rad1 = (startDeg * Math.PI) / 180
  const rad2 = (endDeg * Math.PI) / 180
  const x1 = cx + r * Math.cos(rad1)
  const y1 = cy + r * Math.sin(rad1)
  const x2 = cx + r * Math.cos(rad2)
  const y2 = cy + r * Math.sin(rad2)
  const largeArc = endDeg - startDeg > 180 ? 1 : 0

  return `M ${cx},${cy} L ${x1},${y1} A ${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`
}

// Exact SVG Paths extracted from dessin-1.svg (Inkscape)
const SVG_TRANSFORM_OFFSET_X = -9.5806452
const SVG_TRANSFORM_OFFSET_Y = 9.2258063

// Head Silhouette (path13)
const HEAD_PATH_EXACT =
  "m 119.25243,164.39982 c 0.0978,-9.71351 0.19841,-18.91109 0.22362,-20.43906 l 0.0458,-2.77812 -2.01173,-4.10104 c -3.41609,-6.96393 -7.87541,-13.11631 -10.28837,-14.19453 -2.12961,-0.95161 -5.70503,-3.45528 -7.03036,-4.92299 -1.205605,-1.33511 -2.485305,-3.60374 -2.499128,-4.4304 -0.01687,-1.00895 -0.355997,-1.05562 -2.7864,-0.38345 -1.304329,0.36074 -3.756943,0.79585 -5.450253,0.96691 -4.033291,0.40746 -8.08384,-0.10737 -11.531794,-1.4657 -1.277537,-0.50329 -2.892888,-0.9949 -3.589669,-1.09247 -5.715504,-0.80038 -9.636733,-4.56274 -10.530634,-10.104 l -0.313635,-1.944207 -2.411095,-7.45e-4 C 56.06249,99.508467 51.039329,98.476975 47.826914,96.788777 45.747647,95.696075 43.10586,93.072725 42.26482,91.265501 41.9034,90.488885 41.473195,89.175547 41.308808,88.346972 c -0.261606,-1.318595 -0.45808,-1.640733 -1.575211,-2.582712 -2.3132,-1.950519 -3.61481,-5.78429 -2.945822,-8.676641 0.225492,-0.974908 0.161347,-1.378944 -0.483063,-3.042709 -1.051741,-2.715429 -1.44643,-5.713938 -1.070795,-8.134968 0.371866,-2.396735 1.464337,-5.244112 2.797781,-7.292041 1.361391,-2.090849 5.387634,-6.061349 7.585057,-7.480042 1.604867,-1.036129 1.782476,-1.240767 1.949829,-2.246552 0.51329,-3.084858 2.408165,-5.930437 4.74462,-7.125107 1.24057,-0.634325 3.40614,-1.249876 4.413027,-1.254378 0.570033,-0.0025 0.85006,-0.264873 1.486431,-1.392461 1.985352,-3.517851 6.109341,-5.576111 10.304855,-5.143095 1.434826,0.148087 1.538679,0.115984 2.534119,-0.783336 0.570888,-0.515763 1.471314,-1.12552 2.000946,-1.355017 1.318297,-0.571234 4.312317,-0.547825 6.073767,0.04749 l 1.406631,0.475396 0.930686,-1.087297 c 2.41884,-2.825871 6.490815,-3.579524 10.912028,-2.019629 1.075864,0.379587 1.180889,0.368095 2.432549,-0.266169 3.989037,-2.021398 8.693537,-1.793077 12.513257,0.607299 1.00995,0.63467 1.05116,0.638461 2.51354,0.231279 4.06756,-1.132561 10.93538,-1.58937 14.64939,-0.974396 4.21916,0.698619 9.0652,2.646085 12.33038,4.955182 3.38698,2.395237 7.44497,6.771968 9.31367,10.045229 0.54758,0.95917 0.79513,1.132742 2.00003,1.402388 2.70077,0.604406 5.0215,2.707916 6.58606,5.969623 0.83976,1.750689 1.84705,5.153138 2.03164,6.862587 0.0666,0.616469 0.35747,0.935783 1.40684,1.544234 3.63348,2.10679 6.33143,6.361998 8.08397,12.750054 0.47733,1.739904 0.7216,2.172978 1.76606,3.131152 2.27391,2.086041 2.94108,5.080058 1.9281,8.652597 -0.30947,1.091406 -0.56352,2.162969 -0.56456,2.38125 -0.001,0.218281 0.36869,1.44482 0.82164,2.725642 1.77729,5.025723 0.72478,9.870063 -2.78113,12.800646 -0.97046,0.8112 -1.14879,1.1242 -1.30306,2.28711 -0.27795,2.09533 -1.12995,3.76669 -2.5887,5.07823 -1.61388,1.45102 -3.25126,1.97908 -6.13795,1.97954 l -2.13479,3.3e-4 -0.007,2.18248 c -0.006,1.70486 -0.12994,2.41409 -0.56817,3.24081 -0.61689,1.16379 -2.57576,3.22207 -3.27883,3.44521 -0.2778,0.0882 -0.51108,0.54737 -0.61812,1.21676 -0.7846,4.90661 -6.05591,7.15991 -14.88436,6.36252 l -3.61837,-0.32681 -0.81561,0.78931 c -0.93209,0.90204 -2.17017,1.46876 -3.79217,1.73583 -0.61846,0.10183 -1.12448,0.21908 -1.12448,0.26055 0,0.0415 0.24312,0.62502 0.54027,1.29677 2.0778,4.6972 2.87349,15.35854 2.8907,38.73184 l 0.009,11.70781 h 5.85567 5.85567 l -0.16467,-1.12448 c -1.35932,-9.28226 -0.42851,-17.73253 3.04365,-27.63172 2.00988,-5.7302 2.56247,-6.69971 5.66236,-9.93471 17.79588,-18.57143 27.43559,-43.496578 25.50661,-65.951793 -1.33773,-15.57263 -6.4715,-27.585575 -15.9835,-37.401203 C 148.39009,28.295068 131.29639,20.888526 111.45265,19.090376 107.53414,18.735298 97.901233,18.735741 93.990152,19.09118 69.831727,21.286695 49.144214,31.254886 38.824684,45.672428 c -5.470315,7.642645 -8.10738,16.41131 -8.092776,26.909786 0.0094,6.730551 0.591788,10.760743 2.815735,19.483973 1.359766,5.33356 1.426298,5.74449 1.17985,7.287196 -0.769935,4.819597 -3.31938,9.919167 -11.784947,23.573007 -2.930594,4.72666 -3.417271,6.73151 -2.103427,8.665 0.530925,0.78133 1.347878,1.31879 3.987723,2.62347 1.826003,0.90246 3.481891,1.87196 3.679751,2.15444 0.258481,0.36904 0.317499,1.01753 0.209663,2.3038 -0.08255,0.9846 -0.07345,2.09552 0.02021,2.46869 0.233703,0.93115 1.641171,1.93956 3.299407,2.36393 l 1.383662,0.35411 -1.001671,0.64739 c -1.20373,0.77799 -1.834856,2.29166 -1.56198,3.74622 0.219542,1.17026 2.132047,3.38069 3.740704,4.32343 1.782833,1.04481 2.071537,1.92912 1.847445,5.65879 -0.147678,2.45786 -0.09778,3.44471 0.241055,4.7673 0.801184,3.12733 3.085479,6.59068 4.826859,7.31827 1.276915,0.53353 3.158093,0.44524 6.643635,-0.31181 8.188202,-1.77845 16.835696,-2.45751 20.169986,-1.58388 5.084274,1.33215 9.234557,5.67277 11.124945,11.63515 l 0.63413,2.00007 h 19.495287 19.49529 z"

// Piece 0: Top-Left (path8 - Dark Navy)
const PIECE_0_PATH =
  "m 66.709058,90.131426 c -3.151446,-0.86908 -5.981496,-3.302943 -6.715808,-5.77564 -0.840575,-2.830522 -0.312967,-5.121171 1.712764,-7.436087 1.273598,-1.455411 1.474409,-2.24334 0.700078,-2.746913 C 62.241757,74.065914 56.876344,73.918941 50.482953,73.84618 L 38.858606,73.713889 38.324645,72.25868 c -0.412491,-1.124164 -0.535637,-2.117296 -0.541329,-4.365624 -0.0081,-3.207372 0.40903,-4.622809 2.269743,-7.701506 1.250031,-2.068277 4.613356,-5.376663 7.248273,-7.129876 1.23004,-0.818441 2.321474,-1.625668 2.425409,-1.793838 0.103935,-0.168171 0.273012,-0.842074 0.375726,-1.497564 0.689584,-4.400703 2.563713,-6.256553 6.664222,-6.599225 1.045565,-0.08738 2.045986,-0.250538 2.223157,-0.362582 0.177171,-0.112044 0.686393,-0.966963 1.131605,-1.899819 0.941315,-1.972349 2.156892,-3.084432 4.234807,-3.874255 1.270279,-0.482838 1.816705,-0.533376 4.299813,-0.397679 l 2.844604,0.155451 0.683297,-1.032532 c 0.375813,-0.567892 1.109351,-1.234707 1.630084,-1.481811 1.265203,-0.600378 3.66472,-0.39994 5.743956,0.479808 0.900308,0.380931 1.777303,0.592129 2.046022,0.492723 0.258671,-0.09569 0.859288,-0.817686 1.334705,-1.604439 1.171539,-1.938744 2.331859,-2.529939 4.965436,-2.529939 1.395899,0 2.548976,0.189457 3.888238,0.638857 l 1.903863,0.638857 2.040553,-1.035732 c 1.972855,-1.00137 2.129139,-1.035732 4.710721,-1.035732 2.86415,0 4.09318,0.370989 6.31771,1.907022 l 1.0017,0.691679 3.09934,-0.715166 c 1.70463,-0.39334 4.11137,-0.828445 5.34829,-0.966899 2.50568,-0.28047 2.44378,-0.310062 3.46156,1.654982 0.81972,1.582661 1.30094,3.863907 1.30094,6.167199 0,4.51531 -2.08513,8.503916 -5.34689,10.227957 -1.71745,0.907775 -4.67518,0.865471 -6.29477,-0.09003 -0.65485,-0.386335 -1.47927,-1.011413 -1.83206,-1.389063 -0.6839,-0.732098 -1.80861,-0.908889 -2.34836,-0.369136 -0.23827,0.238269 -0.3175,3.539536 -0.3175,13.229166 V 73.581597 H 91.892129 78.946749 l -0.54837,0.69714 c -0.301604,0.383427 -0.54837,0.80118 -0.54837,0.92834 0,0.12716 0.651122,0.939459 1.446938,1.805108 1.787215,1.944042 2.320616,3.124702 2.33498,5.16837 0.02464,3.506352 -2.794256,6.601114 -7.203378,7.908314 -1.726278,0.5118 -5.933817,0.534996 -7.719491,0.04256 z"

// Piece 1: Top-Right (path9 - Royal Blue)
const PIECE_1_PATH =
  "m 138.07819,89.680315 c -3.2078,-0.613595 -6.52887,-2.934949 -7.70139,-5.383093 -1.14858,-2.398157 -0.76529,-5.553461 0.93442,-7.69227 0.82176,-1.034041 0.98792,-1.914225 0.46087,-2.441272 -0.2376,-0.237599 -3.33375,-0.3175 -12.30312,-0.3175 H 107.48334 V 62.48127 51.116359 l 1.37414,0.636647 c 3.75274,1.738668 7.83233,0.785822 10.92152,-2.550874 4.19443,-4.530489 4.96291,-10.971502 2.12098,-17.777135 -0.18538,-0.443937 -0.0936,-0.469892 1.091,-0.30844 4.15093,0.565756 8.96425,2.382282 12.2815,4.634982 3.33771,2.266596 7.01761,6.295845 9.03609,9.893926 0.87499,1.559724 0.88351,1.566051 2.57205,1.909874 0.93178,0.189731 2.15862,0.652336 2.7263,1.028011 2.04869,1.355758 4.18001,5.78991 4.61259,9.596368 0.26026,2.290142 0.419,2.528192 2.30507,3.456701 2.88624,1.420894 5.0406,4.409725 6.70299,9.299345 0.47001,1.382448 0.85952,2.602838 0.86558,2.711979 0.006,0.109141 -3.07609,0.198437 -6.84924,0.198437 -5.88383,0 -6.91945,0.05918 -7.27604,0.415774 -0.57353,0.573529 -0.52484,0.924905 0.27438,1.980219 1.24821,1.648175 1.67925,2.898221 1.6827,4.880049 0.002,1.392926 -0.15018,2.180053 -0.61556,3.175 -1.88797,4.036356 -7.76711,6.428276 -13.2312,5.383093 z"

// Piece 2: Bottom-Left (path11 - Gold Yellow)
const PIECE_2_PATH =
  "m 109.70197,120.51414 c -0.59877,-0.21236 -1.59468,-0.81922 -2.21313,-1.3486 -1.00594,-0.86104 -1.20226,-0.93312 -1.86263,-0.68386 -0.66513,0.25106 -0.88123,0.16634 -2.18405,-0.85619 -2.31064,-1.81355 -3.43127,-3.70783 -3.42694,-5.79282 0.006,-2.70853 -0.289049,-2.84858 -3.634807,-1.72765 -3.466683,1.16144 -6.051616,1.59774 -9.448178,1.59471 -3.345842,-0.003 -5.89515,-0.45421 -8.335599,-1.4754 -0.919968,-0.38496 -2.625169,-0.87462 -3.789336,-1.08815 -4.005533,-0.73466 -6.173225,-2.17752 -7.587554,-5.05043 -0.716708,-1.45584 -0.869391,-2.10291 -0.96422,-4.08634 -0.143922,-3.010255 -0.35642,-3.206888 -3.216544,-2.976403 -2.34924,0.189316 -7.275498,-0.235347 -9.756757,-0.84107 -2.367515,-0.577956 -5.220876,-1.963935 -6.67089,-3.240288 -1.616243,-1.422674 -2.557158,-3.248773 -2.938787,-5.703507 -0.308915,-1.987017 -0.333079,-2.031819 -1.448449,-2.685469 -2.192179,-1.284702 -3.397424,-3.983376 -3.025084,-6.77349 l 0.154118,-1.154878 9.684574,-0.06937 9.684574,-0.06937 -0.630204,1.27341 c -1.872999,3.784643 -0.994479,8.493866 2.158892,11.572541 1.606949,1.568884 4.351205,3.023689 6.751123,3.578955 1.864401,0.431364 5.538598,0.432148 7.408333,0.0016 3.804616,-0.876137 7.422753,-3.534876 8.897428,-6.538156 1.122384,-2.285813 1.213602,-5.192133 0.236319,-7.529407 C 83.155285,77.914434 82.772684,76.945113 82.693948,76.690451 82.559174,76.254542 83.20328,76.22743 93.69415,76.22743 h 11.14336 v 12.129826 c 0,11.41516 0.0285,12.155624 0.48385,12.567704 0.68275,0.61788 1.03547,0.55257 2.10976,-0.39067 1.48952,-1.307823 2.8509,-1.804896 4.96121,-1.811466 1.48428,-0.0046 2.1471,0.134125 3.2382,0.677845 2.48989,1.240761 4.476,4.192011 5.23715,7.782121 0.45991,2.16925 0.45821,3.13207 -0.009,5.33851 -1.31974,6.22687 -6.22548,9.74156 -11.15628,7.99284 z"

// Piece 3: Bottom-Right + Stem (path10 - Coral Red)
const PIECE_3_PATH =
  "m 121.88326,162.41545 c 0.0888,-10.07732 0.15476,-19.00708 0.14667,-19.84392 -0.0162,-1.67819 -0.81632,-3.79429 -3.15811,-8.35269 -1.39802,-2.7213 -4.33269,-7.33691 -5.91517,-9.30329 l -0.95432,-1.18583 1.81835,-0.30638 c 2.33291,-0.39309 4.14806,-1.39196 5.93629,-3.26673 2.55593,-2.67963 3.85462,-6.12569 3.86204,-10.24793 0.005,-2.76084 -0.36192,-4.48732 -1.46534,-6.89528 -1.15872,-2.52866 -3.32383,-4.811527 -5.6489,-5.956156 -1.5578,-0.766903 -1.96365,-0.851946 -3.98878,-0.835825 -1.63197,0.01299 -2.63809,0.170358 -3.64359,0.569893 l -1.38906,0.551945 V 86.785344 76.22743 h 10.47935 c 9.8787,0 10.4681,0.02654 10.28831,0.463021 -0.83438,1.968721 -0.96363,2.709256 -0.86585,4.960938 0.0907,2.089619 0.21267,2.585476 0.9956,4.048821 2.18425,4.082497 7.04402,6.666803 12.53686,6.666803 7.16307,0 13.1189,-4.59566 13.56353,-10.465953 0.1298,-1.713663 0.0221,-2.373143 -0.82943,-5.078317 l -0.18738,-0.595313 h 5.80406 5.80407 l 1.08684,0.930298 c 1.89407,1.621251 2.2624,4.470762 0.98924,7.653144 l -0.69538,1.738195 0.68259,1.490979 c 2.48183,5.421029 1.77838,9.944548 -1.96465,12.633644 -1.19342,0.85739 -1.25158,0.96 -1.41155,2.49052 -0.51714,4.94775 -3.38647,6.65879 -9.32996,5.56366 -1.36165,-0.2509 -1.75107,-0.24144 -2.10355,0.0511 -0.47192,0.39166 -0.44302,0.70204 0.31037,3.33246 0.39446,1.37726 0.41484,1.78493 0.13577,2.71637 -0.4026,1.34377 -1.59648,2.74375 -3.08248,3.6146 -1.02103,0.59836 -1.13133,0.76826 -1.27248,1.96004 -0.30433,2.56958 -1.56936,3.86 -4.53791,4.629 -1.89124,0.48992 -6.86456,0.54286 -10.24701,0.10907 l -2.33478,-0.29942 -1.12272,1.20254 c -1.29833,1.39065 -2.20934,1.65749 -4.91682,1.44016 -2.96301,-0.23785 -3.34675,0.42825 -1.68795,2.92994 1.58597,2.39186 2.13423,4.20372 2.81823,9.31371 0.75634,5.65033 0.93879,10.66267 0.94142,25.86302 l 0.003,15.14739 h -2.8026 -2.8026 z"

const COMBINED_BRAIN_PATH = `${PIECE_0_PATH} ${PIECE_1_PATH} ${PIECE_2_PATH} ${PIECE_3_PATH}`

// Single Unified Solid Head Silhouette (Concatened SVG subpaths into 1 single object)
const SOLID_HEAD_PATH = `${HEAD_PATH_EXACT} ${PIECE_0_PATH} ${PIECE_1_PATH} ${PIECE_2_PATH} ${PIECE_3_PATH}`

const PIECES_CONFIG = [
  {
    path: PIECE_0_PATH,
    cx: 466,
    cy: 186,
    defaultColor: '#2b2a63',
    // Wrench & Gear Icon (Centered in Navy piece)
    icon: (
      <g transform="translate(450, 170) scale(1.1)" stroke="white" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx={14} cy={12} r={9} />
        <path d="M 14 3 L 14 0 M 14 24 L 14 21 M 3 12 L 0 12 M 25 12 L 28 12" />
        <path d="M 6 4 L 4 2 M 22 20 L 24 22 M 6 20 L 4 22 M 22 4 L 24 2" />
        <path d="M 5 25 L 14 16" strokeWidth={2.5} />
        <path d="M 3 27 L 7 31" strokeWidth={2.5} />
      </g>
    )
  },
  {
    path: PIECE_1_PATH,
    cx: 636,
    cy: 186,
    defaultColor: '#3365cc',
    // Blueprint / Grid Icon (Centered in Blue piece)
    icon: (
      <g transform="translate(620, 170) scale(1.1)" stroke="white" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x={0} y={0} width={30} height={28} rx={2} />
        <line x1={0} y1={14} x2={30} y2={14} />
        <line x1={15} y1={0} x2={15} y2={28} />
        <path d="M 4 4 L 26 24 M 26 4 L 4 24" strokeWidth={1.2} opacity={0.65} />
      </g>
    )
  },
  {
    path: PIECE_2_PATH,
    cx: 466,
    cy: 310,
    defaultColor: '#fdbe03',
    // Atom / Idea Lightbulb Icon (Centered in Yellow piece)
    icon: (
      <g transform="translate(452, 296) scale(1.1)" stroke="white" strokeWidth={1.8} fill="none" strokeLinecap="round">
        <ellipse cx={14} cy={14} rx={14} ry={6} transform="rotate(-30 14 14)" />
        <ellipse cx={14} cy={14} rx={14} ry={6} transform="rotate(30 14 14)" />
        <circle cx={14} cy={14} r={3.5} fill="white" />
      </g>
    )
  },
  {
    path: PIECE_3_PATH,
    cx: 636,
    cy: 310,
    defaultColor: '#fd5237',
    // Sliders / Picture Controls Icon (Centered in Red piece)
    icon: (
      <g transform="translate(620, 296) scale(1.1)" stroke="white" strokeWidth={1.8} fill="none" strokeLinecap="round">
        <rect x={0} y={0} width={28} height={20} rx={2} />
        <line x1={4} y1={5} x2={24} y2={5} />
        <circle cx={10} cy={5} r={2.5} fill="white" />
        <line x1={4} y1={14} x2={24} y2={14} />
        <circle cx={18} cy={14} r={2.5} fill="white" />
      </g>
    )
  }
]

const PIECE_OFFSETS = [
  { dx: 0.3, dy: 0.3 },   // Micro-shift top-left piece closer
  { dx: -0.3, dy: 0.3 },  // Micro-shift top-right piece closer
  { dx: 0.3, dy: -0.3 },  // Micro-shift bottom-left piece closer
  { dx: -0.3, dy: -0.3 }, // Micro-shift bottom-right piece closer
]

export function Brain4Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const headId = 'head'
  const headDef = { x: 300, y: 10, width: 400, height: 500 }
  const headPos = positions[headId]
  const headBbox = {
    x: headPos?.x ?? headDef.x,
    y: headPos?.y ?? headDef.y,
    width: headPos?.width ?? headDef.width,
    height: headPos?.height ?? headDef.height,
  }
  const isHeadSelected = selectedIds.has(headId)

  const branches = data.branches.length > 0 ? data.branches : [
    { title: 'Technical & Engineering', subtitle: 'Maintenance, tools & mechanics' },
    { title: 'Architecture & Design', subtitle: 'Blueprints, planning & structure' },
    { title: 'Research & Innovation', subtitle: 'Ideas, concepts & discovery' },
    { title: 'Media & Operations', subtitle: 'Content management & controls' },
  ]
  const count = Math.min(8, Math.max(2, branches.length))

  const uid = useId().replace(/:/g, '')

  const baseScale = (headBbox.width / 400) * 2.75
  const baseTx = headBbox.x
  const baseTy = headBbox.y

  // Define organic piece configurations for N = 2 to 8
  // Every configuration uses authentic puzzle piece paths (PIECE_0..3_PATH) clipped cleanly at y <= 123 (stem excluded)
  const getOrganicPieces = () => {
    if (count === 2) {
      return [
        { path: `${PIECE_0_PATH} ${PIECE_2_PATH}`, clipId: null, cx: 68, cy: 75 },
        { path: `${PIECE_1_PATH} ${PIECE_3_PATH}`, clipId: `clip-no-stem-${uid}`, cx: 118, cy: 75 },
      ]
    }
    if (count === 3) {
      return [
        { path: PIECE_0_PATH, clipId: null, cx: 65, cy: 54 },
        { path: PIECE_1_PATH, clipId: null, cx: 118, cy: 54 },
        { path: `${PIECE_2_PATH} ${PIECE_3_PATH}`, clipId: `clip-no-stem-${uid}`, cx: 96, cy: 105 },
      ]
    }
    if (count === 4) {
      return [
        { path: PIECE_0_PATH, clipId: null, cx: 65, cy: 54 },
        { path: PIECE_1_PATH, clipId: null, cx: 118, cy: 54 },
        { path: PIECE_2_PATH, clipId: null, cx: 74, cy: 96 },
        { path: PIECE_3_PATH, clipId: `clip-no-stem-${uid}`, cx: 118, cy: 102 },
      ]
    }
    if (count === 5) {
      return [
        { path: PIECE_0_PATH, clipId: `clip-top-${uid}`, cx: 65, cy: 44 },
        { path: PIECE_0_PATH, clipId: `clip-bot-${uid}`, cx: 65, cy: 64 },
        { path: PIECE_1_PATH, clipId: null, cx: 118, cy: 54 },
        { path: PIECE_2_PATH, clipId: null, cx: 74, cy: 96 },
        { path: PIECE_3_PATH, clipId: `clip-no-stem-${uid}`, cx: 118, cy: 102 },
      ]
    }
    if (count === 6) {
      return [
        { path: PIECE_0_PATH, clipId: `clip-top-${uid}`, cx: 65, cy: 44 },
        { path: PIECE_0_PATH, clipId: `clip-bot-${uid}`, cx: 65, cy: 64 },
        { path: PIECE_1_PATH, clipId: `clip-top-${uid}`, cx: 118, cy: 44 },
        { path: PIECE_1_PATH, clipId: `clip-bot-${uid}`, cx: 118, cy: 64 },
        { path: PIECE_2_PATH, clipId: null, cx: 74, cy: 96 },
        { path: PIECE_3_PATH, clipId: `clip-no-stem-${uid}`, cx: 118, cy: 102 },
      ]
    }
    if (count === 7) {
      return [
        { path: PIECE_0_PATH, clipId: `clip-top-${uid}`, cx: 65, cy: 44 },
        { path: PIECE_0_PATH, clipId: `clip-bot-${uid}`, cx: 65, cy: 64 },
        { path: PIECE_1_PATH, clipId: `clip-top-${uid}`, cx: 118, cy: 44 },
        { path: PIECE_1_PATH, clipId: `clip-bot-${uid}`, cx: 118, cy: 64 },
        { path: PIECE_2_PATH, clipId: `clip-b2-top-${uid}`, cx: 74, cy: 84 },
        { path: PIECE_2_PATH, clipId: `clip-b2-bot-${uid}`, cx: 74, cy: 108 },
        { path: PIECE_3_PATH, clipId: `clip-no-stem-${uid}`, cx: 118, cy: 102 },
      ]
    }
    // count === 8
    return [
      { path: PIECE_0_PATH, clipId: `clip-top-${uid}`, cx: 65, cy: 44 },
      { path: PIECE_0_PATH, clipId: `clip-bot-${uid}`, cx: 65, cy: 64 },
      { path: PIECE_1_PATH, clipId: `clip-top-${uid}`, cx: 118, cy: 44 },
      { path: PIECE_1_PATH, clipId: `clip-bot-${uid}`, cx: 118, cy: 64 },
      { path: PIECE_2_PATH, clipId: `clip-b2-top-${uid}`, cx: 74, cy: 84 },
      { path: PIECE_2_PATH, clipId: `clip-b2-bot-${uid}`, cx: 74, cy: 108 },
      { path: PIECE_3_PATH, clipId: `clip-b3-top-${uid}`, cx: 118, cy: 84 },
      { path: PIECE_3_PATH, clipId: `clip-b3-bot-${uid}`, cx: 118, cy: 108 },
    ]
  }

  const organicPieces = getOrganicPieces()

  return (
    <g ref={svgRef}>
      {/* Head Silhouette + Brain vector container from dessin-1.svg */}
      <g transform={getTransform(headId, headBbox)}>
        <g transform={`translate(${baseTx}, ${baseTy}) scale(${baseScale}) translate(${SVG_TRANSFORM_OFFSET_X}, ${SVG_TRANSFORM_OFFSET_Y})`}>
          <defs>
            <clipPath id={`clip-no-stem-${uid}`}>
              <rect x="0" y="0" width="200" height="123" />
            </clipPath>
            <clipPath id={`clip-top-${uid}`}>
              <rect x="0" y="0" width="200" height="54" />
            </clipPath>
            <clipPath id={`clip-bot-${uid}`}>
              <rect x="0" y="54" width="200" height="69" />
            </clipPath>
            <clipPath id={`clip-b2-top-${uid}`}>
              <rect x="0" y="73" width="200" height="22" />
            </clipPath>
            <clipPath id={`clip-b2-bot-${uid}`}>
              <rect x="0" y="95" width="200" height="28" />
            </clipPath>
            <clipPath id={`clip-b3-top-${uid}`}>
              <rect x="0" y="73" width="200" height="22" />
            </clipPath>
            <clipPath id={`clip-b3-bot-${uid}`}>
              <rect x="100" y="95" width="100" height="28" />
            </clipPath>
          </defs>

          {/* 1. SOLID Head Profile Silhouette (filled grey #F0F0F0) */}
          <path
            d={HEAD_PATH_EXACT}
            fill="#F0F0F0"
            fillRule="nonzero"
            stroke={isHeadSelected ? '#4a90d9' : 'none'}
            strokeWidth={isHeadSelected ? 1 : 0}
            style={{ cursor: 'pointer' }}
            onMouseDown={e => startDrag(e, headId, headBbox)}
          />

          {/* Solid White Brain Background & Halo */}
          <g>
            {PIECES_CONFIG.map((piece, i) => (
              <path
                key={`head-fill-${i}`}
                d={piece.path}
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth={0.8}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* 2. Authentic Interlocking Brain Puzzle Pieces (Organic, N=2 to 8, zero stem bleed) */}
          {branches.map((branch, i) => {
            const pid = `piece-${i}`
            const color = tplColors[pid] ?? branch?.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]
            const pInfo = organicPieces[i]!
            const isSel = selectedIds.has(pid)

            return (
              <path
                key={pid}
                d={pInfo.path}
                fill={color}
                clipPath={pInfo.clipId ? `url(#${pInfo.clipId})` : undefined}
                stroke="#ffffff"
                strokeWidth={0.35}
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={isSel ? 0.88 : 1}
                style={{ cursor: 'pointer' }}
                onMouseDown={e => {
                  e.stopPropagation()
                  startDrag(e, pid, headBbox)
                }}
              />
            )
          })}
        </g>
        {isHeadSelected && renderHandles(headBbox, headId)}
      </g>

      {/* Vector / DSL Icons Centered on Organic Pieces */}
      {branches.map((branch, i) => {
        const iconKey = branch?.icon
        const IconFn = getDynamicIcon(iconKey)
        if (!IconFn) return null

        const pInfo = organicPieces[i]!
        // Transform Inkscape (cx, cy) to Canvas Space
        const iconX = baseTx + (pInfo.cx + SVG_TRANSFORM_OFFSET_X) * baseScale
        const iconY = baseTy + (pInfo.cy + SVG_TRANSFORM_OFFSET_Y) * baseScale

        return (
          <g key={`icon-${i}`}>
            <g transform={`translate(${iconX - 16}, ${iconY - 16})`}>
              <IconFn size={32} color="white" />
            </g>
          </g>
        )
      })}

      {/* Callout Cards & Dynamic Connectors (Supports N = 2 to 8 dynamically) */}
      {branches.map((branch, i) => {
        const id = `callout-${i}`
        const isLeft = i % 2 === 0
        const cW = 240
        const cH = 76

        // Compute vertical layout spacing for left and right columns
        const leftCount = Math.ceil(count / 2)
        const rightCount = Math.floor(count / 2)
        const leftIdx = Math.floor(i / 2)
        const rightIdx = Math.floor((i - 1) / 2)

        const startY = 80
        const endY = 460
        const availableH = endY - startY

        let defaultDy = 250 - cH / 2
        if (isLeft) {
          defaultDy = leftCount === 1
            ? startY + availableH / 2 - cH / 2
            : startY + (leftIdx / (leftCount - 1)) * availableH - cH / 2
        } else {
          defaultDy = rightCount === 1
            ? startY + availableH / 2 - cH / 2
            : startY + (rightIdx / (rightCount - 1)) * availableH - cH / 2
        }

        const defaultDx = isLeft ? 50 : 710

        // Target piece center for line connection
        const pIdx = Math.min(3, Math.floor((i / count) * 4))
        const pieceId = `piece-${pIdx}`
        const defaultPiece = PIECES_CONFIG[pIdx]!

        const color = tplColors[id] ?? branch.color ?? tplColors[pieceId] ?? defaultPiece.defaultColor

        const pInfo = organicPieces[i]!
        const piecePos = positions[`piece-${i}`]
        const pcX = piecePos ? piecePos.x + piecePos.width / 2 : baseTx + (pInfo.cx + SVG_TRANSFORM_OFFSET_X) * baseScale
        const pcY = piecePos ? piecePos.y + piecePos.height / 2 : baseTy + (pInfo.cy + SVG_TRANSFORM_OFFSET_Y) * baseScale

        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? defaultDx,
          y: pos?.y ?? defaultDy,
          width: pos?.width ?? cW,
          height: pos?.height ?? cH,
        }
        const isSel = selectedIds.has(id)
        const connStartX = isLeft ? bbox.x + bbox.width : bbox.x
        const connStartY = bbox.y + bbox.height / 2

        return (
          <g key={id}>
            {/* Dynamic Connector Line */}
            <line
              x1={connStartX}
              y1={connStartY}
              x2={pcX}
              y2={pcY}
              stroke={color}
              strokeWidth={2}
              strokeDasharray="4 3"
              opacity={0.85}
            />
            <circle cx={pcX} cy={pcY} r={4} fill={color} />

            {/* Callout Card */}
            <g
              onMouseDown={e => startDrag(e, id, bbox)}
              transform={getTransform(id, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={bbox.x}
                y={bbox.y}
                width={bbox.width}
                height={bbox.height}
                rx={8}
                fill="#ffffff"
                stroke={isSel ? '#4a90d9' : '#e2e8f0'}
                strokeWidth={isSel ? 2.5 : 1}
                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.08))"
              />
              <rect
                x={isLeft ? bbox.x : bbox.x + bbox.width - 6}
                y={bbox.y}
                width={6}
                height={bbox.height}
                rx={3}
                fill={color}
              />
              <text
                x={isLeft ? bbox.x + 16 : bbox.x + 12}
                y={bbox.y + 26}
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={700}
                fill="#1a1a2e"
              >
                {branch.title}
              </text>
              <text
                x={isLeft ? bbox.x + 16 : bbox.x + 12}
                y={bbox.y + 48}
                fontFamily="Arial, sans-serif"
                fontSize={11}
                fill="#666666"
              >
                {branch.subtitle ?? `Description ${i + 1}`}
              </text>
              {isSel && renderHandles(bbox, id)}
            </g>
          </g>
        )
      })}
    </g>
  )
}