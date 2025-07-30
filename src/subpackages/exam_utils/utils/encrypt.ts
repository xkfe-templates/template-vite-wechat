
import { JSEncrypt } from '@/subpackages/exam_utils/lib/jsencrypt.min.js';
import CryptoJS from 'crypto-js';

// ! 真实项目请将此信息写入配置文件
export const encryptInfo = {
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCh5Nk2GLiyQFMIU+h3OEA4UeFb
u3dCH5sjd/sLTxxvwjXq7JLqJbt2rCIdzpAXOi4jL+FRGQnHaxUlHUBZsojnCcHv
hrz2knV6rXNogt0emL7f7ZMRo8IsQGV8mlKIC9xLnlOQQdRNUssmrROrCG99wpTR
RNZjOmLvkcoXdeuaCQIDAQAB
-----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCh5Nk2GLiyQFMIU+h3OEA4UeFbu3dCH5sjd/sLTxxvwjXq7JLq
Jbt2rCIdzpAXOi4jL+FRGQnHaxUlHUBZsojnCcHvhrz2knV6rXNogt0emL7f7ZMR
o8IsQGV8mlKIC9xLnlOQQdRNUssmrROrCG99wpTRRNZjOmLvkcoXdeuaCQIDAQAB
AoGAUTcJ1H6QYTOts9bMHsrERLymzir8R9qtLBzrfp/gRxxpigHGLdph8cWmk8dl
N5HDRXmmkdV6t2S7xdOnzZen31lcWe0bIzg0SrFiUEOtg3Lwxzw2Pz0dKwg4ZUoo
GKpcIU6kEpbC2UkjBV4+2E6P1DXuhdgTyHoUA3ycxOdjCAUCQQCyjTzGPXFoHq5T
miJyVd4VXNyCXGU0ZuQayt6nPN8Gd5CcEb2S4kggzPXQcd90FO0kHfZV6+PGTrc2
ZUuz5uwPAkEA6B3lmEmiZsJS/decLzWR0T1CXaFGwTjBQbHXJ0RziAfkuy+VwSmh
vrW/ipk5xbREr5rKx3jVI2PzVOvLw7NgZwJAbUsvDFnH9WfyZZJPy5TsID97awCL
oovozM2phM0p55eAmUfyttp0ND/BqBpMIY49qoH8q5N9FYJRe6Z9tF2B2QJAQBEo
cw039xcB4zCk2l713YQEEmXWarSomuJkWWFKZiyPlJ8Ava0pCMOPl8jNKmWkY7fc
6ovOgJMw8aqXtm+HVwJAerJeUEDez2djG5pIF6aCV0bP3fhQUq8OQCgGF5Qzo9Cn
qvYreGpYKPJGVixAsEPCiLzJRhy1XfFona6VRXIIxw==
-----END RSA PRIVATE KEY-----
`,
  iv: 'oy9i4GBh04UQr1Q1',
}


/**
 * RSA 加密数据
 *   - 字符串：直接加密整个字符串
 *   - 对象：加密对象中所有字符串类型的值（非字符串值保持不变）
 * @returns {string | false | Record<string, any>} 加密后的结果：
 *   - 如果输入是字符串，返回加密后的字符串
 *   - 如果输入是对象，返回新对象（原对象不受影响），其中所有字符串值被加密
 *   - 加密失败返回 false
 */
export const rsaEncrypt = (data: string | Record<string, any>, publicKey: string = encryptInfo.publicKey): string | false | Record<string, any> => {
  const jse = new JSEncrypt();
  jse.setPublicKey(publicKey);

  // 字符串直接加密
  if (typeof data === 'string') {
    return jse.encrypt(data);
  }

  // 对象处理
  if (typeof data === 'object' && data !== null) {
    const encryptedObj: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      // 只加密字符串值
      encryptedObj[key] = typeof value === 'string' ? jse.encrypt(value) : value;
    }

    return encryptedObj;
  }

  // 其他类型直接返回（ts类型约束，实际不会执行到这里）
  return data;
};

/**
 * RSA 解密数据
 * @param data 需要解密的数据
 * @returns 解密后的数据
 */
export function rsaDecrypt(data: string, privateKey: string): string | false {
  const jse = new JSEncrypt();
  jse.setPrivateKey(privateKey);
  return jse.decrypt(data);
}

/**
 * 生成16位随机UUID
 * @returns 16位的随机字符串
 */
export function generateShortUUID(): string {
  let array = new Uint8Array(8);
  for (let i = 0; i < array.length; i++) {
    array[i] = Math.floor(Math.random() * 256);
  }
  // 将随机字节转换为16进制字符串并拼接
  let uuid = '';
  for (let i = 0; i < array.length; i++) {
    // 确保每个字节转换为2位16进制
    const hex = array[i].toString(16).padStart(2, '0');
    uuid += hex;
  }

  // 返回16位字符（8字节 * 2十六进制字符）
  return uuid;
}

/**
 * AES加密
 * @param data 需要加密的数据
 * @returns 加密后的数据
 */
export function aesEncrypt(data: string | Record<string, any>, keyStr: string): string | false {
  // 设置密钥和初始向量
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const iv = CryptoJS.enc.Utf8.parse(encryptInfo.iv);


  if (data instanceof Object) {
    data = JSON.stringify(data)
  }
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * AES解密
 * @param data 需要解密的数据
 * @returns 解密后的数据
 */
export function aesDecrypt(data: string, keyStr: string) {
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const iv = CryptoJS.enc.Utf8.parse(encryptInfo.iv);

  const decrypted = CryptoJS.AES.decrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}