const postService = require('../services/postService');

exports.postExistanceCheck = async (req, res, next) => {
    const post = await postService.getById(req.params.id).lean();

    if (!post) {
        return res.redirect('/404');
    }

    res.post = post;
    next()
};