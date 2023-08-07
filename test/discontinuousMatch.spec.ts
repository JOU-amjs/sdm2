import { filterMap, match } from '../src/index';

const matching = '881vne2Rn4o';
const matchableStr = 'r8poojlusvpopw1N8bkl48r81vnelhdaqust2rN4O6pc8n2ven60wjcr';
const transformedStr = 'r<8>poojlusvpopw1N<8>bkl48r8<1vne>lhdaqust<2rN4O>6pc8n2ven60wjcr';
describe('string discontinuous match', () => {
	test('Ignore case', () => {
		const res1 = match('18fe52nbst3ev2zgs2mlytphaqmgknennriaiq11r', matching, { ignoreCase: true });
		expect(res1).toBeNull();

		const res2 = match(matchableStr, matching, { ignoreCase: true });
		expect(res2?.position).toStrictEqual([1, 16, [24, 27], [36, 40]]);
		expect(res2?.indexes).toStrictEqual([1, 16, 24, 25, 26, 27, 36, 37, 38, 39, 40]);
		expect(res2?.origin).toBe(matchableStr);
		expect(res2?.str).toBe(matchableStr);
		expect(res2?.strArr).toStrictEqual([matchableStr]);

		const res3 = match('vj6iyxmtmo7u5z7bwpcgd8h7yrllro4aixng4zirayh2hnhz6oglr06b', matching, { ignoreCase: true });
		expect(res3).toBeNull();

		const res4 = match('a4f42cjspgx5032djbdiaojcxl5kjrq62sbicrod7pwvj6iyxmt', matching, { ignoreCase: true });
		expect(res4).toBeNull();
	});

	test('Without ignore case', () => {
		let res = match(matchableStr, matching, { ignoreCase: false });
		expect(res).toBeNull();

		res = match(matchableStr, matching); // 默认为false
		expect(res).toBeNull();
	});

	test('Match in edge case', () => {
		const matchableStrCased = '  )(&N&*B )7b f  asdf';
		let matchStrCased = ' )&N*  ';
		const res1 = match(matchableStrCased, matchStrCased);
		expect(res1?.position).toStrictEqual([0, 2, [4, 5], 7, 9, 13]);
		expect(res1?.indexes).toStrictEqual([0, 2, 4, 5, 7, 9, 13]);
		expect(res1?.origin).toBe(matchableStrCased);
		expect(res1?.str).toBe(matchableStrCased);
		expect(res1?.strArr).toStrictEqual([matchableStrCased]);

		matchStrCased = '  adf';
		const res2 = match(matchableStrCased, matchStrCased, {
			onMatched: (matchedStr, origin) => ({ matched: matchedStr, origin })
		});
		expect(res2?.position).toStrictEqual([[0, 1], 17, [19, 20]]);
		expect(res2?.indexes).toStrictEqual([0, 1, 17, 19, 20]);
		expect(res2?.origin).toBe(matchableStrCased);
		expect(res2?.str).toBe('[object Object])(&N&*B )7b f  [object Object]s[object Object]');
		expect(res2?.strArr).toStrictEqual([
			{ matched: '  ', origin: matchableStrCased },
			')(&N&*B )7b f  ',
			{ matched: 'a', origin: matchableStrCased },
			's',
			{ matched: 'df', origin: matchableStrCased }
		]);
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
		expect(res1?.strArr).toStrictEqual([matchableStr]);

		const res2 = match({ data: obj }, matching, {
			ignoreCase: true,
			matchStr: ({ data }) => data.name
		});
		expect(res2?.position).toStrictEqual([1, 16, [24, 27], [36, 40]]);
		expect(res2?.indexes).toStrictEqual([1, 16, 24, 25, 26, 27, 36, 37, 38, 39, 40]);
		expect(res2?.origin).toStrictEqual({ data: obj });
		expect(res2?.str).toBe(matchableStr);
		expect(res2?.strArr).toStrictEqual([matchableStr]);
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
		const transformedStrArr = [
			'r',
			'<8>',
			'poojlusvpopw1N',
			'<8>',
			'bkl48r8',
			'<1vne>',
			'lhdaqust',
			'<2rN4O>',
			'6pc8n2ven60wjcr'
		];
		expect(res1?.strArr).toStrictEqual(transformedStrArr);

		const res2 = match({ name: matchableStr }, matching, {
			ignoreCase: true,
			matchStr: ({ name }) => name,
			onMatched: matchedStr => `<${matchedStr}>`
		});
		expect(res2?.position).toStrictEqual([1, 16, [24, 27], [36, 40]]);
		expect(res2?.indexes).toStrictEqual([1, 16, 24, 25, 26, 27, 36, 37, 38, 39, 40]);
		expect(res2?.origin).toStrictEqual({ name: matchableStr });
		expect(res2?.str).toBe(transformedStr);
		expect(res2?.strArr).toStrictEqual(transformedStrArr);
	});

	test('match empty string', () => {
		const res1 = match(matchableStr, '');
		expect(res1?.position).toStrictEqual([]);
		expect(res1?.indexes).toStrictEqual([]);
		expect(res1?.origin).toBe(matchableStr);
		expect(res1?.str).toBe(matchableStr);
		expect(res1?.strArr).toStrictEqual([matchableStr]);

		const res2 = match(matchableStr, '', {
			onMatched: matchedStr => `<${matchedStr}>`
		});
		expect(res2?.position).toStrictEqual([]);
		expect(res2?.indexes).toStrictEqual([]);
		expect(res2?.origin).toBe(matchableStr);
		expect(res2?.str).toBe(matchableStr);
		expect(res2?.strArr).toStrictEqual([matchableStr]);
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
		let res = filterMap(array, matching, {
			onMap: (value, index) => ({ value, index })
		});
		expect(res).toHaveLength(0);

		res = filterMap(array, matching, {
			onMap: (value, index) => ({ value, index }),
			ignoreCase: true
		});
		expect(res).toHaveLength(1);
		expect(res[0].index).toBe(0);
		expect(res[0].value?.position).toStrictEqual([1, 16, [24, 27], [36, 40]]);
		expect(res[0].value?.indexes).toStrictEqual([1, 16, 24, 25, 26, 27, 36, 37, 38, 39, 40]);
		expect(res[0].value?.origin).toBe(matchableStr);
		expect(res[0].value?.str).toBe(matchableStr);
		expect(res[0].value?.strArr).toStrictEqual([matchableStr]);

		const res2 = filterMap(array, matching, {
			ignoreCase: true,
			onMap: ({ str }) => str,
			onMatched: matchedStr => `<${matchedStr}>`
		});
		expect(res2).toHaveLength(1);
		expect(res2[0]).toBe(transformedStr);
	});
});
