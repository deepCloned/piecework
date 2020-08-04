import axios from 'axios';
import { config } from "../config/config";

const Md5 = require("./md5");
const CryptoJS = require("crypto-js");

/**
 * 定义加密类
 */
class Encrypt {
  // 秘钥
  static key = "5RkLWI/aWIU+wumb1UmR/eUZC1iP2liF";
  // 加密
  static encryptByDes(data) {
    const keyHex = CryptoJS.enc.Utf8.parse(Encrypt.key);
    const encryptData = CryptoJS.TripleDES.encrypt(data, keyHex, {
      iv: CryptoJS.enc.Utf8.parse("01234567"),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encryptData.toString();
  }
  // 解密
  static decryptByDes(data) {
    const keyHex = CryptoJS.enc.Utf8.parse(Encrypt.key);
    const decryptData = CryptoJS.TripleDES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(data),
      },
      keyHex,
      {
        iv: CryptoJS.enc.Utf8.parse("01234567"),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return decryptData.toString(CryptoJS.enc.Utf8);
  }
}

/**
 * 定义请求类
 * 封装原生请求为 promise
 */

class Http {
  static async request({ url, method = "POST", data }) {
    const token = localStorage.getItem("token");
    const postData = Http.getRequestData(data, token);
    try {
      // const res = await fetch(`${config.BASE_URL}${url}`,{
      //   data: postData,
      //   header: {
      //     "content-type": "application/x-www-form-urlencoded",
      //   },
      //   method,
      // })
      console.log(res)
    } catch (err) {
      console.log(err)
      console.log('请求失败')
    }
  }
  // 获取请求参数
  static getRequestData(data, token) {
    let signData = JSON.stringify(data);
    let stmb = new Date().getTime();
    let sData = `data=${signData}&stmb=${stmb}`;
    let sign = Md5.md5(sData).toUpperCase();
    let postData = Encrypt.encryptByDes(signData);
    return {
      data: postData,
      token,
      sign,
      stmb,
    };
  }
}

/**
 * 把一个回调函数式的方法，转换为 promise 式
 * 就可以支持 async await
 */
const promisic = function (func) {
  return function (params) {
    return new Promise(function (resolve, reject) {
      /**
       * 合并参数列表
       * params 需要是一个对象
       */
      const args = Object.assign(params, {
        success: function (res) {
          resolve(res);
        },
        fail: function (err) {
          reject(err);
        },
      });
      func(args);
    });
  };
};

export { Http };
