const { writeFileSync } = require('fs');
const { join } = require('path');

const strLength = 5000;
const generateNumber = Number(process.argv[2]);
if (typeof generateNumber !== 'number' || generateNumber <= 0) {
  process.exit(1);
}

function generateRandomStr(length) {
	const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 0,1,2,3,4,5,6,7,8,9,'-','+', '=', '*', '!', '@', '#', '$', '%', '^', '&', '(', ')', '_', '[', ']'];
	let str = '';
	for (let i = 0; i < length; i++) {
		let index = Math.floor(Math.random() * (chars.length - 1));
		str += chars[index];
	}
	return str;
}
const testStrs = [];
for (let i = 0; i < generateNumber; i++) {
	testStrs.push(generateRandomStr(strLength));
}
writeFileSync(join(__dirname, `./test-data/${generateNumber}_${strLength}.json`), JSON.stringify(testStrs));