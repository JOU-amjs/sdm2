# [sdm](https://github.com/JOU-amjs/msd)

[![npm](https://img.shields.io/npm/v/sdm)](https://www.npmjs.com/package/sdm)
![size](https://img.shields.io/bundlephobia/min/sdm)
[![Coverage Status](https://coveralls.io/repos/github/JOU-amjs/sdm/badge.svg)](https://coveralls.io/github/JOU-amjs/sdm)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

### A high-performance string non-continuous search function library

[English Document](./README.md)

## **Features**

- high performance
- Multiple consecutive call performance optimization
- Support TypeScript

## Install via `npm` or `yarn`

```bash
# via npm
npm install sdm

#via yarn
yarn add sdm
```

Introduced in `Node.js`, `esModule`, `Browser`

```javascript
// commonjs(Node.js)
var { match, filterMap } = require('sdm').default;

// esModule
import { match, filterMap } from 'sdm';
```

Browser

```html
<script src="https://unpkg.com/sdm"></script>
```

## **Usage**

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
import { match } from 'sdm';
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
import { filterMap } from 'sdm';

const matchedStrings = ['src/views/home.jsx', 'src/views/about.jsx', 'src/views/ad.jsx'];
const ret = filterMap(matchedStrings, 'shojsx', (matchedInfo, index) => matchedInfo.str, {
	onMatched: (matchedStr, originStr) => `<span class="highlight">${matchedStr}</span>`
});
/* ret = ['<span class="highlight">s</span>rc/views/<span class="highlight">ho</span>me.<span class="highlight">jsx</span >']
 */
```

## **Performance**

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

## **SUBMIT A QUESTION**

- [Click here to submit](https://github.com/JOU-amjs/sdm/issues)

## LICENSE MIT

Copyright (c) 2021 JOU. Copyright of the Typescript bindings are respective of each contributor listed in the definition file.
