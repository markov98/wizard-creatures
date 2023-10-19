const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");
const userService = require('../services/userService');
const { extractErrorMsgs } = require('../utils/errorHandling');

// Login Page

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);
        res.cookie('auth', token);

        res.redirect('/')
    } catch (err) {
        res.status(404).render('user/login', { errMsg: extractErrorMsgs(err) });
    }
});

// Register Page

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { email, firstName, lastName, password, rePass } = req.body;

    try {
        if (password !== rePass) {
            throw new Error('Passwords do not match!');
        }

        await userService.register(email, firstName, lastName, password);

        const token = await userService.login(email, password);
        res.cookie('auth', token);

        res.redirect('/')
    } catch (err) {
        res.status(404).render('user/register', { errMsg: extractErrorMsgs(err) });
    }
});

// Logout

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router;