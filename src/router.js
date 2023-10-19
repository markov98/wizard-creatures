const router = require("express").Router();
const homeController = require('./controllers/homeController');
const postsController = require('./controllers/postsController');
const userController = require('./controllers/userController');

router.use(homeController);
router.use('/posts', postsController);
router.use('/user', userController);

router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = (app) => app.use(router);