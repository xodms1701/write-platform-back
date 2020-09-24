const Sequelize = require("sequelize");

const MetaFields = {
  is_delete: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  create_dt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  update_dt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  delete_dt: {
    type: Sequelize.DATE,
    allowNull: true
  }
};

module.exports = MetaFields;