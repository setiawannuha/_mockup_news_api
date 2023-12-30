'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuid} = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class ArticleLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticleLike.init({
    userId: DataTypes.UUID,
    articleId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ArticleLike',
  });
  ArticleLike.beforeCreate((like, _ ) => {
    return like.id = uuid();
  });
  ArticleLike.associate = (models) => {
    ArticleLike.belongsTo(models.Article, { 
      foreignKey: 'articleId', 
      as: 'article'
    });
    ArticleLike.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'user'
    });
  }
  return ArticleLike;
};