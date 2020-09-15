'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const prefix = app.config.sequelize.tableNamePrefix

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(30),
    password: STRING(32),
    salt: STRING(8),
    nickname: STRING(32),
    realname: STRING(32),
    sex: INTEGER,
    email: STRING(64),
    mobile: STRING(24),
    head_img: STRING(128),
    created_at: DATE,
    updated_at: DATE,
    activation_key: STRING(32),
    status: INTEGER,
    token: STRING(32),
    last_login_at: DATE,
  }, {
      tableName: prefix + 'users'
  });

  User.findByMobile = async function(mobile) {
      return await this.findOne({
          where: {
              mobile
          }
      });
  }

  return User;
};