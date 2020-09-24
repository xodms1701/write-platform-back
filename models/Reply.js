const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { is_delete ,create_dt, update_dt, delete_dt } = metaFields;

const Reply = connector.define("Reply", {
  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  board_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  parent_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  secret_yn: {
    type: Sequelize.BOOLEAN,
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

module.exports = Reply;