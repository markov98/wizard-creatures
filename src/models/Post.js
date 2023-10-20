const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name must be at least 2 characters long!']
    },
    species: {
        type: String,
        required: [true, 'Species is required!'],
        minLength: [3, 'Spicies must be at least 3 characters long!']
    },
    imgUrl: {
        type: String,
        required: [true, 'Image URL is required!'],
        match: [/^https?:\/\//, 'Invalid image URL!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [5, 'Description must be between 5 and 500 characters long!'],
        maxLength: [500, 'Description must be between 5 and 500 characters long!']
    },
    skinColor: {
        type: String,
        required: [true, 'Skin Color is required!'],
        minLength: [3, 'Skin Color must be at least 3 characters long!']
    },
    eyeColor: {
        type: String,
        required: [true, 'Eye Color is required!'],
        minLength: [3, 'Eye Color must be at least 3 characters long!']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    voters: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;