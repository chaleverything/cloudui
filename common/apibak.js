export const getApi = async (route) => {
  let result = new Promise((resolve, reject) => {
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
      complete() { }
    })
  });
  return result;
}


// export async function postApi(route, params) {
//   let result = await wx.cloud.callContainer({
//     "config": {
//       "env": "prod-3g6l6z9re76b6d4d"
//     },
//     "path": `/api/${route}`,
//     "header": {
//       "X-WX-SERVICE": "dotnet-s5wz",
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     "method": "POST",
//     "data": params
//   });
//   return new Promise((resolve, reject) => {
//     result.then((res)=>{
//       if (res.data) {
//         resolve(res.data);
//       }else{
//         reject(); 
//       }
//     }).catch((err)=>{ reject(err) });
//   });
// }


export async function postApi(route, params) {
  let result = await new Promise((resolve, reject) => {
    wx.cloud.callContainer({
      "config": {
        "env": "prod-3g6l6z9re76b6d4d"
      },
      "path": `/api/${route}`,
      "header": {
        "X-WX-SERVICE": "dotnet-s5wz",
        "Content-Type": "application/json;charset=UTF-8",
      },
      "method": "POST",
      "data": params,
      success: async (res) => {
        if (res.data) {
          resolve(res.data);
        }
      },
      fail: async (err) => {
        console.log(err);
        reject(err);
      },
      complete: async () => { }
    })
  });
  return result;
}

export async function postApi2(route, params) {
  let result = {};
  postApi(route, params).then((res) => {
    console.log(`123:${JSON.stringify(res)}`)
    result = res
  }).catch((e) => {
    result = e
  });
  return result;
}

// export const postApi = async (route, params) => {
//   let result = new Promise((resolve, reject) => {
//     wx.cloud.callContainer({
//       "config": {
//         "env": "prod-3g6l6z9re76b6d4d"
//       },
//       "path": `/api/${route}`,
//       "header": {
//         "X-WX-SERVICE": "dotnet-s5wz",
//         "Content-Type": "application/json;charset=UTF-8",
//         // "Accept-Encoding": "gzip, deflate, br"
//         //"encoding": "utf-8"
//       },
//       "method": "POST",
//       "data": params,
//       success(res) {
//         if (res.data) {
//           resolve(res.data);
//         }
//       },
//       fail(err) {
//         console.log(err);
//         reject(err);
//       },
//       complete() { }
//     })
//   });
//   result.then((e) => {
//     return e;
//   });

//   return {};
// }