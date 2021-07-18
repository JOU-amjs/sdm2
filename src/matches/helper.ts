import { MatchedPosition } from '../../typings';

export const convertIndex = ([start, end]: number[]) => start === end ? start : ([start, end] as [number, number]);
export const createIndex = (index: MatchedPosition) => typeof index === 'number' ? [index, index] : index;