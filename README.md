<p align="center">
   <img width="200px" src="https://github.com/JOU-amjs/sdm2/assets/29848971/0eb41c8d-7021-4128-bba8-13ad08e6c696" />
</p>

<p align="center"><b>A high-performance string discontinuous search function library</b></p>

<p align="center">English | <a href="./README.zh-CN.md">📑中文</a></p>

[![npm](https://img.shields.io/npm/v/sdm2)](https://www.npmjs.com/package/sdm2)
[![minzipped size](https://badgen.net/bundlephobia/minzip/sdm2)](https://bundlephobia.com/package/sdm2)
[![Coverage Status](https://coveralls.io/repos/github/JOU-amjs/sdm2/badge.svg)](https://coveralls.io/github/JOU-amjs/sdm2)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

## Example

#### Dropdown menu select

![1](https://github.com/JOU-amjs/sdm2/assets/29848971/f7f5fd21-d49b-45b6-94d4-e94c25326f0c)

#### Tree select

![2](https://github.com/JOU-amjs/sdm2/assets/29848971/7f46ad80-f18e-4d61-86f5-85fb908d0dd8)

#### Side menubar

![3](https://github.com/JOU-amjs/sdm2/assets/29848971/85e3a46a-130c-4f9a-89c9-5a62e0b069f8)

Complete example [click here to view](https://codesandbox.io/p/sandbox/github/JOU-amjs/sdm2-example/tree/main?file=%2Fsrc%2FApp.vue)

## 🚀 Features

- easy to use
- high performance
- less than 1kb
- Support TypeScript

## Install

```bash
# via npm
npm install sdm2

#via yarn
yarn add sdm2
```

Introduced in `Node.js`, `esModule`, `Browser`

```javascript
// commonjs(Node.js)
var { match, filterMap } = require('sdm2').default;

// esModule
import { match, filterMap } from 'sdm2';
```

Browser

```html
<script src="https://unpkg.com/sdm2"></script>
```

## Usage

If you use it in path search, tree control option search, checkbox item search, or other discontiguous string match of local data, it can satisfy you, please see the example below.

### match string

```javascript
const ret = match('src/views/home.jsx', 'shojsx');
/* ret => {
   origin: 'src/views/home.jsx',
   str: 'src/views/home.jsx',
   strArr: ['src/views/home.jsx'],
   position: [0, [10, 11], [15, 17]],
   indexes: [0, 10, 11, 15, 16, 17]
}
*/

// return null if not matched
const ret = match('src/views/home.jsx', 'ZZZZ');
// ret => null
```

**Return Field Explanation**
| field name | description |
| ---- | ---- |
| origin | The string to be searched, the original value of the first parameter of `match` function |
| str | The string transformed by `onMatched` after matching keywords, if `onMatched` is not specified, its value is the same as origin |
| strArr | An array of matched strings and unmatched strings, if `onMatched` is specified, the matched part is the transformed value of `onMatched` |
| position | The position of matched keyword. If multiple keywords are matched consecutively, it will be represented by `[startIndex, endIndex]` |
| indexes | The position of the matched keyword in the searched string, different from `position`, even if multiple keywords are matched consecutively, they will be listed one by one |

### Match nested string

If the string being match is nested within an object, `matchStr` can be used to return the string being matched for.

```javascript
const ret = match({ name: 'src/views/home.jsx' }, 'shojsx', {
	matchStr: obj => obj.name
});
/* ret => {
   origin: { name: 'src/views/home.jsx' },
   str: 'src/views/home.jsx',
   strArr: ['src/views/home.jsx'],
   position: [0, [10, 11], [15, 17]],
   indexes: [0, 10, 11, 15, 16, 17]
}
*/
```

### Filter array

Filter an array with unmatched values of `null`.

```javascript
const matchedStrings = [
   'src/views/home.jsx',
   'src/views/about.jsx',
   'src/views/ad.jsx',
];
const ret = matchedStrings. filter(strItem => match(strItem, 'srchom. X', { ignoreCase: true });
/* ret => ['src/views/home.jsx'] */
```

### Highlight matched characters

Use the `onMatched` function to transform the matching string, and the matched keywords can be highlighted.

`onMatched` will be emit every time when a part of keywords are matched, and its parameters are the matched keywords and the original value of this match.

```javascript
import { match } from 'sdm2';
const ret = match('src/views/home.jsx', 'shojsx', {
	onMatched: (matchedStr, origin) => `<span class="highlight">${matchedStr}</span>`
});
/* ret => {
   origin: 'src/views/home.jsx',
   str: '<span class="highlight">s</span>rc/views/<span class="highlight">ho</span>me.<span class="highlight">jsx</span>',
   strArr: [
     '<span class="highlight">s</span>',
     'rc/views/',
     '<span class="highlight">ho</span>',
     'me.',
     '<span class="highlight">jsx</span>'
   ],
   position: [0, [10, 11], [15, 17]],
   indexes: [0, 10, 11, 15, 16, 17]
}
*/
```

### Filter array and highlight matched characters

If you want to filter an string array, you can use `filterMap` to filter and transform strings at the same time. `filterMap` will first filter the items that matched keywords, and then call `onMap` by `array.map` to transform the matched items.

```javascript
import { filterMap } from 'sdm2';

const matchedStrings = ['src/views/home.jsx', 'src/views/about.jsx', 'src/views/ad.jsx'];
const ret = filterMap(matchedStrings, 'shojsx', {
	onMatched: (matchedStr, originStr) => `<span class="highlight">${matchedStr}</span>`,
	onMap: (matchedInfo, index) => matchedInfo.str
});
/* ret => ['<span class="highlight">s</span>rc/views/<span class="highlight">ho</span>me.<span class="highlight">jsx</ span>']
 */
```

**jsx syntax highlighting**

Maybe you don't like to use `dangerouslySetInnerHTML`(react) or `v-html`(vue) to highlight keywords, in jsx, you can also return the virtual dom in `onMatched`, and return the splited array in `onMap`, which is more in line with the habits of UI framework.

```jsx
const ret = filterMap(matchedStrings, 'shojsx', {
onMatched: (matchedStr, originStr) => <span class="highlight">${matchedStr}</span>,
onMap: (matchedInfo, index) => matchedInfo.strArr
});

/* ret => [
   VNode {
     class: 'highlight',
     children: 's'
   },
   'rc/views/',
   VNode {
     class: 'highlight',
     children: 'ho'
   },
   'me.',
   VNode {
     class: 'highlight',
     children: 'jsx'
   }
]
```

## Performance

---

You don't worry about the performance, each searched string will be only compared once, thus ensuring high performance. Below are performance test results for random strings.

The key string is a 50-digit random string
| Number of strings | Single string length | Ignoring case | Performance |
| ---- | ---- | ---- | ---- |
| 1000 | 5000 | ✅ | 19ms |
| 1000 | 5000 | ❌ | 16ms |
| 5000 | 5000 | ✅ | 42ms |
| 5000 | 5000 | ❌ | 39ms |
| 10000 | 5000 | ✅ | 101ms |
| 10000 | 5000 | ❌ | 84ms |

## Welcome to submit issues

If you encounter difficulties when using sdm2, whether it is a bug or a new function, you can [click here to submit](https://github.com/JOU-amjs/sdm2/issues)

## LICENSE

[MIT](https://en.wikipedia.org/wiki/MIT_License)
