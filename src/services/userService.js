const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = (email, firstName, lastName, password) => User.create({email, firstName, lastName, password});