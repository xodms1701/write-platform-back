const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { is_delete, create_dt, update_dt, delete_dt } = metaFields;

const User = connector.define("User", {
  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_type: {
    type: Sequelize.STRING(1), // B: basic, M: membership, A: admin
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  is_delete,
  create_dt,
  update_dt,
  delete_dt
}, {
  freezeTableName: true,
  underscored: true,
  timestamps: false
});

module.exports = User;