'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuid} = require('uuid');
const models = require('./category');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    title: DataTypes.STRING,
    banner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  Category.beforeCreate((category, _ ) => {
    return category.id = uuid();
  });
  Category.associate = (models) => {
    Category.hasMany(models.Article, { 
      foreignKey: 'categoryId',
      as: 'article',
      onDelete: 'CASCADE'
    });
  };
  return Category;
};