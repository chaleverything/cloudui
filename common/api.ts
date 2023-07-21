export const getApi:any = async (route: string) => {
  let result = await new Promise((resolve, reject) => {
    wx.cloud.callContainer({
      "config": {
        "env": "prod-3g6l6z9re76b6d4d"
      },
      "path": `/api/${route}`,
      "header": {
        "X-WX-SERVICE": "dotnet-s5wz",
        "Content-Type": "application/json;charset=UTF-8"
      },
      "method": "GET",
      success(res) {
        if (res.data) {
          resolve(res.data);
        }
      },
      fail(err) {
        console.log(err);
        reject(err);
      },
      complete() {}
    })
  });
  return result;
}


export const postApi:any = async (route: string, params: any) => {
  let result = await new Promise((resolve, reject) => {
    wx.cloud.callContainer({
      "config": {
        "env": "prod-3g6l6z9re76b6d4d"
      },
      "path": `/api/${route}`,
      "header": {
        "X-WX-SERVICE": "dotnet-s5wz",
        "Content-Type": "application/json;charset=UTF-8",
        // "Accept-Encoding": "gzip, deflate, br"
        //"encoding": "utf-8"
      },
      "method": "POST",
      "data": params,
      success(res) {
        if (res.data) {
          resolve(res.data);
        }
      },
      fail(err) {
        console.log(err);
        reject(err);
      },
      complete() {}
    })
  });
  return result;
}