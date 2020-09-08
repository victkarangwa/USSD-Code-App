const db = require ('../db/models');


/**
 * This class contains functions for all user services.
 */
class UserServices {
  static async findUserByPhone(phone) {
    try {
      const user = await db.users.findOne({ where: { phone } });
      if (!user) return null;
      return user;
    } catch (error) {
      return undefined;
    }
  }



  static async update(amount, phone) {
    try {
      const user = await db.user.update(
       { amount},
        { where: { phone }}
      );
      return user;
    } catch (error) {
      return error;
    }
  }

}
module.exports = UserServices;
