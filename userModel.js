const mongoose = require('mongoose');

// Define the schema for the "User" collection
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  homeOwner: String,
  // Add more fields as needed
});

// Create a model based on the schema
const mailerCollection = mongoose.model('mailerCollections', userSchema);

module.exports = mailerCollection;
