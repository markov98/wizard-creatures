const Post = require('../models/Post');

exports.create = (postData) => Post.create(postData);