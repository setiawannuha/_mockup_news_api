'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuid} = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    picture: DataTypes.STRING,
    job: DataTypes.STRING,
    about: DataTypes.TEXT,
    role: DataTypes.INTEGER,
    emailVerifiedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, _ ) => {
    return user.id = uuid();
  });
  User.associate = (models) => {
    User.hasMany(models.Article, { 
      foreignKey: 'userId',
      as: 'article',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.ArticleComment, { 
      foreignKey: 'userId',
      as: 'comment',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.ArticleBookmark, { 
      foreignKey: 'userId',
      as: 'bookmark',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.ArticleLike, { 
      foreignKey: 'userId',
      as: 'like',
      onDelete: 'CASCADE'
    });
  };
  return User;
};