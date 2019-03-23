const mongoose = require('mongoose');

// Mongodb connection
const MONGO_URI = 'mongodb://localhost:27017/stickstat-dev';

if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

// Mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true }).then(
	() =>  console.log(`Connected to MongoDB instance: ${MONGO_URI}`),
	err => console.log('Error connecting to MongoDB:', err)
);

// Models
require('../models');