import { Http } from "../utils/utils.js";

class User {
  /**
   * 获取用户可用状态
   */
  static async getUserInfo(data = {}) {
    return await Http.request({
      url: `manager/queryManagerInf`,
      data,
    });
  }
}
export { User };
