export const getPromise = async (route, parms) => {
  return new Promise((resolve, reject) => {
    getApp().globalData.postApi(route, parms).then((res) => {
      if (res?.isSucc) {
        resolve(res.data);
        //console.log('A:' + JSON.stringify(res.data));
      } else {
        reject([]);
      }
    });
  });
}