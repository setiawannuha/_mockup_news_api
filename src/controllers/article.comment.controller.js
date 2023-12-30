const { internalError, success } = require('../utils/response');
const models = require('../database/models/index');

module.exports = {
  create: async (req, res) => {
    try {
      const { articleId } = req.params;
      const { comment } = req.body;
      const { id } = req.user;
      const payload = {
        articleId,
        comment,
        userId: id,
      };
      const result = await models.ArticleComment.create(payload);
      return success(res, result, 'comment success');
    } catch (error) {
      return internalError(res, error);
    }
  },
};
