const baseDict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export const utf8Decode = (content) => {
  let result = '';
  let i = 0;
  let c = 0;
  let c1 = 0;
  let c2 = 0;
  while (i < content.length) {
    c = content.charCodeAt(i);
    if (c < 128) {
      result += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c1 = content.charCodeAt(i + 1);
      result += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
      i += 2;
    }
    else {
      c1 = content.charCodeAt(i + 1);
      c2 = content.charCodeAt(i + 2);
      result += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63)); i += 3;
    }
  } return result;
}

export const base64Encode_old = (content) => {
  let encodeStr = '';
  console.log(`LQX:${content.length}`)
  for (let i = 0; i < content.length; i += 3) {
    if (content.length - i >= 3) {
      const n1 = content.charCodeAt(i);
      const n2 = content.charCodeAt(i + 1);
      const n3 = content.charCodeAt(i + 2);
      console.log(`LQXB:${i} | ${n1 >> 2}`)
      encodeStr += baseDict[n1 >> 2];
      console.log(`LQX1:${i} | ${encodeStr}`)
      encodeStr += baseDict[((n1 & 0b11) << 4) | (n2 >> 4)];
      console.log(`LQX2:${i} | ${encodeStr}`)
      encodeStr += baseDict[((n2 & 0b1111) << 2) | (n3 >> 6)];
      console.log(`LQX3:${i} | ${encodeStr}`)
      encodeStr += baseDict[n3 & 0b111111];
      console.log(`LQX4:${i} | ${encodeStr}`)
    } else if (content.length - i == 2) {
      const n1 = content.charCodeAt(i);
      const n2 = content.charCodeAt(i + 1);
      encodeStr += baseDict[n1 >> 2];
      encodeStr += baseDict[((n1 & 0b11) << 4) | (n2 >> 4)];
      encodeStr += baseDict[(n2 & 0b1111) << 2];
      encodeStr += baseDict[64];
    } else {
      const n1 = content.charCodeAt(i);
      encodeStr += baseDict[n1 >> 2];
      encodeStr += baseDict[(n1 & 0b11) << 4];
      encodeStr += baseDict[64];
      encodeStr += baseDict[64];
    }
  }
  console.log(`LQX:${encodeStr}`)
  return encodeStr;
}

export const base64Decode_old = (content) => {
  let decodeStr = '';
  for (let i = 0; i < content.length; i += 4) {
    const n1 = baseDict.indexOf(content[i]);
    const n2 = baseDict.indexOf(content[i + 1]);
    const n3 = baseDict.indexOf(content[i + 2]);
    const n4 = baseDict.indexOf(content[i + 3]);

    decodeStr += String.fromCharCode((n1 << 2) | (n2 >> 4));
    if (n3 !== 64) {
      decodeStr += String.fromCharCode(((n2 & 0b1111) << 4) | (n3 >> 2));
      if (n4 !== 64) {
        decodeStr += String.fromCharCode(((n3 & 0b11) << 6) | n4);
      }
    }
  }
  return decodeStr;
}



