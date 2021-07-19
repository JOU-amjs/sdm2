# [string-discontinuous-match](https://github.com/JOU-amjs/string-discontinuous-match)
[![npm](https://img.shields.io/npm/v/string-discontinuous-match)](https://www.npmjs.com/package/string-discontinuous-match)
![size](https://img.shields.io/bundlephobia/min/string-discontinuous-match)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
[![Coverage Status](https://coveralls.io/repos/github/JOU-amjs/string-discontinuous-match/badge.svg)](https://coveralls.io/github/JOU-amjs/string-discontinuous-match)
![jslib](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)

### 一个高性能的字符串非连续搜索函数

[English Document](./README.md)

### **Features**
- 非连续搜索
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
<script src="https://unpkg.com/string-discontinuous-match/dist/string-discontinuous-match.umd.js"></script>
```

### **用法**
---
也许你会用它在路径搜索，树型控件选项搜索，checkbox项搜索，或其他一些本地数据的非连续字符串搜索，它都可以满足你，请参见下面的示例。
```javascript
const matchedStrings = [
  'src/views/home.jsx',
  'src/views/about.jsx',
  'src/views/ad.jsx',
]
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
在大多数情况下，我们总是会在输入框的“input”事件中搜索一些数据，它将会频繁地执行搜索，因此我们优化了频繁连续调用的性能。您可以将上一次的搜索结果在下一次函数调用时传进去，函数会判断搜索关键字的结尾是否相比上一次只是增加了几个字符，如果是的话，它会从上一次搜索的结束的位置开始继续搜索。
```javascript
let ret = matchedStrings;   // matchedStrings是初始化的被搜索字符串数组
function eventInputHandler(event) {
  ret = discontinuousMatch(ret, event.target.value);
  // 将结果做一些显示处理
}
```

### **性能**
---
你不需担心性能问题，我们对此很重视。下面是随机字符串的性能测试结果。

|  字符串数量  | 单字符串长度  | 忽略大小写  |  是否连续调用 | 性能 |
|  ----  | ----  | ----  | ----  | ----  |
| 1000  | 5000 | ✅ | ❌ | 19ms |
| 1000  | 5000 | ✅ | ✅ | 4ms |
| 1000  | 5000 | ❌ | ❌ | 16ms |
| 1000  | 5000 | ❌ | ✅ | 3ms |
| 5000  | 5000 | ✅ | ❌ | 42ms |
| 5000  | 5000 | ✅ | ✅ | 14ms |
| 5000  | 5000 | ❌ | ❌ | 39ms |
| 5000  | 5000 | ❌ | ✅ | 10ms |
| 10000  | 5000 | ✅ | ❌ | 101ms |
| 10000  | 5000 | ✅ | ✅ | 29ms |
| 10000  | 5000 | ❌ | ❌ | 84ms |
| 10000  | 5000 | ❌ | ✅ | 19ms |

您可以看到，它在大数组搜索中的性能非常好，在多次连续调用时，性能提高了约4倍。

### LICENSE MIT
Copyright (c) 2021 JOU. Copyright of the Typescript bindings are respective of each contributor listed in the definition file.

### **提交一个问题**
- [点此提交](https://github.com/JOU-amjs/string-discontinuous-match/issues)