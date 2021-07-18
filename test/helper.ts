import { MatchedData, MatchedPosition } from '../typings';

export function generateRandomStr(length: number) {
	const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 0,1,2,3,4,5,6,7,8,9,'-','+', '=', '*', '!', '@', '#', '$', '%', '^', '&', '(', ')', '_', '[', ']'];
	let str = '';
	for (let i = 0; i < length; i++) {
		let index = Math.floor(Math.random() * (chars.length - 1));
		str += chars[index];
	}
	return str;
}

export function getMatchedString(matched: MatchedData) {
	let { value, position } = matched;
	let rawPosition = position.reduce((prev, next) => {
		if (typeof next === 'number') {
			prev.push(next);
		}
		else {
			for (let i = next[0]; i <= next[1]; i++) {
				prev.push(i);
			}
		}
		return prev;
	}, [] as number[]);

	let matchedString = '';
	rawPosition.forEach(p => matchedString += value.charAt(p));
	return matchedString;
}