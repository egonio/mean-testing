// Will hold the express app
const express = require('express');
const bodyParser = require('body-parser');

// create express app
// Will execute the express app
const app = express();

// setting up body parser for easy way of getting res
app.use(bodyParser.json());

// Setting Up CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methords', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});


// so this will only get call on localhost:3000/posts
// This is pretty much the api
app.get('/api/posts', (req, res, next) => {
  const posts = [{
    id: 'fsad123das',
    title: 'First server-side post',
    content: 'This is coming from the server'
  },
  {
    id: 'fsad121323das',
    title: 'Second server-side post',
    content: 'This is coming from the server!'
  }];
  res.status(200).json({
    message: 'Post fetched successfully',
    posts: posts
  });
});


app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

// How to export the app
module.exports = app;
