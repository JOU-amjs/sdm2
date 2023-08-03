/*
 * @Date: 2020-04-09 11:06:01
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2023-08-03 22:25:02
 */
var typescript = require('rollup-plugin-typescript2');
const getCompiler = (
  opt = {
    // objectHashIgnoreUnknownHack: true,
    // clean: true,
    tsconfigOverride: {
      compilerOptions: {
        module: 'ES2015'
      }
    }
  }
) => typescript(opt);
exports.getCompiler = getCompiler;

const pkg = require('../package.json');
const version = process.env.VERSION || pkg.version;
const author = pkg.author;
const repository = pkg.repository.url.replace('git', 'https').replace('.git', '');
exports.banner = `/**
  * ${pkg.name} ${version} (${pkg.homepage})
  * Copyright ${new Date().getFullYear()} ${author}. All Rights Reserved
  * Licensed under MIT (${repository}/blob/master/LICENSE)
  */
`;

const compilePath = (exports.compilePath = {
  packageName: 'sdm',
  input: 'src/index.ts',
  output: suffix => `dist/sdm.${suffix}.js`
});
exports.external = compilePath.external || [];
