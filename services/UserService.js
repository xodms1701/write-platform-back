const User = require('../models/User');

module.exports = {
  findByEmail: email => {
    return User.findOne({
      where: {
        email: email,
        is_delete: false
      }
    })
  },
  create: user => {
    return User.create(user)
  }
}