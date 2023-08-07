import { getPromise } from '../../common/apiPromise';

export const getUserInfo = async (parms) => {
  return await getPromise('User/GetUserInfo', parms);
}

export const getUserInfoByCode = async (code) => {
  return await getPromise('User/GetUserInfoByCode', { code });
}