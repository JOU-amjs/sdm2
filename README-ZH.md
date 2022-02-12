# [string-discontinuous-match](https://github.com/JOU-amjs/string-discontinuous-match)
[![npm](https://img.shields.io/npm/v/string-discontinuous-match)](https://www.npmjs.com/package/string-discontinuous-match)
![size](https://img.shields.io/bundlephobia/min/string-discontinuous-match)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
[![Coverage Status](https://coveralls.io/repos/github/JOU-amjs/string-discontinuous-match/badge.svg)](https://coveralls.io/github/JOU-amjs/string-discontinuous-match)
![jslib](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)

### 一个高性能的字符串非连续搜索函数

[English Document](./README.md)

### **特性**
- 高性能
- 多次连续调用性能优化
- 支持TypeScript

### 通过`npm`或`yarn`安装
```bash
# via npm
npm install string-discontinuous-match

# via yarn
yarn add string-discontinuous-match
```

在`Node.js`, `esModule`, `Browser`引入
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

### **用法**
---
也许你会用它在路径搜索，树型控件选项搜索，checkbox项搜索，或其他一些本地数据的非连续字符串搜索，它都可以满足你，请参见下面的示例。
```javascript
const matchedStrings = [
  'src/views/home.jsx',
  'src/views/about.jsx',
  'src/views/ad.jsx',
];
let ret = discontinuousMatch(matchedStrings, 'srchom.X');
// 返回的结果为
/* [{
  value: 'src/views/home.jsx',
  index: 0,
  position: [[0, 2], [10, 12], 14, 17],
  lastIndex: 17
}]
*/

// 第三个参数是是否忽略大小写，默认为true
ret = discontinuousMatch(matchedStrings, 'srchom.X', false);
// 返回结果为[]
```
有时候，你的搜索字符串被包含在对象内例如`{ name: '...' }`，此时你需要将第四个参数指定为`name`即可。
```javascript
const matchedStrings = [
  { name: 'src/views/home.jsx' },
  { name 'src/views/about.jsx' },
  { name 'src/views/ad.jsx' },
];
let ret = discontinuousMatch(matchedStrings, 'srchom.X', 'name');
// 返回的结果与上面的相同。
/* [{
  value: 'src/views/home.jsx',
  index: 0,
  position: [[0, 2], [10, 12], 14, 17],
  lastIndex: 17
}]
```
需要注意的是，如果数组中某个对象的`name`字段不是字符串，函数会忽略此次查找。其实，函数的第四个参数还可以指定更深层的嵌套，如针对`{ data: { name: '...' } }`，我们可以用`data.name`来指定搜索字符串

**高亮你的关键字符**

我们在搜索关键字符时，总是希望高亮匹配到的关键字符，因此我们还提供了一个辅助函数帮助你完成它。
```javascript
import { discontinuousMatch, replaceMatchedString } from 'string-discontinuous-match';
const matchedStrings = [
  'src/views/home.jsx',
  'src/views/about.jsx',
  'src/views/ad.jsx',
];
let ret = discontinuousMatch(matchedStrings, 'srchom.X');
let machedStrs = ret.map(machedItem => {
  // 将匹配结果项传入这个函数中，它将对多个匹配字符依次调用回调函数
  return replaceMatchedString(
    machedItem,
    matchedStr => `<span class="highlight">${matchedStr}</span>`,
    false     // 此参数表示是否返回数组，默认为false
  );
});
// matchedStrs为
/*
["<span class=\"highlight\">src</span>/views/<span class=\"highlight\">hom</span>e<span class=\"highlight\">.</span>js<span class=\"highlight\">x</span>"]
*/
```
当`replaceMatchedString`第三个参数为true时，上面的匹配项将返回一个数组，这样你可以在react中用`React.createElement`包裹高亮部分。
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

### **性能**
---
你不需担心性能问题，我们对此很重视，对于每一个被搜索字符串，它都只会被循环对比一次，因此保证了高性能。下面是随机字符串的性能测试结果。

关键字符串为50位随机字符串
|  字符串数量  | 单字符串长度  | 忽大小写 | 性能 |
|  ----  | ----  | ----  | ----  |
| 1000  | 5000 | ✅ | 19ms |
| 1000  | 5000 | ❌ | 16ms |
| 5000  | 5000 | ✅ | 42ms |
| 5000  | 5000 | ❌ | 39ms |
| 10000  | 5000 | ✅ | 101ms |
| 10000  | 5000 | ❌ | 84ms |

### LICENSE MIT
Copyright (c) 2021 JOU. Copyright of the Typescript bindings are respective of each contributor listed in the definition file.

### **提交一个问题**
- [点此提交](https://github.com/JOU-amjs/string-discontinuous-match/issues)