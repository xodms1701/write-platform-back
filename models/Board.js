const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { is_delete, create_dt, update_dt, delete_dt } = metaFields;

const Board = connector.define("Board", {
  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sub_title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  series_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  secret_yn: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  view_cnt: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  notice_yn: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  thumb: {
    type: Sequelize.STRING,
    allowNull: true
  },
  state: {
    type: Sequelize.STRING(1), // 공개: P, 비공개: N, 비밀글: S, M: 멤버쉽
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

module.exports = Board;