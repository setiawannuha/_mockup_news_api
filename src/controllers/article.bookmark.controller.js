const {
  internalError, success, failed, notFound,
} = require('../utils/response');
const models = require('../database/models/index');

module.exports = {
  byProfile: async (req, res) => {
    try {
      const { id } = req.user;
      const result = await models.ArticleBookmark.findAll({
        include: [{
          model: models.Article,
          as: 'article',
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
          }],
        }],
        where: {
          userId: id,
        },
      });
      return success(res, result, 'get bookmark success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { articleId } = req.params;
      const { id } = req.user;
      const exist = await models.ArticleBookmark.findOne({
        where: {
          articleId,
          userId: id,
        },
      });
      if (exist) {
        return failed(res, null, 'already bookmarked');
      }
      const payload = {
        articleId,
        userId: id,
      };
      const result = await models.ArticleBookmark.create(payload);
      return success(res, result, 'bookmark success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  destroy: async (req, res) => {
    try {
      const { articleId } = req.params;
      const { id } = req.user;
      const exist = await models.ArticleBookmark.findOne({
        where: {
          articleId,
          userId: id,
        },
      });
      if (!exist) {
        return notFound(res, null);
      }
      const result = await models.ArticleBookmark.destroy({
        where: {
          articleId,
          userId: id,
        },
      });
      return success(res, result, 'delete bookmark success');
    } catch (error) {
      return internalError(res, error);
    }
  },
};
