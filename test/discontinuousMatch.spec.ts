import { filterMap, match } from '../src/index';

const matching = '881vne2Rn4o';
const matchableStr = 'r8poojlusvpopw1N8bkl48r81vnelhdaqust2rN4O6pc8n2ven60wjcr';
const transformedStr = 'r<8>poojlusvpopw1N<8>bkl48r8<1vne>lhdaqust<2rN4O>6pc8n2ven60wjcr';
describe('match', () => {
	test('Ignore case', () => {
		const res1 = match('18fe52nbst3ev2zgs2mlytphaqmgknennriaiq11r', matching, { ignoreCase: true });
		expect(res1).toBeNull();

		const res2 = match(matchableStr, matching, { ignoreCase: true });
		expect(res2?.position).toStrictEqual([1, 16, [24, 27], [36, 40]]);
		expect(res2?.indexes).toStrictEqual([1, 16, 24, 25, 26, 27, 36, 37, 38, 39, 40]);
		expect(res2?.origin).toBe(matchableStr);
		expect(res2?.str).toBe(matchableStr);

		const res3 = match('vj6iyxmtmo7u5z7bwpcgd8h7yrllro4aixng4zirayh2hnhz6oglr06b', matching, { ignoreCase: true });
		expect(res3).toBeNull();

		const res4 = match('a4f42cjspgx5032djbdiaojcxl5kjrq62sbicrod7pwvj6iyxmt', matching, { ignoreCase: true });
		expect(res4).toBeNull();
	});

	test("Don't ignore case", () => {
		let res = match(matchableStr, matching, { ignoreCase: false });
		expect(res).toBeNull();

		res = match(matchableStr, matching); // 默认为false
		expect(res).toBeNull();
	});

	test('Match with deep objects', () => {
		const obj = { name: matchableStr };
		expect(() => {
			match(obj, matching);
		}).toThrow('[object Object] is not a string');

		const res1 = match(obj, matching, {
			ignoreCase: true,
			matchStr: ({ name }) => name
		});
		expect(res1?.position).toStrictEqual([1, 16, [24, 27], [36, 40]]);
		expect(res1?.indexes).toStrictEqual([1, 16, 24, 25, 26, 27, 36, 37, 38, 39, 40]);
		expect(res1?.origin).toBe(obj);
		expect(res1?.str).toBe(matchableStr);

		const res2 = match({ data: obj }, matching, {
			ignoreCase: true,
			matchStr: ({ data }) => data.name
		});
		expect(res2?.position).toStrictEqual([1, 16, [24, 27], [36, 40]]);
		expect(res2?.indexes).toStrictEqual([1, 16, 24, 25, 26, 27, 36, 37, 38, 39, 40]);
		expect(res2?.origin).toStrictEqual({ data: obj });
		expect(res2?.str).toBe(matchableStr);
	});

	test('Transform matched string', () => {
		const res1 = match(matchableStr, matching, {
			ignoreCase: true,
			onMatched: (matchedStr, origin) => {
				expect(origin).toBe(matchableStr);
				return `<${matchedStr}>`;
			}
		});
		expect(res1?.position).toStrictEqual([1, 16, [24, 27], [36, 40]]);
		expect(res1?.indexes).toStrictEqual([1, 16, 24, 25, 26, 27, 36, 37, 38, 39, 40]);
		expect(res1?.origin).toBe(matchableStr);
		expect(res1?.str).toBe(transformedStr);

		const res2 = match({ name: matchableStr }, matching, {
			ignoreCase: true,
			matchStr: ({ name }) => name,
			onMatched: matchedStr => `<${matchedStr}>`
		});
		expect(res2?.position).toStrictEqual([1, 16, [24, 27], [36, 40]]);
		expect(res2?.indexes).toStrictEqual([1, 16, 24, 25, 26, 27, 36, 37, 38, 39, 40]);
		expect(res2?.origin).toStrictEqual({ name: matchableStr });
		expect(res2?.str).toBe(transformedStr);
	});

	test('match empty string', () => {
		const res = match('r8poojlusvpopw1N8bkl48r81vnelhdaqust2rn4O6pc8n2ven60wjcr', '');
		expect(res).toBeNull();
	});
	test('throws error when pass wrong param', () => {
		expect(() => {
			match({}, 'str or str after positioned is not a string');
		}).toThrow('');
		expect(() => {
			match('aa', null as unknown as string);
		}).toThrow('matcher is not a string');
	});

	test('batch filter and map', () => {
		const array = [
			'18fe52nbst3ev2zgs2mlytphaqmgknennriaiq11r',
			'vj6iyxmtmo7u5z7bwpcgd8h7yrllro4aixng4zirayh2hnhz6oglr06b',
			matchableStr
		];
		const res = array.filter(item => match(item, matching, { ignoreCase: true }));
		expect(res).toStrictEqual([matchableStr]);
	});

	test('batch filter and map', () => {
		const array = [
			'18fe52nbst3ev2zgs2mlytphaqmgknennriaiq11r',
			'vj6iyxmtmo7u5z7bwpcgd8h7yrllro4aixng4zirayh2hnhz6oglr06b',
			matchableStr
		];
		let res = filterMap(array, matching, (value, index) => ({ value, index }));
		expect(res).toHaveLength(0);

		res = filterMap(array, matching, (value, index) => ({ value, index }), { ignoreCase: true });
		expect(res).toHaveLength(1);
		expect(res[0].index).toBe(0);
		expect(res[0].value?.position).toStrictEqual([1, 16, [24, 27], [36, 40]]);
		expect(res[0].value?.indexes).toStrictEqual([1, 16, 24, 25, 26, 27, 36, 37, 38, 39, 40]);
		expect(res[0].value?.origin).toBe(matchableStr);
		expect(res[0].value?.str).toBe(matchableStr);

		const res2 = filterMap(array, matching, ({ str }) => str, {
			ignoreCase: true,
			onMatched: matchedStr => `<${matchedStr}>`
		});
		expect(res2).toHaveLength(1);
		expect(res2[0]).toBe(transformedStr);
	});
});