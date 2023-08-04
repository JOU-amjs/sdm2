<p align="center">
   <img width="200px" src="https://github.com/JOU-amjs/sdm2/assets/29848971/0eb41c8d-7021-4128-bba8-13ad08e6c696" />
</p>

<p align="center"><b>A high-performance string non-continuous search function library</b></p>

<p align="center">English | <a href="./README.zh-CN.md">📑中文</a></p>

[![npm](https://img.shields.io/npm/v/sdm2)](https://www.npmjs.com/package/sdm2)
[![minzipped size](https://badgen.net/bundlephobia/minzip/sdm2)](https://bundlephobia.com/package/sdm2)
[![Coverage Status](https://coveralls.io/repos/github/JOU-amjs/sdm2/badge.svg)](https://coveralls.io/github/JOU-amjs/sdm2)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

- Simple to use
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

Maybe you will use it in path search, tree control option search, checkbox item search, or some other non-contiguous string search of local data, it can satisfy you, please see the example below.

### match string

```javascript
const ret = match('src/views/home.jsx', 'shojsx');
/* ret = {
   origin: 'src/views/home.jsx',
   str: 'src/views/home.jsx',
   position: [0, [10, 11], [15, 17]],
   indexes: [0, 10, 11, 15, 16, 17]
}
*/

// return null if not matched
const ret = match('src/views/home.jsx', 'bbha');
// ret = null
```

### filter array

```javascript
const matchedStrings = [
   'src/views/home.jsx',
   'src/views/about.jsx',
   'src/views/ad.jsx',
];
const ret = matchedStrings. filter(strItem => match(strItem, 'srchom. X', { ignoreCase: true });
/* ret = ['src/views/home.jsx'] */
```

### Match the string inside the object

Sometimes, your search string is contained in an object such as `{ name: '...' }`, then you need to specify the fourth parameter as `name`.

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

### Highlight matched characters

When we search for key characters, we always want to highlight the matching key characters, so we also provide a helper function to help you do it.

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

### Batch filter and highlight matched characters

If it is an array of strings, we can use `filterMap` to filter and convert strings at the same time.

```javascript
import { filterMap } from 'sdm2';

const matchedStrings = ['src/views/home.jsx', 'src/views/about.jsx', 'src/views/ad.jsx'];
const ret = filterMap(matchedStrings, 'shojsx', (matchedInfo, index) => matchedInfo.str, {
	onMatched: (matchedStr, originStr) => `<span class="highlight">${matchedStr}</span>`
});
/* ret = ['<span class="highlight">s</span>rc/views/<span class="highlight">ho</span>me.<span class="highlight">jsx</span >']
 */
```

## Performance

---

You don't need to worry about performance issues, we take this very seriously, for each searched string, it will only be compared once, thus ensuring high performance. Below are performance test results for random strings.

The key string is a 50-digit random string
| Number of strings | Single string length | Ignoring case | Performance |
| ---- | ---- | ---- | ---- |
| 1000 | 5000 | ✅ | 19ms |
| 1000 | 5000 | ❌ | 16ms |
| 5000 | 5000 | ✅ | 42ms |
| 5000 | 5000 | ❌ | 39ms |
| 10000 | 5000 | ✅ | 101ms |
| 10000 | 5000 | ❌ | 84ms |

## welcome to submit questions

If you encounter difficulties when using sdm2, whether it is a bug or a new function, you can [click here to submit](https://github.com/JOU-amjs/sdm2/issues)

## LICENSE

[MIT](https://en.wikipedia.org/wiki/MIT_License)
