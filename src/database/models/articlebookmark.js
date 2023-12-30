'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuid} = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class ArticleBookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticleBookmark.init({
    userId: DataTypes.UUID,
    articleId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ArticleBookmark',
  });
  ArticleBookmark.beforeCreate((bookmark, _ ) => {
    return bookmark.id = uuid();
  });
  ArticleBookmark.associate = (models) => {
    ArticleBookmark.belongsTo(models.Article, { 
      foreignKey: 'articleId', 
      as: 'article'
    });
    ArticleBookmark.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'user'
    });
  }
  return ArticleBookmark;
};