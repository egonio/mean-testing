const mongoose = require('mongoose');

// Schema  is just the blueprint
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

// Gotta make a model based on the Schema blueprint
// name first then schema
module.exports = mongoose.model('Post', postSchema);
