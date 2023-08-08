<p align="center">
  <img width="200px" src="https://github.com/JOU-amjs/sdm2/assets/29848971/0eb41c8d-7021-4128-bba8-13ad08e6c696" />
</p>

<p align="center"><b>一个高性能的字符串非连续搜索函数库</b></p>

<p align="center">English | <a href="./README.zh-CN.md">📑中文</a></p>

[![npm](https://img.shields.io/npm/v/sdm2)](https://www.npmjs.com/package/sdm2)
[![minzipped size](https://badgen.net/bundlephobia/minzip/sdm2)](https://bundlephobia.com/package/sdm2)
[![Coverage Status](https://coveralls.io/repos/github/JOU-amjs/sdm2/badge.svg)](https://coveralls.io/github/JOU-amjs/sdm2)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

## 示例

#### 下拉菜单选择

![1](https://github.com/JOU-amjs/sdm2/assets/29848971/f7f5fd21-d49b-45b6-94d4-e94c25326f0c)

#### 树形菜单选择

![2](https://github.com/JOU-amjs/sdm2/assets/29848971/7f46ad80-f18e-4d61-86f5-85fb908d0dd8)

#### 侧边菜单栏

![3](https://github.com/JOU-amjs/sdm2/assets/29848971/85e3a46a-130c-4f9a-89c9-5a62e0b069f8)

完整示例 [请点此查看](https://codesandbox.io/p/sandbox/github/JOU-amjs/sdm2-example/tree/main?file=%2Fsrc%2FApp.vue)

## 🚀 特性

- 易于使用
- 高性能
- 小于 1kb
- 支持 TypeScript

## 安装

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

## 用法

也许你会用它在路径搜索，树型控件选项搜索，checkbox 项搜索，或其他一些本地数据的非连续字符串搜索，它都可以满足你，请参见下面的示例。

### 匹配字符串

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

// 未匹配则返回null
const ret = match('src/views/home.jsx', 'ZZZZ');
// ret => null
```

**返回字段解释**
| 字段名 | 描述 |
| ---- | ---- |
| origin | 被查找字符串，match 函数的第一个参数原始值 |
| str | 匹配关键字后通过`onMatched`转换后的字符串，如果未指定`onMatched`，它的值和 origin 相同 |
| strArr | 关键字已匹配字符串与未匹配字符串的切分数组，如果指定了`onMatched`，匹配部分为`onMatched`转换后的值 |
| position | 匹配的关键字所在被查找字符串的位置，如果连续匹配到多个关键字，会通过`[startIndex, endIndex]`表示 |
| indexes | 匹配的关键字所在被查找字符串的位置，与`position`不同的是，即使连续匹配到多个关键字也会一一列出 |

### 匹配嵌套的字符串

如果被查找的字符串嵌套在对象内，可以使用`matchStr`返回被查找的字符串。

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

### 数组过滤

利用未匹配值为 `null` 过滤数组。

```javascript
const matchedStrings = [
  'src/views/home.jsx',
  'src/views/about.jsx',
  'src/views/ad.jsx',
];
const ret = matchedStrings.filter(strItem => match(strItem, 'srchom.X', { ignoreCase: true });
/* ret => ['src/views/home.jsx'] */
```

### 高亮已匹配字符

使用`onMatched`函数转换匹配字符串，可以高亮匹配到的关键字。

`onMatched`会在每次匹配到一部分关键字时触发，它的参数分别为匹配的关键字和查找的原始值。

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

### 过滤数组并高亮已匹配字符

如果对于字符串数组，我们可以使用`filterMap`同时进行过滤和转换字符串。`filterMap`将会先过滤出符合查找关键字的项，再调用`onMap`转换已匹配项

```javascript
import { filterMap } from 'sdm2';

const matchedStrings = ['src/views/home.jsx', 'src/views/about.jsx', 'src/views/ad.jsx'];
const ret = filterMap(matchedStrings, 'shojsx', {
	onMatched: (matchedStr, originStr) => `<span class="highlight">${matchedStr}</span>`,
	onMap: (matchedInfo, index) => matchedInfo.str
});
/* ret => ['<span class="highlight">s</span>rc/views/<span class="highlight">ho</span>me.<span class="highlight">jsx</span>']
 */
```

**jsx 语法高亮**

可能你不喜欢使用`dangerouslySetInnerHTML`(react)或`v-html`(vue)来高亮关键字，在 jsx 中，你还可以在`onMatched`中返回虚拟 dom，并在`onMap`中返回已经切分好的数组，这更符合 UI 框架的使用习惯：

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

## 性能

---

你不需担心性能问题，每一个被搜索字符串都只会被对比一次，因此保证了高性能。下面是随机字符串的性能测试结果。

关键字符串为 50 位随机字符串
| 字符串数量 | 单字符串长度 | 忽大小写 | 性能 |
| ---- | ---- | ---- | ---- |
| 1000 | 5000 | ✅ | 19ms |
| 1000 | 5000 | ❌ | 16ms |
| 5000 | 5000 | ✅ | 42ms |
| 5000 | 5000 | ❌ | 39ms |
| 10000 | 5000 | ✅ | 101ms |
| 10000 | 5000 | ❌ | 84ms |

## 欢迎提交问题

如果您在使用 sdm2 时遇到困难，无论是 bug，还是新功能，都可以 [点此提交](https://github.com/JOU-amjs/sdm2/issues)

## LICENSE

[MIT](https://en.wikipedia.org/wiki/MIT_License)
