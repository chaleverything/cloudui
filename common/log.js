const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
export const info = (params) => {
  if (!log) return;
  params = getParams(params);
  writeLocal(params);
  log.info.apply(params);
}

export const warn = (params) => {
  if (!log) return;
  params = getParams(params);
  writeLocal(params);
  log.warn.apply(log, params);
}

export const error = (params) => {
  if (!log) return;
  params = getParams(params);
  writeLocal(params);
  log.error.apply(log, params);
}

const getParams = (params) =>{
  if (!Array.prototype.isPrototypeOf(params)) {
    return [params];
  }
  return params
}

const writeLocal = (params) => {
    params.forEach(n => {
      console.log(n);
    });
}
