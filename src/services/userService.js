const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = (email, firstName, Lastname, password) => User.create({email, firstName, Lastname, password});