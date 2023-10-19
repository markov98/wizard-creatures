const router = require("express").Router();

router.get('/', (req, res) => {
    res.send('Hello');
});

module.exports = (app) => app.use(router);