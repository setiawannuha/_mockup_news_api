const router = require('express').Router();
const authRouter = require('./auth.router');
const articleRouter = require('./article.router');
const articleCommentRouter = require('./article.comment.router');
const articleBookmarkRouter = require('./article.bookmark.router');
const articleLikeRouter = require('./article.like.router');
const categoryRouter = require('./category.router');

router.get('/', (req, res) => {
  res.send('<h1>It Works</h1>');
});
router.use('/api/auth', authRouter);
router.use('/api/article', articleRouter);
router.use('/api/article/comment', articleCommentRouter);
router.use('/api/article/bookmark', articleBookmarkRouter);
router.use('/api/article/like', articleLikeRouter);
router.use('/api/category', categoryRouter);

module.exports = router;
