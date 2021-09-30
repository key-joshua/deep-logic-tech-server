const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	title: {
		type: String,
		required: true,
	},

	link: {
		type: String,
		required: true,
	},
});

mongoose.model('Post', postSchema);
