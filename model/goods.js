import { genGood } from './good';
// import { postApi, postApi2 } from '../common/apibak';

export function getGoodsList(baseID = 0, length = 10) {
  // const res = getApp().globalData.postApi('count', { action: 'hello1' });
  // res.then((n) => { getApp().globalData.info(`ABC Then:${JSON.stringify(n)}`); });
  // new Array(16).fill(0).map((_, i) => console.log(`i:${i % (3 + 1)}`));

  return new Array(length).fill(0).map((_, idx) => genGood(idx + baseID));
}

export const goodsList = getGoodsList();
