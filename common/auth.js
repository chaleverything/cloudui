export const wxLogin = async () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      }
    });
  });
}
