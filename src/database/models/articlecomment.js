'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuid} = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class ArticleComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticleComment.init({
    userId: DataTypes.UUID,
    articleId: DataTypes.UUID,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ArticleComment',
  });
  ArticleComment.beforeCreate((comment, _ ) => {
    return comment.id = uuid();
  });
  ArticleComment.associate = (models) => {
    ArticleComment.belongsTo(models.Article, { 
      foreignKey: 'articleId', 
      as: 'article'
    });
    ArticleComment.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'user'
    });
  }
  return ArticleComment;
};