// Will hold the express app
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Import post model
const Post = require('./models/post');

// create express app
// Will execute the express app
const app = express();

// connects to mongooDB using mongoose
mongoose.connect("mongodb+srv://egonio:YYjoW9QfLOeYtWcv@cluster0-sjykb.mongodb.net/mean-test?retryWrites=true")
  .then(() => {
    console.log('Connected to Database');
  }).catch(() => {
    console.log('Connection Failed');
  });

// setting up body parser for easy way of getting res
app.use(bodyParser.json());

// Setting Up CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});


// so this will only get call on localhost:3000/posts
// This is pretty much the api
app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Post fetched successfully',
        posts: documents
      });
      // console.log(documents);
    }).catch(error => {
      console.log(error);
    });
});


app.post('/api/posts', (req, res, next) => {
  // create a post object first
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // saves the data in the database.
  // Ty mongoose
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

// deleting a post
app.delete('/api/posts/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result => {
      // console.log(result);
      res.status(200).json({ message: 'Post Deleted!'});
    });
})

// How to export the app
module.exports = app;
