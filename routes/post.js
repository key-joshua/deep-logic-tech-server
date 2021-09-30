const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

router.get('/allpost', (req, res) => {
	Post.find()
		.sort({ title: 1 })
		.find()
		.populate('postedBy', '_id name')
		.then((posts) => {
			res.json({ posts });
		})
		.catch((err) => console.log(err));
});

router.post('/createpost', (req, res) => {
	const { title, link } = req.body;
	if (!title) {
		res.status(406).json({ error: 'Please add title' });
	}
	if (!link) {
		res.status(406).json({ error: 'Plese add link' });
	}
	const post = new Post({
		title,
		link,
	});

	post
		.save()
		.then((result) => {
			res.json({ post: result });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get('/posts', (req, res) => {
	Post.find({}, { title: 1, link: 1 })
		.sort({ _id: -1 })
		.limit(5)
		.then((blogs) => {
			res.json(blogs);
			console.log(blogs);
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
