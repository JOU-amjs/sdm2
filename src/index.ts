import { MatchedData, MatchedPosition } from '../typings';
import { createIndex } from './matches/helper';
import matchWithString from './matches/matchWithString';

// 判断是否为MatchedData类型
const isMatchedType = (string: MatchedData) => string.value && string.lastIndex >= 0;
/**
 * @description: 字符串数组的非连续查找
 * 针对连续查找，在strings传入上次的查找结果，将从上次查找结束的位置开始查找
 * @author: JOU(wx: huzhen555)
 * @param {string[]|MatchedData[]} strings 查找字符串
 * @param {string} matching 查找字符串
 * @param {boolean} ignoreCase 是否忽略大小写，默认为true
 * @return {MatchedData[]} 查找结果
 */
export function discontinuousMatch(strings: (string|MatchedData)[], matching: string, ignoreCase = true) {
  if (typeof matching !== 'string' || matching === '') return [];
	if (!Array.isArray(strings) || strings.length <= 0) return [];

  // 提取一个值检查类型，如果是MatchedData类型则过滤matching的已过滤部分
  let isFlowToString = true;
  let isStringType = true;
  let firstStr = strings[0] as MatchedData;
  if (isMatchedType(firstStr)) {
    isStringType = false;
    // 根据第一个详细值拼凑出上一次的关键字符串，再和当前关键字符串对比是否为后面添加了几位，如果是则按matchDetail查找，否则按原来的方式查找
    // 如上一次的关键字为`abcd`，这次的为'abcdght'，则可以按detail的方式查找
    let matchingFromStr = '';
    firstStr.position.forEach(p => {
      matchingFromStr += (typeof p === 'number' ? firstStr.value[p] : firstStr.value.substring(p[0], p[1] + 1));
    });
    if (matching.toLowerCase().indexOf(matchingFromStr.toLowerCase()) === 0) {
      isFlowToString = false;
      matching = matching.substring(matchingFromStr.length);
      // 如果matching与上一次的相同，就没必要再搜索了，直接返回原来的结果
      if (!matching) return strings as MatchedData[];
    }
  }
	if (ignoreCase) matching = matching.toLowerCase();
  const matchedData = [] as MatchedData[];
  // 如果传入的是字符串数组，则走字符串查找
  if (isFlowToString && isStringType) {
    (strings as string[]).forEach((str, i) => {
      let matchStr = str;
      if (ignoreCase) matchStr = matchStr.toLowerCase();
      let { matchIndexes, lastIndex } = matchWithString(matchStr, matching);
      if (matchIndexes.length > 0) {
        matchedData.push({
          value: str,
          index: i,
          position: matchIndexes,
          lastIndex,
        });
      }
    });
  }
  // 如果传入的是详细匹配数据数组，但关键字符串不匹配规则，也走字符串查找
  else if (isFlowToString && !isStringType) {
    (strings as MatchedData[]).forEach((detailStr, i) => {
      let str = detailStr.value;
      if (ignoreCase) str = str.toLowerCase();
      let { matchIndexes, lastIndex } = matchWithString(str, matching);
      if (matchIndexes.length > 0) {
        matchedData.push({
          value: str,
          index: i,
          position: matchIndexes,
          lastIndex,
        });
      }
    });
  }
  // 如果传入的是详细匹配数据数组，关键字符串也匹配规则，则走详细数据匹配查找
  else {
    (strings as MatchedData[]).forEach((detailStr, i) => {
      let { value, lastIndex, position } = detailStr;
      if (!value) return;   // 如果被查找字符串为空则直接过滤掉
      if (ignoreCase) value = value.toLowerCase();
      let matchItemIndexes = createIndex(position.pop() as MatchedPosition);
      let ret = matchWithString(value, matching, position, matchItemIndexes, lastIndex);
      if (ret.matchIndexes.length > 0) {
        matchedData.push({
          value: detailStr.value,
          index: i,
          position: ret.matchIndexes,
          lastIndex: ret.lastIndex,
        });
      }
    });
  }
	return matchedData;
}