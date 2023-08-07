export const getPromise = async (route, parms) => {
  return new Promise((resolve, reject) => {
    getApp().globalData.postApi(route, parms).then((res) => {
      if (res?.isSucc) {
        //console.log('S:' + JSON.stringify(res.data));
        resolve(res.data);
      } else {
        //console.log('E:' + JSON.stringify(res));
        reject([]);
      }
    });
  });
}