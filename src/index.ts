import { MatchedData, MatchedPosition } from '../typings';
import { createIndex } from './matches/helper';
import matchWithString from './matches/matchWithString';

/**
 * @description: 字符串数组的非连续查找
 * 针对连续查找，在strings传入上次的查找结果，将从上次查找结束的位置开始查找
 * @author: JOU(wx: huzhen555)
 * @param {string[]|MatchedData[]} strings 查找字符串
 * @param {string} matching 查找字符串
 * @param {boolean} ignoreCase 是否忽略大小写，默认为true
 * @param {boolean} deep 如果数组中的被搜索字符串在对象属性中，可通过此参数指定它的层级位置
 * @return {MatchedData[]} 查找结果
 */
export function discontinuousMatch<T extends (string|Record<string, any>)>(strings: T[], matching: string, ignoreCase = true, deep = '') {
  if (typeof matching !== 'string' || matching === '') return [];
	if (!Array.isArray(strings) || strings.length <= 0) return [];
	if (ignoreCase) matching = matching.toLowerCase();
  const matchedData = [] as MatchedData[];
  const attrAry = deep === '' ? [] : deep.split('.');
  strings.forEach((str, i) => {
    let matchStr = '';
    let originalStr = '';
    if (typeof str === 'string') matchStr = originalStr = str;
    else {
      try {
        let attrVal: any = str;
        attrAry.forEach(attr => attrVal = attrVal[attr]);
        matchStr = originalStr = attrVal;
        if (typeof matchStr !== 'string') throw new Error(`there is not a string in \`${deep}\`, matching index is ${i}`);
      } catch (error) {
        return;
      }
    }
    if (ignoreCase) matchStr = matchStr.toLowerCase();
    let { matchIndexes, lastIndex } = matchWithString(matchStr, matching);
    if (matchIndexes.length > 0) {
      matchedData.push({
        value: originalStr,
        index: i,
        position: matchIndexes,
        lastIndex,
      });
    }
  });
	return matchedData;
}

/**
 * @description: 替换匹配到的字符串，这将在高亮搜索关键字中很有用
 * @author: JOU(wx: huzhen555)
 * @param {MatchedData} machedDataItem
 * @param {*} callback
 * @param {*} returnAry
 * @return {*}
 */
export function replaceMatchedString(machedDataItem: MatchedData, callback: (str: string) => string, returnAry = false) {
  const { value, position } = machedDataItem;
  const charAry = [];
  let lastIndex = 0;
  position.forEach(p => {
    if (typeof p === 'number') {
      charAry.push(value.substring(lastIndex, p), callback(value[p]));
      lastIndex = p + 1;
    }
    else {
      charAry.push(value.substring(lastIndex, p[0]), callback(value.substring(p[0], p[1] + 1)));
      lastIndex = p[1] + 1;
    }
  });
  charAry.push(value.substring(lastIndex));
  return returnAry ? charAry : charAry.join('');
}