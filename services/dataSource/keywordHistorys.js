import { getPromise } from '../../common/apiPromise';

export const increaseKeywordHistory = async (parms) => {
  return await getPromise('KeywordHistorys/IncreaseKeywordHistorysByOpenId', parms);
}

export const clearKeywordHistorys = async (parms) => {
  return await getPromise('KeywordHistorys/ClearKeywordHistorysByOpenId', parms);
}

export const getKeywordHistorys = async (parms) => {
  return await getPromise('KeywordHistorys/GetKeywordHistorysByOpenId', parms);
}

export const getPopulars = async (parms) => {
  return await getPromise('KeywordHistorys/GetPopulars', parms);
}