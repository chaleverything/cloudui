import { getPromise } from '../../common/apiPromise';

export const getGoods = async (params) => {
  return await getPromise('Goods/GetGoodsInfo', params);
}

export const getGoodsList = async (params) => {
  let lst = await getGoods(params);
  // getApp().globalData.info(`DS getGoodsList:${lst[5].spuTagList}`);

  return lst.map((item) => {
    return {
      spuId: item.spuId,
      thumb: item.primaryImage,
      title: item.title,
      price: item.minSalePrice,
      originPrice: item.maxLinePrice,
      tags: getApp().globalData.convertJson(item.spuTagList).map((tag) => tag?.title),
    };
  });
}
