# [string-discontinuous-match](https://github.com/JOU-amjs/string-discontinuous-match)
[![npm](https://img.shields.io/npm/v/string-discontinuous-match)](https://www.npmjs.com/package/string-discontinuous-match)
![size](https://img.shields.io/bundlephobia/min/string-discontinuous-match)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
[![Coverage Status](https://coveralls.io/repos/github/JOU-amjs/string-discontinuous-match/badge.svg)](https://coveralls.io/github/JOU-amjs/string-discontinuous-match)
![jslib](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)

### A high performance string discontinuous search function.

### **Features**
- discontinuous match
- High performance
- Multiple call performance optimization
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
<script src="https://unpkg.com/string-discontinuous-match/dist/string-discontinuous-match.umd.js"></script>
```

### **Usage**
---
Perhaps you will use it in paths seraching, tree searching, selector searching, or some other local data search by discontinuous searching string, it can satisfy you. See the example below.
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
In most cases, we always search for some data in the `input` event, so we optimize the performance of multiple continuous calls. You can pass the search results from the last time to the next function call, and the function will judge if the search keyword only adds a few characters at the end compared with the last time, It will execute this function from the end of the last search.
```javascript
let ret = matchedStrings;   // the matchedStrings is initial matched string array
function eventInputHandler(event) {
  ret = discontinuousMatch(ret, event.target.value);
  // Do some display operations
}
```
you won't worried about the performance, we take it of this package seriously. And here are the random strings' results of performance test.

|  Numbers of strings  |  Per string length  |  Ignore case  |  continuous calls | performance |
|  ----  | ----  | ----  | ----  | ----  |
| 1000  | 5000 | true | false | 19ms |
| 1000  | 5000 | true | true | 4ms |
| 1000  | 5000 | false | false | 16ms |
| 1000  | 5000 | false | true | 3ms |
| 5000  | 5000 | true | false | 42ms |
| 5000  | 5000 | true | true | 14ms |
| 5000  | 5000 | false | false | 39ms |
| 5000  | 5000 | false | true | 10ms |
| 10000  | 5000 | true | false | 101ms |
| 10000  | 5000 | true | true | 29ms |
| 10000  | 5000 | false | false | 84ms |
| 10000  | 5000 | false | true | 19ms |

You can see that it performs very well in large array search, and the performance is improved about 4 times when it is called in multiple continuous.

### LICENSE MIT
Copyright (c) 2021 JOU. Copyright of the Typescript bindings are respective of each contributor listed in the definition file.

### **Submit a issue**
- [click here](https://github.com/JOU-amjs/string-discontinuous-match/issues)