import { Matched, MatchingConfig } from '../typings';
import { isString, myAssert } from './matches/helper';
import matchWithString from './matches/matchWithString';

/**
 * @description: 字符串数组的非连续查找
 * 针对连续查找，在strings传入上次的查找结果，将从上次查找结束的位置开始查找
 * @param originalStr 查找字符串
 * @param matcher 查找字符串
 * @param config 匹配相关配置
 * @return 查找结果
 */
export function match<T extends string | Record<any, any>>(
	originalStr: T,
	matcher: string,
	config: MatchingConfig<T> = {}
) {
	myAssert(isString(matcher), 'matcher is not a string');
	const { position, indexes, transformedStr } = matchWithString(originalStr, matcher, config);
	return position.length
		? ({
				origin: originalStr,
				str: transformedStr,
				position,
				indexes
		  } as Matched<T>)
		: null;
}

/**
 * 过滤并转换匹配项
 * @param array 匹配过滤的数组
 * @param matcher 匹配字符串
 * @param callback map回调函数
 * @param config 匹配相关配置
 * @returns 过滤并且转换后的数组
 */
export const filterMap = <T extends string | Record<any, any>, R>(
	array: T[],
	matcher: string,
	callback: (value: Matched<T>, index: number) => R,
	config?: MatchingConfig<T>
) => {
	const newArray = [] as R[];
	let index = 0;
	array.forEach(item => {
		const res = match(item, matcher, config);
		if (res) {
			newArray.push(callback(res, index++));
		}
	});
	return newArray;
};
