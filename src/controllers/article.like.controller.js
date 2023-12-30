const {
  internalError, success, failed, notFound,
} = require('../utils/response');
const models = require('../database/models/index');

module.exports = {
  create: async (req, res) => {
    try {
      const { articleId } = req.params;
      const { id } = req.user;
      const exist = await models.ArticleLike.findOne({
        where: {
          articleId,
          userId: id,
        },
      });
      if (exist) {
        return failed(res, null, 'already liked');
      }
      const payload = {
        articleId,
        userId: id,
      };
      const result = await models.ArticleLike.create(payload);
      return success(res, result, 'like success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  destroy: async (req, res) => {
    try {
      const { articleId } = req.params;
      const { id } = req.user;
      const exist = await models.ArticleLike.findOne({
        where: {
          articleId,
          userId: id,
        },
      });
      if (!exist) {
        return notFound(res, null);
      }
      const result = await models.ArticleLike.destroy({
        where: {
          articleId,
          userId: id,
        },
      });
      return success(res, result, 'delete like success');
    } catch (error) {
      return internalError(res, error);
    }
  },
};
