import updateManager from './common/updateManager';
import { info, warn, error } from './common/log';
import { getApi, postApi } from './common/api';
import { base64Encode, base64Decode } from './common/coder';


//const {info, warn, error} = require('./common/log');

App({
  globalData: {
    info: info,
    warn: warn,
    error: error,
    getApi: getApi,
    postApi: postApi,
    base64Encode: base64Encode,
    base64Decode: base64Decode
  },
  onLaunch: function () {
    wx.cloud.init();
  },
  onShow: function () {
    updateManager();
  },
});
