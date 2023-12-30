'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuid} = require('uuid');
const models = require('./category');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init({
    userId: DataTypes.UUID,
    categoryId: DataTypes.UUID,
    title: DataTypes.STRING,
    banner: DataTypes.STRING,
    body: DataTypes.TEXT,
    tags: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Article',
  });
  Article.beforeCreate((article, _ ) => {
    return article.id = uuid();
  });
  Article.associate = (models) => {
    Article.belongsTo(models.Category, { 
      foreignKey: 'categoryId', 
      as: 'category'
    });
    Article.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'user'
    });
    Article.hasMany(models.ArticleComment, { 
      foreignKey: 'articleId', 
      as: 'comment'
    });
    Article.hasMany(models.ArticleBookmark, { 
      foreignKey: 'articleId', 
      as: 'bookmark'
    });
    Article.hasMany(models.ArticleLike, { 
      foreignKey: 'articleId', 
      as: 'like'
    });
  };
  return Article;
};