type MatchedPosition = [number, number] | number;
interface Matched<T> {
	origin: T;
	str: string;
	position: MatchedPosition[];
	indexes: number[];
}

interface MatchingConfig<T> {
	ignoreCase?: boolean;
	matchStr?: (origin: T) => string;
	onMatched?: (matchedStr: string, origin: T) => string;
}

export function match<T extends string | Record<any, any>>(
	str: T,
	matching: string,
	config?: MatchingConfig<T>
): Matched | null;

export function filterMap<T extends string | Record<any, any>, R>(
	array: T[],
	matching: string,
	callback: (value: Matched, index: number) => R,
	config?: MatchingConfig<T>
): R[];
