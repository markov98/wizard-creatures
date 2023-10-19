const router = require("express").Router();
const userService = require('../services/userService');

// Login Page

router.get('/login', (req, res) => {
    res.render('user/login');
});

// Register Page

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const {email, firstName, lastName, password, rePass} = req.body;
    console.log(req.body);

    try {
        if (password !== rePass) {
            throw new Error ('Passwords do not match!');
        }

        await userService.register(email, firstName, lastName, password);

        res.send('Registered');
    } catch (err) {
        res.send(err);
    }
});

// Logout

router.get('/register', (req, res) => {
    res.send('Test');
});


module.exports = router;