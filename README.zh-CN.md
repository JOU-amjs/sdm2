# [sdm2](https://github.com/JOU-amjs/msd)

[![npm](https://img.shields.io/npm/v/sdm2)](https://www.npmjs.com/package/sdm2)
![size](https://img.shields.io/bundlephobia/min/sdm2)
[![Coverage Status](https://coveralls.io/repos/github/JOU-amjs/sdm2/badge.svg)](https://coveralls.io/github/JOU-amjs/sdm2)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

### 一个高性能的字符串非连续搜索函数库

[English Document](./README.md)

## **特性**

- 高性能
- 多次连续调用性能优化
- 支持 TypeScript

## 通过`npm`或`yarn`安装

```bash
# via npm
npm install sdm2

# via yarn
yarn add sdm2
```

在`Node.js`, `esModule`, `Browser`引入

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

## **用法**

也许你会用它在路径搜索，树型控件选项搜索，checkbox 项搜索，或其他一些本地数据的非连续字符串搜索，它都可以满足你，请参见下面的示例。

### 匹配字符串

```javascript
const ret = match('src/views/home.jsx', 'shojsx');
/* ret = {
  origin: 'src/views/home.jsx',
  str: 'src/views/home.jsx',
  position: [0, [10, 11], [15, 17]],
  indexes: [0, 10, 11, 15, 16, 17]
}
*/

// 未匹配则返回null
const ret = match('src/views/home.jsx', 'bbha');
// ret = null
```

### 过滤数组

```javascript
const matchedStrings = [
  'src/views/home.jsx',
  'src/views/about.jsx',
  'src/views/ad.jsx',
];
const ret = matchedStrings.filter(strItem => match(strItem, 'srchom.X', { ignoreCase: true });
/* ret = ['src/views/home.jsx'] */
```

### 匹配对象内的字符串

有时候，你的搜索字符串被包含在对象内例如`{ name: '...' }`，此时你需要将第四个参数指定为`name`即可。

```javascript
const ret = match({ name: 'src/views/home.jsx' }, 'shojsx', {
	matchStr: obj => obj.name
});
/* ret = {
  origin: { name: 'src/views/home.jsx' },
  str: 'src/views/home.jsx',
  position: [0, [10, 11], [15, 17]],
  indexes: [0, 10, 11, 15, 16, 17]
}
*/
```

### 高亮已匹配字符

我们在搜索关键字符时，总是希望高亮匹配到的关键字符，因此我们还提供了一个辅助函数帮助你完成它。

```javascript
import { match } from 'sdm2';
const ret = match('src/views/home.jsx', 'shojsx', {
	onMatched: (matchedStr, originStr) => `<span class="highlight">${matchedStr}</span>`
});
/* ret = {
  origin: 'src/views/home.jsx',
  str: '<span class="highlight">s</span>rc/views/<span class="highlight">ho</span>me.<span class="highlight">jsx</span>',
  position: [0, [10, 11], [15, 17]],
  indexes: [0, 10, 11, 15, 16, 17]
}
*/
```

### 批量过滤并高亮已匹配字符

如果对于字符串数组，我们可以使用`filterMap`同时进行过滤和转换字符串。

```javascript
import { filterMap } from 'sdm2';

const matchedStrings = ['src/views/home.jsx', 'src/views/about.jsx', 'src/views/ad.jsx'];
const ret = filterMap(matchedStrings, 'shojsx', (matchedInfo, index) => matchedInfo.str, {
	onMatched: (matchedStr, originStr) => `<span class="highlight">${matchedStr}</span>`
});
/* ret = ['<span class="highlight">s</span>rc/views/<span class="highlight">ho</span>me.<span class="highlight">jsx</span>']
 */
```

### **性能**

---

你不需担心性能问题，我们对此很重视，对于每一个被搜索字符串，它都只会被循环对比一次，因此保证了高性能。下面是随机字符串的性能测试结果。

关键字符串为 50 位随机字符串
| 字符串数量 | 单字符串长度 | 忽大小写 | 性能 |
| ---- | ---- | ---- | ---- |
| 1000 | 5000 | ✅ | 19ms |
| 1000 | 5000 | ❌ | 16ms |
| 5000 | 5000 | ✅ | 42ms |
| 5000 | 5000 | ❌ | 39ms |
| 10000 | 5000 | ✅ | 101ms |
| 10000 | 5000 | ❌ | 84ms |

### LICENSE MIT

Copyright (c) 2021 JOU. Copyright of the Typescript bindings are respective of each contributor listed in the definition file.

### **提交一个问题**

- [点此提交](https://github.com/JOU-amjs/sdm2/issues)
