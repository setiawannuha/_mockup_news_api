const { Op } = require('sequelize');
const {
  internalError, success, failed, notFound,
} = require('../utils/response');
const models = require('../database/models/index');
const { destroyFileByURL } = require('../helpers/cloudinary');

module.exports = {
  findAll: async (req, res) => {
    try {
      const search = req.query.search || '';
      const limit = (+req.query.limit) || 10;
      const result = await models.Category.findAll({
        include: {
          model: models.Article,
          as: 'article',
          include: {
            model: models.User,
            as: 'user',
            attributes: ['id', 'username', 'email', 'picture', 'job', 'about'],
          },
        },
        where: {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
        limit,
      });
      return success(res, result, 'get all categories success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await models.Category.findOne({
        include: {
          model: models.Article,
          as: 'article',
        },
        where: {
          id,
        },
      });
      return success(res, result, 'get detail category success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { title } = req.body;
      if (!req.file) {
        return failed(res, [
          {
            type: 'field',
            value: '',
            msg: 'banner cannot be empty',
            path: 'banner',
            location: 'body',
          },
        ], 'create category failed');
      }
      const payload = {
        title,
        banner: req.file.path,
      };
      const result = await models.Category.create(payload);
      return success(res, result, 'create category success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const data = await models.Category.findByPk(id);
      if (!data) {
        return notFound(res, null);
      }
      const payload = {
        title,
      };
      if (req.file) {
        payload.banner = req.file.path;
        destroyFileByURL(data.banner);
      }
      const result = await models.Category.update(payload, {
        where: {
          id,
        },
      });
      return success(res, result, 'update category success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await models.Category.findByPk(id);
      if (!data) {
        return notFound(res, null);
      }
      const result = await models.Category.destroy({
        where: {
          id,
        },
      });
      destroyFileByURL(data.banner);
      return success(res, result, 'delete category success');
    } catch (error) {
      return internalError(res, error);
    }
  },
};
