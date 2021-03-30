const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb+srv://MERN:123040cse@cluster0.5qcwc.mongodb.net/Social?retryWrites=true&w=majority", {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
