import { wxLogin } from '../../common/auth';
import { getUserInfoByCode } from '../dataSource/user';

export const login = async () => {
  return await wxLogin();
}

export const getUserInfo = async () => {
  let userInfo = wx.getStorageSync('userinfo');
  if (userInfo) {
    return userInfo;
  }

  let res = await login();
  if (res?.code) {
    userInfo = await getUserInfoByCode(res.code);
    if (userInfo) {
      wx.setStorageSync('userinfo', userInfo);
    }
  }
  
  return userInfo;
}