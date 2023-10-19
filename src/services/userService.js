const User = require('../models/User');
const bcrypt = require('bcrypt');
const { jwt } = require('../librery/jwt');
const { SECRET } = require('../constants');

exports.register = (email, firstName, lastName, password) => User.create({email, firstName, lastName, password});

exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid username or password!');
    }

    const payload = {
        _id: user._id,
        email: user.email
    };

    const token = await jwt.sign(payload, SECRET, {expiresIn: '3d'});

    return token;
};