const Membership = require("../models/Membership");

module.exports = {
  create: data => {
    return Membership.create(data)
  },
  findByUserId: user_id => {
    return Membership.findOne({
      where: {
        user_id: user_id,
        is_delete: false,
      }
    })
  }
};