import { MatchedPosition } from '../../typings';
import { convertIndex } from './helper';

/**
 * @description: 非连续地匹配字符串
 * @author: JOU(wx: huzhen555)
 * @param {string} string 
 * @param {string} matching
 * @param {MatchedPosition} matchIndexes 保存当前文本的全部匹配索引
 * @param {number} matchItemIndexes 保存当次查找的匹配索引
 * @param {*} lastIndex 上次匹配的索引
 * @return {*}
 */
export default function matchWithString(string: string, matching: string, matchIndexes: MatchedPosition[] = [], matchItemIndexes: number[] = [], lastIndex = -1) {
  // 对每个搜索字符单独查找
  for (let j = 0; j < matching.length; j++) {
    let index = string.indexOf(matching.charAt(j), lastIndex + 1);		// 查找时需从上一个查找结果后开始
    if (index >= 0) {
      if (matchItemIndexes.length === 0) {
        matchItemIndexes = [index, index];
      }
      else {
        if (index === matchItemIndexes[1] + 1) {
          matchItemIndexes[1] += 1;
        }
        else {
          matchIndexes.push(convertIndex(matchItemIndexes));
          matchItemIndexes = [index, index];
        }
      }
      lastIndex = index;
    }
    else {
      // 如果中途有某个字符没匹配，则表示不匹配此字符串，直接进行下一个字符串匹配，否则会导致顺序错乱
      matchItemIndexes = [];
      matchIndexes = [];
      break;
    }
  }
  if (matchItemIndexes.length > 0) {
    matchIndexes.push(convertIndex(matchItemIndexes));
  }
  return { matchIndexes, lastIndex };
}