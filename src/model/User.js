const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email is already taken!'],
        minLength: [10, 'Email must be at least 10 chars long!']
    },
    
    firstName: {
        type: String,
        required: [true, 'First Name is required!'],
        minLength: [3, 'First Name must be at least 3 chars long!']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required!'],
        minLength: [3, 'Last Name must be at least 3 chars long!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password must be at least 4 chars long!']
    }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

module.exports = User;