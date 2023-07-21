const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
export const info = (params: any[]) => {
  if (!log) return;
  params = getParams(params);
  writeLocal(params);
  log.info.apply(params);
}

export const warn = (params: any[]) => {
  if (!log) return;
  params = getParams(params);
  writeLocal(params);
  log.warn.apply(log, params);
}

export const error = (params: any[]) => {
  if (!log) return;
  params = getParams(params);
  writeLocal(params);
  log.error.apply(log, params);
}

const getParams:any = (params: any[]) =>{
  if (!Array.prototype.isPrototypeOf(params)) {
    return [params];
  }
  return params
}

const writeLocal = (params: any[]) => {
    params.forEach(n => {
      console.log(n);
    });
}



// var log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null
// module.exports = {
//   info() {
// 	// console.log(JSON.stringify(log));
//     if (!log) return;  
// 	console.log(arguments[0]);
//     log.info.apply(log, arguments)
//   },
//   warn() {
//     if (!log) return
//     log.warn.apply(log, arguments)
//   },
//   error() {
//     if (!log) return
//     log.error.apply(log, arguments)
//   },
//   setFilterMsg(msg) { // 从基础库2.7.3开始支持
//     if (!log || !log.setFilterMsg) return
//     if (typeof msg !== 'string') return
//     log.setFilterMsg(msg)
//   },
//   addFilterMsg(msg) { // 从基础库2.8.1开始支持
//     if (!log || !log.addFilterMsg) return
//     if (typeof msg !== 'string') return
//     log.addFilterMsg(msg)
//   }
// }