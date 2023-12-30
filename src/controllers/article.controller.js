const { Op } = require('sequelize');
const {
  internalError, success, successWithPagination, notFound, failed,
} = require('../utils/response');
const models = require('../database/models/index');
const { destroyFileByURL } = require('../helpers/cloudinary');

module.exports = {
  findAll: async (req, res) => {
    try {
      const search = req.query.search || '';
      const page = (+req.query.page) || 1;
      const limit = (+req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'title';
      const sortType = req.query.sortType || 'ASC';
      const offset = page === 1 ? 0 : (page - 1) * limit;
      const totalData = await models.Article.count({
        where: {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
      });
      const result = await models.Article.findAll({
        include: [{
          model: models.Category,
          as: 'category',
        }, {
          model: models.User,
          as: 'user',
          attributes: ['id', 'username', 'email', 'picture', 'job', 'about'],
        }, {
          model: models.ArticleComment,
          as: 'comment',
        }, {
          model: models.ArticleBookmark,
          as: 'bookmark',
        }, {
          model: models.ArticleLike,
          as: 'like',
        }],
        where: {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
        limit,
        offset,
        order: [
          [sortBy, sortType],
        ],
      });
      const pagination = {
        page,
        limit,
        sortBy,
        sortType,
        totalData,
        totalPage: Math.ceil(totalData / limit),
      };
      return successWithPagination(res, result, pagination, 'get all articles success');
    } catch (error) {
      console.log(error);
      return internalError(res, error);
    }
  },
  latest: async (req, res) => {
    try {
      const limit = req.query.limit || 3;
      const result = await models.Article.findAll({
        include: [{
          model: models.Category,
          as: 'category',
        }, {
          model: models.User,
          as: 'user',
          attributes: ['id', 'username', 'email', 'picture', 'job', 'about'],
        }, {
          model: models.ArticleComment,
          as: 'comment',
        }, {
          model: models.ArticleBookmark,
          as: 'bookmark',
        }, {
          model: models.ArticleLike,
          as: 'like',
        }],
        order: [
          ['createdAt', 'DESC'],
        ],
        limit,
      });
      return success(res, result, 'get latest articles success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await models.Article.findOne({
        include: [{
          model: models.Category,
          as: 'category',
        }, {
          model: models.User,
          as: 'user',
          attributes: ['id', 'username', 'email', 'picture', 'job', 'about'],
        }, {
          model: models.ArticleComment,
          as: 'comment',
          include: [{
            model: models.User,
            as: 'user',
            attributes: ['id', 'username', 'email', 'picture'],
          }],
        }, {
          model: models.ArticleBookmark,
          as: 'bookmark',
          include: [{
            model: models.User,
            as: 'user',
            attributes: ['id', 'username', 'email', 'picture'],
          }],
        }, {
          model: models.ArticleLike,
          as: 'like',
          include: [{
            model: models.User,
            as: 'user',
            attributes: ['id', 'username', 'email', 'picture'],
          }],
        }],
        where: {
          id,
        },
      });
      return success(res, result, 'get detail article success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  byProfile: async (req, res) => {
    try {
      const { id } = req.user;
      const result = await models.Article.findAll({
        include: [{
          model: models.Category,
          as: 'category',
        }, {
          model: models.User,
          as: 'user',
          attributes: ['id', 'username', 'email', 'picture', 'job', 'about'],
        }, {
          model: models.ArticleComment,
          as: 'comment',
        }, {
          model: models.ArticleBookmark,
          as: 'bookmark',
        }, {
          model: models.ArticleLike,
          as: 'like',
        }],
        where: {
          userId: id,
        },
      });
      return success(res, result, 'get detail article success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  byUserId: async (req, res) => {
    try {
      const { id } = req.params;
      const page = (+req.query.page) || 1;
      const limit = (+req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'title';
      const sortType = req.query.sortType || 'ASC';
      const offset = page === 1 ? 0 : (page - 1) * limit;
      const totalData = await models.Article.count({
        where: {
          userId: id,
        },
      });
      const result = await models.Article.findAll({
        include: [{
          model: models.Category,
          as: 'category',
        }, {
          model: models.User,
          as: 'user',
          attributes: ['id', 'username', 'email', 'picture', 'job', 'about'],
        }, {
          model: models.ArticleComment,
          as: 'comment',
        }, {
          model: models.ArticleBookmark,
          as: 'bookmark',
        }, {
          model: models.ArticleLike,
          as: 'like',
        }],
        where: {
          userId: id,
        },
        limit,
        offset,
        order: [
          [sortBy, sortType],
        ],
      });
      const pagination = {
        page,
        limit,
        sortBy,
        sortType,
        totalData,
        totalPage: Math.ceil(totalData / limit),
      };
      return successWithPagination(res, result, pagination, 'get all articles success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  byCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const limit = req.query.limit || 5;
      const result = await models.Article.findAll({
        include: [{
          model: models.Category,
          as: 'category',
        }, {
          model: models.User,
          as: 'user',
          attributes: ['id', 'username', 'email', 'picture', 'job', 'about'],
        }, {
          model: models.ArticleComment,
          as: 'comment',
        }, {
          model: models.ArticleBookmark,
          as: 'bookmark',
        }, {
          model: models.ArticleLike,
          as: 'like',
        }],
        where: {
          categoryId: id,
        },
        limit,
      });
      return success(res, result, 'get detail article success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const {
        categoryId,
        title,
        body,
        tags,
      } = req.body;
      if (!req.file) {
        return failed(res, [
          {
            type: 'field',
            value: '',
            msg: 'banner cannot be empty',
            path: 'banner',
            location: 'body',
          },
        ], 'create article failed');
      }
      const payload = {
        userId: req.user.id,
        categoryId,
        title,
        banner: req.file.path,
        body,
        tags,
      };
      const result = await models.Article.create(payload);
      return success(res, result, 'create article success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        categoryId,
        title,
        body,
        tags,
      } = req.body;
      const data = await models.Article.findByPk(id);
      if (!data) {
        return notFound(res, null);
      }
      const payload = {
        categoryId,
        title,
        body,
        tags,
      };
      if (req.file) {
        payload.banner = req.file.path;
        destroyFileByURL(data.banner);
      }
      const result = await models.Article.update(payload, {
        where: {
          id,
        },
      });
      return success(res, result, 'update article success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await models.Article.findByPk(id);
      if (!data) {
        return notFound(res, null);
      }
      const result = await models.Article.destroy({
        where: {
          id,
        },
      });
      destroyFileByURL(data.banner);
      return success(res, result, 'delete article success');
    } catch (error) {
      return internalError(res, error);
    }
  },
};
