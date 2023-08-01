export const convertJsonBatch = (obj, fields) => {
  for (let field in obj) {
    if (fields.indexOf(fields) > -1) {
      if (!obj[field]) {
        obj[field] = '[]';
      }
      try {
        obj[field] = JSON.parse(obj[field]);
      } catch {
        obj[field] = JSON.parse('[]');
      }
    }
  }
  return obj;
}

export const convertJson = (obj) => {
  if (!obj) {
    obj = '[]';
  }
  try {
    return JSON.parse(obj);
  } catch {
    return JSON.parse('[]');
  }
}