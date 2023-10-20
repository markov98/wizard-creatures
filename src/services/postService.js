const Post = require('../models/Post');

exports.getAll = () => Post.find(); 

exports.create = (postData) => Post.create(postData);