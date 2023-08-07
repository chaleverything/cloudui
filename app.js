import { getUserInfo } from './services/auth/auth';
import updateManager from './common/updateManager';
import { info, warn, error } from './common/log';
import { getApi, postApi } from './common/api';
import { convertJson, convertJsonBatch } from './common/help';
import { base64Encode, base64Decode } from './common/coder';

//const {info, warn, error} = require('./common/log');

App({
  globalData: {
    user: getUserInfo,
    info: info,
    warn: warn,
    error: error,
    getApi: getApi,
    postApi: postApi,
    convertJson: convertJson,
    convertJsonBatch: convertJsonBatch,
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