const BASE64_MAPPING = [ //映射表  
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
  'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1',
  '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];
const pad = "="; //补白  
const BASE64_ARC_MAPPING = { //反向映射表
  'A': 0,
  'B': 1,
  'C': 2,
  'D': 3,
  'E': 4,
  'F': 5,
  'G': 6,
  'H': 7,
  'I': 8,
  'J': 9,
  'K': 10,
  'L': 11,
  'M': 12,
  'N': 13,
  'O': 14,
  'P': 15,
  'Q': 16,
  'R': 17,
  'S': 18,
  'T': 19,
  'U': 20,
  'V': 21,
  'W': 22,
  'X': 23,
  'Y': 24,
  'Z': 25,
  'a': 26,
  'b': 27,
  'c': 28,
  'd': 29,
  'e': 30,
  'f': 31,
  'g': 32,
  'h': 33,
  'i': 34,
  'j': 35,
  'k': 36,
  'l': 37,
  'm': 38,
  'n': 39,
  'o': 40,
  'p': 41,
  'q': 42,
  'r': 43,
  's': 44,
  't': 45,
  'u': 46,
  'v': 47,
  'w': 48,
  'x': 49,
  'y': 50,
  'z': 51,
  '0': 52,
  '1': 53,
  '2': 54,
  '3': 55,
  '4': 56,
  '5': 57,
  '6': 58,
  '7': 59,
  '8': 60,
  '9': 61,
  '+': 62,
  '/': 63
};


export const base64Encode = (content) => {
  if (content) {
    try {
      return base64EncodeRef(content).replace(/\+/g, '[').replace(RegExp('/', "g"), ']');
    } catch (error) {
    }
  }
  return '';
}

const base64EncodeRef = (content) => {
  let rs = "";
  let rm = 2;
  let n = 0;
  for (var i = 0; i < content.length; i++) {
    var code = content.charCodeAt(i);
    var bytes = getBytesOfUnicideChar(code);
    for (var j = 0; j < bytes.length; j++) {
      let b = bytes[j];
      if (rm == 8) {
        rs += BASE64_MAPPING[n];
        rm = 2;
        n = 0;
      }
      var c = (n << 8 - rm) | (b >> rm);
      rs += BASE64_MAPPING[c];
      n = b & ((2 << rm - 1) - 1);
      rm += 2;
      code = code >> 8;
    }
  }
  rs += BASE64_MAPPING[n << 8 - rm];
  let md = rs.length % 4;
  if (md != 0) {
    rs += new Array(5 - md).join(pad);
  }
  return rs;
}
const getBytesOfUnicideChar = (code) => {
  //获取unicode字符的UTF-8字节数组  
  var bytes = [];
  if (code <= 0x7F) { //1个字节  
    //00000000-0000007F 0xxxxxxx  
    bytes.push(code);
  } else if (code <= 0x07FF) { //2个字节  
    //00000080-000007FF 110xxxxx 10xxxxxx  
    //11000000 + ((code & 00000111 11000000)右移动6位)  
    bytes.push(192 + (code & 1984) >> 6);
    //10000000 + ((code & 00000000 00111111)右移动0位)  
    bytes.push(128 + (code & 63));
  } else if (code <= 0xFFFF) {
    //00000800-0000FFFF   1110xxxx 10xxxxxx 10xxxxxx  
    bytes.push(224 + (code >> 12));
    bytes.push(128 + ((code & 4032) >> 6));
    bytes.push(128 + (code & 63));
  } else if (code <= 0x1FFFFF) {
    //00010000-001FFFFF 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx  
    bytes.push(240 + (code >> 18));
    bytes.push(128 + ((code & 245760) >> 12));
    bytes.push(128 + ((code & 4032) >> 6));
    bytes.push(128 + (code & 63));
  } else if (code <= 0x13FFFFFF) {
    //00200000-03FF FFFF 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx  
    bytes.push(248 + (code >> 24));
    bytes.push(128 + ((code & 16515072) >> 18));
    bytes.push(128 + ((code & 245760) >> 12));
    bytes.push(128 + ((code & 4032) >> 6));
    bytes.push(128 + (code & 63));
  } else if (code <= 0x7FFFFFFF) {
    //00200000-03FFFFFF 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx  
    bytes.push(252 + (code >> 30));
    bytes.push(128 + ((code & 1056964608) >> 24));
    bytes.push(128 + ((code & 16515072) >> 18));
    bytes.push(128 + ((code & 245760) >> 12));
    bytes.push(128 + ((code & 4032) >> 6));
    bytes.push(128 + (code & 63));
  }
  return bytes;
}



export const base64Decode = (content) => {
  if (content) {
      try {
          var t = content.replace(/\[/g, '+').replace(RegExp(']', "g"), '/')
          return base64DecodeRef(t).replace(RegExp('\x00', 'g'), '');
      } catch (e) {
      }
  }
  return '';
}

const base64DecodeRef = (content) => {
  return bytesToString(base64DecodeToBytes(content));
}

const base64DecodeToBytes = (content) => {
  var bl = 0;
  var p = 0;
  var bytes = [];
  for (var i = 0; i < content.length; i++) {
      if (content.charAt(i) == "=") continue;
      let b = BASE64_ARC_MAPPING[content.charAt(i)];
      if (bl == 0) {
          p = b << 2;
          bl = 6;
      } else if (bl < 8) {
          var c = p | (b >> (bl - 2));
          bytes.push(c);
          var rm = bl - 2;
          p = (b << (8 - rm) & 255);
          bl = rm;
      }
  }
  if (bl > 0) {
      var c = p << (8 - bl);
      bytes.push(c);
  }
  return bytes;
}

const bytesToString = (bytes) => {
  var str = "";
  for (var i = 0; i < bytes.length; i++) {
      var b = bytes[i];
      var code = 0;
      if (b < 128) {
          code = b;
      } else if (b < 224) {
          code = ((b & 31) << 6) + (bytes[++i] & 63);
      } else if (b < 240) {
          code = ((b & 15) << 12) + ((bytes[++i] & 63) << 6) + (bytes[++i] & 63);
      } else if (b < 248) {
          code = ((b & 1) << 24) + ((bytes[++i] & 63) << 18) + ((bytes[++i] & 63) << 12) + ((bytes[++i] & 63) << 6) + (bytes[++i] & 63);
      }
      str += String.fromCharCode(code);
  }
  return str;
}