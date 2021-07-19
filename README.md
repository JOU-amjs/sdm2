# [string-discontinuous-match](https://github.com/JOU-amjs/string-discontinuous-match)
[![npm](https://img.shields.io/npm/v/string-discontinuous-match)](https://www.npmjs.com/package/string-discontinuous-match)
![size](https://img.shields.io/bundlephobia/min/string-discontinuous-match)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
[![Coverage Status](https://coveralls.io/repos/github/JOU-amjs/string-discontinuous-match/badge.svg)](https://coveralls.io/github/JOU-amjs/string-discontinuous-match)
![jslib](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)

### A high performance string discontinuous search function.

[中文文档](./README-ZH.md)

### **Features**
- discontinuous match
- High performance
- TypeScript support

### Install with `npm` or `yarn`
```bash
# via npm
npm install string-discontinuous-match

# via yarn
yarn add string-discontinuous-match
```

Import in `Node.js`, `esModule`, `Browser`:
```javascript
// commonjs(Node.js)
var { discontinuousMatch } = require('string-discontinuous-match').default;

// esModule
import { discontinuousMatch } from 'string-discontinuous-match';
```
Browser
```html
<script src="https://unpkg.com/string-discontinuous-match"></script>
```

### **Usage**
---
Perhaps you will use it in paths seraching, tree searching, select options searching, or some other local data search by discontinuous searching string, it can satisfy you. See the example below.
```javascript
const matchedStrings = [
  'src/views/home.jsx',
  'src/views/about.jsx',
  'src/views/ad.jsx',
]
let ret = discontinuousMatch(matchedStrings, 'srchom.X');
// The ret is
/* [{
  value: 'src/views/home.jsx',
  index: 0,
  position: [[0, 2], [10, 12], 14, 17],
  lastIndex: 17
}]
*/

// The third parameter is ignore case or not, the default is true
ret = discontinuousMatch(matchedStrings, 'srchom.X', false);
// The ret is []
```
Sometimes your searching string is included in an object, such as `{name: '...'}`. In this case, you need to specify the fourth parameter as `'name'`.
```javascript
const matchedStrings = [
  { name: 'src/views/home.jsx' },
  { name 'src/views/about.jsx' },
  { name 'src/views/ad.jsx' },
];
let ret = discontinuousMatch(matchedStrings, 'srchom.X', 'name');
// The result returned is the same as above.
/* [{
  value: 'src/views/home.jsx',
  index: 0,
  position: [[0, 2], [10, 12], 14, 17],
  lastIndex: 17
}]
```
It should be noted that if the `'name'` field of an object in the array is not a string, the function will ignore this search. In fact, the fourth parameter of the function can also specify deeper nesting. For example, for `{data: {name:'... '}`, we can use `'data.name'` to specify the search string.

**Highlight your key characters**

When we search for key characters, we always want to highlight the matching key characters, so we also provide an auxiliary function to help you complete it.
```javascript
import { discontinuousMatch, replaceMatchedString } from 'string-discontinuous-match';
const matchedStrings = [
  'src/views/home.jsx',
  'src/views/about.jsx',
  'src/views/ad.jsx',
];
let ret = discontinuousMatch(matchedStrings, 'srchom.X');
let machedStrs = ret.map(machedItem => {
  // Pass the matching result item into this function, which will call the callback function for multiple matching characters in turn
  return replaceMatchedString(
    machedItem,
    matchedStr => `<span class="highlight">${matchedStr}</span>`,
    false     // This parameter indicates whether to return to array, default is false
  );
});
// matchedStrs is
/*
["<span class=\"highlight\">src</span>/views/<span class=\"highlight\">hom</span>e<span class=\"highlight\">.</span>js<span class=\"highlight\">x</span>"]
*/
```

When the third parameter of function `replacematchedstring` is true, the above matches will return an array, so that you can use `react. createElement` to wrap the highlighted part in react.
```javascript
[
  React.createElement('span', { class: 'highlight' }, 'src'),
  '/views/',
  React.createElement('span', { class: 'highlight' }, 'hom'),
  'e',
  React.createElement('span', { class: 'highlight' }, '.'),
  'js',
  React.createElement('span', { class: 'highlight' }, 'x'),
]
```

### **Performance**
---
You don't need to worry about the performance, we attach great importance to it. For each searched string, it will only be compared circularly once, so high performance is guaranteed. Here are the performance test results for random strings.

The key string is a 50 random string.

|  Numbers of strings  |  Per string length  |  Ignore case | performance |
|  ----  | ----  | ----  | ----  |
| 1000  | 5000 | ✅ | 19ms |
| 1000  | 5000 | ❌ | 16ms |
| 5000  | 5000 | ✅ | 42ms |
| 5000  | 5000 | ❌ | 39ms |
| 10000  | 5000 | ✅ | 101ms |
| 10000  | 5000 | ❌ | 84ms |


### LICENSE MIT
Copyright (c) 2021 JOU. Copyright of the Typescript bindings are respective of each contributor listed in the definition file.

### **Submit a issue**
- [click here](https://github.com/JOU-amjs/string-discontinuous-match/issues)