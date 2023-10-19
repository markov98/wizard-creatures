const router = require("express").Router();

router.get('/all', (req, res) => {
    res.render('posts/all-posts');
});

router.get('/create', (req, res) => {
    res.render('posts/create');
});

router.get('/details', (req, res) => {
    res.render('posts/details');
});

router.get('/edit', (req, res) => {
    res.render('posts/edit');
});

router.get('/my', (req, res) => {
    res.render('posts/my-posts');
});

module.exports = router;