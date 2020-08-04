import { Http } from "../utils/utils.js";

class Auth {
  /**
   * 获取验证码
   * @param phone
   */
  static async getCodeByPhone(data) {
    return await Http.request({
      url: `manager/sendMsg`,
      data,
    });
  }
}

export { Auth };
