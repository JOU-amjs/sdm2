import expect from 'expect.js';
import { discontinuousMatch } from '../src';
import { generateRandomStr } from './helper';
import testData1000 from '../test-data/1000_5000.json';
import testData5000 from '../test-data/5000_5000.json';
import testData10000 from '../test-data/10000_5000.json';

let matching = generateRandomStr(50);
const number1000 = `Match ${matching.length} out of 1000 5000 random strings`;
const number5000 = `Match ${matching.length} out of 5000 5000 random strings`;
const number10000 = `Match ${matching.length} out of 10000 5000 random strings`;
let ignoreCase = false;
describe('Match efficiency test', () => {
  it(number1000, () => {
    console.time(number1000);
    let res = discontinuousMatch(testData1000 as string[], matching, ignoreCase);
    console.timeEnd(number1000);
    // matching += generateRandomStr(3);
    matching = generateRandomStr(3) + matching;
    console.log(res.length);
    console.time(number1000 + ' again');
    discontinuousMatch(res, matching, ignoreCase);
    console.timeEnd(number1000 + ' again');
    expect(1).to.equal(1);
  });

  it(number5000, () => {
    console.time(number5000);
    let res = discontinuousMatch(testData5000 as string[], matching, ignoreCase);
    console.timeEnd(number5000);
    matching += generateRandomStr(3);
    // matching = generateRandomStr(3) + matching;
    console.log(res.length);
    console.time(number1000 + ' again');
    discontinuousMatch(res, matching, ignoreCase);
    console.timeEnd(number1000 + ' again');
    expect(1).to.equal(1);
    expect(1).to.equal(1);
  });

  it(number10000, async () => {
    console.time(number10000);
    let res = discontinuousMatch(testData10000 as string[], matching, ignoreCase);
    console.timeEnd(number10000);
    matching += generateRandomStr(3);
    // matching = generateRandomStr(3)+ matching;
    console.log(res.length);
    console.time(number10000 + ' again');
    discontinuousMatch(res, matching, ignoreCase);
    console.timeEnd(number10000 + ' again');
    expect(1).to.equal(1);
  });
});