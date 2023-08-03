// rollup.config.js
// ES output
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const config = require('./rollup.cjs');
const paths = config.compilePath;
const moduleType = 'esm';

const globals = {};
// 将externals中的内容放到globals对象中
config.external.forEach(key => (globals[key] = key));
module.exports = {
	input: paths.input,
	output: {
		name: paths.packageName,
		file: paths.output(moduleType),
		format: 'es',
		// When export and export default are not used at the same time, set legacy to true.
		// legacy: true,
		banner: config.banner,
		globals
	},
	external: config.external,
	plugins: [
		nodeResolve({
			browser: true,
			extensions: ['.ts', '.js', 'tsx', 'jsx']
		}),
		config.getCompiler()
	]
};
