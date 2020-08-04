import { Http } from "../utils/utils.js";

class User {
  /**
   * 获取用户可用状态
   */
  static async getUserInfo(data = {}) {
    return await Http.request({
      url: `manager/queryManagerInfo`,
      data,
    });
  }
}
export { User };
