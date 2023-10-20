const router = require("express").Router();
const postService = require('../services/postService');
const { isAuth } = require("../middlewares/auth");
const { extractErrorMsgs } = require('../utils/errorHandling');

// All Post Page

router.get('/all', async (req, res) => {
    const posts = await postService.getAll().lean();
    const isEmpty = posts.length === 0;
    res.render('posts/all-posts', { posts, isEmpty });
});

// Create Post Page

router.get('/create', isAuth, (req, res) => {
    res.render('posts/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { name, species, skinColor, eyeColor, imgUrl, description } = req.body;

    try {
        await postService.create({ name, species, skinColor, eyeColor, imgUrl, description, owner: req.user });

        res.redirect('/posts/all');
    } catch (err) {
        res.status(404).render('posts/create', { errMsg: extractErrorMsgs(err) });
    }

});

// Details Page

router.get('/details', (req, res) => {
    res.render('posts/details');
});

// Edit Page

router.get('/edit', (req, res) => {
    res.render('posts/edit');
});

// My Posts Page

router.get('/my', (req, res) => {
    res.render('posts/my-posts');
});

module.exports = router;