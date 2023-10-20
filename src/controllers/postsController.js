const router = require("express").Router();
const postService = require('../services/postService');
const userService = require('../services/userService');
const { isAuth } = require("../middlewares/auth");
const { extractErrorMsgs } = require('../utils/errorHandling');
const { postExistanceCheck, ownershipCheck } = require("../middlewares/checks");

// All Post Page

router.get('/all', async (req, res) => {
    const posts = await postService.getAll().lean();
    const isEmpty = posts.length === 0;
    res.render('posts/all-posts', { posts, isEmpty });
});

// Create Post Page

router.get('/create', isAuth, (req, res) => {
    res.render('posts/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { name, species, skinColor, eyeColor, imgUrl, description } = req.body;

    try {
        await postService.create({ name, species, skinColor, eyeColor, imgUrl, description, owner: req.user });

        res.redirect('/posts/all');
    } catch (err) {
        res.status(404).render('posts/create', { errMsg: extractErrorMsgs(err) });
    }

});

// Details Page

router.get('/:id/details', postExistanceCheck, async (req, res) => {
    const { post } = res;
    const user = await userService.getById(post.owner.toString());
    const username = `${user.firstName} ${user.lastName}`;

    const isOwner = req.user?._id === post.owner.toString();

    const voterIds = post.voters.map(el => el.toString());
    const hasVoted = voterIds.includes(req.user?._id);
    const voters = await userService.getVoters(voterIds).lean();
    const voterEmails = voters.map(voter => voter.email).join(', ');
    const votersAmount = voters.length;
    const isEmpty = votersAmount === 0;

    res.render('posts/details', { post, username, isOwner, hasVoted, voterEmails, votersAmount, isEmpty });
});

// Edit Page

router.get('/:id/edit', isAuth, postExistanceCheck, ownershipCheck, (req, res) => {
    const { name, species, skinColor, eyeColor, imgUrl, description } = res.post;

    res.render('posts/edit', { name, species, skinColor, eyeColor, imgUrl, description });
});

router.post('/:id/edit', isAuth, postExistanceCheck, ownershipCheck, async (req, res) => {
    const { name, species, skinColor, eyeColor, imgUrl, description } = req.body;
    const { id } = req.params;

    try {
        await postService.edit(id, { name, species, skinColor, eyeColor, imgUrl, description });
        res.redirect(`/posts/${id}/details`);
    } catch (err) {
        res.render('posts/edit', { name, species, skinColor, eyeColor, imgUrl, description, errMsg: extractErrorMsgs(err) });
    }
});

// Voting

router.get('/:id/vote', isAuth, postExistanceCheck, async (req, res) => {
    const { post } = res;
    const { user } = req;
    const { id } = req.params;

    const isOwner = user._id === post.owner.toString();
    const hasVoted = post.voters.map(el => el.toString()).includes(user._id);

    console.log(hasVoted)

    if (isOwner || hasVoted) {
        return res.redirect('/404');
    }

    await postService.vote(id, user);

    res.redirect(`/posts/${id}/details`);
});

// My Posts Page

router.get('/my', (req, res) => {
    res.render('posts/my-posts');
});

module.exports = router;