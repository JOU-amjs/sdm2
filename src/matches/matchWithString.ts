import { MatchedPosition, MatchingConfig } from '../../typings';
import { isFn, isString, myAssert } from './helper';

const convertIndex = ([start, end]: number[]): MatchedPosition =>
	start === end ? start : ([start, end] as [number, number]);

/**
 * @description: 非连续地匹配字符串
 * @param origin 原始匹配数据
 * @param matcher 匹配字符串
 * @param config 匹配相关配置
 * @return 匹配结果，未匹配到返回的数据为空数组
 */
export default function matchWithString<T extends string | Record<any, any>>(
	origin: T,
	matcher: string,
	{ ignoreCase, matchStr, onMatched }: MatchingConfig<T>
) {
	const newStr = isFn(matchStr) ? matchStr(origin) : origin;
	myAssert(isString(newStr), `${newStr} is not a string`);

	const isOnMatchedFn = isFn(onMatched);
	let position = [] as MatchedPosition[],
		matchedRange: number[] = [],
		lastIndex = -1,
		indexes: number[] = [],
		matchingStr = newStr as string,
		// 如果不需要转换匹配字符串则默认为被查找的字符串，否则会通过appendTransformedStr一步步追加内容上去
		transformedStr = isOnMatchedFn ? '' : matchingStr;
	const strArr = isOnMatchedFn ? [] : [matchingStr];
	if (ignoreCase) {
		matchingStr = matchingStr.toLowerCase();
		matcher = matcher.toLowerCase();
	}

	let splitedStartIndex = 0;
	const appendTransformedStr = () => {
		// 替换匹配的字符串
		if (isOnMatchedFn) {
			const [startIndex, endIndex] = matchedRange,
				notMatchSnippet = newStr.substring(splitedStartIndex, startIndex),
				matchedSnippet = onMatched(newStr.substring(startIndex, endIndex + 1), origin);

			// 截取初始字符串
			transformedStr += notMatchSnippet;
			transformedStr += matchedSnippet;
			strArr.push(notMatchSnippet, matchedSnippet);
			splitedStartIndex = endIndex + 1;
		}
	};

	// 对每个搜索字符单独查找
	for (let i = 0; i < matcher.length; i++) {
		const index = matchingStr.indexOf(matcher[i], lastIndex + 1); // 查找时需从上一个查找结果后开始
		if (index >= 0) {
			indexes.push(index);
			if (matchedRange.length === 0) {
				matchedRange = [index, index];
			} else {
				if (index === matchedRange[1] + 1) {
					matchedRange[1] += 1;
				} else {
					appendTransformedStr();
					position.push(convertIndex(matchedRange));
					matchedRange = [index, index];
				}
			}
			lastIndex = index;
		} else {
			// 如果中途有某个字符没匹配，则表示不匹配此字符串，直接进行下一个字符串匹配，否则会导致顺序错乱
			matchedRange = position = indexes = [];
			break;
		}
	}
	if (matchedRange.length > 0) {
		appendTransformedStr();
		if (isOnMatchedFn) {
			// 将末尾的字符串补充上去
			const endSnippet = newStr.substring(matchedRange[1] + 1);
			transformedStr += endSnippet;
			strArr.push(endSnippet);
		}
		position.push(convertIndex(matchedRange));
	}
	return {
		position,
		indexes,
		str: transformedStr,
		strArr: strArr.filter(Boolean)
	};
}
