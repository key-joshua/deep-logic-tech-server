const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGOURI } = require('./config/keys.js');

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
	console.log('connected to mongo');
});

mongoose.connection.on('error', (err) => {
	console.log('error connecting', err);
});

require('./models/Post');

app.use(express.json());
app.use(cors());
app.use(require('./routes/post'));

app.listen(PORT, () => {
	console.log('SERVER IS RUNNING ON PORT', PORT);
});
