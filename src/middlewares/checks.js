const postService = require('../services/postService');

exports.postExistanceCheck = async (req, res, next) => {
    try {
        const post = await postService.getById(req.params.id).lean();

        if (!post) {
            throw new Error;
        }

        res.post = post;
        next()
    } catch ( err ) {
        return res.redirect('/404');
    }
};

exports.ownershipCheck = (req, res, next) => {
    if (req.user._id !== res.post?.owner.toString()) {
        return res.redirect('/404');
    }

    next();
};