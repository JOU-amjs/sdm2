/**
 * 断言表达式
 * @param expression 表达式
 * @param msg 错误信息
 */
export const myAssert = (expression: boolean, msg: string) => {
	if (!expression) {
		throw new Error(msg);
	}
};

/**
 * 判断参数是否为字符串
 * @param arg 任意参数
 * @returns 该参数是否为字符串
 */
export const isString = (arg: any): arg is string => typeof arg === 'string';

/**
 * 判断参数是否为函数
 * @param arg 任意参数
 * @returns 该参数是否为函数
 */
export const isFn = (arg: any): arg is (...args: any[]) => any => typeof arg === 'function';
