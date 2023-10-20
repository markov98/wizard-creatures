const Post = require('../models/Post');

exports.getAll = () => Post.find();

exports.getById = (id) => Post.findById(id);

exports.create = (postData) => Post.create(postData);

exports.vote = (id, user) => Post.findByIdAndUpdate(id, { $push: { voters: user } });