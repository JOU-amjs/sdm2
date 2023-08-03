import { match } from '../src';
import testData10000 from '../test-data/10000_5000.json';
import testData1000 from '../test-data/1000_5000.json';
import testData5000 from '../test-data/5000_5000.json';
import { generateRandomStr } from './helper';

const matching = generateRandomStr(50);
const number1000 = `Match ${matching.length} out of 1000 5000 random strings`;
const number5000 = `Match ${matching.length} out of 5000 5000 random strings`;
const number10000 = `Match ${matching.length} out of 10000 5000 random strings`;
const strIgnore = ' ignore case';
describe('Match efficiency test', () => {
	test(number1000, () => {
		console.time(number1000);
		(testData1000 as string[]).filter(item => match(item, matching));
		console.timeEnd(number1000);
		console.time(number1000 + strIgnore);
		(testData1000 as string[]).filter(item => match(item, matching, { ignoreCase: true }));
		console.timeEnd(number1000 + strIgnore);
	});

	test(number5000, () => {
		console.time(number5000);
		(testData5000 as string[]).filter(item => match(item, matching));
		console.timeEnd(number5000);

		console.time(number5000 + strIgnore);
		(testData5000 as string[]).filter(item => match(item, matching, { ignoreCase: true }));
		console.timeEnd(number5000 + strIgnore);
	});

	test(number10000, async () => {
		console.time(number10000);
		(testData10000 as string[]).filter(item => match(item, matching));
		console.timeEnd(number10000);

		console.time(number10000 + strIgnore);
		(testData10000 as string[]).filter(item => match(item, matching, { ignoreCase: true }));
		console.timeEnd(number10000 + strIgnore);
	});
});
