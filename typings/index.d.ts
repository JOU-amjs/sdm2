type MatchedPosition = [number, number] | number;
interface Matched<T> {
	origin: T;
	str: string;
	strArr: string[];
	position: MatchedPosition[];
	indexes: number[];
}

interface MatchingConfig<T> {
	ignoreCase?: boolean;
	matchStr?: (origin: T) => string;
	onMatched?: (matchedStr: string, origin: T) => any;
}

export function match<T extends string | Record<any, any>>(
	str: T,
	matching: string,
	config?: MatchingConfig<T>
): Matched<T> | null;

interface FilterMapMatchingConfig<T, R> extends MatchingConfig<T> {
	onMap: (value: Matched<T>, index: number) => R;
}
export function filterMap<T extends string | Record<any, any>, R>(
	array: T[],
	matching: string,
	config: FilterMapMatchingConfig<T, R>
): R[];
